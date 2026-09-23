"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sfx } from "./sfx";

export type Point = { x: number; y: number };
export type Status = "idle" | "running" | "over";

const SIZE = 17;
const SPEED_MS = 120;

type Dir = Point;
const DIRS: Record<string, Dir> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function randomFood(snake: Point[]): Point {
  while (true) {
    const p = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}

export function useSnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Point>({ x: 12, y: 8 });
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const dirRef = useRef<Dir>(DIRS.right);
  const nextDirRef = useRef<Dir>(DIRS.right);
  const ateRef = useRef(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("snake-high");
    if (stored) setHighScore(Number(stored));
  }, []);

  const wrap = useCallback((v: number) => (v + SIZE) % SIZE, []);

  const turn = useCallback((name: keyof typeof DIRS) => {
    const d = DIRS[name];
    const cur = dirRef.current;
    // prevent reversing into yourself
    if (d.x + cur.x === 0 && d.y + cur.y === 0) return;
    nextDirRef.current = d;
    sfx.turn();
  }, []);

  const start = useCallback(() => {
    const initial = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    setSnake(initial);
    setFood(randomFood(initial));
    setScore(0);
    dirRef.current = DIRS.right;
    nextDirRef.current = DIRS.right;
    setStatus("running");
    sfx.start();
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      dirRef.current = nextDirRef.current;
      setSnake((prev) => {
        const head = prev[0];
        const next: Point = {
          x: wrap(head.x + dirRef.current.x),
          y: wrap(head.y + dirRef.current.y),
        };
        const hitSelf = prev
          .slice(0, -1)
          .some((s) => s.x === next.x && s.y === next.y);
        if (hitSelf) {
          setStatus("over");
          sfx.over();
          setScore((s) => {
            setHighScore((h) => {
              const nh = Math.max(h, s);
              window.localStorage.setItem("snake-high", String(nh));
              return nh;
            });
            return s;
          });
          return prev;
        }
        const ate = next.x === food.x && next.y === food.y;
        ateRef.current = ate;
        const body = [next, ...prev];
        if (ate) {
          setScore((s) => s + 1);
          setFood(randomFood(body));
          sfx.eat();
        } else {
          body.pop();
        }
        return body;
      });
    }, SPEED_MS);
    return () => clearInterval(id);
  }, [status, food]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, keyof typeof DIRS> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        if (status === "running") turn(dir);
        else if (status === "idle") start();
      }
      if (e.key === " " && status !== "running") {
        e.preventDefault();
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, turn, start]);

  return { snake, food, status, score, highScore, size: SIZE, start, turn };
}

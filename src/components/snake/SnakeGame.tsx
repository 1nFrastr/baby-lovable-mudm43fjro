"use client";

import Board from "@/components/snake/Board";
import Controls from "@/components/snake/Controls";
import { useSnakeGame } from "@/components/snake/useSnakeGame";

export default function SnakeGame() {
  const { snake, food, status, score, highScore, size, start, turn } =
    useSnakeGame();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-emerald-950/40 to-background p-6">
      <div className="flex w-full max-w-[420px] items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">🐍 Snake</h1>
        <div className="flex gap-4 text-sm">
          <span className="rounded-full bg-foreground/5 px-3 py-1">
            Score: <b>{score}</b>
          </span>
          <span className="rounded-full bg-foreground/5 px-3 py-1">
            Best: <b>{highScore}</b>
          </span>
        </div>
      </div>

      <Board
        snake={snake}
        food={food}
        size={size}
        status={status}
        onStart={start}
      />

      <Controls turn={turn} />

      <p className="hidden text-sm text-foreground/50 sm:block">
        Use arrow keys or WASD · Space to (re)start · Walls are portals 🌀
      </p>
    </main>
  );
}

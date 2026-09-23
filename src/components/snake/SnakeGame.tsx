"use client";

import Board from "@/components/snake/Board";
import Controls from "@/components/snake/Controls";
import { useSnakeGame } from "@/components/snake/useSnakeGame";

export default function SnakeGame() {
  const { snake, food, status, score, highScore, size, start, turn } =
    useSnakeGame();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-b from-[#052e22] via-[#04241b] to-[#010f0b] p-6">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-[420px] items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">🐍 Snake</h1>
        <div className="flex gap-4 text-sm">
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-100 ring-1 ring-emerald-400/30">
            Score: <b>{score}</b>
          </span>
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-100 ring-1 ring-emerald-400/30">
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

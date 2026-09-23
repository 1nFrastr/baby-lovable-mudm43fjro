"use client";

import type { useSnakeGame } from "./useSnakeGame";

type Turn = ReturnType<typeof useSnakeGame>["turn"];

export default function Controls({ turn }: { turn: Turn }) {
  const btn =
    "flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-xl font-semibold transition active:scale-90 active:bg-emerald-500/20";
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:hidden">
      <span />
      <button className={btn} onClick={() => turn("up")} aria-label="Up">
        ↑
      </button>
      <span />
      <button className={btn} onClick={() => turn("left")} aria-label="Left">
        ←
      </button>
      <button className={btn} onClick={() => turn("down")} aria-label="Down">
        ↓
      </button>
      <button className={btn} onClick={() => turn("right")} aria-label="Right">
        →
      </button>
    </div>
  );
}

"use client";

import type { useSnakeGame } from "./useSnakeGame";

type Turn = ReturnType<typeof useSnakeGame>["turn"];

export default function Controls({ turn }: { turn: Turn }) {
  const btn =
    "flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-400/10 text-xl font-semibold text-emerald-100 transition active:scale-90 active:bg-emerald-500/40";
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

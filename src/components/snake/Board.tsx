import type { Point, Status } from "./useSnakeGame";

type Props = {
  snake: Point[];
  food: Point;
  size: number;
  status: Status;
  onStart: () => void;
};

export default function Board({ snake, food, size, status, onStart }: Props) {
  return (
    <div
      className="relative grid aspect-square w-full max-w-[420px] touch-none select-none overflow-hidden rounded-2xl border border-emerald-300/25 bg-emerald-950/60 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        backgroundImage:
          "repeating-conic-gradient(from 0deg, rgba(52,211,153,0.05) 0% 25%, transparent 0% 50%)",
        backgroundSize: `${100 / size}% ${100 / size}%`,
      }}
    >
      {/* food */}
      <div
        className="rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        style={{
          gridColumn: food.x + 1,
          gridRow: food.y + 1,
          margin: "22%",
        }}
      />
      {/* snake */}
      {snake.map((seg, i) => (
        <div
          key={`${seg.x}-${seg.y}-${i}`}
          className="rounded-[4px]"
          style={{
            gridColumn: seg.x + 1,
            gridRow: seg.y + 1,
            margin: "6%",
            background: `hsl(152 70% ${Math.max(30, 52 - i * 1.5)}%)`,
            zIndex: 10,
          }}
        />
      ))}
      {status !== "running" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-emerald-950/80 backdrop-blur-sm">
          <p className="text-xl font-semibold">
            {status === "idle" ? "🐍 Snake" : "Game Over"}
          </p>
          <button
            onClick={onStart}
            className="rounded-full bg-emerald-500 px-6 py-2 font-medium text-white transition hover:bg-emerald-400 active:scale-95"
          >
            {status === "idle" ? "Play" : "Play again"}
          </button>
          {status === "over" && (
            <p className="text-sm text-foreground/60">Press Space to retry</p>
          )}
        </div>
      )}
    </div>
  );
}

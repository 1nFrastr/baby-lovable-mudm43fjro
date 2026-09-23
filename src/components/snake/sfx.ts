// Tiny Web Audio synth — no assets needed
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function beep(freq: number, dur: number, type: OscillatorType, vol = 0.15) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  gain.gain.setValueAtTime(vol, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

export const sfx = {
  eat() {
    beep(660, 0.08, "square");
    setTimeout(() => beep(880, 0.1, "square"), 60);
  },
  over() {
    beep(220, 0.2, "sawtooth", 0.12);
    setTimeout(() => beep(160, 0.25, "sawtooth", 0.12), 150);
    setTimeout(() => beep(110, 0.4, "sawtooth", 0.12), 320);
  },
  turn() {
    beep(440, 0.04, "triangle", 0.06);
  },
  start() {
    beep(523, 0.08, "square");
    setTimeout(() => beep(659, 0.08, "square"), 90);
    setTimeout(() => beep(784, 0.12, "square"), 180);
  },
};

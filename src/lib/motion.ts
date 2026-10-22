/* Tiny motion core: one clock per character, continuous waves, delayed
   follow-through. Values are written to CSS custom properties, never React state. */
export const TAU = Math.PI * 2;
export const wave = (t: number, period: number, phase = 0) => Math.sin((t / period) * TAU + phase);
/** Delayed copy of a signal: secondary parts read the parent motion `lag` seconds late. */
export const lagged = (fn: (t: number) => number, t: number, lag: number) => fn(t - lag);
export const bell = (x: number) => (x <= 0 || x >= 1 ? 0 : Math.sin(Math.PI * x) ** 2);
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/** Start a single loop clock; returns a stop function. Pauses when the tab is hidden. */
export function loopClock(tick: (seconds: number) => void) {
  let raf = 0;
  const start = performance.now();
  const frame = (now: number) => { tick((now - start) / 1000); raf = requestAnimationFrame(frame); };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

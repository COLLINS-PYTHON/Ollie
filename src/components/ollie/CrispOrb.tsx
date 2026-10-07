import { useEffect, useRef } from "react";
import { MODE_FRAMES, paintFrame, resolvePreset } from "thinking-orbs/engine";
import type { OrbState } from "thinking-orbs";

/** Original orb geometry painted at actual display size and device resolution. */
export function CrispOrb({ state, size = 80, "aria-label": label }: {
  state: OrbState;
  size?: 80 | 112;
  "aria-label": string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { mode, speed, opts } = resolvePreset(state, 64);
    const frame = MODE_FRAMES[mode];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = true;
    let ratio = 0;
    const paint = (time: number) => {
      const dpr = Math.min(4, window.devicePixelRatio || 1);
      if (ratio !== dpr) {
        ratio = dpr;
        canvas.width = Math.round(size * dpr);
        canvas.height = Math.round(size * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      paintFrame(ctx, frame(size, time, opts), false);
    };
    const loop = (now: number) => {
      paint(now / 1000 * speed);
      raf = window.requestAnimationFrame(loop);
    };
    const sync = () => {
      window.cancelAnimationFrame(raf);
      if (!visible || document.visibilityState === "hidden") return;
      paint(reduced.matches ? .6 : performance.now() / 1000 * speed);
      if (!reduced.matches) raf = window.requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync(); });
    observer.observe(canvas);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", sync);
    sync();
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", sync);
    };
  }, [size, state]);
  return <canvas ref={ref} width={size} height={size} role="img" aria-label={label} className={`crisp-orb ${size === 112 ? "orb-loading" : "orb-chat"}`} />;
}
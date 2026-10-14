import { useEffect, useRef } from "react";
import chase from "@/assets/ollie-chase-compatible.mp4.asset.json";
import poster from "@/assets/ollie-chase-frame.jpg";

/** Decorative chase stays inside reserved space, above all plan controls. */
export function OllieChase({ compact = false }: { compact?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const element = video.current;
      if (!element) return;
      element.muted = true;
      element.defaultMuted = true;
      element.setAttribute("muted", "");
      element.setAttribute("playsinline", "");
      if (preference.matches) { element.pause(); element.currentTime = 0; }
      else void element.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    const element = video.current;
    element?.addEventListener("canplay", update);
    element?.addEventListener("loadeddata", update);
    const retry = window.setInterval(update, 1200);
    document.addEventListener("pointerdown", update, { once: true });
    document.addEventListener("visibilitychange", update);
    return () => {
      preference.removeEventListener("change", update);
      element?.removeEventListener("canplay", update);
      element?.removeEventListener("loadeddata", update);
      window.clearInterval(retry);
      document.removeEventListener("pointerdown", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <div className={`ollie-chase-stage ${compact ? "is-compact" : ""}`} role="img" aria-label="Ollie watches glowing butterflies and occasionally jumps to catch them">
    <video ref={video} src={chase.url} className="ollie-chase-video" poster={poster} autoPlay muted loop playsInline controls={false} preload="auto" aria-hidden="true" disablePictureInPicture />
  </div>;
}
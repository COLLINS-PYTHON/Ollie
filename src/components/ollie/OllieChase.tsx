import { useEffect, useRef } from "react";
import chase from "@/assets/ollie-chase-compatible.mp4.asset.json";
import webm from "@/assets/ollie-chase-natural.webm.asset.json";
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
      if (preference.matches) { element.pause(); element.currentTime = 0; }
      else void element.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    const element = video.current;
    element?.addEventListener("canplay", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      preference.removeEventListener("change", update);
      element?.removeEventListener("canplay", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <div className={`ollie-chase-stage ${compact ? "is-compact" : ""}`} role="img" aria-label="Ollie watches glowing butterflies and occasionally jumps to catch them">
    <video ref={video} className="ollie-chase-video" poster={poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" disablePictureInPicture>
      <source src={chase.url} type="video/mp4" />
      <source src={webm.url} type="video/webm" />
    </video>
  </div>;
}
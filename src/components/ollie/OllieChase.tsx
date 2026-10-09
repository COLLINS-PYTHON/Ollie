import { useEffect, useRef } from "react";
import chase from "@/assets/ollie-chase-natural.mp4.asset.json";
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
      if (preference.matches) { element.pause(); element.currentTime = 0; }
      else void element.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return <div className={`ollie-chase-stage ${compact ? "is-compact" : ""}`} role="img" aria-label="Ollie watches glowing butterflies and occasionally jumps to catch them">
    <video ref={video} className="ollie-chase-video" poster={poster} muted loop playsInline preload="auto" aria-hidden="true" disablePictureInPicture>
      <source src={webm.url} type="video/webm" />
      <source src={chase.url} type="video/mp4" />
    </video>
  </div>;
}
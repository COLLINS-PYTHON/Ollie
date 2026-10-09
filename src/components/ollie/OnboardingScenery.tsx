import { useState } from "react";
import cloud from "@/assets/char-cloud.png";
import balloon from "@/assets/char-balloon.png";

/** Storybook cloud picture; gently bounces when tapped. */
function Cloud({ className }: { className: string; wide?: boolean }) {
  return <Tappable src={cloud} className={className} />;
}

export function Tappable({ src, className }: { src: string; className: string }) {
  const [pop, setPop] = useState(0);
  return <img src={src} alt="" decoding="async" draggable={false} key={pop}
    onClick={() => setPop((n) => n + 1)}
    className={`${className} scenery-tap ${pop ? "scenery-pop" : ""}`} />;
}

/** Decorative, browser-safe artwork. Never sits over copy or interactive controls. */
export function OnboardingScenery({ variant }: { variant: "clouds" | "paws" }) {
  return (
    <div className={`onboarding-scenery onboarding-scenery-${variant}`} aria-hidden="true">
      {variant === "clouds" ? (
        <>
          <Cloud className="onboarding-cloud onboarding-cloud-left" />
          <Cloud className="onboarding-cloud onboarding-cloud-right" wide />
          <Tappable src={balloon} className="onboarding-balloon" />
        </>
      ) : (
        [0, 1, 2].map((n) => (
          <svg key={n} className={`onboarding-paw-pair onboarding-paw-pair-${n}`} viewBox="0 0 70 100">
            {["translate(3 4) rotate(-15 15 20)", "translate(31 52) rotate(12 15 20)"].map((transform) => (
              <g key={transform} transform={transform}>
                <ellipse cx="5" cy="12" rx="4" ry="5" />
                <ellipse cx="13" cy="6" rx="4" ry="5" />
                <ellipse cx="22" cy="7" rx="4" ry="5" />
                <ellipse cx="29" cy="14" rx="4" ry="5" />
                <path d="M7 26C7 21 13 16 17 16S28 22 28 27C28 32 22 31 18 29C14 31 7 32 7 26Z" />
              </g>
            ))}
          </svg>
        ))
      )}
    </div>
  );
}
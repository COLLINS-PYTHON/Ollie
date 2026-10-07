import { useId } from "react";

/** Soft, layered clouds with no outline, bitmap load or runtime generation. */
function Cloud({ className, wide = false }: { className: string; wide?: boolean }) {
  const id = useId().replace(/:/g, "");
  return <svg className={className} viewBox="0 0 300 150" fill="none">
    <defs>
      <linearGradient id={`${id}-base`} x1="140" y1="36" x2="150" y2="128" gradientUnits="userSpaceOnUse"><stop className="cloud-light" /><stop offset=".55" className="cloud-mid" /><stop offset="1" className="cloud-shade" /></linearGradient>
      <radialGradient id={`${id}-light`} cx=".4" cy=".2" r=".8"><stop className="cloud-light" stopOpacity=".95" /><stop offset="1" className="cloud-light" stopOpacity="0" /></radialGradient>
      <filter id={`${id}-soft`} x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation=".6" /></filter>
    </defs>
    <g filter={`url(#${id}-soft)`}>
      <path d={wide ? "M32 114C13 111 14 88 34 82C36 59 58 50 76 59C80 32 108 26 126 41C142 15 181 23 185 52C211 41 234 56 235 78C263 72 286 95 270 110C250 131 65 133 32 114Z" : "M35 114C16 109 19 84 42 80C44 54 70 46 89 61C87 31 118 18 140 35C160 16 188 29 191 54C218 43 242 59 240 82C266 76 282 100 269 112C243 132 65 132 35 114Z"} fill={`url(#${id}-base)`} />
      <ellipse cx="119" cy="63" rx="35" ry="35" fill={`url(#${id}-light)`} />
      <ellipse cx="166" cy="58" rx="30" ry="31" fill={`url(#${id}-light)`} />
      <ellipse cx="75" cy="83" rx="32" ry="28" fill={`url(#${id}-light)`} />
      <ellipse cx="214" cy="82" rx="28" ry="27" fill={`url(#${id}-light)`} />
    </g>
  </svg>;
}

/** Decorative, browser-safe artwork. Never sits over copy or interactive controls. */
export function OnboardingScenery({ variant }: { variant: "clouds" | "paws" }) {
  return (
    <div className={`onboarding-scenery onboarding-scenery-${variant}`} aria-hidden="true">
      {variant === "clouds" ? (
        <>
          <Cloud className="onboarding-cloud onboarding-cloud-left" />
          <Cloud className="onboarding-cloud onboarding-cloud-right" wide />
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
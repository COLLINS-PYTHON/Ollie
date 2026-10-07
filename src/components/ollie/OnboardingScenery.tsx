/** Decorative, browser-safe artwork. Never sits over copy or interactive controls. */
export function OnboardingScenery({ variant }: { variant: "clouds" | "paws" }) {
  return (
    <div className={`onboarding-scenery onboarding-scenery-${variant}`} aria-hidden="true">
      {variant === "clouds" ? (
        <>
          <svg className="onboarding-cloud onboarding-cloud-left" viewBox="0 0 180 80" fill="none">
            <path d="M28 65C14 65 9 55 12 45C15 35 24 30 34 32C37 15 51 7 65 13C75 0 100 4 108 22C129 16 145 29 145 43C161 41 173 49 170 59C168 65 162 68 149 68H28Z" />
            <path className="onboarding-cloud-detail" d="M39 51C48 48 58 49 65 53M104 44C113 40 124 41 130 46" />
          </svg>
          <svg className="onboarding-cloud onboarding-cloud-right" viewBox="0 0 180 80" fill="none">
            <path d="M28 65C14 65 9 55 12 45C15 35 24 30 34 32C37 15 51 7 65 13C75 0 100 4 108 22C129 16 145 29 145 43C161 41 173 49 170 59C168 65 162 68 149 68H28Z" />
          </svg>
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
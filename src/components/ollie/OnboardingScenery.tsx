import cloud from "@/assets/char-cloud.png";

/** Decorative, browser-safe artwork. Never sits over copy or interactive controls. */
export function OnboardingScenery({ variant }: { variant: "clouds" | "flight" | "leaves" }) {
  return (
    <div className={`onboarding-scenery onboarding-scenery-${variant}`} aria-hidden="true">
      {variant === "clouds" ? (
        <>
          <img src={cloud} alt="" className="onboarding-cloud onboarding-cloud-left" />
          <img src={cloud} alt="" className="onboarding-cloud onboarding-cloud-right" />
        </>
      ) : (
        variant === "flight" ? (
          <svg className="onboarding-paper-flight" viewBox="0 0 96 80">
            <path className="paper-fold-light" d="M7 42 88 8 58 70 42 49Z" />
            <path className="paper-fold-blue" d="m7 42 35 7 46-41-33 47 3 15-16-21Z" />
            <path className="paper-fold-line" d="m42 49 46-41" />
          </svg>
        ) : (
          <svg className="onboarding-leaf-sprig" viewBox="0 0 96 140">
            <path className="sprig-stem" d="M46 135C58 97 35 66 52 12" />
            <path className="sprig-leaf" d="M48 88C12 86 10 57 14 50 39 49 54 67 48 88ZM48 62C76 63 87 42 82 31 59 29 48 42 48 62ZM49 34C28 27 32 8 40 3 57 12 59 23 49 34Z" />
          </svg>
        )
      )}
    </div>
  );
}
import reading from "@/assets/ollie-reading.png";
import curious from "@/assets/ollie-curious.png";
import resting from "@/assets/ollie-resting.png";

export const OLLIE_POSES = { reading, curious, resting };

/** Contextual versions of the canonical mascot, never extra recurring characters. */
export function OnboardingCompanions({ scene }: { scene: keyof typeof OLLIE_POSES }) {
  return (
    <div className={`onboarding-companions onboarding-ollie-pose pose-${scene}`} aria-hidden="true">
      <img src={OLLIE_POSES[scene]} alt="" width={420} height={420} decoding="async" draggable={false} className="contextual-ollie" />
    </div>
  );
}

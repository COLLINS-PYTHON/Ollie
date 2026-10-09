import owl from "@/assets/char-owl.png";
import turtle from "@/assets/char-turtle.png";
import butterfly from "@/assets/char-butterfly.png";

/** Dimensional storybook companions with gentle, reduced-motion-aware movement. */
export function OnboardingCompanions({ scene }: { scene: "reader" | "garden" }) {
  return (
    <div className="onboarding-companions" aria-hidden="true">
      {scene === "reader" ? (
        <>
          <img src={owl} alt="" width={816} height={816} decoding="async" className="char char-main char-owl" />
          <img src={butterfly} alt="" width={816} height={816} decoding="async" className="char char-side char-flutter" />
        </>
      ) : (
        <>
          <img src={turtle} alt="" width={816} height={816} decoding="async" className="char char-main char-turtle" />
          <img src={butterfly} alt="" width={816} height={816} decoding="async" className="char char-side char-flutter" />
        </>
      )}
    </div>
  );
}

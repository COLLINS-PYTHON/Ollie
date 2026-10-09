import { Tappable } from "./OnboardingScenery";
import owl from "@/assets/char-owl.png";
import turtle from "@/assets/char-turtle.png";
import butterfly from "@/assets/char-butterfly.png";

/** Dimensional storybook companions with gentle, reduced-motion-aware movement. */
export function OnboardingCompanions({ scene }: { scene: "reader" | "garden" }) {
  return (
    <div className="onboarding-companions" aria-hidden="true">
      {scene === "reader" ? (
        <>
          <Tappable src={owl} className="char char-main char-owl" />
          <Tappable src={butterfly} className="char char-side char-flutter" />
        </>
      ) : (
        <>
          <Tappable src={turtle} className="char char-main char-turtle" />
          <Tappable src={butterfly} className="char char-side char-flutter" />
        </>
      )}
    </div>
  );
}

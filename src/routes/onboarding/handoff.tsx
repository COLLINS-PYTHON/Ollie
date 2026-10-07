import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { onboardingState, completeOnboarding } from "@/lib/onboarding-store";
import { loadCustom } from "@/lib/custom-lesson-store";
import { childName, pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/handoff")({
  head: () => pageMeta("Hand the phone over", "Setup is done. Time to hand the phone to your child."),
  component: HandoffPage,
});

function HandoffPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);

  function start() {
    completeOnboarding();
    // Pre-readers hear Ollie say hello before their first lesson opens.
    const lvl = onboardingState.readingLevel;
    if ((lvl === "none" || lvl === "sounding") && "speechSynthesis" in window) {
      const custom = loadCustom();
      const line = custom && !custom.done
        ? `Hi ${name}! I'm Ollie. I made a lesson just for you, all about ${custom.lesson.title}.`
        : `Hi ${name}! I'm Ollie. Let's learn something fun.`;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(line));
    }
    navigate({ to: "/search" });
  }

  return (
    <div className="bg-gradient-hello min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 pb-32 text-center">
        <img src={ollie} alt="Ollie waving" className="wave-hello pop-in size-48 object-contain" />
        <h1 className="text-title mt-8 text-foreground">Ready? Hand the phone to {name}.</h1>
        <p className="text-body mt-5 max-w-xs text-muted-foreground">Hi {name}, I'm Ollie. Let's discover something wonderful together.</p>
      </main>
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <Button variant="onboarding" size="onboarding" type="button" onClick={start} className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card">
          Let's go, {name}!
        </Button>
      </div>
    </div>
  );
}

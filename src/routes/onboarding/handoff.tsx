import { speak } from "@/lib/speak";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { onboardingState, completeOnboarding } from "@/lib/onboarding-store";
import { KidSwitcher } from "@/components/ollie/KidSwitcher";
import { useState } from "react";
import { pushAll } from "@/lib/cloud-sync";
import { loadCustom } from "@/lib/custom-lesson-store";
import { childName, pageMeta } from "@/lib/meta";
import { FloatingWhale } from "@/components/ollie/FloatingWhale";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/handoff")({
  head: () => pageMeta("Hand the phone over", "Setup is done. Time to hand the phone to your child."),
  component: HandoffPage,
});

function HandoffPage() {
  const navigate = useNavigate();
  const [, refresh] = useState(0);
  const name = childName(onboardingState.name);

  function start() {
    completeOnboarding();
    void pushAll();
    // Pre-readers hear Ollie say hello before their first lesson opens.
    const lvl = onboardingState.readingLevel;
    if (lvl === "none" || lvl === "sounding") {
      const custom = loadCustom();
      const line = custom && !custom.done
        ? `Hi ${name}! I'm Ollie. I made a lesson just for you, all about ${custom.lesson.title}.`
        : `Hi ${name}! I'm Ollie. Let's learn something fun.`;
      void speak(line);
    }
    navigate({ to: "/search" });
  }

  return (
    <div className="bg-gradient-hello min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 pb-32 text-center">
        <div className="setup-reveal"><FloatingWhale pose="celebrate" size={210} /></div>
        <h1 className="text-title mt-8 text-foreground">{name}’s space is ready.</h1>
        <div className="mt-5 w-full"><KidSwitcher onChange={() => refresh(n => n + 1)} /></div>
        <p className="text-body mt-5 max-w-xs text-muted-foreground">Hi {name}, I'm Ollie. Let's discover something wonderful together.</p>
        <p className="text-support mt-6 max-w-xs rounded-card bg-card px-4 py-3 text-muted-foreground shadow-card">Your plan covers two kids. Add your other child anytime from the parent dashboard.</p>
      </main>
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <Button variant="onboarding" size="onboarding" type="button" onClick={start} className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card">
          Let's go, {name}!
        </Button>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/assurance")({
  head: () => ({
    meta: [
      { title: "Built for exactly this | Ollie" },
      { name: "description", content: "How Ollie keeps every search filtered, visible, and private." },
      { property: "og:title", content: "Built for exactly this | Ollie" },
      { property: "og:description", content: "How Ollie keeps every search filtered, visible, and private." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssurancePage,
});

function AssurancePage() {
  const name = childName(onboardingState.name);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Small icon builds in first, then the answer appears. Text-led, no hero art.
  useEffect(() => {
    const timers = [setTimeout(() => setStep(1), 100), setTimeout(() => setStep(2), 360)];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton chapter={4} title="Here's our answer" cta="Continue" onContinue={() => navigate({ to: "/onboarding/screen-time" })}>
        {step >= 1 && (
          <div className="bubble-in mb-5 flex justify-center" aria-hidden>
            <span className="flex size-12 items-center justify-center rounded-control bg-primary shadow-card">
              <ShieldCheck className="size-6 text-primary-foreground drop-shadow" />
            </span>
          </div>
        )}
        {step >= 2 && (
          <div className="bubble-in rounded-card bg-card p-5 shadow-sheet ring-2 ring-primary/25">
            <p className="text-body leading-relaxed text-foreground">
              That's exactly what Ollie is built for. Every search is filtered before {name} sees it, anything
              concerning lands straight in your dashboard, and nothing here trains on your data. Not hidden. Not
              guessed at. Visible.
            </p>
          </div>
        )}
      </OnboardingSkeleton>
    </div>
  );
}

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
    <div className="onboarding-assurance bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton chapter={4} title="Here's our answer" cta="Continue" onContinue={() => navigate({ to: "/onboarding/screen-time" })}>
          <div className={`welcome-copy mb-6 flex justify-center ${step >= 1 ? "is-visible" : ""}`} aria-hidden>
            <span className="flex size-12 items-center justify-center rounded-control bg-primary shadow-card">
              <ShieldCheck className="size-6 text-primary-foreground" />
            </span>
          </div>
          <div className={`assurance-panel welcome-copy rounded-card p-8 text-center ${step >= 2 ? "is-visible" : ""}`}>
            <p className="text-body text-foreground">
              That's exactly what Ollie is built for. Every search is filtered before {name} sees it, <span className="onboarding-highlight">anything
              concerning lands straight in your dashboard</span>, and nothing here <span className="onboarding-highlight">trains on your data</span>.
            </p>
            <p className="text-body mt-4 font-medium text-foreground">Not hidden. Not guessed at. <span className="onboarding-highlight">Visible.</span></p>
          </div>
      </OnboardingSkeleton>
    </div>
  );
}

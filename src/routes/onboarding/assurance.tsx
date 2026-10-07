import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";
import { SafetyExamples } from "@/components/ollie/SafetyExamples";

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

  return (
    <div className="onboarding-assurance bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton chapter={4} title="Here's our answer" cta="Continue" onContinue={() => navigate({ to: "/onboarding/screen-time" })}>
          <div className="assurance-copy text-center">
            <p className="text-support text-foreground">
              That's exactly what Ollie is built for. Every search is filtered before {name} sees it, <span className="onboarding-highlight">anything
              concerning lands straight in your dashboard</span>, and nothing here <span className="onboarding-highlight">trains on your data</span>.
            </p>
            <p className="text-support mt-3 font-medium text-foreground">Not hidden. Not guessed at. <span className="onboarding-highlight">Visible.</span></p>
          </div>
          <SafetyExamples name={name} />
      </OnboardingSkeleton>
    </div>
  );
}

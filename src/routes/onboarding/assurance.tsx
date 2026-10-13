import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";
import { SafetyExamples, SAFETY_CONTEXTS } from "@/components/ollie/SafetyExamples";

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
  const [selected, setSelected] = useState(0);
  const nextRef = useRef<(() => void) | null>(null);
  const context = SAFETY_CONTEXTS[selected] ?? SAFETY_CONTEXTS[0];

  return (
    <div className="onboarding-assurance bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton chapter={2} title={context.title} cta="Continue" onContinue={() => selected < 2 ? nextRef.current?.() : navigate({ to: "/onboarding/reading" })}>
          <div className="assurance-copy text-center">
            <p className="text-support text-foreground">
               {context.copy}
            </p>
             <p className="text-support mt-3 font-medium text-foreground">Age-aware answers for {name}. <span className="onboarding-highlight">Visibility for you.</span></p>
          </div>
           <SafetyExamples name={name} onSelect={setSelected} nextRef={nextRef} />
      </OnboardingSkeleton>
    </div>
  );
}

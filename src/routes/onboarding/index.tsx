import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState, saveOnboardingDraft } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "Get started | Ollie" },
      { name: "description", content: "Set up Ollie for your child in a few quick steps." },
      { property: "og:title", content: "Get started | Ollie" },
      { property: "og:description", content: "Set up Ollie for your child in a few quick steps." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(onboardingState.name);
  return (
    <div className="bg-gradient-name min-h-screen">
      <OnboardingSkeleton
        chapter={1}
        title="What is your child's name?"
        cta="Continue"
        ctaDisabled={!name.trim()}
        onContinue={() => {
          onboardingState.name = name.trim();
          saveOnboardingDraft();
          navigate({ to: "/onboarding/age" });
        }}
      >
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          aria-label="Child's first name"
          className="text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none transition-colors duration-tap placeholder:text-muted-foreground focus:border-primary"
        />
        <p className="text-support mt-3 text-muted-foreground">We use this to personalize Ollie. You can change it later.</p>
      </OnboardingSkeleton>
    </div>
  );
}

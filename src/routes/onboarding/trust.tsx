import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/trust")({
  head: () => pageMeta("Privacy and safety", "How Ollie protects your child's privacy."),
  component: TrustPage,
});

const PROVIDERS = ["Groq (answers)", "Together AI (pictures)", "OpenAI (safety checks)", "Read-aloud voice provider"];

function TrustPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [agree, setAgree] = useState(onboardingState.aiConsent);
  const [showWho, setShowWho] = useState(false);

  return (
    <div className="bg-gradient-trust min-h-screen">
      <OnboardingSkeleton chapter={4} title="Your child's privacy comes first" cta="Continue" ctaDisabled={!agree} onContinue={() => navigate({ to: "/onboarding/pin" })}>
        <div className="relative mb-6 flex h-20 items-center justify-center" aria-hidden>
          <span className="onboarding-soft-icon relative flex size-14 items-center justify-center rounded-pill">
            <ShieldCheck className="size-7" strokeWidth={1.8} />
          </span>
        </div>
        <div className="rounded-card bg-card p-5 shadow-card">
          <p className="text-body text-foreground">
            Ollie is built to meet COPPA, the U.S. law that protects children's privacy. {name}'s information and conversations are never used to train AI models, and never will be. Not now, not ever!
          </p>
          <p className="text-body mt-4 font-medium text-foreground">
            Every answer is checked. Then checked again. Then checked once more, before {name} ever sees it.
          </p>
        </div>
        <div className="mt-4 rounded-card bg-card p-5 shadow-card">
          <p className="text-body text-foreground">
            To answer {name}'s questions, Ollie securely sends them to trusted service providers who use them only to give an answer. They never use it to train AI.
          </p>
          <button type="button" onClick={() => setShowWho((v) => !v)} className="text-label mt-2 text-primary underline">
            See who
          </button>
          {showWho && (
            <ul className="text-support bubble-in mt-2 list-disc pl-5 text-muted-foreground">
              {PROVIDERS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <button
            type="button"
            role="checkbox"
            aria-checked={agree}
            onClick={() => { setAgree(!agree); onboardingState.aiConsent = !agree; }}
            className="mt-4 flex w-full items-center gap-3 rounded-control bg-surface p-3 text-left"
          >
            <span className={`flex size-6 shrink-0 items-center justify-center rounded-control border-2 ${agree ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              {agree && <Check className="size-3.5" />}
            </span>
            <span className="text-body font-medium text-foreground">I agree</span>
          </button>
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

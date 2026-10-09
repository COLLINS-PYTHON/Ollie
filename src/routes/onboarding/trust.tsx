import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/trust")({
  head: () => pageMeta("Privacy and safety", "How Ollie protects your child's privacy."),
  component: TrustPage,
});

const PROVIDERS = ["Lovable AI service: securely connects Ollie's AI requests", "OpenAI: provides answers, safety checks and pictures", "Your device's speech service: reads answers aloud when enabled"];

function TrustPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [agree, setAgree] = useState(onboardingState.aiConsent);
  const [showWho, setShowWho] = useState(false);

  return (
    <div className="bg-gradient-trust min-h-screen">
      <OnboardingSkeleton chapter={4} title={`${name}'s privacy comes first`} cta="Continue" ctaDisabled={!agree} onContinue={() => navigate({ to: "/onboarding/pin" })}>
        <div className="relative mb-6 flex h-20 items-center justify-center" aria-hidden>
          <span className="onboarding-soft-icon relative flex size-14 items-center justify-center rounded-pill">
            <ShieldCheck className="size-7" strokeWidth={1.8} />
          </span>
        </div>
        <div className="rounded-card bg-card p-5 shadow-card">
          <p className="text-body text-foreground">
            {name}'s questions are for learning, not for training AI. Ollie's AI requests are sent with model training disabled. COPPA is the U.S. law that protects children's privacy.
          </p>
          <p className="text-body mt-4 font-medium text-foreground">
            Safety checks come before the answer. If a question needs a grown-up, Ollie keeps the reply gentle and brings you into the loop.
          </p>
        </div>
        <div className="mt-4 rounded-card bg-card p-5 shadow-card">
          <p className="text-body text-foreground">
            To answer {name}'s questions and make pictures, Ollie sends the request to the AI services listed below. Read-aloud uses your device's speech service.
          </p>
          <Button variant="link" type="button" aria-expanded={showWho} aria-controls="privacy-providers" onClick={() => setShowWho((v) => !v)} className="text-label mt-2 h-auto p-0 text-primary underline">
            See who
          </Button>
          {showWho && (
            <ul id="privacy-providers" className="text-support bubble-in mt-2 list-disc pl-5 text-muted-foreground">
              {PROVIDERS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <Button variant="control"
            type="button"
            role="checkbox"
            aria-checked={agree}
            onClick={() => { setAgree(!agree); onboardingState.aiConsent = !agree; }}
            className="mt-4 flex h-auto w-full justify-start items-center gap-3 rounded-control bg-surface p-3 text-left"
          >
            <span className={`flex size-6 shrink-0 items-center justify-center rounded-control border-2 ${agree ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              {agree && <Check className="size-3.5" />}
            </span>
            <span className="text-body font-medium text-foreground">I agree</span>
          </Button>
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

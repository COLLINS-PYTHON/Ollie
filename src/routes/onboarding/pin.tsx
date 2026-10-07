import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Delete } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/pin")({
  head: () => pageMeta("Set your parent PIN", "Create a PIN to open the Parent Dashboard."),
  component: PinPage,
});

function PinPage() {
  const navigate = useNavigate();
  const [first, setFirst] = useState(onboardingState.pin);
  const [pin, setPin] = useState(onboardingState.pin);
  const [confirming, setConfirming] = useState(!!onboardingState.pin);
  const [error, setError] = useState(false);
  const done = confirming && pin.length === 4 && pin === first;

  function press(d: string) {
    if (pin.length >= 4) return;
    const next = pin + d;
    setError(false);
    setPin(next);
    if (next.length === 4 && !confirming) {
      setTimeout(() => { setFirst(next); setPin(""); setConfirming(true); }, 250);
    } else if (next.length === 4 && next !== first) {
      setTimeout(() => { setError(true); setPin(""); }, 250);
    } else if (next.length === 4) {
      onboardingState.pin = next;
    }
  }

  return (
    <div className="bg-gradient-lagoon min-h-screen">
      <OnboardingSkeleton chapter={4} title={confirming ? "Enter it once more" : "Set your parent PIN"} cta="Continue" ctaDisabled={!done} onContinue={() => navigate({ to: "/onboarding/paywall" })}>
        <p className="text-support mb-6 text-center text-muted-foreground">Their space to explore. Your place to stay in the loop.</p>
        <div className="flex justify-center gap-4" aria-label={`${pin.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`size-4 rounded-pill transition-colors duration-tap ${i < pin.length ? "bg-primary" : "bg-card shadow-card"}`} />
          ))}
        </div>
        <p className="text-support mt-3 h-5 text-center text-muted-foreground">{error ? "Those didn't match. Try again." : done ? "PIN set." : ""}</p>
        <div className="mx-auto mt-3 grid max-w-64 grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((k) =>
            k === "" ? <span key="blank" /> : (
              <Button variant="control"
                key={k}
                type="button"
                aria-label={k === "del" ? "Delete" : k}
                onClick={() => (k === "del" ? setPin(pin.slice(0, -1)) : press(k))}
                className="text-title flex h-14 items-center justify-center rounded-pill bg-card text-foreground shadow-card active:scale-95"
              >
                {k === "del" ? <Delete className="size-5" /> : k}
              </Button>
            ),
          )}
        </div>
        <div className="mt-6 rounded-card bg-card/80 p-4">
          <p className="text-support text-foreground">
            Screen time, slideshow settings, and everything else you just set up can be changed anytime from the dashboard.
          </p>
          <p className="text-support mt-2 text-foreground">
            Your dashboard shows exactly what was flagged and why, not just a count or a vague "all clear."
          </p>
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";

export const Route = createFileRoute("/onboarding/tone")({
  head: () => pageMeta("How Ollie sounds", "Pick how Ollie talks with your child."),
  component: TonePage,
});

const TONES = [
  { id: "playful", label: "Playful & Silly", hint: "Jokes, puns, high energy", speed: "0.7s", height: "-14px" },
  { id: "gentle", label: "Warm & Gentle", hint: "Calm, patient, soothing pace", speed: "3.2s", height: "-3px" },
  { id: "curious", label: "Curious & Adventurous", hint: "Let's find out together", speed: "1.2s", height: "-9px" },
  { id: "clear", label: "Clear & Educational", hint: "Explains the why behind every answer", speed: "2.2s", height: "-4px" },
  { id: "custom", label: "Describe it yourself", hint: "Write your own tone", speed: "1.6s", height: "-6px" },
];

function TonePage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [tone, setTone] = useState(onboardingState.tone);
  const [custom, setCustom] = useState(onboardingState.customTone);
  const active = TONES.find((t) => t.id === tone);
  const ready = tone && (tone !== "custom" || custom.trim());

  return (
    <div className="bg-gradient-blush min-h-screen">
      <OnboardingSkeleton
        chapter={4}
        title={`How should Ollie sound to ${name}?`}
        cta="Continue"
        ctaDisabled={!ready}
        onContinue={() => navigate({ to: "/onboarding/try" })}
      >
        <div className="mb-4 flex justify-center">
          <img
            key={tone ?? "none"}
            src={ollie}
            alt=""
            className="bounce-soft size-28 object-contain"
            style={{ "--bounce-speed": active?.speed ?? "2.4s", "--bounce-height": active?.height ?? "-4px" } as CSSProperties}
          />
        </div>
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Reply tone">
          {TONES.map((t) => {
            const on = tone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setTone(t.id);
                  onboardingState.tone = t.id;
                }}
                className={`rounded-card p-4 text-left transition-all duration-tap active:scale-[0.98] ${on ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/70"}`}
              >
                <span className="text-body block font-semibold text-foreground">{t.label}</span>
                <span className="text-support text-muted-foreground">{t.hint}</span>
              </button>
            );
          })}
        </div>
        {tone === "custom" && (
          <textarea
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              onboardingState.customTone = e.target.value;
            }}
            rows={3}
            placeholder="For example: calm and cozy, like a bedtime story"
            aria-label="Describe Ollie's tone"
            className="text-body mt-3 w-full rounded-control border-2 border-transparent bg-card p-4 text-foreground shadow-card outline-none focus:border-primary"
          />
        )}
      </OnboardingSkeleton>
    </div>
  );
}

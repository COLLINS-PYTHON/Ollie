import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, MessageCircleHeart } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState, type ReadingLevel } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/preview")({
  head: () => ({
    meta: [
      { title: "A peek at Ollie | Ollie" },
      { name: "description", content: "See how Ollie will answer your child's questions." },
      { property: "og:title", content: "A peek at Ollie | Ollie" },
      { property: "og:description", content: "See how Ollie will answer your child's questions." },
    ],
  }),
  component: PreviewPage,
});

const QUESTION = "Why is the sky blue?";

const ANSWERS: Record<ReadingLevel, string> = {
  none: "The sky is blue because sunlight bounces off the air.",
  sounding: "The sky looks blue because sunlight bounces off tiny bits of air.",
  stories:
    "Sunlight looks white, but it is really made of many colors. When it reaches our air, the blue part bounces around the most, so that is the color we see.",
  chapters:
    "Sunlight is actually a mixture of every color. As it travels through the atmosphere, tiny air molecules scatter the shorter blue wavelengths in every direction, so the whole sky appears blue to your eyes.",
};

function PreviewPage() {
  const navigate = useNavigate();
  const name = onboardingState.name.trim() || "your child";
  const level = onboardingState.readingLevel ?? "stories";
  const answer = ANSWERS[level];
  const [step, setStep] = useState(0);

  // Icons build in one at a time, then the bubbles appear.
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 350),
      setTimeout(() => setStep(2), 850),
      setTimeout(() => setStep(3), 1450),
      setTimeout(() => setStep(4), 2050),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gradient-ice min-h-screen">
      <OnboardingSkeleton chapter={4} title={`Here's how Ollie will answer ${name}`} cta="Continue" onContinue={() => navigate({ to: "/onboarding/interests" })}>
        <div className="rounded-card bg-card p-5 shadow-sheet">
          {/* glossy 3D-style icons, building in one at a time */}
          <div className="mb-5 flex items-center justify-center gap-3" aria-hidden>
            <span
              className={`flex size-12 items-center justify-center rounded-control bg-gradient-to-br from-periwinkle to-brand shadow-card transition-all duration-reveal ${
                step >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <Sparkles className="size-6 text-primary-foreground drop-shadow" />
              <span className="absolute" />
            </span>
            <span
              className={`flex size-12 items-center justify-center rounded-control bg-gradient-to-br from-gold to-accent-4 shadow-card transition-all duration-reveal ${
                step >= 2 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <MessageCircleHeart className="size-6 text-primary-foreground drop-shadow" />
            </span>
          </div>

          {/* iMessage-style exchange */}
          <div className="flex flex-col gap-2.5">
            {step >= 3 && (
              <div className="bubble-in flex justify-end">
                <p className="text-body max-w-[80%] rounded-[20px] rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground">
                  {QUESTION}
                </p>
              </div>
            )}
            {step >= 4 && (
              <div className="bubble-in flex justify-start">
                <p className="text-body max-w-[85%] rounded-[20px] rounded-bl-md bg-surface-2 px-4 py-2.5 text-foreground">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="text-support mt-4 text-center text-muted-foreground">
          Answers grow with {name} as reading skills grow.
        </p>
      </OnboardingSkeleton>
    </div>
  );
}

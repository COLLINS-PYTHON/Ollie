import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, MessageCircleHeart } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState, type ReadingLevel } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/preview")({
  head: () => ({
    meta: [
      { title: "A peek at Ollie | Ollie" },
      { name: "description", content: "See how Ollie will answer your child's questions." },
      { property: "og:title", content: "A peek at Ollie | Ollie" },
      { property: "og:description", content: "See how Ollie will answer your child's questions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  const name = childName(onboardingState.name);
  const level = onboardingState.readingLevel ?? "stories";
  const answer = ANSWERS[level];
  const [step, setStep] = useState(0);

  // Icons build in one at a time, then the bubbles appear.
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 120),
      setTimeout(() => setStep(2), 260),
      setTimeout(() => setStep(3), 420),
      setTimeout(() => setStep(4), 700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gradient-ice min-h-screen">
      <OnboardingSkeleton chapter={4} title={`Big questions. Answers at ${name}'s level.`} cta="Continue" onContinue={() => navigate({ to: "/onboarding/interests" })}>
        <div className="rounded-card bg-card p-5 shadow-sheet">
          {/* Soft line icons, building in one at a time. */}
          <div className="mb-5 flex items-center justify-center gap-3" aria-hidden>
            <span
              className={`onboarding-soft-icon flex size-12 items-center justify-center rounded-control transition-all duration-reveal ${
                step >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <Sparkles className="size-6" strokeWidth={1.8} />
              <span className="absolute" />
            </span>
            <span
              className={`onboarding-soft-icon onboarding-soft-icon-teal flex size-12 items-center justify-center rounded-control transition-all duration-reveal ${
                step >= 2 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <MessageCircleHeart className="size-6" strokeWidth={1.8} />
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
          The same curiosity, explained at <span className="onboarding-highlight">{name}'s pace</span>. Words they can understand. Room for a little wonder.
        </p>
      </OnboardingSkeleton>
    </div>
  );
}

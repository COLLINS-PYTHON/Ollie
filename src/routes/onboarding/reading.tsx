import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState, type ReadingLevel } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/reading")({
  head: () => ({
    meta: [
      { title: "Reading level | Ollie" },
      { name: "description", content: "Tell Ollie how your child reads so answers fit just right." },
      { property: "og:title", content: "Reading level | Ollie" },
      { property: "og:description", content: "Tell Ollie how your child reads so answers fit just right." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReadingPage,
});

const OPTIONS: { id: ReadingLevel; label: string }[] = [
  { id: "none", label: "Not reading yet" },
  { id: "sounding", label: "Sounding out simple words" },
  { id: "stories", label: "Reads short stories" },
  { id: "chapters", label: "Reads chapter books confidently" },
];

function ReadingPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [level, setLevel] = useState<ReadingLevel | null>(onboardingState.readingLevel);

  return (
    <div className="bg-gradient-ice min-h-screen">
      <OnboardingSkeleton
        chapter={3}
        title={`What's ${name}'s reading level?`}
        cta="Continue"
        ctaDisabled={!level}
        onContinue={() => navigate({ to: "/onboarding/preview" })}
      >
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Reading level">
          {OPTIONS.map((opt) => {
            const selected = level === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  setLevel(opt.id);
                  onboardingState.readingLevel = opt.id;
                }}
                className={`text-body flex h-14 w-full items-center justify-between gap-3 rounded-control px-4 text-left shadow-card transition-all duration-tap active:scale-[0.98] ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground"
                }`}
              >
                {opt.label}
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-pill transition-colors duration-tap ${
                    selected ? "bg-primary-foreground/25" : "bg-surface-2"
                  }`}
                >
                  {selected && <Check className="size-4" aria-hidden />}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-support mt-4 text-center text-muted-foreground">
          Ollie tunes every answer to match. You can change this anytime.
        </p>
      </OnboardingSkeleton>
    </div>
  );
}

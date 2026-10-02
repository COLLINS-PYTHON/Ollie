import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/priorities")({
  head: () => ({
    meta: [
      { title: "What matters most | Ollie" },
      { name: "description", content: "Choose what matters most to you so Ollie can focus on it." },
      { property: "og:title", content: "What matters most | Ollie" },
      { property: "og:description", content: "Choose what matters most to you so Ollie can focus on it." },
    ],
  }),
  component: PrioritiesPage,
});

const OPTIONS = [
  { id: "reading", label: "Build strong reading & comprehension skills" },
  { id: "curiosity", label: "Encourage curiosity through safe, guided conversations" },
  { id: "creativity", label: "Spark creativity and imagination" },
  { id: "filtered", label: "Give safe, filtered access to information" },
  { id: "habit", label: "Build a consistent daily learning habit" },
];

function PrioritiesPage() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState(onboardingState.priorities);

  return (
    <div className="bg-gradient-mist min-h-screen">
      <OnboardingSkeleton chapter={4} title="What matters most to you?" cta="Continue" ctaDisabled={picked.length === 0} onContinue={() => navigate({ to: "/onboarding/tone" })}>
        <div className="flex flex-col gap-3" role="group" aria-label="What matters most">
          {OPTIONS.map(({ id, label }) => {
            const on = picked.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const next = on ? picked.filter((x) => x !== id) : [...picked, id];
                  setPicked(next);
                  onboardingState.priorities = next;
                }}
                className={`flex items-center gap-3.5 rounded-card p-4 text-left transition-all duration-tap active:scale-[0.98] ${
                  on ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/70"
                }`}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-pill border-2 transition-colors duration-tap ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {on && <Check className="size-3.5" aria-hidden />}
                </span>
                <span className="text-body font-medium leading-snug text-foreground">{label}</span>
              </button>
            );
          })}
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, BookOpen, Compass, Palette, ShieldCheck, CalendarDays } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/priorities")({
  head: () => ({
    meta: [
      { title: "What matters most | Ollie" },
      { name: "description", content: "Choose what matters most to you so Ollie can focus on it." },
      { property: "og:title", content: "What matters most | Ollie" },
      { property: "og:description", content: "Choose what matters most to you so Ollie can focus on it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrioritiesPage,
});

const OPTIONS = [
  { id: "reading", label: "Build strong reading & comprehension skills", icon: BookOpen },
  { id: "curiosity", label: "Encourage curiosity through safe, guided conversations", icon: Compass },
  { id: "creativity", label: "Spark creativity and imagination", icon: Palette },
  { id: "filtered", label: "Give safe, filtered access to information", icon: ShieldCheck },
  { id: "habit", label: "Build a consistent daily learning habit", icon: CalendarDays },
];

function PrioritiesPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [picked, setPicked] = useState(onboardingState.priorities);

  return (
    <div className="bg-gradient-mist min-h-screen">
      <OnboardingSkeleton chapter={4} title={`What matters most for ${name}?`} cta="Continue" ctaDisabled={picked.length === 0} onContinue={() => navigate({ to: "/onboarding/tone" })}>
        <p className="text-support mb-5 text-center text-muted-foreground">What would you love to see {name} discover? Choose everything that feels right.</p>
        <div className="flex flex-col gap-3" role="group" aria-label="What matters most">
          {OPTIONS.map(({ id, label, icon: Icon }) => {
            const on = picked.includes(id);
            return (
              <Button variant="control"
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const next = on ? picked.filter((x) => x !== id) : [...picked, id];
                  setPicked(next);
                  onboardingState.priorities = next;
                }}
                className={`flex h-auto min-h-20 items-center gap-3.5 whitespace-normal rounded-control p-4 text-left transition-all duration-tap active:scale-[0.98] ${
                  on ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/70"
                }`}
              >
                <span className="onboarding-soft-icon flex size-10 shrink-0 items-center justify-center rounded-control"><Icon className="size-5" strokeWidth={1.8} aria-hidden="true" /></span>
                <span className="text-body min-w-0 flex-1 whitespace-normal font-medium leading-snug text-foreground">{label}</span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-pill border-2 transition-colors duration-tap ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {on && <Check className="size-3.5" aria-hidden />}
                </span>
              </Button>
            );
          })}
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

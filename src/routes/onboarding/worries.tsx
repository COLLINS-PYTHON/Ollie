import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircleQuestion, ShieldAlert, Smartphone, Eye } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/worries")({
  head: () => ({
    meta: [
      { title: "Your worries | Ollie" },
      { name: "description", content: "Tell us what worries you most so Ollie can address it directly." },
      { property: "og:title", content: "Your worries | Ollie" },
      { property: "og:description", content: "Tell us what worries you most so Ollie can address it directly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorriesPage,
});

const WORRIES = [
  { id: "visibility", label: "I don't always know what they're asking AI", icon: MessageCircleQuestion },
  { id: "stumble", label: "They could stumble onto something I wouldn't choose for them", icon: ShieldAlert },
  { id: "scrolling", label: "Too much passive scrolling, not enough real learning", icon: Smartphone },
  { id: "see", label: "I want to see what's happening, not just hope it's fine.", icon: Eye },
];

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function WorriesPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [worries, setWorries] = useState(onboardingState.worries);

  return (
    <div className="bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton
        chapter={4}
        title={`What worries you most about ${name} and AI today?`}
        cta="Continue"
        ctaDisabled={worries.length === 0}
        onContinue={() => navigate({ to: "/onboarding/assurance" })}
      >
        <div className="flex flex-col gap-3" role="group" aria-label="Your worries">
          {WORRIES.map(({ id, label, icon: Icon }) => {
            const on = worries.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const next = toggle(worries, id);
                  setWorries(next);
                  onboardingState.worries = next;
                }}
                className={`flex items-center gap-3.5 rounded-card p-4 text-left transition-all duration-tap active:scale-[0.98] ${
                  on ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/60"
                }`}
              >
                <span
                  className={`glossy relative flex size-12 shrink-0 items-center justify-center rounded-control bg-gradient-to-br from-brand to-brand-deep transition-all duration-tap ${
                    on ? "scale-105" : "opacity-75 saturate-50"
                  }`}
                >
                  <Icon className="size-6 text-primary-foreground drop-shadow" strokeWidth={2.2} aria-hidden />
                  {on && (
                    <span className="absolute -right-1.5 -top-1.5 z-10 flex size-5 items-center justify-center rounded-pill bg-primary text-primary-foreground shadow-card">
                      <Check className="size-3" aria-hidden />
                    </span>
                  )}
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

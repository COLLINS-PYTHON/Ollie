import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { INTERESTS } from "@/lib/interests";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/interests")({
  head: () => ({
    meta: [
      { title: "Interests | Ollie" },
      { name: "description", content: "Pick what your child loves so Ollie's lessons feel personal." },
      { property: "og:title", content: "Interests | Ollie" },
      { property: "og:description", content: "Pick what your child loves so Ollie's lessons feel personal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InterestsPage,
});

const STRUGGLES = ["Reading", "Math", "Science", "Staying focused"];

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function InterestsPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [interests, setInterests] = useState(onboardingState.interests);
  const [custom, setCustom] = useState(onboardingState.customInterest);
  const [struggles, setStruggles] = useState(onboardingState.struggles);
  const [customStruggle, setCustomStruggle] = useState(onboardingState.customStruggle);

  return (
    <div className="bg-gradient-wash min-h-screen">
      <OnboardingSkeleton
        chapter={4}
        title={`What is ${name} into?`}
        cta="Continue"
        ctaDisabled={interests.length === 0}
        onContinue={() => navigate({ to: "/onboarding/lessons" })}
      >
        <div className="grid grid-cols-3 gap-3" role="group" aria-label="Interests">
          {INTERESTS.map(({ id, label, icon: Icon, tile }) => {
            const on = interests.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const next = toggle(interests, id);
                  setInterests(next);
                  onboardingState.interests = next;
                }}
                className={`flex flex-col items-center gap-2 rounded-card p-2.5 transition-all duration-tap active:scale-95 ${
                  on ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/60"
                }`}
              >
                <span className={`glossy relative flex size-14 items-center justify-center rounded-control bg-gradient-to-br ${tile} transition-all duration-tap ${on ? "scale-105" : "opacity-80 saturate-50"}`}>
                  <Icon className="size-7 text-primary-foreground drop-shadow" strokeWidth={2.2} aria-hidden />
                  {on && (
                    <span className="absolute -right-1.5 -top-1.5 z-10 flex size-5 items-center justify-center rounded-pill bg-primary text-primary-foreground shadow-card">
                      <Check className="size-3" aria-hidden />
                    </span>
                  )}
                </span>
                <span className="text-label text-center leading-tight text-foreground">{label}</span>
              </button>
            );
          })}
        </div>

        <input
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            onboardingState.customInterest = e.target.value;
          }}
          placeholder="Something else? Type it here"
          aria-label="Custom interest"
          className="text-body mt-4 h-14 w-full rounded-control bg-card px-4 text-foreground shadow-card outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
        />
        <p className="text-support mt-4 text-muted-foreground">
          Every day, {name} gets a short educational slideshow, just a few minutes long, built around what they're into and matched to their age and reading level. Just as much learning as fun.
        </p>

        <section className="mt-8 rounded-card border border-card/80 bg-card/60 p-4 shadow-card backdrop-blur-sm">
          <h2 className="text-body font-semibold text-foreground">Is there a subject {name} finds tricky?</h2>
          <p className="text-support text-muted-foreground">Optional. Ollie will go gently here.</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Tricky subjects">
            {STRUGGLES.map((s) => {
              const on = struggles.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    const next = toggle(struggles, s);
                    setStruggles(next);
                    onboardingState.struggles = next;
                  }}
                  className={`text-label h-9 rounded-pill px-4 transition-colors duration-tap ${
                    on ? "bg-navy text-primary-foreground shadow-card" : "bg-card text-foreground shadow-card"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <input
            value={customStruggle}
            onChange={(e) => {
              setCustomStruggle(e.target.value);
              onboardingState.customStruggle = e.target.value;
            }}
            placeholder="Something else?"
            aria-label="Custom tricky subject"
            className="text-body mt-3 h-12 w-full rounded-control bg-card px-4 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
          />
        </section>
      </OnboardingSkeleton>
    </div>
  );
}

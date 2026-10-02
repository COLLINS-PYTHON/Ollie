import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { INTERESTS } from "@/lib/interests";

export const Route = createFileRoute("/onboarding/lessons")({
  head: () => ({
    meta: [
      { title: "Your child's lessons | Ollie" },
      { name: "description", content: "A preview of lessons shaped around your child's interests." },
      { property: "og:title", content: "Your child's lessons | Ollie" },
      { property: "og:description", content: "A preview of lessons shaped around your child's interests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LessonsPage,
});

const FAN = [
  "-rotate-[9deg] -translate-x-16 translate-y-4",
  "rotate-[2deg] z-10",
  "rotate-[11deg] translate-x-16 translate-y-6",
];

function LessonsPage() {
  const navigate = useNavigate();
  const name = onboardingState.name.trim() || "your child";
  let picks = INTERESTS.filter((i) => onboardingState.interests.includes(i.id)).slice(0, 3);
  if (picks.length === 0) picks = INTERESTS.slice(0, 3);
  const slots = picks.length === 1 ? [FAN[1]] : picks.length === 2 ? [FAN[0], FAN[2]] : FAN;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingSkeleton chapter={4} title={`${name}'s lessons will look like this`} cta="Continue" onContinue={() => navigate({ to: "/onboarding/worries" })}>
        <div className="rounded-card bg-card p-5 shadow-sheet">
          <div className="relative flex h-80 items-center justify-center">
            {picks.map(({ id, label, icon: Icon, tile, sample }, i) => (
              <article
                key={id}
                style={{ animationDelay: `${i * 160}ms` }}
                className={`bubble-in absolute w-44 ${slots[i]}`}
              >
                <div className={`flex aspect-[3/4] flex-col justify-between rounded-card bg-gradient-to-br ${tile} p-4 shadow-sheet ring-4 ring-card`}>
                  <span className="glossy flex size-11 items-center justify-center rounded-control bg-card/25">
                    <Icon className="size-6 text-primary-foreground drop-shadow" aria-hidden />
                  </span>
                  <div>
                    <p className="text-label uppercase tracking-wide text-primary-foreground/80">{label}</p>
                    <p className="text-body mt-1 font-semibold leading-snug text-primary-foreground">{sample}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="text-support mt-4 text-center text-muted-foreground">
          Every slideshow is built around what {name} loves.
        </p>
      </OnboardingSkeleton>
    </div>
  );
}

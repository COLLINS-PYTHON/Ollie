import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { INTERESTS } from "@/lib/interests";
import { childName } from "@/lib/meta";
import { LessonCover } from "@/components/ollie/LessonCover";

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

const PREVIEW_TOPICS: Record<string, { id: string; question: string }> = {
  space: { id: "moon-phases", question: "Why does the Moon change shape?" },
  ocean: { id: "sea-turtles", question: "How do sea turtles breathe?" },
  dinos: { id: "dino-eggs", question: "Did dinosaurs hatch from eggs?" },
};

function LessonsPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  let picks = INTERESTS.filter((i) => onboardingState.interests.includes(i.id)).slice(0, 3);
  if (picks.length === 0) picks = INTERESTS.slice(0, 3);
  const slots = picks.length === 1 ? [FAN[1]] : picks.length === 2 ? [FAN[0], FAN[2]] : FAN;

  return (
    <div className="min-h-screen bg-background">
      <OnboardingSkeleton chapter={4} title={`Here's how ${name}'s daily lessons will look`} cta="Continue" onContinue={() => navigate({ to: "/onboarding/worries" })}>
          <div className="relative flex h-80 items-center justify-center">
            {picks.map(({ id, label, sample }, i) => (
              <article
                key={id}
                style={{ animationDelay: `${i * 160}ms` }}
                className={`lesson-preview-card absolute w-44 ${slots[i]}`}
              >
                <div className="flex aspect-[3/4] flex-col overflow-hidden rounded-card bg-card shadow-sheet ring-4 ring-card">
                  <LessonCover categoryId={id} topicId={PREVIEW_TOPICS[id]?.id ?? ""} title={label} className="w-full" />
                  <div className="px-4 pb-4">
                    <p className="text-label text-muted-foreground">{label}</p>
                    <p className="text-body mt-1 font-semibold leading-snug text-foreground">{PREVIEW_TOPICS[id]?.question ?? sample}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        <p className="text-support mt-4 text-center text-muted-foreground">
          A fresh discovery, a quick quiz and a little moment of “I know that!” Built around <span className="onboarding-highlight">what {name} loves</span>.
        </p>
      </OnboardingSkeleton>
    </div>
  );
}

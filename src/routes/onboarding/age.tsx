import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding/age")({
  head: () => ({
    meta: [
      { title: "Your child's age | Ollie" },
      { name: "description", content: "Tell Ollie your child's age to tune the experience." },
      { property: "og:title", content: "Your child's age | Ollie" },
      { property: "og:description", content: "Tell Ollie your child's age to tune the experience." },
    ],
  }),
  component: AgePage,
});

const AGES = [4, 5, 6, 7, 8, 9, 10, 11, 12];
const ITEM_H = 48;

function AgePage() {
  const name = onboardingState.name.trim() || "your child";
  const [age, setAge] = useState(onboardingState.age);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = AGES.indexOf(onboardingState.age) * ITEM_H;
  }, []);

  const settle = () => {
    const el = listRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(AGES.length - 1, idx));
    el.scrollTo({ top: clamped * ITEM_H, behavior: "smooth" });
    setAge(AGES[clamped]);
    onboardingState.age = AGES[clamped];
  };

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(AGES.length - 1, Math.round(el.scrollTop / ITEM_H)));
    setAge(AGES[idx]);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(settle, 120);
  };

  return (
    <div className="bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton chapter={2} title={`What is ${name}'s age?`} cta="Continue">
        <div className="relative mx-auto w-full max-w-[220px]">
          {/* selection highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 rounded-control bg-card shadow-card"
          />
          <div
            ref={listRef}
            onScroll={onScroll}
            role="listbox"
            aria-label="Age"
            aria-activedescendant={`age-${age}`}
            className="h-[240px] snap-y snap-mandatory overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ paddingTop: 96, paddingBottom: 96 }}
          >
            {AGES.map((a) => {
              const active = a === age;
              return (
                <div
                  key={a}
                  id={`age-${a}`}
                  role="option"
                  aria-selected={active}
                  className={`flex h-12 snap-center items-center justify-center text-title transition-all duration-element ${
                    active ? "age-glow text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {a}
                </div>
              );
            })}
          </div>
          {/* fade edges */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface-2 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-2 to-transparent" />
        </div>

        {age >= 4 && age <= 6 && (
          <p className="text-support screen-enter mx-auto mt-6 max-w-xs rounded-control bg-card p-4 text-center text-muted-foreground shadow-card">
            For kids this age, Ollie works even better together. We'd love for you to explore
            alongside {name} sometimes, though it's completely up to you.
          </p>
        )}
      </OnboardingSkeleton>
    </div>
  );
}

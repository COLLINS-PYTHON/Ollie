import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/age")({
  head: () => ({
    meta: [
      { title: "Your child's age | Ollie" },
      { name: "description", content: "Tell Ollie your child's age to tune the experience." },
      { property: "og:title", content: "Your child's age | Ollie" },
      { property: "og:description", content: "Tell Ollie your child's age to tune the experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AgePage,
});

const AGES = [4, 5, 6, 7, 8, 9, 10, 11, 12];
const ITEM_H = 56;

function AgePage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [age, setAge] = useState(onboardingState.age);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const index = Math.max(0, AGES.indexOf(onboardingState.age));
    requestAnimationFrame(() => {
      el.scrollTop = index * ITEM_H;
    });
    return () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const settle = () => {
    const el = listRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(AGES.length - 1, idx));
    el.scrollTo({ top: clamped * ITEM_H, behavior: "smooth" });
    const landed = AGES[clamped] ?? 7;
    setAge(landed);
    onboardingState.age = landed;
  };

  const choose = (nextAge: number) => {
    const index = AGES.indexOf(nextAge);
    if (index < 0) return;
    setAge(nextAge);
    onboardingState.age = nextAge;
    listRef.current?.scrollTo({ top: index * ITEM_H, behavior: "smooth" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const current = AGES.indexOf(age);
    choose(AGES[Math.max(0, Math.min(AGES.length - 1, current + direction))] ?? age);
  };

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(AGES.length - 1, Math.round(el.scrollTop / ITEM_H)));
    setAge(AGES[idx] ?? 7);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(settle, 120);
  };

  return (
    <div className="bg-gradient-lilac min-h-screen">
      <OnboardingSkeleton
        chapter={2}
        title={`What is ${name}'s age?`}
        cta="Continue"
        onContinue={() => navigate({ to: "/onboarding/reading" })}
      >
        <div className="mx-auto flex w-full max-w-xs flex-col items-center">
          <div className="age-wheel-shell relative h-64 w-full overflow-hidden rounded-card" aria-label="Choose age">
            <div aria-hidden className="age-wheel-selection pointer-events-none absolute inset-x-4 top-1/2 z-10 h-14 -translate-y-1/2 rounded-control" />
            <div
              ref={listRef}
              onScroll={onScroll}
              onKeyDown={onKeyDown}
              role="listbox"
              tabIndex={0}
              aria-label={`${name}'s age`}
              aria-activedescendant={`age-${age}`}
              className="relative z-20 h-full snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ paddingTop: 100, paddingBottom: 100 }}
            >
              {AGES.map((a) => {
                const active = a === age;
                return (
                  <button
                    key={a}
                    id={`age-${a}`}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(a)}
                    className={`flex h-14 w-full snap-center items-center justify-center transition-all duration-element ${
                      active ? "age-glow text-[34px] font-extrabold text-primary" : "text-[22px] font-semibold text-muted-foreground"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
            <div aria-hidden className="age-wheel-mask pointer-events-none absolute inset-0 z-30" />
          </div>
          <p className="text-label mt-3 font-bold uppercase text-muted-foreground">Years old</p>
        </div>

        {age >= 4 && age <= 6 && (
          <p className="text-support screen-enter mx-auto mt-5 max-w-xs rounded-control border border-card/80 bg-card/80 p-4 text-center text-foreground shadow-card backdrop-blur-sm">
            For kids this age, Ollie works even better together. We'd love for you to explore
            alongside {name} sometimes, though it's completely up to you.
          </p>
        )}
      </OnboardingSkeleton>
    </div>
  );
}

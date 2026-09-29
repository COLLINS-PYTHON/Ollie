import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ThinkingOrb } from "thinking-orbs";
import { ScreenTitle } from "@/components/ollie/Screen";

const ORB_STATES = ["searching", "shaping", "breathing", "composing"] as const;
type OrbStateName = (typeof ORB_STATES)[number];

function SearchPlaceholder() {
  const [state, setState] = useState<OrbStateName>("searching");

  return (
    <main className="screen-enter mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-5 pb-32 pt-16">
      <ScreenTitle>Search</ScreenTitle>
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <ThinkingOrb
          state={state}
          size={64}
          theme="light"
          aria-label={`Orb, ${state}`}
        />
        <div className="flex items-center gap-2">
          {ORB_STATES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setState(s)}
              aria-pressed={state === s}
              className={`rounded-pill px-4 py-2 text-label transition-colors duration-tap ${
                state === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/_tabs/search")({
  head: () => ({
    meta: [
      { title: "Search | Ollie" },
      { name: "description", content: "Ask Ollie anything and learn safely." },
      { property: "og:title", content: "Search | Ollie" },
      { property: "og:description", content: "Ask Ollie anything and learn safely." },
    ],
  }),
  component: SearchPlaceholder,
});

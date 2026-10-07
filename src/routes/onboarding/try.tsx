import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Wand2 } from "lucide-react";
import { ThinkingOrb } from "thinking-orbs";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { INTERESTS } from "@/lib/interests";
import { childName, pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/try")({
  head: () => pageMeta("Try Ollie yourself", "Ask a question and make a picture with Ollie."),
  component: TryPage,
});

/* Sample demo until the AI providers are connected. */
const SAMPLE_ANSWER =
  "Great question! Here is a safe, age-matched answer from Ollie. Real answers switch on once Ollie's AI is connected.";

function TryPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [mode, setMode] = useState<"search" | "image" | null>(null);
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "done">("idle");
  const [used, setUsed] = useState({ search: onboardingState.triedSearch, image: onboardingState.triedImage });

  const picked = INTERESTS.filter((i) => onboardingState.interests.includes(i.id));
  const prompts = (picked.length ? picked : INTERESTS).slice(0, 3).map((i) => i.sample);

  function run(text: string) {
    if (!mode || used[mode] || !text.trim()) return;
    setQ(text);
    setPhase("thinking");
    setTimeout(() => {
      setPhase("done");
      setUsed((u) => ({ ...u, [mode]: true }));
      if (mode === "search") onboardingState.triedSearch = true;
      else onboardingState.triedImage = true;
    }, 1800);
  }

  return (
    <div className="bg-gradient-sunrise min-h-screen">
      <OnboardingSkeleton chapter={4} title="Try it yourself" cta="Continue" onContinue={() => navigate({ to: "/onboarding/trust" })}>
        <p className="text-body text-foreground">
          Try Ollie for yourself. Ask a question, make a picture, and see exactly what {name} will experience.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {([
            { id: "search", label: "Try Safe Search", icon: Search },
            { id: "image", label: "Try Image Generation", icon: Wand2 },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => {
                setMode(id);
                setPhase(used[id] ? "done" : "idle");
                setQ("");
              }}
              className={`flex flex-col items-center gap-2 rounded-card p-4 transition-all duration-tap active:scale-[0.98] ${mode === id ? "bg-card shadow-card ring-2 ring-primary" : "bg-card/70"}`}
            >
              <span className="onboarding-soft-icon flex size-11 items-center justify-center rounded-control">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <span className="text-label text-foreground">{label}</span>
            </button>
          ))}
        </div>

        {mode && phase === "idle" && !used[mode] && (
          <div className="bubble-in mt-5 rounded-card bg-card p-4 shadow-card">
            {mode === "search" && (
              <div className="mb-3 flex flex-col gap-2">
                {prompts.map((p) => (
                  <button key={p} type="button" onClick={() => run(p)} className="text-support rounded-control bg-surface px-3 py-2.5 text-left text-foreground active:scale-[0.98]">
                    {p}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); run(q); }} className="flex gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={mode === "search" ? "Or type your own question" : "Describe a picture"}
                aria-label={mode === "search" ? "Your question" : "Picture description"}
                className="text-body h-12 flex-1 rounded-control bg-surface px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" disabled={!q.trim()} className="text-button rounded-control bg-primary px-4 text-primary-foreground disabled:bg-surface-2 disabled:text-muted-foreground">
                Go
              </button>
            </form>
            <p className="text-support mt-2 text-muted-foreground">One try each, just to show you how it works.</p>
          </div>
        )}

        {mode && phase === "thinking" && (
          <div className="mt-8 flex justify-center">
            <ThinkingOrb state={mode === "search" ? "searching" : "shaping"} size={64} className="orb-loading" theme="light" aria-label="Ollie is working" />
          </div>
        )}

        {mode && phase === "done" && (
          <div className="bubble-in mt-5 rounded-card bg-card p-4 shadow-card">
            {mode === "search" ? (
              <p className="text-body text-foreground">{SAMPLE_ANSWER}</p>
            ) : (
              <div className="glossy flex aspect-square w-full items-center justify-center rounded-control bg-gradient-to-br from-cat-space to-cat-ocean">
                <Wand2 className="size-12 text-primary-foreground" />
              </div>
            )}
            <p className="text-support mt-3 text-muted-foreground">You've used your {mode === "search" ? "search" : "picture"} try.</p>
          </div>
        )}
      </OnboardingSkeleton>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { CrispOrb } from "@/components/ollie/CrispOrb";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";
import { useServerFn } from "@tanstack/react-start";
import { generateCustomLesson } from "@/lib/custom-lesson.functions";
import { customTopic, loadCustom, saveCustom } from "@/lib/custom-lesson-store";
import { effectiveBand } from "@/lib/slideshow/library";
import { streamImage } from "@/lib/stream-image";

export const Route = createFileRoute("/onboarding/building")({
  head: () => pageMeta("Building your child's Ollie", "Ollie is getting ready for your child."),
  component: BuildingPage,
});

function BuildingPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [step, setStep] = useState(0);
  const [askEmail, setAskEmail] = useState(false);
  const [answered, setAnswered] = useState(onboardingState.weeklyEmail !== null);
  const items = ["Safe topics picked", "Interests locked in", "Reading level matched", "Tone set"];
  const done = step > items.length;

  useEffect(() => {
    if (done) return;
    if (step === 2 && !answered) { setAskEmail(true); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [step, answered, done]);

  /* Custom-topic lesson: written during this wait so it is ready as the first slideshow. */
  const makeLesson = useServerFn(generateCustomLesson);
  useEffect(() => {
    const pick = customTopic();
    if (!pick) return;
    const existing = loadCustom();
    if (existing && existing.topic === pick.topic) return;
    const band = effectiveBand(onboardingState.age || 7, onboardingState.readingLevel ?? "stories");
    makeLesson({ data: { topic: pick.topic, age: onboardingState.age || 7, band, struggle: pick.struggle } })
      .then((res) => {
        if (!res.ok) return;
        saveCustom({ topic: pick.topic, lesson: res.lesson, done: false });
        // The picture keeps loading in the background while the child reads.
        void streamImage("/api/generate-image", { prompt: res.lesson.picture }, (url, isFinal) => {
          if (isFinal) { const cur = loadCustom(); if (cur && cur.topic === pick.topic) saveCustom({ ...cur, image: url }); }
        }).catch(() => {});
      })
      .catch(() => {});
  }, [makeLesson]);

  function answer(yes: boolean) {
    onboardingState.weeklyEmail = yes;
    setAskEmail(false);
    setAnswered(true);
  }

  return (
    <div className="bg-gradient-hello min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 pb-32 pt-20 text-center">
        <h1 className="text-title text-foreground">{done ? `${name}'s Ollie is ready!` : `Building ${name}'s Ollie`}</h1>
        <div className="relative mt-10 flex size-40 items-center justify-center">
          {done ? (
            <>
              <span className="glow-burst absolute size-32 rounded-pill bg-gold/60" aria-hidden />
              <img src={ollie} alt="Ollie celebrating" className="pop-in bounce-soft relative size-40 object-contain" style={{ ["--bounce-speed" as string]: "0.8s", ["--bounce-height" as string]: "-12px" }} />
            </>
          ) : (
            <CrispOrb state="composing" size={112} aria-label="Building" />
          )}
        </div>
        <ul className="mt-10 w-full space-y-3 text-left">
          {items.map((it, i) => (
            <li key={it} className={`flex items-center gap-3 rounded-card bg-card p-4 shadow-card transition-opacity duration-element ${step > i ? "opacity-100" : "opacity-40"}`}>
              <span className={`flex size-6 items-center justify-center rounded-pill ${step > i ? "bg-primary text-primary-foreground" : "bg-surface-2"}`}>
                {step > i && <Check className="pop-in size-3.5" />}
              </span>
              <span className="text-body text-foreground">{it}</span>
            </li>
          ))}
        </ul>
      </main>

      {askEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 px-6" role="dialog" aria-label="Weekly summary">
          <div className="pop-in w-full max-w-sm rounded-card bg-card p-5 shadow-sheet">
            <p className="text-body text-foreground">Send me a weekly summary of what {name} is learning, including exactly what was flagged and why?</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => answer(false)} className="text-button h-12 rounded-pill bg-surface text-foreground">Not really</button>
              <button type="button" onClick={() => answer(true)} className="text-button h-12 rounded-pill bg-primary text-primary-foreground">Yes</button>
            </div>
          </div>
        </div>
      )}

      {done && (
        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          <button type="button" onClick={() => navigate({ to: "/onboarding/handoff" })} className="text-button bubble-in h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card">
            Start exploring
          </button>
        </div>
      )}
    </div>
  );
}

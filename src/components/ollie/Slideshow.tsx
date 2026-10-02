import { useEffect, useRef, useState, type CSSProperties } from "react";
import ollie from "@/assets/ollie.png";
import { INTERESTS } from "@/lib/interests";
import { buildDay, pickCategoryId, type Day } from "@/lib/slideshow/library";
import { JAR_BONUS, recordCompletion } from "@/lib/slideshow-store";
import { customDay, loadCustom, markCustomDone } from "@/lib/custom-lesson-store";
import { addCookies, loadBalance, saveBalance } from "@/lib/picture-store";
import { Rocket } from "lucide-react";
import { quizOptions, quizText, type Band } from "@/lib/slideshow/types";
import { parentSettings } from "@/lib/onboarding-store";
import { Volume2, VolumeX } from "lucide-react";

export type SlideshowChild = { name: string; band: Band; interests: string[] };

const PRAISE = ["Yes! Exactly right!", "That is it!", "You nailed it!", "Perfect!"];

function tileClasses(categoryId: string): string {
  return INTERESTS.find((i) => i.id === categoryId)?.tile ?? "from-cat-space to-cat-space-deep";
}

function categoryIconId(categoryId: string) {
  return INTERESTS.find((i) => i.id === categoryId)?.icon ?? Rocket;
}

export function SlideshowTakeover({ child, onClose }: { child: SlideshowChild; onClose: () => void }) {
  const [day] = useState<(Day & { image?: string }) | null>(() => {
    const custom = loadCustom();
    if (custom && !custom.done) return customDay(custom);
    return buildDay(pickCategoryId(child.interests));
  });
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [jarFilled, setJarFilled] = useState(false);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"open" | "correct" | "reveal">("open");
  const [picked, setPicked] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [praise, setPraise] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [rewarded, setRewarded] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const timer = useRef<number | null>(null);
  const spokenRef = useRef<string | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const slides = day?.slides ?? [];
  const current = slides[index];
  const tile = day ? tileClasses(day.categoryId) : "";
  const CategoryIcon = day ? categoryIconId(day.categoryId) : Rocket;
  const tint = { "--slide-color": day?.categoryId === "custom" ? "var(--brand)" : `var(--cat-${day?.categoryId ?? "space"})` } as CSSProperties;
  const quizNumber = slides.slice(0, index + 1).filter((s) => s.kind === "quiz").length;
  const narration = current?.kind === "content"
    ? current.sub.caption[child.band]
    : current?.kind === "quiz"
      ? status === "reveal"
        ? `Here is the one: ${quizOptions(current.sub.quiz, child.band)[current.sub.quiz.answer]}. ${quizText(current.sub.quiz.why, child.band)}`
        : hint && status === "open"
          ? `Not quite! Try again! ${hint}`
          : `${current.sub.quiz.q[child.band]} ${quizOptions(current.sub.quiz, child.band).join(". ")}`
      : "";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    if (phase !== "play" || !narration || !parentSettings.soundOn || child.band !== "4-6") return;
    const key = `${index}:${status}:${hint ?? ""}`;
    if (spokenRef.current === key) return;
    spokenRef.current = key;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = 0.88;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    return () => { window.speechSynthesis.cancel(); };
  }, [phase, index, status, hint, narration, child.band]);

  const toggleNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !parentSettings.soundOn) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.rate = child.band === "4-6" ? 0.88 : 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const clearSlideState = () => {
    setStatus("open");
    setPicked(null);
    setAttempts(0);
    setHint(null);
  };

  const finish = () => {
    if (!day) return;
    if (day.categoryId === "custom") markCustomDone();
    const { jarFilled: filled } = recordCompletion({
      categoryId: day.categoryId,
      label: day.label,
      band: child.band,
      correct: score.correct,
      total: score.total,
    });
    saveBalance(addCookies(loadBalance(), 1 + (filled ? JAR_BONUS : 0)));
    setJarFilled(filled);
    setRewarded(true);
    setPhase("done");
  };

  const advance = () => {
    if (index + 1 >= slides.length) {
      finish();
      return;
    }
    setIndex(index + 1);
    clearSlideState();
  };

  const answer = (option: number) => {
    if (!current || current.kind !== "quiz" || status !== "open") return;
    const quiz = current.sub.quiz;
    setPicked(option);
    if (option === quiz.answer) {
      setStatus("correct");
      setPraise(PRAISE[index % PRAISE.length] ?? "Yes! Exactly right!");
      setScore((s) => ({ correct: s.correct + (attempts === 0 ? 1 : 0), total: s.total + 1 }));
      timer.current = window.setTimeout(advance, 1400);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 2) setStatus("reveal");
    else setHint(quizText(quiz.hint, child.band));
  };

  if (!day) return null;

  if (phase === "intro") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white" style={tint}>
        <div className="slide-tint flex flex-1 flex-col items-center justify-center gap-5 px-7 text-center">
          <div className={`glossy flex size-24 items-center justify-center rounded-card bg-gradient-to-b ${tile} pop-in`}>
            <CategoryIcon className="size-10 text-white" strokeWidth={2} />
          </div>
          <p className="text-label uppercase tracking-wide text-muted-foreground">Today's lesson</p>
          <h1 className="text-title max-w-[300px] text-foreground">{day.label}</h1>
          {child.band === "4-6" && (
            <p className="text-support max-w-[260px] text-muted-foreground">
              This is even better together! Grab a grown-up if one is around.
            </p>
          )}
          <button
            type="button"
            onClick={() => setPhase("play")}
            className="rounded-pill bg-primary px-10 py-3.5 text-button text-white transition-transform duration-tap active:scale-95"
          >
            Start
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-support text-muted-foreground underline-offset-4 hover:underline"
          >
            Not now
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white" style={tint}>
        <div className="slide-tint relative flex flex-1 flex-col items-center justify-center gap-5 px-7 text-center">
          <div className={`glow-burst absolute size-56 rounded-pill bg-gradient-to-b ${tile} opacity-25`} />
          <img src={ollie} alt="Ollie celebrating" className="bounce-soft relative w-32" width={128} height={128} />
          <h1 className="relative text-title text-foreground">You did it, {child.name}!</h1>
          <p className="relative text-body text-muted-foreground">
            You got {score.correct} of {Math.max(score.total, 1)} right on the first try.
          </p>
          <p className={`relative rounded-pill bg-white px-5 py-2.5 text-button text-foreground shadow-card ${rewarded ? "pop-in" : ""}`}>
            +1 picture cookie for the Create tab
          </p>
          {jarFilled && (
            <p className="pop-in relative rounded-pill bg-gold px-5 py-2.5 text-button text-foreground shadow-card">
              Your trail jar is full! +{JAR_BONUS} bonus cookies
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="relative rounded-pill bg-primary px-10 py-3.5 text-button text-white transition-transform duration-tap active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const dots = (
    <div className="flex items-center justify-center gap-1.5">
      {slides.map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-pill transition-all duration-element ${
            i === index ? "w-5 bg-primary" : i < index ? "w-1.5 bg-primary/40" : "w-1.5 bg-surface-2"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white" style={tint}>
      <div className="slide-tint flex flex-1 flex-col">
        <div className="flex items-center justify-between px-5 pt-12">
          <p className="text-label uppercase tracking-wide text-muted-foreground">{day.label}</p>
          <div className="flex items-center gap-2">
            {parentSettings.soundOn && typeof window !== "undefined" && "speechSynthesis" in window && (
              <button type="button" onClick={toggleNarration} aria-label={speaking ? "Stop reading" : "Read aloud"} title={speaking ? "Stop reading" : "Read aloud"} className="flex size-10 items-center justify-center rounded-pill bg-card text-primary shadow-card transition-transform duration-tap active:scale-95">
                {speaking ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
            )}
            <button
              type="button"
              onClick={advance}
              className="rounded-pill bg-card/80 px-3.5 py-1.5 text-support text-muted-foreground transition-transform duration-tap active:scale-95"
            >
              Skip
            </button>
          </div>
        </div>

        {current.kind === "content" ? (
          <div key={current.sub.id} className="flex flex-1 flex-col items-center justify-center gap-6 px-7 text-center">
            {day.image && index === 0 ? (
              <img src={day.image} alt="" className="pop-in size-56 rounded-card object-cover shadow-card" />
            ) : (
              <div className={`glossy flex size-28 items-center justify-center rounded-card bg-gradient-to-b ${tile} pop-in`}>
                <current.sub.icon className="size-12 text-white" strokeWidth={2} />
              </div>
            )}
            <p className="text-label uppercase tracking-wide text-muted-foreground">{current.sub.title}</p>
            <p className="text-title max-w-[320px] text-foreground">{current.sub.caption[child.band]}</p>
          </div>
        ) : (
          <div key={current.sub.id} className="flex flex-1 flex-col justify-center gap-4 px-6 py-4">
            <p className="text-label uppercase tracking-wide text-muted-foreground">Question {quizNumber}</p>
            <p className="text-title max-w-[330px] text-foreground">{current.sub.quiz.q[child.band]}</p>

            {status === "correct" && (
              <p className="pop-in rounded-control bg-white px-4 py-2.5 text-body text-foreground shadow-card">{praise}</p>
            )}
            {hint && status === "open" && (
              <p className="text-body text-muted-foreground">Not quite! Try again! {hint}</p>
            )}
            {status === "reveal" && (
              <p className="rounded-control bg-white px-4 py-2.5 text-body text-foreground shadow-card">
                Here is the one: {quizOptions(current.sub.quiz, child.band)[current.sub.quiz.answer]}. {quizText(current.sub.quiz.why, child.band)}
              </p>
            )}

            <div className="flex flex-col gap-2.5">
              {quizOptions(current.sub.quiz, child.band).map((option, i) => {
                const isAnswer = i === current.sub.quiz.answer;
                const chosen = picked === i;
                const showAnswer = status === "correct" || status === "reveal";
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={status !== "open"}
                    onClick={() => answer(i)}
                    className={`rounded-control px-4 py-3 text-body transition-all duration-tap ${
                      showAnswer && isAnswer
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : chosen
                          ? "bg-surface-2 text-foreground"
                          : "bg-white text-foreground shadow-card active:scale-[0.98]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {status === "reveal" && (
              <button
                type="button"
                onClick={advance}
                className="mt-1 rounded-pill bg-primary px-8 py-3 text-button text-white transition-transform duration-tap active:scale-95"
              >
                Continue
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 px-6 pb-10 pt-3">
          {dots}
          {current.kind === "content" && (
            <button
              type="button"
              onClick={advance}
              className="rounded-pill bg-primary px-10 py-3.5 text-button text-white transition-transform duration-tap active:scale-95"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

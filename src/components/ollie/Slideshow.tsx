import { speak, stopSpeaking, preloadSpeech } from "@/lib/speak";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FloatingWhale } from './FloatingWhale';
import { bubbleSound } from '@/lib/bubble-sound';
import { INTERESTS } from "@/lib/interests";
import { buildDay, type Day } from "@/lib/slideshow/library";
import type { SlideshowReview } from "@/lib/review-store";
import { selectDailyLesson } from '@/lib/daily-lesson';
import { JAR_BONUS, recordCompletion } from "@/lib/slideshow-store";
import { markCustomDone } from "@/lib/custom-lesson-store";
import { addCookies, loadBalance, saveBalance } from "@/lib/picture-store";
import { Rocket, ArrowRight, Check, Lightbulb } from "lucide-react";
import { quizOptions, quizText, type Band } from "@/lib/slideshow/types";
import { parentSettings } from "@/lib/onboarding-store";
import { Volume2, VolumeX } from "lucide-react";
import { LessonArt } from "@/components/ollie/LessonArt";
import { canSwipeLesson } from "@/lib/child-interactions";
import { Button } from "@/components/ui/button";

export type SlideshowChild = { name: string; age: number; band: Band; interests: string[]; needsReadAloud: boolean };

const PRAISE = ["Yes! Exactly right!", "That is it!", "You nailed it!", "Perfect!"];

function tileClasses(categoryId: string): string {
  return INTERESTS.find((i) => i.id === categoryId)?.tile ?? "from-cat-space to-cat-space-deep";
}

function categoryIconId(categoryId: string) {
  return INTERESTS.find((i) => i.id === categoryId)?.icon ?? Rocket;
}

export function SlideshowTakeover({ child, onClose, review }: { child: SlideshowChild; onClose: () => void; review?: SlideshowReview | undefined }) {
  const [day, setDay] = useState<(Day & { image?: string }) | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    if (review) {
      const built = buildDay(review.categoryId, review.lessonIndex, review.band);
      if (built) setDay(built);
      else setError('That lesson could not be loaded.');
      return () => { active = false; };
    }
    void selectDailyLesson(child.band).then(result => { if (active) setDay(result); }).catch(() => { if (active) setError('Your lesson could not be loaded. Please try again.'); });
    return () => { active = false; };
  }, [child.band, retry, review]);
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
  const touch = useRef<{ x: number; y: number } | null>(null);

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
    if (typeof window === "undefined") return;
    stopSpeaking();
    setSpeaking(false);
    if (phase !== "play" || !narration || !parentSettings.soundOn || !child.needsReadAloud || status === "correct") return;
    void speak(narration, { age:child.age, onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
    return () => { stopSpeaking(); };
  }, [phase, index, status, hint, narration, child.band, child.needsReadAloud]);

  const toggleNarration = () => {
    if (typeof window === "undefined" || !parentSettings.soundOn) return;
    if (speaking) { stopSpeaking(); setSpeaking(false); return; }
    void speak(narration, { age:child.age, onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
  };

  useEffect(() => {
    if (!child.needsReadAloud || !parentSettings.soundOn || !day) return;
    const next = phase === 'intro' ? day.slides[0] : day.slides[index+1];
    if (next?.kind === 'content') void preloadSpeech(next.sub.caption[child.band],child.age).catch(() => {});
  }, [day,index,phase,child.age,child.band,child.needsReadAloud]);

  const clearSlideState = () => {
    setStatus("open");
    setPicked(null);
    setAttempts(0);
    setHint(null);
  };

  const finish = () => {
    if (!day) return;
    if (review) { setPhase("done"); return; }
    if (day.categoryId === "custom") markCustomDone();
    const { jarFilled: filled } = recordCompletion({
      categoryId: day.categoryId,
      label: day.label,
      band: child.band,
      correct: score.correct,
      total: score.total,
      lessonIndex: day.lessonIndex ?? 0,
    });
    saveBalance(addCookies(loadBalance(), 1 + (filled ? JAR_BONUS : 0)));
    setJarFilled(filled);
    setRewarded(true);
    setPhase("done");
  };

  const advance = () => {
    bubbleSound();
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
      timer.current = window.setTimeout(advance, 1100);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 2) { setStatus("reveal"); setScore(s => ({ ...s, total: s.total + 1 })); }
    else setHint(quizText(quiz.hint, child.band));
  };

  if (!day) return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-card"><p role="status" className="text-body text-foreground">{error || 'Getting your lesson ready…'}</p>{error && <Button onClick={() => setRetry(value => value + 1)}>Try again</Button>}</div>;

  if (phase === "intro") {
    return (
      <div data-band={child.band} className="discovery-session discovery-open fixed inset-0 z-50 flex flex-col bg-card" style={tint}>
        <div className="slide-tint flex flex-1 flex-col items-center justify-center gap-5 px-7 text-center">
          <LessonArt categoryId={day.categoryId} topicId={slides[0]?.sub.id ?? ""} title={day.label} className="w-full max-w-[320px]" />
          <p className="text-label uppercase tracking-wide text-muted-foreground">{review ? "Discovery review" : "Today's Discovery"}</p>
          <h1 className="text-title max-w-[300px] text-foreground">{day.label}</h1>
          {child.band === "4-6" && (
            <p className="text-support max-w-[260px] text-muted-foreground">
              This is even better together! Grab a grown-up if one is around.
            </p>
          )}
          <Button variant="ghost"
            type="button"
            onClick={() => { bubbleSound(); setPhase("play"); }}
            className="h-12 rounded-pill bg-primary px-10 py-3.5 text-button text-primary-foreground transition-transform duration-tap active:scale-95"
          >
            Start
          </Button>
          <Button variant="ghost"
            type="button"
            onClick={onClose}
            className="text-support text-muted-foreground underline-offset-4 hover:underline"
          >
            Not now
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div data-band={child.band} className="discovery-session fixed inset-0 z-50 flex flex-col bg-card" style={tint}>
        <div className="slide-tint relative flex flex-1 flex-col items-center justify-center gap-5 px-7 text-center">
          <div className={`glow-burst absolute size-56 rounded-pill bg-gradient-to-b ${tile} opacity-25`} />
          <FloatingWhale pose="celebrate" size={200}/>
          <h1 className="relative text-title text-foreground">{review ? `Nice review, ${child.name}!` : `You did it, ${child.name}!`}</h1>
          <p className="relative text-body text-muted-foreground">
            You got {score.correct} of {Math.max(score.total, 1)} right on the first try.
          </p>
          {!review && <p className={`relative rounded-pill bg-card px-5 py-2.5 text-button text-foreground shadow-card ${rewarded ? "pop-in" : ""}`}>
            +1 picture cookie for the Create tab
          </p>}
          {jarFilled && (
            <p className="pop-in relative rounded-pill bg-gold px-5 py-2.5 text-button text-foreground shadow-card">
              Your trail jar is full! +{JAR_BONUS} bonus cookies
            </p>
          )}
          <Button variant="ghost"
            type="button"
            onClick={onClose}
            className="relative h-12 rounded-pill bg-primary px-10 py-3.5 text-button text-primary-foreground transition-transform duration-tap active:scale-95"
          >
            Continue
          </Button>
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
    <div data-band={child.band} className="discovery-session fixed inset-0 z-50 flex flex-col bg-card" style={tint}
      onTouchStart={(event) => { const target = event.target; if (target instanceof Element && target.closest("button")) return; const point = event.touches[0]; if (point) touch.current = { x: point.clientX, y: point.clientY }; }}
      onTouchEnd={(event) => { const start = touch.current; touch.current = null; const end = event.changedTouches[0]; if (!start || !end) return; const dx = end.clientX - start.x, dy = end.clientY - start.y; if (dx < -70 && Math.abs(dx) > Math.abs(dy) * 1.5 && canSwipeLesson(current.kind, status)) advance(); }}>
      <div className="slide-tint flex flex-1 flex-col">
        <div className="lesson-toolbar grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-12">
          <p className="text-label uppercase tracking-wide text-muted-foreground">{day.label}</p>
          <div className="flex items-center gap-2">
            {parentSettings.soundOn && (
              <Button variant="ghost" type="button" onClick={toggleNarration} aria-label={speaking ? "Stop reading" : "Read aloud"} title={speaking ? "Stop reading" : "Read aloud"} className="flex size-10 items-center justify-center rounded-pill bg-card text-primary shadow-card transition-transform duration-tap active:scale-95">
                {speaking ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </Button>
            )}
            <Button variant="ghost"
              type="button"
              disabled={!canSwipeLesson(current.kind, status)}
              onClick={advance}
              className="rounded-pill bg-card/80 px-3.5 py-1.5 text-support text-muted-foreground transition-transform duration-tap active:scale-95"
            >
              Skip
            </Button>
          </div>
        </div>

        <div key={`${current.kind}-${index}`} className="lesson-stage-enter lesson-editorial" data-kind={current.kind}>
          <div className={`lesson-visual ${current.kind === 'quiz' ? 'quiz-visual' : ''}`}>
            {day.image && index === 0 ? <img src={day.image} alt="" className="lesson-custom-picture" /> : <LessonArt categoryId={day.categoryId} topicId={current.sub.id} title={day.label} scene={current.scene ?? 0} animated={current.kind === 'content'} />}
          </div>
          <div className="lesson-reading">
            <p className="lesson-eyebrow text-label text-primary">{current.kind === 'content' ? `Discover · ${index + 1} / ${slides.length}` : `Check your discovery · ${quizNumber} / ${slides.filter(s => s.kind === 'quiz').length}`}</p>
            <h1 className="lesson-heading text-foreground">{current.kind === 'content' ? current.sub.title : current.sub.quiz.q[child.band]}</h1>
            {current.kind === 'content' ? <p className="lesson-copy text-foreground">{current.sub.caption[child.band]}</p> : <>
              <div className="quiz-options">
                {quizOptions(current.sub.quiz, child.band).map((option, i) => {
                  const correct = i === current.sub.quiz.answer && status !== 'open';
                  return <Button key={option} variant="ghost" type="button" disabled={status !== 'open'} onClick={() => answer(i)} className="quiz-choice" data-state={correct ? 'correct' : picked === i ? 'chosen' : 'idle'}>
                    <span className="quiz-choice-marker" aria-hidden="true">{correct ? <Check/> : String.fromCharCode(65 + i)}</span><span>{option}</span>
                  </Button>;
                })}
              </div>
              {status === 'correct' && <p role="status" className="quiz-feedback pop-in"><Check/>{praise}</p>}
              {hint && status === 'open' && <p role="status" className="quiz-feedback"><Lightbulb/>{hint}</p>}
              {status === 'reveal' && <><p role="status" className="quiz-feedback">{quizOptions(current.sub.quiz, child.band)[current.sub.quiz.answer]}. {quizText(current.sub.quiz.why, child.band)}</p><Button onClick={advance} className="w-full rounded-pill">Continue<ArrowRight/></Button></>}
            </>}
          </div>
        </div>

        <div className="lesson-footer flex flex-col gap-4 px-6 pb-10 pt-3">
          {dots}
          {current.kind === "content" && (
            <Button variant="ghost"
              type="button"
              onClick={advance}
              className="h-12 rounded-pill bg-primary px-10 py-3.5 text-button text-primary-foreground transition-transform duration-tap active:scale-95"
            >
              Next<ArrowRight className="size-5"/>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* The one-time custom-topic lesson made at the end of setup. It becomes the
   child's first slideshow, then the regular library takes over. */
import { Sparkles } from "lucide-react";
import type { CustomLesson } from "./custom-lesson.functions";
import type { Day, Slide } from "./slideshow/library";
import type { Subtopic } from "./slideshow/types";
import { onboardingState } from "./onboarding-store";

const KEY = "ollie-custom-lesson-v1";
export type Stored = { topic: string; lesson: CustomLesson; image?: string; done: boolean };

export function loadCustom(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}
export function saveCustom(s: Stored) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* image too large: drop it */
    try { localStorage.setItem(KEY, JSON.stringify({ ...s, image: undefined })); } catch { /* storage full */ }
  }
}
export function markCustomDone() {
  const s = loadCustom();
  if (s) saveCustom({ ...s, done: true });
}

const STRUGGLE_TOPICS: Record<string, string> = {
  reading: "Reading",
  math: "Math",
  science: "Science",
  focus: "Staying focused",
};

/* Struggle subject wins over a typed interest when both are given (spec step 5). */
export function customTopic(): { topic: string; struggle: boolean } | null {
  const s = onboardingState;
  if (s.customStruggle.trim()) return { topic: s.customStruggle.trim(), struggle: true };
  const first = s.struggles[0];
  if (first) return { topic: STRUGGLE_TOPICS[first] ?? first, struggle: true };
  if (s.customInterest.trim()) return { topic: s.customInterest.trim(), struggle: false };
  return null;
}

export function customDay(s: Stored): Day & { image?: string } {
  const same = (t: string) => ({ "4-6": t, "7-9": t, "10-12": t });
  const subs: Subtopic[] = s.lesson.slides.map((sl, i) => {
    const q = s.lesson.quizzes[i % s.lesson.quizzes.length]!;
    return {
      id: `custom-${i}`,
      title: sl.title,
      icon: Sparkles,
      caption: same(sl.caption),
      quiz: { q: same(q.q), options: q.options, answer: q.answer, hint: q.hint, why: q.why },
    };
  });
  const quizSubs = subs.slice(0, s.lesson.quizzes.length);
  return {
    categoryId: "custom",
    label: s.lesson.title,
    slides: [...subs.map((sub): Slide => ({ kind: "content", sub })), ...quizSubs.map((sub): Slide => ({ kind: "quiz", sub }))],
    ...(s.image ? { image: s.image } : {}),
  };
}

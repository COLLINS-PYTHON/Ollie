import type { LucideIcon } from "lucide-react";

/* Locked age bands from the spec. Content is written once per band,
   never per exact age, to keep the library small and reusable. */
export type Band = "4-6" | "7-9" | "10-12";
export type ByBand = Record<Band, string>;

/*
 * A quiz's question changes per band, so its answer set changes with it.
 * Bands that share one question keep a plain option list; bands that ask a
 * different kind of question each get their own list, and hint/why may do
 * the same. The answer index is shared, so the correct option sits at the
 * same position in every list.
 */
export type Quiz = {
  q: ByBand;
  options: string[] | Record<Band, string[]>;
  answer: number;
  hint: string | ByBand;
  why: string | ByBand;
};

export function quizOptions(quiz: Quiz, band: Band): string[] {
  return Array.isArray(quiz.options) ? quiz.options : quiz.options[band];
}

export function quizText(value: string | ByBand, band: Band): string {
  return typeof value === "string" ? value : value[band];
}

export type Subtopic = {
  id: string;
  title: string;
  icon: LucideIcon;
  caption: ByBand;
  quiz: Quiz;
};

export type Packs = Record<string, Subtopic[]>;

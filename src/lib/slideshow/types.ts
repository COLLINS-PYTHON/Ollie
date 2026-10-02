import type { LucideIcon } from "lucide-react";

/* Locked age bands from the spec. Content is written once per band,
   never per exact age, to keep the library small and reusable. */
export type Band = "4-6" | "7-9" | "10-12";
export type ByBand = Record<Band, string>;

export type Quiz = {
  q: ByBand;
  options: string[];
  answer: number;
  hint: string;
  why: string;
};

export type Subtopic = {
  id: string;
  title: string;
  icon: LucideIcon;
  caption: ByBand;
  quiz: Quiz;
};

export type Packs = Record<string, Subtopic[]>;

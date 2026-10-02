import { INTERESTS } from "@/lib/interests";
import { PACK_A } from "./pack-a";
import { PACK_B } from "./pack-b";
import { PACK_C } from "./pack-c";
import type { Band, Subtopic } from "./types";

/*
 * The standard library is hand-built once per category and reused for every
 * family, so marginal cost per child stays near zero. A parent-typed custom
 * topic is the exception and would be generated instead.
 */
const PACKS: Record<string, Subtopic[]> = { ...PACK_A, ...PACK_B, ...PACK_C };

export const CATEGORY_IDS = INTERESTS.map((i) => i.id);

export type Slide =
  | { kind: "content"; sub: Subtopic }
  | { kind: "quiz"; sub: Subtopic };

export type Day = { categoryId: string; label: string; slides: Slide[] };

export function bandFor(age: number): Band {
  if (age <= 6) return "4-6";
  if (age <= 9) return "7-9";
  return "10-12";
}

/* Younger readers get the simplest wording even when their age band is higher. */
export function effectiveBand(age: number, readingLevel: string): Band {
  const band = bandFor(age);
  if (readingLevel === "none" || readingLevel === "sounding") return "4-6";
  if (readingLevel === "stories" && band === "10-12") return "7-9";
  return band;
}

export function categoryLabel(id: string): string {
  return INTERESTS.find((i) => i.id === id)?.label ?? id;
}

function daySeed(): number {
  return Math.floor(Date.now() / 86_400_000);
}

/* Rotates through what the child actually picked so no two days feel identical. */
export function pickCategoryId(interests: string[], seed = daySeed()): string {
  const pool = interests.filter((id) => PACKS[id]?.length);
  const list = pool.length > 0 ? pool : CATEGORY_IDS.filter((id) => PACKS[id]?.length);
  if (list.length === 0) return "space";
  return list[seed % list.length];
}

export function buildDay(categoryId: string): Day | null {
  const pack = PACKS[categoryId];
  if (!pack || pack.length === 0) return null;
  const seed = daySeed();
  /* One rotation per day, so a skip and a reopen show the same lesson. */
  const rotated = [...pack.slice(seed % pack.length), ...pack.slice(0, seed % pack.length)];
  return {
    categoryId,
    label: categoryLabel(categoryId),
    slides: [
      ...rotated.map((sub): Slide => ({ kind: "content", sub })),
      ...rotated.map((sub): Slide => ({ kind: "quiz", sub })),
    ],
  };
}

export function hasLibrary(categoryId: string): boolean {
  return Boolean(PACKS[categoryId]?.length);
}

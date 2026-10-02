import { INTERESTS } from "@/lib/interests";
import { PACK_A } from "./pack-a";
import { PACK_B } from "./pack-b";
import { PACK_C } from "./pack-c";
import type { Subtopic } from "./types";

/* Finds slideshow art that already exists for a Search question, so the
   answer can reuse it at zero added cost. Nothing is generated. */
const STOP = new Set([
  "the", "and", "are", "is", "a", "an", "of", "to", "in", "on", "for", "with", "you", "your", "can",
  "one", "all", "has", "have", "make", "makes", "made", "most", "more", "than", "that", "this",
  "what", "how", "why", "who", "does", "do", "its", "it's", "our", "out", "into", "from", "every",
  "lots", "many", "big", "small", "very", "use", "uses", "way", "ways", "keep", "keeps", "help", "helps",
]);

function words(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
}

function stem(w: string): string {
  return w.replace(/(es|s)$/, "");
}

type Entry = { sub: Subtopic; categoryId: string; keys: string[] };
const ENTRIES: Entry[] = Object.entries({ ...PACK_A, ...PACK_B, ...PACK_C }).flatMap(([categoryId, subs]) =>
  subs.map((sub) => ({ sub, categoryId, keys: words(sub.title).map(stem) }))
);

export type Illustration = { sub: Subtopic; tile: string; label: string };

export function findIllustration(question: string): Illustration | null {
  const q = new Set(words(question).map(stem));
  let best: Entry | null = null;
  let bestScore = 0;
  for (const e of ENTRIES) {
    const score = e.keys.filter((k) => q.has(k)).length;
    if (score > bestScore) { best = e; bestScore = score; }
  }
  if (!best) return null;
  const cat = INTERESTS.find((i) => i.id === best.categoryId);
  if (!cat) return null;
  return { sub: best.sub, tile: cat.tile, label: cat.label };
}

export function illustrationById(id: string): Illustration | null {
  const e = ENTRIES.find((x) => x.sub.id === id);
  const cat = e && INTERESTS.find((i) => i.id === e.categoryId);
  return e && cat ? { sub: e.sub, tile: cat.tile, label: cat.label } : null;
}

import type { Band } from "./slideshow/types";

/* Device-only until accounts exist. A completion is what unlocks the next
   slideshow: a new one becomes available exactly 24 hours after the last
   one was finished, never on a midnight clock. */

export type Completion = {
  id: string;
  at: number;
  categoryId: string;
  label: string;
  band: Band;
  correct: number;
  total: number;
};

export type SlideshowPrefs = { enabled: boolean; resetTime: string };

const KEY = "ollie-slideshow-v1";
const DAY_MS = 86_400_000;

type State = { completions: Completion[]; prefs: SlideshowPrefs };

const DEFAULTS: State = {
  completions: [],
  prefs: { enabled: true, resetTime: "07:00" },
};

function read(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      completions: Array.isArray(parsed.completions) ? parsed.completions : [],
      prefs: { ...DEFAULTS.prefs, ...(parsed.prefs ?? {}) },
    };
  } catch {
    return DEFAULTS;
  }
}

function write(s: State) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function completions(): Completion[] {
  return [...read().completions].sort((a, b) => b.at - a.at);
}

export function prefs(): SlideshowPrefs {
  return read().prefs;
}

export function setPrefs(next: Partial<SlideshowPrefs>) {
  const s = read();
  s.prefs = { ...s.prefs, ...next };
  write(s);
}

export function completedCount(): number {
  return read().completions.length;
}

export function nextInMs(): number {
  const last = read().completions.at(-1);
  if (!last) return 0;
  return Math.max(0, last.at + DAY_MS - Date.now());
}

export function slideshowDue(): boolean {
  const s = read();
  if (!s.prefs.enabled) return false;
  const last = s.completions.at(-1);
  if (!last) return true;
  return Date.now() - last.at >= DAY_MS;
}

export function recordCompletion(c: Omit<Completion, "id" | "at">): Completion {
  const s = read();
  const entry: Completion = { ...c, id: `c-${Date.now()}`, at: Date.now() };
  s.completions = [...s.completions, entry];
  write(s);
  return entry;
}

function dateKey(at: number): string {
  const d = new Date(at);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/* Consecutive days ending today (or yesterday if today is not done yet). */
export function streakDays(): number {
  const keys = new Set(read().completions.map((c) => dateKey(c.at)));
  if (keys.size === 0) return 0;
  const cursor = new Date();
  if (!keys.has(dateKey(cursor.getTime()))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!keys.has(dateKey(cursor.getTime()))) return 0;
  }
  let streak = 0;
  while (keys.has(dateKey(cursor.getTime()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

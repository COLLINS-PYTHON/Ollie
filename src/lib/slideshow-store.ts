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

/* Parent picks how a new lesson unlocks: 24 hours after the last one was
   finished, or every day at a set clock time. */
export type ResetMode = "24h" | "time";
export type SlideshowPrefs = { enabled: boolean; resetTime: string; resetMode: ResetMode };

const KEY = "ollie-slideshow-v1";
const DAY_MS = 86_400_000;

type State = { completions: Completion[]; prefs: SlideshowPrefs };

const DEFAULTS: State = {
  completions: [],
  prefs: { enabled: true, resetTime: "07:00", resetMode: "24h" },
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

/* Most recent moment the set clock time passed (today's, or yesterday's). */
function lastResetMoment(resetTime: string, now = Date.now()): number {
  const [h = 7, m = 0] = resetTime.split(":").map(Number);
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  if (d.getTime() > now) d.setDate(d.getDate() - 1);
  return d.getTime();
}

function unlockAt(s: State, lastAt: number): number {
  if (s.prefs.resetMode === "time") {
    const r = lastResetMoment(s.prefs.resetTime, lastAt);
    const next = new Date(r);
    next.setDate(next.getDate() + 1);
    return next.getTime();
  }
  return lastAt + DAY_MS;
}

export function nextInMs(): number {
  const s = read();
  const last = s.completions.at(-1);
  if (!last) return 0;
  return Math.max(0, unlockAt(s, last.at) - Date.now());
}

export function slideshowDue(): boolean {
  const s = read();
  if (!s.prefs.enabled) return false;
  const last = s.completions.at(-1);
  if (!last) return true;
  return Date.now() >= unlockAt(s, last.at);
}

/* Learning Trail jar: every 7 learning days fills a jar worth 3 bonus
   picture cookies. Missed days pause the count, they never reset it. */
export const JAR_EVERY = 7;
export const JAR_BONUS = 3;

export function jarProgress(): number {
  return read().completions.length % JAR_EVERY;
}

export function recordCompletion(c: Omit<Completion, "id" | "at">): { entry: Completion; jarFilled: boolean } {
  const s = read();
  const entry: Completion = { ...c, id: `c-${Date.now()}`, at: Date.now() };
  s.completions = [...s.completions, entry];
  write(s);
  return { entry, jarFilled: s.completions.length % JAR_EVERY === 0 };
}

export type TrailStop =
  | { kind: "done"; completion: Completion; learningDay: number }
  | { kind: "paused"; key: string; at: number };

/* Oldest first: one stop per learning day, plus one soft paused stop for
   each gap of missed calendar days between lessons. */
export function trailStops(): TrailStop[] {
  const list = [...read().completions].sort((a, b) => a.at - b.at);
  const stops: TrailStop[] = [];
  list.forEach((c, i) => {
    const prev = list[i - 1];
    if (prev) {
      const a = new Date(prev.at); a.setHours(0, 0, 0, 0);
      const b = new Date(c.at); b.setHours(0, 0, 0, 0);
      if (Math.round((b.getTime() - a.getTime()) / DAY_MS) > 1) {
        stops.push({ kind: "paused", key: `p-${c.id}`, at: a.getTime() + DAY_MS });
      }
    }
    stops.push({ kind: "done", completion: c, learningDay: i + 1 });
  });
  return stops;
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

import type { Band } from './types';
import type { Day, Slide } from './library';

export const BAG_SIZE = 12;
export type BagState = { currentBag: string[]; bagPosition: number; progress: Record<string, number>; selectedDay?: string; selected?: unknown };

export function shuffleCategories(categories: string[], random = Math.random): string[] {
  const bag = [...categories];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const value = bag[i];
    const other = bag[j];
    if (value === undefined || other === undefined) continue;
    bag[i] = other;
    bag[j] = value;
  }
  return bag;
}

export function nextSelection(state: BagState, categories: string[], counts: Record<string, number>, random = Math.random) {
  const bag = state.currentBag.length === BAG_SIZE && state.bagPosition < BAG_SIZE
    ? [...state.currentBag] : shuffleCategories(categories, random);
  const position = state.currentBag.length === BAG_SIZE && state.bagPosition < BAG_SIZE ? state.bagPosition : 0;
  const category = bag[position];
  if (!category || !counts[category]) throw new Error('Lesson unavailable');
  const next = state.progress[category] ?? 0;
  const index = next >= (counts[category] ?? 0) ? 0 : next;
  return { category, index, state: { ...state, currentBag: bag, bagPosition: position + 1, progress: { ...state.progress, [category]: index + 1 } } };
}

/** Four discoveries, four questions, then four explanatory recap slides.
 * Early readers finish after the questions, keeping their lesson to eight. */
export function lessonSlides(subs: Slide['sub'][], band: Band): Slide[] {
  const facts = subs.slice(0, 4);
  const slides: Slide[] = [
    ...facts.map((sub): Slide => ({ kind: 'content', sub })),
    ...facts.map((sub): Slide => ({ kind: 'quiz', sub })),
  ];
  if (band !== '4-6') slides.push(...facts.map((sub): Slide => ({
    kind: 'content', sub: { ...sub, caption: Object.fromEntries(
      (['4-6', '7-9', '10-12'] as const).map(b => [b, typeof sub.quiz.why === 'string' ? sub.quiz.why : sub.quiz.why[b]])
    ) as Slide['sub']['caption'] },
  })));
  return slides;
}

export function localDay(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function reusableSelection(state: BagState, day: string): unknown | null {
  return state.selectedDay && state.selectedDay >= day ? state.selected ?? null : null;
}

export type CachedDay = Omit<Day, 'slides'> & { slides: Array<{ kind: Slide['kind']; sub: Omit<Slide['sub'], 'icon'> }>; image?: string };
export function cacheDay(day: Day & { image?: string }): CachedDay {
  return { ...day, slides: day.slides.map(({ kind, sub: { icon: _icon, ...sub } }) => ({ kind, sub })) };
}
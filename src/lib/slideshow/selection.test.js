import { expect, test } from 'bun:test';
import { CATEGORY_IDS, buildDay } from './library';
import { nextSelection, reusableSelection, shuffleCategories } from './selection';
test('bag contains all twelve categories exactly once', () => {
  const bag = shuffleCategories(CATEGORY_IDS, () => 0.25);
  expect(bag.length).toBe(12); expect(new Set(bag).size).toBe(12); expect([...bag].sort()).toEqual([...CATEGORY_IDS].sort());
});
test('position twelve creates a new bag and advances to one', () => {
  const result = nextSelection({ currentBag: CATEGORY_IDS, bagPosition: 12, progress: {} }, CATEGORY_IDS, Object.fromEntries(CATEGORY_IDS.map(c => [c, 4])), () => .5);
  expect(result.state.bagPosition).toBe(1); expect(result.index).toBe(0);
});
test('category lesson index wraps at total and leaves siblings unchanged', () => {
  const result = nextSelection({ currentBag: CATEGORY_IDS, bagPosition: 0, progress: { space: 4, ocean: 2 } }, CATEGORY_IDS, { space: 4 });
  expect(result.index).toBe(0); expect(result.state.progress.space).toBe(1); expect(result.state.progress.ocean).toBe(2);
});
test('reopening same day reuses the selected lesson', () => {
  expect(reusableSelection({currentBag: [], bagPosition: 0, progress: {}, selectedDay: '2026-10-17', selected: { categoryId: 'custom' }}, '2026-10-17')).toEqual({ categoryId: 'custom' });
});
test('daily lessons total twelve slides, early readers get eight', () => {
  for (const category of CATEGORY_IDS) { expect(buildDay(category, 0, '7-9')?.slides.length).toBe(12); expect(buildDay(category, 0, '10-12')?.slides.length).toBe(12); expect(buildDay(category, 0, '4-6')?.slides.length).toBe(8); }
});
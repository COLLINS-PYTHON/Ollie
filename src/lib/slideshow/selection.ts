import type { Band } from './types';
import type { Day, Slide } from './library';
import { TOPIC_CONTEXT } from './topic-context';

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

/** One topic per lesson: notice, explain, explore, connect, then check understanding.
 * Category rotation chooses another topic, never repeats the category's cover. */
export function lessonSlides(subs: Slide['sub'][], band: Band): Slide[] {
  const topic = subs[0]; if (!topic) return [];
  const context = TOPIC_CONTEXT[topic.id]; if (!context) return [{kind:'content',sub:topic},{kind:'quiz',sub:topic}];
  const same = (text:string) => ({ '4-6':text,'7-9':text,'10-12':text });
  const short = (text:string) => text.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? text;
  const titles = ['Notice','How it works','A closer look','One more discovery'];
  const facts = context.insights.map((insight,index): Slide => ({kind:'content',scene:index,sub:{...topic,title:titles[index] ?? topic.title,caption:{'4-6':index === 0 ? topic.caption['4-6'] : short(insight),'7-9':short(insight),'10-12':insight}}}));
  const questions = context.insights.map((insight,index): Slide => {
    const correct = index === 0 ? context.options[0] ?? '' : short(insight);
    const distractors = index === 0 ? context.options.slice(1) : context.options.slice(1);
    const options=[correct,...distractors]; const answer=index%3;
    if (answer !== 0) { const value=options[answer]; if (value !== undefined) { options[answer]=correct;options[0]=value; } }
    return {kind:'quiz',scene:index,sub:{...topic,quiz:{q:same(index===0 ? context.question : `Which detail is true about ${topic.title.toLowerCase()}?`),options,answer,hint:same('Think about the explanation you just explored.'),why:same(band==='10-12' ? insight : short(insight))}}};
  });
  const slides = [...facts,...questions];
  if (band !== '4-6') {
    slides.push({kind:'content',scene:2,sub:{...topic,title:'Try noticing',caption:same(context.observation)}});
    slides.push({kind:'content',scene:3,sub:{...topic,title:'The big idea',caption:same(short(context.insights[0] ?? ''))}});
    slides.push({kind:'content',scene:1,sub:{...topic,title:'Make a connection',caption:same(`How does ${topic.title.toLowerCase()} connect with something you have seen? Explain one detail in your own words.`)}});
    slides.push({kind:'content',scene:0,sub:{...topic,title:'Teach it back',caption:same('Imagine someone asks what you learned. What would you show them first, and why?')}});
  }
  return slides;
}

export function localDay(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function reusableSelection(state: BagState, day: string): unknown | null {
  return state.selectedDay && state.selectedDay >= day ? state.selected ?? null : null;
}

export type CachedDay = Omit<Day, 'slides'> & { slides: Array<{ kind: Slide['kind']; scene?: number; sub: Omit<Slide['sub'], 'icon'> }>; image?: string };
export function cacheDay(day: Day & { image?: string }): CachedDay {
  return { ...day, slides: day.slides.map(({ kind, scene, sub: { icon: _icon, ...sub } }) => ({ kind, ...(scene === undefined ? {} : {scene}), sub })) };
}
import { readKidValue, writeKidValue, activeKidId, readFamily } from "./kid-storage";
import { onboardingState } from "./onboarding-store";
import { Rocket } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { buildDay, CATEGORY_IDS, lessonCount, type Day } from './slideshow/library';
import { cacheDay, localDay, nextSelection, reusableSelection, type BagState, type CachedDay } from './slideshow/selection';
import type { Band } from './slideshow/types';
import { completedCount } from './slideshow-store';
import { customDay, loadCustom } from './custom-lesson-store';

const KEY = 'ollie-daily-selection-v1';
function restore(cached: CachedDay, band: Band): Day & { image?: string } {
  // Retain the server's chosen identity and bag, but render current reusable content.
  // Upgrades never advance the bag or overwrite sibling progress.
  if (cached.categoryId !== 'custom') {
    const built = buildDay(cached.categoryId, cached.lessonIndex ?? 0, band);
    if (built) return built;
  }
  return { ...cached, slides: cached.slides.map(slide => ({ ...slide, sub: { ...slide.sub, icon: Rocket } })) };
}

export async function selectDailyLesson(band: Band): Promise<Day & { image?: string }> {
  const day = localDay();
  const stored = loadCustom();
  const custom = completedCount() === 0 && stored && !stored.done ? cacheDay(customDay(stored)) : null;
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    let cloudId = readFamily().kids.find(k => k.id === activeKidId())?.cloudId;
    if (!cloudId) {
      const { data: matches } = await supabase.from('children').select('id').eq('account_id', session.user.id).eq('name', onboardingState.name);
      if (matches?.length === 1) cloudId = matches[0]?.id;
    }
    if (!cloudId) throw new Error('This learning space is still saving. Please try again shortly.');
    const { data: child, error: childError } = await supabase.from('children').select('id').eq('account_id', session.user.id).eq('id', cloudId).maybeSingle();
    if (childError || !child) throw new Error('Your lesson could not be loaded. Please try again.');
    const { data, error } = await supabase.rpc('select_daily_lesson', { p_child_id: child.id, p_day: day, p_custom: custom as unknown as Json });
    if (error || !data) throw new Error('Your lesson could not be loaded. Please try again.');
    return restore(data as unknown as CachedDay, band);
  }
  let state: BagState = { currentBag: [], bagPosition: 0, progress: {} };
  try { state = JSON.parse(readKidValue(KEY) ?? 'null') ?? state; } catch { /* new device */ }
  const existing = reusableSelection(state, day);
  if (existing) return restore(existing as CachedDay, band);
  if (custom) {
    writeKidValue(KEY, JSON.stringify({ ...state, selectedDay: day, selected: custom }));
    return restore(custom, band);
  }
  const chosen = nextSelection(state, CATEGORY_IDS, Object.fromEntries(CATEGORY_IDS.map(id => [id, lessonCount(id)])));
  const lesson = buildDay(chosen.category, chosen.index, band);
  if (!lesson) throw new Error('Your lesson could not be loaded. Please try again.');
  writeKidValue(KEY, JSON.stringify({ ...chosen.state, selectedDay: day, selected: cacheDay(lesson) }));
  return lesson;
}
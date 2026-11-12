export const DEFAULT_REMINDER_TIME = '16:30';
export const TRIAL_NOTICE_ID = 47000;
export const LESSON_NOTICE_BASE = 47001;
export const REMINDER_DAYS = 30;
const DAY = 86_400_000;
export type ReminderPrefs = { daily: boolean; trial: boolean; time: string };
export type ReminderKid = { enabled: boolean; lastAt?: number; resetMode: '24h' | 'time'; resetTime: string };
export type TrialNotice = { endsAt: number; renews: boolean };
export type ReminderNotice = { id: number; at: number; kind: 'lesson' | 'trial' };
export function validReminderTime(value: string) { return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value); }
function dateKey(at: number) { const d = new Date(at); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
export function lessonReady(kid: ReminderKid, at: number) {
  if (!kid.enabled) return false;
  if (!kid.lastAt) return true;
  if (dateKey(kid.lastAt) === dateKey(at)) return false;
  if (kid.resetMode === '24h') return at >= kid.lastAt + DAY;
  const reset = new Date(kid.lastAt);
  const [h = 7, m = 0] = (validReminderTime(kid.resetTime) ? kid.resetTime : '07:00').split(':').map(Number);
  reset.setHours(h, m, 0, 0);
  if (reset.getTime() > kid.lastAt) reset.setDate(reset.getDate() - 1);
  reset.setDate(reset.getDate() + 1);
  return at >= reset.getTime();
}
export function buildReminderSchedule(prefs: ReminderPrefs, kids: ReminderKid[], trial: TrialNotice | null, now = Date.now()): ReminderNotice[] {
  const notices: ReminderNotice[] = [];
  const trialAt = trial ? trial.endsAt - 2 * DAY : 0;
  // One accurate notice, never a fabricated trial date or a late catch-up alert.
  if (prefs.trial && trial?.renews && Number.isFinite(trialAt) && trialAt > now) notices.push({ id: TRIAL_NOTICE_ID, at: trialAt, kind: 'trial' });
  if (!prefs.daily) return notices;
  const [h = 16, m = 30] = (validReminderTime(prefs.time) ? prefs.time : DEFAULT_REMINDER_TIME).split(':').map(Number);
  for (let i = 0; i < REMINDER_DAYS; i++) {
    const day = new Date(now); day.setDate(day.getDate() + i); day.setHours(h, m, 0, 0);
    const at = day.getTime();
    if (at <= now || !kids.some(k => lessonReady(k, at))) continue;
    // Billing notice takes priority: never stack two reminders on one day.
    if (notices.some(n => dateKey(n.at) === dateKey(at))) continue;
    notices.push({ id: LESSON_NOTICE_BASE + i, at, kind: 'lesson' });
  }
  return notices.sort((a, b) => a.at - b.at);
}
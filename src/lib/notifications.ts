import { createClientOnlyFn } from '@tanstack/react-start';
import { isNative } from './native';
import { readFamily, readKidValue } from './kid-storage';
import { buildReminderSchedule, DEFAULT_REMINDER_TIME, LESSON_NOTICE_BASE, REMINDER_DAYS, TRIAL_NOTICE_ID, validReminderTime, type ReminderKid, type ReminderPrefs, type TrialNotice } from './notification-rules';

const PREFS_KEY = 'ollie-notifications-v1';
const TRIAL_KEY = 'ollie-notification-trial-v1';
const plugin = createClientOnlyFn(async () => (await import('@capacitor/local-notifications')).LocalNotifications);
let queue: Promise<unknown> = Promise.resolve();
export function reminderPrefs(): ReminderPrefs {
  const defaults = { daily: false, trial: false, time: DEFAULT_REMINDER_TIME };
  try { const raw = JSON.parse(localStorage.getItem(PREFS_KEY) ?? 'null'); return { daily: raw?.daily === true, trial: raw?.trial === true, time: validReminderTime(raw?.time ?? '') ? raw.time : DEFAULT_REMINDER_TIME }; } catch { return defaults; }
}
function trialNotice(): TrialNotice | null {
  try { return JSON.parse(localStorage.getItem(TRIAL_KEY) ?? 'null'); } catch { return null; }
}
function kids(): ReminderKid[] {
  const family = readFamily();
  return (family.kids.length ? family.kids : [{ id: 'first', profile: {} }]).filter(k => Boolean(k.profile['onboardingComplete'])).map(k => {
    try {
      const state = JSON.parse(readKidValue('ollie-slideshow-v1', k.id) ?? '{}');
      return { enabled: state.prefs?.enabled !== false, lastAt: state.completions?.at(-1)?.at, resetMode: state.prefs?.resetMode ?? '24h', resetTime: state.prefs?.resetTime ?? '07:00' };
    } catch { return { enabled: true, resetMode: '24h', resetTime: '07:00' }; }
  });
}
function owned(id: number) { return id >= TRIAL_NOTICE_ID && id < LESSON_NOTICE_BASE + REMINDER_DAYS; }
export async function notificationPermission() { return isNative() ? (await (await plugin()).checkPermissions()).display : 'unavailable'; }
async function reconcile() {
  if (!isNative()) return;
  const sdk = await plugin();
  const pending = (await sdk.getPending()).notifications.filter(n => owned(n.id));
  if (pending.length) await sdk.cancel({ notifications: pending.map(n => ({ id: n.id })) });
  const prefs = reminderPrefs();
  // schedule() can request permission itself. Always check first to avoid surprise prompts.
  if ((!prefs.daily && !prefs.trial) || (await sdk.checkPermissions()).display !== 'granted') return;
  const notices = buildReminderSchedule(prefs, kids(), trialNotice());
  if (!notices.length) return;
  await sdk.schedule({ notifications: notices.map(n => ({
    id: n.id, title: n.kind === 'trial' ? 'Ollie trial reminder' : 'Daily Discovery',
    body: n.kind === 'trial' ? 'Your free trial ends in 2 days. Manage or cancel in Apple subscription settings before renewal.' : 'A new discovery is ready whenever your family has a quiet moment.',
    schedule: { at: new Date(n.at) }, extra: { kind: n.kind },
    // No sound, badge, child name, question or sensitive information on the lock screen.
  })) });
}
export function syncReminders(): Promise<void> {
  const next = queue.then(reconcile);
  queue = next.catch(() => undefined);
  return next;
}
export function refreshRemindersQuietly() { void syncReminders().catch(() => undefined); }
export async function saveReminderPrefs(next: ReminderPrefs, requestPermission = false) {
  if (!isNative()) throw new Error('Notifications are available in the Ollie iPhone and iPad app, not this website.');
  if (!validReminderTime(next.time)) throw new Error('Choose a valid reminder time.');
  if (next.daily || next.trial) {
    const sdk = await plugin();
    let permission = await sdk.checkPermissions();
    if (requestPermission && permission.display === 'prompt') permission = await sdk.requestPermissions();
    if (permission.display !== 'granted') throw new Error('Notifications are off in iOS. Enable them in Settings → Notifications → Ollie, then try again.');
  }
  localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  await syncReminders();
}
export function setNotificationTrial(trial: TrialNotice | null) {
  if (trial) localStorage.setItem(TRIAL_KEY, JSON.stringify(trial)); else localStorage.removeItem(TRIAL_KEY);
  refreshRemindersQuietly();
}
export async function clearReminders() {
  localStorage.removeItem(PREFS_KEY); localStorage.removeItem(TRIAL_KEY);
  await syncReminders();
  if (isNative()) {
    const sdk = await plugin();
    const delivered = await sdk.getDeliveredNotifications();
    const notifications = delivered.notifications.filter(n => owned(n.id));
    if (notifications.length) await sdk.removeDeliveredNotifications({ notifications });
  }
}
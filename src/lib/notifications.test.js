import { beforeEach, expect, mock, test } from 'bun:test';
const store = new Map();
globalThis.localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: k => store.delete(k) };
globalThis.window = { addEventListener: () => {}, Capacitor: { isNativePlatform: () => true } };
let permission = 'prompt';
let requests = 0;
let pending = [];
const sdk = {
  checkPermissions: async () => ({ display: permission }),
  requestPermissions: async () => { requests++; permission = 'granted'; return { display: permission }; },
  getPending: async () => ({ notifications: pending }),
  cancel: async ({ notifications }) => { pending = pending.filter(n => !notifications.some(x => x.id === n.id)); },
  schedule: async ({ notifications }) => { pending = notifications; },
  getDeliveredNotifications: async () => ({ notifications: [] }),
};
mock.module('@tanstack/react-start', () => ({ createClientOnlyFn: fn => fn }));
mock.module('@capacitor/local-notifications', () => ({ LocalNotifications: sdk }));
const { syncReminders, saveReminderPrefs, clearReminders, setNotificationTrial } = await import('./notifications');
beforeEach(() => {
  store.clear(); pending = []; requests = 0; permission = 'prompt';
  store.set('ollie-family-v2', JSON.stringify({ kids: [{ id: 'first', profile: { onboardingComplete: true } }, { id: 'second', profile: { onboardingComplete: true } }] }));
});
test('launch never prompts; explicit parent opt-in schedules silent household reminders', async () => {
  await syncReminders(); expect(requests).toBe(0); expect(pending.length).toBe(0);
  await saveReminderPrefs({ daily: true, trial: true, time: '16:30' }, true);
  expect(requests).toBe(1); expect(pending.length).toBeGreaterThan(0); expect(pending.length).toBeLessThanOrEqual(30);
  expect(pending.every(n => n.sound === undefined && n.badge === undefined)).toBe(true);
  const saved = JSON.parse(store.get('ollie-notifications-v1'));
  expect(saved.time).toBe('16:30');
  const lastAt = Date.now();
  for (const id of ['first', 'second']) store.set(`ollie-slideshow-v1:${id}`, JSON.stringify({ completions: [{ at: lastAt }], prefs: { enabled: true, resetMode: '24h' } }));
  await syncReminders();
  expect(pending.every(n => new Date(n.schedule.at).toDateString() !== new Date().toDateString())).toBe(true);
  await clearReminders(); expect(pending).toHaveLength(0); expect(store.has('ollie-notifications-v1')).toBe(false);
});
test('denied permission never schedules or claims opt-in', async () => {
  permission = 'denied';
  await expect(saveReminderPrefs({ daily: true, trial: true, time: '16:30' }, true)).rejects.toThrow('Settings');
  expect(requests).toBe(0); expect(pending).toHaveLength(0); expect(store.has('ollie-notifications-v1')).toBe(false);
});
test('confirmed trial schedules once and cancellation removes it', async () => {
  permission = 'granted';
  await saveReminderPrefs({ daily: false, trial: true, time: '16:30' });
  setNotificationTrial({ endsAt: Date.now() + 7 * 86400000, renews: true }); await syncReminders();
  expect(pending).toHaveLength(1); expect(pending[0].extra.kind).toBe('trial');
  setNotificationTrial({ endsAt: Date.now() + 7 * 86400000, renews: false }); await syncReminders();
  expect(pending).toHaveLength(0);
});
import { expect, test } from 'bun:test';
import { buildReminderSchedule, DEFAULT_REMINDER_TIME, lessonReady, TRIAL_NOTICE_ID, validReminderTime } from './notification-rules';
const now = new Date(2026, 10, 12, 10).getTime();
const kid = { enabled: true, resetMode: '24h', resetTime: '07:00' };
const prefs = { daily: true, trial: true, time: '16:30' };
test('default reminder is 4:30 PM and no more than one household notice per day', () => {
  expect(DEFAULT_REMINDER_TIME).toBe('16:30');
  const notices = buildReminderSchedule(prefs, [kid, kid], null, now);
  expect(notices).toHaveLength(30);
  expect(new Date(notices[0].at).getHours()).toBe(16);
  expect(new Date(notices[0].at).getMinutes()).toBe(30);
  expect(new Set(notices.map(n => new Date(n.at).toDateString())).size).toBe(notices.length);
});
test('completed lesson skips today and waits for the 24-hour unlock', () => {
  const completed = { ...kid, lastAt: new Date(2026, 10, 12, 17).getTime() };
  expect(lessonReady(completed, new Date(2026, 10, 12, 18).getTime())).toBe(false);
  const notices = buildReminderSchedule(prefs, [completed], null, now);
  expect(new Date(notices[0].at).getDate()).toBe(14);
});
test('daily reset mode waits for its actual unlock time', () => {
  const completed = { ...kid, resetMode: 'time', resetTime: '18:00', lastAt: new Date(2026, 10, 12, 19).getTime() };
  expect(lessonReady(completed, new Date(2026, 10, 13, 16, 30).getTime())).toBe(false);
  expect(lessonReady(completed, new Date(2026, 10, 13, 18).getTime())).toBe(true);
});
test('one verified trial notice occurs two days before billing and replaces that day’s lesson reminder', () => {
  const end = new Date(2026, 10, 19, 12).getTime();
  const notices = buildReminderSchedule(prefs, [kid], { endsAt: end, renews: true }, now);
  expect(notices.find(n => n.id === TRIAL_NOTICE_ID)?.at).toBe(end - 2 * 86400000);
  expect(notices.filter(n => new Date(n.at).getDate() === 17)).toHaveLength(1);
});
test('canceled, expired, missing or opted-out trial never schedules a billing alert', () => {
  for (const trial of [null, { endsAt: now - 1, renews: true }, { endsAt: now + 7 * 86400000, renews: false }]) expect(buildReminderSchedule(prefs, [], trial, now)).toHaveLength(0);
  expect(buildReminderSchedule({ ...prefs, trial: false }, [], { endsAt: now + 7 * 86400000, renews: true }, now)).toHaveLength(0);
});
test('disabled reminders, incomplete family and disabled lessons never send daily alerts', () => {
  expect(buildReminderSchedule({ ...prefs, daily: false }, [kid], null, now)).toHaveLength(0);
  expect(buildReminderSchedule(prefs, [], null, now)).toHaveLength(0);
  expect(buildReminderSchedule(prefs, [{ ...kid, enabled: false }], null, now)).toHaveLength(0);
});
test('past times are not replayed and invalid time is rejected', () => {
  const late = new Date(2026, 10, 12, 20).getTime();
  expect(new Date(buildReminderSchedule(prefs, [kid], null, late)[0].at).getDate()).toBe(13);
  expect(validReminderTime('25:00')).toBe(false);
  expect(validReminderTime('09:15')).toBe(true);
});
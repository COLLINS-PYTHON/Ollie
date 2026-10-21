import { beforeEach, expect, test } from 'bun:test';
import { ACTIVE_KID_KEY, MAX_KIDS, readFamily, readKidValue, writeKidValue } from './kid-storage';
import { addKid, switchKid } from './family-store';
import { onboardingState, parentSettings, saveProfile } from './onboarding-store';
const values = new Map();
const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
beforeEach(() => {
  values.clear();
  Object.assign(globalThis, { localStorage: storage, sessionStorage: storage, window: { dispatchEvent: () => true } });
  Object.assign(onboardingState, { name: 'First kid', age: 6, pin: '', pinHash: '', onboardingComplete: true, interests: ['space'], customInterest: '' });
  parentSettings.retentionDays = 30;
  saveProfile();
});
test('a family supports exactly two kids and refuses a third', () => {
  expect(MAX_KIDS).toBe(2);
  expect(addKid('Second kid', 9)).toBeString();
  expect(addKid('Third kid', 10)).toBeNull();
  expect(readFamily().kids.map(k => k.profile.name)).toEqual(['First kid', 'Second kid']);
});
test('second kid never inherits legacy chat', () => {
  storage.setItem('ollie-chat-v1', 'first conversation');
  expect(readKidValue('ollie-chat-v1', 'first')).toBe('first conversation');
  expect(readKidValue('ollie-chat-v1', 'second')).toBeNull();
});
test('kid switching keeps chats and picture balances separate', () => {
  writeKidValue('ollie-chat-v1', 'first chat');
  writeKidValue('ollie-cookies-v1', 'first balance');
  const second = addKid('Second kid', 9);
  if (!second) throw new Error('Expected second profile');
  switchKid(second);
  expect(storage.getItem(ACTIVE_KID_KEY)).toBe(second);
  expect(readKidValue('ollie-chat-v1')).toBeNull();
  writeKidValue('ollie-chat-v1', 'second chat');
  writeKidValue('ollie-cookies-v1', 'second balance');
  switchKid('first');
  expect(onboardingState.name).toBe('First kid');
  expect(readKidValue('ollie-chat-v1')).toBe('first chat');
  expect(readKidValue('ollie-cookies-v1')).toBe('first balance');
});
test('kid ages outside four through twelve are rejected', () => {
  expect(addKid('Too young', 3)).toBeNull();
  expect(addKid('Too old', 13)).toBeNull();
  expect(readFamily().kids.length).toBe(1);
});
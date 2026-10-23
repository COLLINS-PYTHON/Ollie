import { afterEach, expect, test } from 'bun:test';
import { parentSettings } from './onboarding-store';
import { bubbleSound } from './bubble-sound';
const previousWindow = globalThis.window;
const previousAudio = globalThis.AudioContext;
afterEach(() => { parentSettings.soundOn = true; globalThis.window = previousWindow; globalThis.AudioContext = previousAudio; });
test('turning sound off prevents bubble audio', () => {
  let created = 0;
  globalThis.window = { AudioContext: true };
  globalThis.AudioContext = class { constructor() { created++; } };
  parentSettings.soundOn = false;
  bubbleSound();
  expect(created).toBe(0);
});
test('a suspended audio context resumes before navigation cue starts', async () => {
  let resumed = false;
  let starts = 0;
  globalThis.window = { AudioContext: true };
  globalThis.AudioContext = class {
    state = 'suspended'; currentTime = 0; destination = {};
    resume() { resumed = true; return Promise.resolve(); }
    createOscillator() { return { frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, start() { expect(resumed).toBe(true); starts++; }, stop() {} }; }
    createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} }; }
  };
  bubbleSound();
  await Promise.resolve();
  expect(starts).toBe(2);
});
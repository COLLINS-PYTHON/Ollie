import { afterEach, expect, test } from 'bun:test';
import { parentSettings } from './onboarding-store';
import { speak, stopSpeaking } from './speak';
const originalWindow = globalThis.window;
const originalAudio = globalThis.Audio;
const originalFetch = globalThis.fetch;
afterEach(() => {
  stopSpeaking();
  parentSettings.soundOn = true;
  globalThis.window = originalWindow;
  globalThis.Audio = originalAudio;
  globalThis.fetch = originalFetch;
});
test('sound disabled does not request or play narration', async () => {
  let requests = 0;
  globalThis.window = {};
  globalThis.fetch = async () => { requests++; return new Response(); };
  parentSettings.soundOn = false;
  await speak('Muted narration test', { age: 6 });
  expect(requests).toBe(0);
});
test('neural narration starts playback and reports completion', async () => {
  let plays = 0, starts = 0, ends = 0;
  globalThis.window = {};
  globalThis.fetch = async () => new Response(new Blob(['audio'], { type:'audio/wav' }));
  globalThis.Audio = class {
    play() { plays++; this.onplay?.(); this.onended?.(); return Promise.resolve(); }
    pause() {}
  };
  await speak('Narration playback test', { age: 9, onStart:()=>starts++, onEnd:()=>ends++ });
  expect(plays).toBe(1); expect(starts).toBe(1); expect(ends).toBe(1);
});
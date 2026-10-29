import { authHeaders } from './auth-headers';
/* Ollie's natural voice. Clips are stored permanently on the device per pace band,
   so a line heard once always replays in the identical voice, even offline.
   The browser voice is only a last resort after retries fail. */
import { voiceRate } from './voice-pacing';
import { parentSettings } from './onboarding-store';
type Handlers = { onStart?: () => void; onEnd?: () => void; rate?: number; age?: number };

const VOICE_VERSION = 'kore-v1';
const STORE = 'ollie-voice-v1';
let current: HTMLAudioElement | null = null;
let token = 0;
const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

/** Pace band, matching voicePace on the server. Ages in a band share one clip. */
export function paceBand(age: number) { return age <= 6 ? 6 : age <= 9 ? 9 : 12; }
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fromStore(key: string): Promise<Blob | null> {
  try { if (typeof caches === 'undefined') return null; const hit = await (await caches.open(STORE)).match(key); return hit ? await hit.blob() : null; } catch { return null; }
}
async function toStore(key: string, blob: Blob) {
  try { if (typeof caches !== 'undefined') await (await caches.open(STORE)).put(key, new Response(blob, { headers: { 'Content-Type': blob.type || 'audio/wav' } })); } catch { /* storage full or unavailable */ }
}

async function fetchClip(text: string, age: number): Promise<Blob> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('/api/speech', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(await authHeaders()) }, body: JSON.stringify({ text, age }) });
    if (res.ok) return await res.blob();
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= 2) throw new Error(String(res.status));
    await wait(800 * 2 ** attempt + Math.random() * 300);
  }
}

export function preloadSpeech(text: string, age = 7): Promise<string> {
  const band = paceBand(age);
  const clean = text.slice(0, 800);
  const key = `${band}:${clean}`;
  const cached = cache.get(key); if (cached) return Promise.resolve(cached);
  const request = pending.get(key); if (request) return request;
  const storeKey = `/voice/${VOICE_VERSION}/${band}/${encodeURIComponent(clean)}`;
  const next = (async () => {
    let blob = await fromStore(storeKey);
    if (!blob) { blob = await fetchClip(clean, band); void toStore(storeKey, blob); }
    const url = URL.createObjectURL(blob); cache.set(key, url);
    if (cache.size > 40) { const oldest = cache.keys().next().value; if (oldest) { const old = cache.get(oldest); if (old) URL.revokeObjectURL(old); cache.delete(oldest); } }
    return url;
  })().finally(() => pending.delete(key));
  pending.set(key, next); return next;
}

export function stopSpeaking() {
  token++;
  if (current) { current.pause(); current = null; }
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function browserSpeak(text: string, h: Handlers) {
  if (!("speechSynthesis" in window)) { h.onEnd?.(); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.rate = h.rate ?? voiceRate(h.age ?? 7);
  u.onstart = () => h.onStart?.();
  u.onend = () => h.onEnd?.();
  u.onerror = () => h.onEnd?.();
  window.speechSynthesis.speak(u);
}

export async function speak(text: string, h: Handlers = {}) {
  if (typeof window === "undefined" || !text.trim() || !parentSettings.soundOn) return;
  stopSpeaking();
  const mine = token;
  try {
    const url = await preloadSpeech(text, h.age ?? 7);
    if (mine !== token) return;
    const audio = new Audio(url);
    current = audio;
    audio.onplay = () => h.onStart?.();
    audio.onended = () => { if (current === audio) current = null; h.onEnd?.(); };
    audio.onerror = () => h.onEnd?.();
    await audio.play();
  } catch {
    if (mine === token) browserSpeak(text, h);
  }
}

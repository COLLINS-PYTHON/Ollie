/* Natural read-aloud with the browser voice as an offline fallback. */
import { voiceRate } from './voice-pacing';
import { parentSettings } from './onboarding-store';
type Handlers = { onStart?: () => void; onEnd?: () => void; rate?: number; age?: number };

let current: HTMLAudioElement | null = null;
let token = 0;
const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

export function preloadSpeech(text: string, age = 7): Promise<string> {
  const key = `${age}:${text}`;
  const cached = cache.get(key); if (cached) return Promise.resolve(cached);
  const request = pending.get(key); if (request) return request;
  const next = fetch('/api/speech', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text.slice(0,800), age }) }).then(async res => {
    if (!res.ok) throw new Error(String(res.status));
    const url = URL.createObjectURL(await res.blob()); cache.set(key,url);
    if (cache.size > 40) { const oldest = cache.keys().next().value; if (oldest) { const old = cache.get(oldest); if (old) URL.revokeObjectURL(old); cache.delete(oldest); } }
    return url;
  }).finally(() => pending.delete(key));
  pending.set(key,next); return next;
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

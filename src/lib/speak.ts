/* Natural read-aloud with the browser voice as an offline fallback. */
type Handlers = { onStart?: () => void; onEnd?: () => void; rate?: number };

let current: HTMLAudioElement | null = null;
let token = 0;
const cache = new Map<string, string>();

export function stopSpeaking() {
  token++;
  if (current) { current.pause(); current = null; }
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function browserSpeak(text: string, h: Handlers) {
  if (!("speechSynthesis" in window)) { h.onEnd?.(); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.rate = h.rate ?? 0.92;
  u.onstart = () => h.onStart?.();
  u.onend = () => h.onEnd?.();
  u.onerror = () => h.onEnd?.();
  window.speechSynthesis.speak(u);
}

export async function speak(text: string, h: Handlers = {}) {
  if (typeof window === "undefined" || !text.trim()) return;
  stopSpeaking();
  const mine = token;
  try {
    let url = cache.get(text);
    if (!url) {
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.slice(0, 800) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      url = URL.createObjectURL(await res.blob());
      cache.set(text, url);
    }
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

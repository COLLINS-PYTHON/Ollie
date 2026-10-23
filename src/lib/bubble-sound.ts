import { parentSettings } from './onboarding-store';
let context: AudioContext | undefined;
let lastCue = -100;
/** Play only after deliberate navigation; respect the parent's sound setting. */
export function bubbleSound() {
  if (typeof window === 'undefined' || !parentSettings.soundOn || !('AudioContext' in window)) return;
  if (performance.now() - lastCue < 100) return;
  lastCue = performance.now();
  try {
    context ??= new AudioContext();
    const audio = context;
    const play = () => {
      const now = audio.currentTime + 0.01;
      [0, 0.07].forEach((delay, index) => {
        const oscillator = audio.createOscillator(); const gain = audio.createGain(); const at = now + delay;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(index ? 460 : 680, at);
        oscillator.frequency.exponentialRampToValueAtTime(index ? 1100 : 1450, at + 0.055);
        gain.gain.setValueAtTime(0.001, at);
        gain.gain.exponentialRampToValueAtTime(index ? 0.09 : 0.14, at + 0.009);
        gain.gain.exponentialRampToValueAtTime(0.001, at + 0.12);
        oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(at); oscillator.stop(at + 0.13);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      });
    };
    if (audio.state === 'running') play(); else void audio.resume().then(play).catch(() => {});
  } catch { /* optional audio never prevents navigation */ }
}

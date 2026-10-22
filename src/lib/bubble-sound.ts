import { parentSettings } from './onboarding-store';
let context: AudioContext | undefined;
/** A short quiet water-drop cue, only from deliberate interaction and when sound is on. */
export function bubbleSound() {
  if (typeof window === 'undefined' || !parentSettings.soundOn || !('AudioContext' in window)) return;
  try {
    context ??= new AudioContext();
    void context.resume();
    const oscillator = context.createOscillator(); const gain = context.createGain(); const now = context.currentTime;
    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(520, now); oscillator.frequency.exponentialRampToValueAtTime(940, now + 0.045); oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.13);
    gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.035, now + 0.012); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(now); oscillator.stop(now + 0.15);
  } catch { /* sound remains optional */ }
}
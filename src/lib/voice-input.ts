import { isNative } from './native';
export type RecognitionLike = {
  lang: string; interimResults: boolean; maxAlternatives?: number;
  start(): void; stop(): void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror?: ((event: { error: string }) => void) | null;
};
class NativeRecognition implements RecognitionLike {
  lang = 'en-US'; interimResults = false; maxAlternatives = 1;
  onresult: RecognitionLike['onresult'] = null; onend: RecognitionLike['onend'] = null; onerror: RecognitionLike['onerror'] = null;
  private stopped = false;
  private handles: { remove(): Promise<void> }[] = [];
  start() { this.stopped = false; void this.listen(); }
  private async listen() {
    try {
      const { SpeechRecognition } = await import('@capacitor-community/speech-recognition');
      if (!(await SpeechRecognition.available()).available) throw new Error('Speech input is unavailable. You can type instead.');
      const permission = await SpeechRecognition.requestPermissions();
      if (permission.speechRecognition !== 'granted') throw new Error('Allow microphone and speech access in Settings, or type instead.');
      if (this.stopped) return this.finish();
      this.handles.push(await SpeechRecognition.addListener('partialResults', ({ matches }) => {
        if (!this.stopped && matches[0]) this.onresult?.({ results: [[{ transcript: matches[0] }]] });
      }));
      this.handles.push(await SpeechRecognition.addListener('listeningState', ({ status }) => { if (status === 'stopped') void this.finish(); }));
      if (this.stopped) return this.finish();
      await SpeechRecognition.start({ language: this.lang, maxResults: 1, partialResults: true, popup: false });
      if (this.stopped) { await SpeechRecognition.stop(); await this.finish(); }
    } catch (error) { this.onerror?.({ error: error instanceof Error ? error.message : 'Voice input failed. You can type instead.' }); await this.finish(); }
  }
  stop() { this.stopped = true; void import('@capacitor-community/speech-recognition').then(({ SpeechRecognition }) => SpeechRecognition.stop()).catch(() => undefined).finally(() => this.finish()); }
  private async finish() { await Promise.all(this.handles.splice(0).map(handle => handle.remove())); this.onend?.(); }
}
export function getRecognition(): (new () => RecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  if (isNative()) return NativeRecognition;
  const browser = window as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition ?? null;
}
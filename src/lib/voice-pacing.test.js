import { expect, test } from 'bun:test';
import { voiceRate, voicePace } from './voice-pacing';
test('youngest children hear the slowest pace', () => { expect(voiceRate(4)).toBe(0.88); expect(voiceRate(6)).toBe(0.88); });
test('middle ages hear relaxed conversational pacing', () => { expect(voiceRate(7)).toBe(0.94); expect(voiceRate(9)).toBe(0.94); });
test('older children hear natural normal pace', () => { expect(voiceRate(10)).toBe(1); expect(voiceRate(12)).toBe(1); expect(voicePace(12)).toContain('unhurried'); });
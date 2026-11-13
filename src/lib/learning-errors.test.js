import { expect, test } from 'bun:test';
import { learningError } from './learning-errors';
test('signed-out requests explain the parent sign-in requirement', () => {
  expect(learningError(new Response('Unauthorized', { status: 401 }))).toBe('A parent needs to sign in before Ollie can answer.');
});
test('missing payment verification is not represented as a temporary AI failure', () => {
  expect(learningError(new Error('Subscription verification is unavailable. Please try again later.'))).toBe('Subscription verification is not set up yet. A parent can contact Ollie support.');
});
test('subscription access remains a parent purchase or restore requirement', () => {
  expect(learningError(new Error('An active Ollie subscription is required. Restore purchases or choose a plan.'))).toBe('A parent needs to restore purchases or choose a plan before Ollie can answer.');
});
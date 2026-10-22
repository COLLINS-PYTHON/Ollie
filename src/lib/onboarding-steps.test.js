import { expect, test } from 'bun:test';
import { ONBOARDING_STEPS, onboardingState, resetOnboardingState } from './onboarding-store.ts';
test('setup is at most 12 screens', () => { expect(ONBOARDING_STEPS.length).toBeLessThanOrEqual(12); });
test('PIN comes before paywall, account after plans', () => {
  const i = (s) => ONBOARDING_STEPS.indexOf(s);
  expect(i('/onboarding/pin')).toBeLessThan(i('/onboarding/paywall'));
  expect(i('/onboarding/account')).toBeGreaterThan(i('/onboarding/plans'));
});
test('deleting data resets in-memory setup', () => {
  onboardingState.name = 'Ada'; onboardingState.onboardingComplete = true;
  resetOnboardingState();
  expect(onboardingState.name).toBe(''); expect(onboardingState.onboardingComplete).toBe(false);
});

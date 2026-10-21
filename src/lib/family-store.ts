import { onboardingState, parentSettings, saveProfile } from './onboarding-store';
import { ACTIVE_KID_KEY, FAMILY_KEY, MAX_KIDS, activeKidId, readFamily, type KidRecord } from './kid-storage';
import { stopSpeaking } from './speak';

export function familyKids(): KidRecord[] {
  const family = readFamily();
  return family.kids.length ? family.kids : [{ id: 'first', profile: { ...onboardingState, settings: { ...parentSettings } } }];
}
export function switchKid(id: string) {
  if (id === activeKidId()) return;
  saveProfile();
  const kid = readFamily().kids.find(k => k.id === id);
  if (!kid) return;
  stopSpeaking();
  const household = { parentName: onboardingState.parentName, email: onboardingState.email, pinHash: onboardingState.pinHash, aiConsent: onboardingState.aiConsent, plan: onboardingState.plan, onboardingComplete: onboardingState.onboardingComplete };
  Object.assign(onboardingState, kid.profile, household, { pin: '' });
  Object.assign(parentSettings, kid.profile['settings'] ?? {});
  localStorage.setItem(ACTIVE_KID_KEY, id);
  saveProfile();
  window.dispatchEvent(new Event('ollie-kid-changed'));
}
export function addKid(name: string, age: number): string | null {
  if (!name.trim() || age < 4 || age > 12) return null;
  saveProfile();
  const family = readFamily();
  if (family.kids.length >= MAX_KIDS) return null;
  const id = crypto.randomUUID();
  family.kids.push({ id, profile: { ...onboardingState, name: name.trim(), age, readingLevel: null, interests: [], customInterest: '', struggles: [], customStruggle: '', triedSearch: false, triedImage: false, settings: { ...parentSettings } } });
  localStorage.setItem(FAMILY_KEY, JSON.stringify(family));
  return id;
}
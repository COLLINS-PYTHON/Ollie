export const FAMILY_KEY = 'ollie-family-v2';
export const ACTIVE_KID_KEY = 'ollie-active-kid-v2';
export type KidRecord = { id: string; cloudId?: string; storageId?: string; profile: Record<string, unknown> };
export type Family = { kids: KidRecord[]; ownerId?: string };
export const MAX_KIDS = 2;

export function readFamily(): Family {
  try { return JSON.parse(localStorage.getItem(FAMILY_KEY) ?? 'null') ?? { kids: [] }; }
  catch { return { kids: [] }; }
}
export function activeKidId(): string {
  return typeof window === 'undefined' ? 'first' : localStorage.getItem(ACTIVE_KID_KEY) ?? 'first';
}
export function kidKey(key: string, id = activeKidId()): string { return `${key}:${id}`; }
export function readKidValue(key: string, id = activeKidId()): string | null {
  const scoped = localStorage.getItem(kidKey(key, id));
  if (scoped !== null) return scoped;
  // Only the original kid inherits legacy data. Never copy it into kid two.
  if (id !== 'first') return null;
  const old = localStorage.getItem(key);
  if (old !== null) localStorage.setItem(kidKey(key, id), old);
  return old;
}
export function writeKidValue(key: string, value: string, id = activeKidId()) {
  localStorage.setItem(kidKey(key, id), value);
}
export function persistKidProfile(profile: Record<string, unknown>) {
  const family = readFamily();
  const id = activeKidId();
  const found = family.kids.find(k => k.id === id);
  if (found) found.profile = profile;
  else if (family.kids.length < MAX_KIDS) family.kids.push({ id, profile });
  localStorage.setItem(FAMILY_KEY, JSON.stringify(family));
}
export function clearFamilyStorage() {
  for (const key of Object.keys(localStorage)) if (key.startsWith('ollie-')) localStorage.removeItem(key);
  sessionStorage.removeItem('ollie-onboarding-draft-v1');
}
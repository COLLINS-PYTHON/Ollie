/* Account saving: copies the on-device profile and progress to the signed-in
   parent's account, and pulls it back onto a new device after "Log in". */
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { onboardingState, parentSettings, saveProfile } from "./onboarding-store";
import { readFamily, FAMILY_KEY, ACTIVE_KID_KEY, activeKidId, readKidValue, writeKidValue, clearFamilyStorage } from "./kid-storage";
import { loadPictures, savePicture, type Picture } from "./picture-store";

const PROGRESS_KEYS = ["ollie-chat-v1", "ollie-slideshow-v1", "ollie-usage-v1", "ollie-cookies-v1", "ollie-daily-selection-v1", "ollie-custom-lesson-v1"];
const PROFILE_KEY = "ollie-profile-v1";

export async function hashPin(pin: string) {
  const bytes = new TextEncoder().encode(`ollie-pin:${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const hasPin = () => !!(onboardingState.pinHash || onboardingState.pin);

export async function checkPin(value: string) {
  if (onboardingState.pinHash) return (await hashPin(value)) === onboardingState.pinHash;
  return value === onboardingState.pin;
}

/* Replace the typed PIN with its hash so the PIN itself is never stored. */
export async function sealPin() {
  if (!onboardingState.pin) return;
  onboardingState.pinHash = await hashPin(onboardingState.pin);
  onboardingState.pin = "";
  saveProfile();
}

function readProgress(id = activeKidId()) {
  const out: Record<string, Json> = {};
  for (const k of PROGRESS_KEYS) {
    try {
      const raw = readKidValue(k, id);
      if (raw) out[k] = JSON.parse(raw) as Json;
    } catch {
      /* skip */
    }
  }
  return out;
}

let pushing = false;
export async function pushAll() {
  if (pushing || !onboardingState.name) return;
  pushing = true;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;
    if (await deviceRevoked(user.id)) return;
    await sealPin();
    const s = onboardingState;
    const now = new Date().toISOString();
    const { error: accErr } = await supabase.from("accounts").upsert({
      id: user.id,
      name: s.parentName || (user.user_metadata?.["full_name"] as string | undefined) || "",
      email: user.email ?? s.email,
      pin_hash: s.pinHash || null,
      sound_enabled: parentSettings.soundOn,
      weekly_email_opt_in: !!s.weeklyEmail,
      updated_at: now,
    });
    if (accErr) throw accErr;
    saveProfile();
    const family = readFamily();
    if (family.ownerId && family.ownerId !== user.id) throw new Error('This device belongs to a different family. Sign out before switching accounts.');
    const { data: existingKids, error: kidsError } = await supabase.from('children').select('id,name').eq('account_id', user.id).order('created_at');
    if (kidsError) throw kidsError;
    for (const kid of family.kids) {
      const { pin: _pin, pinHash: _hash, ...setup } = kid.profile;
      const profile = kid.profile as unknown as typeof onboardingState;
      const row = {
        account_id: user.id, name: profile.name, age: profile.age,
        reading_level: profile.readingLevel, interests: profile.interests,
        reply_tone: profile.tone, screen_time_limit_minutes: profile.limitMinutes,
        slideshow_reset_time: profile.slideshowReset, chat_retention_setting: parentSettings.retentionDays,
        setup: setup as unknown as Json, progress: readProgress(kid.id), updated_at: now,
      };
      const exactMatches = (existingKids ?? []).filter(row => row.name === profile.name);
      const cloudId = kid.cloudId ?? (kid.id === "first" && family.kids.length === 1 && existingKids?.length === 1 && exactMatches.length === 1 ? exactMatches[0]?.id : undefined);
      const result = cloudId ? await supabase.from('children').update(row).eq('id', cloudId).select('id').single() : await supabase.from('children').insert(row).select('id').single();
      if (result.error) throw result.error;
      kid.cloudId = result.data.id;
      kid.storageId ??= kid.id === "first" ? "first" : result.data.id;
    }
    family.ownerId = user.id;
    localStorage.setItem(FAMILY_KEY, JSON.stringify(family));
    for (const kid of family.kids) await pushMissingPictures(user.id, kid.id, kid.storageId ?? (kid.id === "first" ? "first" : kid.cloudId ?? kid.id));
    await registerDevice(user.id);
  } catch (e) {
    console.warn("Saving to account failed", e);
  } finally {
    pushing = false;
  }
}

/* New device: copy the account's child onto this device. Returns false when the
   account has no child yet (setup was never finished). */
export async function pullAll() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return false;
  const [{ data: acc, error: accountError }, { data: kids, error: kidsError }] = await Promise.all([
    supabase.from('accounts').select('*').eq('id', user.id).maybeSingle(),
    supabase.from('children').select('*').eq('account_id', user.id).order('created_at').limit(2),
  ]);
  if (accountError || kidsError) throw accountError ?? kidsError;
  if (!kids?.length) return false;
  const previous = readFamily();
  const family = { ownerId: user.id, kids: kids.map((child, index) => {
    const setup = (child.setup ?? {}) as Record<string, unknown>;
    const id = previous.ownerId === user.id ? previous.kids.find(k => k.cloudId === child.id)?.id ?? (index === 0 ? 'first' : child.id) : index === 0 ? 'first' : child.id;
    const storageId = index === 0 ? 'first' : child.id;
    const profile = { ...setup, onboardingComplete: setup['onboardingComplete'] !== false,
      name: child.name, age: child.age, readingLevel: child.reading_level, interests: child.interests,
      tone: child.reply_tone, limitMinutes: child.screen_time_limit_minutes, slideshowReset: child.slideshow_reset_time,
      parentName: acc?.name ?? '', email: acc?.email ?? user.email ?? '', pin: '', pinHash: acc?.pin_hash ?? '',
      weeklyEmail: acc?.weekly_email_opt_in ?? null, settings: { soundOn: acc?.sound_enabled ?? true, retentionDays: child.chat_retention_setting },
    };
    const progress = (child.progress ?? {}) as Record<string, unknown>;
    for (const key of PROGRESS_KEYS) writeKidValue(key, JSON.stringify(progress[key] ?? (key === 'ollie-chat-v1' ? [] : null)), id);
    return { id, cloudId: child.id, storageId, profile };
  }) };
  localStorage.setItem(FAMILY_KEY, JSON.stringify(family));
  const selected = family.kids.find(k => k.id === activeKidId()) ?? family.kids[0];
  if (!selected) return false;
  localStorage.setItem(ACTIVE_KID_KEY, selected.id);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(selected.profile));
  Object.assign(onboardingState, selected.profile);
  Object.assign(parentSettings, selected.profile.settings);
  for (const kid of family.kids) await pullPictures(user.id, kid.id, kid.storageId);
  await registerDevice(user.id);
  return selected.profile.onboardingComplete;
}

/* Pictures: each one is saved as a small file in the parent's own folder. */
export async function uploadPicture(p: Picture, id = activeKidId(), storageId = readFamily().kids.find(k => k.id === id)?.storageId ?? (id === "first" ? "first" : readFamily().kids.find(k => k.id === id)?.cloudId ?? id)) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  const body = new Blob([JSON.stringify(p)], { type: "application/json" });
  await supabase.storage.from("pictures").upload(`${session.user.id}/${storageId}/${p.id}.json`, body, { upsert: true });
}

async function pushMissingPictures(userId: string, id: string, storageId: string) {
  const { data: files } = await supabase.storage.from("pictures").list(`${userId}/${storageId}`, { limit: 1000 });
  const have = new Set((files ?? []).map((f) => f.name));
  const local = await loadPictures(id).catch(() => [] as Picture[]);
  for (const p of local) if (!have.has(`${p.id}.json`)) await uploadPicture(p, id, storageId);
}

async function pullPictures(userId: string, id: string, storageId: string) {
  const { data: files } = await supabase.storage.from("pictures").list(`${userId}/${storageId}`, { limit: 1000 });
  for (const f of files ?? []) {
    const { data } = await supabase.storage.from("pictures").download(`${userId}/${storageId}/${f.name}`);
    if (!data) continue;
    try { await savePicture(JSON.parse(await data.text()) as Picture, id); } catch { /* skip */ }
  }
}

/* "Delete my data": removes the account's saved rows too, then signs out. */
export async function deleteCloudData() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  const uid = session.user.id;
  const { data: files } = await supabase.storage.from("pictures").list(uid, { limit: 1000 });
  if (files?.length) await supabase.storage.from("pictures").remove(files.map((f) => `${uid}/${f.name}`));
  await supabase.from("accounts").delete().eq("id", uid);
  await supabase.auth.signOut();
}

/* Brute-force protection: after 5 wrong tries, wait 60 seconds. */
const LOCK_LIMIT = 5, LOCK_MS = 60_000;
type Lock = { fails: number; until: number };
const readLock = (k: string): Lock => {
  try { return JSON.parse(localStorage.getItem(k) ?? "") as Lock; } catch { return { fails: 0, until: 0 }; }
};
export function lockedSeconds(k: string) {
  return Math.max(0, Math.ceil((readLock(k).until - Date.now()) / 1000));
}
export function recordFail(k: string) {
  const l = readLock(k);
  const fails = l.fails + 1;
  const next = fails >= LOCK_LIMIT ? { fails: 0, until: Date.now() + LOCK_MS } : { fails, until: l.until };
  localStorage.setItem(k, JSON.stringify(next));
  return lockedSeconds(k);
}
export function clearFails(k: string) { localStorage.removeItem(k); }
export const PIN_LOCK = "ollie-pin-lock", LOGIN_LOCK = "ollie-login-lock";

/* Devices: each phone or browser signed in to the account gets a row, so the
   parent can see them and log one out from the dashboard. */
const DEVICE_KEY = "ollie-device-v1";
export function deviceKey() {
  let k = localStorage.getItem(DEVICE_KEY);
  if (!k) { k = crypto.randomUUID(); localStorage.setItem(DEVICE_KEY, k); }
  return k;
}
function deviceLabel() {
  const ua = navigator.userAgent;
  const os = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : "Device";
  const app = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "";
  return app ? `${os}, ${app}` : os;
}
async function registerDevice(userId: string) {
  await supabase.from("devices").upsert(
    { account_id: userId, device_key: deviceKey(), label: deviceLabel(), last_seen: new Date().toISOString() },
    { onConflict: "account_id,device_key" },
  );
}
/* Logged out remotely: clear this device and send it back to the start. */
async function deviceRevoked(userId: string) {
  const { data } = await supabase.from("devices").select("id, revoked").eq("account_id", userId).eq("device_key", deviceKey()).maybeSingle();
  if (!data?.revoked) return false;
  await supabase.from("devices").delete().eq("id", data.id);
  await supabase.auth.signOut();
  clearFamilyStorage();
  sessionStorage.removeItem("ollie-onboarding-draft-v1");
  indexedDB.deleteDatabase("ollie-pictures");
  window.location.assign("/onboarding/fact");
  return true;
}
export type DeviceRow = { id: string; label: string; last_seen: string; device_key: string; revoked: boolean };
export async function listDevices(): Promise<DeviceRow[] | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { data } = await supabase.from("devices").select("id, label, last_seen, device_key, revoked").eq("account_id", session.user.id).order("last_seen", { ascending: false });
  return data ?? [];
}
export async function revokeDevice(id: string) {
  await supabase.from("devices").update({ revoked: true }).eq("id", id);
}
export async function signOutHere() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await supabase.from("devices").delete().eq("account_id", session.user.id).eq("device_key", deviceKey());
  await supabase.auth.signOut();
}

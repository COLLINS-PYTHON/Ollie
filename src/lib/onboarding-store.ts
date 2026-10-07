/* Shared onboarding state so Back keeps entered values across screens. */
export type ReadingLevel = "none" | "sounding" | "stories" | "chapters";

export const onboardingState = {
  name: "",
  age: 7,
  readingLevel: null as ReadingLevel | null,
  interests: [] as string[],
  customInterest: "",
  struggles: [] as string[],
  customStruggle: "",
  worries: [] as string[],
  baselineMinutes: 60,
  limitMinutes: 45,
  slideshowReset: "07:00",
  priorities: [] as string[],
  tone: null as string | null,
  customTone: "",
  triedSearch: false,
  triedImage: false,
  aiConsent: false,
  pin: "",
  pinHash: "",
  plan: "yearly" as "monthly" | "yearly",
  parentName: "",
  email: "",
  weeklyEmail: null as boolean | null,
  onboardingComplete: false,
};

export function formatMinutes(m: number) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h} hr ${r} min` : `${h} hr`;
}
export function formatClock(t: string) {
  const [h = 0, m = 0] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ap}`;
}

/* Setup keeps values in memory and a tab-local draft; the finished profile
   is saved separately and synced to the parent's account when signed in.
   Load from effects so server and first render match. */
export const parentSettings = {
  soundOn: true,
  retentionDays: 30 as 1 | 7 | 30,
};

const PROFILE_KEY = "ollie-profile-v1";
const DRAFT_KEY = "ollie-onboarding-draft-v1";
const STEP_KEY = "ollie-onboarding-step-v1";
export const ONBOARDING_STEPS = ["/onboarding/fact", "/onboarding/meet", "/onboarding", "/onboarding/age", "/onboarding/reading", "/onboarding/preview", "/onboarding/interests", "/onboarding/lessons", "/onboarding/worries", "/onboarding/assurance", "/onboarding/screen-time", "/onboarding/priorities", "/onboarding/tone", "/onboarding/try", "/onboarding/trust", "/onboarding/pin", "/onboarding/paywall", "/onboarding/account", "/onboarding/building", "/onboarding/handoff"] as const;
export function saveOnboardingStep(path: string) {
  if (!ONBOARDING_STEPS.some((s) => s === path)) return;
  localStorage.setItem(STEP_KEY, path);
  saveOnboardingDraft();
}
export function resumeOnboardingStep(): typeof ONBOARDING_STEPS[number] {
  const saved = localStorage.getItem(STEP_KEY);
  const step = ONBOARDING_STEPS.find((s) => s === saved);
  if (!step) return "/onboarding/fact";
  return ONBOARDING_STEPS.indexOf(step) >= 16 ? "/onboarding/trust" : step;
}
export function hasCompletedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) ?? "null") as Partial<typeof onboardingState> | null;
    const progress = JSON.parse(localStorage.getItem("ollie-slideshow-v1") ?? "null") as { completions?: unknown[] } | null;
    return Boolean(profile?.name?.trim() && (profile.onboardingComplete || (profile.onboardingComplete === undefined && progress?.completions?.length)));
  } catch { return false; }
}
export function completeOnboarding() {
  onboardingState.onboardingComplete = true;
  saveProfile();
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(STEP_KEY);
  sessionStorage.removeItem(DRAFT_KEY);
}

/* A tab-local setup draft keeps the name visible after a refresh without
   turning an unfinished onboarding into the child's saved profile. Never
   persist the PIN or its hash in this draft. */
export function saveOnboardingDraft() {
  try {
    const { pin: _pin, pinHash: _pinHash, ...draft } = onboardingState;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* storage unavailable */
  }
}

export function loadOnboardingDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY) ?? sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const { pin: _pin, pinHash: _pinHash, ...draft } = JSON.parse(raw) as Partial<typeof onboardingState>;
    Object.assign(onboardingState, draft);
  } catch {
    /* corrupted, keep current values */
  }
}

export function saveProfile() {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...onboardingState, settings: parentSettings }));
  } catch {
    /* storage unavailable */
  }
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return;
    const { settings, ...rest } = JSON.parse(raw) as Partial<typeof onboardingState> & {
      settings?: Partial<typeof parentSettings>;
    };
    Object.assign(onboardingState, rest);
    Object.assign(parentSettings, settings ?? {});
  } catch {
    /* corrupted, keep defaults */
  }
}

/* Fresh page load: pull saved values in. Mid-session: save what setup collected. */
export function syncProfile() {
  if (onboardingState.name) saveProfile();
  else loadProfile();
}

export const TONE_LABELS: Record<string, string> = {
  playful: "Playful & Silly",
  gentle: "Warm & Gentle",
  curious: "Curious & Adventurous",
  clear: "Clear & Educational",
};

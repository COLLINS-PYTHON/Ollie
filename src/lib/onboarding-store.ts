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
  plan: "yearly" as "monthly" | "yearly",
  parentName: "",
  email: "",
  weeklyEmail: null as boolean | null,
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

/* Profile persistence (device-only until accounts exist). Onboarding keeps
   values in memory; the app saves them once setup ends and reloads them on a
   fresh visit. Loaded only from effects so server and first render match. */
export const parentSettings = {
  soundOn: true,
  retentionDays: 30 as 1 | 7 | 30,
};

const PROFILE_KEY = "ollie-profile-v1";

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

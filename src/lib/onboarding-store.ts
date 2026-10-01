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

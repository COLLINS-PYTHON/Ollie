/* Shared onboarding state so Back keeps entered values across screens. */
export type ReadingLevel = "none" | "sounding" | "stories" | "chapters";

export const onboardingState = {
  name: "",
  age: 7,
  readingLevel: null as ReadingLevel | null,
};

import { expect, test } from "bun:test";
import { voiceFirst, starterInterests, canSwipeLesson } from "./child-interactions";
import { FREE_PER_DAY, cookiesLeft } from "./picture-store";
import { ONBOARDING_STEPS } from "./onboarding-store";
test("voice is primary below eight", () => { expect(voiceFirst(7)).toBe(true); expect(voiceFirst(8)).toBe(false); });
test("starter tags use selected interests", () => { expect(starterInterests(["dinos", "space", "ocean"]).map(i => i.id)).toEqual(["dinos", "space", "ocean"]); });
test("swipe cannot bypass unanswered quizzes", () => { expect(canSwipeLesson("quiz", "open")).toBe(false); expect(canSwipeLesson("content", "open")).toBe(true); expect(canSwipeLesson("quiz", "reveal")).toBe(true); });
test("ten fresh picture cookies", () => { expect(FREE_PER_DAY).toBe(10); expect(cookiesLeft({day:"2026-10-13",freeUsed:0,jarCookies:0})).toBe(10); });
test("worries immediately follow age", () => { const i=ONBOARDING_STEPS.indexOf("/onboarding/age"); expect(ONBOARDING_STEPS.slice(i,i+4)).toEqual(["/onboarding/age","/onboarding/worries","/onboarding/assurance","/onboarding/reading"]); });

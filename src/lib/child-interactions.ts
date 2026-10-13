import { INTERESTS } from "./interests";
export function voiceFirst(age: number) { return age < 8; }
export function starterInterests(ids: string[]) {
  const picked = ids.map((id) => INTERESTS.find((interest) => interest.id === id)).filter((interest) => interest !== undefined);
  return (picked.length ? picked : INTERESTS).slice(0, 4);
}
export function canSwipeLesson(kind: "content" | "quiz", status: "open" | "correct" | "reveal") { return kind === "content" || status === "reveal"; }

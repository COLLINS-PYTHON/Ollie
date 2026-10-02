/* Search chat persistence. One conversation per child (v1), stored on-device
   until the backend foundation adds accounts; trimmed to the parent-set retention (30 days by default). */
export type ChatRole = "sent" | "received";

/* Kid reactions to an answer. Never counted or streaked; parents only see "wow" moments. */
export type Reaction = "wow" | "funny" | "knew";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  tier?: string;
  flagReason?: string;
  reaction?: Reaction | undefined;
};

const KEY = "ollie-chat-v1";
import { parentSettings } from "./onboarding-store";

function trim(messages: ChatMessage[]): ChatMessage[] {
  const cutoff = Date.now() - parentSettings.retentionDays * 24 * 60 * 60 * 1000;
  return messages.filter((m) => m.createdAt >= cutoff);
}

export function loadChat(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return trim(Array.isArray(parsed) ? parsed : []);
  } catch {
    return [];
  }
}

export function saveChat(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(trim(messages)));
  } catch {
    /* storage full or unavailable; chat still works in-session */
  }
}

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { requireUser } from "@/lib/route-auth.server";
import { voicePace } from '@/lib/voice-pacing';
import { ONBOARDING_ANSWER } from '@/lib/onboarding-answer';

const bodySchema = z.object({ text: z.string().trim().min(1).max(800), age: z.number().int().min(4).max(12).default(7) });
/* Pinned voice: changing either value changes how Ollie sounds everywhere. */
const MODEL = "google/gemini-3.1-flash-tts-preview";
const VOICE = "Kore";
const VOICE_VERSION = "kore-v1";
/* Fixed setup lines may be voiced before a parent account exists. */
const PUBLIC_LINES = new Set(Object.values(ONBOARDING_ANSWER));
const band = (age: number) => (age <= 6 ? 6 : age <= 9 ? 9 : 12);

type EdgeCache = { match(k: Request): Promise<Response | undefined>; put(k: Request, r: Response): Promise<void> };
const edgeCache = (): EdgeCache | null => (globalThis as unknown as { caches?: { default?: EdgeCache } }).caches?.default ?? null;

async function cacheKey(text: string, b: number) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${VOICE_VERSION}|${b}|${text}`));
  const hex = [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, "0")).join("");
  return new Request(`https://ollie-voice.cache/${hex}`);
}

/* Ollie's natural read-aloud voice. Identical lines are synthesized once and served from cache. */
export const Route = createFileRoute("/api/speech")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Invalid request", { status: 400 });
        if (!PUBLIC_LINES.has(parsed.data.text)) {
          const denied = await requireUser(request);
          if (denied) return denied;
        }
        const b = band(parsed.data.age);
        const cache = edgeCache();
        const key = await cacheKey(parsed.data.text, b);
        const hit = cache ? await cache.match(key).catch(() => undefined) : undefined;
        if (hit) return hit;
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Voice unavailable", { status: 500 });
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: MODEL,
            contents: [{ role: "user", parts: [{ text: `Read warmly, ${voicePace(b)}. Do not rush. Speak only the following text: ${parsed.data.text}` }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
            },
            stream_format: "audio",
          }),
        });
        if (!upstream.ok) return new Response(upstream.body, { status: upstream.status });
        const audio = await upstream.arrayBuffer();
        const type = upstream.headers.get("Content-Type") ?? "audio/wav";
        if (cache) await cache.put(key, new Response(audio, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000" } })).catch(() => {});
        return new Response(audio, { headers: { "Content-Type": type, "Cache-Control": "private, max-age=31536000" } });
      },
    },
  },
});

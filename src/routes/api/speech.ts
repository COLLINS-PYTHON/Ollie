import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { voicePace } from '@/lib/voice-pacing';

const bodySchema = z.object({ text: z.string().trim().min(1).max(800), age: z.number().int().min(4).max(12).default(7) });
const MODEL = "google/gemini-3.1-flash-tts-preview";
const VOICE = "Kore";

/* Ollie's natural read-aloud voice. Returns one complete WAV clip. */
export const Route = createFileRoute("/api/speech")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Invalid request", { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Voice unavailable", { status: 500 });
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: MODEL,
            contents: [{ role: "user", parts: [{ text: `Read warmly, ${voicePace(parsed.data.age)}. Do not rush. Speak only the following text: ${parsed.data.text}` }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
            },
            stream_format: "audio",
          }),
        });
        return new Response(upstream.body, {
          status: upstream.status,
          headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "audio/wav", "Cache-Control": "no-store" },
        });
      },
    },
  },
});

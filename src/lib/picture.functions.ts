import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { callModel, parseJson } from "./ai-text.server";

const schema = z.object({
  idea: z.string().trim().min(1).max(300),
  age: z.number().int().min(4).max(12),
});

/* Layer 1: rewrite risky words into friendly alternatives before any image is attempted. */
export const preparePicture = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false as const, blocked: false, error: "AI is not configured yet." };
    const system = `You are the safety layer for Ollie, a picture maker for a ${data.age}-year-old child.
Turn the child's idea into one short, vivid, fully child-safe scene description (max 40 words) for an illustrator.
Rewrite anything risky into a harmless friendly version (a sword becomes a foam noodle, a fight becomes a dance-off, blood becomes red paint, monsters become friendly and smiley).
Never include real people, celebrities, brand or copyrighted characters (describe a generic original version instead), text, or anything scary, violent, sexual, or upsetting.
If the idea cannot be made safe at all (sexual content, self-harm, hateful content, graphic harm), set "blocked": true.
Reply with JSON only: {"blocked": boolean, "prompt": string}`;
    try {
      const text = await callModel(
        [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: data.idea }] },
        ],
        apiKey,
      );
      const out = parseJson<{ blocked?: boolean; prompt?: string }>(text);
      if (out.blocked || !out.prompt?.trim()) return { ok: false as const, blocked: true, error: "" };
      return { ok: true as const, prompt: out.prompt.trim().slice(0, 500) };
    } catch (err) {
      const status = (err as { status?: number }).status ?? 0;
      const error =
        status === 402
          ? "AI credits ran out."
          : status === 429
            ? "Ollie is busy right now. Please try again in a moment."
            : "Ollie could not make that right now. Please try again in a moment.";
      return { ok: false as const, blocked: false, error };
    }
  });

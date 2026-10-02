import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { callModel, parseJson } from "./ai-text.server";

const schema = z.object({
  topic: z.string().trim().min(1).max(120),
  age: z.number().int().min(4).max(12),
  band: z.enum(["4-6", "7-9", "10-12"]),
  struggle: z.boolean(),
});

const lessonSchema = z.object({
  blocked: z.boolean().optional(),
  title: z.string().min(1).max(60),
  picture: z.string().min(1).max(300),
  slides: z.array(z.object({ title: z.string().min(1).max(50), caption: z.string().min(1).max(260) })).min(3).max(4),
  quizzes: z
    .array(z.object({
      q: z.string().min(1).max(200),
      options: z.array(z.string().min(1).max(80)).length(3),
      answer: z.number().int().min(0).max(2),
      hint: z.string().min(1).max(200),
      why: z.string().min(1).max(260),
    }))
    .min(3)
    .max(3),
});
export type CustomLesson = z.infer<typeof lessonSchema>;

/* A parent-typed topic can't be pre-built, so this one lesson is written live
   during the "Building" finale. */
export const generateCustomLesson = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false as const };
    const words = data.band === "4-6" ? "very short, simple words, one sentence per slide" : data.band === "7-9" ? "short sentences, one or two per slide" : "two clear, interesting sentences per slide";
    const system = `You write Ollie's daily slideshow for a ${data.age}-year-old child (reading band ${data.band}).
Topic: "${data.topic}"${data.struggle ? ` (a subject the child finds tricky, so make it gentle, encouraging and confidence-building)` : ""}.
Write 3 fact slides then 3 quiz questions about only those facts. Use ${words}. Warm, curious, never scary. No em dashes.
Each quiz has exactly 3 options and the index of the correct one. "hint" nudges without giving the answer. "why" explains the right answer simply.
"picture" is a one-line child-safe scene for an illustrator about the topic, no text in the image.
If the topic is not safe for a child, reply {"blocked": true}.
Reply with JSON only: {"title": string, "picture": string, "slides": [{"title": string, "caption": string}], "quizzes": [{"q": string, "options": [string,string,string], "answer": number, "hint": string, "why": string}]}`;
    try {
      const text = await callModel(
        [
          { role: "system", content: [{ type: "input_text", text: system }] },
          { role: "user", content: [{ type: "input_text", text: data.topic }] },
        ],
        apiKey,
      );
      const raw = parseJson<{ blocked?: boolean }>(text);
      if (raw.blocked) return { ok: false as const };
      const parsed = lessonSchema.safeParse(raw);
      if (!parsed.success) return { ok: false as const };
      return { ok: true as const, lesson: parsed.data };
    } catch {
      return { ok: false as const };
    }
  });

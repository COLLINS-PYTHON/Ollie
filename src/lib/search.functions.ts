import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "openai/gpt-6-astra";
const GATEWAY = "https://ai.gateway.lovable.dev/v1/responses";

/* Locked safety copy, word for word from the spec. Never personalized by tone. */
const LOCKED = {
  grownup: "That's a question for a grown-up you trust. They can explain it best.",
  severe: "Sorry, I'm not able to answer that one. What else are you curious about today?",
  selfHarm: "Please tell a grown-up you trust right now. You matter, and you don't have to handle this alone.",
  nine88: "In the U.S. you can also call or text 988 anytime.",
  fallback: "Let's ask a grown-up about that one together.",
};

const schema = z.object({
  question: z.string().min(1).max(500),
  child: z.object({
    name: z.string().max(40),
    age: z.number().int().min(4).max(12),
    readingLevel: z.enum(["none", "sounding", "stories", "chapters"]),
    tone: z.string().max(60).nullable(),
    interests: z.array(z.string().max(60)).max(13),
  }),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().max(2000),
      })
    )
    .max(10)
    .default([]),
});

type SafetyTier = "ok" | "grownup" | "feelings" | "danger" | "severe";
type PipelineResult = { answer: string; tier: SafetyTier; flagReason: string };
type Child = z.infer<typeof schema>["child"];

/* One streamed Responses call; the full text is accumulated server-side so no
   part of an unchecked answer ever reaches the child. */
async function streamOnce(input: unknown[], apiKey: string): Promise<string> {
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: MODEL,
      input,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
    }),
  });
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    const err = new Error(`AI request failed (${res.status})`);
    (err as { status?: number }).status = res.status;
    (err as { detail?: string }).detail = detail.slice(0, 300);
    throw err;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const rawEvent = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      for (const line of rawEvent.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const evt = JSON.parse(data);
          if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
            text += evt.delta;
          }
        } catch {
          /* keepalive or non-JSON event */
        }
      }
    }
  }
  if (!text.trim()) throw new Error("Empty AI response");
  return text;
}

async function callModel(input: unknown[], apiKey: string): Promise<string> {
  try {
    return await streamOnce(input, apiKey);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 0;
    if (status === 429 || status >= 500) {
      await new Promise((r) => setTimeout(r, 900));
      return streamOnce(input, apiKey);
    }
    throw err;
  }
}

function parseJson<T>(text: string): T {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model returned no JSON");
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
}

function normalize(raw: { tier?: string; answer?: string; flagReason?: string }): PipelineResult {
  const tiers: SafetyTier[] = ["ok", "grownup", "feelings", "danger", "severe"];
  const tier = (tiers.includes(raw.tier as SafetyTier) ? raw.tier : "ok") as SafetyTier;
  let answer = (raw.answer ?? "").trim();
  if (tier === "grownup") answer = LOCKED.grownup;
  if (tier === "severe") answer = LOCKED.severe;
  if (!answer) answer = LOCKED.fallback;
  return { answer, tier, flagReason: (raw.flagReason ?? "").trim().slice(0, 80) };
}

function buildSystemPrompt(child: Child): string {
  const levelGuide: Record<string, string> = {
    none: "One short, very simple sentence. Everyday words only.",
    sounding: "One or two very short sentences with simple words they can follow when read aloud.",
    stories: "Two or three clear sentences.",
    chapters: "Three or four richer sentences with some depth.",
  };
  const dangerExtra =
    child.age >= 10
      ? ` Append "${LOCKED.nine88}" to self-harm answers.`
      : "";
  return `You are Ollie, a safe AI learning companion for kids. You are answering ${child.name}, age exactly ${child.age}.

Reply with ONLY a JSON object, no other text: {"tier":"ok","answer":"...","flagReason":""}

First classify the question into exactly one tier:
- "severe": graphic, sexual, or violent content, or anything explicitly adult. The answer must be exactly: "${LOCKED.severe}"
- "danger": an immediate safety risk the child mentioned (pills, fire, weapons, a stranger, self-harm or being hurt). Reply with a short plain safety instruction that sends them to a grown-up right now. For self-harm language use exactly: "${LOCKED.selfHarm}"${dangerExtra}
- "grownup": topics meant for adults (adult words, sex, gambling, graphic news). The answer must be exactly: "${LOCKED.grownup}"
- "feelings": sad, lonely, scared, or being bullied. Write a short warm acknowledgment (one or two sentences), then end with a suggestion to talk to a grown-up they trust. Never pivot to another topic or question.
- "ok": everything else.

For "ok" tier answers:
- Vocabulary, sentence length and depth must match a child of exactly age ${child.age} at reading level "${child.readingLevel}".
- ${levelGuide[child.readingLevel] ?? levelGuide.stories}
- Reply tone: ${child.tone ?? "Warm & Gentle"}.${child.interests.length ? ` When it fits naturally, connect to their interests: ${child.interests.join(", ")}.` : ""}
- Answer the question completely, then stop. Never end with a follow-up question.
- It is always okay to say "I'm not sure about that one" instead of guessing.
- Never use em dashes. Never suggest anything unsafe. Never mention that you are an AI model.

flagReason: for non-ok tiers, 3 to 6 words describing why (shown to the parent). Empty string for ok.`;
}

async function postCheck(question: string, answer: string, child: Child, apiKey: string): Promise<boolean> {
  const system = `You are a children's content safety reviewer. Question from a ${child.age}-year-old (reading level: ${child.readingLevel}):
"${question}"
Proposed answer:
"${answer}"
Reply with ONLY JSON: {"pass":true,"reason":""}
Fail the answer if it contains or encourages violence, sexual content, self-harm, drugs, alcohol, hate, scary graphic detail, or anything else inappropriate for this age, or if its vocabulary is far too advanced for the reading level. Minor style issues pass.`;
  const res = parseJson<{ pass?: boolean }>(
    await callModel(
      [
        { role: "system", content: [{ type: "input_text", text: system }] },
        { role: "user", content: [{ type: "input_text", text: "Review the proposed answer." }] },
      ],
      apiKey
    )
  );
  return res.pass !== false;
}

async function runPipeline(question: string, child: Child, history: { role: "user" | "assistant"; text: string }[], apiKey: string): Promise<PipelineResult> {
  const historyItems = history.map((m) => ({
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    content: [{ type: m.role === "user" ? "input_text" : "output_text", text: m.text }],
  }));
  const messages = [
    { role: "system", content: [{ type: "input_text", text: buildSystemPrompt(child) }] },
    ...historyItems,
    { role: "user", content: [{ type: "input_text", text: question }] },
  ];

  const first = parseJson<{ tier?: string; answer?: string; flagReason?: string }>(
    await callModel(messages, apiKey)
  );
  let result = normalize(first);

  const needsCheck = result.tier === "ok" || result.tier === "feelings";
  if (needsCheck) {
    const pass = await postCheck(question, result.answer, child, apiKey);
    if (!pass) {
      const retryRaw = parseJson<{ tier?: string; answer?: string; flagReason?: string }>(
        await callModel(
          [
            ...messages,
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: "Your previous draft failed the age-appropriateness check. Rewrite it now: keep it safe, simple, and completely appropriate for this child's age and reading level. Same JSON format.",
                },
              ],
            },
          ],
          apiKey
        )
      );
      const second = normalize(retryRaw);
      const secondPass =
        second.tier === "severe" || second.tier === "grownup"
          ? true
          : await postCheck(question, second.answer, child, apiKey);
      result = secondPass ? second : { answer: LOCKED.fallback, tier: "ok", flagReason: "" };
    }
  }
  return result;
}

export const askOllie = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false as const, error: "AI is not configured yet." };
    try {
      const result = await runPipeline(data.question, data.child, data.history, apiKey);
      return { ok: true as const, ...result };
    } catch (err) {
      const status = (err as { status?: number }).status ?? 0;
      const message =
        status === 402
          ? "AI credits ran out."
          : status === 429
            ? "Ollie is busy right now. Please try again in a moment."
            : "Ollie could not answer right now. Please try again in a moment.";
      return { ok: false as const, error: message };
    }
  });

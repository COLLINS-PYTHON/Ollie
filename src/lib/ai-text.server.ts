const MODEL = "openai/gpt-6-astra";
const GATEWAY = "https://ai.gateway.lovable.dev/v1/responses";

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

export async function callModel(input: unknown[], apiKey: string): Promise<string> {
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

export function parseJson<T>(text: string): T {
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


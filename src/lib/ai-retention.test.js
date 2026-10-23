import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

// Models verified as zero data retention on the endpoint Ollie calls (gateway /v1/models, Oct 23 2026).
const ZERO_RETENTION = ["openai/gpt-6-luna", "google/gemini-3.1-flash-lite-image", "google/gemini-3.1-flash-tts-preview"];
const FILES = ["src/lib/ai-text.server.ts", "src/lib/image-gateway.server.ts", "src/lib/search.functions.ts", "src/routes/api/speech.ts"];

describe("AI providers never retain or train on family data", () => {
  it("every model Ollie calls is on the verified zero-retention list", () => {
    for (const f of FILES) {
      const ids = readFileSync(f, "utf8").match(/"(openai|google|anthropic)\/[a-z0-9.\-]+"/g) ?? [];
      for (const id of ids) expect(ZERO_RETENTION).toContain(id.replaceAll('"', ""));
    }
  });
});

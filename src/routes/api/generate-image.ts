import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { generateImage, imageSettings } from "@/lib/image-gateway.server";

const bodySchema = z.object({
  prompt: z.string().trim().min(1).max(600),
  stream: z.boolean().optional(),
});

const STYLE =
  "Bright, friendly, child-safe storybook illustration in a soft glossy 3D cartoon style, warm colors, gentle lighting, no text, no words, no scary or violent elements. Scene: ";

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Invalid request", { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        const upstream = await generateImage(
          { ...imageSettings, apiKey },
          STYLE + parsed.data.prompt,
          parsed.data.stream ?? true,
        );
        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});

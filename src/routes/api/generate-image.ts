import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { generateImage, imageSettings } from "@/lib/image-gateway.server";

const bodySchema = z.object({
  prompt: z.string().trim().min(1).max(600),
  stream: z.boolean().optional(),
});

const STYLE =
  "Child-safe tactile matte 3D illustration, like a carefully crafted pop-up book brought to life. Soft sculpted forms, subtle paper and natural material textures, gentle diffuse lighting, clear subject detail and restrained blue, teal, pink and amber accents. Warm and curious without babyish proportions, oversized sparkling eyes, glossy plastic, puffy cloud scenery or preschool styling. Show the requested subject, not a mascot unless requested. Keep educational objects, anatomy and scientific relationships accurate; never replace factual diagrams with decorative fantasy. No text, no words, no scary or violent elements. Scene: ";

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

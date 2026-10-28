import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/* Permanently removes the signed-in parent's login after their family data is deleted. */
export const Route = createFileRoute("/api/delete-account")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!token || !url || !key) return new Response("Unauthorized", { status: 401 });
        const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data, error } = await client.auth.getUser(token);
        if (error || !data.user) return new Response("Unauthorized", { status: 401 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("devices").delete().eq("account_id", data.user.id);
        const del = await supabaseAdmin.auth.admin.deleteUser(data.user.id);
        if (del.error) return new Response("Delete failed", { status: 500 });
        return new Response(null, { status: 204 });
      },
    },
  },
});

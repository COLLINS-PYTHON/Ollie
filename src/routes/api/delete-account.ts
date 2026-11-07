import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { deleteStorageTree } from '@/lib/delete-storage';

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
        try {
          await deleteStorageTree(supabaseAdmin.storage.from('pictures'), data.user.id);
          for (const table of ['content_reports', 'children', 'devices'] as const) {
            const result = await supabaseAdmin.from(table).delete().eq('account_id', data.user.id);
            if (result.error) throw result.error;
          }
          const account = await supabaseAdmin.from('accounts').delete().eq('id', data.user.id);
          if (account.error) throw account.error;
        } catch { return new Response('Family data could not be fully deleted. Please retry.', { status: 500 }); }
        const del = await supabaseAdmin.auth.admin.deleteUser(data.user.id);
        if (del.error) return new Response("Delete failed", { status: 500 });
        return new Response(null, { status: 204 });
      },
    },
  },
});

import { createClient } from "@supabase/supabase-js";

/* Paid AI routes only serve signed-in families. Returns a 401 Response when the bearer is missing or invalid. */
export async function requireUser(request: Request): Promise<Response | null> {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return new Response("Unauthorized", { status: 401 });
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return new Response("Unauthorized", { status: 401 });
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return new Response("Unauthorized", { status: 401 });
  return null;
}

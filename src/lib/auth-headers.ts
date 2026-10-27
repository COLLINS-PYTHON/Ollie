import { supabase } from "@/integrations/supabase/client";

/* Adds the signed-in parent's token to raw requests for paid AI routes. */
export async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

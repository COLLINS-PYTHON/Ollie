import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { verifiedPremium } from './billing.server';
export async function requireLearningAccess(client: SupabaseClient<Database>, userId: string, key: string | undefined) {
  const { data, error } = await client.from('accounts').select('ai_consent').eq('id', userId).maybeSingle();
  if (error || !data?.ai_consent) throw new Error('A parent must approve AI processing before learning can begin.');
  if (!await verifiedPremium(userId, key)) throw new Error('An active Ollie subscription is required. Restore purchases or choose a plan.');
}
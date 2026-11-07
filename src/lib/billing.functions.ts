import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { verifiedPremium } from './billing.server';
export const billingConfig = createServerFn({ method: 'GET' }).handler(async () => ({ appleKey: process.env['REVENUECAT_APPLE_PUBLIC_KEY'] ?? '' }));
export const checkSubscription = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => ({ active: await verifiedPremium(context.userId, process.env['REVENUECAT_SECRET_KEY']) }));
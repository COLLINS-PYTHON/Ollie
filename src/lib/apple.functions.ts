import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
export const revokeNativeApple = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .inputValidator(input => z.object({ code: z.string().min(1).max(4096) }).parse(input))
 .handler(async ({ data, context }) => {
  const secret = process.env['APPLE_NATIVE_CLIENT_SECRET'];
  if (!secret) throw new Error('Apple authorization could not be disconnected. Please contact Ollie support.');
  const { data: user } = await context.supabase.auth.getUser();
  const appleIdentity = user.user?.identities?.find(identity => identity.provider === 'apple');
  if (!appleIdentity) throw new Error('No Apple authorization exists for this account.');
  const clientId = 'com.ollie.learning';
  const exchange = await fetch('https://appleid.apple.com/auth/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: clientId, client_secret: secret, code: data.code, grant_type: 'authorization_code' }) });
  if (!exchange.ok) throw new Error('Apple authorization could not be checked. Please retry.');
  const tokens = await exchange.json() as { refresh_token?: string; id_token?: string };
  const payload = tokens.id_token?.split('.')[1];
  if (!payload || !tokens.refresh_token) throw new Error('Apple authorization could not be checked.');
  const claims = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { sub?: string };
  if (claims.sub !== appleIdentity.id && claims.sub !== appleIdentity.identity_data?.['sub']) throw new Error('Use the Apple account linked to this Ollie account.');
  const revoke = await fetch('https://appleid.apple.com/auth/revoke', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: clientId, client_secret: secret, token: tokens.refresh_token, token_type_hint: 'refresh_token' }) });
  if (!revoke.ok) throw new Error('Apple authorization could not be disconnected. Please retry.');
  return { revoked: true };
 });
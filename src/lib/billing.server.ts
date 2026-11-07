import { activeEntitlement, ENTITLEMENT } from './purchase-rules';
export async function verifiedPremium(userId: string, key: string | undefined) {
  if (!key) throw new Error('Subscription verification is unavailable. Please try again later.');
  const response = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`, {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' }, signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('Your subscription could not be checked. Please retry.');
  const result = await response.json() as { subscriber?: { entitlements?: Record<string, { expires_date?: string | null; product_identifier?: string }> } };
  return activeEntitlement(result.subscriber?.entitlements?.[ENTITLEMENT]);
}
export const PRODUCT_IDS = { monthly: 'com.ollie.learning.monthly', yearly: 'com.ollie.learning.yearly' } as const;
export const ENTITLEMENT = 'premium';
export function activeEntitlement(entitlement: { expires_date?: string | null; product_identifier?: string } | undefined, now = Date.now()) {
  if (!entitlement || !Object.values(PRODUCT_IDS).some(id => id === entitlement.product_identifier)) return false;
  return typeof entitlement.expires_date === 'string' && Date.parse(entitlement.expires_date) > now;
}
import { useSyncExternalStore } from 'react';
import type { CustomerInfo, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { supabase } from '@/integrations/supabase/client';
import { billingConfig, checkSubscription } from './billing.functions';
import { ENTITLEMENT, PRODUCT_IDS } from './purchase-rules';
import { isNative } from './native';
let initialized: Promise<void> | null = null;
let identity: string | null = null;
let active = false;
const listeners = new Set<() => void>();
function update(info: CustomerInfo) { active = info.entitlements.active[ENTITLEMENT]?.isActive === true; listeners.forEach(fn => fn()); }
export function usePremium() { return useSyncExternalStore(fn => { listeners.add(fn); return () => { listeners.delete(fn); }; }, () => active, () => false); }
export async function purchaseSDK() {
  if (!isNative()) throw new Error('Subscriptions are purchased in the Ollie iPhone or iPad app.');
  const { Purchases } = await import('@revenuecat/purchases-capacitor');
  if (!initialized) initialized = (async () => {
    const { appleKey } = await billingConfig();
    if (!appleKey.startsWith('appl_')) throw new Error('Subscriptions are currently unavailable. Please try again later.');
    const { data: { session } } = await supabase.auth.getSession();
    identity = session?.user.id ?? null;
    await Purchases.configure({ apiKey: appleKey, ...(identity ? { appUserID: identity } : {}) });
    await Purchases.addCustomerInfoUpdateListener(update);
  })().catch(error => { initialized = null; throw error; });
  await initialized;
  const { data: { session } } = await supabase.auth.getSession();
  const nextIdentity = session?.user.id ?? null;
  if (nextIdentity && nextIdentity !== identity) { update((await Purchases.logIn({ appUserID: nextIdentity })).customerInfo); identity = nextIdentity; }
  if (!nextIdentity && identity) { update((await Purchases.logOut()).customerInfo); identity = null; }
  return Purchases;
}
export async function loadPlans() {
  const sdk = await purchaseSDK();
  const { offerings } = await sdk.getOfferings();
  return Object.fromEntries(Object.entries(PRODUCT_IDS).map(([plan, id]) => [plan, offerings.current?.availablePackages.find(p => p.product.identifier === id)])) as Record<'monthly' | 'yearly', PurchasesPackage | undefined>;
}
export async function refreshPurchases() { const sdk = await purchaseSDK(); update((await sdk.getCustomerInfo()).customerInfo); return (await checkSubscription()).active; }
export async function purchasePlan(aPackage: PurchasesPackage) {
  const sdk = await purchaseSDK();
  update((await sdk.purchasePackage({ aPackage })).customerInfo);
  if (!active) throw new Error('Your purchase is pending. Access starts when Apple approves it.');
}
export async function restorePurchases() { const sdk = await purchaseSDK(); update((await sdk.restorePurchases()).customerInfo); return active; }
export function purchaseError(error: unknown) { return (error as { userCancelled?: boolean })?.userCancelled ? 'Purchase canceled. Nothing was changed.' : error instanceof Error ? error.message : 'The purchase could not be completed. Please retry.'; }
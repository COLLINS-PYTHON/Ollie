import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { Check, ChevronLeft, LockKeyholeOpen } from 'lucide-react';
import { onboardingState } from '@/lib/onboarding-store';
import { pageMeta } from '@/lib/meta';
import { Button } from '@/components/ui/button';
import { familyKids } from '@/lib/family-store';
import { detectCountry, formatPrice, regionPrice, yearlyMonthlyEquivalent, yearlySavingPercent, type RegionPrice } from '@/lib/subscription-prices';
import { isNative } from '@/lib/native';
import { loadPlans, purchaseSDK, purchasePlan, restorePurchases, purchaseError } from '@/lib/purchases';
export const Route = createFileRoute('/onboarding/plans')({ head: () => pageMeta('Choose your family plan', 'Compare Ollie monthly and yearly subscriptions and renewal terms.'), component: Plans });
function Plans() {
 const navigate = useNavigate(); const router = useRouter();
 const names = familyKids().map(k => String(k.profile['name'] ?? '').trim()).filter(Boolean);
 const name = names.length ? names.join(' and ') : onboardingState.name.trim() || 'your child';
 const [rp, setRp] = useState<RegionPrice>(regionPrice('US'));
 const [native, setNative] = useState(false);
 const [packages, setPackages] = useState<Partial<Record<'monthly' | 'yearly', PurchasesPackage>>>({});
 const [eligible, setEligible] = useState<Record<string, boolean>>({});
 const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly');
 const [busy, setBusy] = useState(false); const [notice, setNotice] = useState('');
 useEffect(() => {
  const nativeApp = isNative(); setNative(nativeApp);
  const r = new URLSearchParams(window.location.search).get('region'); if (r) setRp(regionPrice(r === 'auto' ? detectCountry() : r));
  if (!nativeApp) return;
  void loadPlans().then(async plans => {
   setPackages(plans);
   const sdk = await purchaseSDK();
   const ids = Object.values(plans).flatMap(p => p ? [p.product.identifier] : []);
   const result = await sdk.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers: ids });
   setEligible(Object.fromEntries(Object.entries(plans).map(([key, p]) => [key, !!p && result[p.product.identifier]?.status === 2 && p.product.introPrice?.price === 0 && p.product.introPrice.periodNumberOfUnits === 7 && p.product.introPrice.periodUnit === 'DAY'])));
  }).catch(error => setNotice(purchaseError(error)));
 }, []);
 const fmt = (n: number) => formatPrice(n, rp.currency);
 const chosen = packages[plan];
 const trial = native ? eligible[plan] === true : true;
 const price = (p: 'monthly' | 'yearly') => native ? packages[p]?.product.priceString ?? 'Loading…' : fmt(rp[p]);
 const actual = packages.yearly && packages.monthly ? { ...rp, yearly: packages.yearly.product.price, monthly: packages.monthly.product.price, currency: packages.yearly.product.currencyCode } : rp;
 const action = trial ? `Unlock ${name}’s safe trial` : `Continue with ${plan}`;
 async function buy() {
  onboardingState.plan = plan;
  if (!native) { await navigate({ to: '/onboarding/account' }); return; }
  if (!chosen) { setNotice('Subscriptions are currently unavailable. Please retry later.'); return; }
  setBusy(true); setNotice('');
  try { await purchasePlan(chosen); await navigate({ to: '/onboarding/account' }); }
  catch (error) { setNotice(purchaseError(error)); } finally { setBusy(false); }
 }
 return <main className="trial-plans-page">
  <Button variant="control" size="icon" aria-label="Back to trial introduction" onClick={() => router.history.back()}><ChevronLeft /></Button>
  <div className="trial-plans-body screen-enter">
   <h1 className="pw-title text-center">{trial ? `Unlock ${name}’s safe trial` : 'Choose your Ollie plan'}</h1>
   <p className="text-support mt-2 text-center text-muted-foreground">{trial ? '7 days free for eligible new subscribers, then your plan.' : 'Apple confirms your price before you subscribe.'}</p>
   <div role="radiogroup" aria-label="Choose a plan" className="trial-plan-grid">
    {(['yearly', 'monthly'] as const).map(p => <Button key={p} variant="ghost" role="radio" aria-checked={plan === p} onClick={() => { setPlan(p); onboardingState.plan = p; }} className="trial-plan-card">
     <span className="text-button capitalize">{p}</span><span className="pw-radio" aria-hidden="true">{plan === p && <Check />}</span>
     <span className="trial-plan-price">{price(p)}</span><span className="text-support text-muted-foreground">per {p === 'yearly' ? 'year' : 'month'}</span>
     {p === 'yearly' && (!native || packages.yearly && packages.monthly) ? <><span className="trial-plan-equivalent">≈ {formatPrice(yearlyMonthlyEquivalent(actual), actual.currency)}/month</span><span className="pw-chip">Save {yearlySavingPercent(actual)}%</span></> : <span className="trial-plan-equivalent">{eligible[p] ? '7 days free, then billed monthly' : 'Billed monthly'}</span>}
    </Button>)}
   </div>
   {trial && <ol className="pw-timeline mt-7" aria-label="How your trial works">{[{ icon: LockKeyholeOpen, when: 'Today', what: 'Full trial access' }, { icon: Check, when: 'Day 7', what: 'First charge' }].map(({ icon: Icon, when, what }) => <li key={when}><span className="pw-dot"><Icon /></span><b>{when}</b><span>{what}</span></li>)}</ol>}
   <ul className="trial-feature-list mt-6 space-y-3">{['Age-tailored answers, with voice and typing', 'Daily topic lessons, quick quizzes and Trail replay', 'Creative picture-making and a saved picture fridge', 'Natural read-aloud at a comfortable pace', 'Parent PIN, screen-time controls and sensitive-search context', 'One plan covers two separate learning spaces'].map(line => <li key={line} className="flex items-start gap-3 text-support"><span className="pw-tick"><Check /></span><span>{line}</span></li>)}</ul>
  </div>
  <footer className="pw-footer">
   {notice && <p role="status" className="mb-3 text-support text-muted-foreground">{notice}</p>}
   <Button variant="onboarding" size="onboarding" disabled={busy || native && !chosen} onClick={() => void buy()}>{busy ? 'Waiting for Apple…' : native ? action : 'Continue setup'}</Button>
   <p className="pw-fine mt-2 text-center text-muted-foreground">{trial ? 'Free for 7 days for eligible new subscribers, then ' : ''}{price(plan)} per {plan === 'yearly' ? 'year' : 'month'}. Renews automatically until canceled. Cancel in Apple subscription settings at least 24 hours before renewal. {native ? 'Apple confirms trial eligibility and price.' : 'Apple subscriptions are purchased in the iPhone or iPad app. Continuing setup does not start a subscription.'}</p>
   <div className="pw-fine flex flex-wrap items-center justify-center gap-3 text-muted-foreground">
    <Button variant="link" disabled={busy} className="pw-fine h-8 px-0 text-muted-foreground" onClick={async () => { setBusy(true); try { const restored = await restorePurchases(); setNotice(restored ? 'Purchases restored.' : 'No active subscription was found.'); if (restored) await navigate({ to: '/onboarding/account' }); } catch (error) { setNotice(purchaseError(error)); } finally { setBusy(false); } }}>Restore Purchases</Button>
    <a href="/terms" className="underline">Terms</a><a href="/privacy" className="underline">Privacy</a>
   </div>
  </footer>
 </main>;
}

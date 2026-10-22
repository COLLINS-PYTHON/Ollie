import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { Bell, Check, ChevronLeft, LockKeyholeOpen } from 'lucide-react';
import { onboardingState } from '@/lib/onboarding-store';
import { pageMeta } from '@/lib/meta';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { familyKids } from '@/lib/family-store';
import { SUBSCRIPTION_PRICES, yearlyMonthlyEquivalent } from '@/lib/subscription-prices';
export const Route=createFileRoute('/onboarding/plans')({head:()=>pageMeta('Choose your family plan','Compare Ollie yearly and monthly plans, trial checkpoints and renewal terms.'),component:Plans});
const PRICES={monthly:`$${SUBSCRIPTION_PRICES.monthly.toFixed(2)} per month`,yearly:`$${SUBSCRIPTION_PRICES.yearly.toFixed(2)} per year`};
function Plans(){
 const navigate=useNavigate(); const router=useRouter();
 const names=familyKids().map(k=>String(k.profile['name']??'').trim()).filter(Boolean);
 const name=names.length?names.join(' and '):onboardingState.name.trim()||'your child';
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [askReminder, setAskReminder] = useState(false);
  const [permissionNote, setPermissionNote] = useState('');
  function dismissReminder() { setAskReminder(false); void navigate({ to: '/onboarding/account' }); }
  async function allowReminder() {
    if (window.top !== window.self) { setPermissionNote('Open Ollie in its own tab to allow notifications. You can continue without them.'); return; }
    if (!('Notification' in window)) { setPermissionNote('Notifications are not available in this browser. On iPhone, add Ollie to your Home Screen first.'); return; }
    try {
      const permission = await Notification.requestPermission();
      localStorage.setItem('ollie-trial-reminder-permission', permission);
      setPermissionNote(permission === 'granted' ? 'Permission allowed. Trial reminders will be available once notification delivery is connected.' : 'No problem. You can continue without a reminder.');
    } catch { setPermissionNote('Notifications could not be enabled here. You can continue without them.'); }
  }
  const valueLines = [`Every answer matched to ${name}'s age`, "Sensitive searches flagged for you, not hidden", "Full visibility, always", "One plan covers up to two kids"];


 return <><main className="trial-plans-page">
 <Button variant="control" size="icon" aria-label="Back to trial introduction" onClick={()=>router.history.back()}><ChevronLeft /></Button>
 <div className="trial-plans-body screen-enter">
 <h1 className="pw-title text-center">Start {name}'s safe trial</h1>
 <p className="text-support mt-2 text-center text-muted-foreground">7 days free, then your plan. Cancel anytime before.</p>
 <div role="radiogroup" aria-label="Choose a plan" className="trial-plan-grid">
 {(['yearly','monthly'] as const).map(p=><Button key={p} variant="ghost" role="radio" aria-checked={plan===p} onClick={()=>{setPlan(p);onboardingState.plan=p;}} className="trial-plan-card">
 <span className="text-button capitalize">{p}</span><span className="pw-radio" aria-hidden="true">{plan===p&&<Check />}</span>
 <span className="trial-plan-price">${SUBSCRIPTION_PRICES[p].toFixed(2)}</span>
 <span className="text-support text-muted-foreground">per {p==='yearly'?'year':'month'}</span>
 {p==='yearly'?<><span className="trial-plan-equivalent">≈ ${yearlyMonthlyEquivalent()}/month</span><span className="pw-chip">Save 40%</span></>:<span className="trial-plan-equivalent">Billed monthly after trial</span>}
 </Button>)}
 </div>
 <ol className="pw-timeline mt-7" aria-label="How your trial works">
 {[{icon:LockKeyholeOpen,when:'Today',what:'Full access, $0'},{icon:Bell,when:'Day 5',what:`Reminder + ${name}'s report`},{icon:Check,when:'Day 7',what:'Plan begins'}].map(({icon:Icon,when,what})=><li key={when}><span className="pw-dot"><Icon /></span><b>{when}</b><span>{what}</span></li>)}
 </ol>
 <ul className="mt-7 space-y-3">{valueLines.map(l=><li key={l} className="flex items-start gap-3 text-support"><span className="pw-tick"><Check /></span><span>{l}</span></li>)}</ul>
 </div>
 <footer className="pw-footer">
 <Button variant="onboarding" size="onboarding" onClick={()=>{onboardingState.plan=plan;setAskReminder(true);}}>Start {name}'s Safe Trial</Button>
 <p className="pw-fine mt-2 text-center text-muted-foreground">Free for 7 days, then {PRICES[plan]}. Renews automatically until canceled. Cancel anytime in Settings at least 24 hours before the trial ends. Billing is not connected yet in this preview.</p>
 <div className="pw-fine flex items-center justify-center gap-3 text-muted-foreground"><Button variant="link" className="pw-fine h-8 px-0 text-muted-foreground" disabled>Restore Purchases</Button><a href="/terms" className="underline">Terms</a><a href="/privacy" className="underline">Privacy</a></div>
 </footer></main>
    <Drawer open={askReminder} onOpenChange={(open) => { if (!open) dismissReminder(); }} shouldScaleBackground={false}>
      <DrawerContent className="onboarding-theme trial-reminder-sheet mx-auto max-w-md px-6 pb-6">
        <Bell className="mx-auto mb-4 size-8 text-primary" />
        <DrawerTitle className="text-title text-center">Should we remind you before your trial ends?</DrawerTitle>
        <DrawerDescription className="text-support mt-3 text-center">On day 5 we'll remind you before your trial ends and share {name}'s learning report so far. Reminder delivery is not available yet.</DrawerDescription>
        {permissionNote && <p role="status" className="text-support mt-4 text-center text-muted-foreground">{permissionNote}</p>}
        <Button variant="onboarding" className="mt-6 h-14 rounded-pill" onClick={() => permissionNote ? dismissReminder() : void allowReminder()}>{permissionNote ? 'Continue' : 'Allow notifications'}</Button>
        {!permissionNote && <Button variant="ghost" className="mt-2 h-12 rounded-pill" onClick={dismissReminder}>Not now</Button>}
      </DrawerContent>
    </Drawer>
</>;
}

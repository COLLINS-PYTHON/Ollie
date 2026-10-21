import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Check, ChevronLeft, LockKeyholeOpen, X } from "lucide-react";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";
import { PaywallDiscoveryVideo as OllieChase } from "@/components/ollie/PaywallDiscoveryVideo";
import { familyKids } from "@/lib/family-store";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { SUBSCRIPTION_PRICES, yearlyMonthlyEquivalent } from "@/lib/subscription-prices";

export const Route = createFileRoute("/onboarding/paywall")({
  head: () => pageMeta("We want you and your child to try Ollie for free", "Explore safe answers, daily lessons and creativity with Ollie's 7-day trial."),
  component: PaywallPage,
});

/* Owner-approved subscription prices. */
const PRICES = { monthly: `$${SUBSCRIPTION_PRICES.monthly.toFixed(2)} / month`, yearly: `$${SUBSCRIPTION_PRICES.yearly.toFixed(2)} / year` };

function PaywallPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const kidNames = familyKids().map(k => String(k.profile["name"] ?? "").trim()).filter(Boolean);
  const name = kidNames.length ? kidNames.join(" and ") : "your child";
  const savings = Math.round((1 - SUBSCRIPTION_PRICES.yearly / (SUBSCRIPTION_PRICES.monthly * 12)) * 100);
  const [sheet, setSheet] = useState(false);
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
  const valueLines = [`Every answer matched to ${name}'s age`, "Sensitive searches flagged for you, not hidden", "Full visibility, always"];

  return (
    <>
    <Drawer open={sheet} onOpenChange={setSheet} shouldScaleBackground={false} autoFocus>
    <div className="relative min-h-screen bg-background">
      <div className={`paywall-underlay mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-32 pt-4 ${sheet ? "is-presented" : ""}`}>
        <Button variant="control" size="icon" type="button" aria-label="Back" onClick={() => router.history.back()} className="flex size-10 items-center justify-center rounded-pill bg-card shadow-card">
          <ChevronLeft className="size-5" />
        </Button>
        <OllieChase />
        <h1 className="text-title mt-8 text-center text-foreground">We want you and {name} to try Ollie for free</h1>
        <p className="text-support mt-3 text-center text-muted-foreground">Made just for {name}.</p>
        <div className="payment-assurance relative mx-auto mt-5 flex items-center gap-2 rounded-pill bg-card px-5 py-3 shadow-card">
          <Check className="relative size-5 text-success" strokeWidth={2.2} />
          <span className="text-button relative text-foreground">No Payment Due Now</span>
        </div>
        <p className="text-support mt-5 text-center text-muted-foreground">Enjoy complete access to interactive tutoring, daily learning trails, and daily creative picture cookies.</p>
        <p className="text-support mt-4 flex items-center justify-center gap-2 text-muted-foreground"><Bell className="size-4 shrink-0" />We’ll notify you before the trial ends</p>
        <p className="text-label mt-1 text-center text-muted-foreground">Once trial reminders are enabled.</p>
      </div>
        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          <DrawerTrigger asChild><Button variant="onboarding" size="onboarding" type="button" className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card active:scale-[0.98]">
            Unlock {name}'s safe trial
          </Button></DrawerTrigger>
        </div>

      <DrawerContent aria-modal="true" className="onboarding-theme pw-sheet mx-auto w-full max-w-md overflow-hidden border-0" overlayClassName="apple-paywall-overlay">
        <div className="flex shrink-0 justify-end px-5 pt-1"><Button variant="control" size="icon" aria-label="Close plan picker" onClick={() => setSheet(false)} className="pw-close size-8 rounded-pill"><X className="size-4" /></Button></div>
        <div className="pw-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
          <DrawerTitle className="pw-title text-center text-foreground">Start {name}'s safe trial</DrawerTitle>
          <DrawerDescription className="text-support mt-2 text-center text-muted-foreground">7 days free, then your plan. Cancel anytime before.</DrawerDescription>
          <div role="radiogroup" aria-label="Choose a plan" className="mt-6 space-y-3">
            {(["yearly", "monthly"] as const).map((p) => {
              const on = plan === p;
              return (
                <button key={p} type="button" role="radio" aria-checked={on} onClick={() => { setPlan(p); onboardingState.plan = p; }} className={`pw-plan ${on ? "is-on" : ""}`}>
                  <span className="pw-radio" aria-hidden>{on && <Check className="size-3.5" strokeWidth={3} />}</span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="flex items-center gap-2"><span className="text-button capitalize">{p}</span>{p === "yearly" && <span className="pw-chip">Save {savings}%</span>}</span>
                    <span className="pw-plan-sub">{p === "yearly" ? "Billed yearly after trial" : "Billed monthly after trial"}</span>
                  </span>
                  <span className="text-right">
                    <span className="text-button block">{p === "yearly" ? `$${SUBSCRIPTION_PRICES.yearly.toFixed(2)}` : `$${SUBSCRIPTION_PRICES.monthly.toFixed(2)}`}</span>
                    <span className="pw-plan-sub">{p === "yearly" ? `per year (≈ $${yearlyMonthlyEquivalent()}/mo)` : "per month"}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <ol className="pw-timeline mt-7" aria-label="How your trial works">
            {[
              { icon: LockKeyholeOpen, when: "Today", what: "Full access, $0" },
              { icon: Bell, when: "Day 5", what: `Reminder + ${name}'s report` },
              { icon: Check, when: "Day 7", what: "Plan begins" },
            ].map(({ icon: Icon, when, what }) => (
              <li key={when}><span className="pw-dot"><Icon className="size-4" strokeWidth={2.2} /></span><b>{when}</b><span>{what}</span></li>
            ))}
          </ol>
          <ul className="mt-7 space-y-3 pb-5">
            {valueLines.map((l) => <li key={l} className="flex items-start gap-3 text-support font-medium text-foreground"><span className="pw-tick"><Check className="size-3.5" strokeWidth={3} /></span><span className="min-w-0 pt-0.5">{l}</span></li>)}
          </ul>
        </div>
        <div className="pw-footer shrink-0 px-6 pt-3">
          <Button variant="onboarding" size="onboarding" type="button" onClick={() => { onboardingState.plan = plan; setSheet(false); setAskReminder(true); }} className="w-full">
            Start {name}'s Safe Trial
          </Button>
          <p className="pw-fine mt-2 text-center text-muted-foreground">Free for 7 days, then {PRICES[plan].replace(" / ", " per ")}. Renews automatically until canceled. Cancel anytime in Settings at least 24 hours before the trial ends. Billing is not connected yet in this preview.</p>
          <div className="pw-fine flex items-center justify-center gap-3 text-muted-foreground"><Button variant="link" type="button" className="pw-fine h-8 px-0 text-muted-foreground">Restore Purchases</Button><a href="/terms" className="underline">Terms</a><a href="/privacy" className="underline">Privacy</a></div>
        </div>
      </DrawerContent>
    </div>
    </Drawer>
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
    </>
  );
}

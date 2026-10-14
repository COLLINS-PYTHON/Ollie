import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Check, ChevronLeft, X } from "lucide-react";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";
import { OllieChase } from "@/components/ollie/OllieChase";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { SUBSCRIPTION_PRICES, yearlyMonthlyEquivalent } from "@/lib/subscription-prices";

export const Route = createFileRoute("/onboarding/paywall")({
  head: () => pageMeta("We want you to try Ollie for free", "Explore safe answers, daily lessons and creativity with Ollie's 7-day trial."),
  component: PaywallPage,
});

/* Owner-approved subscription prices. */
const PRICES = { monthly: `$${SUBSCRIPTION_PRICES.monthly.toFixed(2)} / month`, yearly: `$${SUBSCRIPTION_PRICES.yearly.toFixed(2)} / year` };
const FEATURES = ["Customizable reply tone", "Safe search", "Daily educational slideshows", "Age-appropriate content", "Age-appropriate image generation", "Full parent dashboard", "Weekly progress reports"];

function PaywallPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const name = childName(onboardingState.name);
  const [sheet, setSheet] = useState(false);
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const valueLines = [`Every answer matched to ${name}'s age`, "Every unsafe search caught, not hidden", "Full visibility, always"];

  return (
    <Drawer open={sheet} onOpenChange={setSheet} shouldScaleBackground={false} autoFocus>
    <div className="relative min-h-screen bg-background">
      <div className={`paywall-underlay mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-32 pt-4 ${sheet ? "is-presented" : ""}`}>
        <Button variant="control" size="icon" type="button" aria-label="Back" onClick={() => router.history.back()} className="flex size-10 items-center justify-center rounded-pill bg-card shadow-card">
          <ChevronLeft className="size-5" />
        </Button>
        <OllieChase />
        <h1 className="text-title mt-8 text-center text-foreground">We want you to try Ollie for free</h1>
        <p className="text-support mt-3 text-center text-muted-foreground">Made just for {name}.</p>
        <div className="payment-assurance relative mx-auto mt-5 flex items-center gap-2 rounded-pill bg-card px-5 py-3 shadow-card">
          <Check className="relative size-5 text-success" strokeWidth={2.2} />
          <span className="text-button relative text-foreground">No Payment Due Now</span>
        </div>
        <p className="text-support mt-5 text-center text-muted-foreground">Enjoy complete access to interactive tutoring, daily learning trails, and daily creative picture cookies.</p>
        <p className="text-support mt-4 flex items-center justify-center gap-2 text-muted-foreground"><Bell className="size-4 shrink-0" />A reminder before your trial ends</p>
      </div>
        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          <DrawerTrigger asChild><Button variant="onboarding" size="onboarding" type="button" className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card active:scale-[0.98]">
            Try Now
          </Button></DrawerTrigger>
        </div>

      <DrawerContent aria-modal="true" className="onboarding-theme apple-paywall-sheet mx-auto max-h-[94svh] min-h-0 w-full max-w-md overflow-hidden border-0 shadow-sheet" overlayClassName="apple-paywall-overlay">
            <div className="flex shrink-0 items-center justify-between px-6 pb-3"><DrawerTitle className="text-body font-bold text-foreground">Start {name}'s safe trial</DrawerTitle><Button variant="control" size="icon" aria-label="Close plan picker" onClick={() => setSheet(false)} className="size-8 rounded-pill bg-secondary"><X className="size-4" /></Button></div>
            <DrawerDescription className="sr-only">Choose monthly or yearly billing for your seven-day trial.</DrawerDescription>
            <div className="paywall-price-anchor shrink-0 px-6 pb-4">
               <div className="grid grid-cols-2 gap-3 pt-3">
                 {(["yearly", "monthly"] as const).map((p) => (
                   <Button key={p} type="button" aria-pressed={plan === p} onClick={() => { setPlan(p); onboardingState.plan = p; }}
                     variant="option" className={`plan-option relative flex flex-col items-start gap-1 rounded-control p-4 text-left ${p === "yearly" && plan === p ? "plan-outline-pulse" : ""}`}>
                     {p === "yearly" && <span className="text-label absolute -top-2.5 right-3 rounded-pill bg-gold px-2 py-0.5 text-foreground">Save 40%</span>}
                     <span className="text-button block capitalize">{p}</span>
                     <span className="text-support">{PRICES[p]}</span>
                     {p === "yearly" && <span className="text-label">${yearlyMonthlyEquivalent()} / month equivalent</span>}
                   </Button>
                 ))}
               </div>
             </div>
             <div className="paywall-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-4">
               <div className="trial-timeline grid grid-cols-3 gap-2 py-3 text-center">
                 <div><p className="text-label text-foreground">Today</p><p className="text-support text-muted-foreground">Trial starts</p></div>
                 <div><Bell className="mx-auto mb-1 size-4 text-primary" /><p className="text-label text-foreground">Before it ends</p><p className="text-support text-muted-foreground">Trial reminder</p></div>
                 <div><p className="text-label text-foreground">Day 7</p><p className="text-support text-muted-foreground">Billing starts</p></div>
               </div>
               <p className="text-label mt-1 text-center text-muted-foreground">Reminder delivery and billing are not active yet.</p>
               <ul className="mt-4 space-y-2">
                 {valueLines.map((l) => <li key={l} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2.5 text-body font-medium text-foreground"><Check className="mt-1 size-4 shrink-0 text-success" /><span className="min-w-0">{l}</span></li>)}
               </ul>
               <ul className="mt-4 grid grid-cols-1 gap-1.5">
                 {FEATURES.map((f) => <li key={f} className="text-support grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-foreground"><Check className="size-4 shrink-0 text-success" /><span className="min-w-0">{f}</span></li>)}
               </ul>
             </div>
             <div className="paywall-sheet-footer shrink-0 border-t border-border px-6 pt-3">
                <Button variant="onboarding" size="onboarding" type="button" onClick={() => { onboardingState.plan = plan; setSheet(false); void navigate({ to: "/onboarding/account" }); }} className="trial-emphasis text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card active:scale-[0.98]">
                  Start {name}'s Safe Trial
                </Button>
                <p className="text-support mt-3 text-center text-muted-foreground">No charge today. Selected plan: {PRICES[plan]}.</p>
                <Button variant="link" type="button" className="text-label mt-2 w-full text-center text-muted-foreground underline">Restore Purchases</Button>
            </div>
      </DrawerContent>
    </div>
    </Drawer>
  );
}

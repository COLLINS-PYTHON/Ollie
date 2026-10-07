import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { onboardingState } from "@/lib/onboarding-store";
import { INTERESTS } from "@/lib/interests";
import { childName, pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";
import { LessonArt } from "@/components/ollie/LessonArt";

export const Route = createFileRoute("/onboarding/paywall")({
  head: () => pageMeta("Try Ollie free for 7 days", "Start a free 7-day trial. No payment due now."),
  component: PaywallPage,
});

/* Owner-approved subscription prices. */
const PRICES = { monthly: "$11.99 / month", yearly: "$99.99 / year" };
const FEATURES = ["Safe search", "Daily educational slideshows", "Age-appropriate content", "Age-appropriate image generation", "Full parent dashboard", "Weekly progress reports"];

function PaywallPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const name = childName(onboardingState.name);
  const [sheet, setSheet] = useState(false);
  const [slide, setSlide] = useState(0);
  const [plan, setPlan] = useState(onboardingState.plan);
  const [values, setValues] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!sheet) return setValues(0);
    const t = [150, 300, 450, 600].map((ms, i) => setTimeout(() => setValues(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, [sheet]);

  const themes = INTERESTS.slice(0, 4);
  const valueLines = [`Every answer matched to ${name}'s age`, "Every unsafe search caught, not hidden", "Full visibility, always"];

  return (
    <div className="relative min-h-screen bg-background">
      <div className={`mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-32 pt-4 transition-all duration-element ${sheet ? "scale-[0.98] blur-[2px]" : ""}`}>
        <Button type="button" aria-label="Back" onClick={() => router.history.back()} className="flex size-10 items-center justify-center rounded-pill bg-card shadow-card">
          <ChevronLeft className="size-5" />
        </Button>
        <div className="relative mt-8 aspect-[4/3] overflow-hidden">
          {themes.map((t, i) => {
            return (
              <div key={t.id} className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-reveal ${i === slide ? "opacity-100" : "opacity-0"}`}>
                <LessonArt categoryId={t.id} title={t.label} className="w-full max-w-xs" />
                <span className="text-support text-muted-foreground">{t.label}</span>
              </div>
            );
          })}
        </div>
        <h1 className="text-title mt-8 text-center text-foreground">Try Ollie free for 7 days</h1>
        <div className="relative mx-auto mt-5 flex items-center gap-2 rounded-pill bg-card px-5 py-3 shadow-card">
          <span className="ring-pulse absolute inset-0 rounded-pill bg-primary/20" aria-hidden />
          <Check className="relative size-5 text-primary" />
          <span className="text-button relative text-foreground">No Payment Due Now</span>
        </div>
        <p className="text-support mt-5 text-center text-muted-foreground">You'll be able to see {name}'s weekly report during your trial.</p>
      </div>
      {!sheet && (
        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
          <Button variant="onboarding" size="onboarding" type="button" onClick={() => setSheet(true)} className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card active:scale-[0.98]">
            Try Now
          </Button>
        </div>
      )}

      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-label="Choose a plan">
          <Button type="button" aria-label="Close" variant="ghost" className="paywall-backdrop absolute inset-0 h-full w-full rounded-none" onClick={() => setSheet(false)} />
          <div className="paywall-sheet sheet-up relative max-h-[92svh] w-full max-w-md overflow-y-auto rounded-t-card px-6 pb-6 pt-4 shadow-sheet" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
            <div className="mx-auto mb-3 h-1 w-9 rounded-pill bg-border" />
            <div className="mb-4 flex items-center justify-between"><h2 className="text-body font-bold text-foreground">Start {name}'s safe trial</h2><Button variant="ghost" size="icon" aria-label="Close plan picker" onClick={() => setSheet(false)}><X /></Button></div>
            <div className="flex items-center justify-between rounded-control bg-card p-3">
              <div><p className="text-label text-foreground">Today</p><p className="text-support text-muted-foreground">Free access starts</p></div>
              <div className="mx-3 h-0.5 flex-1 bg-primary/30" />
              <div className="text-right"><p className="text-label text-foreground">Day 7</p><p className="text-support text-muted-foreground">Billing starts</p></div>
            </div>
            <ul className="mt-4 min-h-[84px] space-y-2">
              {valueLines.map((l, i) => values > i && <li key={l} className="bubble-in text-body font-medium text-foreground">{l}</li>)}
            </ul>
            {values >= 4 && (
              <div className="bubble-in">
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["monthly", "yearly"] as const).map((p) => (
                    <Button key={p} type="button" aria-pressed={plan === p} onClick={() => { setPlan(p); onboardingState.plan = p; }}
                      variant="option" className={`plan-option relative flex flex-col items-start gap-1 rounded-control bg-card p-4 text-left ${plan === p ? "ring-2 ring-primary" : ""}`}>
                      {p === "yearly" && <span className="text-label absolute -top-2.5 right-3 rounded-pill bg-primary px-2 py-0.5 text-primary-foreground">30% off</span>}
                      <span className="text-button block capitalize text-foreground">{p}</span>
                      <span className="text-support text-muted-foreground">{PRICES[p]}</span>
                    </Button>
                  ))}
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-1.5">
                  {FEATURES.map((f) => (
                    <li key={f} className="text-support flex items-center gap-2 text-foreground"><Check className="size-4 text-primary" />{f}</li>
                  ))}
                </ul>
                <Button variant="onboarding" size="onboarding" type="button" onClick={() => navigate({ to: "/onboarding/account" })} className="text-button mt-5 h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card active:scale-[0.98]">
                  Start {name}'s Safe Trial
                </Button>
                <p className="text-support mt-3 text-center text-muted-foreground">Payment is handled securely by Apple/Google. Ollie never sees or stores your card details.</p>
                <Button variant="link" type="button" className="text-label mt-2 w-full text-center text-muted-foreground underline">Restore Purchases</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

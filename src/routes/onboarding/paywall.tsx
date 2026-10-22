import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Bell, Check, ChevronLeft } from "lucide-react";
import { onboardingState } from "@/lib/onboarding-store";
import { pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";
import { PaywallDiscoveryVideo as OllieChase } from "@/components/ollie/PaywallDiscoveryVideo";
import { familyKids } from "@/lib/family-store";
export const Route = createFileRoute("/onboarding/paywall")({
 head: () => pageMeta("We want you and your child to try Ollie for free", "Explore safe answers, daily lessons and creativity with Ollie's 7-day trial."), component: PaywallPage,
});
function PaywallPage() {
 const navigate=useNavigate(); const router=useRouter();
 const kidNames=familyKids().map(k=>String(k.profile['name']??'').trim()).filter(Boolean);
 const name=kidNames.length?kidNames.join(' and '):onboardingState.name.trim()||'your child';
 return <div className="relative min-h-screen bg-background">
 <div className="paywall-underlay mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-32 pt-4">
 <Button variant="control" size="icon" aria-label="Back" onClick={()=>router.history.back()}><ChevronLeft /></Button>
        <OllieChase />
        <h1 className="text-title mt-8 text-center text-foreground">We want you and {name} to try Ollie for free</h1>
        <p className="text-support mt-3 text-center text-muted-foreground">Made just for {name}.</p>
        <div className="payment-assurance relative mx-auto mt-5 flex items-center gap-2 rounded-pill bg-card px-5 py-3 shadow-card">
          <Check className="relative size-5 text-success" strokeWidth={2.2} />
          <span className="text-button relative text-foreground">No Payment Due Now</span>
  
 </div><div className="onboarding-action onboarding-cta-fade fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5 pt-5 pb-5">
 <Button variant="onboarding" size="onboarding" onClick={()=>navigate({to:'/onboarding/plans'})}>Unlock {name}'s safe trial</Button>
 </div></div>;
}

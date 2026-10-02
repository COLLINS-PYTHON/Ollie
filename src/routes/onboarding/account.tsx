import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState } from "@/lib/onboarding-store";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/account")({
  head: () => pageMeta("Create your account", "Create your parent account to finish setting up Ollie."),
  component: AccountPage,
});

const field = "text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none focus:border-primary";

function AccountPage() {
  const navigate = useNavigate();
  const [parentName, setParentName] = useState(onboardingState.parentName);
  const [email, setEmail] = useState(onboardingState.email);
  const [password, setPassword] = useState("");
  const ok = parentName.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 8;

  function finish() {
    onboardingState.parentName = parentName.trim();
    onboardingState.email = email.trim();
    navigate({ to: "/onboarding/building" });
  }

  return (
    <div className="bg-gradient-name min-h-screen">
      <OnboardingSkeleton chapter={4} title="Create your account" cta="Create account" ctaDisabled={!ok} onContinue={finish}>
        <div className="flex flex-col gap-3">
          <input className={field} value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Your first name" aria-label="Your first name" />
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" />
          <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8 or more characters)" aria-label="Password" />
        </div>
        <div className="my-5 flex items-center gap-3 text-muted-foreground"><span className="h-px flex-1 bg-border" /><span className="text-support">or</span><span className="h-px flex-1 bg-border" /></div>
        <div className="flex flex-col gap-3">
          <button type="button" onClick={() => navigate({ to: "/onboarding/building" })} className="text-button h-14 rounded-pill bg-foreground text-background shadow-card">Continue with Apple</button>
          <button type="button" onClick={() => navigate({ to: "/onboarding/building" })} className="text-button h-14 rounded-pill bg-card text-foreground shadow-card">Continue with Google</button>
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

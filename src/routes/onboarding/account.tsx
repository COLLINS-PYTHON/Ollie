import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OnboardingSkeleton } from "../onboarding";
import { loadProfile, onboardingState, saveProfile } from "@/lib/onboarding-store";
import { pushAll } from "@/lib/cloud-sync";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const ok = parentName.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 8;

  // Back from a Google/Apple redirect: setup answers were saved before leaving.
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      if (!onboardingState.name) loadProfile();
      await pushAll();
      navigate({ to: "/onboarding/building" });
    });
  }, [navigate]);

  async function finish() {
    if (sent) return navigate({ to: "/onboarding/building" });
    setBusy(true);
    setError("");
    onboardingState.parentName = parentName.trim();
    onboardingState.email = email.trim();
    saveProfile();
    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/search`, data: { full_name: parentName.trim() } },
    });
    setBusy(false);
    if (err) return setError(err.message);
    if (data.session) {
      await pushAll();
      return navigate({ to: "/onboarding/building" });
    }
    setSent(true);
  }

  async function social(provider: "google" | "apple") {
    setError("");
    if (!parentName.trim()) return setError("Add your first name first.");
    onboardingState.parentName = parentName.trim();
    saveProfile();
    const res = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/onboarding/account` });
    if (res.error) return setError("That sign-in didn't work. Please try again.");
    if (res.redirected) return;
    await pushAll();
    navigate({ to: "/onboarding/building" });
  }

  return (
    <div className="bg-gradient-name min-h-screen">
      <OnboardingSkeleton
        chapter={4}
        title="Create your account"
        cta={sent ? "Continue" : busy ? "Creating account" : "Create account"}
        ctaDisabled={sent ? false : !ok || busy}
        onContinue={finish}
      >
        <div className="flex flex-col gap-3">
          <input className={field} value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Your first name" aria-label="Your first name" />
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" disabled={sent} />
          <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8 or more characters)" aria-label="Password" disabled={sent} />
        </div>
        {error && <p role="alert" className="mt-3 text-support text-destructive">{error}</p>}
        {sent ? (
          <p className="mt-4 rounded-card bg-card p-4 text-support text-foreground shadow-card">
            We sent a link to {email.trim()}. Tap it to confirm your account. Everything you set up is kept on this phone and saves to your account as soon as you confirm.
          </p>
        ) : (
          <>
            <div className="my-5 flex items-center gap-3 text-muted-foreground"><span className="h-px flex-1 bg-border" /><span className="text-support">or</span><span className="h-px flex-1 bg-border" /></div>
            <div className="flex flex-col gap-3">
              <button type="button" onClick={() => social("apple")} className="text-button h-14 rounded-pill bg-foreground text-background shadow-card">Continue with Apple</button>
              <button type="button" onClick={() => social("google")} className="text-button h-14 rounded-pill bg-card text-foreground shadow-card">Continue with Google</button>
            </div>
          </>
        )}
      </OnboardingSkeleton>
    </div>
  );
}

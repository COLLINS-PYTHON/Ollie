import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { pullAll } from "@/lib/cloud-sync";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/login")({
  head: () => pageMeta("Log in", "Log in to your Ollie parent account on this device."),
  component: LoginPage,
});

const field = "text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none focus:border-primary";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function enter() {
    const found = await pullAll();
    if (found) return window.location.assign("/search");
    setBusy(false);
    setError("This account hasn't finished setting up yet. Start setup on this device to continue.");
  }

  // Returning from Google/Apple: the session is already set.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) { setBusy(true); void enter(); } });
  }, []);

  async function login() {
    setBusy(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) { setBusy(false); return setError("That email and password didn't match. Try again."); }
    await enter();
  }

  async function social(provider: "google" | "apple") {
    setError("");
    const res = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/login` });
    if (res.error) return setError("That sign-in didn't work. Please try again.");
    if (res.redirected) return;
    setBusy(true);
    await enter();
  }

  const ok = /\S+@\S+\.\S+/.test(email) && password.length > 0 && !busy;

  return (
    <div className="bg-gradient-name min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-4">
        <Link to="/onboarding/fact" aria-label="Back" className="flex size-10 items-center justify-center rounded-pill bg-card text-foreground shadow-card">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-title mt-8 text-foreground">Welcome back</h1>
        <p className="text-support mt-2 text-muted-foreground">Log in to bring your child's Ollie onto this device.</p>
        <div className="mt-6 flex flex-col gap-3">
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" />
          <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" />
        </div>
        {error && <p role="alert" className="mt-3 text-support text-destructive">{error}</p>}
        <div className="my-5 flex items-center gap-3 text-muted-foreground"><span className="h-px flex-1 bg-border" /><span className="text-support">or</span><span className="h-px flex-1 bg-border" /></div>
        <div className="flex flex-col gap-3">
          <button type="button" onClick={() => social("apple")} className="text-button h-14 rounded-pill bg-foreground text-background shadow-card">Continue with Apple</button>
          <button type="button" onClick={() => social("google")} className="text-button h-14 rounded-pill bg-card text-foreground shadow-card">Continue with Google</button>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          disabled={!ok}
          onClick={login}
          className={`text-button mt-6 h-14 w-full rounded-pill shadow-card transition-all duration-element ${ok ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"}`}
        >
          {busy ? "Logging in" : "Log in"}
        </button>
      </main>
    </div>
  );
}

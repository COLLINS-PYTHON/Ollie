import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/forgot-password")({
  head: () => pageMeta("Reset your password", "Get a link to set a new password for your Ollie parent account."),
  component: ForgotPage,
});

const field = "text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none focus:border-primary";

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const ok = /\S+@\S+\.\S+/.test(email) && !busy;

  async function send() {
    setBusy(true);
    await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
    setBusy(false);
    setSent(true);
  }

  return (
    <div className="bg-gradient-name min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-4">
        <Link to="/login" aria-label="Back" className="flex size-10 items-center justify-center rounded-pill bg-card text-foreground shadow-card">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-title mt-8 text-foreground">Reset your password</h1>
        {sent ? (
          <p className="text-body mt-4 rounded-card bg-card p-4 text-foreground shadow-card">
            If an account uses {email.trim()}, a link to set a new password is on its way.
          </p>
        ) : (
          <>
            <p className="text-support mt-2 text-muted-foreground">We'll email you a link to set a new one.</p>
            <input className={`${field} mt-6`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" />
            <div className="flex-1" />
            <button type="button" disabled={!ok} onClick={send} className={`text-button mt-6 h-14 w-full rounded-pill shadow-card ${ok ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"}`}>
              {busy ? "Sending" : "Send link"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

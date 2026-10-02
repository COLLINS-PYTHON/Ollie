import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pullAll } from "@/lib/cloud-sync";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/reset-password")({
  head: () => pageMeta("Set a new password", "Choose a new password for your Ollie parent account."),
  component: ResetPage,
});

const field = "text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none focus:border-primary";

function ResetPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setReady(true);
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  async function save() {
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) { setBusy(false); return setError(err.message); }
    await pullAll();
    window.location.assign("/search");
  }

  const ok = password.length >= 8 && !busy;
  return (
    <div className="bg-gradient-name min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-16">
        <h1 className="text-title text-foreground">Set a new password</h1>
        {!ready ? (
          <p className="text-support mt-3 text-muted-foreground">Open this page from the link in your email.</p>
        ) : (
          <>
            <input className={`${field} mt-6`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password (8 or more characters)" aria-label="New password" />
            {error && <p role="alert" className="mt-3 text-support text-destructive">{error}</p>}
            <div className="flex-1" />
            <button type="button" disabled={!ok} onClick={save} className={`text-button mt-6 h-14 w-full rounded-pill shadow-card ${ok ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"}`}>
              {busy ? "Saving" : "Save password"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

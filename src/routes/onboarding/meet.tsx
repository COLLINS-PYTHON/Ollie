import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";

export const Route = createFileRoute("/onboarding/meet")({
  head: () => pageMeta("Meet Ollie", "Ollie turns kids' curiosity into a safe, fun learning experience."),
  component: MeetPage,
});

function MeetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = [500, 1300, 2100, 2600, 3200].map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-gradient-hello min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 pb-32 pt-20 text-center">
        <h1 className="text-title text-foreground">Meet Ollie</h1>
        <div className="relative mt-8 flex size-48 items-center justify-center">
          {step === 1 && (
            <div className="materialize">
              <ThinkingOrb state="breathing" size={64} theme="light" aria-label="Ollie appearing" />
            </div>
          )}
          {step >= 2 && <img src={ollie} alt="Ollie the puppy" className="materialize bounce-soft size-48 object-contain" />}
        </div>
        {step >= 3 && (
          <div className="pop-in mt-6 min-h-28 w-full rounded-card bg-card p-5 shadow-sheet">
            {step >= 4 && (
              <p className="bubble-in text-body leading-relaxed text-foreground">
                Meet Ollie. Ollie's a furry little answer assistant that turns kids' curiosity into a safe, fun
                learning experience and reports straight back to you.
              </p>
            )}
          </div>
        )}
      </main>
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-5" style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <button
          type="button"
          disabled={step < 5}
          onClick={() => navigate({ to: "/onboarding" })}
          className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card transition-all duration-tap active:scale-[0.98] disabled:opacity-0"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

import { createFileRoute, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { loadOnboardingDraft, saveOnboardingDraft } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    loadOnboardingDraft();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const save = () => saveOnboardingDraft();
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, [pathname, ready]);

  return ready ? <div key={pathname} className="onboarding-page-enter"><Outlet /></div> : null;
}

/* Fixed onboarding skeleton: back, 4-segment chapter bar, title slot, pinned button. */
export function OnboardingSkeleton({
  chapter,
  title,
  children,
  cta,
  ctaDisabled,
  onContinue,
}: {
  chapter: 1 | 2 | 3 | 4;
  title: string;
  children?: ReactNode;
  cta: string;
  ctaDisabled?: boolean;
  onContinue?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden">
      <header className="flex items-center gap-4 px-6 pt-5">
        <button
          type="button"
          aria-label="Back"
          onClick={() => router.history.back()}
          className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-card text-foreground shadow-card transition-transform duration-tap active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={chapter}>
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`h-1.5 flex-1 rounded-pill transition-colors duration-element ${n <= chapter ? "bg-primary" : "bg-surface-2"}`}
            />
          ))}
        </div>
      </header>

      <main className="screen-enter flex min-h-0 flex-1 flex-col px-6 pb-28 pt-9">
        <h1 className="text-title mx-auto w-full max-w-sm text-center text-foreground">{title}</h1>
        <div className="mt-7 flex-1">{children}</div>
      </main>

      <div
        className="onboarding-cta-fade fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-6 pt-7"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          disabled={ctaDisabled}
          onClick={onContinue}
          className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card transition-all duration-tap active:scale-[0.98] disabled:bg-surface-2 disabled:text-muted-foreground disabled:shadow-none"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

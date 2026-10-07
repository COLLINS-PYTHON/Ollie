import { createFileRoute, Outlet, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { loadOnboardingDraft, saveOnboardingStep } from "@/lib/onboarding-store";
import { resolveAppEntry } from "@/lib/app-entry";
import { Button } from "@/components/ui/button";
import ollie from "@/assets/ollie.png";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let active = true;
    void resolveAppEntry().then((to) => {
      if (!active) return;
      if (to === "/search") { void navigate({ to, replace: true }); return; }
      loadOnboardingDraft();
      setReady(true);
    }).catch(() => { if (active) { loadOnboardingDraft(); setReady(true); } });
    const image = new Image();
    image.src = ollie;
    void image.decode().catch(() => {});
    return () => { active = false; };
  }, [navigate]);

  useEffect(() => {
    if (!ready) return;
    const save = () => saveOnboardingStep(pathname);
    save();
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, [pathname, ready]);

  return <div className="onboarding-theme">{ready ? <div key={pathname} className="onboarding-page-enter"><Outlet /></div> : <div className="min-h-[100svh] bg-background" />}</div>;
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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const chapterPaths = [
    ["/onboarding/", "/onboarding/name"],
    ["/onboarding/age"],
    ["/onboarding/reading", "/onboarding/preview"],
    ["/onboarding/interests", "/onboarding/lessons", "/onboarding/worries", "/onboarding/assurance", "/onboarding/screen-time", "/onboarding/goals", "/onboarding/tone", "/onboarding/try", "/onboarding/trust", "/onboarding/pin", "/onboarding/account"],
  ];
  const steps = chapterPaths[chapter - 1] ?? [];
  const progress = (Math.max(0, steps.indexOf(pathname)) + 1) / Math.max(1, steps.length);
  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden">
      <header className="flex items-center gap-4 px-6 pt-5">
        <Button variant="control" size="icon"
          type="button"
          aria-label="Back"
          onClick={() => router.history.back()}
          className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-card text-foreground shadow-card transition-transform duration-tap active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div className="chapter-progress flex flex-1 gap-2" role="progressbar" aria-label="Onboarding progress" aria-valuemin={0} aria-valuemax={4} aria-valuenow={chapter - 1 + progress}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className="chapter-track h-2 flex-1 overflow-hidden rounded-pill bg-secondary">
              <span className="chapter-fill block h-full rounded-pill bg-primary" style={{ width: `${n < chapter ? 100 : n === chapter ? progress * 100 : 0}%` }} />
            </span>
          ))}
        </div>
      </header>

      <main className="onboarding-content flex min-h-0 flex-1 flex-col px-6 pb-32 pt-9">
        <h1 className="text-title mx-auto w-full max-w-sm text-center text-foreground">{title}</h1>
        <div className="mt-7 flex-1">{children}</div>
      </main>

      <div
        className="onboarding-cta-fade fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-6 pt-7"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <Button variant="onboarding" size="onboarding"
          type="button"
          disabled={ctaDisabled}
          onClick={onContinue}
          className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card transition-all duration-tap active:scale-[0.98] disabled:bg-surface-2 disabled:text-muted-foreground disabled:shadow-none"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}

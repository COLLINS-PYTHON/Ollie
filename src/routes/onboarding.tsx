import { createFileRoute, Outlet, retainSearchParams, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { onboardingState, loadOnboardingDraft, loadProfile, saveOnboardingStep, ONBOARDING_STEPS } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";
import { resolveAppEntry } from "@/lib/app-entry";
import { Button } from "@/components/ui/button";
import whaleCurious from '@/assets/whale-curious.png';
import whaleCelebrate from '@/assets/whale-celebrate.png';
import { AmbientDepth } from "@/components/ollie/AmbientDepth";
import { bubbleSound } from "@/lib/bubble-sound";
import { ONBOARDING_ANSWER } from '@/lib/onboarding-answer';
import { preloadSpeech } from "@/lib/speak";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>): { preview?: boolean } => (search["preview"] === true || search["preview"] === "true" || search["preview"] === "1" ? { preview: true } : {}),
  search: { middlewares: [retainSearchParams(["preview"])] },
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const { preview } = Route.useSearch();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => { if (ready && pathname === "/onboarding/fact") void preloadSpeech(ONBOARDING_ANSWER["7-9"],7).catch(() => {}); }, [ready,pathname]);
  const previousStep = useRef(0);
  const stepIndex = ONBOARDING_STEPS.findIndex(step => step === pathname || step + '/' === pathname);
  const direction = stepIndex < previousStep.current ? 'back' : 'forward';
  useEffect(() => { previousStep.current = stepIndex; }, [stepIndex]);
  useEffect(() => {
    document.documentElement.dataset.onboardingMotion = 'true';
    return () => { delete document.documentElement.dataset.onboardingMotion; delete document.documentElement.dataset.stepDirection; };
  }, []);
  useEffect(() => {
    const unsubscribe = router.subscribe('onBeforeNavigate', ({ fromLocation, toLocation }) => {
      const from = ONBOARDING_STEPS.findIndex(step => step === fromLocation?.pathname.replace(/\/$/, ''));
      const to = ONBOARDING_STEPS.findIndex(step => step === toLocation.pathname.replace(/\/$/, ''));
      document.documentElement.dataset.stepDirection = to < from ? 'back' : 'forward';
      bubbleSound();
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    let active = true;
    [whaleCurious,whaleCelebrate].forEach((src) => {
      const pose = new Image();
      pose.src = src;
      void pose.decode().catch(() => {});
    });
    if (preview) {
      loadProfile();
      loadOnboardingDraft();
      setReady(true);
      return () => { active = false; };
    }
    void resolveAppEntry().then((to) => {
      if (!active) return;
      if (to === "/search") { void navigate({ to, replace: true }); return; }
      loadOnboardingDraft();
      setReady(true);
    }).catch(() => { if (active) { loadOnboardingDraft(); setReady(true); } });
    return () => { active = false; };
  }, [navigate, preview]);

  useEffect(() => {
    if (!ready || preview) return;
    const save = () => saveOnboardingStep(pathname);
    save();
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, [pathname, ready, preview]);

  return <div data-navigation={direction} className="onboarding-theme onboarding-shell">{ready ? <><AmbientDepth /><div className="onboarding-flow"><Outlet /></div></> : <div className="min-h-[100svh] bg-background" />}</div>;
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
  chapter: number;
  title: string;
  children?: ReactNode;
  cta: string;
  ctaDisabled?: boolean;
  onContinue?: () => void;
}) {
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  void chapter;
  const currentStep = Math.max(0, ONBOARDING_STEPS.findIndex(s => s === pathname || s + '/' === pathname));
  const progress = (currentStep + 1) / ONBOARDING_STEPS.length;
  const touch = useRef<{ x: number; y: number } | null>(null);
  return (
    <div className="onboarding-frame mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden"
      onTouchStart={(event) => { const target = event.target; if (target instanceof Element && target.closest("input, textarea, button, [role=listbox], .safety-examples")) return; const point = event.touches[0]; if (point) touch.current = { x: point.clientX, y: point.clientY }; }}
      onTouchEnd={(event) => { const start = touch.current; touch.current = null; const end = event.changedTouches[0]; if (!start || !end) return; const dx = end.clientX - start.x, dy = end.clientY - start.y; if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return; if (dx < 0 && !ctaDisabled) onContinue?.(); else if (dx > 0) router.history.back(); }}>
      <header className="onboarding-header flex items-center gap-4 px-6 pt-5">
        <Button variant="control" size="icon"
          type="button"
          aria-label="Back"
          onClick={() => router.history.back()}
          className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-card text-foreground shadow-card transition-transform duration-tap active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div
          className="chapter-progress relative h-1.5 flex-1 overflow-hidden rounded-pill bg-secondary"
          role="progressbar"
          aria-label={`Setup step ${currentStep + 1} of ${ONBOARDING_STEPS.length}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span className="chapter-fill absolute inset-y-0 left-0 rounded-pill bg-primary" style={{ width: `${progress * 100}%` }} />
          {[25, 50, 75].map(at => <span key={at} aria-hidden="true" className="chapter-divider absolute inset-y-0 w-1" style={{ left: `${at}%` }} />)}
        </div>
      </header>


      <main key={pathname} className="onboarding-content flex min-h-0 flex-1 flex-col px-6 pb-32 pt-9">
        <h1 className="text-title mx-auto w-full max-w-sm text-center text-foreground">{title}</h1>
        <div className="onboarding-step-body mt-7 flex-1">{children}</div>
      </main>

      <div
        className="onboarding-action onboarding-cta-fade fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-6 pt-7"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <Button variant="onboarding" size="onboarding"
          type="button"
          disabled={ctaDisabled}
          onClick={() => { bubbleSound(); onContinue?.(); }}
          className="text-button h-14 w-full rounded-pill bg-primary text-primary-foreground shadow-card transition-all duration-tap active:scale-[0.98] disabled:bg-surface-2 disabled:text-muted-foreground disabled:shadow-none"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}

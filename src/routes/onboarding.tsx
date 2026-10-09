import { createFileRoute, Outlet, retainSearchParams, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { loadOnboardingDraft, loadProfile, saveOnboardingStep } from "@/lib/onboarding-store";
import { resolveAppEntry } from "@/lib/app-entry";
import { Button } from "@/components/ui/button";
import ollie from "@/assets/ollie.png";
import { OnboardingScenery } from "@/components/ollie/OnboardingScenery";
import { OnboardingCompanions, OLLIE_POSES } from "@/components/ollie/OnboardingCompanions";
import chaseClip from "@/assets/ollie-chase-compatible.mp4.asset.json";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>): { preview?: boolean } => (search["preview"] === true || search["preview"] === "true" ? { preview: true } : {}),
  search: { middlewares: [retainSearchParams(["preview"])] },
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const { preview } = Route.useSearch();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.src = ollie;
    void image.decode().catch(() => {});
    Object.values(OLLIE_POSES).forEach((src) => {
      const pose = new Image();
      pose.src = src;
      void pose.decode().catch(() => {});
    });
    // Warm the paywall chase clip early so it plays instantly when reached.
    const warm = window.setTimeout(() => { void fetch(chaseClip.url, { priority: "low" } as RequestInit).catch(() => {}); }, 1500);
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

  // Privacy and safety retain a quiet background. Light discovery steps share visible edge scenery.
  const scenery = ["/onboarding/fact", "/onboarding/age"].includes(pathname) ? "clouds"
    : pathname === "/onboarding/preview" ? "flight"
    : pathname === "/onboarding/priorities" ? "leaves" : null;
  return <div className="onboarding-theme onboarding-shell">{ready ? <>{scenery && <OnboardingScenery variant={scenery} />}<div className="onboarding-flow"><Outlet /></div></> : <div className="min-h-[100svh] bg-background" />}</div>;
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
    ["/onboarding", "/onboarding/"],
    ["/onboarding/age"],
    ["/onboarding/reading"],
    ["/onboarding/preview", "/onboarding/interests", "/onboarding/lessons", "/onboarding/worries", "/onboarding/assurance", "/onboarding/screen-time", "/onboarding/priorities", "/onboarding/tone", "/onboarding/try", "/onboarding/trust", "/onboarding/pin", "/onboarding/account"],
  ];
  const steps = chapterPaths[chapter - 1] ?? [];
  const progress = (Math.max(0, steps.indexOf(pathname)) + 1) / Math.max(1, steps.length);
  const companion = pathname === "/onboarding/reading" ? "reading"
    : pathname === "/onboarding/age" ? "curious"
    : pathname === "/onboarding/screen-time" ? "resting" : null;
  return (
    <div className="onboarding-frame mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden">
      <header className="onboarding-header flex items-center gap-4 px-6 pt-5">
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
            <span key={n} className={`chapter-track h-1.5 flex-1 overflow-hidden rounded-pill bg-secondary ${n === chapter ? "chapter-current" : ""}`}>
              <span className="chapter-fill block h-full rounded-pill bg-primary" style={{ width: `${n < chapter ? 100 : n === chapter ? progress * 100 : 0}%` }} />
            </span>
          ))}
        </div>
      </header>

      <main className="onboarding-content flex min-h-0 flex-1 flex-col px-6 pb-32 pt-9">
        <h1 className="text-title mx-auto w-full max-w-sm text-center text-foreground">{title}</h1>
        <div className="onboarding-step-body mt-7 flex-1">{children}</div>
        {companion && <OnboardingCompanions scene={companion} />}
      </main>

      <div
        className="onboarding-action onboarding-cta-fade fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-6 pt-7"
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

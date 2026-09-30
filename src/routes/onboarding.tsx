import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return <Outlet />;
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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
      <header className="flex items-center gap-4 px-5 pt-4">
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

      <main className="screen-enter flex-1 px-5 pb-32 pt-8">
        <h1 className="text-title text-foreground">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>

      <div
        className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md bg-gradient-to-t from-background via-background to-transparent px-5 pt-6"
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

import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { onboardingState } from "@/lib/onboarding-store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started | Ollie" },
      { name: "description", content: "Set up Ollie for your child in a few quick steps." },
      { property: "og:title", content: "Get started | Ollie" },
      { property: "og:description", content: "Set up Ollie for your child in a few quick steps." },
    ],
  }),
  component: OnboardingPage,
});

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
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
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

function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(onboardingState.name);
  return (
    <div className="bg-gradient-name min-h-screen">
      <OnboardingSkeleton
        chapter={1}
        title="What is your child's name?"
        cta="Continue"
        ctaDisabled={!name.trim()}
        onContinue={() => {
          onboardingState.name = name.trim();
          navigate({ to: "/onboarding/age" });
        }}
      >
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          aria-label="Child's first name"
          className="text-body h-14 w-full rounded-control border-2 border-transparent bg-card px-4 text-foreground shadow-card outline-none transition-colors duration-tap placeholder:text-muted-foreground focus:border-primary"
        />
        <p className="text-support mt-3 text-muted-foreground">We use this to personalize Ollie. You can change it later.</p>
      </OnboardingSkeleton>
    </div>
  );
}

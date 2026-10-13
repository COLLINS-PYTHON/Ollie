import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingSkeleton } from "../onboarding";
import { onboardingState, formatMinutes } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";

export const Route = createFileRoute("/onboarding/screen-time")({
  head: () => ({
    meta: [
      { title: "Daily time with Ollie | Ollie" },
      { name: "description", content: "Set your child's daily Ollie time limit and slideshow reset time." },
      { property: "og:title", content: "Daily time with Ollie | Ollie" },
      { property: "og:description", content: "Set your child's daily Ollie time limit and slideshow reset time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ScreenTimePage,
});

function Stepper({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  const btn =
    "flex size-11 items-center justify-center rounded-pill bg-surface text-foreground transition-transform duration-tap active:scale-95 disabled:opacity-40";
  return (
    <div className="rounded-card bg-card p-4 shadow-card">
      <div className="text-label text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-center justify-between">
        <Button variant="control" size="icon" type="button" aria-label={`Less: ${label}`} className={btn} disabled={value <= min} onClick={() => onChange(value - 15)}>
          <Minus className="size-5" />
        </Button>
        <span className="text-title text-foreground" aria-live="polite">{formatMinutes(value)}</span>
        <Button variant="control" size="icon" type="button" aria-label={`More: ${label}`} className={btn} disabled={value >= max} onClick={() => onChange(value + 15)}>
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  );
}

function ScreenTimePage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [limit, setLimit] = useState(onboardingState.limitMinutes);
  const [reset, setReset] = useState(onboardingState.slideshowReset);

  return (
    <div className="bg-gradient-dawn min-h-screen">
      <OnboardingSkeleton
        chapter={4}
        title={`Set ${name}'s daily screen-time limits`}
        cta="Continue"
        onContinue={() => navigate({ to: "/onboarding/priorities" })}
      >
        <div className="flex flex-col gap-3">
          <Stepper
            label="Maximum daily chat & creation time"
            value={limit}
            min={15}
            max={240}
            onChange={(v) => { setLimit(v); onboardingState.limitMinutes = v; }}
          />
          <div className="rounded-card bg-card p-4 shadow-card"><p className="text-label text-muted-foreground">Hard shutdown limit</p><p className="text-support mt-2 text-foreground">Search and Create pause when {name} reaches {formatMinutes(limit)}. Daily lessons stay available.</p></div>
          <label className="flex items-center justify-between rounded-card bg-card p-4 shadow-card">
            <span className="text-label text-muted-foreground">Daily slideshow resets at</span>
            <input
              type="time"
              value={reset}
              onChange={(e) => { const v = e.target.value || "07:00"; setReset(v); onboardingState.slideshowReset = v; }}
              className="text-body rounded-control bg-surface px-3 py-2 font-medium text-foreground"
            />
          </label>
          <p className="text-support px-1 text-muted-foreground">
            This limit does not include time spent on the daily slideshow.
          </p>
        </div>
      </OnboardingSkeleton>
    </div>
  );
}

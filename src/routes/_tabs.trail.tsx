import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Cookie, Pause, Rocket } from "lucide-react";
import { INTERESTS } from "@/lib/interests";
import { JAR_BONUS, JAR_EVERY, jarProgress, trailStops, type TrailStop } from "@/lib/slideshow-store";
import { pageMeta } from "@/lib/meta";

function dateLabel(at: number): string {
  return new Date(at).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

/* Glass jar that fills one cookie per learning day in the current cycle. */
function TrailJar({ filled }: { filled: number }) {
  return (
    <div className="rounded-card bg-white p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className="glossy flex size-12 shrink-0 items-center justify-center rounded-control bg-gold">
          <Cookie className="size-6 text-foreground" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-body font-bold text-foreground">
            {filled} of {JAR_EVERY} learning days
          </p>
          <p className="text-support text-muted-foreground">
            Reach the jar for {JAR_BONUS} bonus picture cookies
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {Array.from({ length: JAR_EVERY }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-pill transition-colors duration-element ${i < filled ? "bg-gold" : "bg-surface-2"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Stop({ stop }: { stop: TrailStop }) {
  if (stop.kind === "paused") {
    return (
      <li className="relative flex items-center gap-3 py-2 pl-1">
        <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-pill border-2 border-dashed border-primary/30 bg-white">
          <Pause className="size-4 text-primary/50" strokeWidth={2} />
        </div>
        <p className="text-support text-muted-foreground">Paused, your trail waited for you</p>
      </li>
    );
  }
  const c = stop.completion;
  const category = INTERESTS.find((i) => i.id === c.categoryId);
  const Icon = category?.icon ?? Rocket;
  return (
    <li className="relative flex items-center gap-3 py-2 pl-1">
      <div
        className={`glossy relative z-10 flex size-10 shrink-0 items-center justify-center rounded-pill bg-gradient-to-b shadow-[0_0_16px_var(--brand)] ${category?.tile ?? "from-cat-space to-cat-space-deep"}`}
      >
        <Icon className="size-5 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1 rounded-card bg-white p-3 shadow-card">
        <p className="truncate text-body font-bold text-foreground">{c.label}</p>
        <p className="text-support text-muted-foreground">
          Day {stop.learningDay} · {dateLabel(c.at)}
        </p>
      </div>
    </li>
  );
}

function Trail() {
  const [stops, setStops] = useState<TrailStop[]>([]);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    setStops(trailStops().reverse());
    setFilled(jarProgress());
  }, []);

  return (
    <main className="screen-enter mx-auto min-h-screen w-full max-w-md bg-background px-5 pb-32 pt-16">
      <h1 className="text-title text-foreground">Your Learning Trail</h1>

      <div className="mt-5">
        <TrailJar filled={filled} />
      </div>

      {stops.length === 0 ? (
        <p className="mt-6 text-center text-body text-muted-foreground">
          Finish today's lesson to light your first stop
        </p>
      ) : (
        <div className="relative mt-6">
          <span
            aria-hidden
            className="absolute bottom-5 left-[25px] top-5 w-1 rounded-pill bg-primary/70 shadow-[0_0_12px_var(--brand)]"
          />
          <ul className="relative flex flex-col">
            {stops.map((s) => (
              <Stop key={s.kind === "done" ? s.completion.id : s.key} stop={s} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export const Route = createFileRoute("/_tabs/trail")({
  head: () => ({
    meta: pageMeta("Trail", "Follow your Learning Trail, one lesson at a time.").meta,
  }),
  component: Trail,
});

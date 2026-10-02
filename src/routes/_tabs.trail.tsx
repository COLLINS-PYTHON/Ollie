import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { INTERESTS } from "@/lib/interests";
import { completions, streakDays, type Completion } from "@/lib/slideshow-store";
import { pageMeta } from "@/lib/meta";

function dateLabel(at: number): string {
  return new Date(at).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

function Trail() {
  const [log, setLog] = useState<Completion[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setLog(completions());
    setStreak(streakDays());
  }, []);

  return (
    <main className="screen-enter mx-auto min-h-screen w-full max-w-md bg-background px-5 pb-32 pt-16">
      <h1 className="text-title text-foreground">Your Learning Trail</h1>

      <div className="mt-5 flex items-center gap-3 rounded-card bg-white p-4 shadow-card">
        <div className="glossy flex size-11 shrink-0 items-center justify-center rounded-control bg-gradient-to-b from-cat-weather to-cat-weather-deep">
          <Flame className="size-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-body font-bold text-foreground">
            {streak === 1 ? "1 day in a row" : `${streak} days in a row`}
          </p>
          <p className="text-support text-muted-foreground">
            {log.length === 0
              ? "Finish today's lesson to start your trail"
              : `${log.length} ${log.length === 1 ? "lesson" : "lessons"} finished`}
          </p>
        </div>
      </div>

      {log.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2.5">
          {log.map((c) => {
            const category = INTERESTS.find((i) => i.id === c.categoryId);
            const Icon = category?.icon ?? INTERESTS[0].icon;
            return (
              <li key={c.id} className="flex items-center gap-3 rounded-card bg-white p-3.5 shadow-card">
                <div className={`glossy flex size-10 shrink-0 items-center justify-center rounded-control bg-gradient-to-b ${category?.tile ?? "from-cat-space to-cat-space-deep"}`}>
                  <Icon className="size-5 text-white" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body font-bold text-foreground">{c.label}</p>
                  <p className="text-support text-muted-foreground">{dateLabel(c.at)}</p>
                </div>
                <p className="text-support text-muted-foreground">
                  {c.correct}/{c.total}
                </p>
              </li>
            );
          })}
        </ul>
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

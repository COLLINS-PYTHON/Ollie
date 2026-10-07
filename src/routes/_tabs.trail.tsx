import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole, Pause, Rocket } from "lucide-react";
import { INTERESTS } from "@/lib/interests";
import { JAR_BONUS, JAR_EVERY, jarProgress, trailStops, type TrailStop } from "@/lib/slideshow-store";
import { pageMeta } from "@/lib/meta";

function Jar({ filled }: { filled: number }) {
  return <svg viewBox="0 0 130 140" role="img" aria-label={`${filled} of 7 cookies in the trail jar`} className="h-32 w-28">
    <rect x="34" y="12" width="62" height="15" rx="6" className="fill-gold" />
    <path d="M37 28v12c-14 8-17 19-17 36v40q0 13 16 13h58q16 0 16-13V76c0-17-3-28-17-36V28Z" className="trail-jar-glass" />
    {Array.from({ length: JAR_EVERY }, (_, i) => <g key={i} opacity={i < filled ? 1 : .15}>
      <circle cx={43 + (i % 3) * 23} cy={105 - Math.floor(i / 3) * 22} r="12" className="trail-cookie" />
      <circle cx={40 + (i % 3) * 23} cy={101 - Math.floor(i / 3) * 22} r="1.5" className="fill-foreground" />
      <circle cx={47 + (i % 3) * 23} cy={109 - Math.floor(i / 3) * 22} r="1.5" className="fill-foreground" />
    </g>)}
    <path d="M29 62v40" className="trail-jar-shine" />
  </svg>;
}

function Trail() {
  const [stops, setStops] = useState<TrailStop[]>([]);
  const [filled, setFilled] = useState(0);
  useEffect(() => { setStops(trailStops()); setFilled(jarProgress()); }, []);
  const learningDays = stops.filter((s) => s.kind === "done").length;
  const cycleStart = Math.floor(learningDays / JAR_EVERY) * JAR_EVERY;
  const cycle = stops.filter((s) => s.kind === "paused" ? s.at >= (stops.find((x) => x.kind === "done" && x.learningDay === cycleStart + 1)?.completion.at ?? 0) : s.learningDay > cycleStart);
  const nodes: Array<{ stop?: TrailStop; day?: number; jar?: boolean }> = [...cycle.map((stop) => ({ stop })), ...Array.from({ length: JAR_EVERY - filled }, (_, i) => ({ day: cycleStart + filled + i + 1 })), { jar: true }];
  const height = nodes.length * 115 + 50;
  const xAt = (i: number) => i % 2 === 0 ? 95 : 245;
  const path = nodes.map((_, i) => i === 0 ? `M${xAt(i)} 40` : `C${xAt(i - 1)} ${40 + (i - 1) * 115 + 65},${xAt(i)} ${40 + i * 115 - 65},${xAt(i)} ${40 + i * 115}`).join(" ");
  return <main className="screen-enter mx-auto min-h-[100svh] w-full max-w-md bg-background px-6 pb-32 pt-20">
    <h1 className="text-title text-foreground">Your Learning Trail</h1>
    <div className="mt-5 flex items-center gap-3 border-b border-border pb-4">
      <Jar filled={filled} />
      <div className="min-w-0"><p className="text-body font-bold text-foreground">{filled} of {JAR_EVERY} learning days</p><p className="text-support mt-1 text-muted-foreground">{JAR_BONUS} bonus picture cookies</p></div>
    </div>
    {learningDays === 0 && <p className="text-body mt-5 text-center text-muted-foreground">Your streak starts today! Finish a slideshow to light up your first day.</p>}
    <div className="relative mx-auto mt-7 w-full max-w-[340px]" style={{ height }}>
      <svg viewBox={`0 0 340 ${height}`} aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        <path d={path} className="trail-path" opacity=".12" />
        {cycle.length > 1 && <path d={nodes.slice(0, cycle.length).map((_, i) => i === 0 ? `M${xAt(i)} 40` : `C${xAt(i - 1)} ${40 + (i - 1) * 115 + 65},${xAt(i)} ${40 + i * 115 - 65},${xAt(i)} ${40 + i * 115}`).join(" ")} className="trail-path trail-glow" />}
      </svg>
      <ol className="relative">
        {nodes.map((node, i) => {
          const stop = node.stop;
          const done = stop?.kind === "done" ? stop : null;
          const paused = stop?.kind === "paused";
          const category = done ? INTERESTS.find((c) => c.id === done.completion.categoryId) : null;
          const Icon = category?.icon ?? Rocket;
          return <li key={done?.completion.id ?? `node-${i}`} className="trail-arrive absolute flex w-36 -translate-x-1/2 flex-col items-center text-center" style={{ left: `${xAt(i) / 340 * 100}%`, top: i * 115 }}>
            {node.jar ? <><Jar filled={filled} /><p className="text-support font-bold text-foreground">+{JAR_BONUS} cookies</p></> : <>
              <div className={`flex size-16 items-center justify-center rounded-pill ${done ? `glossy trail-node bg-gradient-to-b ${category?.tile ?? "from-cat-space to-cat-space-deep"}` : paused ? "border-2 border-dashed border-primary/30 bg-card" : "border-2 border-border bg-card"}`}>
                {done ? <Icon className="size-7 text-primary-foreground" /> : paused ? <Pause className="size-5 text-muted-foreground" /> : <LockKeyhole className="size-5 text-muted-foreground/60" />}
              </div>
              <p className="text-support mt-2 font-bold text-foreground">{paused ? "Paused" : `Day ${done?.learningDay ?? node.day}`}</p>
              {done && <p className="text-label mt-1 text-muted-foreground">{done.completion.label}</p>}
            </>}
          </li>;
        })}
      </ol>
    </div>
  </main>;
}

export const Route = createFileRoute("/_tabs/trail")({
  head: () => pageMeta("Trail", "Follow your Learning Trail, one lesson at a time."),
  component: Trail,
});
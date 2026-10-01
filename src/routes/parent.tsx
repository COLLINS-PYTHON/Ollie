import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { onboardingState, formatMinutes, formatClock } from "@/lib/onboarding-store";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard | Ollie" },
      { name: "description", content: "Manage screen time, safety and progress for your child." },
      { property: "og:title", content: "Parent Dashboard | Ollie" },
      { property: "og:description", content: "Manage screen time, safety and progress for your child." },
    ],
  }),
  component: ParentDashboard,
});

/* Thin 1.8px line icons, no fill, each with one specific detail. */
function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const getRows = () => [
  {
    label: "Screen time",
    hint: `${formatMinutes(onboardingState.limitMinutes)} a day, Search and Create only (now about ${formatMinutes(onboardingState.baselineMinutes)})`,
    color: "text-accent-1",
    icon: (
      // hourglass with sand settled at the bottom
      <LineIcon>
        <path d="M7 3h10M7 21h10M8 3c0 4 8 5 8 9s-8 5-8 9M16 3c0 4-8 5-8 9s8 5 8 9" />
        <path d="M10 19h4" />
      </LineIcon>
    ),
  },
  {
    label: "Slideshow settings",
    hint: `Resets daily at ${formatClock(onboardingState.slideshowReset)}, not counted in the limit`,
    color: "text-accent-4",
    icon: (
      // stacked slides with a small reset arrow
      <LineIcon>
        <rect x="3" y="7" width="13" height="11" rx="2" />
        <path d="M7 4h11a2 2 0 0 1 2 2v8" />
        <path d="M12 11.5a2.5 2.5 0 1 1-1-2" />
        <path d="M11 8v1.6h1.6" />
      </LineIcon>
    ),
  },
  {
    label: "Safety filters",
    hint: "Placeholder",
    color: "text-accent-2",
    icon: (
      // shield with a small keyhole
      <LineIcon>
        <path d="M12 3 5 6v5.5c0 4.2 2.9 7.9 7 9.5 4.1-1.6 7-5.3 7-9.5V6l-7-3Z" />
        <circle cx="12" cy="10.5" r="1.6" />
        <path d="M12 12.1V15" />
      </LineIcon>
    ),
  },
  {
    label: "Learning report",
    hint: "Placeholder",
    color: "text-accent-3",
    icon: (
      // open book with a bookmark ribbon
      <LineIcon>
        <path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1V5.5Z" />
        <path d="M12 6.5V20" />
        <path d="M16 5v5l1.5-1 1.5 1V5" />
      </LineIcon>
    ),
  },
  {
    label: "Child profile",
    hint: "Placeholder",
    color: "text-accent-4",
    icon: (
      // name badge with a lanyard clip
      <LineIcon>
        <rect x="4" y="7" width="16" height="13" rx="3" />
        <path d="M10 4h4v3h-4z" />
        <circle cx="9.5" cy="12.5" r="1.8" />
        <path d="M13.5 12h3.5M13.5 15h2.5M7 17c.5-1 1.4-1.5 2.5-1.5s2 .5 2.5 1.5" />
      </LineIcon>
    ),
  },
];

function ParentDashboard() {
  return (
    <main className="screen-enter mx-auto min-h-screen w-full max-w-md bg-background px-5 pb-16 pt-4">
      <Link
        to="/search"
        aria-label="Back"
        className="flex size-10 items-center justify-center rounded-pill bg-card text-foreground shadow-card transition-transform duration-tap active:scale-95"
      >
        <ChevronLeft className="size-5" />
      </Link>
      <h1 className="text-title mt-6 text-foreground">Parent Dashboard</h1>
      <p className="text-support mt-1 text-muted-foreground">Settings and progress. Coming soon.</p>

      <ul className="mt-6 overflow-hidden rounded-card bg-card shadow-card">
        {getRows().map((r, i) => (
          <li key={r.label} className={i > 0 ? "border-t" : ""}>
            <div className="flex items-center gap-4 px-5 py-4">
              <span className={r.color}>{r.icon}</span>
              <div className="flex-1">
                <div className="text-body text-foreground">{r.label}</div>
                <div className="text-support text-muted-foreground">{r.hint}</div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.8} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

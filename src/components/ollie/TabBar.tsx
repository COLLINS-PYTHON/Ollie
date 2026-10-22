import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Sparkles, Route as TrailIcon, type LucideIcon } from "lucide-react";

type Tab = { to: "/search" | "/create" | "/trail"; label: string; icon: LucideIcon };

const TABS: Tab[] = [
  { to: "/search", label: "Search", icon: Search },
  { to: "/create", label: "Create", icon: Sparkles },
  { to: "/trail", label: "Trail", icon: TrailIcon },
];

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main"
      className="app-tabbar pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-6"
    >
      <div className="frosted pointer-events-auto flex items-center gap-1 rounded-pill border border-border p-1.5 shadow-sheet">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={[
                "app-tab flex h-12 flex-1 flex-col items-center justify-center gap-1 rounded-pill transition-all duration-element ease-enter active:scale-95",
                active
                  ? "bg-secondary px-5 text-primary"
                  : "px-5 text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="size-[22px] shrink-0" strokeWidth={2.2} />
              <span className="text-button">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

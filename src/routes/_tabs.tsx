import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TabBar } from "@/components/ollie/TabBar";

export const Route = createFileRoute("/_tabs")({
  component: TabsLayout,
});

function ParentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
      <circle cx="12" cy="10.5" r="2.2" />
      <path d="M8.3 16c.8-1.5 2.1-2.3 3.7-2.3s2.9.8 3.7 2.3" />
    </svg>
  );
}

function TabsLayout() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-md justify-end px-5 pt-4 absolute inset-x-0 top-0 z-30">
        <Link
          to="/parent"
          aria-label="Parent Dashboard"
          className="frosted flex size-10 items-center justify-center rounded-pill text-muted-foreground shadow-card transition-transform duration-tap active:scale-95"
        >
          <ParentIcon />
        </Link>
      </div>
      <Outlet />
      <TabBar />
    </div>
  );
}

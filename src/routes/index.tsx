import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { resolveAppEntry } from "@/lib/app-entry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ollie | Safe AI learning for kids" },
      { name: "description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:title", content: "Ollie | Safe AI learning for kids" },
      { property: "og:description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AppEntry,
});

function AppEntry() {
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    void resolveAppEntry().then((to) => { if (active) void navigate({ to, replace: true }); }).catch(() => {
      if (active) void navigate({ to: "/login", replace: true });
    });
    return () => { active = false; };
  }, [navigate]);
  return <main className="flex min-h-[100svh] items-center justify-center bg-background" role="status" aria-label="Opening Ollie"><span className="size-6 animate-pulse rounded-pill bg-primary/20" /></main>;
}

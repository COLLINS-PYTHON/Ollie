import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { resolveAppEntry } from "@/lib/app-entry";
import { Button } from "@/components/ui/button";
import ollie from "@/assets/whale-curious.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ollie | Safe AI learning for kids" },
      { name: "description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:title", content: "Ollie | Safe AI learning for kids" },
      { property: "og:description", content: "Ollie is a safe AI learning app for kids aged 4 to 12." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://start-forge-engine.lovable.app/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://start-forge-engine.lovable.app/" }],
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
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md text-center">
        <img src={ollie} alt="Ollie, the whale learning mascot" width={160} height={160} className="mx-auto size-40 object-contain" />
        <h1 className="mt-5 text-title font-bold text-foreground">Ollie</h1>
        <p className="mt-3 text-body font-semibold text-foreground">Safe AI learning for kids aged 4 to 12.</p>
        <p className="mt-3 text-body text-muted-foreground">Explore age-appropriate answers, daily discoveries and creative pictures. Parents manage each child’s profile, screen time and learning settings.</p>
        <Button asChild className="mt-7 h-12 w-full"><Link to="/onboarding/fact">Meet Ollie</Link></Button>
        <nav aria-label="Family information" className="mt-3 flex flex-wrap justify-center gap-1">
          <Button asChild variant="link"><Link to="/login">Parent sign in</Link></Button>
          <Button asChild variant="link"><Link to="/privacy">Privacy</Link></Button>
          <Button asChild variant="link"><Link to="/terms">Terms</Link></Button>
        </nav>
        <p role="status" className="mt-4 text-support text-muted-foreground">Opening your Ollie experience…</p>
      </div>
    </main>
  );
}

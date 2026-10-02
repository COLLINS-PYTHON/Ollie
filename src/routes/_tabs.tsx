import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { addUsage, minutesToday } from "@/lib/usage-store";
import { Bedtime } from "@/components/ollie/Bedtime";
import { TabBar } from "@/components/ollie/TabBar";
import { SlideshowTakeover, type SlideshowChild } from "@/components/ollie/Slideshow";
import { setPrefs, slideshowDue } from "@/lib/slideshow-store";
import { effectiveBand } from "@/lib/slideshow/library";
import { onboardingState, syncProfile } from "@/lib/onboarding-store";
import { pushAll } from "@/lib/cloud-sync";
import { supabase } from "@/integrations/supabase/client";

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
  const [takeover, setTakeover] = useState(false);
  const [bedtime, setBedtime] = useState(false);
  const [child, setChild] = useState<SlideshowChild>({
    name: "friend",
    band: "7-9",
    interests: [],
  });

  /* The daily lesson takes over the app until it is done for the day. */
  useEffect(() => {
    syncProfile();
    setPrefs({ resetTime: onboardingState.slideshowReset });
    setChild({
      name: onboardingState.name || "friend",
      band: effectiveBand(onboardingState.age || 7, onboardingState.readingLevel ?? "stories"),
      interests: onboardingState.interests,
    });
    setTakeover(slideshowDue());
  }, []);

  /* Save the child's progress to the parent's account while signed in. */
  useEffect(() => {
    const save = () => { void pushAll(); };
    save();
    const t = window.setInterval(save, 60_000);
    const onHide = () => { if (document.visibilityState === "hidden") save(); };
    document.addEventListener("visibilitychange", onHide);
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") window.setTimeout(save, 0);
    });
    return () => {
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", onHide);
      sub.subscription.unsubscribe();
    };
  }, []);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /* Count Search and Create time only, never while the lesson is open. */
  useEffect(() => {
    const surface = pathname === "/search" ? "search" : pathname === "/create" ? "create" : null;
    if (!surface || takeover) { setBedtime(false); return; }
    const check = () => setBedtime(minutesToday() >= onboardingState.limitMinutes);
    check();
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") addUsage(surface, 15);
      check();
    }, 15_000);
    return () => window.clearInterval(t);
  }, [pathname, takeover]);

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
      {bedtime && !takeover && <Bedtime name={child.name} />}
      {takeover && <SlideshowTakeover child={child} onClose={() => setTakeover(false)} />}
    </div>
  );
}

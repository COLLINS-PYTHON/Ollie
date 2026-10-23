import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { addUsage, minutesToday } from "@/lib/usage-store";
import { Bedtime } from "@/components/ollie/Bedtime";
import { TabBar } from "@/components/ollie/TabBar";
import { SlideshowTakeover, type SlideshowChild } from "@/components/ollie/Slideshow";
import { setPrefs, slideshowDue } from "@/lib/slideshow-store";
import { endReview, useSlideshowReview } from "@/lib/review-store";
import { effectiveBand } from "@/lib/slideshow/library";
import { onboardingState, loadProfile } from "@/lib/onboarding-store";
import { childName } from "@/lib/meta";
import { resolveAppEntry } from "@/lib/app-entry";
import { pushAll } from "@/lib/cloud-sync";
import { KidSwitcher } from "@/components/ollie/KidSwitcher";
import { activeKidId } from "@/lib/kid-storage";
import { Button } from "@/components/ui/button";
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
  const [kidVersion, setKidVersion] = useState(0);
  const [chooseKid, setChooseKid] = useState(false);
  const [ready, setReady] = useState(false);
  const [takeover, setTakeover] = useState(false);
  const review = useSlideshowReview();
  const [bedtime, setBedtime] = useState(false);
  const [child, setChild] = useState<SlideshowChild>({
    name: "",
    age: 7,
    band: "7-9",
    interests: [],
    needsReadAloud: false,
  });

  /* The daily lesson takes over the app until it is done for the day. */
  useEffect(() => {
    let active = true;
    const hydrate = async () => {
    await resolveAppEntry().catch(() => undefined);
    if (!active) return;
    loadProfile();
    setPrefs({ resetTime: onboardingState.slideshowReset });
    setChild({
      name: childName(onboardingState.name),
      age: onboardingState.age || 7,
      band: effectiveBand(onboardingState.age || 7, onboardingState.readingLevel ?? "stories"),
      interests: onboardingState.interests,
      // Voice-first lessons (auto narration) are for younger kids only; older kids tap to hear.
      needsReadAloud: (onboardingState.age || 7) < 8,
    });
    setTakeover(slideshowDue());
    setReady(true);
    };
    void hydrate();
    return () => { active = false; };
  }, [kidVersion]);

  useEffect(() => { const changed = () => { setChooseKid(false); setKidVersion(n => n + 1); }; window.addEventListener("ollie-kid-changed", changed); return () => window.removeEventListener("ollie-kid-changed", changed); }, []);

  /* Save the child's progress to the parent's account while signed in. */
  useEffect(() => {
    if (!ready) return;
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
  }, [ready]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => document.documentElement.style.setProperty("--app-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
    update();
    viewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    return () => {
      viewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--app-viewport-height");
    };
  }, []);

  /* Count Search and Create time only, never while the lesson is open. */
  useEffect(() => {
    const surface = pathname === "/search" ? "search" : pathname === "/create" ? "create" : null;
    if (!ready || !surface || takeover || review) { setBedtime(false); return; }
    const check = () => setBedtime(minutesToday() >= onboardingState.limitMinutes);
    check();
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") addUsage(surface, 15);
      check();
    }, 15_000);
    return () => window.clearInterval(t);
  }, [pathname, takeover, review, ready]);

  return (
    <div className={`tabs-shell relative min-h-screen bg-background ${pathname === "/search" ? "tabs-search" : ""}`}>
      <div className="parent-access mx-auto flex w-full max-w-md justify-end px-5 pt-4 absolute inset-x-0 top-0 z-30">
        <Link
          to="/parent"
          aria-label="Parent Dashboard"
          className="frosted flex size-10 items-center justify-center rounded-pill text-muted-foreground shadow-card transition-transform duration-tap active:scale-95"
        >
          <ParentIcon />
        </Link>
      </div>
      {ready && <><div className="kid-identity z-30"><Button variant="ghost" className="h-10 max-w-full truncate rounded-pill text-support" onClick={() => setChooseKid(v => !v)} aria-expanded={chooseKid}>{child.name}</Button></div>{chooseKid && <div className="absolute inset-x-5 top-16 z-40 mx-auto max-w-md rounded-card border border-border bg-card p-3 shadow-sheet"><KidSwitcher /></div>}<div key={activeKidId()} className="contents"><Outlet /></div></>}
      {ready && <TabBar />}
      {bedtime && !takeover && !review && <Bedtime name={child.name} />}
      {(takeover || review) && <SlideshowTakeover key={`${activeKidId()}-${review?.label ?? "daily"}`} child={child} review={review ?? undefined} onClose={() => { setTakeover(false); endReview(); }} />}
    </div>
  );
}

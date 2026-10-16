import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { CrispOrb } from "@/components/ollie/CrispOrb";
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";
import { useServerFn } from "@tanstack/react-start";
import { generateCustomLesson } from "@/lib/custom-lesson.functions";
import { customTopic, loadCustom, saveCustom } from "@/lib/custom-lesson-store";
import { effectiveBand } from "@/lib/slideshow/library";
import { streamImage } from "@/lib/stream-image";

export const Route = createFileRoute("/onboarding/building")({
  head: () => pageMeta("Building your child's Ollie", "Ollie is getting ready for your child."),
  component: BuildingPage,
});

function BuildingPage() {
  const navigate = useNavigate();
  const name = childName(onboardingState.name);
  const [step, setStep] = useState(0);
  const [askReminder, setAskReminder] = useState(false);
  const [permissionNote, setPermissionNote] = useState("");
  const [answered, setAnswered] = useState(false);
  const items = ["Age-appropriate answers", "Their interests, at the heart", "Learning at their reading level", "Your chosen reply tone"];
  const done = step > items.length;

  useEffect(() => {
    if (done) return;
    if (step === 2 && !answered) { setAskReminder(true); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [step, answered, done]);

  /* Custom-topic lesson: written during this wait so it is ready as the first slideshow. */
  const makeLesson = useServerFn(generateCustomLesson);
  useEffect(() => {
    const pick = customTopic();
    if (!pick) return;
    const existing = loadCustom();
    if (existing && existing.topic === pick.topic) return;
    const band = effectiveBand(onboardingState.age || 7, onboardingState.readingLevel ?? "stories");
    makeLesson({ data: { topic: pick.topic, age: onboardingState.age || 7, band, struggle: pick.struggle } })
      .then((res) => {
        if (!res.ok) return;
        saveCustom({ topic: pick.topic, lesson: res.lesson, done: false });
        // The picture keeps loading in the background while the child reads.
        void streamImage("/api/generate-image", { prompt: res.lesson.picture }, (url, isFinal) => {
          if (isFinal) { const cur = loadCustom(); if (cur && cur.topic === pick.topic) saveCustom({ ...cur, image: url }); }
        }).catch(() => {});
      })
      .catch(() => {});
  }, [makeLesson]);

  function dismissReminder() {
    setAskReminder(false);
    setAnswered(true);
  }
  async function allowReminder() {
    if (window.top !== window.self) { setPermissionNote("Open Ollie in its own tab to allow notifications. You can continue without them."); return; }
    if (!("Notification" in window)) { setPermissionNote("Notifications are not available in this browser. On iPhone, add Ollie to your Home Screen first."); return; }
    try {
      const permission = await Notification.requestPermission();
      localStorage.setItem("ollie-trial-reminder-permission", permission);
      setPermissionNote(permission === "granted" ? "Permission allowed. Trial reminders will be available once notification delivery is connected." : "No problem. You can continue without a reminder.");
    } catch { setPermissionNote("Notifications could not be enabled here. You can continue without them."); }
  }
  return (
    <div className="building-screen min-h-screen bg-background">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-28 pt-12 text-center">
        <p className="text-label mb-3 text-primary">A little preparation. A world of discovery.</p>
        <h1 className="text-title text-foreground">{done ? `Made for ${name}. Ready to explore.` : `Making room for ${name}'s curiosity`}</h1>
        <p className="text-support mt-4 max-w-sm text-muted-foreground">Their age, interests and reading level shape the way Ollie answers.</p>
        <div className="relative my-7 flex size-36 shrink-0 items-center justify-center">
          {done ? <img src={ollie} alt="Ollie" className="size-36 object-contain" /> : <CrispOrb state="composing" size={112} aria-label="Preparing Ollie" />}
        </div>
        <ul className="building-checklist w-full text-left" aria-label="Personalizing Ollie">
          {items.map((it, i) => <li key={it} className={`flex items-center gap-4 border-b border-border py-4 transition-opacity duration-element ${step > i ? "opacity-100" : "opacity-40"}`}>
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-pill ${step > i ? "bg-success-soft text-success" : "bg-surface-2 text-muted-foreground"}`}>
              {step > i ? <Check className="size-4" /> : <span className="text-label">{i + 1}</span>}
            </span><span className="text-body text-foreground">{it}</span>
          </li>)}
        </ul>
        <p className="text-support mt-6 flex items-center justify-center gap-2 text-muted-foreground"><ShieldCheck className="size-4 shrink-0" />Your settings stay in your hands.</p>
      </main>
      <Drawer open={askReminder} onOpenChange={(open) => { if (!open) dismissReminder(); }} shouldScaleBackground={false}>
        <DrawerContent className="onboarding-theme trial-reminder-sheet mx-auto max-w-md px-6 pb-6">
          <Bell className="mx-auto mb-4 size-8 text-primary" />
          <DrawerTitle className="text-title text-center">Should we remind you before your trial ends?</DrawerTitle>
          <DrawerDescription className="text-support mt-3 text-center">Allow notifications so Ollie can send a trial reminder. Reminder delivery is not available yet.</DrawerDescription>
          {permissionNote && <p role="status" className="text-support mt-4 text-center text-muted-foreground">{permissionNote}</p>}
          <Button variant="onboarding" className="mt-6 h-14 rounded-pill" onClick={() => permissionNote ? dismissReminder() : void allowReminder()}>{permissionNote ? "Continue" : "Allow notifications"}</Button>
          {!permissionNote && <Button variant="ghost" className="mt-2 h-12 rounded-pill" onClick={dismissReminder}>Not now</Button>}
        </DrawerContent>
      </Drawer>
      {done && <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md px-6 pb-6"><Button variant="onboarding" className="h-14 w-full rounded-pill" onClick={() => navigate({ to: "/onboarding/paywall" })}>See {name}'s plan</Button></div>}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, Clock, Delete, Flame, Image as ImageIcon, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import {
  onboardingState,
  parentSettings,
  formatMinutes,
  formatClock,
  loadProfile,
  saveProfile,
  TONE_LABELS,
} from "@/lib/onboarding-store";
import { loadChat, saveChat, type ChatMessage } from "@/lib/chat-store";
import { addCookies, cookiesLeft, JARS, loadBalance, saveBalance, type Balance } from "@/lib/picture-store";
import { completions, prefs, setPrefs, streakDays, type SlideshowPrefs } from "@/lib/slideshow-store";
import { minutesToday } from "@/lib/usage-store";
import { INTERESTS } from "@/lib/interests";
import { checkPin, clearFails, deleteCloudData, deviceKey, listDevices, revokeDevice, signOutHere, type DeviceRow, hasPin, lockedSeconds, PIN_LOCK, pushAll, recordFail, sealPin } from "@/lib/cloud-sync";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent Dashboard | Ollie" },
      { name: "description", content: "See what your child asked, set screen time and manage Ollie." },
      { property: "og:title", content: "Parent Dashboard | Ollie" },
      { property: "og:description", content: "See what your child asked, set screen time and manage Ollie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ParentDashboard,
});

/* Unlocked once per app session so moving between tabs doesn't re-ask. */
let unlocked = false;

const SUPPORT_EMAIL = "support@ollie.app";
const DAY = 86_400_000;

/* ---------- icons: thin 1.8px line icons, one detail each ---------- */
function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
const ICONS = {
  screen: ( // clock with a highlighted progress arc
    <LineIcon><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" strokeWidth={3} /><path d="M12 8v4l2.5 2" /></LineIcon>
  ),
  slideshow: ( // stacked cards with a play triangle
    <LineIcon><rect x="3" y="7" width="14" height="12" rx="2" /><path d="M7 4h12a2 2 0 0 1 2 2v9" /><path d="m8.5 10.5 4 2.5-4 2.5z" /></LineIcon>
  ),
  history: ( // chat bubble with a faint echo bubble behind
    <LineIcon><path d="M8 5h11a2 2 0 0 1 2 2v6" opacity={0.4} /><path d="M4 9h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3.5 3v-3H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" /></LineIcon>
  ),
  tone: ( // reply bubble with a small smile
    <LineIcon><path d="M12 4c5 0 9 3.1 9 7s-4 7-9 7c-1 0-2-.1-2.9-.4L5 19.5l1-3.6C4.2 14.6 3 12.9 3 11c0-3.9 4-7 9-7Z" /><path d="M9 12c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5" /></LineIcon>
  ),
  sound: ( // speaker with staggered dotted sound waves
    <LineIcon><path d="M4 9.5h3l4-3.5v12l-4-3.5H4z" /><path d="M14.5 9.5a3.5 3.5 0 0 1 0 5" strokeDasharray="1.5 2" /><path d="M17 7a7 7 0 0 1 0 10" strokeDasharray="1.5 2.5" /></LineIcon>
  ),
  jar: ( // jar with cookie dots
    <LineIcon><path d="M8 3h8v3H8z" /><path d="M7 6h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Z" /><circle cx="10" cy="12" r=".8" /><circle cx="14" cy="14.5" r=".8" /><circle cx="10.5" cy="17" r=".8" /></LineIcon>
  ),
  subscription: ( // card with a recurring-loop badge
    <LineIcon><rect x="2.5" y="5" width="15" height="11" rx="2" /><path d="M2.5 9h15" /><path d="M21 15.5a3.5 3.5 0 1 1-1-2.5" /><path d="M20.5 11.5V13H19" /></LineIcon>
  ),
  interests: ( // star cluster with a sparkle
    <LineIcon><path d="m9 6 1.2 2.6 2.8.3-2.1 1.9.6 2.8L9 12.2l-2.5 1.4.6-2.8L5 8.9l2.8-.3z" /><path d="m16 13 .8 1.7 1.9.2-1.4 1.3.4 1.9-1.7-.9-1.7.9.4-1.9-1.4-1.3 1.9-.2z" /><path d="M19 4v3M17.5 5.5h3" /></LineIcon>
  ),
  devices: ( // phone with a small signal arc
    <LineIcon><rect x="6" y="2.5" width="10" height="19" rx="2.5" /><path d="M10 18.5h2" /><path d="M18.5 8a4 4 0 0 1 0 5" strokeDasharray="1.5 2" /></LineIcon>
  ),
  support: ( // headset
    <LineIcon><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></LineIcon>
  ),
  trash: (
    <LineIcon><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /><path d="M10 11v6M14 11v6" /></LineIcon>
  ),
};

/* ---------- shared pieces ---------- */
function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Drawer open onOpenChange={(open) => { if (!open) onClose(); }} shouldScaleBackground={false}>
      <DrawerContent aria-describedby={undefined} className="mx-auto max-h-[85svh] w-full max-w-md bg-card px-5 pb-8 shadow-sheet">
        <div className="mb-4 flex items-center justify-between">
          <DrawerTitle className="text-body font-bold text-foreground">{title}</DrawerTitle>
          <Button variant="control" size="icon" type="button" aria-label="Close" onClick={onClose} className="size-9 rounded-pill bg-surface text-muted-foreground">
            <X className="size-4" />
          </Button>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

function Choice({ on, label, hint, onClick }: { on: boolean; label: string; hint?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-control border px-4 py-3 text-left transition-colors duration-tap ${on ? "border-primary bg-surface" : "border-surface-2 bg-white"}`}
    >
      <div className="flex-1">
        <div className="text-body text-foreground">{label}</div>
        {hint && <div className="text-support text-muted-foreground">{hint}</div>}
      </div>
      {on && <Check className="size-5 text-primary" />}
    </button>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-pill transition-colors duration-tap ${on ? "bg-primary" : "bg-surface-2"}`}
    >
      <span className={`absolute top-0.5 size-6 rounded-pill bg-white shadow-card transition-all duration-tap ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 px-1 text-label uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ul className="overflow-hidden rounded-card border border-surface-2 bg-white">{children}</ul>
    </section>
  );
}

function Row({ icon, color, label, value, onClick, trailing }: { icon: ReactNode; color: string; label: string; value: string; onClick?: () => void; trailing?: ReactNode }) {
  const inner = (
    <>
      <span className={color}>{icon}</span>
      <div className="min-w-0 flex-1 text-left">
        <div className="text-body text-foreground">{label}</div>
        <div className="truncate text-support text-muted-foreground">{value}</div>
      </div>
      {trailing ?? <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.8} />}
    </>
  );
  return (
    <li className="border-t border-surface-2 first:border-t-0">
      {onClick ? (
        <button type="button" onClick={onClick} className="flex w-full items-center gap-4 px-4 py-3.5 active:bg-surface">{inner}</button>
      ) : (
        <div className="flex items-center gap-4 px-4 py-3.5">{inner}</div>
      )}
    </li>
  );
}

/* ---------- PIN gate ---------- */
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [creating] = useState(() => !hasPin());
  const [first, setFirst] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const press = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError("");
    if (next.length < 4) return;
    window.setTimeout(async () => {
      if (!creating) {
        const wait = lockedSeconds(PIN_LOCK);
        if (wait) { setError(`Too many tries. Wait ${wait} seconds.`); setPin(""); return; }
        if (await checkPin(next)) { clearFails(PIN_LOCK); onUnlock(); }
        else {
          const locked = recordFail(PIN_LOCK);
          setError(locked ? `Too many tries. Wait ${locked} seconds.` : "That PIN didn't match. Try again.");
          setPin("");
        }
      } else if (!first) {
        setFirst(next); setPin("");
      } else if (next === first) {
        onboardingState.pin = next; await sealPin(); void pushAll(); onUnlock();
      } else {
        setError("Those didn't match. Start again."); setFirst(""); setPin("");
      }
    }, 150);
  };

  const title = creating ? (first ? "Enter it once more" : "Create a parent PIN") : "Enter your parent PIN";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white px-5 pt-4">
      <Link to="/search" aria-label="Back" className="flex size-10 items-center justify-center rounded-pill bg-surface text-foreground">
        <ChevronLeft className="size-5" />
      </Link>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-16">
        <h1 className="text-title text-foreground">{title}</h1>
        <div className="flex gap-4" aria-label={`${pin.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`size-3.5 rounded-pill transition-colors duration-tap ${i < pin.length ? "bg-primary" : "bg-surface-2"}`} />
          ))}
        </div>
        <p className="h-5 text-support text-destructive" role="alert">{error}</p>
        <div className="grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((k) =>
            k === "" ? <span key="blank" /> : (
              <button
                key={k}
                type="button"
                aria-label={k === "del" ? "Delete digit" : k}
                onClick={() => (k === "del" ? setPin(pin.slice(0, -1)) : press(k))}
                className="flex size-[72px] items-center justify-center rounded-pill bg-surface text-title text-foreground active:scale-95"
              >
                {k === "del" ? <Delete className="size-5" /> : k}
              </button>
            ),
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------- dashboard ---------- */
type SheetId = null | "flagged" | "screen" | "slideshow" | "history" | "tone" | "jar" | "subscription" | "interests" | "support" | "delete" | "devices";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function ParentDashboard() {
  const [ready, setReady] = useState(false);
  const [isUnlocked, setUnlocked] = useState(false);
  const [sheet, setSheet] = useState<SheetId>(null);
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [usedMin, setUsedMin] = useState(0);
  const [slidePrefs, setSlidePrefs] = useState<SlideshowPrefs>({ enabled: true, resetTime: "07:00", resetMode: "24h" });

  useEffect(() => {
    if (!onboardingState.name) loadProfile();
    setChat(loadChat());
    setBalance(loadBalance());
    setUsedMin(minutesToday());
    setSlidePrefs(prefs());
    setUnlocked(unlocked);
    setReady(true);
  }, []);

  if (!ready) return <main className="min-h-screen bg-white" />;
  if (!isUnlocked) return <PinGate onUnlock={() => { unlocked = true; setUnlocked(true); }} />;

  const child = onboardingState.name || "your child";
  const parent = onboardingState.parentName.trim();

  // Flagged items: each flagged reply paired with the question that caused it.
  const flagged = chat.flatMap((m, i) => {
    if (m.role !== "received" || !m.tier || m.tier === "ok") return [];
    const q = [...chat.slice(0, i)].reverse().find((x) => x.role === "sent");
    return [{ id: m.id, question: q?.text ?? "", reason: m.flagReason || "Needed a grown-up", at: q?.createdAt ?? m.createdAt }];
  }).reverse();

  const weekAgo = Date.now() - 7 * DAY;
  const weekLessons = completions().filter((c) => c.at >= weekAgo);
  const weekQuestions = chat.filter((m) => m.role === "sent" && m.createdAt >= weekAgo).length;
  const wowMoments = chat.flatMap((m, i) => {
    if (m.role !== "received" || m.reaction !== "wow" || m.createdAt < weekAgo) return [];
    const q = [...chat.slice(0, i)].reverse().find((x) => x.role === "sent");
    return q ? [{ id: m.id, question: q.text }] : [];
  }).slice(-3).reverse();
  const quizAvg = weekLessons.length
    ? Math.round((weekLessons.reduce((s, c) => s + c.correct / Math.max(c.total, 1), 0) / weekLessons.length) * 100)
    : null;

  const update = (fn: () => void) => { fn(); saveProfile(); refresh(); };
  const toneValue = onboardingState.tone === "custom" ? onboardingState.customTone || "Your own tone" : TONE_LABELS[onboardingState.tone ?? ""] ?? "Not set";
  const interestLabels = [
    ...onboardingState.interests.map((id) => INTERESTS.find((i) => i.id === id)?.label ?? id),
    ...(onboardingState.customInterest.trim() ? [onboardingState.customInterest.trim()] : []),
  ];
  const retentionLabel = { 1: "24 hours", 7: "1 week", 30: "1 month" }[parentSettings.retentionDays];

  return (
    <main className="screen-enter mx-auto min-h-screen w-full max-w-md bg-white px-5 pb-16 pt-4">
      <div className="flex items-center justify-between">
        <Link to="/search" aria-label="Back" className="flex size-10 items-center justify-center rounded-pill bg-surface text-foreground active:scale-95">
          <ChevronLeft className="size-5" />
        </Link>
        <div className="flex size-10 items-center justify-center rounded-pill bg-primary text-button text-white" aria-hidden>
          {(parent || "P").charAt(0).toUpperCase()}
        </div>
      </div>

      <h1 className="mt-5 text-title text-foreground">{greeting()}{parent ? `, ${parent}` : ""}</h1>
      <p className="mt-1 text-support text-muted-foreground">Here is how {child} is doing today.</p>

      {/* Stat row */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          { icon: Clock, tile: "from-cat-math to-cat-math-deep", value: formatMinutes(usedMin), label: "Screen time today" },
          { icon: Flame, tile: "from-cat-weather to-cat-weather-deep", value: String(streakDays()), label: "Day streak" },
          { icon: ImageIcon, tile: "from-cat-art to-cat-art-deep", value: String(balance?.freeUsed ?? 0), label: "Images today" },
        ].map((s) => (
          <div key={s.label} className="rounded-card border border-surface-2 bg-white p-3">
            <div className={`glossy flex size-9 items-center justify-center rounded-control bg-gradient-to-b ${s.tile}`}>
              <s.icon className="size-4.5 text-white" strokeWidth={2} />
            </div>
            <p className="mt-2 text-body font-bold text-foreground">{s.value}</p>
            <p className="text-label text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Flagged alert card */}
      <button
        type="button"
        onClick={() => setSheet("flagged")}
        className="mt-4 flex w-full items-center gap-3 rounded-card border border-destructive/20 bg-destructive/[0.07] p-4 text-left"
      >
        <span className="flex size-9 items-center justify-center rounded-pill bg-destructive/15 text-body font-bold text-destructive">{flagged.length}</span>
        <div className="flex-1">
          <p className="text-body font-bold text-foreground">
            {flagged.length === 1 ? "1 flagged search" : `${flagged.length} flagged searches`}
          </p>
          <p className="text-support text-destructive">View what was asked and why</p>
        </div>
        <ChevronRight className="size-5 text-destructive" strokeWidth={1.8} />
      </button>

      {/* Weekly report */}
      <div className="scalloped bg-gradient-wash mt-4 rounded-card p-5">
        <p className="text-label uppercase tracking-wide text-muted-foreground">This week</p>
        <p className="mt-1 text-body font-bold text-foreground">{child}'s weekly report</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { v: String(weekLessons.length), l: "Slideshows" },
            { v: String(weekQuestions), l: "Questions" },
            { v: quizAvg === null ? "None yet" : `${quizAvg}%`, l: "Quiz average" },
          ].map((s) => (
            <div key={s.l} className="rounded-control bg-white/80 px-2 py-3">
              <p className="text-body font-bold text-foreground">{s.v}</p>
              <p className="text-label text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
        {wowMoments.length > 0 && (
          <div className="mt-3 rounded-control bg-white/80 p-3">
            <p className="text-label uppercase tracking-wide text-muted-foreground">Wow moments</p>
            <ul className="mt-1.5 flex flex-col gap-1">
              {wowMoments.map((w) => (
                <li key={w.id} className="text-support text-foreground">"{w.question}"</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Section title="Controls">
        <Row icon={ICONS.screen} color="text-accent-1" label="Screen time" value={`${formatMinutes(onboardingState.limitMinutes)} a day, Search and Create only`} onClick={() => setSheet("screen")} />
        <Row icon={ICONS.slideshow} color="text-accent-4" label="Slideshow settings" value={!slidePrefs.enabled ? "Off" : slidePrefs.resetMode === "24h" ? "On, new lesson 24 hours after the last" : `On, new lesson every day at ${formatClock(slidePrefs.resetTime)}`} onClick={() => setSheet("slideshow")} />
        <Row icon={ICONS.history} color="text-accent-2" label="Chat history" value={`Kept for ${retentionLabel}`} onClick={() => setSheet("history")} />
        <Row icon={ICONS.tone} color="text-accent-3" label="Reply tone" value={toneValue} onClick={() => setSheet("tone")} />
        <Row
          icon={ICONS.sound}
          color="text-accent-2"
          label="Sound"
          value={parentSettings.soundOn ? "On" : "Off"}
          trailing={<Toggle label="Sound" on={parentSettings.soundOn} onChange={(v) => update(() => { parentSettings.soundOn = v; })} />}
        />
      </Section>

      <Section title="Account">
        <Row icon={ICONS.jar} color="text-gold" label="Cookie jars" value={`${balance ? cookiesLeft(balance) : 0} picture cookies left today`} onClick={() => setSheet("jar")} />
        <Row icon={ICONS.subscription} color="text-accent-1" label="Subscription" value={`Free trial, ${onboardingState.plan === "monthly" ? "Monthly" : "Yearly"} plan`} onClick={() => setSheet("subscription")} />
        <Row icon={ICONS.interests} color="text-accent-3" label={`${child}'s interests`} value={interestLabels.join(", ") || "None picked yet"} onClick={() => setSheet("interests")} />
      </Section>

      <Section title="Devices">
        <Row icon={ICONS.devices} color="text-accent-2" label="Signed-in devices" value="See where your account is logged in" onClick={() => setSheet("devices")} />
      </Section>

      <Section title="Privacy">
        <Row icon={ICONS.trash} color="text-destructive" label="Delete my data" value="Remove chats, pictures and the profile" onClick={() => setSheet("delete")} />
      </Section>

      <Section title="Support">
        <Row icon={ICONS.support} color="text-accent-2" label="Ask us anything" value="Chat with the Ollie team" onClick={() => setSheet("support")} />
      </Section>
      <p className="mt-3 px-1 text-support text-muted-foreground">
        Or email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-primary">{SUPPORT_EMAIL}</a>
      </p>

      <div className="mt-5 rounded-card border border-surface-2 bg-surface p-5 text-center">
        <p className="text-body font-bold text-foreground">Enjoying Ollie?</p>
        <p className="mt-1 text-support text-muted-foreground">If Ollie has been good for your family, a rating helps other parents find us. No pressure at all.</p>
        <Button type="button" variant="control" disabled className="mt-3 rounded-pill border border-surface-2 bg-card px-6 py-2.5 text-button text-foreground">
          Rate Ollie
        </Button>
        <p className="mt-2 text-support text-muted-foreground">Ratings will be available when Ollie launches in the app stores.</p>
      </div>

      {sheet === "flagged" && (
        <Sheet title="Flagged searches" onClose={() => setSheet(null)}>
          {flagged.length === 0 ? (
            <p className="text-body text-muted-foreground">Nothing flagged. If {child} asks something that needs a grown-up, you'll see exactly what was asked and why here.</p>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {flagged.map((f) => (
                <li key={f.id} className="rounded-control border border-surface-2 p-3.5">
                  <p className="text-body text-foreground">"{f.question}"</p>
                  <p className="mt-1 text-support text-destructive">{f.reason}</p>
                  <p className="text-label text-muted-foreground">{new Date(f.at).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" })}</p>
                </li>
              ))}
            </ul>
          )}
        </Sheet>
      )}

      {sheet === "screen" && (
        <Sheet title="Screen time" onClose={() => setSheet(null)}>
          <p className="text-support text-muted-foreground">Daily limit for Search and Create. The daily slideshow never counts toward it.</p>
          <div className="mt-4 flex items-center justify-between rounded-control bg-surface p-3">
            <button type="button" aria-label="Less time" onClick={() => update(() => { onboardingState.limitMinutes = Math.max(15, onboardingState.limitMinutes - 15); })} className="size-11 rounded-pill bg-white text-title text-foreground shadow-card">-</button>
            <span className="text-title text-foreground">{formatMinutes(onboardingState.limitMinutes)}</span>
            <button type="button" aria-label="More time" onClick={() => update(() => { onboardingState.limitMinutes = Math.min(240, onboardingState.limitMinutes + 15); })} className="size-11 rounded-pill bg-white text-title text-foreground shadow-card">+</button>
          </div>
          <p className="mt-3 text-support text-muted-foreground">Used today: {formatMinutes(usedMin)}</p>
        </Sheet>
      )}

      {sheet === "slideshow" && (
        <Sheet title="Slideshow settings" onClose={() => setSheet(null)}>
          <div className="flex items-center justify-between">
            <span className="text-body text-foreground">Daily slideshow</span>
            <Toggle label="Daily slideshow" on={slidePrefs.enabled} onChange={(v) => { setPrefs({ enabled: v }); setSlidePrefs(prefs()); }} />
          </div>
          <p className="mt-5 text-body text-foreground">When does a new lesson unlock?</p>
          <div className="mt-2 flex flex-col gap-2.5" role="radiogroup">
            <Choice on={slidePrefs.resetMode === "24h"} label="24 hours after the last one" hint="Counts from when the lesson was finished" onClick={() => { setPrefs({ resetMode: "24h" }); setSlidePrefs(prefs()); }} />
            <Choice on={slidePrefs.resetMode === "time"} label="Every day at a set time" hint="Same time each day" onClick={() => { setPrefs({ resetMode: "time" }); setSlidePrefs(prefs()); }} />
          </div>
          {slidePrefs.resetMode === "time" && (
          <label className="mt-4 flex items-center justify-between">
            <span className="text-body text-foreground">Reset time</span>
            <input
              type="time"
              value={slidePrefs.resetTime}
              onChange={(e) => {
                const t = e.target.value || "07:00";
                setPrefs({ resetTime: t });
                update(() => { onboardingState.slideshowReset = t; });
                setSlidePrefs(prefs());
              }}
              className="rounded-control border border-surface-2 px-3 py-2 text-body text-foreground"
            />
          </label>
          )}
        </Sheet>
      )}

      {sheet === "history" && (
        <Sheet title="Chat history" onClose={() => setSheet(null)}>
          <div className="flex flex-col gap-2.5" role="radiogroup">
            {([1, 7, 30] as const).map((d) => (
              <Choice
                key={d}
                on={parentSettings.retentionDays === d}
                label={{ 1: "24 hours", 7: "1 week", 30: "1 month" }[d]}
                onClick={() => update(() => { parentSettings.retentionDays = d; saveChat(loadChat()); setChat(loadChat()); })}
              />
            ))}
          </div>
        </Sheet>
      )}

      {sheet === "tone" && (
        <Sheet title="Reply tone" onClose={() => setSheet(null)}>
          <div className="flex flex-col gap-2.5" role="radiogroup">
            {Object.entries(TONE_LABELS).map(([id, label]) => (
              <Choice key={id} on={onboardingState.tone === id} label={label} onClick={() => update(() => { onboardingState.tone = id; })} />
            ))}
            <Choice on={onboardingState.tone === "custom"} label="Describe it yourself" onClick={() => update(() => { onboardingState.tone = "custom"; })} />
            {onboardingState.tone === "custom" && (
              <input
                value={onboardingState.customTone}
                onChange={(e) => update(() => { onboardingState.customTone = e.target.value; })}
                placeholder="For example: calm and funny"
                className="rounded-control border border-surface-2 px-4 py-3 text-body text-foreground"
              />
            )}
          </div>
        </Sheet>
      )}

      {sheet === "jar" && balance && (
        <Sheet title="Cookie jars" onClose={() => setSheet(null)}>
          <p className="text-body text-foreground">{cookiesLeft(balance)} picture cookies left today</p>
          <p className="text-support text-muted-foreground">10 free each day, plus {balance.jarCookies} from jars.</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {JARS.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => { const b = addCookies(loadBalance(), j.count); saveBalance(b); setBalance(b); }}
                className="flex items-center justify-between rounded-control border border-surface-2 px-4 py-3"
              >
                <span className="text-body text-foreground">{j.count} cookies</span>
                <span className="text-button text-primary">{j.price}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-label text-muted-foreground">Test mode: nothing is charged yet.</p>
        </Sheet>
      )}

      {sheet === "devices" && <DevicesSheet onClose={() => setSheet(null)} />}

      {sheet === "subscription" && (
        <Sheet title="Subscription" onClose={() => setSheet(null)}>
          <p className="text-body text-foreground">{onboardingState.plan === "monthly" ? "Monthly, $11.99 a month" : "Yearly, $99.99 a year"}</p>
          <p className="text-support text-muted-foreground">Payments are not connected yet. No subscription has been started and nothing has been charged.</p>
          <div className="mt-4 flex flex-col gap-2.5">
            <Button type="button" disabled className="rounded-pill bg-primary py-3 text-button text-primary-foreground">Manage subscription</Button>
            <RestoreButton />
          </div>
        </Sheet>
      )}

      {sheet === "interests" && (
        <Sheet title={`${child}'s interests`} onClose={() => setSheet(null)}>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => {
              const on = onboardingState.interests.includes(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update(() => {
                    onboardingState.interests = on ? onboardingState.interests.filter((x) => x !== i.id) : [...onboardingState.interests, i.id];
                  })}
                  className={`rounded-pill border px-3.5 py-2 text-support ${on ? "border-primary bg-surface text-foreground" : "border-surface-2 text-muted-foreground"}`}
                >
                  {i.label}
                </button>
              );
            })}
          </div>
          <input
            value={onboardingState.customInterest}
            onChange={(e) => update(() => { onboardingState.customInterest = e.target.value; })}
            placeholder="Add your own interest"
            className="mt-4 w-full rounded-control border border-surface-2 px-4 py-3 text-body text-foreground"
          />
        </Sheet>
      )}

      {sheet === "support" && <SupportSheet onClose={() => setSheet(null)} />}
      {sheet === "delete" && <DeleteSheet child={child} onClose={() => setSheet(null)} />}
    </main>
  );
}

function RestoreButton() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <Button type="button" variant="control" onClick={() => setMsg("Purchases cannot be checked until payments are connected.")} className="rounded-pill border border-surface-2 py-3 text-button text-foreground">
        Restore Purchases
      </Button>
      {msg && <p className="text-support text-muted-foreground" role="status">{msg}</p>}
    </>
  );
}

function SupportSheet({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  return (
    <Sheet title="Ask us anything" onClose={onClose}>
      <div className="flex min-h-40 flex-col gap-2">
        <p className="max-w-[80%] self-start rounded-[18px] rounded-bl-[4px] bg-surface-2 px-4 py-2.5 text-body text-foreground">
          Hi! This goes to the Ollie team, not to Ollie. How can we help?
        </p>
        {sent.map((s, i) => (
          <p key={i} className="max-w-[75%] self-end rounded-[18px] rounded-br-[4px] bg-primary px-4 py-2.5 text-body text-white">{s}</p>
        ))}
        {sent.length > 0 && (
          <p className="text-label text-muted-foreground">Thanks! We reply by email, usually within a day.</p>
        )}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => { e.preventDefault(); if (text.trim()) { setSent([...sent, text.trim()]); setText(""); } }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question" className="flex-1 rounded-pill border border-surface-2 px-4 py-2.5 text-body text-foreground" />
        <button type="submit" disabled={!text.trim()} className="rounded-pill bg-primary px-5 text-button text-white disabled:bg-surface-2">Send</button>
      </form>
    </Sheet>
  );
}

function DeleteSheet({ child, onClose }: { child: string; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const wipe = async () => {
    await deleteCloudData().catch(() => undefined);
    ["ollie-chat-v1", "ollie-profile-v1", "ollie-slideshow-v1", "ollie-usage-v1", "ollie-cookies-v1", "ollie-custom-lesson-v1", "ollie-onboarding-draft-v1", "ollie-onboarding-step-v1"].forEach((k) => localStorage.removeItem(k));
    sessionStorage.removeItem("ollie-onboarding-draft-v1");
    indexedDB.deleteDatabase("ollie-pictures");
    setStep(3);
  };
  return (
    <Sheet title="Delete my data" onClose={step === 3 ? () => window.location.assign("/onboarding/fact") : onClose}>
      {step === 1 && (
        <>
          <p className="text-body font-bold text-foreground">This deletes:</p>
          <ul className="mt-2 list-disc pl-5 text-body text-foreground">
            <li>All of {child}'s chat history</li>
            <li>Every picture {child} made</li>
            <li>Voice recordings</li>
            <li>{child}'s profile</li>
          </ul>
          <p className="mt-3 text-support text-muted-foreground">Billing records are kept separately, with nothing that identifies {child}, because the law requires them for tax.</p>
          <button type="button" onClick={() => setStep(2)} className="mt-5 w-full rounded-pill border border-destructive py-3 text-button text-destructive">Continue</button>
        </>
      )}
      {step === 2 && (
        <>
          <p className="text-body font-bold text-foreground">This is permanent.</p>
          <p className="mt-1 text-support text-muted-foreground">Once deleted, none of it can be brought back.</p>
          <button type="button" onClick={wipe} className="mt-5 w-full rounded-pill bg-destructive py-3 text-button text-white">Delete everything</button>
          <button type="button" onClick={onClose} className="mt-2 w-full py-3 text-button text-muted-foreground">Keep my data</button>
        </>
      )}
      {step === 3 && <p className="text-body text-foreground">Everything has been deleted.</p>}
    </Sheet>
  );
}

function DevicesSheet({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState<DeviceRow[] | null | undefined>(undefined);
  const here = typeof window === "undefined" ? "" : deviceKey();
  const refresh = () => { listDevices().then(setRows).catch(() => setRows([])); };
  useEffect(refresh, []);
  const fmt = (iso: string) => new Date(iso).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  return (
    <Sheet title="Signed-in devices" onClose={onClose}>
      {rows === undefined && <p className="text-support text-muted-foreground">Loading</p>}
      {rows === null && <p className="text-support text-muted-foreground">This device isn't signed in to an account yet. Create one or log in to see your devices here.</p>}
      {rows && (
        <ul className="flex flex-col gap-2.5">
          {rows.map((d) => {
            const mine = d.device_key === here;
            return (
              <li key={d.id} className="flex items-center gap-3 rounded-control bg-surface p-3.5">
                <div className="min-w-0 flex-1">
                  <div className="text-label font-semibold text-foreground">{d.label}{mine && " (this device)"}</div>
                  <div className="text-support text-muted-foreground">{d.revoked ? "Logging out next time it opens" : `Last used ${fmt(d.last_seen)}`}</div>
                </div>
                {mine ? (
                  <button type="button" onClick={async () => { await signOutHere(); window.location.assign("/onboarding/fact"); }} className="rounded-pill bg-white px-3.5 py-2 text-label font-semibold text-foreground">Log out</button>
                ) : !d.revoked && (
                  <button type="button" onClick={async () => { await revokeDevice(d.id); refresh(); }} className="rounded-pill bg-white px-3.5 py-2 text-label font-semibold text-destructive">Log out</button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>
  );
}

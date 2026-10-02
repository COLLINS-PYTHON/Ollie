import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mic, Sparkles, X } from "lucide-react";
import { ThinkingOrb } from "thinking-orbs";
import { preparePicture } from "@/lib/picture.functions";
import { streamImage } from "@/lib/stream-image";
import {
  FREE_PER_DAY,
  JARS,
  cookiesLeft,
  loadBalance,
  loadPictures,
  refund,
  saveBalance,
  savePicture,
  spend,
  type Balance,
  type Picture,
} from "@/lib/picture-store";
import { onboardingState } from "@/lib/onboarding-store";
import { pageMeta } from "@/lib/meta";

export const Route = createFileRoute("/_tabs/create")({
  head: () => ({ meta: pageMeta("Create", "Turn ideas into safe, friendly pictures with Ollie.").meta }),
  component: CreateScreen,
});

const BLOCKED_COPY = "Hmm, that one didn't quite work. Let's try a different idea!";

const STARTERS: Record<string, string> = {
  space: "A puppy astronaut floating past Saturn",
  ocean: "A smiling octopus painting under the sea",
  dinos: "A friendly dinosaur having a picnic",
  animals: "A baby elephant splashing in a river",
  body: "A happy heart doing jumping jacks",
  math: "A castle made of colorful number blocks",
  art: "A rainbow paint splash shaped like a bird",
  weather: "A cloud raining sprinkles on a garden",
  history: "A tiny explorer visiting the pyramids",
  music: "A band of animals playing drums in a forest",
  tech: "A kind robot watering flowers",
  reading: "A dragon reading a giant book",
};
const DEFAULT_STARTERS = ["A puppy astronaut floating past Saturn", "A dragon reading a giant book", "A kind robot watering flowers"];

const BUILDER = {
  who: ["A puppy", "A dinosaur", "A robot", "A kitten", "A whale", "An astronaut"],
  doing: ["dancing", "reading a book", "flying a kite", "eating ice cream", "playing music", "having a nap"],
  where: ["in space", "under the sea", "in a jungle", "on the moon", "in a castle", "in the snow"],
} as const;

const MAGNETS = ["bg-cat-space", "bg-cat-ocean", "bg-cat-dinos", "bg-cat-art", "bg-cat-weather", "bg-cat-reading"];
const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};
function getRecognition(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

type Popup = null | "low" | "last" | "out" | "jars" | { pin: (typeof JARS)[number] } | { bought: number };

function CookieJar({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="9" y="3" width="14" height="5" rx="2" className="fill-navy/70" />
      <path d="M7 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v15a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4Z" className="fill-surface stroke-navy/20" strokeWidth="1.2" />
      <circle cx="13" cy="21" r="3.4" className="fill-gold" />
      <circle cx="19.5" cy="17.5" r="3" className="fill-gold" />
      <circle cx="18" cy="24.5" r="2.6" className="fill-gold" />
      <path d="M10 11h2v9h-2z" className="fill-card/70" />
    </svg>
  );
}

function CreateScreen() {
  const age = onboardingState.age || 7;
  const name = onboardingState.name || "friend";
  const useBuilderDefault = age <= 6 || onboardingState.readingLevel === "none";
  const starters = (onboardingState.interests.map((i) => STARTERS[i]).filter(Boolean) as string[]).slice(0, 3);
  const chips = starters.length === 3 ? starters : [...starters, ...DEFAULT_STARTERS.filter((s) => !starters.includes(s))].slice(0, 3);

  const [mode, setMode] = useState<"type" | "builder">(useBuilderDefault ? "builder" : "type");
  const [idea, setIdea] = useState("");
  const [pick, setPick] = useState<{ who?: string; doing?: string; where?: string }>({});
  const [balance, setBalance] = useState<Balance | null>(null);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<{ url: string; final: boolean } | null>(null);
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState<Popup>(null);
  const [open, setOpen] = useState<Picture | null>(null);
  const [listening, setListening] = useState(false);
  const [voice, setVoice] = useState(false);
  const recRef = useRef<RecognitionLike | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBalance(loadBalance());
    setVoice(!!getRecognition());
    loadPictures().then(setPictures).catch(() => setPictures([]));
  }, []);

  const builderSentence = pick.who && pick.doing && pick.where ? `${pick.who} ${pick.doing} ${pick.where}` : "";
  const currentIdea = mode === "builder" ? builderSentence : idea.trim();

  const updateBalance = (b: Balance) => {
    setBalance(b);
    saveBalance(b);
  };

  const create = async (text = currentIdea) => {
    if (!balance || busy || !text) return;
    const spent = spend(loadBalance());
    if (!spent) {
      setPopup("out");
      return;
    }
    updateBalance(spent.next);
    setBusy(true);
    setMessage("");
    setPreview(null);
    const fail = (copy: string, refundIt: boolean) => {
      if (refundIt) updateBalance(refund(loadBalance(), spent.kind));
      setPreview(null);
      setMessage(copy);
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    try {
      const prep = await preparePicture({ data: { idea: text, age } });
      if (!prep.ok) {
        fail(prep.blocked ? BLOCKED_COPY : prep.error, true);
        return;
      }
      let finalUrl = "";
      await streamImage("/api/generate-image", { prompt: prep.prompt }, (url, isFinal) => {
        setPreview({ url, final: isFinal });
        if (isFinal) finalUrl = url;
      });
      const pic: Picture = { id: `p-${Date.now()}`, idea: text, dataUrl: finalUrl, createdAt: Date.now() };
      await savePicture(pic).catch(() => {});
      setPictures((prev) => [pic, ...prev]);
      setIdea("");
      setPick({});
      if (spent.kind === "free" && spent.next.freeUsed === 3) setPopup("low");
      if (spent.kind === "free" && spent.next.freeUsed === FREE_PER_DAY && spent.next.jarCookies === 0) setPopup("last");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      const policy = /content_policy|moderation|safety|blocked/i.test(msg);
      fail(policy ? BLOCKED_COPY : /402/.test(msg) ? "AI credits ran out." : "Ollie could not make that right now. Please try again in a moment.", true);
    } finally {
      setBusy(false);
    }
  };

  const startListening = () => {
    const R = getRecognition();
    if (!R || busy || listening) return;
    try {
      const rec = new R();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.onresult = (e) => {
        const t = e.results?.[0]?.[0]?.transcript ?? "";
        if (t) setIdea(t);
      };
      rec.onend = () => setListening(false);
      recRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };
  const stopListening = () => {
    try {
      recRef.current?.stop();
    } catch {
      /* already stopped */
    }
    setListening(false);
  };

  const left = balance ? cookiesLeft(balance) : FREE_PER_DAY;

  return (
    <main className="screen-enter relative mx-auto min-h-screen w-full max-w-md bg-gradient-wash px-5 pb-32 pt-16">
      <div className="flex items-center justify-between pr-12">
        <h1 className="text-title text-foreground">Create</h1>
        <button
          type="button"
          onClick={() => setPopup(left === 0 ? "out" : "jars")}
          aria-label={`${left} cookies left`}
          className="frosted flex items-center gap-1.5 rounded-pill py-1.5 pl-2 pr-3 shadow-card transition-transform duration-tap active:scale-95"
        >
          <CookieJar />
          <span className="text-label font-bold text-foreground">{left}</span>
        </button>
      </div>

      <section className="mt-5 rounded-card bg-card p-4 shadow-card">
        <div className="mb-3 flex gap-1 rounded-pill bg-surface p-1">
          {(["builder", "type"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-pill py-1.5 text-label font-semibold transition-colors duration-tap ${mode === m ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
            >
              {m === "builder" ? "Picture builder" : "Type or talk"}
            </button>
          ))}
        </div>

        {mode === "builder" ? (
          <div className="space-y-3">
            {(Object.keys(BUILDER) as (keyof typeof BUILDER)[]).map((row) => (
              <div key={row}>
                <p className="mb-1.5 text-support text-muted-foreground">{row === "who" ? "Who?" : row === "doing" ? "Doing what?" : "Where?"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {BUILDER[row].map((c) => {
                    const on = pick[row] === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          const next = { ...pick, [row]: c };
                          setPick(next);
                          speak(c);
                        }}
                        className={`rounded-pill border px-3 py-1.5 text-label transition-colors duration-tap ${on ? "border-primary bg-primary text-primary-foreground" : "border-surface-2 bg-card text-foreground"}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {builderSentence && (
              <button type="button" onClick={() => speak(builderSentence)} className="pop-in w-full rounded-control bg-surface px-3 py-2 text-left text-body text-foreground">
                {builderSentence}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <button key={c} type="button" onClick={() => setIdea(c)} className="rounded-pill border border-surface-2 bg-surface px-3 py-1.5 text-left text-label text-foreground transition-colors duration-tap hover:border-primary">
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={idea}
                maxLength={300}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && create()}
                placeholder="Describe your picture"
                aria-label="Describe your picture"
                className="h-11 min-w-0 flex-1 rounded-pill border border-surface-2 bg-card px-4 text-body text-foreground outline-none focus:border-primary"
              />
              {voice && (
                <button
                  type="button"
                  aria-label="Hold to talk"
                  onPointerDown={startListening}
                  onPointerUp={stopListening}
                  onPointerLeave={() => listening && stopListening()}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-pill bg-primary text-primary-foreground ${listening ? "ring-pulse" : ""}`}
                >
                  <Mic className="size-5" />
                </button>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => create()}
          disabled={busy || !currentIdea}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-primary text-button text-primary-foreground transition-all duration-tap active:scale-[0.98] disabled:bg-surface-2 disabled:text-muted-foreground"
        >
          <Sparkles className="size-4" /> Make my picture
        </button>
      </section>

      {(busy || preview || message) && (
        <section className="mt-5 flex flex-col items-center gap-3">
          {preview ? (
            <img
              src={preview.url}
              alt={preview.final ? "Your new picture" : "Your picture is being painted"}
              className={`aspect-square w-full rounded-card object-cover shadow-card transition-[filter] duration-reveal ${preview.final ? "blur-0" : "blur-2xl"}`}
            />
          ) : busy ? (
            <div className="flex aspect-square w-full items-center justify-center rounded-card bg-card/70 shadow-card">
              <ThinkingOrb state="shaping" size={64} theme="light" aria-label="Ollie is painting" />
            </div>
          ) : null}
          {busy && (
            <div className="flex items-center gap-2">
              {preview && <ThinkingOrb state="shaping" size={64} theme="light" aria-label="Ollie is painting" />}
              <span className="text-support text-muted-foreground">Ollie is painting</span>
            </div>
          )}
          {message && <p role="status" className="pop-in rounded-control bg-card px-4 py-3 text-center text-body text-foreground shadow-card">{message}</p>}
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-body font-bold text-foreground">{name}'s fridge</h2>
        {pictures.length === 0 ? (
          <p className="mt-2 text-support text-muted-foreground">Your pictures will hang here.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-4 rounded-card bg-surface-2/70 p-4">
            {pictures.map((p, i) => (
              <button key={p.id} type="button" onClick={() => setOpen(p)} className={`relative rounded-control bg-card p-1.5 pb-3 shadow-card ${TILTS[i % TILTS.length]}`}>
                <span className={`glossy absolute -top-2 left-1/2 size-4 -translate-x-1/2 rounded-full ${MAGNETS[i % MAGNETS.length]}`} />
                <img src={p.dataUrl} alt={p.idea} className="aspect-square w-full rounded-[8px] object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </section>

      {open && (
        <Overlay onClose={() => setOpen(null)}>
          <img src={open.dataUrl} alt={open.idea} className="aspect-square w-full rounded-control object-cover" />
          <p className="mt-3 text-body text-foreground">{open.idea}</p>
        </Overlay>
      )}

      {popup && (
        <Overlay onClose={() => setPopup(null)}>
          <PopupBody
            popup={popup}
            name={name}
            left={left}
            onGetMore={() => setPopup("jars")}
            onPickJar={(jar) => setPopup({ pin: jar })}
            onPinOk={(jar) => {
              updateBalance({ ...loadBalance(), jarCookies: loadBalance().jarCookies + jar.count });
              setPopup({ bought: jar.count });
            }}
            onClose={() => setPopup(null)}
          />
        </Overlay>
      )}
    </main>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-4 sm:items-center" onClick={onClose}>
      <div role="dialog" className="sheet-up relative w-full max-w-sm rounded-card bg-card p-5 shadow-sheet" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-pill text-muted-foreground">
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function PopupBody({
  popup, name, left, onGetMore, onPickJar, onPinOk, onClose,
}: {
  popup: Exclude<Popup, null>;
  name: string;
  left: number;
  onGetMore: () => void;
  onPickJar: (jar: (typeof JARS)[number]) => void;
  onPinOk: (jar: (typeof JARS)[number]) => void;
  onClose: () => void;
}) {
  const [pin, setPin] = useState("");
  const [wrong, setWrong] = useState(false);
  const primary = "mt-4 h-12 w-full rounded-pill bg-primary text-button text-primary-foreground";

  if (popup === "low" || popup === "last") {
    return (
      <div className="text-center">
        <CookieJar className="mx-auto size-14" />
        <p className="mt-2 text-title text-foreground">{popup === "low" ? `${left} cookies left today` : "That was your last free picture today"}</p>
        <p className="mt-1 text-support text-muted-foreground">{popup === "low" ? "Each picture uses one cookie. More free cookies come tomorrow." : "Free cookies come back tomorrow."}</p>
        <button type="button" className={primary} onClick={onClose}>OK</button>
      </div>
    );
  }
  if (popup === "out") {
    return (
      <div className="text-center">
        <CookieJar className="mx-auto size-14" />
        <p className="mt-2 text-title text-foreground">Out of cookies today</p>
        <p className="mt-1 text-support text-muted-foreground">You can still look at your fridge. New free cookies come tomorrow.</p>
        <button type="button" className={primary} onClick={onGetMore}>Get more cookies</button>
      </div>
    );
  }
  if (popup === "jars") {
    return (
      <div>
        <p className="text-title text-foreground">Cookie jars</p>
        <p className="mt-1 text-support text-muted-foreground">A grown-up will need to say yes.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {JARS.map((jar) => (
            <button key={jar.id} type="button" onClick={() => onPickJar(jar)} className="flex flex-col items-center rounded-card border border-surface-2 bg-surface p-4 transition-colors duration-tap hover:border-primary">
              <CookieJar className={jar.id === "small" ? "size-10" : "size-14"} />
              <span className="mt-2 text-label font-bold text-foreground">{jar.label}</span>
              <span className="text-support text-muted-foreground">{jar.count} pictures</span>
              <span className="mt-1 text-label font-semibold text-foreground">{jar.price}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if ("pin" in popup) {
    const jar = popup.pin;
    const check = (value: string) => {
      setPin(value);
      setWrong(false);
      if (value.length === 4) {
        if (!onboardingState.pin || value === onboardingState.pin) onPinOk(jar);
        else {
          setWrong(true);
          setPin("");
        }
      }
    };
    return (
      <div className="text-center">
        <p className="text-title text-foreground">Grown-up PIN</p>
        <p className="mt-1 text-support text-muted-foreground">{jar.label}, {jar.count} pictures for {jar.price}</p>
        <input
          autoFocus
          inputMode="numeric"
          type="password"
          aria-label="Parent PIN"
          value={pin}
          onChange={(e) => check(e.target.value.replace(/\D/g, "").slice(0, 4))}
          className="mx-auto mt-4 block h-12 w-40 rounded-control border border-surface-2 bg-surface text-center text-title tracking-[0.5em] text-foreground outline-none focus:border-primary"
        />
        {wrong && <p className="mt-2 text-support text-muted-foreground">That PIN didn't match. Try again.</p>}
      </div>
    );
  }
  return (
    <div className="text-center">
      <CookieJar className="glow-burst mx-auto size-14" />
      <p className="mt-2 text-title text-foreground">{popup.bought} cookies added</p>
      <p className="mt-1 text-support text-muted-foreground">Have fun creating, {name}!</p>
      <button type="button" className={primary} onClick={onClose}>Let's create</button>
    </div>
  );
}

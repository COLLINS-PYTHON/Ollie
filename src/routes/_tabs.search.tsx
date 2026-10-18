import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Keyboard, Mic, Volume2 } from "lucide-react";
import { starterInterests, voiceFirst } from "@/lib/child-interactions";
import { CrispOrb } from "@/components/ollie/CrispOrb";
import { askOllie } from "@/lib/search.functions";
import { LessonCover } from "@/components/ollie/LessonCover";
import { findIllustration, illustrationById } from "@/lib/slideshow/illustration";
import { loadChat, saveChat, type ChatMessage, type Reaction } from "@/lib/chat-store";

function AnswerArt({ id }: { id: string }) {
  const art = illustrationById(id);
  if (!art) return null;
  return (
    <div className="pop-in flex items-center gap-2.5 rounded-[18px] bg-surface p-2 pr-3.5">
      <LessonCover categoryId={art.categoryId} topicId={art.sub.id} title={art.sub.title} className="w-20 shrink-0 rounded-sm" />
      <div className="min-w-0">
        <p className="text-label text-muted-foreground">{art.label}</p>
        <p className="text-support font-bold text-foreground">{art.sub.title}</p>
      </div>
    </div>
  );
}

const REACTIONS: { id: Reaction; label: string }[] = [
  { id: "wow", label: "Wow" },
  { id: "funny", label: "Funny" },
  { id: "knew", label: "I knew that" },
];
import { onboardingState } from "@/lib/onboarding-store";
import { childName, pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";
import { Button } from "@/components/ui/button";

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike;
    webkitSpeechRecognition?: new () => RecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function speak(text: string) {
  void naturalSpeak(text);
}

function childProfile() {
  return {
    name: childName(onboardingState.name),
    age: onboardingState.age || 7,
    readingLevel: onboardingState.readingLevel ?? ("stories" as const),
    tone: onboardingState.tone,
    interests: onboardingState.interests,
  };
}

function SearchChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [avatarNod, setAvatarNod] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const holdingRef = useRef(false);
  const nodTimerRef = useRef<number | null>(null);
  const spokenRef = useRef<Set<string>>(new Set());
  const child = childProfile();
  const largeVoice = voiceFirst(child.age) && voiceSupported;
  const welcome = messages.length === 0 && !busy;
  const expandedVoice = largeVoice && welcome && !typing && !input;
  const starters = starterInterests(child.interests);
  const autoSpeak = child.readingLevel === "none" || child.readingLevel === "sounding";

  useEffect(() => {
    setMessages(loadChat());
    setLoaded(true);
    setVoiceSupported(Boolean(getRecognition()));
    return () => {
      if (nodTimerRef.current) window.clearTimeout(nodTimerRef.current);
      recognitionRef.current?.stop();
    };
  }, []);

  const nodAvatar = () => {
    setAvatarNod(false);
    window.requestAnimationFrame(() => setAvatarNod(true));
    if (nodTimerRef.current) window.clearTimeout(nodTimerRef.current);
    nodTimerRef.current = window.setTimeout(() => setAvatarNod(false), 750);
  };

  useEffect(() => {
    if (loaded) saveChat(messages);
  }, [messages, loaded]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (!autoSpeak) return;
    for (const m of messages) {
      if (m.role === "received" && !spokenRef.current.has(m.id)) {
        spokenRef.current.add(m.id);
        speak(m.text);
      }
    }
  }, [messages, autoSpeak]);

  const send = async (text = input) => {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    const userMsg: ChatMessage = {
      id: `s-${Date.now()}`,
      role: "sent",
      text: question,
      createdAt: Date.now(),
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setBusy(true);
    try {
      const res = await askOllie({
        data: {
          question,
          child,
          history: next.slice(-8).map((m) => ({
            role: m.role === "sent" ? ("user" as const) : ("assistant" as const),
            text: m.text,
          })),
        },
      });
      const reply: ChatMessage = {
        id: `r-${Date.now()}`,
        role: "received",
        text: res.ok ? res.answer : res.error,
        createdAt: Date.now(),
        ...(res.ok && res.tier ? { tier: res.tier } : {}),
        ...(res.ok && res.flagReason ? { flagReason: res.flagReason } : {}),
      };
      /* Ages 4-9 see existing slideshow art beside answers on a library topic. */
      if (res.ok && res.tier === "ok" && child.age <= 9) {
        const art = findIllustration(question);
        if (art) reply.illustrationId = art.sub.id;
      }
      setMessages((prev) => [...prev, reply]);
      nodAvatar();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `r-${Date.now()}`,
          role: "received",
          text: "I'm having a little trouble right now. Please try again in a moment.",
          createdAt: Date.now(),
        },
      ]);
      nodAvatar();
    } finally {
      setBusy(false);
    }
  };

  const startListening = () => {
    const Recognition = getRecognition();
    if (!Recognition || busy || recognitionRef.current) return;
    try {
      const rec = new Recognition();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript ?? "";
        if (transcript) setInput(transcript);
      };
      rec.onend = () => { recognitionRef.current = null; setListening(false); };
      recognitionRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    holdingRef.current = false;
    try {
      recognitionRef.current?.stop();
    } catch {
      /* recognition already stopped */
    }
    setListening(false);
  };

  const voiceHold = {
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return;
      event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
      holdingRef.current = true; startListening();
    },
    onPointerUp: stopListening,
    onPointerCancel: stopListening,
    onLostPointerCapture: stopListening,
    onContextMenu: (event: React.MouseEvent) => event.preventDefault(),
    onKeyDown: (event: React.KeyboardEvent) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); holdingRef.current = true; startListening(); } },
    onKeyUp: (event: React.KeyboardEvent) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); stopListening(); } },
    onBlur: stopListening,
  };

  const canSend = !busy && input.trim().length > 0;

  const react = (id: string, reaction: Reaction | undefined) => {
    setMessages((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, reaction } : m));
      saveChat(next);
      return next;
    });
  };

  return (
    <main className="search-screen screen-enter relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-card">
      {/* iMessage-style header: centered round photo with name underneath */}
      <header className="search-header frosted relative z-10 flex flex-col items-center gap-1 pb-2.5 pt-12">
        <img
          src={ollie}
          alt="Ollie"
          className={`size-10 rounded-full bg-surface object-cover ${listening ? "ollie-avatar-listening" : avatarNod ? "ollie-avatar-nod" : ""}`}
          width={40}
          height={40}
        />
        <p className="text-body font-bold text-foreground">Ollie</p>
      </header>

      <div ref={listRef} className="search-transcript relative z-10 min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {messages.length === 0 && !busy ? (
          <div className="search-welcome flex min-h-full flex-col items-center justify-center gap-4 text-center">
            <img
              src={ollie}
              alt="Ollie the puppy"
              className="ollie-gentle-idle w-24"
              width={96}
              height={96}
            />
            <p className="text-body max-w-[280px] font-semibold text-foreground">
              Hi {child.name}! What are you curious about today?
            </p>
            <div className="flex max-w-sm flex-wrap justify-center gap-2">
              {starters.map(({ id, label, sample, icon: Icon }) => <Button key={id} variant="secondary" onClick={() => void send(sample)} className="h-auto min-h-12 gap-2 whitespace-normal rounded-pill px-4 py-3 text-support text-foreground"><Icon className="size-5 shrink-0 text-primary" />{label}</Button>)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {messages.map((m) =>
              m.role === "sent" ? (
                <div
                  key={m.id}
                  className="max-w-[75%] self-end rounded-[18px] rounded-br-[4px] bg-primary px-3.5 py-2 text-body text-primary-foreground"
                >
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="flex max-w-[80%] flex-col items-start gap-1 self-start">
                  <div className="flex items-end gap-1">
                    <div className="rounded-[18px] rounded-bl-[4px] bg-surface-2 px-3.5 py-2 text-body text-foreground">
                      {m.text}
                    </div>
                    <Button variant="ghost" size="icon"
                      type="button"
                      aria-label="Hear this answer"
                      onClick={() => speak(m.text)}
                      className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-pill text-muted-foreground transition-colors duration-tap hover:text-primary"
                    >
                      <Volume2 className="size-3.5" />
                    </Button>
                  </div>
                  {m.illustrationId && <AnswerArt id={m.illustrationId} />}
                  {(!m.tier || m.tier === "ok") && (
                    <div className="mb-1 flex flex-wrap gap-1" role="group" aria-label="React to this answer">
                      {REACTIONS.map((r) => {
                        const on = m.reaction === r.id;
                        return (
                          <Button variant="ghost" size="sm"
                            key={r.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => react(m.id, on ? undefined : r.id)}
                            className={`rounded-pill px-2.5 py-1 text-label transition-all duration-tap active:scale-95 ${on ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground"}`}
                          >
                            {r.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
        {busy && (
          <div className="mt-3 flex self-start px-2 py-2" role="status" aria-label="Ollie is writing an answer">
            <CrispOrb state="composing" size={80} aria-label="Ollie is writing an answer" />
          </div>
        )}
      </div>

      <div className="search-composer relative z-10 px-3 pt-2">
        {expandedVoice ? <div className="flex items-center justify-center gap-4 pb-2">
          <Button variant="ghost" size="icon" aria-label="Hold to talk to Ollie" aria-pressed={listening} {...voiceHold} disabled={busy} className="voice-orb-control relative size-20 touch-none select-none shrink-0 rounded-pill p-0 hover:bg-transparent active:scale-95">
            <span aria-hidden="true"><CrispOrb state="listening" size={80} aria-label="Voice orb" /></span>
            <Mic aria-hidden="true" className="pointer-events-none absolute size-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Type a question" onClick={() => { setTyping(true); window.setTimeout(() => inputRef.current?.focus(), 0); }} className="size-12 rounded-pill text-muted-foreground"><Keyboard className="size-5" /></Button>
        </div> : <div className="flex items-end gap-2 pb-2">
          {voiceSupported && <Button variant="ghost" size="icon" type="button" aria-label="Hold to talk to Ollie" aria-pressed={listening} {...voiceHold} disabled={busy} className="voice-orb-control relative size-12 touch-none select-none shrink-0 rounded-pill p-0 hover:bg-transparent">
            <span aria-hidden="true"><CrispOrb state={listening ? "listening" : "breathing"} size={48} aria-label="Voice orb" /></span><Mic aria-hidden="true" className="pointer-events-none absolute size-4 text-primary" />
          </Button>}
          <div className="flex min-w-0 flex-1 items-end gap-2 rounded-pill border border-border bg-card px-4 py-2">
            <textarea ref={inputRef} rows={1} value={input} onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(96, e.target.scrollHeight)}px`; }} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }} placeholder={listening ? "Listening…" : "Ask Ollie anything"} aria-label="Ask Ollie anything" className="max-h-24 min-h-6 min-w-0 flex-1 resize-none bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground" />
            <Button size="icon" type="button" aria-label="Send question" onClick={() => void send()} disabled={!canSend} className="size-8 shrink-0 rounded-pill bg-primary text-primary-foreground disabled:bg-surface-2 disabled:text-muted-foreground"><ArrowUp className="size-4" strokeWidth={2.5} /></Button>
          </div>
        </div>}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/_tabs/search")({
  head: () => ({
    meta: pageMeta("Search", "Ask Ollie anything and learn safely.").meta,
  }),
  component: SearchChat,
});

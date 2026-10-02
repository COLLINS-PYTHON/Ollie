import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Mic, Volume2 } from "lucide-react";
import { ThinkingOrb } from "thinking-orbs";
import { askOllie } from "@/lib/search.functions";
import { loadChat, saveChat, type ChatMessage } from "@/lib/chat-store";
import { onboardingState } from "@/lib/onboarding-store";
import { pageMeta } from "@/lib/meta";
import ollie from "@/assets/ollie.png";

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
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function childProfile() {
  return {
    name: onboardingState.name || "friend",
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
  const listRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const nodTimerRef = useRef<number | null>(null);
  const spokenRef = useRef<Set<string>>(new Set());
  const child = childProfile();
  const autoSpeak = child.readingLevel === "none" || child.readingLevel === "sounding";

  useEffect(() => {
    setMessages(loadChat());
    setLoaded(true);
    setVoiceSupported(Boolean(getRecognition()));
    return () => {
      if (nodTimerRef.current) window.clearTimeout(nodTimerRef.current);
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

  const send = async () => {
    const question = input.trim();
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
    if (!Recognition || busy || listening) return;
    try {
      const rec = new Recognition();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const transcript = e.results?.[0]?.[0]?.transcript ?? "";
        if (transcript) setInput(transcript);
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* recognition already stopped */
    }
    setListening(false);
  };

  const canSend = !busy && input.trim().length > 0;

  return (
    <main className="screen-enter relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-white">
      {/* iMessage-style header: centered round photo with name underneath */}
      <header className="frosted relative z-10 flex flex-col items-center gap-1 pb-2.5 pt-12">
        <img
          src={ollie}
          alt="Ollie"
          className={`size-14 rounded-full bg-surface object-cover ${listening ? "ollie-avatar-listening" : avatarNod ? "ollie-avatar-nod" : ""}`}
          width={56}
          height={56}
        />
        <p className="text-body font-bold text-foreground">Ollie</p>
      </header>

      <div ref={listRef} className="relative z-10 flex-1 overflow-y-auto px-3 py-4">
        {messages.length === 0 && !busy ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <img
              src={ollie}
              alt="Ollie the puppy"
              className="bounce-soft w-36"
              width={144}
              height={144}
            />
            <p className="text-title max-w-[280px] text-foreground">
              Hi {child.name}! What are you curious about today?
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {messages.map((m) =>
              m.role === "sent" ? (
                <div
                  key={m.id}
                  className="max-w-[75%] self-end rounded-[18px] rounded-br-[4px] bg-primary px-3.5 py-2 text-body text-white"
                >
                  {m.text}
                </div>
              ) : (
                <div key={m.id} className="flex max-w-[80%] items-end gap-1 self-start">
                  <div className="rounded-[18px] rounded-bl-[4px] bg-surface-2 px-3.5 py-2 text-body text-foreground">
                    {m.text}
                  </div>
                  <button
                    type="button"
                    aria-label="Hear this answer"
                    onClick={() => speak(m.text)}
                    className="mb-0.5 flex size-6 shrink-0 items-center justify-center rounded-pill text-muted-foreground transition-colors duration-tap hover:text-primary"
                  >
                    <Volume2 className="size-3.5" />
                  </button>
                </div>
              )
            )}
          </div>
        )}
        {busy && (
          <div className="mt-3 flex self-start rounded-[18px] rounded-bl-[4px] bg-surface-2 px-3.5 py-2" role="status" aria-label="Ollie is writing an answer">
            <ThinkingOrb state="composing" size={32} theme="light" aria-label="Ollie is writing an answer" />
          </div>
        )}
      </div>

      {/* iMessage-style input bar */}
      <div className="relative z-10 px-3 pb-28 pt-2">
        <div className="flex items-end gap-2">
          <div className="flex min-w-0 flex-1 items-center rounded-[22px] border border-surface-2 bg-white px-4 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask Ollie anything"
              aria-label="Ask Ollie anything"
              className="min-w-0 flex-1 bg-transparent text-body text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          {voiceSupported && !canSend && (
            <button
              type="button"
              aria-label={listening ? "Listening, release to stop" : "Hold to talk"}
              onPointerDown={startListening}
              onPointerUp={stopListening}
              onPointerLeave={stopListening}
              className={`flex size-9 shrink-0 items-center justify-center rounded-pill bg-surface-2 text-foreground transition-transform duration-tap ${
                listening ? "scale-110 ring-pulse" : "active:scale-95"
              }`}
            >
              <Mic className="size-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Send question"
            onClick={send}
            disabled={!canSend}
            className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-primary text-white transition-all duration-tap active:scale-95 disabled:bg-surface-2 disabled:text-muted-foreground"
          >
            <ArrowUp className="size-4" strokeWidth={2.5} />
          </button>
        </div>
        {!voiceSupported && (
          <p className="mt-2 text-center text-support text-muted-foreground">
            Voice search needs a browser that supports speech
          </p>
        )}
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

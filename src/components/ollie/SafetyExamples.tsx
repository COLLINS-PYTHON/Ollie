import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flag, ShieldCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ollie from "@/assets/ollie.png";

// Parent-facing illustrations, not live conversations or flags. Responses match locked safety copy.
const EXAMPLES = [
  { title: "Adult topics", question: "What does sex mean?", answer: "That's a question for a grown-up you trust. They can explain it best.", reason: "Adult topic", note: "A gentle handoff to you, without adult details." },
  { title: "Explicit content", question: "Show me sexual pictures", answer: "Sorry, I'm not able to answer that one. What else are you curious about today?", reason: "Sexual content request", note: "The request is declined. No pictures or explicit details." },
  { title: "When a child needs help", question: "I want to hurt myself", answer: "Please tell a grown-up you trust right now. You matter, and you don't have to handle this alone.", reason: "Self-harm concern", note: "A caring response that points them to a trusted grown-up." },
];

export function SafetyExamples({ name }: { name: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  return (
    <section className="safety-examples mt-7 min-w-0" aria-label="Examples of sensitive-topic responses">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0"><h2 className="text-body font-bold text-foreground">Gentle with them. Clear with you.</h2><p className="text-support text-muted-foreground">Example conversations</p></div>
        <span className="text-label text-muted-foreground" aria-live="polite">{selected + 1} / {EXAMPLES.length}</span>
      </div>
      <Carousel setApi={setApi} opts={{ align: "start", duration: 25 }}>
        <CarouselContent>
          {EXAMPLES.map((example, i) => (
            <CarouselItem key={example.title} className="basis-[94%] sm:basis-full" aria-label={example.title} aria-hidden={selected !== i}>
              <article className="safety-preview overflow-hidden rounded-card border border-border bg-card shadow-card">
                <header className="flex items-center justify-center gap-2 border-b border-border px-4 py-3">
                  <img src={ollie} alt="" width={34} height={34} className="size-9 rounded-pill bg-surface object-cover" />
                  <p className="text-support font-bold text-foreground">Ollie</p>
                </header>
                <div className="safety-conversation flex flex-col gap-3 p-4">
                  <p className="max-w-[86%] self-end rounded-control rounded-br-sm bg-primary px-3.5 py-2.5 text-support text-primary-foreground">{example.question}</p>
                  <p className="max-w-[90%] self-start rounded-control rounded-bl-sm bg-secondary px-3.5 py-2.5 text-support text-foreground">{example.answer}</p>
                </div>
                <div className="safety-parent-note border-t border-border bg-surface px-4 py-3">
                  <div className="flex items-center gap-2"><Flag className="size-4 shrink-0 text-accent-4" strokeWidth={1.8} /><p className="text-label text-foreground">Parent view · {example.reason}</p></div>
                  <p className="text-support mt-1 text-muted-foreground">{name}'s question and Ollie's reply, together in your dashboard.</p>
                </div>
              </article>
              <p className="text-support mt-3 text-muted-foreground">{example.note}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Previous example" disabled={selected === 0} onClick={() => api?.scrollPrev()} className="rounded-pill"><ChevronLeft /></Button>
          <div className="flex gap-2">{EXAMPLES.map((example, i) => <Button key={example.title} variant="ghost" size="icon" aria-label={`Show ${example.title.toLowerCase()} example`} aria-pressed={selected === i} onClick={() => api?.scrollTo(i)} className="size-8 rounded-pill"><span className={`h-1.5 rounded-pill transition-all duration-element ${selected === i ? "w-5 bg-primary" : "w-1.5 bg-border"}`} /></Button>)}</div>
          <Button variant="ghost" size="icon" aria-label="Next example" disabled={selected === EXAMPLES.length - 1} onClick={() => api?.scrollNext()} className="rounded-pill"><ChevronRight /></Button>
        </div>
      </Carousel>
      <p className="text-label mt-3 flex items-center justify-center gap-1.5 text-muted-foreground"><ShieldCheck className="size-3.5" />Illustrations of Ollie's safety responses, not live chats.</p>
    </section>
  );
}
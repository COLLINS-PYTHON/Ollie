import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Volume2, MessageCircle, Sparkles, ShieldCheck, Check, ArrowRight, Wand2 } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { Button } from '@/components/ui/button';
import { LessonArt } from '@/components/ollie/LessonArt';
import { SafetyExamples } from '@/components/ollie/SafetyExamples';
import { onboardingState } from '@/lib/onboarding-store';
import { buildDay, effectiveBand } from '@/lib/slideshow/library';
import { quizOptions } from '@/lib/slideshow/types';
import { speak, preloadSpeech, stopSpeaking } from '@/lib/speak';
import { DiscoveryDeck } from '@/components/ollie/DiscoveryDeck';
import { bubbleSound } from '@/lib/bubble-sound';
import { pageMeta } from '@/lib/meta';
import { ONBOARDING_ANSWER } from '@/lib/onboarding-answer';
import whale from '@/assets/whale-curious.png';
import samplePicture from '@/assets/create-sample.jpg';

export const Route = createFileRoute('/onboarding/try')({
  head: () => pageMeta('See Ollie at work', 'A Daily Discovery, a real answer and safety in action, made for your child.'),
  component: Proof,
});

type Tab = 'discover' | 'ask' | 'safety' | 'create';
const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: 'discover', label: 'Discover', icon: Sparkles },
  { id: 'ask', label: 'Ask', icon: MessageCircle },
  { id: 'safety', label: 'Safety', icon: ShieldCheck },
  { id: 'create', label: 'Create', icon: Wand2 },
];

/* One value-proof screen replaces four static slides: parents tap through instead of reading. */
function Proof() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('discover');
  const [seen, setSeen] = useState<Set<Tab>>(new Set(['discover']));
  const [pick, setPick] = useState<number | null>(null);
  const name = onboardingState.name || 'your child';
  const band = effectiveBand(onboardingState.age, onboardingState.readingLevel ?? 'stories');
  const [lessonIndex,setLessonIndex] = useState(0);
  const day = buildDay(onboardingState.interests[0] ?? 'space', lessonIndex, band);
  const sub = day?.slides.find(slide => slide.kind === 'quiz')?.sub;
  const answer = ONBOARDING_ANSWER[band];
  useEffect(() => { void preloadSpeech(answer, onboardingState.age).catch(() => {}); }, [answer]);
  useEffect(() => { if (tab === 'ask') void speak(answer, { age: onboardingState.age }); return () => stopSpeaking(); }, [tab, answer]);
  const open = (t: Tab) => { bubbleSound(); setTab(t); setSeen(s => new Set(s).add(t)); };
  const nextTab = TABS.find(t => !seen.has(t.id));

  return (
    <div className="onboarding-proof min-h-screen bg-background">
      <OnboardingSkeleton chapter={3} title={`Here’s Ollie, made for ${name}`} cta={nextTab ? `Next: ${nextTab.label}` : 'Continue'} onContinue={() => nextTab ? open(nextTab.id) : navigate({ to: '/onboarding/pin' })}>
        <div className="mb-5 grid grid-cols-4 gap-1.5" role="tablist" aria-label="Ollie examples">
          {TABS.map(({ id, label, icon: Icon }) => (
            <Button key={id} role="tab" variant="option" aria-selected={tab === id} aria-pressed={tab === id} className="h-12 rounded-pill" onClick={() => open(id)}>
              <Icon />{label}{seen.has(id) && tab !== id && <Check className="size-3 text-primary" />}
            </Button>
          ))}
        </div>

        <div key={tab} className="reveal-stagger space-y-4">
          {tab === 'discover' && sub && day && <>
            <p className="text-label text-muted-foreground">DAILY DISCOVERY · EXAMPLE</p>
            <DiscoveryDeck categoryId={day.categoryId} band={band} onChange={index => { setLessonIndex(index); setPick(null); }} />
            <h2 className="text-body font-bold">{sub.quiz.q[band]}</h2>
            <div className="space-y-2">
              {quizOptions(sub.quiz, band).map((option, i) => (
                <Button key={option} variant="option" aria-pressed={pick === i} className="h-auto min-h-12 w-full justify-between whitespace-normal p-3 text-left" onClick={() => setPick(i)}>
                  {option}{pick === i && <Check className="text-primary" />}
                </Button>
              ))}
              {pick !== null && <p role="status" className="flag-pop text-support text-muted-foreground">{pick === sub.quiz.answer ? `That’s right. Finished Discoveries stay on ${name}’s Trail, ready to revisit.` : 'Try another answer.'}</p>}
            </div>
            <p className="text-support text-muted-foreground">A fresh discovery, a quick quiz and a little moment of ‘I know that!’ Built around what {name} loves.</p>
          </>}

          {tab === 'ask' && <>
            <p className="text-label text-muted-foreground">EXAMPLE · MADE FOR {name.toUpperCase()}</p>
            <div className="proof-transcript">
              <header className="mb-5 flex flex-col items-center gap-1"><img src={whale} alt="Ollie" width={48} height={48} className="size-12 object-contain" /><span className="text-support font-bold">Ollie</span></header>
              <div className="flex flex-col gap-4">
                <p className="max-w-[82%] self-end rounded-control rounded-br-sm bg-primary px-4 py-3 text-body text-primary-foreground">Why does the Moon glow?</p>
                <p className="flag-pop max-w-[90%] self-start rounded-control rounded-bl-sm bg-secondary px-4 py-3 text-body text-foreground" style={{ animationDelay: '500ms' }}>{answer}</p>
              </div>
              <Button variant="ghost" className="hear-highlight mt-3 min-h-12 rounded-pill text-primary" onClick={() => void speak(answer, { age: onboardingState.age })}><Volume2 />Hear the answer</Button>
            </div>
            <p className="text-support text-muted-foreground">Answers fit their age and reading comfort. Kids can hold to speak or type, and read or listen to the reply.</p>
          </>}

          {tab === 'safety' && <>
            <p className="text-support text-muted-foreground">Support without hovering. When a question may need your attention, your parent view explains what was saved and why.</p>
            <SafetyExamples name={name} />
            <p className="text-support text-muted-foreground">Ollie cannot know what is happening offline or replace a trusted adult in an urgent situation.</p>
          </>}

          {tab === 'create' && <>
            <p className="text-label text-muted-foreground">EXAMPLE · PAINTED BY OLLIE</p>
            <div className="proof-transcript">
              <p className="max-w-[82%] self-end rounded-control rounded-br-sm bg-primary px-4 py-3 text-body text-primary-foreground">A whale astronaut floating past Saturn</p>
              <div className="relative mt-4 w-full">
                <span className="fridge-magnet absolute -top-2 left-1/2 z-10 size-4 -translate-x-1/2 rounded-full bg-cat-space" />
                <img src={samplePicture} alt="A whale astronaut floating past Saturn, painted by Ollie" width={1024} height={1024} loading="lazy" className="picture-reveal aspect-square w-full rounded-card object-cover shadow-card" />
              </div>
            </div>
            <p className="text-support text-muted-foreground">Kids say or type an idea, Ollie paints it, and it hangs on their fridge. Ten fresh pictures every morning.</p>
          </>}
        </div>
        {nextTab && <p className="mt-4 flex items-center justify-center gap-1 text-support text-muted-foreground">Tap through all {TABS.length} examples<ArrowRight className="size-3" /></p>}
      </OnboardingSkeleton>
    </div>
  );
}

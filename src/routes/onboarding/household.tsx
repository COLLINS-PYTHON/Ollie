import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { UserRound, UsersRound, Plus, Minus } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { Button } from '@/components/ui/button';
import { onboardingState, saveProfile } from '@/lib/onboarding-store';
import { addKid, familyKids } from '@/lib/family-store';
import { pageMeta } from '@/lib/meta';

export const Route = createFileRoute('/onboarding/household')({ head: () => pageMeta('Your family', 'Set up separate Ollie learning spaces for up to two kids.'), component: Household });
function Household() {
  const navigate = useNavigate();
  const existing = familyKids();
  const [two, setTwo] = useState(existing.length === 2);
  const [name, setName] = useState('');
  const [age, setAge] = useState(7);
  const [error, setError] = useState('');
  return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={1} title="Who will use Ollie?" cta="Continue" ctaDisabled={two && existing.length < 2 && !name.trim()} onContinue={() => {
    saveProfile();
    if (two && existing.length < 2 && !addKid(name, age)) { setError('The second profile could not be saved. Please try again.'); return; }
    void navigate({ to: '/onboarding/reading' });
  }}>
    <div className="space-y-3">
      {[{ two: false, icon: UserRound, title: 'One kid', copy: `A learning space made for ${onboardingState.name}.` }, { two: true, icon: UsersRound, title: 'Two kids', copy: 'Separate answers, Discoveries, and progress for each kid.' }].map(option => <Button key={option.title} variant="option" aria-pressed={two === option.two} disabled={!option.two && existing.length === 2} className="h-auto min-h-24 w-full justify-start whitespace-normal p-5 text-left" onClick={() => setTwo(option.two)}><option.icon className="size-6 text-primary" /><span className="min-w-0"><span className="block text-body font-bold">{option.title}</span><span className="mt-1 block text-support text-muted-foreground">{option.copy}</span></span></Button>)}
    </div>
    {two && existing.length < 2 && <div className="setup-reveal mt-5 border-t border-border pt-5"><label className="text-support font-semibold" htmlFor="second-kid">Your other kid’s first name</label><input id="second-kid" className="setup-input mt-2" maxLength={40} value={name} onChange={e => setName(e.target.value)} placeholder="First name" /><div className="mt-4 flex items-center justify-between"><span className="text-body">Age</span><div className="flex items-center gap-5"><Button variant="control" size="icon" aria-label="Younger second kid" disabled={age <= 4} onClick={() => setAge(a => a - 1)}><Minus /></Button><span className="text-title w-8 text-center">{age}</span><Button variant="control" size="icon" aria-label="Older second kid" disabled={age >= 12} onClick={() => setAge(a => a + 1)}><Plus /></Button></div></div></div>}
    {error && <p role="alert" className="mt-3 text-support text-destructive">{error}</p>}
    <p className="mt-6 text-support text-muted-foreground">One family membership includes up to two kid profiles.</p>
  </OnboardingSkeleton></div>;
}
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { Button } from '@/components/ui/button';
import { onboardingState, saveOnboardingDraft, saveProfile } from '@/lib/onboarding-store';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/onboarding/')({ head: () => pageMeta('Your kid’s profile', 'Personalise Ollie’s words and examples for your kid’s age.'), component: Profile });
function Profile() {
 const navigate = useNavigate(); const [name,setName] = useState(onboardingState.name); const [age,setAge] = useState(onboardingState.age);
 return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={1} title="Let’s start with your kid." cta="Continue" ctaDisabled={!name.trim()} onContinue={() => { onboardingState.name=name.trim(); onboardingState.age=age; saveOnboardingDraft(); saveProfile(); void navigate({ to: '/onboarding/household' }); }}><label className="text-support font-semibold" htmlFor="kid-name">First name</label><input id="kid-name" className="setup-input mt-2" autoComplete="off" maxLength={40} placeholder="First name" value={name} onChange={e => setName(e.target.value)} /><div className="mt-8 border-y border-border py-6"><p className="mb-4 text-support font-semibold">Age</p><div className="flex items-center justify-between"><Button variant="control" size="icon" className="size-12" disabled={age<=4} aria-label="Younger" onClick={() => setAge(a=>a-1)}><Minus /></Button><div className="text-center"><span className="block text-5xl font-semibold text-foreground">{age}</span><span className="text-support text-muted-foreground">years old</span></div><Button variant="control" size="icon" className="size-12" disabled={age>=12} aria-label="Older" onClick={() => setAge(a=>a+1)}><Plus /></Button></div></div><p className="mt-5 text-support text-muted-foreground">Their age helps Ollie choose the right words and examples.</p></OnboardingSkeleton></div>;
}

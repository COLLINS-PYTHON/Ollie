import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Volume2, BookOpen, BookText, Check } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { SetupKidTabs } from '@/components/ollie/SetupKidTabs';
import { Button } from '@/components/ui/button';
import { onboardingState, saveProfile, type ReadingLevel } from '@/lib/onboarding-store';
import { familyKids, switchKid } from '@/lib/family-store';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/onboarding/reading')({ head: () => pageMeta('Learning comfort', 'Choose words and read-aloud support that fit each kid.'), component: Reading });
const options = [{ id:'none', icon:Volume2, title:'Not reading yet', copy:'Simple words, with answers read aloud.' },{id:'sounding',icon:BookOpen,title:'Sounding out simple words',copy:'Short sentences and a little reading support.'},{id:'stories',icon:BookText,title:'Reads short stories',copy:'Clear explanations with room to discover.'},{id:'chapters',icon:BookText,title:'Reads chapter books confidently',copy:'More detail, without unnecessary complexity.'}] as const;
function Reading() {
 const navigate=useNavigate(); const [level,setLevel]=useState<ReadingLevel|null>(onboardingState.readingLevel);
 return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={1} title={`What's ${onboardingState.name}'s reading level?`} cta="Continue" ctaDisabled={!level} onContinue={() => { saveProfile(); const next=familyKids().find(k=>!k.profile['readingLevel']); if(next){switchKid(next.id);setLevel(onboardingState.readingLevel);return;} void navigate({to:'/onboarding/interests'}); }}><SetupKidTabs onChange={()=>setLevel(onboardingState.readingLevel)} /><div className="space-y-3" role="radiogroup" aria-label="Reading level">{options.map(o=><Button key={o.id} variant="option" role="radio" aria-checked={level===o.id} className="h-auto min-h-20 w-full justify-start whitespace-normal p-4 text-left" onClick={()=>{setLevel(o.id);onboardingState.readingLevel=o.id;saveProfile();}}><o.icon className="size-6 text-primary" /><span className="min-w-0 flex-1"><span className="block text-body font-semibold">{o.title}</span><span className="mt-1 block text-support text-muted-foreground">{o.copy}</span></span>{level===o.id&&<Check className="text-primary" />}</Button>)}</div><p className="mt-5 text-support text-muted-foreground">A comfortable starting point for {onboardingState.name}, not a test. You can change this anytime.</p></OnboardingSkeleton></div>;
}

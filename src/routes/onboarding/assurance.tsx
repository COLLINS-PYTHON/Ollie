import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useRef,useState } from 'react';
import { OnboardingSkeleton } from '../onboarding';
import { SafetyExamples } from '@/components/ollie/SafetyExamples';
import { onboardingState } from '@/lib/onboarding-store';
import { pageMeta } from '@/lib/meta';
export const Route=createFileRoute('/onboarding/assurance')({head:()=>pageMeta('Support without hovering','Example answers and saved parent context, side by side.'),component:Assurance});
function Assurance(){const navigate=useNavigate();const [selected,setSelected]=useState(0);const nextRef=useRef<(()=>void)|null>(null);return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={3} title="Support without hovering." cta="Continue" onContinue={()=>selected<2?nextRef.current?.():navigate({to:'/onboarding/trust'})}><p className="text-support text-muted-foreground">When a question may need your attention, your parent view explains what was saved and why.</p><SafetyExamples name={onboardingState.name} onSelect={setSelected} nextRef={nextRef}/><p className="mt-4 text-support text-muted-foreground">Ollie cannot know what is happening offline or replace a trusted adult in an urgent situation.</p></OnboardingSkeleton></div>;}

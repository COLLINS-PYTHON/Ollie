import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { SetupKidTabs } from '@/components/ollie/SetupKidTabs';
import { Button } from '@/components/ui/button';
import { onboardingState, saveProfile } from '@/lib/onboarding-store';
import { familyKids, switchKid } from '@/lib/family-store';
import { INTERESTS } from '@/lib/interests';
import { INTEREST_ART } from '@/lib/interest-art';
import { pageMeta } from '@/lib/meta';
export const Route=createFileRoute('/onboarding/interests')({head:()=>pageMeta('What sparks curiosity', 'Choose the topics that shape your kid’s first Discovery.'),component:Interests});
function Interests(){
 const navigate=useNavigate(); const [,refresh]=useState(0); const redraw=()=>refresh(n=>n+1);
 return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={1} title={`What is ${onboardingState.name} into?`} cta="Continue" ctaDisabled={!onboardingState.interests.length&&!onboardingState.customInterest.trim()} onContinue={()=>{saveProfile();const next=familyKids().find(k=>!((k.profile['interests'] as string[]|undefined)?.length)&&!String(k.profile['customInterest']??'').trim());if(next){switchKid(next.id);redraw();return;}void navigate({to:'/onboarding/screen-time'});}}><SetupKidTabs onChange={redraw}/><div className="setup-interests grid grid-cols-2 gap-2" role="group" aria-label="Interests">{INTERESTS.map(({id,label})=>{const on=onboardingState.interests.includes(id);return <Button key={id} variant="option" aria-pressed={on} onClick={()=>{onboardingState.interests=on?onboardingState.interests.filter(x=>x!==id):[...onboardingState.interests,id];saveProfile();redraw();}} className="relative h-auto min-h-16 justify-start gap-2 whitespace-normal p-2 text-left"><img src={INTEREST_ART[id]} alt="" width={512} height={480} loading="lazy" className="size-12 shrink-0 rounded-sm object-cover"/><span className="min-w-0 flex-1 text-label">{label}</span>{on&&<Check className="size-3 shrink-0 text-primary"/>}</Button>;})}</div><input className="setup-input mt-4" aria-label="Custom interest" placeholder="Another interest? Optional" maxLength={120} value={onboardingState.customInterest} onChange={e=>{onboardingState.customInterest=e.target.value;redraw();}}/><p className="mt-4 text-support text-muted-foreground">A little discovery, every day. Short daily lessons built around what {onboardingState.name} loves, with a quick quiz to make it stick.</p></OnboardingSkeleton></div>;
}

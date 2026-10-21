import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { OnboardingSkeleton } from '../onboarding';
import { onboardingState, saveProfile } from '@/lib/onboarding-store';
import { pushAll } from '@/lib/cloud-sync';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/onboarding/parent-name')({ head: () => pageMeta('Your preferred name', 'Personalise your Ollie parent view.'), component: ParentName });
function ParentName() {
  const [name, setName] = useState(onboardingState.parentName);
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={3} title="What should Ollie call you?" cta="Continue" ctaDisabled={!name.trim()} onContinue={() => { onboardingState.parentName = name.trim(); saveProfile(); void pushAll(); void navigate({ to: '/onboarding/protection' }); }}><input className="setup-input" aria-label="Your first name" placeholder="Your first name" autoComplete="given-name" maxLength={40} value={name} onChange={e => setName(e.target.value)} /><p className="mt-4 text-support text-muted-foreground">We use this in your parent view and family updates.</p></OnboardingSkeleton></div>;
}
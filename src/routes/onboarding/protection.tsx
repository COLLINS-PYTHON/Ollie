import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ShieldCheck } from 'lucide-react';
import { OnboardingSkeleton } from '../onboarding';
import { pageMeta } from '@/lib/meta';
export const Route = createFileRoute('/onboarding/protection')({ head: () => pageMeta('Parent protection', 'Keep your Ollie parent settings protected.'), component: Protection });
function Protection() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background"><OnboardingSkeleton chapter={3} title="Your parent view stays protected." cta="Continue" onContinue={() => navigate({ to: '/onboarding/handoff' })}><div className="flex justify-center py-8"><ShieldCheck className="size-16 text-primary" strokeWidth={1.3} /></div><p className="text-body text-foreground">Your parent PIN protects settings and reports on this device.</p><p className="mt-4 text-support text-muted-foreground">Face ID and Touch ID will be available when Ollie’s native app supports them. Your PIN will remain an alternative.</p></OnboardingSkeleton></div>;
}
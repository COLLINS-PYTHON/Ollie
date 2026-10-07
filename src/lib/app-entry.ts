import { supabase } from "@/integrations/supabase/client";
import { pullAll } from "./cloud-sync";
import { hasCompletedProfile, loadProfile, resumeOnboardingStep } from "./onboarding-store";

/* Read on the client before mounting child screens, never during SSR. */
export async function resolveAppEntry() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && !hasCompletedProfile()) {
    const found = await pullAll();
    if (found) { loadProfile(); return "/search" as const; }
  }
  if (hasCompletedProfile()) { loadProfile(); return "/search" as const; }
  return resumeOnboardingStep();
}
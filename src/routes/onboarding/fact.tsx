import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/ollie/Typewriter";

export const Route = createFileRoute("/onboarding/fact")({
  head: () => pageMeta("Big questions, age-appropriate answers", "Meet Ollie, a learning assistant designed around your child's age and your guidance."),
  component: FactPage,
});

function FactPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-quiet min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-16">
        <div className="onboarding-content px-1">
          <p className="text-label mb-4 font-bold text-primary">Ollie</p>
          <h1 className="text-title text-foreground"><Typewriter text="The safe, smart AI " /><span className="onboarding-highlight"><Typewriter text="learning assistant for kids" delay={560} /></span></h1>
          <p className="text-body mt-6 text-foreground"><Typewriter text="Explanations tailored to their age, real-time safety guardrails, and a private dashboard that keeps you completely in the loop." delay={1600} speed={18} /></p>
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="onboarding" size="icon"
            type="button"
            aria-label="Continue"
            onClick={() => navigate({ to: "/onboarding/meet" })}
            className="relative flex size-16 items-center justify-center rounded-pill bg-primary text-primary-foreground shadow-card transition-all duration-element"
          >
            <ArrowRight className="relative size-6" />
          </Button>
        </div>
        <Link to="/login" className="mt-8 self-center text-support font-medium text-primary">
          I already have an account. Log in
        </Link>
      </main>
    </div>
  );
}

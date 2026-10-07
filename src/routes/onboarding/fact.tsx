import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/fact")({
  head: () => pageMeta("Why Ollie exists", "Most kids already use AI they didn't choose."),
  component: FactPage,
});

const LINES = [
  "Most kids already use AI they didn't choose.",
  "75% of kids aged 9 to 17 already use AI-generated search answers.",
  "It's already normal. That doesn't mean it's safe.",
  "But it doesn't have to be this way.",
];

function FactPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-quiet min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-16">
        <div className="onboarding-content px-1">
          {LINES.map((line, i) => {
            return (
              <p
                key={i}
                className={`${i === 0 ? "text-title" : i === 1 ? "text-support text-muted-foreground" : "text-body font-medium"} ${i > 0 ? "mt-4" : ""} text-foreground`}
              >
                {line}
              </p>
            );
          })}
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

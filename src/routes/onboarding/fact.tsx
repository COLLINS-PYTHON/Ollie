import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/meta";

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
const TOTAL = LINES.join("").length;

function FactPage() {
  const navigate = useNavigate();
  const [chars, setChars] = useState(0);
  const done = chars >= TOTAL;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 500 : 34);
    return () => clearTimeout(t);
  }, [chars, done]);

  let left = chars;
  return (
    <div className="bg-gradient-quiet min-h-screen">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-16">
        <div className="rounded-card bg-card p-6 shadow-card">
          {LINES.map((line, i) => {
            const shown = line.slice(0, Math.max(0, left));
            const typing = left > 0 && left < line.length;
            left -= line.length;
            if (!shown) return null;
            return (
              <p
                key={i}
                className={`${i === 0 ? "text-title" : i === 1 ? "text-support text-muted-foreground" : "text-body font-medium"} ${i > 0 ? "mt-4" : ""} text-foreground`}
              >
                {shown}
                {typing && <span className="caret ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-primary" />}
              </p>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-label="Continue"
            disabled={!done}
            onClick={() => navigate({ to: "/onboarding/meet" })}
            className={`relative flex size-16 items-center justify-center rounded-pill transition-all duration-element ${
              done ? "bg-primary text-primary-foreground shadow-card" : "bg-surface-2 text-muted-foreground opacity-40"
            }`}
          >
            {done && <span className="ring-pulse absolute inset-0 rounded-pill bg-primary" aria-hidden />}
            <ArrowRight className="relative size-6" />
          </button>
        </div>
        <Link to="/login" className="mt-8 self-center text-support font-medium text-primary">
          I already have an account. Log in
        </Link>
      </main>
    </div>
  );
}

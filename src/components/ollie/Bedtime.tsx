import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ollieSleeping from "@/assets/ollie-sleeping.png";

/* Ollie's bedtime: shown when today's Search + Create limit is used up.
   Calm routine, one button, no "keep playing". The slideshow is never blocked. */
const STARS = [
  [12, 8], [28, 18], [46, 6], [64, 14], [82, 9], [90, 24], [20, 30], [72, 32], [38, 26], [56, 38], [8, 44], [86, 46],
];

export function Bedtime({ name }: { name: string }) {
  const [said, setSaid] = useState(false);
  return (
    <div
      role="dialog"
      aria-label="Ollie's bedtime"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
      style={{ background: "linear-gradient(180deg, var(--navy) 0%, var(--brand-deep) 100%)" }}
    >
      {STARS.map(([x, y], i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute rounded-pill bg-white transition-opacity duration-reveal ${said ? "opacity-30" : "opacity-80"}`}
          style={{ left: `${x}%`, top: `${y}%`, width: 4, height: 4 }}
        />
      ))}
      <span aria-hidden className="absolute rounded-pill bg-white" style={{ right: "14%", top: "10%", width: 48, height: 48, opacity: 0.9, boxShadow: "0 0 40px white" }} />

      <img src={ollieSleeping} alt="Ollie asleep" width={220} height={220} className="relative w-56" />
      <p className="relative mt-6 text-title text-white">
        {said ? `Sweet dreams, ${name}.` : `That's all for today, ${name}. Your trail will be right here tomorrow.`}
      </p>
      {!said && (
        <button
          type="button"
          onClick={() => setSaid(true)}
          className="relative mt-8 rounded-pill bg-white px-10 py-3.5 text-button text-foreground transition-transform duration-tap active:scale-95"
        >
          Goodnight, Ollie.
        </button>
      )}
      <Link to="/parent" style={{ marginTop: 40 }} className="relative text-support text-white opacity-60 underline-offset-2 hover:underline">
        Grown-ups: change the daily limit in the Parent Dashboard
      </Link>
    </div>
  );
}

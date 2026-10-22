import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { WhaleRest } from './WhaleRest';
import { Button } from '@/components/ui/button';

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
      className="bedtime-screen fixed inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
    >
      {STARS.map(([x, y], i) => (
        <span
          key={i}
          aria-hidden
          className={`bedtime-star absolute rounded-pill transition-opacity duration-reveal ${said ? "opacity-30" : "opacity-80"}`}
          style={{ left: `${x}%`, top: `${y}%`, width: 4, height: 4 }}
        />
      ))}
      <span aria-hidden className="bedtime-moon" />

      <WhaleRest />
      <p className="relative mt-6 text-title">
        {said ? `Sweet dreams, ${name}.` : `That's all for today, ${name}. Your trail will be right here tomorrow.`}
      </p>
      {!said && (
        <Button variant="secondary"
          type="button"
          onClick={() => setSaid(true)}
          className="relative mt-8 h-14 rounded-pill px-10 text-button"
        >
          Goodnight, Ollie.
        </Button>
      )}
      <Link to="/parent" className="relative mt-10 text-support opacity-80 underline-offset-2 hover:underline">
        Grown-ups: change the daily limit in the Parent Dashboard
      </Link>
    </div>
  );
}

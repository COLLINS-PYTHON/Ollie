import { useEffect, useState } from "react";

/** Reveals text one character at a time, like it is being typed in.
 *  Full text is exposed to assistive tech; reduced motion shows it at once. */
export function Typewriter({ text, delay = 0, speed = 24, className = "" }: {
  text: string; delay?: number; speed?: number; className?: string;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }
    setCount(0);
    setDone(false);
    let interval = 0;
    const start = window.setTimeout(() => {
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>
        {text.slice(0, count)}
        {!done && <span className="type-caret" />}
      </span>
    </span>
  );
}

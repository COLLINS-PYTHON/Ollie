import { useEffect, useRef } from 'react';
import { BookOpen, Star } from 'lucide-react';
import curious from '@/assets/whale-curious.png';
import celebrate from '@/assets/whale-celebrate.png';
import { bell, lagged, loopClock, prefersReducedMotion, wave } from '@/lib/motion';

type Pose = 'curious' | 'celebrate';
const ART: Record<Pose, string> = { curious, celebrate };

/** Floating sky whale: drift, lagged pitch, breathing shadow and mist on one clock. */
export function FloatingWhale({ pose = 'curious', size = 220, className = '' }: { pose?: Pose; size?: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const lift = (t: number) => wave(t, 3.6);
    return loopClock(t => {
      const y = lift(t) * 0.045 * size + wave(t, 1.3) * 0.005 * size; // drift plus moving hold
      const pitch = lagged(lift, t, 0.18) * -1.8;
      const sway = wave(t, 7.2, 1) * 0.02 * size;
      const leap = pose === 'celebrate' ? bell((t % 4) / 1.4) * -0.08 * size : 0;
      el.style.setProperty('--wy', `${(y + leap).toFixed(2)}px`);
      el.style.setProperty('--wx', `${sway.toFixed(2)}px`);
      el.style.setProperty('--wr', `${pitch.toFixed(2)}deg`);
      el.style.setProperty('--ws', (1 - lift(t) * 0.12).toFixed(3));
      el.style.setProperty('--wo', (0.22 - lift(t) * 0.06).toFixed(3));
    });
  }, [pose, size]);
  return (
    <div ref={root} className={`floating-whale ${className}`} style={{ width: size, height: size * 0.85 }} role="img" aria-label={pose === 'celebrate' ? 'Ollie the whale leaping happily' : 'Ollie the whale floating calmly'}>
      <span className="floating-whale-shadow" aria-hidden="true" />
      <div className="floating-whale-body">
        <img src={ART[pose]} alt="" width={1024} height={1024} draggable={false} />
      </div>
      {/* Cartoon thought bubble floating above his head, drifting on its own. */}
      <span className="whale-thought" aria-hidden="true">
        <span className="thought-dot dot-1" /><span className="thought-dot dot-2" />
        <span className="thought-cloud">{pose === 'celebrate' ? <Star /> : <BookOpen />}</span>
      </span>
    </div>
  );
}

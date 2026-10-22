import whale from '@/assets/whale-resting.png';
import { BookOpen } from 'lucide-react';

/** Context artwork only: no timers, rewards or dependency-building dialogue. */
export function WhaleRest({ compact = false }: { compact?: boolean }) {
  return <div className={`whale-rest ${compact ? 'is-small' : ''}`} aria-label="A blue whale resting peacefully" role="img">
    <img src={whale} alt="" width={1024} height={768} className="whale-breath" />
    <span className="whale-dream dream-one" aria-hidden="true" />
    <span className="whale-dream dream-two" aria-hidden="true" />
    <span className="whale-dream dream-book" aria-hidden="true"><BookOpen /></span>
  </div>;
}
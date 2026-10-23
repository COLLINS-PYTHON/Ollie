import { FloatingWhale } from './FloatingWhale';
export function WhaleThinking({ size = 112, painting = false }: { size?: number; painting?: boolean }) {
  return <div className={`whale-thinking ${painting ? 'is-painting' : ''}`} role="status" aria-label={painting ? 'Ollie is painting' : 'Ollie is thinking'}><FloatingWhale size={size} /><span className="thinking-dots" aria-hidden="true"><i/><i/><i/></span></div>;
}
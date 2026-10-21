import { useEffect, useRef } from 'react';
import clip from '@/assets/ollie-paywall-discovery-compatible.mp4.asset.json';
import ollie from '@/assets/ollie.png';
export function PaywallDiscoveryVideo({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const element = ref.current;
    const play = () => { if (!element) return; element.muted = true; element.defaultMuted = true; if (motion.matches || document.hidden) { element.pause(); return; } if (element.paused) void element.play().catch(() => {}); };
    play(); motion.addEventListener('change', play); element?.addEventListener('canplay', play); element?.addEventListener('loadeddata', play); document.addEventListener('pointerdown', play); document.addEventListener('visibilitychange', play);
    const retry = window.setInterval(play, 1500);
    return () => { window.clearInterval(retry); motion.removeEventListener('change', play); element?.removeEventListener('canplay', play); element?.removeEventListener('loadeddata', play); document.removeEventListener('pointerdown', play); document.removeEventListener('visibilitychange', play); };
  }, []);
  return <div className={`paywall-discovery-video ${compact ? 'is-compact' : ''}`}><video ref={ref} src={clip.url} poster={ollie} autoPlay muted loop playsInline preload="auto" controls={false} disablePictureInPicture aria-label="Ollie explores a little world unfolding from a book" /></div>;
}
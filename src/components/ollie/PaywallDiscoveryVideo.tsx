import { useEffect, useRef } from 'react';
import clip from '@/assets/ollie-paywall-blended.mp4.asset.json';
import webm from '@/assets/ollie-paywall-blended.webm.asset.json';
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
  return <div className={`paywall-discovery-video ${compact ? 'is-compact' : ''}`}><video ref={ref} autoPlay muted loop playsInline preload="auto" controls={false} disablePictureInPicture aria-label="Ollie explores a little world unfolding from a book"><source src={webm.url} type="video/webm" /><source src={clip.url} type="video/mp4" /></video></div>;
}
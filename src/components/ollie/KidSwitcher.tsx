import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { familyKids, switchKid } from '@/lib/family-store';
import { activeKidId } from '@/lib/kid-storage';

export function KidSwitcher({ onChange }: { onChange?: () => void }) {
  const [, refresh] = useState(0);
  useEffect(() => { const changed = () => refresh(n => n + 1); window.addEventListener('ollie-kid-changed', changed); return () => window.removeEventListener('ollie-kid-changed', changed); }, []);
  const kids = familyKids();
  if (kids.length < 2) return null;
  return <div className="kid-switcher flex gap-2" role="group" aria-label="Choose kid">
    {kids.map(kid => <Button key={kid.id} variant="option" aria-pressed={activeKidId() === kid.id} onClick={() => { switchKid(kid.id); onChange?.(); }} className="min-h-12 min-w-0 flex-1 rounded-pill whitespace-normal">{String(kid.profile['name'] ?? 'Kid')}</Button>)}
  </div>;
}
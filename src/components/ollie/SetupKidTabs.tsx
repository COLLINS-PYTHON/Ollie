import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { familyKids, switchKid } from '@/lib/family-store';
import { activeKidId } from '@/lib/kid-storage';

export function SetupKidTabs({ onChange }: { onChange: () => void }) {
  const [, refresh] = useState(0);
  const kids = familyKids();
  if (kids.length < 2) return null;
  return <div className="mb-5 grid grid-cols-2 gap-2" role="group" aria-label="Set up each kid">
    {kids.map(k => <Button key={k.id} variant="option" aria-pressed={activeKidId() === k.id} className="min-h-12 rounded-pill" onClick={() => { switchKid(k.id); refresh(n => n + 1); onChange(); }}>{String(k.profile['name'])}</Button>)}
  </div>;
}
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildDay } from '@/lib/slideshow/library';
import type { Band } from '@/lib/slideshow/types';
import { bubbleSound } from '@/lib/bubble-sound';
import { LessonArt } from './LessonArt';

export function DiscoveryDeck({ categoryId, band }: { categoryId: string; band: Band }) {
  const [active,setActive] = useState(0);
  const days = [0,1,2].map(index => buildDay(categoryId,index,band));
  const move = (step: number) => { bubbleSound(); setActive(value => (value + step + 3) % 3); };
  return <div className="discovery-deck-wrap"><div className="discovery-deck">
    {days.map((day,index) => { if (!day) return null; const position=(index-active+3)%3; return <div key={index} data-position={position} aria-hidden={position !== 0} className="discovery-preview-card"><LessonArt categoryId={categoryId} topicId={day.slides[0]?.sub.id ?? ''} title={day.label} animated={position===0}/><p className="text-support font-bold text-foreground">{day.label}</p></div>; })}
    </div><div className="deck-controls"><Button variant="control" size="icon" aria-label="Previous lesson example" onClick={()=>move(-1)}><ChevronLeft/></Button><span className="text-label text-muted-foreground">{active+1} / 3</span><Button variant="control" size="icon" aria-label="Next lesson example" onClick={()=>move(1)}><ChevronRight/></Button></div></div>;
}
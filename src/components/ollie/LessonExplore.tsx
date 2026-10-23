import { useState } from 'react';
import { ScanSearch, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TOPIC_CONTEXT } from '@/lib/slideshow/topic-context';
import { LessonArt } from './LessonArt';
import { bubbleSound } from '@/lib/bubble-sound';

/** A closer look is optional and never changes lesson progress or rewards. */
export function LessonExplore({ categoryId, topicId, scene, title }: { categoryId: string; topicId: string; scene: number; title: string }) {
  const [open, setOpen] = useState(false);
  const observation = TOPIC_CONTEXT[topicId]?.observation;
  return <>
    <Button variant="control" className="lesson-explore-action" aria-label="Explore this picture" onClick={() => { bubbleSound(); setOpen(true); }}><ScanSearch/><span>A closer look</span></Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lesson-explore-sheet">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="sr-only">A closer view of the current teaching illustration.</DialogDescription>
        <LessonArt categoryId={categoryId} topicId={topicId} title={title} scene={scene} animated={false}/>
        {observation && <p className="lesson-observation"><Eye/>{observation}</p>}
      </DialogContent>
    </Dialog>
  </>;
}
import { TOPIC_ART, CATEGORY_COVERS } from '@/lib/topic-art';
import { TOPIC_SEQUENCES } from '@/lib/topic-sequences';
import { BookOpen } from 'lucide-react';
/** Topic identity stays the same across preview, playback and Trail. No category substitution for unknown topics. */
export function LessonArt({ categoryId, topicId = '', title, className = '', animated = true, scene = 0 }: { categoryId: string; topicId?: string; title: string; className?: string; animated?: boolean; scene?: number }) {
 const sequence = TOPIC_SEQUENCES[topicId];
 const image = sequence?.[scene % sequence.length] ?? TOPIC_ART[topicId] ?? (!topicId ? CATEGORY_COVERS[categoryId] : undefined);
 return <div role="img" aria-label={title} className={`discovery-scene ${animated ? 'discovery-living' : 'discovery-still'} ${className}`}>
  {image ? <img key={image} src={image} alt="" width={1024} height={1024} loading="eager" decoding="async" className="lesson-picture aspect-square w-full object-cover" /> : <div className="lesson-art-unavailable"><BookOpen aria-hidden="true"/></div>}
 </div>;
}

import moon from "@/assets/lesson-moon.jpg";
import turtle from "@/assets/lesson-turtle.jpg";
import eggs from "@/assets/lesson-eggs.jpg";
import { LessonArt } from "./LessonArt";
import { INTEREST_ART } from "@/lib/interest-art";

const COVERS: Record<string, string> = {
  "moon-phases": moon,
  "sea-turtles": turtle,
  "dino-eggs": eggs,
};

/** Display imagery only. The daily lesson player continues to use animated SVG.
 *  Topic cover picture first, then the category's shared interest art, then SVG. */
export function LessonCover({ categoryId, topicId = "", title, className = "" }: {
  categoryId: string; topicId?: string; title: string; className?: string;
}) {
  const image = COVERS[topicId] ?? INTEREST_ART[categoryId];
  if (image) {
    return <img src={image} alt="" loading="lazy" className={`min-h-0 flex-1 object-cover ${className}`} />;
  }
  return <LessonArt categoryId={categoryId} topicId={topicId} title={title} animated className={className} />;
}

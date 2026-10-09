import moon from "@/assets/lesson-moon.jpg";
import turtle from "@/assets/lesson-turtle.jpg";
import eggs from "@/assets/lesson-eggs.jpg";
import { LessonArt } from "./LessonArt";

const COVERS: Record<string, string> = {
  "moon-phases": moon,
  "sea-turtles": turtle,
  "dino-eggs": eggs,
};

/** Display imagery only. The daily lesson player continues to use animated SVG. */
export function LessonCover({ categoryId, topicId = "", title, className = "" }: {
  categoryId: string; topicId?: string; title: string; className?: string;
}) {
  const source = COVERS[topicId];
  if (!source) return <LessonArt categoryId={categoryId} topicId={topicId} title={title} animated={false} className={className} />;
  return <img src={source} alt={title} loading="lazy" decoding="async" width={992} height={672} className={`lesson-cover ${className}`} />;
}
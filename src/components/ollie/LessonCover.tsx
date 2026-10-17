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

/** Display imagery only. The daily lesson player continues to use animated SVG. */
export function LessonCover({ categoryId, topicId = "", title, className = "" }: {
  categoryId: string; topicId?: string; title: string; className?: string;
}) {
  return <LessonArt categoryId={categoryId} topicId={topicId} title={title} animated className={className} />;
}
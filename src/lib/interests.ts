import {
  Rocket, Fish, Bone, PawPrint, HeartPulse, Calculator, Palette, CloudSun,
  Landmark, Music, Cpu, BookOpen, type LucideIcon,
} from "lucide-react";

/*
 * Each category gets its own rich gradient from the category palette
 * (src/styles.css --cat-*), never the app blue and never the
 * dashboard-only accent set. One distinct color per category.
 */
export type Interest = { id: string; label: string; icon: LucideIcon; tile: string; sample: string };

export const INTERESTS: Interest[] = [
  { id: "space", label: "Space & astronomy", icon: Rocket, tile: "from-cat-space to-cat-space-deep", sample: "Why does the Moon change shape?" },
  { id: "ocean", label: "Ocean & marine life", icon: Fish, tile: "from-cat-ocean to-cat-ocean-deep", sample: "How do octopuses hide?" },
  { id: "dinos", label: "Dinosaurs", icon: Bone, tile: "from-cat-dinos to-cat-dinos-deep", sample: "How big was a T. rex?" },
  { id: "animals", label: "Animals & wildlife", icon: PawPrint, tile: "from-cat-animals to-cat-animals-deep", sample: "Why do zebras have stripes?" },
  { id: "body", label: "Human body & health", icon: HeartPulse, tile: "from-cat-body to-cat-body-deep", sample: "What does your heart do all day?" },
  { id: "math", label: "Math & numbers", icon: Calculator, tile: "from-cat-math to-cat-math-deep", sample: "What is the biggest number?" },
  { id: "art", label: "Art & creativity", icon: Palette, tile: "from-cat-art to-cat-art-deep", sample: "How do colors mix?" },
  { id: "weather", label: "Weather & nature", icon: CloudSun, tile: "from-cat-weather to-cat-weather-deep", sample: "Where does rain come from?" },
  { id: "history", label: "History & world cultures", icon: Landmark, tile: "from-cat-history to-cat-history-deep", sample: "Who built the pyramids?" },
  { id: "music", label: "Music", icon: Music, tile: "from-cat-music to-cat-music-deep", sample: "Why do drums go boom?" },
  { id: "tech", label: "Technology", icon: Cpu, tile: "from-cat-tech to-cat-tech-deep", sample: "How does a robot think?" },
  { id: "reading", label: "Reading & Stories", icon: BookOpen, tile: "from-cat-reading to-cat-reading-deep", sample: "What makes a story exciting?" },
];

import {
  Rocket, Fish, Bone, PawPrint, HeartPulse, Calculator, Palette, CloudSun,
  Landmark, Music, Cpu, BookOpen, type LucideIcon,
} from "lucide-react";

/* Each category gets its own rich gradient (never the app blue). */
export type Interest = { id: string; label: string; icon: LucideIcon; tile: string; sample: string };

export const INTERESTS: Interest[] = [
  { id: "space", label: "Space & astronomy", icon: Rocket, tile: "from-accent-2 to-navy", sample: "Why does the Moon change shape?" },
  { id: "ocean", label: "Ocean & marine life", icon: Fish, tile: "from-accent-2 to-brand-deep", sample: "How do octopuses hide?" },
  { id: "dinos", label: "Dinosaurs", icon: Bone, tile: "from-accent-4 to-accent-2", sample: "How big was a T. rex?" },
  { id: "animals", label: "Animals & wildlife", icon: PawPrint, tile: "from-accent-4 to-accent-3", sample: "Why do zebras have stripes?" },
  { id: "body", label: "Human body & health", icon: HeartPulse, tile: "from-accent-3 to-navy", sample: "What does your heart do all day?" },
  { id: "math", label: "Math & numbers", icon: Calculator, tile: "from-accent-2 to-accent-4", sample: "What is the biggest number?" },
  { id: "art", label: "Art & creativity", icon: Palette, tile: "from-accent-3 to-accent-4", sample: "How do colors mix?" },
  { id: "weather", label: "Weather & nature", icon: CloudSun, tile: "from-accent-4 to-accent-2", sample: "Where does rain come from?" },
  { id: "history", label: "History & world cultures", icon: Landmark, tile: "from-accent-4 to-navy", sample: "Who built the pyramids?" },
  { id: "music", label: "Music", icon: Music, tile: "from-accent-3 to-accent-2", sample: "Why do drums go boom?" },
  { id: "tech", label: "Technology", icon: Cpu, tile: "from-navy to-accent-2", sample: "How does a robot think?" },
  { id: "reading", label: "Reading & Stories", icon: BookOpen, tile: "from-accent-3 to-brand-deep", sample: "What makes a story exciting?" },
];

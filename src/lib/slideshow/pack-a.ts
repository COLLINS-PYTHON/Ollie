import {
  Moon, Star, Sun, Globe, Waves, Turtle, Droplets, Shell,
  Bone, Egg, TreePine, Hammer, PawPrint, Bird, Bug, Snail,
} from "lucide-react";
import type { Packs } from "./types";

export const PACK_A: Packs = {
  space: [
    {
      id: "moon-phases",
      title: "The Moon changes shape",
      icon: Moon,
      caption: {
        "4-6": "The Moon looks different each night. Sometimes it is a thin curve, sometimes a full circle.",
        "7-9": "The Moon seems to change shape because we see different parts of it lit up by the Sun.",
        "10-12": "The Moon makes no light of its own. Its phases show how much of the sunlit side faces Earth as it orbits us about every 27 days.",
      },
      quiz: {
        q: {
          "4-6": "What gives the Moon its light?",
          "7-9": "Where does the light we see from the Moon come from?",
          "10-12": "Why does the Moon show phases as it travels around Earth?",
        },
        options: [
          "Sunlight bouncing off it",
          "A fire inside it",
          "Light from the stars",
        ],
        answer: 0,
        hint: "It is the same thing that lights your face in the daytime.",
        why: "The Moon acts like a mirror. As it orbits, we see more or less of the half the Sun is lighting.",
      },
    },
    {
      id: "stars-are-suns",
      title: "Stars are faraway suns",
      icon: Star,
      caption: {
        "4-6": "Stars are tiny dots of light that are very, very far away.",
        "7-9": "Stars are suns, but they are so far away that they look like tiny pinpricks.",
        "10-12": "Stars are giant balls of glowing gas. Their light can take years to reach us, so we see them as they used to be.",
      },
      quiz: {
        q: {
          "4-6": "Why do stars look so small?",
          "7-9": "Why do stars look much smaller than the Sun?",
          "10-12": "When you look at a very distant star, what are you seeing?",
        },
        options: ["They are extremely far away", "They are tiny", "Clouds hide them"],
        answer: 0,
        hint: "Hold a torch close, then far away. What happens to how big it looks?",
        why: "Distance shrinks how big something looks. The stars are suns, just unimaginably far off.",
      },
    },
    {
      id: "our-sun",
      title: "Our Sun is a star",
      icon: Sun,
      caption: {
        "4-6": "The Sun is a big, warm star that gives us daylight.",
        "7-9": "The Sun is a star, and it is by far the closest one to Earth.",
        "10-12": "The Sun holds the whole solar system in its gravity. Its light takes about eight minutes to reach Earth.",
      },
      quiz: {
        q: {
          "4-6": "What is the Sun?",
          "7-9": "Which sentence about the Sun is true?",
          "10-12": "Roughly how long does sunlight take to reach Earth?",
        },
        options: ["About eight minutes", "About eight hours", "About eight days"],
        answer: 0,
        hint: "It is closer than minutes, but not longer than an hour.",
        why: "Light travels about 300,000 km a second, so the 150 million km gap takes around eight minutes.",
      },
    },
    {
      id: "eight-planets",
      title: "Eight planets, one Sun",
      icon: Globe,
      caption: {
        "4-6": "Earth is one of the planets that travels around the Sun.",
        "7-9": "Eight planets travel around the Sun, and Earth is the third one out.",
        "10-12": "Eight planets orbit the Sun. Earth is the third planet and so far the only one known to carry life.",
      },
      quiz: {
        q: {
          "4-6": "Which planet do we live on?",
          "7-9": "How many planets travel around the Sun?",
          "10-12": "Which planet is the third one out from the Sun?",
        },
        options: ["Eight", "Twelve", "Five"],
        answer: 0,
        hint: "It is more than five but fewer than ten.",
        why: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune make eight.",
      },
    },
  ],
  ocean: [
    {
      id: "deep-and-dark",
      title: "Most of the ocean is unexplored",
      icon: Waves,
      caption: {
        "4-6": "The ocean is huge, and most of it is dark and quiet.",
        "7-9": "Most of the ocean has never been seen or mapped by people.",
        "10-12": "More than 80 percent of the ocean is unmapped. The deepest zones are darker than a moonless night and crushed by pressure.",
      },
      quiz: {
        q: {
          "4-6": "What is most of the deep ocean like?",
          "7-9": "How much of the ocean have people properly explored?",
          "10-12": "Why is the deepest ocean so hard to visit?",
        },
        options: ["Dark and mostly unexplored", "Warm and shallow", "Full of sunlight"],
        answer: 0,
        hint: "Sunlight only reaches the very top part.",
        why: "Light fades fast underwater, so most of the ocean stays dark and little of it has been mapped.",
      },
    },
    {
      id: "sea-turtles",
      title: "Sea turtles come up to breathe",
      icon: Turtle,
      caption: {
        "4-6": "A sea turtle swims up to the top to take a breath.",
        "7-9": "Sea turtles are reptiles, so they come to the surface to breathe air.",
        "10-12": "Sea turtles breathe air just like we do. While resting they can stay submerged for hours before surfacing again.",
      },
      quiz: {
        q: {
          "4-6": "What does a sea turtle need?",
          "7-9": "How does a sea turtle get the air it needs?",
          "10-12": "A sea turtle that stays underwater for a long time is doing what?",
        },
        options: ["Holding its breath and surfacing for air", "Breathing through its shell", "Eating seaweed for air"],
        answer: 0,
        hint: "Think about how you breathe, not how a fish does.",
        why: "Turtles are reptiles with lungs. They must return to the surface, they just wait a long time between visits.",
      },
    },
    {
      id: "why-salty",
      title: "Why the sea is salty",
      icon: Droplets,
      caption: {
        "4-6": "Sea water tastes salty.",
        "7-9": "Sea water is salty because rain washes salts from rocks into the sea.",
        "10-12": "Rivers carry dissolved minerals from weathered rock into the ocean. Water evaporates and leaves the salt behind, so it builds up over time.",
      },
      quiz: {
        q: {
          "4-6": "What does sea water taste like?",
          "7-9": "Where does the salt in the sea come from?",
          "10-12": "Why does salt keep building up in the ocean?",
        },
        options: ["Rocks washed ashore by rivers", "People pouring it in", "Fish making it"],
        answer: 0,
        hint: "Look at what rivers carry from the land.",
        why: "Rain breaks down rock, rivers carry the dissolved minerals to the sea, and evaporation concentrates them.",
      },
    },
    {
      id: "coral-is-alive",
      title: "Coral is a living thing",
      icon: Shell,
      caption: {
        "4-6": "Coral is alive, not a colored rock.",
        "7-9": "Coral is built by tiny animals that make hard skeletons around themselves.",
        "10-12": "Reefs are built by tiny animals called polyps. They share their tissue with algae that feed them and give the reef its color.",
      },
      quiz: {
        q: {
          "4-6": "Is coral alive?",
          "7-9": "What is coral made of?",
          "10-12": "Where does a reef get most of its food and color?",
        },
        options: ["Tiny living animals", "Hardened sand", "Sunken leaves"],
        answer: 0,
        hint: "It grows, and it started out very small.",
        why: "Each piece of coral is a colony of tiny animals. Their skeletons pile up over generations into a reef.",
      },
    },
  ],
  dinos: [
    {
      id: "trex-size",
      title: "How big a T. rex was",
      icon: Bone,
      caption: {
        "4-6": "A T. rex was as long as a school bus.",
        "7-9": "A T. rex grew about 12 meters long, roughly the length of a school bus.",
        "10-12": "T. rex reached about 12 meters long and stood around 4 meters tall at the hip. Its biggest teeth were as long as bananas.",
      },
      quiz: {
        q: {
          "4-6": "How big was a T. rex?",
          "7-9": "About how long was a fully grown T. rex?",
          "10-12": "Roughly how tall did a T. rex stand at the hip?",
        },
        options: ["About as long as a school bus", "About as long as a cat", "About as long as a shoe"],
        answer: 0,
        hint: "It was much bigger than a car.",
        why: "Adult T. rex measured around 12 meters, which is close to the length of a school bus.",
      },
    },
    {
      id: "dino-eggs",
      title: "Dinosaurs hatched from eggs",
      icon: Egg,
      caption: {
        "4-6": "Most dinosaurs came out of eggs.",
        "7-9": "Most dinosaurs laid eggs in nests, and the babies could walk soon after.",
        "10-12": "Nearly all dinosaurs hatched from eggs. Some species built large communal nests, and many hatchlings could feed themselves within hours.",
      },
      quiz: {
        q: {
          "4-6": "Where did baby dinosaurs come from?",
          "7-9": "How did most dinosaurs begin life?",
          "10-12": "What do fossil nest sites tell us about baby dinosaurs?",
        },
        options: ["Eggs", "Underground burrows", "The sea"],
        answer: 0,
        hint: "Think of what a chicken does.",
        why: "Dinosaurs laid eggs. Fossilized nests with eggs and hatchlings have been found on every continent.",
      },
    },
    {
      id: "long-necks",
      title: "Giants with long necks",
      icon: TreePine,
      caption: {
        "4-6": "A long neck helped a dinosaur reach tall leaves.",
        "7-9": "Long necks let giant plant eaters reach leaves high up in the trees.",
        "10-12": "Sauropods browsed tall vegetation with their necks. Air sacs inside their bones made them lighter and helped them breathe enough for their size.",
      },
      quiz: {
        q: {
          "4-6": "Why did some dinosaurs have long necks?",
          "7-9": "What did a very long neck help a dinosaur do?",
          "10-12": "What made such huge dinosaurs light enough to walk?",
        },
        options: ["Reach leaves high in the trees", "Swim much faster", "See in the dark"],
        answer: 0,
        hint: "Look up at the tallest branch you can imagine.",
        why: "A long neck opens up food nothing else can reach. Many of these giants also had hollow, air-filled bones.",
      },
    },
    {
      id: "fossils",
      title: "How we know: fossils",
      icon: Hammer,
      caption: {
        "4-6": "We learn about dinosaurs from old bones in the ground.",
        "7-9": "Dinosaur bones that have turned to stone are called fossils.",
        "10-12": "Fossils form when buried bone is slowly replaced by minerals. They are our main evidence, and new ones are still being dug up every year.",
      },
      quiz: {
        q: {
          "4-6": "How do we know about dinosaurs?",
          "7-9": "What is a fossil?",
          "10-12": "How does a bone become a fossil?",
        },
        options: ["Ancient bones or marks turned to stone", "Dinosaur footprints still warm", "Frozen dinosaur skin"],
        answer: 0,
        hint: "It is found in rock, not in ice.",
        why: "Minerals slowly replace the bone, so the shape survives in stone for millions of years.",
      },
    },
  ],
  animals: [
    {
      id: "zebra-stripes",
      title: "Every zebra is different",
      icon: PawPrint,
      caption: {
        "4-6": "Zebras have black and white stripes, and no two are the same.",
        "7-9": "A zebra's stripes are as unique as a fingerprint, and they may confuse biting flies.",
        "10-12": "Every zebra carries its own stripe pattern. Studies suggest the pattern disrupts biting flies, and a moving herd makes it hard for a predator to pick one animal.",
      },
      quiz: {
        q: {
          "4-6": "Do all zebras have the same stripes?",
          "7-9": "What is true about a zebra's stripes?",
          "10-12": "What is one likely job of zebra stripes?",
        },
        options: ["Every zebra has its own pattern", "All zebras look identical", "Zebras paint their stripes"],
        answer: 0,
        hint: "Think about fingerprints again.",
        why: "Stripe patterns differ from zebra to zebra, and researchers think they also bother biting flies.",
      },
    },
    {
      id: "bird-song",
      title: "Why birds sing",
      icon: Bird,
      caption: {
        "4-6": "Birds sing to talk to other birds.",
        "7-9": "Birds sing to claim a spot and to find a mate.",
        "10-12": "Songbirds learn their songs much as babies learn words. They sing to defend territory and to attract a mate, and different species have different songs.",
      },
      quiz: {
        q: {
          "4-6": "Why do birds sing?",
          "7-9": "What are two reasons a bird sings?",
          "10-12": "How do young songbirds get their songs?",
        },
        options: ["To talk to other birds", "Because they are cold", "To fall asleep"],
        answer: 0,
        hint: "A song can carry a message.",
        why: "Singing says 'this patch is mine' and 'I am here.' Young birds learn the tune from adults.",
      },
    },
    {
      id: "busy-hive",
      title: "A hive has a job for everyone",
      icon: Bug,
      caption: {
        "4-6": "Bees live together in a busy hive.",
        "7-9": "A honeybee hive can hold tens of thousands of bees, each with a job.",
        "10-12": "A healthy hive holds around 50,000 bees. Foragers gather nectar while nurse bees feed the young and the queen lays every egg.",
      },
      quiz: {
        q: {
          "4-6": "Where do bees live together?",
          "7-9": "About how many bees can a healthy hive hold?",
          "10-12": "Which bees fly out to collect nectar?",
        },
        options: ["Forager bees", "The queen", "Brand new baby bees"],
        answer: 0,
        hint: "Someone has to travel for the food.",
        why: "Older worker bees become foragers. The queen stays home to lay eggs, and young nurse bees feed the larvae.",
      },
    },
    {
      id: "snail-shell",
      title: "A snail carries its home",
      icon: Snail,
      caption: {
        "4-6": "A snail carries its home on its back.",
        "7-9": "A snail's shell is part of its body, so it can never come out of it.",
        "10-12": "A snail's shell grows with it and is attached to its spine. Many snails glide on mucus that lowers friction and protects their soft foot.",
      },
      quiz: {
        q: {
          "4-6": "What does a snail carry?",
          "7-9": "What is true about a snail's shell?",
          "10-12": "Why does a snail leave a shiny trail?",
        },
        options: ["The shell grows with the snail", "The shell falls off each year", "The shell is a separate house"],
        answer: 0,
        hint: "A snail that loses its shell cannot grow a new one.",
        why: "The shell is living body, not a home it visits. It enlarges as the snail grows.",
      },
    },
  ],
};

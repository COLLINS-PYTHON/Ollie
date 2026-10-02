import {
  HeartPulse, Brain, Wind, Stethoscope, Coins, Shapes, Sigma, Blocks,
  Palette, Scroll, Camera, Puzzle, CloudRain, Snowflake, Rainbow, Thermometer,
} from "lucide-react";
import type { Packs } from "./types";

export const PACK_B: Packs = {
  body: [
    {
      id: "heart-beats",
      title: "Your heart never takes a break",
      icon: HeartPulse,
      caption: {
        "4-6": "Your heart beats all day and all night without stopping.",
        "7-9": "Your heart beats about 100,000 times a day, and you never have to think about it.",
        "10-12": "The heart pumps roughly 7,000 liters of blood a day and beats about 100,000 times. When you run, it speeds up so your muscles get more oxygen.",
      },
      quiz: {
        q: {
          "4-6": "What does your heart do?",
          "7-9": "About how many times does your heart beat in a day?",
          "10-12": "Why does your heart beat faster when you exercise?",
        },
        options: ["It pushes blood around your body", "It breaks down food", "It helps you sleep"],
        answer: 0,
        hint: "Put a hand on your chest. What is moving?",
        why: "The heart is a pump. Muscles that are working need more blood, so it pumps quicker.",
      },
    },
    {
      id: "brain-messages",
      title: "Your brain sends messages",
      icon: Brain,
      caption: {
        "4-6": "Your brain helps you think, move and feel.",
        "7-9": "Your brain sends messages through your body faster than a racing car drives.",
        "10-12": "Your brain holds roughly 86 billion nerve cells. Some signals travel over 250 miles an hour, which is why you pull your hand from something hot before you even notice.",
      },
      quiz: {
        q: {
          "4-6": "What does your brain do?",
          "7-9": "How does your brain tell your hand to move?",
          "10-12": "Why do you jerk your hand away from heat so quickly?",
        },
        options: ["It sends messages to the body", "It makes your blood", "It filters your water"],
        answer: 0,
        hint: "Your body has an invisible wiring system.",
        why: "Nerve cells carry electrical messages. Some routes are short reflex arcs that skip thinking entirely.",
      },
    },
    {
      id: "breathing",
      title: "Breathing, about 20,000 times a day",
      icon: Wind,
      caption: {
        "4-6": "You breathe in air to feel strong and awake.",
        "7-9": "Your lungs take in oxygen and breathe out carbon dioxide.",
        "10-12": "You breathe around 20,000 times a day. Oxygen crosses into the blood inside millions of tiny air sacs, and carbon dioxide leaves on the way out.",
      },
      quiz: {
        q: {
          "4-6": "What do you breathe in?",
          "7-9": "What do your lungs take out of the air?",
          "10-12": "Where does oxygen enter the blood?",
        },
        options: ["Oxygen", "Milk", "Sunlight"],
        answer: 0,
        hint: "It is the part of air that keeps you alive.",
        why: "Air is mostly nitrogen, but the oxygen in it passes into the blood in the tiny air sacs of the lungs.",
      },
    },
    {
      id: "bones-fuse",
      title: "Babies have more bones than you",
      icon: Stethoscope,
      caption: {
        "4-6": "A baby has more bones than a grown-up does.",
        "7-9": "Babies start with about 300 bones, and grown-ups end up with 206.",
        "10-12": "A baby begins with roughly 300 bones. As you grow many fuse together, so an adult skeleton has 206.",
      },
      quiz: {
        q: {
          "4-6": "Who has more bones?",
          "7-9": "How many bones does a grown-up have?",
          "10-12": "What happens to bones as a child grows?",
        },
        options: ["A baby", "A grown-up", "They have the same number"],
        answer: 0,
        hint: "Some bones join together along the way.",
        why: "Many small bones merge. That is why the count drops from about 300 to 206.",
      },
    },
  ],
  math: [
    {
      id: "zero",
      title: "Zero is a number too",
      icon: Coins,
      caption: {
        "4-6": "Zero means nothing, and it is still a number.",
        "7-9": "Mathematicians in India turned zero into a number, and counting changed forever.",
        "10-12": "Zero became a number thanks to Indian mathematicians. Without it there would be no place value, no algebra and no computing.",
      },
      quiz: {
        q: {
          "4-6": "Is zero a number?",
          "7-9": "What does the 0 in 205 tell you?",
          "10-12": "Why was turning zero into a number such a big deal?",
        },
        options: ["There are no tens", "There are no ones", "There are no hundreds"],
        answer: 0,
        hint: "Look at which column the zero sits in.",
        why: "In 205 the zero holds the tens place, so the number reads two hundred and five, not two hundred and fifty.",
      },
    },
    {
      id: "shapes",
      title: "Shapes have rules",
      icon: Shapes,
      caption: {
        "4-6": "A circle has no corners, and a triangle has three.",
        "7-9": "A triangle has three sides, and its corners always add up to 180 degrees.",
        "10-12": "Every triangle's angles total 180 degrees, whatever it looks like. That rule holds on flat surfaces, but not on a curved one like a ball.",
      },
      quiz: {
        q: {
          "4-6": "How many corners does a triangle have?",
          "7-9": "What do the angles inside a triangle add up to?",
          "10-12": "On which surface does the 180 degree triangle rule break down?",
        },
        options: ["Three", "Four", "One"],
        answer: 0,
        hint: "Count the pointy bits on a slice of pizza.",
        why: "A triangle has three corners, and its angles always total 180 degrees on a flat surface.",
      },
    },
    {
      id: "no-biggest",
      title: "There is no biggest number",
      icon: Sigma,
      caption: {
        "4-6": "You can always count one more.",
        "7-9": "There is no biggest number because you can always add one.",
        "10-12": "No largest number exists, since adding one always gives a bigger one. Mathematicians even found that some infinities are larger than others.",
      },
      quiz: {
        q: {
          "4-6": "Can you always count one more?",
          "7-9": "What is the biggest number there is?",
          "10-12": "Why can there be no largest number?",
        },
        options: ["There isn't one", "A million", "A trillion"],
        answer: 0,
        hint: "Whatever you say, what happens if you add one?",
        why: "Any candidate can be beaten by adding one, so a biggest number cannot exist.",
      },
    },
    {
      id: "equal-fractions",
      title: "Different names, same amount",
      icon: Blocks,
      caption: {
        "4-6": "Two halves make one whole.",
        "7-9": "One half and two quarters are exactly the same amount.",
        "10-12": "Fractions can look different and still be equal: one half equals two quarters equals three sixths. The size of the pieces changes, the amount does not.",
      },
      quiz: {
        q: {
          "4-6": "How many halves make one whole?",
          "7-9": "Which is the same as one half?",
          "10-12": "Which fraction equals one half?",
        },
        options: ["Two quarters", "Three quarters", "One quarter"],
        answer: 0,
        hint: "Picture a pizza cut into four.",
        why: "Two quarters of the same pizza cover exactly the same space as one half.",
      },
    },
  ],
  art: [
    {
      id: "mixing-colors",
      title: "Mixing colors",
      icon: Palette,
      caption: {
        "4-6": "Blue and yellow mixed together make green.",
        "7-9": "Mixing two primary colors gives you a new color called a secondary color.",
        "10-12": "Painters blend red, yellow and blue to reach other colors. Screens work differently: they add red, green and blue light instead of paint.",
      },
      quiz: {
        q: {
          "4-6": "What do blue and yellow make?",
          "7-9": "What do you get from mixing blue and yellow paint?",
          "10-12": "Why do screens use red, green and blue instead of red, yellow and blue?",
        },
        options: ["Green", "Purple", "Orange"],
        answer: 0,
        hint: "Think about grass.",
        why: "Blue and yellow paint make green. Screens mix light, which follows different rules than pigment.",
      },
    },
    {
      id: "old-paintings",
      title: "Art is extremely old",
      icon: Scroll,
      caption: {
        "4-6": "People drew pictures on cave walls a very long time ago.",
        "7-9": "The oldest known cave paintings are more than 40,000 years old.",
        "10-12": "Some cave art in Europe and Indonesia is over 40,000 years old, painted with crushed minerals, charcoal and ochre.",
      },
      quiz: {
        q: {
          "4-6": "Where did people paint very long ago?",
          "7-9": "About how old are the oldest cave paintings?",
          "10-12": "What did the first painters use as paint?",
        },
        options: ["On cave walls", "On paper", "On phones"],
        answer: 0,
        hint: "Paper had not been invented yet.",
        why: "The earliest paintings are on stone. The pigments were minerals and charcoal, mixed with water or fat.",
      },
    },
    {
      id: "how-cameras-work",
      title: "How a camera works",
      icon: Camera,
      caption: {
        "4-6": "A camera catches light to make a picture.",
        "7-9": "A camera lets light in for a moment to record what it sees.",
        "10-12": "A camera opens for a fraction of a second and records light. Film used chemicals; modern sensors use millions of tiny light points that turn brightness into numbers.",
      },
      quiz: {
        q: {
          "4-6": "What does a camera need to take a picture?",
          "7-9": "What does a camera record?",
          "10-12": "What does a digital camera sensor do?",
        },
        options: ["Light", "Water", "Sound"],
        answer: 0,
        hint: "Try taking a photo in a pitch dark room.",
        why: "Without light there is nothing to record, which is why cameras need some brightness to work.",
      },
    },
    {
      id: "patterns",
      title: "Patterns are everywhere",
      icon: Puzzle,
      caption: {
        "4-6": "Tiles can repeat in a fun pattern.",
        "7-9": "Artists repeat shapes to make patterns your eye can follow.",
        "10-12": "Repeating patterns show up in tilework and in nature, like honeycombs. Artists use them to lead the eye and to build rhythm.",
      },
      quiz: {
        q: {
          "4-6": "What makes a pattern?",
          "7-9": "What do artists repeat to make a pattern?",
          "10-12": "Where else do patterns appear without any artist?",
        },
        options: ["Something that repeats", "One big dot", "A single line"],
        answer: 0,
        hint: "Say it out loud: clap, clap, clap.",
        why: "A pattern is a repeat. You find them in tiles, in honeycombs and in the rings of a tree.",
      },
    },
  ],
  weather: [
    {
      id: "rain",
      title: "Where rain comes from",
      icon: CloudRain,
      caption: {
        "4-6": "Rain falls when clouds grow heavy.",
        "7-9": "Water rises from the sea, forms clouds, and falls back down as rain.",
        "10-12": "The water cycle moves water endlessly. It evaporates, condenses into cloud droplets, falls as rain or snow, then runs back to the sea.",
      },
      quiz: {
        q: {
          "4-6": "Where does rain fall from?",
          "7-9": "What happens to sea water before it becomes rain?",
          "10-12": "What powers the water cycle?",
        },
        options: ["Clouds", "Rivers", "The Moon"],
        answer: 0,
        hint: "Look up on a grey day.",
        why: "Clouds hold tiny water droplets. When they grow heavy enough, the water falls as rain.",
      },
    },
    {
      id: "snowflakes",
      title: "Snowflakes always have six sides",
      icon: Snowflake,
      caption: {
        "4-6": "Every snowflake has six sides.",
        "7-9": "Snowflakes always grow six arms, but no two look exactly alike.",
        "10-12": "Water molecules lock into a six-sided crystal, so every flake has six arms. Each one takes a different path through the cloud, which is why no two match.",
      },
      quiz: {
        q: {
          "4-6": "How many sides does a snowflake have?",
          "7-9": "Why do snowflakes all have six arms?",
          "10-12": "Why is no two snowflakes identical?",
        },
        options: ["Six", "Four", "Ten"],
        answer: 0,
        hint: "It is more than four but fewer than eight.",
        why: "Water freezes into a hexagonal shape. Each flake also experiences a slightly different route of temperature and humidity.",
      },
    },
    {
      id: "wind",
      title: "Wind is moving air",
      icon: Wind,
      caption: {
        "4-6": "Moving air is called wind.",
        "7-9": "Wind happens when warm air rises and cooler air moves in to fill the gap.",
        "10-12": "The Sun heats the ground unevenly. Warm air rises, cooler air rushes in behind it, and that flow is what we feel as wind.",
      },
      quiz: {
        q: {
          "4-6": "What is wind?",
          "7-9": "What makes wind blow?",
          "10-12": "What is the underlying cause of wind?",
        },
        options: ["Moving air", "Falling water", "Warm sunlight"],
        answer: 0,
        hint: "Wave your hand in front of your face. What do you feel?",
        why: "Air that is heated rises, and the air beside it slides in to replace it. Moving air is wind.",
      },
    },
    {
      id: "rainbows",
      title: "How a rainbow appears",
      icon: Rainbow,
      caption: {
        "4-6": "A rainbow shows many colors in the sky.",
        "7-9": "Raindrops split sunlight into a rainbow of colors.",
        "10-12": "Each raindrop bends and separates sunlight into its colors. You see a rainbow when the Sun is behind you and the rain is in front of you.",
      },
      quiz: {
        q: {
          "4-6": "What makes a rainbow?",
          "7-9": "When can you see a rainbow?",
          "10-12": "What does a raindrop do to sunlight?",
        },
        options: ["Raindrops bending light", "Clouds blocking the Sun", "Snow melting"],
        answer: 0,
        hint: "Rain plus sunshine.",
        why: "Water bends light, and different colors bend by different amounts, so the mix spreads out into a band of colors.",
      },
    },
  ],
};

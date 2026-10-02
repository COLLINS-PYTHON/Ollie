import {
  Landmark, PenLine, Castle, Map, Drum, Guitar, Piano, Mic,
  Bot, Cpu, Gamepad2, Wifi, BookOpen, Quote, Lightbulb, Notebook,
} from "lucide-react";
import type { Packs } from "./types";

export const PACK_C: Packs = {
  history: [
    {
      id: "pyramids",
      title: "Who built the pyramids",
      icon: Landmark,
      caption: {
        "4-6": "The pyramids were built a very long time ago.",
        "7-9": "The great pyramids were built about 4,500 years ago as royal tombs.",
        "10-12": "The pyramids at Giza were built around 2560 BCE. Skilled workers, not slaves, raised them with ramps, ropes, sledges and copper tools.",
      },
      quiz: {
        q: {
          "4-6": "Are the pyramids old or new?",
          "7-9": "About how long ago were the great pyramids built?",
          "10-12": "Who actually built the pyramids?",
        },
        options: ["Skilled workers", "Robots", "Giants"],
        answer: 0,
        hint: "Archaeologists found their villages and their tools.",
        why: "Worker towns with bakeries, tools and graves were found beside the pyramids. They were paid builders.",
      },
    },
    {
      id: "first-writing",
      title: "Writing was invented",
      icon: PenLine,
      caption: {
        "4-6": "A long time ago people started making marks to remember things.",
        "7-9": "The first writing used little pictures, and later became true letters.",
        "10-12": "Writing began in Mesopotamia around 5,000 years ago as wedge-shaped marks pressed into wet clay, mostly to track grain and trade.",
      },
      quiz: {
        q: {
          "4-6": "Why did people first write things down?",
          "7-9": "What was the first writing used for?",
          "10-12": "What did the earliest written records mostly track?",
        },
        options: ["Keeping records of food and trade", "Writing letters to friends", "Drawing maps of the stars"],
        answer: 0,
        hint: "Before money, people needed to remember what they owed.",
        why: "The oldest clay tablets are receipts: who gave how much grain, and when.",
      },
    },
    {
      id: "castles",
      title: "Why castles were built",
      icon: Castle,
      caption: {
        "4-6": "Castles were big, strong stone homes.",
        "7-9": "Castles were built to keep people safe during attacks.",
        "10-12": "Medieval castles combined defense with daily life: thick walls, a well inside, and space for hundreds of people, animals and stores.",
      },
      quiz: {
        q: {
          "4-6": "What were castles for?",
          "7-9": "Why did a castle need its own well?",
          "10-12": "What made a castle both a home and a fortification?",
        },
        options: ["To keep people safe", "To store food only", "To watch the stars"],
        answer: 0,
        hint: "Imagine the doors being shut for a long time.",
        why: "A besieged castle had to hold out for weeks, so it needed water, food and workshops inside its walls.",
      },
    },
    {
      id: "old-maps",
      title: "Maps used to be guesses",
      icon: Map,
      caption: {
        "4-6": "Maps show where places are.",
        "7-9": "Old maps were drawn by hand, and whole coasts were missing from them.",
        "10-12": "Early maps were partly guesswork. Sailors filled the gaps by reading stars, currents and compass bearings rather than trusting the paper.",
      },
      quiz: {
        q: {
          "4-6": "What does a map show?",
          "7-9": "What did sailors use to find their way at sea?",
          "10-12": "Why were early maps often wrong?",
        },
        options: ["Stars and compasses", "Phones", "Cameras"],
        answer: 0,
        hint: "Think about what hangs in the night sky.",
        why: "Before satellites, position came from the stars, a compass and a lot of patience.",
      },
    },
  ],
  music: [
    {
      id: "drums",
      title: "Drums are very old",
      icon: Drum,
      caption: {
        "4-6": "Drums make a deep boom that you feel in your tummy.",
        "7-9": "Drums are some of the oldest instruments in the world.",
        "10-12": "Drums appear in nearly every culture and long predate writing. A drum's pitch depends on the size of the shell and how tightly the skin is stretched.",
      },
      quiz: {
        q: {
          "4-6": "What makes a drum sound?",
          "7-9": "What decides how deep a drum sounds?",
          "10-12": "How does a drummer change a drum's pitch?",
        },
        options: ["A skin being hit", "A string being pulled", "Air blown through a tube"],
        answer: 0,
        hint: "It is the part you strike with your hand.",
        why: "Hitting the skin sets it vibrating. Stretch it tighter and the vibration speeds up, so the note rises.",
      },
    },
    {
      id: "strings-vibrate",
      title: "Strings make sound by shaking",
      icon: Guitar,
      caption: {
        "4-6": "Pluck a string and it goes ping.",
        "7-9": "A string makes sound by vibrating, and thinner strings sound higher.",
        "10-12": "All sound starts as a vibration. Shorter, tighter and thinner strings vibrate faster, which is why they produce higher notes.",
      },
      quiz: {
        q: {
          "4-6": "What does a string do to make sound?",
          "7-9": "Which string makes the highest note?",
          "10-12": "What three things raise a string's pitch?",
        },
        options: ["It vibrates", "It melts", "It glows"],
        answer: 0,
        hint: "Touch a plucked string. What do you feel?",
        why: "Sound is vibration traveling through the air. Faster vibrations mean higher notes.",
      },
    },
    {
      id: "piano",
      title: "Inside a piano",
      icon: Piano,
      caption: {
        "4-6": "A piano has black and white keys.",
        "7-9": "A piano has 88 keys, and each one makes a little hammer hit a string.",
        "10-12": "A standard piano has 88 keys. Pressing one drives a felt hammer into strings, and the soundboard spreads that vibration into the room.",
      },
      quiz: {
        q: {
          "4-6": "What does a piano have?",
          "7-9": "How does a piano make a sound?",
          "10-12": "What spreads the sound of a piano into the room?",
        },
        options: ["A small hammer hits a string", "Air goes through a pipe", "A skin is tapped"],
        answer: 0,
        hint: "It is not a wind instrument, and it has no skin to hit.",
        why: "Inside the case, each key throws a hammer at its strings. The wooden soundboard then amplifies them.",
      },
    },
    {
      id: "voice",
      title: "Your voice is an instrument",
      icon: Mic,
      caption: {
        "4-6": "Your voice can sing, hum and shout.",
        "7-9": "Your voice comes from two small flaps in your throat called vocal cords.",
        "10-12": "Air from your lungs sets your vocal cords vibrating. Changing their tension changes the pitch, exactly like tightening a guitar string.",
      },
      quiz: {
        q: {
          "4-6": "What makes your voice?",
          "7-9": "What do your vocal cords do?",
          "10-12": "How do you sing a higher note?",
        },
        options: ["Vocal cords vibrating", "Your teeth", "Your fingers"],
        answer: 0,
        hint: "Put a hand on your throat and say ahh.",
        why: "Cords stretch and tighten to raise pitch and loosen to lower it. You can feel them buzz.",
      },
    },
  ],
  tech: [
    {
      id: "robots",
      title: "What a robot really is",
      icon: Bot,
      caption: {
        "4-6": "A robot does what people tell it to do.",
        "7-9": "A robot only does what its instructions say, and nothing more.",
        "10-12": "A robot runs a program, which is a list of steps. It can react to sensors, but it has no wishes of its own.",
      },
      quiz: {
        q: {
          "4-6": "Who tells a robot what to do?",
          "7-9": "What tells a robot how to behave?",
          "10-12": "Why does a robot never decide to do something new on its own?",
        },
        options: ["A program written by people", "A battery", "A mirror"],
        answer: 0,
        hint: "A battery gives power, but it does not give ideas.",
        why: "A robot follows written steps. Without a program it would just stand there.",
      },
    },
    {
      id: "binary",
      title: "Computers count in twos",
      icon: Cpu,
      caption: {
        "4-6": "Computers use just two numbers inside.",
        "7-9": "Computers store everything using only 1s and 0s.",
        "10-12": "Computers use bits, each a 1 or a 0, because a switch is either on or off. Eight bits make a byte, and a letter is usually one byte.",
      },
      quiz: {
        q: {
          "4-6": "How many numbers does a computer use inside?",
          "7-9": "What digits does a computer use inside?",
          "10-12": "Why do computers use binary?",
        },
        options: ["1 and 0", "1 to 9", "A to Z"],
        answer: 0,
        hint: "A switch has two states: on and off.",
        why: "Two states are easy to build with switches. Everything you see is those bits arranged in huge patterns.",
      },
    },
    {
      id: "games",
      title: "Why games look smooth",
      icon: Gamepad2,
      caption: {
        "4-6": "Games need a computer that thinks very fast.",
        "7-9": "A game redraws the whole screen many times every second.",
        "10-12": "Games redraw the screen 30 to 60 times a second, and the console performs billions of small calculations to make that happen.",
      },
      quiz: {
        q: {
          "4-6": "Does a game need a fast computer?",
          "7-9": "About how many times a second does a game redraw the screen?",
          "10-12": "Why does a game look smooth instead of flickery?",
        },
        options: ["About 30 to 60 times", "Once", "About five times"],
        answer: 0,
        hint: "Flip a stack of drawings quickly and it seems to move.",
        why: "Each frame is a brand new picture. Fast enough, your eye blends them into motion.",
      },
    },
    {
      id: "wifi",
      title: "How WiFi reaches your tablet",
      icon: Wifi,
      caption: {
        "4-6": "WiFi sends messages through the air.",
        "7-9": "WiFi carries information on invisible radio waves.",
        "10-12": "WiFi sends data as radio waves between a router and your device. The router encodes your request into a signal, and turns the answer back into something you can see.",
      },
      quiz: {
        q: {
          "4-6": "Does WiFi need a wire to your tablet?",
          "7-9": "What does WiFi use to carry information?",
          "10-12": "What does a router actually do?",
        },
        options: ["Radio waves", "Wires in the sky", "Mirrors"],
        answer: 0,
        hint: "It is the same family of waves as a radio station.",
        why: "Radio waves travel through walls and air. The router turns data into those waves and back again.",
      },
    },
  ],
  reading: [
    {
      id: "story-shape",
      title: "Stories have a shape",
      icon: BookOpen,
      caption: {
        "4-6": "Stories have a beginning, a middle and an end.",
        "7-9": "Most stories introduce a character, then hand them a problem to solve.",
        "10-12": "Narratives follow a shape: setup, rising conflict, climax, resolution. That pattern is why a good story feels complete when it stops.",
      },
      quiz: {
        q: {
          "4-6": "What does a story start with?",
          "7-9": "What does a story usually give its main character?",
          "10-12": "Which part of a story comes right before the ending?",
        },
        options: ["A character and a problem", "A list of rules", "A recipe"],
        answer: 0,
        hint: "Think of your favorite film. Who is in trouble?",
        why: "A character plus a problem is the engine of a story. Solve it, and you have an ending.",
      },
    },
    {
      id: "new-words",
      title: "Books hand you new words",
      icon: Quote,
      caption: {
        "4-6": "Reading teaches you words you have never heard.",
        "7-9": "Reading brings you far more unusual words than everyday talking does.",
        "10-12": "Books use several times more rare words than ordinary conversation, which is one reason wide reading grows a vocabulary faster than school alone.",
      },
      quiz: {
        q: {
          "4-6": "Where can you learn brand new words?",
          "7-9": "Where do people meet the most unusual words?",
          "10-12": "Why does reading build vocabulary faster than conversation?",
        },
        options: ["In books", "In shopping lists", "In a song on repeat"],
        answer: 0,
        hint: "Talk to a friend all day, then read one chapter. Which one surprises you more?",
        why: "Speakers repeat common words. Writers use the whole dictionary, so each page brings words you rarely hear.",
      },
    },
    {
      id: "imagination",
      title: "Your brain paints the scene",
      icon: Lightbulb,
      caption: {
        "4-6": "When you read, your mind can see the story.",
        "7-9": "While you read, your brain makes the pictures itself.",
        "10-12": "Reading switches on parts of the brain involved in actually experiencing a scene, which is why a strong paragraph can feel almost like a memory.",
      },
      quiz: {
        q: {
          "4-6": "Who makes the pictures when you read?",
          "7-9": "What does your brain do while you read?",
          "10-12": "Why can a written scene feel so real?",
        },
        options: ["Your own brain", "The author with a camera", "Nobody"],
        answer: 0,
        hint: "No screen is needed for this one.",
        why: "Language activates the same senses it describes, so your own brain does the drawing.",
      },
    },
    {
      id: "write-your-own",
      title: "Making up your own story",
      icon: Notebook,
      caption: {
        "4-6": "You can invent a story of your own.",
        "7-9": "Writers often begin by asking one simple question.",
        "10-12": "Many writers start from a single what-if and follow it honestly. A question plus a limit is usually enough to grow a plot.",
      },
      quiz: {
        q: {
          "4-6": "Can you make up your own story?",
          "7-9": "What is a good first step when writing a story?",
          "10-12": "What do many writers start with?",
        },
        options: ["Ask what if", "Count the pages", "Choose the longest word"],
        answer: 0,
        hint: "Try: what if dragons were afraid of fire?",
        why: "A what-if question gives you a character, a twist and a direction all at once.",
      },
    },
  ],
};

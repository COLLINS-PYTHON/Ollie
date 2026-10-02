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
options: {
          "4-6": [
            "Very old",
            "Brand new",
            "Built last week",
          ],
          "7-9": [
            "About 4,500 years ago",
            "About 45 years ago",
            "About 450 years ago",
          ],
          "10-12": [
            "Skilled workers",
            "Robots",
            "Giants",
          ],
        },
        answer: 0,
hint: {
          "4-6": "They have stood there for thousands of years.",
          "7-9": "It is thousands of years, not hundreds.",
          "10-12": "No machines had been invented yet.",
        },
why: {
          "4-6": "The pyramids were built a very long time ago.",
          "7-9": "The great pyramids were built about 4,500 years ago as royal tombs.",
          "10-12": "Skilled workers raised them with ramps, ropes, sledges and copper tools.",
        },
      },    },
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
options: {
          "4-6": [
            "To keep people safe",
            "To hold a market",
            "To store grain",
          ],
          "7-9": [
            "So it could hold out in a siege",
            "So the king could swim",
            "To water the gardens",
          ],
          "10-12": [
            "Thick walls, a defended gate and its own water",
            "Painted windows and carpets",
            "Tall towers with no doors",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Kings wanted somewhere hard to attack.",
          "7-9": "An army could surround a castle for months.",
          "10-12": "Think about what an army cuts off first.",
        },
why: {
          "4-6": "Castles were built to keep people safe from attack.",
          "7-9": "A well meant the castle still had water when enemies surrounded it.",
          "10-12": "Strong walls, a defended gate and its own water made a castle both a home and a fort.",
        },
      },    },
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
options: {
          "4-6": [
            "A skin being hit",
            "A string being pulled",
            "Air blown through a tube",
          ],
          "7-9": [
            "How tight the skin is",
            "What colour it is",
            "How old it is",
          ],
          "10-12": [
            "By tightening or loosening the skin",
            "By painting it",
            "By filling it with water",
          ],
        },
        answer: 0,
hint: {
          "4-6": "It has a tight top like a trampoline.",
          "7-9": "Think about a drum skin you press with a finger.",
          "10-12": "Drummers turn the bolts around the rim.",
        },
why: {
          "4-6": "Hitting the tight skin makes the air vibrate and sound.",
          "7-9": "A tighter skin gives a higher sound, a looser one a deeper sound.",
          "10-12": "Changing the tension of the skin changes the pitch.",
        },
      },    },
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
options: {
          "4-6": [
            "It vibrates",
            "It melts",
            "It glows",
          ],
          "7-9": [
            "The shortest, tightest one",
            "The longest, loosest one",
            "The one in the middle",
          ],
          "10-12": [
            "Shorter, tighter and thinner",
            "Longer, looser and thicker",
            "Heavier, wider and wetter",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Pluck a rubber band and watch it.",
          "7-9": "Short bands sing higher.",
          "10-12": "Three changes all push the note upward.",
        },
why: {
          "4-6": "A string sounds by vibrating, shaking back and forth fast.",
          "7-9": "A short, tight string vibrates faster and makes the highest note.",
          "10-12": "Shorter, tighter and thinner strings all vibrate faster, so the note rises.",
        },
      },    },
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
options: {
          "4-6": [
            "Strings and keys",
            "Only buttons",
            "A big drum",
          ],
          "7-9": [
            "A small hammer hits a string",
            "Air goes through a pipe",
            "A skin is tapped",
          ],
          "10-12": [
            "The soundboard",
            "The pedal",
            "The lid",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Look inside an upright piano.",
          "7-9": "Something small strikes inside.",
          "10-12": "It is the big wooden panel underneath the strings.",
        },
why: {
          "4-6": "A piano has strings behind its keys.",
          "7-9": "Pressing a key makes a small hammer hit a string.",
          "10-12": "The soundboard spreads the string's vibration into the room.",
        },
      },    },
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
options: {
          "4-6": [
            "Your vocal cords",
            "Your teeth",
            "Your fingers",
          ],
          "7-9": [
            "They vibrate to make sound",
            "They cool the air",
            "They push food down",
          ],
          "10-12": [
            "By tightening them so they vibrate faster",
            "By opening your mouth wider",
            "By breathing in more slowly",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Put a hand on your throat and hum.",
          "7-9": "Feel your throat while you talk.",
          "10-12": "Faster vibration means a higher note.",
        },
why: {
          "4-6": "Air passing over your vocal cords makes your voice.",
          "7-9": "The cords vibrate, and that turns air into sound.",
          "10-12": "Tightening the cords makes them vibrate faster, which raises the note.",
        },
      },    },
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
options: {
          "4-6": [
            "No, it can work on a slow one",
            "Yes, always",
            "Only on a big TV",
          ],
          "7-9": [
            "About 30 to 60 times",
            "Once",
            "About five times",
          ],
          "10-12": [
            "Because it redraws the picture many times a second",
            "Because the colours are bright",
            "Because the screen is glass",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Plenty of fun games run on old machines.",
          "7-9": "It is far more than five.",
          "10-12": "Think about a flipbook.",
        },
why: {
          "4-6": "A game can run on a slow computer, it just looks less smooth.",
          "7-9": "Most games redraw the screen about 30 to 60 times a second.",
          "10-12": "So many pictures in a row blend together, which is what makes motion look smooth.",
        },
      },    },
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
options: {
          "4-6": [
            "No",
            "Yes",
            "Only at night",
          ],
          "7-9": [
            "Radio waves",
            "Wires in the sky",
            "Mirrors",
          ],
          "10-12": [
            "It sends information between the internet and your devices",
            "It makes the internet",
            "It charges your tablet",
          ],
        },
        answer: 0,
hint: {
          "4-6": "Your tablet has no cable hanging off it.",
          "7-9": "It is the same family as radio and TV signals.",
          "10-12": "It sits between your devices and the cable in the wall.",
        },
why: {
          "4-6": "WiFi works without a wire to your tablet.",
          "7-9": "WiFi carries information on radio waves.",
          "10-12": "A router passes information back and forth between the internet and everything in the house.",
        },
      },    },
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

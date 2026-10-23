export type TopicTeaching = { young: string[]; middle: string[]; questions: Array<{ q: string; options: string[]; answer: number; hint: string }> };
export const TOPIC_TEACHING: Record<string,TopicTeaching> = {
 "moon-phases": {
  "young": [
   "We see different Moon shapes.",
   "Moon shapes repeat about every month.",
   "A crescent is not Earth's shadow.",
   "The Moon turns as it travels."
  ],
  "middle": [
   "Moon phases change as we see different amounts of the half lit by the Sun.",
   "A full cycle of Moon phases takes about 29.5 days.",
   "Earth's shadow reaches the Moon during a lunar eclipse, not during ordinary crescent phases.",
   "The Moon turns once per orbit, keeping nearly the same face toward Earth. Both sides receive sunlight."
  ],
  "questions": [
   {
    "q": "Why does the Moon seem to change shape?",
    "options": [
     "Our view of its sunlit half changes",
     "Its rock grows and shrinks",
     "Clouds carve its edges"
    ],
    "answer": 0,
    "hint": "Think about looking at a lit ball from different places."
   },
   {
    "q": "About how long does one full Moon phase cycle take?",
    "options": [
     "About a month",
     "About an afternoon",
     "About ten years"
    ],
    "answer": 0,
    "hint": "The cycle is close to thirty days."
   },
   {
    "q": "When can Earth's shadow fall on the Moon?",
    "options": [
     "During a lunar eclipse",
     "During every crescent phase",
     "Whenever the Moon rises"
    ],
    "answer": 0,
    "hint": "This event needs the Sun, Earth, and Moon to line up."
   },
   {
    "q": "Why do we see nearly the same Moon face?",
    "options": [
     "Its turn takes as long as its orbit",
     "It never turns at all",
     "Its far side never receives sunlight"
    ],
    "answer": 0,
    "hint": "Compare the time for one turn with one trip around Earth."
   }
  ]
 },
 "stars-are-suns": {
  "young": [
   "Stars make energy deep inside.",
   "A light-year tells how far.",
   "Blue stars are usually hotter.",
   "Near stars can look brighter."
  ],
  "middle": [
   "In Sun-like stars, hydrogen joins to form helium in the core, releasing energy through nuclear fusion.",
   "A light-year is the distance light travels in one year, not a measure of time.",
   "Blue stars generally have hotter surfaces than red stars.",
   "A star's apparent brightness depends on its distance and how much light it makes."
  ],
  "questions": [
   {
    "q": "What gives a Sun-like star energy?",
    "options": [
     "Hydrogen joining to make helium",
     "Wood burning inside it",
     "Earth shining on its surface"
    ],
    "answer": 0,
    "hint": "The energy comes from tiny particles joining."
   },
   {
    "q": "What does a light-year measure?",
    "options": [
     "Distance",
     "A star's age",
     "The length of winter"
    ],
    "answer": 0,
    "hint": "Its name includes year, but it measures how far light travels."
   },
   {
    "q": "Which star color usually means a hotter surface?",
    "options": [
     "Blue",
     "Red",
     "Both always mean equal temperatures"
    ],
    "answer": 0,
    "hint": "Star colors do not follow the hot-red rule of many drawings."
   },
   {
    "q": "Why might a less powerful star look brighter than another?",
    "options": [
     "It is closer to us",
     "It has a longer name",
     "It contains more planets"
    ],
    "answer": 0,
    "hint": "How far away a light is affects how bright it looks."
   }
  ]
 },
 "our-sun": {
  "young": [
   "Sunlight takes minutes to reach us.",
   "The Sun's pull helps planets orbit.",
   "Sunshine helps water enter the air.",
   "Earth's tilt gives us seasons."
  ],
  "middle": [
   "Sunlight takes about eight minutes and twenty seconds to travel from the Sun to Earth.",
   "The Sun's gravity bends planets' paths, while their sideways motion keeps them orbiting rather than falling straight inward.",
   "The Sun supplies energy for evaporation, turning liquid water into invisible water vapor.",
   "Earth's tilt causes seasons. Summer brings longer days and more direct sunlight to that hemisphere."
  ],
  "questions": [
   {
    "q": "How long does sunlight take to reach Earth?",
    "options": [
     "About eight minutes and twenty seconds",
     "Exactly two hours",
     "Less than a blink"
    ],
    "answer": 0,
    "hint": "Even fast-moving light needs several minutes for this trip."
   },
   {
    "q": "What helps planets keep orbiting the Sun?",
    "options": [
     "Gravity together with sideways motion",
     "Air blowing between planets",
     "Ropes joining planets to the Sun"
    ],
    "answer": 0,
    "hint": "An orbit needs both a pull and motion across that pull."
   },
   {
    "q": "How does sunshine help the water cycle?",
    "options": [
     "It supplies energy for evaporation",
     "It turns ocean salt into clouds",
     "It makes all water stay frozen"
    ],
    "answer": 0,
    "hint": "Think about liquid water becoming vapor."
   },
   {
    "q": "What mainly causes Earth's seasons?",
    "options": [
     "Earth's tilt",
     "Earth changing its size",
     "The Sun switching off in winter"
    ],
    "answer": 0,
    "hint": "The angle and length of daylight change through the year."
   }
  ]
 },
 "eight-planets": {
  "young": [
   "Earth is third from the Sun.",
   "The inner four planets are rocky.",
   "Farther planets usually take longer.",
   "Pluto is a dwarf planet."
  ],
  "middle": [
   "The planets begin Mercury, Venus, Earth, and Mars. Earth is third in the full line of eight.",
   "The four inner planets are rocky. Jupiter and Saturn are gas giants; Uranus and Neptune are ice giants.",
   "Farther planets generally take longer to orbit. Mercury needs 88 Earth days; Neptune needs about 165 Earth years.",
   "Pluto is a dwarf planet because it has not cleared its orbital neighborhood of other objects."
  ],
  "questions": [
   {
    "q": "Which planet lies between Venus and Mars in order from the Sun?",
    "options": [
     "Earth",
     "Mercury",
     "Neptune"
    ],
    "answer": 0,
    "hint": "Count outward: Mercury, Venus, then our home."
   },
   {
    "q": "Which group has rocky surfaces?",
    "options": [
     "The four inner planets",
     "Only the two ice giants",
     "All eight planets equally"
    ],
    "answer": 0,
    "hint": "Look at the planets closest to the Sun."
   },
   {
    "q": "Which takes longer to orbit the Sun?",
    "options": [
     "Neptune",
     "The answer is mercury",
     "Both take 88 days"
    ],
    "answer": 0,
    "hint": "Compare an outer planet with the closest planet."
   },
   {
    "q": "Why is Pluto classed as a dwarf planet?",
    "options": [
     "It shares its orbital neighborhood with other objects",
     "It has no name in science",
     "It lies outside the solar system"
    ],
    "answer": 0,
    "hint": "The classification concerns the neighborhood of its orbit."
   }
  ]
 },
 "deep-and-dark": {
  "young": [
   "Deep ocean water gets little sunlight.",
   "Deeper water presses more strongly.",
   "Sound echoes help map the seabed.",
   "Some deep-sea life uses chemical energy."
  ],
  "middle": [
   "Water absorbs and scatters sunlight, leaving essentially none below about 1,000 meters.",
   "Pressure grows with ocean depth because more water lies above.",
   "Sonar maps the seafloor by measuring echoes of sound pulses.",
   "Near deep-sea vents, some food webs start with microbes using chemical energy instead of sunlight."
  ],
  "questions": [
   {
    "q": "Why does sunlight fade as ocean depth increases?",
    "options": [
     "Water absorbs and scatters it",
     "Sand turns every ray blue",
     "Fish store all the light"
    ],
    "answer": 0,
    "hint": "Think about what water does to light along its path."
   },
   {
    "q": "Why is pressure greater deeper underwater?",
    "options": [
     "More water lies above",
     "The water has less weight above",
     "The seafloor pulls sunlight down"
    ],
    "answer": 0,
    "hint": "Imagine the amount of water over a deep-sea vehicle."
   },
   {
    "q": "What does sonar use to map the seafloor?",
    "options": [
     "Sound echoes",
     "Smells from seaweed",
     "Moonlight reflected from sand"
    ],
    "answer": 0,
    "hint": "A pulse travels out and returns as an echo."
   },
   {
    "q": "What starts some food webs near deep-sea vents?",
    "options": [
     "Microbes using chemical energy",
     "Grass using bright sunshine",
     "Trees growing on ocean waves"
    ],
    "answer": 0,
    "hint": "These tiny organisms can supply food energy without sunlight."
   }
  ]
 },
 "sea-turtles": {
  "young": [
   "Sea turtles breathe air with lungs.",
   "Resting turtles use oxygen more slowly.",
   "Flippers help sea turtles swim.",
   "Sea turtle eggs grow on beaches."
  ],
  "middle": [
   "Sea turtles have lungs, so they surface for air rather than taking oxygen from water through gills.",
   "A resting sea turtle uses oxygen more slowly than a swimming one, so dive times vary.",
   "Streamlined shells and strong flippers help sea turtles swim. They cannot pull their heads fully inside their shells.",
   "Female sea turtles lay eggs on sandy beaches. Young turtles develop on land before entering the ocean."
  ],
  "questions": [
   {
    "q": "Why must sea turtles surface?",
    "options": [
     "To breathe air with their lungs",
     "To wash sand from their gills",
     "To refill their shells with bubbles"
    ],
    "answer": 0,
    "hint": "Their breathing organs are like ours, not fish gills."
   },
   {
    "q": "Which turtle would usually use oxygen more slowly?",
    "options": [
     "A resting turtle",
     "A turtle swimming actively",
     "Both always use it at exactly the same rate"
    ],
    "answer": 0,
    "hint": "Activity changes the body's oxygen needs."
   },
   {
    "q": "What helps sea turtles move through water efficiently?",
    "options": [
     "Strong flippers and streamlined shells",
     "Long feathers and hollow wings",
     "Square shells and tiny hooves"
    ],
    "answer": 0,
    "hint": "Look at the parts that push through water."
   },
   {
    "q": "Why do sea turtles need healthy beaches as well as oceans?",
    "options": [
     "Their eggs develop on beaches",
     "Adults grow leaves on beaches",
     "Their flippers only work on sand"
    ],
    "answer": 0,
    "hint": "Think about the first part of a turtle's life."
   }
  ]
 },
 "why-salty": {
  "young": [
   "Evaporating water leaves salt behind.",
   "Rivers carry dissolved minerals to oceans.",
   "Some dissolved materials leave seawater.",
   "Some sea places are saltier."
  ],
  "middle": [
   "When seawater evaporates, water becomes vapor while dissolved salts remain behind.",
   "Rainwater reacts with rocks, and rivers carry dissolved materials toward oceans. Underwater reactions also add materials.",
   "Shell building, mineral formation, and reactions with seafloor rocks remove some dissolved substances from seawater.",
   "Salinity measures dissolved salt. Rain, rivers, evaporation, and changing ice can make it vary between places."
  ],
  "questions": [
   {
    "q": "What happens to salt when seawater evaporates?",
    "options": [
     "It stays behind",
     "It all becomes water vapor",
     "It turns into sunlight"
    ],
    "answer": 0,
    "hint": "Water and salt do not leave together during evaporation."
   },
   {
    "q": "How do rivers help supply ocean salts?",
    "options": [
     "They carry dissolved substances from rocks",
     "They turn fish scales into salt",
     "They carry only pure water"
    ],
    "answer": 0,
    "hint": "Rainwater can pick up materials from rocks."
   },
   {
    "q": "Which process removes some dissolved substances from seawater?",
    "options": [
     "Animals building shells",
     "Clouds making thunder",
     "The Moon becoming full"
    ],
    "answer": 0,
    "hint": "Some sea animals use dissolved materials to make hard coverings."
   },
   {
    "q": "What does salinity measure?",
    "options": [
     "How much dissolved salt water contains",
     "How many waves reach a beach",
     "How loudly a river flows"
    ],
    "answer": 0,
    "hint": "The word refers to salt, not waves or sounds."
   }
  ]
 },
 "coral-is-alive": {
  "young": [
   "Corals are tiny animals.",
   "Tiny algae share food with corals.",
   "Coral reefs give animals shelter.",
   "Coral tentacles catch tiny food."
  ],
  "middle": [
   "Reef-building corals are animals called polyps. Many live together and build hard skeletons.",
   "Many shallow-water corals house algae that use sunlight to make sugars and share energy with them.",
   "Reefs grow as coral skeletons build up over generations, creating spaces where many organisms shelter.",
   "Corals catch tiny food particles with tentacles. Some deep-water corals live without sunlight-loving algae."
  ],
  "questions": [
   {
    "q": "What are coral polyps?",
    "options": [
     "Animals",
     "Underwater flowers",
     "Loose grains of glass"
    ],
    "answer": 0,
    "hint": "They have mouths and tentacles."
   },
   {
    "q": "How do algae help many shallow-water corals?",
    "options": [
     "They share sugars made using sunlight",
     "They turn coral into seaweed",
     "They block all light from the coral"
    ],
    "answer": 0,
    "hint": "The partners share energy-rich food."
   },
   {
    "q": "Why do coral reefs shelter many organisms?",
    "options": [
     "They have many small spaces and branching surfaces",
     "They have smooth walls with no openings",
     "They float above the ocean"
    ],
    "answer": 0,
    "hint": "Picture little hiding places among coral branches."
   },
   {
    "q": "How can corals collect tiny food particles?",
    "options": [
     "With their tentacles",
     "With roots in beach soil",
     "With wings above the waves"
    ],
    "answer": 0,
    "hint": "Look for the parts around a polyp's mouth."
   }
  ]
 },
 "trex-size": {
  "young": [
   "A grown T. rex was very long.",
   "Its heavy tail helped it balance.",
   "Bones help scientists estimate body weight.",
   "Its teeth were thick and strong."
  ],
  "middle": [
   "A large adult T. rex could be about twelve meters long, with hips roughly four meters above the ground.",
   "T. rex balanced its head and body with a long, heavy tail and held its backbone fairly horizontally.",
   "Scientists estimate dinosaur mass from fossil bones and body models. Missing soft tissues make exact answers difficult.",
   "T. rex had thick, sturdy teeth. Tooth marks on fossil bones show that its jaws could bite into bone."
  ],
  "questions": [
   {
    "q": "Which measurement describes a large T. rex from head to tail?",
    "options": [
     "About twelve meters",
     "About four millimeters",
     "About twelve kilometers"
    ],
    "answer": 0,
    "hint": "Length and hip height are different measurements."
   },
   {
    "q": "What helped T. rex balance its large head and body?",
    "options": [
     "Its long, heavy tail",
     "A shell on its back",
     "A tall sail made of feathers"
    ],
    "answer": 0,
    "hint": "Think about weight extending behind the animal."
   },
   {
    "q": "Why do estimates of T. rex mass vary?",
    "options": [
     "Fossils rarely preserve all soft body parts",
     "Scientists never examine its bones",
     "All adult dinosaurs weighed the same"
    ],
    "answer": 0,
    "hint": "Skeletons do not show every muscle and organ."
   },
   {
    "q": "What evidence shows T. rex could bite into bone?",
    "options": [
     "Tooth marks on fossil bones",
     "The color of modern leaves",
     "The shape of nearby clouds"
    ],
    "answer": 0,
    "hint": "Look for traces left by teeth long ago."
   }
  ]
 },
 "dino-eggs": {
  "young": [
   "Dinosaurs hatched from eggs.",
   "Egg patterns give clues about nests.",
   "Tiny shell holes let gases pass.",
   "Some dinosaurs tended their eggs."
  ],
  "middle": [
   "Fossil eggs with embryos show how dinosaurs reproduced and can help identify the kind of dinosaur inside.",
   "Some fossil nests have eggs in circles or layers. Scientists compare several clues to understand nesting behavior.",
   "Tiny eggshell pores let gases pass through, supplying oxygen to the developing dinosaur.",
   "Fossils of adults over nests suggest that some dinosaur species tended eggs, though care differed among groups."
  ],
  "questions": [
   {
    "q": "What can help identify which dinosaur laid an egg?",
    "options": [
     "An embryo preserved inside it",
     "A shiny stone beside it",
     "A modern flower above it"
    ],
    "answer": 0,
    "hint": "The developing animal gives a direct clue."
   },
   {
    "q": "What can an organized circle of fossil eggs help scientists study?",
    "options": [
     "Dinosaur nesting behavior",
     "The dinosaur's exact skin color",
     "The taste of ancient fruit"
    ],
    "answer": 0,
    "hint": "The positions of eggs show something about the nest."
   },
   {
    "q": "Why were tiny pores useful in dinosaur eggshells?",
    "options": [
     "They allowed gases to pass through",
     "They let the egg grow roots",
     "They kept every gas outside"
    ],
    "answer": 0,
    "hint": "A growing animal inside still needed oxygen."
   },
   {
    "q": "What supports the idea that some dinosaurs tended eggs?",
    "options": [
     "Adult fossils positioned over nests",
     "All nests being made of metal",
     "Every species having identical eggs"
    ],
    "answer": 0,
    "hint": "An adult's position can give a clue about its behavior."
   }
  ]
 },
 "long-necks": {
  "young": [
   "Long necks helped dinosaurs reach plants.",
   "Air spaces made neck bones lighter.",
   "Small heads were easier to support.",
   "Different long-necked dinosaurs held different poses."
  ],
  "middle": [
   "Sauropods used long necks to reach plants across wide areas, including high or low vegetation depending on the species.",
   "Air-filled spaces in many sauropod neck bones reduced weight compared with equally large solid bones.",
   "A sauropod's small head reduced the load on its neck. Teeth gathered plants for processing farther along its digestive system.",
   "Scientists study joints, muscles, and living animals to estimate neck posture. Sauropod species did not all hold identical poses."
  ],
  "questions": [
   {
    "q": "How did a long neck help a sauropod feed?",
    "options": [
     "It reached plants over a wider area",
     "It let the animal make its own sunlight",
     "It replaced the need to eat"
    ],
    "answer": 0,
    "hint": "Think about reaching without moving the whole body."
   },
   {
    "q": "What made many sauropod neck bones lighter?",
    "options": [
     "Air-filled spaces inside",
     "Solid metal inside",
     "Thick layers of wet sand"
    ],
    "answer": 0,
    "hint": "Empty spaces weigh less than solid material."
   },
   {
    "q": "How did a small head help a sauropod?",
    "options": [
     "It reduced weight at the neck's end",
     "It made its neck unnecessary",
     "It let plants grow inside its mouth"
    ],
    "answer": 0,
    "hint": "Think about holding a lighter object at the end of a long pole."
   },
   {
    "q": "Why should drawings not give every sauropod the same neck pose?",
    "options": [
     "Species had different neck shapes",
     "Every sauropod had no neck joints",
     "Scientists know all necks were perfectly straight"
    ],
    "answer": 0,
    "hint": "Different bodies can move and rest differently."
   }
  ]
 },
 "fossils": {
  "young": [
   "Fossils are clues to old life.",
   "Quick burial can help fossils form.",
   "Old footprints show animal movements.",
   "Rock layers help tell fossil ages."
  ],
  "middle": [
   "Fossils preserve remains or traces of past life, including bones, shells, footprints, and burrows.",
   "Rapid burial can protect remains. Minerals may later fill or replace material as nearby sediment becomes rock.",
   "Fossil footprints are traces of activity. Trackways can suggest how animals moved or traveled together.",
   "Scientists study rock layers and use dating methods to investigate fossil ages, sometimes using nearby volcanic layers."
  ],
  "questions": [
   {
    "q": "Which can be a fossil even without preserving a body part?",
    "options": [
     "An ancient preserved burrow",
     "A newly made plastic toy",
     "A fresh puddle from today's rain"
    ],
    "answer": 0,
    "hint": "An animal's activity can leave a lasting trace."
   },
   {
    "q": "How can rapid burial help fossil formation?",
    "options": [
     "It protects remains from disturbance and decay",
     "It makes every bone stay alive",
     "It turns bones into fresh leaves"
    ],
    "answer": 0,
    "hint": "Covering remains can help preserve them."
   },
   {
    "q": "What can a fossil trackway help reveal?",
    "options": [
     "How an animal moved",
     "The animal's exact voice",
     "The color of its eyes"
    ],
    "answer": 0,
    "hint": "A line of footprints records steps."
   },
   {
    "q": "What helps scientists investigate a fossil's age?",
    "options": [
     "Its surrounding rock layers",
     "Its price in a gift shop",
     "Its resemblance to a cartoon"
    ],
    "answer": 0,
    "hint": "Where a fossil is found gives important time clues."
   }
  ]
 },
 "zebra-stripes": {
  "young": [
   "Stripes can help keep flies away.",
   "Each zebra has its own stripes.",
   "Stripes vary across a zebra's body.",
   "Tests help explain zebra stripes."
  ],
  "middle": [
   "Experiments show that zebra-like stripes can reduce landings by biting flies compared with plain surfaces.",
   "Individual stripe patterns help researchers recognize zebras in photographs and follow their movements.",
   "Stripe widths and arrangements differ among species and across body parts such as legs and shoulders.",
   "Several stripe explanations exist, but reducing fly landings has stronger experimental support than many alternatives."
  ],
  "questions": [
   {
    "q": "What have tests found about striped surfaces?",
    "options": [
     "Fewer biting flies may land on them",
     "They turn flies into butterflies",
     "They make flies unable to fly anywhere"
    ],
    "answer": 0,
    "hint": "Scientists compare fly landings on stripes and plain coverings."
   },
   {
    "q": "How can photographs help researchers recognize one zebra?",
    "options": [
     "Its stripe pattern is distinctive",
     "All zebras wear different collars naturally",
     "Every zebra changes color daily"
    ],
    "answer": 0,
    "hint": "Look for the same stripe junctions in different pictures."
   },
   {
    "q": "Where might a zebra's stripes differ in width and arrangement?",
    "options": [
     "Between its legs and shoulders",
     "Only on the ground beneath it",
     "Nowhere on any zebra"
    ],
    "answer": 0,
    "hint": "Compare more than one part of the animal."
   },
   {
    "q": "Why do scientists give more support to the fly explanation?",
    "options": [
     "Experiments provide evidence for it",
     "It sounds like the funniest idea",
     "A drawing alone proves every explanation"
    ],
    "answer": 0,
    "hint": "Good explanations need results from careful tests."
   }
  ]
 },
 "bird-song": {
  "young": [
   "Many birds learn songs by listening.",
   "Bird songs can mark a territory.",
   "Birds have a special sound-making organ.",
   "Bird songs can vary by place."
  ],
  "middle": [
   "Many songbirds learn by listening and practicing, guided by inherited abilities.",
   "Birdsong often advertises territory or attracts a mate. Short calls may help a flock stay together.",
   "Birds make vocal sounds with the syrinx, near where the windpipe branches.",
   "Some bird populations have local song patterns called dialects, which scientists compare using recordings."
  ],
  "questions": [
   {
    "q": "How do many songbirds learn their songs?",
    "options": [
     "By listening to birds and practicing",
     "By reading marks on tree bark",
     "By copying the colors of feathers"
    ],
    "answer": 0,
    "hint": "Hearing other singers helps young birds learn."
   },
   {
    "q": "What is one common purpose of birdsong?",
    "options": [
     "Advertising a territory",
     "Measuring the weight of a branch",
     "Changing the season"
    ],
    "answer": 0,
    "hint": "A song can signal that a place is occupied."
   },
   {
    "q": "What organ produces birds' vocal sounds?",
    "options": [
     "The syrinx",
     "The stomach",
     "The tailbone"
    ],
    "answer": 0,
    "hint": "It is in the airway, but differs from our voice box."
   },
   {
    "q": "What is a bird song dialect?",
    "options": [
     "A local song pattern",
     "A type of nest-building leaf",
     "A bird's migration speed"
    ],
    "answer": 0,
    "hint": "Birds learning from neighbors may share local sounds."
   }
  ]
 },
 "busy-hive": {
  "young": [
   "Worker bees change jobs as they grow.",
   "The queen lays most hive eggs.",
   "A bee dance shows where food is.",
   "Bees turn nectar into stored honey."
  ],
  "middle": [
   "Worker honeybees often care for young early in life and collect nectar and pollen when older.",
   "The queen lays most colony eggs. Workers are female, while male honeybees are called drones.",
   "A forager's waggle dance shares information about a food source's direction and distance.",
   "Honeybees process nectar and remove water to make honey, which supplies energy when flowers are scarce."
  ],
  "questions": [
   {
    "q": "How do worker bee jobs often change?",
    "options": [
     "They shift as the bee ages",
     "Every worker becomes a drone",
     "Workers only collect food from birth"
    ],
    "answer": 0,
    "hint": "Young workers often do jobs inside the hive."
   },
   {
    "q": "Who lays most eggs in a honeybee colony?",
    "options": [
     "The queen",
     "The oldest male drone",
     "Every worker equally"
    ],
    "answer": 0,
    "hint": "One kind of female has the main egg-laying role."
   },
   {
    "q": "What does a waggle dance tell other workers?",
    "options": [
     "Where a food source can be found",
     "What color the queen's eggs are",
     "When a flower first grew roots"
    ],
    "answer": 0,
    "hint": "The dance helps bees travel toward food."
   },
   {
    "q": "Why is stored honey useful to a colony?",
    "options": [
     "It supplies energy when few flowers are available",
     "It replaces all need for oxygen",
     "It makes the hive's wood grow"
    ],
    "answer": 0,
    "hint": "Stored food helps when fresh food is harder to find."
   }
  ]
 },
 "snail-shell": {
  "young": [
   "A snail has no backbone.",
   "A snail adds to its own shell.",
   "A snail glides on a soft foot.",
   "Shells help snails keep water inside."
  ],
  "middle": [
   "Snails are invertebrates. Muscles attach the shell to the body, not to a spine.",
   "The mantle makes shell material, adding mainly around the opening as the snail grows.",
   "Waves of muscle movement along a broad foot move land snails. Mucus helps grip and protects the foot.",
   "A shell protects a snail's soft body and reduces water loss. Many land snails shelter during dry weather."
  ],
  "questions": [
   {
    "q": "What attaches a snail's shell to its body?",
    "options": [
     "Muscles",
     "A backbone",
     "A removable belt"
    ],
    "answer": 0,
    "hint": "Snails have no spine."
   },
   {
    "q": "Where does a growing snail mainly add new shell material?",
    "options": [
     "At the shell opening",
     "Only at the tip of its eye stalks",
     "In a separate empty shell nearby"
    ],
    "answer": 0,
    "hint": "Think about the edge where the body comes out."
   },
   {
    "q": "What moves a land snail along a surface?",
    "options": [
     "Muscle waves in its broad foot",
     "Tiny wheels under its shell",
     "Wings hidden in its mouth"
    ],
    "answer": 0,
    "hint": "Watch the broad underside as the animal glides."
   },
   {
    "q": "Why can a shell help a land snail in dry weather?",
    "options": [
     "It reduces water loss",
     "It creates rain clouds",
     "It turns sunlight into drinking water"
    ],
    "answer": 0,
    "hint": "Keeping moisture inside matters for a soft body."
   }
  ]
 },
 "heart-beats": {
  "young": [
   "Your heart pumps blood.",
   "Heart valves keep blood going forward.",
   "Active muscles need more blood.",
   "Your heart beats without being told."
  ],
  "middle": [
   "The heart pumps blood through linked routes: one to the lungs and another to the rest of the body.",
   "Heart valves open and close with pressure changes, helping blood travel in the correct direction.",
   "During activity, the heart usually pumps faster to supply muscles with more oxygen and nutrients.",
   "Special heart cells make electrical signals that coordinate beats without conscious instructions."
  ],
  "questions": [
   {
    "q": "Where do the heart's two linked blood routes lead?",
    "options": [
     "The lungs and the rest of the body",
     "Only the fingers and toes",
     "Only the stomach and ears"
    ],
    "answer": 0,
    "hint": "One route visits the organs used for breathing."
   },
   {
    "q": "What do heart valves help prevent?",
    "options": [
     "Blood flowing the wrong way",
     "Bones growing longer",
     "Air entering the nose"
    ],
    "answer": 0,
    "hint": "They work rather like one-way doors."
   },
   {
    "q": "Why does your heart usually beat faster during activity?",
    "options": [
     "Muscles need more oxygen and nutrients",
     "Your bones become smaller",
     "Your lungs stop needing blood"
    ],
    "answer": 0,
    "hint": "Working muscles need extra supplies."
   },
   {
    "q": "What coordinates heartbeats automatically?",
    "options": [
     "Electrical signals from special heart cells",
     "A spoken command for every beat",
     "Food knocking against the ribs"
    ],
    "answer": 0,
    "hint": "The heart has cells that start signals."
   }
  ]
 },
 "brain-messages": {
  "young": [
   "Nerve cells send messages.",
   "Some quick responses use your spinal cord.",
   "Brain parts work together.",
   "Practice changes connections in your brain."
  ],
  "middle": [
   "Neurons send electrical signals along fibers and usually use chemical messengers to communicate across connections called synapses.",
   "Some reflex pathways pass through the spinal cord, allowing quick responses while information also reaches the brain.",
   "Reading aloud uses several brain networks, including those for seeing, language, movement, and hearing.",
   "Practice can change connections between neurons and help brain networks work more efficiently."
  ],
  "questions": [
   {
    "q": "How do neurons usually send messages across synapses?",
    "options": [
     "Using chemical messengers",
     "Using tiny paper letters",
     "Using sounds from teeth"
    ],
    "answer": 0,
    "hint": "The signal changes form between many nerve cells."
   },
   {
    "q": "What can help produce a quick reflex response?",
    "options": [
     "A pathway through the spinal cord",
     "A message carried by hair",
     "A decision made by a fingernail"
    ],
    "answer": 0,
    "hint": "Not every rapid response waits for the brain alone."
   },
   {
    "q": "Why does reading aloud use several brain networks?",
    "options": [
     "It combines seeing, language, movement, and hearing",
     "Only one brain cell can work at once",
     "Words are stored inside the eyes"
    ],
    "answer": 0,
    "hint": "Think of all the tasks involved in speaking written words."
   },
   {
    "q": "What can happen in the brain with practice?",
    "options": [
     "Connections between neurons can change",
     "The brain turns into a pile of papers",
     "Every neuron stops communicating"
    ],
    "answer": 0,
    "hint": "Learning involves physical changes in networks."
   }
  ]
 },
 "breathing": {
  "young": [
   "Tiny lung sacs swap gases.",
   "A muscle helps pull air in.",
   "Cells use oxygen to release energy.",
   "Active bodies usually breathe faster."
  ],
  "middle": [
   "Tiny lung sacs called alveoli let oxygen enter nearby blood and carbon dioxide leave it.",
   "The diaphragm contracts downward, expanding the chest and helping air enter the lungs.",
   "Cells use oxygen to release energy from nutrients. Carbon dioxide travels back to the lungs in the blood.",
   "Breathing usually becomes faster and deeper during exercise, but rates differ with age, activity, and other conditions."
  ],
  "questions": [
   {
    "q": "Which gas moves from lung air sacs into the blood?",
    "options": [
     "Oxygen",
     "Helium from balloons",
     "Carbon dioxide moving the same way"
    ],
    "answer": 0,
    "hint": "The body needs this gas to release energy from food."
   },
   {
    "q": "How does the diaphragm help you breathe in?",
    "options": [
     "It moves down and expands the chest",
     "It closes every airway",
     "It pushes air into your shoes"
    ],
    "answer": 0,
    "hint": "More chest space helps air flow inward."
   },
   {
    "q": "Why do body cells use oxygen?",
    "options": [
     "To help release energy from nutrients",
     "To make bones disappear",
     "To replace every drop of water"
    ],
    "answer": 0,
    "hint": "Oxygen helps the body use its food supply."
   },
   {
    "q": "How does breathing usually change during exercise?",
    "options": [
     "It becomes faster and deeper",
     "It always stops completely",
     "It stays exactly the same for everyone"
    ],
    "answer": 0,
    "hint": "Working bodies need more gas exchange."
   }
  ]
 },
 "bones-fuse": {
  "young": [
   "Some bones join as you grow.",
   "A baby's skull has growing spaces.",
   "Bones get longer at growth plates.",
   "Bones are living parts of you."
  ],
  "middle": [
   "Some skeletal parts join during growth, helping explain why babies have more separate parts than adults.",
   "Gaps between a newborn's skull bones allow early brain growth and gradually close as the skull develops.",
   "Bones lengthen near growth plates, where cartilage is gradually replaced by bone. Lengthwise growth changes when these plates close.",
   "Bones contain living cells and blood vessels. The body continually removes and rebuilds small amounts of bone."
  ],
  "questions": [
   {
    "q": "Why do babies have more separate skeletal parts than adults?",
    "options": [
     "Some parts join as children grow",
     "Adults lose a bone every morning",
     "Babies have extra arms inside"
    ],
    "answer": 0,
    "hint": "Joining changes the number of separate pieces."
   },
   {
    "q": "Why are gaps in a newborn's skull useful?",
    "options": [
     "They allow room for early brain growth",
     "They store spare teeth",
     "They make room for feathers"
    ],
    "answer": 0,
    "hint": "The brain grows quickly early in life."
   },
   {
    "q": "Where do growing bones become longer?",
    "options": [
     "Near growth plates",
     "Only on their outer skin",
     "Inside the fingernails"
    ],
    "answer": 0,
    "hint": "These areas contain cartilage that becomes bone."
   },
   {
    "q": "What shows that bone is living tissue?",
    "options": [
     "It contains cells and blood vessels",
     "It is made only of dry stone",
     "It never changes after birth"
    ],
    "answer": 0,
    "hint": "Living tissue can renew itself."
   }
  ]
 },
 "zero": {
  "young": [
   "Zero can hold an empty place.",
   "People developed ways to use zero.",
   "Adding zero leaves the same amount.",
   "You cannot divide five by zero."
  ],
  "middle": [
   "In 305, zero shows there are no tens and keeps the hundreds and ones in the correct positions.",
   "Indian mathematicians advanced zero as a number. Brahmagupta described arithmetic rules for it in the seventh century.",
   "Adding zero keeps a number unchanged; multiplying a number by zero gives zero.",
   "Division by zero is undefined in ordinary arithmetic: no number multiplied by zero gives five."
  ],
  "questions": [
   {
    "q": "What does the zero in 305 tell us?",
    "options": [
     "There are no tens",
     "There are no hundreds",
     "There are five tens"
    ],
    "answer": 0,
    "hint": "Read the hundreds, tens, and ones places."
   },
   {
    "q": "Who helped develop rules for arithmetic with zero?",
    "options": [
     "Brahmagupta",
     "Khufu the Egyptian king",
     "A modern camera maker"
    ],
    "answer": 0,
    "hint": "This mathematician worked in India long ago."
   },
   {
    "q": "What is 7 multiplied by 0?",
    "options": [
     "0",
     "7",
     "70"
    ],
    "answer": 0,
    "hint": "Multiplication by zero differs from adding zero."
   },
   {
    "q": "Why does 5 divided by 0 have no ordinary numerical answer?",
    "options": [
     "No number times zero equals five",
     "Zero is larger than five",
     "Five has too many digits"
    ],
    "answer": 0,
    "hint": "Check division by using multiplication."
   }
  ]
 },
 "shapes": {
  "young": [
   "A flat triangle has three angles.",
   "A square is also a rectangle.",
   "A circle's edge stays equally far out.",
   "Curved surfaces change triangle rules."
  ],
  "middle": [
   "A flat triangle's three inside angles total 180 degrees, even when its side lengths change.",
   "A square is a rectangle with four equal sides. Both shapes have four right angles.",
   "Every point on a circle is the same distance from its center. A diameter is twice the radius.",
   "On a sphere, triangles drawn along suitable shortest paths can have angle totals greater than 180 degrees."
  ],
  "questions": [
   {
    "q": "What happens to a flat triangle's total angle measure when its sides change?",
    "options": [
     "It stays 180 degrees",
     "It always doubles",
     "It becomes zero"
    ],
    "answer": 0,
    "hint": "Individual angles may change without changing their sum."
   },
   {
    "q": "Why is every square also a rectangle?",
    "options": [
     "It has four right angles",
     "It has only three corners",
     "It has a curved edge"
    ],
    "answer": 0,
    "hint": "Shape families can overlap."
   },
   {
    "q": "If a circle's radius is 3 centimeters, how long is its diameter?",
    "options": [
     "6 centimeters",
     "3 centimeters",
     "9 centimeters"
    ],
    "answer": 0,
    "hint": "The diameter is two radii end to end."
   },
   {
    "q": "Where can a triangle have angles totaling more than 180 degrees?",
    "options": [
     "On a sphere's curved surface",
     "On any ordinary flat sheet",
     "Only inside a square on flat paper"
    ],
    "answer": 0,
    "hint": "The usual 180-degree rule is for flat geometry."
   }
  ]
 },
 "no-biggest": {
  "young": [
   "You can always count one more.",
   "Infinity means counting never ends.",
   "Even numbers can match counting numbers.",
   "Some infinities are bigger than others."
  ],
  "middle": [
   "There is no largest whole number, because adding one to any whole number gives a larger one.",
   "Infinity is not a final whole number. It describes something unending or an infinite collection's size.",
   "Pairing each positive whole number with its double shows that positive whole numbers and positive even numbers have the same infinite size.",
   "Real numbers cannot all be listed like positive whole numbers, so these infinite collections have different sizes."
  ],
  "questions": [
   {
    "q": "How can you make a number larger than any proposed biggest whole number?",
    "options": [
     "Add one",
     "Erase its last digit",
     "Multiply it by zero"
    ],
    "answer": 0,
    "hint": "There is always another counting step."
   },
   {
    "q": "Why is infinity not the last counting number?",
    "options": [
     "Counting has no final whole number",
     "It is the same as one hundred",
     "It comes just before a million"
    ],
    "answer": 0,
    "hint": "You can keep adding one without reaching an end."
   },
   {
    "q": "In the pairing 1 with 2 and 2 with 4, what pairs with 3?",
    "options": [
     "6",
     "5",
     "9"
    ],
    "answer": 0,
    "hint": "Double each positive whole number."
   },
   {
    "q": "Which infinite collection cannot be listed like the positive whole numbers?",
    "options": [
     "All real numbers",
     "All positive even numbers",
     "All positive whole numbers starting at two"
    ],
    "answer": 0,
    "hint": "Think of every point along a number line, not just counting steps."
   }
  ]
 },
 "equal-fractions": {
  "young": [
   "Different pieces can make the same amount.",
   "A half depends on the whole.",
   "Equal fractions share a number-line spot.",
   "Simplifying keeps the same amount."
  ],
  "middle": [
   "Multiplying the top and bottom of a fraction by the same nonzero whole number preserves its value.",
   "Fractions refer to a chosen whole. Half a large sheet can be bigger than half a small sheet.",
   "One half, two quarters, and three sixths all mark the same point halfway between zero and one.",
   "Dividing a fraction's top and bottom by a shared factor simplifies its form without changing its value."
  ],
  "questions": [
   {
    "q": "Which fraction equals one half after multiplying top and bottom by three?",
    "options": [
     "Three sixths",
     "Three halves",
     "One sixth"
    ],
    "answer": 0,
    "hint": "Both numbers in the fraction must change by the same factor."
   },
   {
    "q": "Why can half of one sheet be larger than half of another?",
    "options": [
     "The whole sheets are different sizes",
     "Every half is exactly one centimeter",
     "Larger sheets cannot be divided"
    ],
    "answer": 0,
    "hint": "Compare the wholes before comparing their halves."
   },
   {
    "q": "Where does two quarters belong on a number line?",
    "options": [
     "At the same point as one half",
     "At the point for two",
     "Beyond three sixths"
    ],
    "answer": 0,
    "hint": "Equal amounts land in the same place."
   },
   {
    "q": "What happens when six eighths is simplified to three quarters?",
    "options": [
     "Its value stays the same",
     "Its value becomes three times larger",
     "Its value becomes zero"
    ],
    "answer": 0,
    "hint": "The written numbers change, but the amount does not."
   }
  ]
 },
 "mixing-colors": {
  "young": [
   "Mixing light differs from mixing paint.",
   "Paint and printing use different color sets.",
   "Light can change how colors look.",
   "White paint makes colors lighter."
  ],
  "middle": [
   "Red and green light can combine to look yellow. Paint mixing works differently because pigments absorb and reflect light.",
   "Traditional painting often uses red, yellow, and blue primaries. Printing commonly uses cyan, magenta, yellow, and black inks.",
   "An object's apparent color depends on the light shining on it and the light it reflects.",
   "Adding white paint usually makes a tint; adding black usually makes a shade."
  ],
  "questions": [
   {
    "q": "What can red and green light look like when combined?",
    "options": [
     "Yellow",
     "Always black",
     "Only purple"
    ],
    "answer": 0,
    "hint": "This question is about light, not paint."
   },
   {
    "q": "Which color set is commonly used in color printing?",
    "options": [
     "Cyan, magenta, yellow, and black",
     "Only red and white",
     "Only green and orange"
    ],
    "answer": 0,
    "hint": "Printers use a different set from many painting lessons."
   },
   {
    "q": "Why might a colored toy look different under two lamps?",
    "options": [
     "The lamps shine different light on it",
     "Its material must have changed instantly",
     "Its size controls all color"
    ],
    "answer": 0,
    "hint": "Color depends on illumination as well as the object."
   },
   {
    "q": "What do artists usually make by adding white paint to a color?",
    "options": [
     "A tint",
     "A darker shade",
     "A sound pattern"
    ],
    "answer": 0,
    "hint": "Think about making the color lighter."
   }
  ]
 },
 "old-paintings": {
  "young": [
   "People made pictures long before writing.",
   "Early artists used charcoal and minerals.",
   "Clues help date ancient paintings.",
   "We cannot know every artist's reason."
  ],
  "middle": [
   "Some surviving cave paintings are tens of thousands of years old, showing that image-making began long before writing systems.",
   "Early artists used charcoal and mineral pigments, with available materials influencing their colors.",
   "Researchers use location, nearby objects, and dating methods. A layer over a painting may give a limit, not an exact date.",
   "We can describe visible evidence in ancient art, but its original purpose is often uncertain."
  ],
  "questions": [
   {
    "q": "What do very old cave paintings show about image-making?",
    "options": [
     "People made images before writing systems",
     "All paintings came after printed books",
     "Early people never used pictures"
    ],
    "answer": 0,
    "hint": "Compare the age of cave art with writing."
   },
   {
    "q": "What did some early artists use to make colors?",
    "options": [
     "Charcoal and mineral pigments",
     "Electric screen pixels",
     "Plastic printer cartridges"
    ],
    "answer": 0,
    "hint": "They used materials found in their surroundings."
   },
   {
    "q": "What might dating a mineral layer over a painting provide?",
    "options": [
     "A limit on the painting's age",
     "The artist's exact birthday",
     "The name of every animal shown"
    ],
    "answer": 0,
    "hint": "The layer formed after the picture beneath it."
   },
   {
    "q": "Which statement separates evidence from a guess about ancient art?",
    "options": [
     "We see an animal, but do not know why it was painted",
     "Every animal picture was certainly a shopping list",
     "All ancient artists left written explanations"
    ],
    "answer": 0,
    "hint": "What is visible may be clearer than the maker's purpose."
   }
  ]
 },
 "how-cameras-work": {
  "young": [
   "A lens focuses light into pictures.",
   "An opening controls incoming light.",
   "Short exposures can freeze movement.",
   "Digital sensors measure light."
  ],
  "middle": [
   "A camera lens focuses light onto film or an electronic sensor, where the image is recorded.",
   "The aperture controls how much light enters and affects how much of the scene appears sharp from near to far.",
   "Shutter speed controls exposure time. Short exposures can freeze motion; longer exposures may blur moving objects.",
   "Digital sensors measure light at many sites. Focus, lighting, lenses, and camera movement also affect image quality."
  ],
  "questions": [
   {
    "q": "What does a camera lens focus onto film or a sensor?",
    "options": [
     "Light",
     "Paint drops",
     "Tiny pieces of the photographed object"
    ],
    "answer": 0,
    "hint": "The camera records a pattern coming from the scene."
   },
   {
    "q": "What is the aperture?",
    "options": [
     "An opening that controls incoming light",
     "A strap holding the camera",
     "A storage box for printed photos"
    ],
    "answer": 0,
    "hint": "Its size changes the light entering the camera."
   },
   {
    "q": "Which exposure is more likely to freeze a moving object?",
    "options": [
     "A short exposure",
     "A very long exposure",
     "Both always show identical motion"
    ],
    "answer": 0,
    "hint": "Less recording time means less movement during the picture."
   },
   {
    "q": "Why do more pixels alone not guarantee a clear photo?",
    "options": [
     "Focus and other factors also affect quality",
     "Pixels automatically repair every blur",
     "Lighting never matters to a camera"
    ],
    "answer": 0,
    "hint": "A large image can still be out of focus."
   }
  ]
 },
 "patterns": {
  "young": [
   "A repeating pattern has a repeating part.",
   "Some shapes match after a turn.",
   "Some patterns grow step by step.",
   "Nature's patterns need not be perfect."
  ],
  "middle": [
   "A repeating pattern repeats a unit in the same order. Finding that unit helps predict the next item.",
   "Reflection symmetry uses a mirror line. Rotational symmetry means a shape looks unchanged after a turn smaller than a full turn.",
   "Growing patterns change by a rule, such as adding one block to each new row.",
   "Natural patterns can repeat while varying because living things grow under changing conditions."
  ],
  "questions": [
   {
    "q": "What comes next in circle, square, circle, square?",
    "options": [
     "Circle",
     "Triangle",
     "Star"
    ],
    "answer": 0,
    "hint": "Find the two-shape unit that repeats."
   },
   {
    "q": "What does rotational symmetry involve?",
    "options": [
     "Turning around a center",
     "Making every edge longer",
     "Cutting away all corners"
    ],
    "answer": 0,
    "hint": "The shape can match itself after turning."
   },
   {
    "q": "Rows contain 1, 2, then 3 blocks. Following the same rule, how many are next?",
    "options": [
     "4 blocks",
     "2 blocks",
     "6 blocks"
    ],
    "answer": 0,
    "hint": "Each row adds one block."
   },
   {
    "q": "Why can natural patterns have small differences?",
    "options": [
     "Living things grow under changing conditions",
     "Nature only makes exact printed copies",
     "Every difference means there is no pattern"
    ],
    "answer": 0,
    "hint": "A pattern can exist without perfect repetition."
   }
  ]
 },
 "rain": {
  "young": [
   "Clouds contain tiny drops or ice.",
   "Tiny cloud drops must grow.",
   "Rain belongs to the water cycle.",
   "Hills can help clouds form."
  ],
  "middle": [
   "Cloud droplets form as invisible water vapor condenses onto tiny particles in cooling air.",
   "Cloud droplets must grow before falling as rain, often by joining other drops or through processes involving ice.",
   "Water keeps moving among air, land, living things, rivers, and oceans. Rain is part of this continuing cycle.",
   "Air rising over hills can cool enough for clouds to form, so landscape affects rainfall patterns."
  ],
  "questions": [
   {
    "q": "What forms cloud droplets?",
    "options": [
     "Water vapor condensing in cooling air",
     "Dry sand turning directly into rain",
     "Clouds squeezing sunlight into water"
    ],
    "answer": 0,
    "hint": "Invisible vapor changes into liquid drops."
   },
   {
    "q": "Why do tiny cloud droplets not immediately fall as rain?",
    "options": [
     "They must grow larger first",
     "They contain no water at all",
     "They are attached to the Sun"
    ],
    "answer": 0,
    "hint": "Rain drops are larger than ordinary cloud droplets."
   },
   {
    "q": "How does rain fit into the water cycle?",
    "options": [
     "It returns water from clouds toward Earth's surface",
     "It creates all water from nothing",
     "It ends all movement of water forever"
    ],
    "answer": 0,
    "hint": "The same water can keep moving through different places."
   },
   {
    "q": "How can hills affect cloud formation?",
    "options": [
     "They push air upward, where it can cool",
     "They stop all air from moving",
     "They turn solid rock into cloud droplets"
    ],
    "answer": 0,
    "hint": "Rising air can cool."
   }
  ]
 },
 "snowflakes": {
  "young": [
   "Many snow crystals have six arms.",
   "Cloud conditions shape snow crystals.",
   "Not all snowflakes are perfect stars.",
   "Many ice surfaces make snow look white."
  ],
  "middle": [
   "Water molecules arrange in a hexagonal structure as they freeze, helping many snow crystals develop sixfold symmetry.",
   "Temperature and water vapor affect a growing snow crystal, creating forms such as branches, plates, and columns.",
   "Snow crystals may join, break, or grow unevenly, so many snowflakes are irregular rather than perfect stars.",
   "Snow looks white because its many ice surfaces scatter light, although one clear ice crystal may be transparent."
  ],
  "questions": [
   {
    "q": "Why do many snow crystals have sixfold symmetry?",
    "options": [
     "Water molecules form a hexagonal arrangement",
     "Clouds cut them with six scissors",
     "Every crystal copies a leaf"
    ],
    "answer": 0,
    "hint": "The pattern begins with the arrangement of tiny water molecules."
   },
   {
    "q": "What helps determine a growing snow crystal's shape?",
    "options": [
     "Temperature and water vapor",
     "The names of nearby towns",
     "The color of the ground below"
    ],
    "answer": 0,
    "hint": "Conditions change as the crystal travels through a cloud."
   },
   {
    "q": "Why might a snowflake have an irregular shape?",
    "options": [
     "Crystals joined, broke, or grew unevenly",
     "Every snowflake must have eight equal arms",
     "Snow can only form as circles"
    ],
    "answer": 0,
    "hint": "Falling crystals can change along the way."
   },
   {
    "q": "Why does a pile of snow usually look white?",
    "options": [
     "Its many ice surfaces scatter light",
     "Every crystal contains white paint",
     "Snow makes sunlight only at night"
    ],
    "answer": 0,
    "hint": "Light bounces in many directions among the crystals."
   }
  ]
 },
 "wind": {
  "young": [
   "Wind is air moving around.",
   "Uneven warming can make breezes.",
   "A north wind comes from north.",
   "Trees and buildings change nearby wind."
  ],
  "middle": [
   "Pressure differences help drive wind from higher-pressure regions toward lower-pressure regions, with rotation and friction affecting its path.",
   "Land often warms faster than nearby water during daytime, helping produce coastal breezes.",
   "A weather vane shows where the wind comes from. A north wind arrives from the north.",
   "Buildings, trees, and hills alter airflow, making nearby places gusty or sheltered."
  ],
  "questions": [
   {
    "q": "Which way does a pressure difference tend to move air?",
    "options": [
     "From higher toward lower pressure",
     "Always straight upward only",
     "Only from west to east"
    ],
    "answer": 0,
    "hint": "Compare the two pressure regions."
   },
   {
    "q": "What helps create a daytime coastal breeze?",
    "options": [
     "Land and water warming at different rates",
     "Ocean water becoming solid rock",
     "Every tree leaning the same way"
    ],
    "answer": 0,
    "hint": "Uneven heating changes how nearby air moves."
   },
   {
    "q": "Where does a north wind come from?",
    "options": [
     "The north",
     "The south",
     "Directly underground"
    ],
    "answer": 0,
    "hint": "Wind names describe their starting direction."
   },
   {
    "q": "Why can two nearby places feel different winds?",
    "options": [
     "Trees or buildings change local airflow",
     "Nearby places must have different seasons",
     "Wind cannot move around objects"
    ],
    "answer": 0,
    "hint": "Obstacles can shelter a place or redirect air."
   }
  ]
 },
 "rainbows": {
  "young": [
   "Water drops spread sunlight into colors.",
   "Look for rainbows opposite the Sun.",
   "Red is on the outside edge.",
   "A rainbow is part of a circle."
  ],
  "middle": [
   "Sunlight bends as it enters and leaves water drops and reflects inside. Different wavelengths bend differently, spreading the colors.",
   "For a typical rainbow, sunlight comes from behind you and water droplets are ahead.",
   "A primary rainbow has red on its outer edge and violet on its inner edge, with colors blending continuously.",
   "Rainbows form parts of circles. The ground often hides the lower portion, while a high viewpoint may reveal more."
  ],
  "questions": [
   {
    "q": "How do water drops help make a rainbow?",
    "options": [
     "They bend and reflect sunlight, spreading its colors",
     "They paint colors onto the sky",
     "They turn sunlight into solid ribbons"
    ],
    "answer": 0,
    "hint": "Light changes direction inside and around the drops."
   },
   {
    "q": "Where is the Sun when you face a typical rainbow?",
    "options": [
     "Behind you",
     "In front of you inside the rainbow",
     "Directly beneath the puddles"
    ],
    "answer": 0,
    "hint": "The water droplets are ahead of you."
   },
   {
    "q": "Which color is on a primary rainbow's outer edge?",
    "options": [
     "Red",
     "Violet",
     "Green"
    ],
    "answer": 0,
    "hint": "Compare the outside and inside of the arch."
   },
   {
    "q": "Why do we usually see a rainbow as an arch rather than a full circle?",
    "options": [
     "The ground hides the lower part",
     "Rainbows have square lower corners",
     "The colors stop whenever they meet clouds"
    ],
    "answer": 0,
    "hint": "The visible arch belongs to a larger circular shape."
   }
  ]
 },
 "pyramids": {
  "young": [
   "Organized worker teams built the pyramids.",
   "The Great Pyramid was for Khufu.",
   "Builders used sledges and ramps.",
   "Many jobs helped pyramid builders."
  ],
  "middle": [
   "Evidence from settlements and tombs shows that skilled workers and supporting communities were central to building the Giza pyramids.",
   "The Great Pyramid was built for King Khufu in ancient Egypt as part of a larger complex.",
   "Builders used tools, sledges, and ramps to move materials. The exact ramp arrangements remain debated.",
   "Pyramid construction needed food, transport, surveying, and organization as well as stonework."
  ],
  "questions": [
   {
    "q": "What does evidence suggest about Giza pyramid builders?",
    "options": [
     "They included organized teams of skilled workers",
     "They were visitors from another planet",
     "They were a single person working alone"
    ],
    "answer": 0,
    "hint": "Workers' settlements give clues about the people involved."
   },
   {
    "q": "For whom was the Great Pyramid built?",
    "options": [
     "King Khufu",
     "Brahmagupta the mathematician",
     "A medieval castle keeper"
    ],
    "answer": 0,
    "hint": "He was an Egyptian king."
   },
   {
    "q": "Which tools helped builders move heavy materials?",
    "options": [
     "Sledges and ramps",
     "Electric helicopters",
     "Rubber conveyor belts driven by computers"
    ],
    "answer": 0,
    "hint": "Simple machines could help move large loads."
   },
   {
    "q": "Why did pyramid building involve more than stoneworkers?",
    "options": [
     "Workers also needed food, transport, and organization",
     "Stones moved themselves without any planning",
     "Only painting the top required people"
    ],
    "answer": 0,
    "hint": "A large project needs many supporting jobs."
   }
  ]
 },
 "first-writing": {
  "young": [
   "Early writing helped people keep accounts.",
   "Reed tools made marks in clay.",
   "Writing began in more than one place.",
   "Known words help unlock old writing."
  ],
  "middle": [
   "Some early Mesopotamian writing recorded goods, amounts, and exchanges to help communities manage resources.",
   "Cuneiform used wedge-shaped marks pressed into clay with a reed tool and could represent different languages.",
   "Writing developed independently in several parts of the world, not through one single global invention.",
   "Known names and parallel texts in different languages can help researchers decipher ancient scripts."
  ],
  "questions": [
   {
    "q": "What did some earliest Mesopotamian writing record?",
    "options": [
     "Goods and quantities",
     "Only long adventure novels",
     "Weather forecasts from computers"
    ],
    "answer": 0,
    "hint": "Keeping track of supplies was an early need."
   },
   {
    "q": "Why is cuneiform a writing system rather than one language?",
    "options": [
     "Its signs could represent different languages",
     "It was never used for words",
     "It only described one kind of food"
    ],
    "answer": 0,
    "hint": "A system of marks can serve more than one language."
   },
   {
    "q": "What is true about writing's beginnings?",
    "options": [
     "It developed independently in more than one region",
     "Every script was invented in one classroom",
     "It began only after radios were built"
    ],
    "answer": 0,
    "hint": "Its history includes several centers of invention."
   },
   {
    "q": "What can help researchers read an unknown ancient script?",
    "options": [
     "Parallel texts in different languages",
     "Guessing from the stone's weight alone",
     "Ignoring all repeated signs"
    ],
    "answer": 0,
    "hint": "A known version can help explain an unknown one."
   }
  ]
 },
 "castles": {
  "young": [
   "Castles were homes and working places.",
   "Castle people needed food and water.",
   "Castles did not all look alike.",
   "Castle entrances controlled coming and going."
  ],
  "middle": [
   "Castles combined protected living space with military and administrative roles, including managing surrounding estates.",
   "Castles needed wells, cisterns, kitchens, and food stores to support residents.",
   "Castle designs varied by place and time. Some used timber and earth, while many later castles used stone.",
   "Gatehouses, passages, and bridges helped control entry while allowing people and supplies to move through."
  ],
  "questions": [
   {
    "q": "Besides protection, what was a castle used for?",
    "options": [
     "Living and managing nearby estates",
     "Only growing underwater plants",
     "Only storing empty picture frames"
    ],
    "answer": 0,
    "hint": "People lived and organized work there."
   },
   {
    "q": "Why were wells and food stores important in castles?",
    "options": [
     "They supplied people living and working there",
     "They made stone walls turn into wood",
     "They replaced the need for any residents"
    ],
    "answer": 0,
    "hint": "Strong walls alone do not provide daily necessities."
   },
   {
    "q": "What materials did some early castles use?",
    "options": [
     "Timber and earth",
     "Only clear glass",
     "Only modern reinforced plastic"
    ],
    "answer": 0,
    "hint": "Not every castle began as a stone tower."
   },
   {
    "q": "Why did castle entrances need careful design?",
    "options": [
     "To control access while allowing useful movement",
     "To keep all supplies outside forever",
     "To make every wall completely open"
    ],
    "answer": 0,
    "hint": "A busy settlement needs controlled ways in and out."
   }
  ]
 },
 "old-maps": {
  "young": [
   "Old maps show what makers knew.",
   "Sailors used more than maps.",
   "Flat world maps always change something.",
   "Map keys explain symbols."
  ],
  "middle": [
   "Historical maps reflected their makers' information and purposes, mixing careful surveys with uncertain or symbolic features.",
   "Sailors used charts alongside stars, compass directions, winds, and currents, checking them against actual conditions.",
   "Flattening Earth's curved surface distorts something, so map projections preserve some properties while changing others.",
   "A map's scale connects paper distances to real distances, while its key explains symbols."
  ],
  "questions": [
   {
    "q": "Why do historical maps differ in what they show?",
    "options": [
     "Their makers had different information and purposes",
     "Every map was a random doodle",
     "All mapmakers saw Earth from space"
    ],
    "answer": 0,
    "hint": "Think about what the maker knew and wanted to show."
   },
   {
    "q": "What helped sailors navigate besides charts?",
    "options": [
     "Stars and compass directions",
     "Only the color of their shoes",
     "Only stories with no observations"
    ],
    "answer": 0,
    "hint": "Navigation combined several sources of information."
   },
   {
    "q": "Why does every flat world map distort something?",
    "options": [
     "Earth's curved surface cannot flatten perfectly",
     "Earth is shaped like flat paper",
     "All mapmakers forget to draw oceans"
    ],
    "answer": 0,
    "hint": "Think about flattening the surface of a ball."
   },
   {
    "q": "What helps you understand a river symbol on a map?",
    "options": [
     "The map key",
     "The page number alone",
     "The mapmaker's age"
    ],
    "answer": 0,
    "hint": "Look for the explanation of symbols."
   }
  ]
 },
 "drums": {
  "young": [
   "A shaking drumhead makes sound.",
   "Tighter drumheads usually sound higher.",
   "The drum's body shapes its sound.",
   "People use drums in many traditions."
  ],
  "middle": [
   "A struck drumhead vibrates, making nearby air vibrate and sending sound waves outward.",
   "Tightening a drumhead usually raises pitch because it vibrates faster, though size and thickness also matter.",
   "A drum's shell affects resonances and sound spreading, so similar-sized drums can sound different.",
   "Across cultures, drums have musical, ceremonial, and communication roles, with many materials and playing styles."
  ],
  "questions": [
   {
    "q": "What starts a drum's sound?",
    "options": [
     "Its drumhead vibrating",
     "Its paint changing color",
     "Its shadow moving"
    ],
    "answer": 0,
    "hint": "The stretched surface moves back and forth."
   },
   {
    "q": "What usually happens when a drumhead is tightened?",
    "options": [
     "Its pitch rises",
     "Its sound becomes a smell",
     "Its pitch always stays unchanged"
    ],
    "answer": 0,
    "hint": "Faster vibrations produce a higher pitch."
   },
   {
    "q": "Why can two same-sized drums sound different?",
    "options": [
     "Their shells and heads have different construction",
     "Diameter alone determines every sound",
     "Their names change the sound waves"
    ],
    "answer": 0,
    "hint": "The whole instrument matters, not only its width."
   },
   {
    "q": "Which use of drums appears in many cultures?",
    "options": [
     "Music, ceremonies, and communication",
     "Only measuring rainfall",
     "Only carrying drinking water"
    ],
    "answer": 0,
    "hint": "Drumming serves more than one social purpose."
   }
  ]
 },
 "strings-vibrate": {
  "young": [
   "Faster string vibrations make higher notes.",
   "Shorter vibrating strings usually sound higher.",
   "Tighter strings usually make higher notes.",
   "A guitar's wooden parts spread vibrations."
  ],
  "middle": [
   "A string's vibration rate is its frequency. Faster vibration produces a higher pitch.",
   "Shortening the vibrating part of a string raises its pitch when other conditions stay similar.",
   "Increasing string tension generally raises pitch. String mass also affects pitch.",
   "A guitar's bridge and soundboard transfer string vibrations to more air, making sound easier to hear."
  ],
  "questions": [
   {
    "q": "What happens when a string vibrates more times each second?",
    "options": [
     "Its pitch becomes higher",
     "Its note must become quieter",
     "Its color becomes brighter"
    ],
    "answer": 0,
    "hint": "Pitch depends on vibration rate."
   },
   {
    "q": "Why do guitarists press strings against different frets?",
    "options": [
     "To change the vibrating length and pitch",
     "To make the guitar grow wider",
     "To stop every string permanently"
    ],
    "answer": 0,
    "hint": "A fret changes how much string can vibrate."
   },
   {
    "q": "What usually happens when string tension increases?",
    "options": [
     "The pitch rises",
     "The pitch always falls",
     "The string becomes a drumhead"
    ],
    "answer": 0,
    "hint": "A tighter string usually vibrates faster."
   },
   {
    "q": "How does a guitar's soundboard help?",
    "options": [
     "It transfers vibrations to surrounding air",
     "It writes the song's words",
     "It prevents all movement in the instrument"
    ],
    "answer": 0,
    "hint": "A string alone moves relatively little air."
   }
  ]
 },
 "piano": {
  "young": [
   "Piano keys make hammers strike strings.",
   "A wooden panel helps piano sound spread.",
   "Most standard pianos have 88 keys.",
   "The sustain pedal lets notes last."
  ],
  "middle": [
   "A piano key moves a felt-covered hammer to strike strings, then the hammer moves away so they vibrate freely.",
   "The piano's soundboard receives string vibrations through bridges and transfers them to the air over a larger surface.",
   "Most modern standard pianos have 88 keys. Low notes use longer, heavier strings; high notes generally use shorter, lighter strings.",
   "The sustain pedal lifts dampers that would normally stop many strings, letting notes continue and other strings resonate."
  ],
  "questions": [
   {
    "q": "What happens after a piano hammer strikes a string?",
    "options": [
     "It moves away so the string can vibrate",
     "It stays pressed against the string forever",
     "It turns into a key"
    ],
    "answer": 0,
    "hint": "The vibrating string needs freedom to move."
   },
   {
    "q": "What is the piano soundboard's job?",
    "options": [
     "Helping string vibrations reach the air",
     "Holding printed pages open",
     "Changing wooden keys into metal"
    ],
    "answer": 0,
    "hint": "Its broad surface helps make the sound audible."
   },
   {
    "q": "Which strings generally make a piano's lower notes?",
    "options": [
     "Longer, heavier strings",
     "Only the shortest, lightest strings",
     "Strings made entirely of air"
    ],
    "answer": 0,
    "hint": "Compare the strings for low and high notes."
   },
   {
    "q": "Why do piano notes continue with the sustain pedal pressed?",
    "options": [
     "Dampers lift away from the strings",
     "The keys keep growing longer",
     "The pianist must press every key again"
    ],
    "answer": 0,
    "hint": "Dampers normally help stop vibrations."
   }
  ]
 },
 "voice": {
  "young": [
   "Your voice starts with vibrating folds.",
   "Faster vocal-fold vibrations make higher notes.",
   "Your mouth helps shape speech sounds.",
   "Loud and high mean different things."
  ],
  "middle": [
   "Air from the lungs sets vocal folds in the voice box vibrating, creating the sound source for speech.",
   "Vocal-fold tension, length, and thickness affect pitch. Faster vibration produces higher notes.",
   "The throat, mouth, and nasal passages shape voice sounds. Tongue and lip movements help form different vowels.",
   "Loudness and pitch are different: a high note can be soft, and a low note can be loud."
  ],
  "questions": [
   {
    "q": "What starts the sound of your voice?",
    "options": [
     "Air making vocal folds vibrate",
     "Your tongue striking your teeth like a hammer",
     "Your ears sending sound outward"
    ],
    "answer": 0,
    "hint": "The sound begins in the voice box."
   },
   {
    "q": "What produces a higher voice pitch?",
    "options": [
     "Faster vocal-fold vibration",
     "Slower blinking",
     "Wider shoe soles"
    ],
    "answer": 0,
    "hint": "Pitch depends on how quickly the folds vibrate."
   },
   {
    "q": "What helps you form different vowel sounds?",
    "options": [
     "Changing tongue and lip positions",
     "Changing only the color of your clothes",
     "Moving your elbows alone"
    ],
    "answer": 0,
    "hint": "The mouth shapes sound from the voice box."
   },
   {
    "q": "Which voice combination is possible?",
    "options": [
     "A high note sung softly",
     "Only high notes can be loud",
     "Every low note must be silent"
    ],
    "answer": 0,
    "hint": "Volume does not determine pitch."
   }
  ]
 },
 "robots": {
  "young": [
   "Robots need not look like people.",
   "Sensors give robots information.",
   "Robots can check and adjust movements.",
   "Learning robots do not have human feelings."
  ],
  "middle": [
   "A robot is a physical machine carrying out programmed actions, often with sensors and motors. Factory arms can be robots.",
   "Sensors measure surroundings or internal conditions. A distance sensor can help a moving robot avoid obstacles.",
   "Feedback uses measurements to compare results with a target and adjust actions.",
   "Some robots use learned models to recognize objects or choose actions, but this does not give them human feelings or unlimited understanding."
  ],
  "questions": [
   {
    "q": "Which machine can be a robot even without a human shape?",
    "options": [
     "A programmed factory arm",
     "A plain wooden spoon",
     "A printed photograph of a person"
    ],
    "answer": 0,
    "hint": "Actions and programming matter more than human appearance."
   },
   {
    "q": "What can a distance sensor tell a robot?",
    "options": [
     "How far away an obstacle is",
     "What every person is thinking",
     "The title of any unseen book"
    ],
    "answer": 0,
    "hint": "The sensor supplies measurements of distance."
   },
   {
    "q": "Which robot action uses feedback?",
    "options": [
     "Checking its position and correcting movement",
     "Repeating a motion without checking anything",
     "Ignoring every sensor reading"
    ],
    "answer": 0,
    "hint": "Feedback means using results to guide the next action."
   },
   {
    "q": "What can a learned model help a robot do?",
    "options": [
     "Recognize objects",
     "Understand absolutely everything",
     "Have personal wishes like a person"
    ],
    "answer": 0,
    "hint": "Flexible behavior is not the same as human feelings."
   }
  ]
 },
 "binary": {
  "young": [
   "A bit has two possible values.",
   "Eight bits make one byte.",
   "Binary places double as you move left.",
   "Some characters need several bytes."
  ],
  "middle": [
   "A bit has two possible values, usually written as 0 and 1, represented by different physical states in computers.",
   "Eight bits form a byte with 256 possible patterns, which can represent data using agreed coding rules.",
   "Binary places are ones, twos, fours, eights, and so on. Binary 101 means one four plus one one, or five.",
   "Text encoding assigns numbers to characters. Some characters use multiple bytes in common systems such as UTF-8."
  ],
  "questions": [
   {
    "q": "How many possible values does one bit have?",
    "options": [
     "Two",
     "Eight",
     "Ten"
    ],
    "answer": 0,
    "hint": "Think of the symbols 0 and 1."
   },
   {
    "q": "How many bits make one byte?",
    "options": [
     "Eight",
     "Two hundred fifty-six",
     "One thousand"
    ],
    "answer": 0,
    "hint": "A byte groups several two-value units together."
   },
   {
    "q": "What does binary 101 represent in ordinary counting?",
    "options": [
     "Five",
     "One hundred one",
     "Three"
    ],
    "answer": 0,
    "hint": "The places are four, two, and one."
   },
   {
    "q": "Does every character always fit into one byte?",
    "options": [
     "No, some need several bytes",
     "Yes, every writing system uses exactly one byte per character",
     "No, characters cannot be encoded at all"
    ],
    "answer": 0,
    "hint": "Different symbols may need different amounts of coded data."
   }
  ]
 },
 "games": {
  "young": [
   "Game pictures change quickly to show movement.",
   "Smooth games need steady picture timing.",
   "Games update rules as well as pictures.",
   "Screen updates and game frames can differ."
  ],
  "middle": [
   "Games show sequences of separate images called frames, creating the appearance of continuous movement when updates are smooth.",
   "Frame rate counts frames per second. Consistent timing also matters for smooth movement.",
   "Game software handles player input, rules, and movement as well as drawing the scene.",
   "A display's refresh rate describes screen updates; game frame rate describes new images produced by the computer."
  ],
  "questions": [
   {
    "q": "What creates the appearance of movement in a video game?",
    "options": [
     "A rapid sequence of changing frames",
     "One picture that never changes",
     "Tiny actors living inside the screen"
    ],
    "answer": 0,
    "hint": "Object positions change from image to image."
   },
   {
    "q": "Why can a game feel jerky despite a high frame rate?",
    "options": [
     "Its frames may arrive at uneven times",
     "Every frame has the same size",
     "The player knows the game's name"
    ],
    "answer": 0,
    "hint": "Even spacing between updates helps smoothness."
   },
   {
    "q": "What does game software do besides draw pictures?",
    "options": [
     "Updates rules and responds to player input",
     "Only chooses the screen's frame color",
     "Only stores the player's chair position"
    ],
    "answer": 0,
    "hint": "An interactive game must react to actions."
   },
   {
    "q": "How do refresh rate and frame rate differ?",
    "options": [
     "One counts screen updates; the other counts game frames produced",
     "Both always mean the screen's physical size",
     "Both count the buttons on a controller"
    ],
    "answer": 0,
    "hint": "The display and the game each have their own update process."
   }
  ]
 },
 "wifi": {
  "young": [
   "WiFi sends information with radio waves.",
   "WiFi sends pictures as coded information.",
   "Walls can weaken WiFi signals.",
   "One box can do two network jobs."
  ],
  "middle": [
   "WiFi uses radio waves between devices and an access point. The wireless link itself is not the internet.",
   "Devices encode data into changing radio signals and decode received signals back into information.",
   "Distance, walls, and interference can weaken WiFi, with different materials affecting radio waves differently.",
   "A router directs data between networks; an access point connects wireless devices to a local network. Home equipment often combines both."
  ],
  "questions": [
   {
    "q": "What carries WiFi data through the air?",
    "options": [
     "Radio waves",
     "Tiny paper envelopes",
     "Streams of liquid water"
    ],
    "answer": 0,
    "hint": "WiFi is a wireless radio connection."
   },
   {
    "q": "How does a picture travel over WiFi?",
    "options": [
     "As information coded into radio signals",
     "As a tiny printed photo floating through the air",
     "As colored paint sprayed from the router"
    ],
    "answer": 0,
    "hint": "The picture is represented by a code."
   },
   {
    "q": "Why might WiFi weaken behind a thick wall?",
    "options": [
     "The wall affects the radio signal",
     "The wall eats the picture's colors",
     "The device no longer needs any data"
    ],
    "answer": 0,
    "hint": "Materials can make radio signals harder to receive."
   },
   {
    "q": "What job does a router perform?",
    "options": [
     "Directing data between networks",
     "Printing every message onto paper",
     "Making the battery in each device"
    ],
    "answer": 0,
    "hint": "Distinguish moving data between networks from providing wireless access."
   }
  ]
 },
 "story-shape": {
  "young": [
   "Many stories have a useful shape.",
   "A character can face an inside problem.",
   "A turning point changes what happens.",
   "An ending can leave some questions."
  ],
  "middle": [
   "Many stories introduce a situation, develop a problem, reach a turning point, and show consequences, but not every story follows this pattern.",
   "A story's conflict can be internal, such as deciding whether to admit a mistake, rather than a struggle between enemies.",
   "The climax is often the decisive point of a central conflict, important because of what changes for the characters.",
   "A resolution shows what changed or how events settle. Some endings leave questions open."
  ],
  "questions": [
   {
    "q": "Is one common story pattern a rule for all stories?",
    "options": [
     "No, writers and cultures can use other patterns",
     "Yes, every story must use identical events",
     "Yes, all stories need exactly four sentences"
    ],
    "answer": 0,
    "hint": "A useful pattern need not be a universal rule."
   },
   {
    "q": "Which is an internal story conflict?",
    "options": [
     "Deciding whether to admit a mistake",
     "Choosing the color of a book cover as its printer",
     "Counting the pages after printing"
    ],
    "answer": 0,
    "hint": "Look for a struggle inside a character's thoughts."
   },
   {
    "q": "What makes a scene a story's climax?",
    "options": [
     "The central conflict reaches a decisive point",
     "It has the most capital letters",
     "It includes the longest weather description"
    ],
    "answer": 0,
    "hint": "Importance comes from change, not simply noise."
   },
   {
    "q": "What can a resolution do?",
    "options": [
     "Show what has changed while leaving some questions open",
     "Always explain every detail without exception",
     "Always start an unrelated story with no connection"
    ],
    "answer": 0,
    "hint": "An ending can settle events without answering everything."
   }
  ]
 },
 "new-words": {
  "young": [
   "Books help us meet new words.",
   "Nearby words can give meaning clues.",
   "Word parts can help explain words.",
   "Try new words in your own sentences."
  ],
  "middle": [
   "Reading shows words in meaningful settings. Meeting a word in several passages helps build understanding.",
   "Context clues suggest meaning but may be incomplete. A reliable dictionary helps when a word remains unclear.",
   "Prefixes, roots, and suffixes give clues. The prefix re- often suggests doing something again.",
   "Using a new word in your own sentence and comparing examples helps check its meaning and usage."
  ],
  "questions": [
   {
    "q": "Why is meeting a word in several passages helpful?",
    "options": [
     "Different uses help clarify its meaning",
     "Its letters always change into easier ones",
     "Reading it once makes all meanings obvious"
    ],
    "answer": 0,
    "hint": "More examples give a fuller picture."
   },
   {
    "q": "What should you use if context leaves a word's meaning uncertain?",
    "options": [
     "A reliable dictionary",
     "The page's color alone",
     "The number of pictures in the book"
    ],
    "answer": 0,
    "hint": "A source of definitions can check a guess."
   },
   {
    "q": "What does re- often suggest in a word like reread?",
    "options": [
     "Doing something again",
     "Making something tiny",
     "Doing the opposite every time"
    ],
    "answer": 0,
    "hint": "Think about reading a book another time."
   },
   {
    "q": "How can you check whether you understand a new word?",
    "options": [
     "Use it in a sentence and compare reliable examples",
     "Count its letters without reading it",
     "Choose a meaning only from its first letter"
    ],
    "answer": 0,
    "hint": "Try using the word, then check how others use it."
   }
  ]
 },
 "imagination": {
  "young": [
   "Reading can help scenes feel vivid.",
   "Readers can imagine different details.",
   "You can enjoy stories without clear pictures.",
   "Sensory words help us imagine."
  ],
  "middle": [
   "Reading descriptions can involve some brain systems used in perception and action, but imagining is not the same as experiencing.",
   "Readers combine words with their own knowledge and expectations, so two readers may imagine unspecified details differently.",
   "Mental imagery varies. Readers with little visual imagery can still understand, enjoy, and remember stories.",
   "Specific sensory language guides imagination while leaving readers room to add details from experience."
  ],
  "questions": [
   {
    "q": "How is imagining a story related to experiencing something?",
    "options": [
     "They can use some of the same brain systems, but are not identical",
     "They are always exactly the same event",
     "Reading never involves the brain"
    ],
    "answer": 0,
    "hint": "Some brain activity overlaps without making imagination real experience."
   },
   {
    "q": "Why might two readers picture the same scene differently?",
    "options": [
     "They bring different knowledge to details the text leaves open",
     "Only one of them can understand any story",
     "Every book secretly changes all its words"
    ],
    "answer": 0,
    "hint": "A writer does not specify every feature."
   },
   {
    "q": "Can someone enjoy stories without vivid mental pictures?",
    "options": [
     "Yes, understanding can use other forms of thinking",
     "No, only vivid pictures allow reading",
     "Only if every book has photographs"
    ],
    "answer": 0,
    "hint": "Readers think about stories in different ways."
   },
   {
    "q": "What sense does the phrase creaking floorboards especially suggest?",
    "options": [
     "Hearing",
     "Taste",
     "Smell"
    ],
    "answer": 0,
    "hint": "Think of the sound the boards might make."
   }
  ]
 },
 "write-your-own": {
  "young": [
   "A what-if question can start stories.",
   "Characters need goals and choices.",
   "Even special powers can have limits.",
   "Changing a draft can strengthen stories."
  ],
  "middle": [
   "A what-if question changes something about ordinary life. Exploring the consequences can turn the idea into connected events.",
   "A character's goal gives events direction, and obstacles create choices. Even a small goal can support a story.",
   "Limits make invented worlds more convincing by showing why unusual abilities cannot solve every problem easily.",
   "Revision can strengthen links between events and earlier choices without removing every surprise or requiring one correct ending."
  ],
  "questions": [
   {
    "q": "What helps turn a what-if idea into a story?",
    "options": [
     "Exploring consequences in connected events",
     "Adding only unrelated surprises",
     "Listing words without any events"
    ],
    "answer": 0,
    "hint": "Ask what would happen next because of the change."
   },
   {
    "q": "How does a goal help a story?",
    "options": [
     "It gives the character's actions direction",
     "It removes every need for choices",
     "It requires the story to be very long"
    ],
    "answer": 0,
    "hint": "Think about what the character is trying to achieve."
   },
   {
    "q": "Why give a character's unusual ability limits?",
    "options": [
     "So problems still require effort and choices",
     "So the character can never act at all",
     "So readers cannot understand any rule"
    ],
    "answer": 0,
    "hint": "A power is more interesting when it cannot do everything."
   },
   {
    "q": "What can revision improve in a story?",
    "options": [
     "How events follow from earlier choices",
     "Only the number of pages, never the plot",
     "Only the writer's handwriting speed"
    ],
    "answer": 0,
    "hint": "Look for causes and consequences across the draft."
   }
  ]
 }
};

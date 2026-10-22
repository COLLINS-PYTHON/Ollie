export type TopicContext = { insights: string[]; observation: string; question: string; options: string[]; answer: number };
export const TOPIC_CONTEXT: Record<string,TopicContext> = {
  "moon-phases": {
    "insights": [
      "The Sun lights half the Moon at any moment, apart from eclipses. As the Moon orbits Earth, our viewing angle changes, revealing different amounts of that bright half.",
      "A complete cycle of lunar phases takes about 29.5 days. This is longer than one orbit relative to distant stars because Earth also moves around the Sun.",
      "A crescent Moon is not normally caused by Earth casting a shadow. Earth’s shadow reaches the Moon only during a lunar eclipse, when the three bodies line up.",
      "The Moon keeps nearly the same face toward Earth because its rotation takes as long as its orbit. This does not mean that one side is always dark."
    ],
    "observation": "With an adult, sketch the Moon from the same place on several evenings. Record the date and visible shape; never look at the Sun.",
    "question": "What normally causes the Moon’s changing phases?",
    "options": [
      "Our changing view of its sunlit half",
      "Earth’s shadow covering it every night",
      "The Moon producing different amounts of light"
    ],
    "answer": 0
  },
  "stars-are-suns": {
    "insights": [
      "A star shines because nuclear fusion in its core releases energy. In stars like the Sun, hydrogen nuclei join to form helium, rather than burning like wood.",
      "A light-year measures distance, not time. It is the distance light travels in one year, so a star ten light-years away appears as it was ten years ago.",
      "Star colors reveal surface temperatures. Blue stars generally have hotter surfaces than red stars, even though everyday drawings often use red to represent things that are hotter.",
      "A star’s apparent brightness depends on both its distance and how much light it produces. A nearby modest star can look brighter than a much more powerful distant star."
    ],
    "observation": "Compare two star photographs with labeled colors. Identify which star should have the hotter surface.",
    "question": "What supplies the energy that makes a Sun-like star shine?",
    "options": [
      "Nuclear fusion in its core",
      "Wood burning on its surface",
      "Reflected light from Earth"
    ],
    "answer": 0
  },
  "our-sun": {
    "insights": [
      "Sunlight takes about eight minutes and twenty seconds to reach Earth. Although light travels extremely quickly, the average distance between Earth and the Sun is about 150 million kilometers.",
      "The Sun contains almost all the solar system’s mass. Its gravity bends the paths of planets into orbits, while their sideways motion keeps them from falling straight inward.",
      "The Sun’s energy drives much of Earth’s water cycle. Sunlight supplies energy for evaporation, helping move water from oceans and other surfaces into the air as invisible vapor.",
      "Earth’s tilt, not a large seasonal change in distance from the Sun, causes the seasons. A hemisphere receives more direct sunlight and longer days during its summer."
    ],
    "observation": "Compare sunrise and sunset times for your town in summer and winter. Use a weather calendar rather than looking at the Sun.",
    "question": "About how long does sunlight take to reach Earth?",
    "options": [
      "Eight minutes and twenty seconds",
      "One second",
      "One whole day"
    ],
    "answer": 0
  },
  "eight-planets": {
    "insights": [
      "The eight planets, outward from the Sun, are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Earth is third, between Venus and Mars in this order.",
      "The four inner planets have rocky surfaces. Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants, with different mixtures of materials beneath their atmospheres.",
      "Planets farther from the Sun generally take longer to complete an orbit. Neptune needs about 165 Earth years, while Mercury completes its journey in just 88 Earth days.",
      "Pluto is classified as a dwarf planet because it has not cleared its orbital neighborhood of other objects. This classification does not make Pluto unimportant or uninteresting."
    ],
    "observation": "Write the eight planet names on cards and arrange them in order. Label the arrangement “not to scale.”",
    "question": "Which planet comes immediately after Earth when moving outward from the Sun?",
    "options": [
      "Mars",
      "Venus",
      "Saturn"
    ],
    "answer": 0
  },
  "deep-and-dark": {
    "insights": [
      "Sunlight becomes weaker with ocean depth because water absorbs and scatters light. Below about 1,000 meters, sunlight is essentially absent, although some animals produce their own light.",
      "Ocean pressure increases with depth because more water lies above. Specially designed vehicles and instruments allow researchers to study deep habitats while protecting equipment from this greater pressure.",
      "Scientists map seafloor features using sonar, which measures echoes of sound pulses. Detailed mapping from ships differs from broad estimates based on satellite measurements of the sea surface.",
      "Deep ocean habitats are not all silent or lifeless. Animals communicate with sound, and near hydrothermal vents some food webs begin with microbes using chemical energy instead of sunlight."
    ],
    "observation": "Look at a labeled ocean-depth diagram. Compare the sunlit surface layer with the much deeper region below 1,000 meters.",
    "question": "Why is sunlight essentially absent in the deep ocean?",
    "options": [
      "Water absorbs and scatters light along its path",
      "The Moon blocks sunlight underwater",
      "Deep water produces a dark-colored gas"
    ],
    "answer": 0
  },
  "sea-turtles": {
    "insights": [
      "Sea turtles have lungs rather than gills, so they must surface to breathe air. They can remain underwater between breaths, but cannot extract oxygen from water like fish.",
      "A resting sea turtle uses oxygen more slowly than an actively swimming one. Dive duration therefore varies with activity, temperature, species, and other conditions, rather than following one fixed limit.",
      "Sea turtles have streamlined shells and powerful flippers that help them move efficiently through water. Unlike many land turtles, they cannot pull their heads completely inside their shells.",
      "Female sea turtles lay eggs on sandy beaches. Hatchlings develop on land before entering the sea, so protecting both beaches and ocean habitats matters throughout their life cycle."
    ],
    "observation": "Watch a reputable aquarium video of a sea turtle. Count its surface visits without trying any breath-holding activity yourself.",
    "question": "Why must a sea turtle return to the surface?",
    "options": [
      "Its lungs need air",
      "Its gills need sunlight",
      "Its shell must fill with water"
    ],
    "answer": 0
  },
  "why-salty": {
    "insights": [
      "Evaporation removes water from the ocean but leaves dissolved salts behind. This separation helps explain why water vapor from the sea is not salty like the seawater below.",
      "Rainwater reacts with rocks on land, releasing dissolved substances that rivers carry toward the ocean. Underwater reactions also supply dissolved materials, so rivers are not the only source.",
      "Ocean salt does not simply increase without limit. Some dissolved substances leave seawater when organisms build shells, minerals form, or water reacts with rocks on the seafloor.",
      "Salinity measures how much dissolved salt water contains. It varies between places because rainfall, evaporation, river inflow, and freezing or melting ice change the balance of water and salt."
    ],
    "observation": "On a world map, compare a rainy river mouth with a dry enclosed sea. Predict which would usually have saltier surface water.",
    "question": "What happens to dissolved salts when seawater evaporates?",
    "options": [
      "They remain behind in the water",
      "They all rise with the water vapor",
      "They change into fresh water"
    ],
    "answer": 0
  },
  "coral-is-alive": {
    "insights": [
      "Reef-building corals are animals called polyps, often living in colonies. Each polyp has a mouth surrounded by tentacles, and many species build hard skeletons from calcium carbonate.",
      "Many shallow-water corals contain microscopic algae inside their tissues. The algae use sunlight to make sugars, sharing energy with their coral hosts in a close partnership called symbiosis.",
      "A coral reef grows as generations of coral skeletons accumulate. Its branching surfaces and small spaces provide shelter for many other organisms, making reefs complex living habitats.",
      "Corals also capture tiny food particles with their tentacles. Not all corals rely on sunlight-loving algae, and some live in deep water where sunlight never reaches them."
    ],
    "observation": "Compare close-up photographs of living coral polyps and an empty coral skeleton. Look for the tentacles visible only on the living animals.",
    "question": "What are the living builders of a coral reef?",
    "options": [
      "Animals called polyps",
      "Plants called sea grasses",
      "Crystals called sand grains"
    ],
    "answer": 0
  },
  "trex-size": {
    "insights": [
      "An adult Tyrannosaurus rex could measure about twelve meters from head to tail. Its hip height was roughly four meters, so length and standing height describe different measurements.",
      "T. rex balanced its large head and body with a long, heavy tail. Its backbone was held more horizontally than in older drawings that show it standing upright.",
      "Scientists estimate dinosaur mass using fossil bones and models of body volume. Estimates vary because fossils usually preserve skeletons, not every muscle, organ, or other soft body part.",
      "T. rex teeth were thick and sturdy rather than thin blades. Fossil tooth marks and damaged bones provide evidence that its powerful jaws could bite into bone."
    ],
    "observation": "On paper, draw a twelve-centimeter dinosaur silhouette at a scale of one centimeter per meter. Add a two-meter person using the same scale.",
    "question": "About how long was a large adult T. rex?",
    "options": [
      "Twelve meters",
      "Twelve centimeters",
      "One hundred meters"
    ],
    "answer": 0
  },
  "dino-eggs": {
    "insights": [
      "Fossil eggs and embryos show that dinosaurs reproduced by laying eggs. Finding an embryo inside an egg can help scientists identify which kind of dinosaur produced it.",
      "Some dinosaur nests contain eggs arranged in circles or organized layers. Their arrangement can reveal nesting behavior, but researchers compare several clues before deciding how the adults cared for eggs.",
      "Eggshells contain tiny pores that allow gases to pass through. A developing dinosaur needed oxygen inside its egg, just as developing birds do inside their eggs today.",
      "Some fossils preserve adult dinosaurs positioned over nests, supporting the idea that certain species tended their eggs. Different dinosaur groups probably had different nesting habits and levels of care."
    ],
    "observation": "Examine a museum photograph of a fossil nest. Sketch the egg arrangement and separate what you can see from what you can only infer.",
    "question": "Which discovery can directly connect a dinosaur egg to its developing animal?",
    "options": [
      "An embryo preserved inside the egg",
      "A nearby smooth pebble",
      "The color of surrounding grass"
    ],
    "answer": 0
  },
  "long-necks": {
    "insights": [
      "Sauropods had long necks that helped them reach vegetation across a large feeding area. Depending on the species, this could include high branches or plants nearer the ground.",
      "Many sauropod neck vertebrae contained air-filled spaces connected with their breathing system. These spaces reduced the weight of the neck compared with equally large bones made entirely of solid material.",
      "A sauropod’s small head reduced the load at the end of its neck. Its teeth gathered plant material, while much of the processing happened farther along the digestive system.",
      "Scientists study neck joints, muscles, and comparisons with living animals to estimate sauropod posture. Different species had different neck shapes, so one pose cannot accurately represent every sauropod."
    ],
    "observation": "Draw a feeding arc around a long-necked dinosaur standing still. Compare the reachable area with that of a shorter-necked animal in the same position.",
    "question": "How could a long neck help a sauropod feed?",
    "options": [
      "It could reach vegetation over a wider area",
      "It allowed the dinosaur to make sunlight",
      "It replaced the need for a mouth"
    ],
    "answer": 0
  },
  "fossils": {
    "insights": [
      "Fossils are preserved remains or traces of past life. They include bones and shells, but also footprints, burrows, and other evidence of what ancient organisms did in their surroundings.",
      "Rapid burial can help protect remains from disturbance and decay. Later, minerals may fill spaces in bone or replace material, preserving details as surrounding sediment becomes rock.",
      "Footprints are trace fossils rather than body fossils. A trackway can suggest how an animal moved and sometimes whether several animals traveled together, even without preserving their bodies.",
      "Scientists use surrounding rock layers and several dating methods to investigate fossil ages. A fossil’s position gives context, while nearby volcanic layers can sometimes provide useful numerical dates."
    ],
    "observation": "Compare a photograph of a fossil bone with a fossil footprint. Label one body evidence and the other evidence of activity.",
    "question": "Which example is a trace fossil?",
    "options": [
      "A preserved footprint",
      "A living tree leaf",
      "A freshly dropped feather"
    ],
    "answer": 0
  },
  "zebra-stripes": {
    "insights": [
      "Experiments indicate that zebra-like striped surfaces can reduce landings by biting flies. Researchers compare striped and plain coverings to test this explanation rather than relying only on appearance.",
      "Zebras have individually distinctive stripe patterns. Researchers can use photographs of these patterns to recognize particular animals and follow their movements without needing to mark each animal physically.",
      "Stripe width and arrangement differ among zebra species and across body regions. Looking closely at legs, shoulders, and flanks reveals that stripes are not a simple repeated barcode.",
      "Scientists have proposed several explanations for zebra stripes, but evidence is not equally strong for all of them. The fly-deterrence explanation currently has stronger experimental support than many alternatives."
    ],
    "observation": "Compare photographs of two zebras. Pick a shoulder stripe junction that could help you recognize each animal again.",
    "question": "What effect of striped surfaces has experimental support?",
    "options": [
      "They can reduce biting-fly landings",
      "They make animals invisible",
      "They produce food for zebras"
    ],
    "answer": 0
  },
  "bird-song": {
    "insights": [
      "Many songbirds learn songs by listening to other birds and practicing. Their inherited abilities guide learning, but the sounds they hear can influence the songs they eventually sing.",
      "Birdsong often helps advertise a territory or attract a mate. Shorter calls may serve other purposes, such as keeping a flock together or signaling that something needs attention.",
      "Birds produce vocal sounds using an organ called the syrinx, near where the windpipe branches. This differs from the human voice box, which sits higher in the airway.",
      "Some bird populations develop local song patterns called dialects. Comparing recordings from different places helps scientists investigate how songs spread and change as birds learn from one another."
    ],
    "observation": "From indoors or a quiet outdoor spot, listen for two different bird sounds. Describe their rhythm without approaching nests or playing recordings.",
    "question": "How do many songbirds develop their songs?",
    "options": [
      "By listening and practicing",
      "By copying leaf shapes",
      "By hearing no other birds at all"
    ],
    "answer": 0
  },
  "busy-hive": {
    "insights": [
      "Worker honeybees often change jobs as they age. Younger workers may care for larvae inside the hive, while older workers commonly collect nectar and pollen outside the nest.",
      "A queen honeybee lays most of the colony’s eggs. Workers are also female, while males called drones have a different role, so colony jobs are not divided equally.",
      "Foraging honeybees can communicate the location of food using a waggle dance. The dance’s direction and timing provide information about where other workers might find the food source.",
      "Honeybees turn nectar into honey by processing it and removing water. Stored honey supplies energy when flowers are scarce, while pollen provides important nutrients for growing young bees."
    ],
    "observation": "Watch a close-up educational video of a waggle dance. Identify the repeated straight section without opening or approaching a hive.",
    "question": "How do worker honeybee jobs commonly change?",
    "options": [
      "They often shift with the worker’s age",
      "Every worker stays a queen forever",
      "All workers only collect nectar from birth"
    ],
    "answer": 0
  },
  "snail-shell": {
    "insights": [
      "A snail’s shell is attached to its body by muscles, not to a spine. Snails are invertebrates, meaning they have no backbone, and cannot simply leave their shells.",
      "The mantle, a layer of tissue beneath the shell, produces new shell material. Growth mainly adds material at the opening, allowing the shell to expand as the snail grows.",
      "Many land snails move using waves of muscle contraction along a broad foot. Mucus helps the foot grip surfaces and protects its tissues as the animal glides along.",
      "A shell helps protect a land snail’s soft body and reduce water loss. Many snails shelter during dry conditions, becoming more active when their surroundings are moist again."
    ],
    "observation": "Observe a snail from a distance after rain. Look for its broad foot and shell opening without touching it or moving it.",
    "question": "Why is it incorrect to say a snail’s shell attaches to its spine?",
    "options": [
      "Snails have no backbone",
      "Snails have no muscles",
      "Snails change shells every day"
    ],
    "answer": 0
  },
  "heart-beats": {
    "insights": [
      "The heart is a muscular pump that moves blood through two linked circuits. One carries blood to the lungs, while the other delivers blood to the rest of the body.",
      "Heart valves help keep blood moving in the correct direction. They open and close as pressure changes, rather like one-way doors between chambers or at the heart’s exits.",
      "During physical activity, muscles need more oxygen and nutrients. The heart usually beats faster and pumps more blood each minute to help meet this increased demand for energy.",
      "Special cells in the heart generate electrical signals that coordinate its contractions. You do not need to consciously order each beat, although nerves and hormones can change its pace."
    ],
    "observation": "While sitting comfortably, feel your wrist pulse with two fingers. Count for thirty seconds and double it; do not press on your neck.",
    "question": "Which two destinations do the heart’s linked circuits serve?",
    "options": [
      "The lungs and the rest of the body",
      "Only the brain and stomach",
      "Only the hands and feet"
    ],
    "answer": 0
  },
  "brain-messages": {
    "insights": [
      "Neurons carry information using electrical signals along their fibers and, at most connections, chemical messengers between cells. These connections, called synapses, let networks of neurons communicate throughout the nervous system.",
      "The brain does not perform every rapid response by itself. Some reflex pathways pass through the spinal cord, allowing a quick response while information also travels onward to the brain.",
      "Different brain regions work together during ordinary tasks. Reading aloud, for example, involves networks for vision, language, movement, and hearing rather than a single isolated reading spot in the brain.",
      "Practice can change how strongly neurons connect and how efficiently networks work. Learning a skill therefore involves physical changes in the nervous system, not simply storing information like loose papers."
    ],
    "observation": "Think through reading one word aloud. List the senses and movements involved, then consider why several brain networks must cooperate.",
    "question": "What is a synapse?",
    "options": [
      "A connection where neurons communicate",
      "A hollow space inside a bone",
      "A muscle that pumps blood"
    ],
    "answer": 0
  },
  "breathing": {
    "insights": [
      "Inside the lungs, tiny air sacs called alveoli provide a large surface for gas exchange. Oxygen moves into nearby blood, while carbon dioxide moves from blood into the air sacs.",
      "The diaphragm is a sheet of muscle below the lungs. When it contracts and moves downward, the chest expands, helping air flow into the lungs through the airways.",
      "Body cells use oxygen in processes that release energy from nutrients. Carbon dioxide is a waste product of these processes and travels in the blood back toward the lungs.",
      "Breathing rate changes with activity, age, and other conditions, so one daily total cannot describe everyone. During exercise, breathing usually becomes faster and deeper as the body’s needs increase."
    ],
    "observation": "Sit quietly and notice your lower ribs moving during normal breathing. Do not hold your breath or deliberately breathe unusually fast.",
    "question": "Where does oxygen pass from inhaled air into the blood?",
    "options": [
      "Across the walls of the alveoli",
      "Inside the stomach",
      "Through the outer surface of fingernails"
    ],
    "answer": 0
  },
  "bones-fuse": {
    "insights": [
      "Some bones begin as separate pieces that join during growth. This fusion helps explain why infants have more separate skeletal parts than adults, whose usual bone count is 206.",
      "A newborn’s skull includes gaps between developing bones. These flexible areas allow room for early brain growth and gradually close as the skull develops through infancy and childhood.",
      "Growing bones lengthen near regions called growth plates, where cartilage is gradually replaced by bone. After these plates close, bones no longer grow longer in the same way.",
      "Bone is living tissue containing cells and blood vessels. Throughout life, the body removes and rebuilds small amounts of bone, helping maintain its structure and respond to physical demands."
    ],
    "observation": "Compare labeled diagrams of an infant skull and an adult skull. Find the spaces between skull bones without touching anyone’s head.",
    "question": "Why does the number of separate bones usually decrease during growth?",
    "options": [
      "Some pieces fuse together",
      "Bones turn into empty air",
      "All small bones fall out"
    ],
    "answer": 0
  },
  "zero": {
    "insights": [
      "In place-value notation, zero can show an empty position. In 305, it tells us there are no tens, keeping the hundreds and ones in their correct places.",
      "Indian mathematicians made important advances in treating zero as a number. In the seventh century, Brahmagupta described arithmetic rules involving zero, building on a longer history of number notation.",
      "Adding zero leaves a number unchanged, while multiplying by zero gives zero. These different roles are useful when checking calculations and understanding patterns in arithmetic rather than memorizing answers alone.",
      "Division by zero is not defined in ordinary arithmetic. For example, no number multiplied by zero gives five, so five divided by zero cannot have an ordinary numerical answer."
    ],
    "observation": "Write 35, 305, and 350 in a place-value chart. Explain how the zero changes which position each other digit occupies.",
    "question": "What does the zero indicate in 305?",
    "options": [
      "There are no tens",
      "There are no hundreds",
      "There are five tens"
    ],
    "answer": 0
  },
  "shapes": {
    "insights": [
      "On a flat surface, a triangle’s three interior angles add to 180 degrees. Changing the side lengths changes individual angles, but not this total for an ordinary flat triangle.",
      "A square is a special rectangle because it has four right angles and also four equal sides. Shape families can overlap, so one figure may fit several correct descriptions.",
      "A circle consists of points at the same distance from its center. That distance is the radius, while a diameter crosses the center and measures twice the radius.",
      "Geometry on curved surfaces follows different rules from flat geometry. A triangle drawn with suitable shortest paths on a sphere can have an angle total greater than 180 degrees."
    ],
    "observation": "Draw a triangle on paper and label its three angles. Estimate their sizes, then check whether your estimates total about 180 degrees.",
    "question": "What is the interior-angle total of a triangle on a flat surface?",
    "options": [
      "180 degrees",
      "90 degrees",
      "360 degrees"
    ],
    "answer": 0
  },
  "no-biggest": {
    "insights": [
      "There is no largest whole number because adding one always produces a larger one. This argument works for any proposed largest whole number, however many digits it contains.",
      "Infinity is not the final whole number at the end of counting. Instead, it describes the unending nature or size of collections that cannot be exhausted by counting finitely.",
      "The positive even numbers can be paired with the positive whole numbers: one with two, two with four, and so on. This pairing shows both collections have the same infinite size.",
      "Not all infinite collections have the same size. Mathematicians can prove that the real numbers, including all points on a number line, cannot be listed like the positive whole numbers."
    ],
    "observation": "Invent a very large whole number on paper. Add one, then explain why the same step defeats any claim of a largest whole number.",
    "question": "Why can no whole number be the largest?",
    "options": [
      "Adding one always makes a larger whole number",
      "All whole numbers have one digit",
      "Counting must stop at one million"
    ],
    "answer": 0
  },
  "equal-fractions": {
    "insights": [
      "Multiplying a fraction’s numerator and denominator by the same nonzero whole number gives an equivalent fraction. The pieces become smaller, but taking proportionally more pieces preserves the amount.",
      "Fractions describe amounts relative to a chosen whole. Half of a large sheet can be bigger than half of a small sheet, even though both shares are called one half.",
      "A number line shows equivalent fractions at the same point. One half, two quarters, and three sixths all lie halfway between zero and one, despite using different numbers.",
      "Simplifying a fraction divides its numerator and denominator by a shared factor. For example, six eighths becomes three quarters, changing its written form without changing the amount it represents."
    ],
    "observation": "Draw equal-sized rectangles and shade one half of one and two quarters of another. Compare the shaded areas, keeping the wholes identical.",
    "question": "What happens when both parts of a fraction are multiplied by the same nonzero whole number?",
    "options": [
      "Its value stays the same",
      "Its value always doubles",
      "Its value becomes zero"
    ],
    "answer": 0
  },
  "mixing-colors": {
    "insights": [
      "Mixing colored light differs from mixing paint. Red and green light together can appear yellow, while paints combine by absorbing some wavelengths and reflecting others toward your eyes.",
      "Traditional painting lessons often use red, yellow, and blue as primary colors. Color printing commonly uses cyan, magenta, yellow, and black because these inks produce a useful range of colors.",
      "An object’s apparent color depends on the light shining on it as well as the wavelengths it reflects. A colored object may therefore look different under different lamps.",
      "Adding white paint usually makes a tint, while adding black usually makes a shade. Artists use these changes in lightness to suggest form, distance, and contrasts within a picture."
    ],
    "observation": "Compare a printed color picture under daylight and an ordinary indoor lamp. Describe any changes without staring into either light source.",
    "question": "Why does mixing paint behave differently from mixing colored light?",
    "options": [
      "Paint absorbs some wavelengths, while light sources add light",
      "Paint contains tiny screens",
      "All light mixtures always become black"
    ],
    "answer": 0
  },
  "old-paintings": {
    "insights": [
      "Some surviving cave paintings are tens of thousands of years old. Their survival shows that people made images long before writing systems appeared, although many other early artworks have disappeared.",
      "Early artists used materials such as charcoal and mineral pigments. Different minerals produced different colors, and the available materials influenced what artists could place on rock surfaces or objects.",
      "Researchers investigate ancient art using its location, nearby objects, and dating methods. Dating a mineral layer over a painting can provide a limit rather than the painting’s exact creation date.",
      "We cannot always know why an ancient image was made. Careful interpretation distinguishes visible evidence, such as an animal outline, from uncertain ideas about ceremonies, teaching, or storytelling."
    ],
    "observation": "Examine a museum image of a cave painting. List three visible details separately from one possible interpretation of its purpose.",
    "question": "What does the age of some cave paintings demonstrate?",
    "options": [
      "People made images before writing systems appeared",
      "All early art was made on paper",
      "Painting began after photography"
    ],
    "answer": 0
  },
  "how-cameras-work": {
    "insights": [
      "A camera lens gathers light and focuses it onto film or an electronic sensor. The pattern of light forms an image, which the camera records rather than creating the scene itself.",
      "The aperture is an opening that controls how much light enters. Changing its size also affects how much of the scene can appear acceptably sharp from near to far.",
      "Shutter speed describes how long the camera records incoming light for an exposure. A short exposure can freeze movement, while a longer one may show moving objects as blurred streaks.",
      "Digital sensors contain many light-sensitive sites. The camera processes their measurements into pixels, but image quality also depends on factors such as focus, lighting, lens quality, and camera movement."
    ],
    "observation": "Using a phone camera, photograph the same stationary object from two distances. Compare framing and focus without photographing the Sun or private information.",
    "question": "What is the main job of a camera lens?",
    "options": [
      "To focus incoming light onto a recording surface",
      "To manufacture the objects in the scene",
      "To turn sound into paper"
    ],
    "answer": 0
  },
  "patterns": {
    "insights": [
      "A repeating pattern has a unit that appears again in the same order. Identifying that unit helps you predict what comes next instead of treating each item as unrelated.",
      "Symmetry is a kind of pattern in which a transformation leaves a shape looking unchanged. Reflection symmetry uses a mirror line, while rotational symmetry involves turning around a center.",
      "Some patterns grow rather than repeat exactly. A staircase of blocks might gain one block in each new row, so describing its growth rule is more useful than naming colors.",
      "Natural patterns need not be perfectly regular. Leaf arrangements, shells, and animal markings can show repeated structures while still varying because living things grow under changing conditions in real environments."
    ],
    "observation": "Draw a border with a repeating unit of three shapes. Underline one complete unit and predict the tenth shape.",
    "question": "What helps you predict the next item in a repeating pattern?",
    "options": [
      "Finding its repeating unit",
      "Ignoring the order of items",
      "Counting only its colors without their order"
    ],
    "answer": 0
  },
  "rain": {
    "insights": [
      "Cloud droplets form when water vapor condenses onto tiny particles in cooling air. Water vapor itself is invisible, while the droplets and ice crystals in clouds scatter visible light.",
      "Cloud droplets are usually too small to fall as rain immediately. They must grow, often by joining with other droplets or through processes involving ice crystals in colder clouds.",
      "Rain is part of a continuing water cycle rather than a new supply of water. Water moves among air, land, rivers, living things, and oceans through several different processes.",
      "Air rising over hills or meeting cooler air can cool enough for clouds to form. This helps explain why rainfall patterns depend on landscape as well as local weather conditions."
    ],
    "observation": "Watch clouds from a sheltered window. Record whether rain falls, remembering that a visible cloud does not always produce rain reaching the ground.",
    "question": "What are the visible parts of a cloud mainly made of?",
    "options": [
      "Tiny water droplets or ice crystals",
      "Invisible water vapor alone",
      "Smoke from the Sun"
    ],
    "answer": 0
  },
  "snowflakes": {
    "insights": [
      "Ice crystals often develop sixfold symmetry because water molecules arrange in a hexagonal structure when they freeze. This molecular organization helps explain the six-armed forms of many familiar snowflakes.",
      "A snow crystal’s shape depends on temperature and water vapor as it grows. Changing conditions along its path through a cloud can produce branches, plates, columns, or other forms.",
      "Not every snowflake looks like a perfect six-pointed star. Crystals can join together, break, or grow unevenly, so falling snow contains many irregular particles as well as symmetrical examples.",
      "Snow usually looks white because many ice surfaces scatter incoming light in different directions. A single clear ice crystal can be transparent, even though a pile of snow appears white."
    ],
    "observation": "Compare magnified snow-crystal photographs indoors. Count arms where visible, then find a plate or column that differs from the familiar star shape.",
    "question": "Why do many snow crystals show sixfold symmetry?",
    "options": [
      "Ice has a hexagonal molecular structure",
      "Clouds contain six-sided cardboard molds",
      "Every crystal circles Earth six times"
    ],
    "answer": 0
  },
  "wind": {
    "insights": [
      "Wind is moving air, driven in part by differences in air pressure. Air tends to move from higher-pressure regions toward lower-pressure regions, although Earth’s rotation and friction affect its path.",
      "Uneven heating helps create pressure differences. Land often warms faster than nearby water during daytime, helping produce coastal breezes as warmer air rises and surrounding air moves into place.",
      "A weather vane shows the direction the wind comes from, not where it is heading. A north wind therefore arrives from the north and moves generally toward the south.",
      "Buildings, trees, and hills change airflow near the ground. This can make wind gusty or sheltered in neighboring places, even when both places share the same broader weather pattern."
    ],
    "observation": "From a safe window, compare moving leaves in an open area with leaves sheltered behind a building. Avoid going outside during strong winds.",
    "question": "Air tends to move from which region toward which region?",
    "options": [
      "Higher pressure toward lower pressure",
      "Lower pressure toward higher pressure only",
      "Cold oceans directly toward the Moon"
    ],
    "answer": 0
  },
  "rainbows": {
    "insights": [
      "A rainbow forms when sunlight enters water droplets, bends, reflects inside, and bends again as it leaves. Different wavelengths bend by different amounts, spreading white sunlight into visible colors.",
      "To see a typical rainbow, the Sun must be behind you and water droplets ahead. The rainbow’s position depends on your viewpoint, so different observers receive light from different droplets.",
      "A primary rainbow has red along its outer edge and violet along its inner edge. The colors blend continuously, even though people often name a short list of separate bands.",
      "A rainbow is part of a circle centered opposite the Sun. The ground often hides its lower portion, while a high viewpoint can sometimes reveal more of the circle."
    ],
    "observation": "Look at a diagram showing sunlight passing through a raindrop. Trace the entry, internal reflection, and exit with your finger; never look directly at the Sun.",
    "question": "What separates sunlight into colors inside raindrops?",
    "options": [
      "Different wavelengths bend by different amounts",
      "Droplets paint sunlight with stored dyes",
      "The Moon sorts the colors"
    ],
    "answer": 0
  },
  "pyramids": {
    "insights": [
      "Evidence from workers’ settlements and tombs indicates that organized labor teams built the Giza pyramids. Skilled workers and supporting communities, rather than the familiar image of enslaved builders, were central.",
      "The Great Pyramid was built for the Egyptian king Khufu during the third millennium BCE. It was part of a larger complex with temples, pathways, and other burial structures.",
      "Builders used tools and simple machines, including sledges and ramps, to move heavy materials. Researchers still debate the precise ramp arrangements used at different stages of pyramid construction.",
      "Pyramid building required food supplies, transport, surveying, and administration as well as stonework. Thinking about these supporting tasks helps explain why a large construction project involved an entire organized society."
    ],
    "observation": "List five jobs a pyramid project would need besides lifting stones. Include at least one job connected with food and one with transport.",
    "question": "What does archaeological evidence suggest about the Giza pyramid builders?",
    "options": [
      "They included organized teams of skilled workers",
      "They were visitors from another planet",
      "They worked without food or supplies"
    ],
    "answer": 0
  },
  "first-writing": {
    "insights": [
      "Some of the earliest Mesopotamian writing recorded goods, quantities, and transactions. Keeping accounts helped people manage resources in growing communities, rather than beginning mainly as a way to write adventure stories.",
      "Early signs in Mesopotamia developed into cuneiform, made by pressing a reed tool into clay. Its wedge-shaped marks could represent different languages, so cuneiform was a writing system, not one language.",
      "Writing developed independently in more than one part of the world. Mesopotamia was an important early center, but the history of writing cannot be reduced to one uninterrupted global invention.",
      "Deciphering an ancient script requires evidence about how signs relate to language. Inscriptions with known names or parallel texts in different languages can help researchers test possible readings carefully."
    ],
    "observation": "Invent three symbols for kinds of classroom supplies and record their quantities. Consider what extra signs you would need to record who borrowed them.",
    "question": "What did many early Mesopotamian records track?",
    "options": [
      "Goods and quantities",
      "Movie schedules",
      "Online passwords"
    ],
    "answer": 0
  },
  "castles": {
    "insights": [
      "Medieval castles combined protected living space with military and administrative roles. Their walls and controlled entrances helped secure important places, while residents managed surrounding estates and daily household activities.",
      "A castle needed reliable water and stored food as well as strong walls. Wells, cisterns, kitchens, and storage rooms helped support the people living and working inside its defenses.",
      "Castle designs varied across regions and centuries. Some early examples used timber and earth, while many later structures used stone, so not every castle resembled the same storybook tower.",
      "Entrances were often especially carefully designed because people and supplies needed access. Gatehouses, passages, and bridges could control movement while still allowing the castle to function as a busy settlement."
    ],
    "observation": "Study a labeled castle plan. Find the entrance, water source, living rooms, and storage spaces, then explain why each was needed.",
    "question": "Which description best fits a medieval castle?",
    "options": [
      "A protected residence with military and administrative roles",
      "Only a decorative tower with no residents",
      "Only a public theater"
    ],
    "answer": 0
  },
  "old-maps": {
    "insights": [
      "Historical maps reflected the information and purposes of their makers. Some were careful local surveys, while others included uncertain coastlines or symbolic features, so early maps were not simply random guesses.",
      "Sailors combined charts with observations of stars, compass directions, winds, and currents. A map was one tool among several, and successful navigation depended on checking information against actual conditions.",
      "Any flat map of Earth distorts something because a curved surface cannot be flattened perfectly. Different map projections preserve some properties while changing others, such as area, shape, or distance.",
      "A map’s scale connects distances on paper with distances on the ground. Its key explains symbols, allowing readers to distinguish features such as roads, rivers, boundaries, and different kinds of settlement."
    ],
    "observation": "Compare two world maps with different projections. Look at Greenland and Africa, then check a globe to compare their relative sizes.",
    "question": "Why do historical maps differ in accuracy and appearance?",
    "options": [
      "Their makers had different information and purposes",
      "All mapmakers measured the entire Earth personally",
      "Every old map used satellite photographs"
    ],
    "answer": 0
  },
  "drums": {
    "insights": [
      "A drum produces sound when a stretched membrane vibrates after being struck. The moving membrane sets nearby air vibrating, and these pressure changes travel outward as sound waves.",
      "Tightening a drumhead generally raises its pitch because the membrane vibrates faster. Other factors matter too, including the drumhead’s size, thickness, and how it interacts with the air inside.",
      "A drum’s shell helps shape its sound by affecting resonances and how sound radiates. Two drums with similar diameters may still sound different because their construction and heads differ.",
      "Drums have served musical, ceremonial, and communication roles in many cultures. Their materials and playing techniques vary widely, showing how one basic vibrating system can support many distinct traditions."
    ],
    "observation": "Listen to recordings of two different drums at a comfortable volume. Describe differences in pitch and tone without assuming the louder drum has the higher pitch.",
    "question": "What starts the sound when a drum is struck?",
    "options": [
      "Its stretched membrane vibrates",
      "Its shell turns light into sound",
      "Its surface releases stored words"
    ],
    "answer": 0
  },
  "strings-vibrate": {
    "insights": [
      "A vibrating string produces a higher pitch when it vibrates more times each second. This rate is called frequency, so faster vibration means higher frequency and a higher note.",
      "Shortening the vibrating part of a string raises its pitch if other conditions stay similar. Guitarists use frets to change the effective string length while playing different notes.",
      "Increasing a string’s tension generally raises its pitch. For strings of the same length and tension, a lower mass per unit length also usually gives a higher pitch.",
      "A string alone moves relatively little air, so instruments use other structures to make its vibrations audible. A guitar’s bridge and soundboard help transfer those vibrations to surrounding air."
    ],
    "observation": "Watch a close-up guitar demonstration. Notice how pressing different frets changes the vibrating length without changing which string is being played.",
    "question": "What does a higher string-vibration frequency produce?",
    "options": [
      "A higher-pitched note",
      "A lower-pitched note",
      "A completely silent note every time"
    ],
    "answer": 0
  },
  "piano": {
    "insights": [
      "Pressing a piano key activates a mechanism that makes a felt-covered hammer strike strings. The hammer then moves away, allowing the strings to vibrate freely rather than remaining pressed against them.",
      "The piano’s soundboard is a broad wooden panel that receives string vibrations through bridges. Its larger moving surface helps transfer energy to the air, making the sound much easier to hear.",
      "Most modern standard pianos have 88 keys, covering both low and high notes. Lower notes use longer, heavier strings, while higher notes generally use shorter, lighter strings under suitable tension.",
      "Dampers normally stop many piano strings from vibrating after a key is released. The sustain pedal lifts these dampers, allowing notes to continue and other strings to resonate sympathetically."
    ],
    "observation": "Watch a piano-action animation. Follow one key, hammer, string, and damper in order; do not reach inside a real piano.",
    "question": "What directly strikes the strings when a piano key is pressed?",
    "options": [
      "A felt-covered hammer",
      "A spinning fan",
      "The pianist’s fingernail"
    ],
    "answer": 0
  },
  "voice": {
    "insights": [
      "Your voice begins when air from your lungs passes through the voice box and sets the vocal folds vibrating. Their repeated opening and closing creates a sound source for speech.",
      "Changing the tension, length, and thickness of the vibrating vocal folds changes pitch. Faster vibration produces higher notes, although comfortable pitch ranges differ among people and change during growth.",
      "Your throat, mouth, and nasal passages shape the sound produced by the vocal folds. Moving the tongue and lips changes resonances, helping create different vowels and recognizable speech sounds.",
      "Loudness and pitch describe different properties of a voice. A person can speak a high note softly or a low note loudly, so louder does not automatically mean higher."
    ],
    "observation": "Say “ee” and “oo” softly at a comfortable pitch. Notice how your lips and tongue change position without straining or shouting.",
    "question": "What vibrates to start your voiced speech sounds?",
    "options": [
      "The vocal folds",
      "The teeth alone",
      "The outer ears"
    ],
    "answer": 0
  },
  "robots": {
    "insights": [
      "A robot is a physical machine that carries out programmed actions, often using sensors and motors. It need not resemble a person; a factory arm is also a robot.",
      "Sensors provide information about a robot’s surroundings or internal state. A distance sensor, for example, can help a mobile robot avoid an obstacle by supplying measurements to its control system.",
      "Feedback means using measurements to adjust an action. A robot can compare its actual position with a target and correct its movement, rather than repeating exactly the same motion regardless of results.",
      "Some robots use learned models to recognize objects or choose actions. This can make their behavior flexible, but it does not mean they have human feelings, personal wishes, or unlimited understanding."
    ],
    "observation": "Pretend to be a robot moving a pencil on paper. Follow a partner’s written steps exactly, then identify where clearer instructions were needed.",
    "question": "Which object can correctly be called a robot?",
    "options": [
      "A programmed factory arm",
      "Any ordinary stone",
      "Only machines shaped like people"
    ],
    "answer": 0
  },
  "binary": {
    "insights": [
      "A bit is a unit of information with two possible values, usually written as 0 and 1. Computers represent these values using distinguishable physical states in electronic circuits or storage.",
      "Eight bits make a byte, which has 256 possible patterns. These patterns can represent numbers or parts of other data, depending on the coding rules a computer uses.",
      "Binary place values double as you move left: ones, twos, fours, eights, and so on. The binary number 101 therefore represents one four plus one one, which equals five.",
      "Text encoding assigns numbers to characters, but a character does not always fit into one byte. Many writing systems and symbols use multiple bytes in common encodings such as UTF-8."
    ],
    "observation": "Use cards labeled 8, 4, 2, and 1. Turn selected cards face up to represent five, then write 1 for up and 0 for down.",
    "question": "How many possible values does one bit have?",
    "options": [
      "Two",
      "Eight",
      "Ten"
    ],
    "answer": 0
  },
  "games": {
    "insights": [
      "A video game shows a rapid sequence of separate images called frames. When these images update smoothly enough, changes in object positions create the perception of continuous movement on the screen.",
      "Frame rate measures how many frames are produced each second. Higher rates can improve smoothness, but consistent timing between frames also matters, so an uneven rate may still feel jerky.",
      "Game software updates rules, movement, and player input as well as drawing pictures. The visible scene is therefore only one part of the work happening during an interactive game.",
      "A display’s refresh rate and a game’s frame rate are related but different. The screen updates at its own supported rate, while the computer may produce new frames at another rate."
    ],
    "observation": "Draw a ball in slightly different positions on several paper corners. Flip them slowly, then faster, to compare how the apparent movement changes.",
    "question": "What helps a game create the appearance of continuous movement?",
    "options": [
      "A rapid sequence of changing frames",
      "One completely unchanged picture",
      "A screen that never refreshes"
    ],
    "answer": 0
  },
  "wifi": {
    "insights": [
      "WiFi carries data using radio waves between compatible devices and a wireless access point. A home router often includes this access point, but the wireless link itself is not the internet.",
      "Devices encode information into changing radio signals and decode received signals back into data. Sending a picture therefore means transmitting coded information, not moving a tiny printed picture through the air.",
      "Walls, distance, and interference can weaken a WiFi connection. Radio waves may pass through some materials more easily than others, so moving behind a thick wall can reduce signal quality.",
      "A router directs data between networks, while an access point provides wireless access to a local network. Home equipment often combines these functions in one box, which can hide the distinction."
    ],
    "observation": "If permitted, compare your device’s WiFi indicator in two ordinary rooms. Note nearby walls without moving equipment or changing network settings.",
    "question": "What carries data across a WiFi link?",
    "options": [
      "Radio waves",
      "Sound waves from the speaker",
      "Tiny paper messages"
    ],
    "answer": 0
  },
  "story-shape": {
    "insights": [
      "Many stories introduce a situation, develop a problem, reach a turning point, and show consequences. This is a useful pattern, not a rule that every culture or writer must follow.",
      "A story’s conflict can happen within a character rather than between enemies. Choosing whether to admit a mistake can drive a plot just as effectively as an outward challenge.",
      "The climax is often a moment when a central conflict reaches its decisive point. Its importance comes from what changes for the characters, not simply from being the loudest scene.",
      "A resolution shows how events settle or what has changed. Some endings answer nearly every question, while others deliberately leave uncertainty for readers to discuss after the story finishes."
    ],
    "observation": "Choose a familiar short story. Write one sentence each for its starting situation, main problem, turning point, and consequences.",
    "question": "How should the common setup-to-resolution pattern be understood?",
    "options": [
      "As a useful pattern rather than a universal rule",
      "As a rule all stories must follow exactly",
      "As a method used only in factual reports"
    ],
    "answer": 0
  },
  "new-words": {
    "insights": [
      "Reading introduces words in meaningful contexts, including terms uncommon in everyday conversation. Meeting a word in several different passages can help a reader build a more accurate understanding of its meaning.",
      "Context clues can suggest a word’s meaning, but they do not always give a complete definition. Checking a reliable dictionary helps when several meanings fit or the word is important.",
      "Word parts can provide useful clues. A prefix such as “re-” often suggests doing something again, while roots and suffixes can connect unfamiliar words with words a reader already knows.",
      "Using a new word in your own sentence tests understanding. Comparing that sentence with examples from a dictionary or book can reveal whether you have chosen the right meaning and usage."
    ],
    "observation": "Choose an unfamiliar word in a book. Guess its meaning from context, check a dictionary, and write a sentence using the confirmed meaning.",
    "question": "How can repeated encounters with a word in books help?",
    "options": [
      "They provide contexts that refine its meaning",
      "They guarantee it always has only one meaning",
      "They make dictionary checks unnecessary in every case"
    ],
    "answer": 0
  },
  "imagination": {
    "insights": [
      "When reading descriptions, people may recruit some brain systems also involved in perception and action. This overlap can help explain vivid experiences, but imagining a scene is not identical to experiencing it.",
      "Readers build mental models using words, prior knowledge, and expectations. Two people can read the same description and imagine different details because the text leaves some features unspecified.",
      "Mental imagery varies greatly between people. Some readers picture scenes vividly, while others experience little visual imagery and still understand, enjoy, and remember stories through other forms of thinking.",
      "Specific sensory language can guide imagination without describing everything. A reference to creaking floorboards may suggest sound, movement, and setting, allowing readers to contribute details from their own experience."
    ],
    "observation": "Read a short room description with a friend. List details stated in the text separately from details each of you added in imagination.",
    "question": "How does imagining a written scene relate to experiencing one?",
    "options": [
      "Some brain systems overlap, but the experiences are not identical",
      "Reading physically moves the reader into the scene",
      "The two processes share no possible brain activity"
    ],
    "answer": 0
  },
  "write-your-own": {
    "insights": [
      "A what-if question can start a story by changing one feature of ordinary life. The writer then explores consequences, turning an interesting possibility into connected events rather than unrelated surprises.",
      "A character’s goal gives events direction, while obstacles make choices necessary. A story can grow from a small goal, such as returning a lost object before its owner leaves.",
      "Limits can make invented worlds more convincing. If a character has an unusual ability, deciding what it cannot do helps readers understand why a problem still requires effort and choices.",
      "Revision allows writers to strengthen connections after the first draft. Checking whether events follow from earlier choices can improve a plot without removing every surprise or forcing a single correct ending."
    ],
    "observation": "Write a what-if question about a school object. Add one character goal and one limit, then outline three connected consequences.",
    "question": "What should a writer explore after inventing a what-if idea?",
    "options": [
      "Its connected consequences",
      "Only unrelated surprises",
      "A list of words with no events"
    ],
    "answer": 0
  }
};

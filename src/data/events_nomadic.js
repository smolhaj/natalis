// Nomadic life arc — Maasai (Kenya/Tanzania), Bedouin (Jordan/Saudi Arabia),
// Mongolian herder (Mongolia). Implements BUILD 16.

export const NOMADIC_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // MAASAI
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'nom_maasai_cattle_world',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      (G.character.country.name === 'Kenya' || G.character.country.name === 'Tanzania') &&
      G.ethnicity === 'maasai' &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem.maasaiChildhood,
    text: 'The cattle are the measure of everything. Your father counts them the way others count money, and they are money — bridewealth, dispute resolution, insurance against the drought. You are learning which cow belongs to which lineage by the ear notch and the hide pattern. This is a literacy specific to this world and most of the world does not know it exists. The Mara grass in the dry season. The way the herd moves before rain. Your age-set will be circumcised together and become warriors together and move cattle across distances that the new government is beginning to call illegal without asking you.',
    choices: null,
    effect: (p) => { p.e += 4; p.s += 3; p.m += 5; p.addFlag('maasai_pastoralist'); p.setMem('maasaiChildhood', true) },
  },

  {
    id: 'nom_maasai_national_park',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.character.country.name === 'Kenya' || G.character.country.name === 'Tanzania') &&
      G.flags.includes('maasai_pastoralist') &&
      G.currentYear >= 1965 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem.maasaiPark,
    text: 'The land your grandfather moved cattle across is now a conservation area. The Serengeti. The Maasai Mara. The names are the same but the permissions have changed. Colonial-era game laws that moved the Maasai off the best grazing for wildlife management were inherited by the independent governments without revision. The tourist dollars go to lodges and park fees; the compensation to Maasai communities is a fraction of that and contested. A lion is worth more as a photograph than your cattle are worth as cattle, by the pricing structure the world has settled on. You have not settled on it.',
    choices: [
      {
        text: 'You pursue land rights through community organisations and the courts.',
        tag: null,
        outcome: 'The slow work of legal claims and advocacy. Some land returned in some cases. The fight measured in decades rather than seasons.',
        effect: (p) => { p.karma += 6; p.m -= 5; p.addFlag('maasai_conservation_displaced'); p.setMem('maasaiPark', true) },
      },
      {
        text: 'You find pasture routes around the restricted zones.',
        tag: null,
        outcome: 'The knowledge of which rangers can be negotiated with and which cannot. The cattle still move; the routes require more knowledge than they used to.',
        effect: (p) => { p.r += 4; p.e += 3; p.addFlag('maasai_conservation_displaced'); p.setMem('maasaiPark', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nom_maasai_city_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.character.country.name === 'Kenya' || G.character.country.name === 'Tanzania') &&
      G.flags.includes('maasai_pastoralist') &&
      G.age >= 18 && G.age <= 32 &&
      !G.mem.maasaiCityQ,
    text: 'Nairobi is a few hours away. Your age-set has a member who went to secondary school on a scholarship — first from the section — and came back three years later in trousers, and is now doing something with a phone in an office in the city. You have a choice your father\'s father did not have, which is also a problem he did not have. The world your childhood prepared you for and the world preparing to receive you are not the same world. The cattle are waiting. The question is which world you are waiting for.',
    choices: [
      {
        text: 'You go. You carry the age-set knowledge as a private thing.',
        tag: null,
        outcome: 'The first months are a specific kind of hard. The city has no map for what you know. But the adaptability built into you by crossing distances with animals through bad seasons is real.',
        effect: (p) => { p.m -= 6; p.s += 4; p.addFlag('rural_to_urban'); p.addFlag('nomadic_heritage'); p.setMem('maasaiCityQ', true) },
      },
      {
        text: 'You stay. The pastoral system still works, still has value.',
        tag: null,
        outcome: 'The age-set ceremonies. The beadwork that records status. The specific intelligence of a life organised around animals and movement and weather. You stay inside it.',
        effect: (p) => { p.m += 4; p.r += 3; p.addFlag('nomadic_heritage'); p.setMem('maasaiCityQ', true) },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BEDOUIN
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'nom_bedouin_settlement',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      (G.character.country.name === 'Jordan' || G.character.country.name === 'Saudi Arabia') &&
      G.ethnicity === 'bedouin' &&
      G.currentYear >= 1950 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem.bedouinChildhood,
    text: 'The government has a settlement programme: tents replaced by concrete rooms, seasonal migration routes replaced by a fixed address that can be recorded in the census. The oil revenues in the Gulf or the development loans elsewhere are funding the conversion of the desert margin into towns. The patriarch resists. The young men go first. The goats and the camels go last. Your family sits between two worlds with the specific discomfort of a transition nobody asked for — the migration routes your grandfather knew are being fenced, named, sold, allocated. The world the routes ran through is becoming smaller faster than the routes can adapt.',
    choices: [
      {
        text: 'The new house is solid. You accept the trade.',
        tag: null,
        outcome: 'Concrete walls and a school within walking distance. You grow up with the features of the settled world while the tribal structure operates inside it.',
        effect: (p) => { p.e += 4; p.addFlag('bedouin_settled'); p.setMem('bedouinChildhood', true) },
      },
      {
        text: 'The family splits: some settle, some stay with the herd.',
        tag: null,
        outcome: 'The cousins in the concrete house, the cousins in the tent. You spend your childhood in the seam between these two lives.',
        effect: (p) => { p.r += 4; p.s += 3; p.addFlag('bedouin_settled'); p.setMem('bedouinChildhood', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nom_bedouin_land_claim',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.character.country.name === 'Jordan' || G.character.country.name === 'Saudi Arabia') &&
      G.flags.includes('bedouin_settled') &&
      G.age >= 20 &&
      !G.mem.bedouinLand,
    text: 'The tribe\'s customary land — the land the family has grazed across for generations, whose boundaries exist in oral knowledge and seasonal practice — has no title deed the modern state recognises. In Saudi Arabia, the land belongs to the crown. In Jordan, grazing rights are not property rights. The unwritten record of who used what and when carries weight inside the tribe and none outside it. You know what was there before the road. The road does not know you.',
    choices: null,
    effect: (p) => { p.r += 6; p.karma += 3; p.addFlag('nomadic_heritage'); p.setMem('bedouinLand', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MONGOLIAN HERDER
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'nom_mongol_ger_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Mongolia' &&
      G.ethnicity === 'mongol' &&
      G.ruralUrban === 'rural' &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem.mongolChildhood,
    text: 'The ger goes up in forty minutes if everyone knows what they are doing. Your mother knows which part of the felt goes first and your father knows the door faces south — always south, to the sun. The stove is in the centre. The right side is for women, the left for men, the north wall for the altar where your grandfather\'s photograph sits beside a small blue khadag silk scarf. You are learning that your home is also a cosmology: the ger is a model of the world, oriented to the same directions, with the sky visible through the toono smoke hole above. You move four times a year with the animals as the seasons dictate. The place you call home has different coordinates every season.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 5; p.addFlag('mongolian_herder'); p.setMem('mongolChildhood', true) },
  },

  {
    id: 'nom_mongol_dzud',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Mongolia' &&
      G.flags.includes('mongolian_herder') &&
      G.currentYear >= 1999 && G.currentYear <= 2012 &&
      G.age >= 16 &&
      !G.mem.mongolDzud,
    text: 'Dzud: the Mongolian winter catastrophe where summer drought leaves no stored grass and winter ice seals what little remains under a crust the livestock cannot break through. The 1999–2000 dzud kills 2.4 million animals — a quarter of the national herd. The 2009–10 dzud is worse: 8.5 million animals lost. Your family\'s cattle, sheep, horses — the dzud makes no distinction between what was saved over a decade and what was built over a generation. In the morning you find the animals where you left them and some of them are not moving.',
    choices: [
      {
        text: 'The losses are severe. You go to Ulaanbaatar to find work.',
        tag: null,
        outcome: 'The ger districts on the city\'s edge: circular homes on unpaved roads with no sewage connection. The city does not know what to do with you and you do not know what to do with the city, but you stay.',
        effect: (p) => { p.m -= 14; p.h -= 5; p.r += 8; p.addFlag('mongolian_dzud_survived'); p.addFlag('rural_to_urban'); p.setMem('mongolDzud', true) },
      },
      {
        text: 'You rebuild from what survives and what you can borrow from neighbours.',
        tag: null,
        outcome: 'The neighbour who loans a ewe. The calf that makes it through. The specific arithmetic of recovery: what you need to restore a viable herd, and how many good years that requires.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('mongolian_dzud_survived'); p.setMem('mongolDzud', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nom_mongol_ulaanbaatar',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mongolia' &&
      G.flags.includes('mongolian_herder') &&
      G.flags.includes('rural_to_urban') &&
      G.age >= 25 &&
      !G.mem.mongolUB,
    text: 'The Ulaanbaatar ger district in winter: the air quality index that tops every ranking in the coldest months, the coal smoke from tens of thousands of ger stoves filling a valley with nowhere for the smoke to go. You burn coal because there is no gas line to the ger district and the electricity grid cannot supply enough heat. Your neighbours are other former herder families, burning the same coal and making the same calculation. The children are growing up as city children. They speak Mongolian with the accent of children who have never seen the steppe in autumn and do not know the name for the sound a morin khuur horsehead fiddle makes when the strings are right.',
    choices: null,
    effect: (p) => { p.h -= 5; p.r += 7; p.m -= 4; p.addFlag('nomadic_heritage'); p.setMem('mongolUB', true) },
  },

]

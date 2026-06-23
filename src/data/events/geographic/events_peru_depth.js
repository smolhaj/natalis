// events_peru_depth.js
// Peru depth: the serrano arriving in Lima (Sierra-to-coast migration,
// discrimination, the barriada), the specific texture of Ayacucho during
// the Sendero years, La Oroya lead smelter, the Nikkei-Peruvian identity,
// Afro-Peruvian coastal culture, the VRAEM coca economy, the 2021
// Castillo election and its polarisation.
//
// Companion to events_peru.js (Sendero childhood, Fujimori autogolpe,
// forced sterilizations, Lima racism, vladivideos, CVR, Keiko generation).

const IS_PERU = (G) => G.character.country?.name === 'Peru'
const IS_SIERRA = (G) =>
  G.character.country?.name === 'Peru' && G.ruralUrban === 'rural'
const IS_NIKKEI = (G) =>
  G.character.country?.name === 'Peru' &&
  (G.character.ethnicity === 'nikkei' || G.character.ethnicity === 'japanese_peruvian')
const IS_AFRO_PERUVIAN = (G) =>
  G.character.country?.name === 'Peru' &&
  (G.character.ethnicity === 'afro_peruvian' || G.character.ethnicity === 'black')

export const PERU_DEPTH_EVENTS = [

  // ── THE SERRANO ARRIVING IN LIMA ──────────────────────────────────────────

  {
    id: 'per_dep_serrano_lima',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_PERU(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.perDepSerranoLima,
    text: `Lima is a city that knows you came from the sierra as soon as you open your mouth. The accent, the specific words, the way you say certain vowels. The term for someone from the highlands, *cholo*, can be an insult or a greeting depending on who says it and how. The barriada you arrive in — the invasion settlement on the desert land to the north or south of the city — is full of people who arrived the same way, speaking Quechua to each other at home and Spanish in the street. The city does not welcome you. The city absorbs you according to the rules the city has, which are not the rules of the highlands.`,
    choices: [
      {
        text: 'You learn to flatten the accent. You become someone the city accepts.',
        tag: null,
        outcome: 'The flattening is also a kind of loss. Something in the new speech is not quite yours. You negotiate this for years before you stop noticing.',
        effect: (p) => {
          p.m -= 5
          p.s += 3
          p.r += 4
          p.addFlag('per_dep_lima_migrant')
          p.setMem('perDepSerranoLima', true)
        },
      },
      {
        text: 'You keep the accent. You keep the Quechua. The city will adapt or it won\'t.',
        tag: null,
        outcome: 'The city does not fully adapt. Neither do you. You build a life in the gap between the city\'s idea of who belongs and the fact of your presence.',
        effect: (p) => {
          p.m -= 3
          p.r += 6
          p.karma += 3
          p.addFlag('per_dep_lima_migrant')
          p.setMem('perDepSerranoLima', true)
        },
      },
    ],
    effect: null,
  },

  // ── AYACUCHO DURING THE SENDERO YEARS ────────────────────────────────────

  {
    id: 'per_dep_ayacucho_sendero',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_PERU(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1995 &&
      G.ruralUrban === 'rural' &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.perDepAyacucho,
    text: `Ayacucho in the 1980s: two forces occupy the same roads, the same villages. The Shining Path arrives and holds a community meeting that is not optional. The army arrives and holds a community meeting that is also not optional. To be seen as Sendero by the army is to disappear. To be seen as a collaborator of the army by the Sendero is to be executed at the next village assembly. The people in the middle — the Quechua communities who formed neither the ideology nor the strategy — were killed by both sides in numbers the CVR would spend years counting. You grew up learning to read which presence was which at the distance of a road.`,
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 6
      p.e += 2
      p.addFlag('per_sendero_generation')
      p.setMem('perDepAyacucho', true)
    },
  },

  // ── LA OROYA: THE SMELTER ─────────────────────────────────────────────────

  {
    id: 'per_dep_la_oroya',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_PERU(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.perDepLaOroya,
    text: `The La Oroya metallurgical complex has been smelting lead, zinc, copper, and silver in the central Andes since 1922. For most of that time it was owned by a US company. In 1999 a study found that 99 percent of the children of La Oroya had blood lead levels above the WHO threshold. The company had been aware of this for years. The town exists because of the smelter. The smelter had been poisoning the town for generations. These two facts are not contradictory from the inside: the smelter provided the wages. The alternative to the wages was something the mountain offered only in small amounts.`,
    choices: [
      {
        text: 'Your father worked there. You grew up knowing what it cost and accepting that it was the cost.',
        tag: null,
        outcome: 'The blood lead tests, when they finally came, confirmed what the headaches had been suggesting. The company disputed the findings for years. Your father\'s lungs had not waited for the dispute to be resolved.',
        effect: (p) => {
          p.h -= 5
          p.r += 5
          p.addFlag('per_dep_smelter_generation')
          p.setMem('perDepLaOroya', true)
        },
      },
      {
        text: 'Your family left before the worst of it. Someone told your mother to leave.',
        tag: null,
        outcome: 'The families who stayed were the ones who had no better option. Your mother\'s decision — the specific warning she acted on — was the margin between you and the statistics.',
        effect: (p) => {
          p.e += 2
          p.karma += 3
          p.addFlag('per_dep_smelter_generation')
          p.setMem('perDepLaOroya', true)
        },
      },
    ],
    effect: null,
  },

  // ── NIKKEI PERUVIAN IDENTITY ──────────────────────────────────────────────

  {
    id: 'per_dep_nikkei',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_NIKKEI(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 12 && G.age <= 22 &&
      !G.mem?.perDepNikkei,
    text: `Your grandparents came from Japan between 1899 and 1941. In Peru they became *Nikkei* — Japanese by descent, Peruvian by birth and culture, speaking Spanish and sometimes Japanese, cooking lomo saltado alongside sushi. In 1940 anti-Japanese riots destroyed the businesses of the community in Lima. In the Pacific War years, some Nikkei were interned, or deported to the United States as enemy aliens at Peru's request, or simply watched. Alberto Fujimori was elected president in 1990 — a Nikkei, son of immigrants — which was either a sign of integration or an anomaly depending on who was saying it. You are neither fully Japanese nor not Japanese. The category is specific to Peru and is yours.`,
    choices: [
      {
        text: 'The Nikkei community is your world. The Japanese-Peruvian associations, the kenjinkai, the specific food.',
        tag: null,
        outcome: 'The community is small enough that everyone knows everyone across two generations. This is a specific intimacy that feels like home and like a boundary simultaneously.',
        effect: (p) => {
          p.s += 3
          p.m += 3
          p.addFlag('per_dep_nikkei_identity')
          p.setMem('perDepNikkei', true)
        },
      },
      {
        text: 'You are Peruvian. The Nikkei identity is a heritage, not a community you primarily inhabit.',
        tag: null,
        outcome: 'Peru claims you fully. The Japanese side is the grandmother\'s dishes and the specific shape of the face that Peru sees as foreign. You move between these without making it a question.',
        effect: (p) => {
          p.m += 2
          p.addFlag('per_dep_nikkei_identity')
          p.setMem('perDepNikkei', true)
        },
      },
    ],
    effect: null,
  },

  // ── AFRO-PERUVIAN COASTAL CULTURE ────────────────────────────────────────

  {
    id: 'per_dep_afro_peruvian',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_AFRO_PERUVIAN(G) &&
      G.currentYear >= 1960 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.perDepAfro,
    text: `The Afro-Peruvian communities of the southern coast — Chincha, Cañete, El Carmen — are the descendants of enslaved people brought to work the coastal haciendas, the vineyards, the sugar plantations. The music is *festejo* and *landó*, the rhythms that Nicomedes Santa Cruz collected and restored in the 1950s and 60s when they were nearly lost. The cajon — the box drum — was invented here, by enslaved people who were forbidden drums and used what was available. Peru's official racial hierarchy placed Afro-Peruvians at the bottom, below the indigenous and the mestizo. The coastal communities existed within this hierarchy and also outside it, in the specific culture of the southern coast that knew what it was without needing the hierarchy's permission.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m += 2
      p.addFlag('per_dep_afro_coast')
      p.setMem('perDepAfro', true)
    },
  },

  // ── THE VRAEM COCA ECONOMY ────────────────────────────────────────────────

  {
    id: 'per_dep_vraem_coca',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_PERU(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.perDepVraem,
    text: `The VRAEM — *Valle de los Ríos Apurímac, Ene y Mantaro* — is the highest coca-producing valley in the world. The valley floor is impossible to reach by road from most of Peru. The Sendero Luminoso remnants control certain routes. The FARC occasionally crosses from Colombia to compare operations. The helicopter comes sometimes with eradication teams and goes. The coca grows back. The alternative crops — cacao, coffee — have buyers in theory and in practice require a road and a cold chain and a state presence that the valley does not have. The coca buyer comes to you. The logic of the valley is the logic of access.`,
    choices: [
      {
        text: 'You grow coca. The calculation does not offer another crop that makes sense.',
        tag: null,
        outcome: 'The helicopter eradication comes twice and you replant twice. The third year is a good price year. The money does something specific that the alternative couldn\'t have done.',
        effect: (p) => {
          p.mo += 600
          p.r += 4
          p.h -= 2
          p.addFlag('per_dep_coca_vraem')
          p.setMem('perDepVraem', true)
        },
      },
      {
        text: 'You take the government alternative development program. Cacao and a subsidy.',
        tag: null,
        outcome: 'The subsidy arrives in installments across eighteen months. The cacao buyer is real and the price is a fraction of coca. The eradication teams do not come for your plot. The calculation is closer than the program brochure suggested.',
        effect: (p) => {
          p.mo += 150
          p.karma += 4
          p.addFlag('per_dep_coca_vraem')
          p.setMem('perDepVraem', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE 2021 CASTILLO ELECTION ────────────────────────────────────────────

  {
    id: 'per_dep_castillo_2021',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_PERU(G) &&
      G.currentYear >= 2021 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      !G.mem?.perDepCastillo,
    text: `Pedro Castillo wins the 2021 presidential election by less than forty-four thousand votes out of eighteen million cast. He is a rural teacher and union leader from Cajamarca, the first president in Peru's two-hundred-year history from the sierra campesino class. The Lima establishment treats his election as a catastrophe. The Peruvians who are not the Lima establishment treat it as the first time anyone like them has reached the presidency. His government collapses in eighteen months under corruption charges and constitutional crises of his own making. He is removed by Congress and arrested. Dina Boluarte, his former vice-president, takes over and orders the police to fire on protesters in the south. Sixty people are killed. The specific question of who Peru is for — the coast or the sierra, Lima or the rest — did not begin with Castillo and does not end with him.`,
    choices: [
      {
        text: 'His election was real. That the establishment destroyed it does not make it not real.',
        tag: null,
        outcome: 'The sixty dead in the south are from the departments that voted for him by the highest margins. The relationship between this fact and the official response is not subtle.',
        effect: (p) => {
          p.m -= 8
          p.r += 6
          p.addFlag('per_dep_castillo_generation')
          p.setMem('perDepCastillo', true)
        },
      },
      {
        text: 'His government was corrupt and incompetent. The result was the result.',
        tag: null,
        outcome: 'The corruption charges are real. The question of whether they were applied symmetrically — whether a Lima president would have faced the same constitutional scrutiny — is the question you are left holding.',
        effect: (p) => {
          p.r += 4
          p.m -= 4
          p.addFlag('per_dep_castillo_generation')
          p.setMem('perDepCastillo', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: SIERRA ORIGIN IN OLD AGE ──────────────────────────────

  {
    id: 'per_dep_sierra_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_PERU(G) &&
      G.flags.has('per_dep_lima_migrant') &&
      G.age >= 60 &&
      !G.mem?.perDepSierraLate,
    text: `You have lived in Lima longer than you lived in the place you came from. The city is yours now in the way a city becomes yours — not by being given to you but by years of navigating it. The Quechua you speak to yourself, or to your mother when she was alive, is the part of you that Lima did not absorb. You have grandchildren who were born here and who think of themselves as limeños without complication. The migration that brought you here is the fact of their ordinary world. They do not know what the journey cost at the other end.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.m += 3
      p.setMem('perDepSierraLate', true)
    },
  },

  // ── FOLLOW-THROUGH: SMELTER GENERATION HEALTH ─────────────────────────────

  {
    id: 'per_dep_smelter_health_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_PERU(G) &&
      G.flags.has('per_dep_smelter_generation') &&
      G.age >= 50 &&
      !G.mem?.perDepSmelterEcho,
    text: `The lead exposure of a childhood in a smelter town is not an event with a specific date. It is a long-term alteration to the blood, the nervous system, the kidneys, that runs in the background for decades. The 2007 lawsuit against Doe Run — the Missouri company that acquired the La Oroya complex — was settled out of court. The company entered bankruptcy. The smelter closed in 2009. The children who grew up there are adults now, carrying in their bodies the industrial history of a valley that someone else profited from.`,
    choices: null,
    effect: (p) => {
      p.h -= 4
      p.r += 3
      p.setMem('perDepSmelterEcho', true)
    },
  },

]

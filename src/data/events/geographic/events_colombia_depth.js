// events_colombia_depth.js
// Colombia depth: the false positives scandal (falsos positivos), Medellín's
// transformation from most dangerous city to most innovative, the coca farmer's
// economic reality in Putumayo, Afro-Colombian Pacific coast displacement in the
// Chocó, the desplazado arriving in the city periphery, JEP testimony, and the
// coffee price as the texture of a cafetero family's year.
//
// Companion to events_colombia.js (which covers: El Bogotazo, La Violencia,
// FARC era, Medellín cartel, paramilitaries, estratificación, 2016 peace accord,
// 2021 Paro Nacional).

const IS_COLOMBIA = (G) => G.character.country?.name === 'Colombia'
const IS_AFROCOLOMBIANO = (G) =>
  G.character.country?.name === 'Colombia' &&
  (G.character.ethnicity === 'afrocolombian' || G.character.ethnicity === 'palenquero')

export const COLOMBIA_DEPTH_EVENTS = [

  // ── FALSOS POSITIVOS ──────────────────────────────────────────────────────

  {
    id: 'col_dep_false_positives',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.currentYear >= 2008 && G.currentYear <= 2015 &&
      G.age >= 20 &&
      !G.mem?.colDepFalsosPositivos,
    text: `The term is *falsos positivos* — false positives. Between 2002 and 2008, units of the Colombian army killed civilians, dressed their bodies in guerrilla clothing, and reported them to superiors as combat kills. The incentive was institutional: promotions, vacation time, bonuses for body counts. The victims were young men from poor urban neighbourhoods, tricked or lured to rural areas. The Colombian Attorney General estimates 10,000 people were killed this way. The number is a category: young, poor, invisible enough that the lie held for years. The scandal breaks in 2008 when the disappearances of twenty-two young men from Soacha, a municipality on Bogotá's southern edge, are tracked to military units in Norte de Santander.`,
    choices: [
      {
        text: 'Someone you knew is in the category. You recognized the pattern when the news broke.',
        tag: null,
        outcome: 'The body count that was a statistic of state success was, in some cases, a person you knew. This knowledge makes the institutional explanation impossible.',
        effect: (p) => {
          p.m -= 12
          p.r += 8
          p.addFlag('col_falsos_positivos_generation')
          p.setMem('colDepFalsosPositivos', true)
        },
      },
      {
        text: 'The news reached you as a scandal — terrible, but at a distance.',
        tag: null,
        outcome: 'At a distance the scandal is the question of institutional accountability. For the families of the twenty-two from Soacha, the distance was never available.',
        effect: (p) => {
          p.m -= 5
          p.r += 5
          p.addFlag('col_falsos_positivos_generation')
          p.setMem('colDepFalsosPositivos', true)
        },
      },
    ],
    effect: null,
  },

  // ── MEDELLÍN TRANSFORMATION ───────────────────────────────────────────────

  {
    id: 'col_dep_medellin_transforms',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.currentYear >= 2007 && G.currentYear <= 2018 &&
      G.age >= 18 &&
      !G.mem?.colDepMedTransform,
    text: `In 2003 Medellín had the highest murder rate in the world. In 2013 it won the Urban Land Institute's "Most Innovative City" award. The transformation is real and debated. The cable cars to the comunas where the sicarios came from. The escalators in Barrio Moravia — a neighbourhood built on a garbage dump — connecting the hillside to the city. The libraries. The cultural investment in the places the city had previously treated as disposable. The murder rate has fallen by 95 percent. Critics note: the fall was partly the paramilitaries taking over from the cartels, enforcing a violent order that the statistics counted as peace. Both things are true. The city rebuilt itself and also made arrangements.`,
    choices: [
      {
        text: 'The transformation is real. You live in it and you know what Medellín was.',
        tag: null,
        outcome: 'The cable car takes twelve minutes to the hillside where it used to take a specific courage to go after dark. The change is not rhetorical. It has the texture of actual changed conditions.',
        effect: (p) => {
          p.m += 6
          p.e += 2
          p.addFlag('col_medellin_transformation')
          p.setMem('colDepMedTransform', true)
        },
      },
      {
        text: 'The "innovation" story erases who made the arrangements for the murder rate to fall.',
        tag: null,
        outcome: 'The AUC took the communes from the small cartels in the mid-2000s. The murder rate fell. The violence became less visible and more systematic. The international press arrived for the cable cars.',
        effect: (p) => {
          p.m -= 3
          p.r += 5
          p.addFlag('col_medellin_transformation')
          p.setMem('colDepMedTransform', true)
        },
      },
    ],
    effect: null,
  },

  // ── COCA FARMER ───────────────────────────────────────────────────────────

  {
    id: 'col_dep_coca_farmer',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1990 && G.currentYear <= 2016 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.colDepCocaFarmer,
    text: `The choice is not between growing coca and not growing coca. The choice is between growing coca and having no income. In Putumayo, in Catatumbo, in the mountain valleys where the road is unpaved and the state is a rumour, coca is the crop that can be carried to market on mule-back — unlike yuca or corn, which rot before they reach a buyer. The buyers come to you. They weigh the harvest on scales that you do not own. The FARC taxes what you grow. The paramilitaries tax what you grow. The army comes with herbicide planes and fumigates the coca and also the food crops and also the river water. The programs for voluntary substitution offer you another crop and a government check that arrives six months late if it arrives.`,
    choices: [
      {
        text: 'You grow it. There is no other calculation that works.',
        tag: null,
        outcome: 'The coca economy has its own logic and you are inside it. The fumigation planes arrive and you replant. The buyer\'s scales are consistently wrong in one direction. You keep precise records of what you are owed.',
        effect: (p) => {
          p.mo += 800
          p.r += 5
          p.h -= 3
          p.addFlag('col_coca_generation')
          p.setMem('colDepCocaFarmer', true)
        },
      },
      {
        text: 'You take the substitution program. The government check and the new crop.',
        tag: null,
        outcome: 'The check arrives late. The new crop — cacao, plantain — has a buyer but the price is a third of what coca paid. The logic of the decision remains the logic of the decision. You manage.',
        effect: (p) => {
          p.mo += 200
          p.r += 6
          p.addFlag('col_coca_generation')
          p.setMem('colDepCocaFarmer', true)
        },
      },
    ],
    effect: null,
  },

  // ── AFRO-COLOMBIAN PACIFIC COAST ──────────────────────────────────────────

  {
    id: 'col_dep_choco_life',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_AFROCOLOMBIANO(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.colDepChocoLife,
    text: `The Chocó is the wettest department in the world — four thousand millimetres of rain per year, rivers that flood without warning, jungle that grows back over anything left for a season. Your family has been here for generations, descendants of people who were brought as enslaved labour by the Spanish and who, when freedom came, moved to the places the Spanish did not want — the rivers, the swamp forests, the Pacific coast. The Chocó is also 97 percent Afro-Colombian and 70 percent below the poverty line. The richest biodiversity in Colombia and the least infrastructure. Gold and platinum in the river sediment, extracted for centuries, and the communities at the river with the worst health indicators in the country. You understand the relationship between extraction and poverty from the inside.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m -= 4
      p.addFlag('col_afrocolombiano_choco')
      p.setMem('colDepChocoLife', true)
    },
  },

  {
    id: 'col_dep_choco_displaced',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_AFROCOLOMBIANO(G) &&
      IS_COLOMBIA(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 16 &&
      !G.mem?.colDepChocoDisplaced,
    text: `Buenaventura is the largest port city in Colombia, the entry point for a third of all Colombia's imports. Buenaventura is also Afro-Colombian, and the parts of Buenaventura that are not port infrastructure are among the most violent places in the hemisphere. The bajas — the tidal flats — are the barrios the port cannot see. Paramilitaries and dissidents fight for control of the corridors. The displacement from Buenaventura and the Chocó is the largest displacement in Colombia after the rural FARC territories. You are Black, from the Pacific, and the Colombia that appears in the newspapers is not the Colombia that is happening to you.`,
    choices: [
      {
        text: 'You move to Cali or Medellín. The Pacific has become unlivable.',
        tag: null,
        outcome: 'In Cali you are in the neighbourhood that is already Afro-Colombian, the one that arrived from the Pacific in previous decades. You are the latest. The neighbourhood has a name and a memory and it absorbs you.',
        effect: (p) => {
          p.m -= 10
          p.addFlag('col_afrocolombiano_choco')
          p.addFlag('col_desplazado')
          p.addFlag('displaced')
          p.setMem('colDepChocoDisplaced', true)
        },
      },
      {
        text: 'You stay. Your community has been on this coast for three hundred years.',
        tag: null,
        outcome: 'The Afro-Colombian communities of the Pacific have collective territorial rights under Law 70 of 1993. The rights are real. The enforcement of the rights against armed groups is the question that Law 70 did not answer.',
        effect: (p) => {
          p.r += 6
          p.addFlag('col_afrocolombiano_choco')
          p.setMem('colDepChocoDisplaced', true)
        },
      },
    ],
    effect: null,
  },

  // ── DESPLAZADO IN THE CITY ────────────────────────────────────────────────

  {
    id: 'col_dep_desplazado_city',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.flags.has('col_desplazado') &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1980 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.colDepDesplazadoCity,
    text: `You arrived in the city with nothing that the city recognises as the beginning of a life. The title to the land you left is in a house you cannot return to. The relationship networks — the neighbour who lends the seed, the cousin with the truck, the credit at the village store — do not exist here. The city's informal settlement at its edge — the ladera in Medellín, the falda del cerro in Bogotá — is where the other families who arrived the same way are. You build in the same way they built: the first wall from whatever material is available, the second wall when there is more money, the roof that does not quite reach the edge for the first two winters. The city does not ask where you came from. The city also does not help with where you are.`,
    choices: [
      {
        text: 'You build and stay. The city becomes yours through the specific work of staying in it.',
        tag: null,
        outcome: 'Ten years in, the neighbourhood has water and electricity and a paved street because the community organised for it. The house has three rooms. You know everyone for six blocks.',
        effect: (p) => {
          p.m += 4
          p.s += 3
          p.karma += 4
          p.addFlag('col_urban_settler')
          p.setMem('colDepDesplazadoCity', true)
        },
      },
      {
        text: 'You keep the intention of returning. You do not want the city to become home.',
        tag: null,
        outcome: 'The intention of return is real and it is also a way of not building what you need here. Ten years pass. The valley you left is still not safe. The intention stays. The city stays.',
        effect: (p) => {
          p.r += 8
          p.m -= 4
          p.setMem('colDepDesplazadoCity', true)
        },
      },
    ],
    effect: null,
  },

  // ── COFFEE ECONOMY ────────────────────────────────────────────────────────

  {
    id: 'col_dep_cafetero',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.colDepCafetero,
    text: `The year is measured by the coffee harvest. October and November are the months your whole family picks — mornings in the rows with the basket tied at the waist, the specific soreness of reaching upward for hours, the smell of wet coffee cherries that you will always associate with October. The price your father gets for the quintal of dried beans is set in New York by a market he has no access to and no influence over. A good year means the loan for the school uniform is paid before January. A bad year means the debt extends and the uniform comes in February. The farm is two hectares of coffee and one hectare of food crops and it is the entire economic universe of your childhood.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.addFlag('col_cafetero_generation')
      p.setMem('colDepCafetero', true)
    },
  },

  // ── JEP TESTIMONY ─────────────────────────────────────────────────────────

  {
    id: 'col_dep_jep',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.currentYear >= 2018 &&
      G.age >= 40 &&
      (G.flags.has('col_violencia_generation') || G.flags.has('col_farc_era') || G.flags.has('col_paramilitary_era') || G.flags.has('col_falsos_positivos_generation')) &&
      !G.mem?.colDepJep,
    text: `The Jurisdicción Especial para la Paz — the Special Jurisdiction for Peace — invites testimony. The mechanism: if the perpetrator tells the truth, the sentence is restriction of movement rather than prison. If they lie, they face the full sentence. The assumption is that truth is worth something on its own — that knowing what happened is a form of justice even when it does not look like punishment. You have lived through things that the JEP is now trying to understand. Whether you testify or not, you have information the tribunal needs. You sit with the question of what telling it would do.`,
    choices: [
      {
        text: 'You testify. The truth on record matters even if the sentence does not.',
        tag: null,
        outcome: 'The testimony is recorded. The facts enter the official account. What it did to give testimony — the specific cost and the specific relief of it — is yours to hold.',
        effect: (p) => {
          p.karma += 6
          p.r += 4
          p.m += 3
          p.addFlag('col_jep_witness')
          p.setMem('colDepJep', true)
        },
      },
      {
        text: 'You do not testify. The process does not offer you what you need from it.',
        tag: null,
        outcome: 'The tribunal continues without your account. This is your right. What you know, you carry. The weight of it is unwitnessed by the official record.',
        effect: (p) => {
          p.r += 6
          p.setMem('colDepJep', true)
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: COCA FARMER AFTER ACCORD ─────────────────────────────

  {
    id: 'col_dep_coca_accord_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.flags.has('col_coca_generation') &&
      G.currentYear >= 2017 &&
      G.age >= 30 &&
      !G.mem?.colDepCocaAccordEcho,
    text: `Point 4 of the Santos accord: crop substitution and rural reform. The FARC territory is now being contested by FARC dissidents, the ELN, and paramilitary successor groups — each with their own taxes, each with their own rules about who grows what. The voluntary substitution program enrolled more families than the government could pay. The fumigation resumes under the next government. The international price of coca paste remains higher than the price of cacao. The logic of the mountain has not changed.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.setMem('colDepCocaAccordEcho', true)
    },
  },

  // ── FOLLOW-THROUGH: FALSE POSITIVES ACCOUNTABILITY ────────────────────────

  {
    id: 'col_dep_falsos_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      IS_COLOMBIA(G) &&
      G.flags.has('col_falsos_positivos_generation') &&
      G.currentYear >= 2018 &&
      G.age >= 45 &&
      !G.mem?.colDepFalsosEcho,
    text: `The JEP has been hearing falsos positivos cases. The generals who gave the body count incentives are testifying. Some have acknowledged the crimes. The acknowledgment, in the JEP framework, is itself significant — the official account now includes the fact that the state killed civilians and dressed them as enemies. Whether the formal truth translates into anything resembling justice for the families of the twenty-two from Soacha, and the ten thousand behind them, is the question the process has not yet answered.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.setMem('colDepFalsosEcho', true)
    },
  },

]

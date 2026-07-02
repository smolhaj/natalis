// Ivory Coast depth arc events
// Covers: cocoa child labor, Nouchi youth culture, Yamoussoukro Basilica,
// Dozo hunters militia, CFA franc dependency, Ouattara reconstruction era,
// Abidjan lagoon life, Operation Licorne French troops

const IS_IVORIAN = (G) => G.character.country?.name === 'Ivory Coast'

export const IVORY_COAST_DEPTH_EVENTS = [

  {
    id: 'ci_dep_cocoa_child',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2005 &&
      G.age >= 8 && G.age <= 14 &&
      !G.flags.has('ci_cocoa_child_labor'),
    text: 'The school year ends in June and in July the fields need clearing. Your father does not phrase it as a choice. The machete is heavier than you expected. The pods hang at a height that requires you to stretch. You work beside the adults — some of them boys from Burkina Faso who crossed the border to work, who have no families within two hundred kilometers, who sleep in the farm shed. They are children and they are also workers. You are also a child and also a worker. The distinction between what you are supposed to be at your age and what you are in July does not get discussed. The distinction exists. You feel it in the difference between July and September, when the school uniform comes back out.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.e += 2; p.addFlag('ci_cocoa_child_labor') },
  },

  {
    id: 'ci_dep_nouchi',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1980 &&
      G.age >= 12 && G.age <= 18 &&
      !G.flags.has('ci_nouchi_generation'),
    text: 'The language that belongs to your age group is not French. It is Nouchi — the street argot of Abidjan that mixes French, Dioula, Bété, Guéré, with sounds borrowed from everywhere the city has gathered people. Nouchi is what you speak in the quartier, at the maquis, on the football pitch. Your teachers do not speak it. Your parents speak it imperfectly and with expressions from a version that was already out of date. The slang is yours and of your time. Zouglou music runs underneath it — the music that young people invented to talk about corruption and unemployment in a way that was too specific to be banned and too coded to be understood by the people it was talking about.',
    choices: null,
    effect: (p) => { p.m += 4; p.s += 3; p.addFlag('ci_nouchi_generation') },
  },

  {
    id: 'ci_dep_basilica',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1990 &&
      G.age >= 15 && G.age <= 35 &&
      !G.flags.has('ci_yamoussoukro_basilica'),
    text: 'The Basilica of Our Lady of Peace in Yamoussoukro is the largest church in the world — larger than St. Peter\'s in Rome. Houphouët-Boigny built it in his home village at a cost estimated between three hundred million and six hundred million dollars, in a country where one in three people is Muslim and the village it stands in has forty thousand inhabitants. The Pope consecrated it in 1990 on the condition that an attached hospital be built. The hospital was built. The basilica seats seven thousand and can accommodate more. On any given Sunday the pews are largely empty. The air conditioning keeps running. The peacocks wander the esplanade. The scale of the thing is its own commentary, though the commentary was never official.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.addFlag('ci_yamoussoukro_basilica') },
  },

  {
    id: 'ci_dep_dozo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2011 &&
      G.age >= 20 &&
      !G.flags.has('ci_dozo_witness'),
    text: 'The Dozos arrived in the village in their hunters\' dress — the talisman-covered tunics, the traditional amulets believed to make them bulletproof. They were a traditional hunters\' society from the Manding-speaking north, and during the civil war the Dozos became a security force in areas where the state\'s security forces were absent or had switched sides. They operated checkpoints. They investigated accusations of sorcery. They identified rebels. The village appreciated them and was also afraid of them in a specific way — the kind of fear that comes from a force that has authority without accountability, that operates in the zone between tradition and the immediate present.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('ci_dozo_witness') },
  },

  {
    id: 'ci_dep_cfa',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.age >= 20 && G.age <= 35 &&
      (G.career?.field === 'finance' || G.career?.field === 'government' || G.stats?.smarts >= 60) &&
      !G.flags.has('ci_cfa_awareness'),
    text: 'The CFA franc is guaranteed by France. The exchange rate is fixed. Fifty percent of foreign exchange reserves are held at the Banque de France. Interest rates are set in Frankfurt by the European Central Bank. The arrangement was negotiated at independence in 1960 and modified but not fundamentally changed since. You encounter this system the first time you try to understand why monetary policy here is different from monetary policy in Ghana or Nigeria, which also border you but manage their own currencies. The stability the CFA provides is real. The degree to which the stability is managed elsewhere is also real. Both things are taught separately. You learn to hold them together.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 2; p.addFlag('ci_cfa_awareness') },
  },

  {
    id: 'ci_dep_ouattara_era',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 2012 &&
      G.age >= 25 &&
      !G.flags.has('ci_ouattara_era_witness'),
    text: (G) => {
      const yr = G.currentYear
      const peaceYears = yr - 2011
      return `Abidjan is building again. The cranes on the Plateau. The new bridge over the lagoon. ${peaceYears >= 5 ? 'Eight years of seven-percent growth.' : 'The economy growing faster than it has in twenty years.'} Ouattara\'s government prosecuted some of Gbagbo\'s supporters for war crimes. Gbagbo was sent to the ICC in The Hague. He was acquitted in 2019. Most of those who committed atrocities on Ouattara\'s side were not prosecuted. The commission for dialogue, truth, and reconciliation produced a report. The report exists. The three thousand people killed in 2010 and 2011 did not reduce in number when the commission produced its report. You live in a country that is growing and in which the accounting for what happened is incomplete, which is a condition you have learned to hold without it collapsing.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.addFlag('ci_ouattara_era_witness') },
  },

  {
    id: 'ci_dep_lagoon',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.age >= 16 && G.age <= 30 &&
      !G.flags.has('ci_abidjan_lagoon_generation'),
    text: 'The Ébrié Lagoon divides Abidjan from itself. The wooden ferries — pinasses — cross between Treichville and the Plateau for less than the bridge costs. The fishermen who work the lagoon go out before dawn in pirogues. Their catch — tilapia, capitaine, crayfish — arrives at the market at Koumassi at five in the morning. You know the people who work the water the way urban people know a system that is visible from every bridge but is not the city\'s main story. The lagoon has been here longer than Abidjan. The lagoon will be here after. The city built itself around it without quite knowing what to do with it.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.addFlag('ci_abidjan_lagoon_generation') },
  },

  {
    id: 'ci_dep_licorne',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 2002 && G.currentYear <= 2011 &&
      G.ruralUrban === 'urban' &&
      G.age >= 20 &&
      !G.flags.has('ci_licorne_era'),
    text: (G) => {
      const yr = G.currentYear
      const moment = yr <= 2004
        ? 'In November 2004 French jets destroyed the Ivorian air force on the ground after a Gbagbo offensive hit a French base. French soldiers then opened fire on protesters who marched on their base in Abidjan, killing at least twenty people. The French call it the Ivory Coast crisis. You were on the street when the soldiers were also on the street and the term for what you were in that moment was civilian.'
        : 'The French soldiers have been here since 2002. Operation Licorne. You see their trucks in the city. You see the boundary between the zone of confidence — the line dividing the country — on the news. France is keeping the country from completely breaking apart or is keeping a side from losing, depending on which side you are on.'
      return moment
    },
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 5; p.addFlag('ci_licorne_era') },
  },

]

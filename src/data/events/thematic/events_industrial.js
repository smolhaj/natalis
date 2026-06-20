// events_industrial.js
// BUILD 21 — Industrial disasters as biography
// Chernobyl personal arc (liquidators, dosimeter confiscation, the silence)
// Bhopal settlement follow-through
// Pollution as class (river, factory fumes, Niger Delta)
//
// Design principle: these are not distant historical events — they are the water
// you grew up beside, the smell you stopped noticing, the health the state decided
// wasn't worth accounting for. Every event is told from inside a body.

export const INDUSTRIAL_EVENTS = [

  // ── CHERNOBYL LIQUIDATOR ARC ─────────────────────────────────────────────────
  //
  // The 600,000 liquidators sent to contain Chernobyl were told their doses were
  // safe. Many dosimeters were confiscated before they could register dangerous
  // levels. The Soviet and later Ukrainian/Russian governments systematically
  // underreported health consequences. Recognition took decades.

  {
    id: 'ind_chernobyl_liquidator_called',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Ukraine', 'Russia'].includes(G.character.country?.name) &&
      G.flags.has('chernobyl_generation') &&
      G.age >= 18 && G.age <= 48 &&
      G.currentYear >= 1986 && G.currentYear <= 1989 &&
      !G.flags.has('chernobyl_liquidator') &&
      !G.mem?.cherLiqCalled,
    text: (G) => {
      if (G.career?.field === 'military' || G.career?.field === 'government')
        return 'The orders come through the usual channel. Chernobyl. Cleanup operations. You are told the acute phase is over, the risk is manageable, the work is necessary. You have been in the military long enough to know what manageable means when said by someone who will not be there. You are given a lead apron and a dosimeter.'
      return 'The summons comes from the district office. Volunteer workers needed for liquidation operations near Chernobyl. The pay is triple the normal rate — more than a month\'s salary in three weeks. The official says the worst is finished. He reads this from a sheet. He does not look up. You notice he is not volunteering himself.'
    },
    choices: [
      {
        text: 'Go',
        tag: null,
        outcome: 'You join the hundreds of thousands. The dosimeter is read on arrival and taken away before it can register what the body already knows. Three weeks of shovelling contaminated soil that no shovel will ever make clean.',
        effect: (p) => { p.addFlag('chernobyl_liquidator'); p.mo += 3000; p.h -= 8; p.setMem('cherLiqCalled', true) },
        inject: null,
      },
      {
        text: 'Find a way out of it',
        tag: null,
        outcome: 'Others go instead. You hear about Chernobyl the way you hear about things that were supposed to be you.',
        effect: (p) => { p.r += 8; p.m -= 5; p.setMem('cherLiqCalled', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ind_chernobyl_health_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('chernobyl_liquidator') &&
      G.currentYear >= 1992 && G.currentYear <= 2005 &&
      !G.mem?.cherHealthCost,
    text: 'The dose register in your file says the exposure was within acceptable parameters. It says this because the dosimeters were confiscated before they could read unacceptable parameters. Your body has been keeping its own account. The fatigue that does not lift. The thyroid the doctor mentions carefully. When you say you were at Chernobyl she makes a note and does not seem surprised. She has made this note before.',
    choices: null,
    effect: (p) => { p.h -= 15; p.addCondition('radiation_exposure', 'moderate'); p.setMem('cherHealthCost', true) },
  },

  {
    id: 'ind_chernobyl_silence',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('chernobyl_liquidator') &&
      G.currentYear >= 1990 && G.currentYear <= 2006 &&
      G.mem?.cherHealthCost &&
      !G.mem?.cherSilence,
    text: 'The liquidators\' association meets in a building that used to be a union hall. No officials attend. The state\'s position is that the health consequences are psychosomatic — the product of anxiety, not radiation. A man at the table has a dosimetry file that reads one thing and a medical file that contradicts it. He has shown both to lawyers. The lawyers explain what governments can afford to officially acknowledge. He folds the files back into his bag and buys a round.',
    choices: [
      {
        text: 'Join the association — push for recognition',
        tag: null,
        outcome: 'Your name goes onto a list that is sent somewhere. A partial medical acknowledgment comes eventually. It takes longer than you have left.',
        effect: (p) => { p.addFlag('chernobyl_advocate'); p.karma += 8; p.m += 5; p.setMem('cherSilence', true) },
        inject: null,
      },
      {
        text: 'Let it go — the fight costs more than it gives back',
        tag: null,
        outcome: 'You fold your file into the same drawer as everything else the state decided not to see. You carry it without showing it.',
        effect: (p) => { p.r += 10; p.m -= 5; p.setMem('cherSilence', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── BHOPAL FOLLOW-THROUGH ─────────────────────────────────────────────────────
  //
  // The Indian government settled with Union Carbide in 1989 for $470 million —
  // approximately $550 per affected person. The contaminated site was never cleaned.
  // Warren Anderson, Union Carbide's CEO, was declared a fugitive; the US refused
  // extradition. He died in 2014 having faced no trial.

  {
    id: 'ind_bhopal_settlement',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'India' &&
      G.flags.has('industrial_disaster_era') &&
      G.currentYear >= 1989 && G.currentYear <= 1997 &&
      !G.mem?.bhopalSettlement,
    text: (G) => {
      const place = G.place?.name || ''
      if (place === 'Bhopal' || G.mem?.bhopalLocalSurvivor)
        return 'The settlement cheque arrives. Union Carbide paid the government of India 470 million dollars in 1989. By the time it moves through the process and reaches your hands, your share is 550 dollars. This is the figure the courts arrived at for your lungs, for the years of breathing what the night of December 3rd left in the air, for the family you buried. They have calculated you.'
      return 'The Bhopal settlement is being distributed. 470 million dollars from Union Carbide, the Indian government acting as administrator, divided among 500,000 people. The arithmetic arrives in the newspapers before the cheques do. Per person: approximately 550 dollars.'
    },
    choices: [
      {
        text: 'Accept the payment',
        tag: null,
        outcome: 'The money is real. The number stays with you longer than the money does.',
        effect: (p) => { p.mo += 550; p.m -= 6; p.setMem('bhopalSettlement', true) },
        inject: null,
      },
      {
        text: 'Refuse it — this sum is an insult',
        tag: null,
        outcome: 'You don\'t take the 550 dollars. The groundwater is still contaminated either way.',
        effect: (p) => { p.addFlag('bhopal_refused_settlement'); p.karma += 5; p.m -= 3; p.setMem('bhopalSettlement', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── POLLUTION AS CLASS ────────────────────────────────────────────────────────
  //
  // The communities that absorb industrial pollution are not the communities that
  // make decisions about industrial policy. This is not an accident.

  {
    id: 'ind_river_wrong_colour',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country?.archetype) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.riverWrongColour,
    text: (G) => {
      const c = G.character.country?.name || ''
      if (c === 'Nigeria')
        return 'The creek runs orange-brown below the oil facility. It has run this way for as long as you can remember. An engineer from the company came once, took water in a small bottle, and left. The fish have been gone for three years. Your mother tells you not to swim there. You stopped swimming there years ago.'
      if (['DRC', 'Zambia', 'South Africa'].includes(c))
        return 'The river below the mine runs rust-red in the morning. On some days, where the tailings meet the current, it turns green. You haven\'t eaten fish from it since you were small. The mining company\'s sign at the fence says the water meets all safety standards. The sign was put up by the same company that owns the tailings pond.'
      return 'The river that runs past the factory has not been right for as long as anyone remembers. The colour changes depending on what they are processing. The company says the discharge is within permitted levels. No one in the village was consulted when the permits were issued.'
    },
    choices: null,
    effect: (p) => { p.h -= 5; p.addFlag('grew_up_polluted'); p.setMem('riverWrongColour', true) },
  },

  {
    id: 'ind_factory_fumes',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['post_soviet', 'developing_urban'].includes(G.character.country?.archetype) &&
      (G.currentNeighborhoodTier === 'working_class' || G.currentNeighborhoodTier === 'informal' || G.currentNeighborhoodTier == null) &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 6 && G.age <= 14 &&
      !G.flags.has('grew_up_polluted') &&
      !G.mem?.factoryFumes,
    text: (G) => {
      if (G.character.country?.archetype === 'post_soviet')
        return 'The plant has been here longer than your parents have been alive. The smell is so familiar that visitors mention it and you don\'t hear them. On certain nights when the wind comes from the east it settles into the house and your mother closes all the windows without explaining why. You learn which wind direction means bad air before you learn to read a clock.'
      return 'You grow up with the factory\'s shift siren more than the school bell. The air on the east side of the yard, nearest the wall, is different from the west side. Everyone knows this. No one discusses it. It is simply the way the air is here, on this side of the city, in this kind of neighbourhood.'
    },
    choices: null,
    effect: (p) => { p.addFlag('industrial_upbringing'); p.h -= 3; p.setMem('factoryFumes', true) },
  },

  {
    id: 'ind_pollution_body_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('grew_up_polluted') || G.flags.has('industrial_upbringing')) &&
      G.age >= 33 && G.age <= 55 &&
      !G.mem?.pollBodyMidlife,
    text: (G) => {
      if (G.flags.has('grew_up_polluted'))
        return 'The doctor takes your history. You describe the river — the colour, the years, the fish that left first. She makes a note without showing surprise. Later you read your chart in the waiting room. It says "environmental exposure, childhood." A section that was blank before is not blank anymore.'
      return 'The specialist asks about occupational exposure and childhood environment. You describe the factory district — the smell you stopped noticing, the years of it, the direction the wind blew on bad days. He nods in the careful way that means he has heard this before and is deciding how much to say. He asks if you have siblings with similar symptoms.'
    },
    choices: null,
    effect: (p) => { p.h -= 8; p.addCondition('chronic_lung_exposure', 'mild'); p.setMem('pollBodyMidlife', true) },
  },

  {
    id: 'ind_factory_town_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('industrial_upbringing') &&
      G.age >= 18 && G.age <= 27 &&
      !G.mem?.factoryTownQ,
    text: (G) => {
      if (G.character.country?.archetype === 'post_soviet')
        return 'Everyone your age is making the same calculation. The city means starting from nothing — a rented room, no network, a name that means nothing there. Staying means the plant, the security of a salary, your mother\'s building, the people who know you. The plant has been laying off for four years. The salary may not exist. Your mother\'s building is real.'
      return 'The factory is hiring for the shift your father worked and his father before him. Two hours away, the city is doing something different. You have never lived there. The question of which life you choose has been at the back of your head since you were fifteen. It is now at the front.'
    },
    choices: [
      {
        text: 'Go — make something different',
        tag: null,
        outcome: 'You leave. The first year is the most alone you have ever been.',
        effect: (p) => { p.addFlag('rural_to_urban'); p.m -= 8; p.e += 5; p.setMem('factoryTownQ', true) },
        inject: null,
      },
      {
        text: 'Stay — this is enough, and it is yours',
        tag: null,
        outcome: 'You stay. The decision has its own weight. You chose it with your eyes open.',
        effect: (p) => { p.addFlag('stayed_industrial'); p.m += 5; p.setMem('factoryTownQ', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── NIGER DELTA ───────────────────────────────────────────────────────────────
  //
  // Oil spills in the Niger Delta since 1958 have caused pollution that would
  // not be legally permitted in any OECD country. Shell has faced repeated
  // court findings of negligence in Dutch and UK courts. Cleanup has not occurred.

  {
    id: 'ind_niger_delta_spill',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Nigeria' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 2020 &&
      !G.mem?.nigerDeltaSpill,
    text: (G) => {
      if (G.currentYear < 1990)
        return 'The oil slick appears overnight on the creek your family has fished for as long as anyone can recall. By morning it is a sheen that moves like something alive. An engineer from the company drives out in a white Land Cruiser. He takes a water sample in a small bottle, writes something in a notebook, and leaves. No one returns. The catch that season is nothing.'
      return 'Another spill. You have learned the pattern by now — the sheen on the water, the dead fish floating to the bank, the company\'s statement issued before the oil has stopped moving. An investigation will be conducted. Compensation will be considered. You know what the investigation finds. You know what compensation comes to. The creek will not be cleaned.'
    },
    choices: null,
    effect: (p) => { p.addFlag('oil_delta_witness'); p.m -= 8; p.h -= 4; p.setMem('nigerDeltaSpill', true) },
  },

]

// events_netherlands_depth.js — Netherlands depth arc

export const NETHERLANDS_DEPTH_EVENTS = [

  // ── JODENDEPORTATIE — WWII JEWISH DEPORTATION ─────────────────────────────

  {
    id: 'nl_dep_jodendeportatie',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1942 && G.currentYear <= 1960 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.nlJodendeportatie,
    text: 'There is a gap in the street. The buildings are all standing; the gap is where the Jewish family lived, the one with the daughter who played on the steps, and they were collected on a Tuesday. The population registers kept everyone\'s religion, with Dutch thoroughness, and when the Germans asked for the lists the lists were produced. Your parents do not explain the gap. You understand it from the shape of the silence around it.',
    context: 'About 75 percent of Dutch Jews were deported and murdered, the highest proportion in Western Europe.',
    choices: [
      {
        text: 'Your family hid people during the occupation',
        tag: null,
        outcome: 'Onderduikers — people in hiding, literally under-divers. Your family knew and did not betray them. This is not a distinction everyone made.',
        effect: (p) => { p.karma += 8; p.m += 2; p.addFlag('nl_jodendeportatie_witness'); p.setMem('nlJodendeportatie', true) },
      },
      {
        text: 'Your family knew and did nothing — which was also a choice',
        tag: null,
        outcome: 'Between those who hid people and those who reported them was a large middle: those who saw and did not act. Your family was in this category. This is also a category.',
        effect: (p) => { p.r += 8; p.m -= 3; p.addFlag('nl_jodendeportatie_witness'); p.setMem('nlJodendeportatie', true) },
      },
    ],
    effect: null,
  },

  // ── BIJLMERRAMP 1992 ───────────────────────────────────────────────────────

  {
    id: 'nl_dep_bijlmerramp',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.nlBijlmerramp,
    text: 'October 4, 1992. An El Al cargo plane loses two engines and flies into two apartment towers in the Bijlmermeer. The official toll is forty-three. The towers housed thousands of people with no papers, from Suriname, Ghana, everywhere, who did not go to hospitals or report to anyone, and the inquiry years later never establishes how many died. A tower burns and shows a population the country had allowed to exist and never acknowledged.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('nl_bijlmerramp_witness'); p.setMem('nlBijlmerramp', true) },
  },

  // ── EERSTE HOMOHUWELIJK — APRIL 1, 2001 ──────────────────────────────────

  {
    id: 'nl_dep_same_sex_huwelijk',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 2001 && G.currentYear <= 2004 &&
      G.age >= 18 &&
      !G.mem?.nlSameSexHuwelijk,
    text: 'April 1, 2001, just after midnight, and the mayor of Amsterdam marries four couples, the first legal same-sex marriages anywhere. You are in the country where it happened first. Some people point out the date, meaning something by it or nothing. The marriages are legal. The world will follow, some of it.',
    choices: [
      {
        text: 'You are among those getting married, or you know the couples',
        tag: null,
        outcome: 'The right exists. This is different from saying the right is unremarkable. The right existing is the first stage of the right being unremarkable, which takes longer and is a different process.',
        effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('nl_same_sex_pioneer_2001'); p.setMem('nlSameSexHuwelijk', true) },
      },
      {
        text: 'You watch from outside — it is for others but changes something',
        tag: null,
        outcome: 'The country did this. Being from the country that did this first is a position. It does not last as a uniqueness but it cannot be taken back.',
        effect: (p) => { p.m += 6; p.addFlag('nl_same_sex_pioneer_2001'); p.setMem('nlSameSexHuwelijk', true) },
      },
    ],
    effect: null,
  },

  // ── ZWARTE PIET ──────────────────────────────────────────────────────────

  {
    id: 'nl_dep_zwarte_piet',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1955 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 12 &&
      !G.mem?.nlZwartePiet,
    text: 'Sinterklaas arrives by steamboat from Spain each November. His helpers are Zwarte Piet — Black Pete — with blackened faces, red lips, and curly wigs. You grew up with this as entirely normal: the candy thrown from windows, the children\'s songs, the white-bearded saint on a grey horse. The debate about what the tradition depicts and what the Netherlands chose to keep depicting comes later. As a child you do not see the argument. You see the candy and the wooden shoes. This is not the same as saying the argument that comes later is wrong.',
    choices: null,
    effect: (p) => { p.addFlag('nl_zwarte_piet_debate_generation'); p.setMem('nlZwartePiet', true) },
  },

  // ── TOESLAGENAFFAIRE ─────────────────────────────────────────────────────

  {
    id: 'nl_dep_toeslagen',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2012 && G.currentYear <= 2021 &&
      G.age >= 25 && G.age <= 45 &&
      G.children?.length > 0 &&
      !G.mem?.nlToeslagen,
    text: 'The tax office has flagged your childcare benefit for fraud, and the letter says you must repay more than you earn in a year. You have not committed fraud. Neither have tens of thousands of other families, most of them with a migrant background, flagged by an algorithm that counted a foreign name as a risk. The inquiry calls it unprecedented injustice and the cabinet resigns. Your debt does not disappear with it.',
    context: 'The toeslagenaffaire wrongly accused some 26,000 families; the Rutte cabinet resigned over it in January 2021.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.mo -= 5000; p.addFlag('nl_toeslagen_family'); p.setMem('nlToeslagen', true) },
  },

  // ── GRONINGEN AARDBEVING ─────────────────────────────────────────────────

  {
    id: 'nl_dep_groningen_gas',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2012 && G.currentYear <= 2025 &&
      G.age >= 30 &&
      !G.mem?.nlGroningenGas,
    text: 'There is a crack in your house, a hairline from the corner of the ceiling down to the window frame, that was not there last year. You know what caused it. The gas under Groningen heated half of Europe and paid for the welfare state, and the quakes from taking it out have cracked tens of thousands of houses. The company says the soil is settling. It takes the state years to admit the link, longer to admit fault, longer still to pay.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 5; p.mo -= 3000; p.addFlag('nl_groningen_earthquake_affected'); p.setMem('nlGroningenGas', true) },
  },

  // ── BERSIAP FAMILY MEMORY ────────────────────────────────────────────────

  {
    id: 'nl_dep_bersiap_memory',
    phase: null,
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.nlBersiap,
    text: 'Your father or grandfather served in the Dutch East Indies after 1945. He does not speak about it the way veterans speak about liberation. The government calls what happened "police actions" — politionele acties. In 1969 a veteran said on television what he had seen, and the government\'s own report that year called it "excesses". The word was chosen carefully. He knew what he did. Whether he knew what it was is a different question, and not one you know how to ask him.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('nl_bersiap_family_memory'); p.setMem('nlBersiap', true) },
  },

  // ── WILDERS 2023 ─────────────────────────────────────────────────────────

  {
    id: 'nl_dep_wilders_2023',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2023 && G.currentYear <= 2025 &&
      G.age >= 40 &&
      !G.mem?.nlWilders2023,
    text: 'November 22, 2023. The PVV wins 37 seats — the largest party in parliament. Geert Wilders, under twenty-four-hour police protection since 2004 for jihadi death threats, who has proposed banning the Quran and closing mosques, is now leading the largest party. The Netherlands has been having this argument since Fortuyn, and longer. The argument is about Wilders, and about housing, the toeslagen, Groningen, nitrogen rules, what the state has done to certain people who had no word for what was being done to them. The analysis takes longer than the result.',
    choices: [
      {
        text: 'Something that was contained has now been legitimised',
        tag: null,
        outcome: 'The PVV forms a coalition. The more extreme proposals are modified by partners. Some are implemented. The question of what was legitimised versus merely tolerated takes years to answer.',
        effect: (p) => { p.r += 6; p.m -= 4; p.addFlag('nl_wilders_2023_generation'); p.setMem('nlWilders2023', true) },
      },
      {
        text: 'The people who voted for him had reasons the analysis keeps missing',
        tag: null,
        outcome: 'Housing. The toeslagen. Groningen. The voters are not a single thing. Wilders is not the only explanation. The analysis that fails to include this will be wrong about what comes next.',
        effect: (p) => { p.e += 3; p.addFlag('nl_wilders_2023_generation'); p.setMem('nlWilders2023', true) },
      },
    ],
    effect: null,
  },

]

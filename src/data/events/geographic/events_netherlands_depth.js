// events_netherlands_depth.js — Netherlands depth arc

export const NETHERLANDS_DEPTH_EVENTS = [

  // ── JODENDEPORTATIE — WWII JEWISH DEPORTATION ─────────────────────────────

  {
    id: 'nl_dep_jodendeportatie',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1942 && G.currentYear <= 1960 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.nlJodendeportatie,
    text: 'There is a gap in the street. Not a bombed building — the buildings are intact. The gap is where the Jewish family lived, the one with the daughter who played on the steps. They were collected on a Tuesday. The Dutch population registers, maintained with Dutch administrative precision, listed everyone\'s religion; the Germans asked for the lists and the lists were produced. Seventy-five percent of Dutch Jews are deported and killed — the highest rate in Western Europe. Your parents do not explain the gap. You understand it by the shape of the silence around it.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.nlBijlmerramp,
    text: 'October 4, 1992. El Al flight 1862 loses two engines and crashes into the Groeneveen and Klein-Kruitberg apartment towers in Amsterdam Bijlmermeer. The fire burns for hours. The official death toll is 43. But the towers housed thousands of undocumented immigrants — Surinamese, Ghanaian, people from everywhere — who do not go to hospitals or report to authorities. A parliamentary inquiry years later tries to establish how many actually died. The number is never established. A tower burns and reveals an invisible population that the Netherlands had allowed to exist and had not acknowledged.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('nl_bijlmerramp_witness'); p.setMem('nlBijlmerramp', true) },
  },

  // ── EERSTE HOMOHUWELIJK — APRIL 1, 2001 ──────────────────────────────────

  {
    id: 'nl_dep_same_sex_huwelijk',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 2001 && G.currentYear <= 2004 &&
      G.age >= 18 &&
      !G.mem?.nlSameSexHuwelijk,
    text: 'April 1, 2001. Just after midnight, the mayor of Amsterdam officiates the first legal same-sex marriages in the world. Four couples. You are in the Netherlands, which is the first country on earth where this happened. The date is April 1 — some people point this out, meaning something by it or meaning nothing. The marriages are legal. The city is present. The world is not here yet but the world will be, in some countries, which is a fact about the world that did not exist yesterday.',
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
        outcome: 'The country did this. Being from the country that did this first is a specific position. It does not last as a uniqueness but it cannot be taken back.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2012 && G.currentYear <= 2021 &&
      G.age >= 25 && G.age <= 45 &&
      G.children?.length > 0 &&
      !G.mem?.nlToeslagen,
    text: 'The Dutch tax authority has flagged your childcare benefit claim for fraud. The letter says repayment is required. The amount is larger than your annual income. You have not committed fraud. Neither have 26,000 other families — disproportionately families with a migration background, flagged by an algorithm that treats a foreign surname as a risk indicator. The system was designed to recover money. It recovers money from people who do not owe it. The parliamentary inquiry calls it ongekend onrecht — unprecedented injustice. The cabinet resigns. Your debt does not immediately disappear.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.mo -= 5000; p.addFlag('nl_toeslagen_family'); p.setMem('nlToeslagen', true) },
  },

  // ── GRONINGEN AARDBEVING ─────────────────────────────────────────────────

  {
    id: 'nl_dep_groningen_gas',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2012 && G.currentYear <= 2025 &&
      G.age >= 30 &&
      !G.mem?.nlGroningenGas,
    text: 'Your house has a crack. A hairline from the ceiling corner down to the window frame — it was not there last year. You know what caused it. Since 1959 the Groningen gas field has supplied a quarter of European natural gas; since 2012 the extraction-induced earthquakes have cracked 100,000 Groningen homes. The NAM — Shell and ExxonMobil — attributes the damage to soil settling. The houses say otherwise. The Dutch state takes years to acknowledge the correlation, longer to acknowledge liability, longer still to compensate the families. The gas made the Dutch welfare state. The welfare state did not extend to the people above the gas.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 5; p.mo -= 3000; p.addFlag('nl_groningen_earthquake_affected'); p.setMem('nlGroningenGas', true) },
  },

  // ── BERSIAP FAMILY MEMORY ────────────────────────────────────────────────

  {
    id: 'nl_dep_bersiap_memory',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.nlBersiap,
    text: 'Your father or grandfather served in the Dutch East Indies after 1945. He does not speak about it the way veterans speak about liberation. The government calls what happened "police actions" — politionele acties. What the Westerling massacre and the parliamentary inquiry of 2022 call it is "systematic and extreme violence." Your grandfather is dead before the inquiry. He knew what he did. Whether he knew what it was is a different question, one you cannot now ask him.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('nl_bersiap_family_memory'); p.setMem('nlBersiap', true) },
  },

  // ── WILDERS 2023 ─────────────────────────────────────────────────────────

  {
    id: 'nl_dep_wilders_2023',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2023 && G.currentYear <= 2025 &&
      G.age >= 40 &&
      !G.mem?.nlWilders2023,
    text: 'November 22, 2023. The PVV wins 37 seats — the largest party in parliament. Geert Wilders, under twenty-four-hour police protection since 2004 for jihadi death threats, who has proposed banning the Quran and closing mosques, is now leading the largest party. The Netherlands has been having this argument since Fortuyn, and longer. The argument is not only about Wilders. It is about housing, the toeslagen, Groningen, nitrogen rules, what the state has done to certain people who had no word for what was being done to them. The analysis takes longer than the result.',
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

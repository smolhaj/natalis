// Mali character arc events
// Covers: ancient empire identity, cotton economy, Traoré military era 1968–1991,
// 1991 democratic revolution, Tuareg question, 2012 coup, northern collapse,
// Timbuktu manuscripts rescue, Operation Serval, Sahel jihadist crisis.

const IS_MALIAN = (G) => G.character.country.name === 'Mali';

export const MALI_EVENTS = [

  // ── ANCIENT EMPIRE IDENTITY ──────────────────────────────────────────────────

  {
    id: 'mli_empire_heritage',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 1955 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.mliEmpire,
    text: 'The teacher writes three words on the board: Ghana. Mali. Songhai. Three empires, here, before Europe\'s medieval period had ended. Mansa Musa\'s pilgrimage to Mecca in 1324 distributed so much gold that it depressed the price of gold across North Africa and the Middle East for a generation. Timbuktu had 100,000 people and 25,000 students at its universities when Paris had 200,000. The teacher says: this is where you are from. Not from poverty. From this.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 3; p.addFlag('mali_empire_memory'); p.setMem('mliEmpire', true); },
  },

  // ── COTTON ECONOMY ───────────────────────────────────────────────────────────

  {
    id: 'mli_cotton_economy',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2015 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 &&
      !G.mem?.mliCotton,
    text: 'The CMDT — the Malian textile development company — tells you what to plant and what price you will receive for it. Cotton is the only cash crop the market will reliably buy, the only thing that brings money into a village. You plant cotton on a field that once grew sorghum. The CMDT provides seeds and pesticides; they also set the price at the end of the season, after you have already grown it. The price is not negotiated. You do the calculation: you are not a farmer who chose to grow cotton. You are an employee of a system that looks like farming.',
    choices: [
      {
        text: 'Plant more cotton — more land, more income.',
        tag: 'Scale',
        outcome: 'In good years the calculation pays. In bad years — drought, low prices — you owe more than you earned. The risk belongs to you. The price belongs to them.',
        effect: (p) => { p.w += 3; p.m -= 4; p.addFlag('mali_cotton_generation'); p.setMem('mliCotton', true); },
      },
      {
        text: 'Keep some fields for subsistence crops.',
        tag: 'Hedge',
        outcome: 'You eat when the cash crop fails. This is not a strategy the agricultural extension officers recommend. It is the reason your family does not starve.',
        effect: (p) => { p.h += 3; p.m -= 2; p.addFlag('mali_cotton_generation'); p.setMem('mliCotton', true); },
      },
    ],
  },

  // ── TRAORÉ MILITARY ERA 1968–1991 ────────────────────────────────────────────

  {
    id: 'mli_traore_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.age >= 18 &&
      !G.mem?.mliTraore,
    text: 'November 19, 1968: Lieutenant Moussa Traoré removes Modibo Keïta on the radio. The socialist experiment — nationalized industries, pan-African ambitions, a national currency — ends overnight. What replaces it is the UDPM: the Democratic Union of the Malian People, the only legal party, which is not democratic and is not a union and does not serve the Malian people in any obvious way. The country continues. Crops grow, markets open, children go to school. But what cannot be said is very precisely what cannot be said. You learn the vocabulary of the unsayable early.',
    choices: [
      {
        text: 'Find a position within the system — government work, relative stability.',
        tag: 'Navigate',
        outcome: 'The system has jobs, and the jobs come with loyalties. You accept the package.',
        effect: (p) => { p.w += 3; p.karma -= 2; p.addFlag('mali_traore_era'); p.addFlag('regime_self_censorship'); p.setMem('mliTraore', true); },
      },
      {
        text: 'Stay outside formal structures — market, agriculture, invisibility.',
        tag: 'Avoid',
        outcome: 'The margin is less comfortable and somewhat more honest. You operate in it.',
        effect: (p) => { p.m -= 3; p.addFlag('mali_traore_era'); p.addFlag('learned_silence'); p.setMem('mliTraore', true); },
      },
    ],
  },

  // ── 1991 DEMOCRATIC REVOLUTION ───────────────────────────────────────────────

  {
    id: 'mli_revolution_1991',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      G.age >= 16 &&
      !G.mem?.mliRevolution,
    text: 'March 22, 1991. The protesters have been in the streets for days — students, workers, women\'s groups. Traoré orders the army to fire on them. General Amadou Toumani Touré, commanding officer of the presidential guard, refuses the order. Other officers follow. Within twenty-four hours, Traoré is arrested in his own home. The transitional government forms within weeks. An election in June produces a president. For the first time since 1968, the country is governed by someone the people chose. You are twenty-three years old or thirty-five or forty-four, and you have not seen this happen before in your adult life.',
    choices: [
      {
        text: 'You were in the streets when it happened.',
        tag: 'Protested',
        outcome: 'You will know, for the rest of your life, that you were there on the days that changed it. This is the kind of knowledge that changes how you understand everything that follows.',
        effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('mali_democracy_generation'); p.addFlag('activist'); p.setMem('mliRevolution', true); },
      },
      {
        text: 'You watched from a distance, uncertain whether to believe it.',
        tag: 'Watched',
        outcome: 'The uncertainty was warranted. The belief was also warranted. Both turn out to be correct.',
        effect: (p) => { p.m += 8; p.addFlag('mali_democracy_generation'); p.setMem('mliRevolution', true); },
      },
    ],
  },

  // ── TUAREG IDENTITY ──────────────────────────────────────────────────────────

  {
    id: 'mli_tuareg_question',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_MALIAN(G) &&
      G.ethnicity === 'tuareg_mali' &&
      G.age >= 14 &&
      !G.mem?.mliTuareg,
    text: 'The Kel Tamasheq — the people who speak Tamasheq, who have crossed the Sahara for centuries — are called Tuareg by the world outside. Your territory has always been larger than the lines that France drew in 1960. The lines put your people inside Mali, Algeria, Niger, Libya, Burkina Faso. The nomadic logic of the desert does not organise itself by those lines, and the Malian state has spent thirty years trying to make you sedentary in ways that make sense to a state. The settled life: the school, the development project, the identity document. The nomadic life: the seasonal route, the tent, the camel, the stars as navigation. You are being asked to choose what cannot be chosen.',
    choices: [
      {
        text: 'Hold on to the nomadic way of life.',
        tag: 'Nomadic',
        outcome: 'The desert is yours in a way that no document confirms and no government can take away. The price is invisibility to every system that requires a fixed address.',
        effect: (p) => { p.m += 3; p.addFlag('tuareg_malian'); p.addFlag('tuareg_nomadic_life'); p.setMem('mliTuareg', true); },
      },
      {
        text: 'Settle — school, work, the city.',
        tag: 'Settle',
        outcome: 'Bamako or Gao or Kidal. The city takes you on its own terms. You are a Tuareg in a place that sees you as a problem or a curiosity or simply a Malian, depending on the year.',
        effect: (p) => { p.e += 3; p.r += 4; p.addFlag('tuareg_malian'); p.addFlag('tuareg_settled'); p.setMem('mliTuareg', true); },
      },
    ],
  },

  // ── 2012 COUP AND NORTHERN COLLAPSE ─────────────────────────────────────────

  {
    id: 'mli_coup_2012',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2013 &&
      G.age >= 20 &&
      !G.mem?.mliCoup2012,
    text: 'March 22, 2012 — the anniversary, by chance, of the 1991 revolution. Captain Amadou Sanogo and a group of officers seize the state television in Bamako. Their stated reason: the government is incompetent in the face of the Tuareg uprising in the north. Within days of the coup, the MNLA and Ansar Dine have taken Kidal, Gao, and Timbuktu. The north — two-thirds of the country — is no longer under Malian government control. The coup removed the government that was losing the war. What replaced it is more chaotic and losing it faster.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 5; p.addFlag('mali_2012_crisis_lived'); p.addFlag('political_aware'); p.setMem('mliCoup2012', true); },
  },

  // ── TIMBUKTU UNDER ISLAMIST RULE ─────────────────────────────────────────────

  {
    id: 'mli_timbuktu_islamists',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2013 &&
      G.flags.includes('mali_2012_crisis_lived') &&
      !G.mem?.mliTimbuktu,
    text: 'In Timbuktu, under Ansar Dine and AQIM, the shrines of Muslim saints are destroyed with pickaxes — idolatry, they say. Music is banned. Women must cover fully. The 14th-century mosques that have stood for seven centuries are permitted. The ancient manuscripts — 300,000 of them, the largest collection of medieval Islamic scholarship in sub-Saharan Africa — are in private homes and the Ahmed Baba Institute. Librarians have been moving them, box by box, for months, south to Bamako before the Islamists can find them. Most are saved. You hear about this from someone who helped carry them.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('timbuktu_generation'); p.setMem('mliTimbuktu', true); },
  },

  // ── OPERATION SERVAL 2013 ─────────────────────────────────────────────────────

  {
    id: 'mli_operation_serval',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.flags.includes('mali_2012_crisis_lived') &&
      !G.mem?.mliServal,
    text: 'January 11, 2013. France launches Operation Serval. Hollande announces it in the afternoon; the jets are flying by midnight. Malian soldiers and French Special Forces retake Konna, then Diabaly, then Gao, then Timbuktu. In the streets of Bamako people cheer French soldiers — soldiers from the country that colonized this one for sixty years. You notice the contradiction and you do not resolve it. The jihadists are pushed north into the Adrar des Ifoghas mountains. A French soldier dies. The country is not what it was before March 2012, and no one knows what it is instead.',
    choices: [
      {
        text: 'Feel the relief. The immediate crisis is over.',
        tag: 'Relief',
        outcome: 'Whatever the politics, people are not being killed in the streets today who were yesterday. This is not nothing.',
        effect: (p) => { p.m += 6; p.addFlag('mali_serval_witness'); p.setMem('mliServal', true); },
      },
      {
        text: 'Hold the contradiction: France is back, and we needed them.',
        tag: 'Reckoning',
        outcome: 'The French have interests in the Sahel that are not identical to Malian interests. You know this and are still glad they came. The two things are both true.',
        effect: (p) => { p.m += 3; p.e += 3; p.r += 4; p.addFlag('mali_serval_witness'); p.addFlag('political_aware'); p.setMem('mliServal', true); },
      },
    ],
  },

  // ── LATE RECKONING: SAHEL CRISIS ─────────────────────────────────────────────

  {
    id: 'mli_sahel_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_MALIAN(G) &&
      G.currentYear >= 2020 &&
      G.flags.includes('mali_democracy_generation') &&
      !G.mem?.mliSahelReckoning,
    text: 'The democracy lasted twenty years. Two coups in 2020 and 2021; a military junta governing now with Russian support. France expelled. Wagner Group in. The jihadist violence you watched move through the north in 2012 has spread across the centre and south. The cycle of coups — 1968, 1991, 2012, 2020, 2021 — has a rhythm that you have lived through more of than you expected. You marched in 1991 or you remember those who did. The march felt like the end of something. It turns out to have been the middle.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.e += 2; p.addFlag('mali_long_witness'); p.setMem('mliSahelReckoning', true); },
  },

]

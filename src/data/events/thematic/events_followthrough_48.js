// events_followthrough_48.js — 10 follow-through events
// Greece depth arc echoes (6), Thailand depth echoes (2), DR depth echoes (2)

export const FOLLOWTHROUGH_48_EVENTS = [

  // ─── GREECE: PROSFYGES MIDLIFE ───────────────────────────────────────────

  {
    id: 'gr_prosfyges_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Greece' &&
      G.flags.has('greek_prosfyges_family') &&
      G.age >= 45 &&
      !G.mem?.grProsfygesMidlife,
    text: 'Your grandmother is dead and the language she spoke for the Turkey she remembered has gone with her. She described the market in Smyrna the way you would describe this street — the specific stalls, the specific men who ran them, the smell at a particular time of day. The place she described was destroyed in 1922. She never went back. You never went either, but you have known the map of it since childhood. The place exists only in the description, and now the description is gone too.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('grProsfygesMidlife', true) },
  },

  // ─── GREECE: PROSFYGES LATE LIFE ─────────────────────────────────────────

  {
    id: 'gr_prosfyges_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Greece' &&
      G.flags.has('greek_prosfyges_family') &&
      G.age >= 65 &&
      !G.mem?.grProsfygesLate,
    text: 'Someone in the family visited the city. Istanbul now, not Constantinople, not Smyrna. They took photographs. The house from the old address is gone — rebuilt, changed, someone else\'s house for a hundred years. They brought back the photographs as a kind of gift, a kind of evidence. You look at them and cannot find the thing your grandmother was describing in the building that stands there now. The city did not preserve the map. The map was only ever in the speech.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 2; p.karma += 2; p.setMem('grProsfygesLate', true) },
  },

  // ─── GREECE: ELAS MEMBER — CIVIL WAR RECKONING ───────────────────────────

  {
    id: 'gr_elas_civil_war_split',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Greece' &&
      G.flags.has('greek_elas_member') &&
      G.flags.has('greek_civil_war_generation') &&
      G.age >= 35 &&
      !G.mem?.grElascivilSplit,
    text: 'The resistance was one thing. The civil war was a different thing with some of the same people in it. By 1947, the question of who you fought beside in the mountains had become the question of which side of the country you were on. Some of the men from the resistance are now in exile in Tashkent or Prague. Some of them are dead. Some of them are in the mountains still, or were, before the surrender. You made your decisions year by year between 1942 and 1949 and what you end up with is a record that does not simplify into a single position. The government\'s account says you were a bandit. The men who were with you in the occupation know what the mountains were for. Both things are in the record.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma += 5; p.e += 3; p.setMem('grElascivilSplit', true) },
  },

  // ─── GREECE: GASTARBEITER — THE CHILDREN ─────────────────────────────────

  {
    id: 'gr_gastarbeiter_children',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('greek_gastarbeiter') &&
      G.age >= 40 &&
      !G.mem?.grGastarbChildren,
    text: (G) => {
      const hasChildren = G.children && G.children.length > 0
      if (hasChildren) {
        return 'Your children grew up somewhere between languages. Their Greek is accented — the accent of someone who learned it in the house, from you, rather than in the street and at school. Their German is perfect, which is to say it is not marked the way yours is. You are proud of this and it is also a small loss that cannot be named without sounding ungrateful. The loss is the loss of the specific texture of Greek when it is the only language.'
      }
      return 'The Greek community in the German city has been here long enough to have grandchildren. There are children who speak Greek with an accent and German without one. The kafeneion on the corner has been open for forty years. It serves the old men of your generation and a few younger ones and almost no one else. The community that assembled itself here assembled itself as a temporary arrangement and stayed.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('grGastarbChildren', true) },
  },

  // ─── GREECE: ECONOMIC MIRACLE + DEBT CRISIS — THE ARC ───────────────────

  {
    id: 'gr_miracle_to_crisis',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Greece' &&
      G.flags.has('greek_economic_miracle_gen') &&
      G.currentYear >= 2010 &&
      G.age >= 60 &&
      !G.mem?.grMiracleCrisis,
    text: 'You grew up with the concrete going up everywhere and the first refrigerator and the sense that the country was on its way to something. You were of the generation the miracle was made of. And now the supermarkets are half-empty and the young are leaving — not to Germany this time, not with a bilateral contract, but to wherever takes them. The arc from the miracle to this is visible to you as a whole because you have lived both ends of it. The young do not have the miracle to measure the crisis against. You are not sure which is worse.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('grMiracleCrisis', true) },
  },

  // ─── GREECE: CIVIL WAR — WHAT THE CHILDREN WERE TOLD ───────────────────

  {
    id: 'gr_civil_war_children_told',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Greece' &&
      G.flags.has('greek_civil_war_generation') &&
      G.children && G.children.length > 0 &&
      G.age >= 40 &&
      !G.mem?.grCivilWarChildrenTold,
    text: (G) => {
      const wasLeft = G.flags.has('dissident_family')
      if (wasLeft) {
        return 'Your children ask which side your family was on. This is the question the civil war produces one generation later, when the defeated side has been officially rehabilitated and the question is finally sayable. You tell them. What you find, in the telling, is that the story has simplified in your mind. The actual year-by-year sequence of decisions — the things that seemed necessary at the time, the things that were wrong, the things that were made wrong by events after — has compressed into a position. You are aware that you are giving them the position, not the years.'
      }
      return 'Your children ask which side your family was on in the civil war. The question is finally possible to ask because PASOK has changed the official account and the defeated side has been named as something other than bandits. You tell them. What you notice, in the telling, is that you know less than you thought you knew about what your parents actually believed, as opposed to what they were classified as. The classification and the belief were not always the same thing.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('grCivilWarChildrenTold', true) },
  },

  // ─── THAILAND: 1976 GENERATION — FORTY YEARS ON ──────────────────────────

  {
    id: 'tha_76_anniversary',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Thailand' &&
      G.flags.has('thai_76_generation') &&
      G.currentYear >= 2016 &&
      G.age >= 55 &&
      !G.mem?.tha76Anniversary,
    text: 'October 6 is approaching its fortieth year. There have been small commemorations over the years — the university has a memorial, academics have written accounts, survivors have given testimony. The official history of what happened at Thammasat in 1976 has been contested and partial and shifted depending on who is in power and what a government will permit to be said. You know what happened because you were there, or because someone who was there told you. The contested history is not the same as what happened. You have been living with both versions for forty years.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.karma += 2; p.setMem('tha76Anniversary', true) },
  },

  // ─── THAILAND: ORDAINED — THE MARRIAGE YEAR ──────────────────────────────

  {
    id: 'tha_ordained_marriage',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Thailand' &&
      G.flags.has('thai_ordained') &&
      G.partner &&
      !G.mem?.thaOrdinatedMarriage,
    text: 'The months in the robe are in the past now, the rains retreat ended, the disrobing ceremony complete. You are back in ordinary clothes and the marriage is arranged. The ordination is understood to be the preparation — the merit made, the spiritual maturity demonstrated. Your mother considers you now ready in the way that the tradition means. What you carry from the months is more difficult to account for: the specific silence of the early morning alms round, the way the day was structured by practice rather than by want. You do not know yet whether you will carry it as texture or as a reference point or as nothing.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('thaOrdinatedMarriage', true) },
  },

  // ─── DOMINICAN REPUBLIC: TRUJILLO GENERATION — DEMOCRACY ────────────────

  {
    id: 'dr_trujillo_democracy',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Dominican Republic' &&
      G.flags.has('trujillo_generation') &&
      G.currentYear >= 1980 &&
      G.age >= 50 &&
      !G.mem?.drTrujilloDemocracy,
    text: 'The photograph is gone from the wall. You took it down yourself in 1961 or someone else did. What replaced it was a sequence of governments: Balaguer, who ran the country for most of three decades with a different kind of management; elections, which were not always clean; the gradual arrival of something that could be called normal. You grew up in the country where the photograph was required. You have lived long enough to know what is on the other side of that, which is: ordinary politics, ordinary disappointment, ordinary corruption. The ordinariness after the photograph is its own kind of thing.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('drTrujilloDemocracy', true) },
  },

  // ─── DOMINICAN REPUBLIC: MASSACRE GENERATION — THE BORDER ──────────────

  {
    id: 'dr_massacre_border',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Dominican Republic' &&
      G.flags.has('dr_massacre_generation') &&
      G.age >= 35 &&
      !G.mem?.drMassacreBorder,
    text: 'The border between the Dominican Republic and Haiti is the most charged border in this hemisphere, which is also a way of saying: two countries on one island with four hundred years of complicated history between them. What happened in 1937 — the 17,000 to 35,000 people killed along that border in four days, the test of whether a person could say *perejil* with the right sound — is something the country has maintained its own silence about for most of the time since. You know it. You know how you came to know it, which was in pieces, from what was not said. The border crossing is forty minutes from where you grew up. You have never crossed it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.karma += 3; p.setMem('drMassacreBorder', true) },
  },

]

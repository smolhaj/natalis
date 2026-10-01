// events_followthrough_76.js
// Follow-through events for Ukraine depth (events_ukraine_depth.js):
// ukr_chernobyl_generation, ukr_1990s_collapse_generation, ukr_soviet_identity,
// ukr_crimea_2014_inside, ukr_lviv_galicia_generation, ukr_kharkiv_wartime,
// ukr_mobilization_2022, ukr_basement_2022

export const FOLLOWTHROUGH_76_EVENTS = [

  // ── CHERNOBYL FOLLOW-THROUGHS ─────────────────────────────────────────────

  {
    id: 'ft76_chernobyl_thyroid',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_chernobyl_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 30 &&
      !G.mem?.ft76ChernobylThyroid,
    text: 'You were not under five in 1986, but you were close enough to be given the iodine tablets. The doctor who examines your thyroid now chooses her words: monitoring, precautionary. You do not know whether that means she is worried or only careful. It is not always a medical distinction.',
    context: 'Thyroid cancer among children under five at the time of the Chernobyl accident rose many times above the normal rate in the most contaminated regions of Belarus, Ukraine and Russia.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 3
      p.setMem('ft76ChernobylThyroid', true)
    },
  },

  {
    id: 'ft76_chernobyl_return',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_chernobyl_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 40 &&
      !G.mem?.ft76ChernobylReturn,
    text: 'Some of the people from the zone went back, illegally at first and then tolerated: old people mostly, who preferred their own gardens inside the wire to the flats they had been moved to. By the nineties there are a few hundred of them. You do not go. But you understand it. Where you are from is not always somewhere you can live.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.e += 2
      p.setMem('ft76ChernobylReturn', true)
    },
  },

  // ── 1990S COLLAPSE FOLLOW-THROUGH ─────────────────────────────────────────

  {
    id: 'ft76_1990s_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_1990s_collapse_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 45 &&
      !G.mem?.ft76_1990sReckoning,
    text: 'Your generation measures time by what it cost. You paid for independence with savings that were wiped out and a career that stopped being possible, in the ten years when you should have been building. The people who were children in the nineties remember them differently; to them it is history. To you it was the decade you spent surviving instead.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft76_1990sReckoning', true)
    },
  },

  // ── CRIMEA FOLLOW-THROUGH ─────────────────────────────────────────────────

  {
    id: 'ft76_crimea_limbo',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_crimea_2014_inside') &&
      G.currentYear >= 2018 &&
      G.age >= 30 &&
      !G.mem?.ft76CrimeaLimbo,
    text: 'The Ukrainian passport is expired and the consular office is in Kyiv, which requires crossing from Russian-controlled territory. The Russian passport is available at the local office, which is now a Russian local office. The property you own is registered in the Ukrainian system, which the Russian system does not recognise, which the Ukrainian system still considers valid. You exist in the gap between two legal systems, each of which considers you its citizen or its subject, neither of which resolves the documents you hold into something coherent. You have learned to manage in the gap.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.e += 3
      p.setMem('ft76CrimeaLimbo', true)
    },
  },

  // ── 2022 FOLLOW-THROUGHS ──────────────────────────────────────────────────

  {
    id: 'ft76_mobilization_late',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_mobilization_2022') &&
      G.currentYear >= 2023 &&
      G.age >= 22 &&
      !G.mem?.ft76MobilizationLate,
    text: 'The people in the unit: the electrician has a different post now. The teacher came back from leave sitting differently in his chair. The two students are still here. The man who ran the restaurant is on the list of those who were in the unit and are not any more. You do not count the list, and you do not stop knowing how long it is.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m -= 5
      p.karma += 3
      p.setMem('ft76MobilizationLate', true)
    },
  },

  {
    id: 'ft76_basement_normalised',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('ukr_basement_2022') &&
      G.currentYear >= 2023 &&
      G.age >= 10 &&
      !G.mem?.ft76BasementNormal,
    text: 'The alert sounds and you are moving before you have decided to. The bag is by the door and your feet know the way to the basement. From down there you can tell by the sound whether it is close. Nobody taught you this; your body learned it from the conditions it was given. You did not ask for the skill. You have it now.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.h -= 2
      p.e += 3
      p.setMem('ft76BasementNormal', true)
    },
  },

]

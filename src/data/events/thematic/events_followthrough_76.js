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
    text: 'The thyroid cancer rate in the Chernobyl-affected regions is elevated for children who were under five in 1986 — 94 times higher than baseline by some measures. You were not under five. But you were close enough to take the iodine tablets. The doctor who examines your thyroid now uses careful language about monitoring. The monitoring is precautionary. You do not know if the precaution is warranted or routine. The difference between warranted and routine is not always a medical distinction.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 3
      p.setMem('ft76ChernobylThyroid', true)
    },
  },

  {
    id: 'ft76_chernobyl_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_chernobyl_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 40 &&
      !G.mem?.ft76ChernobylReturn,
    text: 'Some of the original residents of Pripyat and the exclusion zone went back — illegally at first, then tolerated. The "self-settlers," mostly elderly, who decided the zone was preferable to the cities they had been relocated to. By the 1990s there are a few hundred people living inside the exclusion zone, growing gardens, keeping to themselves. You do not become one of them. But you understand the logic. The place where you are from is not always the place you can live. Understanding the logic and being unable to follow it is its own condition.',
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
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_1990s_collapse_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 45 &&
      !G.mem?.ft76_1990sReckoning,
    text: 'You are in a generation that measures time by what it cost. The 1990s were the price of independence. You paid it in savings that were erased, in careers that became unreachable, in the ten years between what you should have built and what you actually built. The people who were children during the 1990s do not remember it the same way. To them it is history. To you it is the decade in which you were supposed to be establishing yourself, which you were instead surviving. The accounting runs differently at this distance.',
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
    phase: 'late_life',
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
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_mobilization_2022') &&
      G.currentYear >= 2023 &&
      G.age >= 22 &&
      !G.mem?.ft76MobilizationLate,
    text: 'The people in the unit: the electrician is at a different position now. The teacher came back from leave with something wrong in the way he sits. The two students are still in it. The man who ran the restaurant: his name is on a list you have been added to, the list of people who were in the unit, because the unit has fewer people in it now than it did when it was formed. You do not count this. You do not not count it either. It is just what the list is.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ukr_basement_2022') &&
      G.currentYear >= 2023 &&
      G.age >= 10 &&
      !G.mem?.ft76BasementNormal,
    text: 'The alert sounds and you are already moving before you are fully aware you have started. The go-bag is by the door. The route to the basement is automatic. You have learned the sound of incoming well enough that you can tell, from the basement, whether it is close. The calibration has happened without you deciding to calibrate. This is the body\'s work: it makes itself useful in the conditions it is given. You did not ask for this skill. You have it now.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.h -= 2
      p.e += 3
      p.setMem('ft76BasementNormal', true)
    },
  },

]

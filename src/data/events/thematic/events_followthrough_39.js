// events_followthrough_39.js — World-event flag follow-throughs (8 events)
// Upgrades these world-event flags from intent:'none' to intent:'event':
//   war_generation, lived_through_occupation, lived_through_revolution,
//   hyperinflation_survivor, post_soviet_shock, apartheid_privileged,
//   drought_survivor, witnessed_climate_change
// These flags fire from worldEvents.js but previously had no character-level
// follow-through. Now they do.

export const FOLLOWTHROUGH_39_EVENTS = [

  // ─── WAR GENERATION: WHAT PEACETIME FEELS LIKE ───────────────────────────────

  {
    id: 'ft39_war_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('war_generation') &&
      G.age >= 55 &&
      !G.mem?.ft39WarGenLate,
    text: 'You grew up understanding that peace was not the default — that it was a condition that had to be maintained, that could end, that had ended before and could end again. The people who grew up after the war grew up with a different assumption: that the stability was the natural state and the violence was the interruption. You have watched them be surprised by things that do not surprise you. You are not sure which understanding is better to carry. Yours keeps you alert to certain things. It may have cost you something else.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft39WarGenLate', true) },
  },

  // ─── LIVED THROUGH OCCUPATION: THE WORD SOVEREIGNTY ─────────────────────────

  {
    id: 'ft39_occupation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('lived_through_occupation') &&
      G.age >= 50 &&
      !G.mem?.ft39OccupationLate,
    text: 'You know what occupation looks like from the inside — the checkpoint that is not your checkpoint, the soldier who does not speak your language giving instructions in a language you are required to understand. The word sovereignty has a specific weight for you. When politicians use it in speeches you hear something different from what they intend. You hear the specific absence of it — what it meant to live in a place that your country\'s government did not control. The people who have not experienced this use the word differently, lighter, as if it were just a fact about maps rather than a fact about where you can go and at what hour.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft39OccupationLate', true) },
  },

  // ─── LIVED THROUGH REVOLUTION: DECADES LATER ─────────────────────────────────

  {
    id: 'ft39_revolution_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('lived_through_revolution') &&
      G.age >= 50 &&
      !G.mem?.ft39RevolutionLate,
    text: 'The revolution is old enough now that there are people who study it — historians, documentarians, young people who were not born until after it. They have a relationship to it that is different from yours: clean, settled, already the past. For you it was the specific atmosphere of weeks when everything was suspended — when no one was certain what the rules were because the rules were changing. You have struggled to explain this to people who learned about it from a book. The particular quality of uncertainty during upheaval. The way normal life continued alongside the extraordinary. The coffee still had to be made.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft39RevolutionLate', true) },
  },

  // ─── HYPERINFLATION SURVIVOR: THE MONEY DISTRUST ─────────────────────────────

  {
    id: 'ft39_hyperinflation_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('hyperinflation_survivor') &&
      G.age >= 40 &&
      !G.mem?.ft39HyperLate,
    text: 'You do not fully trust the number in the account. This is not rational — the currency is stable now, has been stable for years — but the distrust is not rational; it was installed by experience and experience does not respond to logic. You convert prices into something concrete before you understand them. You move money in ways that make no economic sense in a stable currency environment but made complete sense during the months when the price of bread changed between morning and afternoon. The habits of survival outlast the crisis that produced them.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft39HyperLate', true) },
  },

  // ─── POST-SOVIET SHOCK: WHAT THE GUARANTEE MEANT ─────────────────────────────

  {
    id: 'ft39_post_soviet_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('post_soviet_shock') &&
      G.age >= 55 &&
      !G.mem?.ft39PostSovietLate,
    text: 'The state guaranteed certain things — work, housing, medicine, a pension — and then the state stopped guaranteeing them. Not slowly but over months. The factories closed. The savings became worthless. The institutions that organised daily life — the enterprise, the collective, the clinic — either disappeared or charged fees they had not charged before. You were an adult with a career and a life built on certain assumptions, and the assumptions stopped being true. You rebuilt. Most people rebuilt. But rebuilding is not the same as not having lost anything. You are alert to the fragility of economic arrangements in a way that people who grew up after the transition are not.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft39PostSovietLate', true) },
  },

  // ─── APARTHEID PRIVILEGED: THE ONGOING ACCOUNTING ────────────────────────────

  {
    id: 'ft39_apartheid_privileged_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('apartheid_privileged') &&
      G.currentYear >= 1994 &&
      G.age >= 45 &&
      !G.mem?.ft39AparPrivLate,
    text: 'The accounting is ongoing. The system ended and you are still here — still living in the neighbourhood, still with the education, still with the pension accumulation that started in decades when the system was arranged in your favour. The ANC government did not redistribute the way some had feared, which means the structural advantages largely persist. You have thought about this more than people outside this situation might expect. You have met people in your position who have not thought about it at all, who regard the political transition as the end of the matter. You do not regard it as the end of the matter.',
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 4; p.m -= 4; p.e += 3; p.setMem('ft39AparPrivLate', true) },
  },

  // ─── DROUGHT SURVIVOR: WATER AND WHAT IT MEANS ───────────────────────────────

  {
    id: 'ft39_drought_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('drought_survivor') &&
      G.age >= 35 &&
      !G.mem?.ft39DroughtLate,
    text: 'You do not waste water. This is not a value you hold — it is a reflex installed by the years when there was not enough. You turn taps off completely. You reuse what can be reused. You notice when others leave water running in a way that suggests they have never lived through the specific anxiety of watching a well level drop, of being told the reserve would last another three weeks. This knowledge has settled into your body and is now part of how you move through a day. You do not think about it. You just do not waste water.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('ft39DroughtLate', true) },
  },

  // ─── WITNESSED CLIMATE CHANGE: THE LONG TRANSFORMATION ───────────────────────

  {
    id: 'ft39_climate_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('witnessed_climate_change') &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      !G.mem?.ft39ClimateWitnessLate,
    text: 'You have a lifespan of comparison that younger people do not have. You remember the seasons as they were and you know what they are now. The river that was at a certain level when you were a child. The snow that used to stay until March. The bird that used to arrive at the same week every spring and now arrives earlier or does not arrive at all. This is not second-hand information from a report. It is your own memory laid against the present. The scientists\' data and your personal memory arrive at the same conclusion, which makes the conclusion feel different from data alone.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.m -= 3; p.setMem('ft39ClimateWitnessLate', true) },
  },

]

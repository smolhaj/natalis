// events_followthrough_85.js — Australia depth arc follow-throughs

export const FOLLOWTHROUGH_85_EVENTS = [

  // ── aus_stolen_generation ─────────────────────────────────────────────────

  {
    id: 'ft85_stolen_generation_reunion',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('aus_stolen_generation') &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft85StolnReunion,
    text: 'The return to country: some people find it, through Link-Up or the community organisations that emerged in the 1970s. Others do not find it, because the records were incomplete or destroyed, because the mission changed names, because the family has scattered. Whether you find the mother or the community or the language — the search itself is the thing your life organises around for years. It is not a reunion, exactly. It is the building of something in the space where something was taken.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 5
      p.e += 3
      p.setMem('ft85StolnReunion', true)
    },
  },

  {
    id: 'ft85_stolen_generation_apology_2008',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('aus_stolen_generation') &&
      G.currentYear >= 2008 &&
      G.age >= 50 &&
      !G.mem?.ft85StolnApology,
    text: 'February 13, 2008, in Parliament in Canberra, Rudd says it: we apologise. You have waited decades for a government to say it, and the waiting has gone from rage to bitterness to something like exhaustion. The apology is real. What it changes, in the gap in life expectancy and in prisons and in children still being taken, is a separate account.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 6
      p.setMem('ft85StolnApology', true)
    },
  },

  // ── ten_pound_pom_generation ──────────────────────────────────────────────

  {
    id: 'ft85_ten_pound_pom_return',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ten_pound_pom_generation') &&
      G.currentYear >= 1980 &&
      G.age >= 50 &&
      !G.mem?.ft85TenPoundReturn,
    text: 'You go back for the first time since you left. England is smaller and greyer and more crowded than the bright country in the films they showed at Bonegilla. It is also more familiar than you expected. You have been Australian for thirty years. What is still English in you comes up here the way an accent comes up when you are tired.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 5
      p.setMem('ft85TenPoundReturn', true)
    },
  },

  // ── aus_1967_generation ───────────────────────────────────────────────────

  {
    id: 'ft85_1967_forty_years_on',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('aus_1967_generation') &&
      G.currentYear >= 2007 &&
      G.age >= 55 &&
      !G.mem?.ft85Ref67Late,
    text: 'Forty years since the referendum: the speeches, the commemorations, the list of what changed. You are counted in the census now; that is what the vote did. The life expectancy gap of twenty years is what it did not do. You have been keeping this account for forty years and you know which column everything goes in.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft85Ref67Late', true)
    },
  },

  // ── aus_mardi_gras_original ───────────────────────────────────────────────

  {
    id: 'ft85_mardi_gras_becomes_festival',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('aus_mardi_gras_original') &&
      G.currentYear >= 1990 && G.currentYear <= 2005 &&
      G.age >= 30 &&
      !G.mem?.ft85MardiGrasFestival,
    text: 'By the nineties the Mardi Gras has become the Mardi Gras. The police are not charging anymore. There are corporate floats, international tourists, prime ministers in spectator chairs. You remember what the night it started actually was. The amnesia is not total — the archives exist, the people who were arrested exist — but the festivity has a way of sitting in front of the history that produced it. You find yourself explaining the origin at dinner parties to people who came to Sydney specifically for the parade.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.setMem('ft85MardiGrasFestival', true)
    },
  },

  // ── aus_cronulla_generation ───────────────────────────────────────────────

  {
    id: 'ft85_cronulla_decade_on',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('aus_cronulla_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 30 &&
      !G.mem?.ft85CronullaDecade,
    text: 'Ten years after Cronulla there have been the inquiry and the recommendations, and the argument about the talkback radio that turned up the heat for a week beforehand. The picture that stays is a flag in one hand and the other hand hitting someone. You are still working out what to do with that picture. The flag means too many things now to mean only one.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft85CronullaDecade', true)
    },
  },

  // ── aus_voice_generation ──────────────────────────────────────────────────

  {
    id: 'ft85_voice_aftermath',
    phase: null,
    weight: 2,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('aus_voice_generation') &&
      G.currentYear >= 2024 &&
      G.age >= 25 &&
      !G.mem?.ft85VoiceAftermath,
    text: 'After the referendum: what now. The question the Yes campaign asked — constitutional recognition plus a consultative body — has been answered. The government says a treaty is not on the immediate agenda. The community organisations keep doing the work they were doing before the campaign. The gap in life expectancy, in incarceration, in child removal: these are the same numbers after the referendum as before. You are watching a country absorb a decision and trying to understand what the absorption means.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft85VoiceAftermath', true)
    },
  },

]

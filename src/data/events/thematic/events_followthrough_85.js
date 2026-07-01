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
    text: 'Rudd says the word on February 13, 2008. Parliament. "We apologise." You have waited decades for a government to say it. The waiting changed shape over the years — from rage to bitterness to something closer to exhaustion to this, watching a politician say a word in a building in Canberra. The apology is real. What it changes in practice — the gap in life expectancy, in incarceration, in child removal that has continued — is the accounting that runs beneath the word.',
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
    text: 'You go back. The first time since you left — a holiday, a package deal, an inheritance of curiosity. England is not the same as the England your parents described in the migrant hostel at Bonegilla. It has become smaller, greyer, more crowded than the clean bright country in the promotional films. It is also more familiar than you expected. You have been Australian for thirty years. What remains British in you surfaces in England the way an accent surfaces when you are tired.',
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
    text: 'The anniversary. Forty years since the referendum. The speeches, the commemorations, the accounting of what changed and what did not change. You are counted in the census now, which is the thing the vote did. The life expectancy gap — twenty years less than non-Indigenous Australians — is the thing the vote did not do. You have been doing this accounting for forty years. You know what column each item goes in.',
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
    text: 'A decade out from Cronulla the analysis has accumulated. The inquiry. The recommendations. The question of whether the talkback radio that ran the temperature up for weeks bore a particular responsibility. The Australian flag as symbol of the beach-crowd is the image that persists — what it meant to hold the flag in one hand and assault someone with the other. You are still doing the accounting of that image. The flag means too many things now to mean only one of them.',
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
    phase: 'midlife',
    weight: 2,
    when: (G) =>
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

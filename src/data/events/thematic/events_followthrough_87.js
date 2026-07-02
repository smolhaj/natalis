// events_followthrough_87.js — New Zealand depth arc follow-throughs

export const FOLLOWTHROUGH_87_EVENTS = [

  // ── nz_waitangi_generation ─────────────────────────────────────────────────

  {
    id: 'ft87_waitangi_settlement_1990s',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_waitangi_generation') &&
      G.currentYear >= 1994 &&
      G.age >= 45 &&
      !G.mem?.ft87WaitangiSettlement,
    text: 'The Waikato-Tainui settlement comes in 1995: $170 million and land. The Ngāi Tahu settlement in 1998: the same. The Crown apologies are read in Parliament. You have been watching the process for twenty years. The settlements are less than what was taken. They are more than many thought the Crown would give. You accept the partial thing because the partial thing is what exists, and because you have been told often enough that accepting it is not the same as agreeing that it was ever acceptable.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 4
      p.setMem('ft87WaitangiSettlement', true)
    },
  },

  // ── nz_dawn_raids_generation ───────────────────────────────────────────────

  {
    id: 'ft87_dawn_raids_apology_2021',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_dawn_raids_generation') &&
      G.currentYear >= 2021 &&
      G.age >= 55 &&
      !G.mem?.ft87DawnRaidsApology,
    text: 'Jacinda Ardern apologises in Parliament in August 2021. Forty-seven years. The word "racist" is used — she says the raids "were wrong, they were discriminatory, and they were racist." You are watching on television, in your seventies, and you know what is in the apology and what is not. The past is not undone. The families who were deported did not come back. But the word "racist" said in Parliament about what was done to your community is not nothing, and you let that land alongside what remains.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 5
      p.setMem('ft87DawnRaidsApology', true)
    },
  },

  // ── nz_homosexual_reform_generation ──────────────────────────────────────

  {
    id: 'ft87_marriage_equality_2013',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_homosexual_reform_generation') &&
      G.currentYear >= 2013 &&
      G.age >= 40 &&
      !G.mem?.ft87NZMarriage,
    text: 'The Marriage (Definition of Marriage) Amendment Act passes 77–44 on 17 April 2013. The public gallery breaks into song — "Pōkarekare Ana." You remember 1986 when the first bill passed and you were in your twenties. Twenty-seven years is a long arc but you have lived the whole length of it. The people who signed the petition of 800,000 are still there; the country voted differently this time. You think of the ones who did not live to see it, and you let yourself feel the full distance between then and now.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r += 3
      p.setMem('ft87NZMarriage', true)
    },
  },

  // ── nz_erebus_generation ──────────────────────────────────────────────────

  {
    id: 'ft87_erebus_mahon_vindicated',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_erebus_generation') &&
      G.currentYear >= 1984 &&
      G.age >= 30 &&
      !G.mem?.ft87Erebus,
    text: 'The Privy Council overturns Air New Zealand\'s defamation win against Justice Mahon in 1983. The "orchestrated litany of lies" stands. The airline had changed the coordinates; the crew flew into the mountain not knowing the flight path had been altered. You followed the years of legal argument. The vindication does not bring 257 people back. It establishes that what happened was not error but concealment — and that distinction, which you could not quite explain why it mattered so much, goes on mattering.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 2
      p.setMem('ft87Erebus', true)
    },
  },

  // ── nz_pike_river_generation ──────────────────────────────────────────────

  {
    id: 'ft87_pike_river_reentry_2019',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nz_pike_river_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 40 &&
      !G.mem?.ft87PikeRiver,
    text: 'The Pike River drift is re-entered in May 2019, nine years after the explosion. Cameras go in. Evidence is recovered. The bodies of the twenty-nine men are not. The mine remains sealed. Families who have been fighting for re-entry stand at the gate again, as they have at every anniversary. Some say the evidence recovered will help the prosecution. Some say they needed someone to try. The criminal proceedings continue. The twenty-nine are where they have been since November 2010, and the gate is where the families stand.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 5
      p.setMem('ft87PikeRiver', true)
    },
  },

]

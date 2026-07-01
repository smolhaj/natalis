// events_followthrough_79.js — Romania depth arc follow-throughs

export const FOLLOWTHROUGH_79_EVENTS = [

  // ── rom_systematization_displaced ────────────────────────────────────────────

  {
    id: 'ft79_systematization_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_systematization_displaced') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft79SystemLate,
    text: 'The Palace of the Parliament sells tickets now. Tourists walk the corridors of the building for which your neighbourhood was demolished. The guide mentions the 700,000 tonnes of steel and the 1,100 rooms and does not mention the Uranus quarter or the Văcărești monastery or the families who received an apartment assigned by the state and were expected to understand this as exchange. You do not buy a ticket.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft79SystemLate', true)
    },
  },

  {
    id: 'ft79_systematization_reckoning',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('rom_systematization_displaced') &&
      G.currentYear >= 1995 &&
      G.age >= 35 &&
      !G.mem?.ft79SystemReckoning,
    text: 'Someone asks you what the old neighbourhood was like. You describe it and they listen and then say it is a shame it is gone. The phrase does not quite reach the thing. It was a neighbourhood. People had lived in those buildings for three generations. The boulevard that replaced it is wide and you feel nothing when you walk it.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.setMem('ft79SystemReckoning', true)
    },
  },

  // ── rom_timisoara_generation ──────────────────────────────────────────────────

  {
    id: 'ft79_timisoara_revolution_start',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_timisoara_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 25 &&
      !G.mem?.ft79TimisoaraStart,
    text: 'You tell someone how the revolution started. They expect a certain kind of story — workers, an organised opposition, a party cadre who switched sides. You tell them it started with a congregation forming a human chain around a Hungarian Reformed pastor because the Securitate had come to arrest him. The revolution that ended the regime began as the defence of one person by people who stood in front of his door. The person asking finds this surprising. You find that they find it surprising.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft79TimisoaraStart', true)
    },
  },

  {
    id: 'ft79_timisoara_late_life',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_timisoara_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft79TimisoaraLate,
    text: 'Twenty years after the revolution, thirty years after the revolution — the anniversary comes. There are speeches. The surviving participants are asked to speak. You notice that what is commemorated tends to be the December 22nd moment in Bucharest: the helicopter, the balcony, the trial. The December 16th moment in Timișoara — the human chain, the congregants standing in front of a door — receives less ceremony. You know which moment came first.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.setMem('ft79TimisoaraLate', true)
    },
  },

  // ── rom_decree_generation ─────────────────────────────────────────────────────

  {
    id: 'ft79_orphan_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_decree_generation') &&
      G.currentYear >= 1988 &&
      G.age >= 18 &&
      !G.mem?.ft79OrphanAdult,
    text: 'You are out of the institution. The institution\'s specific logic — fade, wait, need very little — is still in you. You navigate the outside world with it, which is a way of navigating that works in some situations and is not understood in others. Someone who grew up in a family home asks why you are so self-contained. The explanation is longer than the conversation allows for.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 6
      p.e += 3
      p.setMem('ft79OrphanAdult', true)
    },
  },

  {
    id: 'ft79_orphan_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('rom_decree_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 30 &&
      !G.mem?.ft79OrphanMidlife,
    text: 'The Western documentaries about the Romanian orphanages of the 1990s still appear occasionally. The footage: the rows of cots, the children rocking, the specific vacancy in the eyes that the cameras caught. You watch them with the knowledge that this footage is about people like you, which is not the same as the footage being about you. You have built a life. The footage does not capture what comes after the footage.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft79OrphanMidlife', true)
    },
  },

  // ── rom_mineriad_generation ───────────────────────────────────────────────────

  {
    id: 'ft79_mineriad_pattern',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_mineriad_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 25 &&
      !G.mem?.ft79MineriPattern,
    text: 'The pattern becomes clear over the decade: the regime changed, but when a government feels threatened by protesters in a public square, it sends men with clubs. The men in clubs are different men — miners in 1990, not Securitate — but the logic is the same logic. The conclusion you draw from this is available from the evidence but most people in your country prefer not to draw it until much later.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 4
      p.addFlag('rom_democratic_disillusionment')
      p.setMem('ft79MineriPattern', true)
    },
  },

  {
    id: 'ft79_mineriad_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('rom_mineriad_generation') &&
      G.flags.has('rom_democratic_disillusionment') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft79MineriLate,
    text: 'Ion Iliescu was eventually indicted for crimes against humanity for ordering the miners into Bucharest. This was 2019. The events of June 1990 took until 2019 to reach a criminal indictment. Whether the indictment reaches a conviction you do not know. The specific pace of post-communist accountability is a thing you have come to understand very precisely over the decades.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.setMem('ft79MineriLate', true)
    },
  },

  // ── rom_file_opened ───────────────────────────────────────────────────────────

  {
    id: 'ft79_file_presence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_file_opened') &&
      G.currentYear >= 2005 &&
      G.age >= 35 &&
      !G.mem?.ft79FilePresence,
    text: 'The knowledge of who was in the file is with you at family gatherings, at funerals, at the occasions that do not stop occurring. The person whose handwriting you recognised is there. You have not said anything. The relationship is what the relationship is with the knowledge inside it. This is the arrangement you have made. You have not decided whether it is the right arrangement. You have decided it is the arrangement.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft79FilePresence', true)
    },
  },

  {
    id: 'ft79_file_late_question',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('rom_file_opened') &&
      G.currentYear >= 2015 &&
      G.age >= 60 &&
      !G.mem?.ft79FileLate,
    text: 'In late life the question comes back differently. At the time you were in the middle of it — the discovery of the handwriting, the choice of what to do with the knowledge. Now you are outside it in a way that only time provides. You think: that person reported on you to the Securitate. The regime required it or incentivised it or threatened them until they did. The regime is gone. The person is still here. The question of what you owe them and what they owe you is not one the CNSAS process answers.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft79FileLate', true)
    },
  },

  // ── rom_italian_emigrant ──────────────────────────────────────────────────────

  {
    id: 'ft79_italy_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_italian_emigrant') &&
      G.currentYear >= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft79ItalyYears,
    text: 'You have been in Italy for years now. The exchange rate still works. You have sent money home for long enough that the calculation is automatic: what you earn here, what it buys there, what it costs to be here and not there. Your Italian is functional. You know the neighbourhood, the bus route, the Romanian Sunday mass. You are good at this life. The goodness at it is a different thing from wanting it.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.w += 2
      p.setMem('ft79ItalyYears', true)
    },
  },

  {
    id: 'ft79_italy_return_question',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_italian_emigrant') &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      !G.mem?.ft79ItalyReturn,
    text: 'The question of returning becomes real in late life in a way it was not real in earlier life. Parents are older. The village has specific people in it who will not be there much longer. The calculation you made when you left — that leaving was the right calculation — was made in one set of conditions. The conditions have changed enough that the calculation can be made again. You make it again. The answer is not the same as the first time.',
    choices: [
      {
        text: 'You decide to go back',
        tag: null,
        outcome: 'The return is not the homecoming that the idea of the return was. It is itself a new situation, in a place that moved on while you were gone, with the person you have become after the years away.',
        effect: (p) => {
          p.r += 4
          p.m += 3
          p.addFlag('rom_returned_emigrant')
          p.setMem('ft79ItalyReturn', true)
        },
      },
      {
        text: 'You stay in Italy',
        tag: null,
        outcome: 'The decision to stay is also a decision about where the years have put you. Italy is where your life is now. The place where your life is and the place you are from are two different places. Most people you know from there have made the same calculation.',
        effect: (p) => {
          p.r += 5
          p.m -= 2
          p.setMem('ft79ItalyReturn', true)
        },
      },
    ],
    effect: null,
  },

  // ── rom_hungarian_minority ────────────────────────────────────────────────────

  {
    id: 'ft79_hungarian_identity_question',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rom_hungarian_minority') &&
      G.currentYear >= 1995 &&
      G.age >= 30 &&
      !G.mem?.ft79HungarianId,
    text: 'The question of what you are has been answered differently by different authorities across the decades. The 1920 Treaty of Trianon made you Romanian. The communist state made you a national minority with theoretical protections and practical restrictions. After 1989 the Hungarian minority parties enter parliament and your language returns to more official spaces. You are still the same person. The legal category in which you exist keeps being revised by people who are not you.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft79HungarianId', true)
    },
  },

  {
    id: 'ft79_hungarian_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('rom_hungarian_minority') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft79HungarianLate,
    text: 'In Transylvania the question of whether you are Romanian or Hungarian has never resolved — it has only shifted in which direction the pressure comes from. In late life you find you have less patience for the pressure in both directions. You speak Hungarian in the street because it is your language. You speak Romanian when it is required. The question of which of these is the "real" language is a question asked by people who have only one.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft79HungarianLate', true)
    },
  },

]

// events_followthrough_72.js
// Follow-through events for Thailand depth flags.

export const FOLLOWTHROUGH_72_EVENTS = [

  // ── 1973 GENERATION ───────────────────────────────────────────────────────

  {
    id: 'ft72_tha_democratic_window',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('tha_1973_generation') &&
      G.currentYear >= 1974 && G.currentYear <= 1976 &&
      G.age >= 18 &&
      !G.mem?.ft72ThaWindow,
    text: 'October 1973 to October 1976, the window: a constitution, unions allowed, student newspapers, parties that actually compete. Left and right argue in print in the same country at the same time, and you know how unusual it is even while you are inside it. The argument about what Thailand should be is happening in the open. You do not know yet that in three years it will be closed again, violently.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.setMem('ft72ThaWindow', true)
    },
  },

  {
    id: 'ft72_tha_1976_aftermath',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('tha_1973_generation') &&
      G.currentYear >= 1977 &&
      G.age >= 25 &&
      !G.mem?.ft72Tha1976,
    text: 'After October 6, 1976, hundreds of students fled to the forest and joined the Communist Party of Thailand. Not from conviction — because there was nowhere else safe. The forests of the north and northeast sheltered a guerrilla movement for several years before an amnesty in 1978-80 allowed most to return. The people who made it back: some became academics, some became NGO workers, some entered mainstream politics. The people who did not make it back: some did not come home for other reasons. The democratic window was three years. The reckoning for the window was longer.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft72Tha1976', true)
    },
  },

  // ── ISAN MIGRANT ─────────────────────────────────────────────────────────

  {
    id: 'ft72_isan_late_life',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tha_isan_migrant') &&
      G.age >= 55 &&
      !G.mem?.ft72IsanLate,
    text: 'You have been in Bangkok longer than you were in the village. The calculation happens sometime in your fifties and it is strange: the place you are from is not the place you have spent most of your life. The concrete house in Roi Et or Udon Thani — the one the remittances built — has your name on the deed. Your children were born in Bangkok. They speak Isan with an accent. You speak Bangkok Thai without one, mostly. The village still calls you home for the big ceremonies. You are going to both funerals.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('ft72IsanLate', true)
    },
  },

]

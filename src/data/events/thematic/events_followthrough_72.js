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
    text: 'The three years between October 1973 and October 1976 are the democratic window. A constitution. Freedom to organize unions. Student newspapers. Political parties that compete rather than serve as facades. The left and the right are both visible in the same country simultaneously, arguing in print. It is unusual and you know it is unusual even while you are living inside it. The argument about what Thailand should be is happening in the open. You do not know yet that the argument will be closed again, violently, in three years.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.setMem('ft72ThaWindow', true)
    },
  },

  {
    id: 'ft72_tha_1976_aftermath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
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

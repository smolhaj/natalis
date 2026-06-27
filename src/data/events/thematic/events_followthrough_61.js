// events_followthrough_61.js
// Follow-throughs for Korea depth flags:
// IMF generation mid/late life, jeonse generation housing reckoning,
// hell Joseon generation — midlife naming, late-life assessment.

export const FOLLOWTHROUGH_61_EVENTS = [

  // ── IMF GENERATION: MID-LIFE ──────────────────────────────────────────────────

  {
    id: 'ft61_imf_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kr_dep_imf_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft61ImfMid,
    text: `You are old enough now to have watched the rebuilding from the inside. The GDP came back. The chaebol restructured — some of them. The labour market is different: more contract positions, more precarity in the place where permanent employment used to be, fewer people able to replicate what your parents' generation did by working for one company for forty years. The International Monetary Fund calls the 1997 recovery a success. The success is real in the aggregate numbers. What the numbers do not contain is the thing that broke in 1997 — the assumption that the floor was permanent — which has not been rebuilt.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft61ImfMid', true) },
  },

  {
    id: 'ft61_imf_late_life',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('kr_dep_imf_generation') &&
      G.age >= 55 &&
      !G.mem?.ft61ImfLate,
    text: `The IMF year is the year your children know as the year you never talk about directly but refer to obliquely — 'before' and 'after,' the way certain families talk about wars. You have watched the economy of this country produce growth statistics while your children negotiate job markets that reward credentials and return precarity. Whether the 1997 crisis caused this directly or whether it was already coming and the crisis accelerated it is a question you cannot finally answer. What you know is that something changed in the texture of what was possible and that the change was permanent.`,
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft61ImfLate', true) },
  },

  // ── JEONSE GENERATION: HOUSING ARC ───────────────────────────────────────────

  {
    id: 'ft61_jeonse_midlife_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kr_dep_jeonse_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft61JeonseMid,
    text: `You have been in two jeonse contracts now, or three. You know the calculation: the lump sum that earns nothing for you while it earns something for the landlord, the moment when the contract ends and you have to find another lump sum for another apartment or take what the landlord offers when they ask you to renew. A friend lost their deposit when the landlord was mortgaged above the building's value and the bank took everything. The friend's loss is a story you tell when people outside Korea ask you about the housing system and cannot immediately understand why you would not prefer monthly rent.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft61JeonseMid', true) },
  },

  {
    id: 'ft61_jeonse_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('kr_dep_jeonse_generation') &&
      G.age >= 55 &&
      !G.mem?.ft61JeonseLate,
    text: `Whether you finally own your apartment or not, you have spent decades inside the jeonse system's particular logic. The large sum moving between accounts. The period when your savings are not accessible because they are technically someone else's investment. The younger generation navigating jeonse fraud in the 2020s at a scale that required parliamentary inquiry. What you know of the system is specific and hard-won: it is a contract written in trust and not all landlords are trustworthy and the law takes time and your savings can be lost in the gap.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft61JeonseLate', true) },
  },

  // ── HELL JOSEON: GENERATION RECKONING ────────────────────────────────────────

  {
    id: 'ft61_hell_joseon_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kr_dep_hell_joseon') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft61HellJoseonMid,
    text: `By your late thirties the 'hell Joseon' framing has migrated from online forums to op-eds to government policy documents about the youth crisis. The government's response to the framing is demographic — the birth rate, now the lowest in the world, is the thing they discuss in parliament. The birth rate is not the cause. It is the measurement. The cause is the thing the hell Joseon framing named: a country that requires extraordinary effort for ordinary outcomes, that has built infrastructure and education that are world-class and distributed the returns to the effort in ways that do not reach everyone who put in the effort.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft61HellJoseonMid', true) },
  },

  {
    id: 'ft61_hell_joseon_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('kr_dep_hell_joseon') &&
      G.age >= 55 &&
      !G.mem?.ft61HellJoseonLate,
    text: `The phrase 'hell Joseon' is dated now — it belongs to a specific online moment in the 2010s. What it named has not dated. Your children or the people who are your children's age are navigating a version of the same structure you named when you were twenty-eight. The birth rate is what it is. The apartment prices are what they are. The competition for the chaebol positions is what it is. The name changes every generation. The thing the name is pointing at does not change at the same speed as the name for it.`,
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft61HellJoseonLate', true) },
  },

  // ── IMF + HELL JOSEON CROSSOVER ───────────────────────────────────────────────

  {
    id: 'ft61_imf_hell_joseon_crossover',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('kr_dep_imf_generation') &&
      G.flags.has('kr_dep_hell_joseon') &&
      G.age >= 35 &&
      !G.mem?.ft61ImfHellCross,
    text: `The two events form a line in your life: 1997 when the floor broke and the 2010s when your generation named the thing that the 1997 floor-breaking had accelerated. The permanent employment your parents' generation received, the company housing, the long tenure — these were already becoming rarer when the IMF crisis made them rarer faster. 'Hell Joseon' named the result. You were old enough to remember the cause and young enough to live in the result. This is a specific position, historically speaking.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.setMem('ft61ImfHellCross', true) },
  },

]

// events_followthrough_70.js
// Follow-through events for Brazil depth flags.

export const FOLLOWTHROUGH_70_EVENTS = [

  // ── MST GENERATION ────────────────────────────────────────────────────────

  {
    id: 'ft70_mst_title_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_mst_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 30 &&
      !G.mem?.ft70MSTTitle,
    text: 'Ten years after the encampment, the movement counts its dead. 1,635 activists killed in land conflicts since 1985, by the count that exists. The fazendeiro with the gunmen is rarely prosecuted. The land titles that did come came through the INCRA process — slow, contested, conditional. Your parcel, if you got one, is real. The system that produces the conflict is also real and mostly unchanged.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft70MSTTitle', true)
    },
  },

  {
    id: 'ft70_mst_bolsonaro',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_mst_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 45 &&
      !G.mem?.ft70MSTBolsonaro,
    text: 'Under Bolsonaro, the tempo of rural violence increases. FUNAI is gutted. Environmental agencies are hollowed. The MST is labelled a terrorist organization by certain legislators. You have been in this movement long enough to know that the labelling changes the legal terrain even when it doesn\'t change the facts on the ground. The movement has survived worse. The people who say this are the ones who remember the military years.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft70MSTBolsonaro', true)
    },
  },

  // ── LAVA JATO GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft70_lava_jato_moro_revelation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_lava_jato_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 30 &&
      !G.mem?.ft70LavaJatoMoro,
    text: 'The Intercept Brasil publishes the Vaza Jato material in June 2019: messages showing Judge Sérgio Moro coordinating with prosecutors, advising the timing of indictments, suggesting strategies. This is the evidence of the thing that was always suspected. It changes how the operation looks but not what it found. The corruption was in the record. The process was in the record now too. Both are facts and the facts do not cancel each other.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft70LavaJatoMoro', true)
    },
  },

  {
    id: 'ft70_lava_jato_lula_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_lava_jato_generation') &&
      G.currentYear >= 2023 &&
      G.age >= 45 &&
      !G.mem?.ft70LavaJatoLula,
    text: 'Lula is inaugurated for the third time in January 2023, four years after he was imprisoned. The Supreme Court annulment is upheld; the case goes through its legal iterations. The phrase people use — that the conviction was political — is both supported by the evidence and disputed by the evidence. Brazil has elected a man who was in prison two elections ago. The country\'s capacity to contain its own contradictions is remarkable or exhausting depending on the year.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 3
      p.setMem('ft70LavaJatoLula', true)
    },
  },

  // ── QUILOMBOLA GENERATION ─────────────────────────────────────────────────

  {
    id: 'ft70_quilombo_title_still_pending',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_quilombola_generation') &&
      G.currentYear >= 2005 &&
      G.age >= 25 &&
      !G.mem?.ft70QuilomboTitle,
    text: 'The title is still under review. This is true twenty years after the 1988 Constitution and thirty years after and, in many cases, thirty-five years after. INCRA is underfunded. The ruralista bancada in Congress has successfully stalled the federal titling process. There are 6,300 quilombola communities identified in Brazil; fewer than 5% have full title. Your community is in the majority. You explain the situation to your children and hear yourself using the same words your mother used.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft70QuilomboTitle', true)
    },
  },

  // ── SOY GENERATION ────────────────────────────────────────────────────────

  {
    id: 'ft70_soy_water_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bra_soy_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 45 &&
      !G.mem?.ft70SoyWater,
    text: 'The Cantareira system in São Paulo runs dry in 2014-2015 — the worst drought in eighty years in the region. The connection between cerrado conversion and downstream water security is in the hydrological models and visible in the empty reservoir. The São Paulo that is having a water crisis is the São Paulo that depends on rivers that begin in the cerrado. The cerrado that was converted to soy is the cerrado that no longer holds water. The chain is not complicated. The political economy of soy is also not complicated. They operate on different timescales and nothing has been resolved.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft70SoyWater', true)
    },
  },

]

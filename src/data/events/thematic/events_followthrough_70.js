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
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('bra_mst_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 45 &&
      !G.mem?.ft70MSTBolsonaro,
    text: 'Under Bolsonaro the violence in the countryside quickens. FUNAI and the environmental agencies are hollowed out, and some deputies call the movement terrorists. You have been in it long enough to know that a label changes the law around you even when nothing on the ground changes. The movement has survived worse, say the ones who remember the generals.',
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
    phase: null,
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('bra_quilombola_generation') &&
      G.currentYear >= 2005 &&
      G.age >= 25 &&
      !G.mem?.ft70QuilomboTitle,
    text: 'The title is still under review, twenty years after the 1988 Constitution promised it, and thirty, and for many thirty-five. INCRA has no money and the landowners\' bloc in Congress has stalled the process. Your community is among the many still waiting. You explain it to your children and hear yourself using your mother\'s words.',
    context: 'Brazil has identified more than 6,000 quilombola communities; fewer than one in twenty held full title to their land.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('bra_soy_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 45 &&
      !G.mem?.ft70SoyWater,
    text: 'In 2014 the Cantareira reservoirs that supply São Paulo run nearly dry, the worst drought there in eighty years. The rivers that fill them begin in the cerrado, and the cerrado that was cleared for soy no longer holds water. The chain is not complicated. Neither is the politics of soy. They run on different clocks, and nothing has been settled.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft70SoyWater', true)
    },
  },

]

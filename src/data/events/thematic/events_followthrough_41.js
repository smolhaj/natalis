// events_followthrough_41.js — Sweden depth follow-throughs (5 events)
// Callbacks for: swe_wwii_neutral_generation, swe_palme_generation,
// swe_welfare_retrenchment_generation, swe_democrats_era

export const FOLLOWTHROUGH_41_EVENTS = [

  // ─── WWII NEUTRALITY: LATE RECKONING ─────────────────────────────────────────

  {
    id: 'ft41_wwii_neutral_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('swe_wwii_neutral_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 65 &&
      !G.mem?.ft41WwiiNeutralLate,
    text: 'The historians have now largely settled what happened, even if what to make of it remains open. Sweden sold iron ore to Germany through 1944. Swedish railways carried German troops north and south for three years. The Swedish state knew what the transits were for. The conversation about this has been conducted mostly in books, documentaries, parliamentary reports — not in the register of a country doing penance, more in the register of a country auditing itself. You have audited yourself too, across the decades. The audit does not produce a verdict so much as a more complicated picture than the one you were given.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.karma += 2; p.setMem('ft41WwiiNeutralLate', true) },
  },

  // ─── PALME: THE CASE REOPENED AND WHAT IT MEANT ──────────────────────────────

  {
    id: 'ft41_palme_investigation_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('swe_palme_generation') &&
      G.currentYear >= 1990 && G.currentYear <= 2019 &&
      G.age >= 35 &&
      !G.mem?.ft41PalmeInvestYears,
    text: 'The investigation has now been running for years without a conviction. Names surface: a Kurd, a police officer, a South African agent, a security service faction. Each name generates scrutiny, then doubt, then dismissal. The thing about an unsolved murder of a head of government in a peaceful country is that it keeps proposing explanations and the explanations keep failing. The country has learned to carry this. You carry it too — the knowledge that the most public death of the Swedish postwar era has no answer, and may never have one. The not-knowing is now part of what Sweden is.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 5; p.e += 2; p.setMem('ft41PalmeInvestYears', true) },
  },

  // ─── WELFARE RETRENCHMENT: THE LONG SHADOW ────────────────────────────────────

  {
    id: 'ft41_welfare_retrenchment_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('swe_welfare_retrenchment_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft41WelfareRetrenLate,
    text: 'The cuts of 1992–94 were never fully restored. The welfare state that exists now is a different thing from the one that existed before — the sick pay cap is still lower, the housing allowances still less generous, the sense that the state would catch you unconditionally has been replaced by a sense that the state will catch you within parameters. You have made your peace with this or you have not. The debate about what the *folkhem* was — a specific postwar economic moment that passed, or a commitment that was surrendered — has continued for thirty years and is not resolved. You have your answer, which is probably not the same as your neighbour\'s.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft41WelfareRetrenLate', true) },
  },

  // ─── SWEDEN DEMOCRATS: THE RECKONING ─────────────────────────────────────────

  {
    id: 'ft41_democrats_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('swe_democrats_era') &&
      G.currentYear >= 2022 &&
      G.age >= 55 &&
      !G.mem?.ft41DemocratsReckoning,
    text: 'The party is now in the governing coalition in all but name — votes are negotiated, the government depends on their support. The question you watched form over twelve years has now produced an answer that was previously unthinkable: the Sweden Democrats are normal. Not acceptable to everyone, not free of their history, but normal in the parliamentary sense, which means consequential. You think about the distance from 1988 to now. You think about what normal means and how it arrives. You think about the specific Swedish consensus that treated immigration as a humanitarian question rather than a political one, and what it means that the consensus did not hold.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.e += 3; p.setMem('ft41DemocratsReckoning', true) },
  },

  // ─── PALME GENERATION: AFTER THE CLOSE ──────────────────────────────────────

  {
    id: 'ft41_palme_after_close',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('swe_palme_generation') &&
      G.currentYear >= 2021 &&
      G.age >= 55 &&
      G.mem?.swePalmeResolved &&
      !G.mem?.ft41PalmeAfterClose,
    text: 'The case is closed. Stig Engström is the answer the prosecution settled on. He is dead. You have had a year or two to sit with this and you can say now what you actually feel about it, which is not exactly relief and not exactly closure. Closure would require a trial. A trial would require a living suspect. The case closed administratively around a dead man who cannot be questioned, cannot contest the evidence, cannot be convicted or acquitted. Sweden got a probable explanation, not a confirmed one. The thirty-four-year open wound is now more precisely a thirty-four-year open wound with a bandage over it. You can see the edges.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.e += 2; p.setMem('ft41PalmeAfterClose', true) },
  },

]

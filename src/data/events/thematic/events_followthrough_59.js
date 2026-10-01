// events_followthrough_59.js
// Follow-throughs for Russia depth flags:
// terror generation in late life, CHSIR in late life, kommunalka echo,
// thaw believer / thaw sceptic in late life, blat in late life,
// 1990s generation reckoning, Chechnya veteran late life.

export const FOLLOWTHROUGH_59_EVENTS = [

  // ── GREAT TERROR LATE-LIFE ────────────────────────────────────────────────────

  {
    id: 'ft59_terror_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_terror_generation') &&
      G.age >= 55 &&
      G.currentYear >= 1960 &&
      !G.mem?.ft59TerrorLate,
    text: `The certificate comes years after Stalin is dead: unjustly convicted, posthumously rehabilitated. The state has acknowledged what it did. You have lived with that for decades already, and kept the original record in your head, which needed no correction. Posthumously rehabilitated: a correction that arrives too late to correct anything.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft59TerrorLate', true) },
  },

  // ── CHSIR: FAMILY OF ARRESTED — LATE LIFE ────────────────────────────────────

  {
    id: 'ft59_chsir_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_chsir') &&
      G.age >= 55 &&
      !G.mem?.ft59ChsirLate,
    text: `All your life you filled in forms with a version of your father that could be documented: accurate about what could be checked, silent about everything else. You became expert in the technically true answer. "Member of the family of a traitor to the Motherland" was abolished as a category decades ago. The habit of the careful answer has outlived the system that required it.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 1; p.setMem('ft59ChsirLate', true) },
  },

  // ── KOMMUNALKA: FIRST PRIVATE APARTMENT ──────────────────────────────────────

  {
    id: 'ft59_kommunalka_own_apartment',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ru_dep_kommunalka_generation') &&
      G.age >= 28 && G.age <= 50 &&
      G.currentYear >= 1955 && G.currentYear <= 1985 &&
      !G.mem?.ft59KommunalkaOwn,
    text: `Five floors, no lift, walls thin enough to hear the neighbours cough, and a small kitchen that belongs to nobody but you. A khrushchovka, after the man who ordered them built by the million so a family could have a door of its own. You do not know these neighbours the way you knew the ones in the kommunalka. The door closes and the flat is quieter than anywhere you have lived, and for a while you do not know what to do with the quiet.`,
    choices: null,
    effect: (p) => { p.m += 6; p.r -= 2; p.setMem('ft59KommunalkaOwn', true) },
  },

  {
    id: 'ft59_kommunalka_late_memory',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_kommunalka_generation') &&
      G.age >= 55 &&
      !G.mem?.ft59KommunalkaLate,
    text: `You think about the kommunalka sometimes: the shared kitchen, the cleaning roster on the wall, a family behind every door. That life gave you a knowledge of other people that you did not choose, about proximity and about what you owe to the person at the next burner. You are not sure a building with one family per door teaches it. It is not nostalgia, exactly.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('ft59KommunalkaLate', true) },
  },

  // ── THAW BELIEVER: LATE-LIFE RECKONING ───────────────────────────────────────

  {
    id: 'ft59_thaw_believer_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_thaw_believer') &&
      G.age >= 50 &&
      !G.mem?.ft59ThawBelieverLate,
    text: `After 1956 you believed the system could correct itself. The Brezhnev years were a long lesson in the limits of that: the tanks in Prague, and every year a little less that could be published or said at a conference. The thaw had been administered, and what the state turned up it could turn down. By fifty you had a complete account of why you had been wrong. It did not comfort you.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft59ThawBelieverLate', true) },
  },

  // ── THAW SCEPTIC: LATE-LIFE CONFIRMATION ─────────────────────────────────────

  {
    id: 'ft59_thaw_sceptic_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_thaw_sceptic') &&
      G.age >= 50 &&
      !G.mem?.ft59ThawScepticLate,
    text: `You were right about the thaw. The secret speech showed you how the system admits a mistake: carefully, partly, without disturbing who is in charge, and Prague in 1968 confirmed the rest. You spent your adult life inside the thing you understood correctly. Being right about it was private, and it changed nothing about the walls.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 1; p.setMem('ft59ThawScepticLate', true) },
  },

  // ── BLAT: POST-SOVIET RECKONING ───────────────────────────────────────────────

  {
    id: 'ft59_blat_post_soviet',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ru_dep_blat_generation') &&
      G.currentYear >= 1993 && G.currentYear <= 2005 &&
      G.age >= 35 &&
      !G.mem?.ft59BlatPostSoviet,
    text: `The market arrived and made the blat network obsolete in theory. In practice: the connections that got things done under the Soviet system became the connections that accumulated capital in the 1990s. The people who had the networks had the information about which enterprises were worth acquiring before the auction. The voucher privatization worked out better for people who already knew the right people. The form of the system changed. The underlying logic — who you know determines what you get — turned out to be more durable than the system that produced it.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.setMem('ft59BlatPostSoviet', true) },
  },

  // ── 1990S GENERATION: STABILISATION RECKONING ────────────────────────────────

  {
    id: 'ft59_1990s_putin_order',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('ru_dep_1990s_generation') &&
      G.currentYear >= 2001 && G.currentYear <= 2010 &&
      G.age >= 25 &&
      !G.mem?.ft59_1990sPutinOrder,
    text: `The Putin decade: a wage that arrives, a supermarket with things in it, a city where the kiosks have been replaced by proper shops. The word is "stability." You remember the previous decade well enough to understand what stability means by contrast. The quality of the 2000s is that they are not the 1990s. That is most of what is meant. The things given up for the stability are harder to specify — the press freedom, the opposition parties, the courts — because you also remember what press freedom and opposition parties looked like in the 1990s, and that memory makes the loss less clean.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft59_1990sPutinOrder', true) },
  },

  // ── CHECHNYA VETERAN: LATE-LIFE ───────────────────────────────────────────────

  {
    id: 'ft59_chechnya_late',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_chechnya_generation') &&
      G.age >= 45 &&
      !G.mem?.ft59ChechnyaLate,
    text: `Officially it was a counter-terrorist operation. Some called Khasavyurt a defeat and some called it a way out, and then in 1999 the second war began, and then the Kadyrov arrangement made Chechnya quiet, officially. Every stage of it ended differently from what you expected at the stage before. The war has a different name now. The mountains are the same.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft59ChechnyaLate', true) },
  },

]

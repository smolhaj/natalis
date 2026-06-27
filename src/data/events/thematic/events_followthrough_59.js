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
    text: `The rehabilitation documents came years after Stalin died. A certificate: unjustly convicted, posthumously rehabilitated. The state has acknowledged something about what it did. You have been living with the thing the state acknowledged for decades already. The certificate changes the official record. The record in your memory does not require correction — you kept the original. The phrase "posthumously rehabilitated" names a category of absurdity that the Soviet system specialised in producing: the correction that arrives too late to correct anything.`,
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
    text: `Your whole life you answered forms with a version of your father that was documentable. Not false — carefully accurate about what could be verified, silent about what could not. You mastered the art of the technically true answer. In late life the forms ask different questions. The category that followed you — "member of the family of a traitor to the Motherland" — has been formally abolished for decades. Formally. The habit of the careful answer persists longer than the system that required it.`,
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
    text: `The Khrushchev-era apartment building: five floors, no lift, thin walls, a small kitchen that is yours alone. The Khrushchovka, they call it — after the man who ordered them built in vast numbers so that families could have a door that was only theirs. The walls are thin enough to hear the neighbours. You do not know the neighbours the way you knew the kommunalka neighbours. The kitchen is small. It does not matter that it is small. It is yours. The door closes and the apartment is quiet in a way that it was never quiet before and you do not know what to do with the quiet for a while.`,
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
    text: `The kommunalka — you think about it sometimes as a specific texture that no longer exists in the city. The shared kitchen, the roster on the wall for cleaning, the families in their rooms. People who grew up in them and people who did not understand each other about something that could not be described. Not nostalgia exactly. More like: that life produced a specific knowledge of other people, an intimacy that was not chosen, that shaped how you understand proximity and obligation. You are not sure the apartment building with one family per door produces the same knowledge. You did not choose the kommunalka. The knowledge it gave you was not chosen either.`,
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
    text: `After 1956 you believed the system could correct itself. The Brezhnev years were a long education in the specific limits of that belief. The tanks in Prague in 1968. The narrowing of what could be published, what could be performed, what could be said at conferences. The thaw turned out to be administered — the state had turned the temperature up and the state could turn it back down. By the time you were fifty you had a complete theory of why you were wrong in 1956. The theory did not comfort you. It was just accurate.`,
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
    text: `You were right about what the thaw was. The secret speech showed you how the system acknowledged error — carefully, partially, in ways that did not destabilise the structure of who was in charge. Prague in 1968 confirmed the rest. The wall held until 1989 and what came after was not what anyone had planned in 1956. Being right about a system's limits is not a pleasant form of rightness. You spent your adult life inside the thing you correctly understood. The correctness was private. It did not change the walls.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ru_dep_1990s_generation') &&
      G.currentYear >= 2001 && G.currentYear <= 2010 &&
      G.age >= 25 &&
      !G.mem?.ft59_1990sPutinOrder,
    text: `The Putin decade: a wage that arrives, a supermarket with things in it, a city where the kiosks have been replaced by proper shops. The word is "stability." You remember the previous decade well enough to understand what stability means by contrast. The specific quality of the 2000s is that they are not the 1990s. That is most of what is meant. The things given up for the stability are harder to specify — the press freedom, the opposition parties, the courts — because you also remember what press freedom and opposition parties looked like in the 1990s, and that memory makes the loss less clean.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft59_1990sPutinOrder', true) },
  },

  // ── CHECHNYA VETERAN: LATE-LIFE ───────────────────────────────────────────────

  {
    id: 'ft59_chechnya_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ru_dep_chechnya_generation') &&
      G.age >= 45 &&
      !G.mem?.ft59ChechnyaLate,
    text: `The war you came back from was called a "counter-terrorist operation" in the official language. The Khasavyurt accord was called a defeat by some and a necessary exit by others. Then the second war began in 1999. Then Chechnya became quieter, officially — the Kadyrov arrangement. What you came back from in 1996 or 1997 had a different ending than you expected when you left, which was itself different from what you expected in the middle of it. The war has been going on in different forms since before you served. The form it is in now has a different name. The mountains are the same.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft59ChechnyaLate', true) },
  },

]

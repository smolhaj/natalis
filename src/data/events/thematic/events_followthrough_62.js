// events_followthrough_62.js
// Follow-throughs for Kenya depth flags:
// matatu generation late-life, Westgate aftermath, runner generation late arc.

export const FOLLOWTHROUGH_62_EVENTS = [

  // ── MATATU GENERATION ─────────────────────────────────────────────────────────

  {
    id: 'ft62_matatu_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ken_dep_matatu_generation') &&
      G.age >= 55 &&
      !G.mem?.ft62MatLate,
    text: `The BRT — the bus rapid transit line on Thika Road, then Ngong Road — replaced some of the routes you knew. The matatus still run, and the touts still call, but the specific configuration of routes and times and shortcuts you accumulated over twenty or thirty years of Nairobi commuting is no longer the only way to know the city. You observe the new commuters consulting apps for arrival times. The app gives a time. The matatu arrives at approximately the time. The gap between the approximation and the reality is something you could read without the app, but you have learned to let the app be enough.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('ft62MatLate', true) },
  },

  {
    id: 'ft62_matatu_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('ken_dep_matatu_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft62MatMid,
    text: `You have driven a car now for fifteen years or you have not driven one and the matatu is still your city. Either way the knowledge of the routes — what's changed, what's the same, the estate that has built new access roads and the estate that still routes everything through the one narrow junction — is updated automatically by living inside it. Your children ask you how to get somewhere and you give directions by landmark: the big mango tree that was there before the roundabout, the school that was demolished for the overpass, the place where the old market was. The city your children know has different reference points.`,
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('ft62MatMid', true) },
  },

  // ── WESTGATE GENERATION ───────────────────────────────────────────────────────

  {
    id: 'ft62_westgate_aftermath',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('ken_dep_westgate_generation') &&
      G.currentYear >= 2014 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.ft62WestgateAfter,
    text: `After Westgate the security architecture of Nairobi changed. The bollards outside malls. The bag search at every entrance — a frisking that became normal in the specific way that things become normal: through repetition until the noticing stops. The Garissa University attack in April 2015 killed 148 students. The attacks continued in different forms and in different places. The question that kept recurring was not whether to go out but what level of vigilance was the appropriate one to carry into ordinary life. You reached an equilibrium. Everyone did. The equilibrium was not the same as the feeling of safety.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.setMem('ft62WestgateAfter', true) },
  },

  {
    id: 'ft62_westgate_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ken_dep_westgate_generation') &&
      G.age >= 55 &&
      !G.mem?.ft62WestgateLate,
    text: `The generation that came of age after Westgate grew up with the bag search at the mall entrance as a given — they do not remember the entrances without it. You remember both. The transition between the two Nairobis is something you carry in memory that the younger generation carries only in the infrastructure — the bollards, the guards, the routine checks that are now unremarkable because they have always been there. The attack happened in public. The response became the daily background of a public city.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft62WestgateLate', true) },
  },

  // ── RUNNER GENERATION ─────────────────────────────────────────────────────────

  {
    id: 'ft62_runner_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ken_dep_runner_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft62RunnerMid,
    text: `The knees negotiate differently than they did at twenty. You run slower now, or you have stopped competing and run for other reasons. The mornings in the Rift Valley hills, or the road in whatever city you are in now, are still there. The athletes you ran with as a teenager are still running — some of them, professionally, across time zones. The ones who made it to the circuit and the ones who stopped at the district level are both in your memory as the same people they were at sixteen, running the same hills.`,
    choices: null,
    effect: (p) => { p.h += 3; p.r += 3; p.setMem('ft62RunnerMid', true) },
  },

  {
    id: 'ft62_runner_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ken_dep_runner_generation') &&
      G.age >= 55 &&
      !G.mem?.ft62RunnerLate,
    text: `Eliud Kipchoge ran a marathon in under two hours in 2019, in Vienna, with pacers and conditions designed for the attempt. When the news came through you watched the finish on a small screen. The time was two hours and one minute before the attempt; the attempt made it one hour, fifty-nine minutes, and forty seconds. You grew up running hills that produced people capable of this. The hills did not know what they were producing. You ran them because they were there and your legs were young and the morning was cool.`,
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.setMem('ft62RunnerLate', true) },
  },

]

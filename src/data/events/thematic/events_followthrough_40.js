// events_followthrough_40.js — Czech Republic depth follow-throughs (6 events)
// Callbacks for: cze_communist_takeover_generation, cze_stalinist_terror_generation,
// cze_prague_spring_generation, cze_invasion_generation,
// cze_emigrant_1968, cze_havel_generation, cze_velvet_divorce_generation

export const FOLLOWTHROUGH_40_EVENTS = [

  // ─── FEBRUARY 1948: MASARYK REHABILITATION ────────────────────────────────────

  {
    id: 'ft40_february_48_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cze_communist_takeover_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 55 &&
      !G.mem?.ft40Feb48Late,
    text: 'After 1989 the archives open. The Masaryk file is among the first things researchers examine. The stairwell from the Foreign Ministry bathroom. The trajectory and condition of the body. The official investigation of 1948 called it suicide. The investigation of 1968 — during the Spring — concluded it was murder. The post-1989 investigation concluded it was murder. The Czech government has since officially accepted this conclusion. Jan Masaryk, son of the founder, threw himself from no window. You always knew the official version was a kind of joke told at everyone\'s expense, and now it is simply on record.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.karma += 3; p.setMem('ft40Feb48Late', true) },
  },

  // ─── SLÁNSKÝ: REHABILITATION 1963 AND AFTER ──────────────────────────────────

  {
    id: 'ft40_slansky_rehabilitation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cze_stalinist_terror_generation') &&
      G.currentYear >= 1963 &&
      G.age >= 40 &&
      !G.mem?.ft40SlanskyRehab,
    text: 'In 1963 the Party officially rehabilitates Slánský and the others — acknowledges that the confessions were false, that the trials were political murder. The people who signed the letters of support, who attended the rallies, who repeated the charges — most of them are still in their positions. The rehabilitation is bureaucratic and quiet, a note in a file. The executed men\'s families receive some compensation. The judges who sentenced them are not tried. The people who designed the interrogation methods receive administrative transfers. You signed a letter of support or you did not. Either way you live with the knowledge of what happened in a country where the people who organised it went on with their careers.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.karma += 4; p.setMem('ft40SlanskyRehab', true) },
  },

  // ─── PRAGUE SPRING: THE LONG SHADOW ──────────────────────────────────────────

  {
    id: 'ft40_prague_spring_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('cze_prague_spring_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 50 &&
      !G.mem?.ft40SpringLate,
    text: 'The people who were young in 1968 carry a specific kind of wound: they know what it felt like to have hope at that scale, that texture, that temperature — and then to watch it end in one night. The Velvet Revolution of 1989 was also extraordinary, but it was a different kind of extraordinary. The Spring was something the country generated from inside itself, against all probability. The twenty-one days of November 1989 were extraordinary partly because of what had been taught by August 1968 — the knowledge that this time the Soviet troops did not come, could not come, and so what the crowd had was its own weight, which was enough. You have thought about the relationship between these two Novembers and one August for most of your adult life.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m += 4; p.setMem('ft40SpringLate', true) },
  },

  // ─── INVASION GENERATION: ANNIVERSARY ────────────────────────────────────────

  {
    id: 'ft40_invasion_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cze_invasion_generation') &&
      G.currentYear >= 1998 &&
      G.age >= 50 &&
      !G.mem?.ft40InvasionLate,
    text: 'Russia has apologised — a conditional, diplomatic apology, the kind that mentions "regrettable events" rather than naming what the events were. The five countries that participated in the invasion have given various accounts of their participation over the decades. Poland, Hungary, Bulgaria, and East Germany — four of the five — are now in the same NATO alliance as the Czech Republic. This is one of those facts that history produces that is difficult to explain to people who have not lived inside the logic of it. You stand in Wenceslas Square on the anniversary and you are standing where you stood in 1968 and the square is the same square.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft40InvasionLate', true) },
  },

  // ─── 1968 EMIGRANT: THE RETURN QUESTION ──────────────────────────────────────

  {
    id: 'ft40_emigrant_68_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('cze_emigrant_1968') &&
      G.currentYear >= 1990 &&
      G.age >= 45 &&
      !G.mem?.ft40Emigrant68Late,
    text: 'November 1989: you are watching the news from wherever you are — Paris, Vienna, Toronto, New York — and you understand that the country you left is becoming something different. People go back. Some of the émigrés of 1968 return and take positions in the new government, in the universities, in business. Some of them go back and find that the country they remembered is a version they have maintained in their minds for twenty years while the actual country has been getting on with life and becoming something else. Some of them go back for a visit and then go back to wherever they were. The question of whether to return is not a simple question and you have spent the years since 1989 discovering that.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 3; p.e += 3; p.setMem('ft40Emigrant68Late', true) },
  },

  // ─── HAVEL LATE: THE PRESIDENT WHO WAS A PLAYWRIGHT ──────────────────────────

  {
    id: 'ft40_havel_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cze_havel_generation') &&
      G.currentYear >= 2012 &&
      G.age >= 50 &&
      !G.mem?.ft40HavelLate,
    text: 'Havel died in December 2011. His presidency was also complicated — the Velvet Divorce he did not want, the market transitions he endorsed, the Kosovo intervention he supported, the legacy of the anti-communist consensus getting tangled with market fundamentalism. His successors include Klaus, who denied climate change from the presidential office, and Zeman, who became increasingly aligned with Moscow. The trajectory of Czech politics after Havel is a case study in how the conditions that produced an extraordinary person do not automatically reproduce extraordinary successors. You have watched this and compared it to the man who said that living in truth was the minimum requirement. What he meant was harder to sustain than what he meant.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 3; p.setMem('ft40HavelLate', true) },
  },

  // ─── VELVET DIVORCE: THE RELATIONSHIP AFTERWARD ──────────────────────────────

  {
    id: 'ft40_velvet_divorce_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cze_velvet_divorce_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 45 &&
      !G.mem?.ft40DivorceLate,
    text: 'Czechoslovakia has been gone for thirty years. Slovakia is in the Eurozone; the Czech Republic still uses the koruna. They are both in the EU and in NATO. The relationship between the two countries is the most functional of the post-communist splits: no war, no serious border dispute, no significant minority problem, a genuine cultural warmth that the political separation did not end. Your Slovak friends are abroad the way any Europeans are abroad. The country that did not ask you whether to split has produced a split that has not produced the disaster the polls suggested people feared. You have been trying to figure out how to feel about this for thirty years and have mostly settled on: complicated but fine.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 3; p.e += 2; p.setMem('ft40DivorceLate', true) },
  },

]

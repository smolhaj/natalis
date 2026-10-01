// events_followthrough_43.js — Norway depth follow-throughs (5 events)
// Callbacks for: nor_occupation_generation, nor_liberation_generation,
// nor_oil_generation (also in year texture), nor_eu_no_generation, nor_july22_generation

export const FOLLOWTHROUGH_43_EVENTS = [

  // ─── OCCUPATION: THE ACCOUNTING AFTER ────────────────────────────────────────

  {
    id: 'ft43_occupation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nor_occupation_generation') &&
      G.currentYear >= 1955 &&
      G.age >= 55 &&
      !G.mem?.ft43OccupationLate,
    text: 'The trials ended in the late 1940s and the country tried to move on. The collaborators who were convicted and served their sentences went back to their towns and villages and in many cases lived and died there without further official consequence. The social consequence was different and longer — decades of lowered status, of being the family that had, of children of collaborators carrying what their parents had done. The resistance fighters were honoured. The ordinary people who had endured without distinguishing themselves either way — the majority — had the experience of a generation that was present for something important and is not in the official narrative.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft43OccupationLate', true) },
  },

  // ─── LIBERATION: THE ACCOUNTING BEGINS ───────────────────────────────────────

  {
    id: 'ft43_liberation_accounting',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('nor_liberation_generation') &&
      G.currentYear >= 1946 && G.currentYear <= 1960 &&
      G.age >= 25 &&
      !G.mem?.ft43LiberationAccounting,
    text: 'The settling of accounts begins almost at once after liberation. Membership of the NS taken for a job; an informer who informed under threat; a man who sold to the Germans and refused them other things. The courts draw lines through all of it, and the lines are imperfect. You know people on both sides of several of them.',
    context: 'About 90,000 Norwegians were investigated after the war and around 46,000 punished in some form, in a country of three million.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 3; p.setMem('ft43LiberationAccounting', true) },
  },

  // ─── OIL FUND: THE LATE RECKONING ────────────────────────────────────────────

  {
    id: 'ft43_oil_fund_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nor_oil_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 60 &&
      !G.mem?.ft43OilFundReckoning,
    text: 'The oil fund owns a sliver of almost every listed company on earth. Its ethics council excludes the arms makers and the tobacco companies and the worst polluters, and it still holds oil shares, and it is still made of oil. The country with the most admirable answer to oil wealth also pumps oil. You have spent the last of your working years watching that sharpen, and you have no resolution for it.',
    context: 'The Government Pension Fund Global is the largest sovereign wealth fund in the world and holds about 1.5 per cent of all listed shares globally.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft43OilFundReckoning', true) },
  },

  // ─── EU NO: THE HALFWAY POSITION ─────────────────────────────────────────────

  {
    id: 'ft43_eu_no_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nor_eu_no_generation') &&
      G.currentYear >= 2005 &&
      G.age >= 55 &&
      !G.mem?.ft43EuNoLate,
    text: 'Norway voted no in 1972 and no again in 1994, and is in the single market and Schengen anyway, through the EEA. Norwegian governments put EU directives into law, and Norway pays toward the EU budget. What it does not have is a vote on any of it. The people who voted no thought that sovereignty was worth the trade. You have watched the arrangement for decades and have your own view of what sovereignty means when it is bought this way.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.setMem('ft43EuNoLate', true) },
  },

  // ─── JULY 22: THE YEARS AFTER ────────────────────────────────────────────────

  {
    id: 'ft43_july22_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('nor_july22_generation') &&
      G.currentYear >= 2016 &&
      G.age >= 50 &&
      !G.mem?.ft43July22Late,
    text: 'The survivors of Utøya were teenagers, and many of them went into politics; the island did not stop a generation of activists, it hurried them. The trial was public, and he used it, and got less from it than he hoped. Within a few years Utøya was a summer camp again. Whether that answer was equal to what happened is something the people who were on the island can judge better than you.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.karma += 4; p.e += 3; p.setMem('ft43July22Late', true) },
  },

]

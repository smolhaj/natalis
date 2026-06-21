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
    text: 'The trials ended in the late 1940s and the country tried to move on. The collaborators who were convicted and served their sentences went back to their towns and villages and in many cases lived and died there without further official consequence. The social consequence was different and longer — decades of lowered status, of being the family that had, of children of collaborators carrying what their parents had done. The resistance fighters were honoured. The ordinary people who had endured without distinguishing themselves either way — the majority — had the specific experience of a generation that was present for something important and is not in the official narrative.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft43OccupationLate', true) },
  },

  // ─── LIBERATION: THE ACCOUNTING BEGINS ───────────────────────────────────────

  {
    id: 'ft43_liberation_accounting',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nor_liberation_generation') &&
      G.currentYear >= 1946 && G.currentYear <= 1960 &&
      G.age >= 25 &&
      !G.mem?.ft43LiberationAccounting,
    text: 'The liberation was followed almost immediately by the settling of accounts. Fifteen thousand people were convicted of collaboration — wartime treason, membership in the NS, various degrees of complicity. For a country of three million people, this was a large number. For the scope of what five years of occupation produces in terms of accommodation, it was probably a smaller number than the full reality. The difficulty of the accounting was that degrees of collaboration were not discrete categories: there were people who took NS membership under economic pressure, people who informed under direct threat, people who collaborated with specific acts and not others. The courts drew lines. The lines were imperfect. You knew people on both sides of various lines.',
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
    text: 'The Government Pension Fund Global is now the largest sovereign wealth fund in the world. Norway has used oil revenue to buy stakes in the global economy and holds roughly 1.5% of every publicly listed company on earth. The ethical guidelines of the fund exclude certain companies — weapons manufacturers, tobacco companies, companies with severe environmental violations. The fund still holds oil company shares. The fund\'s income depends on an economy that produces carbon. The country that built the most admirable response to oil wealth also produces oil. You have spent the last years of your working life watching this paradox sharpen and you do not have a resolution for it, only the honesty to hold it as a paradox rather than one of its easier versions.',
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
    text: 'Norway is not in the EU and is deeply integrated with the EU. The single market, the Schengen area, the freedom of movement — Norway has these through the EEA, which it joined instead of the EU. Norwegian companies follow EU product regulations. Norwegian governments implement EU directives. Norway contributes to the EU budget at a rate comparable to member states. The difference: Norway has no vote on the regulations and directives it adopts. The people who voted no in 1972 and again in 1994 believed this was a sovereign trade worth making. You have watched the arrangement function for decades and have your own view on what sovereignty means when it is purchased this way.',
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
    text: 'The survivors of Utøya were teenagers at the time. Many of them went into politics. A significant number of the politicians who shaped Norwegian public life in the 2010s and 2020s were on the island. This is one of the things that followed: that the attack did not, as intended, stop a generation of left-wing activists — it accelerated them. The trial was held publicly and the perpetrator used it to spread his manifesto and the public trial gave him less than he had hoped for. Utøya became a Labour Party youth camp again, within years. These responses to atrocity — the democratic answer, the resumed camp, the survivors in parliament — are the specific Norwegian answer to July 22. Whether they are adequate to what happened is a question that the people who were on the island are better qualified to answer than you are.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.karma += 4; p.e += 3; p.setMem('ft43July22Late', true) },
  },

]

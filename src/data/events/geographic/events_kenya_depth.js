// events_kenya_depth.js
// Kenya depth: Nairobi matatu culture, Westgate attack 2013, Rift Valley
// athletics pathway, Kibera and informal settlement life, HELB student loans,
// the Kenyan diaspora-nurse track, ethnic coalition politics texture.

const isKenya = (G) => G.character.country?.name === 'Kenya'
const isNairobi = (G) => isKenya(G) && G.ruralUrban === 'urban'

export const KENYA_DEPTH_EVENTS = [

  // ── MATATU CULTURE ───────────────────────────────────────────────────────────

  {
    id: 'ken_dep_matatu',
    phase: null,
    weight: 4,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear >= 1980 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.kenMatatu,
    text: `The matatu: Tupac on the back window, a football crest, chrome lettering, a politician's slogan. The tout leans out of the sliding door calling the route into the air, and the music is too loud and you no longer hear that it is. The driver knows the back road that saves twenty minutes when Uhuru Highway has its accident. Which number goes where, which tout to trust, when to board and when to wait: you have learned the city this way.`,
    choices: null,
    effect: (p) => { p.e += 2; p.s += 2; p.addFlag('ken_dep_matatu_generation'); p.setMem('kenMatatu', true) },
  },

  {
    id: 'ken_dep_matatu_2003_rules',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear >= 2004 && G.currentYear <= 2010 &&
      G.flags.has('ken_dep_matatu_generation') &&
      !G.mem?.kenMatatu2003,
    text: `In 2003 Michuki's rules come in: seat belts, speed governors, reflective jackets, quieter music. For a few months the rules are enforced, then the enforcement slackens, and the matatus negotiate their way back to most of what they were. The graffiti stays, the tout leans out, the music is loud again. The driver knows how to work around the governor's sound.`,
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('kenMatatu2003', true) },
  },

  // ── WESTGATE ATTACK 2013 ──────────────────────────────────────────────────────

  {
    id: 'ken_dep_westgate',
    phase: null,
    weight: 4,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear === 2013 &&
      G.age >= 16 &&
      !G.mem?.kenWestgate,
    text: `September 21, 2013, a Saturday, and gunmen walk into Westgate when it is full, and the siege lasts four days. The mall is in Westlands, the middle of the city, where the Nairobi middle class spends its Saturday afternoons; the place was chosen because people like you go there. You know people who were there, or people who know people who were. For a while the city is a different city. Then it is the same city again.`,
    context: 'Sixty-seven people were killed in the Westgate attack.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('ken_dep_westgate_generation'); p.setMem('kenWestgate', true) },
  },

  // ── RIFT VALLEY ATHLETICS ─────────────────────────────────────────────────────

  {
    id: 'ken_dep_runner',
    phase: null,
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 1970 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.kenRunner,
    text: `In school you run. Everyone runs — to school in the morning, in the PE class, the inter-school competitions. You have been told that the altitude helps, that the boys who grew up herding cattle over the hills of the Rift Valley arrived at competition already built for what running requires. The Kalenjin athletes in the Olympics are no mystery to you. They are your neighbours, or they have the same training you do, or they are the older brothers of your classmates who came back with medals. You run because this is what people here do, and because you can.`,
    choices: [
      {
        text: 'You are genuinely fast. This becomes something to pursue.',
        tag: null,
        outcome: 'The coach at the district meet says something. A name is written down. The path from here is specific: the training camp, the federation, the road races in Europe, the prize money that changes what is possible for your family.',
        effect: (p) => { p.h += 5; p.m += 6; p.addFlag('ken_dep_runner_generation'); p.addFlag('athletic_pathway'); p.setMem('kenRunner', true) },
      },
      {
        text: 'You are good but not extraordinary. You run for other reasons.',
        tag: null,
        outcome: 'You run most mornings because the mornings are cool and the hills are there and the running is its own thing, separate from the rest of the day.',
        effect: (p) => { p.h += 4; p.m += 3; p.addFlag('ken_dep_runner_generation'); p.setMem('kenRunner', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ken_dep_runner_europe',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.flags.has('athletic_pathway') &&
      // The circuit is for the ones whose bodies kept the promise. A flag from
      // a district meet at twelve sent schoolteachers and clerks to Rotterdam.
      (G.fitness ?? 50) >= 65 && (G.stats?.health ?? 50) >= 65 &&
      (!G.career || G.career.field === 'sports') &&
      G.currentYear >= 1985 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.kenRunnerEurope,
    text: `Rotterdam, Berlin, Chicago, London. The agent takes fifteen percent and arranges the flights and the hotel with the breakfast you cannot eat before a race. The streets are flat and the crowd is loud and you run against the clock instead of the man beside you. What you win in one marathon is more than your father earned in a year, and the school fees and the land and the brick house run the race with you.`,
    choices: null,
    effect: (p) => { p.m += 5; p.mo += 8000; p.karma += 4; p.setMem('kenRunnerEurope', true) },
  },

  // ── KIBERA ───────────────────────────────────────────────────────────────────

  {
    id: 'ken_dep_kibera',
    phase: null,
    weight: 3,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear >= 1985 &&
      G.age >= 16 && G.age <= 40 &&
      G.stats?.wealth <= 30 &&
      !G.mem?.kenKibera,
    text: `Kibera, two kilometres from the city centre. An iron-sheet roof, the water kiosk at the end of the row where you buy twenty litres, the electricity from a junction box somebody wired years ago and charges for by the month. Along the road the phone-charging stall, the woman who cooks lunch, the tailor at his foot-pedal Singer. The government calls it an eyesore. There is a church on every other corner and a school the parents built with harambee money when the government school was full.`,
    choices: null,
    effect: (p) => { p.r += 3; p.s += 3; p.e += 2; p.setMem('kenKibera', true) },
  },

  // ── HELB STUDENT LOANS ────────────────────────────────────────────────────────

  {
    id: 'ken_dep_helb',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 1995 &&
      G.age >= 18 && G.age <= 26 &&
      !G.mem?.kenHelb,
    text: `The HELB loan comes in tranches: the fees and part of the upkeep. Repayment starts a year after you graduate or get a payslip, and the tax office will tell them when you do. In the hostel you can see which families can top up the upkeep: who goes home at the weekend and who stays. You add this calculation to the others already running.`,
    choices: null,
    effect: (p) => { p.e += 4; p.r += 3; p.mo -= 1000; p.setMem('kenHelb', true) },
  },

  // ── DIASPORA NURSE TRACK ──────────────────────────────────────────────────────

  {
    id: 'ken_dep_diaspora_nurse',
    phase: null,
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 2000 &&
      G.age >= 22 && G.age <= 38 &&
      G.career?.field === 'healthcare' &&
      !G.mem?.kenDiasporaNurse,
    text: `The path is well worn: the nursing diploma, the IELTS, the registration in Britain, the sponsorship letter from an NHS trust or a care-home chain. One colleague goes, then two, then four, and the gaps on the ward roster at Kenyatta stay empty. The ministry condemns it and does not offer the salary that would stop it. You are deciding whether to go.`,
    choices: [
      {
        text: 'You go. The calculation resolves to leave.',
        tag: null,
        outcome: 'You arrive at Heathrow with the nursing pin and the NMC registration number and a group chat from home that will not stop. You are one of the seventeen thousand Kenyan nurses in the UK. You send remittances. The patients you have now are not the patients you trained for.',
        effect: (p) => { p.m += 4; p.mo += 5000; p.addFlag('nga_diaspora'); p.setResidency('work_visa'); p.setMem('kenDiasporaNurse', true) },
      },
      {
        text: 'You stay. The department needs you and you are not ready to leave.',
        tag: null,
        outcome: 'The department still has the gaps. Your salary is what it is. You have stayed for reasons that are not simple and that change in weight depending on the year.',
        effect: (p) => { p.karma += 6; p.m -= 2; p.setMem('kenDiasporaNurse', true) },
      },
    ],
    effect: null,
  },

  // ── ETHNIC COALITION POLITICS ─────────────────────────────────────────────────

  {
    id: 'ken_dep_tribal_arithmetic',
    phase: null,
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 2002 &&
      G.age >= 18 && G.age <= 55 &&
      !G.mem?.kenTribalArithmetic,
    text: `The calculation before every election: which communities are in which coalition, which presidential candidate has which running mate, what the Kikuyu-Kalenjin or Luo-Kikuyu combination means in seats. Your community has endorsed a candidate. You have been told, at church and at the baraza and at family gatherings, who is the right choice. The right choice is sometimes the choice you agree with and sometimes the choice your community has decided is right for reasons that are not exactly your reasons. The referendum of your own vote happens in a booth that is private in a country where community knowledge of your vote is not impossible.`,
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('kenTribalArithmetic', true) },
  },

  // ── M-PESA AND MOBILE MONEY DEPTH ────────────────────────────────────────────

  {
    id: 'ken_dep_mpesa_life',
    phase: null,
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 2010 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.kenMpesaLife,
    text: `The M-Pesa economy: the rent paid by phone, the school fees sent by phone, the loan from Fuliza that arrives in the night when you are short and costs you in the interest rate you knew about and signed for anyway. The Safaricom agent at the corner is the bank branch that does not require a minimum balance. The money is not in your wallet and not in a bank — it is in the number, and the number is you. Your grandmother sends money to your cousin in Mombasa from a phone she uses for nothing else and the transaction takes thirty seconds. The system built on nothing but SIM cards and trust in Safaricom's uptime has become infrastructure.`,
    choices: null,
    effect: (p) => { p.e += 3; p.s += 2; p.setMem('kenMpesaLife', true) },
  },

]

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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear >= 1980 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.kenMatatu,
    text: `The matatu: the minivan that is not just a minivan. The graffiti wrapping — Tupac, football clubs, politicians' slogans, abstract designs in chrome — that marks out the routes as competing aesthetics. The tout leaning from the sliding door calling destinations into the air. The music that is always too loud and which you have stopped noticing the loudness of. The driver who knows the shortcut through the back road that saves twenty minutes when the Uhuru Highway has its accident. You have commuted on matatus for years. The knowledge required — which number goes where, which tout to trust, when to board and when to wait for the next — is the knowledge of living in this city.`,
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
    text: `In 2003 Michuki rules: seat belts, speed governors, reflective jackets, no music above a certain decibel. The Ministry of Transport enforces the rules for months and then the enforcement relaxes and the matatus negotiate their way back to something approximating what they were. The graffiti is still there. The tout is still leaning from the door. The music is loud again. The speed governor makes a sound the driver knows how to work around. The Michuki rules are still technically in effect and have been partially absorbed.`,
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('kenMatatu2003', true) },
  },

  // ── WESTGATE ATTACK 2013 ──────────────────────────────────────────────────────

  {
    id: 'ken_dep_westgate',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear === 2013 &&
      G.age >= 16 &&
      !G.mem?.kenWestgate,
    text: `September 21, 2013. Al-Shabaab gunmen enter Westgate Shopping Mall on a Saturday when it is full. Sixty-seven people are killed over four days; the Kenyan Defence Forces' response is later criticised and then investigated. The mall is in Westlands, in the middle of the city, a place where the Nairobi middle class spends Saturday afternoons. The choice of location is specific — the place was chosen to be a place that people like you go to. You know people who were there or people who know people who were there. The city is a different city for a period after the Saturday in question. Then it becomes the same city again, which is its own kind of knowledge.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('ken_dep_westgate_generation'); p.setMem('kenWestgate', true) },
  },

  // ── RIFT VALLEY ATHLETICS ─────────────────────────────────────────────────────

  {
    id: 'ken_dep_runner',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 1970 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.kenRunner,
    text: `In school you run. Everyone runs — to school in the morning, in the PE class, the inter-school competitions. You have been told that the altitude helps, that the boys who grew up herding cattle over the hills of the Rift Valley arrived at competition already built for what running requires. The Kalenjin athletes in the Olympics are not a mystery to you in the way they are to the sports scientists who come to study them. They are your neighbours, or they have the same training you do, or they are the older brothers of your classmates who came back with medals. You run because this is what people here do, and because you can.`,
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
      G.currentYear >= 1985 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.kenRunnerEurope,
    text: `The road race circuit: Rotterdam, Berlin, Chicago, London. The prize money in US dollars. The agent who takes fifteen percent and arranges the travel and the contracts. You run in conditions that are different from the hills — the flat city streets, the crowds, the watching of the clock in a way that racing at home is not about. What you earn in one marathon is more than your father earned in a year. The responsibility to the family at home — the school fees, the land, the brick house — is present in the race. It is not the only reason you run but it is in the race with you.`,
    choices: null,
    effect: (p) => { p.m += 5; p.mo += 8000; p.karma += 4; p.setMem('kenRunnerEurope', true) },
  },

  // ── KIBERA ───────────────────────────────────────────────────────────────────

  {
    id: 'ken_dep_kibera',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isNairobi(G) &&
      G.currentYear >= 1985 &&
      G.age >= 16 && G.age <= 40 &&
      G.stats?.wealth <= 30 &&
      !G.mem?.kenKibera,
    text: `Kibera: the informal settlement two kilometres from the city centre, a hundred thousand people on a square kilometre depending on who is counting and when. The iron-sheet roof. The water kiosk at the end of the row where you buy your twenty litres. The electricity that runs from a junction box someone wired in 2003 and which charges for connection by the month. The businesses along the road — the phone charging station, the mpishi who serves lunch, the tailor with the foot-pedal Singer. What the government calls an eyesore and what you call home are the same place. The eyesore has a church on every other corner and a school that the parents in it built with harambee contributions when the government school had no room.`,
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
    text: `The Higher Education Loans Board. The HELB loan that arrives in tranches to cover tuition and a portion of upkeep. The conditions: you must begin repayment one year after graduating or one year after getting a formal job, whichever comes first. The KRA — the tax authority — will report you to HELB if your employer submits your PAYE. The loan is not forgiven. The families that could not top up the upkeep tranche and the families that could produce a difference you can see in the dorm rooms: who goes home for the weekend and who stays. You are managing this calculation at a point in life that already has several calculations running simultaneously.`,
    choices: null,
    effect: (p) => { p.e += 4; p.r += 3; p.mo -= 1000; p.setMem('kenHelb', true) },
  },

  // ── DIASPORA NURSE TRACK ──────────────────────────────────────────────────────

  {
    id: 'ken_dep_diaspora_nurse',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isKenya(G) &&
      G.currentYear >= 2000 &&
      G.age >= 22 && G.age <= 38 &&
      G.career?.field === 'healthcare' &&
      !G.mem?.kenDiasporaNurse,
    text: `The pathway is established: the Kenya Medical Training College or the university nursing programme, the registration with the Nursing Council, the IELTS exam, the NMC application to the UK Nursing and Midwifery Council, the sponsorship letter from an NHS trust or a care home chain. Your colleagues are doing it in sequence. One leaves, then two, then four. The department in the Kenyatta National Hospital or the Coast General has a roster with gaps that are not being filled. The Ministry of Health condemns the emigration. The Ministry does not offer the salary that would stop it. You are deciding whether to go.`,
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
    phase: 'young_adult',
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
    phase: 'young_adult',
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

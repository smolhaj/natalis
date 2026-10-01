// events_followthrough_60.js
// Follow-throughs for Nigeria depth flags:
// NEPA generation in late life, JAMB echo (university arc), EndSARS generation
// late reckoning, Japa generation diaspora mid-life, stayed generation
// long-haul reckoning, Pentecostal late-life faith arc.

export const FOLLOWTHROUGH_60_EVENTS = [

  // ── NEPA GENERATION: POWER RESTORED (BRIEFLY) ────────────────────────────────

  {
    id: 'ft60_nepa_power_grid_moment',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_nepa_generation') &&
      G.currentYear >= 2005 && G.currentYear <= 2020 &&
      G.age >= 30 &&
      !G.mem?.ft60NepaPower,
    text: `The government announces the grid will be fixed: reform, privatised distribution, new power producers, megawatts promised. You have heard this before, in 1999, in 2003, in 2007, and you file it with the others, not with contempt, but with the measured doubt of someone who has run a generator for twenty years. The power improves in some places for a while, and then something fails. You have not sold the generator.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft60NepaPower', true) },
  },

  {
    id: 'ft60_nepa_late_life',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('nga_dep_nepa_generation') &&
      G.age >= 55 &&
      !G.mem?.ft60NepaLate,
    text: `You have lived your whole adult life with the power cut as a fact, and your children grew up with it. The governments have changed and the grid has not, not by the measure of what two hundred million people need. You stopped expecting it to be fixed sometime in your forties. It is not anger any more. It is a weight carried so long you notice it only when somebody says it will soon be put down.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.setMem('ft60NepaLate', true) },
  },

  // ── EXAM GENERATION: UNIVERSITY LIFE ─────────────────────────────────────────

  {
    id: 'ft60_jamb_university',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_nepa_generation') &&
      G.currentYear >= 1985 &&
      G.age >= 18 && G.age <= 26 &&
      !G.mem?.ft60JambUniversity,
    text: `University: the lecture hall with two hundred students for a class designed for fifty, the lecturer who may or may not come today, the photocopy of the photocopy of the textbook because the original is out of stock in the bookshop and has been for two years. ASUU — the Academic Staff Union of Universities — has been striking for better conditions since before you arrived. The strikes are measured in months. A four-year degree becomes a five-year degree, then a six-year degree, depending on how many times ASUU and the Federal Government fail to reach an agreement. You study through the strikes because the alternative is to not have the degree.`,
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.setMem('ft60JambUniversity', true) },
  },

  // ── LAGOS GENERATION: LATE-LIFE CITY RECKONING ───────────────────────────────

  {
    id: 'ft60_lagos_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('nga_dep_lagos_generation') &&
      G.age >= 50 &&
      !G.mem?.ft60LagosLate,
    text: `Lagos has more people than it did when you arrived, which means the traffic is worse and the rents are higher and the city is louder in more directions. You know Lagos in a way that the people who arrived recently do not know it — the texture of particular neighbourhoods before they changed, what used to be where Bola Ahmed Tinubu Bridge now is, the era of the danfo before the BRT replaced some of them. The city does not require your knowledge of its past to continue. It continues without asking what you remember of it. You are one of the people who remember, which makes you a kind of archive of Lagos that exists only in the people who stayed through all the changes.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft60LagosLate', true) },
  },

  // ── ENDSARS GENERATION: AFTERMATH ────────────────────────────────────────────

  {
    id: 'ft60_endsars_aftermath',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_endsars_generation') &&
      G.currentYear >= 2021 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      !G.mem?.ft60EndSarsAftermath,
    text: `After October 2020 SARS was disbanded and SWAT replaced it, and within months people were describing SWAT officers doing what SARS officers did. The Lagos panel's report included a finding about the toll gate, and the state government disputed the panel. More of your friends left. You know what you saw, and you know what the government said about what you saw, and the gap between them is the political education your generation received in real time.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 7; p.setMem('ft60EndSarsAftermath', true) },
  },

  // ── JAPA GENERATION: DIASPORA MID-LIFE ───────────────────────────────────────

  {
    id: 'ft60_japa_diaspora_mid',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_japa_generation') &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.ft60JapaDiaspMid,
    text: `Five years abroad, or seven, or ten. You have a life that works here: a job that pays in a currency that does not halve every two years, a child in a school with the lights on, a flat where the water is always hot. You send money home every month and the exchange rate calculation has become part of you, as automatic as breathing. When you go back for Christmas or for a burial or for a wedding, the city feels both smaller and louder than you remember. The people who stayed tell you what it is like. You cannot fully tell them what it is like from here, because the thing you would be describing — the steadiness, the absence of certain daily negotiations — is not something they can smell yet.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft60JapaDiaspMid', true) },
  },

  // ── STAYED GENERATION: MID-LIFE RECKONING ────────────────────────────────────

  {
    id: 'ft60_stayed_mid',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_stayed_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft60StayedMid,
    text: `Most of your graduating class is gone, some in the 2000s, most in the japa years, and the group chat is where the friendship lives now. They ask you about the exchange rate, the traffic, whether things are getting better. You answer honestly: not better, not worse, hovering the way Nigeria hovers, loud and chronic and working in all the ways that matter for the day. You have built something here. You do not know if the people who left understand what the building took.`,
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft60StayedMid', true) },
  },

  // ── PENTECOSTAL GENERATION: FAITH CRISIS OR DEEPENING ────────────────────────

  {
    id: 'ft60_pentecostal_mid_life',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('nga_dep_pentecostal_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft60PentecostalMid,
    text: `The prosperity gospel of your childhood: seed faith, covenant promises, breakthrough testimonies. In your thirties and forties you have watched people sow seeds and not harvest what was promised. You have also watched people who put in the work alongside the prayer succeed in ways that the prayer did not cause. The church has given you a community that has fed you and visited you in hospital and sat with you through things. The theology has given you a framework that sometimes holds and sometimes cannot hold what you have seen. You have not left. You have adjusted what you expect from the two things — the community and the theology — and that adjustment is a faith.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.e += 2; p.setMem('ft60PentecostalMid', true) },
  },

]

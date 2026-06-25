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
    text: `The government announces improvements to the grid. Power sector reform. Privatisation of distribution companies. The Independent Power Producers. Megawatts promised. You have heard these announcements before — in 1999, in 2003, in 2007 — and you file this one in the same place as the previous ones, not with contempt exactly, but with the calibrated scepticism of someone who has been managing on generators for twenty years. The grid improves in some places for some periods and then something fails and the grid returns to what it was. The generator is still running. You have not sold it.`,
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
    text: `You have lived your entire adult life with the power cut as a fact. Your children grew up with it. Your grandchildren, if you have them, will grow up with it. The governments have changed and the problem has not changed. The total capacity of the national grid in 2024 is not dramatically different from what it was in 1990, measured against what a country of 220 million people requires. You know this calculation by heart. You stopped expecting the grid to resolve sometime in your forties. What you feel about that is not anger anymore. It is something closer to the feeling of carrying a weight that you have been carrying for so long you no longer notice its weight, only its absence, briefly, when they tell you it will be set down soon.`,
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
    text: `After October 2020: SARS was disbanded. SWAT replaced it. Reports of SWAT officers doing what SARS officers did emerged within months of the disbanding. The Judicial Panels of Inquiry set up in each state to receive testimonies about SARS abuses produced reports. The Lagos panel's report included a finding about the toll gate. The Lagos State Government disputed the panel's findings. The dispute continued. The Japa wave accelerated in the months after October 2020, which may or may not be connected. You know what you saw. You know what the government said about what you saw. The gap between those two things is the political education your generation received in real time.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_dep_stayed_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft60StayedMid,
    text: `Most of the people who were in your graduating class are gone. Some left in the first wave, in the 2000s. Most left in the Japa years. The group chat is where you maintain the version of the friendship that time and geography have restructured. You are the one they ask about the exchange rate, about the traffic, about whether the situation is improving. You answer honestly. The answer is not improving, not worsening, hovering in the way that Nigeria hovers — chronic and loud and still functioning in all the ways that matter for daily life. You have built something here. The building is real. You do not know if the people who left understand what the building required.`,
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft60StayedMid', true) },
  },

  // ── PENTECOSTAL GENERATION: FAITH CRISIS OR DEEPENING ────────────────────────

  {
    id: 'ft60_pentecostal_mid_life',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('nga_dep_pentecostal_generation') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft60PentecostalMid,
    text: `The prosperity gospel of your childhood: seed faith, covenant promises, breakthrough testimonies. In your thirties and forties you have watched people sow seeds and not harvest what was promised. You have also watched people who put in the work alongside the prayer succeed in ways that the prayer did not cause. The church has given you a community that has fed you and visited you in hospital and sat with you through things. The theology has given you a framework that sometimes holds and sometimes cannot hold what you have seen. You have not left. You have adjusted what you expect from the two things — the community and the theology — and that adjustment is its own kind of faith.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.e += 2; p.setMem('ft60PentecostalMid', true) },
  },

]

// events_followthrough_33.js — MODE B follow-throughs
// 12 events: Ghana arc echoes (6) + Angola arc echoes (4) + cross-cutting (2)

export const FOLLOWTHROUGH_33_EVENTS = [

  // ─── GHANA ────────────────────────────────────────────────────────────────────

  {
    id: 'ft33_rawlings_believer_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gha_rawlings_believer') &&
      G.age >= 55 &&
      !G.mem?.ft33RawlingsBelieve,
    text: 'You believed in the PNDC — the accountability, the anger at the old order. Rawlings left power in 2001 on schedule, constitutionally, after two terms as a civilian president. He died in 2020 and was given a state funeral. The NDC he founded continued, won elections, lost them, won again. The accountability era produced a system that functions, more or less, and the functioning is partly his legacy. You hold this: the thing you supported produced something real, even though what it produced is not exactly what you were supporting.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.r += 3; p.e += 3; p.setMem('ft33RawlingsBelieve', true) },
  },

  {
    id: 'ft33_rawlings_skeptic_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gha_rawlings_skeptic') &&
      G.age >= 55 &&
      !G.mem?.ft33RawlingSkeptic,
    text: 'You were right to be skeptical of the PDC era. You were also living in a country that went on to conduct peaceful democratic transfers of power for two decades, which most of the region did not. The PDC years were not the whole story — they were the route through which something more durable emerged. You carry both truths: the arbitrary power you feared was real, and the state that came out the other side of it is also real.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 5; p.r += 4; p.setMem('ft33RawlingSkeptic', true) },
  },

  {
    id: 'ft33_cocoa_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gha_cocoa_family') &&
      G.age >= 60 &&
      !G.mem?.ft33CocoaLate,
    text: 'The trees are older than you now. Some of them were planted by your grandparents. You have spent your life farming a product whose price you have never had any influence over, whose market is in places you have never been, whose value arrives in a number that has nothing to do with the season you had. Ghana is the world\'s second largest cocoa producer. The people who grow the cocoa and the people who receive the money for the chocolate are not the same people. You have always known this. The knowing has not resolved.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 3; p.karma += 3; p.setMem('ft33CocoaLate', true) },
  },

  {
    id: 'ft33_diaspora_pressure_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gha_diaspora_pressure') &&
      G.age >= 55 &&
      !G.mem?.ft33DiasporaLate,
    text: 'You have been abroad long enough that "abroad" is just where you live. The family expectation that came with you — the pressure of being the one who went — has evolved: the grandchildren of the people you were sending money to now ask you questions about your life as something to be curious about rather than something to benefit from. The accounting is different at this distance in time. What you sent is concrete: a room, a school fee, a surgery. What you missed is also concrete, and harder to account for.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 4; p.e += 3; p.setMem('ft33DiasporaLate', true) },
  },

  {
    id: 'ft33_stayed_deliberate_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gha_stayed_deliberate') &&
      G.age >= 58 &&
      !G.mem?.ft33StayedLate,
    text: 'You stayed when others went. Ghana kept changing: the 2000 transition, the oil discoveries in 2007, the dumsor years, the economic pressures of the 2020s. You have watched the country through all of it from the inside. The ones who left and returned bring a version of Ghana with them that stopped updating when they left. You have the version that kept updating. This is not better. It is just the one you have.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 5; p.r += 4; p.setMem('ft33StayedLate', true) },
  },

  {
    id: 'ft33_year_of_return_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gha_year_of_return_witness') &&
      G.age >= 60 &&
      !G.mem?.ft33YearReturnEcho,
    text: 'Some of the people who came for the Year of Return stayed. There are now communities of African-American and Afro-British Ghanaian citizens in Accra — people who took the right-of-abode the government offered and built lives here. They have, in the decade since, become Ghanaians of a new kind: with the diaspora resources and the local address. The full shape of what the 2019 moment started is still becoming visible.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.r += 3; p.setMem('ft33YearReturnEcho', true) },
  },

  // ─── ANGOLA ───────────────────────────────────────────────────────────────────

  {
    id: 'ft33_angola_peace_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('angola_peace_generation') &&
      G.age >= 55 &&
      !G.mem?.ft33AngolaPeace,
    text: 'The war ended in 2002. Angola has had more than twenty years of peace now — longer than the civil war lasted, almost. Luanda has been rebuilt and then built beyond what it was before: the skyline changed, the roads changed, the restaurants that charge what restaurants in Dubai charge appeared alongside the musseques where people still have water delivered by truck. You live in both Angolas simultaneously: the one the oil built and the one the oil did not reach. The peace is real. The peace was not accompanied by reckoning.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 4; p.e += 4; p.setMem('ft33AngolaPeace', true) },
  },

  {
    id: 'ft33_angola_civil_war_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('angola_civil_war_generation') &&
      G.age >= 60 &&
      !G.mem?.ft33AngolaWar,
    text: 'The children born after 2002 have no memory of the war. They know it the way people know things from books and from their parents\' faces when certain places are mentioned. Your grandchildren ask you about it and you give them the outline. The mine clearance is ongoing — the demining teams still find them in fields decades after the war. Angola carries the war in its soil even now, long after the generation that fought it has moved into late life.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.e += 3; p.karma += 3; p.setMem('ft33AngolaWar', true) },
  },

  {
    id: 'ft33_angola_mpla_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('angola_mpla_generation') &&
      G.age >= 58 &&
      !G.mem?.ft33AngolaMLPA,
    text: 'Dos Santos stepped down in 2017 after thirty-eight years. João Lourenço became president and almost immediately began prosecuting Isabel dos Santos — the daughter who had run Sonangol — for corruption. The Luanda Leaks exposed how systematically the family had used state resources. Lourenço has prosecuted some of the corruption while maintaining the one-party system that enabled it. You have watched the self-correction of a system that is not correcting the system, just the people who were most visibly inside it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.m += 3; p.setMem('ft33AngolaMLPA', true) },
  },

  {
    id: 'ft33_angola_landmine_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('angola_landmine_generation') &&
      G.age >= 55 &&
      !G.mem?.ft33AngolaLandmine,
    text: 'The mine clearance teams have been working for twenty years. They work systematically through the provinces — southern highlands, the Cuando Cubango flats, the routes the armies used. Angola\'s landmine problem has been reduced but not resolved. The soil still holds history in the form of objects that were designed to end things. You know what ground has been cleared and what ground has not. You still know which paths to take.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.setMem('ft33AngolaLandmine', true) },
  },

  // ─── CROSS-CUTTING ────────────────────────────────────────────────────────────

  {
    id: 'ft33_first_voter_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (G.flags.has('gha_first_voter') || G.flags.has('zambian_democracy_generation') || G.flags.has('senegal_democracy_generation')) &&
      G.age >= 60 &&
      !G.mem?.ft33FirstVoterLate,
    text: 'You voted in the first genuinely competitive election your country held. You remember the specific feeling: the act of marking something, the line, the box, the sense that this small physical thing was connected to something larger. The elections since have been less charged — democracy has become normal, which is a kind of success that makes individual elections matter less. The first one mattered in a way the subsequent ones have not. You were there for the first one.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.r += 3; p.setMem('ft33FirstVoterLate', true) },
  },

  {
    id: 'ft33_evangelical_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (G.flags.has('zambian_evangelical_generation') || G.flags.has('gha_pentecostal_committed')) &&
      G.age >= 60 &&
      !G.mem?.ft33EvangelicalLate,
    text: 'The church has been the structure of your weeks for thirty years. The pastor you first heard has been replaced; the building has grown; the theology has shifted slightly in emphasis over time — less fire, more prosperity; more political engagement; the same conviction about what is coming. You have been in this community through deaths and marriages and crises that the community held you through. Whatever you believe about the theology, the community has been real.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 4; p.r += 3; p.s += 2; p.setMem('ft33EvangelicalLate', true) },
  },

]

// events_ghana.js — 10 events for the Ghana arc
// Complements events_west_africa.js (Nkrumah independence, 1966 coup, brain drain).
// Covers: Rawlings PNDC era, cocoa farming family, day-name identity,
// Pentecostal landscape, democratic consolidation 1992, Volta Dam, Accra urban
// migration, dumsor (2014-16 power cuts), diaspora expectation, Year of Return

const IS_GHANAIAN = (G) => G.character.country?.name === 'Ghana'

export const GHANA_EVENTS = [

  // ─── DAILY NAME / AKAN IDENTITY ───────────────────────────────────────────────

  {
    id: 'gha_day_name',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      !G.mem?.ghaDayName,
    text: 'You have two names. The first is the one on your school register. The second is your day name — the Akan name for the day you were born. Kwame if you are a boy born on Saturday; Yaa if you are a girl born on Thursday; Kofi, Ama, Kweku. Every Ghanaian who hears your day name knows exactly when you arrived in the world. It is a greeting, a category, a way of being read before you speak. You have carried both names in different rooms for as long as you can remember.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.addFlag('gha_akan_day_name'); p.setMem('ghaDayName', true) },
  },

  // ─── VOLTA RIVER PROJECT ──────────────────────────────────────────────────────

  {
    id: 'gha_volta_dam',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      !G.mem?.ghaVoltaDam,
    text: 'The Akosombo Dam was built to power the smelters and light the cities. It created the largest man-made lake in the world at the time and displaced 80,000 people from their villages. You know people whose grandparents were displaced. The resettlement towns still exist; you can identify them by the way they are built, the way the people in them talk about home as a place underwater. The dam powers most of Ghana\'s electricity. When the water level drops in dry years, the power cuts begin.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 4; p.addFlag('gha_volta_generation'); p.setMem('ghaVoltaDam', true) },
  },

  // ─── COCOA FARMING FAMILY ─────────────────────────────────────────────────────

  {
    id: 'gha_cocoa_family',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.ghaCocoa,
    text: 'The cocoa trees are older than you and require constant attention. Your family has farmed them for two generations. The price is set in London and Zürich and has nothing to do with what the season has been. A good year in the fields can still be a poor year in the house if the cocoa price falls. You learn early that what you produce and what you receive for it are two separate calculations, mediated by forces with no local address.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 2; p.h -= 2; p.addFlag('gha_cocoa_family'); p.setMem('ghaCocoa', true) },
  },

  // ─── PENTECOSTAL LANDSCAPE ────────────────────────────────────────────────────

  {
    id: 'gha_pentecostal_rise',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 1980 &&
      !G.mem?.ghaPentecostal,
    text: 'The Pentecostal churches have been building. Not the old mission churches — those have their own gravity — but the new ones: Lighthouse, ICGC, Action Chapel, the ones that meet in schools and warehouses before they have their own halls. The pastor speaks as though God\'s approval is imminent and specific. You notice what this does to the room: it produces a kind of expectation that is also a demand. You are trying to work out your own relationship to it.',
    choices: [
      {
        text: 'You find the expectation sustaining. The conviction in the room is something you want to be part of.',
        tag: 'gha_pentecostal_committed',
        outcome: 'The church becomes a structure for the week — a community, a set of obligations, a way of reading the world.',
        effect: (p) => { p.addFlag('gha_pentecostal_committed'); p.m += 6; p.s += 3; p.karma += 3; p.setMem('ghaPentecostal', true) },
      },
      {
        text: 'You maintain the relationship with faith but at a distance from this particular intensity.',
        tag: 'gha_faith_private',
        outcome: 'You believe what you believe. You do not believe it in this specific room.',
        effect: (p) => { p.addFlag('gha_faith_private'); p.m += 3; p.e += 3; p.setMem('ghaPentecostal', true) },
      },
    ],
  },

  // ─── RAWLINGS PNDC ERA ────────────────────────────────────────────────────────

  {
    id: 'gha_rawlings_pndc',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 1982 && G.currentYear <= 1992 &&
      !G.mem?.ghaRawlings,
    text: 'Flight Lieutenant Jerry Rawlings has now been in power since his second coup in December 1981. The Peoples Defence Committees are in every neighbourhood and every factory. They report; they also sometimes administer justice on their own account. Rawlings is not like the previous generals — he is young, he is half-Scottish and half-Ewe, he genuinely seems angry at the old order. Whether the anger produces something better than the old order is a question you are living inside.',
    choices: [
      {
        text: 'The accountability, even the rougher parts of it, feels like something long overdue.',
        tag: 'gha_rawlings_believer',
        outcome: 'The revolution has its costs. You have decided the direction is the right one.',
        effect: (p) => { p.addFlag('gha_rawlings_believer'); p.e += 4; p.m += 3; p.setMem('ghaRawlings', true) },
      },
      {
        text: 'The PDCs make you uneasy. One committee\'s accountability is another committee\'s arbitrary power.',
        tag: 'gha_rawlings_skeptic',
        outcome: 'You keep this opinion in a small circle. You have noticed who is on the committee in your area.',
        effect: (p) => { p.addFlag('gha_rawlings_skeptic'); p.e += 5; p.r += 4; p.setMem('ghaRawlings', true) },
      },
    ],
  },

  // ─── DEMOCRATIC TRANSITION 1992 ───────────────────────────────────────────────

  {
    id: 'gha_first_election',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.ghaFirstElection,
    text: 'Rawlings has put on civilian clothes and won an election. The National Democratic Congress, his party. The opposition boycotted the parliamentary vote citing irregularities. So the transition to democracy has produced a civilian Rawlings, which is either a paradox or a continuity depending on how you read the last decade. You cast a ballot. It is the first election you have voted in. The act of voting contains, simultaneously, the feeling of participation and the knowledge of its limits.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 4; p.addFlag('gha_first_voter'); p.setMem('ghaFirstElection', true) },
  },

  // ─── TROTRO / ACCRA URBAN TEXTURE ────────────────────────────────────────────

  {
    id: 'gha_accra_trotro',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1985 &&
      !G.mem?.ghaTrotro,
    text: 'The trotro runs when it is full. You learn this early: you do not wait for a schedule, you wait for the critical mass of bodies that makes the journey economically worth it for the driver. The route is announced by the mate hanging from the door, shouting the destination over the traffic. Accra traffic is a category of experience. The city has grown faster than any plan for it. You navigate it the way you navigate everything here: by knowing the actual logic rather than the official one.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 3; p.e += 3; p.addFlag('gha_accra_urban'); p.setMem('ghaTrotro', true) },
  },

  // ─── DIASPORA EXPECTATION ─────────────────────────────────────────────────────

  {
    id: 'gha_abroad_expectation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 1990 &&
      !G.mem?.ghaAbroad,
    text: 'Someone in your extended family is abroad. Possibly several people. The ones abroad are measured against an expectation that going abroad creates: that you will succeed, that you will send money, that you will come back transformed. The ones at home are measured against what the ones abroad send. You are navigating your own position in this system — whether you stay and receive, or go and send, or go and fail to send in the quantities that the system expects.',
    choices: [
      {
        text: 'You have gone or are going. The expectation is something you will carry with you.',
        tag: 'gha_diaspora_pressure',
        outcome: 'You know what success means to the people waiting for the Western Union notification.',
        effect: (p) => { p.addFlag('gha_diaspora_pressure'); p.r += 5; p.m += 3; p.setMem('ghaAbroad', true) },
      },
      {
        text: 'You are staying. You have decided the abroad path is not yours.',
        tag: 'gha_stayed_deliberate',
        outcome: 'Staying is also a choice, though it is less legible as one.',
        effect: (p) => { p.addFlag('gha_stayed_deliberate'); p.m += 4; p.karma += 4; p.setMem('ghaAbroad', true) },
      },
    ],
  },

  // ─── DUMSOR (POWER CUTS) ──────────────────────────────────────────────────────

  {
    id: 'gha_dumsor',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 2014 && G.currentYear <= 2017 &&
      !G.mem?.ghaDumsor,
    text: '"Dumsor" means off-on in Twi, and in 2014–2016 it is the rhythm of life. The power goes off for twelve hours, comes on for twenty-four, goes off again. The schedule, when there is one, is honoured partially. Businesses run on generators. The generators run on diesel. The diesel has a price. The hashtag is trending. The opposition has made it the central political question. You are learning which of your neighbours have generators by who has lights when you do not.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 3; p.e += 3; p.addFlag('gha_dumsor_era'); p.setMem('ghaDumsor', true) },
  },

  // ─── YEAR OF RETURN ───────────────────────────────────────────────────────────

  {
    id: 'gha_year_of_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_GHANAIAN(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2022 &&
      !G.mem?.ghaYearReturn,
    text: 'The government has declared 2019 the Year of Return — 400 years after the first enslaved Africans arrived in what would become the United States. African-Americans and diaspora Africans are coming. Some are moving here permanently. The ceremony at the Cape Coast castle includes African-American celebrities who weep at the door of no return. You watch this with feelings that do not simplify into one thing: pride at the recognition, unease at the performance, genuine warmth toward people trying to find something that was taken from their ancestors, a private observation about who is selling what to whom.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 5; p.m += 4; p.addFlag('gha_year_of_return_witness'); p.setMem('ghaYearReturn', true) },
  },

]

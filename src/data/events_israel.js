// events_israel.js — Israeli arc events
//
// Covers the full arc of Israeli Jewish and Arab citizen life:
//   Founding era:    1948 war, Holocaust shadow, Mizrahi arrival and ma'abara
//   National life:   IDF mandatory service, Yom Kippur War 1973
//   Immigration:     Soviet aliyah 1990s, Ethiopian aliyah (Operations Moses/Solomon)
//   Crisis:          Rabin assassination 1995, second intifada civilian experience 2001-04
//   Choices:         Settlement movement, post-Oslo disillusionment
//   Identity:        Arab citizen dual identity, Haredi/secular tension
//   Trauma:          October 7 2023
//
// Excludes Palestinian-specific occupation events (see events_palestine.js).

const isIsraeli = (G) => G.currentCountry?.name === 'Israel'
const isMizrahi = (G) =>
  ['mizrahi_jewish', 'yemenite_jewish', 'moroccan_jewish', 'iraqi_jewish'].includes(G.character?.ethnicity)
const isAshkenazi = (G) => G.character?.ethnicity === 'ashkenazi_jewish'
const isEthiopian = (G) => G.character?.ethnicity === 'ethiopian_jewish'
const isRussian = (G) => G.character?.ethnicity === 'russian_jewish_israel'
const isArabCitizen = (G) => G.character?.ethnicity === 'arab_citizen_israel'
const isJewish = (G) =>
  ['mizrahi_jewish', 'ashkenazi_jewish', 'ethiopian_jewish', 'russian_jewish_israel', 'haredi_jewish', 'druze_israel'].includes(G.character?.ethnicity)

export const ISRAEL_EVENTS = [

  // ── FOUNDING GENERATION ────────────────────────────────────────────────────

  {
    id: 'il_founding_memory',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      G.currentYear >= 1948 && G.currentYear <= 1963 &&
      !isArabCitizen(G) &&
      G.age >= 5 && G.age <= 16 &&
      !G.mem?.ilFoundingFired,
    text: (G) => {
      if (isMizrahi(G)) {
        return 'You arrived from a country that no longer wants you — or you were born to parents who did. The ma\'abara is corrugated metal in a field at the edge of the desert. The Jewish Agency worker says it is temporary. Your parents speak Arabic at home and the school speaks Hebrew and the school makes clear which language is appropriate here. You are inside the project of building a state that did not exist before you were born, and you are building it from a disadvantaged position in the project.'
      }
      return 'You are a child in the new state. The independence declaration was on the radio and you were in the room when the adults heard it, or your parents describe being in the room. You have been told the story of why this place, this year, this people. You are the child this was built for. You understand, the way children understand things placed inside them as certainty, that this is true and that it comes with a specific weight.'
    },
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('built_state_generation'); p.setMem('ilFoundingFired', true) },
  },

  // ── MIZRAHI MA'ABARA ───────────────────────────────────────────────────────

  {
    id: 'il_mizrahi_maabara',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isIsraeli(G) &&
      isMizrahi(G) &&
      G.currentYear >= 1949 && G.currentYear <= 1972 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.ilMizrahiFired,
    text: (G) => {
      const yr = G.currentYear ?? 1958
      const origin = yr < 1960 ? 'from Morocco or Iraq or Yemen or Egypt' : 'from a country in the Arab world'
      return `Your parents arrived ${origin} and were sent to the development town at the edge of the desert. The Ashkenazim who arrived at the same time were placed differently — in the coastal cities, in the established moshavim, in the institutions. The difference is not discussed as a policy but is visible as a fact. The school here is not the school in Tel Aviv. The path from here to where the Ashkenazim are is longer than the map suggests and everyone knows this and no one says it directly.`
    },
    choices: [
      {
        text: 'The distance is real — you will close it through what you build',
        tag: null,
        outcome: 'The ambition is real and the structural obstacles are real and both things will be true for a long time.',
        effect: (p) => { p.e += 5; p.m -= 5; p.addFlag('mizrahi_maabara'); p.setMem('ilMizrahiFired', true) },
      },
      {
        text: 'You carry this and you carry the culture that came with you',
        tag: null,
        outcome: 'The culture — the music, the food, the language of the house — is what the displacement did not take.',
        effect: (p) => { p.m += 3; p.addFlag('mizrahi_maabara'); p.addFlag('mizrahi_culture_kept'); p.setMem('ilMizrahiFired', true) },
      },
    ],
    effect: null,
  },

  // ── IDF MANDATORY SERVICE ──────────────────────────────────────────────────

  {
    id: 'il_idf_service',
    phase: 'young_adult',
    weight: 10,
    when: (G) =>
      isIsraeli(G) &&
      !isArabCitizen(G) &&
      G.currentYear >= 1950 &&
      G.age >= 18 && G.age <= 19 &&
      !G.mem?.ilIdfFired,
    text: (G) => {
      const isFemale = G.character?.gender === 'female'
      const isDruze = G.character?.ethnicity === 'druze_israel'
      if (isDruze) return 'Druze men serve in the IDF under the Blood Covenant — a separate enlistment track, by tradition rather than the general conscription law. Your family considers this service honourable. The army thinks of Druze units as reliable. The question of what you are defending and for whom is one that different people in your community answer differently.'
      if (isFemale) return 'The tzav giyus comes when you turn eighteen. Two years for women. You knew it was coming since you were twelve — everyone does. The unit you are assigned to will determine the shape of the next two years more completely than anything you have chosen. You are now part of the institution that is the central fact of Israeli life.'
      return 'The draft order comes when you turn eighteen. Three years for men. You have known this since childhood, which means it arrives not as a surprise but as a fact you have been carrying. The unit you are assigned to will shape the next three years — a platoon, a set of relationships, a landscape — more completely than anything you have previously chosen. You are now part of the institution that defines what it means to be Israeli.'
    },
    choices: [
      {
        text: 'Combat unit — the full service',
        tag: null,
        outcome: 'The training is hard and the unit is close and both of these things will be true for the rest of your life.',
        effect: (p) => { p.h += 5; p.s += 5; p.m -= 3; p.addFlag('idf_served'); p.addFlag('idf_combat_veteran'); p.setMem('ilIdfFired', true) },
      },
      {
        text: 'Support or intelligence — the service, not the frontline',
        tag: null,
        outcome: 'You serve. The service is real. The frontline is not the only part of the service that is real.',
        effect: (p) => { p.e += 5; p.s += 3; p.addFlag('idf_served'); p.setMem('ilIdfFired', true) },
      },
    ],
    effect: null,
  },

  // ── YOM KIPPUR WAR 1973 ─────────────────────────────────────────────────────

  {
    id: 'il_yom_kippur_personal',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      G.flags.has('idf_served') &&
      G.currentYear === 1973 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.ilYomKippurFired,
    text: 'The sirens begin on Yom Kippur. The holiest day of the year, the day the country stops — and then it does not stop in the way it has stopped every year before. The reservist call-ups are happening outside synagogues, from families who are fasting. Egypt crossed the Suez at multiple points simultaneously. Syria took the Golan by afternoon. The first two days on the radio are not describing the situation honestly. You understand what is being not-described. You are being called up.',
    choices: [
      {
        text: 'You are deployed to the front',
        tag: null,
        outcome: 'The first days are the worst. The army that was supposed to absorb the attack does not immediately absorb it. Then the counter-attack. Then it ends. You come back carrying what the first days were.',
        effect: (p) => { p.h -= 8; p.m -= 15; p.addFlag('yom_kippur_front_survived'); p.setMem('ilYomKippurFired', true) },
      },
      {
        text: 'You wait for orders that do not come — you watch it from the rear',
        tag: null,
        outcome: 'You are in reserve at a distance. The war reaches you through bulletins and through the men returning. The close calls are other people\'s close calls this time.',
        effect: (p) => { p.m -= 8; p.addFlag('yom_kippur_witness'); p.setMem('ilYomKippurFired', true) },
      },
    ],
    effect: null,
  },

  // ── SOVIET JEWISH ALIYAH 1990S ─────────────────────────────────────────────

  {
    id: 'il_soviet_aliyah_arrival',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      isRussian(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1997 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.ilSovietAliyahFired,
    text: 'You landed at Ben Gurion Airport with a suitcase and a degree that does not transfer. The Soviet Union is dissolving behind you. Ahead is a country that exists in a language you cannot yet speak. The engineer who is now a supermarket cashier — this is not a metaphor, this is someone you know. The word oleh means "one who ascends." The absorption centre smells of institutional cleaning fluid. Someone hands you a textbook for Hebrew learners. The language will take eighteen months to live inside.',
    choices: [
      {
        text: 'Rebuild here — this is the place and you will make it work',
        tag: null,
        outcome: 'The rebuilding is real and slower than you hoped and more complete than you feared.',
        effect: (p) => { p.m -= 5; p.e += 5; p.addFlag('soviet_oleh_israel'); p.setMem('ilSovietAliyahFired', true) },
      },
      {
        text: 'Survive the descent first — the ascent can come later',
        tag: null,
        outcome: 'The gap between who you were and what is available is the specific texture of the first years. You work inside it.',
        effect: (p) => { p.m -= 10; p.mo -= 500; p.addFlag('soviet_oleh_israel'); p.addFlag('emigrant_deskilling'); p.setMem('ilSovietAliyahFired', true) },
      },
    ],
    effect: null,
  },

  // ── ETHIOPIAN ALIYAH ───────────────────────────────────────────────────────

  {
    id: 'il_ethiopian_aliyah_arrival',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      isEthiopian(G) &&
      G.currentYear >= 1984 && G.currentYear <= 1993 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.ilEthAliyahFired,
    text: (G) => {
      const yr = G.currentYear ?? 1991
      const operation = yr <= 1985 ? 'Operation Moses — the secret airlift' : 'Operation Solomon — thirty-six hours, fourteen thousand people'
      return `The ${operation}. You arrived knowing the destination was a country you had prayed toward your entire life. The Israel you landed in is not the Israel from the prayers. The absorption centre workers are kind and do not know what to make of you. The other Israelis — you will notice this before they do — see you as African before they see you as Jewish. The Judaism your family has practiced for two thousand years in Ethiopia is, in various official and unofficial ways, questioned. You carry a faith and an identity that is yours and also contested.`
    },
    choices: [
      {
        text: 'This is your country and you will make your place in it',
        tag: null,
        outcome: 'The making of place is slower than the claim. Both things are true.',
        effect: (p) => { p.m -= 5; p.karma += 5; p.addFlag('ethiopian_oleh_israel'); p.setMem('ilEthAliyahFired', true) },
      },
      {
        text: 'You see the discrimination clearly and name it for what it is',
        tag: null,
        outcome: 'Naming it costs something socially and changes nothing immediately. The naming is its own record.',
        effect: (p) => { p.m -= 8; p.e += 5; p.addFlag('ethiopian_oleh_israel'); p.addFlag('discrimination_named'); p.setMem('ilEthAliyahFired', true) },
      },
    ],
    effect: null,
  },

  // ── RABIN ASSASSINATION 1995 ───────────────────────────────────────────────

  {
    id: 'il_rabin_killed',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isIsraeli(G) &&
      G.currentYear === 1995 &&
      G.age >= 14 && G.age <= 70 &&
      !G.mem?.ilRabinFired,
    text: 'The rally in Tel Aviv was for peace. He spoke. The crowd sang. He folded the paper with the lyrics in his jacket pocket. The shots were from behind. At 11:10 PM the radio announces he has died at Ichilov Hospital. The killer is a Jewish Israeli — a student from Bar-Ilan University. This is the specific content of the shock: not that a prime minister was killed, which has happened in other countries, but who killed him and why. The why is written in a letter found in the killer\'s pocket. You will return to the letter for years.',
    choices: [
      {
        text: 'You were at the rally — you were there when it happened',
        tag: null,
        outcome: 'The specific fact of having been there will not leave. The square will be renamed for him. You will never stop seeing it as it was that night.',
        effect: (p) => { p.m -= 20; p.addFlag('rabin_killed_witness'); p.setMem('ilRabinFired', true) },
      },
      {
        text: 'You heard it on the radio or from someone running in',
        tag: null,
        outcome: 'The news arrives the way national traumas arrive — through someone else\'s voice, in a room you will remember.',
        effect: (p) => { p.m -= 14; p.addFlag('rabin_killed_witness'); p.setMem('ilRabinFired', true) },
      },
    ],
    effect: null,
  },

  // ── SECOND INTIFADA CIVILIAN EXPERIENCE ────────────────────────────────────

  {
    id: 'il_second_intifada_fear',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      !isArabCitizen(G) &&
      G.currentYear >= 2001 && G.currentYear <= 2005 &&
      G.age >= 14 && G.age <= 65 &&
      !G.mem?.ilIntifadaFired,
    text: 'The bus is no longer a simple thing. The café has become a calculation you run before you sit down. The Dolphinarium bombing killed twenty-one teenagers on a Friday night. The Passover Seder massacre in Netanya killed thirty. The Sbarro pizza restaurant. Bus Route 2. You know the names of the places not because you sought them out but because they are the geography of these four years. You have changed your routes. You enter public spaces differently. This is the daily arithmetic of the intifada — the part that does not appear in casualty statistics.',
    choices: [
      {
        text: 'Continue living — to stop living normally is to let it work',
        tag: null,
        outcome: 'You continue. Some Israelis talk about this as a form of resistance. You are not sure it is resistance. You continue anyway.',
        effect: (p) => { p.m -= 12; p.addFlag('second_intifada_terror_lived'); p.setMem('ilIntifadaFired', true) },
      },
      {
        text: 'Restrict yourself — some places are not worth the calculation',
        tag: null,
        outcome: 'You narrow the circle. The narrowing is its own loss, which is the point of the narrowing.',
        effect: (p) => { p.m -= 18; p.addFlag('second_intifada_terror_lived'); p.setMem('ilIntifadaFired', true) },
      },
    ],
    effect: null,
  },

  // ── SETTLEMENT QUESTION ────────────────────────────────────────────────────

  {
    id: 'il_settlement_question',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isIsraeli(G) &&
      isJewish(G) &&
      G.currentYear >= 1970 &&
      G.age >= 22 && G.age <= 50 &&
      !G.mem?.ilSettlementFired,
    text: 'The settlement movement is offering: land in the hills above the Jordan Valley, subsidized mortgages, a community bound by shared purpose, the full weight of religious-nationalist conviction. The question is not only legal — the settlements are contested under international law in ways you have heard argued since you were a child. The question is also about what you are willing to build, where you are willing to build it, and what you will tell your children about where they grew up.',
    choices: [
      {
        text: 'Move — the land and the conviction are real',
        tag: null,
        outcome: 'You move. The community is real. The contested status of the land is also real. You live inside both.',
        effect: (p) => { p.m += 6; p.addFlag('settlement_moved'); p.setMem('ilSettlementFired', true) },
      },
      {
        text: 'Stay inside the Green Line — this choice matters',
        tag: null,
        outcome: 'You stay. The decision has a political content you are aware of. The awareness is part of what you are.',
        effect: (p) => { p.karma += 5; p.setMem('ilSettlementFired', true) },
      },
    ],
    effect: null,
  },

  // ── ARAB CITIZEN DIVIDED SELF ──────────────────────────────────────────────

  {
    id: 'il_arab_citizen_identity',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      isIsraeli(G) &&
      isArabCitizen(G) &&
      G.currentYear >= 1960 &&
      G.age >= 14 && G.age <= 26 &&
      !G.mem?.ilArabCitizenFired,
    text: 'You carry two identities simultaneously, and they are not equally comfortable. The Israeli passport and the Arabic name. The Hebrew you speak at work and the Arabic you speak at home. The state that built its national mythology around a narrative that required your people\'s displacement — and is also your state, the only one you have ever held, the one that provides your health insurance and your ID. On Independence Day, Palestinian citizens observe their own version of the day separately. You have attended both kinds of observance in the same week. You know exactly what you were doing.',
    choices: [
      {
        text: 'Navigate both — this is the citizenship you were born to',
        tag: null,
        outcome: 'You learn to move between the frames. The skill is real and the cost of maintaining it is real.',
        effect: (p) => { p.s += 5; p.e += 3; p.m -= 5; p.addFlag('arab_citizen_divided_self'); p.setMem('ilArabCitizenFired', true) },
      },
      {
        text: 'The Palestinian identity is primary — the citizenship is a document',
        tag: null,
        outcome: 'You locate yourself clearly. The clarity has costs in certain contexts. You have the clarity.',
        effect: (p) => { p.m -= 3; p.karma += 5; p.addFlag('arab_citizen_divided_self'); p.setMem('ilArabCitizenFired', true) },
      },
    ],
    effect: null,
  },

  // ── OCTOBER 7 2023 ─────────────────────────────────────────────────────────

  {
    id: 'il_oct7_reckoning',
    phase: 'midlife',
    weight: 9,
    when: (G) =>
      isIsraeli(G) &&
      G.currentYear === 2023 &&
      G.age >= 14 &&
      !G.mem?.ilOct7Fired,
    text: (G) => {
      const isArab = isArabCitizen(G)
      if (isArab) return 'The alert sounds at 6:29 on a Saturday morning. What unfolds over the following hours is the worst single-day killing of Jewish people since the Holocaust. It happens fifteen kilometres from where you live. You are an Arab citizen of Israel. You are also Arab. The two facts have always coexisted in you with some difficulty; what is happening to your state now makes the difficulty acute in a way you have not previously experienced. Your Jewish neighbours. Your Arabic-speaking family watching from across the border. The impossibility of this position is not new. It has never been this visible.'
      return 'The alert sounds at 6:29 on a Saturday morning. What unfolds over the following hours comes through in pieces: the kibbutzim, the music festival, the scale becoming clear in stages across the day. By evening: over a thousand people killed, two hundred and fifty taken as hostages into Gaza. The military response begins within days. You know people at the festival or with family in the kibbutzim or with children in the army. The question of what a response looks like that is adequate to this and also adequate to what comes after does not have an answer you can find.'
    },
    choices: [
      {
        text: 'You lost someone — a friend, a cousin, a neighbour',
        tag: null,
        outcome: 'The loss is specific and permanent. The event has a name and the name belongs to the person you lost.',
        effect: (p) => { p.m -= 25; p.addFlag('oct7_survived'); p.addFlag('oct7_lost_someone'); p.setMem('ilOct7Fired', true) },
      },
      {
        text: 'You were not directly struck — but it struck everything',
        tag: null,
        outcome: 'The event reshapes the background of everything after it. You are in the after now.',
        effect: (p) => { p.m -= 15; p.addFlag('oct7_survived'); p.setMem('ilOct7Fired', true) },
      },
    ],
    effect: null,
  },

  // ── POST-OSLO DISILLUSIONMENT ──────────────────────────────────────────────

  {
    id: 'il_post_oslo_despair',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isIsraeli(G) &&
      isJewish(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2010 &&
      G.age >= 25 && G.age <= 65 &&
      !G.mem?.ilPostOsloFired,
    text: 'You remember the handshake on the White House lawn. You remember believing it was a beginning. The Rabin assassination was the first unravelling. The Camp David breakdown in 2000 was the second. The intifada was the third. The settlement population has continued growing through every peace process. The Palestinian Authority exists but the state it was supposed to lead has not materialised in the way the Oslo framework suggested it would. You have arrived at a position you cannot name exactly — not despair, not cynicism, not hope, but something that can hold all three without collapsing.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('post_oslo_israeli_despair'); p.setMem('ilPostOsloFired', true) },
  },

]

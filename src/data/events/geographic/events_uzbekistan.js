// events_uzbekistan.js — Uzbekistan character depth
// 10 events covering: Karimov era surveillance and faith crackdown, Andijan massacre 2005,
// Silk Road identity, Fergana Valley borderlands, alphabet transitions,
// labour migration to Russia, Karimov's death 2016, Mirziyoyev thaw.
// Supplementary to events_central_asia.js (cotton monoculture, Aral Sea).

const IS_UZBEK = (G) => G.character.country?.name === 'Uzbekistan'
const IS_FERGANA = (G) => G.character.country?.name === 'Uzbekistan' &&
  (G.place?.region?.includes('Fergana') || G.character.ethnicity?.includes('Uzbek'))

export const UZBEKISTAN_EVENTS = [

  // ─── SILK ROAD IDENTITY ──────────────────────────────────────────────────────

  {
    id: 'uzb_silk_road_identity',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 1950 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.uzbSilkRoad,
    text: 'The teacher says: Timur built the Registan. Tamerlane to the Europeans, Timur to you — the fourteenth-century conqueror who made Samarkand one of the great cities of the world, whose empire stretched from Anatolia to Delhi. The Registan is three madrasas arranged around a square of blue tile. You have seen it. You live inside the same geography as this thing. The teacher says it and you understand that this is something to carry.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 4; p.addFlag('uzb_silk_road_identity'); p.setMem('uzbSilkRoad', true) },
  },

  // ─── THREE ALPHABETS ─────────────────────────────────────────────────────────

  {
    id: 'uzb_alphabet_generation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2010 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.uzbAlphabet,
    text: 'Your grandparents\' handwriting is Arabic script — the Perso-Arabic alphabet that was used until 1928, when the Soviet state replaced it with Latin, then replaced Latin with Cyrillic in 1940. You learned Cyrillic. In 1993 the government switched back to a modified Latin. The forms at the government office are now in the new Latin. Your grandmother\'s letters, written in Cyrillic, need someone to translate. Her grandmother\'s correspondence, in Arabic script, is inaccessible to almost everyone who is related to it.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 5; p.addFlag('uzb_alphabet_transition'); p.setMem('uzbAlphabet', true) },
  },

  // ─── MAHALLA AS SURVEILLANCE ─────────────────────────────────────────────────

  {
    id: 'uzb_mahalla_system',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 1992 && G.currentYear <= 2016 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.uzbMahalla,
    text: 'The mahalla is the neighbourhood council: an institution that predates the Soviet state and survived it. Under Karimov it became something else. The aksakal — the elder — keeps a list of who attends mosque, how often, with whom. A new family moving in is interviewed. A son who returned from studying in Tashkent is noted. The mahalla gives you your birth certificate, your marriage registration, your welfare payment when there is one. The mahalla is also the mechanism through which the state knows what it needs to know about you.',
    choices: [
      {
        text: 'You have learned to be careful around the mahalla apparatus.',
        tag: 'uzb_mahalla_careful',
        outcome: 'The art of being unremarkable: the normal answers, the normal attendance, the face that reflects nothing the state did not put there.',
        effect: (p) => { p.addFlag('uzb_mahalla_careful'); p.m -= 6; p.e += 2; p.addFlag('uzb_karimov_era'); p.setMem('uzbMahalla', true) },
      },
      {
        text: 'You avoid the mahalla where possible and live accordingly.',
        tag: 'uzb_mahalla_distanced',
        outcome: 'Distance has costs: the services, the social fabric, the thing you need at a difficult moment that the mahalla controls. You have decided the other cost is higher.',
        effect: (p) => { p.addFlag('uzb_mahalla_distanced'); p.m -= 4; p.s -= 2; p.addFlag('uzb_karimov_era'); p.setMem('uzbMahalla', true) },
      },
    ],
  },

  // ─── FAITH UNDER SURVEILLANCE ────────────────────────────────────────────────

  {
    id: 'uzb_faith_crackdown',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.religion?.toLowerCase().includes('muslim') &&
      G.currentYear >= 1995 && G.currentYear <= 2016 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.uzbFaith,
    text: 'The SNB — the National Security Service — has a category for what it considers dangerous: Wahhabi. The category has expanded until it includes any visible religiosity that the state did not authorize. A beard is a data point. Attending Friday prayers at an unregistered mosque is a data point. Owning a Koran not issued by the state-approved Muftiate is a data point. Men in the Fergana Valley disappear into Jaslyk prison for this. Jaslyk is in the desert. The conditions in Jaslyk are described in Human Rights Watch reports. The reports are accurate.',
    choices: [
      {
        text: 'You practice privately. The kitchen, the family, the unmarked.',
        tag: 'uzb_faith_private',
        outcome: 'The faith lives in the domestic space, in the things said at funerals, in what passes between family members without being named as what it is.',
        effect: (p) => { p.addFlag('uzb_faith_private'); p.m -= 5; p.karma += 5; p.addFlag('uzb_faith_under_surveillance'); p.setMem('uzbFaith', true) },
      },
      {
        text: 'You limit your visible practice to what is formally permitted.',
        tag: 'uzb_faith_permitted',
        outcome: 'The state-registered mosque, the approved texts, the registered imam. The compliance is real and so is the gap between it and what was handed down.',
        effect: (p) => { p.addFlag('uzb_faith_permitted'); p.m -= 8; p.r += 6; p.addFlag('uzb_faith_under_surveillance'); p.setMem('uzbFaith', true) },
      },
    ],
  },

  // ─── ANDIJAN MASSACRE 2005 ───────────────────────────────────────────────────

  {
    id: 'uzb_andijan_2005',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2007 &&
      G.age >= 18 &&
      !G.mem?.uzbAndijan,
    text: 'On May 13, 2005, in Andijan: soldiers open fire on protesters in the square. The government says Islamic terrorists stormed an armory; witnesses describe a crowd of traders, families, people who had come out to see what was happening. The official death toll is 187. Uzbek human rights organisations count between 500 and 750. The city is sealed. Journalists are expelled. The European Union issues a statement. Karimov expels the US military from Karshi-Khanabad. Russia and China support the government\'s account. Within weeks, the story is off the front pages elsewhere. Inside Uzbekistan, the story was never on the front pages. You know what you know from sources you do not name.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 6; p.e += 3; p.addFlag('uzb_andijan_witness'); p.setMem('uzbAndijan', true) },
  },

  // ─── LABOUR MIGRATION TO RUSSIA ──────────────────────────────────────────────

  {
    id: 'uzb_labour_russia',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2022 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.uzbLabour,
    text: 'The bus from Tashkent to Moscow takes three days. You have made the journey or watched family members make it. Two to three million Uzbeks are in Russia at any given time — building apartment blocks, staffing markets, filling construction roles that Russian workers do not want at the wages being offered. The remittance comes back through transfer services that charge fifteen percent. The government calls it a safety valve. You call it what it is: the economy cannot produce enough work, so the surplus goes north.',
    choices: [
      {
        text: 'You went yourself. The money justified the distance.',
        tag: 'uzb_russia_migrant',
        outcome: 'The Moscow winter, the shared apartment with nine other men from home, the foreman who had your passport. The money arrived. You have not told your parents everything about what the money cost.',
        effect: (p) => { p.mo += 4000; p.m -= 8; p.r += 5; p.addFlag('uzb_russia_migrant'); p.addFlag('labour_migrant'); p.setMem('uzbLabour', true) },
      },
      {
        text: 'Others in your family went. You stayed.',
        tag: 'uzb_stayed',
        outcome: 'The village empties every autumn and refills, partially, in December. You are among those who stayed — by choice, or circumstance, or the role the family needed you to play.',
        effect: (p) => { p.r += 4; p.m -= 3; p.addFlag('uzb_stayed_behind'); p.setMem('uzbLabour', true) },
      },
    ],
  },

  // ─── FERGANA VALLEY BORDERLANDS ──────────────────────────────────────────────

  {
    id: 'uzb_fergana_borders',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 1991 && G.currentYear <= 2020 &&
      G.age >= 16 &&
      (G.place?.region?.toLowerCase().includes('fergana') || G.place?.region?.toLowerCase().includes('andijan') || G.place?.region?.toLowerCase().includes('namangan')) &&
      !G.mem?.uzbFergana,
    text: 'The Fergana Valley was divided by Soviet border demarcation in the 1920s and 1930s — lines drawn to ensure no single republic could dominate the others, cutting through towns, splitting ethnic communities, placing Uzbek enclaves inside Kyrgyzstan and Tajikistan. After independence the borders became real. In 2010 violence between Kyrgyz and Uzbeks in Osh and Jalal-Abad kills four hundred, perhaps more — the count depends on who is counting. The Uzbeks who were there and who have family on both sides of the line carry a specific geography of belonging: the cousin who is a different citizen now, the market that requires a crossing.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.addFlag('uzb_fergana_generation'); p.setMem('uzbFergana', true) },
  },

  // ─── KARIMOV'S DEATH 2016 ────────────────────────────────────────────────────

  {
    id: 'uzb_karimov_death',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2017 &&
      G.age >= 30 &&
      !G.mem?.uzbKarimovDeath,
    text: 'Islam Karimov dies in September 2016. He has been the leader since before independence — twenty-seven years. The Soviet-era first secretary who became the president who became the permanent president. You have lived your entire adult life under his rule. The state mourning is official and extensive. What you feel is harder to name: it is not quite grief because grief requires loss, and he was not a thing you had. It is something more like the end of a weather system — the pressure was so constant that its absence creates its own disorientation.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 3; p.e += 2; p.addFlag('uzb_karimov_death_witness'); p.setMem('uzbKarimovDeath', true) },
  },

  // ─── MIRZIYOYEV THAW ─────────────────────────────────────────────────────────

  {
    id: 'uzb_mirziyoyev_opening',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_UZBEK(G) &&
      G.currentYear >= 2017 && G.currentYear <= 2024 &&
      G.age >= 25 &&
      G.flags.has('uzb_karimov_era') &&
      !G.mem?.uzbMirz,
    text: 'Mirziyoyev releases some political prisoners. The borders with Kazakhstan and Kyrgyzstan open. Tourists begin arriving in Samarkand — the Registan becoming a backdrop for photographs taken by people who do not know who Timur was. The currency becomes convertible. The forced cotton harvest is officially ended. Each of these things is real. The SNB still exists. The press is not free. The reform is announced from above and conducted at the pace the leadership decides. You have learned, over twenty-seven years, to calibrate hope carefully: enough to function, not enough to be destroyed when it decelerates.',
    choices: [
      {
        text: 'The opening is real enough to act on.',
        tag: 'uzb_thaw_embraced',
        outcome: 'You speak more openly than you have in years. You apply for a thing you would not have applied for before. The calibration shifts, slightly, toward something that is not quite optimism but is adjacent to it.',
        effect: (p) => { p.addFlag('uzb_thaw_embraced'); p.m += 6; p.s += 2; p.addFlag('uzb_thaw_generation'); p.setMem('uzbMirz', true) },
      },
      {
        text: 'The structure is the same structure. You wait.',
        tag: 'uzb_thaw_skeptical',
        outcome: 'The border opens. The tourists come. The calculus that kept you careful is still running. You have seen what happens to people who recalibrated too quickly.',
        effect: (p) => { p.addFlag('uzb_thaw_skeptical'); p.r += 4; p.e += 3; p.addFlag('uzb_thaw_generation'); p.setMem('uzbMirz', true) },
      },
    ],
  },

  // ─── LATE RECKONING ──────────────────────────────────────────────────────────

  {
    id: 'uzb_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_UZBEK(G) &&
      G.age >= 60 &&
      !G.mem?.uzbLate,
    text: 'You have lived inside the Soviet project, the independence moment, the Karimov consolidation, and whatever comes after. The Registan is still there. The Aral Sea is not. The language you learned in school is now in an alphabet that was not the alphabet you learned it in. Three scripts in one lifetime is a specific kind of cultural dislocation that does not have an entry in the standard accounts of what the twentieth century did to people. You know it from the inside. The cotton still grows in the fields where the Syr Darya\'s tributaries used to flow. The dust from the exposed sea bottom still reaches you on certain days in a certain wind. You have outlasted the systems that formed you. This is something.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 7; p.karma += 4; p.e += 4; p.addFlag('uzb_testigo_generation'); p.setMem('uzbLate', true) },
  },

]

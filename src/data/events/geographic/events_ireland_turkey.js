// Ireland and Turkey character events
// Ireland: supplements clergy events (priest arc already exists in events_clergy.js)
// Turkey: no dedicated character events existed previously

export const IRELAND_TURKEY_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // IRELAND
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ire_emigration_wave',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem.ireEmigration,
    text: 'Everyone is leaving or has left or is about to leave. England, America, Australia, the boats from Dun Laoghaire. You are making the decision your parents made, or your brothers made, or that you watched the whole parish make. The priests say that those who stay are the backbone of the nation. The backbone is thinner every year.',
    choices: [
      {
        text: 'You leave. London, Boston, somewhere.',
        tag: null,
        outcome: 'The boat-train from Dun Laoghaire, or the airport at Shannon. You join the generation that is Irish at one remove.',
        effect: (p) => { p.m -= 5; p.addFlag('irish_emigrant_generation'); p.addFlag('emigrated'); p.emigrateTo(['United Kingdom', 'United States']); p.setResidency('work_visa'); p.setMem('ireEmigration', true) },
      },
      {
        text: 'You stay. You are not sure why.',
        tag: null,
        outcome: 'The town empties around you in increments. You stay and you watch it empty and you are not sure whether staying was a choice or a default.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('stayed_in_ireland'); p.setMem('ireEmigration', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ire_troubles_border',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1970 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem.ireTroubles,
    text: (G) => 'The Troubles are on the other side of the border but they are not on the other side of anything in the way the border implies. The news from Derry, from Belfast' + (G.currentYear >= 1974 ? ', from the bombs in Dublin in 1974 — seventeen people dead in the city centre, the UVF' : '') + '. The army checkpoints. The word republican has a charge that depends entirely on who says it and to whom. You are in the Republic, technically not in the conflict, and that is not the same as not being in it.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('troubles_adjacent'); p.setMem('ireTroubles', true) },
  },

  {
    id: 'ire_celtic_tiger',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1995 && G.currentYear <= 2006 &&
      G.age >= 20 &&
      !G.mem.ireCelticTiger,
    text: 'The cranes are everywhere, and the airport is full of people coming home who left in the eighties. House prices double and then double again. American companies have come for the tax rate and the English language, and the wages are real. The wages go into houses whose prices assume this never stops.',
    context: 'Irish GDP grew at 7 to 11 per cent a year between 1995 and 2000, driven by foreign direct investment, EU structural funds and a 12.5 per cent corporate tax rate.',
    choices: [
      {
        text: 'You buy into it — literally.',
        tag: null,
        outcome: 'The house you buy in 2002 is worth twice what you paid in 2006. You feel wealthy. This is the feeling the decade is built on.',
        effect: (p) => { p.m += 8; p.mo += 3000; p.addFlag('celtic_tiger_generation'); p.setMem('ireCelticTiger', true) },
      },
      {
        text: 'Something about it seems miscalibrated.',
        tag: null,
        outcome: 'You do not buy. You are not sure this is wisdom or fear. When 2008 comes, you will have one clear answer, and several more complicated ones.',
        effect: (p) => { p.m += 3; p.karma += 4; p.addFlag('celtic_tiger_generation'); p.setMem('ireCelticTiger', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ire_crash_2008',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 2008 && G.currentYear <= 2013 &&
      G.age >= 25 &&
      !G.mem.ireCrash,
    text: (G) => 'The property market collapses. ' + (G.currentYear >= 2009 ? 'Anglo Irish Bank is nationalized. ' : '') + 'The government guarantees the bank debts — all of them, €400 billion, in a single September night in 2008. The guarantee is questioned before the ink is dry. ' + (G.currentYear >= 2011 ? 'The IMF and EU arrive in November 2010. ' : '') + 'The austerity cuts: health, education, social welfare. The emigration starts again. Young people you know are leaving for Australia, Canada, the US. The country that had just stopped exporting its young is exporting them again.',
    choices: [
      {
        text: 'You lose a job, a house, or both.',
        tag: null,
        outcome: 'The losses. The debt that remains after the asset is gone. The decade of managing what the crash left.',
        effect: (p) => { p.m -= 16; p.wipeMoney(0.4); p.r += 8; p.addFlag('irish_crash_generation'); p.setMem('ireCrash', true) },
      },
      {
        text: 'You are less exposed. You watch the losses happen around you.',
        tag: null,
        outcome: 'The people who leave. The houses that go quiet on your street. Your relative safety makes you an observer of something that is happening very close.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('irish_crash_generation'); p.setMem('ireCrash', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ire_church_collapse',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1992 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem.ireChurchCollapse,
    text: (G) => 'The reports come out one after another. ' + ['The Bishop Eamonn Casey affair in 1992.', G.currentYear >= 1995 && 'The Brendan Smyth case in 1994.', G.currentYear >= 2006 && 'The Ferns Report.', G.currentYear >= 2010 && 'The Ryan Report, the Murphy Report.'].filter(Boolean).join(' ') + ' The institution that ran the schools, the hospitals, the Magdalene laundries, the industrial schools — the institution that was, in certain decades, more present in daily Irish life than the state — is producing findings that nobody in the Church or the government is calling satisfactory. The country that was Catholic in an and structural way is becoming something else.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 7; p.addFlag('irish_church_reckoning'); p.setMem('ireChurchCollapse', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TURKEY
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'tur_coup_1980',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear === 1980 &&
      G.age >= 16 &&
      !G.mem.turCoup1980,
    text: 'September 12, 1980. General Kenan Evren is on the radio, and the tanks are on the corners. People are taken in the night and some come back with marks they do not explain. The parties are dissolved and a new constitution is written under the army\'s supervision. You are living in the country that the rewriting made.',
    context: 'About 650,000 people were detained in the three years after the 1980 coup. Torture in military prisons was widespread and documented. The 1982 constitution remains, much amended, in force.',
    choices: [
      {
        text: 'You are in your twenties and had been politically active.',
        tag: null,
        outcome: 'The politically active were the target. You know what the targeting felt like from inside or at close range.',
        effect: (p) => { p.m -= 16; p.h -= 6; p.r += 10; p.addFlag('turkish_coup_generation'); p.addFlag('political_prisoner_experienced'); p.setMem('turCoup1980', true) },
      },
      {
        text: 'You were not involved. You watched the arrests.',
        tag: null,
        outcome: 'People you knew. The disappearance of specific people. The lesson that the category of "political" was applied broadly and without much precision.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('turkish_coup_generation'); p.setMem('turCoup1980', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_secularism_tension',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      !G.mem.turSecularism,
    text: 'The headscarf question: whether observant Muslim women can wear the hijab at Turkish universities and in government employment. The Constitutional Court has ruled against it. Women who wear the headscarf are being turned away from lecture halls, from government buildings, from university degrees. The Kemalist principle of state secularism and the desire of practicing Muslims to operate in public life are the content of particular days for people you know.',
    choices: [
      {
        text: 'The ban is the correct application of secularism.',
        tag: null,
        outcome: 'You hold the Kemalist position. The principle is clear to you. The cost of the principle, borne by specific women you may or may not know, is a different account.',
        effect: (p) => { p.r += 4; p.addFlag('kemalist_generation'); p.setMem('turSecularism', true) },
      },
      {
        text: 'Excluding women from education for their religious practice is wrong.',
        tag: null,
        outcome: 'The principle and the exclusion are in conflict. You come down on the side of the exclusion being wrong. This is also a position.',
        effect: (p) => { p.karma += 5; p.addFlag('post_kemalist_generation'); p.setMem('turSecularism', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_earthquake_1999',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear === 1999 &&
      G.age >= 20 &&
      !G.mem.turEarthquake,
    text: 'August 17, 1999, 3:02 in the morning. The ground under Izmit moves and the apartment blocks fold down onto themselves, floor on floor. They fell because permits and inspection certificates could be bought without the inspection. Corruption, poured in concrete. The help is slow to come.',
    context: 'The Marmara earthquake measured 7.6. The official toll was about 17,000 dead; independent estimates are higher.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 7; p.addFlag('marmara_earthquake_generation'); p.setMem('turEarthquake', true) },
  },

  {
    id: 'tur_erdogan_arc',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2013 && G.currentYear <= 2020 &&
      G.age >= 28 &&
      !G.mem.turErdogan,
    text: 'The protests over Gezi Park start with trees and become something larger, and so does the crackdown. Then the summer of 2016: a coup attempt, a state of emergency, and lists. Teachers, judges, academics, journalists are suspended or detained. You are watching the country become a different one from the one you thought you lived in.',
    context: 'About 7,000 people were detained during the 2013 Gezi protests. More than 150,000 were detained or dismissed after July 2016, and the emergency lasted two years.',
    choices: [
      {
        text: 'You were in Gezi. You understand now what is at stake.',
        tag: null,
        outcome: 'Gezi was the line. Before it you could argue about whether what was coming was what was coming. After it you could not.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.addFlag('gezi_generation'); p.addFlag('political_active'); p.setMem('turErdogan', true) },
      },
      {
        text: 'You supported the AKP. Gezi was disorder.',
        tag: null,
        outcome: 'The government\'s account of events — foreign interference, vandalism, illegitimate protest — is the account you find more credible. The post-coup purges give you some subsequent doubt about the category of illegitimate.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('turkish_conservative_generation'); p.setMem('turErdogan', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_armenian_silence',
    phase: null,
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem.turArmenian,
    text: '1915: what to call it is not a neutral question here. Article 301 makes it a crime to insult Turkishness. A novelist is charged for saying a number aloud to a foreign newspaper, and a historian\'s book is prosecuted. You know the shape of the silence, and what the state has decided the past is allowed to be.',
    context: 'Orhan Pamuk was charged under Article 301 in 2005 for telling a Swiss newspaper that thirty thousand Kurds and a million Armenians had been killed. The charges were dropped.',
    choices: null,
    effect: (p) => { p.r += 6; p.addFlag('turkish_historical_silence'); p.setMem('turArmenian', true) },
  },

  {
    id: 'tur_economic_miracle_2000s',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem.turEconomic,
    text: (G) => (G.currentYear >= 2012 ? 'Turkey\'s GDP triples between 2002 and 2012. The AKP government\'s first decade: ' : 'The economy grows at a pace nobody in the 1990s would have believed. The AKP government\'s first years: ') + (G.currentYear >= 2005 ? 'fiscal discipline, inflation brought down from 68 percent to single digits, ' : 'fiscal discipline, inflation falling month by month, ') + 'infrastructure spending — highways, airports, hospitals. Istanbul is building. The middle class is growing, as it was not in the 1990s. The people who will become Erdogan\'s base are in many cases people who were excluded from Kemalist patronage networks and who are now, for the first time, economically secure. The growth is real and the question of what it is building toward is not yet asked out loud.',
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 1500; p.addFlag('turkish_growth_generation'); p.setMem('turEconomic', true) },
  },

]

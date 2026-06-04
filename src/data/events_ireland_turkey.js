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
    text: 'Everyone is leaving or has left or is about to leave. England, America, Australia. The boats from Dun Laoghaire. The emigrant is the structural condition of twentieth-century Ireland — not the exception. You are making the decision that your parents made, or that your siblings made, or that you watched everyone around you make. The priests preach that those who stay are the backbone of the nation. The backbone is getting thinner every year.',
    choices: [
      {
        text: 'You leave. London, Boston, somewhere.',
        tag: null,
        outcome: 'The boat-train from Dun Laoghaire, or the airport at Shannon. You join the generation that is Irish at one remove.',
        effect: (p) => { p.m -= 5; p.addFlag('irish_emigrant_generation'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('ireEmigration', true) },
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1970 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem.ireTroubles,
    text: 'The Troubles are on the other side of the border but they are not on the other side of anything in the way the border implies. The news from Derry, from Belfast, from the bombs in Dublin in 1974 — seventeen people dead in the city centre, the UVF. The army checkpoints. The word republican has a charge that depends entirely on who says it and to whom. You are in the Republic, which means you are technically not in the conflict, which is not the same as not being in the conflict.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('troubles_adjacent'); p.setMem('ireTroubles', true) },
  },

  {
    id: 'ire_celtic_tiger',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1995 && G.currentYear <= 2006 &&
      G.age >= 20 &&
      !G.mem.ireCelticTiger,
    text: 'The Celtic Tiger: Ireland\'s GDP growing at 7-11 percent per year. The airport is full of people coming back who left in the 1980s. The cranes are everywhere. House prices double and then double again. This is not the Ireland you grew up in. Foreign direct investment, the EU structural funds, the low corporate tax rate. The country is being used by American multinationals as a gateway into Europe, which is producing real employment and real wages, and the wages are being put into houses whose prices assume the growth continues.',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 2008 && G.currentYear <= 2013 &&
      G.age >= 25 &&
      !G.mem.ireCrash,
    text: 'The property market collapses. Anglo Irish Bank is nationalized. The government guarantees the bank debts — all of them, €400 billion, in a single September night in 2008. The guarantee will be questioned for years. The IMF and EU arrive in November 2010. The austerity cuts: health, education, social welfare. The emigration starts again. Young people you know are leaving for Australia, Canada, the US. The country that had just stopped exporting its young is exporting them again.',
    choices: [
      {
        text: 'You lose a job, a house, or both.',
        tag: null,
        outcome: 'The specific losses. The debt that remains after the asset is gone. The decade of managing what the crash left.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1992 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem.ireChurchCollapse,
    text: 'The reports come out one after another. The Bishop Eamonn Casey affair in 1992. The Brendan Smyth case in 1994. The Ferns Report, the Ryan Report, the Murphy Report. The institution that ran the schools, the hospitals, the Magdalene laundries, the industrial schools — the institution that was, in certain decades, more present in daily Irish life than the state — is producing findings that nobody in the Church or the government is calling satisfactory. The country that was Catholic in a specific and structural way is becoming something else.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 7; p.addFlag('irish_church_reckoning'); p.setMem('ireChurchCollapse', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TURKEY
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'tur_coup_1980',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear === 1980 &&
      G.age >= 16 &&
      !G.mem.turCoup1980,
    text: 'September 12, 1980. General Kenan Evren takes power in a military coup — the third in twenty years, but different from the previous two in scale and duration. 650,000 people will be detained in the following three years. Torture in the military prisons is documented, systematic, and denied. Political parties are dissolved. The constitution is rewritten in 1982 under military supervision. You are living in the country that resulted from the rewriting.',
    choices: [
      {
        text: 'You are in your twenties and had been politically active.',
        tag: null,
        outcome: 'The politically active were the specific target. You know what the specific targeting felt like from inside or at close range.',
        effect: (p) => { p.m -= 16; p.h -= 6; p.r += 10; p.addFlag('turkish_coup_generation'); p.addFlag('political_prisoner_experienced'); p.setMem('turCoup1980', true) },
      },
      {
        text: 'You were not involved. You watched the arrests.',
        tag: null,
        outcome: 'People you knew. The specific disappearance of specific people. The lesson that the category of "political" was applied broadly and without much precision.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('turkish_coup_generation'); p.setMem('turCoup1980', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_secularism_tension',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      !G.mem.turSecularism,
    text: 'The headscarf question: whether observant Muslim women can wear the hijab at Turkish universities and in government employment. The Constitutional Court has ruled against it. Women who wear the headscarf are being turned away from lecture halls, from government buildings, from university degrees. The Kemalist principle of state secularism and the desire of practicing Muslims to operate in public life — these are not abstractions. They are the specific content of specific days for specific people you know.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear === 1999 &&
      G.age >= 20 &&
      !G.mem.turEarthquake,
    text: 'August 17, 1999, 3:02am. The Marmara earthquake: magnitude 7.6. The epicentre near Izmit. Seventeen thousand dead in the official count; estimates run higher. The apartment blocks that collapse do so because they were built under a system where construction permits and inspection certificates could be obtained without the construction and inspection. The specific thing that killed people was corruption made concrete, which is what much corruption eventually becomes. The government\'s response is slow.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 7; p.addFlag('marmara_earthquake_generation'); p.setMem('turEarthquake', true) },
  },

  {
    id: 'tur_erdogan_arc',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2013 && G.currentYear <= 2020 &&
      G.age >= 28 &&
      !G.mem.turErdogan,
    text: 'The Gezi Park protests in May 2013 begin over a construction project and become something larger. The crackdown — water cannon, tear gas, seven thousand detained — also becomes something larger. The 2016 coup attempt produces a state of emergency that lasts two years. Eighty thousand people are detained or suspended in its aftermath. Academics, journalists, judges. The European Union accession process is effectively suspended. You are watching Turkey become a different kind of country than the one you thought you lived in, and the speed of the change is itself part of what is happening.',
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
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem.turArmenian,
    text: 'The 1915 events: whether to call them genocide is not a neutral linguistic question in Turkey. Article 301 of the penal code: insulting Turkishness. Orhan Pamuk is charged in 2005 for telling a Swiss newspaper that thirty thousand Kurds and a million Armenians were killed in this country. Charges dropped under international pressure. A historian publishes a book calling 1915 a genocide. The book is prosecuted. You know the shape of the silence, which is a kind of knowledge about what the state has decided the past is allowed to be.',
    choices: null,
    effect: (p) => { p.r += 6; p.addFlag('turkish_historical_silence'); p.setMem('turArmenian', true) },
  },

  {
    id: 'tur_economic_miracle_2000s',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem.turEconomic,
    text: 'Turkey\'s GDP triples between 2002 and 2012. The AKP government\'s first decade: fiscal discipline, inflation brought down from 68 percent to 8 percent, infrastructure spending — highways, airports, hospitals. Istanbul is building. The middle class is growing in a way that it was not in the 1990s. The people who will become Erdogan\'s base are in many cases people who were excluded from Kemalist patronage networks and who are now, for the first time, economically secure. The growth is real and the question of what it is building toward takes a decade to clarify.',
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 1500; p.addFlag('turkish_growth_generation'); p.setMem('turEconomic', true) },
  },

]

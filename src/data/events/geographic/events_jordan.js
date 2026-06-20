// Jordan character events
// Historical arcs: Palestinian refugees in Jordan (48% of population),
// 1948 Nakba and 1967 war displacement, Black September 1970 (PLO-Jordan civil war),
// King Hussein's 47-year reign (1952-1999), 1994 Wadi Araba peace treaty with Israel,
// Syrian refugee crisis 2011-15 (1.3 million, 10% of Jordan's population),
// wasta system, bread subsidies, Gulf remittance economy, water scarcity.

export const JORDAN_EVENTS = [

  {
    id: 'jor_palestinian_family',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.character.ethnicity === 'palestinian_jordanian' &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.jorPalestinian,
    text: 'Your family\'s displacement story is in the house — in which village they came from, which key someone\'s grandfather kept, which papers were left behind in 1948 or 1967. The map of Palestine that your family carries does not match the maps in the Jordanian school curriculum or the Israeli ones. The West Bank is visible from the Amman hills on a clear day. The border that put it in a different country was created within your parents\' or grandparents\' lifetimes. You are Jordanian. You are also from somewhere else.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.addFlag('jordanian_palestinian_identity'); p.setMem('jorPalestinian', true) },
  },

  {
    id: 'jor_black_september_1970',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.currentYear >= 1970 && G.currentYear <= 1972 &&
      G.age >= 16 &&
      !G.mem.jorBlackSeptember,
    text: 'September 1970. The PLO has been operating as a state within a state in Jordan — running its own checkpoints, taxing, governing Palestinian refugee camps, planning cross-border operations that bring Israeli reprisals on Jordanian soil. King Hussein, who has tolerated this for three years, orders the Jordanian army to move. The fighting lasts ten days. Several thousand die — most of them Palestinian. The PLO is expelled to Lebanon, where it will help trigger another civil war. The event is called Black September. It is a rupture in the relationship between Palestinians and the Hashemite kingdom that shapes everything afterward.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 9; p.addFlag('jordan_black_september_generation'); p.setMem('jorBlackSeptember', true) },
  },

  {
    id: 'jor_wasta_system',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.jorWasta,
    text: 'Wasta: the Arabic word for connection, influence, the weight of who you know and which family you belong to. In Jordan it operates more reliably than merit in employment, university admission, government permits, legal proceedings. You either have wasta or you spend time cultivating it or you find the third path — doing more than is required to make up for what you lack. The army is different: getting a son in is a family aspiration across tribal lines. The system is not hidden. It is the infrastructure.',
    choices: [
      {
        text: 'You have family connections — wasta that opens a particular door.',
        tag: null,
        outcome: 'The door opens. You are aware of what opened it. That awareness is the beginning of the moral accounting.',
        effect: (p) => { p.s += 5; p.mo += 800; p.addFlag('jordanian_wasta_used'); p.setMem('jorWasta', true) },
      },
      {
        text: 'You navigate without wasta, on your own record.',
        tag: null,
        outcome: 'It takes longer and costs more effort and you spend years watching people with less ability but better connections move past you. You build your record anyway.',
        effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('jordanian_no_wasta'); p.setMem('jorWasta', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'jor_peace_treaty_1994',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.currentYear === 1994 &&
      G.age >= 18 &&
      !G.mem.jorPeaceTreaty,
    text: 'October 1994. King Hussein and Israeli Prime Minister Yitzhak Rabin sign the Wadi Araba Treaty. Jordan becomes the second Arab country to make peace with Israel, after Egypt in 1979. The official position: normalisation and security cooperation. The street position: more complicated. Palestinian-Jordanians who are 48% of the population — the largest ethnic group in Jordan — are the group for whom this peace is most complicated. The king was the custodian of the Haram al-Sharif in Jerusalem. The treaty does not change the occupation of the West Bank. You have an opinion about what this means.',
    choices: [
      {
        text: 'You accept the peace as pragmatic and necessary.',
        tag: null,
        outcome: 'Jordan needed the treaty for its economy, its security, its relationship with the United States. The pragmatic case is real. You know the Palestinian case too.',
        effect: (p) => { p.r += 5; p.addFlag('jordanian_peace_generation'); p.setMem('jorPeaceTreaty', true) },
      },
      {
        text: 'You feel the treaty as a betrayal of the Palestinian cause.',
        tag: null,
        outcome: 'The king signed a peace that Palestinian-Jordanians — who are the majority of his subjects — would not have voted for. You carry that contradiction.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('jordanian_peace_generation'); p.setMem('jorPeaceTreaty', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'jor_syrian_refugees_2012',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.currentYear >= 2012 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem.jorSyria,
    text: 'By 2014, Jordan has received 1.3 million Syrian refugees — roughly ten percent of the country\'s total population, arriving in three years. The camps — Zaatari, Azraq — become some of the largest in the world. The refugees settle not only in camps but in Amman, Zarqa, Irbid. The schools run double shifts. The water system, already under stress — Amman gets running water once a week — is strained further. Jordanians are divided: hospitality against burden, solidarity against competition for jobs and services. The government accepts the refugees and then starts restricting movement. You are watching what a country looks like when this arrives.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.addFlag('jordanian_syrian_refugee_host'); p.setMem('jorSyria', true) },
  },

  {
    id: 'jor_king_hussein_era',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Jordan' &&
      G.currentYear >= 1970 && G.currentYear <= 1999 &&
      G.age >= 20 &&
      !G.mem.jorHussein,
    text: 'King Hussein has been on the throne since 1952. He survived the 1967 war that lost the West Bank, the Black September civil war, assassination attempts, and two peace treaties — one with the PLO in 1974 granting them Palestinian self-representation, one with Israel in 1994. He is, by any measure, a survivor. The monarchy is stable in a region of instability. The price of stability is the wasta system, the bread subsidy, and a political space that exists only at the king\'s sufferance. When he dies of cancer in 1999, the mourning is real.',
    choices: null,
    effect: (p) => { p.r += 4; p.addFlag('jordanian_hussein_generation'); p.setMem('jorHussein', true) },
  },

]

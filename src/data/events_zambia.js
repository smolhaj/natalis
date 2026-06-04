// Zambia character events
// Historical arcs: Kenneth Kaunda's UNIP one-party rule and Humanism 1964–1991,
// Copper Belt boom (Kitwe, Ndola, Chingola) and company-town life,
// copper price crash 1975 and IMF structural adjustment 1980s–90s,
// 1991 multi-party transition (Frederick Chiluba, MMD) — first in southern Africa,
// HIV/AIDS crisis (one of the worst-hit countries, 1990s),
// evangelical Christianity wave and growth.

export const ZAMBIA_EVENTS = [

  {
    id: 'zmb_kaunda_humanism',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.zmbHumanism,
    text: 'Kenneth Kaunda\'s philosophy is Humanism — Zambian Humanism, specifically: the dignity of the human being as the centre of everything, not capital and not class. Nationalisation of the copper mines means the state controls the copper. The copper funds the schools and the hospitals and the civil service. "Man at the Centre" is in the school curriculum. The one-party state — UNIP — is the political reality. You grow up with this as the background of civic life: a specific African socialism, a real welfare state funded by copper, and no mechanism to change the government.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.addFlag('zambian_kaunda_generation'); p.setMem('zmbHumanism', true) },
  },

  {
    id: 'zmb_copper_belt',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear >= 1965 && G.currentYear <= 1980 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.zmbCopper,
    text: 'The Copper Belt: Kitwe, Ndola, Luanshya, Chingola. The company towns built by Anglo American and Roan Selection Trust and then, after nationalisation, by ZCCM. The miner\'s wage is the best wage in the country. The company provides housing, a school, a clinic. The compound has a social life — the copper miner\'s union is organised, articulate, connected to the international labour movement. You are in this world or you are adjacent to it. The copper price is high and Zambia is, briefly, wealthier per capita than South Korea.',
    choices: null,
    effect: (p) => { p.m += 5; p.mo += 800; p.e += 2; p.addFlag('zambian_copper_belt_generation'); p.setMem('zmbCopper', true) },
  },

  {
    id: 'zmb_copper_crash',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear >= 1975 && G.currentYear <= 1990 &&
      G.age >= 25 &&
      !G.mem.zmbCrash,
    text: '1975. The copper price collapses — a global commodities crash that hits Zambia harder than almost any country because copper is ninety-five percent of Zambia\'s export earnings. The welfare state that copper funded starts to hollow out. The schools are the schools. The clinics are the clinics. But the budget is not the budget it was. The Zambia we will build is deferred. In the 1980s the IMF arrives with structural adjustment: cut subsidies, devalue the currency, retrench the state. The bread riots happen when the mealie meal subsidy is removed.',
    choices: [
      {
        text: 'You are in the Copper Belt — the world you built is contracting.',
        tag: null,
        outcome: 'The mine is still running but the world around it is smaller. The housing is maintained less well. The clinic has fewer drugs. The expectation that things would keep improving has been revised.',
        effect: (p) => { p.m -= 14; p.mo -= Math.floor((p.mo ?? 0) * 0.3); p.r += 8; p.addFlag('zambian_copper_crash_generation'); p.setMem('zmbCrash', true) },
      },
      {
        text: 'You are in Lusaka or a rural area — watching the country tighten.',
        tag: null,
        outcome: 'The subsidies are cut. The prices rise. The government explains that it is necessary. The explanation is correct in the macroeconomic terms. The mealie meal is still more expensive.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('zambian_copper_crash_generation'); p.setMem('zmbCrash', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'zmb_democratic_transition_1991',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear === 1991 &&
      G.age >= 18 &&
      !G.mem.zmbTransition,
    text: 'October 1991. Kenneth Kaunda — who has governed Zambia since independence in 1964 — holds a multi-party election and loses to Frederick Chiluba\'s Movement for Multi-party Democracy. Kaunda concedes. Peacefully. Zambia becomes the first country in southern Africa to achieve a democratic transfer of power. Kaunda says: "I have been defeated." There is cheering in the streets. You are in a country that has just done something genuinely rare. The MMD wins with 76 percent of the vote.',
    choices: null,
    effect: (p) => { p.m += 12; p.r += 4; p.addFlag('zambian_democracy_generation'); p.setMem('zmbTransition', true) },
  },

  {
    id: 'zmb_aids_crisis_1990s',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear >= 1990 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      !G.mem.zmbAids,
    text: 'By the mid-1990s, one in five Zambian adults is HIV-positive. The copper belt towns are among the worst hit — the mobile mining workforce, the compound life, the trucking routes. Zambia\'s life expectancy falls from fifty-four in 1980 to forty in 2000. You know people who are sick. You know people who have died. The anti-retroviral treatment that changes the prognosis arrives in the early 2000s — slowly, expensively. The generation between twenty and forty is the one that bears most of the dying.',
    choices: null,
    effect: (p) => { p.m -= 14; p.h -= 3; p.r += 9; p.addFlag('zambian_aids_generation'); p.setMem('zmbAids', true) },
  },

  {
    id: 'zmb_evangelical_wave',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Zambia' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.religion === 'christian_protestant' &&
      G.age >= 20 &&
      !G.mem.zmbEvangelical,
    text: 'Frederick Chiluba declared Zambia a Christian nation in 1991 — one of the only such constitutional declarations in Africa. The Pentecostal and charismatic churches are growing faster than any other institution in the country. The church provides what the contracting state no longer provides: a social network, a crisis fund, a place to go on Sunday, an explanation. The prosperity gospel version of Christianity has a particular appeal in a country where the copper promises didn\'t all arrive.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.addFlag('zambian_evangelical_generation'); p.setMem('zmbEvangelical', true) },
  },

]

// events_norway.js — Norway depth arc (8 events)
// Complements events_scandinavia.js (Nordic welfare state, Janteloven).
// Covers: WWII occupation and Quisling, resistance networks, liberation 1945,
// oil discovery 1969, EU referendum 1972 and 1994, July 22 2011 Breivik,
// oil fund reckoning.

const IS_NORWEGIAN = (G) => G.character.country?.name === 'Norway'

export const NORWAY_EVENTS = [

  // ─── WWII OCCUPATION: APRIL 9, 1940 ─────────────────────────────────────────

  {
    id: 'nor_wwii_occupation',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 6 &&
      !G.mem?.norWWIIOccupation,
    text: (G) => {
      const young = G.age <= 12
      return young
        ? 'The Germans arrived on April 9, 1940. You are too young to understand what this means in the full sense, but you understand that the soldiers in the street are not Norwegian and that things are different now in a way they may not stop being different. The king fled north and then to Britain. The radio says things that are not entirely true. Your parents lower their voices.'
        : 'April 9, 1940: German forces invaded Norway simultaneously at multiple ports. The Norwegian army resisted longer than anyone expected — Narvik, the mountain campaigns — before the capitulation. The king and the government left for London. What followed was five years of occupation under Reichskommissar Terboven and Vidkun Quisling\'s National Socialist government. You have learned to read what can and cannot be said, in public, to which people.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('nor_occupation_generation'); p.setMem('norWWIIOccupation', true) },
  },

  // ─── QUISLING: THE COLLABORATOR NEXT TO YOU ──────────────────────────────────

  {
    id: 'nor_quisling_question',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1960 &&
      G.age >= 25 &&
      G.flags.has('nor_occupation_generation') &&
      !G.mem?.norQuisling,
    text: 'Vidkun Quisling\'s name has become an English word for betrayal: *quisling*. At the time it was a practical question — how many people chose the NS, worked with the occupiers, informed on neighbours, took the jobs in the new order. After the liberation in 1945, the legal proceedings began. Fifteen thousand people were sentenced for collaboration. This number, against a population of three million, is both large and not as large as the occupation created. The specific accounting — who did what, who said nothing, who helped — took place in every village and neighbourhood and family. You have your own version of this accounting.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 5; p.setMem('norQuisling', true) },
  },

  // ─── LIBERATION 1945 ─────────────────────────────────────────────────────────

  {
    id: 'nor_liberation_1945',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear === 1945 &&
      G.age >= 14 &&
      !G.mem?.norLiberation45,
    text: 'May 8, 1945. The German forces in Norway capitulated. The king returned from London on June 7 — the same date he had left five years earlier, almost to the day. This symmetry feels meaningful to people who care about such things. The streets had flags that had been kept hidden and were now out. The occupation was over. The accounting — of who had done what — began almost immediately, as it does when occupation ends and the occupied and the collaborators are still living in the same streets.',
    choices: null,
    effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('nor_liberation_generation'); p.setMem('norLiberation45', true) },
  },

  // ─── OIL DISCOVERY 1969 ──────────────────────────────────────────────────────

  {
    id: 'nor_oil_discovery',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1969 && G.currentYear <= 1978 &&
      G.age >= 25 &&
      !G.mem?.norOilDiscovery,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1972
        ? 'Phillips Petroleum found oil at Ekofisk on December 23, 1969. The scale of it — the largest offshore oil field in the world at that time — was not immediately apparent. Norway was a modest country with a large coastline and a fishing tradition and a shipping industry. The question of what to do with an oil field of this size was a genuine one, not a rhetorical one. Some people said take the money and spend it. Others said the money would remake the country in ways that would be hard to manage. Both groups were right.'
        : 'The oil has changed things. Not in a catastrophic way — not in the way oil changed other countries, the Dutch disease, the resource curse. Norway chose to do something unusual with the money: a pension fund, state-owned, for future generations. The fund now holds more money than you can easily imagine. Whether this was wisdom or luck or both is the kind of question Norwegians debate in the specific way they debate things: carefully, with reference to the long term.'
    },
    choices: null,
    effect: (p) => { p.m += 8; p.w += 5; p.e += 3; p.addFlag('nor_oil_generation'); p.setMem('norOilDiscovery', true) },
  },

  // ─── EU REFERENDUMS: 1972 AND 1994 ───────────────────────────────────────────

  {
    id: 'nor_eu_referendums',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1972 && G.currentYear <= 1998 &&
      G.age >= 25 &&
      !G.mem?.norEURef,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1975
        ? 'Norway voted against joining the European Community in 1972. The margin was 53.5% against. The people who voted no were farmers and fishers and left-wing urban voters who believed that Norwegian sovereignty and Norwegian natural resources should not be negotiated in Brussels. The people who voted yes thought Norway would be isolated without membership. Norway was not isolated. The debate did not resolve; it postponed.'
        : 'In 1994, Norway voted on EU membership again. The result was 52.2% against. Twice now the country has been offered membership and twice refused. Norway participates in the single market through the EEA and contributes to the EU budget and adopts EU regulations without having a vote on them. This is the arrangement: you get the market without the politics, and you pay for it, and you do not have a vote. Whether this is a good trade is a question that does not have a settled answer in Norwegian public life.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.addFlag('nor_eu_no_generation'); p.setMem('norEURef', true) },
  },

  // ─── JULY 22, 2011 ───────────────────────────────────────────────────────────

  {
    id: 'nor_july22',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear === 2011 &&
      G.age >= 16 &&
      !G.mem?.norJuly22,
    text: (G) => {
      const young = G.age <= 25
      return young
        ? 'July 22, 2011. A bomb in the government quarter in Oslo killed eight people. Then a man dressed as a police officer took a ferry to the island of Utøya and killed sixty-nine people at a Labour Party youth camp. Most of them were your age. Some of them were from your school or knew people you knew. The country that was supposed to be safe — the welfare state, the high-trust society, the place where this did not happen — had a Utøya now. The name of the island entered the language as a date and a wound.'
        : 'The bomb went off at 15:25 in the government quarter. The shooting at Utøya began at 17:20. In the time between, many people thought the bomb was the attack. Then the news from Utøya arrived. Seventy-seven dead in total — the worst atrocity in Norway since the occupation. The perpetrator was Norwegian, right-wing nationalist, acting alone. He wanted a trial to spread his manifesto. The trial was public and the government held it in public and the prime minister at the time said the answer to violence is not less democracy but more. You have thought about what that answer means in practice for the ten years since.'
    },
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 10; p.karma += 3; p.addFlag('nor_july22_generation'); p.setMem('norJuly22', true) },
  },

  // ─── OIL FUND RECKONING ──────────────────────────────────────────────────────

  {
    id: 'nor_oil_fund_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      G.flags.has('nor_oil_generation') &&
      !G.mem?.norOilFundReckoning,
    text: 'The Government Pension Fund Global is now the largest sovereign wealth fund in the world. It holds over a trillion dollars. It owns shares in almost every large company on earth. Norway\'s fraction of the world\'s wealth, per capita, is extraordinary. And: Norway produces oil that contributes to climate change that will most severely affect countries that produce almost none. The fund\'s sustainability committee debates divestment from fossil fuel companies. The fund owns fossil fuel companies. The country produces fossil fuels. You have lived the whole shape of this — the discovery, the wealth, the choices about the wealth — and you can see now that the choices about the future are harder than the choices about the past were.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 3; p.setMem('norOilFundReckoning', true) },
  },

  // ─── LATE RECKONING: WHAT NORWAY IS ──────────────────────────────────────────

  {
    id: 'nor_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.age >= 65 &&
      !G.mem?.norLateReckoning,
    text: 'You have lived in one of the wealthiest and most equal countries in the world during the period of its greatest wealth and equality. This is also the country that was occupied for five years and that spent twenty years counting its collaborators. It is the country that twice voted not to join Europe and exists in a halfway position of high access and no voice. It is the country that elected Breivik\'s victims\' generation to its parliaments and watched that generation lead. The oil is a particular legacy — the money, the emissions, the fund for your grandchildren who will live in a warmer world partly because of what paid for their inheritance. Norway contains all of this and has not fully finished accounting for any of it.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.e += 3; p.karma += 3; p.setMem('norLateReckoning', true) },
  },

]

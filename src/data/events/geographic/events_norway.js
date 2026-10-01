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
    phase: null,
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1960 &&
      G.age >= 25 &&
      G.flags.has('nor_occupation_generation') &&
      !G.mem?.norQuisling,
    text: 'His name has become a word in other languages for betrayal. Here it was a practical question: who joined the NS, who worked for the occupiers, who informed on a neighbour, who took the job in the new order. After 1945 the courts sentenced thousands. The rest of the accounting took place in every village and every family. You have your own version of it.',
    context: 'About 46,000 Norwegians were punished for collaboration after the war, out of a population of three million. Vidkun Quisling was executed in October 1945.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 5; p.setMem('norQuisling', true) },
  },

  // ─── LIBERATION 1945 ─────────────────────────────────────────────────────────

  {
    id: 'nor_liberation_1945',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear === 1945 &&
      G.age >= 14 &&
      !G.mem?.norLiberation45,
    text: 'May 8, 1945: the Germans in Norway capitulate. The flags that were hidden for five years are out in the streets. On June 7 the king comes home from London, five years to the day after he left. The occupation is over. The question of who did what during it begins at once, in streets where the occupied and the collaborators still live side by side.',
    choices: null,
    effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('nor_liberation_generation'); p.setMem('norLiberation45', true) },
  },

  // ─── OIL DISCOVERY 1969 ──────────────────────────────────────────────────────

  {
    id: 'nor_oil_discovery',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1969 && G.currentYear <= 1978 &&
      G.age >= 25 &&
      !G.mem?.norOilDiscovery,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1972
        ? 'December 23, 1969: Phillips finds oil at Ekofisk. Nobody understands at first how much. Norway is a modest country of fishing and shipping and a long coast, and what to do with a field this size is a real question. Some say spend it. Others say the money will remake the country in ways nobody can manage. They are arguing about the next fifty years.'
        : 'The oil has changed things. Not in a catastrophic way — not in the way oil changed other countries, the Dutch disease, the resource curse. Norway chose to do something unusual with the money: a pension fund, state-owned, for future generations. The fund now holds more money than you can easily imagine. Whether this was wisdom or luck or both is the kind of question Norwegians debate in the way they debate things: carefully, with reference to the long term.'
    },
    choices: null,
    effect: (p) => { p.m += 8; p.w += 5; p.e += 3; p.addFlag('nor_oil_generation'); p.setMem('norOilDiscovery', true) },
  },

  // ─── EU REFERENDUMS: 1972 AND 1994 ───────────────────────────────────────────

  {
    id: 'nor_eu_referendums',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1972 && G.currentYear <= 1998 &&
      G.age >= 25 &&
      !G.mem?.norEURef,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1994
        ? 'Norway voted against joining the European Community in 1972. The margin was 53.5% against. The people who voted no were farmers and fishers and left-wing urban voters who believed that Norwegian sovereignty and Norwegian natural resources should not be negotiated in Brussels. The people who voted yes thought Norway would be isolated without membership. Norway was not isolated. The debate did not resolve; it postponed.'
        : 'In 1994, Norway voted on EU membership again. The result was 52.2% against. Twice now the country has been offered membership and twice refused. Norway participates in the single market through the EEA and contributes to the EU budget and adopts EU regulations without having a vote on them. This is the arrangement: you get the market without the politics, and you pay for it, and you do not have a vote. Whether this is a good trade is a question that does not have a settled answer in Norwegian public life.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.addFlag('nor_eu_no_generation'); p.setMem('norEURef', true) },
  },

  // ─── JULY 22, 2011 ───────────────────────────────────────────────────────────

  {
    id: 'nor_july22',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear === 2011 &&
      G.age >= 16 &&
      !G.mem?.norJuly22,
    text: (G) => {
      const young = G.age <= 25
      return young
        ? 'July 22, 2011. A bomb in the government quarter in Oslo, and then a man dressed as a policeman takes the ferry to Utøya and walks through a Labour youth camp. Most of the dead are your age; some knew people you know. The safe country, the high-trust one, the place where this did not happen, has a date now. Nobody needs to say which.'
        : 'The bomb goes off in the government quarter at twenty-five past three, and at first everyone thinks that is the attack. Then the news from Utøya, the island, the children at the summer camp. The killer is Norwegian, a nationalist who wanted a trial to spread his manifesto, and the trial is held in public, and the prime minister says the answer to violence is more democracy, not less. For ten years you have thought about what that means in practice.'
    },
    context: 'The attacks of 22 July 2011 killed 77 people, 69 of them at the Labour Party youth camp on Utøya.',
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
    text: 'The oil fund is the largest in the world, with shares in almost every big company on earth. Norway is extraordinarily rich per head. And it produces oil that heats a world whose worst heat falls on countries that produce almost none. The fund\'s committee debates selling its oil companies, and the fund owns oil companies, and the country pumps oil. You have lived the whole shape of it, and the choices about the future are harder than the choices about the past were.',
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
    text: 'You have lived in one of the wealthiest and most equal countries in the world during the period of its greatest wealth and equality. This is also the country that was occupied for five years and that spent twenty years counting its collaborators. It is the country that twice voted not to join Europe and exists in a halfway position of high access and no voice. It is the country that elected Breivik\'s victims\' generation to its parliaments and watched that generation lead. The oil is a legacy — the money, the emissions, the fund for your grandchildren who will live in a warmer world partly because of what paid for their inheritance. Norway contains all of this and has not fully finished accounting for any of it.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.e += 3; p.karma += 3; p.setMem('norLateReckoning', true) },
  },

]

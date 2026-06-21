// BUILD 55 — Tanzania arc (BUILD 26)
// Julius Nyerere's Ujamaa (African socialism) 1967–85: villagisation moved 5M+ people,
// agricultural output collapsed. The Arusha Declaration 1967. Tanzania-Uganda War 1978-79.
// Education in Swahili — unique in Africa — producing national unity at cost of international access.
// Peaceful power transfer: Nyerere stepped down 1985, Ali Hassan Mwinyi. Multi-party 1995.

const IS_TANZANIA = (G) => G.character.country?.name === 'Tanzania'

export const TANZANIA_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'tan_ujamaa_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => IS_TANZANIA(G) && G.flags.has('ujamaa_generation') && G.age >= 60 && !G.mem.tanUjamaaLate,
    text: 'The village is still there. Not the ujamaa village — that was dismantled in the 1980s — but the settlement that formed around it, which stayed because people had built their lives around the infrastructure that arrived with the collective. The school. The borehole. The things Nyerere was right about were real. The things he was wrong about were also real. You hold both at once, which is what this generation learned to do.',
    effect: (p) => { p.m += 4; p.setMem('tanUjamaaLate', true) },
  },

  {
    id: 'tan_nyerere_death',
    phase: 'midlife',
    weight: 2,
    when: (G) => IS_TANZANIA(G) && G.currentYear >= 1999 && G.currentYear <= 2001 && G.flags.has('ujamaa_generation') && !G.mem.tanNyerereDeath,
    text: 'October 14, 1999. *Baba wa Taifa* — Father of the Nation — is dead in a London hospital. The funeral in Dar es Salaam is attended by a million people. You think about the villagisation, which you did not choose, and the school in the village, which you attended because of it. The generation that had to carry him when he was wrong also has to mourn him when he is gone.',
    effect: (p) => { p.m -= 6; p.setMem('tanNyerereDeath', true) },
  },

  // ── INDEPENDENCE AND UJAMAA ───────────────────────────────────────────────

  {
    id: 'tan_uhuru',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_TANZANIA(G) && G.currentYear >= 1961 && G.currentYear <= 1962 && G.age >= 5 && !G.mem.tanUhuru,
    text: 'December 9, 1961. *Uhuru* — freedom. The radio carries Nyerere\'s voice. The adults in your compound are listening with a stillness that is not their normal stillness. Your grandmother is crying, which you have not seen before. You do not fully understand what is happening, but you understand that what is happening is large.',
    effect: (p) => { p.m += 12; p.addFlag('independence_generation_self'); p.setMem('tanUhuru', true) },
  },

  {
    id: 'tan_arusha_declaration',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_TANZANIA(G) && G.currentYear >= 1967 && G.currentYear <= 1969 && !G.mem.tanArusha,
    text: 'The Arusha Declaration: ujamaa, self-reliance, African socialism. Leaders must not own shares or rentable property; must not receive two salaries. Nyerere himself gives up his farm. Nationalisation of banks and major industries follows within months. You are young enough to believe this is the future of the continent. You are old enough to wonder what happens to the Asian merchants who own the shops.',
    choices: [
      {
        text: 'The vision is worth believing in.',
        tag: 'believed',
        outcome: 'You join a cooperative. The cooperative is real and it works, at first, which is what makes what comes later harder to accept.',
        effect: (p) => { p.m += 8; p.addFlag('ujamaa_generation'); p.setMem('tanArusha', true) },
      },
      {
        text: 'The economics seem fragile.',
        tag: 'sceptical',
        outcome: 'You keep your doubts private. The vision is popular and the doubts are correct and both things are true for years before anyone says so publicly.',
        effect: (p) => { p.m += 3; p.addFlag('ujamaa_generation'); p.setMem('tanArusha', true) },
      },
    ],
  },

  {
    id: 'tan_villagisation',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_TANZANIA(G) && G.ruralUrban === 'rural' && G.currentYear >= 1973 && G.currentYear <= 1977 && G.flags.has('ujamaa_generation') && !G.mem.tanVillagisation,
    text: 'Operation Vijiji: the government moves five million people into planned villages. The order comes to your area in the dry season, which is the wrong season to move. The fields your family has worked are three kilometres from the new village site. The government brings lorries for some families; others walk. The new village has a school and a borehole and no relationship to the soil around it.',
    choices: [
      {
        text: 'Comply. The school will matter for the children.',
        tag: 'complied',
        outcome: 'You build in the new place. The harvest the following year is poor because the new soil is wrong for what you planted. You adapt. Your children go to the school.',
        effect: (p) => { p.m -= 10; p.mo -= 1000; p.e += 2; p.setMem('tanVillagisation', true) },
      },
      {
        text: 'Resist quietly. Keep working the old land.',
        tag: 'resisted',
        outcome: 'The district official comes a second time. You move. The official is not wrong that a borehole changes what is possible. You are not wrong that you were not asked.',
        effect: (p) => { p.m -= 14; p.karma += 4; p.setMem('tanVillagisation', true) },
      },
    ],
  },

  {
    id: 'tan_swahili_education',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_TANZANIA(G) && G.currentYear >= 1967 && G.currentYear <= 1990 && G.stats.smarts >= 55 && G.age >= 18 && G.age <= 28 && !G.mem.tanSwahili,
    text: 'Tanzania teaches in Swahili — primary and secondary. Your education is in your language, which produces a specific national coherence: you can talk to anyone in the country. It also produces a ceiling. University and professional training require English. Your Kenyan and Ugandan peers who were taught in English their whole lives navigate international opportunities differently than you do.',
    effect: (p) => { p.m -= 4; p.e += 3; p.addFlag('swahili_educated'); p.setMem('tanSwahili', true) },
  },

  {
    id: 'tan_multiparty',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_TANZANIA(G) && G.currentYear >= 1995 && G.currentYear <= 1996 && !G.mem.tanMultiparty,
    text: 'The first multiparty elections. CCM has governed since independence; it will win this election and the next and the ones after that. But the atmosphere in the polling station is different from the previous decades. There is an opposition candidate whose name is on the ballot. The ballot exists. Tanzania has never had a coup. In this region, that is a specific achievement.',
    effect: (p) => { p.m += 6; p.addFlag('multiparty_generation'); p.setMem('tanMultiparty', true) },
  },
]

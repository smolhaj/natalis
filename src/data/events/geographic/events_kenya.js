// events_kenya.js
// Kenya: independence 1963, Kenyatta/harambee communal culture, Moi single-party
// state 1982–91, multiparty politics and ethnic patronage 1992+,
// 2007–08 election violence, M-Pesa 2007+, Nairobi urban migration.

const IS_KENYAN = (G) => G.currentCountry === 'Kenya'

export const KENYA_EVENTS = [

  // ── HARAMBEE: COMMUNAL SELF-HELP ──────────────────────────────────────────

  {
    id: 'ken_harambee_call',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 1963 && G.currentYear <= 1995 && G.age >= 18 && !G.mem.kenHarambee,
    text: 'A harambee is called — for a school, a clinic, someone\'s hospital bill. The contribution is not optional in the way that optional usually means something. You give what you have. Your neighbour gives more than he has. This is how things get built here, and also how debts accumulate that no one names.',
    choices: null,
    effect: (p) => { p.mo -= 150; p.s += 2; p.karma += 3; p.setMem('kenHarambee', true) },
  },

  // ── MOI ERA: POLITICAL SILENCE ────────────────────────────────────────────

  {
    id: 'ken_moi_silence',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 1982 && G.currentYear <= 1991 && G.age >= 18 && !G.mem.kenMoiSilence,
    text: 'The party is KANU. There is only KANU. In the office, in the bar, in the minibus — you learn to read what someone is about to say before they say it, so you can redirect the conversation. The phrase used is "he is so keen." It means: he talks too much. You have learned not to be keen.',
    choices: [
      {
        text: 'Stay quiet. This is the only sensible position.',
        tag: 'ken_silent_under_moi',
        outcome: 'You stay quiet. You are safe, which is a choice you made, and you know you made it.',
        effect: (p) => { p.m -= 6; p.addFlag('ken_silent_under_moi'); p.setMem('kenMoiSilence', true) },
      },
      {
        text: 'Say something, once, to someone you trust.',
        tag: null,
        outcome: 'You say it. You are not arrested. You are watched. That is a different kind of tax on a life.',
        effect: (p) => { p.m -= 3; p.r += 3; p.setMem('kenMoiSilence', true) },
      },
    ],
  },

  // ── ETHNIC PATRONAGE POLITICS ─────────────────────────────────────────────

  {
    id: 'ken_tribal_vote',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 1992 && G.age >= 25 && !G.mem.kenTribalVote,
    text: 'Election season. The ward chairman arrives — not with a threat, nothing so direct, but with a visit and an understanding about what the visit means. The candidate is from your community. The argument for voting community is easy to follow, because it is mostly true: a member of parliament from another tribe will not build the road in this district.',
    choices: [
      {
        text: 'Vote the community ticket.',
        tag: null,
        outcome: 'You vote as expected. The candidate wins the ward. The road is not repaired. Next election you will hear the same argument.',
        effect: (p) => { p.setMem('kenTribalVote', true) },
      },
      {
        text: 'Vote your conscience — quietly.',
        tag: 'voted_against_community',
        outcome: 'You vote how you vote. Nobody knows. The result is the same. So is the road.',
        effect: (p) => { p.karma += 3; p.m += 2; p.setMem('kenTribalVote', true) },
      },
    ],
  },

  // ── 2007–08 POST-ELECTION VIOLENCE ───────────────────────────────────────

  {
    id: 'ken_post_election_2007',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 2007 && G.currentYear <= 2009 && G.age >= 18 && !G.mem.kenElection2007,
    text: 'The results are announced. In the three days that follow, over a thousand people die. You know someone who died in Kisumu. You know someone who joined the burning in Eldoret. You are watching the news from Nairobi, aware that the city is dividing along streets you have always known by other names. The Kibera toll is not on the news yet.',
    choices: [
      {
        text: 'Stay inside and wait for it to pass.',
        tag: null,
        outcome: 'You stay. It passes. You are not entirely sure what you survived or what you avoided being part of.',
        effect: (p) => { p.m -= 8; p.setMem('kenElection2007', true) },
      },
      {
        text: 'Cross the city to reach family.',
        tag: 'ken_crossed_nairobi',
        outcome: 'You cross. The roadblocks are listening for your name and your accent. You get through. You will remember the sound of the question for a long time.',
        effect: (p) => { p.m -= 12; p.h -= 3; p.addFlag('ken_crossed_nairobi'); p.setMem('kenElection2007', true) },
      },
    ],
  },

  // ── M-PESA: MOBILE MONEY ─────────────────────────────────────────────────

  {
    id: 'ken_mpesa_arrives',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 2007 && G.currentYear <= 2013 && G.age >= 18 && !G.mem.kenMpesa,
    text: 'M-Pesa starts. You can send money from your phone to your mother\'s phone in Kisii without a bank account, using an agent at the kiosk near the matatu stage. The first time it takes twenty minutes and works. The second time takes two minutes. The third time you do not think about it at all.',
    choices: null,
    effect: (p) => { p.e += 2; p.w += 2; p.setMem('kenMpesa', true) },
  },

  // ── NAIROBI ARRIVAL ──────────────────────────────────────────────────────

  {
    id: 'ken_nairobi_arrival',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KENYAN(G) && G.currentYear >= 1970 && G.age >= 18 && G.age <= 28 && G.ruralUrban === 'rural' && !G.mem.kenNairobi,
    text: 'The matatu drops you at the stage with your bag, which is the wrong bag. Someone speaks Sheng to you and you understand half. A sign advertises something at a price that means nothing to you yet. The city is not hostile. It simply does not care about you, which is both worse and better than you expected.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.s += 2; p.setMem('kenNairobi', true) },
  },

  // ── MAASAI ARC ────────────────────────────────────────────────────────────

  {
    id: 'ken_maasai_moran',
    phase: 'adolescence',
    weight: 8,
    when: (G) => G.ethnicity === 'maasai' && ['Kenya', 'Tanzania'].includes(G.character.country.name) && G.age >= 14 && G.age <= 18 && !G.mem.kenMaasaiMoran,
    text: 'The time has come. You know it by the way your father stops treating you as a child without ever saying so. The ceremony takes days — the songs, the ochre, the cutting that you do not cry through, which is the point. Afterward you are a moran. The spear is yours. The cattle you know individually by gait and voice. The land between the Mara and Loita Hills is yours in a way that does not require papers.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.h += 3; p.addFlag('maasai_moran'); p.setMem('kenMaasaiMoran', true) },
  },

  {
    id: 'ken_maasai_land_displacement',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.ethnicity === 'maasai' && ['Kenya', 'Tanzania'].includes(G.character.country.name) && G.currentYear >= 1960 && G.age >= 18 && !G.mem.kenMaasaiLand,
    text: 'The game warden brings the letter. The grazing area that your grandfather knew as Il Purko land — the same land your father\'s cattle wintered on — is now a conservation zone. The word they use is "protected." Protected from what is not said, but you understand it. The animals inside are worth more to the government than the people outside. You have three months.',
    choices: [
      {
        text: 'Contest the boundary. There are lawyers in Narok who take such cases.',
        tag: null,
        outcome: 'The lawyer charges. The case moves slowly. The boundary does not. You are poorer and the cattle are still outside the wire.',
        effect: (p) => { p.mo -= 400; p.m -= 5; p.addFlag('maasai_land_displaced'); p.setMem('kenMaasaiLand', true) },
      },
      {
        text: 'Move the cattle to the remaining group ranch.',
        tag: null,
        outcome: 'You move. The group ranch is overgrazed and the people already there know it. You are welcome and you are a problem.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.addFlag('maasai_land_displaced'); p.setMem('kenMaasaiLand', true) },
      },
    ],
  },

  {
    id: 'ken_maasai_nairobi_choice',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.ethnicity === 'maasai' && ['Kenya', 'Tanzania'].includes(G.character.country.name) && G.currentYear >= 1975 && G.age >= 20 && G.age <= 32 && G.flags.has('maasai_moran') && !G.mem.kenMaasaiNairobi,
    text: 'Three of the young men from your age-grade have gone to Nairobi. One is a security guard at a hotel near the airport; another is studying something. The group ranch is subdivided — twenty acres per family, which is a number that makes no sense to cattle. Your older brother inherited more than you did. The land is there, but it is no longer land in the way land used to mean.',
    choices: [
      {
        text: 'Go to Nairobi. Adapt.',
        tag: 'maasai_nairobi',
        outcome: 'You go. The city does not know your age-grade or your lineage. You start over with nothing except the ones who came before you.',
        effect: (p) => { p.e += 3; p.m -= 5; p.addFlag('maasai_nairobi'); p.setMem('kenMaasaiNairobi', true) },
      },
      {
        text: 'Stay and work what land remains.',
        tag: 'maasai_stayed_pastoral',
        outcome: 'You stay. The droughts come as they always have, but now there is less land to move through when they do. You learn what resilience costs when the options narrow.',
        effect: (p) => { p.m += 3; p.h -= 3; p.addFlag('maasai_stayed_pastoral'); p.setMem('kenMaasaiNairobi', true) },
      },
    ],
  },

  {
    id: 'ken_maasai_tourist_economy',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.ethnicity === 'maasai' && ['Kenya', 'Tanzania'].includes(G.character.country.name) && G.currentYear >= 1990 && G.age >= 18 && G.age <= 45 && !G.mem.kenMaasaiTourist,
    text: 'The lodge at the reserve gate is hiring. The job is to stand at the entrance in full regalia and be photographed. The pay is 4,000 shillings a month plus accommodation. The tourists pay $5 to photograph you; the lodge keeps $4.50. Your grandmother\'s beadwork is on sale in the gift shop, labelled "Maasai craftwork — authentically sourced." The source is a factory in Nairobi.',
    choices: [
      {
        text: 'Take the job. The money is real.',
        tag: null,
        outcome: 'You take it. The money arrives. Every morning you dress for work and every afternoon you undress. You get good at reading which tourists want a photo and which want a conversation.',
        effect: (p) => { p.mo += 1200; p.m -= 6; p.setMem('kenMaasaiTourist', true) },
      },
      {
        text: 'Refuse. There are other ways.',
        tag: null,
        outcome: 'You refuse. The other ways are not obvious yet. You find some of them. They are harder and worth it in a way you cannot quantify.',
        effect: (p) => { p.karma += 5; p.m += 3; p.r += 4; p.setMem('kenMaasaiTourist', true) },
      },
    ],
  },

  // ── FOLLOW-THROUGH: MOI SILENCE ──────────────────────────────────────────

  {
    id: 'ken_moi_silence_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('ken_silent_under_moi') && G.age >= 55 && !G.mem.kenMoiLate,
    text: 'Someone asks if you remember what it was like under Moi. You remember. You say: it was complicated. This is not a lie. It is the sentence you learned to build around the thing you are not saying.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('kenMoiLate', true) },
  },

]

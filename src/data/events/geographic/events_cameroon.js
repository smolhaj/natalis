// Cameroon character arc events
// Covers: Bamileke entrepreneurship, Biya's long presidency, Francophone/Anglophone
// divide, 2016 Anglophone strike, Ambazonia conflict, Douala vs. Yaoundé texture.

const IS_CAMEROONIAN = (G) => G.character.country.name === 'Cameroon';
const IS_ANGLOPHONE = (G) =>
  G.ethnicity === 'anglophone_northwest' || G.ethnicity === 'anglophone_southwest';

export const CAMEROON_EVENTS = [

  // ── BAMILEKE IDENTITY AND TRADE ───────────────────────────────────────────────

  {
    id: 'cmr_bamileke_world',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.ethnicity === 'bamileke' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.cmrBamileke,
    text: 'The Bamileke are called the Jews of Africa — not a compliment from everyone who says it. Your people have been traders and craftsmen in the western highlands since before any of the current borders existed. The tontine — the rotating savings circle — is a Bamileke institution that functions as a bank when banks aren\'t available, a social bond when institutions fail, and a form of collective trust that travels with the diaspora. In Douala, in Paris, in New York, there is a tontine for Bamileke migrants. You inherit the logic of the tontine: every month someone wins; everyone contributes; the group is the bank.',
    choices: [
      {
        text: 'Build a small business through the tontine network.',
        tag: 'Trade',
        outcome: 'The tontine financed the startup. The network supplied the customers. The Bamileke way: community as capital.',
        effect: (p) => { p.w += 4; p.s += 2; p.addFlag('bamileke_identity'); p.addFlag('tontine_member'); p.setMem('cmrBamileke', true); },
      },
      {
        text: 'Use education to move out of the ethnic economy.',
        tag: 'Education',
        outcome: 'The degree opens different doors. You remain Bamileke but you navigate the national economy rather than the ethnic one. Both paths require you to be twice as capable as someone whose identity doesn\'t precede them.',
        effect: (p) => { p.e += 4; p.m -= 2; p.addFlag('bamileke_identity'); p.setMem('cmrBamileke', true); },
      },
    ],
  },

  // ── BIYA ERA ──────────────────────────────────────────────────────────────────

  {
    id: 'cmr_biya_long_rule',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.cmrBiya,
    text: 'Biya became president in 1982, and the elections come and he wins every one, and nobody in an office asks whether win is the word. The party is the state and the state is the party: jobs, contracts, scholarships all flow through it. You learn this not as a lesson but as how things work. The photograph on the office wall, the form that asks your political affiliation, the conversation that stops when certain questions come up.',
    choices: [
      {
        text: 'Navigate the system — the party card, the appropriate affiliations.',
        tag: 'Navigate',
        outcome: 'The system has positions that come with access. You hold a position. The access costs the position.',
        effect: (p) => { p.w += 3; p.karma -= 3; p.addFlag('cmr_biya_era'); p.addFlag('regime_self_censorship'); p.setMem('cmrBiya', true); },
      },
      {
        text: 'Operate outside the formal state — private sector, informal, church.',
        tag: 'Outside',
        outcome: 'The church, the market, the tontine. The spaces that are not quite the state. You operate in them and the state operates around you.',
        effect: (p) => { p.m -= 2; p.addFlag('cmr_biya_era'); p.setMem('cmrBiya', true); },
      },
    ],
  },

  // ── FRANCOPHONE / ANGLOPHONE DIVIDE ───────────────────────────────────────────

  {
    id: 'cmr_anglophone_identity',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      IS_ANGLOPHONE(G) &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.cmrAngloPhone,
    text: 'You go to school in English, under the common law the British left. The civil service, the courts, the forms and the national radio are in French. The country has two official languages and one language of power, and you are called Anglophone as if it were an ethnicity rather than a colonial leftover. The English-speaking regions are a fifth of the country and get a fraction of its ministers. The arithmetic is not subtle.',
    choices: [
      {
        text: 'You learn French to access the national systems.',
        tag: 'Adapt',
        outcome: 'French gets you through the government form, the job interview, the civil service exam. The English stays for home, church, the town meeting. You carry both.',
        effect: (p) => { p.e += 3; p.m -= 3; p.addFlag('anglophone_cameroonian'); p.setMem('cmrAngloPhone', true); },
      },
      {
        text: 'You hold the Anglophone identity as a political fact.',
        tag: 'Identity',
        outcome: 'The arithmetic of exclusion is real and you name it as such. The naming has costs that depend on the year.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('anglophone_cameroonian'); p.addFlag('anglophone_political'); p.setMem('cmrAngloPhone', true); },
      },
    ],
  },

  // ── DOUALA TEXTURE ────────────────────────────────────────────────────────────

  {
    id: 'cmr_douala_life',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.cmrDouala,
    text: 'Douala is not the capital — Yaoundé is the capital — but Douala is the city: the port, the business district, the Wouri River estuary, the traffic that the locals call "Douala time." The city runs on Pidgin English regardless of the official language. A Bamileke merchant in Akwa, a Bassa woman selling at the marché de Sandaga, a Hausa trader arrived from the north with cattle: they all speak Pidgin to each other in the market and French to the official and English to themselves in the neighbourhood church. The city holds all the translations simultaneously.',
    choices: null,
    effect: (p) => { p.s += 2; p.e += 1; p.addFlag('cmr_douala_generation'); p.setMem('cmrDouala', true); },
  },

  // ── 2016 ANGLOPHONE STRIKE ────────────────────────────────────────────────────

  {
    id: 'cmr_anglophone_strike_2016',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2017 &&
      G.age >= 18 &&
      !G.mem?.cmrStrike2016,
    text: 'October 2016. The Anglophone lawyers strike because they are being given French-speaking judges who do not know common law, and the teachers follow because their children are being taught in French. The government shuts off the internet for three months and then sends soldiers. By 2017 a lawyers\' strike has become a secession. The Amba Boys burn villages, and the army burns villages.',
    choices: [
      {
        text: 'You are Anglophone. The strike was legitimate. What followed was not anticipated.',
        tag: 'Anglophone',
        outcome: 'The strike was about judges and teachers. It became something else before anyone had decided it should. The lawyers who went on strike are now living with what the strike became.',
        // Effects receive only the proxy — this used to call IS_ANGLOPHONE(G)
        // and threw for anyone who picked it. Choosing this option is the
        // declaration of position, so the flag is unconditional here.
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('anglophone_crisis_inside'); p.addFlag('anglophone_crisis_witness'); p.setMem('cmrStrike2016', true); },
      },
      {
        text: 'You are Francophone. The crisis is in the northwest and southwest. You watch from the south.',
        tag: 'Francophone',
        outcome: 'The crisis is in the regions. Yaoundé and Douala continue. The distance between the news on the radio and your daily life is the moral position of being in the majority during a minority crisis.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('anglophone_crisis_witness'); p.setMem('cmrStrike2016', true); },
      },
    ],
  },

  // ── AMBAZONIA DISPLACEMENT ────────────────────────────────────────────────────

  {
    id: 'cmr_ambazonia_displacement',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      IS_ANGLOPHONE(G) &&
      G.flags.includes('anglophone_crisis_inside') &&
      G.currentYear >= 2018 && G.currentYear <= 2023 &&
      !G.mem?.cmrDisplaced,
    text: 'From 2018 the villages burn and empty. You have left your town, or watched it empty. The Amba Boys hold some villages at night and the army holds them by day, and the schools have been shut so long by the boycott that children who started primary school in 2016 have never sat in a class. You count the years in children who cannot read.',
    context: 'By 2020 the Anglophone crisis had displaced over 700,000 people inside Cameroon and sent tens of thousands into Nigeria.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.r += 10; p.addFlag('ambazonia_displaced'); p.setMem('cmrDisplaced', true); },
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'cmr_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_CAMEROONIAN(G) &&
      G.currentYear >= 2020 &&
      (G.flags.includes('cmr_biya_era') || G.flags.includes('anglophone_crisis_witness')) &&
      !G.mem?.cmrLate,
    text: 'Biya is still president after more than forty years, rarely photographed, his absences abroad counted in months. The government goes on, and so does the Anglophone war, with no talks and no ceasefire, and the world barely notices. You have grown up in a country they call Africa in miniature, with every one of the continent\'s landscapes and every one of its problems. The miniature has been at this scale for a very long time.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.addFlag('cmr_long_witness'); p.setMem('cmrLate', true); },
  },

]

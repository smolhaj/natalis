// North Korea depth arc events
// Covers: inminban surveillance, kwan-li-so disappearance, Notel player era,
// Tumen River phone calls, Pyongyang privilege, Workers' Party card, songbun
// reclassification in the market era, post-Hanawon adjustment in South Korea

const IS_DPRK = (G) => G.character.country?.name === 'North Korea'

export const NORTH_KOREA_DEPTH_EVENTS = [

  {
    id: 'nk_dep_inminban',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_DPRK(G) &&
      G.age >= 6 && G.age <= 12 &&
      !G.flags.has('dprk_inminban_awareness'),
    text: 'The inminban leader comes on Tuesday afternoons. Every household must be present. The leader has a small notebook in which absences are recorded. You learn, before you can name the system, what the notebook means — that the ordinary facts of where you are and who is with you are information that belongs to someone else. The leader is a neighbor. She brought food when your grandmother was sick. She also has the notebook. Both things are true about her and you learn not to hold them as a contradiction.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 2; p.addFlag('dprk_inminban_awareness') },
  },

  {
    id: 'nk_dep_kwanliso',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_DPRK(G) &&
      G.age >= 17 &&
      !G.flags.has('dprk_kwanliso_witness'),
    text: 'The man who lived two floors above you was taken in February. The phrase used was not taken. It was assigned to a labor facility in the north. The assignment came without a hearing, without a notice to the family, without a date of return. His wife packed one bag and sent it after him and no one knows whether it arrived. You learn not to say his name in the stairwell. You learn the specific shape of the silence that goes around a person who has become a name that is not said. The shape of the silence is also a form of knowledge.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('dprk_kwanliso_witness') },
  },

  {
    id: 'nk_dep_notel',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_DPRK(G) &&
      G.currentYear >= 2010 &&
      G.flags.has('dprk_foreign_media') &&
      !G.flags.has('dprk_notel_era'),
    text: (G) => {
      const yr = G.currentYear
      const device = yr <= 2014
        ? 'a Notel — a portable media player the size of a thick novel, battery-powered, with a slot for a USB drive'
        : 'a Notel with an SD card slot, smaller than the earlier ones, the slot accepting a card with more on it than a drive twice the size'
      return `The person who sells it at the market explains nothing. The price includes the explanation. You bring home ${device} and you charge it at the power strip when the electricity comes and you watch at 2am with the curtain closed and the volume at the threshold between audible and deniable. The South Korean dramas are three years old when they reach you. The people in them live in apartments with food in the refrigerator and they argue about love in rooms that have heating. The rooms are ordinary to the people in them. The rooms are not ordinary.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.addFlag('dprk_notel_era') },
  },

  {
    id: 'nk_dep_tumen_call',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_DPRK(G) &&
      G.currentYear >= 2000 &&
      !G.flags.has('dprk_tumen_phone'),
    text: 'The Chinese SIM card comes through the market. The signal from the Chinese tower reaches the high ground near the river on clear days. You go before dawn, when the patrol pattern has a gap. The call connects after two tries. Your cousin, who has been on the other side for fourteen months, sounds like herself and also like someone who has been somewhere else for fourteen months — some words slightly different, some pauses in different places. The call lasts three minutes. You say: I am here. She says: I am here. You agree to try again in a month. You go back down before the light comes.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 3; p.addFlag('dprk_tumen_phone') },
  },

  {
    id: 'nk_dep_pyongyang',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_DPRK(G) &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.has('dprk_pyongyang_privilege'),
    text: 'You went to Pyongyang for the first time and it was not what you expected, which surprised you, because you did not know you had expectations. The buildings are large. The metro goes deep enough to be a shelter. The mosaics show the history of the revolution in colors that are vivid because they were made to be vivid. The Pyongyangers have a bearing — a way of standing and looking that provincial people do not have. The rations in Pyongyang are better. Everyone knows this and no one says it. The city keeps its knowledge the way all cities keep their advantages: as a fact that structures everything and is mentioned in none of the official descriptions.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.addFlag('dprk_pyongyang_privilege') },
  },

  {
    id: 'nk_dep_party_card',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_DPRK(G) &&
      G.age >= 22 && G.age <= 32 &&
      !G.flags.has('dprk_party_member') &&
      !G.flags.has('dprk_party_rejected'),
    text: 'The Korean Workers\' Party application takes years. Three years of political study sessions, assessments, the cell leader\'s reports, the background checks that go back to your grandparents\' grandparents. The notification comes through the work unit party cell, not through any official document. The card, when it comes, is smaller than you expected — the size of what other countries call a business card. The card determines who you can marry, where you can live, what doors will open when you show it and what will happen when you don\'t have it to show.',
    choices: [
      {
        text: 'The card comes. You are a party member.',
        tag: 'accepted',
        outcome: 'The card is in your drawer. The doors it opens are not visible until you walk toward them and they open. This is how party membership works — you do not see the doors until you have the card.',
        effect: (p) => { p.m += 6; p.w += 6; p.s += 3; p.addFlag('dprk_party_member') },
      },
      {
        text: 'The card does not come. No explanation is offered.',
        tag: 'rejected',
        outcome: 'The rejection arrives in the form of continued silence — the notification that was expected does not come. The reasons are not given. You understand the likely reasons. The understanding is not new information.',
        effect: (p) => { p.m -= 12; p.w -= 6; p.addFlag('dprk_party_rejected') },
      },
    ],
  },

  {
    id: 'nk_dep_songbun_market',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_DPRK(G) &&
      G.currentYear >= 2005 &&
      G.flags.has('dprk_hostile_class') &&
      !G.flags.has('dprk_songbun_reclassified'),
    text: 'The market has made certain things possible that were not possible before the market. Among them: the official who processes records in the county office accepts what you bring in an envelope that is sized for documents. He does not look up while he makes the change. Your grandfather\'s record — the grandfather who had a Bible, or whose brother went south in 1950, or who said something in 1972 that was noted — is amended. The file now describes an ordinary family with an ordinary history. The amendment is illegal. It happened. Your grandfather never knew he was defining your ceiling and he never knew the ceiling was removed.',
    choices: null,
    effect: (p) => { p.m += 8; p.w += 6; p.addFlag('dprk_songbun_reclassified') },
  },

  {
    id: 'nk_dep_post_hanawon',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_DPRK(G) &&
      G.flags.has('dprk_hanawon_complete') &&
      !G.flags.has('dprk_south_korea_adjustment'),
    text: 'Three years in Seoul. The accent marks you before you have finished your third word — the North Korean vowels, the specific pitch of certain consonants, words that came from Russian or Chinese rather than English and therefore do not match the Korean spoken here. South Koreans are kind, mostly. Some are curious in a way that makes you an exhibit. A few treat you as evidence of something political. The grocery store still does something to you — not the variety, which you have adjusted to, but the quantity. The ramen wall. The produce section. The refrigerated section that extends for more meters than your first apartment. You stand in front of it and you know, in a way that will not leave your body, that this is what abundance looks like from the outside of it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 5; p.r += 4; p.addFlag('dprk_south_korea_adjustment') },
  },

]

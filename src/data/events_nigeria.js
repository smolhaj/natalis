// Nigeria depth arc events
// Covers: military coup culture (1966–1999), June 12 1993 election annulment,
// return to democracy 1999, Boko Haram North, sharia in 12 states 2000–02,
// Niger Delta oil community, naira crisis 2022–24, inter-ethnic navigation.
// Biafra arc already exists in events_country_arcs_3.js.
// Oil boom/SAP/Saro-Wiwa/EndSARS already in events_west_africa.js.

export const NIGERIA_EVENTS = [

  {
    id: 'nga_coup_culture',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1966 && G.currentYear <= 1998 &&
      G.age >= 18 &&
      !G.mem?.ngaCoupCulture,
    text: 'Another coup. Or the threat of another coup. Or the anniversary of the last one. Since January 15, 1966, the Nigerian army has moved through the political structure more than the politicians have. Ironsi, Gowon, Murtala, Obasanjo, Buhari, Babangida, Abacha — the names change and the uniform remains. What changes is which faction is ascendant and how much they take and how directly they take it. The constitution is a document that can be suspended. You have seen it suspended before.',
    choices: [
      {
        text: 'Learn to navigate the patronage system.',
        tag: 'nga_learned_patronage',
        outcome: 'The patronage network is visible once you know how to read it. You learn the reading. It makes you useful and makes you complicit in a way you try not to examine too carefully.',
        effect: (p) => { p.s += 3; p.karma -= 3; p.addFlag('nga_military_era'); p.addFlag('regime_self_censorship'); p.setMem('ngaCoupCulture', true); },
      },
      {
        text: 'Keep your head down and your opinions private.',
        tag: null,
        outcome: 'The private person and the public person develop different vocabularies. You become fluent in both without intending to.',
        effect: (p) => { p.r += 4; p.addFlag('nga_military_era'); p.addFlag('learned_silence'); p.setMem('ngaCoupCulture', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_june12_1993',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1993 && G.currentYear <= 1995 &&
      G.age >= 16 &&
      !G.mem?.ngaJune12,
    text: 'June 12, 1993. The results of the presidential election — the freest and fairest in Nigerian history, observers say — show MKO Abiola winning clearly. A Yoruba Muslim from Abeokuta, with a running mate from the North. Babangida annuls the result. No official reason. The result is simply unmade. The protests follow. The strikes. Abiola eventually declares himself president and is arrested. Babangida hands power to a civilian transitional council, and eight months later Abacha makes his move. Abiola dies in detention in 1998, on the day of a scheduled meeting with the American ambassador, before he is freed.',
    choices: [
      {
        text: 'Join the pro-democracy protests.',
        tag: 'nga_june12_activist',
        outcome: 'The protest is real and the government is not interested in the protest. You carry June 12 as a specific argument about what Nigerian democracy is and is not.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.r += 6; p.addFlag('nga_june12_generation'); p.addFlag('activist'); p.addFlag('political_aware'); p.setMem('ngaJune12', true); },
      },
      {
        text: 'Watch it happen — from the outside, from a distance.',
        tag: null,
        outcome: 'You see how completely a result can be erased. The vote was real and is now not real. The specific lesson this teaches about Nigerian democracy does not leave you.',
        effect: (p) => { p.m -= 10; p.r += 7; p.karma += 3; p.addFlag('nga_june12_generation'); p.addFlag('political_aware'); p.setMem('ngaJune12', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_democracy_1999',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear === 1999 &&
      G.age >= 18 &&
      !G.mem?.ngaDemocracy1999,
    text: 'May 29, 1999. The handover. Abdulsalami Abubakar transfers power to Olusegun Obasanjo — a Yoruba Christian and former military head of state turned civilian candidate. For the first time since 1983, there is a civilian government. The constitution is not suspended. The specific texture of the change: the broadcasts on NTA, the jubilation in the streets, the specific disorientation of an election result that is being respected. You have been an adult in this country for years and this is the first time you have seen this particular thing happen.',
    choices: null,
    effect: (p) => { p.m += 8; p.addFlag('nga_democracy_generation'); p.setMem('ngaDemocracy1999', true); },
  },

  {
    id: 'nga_boko_haram',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 2009 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      (G.ethnicity === 'hausa_fulani' || G.ethnicity === 'kanuri' || G.ruralUrban === 'rural') &&
      (G.character?.religion?.startsWith('muslim') || G.character?.birthReligion?.startsWith('muslim')) &&
      !G.mem?.ngaBokoHaram,
    text: 'The name means "Western education is forbidden." What it has become in the North-East is a different category of thing — the attacks on schools and markets and churches and mosques, the kidnappings, the suicide bombings, the counterinsurgency that takes what it takes. Maiduguri. Borno State. Yobe State. The army checkpoint on the road that is both protection and extortion. The school in Chibok, 276 girls taken in April 2014. The displacement: 2.6 million people by 2016, the largest internal displacement in Nigerian history. You are in the North. This is the air of this decade.',
    choices: [
      {
        text: 'Move your family south, out of the conflict zone.',
        tag: 'nga_boko_displaced',
        outcome: 'The city in the South is safer by the metrics that matter. It is not home. The displacement has a name now: IDP. You join the two million.',
        effect: (p) => { p.m -= 10; p.r += 8; p.h -= 3; p.addFlag('nga_boko_haram_generation'); p.addFlag('internally_displaced'); p.setMem('ngaBokoHaram', true); },
      },
      {
        text: 'Stay. You have lived here your whole life.',
        tag: null,
        outcome: 'Staying requires a different relationship to risk than you have ever had before. The risk is not abstract. You make your arrangements.',
        effect: (p) => { p.m -= 12; p.r += 6; p.h -= 5; p.addFlag('nga_boko_haram_generation'); p.addFlag('regime_self_censorship'); p.setMem('ngaBokoHaram', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_sharia_north',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 2000 && G.currentYear <= 2004 &&
      G.ethnicity === 'hausa_fulani' &&
      G.age >= 16 &&
      !G.mem?.ngaSharia,
    text: 'Between 1999 and 2002, twelve northern states adopt Sharia criminal law. Zamfara goes first in October 1999, Kano follows. The implementation is not uniform — the application of hudud penalties, the separate courts, the Hisbah morality police in some states. For many in the North, it is the democratic assertion of Islamic governance in a state that has been majority-Christian at the federal level. For Christians in the North, it is alarming in its implications. For Hausa-Fulani families like yours, the meaning depends entirely on which faction of the family you ask.',
    choices: [
      {
        text: 'Welcome it. This is what a Muslim-majority state looks like from the inside.',
        tag: 'nga_sharia_supported',
        outcome: 'The Sharia courts handle some things better than the civil courts did. The morality police are more complicated. You hold the two separately.',
        effect: (p) => { p.karma += 3; p.addFlag('nga_sharia_transition'); p.addFlag('devout'); p.setMem('ngaSharia', true); },
      },
      {
        text: 'Worry about what it means for the country.',
        tag: null,
        outcome: 'The federal constitution says one thing and the state government is doing another. You see how that gap is going to require navigation for the rest of your life in this country.',
        effect: (p) => { p.r += 5; p.addFlag('nga_sharia_transition'); p.addFlag('political_aware'); p.setMem('ngaSharia', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_niger_delta',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.ethnicity === 'ijaw' &&
      !G.mem?.ngaDelta,
    text: 'The gas flares have been burning since before you were born. The flares burn off gas that should have been captured; they have been burning in the Niger Delta since the 1960s, making the nights orange and putting carcinogens into the air your family breathes. The oil spills — Bodo Creek, Ogoniland, others — contaminate the creeks and swamps your community depends on for food. Shell\'s remediation reports say one thing; the community scientists say another. The UNEP assessment in 2011 will say it could take thirty years to clean up what has been accumulated. You are in the community. The thirty years starts now.',
    choices: [
      {
        text: 'Join the advocacy — community meetings, documentation, legal action.',
        tag: null,
        outcome: 'Ken Saro-Wiwa showed what the ceiling of advocacy looks like in this country. You know the ceiling. You document anyway.',
        effect: (p) => { p.m -= 5; p.h -= 3; p.karma += 8; p.r += 5; p.addFlag('nga_delta_community'); p.addFlag('activist'); p.setMem('ngaDelta', true); },
      },
      {
        text: 'Try to find work elsewhere — the land is not providing what it once did.',
        tag: 'nga_delta_migrant',
        outcome: 'The city takes you. Lagos, or Port Harcourt. The delta is visible from the city, in the flares on the horizon, in the price of kerosene, in the news.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('nga_delta_community'); p.setMem('ngaDelta', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_naira_crisis',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 2022 &&
      G.age >= 18 &&
      !G.mem?.ngaNaira,
    text: 'The naira redesign comes first — old notes pulled from circulation faster than new ones arrive, the ATM queues stretching around the block, cash economy suddenly cashless in a country where the cashless infrastructure does not reach most transactions. Then the rate: the naira falls from 460 to the dollar in January 2023 to over 1,500 by early 2024. The removal of the fuel subsidy in May 2023 doubles the price of petrol overnight. Inflation above 25 percent. The generator runs on petrol. The school fees are in naira; the commodities are priced in dollars. You are managing the arithmetic of a currency in collapse.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 6; p.w -= 5; p.addFlag('nga_naira_crisis_lived'); p.setMem('ngaNaira', true); },
  },

  {
    id: 'nga_ethnic_navigation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.age >= 18 &&
      (G.ethnicity === 'yoruba' || G.ethnicity === 'igbo' || G.ethnicity === 'hausa_fulani') &&
      !G.mem?.ngaEthnicity,
    text: 'Your tribe is the first piece of information that anyone in a room in this country wants. Not always overtly — sometimes through your name, your accent, the church or mosque you mention, where your parents are from. The question is structural: federal character, quota system, which party gets which constituency. Three nations sharing a country that the British built to suit the British. You have developed a language for the room — what to emphasize here, what to leave unspecified there, which version of yourself to lead with.',
    choices: [
      {
        text: 'Wear your identity fully — this is who you are.',
        tag: null,
        outcome: 'The identity is full and costs what it costs in rooms that are not yours. You carry it anyway.',
        effect: (p) => { p.s += 2; p.karma += 3; p.addFlag('nga_ethnic_pride'); p.setMem('ngaEthnicity', true); },
      },
      {
        text: 'Learn to move between identities as the room requires.',
        tag: null,
        outcome: 'You become adept at code-switching in a specifically Nigerian way. The switching is a skill and a small daily erasure at the same time.',
        effect: (p) => { p.s += 4; p.r += 3; p.addFlag('dual_identity'); p.setMem('ngaEthnicity', true); },
      },
    ],
    effect: null,
  },

]

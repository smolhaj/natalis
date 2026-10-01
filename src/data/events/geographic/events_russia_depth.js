// events_russia_depth.js
// Russia depth: Great Terror 1937-38, Khrushchev thaw and the secret speech,
// Brezhnev stagnation and the blat system, kommunalka communal apartment life,
// 1990s shock therapy and wild capitalism, first Chechen war, bread line physics.

const IS_RUSSIA = (G) => G.character.country?.name === 'Russia'
const IS_SOVIET = (G) =>
  IS_RUSSIA(G) ||
  G.character.country?.name === 'Ukraine' ||
  G.character.country?.name === 'Kazakhstan' ||
  G.character.country?.name === 'Belarus'

export const RUSSIA_DEPTH_EVENTS = [

  // ── THE GREAT TERROR ──────────────────────────────────────────────────────────

  {
    id: 'ru_dep_great_terror',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1937 && G.currentYear <= 1939 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.ruDepGreatTerror,
    text: 'It is always at night, two or three in the morning, when a body is least able to argue with anything. The lift stops on a floor and everybody on the staircase knows which one. In the morning the door has a strip of paper across it and the mother is on the stairs with a parcel she will carry to the queue at Kresty and bring home again. Nobody in the building says the family\'s name out loud, and that is not cowardice exactly, it is the arrangement.',
    context: 'During the Great Terror of 1937-38, roughly 750,000 people were executed and over a million sent to camps, under Article 58 of the criminal code covering anti-Soviet activity, terrorism and sabotage. Arrests were carried out at night by NKVD quota. Families were given no information and often no charge, and relatives of the arrested were themselves liable to deportation or exclusion from work and education.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.addFlag('ru_dep_terror_generation')
      p.setMem('ruDepGreatTerror', true)
    },
  },

  {
    id: 'ru_dep_family_arrest',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.flags.has('ru_dep_terror_generation') &&
      G.currentYear >= 1937 && G.currentYear <= 1940 &&
      G.age >= 6 && G.age <= 22 &&
      !G.mem?.ruDepFamilyArrest,
    text: `It is someone in your family who is taken — a father, an uncle, a grandfather. The arrest happens and then there is silence: no letter, no address, no visiting rights. Your mother begins to say that your father is "on a business trip." The social category of having an arrested relative is called "CHSIR" — member of the family of a traitor to the Motherland — and it has consequences: for university admission, for party membership, for housing allocation, for the rest of your life. You learn not to mention your father in official documents. This becomes a habit so deep you stop noticing it.`,
    choices: null,
    effect: (p) => {
      p.m -= 15
      p.r += 10
      p.e += 2
      p.addFlag('ru_dep_chsir')
      p.setMem('ruDepFamilyArrest', true)
    },
  },

  // ── THE KOMMUNALKA ────────────────────────────────────────────────────────────

  {
    id: 'ru_dep_kommunalka',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1945 && G.currentYear <= 1980 &&
      G.age >= 5 && G.age <= 30 &&
      !G.mem?.ruDepKommunalka,
    text: 'Four families, one kitchen, one lavatory, and a hallway where every bicycle and every pair of winter boots has an agreed position. Your shelf in the refrigerator is the second one and you do not touch the others. The boy on the left practises scales at an hour everybody has decided to tolerate. The family on the right is not speaking to yours this month over the hot water on Tuesday. Your door is the only door in the world that is yours, and there are five of you behind it.',
    context: 'Communal apartments were created by subdividing pre-revolutionary flats after 1918 and remained the normal urban housing form for decades; a majority of Leningrad residents still lived in them in the early 1960s. Khrushchev-era prefabricated blocks moved millions into single-family flats from 1957 onward, but kommunalki persisted in central Moscow and Leningrad into the post-Soviet period.',
    choices: null,
    effect: (p) => {
      p.e += 2
      p.s += 2
      p.addFlag('ru_dep_kommunalka_generation')
      p.setMem('ruDepKommunalka', true)
    },
  },

  // ── KHRUSHCHEV THAW AND THE SECRET SPEECH ────────────────────────────────────

  {
    id: 'ru_dep_secret_speech',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1956 && G.currentYear <= 1958 &&
      G.age >= 12 &&
      !G.mem?.ruDepSecretSpeech,
    text: `February 1956. Khrushchev speaks to a closed session of the Party Congress, and in the weeks after the speech is read aloud in factories and institutes and party cells: the cult of personality, the Terror, the generals shot, the deportations. The people listening were told for thirty years that these things were necessary, or did not happen. Some of them lost fathers. Some signed denunciations. The speech does not tell them what to do with any of it.`,
    choices: [
      {
        text: 'This is a correction. The system can correct itself.',
        tag: null,
        outcome: 'You take the speech as proof of capacity for reform. The next few years will be better.',
        effect: (p) => { p.m += 3; p.addFlag('ru_dep_thaw_believer'); p.setMem('ruDepSecretSpeech', true) },
      },
      {
        text: 'If this was always true, what else was always true.',
        tag: null,
        outcome: 'The speech opens something that cannot be closed again. You carry the question for the rest of your life.',
        effect: (p) => { p.r += 6; p.e += 3; p.addFlag('ru_dep_thaw_sceptic'); p.setMem('ruDepSecretSpeech', true) },
      },
    ],
  },

  // ── BREZHNEV STAGNATION: THE BLAT SYSTEM ─────────────────────────────────────

  {
    id: 'ru_dep_blat_system',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.ruDepBlat,
    text: `The official economy and the real economy are two different things and you move between them. Blat: the system of favours, connections, reciprocal arrangements that gets things done. The doctor who sees your mother without waiting; the sausage that appears through a friend at the meat enterprise; the apartment that moves from the waiting list to yours because someone knows someone at the housing committee. Everyone has a network. Everyone is in someone else's network. The word "достал" — I obtained — implies difficulty surmounted, contacts activated, the satisfaction of having navigated a system that requires navigation. The system is the real infrastructure.`,
    choices: null,
    effect: (p) => {
      p.s += 3
      p.e += 2
      p.addFlag('ru_dep_blat_generation')
      p.setMem('ruDepBlat', true)
    },
  },

  {
    id: 'ru_dep_deficit',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.ruDepDeficit,
    text: `You join a queue before you know what is at the end of it, and find out it is boots, or Hungarian salami, or children's shoes. There is an art to it: your number written on your palm, or on the palm of the person behind you. You queue for things you do not need, because a scarce thing can be traded for something you do. Defitsit does not quite mean shortage. It means the gap between what exists and what can be had officially, and the gap has been large for a long time.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 2
      p.setMem('ruDepDeficit', true)
    },
  },

  // ── 1990S WILD CAPITALISM ─────────────────────────────────────────────────────

  {
    id: 'ru_dep_1990s_kiosks',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1997 &&
      G.age >= 14 &&
      !G.mem?.ruDep1990sKiosks,
    text: `The city becomes covered in kiosks: metal booths selling everything at once — Turkish cigarettes, Finnish vodka, Snickers bars, pirated cassettes, Chinese trainers. The Soviet infrastructure is still physically present but the economy inside it is something else entirely. Vouchers for privatization were issued to every citizen: one voucher per person, to invest in a future of shares in newly privatised enterprises. Most were sold immediately to voucher funds run by people who understood what they were doing. The enterprises ended up with the people who had the money and the connections to consolidate them. This process has a name. The name is not what the name says it is.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.addFlag('ru_dep_1990s_generation')
      p.setMem('ruDep1990sKiosks', true)
    },
  },

  {
    id: 'ru_dep_1998_default',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear === 1998 &&
      G.age >= 14 &&
      !G.mem?.ruDep1998Default,
    text: `August 17, 1998, and the ruble collapses and the government stops paying its debts and the banks close. Savings in rubles lose two thirds of their value in two weeks. The ones who kept dollars under the mattress lose nothing; the ones who trusted the banks lose. In every family in the last two weeks of August there is the same conversation about who decided what, and what was in the account, and what is in it now.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.w -= 4
      p.setMem('ruDep1998Default', true)
    },
  },

  // ── FIRST CHECHEN WAR ─────────────────────────────────────────────────────────

  {
    id: 'ru_dep_chechnya_war',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1994 && G.currentYear <= 1997 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ruDepChechnya,
    text: 'You sign because the contract money is real, which in 1994 is not something anybody can say about a salary. Grozny in December is a city of four hundred thousand people and you go into it in an armoured column built for a different kind of war. The numbers come out months after the men do. At Pushkin Square the mothers stand with photographs and negotiate for the bodies themselves, because the army will not.',
    context: 'Russian forces entered Grozny on 31 December 1994 and the Maykop Brigade was destroyed in the first days of street fighting. Official casualty figures were released long after the events and were widely disputed. The Union of Soldiers\' Mothers Committees negotiated body recoveries and prisoner exchanges directly with Chechen commanders. Grozny fell in 1995 and the Khasavyurt accord suspended the war in 1996.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 7
      p.h -= 3
      p.addFlag('ru_dep_chechnya_generation')
      p.setMem('ruDepChechnya', true)
    },
  },

  // ── THE PROPISKA ──────────────────────────────────────────────────────────────

  {
    id: 'ru_dep_propiska',
    phase: null,
    weight: 2,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 1991 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.ruDepPropiska,
    text: `The propiska: the registration stamp in your internal passport that tells you where you are legally permitted to live. Moscow residents need a Moscow propiska. Without one you cannot hold a Moscow job, sign a Moscow lease, receive Moscow healthcare, or enrol your children in a Moscow school. The propiska is in the hands of your employer, your housing office, your marriage. It is the domestic border within your own country. Some people marry for it, or rather, some people acquire a marriage that has the propiska as its real purpose. The city knows who belongs and who is present without permission, and the difference is maintained.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ruDepPropiska', true)
    },
  },

]

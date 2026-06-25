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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1937 && G.currentYear <= 1939 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.ruDepGreatTerror,
    text: `The knock comes at night. It almost always comes at night — 2am, 3am, the hour when the body is least defended. Someone in the building has been taken. You do not know the charge; no one knows the charge at first. The word "Article 58" circulates. Anti-Soviet activity. Terrorism. Sabotage. The charges are categories that expand to fit whoever needs to be inside them. The person taken may return in a year, or in ten years, or not at all. The family of the person taken receives no information. The neighbours continue as if nothing has happened because continuing is survival.`,
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
    phase: 'childhood',
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1945 && G.currentYear <= 1980 &&
      G.age >= 5 && G.age <= 30 &&
      !G.mem?.ruDepKommunalka,
    text: `The kommunalka: three families, or five families, or seven, sharing one apartment. One kitchen, one toilet, one hallway where the bicycles and the boots and the winter coats all coexist. You know whose day it is to clean the hallway. You know which shelf in the shared refrigerator is yours and you do not take from the other shelves. The family in the room to the left has a child who practises piano at hours that everyone has learned to tolerate. The family on the right is not speaking to your family this month, over the question of who used the last of the hot water on Tuesday. Privacy exists within the room. The room is shared by your entire family. This is Moscow, or Leningrad, or any Soviet city in any year since collectivisation.`,
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
    text: `February 25, 1956. Khrushchev speaks to the closed session of the Twentieth Congress of the Communist Party. The speech is not broadcast; it is read aloud in factories and institutions and party cells in the weeks after. "On the Cult of Personality and Its Consequences." Stalin's crimes, his personal terror, the 1937 purges, the execution of military commanders, the deportations. The people listening to this speech spent the last thirty years being told these things were necessary, or did not happen, or happened for good reasons. Some of them lost fathers. Some of them signed denunciations. Some of them applauded at the right moments for decades. The speech does not tell them what to do with any of this.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.ruDepBlat,
    text: `The official economy and the real economy are two different things and you move between them. Blat: the system of favours, connections, reciprocal arrangements that gets things done. The doctor who sees your mother without waiting; the sausage that appears through a friend at the meat enterprise; the apartment that moves from the waiting list to yours because someone knows someone at the housing committee. Everyone has a network. Everyone is in someone else's network. The word "достал" — I obtained — implies difficulty surmounted, contacts activated, the satisfaction of having navigated a system that requires navigation. The system is not criminal exactly. It is the real infrastructure.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.ruDepDeficit,
    text: `The queue before you know what is at the end of it. Someone is standing in a line; you join it. You find out it is for boots, or Hungarian salami, or children's shoes, or a subscription to a literary journal. There is an art to queuing: you write your number on your palm, or on the person behind you's palm, or on a piece of paper that goes around. You queue for things you do not need because the queue means a deficit item is available and a deficit item can be traded for something you do need. The word "дефицит" — deficit — does not mean shortage exactly. It means the gap between what exists and what can be officially obtained. The gap is large and has been large for a long time.`,
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
    text: `August 17, 1998. The ruble collapses. The government defaults on domestic debt. Banks close. Savings kept in rubles lose two-thirds of their value in two weeks. The people who kept their savings in dollars under the mattress do not lose. The people who believed in the banking system do. There is a particular conversation happening in every family in Russia in the last two weeks of August about who made which decision, and who was prudent, and what was in the account, and what is in the account now. A teacher's monthly salary is worth nine dollars.`,
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_RUSSIA(G) &&
      G.character.gender === 'male' &&
      G.currentYear >= 1994 && G.currentYear <= 1997 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ruDepChechnya,
    text: `The contract: you sign because the contract money is real money in 1994, which is not true of most salaries. Or you are conscripted and you do not sign anything. Grozny in December 1994: a city of 400,000 people, urban combat, the Maykop Brigade — a mechanised unit from a different era sent into an environment that requires a different era's training. The official Russian military casualties are published months later than they happen. The mothers in black at Pushkin Square, carrying photographs — the Soldiers' Mothers Committee. They negotiate body releases directly when the army does not. You go, or you know someone who goes. Grozny falls in 1995. Fighting continues. The Khasavyurt accord of 1996 is signed. The war has not ended so much as suspended.`,
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
    phase: 'young_adult',
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

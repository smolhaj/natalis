// events_central_asia.js
// Historical and life events for Central Asia:
// Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan.
// These are lives the game previously had no language for.

const CA_COUNTRIES = ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan']
const isCA = (G) => CA_COUNTRIES.includes(G.character.country.name)

export const CENTRAL_ASIA_EVENTS = [

  // ── KAZAKHSTAN: COLLECTIVIZATION AND FAMINE (1929–1933) ──────────────────────

  {
    id: 'ca_kaz_collectivization',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1929 && G.currentYear <= 1936 &&
      G.age >= 5 && G.age <= 14,
    text: 'The officials come to count the animals. Your grandfather stands in front of the herd with an expression you have not seen before — not anger, which you know, but something that has gone past anger into something without a name. They write numbers in a book. The animals are moved to the collective. The pasture routes your family has used for generations are no longer yours to use.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('collectivization_witness'); p.addFlag('war_childhood'); p.setMem('kazCollectivization', true) },
  },

  {
    id: 'ca_kaz_famine',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1931 && G.currentYear <= 1934 &&
      G.age >= 4 && G.age <= 14,
    text: 'The famine does not arrive as an event. It arrives as a direction — things get worse in one direction, and then continue in that direction for longer than you thought possible. The collective has no grain. The grain was taken. Your family eats the leather of old shoes, boiled for softness. One of your cousins does not come through the winter.',
    choices: null,
    effect: (p) => { p.m -= 25; p.h -= 15; p.r += 12; p.addFlag('famine_survivor'); p.addFlag('genocide_family_memory'); p.setMem('kazFamine', true) },
  },

  {
    id: 'ca_kaz_sedentarization_loss',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1930 && G.currentYear <= 1960 &&
      G.flags.has('collectivization_witness') &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.kazSedentaryLoss,
    text: 'You were born knowing how to read the steppe — the grass that says water is near, the cloud that says move south, the way animals behave before a *dzud*. This knowledge has no application anymore. You live in a building with walls. You are grateful for the walls. You mourn the knowledge anyway. There is no ceremony for the end of a way of life.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.e += 3; p.setMem('kazSedentaryLoss', true) },
  },

  // ── KAZAKHSTAN: OIL BOOM AND NAZARBAYEV ERA ───────────────────────────────────

  {
    id: 'ca_kaz_oil_boom',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1995 && G.currentYear <= 2010 &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.kazOilBoom,
    text: 'Money is arriving in Kazakhstan in quantities that exceed the country\'s capacity to spend it sensibly. The capital is being rebuilt in the steppe from nothing — glass towers, a presidential palace, a monument to whatever Nazarbayev has decided this country means. The oil is offshore in the Caspian, invisible. The towers are very visible. You are working in one of them.',
    choices: [
      {
        text: 'Take the position — the money is real even if the politics aren\'t',
        tag: 'oil_economy_participant',
        outcome: 'You take it. The salary is more than your parents earned in five years. The work does not ask difficult questions.',
        effect: (p) => { p.mo += 8000; p.w += 8; p.addFlag('oil_economy_participant'); p.setMem('kazOilBoom', true) },
      },
      {
        text: 'Stay out of it — the wealth isn\'t being shared and you know it',
        tag: null,
        outcome: 'You watch from the outside. The towers go up anyway. You are right about the distribution. The rightness doesn\'t pay the rent.',
        effect: (p) => { p.m -= 5; p.karma += 5; p.setMem('kazOilBoom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_kaz_astana',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Kazakhstan' &&
      G.currentYear >= 1997 && G.currentYear <= 2020 &&
      G.age >= 30 &&
      !G.mem?.kazAstana,
    text: 'The capital has moved. Almaty, the city that held a century of Kazakh memory — the Soviet parks, the mountains visible from every street, the specific way the light hit the aul district — is no longer the capital. Astana is the capital. Astana is a city that did not exist in this form thirty years ago. It is full of glass and intention. It does not yet have the sediment that makes a place feel inhabited.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 6; p.e += 3; p.setMem('kazAstana', true) },
  },

  // ── UZBEKISTAN: COTTON, ARAL SEA, AND KARIMOV ────────────────────────────────

  {
    id: 'ca_uzb_cotton_harvest',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Uzbekistan' &&
      G.currentYear >= 1950 && G.currentYear <= 2015 &&
      G.age >= 8 && G.age <= 16,
    text: 'School closes in September. Not for a holiday — school closes because the cotton is ready and every school in the district is required to contribute labour. You pick cotton. The bolls cut your hands if you are not careful; you are not yet careful enough. The quota is posted on a board. The teacher who is supposed to be teaching you maths is walking the rows. You will make up the missed weeks somehow.',
    choices: null,
    effect: (p) => { p.e -= 3; p.m -= 6; p.h -= 3; p.addFlag('cotton_childhood'); p.setMem('uzbCotton', true) },
  },

  {
    id: 'ca_uzb_aral_sea',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Uzbekistan' &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.uzbAralSea,
    text: 'Your grandparents talk about fishing. Your grandfather was a fisherman in Muynak when Muynak was a port. You have seen photographs. The boats in the photographs are now sitting in sand, thirty kilometres from the water\'s edge. The sea retreated so gradually that there is no single day the fishermen can point to. It was there, and then it was not. The pesticide dust from the dry seabed blows into the town on west winds. People cough.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.h -= 4; p.e += 5; p.addFlag('grew_up_polluted'); p.addFlag('environmental_witness'); p.setMem('uzbAralSea', true) },
  },

  {
    id: 'ca_uzb_karimov_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Uzbekistan' &&
      G.currentYear >= 1991 && G.currentYear <= 2016 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.uzbKarimov,
    text: 'The president has been president since before independence and will be until he dies, which everyone understands. This is not discussed. The things that are not discussed occupy a large and specific space. You learn the shape of that space early, and you learn to move within it without touching the walls. You are very good at this. You are not sure this is a skill worth having.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('learned_silence'); p.addFlag('authoritarian_childhood'); p.setMem('uzbKarimov', true) },
  },

  {
    id: 'ca_uzb_andijan',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Uzbekistan' &&
      G.currentYear >= 2005 && G.currentYear <= 2008 &&
      G.age >= 18 &&
      !G.mem?.uzbAndijan,
    text: 'In Andijan, government forces opened fire on demonstrators. The official figure is 187 dead. Journalists who reported higher numbers lost their accreditation. You know people who were in Andijan. You do not talk about what they told you, because the conversation is available to more people than just the two of you.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.karma += 6; p.addFlag('learned_silence'); p.addFlag('political_witness'); p.setMem('uzbAndijan', true) },
  },

  // ── KYRGYZSTAN: REVOLUTIONS AND ETHNIC VIOLENCE ───────────────────────────────

  {
    id: 'ca_kgz_tulip_revolution',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kyrgyzstan' &&
      G.currentYear >= 2005 && G.currentYear <= 2007 &&
      G.age >= 18 &&
      !G.mem?.kgzTulip,
    text: 'The president has fled. This is not a metaphor — Akayev is physically on a plane to Moscow. People are in the streets in Bishkek. You are in the streets in Bishkek. It feels, for a few weeks, like something is genuinely possible. You know from history that these feelings require management. You manage them. Something remains afterward that is not cynicism and is not naivety.',
    choices: [
      {
        text: 'Throw yourself into the moment — this is real',
        tag: 'political_active',
        outcome: 'You are in the square when the government offices open to ordinary citizens for the first time. You will remember this day.',
        effect: (p) => { p.m += 10; p.karma += 8; p.s += 4; p.addFlag('political_active'); p.setMem('kgzTulip', true) },
      },
      {
        text: 'Watch with hope but hold back — you have seen this before',
        tag: null,
        outcome: 'You watch. The change is real. Your caution is also real. Both turn out to be approximately correct.',
        effect: (p) => { p.m += 4; p.e += 4; p.setMem('kgzTulip', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ca_kgz_osh_violence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Kyrgyzstan' &&
      G.currentYear >= 2010 && G.currentYear <= 2013 &&
      G.age >= 16 &&
      !G.mem?.kgzOsh,
    text: (G) => {
      const isUzbek = G.character.ethnicity?.id?.includes('uzbek') || false
      if (isUzbek) {
        return 'In June, Kyrgyz mobs move through Uzbek neighbourhoods in Osh and Jalal-Abad. 400 people are killed; most of them are Uzbek. The government is not present in any useful sense. You know which streets to avoid. You know this the way people know things when the knowledge is attached to survival. Your family shelters for four days before the army arrives.'
      }
      return 'In June, there is violence in Osh between Kyrgyz and Uzbek communities. 400 people die. The numbers are contested; the deaths are not. You are Kyrgyz and you are safe in the way that sentence means what it means. You have Uzbek neighbours. You will live with what this means for the rest of your life.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 20; p.h -= 8; p.r += 12; p.addFlag('civil_war_lived'); p.addFlag('traumatized_by_violence'); p.setMem('kgzOsh', true)
    },
  },

  {
    id: 'ca_kgz_poverty_texture',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Kyrgyzstan' &&
      G.currentYear >= 1991 && G.currentYear <= 2005 &&
      G.age >= 6 && G.age <= 14,
    text: 'Kyrgyzstan\'s Soviet subsidy disappeared overnight. The factory where your father worked has been closed for two years. The heating in the apartment block works for a few hours each day. In winter, you sleep in your coat. Your mother has found work as a *bazarchik* — selling from a table at the Osh market. You help on weekends. The customers are also people who used to have different jobs.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 4; p.e += 4; p.addFlag('survived_soviet_collapse'); p.setMem('kgzPoverty', true) },
  },

  // ── TAJIKISTAN: CIVIL WAR (1992–1997) ────────────────────────────────────────

  {
    id: 'ca_taj_civil_war_outbreak',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Tajikistan' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 5 &&
      !G.mem?.tajCivilWar,
    text: 'Independence lasted less than a year before the shooting started. The conflict has names — government forces, Islamic Renaissance Party, regional militias — but on the ground it arrives as: which road is closed today, who is on it, whether your family name sounds like the wrong side to whoever is at the checkpoint. Dushanbe changes hands twice. You do not know where it is safe to say you are from.',
    choices: null,
    effect: (p) => { p.m -= 18; p.h -= 8; p.r += 10; p.addFlag('civil_war_lived'); p.addFlag('conflict_zone_childhood'); p.setMem('tajCivilWar', true) },
  },

  {
    id: 'ca_taj_civil_war_refugee',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Tajikistan' &&
      G.currentYear >= 1992 && G.currentYear <= 1997 &&
      G.flags.has('civil_war_lived') &&
      G.age >= 4 &&
      !G.mem?.tajRefugee,
    text: 'Your family moves to Afghanistan for two years. This sentence, when you say it later in life, produces a particular expression on the faces of people who do not know the history. Afghanistan was safer than Tajikistan in 1993. This was true. You grew up knowing that safety is not a permanent property of places but a temporary condition that can reverse.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setResidency('refugee_status'); p.addFlag('displaced'); p.setMem('tajRefugee', true) },
  },

  {
    id: 'ca_taj_pamiri_identity',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Tajikistan' &&
      (G.character.ethnicity?.id?.includes('pamiri') || false) &&
      G.age >= 13 && G.age <= 18 &&
      !G.mem?.tajPamiri,
    text: 'You are Pamiri, which means you are Ismaili Muslim in a country that is Sunni. You speak Shughni or Wakhi at home — languages that Tajik schools do not teach and that the government has at various points tried to discourage. The Pamir Mountains around Khorog are the most dramatic geography you have ever seen, and you are told regularly that the region where you are from is a burden on the national budget. You carry both the mountains and the evaluation.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 6; p.e += 5; p.addFlag('ethnic_minority_conflict'); p.setMem('tajPamiri', true) },
  },

  {
    id: 'ca_taj_remittance_economy',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Tajikistan' &&
      G.currentYear >= 1998 && G.currentYear <= 2025 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.tajRemittance,
    text: 'A third of the country\'s economy is remittances from men working in Russia. The men come back in winter, changed slightly each time — by the money, by the distance, by whatever Russia did to them. Some don\'t come back. You are considering the calculation yourself: what you could send home vs. what you would leave behind.',
    choices: [
      {
        text: 'Go to Russia — the family needs the money',
        tag: 'emigrated',
        outcome: 'You go. The work is construction or market work or whatever you can get. The money arrives home. Your family\'s life improves. Something in you adjusts to distance.',
        effect: (p) => { p.mo += 4000; p.m -= 8; p.addFlag('emigrated'); p.setMem('tajRemittance', 'went') },
      },
      {
        text: 'Stay — you know what it does to families when the men leave',
        tag: null,
        outcome: 'You stay. The money is less. Your family is intact in the sense of present. You wonder sometimes about the other version.',
        effect: (p) => { p.m += 3; p.karma += 4; p.setMem('tajRemittance', 'stayed') },
      },
    ],
    effect: null,
  },

  // ── TURKMENISTAN: TURKMENBASHI AND ISOLATION ─────────────────────────────────

  {
    id: 'ca_tkm_ruhnama',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Turkmenistan' &&
      G.currentYear >= 2001 && G.currentYear <= 2006 &&
      G.age >= 8 && G.age <= 16,
    text: 'There is a book called the *Ruhnama* — the Book of Soul, written by the President. You study it in school instead of other things. It is required on the university entrance exam. It is required for the driving test. It is required for the civil service exam. The President has had it translated into sixty-seven languages. You know passages by heart. You do not know what they mean.',
    choices: null,
    effect: (p) => { p.e -= 4; p.m -= 6; p.r += 6; p.addFlag('authoritarian_childhood'); p.setMem('tkmRuhnama', true) },
  },

  {
    id: 'ca_tkm_isolation_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkmenistan' &&
      G.currentYear >= 1991 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.tkmIsolation,
    text: 'Turkmenistan has declared itself permanently neutral and has proceeded to mean it in a way that includes not joining most international organisations and not permitting most international media. What you know about the world outside comes through Russian satellite television and whatever relatives report back from trips. The gas under the Karakum desert is some of the largest reserves in the world. The President\'s palace has a revolving gold statue of him on top. None of this wealth has a direct line to your life.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 3; p.r += 5; p.addFlag('learned_silence'); p.setMem('tkmIsolation', true) },
  },

  {
    id: 'ca_tkm_turkmenbashi_dies',
    phase: null,
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Turkmenistan' &&
      G.currentYear >= 2006 && G.currentYear <= 2008 &&
      G.age >= 10 &&
      !G.mem?.tkmNiyazovDied,
    text: 'Saparmurat Niyazov — Turkmenbashi, Father of All Turkmens — is dead. He died in the night, of a heart, which is the way it always ends. You have grown up with his face on every public building and his book in every exam. The new president is named Gurbanguly. He is similar in some ways. The golden statue comes down. Some of the more baroque regulations are quietly lifted. The core structure remains.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('tkmNiyazovDied', true) },
  },

  // ── SHARED CENTRAL ASIA: POST-SOVIET COLLAPSE TEXTURE ────────────────────────

  {
    id: 'ca_post_soviet_transition',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isCA(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1996 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.caPostSoviet,
    text: 'Independence arrived quickly, as these things go. The Soviet bureaucracy dissolved; the new national bureaucracies were built from its parts, by the same people, with the same habits. The enterprises that depended on Moscow orders have no Moscow orders. The ruble is gone; national currencies arrive with no track record. Your father\'s lifetime of pension contributions has been reclassified as history.',
    choices: null,
    effect: (p) => { p.m -= 10; p.mo -= 500; p.addFlag('survived_soviet_collapse'); p.setMem('caPostSoviet', true) },
  },

  {
    id: 'ca_language_policy',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isCA(G) &&
      G.currentYear >= 1991 && G.currentYear <= 2015 &&
      G.age >= 12 && G.age <= 18 &&
      !G.mem?.caLanguagePolicy,
    text: 'The language question is now official. The language of the Soviet era — Russian — is being replaced in official life by the national language: Kazakh, Uzbek, Kyrgyz, Tajik, Turkmen. Your parents\' generation conducted their educated lives largely in Russian. You are meant to conduct yours in a language that was suppressed for seventy years and does not yet have standardised technical vocabulary. You are learning two languages simultaneously and being examined in both.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 4; p.s += 3; p.setMem('caLanguagePolicy', true) },
  },

  {
    id: 'ca_steppe_migrant_city',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isCA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1991 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.caSteppeCity,
    text: 'You have moved from the village — or the farm, or the collective that was a farm — to the city. The city is either Almaty or Tashkent or Bishkek or Dushanbe or Ashgabat, and whichever one it is, it is large and Soviet in its bones and now layered with markets and billboards and the specific chaos of a place that hasn\'t yet decided what it is. You have a cousin here. You sleep on their floor for six weeks. The cousin\'s floor is, in many respects, still better than staying.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 5; p.s += 4; p.addFlag('rural_to_urban'); p.setMem('caSteppeCity', true) },
  },

]

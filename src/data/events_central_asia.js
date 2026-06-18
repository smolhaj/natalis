// BUILD 13 partial — Central Asia
// Kazakhstan (collectivisation, oil boom), Uzbekistan (cotton monoculture, Aral Sea),
// Kyrgyzstan (1991 collapse, Tulip Revolution), post-Soviet Islam.

const IS_CENTRAL_ASIA = (G) => ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'].includes(G.character.country?.name)
const IS_TAJIK = (G) => G.character.country?.name === 'Tajikistan'
const IS_TURKMEN = (G) => G.character.country?.name === 'Turkmenistan'
const IS_KAZAKH = (G) => G.character.country?.name === 'Kazakhstan'
const IS_UZBEK = (G) => G.character.country?.name === 'Uzbekistan'
const IS_KYRGYZ = (G) => G.character.country?.name === 'Kyrgyzstan'

export const CENTRAL_ASIA_EVENTS = [

  {
    id: 'cas_nomad_settlement',
    phase: 'childhood',
    weight: 5,
    when: (G) => IS_KAZAKH(G) && G.currentYear >= 1928 && G.currentYear <= 1936 && G.age >= 6 && G.age <= 14 && !G.mem.casNomad,
    text: 'Officials arrive and say the animals must be collectivised. Your family has measured wealth in horses and sheep and moved with the seasons for generations — the summer pasture, the winter quarter, the routes your father knows by the angle of hills. The official has a ledger. He writes the number of animals. Some animals disappear from the count before he arrives. This is not discussed.',
    choices: [
      {
        text: 'Your family complies. The collective promises a wage.',
        tag: 'complied',
        outcome: 'The wage is smaller than promised and often late. The animals are poorly managed and many die. The pasture is no longer yours to move across.',
        effect: (p) => { p.m -= 15; p.addFlag('collectivised'); p.setMem('casNomad', true) },
      },
      {
        text: 'Your family hides animals and waits.',
        tag: 'resisted',
        outcome: 'The authorities return. The hidden animals are found and the family is labelled bai — exploiter class. The consequences follow.',
        effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('class_enemy_family'); p.setMem('casNomad', true) },
      },
    ],
  },

  {
    id: 'cas_kazakh_famine',
    phase: 'childhood',
    weight: 5,
    when: (G) => IS_KAZAKH(G) && G.currentYear >= 1931 && G.currentYear <= 1933 && G.age >= 4 && !G.mem.casFamine,
    text: 'The Kazakhs call it Asharshylyk — the great hunger. The grain quota is enforced while people are dying. The communal livestock has been slaughtered or collectivised. Your family begins to move — on foot, toward the Chinese border, toward Uzbekistan, anywhere. Not everyone who leaves arrives. One in three Kazakhs will die in these two years. You are not yet a statistic.',
    effect: (p) => { p.m -= 25; p.h -= 15; p.addFlag('famine_survivor'); p.addFlag('asharshylyk_survivor'); p.setMem('casFamine', true) },
  },

  {
    id: 'cas_uzbek_cotton',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_UZBEK(G) && G.currentYear >= 1960 && G.currentYear <= 2000 && G.age >= 8 && G.age <= 14 && !G.mem.casCotton,
    text: 'In September the school closes. Everyone goes to the fields — teachers, students, office workers. The cotton quota is a state obligation and the quota comes before the school term. You pick cotton under a supervisor\'s count. The rows are long. Your hands are quick enough to meet the daily target; some children\'s hands are not. This continues until November, when the harvest is in and school resumes.',
    effect: (p) => { p.m -= 8; p.h -= 4; p.addFlag('forced_harvest'); p.setMem('casCotton', true) },
  },

  {
    id: 'cas_aral_sea',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (IS_UZBEK(G) || IS_KAZAKH(G)) && G.currentYear >= 1970 && G.currentYear <= 2010 && G.age >= 16 && G.age <= 35 && !G.mem.casAral,
    text: 'Your grandfather fished the Aral Sea. The town of Muynak was a port; now it is sixty kilometres from the shoreline and ship hulls rust in the sand where the water was. The cotton irrigation diverted the rivers and the sea has been shrinking since before you were born. You are watching the disappearance of something enormous in slow motion, the way you only notice a change when you have been away and come back.',
    effect: (p) => { p.m -= 10; p.addFlag('aral_sea_witness'); p.setMem('casAral', true) },
  },

  {
    id: 'cas_kyrgyz_1991',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_KYRGYZ(G) && G.currentYear >= 1991 && G.currentYear <= 1995 && G.age >= 18 && !G.mem.casKyrgyz91,
    text: 'Moscow stops sending money in August 1991. The subsidies that paid for the factory, the clinic, the pension, the price of bread — all of it was Moscow\'s money, and Moscow has other problems. You are in Bishkek. Your salary arrives three months late in a currency that has lost most of its value. The factory down the road closes. The workers are not formally fired; they simply stop being paid and eventually stop coming in.',
    choices: [
      {
        text: 'Find another way. Informal work, anything.',
        tag: 'adapted',
        outcome: 'You sell things at the bazaar. Things you have; things you make; things you source. The bazaar is the economy now.',
        effect: (p) => { p.mo -= 2000; p.m -= 12; p.addFlag('post_soviet_adapter'); p.setMem('casKyrgyz91', true) },
      },
      {
        text: 'Wait for the system to stabilise.',
        tag: 'waited',
        outcome: 'Some things stabilise. Some things were the Soviet system and will not come back. The distinction is not clear for several years.',
        effect: (p) => { p.mo -= 3500; p.m -= 18; p.h -= 5; p.setMem('casKyrgyz91', true) },
      },
    ],
  },

  {
    id: 'cas_kazakh_oil_boom',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_KAZAKH(G) && G.currentYear >= 2000 && G.currentYear <= 2015 && G.age >= 30 && !G.mem.casOil,
    text: 'The oil money changes the city. Astana — a new capital built in the steppe, renamed from Akmola, being renamed again for the president — is rising. The architecture is ambitious beyond what the scale of the country suggests. The money is real. So is the absence of the institutions that would normally manage it.',
    choices: [
      {
        text: 'The prosperity is real. Your family\'s life has changed.',
        tag: 'benefited',
        outcome: 'The car, the apartment, the holiday. The prosperity is not evenly distributed but it is widespread enough to feel like a tide.',
        effect: (p) => { p.mo += 15000; p.m += 8; p.addFlag('oil_boom_beneficiary'); p.setMem('casOil', true) },
      },
      {
        text: 'You watch the money go somewhere else.',
        tag: 'bypassed',
        outcome: 'The oil revenue goes into accounts and projects you cannot see. Your city is being built; your neighbourhood is not among the building sites.',
        effect: (p) => { p.m -= 8; p.setMem('casOil', true) },
      },
    ],
  },

  {
    id: 'cas_tulip_revolution',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KYRGYZ(G) && G.currentYear >= 2005 && G.currentYear <= 2006 && G.age >= 18 && !G.mem.casTulip,
    text: 'The results of the parliamentary election are announced. The south of the country does not accept them. Within days the presidential palace is stormed. Akayev flies to Russia. This is the Tulip Revolution — named for a flower, though tulips were not involved. You watch this from wherever you are watching it.',
    choices: [
      {
        text: 'Join the crowd. Something is changing.',
        tag: 'joined',
        outcome: 'Something changes. What changes is: one group of people who had power is replaced by another group of people who want it. This is not nothing. It is also not everything.',
        effect: (p) => { p.m += 8; p.addFlag('political_active'); p.setMem('casTulip', true) },
      },
      {
        text: 'Watch. You have seen promises before.',
        tag: 'watched',
        outcome: 'You were right to be cautious. You were also right that something changed. Both things are true.',
        effect: (p) => { p.m -= 3; p.setMem('casTulip', true) },
      },
    ],
  },

  {
    id: 'cas_post_soviet_islam',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_CENTRAL_ASIA(G) && G.religion?.includes('muslim') && G.currentYear >= 1991 && G.currentYear <= 2010 && G.age >= 16 && !G.mem.casIslam,
    text: 'The mosques that were warehouses are mosques again. For seventy years the Soviet system did not eradicate Islam — it pushed it into the kitchen, into the language, into the things said at funerals. Now it is returning to the public space and there are different ideas about what it should look like when it arrives.',
    choices: [
      {
        text: 'The return feels like recovery. Something was owed.',
        tag: 'recovery',
        outcome: 'You return to the mosque. The practice your grandmother preserved in the kitchen is now practiced openly.',
        effect: (p) => { p.m += 10; p.addFlag('faith_returned'); p.setMem('casIslam', true) },
      },
      {
        text: 'The new form feels different from what was suppressed.',
        tag: 'uncertain',
        outcome: 'The new preacher came from a different country with different ideas. You are not sure this is what was preserved in the kitchen.',
        effect: (p) => { p.m -= 4; p.addFlag('faith_doubt'); p.setMem('casIslam', true) },
      },
    ],
  },

  {
    id: 'cas_uzbek_harvest_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_UZBEK(G) && G.career !== null && G.currentYear >= 2000 && G.currentYear <= 2020 && G.age >= 25 && !G.mem.casHarvestAdult,
    text: 'The school year still stops in September for the cotton harvest. You are a teacher now. In September you take your class to the fields. The ILO has issued reports; the reports are noted and filed. Your students pick cotton with their hands. You count the rows.',
    choices: [
      {
        text: 'Report the situation to a monitoring contact.',
        tag: 'reported',
        outcome: 'The monitoring organisation adds your account to a file for a future report. The harvest continues.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('political_active'); p.setMem('casHarvestAdult', true) },
      },
      {
        text: 'Do what is required. The alternative is not safe.',
        tag: 'complied',
        outcome: 'You count the rows. This is one of the things you carry.',
        effect: (p) => { p.m -= 10; p.addFlag('moral_weight_carried'); p.setMem('casHarvestAdult', true) },
      },
    ],
  },

  {
    id: 'cas_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => IS_CENTRAL_ASIA(G) && G.age >= 65 && !G.mem.casLate,
    text: 'You have lived under Soviet administration, under the chaos of the transition, under a new authoritarian stability. You have watched the Aral Sea disappear. You have watched a city built in the steppe and named after a president. What you call your country, your people, your language, your faith — all have been contested within your lifetime. You hold all of this more lightly than you expected to.',
    effect: (p) => { p.m += 8; p.karma += 5; p.setMem('casLate', true) },
  },

  // ── TAJIKISTAN ───────────────────────────────────────────────────────────────

  {
    id: 'taj_civil_war_1992',
    phase: 'young_adult',
    weight: 5,
    when: (G) => IS_TAJIK(G) && G.currentYear >= 1992 && G.currentYear <= 1997 && G.age >= 16 && !G.mem?.tajCivilWar,
    text: 'The war is between the government — backed by Russia and Uzbekistan — and the United Tajik Opposition: a coalition of Islamists, democrats, and regionalists that should not work but does, briefly, because the enemy is the same. The road from Dushanbe to your village has become a line that changes hands. The word from cousins in the south is that the Kulyabis are moving. The regional militias are the armies now. The state has dissolved into who has a Kalashnikov and who gave it to them.',
    choices: [
      {
        text: 'Join the local self-defense organization',
        tag: 'defended',
        outcome: 'The checkpoint is informal — a log across the road and someone who knows your face. It holds the village, approximately. You do not think about what happens to people who arrive at the checkpoint and have the wrong regional accent.',
        effect: (p) => { p.h -= 5; p.m -= 10; p.karma -= 5; p.addFlag('tajik_civil_war_generation'); p.setMem('tajCivilWar', true); },
      },
      {
        text: 'Leave — Dushanbe or Russia while it is still possible',
        tag: 'fled',
        outcome: 'A hundred thousand people have done the same this month. You are not a statistic to yourself, but the road north is full of people who made the same calculation.',
        effect: (p) => { p.m -= 8; p.addFlag('tajik_civil_war_generation'); p.addFlag('internal_displacement'); p.setMem('tajCivilWar', true); },
      },
    ],
  },

  {
    id: 'taj_russian_departure',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_TAJIK(G) && G.currentYear >= 1992 && G.currentYear <= 1996 && G.age >= 16 && !G.mem?.tajRussians,
    text: 'The Russian and German-Jewish population — engineers, teachers, the doctor who has been at the clinic for twenty years — have been leaving since before the war started. The mathematician from the university who taught topology for three decades catches a flight to Moscow with two suitcases. The clinic is understaffed. The boilers in the factories are attended by people who are learning as they go. The Soviet-era expertise that made this place function at a certain level is on a plane out of Dushanbe, and what replaces it will take a generation to build.',
    choices: null,
    effect: (p) => { p.e -= 3; p.m -= 6; p.addFlag('post_soviet_brain_drain'); p.setMem('tajRussians', true); },
  },

  {
    id: 'taj_peace_1997',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_TAJIK(G) && G.currentYear >= 1997 && G.currentYear <= 2000 && G.age >= 25 && G.flags.some(f => f === 'tajik_civil_war_generation') && !G.mem?.tajPeace,
    text: 'The General Agreement on the Establishment of Peace: the United Tajik Opposition commanders come in from the mountains and the government integrates some of them into the security forces. This is called reconciliation. What it means in practice is that the men who gave orders for certain things are now wearing uniforms and attending functions at the Presidential Palace. Fifty thousand people are dead. You do not say the number out loud.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 8; p.karma += 5; p.addFlag('tajik_peace_generation'); p.setMem('tajPeace', true); },
  },

  {
    id: 'taj_remittance_economy',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_TAJIK(G) && G.currentYear >= 2002 && G.currentYear <= 2020 && G.age >= 25 && !G.mem?.tajRemittance,
    text: 'Your son is in Moscow. Your brother is in Moscow. A third of the adult men in the region are in Moscow. They build apartment blocks there and the money comes back by phone transfer and Western Union. It is thirty to forty percent of the country\'s GDP, this money that arrives from construction sites and markets in Russia. It is also what keeps the wheat flour on the table. The dependency is total and nobody says total.',
    choices: [
      {
        text: 'Your household depends on the remittance directly',
        tag: 'dependent',
        outcome: 'The amount comes every two weeks, usually. When it doesn\'t arrive on time you go through the calculations in your head until it does.',
        effect: (p) => { p.mo += 500; p.m -= 4; p.r += 5; p.addFlag('tajik_remittance_dependent'); p.setMem('tajRemittance', true); },
      },
      {
        text: 'Your household manages independently; others in the family send',
        tag: 'independent',
        outcome: 'You have stayed. Others left. The village is quieter in a specific way — the age distribution has a gap where working men used to be.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('tajik_stayed_home'); p.setMem('tajRemittance', true); },
      },
    ],
  },

  // ── TURKMENISTAN ─────────────────────────────────────────────────────────────

  {
    id: 'tkm_niyazov_cult',
    phase: 'childhood',
    weight: 5,
    when: (G) => IS_TURKMEN(G) && G.currentYear >= 1992 && G.currentYear <= 2006 && G.age >= 6 && G.age <= 18 && !G.mem?.tkmNiyazov,
    text: 'The school day begins with the Ruhnama: the spiritual book written by Saparmurat Niyazov, the president who renamed himself Turkmenbashi — Father of all Turkmen. The month of January is now Turkmenbashi. The month of April is named after his mother. The giant golden statue of him on top of the Neutrality Arch rotates to always face the sun. You know the Ruhnama passages by heart. You know the penalties for not knowing them. You have never discussed what you actually think about any of this.',
    choices: null,
    effect: (p) => { p.e -= 3; p.m -= 8; p.addFlag('turkmenbashi_generation'); p.setMem('tkmNiyazov', true); },
  },

  {
    id: 'tkm_gas_wealth_invisible',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_TURKMEN(G) && G.currentYear >= 1995 && G.currentYear <= 2020 && G.age >= 18 && !G.mem?.tkmGas,
    text: 'Turkmenistan is the fourth largest natural gas reserves in the world. The gas wealth builds the white marble capital and the president\'s palace and the fountains in the desert. The subsidies mean energy is nearly free. The food subsidies mean the state keeps prices low. What the state does not build is an independent press, an independent judiciary, an independent anything. You know roughly what your country is worth in the ground. The correlation between that number and the state of the hospital your family uses is something you have learned not to say out loud.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 6; p.e += 3; p.addFlag('turkmenistan_gas_generation'); p.setMem('tkmGas', true); },
  },

  {
    id: 'tkm_isolation',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_TURKMEN(G) && G.currentYear >= 2000 && G.age >= 25 && !G.mem?.tkmIsolation,
    text: 'To get a passport, you apply, and the application is reviewed. To travel, your travel is reviewed. The state has an electronic register of citizens who are permitted to leave. You are — you believe — on the permitted side of the register. The internet is filtered; the VPNs are banned; the news that arrives is the news the state has decided is appropriate. North Korea is more isolated. Turkmenistan is what second place looks like.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('turkmenistan_closed_world'); p.setMem('tkmIsolation', true); },
  },

]

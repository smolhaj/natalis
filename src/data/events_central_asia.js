// BUILD 13 partial — Central Asia
// Kazakhstan (collectivisation, oil boom), Uzbekistan (cotton monoculture, Aral Sea),
// Kyrgyzstan (1991 collapse, Tulip Revolution), post-Soviet Islam.

const IS_CENTRAL_ASIA = (G) => ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'].includes(G.character.country?.name)
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

]

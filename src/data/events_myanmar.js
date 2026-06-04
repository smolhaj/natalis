// Myanmar character events
// Historical arcs: Ne Win military rule 1962–88, 8888 Uprising (3,000 killed),
// SLORC/SPDC junta, Aung San Suu Kyi house arrest 1989–2010,
// Saffron Revolution 2007, Cyclone Nargis 2008 (140,000 dead, junta blocks aid),
// quasi-civilian transition 2011–21, February 2021 coup.
// Note: Rohingya-specific events are in events_rohingya.js.

export const MYANMAR_EVENTS = [

  {
    id: 'mya_socialist_isolation',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 1962 && G.currentYear <= 1988 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.myaSocialist,
    text: 'Ne Win\'s Burmese Way to Socialism has been in place for years. The economy is nationalised, the foreign companies are gone, the foreign press does not circulate. The country has turned inward in a specific way: the outside world is present as an absence, a category of things that are not available here. At school, the curriculum is what the government has approved. At home, the BBC can sometimes be heard on shortwave, depending on the night and the weather.',
    choices: null,
    effect: (p) => { p.e -= 3; p.r += 4; p.addFlag('myanmar_socialist_generation'); p.setMem('myaSocialist', true) },
  },

  {
    id: 'mya_1988_uprising',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 1988 &&
      G.age >= 14 &&
      !G.mem.mya1988,
    text: 'August 8, 1988. The 8888 Uprising. Students from Rangoon University are in the streets. Then workers. Then monks. Then hundreds of thousands of people across the country, demanding an end to military rule. The numbers are larger than anything in living memory. For a moment the streets are what they might be. On September 18, the military shoots into crowds in Rangoon. Three thousand people die — some say more. The generals announce SLORC: the State Law and Order Restoration Council. Aung San Suu Kyi, who gave her first political speech in August, is placed under house arrest in July 1989.',
    choices: [
      {
        text: 'You were in the streets.',
        tag: null,
        outcome: 'You saw what it looked like when a city moves as one thing. You also saw what happened after. Both are permanent.',
        effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('myanmar_1988_generation'); p.addFlag('myanmar_activist'); p.setMem('mya1988', true) },
      },
      {
        text: 'You watched from a distance, afraid.',
        tag: null,
        outcome: 'The fear was reasonable. The question of what it cost to act reasonably is one you have been asking since.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('myanmar_1988_generation'); p.setMem('mya1988', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mya_slorc_years',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 1990 && G.currentYear <= 2006 &&
      G.age >= 20 &&
      !G.mem.myaSlorc,
    text: 'The NLD won the 1990 elections with 82 percent of the seats. The junta never transferred power. The elected MPs were arrested, exiled, or lived under surveillance. Aung San Suu Kyi is under house arrest. The economy is run by the military\'s cronies. Jade, rubies, teak — the country\'s resources leave through channels that do not appear in official statistics. The International Labour Organisation documents forced labour on construction projects and in conflict zones. You navigate this as the background condition of adulthood.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('myanmar_junta_generation'); p.setMem('myaSlorc', true) },
  },

  {
    id: 'mya_saffron_revolution_2007',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2007 &&
      G.age >= 16 &&
      !G.mem.myaSaffron,
    text: 'September 2007. Tens of thousands of monks in saffron robes march through Rangoon and Mandalay. They are carrying bowls turned upside down — a ritual refusal to accept alms from the military, a religious censure the generals cannot ignore and cannot easily shoot. Crowds join. The junta shuts the internet, cuts the phone lines, and moves against the monasteries at night. Monks are beaten and arrested. Photojournalist Kenji Nagai is shot at point-blank range. The protest is crushed. The world watched it happen in real time on the few video clips that escaped before the lines went down.',
    choices: [
      {
        text: 'You were among the crowd that joined the monks.',
        tag: null,
        outcome: 'You walked with the monks for as long as the march lasted. You carry the image of the upturned bowls and what it meant that they would do that.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('myanmar_saffron_generation'); p.setMem('myaSaffron', true) },
      },
      {
        text: 'You watched from a doorway.',
        tag: null,
        outcome: 'The sight of the monks — thousands of them — moving through the city was the most extraordinary thing you had seen. What followed was ordinary in the worst sense.',
        effect: (p) => { p.m -= 7; p.r += 6; p.addFlag('myanmar_saffron_generation'); p.setMem('myaSaffron', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mya_cyclone_nargis_2008',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2008 &&
      G.age >= 10 &&
      !G.mem.myaNargis,
    text: 'May 2, 2008. Cyclone Nargis makes landfall in the Irrawaddy Delta. The storm surge is five metres. 140,000 people die — most in the Delta, where the land is low and flat and the warning did not reach in time. The international community offers aid. The junta delays and obstructs. Foreign rescue teams are kept out for weeks. The aid that arrives is distributed through military channels. The UN calls it a catastrophe compounded by a political decision. You know what the Delta looked like before. The before and after are not reconcilable.',
    choices: [
      {
        text: 'You are in the Irrawaddy Delta.',
        tag: null,
        outcome: 'The storm surge arrived before the warning did. Afterwards, weeks of waiting for help that came filtered through military priorities.',
        effect: (p) => { p.m -= 20; p.h -= 8; p.r += 12; p.addFlag('myanmar_nargis_generation'); p.setMem('myaNargis', true) },
      },
      {
        text: 'You are elsewhere in Myanmar.',
        tag: null,
        outcome: 'You tried to reach people in the Delta. Some you could not reach. The news that came back took weeks, and was specific in the way you had dreaded.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('myanmar_nargis_generation'); p.setMem('myaNargis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mya_civilian_opening_2011',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 2011 && G.currentYear <= 2015 &&
      G.age >= 20 &&
      !G.mem.myaCivilian,
    text: 'Thein Sein\'s quasi-civilian government begins releasing political prisoners. Aung San Suu Kyi is freed, stands for parliament, wins her seat. Foreign investment arrives. The press censorship eases — for the first time in your adult life the newspaper does not print what the government has approved and nothing else. You are aware that the generals still control the military ministries and twenty-five percent of parliament seats are reserved for the army. The opening is real. The question of how far it goes is the question everyone is asking.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 3; p.addFlag('myanmar_civilian_hope_generation'); p.setMem('myaCivilian', true) },
  },

  {
    id: 'mya_coup_2021',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2021 &&
      G.age >= 16 &&
      !G.mem.myaCoup2021,
    text: 'February 1, 2021. The military arrests Aung San Suu Kyi and President Win Myint before dawn and declares a year-long state of emergency. The NLD won 83 percent of the vote in November. The coup is the military\'s answer to that result. Within days, millions of civil servants, doctors, teachers, railway workers are on strike in the Civil Disobedience Movement — the CDM. The military shoots into crowds. By end of year, the death toll is over a thousand and a guerrilla resistance, the PDF, is fighting in townships and forests. The decade of opening is over.',
    choices: [
      {
        text: 'You join the Civil Disobedience Movement.',
        tag: null,
        outcome: 'The strike means no salary, no career, and the knowledge that your name is now in someone\'s records. You judge it the only thing to do.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('myanmar_coup_2021'); p.addFlag('myanmar_cdm_participant'); p.setMem('myaCoup2021', true) },
      },
      {
        text: 'You stay low and survive.',
        tag: null,
        outcome: 'The calculus is specific: family, dependants, the particular kind of risk your position carries. You know what other people are doing. You have not stopped asking whether you should be doing it.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('myanmar_coup_2021'); p.setMem('myaCoup2021', true) },
      },
    ],
    effect: null,
  },

]

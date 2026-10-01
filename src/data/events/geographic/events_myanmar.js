// Myanmar character events
// Historical arcs: Ne Win military rule 1962–88, 8888 Uprising (3,000 killed),
// SLORC/SPDC junta, Aung San Suu Kyi house arrest 1989–2010,
// Saffron Revolution 2007, Cyclone Nargis 2008 (140,000 dead, junta blocks aid),
// quasi-civilian transition 2011–21, February 2021 coup.
// Note: Rohingya-specific events are in events_rohingya.js.

export const MYANMAR_EVENTS = [

  {
    id: 'mya_socialist_isolation',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 1962 && G.currentYear <= 1988 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.myaSocialist,
    text: 'Ne Win\'s Burmese Way to Socialism has been in place for years. The economy is nationalised, the foreign companies are gone, the foreign press does not circulate. The country has turned inward in a way: the outside world is present as an absence, a category of things that are not available here. At school, the curriculum is what the government has approved. At home, the BBC can sometimes be heard on shortwave, depending on the night and the weather.',
    choices: null,
    effect: (p) => { p.e -= 3; p.r += 4; p.addFlag('myanmar_socialist_generation'); p.setMem('myaSocialist', true) },
  },

  {
    id: 'mya_1988_uprising',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 1988 &&
      G.age >= 14 &&
      !G.mem.mya1988,
    text: 'It starts with the students and by the eighth of August it is the dockers and the clerks and the monks in a column that takes forty minutes to pass. For six weeks the street belongs to whoever is standing in it. On the eighteenth of September the soldiers fire into Sule Pagoda Road and keep firing. The generals give themselves a new name in English and a woman who made her first speech in August is put inside her house on University Avenue.',
    context: 'The 8888 Uprising began with Rangoon student protests in March 1988 and became a nationwide general strike by 8 August. The military fired on crowds and seized power on 18 September as the State Law and Order Restoration Council; estimates of the dead run to 3,000 or more. Aung San Suu Kyi addressed a crowd at the Shwedagon Pagoda in August 1988 and was placed under house arrest in July 1989.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 1990 && G.currentYear <= 2006 &&
      G.age >= 20 &&
      !G.mem.myaSlorc,
    text: 'The NLD won the 1990 election by a landslide and the generals never handed over. The elected members were arrested or went abroad or live under watch, and Aung San Suu Kyi is under house arrest. The generals\' friends run the economy; the jade and rubies and teak leave by channels no statistic records, and forced labour builds the roads. This is the background condition of your adult life.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('myanmar_junta_generation'); p.setMem('myaSlorc', true) },
  },

  {
    id: 'mya_saffron_revolution_2007',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2007 &&
      G.age >= 16 &&
      !G.mem.myaSaffron,
    text: 'September 2007, and tens of thousands of monks walk through Rangoon and Mandalay with their alms bowls turned upside down, refusing the generals\' offerings, a censure the junta can neither ignore nor easily shoot. Crowds join them. Then the internet goes off and the phones are cut, and the soldiers go into the monasteries at night. A Japanese photographer is shot at point-blank range in the street. The few clips that got out before the lines went dead are how the world watched.',
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
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2008 &&
      G.age >= 10 &&
      !G.mem.myaNargis,
    text: 'Nargis comes ashore in the Delta with a wall of water five metres high, where the land is low and flat and the warning never reached. The world offers help and the generals keep the foreign rescue teams out for weeks; what aid arrives goes through the army. You knew what the Delta looked like before. The before and after do not fit together.',
    context: 'Cyclone Nargis made landfall on 2 May 2008. About 140,000 people died, most in the Irrawaddy Delta. The junta delayed foreign aid for weeks.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear >= 2011 && G.currentYear <= 2015 &&
      G.age >= 20 &&
      !G.mem.myaCivilian,
    text: 'Thein Sein\'s quasi-civilian government begins releasing political prisoners. Aung San Suu Kyi is freed, stands for parliament, wins her seat. Foreign investment arrives. The press censorship eases — for the first time in your adult life the newspaper does not print what the government has approved and nothing else. You are aware that the generals still control the military ministries and twenty-five percent of parliament seats are reserved for the army. The question of how far it goes is the question everyone is asking.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 3; p.addFlag('myanmar_civilian_hope_generation'); p.setMem('myaCivilian', true) },
  },

  {
    id: 'mya_coup_2021',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Myanmar' &&
      G.currentYear === 2021 &&
      G.age >= 16 &&
      !G.mem.myaCoup2021,
    text: 'February 1, 2021. Before dawn the army arrests Aung San Suu Kyi and the president, three months after the NLD won the election by a landslide. Within days doctors, teachers, railway workers and civil servants walk out in their millions, and the army shoots into the crowds. By the end of the year a guerrilla resistance is fighting in the townships and the forests. The decade of opening is over.',
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
        outcome: 'The calculus is specific: family, dependants, the kind of risk your position carries. You know what other people are doing. You have not stopped asking whether you should be doing it.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('myanmar_coup_2021'); p.setMem('myaCoup2021', true) },
      },
    ],
    effect: null,
  },

]

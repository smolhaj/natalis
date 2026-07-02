// Laos depth arc events
// Covers: monarchy fall 1975, re-education seminar camps, scholarship generation,
// Vientiane capital texture, That Luang festival, Sombath Somphone disappearance 2012,
// Mekong river childhood, Hmong forced repatriation from Thailand 2009

const IS_LAOTIAN = (G) => G.character.country?.name === 'Laos'

export const LAOS_DEPTH_EVENTS = [

  {
    id: 'laos_dep_monarchy',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 14 &&
      !G.flags.has('laos_monarchy_fallen'),
    text: 'In December 1975 the Lao People\'s Democratic Republic was proclaimed and the monarchy ended. King Savang Vatthana abdicated and was sent to a re-education camp in Viengxai, in the north, from which he never returned. The photograph in the classroom that had been the king\'s photograph was replaced by a different photograph. The new photograph was of the party leadership. You were young enough that you absorbed this as the natural order — the photograph in the school is whoever the photograph in the school is. It was only later that you understood what replaced what.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.addFlag('laos_monarchy_fallen') },
  },

  {
    id: 'laos_dep_seminar_camps',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.currentYear >= 1978 &&
      G.age >= 28 &&
      !G.flags.has('laos_seminar_camp_kin'),
    text: 'After 1975 the Pathet Lao sent thousands to "seminars" — samana in Lao, the word for a conference, a meeting, a course of instruction. Former Royal Lao Government officers, civil servants, schoolteachers, monks who had connections to the old order were told to attend a seminar in the north. The seminars were camps in Viengxai, in Phong Saly, in remote provinces. Some people came back in two years. Some in five. Your father attended a seminar. He came back changed in a way that took another five years to understand and then settled as the version of him you knew afterward.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('laos_seminar_camp_kin') },
  },

  {
    id: 'laos_dep_scholarship',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.currentYear >= 1976 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 28 &&
      (G.stats?.smarts >= 55 || G.stats?.e >= 55) &&
      !G.flags.has('laos_scholarship_generation'),
    text: (G) => {
      const yr = G.currentYear
      const destination = yr <= 1990
        ? 'the Soviet Union or Vietnam or Cuba — the countries the new government had agreements with'
        : 'Vietnam or Thailand or, for the well-connected, France'
      return `The scholarship. Your marks in school were good enough and the recommendation letter came from the right person and you were selected to study in ${destination}. You packed a single bag and spent the first three months not understanding the lectures fully and then understanding them and then understanding them better than your classmates who had grown up there. You learned what your country looked like from outside. The scholarship generation — the ones who went abroad on government scholarships and came back — brought back technical knowledge and, quietly, a specific relationship to comparison.`
    },
    choices: null,
    effect: (p) => { p.e += 5; p.m += 2; p.addFlag('laos_scholarship_generation') },
  },

  {
    id: 'laos_dep_vientiane',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.has('laos_vientiane_generation'),
    text: 'Vientiane is the quietest capital city in Southeast Asia. The French colonial buildings on the boulevard along the Mekong. The That Luang stupa visible at the end of the road. The pace of the afternoon that slows further in the heat and does not return to speed until evening. The NGO vehicles and the Chinese construction crews and the monks in orange and the schoolchildren on bicycles occupy the same streets without any of them quite registering the others. The Mekong at sunset: the sandbanks, the boats, the Thai shore in the last light. You have lived in this city long enough to stop seeing it the way visitors see it and begin seeing it as the background of your life, which is the same thing as loving it without noticing.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.addFlag('laos_vientiane_generation') },
  },

  {
    id: 'laos_dep_that_luang',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.religion === 'buddhist' &&
      G.age >= 12 && G.age <= 17 &&
      !G.flags.has('laos_that_luang_generation'),
    text: 'The Boun That Luang festival in November: the golden stupa that is the national symbol, that appears on the national seal, that Fa Ngum brought Buddhism through in the fourteenth century. The monks circle the stupa three times at dawn. The political speeches come afterward — the party officials under the flag alongside the Buddhist ceremony. You are old enough to see that the ceremony has two layers: the one that belongs to eight hundred years of religious practice and the one that was added in 1975. The layers do not cancel each other. The monks circle the stupa regardless. The candles go up regardless. This is the specific texture of a country that had a revolution and also had Buddhism before it.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 2; p.addFlag('laos_that_luang_generation') },
  },

  {
    id: 'laos_dep_sombath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.currentYear >= 2013 &&
      G.age >= 25 &&
      !G.flags.has('laos_sombath_era'),
    text: 'On the night of 15 December 2012, Sombath Somphone stopped at a police checkpoint on the outskirts of Vientiane. The checkpoint CCTV captured what happened: he was taken from his car. Other vehicles arrived. He was put in a different vehicle and driven away. He has not been seen since. Sombath was Laos\'s most prominent civil society leader — the recipient of the Ramon Magsaysay Award, known for rural development and youth work. The government said it was investigating. It has been investigating since 2012. In Laos you do not say publicly what you believe happened. You know what you believe happened. The CCTV footage exists.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 5; p.addFlag('laos_sombath_era') },
  },

  {
    id: 'laos_dep_river_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.age >= 7 && G.age <= 13 &&
      !G.flags.has('laos_river_generation'),
    text: 'The Mekong\'s calendar was your calendar: the wet season when the river rose and the low ground flooded and the fish came in great numbers into the shallow water; the dry season when the sandbanks appeared in midstream and you could walk to places that were river in October. The fish traps your father set in the tributary. The pirogue that was kept on the bank and required bailing before it could be used and leaked anyway at speed. The river was the road and the food supply and the boundary and the thing you took for granted the way children take for granted the specific geography that constitutes their world.',
    choices: null,
    effect: (p) => { p.m += 3; p.h += 2; p.addFlag('laos_river_generation') },
  },

  {
    id: 'laos_dep_hmong_return',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_LAOTIAN(G) &&
      G.ethnicity === 'hmong' &&
      G.currentYear >= 2009 &&
      G.age >= 25 &&
      !G.flags.has('laos_hmong_return_era'),
    text: 'In December 2009 the Thai government forcibly repatriated 4,600 Hmong from the Huay Nam Khao camp in Phetchabun province. They had been there for years — some for decades — in conditions that the UN High Commissioner documented and that the Thai government classified as a domestic security matter. They were returned to Laos on buses under UNHCR observation that the UNHCR later acknowledged had been inadequate. Some were absorbed into resettlement villages in the north. Some were resettled elsewhere. The guarantees of safety were given and the ability to verify them was limited. You know the families who came back. You know the specific quality of their silence about where they had been and what had happened.',
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 6; p.addFlag('laos_hmong_return_era') },
  },

]

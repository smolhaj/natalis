// Namibia depth arc events
// Covers: SWANLA contract labor, SWAPO exile generation, Katutura 1959 massacre,
// SADF border war conscription, Walvis Bay fishing industry, independence 1990,
// post-independence land redistribution wait, German descent community texture

const IS_NAMIBIAN = (G) => G.character.country?.name === 'Namibia'

export const NAMIBIA_DEPTH_EVENTS = [

  {
    id: 'nam_dep_swanla',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.ethnicity !== 'white_namibian' &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.has('nam_swanla_generation'),
    text: 'You put your thumb on the form at the labour office and eighteen months later you put it on another one. The lorry takes you to Tsumeb and there is a man on the compound gate and you cannot go out of it without a paper. Your wife cannot come; the contract says so in a line the clerk reads too quickly to follow. The store inside sells at compound prices and the wage was set with that in mind. At the end of the eighteen months you sign again.',
    context: 'The South West Africa Native Labour Association, established in 1943, held a monopoly on recruiting African contract labour for Namibia\'s mines and farms. Workers signed for twelve to eighteen months, were graded by physical examination, housed in single-sex compounds and forbidden to bring families or change employer. The system was a central grievance of the 1971-72 general strike that involved some 20,000 contract workers.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 4; p.e += 2; p.addFlag('nam_swanla_generation') },
  },

  {
    id: 'nam_dep_exile',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.currentYear >= 1966 && G.currentYear <= 1989 &&
      G.age >= 18 && G.age <= 30 &&
      G.ethnicity !== 'white_namibian' &&
      !G.flags.has('nam_swapo_exile_generation'),
    text: (G) => {
      const yr = G.currentYear
      const detail = yr <= 1975
        ? 'The route goes north — across the Caprivi into Botswana and then Zambia. The SWAPO camp at Kongwa, in Tanzania. You train with Soviet instructors and Cubans who speak through interpreters. The long argument about how and when and whether the armed struggle will produce independence runs through the camp like a competing temperature.'
        : 'The route goes north — across the Caprivi or into Angola, where SWAPO has camps near the Angolan border. The Tobias Hainyeko camp. You are training for a war and also waiting for a war and the distance between Lusaka and Windhoek is not geographical.'
      return `${detail} You left Namibia because the alternative was the SADF or silence or prison. The years in exile accumulate their own texture: the longing for a place you are fighting for and cannot return to, the SWAPO organization that is also a hierarchy with its own politics, the people who went into Lubango and did not come back. The liberation movement is also an organization with human failings.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('nam_swapo_exile_generation') },
  },

  {
    id: 'nam_dep_katutura',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.ethnicity !== 'white_namibian' &&
      G.age >= 7 && G.age <= 14 &&
      !G.flags.has('nam_katutura_generation'),
    text: (G) => {
      const yr = G.currentYear
      const context = yr <= 1980
        ? 'In 1959 the South African administration moved the Black population of the Old Location into a new township outside Windhoek. When residents protested, police opened fire. Eleven people died. The township was named Katutura — in Herero, "the place we do not want to be." The name stuck the way the place stuck: as the default.'
        : 'Katutura was built to keep the Black population of Windhoek outside Windhoek. The apartheid logic of it was dismantled after independence but the geography of it was not. The township that was "the place we do not want to be" became the city\'s largest neighborhood and the one with the least infrastructure.'
      return `${context} You grew up here. The shebeen on the corner. The unpaved road that floods in the rainy season. The community that exists because people make a community out of what they have, which in Katutura was each other and ingenuity and the social knowledge of surviving a system built to extract labor and contain its suppliers.`
    },
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.r += 3; p.addFlag('nam_katutura_generation') },
  },

  {
    id: 'nam_dep_border_war',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.ethnicity === 'white_namibian' &&
      G.currentYear >= 1970 && G.currentYear <= 1989 &&
      G.age >= 18 && G.age <= 25 &&
      !G.flags.has('nam_border_war_generation'),
    text: 'They call you up at eighteen and you are north of the Cutline before the year turns. The bush at night has a sound you learn to sort into three kinds: wind, animal, man. The briefing says SWAPO and does not mention that SWAPO is also the surname of a boy who worked on your father\'s farm and went north instead of waiting. Some of the men in the trench have thought about this and some have been careful not to. You are nineteen and you are both.',
    context: 'South Africa administered South West Africa and conscripted its white male residents into the SADF. The Border War (1966-1989) was fought against SWAPO\'s People\'s Liberation Army of Namibia across the north of the territory and into southern Angola, including Operation Savannah in 1975 and Operation Protea in 1981. Namibia became independent in 1990 with SWAPO as its governing party.',
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 6; p.e += 2; p.addFlag('nam_border_war_generation') },
  },

  {
    id: 'nam_dep_walvis_bay',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.currentYear >= 1990 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.has('nam_walvis_generation'),
    text: 'The cold Benguela Current makes the sea off Walvis Bay one of the richest fishing grounds in the world: pilchard, hake, horse mackerel, rock lobster. The quotas were meant to give Namibians who had been kept out of it a share. Some quota-holders sell their share to Spanish and Chinese trawlers without setting foot on a boat. You know which way the fish money goes. The harbour smells the same whoever owns the quota.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.addFlag('nam_walvis_generation') },
  },

  {
    id: 'nam_dep_independence_1990',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1993 &&
      G.age >= 14 && G.age <= 35 &&
      !G.flags.has('nam_independence_1990_generation'),
    text: 'March 21, 1990, the stadium in Windhoek, and Nujoma raises the flag. After a century of German rule and South African rule and apartheid and twenty-four years of war, independence. The crowd is the people who stayed, the people who went north and came back, the people who buried children on both sides of the line. Mandela is in the stadium, a few weeks out of prison. Whatever the country becomes, you were there when Namibia became the name of a country that governs itself.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 2; p.addFlag('nam_independence_1990_generation') },
  },

  {
    id: 'nam_dep_land_wait',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.currentYear >= 2000 &&
      G.ethnicity !== 'white_namibian' &&
      G.flags.has('nam_communal_land_lived') &&
      G.age >= 30 &&
      !G.flags.has('nam_land_wait_generation'),
    text: 'You put your name on the resettlement list. The commercial farms are still mostly the white-owned land taken in the colonial years, and the state buys them back only from willing sellers at market price, which means the market sets the price of undoing the theft, and the treasury decides how fast. You are on the list. The list is long.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 4; p.addFlag('nam_land_wait_generation') },
  },

  {
    id: 'nam_dep_german_community',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NAMIBIAN(G) &&
      G.ethnicity === 'white_namibian' &&
      G.age >= 8 && G.age <= 16 &&
      !G.flags.has('nam_german_descent_generation'),
    text: (G) => {
      const yr = G.currentYear
      const context = yr <= 1990
        ? 'The Evangelical Lutheran church in Swakopmund has services in German. The Rhenish Mission building. The brewery. The German school. Your family has been here for three or four generations — descended from settlers who came before the Vernichtungsbefehl and who stayed after, who were here for German South West Africa and South West Africa and Namibia, accumulating a relationship to the place that is not colonizer and not indigenous and has no simple name.'
        : 'Your great-grandparents came in the 1900s; you were born in independent Namibia. Oktoberfest in Swakopmund, the Brauhaus, the German service at church; you speak Afrikaans and Oshiwambo as well as German. It is a real identity and a complicated one. The genocide of the Herero was carried out by the government of the country your family came from. Whether that is your inheritance or your history or neither depends on the conversation and who is in it.'
      return context
    },
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.addFlag('nam_german_descent_generation') },
  },

]

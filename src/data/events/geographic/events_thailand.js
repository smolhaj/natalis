// Thailand character events
// Historical arcs: uncolonized national identity, lèse-majesté Article 112,
// Red Shirt/Yellow Shirt political crisis 2006–14, military coups (2006, 2014),
// 1997 Asian Financial Crisis trigger, Thai middle-income economy.
// Thailand is the only mainland Southeast Asian country to avoid colonization.

export const THAILAND_EVENTS = [

  {
    id: 'tha_uncolonized_pride',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.thaUncolonized,
    text: 'The history lesson: Thailand — then Siam — is the only country in mainland Southeast Asia that was never colonized. The French took Indochina; the British took Burma and Malaya. Siam played them against each other, ceded some territory, and preserved its sovereignty. The king in the lesson is wise, the diplomacy is heroic, the survival is a source of pride that runs through the national curriculum. You absorb this as fact. You will understand later what it leaves out — the ceded territories, the tributary arrangements, the form that "independence" took.',
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('thai_uncolonized_identity'); p.setMem('thaUncolonized', true) },
  },

  {
    id: 'tha_lese_majeste',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 1976 &&
      G.age >= 18 &&
      !G.mem.thaLeseMajeste,
    text: 'Article 112 of the Criminal Code: insulting, defaming, or threatening the king, queen, heir apparent, or regent carries a penalty of three to fifteen years per count. The counts accumulate: criticise a royal speech, share a critical article, write something online — each can be a separate count. You know of cases where this added to decades. The law shapes not what you say but how you think before you speak, the pause before the opinion, the specific texture of self-censorship in a country where the law does not require you to actually insult anyone — only to be accused of it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('thai_lese_majeste_awareness'); p.setMem('thaLeseMajeste', true) },
  },

  {
    id: 'tha_1997_baht_crisis',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear === 1997 &&
      G.age >= 18 &&
      !G.mem.tha1997,
    text: 'July 2, 1997. The Thai government floats the baht after running out of foreign reserves defending the peg. The baht falls forty percent in months. The crisis that begins in Thailand spreads to Indonesia, South Korea, Malaysia, the Philippines — the whole Asian Tiger economy in contagion. In Thailand, companies go bankrupt overnight. The construction cranes stop. The new apartments nobody can afford to buy now cannot be sold even cheaper. The IMF arrives with conditions. You are living inside the year that the phrase "Asian contagion" is being coined.',
    choices: [
      {
        text: 'The crisis costs you your job or your family\'s business.',
        tag: null,
        outcome: 'The baht number, the layoff notice, the conversation about what to sell — these are the specific details of a macroeconomic event as it arrives in your life.',
        effect: (p) => { p.m -= 16; p.mo -= Math.floor((p.mo ?? 0) * 0.35); p.r += 8; p.addFlag('thai_1997_generation'); p.setMem('tha1997', true) },
      },
      {
        text: 'You come through it, with difficulty.',
        tag: null,
        outcome: 'You watched what it did to people around you while managing what it did to you. The management was its own full-time occupation for two years.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('thai_1997_generation'); p.setMem('tha1997', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tha_red_yellow_conflict',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2006 && G.currentYear <= 2014 &&
      G.age >= 20 &&
      !G.mem.thaRedYellow,
    text: 'The Red Shirts are Thaksin Shinawatra\'s supporters — the rural north and northeast, the poor, the people who felt visible under his government. The Yellow Shirts are the urban middle class, the royalist establishment, the people who believed Thaksin was corrupt enough to be worth a coup. In 2010 the Red Shirt occupation of central Bangkok ends with ninety dead and the commercial district burning. The two sides have not only different politics but different versions of what Thailand is for and who it belongs to.',
    choices: [
      {
        text: 'You are Red — you remember what Thaksin\'s policies meant for rural Thailand.',
        tag: null,
        outcome: 'Universal healthcare. Village funds. You know what the policy was. The coup undid it. You know that too.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('thai_red_generation'); p.setMem('thaRedYellow', true) },
      },
      {
        text: 'You are Yellow — the corruption was real, the democratic form was not sufficient.',
        tag: null,
        outcome: 'Thaksin\'s businesses, his party, his sister as prime minister. You believed the form of democracy was being used to solidify a different kind of power. You still believe this.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('thai_yellow_generation'); p.setMem('thaRedYellow', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tha_coup_generation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      (G.currentYear === 2006 || G.currentYear === 2014) &&
      G.age >= 20 &&
      !G.mem.thaCoup,
    text: 'The tanks are in the streets of Bangkok again. Thailand has had more coups than almost any country in the world — thirteen since 1932, depending on how you count. The military\'s relationship to democracy here is specific: elections occur, governments win, then the military or the courts undo the result if the result is inconvenient. The coup is peaceful. There is no fighting. The curfew is temporary. The generals appear on television and explain that this is necessary for national stability. You have heard this before.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('thai_coup_generation'); p.setMem('thaCoup', true) },
  },

  {
    id: 'tha_economic_middle_income',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 28 &&
      !G.mem.thaMiddleIncome,
    text: 'Thailand has been called a middle-income country for thirty years. The manufacturing export economy — textiles, electronics, cars — produced a working class and a lower-middle class in the 1980s and 1990s. The tourism economy built another layer on top. You are in the class that exists because of the factories and the hotels and the service sector, the class that the economists call the Thai middle, and you are watching the cities grow and the countryside stay where it was and wondering when the next step happens.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.addFlag('thai_middle_income_generation'); p.setMem('thaMiddleIncome', true) },
  },

  // ── OCTOBER 1976: THAMMASAT MASSACRE ──────────────────────────────────────

  {
    id: 'tha_thammasat_1976',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear === 1976 &&
      G.age >= 16 &&
      !G.mem.thaThammasat1976,
    text: 'October 6, 1976. Rightwing paramilitary groups — the Red Gaurs, the Village Scouts — attack students gathered at Thammasat University in Bangkok. The students were protesting the return of the former military dictator. Students are beaten to death, hanged from trees, dragged through the streets. Photographs circulate. The official count is forty-six dead. Survivors say higher. Hundreds of students flee to the jungle and join the Communist Party of Thailand — not from conviction but because there is nowhere else safe to go. Three years earlier the same campus had the democratic uprising. You are watching the country undo what it briefly became.',
    choices: [
      {
        text: 'You are in Bangkok, near the campus.',
        tag: null,
        outcome: 'The photographs are in the newspaper and not in the newspaper simultaneously — the new military government controls what is printed. You have seen what the photographs show. You do not speak of it in most rooms.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.r += 10; p.addFlag('thai_76_generation'); p.addFlag('traumatized_by_violence'); p.setMem('thaThammasat1976', true) },
      },
      {
        text: 'You are outside Bangkok, and the news reaches you slowly.',
        tag: null,
        outcome: 'The radio version is brief. What you piece together comes from people who knew people who were there. The picture assembles over weeks. It is still not complete.',
        effect: (p) => { p.m -= 12; p.r += 7; p.addFlag('thai_76_generation'); p.setMem('thaThammasat1976', true) },
      },
    ],
    effect: null,
  },

  // ── HILL TRIBE STATELESSNESS ───────────────────────────────────────────────

  {
    id: 'tha_hilltribe_stateless',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      (G.character.ethnicity?.id === 'karen' || G.character.ethnicity?.id === 'hmong' || G.character.ethnicity?.id === 'akha' || G.character.ethnicity?.id === 'thai_hilltribe') &&
      G.currentYear >= 1975 && G.currentYear <= 2015 &&
      G.age >= 12 && G.age <= 18 &&
      !G.mem.thaHilltribeStateless,
    text: 'Your family has lived in these mountains since before the roads existed. The Thai state drew its borders across land that was never administered by Bangkok. Without a birth certificate registered in the right district, you do not have Thai citizenship — and without citizenship, there is no national ID, no right to travel freely within the country, no access to university scholarships, no legal employment outside the informal sector. Your parents crossed a border that did not exist when their parents crossed it. The state sees them as illegal migrants. You were born here. The state sees you the same way.',
    choices: [
      {
        text: 'You pursue the citizenship documents — years of bureaucracy.',
        tag: null,
        outcome: 'The process requires proof of residence, a Thai sponsor, months of form submission and rejection and resubmission. Some people succeed. The waiting takes years you do not have for other things.',
        effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('thai_hilltribe_stateless'); p.setMem('thaHilltribeStateless', true) },
      },
      {
        text: 'You work within what you can access — the informal economy, the village.',
        tag: null,
        outcome: 'The village has its own economy, its own authority. The formal world is not fully available to you. You learn which boundaries matter and which do not, inside the world you actually inhabit.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('thai_hilltribe_stateless'); p.setMem('thaHilltribeStateless', true) },
      },
    ],
    effect: null,
  },

  // ── BOOM YEARS 1985–96 ─────────────────────────────────────────────────────

  {
    id: 'tha_boom_years',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 1987 && G.currentYear <= 1996 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.thaBooms,
    text: 'Nine percent growth for a decade. The factories in Samut Prakan need workers from the rice paddies of Isan. The construction sites in Bangkok need workers from everywhere. The banks are lending at multiples they have not tried before. A cousin who came to the city two years ago has a motorbike and is talking about an apartment. The country is moving so quickly that the map you made of who lives how is already wrong. You are in the movement or you are watching the movement from somewhere it has not yet arrived.',
    choices: [
      {
        text: 'You came to the city and it absorbed you and paid you.',
        tag: null,
        outcome: 'The city processes you into the factory economy or the service economy or the finance sector depending on your education. The salary is real. The pace is real. Both of them.',
        effect: (p) => { p.w += 8; p.mo += 3000; p.addFlag('thai_boom_generation'); p.setMem('thaBooms', true) },
      },
      {
        text: 'You are in the village watching the money flow toward Bangkok.',
        tag: null,
        outcome: 'The remittances come from your siblings in the city. The village school is better-funded because a factory in Samut Prakan is paying someone\'s wages. The growth is real and distributed unevenly, which is the definition of most growth.',
        effect: (p) => { p.mo += 800; p.r += 4; p.addFlag('thai_boom_generation'); p.setMem('thaBooms', true) },
      },
    ],
    effect: null,
  },

  // ── DEEP SOUTH — PATTANI ──────────────────────────────────────────────────

  {
    id: 'tha_deep_south',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2004 && G.currentYear <= 2023 &&
      G.age >= 14 &&
      !G.mem.thaDeepSouth,
    text: (G) => {
      const isMalay = G.character.ethnicity?.id === 'thai_malay' || G.character.religion === 'muslim_sunni'
      return isMalay
        ? 'Pattani, Yala, Narathiwat: the three southernmost provinces. Malay-speaking, Muslim, historically the Patani Sultanate until Bangkok annexed it in 1902. Since January 4, 2004 — when army weapons depots were raided in Narathiwat — the insurgency has killed more than seven thousand people. Your language is Jawi-inflected Malay, not Thai. Your school teaches Thai. The checkpoint outside the village is staffed by soldiers from Chiang Mai who do not speak Malay and who look at you with a particular expression you have learned to recognize.'
        : 'The deep south of Thailand: Pattani, Yala, Narathiwat. More than seven thousand dead since 2004 — a low-intensity insurgency that receives almost no international coverage. The soldiers stationed there rotate from other regions and few speak Malay; the local population is Malay-speaking Muslim; the schools teach Thai. Teachers have been specifically targeted — killed on the way to work. Some schools have closed. Most Thai people have formed their opinion of the south from a handful of headlines. You know one sentence more than that.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('thai_deep_south_generation'); p.setMem('thaDeepSouth', true) },
  },

  // ── BUDDHIST SANGHA AND STATE ─────────────────────────────────────────────

  {
    id: 'tha_sangha_power',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.religion === 'buddhist' &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem.thaSangha,
    text: 'The temporary ordination: most Thai Buddhist men enter the monkhood for at least one rainy season, traditionally between secondary school and marriage. Three months in orange robes, learning to chant the Pali suttas, living by the vinaya rules of discipline. The abbot of your local temple taught your father, who taught you to show him the same respect. The temple gave the village its first school. The sangha and the state have been folded together since the kings of Sukhothai, and the military governments of the modern era have always had monks bless their coups. You are living inside this institution more than you are practicing it from outside.',
    choices: [
      {
        text: 'You ordain for the season.',
        tag: null,
        outcome: 'The three months are strange: slow in a way civilian life is not. You learn to sit with yourself for longer than you thought was possible. You do not know yet what you carry out of it.',
        effect: (p) => { p.m += 6; p.e += 4; p.addFlag('thai_ordained'); p.setMem('thaSangha', true) },
      },
      {
        text: 'You do not ordain — your family or circumstances make it impossible.',
        tag: null,
        outcome: 'The failure to ordain carries a soft social cost. Nothing said directly. Something noticed.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('thaSangha', true) },
      },
    ],
    effect: null,
  },

  // ── 2020-21 YOUTH PROTESTS ─────────────────────────────────────────────────

  {
    id: 'tha_2020_protests',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.tha2020Protest,
    text: 'The protest movement that begins in 2020 makes three demands: dissolve parliament, stop harassing activists, reform the constitution. Then a fourth demand appears — the one that has never appeared before, the one that sits in the room like an unexploded object: reform the monarchy. The protesters are students, most of them born after the last major political crisis. They make the three-finger Hunger Games salute. They carry rubber ducks as shields against water cannon. Article 112 — lèse-majesté — is activated against hundreds of them after the protests. Prison sentences of fifteen years for a Facebook post. The demand they made in the streets remains, unanswered, in the law books.',
    choices: [
      {
        text: 'You are in the street. The three-finger salute.',
        tag: null,
        outcome: 'You are counted among the people who said the thing aloud. The saying changed something in the air of the country even when the law did not change. You know which of your friends are now facing charges.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.addFlag('thai_2020_generation'); p.addFlag('activist'); p.setMem('tha2020Protest', true) },
      },
      {
        text: 'You support them but do not go out — Article 112.',
        tag: null,
        outcome: 'The calculation about the law is rational. You follow the trials of the people who did go out. The sentences are specific: twelve years, sixteen years, each count stacking. You know you made the right calculation and you know what the right calculation costs.',
        effect: (p) => { p.r += 6; p.addFlag('thai_2020_generation'); p.setMem('tha2020Protest', true) },
      },
    ],
    effect: null,
  },

  // ── COVID: TOURISM COLLAPSE ────────────────────────────────────────────────

  {
    id: 'tha_covid_tourism',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem.thaCovidTourism,
    text: 'Thirty-nine million foreign visitors in 2019. Four hundred thousand in 2021. The hotels in Krabi empty in three days. The longtail boat operators on Ko Phi Phi have no income. The massage shops on Khao San Road — the tuk-tuk drivers, the guesthouse owners, the street food vendors who fed a million tourists a year — are all running the same calculation about how long they can go without a customer. The government support is insufficient. The savings last as long as they last. The informal economy has no floor. You are in the part of Thailand that tourism paid for, and tourism is not here.',
    choices: null,
    effect: (p) => { p.m -= 14; p.wipeMoney(0.4); p.r += 7; p.addFlag('thai_covid_generation'); p.setMem('thaCovidTourism', true) },
  },

  // ── FOLLOW-THROUGHS ───────────────────────────────────────────────────────

  {
    id: 'tha_boom_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.flags.has('thai_boom_generation') &&
      G.age >= 55 &&
      !G.mem.thaBooms_late,
    text: 'The economists have a phrase for what Thailand is: middle-income trap. The wages that made the factories competitive are no longer the lowest; the technology base is not yet the highest. Vietnam is cheaper; South Korea is more advanced. The growth that reshaped everything from 1985 to 1997 and then again in the 2000s has slowed to something quieter. You spent the boom years building something real — a house, a small business, a degree for your children. Whether it was enough depends on which year you are counting from.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('thaBooms_late', true) },
  },

  {
    id: 'tha_ordained_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.flags.has('thai_ordained') &&
      G.age >= 38 &&
      !G.mem.thaOrdainedEcho,
    text: 'The orange robe is in a box somewhere. The three months of chanting and early mornings and the specific silence of the vihara at 4am — you carry it differently at forty than you carried it at twenty. Whether it changed you in the way ordination is supposed to change you is a question you cannot answer directly. What you can say is that you know how to sit still longer than most people, and that this turns out to be useful in ways that have nothing to do with Buddhism.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('thaOrdainedEcho', true) },
  },

  {
    id: 'tha_covid_rebuilding',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.flags.has('thai_covid_generation') &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem.thaCovidRebuilt,
    text: 'The tourists come back. Not all of them, and not to all the same places, and some of the businesses that closed in 2020 are still closed — the owners did something else and did not return to the beach. The Khao San Road guesthouses are full again on high season. The longtail boats run. The rebuild is real, and slower than the promotional campaigns suggest, and the people doing it are not all the same people who did it before.',
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 2000; p.setMem('thaCovidRebuilt', true) },
  },

]

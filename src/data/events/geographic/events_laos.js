// Laos depth arc events
// Covers: UXO from the Secret War, Buddhist alms culture, Hmong persecution,
// LPRP party discipline, Mekong border economy, Chinese debt trap infrastructure,
// Mekong dam reckoning.

const LAOS_EVENTS = [

  {
    id: 'laos_uxo_childhood',
    phase: null,
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Laos' &&
      G.currentYear - G.age >= 1974 &&   // "the war ended before you were born"
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.laos_uxo,
    text: (G) => {
      const yr = G.currentYear
      return `More bombs fell on Laos between 1964 and 1973 than on all of Europe in the Second World War, and many did not go off, and they are still in the ground. Every child in your district knows the rule: do not touch metal in the field, do not pick up anything shaped like a ball, do not dig where nobody has dug. ${yr <= 1995 ? 'The boy from the village three hours north: last year, in a field his family had planted for twenty years.' : 'The clearance teams mark the safe ground with wooden stakes, and you know which ground has stakes.'} The war ended before you were born. What it left has not.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.addFlag('laos_uxo_generation'); p.setMem('laos_uxo', true); },
  },

  {
    id: 'laos_alms_round',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Laos' &&
      G.religion === 'buddhist' &&
      G.age >= 5 && G.age <= 10 &&
      !G.mem?.laos_alms,
    text: 'Before dawn the monks come past in orange robes with their alms bowls. Your mother has already prepared the sticky rice. You kneel at the edge of the mat and receive the blessing with both hands together. Not giving when the monks pass is noticed — by the neighbors, by the monks themselves, by a social fabric that maintains itself through this morning ritual. You grow up with the texture of merit: what you give out of the house at dawn comes back in ways that are not always visible.',
    choices: null,
    effect: (p) => { p.s += 2; p.karma += 3; p.addFlag('laos_alms_generation'); p.setMem('laos_alms', true); },
  },

  {
    id: 'laos_hmong_highland',
    phase: null,
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Laos' &&
      G.ethnicity === 'hmong' &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.laos_hmong,
    text: 'The Hmong fought alongside the CIA in what the Americans called the Secret War — the "Secret Army" of General Vang Pao, fighting the Pathet Lao in the highlands while the world pretended the war was only in Vietnam. When the Pathet Lao won in 1975, the Hmong who had fought became enemies of the new state. Some went to Thailand and then to Minnesota. The ones who stayed — your family — stayed in the highlands under a government that remembered what side the Hmong had been on. You know which topics you do not raise in school. You know why. The knowledge is old family knowledge, passed before you had words for it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.r += 4; p.addFlag('laos_hmong_era'); p.setMem('laos_hmong', true); },
  },

  {
    id: 'laos_party_discipline',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Laos' &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.laos_party,
    text: 'The Lao People\'s Revolutionary Party has governed since 1975. It is not the same as North Korea — people live, trade, make small jokes — but certain things are not said in certain company. Criticism of the party leadership is dangerous in a way: not always, not visibly enforced, but known. You learn the calibration. You know which friends you speak differently with. You know the formula at the mandatory political meetings: say what is expected, in the expected register, and then go home and say what you actually think to the people you trust.',
    choices: [
      {
        text: 'You take the party card and work within the structure.',
        tag: 'inside',
        outcome: 'The card opens the government job, the contract, the recommendation letter. The cost is the calibration — which is the cost everyone pays who wants to build anything here.',
        effect: (p) => { p.w += 4; p.m -= 3; p.addFlag('laos_party_generation'); p.addFlag('regime_self_censorship'); p.setMem('laos_party', true); },
      },
      {
        text: 'You stay outside the party. The private sector, the informal economy.',
        tag: 'outside',
        outcome: 'The informal economy has its own rules. The party\'s reach is softer in the market than in the ministry. The tradeoff is that certain doors are made of a material you cannot open.',
        effect: (p) => { p.m -= 2; p.r += 3; p.addFlag('laos_party_generation'); p.setMem('laos_party', true); },
      },
    ],
  },

  {
    id: 'laos_mekong_economy',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Laos' &&
      G.currentYear >= 1990 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.laos_mekong,
    text: 'Thailand is on the other bank of the Mekong; on a clear day you can see the buildings, and the ferry takes twenty minutes. The electronics, medicine and building materials are cheaper and better there, and people cross for work, for the hospital, for the market. People keep their savings in baht as well as kip. The river is the lifeline and the commute and the thing that makes the country feel bounded and open at once.',
    choices: null,
    effect: (p) => { p.w += 2; p.e += 2; p.addFlag('laos_mekong_generation'); p.setMem('laos_mekong', true); },
  },

  {
    id: 'laos_china_investment',
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Laos' &&
      G.currentYear >= 2015 &&
      G.age >= 25 &&
      !G.mem?.laos_china,
    text: (G) => {
      const yr = G.currentYear
      const project = yr >= 2021
        ? 'The high-speed rail from the Chinese border to Vientiane opened in December 2021. It was built by Chinese workers and financed by Chinese loans that Laos cannot repay. The concessions for the debt include land, ports, and infrastructure that the government manages jointly with Chinese companies — or that Chinese companies now effectively manage. The signs along the rail line are in Chinese and Lao. In the SEZs, the signs are sometimes only in Chinese.'
        : 'Chinese investment is arriving faster than anything Laos has seen. Roads, dams, casinos in the Special Economic Zones where Chinese is the working language. The investment creates work for Chinese workers and debt for the Laotian government. The ratio of benefit to obligation is being discussed by people who have access to the numbers. You do not have access to the numbers.'
      return project
    },
    choices: null,
    effect: (p) => { p.e += 3; p.w += 2; p.addFlag('laos_china_era'); p.setMem('laos_china', true); },
  },

  {
    id: 'laos_mekong_dams',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Laos' &&
      G.currentYear >= 2019 &&
      G.age >= 25 &&
      !G.mem?.laos_dams,
    text: 'There are dams upstream in China and more being built in Laos itself, which sells its electricity to Thailand and calls itself the battery of Southeast Asia. The fishermen have noticed: fewer fish, a lower river in the dry season. In 2018 a dam collapses in the south and the water takes whole villages. The electricity money goes where it goes. The river the fishermen were born on is changing.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.addFlag('laos_dam_generation'); p.setMem('laos_dams', true); },
  },

]

export default LAOS_EVENTS

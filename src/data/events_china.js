// events_china.js — China arc events (all three eras)
//
// Complements events_country_arcs_2.js (land reform, Great Leap, Cultural Revolution
// at the collective level) and worldEvents.js (great_leap_famine, tiananmen_square,
// china_economic_boom, china_special_economic_zones, cultural_revolution_china).
//
// This module adds the personal-level texture missing from those:
//   Mao era:         class enemy family, sent-down youth, rehabilitation
//   Reform era:      gaokao, one-child policy decision, Tiananmen witness/silence,
//                    village-to-city migration, first private economy
//   Contemporary:    left-behind child, only-child weight, social credit awareness,
//                    tech generation, zero-COVID lockdown, lying flat

const isChina = (G) => G.currentCountry?.name === 'China'

export const CHINA_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // MAO ERA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'cn_class_enemy_childhood',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1966 && G.currentYear <= 1974 &&
      !G.mem?.cnClassEnemyFired,
    text: (G) => {
      const parents = Object.values(G.parents ?? {})
      const fatherAlive = parents.some(p => p.gender === 'male' && p.alive !== false)
      if (fatherAlive) return 'The class enemy label arrives at school before you understand what it means. Your father was an engineer — that is the past tense the designation requires. The teacher pauses before saying your name at roll call. The other children have been told not to sit next to you at lunch. You learn to walk to school a different way every day so you do not have to see the slogans they have painted on your building door.'
      return 'Your mother taught university. Past tense now. She has been sent to study sessions every evening for three weeks. She comes home later each night. She no longer talks at dinner about what she is reading. The books have gone from the shelves. You are not sure where. You have learned not to ask where.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('class_enemy_family'); p.setMem('cnClassEnemyFired', true) },
  },

  {
    id: 'cn_sent_down_youth',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1968 && G.currentYear <= 1978 &&
      G.ruralUrban === 'urban' &&
      G.age >= 16 && G.age <= 22 &&
      !G.mem?.cnSentDownFired,
    text: 'The notice comes on a Tuesday. All urban youth are to go to the countryside to be re-educated by the peasants. This is not optional. The person reading it to the assembly does not pause for questions. You have one week to prepare. Your parents stand at the train station until the train is gone. The farm you are assigned to is in a province whose name you have seen on maps but never had reason to think about. That is the place where you will spend the next several years.',
    choices: [
      {
        text: 'Go — survive it, come back changed',
        tag: null,
        outcome: 'The farm work is genuine. The re-education is mostly propaganda. The years are real years in a real place. You come back with a body that knows hard labour and a politics that is now entirely private.',
        effect: (p) => { p.h += 3; p.m -= 12; p.e -= 5; p.addFlag('sent_down_youth'); p.addFlag('sent_down_survived'); p.setMem('cnSentDownFired', true) },
      },
      {
        text: 'Go — but keep reading, keep thinking',
        tag: null,
        outcome: 'You hide books inside political pamphlets. The evenings after the work quota are yours. The years are brutal and do not stop being a strange kind of education.',
        effect: (p) => { p.e += 3; p.m -= 10; p.addFlag('sent_down_youth'); p.addFlag('sent_down_intellectual'); p.setMem('cnSentDownFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_sent_down_return',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isChina(G) &&
      G.flags.has('sent_down_youth') &&
      G.currentYear >= 1975 && G.currentYear <= 1982 &&
      !G.mem?.cnSentDownReturnFired,
    text: 'The policy is reversed. You can return to the city. The city has not waited. Your family has changed. Your place in it has changed. You are in your mid-twenties and your peers who stayed graduated university while you were planting rice in a province you never asked to live in. You have four years of agricultural knowledge and a body that can work and the education you were taken from is still inaccessible. The path back is not straight. You begin looking for the oblique one.',
    choices: null,
    effect: (p) => { p.m += 5; p.e -= 5; p.addFlag('sent_down_returned'); p.setMem('cnSentDownReturnFired', true) },
  },

  {
    id: 'cn_rehabilitation',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isChina(G) &&
      G.flags.has('class_enemy_family') &&
      G.currentYear >= 1977 && G.currentYear <= 1985 &&
      !G.mem?.cnRehabFired,
    text: (G) => {
      const parents = Object.values(G.parents ?? {})
      const deadParent = parents.find(p => p.alive === false)
      if (deadParent) {
        const label = deadParent.gender === 'male' ? 'father' : 'mother'
        return `The rehabilitation certificate arrives for your ${label} and your ${label} is not there to receive it. The paper restores a name that was taken. The person the name belonged to was taken first. You file the document. You do not know what else to do with it.`
      }
      return 'The rehabilitation process uses a word that sounds like restoration. What it is, is a piece of paper saying the designation was incorrect. Your parent frames it on the wall. You watch them do this and you understand that the paper means something to them. You try to feel what it means to them. You mostly succeed.'
    },
    choices: null,
    effect: (p) => { p.m += 6; p.r -= 5; p.addFlag('family_rehabilitated'); p.setMem('cnRehabFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // REFORM ERA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'cn_gaokao',
    phase: 'adolescence',
    weight: 10,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1978 &&
      G.age >= 17 && G.age <= 19 &&
      !G.mem?.cnGaokaoFired,
    text: (G) => {
      const yr = G.currentYear ?? 1990
      if (yr < 1985) return 'The college entrance examination has just reopened after a decade without one. There are seats and there are not enough seats and the exam decides who gets one. You sit for it. The family is at home waiting. The exam does not feel like a beginning and does not feel like an ending. It feels like a mechanism.'
      return 'The gaokao is in June. In June, planes are grounded during the listening component. Police escort late students to test centres. Your mother has been waking at four in the morning to pray for months. The exam hall is silent except for pens. You read the first question. Everything you have been preparing for is inside the next nine hours.'
    },
    choices: [
      {
        text: 'You qualify — the score is enough',
        tag: null,
        outcome: 'The result comes. You qualify. The relief in the house is not celebration — it is something more fundamental. The weight that has been in every room for three years has lifted.',
        effect: (p) => { p.e += 8; p.m += 5; p.addFlag('gaokao_succeeded'); p.setMem('cnGaokaoFired', true) },
      },
      {
        text: 'The score is not enough this year',
        tag: null,
        outcome: 'Not this year. Whether you try again or take the available path, the exam has sorted you into a category. You understand exactly what that means here.',
        effect: (p) => { p.e -= 3; p.m -= 10; p.r += 5; p.addFlag('gaokao_survived'); p.setMem('cnGaokaoFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_one_child_decision',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1980 && G.currentYear < 2015 &&
      (G.children ?? []).length >= 1 &&
      G.partner != null &&
      !G.mem?.cnOneChildFired,
    text: (G) => {
      const isFemale = G.character?.gender === 'female'
      const isUrban = G.ruralUrban === 'urban'
      if (isFemale && isUrban) return 'The family planning officer comes to the work unit. The policy is one child — this is policy and policy is the ceiling. You already have a child. The question being asked, with institutional backing, is whether you have plans for another. The question has an expected answer. Your actual plans are yours to manage inside that context.'
      return 'The one-child policy has been in effect for two years. The enforcement at the work unit is consistent. A colleague was fined three months\' salary for a second birth. The rule is not abstract. You and your partner are having a conversation that exists because of the policy and would not exist otherwise.'
    },
    choices: [
      {
        text: 'One child — within the policy',
        tag: null,
        outcome: 'The choice is made within the structure. Many families make this choice. The only child grows up inside a particular kind of concentrated attention.',
        effect: (p) => { p.m -= 3; p.addFlag('one_child_policy_complied'); p.setMem('cnOneChildFired', true) },
      },
      {
        text: 'You want a second child and will find a way',
        tag: null,
        outcome: 'The second child is born. The fine is paid — it is significant, several months\' salary. The child exists. That is the accounting.',
        effect: (p) => { p.m += 4; p.mo -= 2500; p.addFlag('one_child_policy_resisted'); p.setMem('cnOneChildFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_tiananmen_personal',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isChina(G) &&
      G.currentYear === 1989 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.cnTiananmenPersonalFired,
    text: 'You are in the city when it happens. Not necessarily in Beijing — but in the city, and the news is coming through the television and the radio and the people returning from the square. The students have been there for seven weeks. Then they are not there. The official account says very little. What happened is known in the specific private way things are known in this country — you know, the people around you know, and the knowing goes into a place that is not discussed. The city is very quiet for several days.',
    choices: [
      {
        text: 'You witnessed it from Beijing — you were near the square',
        tag: null,
        outcome: 'The specific images stay. The specific sounds. The silence that follows is different when you were there — it is not only political. It is personal.',
        effect: (p) => { p.m -= 15; p.addFlag('tiananmen_witness'); p.setMem('cnTiananmenPersonalFired', true) },
      },
      {
        text: 'You watched from elsewhere — and then watched the silence close over it',
        tag: null,
        outcome: 'The silence becomes one of the permanent features of your interior life. You carry the date. You do not say the date.',
        effect: (p) => { p.m -= 8; p.addFlag('tiananmen_silence'); p.setMem('cnTiananmenPersonalFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_village_to_city',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 && G.age <= 28 &&
      !G.mem?.cnVillageCityFired,
    text: (G) => {
      const yr = G.currentYear ?? 1993
      const destination = yr < 1995 ? 'Guangdong province' : 'Shenzhen or Dongguan or one of the manufacturing cities'
      return `Everyone from the village who is of working age is on the train. The factory in ${destination} takes workers without asking much. The dormitory is a room with eight bunks. The hours are long. The money is more than you have seen in a month in the village. You send money home every month. Your parents know you are working. You do not tell them specifically what the work is like, because there is no useful purpose in telling them.`
    },
    choices: [
      {
        text: 'Work, save, build here — the city is the future',
        tag: null,
        outcome: 'The years in the factory are hard and the foundation is real. The savings accumulate. You learn the city in the margins of the shift work.',
        effect: (p) => { p.h -= 5; p.mo += 1500; p.addFlag('rural_to_urban'); p.addFlag('migrant_worker_china'); p.setMem('cnVillageCityFired', true) },
      },
      {
        text: 'Work, but stay connected to where you came from',
        tag: null,
        outcome: 'You go back for the harvest and for the festivals. The identity of someone between two places is its own kind of life.',
        effect: (p) => { p.mo += 800; p.m -= 3; p.addFlag('rural_to_urban'); p.addFlag('migrant_worker_china'); p.addFlag('village_connection_kept'); p.setMem('cnVillageCityFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_first_private_business',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2003 &&
      G.stats.smarts >= 50 &&
      G.stats.wealth >= 35 &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem?.cnPrivateBizFired,
    text: 'The rules about private business have been loosening for a decade. A trading company, a small factory making components, a shop on a new commercial strip — the capital required is modest and the opportunity is real in a way it was not for your parents\' generation. Your parents had the work unit. You have the possibility of building something that belongs to you. The possibility is real and contains what possibilities contain.',
    choices: [
      {
        text: 'Start it — this window is what you were waiting for',
        tag: null,
        outcome: 'The first two years are harder than expected. The business survives them. That is the main thing.',
        effect: (p) => { p.mo += 3000; p.h -= 5; p.m += 5; p.addFlag('china_entrepreneur'); p.setMem('cnPrivateBizFired', true) },
      },
      {
        text: 'Wait — an existing employer first, then maybe',
        tag: null,
        outcome: 'The caution is reasonable. The window may still be open when you come back to it.',
        effect: (p) => { p.m -= 3; p.setMem('cnPrivateBizFired', true) },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CONTEMPORARY
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'cn_left_behind_child',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.cnLeftBehindFired,
    text: (G) => {
      const parents = Object.values(G.parents ?? {})
      const bothGone = parents.filter(p => p.alive !== false).length >= 2
      if (bothGone) return 'Both parents are in Guangdong. Your grandparents raise you and they are good at this and it is not the same as parents. They call when they can — Sundays, if the reception holds. You have the calls and the remittances and the visits at New Year which end in crying at the bus station. You understand, without being told, what this arrangement costs.'
      return 'Your parents are in the city. You are in the village with your grandparents. This is not unusual — most of the children in your class are in the same arrangement. You grow up knowing your parents as voices and photographs. When they come home for Spring Festival they are strangers who love you and you love them and you are all, in that week, trying to compress what the year hasn\'t been.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.addFlag('left_behind_child'); p.setMem('cnLeftBehindFired', true) },
  },

  {
    id: 'cn_only_child_weight',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1983 && G.currentYear <= 2013 &&
      (G.siblings ?? []).length === 0 &&
      !G.mem?.cnOnlyChildFired,
    text: 'You are the only child in a household that has reorganised itself around you. This is not indulgence exactly — it is pressure with love behind it. Six adults (your parents, both sets of grandparents) holding one child\'s future. The responsibility of being the single person carrying the family\'s accumulated investment and hope is not heavy the way a stone is heavy. It is heavy the way weather is heavy — it surrounds everything and is the condition under which everything else happens.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 5; p.addFlag('little_emperor'); p.setMem('cnOnlyChildFired', true) },
  },

  {
    id: 'cn_social_credit_awareness',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 2015 &&
      G.age >= 18 &&
      !G.mem?.cnSocialCreditFired,
    text: 'The social credit system is not a single database — it is a network of municipal systems, corporate scoring, court records, and blacklists that intersect in ways that are not fully documented publicly. The effect is legible: a court judgment keeps you off the high-speed rail. A pattern of missed payments affects loan eligibility. The system rewards the predictable. You have started thinking before certain actions — a small hesitation you did not have five years ago. That is the mechanism working correctly.',
    choices: null,
    effect: (p) => { p.m -= 3; p.addFlag('social_credit_awareness'); p.setMem('cnSocialCreditFired', true) },
  },

  {
    id: 'cn_tech_generation',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 2008 && G.currentYear <= 2020 &&
      G.stats.smarts >= 55 &&
      G.age >= 18 && G.age <= 32 &&
      !G.mem?.cnTechGenFired,
    text: (G) => {
      const yr = G.currentYear ?? 2014
      const platform = yr < 2012 ? 'Weibo' : yr < 2016 ? 'WeChat' : 'Douyin or a WeChat mini-program'
      return `The scale of the ecosystem is unlike anything that existed before. A ${platform} account that reaches a hundred million people — that number is not a metaphor. The people who got in early are visible everywhere. You are not in Silicon Valley. You do not need to be. The market here has different geometry.`
    },
    choices: [
      {
        text: 'Get in — this is the moment and the place',
        tag: null,
        outcome: 'You build something inside the ecosystem. Whether the numbers materialise the way you planned or not, the skills and the connections are real.',
        effect: (p) => { p.e += 6; p.m += 5; p.addFlag('china_tech_generation'); p.addFlag('china_entrepreneur'); p.setMem('cnTechGenFired', true) },
      },
      {
        text: 'Watch — the competition is total and the risk is real',
        tag: null,
        outcome: 'You observe carefully from the edge. The wave continues without you in it.',
        effect: (p) => { p.m -= 3; p.addFlag('china_tech_generation'); p.setMem('cnTechGenFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_zero_covid_lockdown',
    phase: 'midlife',
    weight: 9,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.cnZeroCovidFired,
    text: (G) => {
      const yr = G.currentYear ?? 2021
      const city = yr === 2020 ? 'Wuhan' : 'Shanghai or one of the other cities under protocol'
      return `The building committee notification arrives: the compound is sealed. In ${city} this means weeks — the number changes without announcement. Food comes by delivery or by community box at the entrance. The QR code on your phone determines whether you are permitted outside. You begin listing the specific things not available in your apartment. The list gets longer. The officials on the daily briefing call the policy scientific. You think about what the word scientific is doing in that sentence.`
    },
    choices: [
      {
        text: 'Accept it — collective discipline is what this requires',
        tag: null,
        outcome: 'The lockdown ends. The compliance was total. You do not know if it was correct. That question has no good address here.',
        effect: (p) => { p.m -= 10; p.h -= 3; p.addFlag('zero_covid_lockdown'); p.setMem('cnZeroCovidFired', true) },
      },
      {
        text: 'Comply — but the anger is real and goes somewhere private',
        tag: null,
        outcome: 'You comply. The anger accumulates in the place where such things go in this country — private, undiscussed, permanent.',
        effect: (p) => { p.m -= 15; p.r += 6; p.addFlag('zero_covid_lockdown'); p.addFlag('zero_covid_anger'); p.setMem('cnZeroCovidFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_lying_flat',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 2019 &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.cnLyingFlatFired,
    text: 'The phrase is tangping — lying flat. The social contract said: study hard, work the 996 schedule, score the points, get the apartment, find the partner, have the child, and everything will have been worth it. An apartment in the city now costs twenty-three years of median salary. The 996 schedule is nine-to-nine, six days a week, and it is documented and widespread. You have looked at the contract and made a private decision about what you are and are not willing to do for what you can and cannot get.',
    choices: [
      {
        text: 'Lie flat — a life outside the achievement structure is still a life',
        tag: null,
        outcome: 'You work enough to live. You find space. It is constrained and real. The people who chose differently are not wrong. You are also not wrong.',
        effect: (p) => { p.m += 6; p.w -= 10; p.addFlag('lying_flat_generation'); p.setMem('cnLyingFlatFired', true) },
      },
      {
        text: 'Keep competing — the alternative is worse',
        tag: null,
        outcome: 'You stay in. The cost is real and you have decided it is still the better option. Whether you are right depends on how things resolve.',
        effect: (p) => { p.m -= 5; p.w += 5; p.setMem('cnLyingFlatFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cn_iron_rice_bowl_broken',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isChina(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2003 &&
      G.career != null &&
      G.stats.wealth <= 50 &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.cnIronRiceBowlFired,
    text: 'The state-owned enterprise is restructuring — the word the official documents use for letting workers go. You have worked here since the assignment after school. The work unit was your housing, your healthcare, your social insurance, and your identity. All of these are going away on the same day. The reform is called modernisation. What you are calling it is private and not repeatable.',
    choices: [
      {
        text: 'Find a way — the private sector is there',
        tag: null,
        outcome: 'The transition to private sector work is humbling and then manageable. The security never comes back. Something else does.',
        effect: (p) => { p.m -= 10; p.mo -= 1000; p.addFlag('iron_rice_bowl_broken'); p.setMem('cnIronRiceBowlFired', true) },
      },
      {
        text: 'Fight the restructuring — this is not what was promised',
        tag: null,
        outcome: 'The protest is not effective. The enterprise restructures anyway. You leave with slightly better severance and a grievance that does not resolve.',
        effect: (p) => { p.m -= 12; p.mo -= 500; p.r += 8; p.addFlag('iron_rice_bowl_broken'); p.addFlag('worker_protest'); p.setMem('cnIronRiceBowlFired', true) },
      },
    ],
    effect: null,
  },

]

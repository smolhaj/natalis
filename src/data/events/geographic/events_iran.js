// Iran arc events — supplementing events_country_arcs_3.js
//
// Already covered in events_country_arcs_3.js:
//   iran_white_revolution_village (Shah, 1963 rural)
//   iran_savak_silence (SAVAK police state)
//   iran_revolution_week (February 1979)
//   iran_post_revolution_purge (1981-83)
//   iran_iraq_war_son (1980-88 war)
//   iran_green_movement_2009
//   iran_mahsa_amini_2022
//
// This file adds the gaps:
//  — Khatami reform era 1997–2005: press freedom, civil society, hope/betrayal cycle.
//    Mohammad Khatami elected with 70% of the vote on a platform of reform and dialogue
//    of civilisations. Three hundred newspapers opened. Student uprising July 1999.
//    Shirin Ebadi Nobel Peace Prize 2003. Reformist newspapers closed one by one.
//  — Sanctions economy: the rial has lost 95%+ of its value since 1979. The dollar
//    price is the real price; the official rate is a fiction maintained by the
//    government. The underground economy runs on arbitrage. Prices change weekly.
//    After Trump withdrew from the JCPOA in 2018, the rial collapsed 60% in months.
//  — The private/public split: Iran is a country with one face for the street
//    and another for the apartment. Alcohol (illegal) is available through networks.
//    Satellite dishes (illegal) are on every building. Parties with music and mixed
//    gender socialising are private. The rooftop, the basement, the car.
//  — Hijab enforcement: the gasht-e ershad (morality police) patrol for bad hijab.
//    Mahsa Amini died in custody in September 2022 after being detained for this.
//    Before 2022: fines, detentions, forced confessions. The daily arithmetic of
//    what to wear in which neighbourhood, at which temperature, at what hour.
//  — Brain drain: Iran has the highest rate of brain drain in the world according
//    to IMF estimates. After 1979, after 2009, after 2022 — the waves out.
//    Turkey (easy visa), Canada (Persian diaspora), Germany (asylum seekers).
//    The decision to leave is also a decision about who you are.
//  — Nuclear deal: JCPOA signed 2015. Trump withdraws 2018. Sanctions reimposed.
//    A generation that hoped the deal would integrate Iran into the global economy,
//    and then watched it collapse.

const IRAN_EVENTS = [

  // ── KHATAMI REFORM ERA ────────────────────────────────────────────────────────

  {
    id: 'irn_khatami_era',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1997 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.irn_khatami,
    text: 'Khatami wins with seventy percent of the vote. That number means something — the people who voted included women, students, the young, people who had not voted before because there was no point. The newspapers multiply: three hundred in the first years. The word "civil society" is said in public, in print, with seriousness. The Guardian Council disqualifies reformist candidates from parliament in 2004. The newspapers are closed one by one — there are procedures for this, legal mechanisms, judges who are not reformists. The Supreme Leader is not elected. That fact was always the fact, but the reform era had been a way of not thinking about it continuously. The era ends with the fact clarified.',
    choices: [
      {
        text: 'You believed in it — the reform could have held if the system had allowed it.',
        tag: null,
        outcome: 'The belief is reasonable. The system\'s response is also the system. You carry both.',
        effect: (p) => { p.m -= 8; p.r += 6; p.karma += 4; p.addFlag('irn_khatami_generation'); p.setMem('irn_khatami', true); },
      },
      {
        text: 'You watched it carefully — the ceiling was always going to be the ceiling.',
        tag: null,
        outcome: 'The analysis was correct. Being correct early is its own kind of cost.',
        effect: (p) => { p.e += 4; p.r += 4; p.addFlag('irn_khatami_generation'); p.setMem('irn_khatami', true); },
      },
    ],
    effect: null,
  },

  // ── THE SANCTIONS ECONOMY ─────────────────────────────────────────────────────

  {
    id: 'irn_sanctions_economy',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2010 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.irn_sanctions,
    text: (G) => {
      const isYoung = G.currentYear <= 2018
      return isYoung
        ? 'The sanctions are the condition. Not the government — the sanctions. The distinction matters to some people and does not matter to the people paying for groceries. The rial loses thirty percent of its value in a month. The official rate is a number the government maintains; the street rate is a different number. The dollar price is the real price. You know someone who works in the currency exchange, which means you know someone who navigates this gap for a living. The gap is a livelihood for some and a disaster for everyone else.'
        : 'May 2018. Trump withdraws from the JCPOA. The rial falls sixty percent in three months. The price of chicken doubles. The price of medicine — imported medicine, the kind that treats things other medicine does not treat — triples, when it is available at all. The secondary sanctions make it technically illegal for European banks to clear any transaction with Iran. This includes transactions for food and medicine. The legal exception exists on paper. The practical exception does not exist in a Swift system.'
    },
    choices: null,
    effect: (p) => { p.w -= 10; p.m -= 8; p.addFlag('irn_sanctions_generation'); p.setMem('irn_sanctions', true); },
  },

  // ── THE PRIVATE/PUBLIC SPLIT ──────────────────────────────────────────────────

  {
    id: 'irn_private_public',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1985 &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem?.irn_private_public,
    text: 'The satellite dish is on the roof. It is illegal. It is on every building. The party is in the apartment — the curtains closed, the music low enough, the door locked. Alcohol is illegal. It is at the party. The relationship is not acknowledged in the street and is a relationship. You are learning the geography of the Republic: everything that is permitted in public, everything that is not permitted, and the entire private life that runs in the space that is neither. You learn to navigate between these worlds before you learn to name what the navigation is. The naming comes later, usually after you have left or talked to someone who left.',
    choices: [
      {
        text: 'You are fluent in both worlds. The fluency is real and is also exhausting.',
        tag: null,
        outcome: 'The performance of the public self is skilled enough that it stops feeling like performance. That is not the same as it not being performance.',
        effect: (p) => { p.e += 4; p.s += 4; p.r += 5; p.addFlag('irn_double_life'); p.setMem('irn_private_public', true); },
      },
      {
        text: 'The contradiction between the public and private is something you have decided to resolve.',
        tag: null,
        outcome: 'Resolving it means moving closer to the private or moving closer to the public. Either direction has a cost.',
        effect: (p) => { p.m += 3; p.r += 5; p.addFlag('irn_double_life'); p.setMem('irn_private_public', true); },
      },
    ],
    effect: null,
  },

  // ── HIJAB ENFORCEMENT ─────────────────────────────────────────────────────────

  {
    id: 'irn_hijab_daily',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1981 && G.currentYear <= 2023 &&
      G.age >= 14 && G.age <= 50 &&
      !G.mem?.irn_hijab,
    text: (G) => {
      const isPostMahsa = G.currentYear >= 2022
      return isPostMahsa
        ? 'After Mahsa Amini, after the protests, the gasht-e ershad returns to the streets but the streets have changed. Women walk without covering in certain neighbourhoods and nothing happens. In other neighbourhoods and times, something happens. The map of enforcement is different from the map of the law — both change faster than you can track. You are navigating a revolution that is not complete. The covering you wear or do not wear is a position now in a way it was not before September 2022.'
        : 'The gasht-e ershad car is white. You know which streets they patrol on which days. You know which neighbourhood the patrols skip. The hijab you wear for the street is folded inside your bag for the party. The one you wear outside is correct enough to avoid the interaction. There is a calculation in every morning — which coat, which way of wearing it, which route to work — that takes no time because you have been doing it since you were thirteen.'
    },
    choices: [
      {
        text: 'The calculation is second nature. You perform it without thinking.',
        tag: null,
        outcome: 'The second-nature performance is real skill at real cost. That it is invisible to the people who require it is part of the cost.',
        effect: (p) => { p.e += 3; p.r += 6; p.addFlag('irn_hijab_generation'); p.setMem('irn_hijab', true); },
      },
      {
        text: 'An encounter with the gasht-e ershad. The specific texture of a warning.',
        tag: null,
        outcome: 'The warning is a formal procedure that does not feel formal. You carry what was said and what it felt like to be the person it was said to.',
        effect: (p) => { p.m -= 8; p.r += 8; p.karma += 3; p.addFlag('irn_hijab_generation'); p.setMem('irn_hijab', true); },
      },
    ],
    effect: null,
  },

  // ── THE BRAIN DRAIN ───────────────────────────────────────────────────────────

  {
    id: 'irn_brain_drain',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2000 &&
      G.age >= 22 && G.age <= 38 &&
      G.stats.smarts > 50 &&
      !G.mem?.irn_brain_drain,
    text: 'The IMF calls it the highest brain drain rate in the world: 150,000 educated Iranians leave each year. The number is the abstraction. The specific version is your group: the WhatsApp group of your university cohort, and how many of the names have country flags next to them now — Canadian flag, German flag, Turkish flag, British flag. The decision is constant because it is never quite final. You have the skills that travel. The question is whether you are a person who leaves or a person who stays, and the question is answered differently in different years depending on what year it is and what the rial rate is and whether the reformists won the last election.',
    choices: [
      {
        text: 'You go. Turkey first, then wherever the visa comes through.',
        tag: null,
        outcome: 'The leaving is also a grief that has no name in the destination country. You carry Iran in a way that people who were not born there do not understand.',
        effect: (p) => { p.r += 8; p.m -= 5; p.e += 5; p.addFlag('irn_diaspora_generation'); p.addFlag('emigrated'); p.setMem('irn_brain_drain', true); },
      },
      {
        text: 'You stay. The country needs people who stay.',
        tag: null,
        outcome: 'The staying is its own kind of decision, made against the background of the people who left. You watch the WhatsApp group update with flags.',
        effect: (p) => { p.r += 6; p.karma += 5; p.addFlag('irn_stayer_generation'); p.setMem('irn_brain_drain', true); },
      },
    ],
    effect: null,
  },

  // ── JCPOA AND ITS COLLAPSE ────────────────────────────────────────────────────

  {
    id: 'irn_jcpoa',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2015 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      !G.mem?.irn_jcpoa,
    text: 'July 2015: the JCPOA is signed. The P5+1. Iran limits its nuclear program; the sanctions are lifted. Economists model what integration into the global economy would mean for a country of 80 million with significant natural resources and an educated workforce. The rial improves. International companies begin sending delegations. Boeing signs a deal for 100 aircraft. Europeans come to negotiate. May 2018: Trump withdraws. The secondary sanctions are reimposed with maximum pressure. Boeing cancels the deal. The European companies leave. The rial collapses. The generation that waited for the deal to be signed and then watched it dissolve carries a specific double loss: the hope and the answer to what happens after the hope.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('irn_jcpoa_generation'); p.setMem('irn_jcpoa', true); },
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'irn_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2005 &&
      G.age >= 55 &&
      (G.flags.has('tehran_revolution_witness') || G.flags.has('irn_khatami_generation') ||
       G.flags.has('irn_sanctions_generation') || G.flags.has('irn_double_life')) &&
      !G.mem?.irn_reckoning,
    text: (G) => {
      const isOld = G.age >= 70
      return isOld
        ? 'You were alive before the Revolution and after it. The country that exists now and the country that was are both yours in a way that the generation born after 1979 cannot quite share. The before is in your body as a different texture — different music, different cinema, different kind of street. The after is the longer portion of your life. You have lived in both.'
        : 'The years add up to this: Khatami, Ahmadinejad, Rouhani, Raisi. Reform, crackdown, deal, withdrawal, protest, crackdown. The cycle has a rhythm. You have learned the rhythm the way you learn to recognise a recurring dream — with weariness and without surprise. The country you were promised at each cycle and the country you have lived in are different enough that you have stopped making the comparison continuously.'
    },
    choices: null,
    effect: (p) => { p.r += 7; p.addFlag('irn_testigo_generation'); p.setMem('irn_reckoning', true); },
  },

]

export default IRAN_EVENTS

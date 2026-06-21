// events_ireland_depth.js — Ireland depth arc (10 events)
// Covers: Famine family memory (1900-1950), Easter Rising 1916, Civil War wound 1922-23,
//         The Emergency (WWII neutrality), Industrial Schools, Gaeltacht identity,
//         LGBTQ decriminalisation 1993, marriage equality 2015, Repeal 2018,
//         Ryan Report late reckoning (industrial school follow-through)
// Complements events_ireland_turkey.js (emigration, Troubles, Celtic Tiger, crash, church)

const IS_IRISH = (G) => G.character.country?.name === 'Ireland'

export const IRELAND_DEPTH_EVENTS = [

  // ─── THE FAMINE SHADOW ────────────────────────────────────────────────────

  {
    id: 'ire_famine_shadow',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1900 && G.currentYear <= 1950 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.ireFamineShadow,
    text: (G) => {
      const hasGrandparent = G.currentYear <= 1935
      if (hasGrandparent) {
        return 'Your grandmother — or someone who fills that place — was a child during the Famine years. She does not call it the Famine. She calls it the bad time, the hungry time, an *drochshaol*. She describes the road with the people lying on it. She says what she ate. She says what she stopped eating when there was no more of it. The count of who in the family stayed and who left is part of how she accounts for the world. One million dead. One million gone. Ireland\'s population will not recover to pre-Famine levels for the next hundred and fifty years. What she carries, you are beginning to understand, is not just her story.'
      }
      return 'The Famine is in living memory in the sense that living people remember people who remembered it. Your grandfather knew men who had buried children in the field. The word for it in Irish — *an Gorta Mór*, the Great Hunger — is more accurate than Famine, which implies natural cause. There was food in Ireland during the Famine. It was exported while people died alongside the road. England is a word that carries a specific weight in this house. The weight has a history. You are learning the history from the weight.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('ire_famine_family_memory'); p.setMem('ireFamineShadow', true) },
  },

  // ─── THE EASTER RISING AND INDEPENDENCE ──────────────────────────────────

  {
    id: 'ire_easter_rising',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1916 && G.currentYear <= 1928 &&
      G.age >= 12 &&
      !G.mem?.ireEasterRising,
    text: 'Easter Monday, April 24, 1916. The General Post Office on Sackville Street. Patrick Pearse reads a proclamation outside. Within a week, the Rising is suppressed. Fifteen leaders are executed by firing squad over ten days — slowly enough that public opinion in Ireland shifts. The rising was initially unpopular; the executions make it something else. By 1918, Sinn Féin wins 73 of 105 Irish seats in the Westminster election and the War of Independence begins. The treaty in 1921 gives twenty-six counties a Free State and leaves six in the United Kingdom. Your country has become something — a partial thing, contested from the first. The executions produced it. The treaty defined its edges.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.r += 3; p.addFlag('ire_rising_generation'); p.setMem('ireEasterRising', true) },
  },

  // ─── THE CIVIL WAR ───────────────────────────────────────────────────────

  {
    id: 'ire_civil_war_wound',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1922 && G.currentYear <= 1945 &&
      G.age >= 14 &&
      !G.mem?.ireCivilWar,
    text: 'The Treaty split everything that the War of Independence had made. Pro-Treaty and Anti-Treaty: Collins versus de Valera. The men who had fought together were shooting each other by summer 1922. Seventy-seven Anti-Treaty prisoners were officially executed — more than the British executed in the Rising. Thousands died. The war lasted eleven months. Its conclusion was not a resolution, only a ceasing. The two sides became Fianna Fáil and Fine Gael, and for the next seventy years Irish politics will be defined not by left and right but by which side of the Civil War your grandfather was on. The wound does not have a name in this house. It is simply the reason we do not speak to the Murphys down the road.',
    choices: [
      {
        text: 'Your family backed the Treaty. The Free State is the possible thing, not the perfect thing.',
        tag: null,
        outcome: 'Collins said it was "the freedom to achieve freedom." Your family accepted the argument. The republic on paper could be fought for later. What could be had now, was taken. The cenotaph your grandfather did not attend at the funerals of the other side is a fact that comes up, eventually, without anyone quite addressing it.',
        effect: (p) => { p.m -= 4; p.r += 4; p.e += 3; p.addFlag('ire_civil_war_generation'); p.setMem('ireCivilWar', true) },
      },
      {
        text: 'Your family was Anti-Treaty. The partition was a betrayal of the republic declared in 1916.',
        tag: null,
        outcome: 'The republic declared in 1916 was not what the treaty gave. Six counties left out. The crown retained. The oath required. Your family kept the refusal. De Valera eventually comes to power and governs for decades and the partition remains. The refusal is not vindicated but it is not abandoned either. It becomes the position of the house, inherited rather than chosen.',
        effect: (p) => { p.m -= 5; p.r += 5; p.e += 2; p.karma += 3; p.addFlag('ire_civil_war_generation'); p.setMem('ireCivilWar', true) },
      },
    ],
    effect: null,
  },

  // ─── THE EMERGENCY ───────────────────────────────────────────────────────

  {
    id: 'ire_emergency',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1939 && G.currentYear <= 1946 &&
      G.age >= 14 &&
      !G.mem?.ireEmergency,
    text: 'Ireland calls the war "the Emergency." Neutrality: de Valera\'s position. The logic is partition — Ireland will not fight for a king who governs part of Irish territory. Britain cuts off fuel supplies in 1941, which reduces some areas to a subsistence economy. Turf replaces coal. Rationing covers everything. The bread is poor quality. The bicycle is the primary transport. Meanwhile: a hundred and sixty thousand Irish people volunteer or emigrate to serve in the Allied forces anyway, individually, without government support. At night, you can hear the BBC on the wireless if you turn the dial in a direction the government has not encouraged. What the BBC says and what the newspapers say are not the same account of the same war.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.e += 4; p.addFlag('ire_emergency_generation'); p.setMem('ireEmergency', true) },
  },

  // ─── THE INDUSTRIAL SCHOOLS ───────────────────────────────────────────────

  {
    id: 'ire_industrial_school',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1935 && G.currentYear <= 1980 &&
      G.age >= 7 && G.age <= 14 &&
      G.stats.wealth < 40 &&
      !G.mem?.ireIndustrialSchool,
    text: (G) => {
      const isDirectExperience = G.stats.wealth < 25
      if (isDirectExperience) {
        return 'The Industrial School. You were sent there because of what you were — illegitimate, or orphaned, or the child of a mother the state decided could not keep you, or simply poor enough that the parish considered your family inadequate. The Brothers or the Sisters ran it. The regime was: work, prayer, silence, punishment. The punishment was not restrained by any outside authority. You were there for years. You carry it in specific ways that you have no language for because the language for it was not available then and is barely available now. It will be thirty or forty years before a commission examines what the schools were. When the report arrives, its findings will be what you already know.'
      }
      return 'Someone you know — a neighbour\'s child, a cousin — was sent to an Industrial School. The schools were run by the Christian Brothers or the Sisters of Mercy or other orders, under a state contract for the detention and education of children in moral danger, which was the official phrase for illegitimacy or poverty or having a mother the authorities didn\'t approve of. What happened inside the schools was not a secret, exactly. It was something that was known without being said. You know it without being inside it. This knowledge sits in you differently from the knowledge you were taught.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 4; p.r += 6; p.karma += 4; p.addFlag('ire_industrial_school_survivor'); p.setMem('ireIndustrialSchool', true) },
  },

  // ─── GAELTACHT AND THE LANGUAGE ──────────────────────────────────────────

  {
    id: 'ire_gaeltacht',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_IRISH(G) &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.ireGaeltacht,
    text: 'Irish is compulsory at school. Failing Irish is failing the Leaving Cert, which is failing everything. The Irish you learn at school is not the Irish that people speak in the Gaeltacht — the Irish-speaking communities of the west and northwest, the places that resisted the language\'s displacement longest. You may have been to a Gaeltacht summer school: three weeks in a remote parish, billeted with a farming family, Irish at all times or a fine. The young people come from everywhere. The Irish they are speaking is imperfect and competitive and the language sits between them as a thing owned by the state and a thing owned by living communities and these are not the same ownership. You leave with some Irish. You do not know what to do with it.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.addFlag('ire_gaeltacht_gen'); p.setMem('ireGaeltacht', true) },
  },

  // ─── DECRIMINALISATION 1993 ───────────────────────────────────────────────

  {
    id: 'ire_lgbtq_decrim',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.flags.has('lgbtq') &&
      G.currentYear >= 1993 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.ireLgbtqDecrim,
    text: 'June 24, 1993. The Criminal Law (Sexual Offences) Act. Homosexuality decriminalised in Ireland — the last country in the EU to do so, twenty-five years after England, forty-three years after Germany. Senator David Norris spent fifteen years on the legal challenge that got to the European Court of Human Rights in 1988 and which the Dáil then needed five more years to act on. What the law changing means: you cannot be imprisoned for who you are. What it doesn\'t mean: the Church no longer has an opinion, the family is comfortable, the country is easy. The law changes before the culture does. The culture is changing. You are watching it from where you are.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r += 4; p.setMem('ireLgbtqDecrim', true) },
  },

  // ─── MARRIAGE EQUALITY 2015 ──────────────────────────────────────────────

  {
    id: 'ire_marriage_equality',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 2015 &&
      G.age >= 25 &&
      !G.mem?.ireMarriageEquality,
    text: 'May 22, 2015. Ireland becomes the first country in the world to approve same-sex marriage by popular referendum — 62.1 percent in favour. The diaspora comes home to vote: Irish emigrants registering to return for the referendum, flights booked, the hashtag #hometovote, people photographed on ferries and planes with the signs they will carry to the polling station. The country that was defined for so long by what the Church said it could and could not do has voted in the most direct democratic form available. Senator Norris weeps. Something that started in 1977 with his campaign — and earlier, and earlier — lands here. The yes posters in the windows of the houses. The count centres. The numbers.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 5; p.r += 3; p.addFlag('ire_equality_generation'); p.setMem('ireMarriageEquality', true) },
  },

  // ─── REPEAL OF THE EIGHTH 2018 ────────────────────────────────────────────

  {
    id: 'ire_repeal_eighth',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.character.gender === 'female' &&
      G.currentYear >= 2018 &&
      G.age >= 22 &&
      !G.mem?.ireRepealEighth,
    text: 'May 25, 2018. The Eighth Amendment — which gave equal right to life to the unborn and the pregnant woman, and which meant abortion was illegal in virtually all circumstances — is repealed by referendum. 66.4 percent in favour. The campaign was four years of photographs and testimonies: the women who went to England (twelve a day, every day, for thirty-five years), the women who ordered pills online, the women who died of conditions that could not be medically managed because of the legal risk to the clinical team. Savita Halappanavar\'s photograph above the polling stations. The words *her body her choice* on the jumpers of the canvassers in the rain. The count. The percentage. The minister for health crying at the microphone. The enormous ordinariness of being, finally, in a country that trusts women with their own bodies.',
    choices: null,
    effect: (p) => { p.m += 9; p.karma += 6; p.r += 3; p.addFlag('ire_repeal_generation'); p.setMem('ireRepealEighth', true) },
  },

  // ─── RYAN REPORT — INDUSTRIAL SCHOOL LATE RECKONING ─────────────────────

  {
    id: 'ire_ryan_report',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.flags.has('ire_industrial_school_survivor') &&
      G.currentYear >= 2009 &&
      G.age >= 45 &&
      !G.mem?.ireRyanReport,
    text: (G) => {
      const isDirectSurvivor = G.stats.wealth < 35
      if (isDirectSurvivor) {
        return 'The Ryan Report is published. 2,600 pages. The Commission to Inquire into Child Abuse, nine years in investigation. It names the orders and the practices and the scale — tens of thousands of children, decades of abuse, a state that contracted the work and did not inspect it and will now pay the settlements while protecting the Church\'s assets in the process. They describe what you know. They call it what it was. You are too old now to know what to do with the official naming of something you have always known. The report uses clinical language. Your knowledge is not in clinical language.'
      }
      return 'The Ryan Report. You read it because of what you know. The Commission\'s account of the Industrial Schools — what happened in the schools, for decades, to tens of thousands of children — is written in careful official language and it covers what the person you knew carried without it being called anything. The report names it. The orders that ran the schools will not be prosecuted; the state settled with them in 2002, limiting liability. The survivors are mostly old now. The recognition arrives without the consequences that recognition was supposed to produce. The naming is not nothing. It is not enough.'
    },
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.karma += 4; p.setMem('ireRyanReport', true) },
  },

]

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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1900 && G.currentYear <= 1950 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.ireFamineShadow,
    text: (G) => {
      const hasGrandparent = G.currentYear <= 1935
      if (hasGrandparent) {
        return 'Your grandmother, or someone who fills that place, was a child in the bad time, an drochshaol; she does not call it the Famine. She describes the road with the people lying on it. She says what she ate, and what she stopped eating when there was no more of it. The count of who in the family stayed and who left is how she accounts for the world. What she carries, you begin to understand, is not only her story.'
      }
      return 'The Famine is in living memory in the sense that living people remember people who remembered it: your grandfather knew men who buried children in the field. An Gorta Mór, the Great Hunger, is the truer name, because Famine sounds like weather, and there was food in Ireland the whole time, shipped out while people died by the road. England is a word with a weight in this house. You are learning the history from the weight.'
    },
    context: 'The Great Famine of 1845-52 killed about a million people and drove another million to emigrate. Ireland\'s population has never returned to its pre-Famine level.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('ire_famine_family_memory'); p.setMem('ireFamineShadow', true) },
  },

  // ─── THE EASTER RISING AND INDEPENDENCE ──────────────────────────────────

  {
    id: 'ire_easter_rising',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1966 && G.currentYear <= 1967 &&
      G.age >= 8 &&
      !G.mem?.ireEasterRising,
    text: 'Easter 1966. The men who were inside the GPO walk down O\'Connell Street in overcoats, old now, fewer of them than the last time they were counted. All week the television has been running the Rising each evening at the hour the news would be. In March somebody took the top off Nelson\'s Pillar with explosive and nobody in this house says they are sorry about it. Your father points at a man in the third row and says he was inside, and then says nothing else about him for the rest of the day.',
    context: 'The Easter Rising began on 24 April 1916 and was suppressed within a week; fifteen of its leaders were executed by firing squad over ten days, which turned a largely unpopular insurrection into the founding event of the state. Sinn Féin took 73 of Ireland\'s 105 Westminster seats in 1918 and the War of Independence followed. The 1921 Treaty gave twenty-six counties a Free State and left six in the United Kingdom. The 1966 golden jubilee was the largest public commemoration the state had staged; Nelson\'s Pillar on O\'Connell Street was destroyed by a bomb that March.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.r += 3; p.addFlag('ire_rising_generation'); p.setMem('ireEasterRising', true) },
  },

  // ─── THE CIVIL WAR ───────────────────────────────────────────────────────

  {
    id: 'ire_civil_war_wound',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1922 && G.currentYear <= 1945 &&
      G.age >= 14 &&
      !G.mem?.ireCivilWar,
    text: 'The men who were in the same column two years ago are shooting at each other by the summer, and the Free State executes seventy-seven of them, more than the British managed. It is over inside a year and nothing about it is settled. Your grandfather did not go to the funerals on the other side and that fact is available at every wake for the rest of the century. In this house the thing has no name. It is only the reason nobody speaks to the Murphys down the road.',
    context: 'The Anglo-Irish Treaty of December 1921 split the independence movement between pro-Treaty and anti-Treaty factions and produced a civil war from June 1922 to May 1923. The Free State executed seventy-seven anti-Treaty prisoners, more than the British executed after the Rising. The two sides became Fine Gael and Fianna Fail, and Irish party politics was organised around Civil War allegiance rather than left and right for most of the following century.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.currentYear >= 1939 && G.currentYear <= 1946 &&
      G.age >= 14 &&
      !G.mem?.ireEmergency,
    text: 'They call it the Emergency, the name for a war you are not in. There is no coal after 1941 so it is turf, wet turf, and the bread is grey and the bicycle is how anyone gets anywhere. Two of your cousins are in Britain in uniform and it is not discussed at the table. At night you can find the BBC on the wireless if you move the dial in a direction that is not encouraged, and what it says about the war is not what the newspaper says.',
    context: 'Ireland remained neutral throughout the Second World War, a period officially designated the Emergency, on the grounds that it would not fight for a crown still governing six of its counties. Britain cut coal and fuel supplies in 1941 and rationing was severe. Around 70,000 people from the Irish state nonetheless volunteered for the British forces, individually and without state support; those who deserted the Irish army to do so were barred from public employment until a 2013 pardon.',
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
        return 'The Industrial School. You were sent there for what you were: illegitimate, or orphaned, or the child of a mother the state decided could not keep you, or just poor enough. The Brothers or the Sisters ran it, and the regime was work, prayer, silence and punishment, and nobody outside put any limit on the punishment. You were there for years. Thirty or forty years later a commission will look at what the schools were, and its findings will be what you already know.'
      }
      return 'Someone you know — a neighbour\'s child, a cousin — was sent to an Industrial School. The schools were run by the Christian Brothers or the Sisters of Mercy or other orders, under a state contract for the detention and education of children in moral danger, which was the official phrase for illegitimacy or poverty or having a mother the authorities didn\'t approve of. What happened inside the schools was known without being said. You know it without being inside it. This knowledge sits in you differently from the knowledge you were taught.'
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
    text: 'Irish is compulsory, and failing it is failing everything. The Irish you learn at school is not the Irish spoken in the Gaeltacht, out west, where the language held on longest. Perhaps you go to a summer college: three weeks billeted with a farming family, Irish at all times or a fine, young people from everywhere speaking an Irish that is imperfect and competitive. The language belongs to the state and to living communities, and that is not the same kind of owning. You leave with some Irish, and do not know what to do with it.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.addFlag('ire_gaeltacht_gen'); p.setMem('ireGaeltacht', true) },
  },

  // ─── DECRIMINALISATION 1993 ───────────────────────────────────────────────

  {
    id: 'ire_lgbtq_decrim',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      (G.flags.has('lgbtq') || G.flags.has('lgbtq_identity')) &&
      G.currentYear >= 1993 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.ireLgbtqDecrim,
    text: 'June 1993, and Ireland stops treating homosexuality as a crime, the last country in the European Community to do it. It took David Norris fifteen years and the court in Strasbourg, and then five more years for the Dáil. It means you cannot be put in prison for who you are. It does not mean the Church has stopped having an opinion, or the family is comfortable. The law changes before the country does, and you watch the country start to follow.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r += 4; p.setMem('ireLgbtqDecrim', true) },
  },

  // ─── MARRIAGE EQUALITY 2015 ──────────────────────────────────────────────

  {
    id: 'ire_marriage_equality',
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      IS_IRISH(G) &&
      G.currentYear >= 2015 &&
      G.age >= 25 &&
      !G.mem?.ireMarriageEquality,
    text: 'May 22, 2015, and Ireland votes for same-sex marriage, the first country ever to do it by popular vote. The emigrants come home to vote, on ferries and planes, photographed holding their signs. The country the Church defined for so long has decided this directly. The Yes posters in the windows. The count centres. The numbers.',
    context: 'The 2015 referendum passed with 62.1 percent in favour.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 5; p.r += 3; p.addFlag('ire_equality_generation'); p.setMem('ireMarriageEquality', true) },
  },

  // ─── REPEAL OF THE EIGHTH 2018 ────────────────────────────────────────────

  {
    id: 'ire_repeal_eighth',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_IRISH(G) &&
      G.character.gender === 'female' &&
      G.currentYear >= 2018 &&
      G.age >= 22 &&
      !G.mem?.ireRepealEighth,
    text: 'The count comes in on the Saturday and it is two to one, and it is two to one in nearly every constituency, including the ones nobody had counted on. Somebody has taped a photograph of a young woman above the door of the polling station and people touch it on the way in. Your mother, who has never once discussed any of this, says a single sentence in the kitchen about a girl she knew at school in 1979. Then she fills the kettle and says nothing else.',
    context: 'The Eighth Amendment, adopted in 1983, gave the unborn an equal right to life with the pregnant woman and made abortion illegal in almost all circumstances. It was repealed by referendum on 25 May 2018 with 66.4 percent in favour. Roughly nine women a day travelled from Ireland to Britain for terminations across the intervening thirty-five years. Savita Halappanavar died of sepsis in Galway in 2012 after being refused a termination, and her photograph became the campaign\'s central image.',
    choices: null,
    effect: (p) => { p.m += 9; p.karma += 6; p.r += 3; p.addFlag('ire_repeal_generation'); p.setMem('ireRepealEighth', true) },
  },

  // ─── RYAN REPORT — INDUSTRIAL SCHOOL LATE RECKONING ─────────────────────

  {
    id: 'ire_ryan_report',
    phase: null,
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
        return 'The Ryan Report is published, thousands of pages after nine years of investigation, and it names the orders and the practices and the scale: tens of thousands of children, decades, a state that contracted the work out and never inspected it. It calls it what it was. You are too old now to know what to do with an official name for something you have always known. The report is written in clinical language, and what you know is not.'
      }
      return 'You read the Ryan Report because of what you know. It describes, in careful official language, what happened in the Industrial Schools for decades to tens of thousands of children, and it covers what the person you knew carried without a name. The orders that ran the schools will not be prosecuted; in 2002 the state agreed a deal that capped what they would pay. The survivors are mostly old now. The naming is something, and not enough.'
    },
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.karma += 4; p.setMem('ireRyanReport', true) },
  },

]

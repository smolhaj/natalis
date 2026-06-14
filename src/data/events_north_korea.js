// North Korea arc events
// Covers: Juche childhood, Songbun caste system, self-criticism sessions,
// the Arduous March famine 1994-98, jangmadang markets, USB drives,
// public executions, defection calculation

const NORTH_KOREA_EVENTS = [

  {
    id: 'dprk_juche_childhood',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.character.country.name === 'North Korea' && G.age >= 6 && G.age <= 12 && !G.flags.has('dprk_juche_childhood'),
    text: (G) => {
      const yr = G.currentYear
      const leader = yr < 1994 ? 'Kim Il-sung' : yr < 2011 ? 'Kim Jong-il' : 'Kim Jong-un'
      const gen = yr < 1980 ? 'the Great Leader' : yr < 2011 ? 'the Dear Leader' : 'the Marshal'
      return `The portrait of ${leader} hangs above the blackboard, larger than the blackboard. The first thing you learned to read was ${gen}'s name. The textbook that came before the reading primer taught you about the imperialists and the Fatherland Liberation War and the sacred revolutionary bloodline. You memorized the dates. You recited them without error. You believed them the way you believed the air — not as a choice but because there was no gap in the world where another choice would sit.`
    },
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('dprk_juche_childhood'); },
  },

  {
    id: 'dprk_songbun',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'North Korea' && G.age >= 17 && G.age <= 25 && !G.flags.has('dprk_songbun_revealed'),
    text: (G) => {
      const yr = G.currentYear
      // Randomly assign songbun at this moment of revelation
      return `The job assignment comes. ${yr <= 1980 ? 'Your work unit placement' : 'The application for the factory position'} depends on your Songbun — your family class, determined by what your grandparents did and who they were. A grandfather who fled to the South in 1950. A great-uncle who had a Bible. A parent who once questioned something in a way that was noted. These are the facts that determine your ceiling. You understand this the way you understand weather: it is there before you wake up, and it determines what you can do with the day.`
    },
    choices: [
      {
        text: 'Your family is loyal class — the ceiling is high.',
        tag: 'loyal',
        outcome: 'The Pyongyang posting. The factory with better rations. The university application considered. The system rewards what it rewards.',
        effect: (p) => { p.m += 5; p.w += 5; p.addFlag('dprk_songbun_revealed'); p.addFlag('dprk_loyal_class'); },
      },
      {
        text: 'Your family is wavering or hostile class.',
        tag: 'hostile',
        outcome: 'The assignment to the farm or the mine, not the university. The doors that are not visible but are there. You learn to read the architecture of what is not offered.',
        effect: (p) => { p.m -= 10; p.w -= 8; p.e -= 3; p.addFlag('dprk_songbun_revealed'); p.addFlag('dprk_hostile_class'); },
      },
    ],
  },

  {
    id: 'dprk_criticism_session',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'North Korea' && G.age >= 18 && !G.flags.has('dprk_criticism_session') && !G.mem.dprk_crit_checked,
    text: 'Every week: the saenghwal chonghwa. The self-criticism session in your work unit or study group. You stand and confess your failures — tardiness, insufficient revolutionary zeal, a moment of distraction during political study. Then your peers criticize you. The criticism must be neither too lenient (which looks like protection) nor too harsh (which looks like factional attack). You have learned to calibrate it. The calibration is a skill. You teach your children to calibrate it before they need to.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 1; p.s -= 3; p.addFlag('dprk_criticism_session'); p.setMem('dprk_crit_checked', true); },
  },

  {
    id: 'dprk_arduous_march',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'North Korea' && G.currentYear >= 1994 && G.currentYear <= 1998 && !G.flags.has('dprk_arduous_march'),
    text: (G) => {
      const yr = G.currentYear
      return `The Public Distribution System stopped delivering in ${yr <= 1995 ? '1994' : 'recent years'}. The rations were already thin; now there are no rations. The state calls it the Arduous March, after Kim Il-sung's guerrilla campaign in the Manchurian winter. The metaphor requires you to be a soldier marching toward victory. You are a person who cannot buy grain because the grain has not come. The people dying are not the ones who are called dying. You find ways to eat. Some people around you do not find ways.`
    },
    choices: [
      {
        text: 'You found informal trade as a survival strategy.',
        tag: 'traded',
        outcome: 'The jangmadang: technically illegal, increasingly visible, increasingly necessary. You sold what you had. You bought what you could. You learned what a market actually is.',
        effect: (p) => { p.m -= 16; p.h -= 10; p.e += 3; p.addFlag('dprk_arduous_march'); p.addFlag('dprk_jangmadang_trader'); },
      },
      {
        text: 'You survived on reduced rations and what family could provide.',
        tag: 'survived',
        outcome: 'You are still here. Others from your work unit are not. The official history will describe this as a period of difficulty overcome through revolutionary spirit.',
        effect: (p) => { p.m -= 20; p.h -= 14; p.addFlag('dprk_arduous_march'); },
      },
    ],
  },

  {
    id: 'dprk_jangmadang',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'North Korea' && G.currentYear >= 2000 && !G.flags.has('dprk_jangmadang') && !G.mem.dprk_market_checked,
    text: 'The market. Technically illegal under the socialist distribution system; practically tolerated because the alternative is starvation. Women primarily — the jangmadang became women\'s economic space while men reported to their official work units where no work was done and no pay arrived. You sell what you can sell: cigarettes, candy, Chinese goods that came across the Tumen. The market has its own enforcement, its own pricing, its own information network. The information that comes through the market includes information about outside.',
    choices: null,
    effect: (p) => { p.m += 4; p.w += 3; p.s += 2; p.addFlag('dprk_jangmadang'); p.setMem('dprk_market_checked', true); },
  },

  {
    id: 'dprk_usb_drives',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'North Korea' && G.currentYear >= 2005 && !G.flags.has('dprk_foreign_media') && !G.mem.dprk_usb_checked,
    text: (G) => {
      const yr = G.currentYear
      const media = yr <= 2010 ? 'a VCD — a Chinese copy of a South Korean drama' : 'a USB drive with South Korean dramas, three years of episodes compressed into a device the size of a thumb'
      return `Somebody you trust passes you ${media}. The cover of the disk is unmarked. You watch it at 2am with the curtain closed, the volume low, two other people who also need to have never seen it. The people in the drama live in apartments with refrigerators full of food and they argue about love while their phones are in their hands. The phones are different from the phones you know. The food is different from the food you know. You are watching this with three people who have also never seen it and will never have seen it.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.e += 5; p.addFlag('dprk_foreign_media'); p.setMem('dprk_usb_checked', true); },
  },

  {
    id: 'dprk_public_execution',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'North Korea' && !G.flags.has('dprk_execution_witness') && !G.mem.dprk_exec_checked,
    text: (G) => {
      const yr = G.currentYear
      return `The announcement comes through the work unit: attendance at the public execution is mandatory. The crime is ${yr >= 2012 ? 'watching foreign media or distributing banned content' : 'economic crimes during the difficult period'}. The field outside the city. The crowd required to watch. You watch. You have been taught that the watching is a service to the state and also to the criminal — whose crime is understood by the people witnessing the consequence. The logic is audible. You do not look away. You have learned that looking away is also noted.`
    },
    choices: null,
    effect: (p) => { p.m -= 16; p.r += 8; p.addFlag('dprk_execution_witness'); p.setMem('dprk_exec_checked', true); },
  },

  {
    id: 'dprk_defection_calculation',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'North Korea' && G.age >= 20 && G.age <= 45 && !G.flags.has('dprk_defection_considered'),
    text: 'You have begun the calculation. The Tumen River at its narrowest: knee-deep and crossable at night when the guards look away — which they sometimes do, for money. China sends back those it catches; being sent back means political prison. From China: Mongolia is safer than going south, which is surveilled. Thailand, or Mongolia, routes to the South Korean embassy, to Hanawon, to a country that is technically yours but that you have been taught is the enemy. The family you leave behind is in danger if you go. The family you could have in a different life requires going. You run the numbers. You run them again.',
    choices: [
      {
        text: 'You decide to cross.',
        tag: 'cross',
        outcome: 'The river at 3am. The Chinese side. The months of dangerous transit. The Hanawon center. Seoul: every door open that you do not know how to walk through.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('dprk_defection_considered'); p.addFlag('dprk_defected'); p.setResidency('refugee_status'); },
      },
      {
        text: 'You stay. The family. The calculation.',
        tag: 'stayed',
        outcome: 'You stay. You fold the calculation and put it somewhere and you go back to the work unit and you go back to the market and you go back to watching the curtain while the drama plays at 2am.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('dprk_defection_considered'); p.addFlag('dprk_chose_stay'); },
      },
    ],
  },

  {
    id: 'dprk_hanawon',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.flags.has('dprk_defected') && G.currentCountry?.name === 'South Korea' && !G.flags.has('dprk_hanawon_complete'),
    text: 'The Hanawon resettlement facility outside Seoul. Three months of South Korean orientation — how to use a cashcard, how to navigate the subway, what a supermarket is, the difference between the Korean you speak and the Korean they speak, which contains English words you have never heard and pronunciation that sounds slightly wrong. The counselor says: the adjustment takes years. She has said this to many people. The people who went through Hanawon before you figured out how to become South Koreans. You do not know yet if you can become a South Korean. You are, technically, already one — the constitution says so. The cashcard works when you tap it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 5; p.addFlag('dprk_hanawon_complete'); },
  },

]

export default NORTH_KOREA_EVENTS

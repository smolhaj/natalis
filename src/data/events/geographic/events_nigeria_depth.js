// events_nigeria_depth.js
// Nigeria depth: NEPA/power cuts, WAEC/JAMB examination season, Lagos go-slow,
// the #EndSARS 2020 protests, Japa emigration wave, the generator economy,
// Nollywood and Afrobeats as cultural assertion, church/mosque culture.

const IS_NIGERIA = (G) => G.character.country?.name === 'Nigeria'
const IS_SOUTH = (G) => IS_NIGERIA(G) && G.character.ethnicity !== 'fulani_hausa'
const IS_NORTH = (G) => IS_NIGERIA(G) && G.character.ethnicity === 'fulani_hausa'
const IS_LAGOS = (G) => IS_NIGERIA(G) && G.ruralUrban === 'urban' && G.currentYear >= 1970

export const NIGERIA_DEPTH_EVENTS = [

  // ── NEPA / POWER CUTS ─────────────────────────────────────────────────────────

  {
    id: 'nga_dep_nepa',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.ngaDepNepa,
    text: `NEPA: the National Electric Power Authority. The joke is that the acronym stands for "Never Expect Power Always." The current goes without warning — you are doing homework and the lights go, or you are cooking and the stove dies, or you are watching something on television and the screen goes black. Your family has a procedure: where the candles are, how to start the kerosene lamp, whether tonight is the kind of night where the generator goes on. The generator is an expense that not every family can afford. The sound of generators marks the houses that can. You grow up knowing how to read the sky before dark — whether to get the work done while the light is still available.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.addFlag('nga_dep_nepa_generation')
      p.setMem('ngaDepNepa', true)
    },
  },

  {
    id: 'nga_dep_generator_economy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 45 &&
      G.flags.has('nga_dep_nepa_generation') &&
      !G.mem?.ngaDepGenerator,
    text: `The generator economy: diesel costs, the I-pass-my-neighbour generator (the small one that can run a fan and a phone charger, nothing more), the inverter battery that stores grid power on the rare hours it arrives. Every business has a generator line item. Every estate has a collective generator arrangement and a drama about the dues. The fuel goes up when the naira weakens and the generator hours go down. The phrase "there is light" is used when the grid is on, as though light is a state that requires announcement. It has been requiring announcement since before you were born.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 2
      p.setMem('ngaDepGenerator', true)
    },
  },

  // ── WAEC/JAMB: EXAMINATION SEASON ────────────────────────────────────────────

  {
    id: 'nga_dep_waec_jamb',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 1980 &&
      G.age >= 15 && G.age <= 19 &&
      !G.mem?.ngaDepWaecJamb,
    text: `WAEC and JAMB: the West African Senior School Certificate Examination and the Joint Admissions and Matriculation Board. The two examinations that determine whether you go to university and which university you go to. The preparation begins a year before. The night before, the house is either very quiet or very noisy depending on your family. The questions are leaked, or they are said to be leaked, and this creates its own economy of doubt about what to believe and what to study. A bad result is not a single bad result — it is an argument your relatives will reference for years. A good result is a negotiation with your family about what course and which school and whether the course has a future.`,
    choices: [
      {
        text: 'You prepare seriously. The examination is the gate.',
        tag: null,
        outcome: 'You pass. The result is announced and your mother tells the neighbours and for a week you are the good story.',
        effect: (p) => { p.e += 4; p.m += 3; p.addFlag('nga_dep_exam_passed'); p.setMem('ngaDepWaecJamb', true) },
      },
      {
        text: 'You pass but not as well as hoped. You will sit it again.',
        tag: null,
        outcome: 'The year of sitting it again: the specific texture of being the one who is not yet in university while your mates are. You sit it again. You pass. The delay becomes the story you tell differently as you get older.',
        effect: (p) => { p.m -= 4; p.r += 4; p.e += 2; p.setMem('ngaDepWaecJamb', true) },
      },
    ],
  },

  // ── LAGOS GO-SLOW ─────────────────────────────────────────────────────────────

  {
    id: 'nga_dep_go_slow',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_LAGOS(G) &&
      G.currentYear >= 1985 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.ngaDepGoSlow,
    text: `The go-slow: Lagos traffic, specifically. Not a traffic jam in the way that other cities have traffic jams — a complete shutdown of the arterial roads that can run from morning to evening with no visible resolution. Third Mainland Bridge, Carter Bridge, the Lekki-Epe Expressway, Apapa road. You budget the journey the way a sailor budgets the weather. You leave at 4am or you wait until 10pm or you accept two hours of movement that covers four kilometres. The danfo buses and the okadas fill the gaps that personal cars cannot navigate. The go-slow is not a problem to solve — it is a condition to live inside. Lagosians become experts at managing the interior of the wait.`,
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 2
      p.addFlag('nga_dep_lagos_generation')
      p.setMem('ngaDepGoSlow', true)
    },
  },

  // ── NOLLYWOOD / AFROBEATS ─────────────────────────────────────────────────────

  {
    id: 'nga_dep_nollywood',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 14 && G.age <= 40 &&
      !G.mem?.ngaDepNollywood,
    text: `The VCD — the Video Compact Disc — and the Nollywood films on it. Shot in days, with hand-held cameras, budgets that the American films spend on a single scene, stories that are specifically, unmistakably Nigerian: juju, family conflict, money, betrayal, city and village, pastors with questionable miracles. In 1992 Kenneth Nnebue produced "Living in Bondage" on VHS and sold 750,000 copies. By the late 1990s Nigeria is making films at a rate that will make it the third-largest film industry in the world by output. You watch them at home, at the neighbours', at the video parlour down the road. The industry was built without state support, without film school infrastructure, without distribution deals. It was built by people who had something to say and found the cheapest way to say it.`,
    choices: null,
    effect: (p) => {
      p.m += 3
      p.s += 2
      p.addFlag('nga_dep_nollywood_generation')
      p.setMem('ngaDepNollywood', true)
    },
  },

  // ── #ENDSARS 2020 ─────────────────────────────────────────────────────────────

  {
    id: 'nga_dep_endsars',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear === 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ngaDepEndSars,
    text: `October 2020. The Special Anti-Robbery Squad — SARS — has been brutalising young Nigerians for thirty years: extorting people with laptops and dreadlocks and foreign accents, detaining people for their phones and their tattoos, killing people in custody and on the road. A video circulates of a SARS officer shooting a young man in Delta State. The protests begin on Twitter and arrive in the streets of Lagos, Abuja, Port Harcourt, Enugu. #EndSARS. For twelve days the largest youth protest in Nigerian history. On October 20, at the Lekki toll gate, soldiers open fire on protesters who are waving Nigerian flags and singing the national anthem. The government disputed the casualty figures. The videos existed.`,
    choices: [
      {
        text: 'You are at the protests. The generation of 2020.',
        tag: null,
        outcome: 'You were there before the shooting and you left when the word came through. Or you did not leave in time. Either way you were inside the moment that taught your generation what the Nigerian state would do.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 8; p.addFlag('nga_dep_endsars_generation'); p.addFlag('activist'); p.setMem('ngaDepEndSars', true) },
      },
      {
        text: 'You follow it from elsewhere. The generation that watched.',
        tag: null,
        outcome: 'You watch the videos on your phone. Lekki toll gate. The lights go out. When they come back on. You know what you have seen. The government said something different. You know what you saw.',
        effect: (p) => { p.m -= 8; p.r += 7; p.addFlag('nga_dep_endsars_generation'); p.setMem('ngaDepEndSars', true) },
      },
    ],
  },

  // ── THE JAPA WAVE ─────────────────────────────────────────────────────────────

  {
    id: 'nga_dep_japa',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 2020 &&
      G.age >= 20 && G.age <= 38 &&
      !G.mem?.ngaDepJapa,
    text: `Japa: Yoruba for "run fast." The wave of young Nigerians leaving in the 2020s — Canada, the UK, the US, Germany, Australia. Not the migration of the 1980s structural adjustment era, not the flight of the military years. This is different: educated, skilled, connected, choosing to leave because the naira has collapsed, the electricity does not come, the roads are what they are, SARS was what it was and was replaced by SWAT which is what SWAT is. The doctors leave and the hospitals are short. The nurses leave and the hospitals are shorter. Your classmates are in Brampton and Peckham and Calgary. The group chat has people in every time zone except this one. You are deciding.`,
    choices: [
      {
        text: 'You japa. You apply, you get through, you go.',
        tag: null,
        outcome: 'You land in the new country with two suitcases and a group chat from home that is still going. You are the newest version of the Nigerian abroad.',
        effect: (p) => { p.m += 2; p.r += 4; p.addFlag('nga_dep_japa_generation'); p.addFlag('nga_diaspora'); p.setResidency('work_visa'); p.setMem('ngaDepJapa', true) },
      },
      {
        text: 'You stay. Someone has to stay and build the place.',
        tag: null,
        outcome: 'You stay. The group chat is still going. The people who left ask how things are. You tell them honestly, which takes a particular kind of honesty.',
        effect: (p) => { p.karma += 5; p.r += 5; p.addFlag('nga_dep_stayed_generation'); p.setMem('ngaDepJapa', true) },
      },
    ],
  },

  // ── PENTECOSTAL CHURCH CULTURE ────────────────────────────────────────────────

  {
    id: 'nga_dep_pentecostal',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_SOUTH(G) &&
      G.religion === 'christian_protestant' &&
      G.currentYear >= 1985 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.ngaDepPentecostal,
    text: `Sunday: the church that takes the whole morning and half the afternoon. The megachurch or the local assembly or the mountain of fire or the RCCG parish or the Winners' Chapel. The pastor who is also a prophet. The prayer that has a specific vocabulary — "in the name of Jesus," "blood of Jesus," "I come against," "fire." The miracle testimonies and the thanksgiving testimonies and the testimony about the exam result and the testimony about the business deal. Your parents tithe ten percent. The church has a school, a hospital, a television station, a security company. The church in Nigeria is not just a place of worship — it is infrastructure.`,
    choices: null,
    effect: (p) => {
      p.s += 2
      p.m += 2
      p.addFlag('nga_dep_pentecostal_generation')
      p.setMem('ngaDepPentecostal', true)
    },
  },

]

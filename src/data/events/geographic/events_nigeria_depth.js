// events_nigeria_depth.js
// Nigeria depth: NEPA/power cuts, WAEC/JAMB examination season, Lagos go-slow,
// the #EndSARS 2020 protests, Japa emigration wave, the generator economy,
// Nollywood and Afrobeats as cultural assertion, church/mosque culture.

const IS_NIGERIA = (G) => G.character.country?.name === 'Nigeria'
const IS_SOUTH = (G) => IS_NIGERIA(G) && ['yoruba', 'igbo', 'ijaw', 'other_nigerian'].includes(G.character.ethnicity)
const IS_NORTH = (G) => IS_NIGERIA(G) && ['hausa_fulani', 'kanuri'].includes(G.character.ethnicity)
const IS_LAGOS = (G) => IS_NIGERIA(G) && G.ruralUrban === 'urban' && G.currentYear >= 1970

export const NIGERIA_DEPTH_EVENTS = [

  // ── NEPA / POWER CUTS ─────────────────────────────────────────────────────────

  {
    id: 'nga_dep_nepa',
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
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
    phase: null,
    weight: 3,
    when: (G) =>
      IS_SOUTH(G) &&
      G.religion === 'christian_protestant' &&
      G.currentYear >= 1985 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.ngaDepPentecostal,
    text: 'Sunday takes the whole morning and half the afternoon and there is a bus that comes for the people on your street. The pastor is also a prophet and the prayers have their own vocabulary, and by nine you can say all of it without being taught. Your parents put ten percent in the envelope before anything else comes out of the pay. The church has a school and a clinic and a television station, and when your uncle needs a job it is the church that finds him one.',
    context: 'Pentecostal and charismatic Christianity expanded rapidly in southern Nigeria from the 1980s, with the Redeemed Christian Church of God, Winners\' Chapel and Mountain of Fire among the largest ministries. Tithing at ten percent is standard practice. The major churches operate universities, hospitals, banks, broadcasters and employment networks, functioning as parallel social infrastructure.',
    choices: null,
    effect: (p) => {
      p.s += 2
      p.m += 2
      p.addFlag('nga_dep_pentecostal_generation')
      p.setMem('ngaDepPentecostal', true)
    },
  },

  // ── NIGERIA 2030s–2060s ───────────────────────────────────────────────────
  // The generator falls silent, the harmattan stops arriving, Lagos keeps
  // arriving, and the ones who left start coming back with foreign children.

  {
    id: 'nga_dep_solar_after_nepa',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 2030 && G.currentYear <= 2060 &&
      G.age >= 20 &&
      !G.mem?.ngaSolarSilence,
    text: 'The panels go up on the roof in April and the inverter sits in the corridor humming at a pitch you have to stand still to hear. The first evening the light comes on without the generator you all look at the bulb rather than at each other. The jerrican for the diesel stays behind the door for two more years before anybody throws it out. Your mother says she does not trust a light that does not cost anything.',
    context: 'Nigeria’s grid delivered roughly 4,000 megawatts for over 200 million people through the 2010s and 2020s, and households ran an estimated 40 million small generators. Off-grid solar-plus-battery systems fell below the lifetime cost of petrol generation during the 2020s, and the federal Energy Transition Plan targets universal access by 2030.',
    choices: null,
    effect: (p) => { p.m += 6; p.h += 3; p.mo -= 1200; p.setMem('ngaSolarSilence', true) },
  },

  {
    id: 'nga_dep_lagos_thirty_million',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_LAGOS(G) &&
      G.currentYear >= 2032 && G.currentYear <= 2065 &&
      G.age >= 25 &&
      !G.mem?.ngaLagosThirty,
    text: 'The estate where your uncle kept goats has nine towers on it and a gate with a boom and a man in a jacket. You take the rail line that was a rumour for twenty years and it runs, mostly, and the go-slow has moved to the roads that feed it. On the ride you count four cranes and lose count at the fifth. Nobody in the carriage is from Lagos and everybody in the carriage is from Lagos.',
    context: 'Lagos grew from about 1.4 million people in 1970 to roughly 16 million by 2020, and UN projections put it near 30 million by 2050 — potentially the largest city on earth. The Blue and Red Line rail corridors opened in 2023 and 2024 after two decades of construction.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 3; p.r += 3; p.setMem('ngaLagosThirty', true) },
  },

  {
    id: 'nga_dep_harmattan_missing',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 2035 && G.currentYear <= 2065 &&
      G.age >= 18 &&
      !G.mem?.ngaHarmattanMissing,
    text: 'The harmattan is late and then it is thin and then, the third year, it does not arrive at all. In December the air stays wet and the mangoes come early and wrong. Your grandmother used to rub shea butter on your legs against the cracking and you have not needed it in four seasons. The old men outside the mosque argue about which year the dust last came properly, and no two of them agree.',
    context: 'The harmattan — dry Saharan air moving south between November and March — has shortened and weakened across West Africa as Sahel rainfall patterns shift. Northern Nigeria warmed roughly 1.5°C over the twentieth century, faster than the global average, and projections put parts of the north above survivable wet-bulb thresholds for periods of the century’s second half.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 3; p.addFlag('witnessed_climate_change'); p.addFlag('climate_generation'); p.setMem('ngaHarmattanMissing', true) },
  },

  {
    id: 'nga_dep_japa_children_visit',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 2035 && G.currentYear <= 2065 &&
      G.age >= 45 &&
      !G.mem?.ngaJapaChildren,
    text: 'Your brother’s children come for three weeks in August and they call you aunty in an accent that arrives a half-second late. They do not eat the pepper. They take photographs of the road and of the woman selling agbalumo and of the church, and they are careful, the way people are careful in a house they are visiting. On the last night the youngest asks you to say her name properly, twice, and writes it down.',
    choices: [
      {
        text: 'Teach her the name and the four sentences that go with it.',
        tag: null,
        outcome: 'She practises it at the airport and gets it right on the third attempt. She sends you a voice note in October with the sentences in it, and one of them is wrong, and you keep it anyway.',
        effect: (p) => { p.m += 7; p.karma += 4; p.setMem('ngaJapaChildren', true) },
      },
      {
        text: 'Say it once and let it go. They have their own country.',
        tag: null,
        outcome: 'They fly on the Sunday. You wash the plates they used and put them back in the cupboard they came from, and the house is the size it was before.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('nga_dep_japa_generation'); p.setMem('ngaJapaChildren', true) },
      },
    ],
  },

  {
    id: 'nga_dep_last_cash',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NIGERIA(G) &&
      G.currentYear >= 2030 && G.currentYear <= 2055 &&
      G.age >= 25 &&
      !G.mem?.ngaLastCash,
    text: 'The woman at the roasted corn will not take the note. She turns her phone around so you can see the code and waits while you find it, and the whole transaction is four seconds and no hands. You still keep folded naira in the inside pocket for the danfo conductor and for the church basket and for your mother, who does not have the app and will not be getting it. The notes in there have gone soft as cloth.',
    context: 'Nigeria’s eNaira launched in 2021 as one of the first central bank digital currencies, and the cash-swap crisis of early 2023 pushed tens of millions of people onto transfer apps in a matter of weeks. Mobile-money and instant-transfer volumes have grown faster in Nigeria than anywhere else in Africa outside Kenya.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.setMem('ngaLastCash', true) },
  },

]

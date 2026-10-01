// events_iraq_depth.js
// Iraq depth: Yazidi identity and the world before Sinjar, the Mesopotamian
// marshes and Saddam's draining of them, the 1991 uprising watched from across
// the Euphrates, the sanctions-era pharmacies, Iraqi Christians and Christmas
// in Baghdad, the 2003–2008 diaspora in Amman, the Kurdish north's boom years,
// and the marsh reflooding after 2003.
// Companion to events_iraq.js (Kurdish perspective in events_kurdish.js).

const IS_IRAQ = (G) => G.character.country?.name === 'Iraq'
const IS_YAZIDI = (G) => IS_IRAQ(G) && (G.character.ethnicity === 'other_iraqi' || G.religion === 'yezidi')
const IS_SHIA = (G) => IS_IRAQ(G) && G.character.ethnicity === 'arab_iraqi_shia'
const IS_CHRISTIAN = (G) => IS_IRAQ(G) && (G.religion === 'christian_catholic' || G.religion === 'christian_orthodox' || G.religion === 'christian_other')
const IS_KURDISH_IRAQ = (G) => IS_IRAQ(G) && G.character.ethnicity === 'kurdish_iraqi'

export const IRAQ_DEPTH_EVENTS = [

  // ── YAZIDI IDENTITY ──────────────────────────────────────────────────────────

  {
    id: 'irq_dep_yazidi_identity',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_YAZIDI(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2014 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.irqYazidiIdentity,
    text: `Tawsi Melek, the Peacock Angel, is not the devil outsiders take him for, and that is the first thing you learn and the thing you carry always. The faith is older than Islam, perhaps older than Abraham; the sacred books are kept in copper vessels and not shown to outsiders; the castes of sheikh, pir and murid are how knowledge is handed down. You are Yazidi, in Sinjar or the Nineveh Plains. Your world is older than most people realise.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 2
      p.addFlag('irq_dep_yazidi_generation')
      p.setMem('irqYazidiIdentity', true)
    },
  },

  {
    id: 'irq_dep_lalish_pilgrimage',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_YAZIDI(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2014 &&
      G.age >= 12 && G.age <= 25 &&
      G.flags.has('irq_dep_yazidi_generation') &&
      !G.mem?.irqLalish,
    text: `Lalish is in the mountains near Duhok, in the Kurdish north. You go once a year, or once in several years, with family. The conical towers, the sanctuaries carved into the rock, the sacred spring. You must walk barefoot on the grounds. The pilgrimage connects you to Yazidis who have come from Germany, from Australia, from the diaspora that has already partly scattered. At Lalish the community has its own gravity. Here you understand who your people are beyond the village, beyond Sinjar.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.e += 2
      p.setMem('irqLalish', true)
    },
  },

  // ── THE MESOPOTAMIAN MARSHES ──────────────────────────────────────────────────

  {
    id: 'irq_dep_marsh_world',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_SHIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.irqMarshWorld,
    text: `The Mesopotamian marshes between the Tigris and Euphrates are a world made of water and reed. The Ma'dan — the Marsh Arabs — have lived here for millennia in floating villages, houses built on artificial islands of layered reed, moved when the water dictates. The water buffalo in the channels between the reed islands. The birds in their thousands. The fish traps. The quality of the air and light over open water that is also not ocean, that is something older — this is what some believe is the Garden of Eden. You are growing up in it.`,
    choices: null,
    effect: (p) => {
      p.e += 2
      p.m += 4
      p.addFlag('irq_dep_marsh_generation')
      p.setMem('irqMarshWorld', true)
    },
  },

  {
    id: 'irq_dep_marsh_drained',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_SHIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1991 && G.currentYear <= 2003 &&
      G.flags.has('irq_dep_marsh_generation') &&
      !G.mem?.irqMarshDrained,
    text: `After the 1991 uprising Saddam drains the marshes: dams, diversions, embankments, and in a decade the wetlands are a tenth of what they were. The floating villages are desert; the buffalo are gone; the birds that nested here since before anyone wrote anything down do not come. The government calls it land reclamation. The Marsh Arabs go to camps in Iran and the slums of Basra and Baghdad. The world you grew up in has been unmade by decree.`,
    choices: null,
    effect: (p) => {
      p.m -= 15
      p.r += 10
      p.h -= 3
      p.addFlag('irq_dep_marsh_displaced')
      p.setMem('irqMarshDrained', true)
    },
  },

  // ── THE 1991 UPRISING ─────────────────────────────────────────────────────────

  {
    id: 'irq_dep_1991_uprising',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_SHIA(G) &&
      G.currentYear === 1991 &&
      G.age >= 15 && G.age <= 45 &&
      !G.mem?.irq1991Uprising,
    text: 'In March the Ba\'ath office in your district is empty and the door is open and people are carrying files out into the street. For eight days the prisons are opened and men who have been gone for years walk home. The American armour sits across the Euphrates and does not move. Then the helicopters come, which the ceasefire had permitted them to keep, and by the end of the month the men who walked home have gone again.',
    context: 'George H. W. Bush called on Iraqis to rise against Saddam Hussein as the Gulf War ended. Uprisings began in Basra in early March 1991 and spread across the Shia south and the Kurdish north. Coalition forces did not intervene, and the ceasefire terms permitted Iraq to fly helicopters, which were used against the rebels. Tens of thousands were killed; the mass graves were exhumed after 2003.',
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 9
      p.addFlag('irq_dep_1991_generation')
      p.setMem('irq1991Uprising', true)
    },
  },

  // ── SANCTIONS ERA DAILY LIFE ──────────────────────────────────────────────────

  {
    id: 'irq_dep_sanctions_daily',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_IRAQ(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2002 &&
      G.age >= 20 &&
      !G.mem?.irqSanctionsDaily,
    text: `The pharmacies' shortages are not a disruption but the permanent condition: not this month, not in this district. A teacher's salary is worth a few dollars, and the state flour sometimes has sand in it. The engineers, doctors and teachers the oil money made are eating their last savings, while Oil-for-Food provides some things and not others, through a system the government can bend. You are educated and resourceful and you are managing. Others are not.`,
    context: 'UN sanctions on Iraq ran from 1990 to 2003; the Oil-for-Food programme began in 1996.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.w -= 4
      p.e += 2
      p.setMem('irqSanctionsDaily', true)
    },
  },

  // ── IRAQI CHRISTIANS ─────────────────────────────────────────────────────────

  {
    id: 'irq_dep_christian_before',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_CHRISTIAN(G) && IS_IRAQ(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2003 &&
      G.age >= 6 && G.age <= 25 &&
      !G.mem?.irqChristianBefore,
    text: `The Chaldean Catholic church on the corner of this street has been here since the Ottoman era. Christmas in Baghdad is not secret — the lights, the holiday, the relatives coming from across the city for the celebration. Iraq's Christians — Chaldean, Assyrian, Syriac — have been here since the first century. The language some of them still use in the liturgy is Aramaic, the language of Christ. They are a minority, they know this, but they are a minority that was, until now, protected. They are doctors and teachers and traders; they have been here longer than Islam has been in Iraq.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m += 2
      p.addFlag('irq_dep_christian_generation')
      p.setMem('irqChristianBefore', true)
    },
  },

  {
    id: 'irq_dep_christian_exodus',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CHRISTIAN(G) && IS_IRAQ(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2015 &&
      G.age >= 20 &&
      !G.mem?.irqChristianExodus,
    text: `After 2003 the threat is particular: the envelope under the door, the phone call, the bomb at the church gate. The families you grew up with are in Sweden, in Detroit, in Sydney. On Sundays the church holds the old, and the ones who could not leave, and the ones who would not on principle. The church still stands. The congregation does not.`,
    context: 'Iraq\'s Christian population fell from about 1.4 million in 2003 to around 250,000 by the late 2010s.',
    choices: [
      {
        text: 'Leave. Iraq is not safe for your family.',
        tag: null,
        outcome: 'You join the diaspora. The departure resolves nothing. It is a grief for the place and the community you are leaving behind.',
        effect: (p) => { p.m -= 10; p.r += 8; p.setResidency('work_visa'); p.setMem('irqChristianExodus', true) },
      },
      {
        text: 'Stay. This is your country too.',
        tag: null,
        outcome: 'You stay. You are among fewer and fewer. The church fills less each year. But you are still there.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('irq_dep_christian_stayed'); p.setMem('irqChristianExodus', true) },
      },
    ],
  },

  // ── DIASPORA IN AMMAN ─────────────────────────────────────────────────────────

  {
    id: 'irq_dep_amman_diaspora',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_IRAQ(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2009 &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.irqAmmanDiaspora,
    text: `Amman holds half a million Iraqis by 2006. The Swiefieh neighbourhood of Amman has Iraqi restaurants, Iraqi mobile phone shops, Iraqi travel agents who know the visa requirements for Canada, Sweden, Australia, and the US to the level of detail that survival requires. You are waiting: for an interview date, for a decision, for the resettlement agency to call. Your Jordanian visa must be renewed every month. You are spending money that was substantial when you left Baghdad and is becoming less substantial. The waiting teaches you a great deal about time.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.e += 2
      p.addFlag('irq_dep_diaspora_amman')
      p.setMem('irqAmmanDiaspora', true)
    },
  },

  // ── KURDISH NORTH: THE BOOM YEARS ─────────────────────────────────────────────

  {
    id: 'irq_dep_kurdish_north_boom',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_KURDISH_IRAQ(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2013 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.irqKurdishBoom,
    text: `While Baghdad burns, Erbil builds. The Kurdistan Region's skyline is cranes: hotels, shopping malls, residential towers, a new airport terminal. Foreign investment is coming — Turkish companies, American oil firms, European contractors. The streets of Erbil and Sulaymaniyah are the safest in Iraq, possibly the safest they have ever been. You are Kurdish and you are watching your region transform in ways that felt impossible during the Ba'ath years. The question of what the region becomes — and its relationship to Baghdad, to independence — runs beneath every building going up.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.w += 3
      p.e += 2
      p.setMem('irqKurdishBoom', true)
    },
  },

]

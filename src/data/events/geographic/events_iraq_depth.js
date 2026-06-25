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
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_YAZIDI(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2014 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.irqYazidiIdentity,
    text: `The Peacock Angel — Tawsi Melek — is not the devil the Muslims think he is. This is the first and most important distinction. You learn it early and carry it always: the theology that outsiders collapse into condemnation is, from the inside, something more careful, more ancient, more strange. The religion predates Islam and may predate the Abrahamic faiths entirely. The sacred books are kept in copper vessels and are not shown to non-Yazidis. The castes — sheikh, pir, murid — are not arbitrary; they are the structure through which knowledge is transmitted. You are Yazidi in Sinjar and in the Nineveh Plains. Your world is specific and older than most people realise.`,
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
    phase: 'adolescence',
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
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_SHIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.irqMarshWorld,
    text: `The Mesopotamian marshes between the Tigris and Euphrates are a world made of water and reed. The Ma'dan — the Marsh Arabs — have lived here for millennia in floating villages, houses built on artificial islands of layered reed, moved when the water dictates. The water buffalo in the channels between the reed islands. The birds in their thousands. The fish traps. The specific quality of the air and light over open water that is also not ocean, that is something older — this is what some believe is the Garden of Eden. You are growing up in it.`,
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
    text: `After the 1991 uprising, Saddam drains the marshes. Dams, diversions, embankments — the Mesopotamian wetlands that covered 20,000 square kilometres are reduced to ten percent of their original extent in twelve years. The floating villages are now desert. The water buffalo are gone. The birds that nested here since before recorded history no longer come. The government calls it an agricultural reclamation project. The marsh Arabs, hundreds of thousands of them, are displaced — into refugee camps in Iran, into the slums of Basra and Baghdad. The world you grew up in has been unmade by decree.`,
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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_SHIA(G) &&
      G.currentYear === 1991 &&
      G.age >= 15 && G.age <= 45 &&
      !G.mem?.irq1991Uprising,
    text: `March 1991. The Gulf War has just ended. Saddam is weakened, his forces retreating from Kuwait. An uprising begins in Basra — spontaneous, angry, without central coordination. The south rises: Shia Iraqis taking government buildings, freeing political prisoners, turning on the Ba'ath party infrastructure that controlled every aspect of life. The American forces are twenty miles away, across the Euphrates. They do not intervene. George H.W. Bush had called on Iraqis to rise up, and they rose up, and the Americans watch. Saddam uses helicopter gunships — the ceasefire allowed them — and tanks. In two weeks the uprising is crushed. The mass graves of 1991 will be found after 2003.`,
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_IRAQ(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2002 &&
      G.age >= 20 &&
      !G.mem?.irqSanctionsDaily,
    text: `The pharmacies have shortages that are not a temporary disruption but the permanent condition. You go with a prescription and the pharmacist shakes his head — not this month, not in this district. The teachers' salary is now worth twelve dollars. The flour at the state distribution point sometimes has sand in it. The middle class that Iraq's oil wealth built — the engineers, doctors, teachers — is eating into its last savings. The UN Oil-for-Food programme provides some things and not others and is administered through a system that Saddam's government can partially redirect. You are educated and resourceful and you are managing. Others are not managing.`,
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
    phase: 'childhood',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CHRISTIAN(G) && IS_IRAQ(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2015 &&
      G.age >= 20 &&
      !G.mem?.irqChristianExodus,
    text: `After 2003 the threat is specific: the envelope under the door, the phone call, the bomb at the church entrance. The Christian communities of Iraq numbered 1.4 million in 2003. By 2014 it is 400,000. By 2018 it is 250,000. The families you grew up with are in Sweden, in Detroit, in Sydney. The church is attended now by old people and by those who stayed because they could not leave or would not leave on principle. The neighbourhood that was the neighbourhood of your community has changed. The church still stands. The congregation has not.`,
    choices: [
      {
        text: 'Leave. Iraq is not safe for your family.',
        tag: null,
        outcome: 'You join the diaspora. The departure is not a resolution. It is a different kind of grief — for the place and the community you are leaving behind.',
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
    phase: 'midlife',
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
    phase: 'young_adult',
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

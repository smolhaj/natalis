// BUILD 55 — Rohingya arc (BUILD 7: Stateless Peoples)
// ~1 million Rohingya in Myanmar. Citizenship Law 1982: stateless.
// Not permitted to travel freely, access higher education, work in most professions,
// or marry without government permission.
// August 25, 2017: military "clearance operations" — villages burned, mass killings,
// 700,000+ flee to Bangladesh in 3 months. UN calls it textbook ethnic cleansing.
// Cox's Bazar, Bangladesh: world's largest refugee camp. 1 million people.

const IS_ROHINGYA = (G) => G.character.ethnicity === 'rohingya'
const IS_MYANMAR = (G) => G.character.country?.name === 'Myanmar'
const IS_RAKHINE = (G) => IS_ROHINGYA(G) && IS_MYANMAR(G)

export const ROHINGYA_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'roh_coxs_bazar_years',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('rohingya_displacement') && G.age >= 30 && !G.mem.rohCoxsYears,
    text: 'You have been in the camp for five years. Block E, section twelve. You know it as a place with streets and neighbours and a community centre and a school that teaches in Burmese, which your children speak less well than the Rohingya they hear at home. The UNHCR resettlement officer comes once a year. The list you may be on is not a list you can see.',
    choices: [
      {
        text: 'Register again. Keep pushing for resettlement.',
        tag: 'pushed',
        outcome: 'You re-register. A caseworker notes your interview date as pending. You have been pending for two years.',
        effect: (p) => { p.m -= 8; p.setMem('rohCoxsYears', true) },
      },
      {
        text: 'Build something inside the camp while waiting.',
        tag: 'built',
        outcome: 'You run a small repair stall. You teach younger children what you know. The camp is not a life but it is where your life is, and you choose not to wait for it to become something else before you live it.',
        effect: (p) => { p.m += 5; p.karma += 6; p.setMem('rohCoxsYears', true) },
      },
    ],
  },

  {
    id: 'roh_diaspora_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('rohingya_resettled') && G.age >= 60 && !G.mem.rohDiasLate,
    text: 'You have citizenship somewhere. A passport with your name spelled correctly and a photograph that looks like you. You hold it sometimes and think about the 1982 law — the list of 135 national races the government recognised, and the one that was not on the list. Your children were born here. They have never been stateless. This is not a small thing.',
    effect: (p) => { p.m += 6; p.setMem('rohDiasLate', true) },
  },

  // ── STATELESS LIFE (pre-2017) ─────────────────────────────────────────────

  {
    id: 'roh_stateless_document',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_RAKHINE(G) && G.currentYear >= 1982 && G.currentYear <= 2016 && G.age >= 16 && !G.mem.rohStatelessDoc,
    text: 'The form asks for your nationality. The options do not include Rohingya. In 1982 the Citizenship Law defined 135 national races; Rohingya was not among them. You were born here. Your father was born here. His father\'s father was born here. The document you hold says you are a "temporary resident" of the country where your family has lived for generations.',
    effect: (p) => { p.m -= 12; p.e -= 2; p.addFlag('rohingya_stateless'); p.setMem('rohStatelessDoc', true) },
  },

  {
    id: 'roh_restricted_movement',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_RAKHINE(G) && G.flags.has('rohingya_stateless') && G.age >= 18 && G.age <= 35 && !G.mem.rohMovement,
    text: 'To travel to the next township you need a permit. The permit costs money and takes days and may be refused without reason. Your cousin wanted to take his sick child to the hospital in Sittwe; the permit came back denied. He went anyway and was stopped at the checkpoint. The child\'s condition resolved before the permit was reapplied for. Not everyone\'s does.',
    choices: [
      {
        text: 'Navigate the permit system. Pay what it costs.',
        tag: 'navigated',
        outcome: 'You learn what the actual process is — which official, which envelope, which timing. This knowledge is expensive and necessary.',
        effect: (p) => { p.m -= 8; p.mo -= 500; p.setMem('rohMovement', true) },
      },
      {
        text: 'Move without the permit when you must.',
        tag: 'moved_without',
        outcome: 'You are stopped twice in a year. Both times you pay. The calculation is that the bribe is less than the permit time, and you are not always wrong.',
        effect: (p) => { p.m -= 10; p.mo -= 300; p.setMem('rohMovement', true) },
      },
    ],
  },

  // ── 2017 DISPLACEMENT ─────────────────────────────────────────────────────

  {
    id: 'roh_village_burning',
    phase: 'midlife',
    weight: 5,
    when: (G) => IS_RAKHINE(G) && G.currentYear === 2017 && !G.flags.has('rohingya_displacement') && !G.mem.rohVillageBurn,
    text: 'August 25. The clearance operations begin before dawn. By midday, the smoke is visible from the next village. You have heard the helicopters since four in the morning. The sound that comes from the direction of the village two kilometres north is not a sound you want to identify. You have two hours before the soldiers arrive or you do not have two hours — the information is unreliable and the penalty for waiting to find out is death.',
    choices: [
      {
        text: 'Go immediately. Take the children and go.',
        tag: 'fled_immediately',
        outcome: 'You walk for four days to the river. The boat across costs everything you have. Bangladesh is across the water and Bangladesh does not want you but Bangladesh is not burning.',
        effect: (p) => { p.m -= 28; p.h -= 10; p.addFlag('rohingya_displacement'); p.addFlag('refugee_status'); p.setResidency('refugee_status'); p.setMem('rohVillageBurn', true) },
      },
      {
        text: 'Try to find out what is happening first.',
        tag: 'waited',
        outcome: 'A neighbour who came back from the next village tells you what they saw. You leave within the hour. The delay cost you the livestock you could not take.',
        effect: (p) => { p.m -= 30; p.h -= 12; p.addFlag('rohingya_displacement'); p.addFlag('refugee_status'); p.setResidency('refugee_status'); p.setMem('rohVillageBurn', true) },
      },
    ],
  },

  {
    id: 'roh_crossing',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.has('rohingya_displacement') && G.currentYear === 2017 && !G.mem.rohCrossing,
    text: 'The Naf River. At the crossing point there are hundreds of people waiting for the same small number of boats. The boatmen charge. People are carrying children, elderly parents, what remained after the walk. The crossing itself is twenty minutes. Bangladesh receives you in the specific way of a country that cannot legally refuse you and refuses to want you. The camp at Cox\'s Bazar is already larger than most cities.',
    effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('rohingya_coxs_bazar'); p.setMem('rohCrossing', true) },
  },

  // ── RESETTLEMENT (late arc) ───────────────────────────────────────────────

  {
    id: 'roh_resettlement_interview',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('rohingya_coxs_bazar') && G.age >= 28 && G.age <= 55 && !G.mem.rohResettlementInterview,
    text: 'The UNHCR interview is in a prefab office in the camp. The caseworker has a form with columns. They ask about the date of the clearance operation, the name of your village, whether you have any documents. You do not have documents — the documents were in the house that was burned. They ask you to describe what you saw. The column is twelve centimetres wide.',
    choices: [
      {
        text: 'Answer every question completely.',
        tag: 'answered',
        outcome: 'The interview concludes. You are told your case is under review. You are not told what the timeline is. The caseworker has seventy-three interviews this week.',
        effect: (p) => { p.m -= 10; p.setMem('rohResettlementInterview', true) },
      },
      {
        text: 'You find it impossible to describe in this room.',
        tag: 'struggled',
        outcome: 'The caseworker notes "interview incomplete." A follow-up is scheduled. You leave and sit outside for an hour before you can walk.',
        effect: (p) => { p.m -= 15; p.h -= 3; p.setMem('rohResettlementInterview', true) },
      },
    ],
  },

  {
    id: 'roh_resettlement_arrives',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('rohingya_coxs_bazar') && G.age >= 32 && !G.flags.has('rohingya_resettled') && !G.mem.rohResettled,
    text: 'The letter says Canada. Or Malaysia. Or Saudi Arabia without rights. The countries that accept Rohingya resettlement are a short list and each has its own complications. You have been in the camp for three years, or six years, or nine years. The letter is real.',
    choices: [
      {
        text: 'Go. Whatever country it is.',
        tag: 'went',
        outcome: 'The flight is the first plane you have been on. The arrival is overwhelming in the specific way of a place designed for people with luggage and plans.',
        effect: (p) => { p.m += 10; p.addFlag('rohingya_resettled'); p.addFlag('emigrated'); p.setResidency('refugee_status'); p.setMem('rohResettled', true) },
      },
      {
        text: 'Your family is still in the camp. You can\'t leave them.',
        tag: 'stayed_for_family',
        outcome: 'You defer the resettlement offer. The next interview may come in two years or may not come at all. You are with your family.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('rohResettled', true) },
      },
    ],
  },
]

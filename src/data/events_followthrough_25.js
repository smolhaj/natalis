// Follow-through events (MODE C): callbacks for never-checked flags and
// Sudan 2023 civil war echo.
// Flags covered: gambler, experienced_displacement, reluctant_parent,
// sdn_khartoum_war_generation, sdn_khartoum_displaced, zan_zendegi_azadi (late),
// sudan_revolution_generation (late reckoning after 2023 war).

export const FOLLOWTHROUGH_25_EVENTS = [

  // ── GAMBLER ──────────────────────────────────────────────────────────────────
  // The midlife accounting of gambling as a habit.

  {
    id: 'ft25_gambler_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('gambler') &&
      !G.mem?.ft25GamblerMid,
    text: 'The gambling started as something occasional and became a habit, or it was always a habit and you are only now honest about that. You know the specific pull of it: the moment before the outcome, which is the only moment in the day when the result is still open. Your regular life has plenty of uncertainty but no single moment where everything resolves cleanly in under two minutes. The table offers that. The cost is the arithmetic of what it has taken from you — money, mostly, but also the hours and occasionally the trust of someone who knew about the hours.',
    choices: [
      {
        text: 'You have stopped — the accounting was finally clear enough.',
        tag: null,
        outcome: 'The stopping was not easy. It is not the same as the pull going away. You still know where the tables are.',
        effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft25GamblerMid', true) },
      },
      {
        text: 'You still gamble — you have it under a kind of control.',
        tag: null,
        outcome: 'The control is real until it is not. You have had both versions.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('ft25GamblerMid', true) },
      },
    ],
  },

  // ── EXPERIENCED DISPLACEMENT ─────────────────────────────────────────────────
  // The specific knowledge of someone who was made to leave.

  {
    id: 'ft25_displacement_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('experienced_displacement') &&
      !G.mem?.ft25DispMid,
    text: 'You have been a person who was made to leave. Not emigration — that word does not fit. Removal. The country or city that was yours ceased to be yours by someone\'s decision. You carry the inventory of that: the weight of objects packed under pressure, the things you could not take, the texture of the last morning before you left. People who have never been removed from a place understand home as a given. You know it as something that was given and then taken, which means you understand something about belonging that they do not.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft25DispMid', true) },
  },

  {
    id: 'ft25_displacement_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('experienced_displacement') &&
      G.age >= 55 &&
      !G.mem?.ft25DispLate,
    text: 'In late life, the displacement is the thing you return to when you think about what shaped the rest. Not in grief — or not only grief — but as the point from which the subsequent chapters have to be measured. The life after the removal is also a full life; you have made it so. You are still the person who was made to leave. You are also the person who arrived somewhere and built the rest of it anyway.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.karma += 3; p.setMem('ft25DispLate', true) },
  },

  // ── RELUCTANT PARENT ─────────────────────────────────────────────────────────
  // The reckoning with having been uncertain about parenthood.

  {
    id: 'ft25_reluctant_parent_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('reluctant_parent') &&
      !G.mem?.ft25ReluctantParent,
    text: 'The child you were uncertain about is older now — past the years when the reluctance was the whole story. You have discovered, in practice, that you became someone you were not fully sure you would become. The parent you are is not the parent you feared you would be. Whether this is growth or simply the fact that children require it from you regardless of your reservations is a question you have thought about and not entirely resolved. The child probably does not know you were uncertain. You have not decided whether to tell them.',
    choices: [
      {
        text: 'You are glad you became the parent. The reluctance was real but so is this.',
        tag: null,
        outcome: 'Both things were real. The one that lasted is the relationship.',
        effect: (p) => { p.m += 9; p.karma += 4; p.setMem('ft25ReluctantParent', true) },
      },
      {
        text: 'The reluctance was a signal you should have listened to. It has cost both of you.',
        tag: null,
        outcome: 'The accounting is honest. It does not mean the relationship is over.',
        effect: (p) => { p.r += 8; p.m -= 3; p.setMem('ft25ReluctantParent', true) },
      },
    ],
  },

  // ── SUDAN 2023 CIVIL WAR ECHO ────────────────────────────────────────────────
  // Follow-through for people who survived the Khartoum fighting.

  {
    id: 'ft25_khartoum_war_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sdn_khartoum_war_generation') &&
      G.age >= 50 &&
      !G.mem?.ft25KhartoumEcho,
    text: 'Khartoum is a different city now. The fighting lasted longer than anyone expected and did not end cleanly — it shifted, paused, resumed elsewhere in the country. The neighbourhood you lived in has been rebuilt, or abandoned, or is still carrying the damage in its walls and streets. You read the new skyline differently from the people who were not there. You know which routes were safe in which months, which buildings were occupied. That specific knowledge fades but does not disappear. It becomes part of how you navigate a city even years after it has changed.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft25KhartoumEcho', true) },
  },

  {
    id: 'ft25_khartoum_displaced_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sdn_khartoum_displaced') &&
      !G.mem?.ft25KhartoumDisp,
    text: 'You left Khartoum with what you could carry. Since then you have been in Egypt, or Saudi Arabia, or another Sudanese city, or somewhere further — the geography of the Sudanese diaspora in 2023 and after stretches across the continent and beyond. The city you left exists in the version you last saw it. Photographs and calls from people who went back give you updates, but the city in your memory and the city that exists are no longer the same city. They share a name. You are not sure when you will go back, or what going back would mean.',
    choices: [
      {
        text: 'You intend to return. Sudan is where you belong.',
        tag: null,
        outcome: 'The intention is real. The return is contingent on things that are not yet resolved.',
        effect: (p) => { p.r += 7; p.m += 3; p.setMem('ft25KhartoumDisp', true) },
      },
      {
        text: 'You have begun to build a life here. Return is no longer certain.',
        tag: null,
        outcome: 'The building is real. The guilt of building is also real.',
        effect: (p) => { p.m += 5; p.r += 5; p.setMem('ft25KhartoumDisp', true) },
      },
    ],
  },

  // ── ZAN, ZENDEGI, AZADI — LATE RECKONING ────────────────────────────────────
  // 5+ years on from the 2022 Iran uprising.

  {
    id: 'ft25_zan_zendegi_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('zan_zendegi_azadi') &&
      G.currentYear >= 2027 &&
      G.age >= 50 &&
      !G.mem?.ft25ZanLate,
    text: 'Five years on, or more, from September 2022 and the streets and the slogan. The Islamic Republic is still there. Mahsa Amini is still dead. The people who were killed in the crackdown are still dead. The generation that stood in the streets is older — some in prison, some in exile, some still in Iran doing the smaller daily acts of refusal that do not make headlines but accumulate. What the uprising meant, whether it was a beginning or a pivot point whose meaning is still unresolved, is a question that the years have not yet answered. You know what it felt like to be in it. That knowledge is separate from the outcome.',
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 5; p.setMem('ft25ZanLate', true) },
  },

  // ── SUDAN REVOLUTION GENERATION — AFTER THE 2023 WAR ────────────────────────
  // For the people who were at the 2019 sit-in: looking back after 2023.

  {
    id: 'ft25_sdn_revolution_after_war',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sudan_revolution_generation') &&
      G.currentYear >= 2024 &&
      G.age >= 45 &&
      !G.mem?.ft25SdnRevWar,
    text: 'You were at the sit-in when Bashir fell. You know what the singing sounded like. You know who was next to you in the crowd and where they are now — some still in Khartoum, some in Egypt, some in the country\'s interior, one or two in the ground. The 2023 war was fought between the same factions that spent the transition pretending to share it. What you stood for in 2019 was not what they were fighting over. That distinction matters to you. You are not sure it matters to history.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 4; p.karma += 4; p.setMem('ft25SdnRevWar', true) },
  },

]

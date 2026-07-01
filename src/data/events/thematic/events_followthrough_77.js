// events_followthrough_77.js
// Follow-through events for Iran depth (events_iran_depth.js) and
// existing Iran flags: green_movement_generation, zan_zendegi_azadi

export const FOLLOWTHROUGH_77_EVENTS = [

  // ── IRAN-IRAQ WAR SOLDIER FOLLOW-THROUGHS ────────────────────────────────

  {
    id: 'ft77_war_soldier_body',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_iraq_war_soldier') &&
      G.currentYear >= 1990 &&
      G.age >= 30 &&
      !G.mem?.ft77WarSoldierBody,
    text: 'The doctor calls the condition a musculoskeletal complaint. The paperwork from the Bonyad-e Janbazan — the Veterans Foundation — calls it a service injury. What you call it is the thing you feel in the cold. The war ended in 1988. What the war left in the body did not end in 1988. You have found the vocabulary for this gradually: not broken, not fine, not trauma in the clinical sense, just the body having been somewhere and carrying the somewhere with it. The foundation processes the paperwork slowly.',
    choices: null,
    effect: (p) => {
      p.h -= 4
      p.m -= 3
      p.r += 5
      p.setMem('ft77WarSoldierBody', true)
    },
  },

  {
    id: 'ft77_war_soldier_silence',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_iraq_war_soldier') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft77WarSoldierSilence,
    text: 'The war is official memory now — the Sacred Defence, the term the state uses. The murals are on the walls of every city: the faces of the martyrs, the Imam\'s statement about drinking poison to accept the ceasefire, the years 1980–1988. What the murals do not show is what the front actually was. The human wave tactics. The plastic keys. The men who came back in the zinc coffins before the ceasefire. You have a specific relationship to the official memory: you were there, and the mural is not where you were.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.e += 2
      p.setMem('ft77WarSoldierSilence', true)
    },
  },

  // ── MARTYR CHILD FOLLOW-THROUGHS ─────────────────────────────────────────

  {
    id: 'ft77_martyr_child_state',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_martyr_child') &&
      G.currentYear >= 1995 &&
      G.age >= 18 &&
      !G.mem?.ft77MartyrChildState,
    text: 'The certificate from the Bonyad-e Shahid is a piece of paper that gives you priority for housing, university admission, and monthly income. It is also a piece of paper that announces, in any government office you walk into, what your family\'s relationship to the state is. The photograph on the wall is yours. The certificate is also the state\'s. The state uses the photograph for the murals, the anniversaries, the commemorations. The grief is personal. The uses the state finds for the grief are not personal. You have learned to separate these things imperfectly.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 4
      p.e += 3
      p.setMem('ft77MartyrChildState', true)
    },
  },

  {
    id: 'ft77_martyr_child_identity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_martyr_child') &&
      G.currentYear >= 2000 &&
      G.age >= 35 &&
      !G.mem?.ft77MartyrChildIdentity,
    text: 'You are the age your father was in the photograph. This happens at some point to every child of a martyr — the convergence, the year when your age catches up with the image on the wall. He is younger than you now. The image does not update. You are older than he ever was. There is no language in the official commemoration for this specific thing.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 7
      p.setMem('ft77MartyrChildIdentity', true)
    },
  },

  // ── GREEN MOVEMENT GENERATION FOLLOW-THROUGHS ─────────────────────────────

  {
    id: 'ft77_green_movement_suppressed',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('green_movement_generation') &&
      G.currentYear >= 2013 &&
      G.age >= 30 &&
      !G.mem?.ft77GreenMovement,
    text: 'Rouhani wins in 2013. The reformists are cautiously optimistic — again. You have done this before: the cautious optimism, the watching, the calibration of what the new president can and cannot do within a system whose limits he did not set. You were on the street in 2009 or watching from the window. The movement was suppressed. The suppression is not the end of the story, Rouhani says without saying it directly. You have learned to be careful with this kind of sentence.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.e += 2
      p.setMem('ft77GreenMovement', true)
    },
  },

  {
    id: 'ft77_green_to_mahsa',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('green_movement_generation') &&
      G.flags.has('zan_zendegi_azadi') &&
      G.currentYear >= 2022 &&
      G.age >= 30 &&
      !G.mem?.ft77GreenToMahsa,
    text: 'You were in 2009 and you are in 2022. The chant in 2009 was "Where is my vote?" — a demand addressed to the system, asking the system to correct itself. The chant in 2022 is "Woman, Life, Freedom" — a demand that does not address the system, that addresses something beyond what the system can give. You understand the difference. The thirteen years between them are the difference.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.karma += 4
      p.setMem('ft77GreenToMahsa', true)
    },
  },

  // ── ZAN ZENDEGI AZADI FOLLOW-THROUGHS ────────────────────────────────────

  {
    id: 'ft77_mahsa_aftermath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('zan_zendegi_azadi') &&
      G.currentYear >= 2023 &&
      G.age >= 16 &&
      !G.mem?.ft77MahsaAftermath,
    text: 'The protests were suppressed. The Islamic Republic did not fall. What happened instead: the morality police disappeared from the streets for a year and then returned in a different form. Women who walk without covering in certain neighbourhoods are not arrested. In other neighbourhoods they are. The enforcement is inconsistent in a way that may be policy or may be implementation — it is not possible from the outside to know which. The revolution that did not complete itself left something in the air that is not quite victory and not quite defeat. You are living in the not-quite.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.e += 2
      p.setMem('ft77MahsaAftermath', true)
    },
  },

  {
    id: 'ft77_mahsa_diaspora_distance',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('zan_zendegi_azadi') &&
      G.flags.has('irn_post_2022_departure') &&
      G.currentYear >= 2023 &&
      G.age >= 22 &&
      !G.mem?.ft77MahsaDiaspora,
    text: 'You followed the protests from outside Iran — the livestreams, the Telegram channels, the Instagram accounts that went dark when the person running them was arrested. The distance meant safety. The distance also meant that the thing you were watching happened to people you knew, in streets you knew, and you were not in the street. You protested in front of the embassy. You translated for journalists. The embassy front and the street in Tehran are not the same thing, and you know this with a specificity that people who were never going to be in the street do not understand.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m -= 5
      p.karma += 3
      p.setMem('ft77MahsaDiaspora', true)
    },
  },

  // ── 1988 PRISON MASSACRE FOLLOW-THROUGH ──────────────────────────────────

  {
    id: 'ft77_1988_silence',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_1988_loss') &&
      G.currentYear >= 2000 &&
      G.age >= 45 &&
      !G.mem?.ft77_1988Silence,
    text: 'The summer of 1988 is not in the textbooks. It is not commemorated by the state. The families who know do not speak of it publicly — there is no public to speak to that can hear it without consequences. You carry it in the way you carry things that have no official container: quietly, without the support of a shared narrative, in the company of the other families who received a bag of belongings where a person had been.',
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 5
      p.karma += 4
      p.setMem('ft77_1988Silence', true)
    },
  },

  // ── REVOLUTION CHILDHOOD FOLLOW-THROUGH ──────────────────────────────────

  {
    id: 'ft77_revolution_childhood_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('irn_revolution_childhood') &&
      G.currentYear >= 2005 &&
      G.age >= 40 &&
      !G.mem?.ft77RevChildhoodLate,
    text: 'The generation born into the Islamic Republic — born after 1979 — treats the revolution as background. You remember the before. You remember the school uniforms changing and the textbooks arriving with glued pages and the komiteh on the corner. The generation that does not remember this finds your before difficult to imagine. The revolution has been normalised into the texture of ordinary life for long enough that most people alive in Iran now have never experienced anything else. You are among the smaller group for whom it is before and after.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.m -= 3
      p.setMem('ft77RevChildhoodLate', true)
    },
  },

]

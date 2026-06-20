// events_lebanon.js
// Lebanon civil war arc (1975–1990), Hariri reconstruction, diaspora watching from abroad,
// and the 2019 collapse / bank freeze arc.
//
// Lebanon's war was not a single front but a fractured city — seventeen ceasefires,
// shifting alliances, the same street changing hands. The events here are written from
// the interior of ordinary life trying to continue around it.

const isLebanon = (G) => G.character.country.name === 'Lebanon'

const isChristian = (G) =>
  ['christian_maronite', 'christian_orthodox', 'christian_catholic'].includes(G.religion)

const isMuslimOrDruze = (G) =>
  ['sunni', 'shia', 'druze', 'alawi'].includes(G.religion)

export const LEBANON_EVENTS = [

  // ── CIVIL WAR ARC (1975–1990) ─────────────────────────────────────────────

  {
    id: 'lbn_stairwell',
    phase: null,
    weight: 5,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1975 && G.currentYear <= 1990 &&
      G.age >= 5 && G.age <= 40 &&
      !G.mem?.lbnStairwell,
    text: 'When the shelling starts after dark, the whole building moves downstairs. You know the neighbours by the specific sounds of their hurry — the family above you in hard shoes, the old man with the cane a beat behind everyone else. In the stairwell you sit on the third step, which is your step, because you have been doing this long enough to have a step. Someone brings a transistor radio. Someone else brings almonds in a small dish. The shelling goes until two in the morning. You learn, in the stairwell, things about your neighbours you would not otherwise know: who has nightmares, who prays aloud, whose husband does not come down.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.s += 5
      p.addFlag('civil_war_lived')
      p.addFlag('war_childhood')
      p.setMem('lbnStairwell', true)
    },
  },

  {
    id: 'lbn_green_line_checkpoint',
    phase: null,
    weight: 4,
    cooldown: 4,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1990 &&
      G.age >= 10 && G.age <= 45,
    text: (G) =>
      isChristian(G)
        ? 'You are crossing from East to West. The checkpoint is on the Museum crossing — the only open passage today. The militiaman looks at your ID card, looks at your face, looks at the name. Your name is a Christian name. On this side, today, that is the correct answer. He hands it back without expression. You walk through and keep the same pace until you are out of sight.'
        : 'You are crossing from West to East. The checkpoint is on the Museum crossing. The militiaman looks at your ID card, looks at your face. Your name is a Muslim name. He looks at it longer than the ones before you. Then he hands it back. You walk through and keep the same pace. On the other side a woman asks you for directions in a voice that assumes you belong here. You give them correctly.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 7
      p.e += 4
      p.addFlag('passed_checkpoint')
      p.addFlag('civil_war_lived')
    },
  },

  {
    id: 'lbn_mountain_summer',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1989 &&
      G.age >= 6 && G.age <= 15 &&
      !G.mem?.lbnMountainSummer,
    text: 'In June your mother sends you to relatives in the mountain — the Metn or the Chouf, depending on who has room. The village does not have the sound. You wake up on the first morning and the absence of it is its own kind of loud. The cousins here play outside until dark. You go with them but you keep track of the doors and the stairs out of habit, because the habit is faster than the thought. After a week you forget to do it. After ten days the city feels remote and possible from here, like a thing that happens to other people. At the end of August your mother comes for you and you descend back into Beirut together and the city receives you.',
    choices: null,
    effect: (p) => {
      p.m += 12
      p.h += 6
      p.addFlag('war_childhood')
      p.setMem('lbnMountainSummer', true)
    },
  },

  {
    id: 'lbn_ceasefire_day',
    phase: null,
    weight: 3,
    cooldown: 5,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1976 && G.currentYear <= 1989 &&
      G.age >= 8 &&
      G.flags.includes('civil_war_lived'),
    text: 'The radio announces a ceasefire at ten in the morning. By eleven the barber on the corner has opened. By noon the smell of grilling meat comes from somewhere down the block. People walk in the middle of the street because the middle of the street has been empty for weeks and walking in the middle of it is something you can do now. The phones work. You call your aunt across the line and she picks up on the first ring, which means she has been close to the phone. The conversation lasts three minutes and contains almost no information and is completely necessary. The ceasefire holds for four days. Then it doesn\'t.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r += 5
    },
  },

  {
    id: 'lbn_name_question',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1978 && G.currentYear <= 1990 &&
      G.age >= 13 && G.age <= 20 &&
      !G.mem?.lbnNameQuestion,
    text: 'You learn, before you are fifteen, which version of your name to use at which crossing. This is not deception — it is navigation. Your first name can go either way. Your family name is harder to manage. There is a trick with the pronunciation, a slight elision that makes it ambiguous. Your father taught it to you without discussing why, and you understood why without asking. You use it and it works and you feel something you do not name for years — the specific weight of having to be legible to the people who control whether you pass.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.e += 6
      p.addFlag('civil_war_lived')
      p.addFlag('learned_silence')
      p.setMem('lbnNameQuestion', true)
    },
  },

  {
    id: 'lbn_taif_opens',
    phase: null,
    weight: 4,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 10 &&
      G.flags.includes('civil_war_lived') &&
      !G.mem?.lbnTaifOpens,
    text: 'The Taif Agreement is signed in October 1989. The fighting does not stop immediately — it takes until October 1990 for the last militia positions to fall to the Syrian-backed Lebanese Army. But at some point in 1990 or 1991 the green line is removed. You walk down a street that was a front line last year. The buildings on either side are present in the way that ruins are present — roofless, window-empty, flowering with weeds from the top floors down. The street itself is ordinary. You walk the length of it. At the far end there is a man selling cigarettes from a cart, which is either a very ordinary thing or a very extraordinary one. You buy a pack and walk back.',
    choices: null,
    effect: (p) => {
      p.m += 14
      p.r += 6
      p.h += 5
      p.addFlag('survived_bombardment')
      p.setMem('lbnTaifOpens', true)
    },
  },

  // ── HARIRI RECONSTRUCTION ARC (1990s) ────────────────────────────────────

  {
    id: 'lbn_solidere_belief',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isLebanon(G) &&
      G.currentYear >= 1993 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.lbnSolidere,
    text: 'Downtown Beirut is being rebuilt. Solidere, the company Rafic Hariri created for this, has demolished what the war left standing in order to build something new on top of it. There is argument about this — what was erased along with the rubble, what history the new pavements are laid over. But the cranes are real and the new corniche cafe is real and you sit there on a Thursday evening and there is music from the terrace above and the sea is in front of you and for the first time since childhood you can see what this city was trying to be. Whether that belief is justified is a question for later. For now it is sufficient that it is possible to hold.',
    choices: null,
    effect: (p) => {
      p.m += 14
      p.w += 3
      p.addFlag('reconstruction_generation')
      p.setMem('lbnSolidere', true)
    },
  },

  // ── DIASPORA WATCHING FROM ABROAD ────────────────────────────────────────

  {
    id: 'lbn_diaspora_watching',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isLebanon(G) &&
      G.flags.includes('emigrated') &&
      G.currentYear >= 2005 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.lbnDiasporaWatching,
    text: 'You are in Sydney or Paris or São Paulo. The election results come in and you watch them on your laptop with the sound low because it is 3 AM here and the city outside is asleep and indifferent. The results are the same as the results always are — the same families, the same confessional arithmetic, the same parties that have governed since before you left and will govern after you die. You write a message to your cousin and then delete it. You close the laptop and lie in the dark and you are in two places simultaneously, which is a thing you have become very good at and which has no convenient word in any of your three languages.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 9
      p.addFlag('witness_to_exodus')
      p.setMem('lbnDiasporaWatching', true)
    },
  },

  {
    id: 'lbn_explosion_phone',
    phase: null,
    weight: 5,
    when: (G) =>
      isLebanon(G) &&
      G.flags.includes('emigrated') &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      !G.mem?.lbnExplosionPhone,
    text: 'The video arrives on your phone at 6:08 PM. Your cousin sent it without a message. You watch it once: the flash at the port, the silence of the two seconds before the shockwave, then every window in the frame going inward at once. You watch it again. You call your mother. The call does not connect. You call your sister. The call does not connect. You call your aunt and she picks up on the fourth ring, crying but not hurt, and you say things in Arabic that you have not said in years and hold the phone against your face for a long time after she hangs up. The city you left is still there. The city you left is not there.',
    choices: null,
    effect: (p) => {
      p.m -= 20
      p.r += 12
      p.addFlag('beirut_blast_survived')
      p.setMem('lbnExplosionPhone', true)
    },
  },

  // ── 2019 COLLAPSE ARC ────────────────────────────────────────────────────

  {
    id: 'lbn_thawra_streets',
    phase: null,
    weight: 4,
    when: (G) =>
      isLebanon(G) &&
      !G.flags.includes('emigrated') &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 16 &&
      !G.mem?.lbnThawra,
    text: 'It begins with a tax on WhatsApp calls — a tax on the app most people use because regular calls are too expensive. Within hours the streets fill. You go down because everyone goes down, and because the joke going around is that they tried to charge us for talking and we went to the streets to talk for free. The crowd on Martyrs\' Square is the largest you have seen in your lifetime. Christians and Shia and Sunni and Druze are standing in the same space holding the same signs, which has not happened in the same square for decades. Someone has a speaker playing Fairouz. You stay until midnight. Walking home, you feel something that is either hope or its convincing imitation — you have not had enough experience of hope to know the difference.',
    choices: [
      {
        text: 'Go back every day. This one might be different.',
        tag: null,
        outcome: 'You are there for weeks. The government eventually collapses. The people who replace it are the same as the people who left.',
        effect: (p) => { p.m += 5; p.r += 8; p.addFlag('political_active'); p.setMem('lbnThawra', true) },
      },
      {
        text: 'Go a few times, then stop. You have seen ceasefires before.',
        tag: null,
        outcome: 'The revolution does not resolve. Neither does your ambivalence about having stopped going. You watch the last nights from a window.',
        effect: (p) => { p.m -= 4; p.r += 10; p.setMem('lbnThawra', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'lbn_bank_freeze',
    phase: null,
    weight: 4,
    when: (G) =>
      isLebanon(G) &&
      !G.flags.includes('emigrated') &&
      G.currentYear >= 2019 && G.currentYear <= 2023 &&
      G.money > 500 &&
      !G.mem?.lbnBankFreeze,
    text: 'The banks close for two weeks. When they reopen, you can withdraw two hundred dollars a month — in lira, at the official rate, which is not the rate the lira actually trades at. The savings you had are still there as a number on a screen. The number does not correspond to anything you can touch. Within a year the lira has lost ninety percent of its value. Your salary, paid in lira, now buys what it used to buy in a week. At the supermarket you check your phone before each item — the price may have changed since you arrived. The word for this, in the economics textbooks, is hyperinflation. The word does not describe what it feels like to watch your parents\' life savings become a number that means nothing.',
    choices: null,
    effect: (p) => {
      p.wipeMoney(0.7)
      p.m -= 18
      p.r += 10
      p.w -= 10
      p.addFlag('lira_collapse_lived')
      p.setMem('lbnBankFreeze', true)
    },
  },

  {
    id: 'lbn_generator_economy',
    phase: null,
    weight: 3,
    cooldown: 4,
    when: (G) =>
      isLebanon(G) &&
      !G.flags.includes('emigrated') &&
      G.currentYear >= 2020 && G.currentYear <= 2025 &&
      G.age >= 14,
    text: 'The state electricity comes for two hours in the morning and two hours in the evening, on a schedule that changes without announcement. Everything else — the refrigerator, the lights after dark, the phone charger, the ventilator in August — runs on the subscription generator. You pay the generator man at the end of the month in dollars, which means in actual money, because the lira is no longer money in the sense that the word used to mean. The generator cuts out every few hours when it runs low on diesel. You wait. You have become very good at knowing which tasks to do in which order when the electricity is on.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.h -= 3
      p.addFlag('infrastructure_collapse_lived')
    },
  },

  // ── FOLLOW-THROUGHS ───────────────────────────────────────────────────────

  {
    id: 'lbn_lira_decade_later',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isLebanon(G) &&
      G.flags.includes('lira_collapse_lived') &&
      G.age >= 35 &&
      !G.mem?.lbnLiraDecadeLater,
    text: 'Someone younger asks you to explain what happened to the banks in 2019. You try. You say: the lira lost ninety percent of its value in two years. They nod. The number does not reach them the way the number reached you, because they did not have the before. The before is what made the number mean something. You say: imagine you had saved for ten years and then one morning the savings still existed but they could no longer buy anything. They say: that\'s insane. You say: yes. You do not say: and the people responsible are still in government. They already know.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 6
      p.e += 3
      p.setMem('lbnLiraDecadeLater', true)
    },
  },

  // ── LATE LIFE FOLLOW-THROUGH ───────────────────────────────────────────────

  {
    id: 'lbn_stairwell_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isLebanon(G) &&
      G.flags.includes('civil_war_lived') &&
      G.age >= 40 &&
      !G.mem?.lbnStairwellEcho,
    text: 'There is a power cut and you light candles. Your daughter asks why you always know where the candles are, why you keep water in containers even though the tap works, why you have a bag by the door with a copy of every document in it. You do not answer right away. Then you say: it is just something I learned. She accepts this, which means she doesn\'t need to know yet. You hope she never needs to know. The bag stays by the door.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 8
      p.e += 4
      p.setMem('lbnStairwellEcho', true)
    },
  },

]

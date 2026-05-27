// events_adolescence.js
// Adolescence identity events (12–17): first discrimination, religious doubt,
// discovering talent, defining friendship or betrayal, early political awakening.
// These fire in the adolescence phase and shape who the character becomes.

export const ADOLESCENCE_EVENTS = [

  // ── DISCRIMINATION AND IDENTITY ──────────────────────────────────────────────

  {
    id: 'adol_racial_incident',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.adolRacialIncident &&
      G.age >= 12 &&
      (G.character.country.ethnicGroups?.some(e => e.id === G.ethnicity && e.disadvantaged) ||
       G.casteSystem),
    text: (G) => {
      if (G.casteSystem) {
        return 'A teacher separates the class for a group project. The division corresponds exactly to caste — not by name, but the result is the same. Nobody says it aloud. You understand, with the specific clarity of adolescence, that the thing you were told was history is happening right now in this room.'
      }
      return 'You are stopped at the entrance to a shop by a security guard who does not stop the person who went in before you. There is no argument. There is no scene. You go inside and buy what you came for. On the walk home you replay it, trying to locate exactly what happened and what you are supposed to do with the knowledge of it.'
    },
    choices: [
      {
        text: 'Say nothing to your parents — they would worry',
        tag: null,
        outcome: 'You absorb it alone. The absorption becomes practice for a skill you did not want to develop.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('experienced_discrimination'); p.setMem('adolRacialIncident', true) },
      },
      {
        text: 'Tell someone what happened',
        tag: null,
        outcome: 'They believe you. The belief matters more than the conversation that follows.',
        effect: (p) => { p.m -= 6; p.s += 4; p.addFlag('experienced_discrimination'); p.setMem('adolRacialIncident', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'adol_gender_barrier',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.adolGenderBarrier &&
      G.character.gender === 'female' &&
      G.age >= 13 &&
      ['military_dictatorship', 'theocracy', 'single_party_authoritarian', 'single_party_communist'].includes(G.regime),
    text: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'wealthy_gulf' || G.regime === 'theocracy') {
        return 'You want to study engineering. Your father explains, carefully, that this is not what girls do. He is not cruel about it. He finds you a different path — something more suitable. The word he does not use is lesser. You hear it anyway.'
      }
      return 'The sports coach posts the team list. Your name is not on it. You ask why. He says the girls\' programme was cut — budget. The boys\' programme was not cut. You note this without surprise and with a specific fury that you have not yet found a name for.'
    },
    choices: [
      {
        text: 'Find a way around the barrier',
        tag: null,
        outcome: 'The detour is longer. It develops a stubbornness in you that turns out to be useful.',
        effect: (p) => { p.m -= 5; p.e += 5; p.s += 3; p.addFlag('gender_barrier_faced'); p.setMem('adolGenderBarrier', true) },
      },
      {
        text: 'Accept it, at least for now',
        tag: null,
        outcome: 'The compliance costs something. You note the cost but do not have the tools yet to refuse it.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('gender_barrier_faced'); p.setMem('adolGenderBarrier', true) },
      },
    ],
    effect: null,
  },

  // ── RELIGIOUS DOUBT ──────────────────────────────────────────────────────────

  {
    id: 'adol_faith_doubt',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.adolFaithDoubt &&
      G.religion &&
      G.religion !== 'none' &&
      G.character.familyStability !== 'unstable' &&
      G.age >= 14,
    text: (G) => {
      const rel = G.religion
      if (rel?.includes('muslim') || rel === 'islam') {
        return 'You are supposed to pray five times. You miss the afternoon prayer twice this week and wait for something to happen. Nothing happens except that you feel the absence of the thing that is supposed to happen. At school you have been reading about biology. The two bodies of knowledge are not fitting together the way you were told they would.'
      }
      if (rel?.includes('christian') || rel?.includes('catholic')) {
        return 'The priest answers your question about why a good God permits suffering with a sentence about mystery and faith. It is not a bad sentence but it is not an answer. You write the question down when you get home. You have more of them than you thought.'
      }
      return 'You sit through the ceremony and watch the people around you with their eyes closed. Something in you that used to close your eyes when asked is no longer cooperating. You are not sure yet what this means about you.'
    },
    choices: [
      {
        text: 'Raise the questions — with a teacher, a leader, anyone who might answer them',
        tag: null,
        outcome: 'Some answers satisfy you. Some do not. The conversation itself clarifies what you actually believe, which is different from what you were given.',
        effect: (p) => { p.e += 5; p.s += 3; p.addFlag('faith_questioned'); p.setMem('adolFaithDoubt', true) },
      },
      {
        text: 'Keep the doubt private — it would upset the family',
        tag: null,
        outcome: 'The questions go internal. They do not stop; they just have nowhere to go.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('faith_questioned'); p.setMem('adolFaithDoubt', true) },
      },
    ],
    effect: null,
  },

  // ── DISCOVERING TALENT ────────────────────────────────────────────────────────

  {
    id: 'adol_talent_discovered',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      !G.mem.adolTalentDiscovered &&
      G.age >= 13,
    text: (G) => {
      const smarts = G.stats.smarts
      if (smarts > 65) {
        return 'Your mathematics teacher asks if anyone worked the problem on the board differently. You raise your hand and show the class your method. There is a pause, then the teacher says he would like to see you after class. The conversation that follows is about acceleration and competitions and a future you had not considered possible until this specific afternoon.'
      }
      if (G.stats.charisma > 65) {
        return 'You are given a small part in the school production — three lines, barely a role. On the night, something happens. You are not nervous. The audience laughs exactly where you wanted them to. Afterwards the drama teacher finds you in the corridor and asks why you haven\'t been doing this all along.'
      }
      return 'You have been drawing things in the margins of notebooks for years. A teacher picks up a notebook and looks at the drawings for a long time before putting it down. She asks if you know the word for what you are doing. You do not. She says it anyway. Something in you recognizes it.'
    },
    choices: [
      {
        text: 'Pursue it — find out where it goes',
        tag: null,
        outcome: 'The pursuit organizes everything else around it. This is the year you become the person you will recognize later.',
        effect: (p) => { p.e += 8; p.m += 12; p.addFlag('talent_discovered'); p.setMem('adolTalentDiscovered', true) },
      },
      {
        text: 'Treat it as a private thing — not for display',
        tag: null,
        outcome: 'The talent stays yours, uncorrected by outside opinion. It shapes you in directions nobody can predict.',
        effect: (p) => { p.e += 4; p.m += 6; p.addFlag('talent_discovered'); p.setMem('adolTalentDiscovered', true) },
      },
    ],
    effect: null,
  },

  // ── DEFINING FRIENDSHIP OR BETRAYAL ──────────────────────────────────────────

  {
    id: 'adol_best_friend',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      !G.mem.adolBestFriend &&
      G.age >= 13 && G.age <= 17,
    text: 'There is one person who knows the real version of everything — not the story you tell in groups, but the actual thing. You talk on the phone for two hours about nothing consequential and it is the most important conversation of the week. You do not know yet that this kind of friendship, where you can be entirely honest without being managed, is not guaranteed to recur.',
    choices: [
      {
        text: 'Tell them what you actually think and feel',
        tag: null,
        outcome: 'They do the same. The honesty builds something between you that neither of you has a word for yet.',
        effect: (p) => { p.m += 14; p.s += 6; p.addFlag('formative_friendship'); p.addFriend('childhood friend', 80); p.setMem('adolBestFriend', true) },
      },
      {
        text: 'Keep some things back — even here',
        tag: null,
        outcome: 'The friendship is good but not quite what it could have been. You will wonder about this later.',
        effect: (p) => { p.m += 8; p.addFlag('formative_friendship'); p.addFriend('childhood friend', 60); p.setMem('adolBestFriend', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'adol_betrayal',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.adolBetrayal &&
      G.age >= 13 && G.age <= 17,
    text: 'You told one person. One person. The thing you told them — specific, private, not shareable — is now being discussed in the corridor. You can tell because of the way two people stop talking when you walk past. You had trusted someone completely. The lesson this teaches about trust is true but you will apply it too broadly for the next decade.',
    choices: [
      {
        text: 'Confront them directly',
        tag: null,
        outcome: 'They apologize. The apology is real. The friendship ends anyway.',
        effect: (p) => { p.m -= 12; p.s += 5; p.r += 6; p.addFlag('betrayal_adolescence'); p.setMem('adolBetrayal', true) },
      },
      {
        text: 'Say nothing and withdraw',
        tag: null,
        outcome: 'The anger stays internal. You close off a part of yourself that will take years to reopen.',
        effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('betrayal_adolescence'); p.setMem('adolBetrayal', true) },
      },
    ],
    effect: null,
  },

  // ── EARLY POLITICAL AWAKENING ────────────────────────────────────────────────

  {
    id: 'adol_political_awakening',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      !G.mem.adolPoliticalAwakening &&
      G.age >= 15 &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime),
    text: (G) => {
      return `In ${G.currentYear}, something happens that the official version does not explain correctly. You know this because you have access to a different version — from someone who was there, or a signal on the radio that is not supposed to be receivable here, or a pamphlet passed hand to hand in school. The gap between the story you are given and the thing that happened is the size of everything you are now being asked to believe.`
    },
    choices: [
      {
        text: 'Hold onto the knowledge — carefully',
        tag: null,
        outcome: 'You develop the habit of compartmentalization: the official version for official contexts, the real one for your own mind. It is a useful and corrosive skill.',
        effect: (p) => { p.e += 6; p.m -= 6; p.addFlag('political_awareness_early'); p.setMem('adolPoliticalAwakening', true) },
      },
      {
        text: 'Share it with someone you trust',
        tag: null,
        outcome: 'They already know. This is the conversation that politicizes you. It does not feel dramatic. It feels like waking up.',
        effect: (p) => { p.e += 8; p.s += 4; p.addFlag('political_awareness_early'); p.addFlag('dissident_sympathies'); p.setMem('adolPoliticalAwakening', true) },
      },
    ],
    effect: null,
  },

  // ── BODY AND SELF-IMAGE ──────────────────────────────────────────────────────

  {
    id: 'adol_body_image',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.adolBodyImage &&
      G.age >= 13 && G.age <= 16 &&
      (G.stats.looks < 45 || G.stats.looks > 75),
    text: (G) => {
      if (G.stats.looks > 75) {
        return 'People have started looking at you differently. Teachers, older students, adults on the street. The attention is not entirely comfortable. You have not changed — the change is in how you are being received, and the gap between who you are and how you are being treated is strange and sometimes useful and sometimes not.'
      }
      return 'There is a period where you stand in front of the mirror for too long. Everything is wrong in the way that adolescence makes specific and global simultaneously. A comment from someone — offhand, probably forgotten by them — lodges somewhere and does not move.'
    },
    choices: [
      {
        text: 'Work on the things you can change',
        tag: null,
        outcome: 'The effort shifts your relationship to the body from passive receipt to active work. This turns out to have more uses than the original problem.',
        effect: (p) => { p.h += 5; p.m += 4; p.addFlag('body_awareness_adolescence'); p.setMem('adolBodyImage', true) },
      },
      {
        text: 'Find a way to stop caring about it',
        tag: null,
        outcome: 'Not caring is harder than advertised. The approximation you achieve is good enough.',
        effect: (p) => { p.m += 2; p.e += 3; p.addFlag('body_awareness_adolescence'); p.setMem('adolBodyImage', true) },
      },
    ],
    effect: null,
  },

]

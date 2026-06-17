// India depth events — domestic and social life
// Personal, interior Indian experience: arranged marriage meetings, joint family,
// language identity, dowry, first-generation pressure, invisible labour,
// urban-rural gap, the NRI return question.
// These complement events_india.js (political arcs) and events_historical.js (caste events).

export const INDIA_DEPTH_EVENTS = [

  {
    id: 'ind_arranged_marriage_meetings',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 20 && G.age <= 28 &&
      G.partner === null &&
      !G.mem?.indArrangedMeetings,
    text: 'The family has arranged introductions. The prospective family visits. Your mother serves tea. Someone serves tea. Someone is assessed in the serving of tea. There is a room where the families talk, and a room where you wait, and eventually the rooms converge. Both of these things are true simultaneously: you are choosing and being chosen, and the choosing has a structure that existed before you were born.',
    choices: [
      {
        text: 'You agree to the meeting and find it tolerable.',
        tag: null,
        outcome: 'The families are pleased. The process continues. There is a sense, difficult to locate, that you have stepped onto a track that has its own momentum.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('arranged_meeting_accepted'); p.setMem('indArrangedMeetings', true); },
      },
      {
        text: 'You say no to this one.',
        tag: null,
        outcome: 'Your family accepts this, this time. The next introduction is already being arranged. You have exercised a veto within a system that contains the veto.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('arranged_meeting_declined'); p.setMem('indArrangedMeetings', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_joint_family_entry',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 22 && G.age <= 30 &&
      G.partner !== null &&
      !G.mem?.indJointFamily,
    text: 'The house has three generations. Your mother-in-law\'s kitchen is her domain; meals happen on her schedule. The money comes in and is pooled in ways that are not fully discussed. There is a specific grammar to what can be said about the household finances and what cannot. Your salary goes into a shared account that is not quite shared.',
    choices: [
      {
        text: 'You find your place in the household.',
        tag: null,
        outcome: 'The adjustment is real and takes longer than anyone acknowledges. But the house is warm, the costs are shared, and you are never eating alone.',
        effect: (p) => { p.m -= 5; p.s += 5; p.w += 3; p.addFlag('joint_family_member'); p.setMem('indJointFamily', true); },
      },
      {
        text: 'You begin saving separately without saying so.',
        tag: null,
        outcome: 'The separate account is small and not discussed. You are not sure whether this is prudence or the beginning of something else.',
        effect: (p) => { p.m -= 8; p.w += 5; p.karma -= 3; p.addFlag('joint_family_tension'); p.setMem('indJointFamily', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_english_medium_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 12 && G.age <= 17 &&
      G.stats.smarts >= 50 &&
      !G.mem?.indEnglishMedium,
    text: 'There are two kinds of school in this town: the Hindi-medium government school where your cousins go, and the English-medium convent school where you go. You already know that you are going somewhere different. When you speak English in the market, vendors switch languages. When you visit the village your grandparents came from, you speak haltingly in your mother tongue and the children laugh, not unkindly.',
    choices: [
      {
        text: 'English is the door — you practice until it is yours.',
        tag: null,
        outcome: 'The accent settles into something that is neither the village nor the city. It will open the doors it was meant to open.',
        effect: (p) => { p.e += 8; p.s += 3; p.addFlag('english_medium_identity'); p.setMem('indEnglishMedium', true); },
      },
      {
        text: 'You hold both languages, and the uncomfortable position between them.',
        tag: null,
        outcome: 'The discomfort does not resolve. You become fluent in the discomfort itself, which is its own kind of fluency.',
        effect: (p) => { p.e += 6; p.m -= 3; p.r += 5; p.addFlag('bilingual_identity'); p.setMem('indEnglishMedium', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_regional_language_pride',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 18 && G.age <= 35 &&
      G.currentYear >= 1990 &&
      !G.mem?.indRegionalLang,
    text: 'Hindi is the national language, but it is not your mother tongue. In Delhi offices it is the medium of everything; your regional language is what you speak at home and think in when you dream. Someone at a conference asks where you are from and then says "but you speak such good Hindi" as if this is a compliment. You file the implication.',
    choices: [
      {
        text: 'You lead with your regional identity.',
        tag: null,
        outcome: 'People notice, and some of them find it refreshing. Others find it inconvenient. You find it necessary.',
        effect: (p) => { p.s += 3; p.karma += 4; p.m += 4; p.addFlag('regional_identity_pride'); p.setMem('indRegionalLang', true); },
      },
      {
        text: 'You learn to perform the national neutrality.',
        tag: null,
        outcome: 'The performance becomes habit. At some point you are not entirely sure which version of yourself is performing.',
        effect: (p) => { p.e += 4; p.s += 4; p.m -= 3; p.r += 5; p.addFlag('national_identity_neutral'); p.setMem('indRegionalLang', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_dowry_negotiation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.character.gender === 'female' &&
      G.age >= 18 && G.age <= 28 &&
      G.wealthTier <= 3 &&
      !G.mem?.indDowry,
    text: 'The negotiations involve furniture, gold, a scooter, and whether your father can manage the demand for a car. These negotiations happen in another room. You are not in the room. What is decided in that room will be handed to a family you have met twice, and they will assess whether the contents of the room represent your family\'s respect for their family.',
    choices: [
      {
        text: 'Your family manages the full negotiation.',
        tag: null,
        outcome: 'The figure is settled. Your father does not speak about what it cost him. You do not ask.',
        effect: (p) => { p.m -= 6; p.mo -= 3000; p.karma -= 3; p.addFlag('dowry_negotiated'); p.setMem('indDowry', true); },
      },
      {
        text: 'You try to reduce the demand.',
        tag: null,
        outcome: 'You speak to your father about it. He listens in the way that means the conversation has been heard but the outcome is not yet changed. The demand is partially reduced. Something in the other family\'s warmth is also partially reduced.',
        effect: (p) => { p.m -= 10; p.r += 8; p.karma += 4; p.addFlag('dowry_contested'); p.setMem('indDowry', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_joint_family_nuclear_transition',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 30 && G.age <= 42 &&
      G.currentYear >= 1990 &&
      (G.flags.includes('joint_family_member') || G.flags.includes('joint_family_tension')) &&
      !G.mem?.indNuclear,
    text: 'You have found a flat. The conversation with your mother-in-law is specific: you are not leaving because of her, you say. But you are leaving. She accepts this in the specific way that things are accepted in your family — without saying anything that acknowledges what is happening.',
    choices: [
      {
        text: 'You move, and the relationship adjusts slowly.',
        tag: null,
        outcome: 'The Sunday visits begin. They are different from the daily proximity — more deliberate, slightly formal, and warmer for it.',
        effect: (p) => { p.m += 8; p.w -= 2; p.karma += 3; p.addFlag('nuclear_family_choice'); p.setMem('indNuclear', true); },
      },
      {
        text: 'You stay — the flat was a thought, not a decision.',
        tag: null,
        outcome: 'The thought goes back where it came from. The household continues. You are not sure whether you chose this or whether the choosing was too hard to complete.',
        effect: (p) => { p.m -= 4; p.w += 4; p.r += 6; p.addFlag('stayed_joint_family'); p.setMem('indNuclear', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_first_gen_pressure',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 15 && G.age <= 18 &&
      G.stats.smarts >= 55 &&
      G.wealthTier <= 2 &&
      !G.mem?.indFirstGen,
    text: 'Your father\'s shop, or your father\'s land, or your father\'s government job — none of these are what the family has decided you will do. The conversation is not a conversation. It is a declaration of what has been arranged around your existence without consulting it: you will study engineering. Or medicine. The choice between these two is the extent of your options as presented.',
    choices: [
      {
        text: 'You accept the path — it is also what you want.',
        tag: null,
        outcome: 'The path narrows to a point: the entrance exam. Everything else can wait until after.',
        effect: (p) => { p.e += 6; p.m -= 4; p.r += 3; p.addFlag('academic_pressure'); p.setMem('indFirstGen', true); },
      },
      {
        text: 'You accept the path but want something else.',
        tag: null,
        outcome: 'You study what has been decided. The other thing — the drawing, the writing, the history — becomes something you do privately, and then less privately, and then barely at all.',
        effect: (p) => { p.e += 5; p.m -= 8; p.r += 10; p.addFlag('academic_pressure'); p.addFlag('suppressed_ambition'); p.setMem('indFirstGen', true); },
      },
      {
        text: 'You say what you actually want.',
        tag: null,
        outcome: 'The conversation that follows is long and specific. Your father does not speak to you directly for three weeks. The silence has a shape to it that you will remember.',
        effect: (p) => { p.m -= 10; p.r += 6; p.karma += 5; p.addFlag('suppressed_ambition'); p.addFlag('first_gen_defied'); p.setMem('indFirstGen', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_mothers_labour',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.character.gender === 'female' &&
      G.age >= 32 && G.age <= 50 &&
      G.children !== null && G.children.length > 0 &&
      !G.mem?.indMothers,
    text: 'You have been tracking the things you do that no one counts. The school pick-up. The in-law\'s medication schedule. The homework. The social calendar of the entire family, held in your head. Your husband would say he helps. He does help. The arithmetic of help versus primary responsibility is specific and not quite discussable.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 6; p.karma += 4; p.addFlag('invisible_labour_known'); p.setMem('indMothers', true); },
  },

  {
    id: 'ind_village_visit_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 35 && G.age <= 55 &&
      G.wealthTier >= 3 &&
      !G.flags.includes('rural_upbringing') &&
      !G.mem?.indVillageVisit,
    text: 'The village your parents came from still exists. You come back for a funeral and find that the cousins who stayed here know things about land and water and seasonal rhythm that you have entirely lost. They also earn in a month what you earn in a day. The distance between you is not resentment. It is more specific than that.',
    choices: [
      {
        text: 'You send money when you can.',
        tag: null,
        outcome: 'The transfers are regular and not large enough and they know it and you know it. But they arrive, and that is noted.',
        effect: (p) => { p.karma += 5; p.mo -= 800; p.addFlag('urban_rural_connected'); p.setMem('indVillageVisit', true); },
      },
      {
        text: 'You lose touch gradually — the distance is too specific.',
        tag: null,
        outcome: 'The visits become fewer. The cousins\' names become harder to recall. You do not call this a choice, exactly.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('urban_rural_disconnected'); p.setMem('indVillageVisit', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_nri_return_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.age >= 28 && G.age <= 45 &&
      G.currentYear >= 2000 &&
      G.stats.smarts >= 60 &&
      G.wealthTier >= 2 &&
      !G.mem?.indNRI,
    text: 'Someone you were at school with has come back from the US or UK with a salary that is not comparable to anything here. They speak with a slight accent that wasn\'t there before. They say they are considering coming back, eventually. You notice you feel something specific about this that is harder to name than envy.',
    choices: [
      {
        text: 'You consider going yourself.',
        tag: null,
        outcome: 'The consideration stays a consideration for now. You research visa categories late at night. The tab stays open.',
        effect: (p) => { p.e += 4; p.m -= 3; p.r += 5; p.addFlag('considered_emigration'); p.setMem('indNRI', true); },
      },
      {
        text: 'You decide to build here, fully.',
        tag: null,
        outcome: 'The decision is not passive. You make it again every few years, when someone else leaves. Each time it costs something and gives something back.',
        effect: (p) => { p.karma += 5; p.m += 5; p.e += 3; p.addFlag('chose_to_stay'); p.setMem('indNRI', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_suppressed_ambition_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.flags.includes('suppressed_ambition') &&
      G.age >= 38 && G.age <= 50 &&
      !G.mem?.indSuppressedEcho,
    text: 'You pass a bookshop, or a gallery, or a recording studio — whatever the thing was that you put away. The career you chose is real and you are competent at it and it has paid for things. You are forty-something years old and you are still doing the arithmetic on what you traded and what you got, and the arithmetic has not stopped.',
    choices: [
      {
        text: 'You find something that contains it — a class, an evening, a practice.',
        tag: null,
        outcome: 'It is not what it would have been. It is also not nothing.',
        effect: (p) => { p.m += 6; p.r -= 4; p.addFlag('suppressed_ambition_revived'); p.setMem('indSuppressedEcho', true); },
      },
      {
        text: 'You keep walking.',
        tag: null,
        outcome: 'The arithmetic continues. You are very good at your job.',
        effect: (p) => { p.r += 7; p.m -= 4; p.addFlag('suppressed_ambition_buried'); p.setMem('indSuppressedEcho', true); },
      },
    ],
    effect: null,
  },

];

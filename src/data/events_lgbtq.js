// events_lgbtq.js
// Full LGBTQ life arc — from self-recognition through coming out,
// relationships, community, discrimination, and late-life reflection.
// Criminalization events are in events_culture.js; this file covers everything else.

export const LGBTQ_EVENTS = [

  // ── SELF-RECOGNITION ─────────────────────────────────────────────────────────

  {
    id: 'lgbtq_unnamed_feeling',
    phase: 'adolescence',
    weight: 3,
    when: (G) => !G.flags.includes('lgbtq_identity') && G.age >= 11 && G.age <= 14 && !G.mem?.lgbtq_unnamed,
    text: 'There is something you notice about yourself that you do not have a word for yet. It is not like what the boys talk about in the locker room or what the girls whisper about during lunch. You do not know if it is wrong or simply different. You file it somewhere deep and return to it at night.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 4; p.setMem('lgbtq_unnamed', true) },
  },

  {
    id: 'lgbtq_name_arrives',
    phase: 'adolescence',
    weight: 3,
    when: (G) => !G.flags.includes('lgbtq_identity') && G.age >= 13 && G.age <= 19 && !G.mem?.lgbtq_named,
    text: 'You read it in a book, or hear it spoken on a television programme, or find it in a search result you typed in private. The word for what you are. It lands with a precision you were not prepared for. You sit with it for a long time. It fits in a way nothing else has.',
    choices: [
      { text: 'Accept the word — it is yours', tag: null, outcome: 'Something settles. Not everything, but something. You say the word to yourself in the mirror once. Just to hear it.', effect: (p) => { p.m += 6; p.e += 5; p.addFlag('lgbtq_identity'); p.setMem('lgbtq_named', true) } },
      { text: 'Reject it — maybe it does not apply to you', tag: null, outcome: 'You close the tab. But the word stays. You will return to it.', effect: (p) => { p.m -= 5; p.r += 4; p.setMem('lgbtq_named', true) } },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_doubt_cycle',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 14 && G.age <= 22 && !G.mem?.lgbtq_doubt_cycle,
    text: 'There is a period when you are sure, and then a period when you convince yourself you were wrong, and then a period when you are sure again. You parse your own feelings the way other people do not have to. The certainty, when it comes back the third time, has a different quality — it does not need your permission anymore.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 3; p.r += 3; p.setMem('lgbtq_doubt_cycle', true) },
  },

  {
    id: 'lgbtq_not_alone',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 14 && G.age <= 22 && !G.mem?.lgbtq_not_alone,
    text: (G) => {
      if (G.currentYear >= 1995) return 'You find a forum. The usernames are anonymous and the grammar is bad and some of the posts are written in languages you do not speak. But the experience — the specific experience — is written there in every language, and it is yours. You read until 2 AM.'
      if (G.currentYear >= 1970) return 'There is a book in the library. It is shelved in an unmarked section. The author writes about a life that sounds like yours. You do not borrow it — you memorize the parts that matter and leave it on the shelf.'
      return 'A neighbor — an older woman who lives alone and is spoken about in a certain way — looks at you once over the fence as you sit on the back steps. She says nothing. She does not have to.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.e += 4; p.addFlag('lgbtq_found_community'); p.setMem('lgbtq_not_alone', true) },
  },

  // ── COMING OUT ────────────────────────────────────────────────────────────────

  {
    id: 'lgbtq_first_confide',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.age >= 14 && G.age <= 22 && !G.mem?.lgbtq_first_confide,
    text: 'You tell one person. A friend you have known long enough that you can read their face before they speak. You say the words and there is a second of silence that lasts a very long time. Then they say: "I know." Then they say: "It does not change anything." You do not cry until you are alone.',
    choices: null,
    effect: (p) => { p.m += 15; p.s += 5; p.addFlag('lgbtq_out_to_friend'); p.setMem('lgbtq_first_confide', true) },
  },

  {
    id: 'lgbtq_coming_out_parent_accepted',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.age >= 16 && ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) && !G.mem?.lgbtq_out_parent,
    text: 'You tell your parent. You have rehearsed this for months. Your voice is steady for the first two sentences and then it is not. They get up from the table and put their arms around you and say that nothing about this changes what you are to them. You were so prepared for the other version that this one takes longer to process.',
    choices: null,
    effect: (p) => { p.m += 20; p.s += 5; p.addFlag('lgbtq_out_family'); p.setMem('lgbtq_out_parent', true) },
  },

  {
    id: 'lgbtq_coming_out_parent_complicated',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.age >= 17 && ['developing_urban', 'post_soviet', 'developing_unstable'].includes(G.character.country.archetype) && !G.mem?.lgbtq_out_parent,
    text: 'You tell your parent. What follows is not a fight. It is a long silence and then careful questions and then a kind of controlled grief that is not for you but for something they had imagined. They do not ask you to leave. They do not say the right things. They are trying. You can see them trying. It costs them something and it costs you something and the relationship is different from this day, in ways that have not yet become clear.',
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 8; p.addFlag('lgbtq_out_family'); p.setMem('lgbtq_out_parent', true) },
  },

  {
    id: 'lgbtq_coming_out_parent_rejected',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.age >= 17 && ['subsaharan', 'conflict_zone', 'wealthy_gulf'].includes(G.character.country.archetype) && !G.mem?.lgbtq_out_parent,
    text: 'You tell your parent. The answer is quick and without ambiguity. You are told that you are wrong about yourself, that this is a phase, that it will not be spoken of again. The door to your old room closes. You stand outside it.',
    choices: [
      { text: 'Leave the house and find somewhere else to go', tag: null, outcome: 'You call the one person who already knows. You sleep on their floor for two weeks. You are eighteen years old and starting something that has no map.', effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('lgbtq_family_rejection'); p.addFlag('lgbtq_out_family'); p.setMem('lgbtq_out_parent', true) } },
      { text: 'Retract it — say you were confused', tag: null, outcome: 'The door opens again. You go back in. The word you said stays between you, unaddressed, for years.', effect: (p) => { p.m -= 15; p.r += 15; p.setMem('lgbtq_out_parent', true) } },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_outed',
    phase: 'adolescence',
    weight: 1,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.age >= 14 && G.age <= 22 && !G.mem?.lgbtq_outed,
    text: 'Someone tells your family before you were ready. You find out when your parent asks you directly, eyes already certain of the answer. The conversation you had prepared — the one with the right words, in the right order, at the right time — never happens. That version of the story is gone.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('lgbtq_out_family'); p.setMem('lgbtq_outed', true) },
  },

  {
    id: 'lgbtq_out_at_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 22 && !G.mem?.lgbtq_out_work,
    text: 'You calculate. The company says the right things in its materials. One colleague mentions their same-sex partner casually in a meeting and nobody reacts. You decide the risk is low enough. You stop using the wrong pronouns when you talk about your life. The calculation, it turns out, was correct. This is its own strange relief.',
    choices: [
      { text: 'Come out openly and let it be known', tag: null, outcome: 'Most people were already half-aware. A few are warm about it. One colleague is quietly cold for a while, then adjusts.', effect: (p) => { p.m += 10; p.s += 5; p.addFlag('lgbtq_outed_at_work'); p.setMem('lgbtq_out_work', true) } },
      { text: 'Be open to those who ask, but do not announce it', tag: null, outcome: 'A middle ground that requires less energy than hiding and less courage than announcing. It is not perfect. It is enough.', effect: (p) => { p.m += 5; p.setMem('lgbtq_out_work', true) } },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_out_in_criminalized_context',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && G.lgbtqCriminalized && G.age >= 18 && !G.mem?.lgbtq_criminalized_out,
    text: 'You meet someone who is like you. There is a recognition that happens before any words. You understand that any version of this — anything more than complete invisibility — carries a specific and legal risk. You sit across from this person and you do not say anything directly. You do not need to.',
    choices: [
      { text: 'Pursue the connection, cautiously', tag: null, outcome: 'You build something that exists entirely in private spaces. You become expert at coded language, at misdirection. It costs more than it should.', effect: (p) => { p.m += 8; p.r += 10; p.addFlag('lgbtq_secret_relationship'); p.setMem('lgbtq_criminalized_out', true) } },
      { text: 'Walk away from it', tag: null, outcome: 'The safer choice. You watch the person leave. You understand what you are giving up and you do it anyway.', effect: (p) => { p.m -= 12; p.r += 8; p.setMem('lgbtq_criminalized_out', true) } },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_returning_to_closed_place',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_out_family') && G.age >= 22 && !G.mem?.lgbtq_return_closed,
    text: 'You go back — for a funeral, a wedding, a holiday that cannot be avoided. In the place where you grew up, you are not out. You relearn the old performance: the careful pronouns, the absent partner, the conversation that cannot happen. You are forty minutes from the airport and it is like putting on a skin that no longer fits.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setMem('lgbtq_return_closed', true) },
  },

  // ── RELATIONSHIPS ─────────────────────────────────────────────────────────────

  {
    id: 'lgbtq_first_relationship',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 17 && G.age <= 26 && !G.mem?.lgbtq_first_rel,
    text: 'The first person. You are clumsy in ways you would not be if you had been practicing at this your whole adolescence, the way other people were. Everything is new — how to stand, how to be looked at, how to be held by someone who knows what you are. The specific relief of this is not small.',
    choices: null,
    effect: (p) => { p.m += 18; p.s += 5; p.addFlag('lgbtq_had_relationship'); p.setMem('lgbtq_first_rel', true) },
  },

  {
    id: 'lgbtq_hidden_relationship',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 20 && (!G.flags.includes('lgbtq_out_family') || G.lgbtqCriminalized) && !G.mem?.lgbtq_hidden_rel,
    text: 'Before your family visits, you remove the photographs. You move the second toothbrush. You re-conjugate sentences. Your partner understands why. They have done this version too. Afterward, sitting in the car in your parking structure, you do not say anything for a while.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 10; p.setMem('lgbtq_hidden_rel', true) },
  },

  {
    id: 'lgbtq_partner_intro_family',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_out_family') && !G.lgbtqCriminalized && G.partner && G.age >= 22 && !G.mem?.lgbtq_partner_intro,
    text: 'You bring your partner home. The meal is prepared. Your parent shakes their hand or kisses their cheek and the sentence they say is the right one, the one that was practiced. Later, washing dishes, your parent says something small and offhand about the future. It includes your partner without effort. You stand at the sink and let it settle.',
    choices: null,
    effect: (p) => { p.m += 15; p.partnerRel(12); p.setMem('lgbtq_partner_intro', true) },
  },

  {
    id: 'lgbtq_relationship_ends',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_had_relationship') && G.age >= 22 && !G.mem?.lgbtq_rel_ends,
    text: 'It ends. You tell almost no one. People do not send cards for this kind of grief. The colleagues who would have asked questions if you had been visibly partnered do not ask questions now. The mourning happens privately and without ceremony. You understand that this is just how it is, and that understanding does not make it smaller.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.setMem('lgbtq_rel_ends', true) },
  },

  {
    id: 'lgbtq_chosen_family',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 20 && !G.mem?.lgbtq_chosen_family,
    text: 'There is a dinner table that is not the one you grew up at. The people around it are not related to you by blood and some of them you have known only a few years. One of them calls you by a nickname that nobody else uses. Another brings you soup when you are sick without being asked. You understand what chosen means when it is applied to family.',
    choices: null,
    effect: (p) => { p.m += 14; p.s += 6; p.addFlag('lgbtq_found_community'); p.setMem('lgbtq_chosen_family', true) },
  },

  // ── COMMUNITY ────────────────────────────────────────────────────────────────

  {
    id: 'lgbtq_finding_community',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 18 && G.age <= 28 && !G.mem?.lgbtq_community_found,
    text: (G) => {
      if (G.currentYear >= 2000) return 'There is a group. You find it through a link sent by the person who already knows. The first meeting is a Tuesday night in a room above a café. There are nine people there, which feels like a great number. The conversation is the most specific conversation of your life.'
      return 'There is a bar. It is unmarked from the outside and the first time you go you walk past it twice. Inside: music, people, a sense of permission so thick you can feel it. You stay until closing. You come back the following Friday.'
    },
    choices: null,
    effect: (p) => { p.m += 15; p.s += 8; p.addFlag('lgbtq_found_community'); p.setMem('lgbtq_community_found', true) },
  },

  {
    id: 'lgbtq_first_pride',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.currentYear >= 1970 && G.age >= 18 && !G.mem?.lgbtq_pride,
    text: (G) => {
      if (G.currentYear < 1980) return 'The march is small and loud and a little terrifying. People photograph from the sidewalk. Some of them are hostile. Some of them are simply watching. You carry a sign because someone put it in your hands and you are walking and then you are crying without deciding to.'
      if (G.currentYear < 2000) return 'Pride is larger now. There are corporate banners alongside the handmade ones, which some people feel strongly about. You walk with the community group that knows you. The street smells of sunscreen and beer and the crowd sounds like forgetting to be afraid.'
      return 'You have been to pride before. This year you bring someone who has not. You watch them see the crowd for the first time — the size of it, the noise of it. You remember the first time and what it felt like to understand you were not alone.'
    },
    choices: null,
    effect: (p) => { p.m += 14; p.s += 5; p.setMem('lgbtq_pride', true) },
  },

  {
    id: 'lgbtq_political_dimension',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 30 && !G.mem?.lgbtq_political,
    text: 'You have watched rights appear and be taken back. A marriage that was legal is no longer recognized in three states. A protection that existed for a decade is removed. The political dimension of your life is not something you chose. It arrived with the part of you that you did not choose either. You vote every election with a specific kind of attentiveness.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 5; p.addFlag('politically_engaged'); p.setMem('lgbtq_political', true) },
  },

  {
    id: 'lgbtq_younger_person_comes_out',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 35 && !G.mem?.lgbtq_younger_out,
    text: 'A younger person — a neighbor\'s child, a colleague\'s sibling, someone you barely know — asks if you would talk. They have figured out something about themselves and they have heard, somehow, that you might understand. You sit with them for two hours. You say the things you needed to hear at their age. Driving home, you feel something clean.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 8; p.s += 4; p.setMem('lgbtq_younger_out', true) },
  },

  // ── DISCRIMINATION AND VIOLENCE ──────────────────────────────────────────────

  {
    id: 'lgbtq_street_harassment',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 18 && !G.mem?.lgbtq_harassment,
    text: 'You are walking with your partner, or alone and visibly yourself, when someone says something from across the street. It is short and specific and clearly aimed at you. You keep walking. This is what you have learned to do. You do not turn around. Your partner squeezes your hand or you squeeze your own.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.setMem('lgbtq_harassment', true) },
  },

  {
    id: 'lgbtq_employment_discrimination',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 22 && !G.mem?.lgbtq_employment_discrim,
    text: 'The company does not have a policy against it. They do not need one. You are passed over for a promotion and you know why and you cannot say why without the conversation becoming about something other than the work. You take notes. You update your CV. You file it away.',
    choices: [
      { text: 'File a formal complaint', tag: null, outcome: 'The process is long and inconclusive. It costs you more than it costs them. You are cleaner on the other side of it, though.', effect: (p) => { p.m -= 8; p.e += 4; p.karma += 5; p.setMem('lgbtq_employment_discrim', true) } },
      { text: 'Leave and find somewhere better', tag: null, outcome: 'You find a company where the culture is different and the difference is real, not performed. You do better work. The promotion comes.', effect: (p) => { p.m += 5; p.w += 5; p.setMem('lgbtq_employment_discrim', true) } },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_hate_crime_community',
    phase: 'young_adult',
    weight: 1,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_found_community') && G.age >= 20 && !G.mem?.lgbtq_hate_crime,
    text: 'It happens to someone you know. Not a stranger on the news — someone whose name you know, who was at the last dinner, who sent you a message last week. The community gathers. There is vigil light and shared anger. You stand in the cold and you understand that the risk you have always known about intellectually has a name you know now.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 12; p.setMem('lgbtq_hate_crime', true) },
  },

  {
    id: 'lgbtq_visible_in_hostile_country',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && G.lgbtqCriminalized && G.age >= 20 && !G.flags.includes('closeted_survival') && !G.mem?.lgbtq_state_attention,
    text: 'You are stopped. Not arrested — just stopped, and questioned, and looked at in a way that communicates clearly what they know or suspect. You answer carefully. You are released. The question of how you were seen, and what made you visible, stays with you.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.h -= 4; p.addFlag('learned_silence'); p.setMem('lgbtq_state_attention', true) },
  },

  {
    id: 'lgbtq_nominal_acceptance',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_outed_at_work') && G.age >= 30 && !G.mem?.lgbtq_nominal_acceptance,
    text: 'The workplace is nominally accepting. The HR training happens annually. Your manager says inclusive things in meetings. What does not change: you are still not mentioned when promotions are discussed. You are invited to the wrong events. When you raise something directly, it is heard and not acted on. You learn to distinguish between the language and the reality. This is a useful skill with applications outside work.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 4; p.setMem('lgbtq_nominal_acceptance', true) },
  },

  // ── LATE LIFE ────────────────────────────────────────────────────────────────

  {
    id: 'lgbtq_long_partnership_legal',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.flags.includes('lgbtq_had_relationship') && !G.lgbtqCriminalized && G.partner && G.age >= 50 && !G.mem?.lgbtq_long_partnership,
    text: 'You have been together a long time. The law that recognizes you came later than you came — you existed before it did, which gives you a particular relationship to the paperwork. You are signing documents that other couples signed automatically thirty years ago. Your partner makes a joke about the waiting room. You both laugh because it is funny and because the other thing, the thing underneath it, is too large to say directly.',
    choices: null,
    effect: (p) => { p.m += 20; p.partnerRel(15); p.setMem('lgbtq_long_partnership', true) },
  },

  {
    id: 'lgbtq_late_life_reflection',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 55 && !G.mem?.lgbtq_late_reflection,
    text: 'You think about what it cost. Not just the hard moments — those are clear — but the chronic low expenditure of energy that was always running in the background: the monitoring, the calculation, the editing before speaking. You also think about what it gave: the specific solidarity, the friends who knew everything, the necessity of building something real because the inherited version was not available.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 5; p.e += 5; p.setMem('lgbtq_late_reflection', true) },
  },

  {
    id: 'lgbtq_generational_ease',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('lgbtq_identity') && !G.lgbtqCriminalized && G.age >= 55 && !G.mem?.lgbtq_generational,
    text: 'The younger people you know do not carry what you carried. They say the word for themselves without pausing first to measure the room. They have always had the word. They have had the examples. You watch a young couple hold hands on the train and they do not check the carriage first and you understand that this is the thing you were part of building, even when you did not know you were building it.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 6; p.setMem('lgbtq_generational', true) },
  },

  {
    id: 'lgbtq_deathbed_unsaid',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.includes('lgbtq_identity') && G.age >= 60 && !G.mem?.lgbtq_deathbed_convo,
    text: (G) => {
      if (G.flags.includes('lgbtq_family_rejection')) return 'Your parent is old now. You visit. In a room where one of you is in a hospital bed, the thing that was never said is present as an absence you can both feel. They take your hand. They do not say the words you needed to hear forty years ago. But they hold on.'
      return 'An older member of your community is dying. They ask you to sit with them. They talk about the things they did not say to their family when there was still time. They tell you not to make the same mistake. You go home and write a letter you have been putting off.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 8; p.karma += 8; p.setMem('lgbtq_deathbed_convo', true) },
  },
]

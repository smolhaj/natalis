// events_fame_karma.js
// Fame, karma, hobby payoff, and friendship depth events.
// Gate on G.fame, G.karma, G.hobbies, G.friends.
// These events surface the texture of being known, the weight of past choices,
// the slow reward of craft, and what friends actually do with time.

export const FAME_KARMA_EVENTS = [

  // ── FAME ─────────────────────────────────────────────────────────────────────

  {
    id: 'fame_recognized_street',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.fame > 20 &&
      !G.mem.fameRecognizedStreet &&
      (G.phase === 'young_adult' || G.phase === 'midlife'),
    text: 'You are at the market, or waiting for a bus, or carrying groceries — something ordinary — when a stranger calls your name. They know who you are. They have their phone out before you understand what is happening. You smile. It is not a real smile but it is close enough.',
    choices: [
      {
        text: 'Take the photo. It is a small thing.',
        tag: null,
        outcome: 'They show their friend on the spot. You watch them do it. It is strange to be the subject of a stranger\'s excitement.',
        effect: (p) => { p.s += 3; p.m -= 2; p.setMem('fameRecognizedStreet', true) },
      },
      {
        text: 'Apologize and keep moving.',
        tag: null,
        outcome: 'You say you are in a hurry. This is partially true. You think about it for the rest of the day.',
        effect: (p) => { p.m -= 4; p.r += 3; p.setMem('fameRecognizedStreet', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_recognized_awkward',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 25 &&
      !G.mem.fameRecognizedAwkward,
    text: 'You are at a hospital waiting room — your own appointment, or someone else\'s — when a man across the room locks eyes with you and begins to come over. He is smiling. He wants to tell you something about what your work has meant to him. You are not ready to be a public figure right now. You are barely ready to be a person.',
    choices: [
      {
        text: 'Let him talk. He does not know what he has walked into.',
        tag: null,
        outcome: 'He is kind, and brief. He does not notice that your hands are not entirely steady.',
        effect: (p) => { p.s += 2; p.m -= 5; p.setMem('fameRecognizedAwkward', true) },
      },
      {
        text: 'Ask him quietly to give you a moment.',
        tag: null,
        outcome: 'He nods and retreats. He looks deflated. You feel guilty about that on top of everything else.',
        effect: (p) => { p.m -= 7; p.r += 4; p.setMem('fameRecognizedAwkward', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_rumor_online',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.fame > 30 &&
      G.currentYear >= 2005 &&
      !G.mem.fameRumorOnline,
    text: 'A story about you appears online. It is not true — not entirely, not in the ways that matter — but it has details that are close enough to be believed. By the time you read it, it has already been shared several hundred times. The story travels faster than anything you could say to correct it.',
    choices: [
      {
        text: 'Post a clear, direct response.',
        tag: null,
        outcome: 'Your correction reaches a fraction of the people who saw the original. Some say you protested too much.',
        effect: (p) => { p.m -= 10; p.s -= 2; p.addFlag('survived_public_lie'); p.setMem('fameRumorOnline', true) },
      },
      {
        text: 'Say nothing. Wait for it to pass.',
        tag: null,
        outcome: 'It passes — mostly. You find the story still returns in searches years later, clinging to your name like sediment.',
        effect: (p) => { p.m -= 12; p.r += 6; p.setMem('fameRumorOnline', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_paparazzi',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 45 &&
      !G.mem.famePaparazzi,
    text: 'You notice them outside your building at seven in the morning. By the afternoon there are three. Every errand becomes a calculation: where they are standing, whether the angle is bad, what your face looks like when you are just trying to get somewhere. You arrive home and close the door and stand in the hallway for a while.',
    choices: null,
    effect: (p) => { p.m -= 14; p.s -= 3; p.addFlag('paparazzi_experience'); p.setMem('famePaparazzi', true) },
  },

  {
    id: 'fame_fan_letter',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.fame > 20 &&
      !G.mem.fameFanLetter,
    text: 'A letter arrives, handwritten, from someone who read something you made or heard something you said. They describe a night they were not going to get through, and then they did. They name exactly the line that reached them. You read it twice. You are not sure what to do with something this heavy.',
    choices: [
      {
        text: 'Write back.',
        tag: null,
        outcome: 'You write three drafts before you find the right words. You are not sure they are the right words. You send it anyway.',
        effect: (p) => { p.m += 8; p.karma += 5; p.e += 2; p.setMem('fameFanLetter', true) },
      },
      {
        text: 'Keep it, but do not respond.',
        tag: null,
        outcome: 'The letter goes into a drawer. You think about it for months.',
        effect: (p) => { p.m += 4; p.r += 5; p.setMem('fameFanLetter', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_obsessive_fan',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 40 &&
      !G.mem.fameObsessiveFan,
    text: 'Someone has been following you online for years — not maliciously, they would say, just closely. They know which coffee shop you used in an interview three years ago. They have a theory about what your work means that is more detailed than anything you have consciously intended. There is no threat, exactly. There is just the feeling of being someone\'s entire explanation for something.',
    choices: [
      {
        text: 'Ignore it. This is what visibility costs.',
        tag: null,
        outcome: 'You look for their account periodically and hate that you do.',
        effect: (p) => { p.m -= 10; p.addFlag('experienced_obsession'); p.setMem('fameObsessiveFan', true) },
      },
      {
        text: 'Have someone send a calm, firm message.',
        tag: null,
        outcome: 'The account goes quiet for a while. You are not certain it is gone.',
        effect: (p) => { p.m -= 6; p.s -= 2; p.setMem('fameObsessiveFan', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_old_interview_resurfaces',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 30 &&
      G.age >= 30 &&
      G.currentYear >= 2010 &&
      !G.mem.fameOldInterview,
    text: 'An interview from years ago has found a new audience. You read what you said then. The words are yours — the rhythm, the turns of phrase — but the positions belong to someone younger and more certain. You are not sure you would correct them, exactly. You are not sure you recognize the person who said them.',
    choices: [
      {
        text: 'Address it directly. You have changed; say so.',
        tag: null,
        outcome: 'Some people respect the honesty. Others cite it as inconsistency. The story runs for two days.',
        effect: (p) => { p.karma += 5; p.m -= 6; p.e += 3; p.addFlag('publicly_changed_mind'); p.setMem('fameOldInterview', true) },
      },
      {
        text: 'Let it circulate. Context is always missing.',
        tag: null,
        outcome: 'The conversation moves on. Something about it stays with you.',
        effect: (p) => { p.m -= 8; p.r += 5; p.setMem('fameOldInterview', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_fading',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.fame >= 20 &&
      G.fame <= 55 &&
      G.age >= 45 &&
      !G.mem.fameFading,
    text: 'You are at a gathering where you would once have been recognized by half the room. Tonight, a young woman looks at you with polite blankness when someone says your name. The world has continued accumulating new things to know. You are one of the older facts.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.e += 3; p.setMem('fameFading', true) },
  },

  {
    id: 'fame_specific_circle',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.fame >= 20 &&
      G.fame <= 45 &&
      !G.mem.fameSpecificCircle,
    text: 'At a conference, or a festival, or an opening, you are surrounded by people who know your work in exact detail. They quote it back to you. Outside this room you are nobody in particular, and that remains true. But in this room, for this evening, you understand what it feels like to be someone\'s entire reference point for a thing they love.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.karma += 2; p.setMem('fameSpecificCircle', true) },
  },

  {
    id: 'fame_family_reaction',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 30 &&
      !G.mem.fameFamilyReaction,
    text: 'Someone in your family — a sibling, a cousin — has started introducing you differently. Not by your name but by what you are. You notice the change in how they hold themselves when you are in a room together. It is not pride, exactly. It is something more complicated than pride.',
    choices: [
      {
        text: 'Say something. This is not who you want to be to them.',
        tag: null,
        outcome: 'They say they don\'t mean anything by it. Things ease slightly. Then gradually return to what they were.',
        effect: (p) => { p.m -= 5; p.s += 3; p.karma += 3; p.setMem('fameFamilyReaction', true) },
      },
      {
        text: 'Leave it. Some distances cannot be walked back.',
        tag: null,
        outcome: 'The gap settles into the family, unnamed and permanent.',
        effect: (p) => { p.m -= 8; p.r += 6; p.setMem('fameFamilyReaction', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fame_money_gap',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 40 &&
      G.money < 20000 &&
      !G.mem.fameMoneyGap,
    text: 'People assume things about your life. They see the name and imagine the income that should accompany it. You are declined for a loan. You are eating carefully this month. The gap between your public existence and your actual one requires constant maintenance.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('famous_not_rich'); p.setMem('fameMoneyGap', true) },
  },

  {
    id: 'fame_cancel',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.fame > 40 &&
      G.currentYear > 2010 &&
      !G.mem.fameCancel,
    text: 'A post circulates calling for people to stop supporting your work. The reason given is real — something from years ago, taken in isolation, rendered as its worst possible version. Former allies say nothing. Some say something worse than nothing. The silence of people who know you is the part you return to.',
    choices: [
      {
        text: 'Make a public statement. Explain the context.',
        tag: null,
        outcome: 'The statement is picked apart in turn. Some people return. Others cite the statement itself as further evidence.',
        effect: (p) => { p.fame -= 15; p.m -= 15; p.s -= 4; p.addFlag('cancelled'); p.setMem('fameCancel', true) },
      },
      {
        text: 'Go quiet. Let the wave break.',
        tag: null,
        outcome: 'The campaign loses momentum over two weeks. The damage to your reputation is slower and harder to measure.',
        effect: (p) => { p.fame -= 10; p.m -= 18; p.r += 8; p.addFlag('cancelled'); p.setMem('fameCancel', true) },
      },
    ],
    effect: null,
  },

  // ── KARMA: HIGH ───────────────────────────────────────────────────────────────

  {
    id: 'karma_help_returned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.karma > 65 &&
      !G.mem.karmaHelpReturned &&
      G.age >= 35,
    text: 'A call from someone you helped years ago — in a way you have mostly forgotten, some practical thing you thought nothing of at the time. They are in a position now to return it. They do. It is not a transaction; they say that clearly. It is just that they have not forgotten, and they wanted you to know.',
    choices: null,
    effect: (p) => { p.m += 12; p.mo += 3000; p.karma += 3; p.setMem('karmaHelpReturned', true) },
  },

  {
    id: 'karma_stranger_trust',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.karma > 70 &&
      !G.mem.karmaStrangerTrust,
    text: 'A stranger on a train asks you to watch their bag while they step away. You have been asked this before, everyone has, but she leaves for almost an hour. There is something in how she reads you at a glance — the decision she makes in two seconds about who you are — that stays with you long after she comes back.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 3; p.karma += 2; p.setMem('karmaStrangerTrust', true) },
  },

  {
    id: 'karma_community_recognition',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.karma > 75 &&
      G.age >= 40 &&
      !G.mem.karmaCommunityRecognition,
    text: 'The neighborhood association, or the local council, or the community center — some collective body you have contributed to over the years — holds an evening in your name. There are speeches. Children you do not recognize are brought forward. Someone describes decisions you made decades ago as though they were obvious acts of goodness. You do not remember them as obvious.',
    choices: null,
    effect: (p) => { p.m += 14; p.s += 5; p.fame += 8; p.addFlag('community_recognized'); p.setMem('karmaCommunityRecognition', true) },
  },

  {
    id: 'karma_good_reputation_protects',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.karma > 70 &&
      !G.mem.karmaRepProtects,
    text: 'An accusation reaches your employer — something vague, something that could mean several things. Before you have said a single word in your own defense, three people who know your work have already spoken. You are never told the details of what was said. You understand what happened.',
    choices: null,
    effect: (p) => { p.m += 6; p.s += 4; p.karma += 2; p.setMem('karmaRepProtects', true) },
  },

  {
    id: 'karma_guilt_gift',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.karma > 65 &&
      !G.mem.karmaGuiltGift,
    text: 'A package arrives with no note. Inside: something specific, something you had mentioned once in passing to someone and then forgotten. You go through the possibilities. Three days later the context clicks into place. It was gratitude for something you did not think of as significant.',
    choices: null,
    effect: (p) => { p.m += 10; p.setMem('karmaGuiltGift', true) },
  },

  {
    id: 'karma_deathbed_gratitude',
    phase: 'late_life',
    weight: 1,
    when: (G) =>
      G.karma > 80 &&
      G.age >= 50 &&
      !G.mem.karmaDeathbedGratitude,
    text: 'You are sitting beside a hospital bed. The person in it is someone from a long time ago — not family, not exactly a friend. They take your hand and they say your name. They say: I would not have made it through that year without you. You do not say anything. There is nothing that needs to be said.',
    choices: null,
    effect: (p) => { p.m += 18; p.r -= 8; p.karma += 5; p.addFlag('deathbed_gratitude'); p.setMem('karmaDeathbedGratitude', true) },
  },

  // ── KARMA: LOW ────────────────────────────────────────────────────────────────

  {
    id: 'karma_reputation_catches_up',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.karma < 30 &&
      !G.mem.karmaRepCatchesUp &&
      G.age >= 30,
    text: 'The new director of the department turns out to be someone you dealt badly with years ago — a situation you thought had no permanent consequences. They are not unkind to you. They are precise, and distant, and very good at paperwork. You understand that your margin for error here is now exactly zero.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('karma_pursued'); p.setMem('karmaRepCatchesUp', true) },
  },

  {
    id: 'karma_guilt_intrusion',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.karma < 30 &&
      !G.mem.karmaGuiltIntrusion,
    text: 'You are in the middle of telling a story — at dinner, at a work gathering — when a memory interrupts it. Something you did. Not a crime. The kind of thing that has no name and no mechanism for resolution. Your voice continues. The story gets to its ending. No one notices anything.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 12; p.setMem('karmaGuiltIntrusion', true) },
  },

  {
    id: 'karma_betrayal_by_proxy',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.karma < 35 &&
      !G.mem.karmaBetrayal,
    text: 'Someone does to you something close to what you once did to another person. The details differ, but the shape is identical: the same convenience, the same willingness to let the other person carry the cost. You recognize it immediately. You sit with the recognition for a long time before you say anything.',
    choices: [
      {
        text: 'Confront them. You know exactly what this is.',
        tag: null,
        outcome: 'They deny it, or explain it differently. Neither of you says what the conversation is actually about.',
        effect: (p) => { p.m -= 10; p.r += 8; p.karma += 5; p.setMem('karmaBetrayal', true) },
      },
      {
        text: 'Say nothing. You forfeited the right to name this.',
        tag: null,
        outcome: 'You absorb it. The accounting feels correct, in a way that provides no relief.',
        effect: (p) => { p.m -= 14; p.r += 15; p.setMem('karmaBetrayal', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'karma_isolation',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.karma < 30 &&
      G.age >= 45 &&
      !G.mem.karmaIsolation,
    text: 'You are in the hospital for a procedure — minor, they say, though nothing is minor when you are alone. The chairs in the waiting room are for people who come with someone. You are not sure when you stopped being someone people come with. You have a theory about the sequence of events.',
    choices: null,
    effect: (p) => { p.m -= 16; p.r += 12; p.h -= 4; p.setMem('karmaIsolation', true) },
  },

  {
    id: 'karma_cannot_undo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.karma < 25 &&
      G.age >= 50 &&
      !G.mem.karmaCannotUndo,
    text: 'You find the person. You have thought for years about what you would say when you did. They listen to all of it. Then they tell you they stopped needing this a long time ago. They are kind about it, which is worse. They have made peace with what happened. They do not need you to have made peace with it.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 18; p.karma += 8; p.addFlag('amends_rejected'); p.setMem('karmaCannotUndo', true) },
  },

  {
    id: 'karma_conscience',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.karma < 35 &&
      !G.mem.karmaConscience,
    text: 'Three in the morning. The specific clarity of that hour. You go through it again — the decision, the moment you made the calculation, the face of the other person. You have been over this sequence many times. It does not get shorter. You get up and make tea and wait for the sky to change.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 10; p.h -= 2; p.setMem('karmaConscience', true) },
  },

  // ── HOBBY PAYOFF ─────────────────────────────────────────────────────────────

  {
    id: 'hobby_painting_exhibition',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.hobbies?.painting?.level ?? 0) >= 3 &&
      G.age >= 30 &&
      !G.mem.hobbyPaintingExhibition,
    text: 'The gallery is small — a local cooperative, three rooms, nothing prestigious. Your paintings are on the wall. Strangers stand in front of them and talk about what they see. One woman stands in front of the largest one for a long time without speaking. You do not know what she is thinking. You are not sure you want to.',
    choices: [
      {
        text: 'Go and speak with people.',
        tag: null,
        outcome: 'The conversations are awkward and genuine in equal measure. Someone offers a small sum for the large piece.',
        effect: (p) => { p.m += 12; p.s += 4; p.mo += 500; p.fame += 5; p.addFlag('exhibited_art'); p.setMem('hobbyPaintingExhibition', true) },
      },
      {
        text: 'Stay near the door. Watch from a distance.',
        tag: null,
        outcome: 'You spend the evening observing your own work being experienced. It is stranger than you expected.',
        effect: (p) => { p.m += 8; p.e += 3; p.setMem('hobbyPaintingExhibition', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'hobby_writing_published',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.hobbies?.writing?.level ?? 0) >= 3 &&
      !G.mem.hobbyWritingPublished,
    text: 'The acceptance comes for a piece you almost did not send — not the careful one you revised for months, but the one you wrote quickly, in one sitting, about something you were not planning to write about. The editor calls it precise. You are not sure you agree. You are glad it found its way out.',
    choices: null,
    effect: (p) => { p.m += 14; p.e += 4; p.fame += 6; p.mo += 300; p.addFlag('published_writing'); p.setMem('hobbyWritingPublished', true) },
  },

  {
    id: 'hobby_music_performance',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ((G.hobbies?.guitar?.level ?? 0) >= 2 || (G.hobbies?.music?.level ?? 0) >= 2) &&
      !G.mem.hobbyMusicPerformance,
    text: 'Someone asks you to play at an event — a bar, a wedding, a community gathering. It is a small room. The first chord lands and the talking in the back does not stop entirely. By the third song it has.',
    choices: [
      {
        text: 'Play a full set. See where it goes.',
        tag: null,
        outcome: 'Three people ask for your contact afterward. You are not sure what to do with this information.',
        effect: (p) => { p.m += 12; p.s += 5; p.fame += 4; p.addFlag('performed_music'); p.setMem('hobbyMusicPerformance', true) },
      },
      {
        text: 'Play a few songs and make your excuses.',
        tag: null,
        outcome: 'It was enough. You drove home with the window down.',
        effect: (p) => { p.m += 8; p.setMem('hobbyMusicPerformance', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'hobby_running_marathon',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.hobbies?.running?.level ?? 0) >= 3 &&
      G.age >= 25 &&
      G.age <= 60 &&
      !G.mem.hobbyRunningMarathon,
    text: 'The last six kilometers are different from the rest. The kilometers before them are about pace and strategy and watching your form. These last six are about something less clean. You cross the line. Your legs work and then they do not. Someone puts a foil blanket around your shoulders.',
    choices: null,
    effect: (p) => { p.m += 16; p.h += 6; p.addFlag('marathon_finisher'); p.setMem('hobbyRunningMarathon', true) },
  },

  {
    id: 'hobby_cooking_recognition',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.hobbies?.cooking?.level ?? 0) >= 2 &&
      !G.mem.hobbyCookingRecognition,
    text: 'At a dinner, someone stops halfway through a dish and asks what is in it. Not the ingredients exactly — what you did. You try to explain the process and realize partway through that you cannot fully explain it. You have made this dish so many times that the decision-making has moved somewhere outside language. They ask for the recipe. You write it down as best you can.',
    choices: null,
    effect: (p) => { p.m += 10; p.s += 4; p.addFlag('known_for_cooking'); p.setMem('hobbyCookingRecognition', true) },
  },

  {
    id: 'hobby_late_discovery',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 60 &&
      !G.mem.hobbyLateDiscovery &&
      Object.values(G.hobbies ?? {}).every(h => (h?.level ?? 0) <= 1),
    text: 'You try something you have never tried: a ceramics class, or chess, or growing things from seed. You are bad at it in the specific way of someone who has not been bad at something new in decades. Your hands do not know what they are doing yet. This turns out to be exactly what you needed.',
    choices: null,
    effect: (p) => { p.m += 14; p.h += 3; p.e += 5; p.addFlag('late_hobby'); p.setMem('hobbyLateDiscovery', true) },
  },

  {
    id: 'hobby_master_craftsman',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      Object.values(G.hobbies ?? {}).some(h => (h?.level ?? 0) >= 4) &&
      G.age >= 50 &&
      !G.mem.hobbyMasterCraftsman,
    text: 'There is no moment of arrival. You notice it only in absence — the inner argument that used to accompany the work is gone. You sit down and the thing happens. Decades of a practice and this is what it finally looks like: a kind of silence where the effort used to be.',
    choices: null,
    effect: (p) => { p.m += 16; p.e += 5; p.s += 3; p.fame += 6; p.addFlag('mastered_craft'); p.setMem('hobbyMasterCraftsman', true) },
  },

  {
    id: 'hobby_injury',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 40 &&
      (G.stats?.fitness ?? 50) < 50 &&
      ((G.hobbies?.running?.level ?? 0) >= 1 || (G.hobbies?.martial_arts?.level ?? 0) >= 1) &&
      !G.mem.hobbyInjury,
    text: 'The injury is not dramatic — a wrong step, a small sound, a slow realization over the following days that something is genuinely wrong. The specialist says you can continue, with modifications. You discover that what you were doing with your body was also what you were doing with your mind, and that the modifications will touch both.',
    choices: [
      {
        text: 'Adapt. Find a slower version of the same thing.',
        tag: null,
        outcome: 'It takes months to stop grieving the old pace. The new one becomes its own thing eventually.',
        effect: (p) => { p.h -= 6; p.m -= 8; p.r += 5; p.setMem('hobbyInjury', true) },
      },
      {
        text: 'Stop for now. Some things cannot be modified.',
        tag: null,
        outcome: 'You miss it in a way that is difficult to explain to people who have not done it.',
        effect: (p) => { p.h -= 6; p.m -= 14; p.r += 9; p.setMem('hobbyInjury', true) },
      },
    ],
    effect: null,
  },

  // ── FRIENDSHIP DEPTH ─────────────────────────────────────────────────────────

  {
    id: 'friend_betrayal',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.friends && G.friends.some(f => f.alive && f.relationshipQuality >= 70) &&
      !G.mem.friendBetrayal,
    text: 'You find out from a third party — not in a dramatic way, over coffee, in passing — that something you told your closest friend in confidence has been shared. Not maliciously, probably. Just as a story. Your name in a stranger\'s mouth for no reason you agreed to.',
    choices: [
      {
        text: 'Confront them directly.',
        tag: null,
        outcome: 'They apologize, and mean it, and it is still not sufficient. You stay friends, but something has been handled and set down and will never be fully picked up again.',
        effect: (p) => { p.m -= 14; p.r += 6; p.updateFriendRel(0, -20); p.setMem('friendBetrayal', true) },
      },
      {
        text: 'Say nothing. Adjust what you share going forward.',
        tag: null,
        outcome: 'The friendship continues but differently. They cannot know why. You cannot fully explain it even to yourself.',
        effect: (p) => { p.m -= 16; p.r += 10; p.setMem('friendBetrayal', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_jealousy',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.friends && G.friends.some(f => f.alive) &&
      !G.mem.friendJealousy,
    text: 'Something good happens — a job, a publication, a relationship, a child — and you watch your friend receive the news. The smile is real. Beneath it there is something else, visible for just a moment before they close it over. You pretend not to have seen it. You are not sure which of you this protects.',
    choices: [
      {
        text: 'Name it, gently. You have known each other long enough.',
        tag: null,
        outcome: 'They deny it and then, later, in the same conversation, admit it. The honesty makes the friendship stranger and more real.',
        effect: (p) => { p.m -= 6; p.s += 4; p.karma += 3; p.setMem('friendJealousy', true) },
      },
      {
        text: 'Let it pass unremarked. This is what friendship sometimes costs.',
        tag: null,
        outcome: 'The moment passes. The friendship continues. You have both absorbed something without names.',
        effect: (p) => { p.m -= 4; p.r += 4; p.setMem('friendJealousy', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_crisis_support',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.friends && G.friends.some(f => f.alive) &&
      !G.mem.friendCrisisSupport,
    text: 'Your friend is in a bad stretch — a divorce, a diagnosis, a collapse of something they had built for years. They call at odd hours. They repeat the same things. You sit with them in the hospital waiting room or on their couch or on the phone and you do not say the things you are tempted to say. You stay. That is what you do.',
    choices: [
      {
        text: 'Show up fully. Everything else can wait.',
        tag: null,
        outcome: 'You lose two weeks to this. You do not regret them.',
        effect: (p) => { p.m += 4; p.karma += 8; p.r -= 5; p.addFlag('showed_up_for_friend'); p.setMem('friendCrisisSupport', true) },
      },
      {
        text: 'Do what you can, but within limits.',
        tag: null,
        outcome: 'You help, in the ways that do not cost you too much. You know that they know this. You both pretend otherwise.',
        effect: (p) => { p.m -= 4; p.r += 8; p.setMem('friendCrisisSupport', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_money_ask',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.friends && G.friends.some(f => f.alive) &&
      G.money > 5000 &&
      !G.mem.friendMoneyAsk,
    text: 'The ask comes in a roundabout way — they say they hate asking, that they would not if there were another option. The amount is real money. Not ruinous, but real. You run through the calculation and you also run through what it would mean to say no to this particular person.',
    choices: [
      {
        text: 'Lend it. Call it a loan if that makes it easier.',
        tag: null,
        outcome: 'They are grateful in a way that slightly changes how they look at you. You both know this money will probably not come back.',
        effect: (p) => { p.mo -= 2000; p.karma += 5; p.m -= 3; p.setMem('friendMoneyAsk', true) },
      },
      {
        text: 'Decline. You cannot afford this particular entanglement.',
        tag: null,
        outcome: 'They say they understand. Something in the friendship has shifted, not permanently, but noticeably.',
        effect: (p) => { p.m -= 8; p.r += 7; p.setMem('friendMoneyAsk', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_reunion',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 30 &&
      !G.mem.friendReunion,
    text: 'An old friend from school reaches out. They found you through something — a mutual contact, a name in an article. Their message is tentative, careful, as though they are not sure the person they knew still exists. You are not entirely sure either.',
    choices: [
      {
        text: 'Meet them.',
        tag: null,
        outcome: 'The first hour is performance. The second hour is something closer to real. You leave with their number and a faint grief for the decades that happened differently for each of you.',
        effect: (p) => { p.m += 6; p.r += 4; p.s += 3; p.addFriend('old friend', 60); p.setMem('friendReunion', true) },
      },
      {
        text: 'Reply warmly but do not follow through.',
        tag: null,
        outcome: 'The thread goes quiet after a few messages. That version of you stays in the past, where perhaps it belongs.',
        effect: (p) => { p.m -= 4; p.r += 6; p.setMem('friendReunion', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_drift',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 35 &&
      G.friends && G.friends.some(f => f.alive) &&
      !G.mem.friendDrift,
    text: 'You and someone who was once your closest friend have not spoken in eight months. You notice this the way you notice a sound stopping. There was no argument. There was no event. There was a long sequence of unreturned calls and missed occasions and the gradual understanding that both of you had allowed this to happen without either of you deciding to.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.setMem('friendDrift', true) },
  },

  {
    id: 'friend_death_peers',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      G.friends && G.friends.some(f => f.alive) &&
      !G.mem.friendDeathPeers,
    text: 'Your friend dies. Not a parent, not an older generation — someone your age, someone you have known since you were both young and had no particular reason to think you would not both be old. The funeral is ordinary. Afterward you do the arithmetic you have been avoiding: how many people from that original group are still here, and who is likely to go next.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 12; p.h -= 4; p.addFlag('outliving_peers'); p.setMem('friendDeathPeers', true) },
  },

  {
    id: 'friend_unexpected_depth',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 50 &&
      !G.mem.friendUnexpectedDepth,
    text: 'You have known this person for years in a peripheral way — a neighbor, a fellow member of something. One afternoon, for a small reason, a conversation goes further than it should. Two hours pass. You go home and think about it. Something about being older makes it possible to let someone in quickly, or perhaps it is only that you have fewer reasons left to be careful.',
    choices: null,
    effect: (p) => { p.m += 14; p.s += 3; p.addFriend('new close friend', 75); p.setMem('friendUnexpectedDepth', true) },
  },

]

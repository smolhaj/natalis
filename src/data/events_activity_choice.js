// events_activity_choice.js
// Story events that fire when a character has practised a hobby enough times.
// These close the loop between the Activities panel and the narrative — making
// deliberate practice visible as a life decision, not just a stat increment.
//
// Guards key off mem.actCount_<hobbyId> counters set by applyActivity().
// Each arc offers at least one real choice that sets a flag with downstream events.

export const ACTIVITY_CHOICE_EVENTS = [

  // ── WRITING ARC ─────────────────────────────────────────────────────────────

  {
    id: 'ac_writing_accumulation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.mem?.actCount_writing ?? 0) >= 3 &&
      G.age >= 18 &&
      !G.mem?.acWritingAccum,
    text: 'There are pages now — more than you\'d expected, more than you\'ve admitted to anyone. Not a finished thing. But not nothing. You look at the folder and find you have been treating it seriously without deciding to.',
    choices: [
      {
        text: 'Send it somewhere — see what happens',
        tag: 'writing_sent',
        outcome: 'You send it. The waiting begins. That is a different relationship to the work than you have had before.',
        effect: (p) => { p.m += 4; p.r += 3; p.addFlag('writing_sent'); p.setMem('acWritingAccum', true) },
      },
      {
        text: 'Not yet — it isn\'t ready',
        tag: 'writing_in_drawer',
        outcome: 'The folder stays where it is. The not-yet has a weight of its own.',
        effect: (p) => { p.m += 3; p.addFlag('writing_in_drawer'); p.addFlag('art_in_drawer'); p.setMem('acWritingAccum', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ac_writing_response',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('writing_sent') &&
      !G.mem?.acWritingResponse,
    text: 'A response arrives. It is not what you imagined, which is partly because you had not imagined this part clearly — you had imagined the work being read, not what followed from that. The response is specific enough to be real. It is not yes.',
    choices: [
      {
        text: 'Keep going anyway',
        tag: 'writing_persisted',
        outcome: 'The refusal is the first one you can quote. You are in the company of people who kept going.',
        effect: (p) => { p.m += 6; p.e += 3; p.r += 2; p.addFlag('writing_persisted'); p.setMem('acWritingResponse', true) },
      },
      {
        text: 'Step back for a while',
        tag: null,
        outcome: 'You put the folder away for the season. It will be there when you come back to it.',
        effect: (p) => { p.m -= 2; p.r += 4; p.addFlag('art_in_drawer'); p.setMem('acWritingResponse', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ac_writing_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.includes('writing_persisted') || (G.mem?.actCount_writing ?? 0) >= 8) &&
      G.age >= 38 &&
      !G.mem?.acWritingLate,
    text: 'You have been writing long enough that the early self-consciousness has mostly burned off. What is left is the work — the specific problem of getting what you mean onto the page. You have done this long enough that you know what your weaknesses are, which is different from being able to fix them.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.addFlag('writing_mature'); p.setMem('acWritingLate', true) },
  },

  // ── MUSIC ARC ───────────────────────────────────────────────────────────────

  {
    id: 'ac_music_commitment',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.mem?.actCount_music ?? 0) >= 4 &&
      G.age >= 16 &&
      !G.mem?.acMusicCommit,
    text: 'The instrument has started to sound like you — not perfect, but specific. Other people playing the same piece would sound like themselves. This is no longer just practice. You have been developing a voice you didn\'t know you were developing.',
    choices: [
      {
        text: 'Look for somewhere to play it — even once',
        tag: 'musician_performing',
        outcome: 'You say yes to something. The first time is terrifying in the way that things you care about are terrifying.',
        effect: (p) => { p.m += 5; p.r += 3; p.s += 3; p.addFlag('musician_performing'); p.setMem('acMusicCommit', true) },
      },
      {
        text: 'This is not performance music — it\'s thinking music',
        tag: 'music_private',
        outcome: 'You keep it. The instrument is a private language. That is a legitimate use of a private language.',
        effect: (p) => { p.m += 8; p.addFlag('music_private'); p.setMem('acMusicCommit', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ac_musician_first_gig',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('musician_performing') &&
      !G.mem?.acFirstGig,
    text: 'The venue is a room above a pub, or a community centre, or a friend\'s living room — it doesn\'t matter. The stage is whatever is in front of the chairs. You have been waiting for this to feel like you expected it to feel. It doesn\'t. It feels different, and better than you expected in a way that is harder to name.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 5; p.addFlag('musician_played_live'); p.setMem('acFirstGig', true) },
  },

  {
    id: 'ac_music_private_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('music_private') &&
      G.age >= 55 &&
      !G.mem?.acMusicPrivateLate,
    text: 'You still play, though no one has heard it but you. Decades of practice have produced something that has never been performed. The question of whether that matters has come up a few times over the years. Your answer has been consistent: the music was for you, and you got it.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 4; p.setMem('acMusicPrivateLate', true) },
  },

  // ── RUNNING / SPORT ARC ─────────────────────────────────────────────────────

  {
    id: 'ac_running_habit',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.mem?.actCount_sport ?? 0) >= 3 &&
      G.age >= 18 &&
      !G.mem?.acRunningHabit,
    text: 'You have become someone who does this — not occasionally, not when you remember to, but as a matter of fact. The runs have stopped feeling like effort and started feeling like the condition in which the rest of the day is possible.',
    choices: [
      {
        text: 'Enter a race — test what you\'ve built',
        tag: 'runner_entered_race',
        outcome: 'You register. The date on the calendar changes the texture of every run between now and then.',
        effect: (p) => { p.h += 5; p.m += 4; p.addFlag('runner_entered_race'); p.addFlag('runner_habit'); p.setMem('acRunningHabit', true) },
      },
      {
        text: 'Keep it private — this is yours',
        tag: 'running_private',
        outcome: 'No goal, no audience, no medal. The run is complete in itself. This is a difficult thing to hold onto and you hold it.',
        effect: (p) => { p.m += 10; p.h += 3; p.addFlag('running_private'); p.addFlag('runner_habit'); p.setMem('acRunningHabit', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ac_runner_race_day',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('runner_entered_race') &&
      !G.mem?.acRaceDay,
    text: 'Race day. You have been training for this morning for months. The gun goes and you settle into the pace you practiced. The wall arrives where the wall always arrives. You knew it was coming. Knowing it was coming doesn\'t help, exactly, but it means you had a plan.',
    choices: [
      {
        text: 'Finish — whatever it takes',
        tag: 'race_finished',
        outcome: 'You finish. The time is what the time is. You stood at the start line and crossed the finish line and that is the whole story.',
        effect: (p) => { p.h += 8; p.m += 14; p.addFlag('race_finished'); p.setMem('acRaceDay', true) },
      },
      {
        text: 'Pull out at halfway — the body is saying no',
        tag: null,
        outcome: 'You stop. This is the right call. The decision will take a while to feel like the right call.',
        effect: (p) => { p.m -= 5; p.h += 2; p.r += 4; p.setMem('acRaceDay', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ac_running_through_grief',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('runner_habit') &&
      (G.flags.includes('lost_parent') || G.flags.includes('widowed') || G.flags.includes('lost_friend')) &&
      G.age >= 35 &&
      !G.mem?.acRunningGrief,
    text: 'In the weeks after the loss, running was the only thing that worked. Not because it solved anything. Because the body had a task, and while the body had a task, the mind had permission to do something other than just sit with it. You ran further than you have ever run. Some mornings you didn\'t stop until you couldn\'t anymore.',
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 4; p.h += 5; p.setMem('acRunningGrief', true) },
  },

  {
    id: 'ac_running_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('runner_habit') &&
      G.age >= 55 &&
      !G.mem?.acRunningLate,
    text: 'You are still running. The pace has changed. The distance has changed. The knees have opinions they did not used to have. But you are still out there, early, before the day starts, which is its own kind of consistency — a form of faithfulness to something you decided about yourself a long time ago.',
    choices: null,
    effect: (p) => { p.m += 10; p.h += 5; p.karma += 3; p.setMem('acRunningLate', true) },
  },

  // ── ART ARC ──────────────────────────────────────────────────────────────────

  {
    id: 'ac_art_accumulation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.mem?.actCount_art ?? 0) >= 3 &&
      G.age >= 17 &&
      !G.mem?.acArtAccum,
    text: 'You have made a body of work. Not everything is good. Some of it is very good and you know which pieces those are because they surprised you when they came out — you made something you didn\'t know you could make.',
    choices: [
      {
        text: 'Show it — even to one person',
        tag: 'art_shown_to_someone',
        outcome: 'The specific experience of someone looking at your work while you watch them. It does not get easier but it does get more yours.',
        effect: (p) => { p.m += 6; p.r += 2; p.s += 3; p.addFlag('art_shown_to_someone'); p.setMem('acArtAccum', true) },
      },
      {
        text: 'Keep it — the making is enough',
        tag: 'art_in_drawer',
        outcome: 'It goes where it goes. You know it exists. That is a private richness that belongs entirely to you.',
        effect: (p) => { p.m += 8; p.addFlag('art_in_drawer'); p.setMem('acArtAccum', true) },
      },
    ],
    effect: null,
  },

  // ── READING ARC ─────────────────────────────────────────────────────────────

  {
    id: 'ac_reading_formation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.mem?.actCount_reading ?? 0) >= 5 &&
      G.age >= 18 &&
      !G.mem?.acReadingFormation,
    text: 'A reading period has produced something you hadn\'t expected: an argument you can follow all the way through, from premise to consequence, without losing the thread. You have developed an opinion on something that isn\'t a reaction — it\'s a position, built up over time, that you could explain to someone who disagrees.',
    choices: [
      {
        text: 'Say it somewhere — find the conversation',
        tag: 'intellectual_active',
        outcome: 'You find the conversation. It is harder and better than you expected.',
        effect: (p) => { p.e += 6; p.s += 4; p.m += 5; p.addFlag('intellectual_active'); p.setMem('acReadingFormation', true) },
      },
      {
        text: 'Let it remain interior — you don\'t need the argument',
        tag: null,
        outcome: 'The reading continues. The interior is spacious. Some things are better kept there.',
        effect: (p) => { p.e += 8; p.m += 6; p.setMem('acReadingFormation', true) },
      },
    ],
    effect: null,
  },

  // ── COOKING ARC ─────────────────────────────────────────────────────────────

  {
    id: 'ac_cooking_for_others',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.mem?.actCount_cooking ?? 0) >= 4 &&
      G.age >= 20 &&
      !G.mem?.acCookingOthers,
    text: 'You cook for people now. Not a big thing — a dinner, a gathering, something you made without thinking much about it that other people ate and talked about afterward in a way that surprised you. You have become someone other people want at the table.',
    choices: [
      {
        text: 'Take it seriously — a course, a real kitchen',
        tag: 'cooking_serious',
        outcome: 'You learn things that change what you can do. The kitchen is a different place now.',
        effect: (p) => { p.m += 8; p.s += 5; p.addFlag('cooking_serious'); p.setMem('acCookingOthers', true) },
      },
      {
        text: 'Keep it as what it is — feeding people you love',
        tag: null,
        outcome: 'It stays domestic and generous and yours. This is not a lesser version of cooking.',
        effect: (p) => { p.m += 12; p.karma += 4; p.setMem('acCookingOthers', true) },
      },
    ],
    effect: null,
  },

  // ── MEDITATION ARC ────────────────────────────────────────────────────────

  {
    id: 'ac_meditation_shift',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.mem?.actCount_meditation ?? 0) >= 4 &&
      G.age >= 28 &&
      !G.mem?.acMeditationShift,
    text: 'Something has changed in how difficulty sits on you. Not that difficulty has decreased — if anything, the problems are larger. But there is more space between the thing that happens and your response to it. You cannot tell exactly when this happened. You notice it the way you notice that you\'ve stopped stooping through a doorway you used to hit your head on.',
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 5; p.setMem('acMeditationShift', true) },
  },

  // ── CREATIVE IDENTITY (cross-hobby synthesis) ─────────────────────────────

  {
    id: 'ac_creative_identity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.acCreativeIdentity &&
      (
        G.flags.includes('writing_mature') ||
        G.flags.includes('musician_played_live') ||
        G.flags.includes('music_private') ||
        G.flags.includes('art_shown_to_someone') ||
        G.flags.includes('cooking_serious') ||
        G.flags.includes('running_private') ||
        G.flags.includes('race_finished')
      ),
    text: 'Someone asks what you do and you say the work thing, the career thing, and then you pause. There is another answer. You have been doing something — seriously, over years — that does not appear on your CV and cannot be explained in a sentence. The pause lasts long enough that the other person waits.',
    choices: [
      {
        text: 'Say it — own the thing you\'ve been building',
        tag: 'creative_identity_owned',
        outcome: 'You say it. The other person listens differently than you expected. The identity shifts, a little, in the saying.',
        effect: (p) => { p.m += 10; p.s += 5; p.karma += 4; p.addFlag('creative_identity_owned'); p.setMem('acCreativeIdentity', true) },
      },
      {
        text: 'It\'s a private thing — not worth explaining',
        tag: 'creative_identity_private',
        outcome: 'You redirect. The private thing stays private. You carry it with a particular kind of ownership that public things don\'t have.',
        effect: (p) => { p.m += 7; p.addFlag('creative_identity_private'); p.setMem('acCreativeIdentity', true) },
      },
    ],
    effect: null,
  },

  // ── CREATIVE IDENTITY LATE-LIFE CALLBACKS ────────────────────────────────

  {
    id: 'ac_creative_owned_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('creative_identity_owned') &&
      G.age >= 55 &&
      !G.mem?.acCreativeOwnedLate,
    text: 'You are known for two things now — the work you did and the thing you made outside of it. The second one is harder to explain on paper and easier to remember. People who know you well know both. The combination is, you have come to understand, the actual person.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 5; p.setMem('acCreativeOwnedLate', true) },
  },

  {
    id: 'ac_creative_private_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('creative_identity_private') &&
      G.age >= 58 &&
      !G.mem?.acCreativePrivateLate,
    text: 'What you made — across all those years, in the mornings and evenings when no one was watching — exists. It is real. The question of whether it matters to anyone but you is a question you have been living with long enough that you have an answer: it doesn\'t need to. It was for you. You got it.',
    choices: null,
    effect: (p) => { p.m += 14; p.karma += 6; p.setMem('acCreativePrivateLate', true) },
  },

]

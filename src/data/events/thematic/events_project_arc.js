// events_project_arc.js
// Milestone events for slow-burn personal projects (writing, running, music, art, business).
// These fire at specific project phases and ages, giving the project a felt arc beyond
// the year-texture prose.

export const PROJECT_ARC_EVENTS = [

  // ── MIDDLE-PHASE DOUBT ────────────────────────────────────────────────────────

  {
    id: 'proj_middle_doubt',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentProject?.phase === 'middle' &&
      !G.mem?.projMiddleDoubt &&
      ['writing', 'music', 'art'].includes(G.currentProject?.type),
    text: (G) => {
      const type = G.currentProject.type
      const what = type === 'writing' ? 'the writing' : type === 'music' ? 'the music' : 'the work'
      return `You have been doing this long enough to know you are past the beginning. ${what.charAt(0).toUpperCase() + what.slice(1)} is harder now than it was when it was new. The early energy has burned off. What remains is the actual thing.`
    },
    choices: [
      {
        text: 'You push through it',
        tag: null,
        outcome: 'The difficult middle is where the real thing gets made. You stay.',
        effect: (p) => { p.m += 6; p.e += 3; p.setMem('projMiddleDoubt', true) },
      },
      {
        text: 'You step back for a while',
        tag: null,
        outcome: 'You come back to it. Some projects need distance before they become clear.',
        effect: (p) => { p.m += 3; p.setMem('projMiddleDoubt', true) },
      },
    ],
    effect: null,
  },

  // ── SOMEONE NOTICES ───────────────────────────────────────────────────────────

  {
    id: 'proj_someone_asks',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentProject &&
      ['middle', 'late', 'established'].includes(G.currentProject?.phase) &&
      !G.mem?.projSomeoneAsked &&
      ['writing', 'music', 'art', 'running'].includes(G.currentProject?.type),
    text: (G) => {
      const type = G.currentProject.type
      const desc = {
        writing: 'Someone at work finds out you write. They ask what you write. The question catches you.',
        music: 'A colleague asks about the calluses on your fingers. You tell them you play. They ask to hear something.',
        art: 'Someone sees a piece of your work — by accident, in your home, or on your phone. They ask about it directly.',
        running: 'A younger person at work asks how you stay consistent. They want to start. They\'ve noticed you\'ve been at it for years.',
      }
      return desc[type] ?? 'Someone notices something you have been doing for years. They ask about it.'
    },
    choices: [
      {
        text: 'You tell them about it honestly',
        tag: null,
        outcome: 'The thing you kept private has been spoken aloud. It becomes slightly more real.',
        effect: (p) => { p.m += 8; p.s += 4; p.setMem('projSomeoneAsked', true) },
      },
      {
        text: 'You deflect — it\'s not a big deal',
        tag: null,
        outcome: 'You protect it. That instinct is also real.',
        effect: (p) => { p.m += 4; p.setMem('projSomeoneAsked', true) },
      },
    ],
    effect: null,
  },

  // ── THE STALL ─────────────────────────────────────────────────────────────────

  {
    id: 'proj_the_stall',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentProject?.phase === 'middle' &&
      !G.mem?.projStall &&
      G.career &&
      ['writing', 'music', 'art'].includes(G.currentProject?.type),
    text: (G) => {
      const type = G.currentProject.type
      const what = type === 'writing' ? 'writing' : type === 'music' ? 'playing' : 'making'
      return `Work and the rest of it have crowded out ${what}. You have not been doing it seriously in months. The project is still there — technically. Whether you are still the person who does it is the question.`
    },
    choices: [
      {
        text: 'You reclaim the time for it — something else gives',
        tag: null,
        outcome: 'You return. The return is awkward. You stay anyway.',
        effect: (p) => { p.m += 7; p.r -= 3; p.setMem('projStall', true) },
      },
      {
        text: 'This might be the end of that chapter',
        tag: null,
        outcome: 'You let it go. That is also a decision. It was real while it lasted.',
        effect: (p) => { p.m -= 4; p.r += 4; p.setMem('projStall', true) },
      },
    ],
    effect: null,
  },

  // ── CLARITY MOMENT ────────────────────────────────────────────────────────────

  {
    id: 'proj_clarity',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentProject?.phase === 'late' &&
      !G.mem?.projClarity &&
      ['writing', 'music', 'art'].includes(G.currentProject?.type),
    text: (G) => {
      const type = G.currentProject.type
      const desc = {
        writing: 'You are writing and the sentence comes out right. Not approximately right. Right. You read it back. You know what the whole thing is now.',
        music: 'You play a passage and it is what you meant. Not a version of what you meant. The thing itself. You sit for a moment before you play it again.',
        art: 'You step back from the work and see it. Not as you imagined it would be, but as what it is. What it is is good. You had not been sure until now.',
      }
      return desc[type] ?? 'After years of working toward something, you see it clearly for the first time.'
    },
    choices: null,
    effect: (p) => { p.m += 14; p.e += 5; p.addFlag('proj_clarity_reached'); p.setMem('projClarity', true) },
  },

  // ── LATE-PHASE REFLECTION ─────────────────────────────────────────────────────

  {
    id: 'proj_late_reflection',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.currentProject?.phase === 'established' &&
      !G.mem?.projLateReflection,
    text: (G) => {
      const type = G.currentProject?.type ?? 'project'
      const desc = {
        writing: 'You have been writing for most of your adult life. The accumulation is real. What it has given you is not entirely the thing you thought you were getting when you started.',
        running: 'You have been running for years. The body has changed; the habit has held. You did not know when you started that it would become this.',
        music: 'You have been playing for most of your adult life. The music has asked things of you and you have given them. That is a relationship that has outlasted many others.',
        art: 'You have been making work for years. The work is what it is. Whether it will outlast you is not the point. That you did it is.',
        business: 'You built something. It has been running for years. You have employed people, paid bills, survived downturns. Not every idea gets this far. You knew that.',
      }
      return desc[type] ?? 'You have been doing this for most of your adult life. The length of it means something.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 5; p.setMem('projLateReflection', true) },
  },

  // ── RUNNING: THE RACE ─────────────────────────────────────────────────────────

  {
    id: 'proj_run_race',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentProject?.type === 'running' &&
      G.currentProject?.phase === 'middle' &&
      !G.mem?.projRanRace &&
      G.flags.includes('runner_entered_race'),
    text: 'The race starts before dawn. You have been training for months. The crowd at the start line is all the same type of person — people who decided to do this, for reasons that are their own. The first hours are fine. The last kilometres are not fine. You finish.',
    choices: null,
    effect: (p) => { p.m += 15; p.h += 5; p.addFlag('proj_race_finished'); p.setMem('projRanRace', true) },
  },

  // ── WRITING: SOMETHING SHOWN ──────────────────────────────────────────────────

  {
    id: 'proj_writing_shown',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentProject?.type === 'writing' &&
      ['late', 'established'].includes(G.currentProject?.phase) &&
      G.flags.includes('writing_shown') &&
      !G.mem?.projWritingShown,
    text: 'The work is out there now. You sent it and it was accepted and now other people have read it. The reaction — the real reaction, not the polite one — is harder to read than you expected. Some of it lands. Some of it lands differently than you meant. All of it is out of your hands now.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 4; p.karma += 5; p.setMem('projWritingShown', true); p.legacy += 6 },
  },

]

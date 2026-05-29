// BUILD 47 — Mentor Arc
// Full arc: receiving mentorship → relationship deepens → mentor died/estranged → late echo
// Mirror arc: becoming the mentor → protégé surpasses / protégé betrays
// Trigger: mentor_at_work in events.js sets G.mem.mentorName + G.mem.mentorField
// This file handles everything downstream of that trigger.

export const MENTOR_EVENTS = [

  // ── RECEIVING MENTORSHIP ARC ───────────────────────────────────────────────

  {
    id: 'men_deepens',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.mem?.mentorName &&
      G.age >= 32 && G.age <= 44 &&
      !G.mem?.menDeepens,
    text: (G) => {
      const name = G.mem.mentorName
      const field = G.mem.mentorField ?? 'your field'
      return `${name} retired from the formal hierarchy two years ago. The relationship has stopped being professional in the narrow sense and become something harder to label. You meet for coffee. They ask about your work with the attention of someone who remembers when you didn't know what you now know. The question they ask that changes something: *Is this what you meant to be doing?*`
    },
    choices: [
      {
        text: 'Answer honestly — it\'s the relationship that can hold it',
        tag: null,
        outcome: (G) => `${G.mem?.mentorName ?? 'They'} listens without trying to fix it. That is rarer than the doors they once opened for you.`,
        effect: (p) => { p.setMem('menDeepens', true); p.m += 10; p.e += 4; p.s += 3 },
      },
      {
        text: 'Give the professional answer — you\'re doing well',
        tag: null,
        outcome: 'They accept it. You both know it is not the full picture. The friendship holds anyway.',
        effect: (p) => { p.setMem('menDeepens', true); p.m += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'men_favor_asked',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.mem?.mentorName &&
      G.age >= 35 && !G.mem?.menFavorAsked,
    text: (G) => {
      const name = G.mem.mentorName
      return `${name} calls with something that is framed as a small thing but isn't. A reference for someone in their family. Attendance at something. Support for a position you are not sure you agree with. The call is phrased as a request and feels like something older: the accumulated weight of everything they gave you over years.`
    },
    choices: [
      {
        text: 'Help — the debt is real and this is the currency',
        tag: null,
        outcome: 'You do it. The relationship continues unchanged, which may be what you were buying.',
        effect: (p) => { p.setMem('menFavorAsked', true); p.m -= 3; p.karma -= 2; p.s += 3 },
      },
      {
        text: 'Explain honestly what you\'re able to do and what you\'re not',
        tag: null,
        outcome: 'There is a pause on the line that is not quite disappointment but adjacent to it. The relationship survives. It shifts.',
        effect: (p) => { p.setMem('menFavorAsked', true); p.m -= 5; p.karma += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'men_estrangement',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.mem?.mentorName &&
      G.age >= 38 &&
      !G.mem?.menEstranged && !G.mem?.mentorDied,
    text: (G) => {
      const name = G.mem.mentorName
      return `The distance accumulates without a moment you can point to. ${name} aligned themselves with a position you cannot follow. Or you overtook them in ways that restructured the dynamic and neither of you knows how to recalibrate. The last few meetings have had the texture of obligation. You realise it has been eight months.`
    },
    choices: [
      {
        text: 'Reach out — reconnect without the pretence it\'s the same',
        tag: null,
        outcome: 'They are glad you called. It is not what it was. It is still something.',
        effect: (p) => { p.setMem('menEstranged', false); p.m += 6; p.karma += 3 },
      },
      {
        text: 'Let it recede — some relationships belong to the phase that needed them',
        tag: null,
        outcome: 'You remember them with gratitude. The gratitude is real. The contact is not.',
        effect: (p) => { p.setMem('menEstranged', true); p.m -= 3; p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'men_mentor_died',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.mem?.mentorName &&
      G.age >= 42 && !G.mem?.mentorDied,
    text: (G) => {
      const name = G.mem.mentorName
      return `${name} dies in the way that people at a certain age die — not suddenly, but faster than you expected. You hear about it from a colleague who heard from someone else, which tells you something about where you stood in their life by the end. The funeral is full of people who were helped by them in the way you were. You sit near the back and recognise nobody.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('mentorDied', true)
      p.m -= 15; p.r += 8
      p.addFlag('lost_mentor')
    },
  },

  {
    id: 'men_mentor_echo',
    phase: 'late_life',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.has('lost_mentor') &&
      G.age >= 58 && !G.mem?.menEcho,
    text: (G) => {
      const name = G.mem?.mentorName ?? 'They'
      return `You catch yourself using a phrase that isn't yours — an observation, a way of framing a question — and realise it came from ${name}, decades ago. The specific words they used in a specific meeting you half-remember. What they gave you is still moving through you, still doing work, thirty years later.`
    },
    choices: null,
    effect: (p) => { p.setMem('menEcho', true); p.m += 8; p.r += 3 },
  },

  // ── BECOMING THE MENTOR ────────────────────────────────────────────────────

  {
    id: 'men_becomes_mentor',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.career !== null &&
      G.career.level >= 2 &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.hasProtege &&
      (G.mem?.has_mentor || G.flags.has('mentored')),
    text: (G) => {
      const field = G.career?.title ?? 'your field'
      return `Someone junior is doing work in ${field} that you recognise — not the competence, which is evident, but the particular hunger in how they ask questions. The hunger is familiar. You are old enough now to understand what it means and what to do about it.`
    },
    choices: [
      {
        text: 'Take them under your wing — invest deliberately',
        tag: null,
        outcome: 'You begin making introductions. You share things the official training programme would not. The relationship takes years to become what it will become.',
        effect: (p) => {
          const c = p._state.character.country
          const pool = Math.random() > 0.5 ? c.namePool.male : c.namePool.female
          const name = `${pool[Math.floor(Math.random() * pool.length)]} ${c.surnames[Math.floor(Math.random() * c.surnames.length)]}`
          p.setMem('protegeName', name)
          p.setMem('hasProtege', true)
          p.m += 8; p.s += 5; p.karma += 5
          p.addFlag('is_mentor')
        },
      },
      {
        text: 'Be helpful but stay back — you don\'t have the time',
        tag: null,
        outcome: 'A reasonable call. You remain encouraging without the investment. They find someone else.',
        effect: (p) => { p.setMem('hasProtege', false); p.m += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'men_protege_surpasses',
    phase: 'late_life',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.mem?.protegeName &&
      G.age >= 58 && !G.mem?.protegeSurpasses,
    text: (G) => {
      const name = G.mem.protegeName
      return `${name} has received a distinction you never received. Not a bigger version of what you achieved — a different category of achievement, one you recognise as beyond what you were capable of. You are sitting in the audience at a ceremony. You are clapping. Both things are true simultaneously: the pride and the particular quality of being exceeded by someone you helped build.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('protegeSurpasses', true)
      p.m += 15; p.karma += 8
      p.addFlag('protege_exceeded')
    },
  },

  {
    id: 'men_protege_betrayal',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.mem?.protegeName &&
      G.age >= 42 && !G.mem?.protegeBetrayal && !G.mem?.protegeSurpasses,
    text: (G) => {
      const name = G.mem.protegeName
      return `${name} is presenting work to a client that draws directly from methodology you developed together. The credit line does not mention you. It is possible they didn\'t mean to. It is also possible they meant exactly to.`
    },
    choices: [
      {
        text: 'Confront them directly — this needs to be named',
        tag: null,
        outcome: 'They apologize in the way people apologize when caught rather than remorseful. The professional relationship continues. Something else does not.',
        effect: (p) => { p.setMem('protegeBetrayal', true); p.m -= 10; p.karma += 3; p.s += 3 },
      },
      {
        text: 'Let it go — the credit matters less than you thought',
        tag: null,
        outcome: 'A choice that looks like generosity and costs something. You know which it is.',
        effect: (p) => { p.setMem('protegeBetrayal', true); p.m -= 8; p.r += 6; p.karma += 5 },
      },
      {
        text: 'Document what happened and make sure it is known',
        tag: null,
        outcome: 'People in your field know what you know. The consequence to them is real, diffuse, and appropriate.',
        effect: (p) => { p.setMem('protegeBetrayal', true); p.m -= 5; p.karma -= 2; p.w += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'men_both_arcs',
    phase: 'late_life',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      (G.flags.has('lost_mentor') || G.mem?.mentorName) &&
      G.mem?.protegeName &&
      G.age >= 62 && !G.mem?.menBothArcs,
    text: (G) => {
      const mentor = G.mem?.mentorName ?? 'the person who made you possible'
      const protege = G.mem?.protegeName ?? 'someone you helped'
      return `You are ${G.age}. You have been on both sides of this. ${mentor} opened doors for you when doors were what you needed. You opened doors for ${protege}. You do not know what doors ${protege} has opened for others. You will never know. The chain continues past what you can see.`
    },
    choices: null,
    effect: (p) => { p.setMem('menBothArcs', true); p.m += 12; p.karma += 8 },
  },

  // ── ADOLESCENT MENTOR ECHO ─────────────────────────────────────────────────

  {
    id: 'men_adol_teacher_echo',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('mentored') &&
      G.age >= 35 && !G.mem?.menAdolEcho &&
      !G.mem?.menDeepens,
    text: (G) => {
      const name = G.mem?.firstTeacherName ?? 'a teacher whose name you still remember'
      return `You are explaining something to a younger colleague and you hear, in your own phrasing, the phrasing of ${name}. The specific patience in how you set up the premise. You became that without noticing. It is a strange way to keep someone alive.`
    },
    choices: null,
    effect: (p) => { p.setMem('menAdolEcho', true); p.m += 6; p.r += 3 },
  },

]

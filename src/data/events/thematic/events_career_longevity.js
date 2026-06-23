// events_career_longevity.js — The long arc of a career
//
// What it feels like after 15–25 years in a field. Not the early arc
// (events_career_arcs.js) or specific professions (doctor_arc, etc.) but the
// universal texture of sustained expertise: the change in register, the cost of
// mastery, the moment the field changes around you, the specific grief of
// a skill made obsolete. For anyone who has been doing the same thing
// for long enough to have an opinion about how it has changed.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const CAREER_LONGEVITY_EVENTS = [

  // ── MOST SENIOR IN THE ROOM ───────────────────────────────────────────────

  {
    id: 'cl_most_senior',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career?.level >= 3 &&
      G.age >= 40 && G.age <= 52 &&
      !G.mem?.clMostSenior,
    text: `At some point — you cannot name the exact meeting — you became the most senior person in the room. Not in a hierarchy sense necessarily: in the sense of years spent on this specific problem, this specific type of work. The younger people look at you for the answer before looking at each other. You give it. You notice yourself giving it with less uncertainty than you used to feel, and you are not sure whether the certainty represents genuine competence or the attrition of doubt.`,
    choices: [
      {
        text: 'The certainty is earned. Twenty years is twenty years.',
        tag: null,
        outcome: 'You know what you know. The question is whether you can still see what you don\'t know from here. That question is harder at this stage than it was at twenty-five.',
        effect: (p) => { p.e += 3; p.s += 2; p.setMem('clMostSenior', true) },
      },
      {
        text: 'The uncertainty was useful. You have started to miss it.',
        tag: null,
        outcome: 'The questions you asked when you didn\'t know the answer were better than the answers you give now. You are looking for ways to reinstall the not-knowing.',
        effect: (p) => { p.e += 4; p.r += 3; p.setMem('clMostSenior', true) },
      },
    ],
    effect: null,
  },

  // ── THE FIELD HAS CHANGED ─────────────────────────────────────────────────

  {
    id: 'cl_field_changed',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 42 && G.age <= 56 &&
      !G.mem?.clFieldChanged,
    text: `The field you entered twenty years ago is not the field you are in now. Not because the core has changed — the core problem you are working on is roughly what it was — but because the surrounding assumptions, the tools, the vocabulary, the acceptable methods have all shifted. The people who entered the field ten years after you learned a different version of it and consider the old version, the version you know most deeply, as history rather than practice.`,
    choices: [
      {
        text: 'You have stayed current. The new tools are yours too.',
        tag: null,
        outcome: 'You are a person who knows the old way and the new way, which is rarer than it sounds. The translation between them is something only you can do here.',
        effect: (p) => { p.e += 4; p.w += 2; p.setMem('clFieldChanged', true) },
      },
      {
        text: 'The new version is not better, just newer. You work in both.',
        tag: null,
        outcome: 'You carry the institutional memory, which has value. The question of whether institutional memory can be held alongside genuine openness to revision is one you have not finished answering.',
        effect: (p) => { p.e += 2; p.r += 4; p.setMem('clFieldChanged', true) },
      },
    ],
    effect: null,
  },

  // ── AUTOMATICITY ──────────────────────────────────────────────────────────

  {
    id: 'cl_automaticity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career?.level >= 2 &&
      G.age >= 38 && G.age <= 50 &&
      !G.mem?.clAutomaticity,
    text: `You notice you have stopped thinking about the work the way you used to think about it. Not because it has become boring — it hasn't — but because enough of it has moved below conscious processing. The calculation that took twenty minutes at thirty takes three seconds now, and the three seconds don't feel like calculation at all, they feel like knowing. This is called automaticity. It is one of the genuine achievements of sustained practice. It is also the beginning of a problem you will have later: you will be unable to explain how you know what you know.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('clAutomaticity', true) },
  },

  // ── OBSOLESCENCE ──────────────────────────────────────────────────────────

  {
    id: 'cl_obsolescence_signal',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 45 && G.age <= 58 &&
      !G.mem?.clObsolescence,
    text: `Something you know how to do — that you have done for twenty years, that you were once specifically sought for — is becoming less necessary. Not obsolete yet, not gone, but the gradient is visible. A tool has replaced it partially. A generation that doesn't know the old method has entered the field. The specific skill is being archived while you are still using it. You are watching this happen in real time, which is a particular kind of experience.`,
    choices: [
      {
        text: 'Adapt. The skill transfers to the new context.',
        tag: null,
        outcome: 'The thing you know is not the specific tool. It is the understanding underneath the tool. The understanding transfers. The specific tool does not, but that was never the point.',
        effect: (p) => { p.e += 3; p.r += 2; p.setMem('clObsolescence', true) },
      },
      {
        text: 'The new thing is not better, and you will not pretend it is.',
        tag: null,
        outcome: 'You are right about some of this and wrong about some of this and you will not know the final score until the field reaches its verdict. The field\'s verdict takes longer than you would like.',
        effect: (p) => { p.r += 6; p.setMem('clObsolescence', true) },
      },
    ],
    effect: null,
  },

  // ── THE SPECIFIC GRIEF OF MASTERY ─────────────────────────────────────────

  {
    id: 'cl_mastery_grief',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career?.level >= 3 &&
      G.age >= 44 && G.age <= 58 &&
      !G.mem?.clMasteryGrief,
    text: pick([
      `There was a time when the work surprised you constantly. You would finish a task and not quite know how you had done it — you had extended yourself, reached for something, and sometimes it came. That is mostly gone now. The work is good, consistently good, and consistently is the word that replaced the other thing. The consistency is real. The other thing was also real. They could not coexist.`,
      `You cannot access beginner's mind from here. The literature on expertise calls this the curse of knowledge: the more you know a domain, the less you can see what it was like not to know it, which means you have become worse at certain kinds of understanding even as you have become better at everything else. The trade was not optional. You made it by practicing.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('clMasteryGrief', true) },
  },

  // ── THE QUESTION ABOUT STAYING ─────────────────────────────────────────────

  {
    id: 'cl_staying_question',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 42 && G.age <= 55 &&
      !G.mem?.clStayingQuestion,
    text: `The question comes around every few years and this time it is more serious than the others: do you stay in this field. Not because you are doing badly — you are doing well. Not because another field has called — nothing specific has. But the body of work you have produced is large enough to see, and what you see is a specific thing you have been building, and you are not sure the thing you have been building is the thing you wanted to build. The question is structural. The answer will have consequences.`,
    choices: [
      {
        text: 'You stay. The work is yours. The years in it are not transferable.',
        tag: null,
        outcome: 'The question does not leave — it becomes part of the landscape you work in. The staying is a continuous decision, not a resolved one.',
        effect: (p) => { p.r += 4; p.w += 2; p.setMem('clStayingQuestion', true) },
      },
      {
        text: 'You make a lateral move — not out of the field, but into a different part of it.',
        tag: null,
        outcome: 'The pivot is smaller than you thought you needed and produces more than you expected. Something resets. Not everything.',
        effect: (p) => { p.m += 6; p.r += 2; p.setMem('clStayingQuestion', true) },
      },
    ],
    effect: null,
  },

  // ── PASSING IT ON ─────────────────────────────────────────────────────────

  {
    id: 'cl_passing_on',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.career?.level >= 3 &&
      G.age >= 52 && G.age <= 65 &&
      !G.mem?.clPassingOn,
    text: `There are things you know that cannot be written in a manual. The manual of your field exists and is not what you know — what you know is the judgment layer above the manual: when to deviate from it, which rule bends in which context, what the edge cases actually look like when they arrive. You have been trying to pass this on for years to people who will have to earn it the same way you earned it, which is through the years themselves. The transmission is partial. The partial transmission is still worth attempting.`,
    choices: null,
    effect: (p) => { p.karma += 5; p.e += 2; p.r += 2; p.setMem('clPassingOn', true) },
  },

  // ── THE INSTITUTIONAL MEMORY ──────────────────────────────────────────────

  {
    id: 'cl_institutional_memory',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 55 && G.age <= 68 &&
      !G.mem?.clInstitutionalMemory,
    text: `You are the memory now. When people need to know why a decision was made fifteen years ago, or why a process works the way it does, or what was tried in 2007 and why it didn't work — they come to you. The role is not formal. It has no title. It is simply the function of having been here longer than everyone else. You are the record of things that were not written down, which is most of what was learned.`,
    choices: null,
    effect: (p) => { p.s += 3; p.r += 3; p.karma += 3; p.setMem('clInstitutionalMemory', true) },
  },

  // ── LATE CAREER FREEDOM ────────────────────────────────────────────────────

  {
    id: 'cl_late_freedom',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.career?.level >= 3 &&
      G.age >= 58 && G.age <= 70 &&
      !G.mem?.clLateFreedom,
    text: `Something has become available at this stage that was not available before: the freedom to be wrong without consequence, the freedom to say what you actually think, the freedom to pursue the questions that interest you rather than the questions that advance a position. The cost of reputation is behind you. The cost of being wrong is also behind you — you have been wrong enough that the prospect no longer closes your throat. The specific freedom of late career is not appreciated fully until you are inside it.`,
    choices: null,
    effect: (p) => { p.m += 6; p.e += 3; p.setMem('clLateFreedom', true) },
  },

  // ── WHAT THE WORK COST ─────────────────────────────────────────────────────

  {
    id: 'cl_work_cost',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 60 && G.age <= 72 &&
      !G.mem?.clWorkCost,
    text: `The cost of a working life is visible from here in a way it was not visible during the working. The weekends that became workdays. The evenings that went to the desk rather than the people in the next room. The things that would have happened if you had been elsewhere are not abstract — you can name some of them specifically. The calculation is not simple. The work also gave you things that cannot be named as simply. You carry both columns and the balance is not one you can settle cleanly.`,
    choices: [
      {
        text: 'The work was worth the cost. The work was the life.',
        tag: null,
        outcome: 'This is true and not complete. The things that happened while you were at the desk also happened. The two truths require no resolution.',
        effect: (p) => { p.m += 4; p.karma += 3; p.setMem('clWorkCost', true) },
      },
      {
        text: 'The cost was real. Some of it was not necessary.',
        tag: null,
        outcome: 'The not-necessary part is the part you can actually do something about, going forward, in the years that remain. This is useful information.',
        effect: (p) => { p.r += 4; p.e += 3; p.setMem('clWorkCost', true) },
      },
    ],
    effect: null,
  },

]

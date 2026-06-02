// events_followthrough_9.js
// Dedicated follow-through events for high-priority partial flags:
// genocide_survivor, experienced_miscarriage, multiple_miscarriage,
// sibling_estranged, lost_sibling.
// Also: torture_survived (set here for political prisoners in authoritarian regimes)
// and traumatized_by_violence follow-throughs.

export const FOLLOWTHROUGH_9_EVENTS = [

  // ── TORTURE SURVIVED (political prisoner in authoritarian regime) ─────────────

  {
    id: 'ft9_political_detention_torture',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('political_prisoner') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime) &&
      G.inPrison &&
      !G.mem?.ft9TortureSurvived,
    text: 'They take you into a room with no windows and ask questions they already know the answers to. The point is not the information — the point is that you understand they can do this. That is the whole point. You do not break in the way they want. You break in ways they don\'t count.',
    choices: null,
    effect: (p) => {
      p.m -= 20
      p.h -= 12
      p.r += 10
      p.karma += 8
      p.addFlag('torture_survived')
      p.setMem('ft9TortureSurvived', true)
    },
  },

  {
    id: 'ft9_torture_midlife_body',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('torture_survived') &&
      G.age >= 35 &&
      !G.mem?.ft9TortureMidlife,
    text: 'The body keeps the record. There are things that trigger it — a particular quality of silence, the sound of a door locking, the way someone stands in a doorway. You know the difference between the past and the present. The nervous system does not always agree. You have learned to work around this. It costs something every time.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.h -= 3
      p.r += 5
      p.setMem('ft9TortureMidlife', true)
    },
  },

  {
    id: 'ft9_torture_late_testimony',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('torture_survived') &&
      G.age >= 60 &&
      !G.mem?.ft9TortureLate,
    text: 'There is a word for what was done to you in that room. For most of your life you did not use it — you called it "the questioning" or "what happened" or nothing at all. You use the word now. Not often. But you use it. That matters in ways you cannot fully explain.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 6
      p.setMem('ft9TortureLate', true)
    },
  },

  // ── TRAUMATIZED BY VIOLENCE ───────────────────────────────────────────────────

  {
    id: 'ft9_violence_trauma_body',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('traumatized_by_violence') &&
      G.age >= 20 &&
      !G.mem?.ft9ViolenceTraumaBody,
    text: 'You know this about yourself: there are things that happen in the body before the mind catches up. A loud sound, a certain kind of movement in the periphery, the particular posture of a person moving toward you too quickly. The reaction is faster than thought. You have learned to manage it. Management is not the same as it not being there.',
    choices: [
      {
        text: 'Talk to someone — you cannot manage this alone indefinitely',
        tag: 'trauma_addressed',
        outcome: 'You find someone who understands what this is. It takes time and is not a cure. But the load shifts.',
        effect: (p) => { p.m += 8; p.h += 4; p.addFlag('trauma_addressed'); p.setMem('ft9ViolenceTraumaBody', true) },
      },
      {
        text: 'Keep managing — you know the triggers, you can work around them',
        tag: null,
        outcome: 'You continue as you have. The management is not nothing. You have built a life inside its limits.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft9ViolenceTraumaBody', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_violence_trauma_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('traumatized_by_violence') &&
      !G.flags.has('trauma_addressed') &&
      G.age >= 40 &&
      !G.mem?.ft9ViolenceTraumaMidlife,
    text: 'You have carried it for twenty years or more. The carrying has become so familiar you forget it is carrying. Then something small — not anything like what happened — brings it close again. Not as a memory exactly. More as a weather that passes through.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.setMem('ft9ViolenceTraumaMidlife', true)
    },
  },

  // ── GENOCIDE SURVIVOR ────────────────────────────────────────────────────────

  {
    id: 'ft9_genocide_testimony',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('genocide_survivor') &&
      G.age >= 35 &&
      !G.mem?.ft9GenocideTestimony,
    text: 'Someone asks if you would speak — at a commemoration, a school, a documentation project. They are careful about how they ask. They say it is up to you. You have told versions of this before, privately, to people who needed to understand. Speaking formally is different. The words are the same; the architecture is not.',
    choices: [
      {
        text: 'Agree to speak — the record should exist',
        tag: 'genocide_witness_spoken',
        outcome: 'You speak. It costs what it always costs. The room is very quiet. Someone you don\'t know thanks you afterward and cannot finish the sentence.',
        effect: (p) => { p.karma += 10; p.m -= 5; p.r += 5; p.addFlag('genocide_witness_spoken'); p.setMem('ft9GenocideTestimony', true) },
      },
      {
        text: 'Tell it to one person you trust — not publicly',
        tag: null,
        outcome: 'You tell the one person. They hold it carefully. That is enough.',
        effect: (p) => { p.m += 3; p.karma += 4; p.setMem('ft9GenocideTestimony', true) },
      },
      {
        text: 'Not yet — you don\'t know when, but not yet',
        tag: null,
        outcome: 'You say not yet. This is not the same as never. You are not sure it is different.',
        effect: (p) => { p.r += 4; p.setMem('ft9GenocideTestimony', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_genocide_thinning_generation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('genocide_survivor') &&
      G.age >= 65 &&
      !G.mem?.ft9GenThinning,
    text: 'The ones who were there are dying of ordinary things now — age, illness, the accumulated weight of years. You read the name and you know which memory attaches to it. Each one that goes takes with them a specific version of what happened. You are still here. You are not sure if that is luck or something else.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.karma += 5
      p.setMem('ft9GenThinning', true)
    },
  },

  {
    id: 'ft9_genocide_witness_spoken_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('genocide_witness_spoken') &&
      G.age >= 70 &&
      !G.mem?.ft9WitnessSpokenLate,
    text: 'Someone you never met writes to say that your testimony changed the way they understood what happened — not as history but as something a person lived through. You read it twice. You do not know what to do with gratitude for a thing that cost what it cost. You write back. You are brief.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.setMem('ft9WitnessSpokenLate', true)
    },
  },

  // ── MISCARRIAGE ──────────────────────────────────────────────────────────────

  {
    id: 'ft9_miscarriage_arithmetic',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('experienced_miscarriage') || G.flags.has('multiple_miscarriage')) &&
      G.age >= 38 &&
      !G.mem?.ft9MiscarriageArithmetic,
    text: () => {
      return 'A child passes you on the street — five or six years old, running ahead of their parent. You do the arithmetic before you mean to. That is the age. Not every time, and not in a way that disrupts the day. The year that loss happened has a particular quality to it. This is just what the mind does with dates.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.setMem('ft9MiscarriageArithmetic', true)
    },
  },

  {
    id: 'ft9_multiple_miscarriage_partner',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('multiple_miscarriage') &&
      G.partner !== null &&
      G.age >= 40 &&
      !G.mem?.ft9MultipleMiscarriagePartner,
    text: 'You and your partner have stopped talking about it directly. What it meant. What it cost. The grief was shared but it was not the same grief, and neither of you had the right words for the difference. You are still here together. That is not a small thing. There are couples who didn\'t survive that particular weight.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.updatePartnerRel(5)
      p.setMem('ft9MultipleMiscarriagePartner', true)
    },
  },

  {
    id: 'ft9_miscarriage_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (G.flags.has('experienced_miscarriage') || G.flags.has('multiple_miscarriage')) &&
      G.age >= 62 &&
      !G.mem?.ft9MiscarriageLate,
    text: 'The grief has changed shape over the years. It is not the same grief it was at the time — it was acute then, and what it is now is something quieter and more settled. You do not talk about it much. It lives in you as a kind of knowledge about what lives can hold.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r -= 2
      p.setMem('ft9MiscarriageLate', true)
    },
  },

  // ── SIBLING ESTRANGEMENT ─────────────────────────────────────────────────────

  {
    id: 'ft9_sibling_estranged_news',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sibling_estranged') &&
      G.age >= 38 &&
      !G.mem?.ft9SibEstrangedNews,
    text: 'You hear something about your sibling through someone else — a common contact, a mutual relative. They are well enough. Or they are not. Either way, you received the information secondhand, and there is something specific about learning this way: the gap between you is now visible to a third party.',
    choices: [
      {
        text: 'Let it stay as it is',
        tag: null,
        outcome: 'You do not respond to what you\'ve heard. The situation does not change. You are not sure if that is peace or avoidance.',
        effect: (p) => { p.r += 3; p.setMem('ft9SibEstrangedNews', true) },
      },
      {
        text: 'Send a brief message — just to say you heard',
        tag: 'sibling_estranged_reached_out',
        outcome: 'You send something short. They reply briefly. Nothing resolves. But something in the silence has been named.',
        effect: (p) => { p.m += 4; p.karma += 3; p.addFlag('sibling_estranged_reached_out'); p.setMem('ft9SibEstrangedNews', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_sibling_estranged_same_room',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sibling_estranged') &&
      !G.flags.has('lost_sibling') &&
      G.age >= 60 &&
      !G.mem?.ft9SibSameRoom,
    text: 'Something brings you to the same place — a death in the family, a significant occasion, the kind of event that does not allow absence. You are in the same room. You have not been in the same room for years. The estrangement has had time to become a fact of life. Being in the same room makes it newly strange.',
    choices: [
      {
        text: 'Speak to them — whatever comes',
        tag: 'sibling_estrangement_broke',
        outcome: 'You speak. It is awkward. There is no resolution in a single conversation. But something has shifted. You are not sure toward what.',
        effect: (p) => { p.m += 6; p.r += 3; p.karma += 4; p.addFlag('sibling_estrangement_broke'); p.setMem('ft9SibSameRoom', true) },
      },
      {
        text: 'Acknowledge them with a nod and nothing more',
        tag: null,
        outcome: 'You make contact with your eyes. You do not make contact with words. They do not push for more. The room goes on around you.',
        effect: (p) => { p.r += 4; p.setMem('ft9SibSameRoom', true) },
      },
      {
        text: 'Do not acknowledge them — the wound is still too deep',
        tag: null,
        outcome: 'You are careful about where you stand. The event ends. You leave. Your sibling\'s absence from your life reasserts itself by morning.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft9SibSameRoom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft9_sibling_estrangement_broke_later',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sibling_estrangement_broke') &&
      G.age >= 68 &&
      !G.mem?.ft9SibEstrangementBrokeLater,
    text: 'You have been in contact more since that day. Not frequently. Not as if the years between hadn\'t happened. But the silence has cracked enough to let something through. You do not talk about what caused it. You have, without agreement, decided to let the past be where it is.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 3
      p.setMem('ft9SibEstrangementBrokeLater', true)
    },
  },

  // ── LOST SIBLING ─────────────────────────────────────────────────────────────

  {
    id: 'ft9_lost_sibling_objects',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.age >= 35 &&
      !G.mem?.ft9LostSibObjects,
    text: 'At some point someone has to deal with their things. If not you, then someone else — but the responsibility finds you. The objects carry the particular quality of belonging to someone who no longer exists. Some of it you can give away. Some of it you cannot explain keeping. You keep it anyway.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.setMem('ft9LostSibObjects', true)
    },
  },

  {
    id: 'ft9_lost_sibling_habit_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.age >= 58 &&
      !G.mem?.ft9LostSibHabit,
    text: 'You catch yourself doing something they used to do — a gesture, a turn of phrase, the way you hold a cup. You have been carrying them without knowing it. The recognition is brief and specific. You do not do anything with it. You let it pass through you.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.m += 6
      p.setMem('ft9LostSibHabit', true)
    },
  },

  {
    id: 'ft9_lost_sibling_last_one',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_sibling') &&
      G.siblings.length === 0 &&
      G.age >= 65 &&
      !G.mem?.ft9LostSibLastOne,
    text: 'You are the last one. All the siblings gone now. There is no one left who shared the early years with you from the inside — who was in the house, at the table, in the back of the car. The things you remember together no longer have another witness. You are the only version of the story that remains.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.setMem('ft9LostSibLastOne', true)
    },
  },

]

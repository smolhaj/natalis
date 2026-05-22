// events_mental_health.js
// The full arc of mental health — onset, treatment, managing, social effects,
// recovery, and country-specific contexts.
// Uses G.mentalHealth ({ condition, medicating, therapy }), G.stats.happiness,
// G.mem, G.character.country.archetype, G.flags, G.age, G.children, G.partner.

export const MENTAL_HEALTH_EVENTS = [

  // ── ONSET AND RECOGNITION ────────────────────────────────────────────────────

  {
    id: 'mh_depression_onset',
    phase: 'young_adult',
    weight: 2,
    when: (G) => {
      if (G.mentalHealth.condition) return false
      if (G.mem.mhEvent1) return false
      if (G.age < 18 || G.age > 35) return false
      if (G.stats.happiness >= 40) return false
      // Require sustained low happiness: track it
      if (!G.mem.mhLowHappyYears) return false
      return G.mem.mhLowHappyYears >= 2
    },
    text: 'It is not sadness. You understand sadness — sadness has a reason and a shape and eventually it ends. This is structural. It is the light being different. It is the absence of the thing that used to make Tuesday different from Monday. You have been here long enough to know it is not a bad week.',
    choices: [
      {
        text: 'Try to name it — find out what this actually is',
        tag: null,
        outcome: 'You look it up. The clinical descriptions are both too clinical and too accurate.',
        effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('mh_self_aware'); p.setMem('mhEvent1', true); p.setMentalHealth({ condition: 'depression' }) },
      },
      {
        text: 'Wait it out — you have done this before',
        tag: null,
        outcome: 'The months accumulate. The thing does not lift on its own schedule.',
        effect: (p) => { p.m -= 10; p.h -= 4; p.r += 6; p.setMem('mhEvent1', true); p.setMentalHealth({ condition: 'depression' }) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_anxiety_daily',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'anxiety' &&
      !G.mem.mhAnxietyDaily &&
      G.age >= 18,
    text: 'You check that the door is locked. You check again. You are already two blocks away when the thought comes back and you turn around. The third time you check, you know intellectually that the door is locked. The thought does not care what you know intellectually. You are late to where you were going.',
    choices: [
      {
        text: 'Develop a small ritual to close the loop',
        tag: null,
        outcome: 'You photograph the lock each time you leave. It is a workaround, not a solution, but the days become more manageable.',
        effect: (p) => { p.m += 3; p.e += 3; p.setMem('mhAnxietyDaily', true) },
      },
      {
        text: 'Force yourself not to go back — resist the compulsion',
        tag: null,
        outcome: 'Some days it works. Some days the anxiety floods into something else and finds another object. You are very tired.',
        effect: (p) => { p.m -= 8; p.h -= 3; p.r += 4; p.setMem('mhAnxietyDaily', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_public_breakdown',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mentalHealth.therapy &&
      !G.mentalHealth.medicating &&
      !G.mem.mhPublicBreakdown &&
      G.stats.happiness < 30 &&
      G.age >= 20,
    text: 'It happens at work, at a meeting. Nothing in particular causes it — a buildup finding an exit. You are crying and then you cannot stop and there is no private way to do this. People look. Someone brings water. A manager says you should go home. You leave and sit in your car for an hour before you can drive.',
    choices: [
      {
        text: 'Use this as the moment to finally get help',
        tag: null,
        outcome: 'The embarrassment is the thing that finally makes you make the call. The call is the beginning.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('mh_sought_help'); p.setMem('mhPublicBreakdown', true) },
      },
      {
        text: 'Return to work the next day as if nothing happened',
        tag: null,
        outcome: 'Nobody mentions it. The silence is its own thing to carry. The condition is unchanged.',
        effect: (p) => { p.m -= 15; p.r += 10; p.h -= 4; p.setMem('mhPublicBreakdown', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_doctor_visit',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mentalHealth.therapy &&
      !G.mentalHealth.medicating &&
      !G.mem.mhDoctorVisit &&
      G.age >= 18,
    text: 'You are sitting across from your doctor and she asks how you have been sleeping. You start to answer and then say something true instead. All of it, in no particular order. She stops typing and looks at you. She asks a few more questions. She is not surprised. You did not expect that.',
    choices: [
      {
        text: 'Tell her everything',
        tag: null,
        outcome: 'The appointment runs long. She refers you to someone. You walk out with a piece of paper that is also a next step.',
        effect: (p) => { p.m += 5; p.e += 3; p.addFlag('mh_sought_help'); p.setMem('mhDoctorVisit', true) },
      },
      {
        text: 'Give the edited version — just enough to get a referral',
        tag: null,
        outcome: 'The referral comes through. The full picture can wait for the specialist.',
        effect: (p) => { p.m += 2; p.setMem('mhDoctorVisit', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_diagnosis_moment',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhDiagnosed &&
      G.flags.includes('mh_sought_help') &&
      G.age >= 18,
    text: (G) => {
      const condition = G.mentalHealth.condition === 'anxiety' ? 'generalised anxiety disorder' : 'clinical depression'
      return `The specialist gives it a name: ${condition}. You have had the condition for longer than you have had the name for it. What surprises you is what the name does — not dread, but a small, strange relief. The shape of the thing is now speakable.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.r -= 5; p.setMem('mhDiagnosed', true) },
  },

  {
    id: 'mh_family_reaction_cold',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      G.mem.mhDiagnosed &&
      !G.mem.mhFamilyTold &&
      G.age >= 18 &&
      ['post_soviet', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype),
    text: (G) => {
      if (G.character.country.archetype === 'post_soviet') {
        return 'You tell your mother. There is a long pause. She says you work too hard and that your generation is soft about these things. She says her own mother raised eight children without any of this. She is not trying to be unkind. The conversation ends without resolution.'
      } else {
        return 'You tell an aunt. She listens carefully. Then she says it sounds like spiritual attack and that you should see the pastor. She is concerned — genuinely, visibly — but the framework she has for this is not the framework you need. You leave the conversation feeling more alone than when you arrived.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.setMem('mhFamilyTold', true) },
  },

  {
    id: 'mh_family_reaction_support',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      G.mem.mhDiagnosed &&
      !G.mem.mhFamilyTold &&
      G.age >= 18 &&
      !['post_soviet', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype),
    text: 'You tell your family. The response is imperfect — some of them don\'t know what to say, one says the wrong thing, one says nothing at all. But there is also someone who says: I\'m glad you told us. And that matters more than you expected.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('mhFamilyTold', true) },
  },

  // ── TREATMENT ARC ────────────────────────────────────────────────────────────

  {
    id: 'mh_medication_start',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mentalHealth.medicating &&
      G.flags.includes('mh_sought_help') &&
      !G.mem.mhMedsStarted &&
      G.age >= 18,
    text: 'The prescription is for an SSRI. The doctor says it takes four to six weeks to work and that the first two weeks may be worse before they are better. She is right about all of this. You are nauseated for ten days. You cannot sleep, and then you sleep too much. At week five, something shifts — not dramatically, not a sudden clearing, but the edge comes off. You notice you made a joke without effort.',
    choices: null,
    effect: (p) => { p.m += 6; p.h -= 3; p.setMentalHealth({ medicating: true }); p.setMem('mhMedsStarted', true) },
  },

  {
    id: 'mh_therapy_first',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mentalHealth.therapy &&
      G.flags.includes('mh_sought_help') &&
      !G.mem.mhTherapyFirst &&
      G.age >= 18,
    text: 'You expected to lie on a couch and be told things about your childhood. Instead there are two chairs, and she asks what brings you here, and you realize you have never actually said it out loud in a direct sentence before. The session is fifty minutes. You leave exhausted in a way that is different from sad — something has been moved, not resolved.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 4; p.setMentalHealth({ therapy: true }); p.setMem('mhTherapyFirst', true) },
  },

  {
    id: 'mh_therapy_breakthrough',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.therapy &&
      !G.mem.mhBreakthrough &&
      G.age >= 20,
    text: 'She asks about the way you described your father, and then asks whether you notice that you describe your manager the same way. You stop. You sit with this for a very long time without speaking. The connection is obvious now that you see it and you cannot believe you could not see it before.',
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 10; p.e += 5; p.addFlag('self_knowledge'); p.setMem('mhBreakthrough', true) },
  },

  {
    id: 'mh_stopped_medication',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.medicating &&
      !G.mem.mhStoppedMeds &&
      G.age >= 21,
    text: 'You feel better, and feeling better makes it hard to remember what not-better felt like. The side effects are real and the prescription costs money and you don\'t tell your doctor — you just stop. For eight weeks, things seem fine. Then the why-I-started-in-the-first-place arrives back at full volume.',
    choices: [
      {
        text: 'Return to the doctor and restart',
        tag: null,
        outcome: 'You explain what happened. She is not angry. You restart at a lower dose. The process repeats more carefully this time.',
        effect: (p) => { p.m -= 5; p.h -= 4; p.setMentalHealth({ medicating: true }); p.setMem('mhStoppedMeds', true) },
      },
      {
        text: 'Try to manage without medication this time',
        tag: null,
        outcome: 'Some people manage. You are not one of them, not yet. The episode that follows is harder than the first.',
        effect: (p) => { p.m -= 15; p.h -= 8; p.r += 8; p.setMentalHealth({ medicating: false }); p.setMem('mhStoppedMeds', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_wrong_therapist',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.therapy &&
      !G.mem.mhWrongTherapist &&
      G.age >= 19,
    text: 'After eight sessions you are not sure this therapist understands what you are actually describing. She keeps returning to a framework that doesn\'t fit. When you try to redirect she says you are resistant. The word makes you want to close the door permanently. Instead you find someone else. Starting over is its own small grief.',
    choices: null,
    effect: (p) => { p.m -= 5; p.mo -= 1000; p.e += 3; p.setMem('mhWrongTherapist', true) },
  },

  {
    id: 'mh_cost_of_care_wealthy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhCostEvent &&
      G.age >= 18 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype),
    text: (G) => {
      if (['Germany', 'France', 'Canada', 'Australia', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Netherlands'].includes(G.character.country.name)) {
        return 'Therapy is covered by the public system. There is a waiting list of four months. You are placed on it and wait. The wait is long but the access is real.'
      }
      return 'Your insurance covers sixty percent. The remaining forty percent is several hundred dollars per month. You run the math and decide what you can afford to drop.'
    },
    choices: null,
    effect: (p) => { p.mo -= 1500; p.m += 5; p.setMem('mhCostEvent', true) },
  },

  {
    id: 'mh_cost_of_care_developing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhCostEvent &&
      G.age >= 18 &&
      ['post_soviet', 'developing_urban'].includes(G.character.country.archetype),
    text: 'A psychiatrist visit exists in your city. It costs what a week of groceries costs. The waiting room has plastic chairs and the sessions are fifteen minutes. You go anyway.',
    choices: null,
    effect: (p) => { p.mo -= 300; p.m += 3; p.setMem('mhCostEvent', true) },
  },

  {
    id: 'mh_cost_of_care_none',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhCostEvent &&
      G.age >= 18 &&
      ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype),
    text: 'There is no psychiatrist in your district. The nearest mental health clinic is two hours away and the appointment backlog is eight months. A community health worker comes to your village once a month. You talk to her. She listens. It is not nothing, but it is not treatment.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.h -= 3; p.setMem('mhCostEvent', true) },
  },

  // ── FUNCTIONING AND MANAGING ─────────────────────────────────────────────────

  {
    id: 'mh_good_period',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      (G.mentalHealth.therapy || G.mentalHealth.medicating) &&
      !G.mem.mhGoodPeriod &&
      G.age >= 28,
    text: 'Eight months. You sleep well. You do not count the mornings by whether you got out of bed. You understand now what maintains this: the medication, the sessions, the early bedtimes, the thing you do not say yes to when you should say no. The stability is not luck. It is a structure you built. You are careful with it.',
    choices: null,
    effect: (p) => { p.m += 15; p.h += 5; p.addFlag('mh_stable_period'); p.setMem('mhGoodPeriod', true) },
  },

  {
    id: 'mh_relapse_after_stability',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mem.mhGoodPeriod &&
      !G.mem.mhRelapsedAgain &&
      G.stats.happiness < 40 &&
      G.age >= 32,
    text: 'You had eight good months. You thought maybe you had come through the other side of it. Then a difficult quarter at work, a cold winter, a thing that happened with someone you love — and the structure holds for a while and then it doesn\'t. You recognize the return. That is different from before — the recognition. You call the therapist.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 5; p.e += 4; p.setMem('mhRelapsedAgain', true) },
  },

  {
    id: 'mh_workplace_disclosure',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.career &&
      !G.mem.mhWorkplaceEvent &&
      G.age >= 22,
    text: 'Your manager asks why you have missed four Mondays in two months. You are standing in a hallway. You have prepared two versions of this conversation. One is vague. The other is true.',
    choices: [
      {
        text: 'Tell them. Mental health is a protected condition here.',
        tag: null,
        outcome: 'She listens carefully. HR is notified. Accommodations are discussed. Some of your colleagues treat you differently afterward — most, better.',
        effect: (p) => { p.m += 5; p.s += 3; p.addFlag('disclosed_mental_health'); p.setMem('mhWorkplaceEvent', true) },
      },
      {
        text: 'Give the vague version — a medical condition, nothing specific',
        tag: null,
        outcome: 'It is accepted without further question. You manage the schedule around the condition without naming it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('mhWorkplaceEvent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_alcohol_medication',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.medicating &&
      !G.mem.mhAlcoholEvent &&
      G.age >= 21,
    text: 'The prescription information is very clear about alcohol. You go to the party anyway. Two drinks is four drinks is waking up at 3 AM with your heart going wrong and the walls too close. You know exactly what caused it. You spend the next day cycling between feeling terrible and feeling stupid for feeling terrible about a choice you made.',
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 8; p.r += 5; p.setMem('mhAlcoholEvent', true) },
  },

  {
    id: 'mh_postnatal_crisis',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.children && G.children.length > 0 &&
      G.age >= 22 && G.age <= 38 &&
      !G.mem.mhPostnatal &&
      G.stats.happiness < 50,
    text: 'The baby is six weeks old. You love them — you are certain of this — and you also cannot stop crying and you feel nothing and you feel too much and you have not slept properly since before the birth. Your partner asks what\'s wrong and you say nothing because nothing is the correct word and also a lie. The health visitor uses a specific term. It has a treatment.',
    choices: [
      {
        text: 'Accept the referral and treatment',
        tag: null,
        outcome: 'The postnatal depression is treated. It lifts over months, not weeks. The baby does not know any of this. You do.',
        effect: (p) => { p.m += 10; p.h += 4; p.setMentalHealth({ condition: 'depression', therapy: true }); p.setMem('mhPostnatal', true) },
      },
      {
        text: 'Push through — you don\'t want to be a patient right now',
        tag: null,
        outcome: 'You manage. It is harder than it needed to be. The first year is a year you remember as largely grey.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.r += 8; p.setMem('mhPostnatal', true) },
      },
    ],
    effect: null,
  },

  // ── SOCIAL AND RELATIONAL EFFECTS ────────────────────────────────────────────

  {
    id: 'mh_partner_misunderstands',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.partner &&
      !G.mem.mhPartnerConversation &&
      G.age >= 20,
    text: 'Your partner says: just try to be more positive. You know they mean well. The sentence lands like a door closing. You explain, as plainly as you can, that if it were a matter of trying they would not be having this conversation at 11 PM again. They look hurt. You feel the distance between you as something physical.',
    choices: [
      {
        text: 'Keep trying to explain — they need to understand',
        tag: null,
        outcome: 'It takes many more conversations. Something shifts. They read something. They come back and say: I think I understand now. Not fully. Enough.',
        effect: (p) => { p.m -= 5; p.s += 4; p.r += 3; p.setMem('mhPartnerConversation', true) },
      },
      {
        text: 'Let it go for tonight. There will be other moments.',
        tag: null,
        outcome: 'The conversation ends. The gap stays. You return to it again in two weeks and say more of it.',
        effect: (p) => { p.m -= 8; p.setMem('mhPartnerConversation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mh_isolating',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhIsolating &&
      G.age >= 19,
    text: 'You cancel the plan with the explanation you have used before: tired, work thing, maybe next week. Next week you do it again. Messages accumulate. You read them and mean to reply and do not. The drift is not a decision — it is what happens when you don\'t have the energy to explain why you don\'t have the energy.',
    choices: null,
    effect: (p) => { p.m -= 10; p.s -= 4; p.r += 6; p.addFlag('mh_isolated'); p.setMem('mhIsolating', true) },
  },

  {
    id: 'mh_friend_same_thing',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.friends && G.friends.length > 0 &&
      !G.mem.mhFriendRecognition &&
      G.age >= 20,
    text: (G) => {
      const friendName = G.friends[0]?.name ?? 'A friend'
      return `${friendName} says, in a voice you recognize, that they have been having a hard time. You listen for a while and then you say: me too. They look at you. The recognition passes between you quickly, like something physical. You talk for two hours. You have not talked like this in months.`
    },
    choices: null,
    effect: (p) => { p.m += 12; p.s += 5; p.addFlag('shared_vulnerability'); p.setMem('mhFriendRecognition', true) },
  },

  {
    id: 'mh_cultural_stigma',
    phase: 'young_adult',
    weight: 3,
    when: (G) => {
      if (!G.mentalHealth.condition) return false
      if (G.mem.mhCulturalStigma) return false
      return ['post_soviet', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype)
    },
    text: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'post_soviet') {
        return 'In your family\'s language there is no word for depression that isn\'t a synonym for weakness. Your uncle says what you need is discipline and purpose. Your grandmother says her generation survived actual hardship. Nobody is saying this to wound you. The wound is structural.'
      } else if (arch === 'subsaharan') {
        return 'The community explanation is spiritual. What you have is described as the result of something done or something owed — a hex, an ancestor\'s displeasure, a door left open. You go through the ceremony. It does not help. You say it helped. The conversation closes.'
      } else {
        return 'In a place where survival takes all available attention, the category of mental health doesn\'t exist with any clinical precision. You are not well and you know why and there is no infrastructure for it. You manage as people here have always managed: by continuing.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 10; p.setMem('mhCulturalStigma', true) },
  },

  {
    id: 'mh_parent_revelation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mem.mhParentRevelation &&
      G.age >= 30,
    text: 'Your father says — carefully, as if testing whether the words will hold — that he went through something similar in his forties. He never saw a doctor for it. He managed it in the way of his generation and his gender and his country: by not speaking of it, by working more, by going quiet for long periods that the family learned to read around. He does not say why he is telling you this now. You understand.',
    choices: null,
    effect: (p) => { p.m += 6; p.r -= 5; p.e += 5; p.setMem('mhParentRevelation', true) },
  },

  // ── RECOVERY AND INTEGRATION ─────────────────────────────────────────────────

  {
    id: 'mh_knowing_warning_signs',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      G.mem.mhGoodPeriod &&
      !G.mem.mhWarningSigns &&
      G.age >= 30,
    text: 'You know the sequence now. First the sleep changes. Then the appetite. Then the slowness in the morning that is different from tiredness. Then the thing where the future closes. You can read it twelve weeks out. You call the therapist at week two. This is not the same as curing it. It is the difference between a flood and knowing when the river rises.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 6; p.h += 3; p.addFlag('self_knowledge'); p.setMem('mhWarningSigns', true) },
  },

  {
    id: 'mh_late_life_reflection',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.age >= 55 &&
      !G.mem.mhLateReflection,
    text: 'Looking back, you can trace the shape of it through the decades. The years it took from you. The years you got back. The things you understand about yourself because of it that you would not understand without it — not a gift, not a lesson, not something you would recommend, but a knowing. You carry it differently now than you did at thirty.',
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 10; p.e += 5; p.addFlag('acceptance'); p.setMem('mhLateReflection', true) },
  },

  {
    id: 'mh_talking_to_younger_person',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.mem.mhDiagnosed &&
      !G.mem.mhToldYounger &&
      G.age >= 40,
    text: 'A younger cousin, or a colleague\'s child, or someone at the edge of your life — says they\'ve been struggling and they don\'t know what to do. You are the person who gets asked because you have been through it. You tell them what you know: the name, the doctor\'s number, the fact that it takes longer than you expect and that the expecting is part of the work. You say the things you wish someone had said to you at their age.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 6; p.s += 4; p.setMem('mhToldYounger', true) },
  },

  {
    id: 'mh_living_with_it',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.mem.mhGoodPeriod &&
      G.mem.mhWarningSigns &&
      !G.mem.mhAccepted &&
      G.age >= 38,
    text: 'You stopped waiting to be cured somewhere in your thirties. The condition is part of the structure of your life now — managed, understood, watched. You are not waiting for it to end. You are living with it the way you live with everything else that does not resolve: carefully, with attention, with the tools you have.',
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 8; p.addFlag('acceptance'); p.setMem('mhAccepted', true) },
  },

  // ── COUNTRY-SPECIFIC ─────────────────────────────────────────────────────────

  {
    id: 'mh_seeking_help_abroad',
    phase: 'young_adult',
    weight: 2,
    when: (G) => {
      if (!G.mentalHealth.condition) return false
      if (G.mem.mhAbroadHelp) return false
      const arch = G.character.country.archetype
      return ['subsaharan', 'conflict_zone', 'post_soviet', 'developing_unstable'].includes(arch) && G.age >= 20
    },
    text: 'Therapy as a formal practice does not exist in your community. But there are online forums and a therapist in another country who offers video sessions at sliding scale fees. The internet connection is unreliable. The therapy is imperfect. It is also the only kind available to you and you take it.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.mo -= 400; p.setMentalHealth({ therapy: true }); p.setMem('mhAbroadHelp', true) },
  },

  {
    id: 'mh_conflict_zone_untreated',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.archetype === 'conflict_zone' &&
      !G.mem.mhConflictUntreated &&
      G.age >= 18,
    text: 'You know what trauma does to a body. You have seen it in other people and you can feel it in yourself — the startle response, the nights, the way certain sounds land wrong. Here, the word for it is not used. Survival is the category that contains everything. Treatment is what happens after the other things stop, and the other things have not stopped.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 10; p.setMentalHealth({ condition: 'anxiety' }); p.setMem('mhConflictUntreated', true) },
  },

  {
    id: 'mh_postsoviet_doctor_discipline',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.mentalHealth.condition &&
      !G.mem.mhSovietDoctor &&
      G.age >= 18,
    text: 'The doctor listens to your description for approximately two minutes. She says: eat regularly, sleep eight hours, exercise in the morning, drink less. She writes nothing down. She is not wrong about any of these things. She is also describing a door handle when you asked for a door.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.setMem('mhSovietDoctor', true) },
  },

  {
    id: 'mh_return_work_wealthy',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      G.mentalHealth.condition &&
      G.flags.includes('mh_sought_help') &&
      !G.mem.mhHospReturn &&
      G.stats.happiness < 25 &&
      G.age >= 22 &&
      G.career &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype),
    text: 'You return to work after two weeks away. You disclosed nothing specific to HR. A few colleagues say they\'re glad you\'re back. One behaves differently — not unkindly, but carefully, as if you are now a different type of object. You go to your desk. You do the work. You have been here before and you have a plan now.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 4; p.setMem('mhHospReturn', true) },
  },

  {
    id: 'mh_return_work_stigma',
    phase: 'young_adult',
    weight: 1,
    when: (G) =>
      G.mentalHealth.condition &&
      G.flags.includes('mh_sought_help') &&
      !G.mem.mhHospReturn &&
      G.stats.happiness < 25 &&
      G.age >= 22 &&
      G.career &&
      !['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype),
    text: 'You return to work after a month. You told HR you had a medical procedure. In your country, psychiatric hospitalization is a matter of record that follows you through official channels. You have heard of people who lost promotions for it, contracts rescinded. You do not know if this will happen. You sit at your desk and wait to find out.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 10; p.w -= 5; p.setMem('mhHospReturn', true) },
  },

]

// ── HAPPINESS TRACKING HOOK ──────────────────────────────────────────────────
// This helper is called from advanceYear to track low-happiness streaks in mem.
// Usage: call trackMentalHealthHappiness(state) once per year in gameEngine.
export function trackLowHappiness(state) {
  if ((state.stats?.happiness ?? 50) < 40) {
    const current = state.mem?.mhLowHappyYears ?? 0
    return { ...state, mem: { ...(state.mem ?? {}), mhLowHappyYears: current + 1 } }
  } else {
    // Reset counter on good years
    if (state.mem?.mhLowHappyYears) {
      return { ...state, mem: { ...(state.mem ?? {}), mhLowHappyYears: 0 } }
    }
  }
  return state
}

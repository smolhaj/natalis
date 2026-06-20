// events_local.js — Local significance arc (BUILD 30)
//
// Small renown: the specific texture of being someone who matters
// within a radius of five kilometres, not nationally.
// Fires for any archetype; gated on karma, career-field, and emerging community trust.
// Distinct from the fame system — local_hero accumulates through acts of presence,
// not through broadcast.

export const LOCAL_EVENTS = [

  // ── FIRST RECOGNITION ────────────────────────────────────────────────────────

  {
    id: 'loc_first_recognition',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 23 && G.age <= 38
      && G.karma >= 55
      && G.fame < 25
      && !G.mem?.loc_recognition_started,
    text: 'Someone stops you on the street to thank you for something you did six months ago. The child recovered. The problem was resolved. The thing you said had stayed with them. You did not know anyone was keeping track. This is the first indication that a version of you exists in the community\'s memory that you have not been aware of.',
    effect: (p) => { p.m += 6; p.s += 2; p.addFlag('local_hero'); p.setMem('loc_recognition_started', true); },
  },

  // ── TEACHER / HEALER / COACH RECOGNITION ────────────────────────────────────

  {
    id: 'loc_teacher_recognition',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'education'
      && G.age >= 30 && G.age <= 55
      && !G.mem?.loc_teacher_rec_done
      && !G.flags.has('local_hero'),
    text: 'A parent calls you at home to say their child — who failed every exam two years ago — has passed the entrance qualification for secondary school. They credit the afternoon you stayed late to go through the syllabus again. You don\'t remember the afternoon specifically. They clearly do.',
    effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('local_hero'); p.setMem('loc_teacher_rec_done', true); },
  },

  {
    id: 'loc_health_worker_recognition',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'healthcare'
      && G.age >= 30 && G.age <= 55
      && !G.mem?.loc_health_rec_done
      && !G.flags.has('local_hero'),
    text: 'The family sends food. They will not come inside; they leave it at the door. You treated their father last winter when the roads were closed and there was no other option. The food keeps appearing, monthly, for the next year. You eventually stop saying you won\'t accept it.',
    effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('local_hero'); p.setMem('loc_health_rec_done', true); },
  },

  // ── TRUSTED WITH PROBLEMS ────────────────────────────────────────────────────

  {
    id: 'loc_trusted_with_problems',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('local_hero')
      && G.age >= 35 && G.age <= 60
      && !G.mem?.loc_trusted_done,
    text: 'They come to you with things that aren\'t your job. The son who has gone wrong. The marriage that is ending in a way the family cannot admit to officially. The neighbour dispute that has lasted twelve years. Nobody appointed you. You have, somehow, become the person people trust with the problems they cannot take anywhere else.',
    effect: (p) => { p.s += 4; p.karma += 6; p.addFlag('local_trusted'); p.setMem('loc_trusted_done', true); },
  },

  // ── VILLAGE HEALER (developing world rural) ─────────────────────────────────

  {
    id: 'loc_village_healer',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('local_trusted')
      && (G.archetype === 'subsaharan' || G.archetype === 'developing_urban' || G.archetype === 'developing_unstable' || G.archetype === 'conflict_zone')
      && G.ruralUrban === 'rural'
      && G.age >= 35 && G.age <= 65
      && !G.mem?.loc_healer_done,
    text: 'There is no clinic within two hours of you. So when the child\'s breathing goes wrong at night, or the fever has not broken in three days, they come to you. You know enough to help some of them. You know exactly enough to know when you cannot. The gap between those two categories is where you spend a portion of your life.',
    choices: [
      {
        text: 'Keep doing it. Someone has to.',
        tag: 'Continue',
        outcome: 'You learn more than you expected to and less than they need. Most of the time it is enough. The times it isn\'t stay with you specifically.',
        effect: (p) => { p.h -= 3; p.m += 5; p.karma += 10; p.addFlag('community_healer'); p.setMem('loc_healer_done', true); },
      },
      {
        text: 'Write letters to the district authority asking for proper resources.',
        tag: 'Advocate',
        outcome: 'Some letters get replies. The clinic is still two hours away. You still answer the door at night.',
        effect: (p) => { p.m -= 3; p.karma += 8; p.addFlag('community_healer'); p.addFlag('local_advocate'); p.setMem('loc_healer_done', true); },
      },
    ],
  },

  // ── LOCAL ACHIEVEMENT ────────────────────────────────────────────────────────

  {
    id: 'loc_small_victory',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('local_hero')
      && G.age >= 30 && G.age <= 55
      && !G.mem?.loc_victory_done,
    text: 'You organized something that actually happened. The pitch renovation. The school fundraiser that finally replaced the roof. The community water point that the district had promised for eight years. Forty people were there when it was finished and will remember it. It will not appear in any official record. You find, to your surprise, that this is not insufficient.',
    choices: [
      {
        text: 'Accept the credit. You did most of the work.',
        tag: 'Accept',
        outcome: 'They name the thing after you, informally. You said not to. They did it anyway, in speech if not in writing.',
        effect: (p) => { p.m += 8; p.s += 3; p.addFlag('local_achievement'); p.setMem('loc_victory_done', true); },
      },
      {
        text: 'Deflect. It was everyone who made it happen.',
        tag: 'Deflect',
        outcome: 'It was everyone. You also made most of it happen. Both are true and you choose to say only one of them.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('local_achievement'); p.setMem('loc_victory_done', true); },
      },
    ],
  },

  // ── THE COACH ────────────────────────────────────────────────────────────────

  {
    id: 'loc_the_coach',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('local_hero')
      && G.age >= 28 && G.age <= 52
      && !G.mem?.loc_coach_done
      && !G.flags.has('local_trusted'),
    text: 'This year\'s team is the best you have coached. You have been here evenings and weekends for — you count backwards — more years than you expected when you started. You know each of them as a person, not just a player or a student. Looking at them, you realise you\'ve built something. Whether they win the regional championship is secondary to that realisation.',
    choices: [
      {
        text: 'They win the regional championship.',
        tag: 'Win',
        outcome: 'The photograph is taken. You are in the back, slightly out of focus, which is exactly correct.',
        effect: (p) => { p.m += 15; p.addFlag('local_coach_legacy'); p.setMem('loc_coach_done', true); },
      },
      {
        text: 'They come very close but don\'t win.',
        tag: 'Close',
        outcome: 'They played the best they have played all year. You are prouder of this than anything you could explain to someone who wasn\'t there.',
        effect: (p) => { p.m += 10; p.addFlag('local_coach_legacy'); p.setMem('loc_coach_done', true); },
      },
    ],
  },

  // ── MEMORY KEEPER ────────────────────────────────────────────────────────────

  {
    id: 'loc_memory_keeper',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('local_hero')
      && G.age >= 42 && G.age <= 65
      && !G.mem?.loc_memory_done,
    text: 'You have started writing down the names of things before they disappear. The family that lived in the house that is now a fuel station. The name of the tree. What the river was called before it was rerouted. The school that burned in 1978 and was rebuilt somewhere else. Nobody asked you to do this. There is no one else doing it.',
    effect: (p) => { p.e += 5; p.r += 3; p.m += 5; p.addFlag('local_memory_keeper'); p.setMem('loc_memory_done', true); },
  },

  // ── FORMAL ROLE QUESTION ──────────────────────────────────────────────────────

  {
    id: 'loc_formal_role',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('local_achievement')
      && G.age >= 40 && G.age <= 60
      && !G.mem?.loc_role_done,
    text: 'They ask you to make it official. Town council. School board. The community association that has some actual authority. The work you\'ve been doing informally would now have a title and a process attached to it.',
    choices: [
      {
        text: 'Take the role.',
        tag: 'Take it',
        outcome: 'The work is the same work. The process is slower. The room is colder. Occasionally you achieve something you couldn\'t have without the authority.',
        effect: (p) => { p.s += 3; p.m -= 3; p.karma += 5; p.addFlag('local_official'); p.setMem('loc_role_done', true); },
      },
      {
        text: 'Stay informal. Official roles change the relationships.',
        tag: 'Decline',
        outcome: 'The informal network is more nimble than any committee. You continue as you were, which is exactly what you intended.',
        effect: (p) => { p.karma += 4; p.setMem('loc_role_done', true); },
      },
    ],
  },

  // ── THE FAREWELL ─────────────────────────────────────────────────────────────

  {
    id: 'loc_the_farewell',
    phase: 'late_life',
    weight: 3,
    when: (G) => (G.flags.has('local_hero') || G.flags.has('local_achievement'))
      && G.age >= 65 && G.age <= 80
      && !G.mem?.loc_farewell_done,
    text: 'You are stepping back from something you have done for a long time. The gathering is in the community hall or the school yard or the football pitch, depending on which chapter this is. More people come than you expected. Some of them you haven\'t seen in fifteen years. You realise the shape of what you built only now that you\'re standing outside of it.',
    effect: (p) => { p.m += 12; p.r += 5; p.legacy += 8; p.addFlag('local_legacy_rooted'); p.setMem('loc_farewell_done', true); },
  },

  // ── THE FORGOTTEN GENERATION ──────────────────────────────────────────────────

  {
    id: 'loc_forgotten_in_time',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('local_legacy_rooted')
      && G.age >= 75
      && !G.mem?.loc_forgotten_noted,
    text: 'The children who grew up with you as a fixed point of the neighbourhood are themselves grandparents now. The generation after them does not know who you are. You have lived long enough to watch the boundary of living memory move across you. You knew this was how it worked. It is still strange to be on this side of it.',
    effect: (p) => { p.r += 6; p.m -= 3; p.e += 4; p.setMem('loc_forgotten_noted', true); },
  },

  // ── GENERATIONAL TRANSMISSION ─────────────────────────────────────────────────

  {
    id: 'loc_transmitted',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('local_legacy_rooted')
      && G.age >= 70
      && !G.mem?.loc_transmitted_noted,
    text: 'Someone in the neighbourhood does something the way you taught them to do it, twenty years ago, and they don\'t mention your name because they have forgotten you taught them. It has become simply the way things are done. You watch this happen from across the street and find it more satisfying than recognition would have been.',
    effect: (p) => { p.m += 8; p.karma += 5; p.legacy += 5; p.setMem('loc_transmitted_noted', true); },
  },

]

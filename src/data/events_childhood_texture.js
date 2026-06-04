// Childhood texture events — Sprint 4
// Universal small-life events for ages 6–17 with minimal guards.
// Each covers a year-band that has sparse coverage.
// The goal: at least one event can fire per year, ages 6–17.
// Prose: second-person present tense, specific objects, no editorialising.

export const CHILDHOOD_TEXTURE_EVENTS = [

  // ─── CHILDHOOD (ages 6–11) ────────────────────────────────────────────────

  {
    id: 'ch_learning_to_read',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 6 && G.age <= 8 && !G.mem?.chReadingAck,
    text: 'A page that was marks becomes words. You are not sure exactly when it happens — one morning the letters stop being separate things and start being a sentence, and the sentence is about a dog in a field, and the dog is there as clearly as if it were in the room with you. You read it again to make sure.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.m += 3
      p.addFlag('reader')
      p.setMem('chReadingAck', true)
    },
  },

  {
    id: 'ch_the_object',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 7 && G.age <= 9 && !G.mem?.chObjectAck,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'Someone gives you something — a small thing, made of metal or painted wood — that is yours and only yours. You have shared almost everything in your life until this point. You keep this under the mattress for two weeks before you allow yourself to leave it in the open.'
      }
      if (arch === 'wealthy_east') {
        return 'You receive a toy that is more expensive than any gift you have been given. It comes in a box with instructions. You follow the instructions once, then put it on a shelf. The box is what you wanted.'
      }
      return 'There is an object you carry everywhere for almost a year. Later you cannot remember exactly what it was — a stone, a small metal animal, a piece of something. At the time it seemed necessary. It probably was.'
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.addFlag('childhood_object')
      p.setMem('chObjectAck', true)
    },
  },

  {
    id: 'ch_friend_house',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 8 && G.age <= 10 && !G.mem?.chFriendHouseAck,
    text: (G) => {
      const wealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(G.character.country.archetype)
      if (wealthy) {
        return 'You go to a friend\'s house and notice, with no particular feeling yet, that their kitchen is larger than yours and the food in the refrigerator is different. You eat what you are given. On the walk home you think about the refrigerator without knowing why.'
      }
      return 'You go to a friend\'s house. Their family is different from your family — different sounds in the hallway, different smell in the kitchen, someone who laughs more than anyone in your house laughs. You wonder for the first time whether the way your family does things is the only way.'
    },
    choices: null,
    effect: (p) => {
      p.m += 2
      p.e += 2
      p.setMem('chFriendHouseAck', true)
    },
  },

  {
    id: 'ch_first_lie',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 8 && G.age <= 10 && !G.mem?.chFirstLieAck,
    text: 'You tell a lie and it works. Nothing happens. The specific thing you dreaded — the voice, the question, the look — does not come. You are surprised by how easy it was, and then surprised by how long you think about it afterward.',
    choices: [
      {
        text: 'You tell the truth the next day.',
        tag: 'came_clean',
        outcome: 'There are consequences, smaller than you feared. You find this easier to live with than the alternative.',
        effect: (p) => { p.m += 3; p.karma += 5; p.setMem('chFirstLieAck', true) },
      },
      {
        text: 'You say nothing. The lie holds.',
        tag: 'kept_the_lie',
        outcome: 'No one finds out. You carry it for longer than you expect.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('chFirstLieAck', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ch_school_grades',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.age >= 9 && G.age <= 11 && !G.mem?.chGradesAck,
    text: (G) => {
      const smart = G.stats.smarts
      if (smart >= 65) {
        return 'Your results come back. They are good, better than most. A teacher reads your name aloud and the room shifts slightly in your direction. You do not know yet whether this is a gift or a burden or both.'
      }
      if (smart <= 40) {
        return 'The results are not what you hoped. You look at the paper and then at the desk and then at the paper again. The teacher says something to you that means well and lands wrong. You fold the paper twice and put it in your pocket.'
      }
      return 'Your results are fine. Neither disappointing nor remarkable. You sit with this information for a while, trying to work out how you feel about being exactly where you were expected to be.'
    },
    choices: null,
    effect: (p) => {
      p.e += p._state?.stats?.smarts >= 65 ? 3 : p._state?.stats?.smarts <= 40 ? -2 : 1
      p.m += p._state?.stats?.smarts >= 65 ? 2 : p._state?.stats?.smarts <= 40 ? -3 : 0
      p.setMem('chGradesAck', true)
    },
  },

  {
    id: 'ch_a_week_sick',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.chWeekSickAck,
    text: 'You are ill for a week. The days are long and without structure. The ceiling becomes familiar in a way that ceilings usually aren\'t. Someone brings you something to drink at intervals. Outside, the world continues at its regular speed. You listen to it through the wall.',
    choices: null,
    effect: (p) => {
      p.h -= 3
      p.m += 2
      p.e += 2
      p.setMem('chWeekSickAck', true)
    },
  },

  {
    id: 'ch_adult_argument',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 8 && G.age <= 11 && !G.mem?.chAdultArgAck,
    text: 'You hear your parents arguing. Not the words — the words are in another room — but the shape of it, the specific rise and fall of voices that means something is wrong. You lie still and wait for it to end. Eventually it does. In the morning nothing is said about it. You take your cue from them.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 2
      p.addFlag('witnessed_adult_complexity')
      p.setMem('chAdultArgAck', true)
    },
  },

  {
    id: 'ch_the_animal',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.chAnimalAck,
    text: (G) => {
      const arch = G.character.country.archetype
      const rural = G.ruralUrban === 'rural'
      if (rural) {
        return 'An animal you have given a name to dies. On a farm this is not unusual — you were told not to name them, which is why you named it. Someone buries it without ceremony. You are present for the burial. You do not cry, which surprises you, because you thought you would.'
      }
      return 'A small animal — a stray dog, a neighbour\'s cat, something you found and kept briefly — is no longer there. You look for it for several days. After a while you stop looking, but you do not stop expecting to see it.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 2
      p.addFlag('first_loss')
      p.setMem('chAnimalAck', true)
    },
  },

  {
    id: 'ch_excluded',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 8 && G.age <= 11 && !G.mem?.chExcludedAck,
    text: 'A group you considered yourself part of does not include you in something. You find out later — through the carelessness of someone who assumed you already knew, or through the specific silence of people who share a thing you are not sharing. You say nothing about it to anyone. You reassess.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.s -= 2
      p.r += 2
      p.setMem('chExcludedAck', true)
    },
  },

  {
    id: 'ch_something_remarkable',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.age >= 9 && G.age <= 11 && !G.mem?.chRemarkableAck,
    text: 'You do something that surprises you — solve a problem you didn\'t know you could solve, make something you didn\'t know you could make, say something in front of people that you immediately cannot imagine having said. It is not that you succeed. It is that you didn\'t know you were going to.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.s += 2
      p.addFlag('early_self_discovery')
      p.setMem('chRemarkableAck', true)
    },
  },

  // ─── ADOLESCENCE (ages 12–17) ─────────────────────────────────────────────

  {
    id: 'adol_the_music',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 13 && G.age <= 15 && !G.mem?.adolMusicAck,
    text: (G) => {
      const yr = G.currentYear
      if (yr < 1960) {
        return 'You hear something on the radio — a voice, an arrangement — that seems to have been made specifically for you, for this exact feeling you did not have words for. You listen to it when no one is in the room. You memorise it without meaning to.'
      }
      if (yr < 1990) {
        return 'There is a record. You play one side of it until you can predict the scratch at the same point each time. The music is doing something to the air in your room. You do not tell anyone how much it matters, because you do not have the words for it yet and also because you are protecting it.'
      }
      return 'A song finds you. Not the way music usually finds you — through the radio, through the air — but directly, as if it were looking. You listen to it for two weeks and something organises around it that wasn\'t organised before.'
    },
    choices: null,
    effect: (p) => {
      p.m += 5
      p.addFlag('musical_formation')
      p.setMem('adolMusicAck', true)
    },
  },

  {
    id: 'adol_adult_conversation',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 14 && G.age <= 16 && !G.mem?.adolAdultConvAck,
    text: 'An adult speaks to you as if you are also an adult. They use the kind of language they would use to another adult — not simplified, not protective — and they listen to what you say back in the same way. You are not sure what has changed. You are fourteen, or fifteen, and you have been waiting for this without knowing it.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 3
      p.s += 2
      p.addFlag('early_adult_recognition')
      p.setMem('adolAdultConvAck', true)
    },
  },

  {
    id: 'adol_the_body',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 12 && G.age <= 14 && !G.mem?.adolBodyAck,
    text: (G) => {
      const female = G.character.gender === 'female'
      if (female) {
        return 'Your body is changing and it is doing so without your permission. People notice before you are ready for them to notice. Some of them say things about it. You learn to carry yourself in a particular way, a new way, that you did not have to think about before.'
      }
      return 'Something is different. Your voice, your height, the way you move through a room — all of it is shifting, without schedule, in ways you cannot predict from one morning to the next. You inspect the changes and are not sure whether to be alarmed or pleased or neither.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 2
      p.lo += p._state?.stats?.looks >= 55 ? 2 : -1
      p.addFlag('adolescence_body_awareness')
      p.setMem('adolBodyAck', true)
    },
  },

  {
    id: 'adol_first_paid_work',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.adolFirstWorkAck && !G.career,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'You find work. It is not what you thought work would feel like — it is harder in some ways and simpler in others. At the end of the week there is money, which is yours, which is something you have not had before in this specific way. Earning it is different from receiving it.'
      }
      return 'You get a small job — something after school or on weekends. The first paycheck is a small amount of money that feels significant out of all proportion to its size. You have been given money before. This is different.'
    },
    choices: [
      {
        text: 'Save most of it.',
        tag: 'early_saver',
        outcome: 'At the end of the month the number is still there. This is not nothing.',
        effect: (p) => { p.mo += 150; p.w += 2; p.addFlag('early_earner'); p.setMem('adolFirstWorkAck', true) },
      },
      {
        text: 'Spend it on something you wanted.',
        tag: 'spent_it',
        outcome: 'The thing is good. The money is gone. Both facts are true at the same time.',
        effect: (p) => { p.mo += 50; p.m += 4; p.addFlag('early_earner'); p.setMem('adolFirstWorkAck', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'adol_a_night_out',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.adolNightOutAck,
    text: 'You are out at night, later than you have been out before, without adults who are responsible for you. The streets feel different at this hour. Your friends are different too — louder, more deliberate, performing something. You are not sure if you are performing too. You think probably yes.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 3
      p.setMem('adolNightOutAck', true)
    },
  },

  {
    id: 'adol_the_notebook',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 16 && !G.mem?.adolNotebookAck && G.stats.smarts >= 45,
    text: 'You start keeping a record of things — thoughts, what happened, the shape of a feeling you are trying to hold in place. You don\'t call it anything. You hide it, not because it contains anything dangerous, but because the private nature of it is part of what it is.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.e += 3
      p.addFlag('private_writer')
      p.setMem('adolNotebookAck', true)
    },
  },

  {
    id: 'adol_last_summer',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.adolLastSummerAck,
    text: 'A summer that feels different from other summers. You are not sure yet why it feels different, or rather you are not sure which of the reasons is the real one. Later you will know that it was the last summer that felt like this kind of summer. At the time you cannot know this. You just notice that something is different.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r += 2
      p.addFlag('formative_summer')
      p.setMem('adolLastSummerAck', true)
    },
  },

  {
    id: 'adol_the_future_question',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 16 && G.age <= 17 && !G.mem?.adolFutureAck,
    text: (G) => {
      const hasIdea = G.stats.smarts >= 60 || G.stats.charisma >= 60
      if (hasIdea) {
        return 'Adults have started asking what you want to do with your life. You have something like an answer — not fully formed, but directional. The answer sounds different each time you say it, depending on who is asking. You are not sure if that means it\'s wrong or if that\'s just how answers work.'
      }
      return 'Adults have started asking what you want to do with your life. You do not have a good answer, which surprises you — you had assumed you would. The question makes you feel the absence of something you expected to find already there.'
    },
    choices: [
      {
        text: 'You have an idea. Begin moving toward it.',
        tag: 'early_direction',
        outcome: 'The direction is not certain. But having one is different from not having one.',
        effect: (p) => { p.m += 3; p.e += 2; p.addFlag('early_direction'); p.setMem('adolFutureAck', true) },
      },
      {
        text: 'You don\'t know yet. You say you\'re still thinking.',
        tag: 'still_deciding',
        outcome: 'You are, in fact, still thinking. This will take longer than you expect.',
        effect: (p) => { p.r += 3; p.setMem('adolFutureAck', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'adol_teacher_who_saw_you',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 13 && G.age <= 16 && !G.mem?.adolTeacherSawAck,
    text: (G) => {
      const smart = G.stats.smarts
      if (smart >= 60) {
        return 'A teacher stays behind to speak with you. They say something specific — not general praise, not encouragement-as-formula, but something specific to you: a sentence you wrote, a question you asked, a way you approached a problem. You have been seen in the particular, not the general, and that turns out to be a different thing entirely.'
      }
      return 'A teacher asks you to stay after class. You wait for the familiar litany of concerns and instead they ask you how you are. Not as preamble. As the actual question. You are not prepared for the actual question and you say something honest without meaning to.'
    },
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += p._state?.stats?.smarts >= 60 ? 4 : 2
      p.addFlag('mentored')
      p.setMem('adolTeacherSawAck', true)
    },
  },

]

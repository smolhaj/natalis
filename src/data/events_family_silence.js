// events_family_silence.js — Burst D
// The "what your parents didn't say" mechanic.
// Each event fires once in early childhood or childhood, gated on a
// generational memory flag. The event is not about the atrocity itself —
// it is about the absence. The dinner table subject that is never named.

export const FAMILY_SILENCE_EVENTS = [

  // ── HOLOCAUST FAMILY MEMORY ─────────────────────────────────────────────────
  {
    id: 'fs_holocaust',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('holocaust_family_memory') &&
      !G.mem?.fsHolocaustDone &&
      G.age >= 6 && G.age <= 14,
    text: 'There are photographs in a box in the back of a wardrobe that no one mentions. You have found them twice. Each time there are faces you do not recognise — formal poses, stiff clothes, expressions that look like they were arranged in a hurry. You ask your parent who they are. There is a pause that has more in it than the answer. "Family," they say. "From before." You do not ask from before what.',
    choices: null,
    effect: (p) => {
      p.setMem('fsHolocaustDone', true)
      p.addFlag('carries_family_silence')
      p.e += 2
    },
  },

  // ── GULAG FAMILY MEMORY ─────────────────────────────────────────────────────
  {
    id: 'fs_gulag',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('gulag_family_memory') &&
      !G.mem?.fsGulagDone &&
      G.age >= 7 && G.age <= 14,
    text: 'You have noticed that your family never talks about the years before a certain point. There is a map in your head of the conversation and there is a door in it that everyone walks around. You ask once, directly, what happened to grandfather in those years. Your parent\'s face does something you cannot name. "He was away," they say. "He came back." The word for where he was does not appear in this house.',
    choices: null,
    effect: (p) => {
      p.setMem('fsGulagDone', true)
      p.addFlag('carries_family_silence')
      p.e += 2
    },
  },

  // ── GREAT LEAP FAMINE FAMILY MEMORY ─────────────────────────────────────────
  {
    id: 'fs_great_leap',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('great_leap_family_memory') &&
      !G.mem?.fsGreatLeapDone &&
      G.age >= 6 && G.age <= 14,
    text: 'Your grandparent cannot watch anyone leave food on a plate. It is not a rule that is stated — it is something in their face when food is wasted, something that goes past disapproval into a place you don\'t have the vocabulary for yet. You ask about it once. They say: "You don\'t know what we went through." They say it quietly, to no one in particular. They never say more.',
    choices: null,
    effect: (p) => {
      p.setMem('fsGreatLeapDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('food_insecurity_inherited')
    },
  },

  // ── CULTURAL REVOLUTION FAMILY MEMORY ───────────────────────────────────────
  {
    id: 'fs_cultural_revolution',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('cultural_revolution_family') &&
      !G.mem?.fsCulRevDone &&
      G.age >= 7 && G.age <= 15,
    text: 'There was something your parent did, or had done to them, or both — you have understood this without being told. There are years in their life that exist only as gaps. You find a photograph once, hidden inside a book: your parent young, wearing a uniform you don\'t recognise, in front of something that might be a school. You put it back exactly as you found it. You never ask.',
    choices: null,
    effect: (p) => {
      p.setMem('fsCulRevDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('learned_silence')
    },
  },

  // ── KHMER ROUGE FAMILY MEMORY ────────────────────────────────────────────────
  {
    id: 'fs_khmer_rouge',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('khmer_rouge_family_memory') &&
      !G.mem?.fsKhmerDone &&
      G.age >= 6 && G.age <= 14,
    text: 'You have a family — but smaller than it should be. The structure of it has gaps that everyone navigates around without naming. There are no aunts. There are no cousins on one side. Your parent sometimes stops in the middle of an ordinary sentence and goes somewhere you cannot follow. You are old enough to understand that something happened. You are not old enough to ask what.',
    choices: null,
    effect: (p) => {
      p.setMem('fsKhmerDone', true)
      p.addFlag('carries_family_silence')
      p.m -= 4
    },
  },

  // ── HIROSHIMA FAMILY MEMORY ──────────────────────────────────────────────────
  {
    id: 'fs_hiroshima',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('hiroshima_family_memory') &&
      !G.mem?.fsHiroshimaDone &&
      G.age >= 7 && G.age <= 15,
    text: 'Your family is from a city your parent will not visit. You have asked why, more than once. The answers are always short and never complete: "It is too far." "Too busy." Once, just once, they said: "It is complicated, what happened there." They did not say what happened there. You find out at school, years later, from a textbook. You think about your parent\'s face when they said "complicated." You understand, now, that the word was doing a great deal of work.',
    choices: null,
    effect: (p) => {
      p.setMem('fsHiroshimaDone', true)
      p.addFlag('carries_family_silence')
      p.e += 3
    },
  },

  // ── PARTITION FAMILY MEMORY (INDIA/PAKISTAN) ─────────────────────────────────
  {
    id: 'fs_partition',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('partition_family_memory') &&
      !G.mem?.fsPartitionDone &&
      G.age >= 6 && G.age <= 14,
    text: 'Your family is from somewhere else — a street in a city in a country that is now the wrong country. There is an address that your grandparent says sometimes, unprompted, like a prayer. They will not talk about the crossing. You know only that they left everything. You know this because there is nothing left from before: no furniture, no papers, only a memory of an address in a city no one in your family can visit anymore.',
    choices: null,
    effect: (p) => {
      p.setMem('fsPartitionDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('partition_family_lived')
      p.e += 2
    },
  },

  // ── BIAFRA FAMILY MEMORY ─────────────────────────────────────────────────────
  {
    id: 'fs_biafra',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('biafra_family_memory') &&
      !G.mem?.fsBiafraDone &&
      G.age >= 7 && G.age <= 15,
    text: 'Your parent does not speak about the war. You know there was a war — you have heard the word at school, in passing, without context. At home it does not exist. When you ask, your parent\'s answer is short: "It is past." But you have seen them stop when certain songs come on the radio. You have seen them look out of windows in a way that has nothing to do with what is outside.',
    choices: null,
    effect: (p) => {
      p.setMem('fsBiafraDone', true)
      p.addFlag('carries_family_silence')
    },
  },

  // ── DISAPPEARED FAMILY MEMORY (ARGENTINA) ────────────────────────────────────
  {
    id: 'fs_disappeared',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('disappeared_family_memory') &&
      !G.mem?.fsDisappearedDone &&
      G.age >= 6 && G.age <= 15,
    text: 'There is someone in your family who is not spoken of at the dinner table. You have learned this the way children learn things — by noticing absences, by watching your parent\'s face change at the edge of a sentence that doesn\'t arrive. You know only a name. You do not know what happened. You have understood, somehow, that not knowing is also an answer — that the question itself is the answer.',
    choices: null,
    effect: (p) => {
      p.setMem('fsDisappearedDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('disappeared_family_known')
      p.m -= 3
    },
  },

  // ── PINOCHET-ERA FAMILY MEMORY (CHILE) ──────────────────────────────────────
  {
    id: 'fs_pinochet',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('pinochet_family_memory') &&
      !G.mem?.fsPinochetDone &&
      G.age >= 7 && G.age <= 15,
    text: 'At a certain age you understand that the years before your birth are discussed differently at home than at school. At school there are facts with dates. At home there is a careful management of what is said, as if the walls might report it. You ask your parent once what they did during those years. They say: "We survived." They say it like it is enough. You think about it for a long time before you understand what surviving must have required.',
    choices: null,
    effect: (p) => {
      p.setMem('fsPinochetDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('learned_silence')
    },
  },

  // ── APARTHEID-ERA FAMILY MEMORY ──────────────────────────────────────────────
  {
    id: 'fs_apartheid',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('apartheid_family_memory') &&
      !G.mem?.fsApartheidDone &&
      G.age >= 7 && G.age <= 15,
    text: 'Your parent has a way of going quiet in certain conversations. You have grown up learning the edges of those conversations — the places the talk doesn\'t go, the subjects that land and then sit there without being touched. About their years before you: fragments, silences, and the occasional moment where something real shows through and is then covered over. You know the outline. You have stopped asking for more.',
    choices: null,
    effect: (p) => {
      p.setMem('fsApartheidDone', true)
      p.addFlag('carries_family_silence')
    },
  },

  // ── VIETNAM REUNIFICATION FAMILY MEMORY ─────────────────────────────────────
  {
    id: 'fs_vietnam_reunion',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('reunification_family_memory') &&
      !G.mem?.fsVietnamDone &&
      G.age >= 6 && G.age <= 14,
    text: 'Your family talks about the north and the south like they are more than directions. There is something in the geography of this that you don\'t fully understand. Your parent came from one and ended up in the other and the story of how is told in pieces, each piece stopping before it reaches the part you want to hear. You know there was a war. You know it ended. You understand, slowly, that for your family the ending was its own kind of thing to survive.',
    choices: null,
    effect: (p) => {
      p.setMem('fsVietnamDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('learned_silence')
    },
  },

  // ── RED TERROR FAMILY MEMORY (ETHIOPIA) ─────────────────────────────────────
  {
    id: 'fs_red_terror',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('red_terror_family_memory') &&
      !G.mem?.fsRedTerrorDone &&
      G.age >= 7 && G.age <= 15,
    text: 'Your parent keeps a list, somewhere — you have seen it, once, in a notebook that was closed before you could read it. Names. You asked what the list was. They said: "People we knew." They said it in a way that closed the conversation. You understood, later, that "knew" was doing the work that "lost" could not be made to do at the dinner table.',
    choices: null,
    effect: (p) => {
      p.setMem('fsRedTerrorDone', true)
      p.addFlag('carries_family_silence')
      p.m -= 3
    },
  },

  // ── GENOCIDE FAMILY MEMORY (RWANDA/BURUNDI) ──────────────────────────────────
  {
    id: 'fs_genocide',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('genocide_family_memory') &&
      !G.mem?.fsGenocideDone &&
      G.age >= 6 && G.age <= 14,
    text: 'You live in the aftermath of something you did not witness. You know this from small things: the way your parent counts, sometimes, on their fingers without saying what they are counting; the way they look at neighbours with an attention that is not quite ordinary; the way certain names are said once and then not again. You do not have the word for what happened yet. The word, when you eventually get it, will not be adequate.',
    choices: null,
    effect: (p) => {
      p.setMem('fsGenocideDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('post_genocide_generation')
      p.m -= 4
    },
  },

  // ── IRANIAN REVOLUTION FAMILY MEMORY ────────────────────────────────────────
  {
    id: 'fs_iran_revolution',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('revolution_family_memory') &&
      !G.mem?.fsIranRevDone &&
      G.age >= 7 && G.age <= 15,
    text: 'Your parent was young once and believed in something that the world then arranged differently. You can tell this from the fragments — a book that lives face-down on a shelf, a photograph of a younger version of them at a gathering of some kind, a name that comes up and then is placed aside. You do not know what they believed. You know only that they believed it, and that the believing cost them something, and that the cost is not discussed.',
    choices: null,
    effect: (p) => {
      p.setMem('fsIranRevDone', true)
      p.addFlag('carries_family_silence')
      p.addFlag('learned_silence')
    },
  },

  // ── CONGO WAR FAMILY MEMORY ──────────────────────────────────────────────────
  {
    id: 'fs_congo_war',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.flags.has('congo_war_family_memory') &&
      !G.mem?.fsCongoWarDone &&
      G.age >= 6 && G.age <= 14,
    text: 'Your family left one place and came to another, and the first place is not talked about. You know it exists — you have seen it on a map — but in this house it is a country from before. You understand that before is a word that does something very specific in your family. It marks the place where explanation stops and silence begins.',
    choices: null,
    effect: (p) => {
      p.setMem('fsCongoWarDone', true)
      p.addFlag('carries_family_silence')
      p.m -= 3
    },
  },

  // ── FOLLOW-THROUGH: ADULT ASKING ─────────────────────────────────────────────
  // At age 28-38, the character who carries_family_silence finally asks.
  {
    id: 'fs_adult_asks',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('carries_family_silence') &&
      !G.mem?.fsAdultAsksDone &&
      G.age >= 26 && G.age <= 38,
    text: 'You are old enough, now, to ask. One evening — at the kitchen table, or in a car, or over the phone — you bring it up directly. You say: I want to know what happened. There is a pause. Your parent says: "Why does it matter now?" You say it matters because it is part of where you come from. Another pause. Then they begin. The story is shorter than you expected, and longer than they intended, and does not end cleanly. You sit with it for days afterward.',
    choices: [
      {
        text: 'You listened to everything, and now you carry it',
        tag: 'carrier',
        outcome: 'The story is yours now. The silence has been replaced by something more complicated.',
        effect: (p) => {
          p.setMem('fsAdultAsksDone', true)
          p.addFlag('family_history_known')
          p.e += 4
          p.m -= 4
          p.karma += 5
        },
      },
      {
        text: 'You stopped them partway — you realised you were not ready',
        tag: 'not_yet',
        outcome: 'You asked and then could not finish asking. That is also an answer of a kind.',
        effect: (p) => {
          p.setMem('fsAdultAsksDone', true)
          p.addFlag('family_history_partial')
          p.m -= 2
        },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: THE WEIGHT AT 50 ────────────────────────────────────────
  {
    id: 'fs_midlife_weight',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('carries_family_silence') &&
      !G.mem?.fsMidlifeDone &&
      G.age >= 48 && G.age <= 58,
    text: 'You are the age now that your parent was when you first began to understand something was not being said. You think about this sometimes: the specific work of keeping a thing quiet across decades, of going to sleep with it, of answering your children\'s questions without reaching it. You have your own version of the silence now. Different content, same shape.',
    choices: null,
    effect: (p) => {
      p.setMem('fsMidlifeDone', true)
      p.addFlag('generational_weight_felt')
      p.m -= 3
      p.e += 4
    },
  },

]

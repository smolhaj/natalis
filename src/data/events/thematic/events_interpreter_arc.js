export const INTERPRETER_ARC_EVENTS = [
  {
    id: 'ia_interpreter_colonial',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      ['developing_unstable', 'subsaharan'].includes(G.character.country?.archetype) &&
      G.currentYear <= 1970 &&
      !G.mem?.iaColonial,
    text: `The district officer speaks English, or French, or Portuguese. The village speaks something else. You are between them. You translate the order about land registration — the requirement that all land be documented, titled, assigned. You translate the elder's response: "the land belongs to the river and the rain and to no one." What you render to the district officer is something more administratively manageable. You chose which meaning to sacrifice. There was only one choice available, and you made it.`,
    choices: null,
    effect: (p) => {
      p.m -= 10;
      p.r += 10;
      p.e += 4;
      p.addFlag('interpreter_colonial');
      p.setMem('iaColonial', true);
    },
  },

  {
    id: 'ia_interpreter_tribunal',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      ['post_soviet', 'conflict_zone', 'developing_unstable'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1990 &&
      !G.mem?.iaTribunal,
    text: `The woman testifying is describing what happened in her village in April 1993. You translate sentence by sentence, as required. The translation must be exact — this is the court's requirement — which means you translate the specific words she uses for what was done to her and to her children. After three hours you take a break in the corridor. A prosecutor asks how you are. It is the first time anyone has asked this in the course of the proceedings. You do not know what to say.`,
    choices: null,
    effect: (p) => {
      p.m -= 20;
      p.r += 15;
      p.e += 5;
      p.addFlag('interpreter_tribunal');
      p.setMem('iaTribunal', true);
    },
  },

  {
    id: 'ia_impossible_word',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      !G.mem?.iaImpossibleWord,
    text: `The word does not exist in English. It exists in the language you are translating from — it describes something specific, culturally located, a feeling or a condition that would take three sentences to explain in any other language. In a courtroom you have four seconds. You choose the word that loses the least. You have always felt that "the word that loses the least" is not the same as translation, but you have not found a better definition.`,
    choices: null,
    effect: (p) => {
      p.m -= 5;
      p.e += 4;
      p.r += 6;
      p.setMem('iaImpossibleWord', true);
    },
  },

  {
    id: 'ia_interpreter_military',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      ['conflict_zone', 'developing_unstable'].includes(G.character.country?.archetype) &&
      G.currentYear >= 2001 &&
      !G.mem?.iaMilitary,
    text: `You work with the foreign soldiers as their interpreter. They come from a country that does not speak your language and is fighting in a country where you are visible to both sides. The local commanders know your face from the convoys. Your neighbours know what you do — or assume they do, which functions the same way. The soldiers will be rotated home. You will stay. This asymmetry is discussed in reports but not in conversation.`,
    choices: null,
    effect: (p) => {
      p.h -= 5;
      p.m -= 12;
      p.r += 12;
      p.addFlag('interpreter_military');
      p.setMem('iaMilitary', true);
    },
  },

  {
    id: 'ia_interpreter_danger',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('interpreter_military') &&
      !G.mem?.iaDanger,
    text: `The foreign forces have left. The faction that lost is now in control of the province. Your name is on a list they found in the abandoned base — along with your address, your photograph from a badge lanyard, the names of the operations you assisted with. The visa application to the country you interpreted for exists in a category below the category you need. The category you need has a four-year waiting list. The list does not know there is a list with your name on it.`,
    choices: [
      {
        text: 'Flee. Find any route out — the visa will follow or it won\'t.',
        tag: 'flee',
        outcome: `You leave with documentation that will not hold up, into a process that takes years. You are out.`,
        effect: (p) => {
          p.setResidency('asylum_seeker');
          p.addFlag('expat');
          p.addFlag('interpreter_endangered');
          p.m -= 25;
          p.h -= 8;
          p.setMem('iaDanger', true);
        },
      },
      {
        text: 'Stay and hide. Wait for the visa to come through.',
        tag: 'stay_hide',
        outcome: `You move in with a cousin in a different district. You wait. The waiting is its own kind of life.`,
        effect: (p) => {
          p.r += 10;
          p.m -= 20;
          p.addFlag('interpreter_endangered');
          p.setMem('iaDanger', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ia_interpreter_invisibility',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      !G.mem?.iaInvisible,
    text: `The negotiation you interpreted was on the news last night. Your name was not mentioned. The diplomat whose words you found and carried into another language — precisely, under pressure, across idioms and registers that took years to learn — is described as skilled and nuanced. Translation is invisible because it worked. If it had failed it would have been visible immediately. You understand this logic. It does not entirely reconcile you to it.`,
    choices: null,
    effect: (p) => {
      p.m -= 6;
      p.r += 8;
      p.e += 3;
      p.setMem('iaInvisible', true);
    },
  },

  {
    id: 'ia_interpreter_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.career?.id === 'interpreter' &&
      G.age >= 60 &&
      !G.mem?.iaLate,
    text: `You have spent your working life in the space between languages. You understand things in a way that is specific to that position: that language is not a neutral medium, that meaning survives translation approximately, that "approximately" is sometimes the distance between a life and a sentence. The people you translated for are in other places, doing other things. You carry what passed through you. You are tired in the way that comes from precision over a long time.`,
    choices: null,
    effect: (p) => {
      p.m += 8;
      p.r += 6;
      p.karma += 10;
      p.e += 5;
      p.setMem('iaLate', true);
    },
  },
];

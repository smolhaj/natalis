// events_followthrough_84.js — Portugal depth arc follow-throughs

export const FOLLOWTHROUGH_84_EVENTS = [

  // ── pt_pide_generation ─────────────────────────────────────────────────────

  {
    id: 'ft84_pide_files_open',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('pt_pide_generation') &&
      G.currentYear >= 1975 && G.currentYear <= 1990 &&
      G.age >= 40 &&
      !G.mem?.ft84PideFiles,
    text: 'The PIDE files: after April 25, they are seized and eventually available. Your file exists. You read what was written about you. The informant who reported the meeting at your friend\'s house is named in the margin — not officially, but the handwriting is identifiable to anyone who knew them. The person is still alive. Still in the same town. You have to decide what to do with knowing who it was, which is harder than not knowing.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m -= 3
      p.e += 4
      p.setMem('ft84PideFiles', true)
    },
  },

  {
    id: 'ft84_pide_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('pt_pide_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 65 &&
      !G.mem?.ft84PideLate,
    text: 'Your grandchildren ask about the Estado Novo the way they ask about the Roman Empire — with the incuriosity of people for whom it is entirely over. You know it is not entirely over: the PIDE informant structure, the habits of denunciation that the dictatorship cultivated, some of them persist in family dynamics and local politics long past April 25. The form of power leaves a residue that outlasts the structure. You do not say this to your grandchildren. It would require a definition of "power" that they do not yet need.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft84PideLate', true)
    },
  },

  // ── pt_clandestine_emigrant_france ────────────────────────────────────────

  {
    id: 'ft84_clandestine_emigrant_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pt_clandestine_emigrant_france') &&
      G.currentYear >= 1974 && G.currentYear <= 1985 &&
      G.age >= 30 &&
      !G.mem?.ft84EmigrantReturn,
    text: 'April 25 changes the arithmetic. You no longer have to be illegal to return. The factory in Renault is still paying. The apartment in Champigny is familiar in a way the Trás-os-Montes village has stopped being. The return is possible. Whether the return is desired is a different question. You have been away for twelve years. The village has changed. You have changed more. The emigrant who returns is not the same as the emigrant who left, which is the specific arithmetic of leaving.',
    choices: [
      {
        text: 'You return — Portugal after April 25 is something new',
        tag: null,
        outcome: 'The return takes a year to feel possible and another year to feel real. The village is smaller than you remembered. You have also become larger than it, which is not the same as better.',
        effect: (p) => { p.m += 4; p.r += 4; p.setMem('ft84EmigrantReturn', true) },
      },
      {
        text: 'You stay in France — the life you built is here',
        tag: null,
        outcome: 'Your children will be French. Your grandchildren may never speak Portuguese. The family in the Minho will become people you see at funerals. You made this choice. It was a choice.',
        effect: (p) => { p.r += 6; p.m += 2; p.setMem('ft84EmigrantReturn', true) },
      },
    ],
    effect: null,
  },

  // ── pt_prec_alentejo_land ─────────────────────────────────────────────────

  {
    id: 'ft84_prec_reversal',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pt_prec_alentejo_land') &&
      G.currentYear >= 1977 && G.currentYear <= 1990 &&
      G.age >= 30 &&
      !G.mem?.ft84PrecReversal,
    text: 'The land reform is partially reversed after the sixth provisional government. Some properties returned. Others not — the legal basis has become complicated, the cooperatives have made changes that cannot be undone, some families have dissolved. The Alentejo today: still different from before April 25 in some respects, but the radical collectivization of PREC did not survive the constitutional governments that followed. Whether this was a restoration of rights or a counter-revolution depends entirely on whose rights and whose revolution you are counting.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft84PrecReversal', true)
    },
  },

  // ── pt_retornado_child ────────────────────────────────────────────────────

  {
    id: 'ft84_retornado_child_identity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('pt_retornado_child') &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      !G.mem?.ft84RetornadoIdentity,
    text: 'Angola becomes something you follow in the news rather than the place you came from. The civil war continues until 2002. The street in Luanda where you grew up is in a different country, fighting a different war, in a language you still speak but no longer need. What it means to be from a place that no longer has you in it is the question you have been answering your whole life. The Portuguese word for someone like you — retornado — is a word for someone who came back, but you never felt like you went anywhere. You were taken.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft84RetornadoIdentity', true)
    },
  },

  // ── pt_luso_descendant_france ─────────────────────────────────────────────

  {
    id: 'ft84_luso_descendant_choice',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('pt_luso_descendant_france') &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 18 &&
      !G.mem?.ft84LusoDescendantChoice,
    text: 'The choice your parents made for you: they took you to France. Now you make your own: do you go to Portugal, the country you were always told you were from, or do you stay in France, the country you actually know? Portugal after April 25 is not the Portugal your parents left. It is in the EC, it has a constitution, it has jobs now — fewer than France, but jobs. You could go. The question is whether the saudade your parents felt was for a real place or for a place that existed only in the emigrant\'s specific form of memory.',
    choices: [
      {
        text: 'You go to Portugal — you want to know the country you were told you were from',
        tag: null,
        outcome: 'The Portugal you find is not the one in your parents\' stories. It is also more interesting than their stories, which were made in grief. You stay. You become Portuguese in a way your parents never fully managed to be, because you chose it.',
        effect: (p) => { p.m += 5; p.r += 3; p.setMem('ft84LusoDescendantChoice', true) },
      },
      {
        text: 'You stay in France — Portugal is a holiday, not a home',
        tag: null,
        outcome: 'The saudade is for something you cannot fully inhabit. In France you are the Portuguese kid\'s kid. In Portugal you speak with a French accent. The space between the two is where you live.',
        effect: (p) => { p.r += 6; p.setMem('ft84LusoDescendantChoice', true) },
      },
    ],
    effect: null,
  },

]

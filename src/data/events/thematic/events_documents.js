// BUILD 25 — The census, documents, and official identity
// The state's power to define you — and to deny that definition.
// Identity documents as fate. Statelessness. Colonial categories.

export const DOCUMENT_EVENTS = [

  {
    id: 'doc_rwandan_id_1994',
    phase: 'midlife',
    weight: 5,
    when: (G) => G.character.country?.name === 'Rwanda' && G.currentYear >= 1994 && G.currentYear <= 1994 && G.age >= 15 && !G.mem.docRwanda,
    text: 'You have been to this checkpoint before. The militiaman asks for your identity card. The identity card was Belgian — the Belgians invented the ethnic column in 1933, before that Hutu and Tutsi were occupational categories you moved between, and the Belgians made it permanent and laminated. The card says what it says. The militiaman looks at it.',
    choices: [
      {
        text: 'The card says Hutu. You cross.',
        tag: 'crossed_hutu',
        outcome: 'You cross. The person behind you does not. You do not look back. For the rest of your life you do not fully stop walking past that checkpoint.',
        effect: (p) => { p.m -= 25; p.addFlag('rwandan_survivor'); p.addFlag('moral_weight_carried'); p.setMem('docRwanda', true) },
      },
      {
        text: 'The card says Tutsi.',
        tag: 'tutsi',
        outcome: 'A hundred days. The international community has a name for it now. You are one of the people the name describes.',
        effect: (p) => { p.m -= 35; p.h -= 20; p.addFlag('genocide_survivor'); p.addFlag('rwandan_survivor'); p.setMem('docRwanda', true) },
      },
    ],
  },

  {
    id: 'doc_propiska_moscow',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.character.country?.name === 'Russia' || G.character.country?.archetype === 'post_soviet') && G.currentYear >= 1960 && G.currentYear <= 2000 && G.age >= 18 && G.age <= 35 && !G.mem.docPropiska,
    text: 'To live in Moscow you need a *propiska* — a residence permit. Without it you cannot register for work, housing, or healthcare in the city. The permit is issued by the city you want to live in. The city does not want you, or the person who could issue the permit wants something from you first. You are in a city of eight million people and you do not legally exist in it.',
    choices: [
      {
        text: 'Find someone who can arrange it. Everyone knows someone.',
        tag: 'arranged',
        outcome: 'You find someone. The arrangement costs more than a month\'s wages. The stamp goes in the book. You are legal.',
        effect: (p) => { p.mo -= 800; p.addFlag('navigated_bureaucracy'); p.setMem('docPropiska', true) },
      },
      {
        text: 'Stay undocumented. Many people do.',
        tag: 'undocumented',
        outcome: 'You exist in the city on the terms available to people who do not officially exist: certain jobs, certain rooms, certain risks.',
        effect: (p) => { p.m -= 10; p.setResidency('undocumented'); p.setMem('docPropiska', true) },
      },
    ],
  },

  {
    id: 'doc_no_birth_certificate',
    phase: 'childhood',
    weight: 3,
    when: (G) => (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_unstable') && G.ruralUrban === 'rural' && G.age >= 6 && G.age <= 12 && !G.mem.docBirth,
    text: 'You were born at home. No one wrote it down in a government register. You exist — your family knows you exist, the village knows — but the state does not. At school they ask for a birth certificate to enroll. There is a process for children without certificates. The process costs money your family does not have and requires a trip to the town that takes a day each way.',
    choices: [
      {
        text: 'Your parents find a way to get the certificate.',
        tag: 'registered',
        outcome: 'The trip to town. The form. The fee borrowed from a relative. Three weeks later, officially, you were born.',
        effect: (p) => { p.addFlag('late_registered'); p.setMem('docBirth', true) },
      },
      {
        text: 'You enter school without one. Many children do.',
        tag: 'unregistered',
        outcome: 'You are enrolled anyway, by a teacher who writes your name in pencil. You exist in this school but not in the official record. The distinction will matter later.',
        effect: (p) => { p.addFlag('stateless_childhood'); p.setMem('docBirth', true) },
      },
    ],
  },

  {
    id: 'doc_colonial_census',
    phase: 'childhood',
    weight: 3,
    when: (G) => (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_unstable') && G.currentYear >= 1880 && G.currentYear <= 1960 && G.age >= 8 && G.age <= 14 && !G.mem.docColonial,
    text: 'The colonial administration is conducting a census. A man comes with a ledger. He asks your father what he is — which group, which category. The category your father names is a category that existed before but not like this: not as a legal fact, not written in a register, not permanent. The man writes something down. What he writes becomes more real, in some ways, than what your father said.',
    effect: (p) => { p.addFlag('colonial_category'); p.setMem('docColonial', true) },
  },

  {
    id: 'doc_category_becomes_fate',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('colonial_category') && G.age >= 20 && !G.mem.docCategoryFate,
    text: 'The category your grandfather was assigned has become the category you live inside. It determines which schools, which jobs, which neighbourhoods. It was invented by someone who needed to administer you and found the categories convenient. It has now been administered for long enough that people mistake it for a natural fact. Including, sometimes, you.',
    effect: (p) => { p.m -= 8; p.addFlag('institutional_discrimination'); p.setMem('docCategoryFate', true) },
  },

  {
    id: 'doc_stateless_crossing',
    phase: 'young_adult',
    weight: 4,
    when: (G) => (G.residencyStatus === 'refugee_status' || G.residencyStatus === 'undocumented') && G.age >= 18 && G.age <= 40 && !G.mem.docStateless,
    text: 'At every border the question is the same: what document do you have? You have a document that is not a passport — a certificate of identity, a UNHCR card, a letter. The officer looks at it for a long time. Long enough that you learn to read the specific quality of the pause. This pause means it might work. That pause means it won\'t.',
    choices: [
      {
        text: 'You wait. Patience is also a skill you have been required to develop.',
        tag: 'waited',
        outcome: 'After forty minutes, a supervisor is called. The supervisor makes a decision in your favour. You cross. You do not celebrate because there are more borders.',
        effect: (p) => { p.m -= 10; p.addFlag('stateless_navigator'); p.setMem('docStateless', true) },
      },
      {
        text: 'You are turned back.',
        tag: 'turned_back',
        outcome: 'You find another route. There is always another route for people who have no legal route — it just costs more and is more dangerous.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('stateless_navigator'); p.setMem('docStateless', true) },
      },
    ],
  },

  {
    id: 'doc_first_passport',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('stateless_childhood') || G.flags.has('stateless_navigator') && !G.mem.docFirstPassport,
    text: 'You have never had a passport. You have documents — various documents, over various years — but not a passport: the specific kind of document that is a country saying you are theirs. The window at the passport office is ordinary. You take the photograph and the processing fee and fill out the form and submit it and wait, and a booklet arrives in the post with your name on it and you sit with it for longer than the object probably merits.',
    effect: (p) => { p.m += 20; p.addFlag('first_passport_received'); p.setMem('docFirstPassport', true) },
  },

  {
    id: 'doc_stateless_marriage',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.has('stateless_childhood') && G.partner !== null && G.age >= 22 && G.age <= 40 && !G.mem.docMarriage,
    text: 'You need a birth certificate to register a marriage. You don\'t have one — the original, not the late-registered approximation, not the UNHCR document. The registrar explains, not unkindly, what the requirements are. The requirements were written for people who have the documents the requirements require. You ask if there is a process for people who don\'t. There is a process. The process takes two years.',
    effect: (p) => { p.m -= 10; p.addFlag('bureaucratic_obstacle'); p.setMem('docMarriage', true) },
  },

]

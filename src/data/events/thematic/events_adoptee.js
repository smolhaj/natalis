// BUILD 55 — Adoptee arc (BUILD 36)
// Domestic adoption, international adoption, transracial adoption.
// The search, the DNA test, the origin trip, the transracial identity question.

export const ADOPTEE_EVENTS = [

  {
    id: 'adp_always_knew',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem.adpOrigin,
    text: 'Your parents told you early, before you could fully understand it. The story they tell is about choosing — they wanted you specifically, from all the children. You accept this story and also notice, later, that it is a story made for the child rather than the fact. The fact is more complicated and you are old enough now to sense the edges of it.',
    effect: (p) => { p.addFlag('adopted'); p.setMem('adpOrigin', true) },
  },

  {
    id: 'adp_transracial',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('adopted') && G.age >= 16 && G.age <= 28 && !G.mem.adpTransracial,
    text: 'A stranger asks where you\'re really from. You give the name of the city you grew up in. They mean something else and you know it and they know that you know it. You look like your birth country. You speak, think, dream, argue, and cook like your adoptive one. The two facts coexist without resolving.',
    choices: [
      {
        text: 'Answer what they\'re actually asking.',
        tag: 'answered',
        outcome: 'You name the country. Watching their face, you think about how often you will do this, for the rest of your life, with strangers who believe the question is simple.',
        effect: (p) => { p.m -= 5; p.addFlag('double_consciousness'); p.setMem('adpTransracial', true) },
      },
      {
        text: 'Repeat the city.',
        tag: 'repeated',
        outcome: '"No, I mean originally." You hold eye contact and say nothing else. They move on. You note the specific exhaustion of this particular exchange.',
        effect: (p) => { p.m -= 3; p.karma += 3; p.setMem('adpTransracial', true) },
      },
    ],
  },

  {
    id: 'adp_search',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('adopted') && G.age >= 20 && G.age <= 38 && !G.mem.adpSearch,
    text: 'The DNA kit costs eighty dollars. The results take three weeks. When they come, there is a list of potential relatives with percentages attached. A half-sibling in a city you have never been to. A first cousin twice removed in the country you were born in. The list makes the abstract specific in a way that requires you to decide what to do with specific things.',
    choices: [
      {
        text: 'Contact the half-sibling.',
        tag: 'contacted',
        outcome: 'They were expecting this. They have been waiting. The first call is forty minutes and you do not know what to call each other at the end of it.',
        effect: (p) => { p.m += 8; p.addFlag('found_birth_family'); p.setMem('adpSearch', true) },
      },
      {
        text: 'Look at the list and close the app.',
        tag: 'looked_away',
        outcome: 'You are not ready. Possibly you will not be. The question of readiness is not the same as the question of whether you want to know.',
        effect: (p) => { p.m -= 4; p.setMem('adpSearch', true) },
      },
    ],
  },

  {
    id: 'adp_origin_trip',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('adopted') && G.age >= 30 && G.age <= 55 && !G.mem.adpOriginTrip,
    text: 'You are in the country you were born in. You have been here three days. The landscape matches something you could not have remembered because you left before you could remember. Your adoptive parents are at home, which is where you are from. The people here share your face. You are a tourist in the place that is supposed to be an origin. The specific feeling has no single word in either language.',
    effect: (p) => { p.m -= 3; p.e += 3; p.addFlag('origin_country_visited'); p.setMem('adpOriginTrip', true) },
  },

  {
    id: 'adp_telling_own_child',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('adopted') && G.children.length > 0 && G.age >= 35 && !G.mem.adpToldChild,
    text: 'Your child asks why you don\'t look like Grandma. You had a version of this conversation prepared. It does not go the way the prepared version went. Children ask the questions adults edit. You answer honestly, which takes longer than you expected, and at the end your child says "okay" and asks what\'s for dinner.',
    effect: (p) => { p.m += 6; p.karma += 5; p.setMem('adpToldChild', true) },
  },
]

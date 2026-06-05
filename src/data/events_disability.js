// events_disability.js — Three disability arcs
//
// § 1  Birth/congenital disability — cerebral palsy, limb difference, Down syndrome.
//      Present from the start; shapes childhood, education, employment, identity.
// § 2  Deaf arc — deafness as both impairment and culture. The cochlear implant
//      debate, Deaf community, sign language identity.
// § 3  Acquired disability — the accident or condition that arrives mid-life.
//      The before/after structure, grief for the lost self, the new normal.
// § 4  Cross-cutting — the inaccessible city, the cure offered, disability pride,
//      technology as partial equaliser.
//
// Disability flags set here gate year texture and epitaph lines in gameEngine.

// ═══════════════════════════════════════════════════════════════════════════════
// § 1 — BIRTH DISABILITY
// ═══════════════════════════════════════════════════════════════════════════════

const BIRTH_DISABILITY_EVENTS = [

  {
    id: 'dis_birth_diagnosis',
    phase: 'early_childhood',
    weight: 999,
    when: (G) =>
      G.flags.has('born_with_disability') &&
      !G.mem?.disBirthDiagFired,
    text: (G) => {
      const type = G.mem?.disabilityType ?? 'physical'
      if (type === 'cerebral_palsy') return 'The diagnosis arrives before the vocabulary to understand it. What your parents understand is this: you will walk differently, or perhaps not walk, and your body will require more — more attention, more appointments, more of everything that families have in finite supply. They begin figuring out how to give it. You do not know yet that there is something to figure out.'
      if (type === 'down_syndrome') return 'The doctors use a phrase that means something clinical and your parents understand it before you do. The room has a particular feeling in it that you are too young to read. What you do understand, eventually, is that you learn some things more slowly, and that the world has decided what this means for you before you\'ve had a chance to decide yourself.'
      return 'The difference in your body is visible early and named early. The medical system has a category for it. Having a category is useful and does not tell you everything about the life you will live.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 5; p.addFlag('disability_birth_diagnosed'); p.setMem('disBirthDiagFired', true) },
  },

  {
    id: 'dis_school_integration',
    phase: 'childhood',
    weight: 9,
    when: (G) =>
      G.flags.has('born_with_disability') &&
      !G.mem?.disSchoolFired,
    text: (G) => {
      const yr = G.currentYear ?? 1980
      const archetype = G.currentCountry?.archetype ?? 'wealthy_west'
      const hasInclusion = archetype === 'wealthy_west' && yr >= 1975
      if (hasInclusion) return 'There is a choice: the special school, where you will be with other children who have different bodies, or the mainstream school, where you will be the only one like you. Your parents argue about this. The mainstream school takes you. The mainstream school is not ready for you. The teacher is not ready for you. Some of the children are kind. Some are not. You learn to read all of this very quickly.'
      return 'The special school is where children like you go. The teachers are patient and the programme is designed for your needs and the building has almost no stairs. You do not know the children in your neighbourhood the way you would if you went to school with them. That gap will take years to fully understand.'
    },
    choices: [
      {
        text: 'The mainstream school — harder, but you want to be part of the world',
        tag: null,
        outcome: 'The integration is incomplete and real simultaneously. You learn to navigate both the institution and the people in it.',
        effect: (p) => { p.e += 4; p.m -= 8; p.s += 3; p.addFlag('disability_mainstream_school'); p.setMem('disSchoolFired', true) },
      },
      {
        text: 'The special school — the environment is built for you',
        tag: null,
        outcome: 'The school works. The community it builds is specific and real. The gap from the mainstream is something you will spend years negotiating.',
        effect: (p) => { p.e += 3; p.m += 2; p.addFlag('disability_special_school'); p.setMem('disSchoolFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_adolescence_identity',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      G.flags.has('born_with_disability') &&
      !G.mem?.disAdolFired,
    text: (G) => {
      const type = G.mem?.disabilityType ?? 'physical'
      if (type === 'cerebral_palsy') return 'Adolescence is hard for everyone and harder for you in specific ways. The body becomes more visible at exactly the age when visibility is most charged. You understand now what strangers think when they look at you — you can read it in the fraction of a second before their expression settles. You are learning to decide what to do with that information.'
      return 'Adolescence is when you understand the distance between yourself and the version of the life that is shown as normal. The distance is specific and has a shape. You are also learning, slowly, what the distance does not tell you about what\'s possible.'
    },
    choices: [
      {
        text: 'Find others like you — the community is there if you look',
        tag: null,
        outcome: 'The community exists. Finding it changes what the disability means — not what it is, but what it means.',
        effect: (p) => { p.m += 6; p.s += 4; p.addFlag('disability_community_found'); p.setMem('disAdolFired', true) },
      },
      {
        text: 'Build an identity that isn\'t defined by the diagnosis',
        tag: null,
        outcome: 'The identity is real and the disability is also real. You learn to hold both without letting either one be the whole thing.',
        effect: (p) => { p.m += 3; p.s += 2; p.addFlag('disability_identity_formed'); p.setMem('disAdolFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_employment_barrier',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('born_with_disability') &&
      !G.career &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.disEmployFired,
    text: (G) => {
      const archetype = G.currentCountry?.archetype ?? 'wealthy_west'
      const yr = G.currentYear ?? 1990
      if (archetype === 'wealthy_west' && yr >= 1990) return 'The interview goes well. You have done the preparation. The person across the desk is professional and says nothing that could be used in a claim. The rejection letter arrives five days later. The stated reason is reasonable-sounding. You know the actual reason. You have been preparing for this knowledge since you were thirteen.'
      return 'The work available to you is shaped significantly by what your body can do and what employers assume it cannot do. The assumption does not always map to the reality. You spend energy correcting it that you would rather spend on the work itself.'
    },
    choices: [
      {
        text: 'Find the path anyway — the barriers are real, not final',
        tag: null,
        outcome: 'The path is oblique and real. The employment comes. The accommodation negotiation is ongoing and worth it.',
        effect: (p) => { p.m -= 5; p.addFlag('disability_employment_found'); p.setMem('disEmployFired', true) },
      },
      {
        text: 'Challenge it — document, push back, make the case',
        tag: null,
        outcome: 'The challenge is tiring and partially effective. The employer adjusts. The adjustment is incomplete. You continue.',
        effect: (p) => { p.m -= 8; p.s += 3; p.addFlag('disability_fought_barrier'); p.addFlag('disability_employment_found'); p.setMem('disEmployFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_disability_advocate',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('born_with_disability') &&
      G.age >= 30 &&
      !G.mem?.disAdvocateFired,
    text: 'You have accumulated enough experience of the specific friction — the inaccessible building, the well-meaning condescension, the systems that work for everyone except the people they were designed to include — that the knowledge is starting to feel like a resource. Other people are going through what you went through. Some of them are much younger. The choice to use what you know is beginning to look like a choice.',
    choices: [
      {
        text: 'Become the person someone younger can find',
        tag: null,
        outcome: 'The advocacy work is unpaid and consuming and occasionally genuinely changes something. The occasionally is enough.',
        effect: (p) => { p.karma += 8; p.m += 5; p.addFlag('disability_advocate'); p.setMem('disAdvocateFired', true) },
      },
      {
        text: 'The energy you have goes to your own life',
        tag: null,
        outcome: 'You have been carrying this for thirty years. The decision not to also carry everyone else\'s is allowed.',
        effect: (p) => { p.m += 3; p.setMem('disAdvocateFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 2 — DEAF ARC
// Capital-D Deaf: community, language, identity — not just impairment.
// ═══════════════════════════════════════════════════════════════════════════════

const DEAF_ARC_EVENTS = [

  {
    id: 'dis_deaf_world',
    phase: 'childhood',
    weight: 999,
    when: (G) =>
      G.flags.has('born_deaf') &&
      !G.mem?.disDeafWorldFired,
    text: (G) => {
      const parents = G.parents ?? []
      const deafParents = G.flags.has('deaf_family')
      if (deafParents) return 'Your parents are Deaf. The language of your house is sign language. The world outside the house requires translation, which your parents do without comment, because they have always done it. You grow up knowing that there is the Deaf world and the hearing world, and you live in both, and the Deaf world is the one that feels like home.'
      return 'Your parents are hearing. They love you correctly and are also frightened, because the world they know is built entirely for hearing people and they are not sure how to prepare you for it. You are growing up in a house where you are the only person who experiences the world the way you do. You learn to read faces very early. You learn to be patient with people who don\'t know how to talk to you.'
    },
    choices: null,
    effect: (p) => { p.m -= 3; p.s += 3; p.addFlag('deaf_childhood'); p.setMem('disDeafWorldFired', true) },
  },

  {
    id: 'dis_cochlear_implant',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      G.flags.has('born_deaf') &&
      G.currentYear >= 1990 &&
      G.age >= 4 && G.age <= 14 &&
      !G.mem?.disCochlearFired,
    text: 'The cochlear implant is available, and your parents are considering it. The medical position is that it restores functional hearing. The Deaf community position is that Deafness is not a defect to be corrected — it is a way of being in the world, with its own language and culture, and that implanting a child who cannot consent to the surgery is removing the child from that world before they have had the chance to choose it.',
    choices: [
      {
        text: 'No implant — you choose the Deaf world',
        tag: null,
        outcome: 'The decision is made, or made for you while you\'re young. You grow up in sign language. The culture is yours. The hearing world requires translation that you have always provided.',
        effect: (p) => { p.m += 3; p.s += 4; p.addFlag('deaf_identity'); p.addFlag('no_cochlear_implant'); p.setMem('disCochlearFired', true) },
      },
      {
        text: 'Implant — access to the hearing world',
        tag: null,
        outcome: 'The implant gives access. It is not transparent hearing. You are neither fully Deaf nor fully hearing. The in-between is its own country.',
        effect: (p) => { p.m -= 3; p.h += 3; p.addFlag('cochlear_implant'); p.setMem('disCochlearFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_deaf_community',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      G.flags.has('born_deaf') &&
      !G.flags.has('deaf_family') &&
      !G.mem?.disDeafCommFired,
    text: 'The school for the Deaf, or the club, or the online community for BSL/ASL speakers — whatever the route, you find the others. The specific feeling of being in a room where the primary language is yours — where you do not need to ask anyone to face you when they speak, where the communication is complete rather than approximate — is not something you had a word for before you experienced it. You have a word for it now: home.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 5; p.addFlag('deaf_community_found'); p.setMem('disDeafCommFired', true) },
  },

  {
    id: 'dis_deaf_hearing_world',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_deaf') &&
      G.age >= 18 &&
      !G.mem?.disDeafHearingFired,
    text: 'The professional world is hearing. The job interview is hearing. The colleague who says something in the corridor and expects a response. The meeting where the speaker turns away from you. The phone call that is still the primary mode of business in some industries. You navigate this with a combination of technology, preparation, and the specific social labour of making hearing people comfortable with the accommodation they are supposed to provide. The social labour is not acknowledged and is not small.',
    choices: [
      {
        text: 'Navigate it and educate where you can',
        tag: null,
        outcome: 'The work is manageable when the accommodation is real. The advocacy to make the accommodation real is ongoing.',
        effect: (p) => { p.s += 4; p.m -= 5; p.addFlag('deaf_hearing_world_navigated'); p.setMem('disDeafHearingFired', true) },
      },
      {
        text: 'Build a career in or near the Deaf community',
        tag: null,
        outcome: 'The community-facing path is narrower and fully yours. The trade is real and you have made it deliberately.',
        effect: (p) => { p.m += 5; p.addFlag('deaf_community_career'); p.setMem('disDeafHearingFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 3 — ACQUIRED DISABILITY
// The before/after structure. Grief for the lost self. The new normal.
// ═══════════════════════════════════════════════════════════════════════════════

const ACQUIRED_DISABILITY_EVENTS = [

  {
    id: 'dis_acquired_event',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.has('disability_acquired') &&
      !G.mem?.disAcquiredFired,
    text: (G) => {
      const type = G.mem?.acquiredDisabilityType ?? 'accident'
      if (type === 'accident') return 'The accident is specific and takes seconds. What comes after takes years. The hospital is the first chapter. Rehabilitation is the second. Understanding what the third chapter is — what the life looks like now, what it can contain, what it cannot — is a process that begins in the rehabilitation ward and does not fully end.'
      if (type === 'progressive') return 'The diagnosis is for a condition that will progress. The progression has a pace that is unpredictable but directional. You have time. The time is also running. You begin making a set of decisions about what to do with both facts simultaneously.'
      return 'The stroke happens on a Thursday. The recovery is partial, which is what most strokes produce — partial recovery. The word partial covers a range. You spend the first months understanding exactly where on that range you are.'
    },
    choices: null,
    effect: (p) => { p.h -= 20; p.m -= 15; p.addFlag('acquired_disability'); p.setMem('disAcquiredFired', true) },
  },

  {
    id: 'dis_acquired_rehabilitation',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('acquired_disability') &&
      !G.mem?.disRehabFired,
    text: 'The rehabilitation unit has its own time. Not clock time — the time of incremental recovery, which is measured in what the body can do today that it couldn\'t yesterday, or couldn\'t do last week, which is not the same as yesterday. The physiotherapist is patient and specific. Progress is not linear. The days when progress reverses are the hardest. You are learning a new relationship with your body from the inside, which is different from being told about it.',
    choices: null,
    effect: (p) => { p.h += 8; p.m -= 5; p.addFlag('disability_rehabilitation'); p.setMem('disRehabFired', true) },
  },

  {
    id: 'dis_before_after_grief',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('acquired_disability') &&
      G.flags.has('disability_rehabilitation') &&
      !G.mem?.disBeforeAfterFired,
    text: 'There is a person you were before the accident and a person you are after it. The grief for the person before — the body before, the capacities before, the unguarded physical confidence before — is real grief and not always named as grief because the person is still here. You are still here. The grief is for the version that was here differently. Holding both at once is the main interior work of this period.',
    choices: [
      {
        text: 'Grieve it properly — the loss is real and deserves that',
        tag: null,
        outcome: 'The grief moves through. It does not end in the way that a chapter ends but it changes quality. The before and after become both real rather than the before being the only real.',
        effect: (p) => { p.m += 5; p.r -= 6; p.addFlag('disability_grief_processed'); p.setMem('disBeforeAfterFired', true) },
      },
      {
        text: 'Move forward — the grief is a weight you can\'t afford to carry',
        tag: null,
        outcome: 'You move. The weight doesn\'t go away by not looking at it but you learn to carry it while walking.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('disability_forward_focus'); p.setMem('disBeforeAfterFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_new_normal',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('acquired_disability') &&
      !G.mem?.disNewNormalFired,
    text: 'The new normal is not a phrase you chose but it is accurate. The life has reorganised itself around the changed body — the job that accommodates it, the home that is accessible, the relationships that continued and the ones that didn\'t, the specific pleasures that are still available and the ones that are not. You are not the person you were before the accident or the diagnosis. You are also not a diminished version of that person. You are a different configuration.',
    choices: null,
    effect: (p) => { p.m += 8; p.addFlag('disability_new_normal'); p.setMem('disNewNormalFired', true) },
  },

  {
    id: 'dis_progressive_later',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('acquired_disability') &&
      G.mem?.acquiredDisabilityType === 'progressive' &&
      G.age >= 40 &&
      !G.mem?.disProgressiveLaterFired,
    text: 'The condition has been stable for years. Stable is not the same as resolved. You have lived with the uncertainty long enough to stop thinking about it daily. Then you have a week when the symptoms are more present, and the management requires more, and the future you have been not-thinking-about becomes present and specific again. The week passes. The not-thinking-about resumes. You are good at this now.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 5; p.addFlag('disability_progression'); p.setMem('disProgressiveLaterFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 4 — CROSS-CUTTING
// Events that fire for any character with disability flags.
// ═══════════════════════════════════════════════════════════════════════════════

const DISABILITY_CROSSCUTTING = [

  {
    id: 'dis_inaccessible_world',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      (G.flags.has('born_with_disability') || G.flags.has('acquired_disability') || G.flags.has('born_deaf')) &&
      !G.mem?.disInaccessFired,
    text: (G) => {
      const archetype = G.currentCountry?.archetype ?? 'wealthy_west'
      const isDeveloping = ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(archetype)
      if (isDeveloping) return 'The city was not designed with you in mind. This is not a policy failure in any official sense — it is just how cities were built and rebuilt without accounting for anyone who moved through them differently. The kerbs, the buildings, the buses. You have built a detailed mental map of what is navigable and what is not. The map is the largest ongoing project of your daily life.'
      return 'The accessibility legislation exists. The compliance is partial. The accessible entrance is at the back, next to the bins. The lift is out of service. The website does not render with a screen reader. The meeting has no interpreter. The gap between the policy and the implementation is where your daily life happens.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('disability_inaccessibility_experienced'); p.setMem('disInaccessFired', true) },
  },

  {
    id: 'dis_cure_offered',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      (G.flags.has('born_with_disability') || G.flags.has('born_deaf')) &&
      G.currentYear >= 1970 &&
      !G.mem?.disCureFired,
    text: 'Someone offers a cure — a treatment, a surgery, a programme, a therapy that promises improvement. The offering comes from a place of love, or from the internet, or from a relative who read something. The question it raises is not simple: whether the condition is a thing to be fixed, or a condition of the life, or both, or neither.',
    choices: [
      {
        text: 'Worth trying — if it helps, it helps',
        tag: null,
        outcome: 'The treatment has partial effect and full cost. The cost is physical and financial and the partial effect is real. This is most outcomes.',
        effect: (p) => { p.h += 3; p.mo -= 500; p.addFlag('disability_treatment_tried'); p.setMem('disCureFired', true) },
      },
      {
        text: 'This is not something to be cured',
        tag: null,
        outcome: 'The refusal is not denial. It is a position about what the disability is. You have arrived at this position slowly and it is yours.',
        effect: (p) => { p.m += 4; p.addFlag('disability_identity_formed'); p.setMem('disCureFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dis_technology_equaliser',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      (G.flags.has('born_with_disability') || G.flags.has('acquired_disability') || G.flags.has('born_deaf')) &&
      G.currentYear >= 1995 &&
      !G.mem?.disTechFired,
    text: (G) => {
      const yr = G.currentYear ?? 2005
      if (yr < 2005) return 'The screen reader, the adapted keyboard, the voice recognition software — the assistive technology is improving at a rate that is outpacing the institutional accommodation. You are assembling your toolkit piece by piece. It is imperfect and real.'
      return 'The smartphone has changed the specific geometry of accessibility in ways that the designers didn\'t primarily intend. Navigation without having to ask directions. Live captions. Voice to text. Text to speech. The gap is still there. The technology closes parts of it. You use every part that works.'
    },
    choices: null,
    effect: (p) => { p.e += 4; p.m += 4; p.addFlag('disability_tech_found'); p.setMem('disTechFired', true) },
  },

  {
    id: 'dis_late_life_disability',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      (G.flags.has('born_with_disability') || G.flags.has('acquired_disability')) &&
      G.age >= 65 &&
      !G.mem?.disLateLifeFired,
    text: 'The disability you have carried for forty or fifty years has its own relationship with ageing. The body that compensated for decades begins to compensate less efficiently. The pain that was manageable becomes less manageable. The adaptations that worked need updating. The knowledge you have accumulated — about what helps, what doesn\'t, how to navigate the system, what to insist on — is deep and hard-won and now more necessary than ever.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 5; p.addFlag('disability_late_life'); p.setMem('disLateLifeFired', true) },
  },

]

export const DISABILITY_EVENTS = [
  ...BIRTH_DISABILITY_EVENTS,
  ...DEAF_ARC_EVENTS,
  ...ACQUIRED_DISABILITY_EVENTS,
  ...DISABILITY_CROSSCUTTING,
]

// Relationship cross-pollination events.
// These fire when the state of the player's relationship (quality, presence, loss)
// bleeds into other domains: career, creative work, social life, parenting.
// The relationship is invisible in the UI — these make it felt.

export const RELATIONSHIP_CROSSOVER_EVENTS = [

  // ── CAREER PEAK × BAD MARRIAGE ───────────────────────────────────────────────

  {
    id: 'rcp_career_peak_bad_marriage',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.career &&
      G.partner?.married &&
      (G.partner.relationshipQuality ?? 60) < 42 &&
      (G.stats.wealth ?? 50) > 68 &&
      !G.mem?.rcpCareerPeakBadMarriage,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `The promotion comes through. It is the one you have been working toward. On the way home you think about who you will tell first. You realise the person you most want to tell is ${pn}, and then you realise something else.`
    },
    choices: [
      {
        text: 'Tell them. Try.',
        outcome: 'You tell them. They say congratulations. It sounds exactly right and entirely hollow.',
        effect: (p) => { p.m += 2; p.r += 6; p.setMem('rcpCareerPeakBadMarriage', true) },
      },
      {
        text: 'Call a colleague instead.',
        outcome: 'The colleague is genuinely pleased. The pleasure doesn\'t go as deep as it should.',
        effect: (p) => { p.m += 4; p.r += 8; p.setMem('rcpCareerPeakBadMarriage', true) },
      },
    ],
  },

  // ── CAREER SETBACK × GOOD MARRIAGE ───────────────────────────────────────────

  {
    id: 'rcp_career_setback_partner_anchor',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.career &&
      G.partner?.married &&
      (G.partner.relationshipQuality ?? 60) > 72 &&
      (G.stats.wealth ?? 50) < 42 &&
      !G.mem?.rcpCareerSetbackPartner,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `The work isn't going well. You bring it home in the way you try not to, and ${pn} sees it before you say anything. They don't tell you it will be fine. They hand you something — a drink, a seat at the table — and sit with you.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.updatePartnerRel(4); p.setMem('rcpCareerSetbackPartner', true) },
  },

  // ── CHILDREN × CAREER REFRAME ─────────────────────────────────────────────────

  {
    id: 'rcp_child_career_reframe',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.career &&
      (G.children ?? []).length > 0 &&
      (G.children[0].age ?? 0) >= 1 &&
      (G.children[0].age ?? 0) <= 4 &&
      !G.mem?.rcpChildCareerReframe,
    text: (G) => {
      const cn = G.children[0].name?.split(' ')[0] ?? 'them'
      return `${cn} does something small — makes a noise, reaches for something — and for a moment you are entirely there, not half somewhere else the way you have been for months. You think about work differently for the rest of the day. Not worse. Differently.`
    },
    choices: [
      {
        text: 'Lean into it. The work can wait.',
        tag: 'reframed_career_for_child',
        outcome: 'You pull back somewhere, give something up. The career notices. So does the child, who will not remember but is shaped by it anyway.',
        effect: (p) => { p.m += 8; p.karma += 5; p.w -= 3; p.setMem('rcpChildCareerReframe', true) },
      },
      {
        text: 'The work is what provides for them.',
        outcome: 'This is also true. You carry both things and try not to drop either.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('rcpChildCareerReframe', true) },
      },
    ],
  },

  // ── PARTNER BELIEVES IN CREATIVE WORK ────────────────────────────────────────

  {
    id: 'rcp_partner_believes_in_project',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.partner?.married &&
      G.currentProject &&
      G.currentProject.phase !== 'abandoned' &&
      (G.partner.relationshipQuality ?? 60) > 70 &&
      !G.mem?.rcpPartnerProject,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      const proj = G.currentProject.name ?? 'the project'
      return `${pn} asks how ${proj} is going, and the question contains the whole of what they are — they remember it, they ask about it the way they ask about things that matter to them, and you understand that their belief in it is part of what makes you keep going.`
    },
    choices: null,
    effect: (p) => { p.m += 6; p.updatePartnerRel(4); p.setMem('rcpPartnerProject', true) },
  },

  // ── WIDOWED × CAREER MEANING ──────────────────────────────────────────────────

  {
    id: 'rcp_widowed_career_what_for',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('widowed') &&
      G.career &&
      !G.mem?.rcpWidowedCareer &&
      G.age >= 40 && G.age <= 62,
    text: 'You go back to work. This is the correct thing to do and you know it. On the second day back, a colleague says: it must be good to have something to focus on. You say yes. For a month the work is what you do in the hours that need doing. Then, slowly, it becomes something else again.',
    choices: [
      {
        text: 'Let the work be what it is — a way through.',
        outcome: 'You let it carry you. Work has done this for people before and it does it now.',
        effect: (p) => { p.m += 5; p.r += 4; p.setMem('rcpWidowedCareer', true) },
      },
      {
        text: 'There has to be more to it than distraction.',
        outcome: 'You look for meaning in the work that was always there, or was not.',
        effect: (p) => { p.r += 7; p.e += 3; p.setMem('rcpWidowedCareer', true) },
      },
    ],
  },

  // ── DIFFICULT MARRIAGE × SOCIAL LIFE ─────────────────────────────────────────

  {
    id: 'rcp_bad_marriage_social_mask',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) =>
      G.partner?.married &&
      (G.partner.relationshipQuality ?? 60) < 38 &&
      (G.friends ?? []).length > 0 &&
      !G.mem?.rcpBadMarriageSocial,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `At dinner with friends, someone asks how you and ${pn} are doing. You say: good, yes, fine. The answer is fast, which they might notice, or might not. The social version of your marriage and the private version have been different for a while.`
    },
    choices: [
      {
        text: 'Tell one of them the truth.',
        tag: 'told_friend_about_marriage',
        outcome: 'You pull a friend aside later. The relief of saying it out loud is immediate. What to do with it is still the same question.',
        effect: (p) => { p.m += 4; p.r += 3; p.setMem('rcpBadMarriageSocial', true) },
      },
      {
        text: 'Keep the version.',
        outcome: 'You keep it. Most people keep it. The performance is part of the problem and also how you get through the evening.',
        effect: (p) => { p.r += 5; p.s -= 2; p.setMem('rcpBadMarriageSocial', true) },
      },
    ],
  },

  // ── LONG MARRIAGE × LOOKING BACK ─────────────────────────────────────────────

  {
    id: 'rcp_long_marriage_early_version',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.partner?.married &&
      (G.partner.years ?? 0) >= 25 &&
      (G.partner.relationshipQuality ?? 60) > 60 &&
      !G.mem?.rcpLongMarriageLookback,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `A photograph, or a film you saw together when you were first together, or a place you pass. The early version of you and ${pn} is briefly very present. The early version had no idea. This version has paid for what it knows. You are glad it doesn't know.`
    },
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 3; p.setMem('rcpLongMarriageLookback', true) },
  },

  // ── ESTRANGED CHILD × CAREER RECOGNITION ─────────────────────────────────────

  {
    id: 'rcp_estranged_child_success',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) =>
      G.flags.has('accepted_child_estrangement') &&
      (G.stats.wealth ?? 50) > 65 &&
      !G.mem?.rcpEstrangedChildSuccess,
    text: 'Something goes well publicly — a recognition, an article, a thing people notice. You think of them. You wonder if they see it. You wonder if that matters, and then wonder if wondering if it matters is part of the problem.',
    choices: [
      {
        text: 'Send them a message. Not about the success. Just contact.',
        outcome: 'You send it. It is not about the success. You wait.',
        effect: (p) => { p.karma += 6; p.r += 5; p.m -= 3; p.setMem('rcpEstrangedChildSuccess', true) },
      },
      {
        text: 'Leave it alone.',
        outcome: 'You leave it. The achievement and the absence sit together as they have been sitting.',
        effect: (p) => { p.r += 7; p.m -= 2; p.setMem('rcpEstrangedChildSuccess', true) },
      },
    ],
  },

]

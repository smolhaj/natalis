// Partner wants — events where the partner expresses a desire, need, or grievance.
// These create genuine player decisions with real consequences for the relationship.
// Each event requires a partner and has a cooldown to prevent over-firing.
// Relationship quality gates which types of wants surface (low = crisis, high = growth).

export const PARTNER_WANTS_EVENTS = [

  // ── WANTS A CHILD ────────────────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_child',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.partner?.married && (G.children ?? []).length === 0 && G.age >= 26 && G.age <= 36 && (G.partner.relationshipQuality ?? 60) > 50,
    text: (G) => `${(G.partner.name ?? 'Your partner').split(' ')[0]} raises it again. Not as a fight — as a want. A real one. The conversation is different this time.`,
    choices: [
      {
        text: 'You want this too.',
        tag: 'decided_to_have_children',
        outcome: 'Something clarifies between you. The trying begins.',
        effect: (p) => { p.addFlag('trying_for_child'); p.m += 6; p.updatePartnerRel(8) },
      },
      {
        text: 'You need more time.',
        outcome: 'You ask for more time. They give it. Both of you feel the weight of the asking.',
        effect: (p) => { p.updatePartnerRel(-5); p.r += 3 },
      },
      {
        text: 'You do not want children.',
        tag: 'refused_to_have_children',
        outcome: 'You say it clearly. The conversation that follows is one of the longer ones.',
        effect: (p) => { p.updatePartnerRel(-12); p.r += 5 },
      },
    ],
  },

  // ── WANTS TO MOVE ─────────────────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_move',
    phase: 'young_adult',
    weight: 2,
    cooldown: 10,
    when: (G) => G.partner?.married && G.age >= 24 && G.age <= 38 && (G.partner.relationshipQuality ?? 60) > 45,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `${pn} has been offered something in another city. A real opportunity — better than what they have now. They want you to go with them. This is a conversation, not an ultimatum. So far.`
    },
    choices: [
      {
        text: 'Go. The relationship matters more than the place.',
        tag: 'moved_for_partner',
        outcome: 'You uproot. It costs you things. Some of them you are glad to have lost. Some you will look for in the new place for years.',
        effect: (p) => { p.m -= 4; p.updatePartnerRel(12); p.addFlag('moved_for_partner') },
      },
      {
        text: 'Propose a compromise — long distance for a year first.',
        tag: 'partner_longdistance',
        outcome: 'They say yes, provisionally. The year ahead will be harder than the conversation about it.',
        effect: (p) => { p.updatePartnerRel(-6); p.r += 3 },
      },
      {
        text: 'You cannot go. This is where your life is.',
        outcome: 'You explain what you cannot leave. They hear you. The weight of the refusal sits between you.',
        effect: (p) => { p.updatePartnerRel(-10); p.r += 5 },
      },
    ],
  },

  // ── WANTS MORE PRESENCE ────────────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_presence',
    phase: 'midlife',
    weight: 2,
    cooldown: 6,
    when: (G) => G.partner && G.career && G.age >= 30 && G.age <= 50 && (G.partner.relationshipQuality ?? 60) < 60 && (G.partner.relationshipQuality ?? 60) > 35,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `${pn} says it. Not as an accusation — more tired than that. You have been away more than you have been here. The work has been the reason. The reason is true. It is also not the full explanation.`
    },
    choices: [
      {
        text: 'Change something — pull back from the work.',
        tag: 'pulled_back_from_career_for_relationship',
        outcome: 'You make the adjustment. The career notices. The relationship, slowly, also notices.',
        effect: (p) => { p.m += 5; p.updatePartnerRel(10) },
      },
      {
        text: 'Promise to do better.',
        outcome: 'You make the promise in good faith. Promises made in this conversation have a specific gravity.',
        effect: (p) => { p.updatePartnerRel(3) },
      },
      {
        text: 'Explain that the work cannot wait right now.',
        outcome: 'They accept this. They have accepted it before. You both know the count.',
        effect: (p) => { p.updatePartnerRel(-8); p.r += 4 },
      },
    ],
  },

  // ── WANTS EMOTIONAL DEPTH ─────────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_depth',
    phase: 'midlife',
    weight: 1,
    cooldown: 8,
    when: (G) => G.partner?.married && G.age >= 32 && (G.partner.relationshipQuality ?? 60) >= 35 && (G.partner.relationshipQuality ?? 60) <= 58,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `${pn} says they don't know what you're thinking anymore. Not as a complaint exactly — as a fact. You have been next to each other and not in contact. Both of you know this. Only one of you has said it.`
    },
    choices: [
      {
        text: 'Tell them something true.',
        tag: 'opened_up_to_partner',
        outcome: 'You find something real and offer it. The evening is different afterward. So is the week.',
        effect: (p) => { p.m += 4; p.updatePartnerRel(12) },
      },
      {
        text: 'Suggest a ritual — dinner without phones, a walk.',
        outcome: 'A small change. Small changes are what the large ones are made of.',
        effect: (p) => { p.updatePartnerRel(6); p.m += 2 },
      },
      {
        text: 'Deflect. Tell them everything is fine.',
        outcome: '"Everything is fine" is a sentence that closes doors.',
        effect: (p) => { p.updatePartnerRel(-9); p.r += 4 },
      },
    ],
  },

  // ── WANTS COUPLES THERAPY ─────────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_therapy',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.partner?.married && (G.partner.relationshipQuality ?? 60) < 45 && (G.partner.relationshipQuality ?? 60) >= 28 && G.age >= 28 && !G.flags.has('couples_therapy') && !G.mem?.coupleTherapyOffered,
    text: (G) => `${(G.partner.name ?? 'Your partner').split(' ')[0]} suggests therapy. The word has been in the room for a while. They have just said it out loud.`,
    choices: [
      {
        text: 'Yes.',
        tag: 'couples_therapy',
        outcome: 'The first session is uncomfortable in the specific way that useful things often are.',
        effect: (p) => { p.m -= 3; p.updatePartnerRel(15); p.setMem('coupleTherapyOffered', true) },
      },
      {
        text: 'Not yet.',
        outcome: 'Not yet has a long history of becoming a while. They know this. You know this.',
        effect: (p) => { p.r += 4; p.updatePartnerRel(-6); p.setMem('coupleTherapyOffered', true) },
      },
    ],
  },

  // ── WANTS TO MEET YOUR FAMILY ─────────────────────────────────────────────────

  {
    id: 'pw_partner_wants_meet_family',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.partner && !G.partner.married && G.age >= 20 && G.age <= 34 && (G.partner.relationshipQuality ?? 60) > 60 && !G.mem?.partnerMetFamily,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `${pn} wants to meet your family. It is a statement of intention — that they see this as real, and they want you to know they see it.`
    },
    choices: [
      {
        text: 'Arrange it.',
        outcome: 'The meeting happens. All meetings of this kind are complicated. This one is also theirs.',
        effect: (p) => { p.updatePartnerRel(8); p.m += 4; p.setMem('partnerMetFamily', true) },
      },
      {
        text: 'Explain it\'s complicated.',
        outcome: 'They accept this, which is its own kind of answer.',
        effect: (p) => { p.updatePartnerRel(-3); p.setMem('partnerMetFamily', true) },
      },
      {
        text: 'Not yet. This isn\'t the right time.',
        outcome: 'You are not ready. That is the information.',
        effect: (p) => { p.updatePartnerRel(-6); p.r += 3; p.setMem('partnerMetFamily', true) },
      },
    ],
  },

  // ── EXPRESSES JOY IN THE RELATIONSHIP ─────────────────────────────────────────

  {
    id: 'pw_partner_happiness',
    phase: 'midlife',
    weight: 2,
    cooldown: 5,
    when: (G) => G.partner?.married && (G.partner.relationshipQuality ?? 60) > 72 && (G.partner.years ?? 0) >= 5,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return pick([
        `${pn} says something small — a joke that lands, a comment so specific to your private world that you both laugh. This is the relationship at its best.`,
        `${pn} tells you, in a way they don't usually, that they are glad it was you. The sentence is simple. It does not require a response. You give one anyway.`,
        `A quiet evening. ${pn} across the room doing something ordinary. You watch them without them knowing. The specific pleasure of being with someone you chose.`,
      ])
    },
    choices: null,
    effect: (p) => { p.m += 6; p.updatePartnerRel(4) },
  },

  // ── PARTNER'S CAREER CRISIS ────────────────────────────────────────────────────

  {
    id: 'pw_partner_career_crisis',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.partner && G.age >= 30 && G.age <= 48 && (G.partner.relationshipQuality ?? 60) > 40,
    text: (G) => {
      const pn = (G.partner.name ?? 'Your partner').split(' ')[0]
      return `${pn} is having a difficult time at work. Not a small thing — a real crisis of purpose. They are not sure why they are doing what they are doing. They are bringing this home.`
    },
    choices: [
      {
        text: 'Be the one who stays present for this.',
        tag: 'supported_partner_through_crisis',
        outcome: 'You show up for it. This is unglamorous and necessary and they will not forget it.',
        effect: (p) => { p.updatePartnerRel(10); p.karma += 4; p.m -= 2 },
      },
      {
        text: 'Offer practical help — contacts, ideas, a plan.',
        outcome: 'You bring what you have. Some of it lands. The attempt itself is what mattered.',
        effect: (p) => { p.updatePartnerRel(6); p.m += 2 },
      },
      {
        text: 'Give them space to work it out.',
        outcome: 'You try not to crowd it. They appreciate the space. They are also a little alone in it.',
        effect: (p) => { p.updatePartnerRel(-2) },
      },
    ],
  },

]

// needed for pick() in pw_partner_happiness
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

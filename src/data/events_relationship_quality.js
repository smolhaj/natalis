// Events gated on relationship quality thresholds.
// These give texture to the ongoing state of relationships rather than
// treating them as invisible numbers. Cooldowns prevent over-firing.
// Partner quality < 40: deterioration arc. > 78: warmth arc.
// Child/sibling quality thresholds: drift and closeness arcs.

export const RELATIONSHIP_QUALITY_EVENTS = [

  // ── PARTNER DETERIORATION ────────────────────────────────────────────────────

  {
    id: 'rq_partner_silence',
    phase: 'midlife',
    weight: 2,
    cooldown: 3,
    when: (G) => G.partner && (G.partner.relationshipQuality ?? 60) < 40 && (G.partner.relationshipQuality ?? 60) >= 28,
    text: (G) => `Dinner has become functional. You pass things, you ask about the day. Something has moved to a different room and you have both agreed, without saying it, not to go in.`,
    choices: [
      {
        text: `Say something.`,
        tag: 'addressed_marriage_silence',
        outcome: `You say it badly, which is still better than not saying it. The evening ends tense but something has shifted.`,
        effect: (p) => { p.m -= 5; p.updatePartnerRel(8) },
      },
      {
        text: `Leave it.`,
        tag: 'avoided_marriage_conversation',
        outcome: `The room stays the same. The agreement stays unspoken.`,
        effect: (p) => { p.updatePartnerRel(-4) },
      },
    ],
  },

  {
    id: 'rq_partner_contempt',
    phase: 'midlife',
    weight: 1,
    cooldown: 5,
    when: (G) => G.partner && (G.partner.relationshipQuality ?? 60) < 28,
    text: (G) => `You say something small and unkind. The kind of thing you wouldn't have said three years ago. ${G.partner.name} doesn't respond, which is worse than responding.`,
    choices: [
      {
        text: `Apologise.`,
        tag: 'apologised_in_marriage',
        outcome: (G) => `You apologise that night. ${G.partner.name} accepts it. Something small is repaired. The larger thing is still there.`,
        effect: (p) => { p.m += 3; p.updatePartnerRel(10); p.karma += 2 },
      },
      {
        text: `Say nothing.`,
        tag: 'swallowed_the_marriage',
        outcome: `It joins the list of things you both remember differently.`,
        effect: (p) => { p.r += 4; p.updatePartnerRel(-8) },
      },
    ],
  },

  {
    id: 'rq_partner_separate_lives',
    phase: 'midlife',
    weight: 2,
    cooldown: 4,
    when: (G) => G.partner && (G.partner.relationshipQuality ?? 60) >= 28 && (G.partner.relationshipQuality ?? 60) < 38 && G.partner.married,
    text: (G) => `You've started doing certain things separately. Dinners with friends. A few holidays. Neither of you called it anything. The arrangement happened before the conversation about it.`,
    choices: [
      {
        text: `Suggest something together.`,
        tag: 'reached_toward_partner',
        outcome: (G) => `You suggest a trip. ${G.partner.name} says yes, which surprises you a little. The trip is ordinary and that's exactly what it needed to be.`,
        effect: (p) => { p.m += 6; p.updatePartnerRel(12) },
      },
      {
        text: `This arrangement works.`,
        tag: 'accepted_parallel_marriage',
        outcome: `It does work, in a way. Both of you have lives. Both of you are fine. You are not sure this is enough and not sure it isn't.`,
        effect: (p) => { p.r += 3 },
      },
    ],
  },

  {
    id: 'rq_partner_warmth',
    phase: 'midlife',
    weight: 2,
    cooldown: 4,
    when: (G) => G.partner && (G.partner.relationshipQuality ?? 60) > 78,
    text: (G) => `You catch ${G.partner.name} reading and watch them without them knowing — the specific quiet pleasure of being in a room with someone you love and not needing anything from each other.`,
    choices: null,
    effect: (p) => { p.m += 3 },
  },

  {
    id: 'rq_partner_long_warmth',
    phase: 'late_life',
    weight: 2,
    cooldown: 6,
    when: (G) => G.partner && G.partner.married && (G.partner.relationshipQuality ?? 60) > 82,
    text: (G) => `People ask how you do it — thirty years, and you both still... The question trails off. You have a version of an answer. The real version doesn't translate into something you can say at a dinner party.`,
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 3 },
  },

  {
    id: 'rq_partner_repair_attempt',
    phase: 'midlife',
    weight: 1,
    cooldown: 6,
    when: (G) => G.partner && (G.partner.relationshipQuality ?? 60) < 35 && G.partner.married && G.flags.has('addressed_marriage_silence'),
    text: (G) => `${G.partner.name} suggests counselling. The word sits between you for a moment.`,
    choices: [
      {
        text: `Agree.`,
        tag: 'couples_therapy',
        outcome: `The first session is uncomfortable in the specific way that useful things often are.`,
        effect: (p) => { p.m -= 3; p.updatePartnerRel(15) },
      },
      {
        text: `Not yet.`,
        tag: 'refused_couples_therapy',
        outcome: (G) => `Not yet becomes a while. ${G.partner.name} doesn't bring it up again.`,
        effect: (p) => { p.r += 5; p.updatePartnerRel(-6) },
      },
    ],
  },

  // ── CHILD QUALITY ARCS ───────────────────────────────────────────────────────

  {
    id: 'rq_child_drift',
    phase: null,
    weight: 2,
    cooldown: 3,
    when: (G) => (G.children ?? []).some(c => c.age >= 20 && (c.relationshipQuality ?? 50) < 40 && (c.relationshipQuality ?? 50) >= 26),
    text: (G) => {
      const c = (G.children ?? []).find(c => c.age >= 20 && (c.relationshipQuality ?? 50) < 40)
      return `${c?.name?.split(' ')[0] ?? 'Your child'} calls once a month now. There was a time it was every week. The calls are fine — they just have a different texture. Like talking through glass.`
    },
    choices: [
      {
        text: `Call more often.`,
        outcome: `You call. The conversation is warmer than you expected, which tells you something.`,
        effect: (p) => {
          const idx = (p._state?.children ?? []).findIndex(c => c.age >= 20 && (c.relationshipQuality ?? 50) < 40)
          if (idx >= 0) p.updateChildRel(idx, 10)
          p.m += 3
        },
      },
      {
        text: `Give them space.`,
        outcome: `They're adults. Space is what you have to offer.`,
        effect: (p) => { p.r += 2 },
      },
    ],
  },

  {
    id: 'rq_child_estrangement',
    phase: null,
    weight: 1,
    cooldown: 5,
    when: (G) => (G.children ?? []).some(c => c.age >= 22 && (c.relationshipQuality ?? 50) < 24),
    text: (G) => {
      const c = (G.children ?? []).find(c => c.age >= 22 && (c.relationshipQuality ?? 50) < 24)
      return `You haven't seen ${c?.name?.split(' ')[0] ?? 'them'} in over a year. You have their address. There was a thing said, and then a silence, and the silence became the thing itself.`
    },
    choices: [
      {
        text: `Write a letter.`,
        tag: 'wrote_estranged_child',
        outcome: `You write it three times before you send it. Whether they respond is out of your hands.`,
        effect: (p) => {
          const idx = (p._state?.children ?? []).findIndex(c => c.age >= 22 && (c.relationshipQuality ?? 50) < 24)
          if (idx >= 0) p.updateChildRel(idx, 8)
          p.karma += 4; p.r += 3
        },
      },
      {
        text: `Respect the silence.`,
        tag: 'accepted_child_estrangement',
        outcome: `You tell yourself it's what they want. Some days you believe it.`,
        effect: (p) => { p.r += 6 },
      },
    ],
  },

  {
    id: 'rq_child_close',
    phase: null,
    weight: 2,
    cooldown: 4,
    when: (G) => (G.children ?? []).some(c => c.age >= 22 && (c.relationshipQuality ?? 50) > 80),
    text: (G) => {
      const c = (G.children ?? []).find(c => c.age >= 22 && (c.relationshipQuality ?? 50) > 80)
      return `${c?.name?.split(' ')[0] ?? 'Your child'} texts you about something small — a recipe, a film, a thing that happened at work. You text back. This is the relationship you have, and it took years to build.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 2 },
  },

  // ── SIBLING QUALITY ARCS ─────────────────────────────────────────────────────

  {
    id: 'rq_sibling_formal',
    phase: 'midlife',
    weight: 1,
    cooldown: 4,
    when: (G) => (G.siblings ?? []).some(s => s.alive !== false && (s.relationshipQuality ?? 50) < 36),
    text: (G) => {
      const sib = (G.siblings ?? []).find(s => s.alive !== false && (s.relationshipQuality ?? 50) < 36)
      return `You and ${sib?.name ?? 'your sibling'} have become people who exchange birthday messages. That is accurate and not quite enough.`
    },
    choices: [
      {
        text: `Reach out properly.`,
        outcome: `You call instead of text. The conversation runs long in a way neither of you planned.`,
        effect: (p) => {
          const idx = (p._state?.siblings ?? []).findIndex(s => s.alive !== false && (s.relationshipQuality ?? 50) < 36)
          if (idx >= 0) p.updateFriendRel?.(idx, 12) // siblings use similar mechanic
          p.m += 5
        },
      },
      {
        text: `It's fine.`,
        outcome: `It is fine, the way things can be fine.`,
        effect: (p) => { p.r += 2 },
      },
    ],
  },

  {
    id: 'rq_sibling_close',
    phase: 'midlife',
    weight: 1,
    cooldown: 5,
    when: (G) => (G.siblings ?? []).some(s => s.alive !== false && (s.relationshipQuality ?? 50) > 78),
    text: (G) => {
      const sib = (G.siblings ?? []).find(s => s.alive !== false && (s.relationshipQuality ?? 50) > 78)
      return `${sib?.name ?? 'Your sibling'} knows you the way only someone who grew up in the same house can. The shorthand between you is decades deep.`
    },
    choices: null,
    effect: (p) => { p.m += 3 },
  },

  // ── FRIEND QUALITY ARCS ──────────────────────────────────────────────────────

  {
    id: 'rq_friend_fading',
    phase: null,
    weight: 2,
    cooldown: 3,
    when: (G) => (G.friends ?? []).some(f => f.alive !== false && (f.relationshipQuality ?? 50) < 28),
    text: (G) => {
      const f = (G.friends ?? []).find(f => f.alive !== false && (f.relationshipQuality ?? 50) < 28)
      return `${f?.name ?? 'An old friend'} used to be someone you called. Now you mostly like each other's posts online. When you last spoke it had been seven months, which surprised both of you.`
    },
    choices: [
      {
        text: `Call them.`,
        outcome: `The conversation is easier than you expected. Seven months compressed into an hour.`,
        effect: (p) => {
          const idx = (p._state?.friends ?? []).findIndex(f => f.alive !== false && (f.relationshipQuality ?? 50) < 28)
          if (idx >= 0) p.updateFriendRel(idx, 14)
          p.m += 4
        },
      },
      {
        text: `Let it fade.`,
        outcome: `Some friendships have a natural end. You're not sure this is one of them.`,
        effect: (p) => {
          const idx = (p._state?.friends ?? []).findIndex(f => f.alive !== false && (f.relationshipQuality ?? 50) < 28)
          if (idx >= 0) p.updateFriendRel(idx, -6)
          p.r += 3
        },
      },
    ],
  },

]

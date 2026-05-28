// Follow-through events for orphaned flags identified in audit.
// Every event here requires a specific prior flag as its gate.
// Standard: use G.flags.has() not G.flags.includes(). Use G.mem for one-time fires.

export const FOLLOWTHROUGH_3_EVENTS = [

  // ── OUT (LGBTQ openly living) ─────────────────────────────────────────────
  {
    id: 'ft3_out_ordinary_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.flags.has('out') || G.flags.has('lgbtq_outed_at_work') || G.flags.has('lgbtq_out_to_friend')) &&
      G.age >= 25 && G.age <= 38 &&
      !G.mem?.ft3_out_ordinary,
    text: 'Years after you came out, you notice that the word is gone from most conversations — not forgotten, just ordinary. You are simply yourself in most rooms now. The weight of it still surfaces occasionally: a comment, a form that has two options, a new colleague asking about your spouse with the wrong pronoun. But the vigilance has become background noise rather than the foreground. You have arrived somewhere you once could not see.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.setMem('ft3_out_ordinary', true); },
  },

  // ── IN_RECOVERY milestone ─────────────────────────────────────────────────
  {
    id: 'ft3_recovery_one_year',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('in_recovery') &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.ft3_recovery_yr1,
    text: 'One year. The number is arbitrary and isn\'t. The meetings keep calling it a milestone. You are not sure what you have built is permanent — you are not sure that\'s the right question. What you know is that a year ago you would not have been able to sit in a room with the thing you want and not take it. You can now. The person who comes in on day three and the person who holds a chip after a year are related but not identical.',
    choices: [
      {
        text: 'Mark it — the year matters',
        tag: null,
        outcome: 'You let yourself have it. Just once, you let the milestone be real.',
        effect: (p) => { p.m += 8; p.h += 3; p.karma += 5; p.setMem('ft3_recovery_yr1', true); },
        inject: null,
      },
      {
        text: 'Keep your head down — don\'t tempt the count',
        tag: null,
        outcome: 'Superstition or discipline — you\'re not sure which. You keep moving.',
        effect: (p) => { p.m += 4; p.h += 2; p.setMem('ft3_recovery_yr1', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FAITH_CRISIS / QUESTIONED_FAITH resolution ───────────────────────────
  {
    id: 'ft3_faith_settled',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('faith_crisis') || G.flags.has('questioned_faith')) &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft3_faith_settled,
    text: 'The crisis has been open for years now. You notice it has quietly resolved without closing — you have stopped asking the question that used to keep you awake, not because you found the answer but because you found a way to live around it. Whether that is maturity or surrender or something in between is not clear. What is clear: you are not the same person who walked out of the service, the yeshiva, the mosque, the skeptic\'s meeting room. You are whoever came after.',
    choices: [
      {
        text: 'You found your way back to something like faith',
        tag: null,
        outcome: 'Not the faith you had. A rebuilt one. More careful. Still yours.',
        effect: (p) => { p.m += 6; p.r -= 4; p.addFlag('faith_rebuilt'); p.setMem('ft3_faith_settled', true); },
        inject: null,
      },
      {
        text: 'You found your way out entirely',
        tag: null,
        outcome: 'The absence is not a wound anymore. It is a room you have furnished differently.',
        effect: (p) => { p.m += 4; p.e += 3; p.addFlag('secular_settled'); p.setMem('ft3_faith_settled', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── BEREAVED — first major holiday after loss ─────────────────────────────
  {
    id: 'ft3_bereaved_holiday',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bereaved') &&
      G.age >= 30 &&
      !G.mem?.ft3_bereaved_holiday,
    text: 'The first major holiday without them. Everyone agrees to keep it normal. The table is set the same way; the same dishes are made. In some families, the chair is left out. In others, it is quietly removed and the gap is treated as though it has always been the right number. Someone does the impression they used to do. Someone cries during it. Grief has a very specific shape during a meal with people who loved the same person you did.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.karma += 3; p.setMem('ft3_bereaved_holiday', true); },
  },

  // ── CHILD_CAME_OUT — parent 3+ years later ───────────────────────────────
  {
    id: 'ft3_child_out_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('child_came_out') &&
      G.age >= 45 &&
      !G.mem?.ft3_child_out_years,
    text: (G) => {
      const recent = G.flags.has('lgbtq_parent_rejection') || (G.children ?? []).some(c => (c.relationshipQuality ?? 50) < 35)
      if (recent) return 'Years have passed since your child came out to you. The distance between you has not closed the way you told yourself it would. The conversation you owe them has been postponed so many times it has become its own kind of statement.'
      return 'Years have passed since your child came out to you. What you thought would be a crisis became instead a chapter — one of many. Their life has not collapsed. If anything, the version of them you know now is more fully who they were always becoming. You think about the year you were afraid of this, and you find it harder to understand that person.'
    },
    choices: [
      {
        text: 'Tell them what it took you too long to say',
        tag: null,
        outcome: 'Something shifts. Not all the way back to before — forward, instead.',
        effect: (p) => { p.m += 10; p.karma += 8; p.updateChildRel(0, 12); p.setMem('ft3_child_out_years', true); },
        inject: null,
      },
      {
        text: 'Let it stay as it is',
        tag: null,
        outcome: 'The silence has a shape now. You have both learned to move around it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('ft3_child_out_years', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── INTEGRITY / PRINCIPLED — midlife career test ──────────────────────────
  {
    id: 'ft3_integrity_tested',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.has('integrity') || G.flags.has('principled')) &&
      G.career &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.ft3_integrity_tested,
    text: 'You are asked — politely, indirectly, in a way that could be misunderstood — to sign off on something that is not quite right. Not illegal. Not the kind of thing anyone will lose sleep over. It is the second time this year. The person asking is someone you work well with. The company needs the quarter to close a particular way. You have principles. You also have a mortgage.',
    choices: [
      {
        text: 'Decline — the same answer as always',
        tag: 'integrity',
        outcome: 'The colleague is gracious. The next quarter, they ask someone else. Your career does not collapse. It proceeds.',
        effect: (p) => { p.m -= 3; p.karma += 8; p.r -= 4; p.addFlag('integrity'); p.setMem('ft3_integrity_tested', true); },
        inject: null,
      },
      {
        text: 'This time, sign it — just this once',
        tag: null,
        outcome: 'You do. It closes. No one mentions it again. You mention it to yourself occasionally, at 3am, for the next three years.',
        effect: (p) => { p.m -= 6; p.r += 8; p.w += 4; p.setMem('ft3_integrity_tested', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FOUND_MEANING — late-life echo ────────────────────────────────────────
  {
    id: 'ft3_meaning_tested',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('found_meaning') &&
      G.age >= 68 &&
      !G.mem?.ft3_meaning_tested,
    text: 'The meaning you found — whenever it was, however it arrived — is now being tested by a body that is slower, by a world that has changed around you, by the specific diminishment that late life carries. You have a framework. The question is whether the framework holds when the circumstances that produced it are gone.',
    choices: [
      {
        text: 'It holds',
        tag: null,
        outcome: 'The meaning was never the circumstances. You understood that before. You understand it again now.',
        effect: (p) => { p.m += 8; p.r -= 6; p.setMem('ft3_meaning_tested', true); },
        inject: null,
      },
      {
        text: 'It needs rebuilding',
        tag: null,
        outcome: 'The rebuilding at seventy is slower than it was at forty. Not impossible. Slower.',
        effect: (p) => { p.m -= 3; p.e += 4; p.r += 3; p.setMem('ft3_meaning_tested', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── HAS_CLOSE_FRIEND — decade of friendship ───────────────────────────────
  {
    id: 'ft3_close_friend_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('has_close_friend') &&
      G.friends && G.friends.length > 0 &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.ft3_friend_decade,
    text: 'You have had this friendship for more than a decade now. The thing you notice is that you have stopped performing for them. You say the half-formed thought out loud, the embarrassing opinion, the fear that does not yet have a name. They do the same. It is not dramatic — most of what the friendship consists of is ordinary coordination: scheduling, logistics, checking in. But underneath that is the specific rarity of a person who has known you for long enough to have watched you change and still turns up.',
    choices: null,
    effect: (p) => { p.m += 8; p.updateFriendRel(0, 8); p.setMem('ft3_friend_decade', true); },
  },

]

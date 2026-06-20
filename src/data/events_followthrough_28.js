// events_followthrough_28.js — Addiction family arc follow-throughs + selected orphan callbacks
// Flags addressed:
//   addiction_family_carried: tried to say something to someone in the using
//   addiction_family_boundary: held the boundary — you cannot carry someone else's recovery
//   addiction_family_supported: Al-Anon or equivalent — the reframe about what you can control
//   addiction_family_isolated: held on alone rather than involving strangers
//   resisted_addiction: the person who watched someone spiral and chose the other path
//   cycle_broken: general flag for stopping a destructive pattern before it passed on

export const FOLLOWTHROUGH_28_EVENTS = [

  // ── ADDICTION FAMILY: CARRIED ─────────────────────────────────────────────────
  // You said something to the person who was where you used to be.
  // Years later: what happened, what it costs either way.

  {
    id: 'ft28_addiction_carried_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_carried') &&
      G.age >= 55 &&
      !G.mem?.ft28AddCarriedLate,
    text: (G) => {
      const sobriety = G.flags.has('sobriety')
      if (sobriety) {
        return 'You know what it looked like from the inside. When you said something to the person who was in it, you were saying it from that knowledge — not from disapproval but from specific recognition. Whether it helped depends on factors outside your control. What you know is that you said the thing that was true when you could have stayed quiet. The outcome is its own business.'
      }
      return 'You said something to the person who was in the using — family, or close enough to be family. The conversation was the hardest kind: honest, risky, uncontrollable. Whether it helped is something you measure differently at different distances. The saying was the thing you could do. The rest was theirs.'
    },
    choices: null,
    effect: (p) => { p.karma += 4; p.r += 4; p.m += 3; p.setMem('ft28AddCarriedLate', true) },
  },

  // ── ADDICTION FAMILY: BOUNDARY ────────────────────────────────────────────────
  // You did not carry someone else's recovery. The cost of that choice.

  {
    id: 'ft28_addiction_boundary_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_boundary') &&
      G.age >= 55 &&
      !G.mem?.ft28AddBoundLate,
    text: 'You held the boundary. You knew you could not carry someone else\'s recovery — the specific knowledge of that is one of the things you have learned that cannot be transferred. The boundary was the right call. It was also a cost in the relationship that did not fully resolve in all cases. At this distance you hold both: the correctness of the position and the thing it cost.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m += 2; p.setMem('ft28AddBoundLate', true) },
  },

  // ── ADDICTION FAMILY: SUPPORTED ───────────────────────────────────────────────
  // The Al-Anon reframe distributed into the rest of your life.

  {
    id: 'ft28_addiction_supported_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_supported') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.ft28AddSuppEcho,
    text: 'The support group was not about fixing the person you loved — it was about managing the life that surrounds the not-being-fixed. That reframe did not stay inside the original context. You find it distributing into the rest of your life: the things you can and cannot control, the people you can and cannot manage, the specific quality of attention you now bring to situations where the outcome is not yours to determine.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 5; p.s += 2; p.setMem('ft28AddSuppEcho', true) },
  },

  // ── ADDICTION FAMILY: ISOLATED ────────────────────────────────────────────────
  // Held on alone. The accumulated cost.

  {
    id: 'ft28_addiction_isolated_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('addiction_family_isolated') &&
      G.age >= 55 &&
      !G.mem?.ft28AddIsoLate,
    text: 'You held on alone — not ready to involve strangers in what felt like a private catastrophe. The holding had a cost that accumulated over years in ways you only fully see now. The specific exhaustion of being the only person who knows. The ways it contracted what you could bring to other relationships. There are resources that exist for this situation that you did not use. This is not self-blame. It is accurate accounting.',
    choices: [
      {
        text: 'It was the only way you knew how.',
        tag: 'accept',
        outcome: 'You did what you knew how to do. The cost was what it was.',
        effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.setMem('ft28AddIsoLate', true) },
      },
      {
        text: 'You wish someone had told you that asking for help was possible.',
        tag: 'grieve',
        outcome: 'The younger version of yourself deserved better options. You cannot give them retroactively. You can give them to someone else.',
        effect: (p) => { p.karma += 6; p.r += 5; p.m -= 2; p.setMem('ft28AddIsoLate', true) },
      },
    ],
    effect: null,
  },

  // ── RESISTED ADDICTION ────────────────────────────────────────────────────────
  // You watched someone spiral and chose the other path.
  // The late-life accounting of a road not taken.

  {
    id: 'ft28_resisted_addiction_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('resisted_addiction') &&
      G.age >= 55 &&
      !G.mem?.ft28ResistAddLate,
    text: 'You know what you chose against. The person who took the other path is still a reference point, dimming over decades but not gone — the specific trajectory you watched and declined. The declining was not virtue exactly; it was a particular combination of temperament, timing, and luck that you have never been able to fully separate into its components. At this distance you count it.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.karma += 3; p.setMem('ft28ResistAddLate', true) },
  },

  // ── CYCLE BROKEN ─────────────────────────────────────────────────────────────
  // General flag: stopped a destructive pattern before it passed on.
  // Could be violence, addiction, abandonment, financial recklessness.

  {
    id: 'ft28_cycle_broken_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('cycle_broken') &&
      G.age >= 58 &&
      !G.mem?.ft28CycleBrokenLate,
    text: 'What was done to you or around you — you did not pass it on. The choice was not always visible as a choice at the time; it was often a reflex trained by knowing what the alternative looked like. But you know now what stopped here. Your children, or the people after you, are carrying something different from what you were carrying at their age. This is not a small thing.',
    choices: null,
    effect: (p) => { p.karma += 10; p.m += 6; p.r += 3; p.setMem('ft28CycleBrokenLate', true) },
  },

]

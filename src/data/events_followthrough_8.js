// events_followthrough_8.js
// Named callbacks — events that explicitly reference past choices by name —
// and desire/growth tension events that frame a fork around the character's wound.

export const FOLLOWTHROUGH_8_EVENTS = [

  // ── NAMED CALLBACKS: PAST CHOICES SURFACED ───────────────────────────────

  {
    id: 'ft8_crossed_line_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lab_crossed_line') &&
      G.age >= 35 &&
      !G.mem?.ft8CrossedLineMidlife,
    text: 'You see something in the news about a strike — different industry, different city. It brings back the morning you crossed the line. Not as a memory you have to retrieve but as something that surfaces on its own. The silence from the people standing in the cold as you walked past them. You told yourself at the time that you couldn\'t afford it. This was true. You are not certain it was the whole reason.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.karma += 2
      p.setMem('ft8CrossedLineMidlife', true)
    },
  },

  {
    id: 'ft8_solidarity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('solidarity_proven') &&
      G.age >= 60 &&
      !G.mem?.ft8SolidarityLate,
    text: 'You mention to someone younger that you were on strike once — eleven weeks, as it turned out. They look at you the way people look at old photographs. You try to explain what the morning felt like, standing in the cold while the building went on without you. What you were defending, which was not just the wage. They nod. You don\'t push harder than that.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 3
      p.setMem('ft8SolidarityLate', true)
    },
  },

  {
    id: 'ft8_knows_failure_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('knows_failure') &&
      G.age >= 35 &&
      !G.mem?.ft8KnowsFailureEcho,
    text: 'You think about the first real failure — the one that was your fault and mattered. Not because you are dwelling on it but because something in the present rhymes with something from that time. You learned things from it that you couldn\'t have learned any other way. You are not grateful for it, exactly. But you understand it differently from this distance.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 3
      p.r -= 2
      p.setMem('ft8KnowsFailureEcho', true)
    },
  },

  {
    id: 'ft8_childhood_object_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('childhood_object') &&
      G.age >= 40 &&
      !G.mem?.ft8ChildhoodObjectMidlife,
    text: 'You find the thing — or something like it. The object from when you were small that was yours in the particular way early possessions are yours before you understand ownership. You are not sure why you still have it. You are not sure why you are standing here holding it.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.setMem('ft8ChildhoodObjectMidlife', true)
    },
  },

  {
    id: 'ft8_compromised_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('compromised') &&
      G.age >= 60 &&
      !G.mem?.ft8CompromisedLate,
    text: 'You did the thing. At the time it seemed like the only available move — the choices were uneven, the circumstances were real, and you made the calculation most people in that position would have made. You have repeated this accounting to yourself enough times to know all the parts of it. The part that stays is not the accounting. It is the moment before the calculation, when you knew what the right thing was.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 4
      p.karma -= 2
      p.setMem('ft8CompromisedLate', true)
    },
  },

  {
    id: 'ft8_art_drawer_choice',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('art_in_drawer') &&
      G.age >= 40 && G.age <= 58 &&
      !G.mem?.ft8ArtDrawerChoice,
    text: 'The work exists. It always existed. You have kept it in the drawer, the folder, the box at the back of the wardrobe. It is finished — has been finished for years. You are holding it now, deciding again.',
    choices: [
      {
        text: 'Show it to someone',
        tag: 'art_shown_late',
        outcome: 'You show it. The response is not what you imagined — it is more specific than that, and smaller, and yours.',
        effect: (p) => { p.m += 10; p.karma += 5; p.r -= 5; p.setMem('ft8ArtDrawerChoice', true) },
      },
      {
        text: 'Put it back',
        tag: null,
        outcome: 'You put it back. It will still be there. That is both the comfort and the problem.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('ft8ArtDrawerChoice', true) },
      },
    ],
    effect: null,
  },

  // ── DESIRE / GROWTH TENSION EVENTS ───────────────────────────────────────
  // Each event places the character's wound in a specific situation
  // and offers a fork: act from the wound, or act against it.

  {
    id: 'ft8_desire_prove_worth',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.age >= 34 && G.age <= 52 &&
      !G.mem?.ft8DesireProveWorth,
    text: 'A junior colleague is struggling with a presentation — work you both contributed to, though most of the ideas were yours. They ask if they can present it. If they do, your name is not on the success. If you say no, they\'ll understand what that means.',
    choices: [
      {
        text: 'Let them present it',
        tag: 'generosity_practised',
        outcome: 'They present it well. The room applauds. You clap. Nobody names what this cost you, because nobody knows.',
        effect: (p) => { p.m -= 2; p.karma += 6; p.r -= 2; p.setMem('ft8DesireProveWorth', true) },
      },
      {
        text: 'You should be the one presenting it',
        tag: null,
        outcome: 'You present it. The work lands well. The approval is exactly what you expected and lasts about as long.',
        effect: (p) => { p.m += 5; p.r += 4; p.setMem('ft8DesireProveWorth', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_be_seen',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 35 && G.age <= 52 &&
      !G.mem?.ft8DesireBeSeen,
    text: 'Someone else receives recognition for something you were part of. Not maliciously — it went that way. You could correct the record. You could also do the next thing.',
    choices: [
      {
        text: 'Make sure your contribution is on the record',
        tag: null,
        outcome: 'You say something. The record is corrected. You feel slightly better and slightly worse simultaneously.',
        effect: (p) => { p.m += 3; p.r += 3; p.setMem('ft8DesireBeSeen', true) },
      },
      {
        text: 'Let it go and do the next thing',
        tag: 'recognition_waived',
        outcome: 'You move on. The work continues. There is something clean about this that you did not expect.',
        effect: (p) => { p.m += 2; p.karma += 5; p.r -= 2; p.setMem('ft8DesireBeSeen', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_belong',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 30 && G.age <= 48 &&
      !G.mem?.ft8DesireBelong,
    text: 'The group you are part of — work, neighbourhood, community — has a clear consensus about something. You think they are wrong. The moment passes when you could say so without cost. Then it passes again.',
    choices: [
      {
        text: 'Say what you actually think',
        tag: 'spoke_against',
        outcome: 'You say it. The room adjusts. You are not excluded, but you feel the edge of the thing you risked.',
        effect: (p) => { p.m -= 3; p.karma += 5; p.e += 3; p.setMem('ft8DesireBelong', true) },
      },
      {
        text: 'Let it go — it\'s not worth the cost',
        tag: null,
        outcome: 'You don\'t say it. The consensus holds. You are still in the room. Something small is lost.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('ft8DesireBelong', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_connection',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.ft8DesireConnection,
    text: 'Someone close to you tries to go deeper — to say something true, to ask something real. You feel the familiar pull to redirect, to keep things where they are safe. You have kept things where they are safe for a long time.',
    choices: [
      {
        text: 'Let them in this time',
        tag: 'vulnerability_tried',
        outcome: 'It goes better than you expected. Not perfect. But better. You remember why you wanted this.',
        effect: (p) => { p.m += 8; p.karma += 4; p.r -= 4; p.setMem('ft8DesireConnection', true) },
      },
      {
        text: 'Change the subject',
        tag: null,
        outcome: 'The moment passes. The conversation becomes safe again. You can feel the distance from inside it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('ft8DesireConnection', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_safety',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 22 && G.age <= 32 &&
      !G.mem?.ft8DesireSafety,
    text: 'There is an opportunity — a move, a beginning, a risk worth taking — that is better than what you have and carries real uncertainty. The case for staying where you are is not exciting, but it is solid. You are good at building the argument for staying.',
    choices: [
      {
        text: 'Take the opportunity',
        tag: 'safety_risked',
        outcome: 'You go. The uncertainty is real, as promised. So is what you find inside it.',
        effect: (p) => { p.m += 8; p.e += 5; p.r -= 3; p.setMem('ft8DesireSafety', true) },
      },
      {
        text: 'Stay where you are',
        tag: null,
        outcome: 'You stay. The stability is real. The question of what the other path held stays with you quietly.',
        effect: (p) => { p.m += 3; p.r += 5; p.setMem('ft8DesireSafety', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft8_desire_freedom',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'freedom' &&
      G.partner &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.ft8DesireFreedom,
    text: (G) => {
      const pn = G.partner?.name ?? 'Your partner'
      return `${pn} wants to make a decision together — where to live, how to spend the next few years, what to build. There is a version that requires you to commit to something that limits your options. You are aware you have been here before and found a way not to decide.`
    },
    choices: [
      {
        text: 'Commit to the shared path',
        tag: 'committed_to_shared',
        outcome: 'You say yes. The options narrow, as promised. Something else opens that you didn\'t expect.',
        effect: (p) => { p.m += 6; p.karma += 3; p.r -= 3; p.updatePartnerRel(8); p.setMem('ft8DesireFreedom', true) },
      },
      {
        text: 'Keep the door open — not yet',
        tag: null,
        outcome: 'You hedge. You are good at hedging. Your partner hears what you didn\'t say.',
        effect: (p) => { p.m -= 3; p.r += 5; p.updatePartnerRel(-6); p.setMem('ft8DesireFreedom', true) },
      },
    ],
    effect: null,
  },

]

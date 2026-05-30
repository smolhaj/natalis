// events_gang.js
// Gang / organised crime parallel career arc — 10 events.
// Three archetype-specific entry points, then shared progression events.
// Post-Soviet organiszed crime 1990s (bratva/krysha texture),
// Lagos area boys (Area Boys), cartel-adjacent Colombia.
// Arc: entry → first loyalty test → inside economics → violence witnessed →
//      the moment you could leave → rising → cost accumulates → exit or endgame.

// ── helpers ──────────────────────────────────────────────────────────────────

function isGangMember(G) {
  return G.flags.has('gang_member') || (G.gang != null)
}

export const GANG_EVENTS = [

  // ── ENTRY EVENTS (archetype-specific) ────────────────────────────────────

  {
    id: 'gang_entry_post_soviet',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character?.country?.archetype === 'post_soviet' &&
      G.age >= 17 && G.age <= 26 &&
      (G.currentYear ?? 0) >= 1991 && (G.currentYear ?? 0) <= 2005 &&
      !G.career &&
      !isGangMember(G) &&
      !G.mem?.gangEntryDone,
    text: (G) => {
      const yr = G.currentYear ?? 1995
      const country = G.character?.country?.name ?? ''
      if (yr <= 1995) {
        return `The older boys from the block have money now — tracksuits, phones, a BMW that never parks in the same place twice. What they do is not precisely named. In 1992, when the factory closed and your father stopped being what he was, the older boys from the block became the only institution on this street that still paid. They notice you the way they notice anyone who is young, quick, and has nowhere better to be.`
      }
      return `The *bratva* — brotherhood — is how the connection is described, never "gang." The man who drives you to the warehouse is thirty-two and has an apartment and a daughter in a private school. The warehouse holds things that are not asked about. You unload a truck and are paid in cash. The money is more than your mother makes in a month. This is the beginning.`
    },
    choices: [
      {
        text: 'Take the work — the money is real and so is the rent',
        tag: null,
        outcome: 'The first payment lands in your hand and you understand that a decision has been made. Not yet irrevocably. But made.',
        effect: (p) => { p.mo += 800; p.m -= 3; p.addFlag('gang_member'); p.addFlag('organized_crime_entry'); p.setMem('gangEntryDone', true) },
      },
      {
        text: 'Find another way — you have seen how this ends',
        tag: null,
        outcome: 'You have seen how it ends because you have watched it end for someone on this block. The alternative is harder. It is also available.',
        effect: (p) => { p.m -= 5; p.e += 5; p.r += 4; p.setMem('gangEntryDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_entry_lagos',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.character?.country?.name === 'Nigeria' ||
       G.currentCountry?.name === 'Nigeria') &&
      G.age >= 16 && G.age <= 25 &&
      (G.currentYear ?? 0) >= 1985 &&
      !G.career &&
      !isGangMember(G) &&
      !G.mem?.gangEntryDone,
    text: () =>
      `The Area Boys control three blocks. They are not the police and they are not nothing. They collect from the traders, they stop certain things from happening that would otherwise happen, and they provide a kind of order that costs. You have been approached twice. The third time it is not phrased as a question. The money on offer is enough. The alternative, as stated, is also clear.`,
    choices: [
      {
        text: 'Join — the terms are understood',
        tag: null,
        outcome: 'You become one of them. The territory becomes familiar. The hierarchy becomes yours to learn.',
        effect: (p) => { p.mo += 600; p.m -= 4; p.addFlag('gang_member'); p.addFlag('organized_crime_entry'); p.setMem('gangEntryDone', true) },
      },
      {
        text: 'Refuse and leave this block entirely',
        tag: null,
        outcome: 'You move. The new place costs more and offers less, but it is yours.',
        effect: (p) => { p.mo -= 300; p.m -= 3; p.e += 4; p.setMem('gangEntryDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_entry_colombia',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character?.country?.name === 'Colombia' &&
      G.age >= 15 && G.age <= 24 &&
      (G.currentYear ?? 0) >= 1980 && (G.currentYear ?? 0) <= 2010 &&
      !G.career &&
      !isGangMember(G) &&
      !G.mem?.gangEntryDone,
    text: (G) => {
      const yr = G.currentYear ?? 1995
      if (yr <= 1993) {
        return `In Medellín a young man who wants work and has no work has specific options. The cartel does not recruit with promises — it recruits with proximity. Someone you grew up with is already working for someone. The path is not dramatic; it is practical. A message delivered. A corner watched. The money is reliable in a way that legal work in Medellín is not, in 1988, for someone who is seventeen and from this neighbourhood.`
      }
      return `The paramilitaries have expanded since the cartels fragmented. The FARC controls the rural roads; the *bacrim* control the neighbourhood. You are approached through a cousin — always through someone — with work that is described in terms that are almost ordinary: security, distribution, local management. The word "cartel" is not used. The structure it describes is not different.`
    },
    choices: [
      {
        text: 'Accept — the structure at least offers clarity',
        tag: null,
        outcome: 'The clarity is real. The cost of it becomes clear over the following years.',
        effect: (p) => { p.mo += 700; p.m -= 5; p.addFlag('gang_member'); p.addFlag('cartel_adjacent'); p.addFlag('organized_crime_entry'); p.setMem('gangEntryDone', true) },
      },
      {
        text: 'Refuse — and accept the risk that comes with refusal',
        tag: null,
        outcome: 'You refuse once. You may need to refuse more than once. In Medellín in this decade, refusal is its own act of courage.',
        effect: (p) => { p.m -= 8; p.karma += 10; p.r += 6; p.setMem('gangEntryDone', true) },
      },
    ],
    effect: null,
  },

  // ── SHARED PROGRESSION EVENTS ─────────────────────────────────────────────

  {
    id: 'gang_loyalty_test',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isGangMember(G) &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.gangLoyaltyDone,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? ''
      if (arch === 'post_soviet') {
        return `The man who runs the *krysha* — the roof, the protection operation — asks you to do something specific. It is not violent. It is a test: deliver a package, observe a meeting, say nothing about what you have seen. What makes it a test is not the action but the fact that you are being watched to see how you handle it. You understand this. Everyone understands this.`
      }
      if (G.flags.has('cartel_adjacent')) {
        return `The first loyalty test is not what you expected. It is not violent — it is documentary. You are asked to hold a phone, to remember a number, to give a name if a certain person asks you a certain question. The test is whether you can stay inside the logic of a system that operates on trust enforced by consequence.`
      }
      return `They ask you to do something that tests the boundary between what you are willing to do and what you are not. The test is the information, not the act. What you are willing to do is now on record in the way that unspoken agreements are recorded — in what happens next.`
    },
    choices: [
      {
        text: 'Pass the test — you are in this',
        tag: null,
        outcome: 'You pass. The fact of having passed is now part of what you are to them.',
        effect: (p) => { p.s += 4; p.karma -= 8; p.addFlag('gang_trusted'); p.setMem('gangLoyaltyDone', true) },
      },
      {
        text: 'Perform just enough to stay safe, but no more',
        tag: null,
        outcome: 'You do the minimum. They note the minimum. You remain in the outer ring — safer, but also with a ceiling.',
        effect: (p) => { p.m -= 5; p.e += 3; p.r += 5; p.setMem('gangLoyaltyDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_economics_inside',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isGangMember(G) &&
      G.age >= 20 && G.age <= 32 &&
      G.mem?.gangLoyaltyDone &&
      !G.mem?.gangEconomicsDone,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? ''
      if (arch === 'post_soviet') {
        return `The money moves in ways that are not difficult to understand once you are inside them. The protection payments come in; the tax to the people above you goes out; what remains is distributed by a logic that is feudal and precise. You are above the street level now. You manage two people who manage others. The income is better than anything legal in this city offers. The cost is in what you know.`
      }
      return `The income is real and its source is not hidden from you. The economics of the operation become legible: the distribution margin, the street price, the hierarchy's cut, the cost of maintaining peace with the adjacent territory. You understand a business that is run with considerable efficiency by people who never went to business school. The knowledge is not separable from the cost of having it.`
    },
    choices: [
      {
        text: 'Learn the system — knowledge is position',
        tag: null,
        outcome: 'You become useful in ways that move you further from the exit.',
        effect: (p) => { p.e += 6; p.mo += 2000; p.m -= 5; p.karma -= 6; p.addFlag('gang_senior'); p.setMem('gangEconomicsDone', true) },
      },
      {
        text: 'Stay operational — do not accumulate knowledge you cannot unhear',
        tag: null,
        outcome: 'The choice to stay useful but peripheral is a choice that exists. You make it. It limits your income and your exposure equally.',
        effect: (p) => { p.mo += 800; p.m -= 2; p.setMem('gangEconomicsDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_violence_witnessed',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isGangMember(G) &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.gangViolenceDone,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? ''
      if (arch === 'post_soviet') {
        return `There is a meeting at a warehouse in the industrial district. You are there as a driver. What happens in the warehouse is not your business. You drive home afterward and go to sleep and wake up and the morning is the same as it was. This is the most frightening thing: the morning is the same.`
      }
      if (G.flags.has('cartel_adjacent')) {
        return `The man who collected on your block last year is not collecting anymore. You know what happened in the way you know things here — through what is not said, through the car that was there and is not there, through the specific change in who nods at you when you pass. The violence does not announce itself. It simply adjusts the population.`
      }
      return `Someone is beaten badly enough that they are hospitalised. It is a message to someone else. You understand the message. You also understand that you are close enough to the operation that distinguishing between message-sender and message-receiver is not guaranteed.`
    },
    choices: [
      {
        text: 'Accept it — this is the arithmetic you agreed to',
        tag: null,
        outcome: 'You accept it. The acceptance is the most consequential thing you have done, because it removes a limit you were holding.',
        effect: (p) => { p.m -= 12; p.h -= 3; p.karma -= 10; p.addFlag('witnessed_gang_violence'); p.setMem('gangViolenceDone', true) },
      },
      {
        text: 'Start looking for the exit — this is not what you signed up for',
        tag: null,
        outcome: 'You start looking. The exit is not where the entrance was, and it is not free.',
        effect: (p) => { p.m -= 8; p.r += 10; p.addFlag('seeking_gang_exit'); p.setMem('gangViolenceDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_exit_window',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      (isGangMember(G) || G.flags.has('gang_senior')) &&
      G.age >= 28 && G.age <= 40 &&
      !G.mem?.gangExitDone,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? ''
      if (arch === 'post_soviet') {
        return `Someone you know has left and is alive. This is notable enough that people talk about it. The mechanism was: enough money to matter, a geographic distance, a silence maintained absolutely. The window exists. Whether it remains open long enough for you to move through it is the question you have spent two years asking yourself.`
      }
      if (G.flags.has('cartel_adjacent')) {
        return `The *salida* — the exit — is not theoretical. Three men from this operation have taken it in the last five years. One is in the United States. One is running a restaurant in Cartagena. One is not talked about. The exit has a price and the price is fixed and you have roughly this amount. The logic is clear. The fear is also clear.`
      }
      return `An opportunity presents itself that was not available before: a legal business, a distant city, a relative who will not ask questions about the source of the investment. The exit is expensive and requires a cleanness you do not entirely have. But it exists.`
    },
    choices: [
      {
        text: 'Take the exit — leave while you can',
        tag: null,
        outcome: 'You go. The going is not clean and the arriving is not easy. You are out.',
        effect: (p) => { p.mo -= 5000; p.m += 10; p.r += 15; p.karma += 12; p.addFlag('left_gang'); p.setMem('gangExitDone', true) },
      },
      {
        text: 'Stay — the exit is not safe enough yet',
        tag: null,
        outcome: 'You decide the conditions are not right. You will wait for better conditions. The conditions do not improve.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('gangExitDone', true) },
      },
      {
        text: 'Go further in — the only real protection is position',
        tag: null,
        outcome: 'You make a different calculation: that the exit is more dangerous than the centre. This may be correct. It is also what everyone who made this choice believed.',
        effect: (p) => { p.mo += 4000; p.m -= 10; p.karma -= 12; p.addFlag('gang_leadership'); p.setMem('gangExitDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_cost_accumulates',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      (isGangMember(G) || G.flags.has('gang_senior') || G.flags.has('gang_leadership')) &&
      G.age >= 30 && G.age <= 48 &&
      !G.flags.has('left_gang') &&
      !G.mem?.gangCostDone,
    text: (G) => {
      const isLeader = G.flags.has('gang_leadership')
      const arch = G.character?.country?.archetype ?? ''
      if (isLeader) {
        return `You run a portion of the operation now. The money is substantial. So is what it requires. You think about it in terms of what has not happened yet: the arrest, the rival, the person who decides you know too much. The gap between "not yet" and "eventually" is a thing you live inside.`
      }
      if (arch === 'post_soviet') {
        return `Your younger brother asks you what you do for work. You give him the answer you have given everyone for five years — logistics, import, nothing interesting. He is eighteen and smart and you do not want him asking more specific questions. The cost of what you do is most visible in the people you protect from it.`
      }
      return `The money is real. So is the list of what it has cost: the relationship that couldn't be explained, the friend from before who doesn't call anymore, the neighbourhood you had to leave, the version of yourself you are no longer certain exists.`
    },
    effect: (p) => { p.m -= 10; p.r += 12; p.h -= 4; p.setMem('gangCostDone', true) },
    choices: null,
  },

  {
    id: 'gang_arrest_risk',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (isGangMember(G) || G.flags.has('gang_senior') || G.flags.has('gang_leadership')) &&
      G.age >= 28 && G.age <= 50 &&
      !G.flags.has('left_gang') &&
      !G.mem?.gangArrestDone,
    text: (G) => {
      const regime = G.regime ?? ''
      if (regime === 'democracy' || regime === 'parliamentary_republic' || regime === 'federal_republic') {
        return `The police have been watching the operation for months. You know because two people were arrested who were careful. If they were arrested being careful, the net is wider than you thought. The investigation has a specific quality that feels different from the usual periodic enforcement: there is a prosecutor behind it, not just a precinct.`
      }
      return `The police arrive at a location you were at two days before. The timing means something — either a decision not to catch you yet, or information that is one step behind. Either way, you move carefully for the next six months. The calculus of when to be where is recalculated.`
    },
    choices: [
      {
        text: 'Go quiet — reduce visibility until it passes',
        tag: null,
        outcome: 'The reduced income hurts. So does the waiting. It passes, mostly.',
        effect: (p) => { p.mo -= 2000; p.m -= 8; p.setMem('gangArrestDone', true) },
      },
      {
        text: 'Leave the country for a while — the investigation needs distance',
        tag: null,
        outcome: 'You leave. The distance works until it doesn\'t. You return to a changed situation.',
        effect: (p) => { p.mo -= 4000; p.m -= 5; p.r += 8; p.addFlag('emigrated_under_pressure'); p.setMem('gangArrestDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gang_after_left',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('left_gang') &&
      G.age >= 32 && G.age <= 55 &&
      !G.mem?.gangAfterDone,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? ''
      const yr = G.currentYear ?? 2000
      if (arch === 'post_soviet') {
        return `The business you run is legal in a way that can be verified. This is the thing you worked toward. The people from before do not come to the business. The arrangement held. Some months you cannot locate the person you were before any of this, and that is something to be glad of, and also something to grieve, and you are not always sure which is which.`
      }
      return `You are out. The out is not clean — the money that built the legal business has a history — but it is real. You have a specific number of people who know what your history is and a specific arrangement with all of them that holds on the condition of continued silence. This is the shape of the rest of your life. You can live with it. Most days.`
    },
    effect: (p) => { p.m += 6; p.r += 10; p.e += 4; p.setMem('gangAfterDone', true) },
    choices: null,
  },

]

// events_artist_arc.js — Deep artist career arc
//
// The artist exists in careers.js with one event (censorship).
// The arts events (events_arts.js) cover arts-under-pressure: samizdat,
// jazz/bebop, Nollywood, censored work. This arc adds the interior
// of an artistic life: the first work that matters, the gap between
// what you make and what sells, the identity question when the money
// is gone, the late-life accounting of what the work was for.
//
// Regime and gdp branch the arc toward very different trajectories.

const isArtist = (G) => G.career?.id === 'artist' || G.flags.has('artist_career')

export const ARTIST_ARC_EVENTS = [

  {
    id: 'art_first_real_work',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isArtist(G) &&
      !G.mem?.artFirstWorkFired,
    text: `The first work that is actually yours — not the work that was assigned or the work done in imitation of the people you admire, but the work that could only have come from you, at this time, from this particular position. You know it is yours because you cannot explain where it came from. The previous work you could always account for: influence A, technique B, the thing you were trying to solve. This one arrived differently. You are not sure you can reproduce the conditions of its arrival, which is its own kind of information.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 4
      p.addFlag('artist_first_real_work')
      p.setMem('artFirstWorkFired', true)
    },
  },

  {
    id: 'art_money_question',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isArtist(G) &&
      G.flags.has('artist_first_real_work') &&
      !G.mem?.artMoneyFired,
    text: `The question that every artist who needs to eat eventually arrives at: what is the relationship between the work you make and the money that comes from making it? You have been surviving on the peripheral income — the teaching, the commissions, the occasional sale — and the peripheral income is real and also not the same as making what you want to make. The gap between what you make and what sells is not always a gap, but often it is, and the question is which side of the gap you live on and what that choice costs in both directions.`,
    choices: [
      {
        text: 'Stay on the side of the work — find ways to survive on it',
        tag: null,
        outcome: `You find the marginal economy of the real work. It is precarious and real. Some years are better than others.`,
        effect: (p) => {
          p.w -= 8
          p.m += 8
          p.addFlag('artist_committed_to_work')
          p.setMem('artMoneyFired', true)
        },
      },
      {
        text: 'Move toward what sells — you can make the real work in the margins',
        tag: null,
        outcome: `The margins turn out to be smaller than the plan. The sellable work is good work, and it is not the work.`,
        effect: (p) => {
          p.w += 6
          p.m -= 6
          p.r += 5
          p.addFlag('artist_commercial_path')
          p.setMem('artMoneyFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'art_recognition',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isArtist(G) &&
      G.flags.has('artist_first_real_work') &&
      G.age >= 32 &&
      !G.mem?.artRecognitionFired,
    text: `Something you made is seen by someone who matters to you as an audience — not a prize, not a large public, but the specific person or persons whose understanding of what you do is sufficient that their response tells you something true about the work. The response is positive, and you hold onto it in the way that artists hold onto the occasions when the work is understood. These occasions are not as frequent as the work deserves. You know this is true of most artists. It does not stop the scarcity from being felt as personal.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.e += 3
      p.addFlag('artist_recognized')
      p.setMem('artRecognitionFired', true)
    },
  },

  {
    id: 'art_commercial_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('artist_commercial_path') &&
      G.age >= 50 &&
      !G.mem?.artCommercialEchoFired,
    text: `The sellable work has accumulated into something — a body of work that is professional, skilled, and not the thing you set out to make. You have thought about this over the years with varying levels of acceptance. On the better days the work you made in the margins was enough. On the worse days you do the arithmetic of what twenty years of different choices would have produced, which is not a useful arithmetic but which is available to you whenever you want to do it. You are still making things. Some of them are the real ones.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 6
      p.setMem('artCommercialEchoFired', true)
    },
  },

  {
    id: 'art_the_fallow',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isArtist(G) &&
      G.age >= 38 &&
      !G.mem?.artFallowFired,
    text: `There is a period where the work does not come. Not a blockage — the conditions for the work are present, the time is present, you are sitting where you usually sit — but the thing that makes work work is not present, or is present in a form you don't recognise yet. You have been through this before in shorter versions. This version is longer. You do not talk about it because talking about it uses the same resource that the work uses, and the resource is already low. You wait. This is also the work, you tell yourself. Some days you believe it.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 5
      p.addFlag('artist_fallow_period')
      p.setMem('artFallowFired', true)
    },
  },

  {
    id: 'art_after_fallow',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('artist_fallow_period') &&
      G.age >= 42 &&
      !G.mem?.artAfterFallowFired,
    text: `The work returns. Not identically — the work that returns after a long fallow is not the same as the work that stopped, which is in retrospect the point of the fallow, though you would not have chosen it. The new work is different in a way you cannot fully characterise. It came from somewhere that the interrupted version would not have reached. You do not look back at the fallow with gratitude exactly. You look back at it as a thing that happened that the work required and that you survived, and which produced this.`,
    choices: null,
    effect: (p) => {
      p.m += 14
      p.e += 4
      p.addFlag('artist_after_fallow')
      p.setMem('artAfterFallowFired', true)
    },
  },

  {
    id: 'art_the_body_of_work',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isArtist(G) &&
      G.age >= 55 &&
      !G.mem?.artBodyFired,
    text: `You have a body of work. This is what a life of making things produces: not a single thing but an accumulation, uneven, some of it the real stuff and some of it the other stuff and some of it from the fallow year that surprised you. It exists without you now in the sense that it can be looked at without explanation. You look at it sometimes from a distance — not with satisfaction exactly, which is not an emotion you have easy access to about your own work, but with something closer to recognition. That's what was being made. You can see it from here.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.e += 4
      p.addFlag('artist_body_of_work')
      p.setMem('artBodyFired', true)
    },
  },

  {
    id: 'art_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isArtist(G) &&
      G.age >= 62 &&
      !G.mem?.artLateFired,
    text: `The accounting: you made things. Some of them found the person they were for; some of them haven't yet, and some won't. The work that felt most real was not always the work that was most seen. The money question was always present and was never fully resolved. The fallow period produced the work that surprised you. The body of work exists in the world with the particular kind of autonomy that made things eventually achieve — it is no longer entirely yours, which is the point, which is what you were trying to do, even when you couldn't have said so. You made things that needed making. Some of them were the real ones.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 5
      p.karma += 6
      p.addFlag('artist_late_reckoning')
      p.setMem('artLateFired', true)
      p.legacy += 10
    },
  },

]

// events_laborer_arc.js — Deep laborer career arc
//
// The laborer arc is the most universal of working-class arcs: the body
// as the primary productive instrument, across seasons and worksites,
// in weather that does not ask permission. The arc tracks what this
// does over a life — the capability, the accumulation, the moment
// when the body begins to place limits on what you can ask of it.

const isLaborer = (G) => G.career?.id === 'laborer' || G.flags.has('laborer_career')

export const LABORER_ARC_EVENTS = [

  {
    id: 'lab_body_young',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isLaborer(G) &&
      !G.mem?.labBodyYoungFired,
    text: `You know what your body can do. This is a specific knowledge — not abstract, not self-improvement, but the practical inventory of what you can lift, carry, sustain, recover from. The worksite has a hierarchy based on this inventory, and you are high enough in it that the foreman gives you the jobs that require the good version. You are the good version. This is the version you will be for approximately the next fifteen years, though you do not know this yet.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.h += 4
      p.addFlag('laborer_body_young')
      p.setMem('labBodyYoungFired', true)
    },
  },

  {
    id: 'lab_the_season',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isLaborer(G) &&
      G.flags.has('laborer_body_young') &&
      !G.mem?.labSeasonFired,
    text: `There are months when the work is plentiful and months when it is not. The plentiful months you work as many hours as are available. In the thin months you work what you can find and sometimes do not work, and the money from the full months has to stretch. You have been doing this long enough to know the shape of the year. The shape of the year is precarious and familiar and the same shape as the year before, which does not make it less precarious, but does make it navigable.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.w -= 3
      p.addFlag('laborer_seasonal_work')
      p.setMem('labSeasonFired', true)
    },
  },

  {
    id: 'lab_the_weather',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isLaborer(G) &&
      G.age >= 28 &&
      !G.mem?.labWeatherFired,
    text: `You work in what is available, which is weather. Today it is cold enough that the metal tools need handling differently and the concrete needs timing differently and the morning is two hours of operations modified by cold. You have been doing this long enough that the modification is automatic. The summer version is different modifications — water, shade, pace. The body operates across both. The body has opinions about both, and you have learned which opinions to take seriously.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.h -= 2
      p.e += 3
      p.setMem('labWeatherFired', true)
    },
  },

  {
    id: 'lab_injury',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isLaborer(G) &&
      G.age >= 32 &&
      !G.mem?.labInjuryFired,
    text: `The back. It was building toward this — you recognised the specific quality of the warning it had been giving for three months — and then the thing it was warning about happened. The diagnosis is a herniated disc, which is the mechanical description of a thing you already understood intuitively as: the back has limits and you have found one of them. The question now is what comes next.`,
    choices: [
      {
        text: 'Rest properly and see a physiotherapist — the back is the career',
        tag: null,
        outcome: `Six weeks off. The physiotherapy is painful and informative. You return to work with a modified lifting protocol and a clearer sense of what the back will and will not do.`,
        effect: (p) => {
          p.h += 5
          p.w -= 5
          p.addFlag('laborer_injury_recovered')
          p.setMem('labInjuryFired', true)
        },
      },
      {
        text: 'Get back when you can — the time off costs more than you can afford',
        tag: null,
        outcome: `You return at three weeks. The back has an opinion about this that it expresses continuously for the next two months. The disc does not fully resolve. You develop a way of managing the thing that is not pain management exactly, more like negotiation.`,
        effect: (p) => {
          p.h -= 8
          p.w += 2
          p.addFlag('laborer_injury')
          p.setMem('labInjuryFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'lab_the_debt',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isLaborer(G) &&
      G.gdp !== 'very_high' && G.gdp !== 'high' &&
      G.age >= 30 &&
      !G.mem?.labDebtFired,
    text: `You have borrowed against next season's wages to cover this season's gap. The lender is local and the terms are the terms that exist when you need money before the season. You will work it off. You have worked it off before. The arithmetic of the situation is that you work to produce the wage that covers the debt that you needed to cover the gap between the last wages and this season's start. The arithmetic has been running for several years.`,
    choices: null,
    effect: (p) => {
      p.w -= 6
      p.m -= 5
      p.r += 5
      p.addFlag('laborer_debt_cycle')
      p.setMem('labDebtFired', true)
    },
  },

  {
    id: 'lab_aging_out',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isLaborer(G) &&
      G.age >= 45 &&
      !G.mem?.labAgingFired,
    text: `The foreman gives you the easier jobs now. Not out of respect — out of the same calculation he makes about every worker, which is: what can this body do today. Your body today can do more than some bodies that are younger, because you have maintained it carefully and because the specific damage has been manageable. But you are in the category now. You can feel it in which jobs you get offered. You have opinions about this that you keep to yourself, because the foreman also decides whether you get offered anything at all.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.addFlag('laborer_aging_out')
      p.setMem('labAgingFired', true)
    },
  },

  {
    id: 'lab_injury_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('laborer_injury') &&
      G.age >= 55 &&
      !G.mem?.labInjuryEchoFired,
    text: `The back has been the background condition of the second half of the career. Not incapacitating — you have worked through it, around it, modified for it — but present. The negotiation has become so familiar that you do it automatically. The disc does what it does and you adjust. You have told almost no one about it. It is not something you discuss. It is something you manage, the way you manage the weather and the season and the gap years.`,
    choices: null,
    effect: (p) => {
      p.h -= 5
      p.m -= 3
      p.r += 3
      p.setMem('labInjuryEchoFired', true)
    },
  },

  {
    id: 'lab_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isLaborer(G) &&
      G.age >= 60 &&
      !G.mem?.labLateFired,
    text: `The work was the body and the body is the record. The record includes the good years — the years when the inventory of what you could do was at its full list — and the years when the list was being shortened by what had accumulated. There is no pension that matches what the body paid over forty years of seasons. There is the knowledge of the work: the specific competence of the person who can look at a site and know what it needs, who can read the weather and know what that means for the day's plan. You have that. Some days it is enough. The other days you do not spend counting what you are owed, because that arithmetic runs forever.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 5
      p.karma += 6
      p.addFlag('laborer_late_reckoning')
      p.setMem('labLateFired', true)
      p.legacy += 6
    },
  },

]

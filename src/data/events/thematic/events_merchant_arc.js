// events_merchant_arc.js — Deep merchant career arc
//
// The merchant exists in every archetype and GDP tier — the global
// career. The arc tracks what trade does over a life: the feel of a
// market, the family business question, the protection that has to be
// negotiated, the bad year that changes everything, and the late
// reckoning of a life spent moving goods between people who need them.

const isMerchant = (G) => G.career?.id === 'merchant' || G.flags.has('merchant_career')

export const MERCHANT_ARC_EVENTS = [

  {
    id: 'mer_the_market',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isMerchant(G) &&
      !G.mem?.merMarketFired,
    text: `You know the market the way it takes years to know: not the prices — anyone can read those — but the rhythm under the prices. Which day the suppliers are hungry. Which buyer is overextended. Where the information is before it becomes price. This knowledge is not in any ledger; it accumulates in the specific way that market knowledge accumulates, through attention and error and the long slow process of learning how a particular trade breathes.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 4
      p.addFlag('merchant_market_knowledge')
      p.setMem('merMarketFired', true)
    },
  },

  {
    id: 'mer_the_family',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isMerchant(G) &&
      G.flags.has('merchant_market_knowledge') &&
      !G.mem?.merFamilyFired,
    text: `The business your family has been in for a generation raises the question every family business eventually raises: is this yours, or is this something you are continuing? You have the knowledge. You have been doing it long enough that the knowledge is real. The question of whether you chose it or inherited it is one you have not finished answering. The market does not wait for the answer.`,
    choices: [
      {
        text: 'Claim it — this is your trade, your market, your continuation',
        tag: null,
        outcome: `You stop asking the question. The business is yours in the sense that it generates the life you are living. The market does not distinguish between claimed and inherited, which turns out to be clarifying.`,
        effect: (p) => {
          p.m += 6
          p.addFlag('merchant_claimed_business')
          p.setMem('merFamilyFired', true)
        },
      },
      {
        text: 'Keep the question open — you are here for now but this is not the whole answer',
        tag: null,
        outcome: `The question stays open. You are a good merchant regardless. The market knows this. The question does not affect the trade, except in the years when the trade is hard.`,
        effect: (p) => {
          p.m -= 3
          p.r += 4
          p.addFlag('merchant_uncertain_inheritance')
          p.setMem('merFamilyFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mer_good_year',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isMerchant(G) &&
      G.age >= 30 &&
      !G.mem?.merGoodYearFired,
    text: `The good year. The conditions aligned in the way that conditions occasionally align: the supply came in at the right time, the price moved the right way, the buyer you had been cultivating came through, and the money this produced was significantly more than the year before. You know from experience that the good year is not the norm but also not luck exactly — it is the intersection of preparation and the conditions becoming available. You reinvest most of it. The good year requires this.`,
    choices: null,
    effect: (p) => {
      p.w += 10
      p.m += 8
      p.addFlag('merchant_good_year')
      p.setMem('merGoodYearFired', true)
    },
  },

  {
    id: 'mer_bad_year',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isMerchant(G) &&
      G.age >= 34 &&
      !G.mem?.merBadYearFired,
    text: `The year the market moved the wrong way. Not catastrophically — you are still operating — but significantly enough that the reserve you had built is substantially reduced. The cause is some combination of factors you could not have controlled and decisions you made that, in retrospect, you would not make again. Both of these things are true, and you have to sit with the ratio, and the ratio is not the same for every decision. The market will move again. You need it to move before the reserve is gone.`,
    choices: null,
    effect: (p) => {
      p.w -= 8
      p.m -= 8
      p.addFlag('merchant_bad_year')
      p.setMem('merBadYearFired', true)
    },
  },

  {
    id: 'mer_market_shift',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isMerchant(G) &&
      G.age >= 38 &&
      !G.mem?.merShiftFired,
    text: `The market has moved in a structural way — not the seasonal movement you can navigate, but the underlying change in how this trade works. A new channel, a new supplier that has scale you don't, a platform that has disintermediated something you depended on. The knowledge you have built is still real. The question is whether the market that knowledge applies to is still the same market.`,
    choices: [
      {
        text: 'Adapt — find your position in the new structure',
        tag: null,
        outcome: `The adaptation takes two years and is partially successful. The new position is smaller than the old one. It is also more stable than you expected, once you found where you fit.`,
        effect: (p) => {
          p.w -= 4
          p.m -= 3
          p.e += 5
          p.addFlag('merchant_adapted')
          p.setMem('merShiftFired', true)
        },
      },
      {
        text: 'Hold — the structural shift will correct, or you will find the customers who prefer the original',
        tag: null,
        outcome: `Some customers prefer the original. They are enough, and then they are barely enough. The market continues to shift. You are now serving the edge of it, which is a position.`,
        effect: (p) => {
          p.w -= 7
          p.m += 3
          p.addFlag('merchant_held_position')
          p.setMem('merShiftFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mer_succession_question',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isMerchant(G) &&
      G.age >= 52 &&
      !G.mem?.merSuccessionFired,
    text: `Who takes this over. This is the question that every merchant who has built something eventually faces. If there are children, the question is whether they want it and whether they have the specific knowledge that cannot be taught in advance of the work. If there are not children or the children are elsewhere, the question is different: do you sell it, find a successor, or close it. The market knowledge you have built does not transfer automatically.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 6
      p.addFlag('merchant_succession_question')
      p.setMem('merSuccessionFired', true)
    },
  },

  {
    id: 'mer_bad_year_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('merchant_bad_year') &&
      G.age >= 55 &&
      !G.mem?.merBadYearEchoFired,
    text: `The bad year is now information. At the time it was threatening and clarifying in equal measure. From here it is part of the record of what the business survived, which is a longer record than you might have expected when you were inside the threatening part. The decisions you would not make again: you know which ones. The factors you couldn't control: you have stopped doing the arithmetic on those. The reserve was rebuilt. That happened.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r -= 3
      p.setMem('merBadYearEchoFired', true)
    },
  },

  {
    id: 'mer_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isMerchant(G) &&
      G.age >= 60 &&
      !G.mem?.merLateFired,
    text: `The accounting: you spent a career moving goods between people who had them and people who needed them, and you did this in markets that moved in ways you could sometimes anticipate and sometimes could not, and you built a specific knowledge of how a specific trade breathes that took twenty years to fully build and that cannot be replicated quickly. The good years and the bad years are both in the record. The protection you navigated. The market that shifted. You are still here. The trade is in some form still operating. The knowledge is yours and it is leaving the phase of active use.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 4
      p.karma += 5
      p.addFlag('merchant_late_reckoning')
      p.setMem('merLateFired', true)
      p.legacy += 7
    },
  },

]

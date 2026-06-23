// events_farmer_arc.js — Deep farmer career arc
//
// The farmer exists in careers.js with one event (drought).
// These events add what that can't: the seasons as a second body,
// the specific arithmetic of smallholder farming, the land as
// something held and lost, the way the work passes or doesn't
// pass to the next generation.
//
// Particularly active for subsaharan/developing archetypes and
// low-GDP countries, but the base arc fires anywhere.

const isFarmer = (G) => G.career?.id === 'farmer' || G.flags.has('farmer_career')

export const FARMER_ARC_EVENTS = [

  {
    id: 'farm_first_season',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isFarmer(G) &&
      !G.mem?.farmFirstSeasonFired,
    text: `The first season that is yours — not your father's, not your mother's — is the season in which you understand how much of farming is waiting. You plant at the right time, which you know from the signs and from having been taught. Then you wait for the rain. The rain comes or it does not come in the right quantity and at the right time. When it comes right, the crop grows, and the gap between planting and harvest is filled with the specific work of maintaining and watching. When it does not come right, the work between planting and harvest is different work: the work of managing what is happening and the work of not saying it in front of the children.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 3
      p.addFlag('farmer_first_season')
      p.setMem('farmFirstSeasonFired', true)
    },
  },

  {
    id: 'farm_good_year',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isFarmer(G) &&
      G.flags.has('farmer_first_season') &&
      !G.mem?.farmGoodYearFired,
    text: `The year when everything goes right. The rains arrive at the right time. The crop comes through clean. The market is not bad. You have enough to eat, enough to sell, enough to carry over. This is not wealth — it does not feel like what wealth feels like, which you know from other people's lives. But it is sufficiency, and sufficiency after years of the arithmetic coming up short feels like something specific. You remember this year. You reference it in later years as the standard.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.h += 4
      p.addFlag('farmer_good_year')
      p.setMem('farmGoodYearFired', true)
    },
  },

  {
    id: 'farm_credit_trap',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isFarmer(G) &&
      (G.currentCountry?.gdp === 'low' || G.currentCountry?.gdp === 'very_low' || G.currentCountry?.gdp === 'low_medium') &&
      !G.mem?.farmCreditFired,
    text: `The money you need at planting time is available from the trader who buys at harvest time. You understand what this means because you have seen it your whole life: the loan that must be repaid in crop, at the price the trader sets at harvest, which is not the price at the time of the loan. It is a bad arrangement. You take it because there is no other arrangement. Every farmer around you takes it. The trader has the money and the warehouse and the truck, and you have the land and the labour, and the arrangement between these two things has been the same for a generation.`,
    choices: [
      {
        text: 'Take the loan and replant next season without it',
        tag: null,
        outcome: `You take it. The harvest repays it at the trader's price. The following year you manage without it, barely.`,
        effect: (p) => {
          p.w -= 6
          p.m -= 5
          p.addFlag('farmer_credit_trap')
          p.setMem('farmCreditFired', true)
        },
      },
      {
        text: 'Find a savings group and borrow collectively',
        tag: null,
        outcome: `The collective arrangement is slower and harder to organise but the terms are different. You get through the season.`,
        effect: (p) => {
          p.s += 4
          p.w -= 3
          p.setMem('farmCreditFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'farm_land_title',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isFarmer(G) &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country?.archetype) &&
      !G.mem?.farmTitleFired,
    text: `The government is titling land. The process is: you go to the district office, you present yourself and your boundaries, someone comes to measure, you pay a fee, you receive a document. The document means the land is legally yours in a way that it was not before. You have farmed this land for twenty years. Your father farmed it before you. The document is supposed to clarify something that did not feel unclear. What the document actually clarifies is who the land belongs to when someone with a bigger claim decides they need it.`,
    choices: [
      {
        text: 'Get the title — documentation protects you',
        tag: null,
        outcome: `You get the document. You keep it with the other important papers. It represents something.`,
        effect: (p) => {
          p.w += 4
          p.addFlag('farmer_land_titled')
          p.setMem('farmTitleFired', true)
        },
      },
      {
        text: 'Skip it — the fee is too high and the process is corruption',
        tag: null,
        outcome: `You skip it. The land is yours the same way it was before. You are aware this may matter later.`,
        effect: (p) => {
          p.m -= 3
          p.r += 4
          p.setMem('farmTitleFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'farm_bad_sequence',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isFarmer(G) &&
      G.age >= 35 &&
      !G.mem?.farmBadSeqFired,
    text: `Two years back-to-back where the rains are wrong — not absent, which you could plan around; wrong in timing, in distribution across the season. The crop comes up thin. The second year thinner still. The arithmetic of a farming life has always been tight, and two thin years in sequence tighten it past the point where the normal adjustments cover it. You eat into what you put aside. You borrow some of what you swore not to borrow. You do not talk about it except in the indirect way that farmers talk about these things: referring to the weather, to the market, to the quality of the seed — the real subject always underneath.`,
    choices: [
      {
        text: 'Hold on — this cannot be three years in a row',
        tag: null,
        outcome: `The third year is not as bad. You come through. Something has shifted in the margin you thought you had.`,
        effect: (p) => {
          p.w -= 10
          p.m -= 10
          p.h -= 4
          p.addFlag('farmer_survived_bad_years')
          p.setMem('farmBadSeqFired', true)
        },
      },
      {
        text: 'Send one of the family to the city for income',
        tag: null,
        outcome: `They go. The money comes back. The farm changes shape.`,
        effect: (p) => {
          p.w -= 5
          p.m -= 8
          p.addFlag('farmer_family_migrated')
          p.setMem('farmBadSeqFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'farm_inheritance_question',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isFarmer(G) &&
      G.children?.length > 0 &&
      G.age >= 45 &&
      !G.mem?.farmInheritFired,
    text: `Your children are growing up on the land, or they are growing up in the city and coming back for the seasons. The question that has been in the background becomes specific: who will farm this after you? The child who stayed wants to farm it. The one who left has education and prospects and also has opinions about the farm. The one who stayed is watching to see which way this goes. You have not decided. The land is both the answer and the question, and you cannot resolve the question without deciding the answer, and the answer is not only yours to give.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.e += 3
      p.addFlag('farmer_inheritance_question')
      p.setMem('farmInheritFired', true)
    },
  },

  {
    id: 'farm_the_body',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isFarmer(G) &&
      G.age >= 48 &&
      !G.mem?.farmBodyFired,
    text: `The body knows what farming costs. Not in a single event but in accumulation: the back, specifically, which has bent over a specific thing in a specific way for thirty years and which now carries a commentary on those thirty years that it does not stop offering. The knees. The hands in cold weather. You have been aware of the cost as it accrued and have paid it, because the work required paying it and because you are a person who pays what the work requires. The cost now presents itself differently, as something that was deferred and is now due.`,
    choices: null,
    effect: (p) => {
      p.h -= 8
      p.m -= 4
      p.addFlag('farmer_body_cost')
      p.setMem('farmBodyFired', true)
    },
  },

  {
    id: 'farm_inheritance_resolved',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('farmer_inheritance_question') &&
      G.age >= 58 &&
      !G.mem?.farmInheritResFired,
    text: `The question of the land has resolved itself, or has been resolved by decisions made by people who are not you, or has been resolved by the passage of time into something that no longer requires active decision. The child who stayed is farming it, or has left and it has gone to someone else, or it has been sold. The resolution is not what you would have designed, which is the common result of things that take years to resolve. The land is still there, or is not still there in your name. You have made your peace with whichever is true. Peace is approximate.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 3
      p.addFlag('farmer_inheritance_resolved')
      p.setMem('farmInheritResFired', true)
    },
  },

  {
    id: 'farm_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isFarmer(G) &&
      G.age >= 62 &&
      !G.mem?.farmLateFired,
    text: `You have farmed most of your life. The accounting of a farming life does not fit into the categories that other accountings use: not salary, not career, not achievement in the sense those words mean in other contexts. It is done in seasons. In the years when the rains came right and the years when they didn't. In the land that is still there, or in the specific grief of land that is no longer there. In the people who farmed beside you, who are gone in different ways. In the children who stayed and the ones who left. You stand at the edge of the field — your field, your father's field, the field that will go to your son or daughter or to someone else — and the accounting takes the form of this: the field exists. The field has fed people. These are not small things.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 5
      p.karma += 8
      p.addFlag('farmer_late_reckoning')
      p.setMem('farmLateFired', true)
      p.legacy += 8
    },
  },

]

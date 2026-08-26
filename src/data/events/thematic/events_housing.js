/**
 * events_housing.js — tenure, which is not one story.
 *
 * The life-course layer supplies a home at the rate the place and decade
 * actually provided one. These are the moments that rate cannot express: the
 * decree that made eighty per cent of a country owner-occupiers in four years,
 * the two years of rent a Lagos landlord wants before the key, the flat you
 * queued eleven years for, the house that is finished in the sense that you
 * live in it.
 */

const POST_SOVIET = (G) => G.currentCountry?.archetype === 'post_soviet' ||
  G.character?.country?.archetype === 'post_soviet'

export const HOUSING_EVENTS = [

  // ── The decree ──────────────────────────────────────────────────────────────
  // Mass privatisation handed sitting tenants the freehold of the flat they
  // already lived in, taking home ownership across the former bloc from near
  // zero to eighty or ninety per cent inside half a decade. It is the largest
  // transfer of property in modern history and most people experienced it as a
  // letter.

  {
    id: 'housing_privatisation_decree',
    phase: null,
    // Weighted far above a normal event because it is not a normal event: it
    // reached essentially every urban household in the bloc inside a seven-year
    // window. At an ordinary weight it lost draws to whatever else was eligible
    // that year and reached about one cohort member in seven.
    weight: 45,
    when: (G) =>
      POST_SOVIET(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1998 &&
      G.age >= 20 &&
      !G.mem?.housingPrivatised,
    text: 'A form appears, and then a queue for the form, and then a stamp. At the end of it the flat is yours: the one you already live in, the one with the window that has never closed properly, the one you were allocated eleven years ago and have painted twice. Nobody asked whether you wanted to own anything. Some neighbours sign immediately. One on the floor below refuses on principle and is still refusing four years later, by which time the principle has become expensive.',
    // Auto-resolves rather than offering the choice, because the overwhelming
    // majority kept the flat. Presenting keep-or-sell as a fork made half of
    // every post-Soviet cohort sell it, which is not what happened; selling was
    // what people did under real hardship, and it has its own event below.
    choices: null,
    effect: (p) => {
      p.setMem('housingPrivatised', true)
      p.m += 8
      p.addFlag('homeowner'); p.addFlag('privatised_the_flat')
      p.grantHome('studio_flat', 0.9)
    },
  },

  // ── Selling it, which is what hardship looked like ──────────────────────────

  {
    id: 'housing_privatisation_sold',
    phase: null,
    weight: 6,
    when: (G) =>
      G.flags.has('privatised_the_flat') &&
      !G.flags.has('sold_the_privatised_flat') &&
      G.currentYear >= 1993 && G.currentYear <= 2001 &&
      (G.money ?? 0) < 900 &&
      !G.mem?.housingPrivSold,
    text: 'The wage has not arrived for five months, and it is not going to, and the flat is the only thing anyone in the family owns. The buyer is somebody\'s cousin and the price is what people were paying that year, which was not much. You needed it that year, which was the whole reason.',
    choices: [
      {
        text: 'Sell.',
        tag: null,
        outcome: 'What it sold for and what it became worth are two numbers you have deliberately never put side by side.',
        effect: (p) => {
          p.setMem('housingPrivSold', true)
          p.mo += 3500; p.m -= 6; p.r += 12
          p.addFlag('sold_the_privatised_flat')
        },
      },
      {
        text: 'Hold on to it and find the money elsewhere.',
        tag: null,
        outcome: 'You sell everything else instead, in pieces, over about two years. The flat stays, and it turns out to be the only reason the next decade was survivable.',
        effect: (p) => {
          p.setMem('housingPrivSold', true)
          p.wipeMoney(0.6); p.m -= 8; p.h -= 4
          p.addFlag('held_the_flat_through_it')
        },
      },
    ],
    effect: null,
  },

  // ── Two years, in cash, before the key ──────────────────────────────────────

  {
    id: 'housing_rent_upfront',
    phase: null,
    weight: 5,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.archetype) &&
      G.ruralUrban !== 'rural' &&
      G.age >= 20 && G.age <= 50 &&
      !G.flags.has('homeowner') &&
      !G.mem?.housingUpfront,
    text: 'The rent is two years, in advance, in cash, and there is nothing unusual about that — it is simply what renting is here. The agent takes his cut for making the introduction, and the caution fee is separate, and the caution fee is not returned. You do the arithmetic and it comes to more money than you have ever held at one time, which you will now hand to a man in a room and receive a handwritten receipt for.',
    choices: [
      {
        text: 'Borrow the difference from family.',
        tag: null,
        outcome: 'Four people contribute and none of them writes anything down. You will be repaying it, in pieces and in favours, for a long time, and nobody will ever say the total out loud.',
        effect: (p) => { p.setMem('housingUpfront', true); p.m -= 4; p.karma += 3; p.addFlag('family_lent_for_rent') },
      },
      {
        text: 'Take the cheaper room further out.',
        tag: null,
        outcome: 'It is two hours each way. You get the money together and you get the room, and you give the time instead, which is the currency you had.',
        effect: (p) => { p.setMem('housingUpfront', true); p.m -= 6; p.h -= 3; p.addFlag('long_commute_years') },
      },
    ],
    effect: null,
  },

  // ── The house that is finished in the sense that you live in it ─────────────

  {
    id: 'housing_unfinished_upper_floor',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('home_without_a_deed') &&
      G.age >= 28 &&
      (G.currentYear - (G.mem?.lcHomeYear ?? G.currentYear)) >= 4 &&
      !G.mem?.housingUnfinished,
    text: 'The upper floor has been waiting for its windows for six years. There is rebar coming out of the top of the pillars, pointing at a storey that is entirely real in everyone\'s understanding of the house and does not yet exist. Nobody builds all at once. You build when there is money, and the building is the record of when there was.',
    choices: null,
    effect: (p) => {
      p.setMem('housingUnfinished', true)
      p.m += 3
      p.addFlag('building_in_stages')
    },
  },

  // ── The arrangement everyone understands ────────────────────────────────────

  {
    id: 'housing_no_deed_reckoning',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('home_without_a_deed') &&
      G.age >= 40 &&
      !G.mem?.housingDeedReckoning,
    text: 'Somebody arrives with a document. The document says a thing about the land that everyone who lives on it knows to be untrue, and it is a document, and what you have is an understanding. The understanding has worked for thirty years because nobody with a document had wanted the land.',
    choices: [
      {
        text: 'Fight it through whatever office will hear you.',
        tag: null,
        outcome: 'Years of it. You keep the house. What it cost is most of what you were saving and a certain permanent alertness about anyone approaching the gate.',
        effect: (p) => { p.setMem('housingDeedReckoning', true); p.wipeMoney(0.35); p.m -= 6; p.e += 5; p.addFlag('defended_the_land') },
      },
      {
        text: 'Take the payment offered and go.',
        tag: null,
        outcome: 'The figure is an insult and it is also real money, and the alternative is the same outcome with lawyers in it. You are somewhere else within the year.',
        effect: (p) => { p.setMem('housingDeedReckoning', true); p.mo += 2500; p.m -= 14; p.r += 12; p.addFlag('lost_the_land') },
      },
    ],
    effect: null,
  },

  // ── Never owning, where owning was the expectation ──────────────────────────

  {
    id: 'housing_never_owned_west',
    phase: null,
    weight: 4,
    when: (G) =>
      ['wealthy_west', 'wealthy_east'].includes(G.archetype) &&
      G.age >= 52 &&
      !G.flags.has('homeowner') &&
      !G.mem?.housingNeverOwned,
    text: 'The rent goes up again by a number that is described in the letter as modest. You have lived here eleven years. Somewhere in your forties the question of buying stopped being a plan being deferred and became a thing that was not going to happen, and there was no particular day on which that changed, which is why you cannot point to the mistake.',
    choices: [
      {
        text: 'Do the sums one more time.',
        tag: null,
        outcome: 'They come out the way they came out the last four times. You put the paper in the drawer with the others, which is itself an answer.',
        effect: (p) => { p.setMem('housingNeverOwned', true); p.m -= 5; p.e += 3; p.addFlag('priced_out_permanently') },
      },
      {
        text: 'Decide, finally, that it does not matter.',
        tag: null,
        outcome: 'Half of Germany rents for life and is not poor for it. Saying that to yourself works about two days in three.',
        effect: (p) => { p.setMem('housingNeverOwned', true); p.m += 4; p.addFlag('made_peace_with_renting') },
      },
    ],
    effect: null,
  },

  // ── The last payment ────────────────────────────────────────────────────────

  {
    id: 'housing_mortgage_ends',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('mortgaged') &&
      (G.currentYear - (G.mem?.lcHomeYear ?? G.currentYear)) >= 24 &&
      !G.mem?.housingMortgageEnds,
    text: 'The last payment goes out on a Tuesday and nothing happens. No letter for six weeks, and then one that is mostly about data protection. You had assumed there would be a moment. What there is instead is a Tuesday, and a house that has been yours in every practical sense for twenty-five years and is now yours in the other sense as well.',
    choices: null,
    effect: (p) => {
      p.setMem('housingMortgageEnds', true)
      p.m += 10
      p.addFlag('mortgage_cleared')
    },
  },
]

export default HOUSING_EVENTS

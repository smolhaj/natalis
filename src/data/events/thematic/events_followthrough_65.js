// events_followthrough_65.js
// Follow-through events for Venezuela depth (events_venezuela_depth.js):
// ven_chavez_generation, ven_missions_beneficiary, ven_boom_generation,
// ven_chavez_death_witness, ven_food_scarcity_era, ven_2017_witness,
// ven_hyperinflation_era, ven_diaspora, ven_colectivo_era,
// ven_dollarization_era, ven_clap_system, ven_colombia_migrant

export const FOLLOWTHROUGH_65_EVENTS = [

  // ── CHAVEZ GENERATION ────────────────────────────────────────────────────

  {
    id: 'ft65_chavez_gen_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_chavez_generation') &&
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2015 &&
      G.age >= 35 &&
      !G.mem?.ft65ChavezMidlife,
    text: 'You believed in the project. The project is now a different thing from what you believed in — or it has arrived at something the project always contained but you chose not to see. You are doing the accounting now: what was real, what was the oil price, what was the man, what was the possibility of transformation. The accounting is long and does not produce a clean total.',
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 4
      p.setMem('ft65ChavezMidlife', true)
    },
  },

  {
    id: 'ft65_chavez_gen_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_chavez_generation') &&
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2022 &&
      G.age >= 55 &&
      !G.mem?.ft65ChavezLate,
    text: 'Someone asks you what you thought of Chávez. The question is now historical — like being asked what you thought of Perón or Allende. You give the true answer, which takes longer than a sentence. The true answer contains the grandmother who cried in 1998 and the food queue in 2016 and the 7 million who left and the oil that still flows under the ground they left.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft65ChavezLate', true)
    },
  },

  // ── MISSIONS BENEFICIARY ─────────────────────────────────────────────────

  {
    id: 'ft65_missions_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_missions_beneficiary') &&
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2014 &&
      G.age >= 30 &&
      !G.mem?.ft65MissionsLate,
    text: 'The módulo at the corner is still there but the Cuban doctor left in 2013. The replacement doctor is Venezuelan, underpaid and overworked, and the medicines that the farmacia de barrio used to stock are intermittent now. You remember what the examination felt like: the first time your mother had been examined. The examination revealed something that was treated. The treatment ended the problem. This is the argument for what the missions were, taken at its most specific.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.h -= 2
      p.setMem('ft65MissionsLate', true)
    },
  },

  // ── BOOM GENERATION ──────────────────────────────────────────────────────

  {
    id: 'ft65_boom_gen_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_boom_generation') &&
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2018 &&
      G.age >= 35 &&
      !G.mem?.ft65BoomLate,
    text: 'The car from the boom years is still there but parts are no longer available. You have been repairing it with substitutes for three years. The television still works. The appliances still work. The boom is visible in the objects that remain from it, which are aging now without replacements, because importing anything costs what importing costs in a collapsed economy. The boom years are an era that can be carbon-dated by what survived.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.mo -= 1500
      p.setMem('ft65BoomLate', true)
    },
  },

  // ── FOOD SCARCITY ERA ────────────────────────────────────────────────────

  {
    id: 'ft65_food_scarcity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_food_scarcity_era') &&
      G.age >= 45 &&
      !G.mem?.ft65FoodScarcityLate,
    text: (G) => {
      if (G.character.country.name === 'Venezuela') {
        return 'The food situation has changed. Not resolved — the structural problem is not resolved — but the informal dollarization has produced a market that is expensive and fully stocked, at least in the stores that price in USD, which you can get to if you have dollars, which you may or may not have depending on the arithmetic of this month. The queue is gone. The bachaquero is gone. What replaced them is more efficient and more nakedly sorted by who has what.'
      }
      return 'From wherever you are now, the food queue years are a period with a texture you don\'t find in accounts that aren\'t from inside it: the specific weight of the number, the conversation with the woman who had a number from two days ago, the cornmeal you got and the rice you didn\'t. You carry this as knowledge that is available and also expensive to access.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.h -= 2
      p.setMem('ft65FoodScarcityLate', true)
    },
  },

  // ── 2017 WITNESS ────────────────────────────────────────────────────────

  {
    id: 'ft65_2017_witness_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_2017_witness') &&
      G.currentYear >= 2020 &&
      G.age >= 30 &&
      !G.mem?.ft65_2017Late,
    text: 'The 2017 protests changed nothing in the structure and also changed you. The 126 dead are in the record. The opposition that took the streets in 2017 and exhausted itself against the colectivos and the National Guard is the same opposition that is still there in another configuration. You watch the next round — 2019, 2024, the next year after that — with the knowledge of someone who was outside the Diet or in the guarimba and saw the vote pass and the tear gas move anyway.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.setMem('ft65_2017Late', true)
    },
  },

  // ── HYPERINFLATION ERA ───────────────────────────────────────────────────

  {
    id: 'ft65_hyperinflation_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_hyperinflation_era') &&
      G.age >= 35 &&
      !G.mem?.ft65HyperLate,
    text: 'The zeroes that were removed and the zeroes that were added and the new name for the currency that arrived with five zeros removed. You have kept the old bills in a drawer — the amounts printed on them that once meant something and now mean the floor of a context. Economic historians will write papers about this period. You lived it as the specific confusion of not knowing how much a thing costs from week to week, of a salary that meant something on Monday and was different on Friday, of the arithmetic of daily life becoming unmanageable and then the adaptation that made it manageable again.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft65HyperLate', true)
    },
  },

  // ── DIASPORA ─────────────────────────────────────────────────────────────

  {
    id: 'ft65_diaspora_first_year',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('ven_diaspora') &&
      G.currentYear >= 2016 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.ft65DiasporaFirst,
    text: 'The first year. The group chat with the family back home runs through the phone. Your mother sends what she is cooking. Your cousin sends the current exchange rate, which is the real news of the household — the dollar value of what your mother sends, converted, measured against the supermarket. The life you left runs in the phone. The life you are building runs outside the phone. The two lives require separate maintenance.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 5
      p.setMem('ft65DiasporaFirst', true)
    },
  },

  {
    id: 'ft65_diaspora_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_diaspora') &&
      G.currentYear >= 2022 &&
      G.age >= 32 &&
      !G.mem?.ft65DiasporaReckoning,
    text: 'Seven million Venezuelans are outside Venezuela by 2022. The largest sustained displacement in Latin American history. Your departure, which felt singular when it happened, is now statistically visible: the size of it is charted in UNHCR reports and academic papers on South-South migration. The singular and the statistical are both true. The person on the Simón Bolívar bridge was you and also six million others in different years with different things in their one bag.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 6
      p.setMem('ft65DiasporaReckoning', true)
    },
  },

  // ── COLOMBIA MIGRANT ─────────────────────────────────────────────────────

  {
    id: 'ft65_colombia_migrant_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_colombia_migrant') &&
      G.currentYear >= 2021 &&
      G.age >= 28 &&
      !G.mem?.ft65ColombiaLate,
    text: 'The PPT gives you ten years. The ten years are passing. You are, by now, Colombian in the ways that matter in daily life — the route you know, the slang that is yours, the colleague who forgets you are Venezuelan until you say something that places you. The family in Venezuela is older now. Your grandmother is older or she is gone. The country you left is running on a different system than the country you left it to be, and the country you are in has given you a document that says you can stay, which is different from being from here, and also different from being from there, and also the actual configuration of the life you have.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m += 4
      p.setMem('ft65ColombiaLate', true)
    },
  },

  // ── DOLLARIZATION ERA ────────────────────────────────────────────────────

  {
    id: 'ft65_dollarization_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ven_dollarization_era') &&
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2021 &&
      G.age >= 30 &&
      !G.mem?.ft65DollarizationLate,
    text: 'The dollarization made the economy functional for people who have dollars. You may or may not be one of those people, depending on the arithmetic of remittances and informal income. What you understand now that you didn\'t understand in the boom years: the exchange rate is the political argument made economic. The gap between who has dollars and who doesn\'t is the gap between the economy that is functioning and the economy that is not, measured in whether you can buy eggs this week.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.setMem('ft65DollarizationLate', true)
    },
  },

]

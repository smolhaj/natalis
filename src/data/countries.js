// PLACEHOLDER — will be replaced by agent output
export const COUNTRIES = [
  {
    name: 'United States',
    region: 'North America',
    archetype: 'wealthy_west',
    gdp: 'very_high',
    healthcare: 'good',
    lifeExpectancy: 79,
    conflictRisk: 0.02,
    genderGap: 0.18,
    socialMobility: 'medium',
    wealthTierWeights: [0.12, 0.17, 0.32, 0.27, 0.12],
    namePool: {
      male: ['James', 'Michael', 'Robert', 'William', 'David', 'Richard', 'Joseph', 'Thomas'],
      female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Susan', 'Jessica', 'Sarah'],
    },
    surnames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'],
    languages: ['English'],
    context: 'You are born into the wealthiest nation on earth, but that wealth is distributed unevenly. Healthcare is tied to employment. Education debt defines adult life for many.',
    yearRange: [1950, 2005],
  },
]

export const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map(c => [c.name, c]))

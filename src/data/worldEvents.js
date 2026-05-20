// PLACEHOLDER — will be replaced by agent output
export const WORLD_EVENTS = [
  {
    id: 'covid_19',
    name: 'COVID-19 Pandemic',
    years: [2020, 2022],
    archetypes: 'all',
    countries: null,
    narrative: 'A pandemic sweeps the world. Borders close, economies contract, and death becomes a daily statistic.',
    effect: (p) => { p.h -= 8; p.m -= 7; p.w -= 6; },
    addFlags: ['lived_through_pandemic'],
  },
  {
    id: 'financial_crisis_2008',
    name: '2008 Global Financial Crisis',
    years: [2008, 2009],
    archetypes: 'all',
    countries: null,
    narrative: 'The global financial system teeters. Savings evaporate, jobs vanish, and trust in institutions fractures.',
    effect: (p) => { p.w -= 10; p.m -= 4; },
    addFlags: [],
  },
]

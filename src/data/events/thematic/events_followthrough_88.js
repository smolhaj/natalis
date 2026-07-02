// events_followthrough_88.js — Singapore depth arc follow-throughs

export const FOLLOWTHROUGH_88_EVENTS = [

  // ── sg_coldstore_generation ────────────────────────────────────────────────

  {
    id: 'ft88_coldstore_oral_history',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_coldstore_generation') &&
      G.currentYear >= 1996 &&
      G.age >= 50 &&
      !G.mem?.ft88ColdstoreHistory,
    text: 'In the 1990s and 2000s the oral history projects begin — interviews with former detainees, documents preserved by academics in Singapore and abroad. The men and women who were in Changi Prison in 1963 are in their sixties and seventies now. Some speak on record for the first time. The Singapore state has never acknowledged that the detentions were unjust; the ISA remains in force. What exists is the record, preserved in archives and in the generation that was shaped by what happened and what did not happen because of it.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft88ColdstoreHistory', true)
    },
  },

  // ── sg_spectrum_generation ────────────────────────────────────────────────

  {
    id: 'ft88_spectrum_released',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_spectrum_generation') &&
      G.currentYear >= 1989 && G.currentYear <= 1996 &&
      G.age >= 25 &&
      !G.mem?.ft88SpectrumReleased,
    text: 'Most of the Operation Spectrum detainees are released between 1988 and 1990, several after signing statements of confession. One — Teo Soh Lung — is re-detained after she speaks to the foreign press. The confessions are contested; several detainees later say they were made under duress. The government never files criminal charges. The case is not tried in a court. It remains in the record as a security matter. The word "Marxist" is in the official documents. The people who were in the room know what the meetings were actually about.',
    choices: null,
    effect: (p) => {
      p.m += 2
      p.r += 5
      p.setMem('ft88SpectrumReleased', true)
    },
  },

  // ── sg_migrant_worker_sg ──────────────────────────────────────────────────

  {
    id: 'ft88_migrant_worker_covid_dorms',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_migrant_worker_sg') &&
      G.currentCountry === 'Singapore' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem?.ft88CovidDorms,
    text: 'April 2020. Singapore\'s migrant worker dormitories become the centre of the country\'s COVID-19 outbreak. The dormitories — each housing thousands of men in close quarters — are COVID clusters in a way that the private condominiums and HDB flats of Singaporean citizens are not. By May, more than twenty thousand dormitory residents have tested positive. The workers are locked in. Some are inside for months. Singapore\'s "foreign workers" are visible in the pandemic in a way they were not visible before it. The country has a conversation about the dormitory conditions. The conversation continues after the pandemic. The dormitories are still there.',
    choices: null,
    effect: (p) => {
      p.h -= 6
      p.m -= 8
      p.r += 5
      p.setMem('ft88CovidDorms', true)
    },
  },

]

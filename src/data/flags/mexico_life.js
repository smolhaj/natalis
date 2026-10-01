/**
 * MEXICO_LIFE_FLAGS — flags for events_mexico_life.js: Mexico City and rural
 * Oaxaca as ordinary life. Each is consumed by an `mxl_ft_*` follow-through
 * in that module.
 */
export const MEXICO_LIFE_FLAGS = {
  mxl_quince: {
    weight: 'minor', category: 'cultural', intent: 'event',
    description: 'Had a quinceañera.',
    notes: 'Follow-through: mxl_ft_quince, a daughter\'s.',
  },
  mxl_afro_costa: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Afro-Mexican child of the Costa Chica, asked where in Cuba.',
    notes: 'Follow-through: mxl_ft_afro_census, the 2020 census question.',
  },
  mxl_colado: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Built a house at the edge of Mexico City by autoconstrucción, roof poured with the compadres.',
    notes: 'Follow-through: mxl_ft_colado, three floors and rebar for a fourth.',
  },
  mxl_tequio: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Gave tequio, communal labour, in an Oaxacan village.',
    notes: 'Follow-through: mxl_ft_cargo, named mayordomo of the fiesta.',
  },
  mxl_muchacha: {
    weight: 'major', category: 'labor', intent: 'event',
    description: 'Left the village at thirteen to seventeen as a live-in domestic worker in Mexico City.',
    notes: 'Follow-through: mxl_ft_muchacha, a daughter asking about it.',
  },
  mxl_lang_not_passed: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Indigenous parent who raised their child in Spanish only.',
    notes: 'Follow-through: mxl_ft_lang.',
  },
  mxl_lang_passed: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Indigenous parent who raised their child in their own language as well as Spanish.',
    notes: 'Follow-through: mxl_ft_lang.',
  },
  mxl_metro_first: {
    weight: 'minor', category: 'experience', intent: 'event',
    description: 'Rode the Mexico City Metro in its first year, 1969-70.',
    notes: 'Follow-through: mxl_ft_metro_carriage and mxl_ft_metro_2021 (Line 12).',
  },
  mxl_mexdollars: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Kept savings in a dollar account in a Mexican bank during the oil boom.',
    notes: 'Follow-through: mxl_ft_mexdollars, the forced conversion of August 1982.',
  },
  mxl_1988_vote: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Voted in the 1988 election when "the system crashed".',
    notes: 'Follow-through: mxl_ft_1988_2000.',
  },
  mxl_caseta_calls: {
    weight: 'moderate', category: 'migration', intent: 'event',
    description: 'Took Sunday calls from relatives in the United States at the village caseta.',
    notes: 'Follow-through: mxl_ft_video_call.',
  },
  mxl_corn_price: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Farmed the milpa through the fall in maize prices after NAFTA.',
    notes: 'Follow-through: mxl_ft_remittance_house, the empty houses built with dollars.',
  },
  mxl_desaparecido: {
    weight: 'major', category: 'trauma', intent: 'event',
    description: 'A cousin disappeared on the road north during the drug war.',
    notes: 'Follow-through: mxl_ft_buscadoras, searching the fields with the mothers.',
  },
}

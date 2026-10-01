// Climate and season. Moved from engine/character.js so a content module can
// import them without importing the engine (which imports all content).

// ─── Climate and season ───────────────────────────────────────────────────────
// A season is what the prose has to be true about, so the classification is
// driven by what the writing asks for. There were two lists of this fact and
// they disagreed: _sonderGuards.js knew India, Pakistan, Sri Lanka, Nepal and
// Malaysia were monsoon countries, and deriveSeason did not — so every guard
// reading `season === 'wet'` for the subcontinent was unsatisfiable, and the
// monsoon prose in events_seasonal.js and yearTexture.js could not fire in the
// largest monsoon country on earth. MONSOON_COUNTRIES now lives here and
// _sonderGuards.js imports it, so there is one list.

// Wet/dry, in the monsoon vocabulary: the rains arrive, the rains fail.
export const MONSOON_COUNTRIES = [
  'India', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Nepal', 'Bhutan', 'Myanmar',
  'Thailand', 'Vietnam', 'Cambodia', 'Laos', 'Philippines', 'Indonesia',
  'Malaysia', 'Singapore', 'East Timor', 'Maldives',
]

// Wet/dry without the monsoon's arrival: the tropics and the Sahel, where the
// year turns on whether there is water, not on whether it is cold.
const TROPICAL_COUNTRIES = [
  // West and Central Africa
  'Nigeria', 'Ghana', 'Senegal', 'Guinea', 'Burkina Faso', 'Mali', 'Ivory Coast',
  'Liberia', 'Sierra Leone', 'Niger', 'Togo', 'Benin', 'DR Congo', 'Cameroon',
  'Chad', 'Central African Republic', 'Angola',
  // East and Southern Africa
  'Ethiopia', 'Kenya', 'Rwanda', 'Somalia', 'Tanzania', 'Uganda', 'Eritrea',
  'Djibouti', 'Sudan', 'Mozambique', 'Zambia', 'Zimbabwe', 'Namibia',
  // Tropical Americas
  'Colombia', 'Venezuela', 'Ecuador', 'Bolivia', 'Brazil', 'Guyana',
  'Guatemala', 'Honduras', 'Nicaragua', 'El Salvador', 'Belize', 'Cuba', 'Haiti',
  'Dominican Republic', 'Puerto Rico', 'Jamaica', 'Trinidad and Tobago', 'Barbados',
  // Pacific
  'Fiji', 'Papua New Guinea', 'Samoa', 'Kiribati', 'Tuvalu', 'Marshall Islands',
  'Vanuatu',
]

const WET_DRY = new Set([...MONSOON_COUNTRIES, ...TROPICAL_COUNTRIES])

// Only consulted for the four-season countries, so a tropical southern-
// hemisphere country (Tanzania, Angola, Brazil) is classified by climate above
// rather than getting a Kenyan winter.
const SOUTHERN_HEMISPHERE = new Set([
  'Australia', 'New Zealand', 'Argentina', 'Chile', 'South Africa', 'Peru',
  'Uruguay', 'Paraguay',
])

/** The seasons a country can actually produce — exported so audits can check guards. */
export function seasonsFor(countryName) {
  return WET_DRY.has(countryName) ? ['dry', 'wet'] : ['winter', 'spring', 'summer', 'autumn']
}

export function deriveSeason(state) {
  const currentYear = state.currentYear ?? 0
  const countryName = (state.currentCountry ?? state.character?.country)?.name ?? ''
  const raw = ((state.character?.birthYear ?? 1960) * 7 + currentYear * 3) % 4
  if (WET_DRY.has(countryName)) return raw % 2 === 0 ? 'dry' : 'wet'
  const seasons = ['winter', 'spring', 'summer', 'autumn']
  const idx = SOUTHERN_HEMISPHERE.has(countryName) ? (raw + 2) % 4 : raw
  return seasons[idx]
}



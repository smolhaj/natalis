// Whose names a family carries, below the level of a country.
//
// Every country has one name pool, and most countries are not one people. The
// Eritrean pool is Tigrinya and Christian, so every Muslim Eritrean — half the
// country — was a Tesfaye or a Ghirmay Woldai; an Afar in Djibouti drew from
// the Somali pool, a Belizean Creole could be born a Pech, which is a Maya
// family name. `GROUP_NAMES` is keyed by ethnic id and wins; `RELIGION_NAMES`
// is keyed `Country:faith` (the part of the religion id before the first
// underscore) for countries whose pool belongs to one faith and whose people
// do not. Anything absent falls through to the country pool, which is right
// for most of the roster.
//
// A pool may omit `surnames` where the group names a child after the father
// and has no family name: the second given name reads correctly there, and the
// country pool is the wrong fallback for it, so such pools carry a `surnames`
// list of fathers' given names instead.

export const GROUP_NAMES = {}

export const RELIGION_NAMES = {}

/** The key a character's family names are drawn under, or null. */
export function nameGroupFor(countryName, ethnicity, religion) {
  if (ethnicity && GROUP_NAMES[ethnicity]) return ethnicity
  const faith = String(religion ?? '').split('_')[0]
  const key = `${countryName}:${faith}`
  return faith && RELIGION_NAMES[key] ? key : null
}

export function namePoolFor(key) {
  return (key && (GROUP_NAMES[key] ?? RELIGION_NAMES[key])) || null
}

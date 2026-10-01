// _law.js — what the law said, where and when, for the guards that make a
// claim about it.
//
// Two guards were reading a proxy as if it were the law:
//
//   `ra_illegal_abortion` ("Abortion is illegal here") gated on the country's
//   present-day gender gap, so it told an Indian woman in 1990 — nineteen years
//   after the Medical Termination of Pregnancy Act — that she had to find the
//   woman everybody knows the name of.
//
//   `doc_no_birth_certificate` made every unregistered rural birth into a
//   stateless one, so a Yoruba citizen of Nigeria collected statelessness
//   texture for the rest of her life. Most of the world's unregistered children
//   are citizens; statelessness is something a state does to a particular
//   people, and the roster models several of them.

// ── Abortion ─────────────────────────────────────────────────────────────────
//
// The year abortion became available on request or on broad social grounds —
// the point after which "abortion is illegal here" stops being true for an
// ordinary woman. A [from, to] pair where the law was later reversed; null
// where it was banned or restricted to danger-to-life across the period.
// Sources: national legislation as summarised by the UN World Abortion Policies
// database and the Center for Reproductive Rights; dates are when the law took
// effect, rounded to the year.

const SOVIET = [[1920, 1935], [1955, 2100]]

export const ABORTION_LEGAL = {
  'United Kingdom': [[1968, 2100]],
  'United States': [[1973, 2100]],
  'Canada': [[1969, 2100]],
  'France': [[1975, 2100]],
  'Germany': [[1976, 2100]],
  'Italy': [[1978, 2100]],
  'Spain': [[1985, 2100]],
  'Portugal': [[2007, 2100]],
  'Ireland': [[2019, 2100]],
  'Netherlands': [[1981, 2100]],
  'Belgium': [[1990, 2100]],
  'Sweden': [[1975, 2100]],
  'Norway': [[1978, 2100]],
  'Denmark': [[1973, 2100]],
  'Finland': [[1970, 2100]],
  'Iceland': [[1975, 2100]],
  'Austria': [[1975, 2100]],
  'Switzerland': [[2002, 2100]],
  'Greece': [[1986, 2100]],
  'Japan': [[1948, 2100]],
  'China': [[1957, 2100]],
  'Taiwan': [[1985, 2100]],
  'Mongolia': [[1989, 2100]],
  'Vietnam': [[1960, 2100]],
  'Cambodia': [[1997, 2100]],
  'Singapore': [[1970, 2100]],
  'India': [[1972, 2100]],
  'Nepal': [[2002, 2100]],
  'Bangladesh': [[1979, 2100]],   // menstrual regulation, legal since 1979
  'Turkey': [[1983, 2100]],
  'Tunisia': [[1973, 2100]],
  'Israel': [[1977, 2100]],
  'South Africa': [[1997, 2100]],
  'Zambia': [[1972, 2100]],
  'Mozambique': [[2014, 2100]],
  'Ethiopia': [[2005, 2100]],
  'Cuba': [[1965, 2100]],
  'Guyana': [[1995, 2100]],
  'Uruguay': [[2012, 2100]],
  'Argentina': [[2021, 2100]],
  'Mexico': [[2021, 2100]],
  'Colombia': [[2022, 2100]],
  'Thailand': [[2021, 2100]],
  'South Korea': [[2021, 2100]],
  'Australia': [[1971, 2100]],
  'New Zealand': [[1977, 2100]],
  'Poland': [[1956, 1993]],
  'Romania': [[1957, 1966], [1990, 2100]],
  'Hungary': [[1956, 2100]],
  'Czech Republic': [[1958, 2100]],
  'Slovakia': [[1958, 2100]],
  'Bulgaria': [[1956, 2100]],
  'Serbia': [[1969, 2100]],
  'Croatia': [[1969, 2100]],
  'Slovenia': [[1969, 2100]],
  'Bosnia and Herzegovina': [[1969, 2100]],
  'North Macedonia': [[1969, 2100]],
  'Albania': [[1991, 2100]],
  // The Soviet republics share the Union's law until 1991 and kept it after.
  'Russia': SOVIET, 'Ukraine': SOVIET, 'Belarus': SOVIET, 'Moldova': SOVIET,
  'Estonia': SOVIET, 'Latvia': SOVIET, 'Lithuania': SOVIET,
  'Georgia': SOVIET, 'Armenia': SOVIET, 'Azerbaijan': SOVIET,
  'Kazakhstan': SOVIET, 'Uzbekistan': SOVIET, 'Kyrgyzstan': SOVIET,
  'Tajikistan': SOVIET, 'Turkmenistan': SOVIET,
}

/** Was abortion on request (or on broad grounds) legal here this year? */
export function abortionLegal(country, year) {
  const name = country?.name ?? country
  const spans = ABORTION_LEGAL[name]
  if (!spans) return false
  return spans.some(([a, b]) => year >= a && year <= b)
}

/**
 * Does the state back the premise "you are pregnant and did not mean to be"?
 * Somebody to be pregnant by, no pregnancy already under way, and not a
 * pregnancy the character was trying for.
 */
export function unplannedPregnancyPremise(G) {
  const has = (f) => G.flags?.has?.(f) ?? G.flags?.includes?.(f) ?? false
  if (G.character?.gender !== 'female') return false
  if (has('pregnant') || has('expecting') || has('trying_for_child')) return false
  return !!G.partner || (G.hooksUpCount ?? 0) > 0
}

// ── Statelessness ────────────────────────────────────────────────────────────
//
// The populations on the roster whom a state declined to count as its own, and
// the years it did so. Rohingya under the 1982 citizenship law; the Urdu-
// speaking Bihari of Bangladesh until the 2008 High Court ruling; the Kurds
// stripped by the 1962 Hasakah census until the 2011 decree; the Lhotshampa
// after the 1988 census; the hill peoples of northern Thailand, most of whom
// had no registration until the 2000s.
export const STATELESS = [
  { ethnicity: 'rohingya', country: 'Myanmar', from: 1982, to: 2100 },
  { ethnicity: 'bihari', country: 'Bangladesh', from: 1971, to: 2008 },
  { ethnicity: 'kurdish_syria', country: 'Syria', from: 1962, to: 2011 },
  { ethnicity: 'lhotshampa', country: 'Bhutan', from: 1988, to: 2100 },
  { ethnicity: 'hill_tribes', country: 'Thailand', from: 1950, to: 2008 },
]

/** Is this character, born where they were, one of the people the state left uncounted? */
export function bornStateless(G) {
  const country = G.character?.country?.name
  const born = G.character?.birthYear ?? (G.currentYear - G.age)
  return STATELESS.some(s => s.ethnicity === G.ethnicity && s.country === country &&
    born <= s.to && G.currentYear >= s.from)
}

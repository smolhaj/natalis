/**
 * history.js — dates the engine was guessing.
 *
 * Three event families asserted a specific historical moment without checking
 * whether it happened to that country in that year, and a beta pass measured
 * what came out:
 *
 *   `hist_independence_day` ("The flag of ${country} rises for the first time")
 *   fired anywhere in the subsaharan/developing/conflict archetypes between
 *   1956 and 1975. Of 43 firings, roughly three landed in the right year. It
 *   told Ethiopia — never colonised — that its colonial flag came down in 1966,
 *   Liberia (1847) in 1956, Haiti (1804) in 1964, and Bangladesh in 1966, five
 *   years before 1971.
 *
 *   `dc_first_coup` ("a general you have not heard of before… the name that led
 *   ${country} to independence is gone") fired anywhere subsaharan between 1965
 *   and 1985. It asserted coups in Kenya, Tanzania, Zambia and Namibia, none of
 *   which had one, and in Ivory Coast sixteen years before its first.
 *
 *   Every `ps_*` event guards on `archetype === 'post_soviet'`, which contains
 *   eleven countries that were never in the USSR. Croatian characters were being
 *   born in a Soviet maternity ward and Czechs given Brezhnev nostalgia.
 *
 * The fix is data, not guard gymnastics: the real years, in one place, so the
 * prose can say something true. An absent entry means "not a colony that gained
 * independence in the modern era" — Ethiopia, Iran, Thailand, China, Japan,
 * Nepal, Bhutan, Oman — and a guard should read that as "this event does not
 * apply", never as a licence to pick a year.
 */

/**
 * The year a country became independent of foreign rule, as the country itself
 * dates it. Absent = never colonised, or independence outside the era the game
 * covers in this register.
 */
export const INDEPENDENCE_YEAR = {
  // ── Africa ──
  'Libya': 1951, 'Sudan': 1956, 'Morocco': 1956, 'Tunisia': 1956, 'Ghana': 1957,
  'Guinea': 1958, 'Cameroon': 1960, 'Senegal': 1960, 'Mali': 1960,
  'Burkina Faso': 1960, 'Ivory Coast': 1960, 'Niger': 1960, 'Togo': 1960,
  'Benin': 1960, 'Chad': 1960, 'Central African Republic': 1960,
  'DR Congo': 1960, 'Somalia': 1960, 'Nigeria': 1960, 'Sierra Leone': 1961,
  'Tanzania': 1961, 'Algeria': 1962, 'Uganda': 1962, 'Rwanda': 1962,
  'Kenya': 1963, 'Zambia': 1964, 'Mozambique': 1975, 'Angola': 1975,
  'Djibouti': 1977, 'Zimbabwe': 1980, 'Namibia': 1990, 'Eritrea': 1993,
  'South Africa': 1961,  // republic; the Union dates to 1910
  'Egypt': 1922,
  'Liberia': 1847,
  // Ethiopia: absent. Never colonised (occupied 1936–41, which is not the same).

  // ── Asia ──
  'India': 1947, 'Pakistan': 1947, 'Myanmar': 1948, 'Sri Lanka': 1948,
  'Indonesia': 1949, 'Laos': 1953, 'Cambodia': 1953, 'Vietnam': 1954,
  'Philippines': 1946, 'Malaysia': 1957, 'Singapore': 1965, 'Maldives': 1965,
  'Bangladesh': 1971, 'East Timor': 2002, 'Afghanistan': 1919,
  'North Korea': 1948, 'South Korea': 1948, 'Mongolia': 1921,
  // Thailand, China, Japan, Nepal, Bhutan, Iran, Oman, Taiwan: absent.

  // ── The Middle East ──
  'Saudi Arabia': 1932, 'Iraq': 1932, 'Lebanon': 1943, 'Jordan': 1946,
  'Syria': 1946, 'Israel': 1948, 'Cyprus': 1960, 'Kuwait': 1961,
  'UAE': 1971, 'Qatar': 1971, 'Bahrain': 1971, 'Yemen': 1967, 'Turkey': 1923,
  // Palestine: absent. Not an independent state.

  // ── The Pacific and the Caribbean ──
  'Samoa': 1962, 'Fiji': 1970, 'Papua New Guinea': 1975, 'Tuvalu': 1978,
  'Kiribati': 1979, 'Vanuatu': 1980, 'Marshall Islands': 1986,
  'Haiti': 1804, 'Dominican Republic': 1844, 'Cuba': 1902,
  'Jamaica': 1962, 'Trinidad and Tobago': 1962, 'Barbados': 1966,
  'Guyana': 1966, 'Belize': 1981,
  // Puerto Rico: absent. Still a US territory.

  // ── Latin America ──
  'Colombia': 1810, 'Venezuela': 1811, 'Paraguay': 1811, 'Argentina': 1816,
  'Chile': 1818, 'Mexico': 1821, 'Peru': 1821, 'Guatemala': 1821,
  'El Salvador': 1821, 'Honduras': 1821, 'Nicaragua': 1821, 'Brazil': 1822,
  'Ecuador': 1822, 'Bolivia': 1825, 'Uruguay': 1825,

  // ── Europe ──
  'Greece': 1830, 'Romania': 1877, 'Bulgaria': 1908, 'Albania': 1912,
  'Poland': 1918, 'Hungary': 1918, 'Ireland': 1922, 'Iceland': 1944,
  'Czech Republic': 1993, 'Slovakia': 1993,
  'Croatia': 1991, 'Slovenia': 1991, 'Bosnia and Herzegovina': 1992,
  'Serbia': 2006,
  'Russia': 1991, 'Ukraine': 1991, 'Belarus': 1991, 'Moldova': 1991,
  'Estonia': 1991, 'Latvia': 1991, 'Lithuania': 1991,
  'Georgia': 1991, 'Armenia': 1991, 'Azerbaijan': 1991,
  'Kazakhstan': 1991, 'Uzbekistan': 1991, 'Kyrgyzstan': 1991,
  'Turkmenistan': 1991, 'Tajikistan': 1991,
}

/** Did this country gain independence from a colonial power in `year`? */
export function isIndependenceYear(countryName, year) {
  return INDEPENDENCE_YEAR[countryName] === year
}

/**
 * Years of a successful coup d'état, for the countries in the roster that had
 * one. A guard asserting a coup must check this; the absence of a country is
 * information, not a gap. Kenya, Tanzania, Zambia, Senegal, Malawi and
 * Botswana are the well-known sub-Saharan cases that never had one, and
 * Cameroon's 1984 attempt and Kenya's 1982 attempt both failed.
 */
export const COUP_YEARS = {
  // ── Africa ──
  'Nigeria': [1966, 1975, 1983, 1985, 1993],
  'Ghana': [1966, 1972, 1978, 1979, 1981],
  'Uganda': [1971, 1985],
  'DR Congo': [1960, 1965],
  'Togo': [1963, 1967, 2005],
  'Mali': [1968, 1991, 2012, 2020, 2021],
  'Burkina Faso': [1966, 1980, 1982, 1983, 1987, 2014, 2022],
  'Benin': [1963, 1965, 1967, 1969, 1972],
  'Niger': [1974, 1996, 1999, 2010, 2023],
  'Chad': [1975, 1990, 2021],
  'Central African Republic': [1966, 1979, 1981, 2003, 2013],
  'Ethiopia': [1974],
  'Somalia': [1969, 1991],
  'Sudan': [1958, 1969, 1971, 1985, 1989, 2019, 2021],
  'Liberia': [1980, 1990],
  'Sierra Leone': [1967, 1968, 1992, 1997],
  'Guinea': [1984, 2008, 2021],
  'Rwanda': [1973, 1994],
  'Ivory Coast': [1999],
  'Egypt': [1952, 2013],
  'Libya': [1969, 2011],
  'Algeria': [1965, 1992],
  'Zimbabwe': [2017],
  'Mozambique': [],
  'Angola': [],
  'Kenya': [],       // the 1 Aug 1982 attempt failed inside a day
  'Tanzania': [],    // none; Nyerere stepped down voluntarily in 1985
  'Zambia': [],      // none; Kaunda lost an election in 1991
  'Senegal': [],
  'Cameroon': [],    // Ahidjo resigned in 1982; the 1984 attempt failed
  'Namibia': [],     // not a state until 1990, and none since
  'South Africa': [],
  'Eritrea': [],
  'Djibouti': [],
  'Morocco': [],     // the 1971 Skhirat and 1972 air attempts both failed
  'Tunisia': [1987], // Ben Ali's constitutional removal of Bourguiba

  // ── Elsewhere, where the content needs it ──
  'Pakistan': [1958, 1977, 1999],
  'Bangladesh': [1975, 1982],
  'Myanmar': [1962, 1988, 2021],
  'Thailand': [1957, 1971, 1976, 1977, 1991, 2006, 2014],
  'Indonesia': [1965],
  'Cambodia': [1970],
  'Laos': [1960],
  'Afghanistan': [1973, 1978],
  'Iraq': [1958, 1963, 1968],
  'Syria': [1949, 1954, 1963, 1966, 1970],
  'Yemen': [1962, 1974],
  'Turkey': [1960, 1971, 1980, 1997],
  'Iran': [1953],
  'Oman': [1970],
  'Chile': [1973],
  'Argentina': [1930, 1943, 1955, 1962, 1966, 1976],
  'Brazil': [1964],
  'Bolivia': [1964, 1971, 1980],
  'Peru': [1930, 1948, 1962, 1968, 1975],
  'Uruguay': [1973],
  'Paraguay': [1954, 1989],
  'Ecuador': [1963, 1972, 1976],
  'Guatemala': [1954, 1963, 1982, 1983],
  'El Salvador': [1948, 1961, 1979],
  'Honduras': [1963, 1972, 1978, 2009],
  'Nicaragua': [],
  'Haiti': [1950, 1956, 1986, 1991, 2004],
  'Dominican Republic': [1963],
  'Cuba': [1952],
  'Portugal': [1926, 1974],
  'Greece': [1967],
  'Spain': [],       // the 1981 23-F attempt failed
  'Poland': [],
  'Fiji': [1987, 2000, 2006],
  'Papua New Guinea': [],
}

/** Did this country have a successful coup in `year`? */
export function isCoupYear(countryName, year) {
  return (COUP_YEARS[countryName] ?? []).includes(year)
}

/** The coup years this country had inside a window, most recent first. */
export function coupsInWindow(countryName, from, to) {
  return (COUP_YEARS[countryName] ?? []).filter(y => y >= from && y <= to).sort((a, b) => b - a)
}

/**
 * The fifteen republics of the USSR. The `post_soviet` archetype is broader
 * than this — it also holds Yugoslavia's successors, the Warsaw Pact states,
 * Albania and Mongolia — and every `ps_*` event was written for these fifteen.
 * Moldova was missing from the equivalent list in worldEvents.js, so it
 * received neither `soviet_collapse` nor the hyperinflation event, in a country
 * whose entire 1990s is that collapse.
 */
export const SOVIET_REPUBLICS = [
  'Russia', 'Ukraine', 'Belarus', 'Moldova',
  'Estonia', 'Latvia', 'Lithuania',
  'Georgia', 'Armenia', 'Azerbaijan',
  'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Turkmenistan', 'Tajikistan',
]

/** Warsaw Pact members that were not Soviet republics — the "bloc", not the union. */
export const WARSAW_PACT = [
  'Poland', 'Hungary', 'Romania', 'Bulgaria', 'Czech Republic', 'Slovakia',
]

/** Socialist states outside both: Tito's Yugoslavia, Albania, Mongolia. */
export const OTHER_SOCIALIST = [
  'Yugoslavia', 'Croatia', 'Slovenia', 'Serbia', 'Bosnia and Herzegovina',
  'Albania', 'Mongolia',
]

const SOVIET_SET = new Set(SOVIET_REPUBLICS)
const PACT_SET = new Set(WARSAW_PACT)

/** Was this country a republic OF the Soviet Union? */
export function wasSovietRepublic(countryName) {
  return SOVIET_SET.has(countryName)
}

/**
 * Was this country inside the Eastern bloc — a Soviet republic or a Warsaw
 * Pact member? Yugoslavia broke with Stalin in 1948 and co-founded the
 * Non-Aligned Movement; Albania broke with Moscow in 1961 and aligned with
 * China. Neither belongs in prose about "living under the Soviet Union".
 */
export function wasEasternBloc(countryName) {
  return SOVIET_SET.has(countryName) || PACT_SET.has(countryName)
}

// ── Malaria ──────────────────────────────────────────────────────────────────
//
// `ss_malaria_childhood` gated on archetype, so it gave a malarial childhood to
// North Korean and Cuban children. Cuba was certified malaria-free in 1973 and
// had eliminated transmission years before that; the DPRK's vivax is seasonal,
// northern and was absent entirely between the 1970s and a 1998 re-emergence.
// Elimination is a dated event and the date is usually the interesting part of
// the story — Sri Lanka got there in 2016 after a civil war fought across the
// endemic zone, and Italy and Greece were both malarial within living memory.
//
// Value: the year transmission ended. A country absent from this table and
// inside the endemic band is malarial for the whole period; a country listed
// with 0 was never endemic in the era this game covers.
export const MALARIA_FREE_FROM = {
  'Cuba': 1968, 'Jamaica': 1965, 'Trinidad and Tobago': 1965, 'Barbados': 0,
  'Puerto Rico': 1962, 'Chile': 0, 'Uruguay': 0, 'Argentina': 2011,
  'Paraguay': 2018, 'Mexico': 2020, 'El Salvador': 2021, 'Belize': 2023,
  'North Korea': 1979, 'South Korea': 1979, 'Taiwan': 1965, 'Japan': 1961,
  'Singapore': 1982, 'Maldives': 1984, 'Sri Lanka': 2016, 'Bhutan': 2023,
  'Kazakhstan': 1965, 'Kyrgyzstan': 1960, 'Uzbekistan': 1961, 'Tajikistan': 2018,
  'Turkmenistan': 2010, 'Armenia': 2011, 'Azerbaijan': 2023, 'Georgia': 2010,
  'Russia': 1960, 'Ukraine': 1960, 'Mongolia': 0, 'Nepal': 9999,
  'Italy': 1970, 'Greece': 1974, 'Spain': 1964, 'Portugal': 1973,
  'Israel': 1967, 'Lebanon': 1960, 'Jordan': 2000, 'Syria': 2005,
  'Morocco': 2010, 'Algeria': 2019, 'Tunisia': 1979, 'Libya': 1973,
  'Egypt': 1998, 'Iraq': 2008, 'Oman': 9999, 'Bahrain': 1979, 'Qatar': 1970,
  'UAE': 2007, 'Kuwait': 1963,
  // Never endemic in this era, or nothing above a handful of imported cases.
  'Iceland': 0, 'Norway': 0, 'Sweden': 0, 'Denmark': 0, 'Finland': 0,
  'Kiribati': 0, 'Tuvalu': 0, 'Marshall Islands': 0, 'Samoa': 0, 'Fiji': 0,
  'New Zealand': 0, 'Australia': 1981, 'Tonga': 0,
}

/** Was malaria transmitted in this country in this year? */
export function malariaEndemic(countryName, year) {
  const end = MALARIA_FREE_FROM[countryName]
  if (end === undefined) return true     // absent means endemic throughout
  if (end === 0) return false            // never endemic in this era
  return year < end
}

// ── Passenger rail ───────────────────────────────────────────────────────────
//
// Countries on the roster with no passenger line a city commutes on, and the
// ones where it opened or closed inside the period. Deliberately conservative:
// absence from all three means a railway is assumed. "A man on the train
// closes his eyes" printed in Djibouti in 1998.
export const NO_PASSENGER_RAIL = new Set([
  'Central African Republic', 'Djibouti', 'Chad', 'Niger', 'Somalia', 'Yemen',
  'Afghanistan', 'Libya', 'Rwanda', 'Papua New Guinea', 'Bhutan', 'Iceland',
  'Belize', 'Haiti', 'Oman', 'Kuwait', 'Bahrain', 'Nepal', 'East Timor', 'Fiji',
  'Samoa', 'Tuvalu', 'Kiribati', 'Marshall Islands', 'Maldives', 'Vanuatu',
  'Palestine', 'Liberia',
])
export const RAIL_FROM = { UAE: 2009, Qatar: 2019, Laos: 2021 }
export const RAIL_UNTIL = { Guyana: 1974, 'Sierra Leone': 1974, Cyprus: 1951, Barbados: 1937 }

/** Was there a passenger railway to ride in this country in this year? */
export function hasPassengerRail(country, year) {
  const name = country?.name ?? country
  return !NO_PASSENGER_RAIL.has(name) &&
    year >= (RAIL_FROM[name] ?? 0) && year <= (RAIL_UNTIL[name] ?? 9999)
}

// ── Cholera ──────────────────────────────────────────────────────────────────
//
// The cholera arc gated on archetype and 1850-1950, so it put a summer of bad
// wells on a street in Papua New Guinea, which saw no cholera at all until
// 2009. Cholera is not a property of poverty in general; it circulated where
// it circulated. Spans are [from, to], inclusive, and are broad on purpose —
// the question is "could a family here have lost someone to it in this
// decade", not an epidemiological record.
//
//   - South Asia: endemic throughout; the Ganges delta is its home.
//   - Egypt and the Middle East: the pilgrimage and pandemic outbreaks to the
//     1940s (Egypt 1947 was the last great one), then Iraq and Iran in the El
//     Tor years, and the war outbreaks — Iraq 2007, Yemen 2016, Syria and
//     Lebanon 2022.
//   - East and Southeast Asia: Indonesia (where El Tor began in 1961), the
//     Philippines, Indochina and China, into the 1990s and beyond in places.
//   - The Russian Empire and early USSR, to the mid-1920s.
//   - Africa: the seventh pandemic arrived in West Africa in 1970 and has not
//     left the continent since; Zimbabwe 2008, Somalia and Ethiopia repeatedly.
//   - Latin America: Peru, January 1991, then the continent, to about 1999.
//   - Haiti from October 2010; Papua New Guinea 2009-11.
//   - Never: Oceania otherwise, the Americas 1900-1990, Western Europe after
//     the 1910s.
const SOUTH_ASIA_ALWAYS = [[1817, 2100]]
const AFRICA_SEVENTH = [[1970, 2100]]
const LATAM_1991 = [[1991, 1999]]
const RUSSIA_EMPIRE = [[1817, 1925]]
export const CHOLERA_PRESENT = {
  'India': SOUTH_ASIA_ALWAYS, 'Bangladesh': SOUTH_ASIA_ALWAYS, 'Pakistan': SOUTH_ASIA_ALWAYS,
  'Nepal': SOUTH_ASIA_ALWAYS, 'Afghanistan': SOUTH_ASIA_ALWAYS, 'Myanmar': SOUTH_ASIA_ALWAYS,
  'Sri Lanka': [[1817, 1975]],
  'Egypt': [[1817, 1950]], 'Saudi Arabia': [[1817, 1935]], 'Turkey': [[1817, 1925]],
  'Iraq': [[1817, 1935], [1966, 1966], [1978, 1978], [1998, 1999], [2007, 2008], [2015, 2022]],
  'Iran': [[1817, 1935], [1965, 1970], [1998, 1998], [2005, 2005]],
  'Syria': [[1817, 1930], [1977, 1977], [2022, 2023]],
  'Lebanon': [[1817, 1930], [2022, 2023]],
  'Jordan': [[1817, 1930]],
  'Palestine': [[1817, 1930], [1970, 1970]],
  'Yemen': [[1817, 1930], [2016, 2100]],
  'Kuwait': [[1817, 1930]], 'Bahrain': [[1817, 1930]], 'Qatar': [[1817, 1930]],
  'Oman': [[1817, 1930]], 'UAE': [[1817, 1930]],
  'Indonesia': [[1817, 2100]], 'Philippines': [[1817, 2100]],
  'Vietnam': [[1817, 2010]], 'Cambodia': [[1817, 2000]], 'Laos': [[1817, 2000]],
  'Thailand': [[1817, 1990]], 'Malaysia': [[1817, 1995]],
  'China': [[1817, 1950], [1961, 2000]],
  'South Korea': [[1817, 1946], [1963, 1963], [1969, 1970]],
  'North Korea': [[1817, 1946]],
  'Japan': [[1817, 1920]], 'Taiwan': [[1817, 1946]], 'Singapore': [[1817, 1960]],
  'Russia': RUSSIA_EMPIRE, 'Ukraine': RUSSIA_EMPIRE, 'Belarus': RUSSIA_EMPIRE,
  'Georgia': RUSSIA_EMPIRE, 'Armenia': RUSSIA_EMPIRE, 'Azerbaijan': RUSSIA_EMPIRE,
  'Kazakhstan': RUSSIA_EMPIRE, 'Uzbekistan': RUSSIA_EMPIRE, 'Kyrgyzstan': RUSSIA_EMPIRE,
  'Turkmenistan': RUSSIA_EMPIRE, 'Tajikistan': [[1817, 1925], [1993, 1994]],
  'Moldova': RUSSIA_EMPIRE, 'Poland': [[1817, 1921]],
  // Africa, from the seventh pandemic's arrival in 1970.
  'Nigeria': AFRICA_SEVENTH, 'Ghana': AFRICA_SEVENTH, 'Senegal': AFRICA_SEVENTH,
  'Guinea': AFRICA_SEVENTH, 'Sierra Leone': AFRICA_SEVENTH, 'Liberia': AFRICA_SEVENTH,
  'Ivory Coast': AFRICA_SEVENTH, 'Mali': AFRICA_SEVENTH, 'Burkina Faso': AFRICA_SEVENTH,
  'Niger': AFRICA_SEVENTH, 'Chad': AFRICA_SEVENTH, 'Togo': AFRICA_SEVENTH,
  'Benin': AFRICA_SEVENTH, 'Cameroon': AFRICA_SEVENTH, 'Central African Republic': AFRICA_SEVENTH,
  'DR Congo': AFRICA_SEVENTH, 'Angola': AFRICA_SEVENTH, 'Zambia': AFRICA_SEVENTH,
  'Mozambique': AFRICA_SEVENTH, 'Tanzania': AFRICA_SEVENTH, 'Kenya': AFRICA_SEVENTH,
  'Uganda': AFRICA_SEVENTH, 'Rwanda': AFRICA_SEVENTH, 'Ethiopia': AFRICA_SEVENTH,
  'Eritrea': AFRICA_SEVENTH, 'Somalia': AFRICA_SEVENTH, 'Djibouti': AFRICA_SEVENTH,
  'Sudan': [[1817, 1950], [1970, 2100]], 'Zimbabwe': [[1972, 1974], [1992, 1993], [2008, 2009], [2018, 2019], [2023, 2024]],
  'South Africa': [[1980, 1987], [2000, 2001], [2008, 2009]],
  'Namibia': [[1980, 1980], [2006, 2008]],
  'Algeria': [[1817, 1920], [1971, 1990]], 'Morocco': [[1817, 1920], [1970, 1972]],
  'Tunisia': [[1817, 1920], [1973, 1973]], 'Libya': [[1817, 1920], [1970, 1972]],
  // Latin America: absent for most of a century, then the 1991 wave.
  'Peru': LATAM_1991, 'Ecuador': LATAM_1991, 'Colombia': LATAM_1991, 'Bolivia': LATAM_1991,
  'Brazil': LATAM_1991, 'Mexico': LATAM_1991, 'Guatemala': LATAM_1991, 'El Salvador': LATAM_1991,
  'Honduras': LATAM_1991, 'Nicaragua': LATAM_1991, 'Venezuela': LATAM_1991, 'Paraguay': [[1993, 1993]],
  'Argentina': [[1992, 1998]], 'Chile': [[1991, 1991]], 'Belize': [[1991, 1993]],
  'Haiti': [[2010, 2100]], 'Dominican Republic': [[2010, 2012]], 'Cuba': [[2012, 2013]],
  'Papua New Guinea': [[2009, 2011]],
}

/** Was cholera circulating where this character lives, this year? */
export function choleraEndemic(country, year) {
  const spans = CHOLERA_PRESENT[country?.name ?? country]
  if (!spans) return false
  return spans.some(([a, b]) => year >= a && year <= b)
}

// ── Structural adjustment ────────────────────────────────────────────────────
//
// "The government has signed a paper in Washington" fired for any subsaharan or
// developing_urban country between 1984 and 1998 — Algeria in 1984, whose
// IMF programmes were 1989 and 1994, and Malaysia, Libya and South Africa,
// which never had one. The year a country signed its (first, or defining)
// IMF / World Bank adjustment programmes; a country absent from this table
// did not sign one in the period.
export const ADJUSTMENT_PROGRAMME_YEARS = {
  // Africa
  'Nigeria': [1986], 'Ghana': [1983], 'Kenya': [1980, 1993], 'DR Congo': [1983],
  'Senegal': [1980, 1985], 'Ivory Coast': [1981], 'Togo': [1983], 'Niger': [1983],
  'Zambia': [1985, 1991], 'Tanzania': [1986], 'Guinea': [1986], 'Sierra Leone': [1986, 1992],
  'Mozambique': [1987], 'Uganda': [1987], 'Chad': [1987, 1995], 'Mali': [1982, 1988],
  'Central African Republic': [1987], 'Cameroon': [1988], 'Benin': [1989], 'Rwanda': [1990],
  'Burkina Faso': [1991], 'Zimbabwe': [1991], 'Ethiopia': [1992], 'Djibouti': [1996],
  'Somalia': [1981], 'Sudan': [1979], 'Egypt': [1987, 1991], 'Morocco': [1983],
  'Tunisia': [1986], 'Algeria': [1989, 1994],
  // Asia and the Middle East
  'Turkey': [1980, 2001], 'Philippines': [1980, 1984], 'Sri Lanka': [1977], 'Bangladesh': [1987],
  'Pakistan': [1988], 'Nepal': [1987], 'India': [1991], 'Jordan': [1989], 'Laos': [1989],
  'Vietnam': [1994], 'Cambodia': [1994], 'Indonesia': [1997], 'Thailand': [1997],
  'South Korea': [1997],
  // The Americas
  'Jamaica': [1977, 1981], 'Peru': [1978, 1991], 'Mexico': [1982, 1995], 'Brazil': [1983, 1998],
  'Argentina': [1983, 1991], 'Ecuador': [1983, 2000], 'Uruguay': [1983], 'Chile': [1985],
  'Dominican Republic': [1985, 1991], 'Bolivia': [1985], 'Trinidad and Tobago': [1988],
  'Guyana': [1989], 'Venezuela': [1989], 'Honduras': [1990], 'Barbados': [1991],
  'Nicaragua': [1994], 'Haiti': [1996], 'Colombia': [1999],
}

/** Did this country sign an adjustment programme in `year` or the year before? */
export function adjustmentProgrammeNow(country, year) {
  const ys = ADJUSTMENT_PROGRAMME_YEARS[country?.name ?? country]
  return !!ys && ys.some(y => year >= y && year <= y + 1)
}

// ── Rivers ───────────────────────────────────────────────────────────────────
//
// `ind_river_wrong_colour` — the creek running the wrong colour below the
// refinery — fired in Kiribati, Tuvalu and the Marshall Islands, which are
// coral atolls with no surface watercourse of any kind. Several Gulf states
// have no perennial river either.
const RIVERLESS = new Set([
  'Kiribati', 'Tuvalu', 'Marshall Islands', 'Maldives', 'Bahrain', 'Qatar',
  'UAE', 'Kuwait', 'Saudi Arabia', 'Oman', 'Libya', 'Malta', 'Singapore',
])

/** Does this country have a river a child could stand beside? */
export function hasRivers(countryName) {
  return !RIVERLESS.has(countryName)
}

// ── The colonial school ──────────────────────────────────────────────────────
//
// `hist_colonial_language_school` gated on archetype, which put a French or
// English colonial classroom in Bhutan, Nepal, Guatemala, Nicaragua and Soviet
// Tajikistan. It also offered the player "French, or English, or Portuguese"
// as if the character did not know which one, in an event whose whole subject
// is which one.
//
// Listed here: the countries where a European language was the medium of
// instruction over a living local one during this game's period. Latin America
// is absent because independence came in the 1820s and Spanish became the
// national language — the indigenous-language child facing a Spanish classroom
// is a real and different event, not this one. Ethiopia, Iran, Nepal, Bhutan,
// Thailand, China, Japan, Korea and Turkey are absent because they were never
// colonised and taught in their own languages.
export const COLONIAL_SCHOOL_LANGUAGE = {
  // British Africa and Asia
  'Nigeria': 'English', 'Ghana': 'English', 'Kenya': 'English', 'Uganda': 'English',
  'Tanzania': 'English', 'Zambia': 'English', 'Zimbabwe': 'English',
  'Namibia': 'English', 'South Africa': 'English', 'Sudan': 'English',
  'Sierra Leone': 'English', 'Gambia': 'English', 'Malawi': 'English',
  'Botswana': 'English', 'India': 'English', 'Pakistan': 'English',
  'Bangladesh': 'English', 'Sri Lanka': 'English', 'Myanmar': 'English',
  'Malaysia': 'English', 'Singapore': 'English', 'Fiji': 'English',
  'Jamaica': 'English', 'Trinidad and Tobago': 'English', 'Guyana': 'English',
  'Barbados': 'English', 'Belize': 'English',
  // French Africa, Indochina and the Levant
  'Senegal': 'French', 'Mali': 'French', 'Guinea': 'French',
  'Burkina Faso': 'French', 'Ivory Coast': 'French', 'Benin': 'French',
  'Togo': 'French', 'Niger': 'French', 'Chad': 'French', 'Cameroon': 'French',
  'Central African Republic': 'French', 'Gabon': 'French', 'Congo': 'French',
  'DR Congo': 'French', 'Rwanda': 'French', 'Burundi': 'French',
  'Madagascar': 'French', 'Djibouti': 'French', 'Algeria': 'French',
  'Morocco': 'French', 'Tunisia': 'French', 'Lebanon': 'French',
  'Syria': 'French', 'Vietnam': 'French', 'Laos': 'French', 'Cambodia': 'French',
  'Haiti': 'French',
  // Portuguese Africa and Timor
  'Angola': 'Portuguese', 'Mozambique': 'Portuguese', 'Guinea-Bissau': 'Portuguese',
  'Cape Verde': 'Portuguese', 'East Timor': 'Portuguese',
  // Dutch
  'Indonesia': 'Dutch', 'Suriname': 'Dutch',
  // Belgian Congo used French; the Italian and Spanish colonies were short-lived
  'Eritrea': 'Italian', 'Libya': 'Italian', 'Somalia': 'Italian',
  'Equatorial Guinea': 'Spanish', 'Western Sahara': 'Spanish',
  'Philippines': 'English',
}

/**
 * Was school taught in a coloniser's language here this year? True from 1900
 * until roughly a generation after independence, because the medium of
 * instruction outlived the flag nearly everywhere — often permanently.
 */
export function colonialSchoolLanguage(countryName, year) {
  const lang = COLONIAL_SCHOOL_LANGUAGE[countryName]
  if (!lang) return null
  const indep = INDEPENDENCE_YEAR[countryName]
  if (indep === undefined) return year >= 1900 ? lang : null
  return year >= 1900 && year <= indep + 30 ? lang : null
}

// ── Years in which ordinary institutional life stopped ───────────────────────
//
// The corpus has a Khmer Rouge arc, and alongside it a Cambodian character in
// 1977 was drawing a salary, attending school, being referred to a psychiatrist
// and worrying about which families held the municipal contracts. Democratic
// Kampuchea abolished money, markets, wages, schools, hospitals, religion and
// the postal system in the first weeks of 1975, and did not restore any of them.
// Nothing in the engine knew that; every guard asked what country and what year
// and got a true answer to the wrong question.
//
// Each entry is a window in which the named facility did not exist in that
// country. Selection consults it so an event whose prose assumes one is simply
// not offered — the arc that was written for those years fires instead.
/**
 * The years a country's cities were under sustained bombardment.
 *
 * The `cc_bombardment_*` arc in events_crosscutting.js had no year term at all
 * — only a country list and `age >= 5` — so a Bosnian born in 1962 lived the
 * siege of Sarajevo from 1974, got the ceasefire in 1977 and was still packing
 * a run bag in 1988, and then attended the 1984 Olympics in a city she had been
 * shelled in for a decade. The actual siege, at ages 29 to 33, was one world
 * event and three headlines.
 *
 * `archetype === 'conflict_zone'` is the same mistake one layer down: it is a
 * statement about now. Afghanistan carries it for the whole roster range, and
 * Kabul in 1965 was a city you went to university in.
 *
 * Ranges are the periods of sustained shelling or air attack on populated
 * areas, not of war in general — a guerrilla war in the countryside is a
 * different event and has its own arcs.
 */
export const BOMBARDMENT_YEARS = {
  'Bosnia and Herzegovina': [[1992, 1995]],
  Lebanon: [[1975, 1990], [2006, 2006]],
  Syria: [[1982, 1982], [2012, 2018]],
  Iraq: [[1980, 1988], [1991, 1991], [2003, 2008], [2014, 2017]],
  Palestine: [[1948, 1949], [1967, 1967], [2000, 2005], [2008, 2009], [2012, 2012], [2014, 2014], [2021, 2021], [2023, 2026]],
  Afghanistan: [[1979, 1989], [1992, 1996], [2001, 2002]],
  Yemen: [[1994, 1994], [2015, 2022]],
  Somalia: [[1991, 1996], [2006, 2012]],
  Myanmar: [[2021, 2026]],
  Liberia: [[1990, 1996], [1999, 2003]],
  'Central African Republic': [[2013, 2015]],
  Croatia: [[1991, 1995]],
  Serbia: [[1999, 1999]],
  Ukraine: [[2014, 2015], [2022, 2026]],
  Libya: [[2011, 2011], [2014, 2020]],
  Sudan: [[2023, 2026]],
  Vietnam: [[1965, 1972]],
  Cambodia: [[1969, 1975]],
  Laos: [[1964, 1973]],
  Germany: [[1940, 1945]],
  Japan: [[1944, 1945]],
  'United Kingdom': [[1940, 1941], [1944, 1945]],
  Spain: [[1936, 1939]],
  Finland: [[1939, 1944]],
  Israel: [[1948, 1949], [1973, 1973], [1991, 1991], [2006, 2006], [2023, 2024]],
  Chechnya: [[1994, 1996], [1999, 2000]],
}

/** True when this country's cities were being shelled or bombed that year. */
export function underBombardment(country, year) {
  const spans = BOMBARDMENT_YEARS[country?.name ?? country]
  if (!spans) return false
  return spans.some(([a, b]) => year >= a && year <= b)
}

export const INSTITUTIONS_SUSPENDED = [
  // Democratic Kampuchea: the most complete case there is.
  { country: 'Cambodia', from: 1975, to: 1979, what: ['school', 'wages', 'money', 'clinic', 'religion', 'post', 'city'] },
  // The Somali state ceased to exist in January 1991 and there was no central
  // government until 2006; schooling and health ran on whatever communities and
  // NGOs could build.
  { country: 'Somalia', from: 1991, to: 2005, what: ['school', 'wages', 'clinic', 'post'] },
  // The Taliban closed girls' secondary schools and most formal employment for
  // women; the 2021 return did the same again.
  { country: 'Afghanistan', from: 1996, to: 2001, what: ['school_girls', 'wages_women'] },
  { country: 'Afghanistan', from: 2022, to: 2030, what: ['school_girls', 'wages_women'] },
  // The hundred days. Nothing was open.
  { country: 'Rwanda', from: 1994, to: 1994, what: ['school', 'wages', 'clinic', 'post'] },
  // Charles Taylor's war closed the schools of most of the country.
  { country: 'Liberia', from: 1990, to: 1996, what: ['school', 'wages', 'clinic'] },
  { country: 'Sierra Leone', from: 1997, to: 2001, what: ['school', 'wages', 'clinic'] },
  // Year Zero of the Chinese Cultural Revolution: universities shut from 1966
  // and the gaokao was not held again until 1977.
  { country: 'China', from: 1966, to: 1969, what: ['university'] },
]

/**
 * Did `what` exist in this country in this year?
 * @param {string} countryName
 * @param {number} year
 * @param {string} what  one of the tokens used in INSTITUTIONS_SUSPENDED
 */
export function institutionExists(countryName, year, what) {
  for (const w of INSTITUTIONS_SUSPENDED) {
    if (w.country !== countryName) continue
    if (year < w.from || year > w.to) continue
    if (w.what.includes(what)) return false
  }
  return true
}

/** Every token suspended in this country and year, as a Set. */
export function suspendedInstitutions(countryName, year) {
  const out = new Set()
  for (const w of INSTITUTIONS_SUSPENDED) {
    if (w.country !== countryName) continue
    if (year < w.from || year > w.to) continue
    for (const t of w.what) out.add(t)
  }
  return out
}

// The prose that makes the claim. An event or a texture line naming one of
// these is asserting that the thing exists, so it must not print in a year
// when it did not.
export const INSTITUTION_PROSE = [
  ['school', /\bat school\b|school gate|in the classroom|secondary school|your teacher\b|the schoolroom|school uniform|your classmates|the lesson\b|the exam\b|final exams|university|the headmaster|the principal\b/i],
  ['wages', /your salary|the salary|a raise\b|payday|your wages|the promotion|your employer|the office\b|paid monthly|your pension|the payslip|the wages have/i],
  // Deliberately broad. These windows cover a handful of country-years, and in
  // those years dropping a line that would have been fine costs one sentence,
  // while printing one costs the player a false fact about the place. "Rent is
  // owed" slipped through a narrower version of this.
  ['money', /\bmoney\b|\bcash\b|\brent\b|\bwages?\b|\bsalar(y|ies)\b|the bank\b|your savings|the price of|you can afford|the shop\b|\bmarket\b|the currency|your account\b|the prices\b|who holds the contracts|\bpaid\b/i],
  ['clinic', /the clinic\b|the hospital\b|your doctor|the pharmacy|a prescription|the psychiatrist|the surgery\b|the nurse\b/i],
  ['post', /the postman|a letter arrives|in the post\b|the post office/i],
  ['city', /the city centre|downtown|the traffic\b|the apartment block|the high street|the boulevard|electrif|the power (comes|is) (on|back)|the first light bulb|the grid\b|the meters?\b|the government line|power lines?\b|the cables\b/i],
  // 'religion' was in the Democratic Kampuchea row and matched nothing, so a
  // Catholic girl of sixteen in 1976 was told about the priest's manner in the
  // confession booth, a year after the cathedral in Phnom Penh was taken down
  // stone by stone.
  ['religion', /confession|the priest\b|\bmass\b|the church\b|the pagoda|the temple\b|the monks?\b|the mosque|the imam\b|the sermon|the congregation|the pew\b|communion|the service\b|\bprayers?\b|the fast\b|ramadan|the rosary/i],
]

/**
 * Which suspended institutions does this line assume? Empty array when none,
 * which is the overwhelming majority and the fast path.
 */
export function institutionsAssumed(text) {
  if (typeof text !== 'string' || !text) return []
  const out = []
  for (const [k, re] of INSTITUTION_PROSE) if (re.test(text)) out.push(k)
  return out
}

/**
 * Can this line be printed for a character in this country in this year?
 *
 * Applied to year texture and the mundane layer as well as to events, because
 * a Cambodian in 1977 was being told that the prices had risen and the wages
 * had not caught up, four years after Democratic Kampuchea abolished both.
 */
export function proseFitsInstitutions(text, countryName, year) {
  const gone = suspendedInstitutions(countryName, year)
  if (gone.size === 0) return true
  return !institutionsAssumed(text).some(k => gone.has(k))
}

/**
 * WAR_YEARS — when a country was actually at war, and how hard.
 *
 * `country.conflictRisk` is a single present-day number, and every reader
 * applied it to every year of every life: a Syrian teenager in 1995, twenty
 * years before the civil war, died at wartime rates (one did, at seventeen,
 * of "complications from injury"), a Bosnian in 1980 carried the siege's
 * mortality through Tito's Yugoslavia, and a German in 1943 carried
 * present-day Germany's 0.01. It is `isWealthyArch` again: a statement about
 * now, read as history.
 *
 * Each span is [from, to, intensity], where intensity is on the scale the
 * engine already reads conflictRisk on. Outside every span a country has its
 * peacetime baseline — the static figure capped at PEACETIME_CAP, because the
 * large static values were describing a war, not the country.
 */
const PEACETIME_CAP = 0.03

export const WAR_YEARS = {
  // The world war, which the static column did not know about at all.
  Germany: [[1939, 1943, 0.25], [1944, 1945, 0.45]],
  Poland: [[1939, 1945, 0.55]],
  Russia: [[1918, 1922, 0.35], [1941, 1945, 0.5], [1994, 1996, 0.04], [1999, 2003, 0.04]],
  Ukraine: [[1918, 1922, 0.35], [1941, 1945, 0.6], [2014, 2021, 0.05], [2022, 2026, 0.3]],
  Belarus: [[1941, 1945, 0.65]],
  Lithuania: [[1941, 1945, 0.35]],
  Latvia: [[1941, 1945, 0.3]],
  Estonia: [[1941, 1945, 0.25]],
  Japan: [[1937, 1943, 0.12], [1944, 1945, 0.35]],
  China: [[1927, 1936, 0.08], [1937, 1949, 0.3]],
  'United Kingdom': [[1939, 1945, 0.08]],
  France: [[1939, 1945, 0.12], [1954, 1962, 0.02]],
  Netherlands: [[1940, 1945, 0.12]],
  Belgium: [[1940, 1945, 0.1]],
  Italy: [[1940, 1945, 0.15]],
  Greece: [[1940, 1949, 0.25]],
  Hungary: [[1944, 1945, 0.3], [1956, 1956, 0.05]],
  Austria: [[1944, 1945, 0.12]],
  'Czech Republic': [[1944, 1945, 0.1]],
  Serbia: [[1941, 1945, 0.4], [1991, 1995, 0.04], [1998, 1999, 0.08]],
  Croatia: [[1941, 1945, 0.4], [1991, 1995, 0.2]],
  Slovenia: [[1941, 1945, 0.3], [1991, 1991, 0.02]],
  'Bosnia and Herzegovina': [[1941, 1945, 0.45], [1992, 1995, 0.45]],
  Finland: [[1939, 1944, 0.12]],
  Norway: [[1940, 1945, 0.05]],
  Denmark: [[1940, 1945, 0.02]],
  Spain: [[1936, 1939, 0.3]],
  Philippines: [[1941, 1945, 0.25], [1969, 2019, 0.03]],
  Indonesia: [[1942, 1949, 0.2], [1965, 1966, 0.1]],
  Singapore: [[1942, 1945, 0.2]],
  Malaysia: [[1942, 1945, 0.15], [1948, 1960, 0.04]],
  Myanmar: [[1942, 1945, 0.2], [1948, 2020, 0.08], [2021, 2026, 0.25]],
  // Asia after 1945
  'South Korea': [[1950, 1953, 0.45]],
  'North Korea': [[1950, 1953, 0.5]],
  Vietnam: [[1946, 1954, 0.2], [1955, 1975, 0.3], [1979, 1979, 0.05]],
  Cambodia: [[1970, 1979, 0.4], [1980, 1991, 0.1]],
  Laos: [[1960, 1975, 0.2]],
  India: [[1947, 1947, 0.12], [1962, 1962, 0.01], [1965, 1965, 0.01], [1971, 1971, 0.01]],
  Pakistan: [[1947, 1947, 0.2], [1965, 1965, 0.03], [1971, 1971, 0.08], [2004, 2015, 0.08]],
  Bangladesh: [[1947, 1947, 0.1], [1971, 1971, 0.4]],
  'Sri Lanka': [[1983, 2009, 0.12]],
  Nepal: [[1996, 2006, 0.08]],
  'East Timor': [[1975, 1980, 0.4], [1981, 1999, 0.15]],
  Afghanistan: [[1978, 2001, 0.35], [2002, 2021, 0.2]],
  Tajikistan: [[1992, 1997, 0.25]],
  Armenia: [[1988, 1994, 0.15], [2020, 2020, 0.1]],
  Azerbaijan: [[1988, 1994, 0.15], [2020, 2020, 0.08]],
  Georgia: [[1991, 1993, 0.1], [2008, 2008, 0.05]],
  Moldova: [[1992, 1992, 0.1]],
  // The Middle East
  Iran: [[1980, 1988, 0.12]],
  Iraq: [[1961, 1970, 0.05], [1980, 1988, 0.3], [1991, 1991, 0.3], [2003, 2008, 0.4], [2009, 2013, 0.15], [2014, 2017, 0.3]],
  Syria: [[1982, 1982, 0.08], [2011, 2019, 0.4], [2020, 2026, 0.15]],
  Lebanon: [[1975, 1990, 0.3], [2006, 2006, 0.15], [2024, 2024, 0.1]],
  Israel: [[1948, 1949, 0.2], [1967, 1967, 0.04], [1973, 1973, 0.06], [2023, 2024, 0.04]],
  Palestine: [[1948, 1949, 0.3], [1967, 1967, 0.2], [1987, 1993, 0.1], [2000, 2005, 0.15], [2008, 2009, 0.2], [2014, 2014, 0.2], [2023, 2026, 0.45]],
  Yemen: [[1962, 1970, 0.2], [1986, 1986, 0.1], [1994, 1994, 0.1], [2014, 2026, 0.38]],
  Kuwait: [[1990, 1991, 0.1]],
  Cyprus: [[1963, 1964, 0.08], [1974, 1974, 0.15]],
  Turkey: [[1984, 1999, 0.04]],
  Egypt: [[1967, 1967, 0.03], [1973, 1973, 0.03]],
  Libya: [[2011, 2011, 0.3], [2014, 2020, 0.15]],
  Algeria: [[1954, 1962, 0.25], [1991, 2002, 0.2]],
  // Africa
  Nigeria: [[1967, 1970, 0.2], [2009, 2026, 0.08]],
  'DR Congo': [[1960, 1965, 0.2], [1996, 2003, 0.3], [2004, 2026, 0.15]],
  Ethiopia: [[1974, 1991, 0.2], [1998, 2000, 0.1], [2020, 2022, 0.25]],
  Eritrea: [[1961, 1991, 0.2], [1998, 2000, 0.2]],
  Sudan: [[1955, 1972, 0.2], [1983, 2005, 0.25], [2023, 2026, 0.4]],
  Uganda: [[1971, 1979, 0.15], [1980, 1986, 0.25], [1987, 2006, 0.1]],
  Angola: [[1961, 1974, 0.15], [1975, 2002, 0.25]],
  Mozambique: [[1964, 1974, 0.1], [1977, 1992, 0.25], [2017, 2026, 0.05]],
  Zimbabwe: [[1972, 1979, 0.1], [1983, 1987, 0.05]],
  Namibia: [[1966, 1989, 0.05]],
  'South Africa': [[1984, 1994, 0.04]],
  Kenya: [[1952, 1960, 0.08], [2007, 2008, 0.03]],
  Rwanda: [[1990, 1993, 0.1], [1994, 1994, 0.6], [1995, 1998, 0.08]],
  Somalia: [[1988, 1995, 0.4], [1996, 2005, 0.2], [2006, 2026, 0.25]],
  Liberia: [[1989, 1997, 0.35], [1999, 2003, 0.35]],
  'Sierra Leone': [[1991, 2002, 0.3]],
  'Central African Republic': [[1996, 1997, 0.1], [2003, 2011, 0.12], [2012, 2026, 0.35]],
  Chad: [[1965, 1978, 0.2], [1979, 1987, 0.3], [2005, 2010, 0.15]],
  Niger: [[1990, 1995, 0.08], [2007, 2009, 0.08], [2015, 2026, 0.2]],
  Mali: [[1990, 1996, 0.08], [2012, 2026, 0.3]],
  'Burkina Faso': [[2015, 2026, 0.3]],
  Cameroon: [[1955, 1971, 0.12], [2014, 2026, 0.2]],
  'Ivory Coast': [[2002, 2007, 0.2], [2010, 2011, 0.3]],
  Guinea: [[2000, 2001, 0.05]],
  Djibouti: [[1991, 1994, 0.1]],
  // The Americas: wars, and the violence that was not called a war
  Colombia: [[1948, 1958, 0.15], [1964, 2016, 0.08]],
  Peru: [[1980, 1999, 0.08]],
  Guatemala: [[1960, 1977, 0.08], [1978, 1984, 0.25], [1985, 1996, 0.08]],
  'El Salvador': [[1979, 1992, 0.3], [1993, 2019, 0.1]],
  Nicaragua: [[1978, 1979, 0.25], [1981, 1990, 0.2]],
  Honduras: [[2005, 2020, 0.1]],
  Mexico: [[2006, 2026, 0.08]],
  Jamaica: [[1976, 1980, 0.15], [1981, 2020, 0.08]],
  'Trinidad and Tobago': [[2005, 2020, 0.08]],
  Haiti: [[1991, 1994, 0.08], [2004, 2004, 0.08], [2021, 2026, 0.12]],
  Guyana: [[1962, 1964, 0.08], [2002, 2008, 0.06]],
  Argentina: [[1976, 1983, 0.03], [1982, 1982, 0.02]],
  Chile: [[1973, 1974, 0.03]],
  'Papua New Guinea': [[1988, 1998, 0.08]],
  Albania: [[1997, 1997, 0.08]],
}

/**
 * The conflict risk a character faces in `year` in `country` — the figure
 * every mortality and war-texture guard should read instead of the static
 * `conflictRisk` field.
 */
export function conflictRiskAt(country, year) {
  const name = country?.name ?? country
  const peacetime = Math.min(country?.conflictRisk ?? 0, PEACETIME_CAP)
  const spans = WAR_YEARS[name]
  if (!spans) return peacetime
  let risk = peacetime
  for (const [a, b, r] of spans) if (year >= a && year <= b && r > risk) risk = r
  return risk
}

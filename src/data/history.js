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
  'Peru': [1962, 1968, 1975],
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
  ['city', /the city centre|downtown|the traffic\b|the apartment block|the high street|the boulevard|electrif|the power (comes|is) (on|back)|the first light bulb|the grid\b/i],
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

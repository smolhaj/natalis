// Utility helpers for country flags, regime labels, religion labels, residency labels.
import { INDEPENDENCE_YEAR, conflictRiskAt, suspendedInstitutions, SOVIET_REPUBLICS, WARSAW_PACT } from '../data/history.js'

function codeToFlag(code) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  ).join('')
}

const COUNTRY_ISO = {
  // Every playable country needs an entry here; `tests/countries.test.js`
  // asserts the table covers the roster, because a missing code renders as a
  // blank white flag in the header for every year of that life — and half the
  // roster was doing exactly that.
  'United States': 'US', 'Canada': 'CA', 'United Kingdom': 'GB',
  'Germany': 'DE', 'France': 'FR', 'Sweden': 'SE', 'Norway': 'NO',
  'Denmark': 'DK', 'Finland': 'FI', 'Netherlands': 'NL', 'Belgium': 'BE',
  'Switzerland': 'CH', 'Austria': 'AT', 'Spain': 'ES', 'Portugal': 'PT',
  'Italy': 'IT', 'Greece': 'GR', 'Ireland': 'IE', 'Cyprus': 'CY',
  'Iceland': 'IS',
  'Australia': 'AU', 'New Zealand': 'NZ', 'Fiji': 'FJ',
  'Papua New Guinea': 'PG', 'Samoa': 'WS', 'Kiribati': 'KI',
  'Tuvalu': 'TV', 'Marshall Islands': 'MH', 'Vanuatu': 'VU',

  'Japan': 'JP', 'South Korea': 'KR', 'North Korea': 'KP', 'Taiwan': 'TW',
  'China': 'CN', 'Mongolia': 'MN', 'Singapore': 'SG', 'Malaysia': 'MY',
  'Vietnam': 'VN', 'Laos': 'LA', 'Cambodia': 'KH', 'Thailand': 'TH',
  'Myanmar': 'MM', 'Philippines': 'PH', 'Indonesia': 'ID',
  'East Timor': 'TL', 'Maldives': 'MV',

  'Russia': 'RU', 'Ukraine': 'UA', 'Belarus': 'BY', 'Poland': 'PL',
  'Czech Republic': 'CZ', 'Slovakia': 'SK', 'Hungary': 'HU',
  'Romania': 'RO', 'Bulgaria': 'BG', 'Serbia': 'RS', 'Albania': 'AL',
  'Bosnia and Herzegovina': 'BA', 'Estonia': 'EE', 'Latvia': 'LV',
  'Lithuania': 'LT', 'Moldova': 'MD', 'Croatia': 'HR', 'Slovenia': 'SI',
  'Georgia': 'GE', 'Armenia': 'AM', 'Azerbaijan': 'AZ',
  'Kazakhstan': 'KZ', 'Uzbekistan': 'UZ', 'Kyrgyzstan': 'KG',
  'Tajikistan': 'TJ', 'Turkmenistan': 'TM',

  'India': 'IN', 'Pakistan': 'PK', 'Bangladesh': 'BD', 'Sri Lanka': 'LK',
  'Nepal': 'NP', 'Bhutan': 'BT', 'Afghanistan': 'AF',

  'Turkey': 'TR', 'Iran': 'IR', 'Iraq': 'IQ', 'Syria': 'SY',
  'Lebanon': 'LB', 'Israel': 'IL', 'Palestine': 'PS', 'Jordan': 'JO',
  'Saudi Arabia': 'SA', 'UAE': 'AE', 'Qatar': 'QA', 'Bahrain': 'BH',
  'Kuwait': 'KW', 'Oman': 'OM', 'Yemen': 'YE',

  'Egypt': 'EG', 'Libya': 'LY', 'Tunisia': 'TN', 'Algeria': 'DZ',
  'Morocco': 'MA', 'Sudan': 'SD', 'Ethiopia': 'ET', 'Eritrea': 'ER',
  'Djibouti': 'DJ', 'Somalia': 'SO', 'Kenya': 'KE', 'Uganda': 'UG',
  'Tanzania': 'TZ', 'Rwanda': 'RW', 'DR Congo': 'CD', 'Angola': 'AO',
  'Zambia': 'ZM', 'Zimbabwe': 'ZW', 'Mozambique': 'MZ', 'Namibia': 'NA',
  'South Africa': 'ZA', 'Nigeria': 'NG', 'Ghana': 'GH', 'Senegal': 'SN',
  'Mali': 'ML', 'Guinea': 'GN', 'Burkina Faso': 'BF', 'Ivory Coast': 'CI',
  'Cameroon': 'CM', 'Liberia': 'LR', 'Sierra Leone': 'SL', 'Chad': 'TD',
  'Niger': 'NE', 'Togo': 'TG', 'Benin': 'BJ',
  'Central African Republic': 'CF',

  'Brazil': 'BR', 'Mexico': 'MX', 'Argentina': 'AR', 'Chile': 'CL',
  'Colombia': 'CO', 'Venezuela': 'VE', 'Peru': 'PE', 'Bolivia': 'BO',
  'Ecuador': 'EC', 'Uruguay': 'UY', 'Paraguay': 'PY', 'Guyana': 'GY',
  'Guatemala': 'GT', 'El Salvador': 'SV', 'Honduras': 'HN',
  'Nicaragua': 'NI', 'Belize': 'BZ', 'Cuba': 'CU', 'Haiti': 'HT',
  'Dominican Republic': 'DO', 'Jamaica': 'JM', 'Barbados': 'BB',
  'Trinidad and Tobago': 'TT', 'Puerto Rico': 'PR',
}

/** Exposed so the test suite can assert this table covers the roster. */
export const FLAGGED_COUNTRIES = Object.keys(COUNTRY_ISO)

// Returns the country's name as it was known at `birthYear`, if different from current name.
// Uses `historicalNames: [{ from?, until, name }]` array on country objects.
export function getCountryDisplayName(country, birthYear) {
  if (!country) return ''
  if (!country.historicalNames || country.historicalNames.length === 0) return country.name
  const match = country.historicalNames
    .filter(h => birthYear <= h.until && birthYear >= (h.from ?? 0))
    .sort((a, b) => b.until - a.until)[0]
  return match ? match.name : country.name
}

// Returns display string like "Russia (born in the Soviet Union)" when historical name differs.
export function getCountryDisplayWithHistory(country, birthYear) {
  if (!country) return ''
  const historical = getCountryDisplayName(country, birthYear)
  if (historical === country.name) return country.name
  return `${country.name} (then ${historical})`
}

// The years the flag an emoji draws has been the flag of that country. The
// header showed the flag of Bangladesh beside "British India, 1938" and the
// flag of Zimbabwe over a Rhodesian childhood in 1949. Before independence,
// before the state existed under that name, or before the present flag was
// adopted, the honest flag is none — an emoji cannot draw the old ones.
const FLAG_FROM = {
  'South Africa': 1994, 'Iran': 1980, 'Myanmar': 2010, 'Rwanda': 2001,
  'Iraq': 2008, 'Canada': 1965, 'Ethiopia': 1996, 'Germany': 1949,
  'Russia': 1991, 'Egypt': 1984, 'Vietnam': 1976, 'Cambodia': 1993,
  'Laos': 1975, 'Mozambique': 1983, 'Georgia': 2004, 'Belarus': 1995,
  'Bosnia and Herzegovina': 1998, 'Serbia': 2004, 'Kazakhstan': 1992,
  'Libya': 2011, 'Burkina Faso': 1984, 'Benin': 1990, 'Afghanistan': 2002,
  'Uganda': 1962, 'Malawi': 1964, 'Spain': 1981, 'Portugal': 1911,
  'Austria': 1945, 'Hungary': 1957, 'Romania': 1990, 'Bulgaria': 1990,
  'Albania': 1992, 'Poland': 1919, 'Mongolia': 1992, 'Syria': 1980,
  'Yemen': 1990, 'Kenya': 1963, 'Tanzania': 1964, 'Sudan': 1970,
  'Somalia': 1960, 'DR Congo': 2006, 'Angola': 1975, 'Zambia': 1964,
  'Uzbekistan': 1991, 'Turkmenistan': 1992, 'Tajikistan': 1992,
  'Kyrgyzstan': 1992, 'Azerbaijan': 1991, 'Armenia': 1990, 'Ukraine': 1992,
  'Estonia': 1990, 'Latvia': 1990, 'Lithuania': 1989, 'Moldova': 1990,
  'Croatia': 1990, 'Slovenia': 1991, 'Czech Republic': 1920, 'Slovakia': 1993,
  'Philippines': 1946, 'Indonesia': 1949, 'Ireland': 1922, 'Iceland': 1944,
  'Greece': 1978, 'Turkey': 1923, 'Israel': 1948, 'China': 1949,
  'Taiwan': 1949, 'North Korea': 1948, 'South Korea': 1948,
  'Saudi Arabia': 1973, 'Venezuela': 2006, 'Nicaragua': 1971, 'Haiti': 1986,
}
// The present flag went out of use, or the emoji flag stands for a state that
// had stopped existing in that form.
const FLAG_UNTIL = { 'Afghanistan': 2021, 'Libya': [1952, 1969] }

/**
 * The flag for a country, as it would have been flown in `year`. Without a
 * year, the present flag (the title screen's save slots, the roster test).
 * With one, an empty string where the emoji would be anachronistic.
 */
export function getCountryFlag(countryNameOrObj, year) {
  const name = typeof countryNameOrObj === 'string' ? countryNameOrObj : countryNameOrObj?.name
  const code = COUNTRY_ISO[name]
  if (!code) return '🏳'
  if (Number.isFinite(year) && !flagFitsYear(countryNameOrObj, year)) return ''
  return codeToFlag(code)
}

/** Was the present-day flag of this country flown in `year`? */
export function flagFitsYear(countryNameOrObj, year) {
  const name = typeof countryNameOrObj === 'string' ? countryNameOrObj : countryNameOrObj?.name
  const indep = INDEPENDENCE_YEAR[name]
  if (indep && year < indep) return false
  const from = FLAG_FROM[name]
  if (from && year < from) return false
  const until = FLAG_UNTIL[name]
  if (Array.isArray(until) ? (year >= until[0] && year < from) : (until && year > until)) return false
  // A historical name in force that year is a different state, or the same
  // state under a different flag (Rhodesia, East Pakistan, the Gold Coast).
  // Name changes that kept the flag are the exceptions.
  const country = typeof countryNameOrObj === 'object' ? countryNameOrObj : null
  if (country?.historicalNames?.length) {
    const hn = getCountryDisplayName(country, year)
    if (hn !== country.name && !SAME_FLAG_NAMES.has(hn)) return false
  }
  return true
}
const SAME_FLAG_NAMES = new Set(['Siam', 'Persia', 'the Kingdom of Iceland', 'Ceylon', 'Burma', 'Dahomey', 'Upper Volta', 'Western Samoa'])

/**
 * A place name as it sits in the middle of a sentence. Neighbourhood names are
 * sometimes descriptions ("The huts past the ring road"), and a capital T in
 * mid-sentence reads as a typo: "The water in The huts past the ring road".
 */
export function placeNameInSentence(name) {
  const s = String(name ?? '')
  return /^The [a-z]/.test(s) ? 't' + s.slice(1) : s
}

// `region` in countries.js files every Nordic country under "Western Europe",
// which is not what anybody in Stockholm would say. Display-side correction;
// the data still carries the old value.
const REGION_DISPLAY = {
  Sweden: 'Northern Europe', Norway: 'Northern Europe', Denmark: 'Northern Europe',
  Finland: 'Northern Europe', Iceland: 'Northern Europe',
  Austria: 'Central Europe', Switzerland: 'Central Europe',
  Italy: 'Southern Europe', Spain: 'Southern Europe', Portugal: 'Southern Europe',
}
export function getRegionLabel(country) {
  if (!country) return ''
  return REGION_DISPLAY[country.name] ?? country.region ?? ''
}

// ─── The country as it was in the birth year ─────────────────────────────────
//
// `country.context` describes the country NOW, and the birth preview printed
// it for every year: Sweden 1937 was introduced by its "recent immigration",
// Zimbabwe 1943 by the hundred-trillion-dollar note of 2008. These lines are
// derived from the dated tables — names, independence, war, the Soviet
// republics and the bloc, the years institutions stopped — plus a short table
// for the country-decades a derived line cannot say.
const ERA_NOTES = [
  ['Sweden', 1930, 1938, 'The people\'s home is being built: pensions, housing, a Social Democratic government that will last a generation.'],
  ['Sweden', 1939, 1945, 'Neutral while the war goes on at every border. Ration cards, and refugees arriving from Norway, Denmark and the Baltic.'],
  ['Sweden', 1946, 1975, 'The welfare state is new and expanding. Most people work in the place they were born.'],
  ['Zimbabwe', 1923, 1964, 'A self-governing British colony, run by and for a white minority of about one in twenty.'],
  ['Zimbabwe', 1965, 1979, 'A white-minority government has declared independence from Britain; a guerrilla war spreads through the countryside.'],
  ['Nigeria', 1960, 1966, 'Newly independent, oil just beginning to flow, three regions pulling against one federation.'],
  ['Nigeria', 1967, 1970, 'A civil war: the east has seceded as Biafra, and the blockade is starving it.'],
  ['Nigeria', 1971, 1980, 'An oil boom under military rule. Money is arriving faster than anything can be built to hold it.'],
  ['Nigeria', 1983, 1998, 'Military government, a falling naira, and a structural adjustment programme.'],
  ['Germany', 1919, 1928, 'A young republic, with the inflation of 1923 in everybody\'s memory.'],
  ['Germany', 1929, 1932, 'The Depression has arrived. Six million are out of work and the street fighting has begun.'],
  ['Germany', 1933, 1945, 'The Nazi state. Jewish neighbours are being stripped of everything; from 1939, a war.'],
  ['Germany', 1946, 1949, 'Defeated, occupied by four powers, with the cities in rubble and millions of expellees on the roads.'],
  ['Germany', 1950, 1989, 'Divided. The West rebuilt and prosperous; the East a one-party state behind a fortified border.'],
  ['India', 1930, 1946, 'British rule, a movement for independence in every town, and in 1943 famine in Bengal.'],
  ['India', 1947, 1950, 'Independent and partitioned. Millions are crossing the new border in both directions.'],
  ['Pakistan', 1947, 1950, 'A new state, partitioned out of British India, with millions arriving across the border.'],
  ['Bangladesh', 1948, 1970, 'The eastern wing of Pakistan, governed from a thousand miles away in a language most people here do not speak.'],
  ['China', 1937, 1945, 'At war with Japan, and divided between the Nationalists and the Communists.'],
  ['China', 1949, 1957, 'The People\'s Republic is new. Land is being taken from landlords and given out, for now.'],
  ['China', 1958, 1962, 'The Great Leap Forward. The communal kitchens are running out of food.'],
  ['China', 1966, 1976, 'The Cultural Revolution. Schools are closed and class background decides everything.'],
  ['China', 1978, 1995, 'Reform and opening. The communes are being dissolved and the coast is filling with factories.'],
  ['Russia', 1929, 1941, 'Collectivisation, then the Terror. People are careful about what they say in front of children.'],
  ['South Africa', 1948, 1993, 'Apartheid is law. Where a person may live, work, travel and marry is set by the race on their papers.'],
  ['Japan', 1937, 1945, 'At war in China, and from 1941 across the Pacific. Rice is rationed; sons are being called up.'],
  ['Japan', 1946, 1952, 'Defeated and occupied. The cities are burnt out and the black market is how people eat.'],
  ['Cambodia', 1975, 1979, 'The Khmer Rouge have emptied the cities and abolished money.'],
  ['Ethiopia', 1974, 1991, 'The Derg: a military committee has deposed the emperor and rules by terror.'],
  ['Iran', 1979, 1988, 'The Islamic Republic is new, and the war with Iraq has begun.'],
  ['South Korea', 1910, 1945, 'A Japanese colony. Korean names and the Korean language are being pushed out of the schools.'],
  ['North Korea', 1910, 1945, 'A Japanese colony. Korean names and the Korean language are being pushed out of the schools.'],
  ['Bangladesh', 1900, 1946, 'Eastern Bengal, under British rule. Independence from Britain comes in 1947, and then as the eastern wing of Pakistan.'],
]

// Independence in INDEPENDENCE_YEAR, but from an empire, a federation or a
// union rather than a colonial power: Czechoslovakia was not a colony.
const NOT_A_COLONY = new Set([
  'Turkey', 'Poland', 'Hungary', 'Czech Republic', 'Slovakia', 'Croatia', 'Slovenia',
  'Bosnia and Herzegovina', 'Serbia', 'Iceland', 'Afghanistan', 'Mongolia', 'Bulgaria',
  'Romania', 'Albania', 'Greece', 'Saudi Arabia', 'Yemen', 'Austria', 'Eritrea',
  'North Korea', 'South Korea', 'Bangladesh', 'Singapore',
])

function urbanShareAt(country, year) {
  const h = country?.urbanHistory
  if (!h) return null
  const ys = Object.keys(h).map(Number).sort((a, b) => a - b)
  if (year <= ys[0]) return h[ys[0]]
  for (let i = 1; i < ys.length; i++) {
    if (year <= ys[i]) {
      const [a, b] = [ys[i - 1], ys[i]]
      return h[a] + (h[b] - h[a]) * (year - a) / (b - a)
    }
  }
  return h[ys[ys.length - 1]]
}

/**
 * Two or three short sentences about the country as it was in `year`, for the
 * birth preview. Never `country.context` before 2000, which describes today.
 */
export function birthEraLines(country, year) {
  if (!country || !Number.isFinite(year)) return []
  const name = country.name
  const then = getCountryDisplayName(country, year)
  const lines = []
  const known = then !== name ? then : null
  const note = ERA_NOTES.find(([c, a, b]) => c === name && year >= a && year <= b)?.[3]
  const indep = INDEPENDENCE_YEAR[name]
  if (SOVIET_REPUBLICS.includes(name) && year >= 1922 && year < 1991) {
    lines.push(/Soviet Union/.test(known ?? '') ? `In ${year} this is the Soviet Union.` : `In ${year} this is ${known ?? name}, inside the Soviet Union.`)
  } else if (known === 'the United Kingdom') {
    lines.push(`In ${year} this is part of the United Kingdom. Independence will come in ${indep}.`)
  } else if (indep && year < indep && year >= 1850 && !NOT_A_COLONY.has(name) && !note?.includes('Independence')) {
    lines.push(note
      ? `In ${year} this is ${known ?? name}. Independence will come in ${indep}.`
      : `In ${year} this is ${known ?? name}, a colony. Independence will come in ${indep}.`)
  } else if (WARSAW_PACT.includes(name) && year >= 1948 && year < 1990) {
    lines.push(`In ${year} ${known ?? name} is a one-party state in the Soviet bloc.`)
  } else if (known) {
    lines.push(`In ${year} this is ${known}.`)
  }
  if (note) lines.push(note)
  else if (conflictRiskAt(country, year) >= 0.2) lines.push('There is a war on.')
  const off = suspendedInstitutions(name, year)
  if (off.has('school') && !note) lines.push('The schools are closed.')
  const u = urbanShareAt(country, year)
  if (u != null) {
    const n = Math.round(u * 10)
    lines.push(n <= 1 ? 'Almost everybody lives on the land.'
      : n >= 9 ? 'Almost everybody lives in a town or a city.'
      : `About ${n} people in ten live in a town or a city; the rest live on the land.`)
  }
  if (year >= 2000 && country.context) lines.push(country.context)
  return lines
}

export const REGIME_LABELS = {
  federal_republic:           'Republic',
  parliamentary_republic:     'Parliamentary Republic',
  constitutional_monarchy:    'Constitutional Monarchy',
  absolute_monarchy:          'Absolute Monarchy',
  military_dictatorship:      'Military Dictatorship',
  single_party_communist:     'One-Party Communist',
  single_party_authoritarian: 'Authoritarian State',
  theocracy:                  'Theocracy',
  democracy:                  'Democracy',
}

export const REGIME_COLORS = {
  federal_republic:           '#3f6146',
  parliamentary_republic:     '#3f6146',
  constitutional_monarchy:    '#3f6146',
  absolute_monarchy:          '#8a6635',
  military_dictatorship:      '#8c3a2e',
  single_party_communist:     '#8c3a2e',
  single_party_authoritarian: '#8c3a2e',
  theocracy:                  '#8a6635',
  democracy:                  '#3f6146',
}

// Thirteen labels against 31 religion ids in the country data, so the curated
// birth wizard's religion list read "Sunni Muslim / Protestant /
// christian_pentecostal / Animist / Catholic" — raw enum ids shown to the
// player in Nigeria, Brazil, Kenya, DR Congo, Ghana, Jamaica, Chile, Guatemala
// and 10 others. `christian_pentecostal` in particular was added to Brazil and
// Nigeria by the identity-in-country audit precisely because that church is
// largest there, and it has been rendering as a snake_case id ever since.
// `tests/countries.test.js` now asserts the table covers the data.
export const RELIGION_LABELS = {
  christian_catholic:    'Catholic',
  christian_protestant:  'Protestant',
  christian_orthodox:    'Orthodox Christian',
  christian_pentecostal: 'Pentecostal',
  christian_evangelical: 'Evangelical',
  christian_lutheran:    'Lutheran',
  christian_methodist:   'Methodist',
  christian_maronite:    'Maronite Christian',
  christian_armenian:    'Armenian Apostolic',
  christian_kimbanguist: 'Kimbanguist',
  christian_zionist:     'Zionist Christian',
  christian_arab:        'Arab Christian',
  christian_underground: 'Underground Christian',
  christian_other:       'Christian',
  muslim_sunni:          'Sunni Muslim',
  muslim_shia:           'Shia Muslim',
  muslim_sufi:           'Sufi Muslim',
  muslim_alawi:          'Alawite',
  muslim_druze:          'Druze',
  muslim_ahmadiyya:      'Ahmadi Muslim',
  muslim_other:          'Muslim',
  hindu:                 'Hindu',
  buddhist:              'Buddhist',
  sikh:                  'Sikh',
  jain:                  'Jain',
  jewish:                'Jewish',
  zoroastrian:           'Zoroastrian',
  yezidi:                'Yazidi',
  rastafari:             'Rastafari',
  secular:               'Secular',
  atheist:               'Atheist',
  animist:               'Animist',
  folk_religion:         'Folk Religion',
}

export const RESIDENCY_LABELS = {
  citizen:             'Citizen',
  permanent_resident:  'Permanent Resident',
  work_visa:           'Work Visa',
  student_visa:        'Student Visa',
  undocumented:        'Undocumented',
  refugee_status:      'Refugee Status',
  asylum_seeker:       'Asylum Seeker',
  tourist_overstay:    'Overstayed Visa',
  climate_displaced:   'Climate Displaced',
}

/**
 * "a" or "an", for a title the player reads. 34 career titles begin with a
 * vowel — Engineer, Architect, Accountant, Editor, Officer, Elite Athlete, IT
 * Director, Assembly Worker — and both the "Who you are" card (shown on the
 * Life tab every year) and the job-start line hardcoded "a", so a player saw
 * "working as a Inspector" for a whole career.
 *
 * The exceptions are the ones that matter in a career list: a *U*niversity
 * lecturer and a *E*uropean anything take "a"; an *H*onorary or *M*P-style
 * initialism takes "an".
 */
export function indefiniteArticle(word = '') {
  const w = String(word).trim()
  if (!w) return 'a'
  const first = w[0]
  // An initialism read letter by letter: IT Director, NGO Worker, MP.
  if (/^[A-Z]{2,}\b/.test(w)) return /^[AEFHILMNORSX]/.test(first) ? 'an' : 'a'
  if (/^(uni|use|user|usual|eu|one|once)/i.test(w)) return 'a'
  if (/^(hon|hour|heir)/i.test(w)) return 'an'
  return /^[aeiou]/i.test(first) ? 'an' : 'a'
}

/** `a Inspector` → `an Inspector`. */
export function withArticle(word = '') {
  return `${indefiniteArticle(word)} ${word}`
}

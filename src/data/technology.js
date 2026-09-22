// technology.js — when a thing actually arrived where the character lives.
//
// Written because the mundane layer was gating every technology line on
// `isWealthyArch`, which is an archetype — a statement about a country's
// position *now*. Read as a statement about the past it is wrong almost
// everywhere and spectacularly wrong in two places:
//
//   Oman is `wealthy_gulf`, so a 1931 Omani childhood got the horse-drawn cart
//   giving way to the motor car, a telephone in the hallway, a weekly trip to
//   the cinema and the newspaper folded in its usual order. Oman in 1931 had no
//   newspaper, no cinema, about ten kilometres of paved road, and a Sultan who
//   required a written permit to fit a door with a lock. Oil was not exported
//   until 1967.
//
//   Iceland is `wealthy_west`, so a 1950s Icelandic household had a television
//   reorganising its evenings. Icelandic broadcasting began in September 1966,
//   and for the six years before that the only signal reachable was the US Navy
//   transmitter at Keflavík, which the parliament debated restricting because
//   watching it was thought to be doing something to the language.
//
// So this file answers the two questions those lines actually need — "was this
// country materially rich in this year" and "had this thing reached a household
// here yet" — from arrival years rather than from present-day category.
//
// The figures are the year the thing became ordinary in a household of the
// median kind for the place, not the year it was invented, first imported, or
// first broadcast. They are approximations, and deliberately so: the prose only
// ever needs to know whether the character could plausibly be standing next to
// one. Where a country's history diverges sharply from its neighbours' the
// override is listed, because that divergence is usually the interesting fact.

// ── Material wealth ──────────────────────────────────────────────────────────
//
// The year a country became rich in the sense the domestic-interior prose
// assumes: a household with disposable income, appliances, a car outside. Every
// wealthy_gulf and wealthy_east country crossed this line inside living memory,
// and several wealthy_west ones did too — Ireland was poorer than Ghana in
// 1960 by some measures, and Korea's GDP per capita did not pass Nigeria's
// until the early seventies.

const WEALTH_FROM_ARCHETYPE = {
  wealthy_west: 1950,
  wealthy_east: 1980,
  wealthy_gulf: 1975,
  post_soviet: 9999,          // never, in the sense this prose means
  developing_urban: 9999,
  developing_unstable: 9999,
  subsaharan: 9999,
  conflict_zone: 9999,
}

export const MATERIAL_WEALTH_FROM = {
  // wealthy_west, which was not uniformly wealthy or uniformly early
  'United States': 1925,
  'Canada': 1935,
  'United Kingdom': 1935,
  'Switzerland': 1935,
  'Sweden': 1945,
  'Australia': 1940,
  'New Zealand': 1940,
  'Netherlands': 1950,
  'Belgium': 1950,
  'France': 1955,
  'Germany': 1958,            // the Wirtschaftswunder, not before it
  'Austria': 1960,
  'Norway': 1960,             // poor by Nordic standards until the oil
  'Italy': 1962,              // il boom
  'Iceland': 1970,
  'Israel': 1975,
  'Puerto Rico': 1975,
  'Spain': 1980,              // the desarrollismo years land here
  'Greece': 1985,
  'Portugal': 1992,           // the poorest country in Western Europe until EU accession
  'Ireland': 1996,            // the Celtic Tiger, and not one year before it

  // wealthy_east: all five crossed within living memory
  'Japan': 1968,
  'Singapore': 1985,
  'Taiwan': 1990,
  'South Korea': 1992,
  'Slovenia': 1998,

  // wealthy_gulf: the line is oil export plus roughly a decade of building
  'Kuwait': 1958,             // exporting from 1946
  'Bahrain': 1968,            // the first Gulf oil, 1932, and the smallest reserves
  'Saudi Arabia': 1972,
  'Qatar': 1975,
  'UAE': 1978,                // federation 1971
  'Oman': 1980,               // exporting from 1967, and Qaboos only from 1970
}

/** The year from which the domestic-comfort register is true of this country. */
export function materialWealthYear(country) {
  const name = typeof country === 'string' ? country : country?.name
  if (name && MATERIAL_WEALTH_FROM[name] !== undefined) return MATERIAL_WEALTH_FROM[name]
  const arch = typeof country === 'string' ? null : country?.archetype
  return WEALTH_FROM_ARCHETYPE[arch] ?? 9999
}

/**
 * Was this a materially comfortable country in this year? This is the guard
 * the interior-of-a-home lines need, and it is not the same question as the
 * archetype, which answers only "is it comfortable now".
 */
export function wasWealthy(country, year) {
  return year >= materialWealthYear(country)
}

// ── Technology arrival ───────────────────────────────────────────────────────
//
// Baselines by archetype, overridden per country where the country's own story
// diverges. Read as: the year an ordinary household in this place would have
// had one, or been near enough to one for the sentence to be true.

const BASE = {
  //                  w_west w_east w_gulf p_sov d_urb d_unst subsah conflict
  // Household electricity and piped water. Both are overwhelmingly a question
  // of city versus countryside rather than of national wealth, which the
  // `rural` adjustment in hasTech() carries: Berlin was lit in the 1900s and
  // parts of rural Bavaria were not until the 1950s.
  electricity:       [1925, 1940, 1960, 1935, 1955, 1965, 1985, 1985],
  piped_water:       [1930, 1945, 1965, 1940, 1965, 1975, 1995, 1995],
  radio:             [1925, 1935, 1950, 1935, 1945, 1950, 1955, 1955],
  cinema:            [1920, 1935, 1955, 1930, 1940, 1950, 1955, 1960],
  newspaper:         [1900, 1920, 1955, 1920, 1930, 1940, 1955, 1955],
  landline:          [1935, 1965, 1972, 1972, 1978, 1985, 1998, 1998],
  television:        [1956, 1962, 1970, 1962, 1972, 1978, 1985, 1985],
  colour_television: [1970, 1975, 1980, 1980, 1988, 1994, 1998, 1998],
  refrigerator:      [1952, 1968, 1974, 1970, 1985, 1992, 2002, 2002],
  washing_machine:   [1955, 1972, 1976, 1975, 1992, 1998, 2008, 2008],
  automobile:        [1955, 1972, 1975, 1988, 1998, 2008, 2012, 2012],
  cassette:          [1972, 1974, 1978, 1976, 1980, 1984, 1988, 1988],
  microwave:         [1982, 1986, 1986, 1996, 1998, 2006, 2012, 2012],
  vcr:               [1982, 1984, 1986, 1990, 1992, 1996, 2000, 2000],
  personal_computer: [1988, 1990, 1992, 1998, 2000, 2006, 2010, 2010],
  mobile_phone:      [1996, 1996, 1997, 2001, 2003, 2005, 2006, 2007],
  email:             [1996, 1997, 1999, 2002, 2003, 2006, 2008, 2009],
  home_internet:     [1999, 1999, 2002, 2005, 2007, 2010, 2013, 2014],
  smartphone:        [2010, 2010, 2011, 2013, 2014, 2016, 2017, 2018],
  streaming:         [2013, 2013, 2014, 2016, 2017, 2020, 2021, 2022],
  video_call:        [2012, 2012, 2013, 2014, 2015, 2017, 2018, 2019],
}

const ARCH_INDEX = {
  wealthy_west: 0, wealthy_east: 1, wealthy_gulf: 2, post_soviet: 3,
  developing_urban: 4, developing_unstable: 5, subsaharan: 6, conflict_zone: 7,
}

// Where a country's own history is the point. Most of these are facts worth a
// player knowing: that South Africa banned television until 1976 because
// Albert Hertzog called it "the devil's own box", that Bhutan and Vanuatu
// permitted it in 1999, that the BBC went off air mid-cartoon in September
// 1939 and came back in June 1946 with the same announcer.
export const TECH_OVERRIDES = {
  television: {
    'United States': 1951, 'United Kingdom': 1955, 'Canada': 1955, 'France': 1961,
    'Netherlands': 1960, 'Belgium': 1960, 'Germany': 1958, 'Austria': 1960,
    'Sweden': 1960, 'Norway': 1963, 'Switzerland': 1960, 'Italy': 1960,
    'Australia': 1960, 'New Zealand': 1963, 'Spain': 1964, 'Portugal': 1966,
    'Greece': 1970, 'Ireland': 1964,
    'Iceland': 1966,              // no broadcasting at all before September 1966
    'Israel': 1968,               // Ben-Gurion opposed it as a corrupting luxury
    'South Africa': 1976,         // banned outright until then
    'Japan': 1960, 'South Korea': 1970, 'Taiwan': 1968, 'Singapore': 1966,
    'Kuwait': 1965, 'Saudi Arabia': 1968, 'Bahrain': 1975, 'Qatar': 1974,
    'UAE': 1972, 'Oman': 1978,    // Oman's first broadcast was 1974
    'Russia': 1962, 'Poland': 1965, 'Hungary': 1965, 'Czech Republic': 1965,
    'Romania': 1970, 'Bulgaria': 1970, 'Serbia': 1968, 'Croatia': 1968,
    'Slovenia': 1966, 'Estonia': 1963, 'Latvia': 1963, 'Lithuania': 1963,
    'Mongolia': 1975, 'Turkmenistan': 1970, 'Uzbekistan': 1968,
    'Brazil': 1965, 'Mexico': 1962, 'Argentina': 1965, 'Chile': 1970,
    'Cuba': 1958,                 // among the first in Latin America, pre-revolution
    'Venezuela': 1965, 'Colombia': 1968, 'Peru': 1972,
    'India': 1984,                // one channel until then, and mass ownership later
    'China': 1985, 'Vietnam': 1985, 'Indonesia': 1978, 'Philippines': 1972,
    'Thailand': 1972, 'Malaysia': 1972, 'Turkey': 1972, 'Egypt': 1968,
    'Iran': 1970, 'Pakistan': 1978, 'Bangladesh': 1982, 'Sri Lanka': 1985,
    'Nepal': 1988, 'Cambodia': 1990, 'Laos': 1992,
    'Bhutan': 1999,               // legalised, along with the internet, in June 1999
    'Vanuatu': 1993,
    'North Korea': 1975,          // a set, tuned to the state channel and sealed
    'Nigeria': 1972, 'Ghana': 1970, 'Kenya': 1975, 'Ethiopia': 1980,
    'Tanzania': 1996,             // the mainland had no television service until 1994
    'Uganda': 1978, 'Senegal': 1975, 'Mozambique': 1990, 'Rwanda': 1995,
    'DR Congo': 1980, 'Guinea': 1985, 'Mali': 1985, 'Burkina Faso': 1985,
    'Eritrea': 1995, 'Namibia': 1985, 'Zimbabwe': 1975,
    'Afghanistan': 1980, 'Somalia': 1985, 'Yemen': 1978, 'Syria': 1970,
    'Myanmar': 1985, 'Palestine': 1995, 'Haiti': 1985,
  },
  electricity: {
    'United States': 1920, 'United Kingdom': 1925, 'Germany': 1920, 'France': 1930,
    'Netherlands': 1925, 'Belgium': 1928, 'Switzerland': 1915, 'Austria': 1925,
    'Sweden': 1925, 'Norway': 1920, 'Iceland': 1930, 'Ireland': 1946,
    'Italy': 1935, 'Spain': 1940, 'Portugal': 1955, 'Greece': 1950,
    'Japan': 1935, 'South Korea': 1968, 'Taiwan': 1965, 'Singapore': 1960,
    'Russia': 1935, 'Poland': 1945, 'Czech Republic': 1935, 'Hungary': 1940,
    'Oman': 1975, 'Saudi Arabia': 1965, 'Kuwait': 1955, 'Qatar': 1965, 'UAE': 1968,
    'Bhutan': 1995, 'Nepal': 1990, 'Ethiopia': 1998, 'Nigeria': 1985,
    'India': 1985, 'China': 1980, 'Brazil': 1970, 'Mexico': 1970,
  },
  piped_water: {
    'United States': 1925, 'United Kingdom': 1925, 'Germany': 1925, 'France': 1935,
    'Netherlands': 1925, 'Switzerland': 1920, 'Austria': 1930, 'Sweden': 1930,
    'Iceland': 1935, 'Ireland': 1955, 'Italy': 1945, 'Spain': 1955,
    'Portugal': 1965, 'Greece': 1960, 'Japan': 1950, 'South Korea': 1975,
    'Russia': 1955, 'Poland': 1960, 'Oman': 1980, 'Kuwait': 1960,
    'Bhutan': 2000, 'Nepal': 1998, 'Ethiopia': 2005, 'Nigeria': 1995,
  },
  radio: {
    'Oman': 1972,                 // Radio Oman opened in 1970; sets were rare before
    'Bhutan': 1973, 'Nepal': 1955, 'Saudi Arabia': 1952, 'Qatar': 1968,
    'UAE': 1969, 'Vanuatu': 1966, 'North Korea': 1950,
  },
  newspaper: {
    'Oman': 1972,                 // the first Omani newspaper appeared in 1970
    'Bhutan': 1986,               // Kuensel became a newspaper proper that year
    'Saudi Arabia': 1955, 'Qatar': 1969, 'UAE': 1970, 'Vanuatu': 1975,
  },
  cinema: {
    'Oman': 1980,
    'Saudi Arabia': 2018,         // cinemas were banned for thirty-five years
    'Bhutan': 1990, 'Afghanistan': 1960, 'Vanuatu': 1980, 'Bahrain': 1937,
  },
  automobile: {
    'Oman': 1978,                 // there were about ten kilometres of paved road in 1970
    'Bhutan': 2005, 'Nepal': 2005, 'Iceland': 1960, 'Ireland': 1975,
    'Portugal': 1985, 'Greece': 1980, 'Japan': 1968, 'South Korea': 1992,
    'Taiwan': 1990, 'Singapore': 1990, 'Saudi Arabia': 1972, 'Kuwait': 1962,
  },
  landline: {
    'Oman': 1982, 'Bhutan': 1995, 'Iceland': 1935,
    // The leapfrog: most of sub-Saharan Africa never had household landlines
    // and went straight from nothing to the mobile.
    'Nigeria': 9999, 'Kenya': 9999, 'Tanzania': 9999, 'Uganda': 9999,
    'Ethiopia': 9999, 'Mozambique': 9999, 'Rwanda': 9999, 'DR Congo': 9999,
    'Guinea': 9999, 'Mali': 9999, 'Burkina Faso': 9999, 'Eritrea': 9999,
  },
  mobile_phone: {
    'Kenya': 2004,                // M-Pesa launched into a country already carrying them
    'Nigeria': 2004, 'Ghana': 2005, 'Tanzania': 2006, 'Bhutan': 2006,
    'Cuba': 2009,                 // private ownership was illegal until 2008
    'North Korea': 2012,          // Koryolink, and only on the domestic network
    'Myanmar': 2014,              // a SIM card cost ~$2,000 before the 2013 licensing
    'Eritrea': 2010, 'Somalia': 2005, 'Afghanistan': 2006,
  },
  home_internet: {
    'Bhutan': 2001,               // legalised the same day as television, June 1999
    'North Korea': 9999,          // there is an intranet; there is not an internet
    'Cuba': 2018,                 // home connections were not legal until then
    'Eritrea': 2020, 'Turkmenistan': 2015, 'Myanmar': 2014, 'Somalia': 2015,
  },
  smartphone: {
    'North Korea': 2019, 'Cuba': 2019, 'Eritrea': 2022, 'Turkmenistan': 2018,
    'Myanmar': 2016, 'Bhutan': 2015, 'Somalia': 2017, 'Afghanistan': 2018,
  },
  personal_computer: { 'Cuba': 2008, 'North Korea': 2005, 'Bhutan': 2002, 'Oman': 1995 },
  microwave: { 'Oman': 1990, 'Kuwait': 1985, 'Saudi Arabia': 1988, 'Iceland': 1988, 'Ireland': 1992, 'Portugal': 1998 },
  refrigerator: { 'United States': 1940, 'Canada': 1946, 'Oman': 1982, 'Kuwait': 1968, 'Saudi Arabia': 1976, 'Iceland': 1958, 'Ireland': 1968, 'Portugal': 1978, 'Greece': 1972 },
  washing_machine: { 'Oman': 1988, 'Iceland': 1962, 'Ireland': 1975, 'Portugal': 1985, 'Greece': 1980, 'Japan': 1968, 'South Korea': 1990 },
  colour_television: { 'Oman': 1978, 'Iceland': 1976, 'South Africa': 1976, 'Israel': 1980, 'India': 1982, 'Bhutan': 1999, 'Ireland': 1972 },
  email: { 'Cuba': 2015, 'North Korea': 9999, 'Bhutan': 2003, 'Oman': 1999 },
  vcr: { 'Oman': 1985, 'Bhutan': 1995, 'North Korea': 1995 },
  streaming: { 'North Korea': 9999, 'Cuba': 2021, 'Eritrea': 9999 },
  video_call: { 'North Korea': 9999, 'Cuba': 2020, 'Eritrea': 2022 },
  cassette: { 'Oman': 1978, 'Bhutan': 1985 },
}

/** The year `tech` became ordinary in a household in `country`. */
export function techYear(country, tech) {
  const row = BASE[tech]
  if (!row) return 9999
  const name = typeof country === 'string' ? country : country?.name
  const over = TECH_OVERRIDES[tech]?.[name]
  if (over !== undefined) return over
  const arch = typeof country === 'string' ? null : country?.archetype
  const i = ARCH_INDEX[arch]
  return i === undefined ? row[4] : row[i]
}

/**
 * Could an ordinary household in this country, in this year, have had one?
 *
 * `opts.rural` pushes the date later, which is most of the gap between a
 * capital and a village and is the difference between a sentence being true
 * and being true of somebody else. `opts.rich` pulls it earlier — a wealthy
 * household is always first, everywhere, and the size of that head start is
 * larger in a poor country than a rich one.
 */
export function hasTech(country, tech, year, opts = {}) {
  let y = techYear(country, tech)
  if (y >= 9000) return false
  const arch = typeof country === 'string' ? null : country?.archetype
  const poor = !['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
  if (opts.rural) y += poor ? 12 : 5
  if (opts.rich) y -= poor ? 12 : 5
  return year >= y
}

/** Every technology whose name this module knows, for the audits. */
export const TECH_KEYS = Object.keys(BASE)

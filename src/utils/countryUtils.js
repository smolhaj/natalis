// Utility helpers for country flags, regime labels, religion labels, residency labels.

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

export function getCountryFlag(countryNameOrObj) {
  const name = typeof countryNameOrObj === 'string' ? countryNameOrObj : countryNameOrObj?.name
  const code = COUNTRY_ISO[name]
  return code ? codeToFlag(code) : '🏳'
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

export const RELIGION_LABELS = {
  christian_catholic:   'Catholic',
  christian_protestant: 'Protestant',
  christian_orthodox:   'Orthodox Christian',
  muslim_sunni:         'Sunni Muslim',
  muslim_shia:          'Shia Muslim',
  hindu:                'Hindu',
  buddhist:             'Buddhist',
  secular:              'Secular',
  atheist:              'Atheist',
  jewish:               'Jewish',
  sikh:                 'Sikh',
  animist:              'Animist',
  folk_religion:        'Folk Religion',
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

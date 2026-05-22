// Utility helpers for country flags, regime labels, religion labels, residency labels.

function codeToFlag(code) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  ).join('')
}

const COUNTRY_ISO = {
  'United States': 'US', 'Canada': 'CA', 'United Kingdom': 'GB',
  'Germany': 'DE', 'France': 'FR', 'Sweden': 'SE', 'Norway': 'NO',
  'Netherlands': 'NL', 'Australia': 'AU', 'New Zealand': 'NZ',
  'Spain': 'ES', 'Italy': 'IT', 'Ireland': 'IE', 'Japan': 'JP',
  'South Korea': 'KR', 'Singapore': 'SG', 'Russia': 'RU', 'Ukraine': 'UA',
  'Poland': 'PL', 'Romania': 'RO', 'Serbia': 'RS', 'Hungary': 'HU',
  'Georgia': 'GE', 'Kazakhstan': 'KZ', 'Uzbekistan': 'UZ',
  'Brazil': 'BR', 'Mexico': 'MX', 'Turkey': 'TR', 'China': 'CN',
  'Colombia': 'CO', 'Argentina': 'AR', 'South Africa': 'ZA',
  'Vietnam': 'VN', 'Philippines': 'PH', 'Indonesia': 'ID', 'Thailand': 'TH',
  'Venezuela': 'VE', 'Haiti': 'HT', 'Zimbabwe': 'ZW', 'Bangladesh': 'BD',
  'Cambodia': 'KH', 'Nigeria': 'NG', 'Ethiopia': 'ET', 'Kenya': 'KE',
  'DR Congo': 'CD', 'Ghana': 'GH', 'Senegal': 'SN', 'Mozambique': 'MZ',
  'Rwanda': 'RW', 'Afghanistan': 'AF', 'Syria': 'SY', 'Somalia': 'SO',
  'Yemen': 'YE', 'Myanmar': 'MM', 'Saudi Arabia': 'SA', 'UAE': 'AE',
  'India': 'IN', 'Pakistan': 'PK', 'Iran': 'IR', 'Egypt': 'EG',
  'Morocco': 'MA', 'Cuba': 'CU', 'Peru': 'PE', 'Sri Lanka': 'LK',
  'Nepal': 'NP', 'Chile': 'CL', 'Jordan': 'JO', 'Tanzania': 'TZ',
  'Uganda': 'UG', 'Namibia': 'NA', 'Czech Republic': 'CZ', 'Bolivia': 'BO',
  'Laos': 'LA', 'Guatemala': 'GT',
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
  federal_republic:           '#34c759',
  parliamentary_republic:     '#34c759',
  constitutional_monarchy:    '#34c759',
  absolute_monarchy:          '#ff9500',
  military_dictatorship:      '#ff3b30',
  single_party_communist:     '#ff3b30',
  single_party_authoritarian: '#ff3b30',
  theocracy:                  '#ff9500',
  democracy:                  '#34c759',
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
}

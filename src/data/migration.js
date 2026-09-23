/**
 * src/data/migration.js — where people from here actually went.
 *
 * Eighty events in the corpus set `emigrated`, and until this file existed not
 * one of them moved anybody. The flag is what every downstream reader takes to
 * mean "lives abroad": the diaspora texture, the accent in the second language,
 * the epitaph's "left Iran in search of something different", the remittance
 * pressure. Measured over 160 passive lives across twenty sending countries,
 * 41 of the 44 characters holding `emigrated` died in the country they were
 * born in, still drawing its salary, still subject to its police, still
 * reading "the old country is for funerals" about the street they lived on.
 *
 * Most of those events name a destination in their own prose and now say so
 * with `p.emigrateTo(...)`. This table is for the ones that do not ("leave the
 * country", "leave for a wealthier country"), and it is the engine's safety
 * net: an effect that sets `emigrated` without moving anyone is moved here, so
 * the flag and the state cannot disagree again whatever the next event forgets.
 *
 * The lists are the main corridors of the second half of the twentieth
 * century, weighted by repetition. They are corridors, not a census: a
 * Nigerian who leaves goes to London or Houston far more often than to
 * Stockholm, and a Moroccan to Spain or France rather than to Canada.
 */

import { COUNTRIES } from './countries.js'

const BY_COUNTRY = {
  'Mexico': ['United States'],
  'Guatemala': ['United States'],
  'El Salvador': ['United States'],
  'Honduras': ['United States', 'United States', 'Spain'],
  'Nicaragua': ['United States', 'United States', 'Spain'],
  'Dominican Republic': ['United States', 'United States', 'Spain'],
  'Cuba': ['United States'],
  'Haiti': ['United States', 'United States', 'Canada', 'Dominican Republic'],
  'Jamaica': ['United Kingdom', 'United States', 'Canada'],
  'Trinidad and Tobago': ['United States', 'Canada', 'United Kingdom'],
  'Guyana': ['United States', 'Canada', 'United Kingdom'],
  'Barbados': ['United Kingdom', 'United States', 'Canada'],
  'Puerto Rico': ['United States'],
  'Colombia': ['United States', 'Spain', 'Venezuela'],
  'Venezuela': ['Colombia', 'Colombia', 'Peru', 'Chile', 'Spain', 'United States'],
  'Ecuador': ['Spain', 'United States', 'Italy'],
  'Peru': ['United States', 'Spain', 'Argentina', 'Chile'],
  'Bolivia': ['Argentina', 'Spain', 'Chile'],
  'Paraguay': ['Argentina', 'Spain'],
  'Chile': ['Argentina', 'Sweden', 'United States'],
  'Argentina': ['Spain', 'Italy', 'United States'],
  'Uruguay': ['Argentina', 'Spain'],
  'Brazil': ['United States', 'Portugal', 'Japan'],
  'Ireland': ['United Kingdom', 'United Kingdom', 'United States', 'Australia'],
  'Portugal': ['France', 'France', 'Germany', 'Switzerland'],
  'Spain': ['Germany', 'France', 'Switzerland'],
  'Italy': ['Germany', 'Switzerland', 'United States'],
  'Greece': ['Germany', 'Germany', 'United Kingdom', 'Australia'],
  'Turkey': ['Germany', 'Germany', 'Netherlands'],
  'Poland': ['United Kingdom', 'Germany', 'Germany'],
  'Romania': ['Italy', 'Spain', 'Germany'],
  'Bulgaria': ['Germany', 'Spain'],
  'Moldova': ['Italy', 'Russia'],
  'Ukraine': ['Poland', 'Germany', 'Russia'],
  'Belarus': ['Poland', 'Russia'],
  'Russia': ['Germany', 'Israel', 'United States'],
  'Georgia': ['Russia', 'Greece', 'Turkey'],
  'Armenia': ['Russia', 'United States'],
  'Azerbaijan': ['Russia', 'Turkey'],
  'Kazakhstan': ['Russia', 'Germany'],
  'Uzbekistan': ['Russia', 'Kazakhstan'],
  'Kyrgyzstan': ['Russia', 'Kazakhstan'],
  'Tajikistan': ['Russia'],
  'Turkmenistan': ['Russia', 'Turkey'],
  'Hungary': ['Austria', 'Germany', 'United Kingdom'],
  'Czech Republic': ['Germany', 'Austria'],
  'Slovakia': ['Czech Republic', 'United Kingdom'],
  'Serbia': ['Germany', 'Austria', 'Switzerland'],
  'Bosnia and Herzegovina': ['Germany', 'Austria', 'Croatia'],
  'Croatia': ['Germany', 'Ireland', 'Austria'],
  'Albania': ['Italy', 'Greece'],
  'Lithuania': ['United Kingdom', 'Ireland', 'Norway'],
  'Latvia': ['United Kingdom', 'Ireland', 'Germany'],
  'Estonia': ['Finland', 'United Kingdom'],
  'Morocco': ['Spain', 'France', 'Italy'],
  'Algeria': ['France'],
  'Tunisia': ['France', 'Italy'],
  'Senegal': ['France', 'Spain', 'Italy'],
  'Mali': ['France', 'Ivory Coast'],
  'Guinea': ['France', 'Senegal'],
  'Burkina Faso': ['Ivory Coast', 'France'],
  'Ivory Coast': ['France'],
  'Nigeria': ['United Kingdom', 'United Kingdom', 'United States', 'Canada'],
  'Ghana': ['United Kingdom', 'United States', 'Canada'],
  'Cameroon': ['France', 'Germany', 'United States'],
  'Sierra Leone': ['United Kingdom', 'United States'],
  'Liberia': ['United States'],
  'Kenya': ['United Kingdom', 'United States'],
  'Uganda': ['United Kingdom', 'Kenya'],
  'Tanzania': ['United Kingdom', 'Kenya'],
  'Ethiopia': ['United States', 'Saudi Arabia'],
  'Eritrea': ['Sudan', 'Germany', 'Sweden'],
  'Somalia': ['Kenya', 'United Kingdom', 'Sweden'],
  'Sudan': ['Saudi Arabia', 'Egypt', 'United Kingdom'],
  'Zimbabwe': ['South Africa', 'South Africa', 'United Kingdom'],
  'Zambia': ['South Africa', 'United Kingdom'],
  'Mozambique': ['South Africa', 'Portugal'],
  'Angola': ['Portugal', 'South Africa'],
  'DR Congo': ['Belgium', 'France', 'South Africa'],
  'Rwanda': ['Belgium', 'Uganda'],
  'South Africa': ['United Kingdom', 'Australia', 'New Zealand', 'Canada'],
  'Egypt': ['Saudi Arabia', 'Kuwait', 'UAE', 'Italy'],
  'Libya': ['Tunisia', 'Italy'],
  'Syria': ['Turkey', 'Lebanon', 'Germany', 'Sweden'],
  'Lebanon': ['France', 'United States', 'Canada'],
  'Jordan': ['UAE', 'Saudi Arabia', 'United States'],
  'Palestine': ['Jordan', 'Jordan', 'Germany', 'United States'],
  'Iraq': ['Jordan', 'Sweden', 'Germany'],
  'Iran': ['United States', 'Germany', 'United Kingdom', 'Canada', 'Turkey'],
  'Afghanistan': ['Pakistan', 'Iran', 'Germany'],
  'Yemen': ['Saudi Arabia'],
  'Pakistan': ['United Kingdom', 'UAE', 'Saudi Arabia', 'United States'],
  'India': ['UAE', 'United States', 'United Kingdom', 'Saudi Arabia'],
  'Bangladesh': ['Saudi Arabia', 'Malaysia', 'UAE', 'United Kingdom'],
  'Nepal': ['Qatar', 'Malaysia', 'India', 'Saudi Arabia'],
  'Sri Lanka': ['Canada', 'United Kingdom', 'Saudi Arabia'],
  'Bhutan': ['Nepal', 'United States'],
  'Myanmar': ['Thailand', 'Malaysia'],
  'Cambodia': ['Thailand', 'United States', 'France'],
  'Laos': ['Thailand', 'United States', 'France'],
  'Vietnam': ['United States', 'Australia', 'Canada', 'France'],
  'Philippines': ['Saudi Arabia', 'UAE', 'United States', 'Singapore'],
  'Indonesia': ['Malaysia', 'Saudi Arabia', 'Singapore'],
  'Malaysia': ['Singapore', 'Australia'],
  'Thailand': ['United States', 'Japan'],
  'China': ['United States', 'Canada', 'Australia'],
  'Taiwan': ['United States', 'Canada'],
  'South Korea': ['United States', 'Canada'],
  'North Korea': ['South Korea'],
  'Mongolia': ['South Korea', 'Japan'],
  'Japan': ['United States', 'Brazil'],
  'Fiji': ['Australia', 'New Zealand', 'Canada'],
  'Samoa': ['New Zealand', 'Australia'],
  'Tuvalu': ['New Zealand', 'Fiji'],
  'Kiribati': ['New Zealand', 'Fiji'],
  'Marshall Islands': ['United States'],
  'Papua New Guinea': ['Australia'],
  'Vanuatu': ['New Zealand', 'Australia'],
  'East Timor': ['Australia', 'Portugal'],
  'Israel': ['United States', 'Germany'],
  'Cyprus': ['United Kingdom', 'Greece'],
  'United Kingdom': ['Australia', 'Canada', 'United States', 'New Zealand'],
  'Germany': ['United States', 'Switzerland', 'Austria'],
  'Netherlands': ['Canada', 'Australia', 'Belgium'],
  'Iceland': ['Denmark', 'Norway'],
  'Finland': ['Sweden'],
  'United States': ['Canada', 'Mexico', 'United Kingdom'],
  'Canada': ['United States'],
  'New Zealand': ['Australia'],
  'Australia': ['United Kingdom', 'New Zealand'],
}

const BY_ARCHETYPE = {
  wealthy_west: ['United States', 'United Kingdom', 'Canada', 'Australia'],
  wealthy_east: ['United States', 'Canada', 'Australia'],
  wealthy_gulf: ['United Kingdom', 'United States'],
  post_soviet: ['Russia', 'Germany', 'Poland'],
  developing_urban: ['United States', 'Spain', 'United Kingdom', 'Canada'],
  developing_unstable: ['United States', 'France', 'United Kingdom'],
  subsaharan: ['United Kingdom', 'France', 'South Africa', 'United States'],
  conflict_zone: ['Germany', 'Sweden', 'Turkey', 'United Kingdom'],
}

const KNOWN = new Set(COUNTRIES.map(c => c.name))

/**
 * Where someone from `country` goes when an event says they leave and does not
 * say where. Never returns the country they are leaving.
 */
export function migrationDestinations(country) {
  const name = typeof country === 'string' ? country : country?.name
  const arch = typeof country === 'string'
    ? COUNTRIES.find(c => c.name === country)?.archetype
    : country?.archetype
  const listed = BY_COUNTRY[name] ?? BY_ARCHETYPE[arch] ?? BY_ARCHETYPE.developing_urban
  const out = listed.filter(n => n !== name && KNOWN.has(n))
  return out.length ? out : ['United States', 'United Kingdom'].filter(n => n !== name)
}

export const __testables = { BY_COUNTRY, BY_ARCHETYPE }

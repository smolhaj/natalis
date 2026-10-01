// Major historical moments injected as headline log entries when a character
// lives through the matching year. Displayed with distinct visual styling
// in the life log — not events, just immersive historical texture.
//
// Format: { year, text, archetypes, countries, minAge, maxAge?, when? }
// archetypes: array of archetypes this fires for, or 'all'
// countries:  the country names whose newspapers carried it, or null
//
// A headline is a claim about what was on the front page where the character
// lives. This list used to be twenty `archetypes: 'all'` entries that were the
// news in London and Washington, so every life on the roster read the same
// front pages: "KABUL FALLS — AMERICA'S LONGEST WAR ENDS" in 13 of 22 lives,
// the Oslo handshake and the Haiti earthquake and the South Sudan flag in 17
// of 22, in rural Oyo and Hanoi and Kim Il Sung's Pyongyang alike. The front
// page in Lagos in 1993 was June 12; in Moscow in 1993 it was the tanks at the
// White House; in Delhi in 1984 it was the bodyguards.
//
// So almost everything here is scoped to the REGION whose papers led with it,
// and every region has its own. The handful still read everywhere — Hiroshima,
// the moon, the towers, the pandemic — were genuinely everyone's news, and even
// those skip the one country whose papers did not print them.

import { COUNTRIES } from './countries.js'

const ALL_NAMES = COUNTRIES.map(c => c.name)
export const COUNTRY_NAMES = ALL_NAMES
const but = (...names) => ALL_NAMES.filter(n => !names.includes(n))

// The spheres a newspaper's foreign page actually reached. Names match
// countries.js exactly (the audit in scripts/lib/audits.js checks them).
export const REGIONS = {
  anglo: ['United States', 'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'Ireland'],
  westEurope: ['United Kingdom', 'Ireland', 'France', 'Germany', 'Netherlands', 'Belgium', 'Switzerland', 'Austria',
    'Italy', 'Spain', 'Portugal', 'Greece', 'Cyprus', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'],
  nordic: ['Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'],
  eastBloc: ['Poland', 'Czech Republic', 'Slovakia', 'Hungary', 'Romania', 'Bulgaria', 'Albania'],
  yugoslavia: ['Serbia', 'Croatia', 'Slovenia', 'Bosnia and Herzegovina'],
  soviet: ['Russia', 'Ukraine', 'Belarus', 'Moldova', 'Estonia', 'Latvia', 'Lithuania', 'Georgia', 'Armenia', 'Azerbaijan',
    'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'],
  baltic: ['Estonia', 'Latvia', 'Lithuania'],
  centralAsia: ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'],
  arab: ['Egypt', 'Algeria', 'Morocco', 'Tunisia', 'Libya', 'Jordan', 'Lebanon', 'Syria', 'Iraq', 'Palestine', 'Yemen',
    'Saudi Arabia', 'UAE', 'Qatar', 'Bahrain', 'Kuwait', 'Oman', 'Sudan'],
  gulf: ['Saudi Arabia', 'UAE', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'],
  maghreb: ['Algeria', 'Morocco', 'Tunisia', 'Libya'],
  levant: ['Jordan', 'Lebanon', 'Syria', 'Iraq', 'Palestine', 'Israel'],
  southAsia: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan', 'Maldives', 'Afghanistan'],
  eastAsia: ['China', 'Japan', 'South Korea', 'North Korea', 'Taiwan', 'Mongolia'],
  southeastAsia: ['Vietnam', 'Cambodia', 'Laos', 'Thailand', 'Myanmar', 'Malaysia', 'Singapore', 'Indonesia', 'Philippines', 'East Timor'],
  latinAmerica: ['Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Cuba', 'Dominican Republic', 'Puerto Rico',
    'Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Brazil'],
  southernCone: ['Argentina', 'Chile', 'Uruguay', 'Paraguay', 'Brazil'],
  centralAmerica: ['Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Belize'],
  caribbean: ['Jamaica', 'Trinidad and Tobago', 'Barbados', 'Guyana', 'Belize', 'Haiti', 'Dominican Republic', 'Cuba', 'Puerto Rico'],
  westAfrica: ['Nigeria', 'Ghana', 'Senegal', 'Guinea', 'Mali', 'Burkina Faso', 'Niger', 'Ivory Coast', 'Togo', 'Benin',
    'Sierra Leone', 'Liberia', 'Cameroon', 'Chad'],
  francophoneAfrica: ['Senegal', 'Guinea', 'Mali', 'Burkina Faso', 'Niger', 'Ivory Coast', 'Togo', 'Benin', 'Cameroon',
    'Chad', 'Central African Republic', 'DR Congo', 'Rwanda', 'Djibouti'],
  cfa: ['Senegal', 'Mali', 'Burkina Faso', 'Niger', 'Ivory Coast', 'Togo', 'Benin', 'Cameroon', 'Chad', 'Central African Republic'],
  eastAfrica: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia', 'Eritrea', 'Somalia', 'Djibouti', 'Sudan'],
  centralAfrica: ['DR Congo', 'Central African Republic', 'Rwanda', 'Uganda', 'Cameroon', 'Chad', 'Angola', 'Zambia'],
  southernAfrica: ['South Africa', 'Namibia', 'Zimbabwe', 'Zambia', 'Mozambique', 'Angola', 'Tanzania'],
  pacific: ['Fiji', 'Samoa', 'Kiribati', 'Tuvalu', 'Marshall Islands', 'Vanuatu', 'Papua New Guinea'],
}
const R = REGIONS
const join = (...lists) => [...new Set(lists.flat())]
const EUROPE = join(R.westEurope, R.eastBloc, R.yugoslavia)
const COLD_WAR_EUROPE = join(R.westEurope, R.eastBloc, R.yugoslavia, R.soviet, ['United States', 'Canada'])
const MIDEAST = join(R.arab, ['Israel', 'Iran', 'Turkey'])

/**
 * Was this headline on the front page where this character is, this year?
 *
 * The matcher in tick.js reads `archetypes`/`countries` against the BIRTH
 * country, which is what this function replaces: news reaches you where you
 * live, and a headline from home also reaches you abroad (people abroad read
 * the paper from home, or are told on the telephone). `when(state)` is an
 * optional extra guard.
 */
export function headlineFits(h, state) {
  if (h.year !== state.currentYear) return false
  const age = state.age ?? 0
  if (h.minAge && age < h.minAge) return false
  if (h.maxAge && age > h.maxAge) return false
  const live = state.currentCountry ?? state.character?.country
  const birth = state.character?.country
  const cands = live?.name !== birth?.name ? [live, birth] : [live]
  if (h.archetypes && h.archetypes !== 'all' && !cands.some(c => h.archetypes.includes(c?.archetype))) return false
  if (h.countries && !cands.some(c => h.countries.includes(c?.name))) return false
  if (h.when && !h.when(state)) return false
  return true
}

export const HEADLINES = [
  // ── 1900s–1940s ────────────────────────────────────────────────────────────
  { year: 1918, text: 'ARMISTICE SIGNED — THE WAR IS OVER', archetypes: 'all', countries: join(R.westEurope, R.anglo, ['Turkey', 'Serbia', 'Romania', 'Poland', 'Czech Republic', 'Hungary']), minAge: 1 },
  { year: 1929, text: 'STOCK MARKET COLLAPSES — BANKS CLOSE ACROSS THE COUNTRY', archetypes: 'all', countries: ['United States', 'Canada'], minAge: 1 },
  { year: 1933, text: 'HITLER APPOINTED CHANCELLOR OF GERMANY', archetypes: 'all', countries: join(EUROPE, R.anglo, ['Russia', 'Ukraine', 'Belarus', 'Israel', 'Palestine']), minAge: 5 },
  { year: 1936, text: 'GENERALS RISE AGAINST THE REPUBLIC — WAR IN SPAIN', archetypes: 'all', countries: ['Spain', 'Portugal', 'France'], minAge: 5 },
  { year: 1939, text: 'BRITAIN AND FRANCE DECLARE WAR ON GERMANY', archetypes: 'all', countries: join(R.westEurope, R.anglo, ['Poland']), minAge: 1 },
  { year: 1940, text: 'GERMAN ARMY ENTERS PARIS — THE GOVERNMENT HAS LEFT', archetypes: 'all', countries: ['France', 'Belgium', 'Netherlands', 'United Kingdom', 'Switzerland'], minAge: 5 },
  { year: 1941, text: 'JAPAN ATTACKS PEARL HARBOR — UNITED STATES ENTERS THE WAR', archetypes: 'all', countries: join(R.anglo, ['Japan', 'China', 'Philippines', 'Malaysia', 'Singapore', 'Indonesia', 'Thailand']), minAge: 5 },
  { year: 1941, text: 'GERMANY INVADES THE SOVIET UNION — MOLOTOV SPEAKS ON THE RADIO AT NOON', archetypes: 'all', countries: R.soviet, minAge: 5 },
  { year: 1945, text: 'GERMANY SURRENDERS — WAR IN EUROPE OVER', archetypes: 'all', countries: join(EUROPE, R.anglo, ['Israel', 'Palestine']), minAge: 1 },
  { year: 1945, text: 'VICTORY — GERMANY HAS SIGNED. THE NINTH OF MAY IS A HOLIDAY', archetypes: 'all', countries: R.soviet, minAge: 1 },
  { year: 1945, text: 'ATOMIC BOMBS DROPPED ON HIROSHIMA AND NAGASAKI — JAPAN SURRENDERS', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1947, text: 'INDIA AND PAKISTAN INDEPENDENT — PARTITION DIVIDES THE SUBCONTINENT', archetypes: 'all', countries: ['India', 'Pakistan', 'Bangladesh'], minAge: 1 },
  { year: 1948, text: 'GANDHI SHOT DEAD IN DELHI', archetypes: 'all', countries: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'South Africa'], minAge: 5 },
  { year: 1948, text: 'STATE OF ISRAEL DECLARED', archetypes: 'all', countries: join(MIDEAST, ['United States', 'United Kingdom']), minAge: 1 },
  { year: 1949, text: 'MAO PROCLAIMS THE PEOPLE\'S REPUBLIC OF CHINA', archetypes: 'all', countries: ['China', 'Taiwan', 'Mongolia', 'North Korea', 'South Korea', 'Russia'], minAge: 1 },

  // ── 1950s ────────────────────────────────────────────────────────────────────
  { year: 1950, text: 'NORTH KOREA INVADES THE SOUTH — WAR BEGINS ON THE PENINSULA', archetypes: 'all', countries: ['South Korea', 'Japan', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Turkey', 'Philippines', 'Taiwan'], minAge: 1 },
  { year: 1950, text: 'THE ENEMY HAS ATTACKED — THE FATHERLAND LIBERATION WAR BEGINS', archetypes: 'all', countries: ['North Korea'], minAge: 5 },
  { year: 1950, text: 'URUGUAY BEAT BRAZIL AT THE MARACANÃ', archetypes: 'all', countries: ['Brazil', 'Uruguay'], minAge: 5 },
  { year: 1952, text: 'THE FREE OFFICERS DEPOSE KING FAROUK', archetypes: 'all', countries: ['Egypt', 'Sudan'], minAge: 5 },
  { year: 1953, text: 'KOREAN WAR ARMISTICE SIGNED', archetypes: 'all', countries: ['South Korea', 'Japan', 'China', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Turkey', 'Ethiopia', 'Colombia', 'Philippines'], minAge: 1 },
  { year: 1953, text: 'VICTORY IN THE FATHERLAND LIBERATION WAR', archetypes: 'all', countries: ['North Korea'], minAge: 1 },
  { year: 1953, text: 'STALIN IS DEAD', archetypes: 'all', countries: join(R.soviet, R.eastBloc, ['Mongolia', 'China', 'North Korea']), minAge: 1 },
  { year: 1953, text: 'MOSSADEGH OVERTHROWN — THE SHAH RETURNS', archetypes: 'all', countries: ['Iran'], minAge: 5 },
  { year: 1954, text: 'GERMANY WIN THE WORLD CUP IN BERNE', archetypes: 'all', countries: ['Germany', 'Hungary', 'Austria', 'Switzerland'], minAge: 5 },
  { year: 1954, text: 'VARGAS SHOOTS HIMSELF IN THE CATETE PALACE', archetypes: 'all', countries: ['Brazil'], minAge: 5 },
  { year: 1954, text: 'DIEN BIEN PHU FALLS — THE FRENCH ARE LEAVING', archetypes: 'all', countries: ['Vietnam', 'Laos', 'Cambodia', 'France', 'Algeria'], minAge: 5 },
  { year: 1955, text: 'ROSA PARKS REFUSES TO GIVE UP HER SEAT', archetypes: 'all', countries: ['United States'], minAge: 5 },
  { year: 1955, text: 'PERÓN OVERTHROWN — THE GENERAL LEAVES ON A PARAGUAYAN GUNBOAT', archetypes: 'all', countries: ['Argentina', 'Uruguay', 'Paraguay'], minAge: 5 },
  { year: 1956, text: 'NASSER NATIONALISES THE SUEZ CANAL', archetypes: 'all', countries: join(R.arab, ['Israel', 'United Kingdom', 'France']), minAge: 5 },
  { year: 1956, text: 'KHRUSHCHEV DENOUNCES STALIN AT THE TWENTIETH CONGRESS', archetypes: 'all', countries: join(R.soviet, R.eastBloc), minAge: 10 },
  { year: 1956, text: 'SOVIET TANKS IN BUDAPEST', archetypes: 'all', countries: join(R.westEurope, R.eastBloc, R.anglo, ['Serbia', 'Croatia']), minAge: 5 },
  { year: 1957, text: 'GHANA INDEPENDENT — FIRST OF THE BRITISH COLONIES IN AFRICA', archetypes: 'all', countries: ['Ghana', 'Nigeria', 'Kenya', 'Sierra Leone', 'United Kingdom'], minAge: 1 },
  { year: 1957, text: 'SOVIETS LAUNCH SPUTNIK — SPACE AGE BEGINS', archetypes: 'all', countries: join(COLD_WAR_EUROPE, R.anglo, ['Japan']), minAge: 5 },
  { year: 1958, text: 'GUINEA VOTES NO TO DE GAULLE — INDEPENDENCE AT ONCE', archetypes: 'all', countries: ['Guinea', 'Senegal', 'Mali', 'Ivory Coast', 'France'], minAge: 5 },
  { year: 1958, text: 'THE MONARCHY FALLS IN BAGHDAD', archetypes: 'all', countries: ['Iraq', 'Jordan', 'Syria', 'Kuwait'], minAge: 5 },
  { year: 1959, text: 'FIDEL CASTRO TAKES HAVANA — BATISTA FLEES', archetypes: 'all', countries: join(['Cuba', 'United States'], R.latinAmerica), minAge: 1 },

  // ── 1960s ────────────────────────────────────────────────────────────────────
  { year: 1960, text: 'LUMUMBA DECLARES INDEPENDENCE: "CONGO FOR THE CONGOLESE PEOPLE"', archetypes: 'all', countries: ['DR Congo', 'Rwanda', 'Belgium'], minAge: 1 },
  { year: 1960, text: 'NIGERIA INDEPENDENT — THE FLAG CHANGES AT MIDNIGHT IN LAGOS', archetypes: 'all', countries: ['Nigeria'], minAge: 1 },
  { year: 1960, text: 'POLICE FIRE ON THE CROWD AT SHARPEVILLE', archetypes: 'all', countries: ['South Africa', 'Namibia'], minAge: 5 },
  { year: 1960, text: 'THE ARMY TAKES POWER IN ANKARA', archetypes: 'all', countries: ['Turkey'], minAge: 5 },
  { year: 1961, text: 'LUMUMBA ASSASSINATED — CONGO\'S FIRST PRIME MINISTER IS DEAD', archetypes: 'all', countries: join(['DR Congo', 'Belgium', 'Ghana', 'Guinea'], R.eastAfrica), minAge: 1 },
  { year: 1961, text: 'BAY OF PIGS: CIA-BACKED INVASION OF CUBA COLLAPSES IN 72 HOURS', archetypes: 'all', countries: ['United States', 'Cuba', 'Mexico', 'Guatemala', 'Nicaragua'], minAge: 5 },
  { year: 1961, text: 'BERLIN WALL GOES UP OVERNIGHT', archetypes: 'all', countries: COLD_WAR_EUROPE, minAge: 1 },
  { year: 1961, text: 'YURI GAGARIN ORBITS THE EARTH', archetypes: 'all', countries: join(COLD_WAR_EUROPE, R.anglo, ['Mongolia', 'Cuba', 'India', 'Japan', 'Egypt', 'Ghana', 'Vietnam']), minAge: 5 },
  { year: 1962, text: 'ALGERIA INDEPENDENT AFTER EIGHT YEARS OF WAR', archetypes: 'all', countries: join(R.maghreb, ['France', 'Egypt']), minAge: 1 },
  { year: 1962, text: 'JAMAICA AND TRINIDAD INDEPENDENT — THE UNION JACK COMES DOWN', archetypes: 'all', countries: ['Jamaica', 'Trinidad and Tobago', 'Barbados', 'Guyana'], minAge: 5 },
  { year: 1963, text: 'PRESIDENT KENNEDY ASSASSINATED IN DALLAS', archetypes: 'all', countries: join(R.anglo, R.westEurope, ['Puerto Rico', 'Mexico', 'Israel', 'Japan', 'Philippines']), minAge: 5 },
  { year: 1963, text: 'UHURU — KENYA INDEPENDENT', archetypes: 'all', countries: ['Kenya', 'Uganda', 'Tanzania'], minAge: 1 },
  { year: 1964, text: 'NEHRU IS DEAD', archetypes: 'all', countries: ['India', 'Pakistan', 'Nepal', 'Sri Lanka'], minAge: 5 },
  { year: 1964, text: 'TANKS IN RIO — GOULART DEPOSED', archetypes: 'all', countries: ['Brazil', 'Uruguay'], minAge: 5 },
  { year: 1964, text: 'MANDELA SENTENCED TO LIFE AT RIVONIA', archetypes: 'all', countries: ['South Africa', 'Namibia', 'Zambia'], minAge: 8 },
  { year: 1964, text: 'THE OLYMPICS OPEN IN TOKYO', archetypes: 'all', countries: ['Japan', 'South Korea', 'Taiwan'], minAge: 5 },
  { year: 1964, text: 'KHRUSHCHEV RETIRES "FOR REASONS OF HEALTH" — BREZHNEV FIRST SECRETARY', archetypes: 'all', countries: join(R.soviet, R.eastBloc), minAge: 10 },
  { year: 1965, text: 'US COMBAT TROOPS LAND IN VIETNAM', archetypes: 'all', countries: ['United States', 'Australia', 'New Zealand', 'Vietnam', 'South Korea', 'Philippines', 'Thailand'], minAge: 5 },
  { year: 1965, text: 'SINGAPORE SEPARATES FROM MALAYSIA', archetypes: 'all', countries: ['Singapore', 'Malaysia', 'Indonesia'], minAge: 5 },
  { year: 1965, text: 'WAR WITH PAKISTAN OVER KASHMIR', archetypes: 'all', countries: ['India'], minAge: 5 },
  { year: 1965, text: 'WAR WITH INDIA OVER KASHMIR', archetypes: 'all', countries: ['Pakistan', 'Bangladesh'], minAge: 5 },
  { year: 1966, text: 'MAJORS SEIZE POWER — THE PRIME MINISTER IS MISSING', archetypes: 'all', countries: ['Nigeria'], minAge: 5 },
  { year: 1966, text: 'NKRUMAH OVERTHROWN WHILE ABROAD', archetypes: 'all', countries: ['Ghana', 'Guinea', 'Togo', 'Ivory Coast'], minAge: 5 },
  { year: 1966, text: 'ENGLAND WIN THE WORLD CUP AT WEMBLEY', archetypes: 'all', countries: ['United Kingdom', 'Germany'], minAge: 5 },
  { year: 1966, text: 'GUYANA AND BARBADOS INDEPENDENT', archetypes: 'all', countries: ['Guyana', 'Barbados'], minAge: 1 },
  { year: 1967, text: 'ISRAEL DEFEATS EGYPT, SYRIA, JORDAN IN SIX DAYS', archetypes: 'all', countries: join(MIDEAST, ['United States', 'United Kingdom', 'France']), minAge: 5 },
  { year: 1967, text: 'THE COLONELS TAKE ATHENS', archetypes: 'all', countries: ['Greece', 'Cyprus'], minAge: 5 },
  { year: 1967, text: 'BIAFRA DECLARES INDEPENDENCE — NIGERIA GOES TO WAR', archetypes: 'all', countries: ['Nigeria'], minAge: 5 },
  { year: 1968, text: 'MARTIN LUTHER KING SHOT DEAD IN MEMPHIS', archetypes: 'all', countries: ['United States', 'United Kingdom', 'Canada', 'Jamaica'], minAge: 5 },
  { year: 1968, text: 'SOVIET TANKS ROLL INTO PRAGUE', archetypes: 'all', countries: COLD_WAR_EUROPE, minAge: 5 },
  { year: 1968, text: 'BARRICADES IN THE LATIN QUARTER — THE COUNTRY ON STRIKE', archetypes: 'all', countries: ['France', 'Belgium', 'Switzerland'], minAge: 8 },
  { year: 1968, text: 'TROOPS FIRE ON STUDENTS AT TLATELOLCO — TEN DAYS BEFORE THE OLYMPICS', archetypes: 'all', countries: ['Mexico'], minAge: 8 },
  // China's press barely carried it and North Korea's did not carry it at all.
  { year: 1969, text: 'MAN WALKS ON THE MOON', archetypes: 'all', countries: but('China', 'North Korea', 'Albania'), minAge: 3 },

  // ── 1970s ────────────────────────────────────────────────────────────────────
  { year: 1970, text: 'CYCLONE BHOLA KILLS HALF A MILLION IN EAST PAKISTAN — GOVERNMENT SLOW TO RESPOND', archetypes: 'all', countries: ['Bangladesh', 'Pakistan'], minAge: 1 },
  { year: 1970, text: 'BIAFRA SURRENDERS — ONE MILLION CIVILIANS DEAD OF STARVATION', archetypes: 'all', countries: ['Nigeria'], minAge: 1 },
  { year: 1970, text: 'NASSER IS DEAD', archetypes: 'all', countries: R.arab, minAge: 5 },
  { year: 1970, text: 'BRAZIL WIN THE WORLD CUP IN MEXICO — THE TROPHY IS THEIRS TO KEEP', archetypes: 'all', countries: ['Brazil', 'Mexico', 'Italy'], minAge: 5 },
  { year: 1970, text: 'ALLENDE ELECTED — A MARXIST PRESIDENT BY THE BALLOT', archetypes: 'all', countries: ['Chile', 'Argentina', 'Peru', 'Bolivia'], minAge: 8 },
  { year: 1971, text: 'BANGLADESH DECLARES INDEPENDENCE. NINE MONTHS OF WAR. INDIA INTERVENES. PAKISTAN SURRENDERS.', archetypes: 'all', countries: ['Bangladesh', 'Pakistan', 'India'], minAge: 1 },
  { year: 1971, text: 'AMIN SEIZES POWER IN KAMPALA', archetypes: 'all', countries: ['Uganda', 'Kenya', 'Tanzania'], minAge: 5 },
  { year: 1971, text: 'THE EMIRATES BECOME ONE STATE — ZAYED IS PRESIDENT', archetypes: 'all', countries: ['UAE', 'Oman', 'Qatar', 'Bahrain'], minAge: 5 },
  { year: 1972, text: 'AMIN EXPELS UGANDA\'S ASIANS — NINETY DAYS TO LEAVE', archetypes: 'all', countries: ['Uganda', 'Kenya', 'Tanzania', 'India', 'United Kingdom'], minAge: 5 },
  { year: 1972, text: 'ISRAELI ATHLETES KILLED AT THE MUNICH OLYMPICS', archetypes: 'all', countries: ['Germany', 'Israel', 'Austria'], minAge: 5 },
  { year: 1973, text: 'OIL EMBARGO — PETROL QUEUES STRETCH FOR MILES', archetypes: ['wealthy_west', 'wealthy_east'], countries: null, minAge: 5 },
  { year: 1973, text: 'EGYPTIAN ARMY CROSSES THE CANAL', archetypes: 'all', countries: join(R.arab, ['Israel']), minAge: 5 },
  { year: 1973, text: 'PINOCHET SEIZES POWER IN CHILE — ALLENDE DEAD', archetypes: 'all', countries: join(['Chile'], R.southernCone, ['Peru', 'Bolivia', 'Mexico', 'Sweden']), minAge: 5 },
  { year: 1974, text: 'THE ARMY TAKES LISBON — CARNATIONS IN THE RIFLES', archetypes: 'all', countries: ['Portugal', 'Mozambique', 'Angola', 'Spain'], minAge: 5 },
  { year: 1974, text: 'HAILE SELASSIE DEPOSED', archetypes: 'all', countries: ['Ethiopia', 'Eritrea', 'Kenya', 'Somalia', 'Djibouti', 'Jamaica'], minAge: 5 },
  { year: 1974, text: 'NIXON RESIGNS', archetypes: 'all', countries: ['United States', 'Canada'], minAge: 8 },
  { year: 1974, text: 'TURKISH TROOPS LAND IN CYPRUS', archetypes: 'all', countries: ['Cyprus', 'Greece', 'Turkey'], minAge: 5 },
  { year: 1975, text: 'SAIGON FALLS — AMERICAN HELICOPTERS EVACUATE THE ROOF', archetypes: 'all', countries: ['Vietnam', 'United States', 'Australia', 'Laos', 'Cambodia'], minAge: 1 },
  { year: 1975, text: 'KHMER ROUGE TAKES PHNOM PENH — CITY EVACUATED AT GUNPOINT', archetypes: 'all', countries: ['Cambodia', 'Thailand', 'Vietnam'], minAge: 1 },
  { year: 1975, text: 'FRANCO IS DEAD', archetypes: 'all', countries: ['Spain', 'Portugal'], minAge: 5 },
  { year: 1975, text: 'INDEPENDENCE — THE PORTUGUESE FLAG COMES DOWN', archetypes: 'all', countries: ['Mozambique', 'Angola'], minAge: 1 },
  { year: 1975, text: 'INDONESIAN TROOPS LAND IN DILI', archetypes: 'all', countries: ['East Timor', 'Portugal', 'Australia'], minAge: 1 },
  { year: 1975, text: 'STATE OF EMERGENCY DECLARED — THE PRESSES ARE SILENT', archetypes: 'all', countries: ['India'], minAge: 8 },
  { year: 1975, text: 'UMM KULTHUM IS DEAD — CAIRO STOPS FOR THE FUNERAL', archetypes: 'all', countries: R.arab, minAge: 5 },
  { year: 1975, text: 'CIVIL WAR IN BEIRUT', archetypes: 'all', countries: ['Lebanon', 'Syria', 'Palestine', 'Jordan'], minAge: 5 },
  { year: 1975, text: 'PAPUA NEW GUINEA INDEPENDENT', archetypes: 'all', countries: ['Papua New Guinea', 'Australia'], minAge: 5 },
  { year: 1976, text: 'MAO ZEDONG IS DEAD', archetypes: 'all', countries: ['China', 'Taiwan', 'North Korea', 'Vietnam'], minAge: 1 },
  { year: 1976, text: 'POLICE SHOOT SCHOOLCHILDREN IN SOWETO', archetypes: 'all', countries: ['South Africa', 'Namibia', 'Zimbabwe', 'Zambia'], minAge: 5 },
  { year: 1976, text: 'THE JUNTA DEPOSES ISABEL PERÓN', archetypes: 'all', countries: ['Argentina', 'Uruguay'], minAge: 5 },
  { year: 1977, text: 'SADAT FLIES TO JERUSALEM', archetypes: 'all', countries: join(R.arab, ['Israel']), minAge: 8 },
  { year: 1978, text: 'KENYATTA IS DEAD', archetypes: 'all', countries: ['Kenya', 'Uganda', 'Tanzania'], minAge: 5 },
  { year: 1978, text: 'A POLISH POPE — CARDINAL WOJTYŁA ELECTED IN ROME', archetypes: 'all', countries: ['Poland', 'Italy', 'Lithuania', 'Ireland', 'Czech Republic', 'Slovakia'], minAge: 5 },
  { year: 1978, text: 'NINE HUNDRED DEAD AT JONESTOWN', archetypes: 'all', countries: ['Guyana', 'United States'], minAge: 8 },
  { year: 1979, text: 'SHAH OF IRAN FLEES — AYATOLLAH KHOMEINI RETURNS', archetypes: 'all', countries: join(['Iran'], R.gulf, ['Iraq', 'Afghanistan', 'Pakistan', 'Turkey', 'United States']), minAge: 1 },
  { year: 1979, text: 'SOVIET TROOPS ENTER AFGHANISTAN', archetypes: 'all', countries: join(R.soviet, ['Afghanistan', 'Pakistan', 'Iran', 'United States', 'United Kingdom', 'Germany']), minAge: 5 },
  { year: 1979, text: 'VIETNAMESE TROOPS ENTER PHNOM PENH — POL POT\'S REGIME COLLAPSES', archetypes: 'all', countries: ['Cambodia', 'Vietnam', 'Thailand', 'Laos'], minAge: 1 },
  { year: 1979, text: 'TANZANIAN TROOPS TAKE KAMPALA — AMIN FLEES', archetypes: 'all', countries: ['Uganda', 'Tanzania', 'Kenya'], minAge: 5 },
  { year: 1979, text: 'FLIGHT LIEUTENANT RAWLINGS TAKES POWER IN ACCRA', archetypes: 'all', countries: ['Ghana', 'Nigeria', 'Togo'], minAge: 5 },
  { year: 1979, text: 'PRESIDENT PARK SHOT DEAD AT DINNER BY HIS SPY CHIEF', archetypes: 'all', countries: ['South Korea', 'Japan'], minAge: 5 },
  { year: 1979, text: 'GUNMEN SEIZE THE GRAND MOSQUE IN MECCA', archetypes: 'all', countries: join(R.gulf, ['Pakistan', 'Egypt', 'Iran']), minAge: 8 },

  // ── 1980s ────────────────────────────────────────────────────────────────────
  { year: 1980, text: 'MARIEL BOATLIFT: 125,000 CUBANS FLEE TO FLORIDA IN FIVE MONTHS', archetypes: 'all', countries: ['Cuba', 'United States'], minAge: 1 },
  { year: 1980, text: 'IRAN-IRAQ WAR BEGINS', archetypes: 'all', countries: join(['Iran', 'Iraq'], R.gulf, ['Syria', 'Jordan']), minAge: 1 },
  { year: 1980, text: 'ZIMBABWE INDEPENDENT — BOB MARLEY PLAYS AT RUFARO', archetypes: 'all', countries: ['Zimbabwe', 'Zambia', 'Mozambique', 'South Africa'], minAge: 1 },
  { year: 1980, text: 'STRIKE AT THE LENIN SHIPYARD — SOLIDARITY IS BORN', archetypes: 'all', countries: ['Poland', 'Czech Republic', 'Slovakia', 'Hungary', 'Germany', 'Lithuania'], minAge: 5 },
  { year: 1980, text: 'THE GENERALS TAKE POWER — PARLIAMENT DISSOLVED', archetypes: 'all', countries: ['Turkey'], minAge: 5 },
  { year: 1980, text: 'THE OLYMPICS OPEN IN MOSCOW', archetypes: 'all', countries: join(R.soviet, R.eastBloc), minAge: 5 },
  { year: 1980, text: 'TROOPS ENTER GWANGJU', archetypes: 'all', countries: ['South Korea'], minAge: 8 },
  { year: 1981, text: 'SADAT ASSASSINATED AT THE OCTOBER PARADE', archetypes: 'all', countries: join(R.arab, ['Israel']), minAge: 5 },
  { year: 1981, text: 'MARTIAL LAW — TANKS ON THE STREETS OF WARSAW', archetypes: 'all', countries: ['Poland', 'Germany', 'Czech Republic', 'Lithuania'], minAge: 5 },
  { year: 1981, text: 'DOCTORS REPORT STRANGE NEW ILLNESS AMONG GAY MEN IN NEW YORK', archetypes: 'all', countries: ['United States'], minAge: 10 },
  { year: 1982, text: 'ARGENTINE TROOPS LAND ON THE MALVINAS', archetypes: 'all', countries: ['Argentina', 'Uruguay', 'Chile'], minAge: 5 },
  { year: 1982, text: 'ARGENTINA INVADES THE FALKLANDS — THE FLEET SAILS', archetypes: 'all', countries: ['United Kingdom'], minAge: 5 },
  { year: 1982, text: 'BREZHNEV IS DEAD', archetypes: 'all', countries: join(R.soviet, R.eastBloc, ['Mongolia']), minAge: 5 },
  { year: 1982, text: 'MASSACRE AT SABRA AND SHATILA', archetypes: 'all', countries: ['Lebanon', 'Palestine', 'Israel', 'Syria', 'Jordan'], minAge: 8 },
  { year: 1983, text: 'INDIA WIN THE CRICKET WORLD CUP AT LORD\'S', archetypes: 'all', countries: ['India'], minAge: 5 },
  { year: 1983, text: 'BENIGNO AQUINO SHOT DEAD ON THE AIRPORT TARMAC', archetypes: 'all', countries: ['Philippines'], minAge: 5 },
  { year: 1983, text: 'RIOTS IN COLOMBO — TAMIL HOMES BURN', archetypes: 'all', countries: ['Sri Lanka', 'India'], minAge: 5 },
  { year: 1984, text: 'SOLDIERS END THE SECOND REPUBLIC — BUHARI IN POWER', archetypes: 'all', countries: ['Nigeria'], minAge: 5 },
  { year: 1984, text: 'BHOPAL GAS LEAK KILLS THOUSANDS OVERNIGHT — UNION CARBIDE PLANT', archetypes: 'all', countries: ['India'], minAge: 1 },
  { year: 1984, text: 'INDIRA GANDHI SHOT DEAD BY HER BODYGUARDS', archetypes: 'all', countries: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'], minAge: 5 },
  { year: 1984, text: 'THE MINERS ARE OUT', archetypes: 'all', countries: ['United Kingdom'], minAge: 8 },
  { year: 1984, text: 'FAMINE IN ETHIOPIA — THE PICTURES FROM KOREM', archetypes: 'all', countries: join(R.westEurope, ['United States', 'Canada', 'Kenya']), minAge: 5 },
  { year: 1985, text: 'GORBACHEV IN POWER — GLASNOST AND PERESTROIKA BEGIN', archetypes: 'all', countries: join(R.soviet, R.eastBloc, ['Mongolia']), minAge: 5 },
  { year: 1985, text: 'EARTHQUAKE LEVELS MEXICO CITY', archetypes: 'all', countries: ['Mexico', 'Guatemala'], minAge: 1 },
  { year: 1986, text: 'CHERNOBYL REACTOR EXPLODES — EVACUATION OF PRIPYAT', archetypes: 'all', countries: join(R.soviet, R.eastBloc, R.nordic, ['Germany', 'Austria']), minAge: 1 },
  { year: 1986, text: 'MARCOS FLEES — CROWDS ON EDSA', archetypes: 'all', countries: ['Philippines'], minAge: 1 },
  { year: 1986, text: 'ARGENTINA WIN THE WORLD CUP — MARADONA', archetypes: 'all', countries: ['Argentina', 'Uruguay', 'Mexico'], minAge: 5 },
  { year: 1986, text: 'SAMORA MACHEL KILLED IN A PLANE CRASH', archetypes: 'all', countries: ['Mozambique', 'Zimbabwe', 'Zambia', 'Tanzania', 'South Africa', 'Angola'], minAge: 5 },
  { year: 1986, text: 'OLOF PALME SHOT DEAD ON SVEAVÄGEN', archetypes: 'all', countries: ['Sweden', 'Norway', 'Denmark', 'Finland'], minAge: 5 },
  { year: 1987, text: 'STONES IN GAZA — THE INTIFADA BEGINS', archetypes: 'all', countries: ['Palestine', 'Israel', 'Jordan', 'Lebanon'], minAge: 5 },
  { year: 1987, text: 'COLONEL RABUKA TAKES PARLIAMENT', archetypes: 'all', countries: ['Fiji'], minAge: 5 },
  { year: 1988, text: 'IRAN-IRAQ WAR ENDS AFTER EIGHT YEARS', archetypes: 'all', countries: ['Iran', 'Iraq', 'Kuwait', 'Saudi Arabia'], minAge: 1 },
  { year: 1988, text: 'THE OLYMPICS OPEN IN SEOUL', archetypes: 'all', countries: ['South Korea', 'Japan'], minAge: 5 },
  { year: 1988, text: 'EARTHQUAKE DESTROYS SPITAK AND LENINAKAN', archetypes: 'all', countries: ['Armenia', 'Georgia', 'Azerbaijan', 'Russia'], minAge: 1 },
  { year: 1989, text: 'THE LAST SOVIET SOLDIER CROSSES THE AMU DARYA BRIDGE', archetypes: 'all', countries: join(R.soviet, ['Afghanistan']), minAge: 5 },
  { year: 1989, text: 'KHOMEINI IS DEAD', archetypes: 'all', countries: ['Iran', 'Iraq'], minAge: 5 },
  { year: 1989, text: 'EMPEROR HIROHITO IS DEAD', archetypes: 'all', countries: ['Japan'], minAge: 5 },
  { year: 1989, text: 'BERLIN WALL FALLS', archetypes: 'all', countries: COLD_WAR_EUROPE, minAge: 1 },
  { year: 1989, text: 'TIANANMEN SQUARE: TANKS CRUSH THE PROTESTS', archetypes: 'all', countries: join(['Taiwan', 'Japan', 'South Korea', 'Singapore', 'Malaysia'], R.anglo, R.westEurope), minAge: 5 },
  { year: 1989, text: 'COUNTER-REVOLUTIONARY RIOT PUT DOWN IN THE CAPITAL', archetypes: 'all', countries: ['China'], minAge: 8 },
  { year: 1989, text: 'CEAUȘESCU EXECUTED ON CHRISTMAS DAY — ROMANIA FREE', archetypes: 'all', countries: ['Romania', 'Moldova', 'Hungary', 'Bulgaria'], minAge: 1 },
  { year: 1989, text: 'TWO MILLION HOLD HANDS FROM TALLINN TO VILNIUS', archetypes: 'all', countries: R.baltic, minAge: 1 },
  { year: 1989, text: 'CARACAS RIOTS OVER BUS FARES — THE ARMY FIRES', archetypes: 'all', countries: ['Venezuela', 'Colombia'], minAge: 5 },

  // ── 1990s ────────────────────────────────────────────────────────────────────
  { year: 1990, text: 'MANDELA WALKS FREE AFTER 27 YEARS', archetypes: 'all', countries: join(R.southernAfrica, ['Kenya', 'Nigeria', 'Ghana', 'United Kingdom', 'United States']), minAge: 1 },
  { year: 1990, text: 'NAMIBIA INDEPENDENT', archetypes: 'all', countries: ['Namibia', 'South Africa', 'Angola'], minAge: 1 },
  { year: 1990, text: 'IRAQ INVADES KUWAIT', archetypes: 'all', countries: join(R.arab, ['Iran', 'Israel', 'Turkey', 'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Sri Lanka']), minAge: 5 },
  { year: 1990, text: 'GERMANY IS ONE COUNTRY AGAIN', archetypes: 'all', countries: ['Germany', 'Poland', 'Austria'], minAge: 1 },
  { year: 1991, text: 'GULF WAR — COALITION FORCES RETAKE KUWAIT', archetypes: 'all', countries: join(MIDEAST, R.anglo, ['France', 'Italy', 'Pakistan', 'Bangladesh', 'India']), minAge: 5 },
  { year: 1991, text: 'TANKS IN MOSCOW — GORBACHEV DETAINED IN CRIMEA', archetypes: 'all', countries: R.soviet, minAge: 5 },
  { year: 1991, text: 'THE SOVIET UNION IS DISSOLVED', archetypes: 'all', countries: join(COLD_WAR_EUROPE, ['Mongolia', 'Cuba', 'Afghanistan']), minAge: 1 },
  { year: 1991, text: 'USSR COLLAPSES — CUBA LOSES ITS MAIN TRADING PARTNER. THE SPECIAL PERIOD BEGINS.', archetypes: 'all', countries: ['Cuba'], minAge: 1 },
  { year: 1991, text: 'RAJIV GANDHI KILLED BY A SUICIDE BOMBER', archetypes: 'all', countries: ['India', 'Sri Lanka'], minAge: 5 },
  { year: 1991, text: 'MENGISTU FLEES — REBELS ENTER ADDIS ABABA', archetypes: 'all', countries: ['Ethiopia', 'Eritrea', 'Somalia', 'Djibouti'], minAge: 5 },
  { year: 1991, text: 'KAUNDA LOSES AFTER TWENTY-SEVEN YEARS', archetypes: 'all', countries: ['Zambia', 'Zimbabwe'], minAge: 5 },
  { year: 1992, text: 'YUGOSLAVIA TEARS ITSELF APART — WAR IN BOSNIA', archetypes: 'all', countries: join(R.westEurope, R.yugoslavia, ['Hungary', 'Albania', 'Bulgaria']), minAge: 5 },
  { year: 1992, text: 'THE BABRI MASJID PULLED DOWN IN AYODHYA', archetypes: 'all', countries: ['India', 'Pakistan', 'Bangladesh'], minAge: 5 },
  { year: 1992, text: 'PAKISTAN WIN THE CRICKET WORLD CUP IN MELBOURNE', archetypes: 'all', countries: ['Pakistan'], minAge: 5 },
  { year: 1993, text: 'OSLO ACCORDS SIGNED — PALESTINIANS AND ISRAELIS SHAKE HANDS', archetypes: 'all', countries: join(['Palestine', 'Israel', 'Jordan', 'Lebanon', 'Syria', 'Egypt', 'Norway', 'United States']), minAge: 5 },
  { year: 1993, text: 'BABANGIDA ANNULS THE JUNE 12 ELECTION', archetypes: 'all', countries: ['Nigeria'], minAge: 5 },
  { year: 1993, text: 'TANKS SHELL THE WHITE HOUSE IN MOSCOW', archetypes: 'all', countries: ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan'], minAge: 5 },
  { year: 1993, text: 'ESCOBAR SHOT DEAD ON A MEDELLÍN ROOFTOP', archetypes: 'all', countries: ['Colombia', 'Venezuela', 'Ecuador'], minAge: 5 },
  { year: 1993, text: 'ERITREA VOTES FOR INDEPENDENCE', archetypes: 'all', countries: ['Eritrea', 'Ethiopia'], minAge: 1 },
  { year: 1994, text: 'GENOCIDE IN RWANDA — HUNDREDS OF THOUSANDS DEAD IN A HUNDRED DAYS', archetypes: 'all', countries: join(['Rwanda', 'DR Congo', 'Uganda', 'Tanzania', 'Kenya', 'Belgium', 'France', 'Canada']), minAge: 5 },
  { year: 1994, text: 'APARTHEID ENDS — SOUTH AFRICA VOTES IN FIRST FREE ELECTION', archetypes: 'all', countries: R.southernAfrica, minAge: 5 },
  { year: 1994, text: 'THE CFA FRANC DEVALUED BY HALF OVERNIGHT', archetypes: 'all', countries: R.cfa, minAge: 10 },
  { year: 1994, text: 'ZAPATISTAS TAKE SAN CRISTÓBAL ON NEW YEAR\'S DAY', archetypes: 'all', countries: ['Mexico', 'Guatemala'], minAge: 5 },
  { year: 1994, text: 'KIM IL SUNG IS DEAD', archetypes: 'all', countries: ['North Korea', 'South Korea', 'China', 'Japan'], minAge: 1 },
  { year: 1994, text: 'BALSEROS: THOUSANDS OF CUBANS SET OUT ON RAFTS FOR FLORIDA', archetypes: 'all', countries: ['Cuba', 'United States'], minAge: 1 },
  { year: 1995, text: 'SREBRENICA MASSACRE — WORST ATROCITY IN EUROPE SINCE WORLD WAR II', archetypes: 'all', countries: join(R.yugoslavia, R.westEurope), minAge: 5 },
  { year: 1995, text: 'EARTHQUAKE IN KOBE — GAS ON THE SUBWAY IN TOKYO', archetypes: 'all', countries: ['Japan'], minAge: 5 },
  { year: 1995, text: 'KEN SARO-WIWA HANGED IN PORT HARCOURT', archetypes: 'all', countries: ['Nigeria', 'Ghana', 'United Kingdom'], minAge: 5 },
  { year: 1995, text: 'RABIN SHOT DEAD AT A PEACE RALLY', archetypes: 'all', countries: ['Israel', 'Palestine', 'Jordan', 'Egypt'], minAge: 5 },
  { year: 1996, text: 'SOUTH AFRICA\'S TRUTH AND RECONCILIATION COMMISSION BEGINS HEARINGS', archetypes: 'all', countries: ['South Africa'], minAge: 5 },
  { year: 1996, text: 'SRI LANKA WIN THE CRICKET WORLD CUP IN LAHORE', archetypes: 'all', countries: ['Sri Lanka'], minAge: 5 },
  { year: 1996, text: 'THE TALIBAN TAKE KABUL', archetypes: 'all', countries: ['Afghanistan', 'Pakistan', 'Iran', 'Tajikistan', 'Uzbekistan'], minAge: 5 },
  { year: 1997, text: 'HONG KONG RETURNED TO CHINA', archetypes: 'all', countries: ['China', 'United Kingdom', 'Taiwan'], minAge: 1 },
  { year: 1997, text: 'MOBUTU FLEES — KABILA\'S FORCES ENTER KINSHASA. ZAÏRE IS DEAD. THE DRC IS BORN AGAIN.', archetypes: 'all', countries: ['DR Congo', 'Rwanda', 'Uganda', 'Angola', 'Central African Republic'], minAge: 1 },
  { year: 1997, text: 'ASIAN FINANCIAL CRISIS — CURRENCIES COLLAPSING ACROSS THE CONTINENT', archetypes: 'all', countries: ['Thailand', 'Indonesia', 'South Korea', 'Malaysia', 'Philippines', 'Singapore', 'Japan', 'Taiwan', 'Laos'], minAge: 5 },
  { year: 1997, text: 'PRINCESS DIANA KILLED IN A PARIS TUNNEL', archetypes: 'all', countries: ['United Kingdom', 'Ireland', 'France', 'Australia', 'Canada', 'New Zealand'], minAge: 5 },
  { year: 1998, text: 'INDONESIA: SUHARTO RESIGNS AFTER 32 YEARS. RIOTS LEAVE THOUSANDS DEAD.', archetypes: 'all', countries: ['Indonesia', 'East Timor', 'Malaysia', 'Singapore'], minAge: 1 },
  { year: 1998, text: 'RUSSIA DEFAULTS — THE RUBLE COLLAPSES AGAIN', archetypes: 'all', countries: R.soviet, minAge: 5 },
  { year: 1998, text: 'NUCLEAR TESTS IN THE DESERT', archetypes: 'all', countries: ['India', 'Pakistan'], minAge: 5 },
  { year: 1998, text: 'GOOD FRIDAY AGREEMENT SIGNED IN BELFAST', archetypes: 'all', countries: ['United Kingdom', 'Ireland'], minAge: 5 },
  { year: 1998, text: 'EMBASSY BOMBS IN NAIROBI AND DAR ES SALAAM', archetypes: 'all', countries: ['Kenya', 'Tanzania', 'Uganda'], minAge: 5 },
  { year: 1998, text: 'HURRICANE MITCH — WHOLE TOWNS UNDER THE MUD', archetypes: 'all', countries: ['Honduras', 'Nicaragua', 'Guatemala', 'El Salvador'], minAge: 1 },
  { year: 1999, text: 'NATO BOMBS BELGRADE', archetypes: 'all', countries: join(R.yugoslavia, R.westEurope, ['Russia', 'Albania', 'Bulgaria', 'Hungary']), minAge: 5 },
  { year: 1999, text: 'OBASANJO SWORN IN — CIVILIAN RULE RETURNS', archetypes: 'all', countries: ['Nigeria'], minAge: 5 },
  { year: 1999, text: 'EAST TIMOR VOTES TO LEAVE — THE MILITIAS BURN DILI', archetypes: 'all', countries: ['East Timor', 'Indonesia', 'Australia', 'Portugal'], minAge: 5 },
  { year: 1999, text: 'THE ARMY TAKES OVER — NAWAZ SHARIF ARRESTED', archetypes: 'all', countries: ['Pakistan'], minAge: 5 },
  { year: 1999, text: 'EARTHQUAKE AT IZMIT — SEVENTEEN THOUSAND DEAD', archetypes: 'all', countries: ['Turkey', 'Greece'], minAge: 1 },

  // ── 2000s ────────────────────────────────────────────────────────────────────
  { year: 1999, text: 'YELTSIN RESIGNS ON NEW YEAR\'S EVE — PUTIN ACTING PRESIDENT', archetypes: 'all', countries: R.soviet, minAge: 8 },
  { year: 2000, text: 'SHARON WALKS ON THE TEMPLE MOUNT — A SECOND INTIFADA', archetypes: 'all', countries: ['Palestine', 'Israel', 'Jordan', 'Lebanon', 'Egypt'], minAge: 5 },
  // Everyone's news, except in the one country whose papers did not carry it.
  { year: 2001, text: 'AEROPLANES FLY INTO THE WORLD TRADE CENTER', archetypes: 'all', countries: but('North Korea'), minAge: 5 },
  { year: 2001, text: 'THE CROWN PRINCE OPENS FIRE AT A PALACE DINNER — THE KING IS DEAD', archetypes: 'all', countries: ['Nepal', 'India'], minAge: 5 },
  { year: 2001, text: 'CORRALITO — DE LA RÚA LEAVES THE CASA ROSADA BY HELICOPTER', archetypes: 'all', countries: ['Argentina', 'Uruguay'], minAge: 5 },
  { year: 2002, text: 'THE EURO IN EVERYONE\'S POCKET', archetypes: 'all', countries: ['Germany', 'France', 'Italy', 'Spain', 'Portugal', 'Netherlands', 'Belgium', 'Austria', 'Finland', 'Ireland', 'Greece'], minAge: 5 },
  { year: 2002, text: 'SAVIMBI KILLED — THE WAR IS OVER', archetypes: 'all', countries: ['Angola', 'Namibia', 'Zambia'], minAge: 5 },
  { year: 2002, text: 'LULA ELECTED', archetypes: 'all', countries: ['Brazil'], minAge: 8 },
  { year: 2002, text: 'THE WORLD CUP IN SEOUL AND YOKOHAMA', archetypes: 'all', countries: ['South Korea', 'Japan'], minAge: 5 },
  { year: 2003, text: 'US AND BRITISH TROOPS INVADE IRAQ — BAGHDAD FALLS IN THREE WEEKS', archetypes: 'all', countries: join(MIDEAST, R.anglo, ['Poland', 'Spain', 'Italy', 'Germany', 'France', 'Pakistan', 'South Korea', 'Japan']), minAge: 5 },
  { year: 2004, text: 'TSUNAMI KILLS TWO HUNDRED THOUSAND ACROSS THE INDIAN OCEAN', archetypes: 'all', countries: ['Indonesia', 'Sri Lanka', 'India', 'Thailand', 'Maldives', 'Malaysia', 'Myanmar', 'Somalia', 'Bangladesh', 'Kenya', 'Tanzania', 'Sweden', 'Norway', 'Finland', 'Germany', 'United Kingdom', 'Australia'], minAge: 5 },
  { year: 2004, text: 'SCHOOL SIEGE IN BESLAN', archetypes: 'all', countries: ['Russia', 'Georgia', 'Ukraine', 'Belarus'], minAge: 5 },
  { year: 2004, text: 'ORANGE ON THE MAIDAN — THE ELECTION OVERTURNED', archetypes: 'all', countries: ['Ukraine', 'Russia', 'Poland', 'Georgia', 'Belarus', 'Moldova'], minAge: 5 },
  { year: 2005, text: 'HURRICANE KATRINA FLOODS NEW ORLEANS — GOVERNMENT FAILS', archetypes: 'all', countries: ['United States'], minAge: 5 },
  { year: 2005, text: 'HARIRI KILLED BY A TRUCK BOMB IN BEIRUT', archetypes: 'all', countries: ['Lebanon', 'Syria', 'Jordan', 'Saudi Arabia'], minAge: 5 },
  { year: 2005, text: 'BOMBS ON THE LONDON UNDERGROUND', archetypes: 'all', countries: ['United Kingdom', 'Ireland'], minAge: 5 },
  { year: 2005, text: 'EARTHQUAKE IN KASHMIR', archetypes: 'all', countries: ['Pakistan', 'India'], minAge: 1 },
  { year: 2007, text: 'BENAZIR BHUTTO KILLED IN RAWALPINDI', archetypes: 'all', countries: ['Pakistan', 'India', 'Afghanistan'], minAge: 5 },
  { year: 2007, text: 'M-PESA LAUNCHES IN KENYA — MOBILE MONEY CHANGES AFRICA', archetypes: 'all', countries: ['Kenya'], minAge: 5 },
  // The crash reached every newspaper. It was the front page as a household
  // event where it took the house, the job or the bank with it.
  { year: 2008, text: 'BANKS COLLAPSE — GLOBAL FINANCIAL CRISIS', archetypes: 'all', countries: ['United States', 'United Kingdom', 'Ireland', 'Iceland', 'Spain', 'Portugal', 'Greece', 'Italy', 'Germany', 'France', 'Netherlands', 'Belgium', 'Latvia', 'Lithuania', 'Estonia', 'Hungary', 'Ukraine', 'Japan', 'South Korea', 'Canada'], minAge: 10 },
  { year: 2008, text: 'BARACK OBAMA ELECTED PRESIDENT OF THE UNITED STATES', archetypes: 'all', countries: ['United States', 'Kenya', 'Canada'], minAge: 5 },
  { year: 2008, text: 'KENYA BURNS AFTER THE DISPUTED ELECTION', archetypes: 'all', countries: ['Kenya', 'Uganda', 'Tanzania'], minAge: 5 },
  { year: 2008, text: 'EARTHQUAKE IN SICHUAN — THE SCHOOLS FELL', archetypes: 'all', countries: ['China', 'Taiwan'], minAge: 5 },
  { year: 2008, text: 'THE OLYMPICS OPEN IN BEIJING', archetypes: 'all', countries: ['China', 'Taiwan', 'Mongolia'], minAge: 5 },
  { year: 2008, text: 'CYCLONE NARGIS — THE DELTA UNDER WATER', archetypes: 'all', countries: ['Myanmar', 'Thailand', 'Bangladesh'], minAge: 1 },
  { year: 2008, text: 'RUSSIAN TANKS IN SOUTH OSSETIA', archetypes: 'all', countries: ['Georgia', 'Russia', 'Ukraine', 'Armenia', 'Azerbaijan'], minAge: 5 },
  { year: 2008, text: 'RUDD SAYS SORRY — AUSTRALIA APOLOGISES TO THE STOLEN GENERATIONS', archetypes: 'all', countries: ['Australia'], minAge: 5 },
  { year: 2009, text: 'ZIMBABWE PRINTS ONE HUNDRED TRILLION DOLLAR NOTES. THE EXCHANGE RATE CHANGES HOURLY.', archetypes: 'all', countries: ['Zimbabwe', 'South Africa', 'Zambia'], minAge: 1 },
  { year: 2009, text: 'IRAN: MILLIONS TAKE TO THE STREETS — GREEN MOVEMENT CRUSHED', archetypes: 'all', countries: ['Iran'], minAge: 5 },
  { year: 2009, text: 'THE TIGERS DEFEATED — THE WAR IN THE NORTH IS OVER', archetypes: 'all', countries: ['Sri Lanka', 'India'], minAge: 5 },

  // ── 2010s ────────────────────────────────────────────────────────────────────
  { year: 2010, text: 'EARTHQUAKE KILLS TWO HUNDRED THOUSAND IN HAITI', archetypes: 'all', countries: ['Haiti', 'Dominican Republic', 'United States', 'Canada', 'France', 'Cuba', 'Brazil', 'Jamaica'], minAge: 1 },
  { year: 2010, text: 'THE GREEK BAILOUT — AUSTERITY IN EXCHANGE', archetypes: 'all', countries: ['Greece', 'Cyprus', 'Germany'], minAge: 10 },
  { year: 2010, text: 'THIRTY-THREE MINERS BROUGHT UP ALIVE AT SAN JOSÉ', archetypes: 'all', countries: ['Chile', 'Bolivia', 'Peru', 'Argentina'], minAge: 5 },
  { year: 2011, text: 'ARAB SPRING: PRESIDENT OF TUNISIA FLEES', archetypes: 'all', countries: join(R.arab, ['France']), minAge: 5 },
  { year: 2011, text: 'HOSNI MUBARAK RESIGNS — EGYPT\'S REVOLUTION SUCCEEDS', archetypes: 'all', countries: join(R.arab, ['Israel']), minAge: 5 },
  { year: 2011, text: 'OSAMA BIN LADEN KILLED IN PAKISTAN', archetypes: 'all', countries: ['Pakistan', 'Afghanistan', 'United States', 'United Kingdom', 'Saudi Arabia', 'India'], minAge: 5 },
  { year: 2011, text: 'SOUTH SUDAN BECOMES THE WORLD\'S NEWEST COUNTRY', archetypes: 'all', countries: ['Sudan', 'Kenya', 'Uganda', 'Ethiopia'], minAge: 5 },
  { year: 2011, text: 'EARTHQUAKE AND TSUNAMI — THE REACTORS AT FUKUSHIMA', archetypes: 'all', countries: ['Japan', 'South Korea', 'Taiwan', 'China', 'Germany'], minAge: 1 },
  { year: 2011, text: 'KIM JONG IL IS DEAD', archetypes: 'all', countries: ['North Korea', 'South Korea'], minAge: 5 },
  { year: 2011, text: 'SEVENTY-SEVEN DEAD IN OSLO AND ON UTØYA', archetypes: 'all', countries: ['Norway', 'Sweden', 'Denmark'], minAge: 5 },
  { year: 2013, text: 'RANA PLAZA COLLAPSES IN BANGLADESH — 1,134 GARMENT WORKERS DEAD', archetypes: 'all', countries: ['Bangladesh'], minAge: 1 },
  { year: 2013, text: 'EDWARD SNOWDEN REVEALS THE NSA IS WATCHING EVERYONE', archetypes: 'all', countries: ['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'New Zealand'], minAge: 10 },
  { year: 2013, text: 'CHÁVEZ IS DEAD', archetypes: 'all', countries: ['Venezuela', 'Cuba', 'Colombia', 'Bolivia', 'Ecuador'], minAge: 5 },
  { year: 2014, text: 'RUSSIA ANNEXES CRIMEA', archetypes: 'all', countries: join(R.soviet, R.westEurope, R.eastBloc, ['United States', 'Canada']), minAge: 5 },
  { year: 2014, text: 'EBOLA IN THE CAPITAL — THE SCHOOLS ARE CLOSED', archetypes: 'all', countries: ['Liberia', 'Sierra Leone', 'Guinea'], minAge: 5 },
  { year: 2014, text: 'GIRLS TAKEN FROM THE SCHOOL AT CHIBOK', archetypes: 'all', countries: ['Nigeria', 'Cameroon', 'Chad', 'Niger'], minAge: 5 },
  { year: 2015, text: 'EARTHQUAKE IN NEPAL — KATHMANDU\'S SQUARES IN RUBBLE', archetypes: 'all', countries: ['Nepal', 'India', 'Bhutan'], minAge: 1 },
  { year: 2015, text: 'PARIS AGREEMENT SIGNED — 196 COUNTRIES PLEDGE TO LIMIT WARMING', archetypes: 'all', countries: join(['France', 'Germany', 'United Kingdom', 'Sweden', 'Norway', 'Denmark', 'Netherlands'], R.pacific, ['Maldives']), minAge: 10 },
  { year: 2015, text: 'CANADA\'S TRUTH AND RECONCILIATION COMMISSION: 94 CALLS TO ACTION', archetypes: 'all', countries: ['Canada'], minAge: 5 },
  { year: 2015, text: 'ONE-CHILD POLICY ENDS IN CHINA AFTER 35 YEARS', archetypes: 'all', countries: ['China'], minAge: 5 },
  { year: 2016, text: 'BRITAIN VOTES TO LEAVE THE EUROPEAN UNION', archetypes: 'all', countries: R.westEurope, minAge: 5 },
  { year: 2016, text: 'DONALD TRUMP WINS THE AMERICAN PRESIDENCY', archetypes: 'all', countries: ['United States', 'Mexico', 'Canada'], minAge: 5 },
  { year: 2016, text: 'TANKS ON THE BOSPHORUS BRIDGE — THE COUP FAILS BY MORNING', archetypes: 'all', countries: ['Turkey'], minAge: 5 },
  { year: 2016, text: 'PEACE SIGNED WITH THE FARC', archetypes: 'all', countries: ['Colombia', 'Venezuela', 'Ecuador', 'Cuba'], minAge: 5 },
  { year: 2017, text: 'ROHINGYA DRIVEN FROM MYANMAR — UN CALLS IT ETHNIC CLEANSING', archetypes: 'all', countries: ['Myanmar', 'Bangladesh', 'Malaysia', 'Indonesia'], minAge: 5 },
  { year: 2017, text: 'MUGABE RESIGNS AFTER THIRTY-SEVEN YEARS', archetypes: 'all', countries: ['Zimbabwe', 'South Africa', 'Zambia', 'Mozambique'], minAge: 5 },
  { year: 2019, text: 'HONG KONG PROTESTS — MILLIONS IN THE STREETS', archetypes: 'all', countries: ['Taiwan', 'United Kingdom'], minAge: 5 },
  { year: 2019, text: 'BASHIR FALLS AFTER MONTHS OF PROTEST', archetypes: 'all', countries: ['Sudan', 'Egypt', 'Ethiopia'], minAge: 5 },

  // ── 2020s ────────────────────────────────────────────────────────────────────
  { year: 2020, text: 'COVID-19 DECLARED A PANDEMIC — THE WORLD LOCKS DOWN', archetypes: 'all', countries: but('North Korea', 'Turkmenistan'), minAge: 1 },
  { year: 2020, text: 'THE BORDER IS SEALED AGAINST THE EPIDEMIC', archetypes: 'all', countries: ['North Korea', 'Turkmenistan'], minAge: 5 },
  { year: 2020, text: 'BEIRUT PORT EXPLODES — HALF THE CITY IN RUBBLE', archetypes: 'all', countries: ['Lebanon', 'Syria', 'Jordan'], minAge: 1 },
  { year: 2020, text: '#ENDSARS — SHOTS AT THE LEKKI TOLL GATE', archetypes: 'all', countries: ['Nigeria'], minAge: 10 },
  { year: 2021, text: 'MYANMAR MILITARY SEIZES POWER IN COUP', archetypes: 'all', countries: ['Myanmar', 'Thailand'], minAge: 5 },
  { year: 2021, text: 'KABUL FALLS — AMERICA\'S LONGEST WAR ENDS IN CHAOS', archetypes: 'all', countries: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'], minAge: 5 },
  { year: 2021, text: 'THE TALIBAN ENTER KABUL — THE PRESIDENT HAS LEFT THE COUNTRY', archetypes: 'all', countries: ['Afghanistan', 'Pakistan', 'Iran', 'Tajikistan', 'Uzbekistan'], minAge: 5 },
  { year: 2022, text: 'RUSSIA INVADES UKRAINE — EUROPE\'S LARGEST WAR SINCE 1945', archetypes: 'all', countries: join(R.westEurope, R.eastBloc, R.baltic, ['Ukraine', 'Moldova', 'Georgia', 'United States', 'Canada']), minAge: 5 },
  { year: 2022, text: 'THE SPECIAL MILITARY OPERATION BEGINS', archetypes: 'all', countries: ['Russia', 'Belarus'], minAge: 8 },

  // ── HISTORICAL (earlier gaps) ─────────────────────────────────────────────
  { year: 1942, text: 'FRENCH POLICE ARREST 13,000 JEWISH RESIDENTS — VEL D\'HIV ROUNDUP', archetypes: 'all', countries: ['France'], minAge: 5 },
  { year: 1992, text: 'HIGH COURT OVERTURNS TERRA NULLIUS — MABO DECISION REWRITES AUSTRALIAN LAW', archetypes: 'all', countries: ['Australia'], minAge: 5 },

  // ── 2025+ ─────────────────────────────────────────────────────────────────
  // Projections, kept to the places where they would be the front page, and
  // kept few: a long life's last third was one climate banner after another.
  { year: 2025, text: 'GLOBAL TEMPERATURES BREACH 1.5°C THRESHOLD FOR FIRST TIME', archetypes: 'all', countries: join(R.westEurope, R.pacific, ['Maldives']), minAge: 10 },
  { year: 2030, text: 'GREAT BARRIER REEF: FOURTH CONSECUTIVE MASS BLEACHING', archetypes: 'all', countries: ['Australia'], minAge: 5 },
  { year: 2035, text: 'PACIFIC ISLAND NATIONS REQUEST RESETTLEMENT', archetypes: 'all', countries: join(R.pacific, ['Australia', 'New Zealand']), minAge: 5 },
  { year: 2055, text: 'OUTDOOR WORK BANNED IN THE SUMMER MONTHS', archetypes: 'all', countries: R.gulf, minAge: 5 },
  { year: 2065, text: 'THE LAST FAMILIES LEAVE MALÉ', archetypes: 'all', countries: ['Maldives', 'Sri Lanka', 'India'], minAge: 1 },
]

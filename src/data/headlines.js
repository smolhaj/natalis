// Major historical moments injected as headline log entries when a character
// lives through the matching year. Displayed with distinct visual styling
// in the life log — not events, just immersive historical texture.
//
// Format: { year, text, archetypes, countries }
// archetypes: array of archetypes this fires for, or 'all'
// countries: specific country names to restrict to, or null (fires for matching archetypes)

export const HEADLINES = [
  // ── 1900s–1940s ────────────────────────────────────────────────────────────
  { year: 1918, text: 'ARMISTICE SIGNED — THE WAR IS OVER', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1929, text: 'STOCK MARKET COLLAPSES — BANKS CLOSE ACROSS THE COUNTRY', archetypes: ['wealthy_west'], countries: null, minAge: 1 },
  { year: 1933, text: 'HITLER APPOINTED CHANCELLOR OF GERMANY', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1939, text: 'BRITAIN AND FRANCE DECLARE WAR ON GERMANY', archetypes: ['wealthy_west', 'post_soviet'], countries: null, minAge: 1 },
  { year: 1941, text: 'JAPAN ATTACKS PEARL HARBOR — UNITED STATES ENTERS THE WAR', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1945, text: 'GERMANY SURRENDERS — WAR IN EUROPE OVER', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1945, text: 'ATOMIC BOMBS DROPPED ON HIROSHIMA AND NAGASAKI — JAPAN SURRENDERS', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1947, text: 'INDIA AND PAKISTAN INDEPENDENT — PARTITION DIVIDES THE SUBCONTINENT', archetypes: 'all', countries: ['India', 'Pakistan'], minAge: 1 },
  { year: 1948, text: 'STATE OF ISRAEL DECLARED', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1949, text: 'MAO PROCLAIMS THE PEOPLE\'S REPUBLIC OF CHINA', archetypes: 'all', countries: ['China'], minAge: 1 },

  // ── 1950s ────────────────────────────────────────────────────────────────────
  { year: 1950, text: 'NORTH KOREA INVADES THE SOUTH — WAR BEGINS ON THE PENINSULA', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1953, text: 'KOREAN WAR ARMISTICE SIGNED', archetypes: 'all', countries: null, minAge: 1 },
  { year: 1953, text: 'STALIN IS DEAD', archetypes: ['post_soviet'], countries: null, minAge: 1 },
  { year: 1955, text: 'ROSA PARKS REFUSES TO GIVE UP HER SEAT', archetypes: ['wealthy_west'], countries: ['United States'], minAge: 5 },
  { year: 1957, text: 'GHANA INDEPENDENT — AFRICA\'S FIRST', archetypes: ['subsaharan'], countries: ['Ghana'], minAge: 1 },
  { year: 1957, text: 'SOVIETS LAUNCH SPUTNIK — SPACE AGE BEGINS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1959, text: 'FIDEL CASTRO TAKES HAVANA — BATISTA FLEES', archetypes: 'all', countries: ['Cuba'], minAge: 1 },

  // ── 1960s ────────────────────────────────────────────────────────────────────
  { year: 1960, text: 'LUMUMBA DECLARES INDEPENDENCE: "CONGO FOR THE CONGOLESE PEOPLE"', archetypes: 'all', countries: ['DR Congo'], minAge: 1 },
  { year: 1961, text: 'LUMUMBA ASSASSINATED — CONGO\'S FIRST PRIME MINISTER IS DEAD', archetypes: 'all', countries: ['DR Congo'], minAge: 1 },
  { year: 1961, text: 'BAY OF PIGS: CIA-BACKED INVASION OF CUBA COLLAPSES IN 72 HOURS', archetypes: ['wealthy_west'], countries: null, minAge: 5 },
  { year: 1961, text: 'BERLIN WALL GOES UP OVERNIGHT', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 1 },
  { year: 1961, text: 'YURI GAGARIN ORBITS THE EARTH', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1963, text: 'PRESIDENT KENNEDY ASSASSINATED IN DALLAS', archetypes: ['wealthy_west'], countries: ['United States'], minAge: 5 },
  { year: 1965, text: 'US COMBAT TROOPS LAND IN VIETNAM', archetypes: ['wealthy_west'], countries: null, minAge: 5 },
  { year: 1967, text: 'ISRAEL DEFEATS EGYPT, SYRIA, JORDAN IN SIX DAYS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1968, text: 'MARTIN LUTHER KING SHOT DEAD IN MEMPHIS', archetypes: ['wealthy_west'], countries: ['United States'], minAge: 5 },
  { year: 1968, text: 'SOVIET TANKS ROLL INTO PRAGUE', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },
  { year: 1969, text: 'MAN WALKS ON THE MOON', archetypes: 'all', countries: null, minAge: 3 },

  // ── 1970s ────────────────────────────────────────────────────────────────────
  { year: 1970, text: 'CYCLONE BHOLA KILLS HALF A MILLION IN EAST PAKISTAN — GOVERNMENT SLOW TO RESPOND', archetypes: 'all', countries: ['Bangladesh'], minAge: 1 },
  { year: 1971, text: 'BANGLADESH DECLARES INDEPENDENCE. NINE MONTHS OF WAR. INDIA INTERVENES. PAKISTAN SURRENDERS.', archetypes: 'all', countries: ['Bangladesh', 'Pakistan'], minAge: 1 },
  { year: 1973, text: 'OIL EMBARGO — PETROL QUEUES STRETCH FOR MILES', archetypes: ['wealthy_west', 'wealthy_east'], countries: null, minAge: 5 },
  { year: 1973, text: 'PINOCHET SEIZES POWER IN CHILE — ALLENDE DEAD', archetypes: 'all', countries: ['Chile'], minAge: 5 },
  { year: 1975, text: 'SAIGON FALLS — AMERICAN HELICOPTERS EVACUATE THE ROOF', archetypes: 'all', countries: ['Vietnam'], minAge: 1 },
  { year: 1975, text: 'KHMER ROUGE TAKES PHNOM PENH — CITY EVACUATED AT GUNPOINT', archetypes: 'all', countries: ['Cambodia'], minAge: 1 },
  { year: 1976, text: 'MAO ZEDONG IS DEAD', archetypes: 'all', countries: ['China'], minAge: 1 },
  { year: 1979, text: 'SHAH OF IRAN FLEES — AYATOLLAH KHOMEINI RETURNS', archetypes: 'all', countries: ['Iran'], minAge: 1 },
  { year: 1979, text: 'SOVIET TROOPS ENTER AFGHANISTAN', archetypes: ['post_soviet'], countries: null, minAge: 5 },

  // ── 1980s ────────────────────────────────────────────────────────────────────
  { year: 1979, text: 'VIETNAMESE TROOPS ENTER PHNOM PENH — POL POT\'S REGIME COLLAPSES', archetypes: 'all', countries: ['Cambodia', 'Vietnam'], minAge: 1 },
  { year: 1980, text: 'MARIEL BOATLIFT: 125,000 CUBANS FLEE TO FLORIDA IN FIVE MONTHS', archetypes: 'all', countries: ['Cuba'], minAge: 1 },
  { year: 1980, text: 'IRAN-IRAQ WAR BEGINS', archetypes: 'all', countries: ['Iran', 'Iraq'], minAge: 1 },
  { year: 1981, text: 'DOCTORS REPORT STRANGE NEW ILLNESS AMONG GAY MEN IN NEW YORK', archetypes: ['wealthy_west'], countries: ['United States'], minAge: 10 },
  { year: 1984, text: 'BHOPAL GAS LEAK — THOUSANDS DEAD IN THE NIGHT', archetypes: 'all', countries: ['India'], minAge: 1 },
  { year: 1985, text: 'GORBACHEV IN POWER — GLASNOST AND PERESTROIKA BEGIN', archetypes: ['post_soviet'], countries: null, minAge: 5 },
  { year: 1986, text: 'CHERNOBYL REACTOR EXPLODES — EVACUATION OF PRIPYAT', archetypes: ['post_soviet'], countries: null, minAge: 1 },
  { year: 1988, text: 'IRAN-IRAQ WAR ENDS AFTER EIGHT YEARS', archetypes: 'all', countries: ['Iran', 'Iraq'], minAge: 1 },
  { year: 1989, text: 'BERLIN WALL FALLS', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 1 },
  { year: 1989, text: 'TIANANMEN SQUARE: TANKS CRUSH THE PROTESTS', archetypes: 'all', countries: ['China'], minAge: 5 },
  { year: 1989, text: 'CEAUȘESCU EXECUTED ON CHRISTMAS DAY — ROMANIA FREE', archetypes: ['post_soviet'], countries: ['Romania'], minAge: 1 },

  // ── 1990s ────────────────────────────────────────────────────────────────────
  { year: 1990, text: 'MANDELA WALKS FREE AFTER 27 YEARS', archetypes: 'all', countries: ['South Africa'], minAge: 1 },
  { year: 1991, text: 'GULF WAR — COALITION FORCES RETAKE KUWAIT', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1991, text: 'THE SOVIET UNION IS DISSOLVED', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 1 },
  { year: 1992, text: 'YUGOSLAVIA TEARS ITSELF APART — WAR IN BOSNIA', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },
  { year: 1993, text: 'OSLO ACCORDS SIGNED — PALESTINIANS AND ISRAELIS SHAKE HANDS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1994, text: 'GENOCIDE IN RWANDA — ONE MILLION DEAD IN A HUNDRED DAYS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 1994, text: 'MANDELA VOTES — SOUTH AFRICA\'S FIRST FREE ELECTION', archetypes: 'all', countries: ['South Africa'], minAge: 1 },
  { year: 1995, text: 'SREBRENICA MASSACRE — WORST ATROCITY IN EUROPE SINCE WORLD WAR II', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },
  { year: 1997, text: 'HONG KONG RETURNED TO CHINA', archetypes: 'all', countries: ['China'], minAge: 1 },
  { year: 1991, text: 'USSR COLLAPSES — CUBA LOSES ITS MAIN TRADING PARTNER. THE SPECIAL PERIOD BEGINS.', archetypes: 'all', countries: ['Cuba'], minAge: 1 },
  { year: 1994, text: 'BALSEROS: THOUSANDS OF CUBANS SET OUT ON RAFTS FOR FLORIDA', archetypes: 'all', countries: ['Cuba'], minAge: 1 },
  { year: 1997, text: 'MOBUTU FLEES — KABILA\'S FORCES ENTER KINSHASA. ZAÏRE IS DEAD. THE DRC IS BORN AGAIN.', archetypes: 'all', countries: ['DR Congo'], minAge: 1 },
  { year: 1997, text: 'ASIAN FINANCIAL CRISIS — CURRENCIES COLLAPSING ACROSS THE CONTINENT', archetypes: ['wealthy_east', 'developing_urban'], countries: null, minAge: 5 },
  { year: 1998, text: 'INDONESIA: SUHARTO RESIGNS AFTER 32 YEARS. RIOTS LEAVE THOUSANDS DEAD.', archetypes: 'all', countries: ['Indonesia'], minAge: 1 },
  { year: 1998, text: 'RUSSIA DEFAULTS — THE RUBLE COLLAPSES AGAIN', archetypes: ['post_soviet'], countries: null, minAge: 5 },
  { year: 1999, text: 'NATO BOMBS BELGRADE', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },

  // ── 2000s ────────────────────────────────────────────────────────────────────
  { year: 2001, text: 'AEROPLANES FLY INTO THE WORLD TRADE CENTER', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2003, text: 'US AND BRITAIN INVADE IRAQ — NO WMD FOUND', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2004, text: 'TSUNAMI KILLS TWO HUNDRED THOUSAND ACROSS THE INDIAN OCEAN', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2005, text: 'HURRICANE KATRINA FLOODS NEW ORLEANS — GOVERNMENT FAILS', archetypes: ['wealthy_west'], countries: ['United States'], minAge: 5 },
  { year: 2008, text: 'BANKS COLLAPSE — GLOBAL FINANCIAL CRISIS', archetypes: ['wealthy_west', 'wealthy_east', 'post_soviet'], countries: null, minAge: 5 },
  { year: 2008, text: 'BARACK OBAMA ELECTED PRESIDENT OF THE UNITED STATES', archetypes: 'all', countries: ['United States'], minAge: 5 },
  { year: 2007, text: 'M-PESA LAUNCHES IN KENYA — MOBILE MONEY CHANGES AFRICA', archetypes: ['subsaharan'], countries: ['Kenya'], minAge: 5 },
  { year: 2008, text: 'ZIMBABWE PRINTS ONE HUNDRED TRILLION DOLLAR NOTES. THE EXCHANGE RATE CHANGES HOURLY.', archetypes: 'all', countries: ['Zimbabwe'], minAge: 1 },
  { year: 2009, text: 'IRAN: MILLIONS TAKE TO THE STREETS — GREEN REVOLUTION CRUSHED', archetypes: 'all', countries: ['Iran'], minAge: 5 },

  // ── 2010s ────────────────────────────────────────────────────────────────────
  { year: 2010, text: 'EARTHQUAKE KILLS TWO HUNDRED THOUSAND IN HAITI', archetypes: 'all', countries: null, minAge: 1 },
  { year: 2010, text: 'ARAB SPRING: PRESIDENT OF TUNISIA FLEES', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2011, text: 'HOSNI MUBARAK RESIGNS — EGYPT\'S REVOLUTION SUCCEEDS', archetypes: 'all', countries: ['Egypt'], minAge: 5 },
  { year: 2011, text: 'OSAMA BIN LADEN KILLED IN PAKISTAN', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2011, text: 'SOUTH SUDAN BECOMES THE WORLD\'S NEWEST COUNTRY', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2013, text: 'RANA PLAZA COLLAPSES IN BANGLADESH — 1,134 GARMENT WORKERS DEAD', archetypes: 'all', countries: ['Bangladesh'], minAge: 1 },
  { year: 2013, text: 'EDWARD SNOWDEN REVEALS THE NSA IS WATCHING EVERYONE', archetypes: ['wealthy_west'], countries: null, minAge: 10 },
  { year: 2014, text: 'RUSSIA ANNEXES CRIMEA', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },
  { year: 2016, text: 'BRITAIN VOTES TO LEAVE THE EUROPEAN UNION', archetypes: ['wealthy_west'], countries: null, minAge: 5 },
  { year: 2016, text: 'DONALD TRUMP WINS THE AMERICAN PRESIDENCY', archetypes: 'all', countries: ['United States'], minAge: 5 },
  { year: 2017, text: 'ROHINGYA DRIVEN FROM MYANMAR — UN CALLS IT ETHNIC CLEANSING', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2019, text: 'HONG KONG PROTESTS — MILLIONS IN THE STREETS', archetypes: 'all', countries: ['China'], minAge: 5 },

  // ── 2020s ────────────────────────────────────────────────────────────────────
  { year: 2020, text: 'COVID-19 DECLARED A PANDEMIC — THE WORLD LOCKS DOWN', archetypes: 'all', countries: null, minAge: 1 },
  { year: 2020, text: 'BEIRUT PORT EXPLODES — HALF THE CITY IN RUBBLE', archetypes: 'all', countries: ['Lebanon'], minAge: 1 },
  { year: 2021, text: 'MYANMAR MILITARY SEIZES POWER IN COUP', archetypes: 'all', countries: ['Myanmar'], minAge: 5 },
  { year: 2021, text: 'KABUL FALLS — AMERICA\'S LONGEST WAR ENDS IN CHAOS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2022, text: 'RUSSIA INVADES UKRAINE — EUROPE\'S LARGEST WAR SINCE 1945', archetypes: ['post_soviet', 'wealthy_west'], countries: null, minAge: 5 },

  // ── HISTORICAL (earlier gaps) ─────────────────────────────────────────────
  { year: 1971, text: 'BANGLADESH WINS INDEPENDENCE AFTER NINE MONTHS OF WAR AND MASS ATROCITY', archetypes: 'all', countries: ['Bangladesh'], minAge: 1 },
  { year: 1992, text: 'HIGH COURT OVERTURNS TERRA NULLIUS — MABO DECISION REWRITES AUSTRALIAN LAW', archetypes: 'all', countries: ['Australia'], minAge: 5 },
  { year: 2008, text: 'RUDD SAYS SORRY — AUSTRALIA APOLOGISES TO THE STOLEN GENERATIONS', archetypes: 'all', countries: ['Australia'], minAge: 5 },
  { year: 2015, text: 'PARIS AGREEMENT SIGNED — 196 COUNTRIES PLEDGE TO LIMIT WARMING', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2015, text: 'CANADA\'S TRUTH AND RECONCILIATION COMMISSION: 94 CALLS TO ACTION', archetypes: 'all', countries: ['Canada'], minAge: 5 },
  { year: 2015, text: 'ONE-CHILD POLICY ENDS IN CHINA AFTER 35 YEARS', archetypes: 'all', countries: ['China'], minAge: 5 },

  // ── 2025+ ─────────────────────────────────────────────────────────────────
  { year: 2025, text: 'GLOBAL TEMPERATURES BREACH 1.5°C THRESHOLD FOR FIRST TIME', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2030, text: 'GREAT BARRIER REEF: FOURTH CONSECUTIVE MASS BLEACHING', archetypes: 'all', countries: ['Australia'], minAge: 5 },
  { year: 2035, text: 'PACIFIC ISLAND NATIONS DECLARE CLIMATE EMERGENCY — REQUEST MASS RESETTLEMENT', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2040, text: 'UN: 200 MILLION CLIMATE DISPLACED — REFUGEE CONVENTION DOES NOT COVER THEM', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2045, text: 'WEST ANTARCTIC ICE SHEET COLLAPSE CONFIRMED — SEA LEVEL RISE NOW LOCKED IN', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2055, text: 'GULF STATES ANNOUNCE MANDATORY INDOOR ORDINANCES FOR SUMMER MONTHS', archetypes: 'all', countries: null, minAge: 5 },
  { year: 2065, text: 'MALDIVES COMPLETES NATIONAL EVACUATION — FIRST COUNTRY ERASED BY CLIMATE CHANGE', archetypes: 'all', countries: null, minAge: 1 },
]

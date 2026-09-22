// economy.js — when the money was worth what it was worth.
//
// The game's economy was a statement about NOW, in exactly the way
// `isWealthyArch` was before technology.js: `careers.js` carries salary ranges
// in present-day dollars, `assets.js` carries prices in present-day dollars,
// and both were scaled by the country's present-day GDP tier and by nothing
// else. Read as history that printed
//
//     You begin working as a Taxi Driver. Starting salary: $19,540/yr.
//
// into 1948 Germany, a country that had reissued its currency four months
// earlier and whose average worker took home about DM 2,400 — roughly $720 at
// the official rate. Every dollar figure the game has ever shown a player
// before about 1995 has been wrong by one to two orders of magnitude, in the
// one place where a wrong number is immediately obvious.
//
// WAGE_INDEX is the missing dimension: the nominal wage level of a country in
// a given year, as a fraction of that same country's present-day wage level.
// It folds together price inflation and real growth, because the number a
// player reads folds them together too. Multiplying a present-day figure by it
// gives a figure denominated in the money of that year and place.
//
// It is applied at four chokepoints, and applying it at all four is what keeps
// the game playable while making it legible:
//
//   1. salaries, where they are set (tick.js)
//   2. prices, where they are charged (localisePrice, and the cost multipliers)
//   3. `p.mo`, the money delta every event uses — one site, 629 callers
//   4. `G.money`, which is DIVIDED by it, so that the ~76 guards written as
//      `G.money > 5000` keep meaning "comfortable" rather than silently
//      becoming "alive after 1990". State stores the nominal amount; G exposes
//      it in a stable unit.
//
// Because income and prices carry the same factor, affordability is unchanged
// and no balance moves. What changes is that the number is true.
//
// The figures are wage levels, not GDP per capita — low-wage work has fallen a
// long way against GDP per capita since 1950, so a GDP index over-punishes
// exactly the jobs most characters hold. They are smoothed rather than
// tracked: nominal USD wage series are dominated by exchange-rate swings that
// nobody living through them experienced as a change in their pay.

const ANCHORS = [1900, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 1995, 2000, 2010, 2025, 2050, 2100]

// One row per archetype, aligned to ANCHORS. Each value is that world's
// nominal wage level as a fraction of its own 2025 level.
//
// Beyond 2025 the rows continue at about 2% a year, which is the least
// interesting possible future and the only honest one: it means a character
// working in 2075 reads a larger number for the same work, which is what
// inflation is and what the game has never shown.
const WAGE_INDEX = {
  //                    1900   1920   1930   1940   1950   1960   1970   1980   1990   1995   2000   2010   2025  2050  2100
  wealthy_west:        [0.007, 0.021, 0.021, 0.020, 0.045, 0.071, 0.105, 0.220, 0.360, 0.440, 0.530, 0.680, 1.00, 1.80, 4.00],
  wealthy_east:        [0.002, 0.004, 0.004, 0.004, 0.008, 0.020, 0.090, 0.350, 0.700, 0.820, 0.880, 0.920, 1.00, 1.80, 4.00],
  wealthy_gulf:        [0.002, 0.003, 0.004, 0.005, 0.008, 0.030, 0.150, 0.550, 0.600, 0.600, 0.620, 0.850, 1.00, 1.80, 4.00],
  post_soviet:         [0.010, 0.020, 0.030, 0.035, 0.050, 0.080, 0.130, 0.200, 0.220, 0.070, 0.120, 0.600, 1.00, 1.80, 4.00],
  developing_urban:    [0.008, 0.018, 0.020, 0.022, 0.045, 0.070, 0.110, 0.220, 0.320, 0.380, 0.450, 0.720, 1.00, 1.80, 4.00],
  developing_unstable: [0.008, 0.018, 0.022, 0.025, 0.050, 0.080, 0.130, 0.260, 0.300, 0.340, 0.380, 0.680, 1.00, 1.80, 4.00],
  subsaharan:          [0.008, 0.015, 0.018, 0.020, 0.030, 0.060, 0.130, 0.300, 0.300, 0.310, 0.330, 0.700, 1.00, 1.80, 4.00],
  conflict_zone:       [0.008, 0.016, 0.020, 0.022, 0.045, 0.075, 0.150, 0.320, 0.350, 0.380, 0.400, 0.750, 1.00, 1.80, 4.00],
}

// The countries whose own trajectory is the point, and which an archetype row
// cannot express. The archetype is a statement about where a country IS; these
// are the ones for which that is least like where it was.
//
// The most important row here is South Korea's. In 1960 South Korea was poorer
// than Ghana, and the two rows say so — which is a fact a player can read off
// two lives and could not read off a table of present-day GDP tiers.
const WAGE_INDEX_BY_COUNTRY = {
  //                1900   1920   1930   1940   1950   1960   1970   1980   1990   1995   2000   2010   2025  2050  2100
  'South Korea':   [0.001, 0.001, 0.001, 0.001, 0.002, 0.004, 0.020, 0.100, 0.350, 0.550, 0.620, 0.800, 1.00, 1.80, 4.00],
  'Japan':         [0.003, 0.008, 0.008, 0.008, 0.009, 0.025, 0.090, 0.380, 0.750, 0.950, 0.950, 0.920, 1.00, 1.80, 4.00],
  'Taiwan':        [0.002, 0.003, 0.004, 0.004, 0.006, 0.012, 0.040, 0.160, 0.450, 0.620, 0.700, 0.860, 1.00, 1.80, 4.00],
  'Singapore':     [0.002, 0.004, 0.005, 0.005, 0.010, 0.025, 0.070, 0.250, 0.550, 0.700, 0.800, 0.920, 1.00, 1.80, 4.00],
  'China':         [0.004, 0.006, 0.007, 0.007, 0.010, 0.015, 0.020, 0.030, 0.060, 0.100, 0.160, 0.450, 1.00, 1.80, 4.00],
  'Vietnam':       [0.004, 0.006, 0.007, 0.008, 0.012, 0.018, 0.025, 0.030, 0.060, 0.110, 0.180, 0.480, 1.00, 1.80, 4.00],
  'Ireland':       [0.006, 0.015, 0.016, 0.016, 0.030, 0.050, 0.090, 0.200, 0.320, 0.450, 0.620, 0.800, 1.00, 1.80, 4.00],
  'Germany':       [0.006, 0.012, 0.009, 0.010, 0.014, 0.035, 0.075, 0.250, 0.450, 0.520, 0.550, 0.780, 1.00, 1.80, 4.00],
  'Austria':       [0.006, 0.010, 0.010, 0.010, 0.016, 0.038, 0.080, 0.250, 0.440, 0.520, 0.560, 0.780, 1.00, 1.80, 4.00],
  'Italy':         [0.005, 0.012, 0.012, 0.012, 0.022, 0.045, 0.085, 0.240, 0.430, 0.500, 0.560, 0.800, 1.00, 1.80, 4.00],
  'Spain':         [0.005, 0.010, 0.011, 0.010, 0.018, 0.035, 0.075, 0.220, 0.400, 0.470, 0.540, 0.800, 1.00, 1.80, 4.00],
  'Portugal':      [0.005, 0.009, 0.010, 0.010, 0.016, 0.030, 0.065, 0.190, 0.360, 0.450, 0.530, 0.790, 1.00, 1.80, 4.00],
  'Greece':        [0.005, 0.009, 0.010, 0.009, 0.015, 0.032, 0.070, 0.210, 0.390, 0.480, 0.560, 0.880, 1.00, 1.80, 4.00],
  'Argentina':     [0.030, 0.060, 0.070, 0.080, 0.150, 0.200, 0.250, 0.350, 0.300, 0.550, 0.350, 0.700, 1.00, 1.80, 4.00],
  'Venezuela':     [0.020, 0.040, 0.080, 0.120, 0.250, 0.400, 0.500, 0.800, 0.600, 0.550, 0.500, 0.900, 1.00, 1.80, 4.00],
  'Ghana':         [0.010, 0.020, 0.030, 0.035, 0.060, 0.110, 0.150, 0.250, 0.250, 0.280, 0.350, 0.700, 1.00, 1.80, 4.00],
  'Botswana':      [0.006, 0.010, 0.012, 0.014, 0.020, 0.030, 0.060, 0.200, 0.350, 0.450, 0.550, 0.800, 1.00, 1.80, 4.00],
  'India':         [0.008, 0.015, 0.018, 0.020, 0.035, 0.050, 0.075, 0.130, 0.200, 0.260, 0.330, 0.600, 1.00, 1.80, 4.00],
  'Kuwait':        [0.002, 0.003, 0.004, 0.006, 0.020, 0.100, 0.300, 0.650, 0.600, 0.620, 0.650, 0.870, 1.00, 1.80, 4.00],
  // Nigeria is the one row that goes DOWN. A Lagos clerk in 1980, with oil at
  // its peak and the naira held at about 0.55 to the dollar, took home more
  // in dollars than a Lagos clerk in 2020 does at 380 to the dollar. An
  // archetype row cannot say that, and it is the single most useful thing a
  // player can learn from two Nigerian lives forty years apart.
  'Nigeria':       [0.020, 0.040, 0.055, 0.060, 0.100, 0.180, 0.400, 1.600, 0.550, 0.420, 0.350, 0.750, 1.00, 1.80, 4.00],
  'United States': [0.007, 0.021, 0.021, 0.020, 0.045, 0.071, 0.105, 0.220, 0.360, 0.440, 0.530, 0.680, 1.00, 1.80, 4.00],
}

function interpolate(row, year) {
  if (year <= ANCHORS[0]) return row[0]
  const last = ANCHORS.length - 1
  if (year >= ANCHORS[last]) return row[last]
  let i = 0
  while (i < last && ANCHORS[i + 1] < year) i++
  const y0 = ANCHORS[i], y1 = ANCHORS[i + 1]
  const t = (year - y0) / (y1 - y0)
  return row[i] + (row[i + 1] - row[i]) * t
}

/**
 * The nominal wage level of `country` in `year`, as a fraction of that same
 * country's present-day level. A present-day figure multiplied by this is
 * denominated in the money of that year and place.
 *
 * Accepts a country object or a name; an unknown country falls back to the
 * developing_urban row, which is the middle of the distribution.
 */
export function wageIndex(country, year) {
  if (!country || !Number.isFinite(year)) return 1
  const name = typeof country === 'string' ? country : country.name
  const arch = typeof country === 'string' ? null : country.archetype
  const row = WAGE_INDEX_BY_COUNTRY[name] ?? WAGE_INDEX[arch] ?? WAGE_INDEX.developing_urban
  return interpolate(row, year)
}

/**
 * Convert a present-day figure into the money of `year` in `country`.
 * Never returns 0 for a non-zero input: a fee of one unit of whatever the
 * currency was is still a fee, and rounding it away turns a cost into a gift.
 */
export function inEraMoney(amount, country, year) {
  if (!amount) return 0
  const scaled = amount * wageIndex(country, year)
  const rounded = Math.round(scaled)
  if (rounded !== 0) return rounded
  return amount > 0 ? 1 : -1
}

/**
 * The inverse: read a nominal amount back into present-day terms. This is what
 * lets a guard keep saying `G.money > 5000` and keep meaning it.
 */
export function inTodayMoney(amount, country, year) {
  if (!amount) return 0
  const idx = wageIndex(country, year)
  return Math.round(amount / (idx || 1))
}

export const __testables = { WAGE_INDEX, WAGE_INDEX_BY_COUNTRY, ANCHORS, interpolate }

/**
 * How much the money moved in one year — `wageIndex` at `year` over `wageIndex`
 * at the year before it.
 *
 * This is what a stock of value has to carry to stay still. A house bought in
 * 1965 and revalued only by its real appreciation rate is worth about four
 * times its purchase price in 2015; the same house revalued through this is
 * worth about sixty times, which is the number the people who owned it would
 * recognise and one of the most universally felt economic facts of the century.
 */
export function eraDrift(country, year) {
  const prev = wageIndex(country, year - 1)
  if (!prev) return 1
  return wageIndex(country, year) / prev
}

// _electrification.js — the one night the village gets the light.
//
// Four events narrate it (wi_electrification, rural_electrification,
// rural_first_electricity, cult_rural_no_electricity). They were guarded on
// archetype and a decades-wide year range, so they lit Bhutan in 1965, upland
// Laos in 1963 and rural Niger in 1964 — and, because each kept its own latch,
// one life could watch the first bulb switched on three times.
//
// Two rules, shared so they cannot drift apart again:
//   - it happens in the years rural electricity actually arrived where the
//     character lives (technology.js), and
//   - it happens once.

import { hasTech } from '../technology.js'

/** Did the grid reach the countryside here in the last ~two years? */
export function villageLightArriving(G) {
  const c = G.currentCountry ?? G.character?.country
  const y = G.currentYear
  if (!c || typeof y !== 'number') return false
  return hasTech(c, 'electricity', y, { rural: true }) &&
    !hasTech(c, 'electricity', y - 3, { rural: true })
}

/** Has any version of this night already been narrated in this life? */
export function villageAlreadyLit(G) {
  return !!(
    G.flags?.includes?.('village_electrified') ||
    G.flags?.includes?.('first_electricity') ||
    G.mem?.village_electrified ||
    G.mem?.villageElectrified ||
    G.mem?.wiElectrification
  )
}

/** The whole guard: the light is arriving, and nobody has told this life yet. */
export const villageElectrificationDue = (G) => villageLightArriving(G) && !villageAlreadyLit(G)

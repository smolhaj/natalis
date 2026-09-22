// _sonderGuards.js — shared era/place predicates for the contemplative layer.
//
// A quiet-year observation is only quiet if the world it assumes actually
// exists. "You switch the light off and the room holds the shape of it" is a
// universal human sentence in Oslo in 1980 and a meaningless one in a Malian
// village in 1948. These predicates let a contemplative event say which world
// it belongs to without every module re-deriving the same thresholds.
//
// This file exports NO events. It is a helper imported by the sonder modules
// themselves; events.js does not need to know about it.

import { hasTech } from '../../technology.js'

export const RICH_ARCHETYPES = ['wealthy_west', 'wealthy_east', 'wealthy_gulf']
export const POOR_ARCHETYPES = ['subsaharan', 'developing_unstable', 'conflict_zone']

export const isRich = (G) => RICH_ARCHETYPES.includes(G.archetype)
export const isPoor = (G) => POOR_ARCHETYPES.includes(G.archetype)
export const isUrban = (G) => G.ruralUrban !== 'rural'
export const isRural = (G) => G.ruralUrban === 'rural'

// ── Infrastructure ───────────────────────────────────────────────────────────
// Electric light in the dwelling. Western and Japanese cities from the 1930s,
// Soviet electrification through the 1950s, most of the urban South by the
// 1970s, rural South Asia and Africa much later and still partial.
export const hasElectricity = (G) =>
  isRich(G) ? G.currentYear >= 1935
    : G.archetype === 'post_soviet' ? G.currentYear >= 1955
      : isUrban(G) ? G.currentYear >= 1970
        : G.currentYear >= 1995

// Piped water and an indoor bathroom.
export const hasRunningWater = (G) =>
  isRich(G) ? G.currentYear >= 1935
    : isUrban(G) ? G.currentYear >= 1975
      : G.currentYear >= 2000

// A refrigerator, a washing machine — the appliances that reorganise a household.
export const hasAppliances = (G) =>
  isRich(G) ? G.currentYear >= 1955
    : isUrban(G) && G.wealthTier >= 3 ? G.currentYear >= 1980
      : G.currentYear >= 2000

// ── Communication ────────────────────────────────────────────────────────────
// A telephone you can actually reach someone on.
export const hasPhone = (G) =>
  isRich(G) ? G.currentYear >= 1955
    : isUrban(G) ? G.currentYear >= 1980
      : G.currentYear >= 2000

// No rural adjustment on either of these: the mobile and the connection that
// came with it are the two things that did NOT arrive by wire, and the whole
// point of the leapfrog is that the village got them at the same time as the
// city. The country date still matters — Cuban home connections were illegal
// until 2018, North Korea has an intranet and not an internet — and a flat
// year threshold could not know that.
export const hasMobile = (G) =>
  hasTech(G.currentCountry ?? G.character?.country, 'mobile_phone', G.currentYear)
export const hasInternet = (G) =>
  hasTech(G.currentCountry ?? G.character?.country, 'home_internet', G.currentYear)

// Broadcasting is the one place where the archetype is not even approximately
// the answer, because it is a date a government set. `isRich` gave Oman a
// radio in 1930 — Radio Oman opened in 1970 — and a television in 1955, and
// gave Bhutan both decades before either was legal there. These two defer to
// the arrival table, which holds the per-country dates.
export const hasRadio = (G) =>
  hasTech(G.currentCountry ?? G.character?.country, 'radio', G.currentYear, { rural: isRural(G) })
export const hasTV = (G) =>
  hasTech(G.currentCountry ?? G.character?.country, 'television', G.currentYear, { rural: isRural(G) })

// ── Movement ─────────────────────────────────────────────────────────────────
export const hasCar = (G) =>
  G.wealthTier >= 3 && G.currentYear >= (isRich(G) ? 1950 : 1980)

export const hasMetro = (G) =>
  isUrban(G) && G.currentYear >= (isRich(G) ? 1935 : 1990)

export const hasElevator = (G) =>
  isUrban(G) && G.currentYear >= (isRich(G) ? 1940 : 1985)

export const hasFlown = (G) =>
  G.wealthTier >= 3 && G.currentYear >= (isRich(G) ? 1965 : 1990)

// ── Commerce and work ────────────────────────────────────────────────────────
export const hasSupermarket = (G) =>
  isUrban(G) && G.currentYear >= (isRich(G) ? 1960 : 1992)

export const hasBank = (G) =>
  G.banked || (isRich(G) ? G.currentYear >= 1955 : G.wealthTier >= 3 && G.currentYear >= 1985)

// An office: a desk, colleagues, a commute that is not a walk to a field.
export const worksInOffice = (G) => !!G.career && isUrban(G) && G.currentYear >= 1930

// Saudi Arabia had no cinemas at all between 1983 and 2018, and Oman's first
// opened around 1980; a year threshold cannot know that.
export const hasCinema = (G) =>
  isUrban(G) && hasTech(G.currentCountry ?? G.character?.country, 'cinema', G.currentYear)

// ── Literacy and schooling ───────────────────────────────────────────────────
// Handwriting, notebooks, newspapers, the letter you wrote — none of these are
// available to a life that never learned to write.
export const isLiterate = (G) => G.literate !== false

export const wentToSchool = (G) =>
  G.literate !== false && (G.education?.level ?? 'none') !== 'none'

// ── Climate ──────────────────────────────────────────────────────────────────
export const SNOW_COUNTRIES = [
  'Canada', 'Russia', 'Ukraine', 'Belarus', 'Poland', 'Germany', 'Norway', 'Sweden',
  'Finland', 'Denmark', 'Estonia', 'Latvia', 'Lithuania', 'Czech Republic', 'Slovakia',
  'Hungary', 'Romania', 'Bulgaria', 'Austria', 'Switzerland', 'Mongolia', 'Kazakhstan',
  'Kyrgyzstan', 'Tajikistan', 'Georgia', 'Armenia', 'Afghanistan', 'North Korea',
  'South Korea', 'Japan', 'China', 'United States', 'Iceland', 'Netherlands',
  'Bosnia and Herzegovina',
  'Serbia', 'Croatia', 'Slovenia', 'Moldova', 'Turkey', 'Iran', 'Nepal', 'Bhutan',
]
export const isColdCountry = (G) => SNOW_COUNTRIES.includes(G.currentCountry?.name)

// The engine owns the climate classification, because deriveSeason has to agree
// with it. Two copies of this list existed and disagreed — the engine's omitted
// India, Pakistan, Sri Lanka, Nepal and Malaysia — which is how the
// subcontinent's monsoon prose became unreachable. Imported rather than
// re-exported so the name is in local scope for the predicate below.
import { MONSOON_COUNTRIES } from '../../../engine/character'
export { MONSOON_COUNTRIES }
export const isMonsoonCountry = (G) => MONSOON_COUNTRIES.includes(G.currentCountry?.name)

// The tropics and the Sahel: heat as a governing fact rather than a season.
export const isHotCountry = (G) =>
  ['subsaharan', 'wealthy_gulf'].includes(G.archetype) || isMonsoonCountry(G)

// ── Institutions, goods, and time that are not universal ─────────────────────
// A hospital, a named diagnosis, an appointment at an hour.
export const hasHealthcare = (G) =>
  isRich(G) ? G.currentYear >= 1930
    : isUrban(G) ? G.currentYear >= 1965
      : G.currentYear >= 1990

// A wage, a payslip, a promotion, a pension: the formal-employment life.
export const hasFormalJob = (G) => !!G.career && G.currentYear >= 1920

// Rent, a landlord, a lease — a housing market rather than a family compound.
export const hasHousingMarket = (G) =>
  isUrban(G) && G.currentYear >= (isRich(G) ? 1930 : 1975)

export const hasLeisureTravel = (G) =>
  G.wealthTier >= 3 && G.currentYear >= (isRich(G) ? 1955 : 1990)

// Books in the house, a library card, a novel read for its own sake.
export const hasBooks = (G) =>
  G.literate !== false && (isRich(G) ? G.currentYear >= 1920 : G.currentYear >= 1960)

// Eating a meal you did not cook, in a room built for the purpose.
export const hasCafe = (G) => isUrban(G) && G.wealthTier >= 2

// A room, or a dwelling, that belongs to you alone.
export const hasOwnRoom = (G) => isUrban(G) && G.wealthTier >= 2

// A bus: municipal transport on a timetable.
export const hasBus = (G) =>
  isUrban(G) && G.currentYear >= (isRich(G) ? 1925 : 1955)

// A clock in the house, and the habit of consulting it.
export const hasClock = (G) =>
  isRich(G) ? G.currentYear >= 1900
    : isUrban(G) ? G.currentYear >= 1930
      : G.currentYear >= 1960

// The weekend as a unit of time — an industrial invention, not a human constant.
export const hasWeekend = (G) =>
  !!G.career && G.currentYear >= (isRich(G) ? 1930 : 1970)

// An afternoon with nothing required of it. Not available to everyone.
export const hasLeisure = (G) => G.wealthTier >= 2 && !G.inPrison

// A photograph of your own childhood is not a human constant. Cameras reached
// households in the West between the wars, most cities by the 1950s, and much
// of the countryside only once film was cheap.
export const hasPhotographs = (G) =>
  isRich(G) ? G.currentYear >= 1925
    : isUrban(G) ? G.currentYear >= 1950
      : G.currentYear >= 1970

// ── The namespace the events actually call ───────────────────────────────────
// Guards read `place.hasElectricity(G)` rather than a bare `hasElectricity(G)`
// because that is what the predicate is: a fact about the place and era this
// character is living in, not a fact about people. It also keeps the guard
// self-describing to the engine's register classifier, which reads guard source
// to decide whether an event is anchored to a particular life or floats free of
// one — a bare helper name tells it nothing.
export const place = {
  isRich, isPoor, isUrban, isRural,
  hasElectricity, hasRunningWater, hasAppliances,
  hasPhone, hasMobile, hasInternet, hasRadio, hasTV,
  hasCar, hasMetro, hasElevator, hasFlown, hasBus,
  hasSupermarket, hasBank, worksInOffice, hasCinema,
  isLiterate, wentToSchool, hasBooks,
  isColdCountry, isMonsoonCountry, isHotCountry,
  hasHealthcare, hasFormalJob, hasHousingMarket, hasLeisureTravel,
  hasCafe, hasOwnRoom, hasClock, hasWeekend, hasLeisure, hasPhotographs,
}

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

export const hasMobile = (G) => G.currentYear >= (isRich(G) ? 1998 : 2005)
export const hasInternet = (G) => G.currentYear >= (isRich(G) ? 1997 : 2005)
export const hasRadio = (G) => G.currentYear >= (isRich(G) ? 1930 : 1950)
export const hasTV = (G) =>
  isRich(G) ? G.currentYear >= 1955
    : isUrban(G) ? G.currentYear >= 1972
      : G.currentYear >= 1990

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

export const hasCinema = (G) => isUrban(G) && G.currentYear >= 1930

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
  'South Korea', 'Japan', 'China', 'United States', 'Iceland', 'Netherlands', 'Bosnia',
  'Serbia', 'Croatia', 'Slovenia', 'Moldova', 'Turkey', 'Iran', 'Nepal', 'Bhutan',
]
export const isColdCountry = (G) => SNOW_COUNTRIES.includes(G.currentCountry?.name)

export const MONSOON_COUNTRIES = [
  'India', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Nepal', 'Myanmar', 'Thailand',
  'Vietnam', 'Cambodia', 'Laos', 'Philippines', 'Indonesia', 'Malaysia',
]
export const isMonsoonCountry = (G) => MONSOON_COUNTRIES.includes(G.currentCountry?.name)

// The tropics and the Sahel: heat as a governing fact rather than a season.
export const isHotCountry = (G) =>
  ['subsaharan', 'wealthy_gulf'].includes(G.archetype) || isMonsoonCountry(G)

/**
 * src/data/flags/index.js
 *
 * Re-exports all category flag registries as a unified FLAG_REGISTRY.
 * Import FLAG_REGISTRY from this file instead of src/data/flags.js.
 *
 * Category files:
 *   identity.js      — trauma, identity, resilience, adversity, moral, experience,
 *                      psychological, formative, spiritual, faith, behavior, values, etc.
 *   geographic.js    — displacement, migration, conflict, world_event, place, climate, etc.
 *   economic.js      — economic, labor, career, education, technology, occupation, etc.
 *   health.js        — health, loss, grief, death
 *   relationships.js — relationship, family, community, social, gender, discrimination
 *   political.js     — political, historical, military, cultural, legal, religion,
 *                      persecution, achievement, criminal_justice, legacy
 *   prison.js        — the incarceration arc and its residues
 */

import { IDENTITY_FLAGS } from './identity.js'
import { GEOGRAPHIC_FLAGS } from './geographic.js'
import { ECONOMIC_FLAGS } from './economic.js'
import { HEALTH_FLAGS } from './health.js'
import { RELATIONSHIP_FLAGS } from './relationships.js'
import { POLITICAL_FLAGS } from './political.js'
import { PRISON_FLAGS } from './prison.js'
import { WORLD_EVENT_FLAGS } from './world_events.js'
import { LIFECYCLE_FLAGS } from './lifecycle.js'
import { NEW_ROSTER_FLAGS } from './new_roster.js'
import { UNWRITTEN_WA_FLAGS } from './unwritten_wa.js'
import { UNWRITTEN_AMERICAS_FLAGS } from './unwritten_americas.js'
import { UNWRITTEN_ESA_FLAGS } from './unwritten_esa.js'
import { UNWRITTEN_AP_FLAGS } from './unwritten_ap.js'
import { NIGERIA_SOUTH_FLAGS } from './nigeria_south.js'
import { NIGERIA_NORTH_FLAGS } from './nigeria_north.js'
import { IRAN_CIVILIAN_FLAGS } from './iran_civilian.js'
import { MEXICO_LIFE_FLAGS } from './mexico_life.js'
import { BRAZIL_LIFE_FLAGS } from './brazil_life.js'
import { CHINA_REFORM_FLAGS } from './china_reform.js'

export const FLAG_REGISTRY = {
  ...IDENTITY_FLAGS,
  ...GEOGRAPHIC_FLAGS,
  ...ECONOMIC_FLAGS,
  ...HEALTH_FLAGS,
  ...RELATIONSHIP_FLAGS,
  ...POLITICAL_FLAGS,
  ...PRISON_FLAGS,
  ...WORLD_EVENT_FLAGS,
  ...LIFECYCLE_FLAGS,
  ...NEW_ROSTER_FLAGS,
  ...UNWRITTEN_WA_FLAGS,
  ...UNWRITTEN_AMERICAS_FLAGS,
  ...UNWRITTEN_ESA_FLAGS,
  ...UNWRITTEN_AP_FLAGS,
  ...NIGERIA_SOUTH_FLAGS,
  ...NIGERIA_NORTH_FLAGS,
  ...IRAN_CIVILIAN_FLAGS,
  ...MEXICO_LIFE_FLAGS,
  ...BRAZIL_LIFE_FLAGS,
  ...CHINA_REFORM_FLAGS,
}

export {
  IDENTITY_FLAGS,
  GEOGRAPHIC_FLAGS,
  ECONOMIC_FLAGS,
  HEALTH_FLAGS,
  RELATIONSHIP_FLAGS,
  POLITICAL_FLAGS,
  PRISON_FLAGS,
  WORLD_EVENT_FLAGS,
  LIFECYCLE_FLAGS,
}

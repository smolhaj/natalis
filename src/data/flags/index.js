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

export const FLAG_REGISTRY = {
  ...IDENTITY_FLAGS,
  ...GEOGRAPHIC_FLAGS,
  ...ECONOMIC_FLAGS,
  ...HEALTH_FLAGS,
  ...RELATIONSHIP_FLAGS,
  ...POLITICAL_FLAGS,
  ...PRISON_FLAGS,
  ...WORLD_EVENT_FLAGS,
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
}

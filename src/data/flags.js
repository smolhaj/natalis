/**
 * FLAG_REGISTRY — master design document for the natalis flag system.
 *
 * Every flag with weight 'major' or 'moderate' should appear here.
 * Pure texture flags (minor details with no narrative follow-through required)
 * can be omitted — the check-flags script will surface unregistered
 * high-frequency ones for review.
 *
 * Fields:
 *   weight      'major' | 'moderate' | 'minor'
 *               major   = life-defining; must surface in prose across decades
 *               moderate = significant; should surface at least once post-flag
 *               minor   = texture; no follow-through required
 *
 *   category    'trauma' | 'loss' | 'displacement' | 'identity' | 'achievement' |
 *               'relationship' | 'political' | 'world_event'
 *
 *   description What this flag represents in the character's lived experience.
 *
 *   intent      What follow-through should exist:
 *               'event'        = at least one dedicated follow-through event
 *               'year_texture' = should feed into buildYearTexture() prose
 *               'both'         = dedicated event AND year texture presence
 *               'none'         = texture label; no follow-through needed
 *
 *   timestamped true if flag is in TIMESTAMPED_FLAGS (auto-records year set in mem)
 *
 *   notes       Optional — current gaps, pending work, or caveats.
 *
 * Status ('covered' | 'partial' | 'orphaned') is NOT stored here.
 * Run `npm run check-flags` to derive it dynamically from source.
 *
 * NOTE: The flag registry has been split into category files under src/data/flags/.
 * This file is now a backwards-compatibility shim. Edit flags in:
 *   src/data/flags/identity.js      — trauma, identity, resilience, moral, etc.
 *   src/data/flags/geographic.js    — displacement, migration, conflict, world_event, etc.
 *   src/data/flags/economic.js      — economic, labor, career, education, etc.
 *   src/data/flags/health.js        — health, loss, grief, death
 *   src/data/flags/relationships.js — relationship, family, community, social, etc.
 *   src/data/flags/political.js     — political, historical, military, cultural, etc.
 */
export { FLAG_REGISTRY } from './flags/index.js'

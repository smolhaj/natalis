# natalis — Codebase State

Current snapshot: **145 countries**, **255 world events**, **463+ event modules** (~7,550+ events), **2672 registered flags** (0 orphaned, 0 partial), **379 ribbons**. Run `npm run check-flags` to verify.

---

## Directory Structure (since PR #105 refactor)

Events organized under `src/data/events/`:

```
events/
  thematic/      — cross-cutting arcs (culture, gender, religion, labor, career, etc.) + all followthrough_30–95 files
  lifecycle/     — phase-specific (adolescence, pregnancy, menopause, desires, body arc, empty nest, grandparent, inheritance)
  geographic/    — country and region arcs (184 files: base arcs + _depth.js companions for most countries)
  sonder/        — contemplative layer (66 modules, ~1,980+ events)
  specific_lives/ — events_specific_lives.js (221 micro-specific events)
  followthrough/ — events_followthrough_all.js (317 consolidated events from original 29 files)
```

All followthrough files (30–95) live in `thematic/`. Root-level `events.js` imports everything (463+ imports).

---

## Key Systems (all wired and working)

**State fields** (see CLAUDE.md for full list): `stats`, `money`, `karma`, `fame`, `flags` (Set), `age`, `currentYear`, `character`, `currentCountry`, `residencyStatus`, `inPrison`, `pendingTrial`, `career`, `education`, `partner`, `children`, `parents`, `siblings`, `friends`, `pets`, `assets`, `debt`, `creditScore`, `mortgage`, `mentalHealth`, `hobbies`, `currentPlace`, `currentNeighborhoodTier`, `desire`, `political_leaning`, `conditions[]`, `currentProject`.

**buildYearTexture()**: Full priority cascade — bereavement → health → relationship quality (partner trait-aware, stored partner moments) → family tension → post-crisis → residency/emigrant → authoritarian/conflict → flag-aware texture → **memory layer** (30%, uses `mem.[flag]Year` timestamps 2–15 years after major events) → desire-aware → **project layer** (35% when `currentProject` active) → expanded phase pools → universal fallback. 250+ distinct archetype/era/country fragments.

**generateIdentityCard()**: 3–4 sentences regenerated each year. Displayed in Stats tab. Surfaces flags without spoiling the epitaph.

**generateEpitaph()**: Flag-driven obituary. Age-brackets the prose. Desire tiering. Legacy score (0–100) gates forward-looking dimension. Death cause prose is archetype/country/era-aware.

**Partner trait system**: 21 traits × 2 specific prose lines. 3 moments generated at year 3+ of relationship, refreshed every 7 years. Surfaced via `buildYearTexture()` at ~30%.

**Memory timestamp system**: `TIMESTAMPED_FLAGS` set in `buildEffectProxy()`. 22+ emotionally significant flags auto-store `mem.[flag]Year` when set. Memory layer checks elapsed time and returns specific memory-presence prose.

**Project arc**: `currentProject: { type, startYear, phase, name }`. Auto-detected from hobby flags in `tick()`. Phase advances `early → middle → late → established`. Year texture has project layer with phase-specific prose.

**Desire system**: 8 types (`prove_worth/belong/be_seen/safety/connection/leave_mark/freedom/redemption`). `DESIRE_PATTERNS` in `getNextEvent()` gives 1.6× weight boost. Displayed near Age Up button. Formative wound events fire once in childhood.

**Political leaning**: `left/centre/right/nationalist/dissident/apolitical`. Earned through events only. `leaningWeight` gives 1.3–1.5× boost to matching events.

**Chronic conditions**: `conditions[]` with severity and managed status. Passive drain per tick. `p.addCondition()` / `p.manageCondition()`.

**Trial system**: `pendingTrial` blocks Age Up. Lawyer tier × legal quality × random = outcome. `resolveTrial()` in gameStore.

**Informal economy**: `workStatus: 'formal'|'informal'|'unemployed'|'subsistence'` alongside `career`.

**Neighborhood tier**: `currentNeighborhoodTier: 'informal'|'working_class'|'middle_class'|'elite'`.

**Legacy field**: `legacy: 0–100`. Accumulates via teacher/mentor/local/project/dying arcs. Epitaph branches at ≥80/60/40.

**Generational trauma seeding**: `deriveGenerationalFlags()` seeds 17 flags at character creation based on country + birthYear.

**Save/load**: `serializeState`/`deserializeState` handle Map/Set/functions. "Continue" on TitleScreen.

**Historical country names**: `getCountryNameForYear()` returns "USSR" for Russia pre-1991, etc. Used in epitaph and CuratedBirthScreen.

**Soundtrack layer**: `applySoundtrack()` in `gameEngine.js`. 50 cultural markers 1942–2023. Violet/🎵 in life log.

**Headline injection**: `HEADLINES` — ~130 major historical moments injected as styled log entries.

**World events**: Fire based on year + archetype/country match, independent of event queue. `context` field shows expandable factual note.

---

## Geographic Coverage (145 countries)

All major regions covered. Geographic modules in `src/data/events/geographic/` (184 files). Most countries now have both a base arc file and a `_depth.js` companion with second-wave specificity.

**24 countries added post-audit** (referenced by existing events but missing from `countries.js` until fixed): Djibouti, Sierra Leone, Chad, Niger, Togo, Benin, Central African Republic, Qatar, Bahrain, Kuwait, Belgium, Switzerland, Bulgaria, Slovakia, Papua New Guinea, Samoa, Kiribati, Tuvalu, Marshall Islands, Maldives, Barbados, Guyana, Belize, Puerto Rico. These have full demographic schemas (`namePool`, `surnames`, `religionWeights`, `ethnicGroups`, `regimeHistory`, `context`) but do not yet have dedicated geographic event files beyond the existing cross-country events that referenced them.

- **Africa**: Algeria (13), Angola (6+depth), Burkina Faso (8), Cameroon (7+depth), DRC (9), Eritrea (12), Ethiopia (7+depth), Fiji (8), Ghana (10+depth), Guinea (13), Ivory Coast (7+depth), Kenya (7+depth), Libya (6+depth), Mali (10), Morocco (8+depth), Mozambique (6+depth), Namibia (8+depth), Nigeria (8+depth), Rwanda (8), Senegal (5), Somalia (7), South Africa (4+depth), Sudan (6+depth), Tanzania (7+depth), Tunisia (6), Uganda (7), West Africa multi-country (16), Zambia (6+depth), Zimbabwe (6)
- **Americas**: Argentina (via Latin America + depth), Bolivia (9+depth), Brazil (9+depth), Canada (8+depth), Caribbean (14), Central America (14), Colombia (9+depth), Cuba (8+depth), Dominican Republic (9), Ecuador (8), El Salvador (7), Guatemala (8), Haiti (10), Honduras (8), Mexico (standalone depth), Nicaragua (8), Peru (8+depth), Puerto Rico (2), USA (15), Uruguay/Paraguay via uy_py_ec (13), Venezuela (8+depth×2)
- **Asia-Pacific**: Afghanistan (6+depth), Australia (8+depth), Bangladesh (9+depth), Cambodia (8), Central Asia multi (10), China (26), India (7+depth), Indonesia (10+6 depth), Iran (7+depth), Iraq (8+depth), Israel (13), Japan (12+depth), Jordan (6), Kazakhstan (10), Korea (14+depth), Kyrgyzstan (10), Laos (7+depth), Lebanon (14), Malaysia via Taiwan/Malaysia (9), Mongolia (12+depth), Myanmar (7+depth), Nepal (6+depth), New Zealand (9+depth), North Korea (9+depth), Pakistan (9+depth), Palestine (14+depth), Philippines (9+depth×2), Rohingya (8), Saudi Arabia (9), Singapore (8+depth), Sri Lanka (8+depth), Syria (8), Taiwan via Taiwan/Malaysia (9), Tajikistan (10), Thailand (6+depth), Turkmenistan (10), Uyghur (3), Uzbekistan (10), Vietnam (10+depth), Yemen (6)
- **Europe**: Armenia/Azerbaijan (15), Baltic states (6), Belarus (8), Bosnia/Serbia/Yugoslavia (9), Czech Republic (8), Denmark (7), Finland via Scandinavia, France via Germany/France (9), Georgia (10), Germany via Germany/France (9), Greece (11+9 depth), Hungary via Central Europe, Ireland depth (10), Italy (8+depth), Netherlands (8+depth), Norway (8), Poland (7+depth), Portugal via Greece/Portugal + depth, Romania (5+depth), Russia (4+depth), Scandinavia multi (8+6 depth), Spain (11+depth), Sweden (7), Turkey (5+depth), UK (7), Ukraine (7+depth)
- **Middle East**: Bedouin (5), Egypt (7+depth), Iran (7+depth), Iraq (8+depth), Israel (13), Jordan (6), Lebanon (14), Palestine (14+depth), Saudi Arabia (9), Syria (8), Turkey (5+depth), Yemen (6)

---

## Sonder Layer (events/sonder/)

66 modules, ~1,980+ total events. All mem-gated, weight 2, no choices, no new flags, minimal stat effects.

- `events_sonder.js` — 299 events: STRANGER GLIMPSES + MUNDANE LIFE (commute, object on shelf, phrase noticed)
- `events_sonder_2.js` — 40 events: non-Western sensory, body-in-time, relational drift, weight of time
- `events_sonder_3.js` through `events_sonder_12.js` — 10 modules, ~354 events: extended contemplative registers across all life phases, archetypes, and eras
- `events_sonder_13.js` through `events_sonder_66.js` — 54 additional modules, ~30 events each (~1,620 more events): technology and time, the workplace, food and meals, ceremony, the street, body in weather, night and sleep, what you inherit, the window, the hour, and more; covers all archetypes

---

## Followthrough Coverage

`events/followthrough/events_followthrough_all.js` — 317 consolidated events from the original 29 followthrough files (events_followthrough.js through events_followthrough_22.js).

`thematic/events_followthrough_30.js` through `events_followthrough_95.js` — 66 files covering followthroughs for all depth arcs and new thematic arcs. Highlights:
- 30: business failure, political disillusionment, relationship arcs (70 events)
- 31–48: Central Asia, Ghana/Angola, Ecuador, Central America, Czech Republic, Scandinavia, Greece, Thailand, world events
- 49: aid convoy + received-aid echo (famine survivor texture)
- 50: anniversary-aware follow-throughs (emigration 5/10/20yr, divorce 5/10yr)
- 51–95: echoes for every _depth.js arc (Nigeria, Vietnam, Brazil, Cuba, Colombia, Peru, Poland, Russia, Ukraine, Spain, Italy, Australia, New Zealand, Singapore, North Korea, Japan, Korea, Egypt, Iran, Iraq, Sudan, Afghanistan, Bangladesh, Pakistan, Sri Lanka, Myanmar, Nepal, Laos, Mexico, Argentina, Bolivia, Ecuador, Angola, Zambia, Tanzania, Cameroon, Mongolia, Namibia, and more)

---

## Specific Lives Layer

`events/specific_lives/events_specific_lives.js` — 221 micro-specific events targeting one-of-a-kind life circumstances: Dalit woman at the water pump, Stasi file retrieval 1992, Leningrad ration card 1942, maquiladora night shift, etc.

---

## Flag Registry

`src/data/flags/` — split into 6 category files:
- `political.js`, `social.js`, `personal.js`, `career.js`, `geographic.js`, `health.js`

2670 registered flags. Run `npm run check-flags -- --orphans` to verify 0 orphaned (6 partial currently).

`TIMESTAMPED_FLAGS` in `buildEffectProxy`: 22+ flags auto-store `mem.[flag]Year` for memory-layer callbacks.

---

## What Exists and Works (Systems Checklist)

- ✅ Core gameplay loop: age-up → event → choice → effects → year texture
- ✅ 255 world events (fire independently, archetype/country/year gated)
- ✅ Trial system (pendingTrial blocks Age Up, lawyer tiers)
- ✅ Prison system (dedicated Prison Life tab, post-release arc)
- ✅ Partner lifecycle (ages +1/yr, death probability at 75+, tickPartner())
- ✅ Parent care arc (8 events → killParent())
- ✅ Curated birth screen (4-step wizard, startCuratedGame())
- ✅ ContinueGame via localStorage save/load
- ✅ Chronic conditions (passive drain, managed flag, p.addCondition())
- ✅ Informal economy (workStatus field, 18 events)
- ✅ Neighborhood tiers (currentNeighborhoodTier, 16 events)
- ✅ Political leaning (6 types, leaningWeight system)
- ✅ Formative desire system (8 types, DESIRE_PATTERNS, life skeleton events)
- ✅ Project arc (currentProject, auto-detection, phase advancement)
- ✅ Partner traits (21 types, trait-aware prose, partner moments)
- ✅ Memory timestamps (22+ flags, memory layer in buildYearTexture)
- ✅ Legacy field (0–100, epitaph branching)
- ✅ Generational trauma seeding (17 flags at character creation)
- ✅ Soundtrack layer (50 markers, violet in life log)
- ✅ Historical country names
- ✅ Relationship quality UI (quality labels + flag-aware chip overrides)
- ✅ Gender markers (♂/♀) in Relationships UI
- ✅ Geographic places system (250+ named places, places.js)
- ✅ Activities panel (grouping, practice counters → story events)
- ✅ Dynamic wealthTier (computed from net worth in buildG())
- ✅ Ribbons (379 defined in ribbons.js)
- ✅ FLAG_REGISTRY audit tooling (npm run check-flags)
- ✅ Seasonal events (G.season infrastructure, events_seasonal.js)
- ✅ Letters register (isLetter: true, amber treatment in LifeScreen)
- ✅ Oral tradition register (events_oral_tradition.js, received-speech framing)
- ✅ Memory/dream layer (events_memory_layer.js, timestamped flag replays at 45–65)
- ✅ Roads not taken (events_roads_not_taken.js, life-review at 38–68)
- ✅ Anniversary-aware follow-throughs (emigration 5/10/20yr, divorce 5/10yr)
- ✅ Regret threshold arc (events_followthrough_55.js, regret-stat-crossing events)
- ✅ Deep career arcs for 15+ professions (doctor, nurse, lawyer, journalist, engineer, developer, accountant, artist, merchant, police, social worker, civil servant, chef, factory worker, farmer, laborer, driver)
- ✅ Body arc (events_body_arc.js — ordinary physical aging outside illness arc)
- ✅ Empty nest arc (events_empty_nest.js)
- ✅ Grandparent arc (events_grandparent_arc.js)
- ✅ Inheritance arc (events_inheritance_arc.js)
- ✅ Time-of-life activity unlocks (activities gate on conditions/career/relationships)

# natalis — Codebase State

Current snapshot: **109 countries**, **255 world events**, **275 event modules** (~5,800+ events), **2051 registered flags** (0 orphaned, 0 partial), **321 ribbons**. Run `npm run check-flags` to verify.

---

## Directory Structure (since PR #105 refactor)

Events organized under `src/data/events/`:

```
events/
  thematic/      — cross-cutting arcs (culture, gender, religion, labor, career, etc.)
  lifecycle/     — phase-specific (adolescence, pregnancy, menopause, desires, etc.)
  geographic/    — country and region arcs (109 entries)
  sonder/        — contemplative layer (12 modules, ~693 events)
  specific_lives/ — events_specific_lives.js (221 micro-specific events)
  followthrough/ — events_followthrough_all.js (317 consolidated events)
```

All new followthrough files (30–48) live in `thematic/`. Root-level `events.js` imports everything.

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

## Geographic Coverage (109 countries)

All major regions covered. Geographic modules now in `src/data/events/geographic/`. Key depth arcs:

- **Africa**: Algeria (13), Angola (6), Burkina Faso (8), Cameroon (7), DRC (9), Eritrea (12), Ethiopia (7), Fiji (8), Ghana (10+depth), Guinea (13), Ivory Coast (7), Kenya (7), Libya (6), Mali (10), Morocco (8), Mozambique (6), Namibia (8), Nigeria (8), Rwanda (8), Senegal (5), Somalia (7), South Africa (4), Sudan (6), Tanzania (7), Tunisia (6), Uganda (7), West Africa multi-country (16), Yemen (6), Zambia (6), Zimbabwe (6)
- **Americas**: Bolivia (9), Brazil (9), Canada (8), Caribbean (14), Central America (14), Chile/Argentina/Colombia via Latin America (60+), Cuba (8), Dominican Republic, Ecuador, El Salvador, Guatemala, Haiti (10), Honduras, Nicaragua, Peru (8), Philippines OFW (15), Puerto Rico (2), Uruguay/Paraguay/Ecuador (13), USA (12), Venezuela (8)
- **Asia-Pacific**: Afghanistan (6), Australia (8), Bangladesh (9), Cambodia (8), Central Asia multi (10), China (26), India (7+11 depth), Indonesia (10+6 depth), Iran (7), Iraq (8), Israel (13), Japan (12), Jordan (6), Kazakhstan (10), Korea (14), Kyrgyzstan (10), Laos (7), Lebanon (14), Malaysia via Taiwan/Malaysia (9), Mongolia (12), Myanmar (7), Nepal (6), New Zealand (9), North Korea (9), OFW/Philippines (15), Pakistan (9), Palestine (14), Rohingya (8), Saudi Arabia (9), Singapore (8), Sri Lanka (8), Syria (8), Taiwan via Taiwan/Malaysia (9), Tajikistan (10), Thailand (6), Turkmenistan (10), Uyghur (3), Uzbekistan (10), Vietnam (10), Yemen (6)
- **Europe**: Armenia/Azerbaijan (15), Baltic states (6), Belarus (8), Bosnia/Serbia/Yugoslavia (9), Canada (8), Czech Republic (8), Denmark (7), Finland via Scandinavia, France via Germany/France (9), Georgia (10), Germany via Germany/France (9), Greece (11+9 depth), Hungary via Central Europe, Ireland depth (10), Italy (8), Netherlands (8), Norway (8), Poland (7), Portugal via Greece/Portugal, Romania (5), Russia (4), Scandinavia multi (8+6 depth), Spain (11), Sweden (7), Turkey (5), UK (7), Ukraine (7)
- **Middle East**: Bedouin (5), Egypt (7), Iraq (8), Iran (7), Israel (13), Jordan (6), Lebanon (14), Palestine (14), Saudi Arabia (9), Syria (8), Turkey (5), Yemen (6)

---

## Sonder Layer (events/sonder/)

12 modules, ~693 total events. All mem-gated, weight 2, no choices, no new flags, minimal stat effects.

- `events_sonder.js` — 299 events: STRANGER GLIMPSES + MUNDANE LIFE (commute, object on shelf, phrase noticed)
- `events_sonder_2.js` — 40 events: non-Western sensory, body-in-time, relational drift, weight of time
- `events_sonder_3.js` through `events_sonder_12.js` — 10 modules, ~354 events: extended contemplative registers across all life phases, archetypes, and eras

---

## Followthrough Coverage

`events/followthrough/events_followthrough_all.js` — 317 consolidated events from the original 29 followthrough files (events_followthrough.js through events_followthrough_22.js).

`thematic/events_followthrough_30.js` through `events_followthrough_48.js` — 19 files, ~236 events covering followthroughs for PRs #103–109 content.

---

## Specific Lives Layer

`events/specific_lives/events_specific_lives.js` — 221 micro-specific events targeting one-of-a-kind life circumstances: Dalit woman at the water pump, Stasi file retrieval 1992, Leningrad ration card 1942, maquiladora night shift, etc.

---

## Flag Registry

`src/data/flags/` — split into 6 category files:
- `political.js`, `social.js`, `personal.js`, `career.js`, `geographic.js`, `health.js`

2051 registered flags. Run `npm run check-flags -- --orphans` to verify 0 orphaned.

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
- ✅ Ribbons (321 defined in ribbons.js)
- ✅ FLAG_REGISTRY audit tooling (npm run check-flags)

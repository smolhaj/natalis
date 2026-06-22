# natalis — Developer Context

## Vision

natalis is a life simulation game with a specific dual mandate: **fun and education in equal measure**. The goal is that a player who runs a character born in 1962 in Nigeria should come away understanding what that life was actually like — the regime, the economy, the religion, the technology available, the historical events that shaped the era — not just a generic set of stats.

Every system should ask: *does this reflect what it would actually have been like to be this person, in this place, at this time?* If it doesn't, it's not done yet.

The tone is literary, not gamey. Event text reads like short fiction — sparse, specific, emotionally honest. No exclamation points. No "You gain +5 Happiness!" framing. The prose is the experience.

---

## The Sonder Principle

The emotional target of the game is **sonder**: the realisation that each stranger has a life as vivid and complex as your own — the person on the platform, the light in the apartment above. The game puts you inside one of those lives, specifically enough that you feel what it is to have been that person.

This is what distinguishes natalis from a stats game: not that it models a life, but that it makes you *inhabit* one. The measure of any new content is whether it produces that feeling.

**Four design decisions that follow from this:**

1. **Year texture and events carry it equally.** Dramatic events (coups, deaths, migrations) achieve sonder through specificity. Quiet years achieve it through felt ordinariness. Both need the same quality of prose. The difference is register, not care.

2. **Quiet years use three layers, combined.** The fallback pool for an uneventful year draws from:
   - *Universal human texture* — details true of any life in any era: the object that's always been on the shelf, the commute that never changes, the phrase you've started saying without noticing.
   - *Place and era texture* — what this city, in this decade, actually felt like. Not generic colour but specific sensory detail grounded in the character's actual location and time.
   - *Life-phase texture* — what being 34 notices that 24 didn't. What the body knows at 58 that it didn't at 40. The experience of a phase of life, not just a year.

3. **Occasional glimpses of other lives.** Rare moments — roughly once per decade, or once per life phase — where the prose briefly pans to a stranger: the person at the next table, the light on in the apartment above. A sentence or two, then back. Not a mechanic, not a choice — just the accidental glimpse that sonder is made of.

4. **A contemplative layer alongside the event system.** The choice-heavy event system stays intact. But between events, a separate layer of pure prose fires — observations the character makes that require no response, no choice, no outcome. Things noticed. Things that just happened without asking permission. These are the sentences that make the life feel continuous rather than episodic.

---

## Design Principles

These are hard-won rules that govern all new work. Violating any of them produces work that must be redone.

**Follow-through first.** Before writing any triggering event, write its downstream consequence. What does this flag become three years later? Ten years later? An event with no follow-through consequence is just prose — it disappears from the life the moment it resolves. Write the echo before the stone hits the water.

Every new flag with `weight: 'major'` or `'moderate'` MUST be added to `src/data/flags.js` (the FLAG_REGISTRY) with its `intent` field set. Every new flag module MUST ship its follow-through events or `buildYearTexture()` paths before the triggering event. Run `npm run check-flags` to audit coverage — the registry status is derived dynamically, never stored. Any new flag that the script reports as `orphaned` is a bug.

**Specificity over coverage.** One event that could only fire for a Kurdish teenager in 1990s Turkey is worth more than five generic young-adult events. One sentence naming the specific sound, the specific object, the specific phrase someone used is worth more than a paragraph of emotional summary. Generic events are a last resort.

**Invisible systems.** The best mechanics are felt but never shown. Partner traits, memory timestamps, project phases — none of these appear in the UI. They express themselves only through prose. A system that requires explanation has failed. A system that makes a sentence land differently has succeeded.

**The prose is the mechanic.** Stats are numbers. The game's primary mechanic is the sentence that lands. Every system change should be evaluated by whether it produces better sentences, not more numbers to display.

**Three modes, in rotation.** Work alternates between: (A) **geographic/content depth** — new countries, eras, and populations with almost no current coverage; (B) **mechanical depth** — systems that make what already exists richer (legacy field, generational save, project arc); and (C) **polish and feel** — making the existing content feel lived-in rather than listed. No single mode dominates. Each makes the others matter more.

---

## Tech Stack

React + Vite, Zustand for state. No backend. Everything is data-driven via plain JS object arrays. The build should always pass cleanly (`npm run build`).

---

## Architecture

### State (`src/store/gameStore.js`)

Key state fields:
- `stats`: `{ happiness, health, smarts, looks, charisma, wealth }` — all 0–100
- `money`: absolute dollar amount (separate from `wealth` stat)
- `karma`: 0–100
- `fame`: 0–100
- `flags`: string array — the game's memory. Everything conditional keys off flags.
- `age`, `currentYear`, `character` (birth data, frozen at game start)
- `currentCountry`: where the player *lives now* (can differ from `character.country` after emigration)
- `residencyStatus`: `'citizen' | 'permanent_resident' | 'work_visa' | 'undocumented' | 'refugee_status' | 'asylum_seeker' | 'tourist_overstay'`
- `inPrison`, `prisonSentence`, `criminalRecord`
- `pendingTrial`: `{ crimeName, crimeCategory, sentence, lawyerCosts: { none, mid, top } } | null` — blocks Age Up until resolved
- `career`, `education`, `partner`, `children`, `parents`, `siblings`, `friends`, `pets`
- `assets`: `{ properties: [], vehicles: [] }`
- `debt`, `creditScore`, `mortgage`
- `mentalHealth`: `{ condition, medicating, therapy }`
- `hobbies`, `fitness`, `gpa`, `socialMedia`, `martialArts`
- `currentPlace`: string|null — place ID from `places.js` where the character currently lives
- `currentNeighborhoodTier`: `'informal'|'working_class'|'middle_class'|'elite'`|null
- `currentNeighborhoodName`: string|null — human-readable name of current neighbourhood
- `desire`: string|null — core formative desire revealed by childhood wound event. Values: `'prove_worth'`, `'belong'`, `'be_seen'`, `'safety'`, `'connection'`, `'leave_mark'`, `'freedom'`, `'redemption'`. Shown near Age Up button. Affects event selection via `DESIRE_PATTERNS` in `getNextEvent()` (1.6× weight boost for matching events).
- `political_leaning`: `'left'|'centre'|'right'|'nationalist'|'dissident'|'apolitical'`|null — earned through events only, born neutral
- `conditions`: `[{ id, severity: 'mild'|'moderate'|'severe', diagnosedYear, managed: bool }]` — chronic conditions; passive annual drain on health/happiness based on severity × managed status
- `currentProject`: `{ type: 'writing'|'running'|'music'|'art'|'business', startYear, phase: 'early'|'middle'|'late'|'established'|'abandoned', name: string|null }` — slow-burn personal project, auto-detected from flags in `tick()`, advances phase by elapsed years. Surfaced in year texture prose; gates `events_project_arc.js` milestone events.

### Life Phases (`src/engine/gameEngine.js: getPhase`)

```
early_childhood  ≤ 5
childhood        6–11
adolescence      12–17
young_adult      18–29
midlife          30–49
late_life        50+
```

**IMPORTANT**: Never use `phase: 'adult'` — it is not a valid phase and will silently prevent events from ever firing.

### Event System

Events live in 218+ modules under `src/data/`. The **Source Tree** at the bottom of this file lists every module with a one-line description. For verbose per-module descriptions, see `docs/codebase-state.md`.

Event shape:
```js
{
  id: 'unique_id',
  phase: 'childhood',          // life phase this can fire in
  weight: 3,                   // relative probability
  when: (G) => boolean,        // guard condition
  text: 'prose...',
  choices: [                   // null for auto-resolve
    { text, tag, outcome, effect: (p) => { p.m += 5 } }
  ],
  effect: (p) => { ... },      // null if choices; only receives p — NOT G
}
```

**Critical**: `effect` functions receive only `p` (the proxy). `G` is only available in `when` guards. Never put G-dependent logic in effects.

The `G` object (built by `buildG()`) exposes everything event conditions need:
`G.character`, `G.stats`, `G.flags`, `G.mem`, `G.age`, `G.currentYear`, `G.career`, `G.partner`, `G.children`, `G.parents`, `G.money`, `G.karma`, `G.fame`, `G.regime`, `G.lgbtqCriminalized`, `G.casteSystem`, `G.childMarriageRisk`, `G.ruralUrban`, `G.ethnicity`, `G.religion`, `G.currentCountry`, `G.residencyStatus`, `G.inPrison`, `G.place` (current place object from places.js, or null), `G.desire` (character's core formative desire), `G.political_leaning`, `G.conditions` (array of active chronic conditions), `G.currentProject` (active slow-burn project object, or null)

Effect proxy shorthands (all are additive deltas):
- `p.m` → happiness, `p.h` → health, `p.e` → smarts, `p.s` → charisma, `p.w` → wealth stat, `p.lo` → looks
- `p.mo` → money (absolute dollars), `p.karma` → karma, `p.r` → regret
- `p.addFlag('flag_name')` — adds to flags array
- `p.setMem('key', value)` — stores value in `state.mem` (use for once-per-run guards)
- `p.killParent('father'|'mother')` — marks parent dead
- `p.killPartner()` — removes partner, sets widowed flag
- `p.setResidency('work_visa')` — sets residencyStatus
- `p.wipeMoney(fraction)` — deducts fraction of current money (e.g. `p.wipeMoney(0.3)` = lose 30%)
- `p.addFriend(name, quality)`, `p.updatePartnerRel(delta)`
- `p.updateChildRel(idx, delta)` — adjusts relationship quality for child at index idx
- `p.updateFriendRel(idx, delta)` — adjusts relationship quality for friend at index idx
- `p.addCondition(id, severity)` — adds a chronic condition (default severity `'moderate'`); no-ops if already present
- `p.manageCondition(id, managed)` — sets `managed` flag on an existing condition (default `true`)
- `p.addPartnerMoment(text)` — adds a prose string to `mem.partnerMoments` (capped at 12); surfaced in `buildYearTexture()` during good years

**Important**: `p.addFlag('flag_name')` also auto-stores `mem.[flag]Year = currentYear` for 22 emotionally significant flags (`TIMESTAMPED_FLAGS` set in `buildEffectProxy`). These timestamps power the memory layer in `buildYearTexture()`. If a new flag deserves memory-layer prose (grief, failure, milestone, departure), add it to `TIMESTAMPED_FLAGS`.

### World Events (`src/data/worldEvents.js`)

181 world events. Fire based on year range + archetype/country match, independent of the normal event queue. Shape:
```js
{
  id, name, years: [start, end],
  archetypes: ['wealthy_west'] | 'all',
  countries: ['Germany'] | null,
  narrative: 'prose...',
  context: '2–3 sentence factual note shown in optional expandable.',  // optional
  effect: (p) => { ... },
  addFlags: [],
  minAge: 0, maxAge: null,
  when: (G) => boolean,  // optional extra guard
}
```

Covers: WWII, Cold War (Berlin Wall, Cuban Missile Crisis, Prague Spring, Polish Solidarity, East Germany Stasi), famines (Holodomor, Great Leap Forward, Ethiopia), economic events (hyperinflation cycles, Japan bubble, Argentina 2001, Celtic Tiger, Korean miracle, Venezuela collapse, Gulf oil boom), national traumas (Troubles, Tiananmen, Apartheid, AIDS crisis), and more.

### Country Data (`src/data/countries.js`)

83 countries. Every country has:
```js
{
  name, archetype, gdp, yearRange,
  regime,           // starting political system
  regimeHistory: [{ year, to }],   // dated transitions
  religionWeights: { christian_catholic: 0.4, ... },
  ethnicGroups: [{ id, name, share, disadvantaged? }],
  casteSystem: bool,
  lgbtqCriminalized: bool,
  lgbtqLegalYear: number | null,
  childMarriageRisk: 0.0–0.5,
  urbanRate: 0.0–1.0,
  literacyMale: 0.0–1.0,
  literacyFemale: 0.0–1.0,
  context: 'lived-texture description...',
}
```

Country archetypes: `wealthy_west`, `wealthy_east`, `wealthy_gulf`, `post_soviet`, `developing_urban`, `developing_unstable`, `subsaharan`, `conflict_zone`

GDP tiers: `very_high`, `high`, `medium_high`, `medium`, `low_medium`, `low`, `very_low`

Regime types: `federal_republic`, `parliamentary_republic`, `constitutional_monarchy`, `absolute_monarchy`, `military_dictatorship`, `single_party_communist`, `single_party_authoritarian`, `theocracy`, `democracy`

The `getCountryRegime(country, year)` function in gameEngine applies `regimeHistory` transitions, so events can correctly gate on regime-at-the-time (e.g., Iran is `constitutional_monarchy` before 1979, `theocracy` after).

### Careers (`src/data/careers.js`)

Each career has: `id`, `title`, `field`, `levels[]`, `requirements`, `archetypeAvailable[]`, `gdpRequired`, `promotionChance`, `description`, and career-specific `events[]`. Modern careers have `minYear` (and optionally `maxYear`) to prevent anachronistic career choices. Current era-gated: `software_developer` (1985+), `data_scientist` (2010+), `content_creator` (2012+).

### Trial System (`src/store/gameStore.js: resolveTrial`)

When a crime attempt is caught (via `attemptCrime()`), instead of immediately going to prison, `pendingTrial` is set. This blocks Age Up. The player chooses a lawyer tier:
- **No lawyer / public defender**: low dismiss chance, high conviction
- **Mid-tier lawyer**: moderate chances
- **Top lawyer**: high dismiss chance (costs significant money)

Legal quality scales by regime: democracies have fair courts (1.0×), military dictatorships are stacked (0.35×). Lawyer fees scale by country GDP.

### Partner Lifecycle (`src/engine/gameEngine.js: tickPartner`)

Called each year via `advanceYear`. Partner ages +1/year. At age 75+ there's a death probability (increases with age). On death: partner removed, `widowed` or `lost_partner` flags set, death logged in lifeLog. Relationship quality drifts ±1 per year.

---

## The Immersion Principle

When adding anything — events, world events, career events, country data — ask:

1. **Time-accurate**: Would this exist in the year the player is experiencing it?
2. **Place-accurate**: Is this specific to this country/archetype, or is it generic?
3. **Perspective-accurate**: Is this told from the character's lived position (poor/rich, majority/minority, rural/urban, man/woman in that society)?
4. **Consequential**: Does it connect to real data fields (`lgbtqCriminalized`, `regime`, `literacyFemale`, `childMarriageRisk`, `casteSystem`, `ruralUrban`, `wealthTier`)?

Generic events are a last resort. Specific events — ones that could only fire for a Dalit woman in India in 1975, or a Chinese teenager during the Cultural Revolution, or a Nigerian kid skipping the landline era for mobile money — are the goal.

---

## Writing Style

- Second person, present tense: *"You arrive at the school and..."*
- Specific and concrete: name the object, the sound, the texture. Not "you feel sad" but "you do not get up for a day."
- No editorializing: don't tell the player what to feel. Show what happens.
- Short paragraphs. Never more than 4–5 sentences for an event body.
- Choices use plain declarative text, no ">" arrows or gamey framing.
- Outcome text is 1–2 sentences. The effect is felt, not narrated.

---

## Current State

109 countries, 255 world events, 275 event modules (~5,800+ events), 2051 registered flags, 321 ribbons. **0 orphaned, 0 partial flags.** Run `npm run check-flags` to verify.

**Codebase refactor (PR #105)**: Events reorganized into subdirectories under `src/data/events/`: `geographic/` (country-specific), `thematic/` (cross-cutting arcs), `lifecycle/` (phase-specific), `sonder/` (contemplative layer), `specific_lives/` (extreme specificity), `followthrough/` (all followthroughs consolidated). `gameEngine.js` split into 5 focused modules. `flags.js` split into 6 category files.

**PR #104**: `events_specific_lives.js` — 221 micro-specific events targeting one-of-a-kind life circumstances (Dalit water pump, 1943 Leningrad ration card, maquiladora night shift, Stasi file retrieval, etc.).

**PRs #107–109**: MODE A/B/C depth sprint — 12 new sonder modules (events_sonder_3.js through events_sonder_12.js, ~360 contemplative events); new geographic depth: Norway, Sweden, Denmark, Czech Republic, Ghana, Ecuador, El Salvador, Guatemala, Honduras, Nicaragua, Dominican Republic, Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Greece depth, Ireland depth, Scandinavia depth; followthrough_30.js through followthrough_48.js (19 files, 236 events); events_followthrough_all.js (consolidated 317 followthrough events from the 29 original files).

- Full event system descriptions and coverage history: `docs/codebase-state.md`
- Full BUILD-by-BUILD roadmap and MICRO-EVENT DESIGN PRINCIPLE: `docs/roadmap.md`

---

## Source Tree

```
src/
  data/
    countries.js              — 109 countries with full demographic data
    places.js                 — 250+ named places across all countries (scale, region, type, population)
    headlines.js              — ~130 major historical headlines for life log injection
    events.js                 — root event file, imports 275 modules, exports EVENTS array (~5,800+ total character events)
    [All events are organized into src/data/events/ subdirectories — see below]

    worldEvents.js            — 255 world history events (year+country/archetype gated); 20+ events have `context` fields
    headlines.js              — ~130 major historical headline entries (year-matched, injected as log entries)
    flags/                    — FLAG_REGISTRY split into 6 category files (political, economic, social, personal, historical, identity). 2051 registered flags. Pure data, no imports. Run `npm run check-flags` to derive coverage.
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    assets.js                 — property/vehicle data
    destinations.js           — travel destinations
    illnesses.js              — illness/disease system
    ribbons.js                — end-of-life achievement ribbons (321 defined)
    soundtrack.js             — 50 cultural markers 1942–2023: atmospheric cultural texture alongside headlines
    events/
      [Root-level thematic]
      thematic/
        events_culture.js         — regime/ethnicity/education/LGBTQ events
        events_gender.js          — gender-specific events
        events_historical.js      — historical period events
        events_religion.js        — religion-specific events
        events_technology.js      — technology timeline (era-gated)
        events_immigration.js     — emigration, residency, integration events
        events_career_regime.js   — career × regime intersection events
        events_conflict_childhood.js — conflict zone childhood events
        events_lgbtq.js           — LGBTQ identity and rights events
        events_mental_health.js   — mental health arc events
        events_grief.js           — grief and loss events
        events_grief_mental.js    — grief-mental health intersection events
        events_religion_arc.js    — faith arc events
        events_late_life.js       — late-life events (retirement, partner decline, health decline, legacy)
        events_children_arc.js    — children arc events
        events_fame_karma.js      — fame/karma/hobby/friendship events
        events_texture.js         — rural/pre-1960/career texture events
        events_society.js         — women's rights, healthcare, language suppression/identity
        events_romance_arc.js     — post-marriage arc events
        events_consequence.js     — downstream consequence events (illiteracy, addiction arc, STI arc)
        events_friends.js         — friend lifecycle events
        events_business.js        — business arc events
        events_siblings.js        — sibling events
        events_education_arc.js   — university depth events
        events_adolescence.js     — adolescence identity events
        events_fertility.js       — fertility depth events
        events_career_wealth.js   — career late-arc, wealth gap, rural-to-urban events
        events_gulf_east.js       — wealthy_gulf and wealthy_east specific events
        events_relationship_quality.js — 13 relationship quality threshold events
        events_activity_payoffs.js — downstream consequences for activity flags
        events_places.js          — place-based events (moves, arrival texture, migration)
        events_infrastructure.js  — infrastructure events (power cuts, floods, traffic, water shortage)
        events_dying_city.js      — Rust Belt + post-Soviet urban decline arc
        events_cities.js          — city-specific texture (Lagos, Mumbai, Cairo, Mexico City, Moscow)
        events_cities_extended.js — extended city texture across more cities
        events_rural_texture.js   — rural/suburban texture (water walk, electrification, brain drain)
        events_wealth_system.js   — 17 wealth mechanics events (banking, ROSCA, hyperinflation, poverty trap, patron-client)
        events_money.js           — 7 money-across-a-life events (first paycheck, inheritance, elder scam, counting days)
        events_illness.js         — 14 chronic illness events (diabetes, heart disease, cancer, COPD, back pain, HIV/AIDS, vision/hearing loss, depression, disability)
        events_parent_care.js     — 8-event parent care arc (first sign → final decline + killParent)
        events_climate.js         — 18 climate arc events (2025–2100): heat, drought, flooding, displacement, Pacific extinction, late-life witness
        events_indigenous.js      — 21 Indigenous peoples events: Aboriginal Australian, Native American, First Nations, Māori arcs
        events_automation.js      — 12 automation/AI arc events (2025–2050): career-specific disruption + UBI debate
        events_arts.js            — 9 arts-under-pressure events: samizdat arcs, jazz/bebop refusal, Nollywood, censored artist, artistic integrity echo
        events_crosscutting.js    — 22 events: domestic worker arc, city bombardment arc, refugee camp childhood arc
        events_decolonisation.js  — independence generation events (subsaharan/developing 1956–1975)
        events_internet_era.js    — early internet era texture events: PC bang Seoul, cybercafé Lagos, AOL dial-up (1993–2005)
        events_labor.js           — union card, strike, picket line, solidarity arc
        events_informal.js        — 18 informal economy events (hawker/moto-taxi/market-stall/day-labor/subsistence)
        events_neighborhoods.js   — 16 neighborhood-tier events (informal settlement, working class, elite)
        events_postrelease.js     — 12 post-release events: job checkbox, housing bar, parole, recidivism trap
        events_mentor.js          — 10 mentor arc events: receiving + becoming + protégé arcs
        events_family_silence.js  — 20 generational memory events: "what your parents didn't say"
        events_coherence.js       — 11 coherence follow-throughs: orphaned flag callbacks
        events_poverty.js         — 43 financial hardship events: eviction, repossession, homelessness, welfare
        events_career_arcs.js     — 19 deep career arc events: athlete, academic, chef/hospitality
        events_social_media.js    — 9 social media arc events: country-specific platforms, excitement→damage arc
        events_gang.js            — 10 gang/organised crime arc events
        events_social_capital.js  — 8 social capital events: charisma/looks as era-dependent resources
        events_world_response.js  — 6 world event response events
        events_emigrant_integration.js — 7 emigrant integration arc events staged by yearsAbroad
        events_intimacy.js        — 12 sex and intimacy arc events
        events_school.js          — 11 school institution events
        events_children_abroad.js — 7 events: parent departs, birthday call, package, reunion stranger
        events_stayed.js          — 5 events: watching departures, country empties, late reckoning on staying
        events_sport.js           — 11 events: local match, cricket, scout, World Cup year, last game
        events_disasters.js       — 8 events: flood season, bad flood, earthquake preparedness/experience, typhoon
        events_activity_choice.js — 16 activity practice counter → story events
        events_project_arc.js     — 7 project milestone events
        events_industrial.js      — 9 industrial disaster events (Chernobyl, Bhopal, Niger Delta)
        events_debt.js            — 14 events: consumer credit spiral, microfinance trap, IMF adjustment, medical debt
        events_adoptee.js         — 5 events: transracial identity, DNA test, search, origin trip, the thing that doesn't resolve
        events_multilingual.js    — 7 events: parent-child language gap, language death, code-switch identity
        events_ofw.js             — 15 events: Philippines OFW arc (Gulf/HK/Italy tracks)
        events_political_arc.js   — 10 events: political leaning consequence arc
        events_documents.js       — 8 events: Rwanda ID checkpoint, Soviet propiska, Nansen passport, statelessness, colonial census
        events_soldier_arc.js     — 12 events: deployment, first week, the order, return, veteran recognition
        events_clergy.js          — 11 events: Catholic priest Ireland, Buddhist monk Cambodia, imam under Suharto, yeshiva student
        events_disability.js      — 18 disability arc events: birth/Deaf/acquired arcs
        events_addiction.js       — 14 addiction arc events: first use → sobriety; family members' arc
        events_dementia.js        — 9 dementia arc events: personal + caregiver perspectives
        events_divorce.js         — 11 divorce arc events
        events_celebrity.js       — 7 celebrity arc events
        events_child_soldier.js   — 9 child soldier arc events
        events_teacher_arc.js     — 9 teacher life arc events
        events_wwi_depression.js  — 10 WWI/Depression arc events (1916–1940s)
        events_wound_coping.js    — 8 wound coping events (adolescence + young adult)
        events_condition_arc.js   — 8 chronic condition lifecycle events
        events_desire_resolution.js — 8 events: positive fulfillment paths for all 8 desire types
        events_georgia.js         — 10 events: April 9 1989, Rose Revolution, Russia-Georgia war, EU dream
        events_syria.js           — 8 events: Ba'ath childhood, Hama 1982, 2011 uprising, displacement
        events_child_death_arc.js — 11 events: infant death trigger through late-life reckoning
        events_israel.js          — 13 events: founding, Mizrahi, IDF, Rabin, intifadas, Oct 7 2023
        events_germany_france.js  — 9 events: Gastarbeiter, DDR, reunification; France Algerian war, banlieue
        events_india_depth.js     — 12 events: arranged marriage, joint family, dowry, NRI question
        events_iran.js            — 7 events: Khatami reform era, sanctions economy, hijab, brain drain
        events_sick_child.js      — 9 events: parent of seriously ill child arc
        events_local.js           — 12 events: local significance arc (village healer, coach, memory keeper)
        events_2010s.js           — 8 events: gig economy, phone at the table, climate grief, populist fracture
        events_aid_worker.js      — 13 events: humanitarian arc (deployment, moral injury, colleague loss)
        events_cults.js           — 10 events: born-in track + joined track (high-control religion)
        events_sex_work.js        — 10 events: survival/tolerated/legalized tracks
        events_bonded_labor.js    — 9 events: debt bondage arc (South Asia + subsaharan)
        events_water_infra.js     — 6 events: standpipe politics, electrification, dry-season scarcity
        events_fgm.js             — 5 events: community expectation, decision, aftermath, daughter's choice
        events_bedouin.js         — 5 events: Saudi/Jordan sedentarisation 1950s–70s
        events_gifted.js          — 35+ gifted arc events: manifestation, ceiling, door opens/closes, midlife reckoning
        events_gifted_2.js        — gifted arc depth: Gould arc, generational transmission, exploitation
        events_gifted_3.js        — gifted arc extension: gender×gift, disability×gift, elite recognition
        events_pandemic.js        — 16 events: COVID-19 arc across archetypes
      lifecycle/
        events_early_life.js      — 20 early childhood (0–5) + young adult (18–25) events
        events_early_childhood.js — 13 early childhood depth events (ages 0–5)
        events_childhood_texture.js — 19 childhood texture events (ages 6–17)
        events_adolescence_2.js   — 22 adolescence depth events
        events_small_life.js      — named friendships, first crushes, formative teachers, first home
        events_solo_life.js       — 8 solo-life events: unpartnered texture across all phases
        events_dying_arc.js       — 6 final-years events: consciousness of approaching death
        events_pregnancy.js       — 13 pregnancy arc events: first-trimester, birth, postpartum
        events_menopause.js       — 5 menopause arc events: female 45–58, culturally-branched
        events_desires.js         — formative wound events + decade reflections (30/40/50/60)
        events_life_skeleton.js   — 4 guaranteed narrative beats at ages 15/30/40/55
        events_phase_entries.js   — 3 life phase transition events (adolescence/young_adult/midlife)
        events_partner_wants.js   — 8 relationship desire tension events
        events_relationship_crossover.js — 8 partnership arc events
        events_fertility.js       — fertility depth events
        events_wound_coping.js    — 8 wound coping events (also in thematic)
      geographic/
        [109 country/region arc files — each covers core historical events for that place]
        events_post_soviet.js     — 15 post-Soviet arc events (communist childhood, 1990s collapse, oligarch split)
        events_vietnam.js         — 10 Vietnam arc events (Saigon fall, re-education, boat people, Doi Moi)
        events_latin_america.js   — 60+ events: Chile, Argentina, Brazil, Colombia, Mexico, Operation Condor
        events_country_arcs.js    — 22 cross-country arcs: Nigeria, India, Egypt, Romania, Korea depth
        events_country_arcs_2.js  — 36 events: China Mao era, USA specificity, Japan (hibakusha, salaryman, bubble)
        events_country_arcs_3.js  — 13 events: Iran (SAVAK/revolution/war), South Africa (TRC), France WWII, Biafra
        events_asia_arcs.js       — 22 events: Cambodia (Khmer Rouge), Bangladesh (Liberation War), Pakistan
        events_drc.js             — 10 DR Congo arc events
        events_central_asia.js    — 10 events: Kazakh collectivization, Uzbek cotton/Aral Sea, Kyrgyz 1991, Kazakhstan oil boom
        events_indonesia.js       — 10 events: May 1998 riots, Reformasi, 35-year expression ban
        events_indonesia_depth.js — 6 events: 1965 purge, Bali bombing, tsunami, transmigration
        events_kurdish.js         — 12 events: language ban, PKK, Anfal 1988, Rojava
        events_armenia_azerbaijan.js — 15 events: Armenian Genocide, Karabakh wars, Black January 1990
        events_nomadic.js         — 8 events: Maasai + Mongolian herder texture
        events_decolonisation.js  — independence generation (1956–1975, subsaharan/developing)
        events_crosscutting.js    — 22 events: domestic worker, city bombardment, refugee camp childhood
        events_central_europe.js  — 9 events: Hungary 1956, Czech Charter 77, Velvet Revolution
        events_southeast_europe.js — 9 events: Yugoslav collapse, Bosnian War, Kosovo, tribunal
        events_caribbean.js       — 14 events: Jamaica (garrison politics, 1980 violence, Windrush), Trinidad (Carnival, oil boom)
        events_guinea.js          — 13 events: 1958 No vote, Sékou Touré, Camp Boiro, 2009 massacre
        events_mali.js            — 10 events: ancient empire identity, Traoré dictatorship, 1991 revolution, Sahel crisis
        events_eritrea.js         — 12 events: liberation, independence 1993, national service, diaspora tax
        events_mongolia.js        — 12 events: herder childhood, Stalinist purge 1937, 1990 revolution, dzud
        events_burkina.js         — 8 events: Sankara 1983, assassination 1987, 2022 coup, Sahel displacement
        events_ivory_coast.js     — 7 events: cocoa economy, 1999 coup, 2010 election crisis
        events_cameroon.js        — 7 events: Bamileke tontine, Biya 40-year rule, Anglophone crisis
        events_georgia.js         — 10 events (in thematic): April 9 1989, Rose Revolution, Russia-Georgia war
        events_west_africa.js     — 16 events: Ghana/Nkrumah, Biafra, Liberia/Taylor, Sierra Leone RUF
        events_denmark.js         — 7 events: welfare state, WWII occupation, Danes in Resistance
        events_norway.js          — 8 events: WWII occupation/resistance, Quisling, July 22 2011, oil fund reckoning
        events_sweden.js          — 7 events: WWII moral debt, Palme 1986, immigration transformation, welfare reckoning
        events_czech_republic.js  — 8 events: normalization, Charter 77, Velvet Revolution, lustration, EU
        events_scandinavia.js     — 8 Nordic events: welfare state, Norway oil, Finland Winter War, Janteloven
        events_scandinavia_depth.js — 6 events: Norway 1942 deportation, Finland continuation war, finlandization, NATO 2023
        events_ireland_depth.js   — 10 events: Famine shadow, Easter Rising, Industrial Schools, Gaeltacht, referendums
        events_ireland_turkey.js  — 11 events: Irish emigration wave + Troubles; Turkey modernization + diaspora
        events_greece_portugal.js — 11 events: Greece junta 1967–74, debt crisis; Portugal Estado Novo, Carnation Revolution
        events_greece_depth.js    — 9 events: Asia Minor prosfyges, Katochi famine, EAM/ELAS, Civil War 1946–49, gastarbeiter
        events_ghana.js           — 10 events: Rawlings PNDC, cocoa farming, day-name identity, dumsor, Year of Return
        events_south_africa.js    — 4 events: Soweto Uprising 1976, Mandela release 1990, state capture, white emigration
        events_usa.js             — 15 events: Great Migration, Civil Rights, Vietnam draft, Rust Belt, War on Drugs, 9/11, opioids
        events_ecuador.js         — 8 events: dollarization 2000, banana economy, Galapagos, Correa era, oil/Amazon conflict
        events_el_salvador.js     — 7 events: civil war 1979–92, Romero, disappeared, MS-13, remittances
        events_guatemala.js       — 8 events: 1954 coup, Ríos Montt genocide, peace accords, Mayan identity, migration north
        events_honduras.js        — 8 events: banana republic history, 1980s contra proxy, 2009 coup, gang violence
        events_nicaragua.js       — 8 events: Somoza dictatorship, Sandinista revolution, Contra war, Ortega return
        events_dominican_republic.js — 9 events: Trujillo dictatorship, 1961 assassination, US occupation 1965, Haitian relations
        events_uzbekistan.js      — 10 events: cotton monoculture, Karimov era, Andijan 2005, tashkent earthquake, Mirziyoyev thaw
        events_kazakhstan.js      — 10 events: Aral Sea, nomad collectivization, oil boom 2000s, Nursultan rename, 2022 protests
        events_kyrgyzstan.js      — 10 events: 1991 collapse, Akayev, Tulip Revolution, Osh violence 2010
        events_tajikistan.js      — 10 events: Soviet collapse, civil war 1992–97, Rahmon era, labor migration
        events_turkmenistan.js    — 10 events: Niyazov Turkmenbashi cult, Gurbanguly reforms, gas wealth, Ashgabat marble city
        events_china.js           — 26 events: Cultural Revolution, gaokao, Tiananmen, rural-urban migration, social credit, lying flat
        events_japan.js           — 12 events: 1945 defeat, occupation, economic miracle, salaryman/karoshi, Fukushima
        events_korea.js           — 14 events: hagwon, suneung, military service, Gwangju 1980, chaebol, Hallyu, DMZ families
        events_india.js           — 7 events: Emergency 1975–77, Sikh massacre 1984, liberalisation 1991, demonetisation
        events_india_depth.js     — 12 events: arranged marriage, joint family economy, dowry pressure, NRI question
        events_pakistan.js        — 9 events: Partition, 1971 East Wing, Zia Islamisation, nuclear tests
        events_bangladesh.js      — 9 events: Bhola 1970, Liberation War 1971, Rana Plaza 2013, 2024 student uprising
        events_sri_lanka.js       — 8 events: Black July 1983, civil war, Tamil diaspora, 2022 collapse
        events_cambodia.js        — 8 events: Year Zero, denunciation choice, Vietnamese liberation, Tuol Sleng, late reckoning
        events_myanmar.js         — 7 events: Ne Win, 8888 Uprising, Saffron Revolution, Nargis, 2021 coup
        events_thailand.js        — 6 events: Thammasat 1973, Chakri dynasty, coups, lèse-majesté, Red/Yellow
        events_laos.js            — 7 events: UXO/Secret War, Hmong persecution, LPRP discipline, Chinese debt-trap
        events_nepal.js           — 6 events: Maoist war, Gyanendra coup, 2015 earthquake, Gulf migration
        events_vietnam.js         — 10 events: Saigon fall, re-education, boat people, Doi Moi, Viet Kieu
        events_indonesia.js       — 10 events: May 1998 riots, Reformasi, identity arc
        events_philippines.js     — 9 events: Marcos, EDSA 1986, Duterte, Marcos Jr. return 2022
        events_singapore.js       — 8 events: founding shock, kampung demolition, HDB, PSLE, LKY death
        events_taiwan_malaysia.js — 9 events: 228 Massacre, martial law, democratization; Malaysia NEP, GE14 2018
        events_north_korea.js     — 9 events: Juche, songbun, Arduous March famine, jangmadang, defection
        events_australia.js       — 8 events: White Australia Policy, Vietnam conscription, The Dismissal, Port Arthur
        events_new_zealand.js     — 9 events: Springbok Tour 1981, Rogernomics, nuclear-free, Christchurch 2019
        events_fiji.js            — 8 events: iTaukei/Indo-Fijian perspectives, 1987 Rabuka coups
        events_kenya.js           — 7 events: Harambee, Moi era, 2007 election violence, M-Pesa
        events_nigeria.js         — 8 events: coup culture, June 12 1993, Boko Haram, naira crisis
        events_ethiopia.js        — 7 events: Red Terror, 1984 famine, Derg fall, Addis Ababa boom
        events_rwanda.js          — 8 events: RTLM radio, April 1994 genocide, gacaca courts
        events_uganda.js          — 7 events: Amin, liberation war, HIV/AIDS, LRA child soldiers
        events_somalia.js         — 7 events: Siad Barre, civil war collapse, Al-Shabaab, piracy
        events_zimbabwe.js        — 10 events: land reform (both perspectives), hyperinflation, Gukurahundi, Mugabe fall
        events_tanzania.js        — 7 events: Ujamaa villagisation, Swahili education, Nyerere death 1999
        events_zambia.js          — 6 events: Kaunda, copper volatility, structural adjustment
        events_mozambique.js      — 6 events: FRELIMO, RENAMO war, Machel crash 1986, peace 1992
        events_angola.js          — 6 events: MPLA vs UNITA, 27-year war, landmines, peace 2002
        events_namibia.js         — 8 events: Herero genocide, contract labor, AIDS, San displacement
        events_senegal.js         — 5 events: Grand Magal, marabout authority, dahira networks, Barca Walla Barsakh
        events_mali.js            — 10 events: ancient empire, cotton economy, Traoré, 1991 revolution, Timbuktu
        events_guinea.js          — 13 events: 1958 No vote, Sékou Touré, Camp Boiro, 2009 massacre
        events_ivory_coast.js     — 7 events: cocoa economy, Houphouët-Boigny death, coups, Anglophone identity
        events_cameroon.js        — 7 events: Bamileke tontine, Biya rule, Anglophone crisis 2016+
        events_burkina.js         — 8 events: Sankara 1983, coup 2022, Sahel jihad displacement
        events_ghana.js           — 10 events: Rawlings, cocoa, democratic consolidation, dumsor
        events_drc.js             — 10 DR Congo arc events: Lumumba, Mobutu, coltan mine, Kinshasa
        events_west_africa.js     — 16 events: Nkrumah Ghana, Biafra, Liberian civil war, Sierra Leone RUF
        events_egypt.js           — 7 events: Nasser/Suez 1956, Naksa 1967, Mubarak, Tahrir 2011
        events_sudan.js           — 6 events: Darfur genocide 2003–08, South Sudan independence, al-Bashir
        events_ethiopia.js        — 7 events: Red Terror, famine, Derg fall, coffee ceremony, Addis boom
        events_angola.js          — 6 events: civil war, landmines, peace 2002, oil boom
        events_morocco.js         — 8 events: Years of Lead, Amazigh recognition 2011, Strait crossing
        events_algeria.js         — 13 events: Décennie Noire 1991–2002, intellectual targeting, journalist survival
        events_tunisia.js         — 6 events: Ben Ali, Jasmine Revolution 2011, constitutional moment
        events_libya.js           — 6 events: Gaddafi Jamahiriya, Lockerbie, 2011 uprising, fragmentation
        events_egypt.js           — (above)
        events_iraq.js            — 8 events: Ba'ath state, Iran-Iraq War, Gulf War, 2003 invasion, ISIS
        events_iran.js            — 7 events: Khatami reform era, sanctions, hijab enforcement
        events_saudi.js           — 9 events: Saud-Wahhabi, oil 1973 embargo, Grand Mosque siege, Vision 2030
        events_jordan.js          — 6 events: Palestinian displacement, Black September, King Hussein, Syrian refugees
        events_yemen.js           — 6 events: Yemen War 1962–70, Saudi-Houthi conflict, humanitarian collapse
        events_palestine.js       — 14 events: Nakba memory, checkpoint, intifadas, Oslo, Gaza bombardment
        events_syria.js           — 8 events: Ba'ath childhood, Hama 1982, 2011 uprising, displacement, Europe arrival
        events_lebanon.js         — 14 events: civil war stairwell community, Hariri reconstruction, 2020 explosion
        events_turkey.js          — 5 events: Atatürk literacy, 2023 earthquake, lira crisis, Istanbul Convention
        events_kurdish.js         — 12 events: language ban, village evacuations, Anfal 1988, Rojava
        events_rohingya.js        — 8 events: 1982 statelessness, August 2017 clearances, Cox's Bazar camp
        events_uyghur.js          — 3 events: Ramadan restrictions, re-education camp, diaspora silence
        events_israel.js          — 13 events: founding, Mizrahi, IDF, Rabin, intifadas, Oct 7 2023
        events_armenia_azerbaijan.js — 15 events: Armenian Genocide, Karabakh wars, Black January 1990
        events_georgia.js         — 10 events: April 9 1989, Rose Revolution, Russia-Georgia war
        events_baltic.js          — 6 events: Soviet deportations, Singing Revolution, independence 1991
        events_ukraine.js         — 7 events: Holodomor, independence, Orange Revolution, Euromaidan, 2022 invasion
        events_russia.js          — 4 events: Soviet-Afghan War, Beslan 2004, Bolotnaya protests, Navalny death
        events_belarus.js         — 8 events: WWII partisan memory, Chernobyl, Lukashenko consolidation, 2020 crackdown
        events_poland.js          — 7 events: communist childhood, Solidarity 1980, martial law, Round Table 1989
        events_romania.js         — 5 events: Securitate, Decree 779, December 1989 revolution, EU accession
        events_central_europe.js  — 9 events: Hungary 1956, Czech Charter 77, Velvet Revolution, lustration
        events_southeast_europe.js — 9 events: Yugoslav identity collapse, Bosnian War, Srebrenica, ICTY
        events_spain.js           — 11 events: Franco, La Transición, La Movida, 2008 crisis, Catalan referendum
        events_italy.js           — 8 events: economic miracle, Hot Autumn 1969, Years of Lead, Berlusconi, precariato
        events_germany_france.js  — 9 events: Gastarbeiter, DDR, reunification; French Algerian war, banlieue
        events_netherlands.js     — 8 events: Hunger Winter, Surinamese migration, Srebrenica (Dutchbat), Fortuyn
        events_uk.js              — 7 events: Miners' strike 1984, Poll Tax, Good Friday, Iraq War, Brexit, Grenfell
        events_ireland_turkey.js  — 11 events: Irish emigration + Troubles; Turkey modernity + diaspora
        events_greece_portugal.js — 11 events: Greek junta, debt crisis; Portuguese Estado Novo, Carnation Revolution
        events_post_soviet.js     — 15 events: communist childhood, 1990s collapse, oligarch split, emigration wave
        events_latin_america.js   — 60+ events: Chile, Argentina, Brazil, Colombia, Mexico arcs
        events_central_america.js — 14 events: civil wars, liberation theology, MS-13, Hurricane Mitch, migration
        events_caribbean.js       — 14 events: Jamaica garrison politics, Trinidad oil boom + ethnic politics
        events_colombia.js        — 9 events: La Violencia, FARC, cartel, 7M displaced, 2016 peace accord
        events_brazil.js          — 9 events: favela, dictatorship 1964–85, abertura, racial democracy myth
        events_cuba.js            — 8 events: revolution childhood, Mariel, Santería, ration book, July 2021
        events_venezuela.js       — 8 events: Caracazo 1989, Chávez, oil collapse, 7M diaspora
        events_peru.js            — 8 events: Shining Path, Fujimori, forced sterilizations, Truth Commission
        events_uy_py_ec.js        — 13 events: Uruguay Tupamaros + coup; Paraguay Stroessner; Ecuador dollarization
        events_ecuador.js         — 8 events: dollarization, Correa era, oil conflict, Galapagos
        events_el_salvador.js     — 7 events: civil war, Romero, MS-13, gang era, immigration
        events_guatemala.js       — 8 events: 1954 coup, genocide, Mayan identity, migration
        events_honduras.js        — 8 events: banana republic, contra proxy, 2009 coup, gang violence
        events_nicaragua.js       — 8 events: Somoza, Sandinista revolution, Contra war, Ortega return
        events_dominican_republic.js — 9 events: Trujillo, 1961 assassination, US occupation 1965
        events_haiti.js           — 10 events: Tonton Macoutes, debt of independence, 2010 earthquake
        events_canada.js          — 8 events: October Crisis 1970, Charter 1982, Quebec Referendum 1995, TRC 2015
        events_australia.js       — 8 events: White Australia Policy, Vietnam conscription, Port Arthur
        events_new_zealand.js     — 9 events: Springbok Tour 1981, Rogernomics, Christchurch mosque shooting 2019
        events_puerto_rico.js     — 2 events: Hurricane Maria 2017, colonial status
        events_fiji.js            — 8 events: iTaukei/Indo-Fijian perspectives, 1987 Rabuka coups
      sonder/
        events_sonder.js         — 299 events: STRANGER GLIMPSES + MUNDANE LIFE (contemplative, mem-gated, weight 2)
        events_sonder_2.js       — 40 events: non-Western sensory, body in time, relational drift, weight of time
        events_sonder_3.js       — 34 events: authoritarian life texture, language of small decisions, migration/distance, late-life
        events_sonder_4.js       — 36 events: technology as time, the workplace, objects from before, body in weather
        events_sonder_5.js       — 36 events: childhood body memory, language and thought, money and counting
        events_sonder_6.js       — 36 events: night and sleep, weather and season, body at work, waiting
        events_sonder_7.js       — 36 events: food and meals, ceremony and ritual, the street
        events_sonder_8.js       — 36 events: work and purpose, home and objects, weather and seasons, late life
        events_sonder_9.js       — 36 events: childhood memory, language and words, money and want, friendship over time
        events_sonder_10.js      — 36 events: the photograph, the neighbor, what the body learns, faith in small acts
        events_sonder_11.js      — 36 events: the return, animals, what you inherit, the window
        events_sonder_12.js      — 36 events: sound, what you made, the official language, the hour
      specific_lives/
        events_specific_lives.js — 221 micro-specific events: inherited social position, women's lives with precision,
                                   labour at the granular level, minority within majority, religion at street level,
                                   pre-1940 texture, 2000s–2020s specific losses. Events that could only fire for
                                   one precise combination of person, place, and time.
      followthrough/
        events_followthrough_all.js — 317 consolidated follow-through events (all 29 original files merged):
                                      racism/discrimination, LGBTQ, abuse, communist childhood, cancer survivor,
                                      food insecurity, emigration anniversary, caste ceiling, civil war echo,
                                      genocide legacy, miscarriage chain, OFW flags, desire arc follow-throughs,
                                      sport flags, disaster flags, desire unfulfillment, Cameroon/Georgia/Brazil echoes
        events_followthrough_30.js — 70 events: business failure, political disillusionment, relationship arcs
        events_followthrough_31.js — 12 events: Central Asia arc echoes
        events_followthrough_32.js — 8 events: Ghana/Angola arc echoes
        events_followthrough_33.js — 12 events: Ghana + Angola arc follow-throughs
        events_followthrough_34.js — 7 events: Ecuador depth follow-throughs
        events_followthrough_35.js — 7 events: El Salvador + Guatemala arc echoes
        events_followthrough_36.js — 6 events: Honduras arc echoes
        events_followthrough_37.js — 5 events: Nicaragua arc echoes
        events_followthrough_38.js — 6 events: Dominican Republic arc echoes
        events_followthrough_39.js — 8 events: Czech Republic arc echoes
        events_followthrough_40.js — 7 events: Sweden arc echoes
        events_followthrough_41.js — 5 events: Denmark arc echoes
        events_followthrough_42.js — 12 events: Norway arc echoes
        events_followthrough_43.js — 5 events: Greece depth arc echoes
        events_followthrough_44.js — 10 events: Thailand depth arc echoes
        events_followthrough_45.js — 3 events: Dominican Republic follow-throughs
        events_followthrough_46.js — 16 events: world-event follow-throughs (Central Asia, Baltic, misc)
        events_followthrough_47.js — 17 events: world-event follow-throughs
        events_followthrough_48.js — 10 events: Scandinavia/Ireland partial flag fixes
  engine/
    [Split into 5 focused modules in PR #105]
    gameEngine.js             — core simulation: buildG, advanceYear, emigrate,
                                generateEpitaph, generateIdentityCard, buildYearTexture,
                                buildEffectProxy, resolveProxyExtras, tickPartner, attemptCrime,
                                deriveGenerationalFlags, DESIRE_PATTERNS, applySoundtrack
    casinoEngine.js
    gangEngine.js
    lotteryEngine.js
  store/
    gameStore.js              — Zustand store, INITIAL_STATE, all actions including
                                resolveTrial, pendingTrial state, relocateTo,
                                serializeState/deserializeState (save/load)
  components/
    LifeScreen.jsx            — main game screen (tabs: Life, Stats, Activities, Relationships, Prison)
                                includes trial modal, gender markers, "Who You Are" card, newspaper headlines,
                                relationship status chips (quality labels + flag overrides), conditions display;
                                log entries: isDeath (zinc/dark), isHeadline (stone/📰), isSoundtrack (violet/🎵), isWorld (amber/🌐), isKey (blue)
    ActivitiesPanel.jsx       — activities tab (grouped by category)
    BirthScreen.jsx           — random character creation
    CuratedBirthScreen.jsx    — 4-step curated birth wizard (country, birth year/gender, origin/stability/religion, preview)
    DeathScreen.jsx           — death/epitaph screen
    EventBox.jsx              — event display + world event context expandable
    TitleScreen.jsx           — title screen with "Random Life" + "Craft a Life" + "Continue" buttons
    MinigameScreen.jsx        — minigame container
    StatBar.jsx
    FlagChip.jsx
    minigames/                — MazeGame, FightGame, HackGame, QuickTime, LockPick
  utils/
    countryUtils.js           — getCountryFlag, REGIME_LABELS/COLORS, RELIGION_LABELS,
                                RESIDENCY_LABELS, getCountryNameForYear
    random.js                 — randomisation utilities
scripts/
  check-flags.js              — flag audit tool. Scans src/data/, src/engine/, src/store/ to find
                                SET flags (addFlag, addFlags arrays) and CHECKED flags. Splits
                                gameEngine.js into sections (buildYearTexture vs generateEpitaph vs
                                generateIdentityCard) to avoid false-positive coverage. Reports
                                ORPHANED / PARTIAL / COVERED per registry intent. Usage:
                                  npm run check-flags
                                  npm run check-flags -- --orphans
                                  npm run check-flags -- --weight=major
                                  npm run check-flags -- --unregistered
                                  npm run check-flags -- --world
```

# natalis — Developer Context

## Vision

natalis is a life simulation game with a specific dual mandate: **fun and education in equal measure**. The goal is that a player who runs a character born in 1962 in Nigeria should come away understanding what that life was actually like — the regime, the economy, the religion, the technology available, the historical events that shaped the era — not just a generic set of stats.

Every system should ask: *does this reflect what it would actually have been like to be this person, in this place, at this time?* If it doesn't, it's not done yet.

The tone is literary, not gamey. Event text reads like short fiction — sparse, specific, emotionally honest. No exclamation points. No "You gain +5 Happiness!" framing. The prose is the experience.

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
- `career`, `education`, `partner`, `children`, `parents`, `siblings`, `friends`, `pets`
- `assets`: `{ properties: [], vehicles: [] }`
- `debt`, `creditScore`, `mortgage`
- `mentalHealth`: `{ condition, medicating, therapy }`
- `hobbies`, `fitness`, `gpa`, `socialMedia`, `martialArts`

### Life Phases (`src/engine/gameEngine.js: getPhase`)

```
early_childhood  ≤ 5
childhood        6–11
adolescence      12–17
young_adult      18–29
midlife          30–49
late_life        50+
```

### Event System

Events live in:
- `src/data/events.js` — base events + imports everything into `EVENTS` export
- `src/data/events_gender.js` — gender-specific events
- `src/data/events_religion.js` — religion-specific events
- `src/data/events_historical.js` — historical period events
- `src/data/events_culture.js` — regime/ethnicity/caste/LGBTQ/education events (68+ events)
- `src/data/events_technology.js` — technology timeline events (20 events, 1930s–2020s)

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
  effect: (p) => { ... },      // null if choices
}
```

The `G` object (built by `buildG()`) exposes everything event conditions need:
`G.character`, `G.stats`, `G.flags`, `G.age`, `G.currentYear`, `G.career`, `G.partner`, `G.children`, `G.parents`, `G.money`, `G.karma`, `G.fame`, `G.regime`, `G.lgbtqCriminalized`, `G.casteSystem`, `G.childMarriageRisk`, `G.ruralUrban`, `G.ethnicity`, `G.religion`, `G.currentCountry`, `G.residencyStatus`, `G.inPrison`

Effect proxy shorthands (all are additive deltas):
- `p.m` → happiness, `p.h` → health, `p.e` → smarts, `p.s` → charisma, `p.w` → wealth stat, `p.lo` → looks
- `p.mo` → money (absolute dollars), `p.karma` → karma, `p.r` → regret
- `p.addFlag('flag_name')` — adds to flags array
- `p.killParent('father'|'mother')` — marks parent dead
- `p.setResidency('work_visa')` — sets residencyStatus
- `p.addFriend(name, quality)`, `p.updatePartnerRel(delta)`

### World Events (`src/data/worldEvents.js`)

Fire based on year range + archetype/country match, independent of the normal event queue. Shape:
```js
{
  id, name, years: [start, end],
  archetypes: ['wealthy_west'] | 'all',
  countries: ['Germany'] | null,
  narrative: 'prose...',
  effect: (p) => { ... },
  addFlags: [],
  minAge: 0, maxAge: null,
  when: (G) => boolean,  // optional extra guard
}
```

### Country Data (`src/data/countries.js`)

74 countries. Every country has:
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

## Current State of the Codebase

What exists and works:
- 74 fully-populated countries with all demographic/political fields
- 68 culture events (regime, ethnicity, caste, LGBTQ, child marriage, rural, wealth)
- 20 technology timeline events (radio 1930s → COVID 2020s)
- 8 education system events (gaokao, colonial language, first-gen university, corporal punishment, etc.)
- 50+ world events covering major 20th–21st century events by country/archetype
- Career era-gating via `minYear`
- Country flag display + "Identity & World" stats card
- `currentCountry` + `residencyStatus` tracked separately from nationality
- Epitaph (DeathScreen) driven by accumulated flags — reads like an obituary
- Prison system with dedicated Prison Life tab, auto-navigation on incarceration
- Parent death wired to `ec_parent_loss` event

What still needs work (priority order):
1. **Immigration activities** in ActivitiesPanel: "Apply for Permanent Residency" (after 5 years on work visa), "Apply for Citizenship" (after 10 years as permanent resident), "Seek Asylum"
2. **Residency consequences**: undocumented characters should face different event gates, health/wealth penalties, risk of deportation events
3. **More career-specific world event intersections**: e.g. a journalist in a military dictatorship faces different career events than one in a democracy
4. **Relationship depth**: friends/partner relationship events beyond the current basics
5. **Late-life events** (`late_life` phase is underserved — retirement, grandchildren, health decline, legacy reflection)

---

## File Map

```
src/
  data/
    countries.js          — 74 countries with full demographic data
    events.js             — root event file, imports and exports EVENTS array
    events_culture.js     — regime/ethnicity/education/LGBTQ events
    events_gender.js      — gender-specific events
    events_historical.js  — historical period events
    events_religion.js    — religion-specific events
    events_technology.js  — technology timeline (era-gated)
    worldEvents.js        — world history events (year+country/archetype gated)
    careers.js            — all career definitions with career-specific events
    crimes.js             — criminal activity system
    activities.js         — activities panel options
    assets.js             — property/vehicle data
    destinations.js       — travel destinations
    illnesses.js          — illness/disease system
    ribbons.js            — end-of-life achievement ribbons
  engine/
    gameEngine.js         — core simulation: buildG, advanceYear, emigrate,
                            generateEpitaph, buildEffectProxy, resolveProxyExtras
    casinoEngine.js
    gangEngine.js
    lotteryEngine.js
  store/
    gameStore.js          — Zustand store, INITIAL_STATE, all actions
  components/
    LifeScreen.jsx        — main game screen (tabs: Life, Stats, Activities, Relationships, Prison)
    ActivitiesPanel.jsx   — activities tab
    BirthScreen.jsx       — character creation
    DeathScreen.jsx       — death/epitaph screen
    EventBox.jsx          — event display component
    TitleScreen.jsx
    StatBar.jsx
    FlagChip.jsx
  utils/
    countryUtils.js       — getCountryFlag, REGIME_LABELS/COLORS, RELIGION_LABELS,
                            RESIDENCY_LABELS
```

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
- `pendingTrial`: `{ crimeName, crimeCategory, sentence, lawyerCosts: { none, mid, top } } | null` — blocks Age Up until resolved
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

**IMPORTANT**: Never use `phase: 'adult'` — it is not a valid phase and will silently prevent events from ever firing.

### Event System

Events live in:
- `src/data/events.js` — base events (1000+ inline) + imports all modules into `EVENTS` export
- `src/data/events_gender.js` — gender-specific events
- `src/data/events_religion.js` — religion-specific events
- `src/data/events_historical.js` — historical period events
- `src/data/events_culture.js` — regime/ethnicity/caste/LGBTQ/education events (68+ events)
- `src/data/events_technology.js` — technology timeline events (20 events, 1930s–2020s)
- `src/data/events_immigration.js` — emigration, residency, integration events
- `src/data/events_career_regime.js` — career × regime intersection events
- `src/data/events_conflict_childhood.js` — conflict zone childhood events
- `src/data/events_lgbtq.js` — LGBTQ identity and rights events
- `src/data/events_mental_health.js` — mental health arc events
- `src/data/events_grief.js` — grief and loss events
- `src/data/events_grief_mental.js` — grief-mental health intersection events
- `src/data/events_religion_arc.js` — faith arc events (crisis, conversion, return)
- `src/data/events_late_life.js` — 35 late-life events (retirement, partner decline, legacy, loneliness)
- `src/data/events_children_arc.js` — 28 events (child milestones, teen years, adult child relationships)
- `src/data/events_fame_karma.js` — 40 events (fame consequences, karma arcs, hobby payoffs, friendship depth)
- `src/data/events_texture.js` — 41 events (rural developing world, pre-1960 era, career peak/decline)
- `src/data/events_society.js` — 42 events (women's rights milestones by country/year, healthcare by archetype, language suppression/identity)

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
`G.character`, `G.stats`, `G.flags`, `G.mem`, `G.age`, `G.currentYear`, `G.career`, `G.partner`, `G.children`, `G.parents`, `G.money`, `G.karma`, `G.fame`, `G.regime`, `G.lgbtqCriminalized`, `G.casteSystem`, `G.childMarriageRisk`, `G.ruralUrban`, `G.ethnicity`, `G.religion`, `G.currentCountry`, `G.residencyStatus`, `G.inPrison`

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

### World Events (`src/data/worldEvents.js`)

93 world events. Fire based on year range + archetype/country match, independent of the normal event queue. Shape:
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

Covers: WWII, Cold War (Berlin Wall, Cuban Missile Crisis, Prague Spring, Polish Solidarity, East Germany Stasi), famines (Holodomor, Great Leap Forward, Ethiopia), economic events (hyperinflation cycles, Japan bubble, Argentina 2001, Celtic Tiger, Korean miracle, Venezuela collapse, Gulf oil boom), national traumas (Troubles, Tiananmen, Apartheid, AIDS crisis), and more.

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

## Current State of the Codebase

### What exists and works

**Core systems:**
- 74 fully-populated countries with all demographic/political fields
- Career era-gating via `minYear`
- Country flag display + "Identity & World" stats card
- `currentCountry` + `residencyStatus` tracked separately from nationality
- Epitaph (DeathScreen) driven by accumulated flags — reads like an obituary
- Prison system with dedicated Prison Life tab, auto-navigation on incarceration
- Parent death wired to `ec_parent_loss` event; `tickPartner()` handles natural partner death at age 75+
- Trial system: `pendingTrial` state blocks Age Up; lawyer tier × legal quality × random = outcome
- Gender markers (♂/♀) next to all people in the Relationships UI
- `G.mem` key-value store for once-per-run event guards (use `p.setMem` / `G.mem?.key`)

**Event coverage (~800+ total events):**
- Base events covering all life phases with hundreds of inline events
- 68 culture events (regime, ethnicity, caste, LGBTQ, child marriage, rural, wealth)
- 20 technology timeline events (radio 1930s → COVID 2020s)
- 35 late-life events: retirement arc, partner decline/dementia/death arc, grandchildren, health decline, legacy reflection, loneliness
- 28 children arc events: school milestones, teen years, adult child relationships, child estrangement/reconciliation
- 40 fame/karma events: fame consequences at different tiers, karma payoffs, hobby payoffs (painting, music, writing, fitness, language, cooking), friendship depth arcs
- 41 texture events: rural developing world, pre-1960 era (rationing, radio, party phone lines), career peak/decline
- 42 society events: women's rights milestones by country/year (voting, credit, contraception, equal pay, divorce), healthcare system by archetype (NHS, US medical debt, Soviet polyclinic, developing world), language suppression and identity (Welsh Not, colonial education, code-switching, language grief)
- 93 world events: Cold War specifics, famines, economic cycles, national traumas

### What still needs work — Priority Roadmap

#### P0 — Broken / Dead-End Mechanics (fix before anything else)

1. **Immigration activity buttons** (`src/components/ActivitiesPanel.jsx`): "Apply for Permanent Residency" (gate: `residencyStatus === 'work_visa'` + 5 years), "Apply for Citizenship" (gate: `residencyStatus === 'permanent_resident'` + 10 years), "Seek Asylum" (gate: conflict/persecuted archetype). Currently the buttons either don't exist or do nothing.

2. **Undocumented residency consequences**: Characters with `residencyStatus === 'undocumented'` or `'tourist_overstay'` face no special pressure. Add: periodic deportation-risk events (`events_immigration.js`), health/wealth drain each tick in `gameEngine.js tick()`, blocked careers in `ActivitiesPanel`.

3. **`pendingTrial` edge case**: If a player dies with `pendingTrial !== null`, the trial is silently dropped. Should be resolved (auto-convicted, or acquitted due to death) when `die()` is called.

#### P1 — High-Value Missing Content

4. **Career × regime intersection events** (`src/data/events_career_regime.js`): Currently sparse. A journalist under a military dictatorship, a teacher under a theocracy, a doctor under a communist state — these are the most specific possible events (person × job × politics) and the file has room for 20–30 more.

5. **Friend lifecycle events**: Friends currently have `relationshipQuality` and names but almost no events that change them outside the fame/karma module. Need: drifting apart, reconnecting after years, friend's divorce/illness/success affecting the player, a friend asking for money, a friend dying.

6. **Romance: post-marriage arc**: `events_romance_arc.js` covers early relationship. Post-marriage needs events: infidelity (choice + consequence), couples therapy, long-haul quiet happiness, caring for a sick partner years before `tickPartner()` fires.

7. **Business: growth and failure arc events** (`src/data/events.js` or new `events_business.js`): Business can be started but its `performance` stat is nearly unaffected by events. Need: key-hire event, losing a major client, hostile acquisition offer, market downturn forcing layoffs.

8. **Mobile money / fintech**: Characters in sub-Saharan Africa (Kenya, Nigeria, Ghana, Tanzania, Uganda) post-2007 should have M-Pesa / mobile money events — skipping the bank era entirely. Gate on `currentCountry` + year range.

#### P2 — Depth and Texture

9. **Sibling relationship events**: Siblings exist in state (`state.siblings[]`) but have almost zero event coverage. A sibling's wedding, estrangement, borrowing money, moving abroad, a sibling's illness in late life.

10. **Education depth**: University/college events are thin. Need: choosing a major, dropping out (with or without regret), academic failure, a professor who mattered, student debt becoming real post-graduation. Gate on `education.type === 'university'`.

11. **Late-life health decisions**: Currently health just declines. Add: elective surgery choice (risk/reward), refusing treatment on principle, experimental treatment for a terminal illness, a diagnosis that reshapes the remaining years.

12. **Retirement money realism**: Retirement fires an event but wealth stat and money don't reflect pension/savings vs. no savings distinction. Add a pension/savings flag earned through career decisions, and a `retired_poor` vs `retired_comfortable` branch in late-life events.

13. **Second-generation immigrant identity events**: Characters born in one country who emigrated and now have children face specific events — child who speaks only the new language, child who doesn't know the homeland, generational tension between old-world values and new-world upbringing. Gate on `flags.includes('emigrated') && children.length > 0`.

#### P3 — Polish and Completeness

14. **Epitaph / DeathScreen gap analysis**: Run a flags audit on `generateEpitaph()` — confirm every major flag arc (generous_legacy, payoff events, rehab_graduate, etc.) has at least one sentence in the epitaph. Several recently-added flags may be missing.

15. **Career events for white-collar careers**: Most professional careers (lawyer, doctor, accountant, engineer) have few or no career-specific events beyond the shared promotion/fired events. Each should have 2–3 events that are specific to what that job actually involves day to day.

16. **`activities.js` cost/availability audit**: Several activities list `gdpTiers` gates but some combinations are unreachable (e.g., activities only available in `very_high` GDP but set to fire only before age 18). Cross-check against real data.

17. **Addiction recovery arc events**: `rehab_graduate` and `in_recovery` flags fire but there are no events that specifically reward or test sobriety over time — a work event where drinking is expected, a years-sober milestone, seeing an old using friend. These are the "so recovery meant something" payoffs.

---

## File Map

```
src/
  data/
    countries.js              — 74 countries with full demographic data
    events.js                 — root event file, imports and exports EVENTS array
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
    events_late_life.js       — 35 late-life events
    events_children_arc.js    — 28 children arc events
    events_fame_karma.js      — 40 fame/karma/hobby/friendship events
    events_texture.js         — 41 rural/pre-1960/career texture events
    events_society.js         — 42 society events (women's rights, healthcare, language)
    worldEvents.js            — 93 world history events (year+country/archetype gated)
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    assets.js                 — property/vehicle data
    destinations.js           — travel destinations
    illnesses.js              — illness/disease system
    ribbons.js                — end-of-life achievement ribbons
  engine/
    gameEngine.js             — core simulation: buildG, advanceYear, emigrate,
                                generateEpitaph, buildEffectProxy, resolveProxyExtras,
                                tickPartner, attemptCrime
    casinoEngine.js
    gangEngine.js
    lotteryEngine.js
  store/
    gameStore.js              — Zustand store, INITIAL_STATE, all actions including
                                resolveTrial, pendingTrial state
  components/
    LifeScreen.jsx            — main game screen (tabs: Life, Stats, Activities, Relationships, Prison)
                                includes trial modal, gender markers on people, prison tab always accessible
    ActivitiesPanel.jsx       — activities tab
    BirthScreen.jsx           — character creation
    DeathScreen.jsx           — death/epitaph screen
    EventBox.jsx              — event display component
    TitleScreen.jsx
    StatBar.jsx
    FlagChip.jsx
  utils/
    countryUtils.js           — getCountryFlag, REGIME_LABELS/COLORS, RELIGION_LABELS,
                                RESIDENCY_LABELS
```

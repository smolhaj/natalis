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
- Trial system: `pendingTrial` state blocks Age Up; lawyer tier × legal quality × random = outcome; clears cleanly on death
- Gender markers (♂/♀) next to all people in the Relationships UI
- `G.mem` key-value store for once-per-run event guards (use `p.setMem` / `G.mem?.key`)
- Undocumented/tourist_overstay residency applies annual health (−2) + happiness (−3) + money (−$200) drain per tick

**Event coverage (~1,200+ total events across 30 modules):**
- Base events covering all life phases with hundreds of inline events
- 68 culture events (regime, ethnicity, caste, LGBTQ, child marriage, rural, wealth)
- 23 technology timeline events (radio 1930s → COVID 2020s + mobile money for East/West Africa, 2007+)
- 41 late-life events: retirement arc, partner decline/dementia/death arc, grandchildren, health decline, legacy reflection, loneliness; **plus** elective surgery, serious diagnosis (with palliative/experimental branches), refusing treatment on principle, pension contribution decision, retired_comfortable milestone
- 28 children arc events: school milestones, teen years, adult child relationships, child estrangement/reconciliation
- 40 fame/karma events: fame consequences at different tiers, karma payoffs, hobby payoffs (painting, music, writing, fitness, language, cooking), friendship depth arcs
- 41 texture events: rural developing world (with country-specific city names), pre-1960 era, career peak/decline
- 42 society events: women's rights milestones by country/year, healthcare by archetype, language suppression/identity
- 102 world events: Cold War specifics, famines, economic cycles, national traumas; **plus** Partition of India, Rwandan genocide (acute + aftermath), post-Apartheid election + pass laws, Yugoslav wars civilian experience, Iranian Revolution street-level, Korean War division, Cultural Revolution China
- 55+ career × regime events: journalist/teacher/soldier/police/civil servant/farmer/artist under authoritarian regimes; plus lawyer ethics, accountant fraud discovery, engineer safety tradeoffs, doctor burnout
- 11 friend lifecycle events: drifting apart, values clash, reconnecting, friend's divorce/success/illness/death, asking for money (`events_friends.js`)
- 10 business arc events: key hire, first big client, acquisition offer, losing a client, market downturn, cashflow crisis, failure and restart (`events_business.js`)
- 12 sibling events: childhood rivalry/alliance, sibling emigrates, wedding, borrowing money, estrangement, late illness, death (`events_siblings.js`)
- 10 university depth events: first week, formative professor, academic failure, dropout decision, scholarship pressure, debt, first-gen, job gap (`events_education_arc.js`)
- 17 post-marriage arc events: infidelity, couples therapy, partner illness (pre-tickPartner), long-haul happiness, separate interests (`events_romance_arc.js`)
- 5 addiction recovery arc events: social drinking test, anniversary, old using friend, rehab graduate speaking, long-term sobriety milestone (`events_consequence.js`)
- 13 second-generation immigrant + refugee resettlement events: child language loss, homeland question, values clash, trip home; **plus** resettlement arrival, housing, first job, language class, contact home, one-year anniversary (`events_immigration.js`)
- 7 adolescence identity events: racial/gender discrimination, religious doubt vs. family, talent discovery, defining friendship, betrayal, political awakening under authoritarianism, body image (`events_adolescence.js`)
- 8 fertility depth events: miscarriage, late miscarriage, IVF consideration/outcome, traditional remedy, choosing childlessness, being questioned about it, late pregnancy complications (`events_fertility.js`)
- 12 career late-arc + wealth gap + rural-to-urban events: senior room moment, defining case, protégé payoff, 20-year reflection; family approach for money, philanthropy, wealth isolation, estate planning; city arrival, accommodation, village network loss, family crisis pull (`events_career_wealth.js`)
- 10 wealthy_gulf and wealthy_east events: Gulf oil boom childhood, Saudi female navigation, foreign worker observation, Hajj proximity, reform wave; Japan company culture and bubble burst; Korean exam pressure and military service; Singapore/Taiwan meritocracy (`events_gulf_east.js`)
- 5 grief follow-up events: parent house-clearing, first holiday without parent, inheritance conflict, friend death follow-up, sibling death follow-up (`events_grief.js`)

### What still needs work — Priority Roadmap

*Items 1–16 from the previous roadmap are complete. See git history for details.*

#### P0 — Broken / Dead-End Mechanics

1. **`activities.js` cost/availability audit**: Several activities list `gdpTiers` gates but some combinations are unreachable (e.g., activities only available in `very_high` GDP but set to fire only before age 18). Cross-check against real country data.

2. **Event deduplication guard audit**: Some event modules use `G.mem?.key` (optional chaining) while others use `G.mem.key` (which throws if `mem` is undefined). Audit all event `when` guards for consistent `G.mem?.key` usage.

#### P1 — High-Value Missing Content

3. **Country-specific event prose audit**: Scan all event text for hardcoded geography (country names, city names, institution names) that assumes a specific locale and convert them to dynamic lookups or split into country-specific variants. `events_texture.js` city-name lookup is the model.

4. **Early childhood depth** (ages 0–5): This phase is thin — a few warmth/loss events. Add: first day of school (massive in many cultures), being the child of an immigrant, early illness, a specific memory that recurs. These form the emotional bedrock.

5. **Post-Soviet arc events**: `post_soviet` archetype countries (Russia, Ukraine, Poland, Czech Republic, Hungary, Romania, etc.) have no dedicated coverage for the 1990s transition — hyperinflation, privatization, the specific disorientation of a system that promised certainty collapsing overnight.

6. **India-specific depth**: The largest democracy in the world, with 1.4B people, gets generic `developing_urban` events plus caste coverage. Missing: the specific texture of Indian middle-class aspiration (engineering/medicine track), arranged marriage negotiation, joint family dynamics, regional language vs. Hindi vs. English identity conflict.

7. **Late-life relationship repair arc**: Characters who have estranged children, a long-damaged sibling relationship, or a never-resolved falling-out have no mechanism for attempted reconciliation in their 60s–70s. This is one of the most human late-life experiences and currently has no event path.

8. **Death of a child**: The `lost_child` flag exists and shows in the epitaph, but there are no events around it — the death itself, the aftermath, the way it changes a marriage. The hardest subject in the game and the most important to handle with care.

#### P2 — Depth and Texture

9. **Ribbons audit**: Cross-check all flags set by new event modules (adolescence, fertility, career_wealth, gulf_east, resettlement arc) against `ribbons.js` — several new arc-completion flags likely have no ribbon.

10. **`events_romance_arc.js` — early relationship events**: The romance arc jumps quickly to marriage/infidelity. Missing: the first serious relationship that doesn't lead to marriage, living together before marriage (culturally gated), a long-distance relationship that fails, choosing a partner your family disapproves of.

11. **Latin America archetype depth**: Brazil, Mexico, Colombia, Argentina are categorized as `developing_urban` but have no events that couldn't fire in any developing urban country. Missing: evangelical church rise (Brazil), cartel-adjacent daily life (Mexico/Colombia), economic volatility (Argentina's recurring crises), football as national religion.

12. **Health system events by archetype**: Characters in countries with universal healthcare vs. pay-per-visit vs. nothing experience illness very differently. The illness system fires but the financial/systemic context is absent — a cancer diagnosis in the UK is structurally different from the same diagnosis in the US or Nigeria.

#### P3 — Polish and Completeness

13. **Life log readability**: The life log entries are functional but sometimes terse and mechanical. A pass through the log generation in `gameEngine.js` to improve prose quality for key moments (promotion, marriage, having a child, death of parent) would make the life summary screen more moving.

14. **`careers.js` field coverage audit**: Several career fields (`arts`, `sports`, `academia`, `hospitality`) have 1–2 events. A 20-year career in sports should have arc events: the injury that ended it, the transition out, the identity work of no longer being an athlete.

15. **BirthScreen character creation depth**: The birth screen creates the character but the player has no agency in choosing family situation, religion beyond country-default, or urban/rural origin. Optional choices here would let players build more specific starting conditions.

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
    events_texture.js         — 41 rural/pre-1960/career texture events (city names dynamic per country)
    events_society.js         — 42 society events (women's rights, healthcare, language)
    events_friends.js         — 11 friend lifecycle events (drift, reconnect, illness, death, money)
    events_business.js        — 10 business arc events (growth, setbacks, acquisition, failure)
    events_siblings.js        — 12 sibling events (rivalry, emigration, estrangement, late death)
    events_education_arc.js   — 10 university depth events (failure, dropout, debt, first-gen)
    events_adolescence.js     — 7 adolescence identity events (discrimination, faith doubt, talent, friendship, betrayal, politics, body)
    events_fertility.js       — 8 fertility depth events (miscarriage, IVF, childlessness, late pregnancy)
    events_career_wealth.js   — 12 career late-arc + wealth gap + rural-to-urban events
    events_gulf_east.js       — 10 wealthy_gulf and wealthy_east specific events
    worldEvents.js            — 102 world history events (year+country/archetype gated)
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

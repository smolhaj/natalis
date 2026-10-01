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

### Life Phases (`src/engine/character.js: getPhase`)

```
early_childhood  ≤ 5
childhood        6–11
adolescence      12–17
young_adult      18–29
midlife          30–49
late_life        50+
```

**IMPORTANT**: Never use `phase: 'adult'` — it is not a valid phase and will silently prevent events from ever firing.

### Modes (`state.mode`)

Every run is either **active** ("Inhabit") or **passive** ("Witness"), chosen on the
title screen and fixed for that life. Same simulation, same content, same event
pool — only the surface differs.

- **active** — the player answers choice events, spends the yearly action budget,
  takes careers and risks. The activities panel, crime and minigames are present.
- **passive** — the life goes as it goes. Choice events still fire, but the
  *character* answers them (`pickChoiceAutomatically` in `tick.js`, which weights
  the options by stats, desire and regime rather than picking uniformly), and the
  year resolves in one beat. The activities panel, action budget and crime
  surface are hidden; the only verb is Age Up.

`pickChoiceAutomatically` weighs the character's **disposition** — what they have already done — so later answers lean toward earlier ones, and a life reads as one person rather than a sequence of coin flips. Choices may declare `tag: 'defiant' | 'yielding'`; inferring it from the prose gets the hardest cases backwards, since "Say nothing at all" under interrogation is the defiant answer. Measured by calling the scorer directly (whole lives are far too noisy an instrument for this): no history 40% defiant, one defiant act 56%, three 93%; one yielding act 28%, three 4%.

Passive mode is the purest expression of the Sonder Principle, and it is also a
correctness contract: a life that nobody steers must still reach a plausible age
and a full arc. If passive medians drift, the simulation is wrong, not the mode.

### Event Selection (`src/engine/tick.js: getNextEvent`)

The corpus is ~9,000 events (exact counts: `npm run stats`), about a quarter of them universal contemplative
observations with very broad guards. Drawing from one flat weighted pool let that
layer take ~70% of every life while the country-, era- and identity-specific
events written around it fired a handful of times per *hundred* lives — the exact
inversion of "specificity over coverage".

Selection therefore draws a **register** first, then an event within it. Every
event is classified once, lazily, in `src/data/events.js`:

- `event.contemplative` — set by SOURCE MODULE (the 66 `events/sonder/*` files),
  never by id prefix. The id convention drifted across those modules
  (`sonder_`, `sonder12_`, `sdr30_`, `s14_`, `son15_`, `mundane_`), so the old
  `startsWith('sonder_')` test missed 46% of the pool.
- `event.register` — `anchored` (guard reads place, era or identity), `earned`
  (guard reads what has already happened to this character), `universal`, or
  `contemplative`. Derived from the guard's own source text.
- `event.anchored` — place/era-keyed, including inside the contemplative layer,
  where it earns a 3× weight so quiet years stay grounded in a real place.
- `event.isGlimpse` — stranger glimpses, scheduled on their own ~decade cadence
  instead of competing for weight against 8,000 other events.

`REGISTER_SHARES` reserves a share of every year for each register, so adding
content to one register can never statistically bury another. Contemplative
events are additionally rate-limited to one every `CONTEMPLATIVE_COOLDOWN` years.

**When you add events, add them to a register that is thin, not one that is
already full.** Run `npm run sim` (or `tests/zsim.test.js`) to see the live mix.

### Event System

Events live in ~500 modules under `src/data/events/`. `docs/source-tree.md` describes each module in a line.

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
`G.character`, `G.stats`, `G.flags`, `G.mem`, `G.age`, `G.currentYear`, `G.career`, `G.partner`, `G.children`, `G.parents`, `G.money`, `G.karma`, `G.fame`, `G.regime`, `G.lgbtqCriminalized`, `G.casteSystem`, `G.childMarriageRisk`, `G.ruralUrban`, `G.ethnicity`, `G.religion`, `G.currentCountry`, `G.residencyStatus`, `G.inPrison`, `G.place` (current place object from places.js, or null), `G.desire` (character's core formative desire), `G.political_leaning`, `G.conditions` (array of active chronic conditions), `G.currentProject` (active slow-burn project object, or null), `G.conflictRisk` (war intensity where the character lives, THIS year — never read `country.conflictRisk`), `G.hasGrandchildren`, `G.healthcare` (the health system where the character lives, THIS year, from `healthcareAt` — never read `country.healthcare`), `G.retirementAge` (the age this character can retire at, or **null** where there is no pension system to be inside — a smallholder does not retire)

Effect proxy shorthands (all are additive deltas):
- `p.m` → happiness, `p.h` → health, `p.e` → smarts, `p.s` → charisma, `p.w` → wealth stat, `p.lo` → looks
- `p.mo` → money (absolute dollars), `p.karma` → karma, `p.r` → regret
- `p.addFlag('flag_name')` — adds to flags array
- `p.setMem('key', value)` — stores value in `state.mem` (use for once-per-run guards)
- `p.killParent('father'|'mother')` — marks parent dead
- `p.killPartner()` — removes partner, sets widowed flag
- `p.killChild(idx?)` — marks a child dead (`alive: false`, `deathYear`); no index = youngest living, `'eldest'` = eldest living. Never narrate a death without it.
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

World events fire based on year range + archetype/country match, independent of the normal event queue. Shape:
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

The Second World War is NOT a world event; it lives in country modules
(`events_germany_reich.js`, `events_japan_war.js`, `events_soviet_1929.js`,
`events_second_world_war.js` for Poland, China, the Philippines, Yugoslavia,
Indonesia and Korea, and scattered UK/France/Netherlands content).
Covers: Cold War (Berlin Wall, Cuban Missile Crisis, Prague Spring, Polish Solidarity, East Germany Stasi), famines (Holodomor, Great Leap Forward, Ethiopia), economic events (hyperinflation cycles, Japan bubble, Argentina 2001, Celtic Tiger, Korean miracle, Venezuela collapse, Gulf oil boom), national traumas (Troubles, Tiananmen, Apartheid, AIDS crisis), and more.

### Country Data (`src/data/countries.js`)

Every country (154 on the roster) has:
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

### Partner Lifecycle (`src/engine/tick.js: tickPartner`)

Called each year via `advanceYear`. Partner ages +1/year and `partner.years`
increments. On death: partner kept on state as `{alive: false}` (so
`G.deceasedPartner` can speak and `G.partner` cannot), `widowed` or
`lost_partner` set, the death logged. Relationship quality drifts ±1 per year.

**The death hazard follows the country, not a rich-world table.** It started at
65 everywhere, so nobody in a 1962 Nigerian or 1974 Ethiopian life could be
widowed before their partner's sixties, in countries whose life expectancy at
the time was in the forties — and a widow of thirty-eight with children at home
and no pension is the commonest shape the loss took in most of the world for
most of this period. The onset and the steep band now shift with
`lifeExpectancy`. Measured over 70 lives per country: median age at widowhood
Nigeria 56, India 60, Ethiopia 64, Germany 74, Japan and Sweden 78. The young
arc (`grief_widowed_young_*`) is about the arithmetic; the existing late arc is
about the shape of the days, and they are not the same event.

Note: this function was a no-op for every partner in the game until August 2026. It bailed on `!state.partner.alive`, and no partner was ever constructed with an `alive` field — so partners never aged, never died, quality never drifted, and `partner.years` (which gates marriage timing and the partner-moments memory layer) stayed at 0 forever. The guard is now `alive === false`, so a partner from an older save counts as alive.

### Life Course (`src/engine/lifeCourse.js`)

Work, a partner, a marriage, children, retirement. Every one of these was a button in a panel and nothing else, so a life nobody steered reached sixty-five having never held a job, married anyone or had a child — which also starved the `earned` register and the entire follow-through layer, both written about a partner, a child, a job.

`tickLifeCourse(state)` runs each year from `tick()` and supplies these by default. **Every hook is a no-op if the player has already filled that slot**: it is a default, not a policy.

The demography is anchored to the historical record, not invented, and interpolated between anchor years:

- `femaleWorkChance(country, year)` — female labour force participation by archetype, modulated by the country's own female-to-male literacy ratio. Near 60% in sub-Saharan Africa for the whole period; near 5% in the Gulf in 1950.
- `workEntryAge(state)` — a subsistence question, not a policy one: GDP tier, urban share, era, and schooling already completed.
- `marriageAge(state)` — archetype medians with a regional male-female gap, modulated by urbanisation, schooling and female literacy. The literacy term is **one-sided** (it pulls early, never late) because the rich-world tables were calibrated on high-literacy populations already.
- `totalFertility(state)` — archetype TFR, with `TFR_BY_COUNTRY` overrides for the countries whose fertility history diverges sharply from their archetype (Egypt and Brazil are both `developing_urban` and a full child apart).
- `retirementAge(state)` — returns `null` where there is no pension system to be inside; a smallholder does not retire, and gets prose about the work redistributing itself instead.
- `chooseCareer(state)` — `getAvailableCareers` answers "is this legal for this character", which is not "is this what someone like this does". Weighted by field against rural-poor / urban-poor / urban-rich columns, so a 1974 Ethiopian villager does not become a dog walker.
- `secondaryChance(state)` / `primaryChance(state)` — whether this character finishes school, resolved at 16 against the country's literacy read for the character's own gender, scaled by era (those literacy figures are a modern snapshot applied to mid-century births), rural share, GDP tier and working-young. The engine used to grant secondary education to everyone who had not explicitly dropped out: 95% completion for a 1962 Nigerian cohort against a real 10%, 98% for a 1974 Ethiopian one against 6%. Schooling decides work, marriage age, fertility, money and half the corpus's guards, so this is the most load-bearing number in the module.
- `ownershipChance(state)` — home ownership by archetype and year, with `OWNERSHIP_BY_COUNTRY` for the figures the archetype cannot predict (Germany 47%, Switzerland 40%, Singapore's HDB 89%, Romania 95%). Two acquisition paths, because there are two worlds: a financed purchase where there is a mortgage market and a deposit, and everywhere else — family land, a self-build, an allocated flat. Pricing the second as a purchase would have excluded most of the world for most of the period. Post-Soviet mass privatisation is an **event**, not a hazard: modelled as a lifetime rate it gave Russia 55% against a real 85%, because it was a decree that moved a country in four years.

Measured against the record (`tests/demography.test.js`, which fails if this drifts):

| | median marriage age | real | completed fertility | real TFR |
|---|---|---|---|---|
| Nigeria 1962 | 20 | 21 | 6.3 | 6.3 |
| India 1975 | 22 | 21 | 3.0 | 2.8 |
| Egypt 1990 | 23 | 24 | 3.4 | 3.2 |
| Brazil 1995 | 25 | 25 | 2.0 | 1.7 |
| United States 1950 | 24 | 23 | 1.7 | 1.9 |
| Germany 1970 | 30 | 29 | 1.4 | 1.4 |
| Japan 1980 | 29 | 30 | 1.0 | 1.35 |

And attainment, which is the fork the rest of it hangs off (`secondary completion`, real in brackets): Nigeria 1962 2-20% (10%), Ethiopia 1974 0-2% (6%), India 1975 18-23% (30%), Brazil 1995 64-74% (60%), United States 1950 92-97% (80%), Germany 1970 94-96% (85%), Japan 1980 94-99% (95%). Asserted as an **ordering and wide bands**, never as point estimates: a 10% rate over 20 lives has a confidence interval most of that wide, and two consecutive runs of identical code gave 20% and 2%.

### Prison and political arrest (`src/data/events/prison/`)

Prison had exactly one entrance — `attemptCrime`, a player action behind the crime panel, which passive mode does not render — so a character could only go inside by choosing to commit a crime. In a corpus carrying the Stasi, SAVAK, Camp Boiro, the ghost houses and the gulag, nobody could be arrested for anything they said, and all 32 authored prison and post-release events fired **zero** times across 5,436 simulated lives.

`p.imprison(years, { political, charge })` is the missing counterpart to the `p.releaseFromPrison` that already existed. `events_political_prison.js` is eight ways in, each gated on the regime the character is living under *that year* and most gated further on something they have already done, so the arrest lands as consequence rather than dice roll. Measured at ~8% of lives ever imprisoned across ten severe regimes; the first pass produced 21%, which is far too high for a lifetime rate.

### Specificity weighting (`guardSpecificity` in `src/data/events.js`)

The register system reserves 40% of each year for `anchored` events, but inside that bucket a guard reading only "you are in India" competed on equal terms with one reading "you are a Dalit girl in rural India between 1980 and 1995" — and lost, because there are hundreds of the former. Events now score how many independent things their guard demands (a named place, who you are, gendered experience, a dated window, where within the place), and satisfying a four- or five-dimension guard carries weight, because reaching that character is the whole reason it was written.

### The identity-in-country audit (`npm run check-events`)

The enum audit checks ethnicity and religion literals against the **global** set of ids, which is the right question for a guard naming no country and the wrong one for a guard that does. `dalit` is a real id in India, so a guard requiring Nepal *and* `dalit` passed the audit and could never fire, because Nepal's id is `dalit_nepal`. The cross audit found ten such events, including two that were demographic errors rather than typos: Brazil and Nigeria had no `christian_pentecostal`, in the two countries where that church is largest.

---

### The prose layer (`src/engine/yearTexture.js`, `mundaneLayer.js`, `prose.js`)

Two systems narrate a quiet year, and they are picked in this order:

`buildYearTexture(state, { specificOnly: true })` collects every line the
character is eligible for and returns one, by tier:

| tier | what it is | share |
|---|---|---|
| `urgent` | grief, a child in a ward, a body in crisis | wins ~72% when live |
| `glimpse` | the stranger glimpse, which carries its own ~decade cadence | wins when due |
| `anchored` | place, era, identity — 1,506 of the 2,075 offer sites | 0.46 |
| `earned` | keyed to what has already happened to this life | 0.39 |
| `universal` | the phase pools and the final fallback | 0.15 |

`textureCandidates` is the generator holding the guards; `buildYearTexture` is
the driver. A guard yields `[tier, line]` or `[tier, [variant, variant, ...]]` —
a variant pool counts as **one** candidate, so a block with thirty alternatives
cannot outvote a country block with one, it just has thirty ways to say its turn.
`opts.specificOnly` drops the `universal` tier, which is how the caller asks
"does anything specific want to speak about *this* life this year" and lets
`buildMundaneLayer` fill the year when the answer is no.

`prose.js` keeps the hashed record of what this character has already been told.
Both layers prefer an unheard line. Grief is exempt from the exhaustion rule
because a feeling that recurs is supposed to recur — but capped, because in the
same words every year it reads as a broken loop.

**When you add texture, pick the tier deliberately and yield to it.** The tier is
a literal in the `yield`, not something derived from the section heading. Adding
to a full tier buries the existing content in it; run `npm run sim` to see the
live mix, and `npm run sim -- --broad` to see it across the whole roster, since
the ten default configurations cannot reach the other 144 countries' blocks at
all.

**Flags never clear, so present-tense prose behind a permanent flag never stops.**
`cancer_treatment` is set in the same breath as `cancer_survivor`, and the
active-treatment block told a character treated at 45 that "treatment continues,
you measure time in appointments now" every eligible year until death. Any block
whose prose is present-tense needs a time bound — the flag's own
`mem.[flag]Year`, or an elapsed-years variable — not just the flag.

### Climate and season (`seasonsFor`, `deriveSeason` in `src/data/climate.js`)

A country returns either `dry`/`wet` (monsoon and tropical) or the four temperate
seasons. `MONSOON_COUNTRIES` lives in `src/data/climate.js` and `_sonderGuards.js`
imports it, because two copies of this list existed and disagreed: the engine's
omitted India, Pakistan, Sri Lanka, Nepal and Malaysia, so every guard reading
`season === 'wet'` for the subcontinent was unsatisfiable and the monsoon prose
could not fire in the largest monsoon country on earth. `npm run check-events`
carries a `season-country` audit for both the fully unsatisfiable guard and the
partial case — a guard naming twelve countries where four can never match it,
which fires happily for the other eight while a slice of its audience never sees
it.

## The Simulation Contract

Rules the engine must keep, each of which was broken and is now enforced by
`tests/` and by simulation:

**Health is not a ratchet.** `healthCeiling(state)` sets a plateau from age, the
healthcare of the country the character *actually lives in*, fitness and chronic
conditions; health drifts toward it each year. A shock still hurts and a chronic
condition still lowers the plateau permanently, but a life nobody intervenes in
does not walk to zero. Before this, a passively-read 1962 Nigerian life had a
median death age of **8**; a Nigerian who survives childhood now reaches a median of
43-51, against a 20-33% under-5 rate — both wide, because a median taken from
forty lives of a distribution this heavy-tailed moves by ten years between
samples. The instrument is the constraint, not the engine: the same code
measured at n=150 gives a survivor median of 51 and an oldest of 82.

**Where you live is where you live.** `liveCountry(state)` — not the frozen
birth country — drives salary, promotion pay, healthcare mortality, illness risk,
the poverty premium, career availability and which world events reach you.
Emigration used to change the prose and nothing else. A world event may set
`followsEmigrant: true` to reach the diaspora as news from home.

**An unsteered life is still a life.** `tickLifeCourse` supplies work, partnering, marriage, children and retirement at era- and place-accurate rates, stepping aside wherever the player has acted. Before it, over 150 unsteered lives: 7% ever had a career, 4% ever had a partner, 0% ever married, 1% ever had children. After: 98%, 100%, 82%, and fertility matching the record country by country.

**Authored content must be reachable, and reachable is measured.** Static audits ask whether a guard *could* pass; only running the engine answers whether it *does*. A census over 5,436 lives spanning every country found a third of the corpus never firing, of which the genuinely broken part was: identity literals naming a population the required country does not have, 493 events whose declared phase silently overruled their own age guard, and a prison arc with no entrance. `npm run check-events` now carries the first, `tests/phaseReachability.test.js` the second.

**Prose layers are layers, not fallbacks.** `buildYearTexture` is called every
year with `{ specificOnly: true }`: it speaks when the memory, grief, condition,
project, place or season layers have something specific to say about *this* life,
and `buildMundaneLayer` fills the years when they do not. It used to be reachable
only when the event pool came back empty — which, with ~2,000 broadly-guarded
contemplative events, meant ~2% of years.

**A sentence must be true of the world it is printed into.** `src/data/technology.js`
answers when a thing arrived where the character lives, and whether the country
was materially rich that year — because `isWealthyArch` is a statement about
*now*. Read as history it put a hallway telephone, a weekly cinema trip and a
folded newspaper into a 1931 Omani household (three schools in the country, ten
kilometres of paved road, oil not exported until 1967), and a television into an
Icelandic living room twenty-two years before Icelandic broadcasting existed.
`src/data/history.js` carries the rest of what a guard cannot infer: independence
years, coup years, the Soviet republics, malaria elimination dates, which
countries have rivers, which taught school in a coloniser's language, and
`INSTITUTIONS_SUSPENDED` — the years a country stopped having schools, wages,
money, clinics, the post or cities at all. `npm run check-anachronisms` plays
lives and reads every printed line against that table.

**A character must be a person who could exist.** Ethnicity and religion were two
independent draws, so the engine made Lhotshampa who were 67% Buddhist (they ARE
Bhutan's Hindu population, which is the whole reason for the 1990 expulsions),
Catholic Bosniaks, Muslim Dalits and Sunni Copts — and every guard reading both
together was silently failing for part of its own population. `src/data/identity.js`
gives the conditional distribution for the 473 groups where the two are
entangled and defers to the country marginal for everyone else;
`impliedMarginal()` holds the result to the declared `religionWeights`, within
10 points for all 154 countries. Names are drawn once per life through
`src/engine/names.js`, because ten independent `pickFrom` calls across four files
gave 13% of families two members with the same first name.

**A stat that only goes up is not a stat.** Health drifts toward a ceiling and
money, karma and fame all have events that take them away; smarts and charisma
had neither, so a hundred events adding +3 here and +6 there walked both to 100
in any life long enough to contain them — smarts had a median of 96 at death and
58% of characters ended at 90 or above, which makes "Brilliant" a description of
nearly everyone and opens every `stats.smarts >= 70` guard to the whole
population. `earnedGain` scales a gain by the headroom above it and never scales
a loss.

**A bill you cannot pay does not stop existing.** `Math.max(0, ...)` on the
balance meant no purchase in the game could fail for lack of funds — a Swedish
pensioner holding $42,571 was offered a $63,859 bypass, took it, and the
shortfall evaporated — and `tickAssets` clamped it a second time while still
amortising the mortgage, so a character on nothing watched the principal fall
from 73,466 to 55,206 over six years. A shortfall large enough to matter now
becomes `debt`, and an unpaid mortgage goes into arrears rather than paying
itself off. Related: consumption was a share of the SALARY, so being alive cost
a retiree nothing; the poverty premium read the cash balance, so a retiree in a
house worth 934,534 was charged for poverty; and the insolvency line was a flat
-8,000 nominal, a fortune in 1950 Lagos and a bad month in 2020 Stockholm.

**A guard answers "may this fire", not "is this true afterwards".**
`ya_city_arrival` narrated a young adult leaving the village and left them in
it; eighty-three events set `emigrated` and not one could change a country,
because `relocate` did not carry the destination's own country and there was no
verb for "they went to Spain". `p.emigrateTo(country, opts)` is that verb, and
`relocate` now carries the country, so the Venezuelan physician who arranges the
exit stops drawing a Venezuelan salary. `npm run check-events` carries
`narrated-move` and `silent-choice` for both halves of this: prose that
describes a move no effect makes, and a choice that applies an effect and
prints nothing back — fifty-one of those existed, so the player pressed
"Navigate carefully — know the rules and survive" and the game said nothing.

**A flag about the past is not a statement about now.** `poverty_childhood`
gated "You did not eat lunch for three days" onto a character earning 71,991
with 25,161 in the bank; `character.ruralUrban` is frozen at birth and every
prose layer read it directly, so a character who moved to Jakarta at 26 was
still collecting firewood at 53. `livingRuralUrban(state)` reads
`currentPlace.type` and falls back to birth, and the events that describe a
present condition test the present one. Same class: a negative field list let
"a union representative finds you during the break — someone you recognise from
the floor" reach an Agency Director at a property agency, and `content_creator`
shared the `media` field with `journalist`, so a TikTok influencer got the
editor's office, the ministry call, and an epitaph reading "She worked in
journalism and learned what it costs to tell the truth."

**The instrument must be able to see the thing it measures.** Passive mode
resolves choice events inside `tick()`, so `pendingEvent` is never set for them,
and the firing-rate harness — which counted events by reading it — reported
passive at 52% of years containing an event against active's 98%, with zero
choice events in the one mode whose entire design is that the character answers
them. Both resolution paths now stamp the event id onto the log entry.

**A prose layer's line ordering must not be its priority order.** `yearTexture.js`
was one 15,104-line function of 2,035 sequential `if (guard) return pick([...])`
statements, so file position *was* priority: grief at line 20, the body-in-time
bands (which fire for everyone at 38/42/46/52/70) at line 520, Afghanistan at
12,564 behind ~1,800 earlier guards. 9.3% of the 7,588 authored lines ever
reached a player; Peru's 47 fired **zero** times across 3,253 Peruvian years, and
so did the monsoon texture across 3,382 Indian ones. Guards now OFFER rather than
return — `textureCandidates` is a generator yielding `[tier, line]` and
`buildYearTexture` picks by tier (`urgent`, `glimpse`, `anchored`, `earned`,
`universal`, mirroring `REGISTER_SHARES`). See **The prose layer** below.

**A life must not repeat itself.** 15.6% of all prose a character read was a
sentence they had already read in the same life, and one life heard the same line
fourteen times — in a game whose stated mechanic is the sentence that lands.
`src/engine/prose.js` keeps a hashed, capped record in `mem.saidLines`; both prose
layers prefer an unheard line, and an exhausted tier says nothing rather than
repeating, letting `buildMundaneLayer` narrate an ordinary year instead. Now
0.2%, median life 0.0%.

## The Immersion Principle

When adding anything — events, world events, career events, country data — ask:

1. **Time-accurate**: Would this exist in the year the player is experiencing it?
2. **Place-accurate**: Is this specific to this country/archetype, or is it generic?
3. **Perspective-accurate**: Is this told from the character's lived position (poor/rich, majority/minority, rural/urban, man/woman in that society)?
4. **Consequential**: Does it connect to real data fields (`lgbtqCriminalized`, `regime`, `literacyFemale`, `childMarriageRisk`, `casteSystem`, `ruralUrban`, `wealthTier`)?

Generic events are a last resort. Specific events — ones that could only fire for a Dalit woman in India in 1975, or a Chinese teenager during the Cultural Revolution, or a Nigerian kid skipping the landline era for mobile money — are the goal.

---

## The Interface

CLAUDE.md said "literary, not gamey", "invisible systems", "no +5 Happiness!
framing" and "the prose is the mechanic" — and had no guidance about the
interface at all, which is why the interface spent two years contradicting all
four. The theme config described itself as "BitLife-inspired". Choice buttons
were hardcoded gradients by index (blue, then green, then orange), so the colour
told the player which answer was right in a game whose premise is that there
isn't one. The title screen said **"Your choices shape everything"** directly
under "You don't choose where you begin."

The rules that follow from the design document:

**Paper and ink.** One warm neutral ramp (`natalis-bg` → `natalis-faint`), one
reserved accent (`natalis-accent`) for things that respond to a press. Saturation
is reserved for the two places it carries real information: a body in trouble
(`natalis-alarm`, health under 25) and money moving (`natalis-gain`/`-loss`).
Tailwind's default scales are **remapped** in `tailwind.config.js` to the same
muted ramp, so a component reaching for `bg-blue-50` cannot reintroduce the candy
palette.

**No option may look more correct than another.** Choices are identical
buttons. No gradient, no colour coding, no ordering cue. The sentence is the
only signal.

**The prose gets the top of the screen and the largest type.** It is set in
`font-prose` at `text-prose-lg`. Stats are a hairline row with the WORD leading
and the number trailing — "Declining 39", not a red bar. The full six live in
the Stats tab for anyone who wants them.

**No emoji in the reading surface.** The event card, the life log and the
identity card are prose and stay prose; typographic labels do the work markers
used to ("AGE 11 · 1950 · IN THE NEWS"). The activities panel keeps its category
icons, which are wayfinding in a utility screen rather than decoration in a
narrative one.

**No gradients on controls, and no counts typed by hand.** The title screen's
figures are derived from `COUNTRIES`, `CAREERS` and `RIBBONS`; the hardcoded
version had drifted to 145/59/379 against a real 154/49/377.

**Copy must not overclaim the player's agency.** `tickLifeCourse` supplies work,
a partner, a marriage and children at era- and place-accurate rates precisely
because a life nobody steers is still a life, and passive mode exists to prove
it. Interface copy that promises otherwise is contradicting the engine.

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

Counts are generated, never typed: `npm run stats` prints them and writes
`docs/stats.md`. The history of how the engine got here — every pass, what it
found, and the measurements — is in `docs/history.md`; the full per-module
source tree is in `docs/source-tree.md`.

Verify with:

```
npm run build            # must pass
npm test                 # 432 tests, including the simulation guardrails
npm run test:fast        # unit + static audits, seconds not minutes
npm run test:sim         # the slow guardrails: register mix, prose coverage, demography
npm run check-flags      # 3434 covered / 0 partial / 0 orphaned
npm run check-events     # reachability: dead guards, enum domains, phase/year windows,
                         # season/country, silent choices, narrated moves that move nobody,
                         # populations the roster models that the corpus never addresses
npm run check-anachronisms  # plays lives and reads every line against when the world held it
npm run check-prose      # tics, long bodies and exclamation marks per module, as a ratchet
                         # (--strict for new modules)
npm run check-bundle     # builds, opens dist in a browser, starts a life — the only
                         # check that exercises the artefact rather than the source
npm run check-ui         # plays the built game in a browser at 390-1280px and checks the
                         # screen against the state (save/load, dead partner, prices, choices)
npm run check-reach      # conditional reach: for a character who IS the person a body of
                         # work was written for, how much of it ever reaches them
npm run sim              # firing-rate report — what ACTUALLY fires, per 100 lives
npm run sim -- --broad   # the same over the whole roster, not the ten default configurations
```

`npm run sim` reports three things no static audit can see: the register mix, the
share of each **prose layer** a player actually reads (with `concentration` — how
many distinct lines supply half of all output), and **within-life repetition**.

**The prose-coverage figure is a function of the sample size, and a bare number
for it is not checkable.** The same code reports yearTexture at 8.2% over the
default 120 lives and 13.7% over 600, because a life only lives so many years
and the layer holds 8,126 lines. Quote it with the `--lives` it was taken at or
it cannot be reproduced, and compare runs only at equal n. The number that does
not move with sample size, and is therefore the one to watch, is
**concentration**: about 160 lines supply half of all texture output at both
sizes, which is the real statement about how much of the layer is doing the
work.
The ten default configurations cannot reach 144 countries' content at all, so a
coverage number taken over them understates the place-anchored layers by
construction; `--broad` is the honest read.


## Lessons (each one cost a pass to learn — details in docs/history.md)

- **Measure what fires, not what exists.** Static audits ask whether a guard
  *could* pass; only running the engine (`npm run sim`) says whether it does.
- **A guard answers "may this fire", not "is this true".** Content can be
  reachable, correctly guarded and wrong about the world.
- **Read the log in order.** A log line is a claim about the state; read whole
  lives (`scripts/play.mjs`) the way a player does.
- **A population the data models and the corpus never addresses** looks exactly
  like a rare one. Walk the roster's own `ethnicGroups` (`unwritten-group`).
- **An audit that reports false positives has failed the same way as one that
  reports none**, and **an audit that cannot fail is not an audit.**
- **Fix the predicate, not its callers** — and **when you fix a rule, grep for
  every reader of it.** `isWealthyArch`, `conflictRisk` and `healthcare` were
  each "a statement about now" read as history.
- **A category is not a fact.** `conflict_zone` is not "at war this year",
  `subsaharan` is not a cuisine or a church. Read the fact (`G.conflictRisk`,
  the live region, the religion, `COUP_YEARS`, `hasTech`).
- **Test the artefact, not only the source.** The bundle shipped a blank page,
  and later shipped minified guards the classifier could not read — which is
  why classification is now a generated index (`npm run build-event-index`).
- **Play the mode the player plays.** Passive lives exercise the simulation;
  they do not touch a single button.
- **A small number has two causes and only one is a bug.** `npm run check-reach`
  asks the conditional question `sim` cannot.
- **A module can be correct and still be for somebody else** — written for a
  cohort, place or group the engine rarely draws. Check reach by cohort.
- **Content for a group has to be read inside a life of that group**, because
  that is the only place the generic content's assumptions show.
- **Thresholds are instruments.** Assert the contract at the sample size you
  actually take; a test that fails at random teaches people to ignore it. Tests
  run on a seeded `Math.random` (`tests/setup/seed.js`; `NATALIS_SEED=n` for
  another draw, `off` for the platform one), so a red run reproduces.
- **Death is a fact about the state.** Children, parents and siblings die on
  country-and-year rates (`under5At`, `adultHazard`, `warDeathHazard` in
  history.js), and the engine narrates it. An event that narrates a death
  must make it (`killChild`, `killParent`, `killPartner`) or read one that
  already happened (`alive === false`), and every guard reading `G.children`
  should skip the dead.
- **Money is a statement about when.** Write dollar figures in present-day money
  and let the chokepoints denominate them; a figure denominated twice looks right.

## Source Tree (summary — full per-module list in docs/source-tree.md)

```
src/
  data/
    countries.js, places.js     the roster: 154 countries, their groups, places with homeOf
    identity.js, groupNames.js  religion conditioned on ethnicity; names by community and faith
    history.js                  dated facts: independence, coups, wars, healthcare, cholera,
                                malaria, rail, adjustment programmes, suspended institutions
    technology.js, economy.js   when a thing arrived where you live; what money was worth
    climate.js, series.js       seasons; literacy and urbanisation by birth year
    events.js                   imports every event module, classifies them, exports EVENTS
    eventIndex.generated.js     classification computed from source (npm run build-event-index)
    events/                     thematic/ lifecycle/ geographic/ sonder/ specific_lives/
                                followthrough/ prison/ — the corpus
    worldEvents.js, headlines.js, soundtrack.js   the world arriving, keyed to place and age
    flags/                      FLAG_REGISTRY by category (npm run check-flags)
    careers.js, crimes.js, activities.js, assets.js, destinations.js, migration.js, ribbons.js
  engine/
    tick.js                     the year: buildG, getNextEvent, health, money, family, death
    lifeCourse.js               work, partnering, marriage, children, housing, retirement
    character.js                createCharacter, parents, siblings, phases
    yearTexture.js, mundaneLayer.js, prose.js   the quiet-year prose layers and no-repeat record
    playerActions.js, epitaph.js, names.js
  store/gameStore.js            Zustand store, actions, save/load
  components/                   LifeScreen, ActivitiesPanel, Birth/Curated/Death/Title screens
scripts/                        check-flags, check-events, check-anachronisms, check-bundle,
                                check-ui, check-reach, check-prose, sim, play.mjs, stats,
                                build-event-index
```

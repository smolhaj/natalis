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

The corpus is ~8,000 events, ~2,275 of which are universal contemplative
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
`G.character`, `G.stats`, `G.flags`, `G.mem`, `G.age`, `G.currentYear`, `G.career`, `G.partner`, `G.children`, `G.parents`, `G.money`, `G.karma`, `G.fame`, `G.regime`, `G.lgbtqCriminalized`, `G.casteSystem`, `G.childMarriageRisk`, `G.ruralUrban`, `G.ethnicity`, `G.religion`, `G.currentCountry`, `G.residencyStatus`, `G.inPrison`, `G.place` (current place object from places.js, or null), `G.desire` (character's core formative desire), `G.political_leaning`, `G.conditions` (array of active chronic conditions), `G.currentProject` (active slow-burn project object, or null), `G.retirementAge` (the age this character can retire at, or **null** where there is no pension system to be inside — a smallholder does not retire)

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

255 world events. Fire based on year range + archetype/country match, independent of the normal event queue. Shape:
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

145 countries. Every country has:
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

### Climate and season (`seasonsFor`, `deriveSeason` in `src/engine/character.js`)

A country returns either `dry`/`wet` (monsoon and tropical) or the four temperate
seasons. `MONSOON_COUNTRIES` lives in `character.js` and `_sonderGuards.js`
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

154 countries, 393 named places, 252 world events, 8,228 character events
(2,129 of them the contemplative sonder layer, 158 stranger glimpses, 42 prison
and political-arrest, 30 Gulf, 42 Guyana, 41 Bosnia, 21 Nigeria 1967-99),
3,153 registered flags, 377 ribbons.
**0 orphaned, 0 partial flags.**

Verify with:

```
npm run build            # must pass
npm test                 # 406 tests, including the simulation guardrails
npm run test:fast        # unit + static audits, seconds not minutes
npm run test:sim         # the slow guardrails: register mix, prose coverage, demography
npm run check-flags      # 3025 covered / 0 partial / 0 orphaned
npm run check-events     # reachability: dead guards, enum domains, phase/year windows,
                         # season/country, silent choices, narrated moves that move nobody,
                         # populations the roster models that the corpus never addresses
npm run check-anachronisms  # plays lives and reads every line against when the world held it
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

### The 2026 systems rebuild

An external audit found that the authored corpus was reaching players as roughly
70% generic contemplation, and that none of it was visible to `check-flags`,
which audits whether flags are textually set rather than whether code can run.
Four faults sat between the library and the screen; all four are fixed and all
four now have a test that fails if they return.

| | before | after |
|---|---|---|
| contemplative share of a life | ~70% | 18.8% |
| place/era/identity-anchored events | ~0.4% | 35.2% |
| `buildYearTexture` reachability | ~2% of years | 59.7% |
| stranger glimpses per life | 0.3 | 6.2 |
| longest unbroken contemplative run | 19-21 years | 2 |
| Nigeria 1962 median death age (survived childhood) | 8 | 43-51 |
| yearTexture lines a player ever sees | 9.3% of 7,588 | 13.7% of 8,126 at 600 lives (see below) |
| countries whose texture appears in a broad run | 16 | 94 |
| prose a character reads that they already read | 15.6% | 0.2% |
| countries rendering a blank flag | 72 of 146 | 0 |

Beyond those: parent death set no flag at all (21+ consumers, zero setters);
events were consumed at display rather than resolution, so closing the tab ate
them; 732 events froze one prose variant per app session; the in-prison pool
required a `prisonOk` field no event set; emigration changed the prose and
nothing else; literacy was a modern snapshot applied to mid-century births; and
birth country was uniform across the roster, so 17% of lives began somewhere with
almost no content.

**The lesson worth keeping: measure what fires, not what exists.** Every failure
above was invisible to a green flag audit. `npm run sim` is the counter-check.

### The beta pass

A later pass played the game rather than auditing it, and found a second class
of defect: content that fires correctly and is wrong about the world.

| | before | after |
|---|---|---|
| lines naming a technology before it arrived | many | 0, over five consecutive runs |
| "Life in brief" on the death screen | empty in 67% of lives | 0%, median 8 notes |
| families with two members sharing a first name | 13% | under 1% |
| both parents holding the identical job and wage | ~50% at the top tier | 3% |
| smarts median at death (share ending 90+) | 96 (58%) | 74-78 (9-11%) |
| countries whose religion mix the identity table distorts >12pp | 26 | 0 |
| passive mode, share of years containing an event | measured at 52% | 88.6% (the 52% was the instrument) |

Every one of these was reachable, correctly guarded and syntactically fine. A
1931 Omani childhood had a hallway telephone and a weekly trip to the cinema,
because `wealthy_gulf` describes Oman now. An Icelandic living room had a
television in 1944, twenty-two years before Icelandic broadcasting. A Cambodian
in 1977 was drawing a salary, being promoted to Foreman and being referred to a
psychiatrist, four years into a regime that had abolished money, wages and
hospitals. A Romanian who lived through Ceaușescu's whole rule got an obituary
that mentioned neither him nor 1989 — while her own state object had been
holding `romania_revolution_1989` since the year it happened.

**The lesson worth keeping from this one: a guard answers "may this fire", not
"is this true".** Nothing static can tell the difference. `npm run
check-anachronisms` and the simulation tests are the counter-check.

### The second beta pass

The first beta pass audited. The second one **read complete life logs end to
end**, in sequence, as a player does — and found a third class of defect that
neither a static audit nor a firing-rate report can see: **the narration and the
state disagreeing.**

| | before | after |
|---|---|---|
| widowings the game never mentioned | 26 of 37 | 1 of 45 |
| lives naming a dead partner as present afterwards | 9 of 37 | 0 of 140 |
| lives in which a parent dies twice | common | 0 of 140 |
| retirements the engine then undid | every flag-only one | 2 of 57 |
| dollar figures before 1995 | wrong by 1-2 orders of magnitude | era-denominated |
| final balance, median passive life | millions | $35,527 |
| partner occupations possible in the year | a flat modern Western list | gated by year, place, gender |

The pattern: a log line is a **claim about the state**, and nothing was checking
that the state agreed. `tickPartner` marked a partner dead silently on the
reasoning that the grief events would carry it; they carried it 30% of the time,
and meanwhile 304 guards read `G.partner` without asking whether they were
alive. Two generic parent-death events narrated a death and called no
`killParent`, so the character carried `orphan` from thirteen while both parents
lived, and each of them died again, by name, decades later. An event retired the
character with a `retired` FLAG while every hook that hands out a job reads the
`retired` STATE FIELD.

**The lesson worth keeping: read the log in order.** Every one of these is
invisible to a guard audit, invisible to `npm run sim`, and obvious within
thirty seconds of reading a life as a player reads it.

### The population the game could not reach

`npm run sim -- --broad` and a per-country coverage census put `wealthy_gulf`
last of the eight archetypes. The reason turned out not to be the citizens.

The roster already modelled these societies correctly — the UAE is 59% South
Asian in the data, Qatar 60%, Kuwait 40%, Bahrain 36%, every migrant group
flagged `disadvantaged`, and the UAE's own country note says in plain words that
"an Emirati and a Bangladeshi construction worker live in the same square
kilometre but inhabit entirely different cities". Across **eleven Gulf ethnic
ids the corpus contained one reference.** The engine was drawing those
characters correctly and had nothing to say to them.

The kafala content that did exist was written from the *sending* side — a
Nepali village, a broker, a one-way ticket — which is the half a writer reaches
for first. The arriving life, and the life of the citizen watching it arrive,
were both unwritten. Qatar, Kuwait, Bahrain and Oman also had no `places` at
all, so nobody there had a neighbourhood.

`npm run check-events` carries `unwritten-group` for it now, and getting that
audit right took three attempts in three different wrong directions, which is
the useful part. Reporting every unnamed id gave **328** warnings, because an
event guarded on `country === 'Greece'` addresses the 94% of Greeks who are
Greek perfectly well; the case that matters is a group whose experience of its
own country is not the country-generic one, which is what `disadvantaged`
marks, or a large minority in a country that is plainly not one people.
Scanning function bodies then reported the Gulf as **still unwritten after
thirty events had been written for it**, because the module lifts its ids into
a shared `const MIGRANT_IDS = new Set([...])` that never appears in
`when.toString()` — wrong in the worst direction, telling you a gap is open
after somebody closed it. And scanning all of `src/data` reported **zero**
forever, because `countries.js` declares every id and made each one trivially
"named".

**The lesson worth keeping: a demographic the data models and the corpus never
addresses is invisible to every audit here.** `check-flags` is about flags,
`check-events` about guards, `npm run sim` about what fires — and a population
nothing was ever written for fires nothing, which looks exactly like a
population that is simply rare. The counter-check is to walk the roster's own
`ethnicGroups` and ask which ids the corpus has never once named.

### And the same hole, one scale up: a country

The audit's next report was not a group inside a country. It was Guyana, whose
four main populations were all on the list at once, because the corpus contained
**one guard naming the country**, in a list of five Caribbean states. Nobody
born there had a place either — `places.js` had no Guyanese entry, so a Guyanese
character was born nowhere and the neighbourhood tiers had nothing to draw from.

It is a small country to have missed and a strange one to miss, because its
twentieth century holds, in one place, almost every force this project is
otherwise writing about one at a time: indenture, a single company owning the
wage and the shop and the ship, a constitution suspended by warship 133 days
after the first universal-suffrage election, a party split in 1955 that made a
surname answer the ballot for sixty years, a voting system changed from outside
specifically to remove the man who would have won, two decades of rigged boxes
and a ban on wheat flour, a historian killed by a bomb in a walkie-talkie, and
an emigration so complete that there are more Guyanese outside the country than
in it. Plus the thing the world does know, which is a compound in the North West
District where 918 people died and almost none of them were Guyanese.

`events_guyana.js` is 42 events, 10 of them follow-through, plus 5 places and
~27 year-texture blocks. And the place gap turned out not to be
Guyana's alone: **71 of 154 countries had no `places` entry at all**, including
Portugal, Greece, Denmark, Mali, Cameroon, Angola, Iraq, Mongolia, Taiwan,
Malaysia, Jamaica and Ecuador, most of which have large authored modules. A
country with no place makes `pickBirthPlace` return null, which leaves
`currentPlace`, `character.birthPlace` and `currentNeighborhoodName` all null,
and `LifeScreen` renders the whole location bar behind `{livePlace && ...}` — so
a character in almost half the roster was never told where they lived, and the
64 guards reading `G.place?.type`, `?.scale` or `?.region` could not fire for
them. 192 places were written for the other 71, and `tests/places.test.js` fails
if any country loses its own.

**What makes this one worth recording is that it does not appear in any rate.**
Measured in matched pairs — Ghana against Mali, Peru against Ecuador, Sweden
against Denmark, Cuba against the Dominican Republic, 30 lives each — the
events-per-year and texture-per-year figures were *identical* either side of the
gap, and so was the anchored register share. `REGISTER_SHARES` reserves 40% of
each year for `anchored` and fills it from country and era guards whenever the
place guards cannot answer, so the bucket is always full and the absence is
perfectly masked. The thing lost was not volume. It was the place.

### The audit that cried wolf, and Bosnia

With the places closed, `unwritten-group` was still reporting 145 findings and
the top twenty-five of them were a country's own plurality: Colombia's Mestizo
at 49%, Brazil's White Brazilian at 48%, Pakistan's Punjabi at 45%. The filter
tested `share >= 0.5` for "is this the group a country-generic event is already
about", which is the wrong test — a plurality is the country-generic population
whether or not it clears half — and it was also reporting catch-all buckets,
asking for an event about the shared experience of being *Other* in Uganda. It
was additionally blind to a guard that reaches a group by shape rather than by
name: the Baltic module writes `id.startsWith('russian_')` to cover three
countries' Russian minorities at once, and a literal scan called all three
unwritten. Fixed, the queue is 25 findings and every one is real.

**The lesson, which is the mirror of the one two sections up: an audit that
reports twenty-five false positives has failed in the same way as one that
reports none.** Both leave you unable to see the two findings that matter.

What the clean queue put at the top was Bosnia and Herzegovina — six mentions in
the whole corpus, `bosnian_serb` unwritten at 31%, and no module, for a country
whose twentieth century is among the heaviest on the roster.
`events_southeast_europe.js`, which this file's own source tree described as
covering "Yugoslav collapse, Bosnian War, Kosovo, tribunal", contains four
Romanian events and five Serbian ones and not one Bosnian guard.

Two things came out of writing it that generalise.

**A module can be written for the famous version of a country.** The first pass
put the siege of Sarajevo at the centre, and the engine draws 73% of Bosnians
rural — correctly, the country was 39% urban in 1990. Sixteen per cent of
characters are in Sarajevo. The war most Bosnians actually had was a village
that men arrived at from somewhere else, a school with blankets hung on wire for
walls, a convoy, a field you can see from the house with a skull on the sign,
and a census that says a hundred and forty where 1991 said eleven hundred. Five
events, and they are now the most-fired in the module.

**`weight: 999` means nothing when everything is 999.** Five of them were
eligible in 1992 alone and one event fires per year, so the chains behind them
starved: `ba_camp` required a flag its own trigger set *in the same year*, which
no character could ever satisfy, and the Bosnian Serb arc reached 5% of Serb
men. Widening each event to the years it actually ran in, and keeping the
referendum and the village clearance off a conscript's 1992 because the call-up
owns that year, fixed all of it. Measured over 1,400 lives: all 41 fire, 0
errors. Measured over 520 lives across ten birth cohorts: all
42 fire, 0 errors, and `p.emigrateTo` puts the 59 diaspora characters in the
United States and Canada rather than only flagging them.

Two calibration notes worth keeping. The weight a narrow guard needs is not the
weight a broad one needs: `gy_logie_room` (Indo-Guyanese, childhood, before
1965) reached 5 of 520 lives at weight 8 and 26 at weight 30, and the
follow-throughs gate on flags only 16-76 characters ever hold, so at the
module-typical weight of 8 they lost to the general pool and the echo never
landed for the life it was written for. And `check-anachronisms` now runs two
Guyanese cohorts (1932 and 1955), because an estate colony on the sugar coast
is exactly the case that audit exists for — a country whose present-day
category says nothing about what was in the house.

### `isRich` is a statement about now, for the third time

CLAUDE.md has recorded this defect twice — `isWealthyArch` giving 1931 Oman a
hallway telephone, then `place.hasRadio`/`hasTV`/`hasCinema` giving it a radio
in 1930 — and both times the fix was applied to the predicates in front of it
rather than to the predicate itself. CI then found a daily bus route with stops
in a fixed order in **1951 Oman**, a country with ten kilometres of paved road
and three schools, sixteen years before it exported oil. `isRich` was still
`RICH_ARCHETYPES.includes(G.archetype)`, and eighteen predicates read it as
"did this place have the thing early".

The repair is three tests, not one, because they are three different questions:

- **a table where there is one.** Electricity, piped water, a refrigerator, a
  landline, a car all have arrival years per country. `wasWealthy` is the wrong
  proxy for them: 1951 Germany was not materially rich — it was in ruins — and
  had been electrified since the 1920s.
- **`wasWealthy(country, year)`** for what genuinely tracks money and has no
  table: a bank account, a clock in the house, a weekend, photographs.
- **`cityEnough(G, share)`** for municipal infrastructure — a bus, a lift, an
  underground, a supermarket — which follows urbanisation and not wealth.
  Germany was 58% urban in 1935 and had municipal buses from 1905; Oman was
  13% urban in 1951. Every country carries its own `urbanHistory`.

**The lesson worth keeping: fix the predicate, not its callers.** Both earlier
passes patched the symptom one guard at a time, and the wrong answer stayed in
the definition waiting for the next sentence that asked it.

### Thresholds are instruments, and a noisy one fails on nothing

Three assertions failed during this pass and none of them had found a defect.
The max of ~32 survivor ages, the median of ~20, and a proportion on a group
that draws a few hundred times out of 30,000 births are all statistics that
swing by more than their own bound between identical runs: a survivor median
that measured **48 at n=150** came out **30** on one twenty-life draw, and a
declared 0.88 share landed at 0.798 against a flat floor of 0.8.

The rule that came out of it: **assert the contract, at the sample size you are
actually taking.** The identity test now reads the declared share from the
table and allows the ±10pp reconciliation `impliedMarginal()` documents, plus
sampling room — so it cannot drift out of step with the module it tests. The
mortality bounds are set for a twenty-life sample, with a stable companion
(the share of a cohort reaching 60, pooled percentiles) carrying the real
claim. Both still fail by a wide margin on the defect they were written for.

A test that fails at random gets read as noise, and then the one real failure
gets read as noise too. The trap is not subtle and it is easy to walk into
twice: the replacement bound I wrote for the mortality test — "more than 10% of
this cohort reaches 60" — failed on the next run at exactly 2 of 20, in the same
commit as this paragraph. A tail share over twenty draws is no more stable than
the max it replaced. Per-country assertions are sanity bounds; the real claim
belongs in a statistic pooled over every country and every life in the run.

### The check that loads a page

`npm run build` exits 0 on a bundle that throws on load, and did for an
unknown number of deploys. `manualChunks` matched the substring `'react'`
against a module path; `scheduler` — which react-dom reaches for at
module-init time, and whose path contains no "react" — went to a different
chunk from React, and the two chunks imported each other. Rollup says so, on a
successful build:

```
Circular chunk: vendor -> vendor-react -> vendor
```

and the page throws `Cannot read properties of undefined (reading 'useState')`
and renders an empty div. Measured on both sides: with the old config `#root`
holds **0** characters; with the fix it holds 2,485, a life starts and ages.

Every other check here was green the whole time — 350 tests, 0 flag orphans, 0
reachability errors, 0 anachronisms over 11,000 lines of prose — because not
one of them loads a page. `npm run check-bundle` builds, serves `dist`, opens
it in a browser, starts a life, ages ten years and fails on any console or page
error, and it reproduces the original defect when the old config is put back.

**The lesson worth keeping: test the artefact, not only the source.** Every
audit in this repo reads code or runs the engine in Node. The thing the player
receives is a bundle, and nothing was opening it.

### The third beta pass

The second pass read four lives. The third read four more, after the money
layer went in, and found a fourth class: **a rule that is correct in one place
and silently wrong in every other place it is read from.**

| | before | after |
|---|---|---|
| diagnosed lives ending with `conditions: []` | 89% | 0.7% |
| a child's wealth stat, outside the rich world | 5 (the clamp floor) for every tier | 5 / 14 / 28 / 45 / 62 by tier |
| adult-years resting on the money clamp | 5.8%, with bills forgiven | 8.4%, carrying debt |
| choices that print nothing back | 51 | 0, audited |
| emigration events that move anybody | 0 of 83 flag-setters | `p.emigrateTo`, audited |
| "Never married." on a widower's death screen | 6 of 200 married lives | 0 |
| the empty-nest event's youngest trigger | children aged 12, 2 and 1 | somebody 17 or over |
| retirement narrated as over, then declined | fired at 50 | 60, and the text does not assert it |

The pattern is one rule read from several places, fixed in one of them. A
promotion that pays less was fixed in the re-denomination path and in
`askForRaise` and left in `checkPromotion`. `occupation.annualIncome` is scaled
by `GDP_MULT` in `tickFamilyIncome` and in `formatParentIncome` and not in the
estate band, so an inheritance was wrong by exactly `1 / GDP_MULT` — forty times
in a `very_low` country. `character.ruralUrban` is frozen at birth and four
separate prose sites read it directly while `homeCountry`, on the next line of
the same files, correctly followed the character.

**The lesson worth keeping: when you fix a rule, grep for every reader of it.**
The one you do not fix is the one that will print into a life.

### Money is a statement about when

`careers.js` carries salary ranges in present-day dollars, `assets.js` carries
prices in present-day dollars, and both were scaled by the country's
present-day GDP tier and by nothing else — which is `isWealthyArch` again, one
layer down. Read as history it printed `Starting salary: $19,540/yr` into 1948
Germany, four months after the currency was reissued.

`src/data/economy.js` supplies the missing dimension, and it is applied at
**four chokepoints, all four of which are load-bearing**:

1. salaries where they are set, plus `career.baseSalary` in present-day money,
   so a career held from 1950 to 1990 does not pay 1950 wages into 1990 prices
2. prices where they are charged — denominated at the DEFINITION of a cost,
   never at the deduction, so the figure shown, the affordability check and the
   amount taken are necessarily the same number
3. `p.mo` in `applyProxy` — one site, 629 authored money deltas, all of which
   stay exactly as written
4. `G.money`, which is **divided** by it, so the ~76 guards reading
   `G.money > 5000` keep meaning "comfortable" instead of quietly becoming
   "alive after 1990"

Income and prices carry the same factor, so affordability does not move.
`tickLivingCosts` is the other half: nothing was ever spent on living, so a
character banked 100% of gross income for sixty years. Its rates are calibrated
against home ownership, the one outflow measured against the record — at true
national-accounts saving rates ownership fell from 72% to 43% in the 1950
American cohort, because nobody could assemble a deposit.

**When you add a dollar figure anywhere, write it in present-day money and let
the chokepoint denominate it.** A figure denominated twice is worse than one
denominated never, because it looks right.

### The auditors have the same failure mode as the content

Both static audits were quietly exempting the thing they were built to catch.

`check-anachronisms` skipped any line containing a negation **anywhere in the
line**, so "Mobile money has made it possible to send money without a bank
account" — which asserts mobile money and negates the bank — was invisible, and
printed into 1990 Nigeria seventeen years before M-Pesa. Any sentence that
mentions what a technology replaced was exempt, which is most of the sentences
worth auditing. Negation is now scoped to the clause, with a matching FUTURE
exemption so "When the refrigerator arrives" stays correctly ignored.

`check-flags` fell through to `partial` for any `intent` it did not recognise,
so a misspelling made a flag look broken and gave no way to tell why.
`followthrough` is the value that keeps getting written, because it is what the
field means and not what the field accepts. Unknown intents are now reported by
name. **Valid values are `none`, `both`, `year_texture`, `event`, and nothing
else.**

**The lesson: an audit that cannot fail is not an audit.** When one reports
zero, check that it can still report one.

### Nobody had played the mode with play in it

Every pass before this one tested **passive** mode. Active mode — the choice
surface, the yearly action budget, the activities panel, crime, the trial, the
minigames — had never been driven. Pacing came out good: 45% of years contain a
real decision, 0-2% contain nothing, and choices measurably change a life
(always-first against always-last, 14 lives each: US median death 71 vs 82,
Nigeria 52 vs 25). Three things made it unplayable anyway.

| | before | after |
|---|---|---|
| a negative balance at the trial screen | permanent soft-lock | recoverable |
| salary reachable from one unbudgeted button | $3,455,778,417/yr | the top of your grade |
| panel price vs engine price, 1950 Germany | $90,000 vs $1,260 | equal |
| adult smarts, rich-world (share at 90+) | 96.7 (63%) | 83 (18%) |
| money a child holds at eighteen, having never worked | $51,084 | pocket money |
| world events reaching a prisoner over a ten-year sentence | 0 | 14 |
| Money-category activities that do anything | 0 of 7 | 7 |
| crimes the panel can reach | 30 of 37 | 37 |

Two of those are worth naming as rules.

**A price shown must be the price charged.** `economy.js` went in at the four
engine chokepoints and not into the interface, so the panels printed
present-day catalogue numbers while the engine charged era-denominated ones —
and the `disabled` gates compared a nominal balance to a present-day price,
falsely locking property, vehicles, travel and business for every character
before about 2000. In 2024 the two numbers finally agreed, which is the "the
economy is a statement about NOW" failure surviving one layer above where it
was fixed. `estimatePrice`/`estimateCost` in `playerActions.js` now serve the
display, the affordability check and the charge.

**A verb offered is a verb that works.** Seven Money activities moved the
wealth STAT, which `tick()` recomputes from `money` every year, so none of them
did anything and two were strictly harmful. The sterilisation button called an
activity id no pool defined. Seven crimes were not listed in the panel at all.
Losing a career to a conviction had no prose. An arrest with a zero-length
sentence had no consequence whatsoever.

And the interface was contradicting four of the rules its own section states
most explicitly: a "+2 / −4" flash on the stat strip, a partner card with a
CRAZINESS bar behind a hot-pink gradient, emoji in one of the two log views but
not the other, and the outcome of a choice printed twice on one screen. The
Tailwind remap that exists so a component cannot reach a candy colour was
missing exactly two scales, `pink` and `purple`, which is why the gradient was
the real #ec4899.

**The lesson: play the mode the player plays.** A passive life exercises the
simulation. It does not touch a single button.

### "Nothing fired" and "nobody was there" print the same number

`npm run sim` reports what fires per 100 lives, and that figure cannot
distinguish the only two explanations that matter:

- the content is **unreachable** — a broken guard, a chain whose trigger sets a
  flag its own consumer needs in the same year, a weight of 8 against a field of
  999s
- the **population is rare** — a doctor is rare, so doctor events are rare, and
  that is the engine being correct

A census of the deep career arcs made the problem concrete. Across 280 ordinary
lives, eight of them — doctor, nurse, lawyer, journalist, engineer, dev,
accountant, social worker, civil servant, about eighty authored events — fired
**zero** times. That reads exactly like the prison arc did before it was fixed,
and it is nothing like it: nobody in that sample ever became a doctor, because
twenty-two of the forty-nine careers require a degree and about 10% of lives get
one, which is roughly right for these cohorts.

`npm run check-reach` asks the conditional question instead. It forces the
condition — hands the character the job and the degree at 24, or draws them from
the country in question — and measures what share of the body of work reaches
them. Every career arc passes: 16% of drivers to 79% of software developers see
one over a forty-year career, and none is dark.

It also gives the honest per-country number, which `sim` cannot: its ten default
configurations cannot reach 144 countries' modules at all, so a country whose
module is perfect and a country whose module is broken both report zero. Over 40
lives each: Germany 1928 93%, Japan 1935 88%, Bosnia 83%, Austria 83%, Qatar 80%,
Guyana 75% — against Nigeria 1962 at 25% and Peru 1960 at 15%. Nothing there is
unreachable (the distinct counts climb with `--lives`, which is how you tell),
but a Nigerian is a quarter as likely to meet their own country's depth module as
a German, and that is worth knowing.

**The lesson: a small number has two causes and only one of them is a bug.** An
instrument that shows them identically buries the one that is — the same failure
as `unwritten-group` reporting a country's own plurality, one level down.

The first thing it found was about the country this document opens by naming.
`events_nigeria_depth.js` measured **20%, three of its thirteen events**, for a
Nigerian born in 1962 — and **70%** for one born in 1995. Nothing was broken:
five of its thirteen events require `currentYear >= 2030`, and a 1962 Nigerian
would be sixty-eight then against a national life expectancy of 54. Solar after
NEPA, the last cash, Lagos at thirty million — all correct, all written for
somebody born thirty years after the person the Vision statement is about.

`events_nigeria_midcentury.js` is 1967 to 1999, which for that character is ages
five to thirty-seven: Biafra as a child under the blockade, the Udoji arrears and
the cement armada and FESTAC, Ghana-Must-Go, the whips at the bus stop,
adjustment, the fuel queue in an oil state, Saro-Wiwa, and the year it stopped.
The touchstone life now reaches **77%, and all 21 of 21 events fire.**

**Corollary worth keeping: a module can be correct and still be for somebody
else.** Nothing static can see it, and `sim` cannot either — it reports the
module firing, because the 1995 cohort is in the sample too.

### The claim the state never checked, again

A fourth beta pass read eight complete life logs end to end. The class it found
is the one the second pass found — **a claim printed to the player that nothing
checked against the state** — and four instances of it were on the death screen,
which is the last thing anybody reads.

| | before | after |
|---|---|---|
| a debt's balance after fifty years | $7.1m from a $2,400 bill | $1.0m worst case, median $5,818 |
| debtor lives the game ever mentions debt to | 0 | 34 of 48 |
| "Never went to school." after a decade of school events | stamped at 16 | attendance decided at 7 |
| a retiree's working life on the death screen | absent | named |
| Japanese lives that could become hibakusha | all of them | the two cities |
| Bavarians with a Stasi file | all of them | none |

The shapes worth keeping:

**A flag is not a fact about the state.** `never_schooled` was set at sixteen by
the roll that decides whether *secondary* is completed, from an `everAttended`
test reading `mem.attendedSchool` — which nothing in the engine or the corpus
has ever set. Not finishing secondary and never attending anything are different
facts, and attendance is now decided at seven, when a child would start.

**Nulling a field erases the life that filled it.** `retire()` sets
`career: null` and all three epitaph readers destructure `career` off state, so
thirty-one years as a Detective Chief Inspector and thirty-seven as a novelist
both read as no work at all. The two lives in that sample that died still
employed got their line, which is how you see it.

**An event with no place guard is a claim about where the character was.**
`jpn_hibakusha` tested Japan, a year range and an age — so a farmer in rural
Tohoku, eight hundred kilometres away, became an atomic-bomb survivor and it was
the first line of his epitaph, "the city unnamed" because there was not one. The
roster had nowhere to put a guard: Japan carried Tokyo, Osaka and Rural Tohoku.
Same shape for `east_germany_stasi` and `east_germany_trabant`, which are
`countries: ['Germany']` — correct, it was one country either side — against a
roster holding only Berlin and rural Bavaria. Hiroshima, Nagasaki, Leipzig and
rural Thuringia exist now, and the guards name them.

**And the audit had the same blind spot as the content, for the fourth time.**
`narrated-move` accepted `setResidency(` as evidence that an event moves
somebody. It does not — it changes what papers a character holds and leaves them
exactly where they were, which is how a Cairo character came to hold a work visa
in her country of birth for forty-two years, collecting diaspora texture under a
death screen reading "She left Egypt in search of something different." Tightened
to `relocate` and `emigrateTo` only, and widened past move/relocate/emigrate to
the shape that hid — "The family takes the step. A new world" — it went from one
finding to five, all real.

Related, and the reason `tests/careerFit.test.js` exists: `chooseCareer` reads
`FIELD_FIT[c.field]?.[col] ?? 1`, and that `?? 1` is silent. A career whose
field has no row is weighted identically for a rural subsistence villager and an
urban graduate, in every column, and nothing says so. The table is complete
today — 38 rows for 38 fields — by somebody's diligence and by nothing else, in a
codebase whose recorded history is of silent fallbacks that were correct until
they were not.

### The instrument assigned each country one birth year

`npm run sim -- --broad` walks the whole roster, and it gave each country
exactly ONE birth year, picked by the country's index in `COUNTRIES`. The
report then printed "distinct countries whose dedicated content appeared", and
that list was read as which modules ever fire.

It cannot answer that question, and reading it as if it could produced a false
alarm on seven modules at a sample of 38,500 lives. Germany and Japan both drew
1975, so `germany_reich` (1933-49) and `japan_war` (1937-52) were reported dark.
Belarus drew 1935 and Armenia drew 2000. Burkina Faso drew 1962, and that
module's earliest event needs age ≤ 5 in 1984, so it is written for a cohort
born about 1965-1980. Every one of them fires for the cohort it was written for,
and `events_indonesia.js` — singled out as "the one worth looking at" — fires
perfectly well.

This is **"a module can be correct and still be for somebody else" sitting
inside the instrument rather than the content**, which is the fourth distinct
audit in this repo to fail in the same shape as the thing it audits. `--broad`
now runs every country at all six cohorts (825 configurations, up from 154),
divides the requested `--lives` across them so the run does not cost six times
as much (`--lives-per-cohort` opts out), and the report says in as many words
that a country's absence from that list is a statement about the sample and not
about the module. `npm run check-reach` is the tool that answers the conditional
question.

**What the 38,500-life run does confirm**, unchanged from a sample an eighth the
size: the register mix (contemplative 18.4 / anchored 35.6 / earned 35.1 /
universal 8.8), repetition at 0.2%, glimpses at 5.17 per life — and
`geographic` at **158 events per 100 lives**, identical at both sizes. The
entire country-depth project, 194 modules, reaches a player 1.6 times in a life,
against 17.7 for `thematic`. No module is dark. The corpus is under-delivered,
not broken, and that is a different problem with a different fix.

It also demonstrates the prose-coverage caveat across an 8× range: yearTexture
coverage moved 36.0% → 53.3% while **concentration moved 177 → 179 lines
supplying half the output**. Coverage is a function of n and is meaningless
without one; concentration is the real statement.

### September 2026: dated events, the unwritten groups, and the screen

- **A one-year event could not reach the person it was written for.** 394
  events have a 1-2 year window; one event fires per year and anchored holds
  ~38% of it, so they reached 8.8% of eligible characters (4% at weight <20).
  `classifyEvent` now sets `event.dated`, and `getNextEvent` lets an eligible
  dated event claim its year (0.9 in its last year, halving through an unbroken
  run of dated years), borrowing the year from `anchored` and repaying it
  (`mem.anchoredDebt`). Pooled reach 77%; register mix moved <1pt.
  `tests/datedReach.test.js`.
- **`chain-window`** in `check-events`: B requires a flag/mem key whose only
  setters open no earlier than B's last year, or a world event sets B's own
  `!flag` latch first. Found four dead events and seven blocked ones.
- **New modules for groups nothing named:** Peru 1965-2006
  (`events_peru_midcentury.js`), Kabyle, Amhara, Afghan Tajik, Brazilian pardo,
  Cuban mulato, Mende, Hawiye, Halpulaar (Fouta), Malinké (Upper Guinea), each
  with `homeOf` birthplaces. `pickBirthPlace` reads `weight` and `homeOf`;
  `unwritten-group` does not count a `homeOf` as writing for a group.
- **Beta pass six:** emigration moves people (`p.emigrateTo` in 69 events,
  `src/data/migration.js` as the fallback, `p.returnHome()`); `G.regime` and the
  mundane layer follow the live country; surnames follow the father; grief
  lands the year of the death. `tests/claimsAndState.test.js`.
- **Pass seven, through the real UI** (`npm run check-ui`): saves kept the
  pending question as null, a dead partner was shown and courted as living,
  ~25 panel prices were present-day beside era charges.
- **Open:** ~584 guards read `G.character.country` for present-tense prose, so
  an emigrant gets ~2.3% of years of home-country events; `classifyEvent`
  cannot see through module-local guard helpers (`HOME(G)`), filing those
  events `universal` (Kabylie, Amhara, Gulf); `Guinea:susu_guinean`, Bisaya,
  Ambundu, Tsonga, Tigre still unwritten.

- Full event system descriptions and coverage history: `docs/codebase-state.md`
- Full BUILD-by-BUILD roadmap and MICRO-EVENT DESIGN PRINCIPLE: `docs/roadmap.md`

---

## Source Tree

```
src/
  data/
    countries.js              — 154 countries with full demographic data, incl. `historicalNames`
                                (birth-year keyed: "born in the Gold Coast", "born in East Pakistan") for 103 of them
    places.js                 — 389 named places, at least one for every country on the roster. It was
                                197 across 83 of 154, and a country with none leaves `currentPlace`,
                                `birthPlace` and `currentNeighborhoodName` all null — the location
                                bar renders behind `{livePlace && ...}`, so a character in almost half
                                the roster was never told where they lived
    headlines.js              — ~130 major historical headlines for life log injection
    technology.js             — when a thing arrived where the character lives, and when the country
                                became materially rich: 19 technologies, ~218 country overrides.
                                Because `isWealthyArch` describes NOW, and read as history it gave
                                1931 Oman a hallway telephone and 1944 Iceland a television.
    economy.js                — what the money was worth, when and where. The same fault as
                                `isWealthyArch`, one layer down: salaries and prices are written in
                                present-day dollars and were scaled by the country's present-day GDP
                                tier and by nothing else, so 1948 Germany printed a taxi driver on
                                $19,540/yr. Eight archetype rows, 21 country overrides, two deliberate
                                reversals (Nigeria's dollar wages peaked in the 1980 oil boom; the
                                post-Soviet row loses two thirds of itself 1990-95), and the fact that
                                makes it worth having: in 1960 Ghana pays better than South Korea
    identity.js               — religion conditioned on ethnicity for the 473 groups where the two
                                are entangled (Lhotshampa are Hindu; Bosniaks are Muslim; Malays are
                                constitutionally Muslim), and silent for the rest. `impliedMarginal()`
                                holds the joint draw to each country's declared religionWeights.
    history.js                — the dates and facts the engine was guessing: independence years, coup
                                years, the fifteen Soviet republics, the Warsaw Pact, malaria
                                elimination, which countries have rivers, which taught school in a
                                coloniser's language, and INSTITUTIONS_SUSPENDED — the years a country
                                stopped having schools, wages, money, clinics, the post or cities
    events.js                 — root event file, imports 463+ modules, exports EVENTS array (~8,025 total character events)
    [All events are organized into src/data/events/ subdirectories — see below]

    worldEvents.js            — 252 world history events (year+country/archetype gated); 20+ events have `context` fields
    headlines.js              — ~130 major historical headline entries (year-matched, injected as log entries)
    flags/                    — FLAG_REGISTRY split into 10 category files (identity, geographic, economic,
                                health, relationships, political, prison, world_events, lifecycle, new_roster).
                                2879 registered flags. Pure data, no imports. `npm run check-flags` derives coverage.
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    assets.js                 — property/vehicle data
    destinations.js           — travel destinations
    illnesses.js              — illness/disease system
    ribbons.js                — end-of-life achievement ribbons (379 defined)
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
        events_housing.js         — 6 tenure events: post-Soviet privatisation decree, two years rent upfront, the unfinished upper floor, the document against the understanding, never owning, the last mortgage payment
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
        events_germany_reich.js   — 20 events: Germany 1933-49, the same gap one country over. The
                                    Hitler Youth is written as enjoyable, because it was, and the
                                    reckoning arrives in 1968 as a question from a child to a parent
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
        events_era_gaps.js        — Bengal Famine 1943 child+adult, Buenos Aires WWII neutrality, post-independence disillusionment
        events_disease_arcs.js    — cholera 19th–20th century arc, TB post-Soviet arc, 1997 Asian crisis personal texture
        events_south_south.js     — South-South migration: Bangladeshis in Malaysia, Zimbabweans in SA + xenophobia, Ghanaians in Libya 2011
        events_interpreter_arc.js — 7 events: colonial translator, tribunal interpreter, military interpreter, danger after withdrawal
        events_teacher_power.js   — teacher in a poor country arc (7 events) + child-of-power arc (5 events)
        events_letters.js         — letters as UI element (isLetter: true): sibling abroad, parent-to-emigrant, gulag censor (pre-2000)
        events_memory_layer.js    — dream/memory layer: age 45–65 replays of timestamped flags with new framing, no choices
        events_roads_not_taken.js — the choice you didn't make: life-review at 38–68, naming the unchosen path (9 events)
        events_seasonal.js        — seasonal event modifiers gating on G.season: harvest, monsoon, Ramadan, Nordic winter, fire summer
        events_oral_tradition.js  — oral report register: events framed as received speech for rural/pre-literate/pre-1980 contexts
        events_career_longevity.js — long-arc career texture: 15–25 years into a field, the change in register, cost of expertise
        events_condition_arc_2.js — chronic condition depth: Deaf culture, HIV pre-treatment, insulin access, COPD, relational disclosure
        events_doctor_arc.js      — deep doctor arc: first death carried, correct-vs-just divergence, late-career erosion
        events_nurse_arc.js       — deep nurse arc: being in the room when the doctor isn't, clinical distance, pandemic shifts
        events_lawyer_arc.js      — deep lawyer arc: legal aid vs justice gap, moral compromise, courtroom texture
        events_journalist_arc.js  — deep journalist arc: source protected, story not written, colleague arrested
        events_engineer_arc.js    — deep engineer arc: building for the long term, the compromise, the failure you carry
        events_dev_arc.js         — deep software developer arc: first thing shipped, ethical corners, burnout, what was built
        events_accountant_arc.js  — deep accountant arc: the person who knows where the money is, access and moral exposure
        events_artist_arc.js      — deep artist arc: interior life of making, the patron system, late-life question of what was made
        events_merchant_arc.js    — deep merchant arc: feel of a market, family business question, the protection that must be paid
        events_police_arc.js      — deep police arc: first time the job is what training said; first time it isn't; corruption as structure
        events_social_worker_arc.js — deep social worker arc: sustained proximity to people the system fails, vicarious trauma
        events_civil_servant_arc.js — deep civil servant arc: procedural authority over individual lives across a career
        events_chef_arc.js        — deep chef arc: food as material, mentor's technique, the body after kitchens
        events_factory_arc.js     — deep factory arc: body as productive unit, solidarity, what remains when the factory closes
        events_farmer_arc.js      — deep farmer arc: seasons as second body, smallholder arithmetic, land as inheritance and burden
        events_laborer_arc.js     — deep laborer arc: body as primary instrument, seasonal work, the long physical toll
        events_driver_arc.js      — deep driver arc: the city known by traffic and hours, carrying strangers, negotiating the road
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
        events_late_life.js       — late-life events (retirement, partner decline, health decline, legacy)
        events_partner_wants.js   — 8 relationship desire tension events
        events_relationship_crossover.js — 8 partnership arc events
        events_fertility.js       — fertility depth events
        events_wound_coping.js    — 8 wound coping events (also in thematic)
        events_body_arc.js        — the body across time: back at 38, glasses at 42, 3am wake at 46, joints at 52, stairs at 70
        events_empty_nest.js      — after children leave: house finding a new shape, partnership reconfigured, late-life meaning
        events_grandparent_arc.js — grandparent arc: what it means to transmit something, what doesn't need words
        events_inheritance_arc.js — inheritance arc: going through the house, estate settlement, sibling dynamics, the object taken
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
        events_japan_war.js       — 32 events: Japan 1937-1952 from inside an ordinary life. The
                                    corpus had 29 Japanese-guarded events and the earliest began in
                                    1945. The national school and the rescript, the tonarigumi, the
                                    temple bell on the cart, the class evacuated three prefectures
                                    away, the ninth of March, the broadcast at noon on the fifteenth
                                    of August, blacking out your own textbook with your calligraphy
                                    brush, the bamboo-shoot existence. 14 of the 32 are follow-through
        events_gulf.js            — 30 events: the two cities in one square kilometre. The roster
                                    already modelled the demography correctly — UAE 59% South Asian,
                                    Qatar 60%, Kuwait 40%, Bahrain 36%, every migrant group flagged
                                    disadvantaged — and across ELEVEN Gulf ethnic ids the corpus
                                    contained ONE reference, with `wealthy_gulf` the worst-covered
                                    archetype in the roster. The kafala content that existed was
                                    written from the sending side (a Nepali village, a broker, a
                                    one-way ticket); the arriving life and the citizen's life were
                                    both unwritten. Both positions, neither as a cartoon: the fee
                                    that becomes the debt, the passport into the bag at the airport,
                                    the shelf that is your whole private property and that nobody
                                    ever touches, the house you built and have only seen in
                                    photographs, forty minutes a week of being a father — and the
                                    pearl collapse of the 1930s, the first shipment, the majlis,
                                    being eleven per cent of your own country, Kuwait 1990 and the
                                    expulsion that followed it, and the Pearl Roundabout demolished
                                    so that nothing was left for anyone to mean by it
        events_guyana.js          — 42 events: the country with one mention. Guyana had a single
                                    guard anywhere in 8,124 events, and that guard named it in a
                                    list of five Caribbean states — for a country whose twentieth
                                    century contains, in one place, most of the forces this game is
                                    about. Indenture from 1838 and the logie with the wall that
                                    stops short of the roof; a single company owning the wage, the
                                    shop, the ship and the estate hospital; the five shot at Enmore
                                    in 1948 and the funeral walk that made Jagan; a constitution
                                    suspended by warship 133 days after the first free vote; a
                                    party split in 1955 that made the surname answer the ballot; the
                                    2,600 families who moved in 1964; a voting system changed from
                                    outside to remove one man; twenty years of rigged boxes and a
                                    ban on wheat flour; Rodney and the bomb in the walkie-talkie;
                                    Jonestown, which is the one word the world knows; the departure
                                    that emptied the villages; and oil in 2015, which so far is a
                                    number on the news. Plus the parts that are not politics: the
                                    seawall with the Atlantic above the road, the bottom house, the
                                    abeer in the street, Bourda. 10 of the 42 are follow-through.
        events_bosnia.js          — 41 events: three peoples, one country, and the thing that is not
                                    symmetrical. Bosnia was named six times in the entire corpus and
                                    had no module; `events_southeast_europe.js`, which the source
                                    tree described as covering the Bosnian war, turns out to hold
                                    four Romanian events and five Serbian ones and no Bosnian guard
                                    at all. Komšiluk and the 1984 Olympics before it; the water
                                    queue, the parquet in the stove, the tunnel under the runway and
                                    Markale inside it; the white armbands and the camps at Prijedor;
                                    the Ferhadija; the Stari Most; Srebrenica; and, because a third
                                    of the characters the engine draws here are Bosnian Serbs, the
                                    conscript on the hillside and the sixty thousand who left the
                                    Sarajevo suburbs in March 1996 with their own dead. Afterwards:
                                    Dayton, two schools under one roof, minority return, the DNA
                                    laboratory, The Hague, and Germany. 11 of the 41 are
                                    follow-through.
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
        [Depth arcs — companion _depth.js files for most base country modules]
        events_afghanistan_depth.js — Taliban 1996 takeover, women's education, 2001 invasion hope period, interpreter arc
        events_angola_depth.js    — musseque life Luanda, Ovimbundu displacement, retornado departure 1975, oil boom
        events_argentina_depth.js — Buenos Aires Jewish community, Malvinas/Falklands, menemismo economy, piquetero 2001
        events_australia_depth.js — Australia depth arc (Stolen Generations follow-through, boat people, culture wars)
        events_bangladesh_depth.js — textile arc, Eid migration, political violence cycles, cyclone preparation ritual
        events_bolivia_depth.js   — War of the Pacific sea loss, Che Guevara La Higuera 1967, Potosí, cholita identity
        events_brazil_depth.js    — capoeira, Candomblé, favela pacification, Bolsonaro, quilombo land claim
        events_cameroon_depth.js  — oil generation, Boko Haram north, Yaoundé, Lions generation, Kondengui, bushfaller
        events_canada_depth.js    — residential school survivor arc, Québécois identity, prairie farming, Vancouver Chinese
        events_colombia_depth.js  — false positives scandal, Medellín transformation, coca farmer's life, peace skepticism
        events_cuba_depth.js      — missile crisis childhood, Nueva Trova, doctor export, dual currency, exit visa era
        events_egypt_depth.js     — October War 1973, Camp David/Sadat assassination, Sisi 2013, Al-Azhar, pound crisis
        events_ethiopia_depth.js  — Adwa legacy, Italian occupation 1935–41, Haile Selassie's fall, Oromia protests 2015–16
        events_iran_depth.js      — Iran-Iraq War trench, nuclear deal, Green Movement 2009, compulsory military texture
        events_iraq_depth.js      — Yazidi identity, Mesopotamian marshes draining, 1991 uprising, Christian minority departure
        events_italy_depth.js     — WWII resistance, DC-PCI anomaly, Vatican II, badanti immigration reception, spread crisis
        events_ivory_coast_depth.js — cocoa child labor, Nouchi culture, Yamoussoukro Basilica, Dozo militia, CFA franc
        events_japan_depth.js     — Okinawa battle 1945, occupation/Article 9, Korean War boom, women's ceiling, Kobe 1995
        events_kenya_depth.js     — matatu culture, Westgate 2013, Rift Valley athletics, Kibera, HELB loans
        events_korea_depth.js     — 1997 IMF crisis, gold collection campaign, jeonse housing, hell Joseon, ppalli ppalli
        events_laos_depth.js      — monarchy fallen 1975, re-education camps, Vientiane generation, Sombath disappearance
        events_libya_depth.js     — Amazigh identity suppressed, Green Book curriculum, US bombing 1986, post-2011
        events_mexico.js          — Tlatelolco aftermath, EZLN 1994, femicide crisis, cartel expansion, Day of Dead
        events_mongolia_depth.js  — Naadam childhood, Genghis Khan rehabilitation post-1990, script revival, Buddhism revival
        events_austria.js         — 13 events: Heldenplatz 1938, the bombing of Vienna, four-power
                                    occupation, the 1955 treaty, the Gemeindebau, Waldheim 1986
        events_adriatic.js        — 18 events: Croatia and Slovenia, one federation and two 1990s
                                    (ten days vs. four years, Vukovar, Oluja, the izbrisani, EU departure)
        events_iceland_moldova.js — 19 events: the two extremes of the small-country range —
                                    airfield wages to a banking collapse; deportation to Padua
        events_oman_pacific_bhutan.js — 19 events: three states opened by one decision, and the
                                    population it was not extended to (Zanzibari returnees,
                                    the francophone half, the Lhotshampa expulsions)
        events_morocco_depth.js   — Skhirat coup 1971, Western Sahara/Sahrawi, Casablanca 2003, Moudawwana reform 2004
        events_mozambique_depth.js — aldeias comunais 1977–82, reeducation camps, landmine generation, cashew collapse
        events_myanmar_depth.js   — Karen/KNU civil war since 1948, jade miners Hpakant, Kachin ethnic minority arcs
        events_namibia_depth.js   — SWANLA contract labor, SWAPO exile, Katutura settlement, border war, Walvis Bay
        events_nepal_depth.js     — Gurkha recruitment tradition, Dalit discrimination, foreign labor, Gorkhaland identity
        events_netherlands_depth.js — Netherlands depth arc (water management, pillarisation, Bijlmeer, Srebrenica debate)
        events_new_zealand_depth.js — New Zealand depth arc (Māori language revival, Treaty reckoning, Pacific Islander arc)
        events_nigeria_depth.js   — NEPA power cuts, WAEC/JAMB exams, Lagos go-slow, EndSARS 2020, Japa emigration
        events_north_korea_depth.js — inminban surveillance, kwan-li-so disappearance, Notel era, Tumen River calls
        events_pakistan_depth.js  — Karachi ethnic violence, Lahore cultural scene, drone strikes Waziristan, blasphemy law
        events_palestine_depth.js — multigenerational camp arc: third-generation key, UNRWA school, camp-as-city
        events_peru_depth.js      — serrano arriving in Lima, Ayacucho under Shining Path, Velasco land reform, cumbia chicha
        events_philippines_depth.js — OFW departure culture, jeepney commute, balikbayan box ritual
        events_philippines_depth_2.js — Marcos wealth recovery, EDSA nostalgia, Mindanao, Duterte drug war texture
        events_poland_depth.js    — martial law daily life, lustration debates, Smolensk crash 2010, PiS era
        events_portugal_depth.js  — Portugal depth arc (retornados from Angola/Mozambique, PREC revolutionary period)
        events_romania_depth.js   — orphanages post-Ceaușescu, post-communist transition, Bucharest earthquake memories
        events_russia_depth.js    — Great Terror 1937–38, Khrushchev thaw, Brezhnev stagnation/blat, kommunalka life
        events_singapore_depth.js — Singapore depth arc (racial harmony performance, NSman arc, dialect suppression)
        events_south_africa_depth.js — Sharpeville 1960, passbook system, Steve Biko 1977, ANC exile, born-free generation
        events_spain_depth.js     — post-Civil War repression, clandestine resistance, Carrero Blanco 1973, Amnesty Law 1977
        events_sri_lanka_depth.js — Sri Lanka depth (LTTE-government duality, Sinhalese-Tamil everyday texture, war end)
        events_sudan_depth.js     — Khartoum's two Niles, haboob seasons, Nuba Mountains bombing, ghost houses under Bashir
        events_tanzania_depth.js  — Zanzibar Revolution 1964, Tanzania-Uganda War 1978–79, TAZARA railway, artisanal gold
        events_thailand_depth.js  — Thailand depth arc (lèse-majesté daily navigation, Buddhist monkhood, Yellow/Red texture)
        events_turkey_depth.js    — September 12 1980 coup, Alevi identity, Sivas 1993, Gezi Park 2013, July 15 2016
        events_ukraine_depth.js   — Donbas identity, Orange Revolution texture, 2022 invasion lived experience
        events_venezuela_depth.js — Bolivarian missions, true believer arc, colectivo, emigrant wave
        events_venezuela_depth_2.js — Chávez 1998 election, Barrio Adentro, petrodollar boom, food scarcity, post-Chávez
        events_vietnam_depth.js   — Doi Moi liberalization, Amerasian children (con lai), Viet Kieu return, coffee generation
        events_zambia_depth.js    — BaTonga displacement by Kariba Dam 1958, Copperbelt mine closures, AIDS orphan generation
      sonder/
        events_sonder.js          — 299 events: STRANGER GLIMPSES + MUNDANE LIFE (contemplative, mem-gated, weight 2)
        events_sonder_2.js        — 40 events: non-Western sensory, body in time, relational drift, weight of time
        events_sonder_3.js        — 34 events: authoritarian life texture, language of small decisions, migration/distance
        events_sonder_4.js        — 36 events: technology as time, the workplace, objects from before, body in weather
        events_sonder_5.js        — 36 events: childhood body memory, language and thought, money and counting
        events_sonder_6.js        — 36 events: night and sleep, weather and season, body at work, waiting
        events_sonder_7.js        — 36 events: food and meals, ceremony and ritual, the street
        events_sonder_8.js        — 36 events: work and purpose, home and objects, weather and seasons, late life
        events_sonder_9.js        — 36 events: childhood memory, language and words, money and want, friendship over time
        events_sonder_10.js       — 36 events: the photograph, the neighbor, what the body learns, faith in small acts
        events_sonder_11.js       — 36 events: the return, animals, what you inherit, the window
        events_sonder_12.js       — 36 events: sound, what you made, the official language, the hour
        events_sonder_13.js through events_sonder_66.js — 54 additional modules, ~30 events each (~1,620 more contemplative events)
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
        [All new followthrough files live in thematic/]
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
        events_followthrough_49.js — aid convoy + received-aid echo; famine survivor texture
        events_followthrough_50.js — anniversary-aware follow-throughs (emigration 5/10/20yr, divorce 5/10yr)
        events_followthrough_51.js through events_followthrough_95.js — 45 additional files covering:
                                      regret threshold arc, Nigeria depth echoes, Vietnam depth echoes,
                                      Brazil/Cuba/Colombia/Peru depth echoes, Poland/Portugal/Romania depth echoes,
                                      Russia/Ukraine/Spain/Italy depth echoes, Australia/NZ depth echoes,
                                      Singapore/North Korea depth echoes, Japan/Korea depth echoes,
                                      Egypt/Iran/Iraq/Sudan depth echoes, Afghanistan/Bangladesh/Pakistan depth echoes,
                                      Sri Lanka/Myanmar/Nepal/Laos depth echoes, Mexico/Argentina depth echoes,
                                      Bolivia/Ecuador depth echoes, Angola/Zambia/Tanzania depth echoes,
                                      Cameroon/Mongolia/Namibia depth echoes, and more
      prison/
        events_prison_life.js     — 16 in-prison events (prisonOk: true)
        events_prison_after.js    — 16 post-release follow-through events
        events_political_prison.js — 8 arrest events: the remark, the pages, the square, the organiser, the journalist's sources, the morality court, the sweep that asks nothing, the refused call-up
  engine/
    [Split into 5 focused modules in PR #105]
    lifeCourse.js             — work, partnering, marriage, children, housing, retirement at
                                era- and place-accurate rates; every hook a no-op if the
                                player has already filled that slot
    gameEngine.js             — core simulation: buildG, advanceYear, emigrate,
                                generateEpitaph, generateIdentityCard, buildYearTexture,
                                buildEffectProxy, resolveProxyExtras, tickPartner, attemptCrime,
                                deriveGenerationalFlags, DESIRE_PATTERNS, applySoundtrack
    yearTexture.js            — the quiet-year prose layer: `textureCandidates` (generator,
                                yields [tier, line]) + `buildYearTexture` (tiered driver)
    mundaneLayer.js           — daily-life texture, pooled; fills the years texture declines
    prose.js                  — what this character has already been told, so a life does not
                                repeat itself (hashed, capped, stored in mem.saidLines)
    names.js                  — one place to draw a person's name, so two people in one life are not
                                the same person. Ten independent pickFrom() calls across four files
                                gave 13% of families two members with the same first name.
    epitaph.js                — the death screen: generateIdentityCard, generateEpitaph,
                                generateLifeNotes. The historical spine comes from
                                `worldEventsFired`, which the engine has been recording all along.
    casinoEngine.js           — UNWIRED. 441 lines of blackjack with hit/stand, slots and
                                roulette. Nothing imports it.
    gangEngine.js             — UNWIRED. 432 lines: ranks, activities, prison gangs, a tick.
                                Nothing imports it.
    lotteryEngine.js          — UNWIRED. 170 lines. Nothing imports it.
                                ─────────────────────────────────────────────────────────
                                These three, plus the stock market in playerActions.js
                                (`buyStock`/`sellStock`/`tickStocks`/`getAvailableStocks`,
                                complete and era-gated), are ~1,150 lines of implemented
                                play that no import reaches. They are from the earlier
                                design — the theme config used to describe itself as
                                "BitLife-inspired" — and the interface rules the project
                                has since committed to argue against a blackjack table and
                                a crypto ticker in a game whose stated mechanic is the
                                sentence that lands. The need they served, that money can
                                move by risk, is met by the gambling and investment
                                activities, which now move real money rather than the
                                wealth stat.
                                Left in place rather than deleted, because that is a call
                                for whoever owns the design. If they are wired, the prices
                                need the era treatment like everything else, and the
                                instrument names ("TechCorp", "CryptoCoin") need to belong
                                to a place and a decade.
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
    countryUtils.js           — getCountryFlag (+ FLAGGED_COUNTRIES, asserted against the
                                roster in tests), REGIME_LABELS/COLORS, RELIGION_LABELS,
                                RESIDENCY_LABELS, getCountryDisplayName (historical names)
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
  check-events.js             — reachability audits: dead guards, identity literals absent from the
                                country the guard requires, phases that truncate their own age band,
                                year windows nobody can be inside, seasons a country cannot have,
                                and `unwritten-group` — populations the roster models that no guard
                                has ever named. That last one has now been wrong in four directions
                                (every unnamed id; shared-`Set` ids invisible to a body scan; every
                                id trivially named because `countries.js` declares them; and a
                                country's own plurality, which is what the country-generic content
                                is already about). It currently skips the plurality, catch-all
                                buckets, and ids reached by a `startsWith` rather than a literal.
  check-anachronisms.js       — plays lives across the eras where a country's present-day category is
                                least like its past (the Gulf before oil, Iceland before broadcasting,
                                Korea before the miracle) and reads every printed line against
                                technology.js. Every line it found on its first run was reachable,
                                correctly guarded and syntactically fine; it was wrong about when the
                                world contained the thing it named.
  sim.js                      — the firing-rate report. The only audit that can see what the game
                                actually does, and the counter-check on every static one.
  check-reach.js              — the conditional counter-check on THAT one. `sim` reports what fires
                                per 100 lives, which reads the same whether the content is
                                unreachable or the population is simply rare — eight career arcs fired
                                zero times across 280 lives because nobody in them became a doctor.
                                This forces the condition and asks what share of the body of work
                                reaches the person it was written for.
  lib/
    sim.js                    — the headless harness. `collectLines` records every prose line with the
                                year and country it printed in; `keepFinalStates` keeps each life's
                                end state for the death-screen checks.
    anachronism.js            — the phrase table that gives a sentence's date away, and the age floors
                                for lines that describe doing something yourself
```

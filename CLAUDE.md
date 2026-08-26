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

Called each year via `advanceYear`. Partner ages +1/year and `partner.years` increments. At age 75+ there's a death probability (increases with age). On death: partner removed, `widowed` or `lost_partner` flags set, death logged in lifeLog. Relationship quality drifts ±1 per year.

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

## The Simulation Contract

Five rules the engine must keep, each of which was broken and is now enforced by
`tests/` and by simulation:

**Health is not a ratchet.** `healthCeiling(state)` sets a plateau from age, the
healthcare of the country the character *actually lives in*, fitness and chronic
conditions; health drifts toward it each year. A shock still hurts and a chronic
condition still lowers the plateau permanently, but a life nobody intervenes in
does not walk to zero. Before this, a passively-read 1962 Nigerian life had a
median death age of **8**; it is now ~66 with ~29% under-5 mortality, which is
what the historical record actually says.

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

146 countries, 251 world events, 7,953 character events (2,127 of them the
contemplative sonder layer, 156 stranger glimpses, 40 prison and political-arrest),
2,771 registered flags, 377 ribbons. **0 orphaned, 0 partial flags.**

Verify with:

```
npm run build          # must pass
npm test               # 240+ tests, including the simulation guardrails
npm run check-flags    # 2735 covered / 0 partial / 0 orphaned
npm run check-events   # reachability audits: dead guards, enum domains, phase and year windows
npm run sim            # firing-rate report — what ACTUALLY fires, per 100 lives
```

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
| Nigeria 1962 median death age | 8 | 60s |

Beyond those: parent death set no flag at all (21+ consumers, zero setters);
events were consumed at display rather than resolution, so closing the tab ate
them; 732 events froze one prose variant per app session; the in-prison pool
required a `prisonOk` field no event set; emigration changed the prose and
nothing else; literacy was a modern snapshot applied to mid-century births; and
birth country was uniform across the roster, so 17% of lives began somewhere with
almost no content.

**The lesson worth keeping: measure what fires, not what exists.** Every failure
above was invisible to a green flag audit. `npm run sim` is the counter-check.

- Full event system descriptions and coverage history: `docs/codebase-state.md`
- Full BUILD-by-BUILD roadmap and MICRO-EVENT DESIGN PRINCIPLE: `docs/roadmap.md`

---

## Source Tree

```
src/
  data/
    countries.js              — 145 countries with full demographic data
    places.js                 — 250+ named places across all countries (scale, region, type, population)
    headlines.js              — ~130 major historical headlines for life log injection
    events.js                 — root event file, imports 463+ modules, exports EVENTS array (~7,550+ total character events)
    [All events are organized into src/data/events/ subdirectories — see below]

    worldEvents.js            — 255 world history events (year+country/archetype gated); 20+ events have `context` fields
    headlines.js              — ~130 major historical headline entries (year-matched, injected as log entries)
    flags/                    — FLAG_REGISTRY split into 6 category files (political, economic, social, personal, historical, identity). 2670 registered flags. Pure data, no imports. Run `npm run check-flags` to derive coverage.
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

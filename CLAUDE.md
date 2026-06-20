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

103 countries, 240 world events, 232+ event modules (~4,200+ events), 1,365+ registered flags, 314 ribbons. Last major work: PR #101 (ongoing) — MODE A: Mali character arc (events_mali.js, 10 events, 9 year-texture blocks, 2 world events, 12 flags); MODE C: context fields completed for all 240 world events (0 missing). Previous PRs: PR #95 MODE A: Jamaica + Trinidad (events_caribbean.js), Guinea (events_guinea.js), Mongolia (events_mongolia.js); PR #96 MODE A: Eritrea (events_eritrea.js); MODE B: political leaning consequence arc (events_political_arc.js); PR #97–100 MODE A/B/C: Egypt depth, India Partition, Fiji, bonded labor, sex work, aid worker, HCR, legacy year texture rewrite, world events context field completion. Run `npm run check-flags` to audit flag coverage.

- Full event system descriptions and coverage history: `docs/codebase-state.md`
- Full BUILD-by-BUILD roadmap and MICRO-EVENT DESIGN PRINCIPLE: `docs/roadmap.md`

---

## Source Tree

```
src/
  data/
    countries.js              — 103 countries with full demographic data (covers all major regions; recent adds: Armenia, Azerbaijan, Australia,
                                Belarus, Canada, Czech Republic, Ecuador, Estonia, Georgia, Germany, Greece, Hungary, Italy, Japan,
                                Laos, Latvia, Lithuania, Malaysia, Namibia, Netherlands, New Zealand, North Korea, Norway, Palestine,
                                Paraguay, Peru, Philippines, Poland, Portugal, Romania, Russia, Rwanda, Saudi Arabia, Serbia,
                                Singapore, South Korea, Spain, Sweden, Taiwan, UAE, Ukraine, Uruguay and more across PRs #69–92)
    places.js                 — 250+ named places across all countries (scale, region, type, population)
    headlines.js              — ~130 major historical headlines for life log injection
    events.js                 — root event file, imports 225+ modules, exports EVENTS array (~4,000+ total character events)
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
    events_followthrough.js   — 25 flag follow-through events
    events_followthrough_2.js — 18 additional flag follow-through events
    events_followthrough_3.js — 8 follow-through events: recovery one year on, faith settled, bereaved holiday, child-out years, integrity tested, meaning tested, close friend decade — cross-cutting quality-of-life follow-throughs
    events_relationship_quality.js — 13 relationship quality threshold events
    events_desires.js         — formative wound events + decade reflections (30/40/50/60)
    events_small_life.js      — named friendships, first crushes, formative teachers, first home
    events_activity_payoffs.js — downstream consequences for activity flags
    events_places.js          — place-based events (moves, arrival texture, migration)
    events_infrastructure.js  — infrastructure events (power cuts, floods, traffic, water shortage)
    events_dying_city.js      — Rust Belt + post-Soviet urban decline arc
    events_cities.js          — city-specific texture (Lagos, Mumbai, Cairo, Mexico City, Moscow)
    events_cities_extended.js — extended city texture across more cities
    events_rural_texture.js   — rural/suburban texture (water walk, electrification, brain drain)
    events_post_soviet.js     — 15 post-Soviet arc events (communist childhood, 1990s collapse, oligarch split, emigration wave)
    events_vietnam.js         — 10 Vietnam arc events (Saigon fall, re-education, boat people, Doi Moi, Viet Kieu)
    events_wealth_system.js   — 17 wealth mechanics events (banking, ROSCA, hyperinflation, poverty trap, patron-client)
    events_money.js           — 7 money-across-a-life events (first paycheck, inheritance, elder scam, hyperinflation personal, gift, counting days)
    events_illness.js         — 14 chronic illness events (diabetes, heart disease, cancer, COPD, back pain, HIV/AIDS, vision/hearing loss, depression, disability)
    events_parent_care.js     — 8-event parent care arc (first sign → final decline + killParent)
    events_climate.js         — 18 climate arc events (2025–2100): heat, drought, flooding, displacement, Pacific extinction, late-life witness
    events_indigenous.js      — 21 Indigenous peoples events: Aboriginal Australian, Native American, First Nations, Māori arcs
    events_automation.js      — 12 automation/AI arc events (2025–2050): career-specific disruption + UBI debate
    events_country_arcs.js    — 22 country arc events (BUILD 10): Nigeria (coup radio, first-gen degree, Biafra colleague), India, Egypt, Romania, Turkey, Kenya, Ghana, Ethiopia, South Korea deep texture
    events_country_arcs_2.js  — 36 country arc events (BUILD 10 cont.): China Mao era (Great Leap, struggle sessions, hukou, reform euphoria, leftover woman, Hui Muslim), USA (Great Migration, Civil Rights, Vietnam, McCarthy, opioids, Rust Belt), Japan (hibakusha, Anpo, Minamata, salaryman, bubble)
    events_country_arcs_3.js  — 13 country arc events: Iran (SAVAK/revolution/purge/war), South Africa (township/TRC), France WWII (occupation/Vel d'Hiv/liberation), Nigeria/Biafra
    events_arts.js            — 9 arts-under-pressure events: samizdat arcs, jazz/bebop refusal, Nollywood entry + decade, censored artist stay-or-leave, unshown work, artistic integrity echo
    events_asia_arcs.js       — 22 events: Cambodia (Khmer Rouge evacuation, Year Zero, denunciation, Vietnamese liberation, survivor silence, UNTAC election, ECCC tribunal, missing generation), Bangladesh (Liberation War, flood annual, garment worker, Rana Plaza, cyclone, microfinance, remittance), Pakistan (Muhajir arrival, East Wing war, Zia Islamisation, blasphemy law)
    events_crosscutting.js    — 22 cross-cutting arc events: domestic worker (7 events, developing_urban archetype, global care chain); city under bombardment (8 events, conflict_zone/developing_unstable, survival + memory); refugee camp childhood (7 events)
    events_decolonisation.js  — independence generation events: independence morning (country-specific word — uhuru/freedom/indépendance/istiqlal), first coup shock, brain drain, structural adjustment, mobile leapfrog; fires for subsaharan/developing archetypes 1956–1975
    events_drc.js             — 10 DR Congo arc events: Lumumba independence speech 1960, assassination news, Mobutu Authenticité era, Zaire name change, first Congo War 1996, coltan mine labour, DRC civil war survival, post-war Kinshasa, late reckoning
    events_early_life.js      — 20 early childhood + young adult events (BUILD 6): early_childhood (ages 0–5) from child's limited perspective; young_adult 18–25 sub-phase texture (first flat, first serious job, ideology formation, the friend group, leaving home)
    events_internet_era.js    — early internet era texture events: PC bang Seoul, cybercafé Lagos, AOL dial-up Iowa, early web access across archetypes (1993–2005)
    events_labor.js           — labor and union arc events (BUILD 20): union card, picket line, collective action, automation threat, strike, solidarity, management crossing the line, post-union generation; fires across archetypes gated on career type and era
    events_latin_america.js   — 60+ events: Chile (DINA silence, exile decision, interrogation, plebiscite 1988, Rettig reckoning, 2019 Estallido); Argentina (disappeared colleague, proceso complicity, Falklands family, Nunca Más, CONADEP testimony, Nietos de Plaza de Mayo, 1978 Mundial contradiction); Brazil (AI-5, Tropicália, economic miracle paradox, Diretas Já, evangelical rise, 2014 heartbreak); Colombia (cartel adjacency, cartel offer, kidnap culture, displacement, city transformation, FARC peace); Mexico (PRI machine, 1985 earthquake, 1982 devaluation, Zapatista 1994, maquiladora, Tlatelolco 1968, dirty war, PRI falls, narco era, femicidio, Ayotzinapa 2014, 2017 earthquake); Operation Condor cross-country (exile warned, exile network, return possible)
    events_zimbabwe.js        — 10 Zimbabwe arc events: white farming family land seizure + Black Zimbabwean land reform perspective, hyperinflation (100 trillion dollar bill), exodus south to South Africa, Mugabe early era, Gukurahundi 1982–87 (20k Ndebele killed), Murambatsvina 2005 urban clearance, Mugabe fall 2017, Gukurahundi late reckoning, hyperinflation memory
    events_followthrough_4.js — 10 orphaned flag follow-throughs: caste ceiling, scandal resurfaces, betrayal trust, harvest pantry, civil war echo, ethnic identity at work, dissident reader cost, refugee anniversary, political active cost, dissident writer risk
    events_followthrough_5.js — 12 events: 8 BUILD 40/orphan follow-throughs + 4 famine arc events (BUILD 49)
    events_informal.js        — 18 informal economy events (BUILD 35): hawker/moto-taxi/market-stall/day-labor/subsistence tracks, mobile money, savings circle, formalization flip
    events_neighborhoods.js   — 16 neighborhood-tier events (BUILD 32): standpipe, settlement fire, slumlord, gang block, moving-up guilt, elite isolation, gentrification return
    events_postrelease.js     — 12 post-release events (BUILD 48): release morning, job checkbox, housing bar, parole, recidivism trap, USA rights lost, spent conviction, decade clean, political prisoner dignity
    events_mentor.js          — 10 mentor arc events (BUILD 47): mentor deepens, favor, estrangement, death, echo; becoming mentor, protégé surpasses/betrayal, both arcs, teacher echo
    events_adolescence_2.js   — 22 adolescence depth events: first job, curfew break, authority clash, exam results, scholarship test, dropout temptation, peer betrayal, rumour, peer death, diaspora identity, family honour, faith doubt at home, peer pressure, first smoke, shoplifting, social media pressure, body image, leaving question, privilege mirror, school fight, community service
    events_childhood_texture.js — 19 childhood texture events: universal small-life for ages 6–17
    events_family_silence.js  — 20 generational memory events: "what your parents didn't say" gated on trauma flags
    events_dying_arc.js       — 6 final-years events: age 75+, the consciousness of approaching death
    events_solo_life.js       — 8 solo-life events: unpartnered texture across all phases
    events_coherence.js       — 11 coherence follow-throughs: orphaned flag callbacks
    events_poverty.js         — 43 financial hardship events: eviction, repossession, homelessness, welfare
    events_pregnancy.js       — 13 pregnancy arc events: first-trimester, birth (archetype/GDP/year-branched), postpartum
    events_menopause.js       — 5 menopause arc events: female 45–58, culturally-branched
    events_career_arcs.js     — 19 deep career arc events: athlete, academic, chef/hospitality
    events_social_media.js    — 9 social media arc events: country-specific platforms, excitement→damage arc
    events_scandinavia.js     — 8 Nordic events: welfare state, Norway oil, Finland Winter War, Janteloven
    events_palestine.js       — 14 Palestine character events: Nakba memory, checkpoint, demolition, intifadas, Oslo hope/collapse, education resistance; +6 added: refugee camp generations, olive harvest, administrative detention, water rationing, Gaza bombardment, late return question
    events_gang.js            — 10 gang/organised crime arc events: post-Soviet bratva, Lagos Area Boys, cartel
    events_social_capital.js  — 8 social capital events: charisma/looks as era-dependent resources
    events_world_response.js  — 6 world event response events: character choices in year of major world events
    events_emigrant_integration.js — 7 emigrant integration arc events: staged by yearsAbroad (yr 1 through yr 12+)
    events_intimacy.js        — 12 sex and intimacy arc events: sexual revolution arc, long marriage desire shift, affair temptation/not-taken, late love arriving, sexuality without vocabulary, body in late life, first love ending
    events_school.js          — 11 school institution events: resource-poor classroom, teacher unpaid + echo, shared textbook, scholarship arrival + lunch table + payoff, war-zone school choice, national exam + echo
    events_followthrough_6.js — 11 follow-throughs for BUILD 45/46/38/23 orphaned flags: first love reflection, liberation generation late, long marriage late, intimacy without vocabulary echo, scholarship declined wonder, war school echo, raised-by-extended-family loyalty, understood-the-cost, witness-to-exodus
    events_children_abroad.js — 7 events: parent departs, grandmother texture, birthday call, package with wrong sizes, reunion stranger, cost accounting, midlife cycle repeating
    events_stayed.js          — 5 events: watching departures, country empties, sibling visits, still connected, late reckoning on staying
    events_sport.js           — 11 events: local match, cricket school, watching with parent, scout arrives, window closes, cricket empire, World Cup year, adult league, last game, teaching the game, cricket legacy
    events_disasters.js       — 8 events: Bangladesh flood season (cooldown), bad flood year, flood from distance, earthquake preparedness, earthquake experience, typhoon season (cooldown), typhoon bad year, living with the knowledge
    events_followthrough_7.js — 11 follow-throughs for sport + disaster + world event flags: sport path closed, stopped playing, World Cup teaching, flood echo, earthquake late, storm dignity, bhola×liberation, Tangshan memory, cricket generation
    events_followthrough_8.js — 12 named-callback and desire/growth-tension events: crossed-line midlife, solidarity late, knows_failure reframe, childhood object midlife, compromised late, art-drawer choice; desire forks for prove_worth/be_seen/belong/connection/safety/freedom
    events_activity_choice.js — 16 activity practice counter → story events: writing/music/running/art/reading/cooking/meditation arcs, creative identity synthesis
    events_project_arc.js     — 7 project milestone events: middle doubt, someone notices, the stall, clarity moment, late reflection, the race, writing shown
    events_industrial.js      — 9 industrial disaster events (BUILD 21): Chernobyl liquidator arc, Bhopal settlement follow-through, pollution as class (river/factory/Niger Delta)
    events_followthrough_9.js — 17 follow-through events (PRs #69–72): genocide_survivor legacy, miscarriage arcs (3-event chain), torture_survived for political prisoners, traumatized_by_violence echo
    events_followthrough_10.js — 13 follow-through events: OFW flag orphans (ofw_gulf passport-held, ofw_hongkong, ofw_italy, ofw_runaway, ofw_broker_debt), Algeria intellectual_target callback, decennie_noire_memory
    events_followthrough_11.js — 37 orphaned flag follow-throughs: institutional complicity, debt recovery, earthquake anniversary, Kurd state pressure, uyghur suppression echo, veteran solidarity, medical debt, kafala, military reunion, and 28 more
    events_followthrough_12.js — 8 desire-unfulfillment events: what happens in late life when prove_worth/belong/be_seen/safety/connection/leave_mark/freedom/redemption go unsatisfied
    events_clergy.js          — 11 events (BUILD 17): Catholic priest rural Ireland 1940–80 (ordination, parish power, laundries knowledge, collapse); Buddhist monk Cambodia pre/post-Khmer Rouge; imam under Suharto; yeshiva student 1960s Jerusalem
    events_soldier_arc.js     — 12 events (BUILD 9): deployment orders, first week, the friend, the order, return home, not sleeping, the question, veteran recognition, anniversary, physical cost, telling children, late reckoning; DEPLOYMENT_CONTEXT helper
    events_documents.js       — 8 events (BUILD 25): Rwanda 1994 ID checkpoint (Hutu/Tutsi branch), Soviet propiska, Nansen passport, statelessness, colonial census creating ethnic categories
    events_central_asia.js    — 10 events (BUILD 13): Kazakh nomad collectivisation 1928–36 (livestock list, the animal that disappears from the register), Uzbek cotton monoculture/Aral Sea, Kyrgyz 1991 collapse, Kazakhstan oil boom
    events_indonesia.js       — 10 events: May 1998 ethnic Chinese riots (Jakarta, the choice to flee/shelter/stay), Reformasi arc, 35-year cultural expression ban lifting, Chinese Indonesian identity decade follow-through
    events_kurdish.js         — 12 events (BUILD 7): Turkish language ban in schools (pre-1991), PKK question, village evacuation 1990s, Syrian citizenship stripped 1962, Anfal campaign 1988, Rojava 2012+; world event: anfal_campaign_1988
    events_debt.js            — 14 events: consumer credit spiral (wealthy_west), microfinance trap (Bangladesh/India), IMF structural adjustment as personal experience, medical debt (USA), decade-clean follow-through
    events_adoptee.js         — 5 events (BUILD 36): transracial identity, DNA test 2010+, search decision, origin trip as adult, the thing that doesn't resolve
    events_senegal.js         — 5 events (BUILD 14 West Africa): Grand Magal pilgrimage, marabout authority, dahira networks, Barca Walla Barsakh migration
    events_morocco.js         — 8 events (BUILD 14): Years of Lead, Amazigh recognition 2011, Equity and Reconciliation Commission, Strait of Gibraltar crossing
    events_sri_lanka.js       — 8 events (BUILD 26): Black July 1983 (Tamil + Sinhalese perspectives), civil war, LTTE, Tamil diaspora 2009, 2022 economic collapse
    events_haiti.js           — 10 events (BUILD 11): Tonton Macoutes, debt of independence, 2010 earthquake, diaspora obligation
    events_rohingya.js        — 8 events (BUILD 7): 1982 statelessness law, pre-2017 restrictions, August 2017 clearance operations, Cox's Bazar camp life 5 years in
    events_uyghur.js          — 3 events (BUILD 7): Ramadan restrictions, re-education camp "vocational training", diaspora silence
    events_tanzania.js        — 7 events (BUILD 26): Ujamaa villagisation, Arusha Declaration, Tanzania-Uganda War, Swahili education, structural adjustment, Nyerere death 1999
    events_multilingual.js    — 7 events (BUILD 41): parent-child language gap, language death, code-switch identity, lingua franca advantage, minority language as political act, interpreter's impossible word
    events_ofw.js             — 15 events (BUILD 38 extension): Philippines OFW worker perspective — decision, POEA documentation, departure, destination-specific texture (Gulf kafala/HK domestic/Italy elder care), complications, return, late reckoning
    events_algeria.js         — 13 events (BUILD 43): Décennie Noire 1991–2002, historical ambiguity preserved, intellectual targeting, journalist survival, 20-years-later memory
    events_lebanon.js         — 14 events: civil war stairwell community (1975–90), sectarian geography, militia checkpoints, Hariri reconstruction 1990s, 2019 bank freeze, economic collapse, Beirut port explosion 2020
    events_puerto_rico.js     — 2 events: Hurricane Maria 2017 (death toll gap 64 vs. 2,975), colonial status (American citizen who cannot vote for president)
    events_central_america.js — 14 events: El Salvador/Guatemala/Honduras/Nicaragua civil wars, liberation theology, the disappeared, truth commissions, MS-13 gangs, Hurricane Mitch 1998, migration north
    events_egypt.js           — 7 events: Nasser dream/Suez 1956, Naksa defeat 1967, Sadat infitah, Mubarak emergency law, bread riots 1977, Tahrir 2011, post-Tahrir disillusionment 2012–16
    events_ethiopia.js        — 7 events: Red Terror 1977–78, 1984 famine, Derg fall 1991, Orthodox fasting calendar, coffee ceremony, Addis Ababa growth 2010s, red terror memory echo
    events_india.js           — 7 events: Emergency 1975–77, Sikh massacre 1984, liberalisation 1991, Babri Masjid 1992, Gujarat riots 2002, call centre generation, demonetisation 2016
    events_ireland_turkey.js  — 11 events: Ireland (emigration wave 1950–1990, The Troubles texture, church relationship, language loss); Turkey (Kurdish identity suppressed, Atatürk modernisation, lèse-majesté café politics, diaspora return)
    events_kenya.js           — 7 events: Harambee communal self-help, Moi single-party rule, multiparty 1992+, ethnic patronage, 2007–08 election violence, M-Pesa mobile money, Nairobi migration
    events_korea.js           — 14 events: hagwon education childhood, suneung exam, military conscription + return, Gwangju uprising 1980, chaebol work culture, Hallyu cultural pride, compressed modernisation generation; depth adds: post-war poverty childhood 1950–65, Park Chung-hee development bargain 2-choice, DMZ separated family
    events_pakistan.js        — 9 events: Muhajir displacement from Partition, 1971 Bangladesh war, Karachi ethnic violence, Zia Islamisation, nuclear tests 1998, Kargil war texture
    events_southeast_europe.js — 9 events: Yugoslav identity collapse, ethnic nationalism, Bosnian War 1992–95 (Srebrenica genocide), Kosovo War 1998–99, refugee flows, war crimes tribunal, rebuilding
    events_west_africa.js     — 16 events: Nkrumah Ghana independence, Senghor Senegal, Biafra famine 1967–70, Liberian civil war, Sierra Leone RUF/diamonds, Côte d'Ivoire instability, decolonisation aftermath; Nigeria (oil boom 1973–81, SAP 1986, Saro-Wiwa 1995, 419 scam culture, EndSARS 2020); Ghana depth (Nkrumah first-gen education, 1966 coup disillusionment, brain drain witness 2-choice)
    events_uganda.js          — 7 events: Amin dictatorship 1971–79 (300K dead), liberation war, Obote return, Museveni NRM era, HIV/AIDS 1980s–90s, child soldiers (LRA), refugee camps
    events_somalia.js         — 7 events: Siad Barre socialism, civil war collapse 1991, "Black Hawk Down" 1993, Al-Shabaab 2007+, drought/famine cycle, piracy era, diaspora identity
    events_thailand.js        — 6 events: Thammasat massacre 1973, democratic transition, Chakri dynasty centrality, coups (including 2014), lèse-majesté law, Red/Yellow political conflict
    events_myanmar.js         — 7 events: Ne Win socialist isolation 1962–88, 8888 Uprising, Saffron Revolution 2007, Cyclone Nargis 2008, quasi-civilian 2011–21, February 2021 coup
    events_nepal.js           — 6 events: Maoist People's War 1996–2006, King Gyanendra coup 2005, monarchy ends 2008, April 2015 earthquake, Gulf labor migration + kafala system
    events_jordan.js          — 6 events: Palestinian family displacement (Nakba/1967), Black September 1970, King Hussein 47-year reign, Wadi Araba peace 1994, Syrian refugees 2011+, wasta system
    events_angola.js          — 6 events: independence civil war (MPLA vs UNITA), 27-year war (500K dead), landmines, peace 2002, oil boom, Dos Santos authoritarian rule
    events_libya.js           — 6 events: Gaddafi Jamahiriya 1975–90, Lockerbie/sanctions, rehabilitation 2003–11, February 2011 uprising, NATO intervention, post-Gaddafi fragmentation
    events_afghanistan.js     — 6 events: Soviet occupation 1978, civil war, Taliban rule 1996–2001, 2001 hope, US withdrawal, Taliban return 2021
    events_sudan.js           — 6 events: Nimeiry coup 1969, Darfur genocide 2003–08, South Sudan independence 2011, al-Bashir dictatorship, regional proxy wars, humanitarian crisis
    events_tunisia.js         — 6 events: Ben Ali dictatorship 1987–2011, Jasmine Revolution 2011, constitutional moment, economic hardship, Islamic/secular tensions, post-2011 stability
    events_zambia.js          — 6 events: Kenneth Kaunda independence + UNIP, copper economy volatility, Rhodesian Bush War, structural adjustment 1990s, multiparty politics, rural/urban divide
    events_mozambique.js      — 6 events: FRELIMO independence, Machel era, RENAMO civil war (South African destabilisation), Machel crash 1986, Rome Accords 1992, Cyclone Eline 2000
    events_yemen.js           — 6 events: Yemen War 1962–70, Saudi-Houthi conflict 2004+, 2015 Saudi-UAE intervention, humanitarian collapse (cholera/famine), refugee flows, Aden fragmentation
    events_china.js           — 26 events: Cultural Revolution sent-down youth, gaokao, one-child policy, Tiananmen 1989, rural-urban migration, private business, social credit, zero-COVID, lying flat; +10: Great Leap famine, struggle sessions (target/witness), hukou barrier, reform euphoria, 996 burnout, leftover woman pressure, Hui Muslim identity, Xi-era tightening, sent-down intellectual echo
    events_korea.js (see above)
    events_gifted.js          — gifted arc (35+ events): manifestation (5 types), recognition + structural ceiling, door opens/closes/underground, young adult divergence (civil rights channel, community mentor, first public moment), extraordinary talent peaks, midlife reckoning, late-life accounting
    events_gifted_2.js        — gifted arc depth: Gould arc (gift never named, parallel unlived life, cotton field accounting), generational transmission, prodigy cost, exploitation (contract trap, stolen credit), diaspora unlock, late-bloomer return, full realization path
    events_gifted_3.js        — gifted arc extension: parental dismissal, public prodigy performance, academic olympiad path, gender × gift intersection, gift + disability intersection, elite recognition (world stage, major prize, after-peak reflection)
    events_disability.js      — 18 disability arc events: birth disability (diagnosis, school, adolescence, employment barriers), Deaf arc (cochlear implant choice, Deaf community, hearing world navigation), acquired disability (event, rehabilitation, grief, new normal), progressive worsening, cross-cutting (inaccessibility, cure offered, tech equaliser, late-life disability)
    events_addiction.js       — 14 addiction arc events: first use, spiral, rock bottom (overdose/death possible), recovery attempt, relapse, long-term sobriety, family members of addicts
    events_dementia.js        — 9 dementia arc events: personal dementia (first signs, diagnosis, advance planning, clarity windows); caregiver arc (parent's signs, diagnosis, care decisions, parent doesn't recognize you, final stage, grief after)
    events_divorce.js         — 11 divorce arc events: long ending, legal process, children/coparenting, first year after, dating again, long integration (5+ years), adult children reconciliation
    events_celebrity.js       — 7 celebrity arc events: public self, parasocial relationships, media scrutiny, cancellation risk, exit strategies, reclamation of private life at midlife
    events_child_soldier.js   — 9 child soldier arc events: abduction, indoctrination, the order (kill/refuse choice), liberation, DDR reintegration, civilian difficulty, moral injury reckoning, late-life closure
    events_teacher_arc.js     — 9 teacher life arc events: calling moment, classroom reality, difficult student connections, burnout, mentoring next generation, systemic barriers, legacy, retirement
    events_wwi_depression.js  — 10 WWI/Depression arc events: trench experience 1916–18, coming home changed, economic collapse 1929, Dust Bowl 1930s, Hooverville, union organising, breadline survival, veteran arc, wife's sacrifice, late-life reckoning
    events_wound_coping.js    — 8 wound coping events: avoidance, performance/perfectionism, care-taking, intellectualizing, spiritualizing, community/connection, professional help — tested at adolescence (16) and young adult (25)
    events_condition_arc.js   — 8 chronic condition lifecycle events: 3-year transition to chronic, unmanaged consequences, management milestone, compound body (2+ conditions), decade-managed milestone, HIV undetectable, depression recalibration, back pain identity
    events_early_childhood.js — 13 early childhood depth events (ages 0–5): grandparent keeper, first small loss, market day, religious sound as home, water walk, parent rhythm, poverty known early, war texture
    events_life_skeleton.js   — 4 guaranteed narrative beats at ages 15/30/40/55 (desire-gated): first test, midlife reckoning, legacy consideration, late-life accountability tied to core wound
    events_phase_entries.js   — 3 life phase transition events: adolescence arrival (13–15), young adulthood (20–22), midlife (38–42) — thematic reflections on what each phase asks
    events_partner_wants.js   — 8 relationship desire tension events: wanting children, unwilling to commit, wanting escape, unfulfilled intimacy, conflict, compromise at midlife
    events_relationship_crossover.js — 8 partnership arc events: first meeting, intimacy deepening, conflict emergence, commitment test (stay/leave), repair, long partnership texture (5–10yr), marriage milestone (25yr+), post-divorce/widowhood path
    events_followthrough_13.js — 10 follow-through events (Mode C): institutional_power reckoning, clergy_adapted late witness, yeshiva secular bridge, amazigh recognition post-2011, multilingual inheritance, minority language grandchild, Kurdish Europe return question, Moroccan diaspora arithmetic, Mouride diaspora dahira, debt-zero milestone
    events_syria.js           — 8 events for Arab Syrian arc (excludes Kurdish Syria): Ba'ath childhood, Hama 1982, Damascus Spring 2000–01 (2 choices), March 2011 uprising (3 choices), checkpoint daily life 2012–19, displacement decision (leave/stay), Europe arrival, late-life reckoning for those who stayed
    events_child_death_arc.js — 11 events for the child death arc: infant death trigger (archetype×era probability), first weeks (objects/room), telling new people, room decision (keep/change), try again (3-choice), surviving siblings, anniversary, cohort flash (seeing them in others), marriage reflection, late-life reckoning "who they would have been", the unsaid thing
    events_israel.js          — 13 events for Israeli arc (Jewish and Arab citizen): founding memory, Mizrahi ma'abara (1949-72), IDF mandatory service (combat/support), Yom Kippur War 1973, Soviet Jewish aliyah 1990s, Ethiopian aliyah (Operations Moses/Solomon), Rabin assassination 1995, second intifada civilian experience 2001-05, settlement choice, Arab citizen divided identity, Oct 7 2023, post-Oslo despair
    events_armenia_azerbaijan.js — 15 events: Armenian Genocide memory, Karabakh wars (both perspectives), Black January 1990 Baku, dark winter blockade 1991–95, 2020 Nagorno-Karabakh war
    events_australia.js       — 8 events: White Australia Policy, Vietnam conscription lottery, The Dismissal 1975, Port Arthur 1996, Tampa 2001, mining boom, SSM postal survey 2017
    events_baltic.js          — 6 events: Soviet deportations, Russification, song festival resistance, January 1991 independence, Russian minority, EU emigration
    events_bangladesh.js      — 9 events: Bhola cyclone 1970, Liberation War 1971, 1974 famine, Mujib assassination 1975, garment economy + Rana Plaza 2013, Grameen Bank, 2024 student uprising
    events_belarus.js         — 8 events: WWII partisan memory, Chernobyl 1986, independence 1991, Lukashenko consolidation 1994, 2020 election fraud + crackdown
    events_brazil.js          — 9 events: favela ecosystem, military dictatorship 1964–85 (AI-5, economic miracle paradox), abertura opening, Diretas Já 1984, racial democracy myth, Amazon politics
    events_canada.js          — 8 events: October Crisis 1970, Charter 1982, Meech Lake failure, Quebec Referendum 1995, TRC 2015, Chinese head tax, housing affordability crisis
    events_central_europe.js  — 9 events: Hungary 1956 uprising + Soviet re-occupation + Kádár goulash communism + 1989 border opening; Czech Republic normalization + Charter 77 + Velvet Revolution + lustration
    events_colombia.js        — 9 events: El Bogotazo 1948, La Violencia (200k dead), FARC/ELN guerrillas, Medellín cartel/Escobar, paramilitaries/AUC, 7M internally displaced, estratificación class, 2016 peace accord
    events_cuba.js            — 8 events: revolutionary-generation childhood, Bay of Pigs 1961, Mariel boatlift 1980, Santería under atheist state, libreta ration-book, Raúl reforms 2008–17, Obama thaw, July 2021 protests
    events_desire_resolution.js — 8 events: positive fulfillment paths when core wounds/desires are meaningfully pursued and met across all 8 desire types
    events_followthrough_14.js — 13 follow-through events: USA late reckoning (Jim Crow generation, Vietnam generation), Australia political continuities
    events_followthrough_15.js — 14 follow-through events: Japan salaryman retirement, Latin America long-arc (Argentine, Colombian, Peruvian) late echoes
    events_followthrough_16.js — 5 follow-through events: Russia late-life callbacks (Soviet-Afghan War echoes, Chechen generation, Ukraine exile, Bolotnaya protest witness)
    events_followthrough_17.js — 3 follow-through events: South Africa Soweto generation late witness, Ukraine Euromaidan generation legacy
    events_followthrough_18.js — 8 follow-through events: Romania Securitate files opening/informer reckoning, Vietnam/Korea late registration
    events_followthrough_19.js — 6 follow-through events: Central Europe: Hungarian 1956 fiftieth anniversary (2006 riot recontextualization), Czech normalization late accounting
    events_followthrough_20.js — 4 follow-through events: Baltic states deportation family memory late reckoning, official memorialization, naming as acknowledgment
    events_followthrough_21.js — 3 follow-through events: Georgia April 9 memorial + 2024 protest convergence, Abkhazia displacement legacy, avenue as accumulated history
    events_followthrough_22.js — 6 follow-through events: Armenia/Azerbaijan: Karabakh veteran 2020 war echo, dark winter power-cut PTSD trigger
    events_georgia.js         — 10 events: April 9 1989 Tbilisi massacre, independence/civil war, Abkhazia conflict, Rose Revolution 2003, 2008 Russia-Georgia war, 1990s collapse, supra culture, Saakashvili reforms, Orthodox identity, EU dream
    events_germany_france.js  — 9 events: Germany Gastarbeiter arc, DDR daily life, reunification, 2015 refugee crisis; France Algerian war, banlieue texture, Charlie Hebdo/Bataclan 2015
    events_greece_portugal.js — 11 events: Greece Colonels' junta 1967–74, Polytechnic uprising 1973, metapolitefsi transition, debt crisis 2010–18; Portugal Estado Novo 1926–74, colonial wars, Carnation Revolution 1974, retornados, EC accession 1986
    events_india_depth.js     — 12 events: arranged marriage meetings (the family committee), joint family invisible economy, language identity (Hindi/English/regional), dowry pressure, first-generation pressure, NRI return question; Swachh Bharat Abhiyan rural toilet transition 2014+
    events_iran.js            — 7 events: Khatami reform era 1997–2005 (press freedom/student uprising), sanctions economy (95% rial devaluation), private/public split (rooftop parties, satellite dishes), hijab enforcement, brain drain
    events_sick_child.js      — 9 events (BUILD 9): parent of seriously ill child arc — diagnosis (archetype-branched), hospital texture, partner under pressure (choice), ward community, career eclipse, recovery path, chronic path, late follow-through (who they became / still being needed); 3 ribbons
    events_cambodia.js        — 8 events: Cambodia depth arc — rural Year Zero witness, family taken for re-education (killParent), post-liberation Phnom Penh return, living alongside perpetrators 1985–2003 (2-choice), second-generation silence arc (2-choice), landmine landscape (era-branched), Tuol Sleng museum visit, late-life reckoning; 8 year-texture blocks in gameEngine.js
    events_caribbean.js       — 14 events: Jamaica (garrison childhood, Rasta worldview, 1980 election violence 800 dead, Windrush emigration decision, area don moral economy, reggae generation, late reckoning + 2 follow-throughs); Trinidad and Tobago (Carnival as institution, oil boom 1973–86, ethnic Indo/Afro politics, 1990 Muslimeen coup, steelband oil drum origin)
    events_burkina.js         — 8 events: Burkina Faso arc — Thomas Sankara 1983 revolution (name change, women's rights, literacy), assassination 1987, Compaoré accommodation era, 2014 Uprising (Blaise ousted), 2015 gendarmerie coup attempt, Sahel jihadist crisis 2015+, coup 2022, displacement crisis
    events_guinea.js          — 13 events: Guinea-Conakry arc — 1958 No vote (95% independence), French revenge withdrawal, Sékou Touré PDG apparatus 1958–84, Camp Boiro political prison (survivor/loss branches), educated class exile/stay, Conté coup morning 1984 (48-hour gap), 2009 stadium massacre; 6 late-life follow-throughs
    events_mali.js            — 10 events: Mali arc — ancient empire identity (Mansa Musa, Timbuktu universities), CMDT cotton economy (2 choices), Traoré 23-year dictatorship (2 choices), 1991 democratic revolution (2 choices), Tuareg identity nomadic/settled fork, 2012 Sanogo coup, Timbuktu manuscript rescue, Operation Serval (2 choices), Sahel late reckoning; 9 year-texture blocks
    events_mongolia.js        — 12 events: Mongolia arc — nomadic herder childhood (ger assembly, terrain knowledge), 1937–38 Stalinist purge family memory (22k killed, 700 monasteries), negdel collective life, 1990 democratic revolution (Sukhbaatar Square), negdel dissolution shock, dzud winter (2000/2010 branched), Ulaanbaatar ger district migration; 5 late-life follow-throughs
    events_eritrea.js         — 12 events: Eritrea arc — liberation childhood 1965–91 (EPLF fighters, Amharic schooling vs. Tigrinya identity), independence referendum 1993 (April 27, 99.8%), border war 1998 (Zalambessa trench, serve/avoid), indefinite national service 2003+ (500 nakfa/month, stay/flee), G-15 crackdown 2001, leaving decision (Sudan crossing/refugee path), Sinai trafficking witness, diaspora 2% tax (pay/refuse), border war echo, national service reckoning, Sinai reckoning, late-life reckoning
    events_political_arc.js   — 10 events (MODE B): political leaning consequence arc — left noted by authoritarian surveillance, dissident file known (archive choice at late_life), left in 1980s rightward shift (wealthy_west), nationalist in newly-independent country, apolitical character confronted (2-choice), centrist accused from both sides, dissident who outlasts regime (2-choice: read file/leave it), right-leaning under communism, nationalist in diaspora, political conviction at midlife
    events_iraq.js            — 8 events: Ba'ath state 1968–2003, Iran-Iraq War 1980–88 (250–500k dead), Gulf War/12-year sanctions, 2003 US invasion, sectarian civil war 2006–08, ISIS 2014–17, professional diaspora exodus
    events_italy.js           — 8 events: economic miracle 1950s–60s (Fiat 500, television arrival), Hot Autumn 1969, Years of Lead terrorism, Mani Pulite 1992 corruption, Berlusconi era, southern emigration, precariato generation
    events_japan.js           — 12 events: 1945 defeat/atomic bombs, SCAP occupation, postwar economic miracle, 1964 Tokyo Olympics, 1960 Anpo protests, salaryman culture/karoshi, Bubble 1985–90 (Nikkei collapse), Lost Decade, hikikomori withdrawal, Fukushima 2011
    events_laos.js            — 7 events: UXO from Secret War (most-bombed per capita), Buddhist alms culture, Hmong persecution, LPRP party discipline, Mekong border economy, Chinese debt-trap infrastructure, Mekong dam reckoning
    events_namibia.js         — 8 events: Herero/Nama genocide oral history, communal vs. commercial land divide, SWANLA contract labor legacy, AIDS epidemic 1995–2010, SWAPO liberation to patronage, German 2021 "acknowledgment," diamond wealth contradiction, San displacement
    events_netherlands.js     — 8 events: Verzuiling (pillarization) 1920–70, Hunger Winter 1944–45 (22k dead), Surinamese independence 1975 migration, Srebrenica 1995 (Dutchbat), Pim Fortuyn 2002 assassination
    events_north_korea.js     — 9 events: Juche childhood indoctrination, songbun caste system, self-criticism sessions, Arduous March famine 1994–98, jangmadang black markets, USB drive information flow, public executions, defection calculation
    events_pandemic.js        — 16 events: COVID-19 arc: healthcare worker experience, lockdown family separation, mourning without gathering, economic shutdown, mental health crisis, vaccine rollout divergence, conspiracy narratives, return to normalcy disorientation
    events_peru.js            — 8 events: Shining Path 1980–92 (69k dead, 75% Quechua victims), Fujimori autogolpe 1992, forced sterilizations 1996–2000 (indigenous women), Vladivideo scandal 2000, Truth Commission 2001–03
    events_philippines.js     — 9 events: Marcos martial law 1972–86, EDSA People Power 1986, Aquino assassination 1983, typhoon culture, political dynasties, Duterte drug war 2016+, Marcos Jr. return 2022
    events_poland.js          — 7 events: communist childhood, Pope John Paul II 1978, Solidarity 1980, martial law 1981, underground resistance, Round Table 1989, shock therapy, EU accession 2004
    events_romania.js         — 5 events: Ceaușescu Securitate surveillance state, Decree 779 systematization, December 1989 revolution (Christmas Day execution broadcast), EU accession, emigration wave
    events_russia.js          — 4 events: Soviet-Afghan War service (afgantsy veterans), Beslan 2004 school siege, Bolotnaya 2011–12 protests, Navalny's death 2024
    events_rwanda.js          — 8 events: post-independence Hutu Republic, Habyarimana single-party state with ethnic quotas, RTLM radio hate broadcasts, April 1994 genocide (800k in 100 days), RPF military victory, gacaca community courts 2001–12, post-genocide Rwanda under Kagame
    events_saudi.js           — 9 events: Saud-Wahhabi founding alliance, oil discovery 1938, 1973 oil embargo, 1979 Grand Mosque siege, 1990 Gulf War/US troops near Mecca, mutaween morality police, gender segregation lived texture, 2002 school fire, Vision 2030
    events_singapore.js       — 8 events: founding shock 1965 (Malaysian expulsion), kampung demolition/HDB blocks, Speak Mandarin campaign 1979, National Service male rite of passage, PSLE streaming at age 12, racial bargain/EIP, LKY death 2015
    events_south_africa.js    — 4 events: Soweto Uprising 1976 (600+ student deaths), Mandela's release 1990, state capture/Zuma era kleptocracy, white emigration arc post-apartheid
    events_spain.js           — 11 events: Franco dictatorship 1939–75 (Basque/Catalan suppression), La Transición 1975–78, 23-F coup attempt 1981, La Movida Madrileña 1978–85, 1992 Barcelona Olympics, 2008 property crash, 2010s crisis/brain drain, 2017 Catalan referendum
    events_taiwan_malaysia.js — 9 events: Taiwan 228 Massacre 1947, martial law 1949–87 (longest in 20c), waishengren mainlander experience, democratization, TSMC era; Malaysia May 13 riots 1969, NEP Bumiputera policy, Mahathir era, GE14 2018
    events_uk.js              — 7 events: Miners' strike 1984–85 (community survival), Poll Tax riots 1990, Good Friday Agreement 1998, Iraq War 2003, Brexit 2016, Grenfell Tower 2017, Windrush scandal 2018
    events_ukraine.js         — 7 events: Holodomor family memory, independence 1991, language question (Ukrainian/Russian), Orange Revolution 2004, Euromaidan 2013–14, Donbas displacement 2014, 2022 Russian invasion from civilian perspective
    events_usa.js             — 12 events: Great Migration + Jim Crow, Civil Rights era (sit-ins, Birmingham), Vietnam draft, Rust Belt deindustrialisation, War on Drugs/mass incarceration, 9/11 American experience, opioid crisis, school shooting era, 2008 foreclosure crisis
    events_uy_py_ec.js        — 13 events: Uruguay Tupamaro urban guerrillas 1965–72 + military coup 1973; Paraguay Stroessner dictatorship 1954–89; Ecuador dollarization shock 2000
    events_venezuela.js       — 8 events: El Caracazo 1989 (3k dead), Chávez failed coup 1992 (TV legend), 1998 electoral victory, 2002 coup reversal + Chávez return, misiones programs (poverty halved 1999–2012), Chávez death 2013, 2014–22 oil collapse (7M diaspora, highest displacement in Latin America)
    worldEvents.js            — 231 world history events (year+country/archetype gated); 20+ events have `context` fields; includes Syrian civil war (2013–20, neighboring countries), Syrian refugee crisis (2015–17, wealthy_west perspective), COVID-19 pandemic 2020, Afghanistan girls' school ban 2022; recent adds: Guinea independence 1958 + stadium massacre 2009, Mongolia 1990 revolution, Jamaica independence 1962, Eritrea independence 1993 + border war 1998, Trinidad Muslimeen coup 1990
    headlines.js              — ~130 major historical headline entries (year-matched, injected as log entries)
    flags.js                  — FLAG_REGISTRY: master design document for the flag system. 1,314 registered
                                flags with weight/category/description/intent/notes per entry. Pure data,
                                no imports. Run `npm run check-flags` to derive coverage dynamically.
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    assets.js                 — property/vehicle data
    destinations.js           — travel destinations
    illnesses.js              — illness/disease system
    ribbons.js                — end-of-life achievement ribbons (311 defined)
  engine/
    gameEngine.js             — core simulation: buildG, advanceYear, emigrate,
                                generateEpitaph, generateIdentityCard, buildYearTexture,
                                buildEffectProxy, resolveProxyExtras, tickPartner, attemptCrime,
                                deriveGenerationalFlags, DESIRE_PATTERNS
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
                                relationship status chips (quality labels + flag overrides), conditions display
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

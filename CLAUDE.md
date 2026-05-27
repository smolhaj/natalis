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

*Previous roadmap (items 1–16) complete. See git history. The roadmap below is built from a structured brainstorm session and reflects explicit design decisions.*

---

#### BUILD 1 — Post-Soviet Arc (two PRs, ships next)

**PR A — World events** (self-contained):
- Rolling series 1991–1998, per-country gated: Baltic states exit early and recover, Poland shock-therapy arc, Russia/Ukraine spiral through 1998 financial crisis
- Key world events: Soviet collapse 1991, 1990s hyperinflation wave (Russia/Ukraine/Romania/Bulgaria), Chechen war 1994–96, 1998 Russian financial crash
- Each event gets a `context` field (2–3 sentence factual note, surfaced as optional expandable in UI — see Build 6)
- Sets flags: `soviet_collapse_lived`, `savings_wiped_hyperinflation`, `communist_childhood`, `post_soviet_chaos`

**PR B — `events_post_soviet.js`** (depends on PR A flags):
- **Communist childhood**: Soviet core — Pioneer movement, five-year plan certainty, space age optimism; Eastern bloc — the ambivalence of imposed Communism; East Germany — Stasi surveillance at the personal level; Romania/Bulgaria — the grimmer, harder variant
- **1990s personal collapse**: factory closure notification, hyperinflation eating a lifetime's savings overnight (prices written in chalk, changed before you finish eating), the specific shame of sudden poverty after guaranteed stability
- **Oligarch split**: player ends up on either side based on prior flags (money, business background, criminal record). Taking the privatization path unlocks subsequent events that make the cost explicit. Declining means watching from outside.
- **Emigration wave**: gated by ethnicity/religion — Jewish characters → Israel (Law of Return); German-heritage → Germany (Spätaussiedler); everyone else → US/West (educated, credential-less, often driving taxis)

---

#### BUILD 2 — Geographic Depth (multiple PRs, can be parallelised)

**Vietnam arc** (`events_vietnam.js` + world events):
- Fall of Saigon 1975 world event — the south's experience, re-education camps for ARVN families
- Boat people exodus — the specific decision to leave on a boat with no guaranteed destination
- Doi Moi 1986 world event — command economy quietly admits failure
- Post-Doi Moi generation — Communist in name, capitalist in practice; watching Vietnam become the world's factory

**Lebanon arc** (world events + character events):
- Civil war childhood 1975–90 — the green line, crossing militia checkpoints, the specific sectarian geography of Beirut by neighbourhood
- Hariri reconstruction 1990s — the brief belief that Beirut would become what it once was
- 2020 Beirut explosion world event — one of the largest non-nuclear explosions in history in a city already economically collapsing
- Lebanese diaspora flag arc — watching every election from abroad, sending remittances, the horror of seeing the explosion on a phone in Sydney

**Latin America dictatorships** (`events_latin_america.js` + world events):
- Chile 1973 coup, Argentina 1976 world events
- **Operation Condor cross-border mechanic**: a character who emigrated from Chile to Uruguay is not safe — the junta's reach was transnational. Gate on emigration flags + country of origin.
- Living under the regime: the disappeared, the midnight knock, the self-censorship of the Southern Cone
- Post-dictatorship: truth commissions, the specific experience of a country processing what it did

**Latin America cultural depth**:
- Argentina 2001 collapse (expand existing world event with personal experience arc)
- Brazil evangelical church rise (character event, 1990s–2000s, gated on religion + country)
- Colombia: cartel adjacency as daily texture (not just criminal events — the negotiation of ordinary life around it)
- Football as national religion (character event, Brazil/Argentina, World Cup years)

**Southeast Asia depth**:
- Indonesia 1998: world event + character events branching on ethnic Chinese ancestry (the riots targeted that community specifically)
- Philippines OFW arc (`events_ofw.js`): the decision, the contract, specific destination (Saudi Arabia/Hong Kong/Italy), sending money home, family relationship cost, returning
- Bangladesh: garment factory female worker arc, 1971 Liberation War world event, cyclone vulnerability

**Sub-Saharan Africa depth**:
- DRC: add as country with `conflict_zone` archetype and full demographic data; existing conflict events fire from there
- Zimbabwe: Mugabe arc — land seizures, white farming family displacement AND Black Zimbabweans who didn't benefit, hyperinflation 2007–09 world event (trillion-dollar notes, prices changing hourly)
- Senegal: Mouridiyya Sufi brotherhood culture, Dakar as West African intellectual hub
- Ethiopia: 1984 famine world event (verify vs. existing), Derg regime events, post-1991 transition

**Arab world depth**:
- Egypt: Nasser era optimism, 1967 defeat, Mubarak-era middle class
- Morocco: French/Arabic/Amazigh identity conflict, Hassan II years, emigration to France
- Syria: pre-war middle-class texture (Damascus in 2005), then the war

---

#### BUILD 3 — Chronic Illness System + Parent Care Arc (one large PR)

**State change**: Add `conditions: [{ id, severity: 'mild'|'moderate'|'severe', diagnosedYear, managed: bool }]` to INITIAL_STATE. Both congenital (small % set at character creation based on country/era) and acquired (diagnosed through events). Passive annual drain: `mild+managed`: none; `mild+unmanaged`: −1h; `moderate+unmanaged`: −3h/−2m; `severe+unmanaged`: −6h/−4m.

**Condition list**: Type 2 diabetes, heart disease, chronic back pain, COPD, cancer (survivable track), HIV/AIDS (era-gated + archetype-gated), blindness, deafness, chronic depression (intersects mental health system), disability from injury.

**Illness × poverty intersection**: Both different event text AND different baseline severity at diagnosis by archetype/GDP. Denmark: mild (caught early, well-managed). Nigeria: moderate-to-severe (late presentation, limited access, costs modelled differently).

**Career gating**: Moderate = soft-gated (event asks if you continue, player decides). Severe = hard-gate specific careers (severe tremor removes surgery career, blindness removes driving-dependent).

**Parent care arc** (`events_parent_care.js`, 8–10 events):
- First sign of decline (the phone call where something is subtly wrong)
- The conversation about what comes next
- Moving in vs. care home decision with real cost modelling
- The daily reality of caregiving (costs health, happiness; gains karma)
- Siblings disagreement about responsibility split
- A specific bad day
- The last good conversation
- The death (connects to existing `grief_parent_call` event chain)

---

#### BUILD 4 — Systems Depth

**Relationship history UI**: Translate relationship flags into readable labels on relationship cards in `LifeScreen.jsx`. "Had a falling-out (2003)", "Reconciled (2018)", "Estranged." No new data model — the flags exist, just need a display layer.

**Political leaning system**: `political_leaning` state field (`'left'|'centre'|'right'|'nationalist'|'dissident'|'apolitical'`), earned through events only (born neutral). Shaped by: adolescence political awakening event, career_regime events, world events (living through a coup, exile, etc.). Gates text variants and which choices appear.

**Late-life reconciliation arc**: Attempt to repair estranged child/sibling relationship in 60s–70s. Success: `reconciled_damaged` flag (relationship quality restored but caps lower than undamaged). Failure: `permanently_estranged`. Both paths lead to some form of closure — the attempt itself is the arc.

**Death of a child arc**: Full arc — sparse restrained death event, marriage aftermath events (how it changes the partnership), years of carrying it events. Gate carefully. Connects to grief module.

**Underground/gang system reimagined**: Full criminal career arc with archetype specificity — post-Soviet Russia organized crime 1990s, Lagos area boys, Colombian cartel-adjacent. Progression: petty crime → gang membership → leadership → inevitable consequences. Parallel to formal career but no legal safety net. Replaces the thin `gangEngine.js`.

**Social media arc** (replaces current thin system): Era-gated, country-specific platforms (Facebook/MySpace in West, VKontakte in Russia, Weibo in China, MXit in South Africa). Arc: genuine excitement → addictive phase → toxicity/documented harm → choosing to leave or not. Character events at each stage, gated by `currentYear` and archetype.

**Mid-life reflection events**: At 40 and 60, an optional event fires generating a short narrative of the life so far. Same flag-to-prose logic as `generateEpitaph` but framed as a living first-person reflection, not an obituary.

**Historical context `context` field** on world events: 2–3 sentence factual note per event, displayed as an optional expandable in the UI. Prioritise major traumas (genocide, famine, revolution) first; backfill economic events later.

---

#### BUILD 5 — Era and Historical Gaps

**1930s–40s global texture** (beyond current WWII coverage):
- Great Depression lived experience by archetype: US Dust Bowl/breadlines, British means test humiliation, Australian wool price collapse, Nigerian cash crop disruption
- WWII from non-European perspectives: Calcutta under Japanese threat and Bengal famine, Buenos Aires neutrality, Lagos and West African regiment contributions, colonised peoples drafted to fight for colonial powers

**1950s–60s decolonisation arc** (`events_decolonisation.js`):
- Independence generation: the specific optimism of 1960 Ghana, 1960 Nigeria, 1963 Kenya
- The first coup: when the independence promise broke (Ghana 1966, Nigeria 1966, others)
- IMF structural adjustment 1980s–90s: the post-colonial debt generation
- Pan-Africanism and Negritude: the intellectual movement of the independence era

**1970s global texture**:
- Oil shock 1973 world event (all archetypes, impact varies by GDP tier)
- Stagflation in the West: end of guaranteed prosperity
- Latin American authoritarian wave (see Build 2)
- Post-independence disillusionment in Africa: the gap between 1960 hopes and 1975 reality

**2010s texture**:
- Arab Spring consequences arc (expand existing)
- Smartphone as defining generational experience: what it meant to have the internet in your pocket from age 13 (character event, 2010+)
- Rise of populism: Brexit, Bolsonaro, Erdoğan — the experience of watching your country's politics radicalize
- Climate anxiety as a generational identity (character event, 2015+, adolescence/young_adult)

**India-specific depth**:
- Engineering/medicine aspiration track (the specific pressure of the IIT/MBBS track)
- Arranged marriage negotiation arc (the meetings, the family committee, the specific agency or lack of it)
- Joint family dynamics: the unspoken economy of a shared household
- Regional language vs. Hindi vs. English identity conflict

---

#### BUILD 6 — Polish and Completeness

**Country historical names**: Add `historicalNames: [{ until: year, name: string }]` to country data. Display: current name with historical in parentheses where different ("Russia (then USSR)"). Used in epitaph and birth screen.

**`activities.js` audit**: Fix unreachable activity combinations (GDP × age × availability).

**Event guard consistency**: Standardise all `when` guards on `G.mem?.key` optional chaining.

**Ribbons audit**: Add missing ribbons for `resettlement_established`, `ivf_success`, `chose_childless`, `pension_saver`, `rural_to_urban`, `mentor`, `career_defining_work`, `post_apartheid_generation`, `completed_hajj`, and new flags from Builds 1–5.

**`careers.js` field coverage**: Sports arc (injury, transition out, identity work). Academia arc (tenure decision, publish-or-perish, the defining student). Hospitality arc (service grind at bottom, ownership arc at top).

**BirthScreen depth**: Optional choices for urban/rural origin, family structure, religion override. Doesn't change random defaults — lets intentional players build specific starting conditions.

**Early 20s gap**: 8–10 events for the messy 18–25 sub-phase — first apartment, first real job, first adult failure, the specific vertigo of being responsible for your own life for the first time.

**Early childhood depth** (ages 0–5): First day of school (massive in many cultures), being the child of an immigrant, early illness, a formative memory that the game can reference later. The emotional bedrock phase is currently thin.

---

#### BUILD 7 — Stateless Peoples and Contested Geographies

**Palestine as a country** (`countries.js` addition):
- `yearRange: [1948, 2025]`, `archetype: 'conflict_zone'`, `gdp: 'low_medium'`
- Full arc: Nakba displacement 1948, UNRWA refugee camp generation, 1967 occupation, first and second intifadas, Oslo brief hope, post-2006 West Bank/Gaza divergence (different daily reality after Hamas takeover), siege of Gaza
- Key events: the checkpoint as a daily fixture, house demolition, permit system, the specific bureaucratic violence of occupation, the 2000s-era hope and its collapse
- Post-2006 branch: `when (G.character.country.name === 'Palestine' && G.currentYear >= 2006)` branches on specific location flag (Gaza vs. West Bank) for meaningfully different event text

**Kurdish ethnicity flag events** (Turkey, Syria, Iraq, Iran):
- Language suppression events (Kurdish banned in Turkish schools until 1991)
- PKK question: a character from southeast Turkey in the 1990s is not neutral about this
- Iraqi Kurdish experience: the Anfal campaign 1988 (world event, Iraq + Kurdish ethnicity guard), the autonomous region post-1991, the referendum 2017
- Syrian Kurdish experience: the Rojava experiment, the Turkish incursions

**Rohingya events** (Myanmar, ethnicity-gated):
- Pre-2017: stateless since 1982 citizenship law, restricted movement, denied education
- 2017 genocide world event: the villages burned, the mass exodus to Bangladesh
- Cox's Bazar refugee camp arc: the specific experience of the world's largest refugee camp

**Uyghur events** (China, ethnicity-gated):
- Pre-2015: cultural suppression, Ramadan restrictions, language policy
- Post-2015: surveillance state escalation, re-education camps (world event, Xinjiang + Uyghur ethnicity guard, 2017+)
- Diaspora Uyghur experience: watching from abroad, the impossibility of contact with family inside

---

#### BUILD 8 — Climate Arc (2025–2100)

**Game timeline extension to 2100**: Characters born in 2000 can live to 2090. The second half of the 21st century is the game's most urgent educational territory.

**Climate event design principle**: Follow IPCC median projections, presented as lived experience without hedging language. The character doesn't "hear scientists predict" — they live through it the same way a 1973 character lives through the oil shock.

**GDP/archetype divergence**: The same event fires for all archetypes but the text branches explicitly on wealth. Sea level rise: Netherlands (managed, costly, survivable); Bangladesh (existential, displacement, loss); Maldives (gone by 2060). Heatwave: France (uncomfortable, dangerous for elderly); Nigeria (lethal for outdoor workers, crop failure).

**Climate event arc (world events by decade)**:
- 2025–2035: intensifying extreme weather, insurance markets withdrawing from coastal areas, first climate-related food price spikes
- 2035–2050: first major coastal city permanent flooding events, climate refugee flows (new `climate_refugee` residency status), coral reef death world event
- 2050–2070: agricultural zone shifts, parts of the Gulf become seasonally uninhabitable (wet-bulb temperature events), climate migration as mass phenomenon
- 2070–2100: civilizational stress events — characters who live to 90 witness things that were scenarios in their childhood

**Climate refugee arc**: New residency status `climate_displaced`. A Bangladeshi farmer, a Maldivian islander, a Sahel pastoralist driven north. Intersects with immigration arc — climate displacement is legally distinct from political asylum in most countries (currently, unfairly).

---

#### BUILD 9 — Additional Systems

**'Curated Life' mode** (separate button on TitleScreen → own flow):
- Full control: country, birth year, gender, urban/rural origin, family structure (stable/unstable/single parent), religion override, ethnicity (from that country's ethnic group distribution)
- Default 'Random Life' flow unchanged — curated mode is the opt-in for intentional play
- Educational use case: a teacher can assign "play as a woman born in 1965 in rural India" and the whole class starts from the same character

**'Who Am I?' living identity card** (Stats tab):
- 3–4 sentences of prose, regenerated each year, using the same flag-to-prose system as `generateEpitaph`
- Framed as present-tense identity: "You are a 34-year-old Kenyan software developer. You emigrated at 26. You have two children and a marriage that has been tested. You left your faith behind in your twenties."
- Surfaces accumulated identity without spoiling the epitaph — the living version is descriptive, not evaluative

**Ageing and elder status by archetype** (new late_life event variants):
- `wealthy_east`, `subsaharan`, `developing_urban`, `post_soviet` archetypes: elders have social role, are consulted, are the repository of family memory — late-life events reflect authority and connection
- `wealthy_west` archetype, especially 2000+: the specific invisibility of ageing in cultures that have medicalised and sidelined it — no longer consulted, moved out of the family unit, irrelevant to the economy
- The same age, different worlds: gate on archetype + `currentYear` for when the Western pattern accelerates

**Congenital disability** (character creation + specific event chains):
- Small probability at character creation (~2–4%, weighted by era and country health systems)
- Conditions: deafness, blindness, mobility impairment, intellectual disability
- Each condition has specific events that only fire for that character: the special school (or lack of one), the specific way other children treat you, the career limitations, the specific dignity of a life that looks nothing like the default
- Intersects with illness system (conditions[] array), wealth/archetype (what disability means in Denmark vs. DRC), and historical era (institutionalisation before 1970s vs. inclusion movement after)

**Original language words in event prose**:
- Selective use where a word in the original language carries something English doesn't
- Examples: Russian *blat* (connections economy), Japanese *karoshi* (death from overwork), South African *ubuntu*, Arabic *inshallah* used naturalistically, Swahili *harambee* (cooperative self-help), Hindi *jugaad* (improvised solution)
- Always in italics; meaning made clear through context, never through footnote
- Standard: only where there is genuinely no English equivalent and the word itself is part of the educational payload

**War from the soldier's perspective** (`events_soldier_arc.js`):
- Characters with military careers during active conflicts get specific deployment events
- The specific experience of being sent to fight: Korea (1950s), Vietnam (1960s-70s), multiple African conflicts, Gulf War 1991, Iraq/Afghanistan 2003+
- Combat events written with the same restraint as the rest: specific, not glorified
- Return arc: what you carry back that doesn't have a name, the civilian readjustment, the marriages that survive it and those that don't

**Parent of a seriously ill child** (character events, midlife):
- The diagnosis, the reorganisation of your life around their care
- The specific grief of a different future than you imagined for them
- The relationship with your partner under that pressure (some marriages survive it; some don't; gated on existing romance arc flags)
- The long arc: the child who grows up differently from what you expected, and what your relationship becomes

---

#### DESIGN NOTES (non-implementation, reference)

**Content limits**: None, handled with care. Everything that happens to real people is in scope if written with the same honesty as the rest of the game. The standard is: does this serve the player's understanding, or is it gratuitous? The answer should guide the prose, not a categorical exclusion.

**Historical accuracy standard**: The game's fiction should be seamless — no disclaimers inline. Accuracy is a design constraint, not a label. If an event isn't accurate enough to ship without a disclaimer, it isn't accurate enough to ship.

**The Immersion Principle still applies to every new event**: Time-accurate, place-accurate, perspective-accurate, consequential. A 2060 climate event should feel as specific and grounded as a 1973 oil shock event.

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

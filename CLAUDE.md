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

#### BUILD 10 — Country-Specific Historical Arcs (deep specificity)

*These expand on Build 2's geographic depth with explicit event-level content for each country and era.*

---

**Nigeria**:
- Oil boom 1970s surrealism: Lagos building itself too fast — cranes, half-built roads, blackouts in new buildings, imported cars in traffic jams that didn't exist two years ago. The word 'petrodollar' is new.
- Biafra Civil War hangover (1967–70): what it meant to be Igbo in Lagos in 1972, or Yoruba navigating Igbo colleagues. The war ended; the grievances didn't.
- First-gen university status anxiety: the degree as both achievement and rupture — the distance it creates from the village, the weight of expectation, the specific loneliness of being the first.
- Military coup culture: the radio announcement, the curfew, the specific recalibration of life that follows a change of government. A character who lives through six coups develops a particular relationship with political certainty.

**Mexico**:
- 1985 earthquake: the government's failure, the citizen self-organisation, the political rupture. The earthquake is widely considered the beginning of Mexican civil society. A character who digs through rubble without government help is radicalised by the specific absence.
- 1982 debt crisis: middle-class savings wiped out by devaluation. The specific experience of a family that had a comfortable life in 1981 and didn't in 1983. The word 'devaluation' enters daily speech.
- PRI political machine: elections that happen but whose outcomes are managed. The specific navigation of a journalist, teacher, or government employee in a one-party system that calls itself a democracy.
- Maquiladora belt: young women from rural Mexico arriving in Tijuana or Juárez alone. The wage, the danger, the specific freedom of living outside the family unit for the first time, the specific vulnerability that comes with it.

**South Korea**:
- Korean War civilian displacement: the front moved across the peninsula twice. A character from Seoul was displaced twice, carrying what they could, not knowing if they'd return to a house or rubble.
- Post-war poverty 1950s: Korea was one of the poorest countries on earth. American aid, black markets, the specific shame of a country that had been colonised for 35 years and immediately destroyed by war.
- Park Chung-hee development state: the authoritarian bargain — accept the dictatorship, get economic growth. A factory worker, farmer, or civil servant in the 1960s–70s lives this bargain daily. The Saemaul Undong rural modernisation programme.
- DMZ separated families: relatives in the north who cannot be contacted. Letters that never arrive. The Red Cross family tracing programme. For some characters, the brief reunions that began in 2000 — seeing a sibling for the first time in 50 years in a hotel ballroom, with two hours.

**Brazil**:
- Economic miracle contradiction 1968–73: GDP growing 10% a year while the DOPS disappears people. A middle-class São Paulo character simultaneously prospering and living under censorship. The specific moral architecture of not asking.
- AI-5 and the dark phase: after 1968, even moderate dissent was dangerous. University students, artists, academics — underground, in exile, or in prison. The specific experience of being twenty-two in São Paulo in 1969.
- Tropicália and coded resistance: music as political carrier. A character who is a musician or devoted listener in this era lives in a specific relationship with art that says what cannot be said directly. Caetano Veloso, Gilberto Gil, the IBECC censors.
- Abertura and Diretas Já 1984: the slow negotiated return to democracy, then the mass movement demanding direct elections. A character who fills a street demands something that feels possible and then watches it be partially denied and then given. The specific emotional texture of a country trying to reclaim itself.

**India**:
- Nehruvian optimism 1950s: the first generation of independence running a country they built. IITs, dams as temples of modern India, the Congress era's specific confidence. A character who is 20 in 1950 is part of something that feels new in the world.
- Partition survivor rebuilding: a Lahori Hindu family ending up in Delhi, or a Punjabi Muslim in Karachi. Refugee in what is technically your own country. The neighbourhood of refugees. The things carried across — what fit in a bundle, what didn't.
- Green Revolution Punjab 1960s–70s: a farming family that was subsistence in 1960 prosperous by 1975. The son sent to Chandigarh for education on money the wheat earned. The specific transformation of a village that suddenly has surplus.
- Emergency 1975–77: Indira Gandhi's suspension of democracy. Press censorship, the slum clearances of Delhi, the forced sterilisation programme. A journalist, a professor, or a poor family in Delhi in 1976 lives in a country that suspended its own constitution. The specific experience of Sanjay Gandhi's power and its exercise.

**Ghana**:
- 1957 independence: being a 10-year-old who hears Nkrumah declare freedom on the radio. The specific feeling of a world being made for the first time.
- Nkrumah's social programmes: a character who would not have gone to secondary school under colonial rule, goes under Nkrumah. The specific pride and expectation of being the first beneficiary of a new system.
- 1966 coup disillusionment: Nkrumah deposed while travelling. The specific grief of a young Ghanaian who believed in the project — the confusion, the beginning of the understanding that independence and justice are not the same thing.
- 1980s brain drain and Rawlings era: structural adjustment gutting public services. The teachers, nurses, and engineers leaving. A character who stays lives through the specific experience of watching the educated class disappear around them.

**Egypt**:
- Nasser era and Suez 1956: nationalising the Suez Canal as a moment of genuine popular pride. The British and French invade; the US forces them to stop. For a generation, evidence that the world had changed.
- 1967 Six Day War defeat: state propaganda had said they would win. A character who grew up with the national narrative of Arab strength lives through this as a specific rupture — the gap between the radio and the reality is everything.
- Mubarak middle class 1980s–2000s: a country with enormous human capital and nowhere for it to go. A university graduate driving a taxi or working a government desk job. The specific frustration of stability without possibility.
- Tahrir Square 2011 and what followed: 18 days that felt like a revolution, then the military coup of 2013. A character who went to Tahrir has a specific before-and-after that doesn't resolve. The hope has a date and the betrayal has a date.

**Argentina**:
- Proceso daily texture: not just the disappeared but the daily self-censorship of everyone who wasn't. The specific moral cost of ordinary survival in a country disappearing 30,000 people. The dinner table conversation that goes certain directions and not others.
- Mothers of the Plaza de Mayo: a character whose child was disappeared, who goes to the plaza with a photograph. Or a character who watches from the pavement and walks past. The dictatorship called them madwomen.
- Falklands 1982: the dictatorship launched a war to manufacture national unity. A character who has a son conscripted, or who watches the propaganda while knowing what the regime is doing, lives a specific contradiction. The surrender is also a specific experience: relief and shame simultaneously.
- CONADEP truth commission 1984 and Nunca Más: one of the first serious post-atrocity accountability processes in Latin America. A character who testifies, or who reads the report, lives through the specific work of a country trying to say what happened to it.

**Iran**:
- White Revolution 1963: land reform, women's suffrage, literacy corps. A rural woman who learned to read through the literacy corps has a specific relationship to the regime that educated her. A landowner who lost land has another.
- SAVAK surveillance texture: not everyone was tortured; everyone calibrated what was safe to say. The informer who might be a colleague, a neighbour, a family member. The specific sentence you didn't say at the party.
- Iran-Iraq War 1980–88: the longest conventional war of the 20th century. Human wave attacks, chemical weapons, child soldiers. A character who has a son go to the front, or who goes themselves, lives through one of the most traumatic national experiences of the modern Middle East. The basij volunteers. The key to paradise given to children.
- Post-revolution disillusionment expanded (supplements existing event): the leftists purged after 1979, the women who marched against the Shah and were forced back into the hijab, the Mojahedin-e-Khalq who fought the Shah and then were hunted by the Republic. The second betrayal is specific and needs specific text.

**China (Mao era, expanding Cultural Revolution world event)**:
- Great Leap Forward famine 1958–62 from inside a rural village: grain quotas enforced while people starved. The specific objects: nettles, bark, clay mixed with flour, the communal pot getting thinner. A rural Anhui or Sichuan character in 1960 experiences this while being told the harvest is good.
- Cultural Revolution character-level expansion: being sent down to the countryside (the assignment, the village, the decade lost), being asked to denounce a teacher you respected (the specific pause before you speak), the Red Guard years (joining, the specific energy of it, what you did in that energy, what you carry later).
- 1949 land reform: a landlord family stripped of everything by 1952, or a poor peasant who received land. The reversal is total and rapid. The specific experience of a world inverting.
- Deng reforms vertigo 1978+: a character who starts a small business in 1982 is doing something that was illegal in 1978. The system telling you to do what it just told you not to do. The specific confusion and exhilaration of a household responsibility contract.

**South Africa (expanding existing coverage)**:
- Township uprisings 1984–86 and state of emergency: a character who is 18 in 1985 in Soweto is in the centre of something. The necklacing. The state of emergency. The ANC underground. The choice of whether to be inside or outside the movement.
- White beneficiary moral architecture: the domestic worker who goes home to Soweto each evening. The news the white family watches. The specific architecture of not knowing what you know. The conversations that don't happen at the dinner table.
- Indian and Coloured South African position: oppressed but in a hierarchy, with more rights than Black South Africans and fewer than whites. The specific moral complexity of a community navigating that position. The separate schools and separate areas and the specific resentments they produce.
- TRC testimony 1996–98: a character who testifies about what happened to their family, or who hears a perpetrator ask for amnesty in exchange for full disclosure. The specific experience of a country processing its crimes in public, in real time, in a hall in Cape Town.

**Japan (expanding existing coverage)**:
- Hibakusha discrimination: Hiroshima and Nagasaki survivors stigmatised in postwar Japan — feared as contaminated, treated as unmarriageable, invisible in the national story of reconstruction. A character who is a hibakusha, or the child of one, lives inside this specific underdiscussed history.
- 1960 Anpo protests: one million people in the streets opposing the US-Japan security treaty. The largest mass movement in Japanese history. A character who is a university student in Tokyo in 1960 is inside the most politically charged moment of postwar Japan.
- Minamata disease: a fishing village poisoned by Chisso Corporation mercury discharge over decades. A character from Minamata who becomes ill, or whose child is born with the neurological damage, lives inside one of the most egregious corporate crimes of the 20th century. The company's response. The government's delay.
- Salaryman social world expanded (supplements existing events): morning exercise, company housing, the transfer to a provincial city you didn't choose, the drinking hierarchy, the specific social world that exists entirely within one employer. A character who gives a company 40 years.

**USA (country-specific events for the largest economy)**:
- Civil rights movement from the inside, gated on Black American ethnicity flag + US + 1955–1968: not a world event observed from outside but a character who sits at a lunch counter, walks to Selma, or watches the Birmingham church bombing on the news. The specific texture of being inside history being made, with the specific knowledge of what the cost of being visible could be.
- Vietnam veteran arc: the draft lottery, the year in-country, the return to a country that had moved on. Working-class kid from Cleveland who didn't have a college deferment. The specific experience of a war that had no clear end and produced no clear story for those who fought it.
- Rust Belt deindustrialisation 1970s–80s: a steel town or auto town where the plant closes. A character who expected to work the same mill as their father, and doesn't. Youngstown, Gary, Detroit. The specific experience of a place whose entire reason for existing changes overnight.
- AIDS crisis 1980s, gated on LGBTQ flag + US + 1981–1995: watching friends die of something with no name, no government response, no treatment. ACT UP. The specific rage of a community that had to fight to be acknowledged. The funerals. The Names Project quilt.

**Ethiopia**:
- Red Terror 1977–78: urban youth, students, and intellectuals the primary targets. Bodies left in the street with red tags. A character who is a university student in Addis Ababa in 1977 is in existential danger from the state that is nominally their own government.
- 1984 famine from inside a Tigray or Wollo village: the grain quotas enforced while people are dying. The government blocking international aid to rebel areas. The specific experience of a famine that is partly man-made, at ground level, not as a television image from Europe.
- Villagisation 1985–86: 600,000 people forcibly relocated. A character who is moved — the truck, the new land, the people who died in transit — or who is the local official implementing it. Both positions have specific event text.
- Fall of the Derg 1991: a character who lived through the whole arc — 1974 hope, Red Terror, famine, villagisation, fall — has lived through one of the most compressed national traumas in modern history. The EPRDF entering Addis. Mengistu's flight to Zimbabwe. The specific experience of something ending that you cannot yet name.

**France WWII**:
- Occupation grey zone: most French people were neither resisters nor collaborators. They went to work and bought food on the black market. The specific moral experience of ordinary life three kilometres from crimes you don't fully acknowledge to yourself.
- Vel d'Hiv roundup 1942: French police, no Germans. 13,000 Jews held in a velodrome before deportation. A Jewish character in Paris in July 1942, or a French neighbour who watches and says nothing. The event is not the Germans — the event is what France did.
- Liberation and epuration 1944–45: the specific revenge justice and score-settling. Women with their heads shaved. The summary executions. The trials. A country deciding simultaneously what it had done and who was to blame, and getting both wrong in specific ways.
- Colonial soldiers: Algerians and West Africans who fought for France, who liberated French cities, who came back to countries that were still colonies. The specific experience of fighting for someone else's freedom and not receiving your own. The specific bitterness of being thanked and then dismissed.

**Kenya**:
- Mau Mau and detention camps: British detained 150,000 Kenyans. Torture systematic and documented. A Kikuyu character in 1953 faces specific choices: take the oath, don't take it, inform, resist. The Pipeline detention system. The specific architecture of colonial counter-insurgency.
- Independence and Kenyatta era: a country that got independence and watched it consolidate into one-man rule, but stable and relatively prosperous by regional standards. A government or education character in 1970s Kenya navigating the specific space between hope and accommodation.
- Nairobi middle class 1970s–80s: East Africa's commercial capital. A Kikuyu professional family, a Luo civil servant, an Asian Kenyan businessman — all navigating the same city with different positions in it. The specific texture of a cosmopolitan African city in this era.
- Moi era kleptocracy 1978–2002: systematic institutional looting. The Goldenberg scandal alone cost Kenya 10% of GDP. A civil servant, banker, or teacher navigating an institution being deliberately damaged from above. The specific experience of watching professionals leave and not being replaced.

---

#### BUILD 11 — Missing Countries

Each requires: full `countries.js` entry with all demographic fields, then country-specific world events and character events.

**Cuba** (1930–2025, archetype: `single_party_communist` after 1959):
- Pre-Revolution: Batista's Cuba, the specific texture of Havana in the 1950s (US-backed dictatorship with casinos, spectacular inequality, a lively middle class and extreme rural poverty)
- The Revolution: the specific experience of 1959 not as triumph or defeat but as total reorganisation — what happened to your property, your school, your employer, your neighbours
- Bay of Pigs 1961 and missile crisis 1962: the specific experience of being the target
- Exodus waves: 1959 (bourgeoisie), 1980 Mariel boatlift (Marielitos — people Castro emptied from prisons and psychiatric facilities), 1994 balseros. Each wave is specific.
- Special Period 1990s: USSR collapses, Soviet subsidies stop, Cuba enters a famine. The specific experience of a country that had universal healthcare and now has no medicine. The bicycle as the only transport. The bodyweight lost.
- Remittance economy and the two-tier system: dollars vs. pesos, the specific experience of having family abroad who send money and family at home who don't

**DRC** (1955–2025, archetype: `conflict_zone`):
- Lumumba assassination 1961: the first post-independence prime minister killed with Belgian and CIA involvement. A character who believed in the independence project lives through its specific murder.
- Mobutu's kleptocracy 1965–1997: 32 years of systematic looting. Zaire. The specific daily experience of a country whose leader renamed it and stole it simultaneously.
- First and Second Congo Wars 1996–2003: the deadliest conflict since WWII. A character in eastern DRC lives inside the most violent conflict of the late 20th century.
- Coltan mining: the mineral that makes phones work, mined in eastern DRC under conditions of slavery. A character who works the mines, or who is the local official who manages the armed group that controls them.

**Cambodia** (1950–2025, archetype: `conflict_zone`):
- Khmer Rouge 1975–79: the killing fields, the Year Zero, the evacuation of Phnom Penh. The Khmer Rouge killed approximately 25% of the population in four years. A character who survives is statistically exceptional. The specific events: being forced to leave the city, the village work assignments, the executions, the specific phrase that could get you killed (wearing glasses, speaking French).
- Vietnamese invasion 1979: ended the genocide but installed another authoritarian government. The specific experience of liberation by an occupying army.
- UNTAC period 1993: UN-supervised elections. The brief possibility.
- Survivor in contemporary Cambodia: living alongside people who did things during the Khmer Rouge years. The ECCC trials. The specific experience of a country that cannot collectively decide what happened to it.

**Haiti** (1950–2025, archetype: `developing_unstable`):
- Duvalier dynasty: Papa Doc's vodou-coded terror state, the Tonton Macoutes. Duvalier declared himself president-for-life and rerouted state funds to a personal death squad. A character who is a professional, intellectual, or political figure in 1960s Haiti lives in a specific danger.
- The debt of independence: France extorted reparations from Haiti for 122 years after 1804 for the 'property' (enslaved people) Haiti 'destroyed' by freeing. The specific knowledge that your country's poverty has a creditor and that creditor is France.
- 2010 earthquake: 220,000 dead, 1.5 million displaced, in a country that was already among the poorest. The specific experience of an earthquake in a city built from remittances, without building codes, without functioning government.
- Haitian diaspora: New York, Miami, Montreal. The specific experience of being Haitian abroad — the particular stigma (the AIDS panic of the 1980s, the boat people), the specific pride, the specific obligation to send money home.

---

#### BUILD 12 — Cross-Cutting Experience Arcs

*These fire across archetypes and eras, gated on occupation/situation flags rather than country.*

**Domestic worker arc** (`events_domestic_work.js`):
- The uniform, the separate entrance, the watching of a family from inside their private life
- The employer who is kind vs. the employer who is not, and the specific texture of each
- Specific variants: Filipina in Kuwait or Saudi Arabia (OFW contract, specific legal vulnerabilities); Black South African domestic worker in white Johannesburg suburb; Bolivian migrant in Buenos Aires middle-class home; Haitian in Dominican Republic
- The employer's children who grow up treating you as furniture, or as family, or as something in between
- The specific money negotiation — the raise that isn't asked for because the relationship would change

**Teacher in a poor country arc** (`events_teacher_poor.js`):
- The highest social status in the village; the lowest salary of anyone with that status
- Rural Tanzania 1980: the most educated person for thirty kilometres cannot afford new shoes
- The textbook shortage, the classroom with no roof in the rainy season, the students who walk 8km each way
- The student you recognise as exceptional and cannot help past the level your school can reach
- The government inspection that requires a performance of a normal school
- The arc over decades: the students who come back to tell you what they became

**City under bombardment arc** (`events_siege.js`):
- Not the front lines — the civilian home in range
- Beirut 1982, Sarajevo 1992–95, Gaza 2008/2012/2014/2021/2023, Aleppo 2012–16
- The specific sound knowledge: what sounds close, what sounds like it missed you, what silence after a sound means
- The route taken that avoids the sniper position. The street you no longer use.
- The object you grab if you have to run. The decision of what is worth carrying.
- The specific surrealism of ordinary life continuing in parts of the city while other parts are destroyed: the market that is open on Wednesdays, the cafe still serving coffee

**Child of power arc** (`events_child_of_power.js`):
- Living in the penumbra of someone else's status or notoriety
- The local governor's child in 1970s Nigeria, the Party official's son in 1960s China, the general's daughter in 1980s Chile
- The doors that open without explanation
- The specific danger when the parent falls — a coup, a corruption case, a political shift — and everything reverses
- The specific identity question of a person who is known before they have done anything

---

#### BUILD 13 — Central Asia, Southeast Asia, Southeast Europe

*Regions almost entirely absent from current coverage.*

---

**Central Asia**:
- **Soviet collectivisation of nomads** (Kazakhstan 1929–33): Stalin forced the Kazakhs to settle. A nomadic family that measured wealth in horses and moved with the seasons is assigned a collective farm. The famine that followed killed 38% of the Kazakh population — proportionally higher than Ukraine's Holodomor. The specific event: the official arrives to list the livestock. The specific object: the animal that disappears from the register. The specific knowledge passed to children that cannot be said aloud.
- **Uzbek cotton economy**: Stalin's monoculture mandate — Uzbekistan grew cotton, and only cotton, for the Soviet machine. The Aral Sea drained by 1970 to irrigate it. A farming family whose livelihood is the crop that is killing the sea they grew up beside. Under Karimov post-1991, the cotton quota continued; schoolchildren were mobilised for harvests (illegal by ILO standards). A teacher character in Uzbekistan in the 2000s: the school closes in September and reopens in November. This is not questioned.
- **Kyrgyzstan 1991 and beyond**: one of the poorest former Soviet republics, immediately abandoned by Moscow subsidies. A civil servant who was paid in rubles receives nothing. The specific poverty is Soviet-era infrastructure plus nothing else — power cuts, food shortages, the entire administrative class suddenly useless. Two revolutions in 15 years (2005 Tulip Revolution, 2010 uprising), neither delivering what was promised.
- **Kazakhstan oil boom**: Tengiz and Kashagan fields discovered. Nursultan Nazarbayev builds Astana in the steppe as a statement of modernisation. A Kazakh professional in the 2000s navigates an oil state that is rich and authoritarian and building skyscrapers in a city with no history. The specific texture of wealth in a place that has no democratic institutions to contain it.

**Southeast Asia**:
- **Thailand's political cycle**: 19 coups since 1932 — the specific texture of a country where political change arrives by announcement and curfew. A Bangkok civil servant character learns to calibrate their speech to the current political configuration. The December 2008 airport seizure. The May 2014 coup while a character sits in a coffee shop watching the television.
- **Myanmar: Burmese Way to Socialism** (1962–88): Ne Win's military junta nationalises everything. The Indian and Chinese merchant communities expelled in the 1960s. A shopkeeper family in Rangoon who had a business in 1960 and a depleted shell of it in 1965. The specific surrealism of a resource-rich country made deliberately poor.
- **1988 uprising and the Saffron Revolution 2007**: university students and monks on the streets; the military shoots them. A character who was a student in 1988 or a monk in 2007 makes a decision about the street. The specific experience of a protest that fails, that is crushed, and what the person who survived it carries.
- **Malaysia: May 13 1969** and the New Economic Policy: race riots following an election. 200 dead, a state of emergency, and then 30 years of affirmative action for the Malay majority. A Chinese Malaysian character navigates a country where their ethnicity determines their university quota, their government contract access, their legal status in an emergency. The NEP as the water they swim in.
- **Philippines Marcos era** (1972–86): martial law, the specific version of authoritarian stability — curfews, newspapers shut, opposition figures exiled or imprisoned. A middle-class Manila family that benefits materially from the stability and does not ask about the disappearances at ISAFP. The snap election 1986. The specific experience of EDSA: the crowd so large that the tanks stop because there's nowhere for them to go.

**Southeast Europe**:
- **Greece military junta** (1967–74): the colonels seize power and ban music, long hair, and Aristophanes. A university student in Athens who has the wrong friends. The specific surveillance of a small authoritarian state — the informers are neighbours, not strangers. The Cyprus crisis 1974 collapses the junta.
- **Romania under Ceaușescu**: the most Stalinist of the Eastern bloc regimes, with a personality cult that made North Korea's look modest. Systematisation: demolishing villages and moving people to apartment blocks. The Securitate's informer network — the densest in Europe (one informer per 23 people). The specific experience of a Bucharest intellectual in the 1980s: constant load-shedding, no heating, empty shops. The December 1989 revolution's specific violence — Ceaușescu executed on Christmas Day, broadcast on television.
- **Turkey coups** (1960, 1971, 1980, 1997, 2016 attempt): each military intervention resets the political situation and then (mostly) returns power to civilians. A Turkish character who lives through multiple coups develops a specific understanding of the relationship between the military and democracy. The 1980 coup and its specific aftermath: trade unions banned, the constitution rewritten, 650,000 people detained. The specific sentence you didn't say in the period after.

---

#### BUILD 14 — Scandinavia, Caribbean, Pacific, West Africa

*High-contrast with existing coverage; each region makes the elsewhere more legible by comparison.*

---

**Scandinavia**:
- **The welfare state from inside** (Norway, Sweden, Denmark, Finland, 1960s–present): the game has no events from the world's most successful social democracies. A Swedish character in 1975 has universal healthcare, a year of parental leave, free university education, and a guaranteed minimum income. The specific texture of security: what decisions become possible when you know you won't be financially destroyed by illness. The Danish concept of *trygghed* (safety, security, being okay). The Finnish *sisu* (resilience, gut persistence) in the context of a country that fought the Soviet Union alone.
- **Norway's oil**: oil discovered 1969, first revenues 1971. A country that had been poor — Norwegian emigrants went to Minnesota in the 1800s to escape rural poverty — becomes very wealthy. The specific political decision to put the money in a sovereign wealth fund rather than spend it. A Norwegian character in the 2000s lives in one of the world's most equal societies while being aware their wealth rests on fossil fuels extracted from the seabed.
- **Finland: the Winter War** (1939–40): the Soviet Union invades Finland with 450,000 troops. Finland, with 300,000, holds them for three months. A Finnish character who fights, or whose husband fights, or who evacuates from Karelia (ceded to the USSR in the peace treaty). The specific grief of Karelian exiles — 400,000 Finns displaced from land their families had farmed for centuries.
- **Sweden's neutrality**: not occupied, not at war, but adjacent. A Swedish character during WWII navigating the specific moral position of safety while others aren't. The trains carrying German troops through Swedish territory. The Jews who made it across to Sweden. The specific experience of a person who survives the war without having had to decide anything.
- **Janteloven** (the Law of Jante): the Scandinavian cultural code that says you are not to think you are better than anyone else. A Norwegian or Danish professional character who exceeds expectations, achieves something notable, encounters the specific social pressure not to display it. The specific way ambition is managed in cultures that systemically equalise.

**Caribbean**:
- **Jamaica political violence** (1970s–80s): West Kingston's garrison politics, where neighborhoods are politically controlled by party enforcers backed by violence. Guns flow from party machines to constituent communities; the constituent communities provide votes. A character from Trench Town or Tivoli Gardens lives inside this specific political-economic-violent structure. The Manley/Seaga rivalry. The 1980 election: 800 dead.
- **Trinidad's oil wealth and ethnic politics**: a country almost exactly half African-descent and half Indian-descent, with oil revenues since 1910. The PNM (Black party) and the DLP/UNC (Indian-backed). A Trinidadian character who is Indian in 1970 navigates a country where their community has economic influence and political exclusion simultaneously. The Black Power revolution 1970. The oil boom 1973 (when the price goes up, Trinidad's revenues quadruple).
- **Barbados vs. Haiti** (as a contrast event): these two are the Caribbean's poles — one has been stable, democratic, and prosperous for generations; the other has been the opposite. A character who emigrated from Haiti to Barbados has a specific perspective. The difference between them is not geographical but political and historical, and the game can make that specific.
- **Cuba's Special Period** from a Havana family's perspective (supplements Build 11): not the macroeconomics but the specific objects — the bicycle that replaced the bus, the *libreta* rationing book, the *paladares* (illegal home restaurants) that open because there's nothing else. A Havana doctor in 1992 who earns less than a tourist hotel worker tips.

**Pacific**:
- **Fiji's coups** (1987, 2000, 2006): each coup driven partly by ethnic politics — the Indo-Fijian community, brought to Fiji by the British as indentured labourers in the 19th century, had become the commercial class and won a democratic election. The coup reversed it. An Indo-Fijian character in 1987 who voted, whose vote was voided by a general, who then faces the decision to leave or stay. 40% of Indo-Fijians have left since 1987. The specific experience of a community removed by law from a country their grandparents built.
- **Climate extinction** (Pacific island nations — Kiribati, Tuvalu, Marshall Islands): the first countries to be eliminated by sea level rise. A character born in Kiribati in 1980 grows up watching the government buy land in Fiji as a contingency, knowing that the word for what is happening to their country doesn't exist yet. By their 50s, the concept of climate refugee has been invented specifically for them.
- **Papua New Guinea: resource curse and Bougainville** (1988–98): a decade-long civil war on Bougainville Island over the world's largest copper mine. The mine's revenues went to the national government; the environmental damage stayed on the island. A character from Bougainville lives inside the specific grievance structure of a community whose land is extracted for someone else's benefit.

**West Africa**:
- **Senegal's Mouride brotherhood**: the largest Sufi order in West Africa, with its own city (Touba), its own economic network (*dahiras* of murid traders from New York to Paris to Guangzhou), and a relationship with the state that is not exactly church-and-state but something more complex. A young Senegalese man who joins the Mouride network moves within a commercial and spiritual system that predates the nation-state and will outlast it. The *marabout* and *talibé* relationship. The trip to Touba for the *Grand Magal*.
- **Sierra Leone's diamond wars** (1991–2002): the specific connection between a small stone and a decade of atrocity. A character whose village is taken over by the RUF has their hands threatened — one of the signature tactics of a war whose logic was to make the civilian population permanently unable to work. The British intervention 2000 and its specific effect (the war ended quickly after). A diamond miner character in the post-war period: the stone they find, the money they receive, the fraction of the value they see.
- **Liberia: Doe and Taylor** (1980–2003): Samuel Doe's coup (soldiers from the indigenous Krahn ethnicity overthrowing the Americo-Liberian elite; the President disembowelled on camera). Charles Taylor's civil war. Child soldiers. The ECOWAS intervention. A Liberian character who is 10 in 1980, 22 in 1990, lives through the entire arc. The specific texture of a country that was founded by freed American slaves and then destroyed by conflicts that trace back to the hierarchy that founding created.
- **Guinea under Sékou Touré** (1958–84): the only African country to vote No in de Gaulle's 1958 referendum; France's revenge was total and immediate (removed every piece of French government property, including the lightbulbs). A character who voted No with Touré's party in 1958 believed in something. By 1975, in the world's most isolated African state, with Sékou Touré's paranoid purges, they live inside the specific wreckage of that belief. The Camp Boiro prison.

---

#### BUILD 15 — Disease, Crisis, and the 1990s Specifically

*Era and system gaps that cut across geographies.*

---

**The 1990s as a specific era** (not just post-Soviet):
- The decade had a specific texture that no current events capture: end-of-history optimism, the first wave of globalisation, the rise of the consumer internet, the specific confidence that the future was liberal democracy and free markets. A character who is 25 in 1995 in any wealthy_west country lives this. The specific contradiction of the decade: unprecedented prosperity for those in it while simultaneously: Rwandan genocide, Bosnian genocide, Sierra Leone, Somalia, the deepening of inequality.
- **1997 Asian financial crisis from inside**: Thailand, Indonesia, South Korea simultaneously. The baht collapses, the rupiah collapses, the won collapses. A middle-class Bangkok family whose savings are denominated in baht watches them lose half their value in two weeks. The IMF arrives with conditions. The specific humiliation of structural adjustment: cutting public services, raising interest rates, opening markets — all at once, while people are already suffering. Indonesia's crisis tips into political crisis: Suharto falls after 32 years.
- **1998 Indonesia in full**: the violence against ethnic Chinese Indonesians during the political crisis — a specific targeting of a minority community as scapegoat. A Chinese Indonesian character in Jakarta in May 1998 during the riots. The choice to leave or stay.
- **2008 financial crisis from inside Europe's periphery**: Ireland's Celtic Tiger collapses overnight (banks' liabilities are 40% of GDP; the government guarantees them). A Dublin character who bought a house in 2006 at the peak. A Greek character facing austerity: civil service salaries cut 30%, pensions cut repeatedly, the specific experience of being told by German newspapers that your grandmother is lazy. The Iceland route vs. the Greece route — two different national choices with two different outcomes.
- **Early internet** as a place- and era-specific experience: A 16-year-old in Seoul 1999 (PC bangs, broadband, Starcraft as national sport) has a completely different experience from a 16-year-old in Lagos 2002 (cybercafe with unreliable connection, Nollywood not yet online, mobile phone as primary internet by 2008) vs. a 16-year-old in Iowa 1996 (dial-up modem, AOL, the specific sound). Gate on country + currentYear + age.

**Disease arcs beyond existing coverage**:
- **Spanish flu 1918** (character event, gated on age ≥ 1 and year 1918): a character who is alive in 1918 anywhere in the world lives through the deadliest disease event of the 20th century. The specific sequence: healthy morning, fever by afternoon, dead by week's end. The army barracks, the factory floor, the specific way young adults died fastest (counterintuitive; related to immune response). Gate as a world event affecting all archetypes, with text branching on country and archetype for which institutions collapsed first.
- **Cholera in developing world** (ongoing, not single-event): a character in 1800s-era archetype or early 20th century developing country has specific annual risk. The specific cause — contaminated water from the same river used for waste — is fixable and was fixed in wealthy countries first. An 1880s European character sees cholera end; a 1930s Bangladeshi or Egyptian character still doesn't.
- **Tuberculosis in post-Soviet collapse**: TB rates in Russia tripled between 1990 and 1995 as the public health infrastructure disintegrated. A Russian character who contracts TB in 1993 encounters a healthcare system that has technically universal coverage and actually no drugs. Multi-drug-resistant TB (MDR-TB) emerges from incomplete treatment. The specific experience of a preventable, curable disease becoming deadly again because of system collapse.
- **Ebola in West Africa 2014–16**: the specific geography — Guinée Forestière, then Sierra Leone, then Liberia. A healthcare worker who treats patients while the international community sends PPE but no personnel. The ETU (Ebola Treatment Unit) as a place you go and may not leave. The specific community responses: families hiding sick members because the ETU takes them and they don't come back. A character who loses three family members in two weeks.
- **COVID-19 from inside a lockdown** (2020, global, all archetypes): the same event fires worldwide but text branches: a character in Milan in March 2020 (the first Western city overwhelmed, the military trucks carrying bodies); a character in Lagos (the government's lockdown makes no concession to the informal economy, which is where most people work); a character in New Zealand (early elimination strategy, a brief period of domestic normalcy that feels like living in a different reality). The specific psychological texture of each: what you do with the time, who you lose, what version of yourself comes out of it.

---

#### BUILD 16 — Migrant Worker Arcs, Prison Texture, Nomadic Life

*Perspectives that are statistically common and almost entirely absent.*

---

**South-to-South migration** (`events_immigration.js` extension):
- **Bangladeshis in Malaysia** (1990s–present): Malaysia's construction and manufacturing boom was built partly on Bangladeshi and Indonesian migrant labour. A Bangladeshi character who takes a contract via a labour broker — the specific sequence: the broker's fee (borrowed at 30% annual interest), the flight, the dormitory, the wages withheld for months, the employer's threat to report you to immigration if you complain. The kafala-adjacent system. The character who makes it work and sends money home, and the character who is trapped.
- **Zimbabweans in South Africa** (2000s–present): Mugabe's land reform and hyperinflation drives millions across the Limpopo River. A Zimbabwean teacher or nurse in 2005 who has meaningful qualifications, works as a domestic worker in Johannesburg because the rand is real money. The xenophobic violence of 2008. The specific position: skilled, educated, working below qualification, living in a country that periodically turns on you.
- **Senegalese in Morocco** (transit migration, 2000s–2010s): sub-Saharan Africans crossing through Morocco to reach Spain. The specific geography: Melilla and Ceuta, Spanish territory in North Africa, with 6-metre fences. A character who tries to cross the fence multiple times. The encampments in the forests above Nador. The specific economy of the crossing: who to pay, when to go, what the odds are.
- **Ghanaians in Libya** (pre-2011): Gaddafi's Libya was a destination for West African labour migration — oil wealth, relative stability, work. A Ghanaian construction worker in Tripoli in 2010. Then 2011 happens and the work disappears and getting home becomes the problem.

**Prison texture in different contexts**:
- **Soviet gulag, late Stalin era** (1946–53): a character who is sentenced — for a careless remark, for an accusation by a neighbour, for being from the wrong family — is sent to Siberia. The labour camp as an economic institution: the zeks provide the labour that builds infrastructure. The specific conditions: the ration tied to output, the Stakhanovite prisoner who beats their quota and dies of exhaustion. The specific social hierarchy among prisoners (criminals vs. politicals). The amnesty after Stalin's death in 1953 — people released without transportation home, without money, without documents, in cities where their families may not want them back.
- **Brazilian Carandiru 1992**: the largest prison in Latin America holds 7,000 people in a facility built for 3,500. A prison riot; the military police enter and kill 111 prisoners in 30 minutes. A character who was in Carandiru and survived — or whose relative was there.
- **South African prisons under apartheid**: Robben Island for political prisoners; the general prison system for the enormous number of Black South Africans criminalised by pass laws. A character who is imprisoned for being in the wrong neighbourhood without a pass at the wrong time of night. The specific degradation of a law that criminalises your presence in your own city.
- **The prison-as-institution in contemporary wealthy countries**: a character with a criminal record in the USA navigates a society that has decided ex-felons are ineligible for public housing, student loans, certain professional licences, and voting rights in some states. The specific experience of a punishment that doesn't end at release. The word recidivism presented as a statistic and the specific circumstances (no housing, no work, conditions of parole) that make it a near-inevitability.

**Nomadic and pastoralist life**:
- **Mongolian herder** (1950s–present): a character who lives by moving — the ger, the horses, the seasonal routes. Under Soviet influence (Mongolian People's Republic was a Soviet satellite): collectivised herding, which doesn't work the same way because the animals need to move. After 1990 democratisation: the animals are privatised, the herder is on their own, and the *dzud* (harsh winter) of 2000 and 2010 kills millions of livestock. A herder in Ulaanbaatar in 2005 who came from the steppe five years ago because the dzud took everything.
- **Maasai in Kenya/Tanzania** (1960s–present): independence didn't change the Maasai relationship to land much at first, but wildlife conservation increasingly does. National parks displace Maasai from their pastoral lands — the specific experience of being told your cattle cannot graze where they've grazed for generations because European tourists want to see lions. The cattle that measure wealth in a cash economy. A young Maasai man in 2000 faces a choice: the pastoral life that is contracting, or Nairobi.
- **Bedouin in Saudi Arabia or Jordan** (1950s–1970s): the transition from nomadic to settled life, often incentivised or coerced by states that wanted their populations in one place for administrative and development purposes. The specific loss of a navigation knowledge — how to read stars and wind and terrain — when the navigation is no longer needed. The tent becomes a concrete house and something is specifically gained and specifically lost.

---

#### BUILD 17 — The Religious Institution from Inside; The Interpreter; The Aid Worker

*Perspectives that require specific professional and moral positioning.*

---

**The religious institution from inside**:
- **Catholic priest in rural Ireland, 1950s–70s**: the most powerful social institution in the country. A priest character who is also human — who has doubts, who exercises power over people's lives, who knows about the Magdalene laundries and makes a decision about that knowledge. The specific social architecture of a country where the Church runs the hospitals, the schools, and the moral economy. The specific decade when this begins to collapse: the 1990s scandals, the Ryan Report.
- **Buddhist monk in Cambodia** (1960s–1975, then 1979–present): the Khmer Rouge dissolved the Buddhist monkhood, killing or laicising all monks. A character who was a monk before 1975 and survived — and what they do with that survival. After 1979: rebuilding institutions from nothing. The monk in contemporary Cambodia who provides the social services the state doesn't.
- **Jewish yeshiva student in Jerusalem, 1960s**: the world of Torah study sustained economically by the Israeli state, a specific compact negotiated between Ben-Gurion and the Orthodox community. A character who lives entirely within this system — the study, the *shiur*, the marriage arranged within the community, the world outside entering only in specific ways. The 1967 war: this character has a deferment; their secular neighbour does not.
- **Imam in Indonesia under Suharto** (1970s–90s): Islam is the religion of 90% of Indonesians; Suharto's New Order was suspicious of political Islam. A mosque's imam navigates a state that monitors sermons, requires registration of religious teachers, and will act against anyone whose religion looks political. The specific language of *dakwah* (Islamic outreach) under surveillance.

**The interpreter and translator**:
- A character with a career as interpreter/translator has a specific position: they are present at conversations that define other people's fates and their own presence is structurally invisible. The specific moral position of an interpreter who works for a colonial administration (translating orders for the colonial subjects they share a language with), or an interpreter for a human rights tribunal (translating testimony of atrocity), or a military interpreter in Afghanistan (the specific danger that comes from being visible on both sides of a conflict).
- The language itself as an event: the specific moment when a word in one language has no equivalent in the other, and you must choose which meaning to sacrifice. The interpreter at a medical consultation who must choose how much of the patient's distress to convey when the clinician is already moving on.
- After the war, the interpreter is in specific danger from the losing side, who sees them as a collaborator. The Afghan interpreters who worked for NATO forces and the specific politics of visa applications after 2021. Gate on `career === 'interpreter'` + conflict_zone archetype + specific year ranges.

**The humanitarian aid worker**:
- A character with an NGO or UN career has a specific moral economy: the saviour complex that the sector produces and criticises simultaneously, the specific gap between headquarters and field, the burnout of doing impossible work in impossible conditions with insufficient resources.
- **Local staff vs. international staff**: the same organisation, the same crisis, completely different salaries, security protocols, evacuation rights. An event that makes the gap specific and legible — a security incident where the internationals are evacuated and the national staff are told to shelter in place.
- **The specific crisis economy**: in a refugee camp, the NGO becomes the largest employer, the largest landowner, the largest source of income. A character who is a local NGO administrator in South Sudan or Northern Uganda in 2010 has a specific role in the specific economy of permanent emergency.
- **The moment the work stops**: funding cuts, political decisions, crises that the donors lose interest in. A character whose life work is a programme that closes because the emergency isn't televised anymore.

---

#### BUILD 18 — The Cold War West; Early Adulthood Arcs; Systems Depth

*Filling in remaining gaps.*

---

**The Cold War Western experience** (not just Eastern bloc):
- **McCarthyism** (USA 1950–54): the specific mechanics of a loyalty investigation. A character who is a Hollywood screenwriter, a State Department employee, a university professor in 1952 — the subpoena, the hearing, the question "Are you now or have you ever been." The people who named names and the people who didn't. The specific damage of a loyalty system: it doesn't require guilt to destroy a career, only an accusation. Gate on US + career + 1950–1954.
- **West German Ostpolitik** (1969–74): Willy Brandt's decision to recognise the GDR and normalise relations — controversial with the right, transformative for families divided by the border. A West German character who has a sibling in the East makes contact for the first time in 20 years. The specific experience of Brandt kneeling at the Warsaw Ghetto memorial in 1970: a German character watching this on television and the specific emotions it produces.
- **Northern Ireland's Troubles** (both perspectives): the existing event coverage is thin. A Catholic character in West Belfast in 1972 (Bloody Sunday happened; 14 people shot by British paratroopers at a civil rights march). A Protestant character in the Shankill in 1993 (the chip shop bombing that killed 10 people because the IRA's bomb went off early). The specific experience of sectarian violence as a persistent condition of ordinary life — checking under the car, not mentioning religion at work, the geography of which routes are safe. Gate on country === 'Ireland' or N. Ireland + year.
- **Basque ETA in Spain** (1960s–2011): the Franco regime killed Basque culture and language; ETA emerged as the armed response. A Basque character in the 1970s — the specific moral question of whether the violence is justified when the state that was being resisted was a fascist dictatorship. After democracy (1978), the same question inverts. A character who lost someone to ETA, or who was in the movement and watches the political context change.

**The messy early 20s more specifically** (supplementing Build 6):
- These events are not place-gated but era- and stat-gated: the early adult experience of discovering that the self you had at 17 does not fit the world at 22.
- The first apartment: the specific object inventory of independence — the mattress on the floor, the single pot, the one thing from home that travels with you. Gate on age 19–23 + not living with parents.
- The first real failure (not the safe kind): not failing an exam but failing at something that matters — a relationship that was supposed to work, a job you thought you were right for, a creative project you staked identity on. The specific vertigo when the narrative you had about yourself turns out to be wrong.
- The friend group disbanding: at 22, the people who defined your social self are moving to different cities, different life trajectories. The specific grief of a dispersal — it isn't a fight, no one did anything wrong, it's just that distance is real.
- The political education: most people's political formation happens between 18 and 28. An event that names the specific moment — the news story, the conversation, the book — that organised a worldview. Not the worldview itself but the moment of formation.
- The first significant relationship ending: not the heartbreak of adolescence but an adult relationship that had a real future, that you built around, that ends because of incompatibility or because one person grew in a direction the other couldn't follow.

**Social media as a system** (supplementing Build 4, needs specific event design):
- **Country-specific platforms**: a character in China has WeChat and Weibo, not Facebook and Twitter. A character in Russia after 2022 has VKontakte. A character in Korea has KakaoTalk. Gate platform names on country + year.
- **The Arab Spring and social media's role** (2010–11): a character in Tunisia or Egypt who uses Facebook to organise or to learn what is happening. The specific texture of a protest organised through a platform the government doesn't yet know how to shut down. Then: the government learns. The platform that enabled the revolution is then used to surveil the survivors.
- **The influencer economy as a distinct career**: a character who makes a living from online content in 2015+ has a specific relationship with their audience, their metrics, their body image, and their income stability. The specific anxiety of a platform algorithm change wiping out your revenue. Gate on career === 'content_creator' + currentYear ≥ 2015.
- **The specific damage of social media to adolescent girls** (wealthy_west archetype, 2012+): a character who goes through adolescence in the smartphone era has a specific set of pressures — the comparison, the visibility, the permanent archive of bad decisions — that no previous generation had. This is worth a dedicated adolescence event gated on female + wealthy_west + currentYear ≥ 2012.

---

#### BUILD 19 — Indigenous Peoples

Almost entirely absent from a game about human lives across history. These represent hundreds of millions of people across multiple continents, and their erasure from the game is currently its most significant blind spot.

**Aboriginal Australians** (`events_aboriginal.js`):
- The Stolen Generation (1910–1970): children forcibly removed from families, placed in missions or white households. A character who is Aboriginal in 1955 in Australia has a specific probability of this happening to their child. The welfare officer's knock. The long silence after.
- Land rights and Mabo (1992): the High Court ruling that overturned terra nullius — the legal fiction that Australia was empty when colonised. A character who is alive in 1992 experiences a country officially acknowledging, for the first time, that they were always here. The word *mabo* enters the national vocabulary overnight.
- Contemporary: the specific experience of being Aboriginal in an Australian city. The encounter with a system that was designed to eliminate you and now officially apologises (2008 National Apology). What the apology means and doesn't mean.

**Native Americans / First Nations** (US and Canada):
- Boarding schools (USA 1870s–1970s, Canada residential schools to 1996): "Kill the Indian, save the man." A character who is sent to residential school — the hair cut, the language forbidden, the name replaced with a number. The return home to a family that no longer shares your language.
- Reservation life 1950s–present: the specific constraints of reservation existence — federal trust land, tribal sovereignty, the specific poverty produced by systematic resource extraction. The IHS clinic with a two-week wait. The drive to the nearest town.
- AIM and Red Power (1968–1973, USA): the American Indian Movement, Wounded Knee 1973. A character who is young and radicalised in 1970 is inside a specific political awakening.
- Canadian "Sixties Scoop": parallel to the Stolen Generation — Indigenous children adopted into white families throughout the 1960s–80s. A character discovers at 40 that their adoptive family is not their only family.

**Māori in New Zealand** (1840–present):
- Treaty of Waitangi 1840 and its immediate betrayal: the agreement promised protection; within 15 years, land confiscation was systematic. A character in 1860s Waikato whose land is seized under the New Zealand Wars.
- Language suppression and revival: te reo banned in schools in the early 20th century, children punished for speaking it. The kōhanga reo (language nest) movement from 1982 — grandparents teaching language because parents don't know it.
- Māori renaissance 1980s–present: Treaty settlements, parliamentary representation, the specific pride of a culture that refused to die. A character who goes through school in the 1970s (shame) vs. the 2000s (pride) has completely different events.

**Amazonian Indigenous peoples** (Brazil/Peru/Colombia):
- First contact as a living event (1970s–present): some communities made first contact with the outside world within living memory. A character who is on the government contact team, or who is the first person from an isolated community to leave the forest.
- Deforestation: the logging road that arrives and doesn't stop. The specific experience of watching the place that contains your entire world shrink.
- FUNAI and state violence: the Brazilian Indian Service — sometimes protector, sometimes enabler of extraction. The specific betrayal of an institution supposed to represent you.

**Sami in Scandinavia** (Norway/Sweden/Finland/Russia):
- Reindeer herding under state pressure: the industrial wind farms, the mining operations, the roads built through grazing routes. A Sami herder in 2010 Norway watches the state that pays universal income also carve up the land their family has herded for 10,000 years.
- Language suppression and revival: Norwegian schools forbade Sami in the early 20th century (*fornorskingspolitikk*). The specific experience of a minority inside a welfare state that views itself as enlightened while systematically erasing you.

---

#### BUILD 20 — Labor, Strikes, and the Workers' Movement

The labor movement shaped the lives of billions of working-class people across the 20th century and is almost completely absent from the game. The eight-hour day, the weekend, the minimum wage — these were won by people who went on strike and sometimes got shot for it.

**The strike as a life event** (`events_labor.js`):
- The decision: to cross or not. The picket line is not abstract — it is your colleagues, people you know, the question of what you owe to people whose interests align with yours. Gate on working-class career + union flag.
- The duration: a strike that goes on for three months. The strike fund running out. Your child asking why there's no food. The specific calculus of solidarity vs. survival.
- The outcome: losing. The specific experience of returning to work after a failed strike, to the same boss, to the same conditions. Or winning — the specific experience of a collective victory, which is rare enough to be specifically notable.

**Key historical labor events** (world events):
- **Triangle Shirtwaist fire 1911** (USA): 146 garment workers die because the fire exits are locked. The event that transforms the labour movement. A character who works in garment manufacturing in New York in 1911 is in the room where the century's labour politics begin.
- **Spanish Civil War labor dimension** (1936–39): the anarchist unions (CNT/FAI) running factories in Barcelona during the brief period before they were suppressed by both Franco and the Communists. The specific experience of a Barcelonan worker in 1936 who is suddenly in a collectivised factory that runs without bosses.
- **UK miners' strike 1984–85**: Thatcher vs. the NUM. A year-long strike that destroyed the British coalfields. A character from a mining village in County Durham in 1984 lives through the specific experience of a community deliberately starved into submission by a government that has decided to win.
- **Solidarity in Poland as personal experience** (supplements Build 1 world events): not just the world event but the character-level experience. The underground publishing, the meetings in churches, the specific risk of being visible in a movement the state is watching.

**The Luddite moment** (any era, gated on career + technology):
- The specific experience of a skill made obsolete by a machine. The handloom weaver watching a power loom do in a day what took a week. The typesetter watching desktop publishing arrive. The accountant watching spreadsheet software arrive. The truck driver reading about autonomous vehicles. Different eras, same structure. Gate on career + relevant `currentYear` ranges.

---

#### BUILD 21 — Environmental Justice and Industrial Disasters

**Bhopal 1984** (world event, India):
- The Union Carbide pesticide plant leaks methyl isocyanate at 2am. 3,000 dead within days; 500,000 injured; 150,000 chronically ill. A character in Bhopal on December 3, 1984 — the specific sequence: the smell, the eyes burning, the running without knowing which direction, the morning after. The company's response: CEO Warren Anderson arrested, released, flies home, never extradited. Gate on India + Bhopal region flag.

**Chernobyl 1986** (expand existing world event with personal texture):
- Not just the disaster but the liquidators — the 600,000 people sent to contain it, told the doses were safe when they weren't. A Soviet character drafted as a liquidator. The health consequences they were told not to talk about.
- The evacuation of Pripyat: 50,000 people told "bring nothing, you'll be back in three days." They never came back. A character from Pripyat in 1986 — the apartment they left exactly as it was.

**Pollution as class** (ongoing character events, gated on archetype/GDP):
- The river that runs orange: a character who lives downstream of a mine, whose children have high lead levels, whose fish have spots. Gate on `subsaharan` or `developing_urban` archetype + specific country flags.
- The factory town: the specific trade — jobs vs. lung disease. A character who works at the factory that is poisoning the town, who knows it, who needs the job.

**Aral Sea** (supplements Build 13 Central Asia):
- A character from the town of Muynak, which was a fishing port in 1960, and by 1989 was 150km from water. The ships that sit rusting in the desert. The specific experience of a geography that used to be water.

---

#### BUILD 22 — The Body as Historical Experience

The body is lived-in, not just statted. The current system has health as a number but the body as a physical, aging, culturally-mediated experience is almost entirely absent.

**Menopause** (female character, ages 45–55):
- A life event that affects half of all humans and appears nowhere in the game. The specific cultural variation: in Japan, a relatively low-symptom experience attributed to different diet and lifestyle; in the USA, a heavily medicated one. In many subsaharan communities, the specific social status change that comes with it — the woman who is post-reproductive has a different social role.

**Pregnancy as physical texture** (beyond just "had a child"):
- Not the outcome (child) but the physical experience. The first three months — the nausea, the specific exhaustion, the keeping a secret. The specific way a pregnant body is treated differently in different cultures: the Congolese woman who continues farm labor; the American woman on bed rest; the Japanese woman expected to eat specific foods.
- Maternal mortality: a choice event where the character or a character's partner faces serious complications. The outcome branching on archetype/GDP/year. Maternal death in the 19th century was common enough to be an expected risk; the radical reduction in wealthy countries over the 20th century is itself an educational payload.

**The aging body specifically**:
- The first pair of reading glasses: the specific moment when the body requires external assistance for the first time. Small but universal.
- The body after illness: the cancer survivor who is a different person in their body afterward. The stroke that changes how a word comes out.

**Female genital mutilation** (character event, gated on specific countries/ethnicities/era):
- Practiced in 30+ countries, affecting 200 million living women. A character who is a girl in rural Somalia or Mali in 1975 faces this as an expected cultural event. The choice structure: does the family comply, does the character resist, what is the consequence of resistance? Gate very carefully by country + rural + era. Written with the same restraint as all other events — not sensationalized, not sanitized.

---

#### BUILD 23 — The Diaspora Who Didn't Leave

Emigration arcs are extensive. The inverse arc — the person who specifically chose to stay when their entire community left — has no events.

**The person who stayed** (`events_stayer.js`):
- The Jewish character in Berlin in 1937 who decides not to leave. The Irish character in 1950 who watches friends and siblings emigrate to England and America and stays. The South African character after apartheid ends who watches the white emigration to Australia and Perth and stays.
- The specific experience is not passive — it is a weight. The relationships with those who went. The question of whether you were right.
- Years later: the visit from the sibling who left. The comparison of lives. The specific resentment and the specific pride, on both sides.
- The country that empties: what it means to live in a country where the most ambitious or the most scared leave. Ireland in the 1980s. Zimbabwe in the 2000s. Lebanon in the 2020s. The specific social atmosphere of a country mid-exodus.

---

#### BUILD 24 — Cults, Sectarianism, and High-Control Religion

The religion arcs cover faith and doubt but not the specific experience of high-control religious environments.

**The cult or high-control religion** (`events_religion_arc.js` extension):
- Joining: the specific sequence — the genuine community offered, the love-bombing, the gradual increase in demands. Not generic but gated on specific religious flags + era + country.
- Shunning mechanics: a character disfellowshipped from a Jehovah's Witness congregation loses their entire social world overnight. Gate on JW flag + relevant year.
- Leaving: the specific experience of building a life outside the framework that organised everything. The re-entry problem — the specific skills of ordinary social life you were never taught.

**Sectarian violence as daily texture** (supplements Build 18 Northern Ireland):
- Not just the specific historical events but the ongoing texture: the murals, the painted kerbstones, the bonfire season, the walk to school that takes a specific route.
- Expand to: Sunni/Shia in Lebanon or Iraq (the specific way religion maps to neighbourhood, employment, marriage pool). Hindu/Muslim in Ahmedabad. The daily navigation.

---

#### BUILD 25 — The Census, Documents, and Official Identity

The state's power to define you — and to deny that definition — is a recurring historical mechanism with no specific events.

**The identity document as fate**:
- Rwanda 1994: Hutu ID card or Tutsi ID card. The ID card was colonial — Belgians invented the ethnic distinction and put it on a document. A character at a checkpoint in April 1994 with the wrong card. Gate on Rwanda + Tutsi ethnicity flag + 1994.
- Nansen passport (1922+): stateless people after WWI could get a Nansen passport — a document for people without a country. 450,000 issued. The specific experience of a document that lets you travel but doesn't give you a country.
- Soviet internal passport: without a *propiska* (residence permit), a Soviet citizen could not legally live in Moscow. The specific bureaucratic violence of being from a village and needing permission to exist in the city.
- Statelessness today: 10 million stateless people globally. A character born on a boat, or whose parents forgot to register them, or whose country ceased to exist — moving through a world that requires documents they don't have. Gate on `residencyStatus === 'refugee_status'` + specific flags.

**The census as a tool of power**:
- Colonial census creating ethnic categories that didn't exist in the same way before. The specific transformation of fluid identity into fixed administrative category. An event that names the moment a category becomes dangerous.

---

#### BUILD 26 — Missing Country/Region Completions

Significant countries and regions not yet covered in Builds 1–18:

**Pakistan** (1947–present):
- Partition and the specific experience of being Muslim in a newly-Muslim country built from displacement. The Muhajir (refugee) community in Karachi — people who gave up everything for a country that then treats them as second-class citizens.
- The 1971 war and the Bangladesh secession: a character in West Pakistan watching East Pakistan declare independence, or in East Pakistan living through the nine-month genocide before liberation.
- Zia ul-Haq's Islamisation 1977–88: Hudood ordinances (rape victims required to produce four male witnesses to avoid prosecution for adultery). A woman character navigates this as daily legal reality.
- Nuclear tests 1998: the specific national pride in the streets of Islamabad versus the international sanctions that follow.

**Sri Lanka**:
- The Tamil Tigers and civil war 1983–2009: the specific experience of a Tamil civilian in Jaffna in 1995. The Vanni as the last LTTE territory, surrounded in 2009. The specific civilian experience of a war's end that involved mass killing.
- Post-war Tamil diaspora: 800,000 Tamils in Melbourne and Toronto, many of whom funded the LTTE, now watching their money's consequences from abroad.

**Sudan / South Sudan**:
- Darfur 2003–present: a character who is Black African in Darfur in 2003 when the Janjaweed arrive. One of the 21st century's least-covered ongoing atrocities.
- South Sudan independence 2011 and immediate civil war 2013: the world's newest country collapses into ethnic violence within two years. The specific experience of a person who celebrated independence and then fled it.

**North Korea** (defection arc only):
- Not life inside (unverifiable at ground level) but defection: the crossing of the Tumen River into China, the specific broker network, the specific danger (Chinese government returns defectors; North Korea executes returned defectors). Gate extremely carefully — only fire for characters who have explicitly accumulated a defection-path flag, not for all North Korean characters.

**Tanzania**:
- Julius Nyerere's Ujamaa: African socialism's most ambitious experiment. Villagisation moved 5 million people; agricultural output collapsed. A Tanzanian farmer in 1975 is moved to a new village and told this is the African way to develop. The specific texture of an ideology's failure from inside it.

**New Zealand / Australia (non-Indigenous)**:
- The White Australia policy (ended 1973): a character who is Chinese or South Asian applying to emigrate to Australia before 1973 encounters the dictation test — a test in any European language the examiner chooses.
- New Zealand nuclear-free policy 1984: a character in Wellington in 1985 when the US frigate is refused port and the ANZUS alliance fractures. A small country choosing principle over alliance. The specific pride and the specific anxiety.

---

#### BUILD 27 — Generational Transmission of Trauma

How parents who survived atrocity parent their children — and what those children carry.

**Second-generation trauma arcs** (`events_inheritance.js`):
- The child of Holocaust survivors: the specific parenting that emerges from extreme trauma — the hypervigilance, the food hoarding, the unsayable that structures everything. Gate on `holocaust_survived` parent flag.
- The child of Partition survivors: growing up with the specific silences about the other side of the border. The house that was left. The name of a street in a city your parents never returned to.
- The child of disappeared parents (Argentina, Chile): growing up with a photograph, with a government silence, with the grandmother who goes to the plaza. The specific task of being someone whose parent was erased by the state.
- The intergenerational flag system: when a parent has `holocaust_survived`, `gulag_survived`, `apartheid_era`, or equivalent flags, there is a probability the child inherits a modified version (`holocaust_family_memory`, etc.) that gates specific events in their childhood and young adulthood. No new state model needed — flags carry across if the generational save mechanic (see below) is implemented, or can be approximated by early-childhood events conditioned on character birth year + country.

---

#### BUILD 28 — Automation, AI, and the 21st-Century Economy

For the 2020s–2060s era, alongside climate, this is the defining economic disruption. Currently absent.

**The automation event** (world events + career events, 2025–2050, gated on career):
- The truck driver reading about autonomous vehicles in 2028. Not the abstract economic argument but the specific moment — the headline, the calculator that shows what his route now costs with no driver, the boss's face when he asks.
- The radiologist whose hospital buys diagnostic AI in 2032. The specific experience of being made redundant not by a person but by a pattern-recognition system that is measurably better.
- The legal clerk in 2030. The accountant in 2035. The customer service worker who trains the chatbot that replaces them. Each with specific text, gated by career + currentYear.
- The people who benefit: the programmer who builds the system that replaces the worker. The specific moral discomfort of building something you know will hurt someone.

**Universal Basic Income** (political event, wealthy_west + 2030s+):
- The referendum, the argument over whether it's dignity or dependency. A character who needs it vs. a character who doesn't but has to vote on it. Gate on political_leaning for choice structure.

---

#### BUILD 29 — Voting, Elections, Referenda

The game has political regimes and political leaning but almost no events about the specific act of political participation.

**The first vote** (young_adult, gated on democracy + age 18–21):
- Not a stat tick but an event. The booth, the pencil, the specific weight of the first time. Varies enormously by culture: profound obligation in some, civic routine in others, one of the things you did today along with buying bread.

**The election that changes everything** (world events or character events, gated by country + year):
- South Africa 1994: a character who queues for six hours to vote for the first time at age 60. The line extending further than they can see.
- Germany March 1933: a character who votes against Hitler, watches the result come in, goes home and calculates what it means.
- Zimbabwe 2008: Mugabe rigs an election so brazenly the opposition wins the first round, results delayed five weeks, run-off held with no opposition candidate. A Zimbabwean who voted in March 2008 and watches this unfold.

**The referendum as biography** (character event, gated on country + year):
- 1995 Quebec sovereignty referendum: 49.4% vote yes. A Francophone Quebecer who voted yes and watched the result decided by 50,000 votes. The specific experience of *almost*.
- Brexit 2016: a character who voted Leave in a Remain area, or Remain in a Leave area. The specific social fracture around a table that doesn't heal.

---

#### BUILD 30 — The Small Life: Local, Particular, Unhistoric

Some of the game's strongest potential events involve no historical reference at all — the texture of a life that leaves no record.

**The local hero arc** (`events_local.js`):
- The person who is genuinely significant in a radius of five kilometres. The football coach whose team wins the regional championship. The village healer whose knowledge keeps people alive. The local historian who is the only person who remembers what this place was. Small renown is a specific experience: you are known before you've done anything notable, and you are forgotten within a generation.

**The garden / the allotment**:
- Growing food as a psychological anchor. The specific community of a British allotment site. The Cuban *patio* garden during the Special Period. The Afghan widow's kitchen garden that is both survival and the thing the day is organised around. Gate on age 40+ + specific archetype/country combinations.

**The letter**:
- Pre-email, correspondence arrives with specific weight. The letter from the son in America. The letter from the government. The letter with no return address. Letters as physical objects that contain time — the envelope held before opening, the handwriting recognised or unfamiliar. Gate on era (pre-2000 preferred) + relationship flags.

**The neighbour**:
- A whole category of human experience — the person you didn't choose, who shares your wall. The neighbour who watches your children. The neighbour you've never spoken to in five years. The neighbour who reports you. The neighbour who hides you. Gate on regime for the dangerous variants; leave unmodified for the texture variants.

---

#### BUILD 31 — The One-Child Policy Arc (China, 1980–2015)

One of the most consequential demographic policies in history. Entirely absent from current coverage.

**The little emperor**: Growing up as the sole focus of two parents and four grandparents. The specific weight of concentrated expectation. The loneliness of having no siblings in a culture where sibling relationships had always been the basic social unit.

**The hidden second child**: The family that decides to have another anyway. The registration evasion, the family member who keeps the secret, the fine that arrives — a year's income, sometimes more. The child who technically doesn't exist on paper.

**The missing sisters**: Sex-selective abortion and abandonment driven by the policy intersecting with son preference. A character who grows up knowing, without anyone saying, that they were not the first. The orphanage system. The international adoption wave (ties to BUILD 36).

**The only child as sole support**: At 40, a character who is the sole caregiver for two aging parents and four aging grandparents. No siblings to split the cost, the time, the grief. Gate on China + `only_child` flag set at character creation.

**The policy lifted**: A character who is 35 in 2015 when the two-child policy is announced. The specific experience of a government telling you to do what it just spent 35 years telling you not to do. Some have another child; some can't anymore; some don't want to.

---

#### BUILD 32 — Urban Slums and Informal Settlements

The game has `ruralUrban` but no neighborhood-level specificity. A character born in Kibera has completely different events from one born in Nairobi's middle-class suburbs.

**Add `neighborhood` to character state**: `'informal'|'working_class'|'middle_class'|'elite'`, set at character creation weighted by archetype/GDP, modifiable by wealth thresholds over the life course.

**Informal settlement events** (gated on `neighborhood === 'informal'`):
- The eviction notice: the city government wants the land for development. Sometimes the notice arrives with a week's warning; sometimes with bulldozers. The question of where to go.
- The standpipe: water arrives in the settlement on a schedule — two hours a day, at 5am. The jerry can. The queue. The specific daily organization of life around water access.
- The landlord who lives two streets away: slumlords in informal settlements are often not distant corporations but local figures who own five shacks and are also your neighbor's cousin.
- The fire: informal settlements burn. The specific speed, the specific loss, the specific community rebuilding that begins before the embers cool.
- Dharavi, Kibera, Rocinha, Mathare, Orangi Town — city-specific names and textures via `G.currentCountry`.

**Gentrification** (midlife event, gated on `neighborhood` improving via wealth):
- The character who bought their way into a better neighborhood returns to the old block and finds it unrecognizable — or priced out, returns to find they can't afford where they grew up.

---

#### BUILD 33 — The Sex Work Arc

A major global labor category. Not sensationalized — treated as work with the same specificity applied to every other career.

**Entry**: The decision, which is rarely simple. Economic necessity in one context, survival sex in a refugee camp in another, choice in a decriminalized European context in a third. Gate text on archetype/country/era.

**The safety calculation**: Every shift involves a calculation that office workers don't make. Gate on country's legal status (criminalized vs. tolerated vs. legalized). The police as a variable: sometimes protection, often the opposite.

**Legal context branching** (gates on country + year):
- Netherlands post-2000: legalized, regulated, taxable, but stigma persists
- Thailand: tolerated but not legal; the tourist economy built around it
- Nigeria: criminalized; the specific danger of a state that can arrest you and then extort you
- Refugee camp: survival sex with no legal framework at all, no exit in sight

**The client economy**: The regular client who is almost kind, which is its own problem. The client who isn't.

**The exit arc** (or the lack of one): The character who gets out — into what? The character who doesn't — why not? Gate on wealth, age, available alternatives, children.

---

#### BUILD 34 — The Refugee Camp as Childhood

The immigration resettlement arc covers arrival in a host country. This covers *growing up in a camp* — a completely different experience.

**Camp-born generation**: A character born in Kakuma, Dadaab, Zaatari, or Cox's Bazar who has never known anything else. The UNRWA school. The ration card as the document of your existence. The camp as the only geography known — its streets, its sections, its social hierarchies that exist nowhere else on earth.

**The waiting**: Resettlement interviews are the only exit. A character who has been waiting since childhood is 17, then 25, then 35. The UNHCR officer who comes once a year. The list you may or may not be on.

**The camp economy**: Formal employment is usually forbidden. The informal economy — the repair stall, the phone charging station, the cooking enterprise — is everything. A character who has built something within the camp's constraints, and what it means to leave it.

**Palestinian UNRWA camps specifically**: The multigenerational camp — a character whose grandparents arrived in 1948 and whose parents were born in the camp and who is the third generation. The key kept on a hook. The house that exists as a memory and a legal claim and a story told to children.

**Resettlement as rupture**: The character who finally gets resettlement papers at age 30, after 20 years in the camp. The specific disorientation of arrival in a world with supermarkets and traffic lights and social norms that were not taught.

---

#### BUILD 35 — The Informal Economy

Billions of people work outside the formal career system. The current career system is entirely formal. This build adds informal work as a primary mode for low-GDP archetypes.

**Informal work as a baseline state**: For `subsaharan`, `developing_unstable`, and `conflict_zone` archetypes at low GDP tiers, the default work state is informal — not a named career but a pattern of daily economic activity. Events fire around this pattern rather than career promotion tracks.

**Event types**:
- The hawker: the route, the product, the spot that belongs to you by informal convention, the municipal inspector who arrives with a fine or an open hand
- The *matatu* / motorcycle taxi: the vehicle that is both asset and income, the repair that wipes a week's earnings, the police checkpoint that costs what it costs
- The market stall: the supplier relationship, the credit extended and called in, the neighboring stall holder who becomes a kind of family, the market that is demolished for a development
- The day laborer: the gathering point at 6am, the contractor who picks some and not others, the work that may or may not pay what was agreed

**The formalization event** (midlife, gated on `informal_worker` flag + government policy + year): The government decides to license or tax informal workers. The character who gets documentation for the first time. What it costs. What it opens.

---

#### BUILD 36 — The Adoptee Arc

Domestic adoption, international adoption, transracial adoption. Each has a different emotional and political texture.

**Domestic adoption** (various contexts):
- The Romanian orphanage system: Ceaușescu banned contraception; orphanages overflowed with children the state couldn't care for. Post-1989, Western families adopted en masse. A Romanian child who grows up in France or the US has a specific origin story.
- The Chinese international adoption wave (1990s–2010s): almost entirely girls, product of the one-child policy intersecting with son preference. Growing up as the only person who looks like you in the family photo, in the town.
- Korean adoption: the longest-running international adoption program, 1950s–present. The Korean-born adult who returns to Seoul and navigates a city that should feel like origin and doesn't.

**The search** (young_adult or midlife event):
- The decision to search for biological parents — or the decision not to. Both are live choices with different emotional logic.
- The DNA test in 2010+ that changes the question. The match with a half-sibling in a country you've never been to.

**The transracial identity question**: Growing up Black or Asian in a white family and a white town. The specific experience of being asked where you're *really* from by people who have known you for years.

**The origin trip** (optional late arc event): Returning to the country of birth as an adult. What it resolves and what it doesn't.

---

#### BUILD 37 — Debt Bondage and Bonded Labor

Not poverty — a legal/semi-legal trap with its own specific mechanism. Currently the `debt` state field exists but has no events.

**The bonded labor system** (India, Pakistan, Nepal — gated on archetype + low GDP + low literacy):
- The initial loan: a small amount taken during a family emergency, at interest rates that make repayment impossible. The work that services the interest without touching the principal. The debt passed to children at the parent's death.
- The specific industries: brick kilns, carpet weaving, agriculture, domestic service. Each has its own texture.
- The abolition that isn't: bonded labor has been illegal in India since 1976. The law exists; the practice continues. The character who reports it navigates a legal system designed to process the complaint slowly.
- The liberation event (rare): an NGO or sympathetic official intervenes. The specific difficulty of leaving when the lender is also the landlord is also the person who controls your family's access to water.

**The microfinance debt spiral** (Bangladesh, India, 2000s–present):
- The Grameen model worked for some; for others, the monthly repayment meeting becomes a social pressure system where defaulting means humiliation in front of neighbors. A character who takes a second loan to repay the first.

**Sharecropping in the American South** (gated on Black American ethnicity + US + 1930s–60s):
- The specific accounting that ensures the sharecropper never comes out ahead. The ledger the landowner controls. The crop lien that means the harvest doesn't belong to the person who grew it.

---

#### BUILD 38 — The Children Left Behind

The inverse of the emigration arc. The children whose parents are in Riyadh, Rome, or Hong Kong sending remittances — raised by grandmothers, communicating via video call, reuniting with a stranger.

**The remittance family**: A child in the Philippines, Indonesia, Sri Lanka, Mexico, or Eastern Europe whose primary parent is working abroad. Material security purchased at the cost of presence. The birthday call. The package that arrives with things that don't fit.

**The grandmother as primary parent** (character event, childhood phase):
- The specific texture of being raised by a grandparent — different rules, different era, different capacity. The things the grandmother can and can't do that a parent would do.

**The return**: The parent who comes home after five years. The specific disorientation of reunion with someone who is supposed to be known. The child who is now 15, not 10, and doesn't know how to be a child to this person anymore.

**The cost accounting** (young adult event):
- The character who is now 22 and considers whether the money was worth it. The house that was built. The education that was paid for. The relationship that wasn't. No right answer built into the event — just the accounting.

**Specific geographies**:
- Philippines → Saudi Arabia / Hong Kong / Italy (OFW arc, supplements BUILD 2)
- Indonesia → Malaysia / Saudi Arabia
- Sri Lanka → Middle East
- Romania / Bulgaria → Spain / Italy / Germany (EU free movement era, 2004+)
- Mexico → USA

---

#### MECHANICAL IDEAS (no build number — evaluate when relevant)

*These are systemic additions worth considering alongside content builds.*

- **The generational save**: On death, play the character's child, inheriting specific flags (not stats). A child born to a character with `holocaust_survived` starts with `holocaust_family_memory`. The game becomes multi-generational without requiring it. This would make the intergenerational trauma arcs (Build 27) much more powerful.

- **The dream/memory**: Occasionally an event "replays" an earlier event with new framing. At 55, a childhood event is recalled — not the original text but a memory of it, recontextualized by what the character has become. Requires no new state, just careful event design that references prior flags.

- **The newspaper headline UI**: One-line historical headlines injected into the Life screen at historically accurate moments. Not events — just texture. "BERLIN WALL FALLS" on November 9, 1989. "MANDELA FREE" on February 11, 1990. These cost almost nothing to implement and dramatically increase immersion.

- **Weather as texture**: Seasonal descriptors in the event or life log — "a dry harmattan wind carries red dust through the city" for Abuja in January, "the monsoon has been six weeks late" for Bangladesh in July. Gate on country + approximate season. No stat effects; purely atmospheric.

- **The oral tradition register**: For characters in pre-literate or low-literacy contexts, events are framed as told rather than written. "Your grandmother tells you about the year the rains didn't come." Historically accurate and a distinct prose register from the educated character's events.

- **The neighborhood field**: Add `neighborhood: 'informal'|'working_class'|'middle_class'|'elite'` to character state, set at creation (weighted by archetype/GDP) and modifiable by wealth thresholds during the life course. Gates a whole class of events (BUILD 32) and makes the `ruralUrban` field more granular without replacing it.

- **The soundtrack layer**: One-line cultural markers injected alongside newspaper headlines — not historical events but cultural ones. "Fela Kuti's *Zombie* is banned in Nigeria." "Celine Dion's *My Heart Will Go On* is playing everywhere." No stat effects. Same implementation cost as the headline UI, doubles its power.

- **Infrastructure arrival as a life event**: Electricity arriving in a village is one of the largest single quality-of-life changes in a person's life — and it is a one-time historical event with a specific before and after. The morning the first bulb comes on. Gate on country + ruralUrban + year (electrification rates by country are well-documented). No stat model change needed; handled as a character event with a permanent memory flag.

- **The `what your parents didn't say` mechanic**: When a parent has atrocity-adjacent flags (`holocaust_survived`, `gulag_survived`, `partition_survived`, etc.), an early-childhood event fires that is specifically about absence — the topic that is never named at the dinner table. No new state needed. Requires only that the parent-flag inheritance logic in character creation passes the flag through to the child's accessible G context.

- **Formal debt as a character arc**: The `debt` field exists but almost no events engage with the *experience* of debt — the creditor call, the asset repossession, the bankruptcy decision, the decade of rebuilding. A `events_debt.js` module gated on `state.debt > threshold` + archetype/year would cover: credit card debt spiral (USA 1990s+), student loans as generational story (wealthy_west 2000s+), microfinance spiral (developing_urban, see BUILD 37), IMF structural adjustment as personal experience.

- **The informal worker state**: A `workStatus: 'formal'|'informal'|'unemployed'|'subsistence'` field alongside the existing `career` field. For archetypes where formal employment is not the default, this unlocks informal economy events (BUILD 35) without needing a named career. Career remains the prestige track; `workStatus` covers everyone else.

---

#### MICRO-EVENT DESIGN PRINCIPLE

*Added based on brainstorm session. Applies to all new events going forward.*

The game's best events are not about big things but about one specific object or moment inside a big thing. Some principles:

- **The thing you ate**: During a famine or period of extreme poverty, name the specific food — not "there was not enough" but "your mother boiled nettles" or "the communal pot had only liquid." The object carries the event.
- **The moment of receipt**: For enormous historical events, the event as the character received it — where they were, what they were doing, who spoke first. Not "the revolution happened" but "you heard it from the neighbour who had a radio."
- **The border crossing**: Not "you emigrated" but the physical moment — the fluorescent light, the desk, the question "purpose of travel," the specific object they removed from your bag and held up.
- **The compromise sentence**: Under authoritarian regimes, the specific words spoken in complicity — in a meeting, at a checkpoint, to a colleague — and the pause before them. The moral weight lives in the pause, not the abstract fact of the regime.

- **The oral report**: In pre-literate or low-literacy contexts, events should sometimes be framed as received speech rather than witnessed experience. Not "you read about it" but "your uncle came back from the market and said." One register change; completely different world.

- **The gap in the record**: For events that are historically documented only from the outside (Holodomor, Great Leap famine, Bangladesh genocide), the character's knowledge should be partial and named as such — not as a disclaimer but as a narrative technique. "No one uses the word yet. It doesn't have one."

- **The thing not unpacked**: In migration and displacement events, the object that was packed and then never unpacked. The box in the corner of the new apartment, still sealed three years later. What is inside it is not said. It doesn't need to be.

These principles should inform the prose register of every new event, not just events in these specific categories.

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

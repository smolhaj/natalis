# natalis — Developer Context

## Vision

natalis is a life simulation game with a specific dual mandate: **fun and education in equal measure**. The goal is that a player who runs a character born in 1962 in Nigeria should come away understanding what that life was actually like — the regime, the economy, the religion, the technology available, the historical events that shaped the era — not just a generic set of stats.

Every system should ask: *does this reflect what it would actually have been like to be this person, in this place, at this time?* If it doesn't, it's not done yet.

The tone is literary, not gamey. Event text reads like short fiction — sparse, specific, emotionally honest. No exclamation points. No "You gain +5 Happiness!" framing. The prose is the experience.

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

Events live in:
- `src/data/events.js` — base events (430+ inline) + imports all 120 modules into `EVENTS` export (~2,540+ total character events)
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
- `src/data/events_late_life.js` — late-life events (retirement, partner decline, legacy, loneliness)
- `src/data/events_children_arc.js` — children arc events (child milestones, teen years, adult child relationships)
- `src/data/events_fame_karma.js` — fame/karma/hobby/friendship events
- `src/data/events_texture.js` — rural developing world, pre-1960 era, career peak/decline
- `src/data/events_society.js` — women's rights milestones by country/year, healthcare by archetype, language suppression/identity
- `src/data/events_romance_arc.js` — post-marriage arc: infidelity, couples therapy, long-haul happiness, partner illness
- `src/data/events_consequence.js` — downstream consequences: illiteracy, post-9/11 Muslim discrimination, addiction recovery arc, STI arc, driving licence
- `src/data/events_friends.js` — friend lifecycle: drift, reconnect, friend's illness/divorce/death, money requests
- `src/data/events_business.js` — business arc: key hire, first client, acquisition offer, cashflow crisis, failure and restart
- `src/data/events_siblings.js` — sibling events: rivalry, emigration, estrangement, late illness/death
- `src/data/events_education_arc.js` — university depth: failure, dropout decision, first-gen pressure, debt
- `src/data/events_adolescence.js` — adolescence identity: racial/gender discrimination, faith doubt, talent, political awakening
- `src/data/events_fertility.js` — fertility depth: miscarriage, IVF, childlessness, late pregnancy complications
- `src/data/events_career_wealth.js` — career late-arc, wealth gap, rural-to-urban events
- `src/data/events_gulf_east.js` — wealthy_gulf and wealthy_east specific events
- `src/data/events_followthrough.js` — 25 follow-through events for previously orphaned flags
- `src/data/events_followthrough_2.js` — 18 additional flag follow-through events
- `src/data/events_relationship_quality.js` — 13 events gated on relationship quality thresholds (partner/child/sibling/friend)
- `src/data/events_desires.js` — 12 formative wound events (early_childhood, fires once) + decade reflection events at 30/40/50/60
- `src/data/events_small_life.js` — 21 small moments: named friendships, first crushes, formative teachers, stranger kindness, first home
- `src/data/events_activity_payoffs.js` — 15 downstream consequences for activity flags (clubs, therapy_veteran, generous, tattooed)
- `src/data/events_places.js` — 24 place-based events: family moves, internal migration, arrival texture
- `src/data/events_infrastructure.js` — 10 infrastructure events: power cuts, floods, traffic, air quality, water shortage
- `src/data/events_dying_city.js` — 11 Rust Belt + post-Soviet urban decline arc events
- `src/data/events_cities.js` — 30 city-specific texture events (Lagos, Mumbai, Cairo, Mexico City, Moscow + era-branching)
- `src/data/events_cities_extended.js` — extended city events across more cities
- `src/data/events_rural_texture.js` — 29 rural/suburban texture events: water walk, market day, electrification, brain drain, kolkhoz, panchayat, ejido, Midwest church
- `src/data/events_post_soviet.js` — 15 post-Soviet personal arc events: communist childhood (Pioneer, space optimism, job assignment), 1990s collapse (factory closure, savings wiped, sudden poverty), oligarch split, emigration wave (Jewish/Law of Return, German Spätaussiedler, professional brain drain), follow-through events
- `src/data/events_illness.js` — 14 chronic illness events: diabetes (2 variants), heart disease, survivable cancer, COPD, back pain (2 variants), HIV/AIDS (era-branched: pre-1995 severe, 1996+ manageable), vision loss, hearing loss, chronic depression, disability from injury; plus follow-through callbacks (diabetes decade, cancer scan)
- `src/data/events_parent_care.js` — 8-event arc: parental decline through to death (first sign → conversation → decision → daily reality → sibling disagreement → bad day → last conversation → final decline + `killParent()`)
- `src/data/events_latin_america.js` — 50 events covering Chile (DINA, exile, plebiscite, Rettig), Argentina (Proceso, Falklands, Nunca Más, Nietos), Brazil (AI-5, Tropicália, economic miracle, Diretas Já, evangelical rise), Colombia (cartel adjacency, cartel offer, kidnap culture, displacement), Mexico (PRI machine, 1985 earthquake, 1982 devaluation, 1994 NAFTA/Zapatista, maquiladora), Peru (Sendero, Fujimori), Venezuela (Chávez, exodus), Cuba (CDR, Special Period, balseros, double economy), Bolivia (coup texture, Evo Morales), Guatemala (Ríos Montt, 1996 peace), Haiti (Tonton Macoutes, 2010 earthquake), Operation Condor (cross-border mechanic), Football (1978 Mundial, 2014 Copa)
- `src/data/events_country_arcs.js` — 22 events for deeper country arcs: Nigeria (coup radio, first-gen degree, Biafra colleague, oil boom surrealism), India (Partition rebuilding, Emergency 1975, Green Revolution), South Korea (Korean War displacement, Park Chung-hee bargain, DMZ family), Egypt (Nasser/Suez, 1967 defeat, Tahrir → betrayal), Romania (Ceaușescu systematisation, Securitate informer, December 1989), Turkey (coup-by-announcement texture), Kenya (Mau Mau choice, Kenyatta accommodation, Moi kleptocracy), Ghana (Nkrumah radio, 1966 coup grief, brain drain), Ethiopia (Red Terror student, 1991 Derg fall)
- `src/data/events_followthrough_3.js` — additional flag follow-through events: `out` ordinary life milestone, `in_recovery` one-year chip, and other orphaned flag callbacks
- `src/data/events_early_life.js` — 20 events filling the thinnest phases: 10 early_childhood (ages 0–5: first school, absent parent, new sibling, object of your own, witnessing adults, early illness, hunger, television arrives, night fear, first friend) + 10 young_adult (ages 18–25: first apartment, just-a-job, first real failure, friend group scatters, adult breakup, money zero, flatmate, city arrival for rural characters, mistake owned, political moment)
- `src/data/events_decolonisation.js` — 10 events covering the decolonisation era and its aftermath (1950s–2010s): independence morning, new schools, first coup, Pan-Africanism/OAU, structural adjustment, SAP clinic closed, brain drain wave, Nehruvian moment (India), post-adjustment generation, mobile phone leapfrog
- `src/data/events_labor.js` — 9 events covering the labour movement: union card, strike called, picket line, three months in, strike defeat (auto), strike victory (auto), Luddite moment (era-branched), solidarity test, first boss
- `src/data/events_climate.js` — 18 climate arc events (2025–2100): hottest summer, climate anxiety, drought displacement, coastal flooding, Pacific extinction, Gulf wet-bulb, late-life witness, plus follow-throughs
- `src/data/events_indigenous.js` — 21 Indigenous peoples events: Aboriginal Australian, Native American/USA, First Nations/Canada, Māori/NZ arcs + cross-cultural follow-throughs
- `src/data/events_automation.js` — 12 automation/AI arc events (2025–2050): trucker, radiologist, lawyer, factory, programmer, data scientist, customer service, UBI debate, retraining outcome
- `src/data/events_vietnam.js` — 10 Vietnam arc events: Fall of Saigon southern family experience, re-education camp aftermath, boat people decision, Doi Moi reform generation, Viet Kieu diaspora texture
- `src/data/events_wealth_system.js` — 17 wealth mechanics events: banking access, gold/jewelry hoarding, ROSCA/tontine, hyperinflation survival, joint family dissolution, marriage wealth transfers, gender financial restrictions, farming debt cycle, mobile money, patron-client dynamics, poverty trap
- `src/data/events_money.js` — 7 money-across-a-life events: first paycheck choice, hyperinflation survival, first debt, inheritance, the gift, elder scam, counting days to payment
- `src/data/events_country_arcs_2.js` — 28 events: China/Mao era (land reform, Great Leap famine, Red Guard, send-down, Deng reforms, Tiananmen, one-child policy); USA (civil rights, Birmingham, Vietnam draft, AIDS watch, Rust Belt, McCarthyism, Great Migration, opioid crisis); Japan (hibakusha, Anpo protests, Minamata, salaryman, karoshi, bubble collapse)
- `src/data/events_asia_arcs.js` — 25 Asia arc events: Cambodia (Khmer Rouge evacuation, Year Zero, denunciation, liberation, UNTAC, ECCC); Bangladesh (Liberation War, flood, garment worker, Rana Plaza, cyclone, microfinance, remittance); Pakistan (Muhajir, East Wing war, Zia Islamisation, blasphemy law, nuclear tests, ISI, 2010 flood, arranged meeting)
- `src/data/events_crosscutting.js` — 22 cross-cutting arc events: domestic worker arc (7 events); city under bombardment arc (8 events); refugee camp arc (7 events)
- `src/data/events_drc.js` — 9 DRC arc events: independence speech, Lumumba death, Mobutu authenticité renaming, institution decay, Second Congo War, eastern displacement, coltan mining, Kinshasa soukous, church community
- `src/data/events_internet_era.js` — 15 internet era events: AOL dial-up, PC bang Seoul, cybercafé Lagos/Cairo, VKontakte Russia, lan house Brazil, M-Pesa Kenya, Facebook arrival, smartphone arrival, dotcom arc, 1990s end-of-history, Asian crisis personal 1997
- `src/data/events_zimbabwe.js` — 6 Zimbabwe arc events: independence optimism, Gukurahundi (Ndebele-gated), land seizure (both perspectives), hyperinflation, exodus to South Africa
- `src/data/events_country_arcs_3.js` — 13 country arc events: Iran (White Revolution literacy corps, SAVAK social texture, 1979 revolution week, post-revolution leftist purge, Iran-Iraq War son); South Africa (township uprising 1985, white beneficiary, Indian/Coloured Tricameral Parliament, TRC testimony); France WWII (occupation grey zone, Vel d'Hiv Jewish character event, liberation/épuration, colonial veterans contradiction); Nigeria/Biafra (Igbo perspective, federal perspective, post-war silence)
- `src/data/events_arts.js` — 9 arts-under-pressure events: Soviet samizdat (receiving + writing arcs), jazz/bebop as Black American refusal, Jim Crow touring, Nollywood entry + decade callback, the censored artist's stay-or-leave choice (dynamic text by country), work in the drawer, artistic integrity echo
- `src/data/events_followthrough_4.js` — 10 flag follow-through events covering orphaned flags: caste career ceiling, corporate scandal resurfaces, betrayal trust patterns, harvest failure pantry reflex, civil war news echo, ethnic minority identity navigation, dissident reader cost (regime-gated), refugee five-year anniversary, political active regime cost, dissident writer arrest risk
- `src/data/events_followthrough_5.js` — 12 events: 8 flag follow-through events for flags set by BUILD 40 and other orphaned flags (civil rights generation legacy, resistance through art recognized, art shown late, compromised ledger, censored journalist story, intimidated body reflex, independence generation reckoning, first coup not last) + 4 famine personal arc events (BUILD 49: market price sign, body changing, selling assets, midlife pantry reflex)
- `src/data/events_informal.js` — 18 informal economy events (BUILD 35): entry event setting workStatus='informal', hawker track (route/inspector/rain), moto taxi track (start/repair/police), market stall track (neighbor/demolition/supplier debt), day labor track (gathering/unpaid), subsistence farm (good year/bad year), mobile money, savings circle (ROSCA-like), formalization flip, midlife reckoning
- `src/data/events_neighborhoods.js` — 16 neighborhood-tier events (BUILD 32): informal tier (standpipe, settlement fire, nearby landlord, thin walls, generator envy, school distance, gang block, government upgrade, home business), working class (solidarity, noise), cross-tier (moving-up guilt, elite isolation, elite teen guilt, gentrification return, good-years memory)
- `src/data/events_postrelease.js` — 12 post-release events (BUILD 48): release morning (political prisoner branch), job application checkbox (USA felony text, 3 choices), lie discovered (background check), housing difficulty (USA public housing text), parole conditions, parole near-breach, family reunion, recidivism trap, USA rights lost, spent conviction (UK/EU), decade clean, political prisoner dignity event
- `src/data/events_mentor.js` — 10 mentor arc events (BUILD 47): mentor deepens (coffee meeting), favor asked, estrangement, mentor dies (sets lost_mentor), mentor echo at 58+; becoming mentor (generates protegeName), protégé surpasses, protégé betrayal (3 choices), both arcs reflection, adolescent teacher echo
- `src/data/events_adolescence_2.js` — 21 adolescence depth events: first job, curfew break, authority clash, exam results, scholarship test, dropout temptation, peer betrayal, rumour, peer death, diaspora identity, family honour, faith doubt at home, peer pressure, first smoke, shoplifting, social media pressure, body image, leaving question, privilege mirror, school fight, community service
- `src/data/events_childhood_texture.js` — 19 childhood texture events (Sprint 4): universal small-life events for ages 6–17, ensuring at least one event fires per year across the childhood span
- `src/data/events_family_silence.js` — 20 generational memory events (Burst D): the "what your parents didn't say" mechanic — early-childhood events gated on generational trauma flags (holocaust_family_memory, gulag_family_memory, partition_family_memory, etc.), framed as absence rather than the atrocity itself
- `src/data/events_dying_arc.js` — 6 events for the final years (Burst F): age 75+, the specific consciousness of a person who knows they are near the end; not about death as a stat but about how it reshapes the present
- `src/data/events_solo_life.js` — 8 solo life events (Burst E): unpartnered characters moving through life — not loneliness as failure but the specific texture of a life that doesn't centre around couplehood
- `src/data/events_coherence.js` — 11 coherence/follow-through events (Burst G): orphaned flag follow-throughs for flags without downstream consequences
- `src/data/events_poverty.js` — 43 financial hardship events (Burst I): eviction, repossession, foreclosure, debt collectors, wage garnishment, homelessness, welfare, moving in with relatives — both childhood and adult phases
- `src/data/events_pregnancy.js` — 13 pregnancy and birth arc events (Burst J): first-trimester texture, pregnancy arc, birth (archetype/GDP/year-branched), maternal complication, postpartum period; engine changes support `pregnant` flag + `pregnancyYear` mem for multi-year arc
- `src/data/events_menopause.js` — 5 menopause arc events (Burst K–M): female character, ages 45–58, culturally-branched (Japan low-symptom, USA medicalised, subsaharan status change, post-Soviet stoicism)
- `src/data/events_career_arcs.js` — 19 deep career arc events (Burst K–M): athlete (injury, identity, transition out), academic (tenure clock, publish-or-perish, defining student, burnout), chef/hospitality (kitchen grind, ownership arc, creative arc, staff cost)
- `src/data/events_social_media.js` — 9 social media arc events (Burst K–M): country-specific platforms (Facebook/MySpace West, VKontakte Russia, WeChat/Weibo China, KakaoTalk Korea, MXit South Africa); arc from genuine excitement through addictive phase to damage and choosing to leave or not
- `src/data/events_scandinavia.js` — 8 Nordic events (Burst N+O): welfare state from inside, Norway oil discovery, Finland Winter War, Sweden WWII neutrality/grey zone, Janteloven social pressure
- `src/data/events_palestine.js` — 8 Palestine character events (Burst N+O): Nakba displacement family memory, checkpoint as daily fixture, house demolition, permit system, Oslo brief hope, intifadas, post-2006 Gaza/West Bank divergence
- `src/data/events_gang.js` — 10 gang/organised crime arc events (Burst Q): archetype-specific entry points (post-Soviet bratva/krysha, Lagos Area Boys, cartel-adjacent Colombia); progression from petty crime through membership and consequences
- `src/data/events_social_capital.js` — 8 social capital events (Sprint 3): charisma and looks as era- and culture-dependent resources; gated on stat thresholds
- `src/data/events_world_response.js` — 6 world event response events (Sprint 2): character events that fire in the year of a major world event, giving one meaningful choice response; gates on the world event's flag already being set
- `src/data/events_emigrant_integration.js` — 7 emigrant integration arc events (Sprint 5): staged by `G.yearsAbroad` — disorientation (yr 1), acclimation (yr 2–3), permanence question (yr 3–6), belonging with asterisk (yr 6–12), old country as destination (yr 12+)
- `src/data/events_intimacy.js` — 12 sex and intimacy arc events (BUILD 45): sexual revolution arc (female/wealthy_west 1967–77 + midlife reckoning), long marriage desire shift, affair temptation choice (taken/not taken) with weight and echo follow-throughs, late beginning (solo vs. seeking), late love arriving, sexuality in cultures without vocabulary, body in late life, solo life texture, first love ending
- `src/data/events_school.js` — 11 school institution events (BUILD 46): resource-poor classroom (60 children/1 teacher), teacher who came unpaid + midlife echo, shared textbook (rural), scholarship arrival + social texture (the lunch table) + young-adult payoff, war-zone school attendance choice, year-gap follow-through, national exam (archetype-branched) + exam echo
- `src/data/events_followthrough_6.js` — 11 follow-through events (BUILD 54 continued): flag follow-throughs for orphaned flags from BUILD 45/46/38/23: first love midlife reflection, liberation generation late retrospective, long marriage in late life, cultural intimacy without vocabulary (late echo), intimacy with partner in bodily decline, scholarship declined midlife wonder, class gap known in career context, war school midlife echo; raised by extended family midlife loyalty, understood-the-cost non-emigrant path, witness-to-exodus late-life
- `src/data/events_children_abroad.js` — 7 events (BUILD 38): parent departure (country-specific: Philippines Gulf, Mexico border, Romanian EU), raised by extended family texture, birthday call (era-branched pre/post-2005), package with wrong sizes, reunion with stranger at arrivals, young-adult cost accounting (both columns), midlife cycle repeating when own child is the age you were
- `src/data/events_stayed.js` — 5 events (BUILD 23): watching the departures (country/era-branched: Ireland 1979–93, Zimbabwe 2001–13, Lebanon 2019+, Poland/Romania, Ghana/Nigeria/Ethiopia), country-empties midlife texture, sibling who went visits, still receiving their calls in late life, late reckoning on the choice to stay
- `src/data/events_sport.js` — 11 events (BUILD 39): local neighborhood match (football countries, childhood), cricket at school (cricket countries, childhood), watching with parent (midlife echo), the scout arrives + two-choice path (subsaharan + high fitness), the window closes (sport_exit_attempted, young_adult), cricket's imperial inheritance (South Asian/African, young_adult), World Cup year (significant year guard), Sunday adult league, the last game, teaching the game to a child, cricket legacy in late life
- `src/data/events_disasters.js` — 8 events (BUILD 53): Bangladesh flood season (cooldown 5, rural), the bad flood year (young_adult), flood from distance (emigrated), earthquake preparedness (Japan/Turkey/Mexico/Chile/etc, young_adult), earthquake experience (midlife), typhoon season (Philippines/Vietnam/Japan, cooldown 6), typhoon bad year (Philippines, young_adult), living with the knowledge (late_life, universal)
- `src/data/events_followthrough_7.js` — 11 follow-through events (BUILD 54 continued): sport path closed midlife reflection, stopped playing late echo, World Cup teaching a child, passed football on late life, flood crisis midlife news echo, earthquake survived late echo, survived major storm late dignity, bhola survivor × liberation war connection, Tangshan midlife memory, cricket generation late echo
- `src/data/events_activity_choice.js` — 16 events wiring hobby practice counters (`mem.actCount_*`) to story moments: writing arc (accumulation → show/drawer fork → response → late echo), music arc (commitment → performing/private fork → first gig → late echo), running arc (habit → race/private fork → race day → grief/late echos), art arc, reading formation, cooking for others, meditation shift, creative identity synthesis (midlife, any creative flag)
- `src/data/events_project_arc.js` — 7 project milestone events: middle-phase doubt (push through or step back), someone notices (own it or deflect), the stall (competing obligations, midlife), clarity moment (the thing arrives after years), late-phase reflection, the race (running arc), writing shown (work goes public)
- `src/data/events_followthrough_8.js` — 12 named-callback and desire/growth-tension events: crossed-line midlife surfacing, solidarity late echo, knows_failure reframe, childhood_object midlife find, compromised late reckoning, art-drawer midlife choice (show it or put it back); desire-tension forks for prove_worth/be_seen/belong/connection/safety/freedom — each places the character's wound in a specific present-day situation with a fork between acting from the wound or against it
- `src/data/events_followthrough_9.js` — 17 follow-through events for genocide_survivor, experienced_miscarriage, multiple_miscarriage, sibling_estranged, lost_sibling; torture_survived arc for political prisoners in authoritarian regimes; traumatized_by_violence callbacks
- `src/data/events_followthrough_10.js` — 13 follow-through events closing OFW flag orphans (ofw_gulf passport-held texture, ofw_hongkong, ofw_italy destination-specific; ofw_runaway aftermath; ofw_broker_debt repayment arc) + intellectual_target Algeria follow-through + decennie_noire_memory late reckoning
- `src/data/events_clergy.js` — 11 events (BUILD 17): religious institution from inside: Catholic priest in rural Ireland 1940–80 (ordination, parish power, the laundries knowledge, collapse); Buddhist monk in Cambodia pre/post-Khmer Rouge; imam under Suharto's New Order; Jewish yeshiva student in 1960s Jerusalem
- `src/data/events_soldier_arc.js` — 12 events (BUILD 9): soldier deployment arc (deployment orders, first week, the friend, the thing done, carrying it home, marriage cost, the thing you tell, the thing you don't, return to civilian life); country/era-gated via DEPLOYMENT_CONTEXT helper
- `src/data/events_documents.js` — 8 events (BUILD 25): census, documents, and official identity as fate: Rwanda 1994 ID checkpoint (Hutu/Tutsi branch), Soviet propiska/Moscow residence permit, Nansen passport for stateless, statelessness today (no-document life), colonial census creating ethnic categories
- `src/data/events_central_asia.js` — 10 events (BUILD 13): Kazakhstan nomad collectivization 1928–36 (animals listed, hidden, found); Uzbek cotton monoculture and Aral Sea; Kyrgyz 1991 Soviet collapse (civil-servant wages gone); Kazakhstan oil boom (Astana in the steppe, authoritarian wealth)
- `src/data/events_indonesia.js` — 10 events: Indonesia 1998 ethnic Chinese riots and Reformasi arc; Chinese Indonesian cultural expression banned 1965–2000; Suharto-era New Order navigation; post-2000 cultural return; decade identity follow-through
- `src/data/events_kurdish.js` — 12 events (BUILD 7): Kurdish ethnicity events for Turkey (language ban in schools until 1991, PKK question, village evacuations 1990s), Syria (citizenship stripped 1962, Rojava), Iraq (Anfal campaign 1988 chemical weapons, autonomous region post-1991); late-reckoning follow-throughs; world event: anfal_campaign_1988
- `src/data/events_debt.js` — 14 events (BUILD 55): formal debt arc: consumer credit spiral (wealthy_west), microfinance trap (developing world — second loan to repay the first), IMF structural adjustment as personal experience, medical debt (USA), debt decade-clean follow-through, teaching children about debt
- `src/data/events_adoptee.js` — 5 events (BUILD 36): adoptee arc: transracial identity ("where are you really from"), DNA test 2010+ that changes the question, the search for biological parents (choose to search or not), origin trip as adult, the thing that doesn't resolve
- `src/data/events_senegal.js` — 5 events (BUILD 14 West Africa): Mouride brotherhood — Grand Magal pilgrimage to Touba (3M people, brotherhood law), marabout spiritual authority over business decisions, *dahira* commercial network, Barca Walla Barsakh boat migration to Canaries
- `src/data/events_morocco.js` — 8 events (BUILD 14): Morocco arc: Years of Lead under Hassan II (state disappearances, Equity and Reconciliation Commission), Amazigh language recognition 2011 (grandmother's language on government signage), Strait of Gibraltar crossing (14km, the specific cost), French/Arabic/Amazigh/Darija language hierarchy
- `src/data/events_sri_lanka.js` — 8 events: Sri Lanka arc: Black July 1983 anti-Tamil pogrom (Tamil and Sinhalese perspectives), 26-year civil war texture, LTTE membership choice, Tamil diaspora watching Mullaittivu 2009 from Toronto, 2022 economic collapse (fuel queues, president fled by speedboat)
- `src/data/events_haiti.js` — 10 events (BUILD 11): Haiti arc: Tonton Macoutes terror state under Papa Doc (the hood, the night knock), debt of independence (France extorted $21B equivalent over 122 years), 2010 earthquake from inside Port-au-Prince and from diaspora (the call that may not connect), diaspora obligation to send money home
- `src/data/events_rohingya.js` — 8 events (BUILD 7): Rohingya arc: 1982 citizenship law statelessness (cannot travel/marry/work freely), pre-2017 daily restrictions, August 2017 military "clearance operations" (villages burned, 700,000+ flee), Cox's Bazar camp life (5+ years pending resettlement, block E section twelve)
- `src/data/events_uyghur.js` — 3 events (BUILD 7): Uyghur arc: Ramadan restrictions (government employees prohibited from fasting, saying yes to lunch), re-education camp 2017+ "vocational training" invitation (comply or flee), diaspora silence (stopped calling family because the calls are monitored)
- `src/data/events_tanzania.js` — 7 events (BUILD 26): Tanzania/Ujamaa arc: Nyerere's villagisation (moved 5M people, school and borehole arrived with the collective), Arusha Declaration 1967, Tanzania-Uganda War 1978–79, Swahili education as national unity at cost of international access, Nyerere death 1999 (held both what he was right and wrong about simultaneously)
- `src/data/events_multilingual.js` — 7 events (BUILD 41): multilingualism arc: parent-child language gap (joke that doesn't translate, specific shapes of humour that only exist in the other language), language death (linguist records, 50 speakers left, words for different qualities of rain), code-switch identity, lingua franca advantage made visible, minority language as political act, the interpreter's impossible word
- `src/data/events_ofw.js` — 15 events (BUILD 38 extension): Philippines OFW worker perspective — the decision arc (parents/spouse left behind), POEA documentation process, airport departure, first year abroad, destination-specific texture (Gulf kafala, Hong Kong domestic, Italy elder care), complications, the return, and late-life reckoning on what was exchanged. Complements events_children_abroad.js which covers the child's side.
- `src/data/events_algeria.js` — 13 events (BUILD 43): Algerian Décennie Noire (Black Decade) civil war 1991–2002 — historical ambiguity preserved (GIA and DRS both carried out killings, some massacres never attributed); intellectual targeting; journalist survival choices; the French journalist who arrives with a recorder; memory and impunity 20 years later
- `src/data/events_lebanon.js` — 14 events: Lebanon civil war arc (1975–1990) — the stairwell as community space (transistor radio, almonds, neighbours' nightmares), the specific sectarian geography of Beirut by neighbourhood, crossing militia checkpoints, the green line; Hariri reconstruction 1990s (the brief belief Beirut would become what it was); 2019 economic collapse and bank freeze (savings locked, lira collapsing, the WhatsApp voice note from your mother); Beirut port explosion 2020 aftermath
- `src/data/events_puerto_rico.js` — 2 events: Hurricane Maria 2017 (Category 5, grid gone, death toll gap: official 64 vs. study 2,975, president tweets about debt while citizens can't vote for president), colonial status (American citizen who cannot vote in presidential elections while living on the island)

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

## Current State of the Codebase

### What exists and works

**Core systems:**
- 83 fully-populated countries with all demographic/political fields (including Estonia, Latvia, Lithuania, Lebanon, Kazakhstan, Uzbekistan, Kyrgyzstan, Indonesia, Haiti, Cambodia, Myanmar, Senegal, Morocco, Sri Lanka, Tanzania)
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
- **Geographic place system**: `places.js` with 250+ named places across all 75 countries. Characters assigned a place at birth weighted by urbanRate. `relocateTo(placeId, tier)` action lets characters move. Places have `scale`, `region`, `type` fields. Used by infrastructure, city texture, and rural texture events.
- **Desires/personality system**: Formative wound events fire once in early childhood (ages 6–11). Each wound reveals a persistent `desire` shown near the Age Up button. Desires: `approval`, `safety`, `control`, `connection`, `freedom`, `meaning`, `justice`, `pleasure`, `recognition`. Decade reflections at 30/40/50/60 gate on `desire` to show how the wound shaped the life.
- **Living identity card** (`generateIdentityCard` in gameEngine.js): 3–4 sentences of present-tense identity prose, regenerated each year. Displayed in the Stats tab as "Who You Are". Surfaces flags/state without spoiling the epitaph.
- **Year texture system** (`buildYearTexture` in gameEngine.js): Replaces generic "A quiet year passes." with flag-aware prose. Full priority cascade: bereavement first year → health crisis → partnership quality (with trait-aware prose for strong relationships, stored partner moments surfaced at ~30%) → family (estranged child, reconciliation) → post-crisis (prison release, divorce, business failure) → residency/emigrant → authoritarian/conflict context → flag-aware texture (famine_memory, civil_rights, boarding_school, mentor, etc.) → **memory layer** (~30% probability, uses `mem.[flag]Year` timestamps to surface specific memories 2–15 years after major events) → desire-aware texture (~40%) → **project layer** (~35% when `currentProject` active, phase-aware prose) → expanded phase pools → universal fallback.
- **Named persistent relationships**: Small-life events (events_small_life.js) create named friends and acquaintances stored in `G.mem`, referenced by later events — names persist across the life.
- **Political leaning system**: `political_leaning` state field earned through events only (born null). Displayed in Stats tab. Shaped by adolescence awakening, career-regime events, world events.
- **Historical context UI**: World events can have a `context` field (2–3 sentence factual note). Displayed as an optional expandable "Historical context" panel in the world event display.
- **Newspaper headlines**: A `HEADLINES` array of major historical moments injected as styled log entries when the character lives through the matching year. One-line prose, different visual treatment from events.
- **Chronic illness system**: `conditions[]` state field tracks active conditions with severity (`mild`/`moderate`/`severe`) and `managed` flag. Passive annual drain: unmanaged moderate = −3h/−2m; unmanaged severe = −6h/−4m. 14 illness events in `events_illness.js` cover diabetes, heart disease, cancer (survivable), COPD, back pain, HIV/AIDS (era-branched), vision loss, hearing loss, chronic depression, disability from injury. `p.addCondition(id, severity)` and `p.manageCondition(id, managed)` in effect proxy.
- **Parent care arc**: 8-event arc in `events_parent_care.js` — parental decline from first sign (age 48+) through conversation, housing decision (move in / care facility / home care, with real money costs), daily reality of caregiving, sibling disagreement, a specific bad day, last good conversation, and final decline which calls `killParent()` and connects to the grief module.
- **Relationship status labels**: Relationship cards in the Relationships tab show quality-derived labels (Estranged / Strained / Distant / Warm / Close / Devoted) plus flag-aware overrides (Caring for them / In therapy together / Reconciled) rendered as colored chips — no new data model, display layer only.
- **Curated birth screen** (`CuratedBirthScreen.jsx`): 4-step wizard for intentional play. Step 1: country search + context card. Step 2: birth year slider + gender. Step 3: rural/urban, family stability, religion override chips. Step 4: preview card with approximate starting stats. `startCuratedGame(overrides)` in gameStore; `createCharacter()` in gameEngine accepts `familyStability`, `ruralUrban`, `religion` overrides.
- **Childhood family income system**: Parents are assigned occupation objects (`title`, `field`, `incomeType`, `annualIncome`) at character creation, scaled by GDP tier and archetype. During childhood, annual parental income surplus flows into the character's `money`, with variance by income type (formal ±15%, informal ±40%). Post-Soviet collapse reduces income 1991–94; conflict-zone and parent-death flags disrupt it. Displayed in the Relationships tab beneath parent names. Subsistence/barter economies show no cash figure.
- **Historical country names**: `historicalNames: [{ until: year, name: string }]` array on country objects. `getCountryNameForYear(country, year)` in `countryUtils.js` returns "USSR" for Russia before 1991, etc. Used in epitaph and birth screen (CuratedBirthScreen shows historical name in parentheses where it differs from current).

**Event coverage (~2,540+ total events across 120 modules):**
- Base events covering all life phases with hundreds of inline events
- 68 culture events (regime, ethnicity, caste, LGBTQ, child marriage, rural, wealth)
- 23 technology timeline events (radio 1930s → COVID 2020s + mobile money for East/West Africa, 2007+)
- Late-life events: retirement arc, partner decline/dementia/death arc, grandchildren, health decline, legacy reflection, loneliness; elective surgery, serious diagnosis, pension contribution, retired_comfortable milestone
- Children arc events: school milestones, teen years, adult child relationships, child estrangement/reconciliation
- Fame/karma events: fame consequences at different tiers, karma payoffs, hobby payoffs (painting, music, writing, fitness, language, cooking), friendship depth arcs
- Texture events: rural developing world (country-specific city names), pre-1960 era, career peak/decline
- Society events: women's rights milestones by country/year, healthcare by archetype, language suppression/identity
- 181 world events: Cold War specifics, famines, economic cycles, national traumas; Partition of India, Rwandan genocide, post-Apartheid election, Yugoslav wars, Iranian Revolution, Korean War division, Cultural Revolution China, Chechen war, 1998 Russian crash, Baltic Singing Revolution, Baltic economic recovery, post-Soviet hyperinflation, Chile 1973 coup, Argentina 1976, Operation Condor, Brazil abertura, Falklands, Haiti earthquake, 1973 oil shock (all archetype variants), Nigeria oil boom world events, South Korea developmental state, Egypt Nasser/Suez/1967/2011, Ghana independence/1966 coup, Kenya Mau Mau/independence, Turkey military coups, Romania 1989, Ethiopia Red Terror/famine/fall of Derg, South Africa 1948/1994, **Spanish flu 1918** (all archetypes), **Great Depression 1929** (archetype-branched prose), **Triangle Shirtwaist fire 1911** (USA), **UK miners' strike 1984–85** (UK), **Spanish anarchist factories 1936** (Spain), **Anfal campaign 1988** (Iraq + Kurdish ethnicity), **Algerian Black Decade begins** (Algeria 1991), and more — 20+ events have factual `context` fields
- 55+ career × regime events: journalist/teacher/soldier/police/civil servant/farmer/artist under authoritarian regimes; lawyer ethics, accountant fraud discovery, engineer safety tradeoffs, doctor burnout
- 11 friend lifecycle events: drifting apart, values clash, reconnecting, friend's divorce/success/illness/death, asking for money
- 10 business arc events: key hire, first big client, acquisition offer, losing a client, market downturn, cashflow crisis, failure and restart
- 12 sibling events: childhood rivalry/alliance, sibling emigrates, wedding, borrowing money, estrangement, late illness, death
- 10 university depth events: first week, formative professor, academic failure, dropout decision, scholarship pressure, debt, first-gen, job gap
- 17 post-marriage arc events: infidelity, couples therapy, partner illness, long-haul happiness, separate interests
- 26 consequence events: illiteracy, post-9/11 Muslim discrimination, years abroad, COVID downstream, addiction recovery arc (5 events), STI arc, driving licence, late-life smoking
- 13 second-generation immigrant + refugee resettlement events: child language loss, homeland question, values clash, trip home; resettlement arrival, housing, first job, language class, contact home
- 7 adolescence identity events: racial/gender discrimination, religious doubt vs. family, talent discovery, defining friendship, betrayal, political awakening, body image
- 8 fertility depth events: miscarriage, late miscarriage, IVF consideration/outcome, traditional remedy, choosing childlessness, late pregnancy complications
- 12 career late-arc + wealth gap + rural-to-urban events: senior room moment, defining case, protégé payoff, 20-year reflection; philanthropy, wealth isolation, estate planning; city arrival, village network loss
- 10 wealthy_gulf and wealthy_east events: Gulf oil boom childhood, Saudi female navigation, foreign worker observation, Hajj proximity; Japan company culture; Korean exam pressure and military service; Singapore/Taiwan meritocracy
- 5 grief follow-up events: parent house-clearing, first holiday without parent, inheritance conflict, friend/sibling death follow-up
- 25 follow-through events (events_followthrough.js): flag follow-throughs for racism, lgbtq rejection, abusive relationship, communal childhood, cancer survivor, food insecurity, and more
- 18 additional follow-through events (events_followthrough_2.js): extended flag arcs
- 13 relationship quality events: threshold-gated events for partner contempt/warmth/repair, child drift/estrangement/closeness, sibling formality/warmth, fading friendship
- 12 formative wound + decade reflection events: once-firing wound events (ages 6–11) + decade reflections at 30/40/50/60
- 21 small-life moments: named friendships, first crushes, formative teachers, stranger kindness, first apartment
- 15 activity payoff events: downstream consequences for extracurricular clubs, therapy veteran, generous, tattooed, pierced
- 24 place-based events: family moves, internal migration, arrival texture, neighbourhood-specific conditions
- 10 infrastructure events: power cuts, floods, traffic, air quality, water shortage
- 11 Rust Belt + post-Soviet urban decline arc events (dying city)
- 30+ city-specific texture events: Lagos, Mumbai, Cairo, Mexico City, Moscow (era-split), and more
- 29 rural/suburban texture events: water walk, market day, electrification, brain drain, kolkhoz dissolution, panchayat, ejido, Midwest church, post-Soviet village
- **15 post-Soviet arc events** (events_post_soviet.js): communist childhood (Pioneer induction, space age optimism, job assignment), 1990s collapse (factory closure, savings wiped, sudden poverty shame), oligarch split (take it or decline), emigration wave (Jewish/Law of Return, German Spätaussiedler, professional brain drain), nostalgia and returning emigrant follow-throughs
- **10 Vietnam arc events** (events_vietnam.js): Fall of Saigon southern experience, re-education camp families, boat people decision, Doi Moi reform, post-reunification north/south divide, Viet Kieu diaspora texture
- **17 wealth mechanics events** (events_wealth_system.js): banking access, gold/jewelry hoarding, ROSCA/tontine, hyperinflation survival, joint family dissolution, marriage wealth transfers, gender financial restrictions, farming debt cycle, mobile money, patron-client dynamics, poverty trap
- **7 money arc events** (events_money.js): first paycheck choice, hyperinflation survival, first debt, inheritance, the gift, elder scam, counting days to payment
- **5 body-in-later-life events** (appended to events_late_life.js): first reading glasses, the knee, sleep at 60, hearing aid, driving conversation
- **8 small-life events** (appended to events_small_life.js): garden/allotment, garden years callback, letter arrives (pre-1998), letter midlife echo, good neighbour, neighbour fence conflict, neighbour informer (regime-gated), school reunion
- **2 civic character events** (in events.js BASE_EVENTS): first vote (democracy-gated), election night (political_leaning-gated)
- **5 election/referendum world events** (in worldEvents.js): South Africa 1994 free election, Germany 1933 Reichstag, South Africa 1948 apartheid victory, Brexit 2016, Quebec 1995
- **20 early_childhood + young_adult events** (events_early_life.js): ages 0–5 texture (first school, absent parent, new sibling, object of your own, night fear, first friend, early illness, hunger, television arrival, witnessing adults) + messy 18–25 arc (first apartment, just-a-job, first real failure, friend group scatters, adult breakup, money zero, flatmate, city arrival for rural characters, mistake owned, political formation moment)
- **10 decolonisation era events** (events_decolonisation.js): independence morning (subsaharan 1956–1970), post-independence schools, first coup disillusionment, Pan-Africanism, structural adjustment lived experience, SAP clinic closure, brain drain wave, Nehruvian moment (India 1950–1964), post-adjustment generation, mobile phone leapfrog (2002–2012)
- **9 labour movement events** (events_labor.js): union card joining, strike called (choice: join/cross), picket line endurance, three-month strike strain, strike defeat (auto), strike victory (auto, karma-gated), Luddite moment (era-branched across handloom → typesetters → truckers), solidarity test, first boss
- **9 elder status + reconciliation events** (appended to events_late_life.js): elder consulted (authority archetypes, age 65–74), you are the memory now (age 73+), polite dismissal (wealthy_west 2000+), phone lesson (age 68+), obsolescence (age 78+, universal); reconciliation initiation (estranged child/sibling, age 62–74), warm response (sets `reconciled_damaged`), cold response (sets `permanently_estranged`), living with it (age 70+)
- **28 country arc events** (events_country_arcs_2.js): China/Mao era (land reform wealth-branched, Great Leap famine, cadre quota, Red Guard joining, denunciation pause, send-down generation, Deng reforms, Tiananmen witness, one-child parent, little emperor); USA specificity (civil rights lunch counter ethnicity-gated, Birmingham bombing, Vietnam draft 3-branch, AIDS watch LGBTQ-gated, Rust Belt closure, McCarthyism, Great Migration, opioid crisis); Japan (hibakusha stigma, Anpo protests, Minamata, salaryman transfer, karoshi, bubble collapse, earthquake preparedness)
- **25 Asia arc events** (events_asia_arcs.js): Cambodia (Khmer Rouge evacuation, Year Zero, denunciation choice, Vietnamese liberation, survivor silence, UNTAC 1993, ECCC trial, missing generation); Bangladesh (Liberation War, Victory Day, annual flood cooldown-4, garment worker female-gated, Rana Plaza flag-gated, cyclone era-branched, microfinance, remittance family); Pakistan (Muhajir arrival, East Wing war, Zia Islamisation female-gated, blasphemy law, nuclear tests, ISI shadow, Karachi violence, 2010 flood, arranged meeting)
- **22 cross-cutting arc events** (events_crosscutting.js): domestic worker arc (uniform/entry, kind employer, unkind employer, children grow, wage negotiation, OFW Gulf kafala-adjacent, apartheid Joburg); city bombardment arc (first night, safe route cooldown-2, market Wednesday, run bag, neighbour gone, child explanation, ceasefire, war end clears flag); refugee camp arc (arrival child, UNRWA school, ration day cooldown-3, informal economy, resettlement interview, resettlement arrival, multigenerational)
- **9 DRC arc events** (events_drc.js): independence speech 1960, Lumumba death news, Mobutu authenticité renaming (choice), Mobutu institution decay (career-gated corruption choice), Second Congo War auto-resolve, eastern displacement (flee/stay), coltan mining young adult rural, Kinshasa soukous texture, church community cooldown-10
- **15 internet era events** (events_internet_era.js): AOL dial-up wealthy_west, AOL rural USA, PC bang Seoul (choice: competitive/social), cybercafé Lagos (choice: education/connection), cybercafé Cairo + digital dissent, VKontakte Russia, lan house Brazil + Orkut, M-Pesa Kenya/East Africa, Facebook arrival, smartphone arrival, dotcom optimism (choice), dotcom crash flag-gated, end-of-history 1990s, Asian crisis personal 1997
- **6 Zimbabwe arc events** (events_zimbabwe.js): early independence era (1980s optimism), Gukurahundi (Ndebele ethnicity-gated, rural, 1983–87), land seizure white farming family (both perspectives choice), land reform Black Zimbabwean witness, hyperinflation (trillion-dollar note, currency choice), exodus to South Africa (leave/stay)
- **3 Cuba world events**: Bay of Pigs 1961, Mariel boatlift 1980, Special Period 1991 (all with `context` fields; Cuban Missile Crisis and ration book already existed)
- **Generational trauma seeding**: `deriveGenerationalFlags(char)` in gameEngine.js seeds 17 flags at character creation based on country + birthYear (`holocaust_family_memory`, `great_leap_family_memory`, `khmer_rouge_family_memory`, `disappeared_family_memory`, etc.)
- **Climate arc**: `events_climate.js` (18 events) covering hottest summer (archetype-branched), climate anxiety (young_adult wealthy), severe drought + displacement, coastal flooding (16-country guard), Pacific island extinction (sets `existential_homeland`), Gulf wet-bulb events (2050+), late-life witness (2070+), plus follow-throughs. `climate_displaced` residency status with passive −2h/−4m/−$150 annual drain. Extreme heat passive drain for Gulf/MENA post-2055. `RESIDENCY_LADDER` entry: `climate_displaced → refugee_status` (2 years). 10 new climate world events (Paris Agreement 2015, reef bleaching 2030s, mass displacement 2040s, Arctic ice-free 2040s, Gulf extreme heat 2055, Maldives evacuation 2065, tipping points). 14 climate/indigenous headlines added.
- **Indigenous peoples arc**: `events_indigenous.js` (21 events) — Aboriginal Australian track (Stolen Generation 1910–1970, return, Country connection, Mabo personal, Apology personal, cultural reclaim); Native American/USA track (boarding school 1870–1975, aftermath, reservation life, AIM 1970s); First Nations/Canada track (residential school 1920–1996, Sixties Scoop 1960–1985, return, TRC 2015); Māori/NZ track (language suppression, kōhanga reo, Treaty settlement, renaissance); 3 cross-cultural follow-throughs. 2 world events (Mabo 1992, Australian Apology 2008) skip Aboriginal characters (who get deeper character events instead).
- **Automation/AI arc**: `events_automation.js` (12 events) — driver/trucker arc (news 2025, reality 2030, depot closure); radiologist AI 2028; legal document review 2027; factory robot 2025; customer service chatbot 2025 (general); programmer guilt arc (2026 + follow-through at 40+); data scientist irony 2030 (auto-resolve); UBI debate 2035 (wealthy archetypes, 3-branch); retraining outcome follow-through (age 38+).
- **One-child policy expanded**: 4 events added to `events_country_arcs_2.js` — `ocp_missing_sisters` (adolescence, finds photo of baby girl), `ocp_missing_sisters_adult` (follow-through, asks mother), `ocp_sole_support` (midlife, 4-way caregiver burden, 2 choices), `ocp_policy_lifted` (midlife 2015, ambivalent 2-choice).
- **Iran/South Africa/France/Biafra arcs**: `events_country_arcs_3.js` (13 events) — Iran (White Revolution literacy corps, SAVAK dinner party texture, 1979 revolution week, post-revolution leftist purge, Iran-Iraq War son); South Africa (township uprising 1985, white beneficiary moral architecture, Indian/Coloured Tricameral Parliament, TRC testimony choice); France WWII (occupation grey zone choices, Vel d'Hiv Jewish character event, liberation/épuration, colonial soldiers contradiction); Nigeria (Biafra Igbo perspective, federal perspective, post-war silence follow-through). World events: Vel d'Hiv 1942 for non-Jewish French, Biafra war, Bhopal 1984, Angola civil war, Mozambique civil war. 8 new headlines. 7 new ribbons.
- **Informal economy arc**: `events_informal.js` (18 events, BUILD 35) — entry event sets `workStatus='informal'`; hawker track (pitch/inspector bribe-or-argue/rain day); moto taxi track (start/breakdown/police shakedown); market stall track (neighbour friendship/demolition notice/supplier debt); day labor track (6am gathering/unpaid wages); subsistence farm (good harvest/crop failure); mobile money adoption (East/West Africa 2007+); savings circle (ROSCA-like, sets `informal_saver`); formalization flip (midlife, sets `formalized_worker`); midlife reckoning. Engine: `p.setWorkStatus(val)` proxy shorthand added; `served_prison_time` flag set on prison release; `criminalRecord` entries now store `{ crime, age, category }` objects.
- **Neighborhood texture arc**: `events_neighborhoods.js` (16 events, BUILD 32) — informal settlement: standpipe water schedule, settlement fire, slumlord two streets away, thin walls, generator envy, 4km school walk, gang territory in adolescence, government upgrade, home business; working class: solidarity and noise; cross-tier: moving-up guilt (sets `grew_up_informal` reflex), elite isolation, elite teen guilt, gentrification return, good-years memory. 9 new ribbons added (informal_worker, formalised, decade_after, political_witness, reentry, mentor, chain, famine_memory).
- **Post-release arc**: `events_postrelease.js` (12 events, BUILD 48) — release morning (political prisoner branch via `political_prisoner` flag); job application checkbox (USA felony-box prose, 3 choices: disclose/lie/sidestep); lie discovered (employer background check); housing difficulty (USA public housing bar text); parole weekly reporting; parole near-breach (sick parent two counties away); family reunion; recidivism trap (structural loop, sets `recidivism_risk` or `seeking_reentry_support`); USA rights lost (voting/housing/loans); spent conviction (UK/EU clean-record path); decade clean (sets `decade_after_prison`); political prisoner dignity event.
- **Mentor arc**: `events_mentor.js` (10 events, BUILD 47) — mentor deepens (coffee, "Is this what you meant to be doing?"); favor asked (uncomfortable request); estrangement (distance without a moment); mentor dies (sets `lost_mentor`, funeral, sits near the back); late echo at 58+ (hearing their phrasing in your own words); becoming a mentor (generates named `protegeName`); protégé surpasses (applauding in the audience); protégé betrayal (3 choices: confront/let go/document); both arcs reflection at 62+; adolescent teacher echo.
- **Famine personal arc**: 4 events appended to `events_followthrough_5.js` (BUILD 49) — market price first sign (choice: buy now/wait), body changing (hunger becomes background, auto-resolve), selling assets (livestock or debt), midlife pantry reflex at 25+ years after (sets `famine_memory`).
- **Save/load system**: `serializeState`/`deserializeState` in gameStore.js handles Map/Set/functions. "Continue" button on TitleScreen. localStorage persistence across sessions.
- **Desire-weighted event selection**: `DESIRE_PATTERNS` in `getNextEvent()`, 1.6× multiplier for events matching `G.desire`. Keys: `prove_worth/belong/be_seen/safety/connection/leave_mark/freedom/redemption`.
- **`buildYearTexture()` expanded**: phase-specific prose pools (late_life 6 strings, midlife 6, young_adult 5, adolescence 3, childhood 3); flag-aware paths for famine_memory/civil_rights/emigration/first_gen.
- **Dynamic wealthTier**: computed in `buildG()` from actual net worth (money + property equity − debt) for age ≥ 18. All event guards using `G.wealthTier` now reflect real wealth.
- **Hobby milestone flags**: auto-generated in `tick()` at skill thresholds: `serious_musician`, `artist`, `reflective_writer`, `fitness_devotee`, `accomplished_cook`, `polyglot`, `avid_reader`, `dedicated_gardener`.
- **Activity-to-flag pipeline**: cumulative count tracking in `mem` → flags: `contemplative`, `generous`, `avid_reader`, `reflective_writer`, `fitness_devotee`, `philosophical_mind`, `networker`, `disciplined_saver`.
- **Activity-to-story pipeline** (`events_activity_choice.js`, PR #63): `mem.actCount_[hobbyId]` counters (incremented by `applyActivity()`) gate 16 story events at practice thresholds. Writing at 3× → show/drawer choice; music at 4× → performing/private fork; running at 3× → race/private fork; art at 3×; reading at 5×; cooking at 4×; meditation at 4×. Each arc has 2–4 events including midlife synthesis. This closes the loop between the Activities panel and the story.
- **Partner trait system** (PR #64): `TRAIT_PROSE` map in `gameEngine.js` (21 traits × 2 specific prose lines). On year 3+ of a relationship, 3 trait-derived moments are generated and stored in `mem.partnerMoments`; refreshed every 7 years. `buildYearTexture()` surfaces these at ~30% probability during good years and branches on traits for strong/married relationships. Traits remain invisible in the UI — felt only through the sentences that land differently for a *funny* partner vs. a *melancholy* one.
- **Memory timestamp system** (PR #64): `TIMESTAMPED_FLAGS` set in `buildEffectProxy()` — when `addFlag()` sets any of 22 emotionally significant flags, `mem.[flag]Year` is auto-stored. A memory layer in `buildYearTexture()` (~30% of quiet years) checks elapsed time and returns memory-presence prose: "The grief has changed shape. It is not smaller. It is more familiar." Flags currently timestamped: `knows_failure`, `first_love_over`, `emigrated`, `cancer_survivor`, `business_failed`, `widowed`, `partnerDeathYear`, `parentDeathYear`, `lgbtq_family_rejection`, `experienced_racism`, `affair_not_taken`, `affair_brief_secret`, `graduated`, `divorced`.
- **Project arc system** (PR #64): `currentProject: { type, startYear, phase, name }` in state. Auto-detected from existing hobby flags in `tick()` — a character with `writing_in_drawer` gets a writing project; `runner_habit` gets a running project, etc. Phase advances `early → middle → late → established` based on years active. Year texture has a project layer (~35% when active) with phase-specific prose that reflects where the character is in their sustained effort. `events_project_arc.js` adds 7 milestone events (middle doubt, someone notices, the stall, clarity moment, late reflection, the race, writing shown).
- **Original-language word insertions** (Burst P): selective use of *blat*, *karoshi*, *ubuntu*, *inshallah*, *harambee*, *jugaad*, *sisu*, *trygghed* etc. in event prose — italicised, meaning clear from context, only where no English equivalent exists.
- **UI improvements** (Sprints 1–5): career/education gap display, activities grouping by category, timeline pull-quotes, desire texture in obituary, arc-feeling prose layer.
- **Childhood texture** (Sprint 4): `events_childhood_texture.js` (19 events) — universal small-life events for ages 6–17, ensuring ≥1 event per year across the childhood span.
- **Generational silence** (Burst D): `events_family_silence.js` (20 events) — "what your parents didn't say" mechanic. Early-childhood events gated on generational trauma flags (`holocaust_family_memory`, `gulag_family_memory`, `partition_family_memory`, etc.), framed as absence rather than the atrocity itself.
- **Dying arc** (Burst F): `events_dying_arc.js` (6 events) — age 75+. The specific consciousness of a person who knows they are near the end; not about death as a stat but about how it reshapes the present.
- **Solo life** (Burst E): `events_solo_life.js` (8 events) — unpartnered characters. Not loneliness as failure but the texture of a life that doesn't centre around couplehood.
- **Coherence pass** (Burst G): `events_coherence.js` (11 events) — orphaned flag follow-throughs for flags without downstream consequences.
- **Financial hardship** (Burst I): `events_poverty.js` (43 events) — eviction, repossession, foreclosure, debt collectors, wage garnishment, homelessness, welfare, moving in with relatives. Both childhood and adult phases.
- **Pregnancy arc** (Burst J / BUILD 51): `events_pregnancy.js` (13 events) — first-trimester texture, pregnancy arc, birth (archetype/GDP/year-branched), maternal complication, postpartum period. Engine changes: `pregnant` flag + `pregnancyYear` mem for multi-year arc.
- **Menopause arc** (Burst K–M / BUILD 22 partial): `events_menopause.js` (5 events) — female, ages 45–58. Culturally-branched: Japan low-symptom, USA medicalised, subsaharan status change, post-Soviet stoicism.
- **Deep career arcs** (Burst K–M / BUILD 6 careers extension): `events_career_arcs.js` (19 events) — athlete (injury/identity/transition out), academic (tenure clock/publish-or-perish/defining student/burnout), chef/hospitality (kitchen grind/ownership arc/creative arc/staff cost).
- **Social media arc** (Burst K–M / BUILD 4 social media): `events_social_media.js` (9 events) — country-specific platforms (Facebook/MySpace West, VKontakte Russia, WeChat/Weibo China, KakaoTalk Korea, MXit South Africa); arc from excitement → addictive phase → damage → choosing to leave or not.
- **Nordic arc** (Burst N+O / BUILD 14 Scandinavia): `events_scandinavia.js` (8 events) — welfare state from inside, Norway oil discovery, Finland Winter War, Sweden WWII neutrality/grey zone, Janteloven social pressure.
- **Palestine arc** (Burst N+O / BUILD 7 partial): `events_palestine.js` (8 events) — Nakba displacement family memory, checkpoint as daily fixture, house demolition, permit system, Oslo brief hope, intifadas, post-2006 Gaza/West Bank divergence.
- **Gang/organised crime arc** (Burst Q / BUILD 4 gang): `events_gang.js` (10 events) — archetype-specific entry points (post-Soviet bratva/krysha, Lagos Area Boys, cartel-adjacent Colombia); progression from petty crime through membership and consequences.
- **Social capital arc** (Sprint 3): `events_social_capital.js` (8 events) — charisma and looks as era- and culture-dependent resources; gated on stat thresholds.
- **World event response choices** (Sprint 2): `events_world_response.js` (6 events) — character events that fire in the year of a major world event, giving one meaningful choice response; gates on the world event's flag already being set.
- **Emigrant integration arc** (Sprint 5): `events_emigrant_integration.js` (7 events) — staged by `G.yearsAbroad`: disorientation (yr 1), acclimation (yr 2–3), permanence question (yr 3–6), belonging with asterisk (yr 6–12), old country as destination (yr 12+).
- **Adolescence depth** (BURST 1–11 / BUILD 55): `events_adolescence_2.js` (22 events) — first job, curfew break, authority clash, exam results, scholarship test, dropout temptation, peer betrayal, rumour, peer death, diaspora identity, family honour, faith doubt at home, peer pressure, first smoke, shoplifting, social media pressure, body image, leaving question, privilege mirror, school fight, community service.
- **Child trajectory events**: 8 events appended to `events_children_arc.js` — infant night/first word/toddler personality/school-age independence/interest emerges/disappoints you/adult path revealed.
- **Recurring late-life events**: 7 cooldown-based events appended to `events_late_life.js` — body/time/memory/social world/gratitude/hardship/legacy thought. Solve pool exhaustion for characters aged 70+.
- **FLAG_REGISTRY and flag audit tooling**: `src/data/flags.js` registers 222 flags with `weight`, `category`, `description`, `intent`, and optional `timestamped` fields. `scripts/check-flags.js` (`npm run check-flags`) dynamically derives coverage status (covered/partial/orphaned) from source scanning — never stored. `--orphans`, `--weight=major`, `--unregistered`, `--world` flags available.
- **Religious institution from inside** (BUILD 17): `events_clergy.js` (11 events) — Catholic priest in rural Ireland 1940–80 (ordination, parish power, the laundries knowledge, the collapse), Buddhist monk in Cambodia before and after the Khmer Rouge, imam navigating Suharto's New Order surveillance, Jewish yeshiva student in 1960s Jerusalem with a deferment his secular neighbour doesn't have.
- **Soldier arc** (BUILD 9): `events_soldier_arc.js` (12 events) — deployment orders, first week (the specific sound of the vehicles that mean something), the friend, the thing done, carrying it back, the marriage cost, the thing you tell and the thing you don't. DEPLOYMENT_CONTEXT helper gates by country + year range.
- **Documents and official identity** (BUILD 25): `events_documents.js` (8 events) — Rwanda 1994 ID card checkpoint (Hutu/Tutsi branch, the person behind you), Soviet propiska residence permit, Nansen passport for the stateless, colonial census creating the category that becomes dangerous.
- **Central Asia arc** (BUILD 13): `events_central_asia.js` (10 events) — Kazakh nomad collectivization 1928–36 (the official's ledger, the hidden animals, the class-enemy label), Uzbek cotton monoculture and the Aral Sea draining, Kyrgyz 1991 post-Soviet collapse (entire administrative class suddenly useless), Kazakhstan oil boom (Astana skyscrapers in the steppe, wealth without democratic institutions).
- **Indonesia 1998 arc**: `events_indonesia.js` (10 events) — ethnic Chinese community (3% of population, ~70% of private sector wealth) during the May 1998 riots; 35 years of forced cultural invisibility 1965–2000; Reformasi; post-2000 Chinese cultural return; decade identity follow-through.
- **Kurdish arc** (BUILD 7 partial): `events_kurdish.js` (12 events) — Kurdish language banned in Turkish schools until 1991, PKK question for southeast Turkey characters in the 1990s, village evacuations and 3,000+ settlements burned, Syrian citizenship stripped 1962, Anfal chemical weapons 1988 (world event gate), Rojava. Late-reckoning follow-throughs.
- **Formal debt arc**: `events_debt.js` (14 events) — consumer credit spiral (wealthy_west), microfinance trap (second loan to repay the first, monthly meeting as social pressure), IMF structural adjustment as a personal experience, medical debt (USA), decade-clean follow-through, teaching children what you learned the expensive way.
- **Adoptee arc** (BUILD 36): `events_adoptee.js` (5 events) — transracial identity question ("where are you really from"), DNA test that changes the question, the search (or choosing not to search), origin trip as adult, the thing that doesn't resolve.
- **Senegal/Mouride arc** (BUILD 14 West Africa): `events_senegal.js` (5 events) — Grand Magal pilgrimage to Touba (3M people, brotherhood's own law), marabout spiritual authority over business decisions, *dahira* commercial networks across New York/Paris/Guangzhou, Barca Walla Barsakh migration route to the Canary Islands.
- **Morocco arc** (BUILD 14/55): `events_morocco.js` (8 events) — Years of Lead under Hassan II (9,779 confirmed cases, Equity and Reconciliation Commission, no names of those who gave orders), Amazigh language recognition 2011 (grandmother's language on government signage, the recognition arrives during the Arab Spring), Strait of Gibraltar crossing.
- **Sri Lanka arc**: `events_sri_lanka.js` (8 events) — Black July 1983 anti-Tamil pogrom (2,000–3,000 dead, both ethnic perspectives), 26-year civil war, Tamil diaspora watching Mullaittivu 2009 from Toronto, 2022 economic collapse (fuel queues, president fled by speedboat).
- **Haiti arc** (BUILD 11 partial): `events_haiti.js` (10 events) — Tonton Macoutes terror state (voodoo-coded, the intellectual class exiled or killed), debt of independence (France extorted equivalent of $21B over 122 years), 2010 earthquake from inside Port-au-Prince and from diaspora (the call that may not connect), diaspora obligation.
- **Rohingya arc** (BUILD 7): `events_rohingya.js` (8 events) — 1982 citizenship law (cannot travel/marry without permission), pre-2017 daily restrictions, August 2017 clearance operations (villages burned, 700,000+ flee to Bangladesh in three months), Cox's Bazar camp life five years in (block E section twelve, the UNHCR officer who comes once a year).
- **Uyghur arc** (BUILD 7): `events_uyghur.js` (3 events) — Ramadan restrictions for government employees (saying yes to lunch), re-education camp 2017+ "vocational training" invitation, diaspora silence (stopped calling because the calls are monitored).
- **Tanzania/Ujamaa arc** (BUILD 26): `events_tanzania.js` (7 events) — Nyerere's villagisation (5M moved, the truck, the new land), Arusha Declaration 1967, Swahili-only education producing national unity at cost of international access, Nyerere death 1999 (holding both what he was right about and what he was wrong about simultaneously).
- **Multilingualism arc** (BUILD 41): `events_multilingual.js` (7 events) — parent-child language gap (the joke that only exists in the other language), language death (linguist records, fewer than fifty speakers, words for different qualities of rain), lingua franca advantage made visible through contrast, minority language as political act, the interpreter's impossible word.
- **Philippines OFW worker arc** (BUILD 38 extension): `events_ofw.js` (15 events) — the decision, POEA documentation, airport departure, first year abroad, destination-specific texture (Gulf kafala/passport-held, Hong Kong domestic worker, Italy elder care), complications, return, late-life reckoning. Complements `events_children_abroad.js` (the child's perspective).
- **Algerian Décennie Noire arc** (BUILD 43): `events_algeria.js` (13 events) — civil war 1991–2002, historical ambiguity preserved (GIA and DRS both carried out massacres, some never attributed), intellectual targeting, journalist survival choices, the French journalist who arrives with a recorder twenty years later.
- **Lebanon civil war and collapse arc**: `events_lebanon.js` (14 events) — the stairwell as community space during shelling (transistor radio, almonds in a dish, neighbours' nightmares), sectarian geography of Beirut by neighbourhood, militia checkpoint crossings, green line; Hariri reconstruction 1990s; 2019 bank freeze and economic collapse (savings locked, lira collapsing, WhatsApp voice note from mother); Beirut port explosion 2020 aftermath.
- **Puerto Rico arc**: `events_puerto_rico.js` (2 events) — Hurricane Maria 2017 (grid gone, FEMA timeline for a territory not a state, death toll gap: official 64 vs. study 2,975), colonial status (American citizen who cannot vote in presidential elections while living on the island).

### What still needs work — Priority Roadmap

*Work rotates between three modes: (A) geographic/content depth, (B) mechanical depth, (C) polish and feel. No single mode dominates — each session should consider which mode provides the most return given recent work.*

*Previous roadmap (items 1–16) complete. See git history. The roadmap below is built from a structured brainstorm session and reflects explicit design decisions.*

*Completed since brainstorm: BUILD 3 (chronic illness system + parent care arc), BUILD 4 (relationship history UI — status labels on relationship cards), BUILD 6 (curated birth screen — 4-step wizard). See PR #42. Vietnam arc (events_vietnam.js, 10 events) and wealth mechanics system (events_wealth_system.js, 17 events) added in PR #43. BUILD 29 (voting/elections), BUILD 30 partial (garden, letters, neighbours, school reunion), BUILD 44 (body in later life), and BUILD 50 (money across a life) added in PR #44. Childhood family income system (parent occupations, GDP-scaled income during childhood phase) added in PR #45. BUILD 2 Latin America arc (events_latin_america.js, 50 events), BUILD 6 (historical country names, expanded ribbons), BUILD 10 partial (events_country_arcs.js, 22 events for Nigeria/India/South Korea/Egypt/Romania/Turkey/Kenya/Ghana/Ethiopia), and events_followthrough_3.js added in PRs #45–47. BUILD 6 early childhood + early 20s (events_early_life.js, 20 events), BUILD 5 partial (events_decolonisation.js + 7 world events: Spanish flu 1918, Great Depression 1929, oil shock periphery, Triangle Shirtwaist 1911, UK miners strike 1984, Spanish anarchist factories 1936), BUILD 20 labour/strikes (events_labor.js, 9 events), BUILD 9 elder status by archetype + BUILD 4 late-life reconciliation arc (9 events appended to events_late_life.js) added in PR #48. BUILD 10 expanded (events_country_arcs_2.js, 28 events: China/Mao era, USA specificity, Japan), BUILD 11 partial (events_asia_arcs.js 25 events: Cambodia/Bangladesh/Pakistan; events_drc.js 9 events: DRC arc; Cuba world events: Bay of Pigs, Mariel boatlift, Special Period), BUILD 12 (events_crosscutting.js, 22 events: domestic worker/city bombardment/refugee camp arcs), BUILD 15 partial (events_internet_era.js 15 events: PC bang Seoul, cybercafé Lagos, AOL Iowa, M-Pesa Kenya, dotcom arc, 1990s texture; 4 new world events: Asian financial crisis 1997, Indonesia May 1998), BUILD 27 (deriveGenerationalFlags() seeds 17 generational trauma flags at character creation), BUILD 2 partial (events_zimbabwe.js 6 events: land seizure both perspectives, hyperinflation, exodus, Gukurahundi). Ribbons: 25 new ribbons added. Headlines: 14 new entries added (Lumumba, Bangladesh, Cambodia, Mariel, DRC, Rana Plaza, M-Pesa, etc.). BUILD 8 (events_climate.js, 18 events: heat/drought/coastal-flood arcs, climate anxiety, Pacific island extinction, Gulf wet-bulb events, climate displacement residency status + passive drain, 10 climate world events in worldEvents.js, 14 climate headlines), BUILD 19 partial (events_indigenous.js, 21 events: Aboriginal Australian stolen generation/Mabo/apology/cultural reclaim arc, Native American boarding schools/reservation/AIM arc, First Nations Canada residential schools/Sixties Scoop arc, Māori language suppression/kōhanga reo/Treaty arc, cross-cultural follow-throughs; 2 world events: Mabo 1992, Australian Apology 2008), BUILD 28 (events_automation.js, 12 events: trucker/radiologist/lawyer/factory/software dev/data scientist/customer service career arcs, UBI debate, retraining outcome follow-through), BUILD 31 partial (4 events in events_country_arcs_2.js: missing sisters, missing sisters adult follow-through, sole support midlife, policy lifted 2015), BUILD 43 partial (bangladesh_liberation_1971 world event with era-branched adult/child narrative, context field). BUILD 10 expanded again (events_country_arcs_3.js 13 events: Iran/South Africa/France WWII/Biafra; world events: Vel d'Hiv, Biafra war, Bhopal 1984, Angola civil war, Mozambique civil war; 8 headlines, 7 ribbons). BUILD 40 (events_arts.js, 9 events: samizdat receiving/writing arcs, jazz bebop as refusal, Jim Crow touring, Nollywood entry + decade callback, censored artist stay-or-leave choice with dynamic text by country, work in the drawer, artistic integrity late echo). BUILD 54 partial (events_followthrough_4.js, 10 events: caste career ceiling, corporate scandal resurfaces, betrayal trust patterns, harvest failure pantry reflex, civil war news echo, ethnic minority identity navigation, dissident reader regime cost, refugee 5-year anniversary, political active regime cost, dissident writer arrest risk). Bug fix: applyWorldEvents null archetypes crash fixed in gameEngine.js (11 world events had archetypes: null, causing crash on every age-up). BUILD 54 partial continued (events_followthrough_5.js, 8 events: civil rights generation legacy, resistance through art recognized, art shown late, compromised ledger, censored journalist story, intimidated body reflex, independence generation reckoning, first coup not last). Lebanon added to countries.js (78th country, parliamentary_republic, archetype developing_urban, 18 sects, civil war regimeHistory 1976→1990). Beirut port explosion 2020 world event added to worldEvents.js (Lebanon-gated, context field, sets beirut_blast_survived). BUILD 35 (events_informal.js, 18 events: hawker/moto-taxi/market-stall/day-labor/subsistence-farm tracks, mobile money, savings circle, formalization flip; workStatus='informal' + p.setWorkStatus() proxy shorthand), BUILD 32 (events_neighborhoods.js, 16 events: standpipe, settlement fire, slumlord, gang block, government upgrade, moving-up guilt, elite isolation, gentrification return), BUILD 48 (events_postrelease.js, 12 events: release morning, job checkbox, housing bar, parole conditions/breach, recidivism trap, USA rights lost, spent conviction UK/EU, decade clean, political prisoner dignity; served_prison_time flag set on prison release; criminalRecord entries now store { crime, age, category } objects), BUILD 47 (events_mentor.js, 10 events: mentor deepens, favor, estrangement, death/echo, becoming mentor with named protegeName, protégé surpasses/betrayal, both-arcs reflection, teacher echo), BUILD 49 partial (4 famine personal arc events appended to events_followthrough_5.js: market price, body changing, selling assets, midlife pantry reflex). 9 new ribbons added (the_informal_worker, the_formalised, the_decade_after, the_political_witness, the_reentry, the_mentor, the_chain, the_famine_memory + existing the_mentor_ribbon updated). PRs #57–59 (BURST 1–11, Sprints 1–5, Bursts D–Q): save/load system, desire-weighted events, buildYearTexture expansion, dynamic wealthTier, hobby milestone flags, activity-to-flag pipeline, original-language word insertions, career/education gap UI, activities grouping, timeline pull-quotes; events_adolescence_2.js (22 events), child trajectory events (8 events, events_children_arc.js), recurring late-life events (7 events, events_late_life.js); events_childhood_texture.js (19), events_family_silence.js (20), events_dying_arc.js (6), events_solo_life.js (8), events_coherence.js (11), events_poverty.js (43), events_pregnancy.js (13), events_menopause.js (5), events_career_arcs.js (19), events_social_media.js (9), events_scandinavia.js (8), events_palestine.js (8), events_gang.js (10), events_social_capital.js (8), events_world_response.js (6), events_emigrant_integration.js (7). BUILD 4 social media arc and gang arc ✅. BUILD 7 Palestine partial ✅. BUILD 14 Scandinavia ✅. BUILD 22 menopause/pregnancy ✅. BUILD 27 generational silence ✅. BUILD 51 pregnancy arc ✅. **PRs #60–62**: BUILD 45 (events_intimacy.js, 12 events: sexual revolution arc, long marriage desire shift, affair temptation/taken/not-taken/weight/echo, late beginning, late love arriving, sexuality without vocabulary, body in late life, solo life texture, first love ending), BUILD 46 (events_school.js, 11 events: resource-poor classroom, teacher unpaid + echo, shared textbook, scholarship arrival/lunch/payoff, war-zone school choice, year gap, national exam + echo), 2 world events (womens_liberation_march_1970 wealthy_west gender-branched context; afghanistan_girls_school_ban_2022 Afghanistan gender-branched context), 6 ribbons (the_late_love, the_affair_not_taken, the_solo_architecture, the_scholarship_student, the_war_school, the_teacher_remembered). **BUILD 54 continued** (events_followthrough_6.js, 11 events): follow-throughs for orphaned flags from BUILD 45/46/38/23. **BUILD 38** (events_children_abroad.js, 7 events: parent departs → grandmother texture → birthday call → package → reunion → cost accounting → cycle repeating; 2 ribbons: the_left_behind, the_cycle_repeated). **BUILD 23** (events_stayed.js, 5 events: watching departures → country empties → sibling visits → still receiving calls → late reckoning; ribbon: the_one_who_stayed). **BUILD 39** (events_sport.js, 11 events: local match / cricket school / watching with parent / scout arrives / window closes / cricket empire / World Cup year / adult league / last game / teaching the game / cricket legacy; world events: jesse_owens_berlin_1936 ethnicity-branched, west_indies_cricket_1975 cricket countries, olympics_boycott_1980; 4 ribbons). **BUILD 53 partial** (events_disasters.js, 8 events: Bangladesh flood cooldown / bad flood / flood from distance / earthquake preparedness / earthquake experience / typhoon season cooldown / typhoon bad year / living with knowledge; world events: bhola_cyclone_1970, tangshan_earthquake_1976; 3 ribbons). **BUILD 54 continued** (events_followthrough_7.js, 11 follow-throughs for sport + disaster + world event flags). **PR #63** (events_activity_choice.js, 16 events: activity practice counters → story events; hobby log lines replaced with prose; writing/music/running/art/reading/cooking/meditation arcs). **PR #64** (partner trait system: TRAIT_PROSE map, lazy moment generation in tick(), trait-aware prose in buildYearTexture(); memory timestamp system: TIMESTAMPED_FLAGS auto-storing flag years, memory layer in buildYearTexture(); project arc system: currentProject state, auto-detection, phase advancement, project layer in buildYearTexture(), events_project_arc.js 7 milestone events). **BUILD 54 continued** (events_followthrough_8.js, 12 events: named callbacks surfacing past choices by name — crossed picket line midlife, solidarity late echo, knows_failure reframe, childhood object midlife, compromised late reckoning, art-drawer midlife choice; desire/growth-tension forks for prove_worth, be_seen, belong, connection, safety, freedom — each places the character's wound in a concrete present-day situation with a fork between acting from the wound or against it). **PR #67**: Bug fix (FlagSet.some() crash fixing age-up freeze for all characters — events_country_arcs_3.js called G.flags.some() which didn't exist on Set; fixed by adding some()/filter()/find() to FlagSet). BUILD 21 (events_industrial.js, 9 events: Chernobyl liquidator arc, Bhopal settlement follow-through, pollution as class via river/factory fumes/Niger Delta oil spill; Chernobyl world event upgraded with age-branched narrative + context field + Belarus added). Student loan debt event (ya_student_loan_reality, wealthy_west 2004+). Year texture paths for industrial/debt flags. TIMESTAMPED_FLAGS expanded with 4 industrial flags. 4 ribbons: the_liquidator, the_river_wrong_colour, the_delta_witness, the_student_debt. **FLAG_REGISTRY + check-flags tooling** (PR #68): flags.js registers 222 flags with weight/category/description/intent. scripts/check-flags.js derives coverage dynamically. **PRs #69–72**: MODE A geographic expansion — 5 new countries added (Kazakhstan, Uzbekistan, Kyrgyzstan + 2 more Central Asian); Lebanon civil war arc (events_lebanon.js, 14 events); Philippines OFW worker arc (events_ofw.js, 15 events); Algerian Décennie Noire (events_algeria.js, 13 events); Indonesia 1998 + Kurdish identity + formal debt arc modules; Haiti + Sri Lanka + Morocco arcs; Rohingya arc (events_rohingya.js, 8 events); Uyghur arc (events_uyghur.js, 3 events); Senegal/Mouride arc (events_senegal.js, 5 events); Tanzania/Ujamaa arc (events_tanzania.js, 7 events); multilingualism arc (events_multilingual.js, 7 events); adoptee arc (events_adoptee.js, 5 events); Puerto Rico arc (events_puerto_rico.js, 2 events); events_followthrough_9.js (17 events: genocide_survivor, miscarriage, sibling_estranged, torture_survived); events_followthrough_10.js (13 events: OFW flag orphans + Algeria intellectual_target + decennie_noire_memory); BUILD 17 religious institution from inside (events_clergy.js, 11 events); soldier deployment arc (events_soldier_arc.js, 12 events); documents/identity arc (events_documents.js, 8 events); Central Asia arc (events_central_asia.js, 10 events); Indonesia arc (events_indonesia.js, 10 events); Kurdish arc (events_kurdish.js, 12 events); debt arc (events_debt.js, 14 events). Total 83 countries, 181 world events, 203 ribbons, 222 registered flags.*

---

---

#### BUILD 2 — Geographic Depth (multiple PRs, can be parallelised)

**Vietnam arc** ✅ DONE (PR #43): `events_vietnam.js` (10 events). Fall of Saigon southern family experience, re-education camp aftermath, boat people decision arc, Doi Moi reform generation, Viet Kieu diaspora texture. World events for Fall of Saigon 1975 and Doi Moi 1986 still to be added to `worldEvents.js`.

**Latin America arc** ✅ DONE (PR #45): `events_latin_america.js` (50 events). Chile, Argentina, Brazil, Colombia, Mexico, Peru, Venezuela, Cuba, Bolivia, Guatemala, Haiti, Operation Condor cross-border mechanic, Football as national religion. See event file for full coverage.

**Lebanon arc** ✅ DONE (PRs #69–72): Lebanon added as 78th country. `events_lebanon.js` (14 events) covers civil war stairwell community, sectarian geography of Beirut, militia checkpoint crossings, green line, Hariri reconstruction 1990s, 2019 economic collapse/bank freeze, Beirut port explosion 2020 aftermath.

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
- Indonesia 1998 ✅ DONE: `events_indonesia.js` (10 events) — ethnic Chinese riots, Reformasi arc, Chinese cultural expression banned 1965–2000.
- Philippines OFW arc ✅ DONE: `events_ofw.js` (15 events) — worker perspective: decision, POEA, departure, first year, destination-specific texture, complications, return, late reckoning. `events_children_abroad.js` covers the child's perspective.
- Bangladesh: garment factory female worker arc already in `events_asia_arcs.js`. 1971 Liberation War world event done. Cyclone vulnerability in `events_disasters.js`.

**Sub-Saharan Africa depth**:
- DRC ✅ DONE: `events_drc.js` (9 events) + full countries.js entry with conflict_zone archetype.
- Zimbabwe ✅ DONE: `events_zimbabwe.js` (6 events).
- Senegal ✅ DONE: `events_senegal.js` (5 events) — Mouride brotherhood, Grand Magal, marabout authority, Barca Walla Barsakh.
- Ethiopia: Derg regime events and 1991 fall in `events_country_arcs.js`. 1984 famine arc in `events_followthrough_5.js` (famine personal arc events).

**Arab world depth**:
- Egypt: Nasser/Suez/1967/Tahrir in `events_country_arcs.js`. Remaining: Mubarak-era middle class texture.
- Morocco ✅ DONE: `events_morocco.js` (8 events) — Years of Lead, Amazigh recognition, Strait crossing.
- Syria: pre-war texture still to do.

---

#### BUILD 3 — Chronic Illness System + Parent Care Arc ✅ DONE (PR #42)

`conditions[]` state field added. `events_illness.js`: 14 events covering diabetes (2 variants + decade follow-through), heart disease, survivable cancer (+ scan callback), COPD, back pain (2 variants), HIV/AIDS (era-branched pre/post-1995), vision loss, hearing loss, chronic depression, disability from injury. `events_parent_care.js`: 8-event arc from first sign through `killParent()`. `p.addCondition()` and `p.manageCondition()` proxy shorthands. Passive drain wired into `tick()`.

Partial from original spec — not yet implemented: congenital conditions at character creation; career hard-gating by condition severity.

---

#### BUILD 4 — Systems Depth

**Relationship history UI** ✅ DONE: Quality-threshold labels (Estranged / Strained / Distant / Warm / Close / Devoted) + flag-aware overrides (Estranged, Reconciled, Caring for them, In therapy together) rendered as colored chips on relationship cards in `LifeScreen.jsx`. No new data model.

**Political leaning system** ✅ DONE: `political_leaning` state field added, displayed in Stats tab. Earned through events only (born null). Wired from adolescence political awakening event, career-regime events, world events. `p.setPolitical(value)` available in effect proxy.

**Late-life reconciliation arc** ✅ DONE (PR #48): Attempt to repair estranged child/sibling relationship in 60s–70s. `recon_initiate` (age 62–74, gated on child or sibling quality < 32) → `recon_response_warm` (sets `reconciled_damaged`, boosts relationship quality) or `recon_response_cold` (weight 3, sets `permanently_estranged`) → `recon_living_with_it` (age 70+, auto-resolve). Both closure paths implemented.

**Death of a child arc**: Full arc — sparse restrained death event, marriage aftermath events (how it changes the partnership), years of carrying it events. Gate carefully. Connects to grief module.

**Underground/gang system** ✅ DONE (PR #58, events_gang.js): 10 events. Post-Soviet bratva/krysha entry, Lagos Area Boys entry, cartel-adjacent Colombia entry. Progression from petty crime through membership and consequences. Archetype-gated.

**Social media arc** ✅ DONE (PR #57–59, events_social_media.js): 9 events. Country-specific platforms (Facebook/MySpace West, VKontakte Russia, WeChat/Weibo China, KakaoTalk Korea, MXit South Africa). Arc: genuine excitement → addictive phase → damage → choosing to leave or not. Gated by `currentYear` and archetype.

**Mid-life reflection events** ✅ PARTIALLY DONE: Decade reflection events at 30/40/50/60 fire via `events_desires.js`, gated on `desire` to show how the character's formative wound has shaped them. Full flag-to-prose mid-life narrative (like a living epitaph) still not implemented.

**Historical context `context` field** on world events ✅ DONE: `context` field added to world event shape, displayed as optional expandable in WorldEvent display component. All new world events should include a `context` field; backfill existing major events over time.

---

#### BUILD 5 — Era and Historical Gaps

**1930s–40s global texture** (beyond current WWII coverage):
- Great Depression lived experience by archetype: US Dust Bowl/breadlines, British means test humiliation, Australian wool price collapse, Nigerian cash crop disruption
- WWII from non-European perspectives: Calcutta under Japanese threat and Bengal famine, Buenos Aires neutrality, Lagos and West African regiment contributions, colonised peoples drafted to fight for colonial powers

**1930s–40s global texture** ✅ PARTIAL (PR #48): Spanish flu 1918 world event (all archetypes, function-narrative branched). Great Depression 1929 world event (all archetypes, archetype-branched prose). Triangle Shirtwaist fire 1911 (USA/wealthy_west). UK miners' strike 1984 (UK). Spanish anarchist factories 1936 (Spain). Remaining: WWII non-European perspectives, Bengal famine, Buenos Aires neutrality.

**1950s–60s decolonisation arc** ✅ DONE (PR #48): `events_decolonisation.js` (10 events). Independence morning (subsaharan 1956–1970, sets `independence_generation_self`), post-independence schools, first coup disillusionment (sets `first_coup_witness`, `learned_silence`), Pan-Africanism/OAU 1963, structural adjustment lived experience (1984–1998), SAP clinic closure, brain drain wave, Nehruvian moment (India 1950–1964), post-adjustment generation, mobile phone leapfrog (2002–2012).

**1970s global texture** ✅ PARTIAL (PR #48): Oil shock 1973 periphery world event added (subsaharan/developing_urban/developing_unstable/conflict_zone), with context field. West and Gulf variants existed previously. Stagflation and post-independence disillusionment still to do.

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

**Country historical names** ✅ DONE (PR #47): `historicalNames` array added to countries.js, `getCountryNameForYear()` in countryUtils.js. CuratedBirthScreen shows historical name in parentheses. Epitaph uses year-accurate names.

**`activities.js` audit**: Fix unreachable activity combinations (GDP × age × availability).

**Event guard consistency**: Standardise all `when` guards on `G.mem?.key` optional chaining.

**Ribbons audit** ✅ DONE (PR #47): Added ribbons for `resettlement_established`, `ivf_success`, `chose_childless`, `pension_saver`, `rural_to_urban`, `first_gen_graduate`, `post_apartheid_generation`, `completed_hajj`, and flags from Latin America and country arc events. Ongoing: add ribbons for each new flag set going forward.

**`careers.js` field coverage**: Sports arc (injury, transition out, identity work). Academia arc (tenure decision, publish-or-perish, the defining student). Hospitality arc (service grind at bottom, ownership arc at top).

**BirthScreen depth** ✅ DONE: `CuratedBirthScreen.jsx` — 4-step wizard (country search, birth year/gender, rural/urban + stability + religion, preview) accessible via "Craft a Life" on TitleScreen. `startCuratedGame(overrides)` in gameStore; `createCharacter()` accepts `familyStability`, `ruralUrban`, `religion` overrides.

**Early 20s gap** ✅ DONE (PR #48): 10 young_adult events in `events_early_life.js` — first apartment, just-a-job, first real failure (sets `knows_failure`), friend group scatters, adult breakup, money zero (gated `G.money < 400`), flatmate, city arrival for rural characters, mistake owned, political formation moment (sets `political_leaning` via `p.setPolitical()`).

**Early childhood depth** ✅ DONE (PR #48): 10 early_childhood events in `events_early_life.js` — first school (archetype-branched prose), absent parent (sets `absent_parent`, `learned_silence`), new sibling (gated `G.siblings.length > 0`), object of your own (sets `childhood_object`), witnessing adults (regime-gated, auto-resolve), early illness (archetype-branched treatment), hunger known (subsaharan/conflict/developing_unstable only, sets `food_insecurity`), television arrives (wealthy_west/developing_urban/post_soviet 1958–1985), night fear, first friend.

---

#### BUILD 7 — Stateless Peoples and Contested Geographies

**Palestine character events** ✅ PARTIAL (PR #58, events_palestine.js): 8 events — Nakba displacement family memory, checkpoint as daily fixture, house demolition, permit system, Oslo brief hope, intifadas, post-2006 Gaza/West Bank divergence. Remaining: adding Palestine as a full `countries.js` entry with all demographic fields.

**Kurdish ethnicity flag events** ✅ DONE (PRs #69–72, events_kurdish.js): 12 events — Turkish language ban until 1991, PKK question in 1990s southeast Turkey, village evacuations and 3,000+ settlements burned, Syrian citizenship stripped 1962, Anfal chemical weapons 1988 (world event + character arc), Rojava. Late-reckoning follow-throughs.

**Rohingya events** ✅ DONE (PRs #69–72, events_rohingya.js): 8 events — 1982 statelessness, pre-2017 restrictions, August 2017 clearance operations, Cox's Bazar camp life five years in.

**Uyghur events** ✅ DONE (PRs #69–72, events_uyghur.js): 3 events — Ramadan restrictions, re-education camp "vocational training" invitation, diaspora silence.

---

#### BUILD 8 — Climate Arc (2025–2100) ✅ DONE

`events_climate.js` (18 events): hottest summer (archetype-branched Gulf deaths / subsaharan harvest / wealthy_west desensitisation), climate anxiety young_adult (3-path: activist / grieving / pragmatist), severe drought + `climate_displaced` residency, coastal flooding (16-country guard), Pacific king tides (`existential_homeland`), Gulf wet-bulb events (2050+), late-life witness (2070+), plus follow-throughs (`clim_activist_decade`, `clim_displaced_year_later`, `clim_climate_solidarity_payoff`, `clim_existential_homeland_adult`). New `climate_displaced` residency status with −2h/−4m/−$150 passive annual drain; extreme heat passive drain for Gulf/MENA post-2055; `climate_displaced → refugee_status` in RESIDENCY_LADDER. 10 world events added: Paris Agreement 2015, reef bleaching 2030s, mass displacement 2040s, Arctic ice-free 2040s, Gulf extreme heat 2055, Maldives evacuation 2065, climate tipping point 2045, Bangladesh Liberation 1971 (see BUILD 43). 14 headlines (1.5°C breach through Maldives 2065). 4 ribbons: `the_climate_activist`, `the_climate_displaced`, `the_existential_homeland`, `the_climate_generation`.

Remaining from original spec: game timeline only extends to ~2090 by current character age logic — no hard extension needed. 2070–2100 events fire for characters who survive to that age.

---

#### BUILD 9 — Additional Systems

**'Curated Life' mode** (separate button on TitleScreen → own flow):
- Full control: country, birth year, gender, urban/rural origin, family structure (stable/unstable/single parent), religion override, ethnicity (from that country's ethnic group distribution)
- Default 'Random Life' flow unchanged — curated mode is the opt-in for intentional play
- Educational use case: a teacher can assign "play as a woman born in 1965 in rural India" and the whole class starts from the same character

**'Who Am I?' living identity card** ✅ DONE: `generateIdentityCard(state)` in gameEngine.js. Displayed in Stats tab as "Who You Are". 3–4 sentences of present-tense identity prose, regenerated each year. Surfaces flags/state without spoiling the epitaph.

**Ageing and elder status by archetype** ✅ DONE (PR #48): 5 events appended to `events_late_life.js`. Authority track (subsaharan/developing_urban/post_soviet/wealthy_east, age 65+): `elder_consulted` (3 choices, sets `elder_authority`), `elder_you_are_memory` (age 73+, sets `oral_historian`). Invisible track (wealthy_west + `currentYear >= 2000`): `elder_polite_dismissal` (age 65–74, sets `elder_invisible`), `elder_phone_lesson` (age 68+, auto-resolve). Universal: `elder_obsolescence` (age 78+, fires for both tracks).

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

**War from the soldier's perspective** ✅ DONE (`events_soldier_arc.js`, 12 events): Characters with military careers during active conflicts get specific deployment events — deployment orders (choice: ready / has doubts), first week (the specific sensory recalibration), the friend who is gone by Thursday, the order that was legal (carried separately from its legality), return home (the airport sign, the ceiling too low), not sleeping two years later (choice: seek help / manage it), the question civilians ask, veteran recognition midlife, the anniversary the body doesn't forget, physical cost at 40+, telling children the fuller version, late reckoning on moral weight. `DEPLOYMENT_CONTEXT` helper maps country + year ranges to active conflict. Country coverage: USA (Korea/Vietnam/Gulf/Afghanistan), UK, Russia, Australia, France, Argentina, South Korea, Nigeria, Ethiopia, DRC, Somalia, Sudan, Angola, Mozambique, Algeria.

**Parent of a seriously ill child** (character events, midlife):
- The diagnosis, the reorganisation of your life around their care
- The specific grief of a different future than you imagined for them
- The relationship with your partner under that pressure (some marriages survive it; some don't; gated on existing romance arc flags)
- The long arc: the child who grows up differently from what you expected, and what your relationship becomes

---

#### BUILD 10 — Country-Specific Historical Arcs (deep specificity)

*These expand on Build 2's geographic depth with explicit event-level content for each country and era.*

**PARTIAL ✅ (PRs #47–48, #50)**: `events_country_arcs.js` (22 events) covers Nigeria, India, South Korea, Egypt, Romania, Turkey, Kenya, Ghana, Ethiopia. `events_country_arcs_2.js` (28 events, PR #48) adds China/Mao era, USA specificity, Japan. `events_country_arcs_3.js` (13 events, PR #50) adds Iran (White Revolution female literacy, SAVAK social texture, 1979 revolution week, post-revolution leftist purge, Iran-Iraq war son conscripted), South Africa (township uprising 1985 Igbo-gated, white beneficiary auto-resolve, Indian/Coloured Tricameral Parliament, TRC testimony), France WWII (occupation grey zone, Vel d\'Hiv Jewish character event, liberation/épuration auto-resolve, colonial veterans contradiction), Nigeria/Biafra (Igbo perspective, federal perspective, post-war silence). Remaining: Argentina already in events_latin_america.js; France Algeria war of independence not yet done.

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

**Cuba** ✅ PARTIAL (PR #48): Character events existed in events_latin_america.js (CDR, Special Period experience, balseros, double economy). World events added: Bay of Pigs 1961, Mariel boatlift 1980, Special Period 1991 (all with `context` fields). Cuban Missile Crisis and ration book already existed. Remaining: pre-Revolution Batista texture, 1959 revolution reorganisation event, remittance/two-tier economy character event.

**DRC** ✅ PARTIAL (PR #48): `events_drc.js` (9 events): independence speech, Lumumba death, Mobutu authenticité renaming, Mobutu institution decay (career-gated corruption), Second Congo War, eastern displacement, coltan mining, Kinshasa soukous, church community. World events: Lumumba assassination 1961, First Congo War 1996. Remaining: Mobutu-era kleptocracy depth events, Second Congo War civilian texture from the east.

**DRC original spec** (1955–2025, archetype: `conflict_zone`):
- Lumumba assassination 1961: the first post-independence prime minister killed with Belgian and CIA involvement. A character who believed in the independence project lives through its specific murder.
- Mobutu's kleptocracy 1965–1997: 32 years of systematic looting. Zaire. The specific daily experience of a country whose leader renamed it and stole it simultaneously.
- First and Second Congo Wars 1996–2003: the deadliest conflict since WWII. A character in eastern DRC lives inside the most violent conflict of the late 20th century.
- Coltan mining: the mineral that makes phones work, mined in eastern DRC under conditions of slavery. A character who works the mines, or who is the local official who manages the armed group that controls them.

**Cambodia** (1950–2025, archetype: `conflict_zone`):
- Khmer Rouge 1975–79: the killing fields, the Year Zero, the evacuation of Phnom Penh. The Khmer Rouge killed approximately 25% of the population in four years. A character who survives is statistically exceptional. The specific events: being forced to leave the city, the village work assignments, the executions, the specific phrase that could get you killed (wearing glasses, speaking French).
- Vietnamese invasion 1979: ended the genocide but installed another authoritarian government. The specific experience of liberation by an occupying army.
- UNTAC period 1993: UN-supervised elections. The brief possibility.
- Survivor in contemporary Cambodia: living alongside people who did things during the Khmer Rouge years. The ECCC trials. The specific experience of a country that cannot collectively decide what happened to it.

**Haiti** ✅ DONE (PRs #69–72): `events_haiti.js` (10 events) — Tonton Macoutes terror state, debt of independence, 2010 earthquake from inside and from diaspora, diaspora obligation. Country added to countries.js.

---

#### BUILD 12 — Cross-Cutting Experience Arcs ✅ PARTIAL (PR #48)

**Domestic worker arc** ✅ DONE (events_crosscutting.js): uniform/entry, kind employer, unkind employer, children grow, wage negotiation, OFW Gulf (Filipina + kafala-adjacent), apartheid Joburg domestic.

**City under bombardment arc** ✅ DONE (events_crosscutting.js): first night (sets `city_under_bombardment`), safe route (cooldown 2), market Wednesday, run bag, neighbour gone, child explanation, ceasefire, war end (clears flag, sets `survived_bombardment`).

**Refugee camp arc** ✅ DONE (events_crosscutting.js): arrival child, UNRWA school, ration day (cooldown 3), informal economy, resettlement interview, resettlement arrival, multigenerational.

**Domestic worker arc original spec** (`events_domestic_work.js`):
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

**Central Asia** ✅ PARTIAL (PRs #69–72): `events_central_asia.js` (10 events) — Kazakh nomad collectivization, Uzbek cotton/Aral Sea, Kyrgyz 1991 collapse, Kazakhstan oil boom. 3 new countries added (Kazakhstan, Uzbekistan, Kyrgyzstan). Remaining: Tajikistan, Turkmenistan; Southeast Europe (Greece junta, Romania detailed expansion, Basque ETA).

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

**Scandinavia** ✅ DONE (PR #58, events_scandinavia.js): 8 events — welfare state from inside, Norway oil discovery, Finland Winter War, Sweden WWII neutrality/grey zone, Janteloven social pressure.

**Remaining Scandinavia detail** (could expand):
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
- **Senegal's Mouride brotherhood** ✅ DONE (`events_senegal.js`, 5 events): Grand Magal pilgrimage to Touba (3M people, brotherhood's own law supersedes state), marabout spiritual authority over business decisions, *dahira* commercial networks across New York/Paris/Guangzhou, Barca Walla Barsakh migration route to the Canary Islands (the saying: Barcelona or death).
- **Morocco arc** ✅ DONE (`events_morocco.js`, 8 events): Years of Lead under Hassan II (9,779 confirmed cases of disappearance and torture; the Equity and Reconciliation Commission that named the pattern but not the individuals who gave orders), Amazigh language recognition 2011 (grandmother's language on a government sign for the first time), Strait of Gibraltar crossing (14km, the specific cost).
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

#### BUILD 17 — The Religious Institution from Inside; The Interpreter; The Aid Worker ✅ PARTIAL

*Perspectives that require specific professional and moral positioning.*

---

**The religious institution from inside** ✅ DONE (`events_clergy.js`, 11 events):
- **Catholic priest in rural Ireland, 1950s–70s** ✅: ordination, the parish as total social institution (baptisms/funerals/confessions/school inspections), the laundries knowledge (choice: stay silent / quietly intervene), the collapse of authority in the 1990s scandals — watching from inside the institution as it falls.
- **Buddhist monk in Cambodia** ✅: pre-Khmer Rouge monastic texture; the evacuation of 1975 (the order dissolved, monks ordered to work or flee); two paths after Vietnamese liberation (re-ordain / remain laicised); the monk who rebuilds something from nothing in the 1980s.
- **Jewish yeshiva student in Jerusalem, 1960s** ✅: full-time Torah study sustained by the state, the deferment his secular neighbour doesn't have, the 1967 war experienced from within — the specific texture of a world that enters through the *shiur* and the yeshiva gate and nowhere else.
- **Imam under Suharto's New Order** ✅: registered mosque, monitored sermons, the specific language of *dakwah* under surveillance, Reformasi 1998 and the specific disorientation of freedom arriving without warning.

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

#### BUILD 19 — Indigenous Peoples ✅ PARTIAL

`events_indigenous.js` (21 events): replaces 2 generic events in events_historical.js with 4 culture-specific arcs. **Aboriginal Australian track** (6 events): Stolen Generation 1910–1970 (forced outcome, p.m −30), return home, Country connection, Mabo personal response, Apology personal 2008, cultural reclaim. **Native American/USA track** (4 events): boarding school 1870–1975 (forced), aftermath (language gap + land distance), reservation life 1950+, AIM movement 1968–1973 (sets `political_active`). **First Nations/Canada track** (4 events): residential school 1920–1996 (forced), Sixties Scoop 1960–1985 (forced), school return, TRC 2015. **Māori/NZ track** (4 events): language suppression (childhood, pre-1960 NZ), kōhanga reo movement (1982+), Treaty settlement (1990+), renaissance (2000+). **Cross-cultural follow-throughs** (3): cultural loss grief (age 30+), generational healing (age 45+, needs healing flag), land acknowledgment complexity (2010+, sets `reconciliation_complex`). 2 world events: Mabo 1992 and Australian Apology 2008 skip Aboriginal characters via `when` guard (they get the deeper character events above). 5 ribbons: `the_stolen_generation`, `the_boarding_school_survivor`, `the_residential_school`, `the_cultural_knowledge`, `the_language_carrier`.

Remaining: Amazonian Indigenous peoples (Brazil/Peru/Colombia deforestation arc), Sami in Scandinavia — not yet implemented.

---

#### BUILD 20 — Labor, Strikes, and the Workers' Movement ✅ DONE (PR #48)

`events_labor.js` (9 events): union card joining (`lab_union_card`, needs career, 1920–2000), strike called (`lab_strike_called`, choice: honour the picket / cross the line), picket line endurance (`lab_picket_line`, needs `lab_striking`), three-month strain (`lab_strike_three_months`, sets `lab_holdout` or `lab_settled_early`), strike defeat auto-resolve (`lab_strike_outcome_defeat`, weight 4), strike victory auto-resolve (`lab_strike_outcome_win`, weight 1, karma-gated), Luddite moment (`lab_luddite_moment`, era-branched dynamic text across handloom/typesetters/truckers), solidarity test (`lab_solidarity_test`), first boss (`lab_first_boss`, young_adult).

World events: Triangle Shirtwaist fire 1911 (USA, with context), UK miners' strike 1984–85 (UK, with context), Spanish anarchist factories 1936 (Spain, with context) — all three added to worldEvents.js in PR #48.

Remaining from original spec — not yet done: Solidarity in Poland as personal character-level experience (world event exists; character events don't). Polish underground publishing arc.

---

#### BUILD 21 — Environmental Justice and Industrial Disasters ✅ DONE (PR #67)

`events_industrial.js` (9 events): **Chernobyl liquidator arc** — `ind_chernobyl_liquidator_called` (Ukraine/Russia, 1986–89, `chernobyl_generation`, choice: go / evade, sets `chernobyl_liquidator`, dosimeter-confiscated outcome prose), `ind_chernobyl_health_decade` (midlife follow-through, health cost, adds `radiation_exposure` condition), `ind_chernobyl_silence` (advocacy vs. silence choice, sets `chernobyl_advocate`). **Bhopal settlement follow-through** — `ind_bhopal_settlement` (India, 1989–97, `industrial_disaster_era`, the $550 cheque, accept/refuse branches, sets `bhopal_refused_settlement`). **Pollution as class** — `ind_river_wrong_colour` (childhood, subsaharan/developing_urban/developing_unstable + rural, Nigeria/DRC/Zambia/SA country-branched prose, sets `grew_up_polluted`), `ind_factory_fumes` (childhood, post_soviet/developing_urban, working-class neighbourhood, sets `industrial_upbringing`), `ind_pollution_body_midlife` (midlife follow-through, doctor makes a note, adds `chronic_lung_exposure` condition), `ind_factory_town_question` (young_adult, `industrial_upbringing`, leave-or-stay choice). **Niger Delta** — `ind_niger_delta_spill` (adolescence, Nigeria rural, 1970–2020, era-branched: first discovery vs. pattern fatigue, sets `oil_delta_witness`). Chernobyl world event upgraded: age-branched narrative (child/teen/adult), `context` field added, Belarus added to countries. 4 ribbons: `the_liquidator`, `the_river_wrong_colour`, `the_delta_witness`, `the_student_debt`. 4 flags added to TIMESTAMPED_FLAGS: `chernobyl_liquidator`, `grew_up_polluted`, `industrial_upbringing`, `oil_delta_witness`.

Remaining not yet done: Aral Sea (supplements BUILD 13 Central Asia — Muynak fishing port becomes desert).

**Formal debt arc (partial)**: `ya_student_loan_reality` event added to BASE_EVENTS (wealthy_west, 2004+, post-graduation, USA/UK/general branches — minimum payments that don't touch principal). Year texture: new paths for `chernobyl_liquidator`, `grew_up_polluted`, `industrial_upbringing`, `debt_spiral_experienced`/`debt_collector_known`.

**Bug fix (PR #67)**: `FlagSet.some()` crash — `FlagSet` now implements `some()`, `filter()`, `find()` for full array-style compatibility. Three `when` guards in `events_country_arcs_3.js` called `G.flags.some()` which threw `TypeError: t.some is not a function` and silently broke all age-up calls for any character.

---

#### BUILD 22 — The Body as Historical Experience

The body is lived-in, not just statted. The current system has health as a number but the body as a physical, aging, culturally-mediated experience is almost entirely absent.

**Menopause** ✅ DONE (PR #57–59, events_menopause.js): 5 events — female, ages 45–58. Culturally-branched: Japan low-symptom, USA medicalised, subsaharan status change, post-Soviet stoicism.

**Pregnancy as physical texture** ✅ DONE (PR #57–59, events_pregnancy.js): 13 events — first-trimester texture, multi-year arc, birth (archetype/GDP/year-branched), maternal complication, postpartum period.

**The aging body specifically** ✅ DONE (PR #44, events_late_life.js): first reading glasses, the knee, sleep at 60, hearing aid, driving conversation.

**Female genital mutilation** (character event, gated on specific countries/ethnicities/era) — still needed:
- Practiced in 30+ countries, affecting 200 million living women. A character who is a girl in rural Somalia or Mali in 1975 faces this as an expected cultural event. The choice structure: does the family comply, does the character resist, what is the consequence of resistance? Gate very carefully by country + rural + era. Written with the same restraint as all other events — not sensationalized, not sanitized.

---

#### BUILD 23 — The Diaspora Who Didn't Leave ✅ DONE (PR #62)

`events_stayed.js` (5 events): `sta_watching_leave` (young_adult, country/era-gated: Ireland 1979–93, Zimbabwe 2001–13, Lebanon 2019+, Poland/Romania/Ukraine, Ghana/Nigeria/Ethiopia, sets `stayed_behind`); `sta_country_empties` (midlife, country-specific prose, sets `witness_to_exodus`); `sta_sibling_visits` (midlife, sibling comparison of lives); `sta_still_connected` (late_life, being the one who holds the place for those abroad); `sta_reckoning` (late_life, country-branched, sets `chose_to_stay`). Ribbon: `the_one_who_stayed`. Follow-throughs in events_followthrough_6.js.

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

#### BUILD 25 — The Census, Documents, and Official Identity ✅ DONE

`events_documents.js` (8 events): **Rwanda 1994 ID checkpoint** (Tutsi ethnicity + Rwanda + 1994 — the person behind you in the queue, what the soldier does with the card, the two paths forward); **Soviet propiska** (post_soviet + Moscow + 1950–1990 — the residence permit you need to legally exist in the capital, the specific bureaucratic violence of being from a village); **Nansen passport** (stateless characters post-WWI — a document that lets you travel but gives you no country); **statelessness today** (residency `refugee_status` — no-document life, the border that will not let you cross); **colonial census** (subsaharan/developing_urban archetype + 1890–1960 — the moment a fluid identity becomes a fixed administrative category, the category that becomes dangerous). The identity document as fate — not just paperwork but the object that determines whether you live.

The state's power to define you — and to deny that definition — is a recurring historical mechanism. All key scenarios are now implemented.

---

#### BUILD 26 — Missing Country/Region Completions

Significant countries and regions not yet covered in Builds 1–18:

**Pakistan** (1947–present):
- Partition and the specific experience of being Muslim in a newly-Muslim country built from displacement. The Muhajir (refugee) community in Karachi — people who gave up everything for a country that then treats them as second-class citizens.
- The 1971 war and the Bangladesh secession: a character in West Pakistan watching East Pakistan declare independence, or in East Pakistan living through the nine-month genocide before liberation.
- Zia ul-Haq's Islamisation 1977–88: Hudood ordinances (rape victims required to produce four male witnesses to avoid prosecution for adultery). A woman character navigates this as daily legal reality.
- Nuclear tests 1998: the specific national pride in the streets of Islamabad versus the international sanctions that follow.

**Sri Lanka** ✅ DONE (`events_sri_lanka.js`, 8 events): Black July 1983 (Tamil perspective: hiding with Sinhalese colleagues / fleeing north; Sinhalese perspective: the moral architecture of staying inside while the mob passes); Jaffna childhood under conflict (shelling schedule, kerosene studying, exams that still happen); diaspora decision (Canada/Britain/Australia vs. staying); Tamil diaspora 2009 (watching Mullaittivu from Toronto — vigils, petitions, the number disputed); war end Sinhalese perspective (relief vs. trouble); 2022 economic collapse (petrol queue, Aragalaya); late reckoning. Added as 83rd-country-era entry with regimeHistory.

**Sudan / South Sudan**:
- Darfur 2003–present: a character who is Black African in Darfur in 2003 when the Janjaweed arrive. One of the 21st century's least-covered ongoing atrocities.
- South Sudan independence 2011 and immediate civil war 2013: the world's newest country collapses into ethnic violence within two years. The specific experience of a person who celebrated independence and then fled it.

**North Korea** (defection arc only):
- Not life inside (unverifiable at ground level) but defection: the crossing of the Tumen River into China, the specific broker network, the specific danger (Chinese government returns defectors; North Korea executes returned defectors). Gate extremely carefully — only fire for characters who have explicitly accumulated a defection-path flag, not for all North Korean characters.

**Tanzania** ✅ DONE (`events_tanzania.js`, 7 events): Julius Nyerere's Ujamaa villagisation (5M moved; the truck, the new land — school and borehole arrived with the collective), Arusha Declaration 1967, Tanzania-Uganda War 1978–79, Swahili-only education as national unity at the cost of international access, structural adjustment 1980s (clinic that closes, the specific anger at conditionality), post-SAP generation, Nyerere death 1999 (holding both what he was right about and what he was wrong about). Added as new countries.js entry.

**New Zealand / Australia (non-Indigenous)**:
- The White Australia policy (ended 1973): a character who is Chinese or South Asian applying to emigrate to Australia before 1973 encounters the dictation test — a test in any European language the examiner chooses.
- New Zealand nuclear-free policy 1984: a character in Wellington in 1985 when the US frigate is refused port and the ANZUS alliance fractures. A small country choosing principle over alliance. The specific pride and the specific anxiety.

---

#### BUILD 27 — Generational Transmission of Trauma ✅ DONE

`deriveGenerationalFlags()` in gameEngine.js seeds 17 flags at character creation based on country + birthYear. `events_family_silence.js` (20 events): the "what your parents didn't say" mechanic — early-childhood events gated on those flags, framed as absence rather than atrocity.

How parents who survived atrocity parent their children — and what those children carry.

**Second-generation trauma arcs** ✅ DONE (`events_family_silence.js`):
- The child of Holocaust survivors: the specific parenting that emerges from extreme trauma — the hypervigilance, the food hoarding, the unsayable that structures everything. Gate on `holocaust_survived` parent flag.
- The child of Partition survivors: growing up with the specific silences about the other side of the border. The house that was left. The name of a street in a city your parents never returned to.
- The child of disappeared parents (Argentina, Chile): growing up with a photograph, with a government silence, with the grandmother who goes to the plaza. The specific task of being someone whose parent was erased by the state.
- The intergenerational flag system: when a parent has `holocaust_survived`, `gulag_survived`, `apartheid_era`, or equivalent flags, there is a probability the child inherits a modified version (`holocaust_family_memory`, etc.) that gates specific events in their childhood and young adulthood. No new state model needed — flags carry across if the generational save mechanic (see below) is implemented, or can be approximated by early-childhood events conditioned on character birth year + country.

---

#### BUILD 28 — Automation, AI, and the 21st-Century Economy ✅ DONE

`events_automation.js` (12 events): **Driver/trucker arc** — `auto_trucker_news` (2025+, learns about AV programme, sets `automation_aware`), `auto_trucker_reality` (2030+, routes shrinking, choice: retrain or wait), `auto_driver_displaced` (2033+, depot closing, 22-year career vs. retraining package). **Medical** — `auto_radiologist_ai` (2028+, AI reads scans in 12 minutes vs 40, choice: embrace oversight / push back). **Legal** — `auto_legal_document_review` (2027+, associates not renewed, choice: adapt / organise). **Factory** — `auto_factory_robot` (2025+, natural attrition, choice: union report / secure own position). **General service** — `auto_customer_service_replaced` (2025+, non-specialist careers, tier-one replaced by chatbot). **Software developer** — `auto_programmer_guilt` (2026+, moves ticket to Done knowing it replaces 38 FTE) + `auto_programmer_guilt_later` (follow-through, age 40+, conference Q&A). **Data scientist** — `auto_data_scientist_irony` (2030+, built this system's predecessor, auto-resolve). **UBI debate** — `auto_ubi_debate` (2035+, wealthy archetypes, 3-branch: support/oppose/nuanced). **Follow-through** — `auto_retraining_outcome` (age 38+, 12% pay cut, choice: accept it / refuse to call it fine). 3 ribbons: `the_automated_away`, `the_retrainer`, `the_automation_builder`.

---

#### BUILD 29 — Voting, Elections, Referenda ✅ DONE (PR #44)

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

#### BUILD 30 — The Small Life: Local, Particular, Unhistoric ✅ PARTIAL (PR #44)

Some of the game's strongest potential events involve no historical reference at all — the texture of a life that leaves no record.

*Implemented: garden/garden-years, letter arrives + midlife echo, good neighbour, neighbour fence conflict, neighbour informer (regime-gated), school reunion. Remaining: local hero arc, events_local.js.*

**The local hero arc** (`events_local.js`):
- The person who is genuinely significant in a radius of five kilometres. The football coach whose team wins the regional championship. The village healer whose knowledge keeps people alive. The local historian who is the only person who remembers what this place was. Small renown is a specific experience: you are known before you've done anything notable, and you are forgotten within a generation.

**The garden / the allotment**:
- Growing food as a psychological anchor. The specific community of a British allotment site. The Cuban *patio* garden during the Special Period. The Afghan widow's kitchen garden that is both survival and the thing the day is organised around. Gate on age 40+ + specific archetype/country combinations.

**The letter**:
- Pre-email, correspondence arrives with specific weight. The letter from the son in America. The letter from the government. The letter with no return address. Letters as physical objects that contain time — the envelope held before opening, the handwriting recognised or unfamiliar. Gate on era (pre-2000 preferred) + relationship flags.

**The neighbour**:
- A whole category of human experience — the person you didn't choose, who shares your wall. The neighbour who watches your children. The neighbour you've never spoken to in five years. The neighbour who reports you. The neighbour who hides you. Gate on regime for the dangerous variants; leave unmodified for the texture variants.

---

#### BUILD 31 — The One-Child Policy Arc (China, 1980–2015) ✅ PARTIAL

**Little emperor** ✅ DONE (PR #48, events_country_arcs_2.js): the concentrated expectation, the loneliness without siblings. Sets `little_emperor`.

4 new events added to `events_country_arcs_2.js`: `ocp_missing_sisters` (adolescence, China 1985–2005, needs `little_emperor`, finds baby photo, sets `ocp_missing_sibling`), `ocp_missing_sisters_adult` (young_adult follow-through, asks mother, "we didn't have a choice"), `ocp_sole_support` (midlife, no siblings to split burden, 2 choices: carry it silently / have the conversation, sets `filial_burden`), `ocp_policy_lifted` (midlife, 2015, ambivalent — moment may have passed, 2 choices). 2 ribbons: `the_little_emperor`, `the_filial_burden`.

Remaining: **Hidden second child** arc (registration evasion, the fine, the child without papers) — not yet implemented.

---

#### BUILD 32 — Urban Slums and Informal Settlements ✅ DONE

`events_neighborhoods.js` (16 events). Informal tier: standpipe (water 2hrs/day, jerry can), settlement fire (grab-what-you-can, permanent memory), nearby landlord two streets away, thin walls, generator envy, 4km school walk (choice), gang block (adolescence, `gang_territory_childhood`), government upgrade texture, home business. Working class: solidarity and noise. Cross-tier: moving-up guilt (sets `grew_up_informal`), elite isolation, elite teen guilt, gentrification return (midlife, visiting the old block), good-years memory (late life). The `currentNeighborhoodTier` field was already in state — events gate directly on it.

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

#### BUILD 35 — The Informal Economy ✅ DONE

`events_informal.js` (18 events). Entry event: `inf_enter_informal` (young_adult, ages 16–24, gates on LOW_GDP_ARCHETYPES + no career + not already formal, sets `infWorkType` in mem + calls `p.setWorkStatus('informal')`). Hawker track: route establishment, inspector (bribe/argue/move choices), rain day. Moto taxi track: start (sets asset sense flag), breakdown repair (wipes savings), police checkpoint shakedown. Market stall track: neighbour friendship (generates friend name), demolition notice, supplier debt. Day labor track: 6am gathering (gets picked/not picked), unpaid wages dispute. Subsistence farm: good harvest / crop failure. Cross-cutting: mobile money adoption (East/West Africa 2007–2018), savings circle (ROSCA-like, sets `informal_saver`), formalization flip (midlife, `p.setWorkStatus('formal')`, sets `formalized_worker`), midlife reckoning. Engine changes: `p.setWorkStatus(val)` proxy shorthand added to `buildEffectProxy`; `_workStatus` applied in `resolveProxyExtras`.

Billions of people work outside the formal career system. The current career system is entirely formal. This build adds informal work as a primary mode for low-GDP archetypes.

---

#### BUILD 36 — The Adoptee Arc ✅ DONE

`events_adoptee.js` (5 events): **transracial identity** (adolescence — "where are you really from" from people who've known you for years, the specific experience of being a different person to everyone in the room); **DNA test** (2010+, young_adult — the half-sibling match in a country you've never been to, the question of whether to respond); **the search** (young_adult — the decision to look for biological parents, or the decision not to, both with different emotional logic; sets `adoptee_searching` or `adoptee_not_searching`); **origin trip** (midlife — returning to the country of birth, what it resolves and what it doesn't); **the thing that doesn't resolve** (late_life — living with the question that will not be answered).

All major adoption arcs covered: international/transracial (China one-child policy girls, Korean adoption program, Romanian post-1989), DNA era reshaping the question, origin trip.

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

#### BUILD 38 — The Children Left Behind ✅ DONE (PR #62)

`events_children_abroad.js` (7 events): `ca_parent_departs` (childhood ages 6–12, country-branched: Philippines Gulf, Mexico border, Romania EU); `ca_grandmother_texture` (raised by extended family, sets `raised_by_extended_family`); `ca_birthday_call` (era-branched pre/post-2005); `ca_package_arrives` (wrong sizes, wrong sweets); `ca_reunion_stranger` (arrivals hall, sets `parent_returned`); `ca_cost_accounting` (young_adult, both columns, sets `understood_the_cost`); `ca_cycle_repeating` (midlife, own child now the age you were when parent left). Ribbons: `the_left_behind`, `the_cycle_repeated`.

**The remittance family**: A child in the Philippines, Indonesia, Sri Lanka, Mexico, or Eastern Europe whose primary parent is working abroad. Material security purchased at the cost of presence. The birthday call. The package that arrives with things that don't fit.

**The grandmother as primary parent** (character event, childhood phase):
- The specific texture of being raised by a grandparent — different rules, different era, different capacity. The things the grandmother can and can't do that a parent would do.

**The return**: The parent who comes home after five years. The specific disorientation of reunion with someone who is supposed to be known. The child who is now 15, not 10, and doesn't know how to be a child to this person anymore.

**The cost accounting** (young adult event):
- The character who is now 22 and considers whether the money was worth it. The house that was built. The education that was paid for. The relationship that wasn't. No right answer built into the event — just the accounting.

**Philippines OFW worker perspective** ✅ DONE (`events_ofw.js`, 15 events): the decision arc, POEA documentation process, airport departure (the gate at NAIA, the overseas employment certificate), first year abroad, destination-specific texture — Gulf kafala (passport held, sponsor system, the specific calculus of compliance), Hong Kong domestic work (6am/10pm, the helper's uniform, Sunday in Victoria Park), Italy elder care (the *badante*, the Signora who is kind and the one who isn't) — complications, the return, late-life reckoning on what was exchanged. Complements `events_children_abroad.js` (the child's perspective). `ofw_gulf`, `ofw_hongkong`, `ofw_italy`, `ofw_runaway`, `ofw_broker_debt` flags set; follow-throughs in `events_followthrough_10.js`.

**Specific geographies**:
- Philippines → Saudi Arabia / Hong Kong / Italy (OFW arc ✅ DONE — both child perspective and worker perspective)
- Indonesia → Malaysia / Saudi Arabia
- Sri Lanka → Middle East
- Romania / Bulgaria → Spain / Italy / Germany (EU free movement era, 2004+)
- Mexico → USA

---

#### BUILD 39 — Sport as a Social Institution ✅ DONE

`events_sport.js` (11 events): local neighborhood match (football countries, childhood, country-branched prose); cricket at school (cricket countries, childhood, South Asian/African/Australian branches); watching with parent (football countries, parent alive, named parent); scout arrives (subsaharan + developing_urban + high fitness + football_childhood — 2 choices: pursue/decline, sets `sport_exit_attempted`); window closes (young_adult, `sport_exit_attempted`, sets `sport_path_closed`); cricket's imperial inheritance (South Asian + African cricket countries, young_adult, cricket_childhood, sets `cricket_colonial_inheritance`); World Cup year (significant years 1970/1978/1982/1986/1994/1998/2002/2006/2010/2014, country-branched prose: Brazil 1970 dictatorship framing, Argentina 1978 moral architecture, France 1998 multiracial moment, African nations; sets `world_cup_generation`); Sunday adult league (`football_childhood`, sets `played_into_adulthood`); the last game (`played_into_adulthood`, midlife, sets `stopped_playing`); teaching the game to a child (`football_childhood` + has children); cricket legacy in late life (`cricket_colonial_inheritance`, late reflection). World events: `jesse_owens_berlin_1936` (USA only, 1936, narrative branches on Black American ethnicity, sets `civil_rights_generation`); `west_indies_cricket_1975` (cricket countries 1975–80, context field, sets `cricket_generation`); `olympics_boycott_1980` (wealthy_west/wealthy_east 1980–85, sets `olympics_boycott_felt`). 4 ribbons: `the_sport_door`, `the_played_into_adulthood`, `the_cricket_inheritance`, `the_world_cup_child`.

Sport is mentioned in passing (Brazil/Argentina football, Korean military service, sports career injury) but never as a primary lens. It is one of the most universal human experiences across class, archetype, and era.

**Football and national identity** (world events, gated on country + year):
- Brazil 1970: the beautiful team as national mythology during the dictatorship
- Argentina 1978: the dirty war regime using the World Cup as a propaganda instrument; a character who cheers and knows what is happening in the detention centres simultaneously
- France 1998: Zidane's multiracial team as a specific national unity event, and what it meant three years later
- Cameroon 1990: Roger Milla, the first African quarterfinal, the specific pride in a country that had been told its football didn't matter

**The local match as community**: Not international — the Sunday game, the village tournament, the factory league. The sport that organizes the week and the social relationships around it.

**Jesse Owens 1936** (world event, gated on Black American ethnicity + year 1936): four gold medals in Nazi Germany while Jim Crow is the law at home. What a Black American character hears when the radio announces it.

**Cricket and the British Empire**: For characters in India, Pakistan, West Indies, Australia, South Africa — cricket is not a game but a political inheritance. The West Indian 1975 World Cup victory (Clive Lloyd's team) as a specific post-colonial pride event. The specific humiliation of colonial cricket — the counties that didn't select Black players, the tours of apartheid South Africa.

**The Olympics boycotts** (world events, 1980 and 1984): a character who trained their entire life for a Games their country decides not to attend for political reasons. The specific injustice of being an athlete in a diplomat's dispute.

**Sport as the only exit**: For a character in a subsaharan or developing_urban archetype with high fitness stat, professional sport may be the only plausible path to wealth mobility. The trial, the contract, the specific precariousness of a body that is also a livelihood. The injury that ends it before it begins.

---

#### BUILD 40 — The Arts Under Pressure ✅ DONE

`events_arts.js` (9 events): **Samizdat receiving** (`arts_samizdat_found`, post_soviet 1956–1988, age ≥ 18, no career required — choice: read and gain `dissident_reader` / return unread); **Samizdat writing** (`arts_samizdat_write`, post_soviet 1956–1988, journalist/novelist/artist OR smarts ≥ 65 — choice: carbon copies → `dissident_writer` / drawer → `art_in_drawer`); **Jazz bebop as refusal** (`arts_jazz_bebop`, USA + black_american ethnicity + musician 1943–1965 — push further → `artistic_integrity` / play what the room pays); **Jim Crow touring** (`arts_jazz_jim_crow`, USA + black_american + musician 1930–1965, auto-resolve, sets `experienced_racism` + `civil_rights_generation`); **Nollywood entry** (`arts_nollywood_entry`, Nigeria + actor/artist/musician 1992–2005 — take the role → `nollywood_generation` / wait); **Nollywood decade** (`arts_nollywood_decade`, midlife, `nollywood_generation` flag, 2006+, auto-resolve); **Censored artist's choice** (`arts_censored_stay_or_leave`, midlife, authoritarian regime + arts career, dynamic text by country: post_soviet uses Shostakovich/Brodsky framing, Cuba uses Padilla affair framing — stay/encode → `resistance_through_art` / leave → `artistic_integrity`+`emigrated` / comply → `censored_work`); **Work in the drawer** (`arts_unshown_work`, midlife, `art_in_drawer` or `censored_work` flags — retrieve / leave it); **Artistic integrity echo** (`arts_integrity_echo`, late_life age ≥ 60, `artistic_integrity` flag, auto-resolve).

---

#### BUILD 41 — Multilingualism and Language as Identity ✅ DONE

`events_multilingual.js` (7 events): **parent-child language gap** (midlife, `emigrated` — the joke that only exists in the other language, the shapes of humour that don't translate, the specific grief of a parent who cannot say certain things to their own children); **language death** (late_life — a linguist is recording the last 50 speakers, words for different qualities of rain that English has no equivalent for; choice: be recorded / let it go quietly); **code-switch identity** (young_adult, second-generation immigrant — the specific experience of being a different self in each language, the argument about which self is the real one); **lingua franca advantage made visible** (young_adult — the encounter with someone equally qualified who cannot access the same rooms, the advantage that is invisible because it is the water you swim in); **minority language as political act** (young_adult, country/era-gated — Kurdish in 1980s Turkey, Welsh in 1970s Cardiff, Catalan under Franco, Tibetan in contemporary China); **the interpreter's impossible word** (midlife, `interpreter` career — the word in the other language that has no equivalent, the choice of which meaning to sacrifice, the specific responsibility of being structurally invisible in a conversation that defines someone else's fate).

The game's language suppression events now have a positive counterpart in multilingualism as resource and identity.

---

#### BUILD 42 — Water, Infrastructure, and the Body in Space

Daily life is organized around infrastructure. Infrastructure is political. Almost entirely absent from current events.

**The morning water run** (childhood event, gated on low GDP + rural + female):
- The jerry can, the distance, the time. A girl who spends three hours a day carrying water is not in school for those three hours. One of the most significant gender-equity mechanisms in the developing world, and entirely absent from the game. Gate on subsaharan or developing_urban archetype + rural + pre-2010.

**The borehole that arrives** (character event, gated on rural + low GDP + year):
- A development organization drills a borehole in the village. The daily schedule changes overnight. The specific community reorganization around a new resource — who controls access, who benefits most, the new social hierarchy built around the pump.

**The power cut as daily reality** (recurring annual event, gated on country + era):
- Nigeria, Pakistan, Lebanon, Zimbabwe: load-shedding schedules that the day is organized around. The generator as status symbol. What cannot be refrigerated. The specific adaptations: phone charging, when to cook, the kerosene lamp kept for backup even after electrification.

**Electrification arriving** (one-time character event, gated on rural + country + year):
- Electricity arriving in a village is one of the largest single quality-of-life changes in a person's life. Gate on electrification rates by country (well-documented). The morning the first bulb comes on. The specific objects that change and the specific objects that don't. A permanent memory flag: `village_electrified`.

**Water privatization — Cochabamba 2000** (world event, Bolivia):
- The city's water supply privatized; prices triple overnight. Even rainwater collection becomes technically illegal. The uprising that reverses it. The specific experience of a city fighting a corporation over access to rain.

**The open defecation transition** (character event, gated on rural India + year):
- India's *Swachh Bharat* program from 2014, and the longer transition beforehand. The cultural resistance, the health consequences of not making the transition, the family that builds the latrine and the family that doesn't.

---

#### BUILD 43 — The 20th Century's Forgotten Wars ✅ PARTIAL

**Bangladesh Liberation War 1971** ✅ DONE: `bangladesh_liberation_1971` world event added to worldEvents.js — fires for Bangladesh/Pakistan 1971–1972, age ≥ 5. Narrative branches adult (≥ 15) vs. child perspective. Context field: "Estimates of 300,000–3,000,000 dead." Sets `liberation_war_witnessed`. Headline entry added for 1971.

**Mozambique civil war 1977–1992**:
- RENAMO vs. FRELIMO. One of the most destructive civil wars in African history, funded first by Rhodesia and then by apartheid South Africa as destabilization strategy. One million dead, five million displaced. A character born in Mozambique in 1977 is born into a country at war; they are 15 when it ends.

**Angola civil war 1975–2002**:
- 27 years of continuous war. Cold War proxy conflict (Cuba and USSR backing MPLA, US and South Africa backing UNITA), oil revenues, diamond revenues, landmines, child soldiers. A character born in Angola in 1975 is born into a country at war; they are 27 when it ends. The specific experience of a country where war is not an event but the background condition of every decision.

**Algerian civil war 1991–2002** ✅ DONE (`events_algeria.js`, 13 events): the *décennie noire* — historical ambiguity preserved throughout (the GIA carried out massacres; so did the DRS; some were never attributed; the game does not resolve what the historical record does not resolve); intellectual targeting (writers and journalists as specific targets); journalist survival choices (flee, go underground, or stay and report); the French journalist who arrives with a recorder twenty years later; *décennie_noire_memory* follow-through (midlife echo, the specific way violence that had no author shapes how you assess the news). Algeria added as new countries.js entry.

**Iran-Iraq War Iraqi perspective** (supplements BUILD 10 Iran):
- The war exists from the Iranian side in BUILD 10. It needs the Iraqi perspective too — the Shia soldier sent to fight a Shia country, the Kurdish civilian caught between two states that both consider them expendable, the Basra family near the front for eight years.

**Biafran War 1967–70** (supplements Nigeria in BUILD 10):
- The starvation of Biafra was the first televised famine — the images of kwashiorkor children that created the modern humanitarian NGO. A character who is Igbo in eastern Nigeria in 1967, or who is in the federal army, or who is in Lagos watching the news from the other side.

---

#### BUILD 44 — The Body in Later Life ✅ DONE (PR #44)

BUILD 3 covers chronic illness systems. BUILD 22 covers the body as historical experience. This covers the specific small events of physical aging that have no historical overlay — universal, undramatic, and almost entirely absent.

*Implemented: first reading glasses, the knee, sleep at 60, hearing aid, driving conversation.*

**The first pair of reading glasses** (midlife event, age 42–48):
- Small, universal, the first external prosthetic the body requires. The specific moment of a limit crossed — the menu held at arm's length, the admission, the optician's chair. No stat effect needed; a memory flag and a line of prose.

**The knee** (midlife or late_life event, gated on high fitness or sports-adjacent flags):
- The joint that fails first for most active people. The surgery decision. The recovery. The thing you can no longer do, and the negotiation of a self that was partly built around doing it.

**Sleep at 60** (late_life event):
- The body's circadian rhythm shifting earlier. Waking at 4am with no ability to return to sleep. The hours between 3am and 5am as their own territory — what lives there, what you do with them.

**The hearing aid** (late_life event):
- Resisted in many cultures because it makes decline visible. The years of asking people to repeat themselves, the social withdrawal that follows, the specific relief of finally hearing clearly again. The family member who asks and the character who says not yet.

**The driving conversation** (late_life event, gated on `has_car` + age 75+):
- The conversation about whether a parent should still be driving. The keys on the table. What the car represented — independence, competence, adulthood — and what taking it means. A choice event with real cost on both branches.

---

#### BUILD 45 — Sex and Intimacy Across a Life ✅ DONE (PR #60)

`events_intimacy.js` (12 events): sexual revolution arc (female/wealthy_west 1967–77, sets `liberation_generation`) + midlife reckoning follow-through; long marriage desire shift (12+ married years, sets `long_marriage_intimacy`); affair temptation choice — taken path (sets `affair_brief_secret`, −8m, +14r) and not-taken path (sets `affair_not_taken`, karma+7) — with weight follow-through (`int_affair_weight`, carries it quietly) and late echo at 58+ (`int_affair_not_taken_echo`); late beginning choice at 36–52 (solo by choice vs. late_love_seeking); late love arriving (sets `late_love_found`, +18m); sexuality in cultures without vocabulary (subsaharan/wealthy_gulf/developing_urban, sets `cultural_intimacy_silence`); body in late life with partner (63–82, +9m); solo life texture (sets `built_something_solo`); first love ending in young adulthood (sets `first_love_over`). World event: `womens_liberation_march_1970` (wealthy_west 1970–72, gender-branched, context field, sets `liberation_generation`). 3 ribbons: `the_late_love`, `the_affair_not_taken`, `the_solo_architecture`.

---

#### BUILD 46 — The School as an Institution ✅ DONE (PR #60)

`events_school.js` (11 events): resource-poor classroom — 60 children/1 teacher (subsaharan/developing_urban/developing_unstable, sets `resource_poor_school`); teacher who came unpaid for four months (sets `teacher_sacrifice`) + midlife echo at 38+ (`sch_teacher_sacrifice_echo`); shared textbook (rural, wealthTier ≤ 1); scholarship arrival choice at 13–16 (smarts ≥ 60, wealthTier ≤ 2) — accept (sets `scholarship_student`) or decline (sets `scholarship_declined`); lunch table social texture (`sch_scholarship_lunch`, sets `class_gap_known`); young-adult scholarship payoff (sets `scholarship_opened_doors`); war-zone school choice (conflict_zone ages 6–12) — attend (sets `war_school_attended`) or miss (sets `war_school_missed`); year-gap follow-through in adolescence for `war_school_missed`; national exam (developing_urban/subsaharan/post_soviet/wealthy_east, age 16–18, archetype-branched prose) — strong (sets `exam_result_strong`) or weak (sets `exam_result_weak`); exam echo in young_adult for `exam_result_weak`. World event: `afghanistan_girls_school_ban_2022` (Afghanistan 2022–25, gender-branched, context field, sets `education_denied_gender` for female). 3 ribbons: `the_scholarship_student`, `the_war_school`, `the_teacher_remembered`.

Remaining from original spec not yet implemented: the school reunion event (covered partially by `events_small_life.js` `sm_school_reunion`; full midlife social archaeology version not added).

---

#### BUILD 47 — The Mentor and the Protégé (Full Arc) ✅ DONE

`events_mentor.js` (10 events). Receiving mentorship arc: `men_deepens` (midlife 32–44, coffee meeting, "Is this what you meant to be doing?", 2 choices), `men_favor_asked` (uncomfortable ask, 2 choices), `men_estrangement` (distance accumulates, reach out or let recede), `men_mentor_died` (funeral, sits near the back, sets `lost_mentor`, m−15), `men_mentor_echo` (late_life 58+, hearing their phrasing in your own voice). Becoming the mentor arc: `men_becomes_mentor` (midlife 35–50, recognizes the hunger, generates named `protegeName` from country namePool, sets `is_mentor`), `men_protege_surpasses` (late_life, applauding, m+15), `men_protege_betrayal` (takes your methods/clients, 3 choices: confront/let go/document), `men_both_arcs` (62+, having been on both sides, m+12, karma+8). Echo: `men_adol_teacher_echo` (midlife, `mentored` flag from childhood, hears their phrasing). Triggered by `mentor_at_work` in events.js which now stores named `mentorName` + `mentorField` in mem. 2 ribbons: `the_mentor` (is_mentor or protege_exceeded), `the_chain` (lost_mentor AND mentored someone).

The fame/karma events have a brief protégé payoff. This is the full arc: a relationship that develops across years, with consequences in both directions.

**Receiving mentorship** (young_adult, gated on career + smarts ≥ 60):
- The person who sees you before you see yourself. What they give that isn't in the job description — the introduction made, the mistake quietly corrected before it became permanent. The specific debt that cannot be repaid directly, only forwarded.

**Becoming the mentor** (midlife, gated on career seniority + `has_mentor` flag):
- The first time a younger person seeks your advice and you realize you've become the person who knows things. The specific shift in social gravity — from being the one who asks to being the one who is asked.

**The protégé who betrays** (midlife event, gated on `has_protege`):
- Takes your methods, your clients, your contacts — and credits themselves. The specific bitterness of having been generous. A choice event: confront, let it go, or find a way to make it cost them.

**The protégé who surpasses you** (late_life, gated on `has_protege`):
- Watching someone you taught become someone you couldn't have become. The specific pride that sits alongside something harder to name. An outcome event, no choice — just the experience of having built someone better than yourself.

**The mentor's death** (late_life, gated on `has_mentor`):
- Losing the person who made you possible. The specific silence — the absence of the one person who knew you before you were known. Connects to grief module; sets `mentor_died` flag which gates a late-life reflection event at age 70+.

---

#### BUILD 48 — The Criminal Record as a Permanent Condition ✅ DONE

`events_postrelease.js` (12 events). `served_prison_time` flag now set by gameEngine.js on prison release (was missing). `criminalRecord` entries now stored as `{ crime, age, category }` objects (ActivitiesPanel.jsx and gameEngine.js updated; backward-compatible string fallback preserved). Helper functions `hasCategory()` + `getRecordCategory()` in file scope. Events: `pr_release_morning` (gates on `served_prison_time && !inPrison`, political prisoner branch); `pr_job_application` (USA-specific felony checkbox prose, 3 choices: disclose/lie/sidestep, lie sets `prJobApplicationLied`); `pr_application_lie_discovered` (background check resurfaces lie, gates on `prJobApplicationLied && career !== null`); `pr_housing_difficulty` (USA public housing bar text, gates on `money < 3000`); `pr_parole_conditions` (weekly reporting, gates on `originalSentence >= 3`); `pr_parole_near_breach` (sick parent two counties over, choice); `pr_family_reunion` (sitting at the same table again); `pr_recidivism_trap` (structural loop, 2 choices: `recidivism_risk` or `seeking_reentry_support`); `pr_usa_rights_lost` (voting/student loans/housing bar, USA-only); `pr_spent_conviction` (UK/EU clean-record path for minor offences); `pr_decade_clean` (10 years, sets `decade_after_prison`); `pr_political_release` (political prisoner dignity, gates on `political_prisoner || dissident_writer || dissident_reader`). 3 ribbons: `the_decade_after`, `the_political_witness`, `the_reentry`.

The prison system exists. The post-release experience is almost entirely absent. The criminal record is not a past event — it is a present condition.

**The job application** (post-release, young_adult/midlife):
- The checkbox that asks "have you ever been convicted." The specific moment of stopping. A choice event: lie (risk), disclose (likely rejection), or disclose and argue your case. Outcome branches on country + archetype + career type. Gate: `criminalRecord` + age 18–45.

**Housing discrimination** (post-release event, gated on `criminalRecord` + low wealth):
- Landlords who won't rent. The shelter, the couch, the specific instability that makes recidivism not a moral failure but a structural near-inevitability. A character who cannot get housing cannot maintain parole conditions. The loop closes.

**Parole conditions** (recurring annual event while `inParole` flag active):
- Reporting weekly, not leaving the county, the specific surveillance of freedom that isn't quite freedom. A choice event: the condition you technically violate without meaning to — miss a check-in because of a shift change, leave the county for a sick parent. What the officer decides.

**Archetype branching is mandatory here**: In the USA, a Black man with a drug conviction navigates categorically different closed doors than a white-collar fraudster in Switzerland. Gate text explicitly on country + ethnicity + crime category. Do not write one text that tries to cover both.

**The record that expires** (or doesn't): In the UK, convictions are "spent" after a clean period and need not be disclosed. In the USA, most are permanent. A character who waits out the clock in one country vs. a character who cannot.

---

#### BUILD 49 — The Famine from Inside ✅ PARTIAL (arc done; aid convoy not implemented)

4 events appended to `events_followthrough_5.js`, chained via `G.mem`. All gate on `famine_survivor` flag (set by Holodomor/Great Leap/Ethiopia/Biafra/North Korea world events). `fam_arc_price` (childhood ≥4, first sign is market prices doubling, dynamic text for child vs adult, choice: buy now / wait, stores `famineAge`); `fam_arc_body` (chains from `famArcPrice`, hunger becomes background, auto-resolve, h−10 m−10); `fam_arc_selling` (chains from `famArcBody`, livestock branch via rural flag, or household objects, choice: sell / borrow, sets `famine_asset_loss`); `fam_arc_after` (midlife ≥25, age > famineAge+8, pantry overstocked, partner finds it puzzling, sets `famine_memory`). 1 ribbon: `the_famine_memory`. Aid convoy not yet implemented.

Multiple famines exist as world events. What's missing is the granular character-level arc — what a famine actually feels like to live through across weeks and months, not as a single event.

**The price event** (week 1 of famine arc):
- The first sign is never hunger — it is price. The market stall where the price of millet has doubled since last week, and the week before that it doubled too. A choice event: spend the savings now while something remains to buy, or wait.

**The body changing** (week 3–6):
- Not a choice event. The specific physical sequence: the hunger that is present and then becomes background noise, and then becomes the only thing. Children first, because they show it first.

**The decision about what to sell** (choice event):
- The asset that still has value. The livestock, the tool, the jewelry from the wedding. Each thing sold represents a future that closes. Gate on what asset flags the character holds.

**The aid convoy** (if applicable, gated on international aid being present in that famine):
- The queue. The categories of who gets priority. The specific indignity that aid can carry even when it saves your life — the forms, the classification, the foreign worker who cannot pronounce your name.

**After** (memory flag event, fires 5–10 years post-famine):
- The hoarding reflex that persists. The relationship with food that never returns to what it was. Gate on `famine_survived` flag; fires once in midlife.

---

#### BUILD 50 — Money Across a Life ✅ DONE (current PR)

The `money` and `wealth` fields track amounts. The *experience* of money — what it feels like to have it, to lose it, to inherit it, to give it away — has almost no dedicated events.

**Implementation**: New file `events_money.js`. Events gate on specific money thresholds, delta changes (sudden gain or loss), and life-stage combinations. These are character events, not world events, though they may reference world events (hyperinflation) in their text.

**The first significant sum** (young_adult event, gated on `money > 1000` for first time):
- The first paycheck that feels like real money. What you do with it — the specific temptation, the specific discipline. A choice event: spend it (immediate effect), save it (future flag), or send it home (karma boost, relationship with family flag).

**Watching prices become meaningless** (gated on hyperinflation world event being active):
- Weimar Germany 1923, Zimbabwe 2008, Argentina 1989, Turkey 2022. What do you do with a salary on payday when the price of bread has doubled by Friday? A choice event with no good options: spend immediately, convert to hard currency (if you have access), barter.

**The inheritance** (midlife event, gated on parent death + parent had wealth):
- Not just the money but the psychological complexity of inheriting from someone you had a complicated relationship with. The thing you didn't expect them to leave you. The thing you expected that wasn't there. A choice event: keep it, give it away, invest it.

**The gift** (late_life event, gated on `money > 50000` + age 65+):
- The character who gives significant money away before death. To a child, grandchild, cause. A choice event that shapes the epitaph: what you chose to do with what you accumulated says something about who you decided to be.

**The scam** (late_life event, gated on age 65+ + wealth above threshold):
- Elder financial abuse is the most common form of financial crime. Not a stranger but someone who presents as trustworthy — an investment advisor, a new friend, a distant relative. A choice event: trust them, be suspicious, investigate. Outcome branches on smarts stat.

---

#### BUILD 51 — Pregnancy and Birth as Physical Events ✅ DONE

`events_pregnancy.js` (13 events, PR #57–59): first-trimester texture, multi-year arc, birth (archetype/GDP/year-branched), maternal complication, postpartum period. Engine: `pregnant` flag + `pregnancyYear` mem for multi-year arc.

**First trimester texture** (gated on `pregnant` + within 3 months of conception):
- The nausea, the exhaustion that is unlike any other tiredness. The keeping of the secret for twelve weeks — being unwell in a way that cannot be explained at work or to friends. The specific loneliness of early pregnancy. A texture event, no choice required.

**The birth** (fires when pregnancy reaches term):
- Not just "you had a child." A choice event — the specific decision-points of labor. Gate on year/archetype for what medical options exist. A hospital birth in Denmark in 1990 vs. a home birth with a traditional birth attendant in rural Mali in 1970 are completely different events with completely different risk profiles. Outcome: child added to state, birth flags set.

**Maternal complication** (low-probability branch off birth event, weighted by archetype/GDP/year):
- Serious complications arise. Outcome branches on archetype + GDP + currentYear. Maternal mortality in the 19th century was a common risk; its near-elimination in wealthy countries over the 20th century is an educational payload worth surfacing. If maternal death occurs: handled by existing death system with specific epitaph text.

**The postpartum period** (fires 1–6 months post-birth, gated on `has_child` + first birth):
- The weeks after birth that no one in the character's life discusses. The body that does not return immediately. The gap between expectation and experience. Gate era-awareness: postpartum depression as a recognized medical condition is recent — pre-1980 characters experience it without a name for it.

---

#### BUILD 52 — The Elder as Authority ✅ DONE (PR #48)

Events appended to `events_late_life.js`: `elder_consulted` (authority track, age 65–74), `elder_you_are_memory` (age 73+), `elder_polite_dismissal` (invisible track, wealthy_west 2000+, age 65–74), `elder_phone_lesson` (age 68+), `elder_obsolescence` (age 78+, universal). See BUILD 9 notes for full detail.

**Being consulted** (authority track, age 65–70):
- The first time a younger person seeks your advice and you realize you've become the repository of something. The specific shift in social gravity when you are no longer the one who asks.

**The council seat / village elder role** (authority track, age 70+, gated on karma + community flags):
- Formal or informal governance role. A character who reaches this position navigates the specific responsibility of collective decision-making on behalf of people who have known you your entire life.

**You are the memory now** (authority track, age 75+):
- You are one of a decreasing number of people who remember what this place was before. A younger person asks you to tell it. A choice event: tell everything, tell a version, or say it doesn't matter now.

**The obsolescence that arrives anyway** (both tracks, age 80+):
- Even in cultures that respect elders, technology and social change eventually outrun what any individual can hold. Being respected and irrelevant simultaneously. No choice — a texture event that lands differently depending on which track the character is on.

**The polite dismissal** (invisible track, wealthy_west + 2000s+, age 65–70):
- The meeting where your comment is heard and not answered. The adult child who explains the phone to you as if you are a different person than the one who taught them to read. The specific experience of competence that no longer registers as competence.

---

#### BUILD 53 — Natural Disaster as Biography ✅ PARTIAL

`events_disasters.js` (8 events): Bangladesh flood season (cooldown 5, rural, recurring texture); bad flood year (`flood_season_known`, young_adult, sets `flood_crisis_witnessed`); flood from distance (`flood_season_known` + `emigrated`, midlife); earthquake preparedness (Japan/Turkey/Chile/Peru/Mexico/Indonesia/Philippines/Nepal/NZ, young_adult, country-branched prose, sets `earthquake_prepared`); earthquake experience (`earthquake_prepared`, midlife, sets `earthquake_survived`); typhoon season (Philippines/Vietnam/Japan, cooldown 6, country-branched); typhoon bad year (Philippines, young_adult, sets `survived_major_storm`); living with the knowledge (late_life, universal for all disaster flags). World events: `bhola_cyclone_1970` (Bangladesh 1970, child/adult narrative branch, context field, sets `bhola_survivor`; connects to liberation war via `ft7_bhola_survivor_liberation` follow-through); `tangshan_earthquake_1976` (China 1976, child/adult branch, context field, sets `tangshan_witness`). 3 ribbons: `the_flood_country`, `the_earthquake_country`, `the_storm_season`. Remaining: Mexico City 1985 world event, Nepal 2015 earthquake world event.

Beyond the climate arc (future-facing), historical natural disasters that shaped specific lives.

**Implementation**: World events in `worldEvents.js` for the large ones; character events in country-specific modules for recurring ones. Same `when` guard pattern as existing world events.

**1976 Tangshan earthquake** (world event, China + 1976):
- 250,000 dead in 23 seconds in a city of one million. The Chinese government initially refused international aid. A character in Tangshan or nearby: the specific sequence — the sound before the shaking, the building that holds and the one next to it that doesn't. Gate on China + age ≥ 5 + `currentYear === 1976`.

**1970 Bhola cyclone** (world event, Bangladesh/East Pakistan + 1970):
- 500,000 dead. The Pakistani government's inadequate response was a direct trigger of the Bangladesh liberation movement — the cyclone and the abandonment together. Gate on Bangladesh + 1970. Connects to the 1971 liberation war world event (BUILD 43) via flags.

**1985 Mexico City earthquake** (supplements BUILD 10 Mexico):
- Covered briefly in BUILD 10; deserves its own world event entry. The government's failure, the citizen self-organization that followed, the specific crediting of this event with the birth of Mexican civil society. Gate on Mexico + 1985.

**Recurring flood as annual condition** (character event, gated on Bangladesh + rural + pre-2050):
- Not a disaster but a condition. The annual flood that is expected, prepared for, lived around. The year it is worse than expected. The specific knowledge of living in a place that water visits regularly — the raised floor, the boat kept tied, the seed stored high. A texture event that fires every 3–5 years rather than once.

**Earthquake risk as daily texture** (character event, gated on Japan/Turkey/Iran/Mexico + young_adult):
- Countries where earthquakes are a known background risk: the drill practiced since childhood, the bag kept by the door, the building you assess when you enter it for the first time. A texture event rather than a disaster event — the preparedness as a form of living.

---

#### BUILD 54 — Flag Audit & Follow-Through Pass ✅ CORE DONE (ongoing maintenance)

**The problem**: ~400 flags are set by events and never checked again. They function as labels with no downstream consequence — the game records trauma, resilience, love, and loss, but only uses that record at death (epitaph), not during the life.

**The standard going forward**: Every new event module must ship its follow-through events *before* the triggering events. Write the downstream event first — what this thing becomes three years later, ten years later — then work backward to the trigger. An event with no follow-through consequence is just prose; it disappears from the life the moment it resolves.

**What has already been implemented** (shipped with flag audit pass):

*`events_followthrough.js`* — 25 follow-through events covering the most emotionally significant orphaned flags:
- `experienced_racism` → career ceiling event (midlife), negotiated as a recurring condition
- `double_consciousness` → ongoing daily navigation cost (midlife/young_adult)
- `lgbtq_family_rejection` → letter event (midlife), reconciliation attempt or letting go
- `lgbtq_out_family` → years-later event, fear that has become background noise
- `abusive_relationship` → new-partner anxiety event + therapy prompt
- `fled_child_marriage` → young adult identity construction event
- `communist_childhood` → nostalgia for certainty after the collapse (post-1993)
- `authoritarian_childhood` → authority-figure reflex in career context
- `cancer_survivor` → annual scan callback (cooldown 3)
- `food_insecurity` → adult pantry compulsion (once)
- `first_gen_university` → child's university application moment (midlife)
- `education_denied_gender` → adult literacy return (midlife, once)
- `emigrated` → 10-year anniversary + home visit event
- `career_defining_work` → legacy echo in late life
- `defied_caste` → ongoing social cost in midlife (cooldown 8)
- `interrogated_by_state` → hypervigilance habit (cooldown 10)
- `learned_silence` → meeting cost (midlife, cooldown 10)
- `lost_friend` → old photo midlife moment (once)
- `boarding_school` → smell/memory trigger (once)
- `rural_to_urban` → village return moment (once)
- `criminalRecord` (array) → form-filling event (cooldown 4)

*`events_relationship_quality.js`* — 13 events gated on relationship quality thresholds:
- Partner quality < 28: `rq_partner_contempt` — an unkind thing said
- Partner quality < 40: `rq_partner_silence` — functional dinners
- Partner quality < 38 + married: `rq_partner_separate_lives` — parallel lives by default
- Partner quality > 78: `rq_partner_warmth` — catching them reading
- Partner quality > 82 + married + late_life: `rq_partner_long_warmth` — people asking how you do it
- Partner quality < 35 + prior flag: `rq_partner_repair_attempt` — couples therapy suggestion
- Child quality < 40 (adult): `rq_child_drift` — calls less now
- Child quality < 24 (adult): `rq_child_estrangement` — over a year without contact
- Child quality > 80 (adult): `rq_child_close` — texts about small things
- Sibling quality < 36: `rq_sibling_formal` — birthday messages only
- Sibling quality > 78: `rq_sibling_close` — decades of shorthand
- Friend quality < 28: `rq_friend_fading` — seven months, surprised both of you

*`buildYearTexture()` in gameEngine.js* — replaces "A quiet year passes." with flag-aware prose. Priority: partner/parent death (first year) → health crisis → relationship quality tension/warmth → post-crisis flags (prison release, divorce, business failure) → undocumented status → new emigrant → authoritarian context → phase/age texture → career flags → randomised generic fallbacks.

*`events_followthrough_4.js`* — 10 additional follow-through events: `caste_discrimination` → career ceiling (young_adult, cooldown 8); `corporate_scandal_covered` → resurfaces at a conference (midlife, once); `betrayal_adolescence` → adult trust cost (young_adult, cooldown 8); `harvest_failure` → pantry compulsion with money (midlife, once); `civil_war_lived` → news echo (midlife, cooldown 10); `ethnic_minority_conflict` → "where are you really from" at work (midlife, cooldown 8); `dissident_reader` → regime-gated social cost (young_adult, cooldown 8); refugee 5-year anniversary (phase-agnostic, once); `political_active` → regime-gated career reassignment (midlife, cooldown 10); `dissident_writer` → arrest risk in authoritarian regime (young_adult, once).

*`events_followthrough_5.js`* — 12 events: 8 follow-throughs for BUILD 40 and orphaned flags (`civil_rights_generation`, `resistance_through_art`, `art_shown_late`, `compromised`, `censored_journalist`, `intimidated_into_silence`, `independence_generation_self`, `first_coup_witness`) + 4 famine personal arc events (BUILD 49: `fam_arc_price`, `fam_arc_body`, `fam_arc_selling`, `fam_arc_after`).

**Remaining audit work (do not ship new event modules without checking these)**:

Flags still orphaned that carry significant weight — add follow-through events when the relevant module is touched:
- `lgbtq_had_relationship` — relationship texture event in adulthood
- `had_abortion` — follow-through in future pregnancy or partner contexts
- `war_childhood` — adult PTSD-adjacent event (already partly covered by `conflict_childhood` events)
- `refugee_status` — resettlement anniversary event (now covered for combined emigrated+refugee_arrived, but pure `refugee_status` flag needs a separate one)

**Implementation notes**:
- Follow-through events should use `G.mem.someKey` + `p.setMem('someKey', true)` for one-time fires
- Use `cooldown: N` for recurring follow-through (grief callbacks, anniversary checks)
- Do not set `cooldown: 0` unless the event should fire exactly once (guarded by `G.mem`)
- Check `G._state` is not needed in effects — use `p._state` which is already set on the proxy
- When a follow-through event changes a relationship, find the correct index by filtering `p._state.children` or `p._state.friends` inside the effect

---

#### MECHANICAL IDEAS (no build number — evaluate when relevant)

*These are systemic additions worth considering alongside content builds.*

- **The generational save**: On death, play the character's child, inheriting specific flags (not stats). A child born to a character with `holocaust_survived` starts with `holocaust_family_memory`. The game becomes multi-generational without requiring it. This would make the intergenerational trauma arcs (Build 27) much more powerful.

- **The dream/memory**: Occasionally an event "replays" an earlier event with new framing. At 55, a childhood event is recalled — not the original text but a memory of it, recontextualized by what the character has become. Requires no new state, just careful event design that references prior flags.

- **The newspaper headline UI** ✅ DONE: `src/data/headlines.js` — ~50 major historical moments injected as styled log entries. Rendered with distinct visual treatment in the life log.

- **Weather as texture**: Seasonal descriptors in the event or life log — "a dry harmattan wind carries red dust through the city" for Abuja in January, "the monsoon has been six weeks late" for Bangladesh in July. Gate on country + approximate season. No stat effects; purely atmospheric.

- **The oral tradition register**: For characters in pre-literate or low-literacy contexts, events are framed as told rather than written. "Your grandmother tells you about the year the rains didn't come." Historically accurate and a distinct prose register from the educated character's events.

- **The neighborhood field**: Add `neighborhood: 'informal'|'working_class'|'middle_class'|'elite'` to character state, set at creation (weighted by archetype/GDP) and modifiable by wealth thresholds during the life course. Gates a whole class of events (BUILD 32) and makes the `ruralUrban` field more granular without replacing it.

- **The soundtrack layer**: One-line cultural markers injected alongside newspaper headlines — not historical events but cultural ones. "Fela Kuti's *Zombie* is banned in Nigeria." "Celine Dion's *My Heart Will Go On* is playing everywhere." No stat effects. Same implementation cost as the headline UI, doubles its power.

- **Infrastructure arrival as a life event**: Electricity arriving in a village is one of the largest single quality-of-life changes in a person's life — and it is a one-time historical event with a specific before and after. The morning the first bulb comes on. Gate on country + ruralUrban + year (electrification rates by country are well-documented). No stat model change needed; handled as a character event with a permanent memory flag.

- **The `what your parents didn't say` mechanic**: When a parent has atrocity-adjacent flags (`holocaust_survived`, `gulag_survived`, `partition_survived`, etc.), an early-childhood event fires that is specifically about absence — the topic that is never named at the dinner table. No new state needed. Requires only that the parent-flag inheritance logic in character creation passes the flag through to the child's accessible G context.

- **Formal debt as a character arc**: The `debt` field exists but almost no events engage with the *experience* of debt — the creditor call, the asset repossession, the bankruptcy decision, the decade of rebuilding. A `events_debt.js` module gated on `state.debt > threshold` + archetype/year would cover: credit card debt spiral (USA 1990s+), student loans as generational story (wealthy_west 2000s+), microfinance spiral (developing_urban, see BUILD 37), IMF structural adjustment as personal experience.

- **The informal worker state**: A `workStatus: 'formal'|'informal'|'unemployed'|'subsistence'` field alongside the existing `career` field. For archetypes where formal employment is not the default, this unlocks informal economy events (BUILD 35) without needing a named career. Career remains the prestige track; `workStatus` covers everyone else.

- **The `conditions[]` retroactive audit**: Once BUILD 3 (chronic illness) ships, all existing events that reference health should be audited to check `conditions` state and branch text accordingly. A cancer survivor encountering a health scare event gets different text from someone who has never had a serious diagnosis. This is a pass over existing content, not new content.

- **Flag weight in the epitaph**: The current epitaph generates prose from flags. Some flags should dominate the narrative if present; others should be background texture. Add a `weight: 'major'|'minor'` property to flag definitions (or a dedicated list in `generateEpitaph`) that the epitaph generator uses to prioritize. `holocaust_survived` and `widowed` should not share equal prominence with `won_local_chess_tournament`.

- **The choice you didn't make**: Occasionally an event should reference a prior choice by naming what the other path would have looked like. "Your brother took the scholarship you turned down. He is a doctor in London now." Requires only careful event design referencing prior flags — no new state. Best used sparingly, at life-review moments (ages 40, 60).

- **Time-of-life activity unlocks**: Activities should unlock and lock dynamically based on conditions, career status, and relationships — not just age ranges. A character with severe arthritis cannot take up rock climbing at 60. A character who just retired has time for things they never could before. A character in prison has a completely restricted activity set. This makes the activities panel feel like it reflects the actual life rather than a static menu.

- **Seasonal event modifiers**: Some events should be weighted differently by time of year — harvest festivals, monsoon arrivals, holy days, winter hardships. Add a `season` field to `buildG()` derived from `currentYear` and a country-hemisphere flag. Events check `G.season` for texture without new state. Implementation: `buildG()` in `gameEngine.js`, add `season: getCountrySeason(character.country, currentYear % 1)`.

- **The `lastMajorEvent` field**: Add `lastMajorEvent: { category: string, year: number }` to state. Track the most recent event by category (`'bereavement'|'birth'|'illness'|'loss'|'triumph'`). Events that should not fire too close to each other check `G.mem` or this field to space arcs. Prevents a miscarriage event firing immediately after a parent death. Implementation: set via `p.setMem('lastMajorEvent_bereavement', G.currentYear)` and guard with `!G.mem?.lastMajorEvent_bereavement || G.currentYear - G.mem.lastMajorEvent_bereavement > 2`.

- **Letters as a UI element**: Pre-2000 characters with active relationship flags should occasionally receive a letter — formatted differently from events (indented block, italic, different prose register) from a sibling abroad, a parent, an old friend. Same event system; different visual treatment in `EventBox.jsx` via an `isLetter: true` property on the event. No new state required.

- **The `legacy` field**: Add `legacy: number` (0–100) to state alongside karma and fame. Accumulates from: children raised (relationship quality), students mentored, community contributions, creative works completed, businesses that employed people. Used by `generateEpitaph` to describe what the character built that outlasts them. Currently the epitaph has no forward-looking dimension. Implementation: `p.legacy` delta in effect proxy, `G.legacy` in buildG, epitaph prose branch on `legacy > 60`, `legacy > 80`.

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

- **The follow-through sentence**: Every event that changes a flag should have at least one future event that references it. Before shipping any new event module, write the follow-through events first, then work backward to the triggering event. An event with no downstream consequence is just text — it disappears from the life the moment it resolves.

- **The thing not unpacked**: In migration and displacement events, the object that was packed and then never unpacked. The box in the corner of the new apartment, still sealed three years later. What is inside it is not said. It doesn't need to be.

These principles should inform the prose register of every new event, not just events in these specific categories.

**Historical accuracy standard**: The game's fiction should be seamless — no disclaimers inline. Accuracy is a design constraint, not a label. If an event isn't accurate enough to ship without a disclaimer, it isn't accurate enough to ship.

**The Immersion Principle still applies to every new event**: Time-accurate, place-accurate, perspective-accurate, consequential. A 2060 climate event should feel as specific and grounded as a 1973 oil shock event.

```
src/
  data/
    countries.js              — 83 countries with full demographic data (added Kazakhstan, Uzbekistan,
                                Kyrgyzstan, Indonesia, Haiti, Cambodia, Myanmar, Senegal, Morocco,
                                Sri Lanka, Tanzania, Algeria in PRs #69–72)
    places.js                 — 250+ named places across all countries (scale, region, type, population)
    headlines.js              — ~110 major historical headlines for life log injection
    events.js                 — root event file, imports 120 modules, exports EVENTS array (~2,540+ total character events)
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
    events_country_arcs_3.js  — 13 country arc events: Iran (SAVAK/revolution/purge/war), South Africa (township/TRC), France WWII (occupation/Vel d'Hiv/liberation), Nigeria/Biafra
    events_arts.js            — 9 arts-under-pressure events: samizdat arcs, jazz/bebop refusal, Nollywood entry + decade, censored artist stay-or-leave, unshown work, artistic integrity echo
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
    events_palestine.js       — 8 Palestine character events: Nakba memory, checkpoint, demolition, intifadas
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
    worldEvents.js            — 181 world history events (year+country/archetype gated); 20+ events have `context` fields
    headlines.js              — ~110 major historical headline entries (year-matched, injected as log entries)
    flags.js                  — FLAG_REGISTRY: master design document for the flag system. 222 registered
                                flags with weight/category/description/intent/notes per entry. Pure data,
                                no imports. Run `npm run check-flags` to derive coverage dynamically.
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    assets.js                 — property/vehicle data
    destinations.js           — travel destinations
    illnesses.js              — illness/disease system
    ribbons.js                — end-of-life achievement ribbons (203+ defined)
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

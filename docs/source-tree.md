# Source tree

Per-module descriptions, moved out of CLAUDE.md. Counts here are historical;
`npm run stats` gives current ones.


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
                                health, relationships, political, prison, world_events, lifecycle, new_roster,
                                and the four unwritten_* regional files).
                                2879 registered flags. Pure data, no imports. `npm run check-flags` derives coverage.
    careers.js                — all career definitions with career-specific events
    crimes.js                 — criminal activity system
    activities.js             — activities panel options
    habitProse.js             — what a repeated activity says once its own line has been said
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
        events_second_world_war.js — 30 events: Poland 1939-45, China 1937-45, the Philippines 1941-45,
                                    Yugoslavia 1941-45, Indonesia 1942-49, Korea 1938-45, as lived by
                                    the character the engine draws in each
        events_soviet_1929.js     — 25 events: every Soviet republic 1929-1956 — collectivisation, the Kazakh and
                                    Volga famines, the Terror, the war from 22 June to 9 May, the deported
                                    peoples and their returns, Stalin's funeral, Tbilisi 1956
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
  play.mjs                    — plays lives through the real store like a player (answers, activities,
                                money buttons, emigration, crime) and writes each life to a text file
                                to be read end to end. The instrument for "read the log in order".
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


# natalis — Build Roadmap

Consult when planning new content, auditing coverage, or choosing what to tackle next. Work rotates between three modes — (A) geographic/content depth, (B) mechanical depth, (C) polish and feel.

---

### Completion History

**PRs #42–59** — Core systems and first content wave: BUILD 3 (chronic illness + parent care), BUILD 4 (relationship UI, political leaning), BUILD 6 (historical names, curated birth screen, early life events), BUILD 20 (labor arc), BUILD 27 (generational flags), BUILD 29 (voting), BUILD 32 (neighborhoods), BUILD 35 (informal economy), BUILD 44 (body in later life), BUILD 48 (post-release), BUILD 50 (money events), BUILD 51 (pregnancy), BUILD 52 (elder arc). Geographic: Latin America (60+ events), Vietnam, Zimbabwe, DRC (partial), Asia arcs (Cambodia/Bangladesh/Pakistan), Caribbean, crosscutting arcs (domestic worker/bombardment/refugee camp). Life arcs: events_adolescence_2.js (22), events_childhood_texture.js (19), events_family_silence.js (20), events_poverty.js (43), events_career_arcs.js (19), events_social_media.js (9), events_scandinavia.js (8), events_palestine.js (8), events_gang.js (10), events_solo_life.js (8), events_dying_arc.js (6), events_pregnancy.js (13), events_menopause.js (5). Systems: save/load, desire-weighted events, buildYearTexture expansion, dynamic wealthTier, activity pipeline. events_followthrough.js through events_followthrough_3.js.

**PRs #60–72** — Life arcs and geographic sprint: BUILD 23 (stayed behind), BUILD 25 (documents/identity), BUILD 36 (adoptee), BUILD 38 (children abroad), BUILD 39 (sport), BUILD 40 (arts under pressure), BUILD 41 (multilingualism), BUILD 45 (intimacy arc), BUILD 46 (school as institution), BUILD 47 (mentor arc), BUILD 21 (industrial disasters). Systems: partner trait system, TIMESTAMPED_FLAGS memory layer, currentProject arc. events_activity_choice.js (16), events_project_arc.js (7). Geographic: Lebanon (14), Philippines OFW (15), Algeria (13), Indonesia (10), Kurdish (12), Haiti (10), Sri Lanka (8), Morocco (8), Rohingya (8), Uyghur (3), Senegal (5), Tanzania (7), Puerto Rico (2). BUILD 17 partial: events_clergy.js (11), events_soldier_arc.js (12). BUILD 25: events_documents.js (8). FLAG_REGISTRY + check-flags tooling. events_followthrough_4.js through events_followthrough_10.js.

**PRs #73–92** — Massive geographic expansion: 38+ new country arc modules covering USA (12), UK (7), Germany/France (9), Australia (8), Italy (8), Canada (8), Poland (7), Japan (12), Brazil (9), Russia (4), Ukraine (7), Romania (5), South Africa (4), Hungary/Czech (9), Baltic (6), Taiwan/Malaysia (9), Georgia (10), Armenia/Azerbaijan (15), Belarus (8), North Korea (9), Uruguay/Paraguay/Ecuador (13), Cuba (8), Namibia (8), Laos (7), Singapore (8), Netherlands (8), Bangladesh (9), Iraq (8), Rwanda (8), Colombia (9), Venezuela (8), Peru (8), Saudi Arabia (9), Iran (7), Egypt (7), Ethiopia (7), India (7+11 depth), Kenya (7), Korea (14), Pakistan (9), Southeast Europe (9), West Africa (16), Uganda (7), Somalia (7), Thailand (6), Myanmar (7), Nepal (6), Jordan (6), Angola (6), Libya (6), Afghanistan (6), Sudan (6), Tunisia (6), Zambia (6), Mozambique (6), Yemen (6), China (26). Life arcs: events_gifted.js × 3 (69+ events), events_disability.js (18), events_addiction.js (14), events_dementia.js (9), events_divorce.js (11), events_celebrity.js (7), events_child_soldier.js (9), events_teacher_arc.js (9), events_wwi_depression.js (10), events_wound_coping.js (8), events_condition_arc.js (8), events_life_skeleton.js (4), events_phase_entries.js (3), events_partner_wants.js (8), events_relationship_crossover.js (8). Systems: buildYearTexture 250+ fragments, leaningWeight, legacy field. events_desire_resolution.js (8). events_followthrough_11.js through events_followthrough_22.js. MODE C: events_2010s.js, events_syria.js, events_child_death_arc.js, events_israel.js, events_pandemic.js. *Reached: 98 countries, 223 world events, 218+ modules, ~4,200+ events, 1,232 flags, 311 ribbons.*

**PRs #93–109** — Sonder depth, specific lives, and geographic sprint: BUILD 9 complete (events_sick_child.js 9 events). BUILD 22 complete (events_fgm.js 5 events). BUILD 24 complete (events_cults.js 10 events). BUILD 30 complete (events_local.js 12 events). BUILD 33 complete (events_sex_work.js 10 events). BUILD 37 complete (events_bonded_labor.js 9 events). MODE C sonder: events_sonder.js (299 events), events_sonder_2.js through events_sonder_12.js (10 additional modules, ~394 events). Soundtrack layer (50 markers). Legacy field (0–100, epitaph branching). Geographic content: events_burkina.js (8), events_ivory_coast.js (7), events_cameroon.js (7), events_mali.js (10), events_mongolia.js (12), events_eritrea.js (12), events_guinea.js (13), events_nomadic.js (8), events_nigeria.js depth (8), events_bolivia.js (9), events_water_infra.js (6), events_ofw.js extension, events_aid_worker.js (13), events_bedouin.js (5), events_fgm.js (5), events_turkey.js depth (5), events_vietnam.js (10), events_ghana.js (10), events_ecuador.js (8), events_el_salvador.js, events_guatemala.js, events_honduras.js, events_nicaragua.js, events_dominican_republic.js (9). Depth modules: events_scandinavia_depth.js (6), events_ireland_depth.js (10), events_denmark.js (7), events_sweden.js (7), events_norway.js (8), events_czech_republic.js (8), events_uzbekistan.js (10), events_kazakhstan.js (10), events_kyrgyzstan.js (10), events_tajikistan.js (10), events_turkmenistan.js (10), events_greece_depth.js (9), events_cambodia.js (8 — BUILD 11 Cambodia complete). Specific lives: events_specific_lives.js (221 micro-specific events). PR #105 refactor: events directory → thematic/, lifecycle/, geographic/, sonder/, specific_lives/, followthrough/. FLAG_REGISTRY split into 6 files. events_followthrough_all.js (317 consolidated). events_followthrough_30.js through events_followthrough_48.js (19 files, ~236 events). **Current: 109 countries, 255 world events, 275 modules, ~5,800+ events, 2051 flags, 321 ribbons.**

**PR #110+** — All remaining roadmap builds completed: BUILD 5 (events_era_gaps.js: Bengal Famine 1943 child+adult, Buenos Aires WWII neutrality, post-independence disillusionment). BUILD 11 DRC depth (drc_zaire_teacher, drc_bukavu_1998 added to events_drc.js). BUILD 12 (events_teacher_power.js: 7-event teacher-in-poor-country arc + 5-event child-of-power arc). BUILD 15 remaining (events_disease_arcs.js: cholera 19th–20th century arc, TB post-Soviet arc, 1997 Asian crisis personal texture). BUILD 16 (events_south_south.js: Bangladeshis in Malaysia, Zimbabweans in South Africa + xenophobia 2008, Ghanaians in Libya + 2011 evacuation, Soviet gulag late-Stalin era, apartheid pass-law arrest). BUILD 17 interpreter arc (events_interpreter_arc.js: 7-event arc — colonial translator, tribunal interpreter, military interpreter, danger after withdrawal). BUILD 19 ✅ (Sami + Amazon arcs — already in events_indigenous.js). BUILD 21 ✅ (Aral Sea — already in events_central_asia.js). BUILD 26 ✅ (NZ nuclear-free — already in events_new_zealand.js). BUILD 31 ✅ (hidden second child — already in events_china.js). BUILD 34 (events_palestine_depth.js: 5-event multigenerational camp arc — third-generation key, UNRWA school, camp-as-city, resettlement rupture, late return). BUILD 42 ✅ (Cochabamba — already in worldEvents.js as we_cochabamba_water_war_2000). BUILD 49 (events_followthrough_49.js: aid convoy + received-aid echo). BUILD 53 ✅ (Mexico City 1985 + Nepal 2015 — already in worldEvents.js). Aid worker depth ✅ (local vs international evacuation, funding cut — already in events_aid_worker.js). **Current: 109 countries, 255 world events, 285+ modules, ~5,960+ events, 2075 flags, 321 ribbons.**

---

### What Still Needs Work — Priority Roadmap

*Consider which mode provides the most return given recent work before choosing the next BUILD.*

---

#### BUILD 54 — Flag Audit (ongoing)

Run `npm run check-flags -- --orphans` before and after every new module. Flags that still have incomplete follow-through coverage and should be addressed when their module is touched:

- `lgbtq_had_relationship` — relationship texture event in adulthood
- `had_abortion` — follow-through in future pregnancy or partner contexts
- `war_childhood` — adult PTSD-adjacent event (partially covered by conflict events)
- `refugee_status` (pure, not combined with `emigrated`) — needs resettlement anniversary event

When shipping any new event module: write follow-through events first, then work backward to the triggering event. An event with no downstream consequence disappears from the life the moment it resolves.

---

### MECHANICAL IDEAS (no build number — evaluate when relevant)

*Systemic additions worth considering alongside content builds.*

**✅ Implemented:**
- **The dream/memory** (`events_memory_layer.js`, 13 events): age-45–65 prose replays of timestamped flags — father's hands, mother's voice, the emigration smell, widowed anniversary. Single-fire, weight 2, no choices.
- **Weather as texture**: `season` field added to `buildG()` (deterministic per character+year, hemisphere-aware, tropical = dry/wet). Seasonal fragments in `buildYearTexture()` for Nigeria/Ghana/Senegal, Bangladesh/India, Russia/Ukraine/Poland, Australia/NZ/SA, Japan/Korea, Norway/Sweden/Finland, Brazil/Colombia.
- **The choice you didn't make** (`events_roads_not_taken.js`, 9 events): life-review at ages 38–68 — workforce vs. degree, stayed vs. emigrated, emigrated vs. stayed, affair not taken, scholarship declined, lost faith revisited, childless late, political disengaged. Gates on existing flags.
- **The `lastMajorEvent` field**: `G.yearsSince('bereavement')` helper in `buildG()`. `p.setLastMajorEvent(cat)` proxy shorthand. Auto-set from `killParent()`/`killPartner()`. Miscarriage and child-loss events guard on `yearsSince('bereavement') >= 2`.

**Still to evaluate:**
- **The generational save**: On death, play the character's child, inheriting specific flags (not stats). Multi-generational gameplay without requiring it. High complexity — evaluate when core content is exhausted.

- **The oral tradition register**: For characters in pre-literate or low-literacy contexts, events framed as told rather than witnessed. "Your grandmother tells you about the year the rains didn't come." A distinct prose register.

- **Letters as a UI element** (`events_letters.js`, 8 events, `isLetter: true`): Pre-2000 sibling-abroad, parent-to-emigrated-child, old friend, official ominous, OFW parent, long-distance love, gulag censor letter, childbirth announcement. Amber treatment in LifeScreen.jsx for both recent and decades views. ✅
- **Seasonal event modifiers** (`events_seasonal.js`, 11 events): Good/bad harvest, monsoon joy/flood, harmattan health, post-Soviet winter heating cut, Nordic winter dark, cherry blossom, Australian fire summer, Ramadan texture. All gate on `G.season`. ✅

- **Time-of-life activity unlocks**: Activities unlock and lock dynamically based on conditions, career status, relationships — not just age ranges. A character with severe arthritis cannot take up rock climbing at 60. A retired character has time for things they never could.

---

### MICRO-EVENT DESIGN PRINCIPLE

*Applies to all new events going forward.*

The game's best events are not about big things but about one specific object or moment inside a big thing:

- **The thing you ate**: During a famine, name the specific food — not "there was not enough" but "your mother boiled nettles." The object carries the event.
- **The moment of receipt**: For enormous historical events, the event as the character received it — where they were, what they were doing, who spoke first. Not "the revolution happened" but "you heard it from the neighbour who had a radio."
- **The border crossing**: Not "you emigrated" but the physical moment — the fluorescent light, the desk, the question "purpose of travel," the specific object removed from your bag and held up.
- **The compromise sentence**: Under authoritarian regimes, the specific words spoken in complicity — in a meeting, at a checkpoint, to a colleague — and the pause before them. The moral weight lives in the pause.
- **The oral report**: In pre-literate contexts, frame events as received speech rather than witnessed experience. Not "you read about it" but "your uncle came back from the market and said."
- **The gap in the record**: For events documented only from outside (Holodomor, Great Leap famine), the character's knowledge should be partial and named as such — as narrative technique, not disclaimer. "No one uses the word yet. It doesn't have one."
- **The follow-through sentence**: Every event that changes a flag must have at least one future event that references it. Write the follow-through first, then work backward to the trigger.
- **The thing not unpacked**: In migration events, the object packed and never unpacked. The box in the corner of the new apartment, still sealed three years later. What's inside is not said.

**Historical accuracy standard**: The game's fiction should be seamless — no disclaimers inline. Accuracy is a design constraint, not a label. If an event isn't accurate enough to ship without a disclaimer, it isn't accurate enough to ship.

**The Immersion Principle applies to every new event**: Time-accurate, place-accurate, perspective-accurate, consequential. A 2060 climate event should feel as specific and grounded as a 1973 oil shock event.

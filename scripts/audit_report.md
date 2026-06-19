# natalis Audit Report
*23 automated playthroughs. 15 curated (country/birth-year/gender) + 8 random. Run 2026-06-19.*

---

## Executive Summary

natalis has a distinctive prose voice that is genuinely literary in its best moments. The sonder ambition is legible and occasionally achieved. But the game is currently broken in ways that prevent most lives from completing, and is carrying a severe content-repetition problem that undermines the illusion of a lived life. The combination of soft-lock bugs, the `pick is not defined` crash, and a handful of specific event loops means a player willing to endure the current state would finish most lives feeling they'd read the same sentences ten times. These are all fixable. The bones are good.

---

## Bug Report

### Bug 1: `pick is not defined` — CRITICAL, CONFIRMED

**Affects:** USA-1955-M (104 pageerrors), Germany-1955-M (112), Philippines-1980-F (108), Random-4/El Salvador-1988 (96), Random-6/South Africa-1978 (36), Random-3/UK-1953 (26), Random-2/Bolivia-1981 (12), Cambodia-1965-M (2), Ukraine-1985-M (2), South Africa-1960-M (4).

**Root cause:** `src/engine/gameEngine.js`, function `tickPartner` (starts at line 13223). Lines 14068 and 14077 both call `pick(arr)`, but `pick` is only defined locally inside `buildYearTexture()` (line 1308), `generateEpitaph()` (line 12229), and `gameStore.js` (line 1033). The `tickPartner` function has no access to any of these definitions. The error fires every year a player has a partner with traits whose `years` count reaches 3 (initial generation) or hits a multiple of 7 (refresh).

**Effect:** Every age-up after getting a partner in an affected life throws an uncaught JS exception. Year texture continues to generate but the partner-moments system silently fails. Does not crash the game but produces hundreds of console pageerrors that indicate a meaningful system — partner trait prose — is entirely non-functional.

**Fix:** Replace `pick(lines)` and `pick(TRAIT_PROSE[trait])` at lines 14068 and 14077 with `pickFrom(lines)` and `pickFrom(TRAIT_PROSE[trait])` — `pickFrom` is already imported from `random.js` in the engine and is accessible in the `tickPartner` scope.

---

### Bug 2: Soft-lock on early childhood events — HIGH, WIDESPREAD

**Affects:** Nigeria-1965-M (9 age-ups, last age 8), Nigeria-1965-F (7 age-ups, last age 6), China-1952-F (11 age-ups, last age 10), Cambodia-1965-M (11 age-ups, last age 9), Iran-1970-F (1 age-up, last age 0), Russia-1980-M (1 age-up, last age 0), El Salvador-1963-F (1 age-up), Uzbek SSR-1952-M (4 age-ups).

**Symptom:** The Age Up button disappears and no non-standard buttons appear. The audit script's stuckCount mechanism triggers after 10 attempts and terminates the run. The outcome is recorded as `soft_locked`.

**Pattern:** The three cases that terminated immediately (Iran, Russia, El Salvador) or near-immediately (Uzbek SSR) stopped at age 0–3. Three of these are post-Soviet or politically complex origins where a pending event likely generated choice text that matches the audit script's standard-button exclusion list — but the audit script is designed to be permissive, so the more likely cause is a pending event whose buttons render with text that falls below the 3-character filter or gets filtered by the `startsWith('←')` / `startsWith('↑')` guards.

**However:** The Nigeria, China, and Cambodia soft-locks all occur at realistic ages (6–10) in mid-childhood. This strongly suggests an event that presents choices but whose buttons are being rendered differently than expected — possibly an event that fires as auto-resolve but is presented with a choice wrapper that has no visible buttons, or a UI state where a pending event's card is present but its choices are behind a scroll that the script can't see.

**What to investigate:** Any event in `events_early_childhood.js`, `events_childhood_texture.js`, or `events_early_life.js` that fires at ages 8–10 with `when` conditions matching Nigeria/subsaharan/developing_unstable. Also examine whether any event that fires an auto-resolve can leave the UI in a state where the Age Up button is missing before the auto-resolve fully processes.

---

### Bug 3: Duplicate Mongolia React key — LOW, COSMETIC

**Affects:** Every curated life (all 15 flagged it in console errors).

**Error:** `Warning: Encountered two children with the same key, 'Mongolia'` in `CuratedBirthScreen.jsx` at line 43. Mongolia appears twice in the country list array. Cosmetic but produces a warning on every playthrough and could cause rendering issues when Mongolia is selected.

**Fix:** Remove the duplicate Mongolia entry from the countries array in `CuratedBirthScreen.jsx`.

---

### Bug 4: Lives that terminate immediately with no content — MEDIUM

Iran-1970-F, Russia-1980-M, and El Salvador-1963-F each produced exactly 1 log entry (the birth announcement) and then soft-locked. These are either immediate pending events with unresolvable choices, or the birth announcement itself triggers an event that the game engine processes before the first age-up but that leaves the UI in a locked state.

Birth text for Iran-1970-F: *"Iran, 1970. The country is in motion — politically, economically, always. You arrive into difficult circumstances from the first day."* — This is the "difficult circumstances" birth variant. If an event fires immediately on game start for high-conflict births, it may be locking before the UI stabilises.

---

## Genuine Strengths

### 1. The China-1952-M life is the strongest argument for the game

101 log entries across 70 age-ups. The arc tracks coherently from Cultural Revolution childhood through Deng-era reforms to late life. Specific highlights:

- *"Your grandparent cannot watch anyone leave food on a plate. It is not a rule that is stated — it is something in their face when food is wasted, something that goes past disapproval into a place you don't have the vocabulary for yet. You ask about it once. They say: 'You don't know what we went through.' They say it quietly, to no one in particular. They never say more."* — This is the game at its best. The great famine is conveyed through a behavioral tic rather than a headline. The mechanism of intergenerational silence is shown, not narrated.

- *"The Red Guards arrive at the school. The teachers are made to stand in front of the students. The books are burned in the courtyard — which ones, exactly, depends on who is in charge of the bonfire. You learn to say the right things in the right order. What you actually think is kept entirely separate and never written down."* — Historically specific, morally uncomfortable, told from exactly the right perspective.

- *"The criticism session happens in the school courtyard. A classmate whose father… — You add your voice to what everyone is saying. The calculation is correct. The calculation does not dissolve."* — The truncated beginning is a data-capture issue, not a prose issue. The ending is excellent: the player participated in something wrong, the justification was rational, and neither of those things makes it go away.

- *"One television channel. Every night it shows the same things: the leader visiting a factory, sports victories, news that is confident and untroubled. The gap between what it says and what your family talks about at the table is something you learn to manage very young."* — Nails the specific texture of living under state media.

### 2. South Africa-1960-M shows the system working at scale (122 entries)

The apartheid pass book appears twice at age 16 with complementary prose — one is the lived experience, one is the documentary note. Mandela's election at age 34 is earned by the whole preceding arc. The character queues for 7 hours to vote. The life feels continuous.

*"April 27, 1994. You queue to vote for the first time. The line stretches for miles… — Seven hours in the heat. You cast your vote. Y…"* — The bureaucratic specificity (7 hours, the heat) lifts this above ceremony.

*"Your fridge is full. Has been full for years. You still buy more than you need on Friday evenings, still check the expiry dates on things that aren't going to expire. You know where this comes from. You have stopped apologizing for it."* — The poverty-body memory, felt rather than explained. One of the best individual lines in any log.

### 3. Nigeria-1965 birth text has strong geographic specificity

*"The go-slow on the bridge: the danfo at a standstill, the hawkers moving between vehicles."* (age 1)

*"Lagos is building itself faster than it can be planned. Cranes on every skyline. Roads half-finished. Imported cars in gridlock that didn't exist two years ago. A relative gets a government contract and buys a new car. The phrase 'petrodollar' is new but everyone is using it. Whether the money reaches you or not depends entirely on who you know."* — The oil boom rendered through a family's asymmetric access. This is place-accurate writing.

*"The war ended with Gowon's phrase: 'No victor, no vanquished.' You are old enough to understand that this is a political sentence, not a description. The Igbo civil servants who left their Lagos posts to return to Biafra discover their positions have been filled. Old colleagues nod in corridors. The war that ended officially has not ended everywhere."* — Historically sophisticated.

### 4. The contemplative observation layer is working

Several entries achieve the "glimpse of other lives" goal set in the design doc:

*"A person outside a courthouse, alone, standing very still. Not upset, or past upset. Whatever was decided inside is now a fact and the fact is new and they have not yet integrated it into their understanding of how things are. They are standing with the new fact before they carry it anywhere."*

*"A woman on the platform is crying in the particular way of someone who hoped they could stop by now. She watches the arrivals board."*

*"In the park, an elderly man reads on the same bench at the same hour on the same day every week. You have passed him so many times that the absence of him — on the day he is not there — is the thing that makes you notice him most."*

These are working as designed. They are brief, they require no response, they are about the accidental glimpse. The South Africa life had several of these in sequence and they created the texture of a life that extends beyond its own borders.

### 5. Ukraine-1985 birth and early childhood is exceptional

*"Soviet Ukraine, 1985. The maternity ward smells of disinfectant. Your mother was not allowed to have your father in the room."*

*"At night, adults start moving. Something is burning but it is not the kind of burning you can see. Your parents pack a bag and tell you…"* — The Chernobyl reference handled entirely through a child's experience of adult fear.

*"Your family shares a kitchen and bathroom with two other families. The schedule for the stove is taped to the wall. Neighbours argue about the schedule on Saturdays."* — Kommunalka texture without using the word.

*"The wall comes down. The world you were told was fixed — the two sides, the permanent standoff — is not fixed. People are walking through it."*

*"The Soviet Union dissolves. Prices double, then double again, within weeks. The salary you were paid last month is no longer what it buys."* — Both events at age 6 for a 1985 birth. Historically correct.

---

## Content and System Weaknesses

### 1. Career default heavily skewed to healthcare + electrician

Across 23 lives, the career distribution was:
- Healthcare (university): China-M, USA-M, USA-F, and several others
- Electrician (trade school): South Africa, India, El Salvador, Brazil, and several others

The career selection appears to use a near-universal default that sends characters without specific circumstances into healthcare or electrician training. In a life simulation that asks "what would it actually have been like to be this person," an Indian woman in 1975 becoming an electrician and an El Salvadoran woman in 1988 becoming an electrician within the same identical career arc — identical log entries including "Which trade will you train in?… — In-demand work. Good pay." — collapses the geographic specificity the rest of the system works hard to achieve.

The career entry events (`What will you study at university?… — Demanding, long hours, significant reward.`) are also generic in a way that produces a jarring break from the surrounding prose register. The rest of the log is literary. The career prompt reads like a tooltip.

### 2. The OPEC embargo fires in Cambodia, Nigeria, and elsewhere identically

The same world event text appears verbatim across multiple lives that would have experienced it very differently:

*"OPEC announces an oil embargo. The price of oil quadruples in weeks. Petrol queues stretch around blocks. In some countries the government introduces odd-even rationing."*

For a US life, petrol queues and odd-even rationing are the personal experience. For a Cambodian child in 1973 under the Khmer Rouge's shadow, the oil embargo lands in a completely different material reality — the country barely has a petroleum economy, but food prices still follow. For a Nigerian character, this event is paradoxically positive, since Nigeria is an OPEC member benefiting from the embargo while simultaneously experiencing domestic rationing. None of these distinctions are made.

The same text fires in Nigeria-1965-M, Cambodia-1965-M, USA-1955-M, South Africa-1960-M, and at least two random lives. The design principle of specificity over coverage requires these to be branched or replaced with country-aware alternatives.

### 3. Repetition across lives is severe at the structural level

The 20 most-repeated log fragments, cross-life:
- "The early years end. You begin to know where you are." — 19 lives
- "You are eighteen. The scaffolding of childhood…" — 15 lives
- "You are thirty. The life you have been building…" — 14 lives
- "The body is changing. The world is starting to require something from you." — 11 lives
- "You are eighteen. The life begins in earnest." — 11 lives
- University year 1/2/3 of 4 (healthcare) — 9 lives each
- "OPEC announces an oil embargo…" — 8 lives
- "A day when the rain makes the decision for you…" — 8 lives
- "In the morning, two planes hit the towers…" — 8 lives

The phase-transition markers (early years end, you are eighteen, you are thirty) functioning as chapter headings is intentional and works. But their current implementation produces identical text across every life regardless of country, regime, or gender. A Nigerian girl in 1965 and a male Soviet Ukrainian in 1985 experience the transition to adolescence through the exact same sentence. This is a missed opportunity at a moment the game already has the machinery to personalise.

The 9/11 entry appears in 8 lives and is exactly the same in each. By the eighth life in this audit alone, it has lost all weight.

### 4. The two-year log entries are a tell

Many entries appear at age 1 or 2 that are clearly adult-voiced observations:

- "The go-slow on the bridge: the danfo at a standstill, the hawkers moving between vehicles." (Nigeria, age 1)
- "Code-switching is not thinking about switching. It is switching without thinking." (Nigeria-F, age 6)
- "The restaurant was chosen before the price was considered. This continues to be a privilege." (China, age 4)

Some of these belong in the life but are clearly being generated for the wrong year — placed too early because the pool they're drawn from doesn't have a minimum-age guard. The contemplative observation layer works for adult characters. A 4-year-old China character reflecting on the privilege of restaurant choice is a category error.

### 5. El Salvador-1988-F migrates to Europe by age 27 in an inflatable boat

*"You are among hundreds of thousands crossing the Mediterranean in an inflatable boat. The crossing takes hours. Some boats sink."*

This fired for an El Salvadoran character. The Mediterranean crossing event is presumably meant for Syrian, North African, or Sub-Saharan characters. El Salvador's emigration destination is the US via land, not Europe via sea. This is a geography error in the event's `when` guard — either the `currentCountry` flag is being set to a country with Mediterranean crossing available, or the emigration event isn't checking the origin country's geography.

### 6. Azerbaijan SSR-1928 life runs only to age 25 before soft-locking

A character born in 1928 in the Soviet Union who reaches 1953 (Stalin's death year) and then stops at age 25 is failing to reach the most historically significant events of their life (Khrushchev thaw, de-Stalinisation, late Soviet period). The post-Soviet arc events and the Soviet-era texture should continue well into midlife and late life for this character, but the life terminates at a phase when it was just becoming historically interesting.

---

## Geographic and Era Coverage Gaps

### Soft-locks make coverage impossible to measure for several regions

Iran-1970-F, Russia-1980-M, El Salvador-1963-F terminated immediately. If these regions' content exists but is locked behind broken event chains, the coverage data is misleading. The 0-entry lives tell us nothing about whether Iranian or Russian content was written — only that something before age 1 is broken.

### China-1952-M is the best-performing life in the entire dataset

This is an accident of which lives soft-locked, not a design choice. China has excellent coverage partly because the bugs that affect other regions (partner `pick` error, early childhood locks) happened not to trigger in this run. The data doesn't show that China is better covered than Nigeria — it shows that Nigeria ran into a soft-lock at age 8 that China happened to avoid.

### India-1975-F: good early childhood, unexplained termination at age 24

Strong early childhood content — the haat market, the reservation system, Diwali, the Bhopal disaster — but the life stops at exactly the point a 1975-born Indian woman's life becomes historically most interesting (1999–2000: the Kargil War, India-Pakistan nuclear tests; 2001: the Gujarat earthquake; 2002: riots; 2016: demonetisation was in range). The soft-lock at 24 is in the young-adult phase, likely related to a pending event at the relationship-formation stage that couldn't be resolved.

### Cambodia has almost nothing from the Khmer Rouge period

Cambodia-1965-M ran to age 9 (i.e., to 1974 — just before the Khmer Rouge takeover in April 1975). The audit couldn't verify whether the Khmer Rouge events in `events_cambodia.js` and `events_asia_arcs.js` actually fire, because the life soft-locked before the character reached age 10 (1975). The source tree lists 8 events for Cambodia including "family taken for re-education (killParent)" and "post-liberation Phnom Penh return" — but this audit cannot confirm any of them fire.

### The quiet year pool is not quiet enough in some lives

The Ukraine-1985 life at age 33 gets: *"The children who went to the city: you know which households have had a child go. The going is the village's long-term project."* — correct for Ukraine. Then age 33 again: *"The nearest hospital is hours away or the local clinic is understaffed."* — also plausible. But then age 34: *"Tetiana Boychuk calls on a Tuesday evening…"* — a named friend event. This is three distinct year-texture items in what should be a two-year stretch. The density is good; the concern is whether the quiet year pool is drawing from too many sub-pools at once.

---

## Tone and Prose Failures

### 1. The gamey event resolution display hasn't been reconciled with the literary prose

Log entries that result from events read like this:

*"You graduate from high school. GPA: 2.76. The world is waiting — what comes next… — You earn a partial scholarship and enroll in university."*

*"University — year 1 of 4 (healthcare)."*

*"🔧 You complete your electrician certification."*

These sit in the same log stream as *"Something in their face when food is wasted, something that goes past disapproval into a place you don't have the vocabulary for yet."* The contrast is jarring. The GPA display, the emoji, and the career-year tracker are explicitly gamey framing that the design doc says the game should resist. They announce system state rather than experience.

The design doc says: *"No 'You gain +5 Happiness!' framing."* The GPA-in-a-log-entry is structurally the same move.

### 2. Phase transition text is identical across all lives and ages

Every character across every country gets exactly: *"You are eighteen. The life begins in earnest."* followed by *"You are eighteen. The scaffolding of childhood has been removed. The life ahead… — [choice outcome]."*

Both fire at 18. Both say "You are eighteen" despite the character being 18. The duplication is a bug — they should not both fire in the same year. But beyond the duplication, the text itself is generic. A 1965 Nigerian girl turning 18 in 1983 and a 1985 Ukrainian boy turning 18 in 2003 are entering adulthood in radically different historical contexts. The game has the data to differentiate this. It doesn't use it here.

### 3. Some quiet year entries are too abstract to ground a life

*"You went somewhere and came back and the somewhere and the coming back were both ordinary."*

*"You made a decision this year you will not fully understand the consequences of for five years."*

*"Nothing about the day required naming. The day did not mind."*

These are beautifully written as standalone sentences. In a log where the preceding entries name the standpipe schedule, the danfo driver, the oil embargo's effect on a specific kitchen — these abstract entries register as padding. The three-layer principle (universal texture + place-era texture + life-phase texture) is not being applied equally: the universal-texture pool is firing when place-era texture should be doing the work.

### 4. The "the clinic is busy" medical event fires too many times

In the South Africa-1960-M life: at ages 53 and 59, both logging: *"The clinic is busy. You wait two hours. The doctor is straightforward."* The event has a `setMem` guard? Apparently not, or the guard isn't working. An event that should occur once in a life is occurring twice. Similarly, the "3am wake" entry fires at 34 and 36 in China-M.

---

## Alignment with Dual Mandate (Fun + Education)

**Education: Partial**

The historical layer is genuinely educational when it fires correctly. The Biafra blockade, the Great Leap Forward silence, the apartheid pass book, the fall of the Soviet Union experienced through childhood — these achieve the game's stated goal of making a player understand what a specific life was like.

The failure mode is: the same historical event (OPEC, 9/11, the internet) fires with identical text in wildly different geographic and social contexts. The educational specificity breaks down precisely at the moments where generic world events displace place-specific content.

**Fun: Broken by bugs**

Nine of 23 lives soft-locked before the character reached adulthood. Three lives produced only one log entry. Four lives (USA-M, Germany-M, Philippines-F, El Salvador-F) produced hundreds of JS pageerrors on every age-up. The bug load means a real player today would routinely encounter unplayable lives or lives they can't navigate past a specific age.

**Sonder: Achieved in flashes, not yet systematically**

The South Africa life with 122 entries comes closest to the sustained sonder the game is designed to produce. The China-1952-M life at 101 entries is second. These are lives where no bug interrupted the arc, enough content exists for the era, and the historical events are specific enough to carry weight.

The lives that matter most — Iran-1970-F, Cambodia-1965-M (under Khmer Rouge), Russia-1980-M, the post-Soviet lives — are the ones most likely to produce sonder because their historical specificity is hardest to find anywhere else. They are also the lives most broken by current bugs. The content investment in those regions hasn't yet translated to playable outcomes.

---

## Priority Fixes (Ordered by Impact)

1. **Fix `pick` → `pickFrom` in `tickPartner`** (lines 14068 and 14077 in `gameEngine.js`). Eliminates hundreds of pageerrors per life and restores the partner trait prose system. 30-minute fix.

2. **Identify and fix the soft-lock cause in Nigeria/China/Cambodia/Iran/Russia early childhood.** This likely involves an event that fires a pending event with choice buttons that don't resolve, or a UI state problem with the pending event display at ages 0–10. Investigating `events_early_childhood.js`, `events_early_life.js`, and the pending event UI rendering in `LifeScreen.jsx` for any event without valid choice text.

3. **Remove duplicate Mongolia key** in `CuratedBirthScreen.jsx`. One-line fix.

4. **Add `setMem` guards to the "clinic" and "3am wake" events** to prevent them firing more than once per life. Check any event without a `setMem` guard that describes a specific one-off experience.

5. **Branch the OPEC, 9/11, and internet world events** by archetype and country to produce different text for different material contexts. Or at minimum, add a `setMem` guard so they fire once rather than multiple times across the same life.

6. **Fix the career entry prose** to match the game's literary register. "University — year 1 of 4 (healthcare)." should be replaced with something that places the character in the institution. The GPA display and emoji certifications should be moved out of the prose log or rewritten as prose.

7. **Add age minimums to the adult-voiced observation pool.** Entries like "The restaurant was chosen before the price was considered. This continues to be a privilege." should not fire before age 15 at minimum.

8. **Fix the Mediterranean crossing event** to check that the character's origin country is geographically proximate to the Mediterranean route. El Salvador should not be triggering this event.

---

## What the Game Does Well That Shouldn't Change

The approach of generating events from a weighted pool rather than a scripted sequence is correct — it produces variation and surprise. The contemplative observation layer (the person at the courthouse, the nurse leaving the hospital) is achieving its purpose and should be expanded, not reduced. The decision to gate historical events on year ranges rather than scripting them means a life can contain surprising historical texture without the developer having pre-planned it. The China and South Africa lives demonstrate that when the system works, it works at a level that most games in this genre don't approach.

The Sonder Principle is not aspirational fluff — it is the correct design target, and the best sentences in these logs were produced by following it. The audit confirms the architecture is sound. The blocking issues are bugs and content-calibration problems, not architectural failures.

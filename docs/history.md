# How natalis got here

The pass-by-pass record moved out of CLAUDE.md: what each audit, beta pass and
playthrough found, the measurements before and after, and the lesson it left.
The lessons themselves are summarised in CLAUDE.md.

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
- **Closed since:** `classifyEvent` now sees through module-local guard
  helpers (`HOME(G)`, `isKab(G)`) inside any module listed in
  `GEOGRAPHIC_MODULES`, so no geographic event is filed `universal`
  (`tests/eventClassification.test.js`; add every new geographic module to that
  list). The last 21 `unwritten-group` findings are written, in four regional
  modules (`events_unwritten_{americas,west_africa,east_south_africa,
  asia_pacific}.js`, flags in `flags/unwritten_*.js`): 107 events, 40 of them
  follow-through. `unwritten-group` reports **zero**.

### Pass eight: playing it (`scripts/play.mjs`)

Sixty-odd lives driven through the real store the way a player drives them —
Age Up, answer, press the activity and money buttons, emigrate, get arrested —
and read end to end. `node scripts/play.mjs <outdir> '<personas json>'` writes
each life as a text file with every choice offered and taken.

| | before | after |
|---|---|---|
| Syrian born 1985, adult median death age | 32 (war mortality from birth) | 76 (the war starts at 26) |
| Central African Republic 1970, overall median | 10 | 35 |
| Germany/Poland/Belarus 1939-45 mortality | peacetime (static 0.01) | wartime |
| lines stating a year that had not happened yet | ~75 found | 0 in the sweep; `check-anachronisms` now audits it |
| Khmer Rouge events reaching a rural Cambodian aged 15 in 1975 | 0 of 15 | 8-9 of 15 per event |
| the same activity line printed in one life | 33× | pooled, remembered |
| first jobs that were film extra / busker / fast food | ~25% | field-weighted |
| Saudi women drivers before 2018 | possible | not |

**`conflictRisk` was a statement about now, for the fourth time.** One static
figure per country, applied to every year of every life, so Syria in 1995 and
Bosnia in 1980 died at wartime rates and Germany in 1943 at peacetime ones.
`WAR_YEARS` / `conflictRiskAt(country, year)` in `history.js` replace it
everywhere it was read (`G.conflictRisk` in guards), and the ≥35 age bands now
carry war mortality at all. `determineCause` reads the live country, the
character's own diagnoses, and whether malaria was endemic, and no longer
returns a bare "illness" for a Swedish taxi driver of thirty-eight.

**A retrospective written from today must be gated on the last year it names.**
"Stus died in a Soviet camp in 1985" printed in 1963; the 2006 head-tax apology
printed in 1940. `checkFutureYear` in `scripts/lib/anachronism.js` is the audit.

**A phase is a claim about who lived through something.** Every Year Zero event
was `phase: 'childhood'`, so the country's defining four years reached only the
six-to-eleven-year-olds. Events may now declare `claimsYears: { from, to }` to
use the dated-event claim for windows longer than two years; keep it for periods
that were the whole of every life inside them.

Also: a flag- or tag-free `cult_lgbtq_arrested` held a straight Miami teacher
for her orientation; `wipeMoney`/`convertToHardCurrency` subtracted a nominal
figure through the present-day channel (so "lose 30%" in 1950 Lagos took under
one per cent); successful crimes paid nothing but the wealth stat; arranged
matches (`arrangedShare` in `lifeCourse.js`) now exist where most marriages were
arranged; the utility buttons (call a parent, manage the business) remember
what they have said.

Two further instruments came out of the pass, both run from the scratchpad and
worth rebuilding when needed: a **claim checker** that compares each new line
against the state after the year ("your grandchildren" with none, "your father
says" after his death, "the office" with no job) and a **button fuzzer** that
presses every store action at random for sixty lives. The fuzzer found no
crashes. The claim checker found the grandchild class (grandchildren are not
modelled as people — `G.hasGrandchildren` is the `grandparent` flag or a living
child of 25+), parent-alive guards missing on six events, and office and
work-from-home lines reaching retirees (`employed` in `mundaneLayer.js`).

**The Soviet quarter-century had no content at all.** A Russian born in 1915,
played 1929-45 across eleven lives, met eleven world-event lines and no Soviet
event, then "died in conflict" at twenty-nine with nothing to say which. There
is no Second World War world event anywhere in `worldEvents.js` (the list above
that says WWII is covered is wrong; the war lives in country modules, and the
USSR had none). `events_soviet_1929.js` is 20 events and 5 follow-throughs,
1929-1956, for every republic inside the Union that year: the kolkhoz meeting,
dekulakisation, the law of five ears, the Kazakh and Volga famines, the Terror
beyond Russian teenagers, 22 June, the call-up, the evacuation east, occupation,
the blockade, the death notice (which kills the father in the state, not only in
the prose), Tashkent taking in other people's children, 9 May, the deported
peoples (Volga Germans 1941; Chechens and Crimean Tatars 1944, with their
returns in 1957 and 1989), Stalin's funeral, Tbilisi 1956. Measured: 22 June
reaches 13 of 14 Russians of 1915; occupation 10 of 15 Belarusians of 1925; the
Kazakh famine 13 of 15 Kazakhs of 1920; Tbilisi 1956 14 of 17 Georgians of 1930.

**Where you were born is not where you live, for events either.** About 584
guards read `G.character.country` to decide present-tense prose, and 10% of an
emigrant's years abroad carried one: Mexico City traffic in Los Angeles, a NEPA
cut in London, a neighbourhood blasphemy case in Dubai. Rewriting the guards
would be wrong (most are right at home). `homeFits` in `tick.js` asks the guard
itself, at draw time, whether it would still fire for somebody born where the
character lives; if not, it only reaches them when it is written for somebody
who left (`writtenForAbroad` in `classifyEvent`: a guard reading the live
country or requiring an emigration flag, or prose like "back home" or "the
money you send") or is a follow-through (`ft_` ids) echoing what they lived
before leaving. 10.3% of years abroad down to 1.7%, all of it diaspora-shaped,
with events per year unchanged. `tests/claimsAndState.test.js` fails without it.

**Three more gaps closed after the pass.**
- *Gulf-born expatriates were citizens.* Everyone started as `citizen`, so a
  Bangladeshi-Qatari born in Doha became a police officer and owned his house
  outright. `residencyAtBirth` (`migration.js`) puts them on a parent's visa;
  the state, police and army are closed to non-nationals and freehold nearly so;
  the existing `gulf2_the_visa_at_eighteen` arc now reaches 23 of 43.
- *Grandchildren are people now.* Each adult child has `kids` at the local
  fertility rate (`courseGrandchildren`); the first queues `late_grandchild_born`;
  `G.grandchildCount`; the death screen counts them. A Nigerian mother of seven
  born 1945 has 24-39 grandchildren, the first around forty.
- *The war where it was lived.* `events_second_world_war.js`: Poland 1939-45
  (occupation, the secret schools, the ghetto wall, the knock at the door under
  the death penalty, the rising), China 1937-45, the Philippines 1941-45,
  Yugoslavia 1941-45 (including Kragujevac and the Ustaše terror), Indonesia
  1942-49, Korea 1938-45; 25 events, 5 follow-throughs, texture for every flag.
  Nothing about the war had fired for a Pole between 1939 and 1945.
- Also: clergy titles follow the faith and the ladder is closed where the faith
  did not ordain; fame ladders are pyramids above the second rung.

**An age can wait a year; a date cannot.** Every Russian born in 1915 turned
thirty in 1945, and the scheduled "You are thirty" beat took the ninth of May
from all of them. `getNextEvent` now lets an eligible dated event of weight ≥100
in its last year take the year ahead of a deferrable queued beat (phase entries,
life-skeleton beats), which stays queued. Victory Day went from 0 to 11 of 11.

Same class, one layer up: a defining national period written at weight 3 over
an eight-year window reaches almost nobody. The Proceso in Argentina reached 0
of 15 Buenos Aires adults who lived through it; at weight 15, 9 and 5 of 15.

### Pass nine: reading the lives the new modules were written for

The 21 groups closed at the end of pass eight were played — 63 lives, forced to
the group with `createCharacter({ ethnicity })` (`play.mjs` takes `"eth"`) — and
read end to end. The new modules fired well; what the reading found was the
engine and the older corpus misdescribing these characters, about sixty
defects, nearly all of one shape: **a guard reading a category as a fact.**

- `conflict_zone` read as "at war this year" (ceasefires and a refugee camp in
  1969-79 Central African Republic, whose war begins in 1996); `subsaharan` read
  as a cuisine (jollof in Eritrea) and a church (Sunday service for a Sunni
  Afar); `developing_unstable` read as a coup history (a general replaced by a
  general in colonial Papua); archetype read as a grid (three separate
  electrifications of one Visayan village). Each now reads the fact:
  `G.conflictRisk`, the live region, the religion, `COUP_YEARS`,
  `villageElectrificationDue` (`src/data/events/_electrification.js`, one latch
  shared by all four village-electricity events) and `RURAL_TECH_OVERRIDES`.
- New history helpers: `choleraEndemic` (cholera reached West Africa in 1970;
  a Guinean child of 1955 was dying of it), `hasPassengerRail` (sonder trains
  in Djibouti), `adjustmentProgrammeNow` (Algeria "signed in Washington" in
  1984; its programmes were 1989 and 1994).
- **Names by community** (`src/data/groupNames.js`): 91 group and 15 faith pools
  resolved through `nameSourceCountry`, so the character, parents, siblings,
  partner and children agree. Every Muslim Eritrean had been named from a
  Tigrinya Christian pool, an Afar from a Somali one; Papua New Guinea's
  surnames were its prime ministers. `surnameGrammar` carries the -ova rule to
  Russian families born outside Russia and to Central Asia.
- Literacy is written back when schooling succeeds; a secondary graduate had
  been told "the rest of it is a wall".
- Sixteen birthplaces with `homeOf` for groups whose only rural place was the
  wrong one (every rural Lao was born in Vientiane).

**The lesson worth keeping: a module written for a group is only as good as
the thirty thousand lines around it that were written for nobody in
particular.** Content for a group has to be read *inside a life of that group*,
because that is the only place the generic content's assumptions show.

### Pass ten: the touchstone life

The Vision names one character: born in Nigeria in 1962. Eighteen of them
were played across six groups and read. Seventeen were born in Benue, because
Nigeria had one countryside; June 12 1993 fired 0 of 30 times at weight 5;
the Biafran blockade child lost 1969 to the moon landing (a weight-2 one-year
event claimed the year from a weight-999 three-year one); the Sahel drought
went on every death screen in the south; grandchildren, partners and friends
were named from the Yoruba-Igbo country pool in Kano.

- Homelands with `homeOf` for every Nigerian group; `communityPersonName` for
  partners, friends and grandchildren (own pool, then same faith, then country;
  a Muslim woman's husband is Muslim).
- `events_nigeria_north.js` and `events_nigeria_south.js`, 82 events; June 12,
  the Abacha years and the coups are dated; the existing Nigeria modules read
  where the character lives rather than who they are.
- The dated claim yields to an eligible event ten times heavier.
  `guardSpecificity` sees through module helpers and reads `G.place`.
- One harvest per year (`mem.harvestFactor`), treatments that existed where
  the character lived, children before marriage by religion and region, the
  death screen naming the longest work, AIDS arriving by country.

Replayed: June 12 reaches 15 of 24 lives, the Sahel only the north, and 18
of 24 are born in their own group's homeland.

- Full event system descriptions and coverage history: `docs/codebase-state.md`
- Full BUILD-by-BUILD roadmap and MICRO-EVENT DESIGN PRINCIPLE: `docs/roadmap.md`

---


### The wide review (October 2026)

Four parallel reviews (interface in a browser, content, simulation, engineering)
and ten fixes. The ones worth recording:

- **The shipped game could not read its own classification.** `classifyEvent`
  probes guard source text; the production build renames `G` and lowers optional
  chaining, so 0 of 1,784 follow-through events were recognised in the bundle and
  specificity fell from 1,659 to 506. Classification is now a generated index
  (`npm run build-event-index`, checked in CI). The source was right; the
  artefact was not.
- **Nobody's children died.** Children, parents and siblings now die on country
  and year rates with war risk: a Nigerian born 1962 loses 24-28% of their
  children, against 7-10% in the United States. War deaths are a separate hazard
  fitted to recorded tolls (Syria 1.8% against ~2.7%, Cambodia 31% against ~25%),
  and healthcare is read by year (`healthcareAt`).
- **Depression was diagnosed in 69% of Nigerian lives**, by a health system that
  could not have named it. Diagnosis now needs a system that did.
- **Family land ran a rich-world debt.** Upkeep and authored event money are
  local to the live country; Nigerian 50-year-olds owing over twice a salary went
  from 50% to 0%.
- **Divorce did not exist** (US 1950: 1% ever divorced; now 43%), and where it
  was illegal it now separates instead.
- **The world arrived as an American newspaper.** Headlines, soundtrack and
  global world events match the live country, with ~270 regional entries;
  `proseFitsWorld` keeps markets, credit, NGOs and the IMF out of places and
  years that did not have them.
- **The activities panel was a catalogue.** What is offered is what this place
  and year had; every verb costs the year's budget; emigration reads closed
  exits and era entry routes.
- **Style:** `check-prose`. "specific" 1,760 → 498, "particular" 512 → 1, bodies
  over six sentences 19.8% → 10.3%.
- New depth: Iran, Mexico, Brazil and China civilian lives (146 events), early
  childhood by place (149), late life that remembers (57).

// events_sonder_17.js — Contemplative layer, batch 17
//
// 28 quiet-year prose events across: money that isn't money (savings in
// inflation, the envelope in the drawer), the neighbor you never spoke to,
// public libraries, what you were reading when something happened, the
// specific weight of a suitcase, the bus journey, what you stopped
// explaining to people, the specific nothing before falling asleep,
// how you walk in a city you know well, photographs of strangers,
// the specific quality of waiting rooms, and the objects of very old people.
//
// All weight 2, mem-gated, no choices, minimal stat effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_17 = [

  // ── MONEY THAT IS NOT QUITE MONEY ────────────────────────────────────────

  {
    id: 's17_envelope_in_drawer',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s17EnvelopeDrawer,
    text: pick([
      `There is a particular way of keeping money that is neither a bank account nor a wallet: the envelope in the drawer, the cash in the tin behind the rice, the specific small amount kept in reserve against an emergency that is not defined but understood. This practice was inherited from someone who did not trust banks, or lived somewhere the bank could not be trusted, or learned that the envelope was the thing that was still there when other things were not. You keep it now without always knowing why.`,
      `Your grandmother kept money in a place nobody was supposed to know, which everyone knew. The practice was inherited from someone who had learned that visible wealth was taxed in specific ways that invisible wealth was not. The tin. The specific corner of the specific drawer. The knowledge is transmitted without the lesson being named.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17EnvelopeDrawer', true) },
  },

  {
    id: 's17_inflation_savings',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'post_soviet' ||
       G.character.country?.archetype === 'developing_urban' ||
       G.character.country?.archetype === 'developing_unstable' ||
       G.character.country?.archetype === 'subsaharan') &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.s17InflationSavings,
    text: pick([
      `You learned early that saving money was a different project than having money. The account could fill and the value could drain simultaneously. The specific arithmetic of holding currency in a country where currency is unreliable is not theoretical — it is the question of whether the thing you put in the account last year can still buy the thing it could buy last year.`,
      `The inflation of a particular year taught you something about what savings actually are. Not the number in the account — the number changes — but the thing the number can purchase. You adjusted. You learned to hold value in other forms: the thing that can be resold, the dollar account, the gold, the land. The lesson is country-specific and it stays with you.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17InflationSavings', true) },
  },

  // ── THE NEIGHBOR ──────────────────────────────────────────────────────────

  {
    id: 's17_the_neighbor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s17TheNeighbor,
    text: pick([
      `You have lived next to someone for years without knowing much about them beyond the auditory evidence: the schedule, the music at a certain volume, the footstep pattern on a shared floor. Occasionally you have exchanged the necessary sentences — the parking, the package delivered to the wrong address — and those exchanges have been, without either of you intending it, the complete record of the relationship. When they move you notice the absence before you remember that you never knew them.`,
      `The neighbor whose name you do not know has a life. You know this in the abstract and occasionally in the concrete: the argument that came through the wall once, the specific type of cooking that reaches you in the evening, the sense of someone's schedule in the sounds of morning departure. You have been living alongside a life for years and know almost nothing of it. This is ordinary. It is also strange.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17TheNeighbor', true) },
  },

  // ── THE PUBLIC LIBRARY ────────────────────────────────────────────────────

  {
    id: 's17_public_library',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.age >= 8 && G.age <= 18 &&
      G.character.country?.archetype !== 'conflict_zone' &&
      !G.mem?.s17PublicLibrary,
    text: pick([
      `The public library of your childhood had a specific smell — paper, dust, a faint industrial carpet, the specific quiet that is not silence but the sound of multiple people being silent simultaneously. You were allowed to take home seven books at a time, or three, or an unlimited number — this varied — and you took as many as you could carry. The library was the first place that implied you could have whatever you could read, which was a different relationship with abundance than any other institution offered.`,
      `The library was public, which meant it was everyone's, which meant on Saturday mornings it was full of everyone: the retired men reading newspapers they had not paid for, the mothers with small children in the section that had low shelves, the teenagers at computers. You were in the section for your age for a while and then you were in the adult section and the transition was not marked, you simply walked over one day and stayed. Nobody stopped you. This was also a thing the library did.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s17PublicLibrary', true) },
  },

  // ── WHAT YOU WERE READING ─────────────────────────────────────────────────

  {
    id: 's17_reading_when',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s17ReadingWhen,
    text: pick([
      `You can tell you where you were and what you were reading when certain things happened. The two are linked by the accident of simultaneity — the book has nothing to do with the event, but the event interrupted the book, or the book was in your hands when the news arrived, and now the two are associated permanently. Reading and history, personal and large-scale, entangled in memory by coincidence.`,
      `There is a book you cannot finish rereading because you read it first during a specific period of your life and the book now summons that period without asking permission. The book is not about that period. The period is what you were in when you read it. The association is not voluntary but it is permanent.`,
      `You remember what you were reading more reliably than most other things from those years. Not what you were doing — doing is in the category of things that blur — but what you were reading, because reading was the thing you were doing with full attention while other things happened around it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17ReadingWhen', true) },
  },

  // ── THE SUITCASE ──────────────────────────────────────────────────────────

  {
    id: 's17_the_suitcase',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s17TheSuitcase,
    text: pick([
      `Packing a suitcase reveals what you think a life requires when reduced to what you can carry. The first version is always too full; you learn over years to edit it down to what is actually necessary, which turns out to be much less than the first version suggested. The suitcase is a theory of necessity, revised continuously.`,
      `You have left with a suitcase more than once — for a trip, for a move, once for something more final. The weight of a suitcase is not only the contents. It is the weight of what didn't fit, what was left behind, what you decided didn't count as necessary. The decision is always wrong in at least one direction.`,
      `There is a suitcase that was packed in a hurry and another that was packed very carefully with time to spare. The carefully-packed one was for somewhere you were excited to go. The hurried one was for something else. You still know which clothes were in each. Memory holds packing lists.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17TheSuitcase', true) },
  },

  // ── THE BUS ───────────────────────────────────────────────────────────────

  {
    id: 's17_the_bus',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 40 && !G.mem?.s17TheBus,
    text: pick([
      `The bus is a particular social form. Strangers in forced proximity, the etiquette of not acknowledging the proximity, the specific way people distribute themselves when the bus is empty versus when it fills. You have taken buses for years and watched the distribution: the window seats fill first, the aisle seats second, the middle seat last. The middle seat is almost always last. This is universal.`,
      `You spent years of your life on buses — the commute, the journey between cities, the long overnight route that got you somewhere cheaper than the train. The specific quality of time on a bus is different from other kinds of transit time: the landscape is visible, the pace is slow enough to watch it, and you have nothing to do but sit in it. This turns out to be rare.`,
      `The overnight bus. A specific form of travel that exists between departure and arrival with its own rules: you sleep badly in the seat, you arrive at dawn slightly wrong, the city receives you before it is ready for you. Cheaper than the alternative. You have done this more than once.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17TheBus', true) },
  },

  // ── WHAT YOU STOPPED EXPLAINING ──────────────────────────────────────────

  {
    id: 's17_stopped_explaining',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s17StoppedExplaining,
    text: pick([
      `There are things you stopped explaining at some point — your choices, your background, the specific combination of things you are. Not from defeat but from economy: the explanation was longer than the situation warranted, and the listener's understanding, at the end of it, was not meaningfully better than their assumption had been. You let the assumption stand. You kept the thing.`,
      `You used to explain yourself more. The explaining has reduced over the years — not because you are less complex or less interesting in your complexity, but because the context you were explaining to has changed, or you have changed, or the things that required explanation are now simply aspects of a life that requires no justification to be what it is.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s17StoppedExplaining', true) },
  },

  // ── BEFORE SLEEP ──────────────────────────────────────────────────────────

  {
    id: 's17_before_sleep',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s17BeforeSleep,
    text: pick([
      `There is a specific quality of thought that arrives in the twenty minutes before sleep: half-formed, associative, not governed by the rational filters that operate during the day. You cannot reproduce these thoughts in the morning — they are not stored in the same way as waking thoughts — but they have a quality, in the moment, of clarity. They feel like the truth about something. By morning they are gone.`,
      `You review the day before sleep, or you do not. The review — if you do it — happens in a specific way: not linearly, not chronologically, but in the order the day is still warm in. The thing that is still live surfaces first. Then the rest comes or doesn't.`,
      `You fall asleep to something — a sound, a routine, a specific condition of the room — that was established without deciding. The specific condition required for sleep arrived through habit rather than choice. You have been maintaining it so long that changing it would be a disruption.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17BeforeSleep', true) },
  },

  // ── WALKING A KNOWN CITY ──────────────────────────────────────────────────

  {
    id: 's17_known_city_walking',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s17KnownCityWalking,
    text: pick([
      `You walk a city you know so well that you could navigate it in the dark, and because you could navigate it in the dark you are no longer paying attention to it — the navigation is happening without you. The city passes. You arrive. What you saw on the way, specifically, is not available.`,
      `The shortcut that saved four minutes when you were twenty and knew where everything was. The exact place on the route where you shift weight, where you adjust to the kerb, where the ground changes texture underfoot without your looking down. The body has mapped the city more precisely than any app, because the body's map includes the quality of each surface underfoot.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17KnownCityWalking', true) },
  },

  // ── PHOTOGRAPHS OF STRANGERS ──────────────────────────────────────────────

  {
    id: 's17_photograph_stranger',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s17PhotographStranger,
    text: pick([
      `You come across a photograph of someone you do not recognise — in an old album, in a box that belonged to a grandparent, in the lining of something bought secondhand. The photograph is specific: a face, a moment, a light. The person in it is real and their life was full and you will never know anything about it. The photograph is the entire record of this person that you will ever have. You sit with it for a moment.`,
      `The photographs that survive are not the most important moments. They are the moments someone happened to have a camera. The archive of any life is therefore accidentally assembled — what's in it reflects the availability of recording equipment and the memory of pointing it. Most of what happened left no image.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s17PhotographStranger', true) },
  },

  // ── THE WAITING ROOM ──────────────────────────────────────────────────────

  {
    id: 's17_waiting_room',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s17WaitingRoom,
    text: pick([
      `The waiting room is a specific democratic space: everyone here is waiting for something they did not choose to wait for, in a room that was not designed for comfort but for order. The chairs face the same direction. The magazines are three months old. The other people are also sitting with whatever they are sitting with. For the duration of the wait you are temporarily in the same category as everyone else here, which is the category of people who are not where they would rather be.`,
      `You have a specific relationship with the waiting room based on the kind of waiting you have done in them. The hospital waiting room. The government office. The lawyer's anteroom. Each has its own quality of time — the hospital slowest, the government office with a specific texture of bureaucratic suspension. The object you use to wait — the phone, the book, the staring at nothing — has remained roughly the same across all of them.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17WaitingRoom', true) },
  },

  // ── OBJECTS OF VERY OLD PEOPLE ────────────────────────────────────────────

  {
    id: 's17_objects_old_people',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 40 &&
      (G.flags.has('mother_died') || G.flags.has('father_died') || G.flags.has('became_grandparent')) &&
      !G.mem?.s17ObjectsOldPeople,
    text: pick([
      `Going through the objects of someone very old is a specific experience. The objects outlasted the person who chose them and in some cases outlasted the world those objects came from. A kitchen tool for a food that nobody makes anymore. A remedy in a container whose brand no longer exists. A garment whose style ended forty years before the person did. The objects are a cross-section of a life's encounter with time.`,
      `The very old have objects that have survived everything the objects have been through — moves, losses, decades — through a specific combination of durability and attachment. The object that made it this far is not the same as the object that was bought. It has acquired a history of surviving. That history is also part of what you inherit.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s17ObjectsOldPeople', true) },
  },

  // ── THE THING THAT HASN'T CHANGED ────────────────────────────────────────

  {
    id: 's17_thing_unchanged',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s17ThingUnchanged,
    text: pick([
      `Something in you has not changed since you were a child. Not in a stunted way — in a structural way. A specific aesthetic preference. A type of food that has always been the best food. A particular quality of light or landscape that has always produced the same response. Some things are not revised by experience. They were right the first time and have remained right.`,
      `You are, at this age, largely different from who you were at twenty. The opinions are different. The body is different. The priorities are different. And there is also something that is the same — a quality of attention you have always had, or a specific sensitivity, or the way a certain kind of music still does the thing it did when you were fifteen. The same, in the middle of everything that has changed. More yourself than anything you acquired.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s17ThingUnchanged', true) },
  },

  // ── THE COMMUTE PARTNER ───────────────────────────────────────────────────

  {
    id: 's17_commute_partner',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && !G.mem?.s17CommutePartner,
    text: pick([
      `On the commute you see the same people every day without speaking to them. You have reached the level of familiarity where you would notice their absence — a specific face at a specific time is part of the texture of the morning — but you have never exchanged names. You know their schedule, their preferred spot, their approximate life stage from their appearance. This is not friendship. It is something without a word.`,
      `There is someone from the old commute — the job you left years ago — who you saw every day for three years and then never saw again. The commute was the entire context of the acquaintance. Without the commute, there was nothing. You think of them occasionally, in the way you think of people who existed in one specific context of your life and have since returned to being strangers.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17CommutePartner', true) },
  },

  // ── THE SPECIFIC SILENCE ──────────────────────────────────────────────────

  {
    id: 's17_specific_silence',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s17SpecificSilence,
    text: pick([
      `The house at this age has a specific silence that it did not have when it was full. The silence is not unpleasant. You have learned to hear it rather than measure yourself against it. The silence is its own thing — the sound of a house that has been lived in for years, the specific acoustic quality of rooms that know you.`,
      `You have become comfortable with silence in a way you were not at thirty. The silence at thirty was something to fill. Now it is something to be in. The phone does not need to be checked. The noise does not need to be supplied. The silence of a specific hour in a specific room is sufficient.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s17SpecificSilence', true) },
  },

  // ── BARTER AND EXCHANGE ───────────────────────────────────────────────────

  {
    id: 's17_barter',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.ruralUrban === 'rural' ||
       G.character.country?.archetype === 'subsaharan' ||
       G.character.country?.archetype === 'developing_unstable') &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.s17Barter,
    text: pick([
      `The exchange that isn't money: the service for the service, the goods for the goods, the favour that creates an obligation that will be discharged in a form not yet specified. The informal economy runs on this and the informal economy is most of the economy for most people most of the time. The accounting is not written. It is kept in relationships, in memory, in the specific honour of a community where everyone knows everyone's ledger.`,
      `You have been part of exchanges that had no price. The work given, the thing received, the relationship that made both possible. The formal economy calls this barter and considers it primitive. The people inside it call it getting by, or helping, or just the way things work here. The relationship is the currency.`,
    ]),
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s17Barter', true) },
  },

  // ── THE SPECIFIC ROOM ─────────────────────────────────────────────────────

  {
    id: 's17_specific_room',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s17SpecificRoom,
    text: pick([
      `There is a room from your past that you can reconstruct completely: the position of each piece of furniture, the colour of the walls at a specific time of day, the sound it had when it was empty and the sound it had when it was full. The room exists more precisely in memory than any other space you have occupied. Probably because it was the room where something happened, or where you spent the hours in which you were most yourself, or where you were most afraid.`,
      `You have a room you go back to in memory when you want to think clearly. Not a real room you can visit — a room from years ago, from a time in your life that had a particular quality. The room is the container for that time. When you need the thinking that happened in it, you return to the room first.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17SpecificRoom', true) },
  },

  // ── THE SECOND LANGUAGE LATE ──────────────────────────────────────────────

  {
    id: 's17_second_language_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 65 &&
      !G.mem?.s17SecondLangLate,
    text: pick([
      `In the second language you are slightly less yourself — or a different self, the self that was built out of acquired words rather than inherited ones. Late in life you notice this more. The first language arrives now when you are tired or startled or dreaming. The second language is still there, still functional, but it requires a moment. The moment is small. It is also new.`,
      `You dream in both. The first language appears in the dreams set in the old country; the second language appears in the dreams set here. The dreaming brain has sorted them geographically. You do not remember deciding this.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s17SecondLangLate', true) },
  },

  // ── THE APOLOGY NOT GIVEN ─────────────────────────────────────────────────

  {
    id: 's17_apology_not_given',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s17ApologyNotGiven,
    text: pick([
      `There is someone you never apologised to. You know who it is. The opportunity was there, more than once, and you did not take it — from pride, from the conviction that the situation was more complicated than the apology would acknowledge, from the specific inertia of not knowing how to start. The person may not be waiting. They may have made their peace with it. You have not made yours.`,
      `The apology you owe: you have been carrying it for years in the awareness that it should be given and the failure to give it. At this age the options are narrowing. The person is older. The time is shorter. The apology itself is still possible but it requires something you have not yet been able to do.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.karma -= 2; p.setMem('s17ApologyNotGiven', true) },
  },

  // ── WHAT MONEY WAS FOR ────────────────────────────────────────────────────

  {
    id: 's17_what_money_was_for',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s17WhatMoneyWasFor,
    text: pick([
      `You can now see what the money was for. Not in the sense of what it bought — the specific purchases are mostly invisible now — but in the sense of what it was in service of. Security, or freedom, or proving something, or care for specific people. The relationship between the earning and the purpose is clearer from here than it was during the earning.`,
      `You spent forty years managing money and what you have to show for it is a specific set of things and the absence of certain other things and the knowledge of which things were worth the spending and which were not. The clarity comes late. It always comes late. The people who have it early are guessing.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s17WhatMoneyWasFor', true) },
  },

  // ── THE PERSON YOU WERE SUPPOSED TO BE ────────────────────────────────────

  {
    id: 's17_supposed_to_be',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s17SupposeTooBe,
    text: pick([
      `There was a version of you that was supposed to exist — the person your family expected, or the person the early evidence suggested, or the person you yourself planned on being at twenty. That person did not materialise. Instead this one did. The gap between the expected version and the actual one has been, over the years, sometimes a source of grief and sometimes a source of relief. At this age it is mostly just the difference between a plan and a life.`,
      `You are not what you intended. Most people aren't. The intention was based on information available at twenty, which was incomplete. The life that resulted from using incomplete information is still a life — is, in fact, the only life you have any evidence about. The intended life remains a hypothetical.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.m += 3; p.setMem('s17SupposeTooBe', true) },
  },

  // ── THE MEAL THAT COMES BACK ──────────────────────────────────────────────

  {
    id: 's17_meal_memory',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s17MealMemory,
    text: pick([
      `There is a meal that returns. Not a celebrated meal — not a birthday or a wedding — but a specific ordinary meal from a specific time: what was cooked, the quality of the light in the kitchen, who was there and the way they were there. The meal was not remarkable at the time of eating. It became remarkable only in memory, when memory turned out to need something to hold on to from that particular period.`,
      `The food of childhood is not necessarily the best food. It is the food that arrived when the capacity for experience was highest — when everything was tasted for the first time, when the mouth had no comparisons. The nostalgia is not for the dish. It is for the version of yourself that ate it.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s17MealMemory', true) },
  },

  // ── THE SMALL CEREMONY ────────────────────────────────────────────────────

  {
    id: 's17_small_ceremony',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s17SmallCeremony,
    text: pick([
      `You have developed, without intending to, small rituals: the specific order in which you make coffee, the way you prepare for a particular kind of work, the sequence of a Sunday morning. These are not superstitions. They are something more modest — the body's preference for a path that has already been cleared, the comfort of an action that is also a form of maintenance.`,
      `The ritual that marks nothing: the cup in the specific place, the window opened in the specific order, the phrase said to the specific animal or plant or empty room. No one taught you this. It arrived. It has been present now for long enough to be as much yours as anything else.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s17SmallCeremony', true) },
  },

  // ── ASKING FOR HELP ───────────────────────────────────────────────────────

  {
    id: 's17_asking_for_help',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s17AskingHelp,
    text: pick([
      `You got better at asking for help, or you did not, and the trajectory of that project has produced your life in some part. The people who got better at it have different lives — more supported, more reciprocal, with networks that absorbed the hard years differently. The people who did not have their independence as compensation. You know which type you are and whether the compensation was worth it.`,
      `Asking for help requires two things: knowing you need it and being willing to name that need to another person. The first is easier. The second has a specific cost that varies by person, by upbringing, by what asking for help was taught to mean. You have been working on this. The work is not done.`,
    ]),
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s17AskingHelp', true) },
  },

  // ── WHAT GRIEF ACTUALLY FEELS LIKE ────────────────────────────────────────

  {
    id: 's17_grief_texture',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      (G.flags.has('mother_died') || G.flags.has('father_died') || G.flags.has('friend_died') || G.flags.has('partner_died')) &&
      !G.mem?.s17GriefTexture,
    text: pick([
      `Grief is not the thing you expected it to be. Not the waves, necessarily, or the stages — those are true and also incomplete. What grief is, in practice, is the specific noticing: the moment you go to tell them something and remember, the habit of reaching for them and finding air, the way the world they knew is still visible but they are not in it to see it. Grief is mostly the specifics.`,
      `You know now what grief is from the inside, which is different from knowing what grief is from the outside. The outside description is accurate as far as it goes. The inside is more particular: the specific object you cannot move, the specific day of the week that is harder, the specific smell that undoes everything briefly. The texture is yours and cannot quite be shared.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s17GriefTexture', true) },
  },

  // ── THE LONG FRIENDSHIP ───────────────────────────────────────────────────

  {
    id: 's17_long_friendship',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 60 &&
      G.friends && G.friends.length > 0 &&
      (G.friends[0]?.relationshipQuality ?? 50) >= 55 &&
      !G.mem?.s17LongFriendship,
    text: pick([
      `The friendship that has lasted forty years has survived things that shorter friendships have not been asked to survive. It has survived the other person becoming someone you would not have chosen if you had met them now — and you have become someone they might not have chosen — and you are still here. This is what long friendship is: a continuity that includes revision, a bond that does not require agreement, a mutual decision to remain that is renewed without being stated.`,
      `At this age the long friends are the people who knew you before you were the person you became. Their knowledge is not of the person you are now but of the whole arc — who you were at twenty-five, who you were at forty, the specific trajectory of the becoming. No new friend can have this. It is irreplaceable and it is, at this age, increasingly fragile.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s17LongFriendship', true) },
  },

  // ── THE AGE YOU THOUGHT WAS OLD ───────────────────────────────────────────

  {
    id: 's17_age_you_thought_old',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s17AgeYouThoughtOld,
    text: pick([
      `There was an age that seemed, when you were young, to be the end of something — the age at which life contracted, at which things stopped being possible, at which a person became old in the sense of finished. You have passed that age. The age was wrong. Life did not contract on schedule. Things that seemed impossible at that age from the vantage point of youth are simply the current conditions.`,
      `When you were twenty, sixty seemed very far away and very specific — the age of your grandparents, of oldness itself, of the end of the interesting part. You are sixty now, or past it. You are the age that seemed very far away. It does not feel the way it looked. The things that were impossible from twenty are simply the current terms.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s17AgeYouThoughtOld', true) },
  },

]

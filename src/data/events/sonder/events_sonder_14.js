// events_sonder_14.js — Contemplative layer, batch 14
//
// 36 quiet-year prose events across: the body in the workplace, objects and
// their persistence, small economies, the texture of waiting, distance and
// contact, what you notice about yourself in mirrors, the specific quiet of
// different kinds of rooms, the things that survive the people who made them.
//
// All weight 2, mem-gated, no choices, minimal stat effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_14 = [

  // ── THE BODY AT WORK ────────────────────────────────────────────────────────

  {
    id: 's14_body_at_desk',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s14BodyAtDesk,
    text: `The body's relationship to the chair it spends its working hours in is different from the body's relationship to any other piece of furniture you own. You have shaped the chair to you and the chair has shaped you back — a slight lean, a tendency to roll to a particular corner, a posture that the physiotherapist described as "characteristic." The chair knows you in the way that things know people who use them daily.`,
    choices: null,
    effect: (p) => { p.setMem('s14BodyAtDesk', true) },
  },

  {
    id: 's14_the_commute_year',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s14CommuteYear,
    text: `Something happens this year and the commute is the frame around it. The commute is the same both ways: the same platform, the same sequence of stations, the same walk to the office that takes nine minutes when unhurried and six when not. The event that happened is over. The commute continues with the same nine-minute walk, the same platform. You will remember the event. You will not remember the nine minutes. Both the commute and the event are what a year is made of.`,
    choices: null,
    effect: (p) => { p.setMem('s14CommuteYear', true) },
  },

  {
    id: 's14_hands_learning',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s14HandsLearning,
    text: `The hands develop their own knowledge independently of what the mind is tracking. You can do the thing with your hands while thinking about something else entirely. The first year this was not possible. At some point between then and now it became possible. You did not register the transition — it happened below attention, at the level where the hands were practicing while you were elsewhere.`,
    choices: null,
    effect: (p) => { p.setMem('s14HandsLearning', true) },
  },

  {
    id: 's14_lunch_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.s14LunchYears,
    text: `There is a lunch place that has been the lunch place for years. You order the same thing, or a rotation of the same things, and they know your order or they don't and the lunch is the same quality it has always been. The conversation at lunch with whoever you eat lunch with is a parallel life to the one happening in the rest of the day — it has its own continuity, its own inside references, its own small arguments that are resumed the following week. The lunch is not a break. It is one of the ways the year holds together.`,
    choices: null,
    effect: (p) => { p.setMem('s14LunchYears', true) },
  },

  // ── OBJECTS AND THEIR PERSISTENCE ───────────────────────────────────────────

  {
    id: 's14_object_outlives',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s14ObjectOutlives,
    text: `There are objects in the house that are older than the house. The table was your grandmother's. The lamp was bought in another city in a year when you were someone slightly different from who you are now and it has survived two moves. Objects accumulate a history that is not their history — they absorb the rooms they've been in, the hands that have moved them, the specific light conditions of the apartments where they have been present. The table does not remember being your grandmother's. It was simply always there.`,
    choices: null,
    effect: (p) => { p.setMem('s14ObjectOutlives', true) },
  },

  {
    id: 's14_the_broken_thing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s14BrokenThing,
    text: `There is a thing in the house that has been broken for longer than you intended. The breaking happened at a specific moment that you remember with more clarity than the thing warrants. The fixing has been deferred to next week, then next month, then the point where the broken state has become the known state. The thing works around its breakage or is ignored or serves a function it was not designed for. At some point the broken state becomes the actual state and the original state is a memory.`,
    choices: null,
    effect: (p) => { p.setMem('s14BrokenThing', true) },
  },

  {
    id: 's14_the_photograph_in_a_drawer',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s14PhotoInDrawer,
    text: `There is a photograph that is not on display. It is in a drawer or at the bottom of a box. The reason it is not on display is not something you have articulated to anyone — it is simply that it has always been in the drawer. The photograph shows people who were real and specific and who are now older or dead or in another country or estranged, and looking at it requires calibrating between what they were at the time of the photograph and what they became afterward. The drawer is the right place for it.`,
    choices: null,
    effect: (p) => { p.setMem('s14PhotoInDrawer', true) },
  },

  {
    id: 's14_the_gift_kept',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s14GiftKept,
    text: `There is something you were given that you have kept past all occasions for keeping it. It was given at a specific moment by a specific person and has survived the dispersal of everything else from that period of your life. You cannot explain, if asked, why this object and not the others. The explanation involves the moment of receiving it and the feeling of receiving it and something about the person who gave it that is difficult to put in a sentence. It is in the house. It is always going to be in the house.`,
    choices: null,
    effect: (p) => { p.setMem('s14GiftKept', true) },
  },

  // ── SMALL ECONOMIES ─────────────────────────────────────────────────────────

  {
    id: 's14_the_expense_that_stopped',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s14ExpenseStopped,
    text: `There is something you used to spend money on and at some point stopped, and the cessation was so gradual that you cannot identify when it happened. The subscription that ran for three years after you stopped using the service. The category that was part of every month's budget and then wasn't. The things that fall away are not always the things you decided to stop — sometimes they simply recede until they are no longer there.`,
    choices: null,
    effect: (p) => { p.setMem('s14ExpenseStopped', true) },
  },

  {
    id: 's14_calculating',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s14Calculating,
    text: `The mental arithmetic of the week: what is in the account, what is owed, what can be deferred, what cannot. This runs continuously and mostly below full consciousness — a background calculation that surfaces when a purchase is considered, when a statement arrives, when the end of the month approaches from the middle of the month. The arithmetic is different at different ages. This is the age where it is most continuous.`,
    choices: null,
    effect: (p) => { p.setMem('s14Calculating', true) },
  },

  {
    id: 's14_the_repair_or_replace',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s14RepairOrReplace,
    text: `The repair-or-replace question arrives for most things eventually. The calculation involves the age of the thing, the cost of repair relative to replacement, the quality of the new version versus the thing you know, and an additional factor that resists quantification: the accumulated relationship with the specific object. The repair-or-replace decision is always partly a decision about the past.`,
    choices: null,
    effect: (p) => { p.setMem('s14RepairOrReplace', true) },
  },

  // ── THE TEXTURE OF WAITING ───────────────────────────────────────────────────

  {
    id: 's14_the_waiting_room',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s14WaitingRoom,
    text: `The waiting room has magazines from a specific month in a previous year. The people in it are each waiting for their own specific reason, which is not displayed. You wait alongside them with your own reason. The room is designed for the suspension of time — its magazines are always from a previous month, its chairs arranged for adjacency without encounter, its function the management of the interval between the decision to come and the event you came for. You will not remember the waiting room. You will remember what came after it.`,
    choices: null,
    effect: (p) => { p.setMem('s14WaitingRoom', true) },
  },

  {
    id: 's14_the_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s14Queue,
    text: `Queues are a form of time. The people in the queue ahead of you are in the future from the queue's perspective; the people behind you are in your past. The queue is a life in miniature: you arrive, you wait in an order not of your choosing, you advance, the thing at the front resolves in your favour or it doesn't, you leave. You have spent years of accumulated time in queues. The total, if counted, would be significant.`,
    choices: null,
    effect: (p) => { p.setMem('s14Queue', true) },
  },

  {
    id: 's14_the_result_waiting',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s14ResultWaiting,
    text: `There is a period of days when you are waiting for a result that will determine something. The result is coming regardless of what you do in the interval, which is a fact that the interval makes difficult to hold. You eat meals and sleep and go about the ordinary things of the ordinary days and the result is coming from a fixed point in the future that the ordinary days do not slow or accelerate. The result arrives. The interval is over. What follows depends on what the result was.`,
    choices: null,
    effect: (p) => { p.setMem('s14ResultWaiting', true) },
  },

  // ── DISTANCE AND CONTACT ─────────────────────────────────────────────────────

  {
    id: 's14_the_update_call',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s14UpdateCall,
    text: `The call with the person who is in another city or country. It has a structure now — a beginning in which the recent weeks are covered, a middle in which one of you has something to say that the other has been waiting to hear, an end in which the call ends before everything has been said but both of you are satisfied. The call is a maintenance mechanism for a relationship that would otherwise drift. The drift is real. The maintenance is also real. The two things coexist.`,
    choices: null,
    effect: (p) => { p.setMem('s14UpdateCall', true) },
  },

  {
    id: 's14_the_letter_kept',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s14LetterKept,
    text: `There is a letter you have kept since the year it was sent. It was sent by someone who is older or dead or changed beyond the person who wrote it. The letter contains sentences that were true at the time of writing and may or may not still be true. You do not read it often. You know where it is. Keeping it is not the same as returning to it. Keeping it is a decision made once and renewed each time you could have decided to discard it and didn't.`,
    choices: null,
    effect: (p) => { p.setMem('s14LetterKept', true) },
  },

  {
    id: 's14_news_from_far',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.has('emigrated') && G.age >= 22 && !G.mem?.s14NewsFar,
    text: `News from home arrives in the register of people who are not there to see what they're describing. The wedding you weren't at, the shop that closed, the neighbour who was sick and is now better or not better. The news is accurate but it arrives compressed — all the texture between events removed — which makes the home you carry in your head a different home from the one where the news is happening. Both homes are real. You live in one and carry the other.`,
    choices: null,
    effect: (p) => { p.setMem('s14NewsFar', true) },
  },

  {
    id: 's14_the_visit_rhythm',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.parents?.some(par => par.alive) && !G.mem?.s14VisitRhythm,
    text: `The visits have established a rhythm. Not by agreement but by accumulation — the same weeks of the year, the same rooms, the same conversations that begin in the same place they were left. You know this rhythm the way you know any long-accumulated pattern: without having decided it, without particularly having chosen it, by virtue of the fact that it has happened enough times that it is now the form the relationship has taken. The rhythm will shift when something changes. For now it holds.`,
    choices: null,
    effect: (p) => { p.setMem('s14VisitRhythm', true) },
  },

  // ── THE MIRROR ──────────────────────────────────────────────────────────────

  {
    id: 's14_mirror_young',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 29 && !G.mem?.s14MirrorYoung,
    text: `The face in the mirror at this age is the face you think of as your face. It is the reference point. Future faces will be assessed against it by memory. This is not known at the time — you are simply looking in a mirror at the face that is currently your face, checking for whatever you check for in the morning. The reference-point quality of this face will not become apparent until the mirror shows something different.`,
    choices: null,
    effect: (p) => { p.setMem('s14MirrorYoung', true) },
  },

  {
    id: 's14_mirror_parent',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 55 && !G.mem?.s14MirrorParent,
    text: `The face in the mirror at this age shows something that the face at twenty didn't — something that is recognisably the face of your parent at a particular age. The features were always yours. The arrangement of them has arrived at a resemblance that was not visible before. This is a specific kind of information. You receive it and proceed.`,
    choices: null,
    effect: (p) => { p.setMem('s14MirrorParent', true) },
  },

  {
    id: 's14_no_longer_looking',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s14NoLongerLooking,
    text: `At some point in the past several years you stopped looking at your own face in the mirror with particular attention. The face is known. The changes are gradual and have been gradual for long enough that each individual change is small. There is a practical relationship with the mirror in the morning — is the presentation acceptable, are the obvious things managed — but the scrutiny that the mirror received at thirty or forty is no longer being applied. The face is the face. It is doing its work.`,
    choices: null,
    effect: (p) => { p.setMem('s14NoLongerLooking', true) },
  },

  // ── ROOMS ───────────────────────────────────────────────────────────────────

  {
    id: 's14_the_kitchen_night',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s14KitchenNight,
    text: `The kitchen at night when the house is otherwise quiet has a different quality from the kitchen during the day. The same objects. The same light when the light is on. But the quiet outside it gives the kitchen a focus it doesn't have when there are other things happening. Standing in the kitchen at 11pm getting a glass of water is a different experience from standing in the kitchen at 7am making coffee. Both are the kitchen. The night kitchen is somehow more kitchen.`,
    choices: null,
    effect: (p) => { p.setMem('s14KitchenNight', true) },
  },

  {
    id: 's14_the_empty_room',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s14EmptyRoom,
    text: `There is a room in the house that has emptied — a room that used to be occupied or used and is now a room that holds the residue of what it used to hold. You pass it. Sometimes you go in and stand in it for a moment. The specific quality of an emptied room is that it is full of the shape of what was there rather than the thing itself. The absence has a specific form that is the form of the presence it replaced.`,
    choices: null,
    effect: (p) => { p.setMem('s14EmptyRoom', true) },
  },

  {
    id: 's14_someone_elses_house',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s14SomeonesHouse,
    text: `Being in someone else's house for an extended period teaches you their specific version of ordinary life. The time they eat. The sounds the house makes at night. The objects that are always where they are. You observe all of this without meaning to and what you observe tells you things about the people that they would not say in conversation. Houses are the accumulated evidence of how their occupants have decided to live. The evidence is everywhere and almost none of it is intentional.`,
    choices: null,
    effect: (p) => { p.setMem('s14SomeonesHouse', true) },
  },

  // ── WHAT SURVIVES ──────────────────────────────────────────────────────────

  {
    id: 's14_the_song_from_before',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s14SongBefore,
    text: `A song from a particular year arrives unexpectedly. The song is not from a good year or a bad year specifically — it is from a year that had texture you have not thought about in a long time. The song carries the texture back exactly. Not approximated. The specific quality of that year in your body, the person you were in it, the things you were worried about which you can no longer access directly but which the song accesses without effort. The song ends. The year goes back where it was.`,
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s14SongBefore', true) },
  },

  {
    id: 's14_the_phrase_inherited',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s14PhraseInherited,
    text: `There is a phrase you say that was your parent's phrase. You did not decide to adopt it — it arrived in your speech at some point and stayed. Sometimes you hear it in your own mouth and recognise it as theirs. The phrase is minor — a filler, a transition, a way of expressing mild agreement — but its presence in your speech is a form of transmission. The people who know you hear your parent in you. You are carrying them in the way phrases carry the people who first said them.`,
    choices: null,
    effect: (p) => { p.setMem('s14PhraseInherited', true) },
  },

  {
    id: 's14_the_handwriting',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && G.parents?.some(p => !p.alive) && !G.mem?.s14Handwriting,
    text: `There is a piece of paper somewhere — a card, a note, a list — in handwriting that is your parent's. You still recognise it immediately. Handwriting is one of the ways people persist after they are gone: a specific physical gesture, trained and habitual, expressing them in the moment of making the letter. The note itself may be trivial — a shopping list, a birthday card message. The handwriting is not trivial. It is them specifically, making a mark.`,
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s14Handwriting', true) },
  },

  {
    id: 's14_what_didnt_happen',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s14WhatDidntHappen,
    text: `The counterfactuals accumulate over a long life. If the other school had accepted you. If the person you didn't call had been called. If the job you turned down had been taken. You know the shape of the life you lived. The shapes of the other lives are inferrable but not visible — they branch off from specific moments and proceed into the dark. The life you lived is the only one you know the full shape of. You observe it from inside, without the distance to see it as a shape.`,
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('s14WhatDidntHappen', true) },
  },

  // ── STRANGERS ──────────────────────────────────────────────────────────────

  {
    id: 's14_stranger_glimpse_street',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s14StrangerStreet,
    text: `The man on the corner every morning selling newspapers has been there for at least four years. You have been past him so many times that you know, without ever having spoken to him, certain things: the cold days he wears, the way he folds the papers, the approximate hour when the pile has dwindled to a specific number. You do not know his name or where he lives or what his life is. He does not know yours. You have a history that exists entirely in the space of passing and it is more continuous than most of the things you would call relationships.`,
    choices: null,
    effect: (p) => { p.setMem('s14StrangerStreet', true) },
  },

  {
    id: 's14_stranger_on_train',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s14StrangerTrain,
    text: `The woman across from you on the train today. She is doing something ordinary — reading, looking at her phone, looking at nothing in particular — and you observe, without meaning to, that she is at a specific moment in her life. You do not know what the moment is. But you can read the particular quality of attention she is giving to the nothing she is looking at — slightly inward, slightly away — and infer that something has recently happened, or is about to happen, or is being processed. You arrive at your stop and she continues.`,
    choices: null,
    effect: (p) => { p.setMem('s14StrangerTrain', true) },
  },

  {
    id: 's14_the_neighbour_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s14NeighbourYears,
    text: `You have lived next to the same person for years without ever getting past a particular point of knowledge. You know their schedule from the sounds. You know which rooms face yours. You have helped once with something practical. The relationship has reached a plateau that is stable and specific: not friendship, not anonymity. An adjacent life. You know that they exist and that their existence has a shape you can partly infer and mostly cannot. They know the same about you.`,
    choices: null,
    effect: (p) => { p.setMem('s14NeighbourYears', true) },
  },

  // ── TIME ────────────────────────────────────────────────────────────────────

  {
    id: 's14_the_birthday_this_year',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 60 && !G.mem?.s14BirthdayYear,
    text: `The birthday this year has a quality that other birthdays haven't had. Not because the number is round — though the number is close to round — but because this particular year has included specific things that have made the age feel different from the previous age. You are still the same person. Something has shifted in the aggregation of things the year contained. The birthday is the marker. The shift had been happening for months before it.`,
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s14BirthdayYear', true) },
  },

  {
    id: 's14_the_decade',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s14Decade,
    text: `From here, decades are comprehensible units. The twenties were a shape you can see from outside now. The thirties had a different quality you can see from outside. The forties you are only now beginning to be able to see from outside — they are closer, the features less resolved. The decades do not feel, from inside, the way they look from outside. They are lived as years, then as months. The decades are only visible in retrospect.`,
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s14Decade', true) },
  },

  {
    id: 's14_time_was_a_year',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s14TimeWasYear,
    text: `A year that felt important while it was happening feels, from this distance, like a year. Not less real — the events it contained are still real. But the felt weight of it at the time — the sense that the year was singular, that its events were decisive, that things would be different afterward — has redistributed over time into the larger shape of the decades around it. The year is there. Its felt weight is in the past.`,
    choices: null,
    effect: (p) => { p.setMem('s14TimeWasYear', true) },
  },

]

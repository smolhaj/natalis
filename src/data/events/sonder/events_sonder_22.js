// events_sonder_22.js
// Contemplative layer: moments of ordinary life that produce the sonder feeling.
// Weight 2, mem-gated, no choices, no new flags.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_22 = [

  {
    id: 'sdr22_the_long_meeting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 40 && !G.mem?.sdr22LongMeeting,
    text: pick([
      `The meeting has been going for an hour and a half and you are not in it anymore. You are watching the speaker's mouth and hearing sounds. The legal pad in front of you has a small drawing of a window in the bottom corner. You do not remember making it.`,
      `Somewhere in the third hour of the meeting someone has started to cry, quietly, and no one is acknowledging it, and the presenter continues. The fluorescent light above the crying person flickers once and then holds.`,
      `You realise you have not said anything in forty minutes and no one has noticed. This is information.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22LongMeeting', true) },
  },

  {
    id: 'sdr22_the_commute_body',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 45 && !G.mem?.sdr22CommuteBody,
    text: pick([
      `Your body knows the commute without you. It boards and finds a standing position and redistributes weight at the turns. You are somewhere else entirely. When you arrive you are surprised, briefly, that you are already here.`,
      `The bus driver knows most of the people who ride every morning. You have watched them greet each other for three years. The driver knows the woman with the green scarf is named Maria. You have never learned the driver's name.`,
      `Two people on the train are having an argument by text message with each other. You can see both phones from where you are standing. They are not sitting together. They don't look up.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22CommuteBody', true) },
  },

  {
    id: 'sdr22_the_sick_day',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr22SickDay,
    text: pick([
      `You are home sick and it is a weekday. The city is a different city when you are in it at the wrong time. Deliveries, repair vans, women pushing small children, the idle middle hours. You watch from the window for a while. This is what it is like to be retired, you think. Or unemployed. Or free.`,
      `On the sick day the apartment reveals itself: the water in the pipes when the upstairs neighbour moves, the particular hum of the refrigerator, the way the light crosses the floor between ten and eleven. You have lived here for two years and not known any of this.`,
      `By three in the afternoon of the sick day you have slept twice and watched something forgettable and there is still three more hours before the day would normally end. Time is a different substance when you are not scheduled.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22SickDay', true) },
  },

  {
    id: 'sdr22_the_first_grey',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 45 && !G.mem?.sdr22FirstGrey,
    text: pick([
      `The first grey hair. You find it in the mirror on a morning when nothing else is happening. You look at it for a moment and then you go and make coffee. The coffee tastes the same as it always does. This is the appropriate response.`,
      `Someone mistakes you for being older than you are. They correct themselves immediately and apologise. What stays is not the mistake but the fact that the correction was necessary. Something in you is visible now that wasn't before.`,
      `You notice you now check prices before buying things you would have bought without thinking at twenty-two. When did that start. You cannot locate the year it became a habit. It is simply how you are now.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22FirstGrey', true) },
  },

  {
    id: 'sdr22_the_new_colleague',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && !G.mem?.sdr22NewColleague,
    text: pick([
      `The new colleague is twenty-three and doesn't know who certain people are. Names you assumed everyone knew. Bands. A politician who seemed important. The absence in the new colleague is not ignorance — they simply weren't there yet. The world was already full of things before they arrived.`,
      `There is a new person at work who has the energy of someone who still believes this job could become something. You remember having that. You don't remember when you stopped.`,
      `You catch yourself explaining something to a younger colleague with more patience than you feel. This is what professionalism is, you realise: feeling one thing and doing another, smoothly, for decades.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22NewColleague', true) },
  },

  {
    id: 'sdr22_the_phone_call',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 40 && !G.mem?.sdr22PhoneCall,
    text: pick([
      `You are on the phone with your mother. She is telling you something that is not the thing she is actually trying to say. You have learned to hear the thing beneath the thing. This is a skill no one taught you and you have no name for.`,
      `The phone call from home always comes at a specific time. You know the time. You have arranged your Sundays around it without deciding to. It has become the structure of the week.`,
      `You hang up from the call and sit for a moment with the particular feeling of having spoken to someone who loves you without understanding you. Both things are true at once and they do not cancel each other out.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22PhoneCall', true) },
  },

  {
    id: 'sdr22_the_waiting_room_2',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr22WaitingRoom2,
    text: pick([
      `The waiting room for the result. Other people are also waiting. Each of them is inside something no one else in the room knows about. You can see from the way they hold their phones that several of them are not reading what is on the screen.`,
      `You have read the same paragraph in the waiting room magazine four times. It is about a kitchen renovation. You know it is not registering. You read it a fifth time.`,
      `The doctor's receptionist has a small potted plant on her desk that needs water. Every time you have been here, it needs water. You have never mentioned it. You wonder now if anyone ever mentions it, or if it just quietly declines in its small pot among the appointments.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22WaitingRoom2', true) },
  },

  {
    id: 'sdr22_the_childhood_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.sdr22ChildhoodSmell,
    text: pick([
      `A smell in a corridor — something cleaning-fluid and old wood — and you are ten again, in a school building, in your body then, completely. The corridor you are standing in is nothing like that corridor. The smell has performed its trick without asking permission.`,
      `The particular smell of the house you grew up in is nowhere in the world except in the house you grew up in, which you cannot go back to, which belongs to someone else now. This is not grief exactly. It is something smaller and more accurate.`,
      `Rain on hot pavement, and a summer when you were eight. You are standing in a street that is not that summer. Your body does not know the difference.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22ChildhoodSmell', true) },
  },

  {
    id: 'sdr22_the_argument_replayed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.mem?.sdr22ArgumentReplayed,
    text: pick([
      `You think of the right thing to say three days after the argument. You think of it in the shower, specifically. The thing you should have said was so obvious, in retrospect, that its absence during the argument feels like a failure of a fundamental system.`,
      `The argument has been over for a week but you are still having it, internally, with the version of the other person that lives in your head. The head-version has now said several things the real person never said. You are aware of this and do it anyway.`,
      `You replay the exchange at the table, in the car, while trying to sleep. Each replay differs slightly from the one before. By the fourth week you are no longer sure which words were actually said.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22ArgumentReplayed', true) },
  },

  {
    id: 'sdr22_the_wedding_stranger',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 45 && !G.mem?.sdr22WeddingStranger,
    text: pick([
      `At the wedding you are seated with people you don't know. By the end of the evening you know that the man across from you lost his father six months ago and finds weddings difficult and has not told his wife who is dancing. You know this because you were seated next to each other for four hours. You will not see each other again.`,
      `You dance at the wedding with someone you have just met and you are both slightly drunk and the song is good and for three minutes the dancing is what's real and everything else is peripheral. The song ends. You thank each other. You go back to your separate tables.`,
      `The grandmother of the groom has been sitting alone at a table near the back since the speeches. She is watching the dancing. Her expression is impossible to read. You want to go over and sit with her but you don't and then she is gone and you didn't.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22WeddingStranger', true) },
  },

  {
    id: 'sdr22_the_old_city',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr22OldCity,
    text: pick([
      `You return to the city where you were young and it is the same city and none of the places are in the right locations. The bar is a pharmacy. The pharmacy is a café. The café is a vacant lot with a construction board around it. You reconstruct the old city over the present one in your head, walking the former streets.`,
      `The neighbourhood from twenty years ago is now desirable. The people who made it interesting enough to become desirable cannot afford to live there anymore. You are not sure how you feel about this. You probably contributed to it.`,
      `You pass the building where you lived at twenty-four. Someone else is lit behind the window, in the kitchen, doing something at the sink. The building doesn't remember you. You briefly want it to.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22OldCity', true) },
  },

  {
    id: 'sdr22_the_body_at_fifty',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 62 && !G.mem?.sdr22BodyAtFifty,
    text: pick([
      `The body at fifty requires negotiation. This joint in the morning. This adjustment before sitting. You work around these things so automatically that a full day can pass without noticing you are doing it. The body is accommodating. You are learning to accommodate it back.`,
      `You catch your reflection from the side and see someone who is clearly your parent. The face you make in response is also your parent's face. You are them now, from this angle, in this light. This is not unpleasant. It is just true.`,
      `You sleep differently now. The old way — wherever, through anything, dropped like a stone — is unavailable. The new way involves pillows in specific positions and windows at specific angles and a particular kind of quiet. It is better sleep, actually. Just more deliberate.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22BodyAtFifty', true) },
  },

  {
    id: 'sdr22_the_recipe',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.sdr22Recipe,
    text: pick([
      `You make the dish the way you were shown, which is not the way the recipe says, which is not the way anyone else makes it. The dish is yours now. The person who showed you made it differently, and the person who showed them made it differently still, and at the origin of the chain is a version no one can recover.`,
      `You cook the meal that you cook when you want to remember feeling cared for. No one taught you to do this specifically. You arrived at it yourself, through some route you can no longer trace.`,
      `The meal you make when you are sad is not the most nutritious. It is the one your body has decided is the appropriate response to this particular feeling, without your having made a deliberate choice about it. The body made this decision for you somewhere along the way.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22Recipe', true) },
  },

  {
    id: 'sdr22_the_neighbour_again',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 65 && !G.mem?.sdr22NeighbourAgain,
    text: pick([
      `You have lived next to this person for four years and exchanged approximately six hundred words with them. You know they work early shifts because the door is at five-thirty. You know they had a difficult year because of the crying you heard once through the wall. They know equivalent things about you.`,
      `The neighbour downstairs moved out last month and you only know this because the sound pattern changed. The new footsteps are lighter and stop in different places. A whole person has arrived and you have not yet seen their face.`,
      `You hold the lift for the neighbour you have seen five hundred times and still don't know by name. You exchange the look of people who have chosen this level of relationship and maintained it over years without either of you deciding to. It works. Most things in a building work this way.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22NeighbourAgain', true) },
  },

  {
    id: 'sdr22_the_language_limit',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.mem?.sdr22LanguageLimit,
    text: pick([
      `You reach the limit of your second language and are left stranded one word short of something important. The word exists. You cannot locate it. The other person waits with the patience of someone who has been waited for and knows what it costs.`,
      `In the second language you are a simpler version of yourself. The jokes don't translate. The exact shade of what you mean can only be approximated. You wonder if the people who know you only in this language know you at all. Probably they know a version.`,
      `You dream in the language of the country you are in now and wake disoriented about which language the dream was speaking. For a moment you are not sure which self you were in the dream.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22LanguageLimit', true) },
  },

  {
    id: 'sdr22_the_cost_of_things',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.sdr22CostOfThings,
    text: pick([
      `You remember what things used to cost and you still haven't fully revised the number. The bread is twice what you first paid for bread. The flat is four times. Your salary is not four times. You have absorbed this without ever formally accepting it.`,
      `You buy something expensive and immediately do the calculation for how many hours of work it represents. You did not used to do this calculation. You are not sure when it became automatic. It has spoiled a certain kind of pleasure.`,
      `You find an old receipt in a coat pocket from twelve years ago. The amount is almost nothing. You cannot reconstruct what you bought or what those years felt like. The receipt is evidence that they happened.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22CostOfThings', true) },
  },

  {
    id: 'sdr22_the_last_time',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr22LastTime,
    text: pick([
      `There was a last time you carried someone on your shoulders. A last time you ran for the bus without thinking about it. A last time you slept on a floor and it was fine. These last times passed without announcement. You were not asked to mark them.`,
      `You realise you stopped doing something — a specific thing, a practice, a way you used to spend an afternoon — and you cannot identify when it stopped or why. It simply ceased to be available. The days reorganised around its absence.`,
      `The last time you saw that person you did not know it was the last time. This is always how it works. You had a conversation you cannot remember and then went your separate ways and then the ways became permanent.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22LastTime', true) },
  },

  {
    id: 'sdr22_the_child_asks',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 55 && !G.mem?.sdr22ChildAsks,
    text: pick([
      `The child asks why the sky is dark at night and you know the answer, technically, and you give it, and the child considers it and then asks something else entirely and the conversation moves on and the question of why the sky is dark at night remains, quietly, more strange now than it was before the child asked.`,
      `A child is doing something at the table — drawing something, building something — with the total absorption of a person for whom time is not an issue. You have not felt that way about anything for a long time. You are not sure if you miss it or if it simply belongs to that age.`,
      `The child asks you what you were like when you were young and you try to describe it and discover you don't quite know. The person who lived that life had different concerns and moved differently through the world. You describe them from the outside, as though they were someone you used to know.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22ChildAsks', true) },
  },

  {
    id: 'sdr22_the_hospital_corridor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 70 && !G.mem?.sdr22HospitalCorridor,
    text: pick([
      `The hospital corridor at two in the morning: people in various states of waiting, the specific quality of fluorescent light at this hour, the sound of wheels on linoleum. Everyone here is inside something. The corridor connects all of them without making them the same.`,
      `You have learned the specific geography of this ward. The good chair by the window. The vending machine that works. The nurse who explains things properly. This is knowledge you didn't want to acquire.`,
      `You go outside the hospital for ten minutes to get air and the ordinary world is still occurring — a taxi, a couple arguing, a man eating from a paper bag — and it is startling. The ordinary world has continued without any particular regard for what is happening inside the building behind you.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22HospitalCorridor', true) },
  },

  {
    id: 'sdr22_the_ritual',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 50 && !G.mem?.sdr22Ritual,
    text: pick([
      `There is a small ritual you do before something difficult: a specific way of standing, or breathing, or arranging things, that signals to some part of yourself that this is now beginning. You developed it without intending to. It works. You have never explained it to anyone.`,
      `The morning ritual — exactly in this order, for reasons that have been lost — takes thirty-five minutes and produces a specific state of readiness. Deviations from the order produce a less reliable state. This is not superstition. It is self-management with the mechanism removed.`,
      `You find yourself explaining your transit ritual — the particular seat, the direction you face — to someone who asked, and as you explain it you hear how specific it is. You have reasons for all of it. The reasons are not entirely rational. The ritual works anyway.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22Ritual', true) },
  },

  {
    id: 'sdr22_the_inherited_phrase',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.sdr22InheritedPhrase,
    text: pick([
      `You hear yourself say something your parent always said, in your parent's exact cadence, and you stop mid-sentence. The phrase arrived through you without your permission. You are a vector for it now.`,
      `There is a gesture you make — the way you hold a cup, or signal patience — that came from somewhere in the family. No one showed you. It passed through the air, through proximity, through years of watching. You carry it without having collected it.`,
      `You catch yourself sighing in the specific way your grandmother sighed: the exhale of someone who has made this accommodation before and will make it again. The sigh is an exact copy. You did not practise it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22InheritedPhrase', true) },
  },

  {
    id: 'sdr22_the_last_parent',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && G.age <= 75 && !G.mem?.sdr22LastParent,
    text: pick([
      `Both parents are gone now and you are at the front of the line. This is an ordinary fact of the middle of life and it still produces a feeling that is difficult to name. Something about the arrangement of generations. Your generation is the older one now.`,
      `You are the age your parent was when they seemed old to you. Looking at photographs from that time, they were not old. They were exactly this age. Something has been revised.`,
      `You find yourself doing the thing your parent did in their last years — a specific small practice, a way of approaching the end of the day — and you understand it now in a way you didn't then. The understanding comes too late to tell them.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22LastParent', true) },
  },

  {
    id: 'sdr22_the_photograph_again',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr22PhotographAgain,
    text: pick([
      `A photograph from thirty years ago: the people in it, the arrangement of their faces, the occasion you can barely recover. One of the people in it is dead. One moved somewhere and is effectively gone. One you see every few years. One is you, and the version of you in the photograph is unaware of everything that's coming.`,
      `You cannot place the year the photograph was taken by looking at it. You can narrow it down by the hairstyle, the clothes, the particular quality of the light. The year is in there. It requires reading.`,
      `The photographs from before cameras were everywhere are different from the ones taken in any context now. The before-photographs show only the occasions that were worth photographing. You can see what people thought mattered enough to document. It is not always what you would have predicted.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22PhotographAgain', true) },
  },

  {
    id: 'sdr22_the_good_year',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr22GoodYear,
    text: pick([
      `You are in the middle of a good period and you know it, which is unusual. Normally the good periods are only good in retrospect, when something has ended them. This one is visible while it is happening. You are trying to pay attention to it, which may or may not be the right response.`,
      `The year was genuinely fine. This is worth noting. Not many years are genuinely fine. The fine years tend not to produce stories, which is part of why they are fine. They require less processing. They settle quietly.`,
      `Looking back, this is probably the year that was good. Nothing dramatic. Work was manageable. The relationship was not in difficulty. Health held. The city was bearable. These conditions don't always align. They aligned this year.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22GoodYear', true) },
  },

  {
    id: 'sdr22_the_unremarkable_decade',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr22UnremarkableDecade,
    text: pick([
      `Looking back, there is a decade that is harder to narrate than the others. Not because it was bad. Because it was ordinary. The story of an ordinary decade is a decade of small meals, medium weather, work completed, evenings of television or books or conversation. The decade happened. It is genuinely difficult to recover more than that.`,
      `There was a ten-year stretch when nothing exceptional occurred. You were in good health. The work was steady. No one died who wasn't old enough to die. You remember it as time, rather than as events. The time was real. The living of it was real. It is just less available now than the years with peaks.`,
      `The decades that were hardest are the most accessible in memory. The decade that was simply good is harder to locate. You know it happened because here you are, on the other side of it, having arrived.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22UnremarkableDecade', true) },
  },

  {
    id: 'sdr22_the_younger_self',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr22YoungerSelf,
    text: pick([
      `You would not recognise yourself to the younger version of yourself. Not in appearance — that's obvious — but in what you worry about, what you find funny, what you can tolerate, what you cannot. You have become someone the younger self would find baffling or boring or reassuring. Probably all three at different moments.`,
      `The younger version of yourself had opinions that are no longer your opinions. You don't quite know when the opinions changed. You didn't hold a funeral for them. They simply ceased to be available and were replaced by different ones, quietly, without debate.`,
      `If you could speak to yourself at twenty-five you would not give advice. You would just want to tell them: this is going to be a long time, and most of it is not what you think it is, and that is fine. That is actually fine.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22YoungerSelf', true) },
  },

  {
    id: 'sdr22_the_quiet_house',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 80 && !G.mem?.sdr22QuietHouse,
    text: pick([
      `The house is quiet in a way it was not quiet for many years. You are not sure yet whether this is the quiet you wanted or a different quiet. Both are possible. The house is learning what it is now that the arrangement has changed.`,
      `You wake at four and lie listening to the quiet and the quiet is very specific: the particular nothing of this house at this hour. The nothing has a texture. You have learned it over decades. It is yours.`,
      `In the quiet you hear the building working: the pipes, the settling, the refrigerator's cycle, the faint sound from elsewhere in the structure. All the things that were drowned out when the house was full are audible now. The house has always been this complicated. You just couldn't hear it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22QuietHouse', true) },
  },

  {
    id: 'sdr22_the_stranger_in_pain',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 50 && !G.mem?.sdr22StrangerInPain,
    text: pick([
      `The stranger on the bench is crying. Not dramatically — quietly, in the way people cry in public when they have lost the capacity to wait for privacy. You pass, glance, continue. You don't know what the crying is about. You carry it for an hour.`,
      `You witness an argument in the street between two people who clearly love each other and are not managing it well at this moment. The argument spills briefly onto you — a glance, a proximity — and then seals itself back around them as they move away. You saw the inside of their life for about eight seconds.`,
      `The person at the bus stop is trying very hard to hold something together. You can see this from the posture, the grip on the bag, the careful neutral face. You don't say anything. Neither does anyone else. The bus comes and takes you all in different directions.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22StrangerInPain', true) },
  },

  {
    id: 'sdr22_the_thing_you_made',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 65 && !G.mem?.sdr22ThingYouMade,
    text: pick([
      `There is a thing you made — built, cooked, planted, wrote — that is still here. It has outlasted the moment that produced it. It is not quite yours anymore in the way it was when it was new. But it's here, and it functions, or grows, or sits on a shelf in someone's house, and the making of it is somewhere in you still.`,
      `You fixed something and it stayed fixed. This is not nothing. Most things you fix eventually return to needing fixing. This one held. You remember exactly where you were standing when you realised it was done.`,
      `The small act of making — the bread, the hem, the shelf — produces a feeling that is out of proportion to the object. The feeling is about competence, maybe, or about the hands knowing what to do, or about time spent in a specific way that leaves evidence. The evidence is a shelf. The shelf is enough.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr22ThingYouMade', true) },
  },

]

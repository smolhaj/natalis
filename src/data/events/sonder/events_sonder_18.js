// events_sonder_18.js — Contemplative layer, batch 18
//
// 28 quiet-year prose events across: the last person who remembers,
// what your mother's hands looked like, the unsent letter, insomnia at
// a specific hour, what a block looks like after a building comes down,
// the market before it opens, rain in a city you left, the in-between
// time between one life and the next, eating alone without minding,
// the name being called that isn't yours, catching yourself in glass,
// the particular weight of a language you are losing, the specific
// quality of an afternoon with no obligations.
//
// All weight 2, mem-gated, no choices, minimal stat effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_18 = [

  // ── THE LAST PERSON WHO REMEMBERS ────────────────────────────────────────

  {
    id: 's18_last_to_remember',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 65 &&
      (G.flags.has('father_died') || G.flags.has('mother_died')) &&
      !G.mem?.s18LastToRemember,
    text: pick([
      `There are things you are the last person alive to remember. Not important things — not events that will appear in a history — but specific things: the way your father held a cup, the particular phrase your mother used when she was frightened, the exact sound the door made in the house you grew up in before the renovation. When you die, those things are gone. Not forgotten — *gone*, which is different. Forgotten implies someone could remember if they tried. These things will have no one left to try.`,
      `You are the last witness to a version of your own childhood that existed only inside the people who were there. Your parents have died. The neighbours from that street have died or moved past recognition. The specific ordinary details — the colour of a specific wall, the smell of the kitchen on a specific day, the sound of a particular argument that seemed important and then didn't — exist only here now, in you, and will end when you end.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s18LastToRemember', true) },
  },

  // ── YOUR MOTHER'S HANDS ───────────────────────────────────────────────────

  {
    id: 's18_mothers_hands',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 38 &&
      G.flags.has('mother_died') &&
      !G.mem?.s18MothersHands,
    text: pick([
      `You remember the specific way your mother's hands looked doing a particular thing — kneading dough, folding cloth, counting change in the palm before dropping it into a purse. You did not know at the time that you were memorising this. You know it now because the memory is precise in a way that has nothing to do with intention: the knuckles, the specific stain on one finger, the motion. The hands are gone and the memory of the hands is exact.`,
      `Her hands doing a specific thing. Not a thing that was important — not a ceremony, not a moment of tenderness — just a recurring ordinary motion you watched hundreds of times without registering that you were watching. The memory arrived uninvited, years after her death, with the precision of something you had studied.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s18MothersHands', true) },
  },

  // ── THE UNSENT LETTER ─────────────────────────────────────────────────────

  {
    id: 's18_unsent_letter',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 65 && !G.mem?.s18UnsentLetter,
    text: pick([
      `There is a letter — or an email, or a draft message, or a conversation you have rehearsed — that you have not sent. The person it is addressed to is someone you know or once knew. The letter exists in a completed form in your head, in the specific order of its sentences, with the exact word in the second paragraph that you have decided on and then reconsidered. The unsending is not a decision you made. It is a decision you are making continuously, in the specific way that inaction is also a choice.`,
      `The message exists in full. You have written it in your head enough times to have a final draft. The final draft begins with a sentence you have revised into something exact and then revised again because exact felt too much like a demand. There is a person who would receive this message. They do not know it exists. You are not certain what sending it would produce and you are not certain the uncertainty is the reason you haven't.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18UnsentLetter', true) },
  },

  // ── INSOMNIA AT A SPECIFIC HOUR ───────────────────────────────────────────

  {
    id: 's18_insomnia_hour',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && !G.mem?.s18InsomniaHour,
    text: pick([
      `The specific hour is 3:14 or 4:20 or some time in that window where sleep has departed and is not coming back for a while. The mind at this hour does not behave as it does during the day. Problems present themselves without proportion, without the context that makes them manageable. Regrets arrive in a sequence that has been ordered by some part of the brain that works differently in the dark. You have learned that this hour lies and that its assessments cannot be trusted and that none of this information is available to you at 3:14.`,
      `You wake and you know immediately from the quality of the dark and the quality of the silence that it is somewhere between three and five. The interval is its own country. You have been a citizen of it for years. The thoughts that arrive there are the thoughts that do not have good answers, which is why the brain saves them for a time when it cannot be held accountable.`,
    ]),
    choices: null,
    effect: (p) => { p.h -= 1; p.setMem('s18InsomniaHour', true) },
  },

  // ── THE BUILDING THAT IS NOT THERE ────────────────────────────────────────

  {
    id: 's18_missing_building',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 35 && G.age <= 70 &&
      !G.mem?.s18MissingBuilding,
    text: pick([
      `A building you knew is gone. Not a building of significance — not a monument — but one you walked past enough times that your body remembers it as part of the route. Its absence creates a wrong space. The eye corrects for it and then notices the correction. The lot is empty or has a new building that is clearly newer, which means the older building was real and is gone. The building had been there longer than you had known the street. It will not have been there long enough to be remembered.`,
      `The corner where a building was is now a gap. The gap has been there for two years and you still look at the wrong place when you turn the corner. The building is remembered only by the people who walked past it often enough that its absence is noticeable, and most of those people have also moved on or are too busy to notice the gap. You notice it. You are not sure why the noticing persists.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18MissingBuilding', true) },
  },

  // ── THE MARKET BEFORE IT OPENS ────────────────────────────────────────────

  {
    id: 's18_market_before',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban !== 'rural' &&
      G.age >= 18 && G.age <= 55 &&
      !G.mem?.s18MarketBefore,
    text: pick([
      `The market before it opens is a different place from the market during the day. The stalls half-assembled, the produce in crates before arrangement, the vendors eating breakfast from containers brought from home, the specific smell of the place before the crowd arrives and adds its own smell. You have been here at this hour a few times — for an early train, or because of some other morning obligation — and the before-version of the market is almost private, as if you have been shown a room that is usually kept closed.`,
      `At five in the morning the market belongs to the people who run it. The fishmonger arranging the catch on ice. The vegetable seller unloading crates from a truck that arrived in the dark. The specific unhurried quality of the arrangements, the care given to the display before the display has an audience. The market at five is the same place as the market at noon and is also not the same place at all.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18MarketBefore', true) },
  },

  // ── RAIN IN A CITY YOU LEFT ───────────────────────────────────────────────

  {
    id: 's18_rain_in_the_city',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 30 &&
      !G.mem?.s18RainCity,
    text: pick([
      `Somewhere it is raining in the city you left. This is not a remarkable fact — it rains there regularly — but the knowledge of it is unexpectedly precise: the specific grey of that rain, the way it sounds on the roof of the building you lived in, the way the streets smell afterwards. You are not there. You are here, where it is not raining or is raining differently. The specific rain of the place you came from does not follow you, but the knowledge of what it is like does.`,
      `You can still describe the weather of the place you are from with complete precision. The specific season, the specific quality of the light in October, the way the humidity felt in July in that particular city. You are no longer there. The precision of the memory is undiminished. You are not sure whether the precision is nostalgia or simply the accuracy of a place you knew well from the inside.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18RainCity', true) },
  },

  // ── THE IN-BETWEEN TIME ───────────────────────────────────────────────────

  {
    id: 's18_in_between_time',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.s18InBetweenTime,
    text: pick([
      `There is a time between one chapter of a life and the next when neither chapter is fully real. The job that ended and the job that hasn't started. The relationship that has ended and the relationship that doesn't yet exist. The city you have left and the city you haven't yet arrived in. This interval is uncomfortable because it has no narrative — it is pure gap, pure pause — and also interesting for exactly the same reason. The self in the gap is the self without its usual scaffolding. It is not always pleasant to see clearly.`,
      `Between one thing and the next, you have noticed: there is a version of you that exists only in transitions, that is neither who you were in the last chapter nor who you will be in the next one. This version has access to both and belongs to neither. The transition is uncomfortable and it is also the only time you can see the whole shape of a life from the outside, briefly, before the next chapter closes around you again.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s18InBetweenTime', true) },
  },

  // ── EATING ALONE WITHOUT MINDING ─────────────────────────────────────────

  {
    id: 's18_eating_alone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.partner?.alive &&
      G.age >= 35 &&
      !G.mem?.s18EatingAlone,
    text: pick([
      `At some point the specific sadness of eating alone — the table set for one, the single glass, the meal that finishes without conversation — became something else. Not contentment, exactly. Something quieter: the meal is what it is, you eat it at a pace that is yours, you are not managing anyone's hunger but your own. This is not the life you had planned and it is also a life that has its own textures, some of which you have come to prefer without having planned to.`,
      `You eat alone and you don't mind in the specific way you used to mind. The not-minding took time to arrive. It is not the same as not being lonely. It is the specific relationship with solitude that develops when solitude has been long enough that you have learned its geography: the good hours and the difficult ones, the meals that are pleasant eaten alone and the ones that are not.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s18EatingAlone', true) },
  },

  // ── THE NAME BEING CALLED ─────────────────────────────────────────────────

  {
    id: 's18_name_called',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 55 && !G.mem?.s18NameCalled,
    text: pick([
      `Someone calls a name that is not yours and you turn anyway. The name is close to yours, or has the same first sound, or the voice has a quality that expects you specifically. You turn and see the wrong person looking back at someone else. The misrecognition takes a fraction of a second to resolve. In that fraction you were, briefly, the person being called — expecting something, prepared to respond. The ordinary world returns.`,
      `The name called in a crowd that makes you turn. Not your name — close to it, or in a tone that was directed at someone near you. The moment before you identify the mistake: a moment of pure expectation, the self leaning forward. Then the resolution. You face front again. The person being called, the right person, arrives from somewhere behind you.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18NameCalled', true) },
  },

  // ── CATCHING YOURSELF IN GLASS ────────────────────────────────────────────

  {
    id: 's18_glass_reflection',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 38 && G.age <= 70 &&
      !G.mem?.s18GlassReflection,
    text: pick([
      `The shop window. The glass panel in the office door. The reflection in the train window at night when the tunnel removes everything outside and substitutes you. The person in the glass is older than the person you carry as the interior version of yourself, the one that does not update at the same rate the face does. There is a routine small shock of recognition and then the glass returns to being a window and not a mirror.`,
      `You caught yourself in glass unexpectedly — not prepared to be seen — and the face in the glass was not the face you were expecting. The face you were expecting is younger. The face in the glass has been there for years, updating in ways you approved in the bathroom mirror but did not integrate into the working image of yourself. The glass corrects this briefly before you look away.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18GlassReflection', true) },
  },

  // ── THE LANGUAGE YOU ARE LOSING ───────────────────────────────────────────

  {
    id: 's18_language_losing',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 50 &&
      !G.mem?.s18LanguageLosing,
    text: pick([
      `The language you grew up in is departing. Not dramatically — not gone, not forgotten — but thinning at the edges. There are words that you reach for and find the other language's word first. Idioms that you remember incompletely, needing the context of the sentence around them before they arrive. The language of childhood is the deepest layer and the one that thins last, which is why it is noticeable when it begins: the deepest layer is not supposed to change.`,
      `You dream in the language of the country you live in now. The other language — the first one, the mother-tongue, the one that was the only language of childhood — appears in the dream only in the voices of specific people, speaking specific phrases. The language is not lost. It is becoming the language of those voices and less the language of ordinary thought, which is the first stage of a departure you did not intend to begin.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s18LanguageLosing', true) },
  },

  // ── THE AFTERNOON WITH NO OBLIGATIONS ────────────────────────────────────

  {
    id: 's18_free_afternoon',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 && G.age <= 65 &&
      !G.mem?.s18FreeAfternoon,
    text: pick([
      `An afternoon arrives with nothing required of it. Not a holiday — a holiday has the obligation of being enjoyed. Just an afternoon, unexpectedly cleared, in which you can do anything or nothing. The first hour is strange: the habit of purpose is strong enough that the absence of purpose feels like something is wrong. Then something releases. You move through the afternoon at the speed of the afternoon itself, which is different from the speed you move through afternoons that have a schedule.`,
      `The free afternoon is a form of time that is hard to locate when it is not there and almost uncomfortable at first when it arrives. You have forgotten how to be inside it without planning to leave it. The skill of pure unscheduled time — the walk that goes somewhere on its own, the book opened without a deadline, the meal not connected to anything before or after it — is a skill that requires practice to keep.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s18FreeAfternoon', true) },
  },

  // ── THE SPECIFIC STREET OUTSIDE A HOSPITAL ────────────────────────────────

  {
    id: 's18_hospital_street',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 32 &&
      (G.flags.has('father_died') || G.flags.has('mother_died') || G.flags.has('lost_partner') || G.flags.has('friend_died')) &&
      !G.mem?.s18HospitalStreet,
    text: pick([
      `The street outside the hospital is ordinary in a way that seems wrong. Cars. A café. People going past who are not coming from or going to the thing you are coming from. The street is doing what streets always do and you are unable to participate in the ordinariness of it. This is a form of grief that has no name: the specific protest at the fact that the world continues at its ordinary speed while something has ended or is ending inside the building you just left.`,
      `You have been inside a hospital for long enough that when you walk out into the air the ordinary world feels slightly wrong — running at the wrong tempo, conducted by people who do not know what is happening in the building behind you. The sky is the actual sky. The street is the actual street. The wrongness is not in the street. It is in the fact that the street does not know what you know.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18HospitalStreet', true) },
  },

  // ── THE RADIO WHEN SOMEONE WAS SICK ──────────────────────────────────────

  {
    id: 's18_radio_sickness',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 18 && !G.mem?.s18RadioSickness,
    text: pick([
      `When someone in the house was sick, the radio stayed on at a low volume. Not for information — for company, or because silence in a sick room has its own quality that the radio softened. The specific programs you associate with illness: the ones that ran in the afternoon, the voices with the particular cadence of afternoon broadcasting. You cannot hear that program or that station without the association arriving, the specific stillness of a house with someone sick in it.`,
      `The sound of the house when someone was ill: the particular quiet that is not silence but the suspension of normal noise. Someone moving carefully. The specific low volume of the television or radio that had been adjusted for a sick person. The smell of a particular medicine. These were the textures of childhood illness — your own or someone else's — and they reconstitute themselves completely when they arrive uninvited.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18RadioSickness', true) },
  },

  // ── NOT BEING ABLE TO LEAVE ───────────────────────────────────────────────

  {
    id: 's18_cannot_leave',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.flags.has('emigrated') &&
      (G.character.country?.archetype === 'single_party_communist' ||
       G.character.country?.archetype === 'military_dictatorship' ||
       G.character.country?.archetype === 'single_party_authoritarian' ||
       G.regime === 'military_dictatorship' ||
       G.regime === 'single_party_communist' ||
       G.regime === 'single_party_authoritarian') &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.s18CannotLeave,
    text: pick([
      `You cannot leave. Not without permission, not without a passport that requires permission, not without giving up the family who cannot leave with you. The fact of this is not always present in the foreground — daily life does not consist primarily of the feeling of being trapped — but it surfaces at specific moments: when someone describes a place you will not visit, when you calculate what a journey would require, when you realise that the desire to stay or leave is not equally available in all directions.`,
      `The border exists in a way that is not abstract. It is a set of papers that require approval and an approval that requires a specific relationship with the apparatus that you do not have or cannot risk obtaining. The freedom of movement that people in other countries treat as ordinary — the decision to go somewhere and then go there — requires here a set of negotiations that convert the decision into an application and the application into a wait.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 3; p.setMem('s18CannotLeave', true) },
  },

  // ── THE SMELL OF A PLACE ──────────────────────────────────────────────────

  {
    id: 's18_smell_of_place',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s18SmellOfPlace,
    text: pick([
      `The smell of the place where you grew up. Not a single smell — a composite that arrives whole and without warning when a combination of temperature and humidity and something else makes the conditions right. Earth after rain, if it was that kind of place. Diesel and food, if it was the city. A specific plant that grew along that particular road. The smell is attached to the age you were when you last lived in that smell, which means it does not arrive alone. The memory that comes with it is specific in the way only early memory is specific.`,
      `Something triggers the exact smell of a house you lived in as a child. Not the house you think of when you think of childhood — one of the earlier ones, a house you have not consciously visited in thirty years. The smell is precise: the particular arrangement of materials and cooking and weather that constituted that interior. You are briefly in two places at the same time. Then the smell passes and you are only where you are.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s18SmellOfPlace', true) },
  },

  // ── THE OLD PHONE NUMBER ──────────────────────────────────────────────────

  {
    id: 's18_old_phone_number',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 1985 && G.age >= 35 && !G.mem?.s18OldPhoneNumber,
    text: pick([
      `The phone number of the house you grew up in. You still know it. It is in the region of your memory where things are stored not because you maintain them but because they arrived early enough that they are simply part of the furniture. The number no longer reaches anyone — the house is sold, the line is disconnected, the person who answered is gone. But the number is still available, still precise, still ready to be dialed, which is a small specific form of grief.`,
      `There is a number you know that no longer connects to anyone you know. The childhood home. The relative who has died. The office of the company that closed. The number exists in your memory with complete precision. What it once reached does not. The number is exact and the thing it was exact about is gone, and the exactness is the part that won't let go.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18OldPhoneNumber', true) },
  },

  // ── PHOTOGRAPHS OF YOURSELF HAPPY ────────────────────────────────────────

  {
    id: 's18_photo_when_happy',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s18PhotoHappy,
    text: pick([
      `The photograph is from a time you were happy — genuinely, unreservedly, without knowing that was what it was. You were not performing happiness for the camera. The camera caught it incidentally, alongside the event. The person in the photograph has not yet experienced several things that the person looking at the photograph has experienced. The person in the photograph is also, unmistakeably, you. This is both evident and, at a certain angle, extraordinary.`,
      `In the photograph you are laughing at something that happened before the photograph was taken, the residue of it still in your face. The photographer caught the aftermath of a moment, not the moment itself. You cannot remember what the moment was. The face in the photograph knows, or knew, and the knowing has not been transferred to the version of you who is looking at it now.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('s18PhotoHappy', true) },
  },

  // ── THE WAITING ROOM AGAIN ────────────────────────────────────────────────

  {
    id: 's18_waiting_room',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s18WaitingRoom,
    text: pick([
      `The waiting room is a specific kind of place. Not an unpleasant place necessarily, but a place with its own gravity: the particular weight of waiting, the magazines that are too old to be current and too new to be interesting, the other people who are also waiting and whose reasons for waiting are not your business but are legible anyway in small ways. The waiting room is where the ordinary machinery of bureaucracy and medicine and administration becomes most visible to the people it serves.`,
      `In the waiting room you are in a position that almost never occurs elsewhere: you are with strangers who share a situation but not an identity. Something has brought you all here and something will take you somewhere else. The conversation that sometimes starts in a waiting room — the brief, honest conversation that happens between strangers who have been placed in the same uncertain position — is one of the more honest conversations of adult life.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18WaitingRoom', true) },
  },

  // ── THE SPECIFIC SATISFACTION OF SMALL COMPLETIONS ────────────────────────

  {
    id: 's18_small_completion',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 70 && !G.mem?.s18SmallCompletion,
    text: pick([
      `The specific satisfaction: the shelf assembled, the drawer that closes properly now, the path through the park you have finally memorised to avoid the mud section, the form filed. The satisfaction is exactly proportional to the task and is complete in itself. It does not require a larger purpose to justify it. The shelf is level. You know where the screwdriver is. These small completions accumulate into something that does not have a name but is recognisable as one of the reliable textures of an ordinary life.`,
      `Something small is finished. A task that required persistence across several days or the patience to wait for the right tool or the correct amount. Its completion produces a satisfaction that is clean and specific, uncontaminated by the things that have not been finished. For this particular hour, the completed thing is the horizon. That will shift. For now, the thing is done and the fact of its doneness is enough.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s18SmallCompletion', true) },
  },

  // ── THE OBJECTS OF OLD AGE ────────────────────────────────────────────────

  {
    id: 's18_objects_old_age',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s18ObjectsOldAge,
    text: pick([
      `The objects specific to this stage of life that were not part of earlier stages: the pill organiser sorted on Sundays, the reading glasses in three locations in case one pair is lost, the specific phone configuration that makes the text large enough, the shoes that prioritise stability over appearance. None of these are the objects you would have chosen at forty. None of them are objects you would trade away now. They constitute a small infrastructure of managing, which is not the same as giving up.`,
      `The specific objects that have accumulated: not the accumulation of youth, which is acquisitive, or of middle age, which is curated. The accumulation now is functional and precise. The things that remain are the things that help with something specific. You know where everything is. The objects are arranged for use rather than display. There is a coherence to this that took a long time to arrive.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s18ObjectsOldAge', true) },
  },

  // ── WHAT THE BODY HOLDS ───────────────────────────────────────────────────

  {
    id: 's18_body_holds',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s18BodyHolds,
    text: pick([
      `The body has been keeping records you did not authorise. The position you automatically adopt in a tense conversation — the one your parents adopted, the one you recognised with a delay of several years. The physical response to a specific kind of authority. The way your hands move when you are thinking. These are not behaviours you chose. They are things the body learned and stored in a region that decision-making cannot reach, and they were there before you noticed them.`,
      `There are physical habits you inherited without knowing: the way you fold your arms, which is the way your father folded his arms. The specific gesture you make when you are uncertain, which you recognise in photographs of people you are descended from. The body is the oldest part of the inheritance, and it passes things forward in a form that does not have to declare itself at the border.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s18BodyHolds', true) },
  },

  // ── THE SPECIFIC QUALITY OF SUNDAY EVENINGS ───────────────────────────────

  {
    id: 's18_sunday_evening',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 60 && !G.mem?.s18SundayEvening,
    text: pick([
      `Sunday evening has a specific quality that distinguishes it from all other evenings: the quality of the week approaching, the window closing on whatever the weekend permitted. The quality has been with you since school, when Sunday evening meant the end of the interval between obligations. It has modified slightly as an adult but has not disappeared. The week arrives at the same time each week and the Sunday evening knowledge of it is older than almost anything else you know.`,
      `The dimming light of Sunday evening. The specific feeling that arrives around five or six o'clock on a Sunday when the weekend recedes into what remains of it and the week appears ahead. This feeling was first learned as a child and has never fully updated. The adult week is different from the school week. The Sunday evening feeling does not know this.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18SundayEvening', true) },
  },

  // ── WHAT SOMEONE USED TO SAY ──────────────────────────────────────────────

  {
    id: 's18_phrase_of_dead',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('father_died') || G.flags.has('mother_died')) &&
      G.age >= 40 &&
      !G.mem?.s18PhraseOfDead,
    text: pick([
      `There is a phrase someone used to say — your father, your mother, someone else who is gone — that you now find yourself saying. Not deliberately. The phrase emerged in a conversation because it was the right phrase for the situation, and it was the right phrase for the situation because you absorbed it over years of hearing it used correctly. The dead inhabit the living partly through this: the phrases that transfer, that arrive unbidden in the mouth of someone who learned them from listening.`,
      `A phrase from your parents' speech that you have now adopted. Not their manner of speaking generally — just this phrase, this specific formulation, which you heard often enough that it became available to you. You heard yourself say it and recognised the origin. The person who said it first is gone. The phrase continues.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18PhraseOfDead', true) },
  },

  // ── THE TRAIN STATION AT NIGHT ────────────────────────────────────────────

  {
    id: 's18_train_station_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1940 &&
      G.age >= 18 && G.age <= 55 &&
      !G.mem?.s18TrainStationNight,
    text: pick([
      `The train station at night is a different place from the train station in the morning. The same building, the same board, but the population at this hour is specific: people going home late, people arriving from somewhere they didn't plan to be, people spending the night in the waiting area because the night has nowhere else to put them. The station at night has the quality of a place that never quite closes, that goes on processing arrivals and departures at a slower tempo but without the stop that most places permit themselves.`,
      `You are at the station at an hour when the platform is almost empty. A train comes and goes. The few people who arrived scatter into the city. The platform returns to its quiet. You have had this experience — the late train, the quiet arrival — enough times that the station at night feels like a specific place rather than a time variation on the daytime station. It is the same tiles and the same roof and it is somewhere else.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18TrainStationNight', true) },
  },

  // ── THE SPECIFIC WEIGHT OF NEWS ───────────────────────────────────────────

  {
    id: 's18_weight_of_news',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 1990 && G.age >= 30 && !G.mem?.s18WeightOfNews,
    text: pick([
      `The news arrives with a weight that has changed over time. At twenty you had an absorption capacity for each new disaster that has been worn down by repetition. The same quality of catastrophe that shocked at twenty produces something different now: a knowledge of the pattern, a recognition of the sequence, a specific exhaustion that is not indifference but its cousin. You still care. The caring has become heavier to carry.`,
      `The specific relationship with the news that develops after enough years of watching. The events are not smaller than they were. The suffering is not more distant. But the processing capacity has a history now, and the history makes every new event arrive with all the previous ones attached. This is the specific burden of having paid attention for a long time.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s18WeightOfNews', true) },
  },

  // ── THE QUESTION YOU SHOULD HAVE ASKED ───────────────────────────────────

  {
    id: 's18_question_not_asked',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      (G.flags.has('father_died') || G.flags.has('mother_died')) &&
      !G.mem?.s18QuestionNotAsked,
    text: pick([
      `There is a question you should have asked while there was still someone to ask. You know what the question is. You know who would have answered it, and approximately what the answer would have begun with, and why you didn't ask it — not enough time, not the right moment, the assumption that there would be more time, the difficulty of a question that required a particular kind of honesty from both parties. The answer does not exist now. The question remains. It is the type of loss that does not grow smaller with time, only more precisely shaped.`,
      `The question you did not ask your mother or your father. Not the practical question — you know those answers, or it no longer matters — but the question underneath it: what they were afraid of, what they never finished, what they would have changed. You could have asked. You were in the same room many times and the question was available. You understand now that you were waiting for them to offer the answer without being asked, which is not how answers arrive.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s18QuestionNotAsked', true) },
  },

  // ── THE CITY YOU KNOW BY SOUND ────────────────────────────────────────────

  {
    id: 's18_city_by_sound',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 30 && G.age <= 60 &&
      !G.mem?.s18CityBySound,
    text: pick([
      `You know this city well enough to know it by sound. The particular intersection that is always loud at certain hours. The building site that has been ongoing for two years and whose sounds have become part of the texture of this block. The specific sound of the rain on the particular type of roof or window or street surface here, which is different from rain elsewhere. A city you know well is a city you know with all the senses, and the sound layer is the one that persists the longest when you are away and the first one you recognise when you return.`,
      `The city has a sound that is only audible when you have been away long enough to stop hearing it, and then returned. The compound of engines and voices and specific rhythms of this place that constitute its ambient signature. You have been away for long enough that the sound arrived on your return as something named: this is what this city sounds like. Then it dissolved back into the ordinary background and became inaudible again.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s18CityBySound', true) },
  },

]

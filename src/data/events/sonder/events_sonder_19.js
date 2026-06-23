// events_sonder_19.js — Contemplative layer, batch 19
//
// 28 quiet-year prose events across: the specific quality of other people's
// arguments you overhear, the handshake as a technology of trust, what you
// pass through on the way to somewhere else, gardens and what they teach,
// the specific pleasure of expertise in a small thing, what rain looks like
// from inside looking out, the specific quality of work that no one sees,
// the conversation that changed something without announcing it, letters you
// received and what happened to them, the table where your family ate,
// the specific quality of a voice you can no longer hear, the walk you took
// when something had just happened, what you understand about your parents
// now that you could not understand then.
//
// All weight 2, mem-gated, no choices, minimal stat effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_19 = [

  // ── OVERHEARD ARGUMENT ────────────────────────────────────────────────────

  {
    id: 's19_overheard_argument',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 60 && !G.mem?.s19OverheardArgument,
    text: pick([
      `The argument happening in the next room, or through the wall, or at the table adjacent in the restaurant. You are not involved and cannot fully hear it — enough to understand the category, not enough to understand the content. The specific intimacy of an overheard argument between people you cannot see: the tone of each voice, the rhythm of who speaks when, the quality of the silence after the longest speech. You are an accidental witness to something that is not about you and is briefly about you anyway, because you are there.`,
      `The argument through the wall. You know from the voices that it is the couple next door and you know from the rhythm that it is not a new argument. You cannot make out the words. The texture — the specific escalation and the specific withdrawal and the specific long silence — is legible without the content. You have been on the other side of a wall like this. Someone in another room heard that rhythm without the words.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19OverheardArgument', true) },
  },

  // ── THE HANDSHAKE ─────────────────────────────────────────────────────────

  {
    id: 's19_handshake',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.s19Handshake,
    text: pick([
      `The handshake is a technology of trust that has not changed in its essentials for several thousand years. The grip, the duration, the eye contact, the specific pressure: each is information. You have shaken enough hands to know more than you are formally aware of knowing. You know certain things before the conversation starts. You know when the grip is wrong in a way that means something and when it is wrong in a way that means nothing. This is a very small expertise that has no name and no credential.`,
      `The specific handshake that told you something. Not in an obvious way — not the limp handshake or the crushing one, which are legible immediately — but in a subtler way: the duration, the slight adjustment in grip mid-contact, the particular angle. You filed it away without deciding to. Later in the meeting or the conversation, the filed-away thing proved relevant. The handshake was the first sentence of the interaction. You had read it correctly.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s19Handshake', true) },
  },

  // ── PASSING THROUGH ───────────────────────────────────────────────────────

  {
    id: 's19_passing_through',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 55 && !G.mem?.s19PassingThrough,
    text: pick([
      `The places you passed through on the way to somewhere else: the train station of a city you did not visit properly, the town where you stopped for fuel and ate something at the roadside and left, the airport terminal in a country you spent six hours in. You have a very thin knowledge of these places — the quality of the light at that hour, the sound of one place you stood, the face of one person you interacted with. This is not knowledge of the place. It is the record of a crossing.`,
      `In transit, you went through a place that people live in. People were going to work. A market was open. A school let out. You moved through it on your way to somewhere else and saw a cross-section of a life that is continuing after you left. The place has not changed because you passed through it. The passing is an event in your history that is not an event in the history of the place.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19PassingThrough', true) },
  },

  // ── THE GARDEN ────────────────────────────────────────────────────────────

  {
    id: 's19_garden',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 70 && !G.mem?.s19Garden,
    text: pick([
      `The garden teaches the same lesson in each season, which is the lesson of timing. The seed that goes in at the wrong week fails. The plant that needs more water than you gave it fails quietly, without announcement, over several days. The thing you did in autumn is still in the ground in spring. The garden is a very slow feedback mechanism that requires patience and attention over the full year, and it is one of the few systems in adult life that cannot be rushed.`,
      `The garden — even a very small one, even a set of containers on a balcony — is a commitment to the future in a specific way. You put something in the ground that will not be what it is going to be for months. The care you give now will express itself later, when you are a different person from the person who put it in. The garden operates on a timetable that is not yours to set.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19Garden', true) },
  },

  // ── EXPERTISE IN A SMALL THING ────────────────────────────────────────────

  {
    id: 's19_small_expertise',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.s19SmallExpertise,
    text: pick([
      `There is something small you know how to do better than almost anyone you know. Not a professional skill — something adjacent to life rather than to career. The specific technique for a particular repair. The knowledge of which wild plants are edible and how to prepare them. The ability to read a particular kind of weather. The skill is real and has been learned over years and is largely invisible because there is no context in which to display it without seeming strange. You are the expert in a thing that has no audience.`,
      `The thing you know how to do that took years and is useless in most of the situations your life consists of. You know how to navigate by stars, or how to read a particular kind of person's intention, or how to make a specific dish to the level of art. The skill is complete and fully formed and largely private. You use it rarely. You remember acquiring it in stages, the specific pleasures of each new level of the thing.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s19SmallExpertise', true) },
  },

  // ── RAIN FROM INSIDE ──────────────────────────────────────────────────────

  {
    id: 's19_rain_inside',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.s19RainInside,
    text: pick([
      `Rain seen from inside — from a window, in the specific warmth and stillness of the interior while the water works on the glass. The specific pleasure of this is ancient and does not require explanation: being in the protected place while the unprotected world manages as it can. You have been on both sides of this more times than you can count. Today you are inside. The pleasure is not diminished by knowing it is ordinary.`,
      `The window in rain. The specific pattern the drops make on glass before they merge and run. The sound, which is different depending on what the rain lands on: the roof, the leaves, the concrete of the street, the metal of the drain. You know the specific sound of rain in this place from inside, which is different from the sound in other places you have lived. You know the rain of several places by sound without knowing you memorised it.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19RainInside', true) },
  },

  // ── WORK NO ONE SEES ─────────────────────────────────────────────────────

  {
    id: 's19_unseen_work',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 30 && !G.mem?.s19UnseenWork,
    text: pick([
      `The work that no one sees: the preparation for the thing that goes well, the maintenance that prevents the failure, the reading that made the answer possible, the correction that prevented the error. The visible work is the surface. The unseen work is most of the work, and the unseen work is invisible by design — when it is done correctly, it removes its own evidence. You have spent years doing this kind of work. Its absence is legible when the visible work fails; its presence is not legible when the visible work succeeds.`,
      `Most of what you do at work produces nothing visible. The thinking, the preparation, the management of the thousand small problems that don't become large problems because you managed them. The visible output is the deliverable, the presentation, the product. The invisible output is the particular shape of the thing that did not go wrong. The invisible output is larger than the visible one and is not credited in any accounting.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s19UnseenWork', true) },
  },

  // ── THE CONVERSATION THAT CHANGED SOMETHING ───────────────────────────────

  {
    id: 's19_changing_conversation',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.s19ChangingConversation,
    text: pick([
      `There was a conversation that changed something without announcing itself as a conversation that would change something. You were not in a significant setting. It was not a formal occasion. The other person said something — a question, an observation, a piece of information offered as ordinary — and something shifted in you that has not shifted back. You did not notice the shift in the moment. You noticed it weeks later when you found yourself thinking differently about a thing that you had previously thought about in the old way.`,
      `The conversation was with someone you see often, or someone you met briefly, or someone who has since died. It did not have the structure of a revelation. It was not a moment you would have identified as important while it was happening. The importance appeared after the fact, from the evidence of how you have thought and acted since. The conversation was the cause. The effects are visible to you now in ways they weren't at the time.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s19ChangingConversation', true) },
  },

  // ── THE LETTERS YOU RECEIVED ──────────────────────────────────────────────

  {
    id: 's19_letters_received',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear <= 2000 && G.age >= 30 && !G.mem?.s19LettersReceived,
    text: pick([
      `The letters you received. Not all of them — the administrative ones, the bills, the obligatory ones — but the letters that were written for you specifically, in the specific handwriting of a specific person, containing the specific things they chose to say on a specific day. You have kept some of them. The ones you kept are the ones that arrived at a moment when they were needed, or said something that the person could not say in person, or were from someone who is now gone and whose handwriting is now the only physical record of how they thought and spoke.`,
      `There is a box or a drawer with letters in it. The letters are from a period of your life when letters were how long distances were managed. To read them now is to read documents from an earlier self — the self that received this news, this reassurance, this declaration — as well as documents of the people who sent them. The letter is a specific form of intimacy that does not survive translation into other formats.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s19LettersReceived', true) },
  },

  // ── THE TABLE WHERE YOU ATE ───────────────────────────────────────────────

  {
    id: 's19_family_table',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s19FamilyTable,
    text: pick([
      `The table where your family ate. The specific seating arrangement that was never declared and was never changed. Your place, which was your place because it had always been your place — you cannot identify the moment it became yours. The objects that were always on the table during meals: the salt in its specific container, the thing that held the napkins, the worn patch on the surface at a certain end. You sat at that table for so many meals that the specific arrangement of it is one of the most precisely remembered spaces you know.`,
      `The meals at the table. Not the significant ones — not the birthday dinners or the holiday feasts — but the ordinary ones, the evening meal repeated across a thousand evenings with the ordinary conversation and the ordinary news and the specific way each person at the table was present. Those meals were the daily reassertion of the family as a unit. They felt ordinary because they were ordinary. Their absence is the thing that makes the ordinary visible.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s19FamilyTable', true) },
  },

  // ── THE VOICE YOU CAN NO LONGER HEAR ─────────────────────────────────────

  {
    id: 's19_voice_gone',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 50 &&
      (G.flags.has('father_died') || G.flags.has('mother_died') || G.flags.has('lost_partner') || G.flags.has('friend_died')) &&
      !G.mem?.s19VoiceGone,
    text: pick([
      `There is a specific voice you can no longer hear. You know what it sounded like. You know the particular cadence, the specific laugh, the way the voice went when it was unsure or when it was certain or when it was telling a story it had told before. The voice existed in recordings, occasionally — a voicemail you kept longer than was practical, a video someone made at a celebration. The recording is not the voice. The recording is a record of the voice. The voice is what you carry in memory, and memory is what it always is: real and unreliable and the only version you have.`,
      `The voice you can no longer hear is in the category of specific irreversible things. The face in a photograph can be updated in your imagination — you can age it or soften it or make it more exact. The voice in memory is fixed at the moment it last updated, which was when you last heard it. You cannot hear what it would sound like now. What you have is what you heard, which is something and not enough.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s19VoiceGone', true) },
  },

  // ── THE WALK AFTER ────────────────────────────────────────────────────────

  {
    id: 's19_walk_after',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 25 && G.age <= 70 && !G.mem?.s19WalkAfter,
    text: pick([
      `The walk you take when something has just happened. Not a planned walk — the walk that starts because you needed to be moving rather than still, because the walls of the room had become the wrong size for what was inside you. The walk goes somewhere or nowhere. The walk produces thinking that sitting cannot produce, which is why walking is older than most of the other things people do when they need to process something. You have taken this walk enough times to have a route. The route was not chosen. It accumulated.`,
      `After a certain kind of news, you walked. The city or the neighbourhood was what it always is — ordinary, continuous, proceeding at its own speed — and you moved through it with the specific weight of the thing that had just happened still on you. The walking and the world's ordinariness were not opposed: the world's ordinariness was the thing you needed. The contrast between the interior state and the exterior world is sometimes what allows the interior state to settle.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19WalkAfter', true) },
  },

  // ── WHAT YOU UNDERSTAND ABOUT YOUR PARENTS NOW ───────────────────────────

  {
    id: 's19_parents_understood',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 40 && G.age <= 65 &&
      (G.parents?.father || G.parents?.mother) &&
      !G.mem?.s19ParentsUnderstood,
    text: pick([
      `You are old enough now to understand some things about your parents that you could not understand from inside the position of being their child. The specific pressures of the age they were when you were young. The marriage as it was from inside it rather than as it appeared from where you were standing. The decisions that seemed arbitrary and were not. The decisions that seemed considered and were not. The understanding is not forgiveness — forgiveness is something else — but it is a view from a different angle, which is the thing that being the same age they were gives you.`,
      `At the age your mother was when you were twelve, or your father when you were fifteen, you can see the position from the inside now. The things they were managing. The specific decade and its pressures. The relationship between them, which you saw as a child from the position of needing them and saw as an adolescent from the position of resisting them and can see now from the position of someone who has been in the middle of a life of their own for long enough to understand that being in the middle of a life is difficult in specific ways that childhood cannot show you.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s19ParentsUnderstood', true) },
  },

  // ── THE OBJECT THAT OUTLASTED ─────────────────────────────────────────────

  {
    id: 's19_object_outlasted',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s19ObjectOutlasted,
    text: pick([
      `There is an object in your possession that has outlasted the context in which you acquired it. The relationship the object came from is over. The place where you lived when you got it no longer exists in the form you knew it. The purpose the object served has been replaced by something else. The object remains — functional or no longer functional, used or placed somewhere it is kept — because getting rid of it would be a decision that hasn't been made. The object persists through the inertia of not yet being decided against.`,
      `The object that has been with you longest. Not the most valuable or the most used, but the one that has simply persisted across the most changes: the moves, the relationships, the versions of yourself that succeeded each other. The object has no particular meaning. It has accumulated time, which is different from meaning but which produces a mild feeling in the same region where meaning is felt.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s19ObjectOutlasted', true) },
  },

  // ── THE SPECIFIC SMELL OF ANOTHER PERSON'S HOUSE ─────────────────────────

  {
    id: 's19_others_house_smell',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 20 && !G.mem?.s19OthersHouseSmell,
    text: pick([
      `A friend's house has a specific smell that is not the smell of your own house. Your own house has no smell you can identify from inside it — you are inside the smell of your own house, which means you cannot perceive it separately from the house. The friend's house announces itself. The cooking in it, the cleaning products, the particular arrangement of materials and people and habits that produces a composite that belongs to that household. You will recognise the smell of this house in thirty years if you encounter it again.`,
      `The houses of people you knew in childhood each had their own smell that you knew before you knew anything more articulable about them. The friend whose house smelled of a particular food. The relative whose house smelled of something you could not name then and can now. The smell of a house is the composite of the life being lived in it, and it is legible to visitors in ways it is not legible to the people inside it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19OthersHouseSmell', true) },
  },

  // ── THE PHRASE YOU SAY TO YOURSELF ────────────────────────────────────────

  {
    id: 's19_self_phrase',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s19SelfPhrase,
    text: pick([
      `There is a phrase you say to yourself — internally, not aloud — that you have been saying for years without being able to identify when you started. A phrase for the moment just before something difficult. A phrase for the moment when something has gone wrong and needs to be managed. A phrase that functions as the verbal equivalent of taking a breath. You do not know where it came from. It arrived before you thought to notice it arriving and has been there since.`,
      `The internal monologue has habits. Certain phrases that recur when certain states arrive. The phrase you use to encourage yourself when something is harder than anticipated. The phrase you use to manage a small failure. These phrases are so habitual that they have become part of the background of thinking rather than objects in the foreground. Someone would have to point them out before you could identify them. You have been saying some of them for twenty years.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s19SelfPhrase', true) },
  },

  // ── THE NEIGHBOUR WHOSE NAME YOU DON'T KNOW ──────────────────────────────

  {
    id: 's19_unnamed_neighbour',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 25 && G.age <= 65 &&
      !G.mem?.s19UnnamedNeighbour,
    text: pick([
      `There is a neighbour whose name you do not know. You have lived near this person for two years, or five years, or longer, and you know their face and their schedule and the approximate weight of their footsteps on the stairs and the specific time their alarm goes off in the morning. You have never exchanged more than the nod of mutual recognition in the hallway. The nod is a relationship. You would notice if it ended. You will not know their name when they leave.`,
      `The people whose routines you have learned without meeting: the upstairs neighbour who paces at eleven at night, the one across the street who leaves at the same early hour every morning, the person in the flat below who plays the same music on Sunday evenings. You know them with the precision that proximity produces, which is not the same as knowing them. If you met at a remove from the building you share, you would not recognise each other.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19UnnamedNeighbour', true) },
  },

  // ── THE SPECIFIC FEELING OF A LIBRARY ────────────────────────────────────

  {
    id: 's19_library_feeling',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 22 && !G.mem?.s19LibraryFeeling,
    text: pick([
      `The specific feeling of a public library: a place that contains more than you can read in a lifetime, organised in a system you have partially learned to navigate, where the expectation is not that you will read everything but that you are free to read anything. The library is one of the stranger institutions of civic life — a building full of things that are free for the taking, on condition that you bring them back. The trust on which this rests is mostly honoured.`,
      `The library in your town or your school or your neighbourhood. The specific smell of it, which is the smell of paper and controlled air and a specific kind of quiet. You learned early to navigate the system — the numbers on the spines, the way the sections divided — and the navigation was one of the first intellectual skills you acquired that was genuinely useful. You can still navigate it. The system has not changed. You have grown taller than the shelves you first learned on.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s19LibraryFeeling', true) },
  },

  // ── THE ANIMAL IN THE HOUSE ───────────────────────────────────────────────

  {
    id: 's19_animal_in_house',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.pets?.length > 0) &&
      G.age >= 25 &&
      !G.mem?.s19AnimalHouse,
    text: pick([
      `The animal in the house knows you in a way that is not human and therefore not comparable to being known in a human way, and yet it is knowledge. The animal knows your schedule, your moods in the approximate way moods can be read from posture and approach, the specific sounds that mean what they mean. The relationship is not symmetrical — you know what the animal cannot know about itself — and is also not one-directional. The animal's attention to you is not performance.`,
      `The animal asleep in the specific place it always sleeps. The routine negotiated over months until it became the routine: the time of feeding, the expectation at the door, the place on the furniture that was at some point conceded. The animal's presence organises small parts of the day in ways you would notice if they stopped. This is not nothing. The noticing is not nothing.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19AnimalHouse', true) },
  },

  // ── WHAT THE COMMUTE TAUGHT ───────────────────────────────────────────────

  {
    id: 's19_commute_taught',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.career &&
      G.ruralUrban === 'urban' &&
      G.age >= 22 && G.age <= 50 &&
      !G.mem?.s19CommuteTaught,
    text: pick([
      `The commute teaches patience and people-watching and the management of small discomfort. It teaches the specific face of a city at the hour when it is going to work — a different population, moving in a different register, carrying the morning's particular quality of compressed intention. The commute is time that is neither home nor work, and it belongs to you in a way that neither home nor work fully does. What you did in that time — the reading, the looking out the window, the thinking that had no particular destination — was a form of private time inside a shared space.`,
      `Years of the same commute. The face of it in winter and the face of it in summer. The delay that became familiar and the specific irritation it produced that became familiar and then subsided into a texture of the journey rather than an event in the journey. The commute was not productive time in the way the workday was productive time. Something else happened in it. You are not sure what to call what happened in it except that it was yours.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s19CommuteTaught', true) },
  },

  // ── THE SPECIFIC QUALITY OF A SUNDAY MORNING ─────────────────────────────

  {
    id: 's19_sunday_morning',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.s19SundayMorning,
    text: pick([
      `Sunday morning has a light that is specific to Sunday morning — lighter than a Monday, slower than a Saturday. The street is quieter than other mornings. The absence of the weekday urgency produces a particular quality of time. You have known this quality all your adult life. It varies by the circumstances — a Sunday morning when you have nowhere to be is different from a Sunday morning when you have somewhere to be at noon — but the baseline quality persists regardless of what fills it.`,
      `The Sunday morning sounds: the neighbourhood at a slower frequency. The shops that are closed. The particular quality of a street when most of the people on it are not going to work. Somewhere there are bells, or there are not bells, but the expectation of bells is part of the texture regardless. You have spent hundreds of Sunday mornings in this specific slightly-slower time. The Sunday morning of your childhood and the Sunday morning of now are the same phenomenon at different ages.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19SundayMorning', true) },
  },

  // ── WHAT CHILDREN TAUGHT YOU ──────────────────────────────────────────────

  {
    id: 's19_children_taught',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.children?.length > 0 &&
      G.age >= 38 &&
      !G.mem?.s19ChildrenTaught,
    text: pick([
      `The children taught: how to be looked at with total expectation, which is not the same as being admired. They taught the specific limits of what you can control — the enormous effort that goes into producing a person who then becomes, despite the effort and in some cases because of it, themselves. They taught you what love without negotiated conditions looks like from the inside of it. They taught you what it is to be responsible for someone who will one day be responsible for themselves, which is the strange arc of the whole thing.`,
      `What you learned from having children: a specific kind of attention you did not previously have, directed at a thing outside yourself that you cannot fully control. The sleep that is always partial for years. The specific way the world becomes dangerous again after years of taking it as safe. The exhaustion that is not the same as the exhaustion of other things. And the other thing, which is harder to name, which is what it is to have someone in the world who is in the world partly because you are.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s19ChildrenTaught', true) },
  },

  // ── THE LAST TIME YOU DID A THING ─────────────────────────────────────────

  {
    id: 's19_last_time',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s19LastTime,
    text: pick([
      `You did not know it was the last time when it was the last time. The last time you ran for exercise. The last time you climbed something. The last time you ate at a particular place before it closed. The last time you saw a particular person before they died or before the relationship ended. The last times are only identifiable in retrospect, which means you never know you are in them while you are in them. You move through potential last times without knowing which will prove to be last.`,
      `The last times arrive unannounced and are only identified afterward. The last time you did the thing you used to do every year. The last time you were in the state of not-yet-knowing something that you now know permanently. The last time you felt what you felt before. The last time, by definition, is the time after which comes the absence, and the absence arrives before the identification of the last time, so the identification is always retrospective.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s19LastTime', true) },
  },

  // ── THE SPECIFIC PLEASURE OF EXPERTISE ───────────────────────────────────

  {
    id: 's19_deep_expertise_pleasure',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career?.level >= 2 &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.s19DeepExpertisePleasure,
    text: pick([
      `The specific pleasure of expertise: when the problem arrives and the answer arrives with it, not as a conclusion to a chain of reasoning but as a whole thing, present before the reasoning that would support it. You know the reasoning — you could produce it — but the knowing preceded the reasoning. This is what twenty years produces: not just the facts but the pattern-recognition that operates faster than conscious thought, delivering verdicts that the conscious mind then endorses.`,
      `At this level of practice, the work produces a pleasure that is not available to beginners: the pleasure of difficulty that is not too difficult, of the problem that requires everything you know but no more. The challenge and the competence are calibrated to each other. This is the thing that the years of learning were building toward — not mastery as a destination, but mastery as the opening of a new layer of difficulty that is precisely commensurate with what you have become.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s19DeepExpertisePleasure', true) },
  },

  // ── THE SPECIFIC SILENCE AFTER A CALL ────────────────────────────────────

  {
    id: 's19_silence_after_call',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s19SilenceAfterCall,
    text: pick([
      `The specific silence after a phone call with someone you love and rarely speak to. The call lasted as long as it lasted and covered what it covered and ended with the particular awkwardness or naturalness of endings. Then the phone is down and the room is quiet. The conversation continues in your head for a few minutes without the other person present: the things you should have asked, the things they said that are still being processed. Then that too fades and the room returns to being the room.`,
      `The conversation with the parent or sibling or old friend you speak to rarely and at length when you do. After the call, the quality of the ordinary room has changed slightly. The people in the conversation are in the room briefly, in the way that conversations carry people into the space where they happened. Then the room reasserts itself and the conversation is in the past and the room is the room again.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s19SilenceAfterCall', true) },
  },

  // ── THE FACE YOU CANNOT PLACE ─────────────────────────────────────────────

  {
    id: 's19_unplaced_face',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 65 && !G.mem?.s19UnplacedFace,
    text: pick([
      `A face you cannot place. You know you know it — the knowledge is certain in the way immediate recognition is certain — but the context will not come. The face is separated from its setting, floating in the wrong frame. You cycle through contexts — school, work, a neighbourhood, a specific occasion — and the face doesn't land in any of them. Then either it comes, or it doesn't, and in either case the person has moved past and the opportunity to resolve the question is closed.`,
      `The face that arrives with the certainty of recognition and without the context. The brain insists it knows this person. The brain cannot say from where. This is a specific failure mode of a system that usually works well: the person is filed somewhere in the archive and the index to the file is unavailable. The certainty without the access is disorienting in a small way. You have learned to live with the small disorientation rather than chase it, which is the right strategy and not always the instinct.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19UnplacedFace', true) },
  },

  // ── THE TOWN THAT SHRANK ──────────────────────────────────────────────────

  {
    id: 's19_shrunken_town',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 30 &&
      !G.mem?.s19ShrunkenTown,
    text: pick([
      `The town or the neighbourhood you grew up in, returned to as an adult, is smaller than you remembered. Not physically smaller — the streets are the same width, the buildings the same height — but smaller in the specific sense that the scale of a child's world and the scale of an adult's world are measured differently. The journey from the house to the school, which was an expedition at eight, is ten minutes. The enormous park is a moderate open space. The far end of the street, which was the edge of the known world, is visible from the near end.`,
      `You went back to the place from childhood and found it had not changed in the ways you expected. The building you thought was large is not large. The distance you thought was far is not far. What has changed is not the place but the instrument of measurement. The child measured in the available range of a child's world. You measure now in the range of everything you have seen since.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.r += 2; p.setMem('s19ShrunkenTown', true) },
  },

  // ── WHAT BOREDOM PRODUCES ─────────────────────────────────────────────────

  {
    id: 's19_boredom_produces',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 16 && !G.mem?.s19BoredomProduces,
    text: pick([
      `The specific boredom of childhood that was not scheduled away. The summer afternoon with no program, the rainy day with nothing arranged, the long stretch of time that required you to find something to do with it or remain in the boredom. What the boredom produced: the invented games, the elaborate structures built from available materials, the stories that had to exist because there was nothing else to do with the afternoon. The boredom was the condition that produced the invention.`,
      `Before the screen was always available, boredom lasted long enough to become something else. Not something better necessarily — just something different. The imagination found its way in through the gap that boredom opened. The gap is harder to access now. The gap was not comfortable. The gap was also where certain things were learned that the absence of the gap has made less common.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s19BoredomProduces', true) },
  },

  // ── THE HOSPITAL WARD AT NIGHT ────────────────────────────────────────────

  {
    id: 's19_hospital_ward_night',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      (G.flags.has('cancer_survivor') || G.flags.has('father_died') || G.flags.has('mother_died') || G.flags.has('lost_partner')) &&
      !G.mem?.s19HospitalWardNight,
    text: pick([
      `The hospital ward at night is a different place from the ward during visiting hours. The corridors dim to a different level. The sounds change: the machinery that was background becomes audible, the specific sounds of a place that is not sleeping but is doing its work at a reduced pace. The night staff move in a different register. You have been in a hospital ward at night — as a patient or as a visitor sitting through it — and the quality of the hours between two and five in the morning in a medical ward is a specific knowledge that doesn't translate to any other context.`,
      `Two in the morning in the ward. The light from the corridor coming under the door. The sound of the monitoring equipment at a specific frequency. The night nurse checking something. The quality of the other beds, which you know without looking. This hour in this place is a specific hour in a specific place that has no equivalent elsewhere. You know it because you were in it. The knowledge is not transferable. It is the record of a specific night.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s19HospitalWardNight', true) },
  },

  // ── THE WALK HOME THAT CHANGED ────────────────────────────────────────────

  {
    id: 's19_walk_home_changed',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.s19WalkHomeChanged,
    text: pick([
      `The route home that changed when you changed. When you moved to a different flat, a different neighbourhood: the route home changed completely, and the old route stopped being a route home and became a route to somewhere. The body has to relearn what home is in a new place. For weeks it makes the old turn before correcting. The new route accumulates until it is the route, and the old route becomes somewhere you used to go.`,
      `The walk home from the pub, from the station, from the late-night errand, in the city you lived in at twenty-three or twenty-seven. The specific route, the specific sequence of streets, the specific shortcut that saved four minutes. You know this walk perfectly because you did it hundreds of times in both directions at multiple hours. The walk exists in your body's memory and not in any map that still applies. You have moved. The walk is the record of a place you are no longer.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s19WalkHomeChanged', true) },
  },

]

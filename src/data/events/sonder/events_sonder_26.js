// events_sonder_26.js
// Contemplative layer: bureaucracy and waiting, public transport as social world,
// the texture of returning to a place, the body's small negotiations with age,
// things overheard, the quality of light in institutions, documents and their weight,
// the animal at the edge of the day, the long friendship, and the hours no one sees.
// Weight 2, mem-gated, no choices, no new flags.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_26 = [

  // ── BUREAUCRACY AND WAITING ────────────────────────────────────────────────────

  {
    id: 'sdr26_queue_number',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr26QueueNumber,
    text: pick([
      'You take a number from the machine and find a seat and watch the numbers on the board. The number you hold is higher than you hoped. There is nothing to do but wait. You watch the other people with their numbers doing the same watching. The room has the specific stillness of a shared waiting that no one chose.',
      'The form asks for things you have to look up: the account number from a document at home, the date of an event you did not think you would need to remember exactly. You fill in what you know and leave a blank and hope the blank will not be the thing that sends it back.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26QueueNumber', true) },
  },

  {
    id: 'sdr26_official_window',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.sdr26OfficialWindow,
    text: pick([
      'The official behind the window has seen this form many times. You can tell. The way they handle it — the specific economy of where they place the stamp, the pause before they sign — is the movement of someone who has done this enough times that the form no longer has information in it, only procedure.',
      'You explain the situation for the second time. The person you are explaining it to is the third person you have explained it to. The situation is not complicated. The path through the system to handle it, however, was not designed for situations like it, and so it keeps arriving at a wall.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26OfficialWindow', true) },
  },

  {
    id: 'sdr26_expired_document',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr26ExpiredDoc,
    text: pick([
      'The document is expired by a month. A month is nothing. A month is also exactly what the system requires to be there in order to count. You are ushered back with instructions on how to renew it. The instructions involve other documents.',
      'The stamp in the passport is from a country that no longer uses that name. Whether the stamp is still valid is a question that different officials have answered differently, and you have learned to present it to officials who look like they prefer to say yes.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26ExpiredDoc', true) },
  },

  // ── PUBLIC TRANSPORT AS SOCIAL WORLD ──────────────────────────────────────────

  {
    id: 'sdr26_bus_long_route',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 14 && !G.mem?.sdr26BusLong,
    text: pick([
      'The long bus is the one you take when there is no faster way. An hour, sometimes more. You know the route well enough to know when to look up: the market district, the bridge with the view, the place where the road passes close enough to the river to see it. The rest of the time you watch the other passengers or look at nothing.',
      'A woman near the front of the bus is on the phone for the entire journey. You have learned, without intending to, that her sister is getting married and the venue is not what anyone wanted and the dress alterations are not finished. You know this family. They do not know you.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26BusLong', true) },
  },

  {
    id: 'sdr26_train_carriage',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 16 && !G.mem?.sdr26TrainCarriage,
    text: pick([
      'The overnight train. You share the compartment with three people you will never see again. By morning you have not spoken a full sentence to any of them, but you know their sleeping sounds, the way one of them reaches for water at 2am, the particular weight of the silence at the station stop where two of them get off and the compartment is suddenly mostly yours.',
      'The metro at rush hour: the specific negotiation of space, the unspoken etiquette of where the eyes go, the moment a seat opens and the calculation — visible on three faces — of who is nearest, who is most entitled, who will move for it. Most of the time people get this right without speaking.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26TrainCarriage', true) },
  },

  {
    id: 'sdr26_shared_taxi',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 15 && !G.mem?.sdr26SharedTaxi,
    text: pick([
      'The shared taxi fills when it fills and leaves when it leaves, not before. You have learned not to arrive expecting a schedule. What there is instead is the front seat filling, the back row filling, the last passenger appearing from a direction no one was watching, the engine starting. It works.',
      'Six people in a vehicle built for five. The driver knows the passengers and the passengers know each other at least slightly and you are the one who doesn\'t, watching the shorthand of a community in transit. They do not exclude you. They are simply already in the middle of something.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26SharedTaxi', true) },
  },

  // ── RETURNING TO A PLACE ──────────────────────────────────────────────────────

  {
    id: 'sdr26_return_street',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr26ReturnStreet,
    text: pick([
      'The street is the same width it always was. The distance between the corner and the house is the same number of steps. What has changed is the scale — things you remember as large are not large now. The house is the right size for the people who live in it, and not for the child who measured everything by it.',
      'The shop is gone. Something else is there, a business with a different purpose and a different sign, and the building behind the sign is the same building. You stand at it for a moment trying to hold both versions: what was there and what is there now.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26ReturnStreet', true) },
  },

  {
    id: 'sdr26_return_smell',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.sdr26ReturnSmell,
    text: pick([
      'Before you know where you are — before you have made sense of the light or the sounds — there is the smell of the place. Something specific: the wood of the staircase, the specific dampness of the soil after rain here, the cooking from next door. Memory is faster through that channel than through any other.',
      'You have been back many times. Each return is less of a return — the gap between the place and the memory has closed, the two now closer to the same thing. This is either a loss or a kind of integration. You have not decided which.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26ReturnSmell', true) },
  },

  {
    id: 'sdr26_old_home_now',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr26OldHomeNow,
    text: pick([
      'People are living in the house who are not you and have not heard of you and have made it theirs in ways that are obvious from the street: different curtains, a satellite dish, a wall painted a new colour. The house does not know you were ever in it. You are the only one keeping that record.',
      'You walk past and do not stop. This is the right choice. Whatever it looks like now, the version you carry is sufficient. Adding the current image would only complicate it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26OldHomeNow', true) },
  },

  // ── THE BODY NEGOTIATING AGE ──────────────────────────────────────────────────

  {
    id: 'sdr26_body_morning',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr26BodyMorning,
    text: pick([
      'The body takes longer to reach operating temperature now. There is a sequence in the morning — water, movement, a few minutes before the back is fully itself — that did not exist at twenty-five. You do not mind it exactly. It is simply a new preamble to the day.',
      'You catch yourself being careful getting up from a low surface. Not because anything hurts. Just — careful. It is the beginning of a negotiation with gravity that will develop its own vocabulary over the coming years.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26BodyMorning', true) },
  },

  {
    id: 'sdr26_reading_glasses',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.sdr26ReadingGlasses,
    text: pick([
      'The small print is where it started. The menu at arm\'s length, then a bit further. The optician explains the word for it — the focusing muscle loses elasticity at a predictable rate — and gives you lenses for reading. You carry them now the way people carry keys. They are just something you need.',
      'You find a pair of glasses on the counter and put them on to read something and the text comes clear and you have to think for a moment about whether these are yours. They are. This is how integrated they have become.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26ReadingGlasses', true) },
  },

  {
    id: 'sdr26_body_noise',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 45 && !G.mem?.sdr26BodyNoise,
    text: pick([
      'The body has started making sounds. Small ones: the knee on the stairs, the back when you twist a certain way, the particular note the shoulder makes that has been there for years now. You have learned which sounds are information and which are just the body narrating its operations.',
      'Someone your age mentions a body thing in passing — a joint, a sleep pattern, a thing that takes longer to heal — and you recognise it immediately, and so does everyone else in the room. This is a new kind of shared language. You are entering a demographic.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26BodyNoise', true) },
  },

  // ── THINGS OVERHEARD ──────────────────────────────────────────────────────────

  {
    id: 'sdr26_overheard_grief',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr26OverheardGrief,
    text: pick([
      'Someone at the next table is talking to a person who is not there — not on the phone, just talking. You hear a name repeated. You hear the word anyway at the end of a long sentence. You look away and give them the room for it and are also, involuntarily, present for it.',
      'A conversation drifts through the wall from the flat next door. The two voices and their rhythms. A pause that lasts long enough that you realise something is being said that the other person needs time to receive. You go to the other room and let them have their privacy in the way that walls allow.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26OverheardGrief', true) },
  },

  {
    id: 'sdr26_overheard_joy',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 16 && !G.mem?.sdr26OverheardJoy,
    text: pick([
      'From somewhere down the street: laughter, the specific kind that has lost control of itself, that is not performing anything. You cannot see who it is. It does not matter. The sound is enough. You walk past it and carry a small residue of it.',
      'The couple at the other end of the carriage. The way she leans her head briefly on his shoulder and he adjusts his position to make it easier for her without commenting on it. Thirty seconds, maybe less. You look at your phone. But you saw it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26OverheardJoy', true) },
  },

  // ── LIGHT IN INSTITUTIONS ─────────────────────────────────────────────────────

  {
    id: 'sdr26_hospital_light',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.sdr26HospitalLight,
    text: pick([
      'Hospitals have their own light — a fluorescent quality that is neither day nor night, that makes the hour ambiguous and flattens everything. You have been here enough times to recognise the light before you remember where you are. It is the light of waiting and of not knowing, and it is the same in hospitals everywhere you have been.',
      'The corridor between the wards. The squeak of shoes on the linoleum. The particular trolley sound. A specific smell — the antiseptic, the meals trolley, something chemical beneath both. The body recognises hospital as a category before the mind processes the specifics. You are here again.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26HospitalLight', true) },
  },

  {
    id: 'sdr26_school_building_again',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.sdr26SchoolBuildingAgain,
    text: pick([
      'You are in a school building — for a child\'s event, for some other reason — and the smell is the same smell. The wooden floors, the chalk-dust residue even in rooms that haven\'t used chalk in years, the particular acoustic of a corridor. You are in this building now and also briefly, involuntarily, in the other one.',
      'The chairs in the school hall are the same design as the chairs in the school hall of the school you attended. The same design, possibly the same chairs. Thirty years of children have sat in them and they are still making the same sound on the floor.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26SchoolBuildingAgain', true) },
  },

  // ── THE ANIMAL AT THE EDGE OF THE DAY ────────────────────────────────────────

  {
    id: 'sdr26_animal_morning',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 10 && !G.mem?.sdr26AnimalMorning,
    text: pick([
      'Something is in the garden before you are, doing what it does at this hour. A bird on the fence. A cat from elsewhere passing through. A dog that belongs to the street rather than any house. Its business here is its own. It does not explain itself to you. You watch it for a while before you start the day.',
      'The sound begins before dawn. Depending on where you are it is a rooster or a muezzin or birds or traffic or a neighbour\'s early alarm through a thin wall. The world restarting. You are already awake and listening to it start.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26AnimalMorning', true) },
  },

  {
    id: 'sdr26_stray_animal',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 12 && !G.mem?.sdr26StrayAnimal,
    text: pick([
      'The stray that lives near your building is not your responsibility. You have been clear about this. You have also been putting food out. The arrangement has not been discussed and will not be discussed and is understood by both parties.',
      'A dog follows you for three blocks and then stops at a corner and watches you continue. You turn back and it is still there watching. It is not following; it was accompanying you to a point and the point was that corner. You continue.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26StrayAnimal', true) },
  },

  // ── THE LONG FRIENDSHIP ───────────────────────────────────────────────────────

  {
    id: 'sdr26_friend_old_joke',
    phase: null,
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 30 && !G.mem?.sdr26FriendOldJoke,
    text: pick([
      'There is a joke between you and an old friend that has been running for over a decade. Its original context is no longer relevant but that is not the point. The point is the shorthand: a word or a look and you are both back inside it. The joke\'s persistence is evidence of the friendship\'s persistence.',
      'You and a friend sit in a room together doing separate things — reading, on separate phones, one of you making tea. Not talking. It is completely comfortable. You have been friends long enough that silence requires no management.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26FriendOldJoke', true) },
  },

  {
    id: 'sdr26_friend_different_now',
    phase: null,
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 35 && !G.mem?.sdr26FriendDifferent,
    text: pick([
      'An old friend has become someone you would not have predicted. The path from who they were to who they are now is legible — you watched most of it — but the destination is still surprising. You adjust and they adjust. The friendship continues on the new terms.',
      'You and a friend you\'ve known for twenty years are in disagreement about something real, not a trivial thing. The disagreement is large enough that you are both quiet about it for a while. The friendship has more load-bearing capacity than either of you has tested before. You are testing it now.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26FriendDifferent', true) },
  },

  // ── HOURS NO ONE SEES ─────────────────────────────────────────────────────────

  {
    id: 'sdr26_late_alone',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.sdr26LateAlone,
    text: pick([
      'The hour after everyone else is asleep belongs to you in a way that other hours do not. You do not always use it for anything. Sometimes you sit in it. The house makes its own sounds in this hour — settling, the refrigerator cycling, the heating adjusting to the drop in temperature. You know all of them.',
      'An hour of doing nothing in particular: not resting, not working, not waiting for something. Just — the afternoon moving through the window, the sounds from outside, your own thoughts going where they go. Nothing is required of you in this hour. This is rarer than it sounds.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26LateAlone', true) },
  },

  {
    id: 'sdr26_small_pleasure',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 16 && !G.mem?.sdr26SmallPleasure,
    text: pick([
      'The first coffee of the morning, the specific temperature of it, the particular quality of the first ten minutes before the day has established its character. You are protective of this and you are right to be.',
      'The walk you take for no reason. Not exercise, not transit — just the neighbourhood at this speed, in this light, the specific angle of approach you take to the park. Nobody required this of you. You required it of yourself.',
      'Clean sheets on a night when you are genuinely tired. The window open. The temperature exactly right for the blanket weight you want. These conditions come together perhaps six times a year.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr26SmallPleasure', true) },
  },

  {
    id: 'sdr26_task_done',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr26TaskDone,
    text: pick([
      'The thing that has been in the back of your mind for weeks is finally done. Not a major thing — a form, a phone call, a visit that needed making. The relief is out of proportion to the task. You understand that what you were carrying was not the task but the fact of carrying it.',
      'You finish a list and look at it finished. There is a specific quality to the moment before you move on, when the list is complete and nothing has yet replaced it. You stay in it for a moment.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('sdr26TaskDone', true) },
  },

  // ── DOCUMENTS AND THEIR WEIGHT ────────────────────────────────────────────────

  {
    id: 'sdr26_old_paper',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.sdr26OldPaper,
    text: pick([
      'An envelope of old documents: a birth certificate, a letter in a handwriting you don\'t recognise, a photograph of people you can mostly identify. The paper is a specific weight that new paper is not — the compressed time of it, the fact that it has survived. Someone kept it. You keep it.',
      'The certificate is yellowed at the edges and signed by an official whose name means nothing to you now. But it names a date and a place and a relationship, and the naming still works — the information still transfers across the distance between then and now.',
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('sdr26OldPaper', true) },
  },

  {
    id: 'sdr26_id_photo',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr26IdPhoto,
    text: pick([
      'The photograph in the identity document is from some years ago. You do not look like that anymore. The official looks at the photograph and looks at you and makes the adjustment mentally and you both proceed. This happens every time.',
      'The old passport. You go through it: the stamps from a decade of movement, some of them from countries that have since changed. The visa that took three months to get. The entry stamp from the country you were most nervous about entering. A small archive of past thresholds.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26IdPhoto', true) },
  },

  // ── THE QUALITY OF THE ORDINARY ───────────────────────────────────────────────

  {
    id: 'sdr26_good_week',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.sdr26GoodWeek,
    text: pick([
      'A week with nothing in it except what is normally in it. The work, the meals, the small exchanges, the sleep. Nothing broke or changed or required management beyond what is usual. Looking back at the end of it you understand that this is what a good week is: one in which ordinary life was sufficient.',
      'You have been in a good patch. Not extraordinary, not marked by any particular event — just a period in which the days have felt more or less like what days are supposed to be. You notice this only when you are far enough into it that it has had time to establish itself. You don\'t examine it too closely.',
    ]),
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('sdr26GoodWeek', true) },
  },

  {
    id: 'sdr26_habit_discovered',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr26HabitDiscovered,
    text: pick([
      'You notice you have developed a habit — not one you chose, just one that grew: always putting the keys in the same pocket, always starting the morning in a particular sequence, always taking the same route when you have options. The habit has been there long enough to feel structural. You can\'t remember installing it.',
      'A small ritual at the end of the workday: a specific thing that closes the work off from the rest of the evening. You developed it without intending to and depend on it now. Without it the evening feels open at one end in a way that takes time to settle.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr26HabitDiscovered', true) },
  },

]

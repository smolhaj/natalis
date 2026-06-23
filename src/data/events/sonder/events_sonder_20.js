// events_sonder_20.js
// Contemplative layer — 28 events. No choices, no new flags, weight 2.
// Themes: the body's knowledge of cold, what phones changed about waiting,
// the specific quality of being good at something no one sees, the texture
// of languages left, the moment before sleep, what infrastructure sounds like,
// the stranger in the photograph, the skill you no longer use.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_20 = [

  // ── COLD AND THE BODY ─────────────────────────────────────────────────────

  {
    id: 'sonder20_cold_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s20ColdBody,
    text: pick([
      'The cold came in under the door as a child and your body has never fully forgotten what cold arriving means. You are warm now. You still feel the memory of the draught in your feet.',
      'You know how to dress for cold in a way that people who have not grown up cold do not know. It is a small knowledge. You do not mention it. It is present anyway.',
      'The cold in this season has a particular quality — not dangerous, just present. Your body processes it as information, same as always. This is what seasons are: information the body receives and classifies.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20ColdBody', true) },
  },

  {
    id: 'sonder20_cold_morning',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'rural' &&
      !G.mem?.s20ColdMorning,
    text: 'The cold this morning is the same cold as all the mornings before it in this season and in this place. There is a certain efficiency to having already made your peace with it. The cold is not the enemy. The cold is simply what this time of year is, and you dress for it and go out.',
    choices: null,
    effect: (p) => { p.setMem('s20ColdMorning', true) },
  },

  // ── WHAT PHONES CHANGED ABOUT WAITING ────────────────────────────────────

  {
    id: 'sonder20_waiting_before_phone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2010 &&
      G.age >= 35 &&
      !G.mem?.s20WaitingBeforePhone,
    text: pick([
      'You remember waiting. Not the thing you wait for now, tapping through something, but actual waiting — standing somewhere with nothing to do but be in the place and look at it. It is not a better state than the present one. It is just different. You exist now in the present one.',
      'There was a time when being early meant standing and looking at nothing in particular. The space that existed was just space. You do not miss it exactly. You notice that it no longer exists.',
      'Before the phone, arriving somewhere first meant becoming briefly transparent. Invisible in the ordinary way of any person doing nothing visible. Now the invisible state is harder to achieve accidentally. This is not a complaint. It is just a texture you remember.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20WaitingBeforePhone', true) },
  },

  {
    id: 'sonder20_phone_in_pocket',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2010 &&
      !G.mem?.s20PhoneInPocket,
    text: 'The phone is in your pocket and it changes the quality of being in a place. You are not more or less present than before. You are present in a different way — the possibility of elsewhere is always on you, even when you are not accessing it. This is simply what it is to be in a place now.',
    choices: null,
    effect: (p) => { p.setMem('s20PhoneInPocket', true) },
  },

  // ── BEING GOOD AT SOMETHING NO ONE SEES ──────────────────────────────────

  {
    id: 'sonder20_invisible_skill',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career &&
      !G.mem?.s20InvisibleSkill,
    text: pick([
      'There are things you are good at that do not appear on any document and would not be easy to explain. The way you read a room before speaking. The three seconds of calculation that is invisible in your face. This expertise is real. It has no name.',
      'The skill accumulated slowly and you would struggle to say when you acquired it. It is just the thing you can do now that you could not do at twenty-five. No one gave you credit for learning it. It didn\'t require credit. It just required the years.',
      'You are better at this than most people. It is a thing you know without announcing and that other people rarely notice. The invisible mastery of something ordinary. It is your particular version of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20InvisibleSkill', true) },
  },

  {
    id: 'sonder20_colleague_competence',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career &&
      !G.mem?.s20ColleagueCompetence,
    text: 'There is a colleague who is good in a way that goes unremarked — not extraordinary, not someone who gets mentioned, just someone who does their part with a steadiness that makes the whole thing work. You notice them. The noticing is private. You wonder if anyone notices the same thing about you.',
    choices: null,
    effect: (p) => { p.setMem('s20ColleagueCompetence', true) },
  },

  // ── LANGUAGES LEFT ────────────────────────────────────────────────────────

  {
    id: 'sonder20_language_fading',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      !G.mem?.s20LanguageFading,
    text: pick([
      'The first language is slower now. You have to reach for a word that once came without reaching. This is not loss exactly — you have the other language, you use it all the time. But the reaching is new. Something is becoming an effort that used to be effortless.',
      'Your children speak the language of this place with no accent. You hear yourself in them and don\'t hear yourself in them. The thing that passes and the thing that doesn\'t are happening at the same time.',
      'You think in the language of here and feel something about that. Not regret. Something subtler. The shift was necessary and it happened and now the first language is somewhere behind the working language, available but further than it was.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20LanguageFading', true) },
  },

  {
    id: 'sonder20_language_code_switch',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s20LanguageCodeSwitch,
    text: 'The switch between one way of speaking and another happens without your deciding to do it. The sentence starts in one register and ends in another. You have always done this. Other people find it notable. For you it is simply how speech works — different rooms requiring different keys.',
    choices: null,
    effect: (p) => { p.setMem('s20LanguageCodeSwitch', true) },
  },

  // ── THE MOMENT BEFORE SLEEP ───────────────────────────────────────────────

  {
    id: 'sonder20_before_sleep',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s20BeforeSleep,
    text: pick([
      'There is a moment before sleep where the day reassembles itself briefly — fragments of conversation, the thing you didn\'t say, the unfinished sentence. Then it dissolves and you are asleep. The moment is very small. It happens every night.',
      'You are good at sleep. Not everyone is. You think of this occasionally as the lights go out — that this is one of the things your body does reliably, without complaint, and you are grateful for it in the way you are only grateful for things when you notice them.',
      'The last thing before sleep tonight is something without particular weight. Not a worry. Not a pleasure. Just the day\'s residue settling. This is an ordinary night in an ordinary life and you don\'t know how rare that is.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20BeforeSleep', true) },
  },

  {
    id: 'sonder20_woken_at_3am',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 38 &&
      !G.mem?.s20Woken3am,
    text: 'Three in the morning and you are awake. Nothing specific woke you. The body does this now and you have mostly accepted it. You lie there and let the thoughts arrive and leave and eventually the light shifts and you are asleep again. This is just what this hour is at this age.',
    choices: null,
    effect: (p) => { p.setMem('s20Woken3am', true) },
  },

  // ── INFRASTRUCTURE SOUNDS ─────────────────────────────────────────────────

  {
    id: 'sonder20_power_cut_dark',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable', 'conflict_zone'].includes(G.character.country?.archetype) &&
      !G.mem?.s20PowerCutDark,
    text: pick([
      'The lights go and the night goes darker than city nights usually go. There is a second of everyone adjusting. Candles appear from the same drawer they are always in. The routine of the power cut is practiced and efficient.',
      'The generator kicks in three seconds after the grid fails. You have counted those three seconds your whole life. The count is automatic. The darkness between the grid and the generator is three seconds and then ordinary life resumes.',
      'Without power the street has a different quality. The sounds that the electricity covers — its own hum, the appliances — become audible in their absence. Silence has more texture here than you noticed when it wasn\'t here.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20PowerCutDark', true) },
  },

  {
    id: 'sonder20_water_in_pipes',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['wealthy_west', 'wealthy_east'].includes(G.character.country?.archetype) &&
      !G.mem?.s20WaterInPipes,
    text: 'The water arrives when the tap is turned on. You have always known this and will die without fully appreciating it, which is perhaps the correct relationship to have with infrastructure: to assume it so completely that its absence would be shocking. Billions of people experience the shock regularly. You do not.',
    choices: null,
    effect: (p) => { p.setMem('s20WaterInPipes', true) },
  },

  {
    id: 'sonder20_commute_sound',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      !G.mem?.s20CommuteSound,
    text: 'The commute has its own sound and you have stopped hearing it. The specific frequencies of this train on this track, or this road at this hour, are the sound of the day starting and have been for long enough that they are invisible. The first time you heard them they were interesting. Now they are just the transition from one state to another.',
    choices: null,
    effect: (p) => { p.setMem('s20CommuteSound', true) },
  },

  // ── THE STRANGER IN THE PHOTOGRAPH ───────────────────────────────────────

  {
    id: 'sonder20_old_photograph',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      !G.mem?.s20OldPhotograph,
    text: pick([
      'A photograph from when you were young. You look at the face in it. The face is yours and is not quite yours — the expression you have in photographs from that time, the specific way you held yourself then. The person in the photograph does not know anything that has happened since. They look directly at the camera. They are waiting.',
      'There is a photograph from years ago and in the background — in the background, just barely visible — there is someone you no longer remember. They were at the same event. They were clearly someone\'s friend. They have since lived an entire life that happened without your knowledge.',
      'You look very young in the old photograph. That is not surprising. What is surprising is that the person in it doesn\'t look young to themselves — you remember being that age and feeling continuous with the present you, not separate from it. The photograph makes the gap visible in a way the living of it didn\'t.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20OldPhotograph', true) },
  },

  {
    id: 'sonder20_group_photo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 38 &&
      !G.mem?.s20GroupPhoto,
    text: 'A group photograph from years ago. The people in it have dispersed into separate futures — different cities, some dead, some estranged, some still present but different in ways the photograph doesn\'t predict. You were all in the same room. That was real. The room is the past.',
    choices: null,
    effect: (p) => { p.setMem('s20GroupPhoto', true) },
  },

  // ── THE SKILL YOU NO LONGER USE ───────────────────────────────────────────

  {
    id: 'sonder20_unused_skill',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 32 &&
      !G.mem?.s20UnusedSkill,
    text: pick([
      'You once knew how to do something you no longer do. The knowledge is still there, technically. If you tried it now you would find more than you expected and less than you needed. Skills atrophy differently than facts — the fact remains; the skill needs the practice to stay alive.',
      'There was a time you were good at something you have no use for now. The skill was real then. You don\'t mourn it exactly. You occasionally remember you had it, which is its own kind of inventory.',
      'The language you studied once has retreated to vocabulary and lost the grammar. The instrument you played has the muscle memory but not the fluency. These are not losses. They are just the shape of a life that has moved on to other proficiencies.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20UnusedSkill', true) },
  },

  // ── THE WINDOW ─────────────────────────────────────────────────────────────

  {
    id: 'sonder20_window_light',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s20WindowLight,
    text: pick([
      'The light comes in at this angle only at this hour in this season. It will be different tomorrow and different next month. You notice it now. In an hour you will have forgotten noticing it.',
      'There is a window you look out of regularly. The view is not remarkable. You look out of it anyway. This is what ordinary windows are for — not views but the habit of looking, the moment before the next thing.',
      'The light on the wall is changing as the day moves. You watch it for a few seconds. The day is moving and you are in it. This is the only day there is. Then you return to what you were doing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20WindowLight', true) },
  },

  // ── THE NEIGHBOR ──────────────────────────────────────────────────────────

  {
    id: 'sonder20_neighbor_glimpse',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      !G.mem?.s20NeighborGlimpse,
    text: pick([
      'Through the window across the narrow street: someone standing at their own window, looking out. Not looking at you. Looking at whatever is between them and elsewhere. For a moment you are both people at windows, then you step back and so do they and it is over.',
      'The neighbor above you moves around at ten at night. You have never met them. You know the specific rhythm of their evening from the ceiling — the chair pushed back, the footsteps to the kitchen, the television. They live an entire life overhead.',
      'The apartment across the courtyard has a light on that is always on when you get home late. You have wondered about this for years. The light tells you nothing. It is simply a fact of your neighbourhood, as ordinary as any other fact of the neighbourhood.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20NeighborGlimpse', true) },
  },

  // ── WHAT GRANDPARENTS DIDN'T KNOW ────────────────────────────────────────

  {
    id: 'sonder20_grandparent_world',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 60 &&
      !G.mem?.s20GrandparentWorld,
    text: 'Your grandparents did not live to see this world. They would not have predicted most of it. The things that seem normal to you now — the specific texture of everyday life — would have required explanation to them. You are the explanation. You are the version of the family that knows what came after.',
    choices: null,
    effect: (p) => { p.setMem('s20GrandparentWorld', true) },
  },

  {
    id: 'sonder20_what_children_take_normal',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.children?.length > 0 &&
      G.currentYear >= 2000 &&
      !G.mem?.s20ChildrenNormal,
    text: 'Your children will take for normal the things that still seem new to you. They will not know the world before certain things existed because they have never been alive without them. Their baseline is built from the present; yours was built from a different moment. The gap is invisible to them. You can see both sides of it.',
    choices: null,
    effect: (p) => { p.setMem('s20ChildrenNormal', true) },
  },

  // ── THE BODY IN ITS ORDINARY HOURS ───────────────────────────────────────

  {
    id: 'sonder20_body_ordinary',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s20BodyOrdinary,
    text: pick([
      'The body is doing something small without your oversight. Breathing. Processing. The thousand things the body does without being asked to, in every hour, until it stops. You do not think about this usually. Right now you are thinking about it.',
      'At some age the body began reporting in more frequently. Not pain — just information. A small announcement from the knee. A mild opinion from the back about the chair. The body has become a correspondent. You read the dispatches.',
      'Your body has been working for decades and will work for more, or not. You do not know which. No one does. The body moves through its hours the same either way, and you with it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20BodyOrdinary', true) },
  },

  // ── WHAT THE PRICE OF THINGS REMEMBERS ───────────────────────────────────

  {
    id: 'sonder20_price_of_things',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      !G.mem?.s20PriceOfThings,
    text: pick([
      'You remember what things cost. The price of bread in a certain decade. The price of the first flat. The numbers are not just numbers — they have a texture, a weight of what that money meant then. The numbers are the same and entirely different now.',
      'You can remember when the price was small enough that buying it was not a decision. That price is not the same now. What changes is not only the numbers but what the numbers mean relative to what the money meant when it moved.',
      'The cost of a meal out. The cost of a bus fare. The cost of the flat that seemed unaffordable and now seems like an absurd bargain. Your memory holds the earlier prices and the body flinches slightly at the present ones even when they are reasonable.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20PriceOfThings', true) },
  },

  // ── THE SENTENCE LEFT UNSAID ──────────────────────────────────────────────

  {
    id: 'sonder20_unsaid_sentence',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s20UnsaidSentence,
    text: pick([
      'There is a sentence you didn\'t say at the right moment. The moment passed. You say it now sometimes in your head, in the version of the conversation where you said it. The person who would have heard it has no idea this conversation is still running.',
      'You held your tongue. Looking back you are not certain that was correct. At the time it seemed the more careful choice. The more careful choice has its own cost that is harder to see than the cost of the thing you didn\'t say.',
      'The unsaid thing doesn\'t deteriorate. It stays at the temperature it was when you decided not to say it, preserved in the moment of that decision. This is not always comfortable. It is just what it is to have held something back.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20UnsaidSentence', true) },
  },

  // ── THE QUEUE ─────────────────────────────────────────────────────────────

  {
    id: 'sonder20_the_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s20TheQueue,
    text: pick([
      'The queue. Everyone in it is going somewhere. The queue is a temporary community, organized by arrival, dissolved by departure. You will never know anyone in this queue. For a few minutes you are all in the same moment, moving forward at the same speed.',
      'You have stood in many queues. The counting of time in queues is different from the counting of time elsewhere — slower, more visible, with a clear unit of progress: the step forward, the person departing from the front. The queue has its own arithmetic.',
      'The person in front of you in the queue shifts their weight and you shift yours. This is not communication. It is just the shared experience of standing still in a line. Both of you want the same thing. Neither of you will remember the other.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20TheQueue', true) },
  },

  // ── WHAT THE COUNTRY FEELS LIKE FROM OUTSIDE ─────────────────────────────

  {
    id: 'sonder20_country_from_outside',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 35 &&
      !G.mem?.s20CountryFromOutside,
    text: pick([
      'People here know your country as a name and a shape on a map and a set of associations, some of which are accurate. When they say the name they mean something smaller than what you carry. You carry the whole texture. They carry the outline.',
      'News arrives from home and you read it with a different instrument than the people around you read it with. They read the event. You read the place, the neighbourhood, the specific distance between things, what the street looks like in that season, who you know who is near there.',
      'The country you left is still there. It is changing without your direct knowledge. You get the news from family and from what people send and from the feeling of recognition when something specific appears. This is how it is to live at a distance from where you are from.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20CountryFromOutside', true) },
  },

  // ── THE RECURRING DREAM ───────────────────────────────────────────────────

  {
    id: 'sonder20_recurring_dream',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s20RecurringDream,
    text: pick([
      'You have a dream that comes back, not always the same but recognizably the same shape. A place that is and isn\'t a place you know. A task that remains incomplete. You wake and it goes. The feeling lingers a little, then it too goes.',
      'The dream is always set somewhere from before. The school. The house. The road. Your sleeping mind returns to these places with a persistence that suggests they mean something. You have stopped trying to say what.',
      'In the dream something is different. The geography is wrong in the way geography is wrong in dreams: the building is in the wrong place but correct in the dream. You accept the correction. That is what dreams require. Acceptance of the impossible geography.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20RecurringDream', true) },
  },

  // ── THE RADIO ─────────────────────────────────────────────────────────────

  {
    id: 'sonder20_radio_background',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      !G.mem?.s20RadioBackground,
    text: pick([
      'The radio is in the other room. The words are half-audible — a voice, the specific register of news being delivered, the pause between items. You are not listening to it. It is there anyway, the background of the house.',
      'Your parents listened to a radio station and it played and you absorbed more of it than you knew at the time. Songs and fragments of conversation became part of the furniture of childhood. You still hear them occasionally and they are older than any conscious memory of learning them.',
      'The radio fills the room without filling it. A voice, then music, then a voice again. The radio in the background is part of what this decade sounded like from inside a house. You are inside the house. This is the sound.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s20RadioBackground', true) },
  },

]

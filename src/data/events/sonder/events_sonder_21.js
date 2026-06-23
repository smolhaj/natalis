// events_sonder_21.js
// Contemplative layer — 28 events. No choices, no new flags, weight 2.
// Themes: institutional waiting rooms, seasonal light, competence in a stranger,
// a house during illness, objects that outlive their owners, the specific weight
// of Sunday, the person who almost spoke, the bus home late, your own handwriting.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_21 = [

  // ── INSTITUTIONAL WAITING ROOMS ───────────────────────────────────────────

  {
    id: 'sonder21_waiting_room',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21WaitingRoom,
    text: pick([
      'The waiting room has a specific quality. The chairs are arranged for waiting rather than for comfort, which is a distinction that institutional designers understand. The magazines are old. Everyone here is managing something.',
      'You have been in enough waiting rooms to know the particular silence of them. Not quiet exactly — there are sounds — but a silence of purpose suspended. Everyone is waiting for their name.',
      'The waiting room of the hospital or the office or the station where the queue is managed by a number. The specific flatness of this light. This specific quality of time measured in other people\'s names being called.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21WaitingRoom', true) },
  },

  {
    id: 'sonder21_government_office',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21GovOffice,
    text: 'The form requires several documents and the documents require a form that refers to the first form. The person at the window has been explaining this for years and explains it without impatience, which is its own kind of endurance. You leave and come back with the correct sequence. This is what bureaucracy is: a system that requires you to understand it before it will process you.',
    choices: null,
    effect: (p) => { p.setMem('s21GovOffice', true) },
  },

  // ── SEASONAL LIGHT ────────────────────────────────────────────────────────

  {
    id: 'sonder21_winter_light',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s21WinterLight,
    text: pick([
      'The winter light here is low and brief. By four in the afternoon it is gone and the evening starts without ceremony. You have adapted to this. The adaptation is unconscious — the day restructures itself around the shorter window of light the way a schedule restructures around an early meeting.',
      'The angle of the winter light in the late afternoon makes certain surfaces glow briefly before the day ends. You stop in front of one. There is nothing to do with this. You just noticed it.',
      'Winter light is honest about the time of year in a way summer light isn\'t. Summer can lie about the hour. Winter cannot. It is four o\'clock and the sky is doing what four o\'clock in winter looks like, which is almost dark.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21WinterLight', true) },
  },

  {
    id: 'sonder21_summer_afternoon',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s21SummerAfternoon,
    text: pick([
      'The long summer afternoon in childhood had a quality that adult time doesn\'t. Not longer — the clock was the same — but differently proportioned. An afternoon was an enormous amount of time. You filled it with things that required no outcome.',
      'The specific quality of summer afternoon light coming through the shutters or the curtains or the leaves. The pattern it made. The fact that you noticed it then and have not forgotten it entirely.',
      'In the long summer evenings the light lasted until nine or ten and the day refused to end. The end of the day was only visible in the sky, not in the light, which kept coming.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21SummerAfternoon', true) },
  },

  // ── COMPETENCE WITNESSED IN A STRANGER ────────────────────────────────────

  {
    id: 'sonder21_stranger_competent',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s21StrangerCompetent,
    text: pick([
      'The plumber arrives and knows the problem before you finish describing it — nods at a specific point, goes directly to the place that caused it, fixes it in twenty minutes. The expertise is complete and quiet. You pay them and they leave and you think: they know exactly what they are doing, and no one outside their work knows this about them.',
      'On the train, someone unfolds a map with the specific efficiency of a person who has used many maps. They locate themselves and fold it back in one motion. The confidence is in the hands, not the face. A whole life of navigation is in the fold.',
      'The market stall vendor counts out your change before you can say anything — already knows the subtraction, has already counted it, hands it to you and is looking at the next customer. The arithmetic is so fast it disappeared. Years of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21StrangerCompetent', true) },
  },

  {
    id: 'sonder21_craft_observed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21CraftObserved,
    text: 'You watch someone do the thing they are good at — cut, or weld, or type, or cook, or arrange, or measure — and there is a quality to the watching that is not envy and not appreciation exactly but something between them. The skill is not yours. It is theirs. You are adjacent to it for a few seconds. Then you move on.',
    choices: null,
    effect: (p) => { p.setMem('s21CraftObserved', true) },
  },

  // ── A HOUSE DURING ILLNESS ────────────────────────────────────────────────

  {
    id: 'sonder21_house_during_illness',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('father_died') || G.flags.has('mother_died') || G.parents?.father?.alive === false || G.parents?.mother?.alive === false) &&
      !G.mem?.s21HouseDuringIllness,
    text: pick([
      'The house during a parent\'s illness had a specific quality. The sound of the television in the sick room. The particular efficiency of the household reorganized around the care. The way everyone lowered their voices in certain rooms without deciding to.',
      'The house was the house and also became something else for a while — a site of management, of vigil, of the specific domestic work that illness requires. Then it went back to being the house. The transition in both directions was quiet.',
      'You remember the smell of the sick room — the specific combination of things that made that smell — and the way the rest of the house was organized around trying to be quiet while life continued.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21HouseDuringIllness', true) },
  },

  // ── OBJECTS THAT OUTLIVE THEIR OWNERS ─────────────────────────────────────

  {
    id: 'sonder21_objects_outlive',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 38 &&
      !G.mem?.s21ObjectsOutlive,
    text: pick([
      'The object that belonged to someone who is gone. It is indifferent to its history. It is simply here, in the same shape it was in when they used it. The continuity is in the object, not in the person, and the object doesn\'t know the difference.',
      'A cup from someone who died. A tool. A piece of furniture. The object is still the object. The person is the thing that changed. You use it anyway, or don\'t, and either way it sits where it sat and holds its shape.',
      'The watch that stopped being a watch when the person who wore it died. Or didn\'t stop — is still keeping time, correctly, with no awareness of the change in status. Objects are accurate in this way: they don\'t adjust.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21ObjectsOutlive', true) },
  },

  {
    id: 'sonder21_inheritance_object',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('father_died') || G.flags.has('mother_died')) &&
      !G.mem?.s21InheritanceObject,
    text: 'There is something from the estate that is yours now. Not valuable in money. The thing you asked for, or the thing that no one else asked for, or the thing that was just there when everything was being sorted and you put it in a box and carried it home. It is in your house now and it is the most direct material line between you and them.',
    choices: null,
    effect: (p) => { p.setMem('s21InheritanceObject', true) },
  },

  // ── THE SPECIFIC WEIGHT OF SUNDAY ─────────────────────────────────────────

  {
    id: 'sonder21_sunday',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21Sunday,
    text: pick([
      'Sunday has a different texture than Saturday. Saturday is the escape from the week. Sunday is the preparation for the next week that arrives at a specific hour — the hour when the week begins to cast its shadow over the rest of the day. You can feel it arriving.',
      'The Sunday of childhood was a specific thing with specific sounds and smells — the food that was made on Sunday, the visit that happened on Sunday, the particular rhythm of a day that had a shape other days didn\'t.',
      'In the quiet of Sunday afternoon there is something available that isn\'t available the rest of the week. A particular kind of thinking. A kind of rest that isn\'t sleep. You have never found the right word for it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21Sunday', true) },
  },

  // ── THE PERSON WHO ALMOST SPOKE ───────────────────────────────────────────

  {
    id: 'sonder21_almost_spoke',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s21AlmostSpoke,
    text: pick([
      'The person who sat next to you on the long journey and almost said something. You could see them forming it. The sentence didn\'t come. They looked out the window. You arrived at the destination and went in different directions and the almost-said thing went with them.',
      'There was a moment at the party when someone looked as if they were going to say something real — not small-talk, but the thing they were actually thinking — and then they didn\'t, and the conversation turned, and the window closed. You wonder occasionally what it would have been.',
      'A stranger in a waiting room, or a queue, or a moment of proximity, who leaned slightly toward speech and then turned away. The leaning was visible. The sentence they were about to offer was irretrievable once they didn\'t offer it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21AlmostSpoke', true) },
  },

  // ── THE BUS HOME LATE ─────────────────────────────────────────────────────

  {
    id: 'sonder21_late_bus',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      !G.mem?.s21LateBus,
    text: pick([
      'The late bus or train is a different city than the daytime one. The people on it are the people who are out at this hour — different from the daytime population in ways that would be hard to specify but are immediately legible. You are one of them. You are going home.',
      'The city at this hour is quieter and also not quiet. The other kind of activity is present. The buildings are dark and lit simultaneously — the offices off, the apartments on, the bars visible through glass.',
      'The late bus: the few people, the specific sounds of a city that is not asleep but is doing something different. You know this city at this hour from a sequence of nights spread across years. You are part of its late population.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21LateBus', true) },
  },

  // ── YOUR OWN HANDWRITING ──────────────────────────────────────────────────

  {
    id: 'sonder21_own_handwriting',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s21Handwriting,
    text: pick([
      'Your handwriting on a note you wrote earlier in the week. The specific character of it — the letters that have always been that way, the word you always abbreviate the same way. You recognize yourself in it. It is the most direct evidence of your continued existence: the mark of the hand on paper.',
      'An old note in your own handwriting. The date is from years ago. The handwriting is yours but from before — the slight difference in how you formed certain letters then. You recognize it and don\'t entirely recognize it.',
      'The list you made in your handwriting. It is not remarkable to you as an artifact, but it would be recognizable as yours to anyone who knew you. Your handwriting is as distinctive as a face. You don\'t see it that way; you just use it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21Handwriting', true) },
  },

  // ── THE THING THAT CALMS YOU ──────────────────────────────────────────────

  {
    id: 'sonder21_calming_thing',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s21CalmingThing,
    text: pick([
      'There is a thing you do when you need to come back to yourself. Not dramatic — a specific kind of movement, or task, or route, or ritual. Other people don\'t know this about you and don\'t need to. The thing works. That is the whole of it.',
      'The particular activity that resets something. You discovered it by accident years ago — found yourself doing it when something was wrong and found the wrongness had changed shape by the time you finished. You do it now when you need it, knowing what it is.',
      'What settles you is probably not what you would have predicted when you were young. The young version of yourself had a different theory about what helps. The current version has the evidence.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21CalmingThing', true) },
  },

  // ── THE CROWD ─────────────────────────────────────────────────────────────

  {
    id: 'sonder21_the_crowd',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      !G.mem?.s21TheCrowd,
    text: pick([
      'The crowd at the station or the market or the festival. All of these people going somewhere. The density of parallel purposes is briefly staggering if you notice it: each person is at the center of a complete life and most of them are going somewhere specific right now and will arrive and continue.',
      'Standing in the middle of the crowd you can feel the mass of it — the combined purpose, the distributed heat of bodies, the sound of so many separate conversations assembled into a roar. Then you move through it and it separates to let you through and closes again.',
      'The crowd is not a crowd to each of its members. Each person is simply going somewhere. The crowd is only visible from the outside. From inside, you are just a person in a busy place.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21TheCrowd', true) },
  },

  // ── WHAT CHILDREN NOTICE ──────────────────────────────────────────────────

  {
    id: 'sonder21_children_notice',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.children?.length > 0 &&
      !G.mem?.s21ChildrenNotice,
    text: pick([
      'Your child asks about something you have stopped seeing. The object that has always been on that shelf, the habit you have that you didn\'t know you had. Children notice what adults have made invisible by familiarity. The noticing is briefly destabilising.',
      'Your child says something that reveals what they have been observing about you. The observation is accurate. It is the kind of accurate that comes from someone who watches you all the time without your knowing you are being watched.',
      'The child reports what they saw from the back seat on the drive. Something you didn\'t notice. Their vantage point was different. Their inventory of the journey is not the same as yours.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21ChildrenNotice', true) },
  },

  // ── THE FEELING OF RETURNING HOME ─────────────────────────────────────────

  {
    id: 'sonder21_returning_home',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 30 &&
      !G.mem?.s21ReturningHome,
    text: pick([
      'Coming home after time away — the specific recognition of your own space. The particular smell, which you can\'t detect when you are always in it, that becomes briefly available when you return from somewhere else. The smell of your own life.',
      'The return to the house after an absence. Everything is where you left it, which is both a comfort and, very briefly, strange. You left this behind and it continued without you, unchanged, as if it was waiting — which it wasn\'t, but the house seems to say it was.',
      'The key in the lock at the end of a long day or a long journey, and the sound of the door opening into your particular arrangement of rooms. The sound is familiar to the point of invisibility. Right now it is visible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21ReturningHome', true) },
  },

  // ── THE CONVERSATION THAT RESOLVED NOTHING ────────────────────────────────

  {
    id: 'sonder21_unresolved_conversation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s21UnresolvedConversation,
    text: 'A conversation that went on a long time and ended without conclusion. Both people spoke. Neither convinced the other. Neither left with different information than they came with. This is most conversations. The ones that actually change something are rarer than they appear to be in retrospect.',
    choices: null,
    effect: (p) => { p.setMem('s21UnresolvedConversation', true) },
  },

  // ── THE ANIMAL IN THE HOUSE ───────────────────────────────────────────────

  {
    id: 'sonder21_animal_in_house',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.pets?.length > 0 &&
      !G.mem?.s21AnimalInHouse,
    text: pick([
      'The animal in the house moves through the same rooms you do, at different speeds, with different purposes. It has no access to your concerns. It has its own. The two inhabitations coexist without needing to explain themselves to each other.',
      'The pet is asleep in the chair and it has been asleep in the chair for an indeterminate amount of time and will continue to be asleep in the chair. This is the animal\'s relationship to time. It is calming to observe from the outside.',
      'The cat or the dog or the bird has a specific relationship to the hour of the day that is more accurate than yours. The animal knows when feeding time is before you do. The animal knows when you are coming home before you arrive.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21AnimalInHouse', true) },
  },

  // ── THE STREET AT DIFFERENT HOURS ─────────────────────────────────────────

  {
    id: 'sonder21_street_at_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      !G.mem?.s21StreetAtNight,
    text: pick([
      'The street you walk in the day and the street at two in the morning are the same surface with different people on it. The late-night version has fewer people and they move differently. You know the daytime version. You are briefly in the other one.',
      'The street at this hour belongs to a different population than the one you\'re in at noon. The shops are closed. The specific lighting is on. The sound is of a city that has most of its activity inside rather than outside.',
      'You walk a familiar street at an unfamiliar hour and it is strange in the way a familiar face is strange in a different context — recognizable and slightly wrong, as if the street has been replaced with its night version.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21StreetAtNight', true) },
  },

  // ── THE FACE OF SOMEONE SLEEPING ─────────────────────────────────────────

  {
    id: 'sonder21_face_sleeping',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.partner?.alive || G.children?.length > 0) &&
      !G.mem?.s21FaceSleeping,
    text: pick([
      'The sleeping face of someone you love. The specific quality of a face with the performance absent — the expression that isn\'t being managed, the face returning to what it is when it is not doing anything. You don\'t see this often. You see it now.',
      'Your child or your partner asleep. The fact of their breathing, the particular position, the face that is theirs and is also simplified by sleep into something more purely itself. You observe this for a few seconds and then leave them to it.',
      'The face of someone sleeping is a different face than the waking one. Less defended. The architecture of the expressions that the day requires is gone. You are seeing the face without its day on it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21FaceSleeping', true) },
  },

  // ── WHAT TECHNOLOGY CHANGED ───────────────────────────────────────────────

  {
    id: 'sonder21_technology_changed',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 55 &&
      G.currentYear >= 2000 &&
      !G.mem?.s21TechChanged,
    text: pick([
      'You learned to do something the new way and the old way is gone from practice if not from memory. The two ways exist in parallel in your head — the old one, which you could still describe, and the new one, which you use. The young people around you only have the new one.',
      'A thing you did manually for decades is now done by something else. You remember the doing. The doing is no longer necessary. You still have the knowledge. It is the kind of knowledge that feels important to retain and is no longer used.',
      'The technology changed what the task is before you understood that the task had changed. You were doing one thing and then you were doing something that looked the same but required different movements and different attention. Both tasks had the same name.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21TechChanged', true) },
  },

  // ── THE HOSPITAL BIRTH ────────────────────────────────────────────────────

  {
    id: 'sonder21_hospital_birth',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.children?.length > 0 &&
      !G.mem?.s21HospitalBirth,
    text: 'The specific quality of the maternity ward. The sound of it. The particular institutional light. The fact that in every room something is happening that is ordinary and not ordinary simultaneously — the most ordinary biological event and the least ordinary thing that will happen to the people involved. The place is organized around this contradiction and doesn\'t acknowledge it.',
    choices: null,
    effect: (p) => { p.setMem('s21HospitalBirth', true) },
  },

  // ── THE HAIRCUT ───────────────────────────────────────────────────────────

  {
    id: 'sonder21_haircut',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21Haircut,
    text: pick([
      'The haircut is the most regular formal relationship many people have with physical touch from a relative stranger. The barber or stylist, their hands in your hair, the mirror, the conversation that is different from other conversation because of the mirror — you see each other in it but don\'t make eye contact in the direct way. An odd formality.',
      'The barber has been cutting hair in the same shop for twenty years. The shop is the same too. The customers have aged and some of them have died and new ones came. The barber knows the haircut before you sit down because they have been cutting it for years and hair grows back to its preferred shape.',
      'After the haircut you look like yourself more recently. This is all a haircut is: a more recent version of the face you already had.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21Haircut', true) },
  },

  // ── THE MEAL EATEN ALONE ──────────────────────────────────────────────────

  {
    id: 'sonder21_meal_alone',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s21MealAlone,
    text: pick([
      'A meal eaten alone, without reading or screens. Just the food and the room and the sounds of the building. This is rarer than it should be. You notice you are doing it. The noticing interrupts the practice briefly.',
      'The solo meal at the restaurant or the kitchen table. The specific quality of eating without the social dimension. The food is the food. No one is watching you eat it. You eat differently without the audience.',
      'Eating alone without distraction is something you rarely do. When you do, the meal becomes temporarily very present — the taste of it, the temperature, the specific way the food is in the plate. The phone is in your pocket and you don\'t take it out.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s21MealAlone', true) },
  },

  // ── THE YEAR IN ONE SENTENCE ──────────────────────────────────────────────

  {
    id: 'sonder21_year_in_sentence',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 60 &&
      !G.mem?.s21YearInSentence,
    text: 'You have lived enough years to know that most of them reduce to a sentence when you tell them. A good year, a hard year, the year of the move, the year of the death, the year of the promotion. The sentence is not the year. The year was twelve months of days. But the sentence is what survives. You are making sentences out of years now.',
    choices: null,
    effect: (p) => { p.setMem('s21YearInSentence', true) },
  },

]

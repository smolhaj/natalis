// events_sonder_11.js — MODE C contemplative auto-resolve events (36 events)
// Four registers: THE RETURN (9), ANIMALS (9),
// WHAT YOU INHERIT (9), THE WINDOW (9)
// All mem-gated single-fire, weight 2, no choices, no new flags.

export const EVENTS_SONDER_11 = [

  // ══════════════════════════════════════════════════════════════════════════
  // THE RETURN
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder11_return_childhood',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s11ReturnChildhood,
    text: 'You go back to the house where you grew up. It is smaller than you remember. The distances between the rooms have shrunk. The ceiling that felt high when you were eight is at eye level now. Nothing has changed in the house; you have changed, and the house reveals the change by remaining exactly what it was.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s11ReturnChildhood', true) },
  },

  {
    id: 'sonder11_return_city',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s11ReturnCity,
    text: 'You visit the city you lived in for a few years — the years that felt defining — and find that the city has continued without you. The coffee place you went to every day is gone, or is a different kind of shop. The friends you had there scattered to other places. The city holds no particular record of your time in it. This is correct and unremarkable. It is also, briefly, startling.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s11ReturnCity', true) },
  },

  {
    id: 'sonder11_return_neighbourhood',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s11ReturnNeighbour,
    text: 'The neighbourhood has changed. Not beyond recognition — you recognise the bones of it, the slope of the street, the building that was always there. But the shops are different and the people are different and the specific smell of the neighbourhood in the evening — whatever combination of cooking and traffic and the particular trees — has shifted in some way you cannot isolate. You are not from here anymore in the way you used to be.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 1; p.setMem('s11ReturnNeighbour', true) },
  },

  {
    id: 'sonder11_return_country',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('emigrant') && G.age >= 35 && !G.mem?.s11ReturnCountry,
    text: 'You go back to the country you left. The airport is the same airport. The exit from the airport is the same — the heat or the cold arriving immediately, the specific quality of the light. Something in the body relaxes that you did not know was tense. Something else tightens. The return is not the same as the staying would have been. It is its own thing, with its own texture, neither here nor there in a way that feels permanent now.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.setMem('s11ReturnCountry', true) },
  },

  {
    id: 'sonder11_return_school',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.s11ReturnSchool,
    text: 'The school looks smaller. The rooms where years happened are ordinary rooms. The bench you sat in every day for three years is a bench. You have the dim memory that those years felt immense while they were happening — the weeks slow as years — and the school was the container of that immensity. The container is just a building now.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s11ReturnSchool', true) },
  },

  {
    id: 'sonder11_return_nothing_left',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s11ReturnNothing,
    text: 'You wanted to go back and there is nothing to go back to. The building was demolished. The village was absorbed by the city. The place exists in the past tense, and visiting its coordinates reveals only what replaced it. You cannot go back to that place because the place no longer has a location.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.setMem('s11ReturnNothing', true) },
  },

  {
    id: 'sonder11_return_same',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s11ReturnSame,
    text: 'The strange thing is that it is exactly the same. Nothing has changed. The house, the room, the view from the window — unchanged. You are the only thing that is different. It is disorienting to come back and find a place intact when you imagined it changing without you. The place did not change. You did. The place makes this legible by remaining.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s11ReturnSame', true) },
  },

  {
    id: 'sonder11_return_memory_map',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && !G.mem?.s11ReturnMemMap,
    text: 'The map in your memory and the map of the place disagree. The street is shorter than you remember, or turns earlier. The distance between two points that felt long is walkable in four minutes. The map you carry is the map of the child who walked it — the child\'s stride, the child\'s time. You have been navigating by this map for years without knowing it was wrong.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s11ReturnMemMap', true) },
  },

  {
    id: 'sonder11_return_someone_still_there',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s11ReturnStillThere,
    text: 'Someone you knew is still there. They never left. They look familiar and strange simultaneously — the same age as you but differently aged, marked differently by different years. They ask how things are. You tell them. They tell you. The conversation is warm and goes nowhere in particular. You part the way people part who have taken different roads from the same starting place and have arrived at different distances.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s11ReturnStillThere', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ANIMALS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder11_animal_pet_death',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s11AnimalDeath,
    text: 'The animal died. You knew it was going to die — you have always known animals have shorter lives than people, have done the arithmetic on this since childhood — and it died anyway and the knowledge that it was coming did not constitute preparation. The house is different in a way that is hard to locate. Something in a specific corner of a room is gone.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 3; p.setMem('s11AnimalDeath', true) },
  },

  {
    id: 'sonder11_animal_childhood_dog',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s11AnimalChildDog,
    text: 'You think about the dog from your childhood. Not the dog\'s death — you remember that too — but the specific texture of the dog\'s presence: where it chose to sleep, the weight of it against your legs on certain evenings, the particular thing it did that you imitated without noticing. The dog shaped the house in ways you are still understanding forty years later.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s11AnimalChildDog', true) },
  },

  {
    id: 'sonder11_animal_livestock',
    phase: 'childhood',
    weight: 2,
    when: (G) => (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_urban' || G.character.country?.archetype === 'developing_unstable') && G.age >= 8 && G.age <= 18 && !G.mem?.s11AnimalLivestock,
    text: 'The animal is not a pet. It is counted, measured, valued — the number of them is the measure of security. When one dies, something shifts in the arithmetic of the household that you can feel before anyone explains it to you. The animal lives alongside you. It is also an asset, a future, a form of insurance. You understand both things simultaneously and they are not in conflict.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s11AnimalLivestock', true) },
  },

  {
    id: 'sonder11_animal_stray',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && !G.mem?.s11AnimalStray,
    text: 'There is a stray that has been around for a while. You have been feeding it, informally, not often enough to call yourself its person and not infrequently enough to have become its person anyway. The arrangement has no name. The animal comes and goes. One week it doesn\'t come. You do not know what happened to it. You find yourself checking.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s11AnimalStray', true) },
  },

  {
    id: 'sonder11_animal_city_birds',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s11AnimalBirds,
    text: 'The birds have been using the same part of the window ledge for years. You have stopped noticing them. This morning, for no particular reason, you look at them — three of them, doing whatever birds do on ledges, indifferent to the window and to you. You realise you know nothing about them, which is fine. They are not there for you.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s11AnimalBirds', true) },
  },

  {
    id: 'sonder11_animal_old_cat',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s11AnimalOldCat,
    text: 'The cat is very old. It moves slowly, sleeps almost everywhere, has lost interest in certain things it used to care about. You have had it for so long that it is part of the furniture of your life in a way that is hard to account for. You are aware, watching it sleep, that this will end. You have been aware of this for a few years and you have not stopped watching.',
    choices: null,
    effect: (p) => { p.m += 1; p.r += 4; p.setMem('s11AnimalOldCat', true) },
  },

  {
    id: 'sonder11_animal_horse',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 10 && G.age <= 20 && (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_unstable' || G.character.country?.archetype === 'developing_urban') && !G.mem?.s11AnimalHorse,
    text: 'You know the animal by its personality, which is particular and not interchangeable with another animal of the same kind. The way it stands at a specific time of day. Its specific response to you, which is different from its response to someone else. You do not talk about the animal\'s personality to adults because the adults know it is an animal. The knowledge that it is an animal and the knowledge that it has a personality are both true. You hold them both.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s11AnimalHorse', true) },
  },

  {
    id: 'sonder11_animal_new_pet',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children && G.children.length > 0 && G.age >= 35 && !G.mem?.s11AnimalNewPet,
    text: 'The children wanted it and you said no and then you said yes, and now the animal is a member of the household with a name and a routine and a specific chair it has claimed. You have become fond of it in a way you did not anticipate and would not have predicted when you were saying no. The animal has rearranged certain things in the household in the way that new presences rearrange things — not dramatically, just persistently.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s11AnimalNewPet', true) },
  },

  {
    id: 'sonder11_animal_insects',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 15 && !G.mem?.s11AnimalInsects,
    text: 'The careful attention paid to insects in childhood. The specific places they lived, the hours they appeared, the rules you understood about them without anyone explaining. An adult would not spend twenty minutes watching an ant route the same way you watched it. The child\'s attention is total. You have been paying this quality of attention to fewer and fewer things ever since.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('s11AnimalInsects', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WHAT YOU INHERIT
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder11_inherit_face',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s11InheritFace,
    text: 'In a mirror at the wrong angle, in a photograph taken without warning — you see your parent\'s face in yours. The resemblance was always there, probably. At some age it becomes unmistakable. Your face is no longer only your face; it is also the face of someone else, carried forward into a different time.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s11InheritFace', true) },
  },

  {
    id: 'sonder11_inherit_phrase',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s11InheritPhrase,
    text: 'You said something and recognised it as your parent\'s sentence. The exact phrasing — not a cliché, something specific to them. You have absorbed it without noticing. It is not a problem; it is just strange to hear a person who is not here come out of your mouth. You wonder what else you have inherited without a record of the inheritance.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('s11InheritPhrase', true) },
  },

  {
    id: 'sonder11_inherit_worry',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s11InheritWorry,
    text: 'You worry the way your parent worried. The same thing — not the content, exactly, but the mechanism. The same category of worst-case; the same tendency to prepare for the thing that hasn\'t happened; the same 3am particular. You know you do this. You knew you would do it and now you do it. The knowledge did not constitute prevention.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 2; p.r += 2; p.setMem('s11InheritWorry', true) },
  },

  {
    id: 'sonder11_inherit_object',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s11InheritObj,
    text: 'The object came to you from the dead. You didn\'t ask for it; it arrived among the other things that arrived, in a box, or handed over by a sibling, or simply left in the house when the house was cleared. You have been keeping it for years. You don\'t use it. You couldn\'t explain why you keep it except that it was theirs.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s11InheritObj', true) },
  },

  {
    id: 'sonder11_inherit_skill',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s11InheritSkill,
    text: 'You can do something because they could do it and showed you. The teaching was incidental — not a lesson, just doing it with you alongside. You didn\'t know you were learning and they didn\'t make a thing of teaching. Now you do it the way they did it, with the same particular gestures, and the specific way of doing it is the inheritance.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s11InheritSkill', true) },
  },

  {
    id: 'sonder11_inherit_debt',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s11InheritDebt,
    text: 'The inheritance is a debt. Not only money — though there is that — but obligation, history, the need to resolve something they left unresolved. The word "inheritance" implies the good things that pass forward. It also means this: the problem you didn\'t create and have been handed anyway.',
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 2; p.setMem('s11InheritDebt', true) },
  },

  {
    id: 'sonder11_inherit_silence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s11InheritSilence,
    text: 'They did not talk about certain things, and you did not ask about them, and now they are gone and the things not talked about are gone with them. You know the outline — you picked it up over the years from what was not said — but not the content. The inheritance is the shape of a silence without the silence\'s explanation.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('s11InheritSilence', true) },
  },

  {
    id: 'sonder11_inherit_temperament',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s11InheritTemp,
    text: 'Someone who knew both of you tells you that you have your father\'s way with certain situations, or your mother\'s reaction to certain things. This is not a compliment or a criticism — it is an observation. You are aware that you are not a clean start. You are also the end of a line that runs through people you did not fully know. The temperament arrived before the person understood it.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('s11InheritTemp', true) },
  },

  {
    id: 'sonder11_inherit_country',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s11InheritCountry,
    text: 'You were born into a history you did not choose. The country its current shape, the language its particular grammar, the religion its specific theology — or the absence of it, inherited from parents who also inherited that absence. The inheritance is not only personal. You received the place and the time as you received the name: before you could consent to it.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s11InheritCountry', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THE WINDOW
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder11_window_morning',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s11WindowMorning,
    text: 'You stand at the window in the morning. The same view, the same light, roughly the same things happening in it. You have been standing here long enough that the view has become the background of a particular kind of thinking — the thinking that happens when the eyes are occupied and the mind goes sideways. You do your best thinking here without knowing you are thinking.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s11WindowMorning', true) },
  },

  {
    id: 'sonder11_window_opposite',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.s11WindowOpposite,
    text: 'The building opposite has lit windows at night. You can see fragments — the top of a bookshelf, the ceiling of a kitchen, the brief shadow of someone crossing a room. You don\'t know them. You see them through a lit rectangle and the rectangle shows you almost nothing and it is enough to know that someone is there, living a life that is entirely their own, which you will never see.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('s11WindowOpposite', true) },
  },

  {
    id: 'sonder11_window_tree',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s11WindowTree,
    text: 'The tree in front of the window has been there the entire time. You have watched it lose leaves and gain them back enough times that you have lost count. You notice it most in the specific week when the new leaves arrive each year — the exact green of early leaves that only lasts about ten days before they darken. You always notice that week. You have been noticing it for years.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s11WindowTree', true) },
  },

  {
    id: 'sonder11_window_street',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s11WindowStreet,
    text: 'From this window you can see a particular segment of street. Over the years you have watched: the delivery man who always parks the same way, the man who walks the dog at the same time, the children who used to appear in the afternoon who now appear less often as they aged toward the years where they don\'t walk outside anymore. A street, witnessed over years, is a kind of documentary.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s11WindowStreet', true) },
  },

  {
    id: 'sonder11_window_rain',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s11WindowRain,
    text: 'Rain on the window. Not the sound — though that too — but the specific way the drops gather and run. You have been watching this since childhood. The watching is not deliberate. Rain on glass does something to attention that makes you stop and look. You are not sure why. There is no reason. It has always been this way.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s11WindowRain', true) },
  },

  {
    id: 'sonder11_window_new_view',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 38 && !G.mem?.s11WindowNew,
    text: 'The new place has a different view. You are surprised how long it takes to adjust — not the new rooms but the new window, the new default position of the eyes when you are not thinking about where you are looking. The old view has already started to fade. In a year this view will be the one you can\'t remember not knowing.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 1; p.setMem('s11WindowNew', true) },
  },

  {
    id: 'sonder11_window_winter',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s11WindowWinter,
    text: 'The window in winter. The light that comes through it is a winter light — lower, different quality, carrying less. You have been indoors more than you used to be. The window has become more important: the daily record of what is outside, whether anyone is on the street, what kind of cold it looks like, the specific colour of the sky in the early afternoon. The window is the eye the house keeps on the world.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s11WindowWinter', true) },
  },

  {
    id: 'sonder11_window_last',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s11WindowLast,
    text: 'This is the last window you are likely to look out of regularly. Not because anything has been announced — nothing has. But you are old enough to know that each house may be the last, each view the view you finish with. You look at it with slightly more attention than usual. It is not a dramatic view. You have been looking at it for years. That is exactly the thing.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.setMem('s11WindowLast', true) },
  },

  {
    id: 'sonder11_window_morning_routine',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s11WindowRoutine,
    text: 'The morning has a sequence: water, window, something warm. The window is not deliberate. You do not go to the window with purpose. You arrive at it the way you arrive at certain habits — through repetition that has become the default motion of the body at that hour. The view is always the same. You look anyway.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s11WindowRoutine', true) },
  },

]

// events_sonder_24.js
// Contemplative layer: 28 weight-2 mem-gated events, no choices, no new flags.
// Themes: the shop that closed, the voice that's gone, a borrowed object
// returned, the year the weather changed, an old habit, the cost of things
// now, the way a name is said, what photographs leave out, the last lesson,
// a stranger's laughter, what time sounds like, the body's older knowledge,
// doors that open by sound, the weight of a house key, what winter taught,
// the particular Tuesday, what the city became, the morning after, things
// kept from children, the competence you watch in someone else, the airport,
// the smell of an old classroom, certain roads, what the news was, the
// small ceremony, the last year you didn't think about your health.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_24 = [

  {
    id: 'sdr24_shop_that_closed',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr24Shop,
    text: () => pick([
      'The shop is gone. Not recently — years ago — but you still catch yourself about to turn down that street before remembering.',
      'The bakery closed and something that felt permanent turned out not to be. The street is different now in a way that does not have a name.',
      'You walked past the space and it had been a different shop for years, and still you registered the absence of the thing it used to be.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Shop', true) },
  },

  {
    id: 'sdr24_voice_gone',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr24VoiceGone,
    text: () => pick([
      'You cannot reproduce the sound of their voice. You can describe it. The description is not the sound.',
      'There are people whose voices you can still hear exactly, and people whose voices you cannot, and the ones you cannot are not always the ones you expected.',
      'The voice is gone and what remains is the shape of how they said certain words. Enough to know they said them. Not enough to hear.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24VoiceGone', true) },
  },

  {
    id: 'sdr24_borrowed_object_returned',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.sdr24Borrowed,
    text: () => pick([
      'Someone returned the book — fifteen years later, sheepishly, which was not necessary. You had forgotten you lent it. When you held it you remembered everything.',
      'The umbrella you left somewhere came back through a chain of hands you cannot now reconstruct. The inside of it still has your initials.',
      'You returned the jacket. It fit differently now, but they didn\'t say so.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Borrowed', true) },
  },

  {
    id: 'sdr24_year_weather_changed',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24WeatherChanged,
    text: () => pick([
      'There was a year when the season started later, and then it became the new schedule, and now you cannot remember what the old one was exactly.',
      'The winters were different when you were small. You have said this several times now. You are not certain of the specifics. The feeling remains.',
      'The summer that went on too long. Everyone said it. Then the next one was longer. At some point the extraordinary became the expectation.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24WeatherChanged', true) },
  },

  {
    id: 'sdr24_old_habit',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24OldHabit,
    text: () => pick([
      'You stopped the habit years ago and still sometimes reach for it — the cigarette, the drink, the walk, the particular worry — before remembering it is not part of the life now.',
      'The habit you kept from twenty is still with you, slightly embarrassing, fully functional. You have explained it to new people several times by now.',
      'You picked up the habit from someone who is no longer in your life and it has outlasted the relationship by many years. That is the kind of thing you only notice occasionally.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24OldHabit', true) },
  },

  {
    id: 'sdr24_cost_of_things',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sdr24CostOfThings,
    text: () => pick([
      'The price of the thing you have bought every year for twenty years is now twice what it was, and you know this because you know what things cost.',
      'Your grandmother would say the price of bread and her voice would have a quality that you now understand for the first time.',
      'You can remember the number. The amount you made in your first job. The amount the flat cost. The amount the flight was. Numbers carry their years inside them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24CostOfThings', true) },
  },

  {
    id: 'sdr24_name_said',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr24NameSaid,
    text: (G) => pick([
      `Someone said your name the way only one other person has ever said it, and you turned around expecting the wrong face.`,
      `The name you use now is not the name you were called at home, and sometimes when you hear the home-name it startles you, which is information about how far you have come.`,
      `Your name sounds different in other languages. People make small adjustments without asking. You have never fully settled which version is yours.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24NameSaid', true) },
  },

  {
    id: 'sdr24_photograph_leaves_out',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24Photo,
    text: () => pick([
      'The photograph from that year shows the occasion. Everything that was happening that was not the occasion is not in it.',
      'You look happy in the picture. You were not unhappy. The two things are not the same and the photograph cannot hold both.',
      'The photo cuts off at the edge and on the other side of that edge is a person you have been trying for years not to think about at this occasion, and there they are, cut off.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Photo', true) },
  },

  {
    id: 'sdr24_last_lesson',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.sdr24LastLesson,
    text: () => pick([
      'The thing you learned most recently that was genuinely new — the kind of new that changes something about how you see the rest — you can still name the month.',
      'There was a teacher who taught you something you did not know you needed. You told them later. They didn\'t remember the moment. It was ordinary to them.',
      'Late knowledge: the kind that arrives when you finally have enough context for it. You understand something now that you didn\'t have the structure for at twenty.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24LastLesson', true) },
  },

  {
    id: 'sdr24_strangers_laughter',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr24StrangerLaugh,
    text: () => pick([
      'You heard laughter from the next room and it was so specific — that precise register — that you almost called a name that would have been wrong.',
      'The stranger at the table laughed and you missed someone, briefly, in a way that had nothing to do with the stranger and everything to do with the sound.',
      'The quality of laughter changes across a life. You have been in rooms with laughter that you will not hear again in quite that form.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24StrangerLaugh', true) },
  },

  {
    id: 'sdr24_what_time_sounds_like',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr24TimeSounds,
    text: () => pick([
      'The clock in the hallway. The particular sound of an empty Sunday afternoon. The sound of a place when everyone is asleep. Time has textures you could pick out of a lineup.',
      'You can reconstruct certain years from sound: what was playing, what the traffic was doing, whether the window was open, which neighbour was up late.',
      'The sound of old age is partly the quiet. The fewer sounds in a room and the weight each one carries.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24TimeSounds', true) },
  },

  {
    id: 'sdr24_body_older_knowledge',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sdr24BodyKnows,
    text: () => pick([
      'Your body knows the weather before you look. It knows when something is coming. This is not mystical — it is information accumulated over forty years.',
      'The posture you developed for one job stayed in your shoulders long after the job ended. Bodies carry their histories as muscular memory.',
      'The ache that started three years ago — you can tell now which movements bring it and which ones let it rest. The map of it is detailed and entirely yours.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24BodyKnows', true) },
  },

  {
    id: 'sdr24_door_by_sound',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr24DoorSound,
    text: () => pick([
      'You knew who was home by the sound of the door. The weight of a hand on a handle is personal. You still know this.',
      'The door of the apartment is a specific sound and you can hear it from anywhere in the building and know immediately whether it is yours.',
      'In the old house the third stair had a particular sound. You can hear it exactly. The stair is probably still there.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24DoorSound', true) },
  },

  {
    id: 'sdr24_house_key',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr24HouseKey,
    text: () => pick([
      'You have given out several keys over the course of this life. Not all of them have come back. Somewhere there are keys to places you no longer live.',
      'The key to the first place that was yours alone. You kept it for years after moving. Some objects require a long goodbye.',
      'The weight of a key is the weight of belonging somewhere specific. When you lost that key, the moment before you found it had a particular quality of suspended life.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24HouseKey', true) },
  },

  {
    id: 'sdr24_what_winter_taught',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr24Winter,
    text: () => pick([
      'Winter is a teacher you return to. What it teaches — slowness, the value of warmth, the way darkness forces a different kind of attention — you could not have learned in summer.',
      'The winters you have lived through vary enormously. The worst ones have specific dates. The best ones have mornings you can still reproduce.',
      'At this age the cold takes longer to leave. The body\'s relationship to winter is a negotiation rather than a certainty.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Winter', true) },
  },

  {
    id: 'sdr24_particular_tuesday',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.sdr24Tuesday,
    text: () => pick([
      'There was a Tuesday, entirely unremarkable in advance, on which something happened that changed the shape of the next several years. It looked like an ordinary Tuesday.',
      'The day you remember best from that period was not the obvious day. It was a Wednesday in March, or a Tuesday, ordinary until it wasn\'t.',
      'Sometimes the important days announce themselves. More often they do not. You cannot know which ordinary morning is the last ordinary morning.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Tuesday', true) },
  },

  {
    id: 'sdr24_what_city_became',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.ruralUrban === 'urban' && !G.mem?.sdr24CityBecame,
    text: () => pick([
      'The city you know is not the city as it currently is. You walk through the current city and see the city of twenty years ago in the same street, overlaid.',
      'The neighbourhood changed and you stayed, and now you are one of the people who remember what it was before, which makes you a local to a place that no longer exists.',
      'You can give directions using buildings that are gone. The city inside your head is the city as it was, not as it is, and the two are different in ways that are hard to explain to newcomers.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24CityBecame', true) },
  },

  {
    id: 'sdr24_morning_after',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.sdr24MorningAfter,
    text: () => pick([
      'The morning after the thing that ended. The ordinary quality of the morning was itself a kind of information about how the world continues.',
      'You woke up and for a second did not remember, and then you did, and the day started from there.',
      'The morning after is not the worst. The worst is later, when the shock has worn off and what remains is just the fact of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24MorningAfter', true) },
  },

  {
    id: 'sdr24_kept_from_children',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.children?.length > 0 && !G.mem?.sdr24KeptFromChildren,
    text: () => pick([
      'There are things about your life that your children do not know. Not secrets exactly — more like history that did not seem useful to transfer. You wonder sometimes.',
      'The story you decided not to tell them: you made the decision so often it became automatic, and then one day they were old enough that the omission was its own shape.',
      'They will find out eventually, or they will not. The question of how much a child should know about the life their parent lived is not one with a clean answer.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24KeptFromChildren', true) },
  },

  {
    id: 'sdr24_competence_in_someone_else',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24OtherCompetence,
    text: () => pick([
      'You watched someone do a thing you have been doing for years and they did it better, and the feeling this produced was complicated and clarifying in equal parts.',
      'The younger person handled the situation exactly right. You watched them the way you watch someone parallel park a car into a space you\'ve been circling.',
      'Competence in another person: the slight sting of it and the pleasure of being in its presence. The two arrive together.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24OtherCompetence', true) },
  },

  {
    id: 'sdr24_the_airport',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.sdr24Airport,
    text: () => pick([
      'The airport at 5am. Everyone in the terminal is going somewhere and the terminal is a kind of suspension — not here, not there, the between-state that has its own quality.',
      'The gate area before a long flight. Everyone carrying what they decided was worth carrying. Everyone about to be somewhere else.',
      'You have watched more departures than you will arrivals. The arithmetic of that only becomes visible later.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Airport', true) },
  },

  {
    id: 'sdr24_classroom_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24ClassroomSmell,
    text: () => pick([
      'The smell of chalk and particular cleaning chemicals and old wood — the smell of a classroom — arrived from somewhere and you were, briefly, nine years old.',
      'Walking into the school for your child\'s event and the smell was the smell, unchanged in thirty years, and thirty years was nothing for a moment.',
      'Memory through smell has no distance. The classroom arrives at full intensity with no preamble.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24ClassroomSmell', true) },
  },

  {
    id: 'sdr24_certain_roads',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr24Roads,
    text: () => pick([
      'There are roads you have driven so many times that the hands do it without the mind. The hands know every curve. The mind can be elsewhere.',
      'The road you took every day for ten years you could still drive in the dark, though you moved away and the road has probably changed.',
      'A road has its own personality after enough trips. The specific quality of its light at a certain hour, the bend where something happened once.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24Roads', true) },
  },

  {
    id: 'sdr24_what_the_news_was',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.sdr24OldNews,
    text: () => pick([
      'You can remember what the news was on certain days with a clarity you cannot explain. The day\'s important events are now history, and they were the world then.',
      'There are years that compressed — years in which the world seemed to accelerate — and years in which nothing changed. From inside them it was impossible to know which you were in.',
      'The event that dominated for months is in a book now, a chapter heading. At the time it was the texture of every day.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24OldNews', true) },
  },

  {
    id: 'sdr24_small_ceremony',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr24SmallCeremony,
    text: () => pick([
      'The small ceremony you keep: the cup of tea at the same time, the walk on the same day of the week, the particular way you mark the end of something. Small and load-bearing.',
      'You didn\'t decide to make it a ritual. It became one because you did it enough times and now the skipping of it has a quality.',
      'The private ceremony requires no audience and produces no record. That is its function — the thing you do that is only for you.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24SmallCeremony', true) },
  },

  {
    id: 'sdr24_last_year_no_health_thoughts',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.sdr24HealthYear,
    text: () => pick([
      'You can identify, approximately, the last year you did not think about your health most days. It was not recently.',
      'At some age the body becomes a daily item on a list. Not a crisis — just a thing to be managed the way a car is managed, which is not how it felt before.',
      'The year you went to the doctor for the first time for something you\'d ignored. The appointment took fifteen minutes. The category shift took longer.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24HealthYear', true) },
  },

  {
    id: 'sdr24_other_light',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.sdr24OtherLight,
    text: () => pick([
      'The light on in the apartment across the street, 11pm. Someone is still awake over there. The light is the only evidence of an entire life going on simultaneously.',
      'Walking past a window and the inside of someone\'s evening: a television, a lamp, a figure. The complete unknowability of what that evening is.',
      'The lit window: the simplest version of the thought that other people\'s lives are full from the inside. That specific fullness, in that specific apartment, you will never know.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24OtherLight', true) },
  },

  {
    id: 'sdr24_what_you_kept',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.sdr24WhatKept,
    text: () => pick([
      'The object that survived every move: not valuable, not beautiful, present in every place you have lived. Its survival is the record of something you cannot quite name.',
      'You kept the letter. You kept the photograph with the bent corner. You kept the small object that no one else would have taken. The keeping is a decision made repeatedly without deciding.',
      'What you held on to, across forty years of living in different places, is a self-portrait of a kind. The accumulation tells you something about what you think matters.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr24WhatKept', true) },
  },

]

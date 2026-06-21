// events_sonder_7.js — MODE C contemplative layer, seventh pass
// 36 single-fire auto-resolve events in four registers:
//   FOOD AND MEALS — cooking, eating, the dish that means home
//   CEREMONY AND RITUAL — weddings, funerals, the regular marking of time
//   THE STREET — the city as texture, the corner, the market, the stall
//   SOUND AND MUSIC — ambient sound, the songs that date a year
// All mem-gated to fire once. Weight 2. No new flags. Minimal effects.

export const EVENTS_SONDER_7 = [

  // ──────────────────────────────────────────────────────────────────────────
  // FOOD AND MEALS
  // Not the drama of hunger or abundance but the specific and persistent
  // texture of what gets eaten, how it gets made, what it carries.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder7_food_mothers_dish',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 30 &&
      !G.mem?.s7FoodMothers,
    text: 'You are making the thing your mother made. You know the steps — you have watched them enough times that your hands know them without consulting your mind — but yours does not taste like hers and you cannot isolate the difference. It is possible the difference is the season, or the water, or something you have slightly wrong in the proportions. It is possible the difference is that you are not her and this is not her kitchen and it is not then. You have accepted this.',
    choices: null,
    effect: (p) => { p.m -= 1; p.r += 2; p.setMem('s7FoodMothers', true) },
  },

  {
    id: 'sonder7_food_eating_alone',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 18 && G.age <= 35 &&
      !G.partner &&
      !G.mem?.s7FoodAlone,
    text: 'You eat standing at the counter or sitting on the edge of the bed or on the floor with your back against the sofa. You have not set a place at the table. The table is where you put things. This is a phase or it is a life; you have not decided yet and the food does not care.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s7FoodAlone', true) },
  },

  {
    id: 'sonder7_food_feast_day',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.s7FoodFeast,
    text: 'Once a year the table is different. More food than usual arrives at once. There is a specific smell in the house before anyone eats. The adults are talking and you are allowed to stay up. The food marks the day the way a flag marks a building — it tells you this one is different from the ones around it. You will remember the food more clearly than whatever occasion it marked.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s7FoodFeast', true) },
  },

  {
    id: 'sonder7_food_cooking_for_many',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.s7FoodMany,
    text: 'The kitchen is too small for the number of people expected. You calculate quantities. You have made this before but never quite this much of it. There is a satisfaction in the logistics that is separate from anything social — the timing of what goes in first, the ordering of the heat. When people say it was good you are glad but what you remember is the calculation.',
    choices: null,
    effect: (p) => { p.s += 2; p.karma += 1; p.setMem('s7FoodMany', true) },
  },

  {
    id: 'sonder7_food_cant_afford',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.stats?.wealth <= 25 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.s7FoodCantAfford,
    text: 'You know the cheapest things by price without having to look. You know which combinations keep you going and which ones only feel like they do. You have calculated this so many times that the calculation is now automatic. You are not thinking about this. You are just eating.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s7FoodCantAfford', true) },
  },

  {
    id: 'sonder7_food_smell_of_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.s7FoodSmellHome,
    text: 'You are somewhere — a restaurant, a market, someone else\'s kitchen — and the smell is exactly the smell of your childhood home. Not similar. Exactly. You stop. People move around you. The smell lasts for a moment and then you are in the present again, holding whatever you were holding, having been somewhere else for three seconds without leaving.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 1; p.setMem('s7FoodSmellHome', true) },
  },

  {
    id: 'sonder7_food_market_negotiation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban !== 'urban' || ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character?.archetype) &&
      G.age >= 25 &&
      !G.mem?.s7FoodMarket,
    text: 'The price is not the price. This is understood by both parties. You name what you will pay; she names what she will accept; the final number is somewhere between them and was always going to be somewhere between them. The negotiation is social as much as economic — to not negotiate would be an insult to the process, a refusal of the form. You have been doing this since you were old enough to be sent to the market alone.',
    choices: null,
    effect: (p) => { p.s += 1; p.e += 1; p.setMem('s7FoodMarket', true) },
  },

  {
    id: 'sonder7_food_first_restaurant',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.age >= 8 && G.age <= 13 &&
      !G.mem?.s7FoodRestaurant,
    text: 'The first time in a restaurant you are uncertain about the order of things. Someone else brings the food. You are allowed to choose from a page. You do not choose the cheapest thing because you have been told you can choose what you want, but you choose the second cheapest because you cannot fully believe it. The food arrives and it is good. You do not fully relax until you are back outside.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s7FoodRestaurant', true) },
  },

  {
    id: 'sonder7_food_late_life_appetite',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 65 &&
      !G.mem?.s7FoodLateLife,
    text: 'You are not as hungry as you used to be. The food that once occupied an important part of the day is now something you get through. This is not sadness — it is a change in the body\'s requirements, a recalibration. You notice it mostly when someone makes a special effort and you cannot do it justice. You eat what you can and say it was very good, which is both true and not quite the point.',
    choices: null,
    effect: (p) => { p.h -= 1; p.r += 2; p.setMem('s7FoodLateLife', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CEREMONY AND RITUAL
  // The recurring structures that mark time — not dramatic moments but the
  // repeated forms that give shape to a year or a life.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder7_ritual_wedding_guest',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.s7RitualWedding,
    text: 'You are a guest at a wedding. The ceremony is in the form it always takes in this community and you know when to sit and when to stand. You watch the couple trying to be present in a moment that everyone around them is photographing. They will spend years with the photographs rather than the memory. You do not know if this is new or if it was always this way and the photographs are just more literal now.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s7RitualWedding', true) },
  },

  {
    id: 'sonder7_ritual_funeral_form',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s7RitualFuneral,
    text: 'The funeral follows its form. You know the words and the postures. The form is what holds you — the prescribed movement from one part to the next means you do not have to decide what to do with your body. This is what ceremony is for. The grief is your own. The form is shared and has belonged to this community for longer than anyone present can remember.',
    choices: null,
    effect: (p) => { p.m -= 2; p.r += 2; p.karma += 1; p.setMem('s7RitualFuneral', true) },
  },

  {
    id: 'sonder7_ritual_birthday_alone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 40 && G.age <= 60 &&
      !G.partner &&
      !G.mem?.s7RitualBirthday,
    text: 'Your birthday arrives. You had not planned anything. People send messages and you respond to each one. Later in the day you buy something small — not a gift, just something you wanted — and this is the extent of the marking. The day passes at the same speed as other days. You are fine. This is just one of the forms a birthday can take.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s7RitualBirthday', true) },
  },

  {
    id: 'sonder7_ritual_prayer_habit',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.religion !== 'none' &&
      G.age >= 18 &&
      !G.mem?.s7RitualPrayer,
    text: 'The prayer has been said enough times that the words arrive before the intention. This is not failure of faith — it is what practice becomes. The words arrive and the intention follows, or it does not, and you are in the habit of saying them regardless. You have decided this is acceptable. You have met people who find this troubling and people who find it the whole point.',
    choices: null,
    effect: (p) => { p.m += 1; p.karma += 1; p.setMem('s7RitualPrayer', true) },
  },

  {
    id: 'sonder7_ritual_new_year',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.s7RitualNewYear,
    text: 'The new year arrives at midnight. You are somewhere with other people or you are in bed already. The agreed-upon moment passes. The calendar changes. Nothing else changes at midnight — it is a convention, an inherited fiction — but you feel something anyway, some vestigial hope about the transition, which is apparently not something you have been able to reason your way out of.',
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('s7RitualNewYear', true) },
  },

  {
    id: 'sonder7_ritual_weekly_observance',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.age >= 8 && G.age <= 14 &&
      G.religion !== 'none' &&
      !G.mem?.s7RitualWeekly,
    text: 'Once a week the family goes. You do not always want to go. The wanting is not the point — the going is the point. The room smells like a particular kind of old, or incense, or whatever the community uses to mark that this space is different from the spaces outside it. You have been sitting in this room since before you can remember. That is also what this room is: the earliest thing.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s7RitualWeekly', true) },
  },

  {
    id: 'sonder7_ritual_anniversary_forgotten',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.partner &&
      G.age >= 35 &&
      !G.mem?.s7RitualAnniversary,
    text: 'You have forgotten an anniversary or a date that matters to your partner, or they have forgotten one that matters to you. The forgetting is not the problem — the forgetting is the symptom. You have both been living alongside the same life and the markers of the life have moved to the background. You have a conversation that is not quite the conversation you need. This is probably fine. It is also a kind of signal.',
    choices: null,
    effect: (p) => { p.m -= 2; p.r += 2; p.setMem('s7RitualAnniversary', true) },
  },

  {
    id: 'sonder7_ritual_first_rite',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.age >= 10 && G.age <= 14 &&
      G.religion !== 'none' &&
      !G.mem?.s7RitualFirst,
    text: 'There is a ceremony for when you are old enough. You have been preparing for months. The ceremony lasts for a specific time and follows its specific order. Afterward there is food and relatives you rarely see. Everyone tells you that you are grown now. You are not grown. But you have passed through a form that says you are, and the form is real even if the feeling will take years.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 1; p.setMem('s7RitualFirst', true) },
  },

  {
    id: 'sonder7_ritual_late_pilgrimage',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.religion !== 'none' &&
      G.age >= 55 &&
      !G.mem?.s7RitualPilgrimage,
    text: 'You go somewhere you always meant to go. The place is sacred in the tradition you were raised in, or the tradition you arrived at, or both. The journey is the point as much as the destination — this is what pilgrimages have always said and you understand it differently now that you are making one. The place itself is smaller than you imagined. This is also standard, and also does not diminish it.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 3; p.r -= 2; p.setMem('s7RitualPilgrimage', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // THE STREET
  // Not the city as backdrop but the street as specific experience —
  // the corner you know, the route you take, the public life of a neighbourhood.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder7_street_corner',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.s7StreetCorner,
    text: 'There is a corner you pass every day. You know it the way you know a face — not by description but by something more immediate. You know which lamp flickers. You know the stall that moves with the season. You know the hour when a particular kind of person is standing there. The corner does not know you. This asymmetry is just the nature of streets.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s7StreetCorner', true) },
  },

  {
    id: 'sonder7_street_night_walk',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.s7StreetNight,
    text: 'You are walking at night through a part of the city you don\'t usually walk at night. You are aware of your footsteps on the pavement. The city at this hour is the same city and not the same city. The shops are closed. There are people you recognise as belonging to this hour — the ones who are always out when others aren\'t, for whatever reason, which you understand without needing to know the specifics.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s7StreetNight', true) },
  },

  {
    id: 'sonder7_street_neighbourhood_changed',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s7StreetChanged,
    text: 'The neighbourhood is not what it was. This is verifiable, not nostalgia — the shops are different, the people on the street are different, the prices are different. You walk through it knowing both versions: the current one and the one underneath. This double vision is one of the things that accumulates over time. You are not sure if it is a gain or a form of haunting.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s7StreetChanged', true) },
  },

  {
    id: 'sonder7_street_market_day',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.ruralUrban !== 'urban' &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.s7StreetMarketDay,
    text: 'Market day transforms the town. Stalls appear where there were no stalls. People come from the surrounding villages and they have a different quality of attention — more purposeful, more alert. The smell is different. The sound is different. You know the day\'s rhythms: early is produce, afternoon is slower, near the end is when prices drop. You have learned this from following your mother and now you move through it on your own.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s7StreetMarketDay', true) },
  },

  {
    id: 'sonder7_street_commute_body',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.s7StreetCommute,
    text: 'Your body knows the commute. It knows when to stand, which side to move to, when the delay is normal and when it isn\'t. The route has been walked or ridden enough times that it does not require attention. Your mind goes elsewhere while your body navigates. When the route changes — a closure, a detour — you notice how deep the body\'s expectation was. You are briefly lost somewhere you have been ten thousand times.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s7StreetCommute', true) },
  },

  {
    id: 'sonder7_street_neighbour',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.s7StreetNeighbour,
    text: 'You know your neighbour well enough to greet but not to visit. You know the hours they keep and the sound their door makes and roughly what they look like in the morning. You have developed a courtesy that is calibrated to exactly this distance — warm enough to be civil, not so warm as to create an obligation. The calibration took about three months and you do not think about it.',
    choices: null,
    effect: (p) => { p.s += 1; p.setMem('s7StreetNeighbour', true) },
  },

  {
    id: 'sonder7_street_power_out',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone', 'post_soviet'].includes(G.character?.archetype) &&
      G.age >= 25 &&
      !G.mem?.s7StreetPowerOut,
    text: 'The power goes out and the street rearranges itself. People come outside who were not outside. Candles appear in windows. The street is quieter and also more present to itself — the sounds that the electricity masked come back: insects, wind, distant conversation, a radio running on batteries. You have lived through enough power cuts that you know what to do and what to do without. The cut is an inconvenience. It is also, briefly, a different kind of evening.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s7StreetPowerOut', true) },
  },

  {
    id: 'sonder7_street_bus_stop',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.s7StreetBusStop,
    text: 'At the bus stop there is a man you see every Tuesday. You have never spoken. You have shared this corner at this hour perhaps forty or fifty times. He is always reading something. You have seen the covers change over months. This is the extent of what you know about him, which is not nothing — it is that he reads, that he takes this bus, that he is there on Tuesdays. The rest of him is elsewhere, entirely unknown to you, going through its own Tuesday.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s7StreetBusStop', true) },
  },

  {
    id: 'sonder7_street_late_return',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 58 &&
      !G.mem?.s7StreetLateReturn,
    text: 'You walk through the street where you grew up. It has been redone since — the paving, the shopfronts, the trees. The scale is the same. The scale is what you remember most truly: how wide the street was, what the height of the buildings felt like at ten years old. The street remembers nothing about you. You remember everything about it. This is the standard arrangement.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 1; p.setMem('s7StreetLateReturn', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SOUND AND MUSIC
  // Not the cultural markers already in soundtrack.js but the ambient,
  // involuntary presence of sound in a life — what you can't unhear,
  // what music does to time, the specific frequency of a life.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder7_sound_earworm',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.s7SoundEarworm,
    text: 'A song has been going in your head since this morning. You do not know when it started or where it came from. You did not choose it. It is not a song you especially like. It follows you through the day with a persistence that suggests it is trying to tell you something, which it is not — it is a song, it is not trying to do anything. It will stop when it stops.',
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('s7SoundEarworm', true) },
  },

  {
    id: 'sonder7_sound_neighbours_music',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.s7SoundNeighbours,
    text: 'Through the wall, or from the floor above, music is playing. You can identify the genre but not the song. You can hear it well enough that it sets the texture of the evening without your having chosen it. You have stopped noticing this, mostly. Tonight you notice it. Someone up there is having a different evening than you are, with different music, and the music is bleeding through into yours.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s7SoundNeighbours', true) },
  },

  {
    id: 'sonder7_sound_dated_by_song',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 &&
      !G.mem?.s7SoundDated,
    text: 'A song comes on — a shop, a passing car, a radio someone has on in another room — and you are immediately a different age, in a different year, in a specific afternoon you had not thought of in a long time. The memory is not summoned by thinking but by the song arriving before your defences could be organised. This is how music stores time differently from photographs: you do not look at it. It comes in through the part of you that was open.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s7SoundDated', true) },
  },

  {
    id: 'sonder7_sound_city_baseline',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' &&
      G.age >= 20 &&
      !G.mem?.s7SoundCity,
    text: 'You are somewhere quiet — countryside, a room in a different city, late at night — and you become aware that the sound of your city is in you, installed. The traffic frequency you never noticed. The frequency of voices on a certain kind of street. The sound of your city at eleven PM specifically, which is different from midnight, which is different from two AM. You carry the city in the frequency of your expectations.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s7SoundCity', true) },
  },

  {
    id: 'sonder7_sound_childhood_lullaby',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.children && G.children.length > 0 &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.s7SoundLullaby,
    text: 'You are singing to the child and you realise you are singing what was sung to you. You did not decide this. Your mother\'s voice is in your voice and she learned it from hers. The song is older than anyone you can name. You are a link in it. The child does not know this. The child just knows the sound, which is what you knew too.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 2; p.setMem('s7SoundLullaby', true) },
  },

  {
    id: 'sonder7_sound_prayer_call',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      (G.religion === 'islam_sunni' || G.religion === 'islam_shia' || G.religion === 'islam_sufi') &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.s7SoundAdhan,
    text: 'The adhan comes five times a day and you have heard it since before you could count. It is background; it is structure. You know the hours by it without checking the clock. Some days it is sound and some days it is meaning and some days it is both. Today it is both. You stop what you are doing and you do not move for a moment, which is its own kind of response.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s7SoundAdhan', true) },
  },

  {
    id: 'sonder7_sound_silence',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 58 &&
      !G.mem?.s7SoundSilence,
    text: 'You are in a room alone and it is quiet and you are not doing anything. This used to make you uncomfortable. At some point it stopped making you uncomfortable. You are not sure when — the transition was gradual enough that you noticed only after it had happened. You sit in the quiet and the quiet is neither empty nor full. It is just what is there.',
    choices: null,
    effect: (p) => { p.m += 2; p.r -= 1; p.setMem('s7SoundSilence', true) },
  },

  {
    id: 'sonder7_sound_instrument_not_played',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.s7SoundInstrument,
    text: 'You played once. It might have been piano, or guitar, or something with strings or keys. You stopped when you got busy — when the lessons ended, or when you moved, or when you had children, or when the instrument just stopped being a thing you did. You still know how to hold it. Your hands know where to go. You play occasionally, badly, and the knowledge is still there even though you have not maintained it. This is how skills keep you: they degrade slowly enough to pretend they\'re intact.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 1; p.setMem('s7SoundInstrument', true) },
  },

  {
    id: 'sonder7_sound_news_radio',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 30 &&
      !G.mem?.s7SoundRadio,
    text: 'The news comes on at a fixed time and you are in the habit of being somewhere near the radio at that time. You have organised part of your day around this. The announcer\'s voice is familiar in the way a daily voice becomes familiar — not like a person you know but like a frequency you recognise. The news is often bad. You listen anyway because not listening does not change the news, only your awareness of it.',
    choices: null,
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('s7SoundRadio', true) },
  },

]

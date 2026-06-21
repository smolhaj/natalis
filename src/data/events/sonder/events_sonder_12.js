// events_sonder_12.js — 36 contemplative auto-resolve sonder events
// Four registers: SOUND, WHAT YOU MADE, THE OFFICIAL LANGUAGE, THE HOUR

export const EVENTS_SONDER_12 = [

  // ─── SOUND ───────────────────────────────────────────────────────────────

  {
    id: 'sonder12_sound_radio_between',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 14 && !G.mem?.s12SoundRadio,
    text: 'On a long journey — the back of a car or a bus or a train — the radio loses its station and becomes a kind of static that has almost a tune in it. You look out the window and the landscape moves and the static continues. You are not thinking about anything in particular. This is one of the quieter things you remember.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 1; p.setMem('s12SoundRadio', true) },
  },

  {
    id: 'sonder12_sound_neighbor_tv',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && !G.mem?.s12SoundNeighborTv,
    text: 'Through the wall at night, a neighbor\'s television. You can hear the voices but not the words — the rhythm of speech, the periodic laughter, the music that marks something emotional. You are awake and they are watching something. The wall makes them abstract. The sound is very specific.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s12SoundNeighborTv', true) },
  },

  {
    id: 'sonder12_sound_adhan_gone',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.religion === 'muslim' &&
      G.flags.has('emigrant') &&
      G.age >= 20 &&
      !G.mem?.s12SoundAdhanGone,
    text: 'The first time you notice its absence, you have been here several months. The call to prayer was five times a day for as long as you were alive and you did not always hear it consciously — it was part of the texture of the air. Here, there is no call. The air in the morning is different. It is not wrong. It is simply different from what you did not know you expected.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 1; p.setMem('s12SoundAdhanGone', true) },
  },

  {
    id: 'sonder12_sound_machinery_gone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('rust_belt_community') || G.flags.has('factory_generation') || G.flags.has('industrial_worker')) &&
      G.age >= 35 &&
      !G.mem?.s12SoundMachineryGone,
    text: 'The plant has been closed long enough now that you have stopped expecting the sound. For years, on certain mornings, your body would expect it — the low continuous frequency that was the background note of growing up here, the thing that meant the shift was running. It is gone. What took its place is the absence that has its own sound, which is nothing at all.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s12SoundMachineryGone', true) },
  },

  {
    id: 'sonder12_sound_construction',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 50 && !G.mem?.s12SoundConstruction,
    text: 'There was construction outside your window for so long it became inaudible. The jackhammer, the reversing beep, the shouts of the workers at seven in the morning. It finished sometime last year. You noticed the first morning of silence more sharply than you ever noticed the noise.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s12SoundConstruction', true) },
  },

  {
    id: 'sonder12_sound_power_cut',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_urban' || G.character.country?.archetype === 'developing_unstable') &&
      G.age >= 15 &&
      !G.mem?.s12SoundPowerCut,
    text: 'The power goes and the silence is total and then you discover how loud the refrigerator was, and the fan, and the ambient hum of anything electrical. The city sounds without electricity are the city as it was before electricity: voices, vehicles, a dog, wind. You sit in it. The candle takes a minute to find. The silence before it is its own experience.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 1; p.setMem('s12SoundPowerCut', true) },
  },

  {
    id: 'sonder12_sound_crowd_window',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.political_leaning === 'dissident' || G.political_leaning === 'left' || G.flags.has('protest_generation') || G.flags.has('revolution_witness')) &&
      G.age >= 16 &&
      !G.mem?.s12SoundCrowdWindow,
    text: 'From inside — from a window above the street — you can hear the crowd but not what it is saying. The sound of many voices together before they become individual voices is a specific frequency. It is lower than you expect. It does not sound like anger. It sounds like a tide. You lean out a little and the words begin to be words.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 1; p.setMem('s12SoundCrowdWindow', true) },
  },

  {
    id: 'sonder12_sound_rain_roof',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_urban' || G.character.country?.archetype === 'developing_unstable') &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.s12SoundRainRoof,
    text: 'Rain on a corrugated iron roof is not like rain anywhere else. It is too loud to speak over. It makes everything outside — the road, the trees, the neighbour\'s compound — seem very far away, and makes everything inside — the table, the faces of the people you are with — very close. When the rain stops, the silence is enormous and then ordinary very quickly.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s12SoundRainRoof', true) },
  },

  {
    id: 'sonder12_sound_market',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_urban' || G.character.country?.archetype === 'post_soviet' || G.character.country?.archetype === 'developing_unstable') &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.s12SoundMarket,
    text: 'The market sound is not one sound. It is the sum of every voice bargaining, calling, greeting, arguing — the particular density of human exchange at close quarters. As a child it was overwhelming. You learned to navigate it. Now you know where each sound is coming from. The boy selling bread calls from the left. The woman with cloth calls from the right. The sound became a map you can read.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.r += 1; p.setMem('s12SoundMarket', true) },
  },

  {
    id: 'sonder12_sound_airport',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.flags.has('emigrant') || G.residencyStatus === 'permanent_resident' || G.residencyStatus === 'work_visa') &&
      G.age >= 18 &&
      !G.mem?.s12SoundAirport,
    text: 'Airports in different countries sound the same. The announcement voices have the same cadence regardless of language. The same gate-door sounds, the same wheel of luggage on the same floor. It is a space designed to be nowhere in particular, and the sound is part of that design. You have passed through this particular nowhere enough times now that it is almost familiar, which is the closest nowhere can come to home.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s12SoundAirport', true) },
  },

  {
    id: 'sonder12_sound_children_nearby',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s12SoundChildrenNearby,
    text: 'From somewhere outside — the street, the courtyard, the school two blocks away — the sound of children playing. A specific texture: higher than adult voices, not yet organized into the formal registers of work and negotiation. You are doing something else. You stop for a second. The sound continues. You return to what you were doing.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 1; p.setMem('s12SoundChildrenNearby', true) },
  },

  // ─── WHAT YOU MADE ───────────────────────────────────────────────────────

  {
    id: 'sonder12_make_bread',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s12MakeBread,
    text: 'You make bread — or flatbread, or something that requires flour and water and your hands working it — and the smell arrives before you are ready for it. It is the smell of every kitchen that ever made this. Your hands know the motion without thinking about it. You learned it from watching and then doing. The finished thing is ordinary and exact.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s12MakeBread', true) },
  },

  {
    id: 'sonder12_make_tool_worn',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('manual_labor') || G.flags.has('farming_family') || G.flags.has('rural_childhood') || G.flags.has('farmer_generation')) &&
      G.age >= 35 &&
      !G.mem?.s12MakeToolWorn,
    text: 'A tool worn to the shape of the hand that held it longest — the handle smooth in certain places, dark where grip has been consistent across years. The tool works because of this accommodation. It has become specific to one person\'s hand. Whether that person is still here is a different question from whether the tool still works.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 1; p.setMem('s12MakeToolWorn', true) },
  },

  {
    id: 'sonder12_make_typing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 2005 && G.age >= 38 && G.age <= 58 && !G.mem?.s12MakeTyping,
    text: 'You learned to type on a keyboard with keys that pushed down with weight. Now the young type with their thumbs, quickly, without looking, producing the same words through a motion you do not share. You could learn it. You probably will not. The two motions exist in the same era, which means one of them is already archaic, and you know which one.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 1; p.setMem('s12MakeTyping', true) },
  },

  {
    id: 'sonder12_make_sewing',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s12MakeSewing,
    text: 'Mending something — a tear, a loose button, a seam that has opened — requires sitting still with a needle and thread and the specific patience of small precise repetition. The patch will show. The button will not match exactly. The thing will be wearable again, which is the point. There is something in the slowness of it that is not unpleasant.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 1; p.setMem('s12MakeSewing', true) },
  },

  {
    id: 'sonder12_make_garden',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s12MakeGarden,
    text: 'You planted something — in a pot, a plot, a strip of earth beside a building — and watched it take. The first small green was earlier than you expected. The thing required almost nothing once established: water, light, the removal of what was crowding it. You look at it every morning when you pass. It is doing something on a timescale you cannot observe directly.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 1; p.setMem('s12MakeGarden', true) },
  },

  {
    id: 'sonder12_make_repair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.s12MakeRepair,
    text: 'You fixed something that was broken — a pipe, a chair, a clock, an appliance — and the satisfaction of it was larger than the thing merited. The broken object became an intact object through your attention to it. This is not nothing. It is a small completed thing in a day that may have none. You notice how long it has been since you made a thing that worked.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 1; p.setMem('s12MakeRepair', true) },
  },

  {
    id: 'sonder12_make_handwriting',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 1995 && G.age >= 35 && !G.mem?.s12MakeHandwriting,
    text: 'You write something by hand — a card, a list, a note to someone — and notice your handwriting. It has not changed since you were in your twenties. The specific letter-forms are the ones you settled into without deciding to settle. The pen is slower than typing. The slower pace produces different sentences. You are not sure if they are worse or better.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s12MakeHandwriting', true) },
  },

  {
    id: 'sonder12_make_fire',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'subsaharan' || G.character.country?.archetype === 'developing_unstable' || G.flags.has('rural_childhood')) &&
      G.age >= 14 &&
      !G.mem?.s12MakeFire,
    text: 'Starting a fire — the arrangement of what burns easily under what burns slowly, the angle of the air, the breath applied at the right moment. You learned this early enough that you no longer think about the steps. Your hands do it. The fire catches and the light changes and the air changes. The warmth arrives in under a minute. This is something you know how to do.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s12MakeFire', true) },
  },

  {
    id: 'sonder12_make_taught',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && (G.parents?.mother || G.parents?.father) && !G.mem?.s12MakeTaught,
    text: 'You are doing something — folding something, cooking something, cleaning something in a specific way — and you realize you are doing it the way you were shown. The motion is your parent\'s motion. You are not doing it consciously. It arrived without decision, sometime between watching and practicing. The person who showed you may not be watching now. The motion continues regardless.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s12MakeTaught', true) },
  },

  // ─── THE OFFICIAL LANGUAGE ───────────────────────────────────────────────

  {
    id: 'sonder12_official_newspaper',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.regime === 'theocracy') &&
      G.age >= 16 &&
      !G.mem?.s12OfficialNewspaper,
    text: 'The newspaper arrives. You read it. You know how to read the official newspaper, which is not the same as reading a newspaper. You understand the gap between the page and the known. When something is not mentioned, you note the not-mentioning. When something is described in a particular way, you note the description. You have become fluent in a second language that runs underneath the first one.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s12OfficialNewspaper', true) },
  },

  {
    id: 'sonder12_official_phrase',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship') &&
      G.age >= 30 &&
      !G.mem?.s12OfficialPhrase,
    text: 'You catch yourself using the official phrase for something that happened. Not because you believe the phrase — you do not — but because the phrase has become automatic in the way that all language in common use becomes automatic. You notice it a beat after you have said it. The phrase and the thing are different objects. The phrase has been used so often it has worn the shape of the thing without being the thing.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('s12OfficialPhrase', true) },
  },

  {
    id: 'sonder12_official_form',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s12OfficialForm,
    text: 'A form that does not have a box for your situation. The boxes assume: two parents, one country, a fixed address, a category that applies. You fill in the closest approximation. The closest approximation is not accurate. You have filled in many forms. You are practiced at finding the closest approximation. The form does not know this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s12OfficialForm', true) },
  },

  {
    id: 'sonder12_official_euphemism',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.political_leaning === 'dissident') &&
      G.age >= 28 &&
      !G.mem?.s12OfficialEuphemism,
    text: 'Words that meant something official and something real, simultaneously, without the two meanings ever touching. *Relocation*. *Re-education*. *Restructuring*. *Special measures*. The word sat between what was said and what happened. You learned to parse this early. The vocabulary of official language in this country is an education in what cannot be said directly, and what the indirectness is protecting.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('s12OfficialEuphemism', true) },
  },

  {
    id: 'sonder12_official_announcement',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.regime === 'theocracy') &&
      G.age >= 14 &&
      !G.mem?.s12OfficialAnnouncement,
    text: 'The announcement comes on the radio — the formal voice, the particular music that precedes it when what follows is significant. You wait for the announcement to end and then wait for what the announcement did not say. Both take about the same amount of time. The second waiting is more informative.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s12OfficialAnnouncement', true) },
  },

  {
    id: 'sonder12_official_state_radio',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      (G.character.country?.archetype === 'post_soviet' || G.regime === 'single_party_communist') &&
      G.age >= 16 &&
      !G.mem?.s12OfficialStateRadio,
    text: 'The state radio voice had a specific cadence — measured, confident, slightly slower than conversational speech, never uncertain. You grew up with it as the voice of official fact. It was authoritative not because it was trusted but because it was omnipresent. You can still hear it exactly, the specific timbre of that certainty, even now when the station no longer sounds like that.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('s12OfficialStateRadio', true) },
  },

  {
    id: 'sonder12_official_photo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('revolution_witness') || G.flags.has('post_communist_transition') || G.flags.has('trujillo_generation') || G.political_leaning === 'dissident') &&
      G.age >= 30 &&
      !G.mem?.s12OfficialPhoto,
    text: 'A photograph in the newspaper of the leader who is no longer there. It appears in a retrospective, or a historical exhibition, or a reference in a feature about something else. The face you spent years looking up at — from squares, from walls, from currency. Now it appears in the past tense, which is where it belongs. You look at it longer than you expected to.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('s12OfficialPhoto', true) },
  },

  {
    id: 'sonder12_official_certificate',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s12OfficialCertificate,
    text: 'A certificate that says something official — a grade, a completion, a recognition, a verification of identity. The paper is thin or thick, official or bureaucratic. What is on it is true in the sense that it was recorded. What it does not say is also true. The gap between the paper and the person it describes is where the actual life took place.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s12OfficialCertificate', true) },
  },

  // ─── THE HOUR ────────────────────────────────────────────────────────────

  {
    id: 'sonder12_hour_before_work',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.career && !G.mem?.s12HourBeforeWork,
    text: 'The hour before the workday starts. The street is already moving but the buildings are still mostly dark. The people outside at this hour are going somewhere necessary. You are going somewhere necessary. There is a brief quality to this hour — the day not yet full of itself — that you notice only on the days when you are early enough to be in it.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 1; p.setMem('s12HourBeforeWork', true) },
  },

  {
    id: 'sonder12_hour_after_school',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 16 && !G.mem?.s12HourAfterSchool,
    text: 'The walk home from school — or the ride, or the journey — with the day released and the afternoon still unconsumed. This is the freest hour. Nothing is required yet. You are between obligation and obligation. You have discovered that this hour does not last, which is why you remember it as longer than it was.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s12HourAfterSchool', true) },
  },

  {
    id: 'sonder12_hour_after_dinner',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s12HourAfterDinner,
    text: 'The hour after the evening meal — the table cleared or not cleared, the dishes done or waiting, the television on in another room or the voices of other people or the specific weight of the house when everyone who lives in it is present. This hour has a different texture than any other. You do not always notice it. You are noticing it now.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s12HourAfterDinner', true) },
  },

  {
    id: 'sonder12_hour_midnight',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s12HourMidnight,
    text: 'You wake at some hour between midnight and four. Not from something — no sound, no dream you can recover. The room is dark and the house is quiet and you are awake. You lie and listen to the quiet. Occasionally this is a pleasant experience. More often it is not unpleasant. It is a kind of appointment you did not make that keeps occurring.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s12HourMidnight', true) },
  },

  {
    id: 'sonder12_hour_dawn',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s12HourDawn,
    text: 'Dawn in this place has a specific quality — the particular colour of the light before the sun is fully over the horizon, the particular sounds the birds or the streets make at this hour, the specific temperature of the air before the day\'s heat begins. You have seen it a number of times, usually by accident or necessity. It is always slightly surprising that this is what it looks like.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s12HourDawn', true) },
  },

  {
    id: 'sonder12_hour_new_year',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s12HourNewYear,
    text: 'The hour just after midnight on a new year. The noise subsides. The people you are with are tired or moved or just drunk. Someone is already asleep. You are in the new year now, which is indistinguishable from the old year except in the number. You sit with this for a moment. The year feels briefly enormous and then ordinary very quickly.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 1; p.setMem('s12HourNewYear', true) },
  },

  {
    id: 'sonder12_hour_sick',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.s12HourSick,
    text: 'Illness slows time. The day during a fever or a recovery is a different duration — the hours between meals enormous, the light through the window tracking across the wall in a way you never normally see. You have been well so long that the slowing surprises you. The body, when it needs rest, is very specific about the arrangements.',
    choices: null,
    effect: (p) => { p.r += 2; p.h -= 1; p.setMem('s12HourSick', true) },
  },

  {
    id: 'sonder12_hour_sunday',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 16 && !G.mem?.s12HourSunday,
    text: 'A Sunday afternoon in childhood has a specific quality that no other time has — slow, slightly airless, the week not yet begun, the weekend already used. Whatever your family does on Sunday afternoons, you are doing it now: the meal, the visiting, the television, the street football, the walk, the specific boredom. This particular slow quality is what you will remember as what Sundays were, even when Sundays become like every other day.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 3; p.setMem('s12HourSunday', true) },
  },

]

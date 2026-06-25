// events_sonder_27.js
// Contemplative layer: faith practiced without full belief, being cared for,
// seeing your own age in other people's faces, inherited objects that outlive
// their owners, city after rain, the end of a long career, the last fluent speaker,
// things learned from watching, names and what happens to them, the photograph
// not taken, and the body becoming a record.
// Weight 2, mem-gated, no choices, no new flags.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_27 = [

  // ── FAITH WITHOUT CERTAINTY ───────────────────────────────────────────────────

  {
    id: 'sdr27_faith_habit',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr27FaithHabit,
    text: pick([
      'You light the candle or say the prayer or make the gesture that your family made before you, and what you believe while doing it is complicated and not what you were told to believe, but the doing of it is something. Not performance — something closer to continuity. You are keeping the form while the content inside it does its own slower work.',
      'The fast is kept the way it has always been kept — hunger as a discipline, as a reminder, as something that connects you to a longer sequence of people who did the same thing in the same calendar position. What you think about God while fasting is not the same as what you thought at fourteen. The fast remains.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27FaithHabit', true) },
  },

  {
    id: 'sdr27_prayer_in_crisis',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr27PrayerCrisis,
    text: pick([
      'In the worst of it you pray. Whether you believe in the specific efficacy of praying to the specific entity you are praying to is a question for a time when the worst is over. Right now you are doing what the body knows to do when the situation is beyond what the mind can hold.',
      'You are not sure you believe. You find yourself in an attitude of prayer anyway — not at the designated times, not in the designated way, but in the car or in the corridor outside the hospital room. The gesture is available when you need it. The theology is a later question.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27PrayerCrisis', true) },
  },

  // ── BEING CARED FOR ───────────────────────────────────────────────────────────

  {
    id: 'sdr27_being_cared_for',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.sdr27CaredFor,
    text: pick([
      'Someone brings you what you need when you are not able to get it yourself — not because you asked, because they saw. The meal appears. The thing that needed doing is done. The debt is not in the form that can be repaid and they are not offering it in the form that expects repayment. You receive this clumsily because you are better at the other direction.',
      'Sick enough to not leave the bed. Someone you are close to reorganises their day around your staying in it. This happens without discussion. You notice the rearrangement and what it says about the relationship, and you note it and you recover, and you do not forget it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('sdr27CaredFor', true) },
  },

  {
    id: 'sdr27_accepting_help',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr27AcceptingHelp,
    text: pick([
      'You have gotten better at accepting help. This is not nothing. There was a long period — you can mark its beginning if not its end — when accepting help felt like losing something, when the admission of needing was the problem rather than the need itself. Something shifted. The help comes in more easily now.',
      'Your default is to say you are fine and manage it. Someone who knows you well enough to read the fine correctly offers to come. You let them. This is not the first time but it is not the usual move either. Something about this particular week made the usual move feel like too much work.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('sdr27AcceptingHelp', true) },
  },

  // ── AGE IN OTHER PEOPLE'S FACES ──────────────────────────────────────────────

  {
    id: 'sdr27_peer_age',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sdr27PeerAge,
    text: pick([
      'An old friend, someone you have known since you were both young, and the face is the face you know but it has done things over the decades that faces do. You are seeing your own age in theirs — which is a more legible version of a thing that is harder to see in the mirror, which shows you only the one angle.',
      'A photograph from a reunion, a gathering, an event where the people you grew up with are all in the same room. The photograph lands differently than the event did. In the photograph you can see all of you at once, see what has happened to all of those faces, see your own face in the company of the others. It takes a moment.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr27PeerAge', true) },
  },

  {
    id: 'sdr27_parent_small',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      const parentAlive = G.parents && (G.parents.father?.alive || G.parents.mother?.alive)
      return parentAlive && G.age >= 40 && !G.mem?.sdr27ParentSmall
    },
    text: pick([
      'Your parent is smaller than you remembered — not dramatically, but measurably. The stature that was the background scale of your childhood has contracted. The clothes fit differently. The voice is the same voice. Something in you recalibrates when you see this and then recalibrates again on the drive home.',
      'You find yourself in the position of explaining something to a parent — technology, a process, a situation — and you notice the reversal: this is the direction that information used to move, and now it goes this way. The reversal has been gradual enough that you cannot mark when it happened. It has happened.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('sdr27ParentSmall', true) },
  },

  // ── INHERITED OBJECTS ─────────────────────────────────────────────────────────

  {
    id: 'sdr27_inherited_object',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr27InheritedObject,
    text: pick([
      'The object from your grandmother — a bowl, a ring, a knife, a box with a particular smell inside the lid — has moved through hands and is now in yours. The people who used it before you are, most of them, gone. The object is the one thing that was present for all of those usings. You put it somewhere you will see it.',
      'You receive the watch or the coat or the pan that has been in the family since before you were born. The thing has a history that it cannot tell you directly. What you know of it is what was passed along with it: this belonged to, this was used for. The rest is yours to imagine.',
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('sdr27InheritedObject', true) },
  },

  {
    id: 'sdr27_object_outlives',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr27ObjectOutlives,
    text: pick([
      'The objects will outlive you. This is normal and always has been — the furniture, the photographs, the books with your handwriting in the margins. They will exist in a room after you no longer do. Someone will decide what to keep and what to let go. The choosing is a form of interpretation. You do not get to supervise it.',
      'You are thinking about what to do with the things that matter. Not practically — practically is understood — but what they will mean to whoever receives them, whether the meaning is transferable, whether the object carries the history or only carries the physical form of it. The second option is more likely. This is not a tragedy. It is the nature of objects.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('sdr27ObjectOutlives', true) },
  },

  // ── THE CITY AFTER RAIN ──────────────────────────────────────────────────────

  {
    id: 'sdr27_city_rain',
    phase: null,
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 14 && !G.mem?.sdr27CityRain,
    text: pick([
      'After rain the city smells different — the pavement releasing something held in it, the gutters running, the specific freshness that is not countryside freshness but is its own thing. The people on the street navigate around the pooled water and the drips from awnings. The city is the same city. It is briefly changed.',
      'The city is still drying when you go out. The puddles reflect the sky and the buildings upside down. The ordinary objects — a traffic light, a bollard, the corner of a building — become doubled in the standing water. You step around them and continue.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27CityRain', true) },
  },

  // ── END OF A LONG CAREER ────────────────────────────────────────────────────

  {
    id: 'sdr27_career_end_approaching',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.career && G.age >= 58 && !G.mem?.sdr27CareerEndApproach,
    text: pick([
      'The retirement is approaching in the way that things you have not quite looked at directly approach — visible in the peripheral vision for some time before you turn toward them. A number of years. A date. A conversation with HR that has to happen. The work that has been the structure of most of your waking hours will end, and what will fill that structure is not yet established.',
      'New people are coming into the field with knowledge you do not have and approaches you find interesting and sometimes baffling. You are one of the experienced people now. The balance of what you give and receive has shifted over a career in the way that careers shift. The end of the career is visible.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr27CareerEndApproach', true) },
  },

  {
    id: 'sdr27_last_day_work',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.career && G.age >= 60 && !G.mem?.sdr27LastDayWork,
    text: pick([
      'The last day. The cake, the card with everyone\'s names in it, the speech from the manager that recaps the years in the official version. The cardboard box. The drive home, which is the same drive you have taken after work for years, except this is the last time you will take it as a working person.',
      'The work is done and there is no next assignment. The laptop is returned. The system access ends at midnight. The work that was the frame of the day is no longer the frame of the day. What replaces it is unscheduled — which is either freedom or emptiness, and you do not yet know which.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 3; p.setMem('sdr27LastDayWork', true) },
  },

  // ── LANGUAGE AND NAMES ───────────────────────────────────────────────────────

  {
    id: 'sdr27_name_mispronounced',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 12 && !G.mem?.sdr27NameMispronounced,
    text: pick([
      'Your name is mispronounced again. You have been correcting it for years — not always, not when it doesn\'t matter, but often enough that you know exactly how many syllables are wrong and in which direction. Some people, when corrected, get it right. Some repeat the same version they had before. You have learned to read which type of person you are talking to quickly.',
      'You have a second version of your name — the version that works better in the country you are in, the version that doesn\'t require the explanation. You use it in contexts where the explanation would take longer than the conversation warrants. Whether this is pragmatism or a small loss is a question that doesn\'t have one answer.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27NameMispronounced', true) },
  },

  {
    id: 'sdr27_naming_a_child',
    phase: null,
    weight: 2,
    when: (G) => G.children && G.children.length > 0 && G.age >= 22 && !G.mem?.sdr27NamingChild,
    text: (G) => {
      const child = G.children[0]
      return pick([
        `The name ${child?.name ?? 'your child'} carries things: the relative it was taken from, the sound you wanted, the compromise between two people who had different sounds in mind. Names carry more weight than they can hold, and yet you chose this one with care, and here it is, in the world, attached to a person.`,
        `Someone asks where the name ${child?.name ?? 'your child'} comes from. You give the short version — the name pool it comes from, the relation it honours. The long version involves a conversation you had at the kitchen table before the child existed and choices made in the dark about what to carry forward.`,
      ])
    },
    choices: null,
    effect: (p) => { p.setMem('sdr27NamingChild', true) },
  },

  // ── THE PHOTOGRAPH NOT TAKEN ─────────────────────────────────────────────────

  {
    id: 'sdr27_no_photo',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr27NoPhoto,
    text: pick([
      'The moment you didn\'t photograph. The light, the arrangement, the face — all of it was there and you were there and you didn\'t take the photograph because you were in it too completely to step outside it for the picture. The moment is gone. The memory is there and is not the same as the photograph would have been, which is the reason you didn\'t take it.',
      'The photograph you wish you had: a specific moment from years ago, before the phone was the camera was always in your pocket. The moment exists clearly in memory and is losing definition around the edges the way all memories do without a photograph to anchor them. You remember the room and the people and less and less of the specific detail.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27NoPhoto', true) },
  },

  // ── THE BODY AS RECORD ───────────────────────────────────────────────────────

  {
    id: 'sdr27_body_record',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr27BodyRecord,
    text: pick([
      'The scar from the thing that happened at eleven. The knee that was injured and then healed and is still sometimes the knee that was injured. The shoulder that moves differently than the left one. The body is a record of what has happened to it and you can read some of the record and have forgotten how to read some of it.',
      'You notice a gesture in the mirror that you didn\'t know you made: the particular way you hold your head, an expression that is someone else\'s expression that somehow came to live in your face. The body absorbs things without asking. The gestures arrive from a direction you cannot fully trace.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr27BodyRecord', true) },
  },

  // ── LEARNING FROM WATCHING ────────────────────────────────────────────────────

  {
    id: 'sdr27_learned_watching',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr27LearnedWatching,
    text: pick([
      'The things you know that you didn\'t learn from being taught: how to read a room, how to tell when a conversation is about to change direction, what someone means when they say they\'re fine in a specific way. This knowledge came from watching over years and cannot be fully described to someone who hasn\'t done the watching.',
      'You learned how to do the thing by watching your father or your mother or your grandmother do it — not being shown, watching. The teaching was implicit, in the repeated watching. You can do it now and cannot explain how you know to do it the way you know.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('sdr27LearnedWatching', true) },
  },

  // ── THE LAST FLUENT SPEAKER ───────────────────────────────────────────────────

  {
    id: 'sdr27_language_loss',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr27LanguageLoss,
    text: pick([
      'The language your grandparents spoke fluently and your parents spoke partially and you understand but do not speak. The transmission chain has a break in it that corresponds to your generation. The language is not dead — other communities speak it, there are revival efforts — but in your family line the break is yours.',
      'You can read your grandparent\'s letters with effort. The script is familiar from childhood copying, the words partially deducible from cognates and context. Some of it you cannot get. The letters are written to a grandchild they imagined — one who would be able to read them without effort. That is not you.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 1; p.setMem('sdr27LanguageLoss', true) },
  },

  // ── THE NIGHT OF BAD SLEEP ────────────────────────────────────────────────────

  {
    id: 'sdr27_bad_sleep_night',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr27BadSleepNight,
    text: pick([
      'The 3am interval when the mind reverses direction and starts moving toward something that isn\'t fear exactly but is something adjacent — a low-grade audit of everything, a revisitation of things that were fine in the afternoon and are not fine at 3am. You lie still and wait for it to pass. It passes. The morning arrives and the audit results in daylight are different.',
      'Awake at a time when being awake has no useful purpose. The house is asleep. The street is nearly empty. The quality of this hour — the specific silence that is not the same as daytime silence — is something you have become familiar with. You are learning its topography without intending to.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27BadSleepNight', true) },
  },

  // ── STRANGER GLIMPSES ─────────────────────────────────────────────────────────

  {
    id: 'sdr27_window_across',
    phase: null,
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 18 && !G.mem?.sdr27WindowAcross,
    text: pick([
      'The window across the street: a woman at a table, moving papers, looking at something you can\'t see. She has been there a while. You have been aware of her in the peripheral way you are aware of the lit window without attending to it. For a moment you attend to it. Then you return to your own room.',
      'The lit apartment above yours: movement visible through the ceiling, footsteps, a chair moving, a conversation whose words don\'t reach you, only the rhythm. Someone is up there living whatever they are living. It is completely mundane and you have no access to it and this is the definition of something.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27WindowAcross', true) },
  },

  {
    id: 'sdr27_old_couple',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.sdr27OldCouple,
    text: pick([
      'An old couple crossing the street. The pace is slow and the person on the outside is adjusting their pace to match the pace of the inside person and this adjustment has been made so many times that it is now built into how they walk. They are holding something between them — a bag, an elbow — in the absent-minded way of long familiarity.',
      'They are very old and they are arguing about something minor, and the argument has the specific texture of an argument between people who have been arguing about things for fifty years: fluent, not cruel, conducted in a shorthand that is not available to anyone else. They reach the bench and sit down and the argument continues in a quieter register.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr27OldCouple', true) },
  },

]

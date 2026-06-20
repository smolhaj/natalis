// events_sonder_2.js
// Contemplative auto-resolve events: no choices, tiny effects, prose that fires and passes.
// Four registers: non-Western sensory texture, body in time, relational drift, weight of time.
// All mem-gated via setMem() to fire once per life. No new flags needed.

export const EVENTS_SONDER_2 = [

  // ──────────────────────────────────────────────────────────────────────────
  // NON-WESTERN SENSORY TEXTURE
  // The specific object, sound, smell that locates you in a particular life.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder2_generator',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_gen &&
      (G.character.country.archetype === 'subsaharan' ||
       G.character.country.archetype === 'developing_urban' ||
       G.character.country.archetype === 'developing_unstable'),
    text: 'The generator kicks on at the same time it always does. The smell of diesel arrives half a second after the sound. You registered this consciously for the first year. Now you register it only in its absence — the wrong silence, the fans going still, the quality of air that is no longer moving.',
    choices: null,
    effect: (p) => { p.setMem('s2_gen', true) },
  },

  {
    id: 'sonder2_harmattan',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_harm &&
      ['Nigeria', 'Ghana', 'Mali', 'Senegal', 'Niger', 'Burkina Faso', 'Ivory Coast', 'Guinea', 'Cameroon', 'Togo', 'Benin'].includes(G.character.country.name),
    text: 'The harmattan has arrived. Everything is the same fine white dust now — the cars, the windowsills, the back of your throat. You taste it before you name it. Your lips crack by the third day. You stop noticing.',
    choices: null,
    effect: (p) => { p.setMem('s2_harm', true) },
  },

  {
    id: 'sonder2_monsoon',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_mon &&
      ['India', 'Bangladesh', 'Pakistan', 'Sri Lanka', 'Myanmar', 'Vietnam', 'Indonesia', 'Philippines', 'Cambodia', 'Thailand', 'Laos', 'Nepal'].includes(G.character.country.name),
    text: 'The first rain of the monsoon is not like other rain. It comes with a smell before the drops — something released from the earth — and then the sound on the roof, which is also the sound of relief. Everyone says it the same way: it has come.',
    choices: null,
    effect: (p) => { p.setMem('s2_mon', true); p.m += 2 },
  },

  {
    id: 'sonder2_power_cut',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_pw &&
      (G.character.country.archetype === 'developing_urban' ||
       G.character.country.archetype === 'developing_unstable' ||
       G.character.country.archetype === 'subsaharan'),
    text: 'Power cut at three in the afternoon. The fans go still and the heat that was moving becomes heat that sits. You know where the torch is. You know which food to eat first. The adaptation is so complete you notice it only when someone else is panicking.',
    choices: null,
    effect: (p) => { p.setMem('s2_pw', true) },
  },

  {
    id: 'sonder2_market_dawn',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_mkt &&
      (G.character.country.archetype === 'subsaharan' ||
       G.character.country.archetype === 'developing_urban'),
    text: 'The market at dawn is a different place than the market at noon. The best things move in the first hour. Your mother knows which stall, which woman, which question to ask about what came in this morning. You follow, carrying the bag, learning a system you don\'t know you\'re learning.',
    choices: null,
    effect: (p) => { p.setMem('s2_mkt', true); p.e += 1 },
  },

  {
    id: 'sonder2_traffic',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_traf &&
      (G.character.country.archetype === 'developing_urban' ||
       G.character.country.archetype === 'developing_unstable'),
    text: 'The traffic at this hour is not an obstacle. It is the city\'s circulatory system and you are in it, moving at its own rhythm. The driver ahead knows exactly when to cut across. You know it too. The foreigner who arrived last year has not learned it yet. You can tell by watching.',
    choices: null,
    effect: (p) => { p.setMem('s2_traf', true) },
  },

  {
    id: 'sonder2_adhan',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_adhan &&
      (G.religion === 'muslim' ||
       ['Nigeria', 'Senegal', 'Mali', 'Morocco', 'Algeria', 'Tunisia', 'Egypt', 'Jordan', 'Lebanon', 'Iran', 'Pakistan', 'Bangladesh', 'Indonesia', 'Turkey', 'Saudi Arabia', 'UAE', 'Yemen', 'Sudan', 'Libya'].includes(G.character.country.name)),
    text: 'The evening call to prayer is the signal that changes what the day is. Before it: one kind of time. After it: another. You never decided to feel this. It arrived with the air of the particular city and settled into the body.',
    choices: null,
    effect: (p) => { p.setMem('s2_adhan', true) },
  },

  {
    id: 'sonder2_compound',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_compound &&
      (G.character.country.archetype === 'subsaharan' ||
       G.character.country.archetype === 'developing_urban') &&
      G.ruralUrban !== 'rural',
    text: 'The compound at evening. All the kitchens going at once — the sound of it, the competing smells. Someone\'s television through a thin wall. A child being corrected in the back room. A life that is not private and was not designed to be, and in which privacy was never the thing anyone was looking for.',
    choices: null,
    effect: (p) => { p.setMem('s2_compound', true) },
  },

  {
    id: 'sonder2_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_queue &&
      (G.character.country.archetype === 'post_soviet' ||
       G.character.country.archetype === 'developing_unstable'),
    text: 'The queue is long. No one in it seems surprised. There is a particular patience that long queues produce in people who have stood in them since childhood — not resignation, something more practised than that. The time fills itself.',
    choices: null,
    effect: (p) => { p.setMem('s2_queue', true) },
  },

  {
    id: 'sonder2_dust_season',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dust &&
      (G.character.country.archetype === 'wealthy_gulf' ||
       ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt', 'Jordan', 'Iraq', 'Yemen', 'Iran'].includes(G.character.country.name)),
    text: 'The dust season. A particular colour settles over everything for weeks — on the windshields, on the balcony furniture, in the fold of your collar. You have learned to move through it without registering it as weather. It is just the season the dust is.',
    choices: null,
    effect: (p) => { p.setMem('s2_dust', true) },
  },

  {
    id: 'sonder2_rains',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_rains &&
      G.character.country.archetype === 'subsaharan' &&
      G.ruralUrban === 'rural',
    text: 'The rains have come. The fields are the right colour again. The adults stop making the particular calculation they make in the dry months — how many days left, how much remains. The relief is not spoken but it is in everything.',
    choices: null,
    effect: (p) => { p.setMem('s2_rains', true); p.m += 2 },
  },

  {
    id: 'sonder2_winter',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_winter &&
      G.character.country.archetype === 'post_soviet',
    text: 'The cold arrives and the city reorganises itself around it. The padded coats, the hats pulled low, the specific technique for opening a frozen car door. You have known this winter your whole life. You know it in your hands before you think it.',
    choices: null,
    effect: (p) => { p.setMem('s2_winter', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BODY IN TIME
  // What the body knows at 45 that it didn't at 30.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder2_b_sleep',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bsl &&
      G.age >= 33 && G.age <= 43,
    text: 'You have started sleeping differently. Not worse. Differently. You surface at four in the morning for no reason, lie still for half an hour, then sink again. You have mentioned this to no one. It appears to be the new arrangement.',
    choices: null,
    effect: (p) => { p.setMem('s2_bsl', true) },
  },

  {
    id: 'sonder2_b_noise',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bno &&
      G.age >= 36 && G.age <= 48,
    text: 'Your tolerance for certain kinds of noise has changed. The bar at that volume, which used to be the beginning of the night. You leave earlier now. You tell yourself it\'s because you\'re tired. That is also true.',
    choices: null,
    effect: (p) => { p.setMem('s2_bno', true) },
  },

  {
    id: 'sonder2_b_face',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bfc &&
      G.age >= 45 && G.age <= 58,
    text: 'You look like your father in certain lights. Or your mother. The mirror has been making this case for a few years now. You have started to accept it — not with grief exactly, but with a recognition that has no simple name.',
    choices: null,
    effect: (p) => { p.setMem('s2_bfc', true) },
  },

  {
    id: 'sonder2_b_glasses',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bgl &&
      G.age >= 42 && G.age <= 54,
    text: 'Reading glasses. You knew it was coming — you\'d watched it arrive for other people — and it still required an adjustment that was less optical than psychological. You are the person who loses their glasses now.',
    choices: null,
    effect: (p) => { p.setMem('s2_bgl', true) },
  },

  {
    id: 'sonder2_b_knee',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bkn &&
      G.age >= 40 && G.age <= 55,
    text: 'The knee has been adding its opinion to certain activities for two years now. Stairs at the end of a long day. Running on hard surfaces. The body has moved from being background to offering annotations. You have begun to read them.',
    choices: null,
    effect: (p) => { p.setMem('s2_bkn', true); p.h -= 1 },
  },

  {
    id: 'sonder2_b_recovery',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_brec &&
      G.age >= 50 && G.age <= 62,
    text: 'Recovery time. That is the category that has changed most. The same Saturday as five years ago requires a different Sunday. You have adjusted your expectations, which is either wisdom or defeat, and you are not entirely sure which.',
    choices: null,
    effect: (p) => { p.setMem('s2_brec', true) },
  },

  {
    id: 'sonder2_b_handwriting',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_bhw &&
      G.age >= 38 && G.age <= 50,
    text: 'Your handwriting has changed. You noticed it on a card you wrote this year — something has shifted in the size, the slant. The pen in the hand is different than it was at thirty. You are not sure if you like the new version.',
    choices: null,
    effect: (p) => { p.setMem('s2_bhw', true) },
  },

  {
    id: 'sonder2_b_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_blt &&
      G.age >= 62,
    text: 'The body\'s maintenance is its own part-time occupation now. You attend to it with something between acceptance and mild bureaucratic resentment. The appointments, the prescriptions, the new vocabulary. The learning curve that goes only one direction.',
    choices: null,
    effect: (p) => { p.setMem('s2_blt', true); p.h -= 1 },
  },

  {
    id: 'sonder2_b_temperature',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_btmp &&
      G.age >= 46 && G.age <= 60,
    text: 'Somewhere in your late forties, your thermostat changed. You run differently now in the heat, differently in the cold. The body has reorganised what comfortable means. You have adjusted without being asked.',
    choices: null,
    effect: (p) => { p.setMem('s2_btmp', true) },
  },

  {
    id: 'sonder2_b_inventory',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_binv &&
      G.age >= 65,
    text: 'You have been in this body for a long time. You know its full inventory now — the injuries that healed, the ones that left marks, what holds under pressure and what doesn\'t. The knowledge took the whole life to accumulate and you didn\'t know you were accumulating it.',
    choices: null,
    effect: (p) => { p.setMem('s2_binv', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // RELATIONAL DRIFT
  // The slow, unannounced changes in people.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder2_d_emigrated',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dem &&
      G.age >= 30,
    text: 'A friend left for another country eight or nine years ago. You still think of things to tell her. The gap between the impulse and the time it would take to properly share it means you tell her fewer things each year. You are still friends. You are friends at a different scale.',
    choices: null,
    effect: (p) => { p.setMem('s2_dem', true) },
  },

  {
    id: 'sonder2_d_father_number',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dfn &&
      G.flags.includes('lost_parent_father') &&
      G.age >= 35,
    text: 'Your father\'s phone number is still in your contacts. You have not deleted it. You have not examined this closely.',
    choices: null,
    effect: (p) => { p.setMem('s2_dfn', true) },
  },

  {
    id: 'sonder2_d_cousin',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dcou &&
      G.age >= 22,
    text: 'The cousin you were closest to as a child married someone from another city and moved there. You are friendly when you see each other at family events. That is all you are now. You wonder sometimes if they think about it.',
    choices: null,
    effect: (p) => { p.setMem('s2_dcou', true) },
  },

  {
    id: 'sonder2_d_work_friend',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dwf &&
      G.age >= 32 &&
      G.career?.id,
    text: 'The colleague you were going to have coffee with after you both left that job. The message that was drafted and not sent, the specific moment it became difficult enough that it didn\'t happen. That was three years ago. The window is probably still open. It has developed a frame now.',
    choices: null,
    effect: (p) => { p.setMem('s2_dwf', true) },
  },

  {
    id: 'sonder2_d_follow',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dfl &&
      G.age >= 35 &&
      G.currentYear >= 2010,
    text: 'You still follow your childhood best friend on social media. You know their child\'s name, their job, their last holiday. They follow you back. You have not had a real conversation in eleven years. Both of you know this is what the friendship is now.',
    choices: null,
    effect: (p) => { p.setMem('s2_dfl', true) },
  },

  {
    id: 'sonder2_d_stopped',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dst &&
      G.age >= 33,
    text: 'There is a friend you stopped calling without deciding to. The last conversation was ordinary — nothing ended. And then time passed, and more time passed. The window is probably still open. But it has developed a frame now.',
    choices: null,
    effect: (p) => { p.setMem('s2_dst', true) },
  },

  {
    id: 'sonder2_d_parent_voice',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dpv &&
      (G.flags.includes('lost_parent_mother') || G.flags.includes('lost_parent_father')) &&
      G.age >= 35,
    text: 'You can still hear how they answered the phone. The specific tone — slightly more formal before they recognised the voice, then the change. That voice was a constant for forty years. You hear it now only in memory, which is less reliable each year.',
    choices: null,
    effect: (p) => { p.setMem('s2_dpv', true) },
  },

  {
    id: 'sonder2_d_almost',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dalm &&
      G.age >= 35,
    text: 'Someone from your twenties that you were almost something more with. The window that was open, then wasn\'t, then you both moved on. You see them occasionally, or you don\'t. The almost has become its own category — people who existed in the parallel version of the life.',
    choices: null,
    effect: (p) => { p.setMem('s2_dalm', true) },
  },

  {
    id: 'sonder2_d_specific',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_dsp &&
      G.age >= 24,
    text: 'You have specific people for specific things now. One for the work problems. One for the family ones. One for the evenings when nothing is wrong and you just want company. They don\'t know each other. You contain all of them simultaneously.',
    choices: null,
    effect: (p) => { p.setMem('s2_dsp', true) },
  },

  {
    id: 'sonder2_d_old_neighborhood',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_don &&
      G.age >= 36 &&
      G.currentYear >= 2005,
    text: 'Someone from the old neighbourhood found you on the internet. They are exactly like themselves. You are — according to their messages — exactly like yourself. You have become strangers who remember the same intersection.',
    choices: null,
    effect: (p) => { p.setMem('s2_don', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // WEIGHT OF TIME
  // The strange arithmetic of a life — all the things that happened.
  // ──────────────────────────────────────────────────────────────────────────

  {
    id: 'sonder2_t_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tdec &&
      G.age >= 38,
    text: 'A decade has gone somewhere. Not gradually — in retrospect it happened all at once. You were thirty-three and then you were forty-three and the decade between is present and somehow also collapsed into a particular quality of light.',
    choices: null,
    effect: (p) => { p.setMem('s2_tdec', true) },
  },

  {
    id: 'sonder2_t_photo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tph &&
      G.age >= 37,
    text: 'A photograph from fifteen years ago. The person in it was young in ways you could not see at the time. Confident and unfinished. You recognise the clothes. The face is not quite yours yet, which from here is something between tender and strange.',
    choices: null,
    effect: (p) => { p.setMem('s2_tph', true) },
  },

  {
    id: 'sonder2_t_mother_longer',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tmoth &&
      G.flags.includes('lost_parent_mother') &&
      G.age >= 58,
    text: 'Your mother has now been dead for longer than you knew her. You didn\'t notice when the crossover happened. The absence has been accumulating past the presence. She has been gone longer than she was here for you. This arithmetic does not resolve. You don\'t expect it to.',
    choices: null,
    effect: (p) => { p.setMem('s2_tmoth', true); p.m -= 2 },
  },

  {
    id: 'sonder2_t_street',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tst &&
      G.age >= 38,
    text: 'A building you knew well — a school, a shop front, a corner that meant something — has been redeveloped. You went back once to look at what was there. You felt less than you expected to, which itself felt like something worth noting.',
    choices: null,
    effect: (p) => { p.setMem('s2_tst', true) },
  },

  {
    id: 'sonder2_t_object',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tobj &&
      G.age >= 36,
    text: 'An object that has been on the shelf since before you can remember. You don\'t know where it came from. You don\'t think about it most days. When you move house you will take it without deciding to.',
    choices: null,
    effect: (p) => { p.setMem('s2_tobj', true) },
  },

  {
    id: 'sonder2_t_phrase',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tphr &&
      G.age >= 38,
    text: 'You have started using a phrase your mother used. You didn\'t decide to start. You noticed it one morning, mid-sentence, and couldn\'t trace when it became yours.',
    choices: null,
    effect: (p) => { p.setMem('s2_tphr', true) },
  },

  {
    id: 'sonder2_t_year_density',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tyrd &&
      G.age >= 24,
    text: 'This year felt longer than last year. Or shorter. The years have begun to have different densities — some that stretch and some that collapse. You have noticed this but have no theory for it.',
    choices: null,
    effect: (p) => { p.setMem('s2_tyrd', true) },
  },

  {
    id: 'sonder2_t_anniversary',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s2_tann &&
      G.age >= 35 &&
      (G.flags.includes('lost_parent_father') ||
       G.flags.includes('lost_parent_mother') ||
       G.flags.includes('widowed') ||
       G.flags.includes('lost_friend')),
    text: 'The anniversary of a death. You notice it every year without planning to — something shifts in the week a degree or two. The grief is not what it was. The noticing remains.',
    choices: null,
    effect: (p) => { p.setMem('s2_tann', true) },
  },
]

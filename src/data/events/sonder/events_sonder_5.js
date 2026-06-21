// events_sonder_5.js — MODE C sonder depth: 36 contemplative auto-resolve events
// Four registers:
//   CHILDHOOD BODY MEMORY — sensory residue from early life that surfaces decades later
//   LANGUAGE AND THOUGHT — how the words available shape the things thinkable
//   MONEY AND COUNTING — the texture of economic life as felt experience, not numbers
//   THE ANIMAL WORLD — how other creatures mark the edge of one's own life

// All weight 2, no choices, no new flags, single-fire via mem guard.

export const EVENTS_SONDER_5 = [

  // ─── CHILDHOOD BODY MEMORY ────────────────────────────────────────────────────

  {
    id: 'sonder5_cb_school_floor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5CbFloor,
    text: 'There is something about the smell of a school corridor — the specific combination of floor polish and chalk dust and old wood or old concrete — that takes you back before you have time to stop it. Not to a particular day but to a state: being small in a large institution, uncertain whether you were in trouble, the sound of a teacher\'s footsteps in a hallway.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s5CbFloor', true) },
  },

  {
    id: 'sonder5_cb_illness',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s5CbIllness,
    text: 'Being ill as a child had a specific quality that adult illness does not have: you were taken out of the normal world and put in a bed, and someone brought things to you, and time moved differently. You were not expected to be anywhere. The fever is unpleasant but the exemption is not. You think about this sometimes — that you have not been properly sick since childhood, not sick in the total way that relieved you of everything.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s5CbIllness', true) },
  },

  {
    id: 'sonder5_cb_water',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s5CbWater,
    text: 'The water from childhood had a particular taste. You notice this only when you drink water somewhere that tastes different — a different city, a different well, a different pipe. Your body remembers the original before your mind does. It is the only form of homesickness you cannot argue yourself out of.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s5CbWater', true) },
  },

  {
    id: 'sonder5_cb_asleep_car',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5CbCar,
    text: 'You fell asleep in the back of cars as a child in the specific way that children fall asleep — completely, without negotiation — and woke up being carried inside, or already in your bed without memory of the transfer. That particular falling asleep is gone. You have not experienced it since childhood. You did not notice it leave.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s5CbCar', true) },
  },

  {
    id: 'sonder5_cb_height',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s5CbHeight,
    text: 'Places that seemed enormous in childhood turn out to be ordinary-sized. You notice this at intervals: the house you grew up in is smaller than memory has it. The road is shorter. The crowd was not that big. Memory scales to the size of the body that had the experience, and the body has changed, but the record has not.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s5CbHeight', true) },
  },

  {
    id: 'sonder5_cb_sound_home',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s5CbSound,
    text: 'There is a sound that was the background of your childhood that you no longer hear — the specific pitch of the radio your parents left on, or the neighbour\'s generator, or the particular road noise of a street you grew up near. You hear something similar sometimes and the childhood arrives briefly, uninvited, complete.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 2; p.setMem('s5CbSound', true) },
  },

  {
    id: 'sonder5_cb_hands_parent',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s5CbHandsParent,
    text: 'Your hands are starting to look like your parent\'s hands. The shape, the way the skin sits. You noticed it suddenly — you were doing something unremarkable with them and looked down and saw someone else\'s hands. This has been happening for a while without your noticing. It is not alarming, exactly. It is a form of continuity that did not ask permission.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s5CbHandsParent', true) },
  },

  {
    id: 'sonder5_cb_dark_fear',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s5CbDark,
    text: 'There was something you were afraid of at night as a child — not a monster exactly, but a category of darkness or sound or a particular shape that a room made. You do not fear it now. But the body remembers: if you wake suddenly at three in the morning, there is still a half-second before the adult understanding comes online, and in that half-second you are six again and the darkness is the same darkness.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s5CbDark', true) },
  },

  {
    id: 'sonder5_cb_waiting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s5CbWait,
    text: 'As a child you had the capacity for waiting that adults seem to have lost: sitting in a car for two hours with nothing but your own mind, not restless, not bored in the way adults mean boredom. Just occupied with whatever was there. You do not have that anymore. You are not sure when it left.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('s5CbWait', true) },
  },

  // ─── LANGUAGE AND THOUGHT ─────────────────────────────────────────────────────

  {
    id: 'sonder5_lang_untranslatable',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s5LangUntrans,
    text: 'There is a word in your language — or in your parents\' language, or the language of the region — that does not translate. You have tried. The closest you can get in other languages is a sentence, sometimes a paragraph. The word contains a specific emotional situation that English, or French, or whichever language you are translating into, does not have a shape for. You carry this word as a small piece of evidence that the world your language describes and the world the other language describes are not quite the same world.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 3; p.setMem('s5LangUntrans', true) },
  },

  {
    id: 'sonder5_lang_swearing',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s5LangSwear,
    text: 'You swear in your first language even if you think in the second. The profanity came in earliest, at the level where language is just sound and force, before grammar or meaning was fully mapped. The words are still there, unchanged, stored at a depth that other learning has not reached.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('s5LangSwear', true) },
  },

  {
    id: 'sonder5_lang_dream',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s5LangDream,
    text: 'You dream in one language and live in another. Or you dream in a mix. Or the dream uses language and then you wake and realise you cannot say what language it was — the dream logic was using meaning without needing words. You have tried to explain this to someone who only speaks one language. The explanation is not quite right because the experience is not quite translatable.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s5LangDream', true) },
  },

  {
    id: 'sonder5_lang_name_sound',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s5LangName,
    text: 'Your name sounds different in different mouths. The way your family says it and the way people outside say it are two different sounds carrying the same letters. You have a version of your own name — the one you hear in your head, the one you answer to fully, the one where you feel most yourself — that most people who use your name are not using.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s5LangName', true) },
  },

  {
    id: 'sonder5_lang_reading_voice',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5LangReadVoice,
    text: 'When you read, you have a voice. Not your voice — not exactly. A reading voice, somewhere in the pitch and rhythm of your internal monologue but not identical to it. You have had it as long as you can remember and you do not know where it came from. Possibly it is the voice of the first person who read to you, transposed into a thing that is now entirely yours.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 2; p.setMem('s5LangReadVoice', true) },
  },

  {
    id: 'sonder5_lang_word_stuck',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s5LangStuck,
    text: 'There is a word you always misspell, or always mispronounce, or always use slightly wrong — something baked in early, before the correct version could overwrite it. You have been corrected enough times to know the correction. The old version is still the first one that comes.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s5LangStuck', true) },
  },

  {
    id: 'sonder5_lang_silence_meaning',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s5LangSilence,
    text: 'You have learned the silences of the people close to you as carefully as their words. The specific silence that means discomfort. The one that means they are about to say something important. The one that means they have already decided and are waiting for you to figure it out. These silences carry as much as any sentence. You are fluent in them without ever having studied them.',
    choices: null,
    effect: (p) => { p.m += 4; p.s += 3; p.e += 2; p.setMem('s5LangSilence', true) },
  },

  {
    id: 'sonder5_lang_phrase_parent',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s5LangPhrase,
    text: 'You said something and heard your parent\'s exact phrase come out of your mouth — the specific construction, the cadence, the particular word choice that was always theirs. This has been happening for a while. You are becoming, in small increments, the person who used to say the things you now say.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.setMem('s5LangPhrase', true) },
  },

  // ─── MONEY AND COUNTING ───────────────────────────────────────────────────────

  {
    id: 'sonder5_money_first_large',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s5MoneyFirst,
    text: 'The first time you had more money than you had ever had — it may not have been very much in absolute terms — there was a specific feeling that was not quite happiness. A kind of solidity. A sense that the ground had more substance. You have been trying to reproduce that feeling ever since and the reproduction is always slightly off, because the baseline has shifted.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.setMem('s5MoneyFirst', true) },
  },

  {
    id: 'sonder5_money_price_memory',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s5MoneyPrice,
    text: 'You remember what things cost at a specific moment in your life — the price of bread, the bus fare, what a decent meal out cost — and you carry that number as a kind of psychological constant. Everything since is measured against it, even when the comparison no longer makes sense because the money itself has changed.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('s5MoneyPrice', true) },
  },

  {
    id: 'sonder5_money_enough',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s5MoneyEnough,
    text: 'You have enough now, by most measures. You are not always sure what to do with this information. The habits of not-enough are still running underneath: checking prices before looking at what you want, knowing by feel when the account is low, the specific vigilance that was once necessary and is now just there. You do not know how to turn it off. You are not certain you want to.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 3; p.setMem('s5MoneyEnough', true) },
  },

  {
    id: 'sonder5_money_count',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5MoneyCount,
    text: 'At some point you stopped counting the cost of small things — the coffee, the bus ticket, the extra item you did not need — and you did not notice the moment it happened. Before, you knew to the unit. After, you know approximately. The transition happened somewhere in a year you were not paying attention to that kind of attention.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s5MoneyCount', true) },
  },

  {
    id: 'sonder5_money_borrow_lend',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s5MoneyBorrow,
    text: 'You borrowed money from a friend once, or lent money to one. The exchange changed something small in the relationship — not ruinously, not in a way you could name exactly, but something shifted. The relationship had to accommodate the new category of what it now contained. It accommodated it. But the accommodation is always there, slightly.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.setMem('s5MoneyBorrow', true) },
  },

  {
    id: 'sonder5_money_late_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && !G.mem?.s5MoneyNight,
    text: 'There was a period when you did the calculation last thing at night. The number in the account, the days until pay, what was coming out, what was necessary. This was not dramatic — it was just arithmetic that had a deadline. You did it so many times it became automatic: the number was the last thing in your head before sleep.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s5MoneyNight', true) },
  },

  {
    id: 'sonder5_money_gift',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5MoneyGift,
    text: 'Someone gave you something once without any apparent motive — a gift that was not on an occasion, from someone who had no obligation. You received it awkwardly because you were not used to receiving things without an occasion. The awkwardness was not ingratitude. It was the unfamiliarity of the form.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 3; p.setMem('s5MoneyGift', true) },
  },

  {
    id: 'sonder5_money_late_prosperity',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s5MoneyLatePros,
    text: 'You have more than you will spend. This is a sentence you could not have said at thirty, or forty, and you say it now with a specific unease because you do not entirely know how to inhabit it. The discipline of counting, of managing, of planning for the thin month — those are still running. The prosperity is real and the habits of not-prosperity are also real, and they coexist in you without resolution.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.e += 2; p.setMem('s5MoneyLatePros', true) },
  },

  // ─── THE ANIMAL WORLD ─────────────────────────────────────────────────────────

  {
    id: 'sonder5_animal_dog',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s5AnimalDog,
    text: 'The dog died. This is a sentence that should not carry very much, and it does. The dog was a complete being — had preferences, had fears, recognised your face — and now it does not exist. You are navigating the specific grief of an animal death, which is real grief operating with the knowledge that you are not supposed to be this affected, which makes it worse.',
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 2; p.karma += 3; p.setMem('s5AnimalDog', true) },
  },

  {
    id: 'sonder5_animal_birds',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s5AnimalBirds,
    text: 'You have started noticing birds. Not seriously — you cannot identify most of them — but you notice them now in a way you did not notice them at thirty. The sound of a particular bird at a particular time of morning is something that arrives and that you are glad of. You do not know when this started.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s5AnimalBirds', true) },
  },

  {
    id: 'sonder5_animal_insects',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 52 && !G.mem?.s5AnimalInsects,
    text: 'There are fewer insects than there used to be. Not in your garden specifically — everywhere. The windscreen at the end of a long drive is cleaner than it was twenty years ago. You have been noticing this for a while without naming it. When you named it you looked it up, and the numbers confirmed what your windscreen had been telling you.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.m -= 2; p.setMem('s5AnimalInsects', true) },
  },

  {
    id: 'sonder5_animal_cat',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5AnimalCat,
    text: 'The cat has opinions about where it sleeps and who it acknowledges. It does not explain these opinions and does not seem to need to. You have made adjustments to accommodate the cat\'s preferences in ways you would not have predicted. This seems like normal life now.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s5AnimalCat', true) },
  },

  {
    id: 'sonder5_animal_livestock',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban !== 'urban' && G.age >= 30 && !G.mem?.s5AnimalLivestock,
    text: 'An animal you had raised died or was slaughtered. You knew this was the purpose, or at least the outcome. The knowledge did not prevent the specific quality of the moment. You did what needed doing and you have not thought too carefully about what the moment contained.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 3; p.e += 2; p.setMem('s5AnimalLivestock', true) },
  },

  {
    id: 'sonder5_animal_wild',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s5AnimalWild,
    text: 'You saw a wild animal at close range once — not in a zoo, but in the world, where it lived. For a moment it looked directly at you. You do not know what it registered. Something about the look stayed.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('s5AnimalWild', true) },
  },

  {
    id: 'sonder5_animal_mosquito',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.archetype) &&
      G.age >= 20 &&
      !G.mem?.s5AnimalMosquito,
    text: 'The mosquito net is the structure of sleep. You tuck it in at all four corners before you lie down. The sound of a mosquito inside the net — the high thin sound — is the sound of a specific kind of wakefulness: fully alert, listening for the location. In the morning sometimes there is a smear of blood on the white fabric where it landed. Not yours.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 2; p.setMem('s5AnimalMosquito', true) },
  },

  {
    id: 'sonder5_animal_gone_species',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s5AnimalGone,
    text: 'There is an animal you remember from childhood that is no longer there. Not extinct — but locally gone, absent from a place that used to have it. You saw it as a child in the way children see things without cataloguing: it was just part of what was there. Now it is not. The world your grandchildren inherit has a different species list than the world you were born into.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.e += 3; p.setMem('s5AnimalGone', true) },
  },

  {
    id: 'sonder5_animal_garden',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s5AnimalGarden,
    text: 'Something lives in the garden — a hedgehog, a lizard, a bird that nests in the same place every spring. You have come to regard this as a relationship, which you did not expect. You do not feed it. You do not interfere with it. But you notice it, and you notice its absence on the days it does not appear, and you are glad when it returns.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 2; p.setMem('s5AnimalGarden', true) },
  },

]

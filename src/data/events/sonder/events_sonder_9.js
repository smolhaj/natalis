// events_sonder_9.js — MODE C contemplative auto-resolve events (36 events)
// Four registers: CHILDHOOD MEMORY (9), LANGUAGE AND WORDS (9),
// MONEY AND WANT (9), FRIENDSHIP OVER TIME (9)
// All mem-gated single-fire, weight 2, no choices, no new flags.

export const EVENTS_SONDER_9 = [

  // ══════════════════════════════════════════════════════════════════════════
  // CHILDHOOD MEMORY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder9_child_memory_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9ChildSmell,
    text: 'A smell from your childhood arrives without warning — cooked rice, diesel, woodsmoke, the particular soap of that house. You are somewhere completely different and the smell opens a door into a world that is not here anymore. The door is only open for a moment.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s9ChildSmell', true) },
  },

  {
    id: 'sonder9_child_memory_fear',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s9ChildFear,
    text: 'There was something you were afraid of as a child that you are no longer afraid of. You can\'t remember when you stopped. The fear was real — as real as any fear you have now — and it has simply disappeared, unannounced, the way children\'s fears do. You wonder sometimes what the adult equivalent will turn out to be.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s9ChildFear', true) },
  },

  {
    id: 'sonder9_child_memory_game',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s9ChildGame,
    text: 'You cannot fully remember the rules of the game you played every day for years as a child. The memory of playing it is vivid. The specific mechanics — the counting, the boundaries, the points — have disappeared entirely. The body remembers having done it; the mind has let the specifics go.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s9ChildGame', true) },
  },

  {
    id: 'sonder9_child_memory_adult',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s9ChildAdult,
    text: 'You have become the age of the adults you remember from childhood. This happens slowly and then you notice it: you are the age of your parents at the age you remember them most clearly. The adults of your childhood were not mythological. They were the age you are now.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s9ChildAdult', true) },
  },

  {
    id: 'sonder9_child_memory_school',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9ChildSchool,
    text: 'The school you attended probably looks different now. The classroom had a specific smell, specific light, the sound of it at certain times of the afternoon. You cannot reconstruct it exactly. Pieces of it surface in dreams sometimes, reconfigured into impossible architectures that are still recognisably that school.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s9ChildSchool', true) },
  },

  {
    id: 'sonder9_child_memory_holiday',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9ChildHoliday,
    text: 'There are days from childhood that are more present than most adult days. A holiday, a festival, a particular journey. The sensory detail is disproportionately high. The emotional charge of the memory has not diminished with time. You are not sure why these particular days stayed.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s9ChildHoliday', true) },
  },

  {
    id: 'sonder9_child_memory_embarrassment',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 30 && !G.mem?.s9ChildEmbarrassment,
    text: 'Something you did in childhood that you found embarrassing at the time still surfaces occasionally. Not with the full weight of the original embarrassment, but with a lighter residue that is more like recognition than shame. You know what kind of child you were from this residue.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s9ChildEmbarrassment', true) },
  },

  {
    id: 'sonder9_child_memory_adult_return',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s9ChildAdultReturn,
    text: 'The house you grew up in, if it still exists, is smaller than you remember. Every adult who returns to their childhood home says this. The rooms are proportioned for a child\'s scale of things, which changes nothing and changes everything about the memory of it.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s9ChildAdultReturn', true) },
  },

  {
    id: 'sonder9_child_memory_promise',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s9ChildPromise,
    text: 'You made a promise as a child — to yourself, or to someone else — that you have not kept. You have not thought about it in years and then it surfaces, specific and complete. Whether it still counts, after this many years, is a question you do not know how to answer.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 1; p.setMem('s9ChildPromise', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LANGUAGE AND WORDS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder9_lang_word_no_translation',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s9LangNoTrans,
    text: 'There is a word in your language that does not translate. When you try to explain it to someone who does not have the word, you need a sentence or a paragraph and even then you have not fully got it. The word does its work in a breath. The untranslatable word is a small proof that languages do not map perfectly onto each other.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s9LangNoTrans', true) },
  },

  {
    id: 'sonder9_lang_mother_tongue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s9LangMotherTongue,
    text: 'You think in one language and sometimes dream in another. The distribution shifts. When you are tired or emotional the first language returns without being summoned. The mother tongue is the one you reach for when the other ones are too slow.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s9LangMotherTongue', true) },
  },

  {
    id: 'sonder9_lang_phrase_inherited',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9LangPhrase,
    text: 'You have started using a phrase your parent used. You noticed it first as a stranger in your mouth — this is something they said, not you — and then as something you apparently say now. The line between inheriting and choosing is not clear in language.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s9LangPhrase', true) },
  },

  {
    id: 'sonder9_lang_name',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 18 && !G.mem?.s9LangName,
    text: 'Your name sounds different in different people\'s mouths. Your family says it one way. Teachers say it another. The version from your own family is the one you know is you. The other versions are approximations you have learned to answer to.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s9LangName', true) },
  },

  {
    id: 'sonder9_lang_silence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9LangSilence,
    text: 'There are things you do not have words for. Not complicated things — simple states that resist language. The feeling at dusk in a specific season. The particular quality of a Saturday morning. The state just after something ends. You live in these wordless moments more than the worded ones.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s9LangSilence', true) },
  },

  {
    id: 'sonder9_lang_accent',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s9LangAccent,
    text: 'You can hear where you are from in someone\'s voice within the first sentence. They probably cannot hear it in yours — you hear yours as simply how you speak. Everyone hears their own voice as neutral and other voices as accented. Accent is the thing your language does that you cannot fully hear from the inside.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s9LangAccent', true) },
  },

  {
    id: 'sonder9_lang_reading',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 16 && !G.mem?.s9LangReading,
    text: 'You learned to read and then it was transparent — you stopped seeing the letters and saw the meaning instead. You cannot fully remember the transition. At some point the individual marks on the page became words and then the words became invisible and only what they pointed to remained. Learning to read is one of the few things you cannot fully remember having done.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s9LangReading', true) },
  },

  {
    id: 'sonder9_lang_formal',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s9LangFormal,
    text: 'You have a formal version of how you speak that you deploy for specific situations — official documents, doctors, people with authority. The formal version is recognisably you and also not entirely you. You switch into it without deciding to. The switch is one of the small performances of being a person in a society.',
    choices: null,
    effect: (p) => { p.s += 1; p.setMem('s9LangFormal', true) },
  },

  {
    id: 'sonder9_lang_last_speaker',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s9LangLastSpeaker,
    text: 'There is someone in your life — a parent, an elder, a specific person — who spoke a version of your language that no one speaks anymore. The dialect of a specific village. The register of a specific generation. Their particular way of saying things. When they died, that version died with them. You sometimes catch yourself reaching for one of their phrases and finding it in your mouth, which means it is not entirely gone.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 2; p.setMem('s9LangLastSpeaker', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MONEY AND WANT
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder9_money_first_earned',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 22 && !G.mem?.s9MoneyFirstEarned,
    text: 'The first money you earned yourself was different from money given to you. The specific weight of it — what it cost in time and effort and humility to produce — was information about the relationship between work and value that no description had conveyed. You spent it on something you no longer remember and the fact of having earned it is what stayed.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s9MoneyFirstEarned', true) },
  },

  {
    id: 'sonder9_money_want',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 16 && !G.mem?.s9MoneyWant,
    text: 'There was something you wanted very badly and could not have because of money. The wanting had a specific texture — you can still produce it if you try. The object itself has long since ceased to matter. The shape of the wanting stayed.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s9MoneyWant', true) },
  },

  {
    id: 'sonder9_money_enough',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9MoneyEnough,
    text: 'There is a point at which more money stops being the relevant variable. You know people who have not reached this point with substantially more than you have, and people who reached it with substantially less. The point is not about an amount. It is about something else that is harder to name.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s9MoneyEnough', true) },
  },

  {
    id: 'sonder9_money_windfall',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 40 && !G.mem?.s9MoneyWindfall,
    text: 'Unexpected money arrived once. Not a large amount — something modest. You spent it on something you did not need. The lightness of spending money that was not budgeted for, that arrived without effort, was a different feeling from the money you worked for. You have thought about this difference.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s9MoneyWindfall', true) },
  },

  {
    id: 'sonder9_money_gift',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 18 && !G.mem?.s9MoneyGift,
    text: 'Someone gave you money once — not your parents, but an aunt or an elder or a neighbour — and you did not know what to do with the social weight of it. The money was a small amount and also a relationship, an expectation, something about what you were supposed to become. You spent it on something and hoped that was the right response.',
    choices: null,
    effect: (p) => { p.m += 2; p.s += 1; p.setMem('s9MoneyGift', true) },
  },

  {
    id: 'sonder9_money_comparison',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s9MoneyComparison,
    text: 'You know approximately what people you know earn. Not exactly, but approximately — through context, through what they own, through what they worry about. The comparison operates even when you are not aware of doing it. Money is one of the registers in which you understand your position in relation to other people.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s9MoneyComparison', true) },
  },

  {
    id: 'sonder9_money_debt',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 45 && !G.mem?.s9MoneyDebt,
    text: 'Debt is a different kind of weight from other weights. The specific feeling of owing money — the way it changes the texture of ordinary days, the amount of cognitive space it occupies — is information about the relationship between freedom and financial obligation that is only available from the inside.',
    choices: null,
    effect: (p) => { p.m -= 3; p.setMem('s9MoneyDebt', true) },
  },

  {
    id: 'sonder9_money_inheritance',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s9MoneyInheritance,
    text: 'You have money that someone else built and left. Or you have no money, and someone else built what you did not inherit, and the absence is also a kind of inheritance. Either way, the question of what you owe to what came before — and to what comes after — is a financial question that is also not a financial question.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('s9MoneyInheritance', true) },
  },

  {
    id: 'sonder9_money_late_accounting',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s9MoneyLateAccounting,
    text: 'You do the accounting, late in life. Not just the financial accounting — also the accounting of what money made possible, what it prevented, what it would have changed. The life you had and the life you might have had if the financial facts had been different. The accounting is never entirely about money.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('s9MoneyLateAccounting', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FRIENDSHIP OVER TIME
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder9_friend_oldest',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s9FriendOldest,
    text: 'Your oldest friend and you have known each other long enough that you each hold versions of the other person that no longer exist. You remember who they were at fifteen, at twenty-two, at thirty. They remember who you were. The friendship holds all of these versions simultaneously, which is not something newer relationships can do.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s9FriendOldest', true) },
  },

  {
    id: 'sonder9_friend_lost_track',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s9FriendLostTrack,
    text: 'There is someone you were close to for years and are no longer in contact with, through no particular event — just the gradual thinning of contact, the less-frequent messages, the year that passed without speaking that became several years. You think of them sometimes without knowing how to bridge the gap the years have made.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 2; p.setMem('s9FriendLostTrack', true) },
  },

  {
    id: 'sonder9_friend_different_now',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s9FriendDiffNow,
    text: 'A friend has become someone quite different from the person you became friends with. The values shifted, or the life circumstances, or both. You are still friends, or not. If you are still friends, there is a question you are both navigating about which version of each other the friendship is based on.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s9FriendDiffNow', true) },
  },

  {
    id: 'sonder9_friend_crisis',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 40 && !G.mem?.s9FriendCrisis,
    text: 'A friendship was tested by something — a conflict, a crisis, a difference of opinion that turned out to matter more than expected. What followed was either a friendship that came out the other side deeper, or a friendship that ended in a way that still leaves a residue. You know which.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s9FriendCrisis', true) },
  },

  {
    id: 'sonder9_friend_geography',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.s9FriendGeography,
    text: 'Some friendships are friendships of geography — they exist because you were in the same place at the same time, in a phase of life when proximity makes friendship. When the geography ends, the friendship sometimes does too, and sometimes it doesn\'t, and the difference between the two outcomes is not fully explained by how close you were when you were close.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s9FriendGeography', true) },
  },

  {
    id: 'sonder9_friend_effortless',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s9FriendEffortless,
    text: 'One of the things you notice in your forties is how rare a friendship is where no effort is required. The ones where you can pick up mid-sentence after two years and the connection is immediately present. You have one or two of these if you are lucky. You know you are lucky.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s9FriendEffortless', true) },
  },

  {
    id: 'sonder9_friend_dead',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s9FriendDead,
    text: 'You have lost friends now. The specific weight of a friend\'s death is different from a parent\'s death or a partner\'s death — it is the loss of someone who knew you from the outside, who held a perspective on you that no one in your family had, who chose you without obligation. This is not replaceable.',
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 4; p.setMem('s9FriendDead', true) },
  },

  {
    id: 'sonder9_friend_new_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s9FriendNewLate,
    text: 'You have made a new friend late in life — someone you did not know before your sixties. This is supposed to be harder late in life and it is harder, and it also happened. The late friendship has a different quality: more deliberate, less time assumed, more present. The older friendships have the weight of decades. The late friendship has the weight of the present.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 1; p.setMem('s9FriendNewLate', true) },
  },

  {
    id: 'sonder9_friend_the_group',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s9FriendGroup,
    text: 'The group of friends from this period of your life: you all know each other, you are all in the same general place in life, you see each other often enough that you have a shared shorthand. You do not yet know that this is a phase. You will miss it later in a way that surprises you with its specificity.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s9FriendGroup', true) },
  },

]

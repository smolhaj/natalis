// events_sonder_59.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_59 = [

  {
    id: 'sonder_59_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 54 && !G.mem?.s59a,
    text: 'The version of a conversation that happened inside your head and the version that actually happened: you have both versions. The internal one is fully articulate, makes all the right points, finds exactly the phrase. The actual one was fine. It covered what needed to be covered. The internal version lives in you like a better speech that no one needed to hear except you.',
    choices: null,
    effect: (p) => { p.setMem('s59a', true) },
  },

  {
    id: 'sonder_59_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s59b,
    text: 'The season of the year that belonged to you: not everyone has one, but you do — the light in October or the particular quality of February or the way a specific week in late summer always feels like the end of something and also not the end. You have been oriented to this season for as long as you can remember. You do not know why. You have stopped needing to know why.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s59b', true) },
  },

  {
    id: 'sonder_59_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 30 && !G.mem?.s59c,
    text: 'The job interview where you were good but not right: you knew by the end of the second question that the role was not yours, but you stayed for the full hour and answered everything as well as you could. Walking out, you felt neither disappointed nor relieved — the category that applied was cleaner than those. You were not what they were looking for, and what they were looking for was not quite you.',
    choices: null,
    effect: (p) => { p.setMem('s59c', true) },
  },

  {
    id: 'sonder_59_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem?.s59d,
    text: 'The animal you found: the bird with the broken wing, the cat that appeared in the garden, the dog that followed you home. The question of what to do with it — the question of what you are responsible for once you have seen it and it has seen you. The answer arrived faster than the question. You did not choose to be responsible. You simply were.',
    choices: null,
    effect: (p) => { p.m += 2; p.karma += 2; p.setMem('s59d', true) },
  },

  {
    id: 'sonder_59_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 55 && !G.mem?.s59e,
    text: 'The organisation you joined and then left: not dramatically, not with a letter of resignation, but by the slow process of attending less and caring less and eventually stopping. The people still inside it are doing the same things they were doing when you were there. You check in occasionally. The check-in confirms that you were right to leave and also that you are somewhat diminished by having left.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s59e', true) },
  },

  {
    id: 'sonder_59_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s59f,
    text: 'The simplification of opinion that happened with age: you held complex, nuanced positions at thirty-five. Now the same questions produce shorter answers. You are not sure if this is wisdom — the unnecessary things falling away — or a kind of tiredness that dresses itself up as wisdom. You keep the distinction open. The distinction is the thing that keeps the answers honest.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s59f', true) },
  },

  {
    id: 'sonder_59_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 52 && !G.mem?.s59g,
    text: 'The text message you composed and deleted. You got through the whole sentence — sometimes two — and then you read it back and saw something in it that made you delete it. The person you were going to send it to does not know it was composed. What you deleted was true. Sending it would have started a different conversation, and you have decided, for reasons you cannot fully articulate, that this is not the moment for that conversation.',
    choices: null,
    effect: (p) => { p.setMem('s59g', true) },
  },

  {
    id: 'sonder_59_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 32 && !G.mem?.s59h,
    text: 'The landlord of the flat: the relationship is transactional and also strangely intimate — you pay them money every month; they have a key; they can enter, technically, with notice. The flat is yours while also not being yours. The relationship ends when you leave and you never think about the landlord again, and presumably they do not think about you.',
    choices: null,
    effect: (p) => { p.setMem('s59h', true) },
  },

  {
    id: 'sonder_59_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s59i,
    text: 'The years you were in a hurry and the years you were not: looking back, both kinds of years contained the same number of things worth noticing. The hurry did not produce more. The slowness did not mean less happened. The speed was about mood and circumstance and the weather inside the decade, not about the actual pace of living.',
    choices: null,
    effect: (p) => { p.setMem('s59i', true) },
  },

  {
    id: 'sonder_59_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 58 && !G.mem?.s59j,
    text: 'The meeting you chaired once and did not want to chair again, and the person who always chairs it, for whom it is apparently not what it is for you. You wonder sometimes what it would be like to be the person who does not mind chairing the meeting. You cannot access that interiority. They chair the meeting every time. They seem fine.',
    choices: null,
    effect: (p) => { p.setMem('s59j', true) },
  },

  {
    id: 'sonder_59_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s59k,
    text: 'The hiding place that was yours alone: the corner behind the sofa, the space under the stairs, the cupboard in the back room. The hiding place had no purpose beyond being the place you could be that no one else knew about. The feeling of being in it was the feeling of being temporarily exempt from the requirements of being visible. The hiding place got too small eventually. You remember when that happened.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s59k', true) },
  },

  {
    id: 'sonder_59_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s59l,
    text: 'The thing you understand about your field that takes twenty minutes to explain and cannot be made shorter without losing the thing. You have tried to make it shorter. The shorter version is a different thing. You have accepted that the twenty minutes is the price of the understanding and you pay it each time someone sincerely wants to understand.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s59l', true) },
  },

  {
    id: 'sonder_59_m',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.s59m,
    text: 'The social code that organised the year: who you sat with at lunch, who you greeted in the corridor and how, the specific calibration required to be inside the acceptable range. You navigated it every day without anyone explaining it because it did not need explaining — everyone knew and no one said. You were expert at it and did not know the expertise would not transfer.',
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s59m', true) },
  },

  {
    id: 'sonder_59_n',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s59n,
    text: 'The day you realised you had become the person in the room who remembered when the previous version existed: the building before it was renovated, the company before the acquisition, the system before the update. The remembering makes you useful in a specific way and also marks you as belonging to an earlier version. You carry both states — the usefulness and the markedness — without complaint, mostly.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s59n', true) },
  },

  {
    id: 'sonder_59_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 28 && !G.mem?.s59o,
    text: 'The friendship that formed because you were in the same place at the same time — the course, the job, the building. You would not have sought each other out. The situation sought you both out and handed you to each other. Three years later you cannot imagine not knowing them, but the mechanism that produced the knowing was entirely arbitrary. This thought does not reduce the friendship. It just makes it strange, which is a quality it already had.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s59o', true) },
  },

  {
    id: 'sonder_59_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 58 && !G.mem?.s59p,
    text: 'The project that got good reviews and the project that did not: you cannot always trace the difference back to quality. Sometimes the timing was wrong, or the audience was wrong, or the thing you made was right but not for that year. You have stopped expecting the correspondence to be clean. The making and the reception are in different time zones and they do not always meet.',
    choices: null,
    effect: (p) => { p.setMem('s59p', true) },
  },

  {
    id: 'sonder_59_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s59q,
    text: 'The photo taken of you that you did not know was being taken. You see it later and you recognise yourself but not the self you usually see in the mirror — this one is in motion, or facing slightly away, or caught in the expression that happens between the expressions you use for other people. The unposed face. You find it hard to say whether this one is more or less true than the posed version. Both are yours.',
    choices: null,
    effect: (p) => { p.setMem('s59q', true) },
  },

  {
    id: 'sonder_59_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 14 && !G.mem?.s59r,
    text: 'The long car journey: the window, the changing landscape, the radio that faded in and out, the game you invented to pass the time that only worked in the car. The family is contained in the car for hours. The containment is its own texture — the arguments that are minor because there is nowhere to go, the silences that are fine because everyone is looking at the same road.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s59r', true) },
  },

  {
    id: 'sonder_59_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 26 && !G.mem?.s59s,
    text: 'The subject you were good at but did not pursue: the natural facility with the language, with the drawing, with the mathematics. Facility is not passion and it is not vocation. You could have gone further in it. You went elsewhere. The facility is still there in a slightly rusty form — you notice it sometimes when the subject comes up at a party and you find you know more than the people who studied it.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s59s', true) },
  },

  {
    id: 'sonder_59_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s59t,
    text: 'The accumulation of the ordinary days: you have had so many ordinary days that they have become a form of richness. The Tuesday that was not remarkable. The Wednesday that was not remarkable. Wednesday after Wednesday that, taken together, are the interior of what a life is. The unremarkable days are most of it. You have stopped wanting most of it to be remarkable.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s59t', true) },
  },

  {
    id: 'sonder_59_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 50 && !G.mem?.s59u,
    text: 'The colleague who is also a friend in a way that only makes sense inside the job: outside the building you have little to talk about, and both of you know this, and inside the building you are genuinely glad to see each other every morning. When one of you leaves the job, the friendship dissolves without incident. This is not a failure. It is an accurate description of what it was.',
    choices: null,
    effect: (p) => { p.setMem('s59u', true) },
  },

  {
    id: 'sonder_59_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 63 && !G.mem?.s59v,
    text: 'The ache in the knee or the shoulder or the back that has been there for years: not severe, not interesting, just there. Part of the daily weather of the body. You have stopped mentioning it because it is not worth mentioning and also because it has been there so long that mentioning it would imply something is wrong when in fact it is simply how you are now. The body keeps its own account of the years.',
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('s59v', true) },
  },

  {
    id: 'sonder_59_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && !G.mem?.s59w,
    text: 'The habit you have that you did not choose: the route you walk when you are thinking, the specific order of things in the morning routine, the mug you always use. None of these were decided. They arrived through repetition. You notice them occasionally when something interrupts them — the mug breaks, the road is closed — and you feel the interruption in your body before you feel it in your mind.',
    choices: null,
    effect: (p) => { p.setMem('s59w', true) },
  },

  {
    id: 'sonder_59_x',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.s59x,
    text: 'The person who was nice to you when they did not have to be: a teacher who noticed, an older student who said something kind in the corridor. Small event. Long reach. You have thought about it more times than the person could possibly know. Their not knowing is part of the thing — they were being decent and moving on; you were carrying it years later. That gap is interesting to you still.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s59x', true) },
  },

  {
    id: 'sonder_59_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 54 && !G.mem?.s59y,
    text: 'The list you keep: not physically, not always, but the running total of what you owe and what is owed to you — the favours, the slight slights, the generous acts by people you have not been able to repay. The list is not a grievance. It is an accounting. You do not intend to square every entry. You intend to stay aware of what the account looks like.',
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s59y', true) },
  },

  {
    id: 'sonder_59_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s59z,
    text: 'The younger person who reminds you of yourself and who will not take the advice you would have needed: the advice arrives too early, or in the wrong form, or from someone who is not yet known well enough for the advice to land. You know this. You give the advice anyway. The giving is for you as much as for them.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s59z', true) },
  },

  {
    id: 'sonder_59_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 56 && !G.mem?.s59aa,
    text: 'The kitchen at a party: the room people drift to when they want to have a real conversation. The living room is for the performance of the party; the kitchen is where the party becomes the thing the party was for. You have had the best conversations of your life in kitchens at parties while people moved around you looking for wine.',
    choices: null,
    effect: (p) => { p.m += 2; p.s += 2; p.setMem('s59aa', true) },
  },

  {
    id: 'sonder_59_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s59ab,
    text: 'The first time someone described you accurately to yourself: a friend, or someone you had just met, who named something about you that you had felt but had not found the words for. The naming was a gift. It was also slightly invasive — the sensation of being seen in a way you had not authorised. You thanked them. You have thought about it since.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s59ab', true) },
  },

  {
    id: 'sonder_59_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s59ac,
    text: 'The thing that is easier now than it was at forty: the thing you have been dreading since middle age that turns out to be all right. You had constructed an elaborate anticipatory suffering about it. The suffering was more costly than the thing. You have noticed this pattern and you still fall into it, but now you know the pattern exists, which is a marginal improvement.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s59ac', true) },
  },

  {
    id: 'sonder_59_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && !G.mem?.s59ad,
    text: 'The bus you took every day for three years and the other people on the bus who were also taking it every day: not friends, but people who knew each other in the silent register of shared routine. The man who always sat in the same seat. The woman who read a physical newspaper into the early 2010s. The particular light at the stop near the hospital. You can see the route in your head twenty years later. The people on it are alive somewhere or they are not.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s59ad', true) },
  },

]

export const ACTIVITIES = {
  mind: [
    {
      id: 'read',
      name: 'Read widely',
      description: 'Spend this year reading everything you can find.',
      minAge: 8,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 3; p.m += 2; },
      condition: null,
      outcome: 'Your understanding of the world deepens quietly.',
      prose: (G) => {
        if (G.age < 12) return 'You find a book and disappear into it.'
        if (G.age < 18) return 'You read more than anyone assigns you. The rest of it is better.'
        if (G.age < 30) return 'You read until the light goes. The book is not especially good. You finish it anyway.'
        if (G.age < 50) return 'You read more slowly than you used to. You take notes now. You never did before.'
        return 'You read in the early mornings, before the day gets to you.'
      },
    },
    {
      id: 'meditate',
      name: 'Meditate',
      description: 'Practice stillness and mental discipline.',
      minAge: 14,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.m += 5; },
      condition: null,
      outcome: 'The noise in your head quiets, if only a little.',
      prose: (G) => {
        if (G.stats.health < 35) return 'The stillness is harder when the body is loud. You sit with it anyway.'
        if (G.age < 25) return 'You sit for fifteen minutes and spend most of it counting the minutes.'
        if (G.age > 55) return 'The practice is quieter than it used to be. The mind knows what is expected now.'
        return 'The noise settles eventually. Not all of it, but enough.'
      },
    },
    {
      id: 'study',
      name: 'Study for exams',
      description: 'Put in extra hours on your education.',
      minAge: 10,
      maxAge: 22,
      cost: 0,
      effect: (p) => { p.e += 5; p.m -= 2; },
      condition: null,
      outcome: 'The work pays off in marks, if not in rest.',
      prose: (G) => {
        if (G.age < 14) return 'The exam is next week. You work through the textbook again.'
        if (G.age < 18) return 'You study until late. The material does not care that you are tired.'
        return 'The library closes at midnight. You leave just before.'
      },
    },
    {
      id: 'online_course',
      name: 'Take an online course',
      description: 'Learn a new skill from home.',
      minAge: 16,
      maxAge: null,
      cost: 20,
      effect: (p) => { p.e += 4; p.m += 1; },
      condition: null,
      outcome: 'A new capability, quietly earned.',
      prose: (G) => {
        if (G.age < 25) return 'You do the modules over a series of evenings.'
        if (G.age < 50) return 'You do it on lunch breaks and the occasional weekend morning.'
        return 'You take the course at your own pace. There is no deadline.'
      },
    },
    {
      id: 'learn_language',
      name: 'Learn a language',
      description: 'Dedicate this year to learning another language.',
      minAge: 12,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 5; p.s += 3; p.m += 2; },
      condition: null,
      outcome: 'Another world opens. Imperfectly at first.',
      prose: (G) => {
        if (G.age < 18) return 'You learn the numbers first, then the words for food, then slowly the grammar that holds everything together.'
        if (G.age < 35) return 'The language exists in a separate part of your mind. The two parts are slowly connecting.'
        return 'Progress is slower than it was when you were young. It is also more deliberate.'
      },
    },
    {
      id: 'journal',
      name: 'Keep a journal',
      description: 'Write down your thoughts regularly.',
      minAge: 12,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.m += 4; p.r -= 3; },
      condition: null,
      outcome: 'Writing becomes a way of thinking.',
      prose: (G) => {
        if (G.age < 18) return 'You write down what happened. Then what you thought about it, which takes longer.'
        if (G.age > 60) return 'You read what you wrote ten years ago. You do not entirely recognize that person.'
        if (G.partner) return 'You write about ordinary things. The person across the table. The way the morning went.'
        return 'Writing becomes a way of finding out what you think.'
      },
    },
    {
      id: 'philosophy',
      name: 'Study philosophy',
      description: 'Read the great thinkers. Try to understand what they got right.',
      minAge: 16,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 3; p.m += 3; },
      condition: null,
      outcome: 'The questions become more interesting than the answers.',
      prose: (G) => {
        if (G.age < 20) return 'You read Camus at seventeen and it rearranges something. Then you read the critics of Camus.'
        if (G.age > 55) return 'You have stopped expecting the questions to resolve. This is not defeat — it is something else.'
        return 'The questions become more interesting than the answers.'
      },
    },
    {
      id: 'chess',
      name: 'Play chess',
      description: 'Compete in chess regularly.',
      minAge: 10,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 3; p.s += 2; },
      condition: null,
      outcome: 'The discipline of it changes how you think.',
      prose: (G) => {
        if (G.age < 16) return 'You lose more than you win. The losing is the learning.'
        if (G.age > 45) return 'You play online now, mostly. The opponent is somewhere else on the planet.'
        return 'The discipline changes how you think about other things.'
      },
    },
    {
      id: 'attend_religious_service',
      name: 'Attend religious service',
      description: null,
      minAge: 8,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.m += 5; p.s += 2; p.addFlag('devout'); },
      condition: null,
      outcome: 'The ritual is older than any individual doubt.',
      prose: (G) => {
        if (G.age < 12) return 'You sit in the pew and watch the adults. The words are older than anyone present.'
        if (G.age < 25) return 'You go more out of habit than conviction. Something in it is still useful.'
        if (G.age > 55) return 'The service has not changed much in thirty years. Neither have you, really.'
        return 'The ritual holds the week in place.'
      },
    },
    {
      id: 'chess_tournament',
      name: 'Enter a chess tournament',
      description: null,
      minAge: 10,
      maxAge: null,
      cost: 30,
      effect: (p) => { if (Math.random() < 0.45) { p.e += 6; p.m += 5; } else { p.e += 2; p.m -= 1; } },
      condition: null,
      outcome: 'Win or lose, the discipline is its own reward.',
      prose: (G) => {
        if (G.stats.smarts > 65) return 'You advance further than you expected. The concentration required is total.'
        return 'You are eliminated in the middle rounds. You see exactly where it went wrong.'
      },
    },
    {
      id: 'library',
      name: 'Visit the library',
      description: 'Spend time reading and researching.',
      minAge: 8,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 4; p.m += 2; },
      condition: null,
      outcome: 'Knowledge accumulates in ways you cannot always measure.',
      prose: (G) => {
        if (G.age < 12) return 'You find a book about something you have never thought about. You take it home.'
        if (G.age > 55) return 'You go on a weekday afternoon when it is quiet. That is most of the point.'
        return 'You spend an hour there. Leave with three things.'
      },
    },
    {
      id: 'gardening',
      name: 'Take up gardening',
      description: 'Grow things. Connect with the slow rhythm of the earth.',
      minAge: 10,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.h += 2; p.m += 5; },
      condition: null,
      outcome: 'Something small and green survives under your care.',
      prose: (G) => {
        if (G.age < 20) return 'You are surprised by how patient it requires you to be.'
        if (G.age > 55) return 'You have been doing this long enough to know what will and will not survive the winter.'
        return 'Something small and green makes it through under your care.'
      },
    },
  ],

  body: [
    {
      id: 'gym',
      name: 'Go to the gym',
      description: 'Commit to regular physical training.',
      minAge: 16,
      maxAge: null,
      cost: 50,
      effect: (p) => { p.h += 5; p.m += 2; },
      condition: null,
      outcome: 'Your body becomes something you can rely on.',
      prose: (G) => {
        if (G.stats.health < 35) return 'The body resists and then cooperates. You leave feeling like something has shifted.'
        if (G.age < 25) return 'The gym is loud and you do not mind. You work for an hour.'
        if (G.age > 50) return 'The weight is lighter than it used to be. The discipline is the same.'
        return 'You go three times a week. It is not about performance anymore. It is about staying.'
      },
    },
    {
      id: 'walk',
      name: 'Walk regularly',
      description: 'Make walking a daily habit.',
      minAge: 6,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.h += 3; p.m += 1; },
      condition: null,
      outcome: 'Small habits, compounded.',
      prose: (G) => {
        if (G.age < 12) return 'You walk to school and back. Sometimes you take the long way.'
        if (G.age > 60) return 'The walk is slower than it used to be. You notice more.'
        return 'You walk in the mornings now, before the day gets complicated.'
      },
    },
    {
      id: 'doctor',
      name: 'See a doctor',
      description: 'Get a checkup and address health concerns.',
      minAge: 18,
      maxAge: null,
      cost: 30,
      effect: (p) => { p.h += 8; },
      condition: (G) => G.stats.health < 75,
      outcome: 'You leave with answers, if not always comfort.',
      prose: (G) => {
        if (G.stats.health < 30) return 'The news is not good, but it is clear. You prefer clarity to uncertainty.'
        if (G.stats.health < 50) return 'The checkup finds something that needs watching. You leave with a prescription.'
        return 'You leave with answers, if not always comfort.'
      },
    },
    {
      id: 'drink',
      name: 'Drink heavily',
      description: 'A year of numbing the edges.',
      minAge: 16,
      maxAge: null,
      cost: 20,
      effect: (p) => { p.h -= 8; p.m -= 3; p.addFlag('heavy_drinker'); },
      condition: null,
      outcome: "It helps until it doesn't.",
      prose: (G) => {
        if (G.age < 20) return 'The drinking is social, mostly. This year the social part is more optional.'
        if (G.age > 40) return 'The habit has been here longer than most of your decisions.'
        return "You drink more than you should. You know this. You continue."
      },
    },
    {
      id: 'quit_smoking',
      name: 'Quit smoking',
      description: 'Try to stop. Again.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.h += 7; p.m -= 3; p.flags.includes('smoker') && (p.flags = p.flags.filter(f => f !== 'smoker')); },
      condition: (G) => G.flags.includes('smoker'),
      outcome: 'The withdrawal is real. So is the improvement.',
      prose: (G) => {
        if (G.flags.includes('therapy_veteran')) return 'The therapist would say you were ready. You were not sure. You tried anyway.'
        return 'The first week is the worst. The rest is maintenance.'
      },
    },
    {
      id: 'start_smoking',
      name: 'Start smoking',
      description: 'You pick up the habit.',
      minAge: 14,
      maxAge: 40,
      cost: 15,
      effect: (p) => { p.h -= 5; p.m += 1; p.addFlag('smoker'); },
      condition: (G) => !G.flags.includes('smoker'),
      outcome: 'The relief is temporary. The habit is not.',
      prose: (G) => {
        if (G.age < 18) return 'Everyone else already does. You start.'
        return 'The first one is harsh. The second is easier. The habit settles in.'
      },
    },
    {
      id: 'yoga',
      name: 'Practice yoga',
      description: 'Combine flexibility, strength, and mindfulness.',
      minAge: 14,
      maxAge: null,
      cost: 20,
      effect: (p) => { p.h += 4; p.m += 4; },
      condition: null,
      outcome: 'Something in your posture changes. And something else.',
      prose: (G) => {
        if (G.age < 20) return 'You fall out of half the poses. The instructor says this is normal.'
        if (G.age > 50) return 'You have been doing this long enough that the body knows the shapes before you do.'
        return 'Something in the posture changes. And something else.'
      },
    },
    {
      id: 'diet',
      name: 'Improve your diet',
      description: 'Cut the bad. Add the good. Actually commit to it.',
      minAge: 18,
      maxAge: null,
      cost: 15,
      effect: (p) => { p.h += 6; p.m += 2; },
      condition: null,
      outcome: 'The difference accumulates slowly.',
      prose: (G) => {
        if (G.age < 30) return 'You cut out the obvious things. You cook more. The changes are small and compounding.'
        if (G.flags.includes('heavy_drinker')) return 'You change what you eat. The drinking is a separate problem.'
        return 'The difference accumulates slowly and then all at once.'
      },
    },
    {
      id: 'join_sports_team',
      name: 'Join a sports team',
      description: 'Compete as part of a group.',
      minAge: 10,
      maxAge: 55,
      cost: 25,
      effect: (p) => { p.h += 4; p.s += 5; p.m += 3; },
      condition: null,
      outcome: 'The team becomes part of your life.',
      prose: (G) => {
        if (G.age < 16) return 'You make the team. The practices are twice a week.'
        if (G.age > 40) return 'Most of the team is in their forties. Sport is an excuse to be somewhere together.'
        return 'The team becomes part of the week before you notice it has.'
      },
    },
    {
      id: 'therapy_body',
      name: 'See a physiotherapist',
      description: 'Address physical pain properly.',
      minAge: 25,
      maxAge: null,
      cost: 40,
      effect: (p) => { p.h += 10; },
      condition: (G) => G.stats.health < 70,
      outcome: 'The chronic pain diminishes.',
      prose: (G) => 'The physio identifies what is wrong in about five minutes. Fixing it takes months.',
    },
    {
      id: 'dentist',
      name: 'Visit the dentist',
      description: null,
      minAge: 6,
      maxAge: null,
      cost: 200,
      effect: (p) => { p.h += 4; p.m -= 1; },
      condition: null,
      outcome: 'An unpleasant hour for a healthier decade.',
      prose: (G) => {
        if (G.age < 12) return 'You do not enjoy it. You go anyway, which is most of the lesson.'
        if (G.age > 50) return 'The dentist says your teeth are in good shape for your age. You feel obscurely pleased.'
        return 'It has been longer than you meant since the last visit.'
      },
    },
    {
      id: 'optometrist',
      name: 'See an optometrist',
      description: null,
      minAge: 14,
      maxAge: null,
      cost: 150,
      effect: (p) => { p.h += 3; p.m += 1; },
      condition: null,
      outcome: 'The world sharpens slightly.',
      prose: (G) => {
        if (G.age < 25) return 'The test confirms what you have been noticing. The glasses arrive in a week.'
        if (G.age > 45) return 'Your prescription has changed again. The world was dimmer than it needed to be.'
        return 'The world sharpens slightly after.'
      },
    },
    {
      id: 'recreational_drugs',
      name: 'Take recreational drugs',
      description: null,
      minAge: 16,
      maxAge: null,
      cost: 50,
      effect: (p) => { p.h -= 6; p.m += 5; p.addFlag('risky_behavior'); if (Math.random() < 0.12) p.addFlag('addiction'); },
      condition: (G) => !G.flags.includes('addiction'),
      outcome: 'A shortcut to somewhere. The return trip takes longer.',
      prose: (G) => {
        if (G.age < 20) return 'The first time is ordinary. It is the wanting it again that matters.'
        if (G.age > 35) return 'A shortcut to somewhere you needed to go. You come back from it.'
        return 'A shortcut to somewhere. The return trip takes longer than you thought.'
      },
    },
    {
      id: 'rehab',
      name: 'Enter rehabilitation',
      description: null,
      minAge: 16,
      maxAge: null,
      cost: 11000,
      effect: (p) => { if (Math.random() < 0.52) { p.h += 12; p.m += 10; } else { p.h += 4; p.m += 3; } },
      condition: (G) => G.flags.includes('addiction') || G.flags.includes('heavy_drinker'),
      outcome: 'The work is harder than you expected. So is the clarity.',
      prose: (G) => {
        if (G.flags.includes('therapy_veteran')) return 'The work is familiar in some ways. Harder in others.'
        return 'The work is harder than you expected. So is the clarity.'
      },
    },
  ],

  social: [
    {
      id: 'family_time',
      name: 'Spend time with family',
      description: 'Prioritize family this year.',
      minAge: 6,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.s += 4; p.m += 3; },
      condition: null,
      outcome: 'Some things can only be built slowly.',
      prose: (G) => {
        if (G.children && G.children.some(c => (c.age ?? 99) < 12)) return 'You are present this year in ways you sometimes are not. The children notice.'
        if (G.partner) return 'You are home for dinner most nights. You are present at dinner. These are not always the same thing.'
        if (G.parents && (G.parents.father?.alive || G.parents.mother?.alive)) return 'You visit more often than you have been. One of your parents mentions it.'
        if (G.age > 60) return 'The family is smaller than it used to be. You call who is left.'
        return 'You make time for the people who expected to see more of you.'
      },
    },
    {
      id: 'volunteer',
      name: 'Volunteer in your community',
      description: 'Give your time to something larger than yourself.',
      minAge: 16,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.s += 5; p.m += 4; p.addFlag('community_leader'); },
      condition: null,
      outcome: 'You matter to people who needed you to.',
      prose: (G) => {
        if (G.age < 22) return 'You show up every week. After a while they rely on you, which is different from merely expecting you.'
        if (G.age > 55) return 'You have been doing this for years. It is part of what the week is made of.'
        return 'You give your time. It is harder and more useful than you expected.'
      },
    },
    {
      id: 'therapy',
      name: 'Go to therapy',
      description: 'Talk to a professional about what is going on.',
      minAge: 16,
      maxAge: null,
      cost: 40,
      effect: (p) => { p.m += 8; p.r -= 4; p.addFlag('therapy_veteran'); },
      condition: null,
      outcome: 'You leave understanding something you could not name before.',
      prose: (G) => {
        if (!G.flags.includes('therapy_veteran')) return 'The first session is uncomfortable. So is everything useful.'
        if (G.stats.happiness < 30) return 'You talk about the thing you do not talk about.'
        return 'You leave understanding something you could not name before.'
      },
    },
    {
      id: 'book_therapy',
      name: 'Book Therapy',
      description: 'Address your mental health with a professional.',
      minAge: 16,
      maxAge: null,
      cost: 120,
      effect: (p) => { p.m += 6; p.addFlag('therapy_veteran'); },
      condition: null,
      outcome: 'Progress is slow and meaningful.',
    },
    {
      id: 'treat_sti',
      name: 'Treat STI',
      description: 'See a doctor and start treatment.',
      minAge: 16,
      maxAge: null,
      cost: 300,
      effect: (p) => { p.h += 8; p.m += 3; p.clearFlag('has_std'); p.clearFlag('chlamydia'); p.clearFlag('gonorrhea'); p.clearFlag('herpes'); },
      condition: (G) => G.flags.includes('has_std'),
      outcome: 'Treatment goes smoothly. Health restored. A relief.',
      prose: (G) => 'Treatment goes straightforwardly. Health is restored. It is a relief.',
    },
    {
      id: 'date_night',
      name: 'Invest in your relationship',
      description: 'Make deliberate effort with your partner.',
      minAge: 18,
      maxAge: null,
      cost: 20,
      effect: (p) => { p.m += 5; p.s += 5; p.addFlag('strong_marriage'); },
      condition: (G) => G.partner !== null,
      outcome: 'The relationship holds, and you remember why.',
      prose: (G) => {
        const rel = G.partner?.relationshipQuality ?? 50
        if (rel > 70) return 'The evening reminds you what the relationship is made of.'
        if (rel < 40) return 'The evening is awkward in places. Still, you went. So did they.'
        return 'You make time for each other. The relationship responds.'
      },
    },
    {
      id: 'join_club',
      name: 'Join a club or group',
      description: 'Meet people around a shared interest.',
      minAge: 14,
      maxAge: null,
      cost: 10,
      effect: (p) => { p.s += 6; p.m += 3; },
      condition: null,
      outcome: 'The community is smaller and more real than you expected.',
      prose: (G) => {
        if (G.age < 20) return 'You know one or two people by the end of the first meeting.'
        return 'The group is smaller and more specific than you expected. That is the point.'
      },
    },
    {
      id: 'networking',
      name: 'Network professionally',
      description: 'Build connections in your field.',
      minAge: 22,
      maxAge: null,
      cost: 15,
      effect: (p) => { p.s += 4; p.w += 3; },
      condition: null,
      outcome: 'The right conversation happens at the right time.',
      prose: (G) => {
        if (!G.career) return 'You work the room. Something might come of it.'
        return 'The right conversation happens at the right time. You follow up.'
      },
    },
    {
      id: 'make_peace',
      name: 'Repair a relationship',
      description: 'Reach out to someone you have drifted from.',
      minAge: 20,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.m += 7; p.r -= 5; p.s += 3; },
      condition: (G) => G.regret > 20,
      outcome: 'The conversation is harder than you expected and better.',
      prose: (G) => {
        if (G.regret > 50) return 'You have been carrying this for years. The conversation is harder than you expected and better.'
        return 'The call goes better than you were afraid it would.'
      },
    },
    {
      id: 'solitude',
      name: 'Embrace solitude',
      description: 'Deliberately spend time alone this year.',
      minAge: 16,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.m += 5; p.s -= 2; },
      condition: null,
      outcome: 'You learn to be comfortable in your own company.',
      prose: (G) => {
        if (G.age < 22) return 'You are alone more than your friends understand. You do not explain it.'
        if (G.age > 55) return 'You have spent enough time alone to be good company to yourself.'
        return 'A year of deliberate solitude. Not loneliness — something else. You learn the difference.'
      },
    },
    {
      id: 'call_sibling',
      name: 'Call a sibling',
      description: null,
      minAge: 8,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.s += 3; p.m += 3; },
      condition: (G) => G.siblings && G.siblings.some(s => s.alive),
      outcome: 'You remember things only the two of you share.',
      prose: (G) => 'You talk for longer than either of you planned. You remember things only the two of you share.',
    },
    {
      id: 'religious_community',
      name: 'Join a religious community',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.s += 6; p.m += 4; p.addFlag('devout'); },
      condition: null,
      outcome: 'The community gives your calendar a shape.',
      prose: (G) => {
        if (G.age < 25) return 'You join the congregation. The community gives the week a shape it did not have.'
        return 'The community is there whether or not you believe everything. You are grateful for this.'
      },
    },
    {
      id: 'mentor_young',
      name: 'Mentor someone younger',
      description: 'Pass on what you know to someone starting out.',
      minAge: 45,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.s += 5; p.m += 6; p.karma += 6; p.addFlag('became_mentor'); },
      condition: null,
      outcome: 'You give them something you would have wanted. That is the whole of it.',
      prose: (G) => 'You give them something you would have wanted at their age. That is the whole of it.',
    },
    {
      id: 'write_memoirs',
      name: 'Write your memoirs',
      description: 'Set down the life you have lived.',
      minAge: 60,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.e += 4; p.m += 5; p.r -= 6; p.addFlag('wrote_memoirs'); },
      condition: null,
      outcome: 'You find that writing it down changes what you remember. Some of it is better than you thought.',
      prose: (G) => {
        if (G.stats.happiness < 40) return 'You write around certain things. But writing around them is also writing them.'
        return 'You find that setting it down changes what you remember. Some of it is better than you feared.'
      },
    },
  ],

  money: [
    {
      id: 'overtime',
      name: 'Work overtime',
      description: 'Put in extra hours at work this year.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.w += 6; p.h -= 3; p.m -= 3; },
      condition: (G) => G.career !== null,
      outcome: 'The extra money is real. So is the cost.',
      prose: (G) => {
        if (G.age < 30) return 'You put in the extra hours. The money is real. So are the hours.'
        if (G.age > 45) return 'You do the overtime because you have learned how to do the work without it breaking you.'
        return 'This is the third year you have done this. You are not sure anymore if it is a choice.'
      },
    },
    {
      id: 'save',
      name: 'Save aggressively',
      description: 'Cut back on everything and build savings.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.w += 5; p.s -= 2; },
      condition: null,
      outcome: 'Security accumulates.',
      prose: (G) => {
        if (G.stats.wealth < 25) return 'You cut back on everything. The balance rises in small increments.'
        if (G.age > 50) return 'You have been saving for long enough that it is simply how you live.'
        return 'Security accumulates. It is unglamorous and works.'
      },
    },
    {
      id: 'invest_stocks',
      name: 'Invest in stocks',
      description: 'Put savings into the market.',
      minAge: 22,
      maxAge: null,
      cost: 20,
      effect: (p) => {
        const roll = Math.random()
        if (roll < 0.45) { p.w += 10; }
        else if (roll < 0.75) { p.w -= 5; }
        else { p.w -= 15; }
      },
      condition: (G) => G.stats.wealth > 30,
      outcome: 'Markets are indifferent to your needs.',
      prose: (G) => 'You follow the numbers as a way of not quite admitting you cannot control them.',
    },
    {
      id: 'side_hustle',
      name: 'Start a side hustle',
      description: 'Sell something, offer a service, make something work.',
      minAge: 18,
      maxAge: null,
      cost: 10,
      effect: (p) => {
        const roll = Math.random()
        if (roll < 0.6) { p.w += 7; p.m += 2; }
        else { p.w -= 3; p.m -= 3; }
      },
      condition: null,
      outcome: 'It either finds its feet or it doesn\'t.',
      prose: (G) => {
        if (G.age < 25) return 'You build it on weekends and late nights. It either finds its feet or it doesn\'t.'
        return 'You have been running this on the side for a while. This year determines whether it was worth it.'
      },
    },
    {
      id: 'buy_property',
      name: 'Invest in property',
      description: 'Put money into real estate.',
      minAge: 28,
      maxAge: null,
      cost: 30,
      effect: (p) => {
        const roll = Math.random()
        if (roll < 0.6) { p.w += 12; }
        else { p.w -= 6; }
      },
      condition: (G) => G.stats.wealth > 50,
      outcome: 'Property is unpredictable and everyone has an opinion about it.',
      prose: (G) => {
        if (['United Kingdom', 'Australia', 'Canada'].includes(G.currentCountry)) return 'Property in this country is not a neutral subject. You buy anyway.'
        return 'The paperwork takes longer than everything else. The investment is illiquid and everyone has an opinion.'
      },
    },
    {
      id: 'budget',
      name: 'Live on a budget',
      description: 'Track every penny. Cut the unnecessary.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { p.w += 4; p.m -= 1; },
      condition: null,
      outcome: 'Financial discipline is unglamorous and works.',
      prose: (G) => {
        if (G.stats.wealth < 25) return 'You track every number. The discipline is hard and useful.'
        return 'Financial discipline is unglamorous. It works.'
      },
    },
    {
      id: 'gambling',
      name: 'Gamble',
      description: 'Put your luck to the test.',
      minAge: 18,
      maxAge: null,
      cost: 20,
      effect: (p) => {
        const roll = Math.random()
        if (roll < 0.30) { p.w += 12; p.m += 3; }
        else if (roll < 0.55) { p.w -= 5; }
        else { p.w -= 14; p.m -= 5; p.addFlag('gambler'); }
      },
      condition: null,
      outcome: 'The odds are known and ignored.',
      prose: (G) => {
        if (G.flags.includes('gambler')) return 'The habit is established. You go because you go.'
        if (G.age < 25) return 'You go with people. The atmosphere is part of the point.'
        return 'The odds are known and ignored. That is the whole mechanism.'
      },
    },
    {
      id: 'donate',
      name: 'Donate to charity',
      description: 'Give a meaningful portion of your income away.',
      minAge: 18,
      maxAge: null,
      cost: 15,
      effect: (p) => { p.m += 5; p.s += 3; p.addFlag('generous'); },
      condition: (G) => G.stats.wealth > 25,
      outcome: 'The act of giving changes how you think about money.',
      prose: (G) => {
        if (G.age < 25) return 'You give a portion of what you have. It is less than you wanted and more than you could spare.'
        if (G.age > 55) return 'You have been giving for long enough that it is part of how money moves through your life.'
        return 'The act of giving changes how you think about money, slightly.'
      },
    },
    {
      id: 'lottery',
      name: 'Buy lottery tickets',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 20,
      effect: (p) => { const r = Math.random(); if (r < 0.001) { p.mo += 500000; p.m += 20; } else if (r < 0.05) { p.mo += 50; } else { p.m -= 1; } },
      condition: null,
      outcome: 'Statistically certain to disappoint. Emotionally impossible to stop.',
      prose: (G) => {
        if (G.stats.wealth < 25) return 'You buy the ticket. The fantasy is worth more than the odds suggest.'
        return 'Statistically certain to disappoint. Emotionally impossible to stop buying.'
      },
    },
    {
      id: 'casino_blackjack',
      name: 'Play blackjack at the casino',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { const bet = 200; const r = Math.random(); if (r < 0.47) { p.mo += bet; p.m += 3; } else { p.mo -= bet; p.m -= 2; } },
      condition: null,
      outcome: 'The house edge is real and patient.',
      prose: (G) => 'The house edge is real and patient.',
    },
    {
      id: 'casino_slots',
      name: 'Play the slot machines',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { const r = Math.random(); if (r < 0.02) { p.mo += 2000; p.m += 8; } else if (r < 0.20) { p.mo += 50; } else { p.mo -= 100; p.m -= 1; } },
      condition: null,
      outcome: 'The lights and sounds are engineered to keep you there.',
      prose: (G) => 'The lights and sounds are engineered to keep you there.',
    },
    {
      id: 'casino_roulette',
      name: 'Play roulette',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => { const r = Math.random(); if (r < 0.486) { p.mo += 300; p.m += 4; } else { p.mo -= 300; p.m -= 3; } },
      condition: null,
      outcome: 'The wheel has no memory.',
      prose: (G) => 'The wheel has no memory. This is the fact you are playing against.',
    },
    {
      id: 'pay_debt',
      name: 'Pay Off Debt',
      description: 'Make an extra debt payment beyond the minimum.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: null,
      outcome: 'You chip away at what you owe.',
    },
    {
      id: 'take_loan',
      name: 'Take Out Loan',
      description: 'Borrow money — 18% annual interest.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: null,
      outcome: 'The money arrives. The interest begins immediately.',
    },
    {
      id: 'join_rosca',
      name: 'Join a savings circle',
      description: 'Contribute monthly with a group — receive a lump sum when your turn comes.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: (G) => !G.rosca && ['subsaharan', 'developing_urban', 'post_soviet', 'developing_unstable', 'conflict_zone'].includes(G.character?.country?.archetype),
      outcome: 'You join the circle. Your turn will come.',
    },
    {
      id: 'leave_rosca',
      name: 'Leave savings circle',
      description: 'Exit the group — you lose your place in the payout rotation.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: (G) => !!G.rosca,
      outcome: 'You leave the circle. The others continue without you.',
    },
    {
      id: 'buy_gold',
      name: 'Buy gold / jewelry',
      description: 'Convert cash into gold — holds value through inflation and currency collapse.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: (G) => G.stats.wealth >= 20,
      outcome: 'Gold does not lose its weight.',
    },
    {
      id: 'sell_gold',
      name: 'Sell gold / jewelry',
      description: 'Convert your gold holdings back to cash.',
      minAge: 18,
      maxAge: null,
      cost: 0,
      effect: (p) => {},
      condition: (G) => (G.gold ?? 0) > 0,
      outcome: 'The value converts. Something tangible becomes liquid.',
    },
  ],

  crime: [
    { crimeId: 'shoplifting', label: 'Shoplift', minAge: 12 },
    { crimeId: 'pickpocketing', label: 'Pick a pocket', minAge: 14 },
    { crimeId: 'vandalism', label: 'Commit vandalism', minAge: 12 },
    { crimeId: 'fare_evasion', label: 'Evade a fare', minAge: 12 },
    { crimeId: 'burglary', label: 'Burgle a property', minAge: 16 },
    { crimeId: 'car_theft', label: 'Steal a car', minAge: 16 },
    { crimeId: 'arson', label: 'Commit arson', minAge: 16 },
    { crimeId: 'drug_dealing', label: 'Deal drugs', minAge: 16 },
    { crimeId: 'drug_trafficking', label: 'Traffic drugs', minAge: 20 },
    { crimeId: 'drug_lab', label: 'Run a drug lab', minAge: 22 },
    { crimeId: 'bribery', label: 'Pay a bribe', minAge: 18 },
    { crimeId: 'fraud', label: 'Commit fraud', minAge: 20 },
    { crimeId: 'tax_evasion', label: 'Evade taxes', minAge: 25 },
    { crimeId: 'embezzlement', label: 'Embezzle funds', minAge: 25 },
    { crimeId: 'money_laundering', label: 'Launder money', minAge: 25 },
    { crimeId: 'insider_trading', label: 'Trade on inside info', minAge: 25 },
    { crimeId: 'assault', label: 'Assault someone', minAge: 14 },
    { crimeId: 'armed_robbery', label: 'Armed robbery', minAge: 18 },
    { crimeId: 'extortion', label: 'Extort someone', minAge: 20 },
    { crimeId: 'loan_sharking', label: 'Loan shark', minAge: 22 },
    { crimeId: 'protection_racket', label: 'Run a protection racket', minAge: 22 },
    { crimeId: 'smuggling', label: 'Smuggle goods', minAge: 20 },
    { crimeId: 'human_trafficking', label: 'Traffic people', minAge: 22 },
    { crimeId: 'black_market', label: 'Black market trading', minAge: 18 },
    { crimeId: 'political_dissent', label: 'Engage in political dissent', minAge: 18 },
    { crimeId: 'corporate_fraud', label: 'Corporate fraud', minAge: 30 },
    { crimeId: 'aggravated_assault', label: 'Aggravated assault', minAge: 16 },
    { crimeId: 'manslaughter', label: 'Manslaughter', minAge: 16 },
    { crimeId: 'domestic_violence', label: 'Domestic violence', minAge: 16 },
    { crimeId: 'murder', label: 'Murder someone', minAge: 16 },
  ],

  hobbies: [
    { id: 'practice_music',   label: 'Practice Music',   emoji: '🎸', desc: 'Develop your musical skills.', minAge: 5,  cost: 0,    hobbyId: 'music',   delta: 8,  statBonus: { m: 4 } },
    { id: 'practice_art',     label: 'Draw / Paint',     emoji: '🎨', desc: 'Develop your artistic skills.', minAge: 5,  cost: 0,    hobbyId: 'art',     delta: 8,  statBonus: { m: 4, e: 2 } },
    { id: 'practice_writing', label: 'Write',            emoji: '✍️', desc: 'Work on your writing.', minAge: 8,  cost: 0,    hobbyId: 'writing', delta: 8,  statBonus: { e: 4 } },
    { id: 'practice_cooking', label: 'Cook Something',   emoji: '🍳', desc: 'Experiment in the kitchen.', minAge: 12, cost: 20,   hobbyId: 'cooking', delta: 8,  statBonus: { m: 5, h: 2 } },
    { id: 'practice_coding',  label: 'Code a Project',   emoji: '💻', desc: 'Build something with code.', minAge: 14, cost: 0,    hobbyId: 'coding',  delta: 10, statBonus: { e: 5 }, minYear: 1990 },
    { id: 'practice_sport',   label: 'Train Sport',      emoji: '⚽', desc: 'Physical training and practice.', minAge: 6,  cost: 0,    hobbyId: 'sport',   delta: 8,  statBonus: { h: 5, s: 2 } },
    { id: 'music_lesson',     label: 'Music Lesson',     emoji: '🎹', desc: 'Professional tuition — costs money but doubles progress.', minAge: 5,  cost: 80,   hobbyId: 'music',   delta: 18, statBonus: { m: 5, e: 3 } },
    { id: 'art_class',        label: 'Art Class',        emoji: '🖼️', desc: 'Structured tuition — faster skill growth.', minAge: 8,  cost: 60,   hobbyId: 'art',     delta: 16, statBonus: { m: 5 } },
    { id: 'writing_workshop', label: 'Writing Workshop',  emoji: '📝', desc: 'Workshop with peer feedback.', minAge: 16, cost: 100,  hobbyId: 'writing', delta: 16, statBonus: { e: 6 } },
  ],

  extracurricular: [
    { id: 'drama_club',    name: 'Drama Club',      desc: 'Perform in plays and musicals.',     minAge: 10, maxAge: 18, cost: 0,  effect: (p) => { p.s += 5; p.m += 4; p.addFlag('drama_club');    }, outcome: 'You find your voice onstage.',
      prose: (G) => G.age < 13 ? 'You are in the chorus. You memorize everyone else\'s lines too, just in case.' : 'You get a part. The stage is bigger than you expected and smaller once you are on it.' },
    { id: 'science_club',  name: 'Science Club',    desc: 'Experiments and curiosity.',         minAge: 10, maxAge: 18, cost: 0,  effect: (p) => { p.e += 6; p.m += 2; p.addFlag('science_club');  }, outcome: 'The world is a puzzle worth solving.',
      prose: (G) => G.age < 13 ? 'The experiments are simple and you want to know why they work.' : 'The world is a puzzle. This is the room where people take that seriously.' },
    { id: 'sports_team',   name: 'Sports Team',     desc: 'Join a school sports team.',         minAge: 10, maxAge: 18, cost: 0,  effect: (p) => { p.h += 6; p.s += 3; p.addFlag('sports_team');   }, outcome: 'Sweat, teamwork, and a little glory.',
      prose: (G) => G.age < 13 ? 'You make the team. The practices are twice a week.' : 'Sweat, teamwork, and the occasional moment of glory. In that order.' },
    { id: 'debate_club',   name: 'Debate Club',     desc: 'Argue for sport and precision.',     minAge: 12, maxAge: 18, cost: 0,  effect: (p) => { p.e += 4; p.s += 5; p.addFlag('debate_club');   }, outcome: 'Your arguments sharpen.',
      prose: (G) => G.age < 14 ? 'You learn that arguing and reasoning are different things.' : 'Your arguments get sharper. You start losing more because you are taking harder positions.' },
    { id: 'art_club',      name: 'Art Club',        desc: 'Explore creative expression.',       minAge: 10, maxAge: 18, cost: 0,  effect: (p) => { p.m += 5; p.s += 2; p.addFlag('art_club');      }, outcome: 'Creation is its own reward.',
      prose: (G) => G.age < 13 ? 'You make things without knowing why. That is the whole of it at this age.' : 'Creation is its own justification. You are starting to believe this.' },
    { id: 'school_band',   name: 'School Band',     desc: 'Make music with classmates.',        minAge: 10, maxAge: 18, cost: 0,  effect: (p) => { p.m += 6; p.s += 3; p.addFlag('school_band');   }, outcome: 'You learn that music is also listening.',
      prose: (G) => G.age < 13 ? 'The music is simple. The listening is not.' : 'You learn that music is mostly listening.' },
    { id: 'coding_club',   name: 'Coding Club',     desc: 'Build projects and learn to code.',  minAge: 12, maxAge: 18, cost: 0,  effect: (p) => { p.e += 5; p.m += 3; p.addFlag('coding_club');   }, outcome: 'A different kind of problem-solving.', minYear: 1995,
      prose: (G) => G.age < 14 ? 'You build something small that does exactly what you told it to do. This is extraordinary.' : 'A different kind of problem-solving. You build things, break them, and build them again.' },
    { id: 'volunteer_school', name: 'Volunteer',   desc: 'Give back to your community.',        minAge: 12, maxAge: 18, cost: 0,  effect: (p) => { p.karma += 8; p.m += 3; p.s += 2; },            outcome: 'Something shifts in how you see the world.',
      prose: (G) => G.age < 14 ? 'You give an afternoon. The gratitude is uncomfortable and you go back anyway.' : 'Something shifts in how you see the world when you are useful to it.' },
  ],

  appearance: [
    {
      id: 'get_tattoo',
      name: 'Get a tattoo',
      description: null,
      minAge: 18,
      maxAge: null,
      cost: 200,
      effect: (p) => { p.lo += 2; p.s += 3; p.addFlag('tattooed'); },
      condition: null,
      outcome: 'Permanent. That was the point.',
      prose: (G) => {
        if (G.age < 22) return 'It is permanent. That was the point. You did not think this through completely, and that is also the point.'
        if (G.age > 40) return 'People ask what it means. You tell them.'
        return 'Permanent. That was the point.'
      },
    },
    {
      id: 'get_piercing',
      name: 'Get a piercing',
      description: null,
      minAge: 14,
      maxAge: null,
      cost: 60,
      effect: (p) => { p.s += 2; p.addFlag('pierced'); },
      condition: null,
      outcome: 'A small declaration.',
      prose: (G) => {
        if (G.age < 18) return 'Your parents will notice. You knew this when you decided.'
        return 'A small declaration. The body is yours.'
      },
    },
    {
      id: 'hair_dye',
      name: 'Dye your hair',
      description: null,
      minAge: 14,
      maxAge: null,
      cost: 80,
      effect: (p) => { p.m += 3; p.s += 2; },
      condition: null,
      outcome: 'A different face in the mirror.',
      prose: (G) => {
        if (G.age < 18) return 'A different face in the mirror. You needed one.'
        if (G.age > 40) return 'A different face in the mirror. You wanted one.'
        return 'A different face in the mirror.'
      },
    },
    {
      id: 'personal_stylist',
      name: 'Hire a personal stylist',
      description: null,
      minAge: 20,
      maxAge: null,
      cost: 500,
      effect: (p) => { p.lo += 5; p.s += 4; p.m += 4; },
      condition: (G) => G.stats.wealth > 40,
      outcome: 'Confidence is partly costume.',
      prose: (G) => 'Confidence is partly costume. This is not a cynical observation.',
    },
  ],
}

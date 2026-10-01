// events_japan_depth.js
// Japan depth arc: Okinawa battle 1945, occupation/Article 9, Korean War boom,
// karoshi/overwork, women's career ceiling, Kobe earthquake 1995,
// lost generation / employment ice age, comfort women silence,
// rural depopulation, Article 9 rearmament debate.
// Complements events_japan.js.

// The fields where the salaryman contract in `jpn_karoshi` is the actual shape of
// the job: a section, a floor that stays lit, a last train home.
const SALARIED_FIELDS = [
  'finance', 'technology', 'IT', 'engineering', 'law', 'media', 'government',
  'architecture', 'manufacturing', 'science', 'real_estate',
]

export const JAPAN_DEPTH_EVENTS = [

  {
    id: 'jpn_okinawa_battle_1945',
    phase: null,
    weight: 5,
    // Okinawan, and nobody else: this told a farmer in Tohoku that his village
    // had been given grenades. It needs the Okinawa place (`jp_okinawa`).
    when: (G) =>
      G.character.country.name === 'Japan' &&
      (G.birthPlace?.id === 'jp_okinawa' || G.place?.id === 'jp_okinawa') &&
      G.currentYear >= 1945 && G.currentYear <= 1948 &&
      G.age >= 14 &&
      !G.mem?.jpnOkinawa45 &&
      !G.flags.has('jpn_hibakusha_survivor'),
    text: 'Eighty-two days. The Americans call it the typhoon of steel. Before it reached the village the soldiers handed out grenades, two to a family: one for the enemy, one for yourselves. Whole families in the caves, a grenade and then the next grenade. At Mabuni people walked off the cliffs holding hands.',
    context: 'The Battle of Okinawa (April-June 1945) killed about 94,000 Okinawan civilians, roughly a quarter to a third of the island\'s population. Imperial Army units distributed grenades and ordered or pressed civilians into mass suicide (shūdan jiketsu) rather than surrender.',
    choices: [
      {
        text: 'Your family survived but others in the village did not. You do not say the word "suicide order" in front of your children.',
        tag: 'okinawa_battle_generation',
        outcome: 'What you don\'t say forms its own shape in the air. Your children will learn it differently — from the textbooks that mention the civilian deaths without mentioning the orders.',
        effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('okinawa_battle_generation'); p.setMem('jpnOkinawa45', true); },
      },
      {
        text: 'Your family fled to the north before the battle reached you.',
        tag: 'okinawa_battle_generation',
        outcome: 'The north. The caves in the north, and then the surrender, and then the Americans who were not what the government had said they were going to be.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('okinawa_battle_generation'); p.setMem('jpnOkinawa45', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_occupation_constitution',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1946 && G.currentYear <= 1952 &&
      G.age >= 18 &&
      !G.mem?.jpnOccConst,
    text: 'The new constitution comes into force in May 1947, much of it drafted by MacArthur\'s staff in nine days, and Article 9 renounces war forever, not only aggression but war itself. Earlier that year the emperor told the country he was not divine, without quite using the word, and everyone understood. He is a symbol now. The country that comes out of this, pacifist by its own constitution and protected by America, is not like any country that existed before.',
    choices: [
      {
        text: 'The constitution is a defeat turned into something. You hold it carefully.',
        tag: 'jpn_article9_generation',
        outcome: 'What you hold carefully becomes what your children are taught. The teaching and the holding are not quite the same thing.',
        effect: (p) => { p.r += 5; p.e += 5; p.addFlag('jpn_article9_generation'); p.setMem('jpnOccConst', true); },
      },
      {
        text: 'The Americans wrote it and the Americans should not decide what Japan can and cannot do.',
        tag: null,
        outcome: 'You keep this opinion. In 1955, 1960, and every decade after, someone argues for revising Article 9. The argument repeats. The article remains.',
        effect: (p) => { p.r += 4; p.setMem('jpnOccConst', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_karoshi',
    phase: null,
    weight: 3,
    // `G.career.field` alone let this fire for a Novelist: the last train, the
    // section and the lit floor are a salaried office (or a plant), not a desk
    // at home with a manuscript on it.
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1987 && G.currentYear <= 2010 &&
      G.career && SALARIED_FIELDS.includes(G.career.field) &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.jpnKaroshi,
    // The forty-five hours is a Ministry of Labour notification of 1998, in force
    // from 1999, and it was guidance with nothing behind it; the cap that can be
    // prosecuted is the 2018 reform, in force from 2019. Before 1999 the only
    // number that existed was the one in the firm's own Article 36 agreement.
    text: (G) => {
      const ceiling = G.currentYear >= 1999
        ? 'The ministry has put out a figure — forty-five overtime hours a month — and it is a notification rather than a law, which everyone understands to mean that nothing happens.'
        : 'There is a figure in the agreement the company files with the workers\' side every year, and nobody in this section has been under it since you arrived.'
      return 'The last train is at 12:04 and you know which carriage puts you nearest the stairs at your station. At ten the floor is still fully lit and there is a politeness at that hour that exists at no other. Your thinking after nine is worse and you produce more of it. ' + ceiling + ' The other word is on the news, and it is a word for people who die.'
    },
    context: 'Japan\'s Labour Ministry formally recognised karoshi — death from overwork, usually by stroke or heart attack — as a compensable category in 1987, and the first karoshi hotline opened the following year. Overtime itself was governed by the Article 36 labour-management agreement, which carried no statutory ceiling; a 1998 ministry notification set 45 hours a month and 360 a year as a limit standard from 1999, with no penalty attached. Caps that could actually be prosecuted arrived only with the work-style reform legislation of 2018, in force from April 2019. Government surveys through the 2010s found roughly a fifth of firms with employees exceeding 80 overtime hours a month.',
    choices: [
      {
        text: 'You manage it. The hours are part of the contract that isn\'t written anywhere.',
        tag: 'jpn_overwork_generation',
        outcome: 'You manage it for years. The body keeps a different account.',
        effect: (p) => { p.h -= 8; p.m -= 5; p.r += 4; p.addFlag('jpn_overwork_generation'); p.setMem('jpnKaroshi', true); },
      },
      {
        text: 'You leave the company. The exit is understood as a kind of failure.',
        tag: null,
        outcome: 'The exit is understood as a kind of failure by the people who stay. They are still there at 10 p.m.',
        effect: (p) => { p.m -= 3; p.r += 3; p.karma += 5; p.setMem('jpnKaroshi', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_kobe_earthquake_1995',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1995 && G.currentYear <= 1996 &&
      G.age >= 10 &&
      !G.mem?.jpnKobe95,
    // 5:46 a.m., 17 January 1995. Written in the present tense against a
    // two-year window, it printed the morning itself into 1996; the year after
    // is a different room and gets its own sentences.
    text: (G) => G.currentYear === 1995
      ? 'It is quarter to six in the morning and the room moves in a way rooms are not supposed to move. On the television the elevated expressway is lying on its side with the road surface vertical. The wooden houses that came through the war burn all morning because the mains have gone and there is nothing to put on them. Within two days there are ordinary people driving vans of water down from Osaka, because they got there before anybody official did.'
      : 'In January they run the footage again: the expressway on its side, the road surface vertical, the smoke over Nagata going up all morning. A year on, the prefabricated housing is still standing in rows on what used to be a playing field, and the people in it are mostly old. What gets said about that morning now is the vans of water that came down from Osaka on the second day, driven by people nobody had asked.',
    context: 'The Great Hanshin earthquake struck at 5:46 a.m. on 17 January 1995 with a magnitude of 6.9 and its epicentre near Awaji Island. 6,434 people died, most in the collapse of older wooden housing, and post-quake fires spread unchecked because water mains had ruptured. The slow official response and the improvised civilian relief effort that filled the gap gave 1995 its name in Japan as the first year of the volunteer era.',
    choices: [
      {
        text: 'You were in Kobe or nearby. You were in the moving room.',
        tag: 'jpn_kobe_generation',
        outcome: 'The texture of what came after: the temporary housing, the smell of burning that stayed, the way the neighbourhood looked. You rebuild the neighbourhood differently in memory each time you think of it.',
        effect: (p) => { p.m -= 15; p.r += 8; p.h -= 5; p.addFlag('jpn_kobe_generation'); p.setMem('jpnKobe95', true); },
      },
      {
        text: 'You watched it from Tokyo or Osaka. You went to volunteer in the weeks after.',
        tag: 'jpn_kobe_generation',
        outcome: 'The volunteer movement was one of the things that came out of it: the citizen response that moved faster than the government. You were part of it briefly. Then you came home.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('jpn_kobe_generation'); p.setMem('jpnKobe95', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_lost_generation',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1993 && G.currentYear <= 2007 &&
      G.age >= 18 && G.age <= 32 &&
      !G.mem?.jpnLostGen,
    text: 'The bubble burst and the companies stopped hiring graduates, and the door your older brothers and sisters went through, a job for life and a salary that rose every year, closed and did not reopen the same way. You graduate into part-time work, temp agencies, dispatch. The word for you is freeter. You are working, and the work does not lead anywhere. Some of your classmates found the one door open that year. Some did not.',
    choices: [
      {
        text: 'You find something — not the career track but something sustainable.',
        tag: 'jpn_lost_generation',
        outcome: 'The something sustainable becomes the life. It is not the life the system had promised you. The promised life was probably not real anyway.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('jpn_lost_generation'); p.setMem('jpnLostGen', true); },
      },
      {
        text: 'You live with your parents. The decision is pragmatic and carries a weight.',
        tag: 'jpn_lost_generation',
        outcome: 'The weight has a name in the press: "parasite singles." The press name is not accurate and is not kind. The economic analysis is more complicated.',
        effect: (p) => { p.m -= 10; p.r += 4; p.addFlag('jpn_lost_generation'); p.setMem('jpnLostGen', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_comfort_women_silence',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1982 && G.currentYear <= 2010 &&
      G.age >= 13 && G.age <= 22 &&
      !G.mem?.jpnCWsilence,
    text: 'The history textbook does not mention "comfort women." The phrase does not appear in the curriculum. What it says about the war is: Japan was at war in Asia from 1931 to 1945; the war caused great suffering; Japan was defeated. The Japanese teachers\' union disputes some parts of the approved curriculum. A few teachers teach outside the textbook. You learn about the comfort women system — the coerced sexual slavery of women across Japanese-occupied Asia — from a Korean classmate, or from a foreign documentary, or from an editorial, or you don\'t learn about it in school at all and learn about it much later. The silence is not uniform and it is not accidental.',
    choices: [
      {
        text: 'You seek out the history that the textbook leaves out.',
        tag: 'jpn_confronted_history',
        outcome: 'What you find is not simple to hold alongside your existing understanding of your country. You hold it anyway.',
        effect: (p) => { p.e += 5; p.r += 5; p.karma += 5; p.addFlag('jpn_confronted_history'); p.setMem('jpnCWsilence', true); },
      },
      {
        text: 'The textbook is the curriculum. Other countries\' textbooks also leave things out.',
        tag: null,
        outcome: 'Other countries\' textbooks also leave things out. This is true. You notice it comes to mind when the subject is raised.',
        effect: (p) => { p.r += 3; p.setMem('jpnCWsilence', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_rural_village',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2000 &&
      G.age >= 35 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.jpnRuralVillage,
    text: 'The village population is listed at 847 in the 2010 census and at 612 in 2020 and the elementary school closed in 2018 when the last child was enrolled. The post office has reduced hours. The agricultural cooperative that handled the rice sale stopped operating in 2016. What remains: the elderly, mostly, and some who chose to return or stay, and the land, which is still productive in places and going to forest in others. The municipal government offers subsidies to people who will move here. Some city people come. The city people and the remaining village people regard each other with the careful interest of people who have chosen entirely different configurations of the same country.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.addFlag('jpn_rural_decline_witness')
      p.setMem('jpnRuralVillage', true)
    },
  },

  {
    id: 'jpn_article9_debate_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2013 &&
      G.age >= 35 &&
      !G.mem?.jpnArt9Late,
    text: '2015, and the government reinterprets Article 9 so that the Self-Defense Forces may fight beside allies even when Japan is not attacked, without changing a word of it. Most constitutional scholars say it cannot be done. The protests outside the Diet are the largest in decades, and most people in the polls are against it, and it passes. The text of the constitution has not changed. Its meaning has.',
    choices: [
      {
        text: 'You were in the protest outside the Diet. The pacifist identity was not abstract.',
        tag: 'jpn_article9_defender',
        outcome: 'The 100,000 outside. The vote passing anyway. The feeling of having been counted and not having been the majority.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.r += 4; p.addFlag('jpn_article9_defender'); p.setMem('jpnArt9Late', true); },
      },
      {
        text: 'The regional security environment has changed. Japan needs to be able to defend its allies.',
        tag: null,
        outcome: 'The argument is strategic and you hold it as a strategic argument. The emotional relationship to Article 9 — the thing that was made from the ashes — is a different conversation.',
        effect: (p) => { p.r += 3; p.setMem('jpnArt9Late', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_women_ceiling',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1980 && G.currentYear <= 2015 &&
      G.age >= 22 && G.age <= 35 &&
      G.career &&
      !G.mem?.jpnWomenCeil,
    text: 'The equal opportunity law passes in 1986, with no penalties. At your company there are now two tracks, one that leads to management and one that does not, and it is understood which one women take, and that they leave when they marry. Your supervisor says the clients are more comfortable with men. You know of exactly three women at the company in middle management. They are pointed to as proof that it can be done.',
    choices: [
      {
        text: 'You push into the general track. The cost is continuous and specific.',
        tag: 'jpn_women_career',
        outcome: 'The cost includes the colleagues who do not take the calls you make in meetings, the client who asks to speak with your superior (who is you), and the year you put off marriage because of a project timeline. The project was completed.',
        effect: (p) => { p.m -= 5; p.e += 5; p.s += 3; p.karma += 3; p.addFlag('jpn_women_career'); p.setMem('jpnWomenCeil', true); },
      },
      {
        text: 'You marry, leave, and return part-time when the children are in school.',
        tag: null,
        outcome: 'The part-time return: a different salary, different standing, different work. The pathway that was smoothed for this by the system was smoothed because the system expected it.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('jpnWomenCeil', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'jpn_fukushima_evacuation',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2011 && G.currentYear <= 2016 &&
      G.age >= 18 &&
      !G.flags.has('fukushima_generation') &&
      !G.mem?.jpnFukushimaEvac,
    text: (G) => {
      const inFukushima = G.ruralUrban === 'rural' && G.currentYear >= 2011
      if (inFukushima) {
        return 'March 2011. The NHK announcer\'s voice is calm, and he says to evacuate. You take the documents and the things that cannot be replaced, and you leave the cat because you cannot catch it. Later you are allowed back for two hours at a time, with a dosimeter clipped to your collar. The house is still there. You are not allowed to live in it.'
      }
      return 'March 11, 2011. The Tōhoku earthquake and tsunami, and then the Fukushima Daiichi nuclear accident. Japan has fifty reactors. The debate about nuclear power that was held before March 11 is a different debate from the one that is held after. The evacuation zone becomes the permanent question: how far, how long, what is safe, who decides what is safe. You live elsewhere in Japan and watch a country discover what its energy infrastructure was built on.'
    },
    context: 'The tsunami reached the Fukushima Daiichi plant at 3:37 p.m. on 11 March 2011; backup generators and cooling failed and hydrogen explosions followed from 12 March. The evacuation zone widened from 3 km to 20 km, with a further shelter zone to 30 km.',
    choices: [
      {
        text: 'You are in the evacuation zone. The house is there and you are not allowed in it.',
        tag: 'jpn_fukushima_evacuee',
        outcome: 'The legal category: "evacuation order zone." The house is there. The life you had in the house is on hold indefinitely. The zone is not cleared for years. Some parts are not cleared for more than a decade.',
        effect: (p) => { p.m -= 20; p.r += 10; p.addFlag('jpn_fukushima_evacuee'); p.setMem('jpnFukushimaEvac', true); },
      },
      {
        text: 'You watch from elsewhere and reconsider what you knew about nuclear power.',
        tag: 'fukushima_generation',
        outcome: 'The polls show public opinion shifting significantly on nuclear power after March 11. The government eventually restarts some reactors. The debate continues in a different register now.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 3; p.addFlag('fukushima_generation'); p.setMem('jpnFukushimaEvac', true); },
      },
    ],
    effect: null,
  },

]

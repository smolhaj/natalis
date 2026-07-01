// events_japan_depth.js
// Japan depth arc: Okinawa battle 1945, occupation/Article 9, Korean War boom,
// karoshi/overwork, women's career ceiling, Kobe earthquake 1995,
// lost generation / employment ice age, comfort women silence,
// rural depopulation, Article 9 rearmament debate.
// Complements events_japan.js.

export const JAPAN_DEPTH_EVENTS = [

  {
    id: 'jpn_okinawa_battle_1945',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1945 && G.currentYear <= 1948 &&
      G.age >= 14 &&
      !G.mem?.jpnOkinawa45 &&
      !G.flags.has('jpn_hibakusha_survivor'),
    text: 'The Battle of Okinawa lasted eighty-two days. The Americans called it "the typhoon of steel." Okinawa: the southernmost prefecture, the staging ground for the invasion of the home islands that the government said was coming. The Imperial Army ordered civilians to commit suicide rather than surrender — there were grenades distributed for this purpose. Whole families: a grenade, then the next grenade. The caves. The cliffs at Mabuni. 94,000 Okinawan civilians dead, a third of the civilian population. This is separate from the atomic bombs; this is before the atomic bombs; this is the specific wound that Okinawa carries that is different from what Hiroshima carries.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1946 && G.currentYear <= 1952 &&
      G.age >= 18 &&
      !G.mem?.jpnOccConst,
    text: 'The new constitution is promulgated in November 1946, effective May 1947. Article 9: Japan renounces war forever. Not the right to self-defense but war itself, as an instrument of policy. MacArthur\'s government wrote much of it in nine days, working from American models and Japanese drafts. The Meiji constitution is dissolved. The emperor is not divine; he is a symbol. The emperor himself announces this on January 1, 1946, in a statement that does not use the word "divine" but everyone understands. The country that emerges from this — pacifist, constitutionally so, American-protected — is not any country that has existed before.',
    choices: [
      {
        text: 'The constitution is a defeat turned into something. You hold it carefully.',
        tag: 'jpn_article9_generation',
        outcome: 'What you hold carefully becomes what your children are taught. The teaching and the holding are not quite the same thing, but both are real.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.career && G.career.field &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.jpnKaroshi,
    text: `Karoshi: death from overwork. The Japanese Labour Ministry officially recognises the category in 1987 after several high-profile deaths — an executive at a major company dies at twenty-three after six months of eighty-hour weeks; a bus driver dies of a stroke after having taken one day off in the previous year. The cases accumulate. The law sets a maximum of forty-five overtime hours per month. The actual average in your office or on your shift is different from the legal maximum. You know what seventy hours a week feels like in the body — the specific stupidity that comes from not sleeping, the quality of your thinking at 10 p.m. in an office that is still fully lit, the strange community of the people still there at 10 p.m. Nobody says the word "karoshi" about your situation. The word is for people who die.`,
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
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1995 && G.currentYear <= 1996 &&
      G.age >= 10 &&
      !G.mem?.jpnKobe95,
    text: 'January 17, 1995. 5:46 a.m. The Great Hanshin earthquake: 6.9 magnitude, epicentre in Awaji Island. Kobe. The elevated highway on its side. The wooden houses that had survived the war burning in the morning because the pipes broke and the fire spread block by block with no water to stop it. 6,434 dead. You remember where you were at 5:46 in the morning — in bed, or on the floor of a room that moved, or somewhere else in Japan watching the television show the helicopter footage of the expressway lying on its side. In the days after, ordinary citizens drove trucks of supplies and organised relief because the government moved slowly. The volunteer culture that emerged was called something new.',
    choices: [
      {
        text: 'You were in Kobe or nearby. You were in the moving room.',
        tag: 'jpn_kobe_generation',
        outcome: 'The specific texture of what came after: the temporary housing, the smell of burning that stayed, the way the neighbourhood looked. You rebuild the neighbourhood differently in memory each time you think of it.',
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
    text: 'The employment ice age: 1993–2005. The bubble collapsed and the companies stopped hiring new graduates. The system that your older siblings entered — company loyalty, lifetime employment, the seniority-based salary that grew every year — closed around 1993 and did not reopen the same way. You graduate into part-time work, dispatch work, work through a temp agency. The term is freeter, from the German "frei" and the English "arbeiter." You are not unemployed — you are working. The work does not lead anywhere. The companies that would have hired you in 1989 are not hiring you in 1998. Some of your classmates found the one door that was open that year. Some did not.',
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
    phase: 'adolescence',
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
        outcome: 'Other countries\' textbooks also leave things out. This is true. You notice it comes to mind when the specific subject is raised.',
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
    text: 'The Abe government\'s 2015 reinterpretation of Article 9: Japan\'s "collective self-defense" is now permitted, meaning the Self-Defense Forces can fight alongside allies even if Japan itself is not attacked. This requires reinterpreting the constitution without amending it. The legal scholars say it is constitutionally impossible. The Supreme Court has not yet tested it. The protests outside the Diet are the largest in decades — 100,000 at their peak. Polls show a majority opposing the change. The change passes. The constitution remains unchanged in text; its meaning has been changed by interpretation.',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1980 && G.currentYear <= 2015 &&
      G.age >= 22 && G.age <= 35 &&
      G.career &&
      !G.mem?.jpnWomenCeil,
    text: 'The Equal Employment Opportunity Law passes in 1986. It has no penalties for violation. You enter the workforce at a company that now officially cannot discriminate by gender. The practice: the "general track" which leads to management, and the "clerical track" which does not, and the understanding that women are expected to choose the clerical track or to leave when they marry. Your supervisor tells you that clients are more comfortable with male representatives. The policy is gender-neutral. The practice is not. You are aware of exactly three women at your company who have reached middle management. They are pointed to as evidence that it is possible.',
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
    phase: 'midlife',
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
        return 'March 11, 2011. The tsunami arrives at Fukushima Daiichi at 3:37 p.m. The backup generators fail. The cooling fails. By March 12 the first hydrogen explosion. The evacuation zone: first 3 km, then 10 km, then 20 km, then 30 km. You have a house in the 20 km zone. The NHK announcer\'s voice is calm. He says to evacuate. You take the documents. You take the things that cannot be replaced. You leave the cat because you cannot catch it. The zone is closed. You are not allowed to return for more than two hours at a time, with dosimeters, to collect belongings. The house is still there. You are not allowed to live in it.'
      }
      return 'March 11, 2011. The Tōhoku earthquake and tsunami, and then the Fukushima Daiichi nuclear accident. Japan has fifty reactors. The debate about nuclear power that was held before March 11 is a different debate from the one that is held after. The evacuation zone becomes the permanent question: how far, how long, what is safe, who decides what is safe. You live elsewhere in Japan and watch a country discover what its energy infrastructure was built on.'
    },
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

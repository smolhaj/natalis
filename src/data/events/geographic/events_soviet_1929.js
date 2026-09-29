// events_soviet_1929.js — the Soviet quarter-century from the great turn to the funeral.
//
// A Russian born in 1915 and played through 1929 to 1945 met, across eleven
// lives and a hundred and eighty-seven life-years, eleven world-event lines and
// no Soviet event at all: a stray dog, a first bank account, a party with drugs
// on offer in Siberia in 1932, and then "died in conflict" at twenty-nine with
// nothing before it to say which conflict. The roster carries fifteen Soviet
// republics and the world-event table had nothing for the Soviet 1930s or for
// the war that killed twenty-seven million of their people; the Terror existed
// for Russians aged five to twenty and nobody else.
//
// So this is 1929 to 1956, for every republic that was inside the Union in the
// year in question: the kolkhoz meeting, the cow, the word kulak; the famine,
// which was the Kazakh steppe and the Volga and the Kuban as well as Ukraine
// (Ukraine has its own world event and is left to it); the night arrests; the
// broadcast at noon on the twenty-second of June; the factories on flatcars;
// the triangle letters and the notice that is not a triangle; Leningrad's 125
// grams; the villages in Belarus; the peoples put on trains; Tashkent taking in
// other people's children; the ninth of May; the funeral crush; Tbilisi 1956.
//
// Dates used, all checked. Stalin's "year of the great turn" article, November
// 1929; "liquidation of the kulaks as a class", December 1929; "Dizzy with
// Success", 2 March 1930, after which people left the kolkhozes and were
// brought back. Roughly 1.8 million people deported as kulaks to special
// settlements in 1930-31. The law of 7 August 1932 on theft of socialist
// property ("the law of the five ears"). Internal passports from December 1932,
// withheld from collective farmers until 1974. The Kazakh famine of 1930-33
// killed about 1.5 million people, some 38% of Kazakhs. NKVD Order 00447, July
// 1937; about 750,000 executed in 1937-38; "ten years without the right of
// correspondence" was the phrase given to families of the shot. 22 June 1941,
// Molotov on the radio at noon: "Our cause is just. The enemy will be defeated.
// Victory will be ours." Stalin's broadcast of 3 July begins "Comrades,
// citizens, brothers and sisters". The blockade of Leningrad, 8 September 1941
// to 27 January 1944; the ration for dependants fell to 125 grams in November
// 1941; the ice road over Ladoga. Khatyn, 22 March 1943, one of more than six
// hundred Belarusian villages burned with their people. Volga Germans deported
// from 28 August 1941; Chechens and Ingush from 23 February 1944; Crimean
// Tatars from 18 May 1944. Levitan reads the surrender after midnight, Moscow
// time, on 9 May 1945. Rationing ends December 1947. Stalin dies 5 March 1953
// and people are crushed to death in the crowds around Trubnaya Square. The
// Secret Speech is 25 February 1956; in Tbilisi that March the crowds defending
// his memory are fired on, on the ninth.

import { wasSovietRepublic } from '../../history.js'

const LIVE = (G) => (G.currentCountry?.name ?? G.character?.country?.name)
const once = (G, key) => !G.mem?.[key]
const LATE_JOINERS = new Set(['Lithuania', 'Latvia', 'Estonia', 'Moldova'])
// Inside the Union in this year. The Baltic states and Bessarabia were annexed
// in 1940, and had their own 1930s.
const IN_USSR = (G) => wasSovietRepublic(LIVE(G)) && (!LATE_JOINERS.has(LIVE(G)) || G.currentYear >= 1940)
const RURAL = (G) => G.ruralUrban === 'rural'
const IS = (...names) => (G) => names.includes(LIVE(G))
const ETH = (...ids) => (G) => ids.includes(G.character?.ethnicity)
// Occupied, in whole or in part, between 1941 and 1944. Russia's roster places
// (Moscow, Leningrad, Siberia) were not; the Caucasus and Central Asia never.
const OCCUPIED = IS('Ukraine', 'Belarus', 'Lithuania', 'Latvia', 'Estonia', 'Moldova')
const LENINGRAD = (G) => G.place?.id === 'ru_spb'

export const SOVIET_1929_EVENTS = [

  // ── THE GREAT TURN ────────────────────────────────────────────────────────

  {
    id: 'sov_kolkhoz_meeting',
    phase: null,
    weight: 40,
    claimsYears: { from: 1930, to: 1932 },
    when: (G) => IN_USSR(G) && RURAL(G) && G.currentYear >= 1930 && G.currentYear <= 1932 &&
      G.age >= 5 && once(G, 'sovKolkhoz'),
    text: (G) => G.age < 14
      ? 'A man from the district comes and the whole village is made to sit in the school while he talks. The word he keeps using is kolkhoz. Afterwards your father walks the cow to the new yard at the end of the street and comes back without her, and your mother does not speak to him until the next day, and not about the cow.'
      : 'The man from the district talks for three hours and at the end there is a list, and the list is who has signed. The ones who have not signed are written down on a second list. By the spring the horses are in one stable and the ploughs in one shed and nobody can say who the harness belongs to, which is the point.',
    choices: [
      {
        text: 'Sign, and keep your head down.',
        tag: 'yielding',
        outcome: 'Your name is on the right list. You tell yourself that this is what it is for.',
        effect: (p) => { p.setMem('sovKolkhoz', true); p.m -= 6; p.addFlag('sov_collectivised') },
      },
      {
        text: 'Slaughter the animals first. They will not have them.',
        tag: 'defiant',
        outcome: 'The whole village eats meat for a week in a winter it should not have. Half the country\'s livestock goes the same way that year, and the ploughing is done by people.',
        effect: (p) => { p.setMem('sovKolkhoz', true); p.m -= 4; p.h += 2; p.r += 4; p.addFlag('sov_collectivised'); p.addFlag('sov_slaughtered_the_herd') },
      },
    ],
    effect: null,
  },

  {
    id: 'sov_dekulakised',
    phase: null,
    weight: 60,
    when: (G) => IN_USSR(G) && RURAL(G) && G.currentYear >= 1930 && G.currentYear <= 1931 &&
      (G.character?.wealthTier ?? 2) >= 3 && G.age >= 2 && once(G, 'sovDekulak'),
    text: 'Two cows and a tin roof are enough. They come in the afternoon with a paper, and you are given the time it takes to fill a sack. The house is somebody else\'s by evening. The train takes eleven days and stops in a place with no village in it, only a number and a commandant, and the first thing you are all told to build is the barracks you will sleep in.',
    context: 'Between 1930 and 1931 about 1.8 million people labelled kulaks were deported to "special settlements" in the Urals, Siberia, Kazakhstan and the far north. Hundreds of thousands died in the first years. Their children were marked in their documents for decades.',
    choices: null,
    effect: (p) => {
      p.setMem('sovDekulak', true)
      p.m -= 20; p.h -= 10; p.w -= 20; p.r += 8
      p.addFlag('sov_dekulakised'); p.addFlag('displaced')
    },
  },

  {
    id: 'sov_five_ears',
    phase: null,
    weight: 30,
    when: (G) => IN_USSR(G) && RURAL(G) && G.currentYear >= 1932 && G.currentYear <= 1933 &&
      G.age >= 7 && G.age <= 16 && once(G, 'sovFiveEars'),
    text: 'After the harvest the children go into the cut field for the ears that fell, the way children always have. This year there is a law about it. A boy from the next farm is taken to the district for a pocketful, and the watchtower they have built at the edge of the field has a boy your own age in it, with a rifle, whose job is you.',
    choices: [
      {
        text: 'Go anyway, at dusk.',
        tag: 'defiant',
        outcome: 'Your pockets are full and your heart is going the whole way home. Your mother takes the grain without asking where it is from.',
        effect: (p) => { p.setMem('sovFiveEars', true); p.h += 2; p.r += 3; p.addFlag('sov_spikelets') },
      },
      {
        text: 'Stay out of the field.',
        tag: 'yielding',
        outcome: 'You stay home, and eat what there is, which is less.',
        effect: (p) => { p.setMem('sovFiveEars', true); p.h -= 3; p.addFlag('sov_spikelets') },
      },
    ],
    effect: null,
  },

  {
    id: 'sov_famine_steppe',
    phase: null,
    weight: 60,
    claimsYears: { from: 1931, to: 1933 },
    when: (G) => IS('Kazakhstan')(G) && G.currentYear >= 1931 && G.currentYear <= 1933 &&
      G.age >= 3 && once(G, 'sovFamineSteppe'),
    text: (G) => G.character?.ethnicity === 'kazakh'
      ? 'The herds were counted and then they were taken, and a people who lived by moving were told where to stop. There is nothing at the place where you stop. Whole auls start walking — to the towns, to the railway, to China — and the road has people lying by it who were walking yesterday. Your grandmother says the name of each one she knows as you pass, under her breath, so that somebody will have.'
      : 'Kazakh families come into the town from the steppe with nothing, and sit by the station, and are gone in the morning in one way or another. You are told not to look and you look. The bread queue starts before light and some mornings the bread does not come at all.',
    context: 'Forced sedentarisation and the confiscation of livestock caused the Kazakh famine of 1930-33 (Asharshylyq). About 1.5 million people died, roughly 38% of all Kazakhs, and hundreds of thousands fled to China, Mongolia and other republics.',
    choices: null,
    effect: (p) => { p.setMem('sovFamineSteppe', true); p.h -= 14; p.m -= 16; p.r += 6; p.addFlag('famine_survivor'); p.addFlag('sov_famine_1932') },
  },

  {
    id: 'sov_famine_volga',
    phase: null,
    weight: 45,
    claimsYears: { from: 1932, to: 1933 },
    when: (G) => IS('Russia')(G) && RURAL(G) && G.currentYear >= 1932 && G.currentYear <= 1933 &&
      G.age >= 3 && once(G, 'sovFamineVolga'),
    text: 'The quota is met and then it is raised and met again, and what is left in the village is the seed grain, and then it is not. You eat things that you did not know were things. The passports come that winter and the collective farm does not get any, which is how you learn that the road out of the village is closed to you by a sheet of paper.',
    context: 'The famine of 1932-33 struck the Volga, the North Caucasus and western Siberia as well as Ukraine and Kazakhstan. Internal passports were introduced in December 1932 and withheld from collective farmers, who could not legally leave their farms until 1974.',
    choices: null,
    effect: (p) => { p.setMem('sovFamineVolga', true); p.h -= 10; p.m -= 12; p.addFlag('famine_survivor'); p.addFlag('sov_famine_1932') },
  },

  // ── THE NIGHTS ────────────────────────────────────────────────────────────

  {
    id: 'sov_terror_republics',
    phase: null,
    weight: 45,
    claimsYears: { from: 1937, to: 1938 },
    // Russia's teenagers have ru_dep_great_terror; this is everybody else the
    // year reached, including Russian adults.
    when: (G) => IN_USSR(G) && G.currentYear >= 1937 && G.currentYear <= 1938 && G.age >= 8 &&
      once(G, 'ruDepGreatTerror') && once(G, 'sovTerror'),
    text: (G) => G.age >= 21
      ? 'You learn to listen to engines at night. A car in the street after one o\'clock means somebody; a car that stops means somebody near. The man from the second floor who ran the workers\' club is gone, and at the meeting you raise your hand with everyone else to condemn him, and afterwards you go home and burn a photograph with him in it.'
      : 'Your teacher is not at school on Monday and nobody says where she is, and by Thursday her portrait of the poet has come down off the wall and there is a clean square where it was. You learn a new word for somebody who has been taken. The grown-ups use it without looking at each other.',
    context: 'During the Great Terror of 1937-38 roughly 1.5 million people were arrested by the NKVD and about 750,000 of them shot. Every republic had its quotas. Families were often told a relative had been given "ten years without the right of correspondence", which meant he was already dead.',
    choices: null,
    effect: (p) => { p.setMem('sovTerror', true); p.m -= 10; p.r += 6; p.addFlag('learned_silence'); p.addFlag('sov_terror_witness') },
  },

  {
    id: 'sov_terror_household',
    phase: null,
    weight: 30,
    when: (G) => IN_USSR(G) && G.currentYear >= 1937 && G.currentYear <= 1939 && G.age >= 4 && G.age <= 30 &&
      G.flags.includes('sov_terror_witness') && G.parents?.father?.alive && once(G, 'sovTerrorHome'),
    text: 'It is your father, and it is at night, and the men are polite in a way that is worse. They take books and a letter and him. In the morning your mother goes to the prison with a parcel and joins a queue of women with parcels, and when the window refuses a parcel the woman holding it knows, and does not cry until she is in the street.',
    choices: null,
    effect: (p) => {
      p.setMem('sovTerrorHome', true)
      p.m -= 22; p.h -= 4; p.r += 10
      p.killParent('father')
      p.addFlag('sov_terror_household'); p.addFlag('lost_parent_young')
    },
  },

  {
    id: 'sov_deportation_1941',
    phase: null,
    weight: 999,
    when: (G) => IS('Russia')(G) && ETH('german_russian')(G) && G.currentYear === 1941 && G.age >= 1 && once(G, 'sovDeport41'),
    text: 'The decree names a whole people, so there is nothing to argue about and nobody to argue with. You have twenty-four hours. The village on the Volga that your great-grandparents built is empty by the end of the week, and the train goes east for a month, and at the other end a Kazakh family you cannot speak to makes room for you in a house that does not have room.',
    context: 'By a decree of 28 August 1941 the entire Volga German population, about 400,000 people, was deported to Kazakhstan and Siberia. Many of the men were then sent to the labour army. The special-settlement restrictions were lifted in 1955; the return to the Volga was never permitted.',
    choices: null,
    effect: (p) => {
      p.setMem('sovDeport41', true); p.m -= 20; p.h -= 8; p.r += 10
      p.addFlag('sov_deported_people'); p.addFlag('displaced')
    },
  },

  {
    id: 'sov_deportation_1944',
    phase: null,
    weight: 999,
    when: (G) => G.currentYear === 1944 && G.age >= 1 && once(G, 'sovDeport44') &&
      ((IS('Russia')(G) && ETH('chechen')(G)) || (IS('Ukraine')(G) && ETH('crimean_tatar')(G))),
    text: (G) => G.character?.ethnicity === 'chechen'
      ? 'It is Red Army Day and the soldiers who have been billeted in the village for a week, friendly, fixing roofs, call everybody to the square at dawn. There is a paper. There are Studebakers. The snow is deep and the old are carried and some are not. In the cattle wagon somebody\'s grandfather prays the whole way across Kazakhstan and nobody asks him to stop.'
      : 'They come before dawn in May with fifteen minutes. The orchard, the house, the graves, the whole peninsula — fifteen minutes. The train goes east for three weeks with the doors shut, and at the stops the dead are handed out, and your mother holds your face against her so that you look at her and not at the door.',
    context: 'On 23 February 1944 about 500,000 Chechens and Ingush were deported to Central Asia (Operation Lentil); on 18 May 1944 about 190,000 Crimean Tatars. Tens of thousands died in transit and in the first years. Chechens were allowed home in 1957. Crimean Tatars were not until 1989.',
    choices: null,
    effect: (p) => {
      p.setMem('sovDeport44', true); p.m -= 24; p.h -= 10; p.r += 12
      p.addFlag('sov_deported_people'); p.addFlag('displaced'); p.addFlag('war_childhood')
    },
  },

  // ── THE WAR ───────────────────────────────────────────────────────────────

  {
    id: 'sov_june_22',
    phase: null,
    weight: 999,
    when: (G) => IN_USSR(G) && G.currentYear === 1941 && G.age >= 5 && once(G, 'sovJune22'),
    text: 'At noon the loudspeaker on the post in the square says that Molotov will speak, and the square fills while he is still being introduced. His voice is not a voice made for this. Our cause is just. The enemy will be defeated. Victory will be ours. An old woman next to you says the date of the last war as if it were a person\'s name, and goes home to bury the good plates.',
    choices: null,
    effect: (p) => { p.setMem('sovJune22', true); p.m -= 8; p.addFlag('sov_war_generation') },
  },

  {
    id: 'sov_call_up',
    phase: null,
    weight: 80,
    claimsYears: { from: 1941, to: 1943 },
    when: (G) => IN_USSR(G) && G.currentYear >= 1941 && G.currentYear <= 1944 &&
      G.character?.gender === 'male' && G.age >= 18 && G.age <= 45 && !G.inPrison && once(G, 'sovCallUp'),
    text: 'The notice has your name in pencil. You are given a day. At the station the band plays the song everybody knows now, and the women do not look away from the carriage until the carriage is gone, and your mother puts a hard-boiled egg in your pocket and some earth from the yard in a twist of newspaper.',
    choices: [
      {
        text: 'Write home every week, whatever you can say.',
        tag: 'yielding',
        outcome: 'The letters are triangles of paper with no envelope, folded the way the whole army folds them. They get through. Some of them get through after you have moved on.',
        effect: (p) => { p.setMem('sovCallUp', true); p.m -= 10; p.h -= 6; p.addFlag('sov_frontovik'); p.addFlag('served_military') },
      },
      {
        text: 'Say nothing in the letters that could be read twice.',
        tag: 'defiant',
        outcome: 'Everyone knows the censor reads them. The line that gets a man sent to a punishment company is short and nobody is sure where it is.',
        effect: (p) => { p.setMem('sovCallUp', true); p.m -= 10; p.h -= 6; p.addFlag('sov_frontovik'); p.addFlag('served_military'); p.addFlag('learned_silence') },
      },
    ],
    effect: null,
  },

  {
    id: 'sov_evacuation',
    phase: null,
    weight: 60,
    when: (G) => IN_USSR(G) && !RURAL(G) && G.currentYear >= 1941 && G.currentYear <= 1942 &&
      IS('Russia', 'Ukraine', 'Belarus')(G) && !LENINGRAD(G) && G.age >= 3 && once(G, 'sovEvac'),
    text: 'The factory goes east on flatcars, machine by machine, and the people who work the machines go with them in the wagons behind. It takes three weeks. You arrive in the Urals in snow at a place where the workshop walls are not up yet and the lathes are bolted to frozen ground, and they are running before there is a roof, because the front needs what they make by Friday.',
    context: 'In 1941-42 more than 1,500 factories and something like sixteen million people were moved east ahead of the German advance, to the Urals, western Siberia, the Volga and Central Asia. Many never returned.',
    choices: null,
    effect: (p) => { p.setMem('sovEvac', true); p.m -= 10; p.h -= 5; p.addFlag('sov_evacuated'); p.addFlag('war_childhood') },
  },

  {
    id: 'sov_blockade',
    phase: null,
    weight: 999,
    when: (G) => LENINGRAD(G) && G.currentYear >= 1941 && G.currentYear <= 1943 && G.age >= 2 && once(G, 'sovBlockade'),
    text: 'In November the ration for a child is a hundred and twenty-five grams of bread that is partly sawdust. You learn to make it last a whole day by cutting it into squares. The pipes freeze, the trams stop where they are, and people pull the dead to the cemetery on children\'s sledges, and then stop pulling them anywhere. In spring the ice road on the lake takes the weakest of you out, and you are one, and you are not sure you would have gone.',
    context: 'The siege of Leningrad lasted from 8 September 1941 to 27 January 1944, 872 days. Between 800,000 and 1.1 million civilians died, most of them of starvation in the first winter. The "Road of Life" across frozen Lake Ladoga was the city\'s only supply line.',
    choices: null,
    effect: (p) => { p.setMem('sovBlockade', true); p.h -= 18; p.m -= 18; p.r += 6; p.addFlag('sov_blockade_survivor'); p.addFlag('famine_survivor'); p.addFlag('war_childhood') },
  },

  {
    id: 'sov_occupation',
    phase: null,
    weight: 80,
    claimsYears: { from: 1941, to: 1943 },
    when: (G) => OCCUPIED(G) && G.currentYear >= 1941 && G.currentYear <= 1943 && G.age >= 3 && once(G, 'sovOccupation'),
    text: (G) => IS('Belarus')(G)
      ? 'The Germans come through in July and the partisans are in the forest by the winter, and the village is between them. In the spring a village two rivers away is burned with its people inside the barn, and after that when a column comes down the road your grandmother takes the youngest into the rye without a word. The road is the most dangerous thing in the world.'
      : 'The Germans arrive in trucks and the first week is quiet, which nobody trusts. Then the notices go up — the curfew, the list of things punishable by death, the call for young people to register for work in Germany. The Jewish families on the next street are marched out of town one morning and the town is told nothing and knows everything.',
    context: 'Most of Ukraine, Belarus and the Baltic states were under German occupation from 1941 to 1944. Belarus lost around a quarter of its population. More than 600 Belarusian villages, Khatyn the best known, were burned with their inhabitants in anti-partisan operations. Almost the entire Jewish population of the occupied territories was murdered.',
    choices: null,
    effect: (p) => { p.setMem('sovOccupation', true); p.m -= 16; p.h -= 8; p.r += 6; p.addFlag('sov_occupation_survivor'); p.addFlag('war_childhood') },
  },

  {
    id: 'sov_home_front',
    phase: null,
    weight: 50,
    when: (G) => IN_USSR(G) && !OCCUPIED(G) && G.currentYear >= 1942 && G.currentYear <= 1944 &&
      G.age >= 12 && !(G.character?.gender === 'male' && G.age >= 18 && G.age <= 45) && once(G, 'sovHomeFront'),
    text: (G) => G.age < 16
      ? 'You are fourteen and you work the twelve-hour shift at the lathe standing on a crate, because you are not tall enough for the lathe. The ration card is the most valuable thing you own. You carry it inside your clothes and check it with your hand the way people cross themselves.'
      : 'Everything is for the front. The women plough, the old men drive the tractors that are left, and the children glean the fields the way their grandmothers did. You go a year without a day off and do not notice until somebody mentions a Sunday, and you have to think what the word means.',
    choices: null,
    effect: (p) => { p.setMem('sovHomeFront', true); p.h -= 6; p.m -= 6; p.e += 2; p.addFlag('sov_home_front') },
  },

  {
    id: 'sov_pokhoronka',
    phase: null,
    weight: 70,
    // Twenty-seven million dead. A father of fifty or under in 1942 was
    // likelier than not to be in uniform, and a great many did not come back;
    // when this fires, he is dead in the state as well as in the letter.
    when: (G) => IN_USSR(G) && G.currentYear >= 1942 && G.currentYear <= 1945 && G.age >= 2 && G.age <= 30 &&
      G.parents?.father?.alive && (G.parents.father.age ?? 99) <= 50 && Math.random() < 0.45 && once(G, 'sovPokhoronka'),
    text: 'The letters from the front are triangles, folded without an envelope, and this one is not a triangle. It is a printed form with the name filled in by hand. Your mother reads it standing up in the doorway, and then she folds it very small, and she does not unfold it again in your presence for the rest of her life.',
    choices: null,
    effect: (p) => {
      p.setMem('sovPokhoronka', true)
      p.m -= 22; p.r += 6
      p.killParent('father')
      p.addFlag('sov_father_killed_war'); p.addFlag('lost_parent_young')
    },
  },

  {
    id: 'sov_tashkent_took_in',
    phase: null,
    weight: 60,
    when: (G) => IS('Uzbekistan', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan')(G) &&
      G.currentYear >= 1941 && G.currentYear <= 1943 && G.age >= 4 && once(G, 'sovTookIn'),
    text: 'The trains from the west unload people onto the platform who have lost everything in a language you only half understand, and there are children among them with labels round their necks and no one to meet them. Your family takes two. There is no discussion about it; your mother simply comes home with them, and the bread is cut into more pieces, and the two new names are said at the table as though they have always been said there.',
    context: 'Central Asia received hundreds of thousands of evacuees and orphans during the war. Tashkent was called "the city of bread". The Tashkent blacksmith Shaakhmed Shamakhmudov and his wife Bahri took in fourteen orphans of different nationalities.',
    choices: null,
    effect: (p) => { p.setMem('sovTookIn', true); p.m += 4; p.karma += 8; p.addFlag('sov_took_in_evacuees') },
  },

  {
    id: 'sov_victory',
    phase: null,
    weight: 999,
    when: (G) => IN_USSR(G) && G.currentYear === 1945 && G.age >= 4 && once(G, 'sovVictory'),
    text: 'Levitan reads it after midnight, and by two in the morning the whole street is out in its nightclothes. Strangers kiss you. A man with one leg is carried round the square on shoulders and is weeping, and so is everyone carrying him. Then, in the days after, the thing that nobody says: counting who is not coming back, house by house, and every house has somebody.',
    choices: null,
    effect: (p) => { p.setMem('sovVictory', true); p.m += 14; p.addFlag('sov_victory_1945') },
  },

  // ── AFTER ─────────────────────────────────────────────────────────────────

  {
    id: 'sov_stalin_funeral',
    phase: null,
    weight: 999,
    when: (G) => IN_USSR(G) && G.currentYear === 1953 && G.age >= 8 && once(G, 'sovStalinDead'),
    text: (G) => LIVE(G) === 'Russia' && G.place?.id === 'ru_moscow'
      ? 'The whole city walks toward the Hall of Columns and the streets are too narrow for it. At Trubnaya the crowd is pressed against the trucks the army has put across the road and people are killed standing up. You get out through a doorway with one shoe. At home you find that you have been crying for hours, and you could not have said about what.'
      : 'The radio plays nothing but slow music for a day, and then says it. Women weep in the queue for bread. Your grandfather, whose brother went in 1937 and did not come back, says nothing at all, and goes out to the shed, and when he comes in you see that he has shaved.',
    choices: null,
    effect: (p) => { p.setMem('sovStalinDead', true); p.addFlag('sov_stalin_death') },
  },

  {
    id: 'sov_tbilisi_1956',
    phase: null,
    weight: 999,
    when: (G) => IS('Georgia')(G) && G.currentYear === 1956 && G.age >= 12 && once(G, 'sovTbilisi56'),
    text: 'In Moscow they have read out a speech saying he was a criminal, and he was ours. That is the whole of it, in the square in March: that the man was from here, whatever else he was. By the ninth the students have filled the embankment and the soldiers fire on them from the Communications building. Nobody will say how many. The next year the flowers at the monument are fewer, and they are still there.',
    context: 'After Khrushchev\'s Secret Speech denouncing Stalin in February 1956, demonstrations in Tbilisi on the anniversary of Stalin\'s death became protests about Georgian national dignity. On 9 March Soviet troops opened fire; estimates of the dead range from about twenty to over a hundred.',
    choices: null,
    effect: (p) => { p.setMem('sovTbilisi56', true); p.m -= 10; p.r += 4; p.addFlag('geo_tbilisi_1956') },
  },
]

// Written before the events above, per CLAUDE.md's first principle. Each is the
// echo of one flag, at the distance where the echo actually arrives.
export const SOVIET_1929_FOLLOWTHROUGH = [

  {
    id: 'sov_ft_rehabilitated',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('sov_terror_household') && G.currentYear >= 1956 && G.currentYear <= 1962 && once(G, 'sovFtRehab'),
    text: 'A letter from the military collegium of the Supreme Court: your father has been rehabilitated, posthumously, for lack of the elements of a crime. It gives a date of death that is not the date. It gives a cause that is not the cause. It is a half-sheet of paper and you keep it in the drawer with his watch, and it is the only thing anybody has ever given you that admits he existed.',
    choices: null,
    effect: (p) => { p.setMem('sovFtRehab', true); p.m += 4; p.r += 4; p.addFlag('sov_rehabilitation_letter') },
  },

  {
    id: 'sov_ft_kulak_file',
    phase: null,
    weight: 55,
    when: (G) => G.flags.includes('sov_dekulakised') && G.currentYear >= 1991 && G.currentYear <= 1996 && once(G, 'sovFtKulak'),
    text: 'The law on the rehabilitation of the repressed has a form, and the form asks for dates, and you have them, because you have had them in your head for sixty years. The archive answers in eight months. The file on your family is four pages. One page is the inventory: two cows, a tin roof, a sewing machine. You had forgotten the sewing machine.',
    choices: null,
    effect: (p) => { p.setMem('sovFtKulak', true); p.m += 3; p.r -= 2; p.addFlag('sov_kulak_file_read') },
  },

  {
    id: 'sov_ft_passport_1974',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('sov_collectivised') && IN_USSR(G) && G.currentYear >= 1974 && G.currentYear <= 1981 && G.age >= 45 && once(G, 'sovFtPassport'),
    text: 'The collective farmers are to be given passports, like everyone else. You are nearly fifty. You go to the district office in a clean shirt and stand in a line of men and women your age holding their birth certificates, and when the book is handed to you, you open it on the street and read your own name in it, and nobody in the line laughs at you for that, because they are doing it too.',
    choices: null,
    effect: (p) => { p.setMem('sovFtPassport', true); p.m += 6; p.addFlag('sov_kolkhoz_passport') },
  },

  {
    id: 'sov_ft_victory_day',
    phase: null,
    weight: 55,
    when: (G) => G.flags.includes('sov_frontovik') && G.currentYear >= 1965 && G.age >= 40 && once(G, 'sovFtMay9'),
    text: 'They have made the ninth of May a holiday again, twenty years on. You put on the jacket with the medals and it is heavier than you remember. On the boulevard children give you tulips, carnations, whatever there is, and a boy asks what the red star is for, and you tell him a true thing that is not the thing, and he is satisfied, and you go and sit with the others on the bench and nobody talks about the war at all.',
    choices: null,
    effect: (p) => { p.setMem('sovFtMay9', true); p.m += 6; p.addFlag('sov_veteran') },
  },

  {
    id: 'sov_ft_return_home',
    phase: null,
    weight: 70,
    when: (G) => G.flags.includes('sov_deported_people') &&
      ((G.character?.ethnicity === 'chechen' && G.currentYear >= 1957 && G.currentYear <= 1959) ||
       (G.character?.ethnicity === 'crimean_tatar' && G.currentYear >= 1989 && G.currentYear <= 1992)) &&
      once(G, 'sovFtReturn'),
    text: (G) => G.character?.ethnicity === 'chechen'
      ? 'Thirteen years. The decree that lets you go home is shorter than the one that sent you. There is somebody else in the house — a family from somewhere else, who were also sent here, in their way — and the graveyard has been ploughed, and the headstones are in the foundations of a cowshed. You find your grandfather\'s by the lettering, and you do not take it out, because the cowshed would fall.'
      : 'Forty-five years. You go back an old woman to a peninsula of other people\'s houses, and are told the land is not available, and put up a shelter on a hillside with other families who are also back, and the police knock it down, and you put it up again. Your grandchildren speak Russian. At night you tell them the name of the village, which is not on any sign.',
    choices: null,
    effect: (p) => { p.setMem('sovFtReturn', true); p.m += 4; p.r += 4; p.addFlag('sov_returned_home') },
  },
]

// Flags whose echo is a line in a year rather than a scene. See yearTexture.js,
// "Soviet 1929-1956".
export const SOVIET_1929_TEXTURE_FLAGS = [
  'sov_collectivised', 'sov_famine_1932', 'sov_terror_witness', 'sov_evacuated', 'sov_occupation_survivor',
  'sov_blockade_survivor', 'sov_father_killed_war', 'sov_home_front', 'sov_took_in_evacuees', 'sov_war_generation',
]

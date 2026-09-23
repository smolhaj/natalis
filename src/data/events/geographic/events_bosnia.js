// events_bosnia.js — three peoples, one country, and the thing that is not
// symmetrical.
//
// Bosnia and Herzegovina was named six times in the entire corpus and had no
// module. `events_southeast_europe.js`, which the source tree describes as
// covering "Yugoslav collapse, Bosnian War, Kosovo, tribunal", turns out to
// contain four Romanian events and five Serbian ones and not a single Bosnian
// guard. The roster meanwhile models the country properly — Bosniak 50%,
// Bosnian Serb 31%, Bosnian Croat 15% — and `bosnian_serb` was on the
// `unwritten-group` list at 31%.
//
// The difficulty of this module is the one the country itself has. Writing only
// the siege makes the Bosnian Serb a weather system rather than a person, and a
// third of the characters the engine draws here are Bosnian Serbs. Writing all
// three "sides" as equivalent is the other failure, and it is worse, because
// they were not equivalent: the ICTY and the ICJ found Srebrenica to be
// genocide, and no amount of even-handedness about ordinary lives changes what
// was done at Potočari in July 1995.
//
// The resolution this module uses is the one the Gulf module used: write the
// person, name the fact. A nineteen-year-old conscripted into the VRS in 1993
// is a nineteen-year-old who was conscripted. He is not Srebrenica. The
// sixty thousand Serbs who left the Sarajevo suburbs in March 1996, many of
// them digging up their own dead to take with them, lost their homes, and that
// loss is real and is not a rebuttal of anything. The events say what happened
// and leave the arithmetic where it belongs, which is with the reader.
//
// The other thing worth writing is what was there before, because the whole
// horror of it is that this was the most mixed republic in Yugoslavia and
// everyone knew it. In 1991, 5.5% of the country declared itself Yugoslav
// rather than any of the three. Sarajevo's mixed-marriage rate was among the
// highest in Europe. Komšiluk — neighbourliness, but as an institution, with
// obligations — is a word people still use, in the past tense and not in the
// past tense, in the same conversation.
//
// Dates used, all checked. Muslim is recognised as a Yugoslav nationality in
// 1971. The Sarajevo Winter Olympics open 8 February 1984. The first multiparty
// election is November 1990 and the three nationalist parties take 84% of the
// seats on 74% of the vote. The independence referendum is 29 February to 1 March
// 1992, largely boycotted by Serbs, 99.7% yes on 63% turnout. Suada Dilberović
// and Olga Sučić are shot on the Vrbanja bridge on 5 April 1992. The siege runs
// 5 April 1992 to 29 February 1996 — 1,425 days, about 11,500 killed, some
// 1,600 of them children. The Vase Miskina breadline is 27 May 1992. The
// Omarska, Keraterm and Trnopolje camps run from May 1992, and non-Serbs in
// Prijedor are ordered to wear white armbands that month. The Sarajevo tunnel
// opens in July 1993: 800 metres, 1.6 metres high, under the airport runway.
// The Stari Most in Mostar is destroyed on 9 November 1993. The Ferhadija and
// Arnaudija mosques in Banja Luka are dynamited in May 1993. The Markale market
// is shelled on 5 February 1994 and again on 28 August 1995. Srebrenica falls
// on 11 July 1995 and over 8,000 men and boys are killed. Dayton is initialled
// 21 November 1995 and signed in Paris on 14 December. The Sarajevo suburbs
// transfer to the Federation in March 1996. Karadžić is arrested in July 2008,
// living in Belgrade as a healer called Dragan Dabić; Mladić in May 2011. The
// JMBG protests are June 2013; the plenums and the floods are 2014.

const BA = 'Bosnia and Herzegovina'
const IS_BA = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === BA
const BOSNIAK = (G) => G.character?.ethnicity === 'bosniak'
const SERB = (G) => G.character?.ethnicity === 'bosnian_serb'
const CROAT = (G) => G.character?.ethnicity === 'bosnian_croat'

const SARAJEVO = (G) => G.place?.id === 'ba_sarajevo'
const MOSTAR = (G) => G.place?.id === 'ba_mostar'

const once = (G, key) => !G.mem?.[key]

export const BOSNIA_EVENTS = [

  // ── BEFORE ─────────────────────────────────────────────────────────────────

  {
    id: 'ba_komsiluk',
    phase: null,
    weight: 10,
    when: (G) => IS_BA(G) && G.currentYear >= 1950 && G.currentYear <= 1991 && G.age >= 7 && once(G, 'ba_komsiluk'),
    text: 'There is a word for it and the word carries obligations. Komšiluk. At Bajram the Serb family comes and eats; at slava you go and eat; at Christmas the Croats have you in and there is rakija at ten in the morning whether you want it or not. Somebody minds somebody\'s children. Somebody lends somebody money without a date on it. You could not name the religion of every family on the street if you were asked, and you have never been asked.',
    context: 'Bosnia was the most ethnically mixed republic in Yugoslavia. In the 1991 census 5.5% of the population declared themselves Yugoslav rather than Bosniak, Serb or Croat, and urban mixed-marriage rates were among the highest in Europe.',
    choices: null,
    effect: (p) => { p.setMem('ba_komsiluk', true); p.m += 5; p.s += 2; p.addFlag('komsiluk') },
  },

  {
    id: 'ba_mixed_family',
    phase: null,
    weight: 9,
    when: (G) => IS_BA(G) && G.currentYear >= 1955 && G.currentYear <= 1990 && G.age >= 8 && G.age <= 35 &&
      Math.random() < 0.34 && once(G, 'ba_mixed'),
    text: 'One grandmother is one thing and the other grandmother is another and nobody in this house has ever made an issue of it. On the form at school there is a box for nationality and your father writes Yugoslav in it, deliberately, every year, and the teacher sighs every year and accepts it. You are being raised in a country that has decided this question is solved. It is going to turn out that a country can decide that and be wrong.',
    choices: null,
    effect: (p) => { p.setMem('ba_mixed', true); p.m += 4; p.addFlag('mixed_bosnian_family'); p.addFlag('declared_yugoslav') },
  },

  {
    id: 'ba_olympics_1984',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1984 && G.age >= 6 && once(G, 'ba_84'),
    text: 'The Winter Olympics are in Sarajevo and the whole city has been rebuilding itself for three years to be looked at. There is a wolf called Vučko on everything. Jure Franko takes silver in the giant slalom and the country loses its mind over a silver medal. Torvill and Dean skate Boléro at Zetra and every one of the nine judges gives them a six. For two weeks the world is here and likes it here, and for the rest of your life this will be one of the two things people abroad know about your city.',
    context: 'The XIV Winter Olympics were held in Sarajevo in February 1984 — the first Winter Games in a socialist country. The bobsleigh track on Trebević and the Zetra hall became front-line positions eight years later, and the Olympic field at Koševo became a cemetery.',
    choices: null,
    effect: (p) => { p.setMem('ba_84', true); p.m += 8; p.addFlag('sarajevo_olympics') },
  },

  {
    id: 'ba_1990_election',
    phase: null,
    weight: 90,
    when: (G) => IS_BA(G) && G.currentYear === 1990 && G.age >= 16 && once(G, 'ba_1990'),
    text: 'The first free election in fifty years and the three national parties take eighty-four per cent of the assembly between them. The Communists and the Reformists — the two you could vote for without declaring what you are — split what is left. People vote for their own party the way you would take an umbrella: not because it is raining, because it might. Afterwards the three parties divide the ministries between them by nationality and call it power-sharing, and the arithmetic of the country is now a thing on paper.',
    context: 'In Bosnia\'s November 1990 election the SDA (Bosniak), SDS (Serb) and HDZ (Croat) took 84% of the seats between them on 74% of the vote and formed a coalition dividing posts by nationality. The non-national parties were beaten decisively.',
    choices: [
      {
        text: 'Vote for one of the three. Everyone else is going to.',
        tag: 'yielding',
        outcome: 'It is not a vote for anything. It is a vote against being the only house on the street with nobody speaking for it.',
        effect: (p) => { p.setMem('ba_1990', true); p.addFlag('voted_national_party') },
      },
      {
        text: 'Vote for the Reformists. Somebody has to.',
        tag: 'defiant',
        outcome: 'They get nine per cent. Your colleague, who voted the same way, says the sentence everyone in this small category will say for thirty years: we were right and it made no difference at all.',
        effect: (p) => { p.setMem('ba_1990', true); p.e += 3; p.addFlag('voted_non_national') },
      },
    ],
  },

  {
    id: 'ba_referendum_1992',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1992 && G.age >= 16 &&
      !(SERB(G) && G.character?.gender === 'male' && G.age >= 18 && G.age <= 45) && once(G, 'ba_ref'),
    text: (G) => SERB(G)
      ? 'The referendum on independence is at the end of February and the SDS has said not to go, and the barricades go up in Sarajevo the night the result comes in. You do not go. Almost nobody you know goes. The result is ninety-nine point seven per cent yes on a turnout of sixty-three, which is a number that can be read two completely different ways depending on which half of the country you are standing in, and both readings are about to be acted on.'
      : 'The referendum is at the end of February and you queue at the school and mark the paper. Ninety-nine point seven per cent yes, on a turnout of sixty-three, because most Serbs stayed home — which everybody knew would happen and everybody voted anyway. The barricades go up in Sarajevo that same week. Somebody on your street says it will be over in a fortnight. It is 1992 and there are people alive on this street who remember 1941, and they are not saying that.',
    context: 'The independence referendum of 29 February – 1 March 1992 was recommended by the EC as a condition of recognition and boycotted by the SDS. 99.7% voted yes on a 63.7% turnout. Barricades appeared in Sarajevo within days.',
    choices: null,
    effect: (p) => { p.setMem('ba_ref', true); p.m -= 4; p.addFlag('bosnia_referendum_1992') },
  },

  {
    id: 'ba_vrbanja_bridge',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1992 && G.age >= 14 && SARAJEVO(G) && once(G, 'ba_bridge'),
    text: 'There is a demonstration on the fifth of April, tens of thousands of people, and the point of it is that they are all three at once and are saying so out loud in the street. They walk to the parliament. On the Vrbanja bridge somebody fires from the Holiday Inn and Suada Dilberović, who is a medical student from Dubrovnik, and Olga Sučić, who works in the parliament building, are killed. You are close enough to hear the crowd change its sound. The siege is four minutes old and the first two people it kills are a Muslim woman and a Croat woman at a demonstration for keeping the country together. There are people already dead elsewhere by now, and whose name goes first in the count is a thing this country will still be arguing about when you are old.',
    context: 'On 5 April 1992 a mass peace demonstration in Sarajevo was fired on from the Holiday Inn, then held by SDS gunmen. Suada Dilberović and Olga Sučić are generally counted the first victims of the siege. The bridge now carries their names.',
    choices: null,
    effect: (p) => { p.setMem('ba_bridge', true); p.m -= 10; p.addFlag('vrbanja_bridge'); p.addFlag('war_began') },
  },

  // ── THE SIEGE ──────────────────────────────────────────────────────────────

  {
    id: 'ba_siege_water',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && SARAJEVO(G) && G.currentYear >= 1992 && G.currentYear <= 1995 && G.age >= 9 && once(G, 'ba_water'),
    text: 'There is no water in the pipes and there has not been for months, so water is a thing you go and get and carry. Twenty litres in two canisters, up however many flights, and the queue at the pump is the most dangerous place in the city because they know it is a queue and they know when. You go at strange hours. You learn which corners you can cross at a walk and which you cross at a run, and everybody in Sarajevo has the same map in their head and nobody drew it.',
    context: 'Sarajevo spent most of the 1992–95 siege without running water, electricity or gas. Water queues and markets were repeatedly shelled; the main avenue, Zmaja od Bosne, was known as Sniper Alley.',
    choices: [
      {
        text: 'Go early, before it is properly light.',
        tag: 'defiant',
        outcome: 'Cold, and you cannot see the ice on the steps, and you do this two hundred times and nothing happens to you. Other people did the same thing and something happened to them. That is the whole difference and it is not a difference in anything you did.',
        effect: (p) => { p.setMem('ba_water', true); p.h -= 6; p.m -= 4; p.addFlag('sarajevo_siege') },
      },
      {
        text: 'Send the boy. They do not shoot at children. (Everyone believes this.)',
        tag: 'yielding',
        outcome: 'He comes back every time. You are sick every time until he does, and this is the thing you will be unable to say out loud to him when he is forty.',
        effect: (p) => { p.setMem('ba_water', true); p.m -= 8; p.r += 8; p.addFlag('sarajevo_siege'); p.addFlag('sent_the_child') },
      },
    ],
  },

  {
    id: 'ba_siege_burning',
    phase: null,
    weight: 400,
    when: (G) => IS_BA(G) && SARAJEVO(G) && G.currentYear >= 1992 && G.currentYear <= 1995 && G.age >= 12 && once(G, 'ba_burn'),
    text: 'Everything in the flat that will burn has been burned. The chairs went, then the shelves, then the parquet, lifted strip by strip. The books went last and in an order the household agreed on: the encyclopaedias first because they are dense and burn slowly, then the things nobody was going to read again. Somebody on the third floor kept a hardback he would not put in the stove and everybody knew which one it was and nobody said anything about it.',
    context: 'With no gas or electricity, Sarajevans burned furniture, parquet flooring, books and the trees of the city\'s parks for heat and cooking through three winters. Improvised sheet-metal stoves were manufactured in the thousands.',
    choices: null,
    effect: (p) => { p.setMem('ba_burn', true); p.h -= 4; p.m -= 3; p.addFlag('sarajevo_siege'); p.addFlag('burned_the_books') },
  },

  {
    id: 'ba_siege_tunnel',
    phase: null,
    weight: 400,
    when: (G) => IS_BA(G) && SARAJEVO(G) && G.currentYear >= 1993 && G.currentYear <= 1995 && G.age >= 14 && once(G, 'ba_tunnel'),
    text: 'The tunnel goes under the runway from a house in Dobrinja to a house in Butmir. Eight hundred metres, a metre sixty high, so you go the whole way bent, with water to your ankles and a light every so often and a man behind you carrying a sack of flour on his back. It takes about two hours if there is no jam. It is the only way in or out of a city of three hundred thousand people. Coming back the other way you are carrying something for somebody and you are bent the same and you are, briefly, the supply line for a capital city.',
    context: 'The Sarajevo Tunnel, dug by hand and opened in July 1993, ran 800 metres under the UN-controlled airport runway. It was the besieged city\'s only land link to Bosnian-held territory for the rest of the war.',
    choices: null,
    effect: (p) => { p.setMem('ba_tunnel', true); p.h -= 3; p.m += 3; p.addFlag('sarajevo_tunnel'); p.addFlag('sarajevo_siege') },
  },

  {
    id: 'ba_markale',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && SARAJEVO(G) && (G.currentYear === 1994 || G.currentYear === 1995) && G.age >= 10 && once(G, 'ba_markale'),
    text: 'A shell lands in the market at midday when the market is a market. Sixty-eight the first time. Afterwards there is an argument, conducted at length in capitals four hundred miles away, about the angle of the crater and who could have fired it, and the argument goes on for years, and it is being conducted about people who were buying vegetables. You knew two of them by sight. You did not know either of their names until the list was printed.',
    context: 'The Markale marketplace was shelled on 5 February 1994, killing 68, and again on 28 August 1995, killing 43. The second attack triggered NATO\'s Operation Deliberate Force, which was decisive in ending the siege.',
    choices: null,
    effect: (p) => { p.setMem('ba_markale', true); p.m -= 9; p.addFlag('markale'); p.addFlag('sarajevo_siege') },
  },

  {
    id: 'ba_siege_normal',
    phase: null,
    weight: 400,
    when: (G) => IS_BA(G) && SARAJEVO(G) && G.currentYear >= 1993 && G.currentYear <= 1995 && G.age >= 15 && once(G, 'ba_normal'),
    text: 'There is a theatre season. There is a film festival, held in a basement, and people come to it in good clothes across a street where people get shot. Somebody runs a beauty contest and the winners hold up a banner that says DON\'T LET THEM KILL US. A man plays the cello in the ruins where the bread queue was. None of this is coping and none of it is defiance exactly. It is a city insisting, in the only grammar it has left, on being a city.',
    context: 'Cultural life in besieged Sarajevo was deliberate and sustained: basement screenings ran from 1993 and became the Sarajevo Film Festival, founded under siege in 1995 and running still; theatres ran seasons, and the "Miss Besieged Sarajevo" contest of May 1993 produced one of the war\'s defining images.',
    choices: null,
    effect: (p) => { p.setMem('ba_normal', true); p.m += 6; p.s += 3; p.addFlag('siege_culture'); p.addFlag('sarajevo_siege') },
  },

  // ── THE NORTHWEST ──────────────────────────────────────────────────────────

  {
    id: 'ba_white_armbands',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && !SARAJEVO(G) && (BOSNIAK(G) || CROAT(G)) && G.currentYear === 1992 && G.age >= 10 && once(G, 'ba_armband'),
    text: 'The announcement is on the local radio and it is procedural in tone. Non-Serbs are to mark their houses with a white sheet and to wear a white armband when they go out. Your mother finds a sheet. You watch her tear it into strips at the kitchen table, measuring by eye, the way she would for anything, and the ordinariness of her hands doing it is the part that stays with you. Then the buses start coming for people and everyone finds out what the marking was for.',
    context: 'In Prijedor in May 1992 the Serb authorities ordered non-Serbs to hang white sheets from their homes and wear white armbands. The Omarska, Keraterm and Trnopolje camps operated in the district that summer; the ICTY convicted a number of officials of crimes against humanity there.',
    choices: [
      {
        text: 'Wear it. Do not give them a reason.',
        tag: 'yielding',
        outcome: 'You wear a piece of your own bedsheet on your arm for six weeks. You get out of the district. You never, in thirty years, get through describing this without stopping in the same place.',
        effect: (p) => { p.setMem('ba_armband', true); p.m -= 10; p.addFlag('white_armband'); p.addFlag('ethnic_cleansing_survivor') },
      },
      {
        text: 'Go now, tonight, with what you can carry.',
        tag: 'defiant',
        outcome: 'Four of you in a car at two in the morning on the back road. You are right to go. The neighbours who waited another week did not get a week.',
        effect: (p) => { p.setMem('ba_armband', true); p.m -= 7; p.wipeMoney(0.8); p.addFlag('fled_the_northwest'); p.addFlag('ethnic_cleansing_survivor') },
      },
    ],
  },

  {
    id: 'ba_camp',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && (BOSNIAK(G) || CROAT(G)) && G.character?.gender === 'male' &&
      G.currentYear >= 1992 && G.currentYear <= 1993 && G.age >= 16 && G.age <= 60 &&
      G.flags.includes('white_armband') && once(G, 'ba_camp'),
    text: 'They take the men. The place is a mine complex with a hangar and a white house and you are in it for eleven weeks. There is no point describing the eleven weeks and you will not describe them, to anybody, including in the statement you give in 1998, which is accurate and leaves things out. In August the journalists come and the pictures go round the world, and the world looks at them, and what happens after the world looks is a separate question that takes it three more years to answer.',
    context: 'Omarska, Keraterm and Trnopolje held thousands of Bosniak and Croat men in 1992. ITN and Guardian footage from Trnopolje in August 1992 brought the camps to international attention. The ICTY tried and convicted camp commanders and local officials.',
    choices: null,
    effect: (p) => { p.setMem('ba_camp', true); p.h -= 22; p.m -= 16; p.addFlag('bosnia_camp_survivor'); p.addCondition('chronic_pain', 'moderate'); p.addCondition('shell_shock', 'severe') },
  },

  {
    id: 'ba_banja_luka_mosques',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1993 && G.age >= 12 && (SERB(G) || BOSNIAK(G)) && once(G, 'ba_ferhadija'),
    text: (G) => SERB(G)
      ? 'They dynamite the Ferhadija in the middle of the night in May and bulldoze what is left into the river, and the Arnaudija twenty minutes later, the same night. Four hundred years each. In the morning there is a flat place where a building has been your whole life and the town is quieter than a town should be, and the quietness is a lot of people deciding separately not to say anything. Your father says one sentence about it at the table and then does not mention it again, for years, and the sentence is not one you can repeat outside the house.'
      : 'They dynamite the Ferhadija in the night and push the stone into the river so that it cannot be put back. Four hundred and fourteen years. It was not a mosque you went to particularly. It was the thing at the end of the street that had always been there and that your grandfather described as having always been there. You understand exactly what the demolition is for, which is not to remove a building.',
    context: 'The Ferhat Pasha (Ferhadija) mosque, built in 1579, and the Arnaudija, built in 1594, were dynamited in Banja Luka in May 1993 and the rubble removed. Sixteen mosques in the city were destroyed. The Ferhadija was rebuilt from recovered stone and reopened in 2016.',
    choices: null,
    effect: (p) => { p.setMem('ba_ferhadija', true); p.m -= 7; p.addFlag('mosques_dynamited') },
  },

  // ── MOSTAR ─────────────────────────────────────────────────────────────────

  {
    id: 'ba_stari_most',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1993 && G.age >= 8 && (MOSTAR(G) || Math.random() < 0.3) && once(G, 'ba_most'),
    text: 'They bring the bridge down on the ninth of November after two days of shelling it directly. It had stood four hundred and twenty-seven years. Boys jumped off it in summer for money from tourists and everyone in the town had a photograph with it in the background and nobody had ever thought of it as a thing that could be absent. There is a video. The stone goes into the Neretva in one piece of motion and then the river is just a river with two towers on it.',
    context: 'The Stari Most, built by the Ottoman architect Mimar Hayruddin in 1566, was destroyed by Croat (HVO) artillery on 9 November 1993 during the Croat–Bosniak war. It was rebuilt with recovered stone and reopened in 2004.',
    choices: null,
    effect: (p) => { p.setMem('ba_most', true); p.m -= 8; p.addFlag('stari_most_destroyed') },
  },

  {
    id: 'ba_croat_bosniak_war',
    phase: null,
    weight: 500,
    when: (G) => IS_BA(G) && (BOSNIAK(G) || CROAT(G)) && G.currentYear >= 1993 && G.currentYear <= 1994 &&
      G.age >= 14 && once(G, 'ba_cbwar'),
    text: 'The other war starts, the one inside the first one. Until last year you and they were on the same side of the same thing and the front line ran somewhere else entirely, and now it runs down a street in Mostar with a boulevard for a no-man\'s-land. The man who was your section commander in 1992 is on the other side of it in 1993. Nobody outside the country can follow this and you can barely follow it and you are in it.',
    context: 'The Croat–Bosniak war of 1993–94 split the former allies and divided Mostar along the Bulevar. It ended with the Washington Agreement of March 1994, which created the Federation of Bosnia and Herzegovina.',
    choices: null,
    effect: (p) => { p.setMem('ba_cbwar', true); p.m -= 8; p.e += 2; p.addFlag('croat_bosniak_war') },
  },

  // ── THE WAR THAT WAS NOT SARAJEVO ──────────────────────────────────────────
  // Sarajevo is 16% of the characters the engine draws here, correctly: the
  // country was 39% urban in 1990. The war most Bosnians had was a village.

  {
    id: 'ba_village_divides',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && !SARAJEVO(G) && G.currentYear >= 1992 && G.currentYear <= 1993 && G.age >= 10 &&
      !(SERB(G) && G.character?.gender === 'male' && G.age >= 18 && G.age <= 45) && once(G, 'ba_village'),
    text: 'It does not start here. It arrives. Men come from somewhere else in a bus with no plates and they are not from this valley and do not know whose field is whose, and the local men who know exactly whose field is whose either go with them or go indoors. Three houses empty in a night. The family that leaves is the family that has been on the corner since before anyone. Afterwards there is a version of what happened that the village agrees on, and the version has a shape that leaves nobody in it responsible.',
    context: 'Much of the ethnic clearing of rural Bosnia in 1992 was carried out by paramilitary units brought in from outside the locality, with varying degrees of participation and acquiescence from local people. The pattern was documented extensively at the ICTY.',
    choices: [
      {
        text: 'Drive them to the next town yourself. Tonight.',
        tag: 'defiant',
        outcome: 'Two trips in the dark with the lights off. You are never entirely sure whether the man at the checkpoint recognised you and decided not to, and you never ask him, and you see him for the next thirty years.',
        effect: (p) => { p.setMem('ba_village', true); p.karma += 12; p.m -= 4; p.addFlag('village_cleared'); p.addFlag('helped_them_out') },
      },
      {
        text: 'Stay indoors. This is not something one house can stop.',
        tag: 'yielding',
        outcome: 'It is not something one house can stop, and that is true, and it is also the sentence you are going to be examining at three in the morning for the rest of your life.',
        effect: (p) => { p.setMem('ba_village', true); p.r += 10; p.m -= 5; p.addFlag('village_cleared'); p.addFlag('stayed_indoors') },
      },
    ],
  },

  {
    id: 'ba_collective_centre',
    phase: null,
    weight: 400,
    when: (G) => IS_BA(G) && G.currentYear >= 1993 && G.currentYear <= 1999 && G.age >= 8 &&
      (G.flags.includes('village_cleared') || G.flags.includes('fled_the_northwest') || G.flags.includes('internally_displaced') || G.flags.includes('left_the_suburbs')) &&
      once(G, 'ba_centre'),
    text: 'You live in a school. Four families to a classroom with blankets hung on wire for the walls, a rota for the kitchen, and a man who used to run a sawmill now in charge of the rota, which he takes extremely seriously because it is the only thing left to be in charge of. The children do lessons in the corridor. It is supposed to be for a few months. Some people in this building will still be in it in 2004.',
    context: 'Bosnia housed displaced people in "collective centres" — schools, hotels, workers\' hostels — from 1992. Over a hundred remained occupied two decades after the war, and some are still in use.',
    choices: null,
    effect: (p) => { p.setMem('ba_centre', true); p.m -= 6; p.h -= 3; p.addFlag('collective_centre') },
  },

  {
    id: 'ba_convoy',
    phase: null,
    weight: 400,
    when: (G) => IS_BA(G) && !SARAJEVO(G) && G.currentYear >= 1993 && G.currentYear <= 1995 && G.age >= 9 && once(G, 'ba_convoy'),
    text: 'The convoy gets through in March and it is oil, flour, a yeast that does not work properly, and tins of a processed meat with a brand name that this entire country will be making jokes about in thirty years\' time. The soldiers handing it down are from a country you could not place on a map before 1992 and can now. Your mother takes the box and says thank you in a language she does not speak, twice, carefully. The box has a flag printed on it.',
    context: 'UNHCR ran the largest humanitarian operation in its history in Bosnia. The canned beef distributed in the ration packs, universally known as ICAR, remains a national joke and a shorthand for the war years.',
    choices: null,
    effect: (p) => { p.setMem('ba_convoy', true); p.h -= 2; p.m += 2; p.addFlag('humanitarian_ration') },
  },

  {
    id: 'ba_minefield',
    phase: null,
    weight: 300,
    when: (G) => IS_BA(G) && G.currentYear >= 1997 && G.age >= 14 &&
      (G.character?.ruralUrban === 'rural' || G.place?.id === 'ba_rural') && once(G, 'ba_mines'),
    text: 'You can see the field from the house. It is good land, it was your grandfather\'s, and it has a sign on it with a skull and the year the sign was put up, which was a while ago now. Somebody will come and clear it. They have been coming to clear it since 1998 and there are a lot of fields. A man two villages over went in for firewood in 2003 because he had been going in for firewood his whole life.',
    context: 'Bosnia was left with an estimated 1,000 km² of suspected mined land and remains one of the most heavily contaminated countries in Europe. Clearance is still ongoing; casualties continued well into the 2010s, often on land people had farmed for generations.',
    choices: null,
    effect: (p) => { p.setMem('ba_mines', true); p.m -= 4; p.mo -= 200; p.addFlag('mined_land') },
  },

  {
    id: 'ba_village_empty',
    phase: null,
    weight: 300,
    when: (G) => IS_BA(G) && G.currentYear >= 2005 && G.age >= 30 &&
      (G.character?.ruralUrban === 'rural' || G.place?.id === 'ba_rural') && once(G, 'ba_empty'),
    text: 'The census says the village has a hundred and forty. In 1991 it had eleven hundred. The school closed in 2002 and the shop closed after the school and the bus comes on Tuesdays. There are four houses lived in year-round and eleven that open for two weeks in August when the Austrian and German plates arrive, and for those two weeks it is briefly a village again and then it is not.',
    context: 'Bosnia\'s population fell from about 4.4 million in 1991 to roughly 3.5 million at the 2013 census, with rural depopulation far steeper than the national figure. Emigration accelerated after 2015 as Germany and Austria opened labour routes.',
    choices: null,
    effect: (p) => { p.setMem('ba_empty', true); p.m -= 4; p.addFlag('village_emptied') },
  },

  // ── THE VRS CONSCRIPT ──────────────────────────────────────────────────────

  {
    id: 'ba_vrs_conscript',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && SERB(G) && G.character?.gender === 'male' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 && G.age >= 18 && G.age <= 45 && once(G, 'ba_vrs'),
    text: 'They come for you with a list and the list has your address on it and there is no mechanism, in the place you live, in 1992, for not being on it. You spend most of two years on a hillside above a valley, cold, bored, badly fed, occasionally very frightened, doing what you are told at the scale of a rifle. Men you were at school with are somewhere below you. You think about that at night and you think about it less than you would expect during the day, which is the part you are going to have to account for.',
    context: 'The Army of Republika Srpska conscripted widely from the Bosnian Serb population. Most of its soldiers were ordinary conscripts. The ICTY prosecuted commanders and specific units; the ICTY and ICJ found the Srebrenica killings of July 1995 to be genocide.',
    choices: [
      {
        text: 'Go. Keep your head down. Do the minimum that is not noticed.',
        tag: 'yielding',
        outcome: 'Two years of doing the minimum. You are not proud of it and you did not do the other thing either, and for the rest of your life you will be careful about which of those two facts you lead with.',
        effect: (p) => { p.setMem('ba_vrs', true); p.h -= 8; p.m -= 8; p.r += 6; p.addFlag('vrs_conscript') },
      },
      {
        text: 'Get out of the country. Deserters go to Serbia, or further.',
        tag: 'defiant',
        outcome: 'Belgrade, then Germany on somebody\'s cousin\'s address. You are a draft evader to one set of people and a refugee to another and a Serb to everybody, and the third one is the one that follows you into rooms.',
        effect: (p) => { p.setMem('ba_vrs', true); p.emigrateTo('Germany', { residency: 'asylum_seeker' }); p.m -= 5; p.addFlag('vrs_deserter'); p.addFlag('bosnia_exile') },
      },
    ],
  },

  {
    id: 'ba_serb_shame',
    phase: null,
    weight: 500,
    when: (G) => IS_BA(G) && SERB(G) && G.currentYear >= 1993 && G.currentYear <= 1997 && G.age >= 20 && once(G, 'ba_sshame'),
    text: 'Somebody in the town has a satellite dish and what the foreign channels are saying about the people you are from is not something you can dismiss and not something you can repeat at the café. The local radio has its own version. You hold both of them in your head at the same time for about three years and the strain of that is a specific thing that people who have not done it do not understand. Your mother says: they are lying about us. You say: about some of it.',
    choices: [
      {
        text: 'Say the rest of it out loud, in your own town.',
        tag: 'defiant',
        outcome: 'You get called a traitor by a man you have known since primary school. He is not the last. You keep saying it and you keep the friends you keep.',
        effect: (p) => { p.setMem('ba_sshame', true); p.m -= 4; p.karma += 10; p.addFlag('serb_dissent') },
      },
      {
        text: 'Say nothing. Everybody here has a son somewhere.',
        tag: 'yielding',
        outcome: 'You say nothing for three years and then it is not a thing you started saying afterwards either, and the not-saying sets, the way a thing sets.',
        effect: (p) => { p.setMem('ba_sshame', true); p.r += 7; p.addFlag('serb_silence') },
      },
    ],
  },

  // ── SREBRENICA ─────────────────────────────────────────────────────────────

  {
    id: 'ba_srebrenica_july',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && BOSNIAK(G) && G.currentYear >= 1995 && G.currentYear <= 1996 && G.age >= 8 &&
      // The enclave, not the country. Without a place test this reached 30% of
      // every Bosniak the engine draws, including Sarajevans under siege.
      (G.place?.id === 'ba_rural' || G.flags.includes('village_cleared') || G.flags.includes('collective_centre')) &&
      Math.random() < 0.18 && once(G, 'ba_sreb'),
    text: (G) => G.character?.gender === 'male' && G.age >= 14 && G.age <= 65
      ? 'The enclave falls on the eleventh of July and the UN does not stop it. At the base at Potočari they separate the men and boys from everyone else, in front of everyone else, with the Dutch soldiers standing there. The other option is the column: twelve thousand men walking sixty miles through the woods to Tuzla with the woods shelled and mined ahead of them. About a third of the column arrives. Over eight thousand men and boys do not arrive anywhere, and it takes twenty years and a DNA laboratory to establish where most of them are.'
      : 'The enclave falls on the eleventh of July and at Potočari they take the men out of the crowd, in front of the crowd, while the Dutch soldiers stand there, and put the women and the children on buses to Tuzla. Your husband. Your brother. Your son, who is fifteen, and whom you tried to keep inside the group by standing in a particular way, which did not work. Over eight thousand. You are on a bus and you are alive and that is the arithmetic that will organise the rest of your life.',
    context: 'Srebrenica was a UN-declared "safe area" held by a Dutch battalion. After its fall on 11 July 1995 more than 8,000 Bosniak men and boys were murdered. The ICTY and the International Court of Justice both found the killings to constitute genocide; Radovan Karadžić and Ratko Mladić were convicted of it.',
    choices: null,
    effect: (p) => { p.setMem('ba_sreb', true); p.m -= 20; p.addFlag('srebrenica'); p.addCondition('shell_shock', 'severe') },
  },

  // ── DAYTON AND AFTER ───────────────────────────────────────────────────────

  {
    id: 'ba_dayton',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear === 1995 && G.age >= 12 && once(G, 'ba_dayton'),
    text: 'It ends at an air force base in Ohio. The country is kept on the map and divided inside it: one entity at fifty-one per cent and the other at forty-nine, three presidents, a foreign official with the power to sack elected ones, and a constitution that is an annex to a treaty and whose authoritative text is in English. It stops the shooting, which was the point, and it is the reason nothing since has been able to move, which was not.',
    context: 'The General Framework Agreement was initialled at Wright-Patterson Air Force Base on 21 November 1995 and signed in Paris on 14 December. It created the Federation of Bosnia and Herzegovina and Republika Srpska, a three-member presidency, and the Office of the High Representative, which retains powers to impose legislation and remove officials.',
    choices: null,
    effect: (p) => { p.setMem('ba_dayton', true); p.m += 5; p.e += 3; p.addFlag('dayton_generation') },
  },

  {
    id: 'ba_suburbs_transfer',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && SERB(G) && G.currentYear >= 1996 && G.currentYear <= 1997 && G.age >= 10 && once(G, 'ba_suburbs'),
    text: 'Under the agreement the Sarajevo suburbs go to the Federation in March and the people in them are told, by their own leadership, to leave. Sixty thousand do. Some burn their flats on the way out so that nobody else can have them. People go to the cemeteries with tools and take their dead with them, which is a sentence that reads as rhetoric and was a practical activity undertaken by ordinary families over several days. You are from Grbavica. You were from Grbavica.',
    context: 'Under Dayton, Serb-held districts of Sarajevo — Grbavica, Ilidža, Vogošća, Hadžići and Ilijaš — transferred to the Federation in February–March 1996. Around 60,000 Serb residents left, many after appeals from the Republika Srpska leadership; arson and the disinterment of family graves were widely reported.',
    choices: [
      {
        text: 'Stay. This is your flat and your city and you have done nothing.',
        tag: 'defiant',
        outcome: 'A few thousand stay. It is harder than leaving in ways nobody warned you about, and twenty-five years later you are still in the flat and you were right.',
        effect: (p) => { p.setMem('ba_suburbs', true); p.m -= 4; p.karma += 8; p.addFlag('stayed_in_sarajevo') },
      },
      {
        text: 'Go with everyone else. There is a lorry.',
        tag: 'yielding',
        outcome: 'Pale, then Banja Luka. You are a refugee inside your own country, from a city that is eleven miles away and that you will not visit for nineteen years.',
        effect: (p) => { p.setMem('ba_suburbs', true); p.m -= 9; p.wipeMoney(0.6); p.addFlag('left_the_suburbs'); p.addFlag('internally_displaced') },
      },
    ],
  },

  {
    id: 'ba_two_schools',
    phase: null,
    weight: 12,
    when: (G) => IS_BA(G) && G.currentYear >= 1999 && G.age >= 7 && G.age <= 17 && once(G, 'ba_schools'),
    text: 'There are two schools in this building. Same building, same caretaker, two head teachers, two curricula, two sets of history lessons about the same decade, and a timetable arranged so that the two sets of children use the corridor at different times. Somebody put real administrative effort into that timetable. The children work out how to meet each other anyway, in the yard, out of hours, and are obscurely aware that doing so is a small act of something.',
    context: '"Two schools under one roof" was introduced after 1999 as a temporary measure to encourage returns and has proved permanent. Dozens of Bosnian schools still teach separate Bosniak and Croat curricula in the same building. Bosnia\'s courts have repeatedly ruled the arrangement discriminatory.',
    choices: null,
    effect: (p) => { p.setMem('ba_schools', true); p.m -= 3; p.e += 2; p.addFlag('two_schools_one_roof') },
  },

  {
    id: 'ba_return',
    phase: null,
    weight: 300,
    when: (G) => IS_BA(G) && G.currentYear >= 1998 && G.currentYear <= 2005 && G.age >= 25 &&
      (G.flags.includes('fled_the_northwest') || G.flags.includes('internally_displaced') || G.flags.includes('bosnia_exile')) &&
      once(G, 'ba_return'),
    text: 'The property law says you can have the house back and, after four years of paper, you can have the house back. Somebody has been living in it since 1992 and is also from somewhere they were put out of, and hands you the keys with a look you will think about. The roof is gone. The street is the same street and two thirds of the names on it are different. You stand in your own kitchen and cannot work out whether you have come home or arrived somewhere.',
    context: 'Annex 7 of Dayton guaranteed the right of return. Over a million property claims were resolved and most restituted, but sustained minority return was far lower: many recovered houses were sold, and the country\'s ethnic geography remained substantially as the war left it.',
    choices: [
      {
        text: 'Move back in. Fix the roof.',
        tag: 'defiant',
        outcome: 'Two years of work and a life among people who mostly do not want you there and a few who do. The few are the reason you manage it.',
        effect: (p) => { p.setMem('ba_return', true); p.m += 4; p.mo -= 3000; p.addFlag('minority_return') },
      },
      {
        text: 'Take the keys and sell it.',
        tag: 'yielding',
        outcome: 'You sell the house you grew up in to somebody from the majority in that town, at a price that reflects who is buying. The money is useful. It is also the transaction the war was fought to produce.',
        effect: (p) => { p.setMem('ba_return', true); p.mo += 9000; p.r += 6; p.addFlag('sold_the_house') },
      },
    ],
  },

  {
    id: 'ba_dna_identification',
    phase: null,
    weight: 999,
    when: (G) => IS_BA(G) && G.currentYear >= 2003 && G.age >= 25 &&
      (G.flags.includes('srebrenica') || G.flags.includes('bosnia_camp_survivor') || G.flags.includes('ethnic_cleansing_survivor')) &&
      once(G, 'ba_dna'),
    text: 'They take blood from you and from your mother and from your father\'s sister and the blood goes into a database, and then you wait, and the waiting is measured in years. When the call comes it is a laboratory telling you that bones recovered from two separate graves, thirty kilometres apart, are one person and that the person is yours. The second grave was dug to hide the first. You bury what there is, in July, at Potočari, with the others whose call came this year.',
    context: 'The International Commission on Missing Persons pioneered large-scale DNA identification in Bosnia. Around 30,000 people went missing; roughly 70% have been identified, often from remains dispersed between primary and secondary mass graves dug to conceal them. Identified victims are reburied at the Srebrenica–Potočari memorial each 11 July.',
    choices: null,
    effect: (p) => { p.setMem('ba_dna', true); p.m -= 5; p.addFlag('dna_identification') },
  },

  {
    id: 'ba_hague',
    phase: null,
    weight: 200,
    when: (G) => IS_BA(G) && (G.currentYear === 2008 || G.currentYear === 2011) && G.age >= 20 && once(G, 'ba_hague'),
    text: (G) => G.currentYear === 2008
      ? 'They arrest Karadžić on a bus in Belgrade. He has spent years living openly as an alternative healer with a long white beard and a website, giving lectures on human quantum energy, and had a regular table at a bar where the walls carry his own wanted poster as a joke. The absurdity of it is exactly the wrong size for what he is charged with, and everybody in this country has to hold both at once.'
      : 'They find Mladić at his cousin\'s house in a village in Vojvodina, sixteen years on, thin and ill and with two pistols he does not use. He will be convicted of genocide. Somewhere in this country a man his age is watching the same footage and feeling something entirely different, and you have both been in this country the whole time.',
    context: 'Radovan Karadžić was arrested in Belgrade in July 2008 after years living under the alias Dragan Dabić; Ratko Mladić in May 2011. Both were convicted at The Hague of genocide over Srebrenica and sentenced to life imprisonment.',
    choices: null,
    effect: (p) => { p.setMem('ba_hague', true); p.e += 3; p.addFlag('hague_verdicts') },
  },

  {
    id: 'ba_leaving',
    phase: null,
    weight: 120,
    when: (G) => IS_BA(G) && G.currentYear >= 2014 && G.age >= 19 && G.age <= 40 &&
      !G.flags.includes('emigrated') && once(G, 'ba_leave'),
    text: 'Everybody is going. Germany is taking nurses and welders and anyone who will do the course, and the queue outside the German embassy starts at four in the morning and is full of people with degrees. The country had four and a half million people in 1991. Your class had twenty-six. There is a group chat and the group chat has members in six countries and it is, functionally, where your class lives now.',
    choices: [
      {
        text: 'Go. Germany, like everyone.',
        tag: 'yielding',
        outcome: 'Augsburg, a language course, and work below what you trained for, for a while, and then not below it. You send money and come back in August and the coming back in August is the part that holds.',
        effect: (p) => { p.setMem('ba_leave', true); p.emigrateTo('Germany', { residency: 'work_visa' }); p.mo += 1500; p.addFlag('bosnia_diaspora') },
      },
      {
        text: 'Stay. Somebody has to be here.',
        tag: 'defiant',
        outcome: 'You stay, and you are good at what you do, and the institution you do it in is run by whichever party won in your entity. You would make the same decision again and it costs more every year.',
        effect: (p) => { p.setMem('ba_leave', true); p.karma += 6; p.m += 2; p.addFlag('bosnia_stayer') },
      },
    ],
  },

]

// ── FOLLOW-THROUGH ───────────────────────────────────────────────────────────

export const BOSNIA_FOLLOWTHROUGH = [

  {
    id: 'ba_ft_komsiluk_after',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('komsiluk') && G.currentYear >= 1997 && G.age >= 35 && once(G, 'ba_ft_koms'),
    text: 'The word is still in use. People say it in the past tense and then, in the same conversation, in the present, about the man across the landing, and both usages are sincere. What is gone is the assumption underneath it — that it held, that it was structural, that it was a property of the place rather than of particular people being particular. It turns out to have been particular people. Several of them were yours and several of them were not.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_koms', true); p.m += 3; p.r += 3; p.addFlag('komsiluk_after') },
  },

  {
    id: 'ba_ft_siege_habits',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('sarajevo_siege') && G.currentYear >= 1998 && once(G, 'ba_ft_siege'),
    text: 'There is water in the taps and you still fill things. Five-litre bottles under the sink that nobody drinks from and that you rotate. You do not walk on the outside of a pavement if there is an inside. At a loud noise you are already moving before you have decided anything, and the deciding happens afterwards and is embarrassing in front of people who were somewhere else in the nineties.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_siege', true); p.m -= 2; p.addFlag('siege_habits') },
  },

  {
    id: 'ba_ft_srebrenica_july',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('srebrenica') && G.currentYear >= 2003 && once(G, 'ba_ft_sreb'),
    text: 'Every July there is a green field and a line of coffins and the number of them that year, and the number is smaller every year because they are running out of people left to find. The news comes and goes in a day everywhere else. Here it is the shape of the year: the run-up, the day, the week after. You have been to nineteen of them. You are not sure what you would do in a July without one.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_sreb', true); p.m -= 3; p.addFlag('potocari_every_july') },
  },

  {
    id: 'ba_ft_vrs_account',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('vrs_conscript') && G.age >= 45 && once(G, 'ba_ft_vrs'),
    text: 'Your son asks, once, directly, at an age where he is entitled to. You give him the true version, which is that you were nineteen and on a hill and did what you were told at the scale of a rifle, and that you did not do the other thing, and that you also did not stop anybody. He takes it better than you expected. What he does with it is his, and you have handed him something you carried for thirty years, which is both a relief and a thing you have done to him.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_vrs', true); p.m += 3; p.r -= 4; p.addFlag('told_the_son') },
  },

  {
    id: 'ba_ft_serb_silence_late',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('serb_silence') && G.age >= 55 && once(G, 'ba_ft_sil'),
    text: 'A film crew comes to the town for an anniversary and asks people in the street what they remember, and you watch the piece afterwards and every person in it says a version of the same careful sentence. You would have said it too. You know what it is to have been twenty-six and afraid of your own café. You also know, now, at this distance, that a whole town saying the careful sentence for thirty years is how a thing gets to stay unsaid.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_sil', true); p.m -= 3; p.e += 3; p.addFlag('silence_recognised') },
  },

  {
    id: 'ba_ft_suburbs_visit',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('left_the_suburbs') && G.currentYear >= 2010 && G.age >= 40 && once(G, 'ba_ft_sub'),
    text: 'You go back to Grbavica. It takes twenty minutes on a tram and it took you nineteen years. The block is there, the balcony is there, somebody has put different windows in. A woman comes out of your entrance with shopping and looks at you without any particular interest, because you are a man standing on a pavement. You are the only person on this street who knows that you are standing in front of your own flat.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_sub', true); p.m += 4; p.r += 3; p.addFlag('went_back_to_grbavica') },
  },

  {
    id: 'ba_ft_camp_statement',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('bosnia_camp_survivor') && G.currentYear >= 1998 && G.age >= 30 && once(G, 'ba_ft_camp'),
    text: 'A lawyer takes your statement over two days in a room with a jug of water. You give an accurate account with things left out, and she knows they are left out, and does not push, and the transcript goes to The Hague and is read by people you will never meet. Years later a man is convicted partly on it. You feel very little on the day of the verdict and a great deal about four months afterwards, in a supermarket, for no reason connected to anything.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_camp', true); p.m += 2; p.karma += 6; p.addFlag('testified_at_the_hague') },
  },

  {
    id: 'ba_ft_diaspora_august',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('bosnia_diaspora') && !IS_BA(G) && G.age >= 40 && once(G, 'ba_ft_dia'),
    text: 'August. You drive down with German plates and the whole country is doing the same thing in the same fortnight, so the coast is full and the villages are briefly at their 1990 population and every café has three generations at a table speaking two languages at once. On the last Sunday everyone leaves again in convoy. Your children are polite about all of it and are not from here, which you have known for years and confirm once a year.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_dia', true); p.m += 5; p.r += 2; p.addFlag('august_return') },
  },

  {
    id: 'ba_ft_stayer_late',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('bosnia_stayer') && G.age >= 50 && once(G, 'ba_ft_stay'),
    text: 'You are good at this job and you have been doing it for twenty-five years in an institution that answers to whichever party holds this entity, and the appointments go the way appointments go, and you train people who then leave. Somebody younger asks you, seriously, whether staying was worth it. You give them the honest answer, which is longer than they wanted and does not resolve, and includes the fact that somebody had to be here and that you are aware that is not an argument.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_stay', true); p.m += 3; p.r += 3; p.addFlag('stayer_accounting') },
  },

  {
    id: 'ba_ft_mixed_after',
    phase: null,
    weight: 35,
    when: (G) => G.flags.includes('mixed_bosnian_family') && G.currentYear >= 1996 && G.age >= 25 && once(G, 'ba_ft_mix'),
    text: 'Every form since 1996 has three boxes and you are not one of them. There is a fourth option and choosing it costs you the right to stand for half the offices in the country, which a court in Strasbourg has said is discrimination and which is still true. You put down what you put down. Your name gives one answer and your mother\'s name gives another and people do the sum in front of you and reach different totals.',
    context: 'Bosnia\'s constitution reserves the presidency and the House of Peoples for members of the three "constituent peoples". In Sejdić and Finci v. Bosnia and Herzegovina (2009) the European Court of Human Rights found this discriminatory; the ruling remains unimplemented.',
    choices: null,
    effect: (p) => { p.setMem('ba_ft_mix', true); p.m -= 3; p.e += 2; p.addFlag('none_of_the_three') },
  },

]

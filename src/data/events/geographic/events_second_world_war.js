// events_second_world_war.js — the war where it was lived, in the countries the corpus left out.
//
// There is no Second World War world event anywhere in worldEvents.js; the war
// lives in country modules, and a run of 1925-born lives through the war years
// found those modules missing for most of the countries it happened in. What
// fired for a Pole between 1939 and 1945 was a graduation, a first job and a
// stranger glimpse. China 1937-45, the Philippines, Yugoslavia, Indonesia and
// colonial Korea were the same: at most "soldiers passed through", a generic
// line that did not know which soldiers. The WAR_YEARS table in history.js was
// already killing these characters at wartime rates; nothing told them why.
//
// Written from the ordinary position in each place — the character the engine
// actually draws there — and not from the front. The engine does not draw
// Polish Jews (the roster models Poland's present population), so the
// Holocaust is here as the non-Jewish majority saw it, which is itself a thing
// people spent the rest of their lives answering for, in both directions.
//
// Dates used, all checked.
// Poland: invasion 1 September 1939; Soviet invasion 17 September; Warsaw
// capitulates 28 September. Street round-ups (łapanka) for labour and hostages
// through the occupation; secondary and higher education forbidden to Poles in
// the General Government, taught in secret (tajne komplety). The Warsaw ghetto
// sealed November 1940; its uprising begins 19 April 1943, Easter week, beside
// the carousel on Krasiński Square. The death penalty for sheltering Jews,
// October 1941; the Ulma family killed with the eight Jews they hid at Markowa,
// Podkarpacie, 24 March 1944. The Warsaw Uprising, 1 August to 2 October 1944,
// 63 days; the surviving population expelled through the Pruszków camp. Yad
// Vashem's Righteous Among the Nations from 1963.
// China: Marco Polo Bridge 7 July 1937; Shanghai August to November; Nanjing
// falls 13 December. Chongqing the wartime capital, bombed 1938-43; the
// Jiaochangkou tunnel disaster of 5 June 1941. Conscripts taken roped together.
// Japan's surrender broadcast 15 August 1945.
// Philippines: attacked 8 December 1941; Manila declared an open city, occupied
// 2 January 1942; Bataan surrenders 9 April 1942 and the march north follows.
// Japanese-issued occupation pesos ("Mickey Mouse money"). Fort Santiago as a
// Kempeitai prison. Leyte landings 20 October 1944. The battle for Manila,
// 3 February to 3 March 1945, about 100,000 civilians killed. The Rescission
// Act of 1946 withdrew veterans' benefits from Filipino soldiers; the 2009
// equity fund paid lump sums to the survivors.
// Yugoslavia: Belgrade bombed 6 April 1941; capitulation 17 April; the
// Independent State of Croatia proclaimed 10 April and its Ustaše regime; the
// Jasenovac camps from August 1941. Kragujevac, 21 October 1941: about 2,800
// men and boys shot under the order of one hundred hostages for each German
// killed. Ljubljana enclosed in barbed wire by the Italian army, February 1942;
// Prekmurje annexed by Hungary. Belgrade liberated 20 October 1944; Bleiburg,
// May 1945.
// Indonesia: the Dutch capitulate in March 1942; romusha labour recruitment;
// the proclamation of 17 August 1945; Surabaya, 10 November 1945; Dutch
// recognition 27 December 1949.
// Korea: Korean removed from the school curriculum from 1938; the order to take
// Japanese names (sōshi-kaimei), February 1940, obeyed by about 80% within
// months; labour mobilisation from 1939, conscription from 1944; liberation
// 15 August 1945 and the division at the 38th parallel within weeks. Kim
// Hak-sun speaks publicly on 14 August 1991.

const LIVE = (G) => (G.currentCountry?.name ?? G.character?.country?.name)
const IN = (...names) => (G) => names.includes(LIVE(G))
const AT = (...ids) => (G) => ids.includes(G.place?.id)
const ETH = (...ids) => (G) => ids.includes(G.character?.ethnicity)
const RURAL = (G) => G.ruralUrban === 'rural'
const MALE = (G) => G.character?.gender === 'male'
const once = (G, key) => !G.mem?.[key]
const YUGOSLAV = IN('Serbia', 'Croatia', 'Bosnia and Herzegovina', 'Slovenia')

export const SECOND_WORLD_WAR_EVENTS = [

  // ── POLAND ────────────────────────────────────────────────────────────────

  {
    id: 'ww2_pl_september',
    phase: null,
    weight: 999,
    when: (G) => IN('Poland')(G) && G.currentYear === 1939 && G.age >= 4 && once(G, 'ww2PlSept'),
    text: (G) => AT('pl_warsaw')(G)
      ? 'The sirens start on the first morning and do not really stop for four weeks. The mayor speaks on the radio every evening until the station goes. By the end the water is off and people are cutting meat from the horses that have died in the street, and then it is quiet, and the quiet is the Germans.'
      : 'The road past the village fills with people going east, then with people coming back west because the east has closed too. An aeroplane comes down low along the road one afternoon and after that the column walks in the ditches. Within the month there are new notices on the church door in a language most of the village cannot read.',
    choices: null,
    effect: (p) => { p.setMem('ww2PlSept', true); p.m -= 14; p.addFlag('ww2_pl_1939'); p.addFlag('war_childhood') },
  },

  {
    id: 'ww2_pl_occupation',
    phase: null,
    weight: 80,
    claimsYears: { from: 1940, to: 1942 },
    when: (G) => IN('Poland')(G) && G.currentYear >= 1940 && G.currentYear <= 1943 && G.age >= 10 && G.age <= 30 && once(G, 'ww2PlOcc'),
    text: 'The Germans close the secondary schools and the universities: a Pole needs to count and sign a name, and nothing else. At a street corner the trucks arrive from both ends at once and everyone between them goes to Germany to work, or to the wall. Your aunt\'s flat has a lesson in it on Tuesdays, six children round a table with Latin grammar under the tablecloth and a sewing pattern on top.',
    choices: [
      {
        text: 'Go to the Tuesday lessons.',
        tag: 'defiant',
        outcome: 'You learn the aorist in a kitchen with the curtains drawn. It is the most serious you have ever been about anything.',
        effect: (p) => { p.setMem('ww2PlOcc', true); p.m -= 6; p.e += 6; p.addFlag('ww2_pl_occupation'); p.addFlag('ww2_pl_secret_school') },
      },
      {
        text: 'Keep off the streets and out of anything.',
        tag: 'yielding',
        outcome: 'You learn which streets and which hours. It keeps you out of the trucks. It is not nothing.',
        effect: (p) => { p.setMem('ww2PlOcc', true); p.m -= 8; p.addFlag('ww2_pl_occupation'); p.addFlag('learned_silence') },
      },
    ],
    effect: null,
  },

  {
    id: 'ww2_pl_ghetto_wall',
    phase: null,
    weight: 70,
    when: (G) => IN('Poland')(G) && AT('pl_warsaw')(G) && G.currentYear >= 1941 && G.currentYear <= 1943 && G.age >= 7 && once(G, 'ww2PlGhetto'),
    text: (G) => G.currentYear === 1943
      ? 'It is Easter and the carousel is turning in Krasiński Square, and on the other side of the wall the ghetto is burning. The smoke goes over the square. Somebody on the carousel laughs. You are standing at the rail and you understand, the way children understand things all at once, that you will be asked about this afternoon for the rest of your life.'
      : 'The wall goes up across streets you used to walk, and the tram still runs through the middle with its doors shut and its windows looking out. People on the tram look, or do not look. A girl your age on the other side of a gate is holding out her hand, and your mother pulls you on by the arm without saying anything, and does not say anything that evening either.',
    choices: null,
    effect: (p) => { p.setMem('ww2PlGhetto', true); p.m -= 12; p.r += 8; p.addFlag('ww2_pl_ghetto_witness') },
  },

  {
    id: 'ww2_pl_the_knock',
    phase: null,
    weight: 60,
    when: (G) => IN('Poland')(G) && RURAL(G) && G.currentYear >= 1942 && G.currentYear <= 1944 && G.age >= 12 && once(G, 'ww2PlKnock'),
    text: 'A woman and two children at the back door after dark, from the town, with nothing, asking. Everybody in the district knows the notice: for hiding a Jew, the death of the household that hid them. In the spring they did exactly that to a family at Markowa, the children too, so there is nobody in the kitchen who does not know what is being asked.',
    choices: [
      {
        text: 'Take them in. The hayloft, and nobody tells anybody.',
        tag: 'defiant',
        outcome: 'Two years of carrying food up a ladder, and of the dog barking, and of your mother\'s face every time a cart comes up the lane. Nobody tells anybody. They walk out in 1944 thinner than anyone you have ever seen, and alive.',
        effect: (p) => { p.setMem('ww2PlKnock', true); p.m -= 10; p.h -= 4; p.karma += 20; p.addFlag('ww2_pl_hid_someone') },
      },
      {
        text: 'Give them bread, and close the door.',
        tag: 'yielding',
        outcome: 'You give them the bread from the table and the door closes, and you stand behind it and listen to them go. You do not find out what happened to them. You do not try to.',
        effect: (p) => { p.setMem('ww2PlKnock', true); p.m -= 16; p.r += 14; p.addFlag('ww2_pl_closed_the_door') },
      },
    ],
    effect: null,
  },

  {
    id: 'ww2_pl_uprising',
    phase: null,
    weight: 999,
    when: (G) => IN('Poland')(G) && AT('pl_warsaw')(G) && G.currentYear === 1944 && G.age >= 6 && once(G, 'ww2PlRising'),
    text: (G) => G.age >= 14 && G.age <= 25
      ? 'At five in the afternoon on the first of August the whole city comes out at once with whatever it has, and for a few days the flags are up. You carry messages through the sewers because you are small enough and quick. Sixty-three days. At the end the Germans march everyone who is left out of the city past the ruins of it, and then they set about knocking down what is still standing, street by street, on purpose.'
      : 'The city rises and the cellars fill. You live in one for two months with forty people and a bucket, and when you come out there is no street, only the shape of one. The column out of the city walks past the Home Army boys lying in rows. Your mother carries a clock the whole way to Pruszków, because it was the thing she picked up.',
    choices: null,
    effect: (p) => { p.setMem('ww2PlRising', true); p.m -= 20; p.h -= 8; p.r += 8; p.addFlag('ww2_pl_warsaw_uprising'); p.addFlag('warsaw_uprising_generation'); p.addFlag('war_childhood') },
  },

  // ── CHINA ─────────────────────────────────────────────────────────────────

  {
    id: 'ww2_cn_1937',
    phase: null,
    weight: 999,
    when: (G) => IN('China')(G) && G.currentYear === 1937 && G.age >= 4 && once(G, 'ww2Cn37'),
    text: (G) => AT('cn_shanghai')(G)
      ? 'In August the fighting comes into the city itself, and three months of it. The shells fall on Zhabei and the people from Zhabei come over the bridges into the foreign concessions with their bedding on their backs, until the concessions are full and there are people sleeping in every doorway on Nanjing Road. From the roof you watch the north of the city burn like something happening in a film.'
      : AT('cn_beijing')(G)
        ? 'The shooting at the bridge in July is twelve miles off and a week later the soldiers in the streets are Japanese. The city stands. It is somebody else\'s now, and the shopkeepers put up the new flag because the alternative is a conversation nobody wants to have.'
        : 'The news comes up the river weeks late and all at once: Beiping, Shanghai, and then Nanjing in December, and then things about Nanjing that the adults tell each other in low voices and stop telling when you come in. The boats begin arriving from downriver, crowded to the rails, with people who have walked or floated half the length of the country.',
    choices: null,
    effect: (p) => { p.setMem('ww2Cn37', true); p.m -= 12; p.addFlag('ww2_cn_war_generation'); p.addFlag('war_childhood') },
  },

  {
    id: 'ww2_cn_west',
    phase: null,
    weight: 60,
    when: (G) => IN('China')(G) && AT('cn_beijing', 'cn_shanghai')(G) && G.currentYear >= 1937 && G.currentYear <= 1939 && G.age >= 8 && G.age <= 30 && once(G, 'ww2CnWest'),
    text: 'The school goes west, the whole of it — teachers, books, the laboratory glass packed in straw — on foot and by junk and by lorry for a thousand miles, and you go with it. Classes are held in a temple, then under trees, then in a village that has never had a student in it. At night you read by a rapeseed-oil lamp and the older students argue about whether the country will still exist when you graduate.',
    choices: null,
    effect: (p) => { p.setMem('ww2CnWest', true); p.m -= 6; p.e += 5; p.addFlag('ww2_cn_went_west') },
  },

  {
    id: 'ww2_cn_chongqing',
    phase: null,
    weight: 80,
    claimsYears: { from: 1939, to: 1941 },
    when: (G) => IN('China')(G) && AT('cn_chongqing')(G) && G.currentYear >= 1939 && G.currentYear <= 1941 && G.age >= 4 && once(G, 'ww2CnChongqing'),
    text: 'The capital has come to your city and the bombers have followed it. The fog months are the safe months, and in the clear summer the whole city lives by the red lanterns on the hill: one lantern, get ready; two, get to the shelters. In June a tunnel shelter under the city fills and the doors will not open and the people inside suffocate, hundreds of them, and afterwards the tunnels are the only place anybody will go, because the alternative is the sky.',
    choices: null,
    effect: (p) => { p.setMem('ww2CnChongqing', true); p.m -= 16; p.h -= 4; p.addFlag('ww2_cn_bombing') },
  },

  {
    id: 'ww2_cn_conscripted',
    phase: null,
    weight: 60,
    when: (G) => IN('China')(G) && RURAL(G) && MALE(G) && G.currentYear >= 1938 && G.currentYear <= 1945 && G.age >= 17 && G.age <= 35 && once(G, 'ww2CnConscript'),
    text: 'The recruiting officers come at night and they come with rope. Families with money buy a man to go in their son\'s place; families without money hide their sons in the hills. You are walked out of the village tied at the wrist to the man in front, and many of the men on the rope will die of the walk and the fever before they ever see a Japanese soldier.',
    choices: null,
    effect: (p) => { p.setMem('ww2CnConscript', true); p.m -= 14; p.h -= 10; p.addFlag('ww2_cn_conscript'); p.addFlag('served_military') },
  },

  {
    id: 'ww2_cn_surrender',
    phase: null,
    weight: 999,
    when: (G) => IN('China')(G) && G.currentYear === 1945 && G.age >= 5 && once(G, 'ww2CnVictory'),
    text: 'Somebody has a radio and then everybody has the news, and the firecrackers go off all night in a city that has been saving them for eight years. By the winter the two armies that fought the Japanese have turned back towards each other, and the older people, who have been here before, stop celebrating first.',
    choices: null,
    effect: (p) => { p.setMem('ww2CnVictory', true); p.m += 10; p.addFlag('ww2_cn_victory') },
  },

  // ── THE PHILIPPINES ───────────────────────────────────────────────────────

  {
    id: 'ww2_ph_bataan',
    phase: null,
    weight: 999,
    // About 80,000 men surrendered on Bataan, most of them from Luzon units:
    // a minority of the young men of Manila, not all of them.
    when: (G) => IN('Philippines')(G) && AT('ph_manila')(G) && MALE(G) && G.currentYear === 1942 && G.age >= 18 && G.age <= 30 &&
      Math.random() < 0.3 && once(G, 'ww2PhBataan'),
    text: 'You joined in December with half the boys from your town, and by April there is nothing to eat on Bataan but the carabaos and then not them. The surrender comes and then the walk: a hundred kilometres north in the April sun, no water, and the men who fall out of the column are not picked up. At the railhead they pack you into boxcars standing. At the camp at O\'Donnell the dead are buried in the morning and the morning after.',
    choices: null,
    effect: (p) => { p.setMem('ww2PhBataan', true); p.m -= 24; p.h -= 20; p.r += 8; p.addFlag('ww2_ph_bataan'); p.addFlag('served_military'); p.addFlag('combat_veteran') },
  },

  {
    id: 'ww2_ph_occupation',
    phase: null,
    weight: 80,
    claimsYears: { from: 1942, to: 1943 },
    when: (G) => IN('Philippines')(G) && G.currentYear >= 1942 && G.currentYear <= 1944 && G.age >= 8 && once(G, 'ww2PhOcc'),
    text: (G) => RURAL(G)
      ? 'The Japanese hold the towns and the guerrillas hold the hills, and the barrio is in between, feeding whoever comes at night. A boy from the next barrio carries messages in the hollow of a bamboo pole. The garrison burns a village two rivers over for it. Everyone knows who the boy is.'
      : 'The new money has pictures of bananas on it and is worth less every week, and people call it Mickey Mouse money and carry it in bags. You bow to the sentry at the bridge, from the waist, every time. A neighbour goes into Fort Santiago on a Tuesday and his family is still asking at the gate in December.',
    choices: [
      {
        text: 'Help the guerrillas — food, a message, a hiding place.',
        tag: 'defiant',
        outcome: 'You do the small thing that is asked, more than once. The fear is a constant low sound, like the sea.',
        effect: (p) => { p.setMem('ww2PhOcc', true); p.m -= 8; p.karma += 8; p.addFlag('ww2_ph_occupation'); p.addFlag('ww2_ph_helped_guerrillas') },
      },
      {
        text: 'Keep your family out of it.',
        tag: 'yielding',
        outcome: 'You keep your family out of it. It is the whole of what you can do, and some days it feels like enough.',
        effect: (p) => { p.setMem('ww2PhOcc', true); p.m -= 8; p.addFlag('ww2_ph_occupation') },
      },
    ],
    effect: null,
  },

  {
    id: 'ww2_ph_leyte',
    phase: null,
    weight: 999,
    when: (G) => IN('Philippines')(G) && AT('ph_rural')(G) && G.currentYear === 1944 && G.age >= 5 && once(G, 'ww2PhLeyte'),
    text: 'The sea off Leyte fills with ships overnight, more ships than there are in the world, and the guns go on for days. The Americans have come back, as the man said they would. The fighting goes up the island a village at a time and the village is emptied into the forest until it is over, and when you come back the church has no roof and the carabao is gone.',
    choices: null,
    effect: (p) => { p.setMem('ww2PhLeyte', true); p.m -= 6; p.addFlag('ww2_ph_liberation') },
  },

  {
    id: 'ww2_ph_manila_1945',
    phase: null,
    weight: 999,
    when: (G) => IN('Philippines')(G) && AT('ph_manila')(G) && G.currentYear === 1945 && G.age >= 4 && once(G, 'ww2PhManila'),
    text: 'The Americans come in from the north and the Japanese marines hold the old city and the south, and for a month Manila is the battle. The killing inside the walls is done to civilians, house by house. When it is over Intramuros is rubble and a hundred thousand people are dead, and of all the cities in the war only Warsaw has been more completely destroyed. You walk out through Ermita holding a handkerchief over your face.',
    choices: null,
    effect: (p) => { p.setMem('ww2PhManila', true); p.m -= 22; p.h -= 6; p.r += 6; p.addFlag('ww2_ph_liberation'); p.addFlag('ww2_ph_battle_of_manila'); p.addFlag('war_childhood') },
  },

  // ── YUGOSLAVIA ────────────────────────────────────────────────────────────

  {
    id: 'ww2_yu_april',
    phase: null,
    weight: 999,
    when: (G) => YUGOSLAV(G) && G.currentYear === 1941 && G.age >= 4 && once(G, 'ww2YuApril'),
    text: (G) => IN('Serbia')(G)
      ? 'On Palm Sunday the bombers come over Belgrade at dawn without any declaration, and keep coming all day. Eleven days later there is no army and no kingdom. The country is cut up like a cake at a table you were not invited to: this part to Germany, this to Italy, this to Hungary, this to Bulgaria, and a new state in Zagreb with its own ideas about who belongs in it.'
      : IN('Slovenia')(G)
        ? 'The country is divided in a week between three armies. The Germans take the north and start sending Slovenes away to make room; the Italians take Ljubljana; Hungary takes Prekmurje. In the north the signs change language overnight and people are told that their own name is now spelled differently.'
        : 'In April the kingdom falls in eleven days and a new state is declared in Zagreb, with a leader who has been in exile and a militia in black. The radio plays marches. Some of the neighbours are delighted. Others close their shutters, and within the summer you understand which neighbours had reason to.',
    choices: null,
    effect: (p) => { p.setMem('ww2YuApril', true); p.m -= 10; p.addFlag('ww2_yu_war_generation'); p.addFlag('war_childhood') },
  },

  {
    id: 'ww2_yu_ndh_terror',
    phase: null,
    weight: 90,
    when: (G) => IN('Croatia', 'Bosnia and Herzegovina')(G) && ETH('serb_croatia', 'bosnian_serb')(G) &&
      G.currentYear >= 1941 && G.currentYear <= 1942 && G.age >= 4 && once(G, 'ww2YuNdh'),
    text: 'The men in black come to the next village first. After that the whole valley sleeps in the maize and in the forest, and the houses stand empty with the doors open. There is a word for the place on the Sava where the trains go, and people say it the way you would say the name of a disease. Your grandfather goes to the town to see about the papers and does not come back.',
    choices: null,
    effect: (p) => { p.setMem('ww2YuNdh', true); p.m -= 22; p.h -= 6; p.r += 10; p.addFlag('ww2_yu_ndh_survivor'); p.addFlag('displaced') },
  },

  {
    id: 'ww2_yu_kragujevac',
    phase: null,
    weight: 999,
    when: (G) => IN('Serbia')(G) && AT('rs_rural')(G) && G.currentYear === 1941 && G.age >= 6 && once(G, 'ww2YuKrag'),
    text: 'The order is posted in October: for every German soldier killed, one hundred Serbs; for every one wounded, fifty. The partisans kill ten near Gornji Milanovac. In Kragujevac the Germans take the men from the streets and the factories, and the boys from the gymnasium with their teacher, and shoot them in the fields outside the town over a day and a half. Nearly three thousand. The teacher is said to have told the soldiers to shoot him first.',
    choices: null,
    effect: (p) => { p.setMem('ww2YuKrag', true); p.m -= 22; p.r += 10; p.addFlag('ww2_yu_kragujevac'); p.addFlag('war_childhood') },
  },

  {
    id: 'ww2_yu_the_forest',
    phase: null,
    weight: 70,
    when: (G) => YUGOSLAV(G) && G.currentYear >= 1941 && G.currentYear <= 1944 && G.age >= 15 && G.age <= 30 && once(G, 'ww2YuForest'),
    text: 'There are two armies in the hills, and they are fighting the Germans and each other, and each of them wants you. One is the king\'s officers with their beards grown out. The other is the communists, who take women too, and who come through the village with a political officer who reads the newspaper aloud in the square.',
    choices: [
      {
        text: 'Go with the Partisans.',
        tag: 'defiant',
        outcome: 'You march for three years through mountains you had only seen on a map. The fifth offensive, the river, the wounded carried on stretchers for two hundred kilometres. You come down from the hills in 1945 into a country that is now theirs, and yours.',
        effect: (p) => { p.setMem('ww2YuForest', true); p.m -= 10; p.h -= 10; p.addFlag('ww2_yu_partisan'); p.addFlag('served_military'); p.addFlag('combat_veteran') },
      },
      {
        text: 'Stay home and keep the family alive.',
        tag: 'yielding',
        outcome: 'Every army that comes through the village takes something, and you learn to have something ready to be taken. You are still there when it ends. That is what you were trying to be.',
        effect: (p) => { p.setMem('ww2YuForest', true); p.m -= 8; p.addFlag('ww2_yu_stayed') },
      },
    ],
    effect: null,
  },

  {
    id: 'ww2_yu_ljubljana_wire',
    phase: null,
    weight: 999,
    when: (G) => IN('Slovenia')(G) && AT('si_ljubljana')(G) && G.currentYear === 1942 && G.age >= 5 && once(G, 'ww2YuWire'),
    text: 'In February the Italian army puts the whole city inside a fence. Thirty kilometres of barbed wire, with checkpoints at the roads and bunkers every few hundred metres, and a city of eighty thousand people inside it. Your father has a pass to go out to the fields. On the way back through the checkpoint they search the bread.',
    choices: null,
    effect: (p) => { p.setMem('ww2YuWire', true); p.m -= 10; p.addFlag('ww2_yu_wire') },
  },

  {
    id: 'ww2_yu_1945',
    phase: null,
    weight: 999,
    when: (G) => YUGOSLAV(G) && G.currentYear === 1945 && G.age >= 5 && once(G, 'ww2Yu45'),
    text: (G) => ETH('croat', 'slovene')(G) && MALE(G) && G.age >= 18 && G.age <= 40 && !G.flags.includes('ww2_yu_partisan')
      ? 'In May the columns go north toward the Austrian border — soldiers of the defeated state and a great many people who are not soldiers — to surrender to the British. At Bleiburg the British send them back. What happens on the marches home is not spoken of in this country for forty-five years, and you are one of the ones who comes back to not speak of it.'
      : 'It ends in May, with the partisans in the towns and red stars on everything, and a new country whose slogan is that its peoples are brothers. Everybody in the street has somebody missing, and it has become a question you do not ask — missing on whose side — because every family has an answer it would rather not give.',
    choices: null,
    effect: (p) => { p.setMem('ww2Yu45', true); p.m -= 4; p.addFlag('ww2_yu_1945') },
  },

  // ── INDONESIA ─────────────────────────────────────────────────────────────

  {
    id: 'ww2_id_japanese',
    phase: null,
    weight: 999,
    when: (G) => IN('Indonesia')(G) && G.currentYear === 1942 && G.age >= 5 && once(G, 'ww2IdJapan'),
    text: 'The Dutch surrender in nine days. The Japanese arrive on bicycles and are cheered in some streets, because they say Asia for the Asians and because the Dutch officials are marched off to camps with their own suitcases. Within the year the rice is being collected by quota and the cheering has stopped, and you are learning to bow toward Tokyo at school every morning.',
    choices: null,
    effect: (p) => { p.setMem('ww2IdJapan', true); p.m -= 6; p.addFlag('ww2_id_occupation') },
  },

  {
    id: 'ww2_id_romusha',
    phase: null,
    weight: 70,
    when: (G) => IN('Indonesia')(G) && RURAL(G) && MALE(G) && G.currentYear >= 1943 && G.currentYear <= 1945 && G.age >= 16 && G.age <= 40 && once(G, 'ww2IdRomusha'),
    text: 'The headman is given a number and has to find the men. They call it romusha, labour soldiers, and the lorry takes you to a railway being cut through a jungle on another island, where the men die faster than the rails go down. The ones who come back to the village are not many, and they come back looking like the old men in the photographs of the famine.',
    choices: null,
    effect: (p) => { p.setMem('ww2IdRomusha', true); p.m -= 22; p.h -= 18; p.addFlag('ww2_id_romusha') },
  },

  {
    id: 'ww2_id_merdeka',
    phase: null,
    weight: 999,
    when: (G) => IN('Indonesia')(G) && G.currentYear === 1945 && G.age >= 6 && once(G, 'ww2IdMerdeka'),
    text: 'A man in Jakarta reads two sentences on the seventeenth of August and the country exists. The news reaches you by radio, by rumour, by a boy on a bicycle shouting it. Merdeka. By the autumn the British are landing to take the Japanese surrender and the Dutch are coming behind them, and in Surabaya in November the city fights both, and loses, and is not sorry.',
    choices: [
      {
        text: 'Join the young men with the bamboo spears and the captured rifles.',
        tag: 'defiant',
        outcome: 'Four years. The Dutch take the cities and the Republic takes the villages and the war goes on in between, until the Dutch sign in 1949 and you are a citizen of the thing you fought for.',
        effect: (p) => { p.setMem('ww2IdMerdeka', true); p.m += 6; p.h -= 6; p.addFlag('ww2_id_revolusi'); p.addFlag('served_military') },
      },
      {
        text: 'Keep your head down and wait to see whose country it becomes.',
        tag: 'yielding',
        outcome: 'It becomes yours, in 1949, whatever you did. You are not sure, later, what you would say if someone asked where you were.',
        effect: (p) => { p.setMem('ww2IdMerdeka', true); p.m += 4; p.addFlag('ww2_id_revolusi') },
      },
    ],
    effect: null,
  },

  // ── KOREA ─────────────────────────────────────────────────────────────────

  {
    id: 'ww2_kr_names',
    phase: null,
    weight: 999,
    when: (G) => IN('South Korea', 'North Korea')(G) && G.currentYear === 1940 && G.age >= 5 && once(G, 'ww2KrNames'),
    text: 'The order is that every family takes a Japanese name. Your father goes to the office with your grandfather\'s permission and comes home with a surname nobody in the family has ever said aloud. At school the new name is called in the register and you do not answer, because you do not know yet that it is you, and the teacher waits, and then you answer.',
    choices: null,
    effect: (p) => { p.setMem('ww2KrNames', true); p.m -= 10; p.addFlag('ww2_kr_japanese_name') },
  },

  {
    id: 'ww2_kr_mobilised',
    phase: null,
    weight: 70,
    when: (G) => IN('South Korea', 'North Korea')(G) && G.currentYear >= 1941 && G.currentYear <= 1945 && G.age >= 14 && G.age <= 30 && once(G, 'ww2KrMob'),
    text: (G) => MALE(G)
      ? 'The notice comes for the mines in Kyushu. The pay is written on it and the pay is not what arrives. You work underground in a seam that the Japanese miners will not work, and write home in a language the censor reads, and in 1944 the notice comes again, this time for the army.'
      : 'A man from the district office comes about work for girls in factories in Japan, good wages, and your mother tells him you are already promised and married, which is not true, and you are married in the spring to a boy from the next village you have met twice. Half the village does the same. Nobody says why out loud.',
    choices: null,
    effect: (p) => { p.setMem('ww2KrMob', true); p.m -= 14; p.addFlag(p._state?.character?.gender === 'female' ? 'ww2_kr_hidden_by_marriage' : 'ww2_kr_labour_mobilised') },
  },

  {
    id: 'ww2_kr_liberation',
    phase: null,
    weight: 999,
    when: (G) => IN('South Korea', 'North Korea')(G) && G.currentYear === 1945 && G.age >= 5 && once(G, 'ww2KrLib'),
    text: 'At noon the Emperor speaks on the radio in a language nobody in the village understands the court version of, and by evening the flags come out of the places they have been hidden for thirty-five years. Everyone shouts the word for it. Within a month there are Soviet soldiers in the north and American ones in the south, and a line drawn on a map at the thirty-eighth parallel by two colonels in an afternoon.',
    choices: null,
    effect: (p) => { p.setMem('ww2KrLib', true); p.m += 14; p.addFlag('ww2_kr_liberation') },
  },
]

// Written first. Each is the echo of one flag, at the distance it arrives.
export const SECOND_WORLD_WAR_FOLLOWTHROUGH = [

  {
    id: 'ww2_ft_righteous',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('ww2_pl_hid_someone') && G.currentYear >= 1963 && G.age >= 30 && once(G, 'ww2FtRighteous'),
    text: 'A letter from Jerusalem, in Polish and in Hebrew, and then a ceremony in the embassy with a tree and a medal. One of the children from the hayloft is there, a grandmother now, and she holds your hand through the speeches without saying anything. On the way home a man from your own village says, not unkindly, that it is better not to mention it around here. You find that he is right, and you mind that more than anything that happened in the war.',
    choices: null,
    effect: (p) => { p.setMem('ww2FtRighteous', true); p.m += 10; p.karma += 6; p.addFlag('ww2_pl_righteous') },
  },

  {
    id: 'ww2_ft_closed_door',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('ww2_pl_closed_the_door') && G.age >= 55 && once(G, 'ww2FtDoor'),
    text: 'A historian comes to the village with a recorder, collecting what people remember about the war years, and sits in your kitchen. You tell her about the notices and the trucks and the winter. She asks, gently, whether anybody ever came to the door. You have had fifty years to decide what to say to that question, and you find you have not decided.',
    choices: null,
    effect: (p) => { p.setMem('ww2FtDoor', true); p.r += 4; p.addFlag('ww2_pl_the_question') },
  },

  {
    id: 'ww2_ft_bataan_veteran',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('ww2_ph_bataan') && G.currentYear >= 2009 && G.currentYear <= 2012 && once(G, 'ww2FtBataan'),
    text: 'In 1946 the Americans passed a law taking back what they had promised the men who fought for them, and sixty-three years later they pass another one that pays the ones still alive a lump sum. There are not many of you left to queue for it. You go with your grandson, in the barong you wear to funerals, and sign where he shows you.',
    choices: null,
    effect: (p) => { p.setMem('ww2FtBataan', true); p.m += 4; p.mo += 9000; p.addFlag('ww2_ph_equity_paid') },
  },

  {
    id: 'ww2_ft_partisan_pension',
    phase: null,
    weight: 55,
    when: (G) => G.flags.includes('ww2_yu_partisan') && G.currentYear >= 1992 && G.currentYear <= 1996 && once(G, 'ww2FtPartisan'),
    text: 'The country you fought three years to make is coming apart on the television, and the men doing it are the grandsons of both of the armies in the hills. Your partisan pension is paid in a currency that loses half its value while you walk home from the post office. You take the star off your jacket for Victory Day this year, and then you put it back on, because you would rather be wrong than be told what you were.',
    choices: null,
    effect: (p) => { p.setMem('ww2FtPartisan', true); p.m -= 8; p.r += 6; p.addFlag('ww2_yu_partisan_after') },
  },

  {
    id: 'ww2_ft_kim_hak_sun',
    phase: null,
    weight: 70,
    when: (G) => G.flags.includes('ww2_kr_hidden_by_marriage') && G.currentYear >= 1991 && G.currentYear <= 1993 && once(G, 'ww2FtKim'),
    text: 'A woman your own age sits in front of the cameras in Seoul and says what was done to her, in her own name, for the first time in fifty years. The factory work for girls in Japan. You watch it in the kitchen with your husband, the boy from the next village, now an old man, and neither of you says anything for a long time, and then he reaches over and turns up the sound.',
    choices: null,
    effect: (p) => { p.setMem('ww2FtKim', true); p.m -= 4; p.r -= 4; p.addFlag('ww2_kr_1991') },
  },
]

export const SECOND_WORLD_WAR_TEXTURE_FLAGS = [
  'ww2_pl_occupation', 'ww2_pl_secret_school', 'ww2_pl_ghetto_witness', 'ww2_pl_warsaw_uprising',
  'ww2_cn_war_generation', 'ww2_cn_went_west', 'ww2_cn_bombing', 'ww2_ph_occupation', 'ww2_ph_battle_of_manila',
  'ww2_yu_ndh_survivor', 'ww2_yu_kragujevac', 'ww2_id_romusha', 'ww2_kr_japanese_name',
]

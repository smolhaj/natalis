// events_unwritten_west_africa.js — six populations the roster draws and no
// guard had ever named.
//
// `unwritten-group` reported them together: the Kabye of Togo (22%), the
// Zarma-Songhai (21%) and Tuareg (11%) of Niger, the Susu of Guinea (20%), the
// Burkinabè and Malian families of Ivory Coast (18%), and Algeria's "other"
// Berbers (14%) — here the Chaoui of the Aurès and the Mozabites of the M'zab,
// told apart by where the character lives rather than by id, since the roster
// holds them under one.
//
// Each group gets what is specific to it rather than what is true of the whole
// country. For the Kabye that is being the people of the man in the palace, and
// what that costs in Lomé. For the Burkinabè in the cocoa belt it is the paper
// that says you are not from where you were born.
//
// Dates used, all checked.
// Togo: Eyadéma takes power 13 January 1967 and dies 5 February 2005; the army
// installs Faure Gnassingbé the same day; he steps down 25 February under
// ECOWAS pressure and wins the election of 24 April 2005, after which the UN
// counted 400 to 500 dead and some 40,000 fled to Benin and Ghana. Evala, the
// wrestling of young Kabye men, is held every July in the Kara region. The
// protests of August 2017 were led by Tikpi Atchadam of the PNP, a Tem from
// Sokodé, and the internet was cut in September 2017.
// Niger: the Sahel drought of 1968-74; Seyni Kountché's coup of 15 April 1974
// against Diori Hamani over the diversion of food aid. Ghana's Aliens
// Compliance Order of 18 November 1969 gave foreigners two weeks to leave. The
// drought of 1984. Students shot on the Kennedy Bridge in Niamey, 9 February
// 1990. The attack on the Tchin-Tabaradene gendarmerie on 7 May 1990 and the
// army reprisals against returnees from Libya and Algeria. The peace accord of
// 24 April 1995. The MNJ rising from February 2007 to 2009. SOMAÏR at Arlit
// from 1971, COMINAK at Akouta from 1978. The salt caravan to Bilma.
// Guinea: the market women's revolt of 27 August 1977 against the economic
// police, which Sékou Touré then disbanded. Touré dies 26 March 1984; Lansana
// Conté, a Susu, takes power on 3 April 1984 and frees the Camp Boiro
// prisoners. The general strike of January-February 2007, martial law on 12
// February, some 130 dead. Conté dies 22 December 2008.
// Ivory Coast: Houphouët-Boigny's "the land belongs to whoever puts it to use"
// (1963). The carte de séjour for foreigners from 1990. Ivoirité from 1994-95.
// The rural land law of 23 December 1998. Tabou, November 1999. The mutiny of 19
// September 2002 and the burning of Abidjan's shantytowns; Burkina Faso's
// Opération Bayiri repatriation from November 2002. Ouattara sworn in May 2011.
// The nationality-by-declaration law of September 2013.
// Algeria: 1 November 1954 in the Aurès — Batna, Khenchela, Arris, and the bus
// stopped in the Tighanimine gorge where the teacher Guy Monnerot was killed.
// Mostefa Ben Boulaïd led the Aurès. The Ghardaïa clashes, December 2013 to July
// 2015, worst in Guerrara in July 2015; Kamel Eddine Fekhar arrested July 2015.

const once = (G, key) => !G.mem?.[key]
const liveName = (G) => G.currentCountry?.name ?? G.character?.country?.name
const MALE = (G) => G.character?.gender === 'male'
const FEMALE = (G) => G.character?.gender === 'female'

// Togo — Kabye
const KBY = (G) => G.character?.ethnicity === 'kabye_togo' && liveName(G) === 'Togo'
// Niger — Zarma-Songhai and Tuareg
const ZRM = (G) => G.character?.ethnicity === 'zarma_songhai' && liveName(G) === 'Niger'
const TUA = (G) => G.character?.ethnicity === 'tuareg_niger' && liveName(G) === 'Niger'
// Guinea — Susu
const SUSU = (G) => G.character?.ethnicity === 'susu_guinean' && liveName(G) === 'Guinea'
// Ivory Coast — Burkinabè and Malian families
const MWA = (G) => G.character?.ethnicity === 'migrant_west_africa' && liveName(G) === 'Ivory Coast'
// Algeria — Chaoui of the Aurès, Mozabites of the M'zab
const BER = (G) => G.character?.ethnicity === 'berber_other' && liveName(G) === 'Algeria'
const AURES = (G) => G.place?.id === 'dz_aures' || G.character?.birthPlace?.id === 'dz_aures' || G.character?.birthPlace === 'dz_aures'
const CHAOUI = (G) => BER(G) && AURES(G)
const MZAB = (G) => BER(G) && !AURES(G) && !!G.mem?.uwa_mzab

export const UNWRITTEN_WA_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each is what a flag set further down becomes years later.

  {
    id: 'uwa_ft_kby_evala',
    phase: null,
    weight: 280,
    when: (G) => KBY(G) && G.flags.includes('uwa_kby_evala_wrestled') && G.age >= 45 && once(G, 'uwa_ft_kby_evala'),
    text: 'In July you go up to the ring again, this time to stand with the old men at the edge of it. The boys are oiled and chalked the way you were, and their mothers call their names from the crowd the way yours did. One of them is thrown on his back in the first seconds and gets up laughing, the right way to lose. You find you still know which hold is coming before it comes.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_kby_evala', true); p.m += 4; p.h -= 1 },
  },

  {
    id: 'uwa_ft_kby_2017',
    phase: null,
    weight: 280,
    when: (G) => KBY(G) && G.flags.includes('uwa_kby_2005_witness') && G.currentYear >= 2017 && G.currentYear <= 2019 && G.age >= 25 && once(G, 'uwa_ft_kby_2017'),
    text: 'In August the marches start again, and this time the man leading them is from Sokodé, a Tem, a northerner. It was easier when it was the south against the north, a neighbour says, and nobody on the veranda answers him. In September the internet goes off across the country and the phones become radios that cannot receive. You remember 2005 and keep the children inside before anybody tells you to.',
    context: 'The protests of 2017 were led by Tikpi Atchadam of the Parti National Panafricain, a Tem from Sokodé in the centre-north, which unsettled the long reading of Togolese politics as a Kabye north against an Ewe south. The government cut mobile internet in September 2017. In 2019 the constitution was amended to allow Faure Gnassingbé to stand again.',
    choices: [
      {
        text: 'Go to the march in your own town',
        tag: 'defiant',
        outcome: 'There are more people from the north in the road than you expected. Nobody asks where you are from. That is new.',
        effect: (p) => { p.setMem('uwa_ft_kby_2017', true); p.karma += 3; p.h -= 2 },
      },
      {
        text: 'Stay on the veranda and listen for it',
        tag: 'yielding',
        outcome: 'You hear the march from a street away, and then the tear gas, and then the evening.',
        effect: (p) => { p.setMem('uwa_ft_kby_2017', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_ft_zrm_1984',
    phase: null,
    weight: 280,
    when: (G) => ZRM(G) && G.flags.includes('uwa_zrm_drought_1973') && G.currentYear >= 1984 && G.currentYear <= 1985 && once(G, 'uwa_ft_zrm_1984'),
    text: 'The rains fail again, and this time you know what the signs mean before the old men say it. The millet heads come up empty, the herders arrive at the river with cattle whose hips you can count from across the road, and the price of a sack doubles, then doubles. Eleven years ago you watched this as a child. Now you are one of the people deciding who eats first.',
    context: 'The drought of 1984 was, in much of Niger, worse than 1973. Seyni Kountché, who had taken power in the first drought, ran the response through the army and the village cooperatives, and the harvest that year fell to roughly half of need.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_zrm_1984', true); p.h -= 4; p.m -= 4; p.e += 2 },
  },

  {
    id: 'uwa_ft_tua_2007',
    phase: null,
    weight: 280,
    when: (G) => TUA(G) && G.flags.includes('uwa_tua_tchin_1990') && G.currentYear >= 2007 && G.currentYear <= 2009 && G.age >= 25 && once(G, 'uwa_ft_tua_2007'),
    text: 'In February the young men go back up into the Aïr and call themselves the MNJ, and their demands are the ones the 1995 accord already signed. Your nephew was not born in 1990. The tourists stop coming to Agadez inside a season, and the men who guided them up to the mountains sell their Land Cruisers or drive them north. On the road to Arlit there are mines now, and a minibus goes over one.',
    context: 'The Mouvement des Nigériens pour la Justice began its rising with an attack at Iferouane in February 2007, citing the unfulfilled terms of the 1995 peace and the uranium wealth of the north. Landmines laid on the roads around Agadez killed civilians in 2007 and 2008. A Libyan-brokered peace followed in 2009.',
    choices: [
      {
        text: 'Tell your nephew what 1990 was',
        tag: null,
        outcome: 'He listens, and you cannot tell whether you have talked him out of it or into it.',
        effect: (p) => { p.setMem('uwa_ft_tua_2007', true); p.karma += 2; p.r += 2 },
      },
      {
        text: 'Say nothing and watch the road',
        tag: null,
        outcome: 'He leaves at night in April. His mother does not say where, and you do not ask.',
        effect: (p) => { p.setMem('uwa_ft_tua_2007', true); p.r += 5; p.m -= 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_ft_susu_market',
    phase: null,
    weight: 260,
    when: (G) => SUSU(G) && G.flags.includes('uwa_susu_market_1977') && G.age >= 45 && G.currentYear >= 1990 && once(G, 'uwa_ft_susu_market'),
    text: 'The girls at the next stall in Madina were born after the economic police, and they cannot imagine a man in uniform weighing their tomatoes and naming the price. You tell them about the August morning the women walked to the palace with their pans on their heads. They listen politely and then go back to their phones and their prices. It is exactly what you walked for.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_susu_market', true); p.m += 4; p.karma += 2 },
  },

  {
    id: 'uwa_ft_susu_2007',
    phase: null,
    weight: 280,
    when: (G) => SUSU(G) && G.flags.includes('uwa_susu_conte_1984') && G.currentYear === 2007 && G.age >= 30 && once(G, 'uwa_ft_susu_2007'),
    text: 'In January the unions call a general strike, and Conakry closes like a hand. The man who came on the radio in 1984 and emptied Camp Boiro is old now and diabetic and rarely seen, and the soldiers firing at the marches on the bridges are his. At the market people speak Susu the way they always have, and for the first time you hear it said, low, that his people have eaten long enough. In February there is martial law, and the city stays indoors.',
    context: 'The strike that began on 10 January 2007 demanded that the ailing Lansana Conté give up power to a prime minister. Security forces killed around 130 people over January and February; martial law was declared on 12 February, and Conté appointed Lansana Kouyaté prime minister at the end of the month. He died in office in December 2008.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_susu_2007', true); p.m -= 5; p.r += 3; p.e += 2 },
  },

  {
    id: 'uwa_ft_mwa_land',
    phase: null,
    weight: 280,
    when: (G) => MWA(G) && G.flags.includes('uwa_mwa_cocoa_child') && G.currentYear >= 1999 && G.currentYear <= 2004 && G.age >= 20 && once(G, 'uwa_ft_mwa_land'),
    text: (G) => `The new land law says that only Ivorians may own rural land, and the trees your father planted are on rural land. Houphouët said the land belongs to whoever works it, and your father worked it, and Houphouët is ${G.currentYear - 1993} years dead. ${G.currentYear === 1999 ? 'In November the Kroumen in Tabou drive out the Burkinabè in their thousands, and the lorries go north full.' : 'Since Tabou, everybody knows how quickly a boundary can move.'} The chief who gave your father the forest has died, and his son has started walking the boundary on Sundays.`,
    context: 'The rural land law of December 1998 restricted ownership of customary land to Ivorian citizens, turning plots that migrants had bought or been granted into, at best, long leases. In Tabou in November 1999 between eight and twenty thousand Burkinabè were expelled in a single month.',
    choices: [
      {
        text: 'Go to the chief\'s son with a gift',
        tag: 'yielding',
        outcome: 'He takes the envelope and the chicken and says the boundary is where it has always been, for now.',
        effect: (p) => { p.setMem('uwa_ft_mwa_land', true); p.mo -= 400; p.r += 2 },
      },
      {
        text: 'Go to the prefecture with the old paper',
        tag: 'defiant',
        outcome: 'The clerk reads the paper twice and says it is a paper. You wait four hours to be told so.',
        effect: (p) => { p.setMem('uwa_ft_mwa_land', true); p.m -= 3; p.e += 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_ft_mwa_2011',
    phase: null,
    weight: 280,
    when: (G) => MWA(G) && G.flags.includes('uwa_mwa_2002_war') && G.currentYear >= 2011 && G.currentYear <= 2016 && once(G, 'uwa_ft_mwa_2011'),
    text: (G) => `The man they spent a decade saying was not Ivorian is president now, and at the checkpoint on the Bouaké road the soldiers wave you through without asking for the card. ${G.currentYear >= 2013 ? 'A new law lets people like you, born here, declare the nationality you were always told you did not have. You queue for it with your birth certificate in a plastic sleeve.' : 'Nobody knows yet what it will mean on paper.'} The houses in the quarter that burned in 2002 have been rebuilt by other people. You do not trust the quiet, and you notice that you do not.`,
    context: 'Alassane Ouattara, whose eligibility had been contested for years on grounds of his parents\' origin, was sworn in in May 2011 after the post-election war. A law of September 2013 opened a procedure for long-resident foreigners and people born in Ivory Coast to foreign parents to acquire nationality by declaration.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_mwa_2011', true); p.m += 3; p.r += 2 },
  },

  {
    id: 'uwa_ft_ber_novembre',
    phase: null,
    weight: 260,
    when: (G) => CHAOUI(G) && G.flags.includes('uwa_ber_aures_1954') && G.age >= 38 && G.currentYear >= 1975 && once(G, 'uwa_ft_ber_novembre'),
    text: 'Every first of November the television shows the Aurès, and every year the story is told in an Arabic your mother never spoke. The men on the screen are called martyrs of the nation; in the village they were called by their fathers\' names, and by nicknames the television does not know. Streets and schools carry Ben Boulaïd\'s name now. You remember the night the dogs would not stop, and the house emptied of men by morning.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ft_ber_novembre', true); p.r += 3; p.e += 2 },
  },

  // ── TOGO — THE KABYE ───────────────────────────────────────────────────────

  {
    id: 'uwa_kby_evala',
    phase: null,
    weight: 35,
    when: (G) => KBY(G) && MALE(G) && G.age >= 17 && G.age <= 20 && G.currentYear >= 1950 && once(G, 'uwa_kby_evala'),
    text: (G) => `This is your year. In July you go into the ring on the hillside above Kara with the other boys of your age, your body rubbed with shea butter, your mother in the crowd calling your name the way she called it in the fields. The wrestling is the price of being a man here, and nobody pays it for you.${G.currentYear >= 1967 && G.currentYear <= 2004 ? ' The President comes up from Lomé and sits in the shade in the best chair, because this is his country\'s ring too, and the old men say he wrestled in it as a boy.' : ''}`,
    context: 'Evala is the initiation of young Kabye men, a season of wrestling held each July in the Kara region. Gnassingbé Eyadéma, a Kabye from Pya, attended it through his thirty-eight years in power, and it became as much a political occasion as a rite.',
    choices: [
      {
        text: 'Go in hard from the first hold',
        tag: null,
        outcome: 'You are thrown once and throw twice. For a week you cannot lift your arm above your shoulder, and it does not matter.',
        effect: (p) => { p.setMem('uwa_kby_evala', true); p.h -= 2; p.m += 5; p.s += 2; p.addFlag('uwa_kby_evala_wrestled') },
      },
      {
        text: 'Wrestle carefully and stay on your feet',
        tag: null,
        outcome: 'You do not win anything and you do not go down. Your uncle says that is also a way.',
        effect: (p) => { p.setMem('uwa_kby_evala', true); p.m += 2; p.addFlag('uwa_kby_evala_wrestled') },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_kby_army_town',
    phase: null,
    weight: 30,
    when: (G) => KBY(G) && G.place?.id === 'tg_lome' && G.currentYear >= 1975 && G.currentYear <= 2004 && G.age >= 8 && G.age <= 18 && once(G, 'uwa_kby_army_town'),
    text: 'In Lomé, when people hear your name, they hear the army. Half the boys from your village are soldiers, because the army is the one door the President left open for the north, and the soldiers at the roadblocks answer each other in Kabye. The Ewe girl at the next desk says nothing to you about it, which says it. Your grandmother still carries yams on her head up the hill paths in Kara, and nobody in Lomé would believe that.',
    choices: null,
    effect: (p) => { p.setMem('uwa_kby_army_town', true); p.e += 2; p.m -= 2 },
  },

  {
    id: 'uwa_kby_2005',
    phase: null,
    weight: 400,
    when: (G) => KBY(G) && G.currentYear === 2005 && G.age >= 12 && once(G, 'uwa_kby_2005'),
    text: 'On the fifth of February the radio says the President is dead, and by night the soldiers have made his son President in his place. In April there is an election, and after it Lomé burns: the opposition quarters against the soldiers, and the northerners in the opposition quarters against both. Kabye families in Bè are pulled out of their houses by boys who knew their names. Tens of thousands walk across the borders into Benin and Ghana.',
    context: 'Gnassingbé Eyadéma died on 5 February 2005 after thirty-eight years in power; the army installed his son Faure Gnassingbé the same day. Under regional pressure he stepped down, then won the election of 24 April. The UN later estimated four to five hundred killed in the violence that followed and some forty thousand refugees.',
    choices: [
      {
        text: 'Keep everyone inside with the door barred',
        tag: 'yielding',
        outcome: 'For three days you listen to the street through the shutters. The house next to yours is empty when you open the door.',
        effect: (p) => { p.setMem('uwa_kby_2005', true); p.m -= 6; p.r += 3; p.addFlag('uwa_kby_2005_witness') },
      },
      {
        text: 'Hide the Ewe family from next door',
        tag: 'defiant',
        outcome: 'They sleep in your back room for four nights. Afterwards neither family speaks of it, and both remember.',
        effect: (p) => { p.setMem('uwa_kby_2005', true); p.m -= 4; p.karma += 6; p.addFlag('uwa_kby_2005_witness') },
      },
    ],
    effect: null,
  },

  // ── NIGER — THE ZARMA-SONGHAI ──────────────────────────────────────────────

  {
    id: 'uwa_zrm_ghana_1969',
    phase: null,
    weight: 60,
    when: (G) => ZRM(G) && G.currentYear >= 1969 && G.currentYear <= 1970 && G.age >= 5 && G.age <= 17 && once(G, 'uwa_zrm_ghana'),
    text: 'Your father comes home from Kumasi in a lorry full of men and cooking pots, with a radio and a blanket and nothing else he took twelve years to buy. Ghana has given every foreigner two weeks to leave, and in Ghana a Zarma is a Zabrama, a foreigner, whatever the market in Kumasi owed him. He sits in the compound for a month without saying where he has been. At night you hear him tell your mother the names of the streets.',
    context: 'Zarma men had migrated seasonally to the Gold Coast since the 1920s, working the markets and the docks. Ghana\'s Aliens Compliance Order of 18 November 1969 gave undocumented foreigners two weeks to leave; hundreds of thousands did, many of them Nigeriens.',
    choices: null,
    effect: (p) => { p.setMem('uwa_zrm_ghana', true); p.m -= 3; p.e += 1 },
  },

  {
    id: 'uwa_zrm_drought_1973',
    phase: null,
    weight: 400,
    when: (G) => ZRM(G) && G.currentYear >= 1973 && G.currentYear <= 1974 && G.age >= 6 && once(G, 'uwa_zrm_drought'),
    text: 'The river is so low that you can walk out to the islands where the rice was, and the rice is not there. Herders come down from the north with nothing and set up shelters at the edge of Niamey, and the aid sacks from America are stacked in a warehouse that everybody walks past. In April the soldiers take the radio, and Kountché says the old government sold the food. Some of it is in the market by May.',
    context: 'The Sahel drought of 1968-74 killed a large share of Niger\'s herds and left hundreds of thousands dependent on food aid. On 15 April 1974 Lieutenant-Colonel Seyni Kountché, a Zarma, overthrew Diori Hamani, citing the diversion of relief grain. He ruled until his death in 1987.',
    choices: null,
    effect: (p) => { p.setMem('uwa_zrm_drought', true); p.h -= 4; p.m -= 5; p.addFlag('uwa_zrm_drought_1973') },
  },

  {
    id: 'uwa_zrm_kennedy_bridge',
    phase: null,
    weight: 300,
    when: (G) => ZRM(G) && G.currentYear === 1990 && G.age >= 16 && G.age <= 28 && once(G, 'uwa_zrm_bridge'),
    text: 'On the ninth of February the students march from the university across the Kennedy Bridge toward the centre, about their grants and their exams. The police are waiting on the far bank. Three of them do not come back across the river, and for weeks the city talks about nothing else, in cafés and in whispers at the tailor\'s. By the end of the year Saibou has agreed to a conference and parties, and people say the bridge paid for it.',
    context: 'On 9 February 1990 police fired on students crossing the Kennedy Bridge in Niamey; at least three were killed. The protests that followed pushed Ali Saibou\'s military government into the national conference of 1991 and multiparty elections in 1993.',
    choices: [
      {
        text: 'Cross the bridge with them',
        tag: 'defiant',
        outcome: 'You are near the front when the shooting starts. You run with the others back toward the university, and nobody stops running until the gate.',
        effect: (p) => { p.setMem('uwa_zrm_bridge', true); p.h -= 3; p.karma += 4; p.r += 2 },
      },
      {
        text: 'Watch it from the bank',
        tag: 'yielding',
        outcome: 'You see the crowd stop on the bridge, and then scatter. You see it for years afterward.',
        effect: (p) => { p.setMem('uwa_zrm_bridge', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  // ── NIGER — THE TUAREG ─────────────────────────────────────────────────────

  {
    id: 'uwa_tua_caravan',
    phase: null,
    weight: 35,
    when: (G) => TUA(G) && MALE(G) && G.age >= 14 && G.age <= 30 && G.currentYear >= 1945 && G.currentYear <= 2006 && once(G, 'uwa_tua_caravan'),
    text: 'In October the camels leave the Aïr for Bilma, a line of them tied nose to tail, and this year you walk with them instead of waving them off. Three weeks across the Ténéré, where there is nothing to steer by but the older men and the stars. The salt comes back in cones wrapped in straw, and the dates in sacks. You learn that the desert is not empty; it is simply full of things you cannot yet read.',
    choices: null,
    effect: (p) => { p.setMem('uwa_tua_caravan', true); p.h += 2; p.e += 3; p.m += 3 },
  },

  {
    id: 'uwa_tua_tchin_1990',
    phase: null,
    weight: 400,
    when: (G) => TUA(G) && G.currentYear === 1990 && G.age >= 8 && once(G, 'uwa_tua_tchin'),
    text: 'The young men who went to Libya and Algeria in the drought years have been sent home with a promise of help, and the help is a camp outside Tchin-Tabaradene. In May some of them attack the gendarmerie. The soldiers who come afterwards do not ask which men did it; they ask who is Tuareg. Your cousin is taken from a well with his camels and not seen again.',
    context: 'Thousands of Tuareg who had left for Libya and Algeria after the droughts of 1973 and 1984 were repatriated in 1989-90 on promises of reintegration aid that largely did not arrive. After an attack on the gendarmerie at Tchin-Tabaradene on 7 May 1990 the army carried out reprisals in which Tuareg sources count hundreds dead. The rebellion that followed lasted until the accord of April 1995.',
    choices: null,
    effect: (p) => { p.setMem('uwa_tua_tchin', true); p.m -= 8; p.r += 4; p.addFlag('uwa_tua_tchin_1990') },
  },

  {
    id: 'uwa_tua_arlit',
    phase: null,
    weight: 30,
    when: (G) => TUA(G) && MALE(G) && G.age >= 20 && G.age <= 45 && G.currentYear >= 1972 && G.currentYear <= 2020 && once(G, 'uwa_tua_arlit'),
    text: 'The mine at Arlit pays in a month what a herd earns in a year, and so you go. The town has a cinema, running water, streets laid out by French engineers, and a dust that settles on everything and is the colour of nothing. The French managers live in the cité with the swimming pool. On Fridays you send money home to Agadez and wash the grey out of your turban, and it never all comes out.',
    context: 'Uranium mining began at Arlit with SOMAÏR in 1971 and at Akouta with COMINAK in 1978, both operated by French companies. From the 2000s independent laboratories reported radioactive contamination in the town\'s dust, scrap metal and water.',
    choices: null,
    effect: (p) => { p.setMem('uwa_tua_arlit', true); p.mo += 1500; p.h -= 3 },
  },

  // ── GUINEA — THE SUSU ──────────────────────────────────────────────────────

  {
    id: 'uwa_susu_market_1977',
    phase: null,
    weight: 400,
    when: (G) => SUSU(G) && FEMALE(G) && G.currentYear === 1977 && G.age >= 15 && once(G, 'uwa_susu_market'),
    text: 'The economic police weigh your tomatoes, fix your price and take what they like home in the evening. On the twenty-seventh of August the women of Madina market have had enough. They leave their stalls and walk, hundreds of them and then thousands, singing in Susu toward the palace, and some carry their empty pans. The President has always called the women of Conakry his base.',
    context: 'On 27 August 1977 market women in Conakry, protesting the economic police that enforced Sékou Touré\'s ban on private trade, marched on the presidential palace; there were protests and deaths in other towns. Touré disbanded the economic police and loosened the trade restrictions within weeks.',
    choices: [
      {
        text: 'Walk with them',
        tag: 'defiant',
        outcome: 'By the end of the day your feet are bleeding and your voice is gone. Within the month the economic police are gone too.',
        effect: (p) => { p.setMem('uwa_susu_market', true); p.karma += 5; p.m += 4; p.addFlag('uwa_susu_market_1977') },
      },
      {
        text: 'Guard your cousin\'s stall while she walks',
        tag: 'yielding',
        outcome: 'You sell nothing all day. When she comes back she sits on the sack of rice and laughs until she cries.',
        effect: (p) => { p.setMem('uwa_susu_market', true); p.m += 2; p.addFlag('uwa_susu_market_1977') },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_susu_conte_1984',
    phase: null,
    weight: 400,
    when: (G) => SUSU(G) && G.currentYear === 1984 && G.age >= 10 && once(G, 'uwa_susu_conte'),
    text: 'A week after Sékou Touré dies, soldiers take the radio, and the new man speaks in a French that sounds like the villages behind Dubréka. He is one of yours. Within days the gates of Camp Boiro are open and the men who come out do not look like the photographs their families kept. In the market someone says the Malinké have eaten for twenty-six years, and now it is somebody else\'s turn.',
    context: 'Lansana Conté, a Susu army officer, took power on 3 April 1984, a week after Sékou Touré\'s death, and released the prisoners of Camp Boiro. He ruled Guinea for twenty-four years, and many Guineans came to read his rule through ethnicity as they had read Touré\'s.',
    choices: null,
    effect: (p) => { p.setMem('uwa_susu_conte', true); p.m += 4; p.addFlag('uwa_susu_conte_1984') },
  },

  // ── IVORY COAST — BURKINABÈ AND MALIAN FAMILIES ────────────────────────────

  {
    id: 'uwa_mwa_cocoa_child',
    phase: null,
    weight: 40,
    when: (G) => MWA(G) && G.age >= 6 && G.age <= 13 && G.currentYear >= 1965 && G.currentYear <= 1995 && once(G, 'uwa_mwa_cocoa'),
    text: (G) => `Your father came down from ${G.currentYear >= 1984 ? 'Burkina' : 'Upper Volta'} on the train when he was sixteen, and cleared this forest with a machete and fire, and planted it with cocoa. You were born here, under the trees he planted. At harvest you split the pods with the other children and scoop the white beans onto banana leaves to ferment, and your fingers smell of it for a week. The old chief who gave your father the land comes every year for his share and calls him "my stranger".`,
    context: 'Houphouët-Boigny\'s Ivory Coast was built on migrant labour from Upper Volta and Mali, and on his 1963 principle that the land belongs to whoever puts it to use. By the 1990s people of Burkinabè origin made up a large part of the cocoa belt, many of them born in Ivory Coast.',
    choices: null,
    effect: (p) => { p.setMem('uwa_mwa_cocoa', true); p.h += 1; p.e += 1; p.addFlag('uwa_mwa_cocoa_child') },
  },

  {
    id: 'uwa_mwa_carte',
    phase: null,
    weight: 30,
    when: (G) => MWA(G) && G.age >= 18 && G.currentYear >= 1991 && G.currentYear <= 2010 && once(G, 'uwa_mwa_carte'),
    text: (G) => `At the checkpoint on the road the gendarme asks for your papers, and you give him your carte de séjour, the card for foreigners, which you need because you were born in the wrong family in the right country. He looks at it and holds out his hand. ${G.currentYear >= 1995 ? 'Since the politicians started saying ivoirité, the price has gone up.' : 'The price is the price.'} The Baoulé woman beside you in the bus shows her identity card and is waved on.`,
    context: 'A residence card for foreigners was introduced in Ivory Coast in 1990. From the mid-1990s the doctrine of ivoirité recast the question of who was Ivorian, and roadside checkpoints became a routine site of extortion from people with foreign or northern names.',
    choices: [
      {
        text: 'Pay him',
        tag: 'yielding',
        outcome: 'He folds the note into the card and hands them back together. The bus leaves without you having missed it.',
        effect: (p) => { p.setMem('uwa_mwa_carte', true); p.mo -= 20; p.m -= 2 },
      },
      {
        text: 'Say your card is in order',
        tag: 'defiant',
        outcome: 'It is in order. You spend the afternoon on a bench behind the barrier until he decides it is.',
        effect: (p) => { p.setMem('uwa_mwa_carte', true); p.m -= 4; p.karma += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'uwa_mwa_2002',
    phase: null,
    weight: 400,
    when: (G) => MWA(G) && G.currentYear === 2002 && G.age >= 10 && once(G, 'uwa_mwa_2002'),
    text: 'On the nineteenth of September soldiers mutiny in the north, and by the next week the radio in Abidjan is saying that the rebels are foreigners and the foreigners are rebels. Bulldozers go through the shantytowns where Burkinabè live, and some are burned with people still asleep in them. Burkina sends trains and buses to bring its people home, and people who were born here climb onto them with suitcases for a country they have visited twice.',
    context: 'The mutiny of 19 September 2002 split Ivory Coast in two. In Abidjan, security forces razed shantytowns home to many West African migrants, whom state media accused of supporting the rebels. From November Burkina Faso\'s Opération Bayiri repatriated tens of thousands.',
    choices: [
      {
        text: 'Put your mother and the small ones on the Bayiri train',
        tag: 'yielding',
        outcome: 'You watch them go north from the platform. You stay to keep the house and the trees, and there is nobody left to cook.',
        effect: (p) => { p.setMem('uwa_mwa_2002', true); p.m -= 8; p.r += 3; p.addFlag('uwa_mwa_2002_war') },
      },
      {
        text: 'Keep everyone here',
        tag: 'defiant',
        outcome: 'You sleep in your clothes for two months. Nobody comes to your door, and it does not feel like luck.',
        effect: (p) => { p.setMem('uwa_mwa_2002', true); p.m -= 6; p.h -= 2; p.addFlag('uwa_mwa_2002_war') },
      },
    ],
    effect: null,
  },

  // ── ALGERIA — THE CHAOUI AND THE MOZABITES ─────────────────────────────────

  {
    id: 'uwa_ber_aures_1954',
    phase: null,
    weight: 400,
    when: (G) => CHAOUI(G) && G.currentYear >= 1954 && G.currentYear <= 1955 && G.age >= 5 && once(G, 'uwa_ber_aures'),
    text: 'On the night of All Saints the men of the village go out with old hunting rifles, and by morning there is shooting in Arris, in Batna, in Khenchela. In the Tighanimine gorge they stop the bus, and a French schoolteacher and a caïd are dead by the road. Ben Boulaïd is from these mountains. Within weeks the paratroopers are in the valleys, and every Chaoui house is a house that has to explain itself.',
    context: 'The war of independence began on 1 November 1954 with coordinated attacks across Algeria, most heavily in the Aurès under Mostefa Ben Boulaïd. The killing of the teacher Guy Monnerot in the Tighanimine gorge that morning made the Aurès, in French eyes, the heart of the rising.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ber_aures', true); p.m -= 6; p.h -= 2; p.addFlag('uwa_ber_aures_1954') },
  },

  {
    id: 'uwa_ber_mzab',
    phase: null,
    weight: 30,
    when: (G) => BER(G) && !AURES(G) && G.age >= 12 && G.age <= 15 && G.currentYear >= 1950 && G.currentYear <= 2012 && once(G, 'uwa_mzab'),
    text: 'Ghardaïa is five walled towns on five hills, and every roof steps down from a minaret shaped like a finger. Your family is Ibadi, and the rules are older than the nation: the women veiled to one eye, the elders of the halqa, the water shared out by channels whose law nobody has written down. Every summer from thirteen you go north on the bus to your uncle\'s grocery in Algiers, where they call every shopkeeper from the south a Mozabite, and they are usually right.',
    choices: null,
    effect: (p) => { p.setMem('uwa_mzab', true); p.e += 2; p.mo += 150 },
  },

  {
    id: 'uwa_ber_ghardaia',
    phase: null,
    weight: 300,
    when: (G) => MZAB(G) && G.currentYear >= 2014 && G.currentYear <= 2015 && G.age >= 14 && once(G, 'uwa_ber_ghardaia'),
    text: 'The fighting between the Mozabite quarters and the Chaamba ones started again in December, over a desecrated tomb or over nothing, depending on who tells it, and has not stopped. Shops with Mozabite names are burned in the night; young men on both sides throw stones across the old boundaries, and the police watch. In July, in Guerrara, more than twenty are killed in two days. Your uncle in Algiers phones every evening and asks the same question, and you give him the same answer.',
    context: 'Clashes between Ibadi Mozabites and Maliki Chaamba Arabs in the M\'zab valley ran from December 2013 to July 2015, when around twenty-two people were killed in Guerrara and the army took control. The Mozabite activist Kamel Eddine Fekhar was arrested that month; he died on hunger strike in custody in 2019.',
    choices: null,
    effect: (p) => { p.setMem('uwa_ber_ghardaia', true); p.m -= 6; p.r += 3 },
  },
]

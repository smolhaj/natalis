// events_fouta.js — the Halpulaar of Senegal: the river, the dry country, and
// a language spoken on both banks.
//
// The roster draws 24% of Senegalese as Fula — Halpulaar, "those who speak
// Pulaar" — and no guard in the corpus had ever named them. The Senegalese
// module that existed is Wolof and Mouride: Touba, the marabout, the pirogue
// to the Canaries, Dakar's teranga. That is the country-generic Senegal, and
// it is somebody else's. The Halpulaar are Tijani rather than Mouride, their
// heartland is the Fouta Toro along the middle Senegal river, eight hundred
// kilometres from Touba, and the thing that happened to them in the twentieth
// century that happened to nobody else in the country is 1989, when
// Mauritania expelled tens of thousands of black Mauritanians across the
// river — most of them Halpulaar, many of them the same families — into the
// villages of the Senegalese bank, where they stayed in camps for twenty years.
//
// Written for who the engine produces. Births run 1937 to 2005, four in five
// rural, one in five literate, and the median life reaches about sixty, so
// these characters live through most of the period. Before this module every
// rural Fula was born in Casamance, which was Senegal's only rural place;
// `places.js` now has a village in the Fouta Toro (the flood-recession farmers
// of the river) and a camp in the Ferlo (the herders of the dry country south
// of it), split evenly, because they are two different lives. The Fulakunda
// of Upper Casamance are a third, and are not written here.
//
// Dates used, all checked. El Hajj Umar Tall is born at Halwar near Podor and
// dies in 1864. Senegal is independent on 20 August 1960 (after the Mali
// Federation) under Senghor; a 1971 decree recognises Pulaar among six
// national languages. The Diama dam is completed in 1986 and Manantali in
// 1988. The border incident at Diawara is 9 April 1989; the riots in
// Nouakchott and Dakar follow within the month; the airlifts run from late
// April; diplomatic relations are cut in August 1989 and restored in 1992.
// The UNHCR repatriation of the expelled runs from January 2008 to 2012. The
// alternance is March 2000.

// Country, ethnicity, gender and rural/urban are written out inside each
// guard rather than behind a helper. The register and specificity classifier
// in events.js reads the `when` source text and cannot see through a helper's
// name to what it tests, so a guard reading HOME(G) was filed as `universal`
// and competed for the 5% of years that register gets.
const SN = 'Senegal'
const FOUTA = (G) => G.place?.id === 'sn_fouta'
const FERLO = (G) => G.place?.id === 'sn_ferlo'
const DAKAR = (G) => G.place?.id === 'sn_dakar'
const once = (G, key) => !G.mem?.[key]

export const FOUTA_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'fouta_ft_emigrant_house',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_emigrant') && ((G.currentCountry ?? G.character?.country)?.name === SN) === false && G.yearsAbroad >= 6 && once(G, 'fouta_ft_house'),
    text: 'The house in the village goes up a course of cement block at a time, each course a year of the foyer in Montreuil with nine men to a room and a rota for the stove. Your brother sends photographs: the walls, then the roof, then a blue door. Your mother lives in it now, with your brother\'s children. You have slept in it for a total of eleven weeks.',
    choices: null,
    effect: (p) => { p.setMem('fouta_ft_house', true); p.r += 3; p.mo -= 300; p.karma += 2 },
  },

  {
    id: 'fouta_ft_emigrant_return',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_emigrant') && ((G.currentCountry ?? G.character?.country)?.name === SN) === false && G.age >= 58 && once(G, 'fouta_ft_return'),
    text: 'The men of the foyer who go home for good go home at about this age, when the body has stopped being worth what it costs to keep in Paris. The village association you paid into for thirty years has built a dispensary and a second well and a mosque with a green minaret. You could go and sit in front of your blue door. Your pension, if you go, is paid into a French account you would have to fly back to see.',
    choices: [
      {
        text: 'Go home to the Fouta',
        tag: null,
        outcome: 'The first hot season in thirty years comes up off the jeeri like a wall. The old men on the mat outside the mosque make room for you as if you had been gone a week.',
        effect: (p) => { p.setMem('fouta_ft_return', true); p.relocate('sn_fouta', 'middle_class', { residency: 'citizen' }); p.m += 5 },
      },
      {
        text: 'Stay, and go home each winter',
        tag: null,
        outcome: 'You keep the bed in the foyer and a bag packed under it. Each December you fly home, and each March you fly back to be counted.',
        effect: (p) => { p.setMem('fouta_ft_return', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'fouta_ft_deportees',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_deportees') && G.currentYear >= 2008 && G.currentYear <= 2012 && once(G, 'fouta_ft_deportees'),
    text: 'The family you took in from across the river in the year of the expulsions have lived in the compound behind yours for almost twenty years. Now the two governments have agreed they may go back, with papers, on UNHCR trucks. The father went back once to look: another family lives in his house, and his fields are irrigated rice belonging to someone with a title deed. His sons were born on this bank and speak like you.',
    context: 'Between January 2008 and 2012 about 24,000 of the black Mauritanians expelled in 1989 were repatriated under an agreement between the two governments and UNHCR. Many found their land allocated to others. Thousands chose to stay in Senegal.',
    choices: [
      {
        text: 'Help them load the truck',
        tag: null,
        outcome: 'The compound is very quiet afterwards. A year later the father sends word that they are living in a tent beside their own field.',
        effect: (p) => { p.setMem('fouta_ft_deportees', true); p.m -= 3; p.karma += 2 },
      },
      {
        text: 'Tell the sons they can stay',
        tag: null,
        outcome: 'The father goes back alone. The sons stay, marry on this bank, and cross the river to visit him at the feasts.',
        effect: (p) => { p.setMem('fouta_ft_deportees', true); p.m += 2; p.karma += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'fouta_ft_1989',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_1989') && G.currentYear >= 1994 && G.age >= 20 && once(G, 'fouta_ft_1989'),
    text: 'A Mauritanian has opened the corner shop again, the one that was emptied in 1989, and sells sugar, candles and single cigarettes eighteen hours a day, the way his predecessor did. He is from a different family, from Boutilimit. Children who were not born in 1989 buy bread from him and do not know there is anything to know. You buy your tea there and you both keep to prices.',
    choices: null,
    effect: (p) => { p.setMem('fouta_ft_1989', true); p.r += 2; p.karma += 1 },
  },

  {
    id: 'fouta_ft_herd',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_herd_lost') && G.currentYear >= 1995 && G.age >= 30 && once(G, 'fouta_ft_herd'),
    text: 'You have forty head again, which took nine years and a loan from your wife\'s brother that you are still repaying in heifers. The pasture on the far bank, where your father took the cattle in the dry season and his father before him, is fenced now, or farmed, or simply not somewhere a Senegalese Pullo goes. In the dry season you take the herd down toward the river on this side, where everybody else takes theirs. The grass runs out a month earlier than it did.',
    choices: null,
    effect: (p) => { p.setMem('fouta_ft_herd', true); p.r += 4; p.mo += 200 },
  },

  {
    id: 'fouta_ft_letter',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.flags.includes('fouta_pulaar_writer') && G.age >= 35 && once(G, 'fouta_ft_letter'),
    text: (G) => `You write to your cousin in France in Pulaar, with the hooked letters, on paper from the shop, two pages about the rains and the price of millet and who has died. The reply comes months later in French, written for him by someone at the foyer. He says he had your letter read to him by a man from Matam who could manage it. You keep writing in Pulaar anyway, because the letters are also for you.`,
    choices: null,
    effect: (p) => { p.setMem('fouta_ft_letter', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'fouta_ft_dakar_children',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && DAKAR(G) && G.flags.includes('fouta_went_dakar') && G.age >= 32 && (G.children?.length ?? 0) > 0 && once(G, 'fouta_ft_dakar'),
    text: 'You speak Pulaar to your children and they answer you in Wolof, which is what the street speaks, and the radio, and the other children at school. They understand everything you say. When your mother comes from the Fouta for the Tabaski, they are shy with her in a way you were never shy with anyone. She asks you, at night, in the yard, what language they dream in.',
    choices: [
      {
        text: 'Send them to the village for the long vacation',
        tag: null,
        outcome: 'They come back in October brown and thin, with Pulaar words in their mouths that they use to tease you.',
        effect: (p) => { p.setMem('fouta_ft_dakar', true); p.m += 3 },
      },
      {
        text: 'Let it be',
        tag: null,
        outcome: 'You let it be. Your grandchildren will call you by the Wolof word for grandmother, and you will answer to it.',
        effect: (p) => { p.setMem('fouta_ft_dakar', true); p.r += 4 },
      },
    ],
    effect: null,
  },

  // ── THE RIVER AND THE DRY COUNTRY ──────────────────────────────────────────

  {
    id: 'fouta_dudal',
    phase: null,
    weight: 70,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.age >= 5 && G.age <= 10 && once(G, 'fouta_dudal'),
    text: 'The duɗal is a fire. Before dawn and after dark the boys sit around it with their wooden boards, reciting the verses they copied that day, and the Thierno walks behind the circle with a switch. The ink is soot and gum, and when a board is learned it is washed clean and written again. You learn more Arabic before you are nine than you will ever understand, and you learn it in the smoke.',
    choices: null,
    effect: (p) => { p.setMem('fouta_dudal', true); p.e += 2; p.h -= 1 },
  },

  {
    id: 'fouta_walo',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FOUTA(G) && G.age >= 8 && G.age <= 65 && once(G, 'fouta_walo'),
    text: (G) => (G.currentYear < 1986
      ? 'In August the river rises out of its bed and spreads across the walo, the low land, until the village is looking at a lake. In October it draws back, and the families go down into the wet grey mud behind it to plant sorghum in holes made with a stick. Up on the jeeri, the dry land, the millet has had the rains. Two harvests, two kinds of land, and whose family holds which piece of the walo is the oldest argument in the Fouta.'
      : 'The flood that spread over the walo every August is smaller since the dams, some years barely a flood at all, and the sorghum planted in its mud is smaller with it. Along the river the state has laid out irrigated rice in rectangles, with a pump and a cooperative and a loan. The land in the rectangles has papers now. Whose family held which piece of the walo, which was the oldest argument in the Fouta, has become a question for an office in Saint-Louis.'),
    choices: null,
    effect: (p) => { p.setMem('fouta_walo', true); p.h += 1; p.e += 1 },
  },

  {
    id: 'fouta_caste',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FOUTA(G) && G.age >= 12 && G.age <= 22 && once(G, 'fouta_caste'),
    text: 'Your grandmother knows every family in the village back seven generations, and which of them are toorooɓe, the clerics, and which are the fishermen at the landing, and which are maccuɓe, whose grandfathers\' grandfathers were owned. That last word is said quietly and never to anyone\'s face. It decides who may lead the prayer and who may marry whom. It has decided it for three hundred years, and everybody says it no longer matters.',
    choices: null,
    effect: (p) => { p.setMem('fouta_caste', true); p.e += 1; p.r += 1 },
  },

  {
    id: 'fouta_borehole',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FERLO(G) && G.age >= 8 && G.age <= 50 && once(G, 'fouta_borehole'),
    text: (G) => G.character?.gender === 'male'
      ? 'In the dry season every herd in the Ferlo converges on the borehole, and the cattle stand in the heat in a line a kilometre long, waiting their turn at the concrete trough. You know your father\'s cattle by their horns and their names, and they know your voice. When the rains come in July the herds scatter back into the grass, and the Ferlo goes green in a week. Then, for a few months, there is milk enough for everyone.'
      : 'In the rains there is milk, and you and the other women carry it in calabashes on your heads to the weekly market, fresh in the morning and curdled by noon, and trade it for millet and sugar. The butter you make you keep for the dry months. Your mother can tell whose cow a calabash of milk came from by tasting it. You cannot, yet.',
    choices: null,
    effect: (p) => { p.setMem('fouta_borehole', true); p.h += 2; p.m += 2 },
  },

  {
    id: 'fouta_tijani',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.age >= 14 && once(G, 'fouta_tijani'),
    text: 'On Friday afternoons after the asr prayer the men of the Tijaniyya sit in a circle on the mats in the mosque yard and say the haylala together, the one phrase over and over until the sun is low. The old men speak of El Hajj Umar, who was born at Halwar down the river and led half the Fouta east after him, as though he left last year. You are Tijani because your father was and his father was. On Friday afternoons, in the circle, it is also something else.',
    choices: null,
    effect: (p) => { p.setMem('fouta_tijani', true); p.m += 3 },
  },

  {
    id: 'fouta_school_french',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.literate && G.age >= 7 && G.age <= 13 && once(G, 'fouta_school'),
    text: 'At school the teacher, who is Wolof and from Thiès, teaches in French, and the Wolof boys speak Wolof in the yard. At home it is Pulaar. So you have three languages by the age of ten and none of them is the language of the thing in front of you: the book is French, the game is Wolof, and your grandmother is Pulaar. You learn to be three slightly different children.',
    choices: null,
    effect: (p) => { p.setMem('fouta_school', true); p.e += 3; p.s += 1 },
  },

  {
    id: 'fouta_pulaar_class',
    phase: null,
    weight: 20,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && !G.literate && G.age >= 16 && G.age <= 50 && G.currentYear >= 1975 && G.currentYear <= 2005 && once(G, 'fouta_pulaar_class'),
    text: 'A man from the association comes to the village with a blackboard and a box of chalk, and on three evenings a week he teaches Pulaar in Latin letters to whoever comes: to write the language you already speak, not the French of the school you never attended. There are letters with hooks on them, ɓ and ɗ and ƴ, for the sounds French does not have. The first evening there are forty people. By the third week there are eleven.',
    choices: [
      {
        text: 'Be one of the eleven',
        tag: null,
        outcome: 'By the end of the dry season you can write your own name and your mother\'s, and read a page of the association\'s newspaper aloud, slowly, to people who cannot.',
        effect: (p) => { p.setMem('fouta_pulaar_class', true); p.e += 4; p.addFlag('fouta_pulaar_writer') },
      },
      {
        text: 'Stop going after the first week',
        tag: null,
        outcome: 'The work is heavy and the evenings are short. You still know the letter with the hook on it that sounds like the start of your name.',
        effect: (p) => { p.setMem('fouta_pulaar_class', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── LEAVING ────────────────────────────────────────────────────────────────

  {
    id: 'fouta_emigrate',
    phase: null,
    weight: 120,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FOUTA(G) && G.character?.gender === 'male' && G.age >= 18 && G.age <= 32 && G.currentYear >= 1960 && G.currentYear <= 2005 && once(G, 'fouta_emigrate'),
    text: (G) => `Half the young men of the village are in France, and the other half are thinking about it. ${G.currentYear >= 1973 && G.currentYear <= 1985 ? 'The rains have failed three years in five, and the millet does not reach the new year.' : 'The fields feed the family, and nothing else.'} A cousin in a foyer in Montreuil writes that there is a bed, work on a building site, and the association's rules, which he encloses. The price of the ticket is two cows.`,
    choices: [
      {
        text: 'Sell the cows',
        tag: null,
        outcome: 'Montreuil is a grey building with a hundred and forty men from the river valley in it and a kitchen on each floor. The first thing the association asks for is your dues.',
        effect: (p) => { p.setMem('fouta_emigrate', true); p.emigrateTo('France', { residency: 'work_visa', tier: 'working_class' }); p.addFlag('fouta_emigrant'); p.m -= 3 },
      },
      {
        text: 'Keep the cows',
        tag: null,
        outcome: 'You stay. In the dry season you are one of the few young men left to do the heavy work, and you do most of it.',
        effect: (p) => { p.setMem('fouta_emigrate', true); p.r += 3; p.h -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'fouta_to_dakar',
    phase: null,
    weight: 15,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.ruralUrban === 'rural' && G.age >= 16 && G.age <= 28 && G.currentYear >= 1960 && once(G, 'fouta_to_dakar'),
    text: 'An uncle in Dakar has a stall in the Sandaga market and needs someone he can trust with the money. The bus to Dakar takes all day and most of a night, and at the end of it is a city where everyone speaks Wolof to you first. Your mother packs you dried fish and a blanket. She says you will come back for the harvest, and you both let her say it.',
    choices: [
      {
        text: 'Take the bus',
        tag: null,
        outcome: 'Your uncle\'s room in Pikine sleeps six. By the end of the first month you can bargain in Wolof, and by the end of the year you have stopped noticing that you do.',
        effect: (p) => { p.setMem('fouta_to_dakar', true); p.relocate('sn_dakar', 'working_class'); p.addFlag('fouta_went_dakar'); p.m += 1 },
      },
      {
        text: 'Stay home',
        tag: null,
        outcome: 'You stay. Your uncle takes a Wolof boy instead, and complains about him to you every time he visits.',
        effect: (p) => { p.setMem('fouta_to_dakar', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── THE DAMS AND 1989 ──────────────────────────────────────────────────────

  {
    id: 'fouta_dams',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && (FOUTA(G) || FERLO(G)) && G.currentYear >= 1986 && G.currentYear <= 1988 && G.age >= 16 && once(G, 'fouta_dams'),
    text: 'A dam has closed the river at Diama, near the sea, and another is being finished far upstream in Mali. The men from the development company come with plans for irrigated perimeters along both banks, and suddenly land that was only ever the walo, held by custom, has a value in money and needs a paper. Men from Nouakchott are buying on the far bank. Your father says nothing good has ever come to the river from an office.',
    choices: null,
    effect: (p) => { p.setMem('fouta_dams', true); p.e += 1; p.m -= 1 },
  },

  {
    id: 'fouta_1989',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && !FERLO(G) && G.currentYear === 1989 && G.age >= 12 && once(G, 'fouta_1989'),
    text: (G) => 'In April, at Diawara upriver, Mauritanian herders and Senegalese farmers fight over a field, and two Senegalese are killed. Within a fortnight there are mobs in Nouakchott killing Senegalese, and mobs in Dakar killing Mauritanians, and planes carrying each country\'s people home. ' +
      (DAKAR(G)
        ? 'In your street in Dakar the Mauritanian shopkeeper\'s shutter is torn off and his stock carried away, and a crowd is looking for him.'
        : 'In the village the Mauritanian who kept the shop by the mosque for twenty years is gone overnight, and young men are carrying out his sugar.'),
    context: 'Dozens and perhaps hundreds of people were killed on each side of the river in April 1989. Some 70,000 Senegalese were airlifted home from Mauritania, and a larger number of Mauritanians, many of them shopkeepers, from Senegal.',
    choices: [
      {
        text: 'Stand in front of the shop',
        tag: 'defiant',
        outcome: 'Somebody shoves you and somebody else pulls him off. Behind you, the shopkeeper\'s wife is hidden in a neighbour\'s back room until the plane.',
        effect: (p) => { p.setMem('fouta_1989', true); p.karma += 6; p.h -= 2; p.addFlag('fouta_1989') },
      },
      {
        text: 'Go home and shut the door',
        tag: 'yielding',
        outcome: 'You hear it through the door. For a month afterwards the whole quarter buys its sugar somewhere else and does not say why.',
        effect: (p) => { p.setMem('fouta_1989', true); p.r += 5; p.karma -= 2; p.addFlag('fouta_1989') },
      },
    ],
    effect: null,
  },

  {
    id: 'fouta_deportees',
    phase: null,
    weight: 800,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FOUTA(G) && G.currentYear >= 1989 && G.currentYear <= 1991 && G.age >= 14 && once(G, 'fouta_deportees'),
    text: 'They keep arriving from the other bank, in pirogues and on foot through the shallows: black Mauritanians, Halpulaar most of them, expelled by their own government with nothing. Soldiers took their identity cards and tore them up, and their cattle stayed on the other side. Some of them are the same families as yours, split by the river a hundred years ago when the French drew a line down the middle of it. A man with your grandmother\'s surname is standing at the landing with four children.',
    context: 'From April 1989 the Mauritanian government expelled some 60,000 to 70,000 black Mauritanians — Halpulaar, Soninke and Wolof — into Senegal and Mali, confiscating their papers, land and herds. Most lived in camps and villages along the Senegalese bank of the river for nearly twenty years.',
    choices: [
      {
        text: 'Take the family into the compound',
        tag: null,
        outcome: 'They build a hut behind yours out of what the river brings. The children learn the Senegalese words for things in a month.',
        effect: (p) => { p.setMem('fouta_deportees', true); p.karma += 6; p.mo -= 100; p.addFlag('fouta_deportees') },
      },
      {
        text: 'Give what you can and send them to the camp',
        tag: null,
        outcome: 'You give millet and a blanket. The camp is on the road to Podor, and it is still there when your own children are grown.',
        effect: (p) => { p.setMem('fouta_deportees', true); p.karma += 2; p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'fouta_herd_seized',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && FERLO(G) && G.currentYear === 1989 && G.age >= 15 && once(G, 'fouta_deportees'),
    text: 'For as long as anyone can remember your family has taken its cattle across the river in the dry season, to the pasture on the Mauritanian side. This year your brother is over there with the herd when the border closes. He comes back across at night in a pirogue with a cut across his forehead and nothing else. Seventy head, three generations of breeding, are on the other bank with the soldiers.',
    choices: null,
    effect: (p) => { p.setMem('fouta_deportees', true); p.mo -= 400; p.m -= 8; p.addFlag('fouta_herd_lost') },
  },

  {
    id: 'fouta_alternance',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SN && G.ethnicity === 'fula_senegal' && G.currentYear === 2000 && G.age >= 18 && once(G, 'fouta_2000'),
    text: 'In March the Socialists lose an election for the first time in forty years, and Abdou Diouf rings Abdoulaye Wade to congratulate him before the count is even finished. In Dakar the young men shout "sopi", change, which is Wolof. In the Fouta the old men listen to the results on a transistor with a Pulaar station on the next wavelength over, and say that Dakar has changed its mind again. What they want from any government is the same as before: the road to Matam, and water in the walo.',
    choices: null,
    effect: (p) => { p.setMem('fouta_2000', true); p.m += 2 },
  },
]

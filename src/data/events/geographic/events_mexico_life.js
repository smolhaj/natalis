// events_mexico_life.js — Mexico as a life, not a sequence of crises.
//
// A content review found a Mexican life of seventy years meeting three
// Mexican events. What existed was the dated political spine — Tlatelolco,
// 1982, 1985, the Zapatistas, the tequila crisis, 2000, Ayotzinapa — each at
// weight 3-5 and each written from the newspaper. The ordinary half was
// missing: the metate before the mill came, Sunday tequio, the colado of a
// roof slab with carnitas, the government milk at six in the morning, the
// caseta in the plaza where the loudspeaker called your name when the north
// rang, the green pesero, the quince. And the national events that were
// lived as private ones — the dollars in the drawer that became pesos
// overnight in 1982, the night the system crashed in 1988, the Metro's first
// orange train.
//
// The roster draws Mexicans in Mexico City, Guadalajara, Monterrey, Ciudad
// Juárez, rural Oaxaca and a village in Michoacán. Guards read the LIVE
// country and the place id. Afro-Mexican content is written for the Costa
// Chica and indigenous content for the Mixtec and Zapotec villages, which is
// why rural Oaxaca is their `homeOf`. What every village had — the metate,
// the caseta, the price of maize, the houses built with dollars — reads
// ANY_VILLAGE; what only Oaxaca had (the Guelaguetza, tequio, the cargo)
// reads VILLAGE. Michoacán is the older migration, the braceros of 1942.
//
// Dates used, all checked:
//   18 Mar 1938  Cárdenas expropriates the oil companies; 12 April 1938,
//                women queue at the Palacio de Bellas Artes to give chickens,
//                rings and coins toward the compensation.
//   15 Apr 1957  Pedro Infante killed in a plane crash at Mérida.
//   1958         the Flor de Piña dance first presented at the Guelaguetza.
//   4 Sep 1969   Mexico City Metro opens, Line 1, Zaragoza-Chapultepec;
//                station pictograms by Lance Wyman for riders who could not
//                read.
//   31 May - 21 Jun 1970  the World Cup; final at the Azteca, Brazil 4 Italy 1.
//   1979         Los ricos también lloran, Verónica Castro.
//   1977-81      the oil boom, "administering abundance".
//   Aug 1982     dollar deposits in Mexican banks ("mexdólares") converted to
//                pesos at 69.50 against a free rate far higher; 1 Sep 1982
//                the banks nationalised. In February López Portillo had said
//                he would defend the peso "like a dog".
//   6 Jul 1988   election night; the count stops — "se cayó el sistema".
//                Salinas declared winner over Cárdenas.
//   1 Jan 1994   NAFTA in force. 23 Mar 1994 Colosio shot at Lomas Taurinas,
//                Tijuana. 28 Sep Ruiz Massieu shot. 20 Dec devaluation.
//   2 Jul 2000   Fox wins; the PRI loses the presidency after 71 years.
//   from 2000    women-only carriages on the Metro.
//   2006-        the drug war; from about 2014 the madres buscadoras searching
//                fields with steel rods.
//   2015         the intercensal survey first asks about African descent;
//                Aug 2019 constitutional recognition of Afro-Mexicans; the
//                2020 census counts 2.5 million.
//   Jan 2019     petrol shortages; 18 Jan the pipeline explosion at
//                Tlahuelilpan, Hidalgo, 137 dead.
//   May 2019     labour law reform gives domestic workers written contracts
//                and social security.
//   3 May 2021   Line 12 overpass collapses at Olivos, 26 dead.
//
// The new places:
//   1942-64      the Bracero Program; DDT at the reception centres; 10% of
//                wages withheld into a savings fund. 2005-08 the Mexican
//                government pays ex-braceros or their widows and children
//                38,000 pesos.
//   1965         the Border Industrialization Program; maquiladoras.
//   10 May 1986  Fundidora de Monterrey declared bankrupt.
//   17 Sep 1988  Hurricane Gilbert; the Santa Catarina floods Monterrey.
//   22 Apr 1992  the sewer explosions in Analco and Reforma, Guadalajara.
//   31 Jan 2010  Villas de Salvárcar, Ciudad Juárez; 2010 the city's worst
//                year, over three thousand killed.
//   Feb 2013     autodefensas in Tepalcatepec and La Ruana, Michoacán.

const once = (G, key) => !G.mem?.[key]
const IN_MX = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Mexico'
const PLACE = (G) => G.place?.id ?? null
const CDMX = (G) => IN_MX(G) && PLACE(G) === 'mx_mexico_city'
const VILLAGE = (G) => IN_MX(G) && PLACE(G) === 'mx_rural'
const RANCHO = (G) => IN_MX(G) && PLACE(G) === 'mx_rural_michoacan'
const ANY_VILLAGE = (G) => VILLAGE(G) || RANCHO(G)
const GDL = (G) => IN_MX(G) && PLACE(G) === 'mx_guadalajara'
const MTY = (G) => IN_MX(G) && PLACE(G) === 'mx_monterrey'
const JUAREZ = (G) => IN_MX(G) && PLACE(G) === 'mx_juarez'
const MX_CITY = (G) => IN_MX(G) && ['mx_mexico_city', 'mx_guadalajara', 'mx_monterrey', 'mx_juarez'].includes(PLACE(G))
const FATHER = (G) => !!G.parents?.father && G.parents.father.alive !== false
const FEMALE = (G) => G.character?.gender === 'female'
const INDIG = (G) => IN_MX(G) && G.character?.ethnicity === 'indigenous_mexican'
const AFRO = (G) => IN_MX(G) && G.character?.ethnicity === 'afro_mexican'
const MOTHER = (G) => !!G.parents?.mother && G.parents.mother.alive !== false
// The self-built edge and the government milk were every Mexican city's, not
// only the capital's.
const POOR_CDMX = (G) => MX_CITY(G) && ['informal', 'working_class'].includes(G.neighborhoodTier)
const LANG = (G) => ((G.character?.surname ?? '').length % 2) ? 'Zapotec' : 'Mixtec'
const daughterAged = (G, lo, hi) => (G.children ?? []).some(c => c && c.alive !== false && c.gender === 'female' && (c.age ?? -1) >= lo && (c.age ?? -1) <= hi)

export const MEXICO_LIFE_EVENTS = [

  // ── CHILDHOOD ──────────────────────────────────────────────────────────────

  {
    id: 'mxl_metate',
    phase: null,
    weight: 60,
    when: (G) => ANY_VILLAGE(G) && MOTHER(G) && G.age >= 5 && G.age <= 10 && G.currentYear >= 1935 && G.currentYear <= 1965 && once(G, 'mxl_metate'),
    text: 'Your mother is up before anyone, kneeling at the metate in the dark, grinding the soaked maize on the stone with the stone, forward and back, and the sound of it is the first sound of every day you can remember. It takes her three hours to make the day\'s tortillas. The year the motor mill opens by the church she carries the pail of nixtamal down there with the other women, and comes back in a quarter of an hour, and does not know what to do with her hands.',
    choices: null,
    effect: (p) => { p.setMem('mxl_metate', true); p.m += 1 },
  },

  {
    id: 'mxl_posada',
    phase: null,
    weight: 35,
    when: (G) => IN_MX(G) && G.age >= 5 && G.age <= 11 && G.currentYear >= 1935 && once(G, 'mxl_posada'),
    text: 'For nine nights before Christmas the street goes from door to door with candles in paper cones, half outside singing for shelter in the name of heaven and half inside singing back that this is no inn. On the last verse the door opens. There is ponche in a pot with guava and tejocote and cinnamon, and a piñata with seven points, and when it is your turn they tie the scarf over your eyes and spin you until the whole street is shouting directions at once.',
    choices: null,
    effect: (p) => { p.setMem('mxl_posada', true); p.m += 3 },
  },

  {
    id: 'mxl_guelaguetza',
    phase: null,
    weight: 40,
    when: (G) => VILLAGE(G) && G.age >= 8 && G.age <= 25 && G.currentYear >= 1960 && once(G, 'mxl_guela'),
    text: 'In July the whole state goes up to Oaxaca city for the Guelaguetza, the regions in their own clothes on the hill at the Lunes del Cerro: feathers from the Valley, the women of Tuxtepec in their huipiles dancing the Flor de Piña with pineapples on their shoulders, and at the end they throw what they have brought into the crowd — bread, mezcal, fruit. You catch a pineapple. You carry it home on the bus on your knees like a baby.',
    choices: null,
    effect: (p) => { p.setMem('mxl_guela', true); p.m += 3 },
  },

  {
    id: 'mxl_government_milk',
    phase: null,
    weight: 50,
    when: (G) => POOR_CDMX(G) && G.age >= 6 && G.age <= 13 && G.currentYear >= 1965 && G.currentYear <= 2000 && once(G, 'mxl_milk'),
    text: 'You are sent for the milk at six, with the card and the empty jugs, to the government dispensary three streets over. The queue is all children and grandmothers. The man punches a hole in the card and fills your jugs from a steel tap and you carry them home with your arms stretched long, and it is the cheapest milk in the city and your mother says there is something in it that makes children grow, and you believe her, and you do.',
    choices: null,
    effect: (p) => { p.setMem('mxl_milk', true); p.h += 1 },
  },

  {
    id: 'mxl_quinceanera',
    phase: null,
    weight: 120,
    when: (G) => IN_MX(G) && FEMALE(G) && G.age === 15 && G.currentYear >= 1940 && once(G, 'mxl_quince'),
    text: (G) => `It takes a year. There are padrinos for the dress, padrinos for the cake, for the mass, for the doll, for the shoes, a whole list on the back of a calendar in your mother's handwriting, and the chambelanes rehearse the waltz in the street every Sunday because no room is big enough. ${VILLAGE(G) ? 'The whole village comes, and the band from the next village, and a cow is killed.' : 'The salón is in a building by the Eje with mirrored columns.'} When ${G.parents?.father && G.parents.father.alive !== false ? 'your father' : 'your uncle'} changes your flat shoes for heels in front of everybody you think you might die of it.`,
    choices: null,
    effect: (p) => { p.setMem('mxl_quince', true); p.m += 5; p.mo -= 400; p.addFlag('mxl_quince') },
  },

  {
    id: 'mxl_afro_costa',
    phase: null,
    weight: 150,
    when: (G) => AFRO(G) && G.age >= 8 && G.age <= 14 && G.currentYear >= 1940 && once(G, 'mxl_afro'),
    text: 'You are from the Costa Chica, where the coast road runs down to Guerrero, and in your town at the Day of the Dead the men dance the devils in masks of horsehair and wood, and nobody explains to you why your grandmother\'s face looks the way it does or why the people in the schoolbooks do not. When you go up to the city with your uncle a policeman asks for your papers and does not believe you are Mexican. He asks where in Cuba. You say Pinotepa. He laughs.',
    choices: null,
    effect: (p) => { p.setMem('mxl_afro', true); p.m -= 3; p.addFlag('mxl_afro_costa') },
  },

  // ── MIDCENTURY ─────────────────────────────────────────────────────────────

  {
    id: 'mxl_expropriation_1938',
    phase: null,
    weight: 300,
    when: (G) => IN_MX(G) && MOTHER(G) && G.currentYear === 1938 && G.age >= 3 && once(G, 'mxl_1938'),
    text: (G) => CDMX(G)
      ? 'In March the President says on the radio that the oil belongs to Mexico, and in April your mother goes to Bellas Artes, where there is a queue around the building of women with things to give toward paying the foreigners: a hen under an arm, a wedding ring, a sewing machine on a cart, coins in a handkerchief. Your mother gives her mother\'s earrings. On the way home she does not talk, and she walks faster than usual.'
      : 'The teacher reads it to the school from the newspaper: the President has taken the oil back from the foreign companies, and Mexico must pay for it. By the next week there is a table at the municipal palace, and women bring a hen, a ring, a few coins. Your grandmother gives a turkey. She has never seen oil.',
    choices: null,
    effect: (p) => { p.setMem('mxl_1938', true); p.m += 4 },
  },

  {
    id: 'mxl_pedro_infante',
    phase: null,
    weight: 250,
    when: (G) => IN_MX(G) && G.currentYear === 1957 && G.age >= 8 && once(G, 'mxl_pedro'),
    text: 'In April the radio says Pedro Infante\'s plane has gone down at Mérida, and the women on your street come out of their houses into the road as if somebody had rung a bell. Your mother had seen Nosotros los pobres four times. All that week every radio in the city plays his songs, from every window, so that you can walk the length of the street without losing the verse.',
    choices: null,
    effect: (p) => { p.setMem('mxl_pedro', true); p.m -= 2 },
  },

  {
    id: 'mxl_colado',
    phase: null,
    weight: 60,
    when: (G) => POOR_CDMX(G) && G.age >= 22 && G.age <= 45 && G.currentYear >= 1955 && G.currentYear <= 2000 && once(G, 'mxl_colado'),
    text: 'You have a lot at the edge of the city with no water and no papers that anybody believes, and you build on Sundays: one room of grey block, then a second. The day of the colado, when the roof slab is poured, the compadres come at six with buckets and you pass concrete hand to hand up a ladder until the whole roof is wet and level, and at noon there are carnitas and beer on the slab, and the rebar sticks up at the corners for the floor you will put on one day.',
    context: 'Much of urban Mexico, the capital first among it, was built by its inhabitants on lots bought informally at the city\'s edge, in a process called autoconstrucción. Pouring a concrete roof — the colado — was done in a day by friends and neighbours and ended in a meal.',
    choices: null,
    effect: (p) => { p.setMem('mxl_colado', true); p.m += 4; p.mo -= 1500; p.s += 2; p.addFlag('mxl_colado') },
  },

  {
    id: 'mxl_tequio',
    phase: null,
    weight: 60,
    when: (G) => VILLAGE(G) && G.age >= 15 && G.age <= 50 && G.currentYear >= 1935 && once(G, 'mxl_tequio'),
    text: 'On Sunday the topil goes from house to house: tequio. Every household sends somebody to work for the village — this month the road to the spring, last month the roof of the school — and nobody is paid and nobody is excused, and if you do not come your name is read out at the assembly. You go with a machete and a tortilla. By noon you have talked to more people than in the whole month before.',
    context: 'Tequio is unpaid communal labour owed by every household in many indigenous communities of Oaxaca, part of the system of usos y costumbres by which some 400 of the state\'s 570 municipalities govern themselves.',
    choices: null,
    effect: (p) => { p.setMem('mxl_tequio', true); p.s += 2; p.karma += 2; p.addFlag('mxl_tequio') },
  },

  {
    id: 'mxl_maid_to_capital',
    phase: null,
    weight: 70,
    when: (G) => ANY_VILLAGE(G) && FEMALE(G) && !G.partner && G.age >= 13 && G.age <= 17 && G.currentYear >= 1950 && G.currentYear <= 2000 && once(G, 'mxl_maid'),
    text: 'A woman from the village who works in the capital says a family in Coyoacán needs a girl. Your mother looks at you a long time. You would sleep in the little room on the roof, by the water tank, and cook and clean six and a half days a week, and send the money home.',
    choices: [
      {
        text: 'Go.',
        outcome: 'The señora calls you by a name that is not yours because it is easier. The room on the roof has a window that looks onto other roofs, each with its own small room, each with a girl.',
        effect: (p) => { p.setMem('mxl_maid', true); p.m -= 5; p.mo += 300; p.addFlag('mxl_muchacha'); p.relocate('mx_mexico_city', 'working_class') },
      },
      {
        text: 'Stay.',
        outcome: 'The woman takes your cousin instead. At the fiesta she comes home in shoes nobody in the village has seen before.',
        effect: (p) => { p.setMem('mxl_maid', true); p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'mxl_language_not_passed',
    phase: null,
    weight: 120,
    when: (G) => INDIG(G) && G.mem?.attendedSchool !== false && (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? 99) <= 4) && G.currentYear >= 1955 && G.currentYear <= 2000 && once(G, 'mxl_lang'),
    text: (G) => `You were hit at school for speaking ${LANG(G)}, on the hand, with a ruler, and you remember the teacher's face better than any of the lessons. Now there is a child of your own learning to talk, and you have to decide which language you will talk to it in. Everybody says Spanish is the one that gets you work in the city. Your mother says nothing.`,
    choices: [
      {
        text: 'Spanish. The child will not be hit.',
        outcome: 'Your child understands when the grandparents speak, and answers in Spanish, and by ten does not understand any more.',
        effect: (p) => { p.setMem('mxl_lang', true); p.m -= 3; p.addFlag('mxl_lang_not_passed') },
      },
      {
        text: `Both. Your own at home.`,
        outcome: 'Your child is hit for it at school too, less hard. You tell them it was the same for you.',
        effect: (p) => { p.setMem('mxl_lang', true); p.m += 1; p.addFlag('mxl_lang_passed') },
      },
    ],
    effect: null,
  },

  // ── THE MIRACLE AND AFTER ─────────────────────────────────────────────────

  {
    id: 'mxl_metro_1969',
    phase: null,
    weight: 220,
    when: (G) => CDMX(G) && G.currentYear >= 1969 && G.currentYear <= 1970 && G.age >= 6 && once(G, 'mxl_metro'),
    text: 'The Metro opens: orange trains on rubber tyres that hum instead of clatter, under the city, from Zaragoza to Chapultepec. Every station has a little picture as well as a name — a grasshopper, a bell, a duck — so that people who cannot read can find their stop, and you see a man from the market counting the pictures on his fingers. The first Sunday half the city rides it end to end for nothing, just to come up somewhere else.',
    choices: null,
    effect: (p) => { p.setMem('mxl_metro', true); p.m += 4; p.addFlag('mxl_metro_first') },
  },

  {
    id: 'mxl_world_cup_1970',
    phase: null,
    weight: 220,
    when: (G) => CDMX(G) && G.currentYear === 1970 && G.age >= 6 && once(G, 'mxl_wc70'),
    text: 'The World Cup is here, and the whole building watches the final on the one colour set, in the flat of the man who works for the electricity company, with the door open and children sitting on the stairs. Brazil, and Pelé, at the Azteca, which you can almost hear from the roof. Mexico went out in Toluca to Italy and nobody minds as much as they expected. You decide you will be a footballer, which you will decide again every four years.',
    choices: null,
    effect: (p) => { p.setMem('mxl_wc70', true); p.m += 4 },
  },

  {
    id: 'mxl_telenovela',
    phase: null,
    weight: 150,
    when: (G) => IN_MX(G) && G.currentYear >= 1979 && G.currentYear <= 1980 && G.age >= 10 && once(G, 'mxl_novela'),
    text: 'At nine every weeknight the street goes quiet for Los ricos también lloran. Mariana the poor girl, the rich house, the lost son. The bus drivers know not to expect passengers at nine. Your grandmother, who says novelas are for idiots, sits a little behind everyone so that nobody can see her face when Mariana cries, and she cries when Mariana cries.',
    choices: null,
    effect: (p) => { p.setMem('mxl_novela', true); p.m += 2 },
  },

  {
    id: 'mxl_oil_boom',
    phase: null,
    weight: 120,
    when: (G) => CDMX(G) && G.currentYear >= 1978 && G.currentYear <= 1981 && G.age >= 25 && G.age <= 60 && G.money > 3000 && once(G, 'mxl_boom'),
    text: 'The President says on television that the country must now learn to administer its abundance. There is oil off Campeche, more than anyone imagined, and the banks will lend you anything. People you know fly to Houston on a Friday to buy televisions and come back on Sunday with three suitcases. Your brother-in-law says the clever thing is to keep your savings in dollars, in a Mexican bank, so you can have both.',
    choices: [
      {
        text: 'Open a dollar account, as he says.',
        outcome: 'The bank clerk gives you a booklet in green. You keep it in the drawer with the deeds.',
        effect: (p) => { p.setMem('mxl_boom', true); p.m += 3; p.addFlag('mxl_mexdollars') },
      },
      {
        text: 'Buy a car instead. Money is for using.',
        outcome: 'A Datsun, white. The whole street comes out to look at it.',
        effect: (p) => { p.setMem('mxl_boom', true); p.m += 4; p.mo -= 3000 },
      },
    ],
    effect: null,
  },

  {
    id: 'mxl_caida_1988',
    phase: null,
    weight: 300,
    when: (G) => IN_MX(G) && G.currentYear === 1988 && G.age >= 18 && once(G, 'mxl_1988'),
    text: 'Election night, July, and the early numbers from the cities have Cárdenas ahead, and then the minister on television says the computers have gone down. Se cayó el sistema. A week later, when the system comes back up, Salinas has won. The old man next door, who has voted for the party every time since Alemán, says nothing at all, which for him is a speech.',
    context: 'On 6 July 1988 the vote count was suspended when the government\'s computer system "crashed" with the opposition candidate Cuauhtémoc Cárdenas leading in early returns. Carlos Salinas of the PRI was declared the winner. In 1991 Congress voted to burn the ballots.',
    choices: [
      {
        text: 'You voted for Cárdenas. Say so.',
        tag: 'defiant',
        outcome: 'You go to the Zócalo for the rally. Afterwards you keep the leaflet in a book for thirty years.',
        effect: (p) => { p.setMem('mxl_1988', true); p.m -= 3; p.addFlag('mxl_1988_vote') },
      },
      {
        text: 'You voted the way the union said. Keep it to yourself.',
        tag: 'yielding',
        outcome: 'Your union delegate shakes your hand at work on Monday as if you had done something together.',
        effect: (p) => { p.setMem('mxl_1988', true); p.addFlag('mxl_1988_vote') },
      },
    ],
    effect: null,
  },

  {
    id: 'mxl_1994',
    phase: null,
    weight: 300,
    when: (G) => IN_MX(G) && G.currentYear === 1994 && G.age >= 14 && once(G, 'mxl_1994'),
    text: 'On the first day of the year there are masked men in Chiapas and the agreement with the United States comes into force on the same morning. In March the candidate is shot in the head at a rally in Tijuana, and the television shows it again and again, the hand and the gun in the crowd, until you can see it with your eyes closed. In September another politician is shot. In December the peso. Your mother says nothing is going to happen this year that has not already happened, and she is wrong in January and wrong in December.',
    choices: null,
    effect: (p) => { p.setMem('mxl_1994', true); p.m -= 4 },
  },

  {
    id: 'mxl_caseta',
    phase: null,
    weight: 70,
    when: (G) => ANY_VILLAGE(G) && G.age >= 8 && G.currentYear >= 1985 && G.currentYear <= 2008 && once(G, 'mxl_caseta'),
    text: 'There is one telephone in the village, in the caseta by the plaza, and on Sunday afternoons the north calls. The woman who runs it picks up and then speaks into the loudspeaker on the roof — a call for the family so-and-so, they ring back in ten minutes — and you see the mother or the wife running across the plaza with her shawl coming off. Most Sundays it is your name. Your uncle in Los Angeles, your cousin in New York, asking about the rain.',
    choices: null,
    effect: (p) => { p.setMem('mxl_caseta', true); p.m -= 1; p.addFlag('mxl_caseta_calls') },
  },

  {
    id: 'mxl_corn_price',
    phase: null,
    weight: 70,
    when: (G) => ANY_VILLAGE(G) && G.age >= 22 && G.age <= 65 && G.currentYear >= 1996 && G.currentYear <= 2008 && once(G, 'mxl_corn'),
    text: 'The maize from the United States comes in by train since the agreement, yellow and cheap, and the man at the warehouse in town pays less for yours than it costs you to grow it. You plant the milpa anyway, corn and beans and squash in the same hill as your grandfather did, but now it is for the house and not for sale. The young men do the arithmetic and get on the bus north. The arithmetic is not hard.',
    choices: null,
    effect: (p) => { p.setMem('mxl_corn', true); p.m -= 3; p.mo -= 200; p.addFlag('mxl_corn_price') },
  },

  {
    id: 'mxl_pesero',
    phase: null,
    weight: 30,
    when: (G) => CDMX(G) && G.age >= 16 && G.age <= 60 && G.currentYear >= 1985 && G.currentYear <= 2015 && once(G, 'mxl_pesero'),
    text: 'The green pesero has a Virgin of Guadalupe on the dashboard, stickers of a football club on the windscreen, and cumbia at a volume that is a decision. You pass your coins forward hand to hand over the heads of strangers and the change comes back the same way, exactly. When you want to get down you shout bajan, and the driver stops wherever he is, in the middle of the Eje, and everybody behind him agrees to it.',
    choices: null,
    effect: (p) => { p.setMem('mxl_pesero', true) },
  },

  {
    id: 'mxl_desaparecido',
    phase: null,
    weight: 60,
    when: (G) => IN_MX(G) && G.age >= 18 && G.currentYear >= 2008 && G.currentYear <= 2022 && once(G, 'mxl_desap'),
    text: 'Your cousin left Oaxaca for the border on a Tuesday with a backpack, and called from Tamaulipas on the Thursday, and that is the last of him. His mother has a sheet printed with his face and his height and the shirt he was wearing — a ficha — and it is on the lampposts, in the church, on the walls of the bus station. She goes to the prosecutor every week. They give her a number. She says she will look herself.',
    choices: null,
    effect: (p) => { p.setMem('mxl_desap', true); p.m -= 8; p.addFlag('mxl_desaparecido') },
  },

  {
    id: 'mxl_gasolina_2019',
    phase: null,
    weight: 220,
    when: (G) => IN_MX(G) && G.currentYear === 2019 && G.age >= 16 && once(G, 'mxl_gas19'),
    text: 'In January the government shuts the pipelines to stop the fuel thieves and the petrol stations run dry: queues of cars around the block at three in the morning, men pushing them forward with the engine off to save what is left. In Hidalgo a pipeline someone has tapped is spilling petrol into a field and the village comes with buckets, and it catches. You watch it on your phone. Somebody you work with says the people deserved it, and you find you cannot be in the same room as him.',
    choices: null,
    effect: (p) => { p.setMem('mxl_gas19', true); p.m -= 3 },
  },

  // ── THE WEST AND THE NORTH ────────────────────────────────────────────────

  {
    id: 'mxl_bracero_father',
    phase: null,
    weight: 120,
    when: (G) => RANCHO(G) && FATHER(G) && G.age >= 5 && G.age <= 14 && G.currentYear >= 1943 && G.currentYear <= 1964 && once(G, 'mxl_bracero'),
    text: 'Your father goes north with the braceros. He has his name on a list at the municipal office and a letter from the priest, and he goes on the train to the reception centre at the border, where they make the men take off their clothes in a shed and spray them with white powder like a field. He sends money orders from California in the cotton season and comes home at Christmas thinner, with a radio. A part of every pay is kept back, they tell him, to be paid to him here in Mexico, into a fund.',
    context: 'Under the Bracero Program (1942-1964) some 4.6 million contracts took Mexican men to work in American agriculture, Michoacán and Jalisco among the largest senders. At border reception centres workers were stripped and sprayed with DDT. Ten per cent of their wages was withheld for a savings fund to be paid in Mexico; most never received it.',
    choices: null,
    effect: (p) => { p.setMem('mxl_bracero', true); p.mo += 150; p.m -= 2; p.addFlag('mxl_bracero_father') },
  },

  {
    id: 'mxl_autodefensas_2013',
    phase: null,
    weight: 200,
    when: (G) => RANCHO(G) && G.currentYear >= 2013 && G.currentYear <= 2014 && G.age >= 16 && once(G, 'mxl_autodef'),
    text: 'Down in Tierra Caliente the lime pickers and the cattlemen of Tepalcatepec and La Ruana put on white shirts and take the rifles out of the walls and run the Templarios out of town, because the Templarios had been taking a cut of every crate, every cow, every tortilla. By the summer there are farmers with rifles at checkpoints on the roads, and the army does not know whether to disarm them or deputise them, and does both. Everyone you know has an opinion and lowers their voice to give it.',
    context: 'In February 2013 armed self-defence groups (autodefensas) formed in Tepalcatepec and La Ruana, Michoacán, against the Knights Templar cartel, which extorted farmers and businesses across Tierra Caliente. They spread across the state through 2013; in 2014 the federal government incorporated some of them into a rural police force and arrested others.',
    choices: null,
    effect: (p) => { p.setMem('mxl_autodef', true); p.m -= 3 },
  },

  {
    id: 'mxl_guadalajara_1992',
    phase: null,
    weight: 300,
    when: (G) => GDL(G) && G.currentYear === 1992 && G.age >= 6 && once(G, 'mxl_gdl92'),
    text: 'For two days the whole of the Reforma district smells of petrol, coming up out of the drains, and people call the fire brigade and the fire brigade comes and goes. On the Wednesday morning, a little after ten, the street lifts. Eight kilometres of it, in a line, along the sewer: the asphalt, the buses, the fronts of the houses. You hear it across the city like a train going over a bridge, and then the sirens all day, and then the lists.',
    context: 'On 22 April 1992 a series of explosions tore open some eight kilometres of streets in the Analco and Reforma districts of Guadalajara, after petrol leaking from a Pemex pipeline collected in the sewers. Residents had reported the smell for days. Officially around 200 people died; local groups counted more.',
    choices: null,
    effect: (p) => { p.setMem('mxl_gdl92', true); p.m -= 5 },
  },

  {
    id: 'mxl_fundidora_1986',
    phase: null,
    weight: 250,
    when: (G) => MTY(G) && G.currentYear === 1986 && G.age >= 8 && once(G, 'mxl_fundidora'),
    text: (G) => (G.age >= 20 && ['informal', 'working_class'].includes(G.neighborhoodTier)
      ? 'In May the Fundidora closes. You come to the gate on the Monday and there is a chain on it and a notice, and eight thousand men standing in front of it reading the same notice. The furnace has been there since before your grandfather. The severance is a few months. By the summer men from the steelworks are driving taxis and selling tacos from the boots of cars, and the ones who are too old for that stand at the corner by the gate in the mornings out of habit.'
      : 'In May the Fundidora closes, the steelworks that has been there since before anybody\'s grandfather, and eight thousand men are told on a Monday morning. At school a boy whose father worked the furnace stops coming. The chimney stays up over the city for years with no smoke from it.'),
    context: 'Fundidora de Fierro y Acero de Monterrey, founded in 1900 as the first integrated steelworks in Latin America, was declared bankrupt by the government on 10 May 1986, in the debt crisis. Its grounds later became a park, with the blast furnace kept as a monument.',
    choices: null,
    effect: (p) => { p.setMem('mxl_fundidora', true); p.m -= 4 },
  },

  {
    id: 'mxl_gilberto_1988',
    phase: null,
    weight: 200,
    when: (G) => MTY(G) && G.currentYear === 1988 && G.age >= 6 && once(G, 'mxl_gilberto'),
    text: 'The Santa Catarina is a river nobody has seen with water in it. It is a wide bed of stones through the middle of the city with football pitches in it, a market on Sundays, families living in shacks along it. In September the hurricane comes in from the Gulf over the mountains and the riverbed fills in a night, brown, from bank to bank, and in the morning the football pitches are gone, and the shacks, and the people who did not get out of them.',
    context: 'Hurricane Gilbert reached Monterrey on 17 September 1988. Rain over the Sierra Madre turned the normally dry Santa Catarina river into a flood that destroyed settlements in its bed; around two hundred people died in the metropolitan area.',
    choices: null,
    effect: (p) => { p.setMem('mxl_gilberto', true); p.m -= 4 },
  },

  {
    id: 'mxl_maquila',
    phase: null,
    weight: 90,
    when: (G) => JUAREZ(G) && FEMALE(G) && G.age >= 16 && G.age <= 30 && G.currentYear >= 1975 && G.currentYear <= 2008 && once(G, 'mxl_maquila'),
    text: 'The plant assembles wiring harnesses for American cars, and the line is women, nearly all of them from somewhere else: Durango, Zacatecas, Veracruz. At the hiring they give you a form and a cup and test whether you are pregnant. The bus leaves the colonia at five in the dark, and on the line you do the same eleven movements until the bell, and in the evening you cross the empty lots back from the bus stop with your keys between your fingers, because everyone knows why.',
    context: 'Under the Border Industrialization Program of 1965, foreign-owned assembly plants (maquiladoras) in Ciudad Juárez grew to employ hundreds of thousands, most of them young women. Pregnancy testing at hiring was documented by Human Rights Watch in the 1990s. From 1993 the murders of women in Juárez became known internationally.',
    choices: null,
    effect: (p) => { p.setMem('mxl_maquila', true); p.mo += 400; p.m -= 3 },
  },

  {
    id: 'mxl_juarez_2010',
    phase: null,
    weight: 200,
    when: (G) => JUAREZ(G) && G.currentYear >= 2009 && G.currentYear <= 2011 && G.age >= 14 && once(G, 'mxl_juarez10'),
    text: 'The city empties at dusk. Half the restaurants on your avenue have closed and the rest pay somebody every week to stay open. Then, at the end of January, men with rifles go into a birthday party in Villas de Salvárcar and kill fifteen people, most of them teenagers, and the president says from Japan that it was a fight between gangs. When he comes to Juárez, one of the mothers stands up in front of him and says she cannot tell him he is welcome.',
    context: 'Ciudad Juárez had over three thousand homicides in 2010, the worst year of the war between the Sinaloa and Juárez cartels. On 31 January 2010 gunmen killed fifteen people at a student party in Villas de Salvárcar. President Calderón first described the victims as gang members; at a public meeting in Juárez in February, Luz María Dávila, who lost two sons, told him to his face that he was not welcome.',
    choices: null,
    effect: (p) => { p.setMem('mxl_juarez10', true); p.m -= 6 },
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'mxl_ft_mexdollars',
    phase: null,
    weight: 400,
    when: (G) => IN_MX(G) && G.flags.has('mxl_mexdollars') && G.currentYear === 1982 && once(G, 'mxl_ft_mexd'),
    text: 'In February the President said he would defend the peso like a dog. In August the government announces that every dollar in a Mexican bank is now a peso, at sixty-nine fifty, when the street is paying twice that. The green booklet in the drawer is worth half of what it was on Thursday. In September they take the banks. People bark at his house in the Lomas, and at his name on the radio, and it does not give anyone their money back.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_mexd', true); p.m -= 8; p.wipeMoney(0.35) },
  },

  {
    id: 'mxl_ft_1988_2000',
    phase: null,
    weight: 300,
    when: (G) => IN_MX(G) && G.flags.has('mxl_1988_vote') && G.currentYear === 2000 && once(G, 'mxl_ft_88'),
    text: 'Twelve years after the system crashed, it does not crash. At eleven at night the President himself goes on television and says the other side has won, and that is all, and it is over, seventy-one years in a sentence. You go out into the street because you cannot stay in. You do not much like the man who won. That is not what this is about.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_88', true); p.m += 5 },
  },

  {
    id: 'mxl_ft_metro_2021',
    phase: null,
    weight: 300,
    when: (G) => CDMX(G) && G.flags.has('mxl_metro_first') && G.currentYear === 2021 && once(G, 'mxl_ft_metro'),
    text: 'In May the overpass on Line 12 comes down at Olivos with a train on it, at night, onto the cars below. Twenty-six people. You rode the first orange train in 1969, when it hummed under the city and every station had a picture, and you have ridden it most days of your life since. You ride it the next morning. There is nothing else to ride.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_metro', true); p.m -= 4 },
  },

  {
    id: 'mxl_ft_metro_carriage',
    phase: null,
    weight: 60,
    when: (G) => CDMX(G) && G.flags.has('mxl_metro_first') && FEMALE(G) && G.currentYear >= 2000 && G.currentYear <= 2015 && once(G, 'mxl_ft_carriage'),
    text: 'There are carriages for women only now at the front of the train, with a policewoman at the barrier at rush hour. You remember the first year of the Metro, when the cars were so empty you could sit anywhere, and then the forty years after when you rode with your elbows out and your bag held in front. Girls of seventeen take the women\'s carriage without thinking about it. You think about it every time.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_carriage', true); p.m += 1 },
  },

  {
    id: 'mxl_ft_quince',
    phase: null,
    weight: 80,
    when: (G) => IN_MX(G) && G.flags.has('mxl_quince') && daughterAged(G, 14, 15) && once(G, 'mxl_ft_quince'),
    text: 'Now it is you with the list on the back of the calendar: padrinos for the dress, for the cake, for the shoes. Your daughter wants a theme, and a photographer, and to arrive in a car. You want her to have it all and you also want her to know what it costs, and you find yourself saying, on the night, as the heels go on in front of everybody, exactly what your own mother said.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_quince', true); p.m += 4; p.mo -= 800 },
  },

  {
    id: 'mxl_ft_colado',
    phase: null,
    weight: 60,
    when: (G) => MX_CITY(G) && G.flags.has('mxl_colado') && G.age >= 50 && once(G, 'mxl_ft_colado'),
    text: 'The house has three floors now, a floor for each family under the roof now, each poured in a day with carnitas on the slab, and the rebar still sticks up at the corners for a fourth. The colonia has water and a paved street and a name on the map, and the papers came through in the end. You look at the roof from the street sometimes. It is the only thing in the world you built.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_colado', true); p.m += 4 },
  },

  {
    id: 'mxl_ft_cargo',
    phase: null,
    weight: 60,
    when: (G) => VILLAGE(G) && G.flags.has('mxl_tequio') && G.age >= 35 && G.age <= 65 && once(G, 'mxl_ft_cargo'),
    text: 'The assembly names you mayordomo for the fiesta of the patron saint. It is an honour, and it is a year of your savings: the band, the fireworks, the mole for four hundred people, the candles. You could refuse. Nobody refuses. When it is over you are poorer and the village greets you differently in the street, for the rest of your life.',
    choices: [
      {
        text: 'Accept the cargo.',
        outcome: 'At the procession the band stops outside your house. It takes a year for the arithmetic to stop hurting.',
        effect: (p) => { p.setMem('mxl_ft_cargo', true); p.mo -= 2000; p.s += 4; p.karma += 3 },
      },
      {
        text: 'Ask for another year to save.',
        outcome: 'They give it to you. It is noted.',
        effect: (p) => { p.setMem('mxl_ft_cargo', true); p.s -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'mxl_ft_video_call',
    phase: null,
    weight: 60,
    when: (G) => IN_MX(G) && G.flags.has('mxl_caseta_calls') && G.currentYear >= 2014 && once(G, 'mxl_ft_video'),
    text: 'The caseta by the plaza is a shop selling phone credit now. On your own phone your cousin in Los Angeles turns his camera around to show you his kitchen: the fridge with magnets, the window, a palm tree. He has been gone twenty years. You show him the plaza, the church, the place where the loudspeaker was. He goes quiet, and asks you to walk slower.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_video', true); p.m += 2 },
  },

  {
    id: 'mxl_ft_remittance_house',
    phase: null,
    weight: 60,
    when: (G) => ANY_VILLAGE(G) && G.flags.has('mxl_corn_price') && G.currentYear >= 2005 && once(G, 'mxl_ft_house'),
    text: 'On the road into the village there are houses of two storeys, painted orange and green, with satellite dishes and iron gates and nobody in them. They were built with dollars by men in Chicago and Atlanta for the day they come home, and they send the money for the paint every few years. A woman you know is paid to open the windows once a month. The milpas in between them are the ones the old people still plant.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_house', true); p.m -= 2 },
  },

  {
    id: 'mxl_ft_muchacha',
    phase: null,
    weight: 70,
    when: (G) => IN_MX(G) && G.flags.has('mxl_muchacha') && daughterAged(G, 12, 20) && G.age >= 30 && once(G, 'mxl_ft_muchacha'),
    text: 'You have kept the señora\'s recipes and none of her habits. Your daughter asks what you did in the city when you were her age, and you tell her about the room on the roof by the water tank and the name you were called that was not yours. She asks why you did not leave. You find you have no answer that would make sense to someone who has never been fourteen and far away.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_muchacha', true); p.m -= 2 },
  },

  {
    id: 'mxl_ft_afro_census',
    phase: null,
    weight: 300,
    when: (G) => AFRO(G) && G.flags.has('mxl_afro_costa') && G.currentYear === 2020 && once(G, 'mxl_ft_census'),
    text: 'The census taker sits at your table with a tablet and goes through the questions, and then one you have never been asked by anyone with a form: by your history, your culture and your customs, do you consider yourself Black, Afro-Mexican, Afro-descendant? You say yes. She taps it. A year ago the Constitution was changed to say you exist. You think about the policeman who asked where in Cuba.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_census', true); p.m += 4 },
  },

  {
    id: 'mxl_ft_lang',
    phase: null,
    weight: 70,
    when: (G) => IN_MX(G) && (G.flags.has('mxl_lang_not_passed') || G.flags.has('mxl_lang_passed')) && G.hasGrandchildren && G.currentYear >= 2005 && once(G, 'mxl_ft_lang'),
    text: (G) => G.flags.has('mxl_lang_passed')
      ? `Your grandchild comes home from the bilingual school with a book in ${LANG(G)}, printed, with pictures, the first you have ever seen. They read you a page aloud with a city accent. You correct one word, then stop correcting, because it is enough that it is being said at all.`
      : `Your grandchild learns a few words of ${LANG(G)} from a video on the phone and says them at the table to make you laugh: water, thank you, grandmother. Your own child, who never learned it, looks at you across the table. Neither of you says anything about why.`,
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_lang', true); p.m += 1 },
  },

  {
    id: 'mxl_ft_buscadoras',
    phase: null,
    weight: 70,
    when: (G) => IN_MX(G) && G.flags.has('mxl_desaparecido') && G.currentYear >= 2015 && once(G, 'mxl_ft_busca'),
    text: 'Your aunt has joined the mothers who search. On Saturdays they go out in a borrowed truck to fields somebody has told them about, with shovels and long steel rods, and push the rods into the ground and pull them up and smell the tip. You go with her once. It is the most ordinary-looking field you have ever seen, with a cow at the far end. She thanks you for coming as if you were a stranger at a funeral.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_busca', true); p.m -= 6; p.karma += 3 },
  },

  {
    id: 'mxl_ft_bracero_fund',
    phase: null,
    weight: 120,
    when: (G) => IN_MX(G) && G.flags.has('mxl_bracero_father') && G.currentYear >= 2005 && G.currentYear <= 2008 && once(G, 'mxl_ft_bracero'),
    text: (G) => `Sixty years late the government says it will pay the braceros what was kept back from them, or their widows, or their children: thirty-eight thousand pesos, if you have the papers. ${G.parents?.father && G.parents.father.alive !== false ? 'Your father' : 'You'} queue${G.parents?.father && G.parents.father.alive !== false ? 's' : ''} outside the government office in the state capital with the old men in their hats, each of them holding a plastic folder: a contract with a stamp, a photograph of a young man nobody would recognise, a pay stub from Stockton. The clerk counts the pages. The line does not move all morning.`,
    context: 'From 2005 the Mexican government paid 38,000 pesos to former braceros or their surviving spouses and children who could document contracts from 1942 to 1964, in settlement of the savings withheld from their wages and never returned. Many could not produce the papers, and the amount was a fraction of what had been taken with interest.',
    choices: null,
    effect: (p) => { p.setMem('mxl_ft_bracero', true); p.mo += 400; p.m -= 1 },
  },
]

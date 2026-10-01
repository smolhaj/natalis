// events_brazil_life.js — Brazil as a life rather than a list of governments.
//
// A content review found a seventy-year Brazilian life meeting four Brazilian
// events. Most of the Brazilian corpus is the political spine (1964, AI-5,
// the amnesty, the Diretas, Lula, Lava Jato, 8 January) written at weight 3-5,
// plus the pardo module, which is deep and narrow. Missing was the half of the
// century people talk about at the table: the radio on the day Uruguay scored
// at the Maracanã, the Vargas letter read out, the father who went to build
// Brasília on the back of a truck, the price list in the handbag in 1986, the
// savings frozen on a Friday in 1990, the Sunday morning in 1994, the rural
// pension that made grandmothers the richest people in the sertão. And two
// populations the roster draws and the corpus barely names: Black Brazilians
// as a movement and not only a colour category, and the Nikkei of São Paulo,
// a quarter of whom went to Japan to work after 1990.
//
// The roster draws Brazilians in São Paulo, Rio, Fortaleza, Salvador and the
// Bahian sertão. Guards read the LIVE country and the place id.
//
// Dates used, all checked:
//   28 Jul 1938  Lampião, Maria Bonita and nine others killed at Angico,
//                Sergipe; the heads displayed on the steps at Piranhas.
//   1949-50s     Rádio Nacional; the fan clubs of Emilinha Borba and Marlene.
//   16 Jul 1950  Uruguay 2 Brazil 1 at the Maracanã, about 200,000 inside;
//                Ghiggia's goal.
//   24 Aug 1954  Vargas shoots himself in the Catete Palace; the
//                carta-testamento read on the radio; crowds in Rio burn
//                newspaper vans.
//   1956-60      Brasília built; inaugurated 21 April 1960; the candangos.
//   21 Jun 1970  World Cup final in Mexico City, Brazil 4 Italy 1, broadcast
//                live; "Pra frente, Brasil".
//   7 Jul 1978   the Movimento Negro Unificado launched on the steps of the
//                Theatro Municipal in São Paulo.
//   28 Feb 1986  Plano Cruzado: prices frozen, "fiscais do Sarney"; by the end
//                of the year shortages, cattle held back in the fields.
//   16 Mar 1990  Plano Collor: savings and current accounts above 50,000
//                cruzados novos frozen for eighteen months, returned in twelve
//                instalments from September 1991.
//   Aug-Sep 1992 the caras-pintadas; impeachment vote 29 September.
//   1991-92      the 1988 Constitution's rural pension implemented: one
//                minimum wage at 55 for women, 60 for men.
//   Jun 1990     Japan's revised immigration law admits nikkei to work;
//                2009 Japan pays unemployed nikkei to go home.
//   1 Mar 1994   the URV; 1 Jul 1994 the real. 1 May 1994 Senna killed at Imola.
//   1997         Racionais MC's, Sobrevivendo no Inferno.
//   Jun 2001 - Feb 2002  electricity rationing (the apagão).
//   9 Jan 2003   Law 10.639: Afro-Brazilian history in the curriculum.
//   Jun 2013     the June days.
//   8 Jul 2014   Germany 7 Brazil 1 at the Mineirão.
//   Oct-Nov 2015 microcephaly cases surge in Pernambuco; national emergency
//                declared in November; Zika named.
//   Apr 2020     auxílio emergencial, R$600 a month, through the Caixa app.
//   Oct 2022     Lula defeats Bolsonaro in the second round.

const once = (G, key) => !G.mem?.[key]
const IN_BR = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Brazil'
const PLACE = (G) => G.place?.id ?? null
const SAO_PAULO = (G) => IN_BR(G) && PLACE(G) === 'br_sao_paulo'
const RIO = (G) => IN_BR(G) && PLACE(G) === 'br_rio'
const SERTAO = (G) => IN_BR(G) && PLACE(G) === 'br_rural'
const NORTHEAST = (G) => IN_BR(G) && (G.place?.region ?? null) === 'Northeast Brazil'
const NE_CITY = (G) => NORTHEAST(G) && PLACE(G) !== 'br_rural'
const CITY = (G) => IN_BR(G) && PLACE(G) !== null && PLACE(G) !== 'br_rural'
const BLACK = (G) => IN_BR(G) && G.character?.ethnicity === 'black_brazilian'
const NIKKEI = (G) => G.character?.ethnicity === 'asian_brazilian'
const FATHER = (G) => !!G.parents?.father && G.parents.father.alive !== false
const FEMALE = (G) => G.character?.gender === 'female'
const POOR = (G) => (G.wealthTier ?? 3) <= 2
const childAged = (G, lo, hi) => (G.children ?? []).some(c => c && c.alive !== false && (c.age ?? -1) >= lo && (c.age ?? -1) <= hi)
const PENSION_AGE = (G) => G.age >= (FEMALE(G) ? 55 : 60)

export const BRAZIL_LIFE_EVENTS = [

  // ── CHILDHOOD AND THE RADIO YEARS ─────────────────────────────────────────

  {
    id: 'brl_lampiao_1938',
    phase: null,
    weight: 250,
    when: (G) => SERTAO(G) && G.currentYear === 1938 && G.age >= 6 && once(G, 'brl_lampiao'),
    text: 'In July the news comes up the road from Sergipe: the soldiers caught Lampião and Maria Bonita asleep at Angico and cut off their heads, and the heads are on the church steps at Piranhas in a row with the hats set on top, and somebody has taken a photograph. A man shows the photograph at the market. The old men look at it a long time. Some of them hated him and some of them hid him, and some of them did both.',
    choices: null,
    effect: (p) => { p.setMem('brl_lampiao', true) },
  },

  {
    id: 'brl_festa_junina',
    phase: null,
    weight: 40,
    when: (G) => NORTHEAST(G) && G.age >= 5 && G.age <= 12 && G.currentYear >= 1935 && once(G, 'brl_junina'),
    text: 'In June, for São João, every door has a bonfire in front of it and the smoke hangs in the street all night. You dance the quadrilha in a checked dress or patched trousers with a painted moustache, and the caller shouts the figures — the snake, the tunnel, look out for the rain, it was a lie — and the forró goes on until the accordion player falls asleep in his chair. There is canjica and corn roasted in the coals, and a balloon going up that every adult swears is forbidden.',
    choices: null,
    effect: (p) => { p.setMem('brl_junina', true); p.m += 3 },
  },

  {
    id: 'brl_radio_nacional',
    phase: null,
    weight: 40,
    when: (G) => CITY(G) && G.age >= 8 && G.age <= 30 && G.currentYear >= 1946 && G.currentYear <= 1960 && once(G, 'brl_radio'),
    text: 'The radio is on a shelf with a lace cloth under it, and the whole house is arranged around it. At night there is the radio-novela, and on Saturday the auditorium programme from Rio, where the fan clubs scream for their singer and against the other: Emilinha or Marlene, you have to be one or the other, and in your house you are both, which causes arguments. Your mother sings along to the adverts.',
    choices: null,
    effect: (p) => { p.setMem('brl_radio', true); p.m += 2 },
  },

  {
    id: 'brl_maracanazo',
    phase: null,
    weight: 400,
    when: (G) => IN_BR(G) && G.currentYear === 1950 && G.age >= 6 && once(G, 'brl_1950'),
    text: 'The final, the Maracanã, two hundred thousand people inside and the whole country at a radio, and a draw is enough. Brazil scores first. The street is already celebrating. Then Uruguay, and then Uruguay again, Ghiggia, near the post, and the radio says the score and then says nothing, and you can hear the stadium on it being silent, which you did not know was a sound. Grown men walk home without speaking. Your uncle does not eat that night.',
    context: 'Brazil needed only a draw against Uruguay in the deciding match of the 1950 World Cup at the new Maracanã stadium. Uruguay won 2-1. The "Maracanazo" became a national trauma; the goalkeeper Barbosa was blamed for the rest of his life.',
    choices: null,
    effect: (p) => { p.setMem('brl_1950', true); p.m -= 5; p.addFlag('brl_maracanazo') },
  },

  {
    id: 'brl_vargas_1954',
    phase: null,
    weight: 300,
    when: (G) => IN_BR(G) && G.currentYear === 1954 && G.age >= 8 && once(G, 'brl_vargas'),
    text: (G) => `At breakfast in August the radio says the President has shot himself in his pyjamas in the Catete Palace. Then they read his letter: I gave you my life; now I offer my death; I leave life to enter history. ${RIO(G) ? 'By the afternoon there are crowds on the streets of Rio turning over the newspaper vans of the people who hounded him and setting them on fire.' : 'The women in your street come out with their aprons on and stand at the doors.'} Whatever your parents thought of him on Monday, on Tuesday he is the father of the poor again.`,
    choices: null,
    effect: (p) => { p.setMem('brl_vargas', true); p.m -= 3 },
  },

  {
    id: 'brl_candango',
    phase: null,
    weight: 150,
    when: (G) => SERTAO(G) && FATHER(G) && G.age >= 5 && G.age <= 14 && G.currentYear >= 1957 && G.currentYear <= 1959 && once(G, 'brl_candango'),
    text: 'Your father goes to build the new capital. A truck comes through with a canvas roof over its bed and benches nailed in, a pau-de-arara, and men climb into it with a bag each and it drives off west toward a city that is not there yet. He sends money twice and a letter once that the priest reads out to your mother: they work all night under lights, there is red dust in everything, the President came to see them.',
    choices: null,
    effect: (p) => { p.setMem('brl_candango', true); p.m -= 4; p.mo += 150; p.addFlag('brl_candango_father') },
  },

  {
    id: 'brl_nikkei_childhood',
    phase: null,
    weight: 120,
    when: (G) => NIKKEI(G) && SAO_PAULO(G) && G.age >= 6 && G.age <= 12 && G.currentYear >= 1935 && once(G, 'brl_nikkei'),
    text: (G) => G.currentYear >= 1942 && G.currentYear <= 1945
      ? 'Brazil is at war with Japan and Japanese is forbidden: not printed, not taught, not to be spoken in the street. Your grandmother speaks only Japanese. When you go out with her to the market on Galvão Bueno she does not speak at all, and points, and you do all the talking, in Portuguese, the way you will for the rest of her life.'
      : 'At home your grandmother is obachan and the rice is in a wooden tub. On Saturdays there is the Japanese school above a shop in Liberdade, and on Sundays the undokai, the sports day, where the whole colony runs relay races in white headbands and the old men time them. At the state school you are japonês to everybody, though you have never been there and neither has your mother.',
    choices: null,
    effect: (p) => { p.setMem('brl_nikkei', true); p.e += 1 },
  },

  {
    id: 'brl_televizinho',
    phase: null,
    weight: 40,
    when: (G) => CITY(G) && G.age >= 6 && G.age <= 13 && G.currentYear >= 1960 && G.currentYear <= 1978 && once(G, 'brl_tv'),
    text: 'One house on the street has a television, and at seven the children of the street are at its window, sitting on the wall, standing on a crate, and the lady of the house pretends not to see you and turns it slightly toward the glass. They call you televizinhos, the TV neighbours. You see the novela in fragments through a curtain, and you know every word of it.',
    choices: null,
    effect: (p) => { p.setMem('brl_tv', true); p.m += 2 },
  },

  {
    id: 'brl_jogo_do_bicho',
    phase: null,
    weight: 30,
    when: (G) => CITY(G) && G.age >= 18 && G.age <= 75 && G.currentYear >= 1935 && once(G, 'brl_bicho'),
    text: 'You dream of a snake, so in the morning you play the snake. The bicheiro sits on a stool at the corner by the bakery with a notebook, every morning of your life, and writes your number with a pencil he licks first, and he has never once failed to pay. It is illegal. The police play too. The results are pinned on the post at five, and the whole street walks past to look as if by accident.',
    choices: [
      {
        text: 'Play the snake, and the snake again tomorrow.',
        outcome: 'Twice in your life the snake comes in. You remember both days better than your wedding.',
        effect: (p) => { p.setMem('brl_bicho', true); p.mo -= 60; p.m += 2 },
      },
      {
        text: 'Walk past. Dreams are not money.',
        outcome: 'The snake comes in that afternoon. You do not tell anyone you dreamed it.',
        effect: (p) => { p.setMem('brl_bicho', true); p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'brl_copa_1970',
    phase: null,
    weight: 220,
    when: (G) => IN_BR(G) && G.currentYear === 1970 && G.age >= 6 && once(G, 'brl_1970'),
    text: 'The final is live from Mexico, on a television, which is a miracle in itself, and the whole street is in one front room. Pelé heads the first. When Carlos Alberto hits the fourth from the right the roof comes off the house. The song is on every radio, ninety million in action, forward Brazil, and the General has it played at his ceremonies. Your cousin, who has a friend who disappeared, will not sing it. He watches every minute of the game.',
    choices: null,
    effect: (p) => { p.setMem('brl_1970', true); p.m += 5 },
  },

  {
    id: 'brl_fusca',
    phase: null,
    weight: 35,
    when: (G) => CITY(G) && G.age >= 24 && G.age <= 55 && G.currentYear >= 1962 && G.currentYear <= 1990 && G.money > 2500 && once(G, 'brl_fusca'),
    text: 'The car is a Fusca, a Beetle made in São Bernardo, pale blue, with an engine at the back that sounds like a sewing machine when it starts. On Sundays it takes six of you to the beach, with a cooler, the smallest folded into the space behind the back seat. When it will not start, everybody gets out and pushes, and somebody always knows a man.',
    choices: null,
    effect: (p) => { p.setMem('brl_fusca', true); p.m += 3; p.mo -= 2000 },
  },

  // ── THE BLACK MOVEMENT ────────────────────────────────────────────────────

  {
    id: 'brl_mnu_1978',
    phase: null,
    weight: 300,
    when: (G) => BLACK(G) && SAO_PAULO(G) && G.currentYear === 1978 && G.age >= 16 && G.age <= 40 && once(G, 'brl_mnu'),
    text: 'In July a few thousand people stand on the steps of the Theatro Municipal, in the middle of São Paulo, under a military government, and read out a letter against racial discrimination. A Black workman was tortured to death in a police station in Guaianases in the spring. Four Black boys were thrown off a club\'s volleyball team in May. Somebody hands you a leaflet with the words Movimento Negro on it, and you fold it very small and keep it.',
    context: 'The Movimento Negro Unificado contra a Discriminação Racial was launched on 7 July 1978 with a public act on the steps of the Theatro Municipal in São Paulo. It was a response to the police killing of Robson Silveira da Luz and to the exclusion of Black athletes from the Clube de Regatas Tietê.',
    choices: null,
    effect: (p) => { p.setMem('brl_mnu', true); p.s += 2; p.addFlag('brl_mnu_1978') },
  },

  {
    id: 'brl_racionais',
    phase: null,
    weight: 120,
    when: (G) => BLACK(G) && CITY(G) && G.currentYear >= 1997 && G.currentYear <= 1999 && G.age >= 13 && G.age <= 25 && once(G, 'brl_racionais'),
    text: 'Somebody has the CD, then everybody has a copy of the copy: Sobrevivendo no Inferno, Racionais. It plays out of every car window on the way up the hill. One song is a letter from inside Carandiru. One opens with a number, sixty per cent of the young men of the periphery with no record already beaten by the police, and you count on your fingers and you have been stopped three times. It is the first time you have heard a street like yours on a record.',
    choices: null,
    effect: (p) => { p.setMem('brl_racionais', true); p.m += 2; p.addFlag('brl_racionais') },
  },

  // ── THE MONEY YEARS ───────────────────────────────────────────────────────

  {
    id: 'brl_fiscal_sarney',
    phase: null,
    weight: 300,
    when: (G) => IN_BR(G) && G.currentYear === 1986 && G.age >= 16 && once(G, 'brl_cruzado'),
    text: 'One morning in February the President says on the television that prices are frozen, all of them, from today, and that every citizen is an inspector. You carry the government list in your bag and check the shelves against it. A woman in your supermarket shouts at the manager for a price on margarine and the whole queue backs her and the manager takes the label down. By November there is no beef anywhere. The cattle are being kept in the fields until the freeze breaks.',
    choices: [
      {
        text: 'Carry the list. Report the shop that cheats.',
        tag: 'defiant',
        outcome: 'For four months you feel like a citizen of something. Then the shelves are empty.',
        effect: (p) => { p.setMem('brl_cruzado', true); p.m += 3; p.addFlag('brl_fiscal_sarney') },
      },
      {
        text: 'Buy everything you can while the prices hold.',
        outcome: 'Your cupboard has sugar and oil in it for a year. Your neighbours notice.',
        effect: (p) => { p.setMem('brl_cruzado', true); p.mo -= 200; p.addFlag('brl_fiscal_sarney') },
      },
    ],
    effect: null,
  },

  {
    id: 'brl_confisco_1990',
    phase: null,
    weight: 350,
    when: (G) => IN_BR(G) && G.currentYear === 1990 && G.age >= 20 && G.money > 300 && once(G, 'brl_confisco'),
    text: 'The new President is sworn in on a Thursday, and on the Friday the banks are closed, and on the Saturday the minister explains it on the television: everything above fifty thousand in any account is frozen, for eighteen months. Savings, the money for the house, the money from selling the car last week. You stand outside the bank on Monday with a hundred other people reading a notice on the door. A man next to you has his whole life in there. He keeps saying the number.',
    context: 'The Collor Plan of 16 March 1990 froze savings and current accounts above 50,000 cruzados novos for eighteen months, in an attempt to stop hyperinflation by removing money from circulation. The frozen money was returned in twelve instalments from September 1991, much of it eaten by inflation.',
    choices: null,
    effect: (p) => { p.setMem('brl_confisco', true); p.m -= 10; p.wipeMoney(0.5); p.addFlag('brl_confisco') },
  },

  {
    id: 'brl_caras_pintadas',
    phase: null,
    weight: 220,
    when: (G) => CITY(G) && G.currentYear === 1992 && G.age >= 14 && G.age <= 25 && once(G, 'brl_caras'),
    text: 'The President has asked the country to wear green and yellow on Sunday to show it is with him. The country wears black. Then the students paint their faces green and yellow anyway, in stripes, and go into the street to have him out, and you go with them with your face painted by a girl from the year above with her mother\'s lipstick for the yellow. In September Congress votes him out. On television it looks like a carnival, and it was.',
    choices: null,
    effect: (p) => { p.setMem('brl_caras', true); p.m += 4; p.s += 1; p.addFlag('brl_caras_pintadas') },
  },

  {
    id: 'brl_aposentadoria_rural',
    phase: null,
    weight: 150,
    when: (G) => SERTAO(G) && PENSION_AGE(G) && G.currentYear >= 1992 && G.currentYear <= 2010 && once(G, 'brl_aposentadoria'),
    text: 'The pension comes: one minimum wage a month, for the rest of your life, for having worked the land, which you have done since you could walk and never had a paper to say so. A man from the union helps you with the forms. Once a month you go into town on the bus with your card and wait in the queue at the bank with the other old people, and when you come home the family is waiting too. In the sertão it is the grandmothers who have money now.',
    context: 'The 1988 Constitution extended pensions to rural workers on the same footing as urban ones, at one minimum wage, from 55 for women and 60 for men, without contribution records. Implemented from 1991-92, the rural pension became the largest source of cash income in much of the semi-arid Northeast.',
    choices: null,
    effect: (p) => { p.setMem('brl_aposentadoria', true); p.m += 6; p.mo += 1500 },
  },

  {
    id: 'brl_senna_1994',
    phase: null,
    weight: 300,
    when: (G) => IN_BR(G) && G.currentYear === 1994 && G.age >= 8 && once(G, 'brl_senna'),
    text: 'Sunday mornings were Senna: the theme tune when he won, the yellow helmet, the men of the house in vests in front of the television with a coffee. On the first of May the car goes off at Imola into the wall at Tamburello and the commentator stops talking. The funeral in São Paulo is a million people. In July Brazil wins the Cup, on penalties, and the players hold up a banner with his name, and that is the year.',
    choices: null,
    effect: (p) => { p.setMem('brl_senna', true); p.m -= 3 },
  },

  {
    id: 'brl_apagao_2001',
    phase: null,
    weight: 180,
    when: (G) => IN_BR(G) && G.currentYear === 2001 && G.age >= 10 && CITY(G) && once(G, 'brl_apagao'),
    text: 'The reservoirs are low and the government says every house must use a fifth less electricity or pay a fine, and the whole country becomes an accountant of light switches. Your mother unplugs the second fridge and gives away its contents. The electric shower is turned to summer in June. You read the meter on the wall together every Sunday as if it were a thermometer for someone ill.',
    choices: null,
    effect: (p) => { p.setMem('brl_apagao', true); p.m -= 1 },
  },

  {
    id: 'brl_dekasegi',
    phase: null,
    weight: 150,
    when: (G) => NIKKEI(G) && IN_BR(G) && G.age >= 18 && G.age <= 45 && G.currentYear >= 1990 && G.currentYear <= 2007 && once(G, 'brl_dekasegi'),
    text: 'Japan has changed its law: the grandchildren of emigrants can come and work. An agency in Liberdade arranges everything, the ticket, the factory, a flat shared with five others, and takes it back out of your wages. Half your class from the Saturday school has gone already. In Brazil you were japonês. They say that in Japan you will be brasileiro.',
    choices: [
      {
        text: 'Go. Three years, and come back with a house.',
        outcome: 'The factory makes car parts on a line that does not stop. The supermarket near the flat stocks guaraná and farofa now, for people like you.',
        effect: (p) => { p.setMem('brl_dekasegi', true); p.m -= 4; p.mo += 3000; p.addFlag('brl_dekasegi'); p.emigrateTo('Japan', { placeId: 'jp_osaka', residency: 'work_visa' }) },
      },
      {
        text: 'Stay. Somebody has to stay.',
        outcome: 'Your cousin goes in your place and sends photographs of snow.',
        effect: (p) => { p.setMem('brl_dekasegi', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'brl_zika',
    phase: null,
    weight: 150,
    when: (G) => NE_CITY(G) && FEMALE(G) && G.age >= 18 && G.age <= 40 && G.currentYear >= 2015 && G.currentYear <= 2016 && once(G, 'brl_zika'),
    text: 'In the maternity wards in Recife babies are being born with heads too small, and then in Salvador, and in Fortaleza, and nobody knows why until they do: the mosquito, the one from the standing water in the tyres and the plant pots. Women you know who are pregnant wear long sleeves in the heat and stay indoors and spray repellent on their bellies. A neighbour\'s son is born in December. The whole street waits to hear about his head.',
    choices: null,
    effect: (p) => { p.setMem('brl_zika', true); p.m -= 5; p.addFlag('brl_zika_year') },
  },

  {
    id: 'brl_whatsapp_family',
    phase: null,
    weight: 100,
    when: (G) => IN_BR(G) && G.age >= 30 && G.currentYear >= 2018 && G.currentYear <= 2021 && once(G, 'brl_zap'),
    text: 'The family group on the phone was for birthdays and photographs of babies. Now your uncle forwards things every morning at six, videos with a red arrow and a man shouting, and your cousin answers in capitals, and an aunt leaves the group, and another aunt adds her back. An old aunt asks you on the phone, quietly, whether what the uncle sent is true. You realise she has been asking someone this every day.',
    choices: [
      {
        text: 'Answer in the group.',
        outcome: 'It goes on for two days. Your uncle stops speaking to you, and starts again at Christmas, and stops again.',
        effect: (p) => { p.setMem('brl_zap', true); p.m -= 3; p.addFlag('brl_family_group_split') },
      },
      {
        text: 'Mute it.',
        outcome: 'You miss your nephew\'s birthday because the photograph is under four hundred videos.',
        effect: (p) => { p.setMem('brl_zap', true); p.m -= 1; p.addFlag('brl_family_group_split') },
      },
    ],
    effect: null,
  },

  {
    id: 'brl_auxilio_2020',
    phase: null,
    weight: 220,
    when: (G) => IN_BR(G) && POOR(G) && G.currentYear === 2020 && G.age >= 18 && once(G, 'brl_auxilio'),
    text: 'The work stopped in March. In April the government says six hundred reais a month, through an app on the phone, and the app does not open, and then it says your details are being analysed, and then the queues outside the Caixa go round the block at five in the morning with everybody in masks two metres apart and then not. The money comes in May. It is the most you have ever had paid to you for nothing, and you have never worked so hard to get anything.',
    choices: null,
    effect: (p) => { p.setMem('brl_auxilio', true); p.mo += 600; p.m -= 2 },
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'brl_ft_7a1',
    phase: null,
    weight: 400,
    when: (G) => IN_BR(G) && G.flags.has('brl_maracanazo') && G.currentYear === 2014 && once(G, 'brl_ft_71'),
    text: 'You were a child at the radio in 1950 when the Maracanã went silent, and for sixty-four years that was the worst thing that could happen to Brazil at football. In Belo Horizonte Germany score four in six minutes. The children in the room are crying. You find, to your surprise, that you are laughing, and cannot stop, and that you are thinking of your uncle not eating his dinner.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_71', true); p.m -= 1 },
  },

  {
    id: 'brl_ft_brasilia',
    phase: null,
    weight: 70,
    when: (G) => IN_BR(G) && G.flags.has('brl_candango_father') && G.age >= 30 && G.currentYear >= 1975 && once(G, 'brl_ft_bsb'),
    text: (G) => `On the television there is Brasília: the two towers of Congress, the bowl and the upturned bowl, the long lawns, the cathedral like hands. ${FATHER(G) ? 'Your father, beside you, says nothing for a while, then points with his chin at the esplanade and says he poured that, the slab under the ministries, at night, under the lights.' : 'Your father said once that he poured the slab under the ministries, at night, under the lights. He never went back to see it.'} Nobody on the television ever mentions the men on the trucks.`,
    choices: null,
    effect: (p) => { p.setMem('brl_ft_bsb', true); p.m += 1 },
  },

  {
    id: 'brl_ft_lei_10639',
    phase: null,
    weight: 80,
    when: (G) => IN_BR(G) && (G.flags.has('brl_mnu_1978') || G.flags.has('brl_racionais')) && childAged(G, 7, 17) && G.currentYear >= 2004 && once(G, 'brl_ft_lei'),
    text: 'Your child comes home from school with a homework sheet about Zumbi dos Palmares and the quilombo that held out for a hundred years, and asks you to help. It is the law now that the schools teach it. You sit at the kitchen table with the sheet. You were taught that Princess Isabel freed the slaves with a golden pen, and that was the end of it. You tell your child about the steps of the Theatro Municipal.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_lei', true); p.m += 3 },
  },

  {
    id: 'brl_ft_urv',
    phase: null,
    weight: 300,
    when: (G) => IN_BR(G) && G.flags.has('brl_fiscal_sarney') && G.currentYear === 1994 && once(G, 'brl_ft_urv'),
    text: 'This time there is no freeze and no list. For four months prices are in two currencies, the money in your hand and a unit called the URV that only exists on labels, and then in July the new notes, with fish and birds on them. You wait for it to fail as the others failed. By Christmas a loaf costs what it cost in August. You find you do not know how to shop without running.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_urv', true); p.m += 4 },
  },

  {
    id: 'brl_ft_confisco_back',
    phase: null,
    weight: 250,
    when: (G) => IN_BR(G) && G.flags.has('brl_confisco') && G.currentYear >= 1991 && G.currentYear <= 1992 && once(G, 'brl_ft_conf'),
    text: 'The frozen money comes back, in twelve monthly instalments, with a correction that does not correct for anything. What would have been a flat is a car. What would have been a car is a fridge. The man from the queue outside the bank, who kept saying the number, you hear died in the winter. Nobody says it was the money, and everybody says it.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_conf', true); p.m -= 3; p.mo += 400 },
  },

  {
    id: 'brl_ft_june_2013',
    phase: null,
    weight: 300,
    when: (G) => CITY(G) && G.flags.has('brl_caras_pintadas') && G.currentYear === 2013 && once(G, 'brl_ft_2013'),
    text: 'Twenty-one years after you painted your face, the young are in the streets over twenty centavos on the bus fare, and then over everything. On the television they carry signs saying it is not about the twenty centavos. You were on that same avenue in 1992 and you thought then that when it was over it would be over. You do not go. You keep the television on all night, and you are on their side, and you do not know what you would tell them.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_2013', true); p.m -= 1 },
  },

  {
    id: 'brl_ft_dekasegi_return',
    phase: null,
    weight: 200,
    when: (G) => G.flags.has('brl_dekasegi') && (G.currentCountry?.name ?? null) === 'Japan' && G.currentYear >= 2009 && G.currentYear <= 2011 && once(G, 'brl_ft_deka'),
    text: 'The crash in America closes the second shift, then the first. The Japanese government offers three hundred thousand yen to any nikkei who will go back to Brazil and promise not to return to work. In the queue at the city office the Brazilians stand with their children, who speak Japanese among themselves and Portuguese to their parents and do not want to go to the place on the forms.',
    choices: [
      {
        text: 'Take the money and the ticket.',
        outcome: 'São Paulo is louder than you remember and you bow to the man at the bakery without meaning to.',
        effect: (p) => { p.setMem('brl_ft_deka', true); p.mo += 3000; p.m -= 3; p.returnHome() },
      },
      {
        text: 'Stay, and look for work.',
        outcome: 'You find three days a week at a lunch-box factory. The children are relieved.',
        effect: (p) => { p.setMem('brl_ft_deka', true); p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'brl_ft_zika',
    phase: null,
    weight: 70,
    when: (G) => NE_CITY(G) && G.flags.has('brl_zika_year') && G.currentYear >= 2020 && once(G, 'brl_ft_zika'),
    text: 'At the bus stop most mornings there is a woman with a boy of six or seven in a special chair, his head held by a padded brace, and she talks to him the whole time the bus does not come. She is one of the mothers of that year. They have an association now, and a stall at the health fair, and almost nobody else remembers why. You remember standing in the street that December waiting for news of a baby\'s head.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_zika', true); p.m -= 2; p.karma += 1 },
  },

  {
    id: 'brl_ft_natal_2022',
    phase: null,
    weight: 250,
    when: (G) => IN_BR(G) && G.flags.has('brl_family_group_split') && G.currentYear === 2022 && once(G, 'brl_ft_natal'),
    text: 'Christmas after the election. Half the family voted one way and half the other and everyone knows who, and the table is set anyway, with the turkey and the farofa and the raisins your cousin picks out. Nobody mentions it until the uncle does, during the panettone, and there is a silence, and then your grandmother asks who wants coffee in a voice that ends it. The group on the phone is quiet that night for the first time in four years.',
    choices: null,
    effect: (p) => { p.setMem('brl_ft_natal', true); p.m += 1 },
  },
]

// events_cuba_mulatto.js — the twenty-seven per cent, and the subject that was
// closed.
//
// `npm run check-events` reported Cuba:mulatto_cuban unwritten: 27% of every
// Cuban the engine draws and not one guard naming them. The existing Cuban
// modules are about the revolution as a whole — the missile crisis, the
// libreta, Mariel, the doctor missions — and they are written for a Cuban
// without a colour, which in practice means for the white Cuban the archetype
// imagines.
//
// The mulato experience of the revolution has a very specific shape. In March
// 1959 discrimination was denounced from the top; the private beaches and
// clubs opened; by the early sixties it was announced that racism had been
// eliminated, the black and mulato societies were closed as divisive, and to
// raise the subject afterwards was divisionismo. Then, in the nineties, the
// dollar arrived through the only door it could — family abroad — and the
// families abroad were overwhelmingly the white ones who had left first. The
// tourism jobs asked for buena presencia. The police asked for your carné on
// the Malecón. The problem that had been solved came back without its name.
//
// Who the engine draws (20,000 births): birth years flat 1930-2005, half and
// half by sex, heavily weighted to the lower wealth tiers, and 39% rural — all
// of it in Pinar del Río, which is tobacco country and the whitest province on
// the island, so a rural mulato child here is a minority in their own village.
// Santiago was added to the roster so that Oriente exists: the province of
// 1912, and the place Havana sent people back to under Decree 217.
//
// Dates used, all checked. The Partido Independiente de Color rises in May
// 1912 and is crushed by July, mostly in Oriente, with some thousands killed.
// Batista, born in Banes, is blackballed by the Havana Biltmore Yacht and
// Country Club. Castro's speech against discrimination is 22 March 1959. The
// societies of colour are closed in the early sixties. Operation Carlota
// (1975) is named for the enslaved woman who led the 1843 Triunvirato rising
// in Matanzas; Cuito Cuanavale is 1987-88; the last troops leave Angola in May
// 1991. The Fourth Party Congress admits believers in October 1991. The dollar
// is legalised in August 1993. Casas particulares are licensed from 1997.
// Decree 217 restricting residence in Havana is April 1997. The first Alamar
// rap festival is 1995. Cubans are allowed into tourist hotels from March
// 2008. UNEAC's Comisión Aponte is founded in 2009. Decree 288 permits the
// sale of houses in November 2011. The 2012 census gives 64.1% white, 26.6%
// mestizo, 9.3% black. Patria y Vida is released in February 2021 and Maykel
// Castillo is arrested that May.

const IS_CU = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Cuba'
const MULATO = (G) => G.character?.ethnicity === 'mulatto_cuban'
const CU = (G) => IS_CU(G) && MULATO(G)

const HAVANA = (G) => G.place?.id === 'cu_havana'
const SANTIAGO = (G) => G.place?.id === 'cu_santiago'
const PINAR = (G) => G.place?.id === 'cu_rural'
const TOURIST_CITY = (G) => HAVANA(G) || SANTIAGO(G)

const FEMALE = (G) => G.character?.gender === 'female'
const MALE = (G) => G.character?.gender === 'male'

const kids = (G) => (G.children ?? []).filter(c => c.alive !== false).map(c => ({ ...c, age: G.age - (c.ageAtBirth ?? G.age) }))
const hasInfant = (G) => kids(G).some(c => c.age >= 0 && c.age <= 1)

const once = (G, key) => !G.mem?.[key]
// A follow-through told in the present tense has to happen while it is still
// the present: `key` is a mem year the trigger stored.
const within = (G, key, lo, hi) => {
  const y = G.mem?.[key]
  return typeof y === 'number' && G.currentYear - y >= lo && G.currentYear - y <= hi
}

export const CUBA_MULATTO_EVENTS = [

  // ── BEFORE ─────────────────────────────────────────────────────────────────

  {
    id: 'cu_mu_paseo',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && G.currentYear <= 1958 && G.age >= 6 && G.age <= 16 && once(G, 'cu_mu_paseo'),
    text: 'You spend a summer with your mother\'s people in Santa Clara, and on Sunday evening the whole town walks round the Parque Vidal while the band plays. The white families walk the inner path, near the bandstand. Everybody else walks the outer one, the other way round, so that the two lines pass each other all evening without touching. Your mother, who is lighter than your father, takes his arm and walks the outer path with him without being told, and so do you.',
    context: 'In many provincial towns of pre-revolutionary Cuba the Sunday promenade was segregated by custom: in Santa Clara\'s Parque Vidal whites walked the inner ring and Black and mulato Cubans the outer.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_paseo', true); p.addFlag('cu_paseo_segregado') },
  },

  {
    id: 'cu_mu_1912_silence',
    phase: null,
    weight: 28,
    when: (G) => CU(G) && G.currentYear <= 1966 && G.age >= 7 && G.age <= 14 && once(G, 'cu_mu_1912'),
    text: 'Your grandmother was a girl in Oriente in 1912. She will tell you about the cyclone of 1932 and the price of sugar in the dance of the millions and the first time she saw an aeroplane, and never one word about that summer. It is your mother, in the kitchen, with the tap running, who tells you that her uncle was an Independiente de Color and there is no grave. Then she turns the tap off and asks you to set the table.',
    context: 'The Partido Independiente de Color, founded by Black veterans of the independence war, was banned under the 1910 Morúa law prohibiting race-based parties. Its armed protest in May 1912 was crushed within weeks, mainly in Oriente; thousands of Afro-Cuban civilians were killed. It was barely spoken of for most of the century.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_1912', true); p.e += 1; p.addFlag('cu_1912_silence') },
  },

  {
    id: 'cu_mu_batista_yacht_club',
    phase: null,
    weight: 22,
    when: (G) => CU(G) && G.currentYear >= 1952 && G.currentYear <= 1958 && G.age >= 12 && once(G, 'cu_mu_batista'),
    text: 'Your uncle says it every time the dominoes go quiet: the President of the Republic is a mulato from Banes, and the Biltmore Yacht Club turned him down anyway. He says it as a joke on Batista, and as a joke on the club, and as something else that is not a joke, and the men at the table laugh at all three. Nobody at the table has ever seen the inside of the Biltmore either.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_batista', true); p.e += 1 },
  },

  // ── 1959 AND THE CLOSING OF THE SUBJECT ────────────────────────────────────

  {
    id: 'cu_mu_playa_1959',
    phase: null,
    weight: 60,
    when: (G) => CU(G) && (G.currentYear === 1959 || G.currentYear === 1960) && G.age >= 5 && once(G, 'cu_mu_playa'),
    text: (G) => {
      const paseo = G.flags.has('cu_paseo_segregado') ? ' You think of the outer path in Santa Clara.' : ''
      return `The club beach at the end of the road, the one with the wall and the man at the gate, is open. A sign says the beaches belong to the people now. You walk onto the sand with your cousins on a Sunday and nobody stops you, and you keep looking back at the gate to see if somebody will.${paseo} Nobody comes.`
    },
    context: 'In March 1959 Fidel Castro publicly denounced racial discrimination in employment and recreation. Private beaches and exclusive clubs were opened to the public over the following months.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_playa', true); p.m += 6; p.addFlag('cu_1959_playa') },
  },

  {
    id: 'cu_mu_sociedad_cerrada',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && G.currentYear >= 1961 && G.currentYear <= 1968 && G.age >= 14 && once(G, 'cu_mu_sociedad'),
    text: 'The society where your parents met, the hall with the photographs of the founders and the Saturday danzón, is closed. There is no need for it, a man from the committee explains: discrimination has been eliminated, and a society for people of colour is itself a kind of division. The photographs go into somebody\'s cupboard. After that, to bring up colour is to be called divisionista, and people stop, and the stopping is the part nobody announces.',
    choices: [
      {
        text: 'Believe it. Look at the schools, the beaches, the hospital.',
        tag: 'yielding',
        outcome: 'There is a great deal to look at, and it is real. You stop using the word, and after a few years you stop thinking it, most days.',
        effect: (p) => { p.setMem('cu_mu_sociedad', true); p.m += 2; p.addFlag('cu_race_settled') },
      },
      {
        text: 'Keep counting, quietly, who sits at the front of the meetings.',
        tag: 'defiant',
        outcome: 'You say nothing to anybody. You notice anyway, at every meeting, for thirty years, and it is lonely to notice a thing that has officially stopped existing.',
        effect: (p) => { p.setMem('cu_mu_sociedad', true); p.e += 2; p.r += 2; p.addFlag('cu_race_noticed') },
      },
    ],
  },

  // ── PINAR DEL RÍO ──────────────────────────────────────────────────────────

  {
    id: 'cu_mu_pinar_isleno',
    phase: null,
    weight: 50,
    when: (G) => CU(G) && PINAR(G) && G.age >= 6 && G.age <= 15 && once(G, 'cu_mu_isleno'),
    text: 'In Vueltabajo the tobacco families are isleños, from the Canaries, three or four generations back, and they say so with the accent still on some words. Your family is the dark one on the road. At school the teacher reads the class list and you are the only child whose colour anybody would think to remark on, and nobody remarks on it, and every child in the room knows who that silence is about.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_isleno', true); p.s -= 1; p.e += 1 },
  },

  {
    id: 'cu_mu_escogida',
    phase: null,
    weight: 34,
    when: (G) => CU(G) && PINAR(G) && FEMALE(G) && G.age >= 16 && G.age <= 50 && once(G, 'cu_mu_escogida'),
    text: 'At the escogida the women sit in rows on low stools sorting the cured leaves by size and colour into bundles, and the smell gets into your hair so that your children know where you have been before you say. The colours of the leaf have names — claro, colorado, maduro, oscuro — and the forewoman calls them out all day. It is the one room on the island where the words for brown are said without anybody meaning a person.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_escogida', true); p.mo += 200; p.h -= 1 },
  },

  // ── ANGOLA ─────────────────────────────────────────────────────────────────

  {
    id: 'cu_mu_angola',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && MALE(G) && G.currentYear >= 1975 && G.currentYear <= 1988 && G.age >= 18 && G.age <= 28 && !G.inPrison && once(G, 'cu_mu_angola'),
    text: 'The mission is called Carlota, after the enslaved woman who led the rising at the Triunvirato mill in 1843, and on the troopship the political officer tells the story twice. You are a volunteer, which is to say that at the meeting everybody raised their hand. In Luanda the heat is the same heat as home and the red earth is not. An Angolan boy at a checkpoint looks at your face and asks, in Portuguese, which of his villages your family came from.',
    context: 'Cuba sent some 300,000 soldiers and civilians to Angola between 1975 and 1991. The first deployment was named Operation Carlota after Carlota Lucumí, who led the 1843 uprising of the enslaved at the Triunvirato sugar mill in Matanzas. Afro-Cuban troops were a large share of those who went.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_angola', true); p.h -= 4; p.m -= 4; p.addFlag('cu_angola'); p.setMem('cu_mu_angola_year', p._state?.currentYear ?? null); p.scheduleEcho('cu_mu_ft_angola', 2) },
  },

  // ── THE SPECIAL PERIOD ─────────────────────────────────────────────────────

  {
    id: 'cu_mu_tener_fe',
    phase: null,
    weight: 34,
    when: (G) => CU(G) && G.currentYear >= 1993 && G.currentYear <= 2002 && G.age >= 14 && once(G, 'cu_mu_fe'),
    text: 'The dollar is legal now, and everybody makes the same joke: to get through this you need FE — familia en el exterior. The Menéndez family downstairs have a son in Hialeah and a new fan and a pressure cooker from the shop that only takes dollars. The people who left in 1960 were almost all white, and so, thirty years on, are the people receiving the envelopes. Your family\'s exile, such as it is, is one cousin who went at Mariel and writes at Christmas without anything in the card.',
    context: 'Holding US dollars was legalised in August 1993. Remittances became the main source of hard currency for households — and because the early exile waves had been overwhelmingly white, they flowed disproportionately to white families, widening a racial gap in income the revolution had narrowed.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_fe', true); p.m -= 4; p.addFlag('cu_sin_fe') },
  },

  {
    id: 'cu_mu_hotel_door',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && TOURIST_CITY(G) && G.currentYear >= 1993 && G.currentYear <= 2007 && G.age >= 16 && once(G, 'cu_mu_hotel'),
    text: (G) => {
      const beach = G.flags.has('cu_1959_playa') ? ' You were on the sand in 1959, the Sunday the gate first opened.' : ''
      return `Your cousin works in the kitchen of a new hotel with a Spanish name, and you go to meet her at the end of her shift. The man at the front door asks, politely, if you are Cuban. When you say yes he points you round the side. The rule is for every Cuban, he says, not for you in particular, and it is true, and you watch a white Cuban girl on a foreigner\'s arm walk through the front door while he is saying it.${beach}`
    },
    context: 'From the early 1990s until March 2008, Cubans were barred from staying in tourist hotels and often from entering them — the policy Cubans called "apartheid turístico". Enforcement at the door was, in practice, sharper for darker Cubans.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_hotel', true); p.m -= 4; p.addFlag('cu_hotel_door') },
  },

  {
    id: 'cu_mu_buena_presencia',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && TOURIST_CITY(G) && G.currentYear >= 1994 && G.currentYear <= 2012 && G.age >= 18 && G.age <= 35 && once(G, 'cu_mu_bp'),
    text: 'Tourism is the only work that pays in anything worth having, and a friend of your aunt\'s gets you an interview for the front desk. You have the English from night classes and the diploma. The woman from personnel says the post requires buena presencia and looks at your face while she says it. Two weeks later you see the girl who got it, and she is the niece of somebody, and she is white.',
    context: '"Buena presencia" — good appearance — was the stated requirement for front-of-house tourism jobs in 1990s Cuba, the only sector paying in convertible currency. Researchers found those jobs went overwhelmingly to white Cubans.',
    choices: [
      {
        text: 'Take the job they offer you instead, in the kitchen.',
        tag: 'yielding',
        outcome: 'The kitchen pays in tips passed back from the front, and the tips are more than your mother\'s salary as an engineer. You learn the dining room through a swinging door.',
        effect: (p) => { p.setMem('cu_mu_bp', true); p.mo += 400; p.m -= 3; p.addFlag('cu_buena_presencia') },
      },
      {
        text: 'Go back to your post at the ministry, in pesos.',
        tag: 'defiant',
        outcome: 'Your salary buys eleven days of the month. You keep the diploma framed and the English going, for no one in particular.',
        effect: (p) => { p.setMem('cu_mu_bp', true); p.m -= 2; p.karma += 2; p.addFlag('cu_buena_presencia') },
      },
    ],
  },

  {
    id: 'cu_mu_carne',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && HAVANA(G) && G.currentYear >= 1993 && G.currentYear <= 2012 && G.age >= 16 && G.age <= 35 && once(G, 'cu_mu_carne'),
    text: (G) => {
      const assumed = FEMALE(G) ? 'jinetera' : 'jinetero'
      return `You are walking on the Malecón with a Canadian you met through a friend, talking about nothing, when two police step off the wall and ask for your carné. Not his; yours. They ask how you know him, how long, where you live, and one of them writes it in a notebook while the other watches the Canadian, who does not understand what is happening and smiles. The word they do not say is ${assumed}. They do not have to.`
    },
    context: 'In 1990s and 2000s Havana, Cubans seen with foreigners in tourist zones were routinely stopped for identity checks. An "acta de advertencia" — an official warning — could be issued, and repeated warnings could lead to a charge of "peligrosidad social predelictiva", pre-criminal social dangerousness. Darker Cubans were stopped far more often.',
    choices: [
      {
        text: 'Hand over the carné and answer everything.',
        tag: 'yielding',
        outcome: 'They give it back after ten minutes. The Canadian asks if everything is all right and you say yes, it is nothing, it is normal, and hear how true that is.',
        effect: (p) => { p.setMem('cu_mu_carne', true); p.m -= 4; p.addFlag('cu_carne_pedido') },
      },
      {
        text: 'Ask why they have not asked him for his passport.',
        tag: 'defiant',
        outcome: 'You spend the night at the station and sign a paper in the morning: an acta de advertencia, the first. Two more and it has a name in the penal code.',
        effect: (p) => { p.setMem('cu_mu_carne', true); p.m -= 7; p.karma += 3; p.addFlag('cu_advertencia'); p.scheduleEcho('cu_mu_ft_aval', 2) },
      },
    ],
  },

  {
    id: 'cu_mu_palestino',
    phase: null,
    weight: 60,
    when: (G) => CU(G) && SANTIAGO(G) && G.currentYear >= 1990 && G.currentYear <= 2004 && G.age >= 17 && G.age <= 30 && once(G, 'cu_mu_palestino'),
    text: 'In Santiago there is nothing, and in Havana there are dollars. Half your street has gone already, on the train that takes two days when it runs, to rooms in La Habana del Este or to the settlements people call llega y pon — arrive and put — where you build with whatever you can carry. In Havana they call people from Oriente palestinos, because they have no land of their own there. Your cousin writes that there is space on his floor.',
    choices: [
      {
        text: 'Go. Take the train to Havana.',
        tag: null,
        outcome: 'The floor is concrete and the neighbours are from Guantánamo and Holguín and Bayamo. Within a month a man in a queue says palestino to your back in the voice that makes it a description.',
        effect: (p) => { p.setMem('cu_mu_palestino', true); p.m -= 3; p.mo += 150; p.addFlag('cu_palestino'); p.relocate('cu_havana', 'informal'); p.scheduleEcho('cu_mu_ft_decreto_217', 1) },
      },
      {
        text: 'Stay in Santiago, where at least you are from somewhere.',
        tag: null,
        outcome: 'The street gets quieter every year. At Carnival in July the conga from Los Hoyos goes past the gaps in it without slowing.',
        effect: (p) => { p.setMem('cu_mu_palestino', true); p.r += 3 },
      },
    ],
  },

  {
    id: 'cu_mu_desriz',
    phase: null,
    weight: 22,
    when: (G) => CU(G) && FEMALE(G) && G.currentYear >= 1991 && G.currentYear <= 1999 && G.age >= 12 && G.age <= 30 && once(G, 'cu_mu_desriz'),
    text: 'There is no relaxer anywhere, not in the peso shops, not for pesos under the counter. The woman on the corner who used to do everybody\'s hair on a Saturday has a waiting list for the last jar, which she sells a fingerful at a time. Your hair grows out the way it grows, and your grandmother, who has called it pelo malo your whole life, stops saying it, because this year everyone\'s hair on the block is the same hair.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_desriz', true); p.m += 1 },
  },

  // ── SANTO ──────────────────────────────────────────────────────────────────

  {
    id: 'cu_mu_hacer_santo',
    phase: null,
    weight: 18,
    when: (G) => CU(G) && G.currentYear >= 1988 && G.currentYear <= 2022 && G.age >= 18 && G.age <= 50 &&
      ['folk_religion', 'christian_catholic', 'secular'].includes(G.religion) && once(G, 'cu_mu_santo'),
    text: (G) => {
      const party = G.currentYear >= 1994
        ? 'Since the Party opened its membership to believers in 1991 the drums are heard in daylight, and there are foreigners paying dollars to be initiated. '
        : G.currentYear >= 1991
          ? 'Since October the Party admits believers, and people who kept their necklaces under their shirts for thirty years are wearing them outside. '
        : 'It is still something a Party member does not do, or does not do where anybody from work can see. '
      return `${party}The babalawo has read the shells and your head belongs to Obatalá. To make santo costs more than a year of your salary: the animals, the cloth, the fee, the days in the room. After it you would dress all in white for a year, not look in a mirror, not be touched, not go out after dark.`
    },
    choices: [
      {
        text: 'Make santo. Borrow what it costs.',
        tag: null,
        outcome: 'For a year you are an iyawó in white on the guagua, and strangers step aside for you and old women call you by a new name. You owe money to four people.',
        effect: (p) => { p.setMem('cu_mu_santo', true); p.m += 6; p.mo -= 600; p.addFlag('cu_iyawo'); p.setMem('cu_mu_santo_year', p._state?.currentYear ?? null); p.scheduleEcho('cu_mu_ft_iyawo', 1) },
      },
      {
        text: 'Not this year. Leave a glass of water under the bed for the dead instead.',
        tag: null,
        outcome: 'You keep the glass filled. Some weeks it is the only thing in the house you do exactly as you were taught.',
        effect: (p) => { p.setMem('cu_mu_santo', true); p.r += 2 },
      },
    ],
  },

  {
    id: 'cu_mu_alamar',
    phase: null,
    weight: 34,
    when: (G) => CU(G) && HAVANA(G) && G.currentYear >= 1995 && G.currentYear <= 2003 && G.age >= 15 && G.age <= 28 && once(G, 'cu_mu_alamar'),
    text: 'The rap festival is in the concrete amphitheatre in Alamar, among the prefab blocks at the end of the bus line. Somebody has rigged speakers out of Soviet parts. A boy from Centro Habana does a verse about being stopped for his carné four times in one day, and the whole amphitheatre knows the words to the chorus before he has finished the first one. You did not know there was a way to say it out loud until you heard it said.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_alamar', true); p.m += 3; p.s += 1 },
  },

  // ── FAMILY ─────────────────────────────────────────────────────────────────

  {
    id: 'cu_mu_adelantar',
    phase: null,
    weight: 26,
    when: (G) => CU(G) && G.partner && G.age >= 18 && G.age <= 34 && once(G, 'cu_mu_adelantar'),
    text: 'Your grandmother meets your partner on the porch and afterwards, in the kitchen, gives her verdict in the phrase she has always used about marriages: hay que adelantar la raza. You have to advance the race. She means lighter. She says it the way she says the rice needs salt, and she is darker than you, and she married darker than herself, and has been saying it about other people all her life.',
    choices: [
      {
        text: 'Let it pass. She is eighty.',
        tag: 'yielding',
        outcome: 'She blesses the marriage in her own way, with a chicken and a candle. The phrase stays in the kitchen with the other things she says.',
        effect: (p) => { p.setMem('cu_mu_adelantar', true); p.m += 1; p.addFlag('cu_adelantar_raza') },
      },
      {
        text: 'Ask her where the race is going, that it needs advancing.',
        tag: 'defiant',
        outcome: 'She laughs for a long time, which you did not expect. Then she says, to Miami, like everybody, and goes back to the rice.',
        effect: (p) => { p.setMem('cu_mu_adelantar', true); p.karma += 2; p.addFlag('cu_adelantar_raza') },
      },
    ],
  },

  // ── LATER ──────────────────────────────────────────────────────────────────

  {
    id: 'cu_mu_censo_2012',
    phase: null,
    weight: 50,
    when: (G) => CU(G) && (G.currentYear === 2012 || G.currentYear === 2013) && G.age >= 18 && once(G, 'cu_mu_censo'),
    text: (G) => `The census enumerator asks the colour of everyone in the house, and you say ${FEMALE(G) ? 'mestiza' : 'mestizo'} because that is the word on her form, and she writes it. When the results come out the country is sixty-four per cent white. People repeat the figure to each other on the guagua, looking round at the guagua.`,
    context: 'Cuba\'s 2012 census recorded the population as 64.1% white, 26.6% mestizo or mulato and 9.3% Black — figures many Cubans and scholars regarded as understating the non-white share.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_censo', true); p.e += 1 },
  },

  {
    id: 'cu_mu_patria_y_vida',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && G.currentYear === 2021 && G.age >= 15 && once(G, 'cu_mu_pyv'),
    text: 'The song goes round on phones faster than the connection should allow: Patria y Vida, turned inside the old slogan. Two of the voices on it are rappers from the barrios, and one of them, Maykel, will be in a cell by May. The chorus says ya se acabó — it is over — in a voice from a street like yours. Your neighbour turns it off when a car slows outside, and then turns it on again, lower.',
    choices: [
      {
        text: 'Send it on to three people.',
        tag: 'defiant',
        outcome: 'By the evening it has come back to you from two of them. The third has deleted the conversation, which is also an answer.',
        effect: (p) => { p.setMem('cu_mu_pyv', true); p.m += 2; p.karma += 2 },
      },
      {
        text: 'Listen to it once with the volume low and delete it.',
        tag: 'yielding',
        outcome: 'It is in your head all week anyway. You catch yourself humming it at the bodega queue and stop.',
        effect: (p) => { p.setMem('cu_mu_pyv', true); p.r += 2 },
      },
    ],
  },
]

// ── FOLLOW-THROUGH ──────────────────────────────────────────────────────────
// Written before the triggers above. Each reads a flag a trigger sets.

export const CUBA_MULATTO_FOLLOWTHROUGH = [

  {
    id: 'cu_mu_ft_1912',
    phase: null,
    weight: 32,
    when: (G) => CU(G) && G.flags.has('cu_1912_silence') && G.age >= 45 && G.currentYear >= 1990 && once(G, 'cu_mu_ft_1912'),
    text: (G) => G.currentYear >= 2012
      ? 'In 2012 it is a hundred years, and there is a short article, and a round table on a Thursday afternoon that you watch to the end. Nobody on it says your great-uncle\'s name, because nobody knows it but you. You write it on the back of an envelope and put the envelope in the Bible, which is where your grandmother kept the things she did not say.'
      : 'Your granddaughter has a school project on the independence wars, and asks what happened after. You tell her about 1912, the whole of it, in the kitchen, with the tap running out of habit. She writes it down in her careful hand and asks why it is not in the book, and you tell her that is a very good question for her teacher.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_1912', true); p.m += 2; p.r -= 2 },
  },

  {
    id: 'cu_mu_ft_aponte',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && (G.flags.has('cu_race_settled') || G.flags.has('cu_race_noticed')) && G.currentYear >= 2009 && G.age >= 40 && once(G, 'cu_mu_ft_aponte'),
    text: (G) => G.flags.has('cu_race_noticed')
      ? 'The writers\' union has a commission against racism now, named for Aponte, who was hanged in 1812 for a conspiracy of the enslaved and free people of colour. There are articles in Temas with the word racismo in the title. You read them twice, the second time slowly, the way you would read a letter you had written yourself fifty years ago and never sent.'
      : 'The writers\' union has a commission against racism now, named for Aponte, who was hanged in 1812. There are articles with the word racismo in the title. You had put that word away in 1962 with the photographs from the society, on the understanding that it was finished, and it is strange at your age to find it being taken out again by younger people who talk as if they had discovered it.',
    context: 'UNEAC, the Cuban writers\' and artists\' union, founded the José Antonio Aponte Commission against racism in 2009 — among the first official bodies since the early 1960s to treat racism as a present problem rather than a solved one.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_aponte', true); p.e += 2; p.r += 1 },
  },

  {
    id: 'cu_mu_ft_angola',
    phase: null,
    weight: 36,
    when: (G) => CU(G) && G.flags.has('cu_angola') && within(G, 'cu_mu_angola_year', 2, 15) && once(G, 'cu_mu_ft_angola'),
    text: (G) => !within(G, 'cu_mu_angola_year', 2, 3)
      ?'The men who came back from Angola have a way of finding each other at parties and standing a little apart. There is a medal in a drawer and a photograph of you in a trench at somewhere nobody here can pronounce. Nobody asks about the Angolans. When you say, once, that they called you primo, cousin, at the checkpoints, your brother-in-law laughs, and you do not say it again.'
      : 'You come home on a plane with a box of your things and a medal, and the women of the family will not stop touching your face. At the party the neighbours ask about the war and want the version with the victory in it. The one you think about is the boy at the checkpoint who asked which of his villages your family came from, and you never found a way to answer him.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_angola', true); p.m -= 2; p.r += 2 },
  },

  {
    id: 'cu_mu_ft_casa_particular',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && G.flags.has('cu_sin_fe') && G.currentYear >= 2011 && G.currentYear <= 2022 && once(G, 'cu_mu_ft_casa'),
    text: 'Since the law of 2011 houses can be bought and sold, and the Menéndez family downstairs have painted theirs and put up the blue sign of a casa particular, three rooms for tourists, with money from Hialeah for the air-conditioners. They are good neighbours; they give you the leftover breakfast. You do the arithmetic of the last twenty years once, lying awake, and the whole difference between their flat and yours comes out to a son who went in 1960 and a cousin who went at Mariel.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_casa', true); p.m -= 2; p.r += 2 },
  },

  {
    id: 'cu_mu_ft_hotel_2008',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && G.flags.has('cu_hotel_door') && G.currentYear >= 2008 && G.currentYear <= 2011 && once(G, 'cu_mu_ft_2008'),
    text: (G) => (G.currentYear === 2008
      ? 'In March it is announced that Cubans may stay in the tourist hotels. On the radio a woman says it is a question of dignity.'
      : 'Since the March of 2008 Cubans may stay in the tourist hotels; on the radio at the time a woman said it was a question of dignity.') + ' A night in one costs what you earn in five months. On Sunday you walk in through the front door of the hotel with the Spanish name, and cross the lobby, and walk out again through the other side, and the man at the door watches you do it and says nothing.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_2008', true); p.m += 3 },
  },

  {
    id: 'cu_mu_ft_buena_presencia',
    phase: null,
    weight: 30,
    when: (G) => CU(G) && G.flags.has('cu_buena_presencia') && G.age >= 40 && G.currentYear >= 2008 && once(G, 'cu_mu_ft_bp'),
    text: 'Your niece gets the job at the front desk of a hotel in Varadero, and the family has a party. She is lighter than you were; she has your English. At the party someone says it is different now, anyone can get those jobs, and you look at the photographs from her induction on her phone, a row of smiling faces in the same uniform, and count.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_bp', true); p.m += 2; p.r += 1 },
  },

  {
    id: 'cu_mu_ft_aval',
    phase: null,
    weight: 50,
    when: (G) => CU(G) && G.flags.has('cu_advertencia') && G.age >= 20 && once(G, 'cu_mu_ft_aval'),
    text: 'The job at the state firm needs a verification from the Committee on your block. The president of the Committee is a woman who has known you since you were in nappies. She has also been shown a paper from the police with your name on it, and she holds your application for a week longer than she holds anybody else\'s, and then signs it, and tells you on the stairs that she has done you a favour, which she has.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_aval', true); p.m -= 2; p.mo += 100 },
  },

  {
    id: 'cu_mu_ft_decreto_217',
    phase: null,
    weight: 80,
    when: (G) => CU(G) && HAVANA(G) && G.flags.has('cu_palestino') && G.currentYear >= 1997 && G.currentYear <= 2010 && once(G, 'cu_mu_ft_217'),
    text: 'Decree 217 says that nobody from the provinces may live in the capital without a registered address there, and you do not have one; you have a floor. The police come through the settlement on a Tuesday with a list. Some people are fined, and some are put on the train back to Oriente with their bags, and the ones with nowhere to go back to walk out through the other end of the settlement while the police are at the first.',
    context: 'Decree 217 of April 1997 restricted migration to Havana, requiring official permission to take up residence. Thousands of Cubans from the eastern provinces — "palestinos" in Havana slang — were fined or returned home.',
    choices: [
      {
        text: 'Take the train back to Santiago.',
        tag: 'yielding',
        outcome: 'Two days, and the same red earth at the end of it. Your mother does not ask; she moves the sewing machine off your old bed.',
        effect: (p) => { p.setMem('cu_mu_ft_217', true); p.m -= 4; p.relocate('cu_santiago', 'working_class') },
      },
      {
        text: 'Stay, and make sure you are not home on Tuesdays.',
        tag: 'defiant',
        outcome: 'You live for six years at an address that does not exist, in a city you have given your twenties to. When the register finally has your name in it, you do not feel you have arrived anywhere.',
        effect: (p) => { p.setMem('cu_mu_ft_217', true); p.m -= 3; p.r += 2 },
      },
    ],
  },

  {
    id: 'cu_mu_ft_iyawo',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && G.flags.has('cu_iyawo') && within(G, 'cu_mu_santo_year', 1, 2) && once(G, 'cu_mu_ft_iyawo'),
    text: 'The year in white ends with a ceremony and a meal and the first time you see your own face in a mirror in twelve months. You look older and more like your mother. You go out in a red shirt the next day and feel, on the guagua, how quickly strangers stop stepping aside for you.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_iyawo', true); p.m += 4; p.s += 1 },
  },

  {
    id: 'cu_mu_ft_pelo_bebe',
    phase: null,
    weight: 40,
    when: (G) => CU(G) && G.flags.has('cu_adelantar_raza') && hasInfant(G) && once(G, 'cu_mu_ft_bebe'),
    text: 'Your grandmother is carried round the room to hold the baby, and runs her hand over its head, twice, with her eyes closed, and says pelo bueno, like a doctor reading a result. Everybody in the room is relieved in a way nobody will describe afterwards. You take the baby back and hold its head in your palm, and the hair is just hair, soft, and it is yours.',
    choices: null,
    effect: (p) => { p.setMem('cu_mu_ft_bebe', true); p.m += 3; p.r += 1 },
  },
]

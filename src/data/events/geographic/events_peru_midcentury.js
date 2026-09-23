// events_peru_midcentury.js — the decades a Peruvian born around 1960 lives.
//
// `npm run check-reach` put Peru 1960 lowest on the roster: 13-15% of lives met
// any of the nine events in `events_peru_depth.js`, against 71-92% for Guyana,
// Germany or Japan. Three things were wrong, and only one of them was cohort.
//
//   - Cohort. Almost nothing Peruvian existed before 1980. A child of 1960 is
//     eight at Velasco's coup, nine at the agrarian reform, ten when Huascarán
//     came down on Yungay, fifteen when Quechua was made official, twenty at
//     the first election in which the illiterate could vote. None of it was
//     written, and the Sendero events that did exist were mostly written for
//     a child of 1970-1985.
//   - Place. The roster had two Peruvian places, Lima and rural Ayacucho, so
//     every rural Peruvian — more than half of this cohort — was born in the
//     province where the war began, and the guards that meant "Ayacucho" said
//     `ruralUrban === 'rural'`. A child in Puno or the Chicama cane was told
//     that the Shining Path held a meeting in her plaza, and that her father
//     worked the smelter at La Oroya. Twelve places now, and the war guards
//     read `inSenderoZone`.
//   - Weight. Events at weight 3-5 against an anchored pool that holds
//     hundreds of Latin American and universal events, and follow-throughs
//     that never landed for the few lives that held the flag.
//
// What this module is: 1965 to 2006, which for that character is ages five to
// forty-six, in the three Perus the engine actually draws — the sierra, the
// coast, Lima's desert edge where the sierra went — and a little of the
// fourth, the river. The hacienda and the reform from both ends. The move
// down, the invasion of the sand, the paisanos' club. The war from inside
// the zone, from Lima, and from a conscript's barracks. The money that
// stopped being money, and the morning it was fixed.
//
// Dates used, all checked. Velasco takes the palace 3 October 1968 and
// seizes the IPC field at La Brea y Pariñas on the 9th. The reform law is
// DL 17716, 24 June 1969, the day that had been the Día del Indio. The
// earthquake is 31 May 1970 at 15:23, the day the Mexico World Cup opened;
// Peru beat Bulgaria 3-2 on 2 June in black armbands. Pamplona is invaded in
// late April 1971 and becomes Villa El Salvador that May. Quechua is made an
// official language by DL 21156, 27 May 1975. The first national strike is
// 19 July 1977. Argentina 6, Peru 0 is 21 June 1978. The first rondas are
// Cuyumalca, Chota, December 1976. Sendero burns the ballot boxes at Chuschi
// on 17 May 1980, the night before the first election under the 1979
// constitution, the first in which people who could not read could vote.
// The dogs on the lampposts are 26 December 1980. Uchuraccay is 26 January
// 1983. ANFASEP is founded in Huamanga in September 1983. The Vaso de Leche
// is Barrantes's, 1984. The inti replaces the sol in February 1985 at a
// thousand to one. Inflation is 667% in 1988, 3,399% in 1989, 7,482% in 1990.
// Hurtado Miller announces the adjustment on 8 August 1990 and ends "que Dios
// nos ayude". Cholera appears in Chimbote in late January 1991. María Elena
// Moyano is killed in Villa El Salvador on 15 February 1992. Guzmán is taken
// in Surquillo on 12 September 1992 and shown in the cage on the 24th.
// Obligatory military service ends in 1999. The Truth Commission reports on
// 28 August 2003: 69,280. The Achuar occupy the Corrientes oil installations
// in October 2006 and the Acta de Dorissa is signed that month.

const PE = 'Peru'
export const IS_PE = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === PE
export const PE_PLACE = (G, ...ids) => ids.includes(G.place?.id)
export const PE_LIMA = (G) => G.place?.id === 'pe_lima'

const SIERRA_RURAL = ['pe_rural', 'pe_cusco_rural', 'pe_puno_rural', 'pe_cajamarca_rural', 'pe_mantaro_rural', 'pe_ancash_rural']
const SIERRA = (G) => SIERRA_RURAL.includes(G.place?.id)
const SUGAR = (G) => G.place?.id === 'pe_chicama'
const AYACUCHO = (G) => G.place?.id === 'pe_rural'
const MANTARO = (G) => G.place?.id === 'pe_mantaro_rural'

// The emergency zone, by place and by the years the war was in it. Ayacucho
// from the first burned ballot box; the Mantaro valley from the late eighties,
// when the war moved north into Junín and took the SAIS with it.
export const inSenderoZone = (G) =>
  (G.place?.id === 'pe_rural' && G.currentYear >= 1980 && G.currentYear <= 1994) ||
  (G.place?.id === 'pe_mantaro_rural' && G.currentYear >= 1987 && G.currentYear <= 1994)

const ANDEAN = (G) => ['quechua_peruvian', 'aymara_peruvian'].includes(G.character?.ethnicity)
// Where the first language at home was an Andean one. Not Cajamarca: its
// Quechua had largely given way to Castilian in the countryside by mid-century,
// and the rondas there were argued in Spanish.
const ANDEAN_HOME = (G) => ANDEAN(G) || (SIERRA(G) && G.place?.id !== 'pe_cajamarca_rural')
const LANG = (G) => (G.character?.ethnicity === 'aymara_peruvian' ? 'Aymara' : 'Quechua')
const WENT_DOWN = (G) => G.flags.includes('pe_bajo_a_lima') || G.flags.includes('pe_desplazado')
const once = (G, key) => !G.mem?.[key]
const WORDS = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']
const inWords = (n) => WORDS[n] ?? String(n)
const FATHER = (G) => G.parents?.father && G.parents.father.alive !== false
const MOTHER = (G) => G.parents?.mother && G.parents.mother.alive !== false
// Who is standing at the radio. A narrated father has to be a living one.
const ELDER = (G) => (FATHER(G) ? 'your father' : 'your uncle')

// ── FOLLOW-THROUGH ───────────────────────────────────────────────────────────
// Written first. Every major and moderate flag the module sets is read here.

export const PERU_MIDCENTURY_FOLLOWTHROUGH = [

  {
    id: 'pem_ft_velasco_table',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_velasco_1968') && G.currentYear >= 1995 && G.age >= 38 && once(G, 'pem_ft_velasco'),
    text: (G) => G.flags.includes('pe_reforma_hacienda_lost')
      ? 'Somebody at the table says Velasco gave the country back to itself, and the table goes quiet in the way it has gone quiet at your family\'s tables for thirty years. Your uncle says the word he always says, which is ruina. You have heard both speeches so often that you could give either. What you actually remember from 1968 is the tanks on the radio and a grown-up standing very still in the doorway.'
      : `Somebody at the table says the general ruined the country, and somebody else says he was the only one who ever did anything for the campesino, and it is the same argument it was when you were a child, with the same words in the same order. You were ${inWords(1968 - (G.character?.birthYear ?? 1960))}. What you remember is the tanks on the radio and a man in the plaza saying petróleo as if it were a person who had come home.`,
    choices: null,
    effect: (p) => { p.setMem('pem_ft_velasco', true); p.e += 2 },
  },

  {
    id: 'pem_ft_cooperativa',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('pe_reforma_comunero') && G.currentYear >= 1980 && G.currentYear <= 1995 && G.age >= 18 && once(G, 'pem_ft_coop'),
    text: (G) => !(SIERRA(G) || SUGAR(G))
      ? 'A cousin comes down from home with cheese and news, and the news is that the cooperative is being divided. After all the assemblies and the manager from Lima and the accounts nobody could read, the land is going into parcelas, a piece for each family, and your share is in your father\'s name, which means your brothers are already arguing about it. You were there when the reform came. From here it sounds like a story about somewhere else.'
      : MANTARO(G) && G.currentYear >= 1988
      ? 'They come to the SAIS at night and kill the animals — the fine sheep, the ones the reform made everybody\'s — and burn the buildings, and in the morning there are men standing in the yard who have worked there since it was a hacienda and who do not say anything at all. The people who did it say the cooperative was a trick of the state. The people who lived off it say nothing, because it is not a year for saying things. Twenty years ago it was the future.'
      : SUGAR(G)
        ? 'The cooperative owes the bank, the state and the fertiliser company, and the price of sugar is what it is, and the assembly is shouting. You are a socio. You own a share of a mill that cannot pay you, and every year a different committee explains why. Somebody says the word parcelar, divide it up, and the room is suddenly very quiet.'
        : 'The cooperative is being divided. After fifteen years of assemblies and a manager from Lima and accounts that nobody could read, the land is going to be split into parcelas, a piece for each family, and everyone is measuring with their eyes. It is the thing your grandfather wanted in 1969 and it has arrived as a surveyor with a chain, and the pieces are small.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_coop', true); p.r += 3; p.e += 2 },
  },

  {
    id: 'pem_ft_hacienda_portrait',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_reforma_hacienda_lost') && G.age >= 30 && once(G, 'pem_ft_hacienda'),
    text: 'The photograph of the casa hacienda hangs in the hall of the flat in Lima, above a chest that came down from it in a lorry in 1970. Nobody born since knows which window was yours. The land is somebody else\'s now in a way that is final and legal, and the house itself is a school or a ruin, depending on who you ask. The old people say the word reform in a particular voice until they die, and you notice at some point that you have started saying it in the same voice, and you stop.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_hacienda', true); p.r += 3 },
  },

  {
    id: 'pem_ft_yungay',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('pe_terremoto_1970') && G.currentYear >= 1975 && G.age >= 14 && once(G, 'pem_ft_yungay'),
    text: (G) => G.place?.id === 'pe_ancash_rural'
      ? 'Every year on the last day of May, at twenty past three, people in the Callejón stop what they are doing. Where Yungay was is a field of grey stone with the tops of four palm trees from the old plaza still showing, and roses planted over it, and a sign that says it is a cemetery and you may not dig. The new town is a little way off. You do not go to the old place except on the day, and on the day you go.'
      : 'Every year on the last day of May, at twenty past three, you notice the time without looking for it. Chimbote was rebuilt in the way everything here is rebuilt, fast and in brick, on top of what was there. Some of the cracks in the old walls are still the cracks from that afternoon. You can point to them, and sometimes, when a visitor asks why the church is new, you do.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_yungay', true); p.r += 2; p.m -= 2 },
  },

  {
    id: 'pem_ft_children_spanish',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_castellano_school') && (G.children?.length ?? 0) > 0 && G.age >= 30 && once(G, 'pem_ft_spanish'),
    text: (G) => `You speak to your children in Castilian. You did not decide this at any moment you can find. ${MOTHER(G) ? 'Your mother speaks' : 'The old people speak'} to them in ${LANG(G)} and they answer in Castilian, and there is laughing, and then there is not, and one Sunday you hear your youngest tell a cousin that the old people talk like the people from the puna. You were hit for your first language when you were seven. You have spent your whole life making sure nobody hits your children for it, and it has worked.`,
    choices: null,
    effect: (p) => { p.setMem('pem_ft_spanish', true); p.r += 5; p.m -= 3 },
  },

  {
    id: 'pem_ft_quechua_congress',
    phase: null,
    weight: 200,
    when: (G) => G.flags.includes('pe_quechua_official') && G.currentYear >= 2006 && G.currentYear <= 2007 && G.age >= 30 && once(G, 'pem_ft_qcongress'),
    text: (G) => `${G.currentYear === 2006 ? 'In July two women from Cusco take their oath' : 'Last July two women from Cusco took their oath'} in the Congress in Quechua, and there was an argument in the chamber about whether it counted. The language was made official in 1975. Thirty-one years later it is on the news because somebody used it in the building where the laws are made. You have heard the recording more than once. Each time you are listening to the women\'s vowels, which are your grandmother\'s.`,
    choices: null,
    effect: (p) => { p.setMem('pem_ft_qcongress', true); p.m += 3; p.r += 2 },
  },

  {
    id: 'pem_ft_chuschi',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('pe_voted_1980') && G.currentYear >= 1983 && G.currentYear <= 1990 && once(G, 'pem_ft_chuschi'),
    text: 'You find yourself thinking about a paragraph in the newspaper from the week of the election, the one nobody read: in a village called Chuschi, in Ayacucho, somebody had burned the ballot boxes the night before. You remember it because it seemed so small. There is a word for what that was now and everybody knows it. It was the first shot, and it was fired at your vote.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_chuschi', true); p.e += 2; p.r += 2 },
  },

  {
    id: 'pem_ft_assembly_silence',
    phase: null,
    weight: 50,
    when: (G) => G.flags.includes('pe_sendero_assembly') && G.currentYear >= 1996 && G.age >= 30 && once(G, 'pem_ft_assembly'),
    text: 'There are people in the village you do not speak to and people who do not speak to you, and nobody under twenty knows the reason for any of it. The man who stood in front at the assembly in the plaza still lives three houses down. The family of the man who was judged there lives on the other side. At the fiesta everyone dances in the same street. The war ended in the newspapers. Here it became the seating plan.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_assembly', true); p.r += 5; p.m -= 3 },
  },

  {
    id: 'pem_ft_anfasep',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('pe_desaparecido_family') && G.currentYear >= 1984 && G.currentYear <= 2005 && G.age >= 14 && once(G, 'pem_ft_anfasep'),
    text: 'The women meet in Huamanga in a room behind the market, most of them in hats and long skirts, most of them speaking Quechua, holding photographs that have been handled so much the faces have gone soft. The association has a name nobody can say quickly. They go to the barracks at Los Cabitos and ask at the gate. They go to the prosecutor. They go to the ravine at Infiernillo when somebody says there are bodies. You go with his mother, and you carry the photograph when her hands are tired.',
    choices: [
      { text: 'Keep going with her, every week.', tag: 'defiant', outcome: 'The soldier at the gate learns your face. Nobody at the gate ever says his name back to you.', effect: (p) => { p.setMem('pem_ft_anfasep', true); p.karma += 6; p.m -= 4; p.addFlag('disappeared_family_known') } },
      { text: 'Stop going. Somebody has to be the one who is not on a list.', tag: 'yielding', outcome: 'His mother goes alone. She does not ask you again, which is worse.', effect: (p) => { p.setMem('pem_ft_anfasep', true); p.r += 6; p.addFlag('disappeared_family_known') } },
    ],
    effect: null,
  },

  {
    id: 'pem_ft_retorno',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('pe_desplazado') && PE_LIMA(G) && G.currentYear >= 1994 && G.currentYear <= 2006 && G.age >= 18 && once(G, 'pem_ft_retorno'),
    text: 'The programme has a name about repopulation and a lorry. People from your village who have been in Lima ten years are going back to see whether there is anything to go back to. The houses have no roofs; the roofs were the first thing anyone took. The fields have gone to scrub. Somebody\'s son was born in Huaycán and has never seen a llama, and is looking at one now with his mouth open.',
    choices: [
      { text: 'Go back. Put a roof on the house.', tag: null, outcome: 'The first winter is the hardest thing you have done since you left. The second you plant.', effect: (p) => { p.setMem('pem_ft_retorno', true); p.m += 4; p.h -= 3; p.relocate('pe_rural', 'informal') } },
      { text: 'Stay in Lima. Your children are limeños now.', tag: null, outcome: 'You go back for the fiesta and stay a week, and on the bus down you do not look out of the window.', effect: (p) => { p.setMem('pem_ft_retorno', true); p.r += 5 } },
    ],
    effect: null,
  },

  {
    id: 'pem_ft_ronda',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_rondero') && G.currentYear >= 1998 && G.age >= 38 && once(G, 'pem_ft_ronda'),
    text: (G) => G.place?.id === 'pe_cajamarca_rural'
      ? 'The ronda is older than your children and it still walks. The young men do the nights now, with the whistles and the chicote, and the thieves still come, fewer. The police are further off than they were and the judge further still. When a man steals here he is judged in the ronda\'s assembly and walks the night rounds with a sign on him. People from Lima call it barbarism and people from here call it the only justice that has ever arrived on time.'
      : 'They put up a monument in the plaza to the ronderos who died, with names, and yours could have been on it. What the monument does not say is that the ronda did things too, on some nights, to people who were only suspected, and that the whole village knows which nights. The army gave you the shotgun and the war gave you a reason. You still have the shotgun. It is wrapped in plastic under the roof.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_ronda', true); p.r += 4 },
  },

  {
    id: 'pem_ft_leva',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_leva') && G.age >= 40 && once(G, 'pem_ft_leva'),
    text: 'When anybody asks what you did in the army you tell them about the cold at the base and the food, which is a story, and not about the other thing, which is not. They took you off a bus. You were eighteen and you had a sack of potatoes for your aunt, and the potatoes stayed on the bus. In 1999 they abolished it — the obligatory service — and you read the article twice to be sure that it meant nobody else\'s son would be pulled off a bus.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_leva', true); p.r += 4; p.m -= 2 },
  },

  {
    id: 'pem_ft_titulo',
    phase: null,
    weight: 55,
    when: (G) => G.flags.includes('pe_invasion') && G.currentYear >= 1996 && G.currentYear <= 2010 && once(G, 'pem_ft_titulo'),
    text: 'The title comes in a plastic folder with the state\'s seal on it. The land your house stands on — land you took from nobody in the middle of the night with a mat and a flag — is yours now on paper, after all the years of being yours in fact. The house is brick now, and the top floor has iron rods sticking out of the roof for the next one. You put the folder in the cupboard with the baptism certificates. Your neighbour frames hers.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_titulo', true); p.m += 6; p.w += 2 },
  },

  {
    id: 'pem_ft_club_provincial',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('pe_bajo_a_lima') && PE_LIMA(G) && G.age >= 28 && G.currentYear >= 1972 && once(G, 'pem_ft_club'),
    text: 'On Sundays there is the club — the association of people from your province, in a hall in La Victoria with a painting of the church from home on the back wall. There is a band from home and chicha de jora and a patron saint carried round the block on the shoulders of men who drive buses the rest of the week. Your children are bored. You are, for four hours, from somewhere.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_club', true); p.m += 5; p.s += 2 },
  },

  {
    id: 'pem_ft_fiesta_return',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('pe_bajo_a_lima') && G.age >= 50 && once(G, 'pem_ft_fiesta'),
    text: 'You go back for the fiesta and you are the one sponsoring it this year — the band, the fireworks, the beer for three days — because that is what people who went to Lima and did well are for. You did not do well. You did well enough, from here. The cousins who stayed call you the limeño. In Lima, for forty years, you were the serrano. You drink with the band until it gets light.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_fiesta', true); p.m += 4; p.mo -= 400 },
  },

  {
    id: 'pem_ft_empleada',
    phase: null,
    weight: 55,
    when: (G) => G.flags.includes('pe_empleada') && G.age >= 32 && G.children?.some(c => c.gender === 'female' && c.alive !== false) && once(G, 'pem_ft_empleada'),
    text: 'Your daughter is nearly the age you were, and a woman from a good district asks after her at the market, as a favour, a good house, she would learn. You say no before the woman has finished. You say it again on the bus and again at the stove. You remember the separate plate and the separate cup and the room behind the kitchen with no window, and the Sunday, which was the only thing that was yours.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_empleada', true); p.karma += 4; p.r += 3 },
  },

  {
    id: 'pem_moyano',
    phase: null,
    weight: 200,
    when: (G) => G.flags.includes('pe_comedor') && IS_PE(G) && G.currentYear >= 1992 && G.currentYear <= 1993 && once(G, 'pem_moyano'),
    text: 'They killed María Elena Moyano in February, at a pollada in Villa El Salvador, in front of her children, and then they put dynamite on her body. She was the deputy mayor. Before that she was the woman who ran the comedores and the glass of milk, the woman who told them in public that they did not speak for the poor. At the comedor the next morning the women cook anyway, because the children still come at noon, and nobody says her name out loud for a while.',
    choices: [
      { text: 'Keep cooking. That was the point of her.', tag: 'defiant', outcome: 'The pots go on at seven. There are fewer women on the rota and the same number of children.', effect: (p) => { p.setMem('pem_moyano', true); p.karma += 6; p.m -= 6 } },
      { text: 'Stop going for a while. Your own children are at home.', tag: 'yielding', outcome: 'You go back in the winter, and nobody asks where you were, because several of them were also somewhere.', effect: (p) => { p.setMem('pem_moyano', true); p.m -= 8; p.r += 5 } },
    ],
    effect: null,
  },

  {
    id: 'pem_ft_dollars',
    phase: null,
    weight: 45,
    when: (G) => (G.flags.includes('pe_hiperinflacion') || G.flags.includes('pe_fujishock')) && G.currentYear >= 1996 && G.age >= 32 && once(G, 'pem_ft_dollars'),
    text: 'You keep what you can in dollars, in an envelope in the wardrobe, and when you buy anything large you think in dollars first and soles second. The sol has been steady for years now. It does not matter. You once watched a month\'s pay become a bag of bread and a tin of milk between the Friday and the Monday, and the part of you that watched it is still standing in that queue, and it does not believe in the sol.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_dollars', true); p.e += 2 },
  },

  {
    id: 'pem_ft_dorissa',
    phase: null,
    weight: 150,
    when: (G) => G.flags.includes('pe_corrientes_oil') && G.currentYear >= 2006 && G.currentYear <= 2009 && once(G, 'pem_ft_dorissa'),
    text: 'In October the communities of the Corrientes take the oil installations at Dorissa and shut the valves, and for two weeks the country hears the word Achuar on the news. What they want is written down at the end: the water the company pumps out with the oil to go back into the ground, not into the river; a clinic; the blood tests done properly. Your children\'s blood had lead and cadmium in it when the ministry finally tested. The paper is signed in a hut on the riverbank. It is the first time anyone from Lima has come up this river to sign anything.',
    choices: null,
    effect: (p) => { p.setMem('pem_ft_dorissa', true); p.karma += 4; p.m += 4 },
  },

]

// ── THE EVENTS ───────────────────────────────────────────────────────────────

export const PERU_MIDCENTURY_EVENTS = [

  // ── BEFORE THE REFORM ──────────────────────────────────────────────────────

  {
    id: 'pem_hacienda_childhood',
    phase: null,
    weight: 300,
    when: (G) => IS_PE(G) && (SIERRA(G) || SUGAR(G)) && G.currentYear >= 1955 && G.currentYear <= 1969 &&
      G.age >= 5 && G.age <= 12 && (G.character?.wealthTier ?? 3) <= 2 && FATHER(G) && once(G, 'pem_hacienda'),
    text: (G) => SUGAR(G)
      ? 'The cane is higher than the house and it belongs to the company, and so does the house, and the shop where your mother buys the rice with a paper chit, and the hospital, and the train that takes the cane to the mill. The whistle tells the valley when to get up. Your father cuts and his hands are hard in a way that feels like wood when he lifts you. The owners are Gildemeister, which is a word you can say before you can say your own surname.'
      : 'Your father owes the hacienda four days a week for the right to plant on the steep piece above the river, and when he has done the four days he works his own. The women take their turns in the big house, cooking, and the boys take theirs at the door, sleeping in the passage like a dog, which is the job, and it has a name. The patrón comes up from Lima twice a year. When he rides through, the grown men take their hats off and look at the ground, and you learn to do it too.',
    choices: null,
    effect: (p) => { p.setMem('pem_hacienda', true); p.m -= 4; p.r += 2 },
  },

  {
    id: 'pem_castellano_school',
    phase: null,
    weight: 220,
    when: (G) => IS_PE(G) && G.literate && ANDEAN_HOME(G) && G.character?.ethnicity !== 'white_peruvian' &&
      G.currentYear >= 1950 && G.currentYear <= 1985 && G.age >= 6 && G.age <= 11 && once(G, 'pem_castellano'),
    text: (G) => `The school is one room and the teacher is from the city and speaks only Castilian, and in the first week a boy answers her in ${LANG(G)} and she hits his hand with the ruler, and after that nobody does. You learn the Castilian words for things you already have words for. Mesa. Agua. Casa. At home they ask what you learned, in ${LANG(G)}, and you tell them, in ${LANG(G)}, and then you stop, because the words for what you learned are not in that language.`,
    choices: [
      { text: 'Learn it fast. Be the one who answers.', tag: 'yielding', outcome: 'By the third year you are the one the teacher sends to the district office with messages. At home you have started to sound, your grandmother says, like somebody from the town.', effect: (p) => { p.setMem('pem_castellano', true); p.e += 4; p.s += 2; p.addFlag('pe_castellano_school') } },
      { text: 'Keep your mouth shut in there and your language out here.', tag: 'defiant', outcome: 'You are quiet in the classroom for four years and loud everywhere else. Your Castilian stays a school coat you put on at the door.', effect: (p) => { p.setMem('pem_castellano', true); p.e += 2; p.r += 3; p.addFlag('pe_castellano_school') } },
    ],
    effect: null,
  },

  // ── VELASCO ────────────────────────────────────────────────────────────────

  {
    id: 'pem_velasco_coup',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && G.currentYear === 1968 && G.age >= 6 && once(G, 'pem_velasco'),
    text: (G) => PE_LIMA(G)
      ? `In the first week of October the radio says the armed forces have taken charge of the nation, and that the president was put on a plane to Buenos Aires before it was light, still in the clothes he slept in. There are tanks in the Plaza de Armas and then there are not. Six days later the soldiers take the oil field at Talara from the Americans and the general calls it the Day of National Dignity, and ${ELDER(G)}, who has never had an opinion about oil in his life, says it twice at dinner.`
      : 'The news arrives on the radio at the shop, a week late for some people and on time for others: there is a general in the palace now, and the president has been sent away on a plane. Then the general takes the Americans\' oil, far away on the coast, and somebody in the plaza reads it out of a newspaper to the men, slowly. The word they keep repeating is dignity. It is not clear yet what it will mean up here, and the older men say it will mean nothing, as it always has.',
    context: 'General Juan Velasco Alvarado deposed President Fernando Belaúnde on 3 October 1968. Six days later his government nationalised the International Petroleum Company\'s field at La Brea y Pariñas, and 9 October was declared the Day of National Dignity. His "Revolutionary Government of the Armed Forces" went on to carry out the most sweeping land reform in South American history outside Cuba.',
    choices: null,
    effect: (p) => { p.setMem('pem_velasco', true); p.e += 2; p.addFlag('pe_velasco_1968') },
  },

  {
    id: 'pem_reforma_agraria',
    phase: null,
    weight: 500,
    when: (G) => IS_PE(G) && (SIERRA(G) || SUGAR(G)) && G.currentYear >= 1969 && G.currentYear <= 1975 && G.age >= 7 &&
      (G.character?.wealthTier ?? 3) <= 3 && FATHER(G) && once(G, 'pem_reforma'),
    text: (G) => SUGAR(G)
      ? 'On the morning after the law, soldiers walk into the mill at Casa Grande and the managers walk out. The estate is a cooperative now, the radio says, and the men who cut the cane are its owners, socios, and there is an assembly in the yard where the foremen used to shout. A poster goes up with the face of Túpac Amaru on it. Your father comes home and sits for a long time without taking his boots off and then says, to nobody, that they will see.'
      : 'The radio in the plaza plays the general\'s voice and one sentence goes round the valley for a year: campesino, the patrón will no longer eat from your poverty. The engineers come with maps. The hacienda becomes a cooperative with initials, and the casa hacienda becomes its office, and your father no longer owes anybody four days. What he owes now is harder to name — meetings, a manager from Lima, a share of something. He walks up to the big house one evening, and goes in by the front door, and comes out again, and walks home.',
    context: 'Decree Law 17716, promulgated on 24 June 1969 — the day that had been the Día del Indio, renamed the Día del Campesino — expropriated some 15,000 estates. The coastal sugar estates became workers\' cooperatives (CAPs); much highland land went into large cooperative units (SAIS) rather than to individual families, which is why land invasions of the reform\'s own cooperatives followed in the 1970s.',
    choices: [
      { text: 'Go to the assemblies. It is yours now; learn how it works.', tag: null, outcome: 'You learn the words — socio, balance, directiva — and you learn that a meeting can go on for nine hours and that the manager keeps the accounts in a drawer that locks.', effect: (p) => { p.setMem('pem_reforma', true); p.e += 3; p.m += 4; p.addFlag('pe_reforma_comunero') } },
      { text: 'Your family wants land, not a share in a cooperative.', tag: 'defiant', outcome: 'In the dry season the comunidad marches onto the cooperative\'s pasture with flags and plants a boundary of stones. The reform sends police to protect the reform.', effect: (p) => { p.setMem('pem_reforma', true); p.m += 2; p.r += 3; p.addFlag('pe_reforma_comunero') } },
    ],
    effect: null,
  },

  {
    id: 'pem_reforma_hacendado',
    phase: null,
    weight: 500,
    when: (G) => IS_PE(G) && G.currentYear >= 1969 && G.currentYear <= 1975 && G.age >= 7 &&
      (G.character?.wealthTier ?? 0) >= 4 && ['white_peruvian', 'mestizo_peruvian'].includes(G.character?.ethnicity) &&
      (SIERRA(G) || SUGAR(G) || (PE_LIMA(G) && G.character?.ethnicity === 'white_peruvian')) && once(G, 'pem_hacendado'),
    text: 'The engineers from the reform office arrive in a jeep with a list, and your grandfather receives them on the veranda because he does not know how else to receive people, and offers them coffee, and they accept. The valuation is in bonds. The bonds are for twenty years and the inflation will eat them in five, though nobody at the table knows that yet. The peones stand at the corral and watch the jeep leave. By Christmas the family is in Lima, in a flat, with the dining table that is too big for the room.',
    choices: null,
    effect: (p) => { p.setMem('pem_hacendado', true); p.m -= 10; p.wipeMoney(0.3); p.r += 5; p.addFlag('pe_reforma_hacienda_lost'); p.relocate('pe_lima', 'middle_class') },
  },

  // ── THE EARTHQUAKE ─────────────────────────────────────────────────────────

  {
    id: 'pem_terremoto_1970',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && PE_PLACE(G, 'pe_ancash_rural', 'pe_chimbote') && G.currentYear === 1970 && G.age >= 4 && once(G, 'pem_terremoto'),
    text: (G) => G.place?.id === 'pe_chimbote'
      ? 'It is Sunday afternoon and the World Cup has started in Mexico, and at twenty past three the floor comes up under you. It goes on for longer than anything goes on. When it stops the town is dust, and people are running uphill in case the sea comes. Half the houses are down. Your family sleeps in the street for a month under a plastic sheet, and the smell of the fishmeal plants is replaced by another smell.'
      : 'At twenty past three on a Sunday the ground moves for most of a minute and then there is a roar from up the valley that is not the earthquake. A piece of Huascarán has come off, and ice and rock and mud are coming down the valley faster than a lorry. In Yungay the ones who lived were the ones who ran up the cemetery hill. Yungay is gone — not fallen down, gone, under a grey field. You were on the other side of the river, which is the whole reason for everything afterwards.',
    context: 'The Ancash earthquake of 31 May 1970, magnitude 7.9, killed some 70,000 people, the deadliest natural disaster in Peru\'s history. It dislodged part of the north face of Huascarán; the resulting avalanche buried the town of Yungay. It struck on the opening day of the 1970 World Cup, where Peru reached the quarter-finals.',
    choices: null,
    effect: (p) => { p.setMem('pem_terremoto', true); p.m -= 12; p.h -= 3; p.r += 4; p.addFlag('pe_terremoto_1970'); p.addFlag('earthquake_survivor') },
  },

  {
    id: 'pem_terremoto_radio',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && !PE_PLACE(G, 'pe_ancash_rural', 'pe_chimbote') && G.currentYear === 1970 && G.age >= 4 && once(G, 'pem_terremoto'),
    text: (G) => `On the last Sunday in May the radio stops the football to say there has been an earthquake in the north. Then it says Chimbote. Then it says Huaraz. For days after, the numbers go up — ten thousand, thirty, fifty — and a word you have never heard is said over and over: Yungay, a town that is not there any more. On the Tuesday Peru beats Bulgaria in Mexico, three to two, and the players wear black on their arms, and ${ELDER(G)} cries at the radio and does not say which thing he is crying about.`,
    context: 'The Ancash earthquake of 31 May 1970 killed some 70,000 people and buried the town of Yungay under an avalanche from Huascarán. It struck on the opening day of the 1970 World Cup; Peru played Bulgaria two days later and won 3-2.',
    choices: null,
    effect: (p) => { p.setMem('pem_terremoto', true); p.m -= 4; p.e += 1 },
  },

  {
    id: 'pem_terremoto_after',
    phase: null,
    weight: 300,
    when: (G) => G.flags.includes('pe_terremoto_1970') && G.currentYear >= 1971 && G.currentYear <= 1972 && once(G, 'pem_terremoto_after'),
    text: 'A year on, the relief still comes in sacks with foreign writing on them, and the families from the ruined streets live in wooden prefabricated huts in rows, which were meant for six months. You know which of the children in the district lost both parents, because you are told not to mention it and it is all anyone mentions. When the ground shivers now — a lorry, a door — everybody in the room is already standing.',
    choices: null,
    effect: (p) => { p.setMem('pem_terremoto_after', true); p.m -= 3; p.r += 2 },
  },

  // ── THE MOVE DOWN ──────────────────────────────────────────────────────────

  {
    id: 'pem_bajada_a_lima',
    phase: null,
    weight: 260,
    when: (G) => IS_PE(G) && SIERRA(G) && G.character?.ruralUrban === 'rural' && G.currentYear >= 1962 && G.currentYear <= 1995 &&
      G.age >= 15 && G.age <= 26 && !WENT_DOWN(G) && !G.flags.includes('pe_empleada') && once(G, 'pem_bajada'),
    text: 'An uncle has been in Lima six years and has a room and a stall, and he says there is work — in construction, in the market, in a house. The lorry leaves at night and goes over the pass at Ticlio, so high your ears sing and a man across from you vomits into his hat, and in the morning it comes down into a grey that does not lift, and a smell of the sea you have never smelled. From the edge of the city the hills are covered in houses made of straw mats. Your uncle meets you at the bus yard wearing shoes.',
    choices: [
      { text: 'Stay. Take the room behind the uncle\'s and find work.', tag: null, outcome: 'You learn the bus routes before the streets. In the first month someone calls you serrano in a voice that tells you exactly what the word costs.', effect: (p) => { p.setMem('pem_bajada', true); p.mo += 150; p.m -= 3; p.addFlag('pe_bajo_a_lima'); p.addFlag('rural_to_urban'); p.relocate('pe_lima', 'informal') } },
      { text: 'Go back up. The land needs you and the grey gets into your chest.', tag: null, outcome: 'You go back after three weeks with a radio and a story, and your mother says nothing, and puts your blanket back where it was.', effect: (p) => { p.setMem('pem_bajada', true); p.r += 4; p.m += 2 } },
    ],
    effect: null,
  },

  {
    id: 'pem_empleada',
    phase: null,
    weight: 280,
    when: (G) => IS_PE(G) && SIERRA(G) && G.character?.gender === 'female' && (G.character?.wealthTier ?? 3) <= 2 &&
      G.currentYear >= 1960 && G.currentYear <= 1990 && G.age >= 11 && G.age <= 16 && !WENT_DOWN(G) && MOTHER(G) && once(G, 'pem_empleada'),
    text: 'A woman from Lima who knows the priest knows a family who needs a girl. Your mother washes your hair in the stream and plaits it tight and you go down in a bus with a card that has an address on it. The house has a garden with a hose in it. You are given a uniform, a room behind the kitchen with no window, your own plate and your own cup which are not to be washed with theirs, and Sunday afternoons. The señora calls you by a name that is not yours because yours is hard for her to say.',
    choices: null,
    effect: (p) => { p.setMem('pem_empleada', true); p.m -= 10; p.r += 6; p.mo += 60; p.addFlag('pe_empleada'); p.addFlag('pe_bajo_a_lima'); p.addFlag('domestic_worker'); p.addFlag('rural_to_urban'); p.relocate('pe_lima', 'middle_class') },
  },

  {
    id: 'pem_invasion',
    phase: null,
    weight: 300,
    when: (G) => IS_PE(G) && PE_LIMA(G) && WENT_DOWN(G) && G.currentYear >= 1968 && G.currentYear <= 1995 && G.age >= 18 && once(G, 'pem_invasion'),
    text: 'The word goes round the rented rooms for weeks and then it is tonight. Two hundred families walk out onto the sand at the edge of the city after dark carrying poles and rolled straw mats and one Peruvian flag each, because a flag on a mat means the police have to think twice. By morning there is a grid, of sorts, drawn in the sand with a stick, and a committee, and a name for the place taken from a saint or a date. You have a lot. It is ten metres by twenty of desert and it is the first thing in your life that has your name on it.',
    choices: [
      { text: 'Stake the lot. Sleep on it tonight with the flag up.', tag: 'defiant', outcome: 'The police come on the third day and look, and go. By the rains that do not come, you have a wall of mats on all four sides and a stone for a doorstep.', effect: (p) => { p.setMem('pem_invasion', true); p.m += 6; p.h -= 2; p.addFlag('pe_invasion'); p.relocate('pe_lima', 'informal') } },
      { text: 'Keep the rented room. Somebody always gets beaten on the first night.', tag: 'yielding', outcome: 'Somebody does. A year later that settlement has a school built by its own hands, and your cousin is on its committee.', effect: (p) => { p.setMem('pem_invasion', true); p.r += 4 } },
    ],
    effect: null,
  },

  {
    id: 'pem_chicha',
    phase: null,
    weight: 180,
    when: (G) => IS_PE(G) && PE_LIMA(G) && (WENT_DOWN(G) || G.character?.ruralUrban === 'rural' || ANDEAN(G)) &&
      G.currentYear >= 1979 && G.currentYear <= 1992 && G.age >= 15 && G.age <= 35 && once(G, 'pem_chicha'),
    text: 'On Saturday night the chichódromo is a car park with a stage and a tarpaulin and three thousand people from the sierra dancing to electric guitars that play huayno as if it were cumbia. Los Shapis sing about the jungle and the mountain and the people who came down, and the whole car park sings back a song about itself. In Miraflores they call it music for cholos. Here it is the only music that has ever described the bus you take.',
    choices: null,
    effect: (p) => { p.setMem('pem_chicha', true); p.m += 6; p.s += 2 },
  },

  // ── THE REVOLUTION'S LAST YEARS ────────────────────────────────────────────

  {
    id: 'pem_quechua_oficial',
    phase: null,
    weight: 400,
    when: (G) => IS_PE(G) && (ANDEAN_HOME(G) || G.flags.includes('pe_castellano_school')) && G.character?.ethnicity !== 'white_peruvian' &&
      G.currentYear >= 1975 && G.currentYear <= 1976 && G.age >= 8 && once(G, 'pem_quechua'),
    text: (G) => `The radio says Quechua is an official language of the Republic now, the same as Castilian, by decree, and that it will be taught and used in the courts. ${LANG(G) === 'Aymara' ? 'Your grandmother listens and says, in Aymara, that Quechua was already a language, and so is hers.' : 'Your grandmother listens and says, in Quechua, that it was already a language.'} In the district office the forms are still in Castilian and the clerk still pretends not to understand you. By August the general who signed it has been replaced by another general, and nobody mentions it again for a long time.`,
    context: 'Decree Law 21156 of 27 May 1975 made Quechua an official language of Peru alongside Spanish, the first Latin American state to do so for an indigenous language. Implementation was minimal; Velasco was deposed that August by General Francisco Morales Bermúdez.',
    choices: null,
    effect: (p) => { p.setMem('pem_quechua', true); p.m += 3; p.addFlag('pe_quechua_official') },
  },

  {
    id: 'pem_paro_1977',
    phase: null,
    weight: 260,
    when: (G) => IS_PE(G) && G.ruralUrban === 'urban' && G.currentYear >= 1976 && G.currentYear <= 1978 && G.age >= 12 && once(G, 'pem_paro'),
    text: 'The new general announces the prices on the radio on a Sunday night — the paquete, people call it, as if it were a parcel somebody has left on the step — and on Monday bread is dearer and the bus is dearer and kerosene is dearer. In July the whole country stops. No buses, no markets, the shutters down, stones in the avenue. A man on your street who has never struck in his life stands at the corner with his arms folded all day, as if guarding it.',
    choices: null,
    effect: (p) => { p.setMem('pem_paro', true); p.m -= 4; p.mo -= 80 },
  },

  {
    id: 'pem_argentina_seis',
    phase: null,
    weight: 220,
    when: (G) => IS_PE(G) && G.currentYear === 1978 && G.age >= 7 && once(G, 'pem_seis'),
    text: 'Argentina needs to win by four and they win by six. The goalkeeper was born in Rosario, which is where the match is, and by the next morning every man at every stall has his theory, and all the theories include wheat, and a ship, and a general in each country. Nobody can prove anything and nobody ever will. You learn, at whatever age you are, the national habit of being sure of something that cannot be proved.',
    choices: null,
    effect: (p) => { p.setMem('pem_seis', true); p.m -= 2 },
  },

  {
    id: 'pem_ronda_cajamarca',
    phase: null,
    weight: 350,
    when: (G) => IS_PE(G) && G.place?.id === 'pe_cajamarca_rural' && G.character?.gender === 'male' &&
      G.currentYear >= 1977 && G.currentYear <= 1995 && G.age >= 16 && G.age <= 50 && once(G, 'pem_ronda_caj'),
    text: 'The cattle thieves come at night and the police are in Chota and do not come at all, so the comunidad decides that the men will walk. Every household gives a night. You go out in a poncho with a whistle and a stick and a torch whose batteries you paid for, in a line of eight, along paths you have known your whole life and have never walked at two in the morning. When a whistle goes on the next hill, you answer it with yours.',
    choices: [
      { text: 'Take your turn every week, and more.', tag: null, outcome: 'Within a year the stealing is down to almost nothing. The comunidad is prouder of this than of anything the state has ever done for it.', effect: (p) => { p.setMem('pem_ronda_caj', true); p.h -= 2; p.karma += 5; p.s += 2; p.addFlag('pe_rondero') } },
      { text: 'Pay a neighbour to walk your nights.', tag: null, outcome: 'It is allowed, once or twice. The third time the assembly says your name out loud, and you walk.', effect: (p) => { p.setMem('pem_ronda_caj', true); p.mo -= 30; p.addFlag('pe_rondero') } },
    ],
    effect: null,
  },

  // ── 1980 ───────────────────────────────────────────────────────────────────

  {
    id: 'pem_first_vote_1980',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && G.currentYear === 1980 && G.age >= 10 && once(G, 'pem_vote80'),
    text: (G) => G.age >= 18
      ? (G.literate
        ? 'Twelve years of generals end in a queue outside a school on a Sunday in May. You mark the paper and fold it and your thumb goes into the purple ink. It is the first election in which the people who cannot read may vote, and the old woman in front of you in the queue asks you, in Quechua, which picture is the architect. Belaúnde wins — the same Belaúnde the tanks put on a plane — and the country goes back to exactly where it was, twelve years older.'
        : 'It is the first time in the history of the Republic that a person who cannot read may vote, and you are one of them. You stand in the queue on a Sunday in May with your identity card in a plastic bag. The ballot has pictures on it: the symbols of the parties, so that you can choose by the face and the sign. You choose. Your thumb goes into the purple ink and stays purple for a week, and you do not try very hard to wash it.')
      : 'Your parents come back from voting with their thumbs purple and argue about the architect all through lunch. There have been generals for as long as you can remember, and now there is an election, and a man on the radio explains that it is the first time everyone may vote — even the ones who cannot read. In a village in Ayacucho the night before, somebody burned the ballot boxes. It is a small paragraph. Nobody reads it.',
    context: 'The general election of 18 May 1980 returned Fernando Belaúnde, whom Velasco had deposed in 1968. It was the first held under the 1979 constitution, which extended the vote to illiterate citizens. On the night of 17 May, Shining Path militants burned the ballot boxes in Chuschi, Ayacucho — the act the movement counts as the start of its war.',
    choices: null,
    effect: (p) => { p.setMem('pem_vote80', true); p.m += 3; p.addFlag('pe_voted_1980') },
  },

  {
    id: 'pem_perros_1980',
    phase: null,
    weight: 260,
    when: (G) => IS_PE(G) && PE_LIMA(G) && G.currentYear >= 1980 && G.currentYear <= 1981 && G.age >= 8 && once(G, 'pem_perros'),
    text: 'On the morning after Christmas there are dead dogs hanging from the lampposts in the centre of Lima, with cardboard signs round their necks that say Deng Xiaoping, son of a bitch. People stop and look and walk on. The newspapers treat it as a joke by lunatics. It is the first time most of the city has heard the name Sendero Luminoso. It will not be the last thing they hang up.',
    choices: null,
    effect: (p) => { p.setMem('pem_perros', true); p.m -= 3 },
  },

  // ── THE WAR, FROM INSIDE THE ZONE ──────────────────────────────────────────

  {
    id: 'pem_uchuraccay',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && G.currentYear === 1983 && G.age >= 12 && once(G, 'pem_uchuraccay'),
    text: (G) => inSenderoZone(G)
      ? 'Eight journalists from Lima walk up to Uchuraccay in January with their cameras, and the comuneros, who have been told by the army that anyone coming on foot is Sendero, kill them all. Then a commission comes from Lima with a famous novelist at its head, to explain the comuneros to the country. Up here nobody needed it explained. You know how it happens: people are told who the enemy is, and then someone arrives on foot.'
      : 'Eight journalists are killed in a village called Uchuraccay, in the high puna of Ayacucho, and Lima, which has not been looking at Ayacucho, looks. A famous novelist leads a commission and writes that the comuneros live in another time. The photographs from the last roll of film are printed in the newspaper: the men from the village, close up, and then the film ends. For the first time the war has faces in it that Lima recognises.',
    context: 'On 26 January 1983 eight journalists and their guide were killed by villagers in Uchuraccay, Huanta. A government commission headed by Mario Vargas Llosa attributed the killings to villagers who mistook them for Shining Path militants. The Truth Commission later found that the security forces had encouraged highland communities to kill suspected militants, and that scores of Uchuraccay\'s own villagers were killed by both sides in the years that followed, until the village was abandoned.',
    choices: null,
    effect: (p) => { p.setMem('pem_uchuraccay', true); p.e += 2; p.m -= 4 },
  },

  {
    id: 'pem_asamblea_popular',
    phase: null,
    weight: 450,
    when: (G) => IS_PE(G) && inSenderoZone(G) && G.age >= 12 && once(G, 'pem_asamblea'),
    text: 'They come into the plaza at dusk, young, some of them from the university in Huamanga, with a red flag and two rifles and a list, and ring the church bell so that everyone comes. There is a speech about the old state and the new power. Then the list: the lieutenant governor, a man who sold to the army, a woman who talks too much. The juicio popular takes twenty minutes. Afterwards they say that anyone who takes the body down will be next.',
    choices: [
      { text: 'Stand at the back and say nothing, with everybody else.', tag: 'yielding', outcome: 'The body stays in the plaza two days. When the army comes the next week, they want to know why nobody took it down.', effect: (p) => { p.setMem('pem_asamblea', true); p.m -= 14; p.r += 8; p.addFlag('pe_sendero_assembly'); p.addFlag('war_zone_civilian') } },
      { text: 'Help his family take him down at night.', tag: 'defiant', outcome: 'You bury him before light behind his own house. Two people saw you, and for years you do not know which two.', effect: (p) => { p.setMem('pem_asamblea', true); p.m -= 12; p.karma += 8; p.h -= 2; p.addFlag('pe_sendero_assembly'); p.addFlag('war_zone_civilian') } },
    ],
    effect: null,
  },

  {
    id: 'pem_desaparecido',
    phase: null,
    weight: 320,
    when: (G) => IS_PE(G) && inSenderoZone(G) && G.currentYear >= 1983 && G.currentYear <= 1992 && G.age >= 12 && once(G, 'pem_desaparecido'),
    text: (G) => `The soldiers come before dawn with their faces blackened and a list of their own, and ${G.age <= 22 ? 'your uncle is on it — your father\'s youngest brother, who sleeps in the room with the sacks' : 'your cousin is on it — the one who works the field next to yours'} — or somebody with a name like his. They take him in the back of a truck. His mother goes to the barracks in Huamanga the next morning and the soldier at the gate says there is nobody here by that name, and he says it again the next day, and the next. There is no body. There is no charge. There is a word for this that you learn now and will use for the rest of your life.`,
    choices: null,
    effect: (p) => { p.setMem('pem_desaparecido', true); p.m -= 18; p.h -= 3; p.r += 10; p.addFlag('pe_desaparecido_family'); p.addFlag('disappeared_family_known'); p.addFlag('war_zone_civilian') },
  },

  {
    id: 'pem_desplazado',
    phase: null,
    weight: 380,
    when: (G) => IS_PE(G) && AYACUCHO(G) && inSenderoZone(G) && G.currentYear >= 1983 && G.age >= 10 && !G.flags.includes('pe_bajo_a_lima') && once(G, 'pem_desplazado'),
    text: 'After the second massacre in the district the families start to leave at night with what can be carried, down the ravines to the road and the road to Huamanga, and from Huamanga the bus to Lima. Nobody says they are leaving. A house is simply dark one evening and the dog is still there. Your parents discuss it in whispers for a week, and the week ends when the army finds a body on the path to your field.',
    choices: [
      { text: 'Go. Lima, and whoever there will take you in.', tag: null, outcome: 'You arrive at a cousin\'s mat house in a settlement on a hill with six hundred other families from the same province. People from home greet each other there as if at a funeral.', effect: (p) => { p.setMem('pem_desplazado', true); p.m -= 10; p.addFlag('pe_desplazado'); p.addFlag('displaced'); p.addFlag('rural_to_urban'); p.relocate('pe_lima', 'informal') } },
      { text: 'Stay. The land is the only thing the family has ever had.', tag: 'defiant', outcome: 'You stay, and so does the war. Of the forty families in the village, eleven are still there at the end of the year.', effect: (p) => { p.setMem('pem_desplazado', true); p.m -= 12; p.r += 6; p.addFlag('war_zone_civilian') } },
    ],
    effect: null,
  },

  {
    id: 'pem_ronda_autodefensa',
    phase: null,
    weight: 350,
    when: (G) => IS_PE(G) && PE_PLACE(G, 'pe_rural', 'pe_mantaro_rural') && G.character?.gender === 'male' &&
      G.currentYear >= 1989 && G.currentYear <= 1995 && G.age >= 15 && G.age <= 55 && once(G, 'pem_autodefensa'),
    text: 'The captain from the base comes up with a sack of shotguns and a list and says the village is a self-defence committee now, whether it likes it or not, and that a village without a committee is a village that is with them. The shotguns are Winchesters, old, one for every six men. You learn to stand guard on the ridge at night with a horn to blow. The next time the columna comes, the village fights. It is the first time that has happened, and the army is proud of it, and so, somewhat against your will, are you.',
    choices: [
      { text: 'Take a shotgun.', tag: 'defiant', outcome: 'You carry it for four years. On two nights you fire it. You do not know, either time, whether you hit anybody.', effect: (p) => { p.setMem('pem_autodefensa', true); p.m -= 6; p.h -= 2; p.addFlag('pe_rondero'); p.addFlag('war_zone_civilian') } },
      { text: 'Stand the watch with the horn, and leave the gun to others.', tag: null, outcome: 'You blow the horn once, in 1991, and the whole ridge answers. After that nobody in the village calls you a coward, which you had half expected.', effect: (p) => { p.setMem('pem_autodefensa', true); p.m -= 4; p.addFlag('pe_rondero'); p.addFlag('war_zone_civilian') } },
    ],
    effect: null,
  },

  {
    id: 'pem_leva',
    phase: null,
    weight: 240,
    when: (G) => IS_PE(G) && G.character?.gender === 'male' && (G.character?.wealthTier ?? 3) <= 2 &&
      G.currentYear >= 1970 && G.currentYear <= 1999 && G.age >= 17 && G.age <= 21 && !G.inPrison && once(G, 'pem_leva'),
    text: (G) => G.currentYear >= 1983 && G.currentYear <= 1995
      ? 'The truck stops the bus on the road into town and two soldiers get on and walk down the aisle looking at the young men\'s faces, and they point, and you get off. This is the leva. Nobody asks for a document; the ones with rich fathers have them anyway. Three months later you are at a base in the emergency zone, a boy from somewhere else, guarding a bridge at night in a country that has been told you are its protection and is not sure.'
      : 'The truck stops the bus on the road into town and two soldiers get on and walk down the aisle looking at the young men\'s faces, and they point, and you get off. This is the leva. The boys from good families have their papers and stay on the bus. Two years in a barracks on the coast, peeling potatoes and running in boots until your feet bleed, and you come out knowing how to march and how to wait and very little else.',
    choices: null,
    effect: (p) => { p.setMem('pem_leva', true); p.m -= 8; p.h += 1; p.r += 4; p.addFlag('pe_leva'); p.addFlag('military_service') },
  },

  // ── THE WAR, FROM LIMA ─────────────────────────────────────────────────────

  {
    id: 'pem_apagon',
    phase: null,
    weight: 240,
    when: (G) => IS_PE(G) && PE_LIMA(G) && G.currentYear >= 1983 && G.currentYear <= 1992 && G.age >= 6 && once(G, 'pem_apagon'),
    text: 'The lights go out across the whole city at once, which means the towers have been blown up in the mountains again, and in the dark, on the hill above the city, a hammer and sickle made of burning tyres comes alight, very large. Then the dynamite somewhere, far off, like a door slamming in another house. The candles are in the drawer by the stove for exactly this. You eat by one of them. Everybody does.',
    choices: null,
    effect: (p) => { p.setMem('pem_apagon', true); p.m -= 4 },
  },

  {
    id: 'pem_vaso_de_leche',
    phase: null,
    weight: 280,
    when: (G) => IS_PE(G) && PE_LIMA(G) && G.character?.gender === 'female' && ['informal', 'working_class'].includes(G.neighborhoodTier) &&
      G.currentYear >= 1984 && G.currentYear <= 1991 && G.age >= 18 && G.age <= 55 && once(G, 'pem_vaso'),
    text: 'The comedor is twenty-five women, three enormous pots and a rota, in a room with a tin roof that the neighbours built on a Sunday. You cook for two hundred at a sol a plate, less for those who cannot. In the mornings there is the glass of milk from the municipality for every child in the settlement, and the queue with the tin cups. Nobody calls it politics. It is the most organised thing in the whole of Lima, and it is run by women whose husbands think they are at the market.',
    choices: [
      { text: 'Take a place on the rota. Then on the committee.', tag: null, outcome: 'You learn to keep accounts that a hundred hungry people will check. You learn which of the men from the parties are lying.', effect: (p) => { p.setMem('pem_vaso', true); p.s += 4; p.karma += 5; p.m += 4; p.addFlag('pe_comedor') } },
      { text: 'Pay the sol and take the food home.', tag: null, outcome: 'The food is good and the women serving it ask about your children by name.', effect: (p) => { p.setMem('pem_vaso', true); p.m += 2; p.addFlag('pe_comedor') } },
    ],
    effect: null,
  },

  // ── THE MONEY ──────────────────────────────────────────────────────────────

  {
    id: 'pem_hiperinflacion',
    phase: null,
    weight: 480,
    when: (G) => IS_PE(G) && G.currentYear >= 1988 && G.currentYear <= 1990 && G.age >= 12 && once(G, 'pem_hiper'),
    text: 'The inti was new three years ago, a thousand soles to one, and now there are notes for five thousand intis and then for a hundred thousand, and the man at the corner with the calculator and the wad of dollars is the most important person on the street. Prices change between the morning and the afternoon. On payday everyone runs — to the market, to the cambista — because money kept until Monday is worth less on Monday. There is no milk. There is a queue for no milk.',
    context: 'Under Alan García, Peru\'s annual inflation reached 667% in 1988, 3,399% in 1989 and 7,482% in 1990. The inti, introduced in 1985 at 1,000 soles, was itself replaced in 1991 by the nuevo sol at one million intis.',
    choices: null,
    effect: (p) => { p.setMem('pem_hiper', true); p.m -= 8; p.wipeMoney(0.4); p.addFlag('pe_hiperinflacion'); p.addFlag('hyperinflation_generation') },
  },

  {
    id: 'pem_fujishock',
    phase: null,
    weight: 999,
    when: (G) => IS_PE(G) && G.currentYear === 1990 && G.age >= 10 && once(G, 'pem_fujishock'),
    text: 'On a Wednesday night in August the minister comes on television and reads out the new prices for forty minutes: petrol, thirty times what it was; bread, milk, kerosene, rice. At the end he looks up from the paper and says, may God help us. In the morning the shops are shut because nobody knows what to charge, and then they open, and the money in your pocket buys a twelfth of what it bought on Wednesday. The inflation stops. It stops the way a fall stops.',
    context: 'On 8 August 1990, eleven days into Alberto Fujimori\'s presidency, Prime Minister and Economy Minister Juan Carlos Hurtado Miller announced a stabilisation package — the "Fujishock" — that raised fuel prices about thirtyfold overnight. He ended his address with "que Dios nos ayude". Inflation fell to 139% in 1991 and to single digits by 1997; poverty rose sharply in the short term.',
    choices: null,
    effect: (p) => { p.setMem('pem_fujishock', true); p.m -= 8; p.h -= 2; p.wipeMoney(0.2); p.addFlag('pe_fujishock') },
  },

  {
    id: 'pem_colera_1991',
    phase: null,
    weight: 400,
    when: (G) => IS_PE(G) && G.currentYear === 1991 && G.age >= 4 && once(G, 'pem_colera'),
    text: (G) => ['informal', 'working_class'].includes(G.neighborhoodTier) || G.ruralUrban === 'rural'
      ? 'The cholera starts in Chimbote in January and by March it is everywhere the water comes from a tank on a lorry, which is everywhere you have ever lived. The posters say boil the water, wash your hands, do not eat ceviche. Boiling the water takes kerosene and kerosene has just gone up thirty times. A woman two houses down is carried to the health post on a door. The health post has a tent behind it now, with cots, and a smell.'
      : 'The cholera starts in Chimbote in January and the posters say do not eat ceviche. The health minister says it and then the fisheries minister eats a plate of ceviche on television to show that you can, and one of them resigns. In your house the water is boiled anyway and nobody eats fish for a year. It is the first epidemic in the hemisphere for a century and it is in the settlements, which your mother mentions as if they were a place you have never been.',
    context: 'The 1991 cholera epidemic began in coastal Peru in late January and spread across Latin America; Peru alone recorded more than 320,000 cases and nearly 3,000 deaths that year, overwhelmingly among people without piped water.',
    choices: null,
    effect: (p) => { p.setMem('pem_colera', true); p.m -= 4; p.h -= 2 },
  },

  {
    id: 'pem_combi',
    phase: null,
    weight: 140,
    when: (G) => IS_PE(G) && PE_LIMA(G) && G.currentYear >= 1991 && G.currentYear <= 2000 && G.age >= 12 && once(G, 'pem_combi'),
    text: 'Anyone with a van can run a route now, and everyone has a van. The combis come down the avenue three abreast with the cobrador hanging out of the door shouting the route like a prayer — Javier Prado, Javier Prado, Javier Prado — and slapping the side when someone gets on, and it does not stop, exactly, it slows. You learn to get on moving. You learn which of the drivers has not slept. Half the men you know who lost their jobs in the shock are driving one.',
    choices: null,
    effect: (p) => { p.setMem('pem_combi', true); p.m += 1 },
  },

  // ── 1992 ───────────────────────────────────────────────────────────────────

  {
    id: 'pem_guzman_capturado',
    phase: null,
    weight: 400,
    when: (G) => IS_PE(G) && G.currentYear >= 1992 && G.currentYear <= 1993 && G.age >= 8 && once(G, 'pem_guzman'),
    text: (G) => inSenderoZone(G) || G.flags.includes('pe_desplazado') || G.flags.includes('pe_sendero_assembly')
      ? 'They show him in a cage, in a striped suit, a fat man with glasses, shouting. That is Presidente Gonzalo. That is the man in whose name the plaza was used and the lists were read. Somebody in the room laughs, and then stops. The war does not end the next day. What ends is the idea that it could win, and people up here know the difference between those two things better than anybody in Lima.'
      : 'They took him in September in a house in Surquillo, above a ballet school, without a shot, and a fortnight later they show him to the country in a cage, in a striped suit like a cartoon convict, shouting a speech nobody can hear. Presidente Gonzalo is a heavy man with psoriasis and glasses. In July a car bomb in Tarata Street in Miraflores killed twenty-five people, and it seemed then as if the city might simply end. Now the man is in a cage. People buy the newspaper twice, to keep one.',
    context: 'Abimael Guzmán, founder and leader of the Shining Path, was captured by the police intelligence unit GEIN on 12 September 1992 in a house in Surquillo, Lima, and displayed to the press in a cage in a striped prison uniform on 24 September. He died in prison in 2021.',
    choices: null,
    effect: (p) => { p.setMem('pem_guzman', true); p.m += 5; p.r += 2 },
  },

  // ── THE REST OF THE COUNTRY ────────────────────────────────────────────────

  {
    id: 'pem_el_nino_1983',
    phase: null,
    weight: 380,
    when: (G) => IS_PE(G) && PE_PLACE(G, 'pe_puno_rural', 'pe_chicama', 'pe_trujillo') && G.currentYear === 1983 && G.age >= 5 && once(G, 'pem_nino'),
    text: (G) => G.place?.id === 'pe_puno_rural'
      ? 'The rain does not come. The lake shrinks back from the reeds and leaves a margin of cracked grey, and the potatoes come up the size of a thumbnail and then stop. The llamas are thin. Men leave for the mines and for Arequipa and for Bolivia, and the women and the old stay and count what is in the storehouse. Far away on the northern coast, the radio says, it is raining so much that the rivers have eaten the Panamericana.'
      : 'It rains on the coast where it never rains — for weeks, warm, off a sea that has gone the wrong temperature — and the dry riverbeds become rivers and the rivers take the bridges on the Panamericana. The adobe walls melt from the bottom. The cane rots standing. In the desert, afterwards, there are flowers and frogs that nobody has ever seen, and a smell of wet earth that old people say they last smelled in 1925.',
    context: 'The 1982-83 El Niño brought catastrophic rain and floods to Peru\'s normally rainless northern coast and severe drought to the southern altiplano around Lake Titicaca; together they cost Peru roughly a tenth of its GDP.',
    choices: null,
    effect: (p) => { p.setMem('pem_nino', true); p.m -= 6; p.h -= 2; p.mo -= 120 },
  },

  {
    id: 'pem_corrientes',
    phase: null,
    weight: 400,
    when: (G) => IS_PE(G) && G.place?.id === 'pe_amazon_rural' && G.currentYear >= 1972 && G.currentYear <= 2000 && G.age >= 8 && once(G, 'pem_corrientes'),
    text: 'The company came up the river when you were small, with barges and helicopters, and now there are wells in the forest and a pipe, and the water that comes up out of the ground with the oil goes straight into the streams, hot and salty and smelling of metal. The fish have sores. The river your grandfather fished is the river you do not let your children swim in. The company has a clinic for its workers. It does not have one for you.',
    choices: [
      { text: 'Work for the company. It is the only wage on the river.', tag: 'yielding', outcome: 'You clear brush along the pipeline for three years and are paid in money, which is new, and in a cough, which is also new.', effect: (p) => { p.setMem('pem_corrientes', true); p.mo += 300; p.h -= 4; p.addFlag('pe_corrientes_oil') } },
      { text: 'Keep to the forest and the gardens, upriver of the wells.', tag: 'defiant', outcome: 'Upriver is further every year. You go further.', effect: (p) => { p.setMem('pem_corrientes', true); p.h -= 2; p.r += 3; p.addFlag('pe_corrientes_oil') } },
    ],
    effect: null,
  },

]

// events_hawiye.js — Xamar, the Shabelle, the grazing country, and the war
// that was fought in the Hawiye's own city.
//
// The roster draws 25% of Somalis as Hawiye and no guard in the corpus had
// ever named them. The Somali module that existed tells the state's collapse,
// Black Hawk Down, al-Shabaab and the remittance economy, all of them true
// and all of them told as though Somalia were one position. The war was not
// fought between positions in the abstract; it was fought between lineages,
// and Mogadishu — Xamar — is a city on Hawiye land. The USC that took it in
// January 1991 was a Hawiye movement. The two men who then split it along
// the Green Line, Ali Mahdi and Aidid, were Abgaal and Habar Gidir, two
// branches of the same clan family. The Americans who came in 1993 were
// hunting a Habar Gidir general.
//
// So this is written from inside that, which means two things have to be
// in it that a Hawiye family's own account might leave out. In 1991 USC
// fighters killed, robbed and drove out Darod civilians in Mogadishu on the
// basis of lineage — the historian Lidwien Kapteijns calls it clan cleansing
// — and the famine of 1992 fell hardest on the Rahanweyn and Bantu farmers of
// the land between the rivers, over which Hawiye and Darod militias fought.
// Those go into the events as things the character sees and the choices they
// make about it, and into the context notes as the record.
//
// Written for who the engine produces. Births run 1935 to 2004, more than
// four in five rural, one in ten literate, and the median life is short: most
// of the characters this module reaches are children and young adults. Before
// it every Somali was born in Mogadishu, the only Somali place; `places.js`
// now keys the rural Hawiye to a village on the Shabelle (Abgaal farming
// country, the Jowhar sugar estate) and to the grazing country of Galgaduud
// (Habar Gidir pastoralists), and the other clan families to their own
// regions. Lineage is read from the birthplace, and in Mogadishu from the
// birth year, because the city held both.
//
// Dates used, all checked. The coup is 21 October 1969. The Somali Latin
// script is adopted on 21 October 1972; the rural literacy campaign runs
// 1974-75, alongside the Dabadheer drought and the resettlement of some
// 100,000 nomads to farming and fishing settlements. The Ogaden war runs July
// 1977 to March 1978. The Mogadishu killings after Friday prayers are 14 July
// 1989. The USC enters Mogadishu on 30 December 1990 and Siad Barre flees on 26
// January 1991. Aidid and Ali Mahdi's war runs from 17 November 1991 to the
// ceasefire of 3 March 1992. The Marines land on 9 December 1992. The Abdi
// House raid is 12 July 1993; the battle is 3-4 October; the US leaves in
// March 1994. The Islamic Courts take Mogadishu in June 2006; the Ethiopian
// army enters on 28 December 2006. Al-Barakat is closed by US designation on
// 7 November 2001. Al-Shabaab withdraws from Mogadishu on 6 August 2011;
// famine is declared in parts of Middle Shabelle that month. The Zoobe
// junction bombing is 14 October 2017.

// Country, ethnicity, gender and rural/urban are written out inside each
// guard rather than behind a helper. The register and specificity classifier
// in events.js reads the `when` source text and cannot see through a helper's
// name to what it tests, so a guard reading HOME(G) was filed as `universal`
// and competed for the 5% of years that register gets.
const SO = 'Somalia'
const XAMAR = (G) => G.place?.id === 'so_mogadishu'
const SHABELLE = (G) => G.place?.id === 'so_shabelle'
const GRAZING = (G) => G.place?.id === 'so_galgaduud'
const once = (G, key) => !G.mem?.[key]
// Abgaal on the Shabelle and in the north of the city; Habar Gidir in
// Galgaduud and the south of it. Read from where the character was born.
const HABAR_GIDIR = (G) => {
  const bp = G.character?.birthPlace?.id
  if (bp === 'so_galgaduud') return true
  if (bp === 'so_shabelle') return false
  return (G.character?.birthYear ?? 0) % 2 === 0
}
const CLAN = (G) => (HABAR_GIDIR(G) ? 'Habar Gidir' : 'Abgaal')

export const HAWIYE_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'haw_ft_campaign',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_campaign_1974') && G.age >= 28 && once(G, 'haw_ft_campaign'),
    text: 'You can still write your name the way the students taught it under the acacia in 1974, with the c and the x standing for the two sounds in Somali that no Italian ever made. You have written little else since, because there was little to write on. But when a paper comes that needs a name, you do not put your thumb in the ink. You write it, slowly, while the clerk waits.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_campaign', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'haw_ft_resettled',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_resettled') && G.age >= 25 && G.currentYear >= 1982 && once(G, 'haw_ft_resettled'),
    text: 'The truck in 1975 made you a farmer, and for a few years the state fed the settlement while you learned the hoe. Most of the men went back to the grazing country as soon as the rains came back and they could borrow a few animals. You stayed on the river. When your father visits he sits in the shade and watches you water maize as though watching a man do something slightly shameful very well.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_resettled', true); p.r += 3; p.e += 1 },
  },

  {
    id: 'haw_ft_ogaden',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_ogaden') && G.age >= 35 && once(G, 'haw_ft_ogaden'),
    text: 'On the posters of your boyhood there was a map with a white star of five points, one for each Somali land: the two that became the republic, Djibouti, the Ogaden, and the north of Kenya. You went to the Ogaden to bring one of the points home. The star is still on the flag, and nobody you know under forty can name all five. You can, and you do not.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_ogaden', true); p.r += 4 },
  },

  {
    id: 'haw_ft_neighbour',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_sheltered') && G.currentYear >= 2000 && G.age >= 35 && once(G, 'haw_ft_neighbour'),
    text: 'A call comes through a number you do not know, and the voice on it is a man\'s, with an American way of stretching the vowels. He is the youngest son of the family that slept in your back room in January 1991, the one who was four. He says his mother told him your name every year, so that he would have it. He wants to send something, and you tell him there is nothing you need, which is not true, and you both know it is not the point.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_neighbour', true); p.m += 6; p.karma += 3 },
  },

  {
    id: 'haw_ft_door',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_door_shut') && G.currentYear >= 1996 && G.age >= 30 && once(G, 'haw_ft_door'),
    text: 'You pass the house of the family who lived across the lane, Darod, whose door you did not open in January 1991. A family from the interior lives in it now, and has lived in it long enough to plant a lemon tree in the courtyard. Nobody has ever asked you about that night and nobody will. The lemon tree has fruit on it this year.',
    context: 'In the months after the USC took Mogadishu, Darod civilians in the city were killed, robbed and expelled on the basis of lineage, and their houses taken. Property seized in 1991 is still the subject of claims in Mogadishu\'s courts.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_door', true); p.r += 6; p.karma -= 2 },
  },

  {
    id: 'haw_ft_green_line',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_green_line') && G.currentYear >= 2012 && G.age >= 26 && once(G, 'haw_ft_green_line'),
    text: 'The Green Line is a road again, with minibuses on it and a man selling mobile credit where the sandbags were. Young people cross it twenty times a day and do not know that it was a line. You still slow down there, and you still know which building the gunner was on the roof of. The building has a new floor on top now, painted pink.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_green_line', true); p.r += 3; p.m += 1 },
  },

  {
    id: 'haw_ft_film',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_1993') && G.currentYear >= 2002 && G.age >= 18 && once(G, 'haw_ft_film'),
    text: 'In a café, somebody has the American film about the third of October on a small screen, and the young men watch it with the sound up. It is about eighteen soldiers, and the city in it is played by somewhere else, and the Somalis in it are a crowd. At the end a line of writing says how many of you died, as a number, rounded. You leave before it finishes and find you are angry at the rounding.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_film', true); p.m -= 3; p.r += 2 },
  },

  {
    id: 'haw_ft_afgooye',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'somali_hawiye' && (G.currentCountry ?? G.character?.country)?.name === SO && G.flags.includes('haw_afgooye') && G.currentYear >= 2011 && G.age >= 14 && once(G, 'haw_ft_afgooye'),
    text: 'When al-Shabaab leaves the city in August you go back in from the corridor to see the house. The roof is gone on one side, and a family from somewhere in the south is living in the half that has one. They have nowhere to go either. You stand in the street and work out, as everyone in the city is working out that year, what a house is when three governments have come and gone and the papers were in it.',
    choices: [
      {
        text: 'Go to the elders about it',
        tag: null,
        outcome: 'The elders of both lineages sit under a tree for three afternoons. The family stays in the back half until they can go, and pays you in the meantime in a way everyone can call rent.',
        effect: (p) => { p.setMem('haw_ft_afgooye', true); p.relocate('so_mogadishu', 'working_class'); p.s += 2; p.m += 2 },
      },
      {
        text: 'Stay in the corridor a while longer',
        tag: null,
        outcome: 'You stay out on the Afgooye road, where the rent is a piece of ground and a sheet of plastic, and go into the city by minibus.',
        effect: (p) => { p.setMem('haw_ft_afgooye', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_ft_eastleigh',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_kenya') && ((G.currentCountry ?? G.character?.country)?.name === SO) === false && G.yearsAbroad >= 4 && G.age >= 20 && once(G, 'haw_ft_eastleigh'),
    text: 'Eastleigh is a Somali town inside Nairobi now, with its own malls of little shops on six floors, and a Kenyan policeman at the corner who knows exactly how much to ask you for. You sell cloth from a stall the size of a wardrobe. A caseworker at the resettlement office has had your file for three years. This month a letter says there is an interview.',
    choices: [
      {
        text: 'Go to the interview',
        tag: null,
        outcome: 'Eleven months later you are on a plane with a white plastic bag of documents, and then in snow, in Minnesota.',
        effect: (p) => { p.setMem('haw_ft_eastleigh', true); p.emigrateTo('United States', { placeId: 'us_minneapolis', residency: 'refugee_status', tier: 'informal' }); p.addFlag('haw_minneapolis'); p.m += 2 },
      },
      {
        text: 'Stay in Eastleigh',
        tag: null,
        outcome: 'You let the letter go. Eastleigh is not home, but everybody in it can say where home is.',
        effect: (p) => { p.setMem('haw_ft_eastleigh', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_ft_minneapolis',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'somali_hawiye' && G.flags.includes('haw_minneapolis') && ((G.currentCountry ?? G.character?.country)?.name === SO) === false && G.yearsAbroad >= 3 && once(G, 'haw_ft_minneapolis'),
    text: (G) => 'In the towers at Cedar-Riverside the lifts smell of cardamom and somebody\'s grandmother is always in the lobby. ' +
      (G.currentYear >= 2002
        ? 'The money you send home went through al-Barakat until the Americans closed it after the towers in New York, and for a month nobody in your family on the Shabelle could buy food with it. '
        : 'The money you send home goes through a man in a shop on Riverside Avenue who writes it in a notebook, and it is in your mother\'s hand on the Shabelle in two days. ') +
      'Your children answer you in English. At the mosque on Friday the imam gives the sermon in both languages, and the second one is for them.',
    choices: null,
    effect: (p) => { p.setMem('haw_ft_minneapolis', true); p.r += 3; p.mo -= 200; p.karma += 2 },
  },

  // ── THE CAMP, THE RIVER, THE BOARD ─────────────────────────────────────────

  {
    id: 'haw_abtirsiimo',
    phase: null,
    weight: 70,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.age >= 5 && G.age <= 9 && once(G, 'haw_abtirsiimo'),
    text: (G) => `Your grandfather sits you in front of him and has you say it: your name, your father\'s, his father\'s, back and back, twenty names without a breath, through ${CLAN(G)} to Hawiye. You get it wrong at the fourteenth and start again. He says a Somali who cannot count his fathers is a man anyone can claim, and that one day on a road somebody will ask you, and the answer will matter. You say it to yourself at night until it is a song.`,
    choices: null,
    effect: (p) => { p.setMem('haw_abtirsiimo', true); p.e += 2; p.s += 1 },
  },

  {
    id: 'haw_dugsi',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.age >= 5 && G.age <= 10 && once(G, 'haw_dugsi'),
    text: 'At the dugsi the macallin has a stick and the children have wooden boards, the loox, and ink made of charcoal and gum. You write the verse he says, chant it until you have it, then scrub the board clean with sand and water and write the next one. The boys at the back chant loudest because they are the least sure. By the time you are nine you know more of the Qur\'an by heart than anything else you know.',
    choices: null,
    effect: (p) => { p.setMem('haw_dugsi', true); p.e += 2 },
  },

  {
    id: 'haw_camels',
    phase: null,
    weight: 60,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && GRAZING(G) && G.age >= 7 && G.age <= 15 && once(G, 'haw_camels'),
    text: (G) => G.character?.gender === 'male'
      ? 'The camels go far from the family camp, with the older boys, and they live on the camels\' milk and nothing else for months. This year you go with them. You learn each animal by its face, its gait and its name, you sleep in a thorn enclosure with the herd, and you learn the songs that are sung to camels at the well so they will drink. When you come back your mother says you smell like a she-camel, and means it kindly.'
      : 'The camels are the men\'s. The sheep and goats are yours and your sisters\', and so is the aqal: the domed house of bent sticks and woven mats, which the women take down and load onto a camel when the family moves, and put up again at the new grazing before the evening milking. By ten you can build it in the dark. The mats you weave this year will be your own house one day.',
    choices: null,
    effect: (p) => { p.setMem('haw_camels', true); p.h += 2; p.m += 2 },
  },

  {
    id: 'haw_jilaal',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && GRAZING(G) && G.age >= 8 && once(G, 'haw_jilaal'),
    text: 'In the jilaal, the hard dry months after the new year, the grass is gone and the ponds are mud and then dust. Your family pays the owner of a cement berkad for water by the drum, and the price goes up every week the gu rains do not come. The old men look at the sky in the south in the evening. When the first storm comes in April, everyone stands outside in it with their mouths open, including the old men.',
    choices: null,
    effect: (p) => { p.setMem('haw_jilaal', true); p.h -= 1; p.m += 2 },
  },

  {
    id: 'haw_shabelle',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && SHABELLE(G) && G.age >= 8 && G.age <= 60 && once(G, 'haw_shabelle'),
    text: (G) => `The Shabelle is brown and slow and the whole village lives along it, on maize and sesame watered by canals that somebody\'s grandfather dug. Upriver at Jowhar ${G.currentYear < 1991 ? 'the sugar estate the Italians built still runs, and its chimney is the tallest thing you have ever seen' : 'the sugar estate the Italians built stands roofless, its machines sold for scrap in the war'}. In the gu the river rises and everyone watches the banks. Some years it takes a field, and some years a child.`,
    choices: null,
    effect: (p) => { p.setMem('haw_shabelle', true); p.h += 1; p.m += 1 },
  },

  {
    id: 'haw_xeer',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.character?.gender === 'male' && G.age >= 20 && G.age <= 60 && once(G, 'haw_xeer'),
    text: 'A young man of your lineage kills a man of another in a fight over a well, and the elders of both sit under a tree for four days. The xeer says what a man is worth: a hundred camels, paid by the whole group that pays blood together, which includes you. The dead man\'s family will take the camels or they will take a life, and the elders talk until the first is certain. Your share is two animals.',
    choices: [
      {
        text: 'Pay your share',
        tag: 'yielding',
        outcome: 'You bring the two camels to the collecting place. The next time you need the group, it will be there.',
        effect: (p) => { p.setMem('haw_xeer', true); p.mo -= 200; p.karma += 2; p.s += 1 },
      },
      {
        text: 'Say the fool should pay for himself',
        tag: 'defiant',
        outcome: 'The elders let you say it and then tell you what you owe. You pay, a week late, and the lateness is remembered.',
        effect: (p) => { p.setMem('haw_xeer', true); p.mo -= 200; p.s -= 2; p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── THE REVOLUTION ─────────────────────────────────────────────────────────

  {
    id: 'haw_orientation',
    phase: null,
    weight: 200,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear >= 1970 && G.currentYear <= 1980 && G.age >= 12 && once(G, 'haw_orientation'),
    text: 'Since the October revolution every neighbourhood has an orientation centre, and every week you go to it to hear about scientific socialism and the Victorious Leader and to sing. Clan has been abolished by decree. Everyone still knows everyone\'s, and says it only indoors. The young men who check who came to the centre are the Guulwadayaal, the Victory Pioneers, and some of them are your cousins.',
    context: 'Siad Barre\'s government, in power from 21 October 1969, banned the public mention of clan and built a network of orientation centres for political education. In January 1975 it executed ten religious scholars who had preached against its new family law, which gave women equal rights of inheritance.',
    choices: null,
    effect: (p) => { p.setMem('haw_orientation', true); p.e += 1; p.m -= 1 },
  },

  {
    id: 'haw_campaign_rural',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.ruralUrban === 'rural' && G.currentYear >= 1974 && G.currentYear <= 1975 && G.age >= 7 && G.age <= 45 && once(G, 'haw_campaign'),
    text: 'Two students from the city arrive at the camp with a blackboard, a box of chalk and a letter from the government, and stay for months. Somali has been a written language for two years now, in Latin letters, and they have come to teach it to everyone who lives in an aqal. They teach under the acacia after the evening milking, by lamplight, and the old men sit at the back pretending not to be learning. By the rains you can write your name.',
    context: 'The Somali Latin script was adopted on 21 October 1972. In 1974-75 the government closed the secondary schools and sent some 30,000 students and teachers into the countryside to teach the nomadic population to read.',
    choices: null,
    effect: (p) => { p.setMem('haw_campaign', true); p.e += 4; p.addFlag('haw_campaign_1974') },
  },

  {
    id: 'haw_campaign_student',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && !G.ruralUrban === 'rural' && G.literate && G.currentYear >= 1974 && G.currentYear <= 1975 && G.age >= 14 && G.age <= 22 && once(G, 'haw_campaign'),
    text: 'The secondary schools are closed for the year and you are sent to the interior with a blackboard and a letter, to teach nomads to read the script that is two years old. The family you are sent to has never met anyone from Xamar and finds you very funny. You teach under a tree after the evening milking and drink more camel milk than you would have believed a person could. You learn more than you teach, and you know it at the time.',
    choices: null,
    effect: (p) => { p.setMem('haw_campaign', true); p.e += 3; p.s += 2; p.addFlag('haw_campaign_1974') },
  },

  {
    id: 'haw_dabadheer',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && GRAZING(G) && G.currentYear >= 1974 && G.currentYear <= 1975 && G.age >= 6 && once(G, 'haw_dabadheer'),
    text: 'The rains fail twice, and people are already calling it Dabadheer, the drought with the long tail. The sheep die first, then the cattle, then the camels you thought could not die. The government sends trucks, and Russian planes land on a strip of scraped ground: they are taking families south, to farms on the river where there will be food, and a hoe for each man. Your father looks at the last four camels for a long time.',
    context: 'The 1974-75 drought killed hundreds of thousands of animals. The government, with Soviet airlift and trucks, moved some 100,000 nomads to new farming settlements on the Shabelle and Jubba rivers and to fishing cooperatives on the coast.',
    choices: [
      {
        text: 'Get on the truck',
        tag: 'yielding',
        outcome: 'The settlement is rows of huts on flat ground by a river you have never seen, and a queue for sorghum. The hoe hurts your hands for a month.',
        effect: (p) => { p.setMem('haw_dabadheer', true); p.relocate('so_shabelle', 'informal'); p.h -= 2; p.m -= 4; p.addFlag('haw_resettled') },
      },
      {
        text: 'Stay with the four camels',
        tag: 'defiant',
        outcome: 'Two of the four live. It is enough to start again, slowly, on milk you share with the calves.',
        effect: (p) => { p.setMem('haw_dabadheer', true); p.h -= 5; p.m -= 4; p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_ogaden_call',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.character?.gender === 'male' && G.currentYear >= 1977 && G.currentYear <= 1978 && G.age >= 16 && G.age <= 32 && once(G, 'haw_ogaden'),
    text: 'In the summer the army crosses into the Ogaden to bring the lost Somali land home, and the radio plays the war songs all day. Young men queue at the recruiting office in their good shirts. For a few months every town in Ethiopia\'s east is falling, and even the old men who hate Siad Barre are proud. Then the Russians change sides.',
    choices: [
      {
        text: 'Join the queue',
        tag: null,
        outcome: 'You reach Jijiga with the army and leave it the next March on foot, with Cuban tanks behind you and a friend on your back.',
        effect: (p) => { p.setMem('haw_ogaden', true); p.h -= 5; p.m -= 4; p.addFlag('haw_ogaden') },
      },
      {
        text: 'Stay at home',
        tag: null,
        outcome: 'You stay. In March the war songs stop in the middle of a day and do not come back.',
        effect: (p) => { p.setMem('haw_ogaden', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_ogaden_news',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.currentYear >= 1977 && G.currentYear <= 1979 && G.age >= 8 && once(G, 'haw_ogaden') &&
      !(G.character?.gender === 'male' && G.age >= 16 && G.age <= 32),
    text: 'In 1977 the radio plays the war songs all day and the army is taking back the Ogaden, town by town. Then in the new year the Russians and Cubans are on Ethiopia\'s side, and by March the songs have stopped. The people come after: families from the Ogaden, whole lineages, walking into camps of plastic sheeting outside the towns. Some of them are kin, and the camps are still there when you are grown.',
    choices: null,
    effect: (p) => { p.setMem('haw_ogaden', true); p.m -= 4; p.e += 1 },
  },

  {
    id: 'haw_barre_years',
    phase: null,
    weight: 150,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.currentYear >= 1982 && G.currentYear <= 1990 && G.age >= 16 && once(G, 'haw_barre'),
    text: 'Everyone in Xamar knows the three letters, M.O.D., and nobody says them where they can be heard: the Marehan, the Ogaden and the Dulbahante, the President\'s own lineages, who hold the army and the ministries. Your cousin with a degree drives a taxi. The security service has a room nobody comes back from unchanged. In the evenings, indoors, men of your lineage talk about the ones in the north who have taken up guns, and wonder aloud whether the south should.',
    choices: null,
    effect: (p) => { p.setMem('haw_barre', true); p.m -= 3; p.e += 1 },
  },

  {
    id: 'haw_july_1989',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear === 1989 && G.age >= 10 && once(G, 'haw_1989'),
    text: 'Imams have been arrested, and on the fourteenth of July men come out of the Friday prayer shouting, and the soldiers fire into them. By evening there are bodies in the streets near the mosques and nobody is allowed to collect them. Over the next days the red berets take men from their houses. You learn later that dozens of northern men were taken to the beach at Jasiira and shot, and nobody in the government ever says so.',
    context: 'Security forces killed some 450 people in Mogadishu on and after 14 July 1989, according to Africa Watch. Some 46 Isaaq men were taken from their homes and executed on Jasiira beach. The same year the United Somali Congress, a Hawiye movement, was founded in Rome.',
    choices: null,
    effect: (p) => { p.setMem('haw_1989', true); p.m -= 6; p.r += 2 },
  },

  // ── 1991 ───────────────────────────────────────────────────────────────────

  {
    id: 'haw_usc_city',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear >= 1990 && G.currentYear <= 1991 && G.age >= 15 && once(G, 'haw_1991'),
    text: 'At the end of December the USC fighters come into the city, and they are Hawiye, and many of them are young men from the interior who have never seen Xamar. Siad Barre leaves in January in a column of tanks. Then the fighters go house to house, asking at every door what lineage lives there, and the Darod family across the lane, who have been your neighbours for eleven years, come to your back door in the night.',
    context: 'After Barre fell, USC fighters killed, raped and robbed Darod civilians in Mogadishu, and drove tens of thousands of them out of the city toward Kismayo and the Kenyan border. The historian Lidwien Kapteijns has called it clan cleansing. Some Hawiye families hid Darod neighbours at real risk to themselves.',
    choices: [
      {
        text: 'Let them in and hide them',
        tag: 'defiant',
        outcome: 'They sleep in your back room for nine days. When the road is safe you take them to a truck going south and recite your own lineage at every checkpoint on the way.',
        effect: (p) => { p.setMem('haw_1991', true); p.karma += 8; p.m -= 4; p.h -= 1; p.addFlag('haw_sheltered') },
      },
      {
        text: 'Keep the door shut',
        tag: 'yielding',
        outcome: 'You hear them go back down the lane. In the morning their house is open and there are men carrying the furniture out of it.',
        effect: (p) => { p.setMem('haw_1991', true); p.karma -= 5; p.r += 6; p.addFlag('haw_door_shut') },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_usc_rural',
    phase: null,
    weight: 800,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && !XAMAR(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 8 && once(G, 'haw_1991'),
    text: 'The men of your lineage who went to Xamar with guns come back in the spring with things on trucks and camels: a sofa, a sewing machine, a fridge for a village without electricity, doors taken off their hinges. They say the government has fallen and the city is theirs now. Some of the things still have other families\' names written on them. Your mother will not have any of it in the house.',
    choices: null,
    effect: (p) => { p.setMem('haw_1991', true); p.m -= 2; p.r += 2 },
  },

  {
    id: 'haw_green_line',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear >= 1991 && G.currentYear <= 1992 && G.age >= 6 && once(G, 'haw_green_line'),
    text: (G) => 'In November the two men who took the city together turn on each other: Ali Mahdi, who is Abgaal, and General Aidid, who is Habar Gidir, both Hawiye, both USC. ' +
      (HABAR_GIDIR(G)
        ? 'Your family is in the south of the city, which is Aidid\'s, and the shells come from the north.'
        : 'Your family is in the north of the city, which is Ali Mahdi\'s, and the shells come from the south.') +
      ' The street that divides them is called the Green Line, and nobody crosses it. For four months the city fires on itself, and the dead are counted in thousands.',
    choices: null,
    effect: (p) => { p.setMem('haw_green_line', true); p.m -= 8; p.h -= 3; p.addFlag('haw_green_line') },
  },

  {
    id: 'haw_famine',
    phase: null,
    weight: 800,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.currentYear >= 1992 && G.currentYear <= 1993 && G.age >= 8 && once(G, 'haw_famine'),
    text: 'In the land between the rivers the harvest is looted as it stands, by militias of every side, and the farmers who grew it are dying in lines on the road to Baidoa. They are Rahanweyn and Bantu, who had no militia of their own. The food aid comes in by ship and is taxed at every checkpoint on its way inland, and some of the men at the checkpoints are of your lineage. In the camps the children who come in are too weak to cry.',
    context: 'The 1992 famine killed an estimated 220,000 to 300,000 people, most of them Rahanweyn and Bantu farmers of the Bay, Bakool and lower Shabelle regions — the "triangle of death" fought over by Barre\'s remnant forces and Aidid\'s.',
    choices: null,
    effect: (p) => { p.setMem('haw_famine', true); p.m -= 6; p.r += 3 },
  },

  {
    id: 'haw_1993',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear === 1993 && G.age >= 8 && once(G, 'haw_1993'),
    text: (G) => (HABAR_GIDIR(G)
      ? 'In July American helicopters fire missiles into a house where the elders of your clan are meeting, and your mother\'s uncle is among the dead. After that the young men of the south of the city are Aidid\'s whether they were before or not. '
      : 'All summer the Americans and the United Nations hunt General Aidid across the south of the city, and the south fights back. ') +
      'On the third of October the helicopters come down near the Bakara market and the fighting goes on all night. In the morning the whole city seems to be carrying its dead.',
    context: 'On 12 July 1993 US helicopters attacked a meeting of Habar Gidir elders at the Abdi House; the Red Cross counted 54 dead. The battle of 3-4 October killed eighteen American soldiers and, by most estimates, several hundred to more than a thousand Somalis.',
    choices: null,
    effect: (p) => { p.setMem('haw_1993', true); p.m -= 8; p.h -= 2; p.addFlag('haw_1993') },
  },

  // ── AFTER THE STATE ────────────────────────────────────────────────────────

  {
    id: 'haw_flee_kenya',
    phase: null,
    weight: 100,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && G.age >= 14 && G.age <= 45 &&
      ((G.currentYear >= 1991 && G.currentYear <= 1993) || (G.currentYear >= 2007 && G.currentYear <= 2011)) && once(G, 'haw_flee'),
    text: 'A truck is going to the Kenyan border, and a seat on it is sold like anything else. At Liboi the Kenyan police take what they want at the crossing. After that there is a camp in the desert at Dadaab, where you are given a ration card and a number and a plot of sand to put a shelter on. Your cousin who went last year says it is safe and that nothing else about it is good.',
    choices: [
      {
        text: 'Buy the seat',
        tag: null,
        outcome: 'Two years in the camp at Dadaab, and then a room above a shop in Eastleigh, in Nairobi, with six others and a mattress each.',
        effect: (p) => { p.setMem('haw_flee', true); p.emigrateTo('Kenya', { residency: 'refugee_status', tier: 'working_class' }); p.mo -= 150; p.m -= 4; p.addFlag('haw_kenya') },
      },
      {
        text: 'Stay',
        tag: null,
        outcome: 'You stay. The ones who went send money, sometimes, through the hawala man, and it arrives on the day he says.',
        effect: (p) => { p.setMem('haw_flee', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_courts',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && (XAMAR(G) || SHABELLE(G)) && G.currentYear === 2006 && G.age >= 10 && once(G, 'haw_courts'),
    text: 'In June the Islamic Courts drive the warlords out of Xamar, and within weeks the checkpoints are gone. For the first time in fifteen years you can cross the city without paying anyone, and the airport and the port open again. The courts\' young men are serious and sure of everything. By the autumn they have closed the cinemas and banned qat, and people who were grateful in June are quieter.',
    choices: null,
    effect: (p) => { p.setMem('haw_courts', true); p.m += 3 },
  },

  {
    id: 'haw_ethiopians',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear >= 2007 && G.currentYear <= 2008 && G.age >= 6 && once(G, 'haw_2007'),
    text: 'The Ethiopian army is in Xamar, at the invitation of a government most people here have never seen, and by spring the city is fighting it. Artillery falls on whole districts in the north of the city. The Hawiye elders try to negotiate and are ignored. People leave by the tens of thousands, down the road to Afgooye, and camp along it for thirty kilometres.',
    context: 'Ethiopian troops entered Mogadishu on 28 December 2006. Heavy fighting in March and April 2007 drove some 400,000 people from the city, most of them onto the Afgooye road, which became for several years the largest concentration of displaced people in the world.',
    choices: [
      {
        text: 'Go to the Afgooye road',
        tag: null,
        outcome: 'Your family gets a piece of ground between a thorn fence and a latrine, and a sheet of plastic for the rain. The city is thirty kilometres away and there is nothing to go back to yet.',
        effect: (p) => { p.setMem('haw_2007', true); p.relocate('so_shabelle', 'informal'); p.m -= 8; p.h -= 3; p.addFlag('haw_afgooye') },
      },
      {
        text: 'Stay in the house',
        tag: null,
        outcome: 'You stay, sleeping in the inner room, and count the nights by what falls near.',
        effect: (p) => { p.setMem('haw_2007', true); p.m -= 6; p.h -= 4; p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'haw_shabaab_shabelle',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && SHABELLE(G) && G.currentYear >= 2009 && G.currentYear <= 2015 && G.age >= 12 && once(G, 'haw_shabaab'),
    text: 'Al-Shabaab holds the villages on the river, and their zakat man comes at harvest with a ledger and takes his share of the maize before you have sold any. Music is forbidden, and a boy was flogged in the market for a song on his radio. In 2011 the rains fail, the river drops, and the men with the ledger will not let the aid agencies in. People start walking toward Xamar, where the government is now, with whatever they can carry.',
    choices: null,
    effect: (p) => { p.setMem('haw_shabaab', true); p.m -= 6; p.h -= 3 },
  },

  {
    id: 'haw_zoobe',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === SO && G.ethnicity === 'somali_hawiye' && XAMAR(G) && G.currentYear === 2017 && G.age >= 10 && once(G, 'haw_zoobe'),
    text: 'On the fourteenth of October a truck explodes at the Zoobe junction on a Saturday afternoon, when the road is full of minibuses, and the hotel beside it falls into the street. More than five hundred people die, and for days the families go from hospital to hospital with photographs. Four days later thousands march through the city in red headbands, and it is the first time in your life you have seen the city march for itself.',
    choices: null,
    effect: (p) => { p.setMem('haw_zoobe', true); p.m -= 8 },
  },
]

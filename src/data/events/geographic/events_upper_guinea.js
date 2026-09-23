// events_upper_guinea.js — the Malinké of Upper Guinea: Kankan, the gold of
// Siguiri, and a surname that answered the ballot.
//
// The roster draws 30% of Guineans as Malinké (Mandinka) and no guard in the
// corpus had ever named them. The Guinean module that existed is the state's
// history — the No of 1958, Camp Boiro, the 2009 stadium — told as though
// Guinea were one position. It is not. Sékou Touré was a Malinké from Faranah
// who claimed descent from Samori, and a great many Malinké took the regime as
// partly theirs, which did not stop it from killing Malinké ministers at Camp
// Boiro or from turning, in 1976, on the Peul as a people. When Touré died the
// next regime was Susu, and the first thing it did to the Malinké, in July
// 1985, was loot their shops in Conakry while the head of state said "well
// done" to the crowd. And in 2010, in the first free election in the
// country's history, the ballot divided almost exactly along the line between
// Malinké and Peul, and in Siguiri and Kouroussa Peul traders were attacked
// and driven out.
//
// All of that is written from the Malinké position, and the last part is
// written as a choice, because it was one: some people stood in front of the
// stalls and some did not.
//
// Written for who the engine produces. Births run 1940 to 2006, more than four
// in five rural, one in twenty literate, median death around forty. Before
// this module every rural Malinké was born in the Fouta Djallon — the Peul
// highlands, which was Guinea's only rural place — and every rural Susu and
// Kissi with them. `places.js` now has a village in Upper Guinea and gives
// each of the four natural regions its own. So these are mostly village
// events: the jeli, the rice flats, the shea, the gold pits in the dry season,
// and the state arriving as a quota and a committee.
//
// Dates used, all checked. Samori Touré is captured in September 1898. The
// referendum is 28 September 1958. The Pouvoir Révolutionnaire Local replaces
// the village committees in 1968. Keita Fodéba, founder of Les Ballets
// Africains, is arrested in 1969 and executed at Camp Boiro. Touré's speech
// against the Peul is August 1976; Diallo Telli dies in Camp Boiro in March
// 1977. The market women's revolt is 27 August 1977. Touré dies on 26 March
// 1984; the army takes power on 3 April. Diarra Traoré's attempted coup is 4
// July 1985. Conté dies in December 2008. The election rounds are 27 June and
// 7 November 2010; the violence in Siguiri and Kouroussa is late October;
// Alpha Condé is inaugurated on 21 December 2010. The constitutional
// referendum is March 2020. Mamady Doumbouya's coup is 5 September 2021.

// Country, ethnicity, gender and rural/urban are written out inside each
// guard rather than behind a helper. The register and specificity classifier
// in events.js reads the `when` source text and cannot see through a helper's
// name to what it tests, so a guard reading HOME(G) was filed as `universal`
// and competed for the 5% of years that register gets.
const GN = 'Guinea'
const UPPER = (G) => G.place?.id === 'gn_upper'
const KANKAN = (G) => G.place?.id === 'gn_kankan'
const CONAKRY = (G) => G.place?.id === 'gn_conakry'
const HAUTE = (G) => G.place?.region === 'Haute-Guinée'
const once = (G, key) => !G.mem?.[key]

export const UPPER_GUINEA_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'mgn_ft_gold',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_gold') && G.age >= 35 && once(G, 'mgn_ft_gold'),
    text: 'Every dry season somebody is killed at the pits, and every dry season the camp fills again. You went down the shafts for six seasons and came up every time, which is a thing you think about more now than you did then. What you have to show for it is a roof, a cough that comes in the harmattan, and the knowledge of what the inside of the earth smells like at twenty metres. Your nephew leaves for the camp next week.',
    choices: [
      {
        text: 'Tell him which men to dig with',
        tag: null,
        outcome: 'You give him three names and one piece of advice about ropes. He listens to the names.',
        effect: (p) => { p.setMem('mgn_ft_gold', true); p.karma += 2; p.r += 2 },
      },
      {
        text: 'Tell him not to go',
        tag: null,
        outcome: 'He goes anyway, as you did. In April he sends a little gold home wrapped in a twist of paper.',
        effect: (p) => { p.setMem('mgn_ft_gold', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_ft_normes',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_normes_hid') && G.currentYear >= 1985 && G.age >= 25 && once(G, 'mgn_ft_normes'),
    text: 'The normes are gone with the regime that set them, and the man from the PRL who counted your sacks sells cloth in the market now. The false floor in the granary, where you kept back what the family would need, is still there. Your children use it for groundnuts. Nobody ever asks what it was built for, and you do not say.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_normes', true); p.m += 2; p.r += 1 },
  },

  {
    id: 'mgn_ft_boiro_names',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_1976') && G.currentYear >= 1984 && G.currentYear <= 1990 && G.age >= 20 && once(G, 'mgn_ft_boiro'),
    text: 'After the soldiers take power they open Camp Boiro, and the names come out of it, in the market and on the radio: who died there and roughly when. Diallo Telli is on the list, dead in 1977 of the black diet, no food and no water. So is Keita Fodéba, who was one of yours. Your Peul neighbour, who did not speak to you for a year after 1976, comes to your door with the list in her hand, and you read it to each other.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_boiro', true); p.r += 4; p.karma += 2 },
  },

  {
    id: 'mgn_ft_1985',
    phase: null,
    weight: 300,
    when: (G) => G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_1985') && G.currentYear >= 2008 && G.currentYear <= 2011 && G.age >= 30 && once(G, 'mgn_ft_1985'),
    text: 'Conté dies in December 2008, after twenty-four years, and the radio says the soldiers have taken over again. In 1985 it was his voice on the radio saying well done to the men who were carrying Malinké stock out of Malinké shops. You never heard him say anything about it afterwards, and you did not expect to. You find you feel nothing about his death at all, which surprises you, and then does not.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_1985', true); p.r += 3 },
  },

  {
    id: 'mgn_ft_2010_sheltered',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_2010_sheltered') && G.currentYear >= 2012 && once(G, 'mgn_ft_2010'),
    text: 'The Peul trader whose stall you stood in front of in 2010 has come back to the market, with less stock than before and a son to watch it. He greets you every morning by your surname and your mother\'s village, which is how respect is spoken here. At election time the two of you do not talk about the election. You buy your sugar from him, and he gives you the good weight.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_2010', true); p.m += 3; p.karma += 2 },
  },

  {
    id: 'mgn_ft_2010_stood',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_2010_stood') && G.currentYear >= 2012 && once(G, 'mgn_ft_2010'),
    text: 'The stall where the Peul trader sold sugar and soap belongs to a Malinké family now, who got it for nothing in November 2010. You walk past it every day on the way to the market. The trader went to Conakry and then to Dakar, people say. At every election since, you have heard somebody in the market say that the Peul will take the country, and each time you have said nothing.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_2010', true); p.r += 5; p.karma -= 2 },
  },

  {
    id: 'mgn_ft_2021',
    phase: null,
    weight: 250,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_2021') && G.currentYear >= 2024 && once(G, 'mgn_ft_2021'),
    text: 'The colonel who took power promising a transition has made himself a general, and the transition has a new date. In Kankan his photograph is in the shops beside Condé\'s old one, which nobody has taken down either. The men at the tea stall say that at least he is from here. The young men say that is what their fathers said about Condé, and about Sékou Touré before him.',
    choices: null,
    effect: (p) => { p.setMem('mgn_ft_2021', true); p.r += 2; p.e += 1 },
  },

  {
    id: 'mgn_ft_abidjan',
    phase: null,
    weight: 250,
    when: (G) => G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_abidjan') && ((G.currentCountry ?? G.character?.country)?.name === GN) === false && G.yearsAbroad >= 6 && once(G, 'mgn_ft_abidjan'),
    text: (G) => `In Adjamé market you sell cloth from a stall between a Malian and a Burkinabè, and the three of you speak Dioula, which is nearly your own language, all day. ${G.currentYear >= 2002 ? 'Since the war began here, the police ask for your card at every checkpoint and read the word Guinean on it slowly, and it costs something every time. ' : ''}At home they think you are rich. You have a room, a stall, and a sister\'s son to put through school in Kankan.`,
    choices: [
      {
        text: 'Go home to Upper Guinea',
        tag: null,
        outcome: 'You take the bus north with a mattress on the roof. In Kankan everybody asks what you brought, and nobody asks what you left.',
        effect: (p) => { p.setMem('mgn_ft_abidjan', true); p.relocate('gn_kankan', 'working_class', { residency: 'citizen' }); p.m += 3 },
      },
      {
        text: 'Stay in Abidjan',
        tag: null,
        outcome: 'You stay. The money goes home on the first of the month, through a man at the lorry park.',
        effect: (p) => { p.setMem('mgn_ft_abidjan', true); p.mo -= 200; p.karma += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_ft_libya',
    phase: null,
    weight: 400,
    when: (G) => G.ethnicity === 'mandinka_guinean' && G.flags.includes('mgn_libya') && ((G.currentCountry ?? G.character?.country)?.name === GN) === false && G.residencyStatus === 'undocumented' && G.yearsAbroad >= 1 && once(G, 'mgn_ft_libya'),
    text: 'The house near Sabha where the smugglers keep you is called a ghetto by the men inside it, and the men who run it telephone your family to say what the next part of the journey costs. You have been sold once already, from one of them to another, for a sum you overheard. A man from the International Organization for Migration comes to the detention centre with a list of those who want to go home. The boats leave from the coast further north, and you have heard what happens on them.',
    choices: [
      {
        text: 'Put your name on the list home',
        tag: 'yielding',
        outcome: 'The plane lands at Conakry at night. You are given a little money, a bag and a T-shirt, and at home nobody knows what to say to you, so they say nothing.',
        effect: (p) => { p.setMem('mgn_ft_libya', true); p.relocate('gn_kankan', 'informal', { residency: 'citizen' }); p.m -= 4; p.r += 5 },
      },
      {
        text: 'Wait for the boat',
        tag: 'defiant',
        outcome: 'The boat leaves in the dark with a hundred and twenty people in it, and an Italian ship takes you off it the next afternoon. In Sicily you are given a number.',
        effect: (p) => { p.setMem('mgn_ft_libya', true); p.emigrateTo('Italy', { residency: 'asylum_seeker', tier: 'informal' }); p.h -= 4; p.m -= 2 },
      },
    ],
    effect: null,
  },

  // ── THE VILLAGE ────────────────────────────────────────────────────────────

  {
    id: 'mgn_jeli',
    phase: null,
    weight: 70,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.age >= 6 && G.age <= 14 && once(G, 'mgn_jeli'),
    text: 'At a wedding the jeli, the griot, stops in front of your father and sings your family\'s name and everything it has ever done, back to the time of Sundiata, while the kora goes on behind him. Your father puts a note in his hand and then another, because a jeli who is not paid can sing the other half too. You learn that your family is older than the country. You learn that the jeli knows it better than your father does.',
    choices: null,
    effect: (p) => { p.setMem('mgn_jeli', true); p.s += 2; p.m += 2 },
  },

  {
    id: 'mgn_rice_shea',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && UPPER(G) && G.age >= 9 && G.age <= 60 && once(G, 'mgn_rice'),
    text: (G) => G.character?.gender === 'male'
      ? 'The rains come in June and the men hoe the upland for fonio and groundnuts and millet, and by the end of the day the soil is in your ears. In the flats along the river the rice belongs to the women, and you do not go there except to carry. At night in the dry season the young men sit by the fire and listen to a hunter\'s bard sing about animals nobody has seen in the bush for forty years.'
      : 'In June, before the rice, the shea nuts fall, and you and the other women go out at dawn to gather them from under the trees before the goats do. The rice fields in the river flats are the women\'s, and the rice from them is yours to sell. By the end of the season your hands have the shea on them all the time, and so does everything you touch.',
    choices: null,
    effect: (p) => { p.setMem('mgn_rice', true); p.h += 1; p.m += 1 },
  },

  {
    id: 'mgn_sosso_bala',
    phase: null,
    weight: 12,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && HAUTE(G) && G.age >= 10 && once(G, 'mgn_sosso'),
    text: 'At Niagassola, near the Mali border, there is a balafon kept in a house by a family of the Kouyaté, the griots who are descended from Sundiata\'s own. The jeli say it belonged to Sumaoro, the king Sundiata defeated eight hundred years ago, and that its keys are the oldest wood in the Manding. You walk a day to hear it played at the feast. It sounds like any balafon, and it does not.',
    choices: null,
    effect: (p) => { p.setMem('mgn_sosso', true); p.m += 3; p.e += 1 },
  },

  {
    id: 'mgn_kankan',
    phase: null,
    weight: 50,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && KANKAN(G) && G.age >= 12 && G.age <= 55 && once(G, 'mgn_kankan'),
    text: 'Kankan has been a market town and a town of Qur\'anic scholars since before the French, and the Kaba family who founded it are still the ones people go to about a marriage or a quarrel. Kola comes up from the forest in baskets and goes on north to Mali. The Milo is low and green in the dry season, and on its bank the women wash cloth and lay it out on the rocks in every colour. People from Conakry call it a village, and people from Kankan let them.',
    choices: null,
    effect: (p) => { p.setMem('mgn_kankan', true); p.m += 2; p.s += 1 },
  },

  {
    id: 'mgn_gold',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && HAUTE(G) && G.age >= 15 && G.age <= 40 && once(G, 'mgn_gold'),
    text: (G) => G.character?.gender === 'male'
      ? 'In the dry season, when the fields are done, the young men go to the gold camps near Siguiri, where Manding people have dug for gold since the Mali empire bought its salt with it. The pits are narrow shafts with footholds cut in the sides, twenty metres down, and the man at the top of the rope is your life. The ground belongs to a family who take a share of everything found on it. Your cousin has a place in his team.'
      : 'In the dry season the women go to the gold camps near Siguiri too, not to dig but to wash: the men bring up the earth, and the women pan it in calabashes in the pools, swirling until only the black sand and the colour are left. It is slow, and your back and your hands are wet from morning to night. A good week pays for a year of school fees. Your aunt has a place at a pool.',
    choices: [
      {
        text: 'Go to the camp',
        tag: null,
        outcome: 'By the rains you have a little gold wrapped in paper, a cough, and a way of looking at the ground you will never lose.',
        effect: (p) => { p.setMem('mgn_gold', true); p.h -= 3; p.mo += 150; p.addFlag('mgn_gold') },
      },
      {
        text: 'Stay in the village',
        tag: null,
        outcome: 'You stay, and in April the ones who went come back and some of them do not.',
        effect: (p) => { p.setMem('mgn_gold', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_samori',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.age >= 8 && G.age <= 14 && G.currentYear >= 1945 && G.currentYear <= 1995 && once(G, 'mgn_samori'),
    text: 'Your grandfather\'s father fought for Samori Touré, who held the French off Upper Guinea for sixteen years and moved his whole empire east rather than surrender it. The French took him in the end, in 1898, and he died in exile in a forest on the other side of Africa. Your grandfather tells it in the evening, and at the end he says "Almamy" the way other people say a prayer. Sékou Touré, on the radio, says he is Samori\'s grandson.',
    choices: null,
    effect: (p) => { p.setMem('mgn_samori', true); p.e += 2; p.m += 1 },
  },

  // ── SÉKOU TOURÉ ────────────────────────────────────────────────────────────

  {
    id: 'mgn_prl',
    phase: null,
    weight: 150,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear >= 1968 && G.currentYear <= 1983 && G.age >= 14 && once(G, 'mgn_prl'),
    text: 'Every village has its PRL now, the local revolutionary power, which is the party with a stamp, and every week there is a meeting under the big tree that everyone attends and nobody misses. The meeting ends with the slogans shouted back and forth, "Prêt pour la révolution." The president is from Faranah and speaks Maninka on the radio when he wants to, and many people here say he is theirs. The man who runs the PRL keeps a list of who says otherwise.',
    choices: null,
    effect: (p) => { p.setMem('mgn_prl', true); p.m -= 1; p.e += 1 },
  },

  {
    id: 'mgn_normes',
    phase: null,
    weight: 300,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.ruralUrban === 'rural' && G.currentYear >= 1975 && G.currentYear <= 1983 && G.age >= 16 && once(G, 'mgn_normes'),
    text: 'The state has set a norme for every family: so many kilos of rice, so much groundnut, delivered to the collection point at the state\'s price, which is less than the sack. Private trade is forbidden, and the economic police stop the lorries on the Mali road and take whatever is in them. At the collection point the PRL man weighs your sacks and writes in his book. Your family will be short by March either way.',
    choices: [
      {
        text: 'Deliver the full norme',
        tag: 'yielding',
        outcome: 'The book is satisfied. In March the children eat once a day.',
        effect: (p) => { p.setMem('mgn_normes', true); p.h -= 3; p.m -= 3 },
      },
      {
        text: 'Hide sacks under a false floor',
        tag: 'defiant',
        outcome: 'You deliver short and swear the rains were bad. In March there is rice in the house, and you listen for footsteps every time the dog barks.',
        effect: (p) => { p.setMem('mgn_normes', true); p.m -= 1; p.r += 1; p.addFlag('mgn_normes_hid') },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_fodeba',
    phase: null,
    weight: 400,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear >= 1969 && G.currentYear <= 1970 && G.age >= 14 && once(G, 'mgn_fodeba'),
    text: 'Keita Fodéba has been arrested. He is from Siguiri, he made the Ballets Africains that danced Guinea in front of the whole world, he wrote the poem the schoolchildren recite, and as minister he built the camp he has now been taken to. The radio calls him a traitor in a plot. Nobody in the market says anything about it at all, which is how you know everyone has heard.',
    context: 'Keita Fodéba founded Les Ballets Africains in Paris in 1952 and served Sékou Touré as minister of the interior and of defence, overseeing the security apparatus that ran Camp Boiro. He was arrested in 1969 in the so-called Kaman-Fodéba plot and executed at the camp that year.',
    choices: null,
    effect: (p) => { p.setMem('mgn_fodeba', true); p.m -= 4; p.r += 2 },
  },

  {
    id: 'mgn_1976',
    phase: null,
    weight: 500,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear >= 1976 && G.currentYear <= 1977 && G.age >= 14 && once(G, 'mgn_1976'),
    text: 'In August the president gives a speech on the radio, hours long, about a Peul plot and Peul racism, and the word Peul is said more times than you can count. Diallo Telli, who ran the Organisation of African Unity, has been arrested. The Peul woman next door, who has lent your mother salt for eleven years, does not come to the yard the next morning or the one after. When she does, she does not look at you.',
    context: 'Sékou Touré\'s speeches of August 1976 denounced a "Peul plot" and accused the Fula as a people of racism against the revolution. Hundreds were arrested; Diallo Telli died in Camp Boiro in March 1977 of the "black diet" of no food or water.',
    choices: [
      {
        text: 'Take the salt back to her yourself',
        tag: 'defiant',
        outcome: 'She takes it without a word. A week later there is a bowl of her fonio on your step, and nothing is said about that either.',
        effect: (p) => { p.setMem('mgn_1976', true); p.karma += 4; p.addFlag('mgn_1976') },
      },
      {
        text: 'Keep to your own yard',
        tag: 'yielding',
        outcome: 'You keep to your yard. It is a year before the two of you speak, and then only about the rain.',
        effect: (p) => { p.setMem('mgn_1976', true); p.r += 3; p.addFlag('mgn_1976') },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_market_women',
    phase: null,
    weight: 500,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear === 1977 && G.age >= 14 && once(G, 'mgn_1977'),
    text: (G) => 'In August the market women of Conakry march on the palace over the economic police, who take their goods at every checkpoint, and for once the regime backs down. ' +
      (G.character?.gender === 'male'
        ? 'Within weeks the economic police are disbanded. Your mother says this happened because women did it, and your father does not argue.'
        : 'Within weeks the economic police are disbanded. Your mother, who trades cloth, says nothing, but she stands differently in the market after that.'),
    choices: null,
    effect: (p) => { p.setMem('mgn_1977', true); p.m += 3 },
  },

  {
    id: 'mgn_1984',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear === 1984 && G.age >= 8 && once(G, 'mgn_1984'),
    text: 'In March the president dies on an operating table in America, and the country he ran for twenty-six years mourns him on the radio for a week. In Kankan women wail in the streets, and men who were afraid of him weep too. A week later the army takes power, and the new men are not from here. They open the gates of Camp Boiro, and nobody in Upper Guinea is sure whether to be glad.',
    choices: null,
    effect: (p) => { p.setMem('mgn_1984', true); p.m -= 3; p.e += 1 },
  },

  {
    id: 'mgn_1985',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear === 1985 && G.age >= 10 && once(G, 'mgn_1985'),
    text: (G) => 'In July, while the president is abroad, Colonel Diarra Traoré, a Malinké, announces on the radio that he has taken power, and by evening he has failed. ' +
      (CONAKRY(G)
        ? 'The next morning crowds go through the Malinké shops in Conakry, and your uncle\'s is one of them. On the radio, Conté says to the crowds, in Susu, "Wo fatara." Well done.'
        : 'The news comes up to Kankan the next day: Malinké shops in Conakry looted, Malinké officers arrested, and the president\'s voice on the radio telling the crowds, in Susu, "Wo fatara." Well done.'),
    context: 'After Diarra Traoré\'s failed coup of 4 July 1985, Malinké businesses in Conakry were looted, and Traoré and dozens of officers and members of Sékou Touré\'s family were executed without trial.',
    choices: null,
    effect: (p) => { p.setMem('mgn_1985', true); p.m -= 6; p.mo -= 100; p.addFlag('mgn_1985') },
  },

  // ── 2010 AND AFTER ─────────────────────────────────────────────────────────

  {
    id: 'mgn_2010_violence',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && HAUTE(G) && G.currentYear === 2010 && G.age >= 16 && once(G, 'mgn_2010'),
    text: 'Between the two rounds, a rumour comes up from Conakry that Peul poisoned the water at a rally for Alpha Condé, who is Malinké. In the market that afternoon young men begin pulling down the Peul traders\' stalls. The trader you buy sugar from has lived here twenty years, and his wife is shouting for their son. There are six young men and you know two of them.',
    context: 'In late October 2010, after unsubstantiated reports of poisoned water at an RPG rally in Conakry, Peul residents of Siguiri, Kouroussa and other towns in Upper Guinea were attacked and their property destroyed, and thousands fled to the Fouta Djallon. The election that followed divided largely along ethnic lines.',
    choices: [
      {
        text: 'Stand in front of his stall',
        tag: 'defiant',
        outcome: 'You say the two names out loud, and their mothers\' names. They stop, and go on to the next stall, and his family is out the back way by dark.',
        effect: (p) => { p.setMem('mgn_2010', true); p.karma += 7; p.h -= 1; p.addFlag('mgn_2010_sheltered') },
      },
      {
        text: 'Walk the other way',
        tag: 'yielding',
        outcome: 'You go home by the long road. By the evening his stall is kindling, and his family is on a lorry to the Fouta.',
        effect: (p) => { p.setMem('mgn_2010', true); p.karma -= 3; p.r += 6; p.addFlag('mgn_2010_stood') },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_conde',
    phase: null,
    weight: 700,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear >= 2010 && G.currentYear <= 2011 && G.age >= 12 && once(G, 'mgn_conde'),
    text: 'In November the commission says Alpha Condé has won, with just over half, and in Kankan people dance in the road all night and fire guns into the air. He has been in exile or in prison for most of your life, and he is the first president since Sékou Touré whom Upper Guinea counts as its own. In the Fouta, you hear, nobody is dancing. The map of the vote in the newspaper is two colours, and everyone can read it.',
    choices: null,
    effect: (p) => { p.setMem('mgn_conde', true); p.m += 5 },
  },

  {
    id: 'mgn_2020',
    phase: null,
    weight: 500,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear === 2020 && G.age >= 18 && once(G, 'mgn_2020'),
    text: 'Condé, eighty-two, has a new constitution put to a referendum, which lets him run for a third term, and he runs. In Conakry the young men of the Peul neighbourhoods along the Route Le Prince are shot in the protests, week after week. In Kankan most people vote as they voted before. Your nephew, who is twenty, says it is not the same man who went to prison, and nobody at the tea stall answers him.',
    choices: null,
    effect: (p) => { p.setMem('mgn_2020', true); p.r += 2; p.m -= 2 },
  },

  {
    id: 'mgn_2021',
    phase: null,
    weight: 999,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.currentYear === 2021 && G.age >= 10 && once(G, 'mgn_2021'),
    text: 'On the fifth of September the special forces take the palace, and by afternoon there is a photograph going round of Condé on a sofa with his shirt untucked, surrounded by soldiers. The colonel who leads them is Mamady Doumbouya, a Malinké from Kankan. People in Conakry are dancing, and so, a little more quietly, are people in Kankan. Everybody is waiting to hear what the colonel says about elections.',
    choices: null,
    effect: (p) => { p.setMem('mgn_2021', true); p.m += 1; p.addFlag('mgn_2021') },
  },

  // ── LEAVING ────────────────────────────────────────────────────────────────

  {
    id: 'mgn_abidjan',
    phase: null,
    weight: 40,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.age >= 18 && G.age <= 32 && G.currentYear >= 1960 && G.currentYear <= 2000 && once(G, 'mgn_leave'),
    text: 'Men from Upper Guinea have been going down to Abidjan since your father\'s time, to trade and to work, because the CFA franc buys things the Guinean money cannot. A cousin there has a stall in Adjamé market and needs somebody. The bus is two days by the Bamako road. Your mother puts a gris-gris in the lining of your jacket, where the money will be.',
    choices: [
      {
        text: 'Go to Abidjan',
        tag: null,
        outcome: 'Abidjan is a city of lagoons and flyovers, and in Adjamé you can go a week without speaking anything but Dioula.',
        effect: (p) => { p.setMem('mgn_leave', true); p.emigrateTo('Ivory Coast', { residency: 'work_visa', tier: 'working_class' }); p.addFlag('mgn_abidjan'); p.m += 1 },
      },
      {
        text: 'Stay home',
        tag: null,
        outcome: 'You stay. Every year the cousin sends a photograph of himself in a new shirt.',
        effect: (p) => { p.setMem('mgn_leave', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'mgn_mediterranean',
    phase: null,
    weight: 150,
    when: (G) => (G.currentCountry ?? G.character?.country)?.name === GN && G.ethnicity === 'mandinka_guinean' && G.character?.gender === 'male' && G.age >= 17 && G.age <= 30 && G.currentYear >= 2014 && G.currentYear <= 2019 && once(G, 'mgn_leave'),
    text: 'Half the boys you went to Qur\'anic school with have gone north: Bamako, Agadez, the desert, Libya, the sea, Italy. Some of them send photographs from Italy in new trainers. Two of them are dead, one in the desert and one in the water, and their mothers still say they are travelling. A man in the lorry park says the whole road can be paid in stages.',
    choices: [
      {
        text: 'Pay the first stage',
        tag: null,
        outcome: 'Twelve days to Agadez, then the desert in the back of a pickup with thirty others and a jerrycan each, and then Libya.',
        effect: (p) => { p.setMem('mgn_leave', true); p.emigrateTo('Libya', { residency: 'undocumented', tier: 'informal' }); p.addFlag('mgn_libya'); p.h -= 3; p.mo -= 300 },
      },
      {
        text: 'Stay in Guinea',
        tag: null,
        outcome: 'You stay. Every few months your phone shows you a photograph from Palermo or a notice for a funeral.',
        effect: (p) => { p.setMem('mgn_leave', true); p.r += 3 },
      },
    ],
    effect: null,
  },
]

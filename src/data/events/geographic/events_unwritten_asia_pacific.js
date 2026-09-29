// events_unwritten_asia_pacific.js — six populations the roster draws and the
// corpus had never named.
//
// `unwritten-group` reported them together: the Ngalop of western Bhutan, three
// of Papua New Guinea's four regional populations (the southern Papuan coast,
// Momase on the northern coast, and the Islands with Bougainville), the Bisaya
// of the central Philippines, and the Khmu of northern Laos. Each has a
// twentieth century that is not its country's generic one, and each is written
// from the position the engine actually draws: mostly rural, mostly poor, and
// usually on the receiving end of something decided somewhere else.
//
// The Bhutan module (`events_oman_pacific_bhutan.js`) is written from the side
// of the Lhotshampa, who were expelled. The Ngalop here are the majority whose
// dress, language and etiquette the 1989 code made compulsory for everyone;
// this module is the other half of that decree, and does not repeat the
// television and democracy events that module already carries for every
// Bhutanese character.
//
// Every guard names the ethnic id and the country inline rather than through a
// module helper, so `classifyEvent` can read them as anchored.
//
// Dates used, all checked.
// Bhutan: the Phuentsholing–Thimphu road, built with Indian help (Project
// Dantak), opened in 1962; before it the walk from Paro to the border took
// about six days. The first tourists were admitted in 1974. The royal decree
// making driglam namzhag compulsory in public is January 1989; Nepali was
// dropped from the school curriculum the same year; the southern protests are
// September 1990. Third-country resettlement from the Nepal camps began at the
// end of 2007, the first large departures in 2008.
// Papua New Guinea: Port Moresby was first bombed on 3 February 1942 and about
// a hundred times after; the Kokoda campaign runs July to November 1942, with
// ANGAU conscripting carriers. The Isurava memorial was opened in 2002. The
// Japanese landed at Lae and Salamaua on 8 March 1942 and at Madang and Wewak in
// December 1942; Lae was retaken in September 1943, Madang in April 1944, and the
// Eighteenth Army surrendered at Cape Wom in September 1945. Yali Singina's
// movement on the Madang coast peaks 1947–50 and he is jailed in 1950. Panguna
// is built 1969–72 and produces from 1972; the mine is sabotaged from November
// 1988 and closes in May 1989; PNG withdraws in March 1990 and the blockade
// begins in May 1990. Rio Tinto gives up its stake in 2016. The referendum runs
// 23 November to 7 December 2019 and the result, 97.7% for independence, is
// declared on 11 December. Independence is 16 September 1975; the kina is April
// 1975, so before it the money is Australian.
// Philippines: the national language is named Pilipino in 1959 and Filipino in
// the 1987 constitution. Mother Tongue-Based Multilingual Education begins in
// grade one in the 2012–13 school year. Haiyan (Yolanda) makes landfall on 8
// November 2013; the mass grave is at Basper, and the relocation sites are
// north of Tacloban.
// Laos: the bombing is 1964–1973, more than two million tons, around 270
// million cluster submunitions, a third unexploded. UXO Lao is founded in 1996.
// Upland resettlement to roadside focal sites runs through the 1990s and 2000s;
// Laos declares itself opium-free in 2006; Chinese rubber concessions spread
// through the north from the mid-2000s.

const once = (G, key) => !G.mem?.[key]
const ON_BOUGAINVILLE = (G) => G.place?.id === 'pg_bougainville' || G.place?.region === 'Bougainville'

export const UNWRITTEN_AP_EVENTS = [

  // ══ FOLLOW-THROUGH ═══════════════════════════════════════════════════════
  // Written first. Each one is what a flag set further down becomes later.

  // ── Bhutan: Ngalop ─────────────────────────────────────────────────────────

  {
    id: 'uap_ngl_ft_road',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'ngalop' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Bhutan' &&
      G.flags.includes('uap_ngl_first_road') && G.age >= 50 && G.currentYear >= 2005 && once(G, 'uap_ngl_ft_road'),
    text: 'The road up from Phuentsholing is being widened again, and your grandson drives it in a day and complains about the bends. You remember the first truck below the village, its engine ticking as it cooled, and the smell nobody had a word for. The old mule track still shows on the hillside if you know where to look, a thin level line through the blue pines that only cows and pilgrims use. You have started telling the six days to the border as though you walked them yourself, and you did not.',
    choices: null,
    effect: (p) => { p.setMem('uap_ngl_ft_road', true); p.m += 2; p.r += 2 },
  },

  {
    id: 'uap_ngl_ft_code',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'ngalop' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Bhutan' &&
      G.flags.includes('uap_ngl_code_1989') && G.currentYear >= 2008 && G.age >= 30 && once(G, 'uap_ngl_ft_code'),
    text: (G) => `In ${G.currentYear === 2008 ? 'this year' : '2008'} the first families from the camps in Nepal begin to fly to America, and Kuensel gives it two paragraphs on an inside page. You think of the one from Samtse at the next desk, who stopped coming in the autumn of 1990, and whose desk had somebody else at it by the new year. Nobody said where he had gone and nobody asked, and you have understood since that both of those were decisions. You do not know if his family was on the flight.`,
    choices: [
      {
        text: 'Ask around for his name',
        tag: 'defiant',
        outcome: 'A cousin in the south says the family went to the camps in 1991. After that, nobody knows, or nobody says.',
        effect: (p) => { p.setMem('uap_ngl_ft_code', true); p.r += 3; p.karma += 4 },
      },
      {
        text: 'Turn the page',
        tag: 'yielding',
        outcome: 'The next page is the archery results. You read all of them.',
        effect: (p) => { p.setMem('uap_ngl_ft_code', true); p.r += 5 },
      },
    ],
    effect: null,
  },

  // ── Papua New Guinea: the southern Papuan coast ───────────────────────────

  {
    id: 'uap_pap_ft_war',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'papuan_coastal' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.flags.includes('uap_pap_war_1942') && G.currentYear >= 2002 && G.age >= 60 && once(G, 'uap_pap_ft_war'),
    text: (G) => G.character?.gender === 'male'
      ? 'In April the trekkers come from Australia with good boots and a local man to carry each pack, and they walk the track in eight days and weep at the memorial at Isurava. A man from a newspaper finds you because there are so few of you left who carried. He wants the name they gave you in the papers in 1942, the angels, and you let him have it. What you remember is the weight, and the officer who wrote your name down wrong and paid your shillings to somebody else.'
      : 'In April the trekkers come from Australia with good boots and a local man to carry each pack, and they weep at the memorial at Isurava. A man from a newspaper comes looking for the carriers and finds you instead, because your brothers carried and are dead. He wants the stretchers and the mud. You tell him about two years under a bush shelter in your mother\'s people\'s ground, planting gardens in soil that was not yours, and he writes down less of it.',
    choices: null,
    effect: (p) => { p.setMem('uap_pap_ft_war', true); p.r += 3; p.m -= 1; p.e += 2 },
  },

  {
    id: 'uap_pap_ft_settlement',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'papuan_coastal' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.flags.includes('uap_pap_independence_1975') && G.currentYear >= 1995 && G.age >= 35 && once(G, 'uap_pap_ft_settlement'),
    text: 'Port Moresby has grown over the hills behind the old villages in settlements of timber and flattened iron, people from the Highlands and the Gulf who came for work and stayed because there is no fare home. Your clan says it owns the ground under half of them, and some of the settlers pay, and some pay somebody else who says the same. On the sixteenth of September the red and black flags go up on the settlement houses, more of them than in town. You were there in 1975, and it is harder than it should be to say which part of it you meant.',
    choices: null,
    effect: (p) => { p.setMem('uap_pap_ft_settlement', true); p.r += 3; p.e += 1 },
  },

  // ── Papua New Guinea: Momase ───────────────────────────────────────────────

  {
    id: 'uap_mom_ft_bones',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'momase' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.flags.includes('uap_mom_occupation') && G.currentYear >= 1975 && G.age >= 40 && once(G, 'uap_mom_ft_bones'),
    text: 'A party of Japanese men comes up from the coast with an interpreter, old men and one young one, looking for the bones of their soldiers. They have the number of a unit and the name of a creek. You take them to the place under the breadfruit where your father said three were buried in the last year of the war, the year they were starving and took the taro out of the ground. They kneel and burn incense and weep, which you had not expected, and leave money for the church roof.',
    choices: [
      {
        text: 'Show them where the others are',
        tag: null,
        outcome: 'There are more than three. They stay a week, and the young one learns to say thank you in your language.',
        effect: (p) => { p.setMem('uap_mom_ft_bones', true); p.karma += 5; p.mo += 150 },
      },
      {
        text: 'Show them the one place and no more',
        tag: null,
        outcome: 'Your father\'s brother is buried a little further along the same creek, and nobody has ever come looking for him.',
        effect: (p) => { p.setMem('uap_mom_ft_bones', true); p.r += 3; p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'uap_mom_ft_crocodile',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'momase' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      (G.flags.includes('uap_mom_crocodile_marks') || G.flags.includes('uap_mom_refused_cutting')) &&
      G.age >= 32 && once(G, 'uap_mom_ft_crocodile'),
    text: (G) => G.flags.includes('uap_mom_crocodile_marks')
      ? 'The ridges on your back have gone pale and hard, like rope under the skin. In the dry season the tourists who come up the river pay to photograph men like you, and a younger man in a shirt from Port Moresby asks, not unkindly, whether you would put your own son through it. Your son is in grade eight and wants to fly aeroplanes. You say you will ask him, which is not an answer, and both of you know it.'
      : 'When there is a funeral on the river the men with the marks sit together, and you sit a little to one side of them, not sent there, just there. You have a certificate from the mission school in a plastic sleeve and a job in Wewak. Your cousins, who have the crocodile on their backs, have never once asked you what the job is. You have never decided which of the two you gave up for the other.',
    choices: null,
    effect: (p) => { p.setMem('uap_mom_ft_crocodile', true); p.r += 3; p.e += 1 },
  },

  // ── Papua New Guinea: Bougainville ─────────────────────────────────────────

  {
    id: 'uap_bou_ft_referendum',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'islands_bougainville' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.flags.includes('uap_bou_blockade') && G.currentYear === 2019 && G.age >= 18 && once(G, 'uap_bou_ft_referendum'),
    text: 'The vote runs for two weeks so the ballot boxes can walk up to the mountain villages, and the line at the school is patient in a way you have not seen a line be patient. The paper has two boxes, greater autonomy or independence. On the eleventh of December the figure is read out: ninety-seven point seven. You lived through the blockade years, when the island had no medicine and no salt and buried its children for want of both, and this is the first number since that has been the size of them.',
    context: 'Bougainville\'s referendum, promised in the 2001 peace agreement, was held from 23 November to 7 December 2019. On a turnout of about 87 per cent, 97.7 per cent voted for independence. The result is not binding until ratified by the national parliament in Port Moresby.',
    choices: null,
    effect: (p) => { p.setMem('uap_bou_ft_referendum', true); p.m += 8; p.karma += 2 },
  },

  {
    id: 'uap_bou_ft_pit',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'islands_bougainville' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.flags.includes('uap_bou_panguna') && G.currentYear >= 2017 && G.age >= 40 && once(G, 'uap_bou_ft_pit'),
    text: 'The pit at Panguna is filling with rain, a lake the colour of an old coin, with the haul trucks rusting at the edge where they were parked in 1989. In 2016 the company gave its shares away to the two governments and said the river was not its concern. Young men work the tailings with pans and mercury for flecks of gold. Every few years someone in a good suit flies in to talk about reopening it, and every time the meeting in the hall goes on until dark.',
    choices: null,
    effect: (p) => { p.setMem('uap_bou_ft_pit', true); p.r += 4; p.m -= 2 },
  },

  // ── Philippines: Bisaya ────────────────────────────────────────────────────

  {
    id: 'uap_bis_ft_mother_tongue',
    phase: null,
    weight: 250,
    when: (G) => G.character?.ethnicity === 'bisaya' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Philippines' &&
      G.flags.includes('uap_bis_fined_language') && G.currentYear >= 2012 && G.currentYear <= 2023 &&
      G.age >= 30 && once(G, 'uap_bis_ft_mother_tongue'),
    text: (G) => `${G.hasGrandchildren ? 'Your grandchild' : 'The neighbour\'s girl'} comes home from grade one with a reader from the Department of Education and reads you a story about a carabao in Binisaya, the language of your kitchen, printed. The policy has a long English name and an acronym. You think of the can on the teacher's desk and the centavos in it. The words are spelled in a way you have never seen them spelled, and you are corrected on one your mother used.`,
    choices: null,
    effect: (p) => { p.setMem('uap_bis_ft_mother_tongue', true); p.m += 4; p.r += 2 },
  },

  {
    id: 'uap_bis_ft_yolanda',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'bisaya' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Philippines' &&
      G.flags.includes('uap_bis_yolanda') && G.currentYear >= 2016 && once(G, 'uap_bis_ft_yolanda'),
    text: 'Every eighth of November there are candles along the seawall at Tacloban, and at the mass grave in Basper some of the white crosses have names on them now. Your cousin\'s family were given a concrete house in the relocation site north of the city, a long way from the water. Her husband still fishes, and it takes him two rides and most of an hour to reach the boat. When it rains hard at night she sits up, and so, you notice, do you.',
    choices: null,
    effect: (p) => { p.setMem('uap_bis_ft_yolanda', true); p.r += 3; p.m -= 2 },
  },

  // ── Laos: Khmu ─────────────────────────────────────────────────────────────

  {
    id: 'uap_khmu_ft_bombie',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      G.flags.includes('uap_khmu_bombing') && G.currentYear >= 1985 && G.age >= 20 && once(G, 'uap_khmu_ft_bombie'),
    text: (G) => `Your hoe strikes something in the new field and you stop, the way everyone here stops, with the handle still in your hands. It is grey and the size of a small fruit, with the little fins still on it: a bombie, one of the ones that fell in your childhood and did not go off. You mark it with a stick and a strip of red cloth and farm around it. ${G.currentYear >= 1997 ? 'In the dry season a clearance team comes in a white truck and takes it away, and finds eleven more in the same field.' : 'Nobody comes for it, and the next year the stick has fallen over.'}`,
    choices: null,
    effect: (p) => { p.setMem('uap_khmu_ft_bombie', true); p.r += 2; p.m -= 3 },
  },

  {
    id: 'uap_khmu_ft_relocation',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      (G.flags.includes('uap_khmu_relocated') || G.flags.includes('uap_khmu_stayed_up')) &&
      G.currentYear >= 2008 && G.age >= 30 && once(G, 'uap_khmu_ft_relocation'),
    text: (G) => G.flags.includes('uap_khmu_relocated')
      ? 'The slope where the old village stood is rubber now, in rows, planted by a company from across the Chinese border, and there is a man at a gate who asks your business when you walk up to your grandmother\'s grave. At the roadside your children speak Lao at school and Khmu at home, and the Lao is winning. The paddy you were promised went to the families who came down first. You go up once a year anyway, and the man at the gate has learned your face.'
      : 'Six households stayed on the mountain out of forty, and now it is four. The school is at the road, two hours down, and your children board there in the week and come home on Saturdays speaking to each other in Lao. The surveyors for a rubber company have been up twice with a red paint pot, marking trees. Nobody has told you what the marks mean, and you have not asked, because asking would make it true.',
    choices: null,
    effect: (p) => { p.setMem('uap_khmu_ft_relocation', true); p.r += 4; p.m -= 2 },
  },

  // ══ BHUTAN: NGALOP ═══════════════════════════════════════════════════════

  {
    id: 'uap_ngl_road_1962',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'ngalop' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Bhutan' &&
      G.place?.id !== 'bt_south' && G.place?.id !== 'bt_bumthang' &&
      G.currentYear >= 1962 && G.currentYear <= 1966 && G.age >= 5 && G.age <= 14 && once(G, 'uap_ngl_road'),
    text: 'The road comes up the valley from Phuentsholing, cut into the mountain by Indian engineers and gangs of labourers from the south, and the first truck stops below the village with its engine ticking. Your grandfather walked to the border in six days with a mule to trade; the truck does it in one, if the rains have left the road where it was. The old men stand and look at the tyres. Your mother keeps the children well back, as though it might turn.',
    context: 'The road from Phuentsholing on the Indian border to Paro and Thimphu, built with Indian money and engineers, opened in 1962. Before it Bhutan had no motorable road at all, and the journey from the western valleys to the plains took about a week on foot.',
    choices: null,
    effect: (p) => { p.setMem('uap_ngl_road', true); p.e += 2; p.m += 2; p.addFlag('uap_ngl_first_road') },
  },

  {
    id: 'uap_ngl_tsechu',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'ngalop' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Bhutan' &&
      G.age >= 5 && G.age <= 12 && once(G, 'uap_ngl_tsechu'),
    text: (G) => `Before dawn on the last day of the tsechu the whole valley is in the dzong courtyard in its best, and the thongdrel is unrolled down the wall in the dark, a painted cloth the height of a building. Seeing it is supposed to lift a lifetime of wrong things off you. Your grandmother has brought you young so that the wrongs will not have had time to pile up. The atsara in his red mask pokes ${G.currentYear >= 1974 ? 'the foreign tourists' : 'the district officials'} with a wooden phallus, and nobody laughs harder than the monks.`,
    choices: null,
    effect: (p) => { p.setMem('uap_ngl_tsechu', true); p.m += 4; p.karma += 1 },
  },

  {
    id: 'uap_ngl_driglam_1989',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'ngalop' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Bhutan' &&
      G.currentYear >= 1989 && G.currentYear <= 1990 && G.age >= 12 && G.age <= 60 && once(G, 'uap_ngl_driglam'),
    text: (G) => `The decree says that in public, in offices and schools and inside the dzong, everyone will wear the national dress: the gho for men, the kira for women, the scarf in the colour of your rank. For you it changes nothing; it is what your family has always worn, woven on your grandmother's backstrap loom. ${G.career ? 'The clerk at the next desk' : 'The boy at the next desk in class'} is from Samtse, and comes in on the Monday in a gho that still has the fold lines from the shop. Somebody makes a joke about how he has tied it, and everyone looks at you to see if it is funny.`,
    context: 'In January 1989 a royal decree made driglam namzhag, the Ngalop code of dress and etiquette, compulsory in public for all citizens, and Nepali was dropped from the school curriculum the same year. In the south, where it was enforced alongside a retroactive citizenship census, it became one of the grievances behind the protests of September 1990 and the departures that followed.',
    choices: [
      {
        text: 'Laugh with the others',
        tag: 'yielding',
        outcome: 'He laughs too, a beat late, and reties it at his desk when he thinks nobody is looking.',
        effect: (p) => { p.setMem('uap_ngl_driglam', true); p.r += 3; p.addFlag('uap_ngl_code_1989') },
      },
      {
        text: 'Show him how the fold should go',
        tag: 'defiant',
        outcome: 'He thanks you in Dzongkha, carefully, a language he is also expected to have by the end of the year.',
        effect: (p) => { p.setMem('uap_ngl_driglam', true); p.karma += 4; p.s += 1; p.addFlag('uap_ngl_code_1989') },
      },
    ],
    effect: null,
  },

  // ══ PAPUA NEW GUINEA: THE SOUTHERN PAPUAN COAST ══════════════════════════

  {
    id: 'uap_pap_hiri',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'papuan_coastal' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.place?.id !== 'pg_highlands' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 && G.age >= 6 && G.age <= 14 && once(G, 'uap_pap_hiri'),
    text: 'Your grandfather sailed on the lakatoi when he was young, four canoes lashed together under sails shaped like crab claws, loaded with the clay pots the Motu women had made all year. They went west to the Gulf on the southeast wind and came home on the monsoon, low in the water with sago. He tells it in Motu with his hands: the pots packed in dry banana leaf, the men who did not come back. The water is carried in plastic buckets now, and you are the only grandchild still sitting there when he gets to the end.',
    choices: null,
    effect: (p) => { p.setMem('uap_pap_hiri', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'uap_pap_war_1942',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'papuan_coastal' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.currentYear === 1942 && G.age >= 14 && G.age <= 40 && once(G, 'uap_pap_1942'),
    text: (G) => G.character?.gender === 'male'
      ? 'The ANGAU officer comes with a list and a policeman, and every able man in the village is on the list. You carry for the Australians up the track from Owers Corner into the Owen Stanleys: ammunition going up, and coming down, a stretcher with a white man on it, four of you under the poles and two walking beside to change. It rains every afternoon. The pay is a few shillings and a stick of tobacco, and nobody asked.'
      : 'In February the Japanese planes come over Port Moresby, and within weeks the villages along the harbour are emptied; the men are taken to carry and the women and children are sent inland. You live under a bush shelter with your mother\'s people, planting gardens in ground that is not yours. The sound of the planes changes over the months, from one kind to another. You learn the difference long before anyone explains why it matters.',
    context: 'Port Moresby was first bombed on 3 February 1942 and about a hundred times after. The Australian New Guinea Administrative Unit conscripted Papuan men as carriers; on the Kokoda Track between July and November 1942 they carried supplies up and the wounded down, and Australian newspapers called them the Fuzzy Wuzzy Angels.',
    choices: null,
    effect: (p) => { p.setMem('uap_pap_1942', true); p.h -= 4; p.m -= 5; p.addFlag('uap_pap_war_1942') },
  },

  {
    id: 'uap_pap_independence_1975',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'papuan_coastal' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.currentYear === 1975 && G.age >= 8 && once(G, 'uap_pap_1975'),
    text: 'On the sixteenth of September the new flag goes up on the hill at Waigani, black and red with the bird of paradise and the Southern Cross, and the man beside you is crying with his hat in his hands. Somare speaks, and the crowd is from every part of the country, more strangers than you have ever stood among. Your mother says the ground under the ceremony belonged to Koita families before the government bought it, and the country might remember that now. It does not, particularly, but that is later.',
    context: 'Papua New Guinea became independent from Australia on 16 September 1975, with Michael Somare as prime minister. Port Moresby is built on the land of the Motu and Koita peoples, and the ownership of much of it is still disputed.',
    choices: null,
    effect: (p) => { p.setMem('uap_pap_1975', true); p.m += 6; p.addFlag('uap_pap_independence_1975') },
  },

  // ══ PAPUA NEW GUINEA: MOMASE ═════════════════════════════════════════════

  {
    id: 'uap_mom_occupation',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'momase' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.currentYear >= 1942 && G.currentYear <= 1944 && G.age >= 6 && G.age <= 45 && once(G, 'uap_mom_occupation'),
    text: 'The Japanese come ashore at Lae in March, and by the end of the year they are at Madang and Wewak and in the coast villages, asking for pigs and men and gardens in a language nobody has. The Australians who ran the station have gone. Then the Allied planes begin, and they cannot tell which houses are yours, so the village goes into the bush and comes down at night to dig taro. By the end the soldiers who are left are starving too, thinner than your father, and they take what is in the ground.',
    context: 'Japanese forces landed at Lae and Salamaua on 8 March 1942 and at Madang and Wewak in December. Lae was retaken in September 1943 and Madang in April 1944, but the Eighteenth Army held on around Wewak and in the Sepik until it surrendered at Cape Wom in September 1945. Villages were bombed by both sides, and many more people died of hunger and disease than of fighting.',
    choices: null,
    effect: (p) => { p.setMem('uap_mom_occupation', true); p.h -= 5; p.m -= 6; p.addFlag('uap_mom_occupation') },
  },

  {
    id: 'uap_mom_cargo',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'momase' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1946 && G.currentYear <= 1952 && G.age >= 10 && G.age <= 55 && once(G, 'uap_mom_cargo'),
    text: 'After the war the talk up and down the Madang coast is all about Yali, the police sergeant who was taken to Australia and saw the warehouses, and who everyone says knows where the cargo comes from. The white men have tinned meat and steel axes and ships because their ancestors send them, the talk goes, and somebody has been keeping the address from us. In the next village they have cleared a strip in the bush and built a house with a table laid for the dead, and flowers in a bottle on it. Your father says it is nonsense and goes to look at it twice.',
    context: 'Yali Singina, a Madang police sergeant and wartime coastwatcher, became the centre of a cargo movement on the Rai Coast after 1945, despite his own attempts to turn it toward development schemes. The Australian administration jailed him in 1950.',
    choices: null,
    effect: (p) => { p.setMem('uap_mom_cargo', true); p.e += 2 },
  },

  {
    id: 'uap_mom_crocodile',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'momase' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.character?.gender === 'male' && G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.age >= 13 && G.age <= 18 && once(G, 'uap_mom_crocodile'),
    text: 'Your mother\'s brothers are from the middle Sepik, and this dry season they take the boys of your age into the haus tambaran, where women may not go. For weeks the men cut your back and chest with slivers of bamboo in the pattern of a crocodile\'s hide, and rub the cuts with ash so they rise, because the crocodile made the river and the marks say you belong to it. The catechist at the mission school calls it the devil\'s work. Your grandfather has the marks, and so does the catechist\'s own father.',
    choices: [
      {
        text: 'Go into the spirit house',
        tag: 'defiant',
        outcome: 'It takes two months to heal. You come out a man in a way nobody at the school can see and nobody in the village can miss.',
        effect: (p) => { p.setMem('uap_mom_crocodile', true); p.h -= 4; p.m += 3; p.s += 2; p.addFlag('uap_mom_crocodile_marks') },
      },
      {
        text: 'Stay at the mission school',
        tag: 'yielding',
        outcome: 'Your cousins come out with the marks, and afterwards speak to you a little as though you were still a boy.',
        effect: (p) => { p.setMem('uap_mom_crocodile', true); p.e += 3; p.r += 3; p.addFlag('uap_mom_refused_cutting') },
      },
    ],
    effect: null,
  },

  // ══ PAPUA NEW GUINEA: BOUGAINVILLE ═══════════════════════════════════════

  {
    id: 'uap_bou_panguna',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'islands_bougainville' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      G.currentYear >= 1969 && G.currentYear <= 1974 && G.age >= 8 && G.age <= 60 && once(G, 'uap_bou_panguna'),
    text: 'The company has taken the valley at Panguna, and the mountain your mother\'s clan counted its gardens from is going down into a hole, carried off by trucks the size of houses. The Jaba River runs grey now, then white, and the fish have gone from it all the way to the coast. The compensation goes to the men whose names were written down, in Australian dollars, in small cheques. The land passes through the women here, and nobody from the company asked the women.',
    context: 'Bougainville Copper, majority-owned by Conzinc Riotinto of Australia, built the Panguna open-cut mine from 1969 and began production in 1972. At its height it earned close to half of Papua New Guinea\'s exports. Its tailings went into the Jaba River system, and the island\'s matrilineal land tenure was largely ignored in the compensation arrangements.',
    choices: null,
    effect: (p) => { p.setMem('uap_bou_panguna', true); p.m -= 4; p.r += 2; p.addFlag('uap_bou_panguna') },
  },

  {
    id: 'uap_bou_blockade',
    phase: null,
    weight: 40,
    // On the island: the blockade was around Bougainville, and this fired for
    // a Bougainvillean in Port Moresby. The mainland version follows.
    when: (G) => G.character?.ethnicity === 'islands_bougainville' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      ON_BOUGAINVILLE(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1994 && G.age >= 6 && once(G, 'uap_bou_blockade'),
    text: 'The government has closed the sea around the island, and nothing comes in: no medicine, no fuel, no soap, no salt. The children who get malaria get it without chloroquine now. Your uncles run the trucks on coconut oil, and a man in the next village has put a car alternator in the creek, and the aid post has light for the first time in a year. At night you hear the helicopters.',
    context: 'Landowners led by Francis Ona sabotaged the Panguna mine from November 1988 and it closed in May 1989. Papua New Guinea withdrew from the island in March 1990 and imposed a blockade from May. The war between the Bougainville Revolutionary Army, the PNG Defence Force and local resistance forces lasted until a truce in 1997; thousands died, most of them of disease and lack of medicine.',
    choices: [
      {
        text: 'Stay in the mountain villages',
        tag: 'defiant',
        outcome: 'You learn which leaves bring a fever down and which roots will do instead of salt, and you bury two cousins who needed more than leaves.',
        effect: (p) => { p.setMem('uap_bou_blockade', true); p.h -= 6; p.m -= 6; p.karma += 3; p.addFlag('uap_bou_blockade') },
      },
      {
        text: 'Go down to the care centre',
        tag: 'yielding',
        outcome: 'There is rice and a clinic and a fence, and the people inside it are looked at by both sides as though they have chosen.',
        effect: (p) => { p.setMem('uap_bou_blockade', true); p.h -= 2; p.m -= 5; p.r += 4; p.addFlag('uap_bou_blockade') },
      },
    ],
    effect: null,
  },

  {
    id: 'uap_bou_blockade_mainland',
    phase: null,
    weight: 40,
    // The same years from Port Moresby or Lae, where the island is a place you
    // are from and cannot reach, and the news of it is whatever the radio says.
    when: (G) => G.character?.ethnicity === 'islands_bougainville' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Papua New Guinea' &&
      !ON_BOUGAINVILLE(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1994 && G.age >= 16 && once(G, 'uap_bou_blockade'),
    text: 'There are no boats to the island now, and no letters. The radio in Moresby calls the people fighting rebels, and at work somebody says it to you as though you would agree. Your family\'s village is on the other side of the blockade. Once, in the second year, a message comes through a priest in Honiara: everyone is alive except two cousins. You read it on the bus and put it in your shirt pocket and do not take it out again for a week.',
    choices: null,
    effect: (p) => { p.setMem('uap_bou_blockade', true); p.m -= 6; p.r += 4 },
  },

  // ══ PHILIPPINES: BISAYA ══════════════════════════════════════════════════

  {
    id: 'uap_bis_speak_english',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'bisaya' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Philippines' &&
      G.currentYear >= 1960 && G.currentYear <= 1995 && G.age >= 7 && G.age <= 12 && once(G, 'uap_bis_english'),
    text: (G) => `There is a tin can on the teacher's desk, and for every word of Bisaya you are caught speaking inside the school gate you put in ten centavos. The class monitor keeps the list. English is for the lessons, and ${G.currentYear >= 1987 ? 'Filipino' : 'Pilipino'} for the anthem and the subject after lunch, which is Tagalog with a new name, and the language you dream in is the one that costs money. By Friday you have learned to say nothing at all at recess, which was also what the list was for.`,
    choices: null,
    effect: (p) => { p.setMem('uap_bis_english', true); p.e += 2; p.m -= 2; p.addFlag('uap_bis_fined_language') },
  },

  {
    id: 'uap_bis_yolanda',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'bisaya' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Philippines' &&
      G.place?.id !== 'ph_manila' &&
      G.currentYear === 2013 && G.age >= 8 && once(G, 'uap_bis_yolanda'),
    text: 'The radio says storm surge, two words nobody on the islands has heard used together before, and the people who understand them are mostly on television in Manila. On the morning of the eighth of November the wind comes, and then the sea comes up the streets of Tacloban higher than the houses. Your cousin\'s family lives two streets from the water there. For three days there is no signal, and then there is a list.',
    context: 'Typhoon Haiyan, known in the Philippines as Yolanda, made landfall in Eastern Samar and Leyte on 8 November 2013. Its storm surge, several metres high, destroyed much of Tacloban; the official death toll passed 6,300.',
    choices: [
      {
        text: 'Get on a boat to Leyte and look for them',
        tag: null,
        outcome: 'You find them at the Astrodome on the fourth day, all but the youngest, and you carry the smell of the city home in your clothes.',
        effect: (p) => { p.setMem('uap_bis_yolanda', true); p.h -= 3; p.m -= 8; p.karma += 5; p.mo -= 100; p.addFlag('uap_bis_yolanda') },
      },
      {
        text: 'Wait by the radio for their names',
        tag: null,
        outcome: 'Their names come on the eleventh day, on a list of the living, spelled wrong. You read it four times.',
        effect: (p) => { p.setMem('uap_bis_yolanda', true); p.m -= 6; p.r += 3; p.addFlag('uap_bis_yolanda') },
      },
    ],
    effect: null,
  },

  {
    id: 'uap_bis_mindanao_brother',
    phase: null,
    weight: 25,
    when: (G) => G.character?.ethnicity === 'bisaya' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Philippines' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.currentYear <= 1972 && G.age >= 12 && G.age <= 30 && once(G, 'uap_bis_mindanao'),
    text: 'Your uncle writes from Mindanao that there is land down there for anyone who clears it, and on this island there is not enough for all of your father\'s sons. Your eldest brother goes south on the boat with a bolo, a sack of rice and the letter. A year later he writes that he has a homestead in a valley where the rivers do not have Bisaya names, and that there are Manobo on the hills above the clearing who watch him burn the forest. Nobody at the land office, he writes, asked them anything.',
    choices: null,
    effect: (p) => { p.setMem('uap_bis_mindanao', true); p.e += 1; p.m -= 1 },
  },

  // ══ LAOS: KHMU ═══════════════════════════════════════════════════════════

  {
    id: 'uap_khmu_swidden',
    phase: null,
    weight: 30,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      G.ruralUrban === 'rural' && G.age >= 6 && G.age <= 13 && once(G, 'uap_khmu_swidden'),
    text: 'In March the men cut the forest on the slope your grandfather last farmed when your father was a boy, and in April, on a day with the right wind, they burn it. The smoke stands over the valley for a week, and the ash is the field. When the rains come you walk behind your mother with a dibble stick making holes, and she drops the rice in each one and closes it with her foot without looking down. The big tree at the edge of the field is not cut, because the spirit of the field lives in it.',
    choices: null,
    effect: (p) => { p.setMem('uap_khmu_swidden', true); p.h += 1; p.m += 2 },
  },

  {
    id: 'uap_khmu_bombing',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1965 && G.currentYear <= 1973 && G.age >= 4 && G.age <= 45 && once(G, 'uap_khmu_bombing'),
    text: 'The planes come in the day, so the village lives at night. You plant the rice in the dark and sleep in the cave above the stream with the pigs tied at its mouth, and you know the sound of each kind of aircraft before you know what any of them are called. When a house burns nobody goes to put it out. Your older brother has gone with the Pathet Lao, and your mother\'s cousin carries a rifle for the other side, and at funerals nobody says which.',
    context: 'Between 1964 and 1973 the United States dropped more than two million tons of ordnance on Laos, including some 270 million cluster submunitions, in a war it did not officially acknowledge; around a third failed to explode. Khmu men fought on both sides, for the Pathet Lao and for the Royal Lao Army and its CIA-run irregulars.',
    choices: null,
    effect: (p) => { p.setMem('uap_khmu_bombing', true); p.h -= 5; p.m -= 6; p.addFlag('uap_khmu_bombing') },
  },

  {
    id: 'uap_khmu_kha',
    phase: null,
    weight: 25,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      G.currentYear >= 1976 && G.currentYear <= 1995 && G.age >= 10 && G.age <= 25 && once(G, 'uap_khmu_kha'),
    text: 'At the market in the district town a lowland woman calls you kha, the old word, and then corrects herself, laughing, to Lao Theung, which is the new one. The new word means the Lao of the mountain slopes, and it is on the posters at the district office, where three women in three kinds of dress hold hands under the flag. The old word means slave. You have noticed that people who use the new word do not always stop meaning the old one.',
    choices: [
      {
        text: 'Pay for the salt and say nothing',
        tag: 'yielding',
        outcome: 'She gives you short weight, or you think she does. You do not check.',
        effect: (p) => { p.setMem('uap_khmu_kha', true); p.m -= 3; p.r += 2 },
      },
      {
        text: 'Answer her in better Lao than her own',
        tag: 'defiant',
        outcome: 'She stops laughing. The man at the next stall does not, and it is not clear at whom.',
        effect: (p) => { p.setMem('uap_khmu_kha', true); p.s += 2; p.karma += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'uap_khmu_relocation',
    phase: null,
    weight: 40,
    when: (G) => G.character?.ethnicity === 'khmu' &&
      (G.currentCountry?.name ?? G.character?.country?.name) === 'Laos' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1994 && G.currentYear <= 2006 && G.age >= 14 && once(G, 'uap_khmu_relocation'),
    text: 'The district officials come up the path in the dry season and tell the village it is to go down to the road, where there will be a school and a clinic and paddy, and the mountain will be left to grow back. Burning the forest is to stop, and so is the little opium some households still grow behind the rice. The headman asks where the paddy is, and they say it will be allocated. Some of the old people say they will stay where their parents are buried.',
    context: 'From the 1990s the Lao government resettled upland villages to roadside focal sites to end shifting cultivation and opium growing and to bring services within reach. Many moved villages saw sharp rises in malaria and deaths in their first years, and lowland paddy was often already taken. Laos declared itself opium-free in 2006.',
    choices: [
      {
        text: 'Go down with the village',
        tag: 'yielding',
        outcome: 'The first rainy season at the road, the fever takes four people who had never had it on the mountain.',
        effect: (p) => { p.setMem('uap_khmu_relocation', true); p.h -= 4; p.m -= 5; p.e += 2; p.addFlag('uap_khmu_relocated') },
      },
      {
        text: 'Stay up with the old people',
        tag: 'defiant',
        outcome: 'The houses that are left look further apart than they are. The district does not come back for two years.',
        effect: (p) => { p.setMem('uap_khmu_relocation', true); p.m -= 3; p.karma += 2; p.addFlag('uap_khmu_stayed_up') },
      },
    ],
    effect: null,
  },
]

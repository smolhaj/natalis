// events_nigeria_south.js — the south, from where the character lives.
//
// Three reviewers read eighteen Nigerian lives of the 1962 cohort. The Ijaw
// ones had almost nothing between Biafra and Saro-Wiwa: a creek village is the
// place the country's money comes out of, and the corpus met it once, at
// twenty-eight, in a paragraph about gas flares. The Igbo lives ended the war
// in 1970 and did not hear about it again. The Yoruba lives had June 12 and not
// the man who, for their parents, was the whole of politics.
//
// Guards read `G.place?.region` — where the character lives now — not only
// ethnicity. An Igbo trader in Port Harcourt is in the Delta; an Ijaw clerk in
// Lagos is in the Southwest.
//
// Dates used, all checked:
//   Oct 1965–Jan 1966  "Operation Wetie" after the rigged Western Region election
//                      of 11 October 1965: arson, people doused in petrol
//   23 Feb 1966        Isaac Adaka Boro declares the Niger Delta Republic with the
//                      Niger Delta Volunteer Service; crushed in twelve days;
//                      sentenced to death, pardoned by Gowon, killed in 1968
//                      fighting on the federal side
//   27 May 1967        Gowon creates twelve states, among them Rivers State;
//                      30 May Ojukwu declares Biafra, which claims Rivers;
//                      Port Harcourt falls to federal troops May 1968
//   1968–69            the Agbekoya farmers' revolt in Ibadan and Oyo against tax
//                      and cocoa prices; the Agodi prison in Ibadan stormed Sept 1969
//   1969–             the Rivers State Abandoned Property Edict; Igbo houses in
//                      Port Harcourt kept by the state after the war
//   Sept 1976          Universal Primary Education launched nationwide
//   9 May 1987         Obafemi Awolowo dies at Ikenne; buried there in June
//   1 Oct 1996         Bayelsa State created from Rivers
//   Aug 1994           Oodua People's Congress founded; clashes in Sagamu, Ketu,
//                      Idi-Araba 1999–2000; Obasanjo's shoot-on-sight order Oct 2000
//   11 Dec 1998        the Kaiama Declaration of the Ijaw Youth Council;
//                      soldiers fire on the Ogele marchers in Yenagoa, 30–31 Dec
//   20 Nov 1999        the army razes Odi, Bayelsa State; Federal High Court awards
//                      ₦37.6bn compensation in February 2013
//   Aug 2001           GSM: Econet (6 Aug) and MTN (16 Aug); a SIM around ₦20,000
//   Jan 2006           MEND's first kidnappings of foreign oil workers
//   25 June 2009       Yar'Adua's amnesty; weapons handed in to 4 Oct 2009;
//                      a monthly stipend of ₦65,000
//   9 Feb 2010         Goodluck Jonathan acting president; sworn in 6 May 2010
//                      after Yar'Adua's death; elected April 2011
//   1–16 Jan 2012      subsidy removed, petrol ₦65 to ₦141; Occupy Nigeria,
//                      Ojota rallies; general strike 9–16 Jan; reset to ₦97
//   31 Mar 2015        Jonathan concedes to Buhari by telephone
//   14 Oct 2015        Nnamdi Kanu arrested; Python Dance Sept 2017; re-arrested
//                      June 2021; Monday sit-at-home from August 2021
//   29 May 2023        Tinubu: "fuel subsidy is gone"

const IS_NG = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Nigeria'
const REGION = (G) => G.place?.region ?? null
const DELTA = (G) => IS_NG(G) && REGION(G) === 'Niger Delta'
const SOUTHEAST = (G) => IS_NG(G) && REGION(G) === 'Southeast Nigeria'
const SOUTHWEST = (G) => IS_NG(G) && REGION(G) === 'Southwest Nigeria'
const SOUTH = (G) => DELTA(G) || SOUTHEAST(G) || SOUTHWEST(G)
const LAGOS = (G) => G.place?.id === 'ng_lagos'
const PH = (G) => G.place?.id === 'ng_port_harcourt'
const ETH = (G) => G.character?.ethnicity
const IGBO = (G) => ETH(G) === 'igbo'
const IJAW = (G) => ETH(G) === 'ijaw'
const YORUBA = (G) => ETH(G) === 'yoruba'
const MUSLIM = (G) => String(G.religion ?? '').startsWith('muslim')
const URBAN = (G) => G.ruralUrban === 'urban'
const once = (G, key) => !G.mem?.[key]

const SOUTH_MAIN = [

  // ── THE CREEKS ─────────────────────────────────────────────────────────────

  {
    id: 'ngs_boro_1966',
    phase: null,
    weight: 500,
    claimsYears: { from: 1966, to: 1966 },
    when: (G) => DELTA(G) && G.currentYear === 1966 && G.age >= 4 && once(G, 'ngs_boro'),
    text: (G) => G.age <= 10
      ? 'In February some young men go into the creeks with guns and a flag, and for a fortnight the grown-ups talk in the evenings with the lamp turned down. The name you hear is Boro. He has said the Delta is a republic now, because the oil is under it and nothing from the oil has come back. Then soldiers come up the river in boats, and it is over, and the flag is a thing nobody will say they saw.'
      : 'On the twenty-third of February Isaac Boro, a student who was a policeman before that, declares a Niger Delta Republic with a hundred and fifty-nine men and some rifles, because the oil is under the creeks and none of the money has come back up them. It lasts twelve days. He is tried and sentenced to death, and the whole Delta waits to see if they will do it. The argument he made is the one ' + (G.parents?.father?.alive ? 'your father has' : 'the old men have') + ' been making at the waterside for years, in fewer words.',
    context: 'Isaac Adaka Boro, an Ijaw former policeman and student leader, proclaimed the Niger Delta Republic on 23 February 1966 with his Niger Delta Volunteer Service. Federal forces crushed the revolt in twelve days. Boro was sentenced to death, pardoned by Gowon in 1967, and killed in 1968 fighting for the federal side in the civil war. He is regarded as the first Niger Delta resource-control nationalist.',
    choices: null,
    effect: (p) => { p.setMem('ngs_boro', true); p.e += 2; p.addFlag('ngs_boro_1966') },
  },

  {
    id: 'ngs_rivers_1967',
    phase: null,
    weight: 500,
    claimsYears: { from: 1967, to: 1967 },
    when: (G) => DELTA(G) && G.currentYear === 1967 && G.age >= 4 && once(G, 'ngs_rivers'),
    text: 'At the end of May the radio in Lagos says there is a Rivers State now, for the people of the creeks, and three days later the radio in Enugu says there is a Biafra, and that the creeks are in it. Both of them want you. In the market the Igbo traders are suddenly careful with the Ijaw ones, and the Ijaw ones are careful back. By the time the federal soldiers come up from Bonny the word both sides use for people like your family is saboteur.',
    context: 'On 27 May 1967 Gowon divided Nigeria into twelve states, creating Rivers State for the Ijaw and other eastern minorities; on 30 May Biafra seceded and claimed the whole Eastern Region, including Rivers. Minority communities were caught between both sides and accused of disloyalty by each. Federal forces took Bonny in 1967 and Port Harcourt in May 1968.',
    choices: null,
    effect: (p) => { p.setMem('ngs_rivers', true); p.m -= 4; p.addFlag('ngs_rivers_biafra') },
  },

  {
    id: 'ngs_flare_child',
    phase: null,
    // The childhood years it can reach are crowded with dated ones (Biafra,
    // the coups, FESTAC); at 40 it reached none of twenty Delta children.
    weight: 150,
    when: (G) => DELTA(G) && G.currentYear >= 1962 && G.currentYear <= 2015 && G.age >= 6 && G.age <= 14 && once(G, 'ngs_flare'),
    text: (G) => 'The flare at the flow station across the water burns all night and all day, a sound like wind that never stops, and at night the sky over it is orange enough to find your way home by. ' +
      (G.flags.includes('never_schooled') ? 'The small children dry fish in its heat.' : 'The older children read by it when the lamp oil is finished.') +
      ' Some mornings there is a skin on the creek that makes a rainbow, and the fish taste of it, and your mother throws the catch back and says nothing about why. The pipe runs through the swamp behind the houses, painted, labelled in a language that is not addressed to you.',
    context: 'Gas flaring began in the Niger Delta soon after production started at Oloibiri in 1958, and Nigeria was for decades among the world\'s largest flarers. Deadlines to end routine flaring — 1984, 2008, 2020 — were all missed. Spills from pipelines and flow stations have contaminated creeks and fishing grounds across the region.',
    choices: null,
    effect: (p) => { p.setMem('ngs_flare', true); p.h -= 2; p.addFlag('ngs_flare_child'); p.addFlag('grew_up_polluted') },
  },

  {
    id: 'ngs_bayelsa_1996',
    phase: null,
    weight: 400,
    claimsYears: { from: 1996, to: 1996 },
    when: (G) => DELTA(G) && G.currentYear === 1996 && G.age >= 12 && once(G, 'ngs_bayelsa'),
    text: (G) => 'On the first of October a new state is carved out of Rivers and named Bayelsa, the Ijaw heartland with a capital at Yenagoa, which is a town you could walk across in an afternoon. The general who does it is the one everybody in Lagos is afraid of. Here people celebrate anyway, carefully, because a state means a government house, and a government house means jobs, and nobody asks too loudly who gave it.' +
      (G.flags.includes('ngs_rivers_biafra') ? ' The last time a soldier drew a line around the creeks you were a child and both sides called you saboteur. This time at least it is only one side drawing.' : ''),
    context: 'Sani Abacha created Bayelsa State from Rivers State on 1 October 1996, with Yenagoa as capital. It is predominantly Ijaw and among the largest oil-producing states in Nigeria.',
    choices: null,
    effect: (p) => { p.setMem('ngs_bayelsa', true); p.m += 2; p.addFlag('ngs_bayelsa_state') },
  },

  {
    id: 'ngs_kaiama_1998',
    phase: null,
    weight: 500,
    claimsYears: { from: 1998, to: 1999 },
    when: (G) => DELTA(G) && G.currentYear >= 1998 && G.currentYear <= 1999 && G.age >= 14 && once(G, 'ngs_kaiama'),
    text: (G) => (G.currentYear === 1998 ? 'In December' : 'In the December just gone') +
      ', in Kaiama, which is Boro\'s town, five thousand young men write down that the land and the oil under it belong to the Ijaw, and that the companies should leave by the end of the year. At the end of the year they march in Yenagoa in the Ogele, drumming and dancing, and the soldiers shoot into the dance.' +
      (G.flags.includes('ngs_boro_1966') ? ' Somebody on the march carries Boro\'s photograph. You remember when that name was said with the lamp turned down.' : '') +
      ' The oil keeps flowing through the whole of it.',
    context: 'On 11 December 1998 the Ijaw Youth Council issued the Kaiama Declaration, asserting Ijaw ownership of land and resources and demanding oil companies withdraw. Troops fired on unarmed "Operation Climate Change" demonstrators in Yenagoa on 30–31 December 1998, killing several.',
    choices: [
      {
        text: 'Sign your name to it.',
        tag: 'defiant',
        outcome: 'Your name is on a list in a room in Kaiama. You find out later that the soldiers had a copy of the list before you did.',
        effect: (p) => { p.setMem('ngs_kaiama', true); p.karma += 5; p.r += 3; p.addFlag('ngs_kaiama'); p.addFlag('political_aware') },
      },
      {
        text: 'Watch it from the waterside and keep your name off.',
        tag: 'yielding',
        outcome: 'You watch the boats go to Kaiama and come back, and you count them each way.',
        effect: (p) => { p.setMem('ngs_kaiama', true); p.r += 3; p.addFlag('ngs_kaiama') },
      },
    ],
  },

  {
    id: 'ngs_odi_1999',
    phase: null,
    weight: 600,
    claimsYears: { from: 1999, to: 2000 },
    when: (G) => DELTA(G) && G.currentYear >= 1999 && G.currentYear <= 2000 && G.age >= 10 && once(G, 'ngs_odi'),
    text: (G) => (G.currentYear === 1999
      ? 'Six months into the democracy, twelve policemen are killed near Odi, and the army goes in. It stays a fortnight. When it comes out the town is gone — the houses, the market, the school, the people who did not reach the bush in time — and what is left standing is the bank, the Anglican church and the health centre. '
      : 'Last November, six months into the democracy, twelve policemen were killed near Odi and the army went in. It stayed a fortnight. When it came out the town was gone — the houses, the market, the school, the people who did not reach the bush in time — and what was left standing was the bank, the Anglican church and the health centre. ') +
      (G.place?.id === 'ng_delta' ? 'Odi is hours away by boat. People you know have family there, and for weeks nobody can find out which of them.' : 'The photographs come to Port Harcourt through the churches before they come through the newspapers.') +
      ' The president says the army did its job.',
    context: 'On 20 November 1999, after the killing of twelve policemen, the army razed the Ijaw town of Odi in Bayelsa State. Estimates of civilian deaths range from dozens to over two thousand. In February 2013 a Federal High Court ordered the federal government to pay ₦37.6 billion in compensation to the community.',
    choices: null,
    effect: (p) => { p.setMem('ngs_odi', true); p.m -= 10; p.r += 5; p.addFlag('ngs_odi_1999') },
  },

  {
    id: 'ngs_mend_2006',
    phase: null,
    weight: 60,
    when: (G) => DELTA(G) && G.currentYear >= 2006 && G.currentYear <= 2008 && G.age >= 16 && G.age <= 50 && once(G, 'ngs_mend'),
    text: 'A boy you were at school with has a speedboat with two engines and a man at the front with a rifle, and he wears the camouflage he did not have to buy. MEND, the letters say on the statements the journalists read. White men are taken off the rigs and kept in the creeks until somebody pays, and the pipelines are cut, and the oil that comes out of the cuts is boiled into diesel in drums at the waterside by people who used to fish. There is money in the creeks for the first time in your life, and it is this money.',
    context: 'The Movement for the Emancipation of the Niger Delta began kidnapping foreign oil workers and attacking pipelines in January 2006, cutting Nigerian output by up to a quarter at its height. Illegal refining of stolen crude ("bunkering") spread across the creeks.',
    choices: [
      {
        text: 'Go to the camp. At least it is money that comes back up the creek.',
        tag: 'defiant',
        outcome: 'The camp has rules and a commander and a generator that runs all night. You learn the channels at night without a light.',
        effect: (p) => { p.setMem('ngs_mend', true); p.mo += 1500; p.karma -= 6; p.h -= 3; p.addFlag('ngs_creek_camp') },
      },
      {
        text: 'Stay out of it, and out of the way of both sides.',
        tag: 'yielding',
        outcome: 'Being out of it means being searched by the soldiers who are looking for the ones in it. You are searched a great deal.',
        effect: (p) => { p.setMem('ngs_mend', true); p.m -= 4; p.r += 3; p.addFlag('ngs_mend_years') },
      },
    ],
  },

  {
    id: 'ngs_amnesty_2009',
    phase: null,
    weight: 500,
    claimsYears: { from: 2009, to: 2009 },
    when: (G) => DELTA(G) && G.currentYear === 2009 && G.age >= 16 && once(G, 'ngs_amnesty'),
    text: (G) => G.flags.includes('ngs_creek_camp')
      ? 'The amnesty says you can hand in the gun by October and be paid for it — sixty-five thousand naira a month, and training, somewhere, in a trade. You queue at the collection point with men you last saw in the dark. The officer writes your name and the serial number in the same ledger, one line each, and it is the first time the state has written your name down for anything that was not a charge.'
      : 'The amnesty says the boys in the creeks can hand in their guns by October and be paid — sixty-five thousand naira a month, and training in a trade. Everyone who never took a gun works out the arithmetic in the same evening: the government pays the boys who shot at it more than it pays the teacher at the school by the waterside. Then the boats stop at night, and the pipeline hisses only where it always hissed, and you decide not to finish the arithmetic.',
    context: 'President Umaru Yar\'Adua proclaimed an amnesty for Niger Delta militants on 25 June 2009; some 26,000 surrendered weapons by the 4 October deadline and were enrolled on a monthly stipend of ₦65,000 with vocational and overseas training. Attacks on oil installations fell sharply.',
    choices: null,
    effect: (p) => { p.setMem('ngs_amnesty', true); p.m += 3; p.addFlag('ngs_amnesty_2009') },
  },

  {
    id: 'ngs_jonathan_2010',
    phase: null,
    weight: 500,
    claimsYears: { from: 2010, to: 2010 },
    when: (G) => DELTA(G) && G.currentYear === 2010 && G.age >= 16 && once(G, 'ngs_jonathan'),
    text: 'In May the president dies after months nobody was allowed to see him, and the vice-president is sworn in, and he is Ijaw, from Otuoke, a village in Bayelsa smaller than some markets. A man from the creeks is in Aso Rock. At the declaration he says he went to school without shoes, and here people repeat it for weeks, because everybody here went to school without shoes. Nobody expects the creeks to change. It is the first time the country has had to look at the place the money comes from.',
    context: 'Goodluck Jonathan, an Ijaw zoologist from Otuoke in Bayelsa State, became acting president in February 2010 during Umaru Yar\'Adua\'s illness and was sworn in as president on 6 May 2010 after Yar\'Adua\'s death. Declaring his candidacy that September he said, "I had no shoes." He won the 2011 election.',
    choices: null,
    effect: (p) => { p.setMem('ngs_jonathan', true); p.m += 6; p.addFlag('ngs_jonathan_creeks') },
  },

  // ── THE EAST, AFTER ────────────────────────────────────────────────────────

  {
    id: 'ngs_abandoned_property',
    phase: null,
    weight: 80,
    when: (G) => IS_NG(G) && IGBO(G) && G.currentYear >= 1970 && G.currentYear <= 1973 && G.age >= 8 && (SOUTHEAST(G) || PH(G)) && once(G, 'ngs_abandoned'),
    text: (G) => 'Your uncle built four flats in Port Harcourt in 1964, in Diobu, and let them to civil servants. After the war he goes down to see them. There is a family in each, paying rent to the state. The papers say abandoned property, which is what the government of Rivers State calls a house whose Igbo owner ran for his life. He comes back in the evening and sits outside without the lamp.' +
      (PH(G) ? ' You live in this city. You walk past the house on the way to the market, and you know which window was his.' : ''),
    context: 'After the civil war, Rivers State\'s Abandoned Property Edict vested thousands of Igbo-owned houses and plots, especially in Port Harcourt, in the state. Most were never returned; the issue remains one of the central Igbo grievances of the post-war settlement.',
    choices: null,
    effect: (p) => { p.setMem('ngs_abandoned', true); p.m -= 5; p.r += 3; p.addFlag('ngs_abandoned_property') },
  },

  {
    id: 'ngs_igba_boi',
    phase: null,
    weight: 60,
    when: (G) => IS_NG(G) && IGBO(G) && G.character?.gender === 'male' &&
      G.currentYear >= 1971 && G.currentYear <= 2015 && G.age >= 12 && G.age <= 17 &&
      !G.flags.includes('graduated_hs') && (G.wealthTier ?? 3) <= 2 && !G.career && once(G, 'ngs_igba'),
    text: (G) => 'Your father\'s cousin has a shop in Onitsha Main Market, spare parts, and needs a boy. You go to live in his house. You sweep the shop at six, you carry, you learn the price of every part and then the price you say for it and then the price you take, and you sleep on a mat in the corridor with his other boy. No wages. The arrangement is older than the war: ' +
      (G.currentYear <= 1985 ? 'after the war, with twenty pounds each, it is how the whole East started again.' : 'it is how the East started again after the war, with twenty pounds each.') +
      ' If you serve well for six or seven years he will settle you — a shop, a stock, a start. If you do not, he will send you home with nothing, and everybody in the village will know why.',
    context: 'Igba boi (or imu ahia), the Igbo apprenticeship system, binds a boy to a trader for several years without pay, after which the master "settles" him with capital to open his own business. It underpinned the rebuilding of Igbo commerce after 1970 and is often described as one of the largest business incubators in the world.',
    choices: [
      {
        text: 'Serve. Learn everything.',
        tag: 'yielding',
        outcome: 'You learn which parts come from Japan and which are made to look as if they came from Japan. You learn that the second list is longer.',
        effect: (p) => { p.setMem('ngs_igba', true); p.setMem('ngs_igba_age', p._age); p.e += 3; p.s += 2; p.addFlag('ngs_igba_boi') },
      },
      {
        text: 'Serve, and keep a small trade of your own on the side.',
        tag: 'defiant',
        outcome: 'Every boy in the market does it and every master knows. It is part of what the master is watching for.',
        effect: (p) => { p.setMem('ngs_igba', true); p.setMem('ngs_igba_age', p._age); p.e += 2; p.s += 3; p.karma -= 1; p.addFlag('ngs_igba_boi') },
      },
    ],
  },

  {
    id: 'ngs_ipob',
    phase: null,
    weight: 40,
    when: (G) => SOUTHEAST(G) && IGBO(G) && G.currentYear >= 2015 && G.currentYear <= 2020 && G.age >= 18 && once(G, 'ngs_ipob'),
    text: (G) => 'There is a radio station called Radio Biafra that broadcasts from London, and the man who runs it, Nnamdi Kanu, is arrested in Lagos in October 2015 and becomes, overnight, the most famous Igbo man alive. The young men who were not born until thirty years after the war wear the rising sun on their shirts.' +
      (G.flags.includes('biafra_child')
        ? ' You were in the war they are singing about. You remember kwashiorkor as a word you learned about somebody. You watch them sing and cannot tell whether what you feel is pride or fear, and decide it is both.'
        : (G.age >= 50 ? ' Your generation remembers what the flag cost. The young have only the flag.' : ' The old people at home go quiet when the song comes on, and the young ones turn it up.')) +
      (G.currentYear >= 2017 ? ' In 2017 the army comes through the Southeast on an operation it calls Python Dance, and afterwards Kanu is gone and nobody will say where.' : ''),
    context: 'The Indigenous People of Biafra, led by Nnamdi Kanu, grew rapidly after his arrest on 14 October 2015. Released on bail in 2017, he vanished after the army\'s "Operation Python Dance II" raid on his home in September 2017. He was re-arrested in Kenya in June 2021 and brought back to Nigeria.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ipob', true); p.r += 3; p.addFlag('ngs_ipob_years') },
  },

  // ── THE WEST ───────────────────────────────────────────────────────────────

  {
    id: 'ngs_wetie_1965',
    phase: null,
    weight: 500,
    claimsYears: { from: 1965, to: 1966 },
    when: (G) => SOUTHWEST(G) && G.currentYear >= 1965 && G.currentYear <= 1966 && G.age >= 6 && once(G, 'ngs_wetie'),
    text: (G) => (G.currentYear === 1965 ? 'After the election in October' : 'Since the election last October') +
      ' the Western Region is on fire, a house at a time. The results said the government won; nobody you know voted for the government. The word for what happens next is wetie — wet it — and it means petrol, and it means a house, and sometimes it means a man. Your ' +
      (G.age <= 12 ? 'mother keeps you inside after dark.' : 'family stops going out after dark.') +
      ' The lorries on the Ibadan road get stopped and burned. The soldiers in Lagos watch, and in January they stop watching.',
    context: 'The rigged Western Region election of 11 October 1965, won by Samuel Akintola\'s NNDP against the Action Group, set off months of arson, killings and roadblocks known as "Operation Wetie" (wet it — with petrol). The disorder in the West was one of the pretexts for the coup of 15 January 1966.',
    choices: null,
    effect: (p) => { p.setMem('ngs_wetie', true); p.m -= 6; p.addFlag('ngs_wetie_1965') },
  },

  {
    id: 'ngs_agbekoya',
    phase: null,
    weight: 500,
    claimsYears: { from: 1968, to: 1969 },
    when: (G) => SOUTHWEST(G) && !LAGOS(G) && G.currentYear >= 1968 && G.currentYear <= 1969 && G.age >= 6 && once(G, 'ngs_agbekoya'),
    text: (G) => 'The farmers say they will not pay the tax. Cocoa is paying less every season and the tax collectors are paying themselves, and in the villages round Ibadan the men meet at night and call themselves Agbekoya — the farmers reject suffering. ' +
      (G.ruralUrban === 'rural'
        ? 'The men from your village go into the bush with cutlasses and dane guns, and the tax people stop coming. The police come instead, and are ambushed on the road, and for a year the countryside belongs to the farmers.'
        : 'In Ibadan the city watches the countryside come to it: in September the farmers march on Agodi prison and open it and let out their own people.') +
      ' Everybody in the country is looking east at the war. Here there is a second one that nobody outside the West has heard of.',
    context: 'The Agbekoya Parapo revolt of 1968–69 was a rising of Yoruba cocoa farmers in the Ibadan and Oyo areas against taxation, low produce prices and corrupt local officials. In September 1969 the farmers stormed Agodi prison in Ibadan. The government conceded tax cuts and the dismissal of officials.',
    choices: null,
    effect: (p) => { p.setMem('ngs_agbekoya', true); p.e += 2; p.addFlag('ngs_agbekoya') },
  },

  {
    id: 'ngs_upe_1976',
    phase: null,
    weight: 300,
    claimsYears: { from: 1976, to: 1977 },
    when: (G) => SOUTH(G) && G.currentYear >= 1976 && G.currentYear <= 1977 && G.age >= 6 && G.age <= 16 && !G.flags.includes('never_schooled') && once(G, 'ngs_upe'),
    text: (G) => (G.age <= 11
      ? 'In September the whole country\'s primary schools are free, and your class goes from forty to ninety in a week. They put two classes in one room with the partition taken out, and a teacher who was in secondary school herself last year stands at the front with a register she cannot finish calling before break.'
      : 'In September primary school is free across the whole country, and the school you left is suddenly twice the size, children on the floor, classes under the mango tree, teachers trained in a crash course of a few months.') +
      (SOUTHWEST(G) ? ' Here the old people say Awo did this in 1955 and the Federal Government has only just caught up.' : ' Here, where fees had been paid by selling a goat, the goat stays.'),
    context: 'Universal Primary Education was launched across Nigeria in September 1976, funded by the oil boom; enrolment nearly doubled within a few years and tens of thousands of teachers were hastily trained. The Western Region under Obafemi Awolowo had introduced free primary education in 1955.',
    choices: null,
    effect: (p) => { p.setMem('ngs_upe', true); p.e += 2 },
  },

  {
    id: 'ngs_awolowo_1987',
    phase: null,
    weight: 600,
    claimsYears: { from: 1987, to: 1987 },
    when: (G) => SOUTHWEST(G) && YORUBA(G) && G.currentYear === 1987 && G.age >= 10 && once(G, 'ngs_awo'),
    text: (G) => 'Awolowo dies in May, at Ikenne, at seventy-eight. You have never known a Western Nigeria that was not partly his: the free primary school, the television station, the stadium in Ibadan, the argument your grandfather has with the radio every time his name is said. ' +
      (MUSLIM(G) ? 'At the mosque on Friday the imam prays for him, a Christian, and nobody finds it strange.' : 'At church the pastor gives the whole sermon to him, and nobody finds it strange.') +
      ' In June they bury him at Ikenne and the roads from Lagos and Ibadan are a single line of cars for a day. He was never president. Everybody in the West says so as if it were the country\'s loss and not his.' +
      (G.flags.includes('ngs_wetie_1965') ? ' You remember the year of wetie, when his people\'s houses were burning. You think about that on the road.' : ''),
    context: 'Chief Obafemi Awolowo, premier of the Western Region 1954–59 and founder of the Action Group and Unity Party of Nigeria, died on 9 May 1987. His free primary education programme of 1955, Africa\'s first television station (WNTV, 1959) and Liberty Stadium made him the dominant figure of Yoruba politics. He ran for president in 1979 and 1983 and lost both times.',
    choices: null,
    effect: (p) => { p.setMem('ngs_awo', true); p.m -= 4; p.addFlag('ngs_awo_mourned') },
  },

  {
    id: 'ngs_opc',
    phase: null,
    weight: 40,
    when: (G) => SOUTHWEST(G) && YORUBA(G) && G.character?.gender === 'male' && G.currentYear >= 1999 && G.currentYear <= 2001 && G.age >= 16 && G.age <= 40 && once(G, 'ngs_opc'),
    text: 'The Oodua People\'s Congress has an office on your road now, and the young men in it wear charms on their wrists and say they are the only police the Yoruba have. After June 12 it had seemed like politics. Now it is Sagamu and Ketu and Idi-Araba: Hausa traders and Yoruba traders and a market burned with everybody\'s stock in it, and the OPC boys walking home at dawn with cutlasses. They catch armed robbers the police never catch, and they also catch whoever they decide is one.',
    context: 'The Oodua People\'s Congress, founded in 1994 by Frederick Fasehun after the annulment of June 12, grew into a Yoruba self-determination movement and vigilante force. Clashes with Hausa communities in Sagamu, Ketu and Idi-Araba in 1999–2000 killed hundreds; in October 2000 President Obasanjo ordered police to shoot OPC members on sight.',
    choices: [
      {
        text: 'Join. Somebody has to hold the road at night.',
        tag: 'defiant',
        outcome: 'You are given a charm and a password and a street. On the street, at night, you are more powerful than you have ever been, and you know it, and you are careful about knowing it.',
        effect: (p) => { p.setMem('ngs_opc', true); p.karma -= 3; p.s += 3; p.addFlag('ngs_opc_member') },
      },
      {
        text: 'Keep your distance and keep your Hausa customers.',
        tag: 'yielding',
        outcome: 'Your customers from the North stop coming for a month and then come back. None of you mentions the month.',
        effect: (p) => { p.setMem('ngs_opc', true); p.karma += 2; p.r += 2 },
      },
    ],
  },

  // ── NATIONAL, SEEN FROM HERE ───────────────────────────────────────────────

  {
    id: 'ngs_gsm_2001',
    phase: null,
    weight: 150,
    when: (G) => IS_NG(G) && URBAN(G) && G.currentYear >= 2001 && G.currentYear <= 2003 && G.age >= 16 && once(G, 'ngs_gsm'),
    text: (G) => 'In August the lines come — Econet first, then MTN — and a SIM costs about twenty thousand naira, which is ' +
      ((G.wealthTier ?? 2) >= 3 ? 'a sum you pay without asking anyone.' : 'more than a month of what most people on your street earn.') +
      ' The first handset on your street belongs to a man who sells building materials, and he takes calls standing in the road so that everybody can see. Within a year people have invented flashing: you ring once and hang up, and the other person, who has more credit, calls you back. The etiquette of who flashes whom is worked out faster than anything the government has ever done.',
    context: 'GSM service arrived in Nigeria in August 2001, when Econet Wireless and MTN launched within ten days of each other. SIM cards initially cost around ₦20,000. Nigeria went from roughly 450,000 landlines to over 30 million mobile subscribers by 2006, one of the fastest adoptions in the world.',
    choices: null,
    effect: (p) => { p.setMem('ngs_gsm', true); p.m += 3; p.addFlag('ngs_first_line') },
  },

  {
    id: 'ngs_occupy_2012',
    phase: null,
    weight: 500,
    claimsYears: { from: 2012, to: 2012 },
    when: (G) => IS_NG(G) && G.currentYear === 2012 && G.age >= 16 && once(G, 'ngs_occupy'),
    text: (G) => 'New Year\'s Day: the subsidy is removed and petrol goes from sixty-five naira to a hundred and forty-one overnight. ' +
      (LAGOS(G)
        ? 'By the next week Ojota is full — Gani Fawehinmi Park, musicians on a stage, doctors with first-aid tables, everybody who has ever had an opinion about the government standing in one field saying it.'
        : 'By the next week the unions have called a general strike, and the city stops: the markets, the banks, the buses.') +
      ' They call it Occupy Nigeria. For a week it is the whole country. On the sixteenth the price comes down to ninety-seven and the unions go back, and the young people who were in the field feel the thing that happens when somebody negotiates on your behalf.',
    context: 'The removal of Nigeria\'s fuel subsidy on 1 January 2012 more than doubled the petrol price. The Occupy Nigeria protests, centred on Ojota in Lagos, and a general strike from 9 to 16 January ended when the government restored a partial subsidy at ₦97 a litre.',
    choices: [
      {
        text: 'Go out.',
        tag: 'defiant',
        outcome: 'You stand in it. You lose a week\'s money and some of your voice, and you learn that a price can be made to move.',
        effect: (p) => { p.setMem('ngs_occupy', true); p.m += 2; p.karma += 3; p.addFlag('ngs_occupy_2012'); p.addFlag('political_aware') },
      },
      {
        text: 'Stay in and do the sums.',
        tag: 'yielding',
        outcome: 'You work out what the new price does to the month, then the old price, then the halfway price, and you are right each time.',
        effect: (p) => { p.setMem('ngs_occupy', true); p.r += 2; p.addFlag('ngs_occupy_2012') },
      },
    ],
  },

]

// ── FOLLOW-THROUGH ───────────────────────────────────────────────────────────

const SOUTH_FOLLOWTHROUGH = [

  {
    id: 'ngs_ft_flare_cough',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('ngs_flare_child') && G.age >= 45 && once(G, 'ngs_ft_flare'),
    text: (G) => 'You have a cough in the mornings that the doctor calls chronic and does not call anything else. The flare you grew up by is still burning' +
      (G.currentYear > 2020 ? ', past the deadline of 2020, as it burned past 2008 and past 1984' : G.currentYear > 2008 ? ', past the deadline of 2008, as it burned past 1984' : ', and the government has given it a date to stop by') +
      '. You can still find your way home in the dark by the colour of the sky in that direction. You have never once decided whether that is a comfort.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_flare', true); p.h -= 3; p.r += 2; p.addCondition('copd', 'mild') },
  },

  {
    id: 'ngs_ft_boro',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('ngs_boro_1966') && G.currentYear >= 1990 && G.age >= 35 && once(G, 'ngs_ft_boro'),
    text: 'The young men quote Boro now, whole sentences from the declaration, from a pamphlet somebody has photocopied so many times the letters have gone soft. They were not born. You were a child in the fortnight it lasted and you remember mostly the lamp turned down. They have made him into a statue in their heads. You would like to tell them he died fighting for the side that hanged him, but it would not help them, and it is not quite true either.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_boro', true); p.e += 2; p.r += 2 },
  },

  {
    id: 'ngs_ft_odi_judgment',
    phase: null,
    weight: 300,
    claimsYears: { from: 2013, to: 2013 },
    when: (G) => G.flags.includes('ngs_odi_1999') && G.currentYear === 2013 && once(G, 'ngs_ft_odi'),
    text: 'In February a judge in Port Harcourt rules that the federal government must pay the people of Odi thirty-seven billion naira for what the army did in 1999. Fourteen years. The judgment is read on the radio in full and people listen to all of it, the way you listen to a thing you have waited for. Nobody expects the money. It is the words that are the payment: that a court of the country has written it down.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_odi', true); p.m += 3; p.r -= 2 },
  },

  {
    id: 'ngs_ft_jonathan_2015',
    phase: null,
    weight: 300,
    claimsYears: { from: 2015, to: 2015 },
    when: (G) => G.flags.includes('ngs_jonathan_creeks') && G.currentYear === 2015 && once(G, 'ngs_ft_jonathan'),
    text: (G) => 'He loses. On the last day of March, before the final count is announced, he rings the other man and congratulates him, and it is the first time in the country\'s history a sitting president has done that. In Lagos they call it statesmanship. In the creeks people are angrier with him for conceding than for losing.' +
      (G.flags.includes('ngs_amnesty_2009') ? ' The stipends were meant to end years ago. Everyone here is wondering what the new man will do with them.' : '') +
      ' You are proud of him and would not say so to anybody at the waterside.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_jonathan', true); p.m -= 2; p.e += 2 },
  },

  {
    id: 'ngs_ft_abandoned',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('ngs_abandoned_property') && G.age >= 40 && once(G, 'ngs_ft_abandoned'),
    text: 'Somebody at a funeral mentions the flats in Diobu, and the conversation stops the way it has stopped whenever anybody has mentioned them for thirty years. The case went to a panel and then to a committee and then to nothing. Your uncle is dead. There is a family in the flats whose children were born there and have never heard his name, and you have decided, without deciding, that you are not going to be the one who tells them.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_abandoned', true); p.r += 3; p.addFlag('the_subtraction') },
  },

  {
    id: 'ngs_ft_igba_settled',
    phase: null,
    weight: 60,
    when: (G) => G.flags.includes('ngs_igba_boi') && G.age >= (G.mem?.ngs_igba_age ?? 99) + 6 && once(G, 'ngs_ft_settled'),
    text: 'After seven years your master calls you into the back of the shop on a Saturday and settles you. A stall two lines down from his, stock for three months, and a list of the men in Nnewi and Lagos who will give you credit because he says so. You have not been paid for a single day of the seven years. You sit on the stall that evening with the shutters half down and do not open it yet, because once it is open it is yours, and you want to have had the half hour before.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_settled', true); p.mo += 2500; p.m += 8; p.addFlag('ngs_igba_settled') },
  },

  {
    id: 'ngs_ft_own_boy',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('ngs_igba_settled') && G.age >= 32 && once(G, 'ngs_ft_own_boy'),
    text: 'A woman from your village brings her son to the stall and asks you to take him. He is thirteen and has the same way of standing that you had, trying to look as if he is not measuring the shop. He will sleep in your corridor. You hear yourself tell him the price of a part, then the price you say, then the price you take, in the same order you were told, and you realise you have been waiting twenty years to say it.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_own_boy', true); p.m += 5; p.karma += 4; p.addFlag('became_mentor') },
  },

  {
    id: 'ngs_ft_sit_at_home',
    phase: null,
    weight: 300,
    claimsYears: { from: 2021, to: 2022 },
    when: (G) => G.flags.includes('ngs_ipob_years') && SOUTHEAST(G) && G.currentYear >= 2021 && G.currentYear <= 2022 && once(G, 'ngs_ft_sit'),
    text: (G) => (G.currentYear === 2021 ? 'Since August' : 'Every week now') +
      ', Monday is a day nobody in the Southeast goes out. Kanu has been brought back from Kenya and put on trial, and until he is free the order is to sit at home. Nobody you know gave the order and nobody you know disobeys it. The markets close, the schools close, the buses stop, and the people who open anyway find their shops burned by men nobody can name. You have lost fifty-two days a year to a man in a cell in Abuja. Some Mondays you think he would not want it. Some Mondays you do not think about him at all, only about the day.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_sit', true); p.m -= 5; p.wipeMoney(0.1) },
  },

  {
    id: 'ngs_ft_agbekoya',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('ngs_agbekoya') && G.age >= 40 && once(G, 'ngs_ft_agbekoya'),
    text: 'A young man from the local government comes to the village with a receipt book for a new levy, and the old men sit under the tree and look at him without saying anything for long enough that he puts the book away. He does not know what he has just been told. You were a child when the farmers went into the bush. The men under the tree were the farmers.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_agbekoya', true); p.e += 2; p.m += 2 },
  },

  {
    id: 'ngs_ft_awo_picture',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('ngs_awo_mourned') && G.age >= 45 && once(G, 'ngs_ft_awo'),
    text: 'The photograph of Awolowo in the parlour has been there since before you were born, glasses and cap and the particular expression, and you have moved it from house to house without ever deciding to. Your children call him "that man". You tell them about the free school, and they are polite about it, the way you were polite about your grandfather\'s stories about the British. You leave the picture up.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_awo', true); p.m += 2 },
  },

  {
    id: 'ngs_ft_opc',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('ngs_opc_member') && G.age >= 40 && G.currentYear >= 2018 && once(G, 'ngs_ft_opc'),
    text: 'Gani Adams, who led the half of the OPC that carried the cutlasses, is made Aare Ona Kakanfo, the Yoruba generalissimo, in a ceremony in Oyo with the Alaafin, and the newspapers that called him a militia leader in 2000 print his photograph in beads. You still have the charm somewhere. You remember the market at Ketu and the smell of it, and you watch the ceremony on television with the sound down.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_opc', true); p.r += 4 },
  },

  {
    id: 'ngs_ft_flash',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('ngs_first_line') && G.currentYear >= 2012 && G.age >= 40 && G.parents?.mother?.alive && once(G, 'ngs_ft_flash'),
    text: 'Your mother still flashes you. She has credit — you send it to her — and she still rings once and hangs up and waits, because that was the rule when the lines were new, and a rule learned at that price is not unlearned. You ring her back every time. You have never mentioned it.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_flash', true); p.m += 3 },
  },

  {
    id: 'ngs_ft_subsidy_2023',
    phase: null,
    weight: 300,
    claimsYears: { from: 2023, to: 2023 },
    when: (G) => G.flags.includes('ngs_occupy_2012') && G.currentYear === 2023 && once(G, 'ngs_ft_subsidy'),
    text: 'At his inauguration in May the new president says four words, fuel subsidy is gone, and by the end of the week petrol has tripled. Nobody goes to Ojota. You were there, or you remember the people who were, and eleven years later the price that was fought down to ninety-seven is past five hundred and the field is empty. It is not that people have stopped minding. It is that they have learned what minding costs, and how long it holds.',
    choices: null,
    effect: (p) => { p.setMem('ngs_ft_subsidy', true); p.m -= 5; p.r += 3 },
  },

]

export const NIGERIA_SOUTH_EVENTS = [...SOUTH_MAIN, ...SOUTH_FOLLOWTHROUGH]

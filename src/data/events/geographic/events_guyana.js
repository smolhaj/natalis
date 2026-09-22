// events_guyana.js — the country with one mention.
//
// Guyana had a single guard anywhere in 8,124 events, and that guard named it
// in a list of five Caribbean states. The roster models it in full: 40%
// Indo-Guyanese, 29% Afro-Guyanese, 20% Mixed, 10.5% Amerindian and flagged
// disadvantaged, a religion mix that is a quarter Hindu, a regime history that
// goes constitutional monarchy → single-party authoritarian in 1970 →
// democracy in 1992, and a country note that names Burnham, Jonestown and the
// seawall. None of it had anywhere to go. It also had no places, so a Guyanese
// character was born nowhere.
//
// It is a small country — 800,000 people, and more Guyanese abroad than in it —
// with a twentieth century that almost nobody outside the region knows, and
// which happens to contain, in one place, most of the forces this game is
// about: indenture, a colonial monopoly, a two-party split that runs exactly
// along the line of who your great-grandparents were, a constitution suspended
// by warship, an election engineered from outside, twenty years of a
// dictatorship that banned bread, and a departure so total it emptied the
// villages.
//
// What this module tries not to do is write the racial arithmetic as though
// either side of it chose the arrangement. The PPP/PNC split was not two
// peoples discovering they hated each other; it was a party breaking in 1955
// and the break being available to be widened, and it was widened — by the
// strike money in 1963, by the change of voting system in 1964. The people in
// the villages on both sides of it went through a thing that was done partly to
// them. Nobody in 1962 Georgetown thought they were being used, and the
// declassified files say they were.
//
// Dates used, all checked. Apprenticeship ends 1838 and the first indentured
// Indians land at Gladstone's estates in May of that year; indenture ends 1917;
// about 239,000 came. Bookers held roughly three quarters of the sugar
// industry, hence "Booker's Guiana." Police shoot five sugar workers at
// Plantation Enmore on 16 June 1948. The PPP wins the first universal-suffrage
// election in April 1953 and Britain suspends the constitution 133 days later,
// on 9 October, landing troops from HMS Superb. The party splits in 1955.
// Black Friday is 16 February 1962; the 80-day general strike is 1963; the
// Wismar expulsions and the Son Chapman explosion are 1964, and some 2,600
// families move. Britain changes the system to proportional representation for
// the December 1964 election, which Jagan leads on votes and loses on
// coalition. Independence 26 May 1966; Co-operative Republic 23 February 1970.
// The Rupununi uprising is January 1969. Demba is nationalised in 1971 and
// Bookers in 1976. Jonestown is 18 November 1978: 918 dead in the North West
// District. Walter Rodney is killed by a bomb on 13 June 1980; a commission of
// inquiry finds the state responsible in 2016. Wheat flour imports are banned
// in 1982. Burnham dies 6 August 1985. The first free election in 28 years is
// 5 October 1992. The Great Flood is January 2005. Exxon confirms Liza in May
// 2015 and first oil is December 2019.


const IS_GY = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Guyana'
const BORN_GY = (G) => G.character?.country?.name === 'Guyana'

const INDO = (G) => G.character?.ethnicity === 'indo_guyanese'
const AFRO = (G) => G.character?.ethnicity === 'afro_guyanese'
const MIXED = (G) => G.character?.ethnicity === 'mixed_guyanese'
const FIRST = (G) => G.character?.ethnicity === 'amerindian_guyanese'

// The coast is where nearly everyone is. The interior is a different country
// that happens to share a flag with it.
const COAST = (G) => ['gy_georgetown', 'gy_berbice', 'gy_essequibo'].includes(G.place?.id)
const INTERIOR = (G) => ['gy_rupununi', 'gy_linden'].includes(G.place?.id)

const once = (G, key) => !G.mem?.[key]

export const GUYANA_EVENTS = [

  // ── THE ESTATE ─────────────────────────────────────────────────────────────

  {
    id: 'gy_logie_room',
    phase: 'childhood',
    weight: 30,
    when: (G) => IS_GY(G) && INDO(G) && G.currentYear <= 1965 && G.age >= 6 && G.age <= 11 && once(G, 'gy_logie'),
    text: 'The room is one room. It is about ten feet by twelve and the wall does not go all the way up to the roof, so you hear the Baijnauths on one side and the Persauds on the other as clearly as you hear your own mother, and they hear you. Everyone on the range knows who coughed in the night. The floor is earth that your mother sweeps and dampens and sweeps again, and the estate owns the room, which means the estate can take it back, which means nobody in the row has ever once been rude to the driver.',
    context: 'Estate housing in British Guiana was the "logie" or "range" — a long barrack building partitioned into single rooms, one per family, dating from the indenture period and still standing on many estates into the 1960s. Rooms were tied to employment: losing the job meant losing the room.',
    choices: null,
    effect: (p) => { p.setMem('gy_logie', true); p.h -= 2; p.addFlag('logie_childhood') },
  },

  {
    id: 'gy_bookers_everything',
    phase: null,
    weight: 7,
    when: (G) => IS_GY(G) && G.currentYear >= 1935 && G.currentYear <= 1976 && G.age >= 12 && G.age <= 60 && once(G, 'gy_bookers'),
    text: 'The wage comes from Bookers. The shop you spend it in is Bookers. The drugstore is Bookers, the rum is Bookers, the ship that takes the sugar out is Bookers, and the estate hospital where your aunt died is Bookers. Someone at the standpipe says the letters stand for Booker\'s Guiana and everybody laughs the particular laugh people use for a joke that is only the truth said quickly.',
    context: 'Booker Brothers, McConnell & Co. controlled roughly three-quarters of British Guiana\'s sugar industry along with shipping, retail, and much else. The colony\'s initials, B.G., were widely joked to stand for "Booker\'s Guiana." Bookers was nationalised in 1976, becoming Guysuco.',
    choices: null,
    effect: (p) => { p.setMem('gy_bookers', true); p.e += 2; p.addFlag('booker_colony') },
  },

  {
    id: 'gy_backdam_cutlass',
    phase: null,
    weight: 6,
    when: (G) => IS_GY(G) && G.currentYear <= 1990 && G.age >= 14 && G.age <= 55 &&
      (G.character?.ruralUrban === 'rural' || G.place?.id === 'gy_berbice' || G.place?.id === 'gy_essequibo') &&
      once(G, 'gy_backdam'),
    text: 'You go to the backdam before the sun is properly up because the cane is easier when it is cool and because the day is measured in punts loaded, not in hours. The cutlass has a curve to it and you sharpen it on a file every morning until the edge will take the hair off your arm. By nine the cane dust is inside your shirt and inside your eyes and the trench water you are standing in is warm as blood. Your grandfather cut on this same estate. The difference between you and him is that you can leave, which is not the same thing as leaving.',
    choices: null,
    effect: (p) => { p.setMem('gy_backdam', true); p.h -= 3; p.mo += 120; p.addFlag('backdam_cane') },
  },

  {
    id: 'gy_enmore_1948',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1948 && G.age >= 10 && once(G, 'gy_enmore'),
    text: 'They shoot the strikers at Plantation Enmore on the sixteenth of June and five men die, most of them shot in the back, which the inquiry will note and then do nothing about. The bodies go to Georgetown and the crowd walks behind them the whole way to Le Repentir, miles of people on the public road in the heat, and somewhere in that procession is a young dentist from Port Mourant who will say for the rest of his life that he decided everything he later did while walking behind those coffins. You are in the road too. The names get said out loud at the graveside — Lallabagee, Pooran, Rambarran, Dukhi, Harry — and the saying of them is the first political act most people in this country will ever take part in.',
    context: 'On 16 June 1948, police fired on sugar workers striking at Plantation Enmore over the "cut-and-load" system, killing five. Cheddi Jagan, then a young dentist and later Premier and President, described the funeral march as the moment he committed himself to politics.',
    choices: [
      {
        text: 'Join the union that forms out of it.',
        tag: 'defiant',
        outcome: 'You pay dues you cannot spare to an organisation the estate does not recognise. It takes another twenty-six years before it is recognised, and you are still alive when it is.',
        effect: (p) => { p.setMem('gy_enmore', true); p.m += 3; p.karma += 6; p.addFlag('enmore_martyrs'); p.addFlag('union_solidarity') },
      },
      {
        text: 'Walk behind the coffins and go back to work on Monday.',
        tag: 'yielding',
        outcome: 'The estate takes everybody back except the four men it does not. You are not one of the four. You never entirely stop doing the arithmetic on that.',
        effect: (p) => { p.setMem('gy_enmore', true); p.m -= 2; p.r += 4; p.addFlag('enmore_martyrs') },
      },
    ],
  },

  // ── THE TWO PARTIES ────────────────────────────────────────────────────────

  {
    id: 'gy_vote_known_before_spoken',
    phase: null,
    weight: 7,
    when: (G) => IS_GY(G) && G.currentYear >= 1957 && G.age >= 16 && (INDO(G) || AFRO(G)) && once(G, 'gy_vote'),
    text: 'Nobody has to ask you. The man doing the electrical work knows, the woman who sells you the greens knows, the clerk at the ministry knows before he reads your name properly, because your surname does the whole job. The PPP is the Indian party and the PNC is the African party and everyone says this is not what it is and everyone votes exactly as if it is. Both parties began as one party, in 1950, and there are photographs.',
    context: 'The People\'s Progressive Party, founded by Cheddi Jagan and Forbes Burnham in 1950, split in 1955. Burnham\'s faction became the PNC. From then on Guyanese elections tracked the Indo-/Afro-Guyanese population split so closely that turnout, not persuasion, decided most of them.',
    choices: [
      {
        text: 'Vote the way your street votes. It is not a small thing to be with your people.',
        tag: 'yielding',
        outcome: 'It is not cynicism. The party is where your neighbours are, and the other one has said things about people like you that you have not forgotten.',
        effect: (p) => { p.setMem('gy_vote', true); p.m += 2; p.addFlag('ethnic_vote'); p.addFlag('political_active') },
      },
      {
        text: 'Say, out loud, that both of them are using you.',
        tag: 'defiant',
        outcome: 'Your uncle does not speak to you for a month. You turn out to have been right, which helps less than you would expect.',
        effect: (p) => { p.setMem('gy_vote', true); p.m -= 3; p.e += 4; p.addFlag('refused_ethnic_vote') },
      },
    ],
  },

  {
    id: 'gy_1953_suspension',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1953 && G.age >= 10 && once(G, 'gy_1953'),
    text: 'In April the colony votes for the first time with everybody allowed to vote, and the PPP takes eighteen of twenty-four seats, and for a hundred and thirty-three days there is a government here that people chose. In October the warship comes. Troops off HMS Superb come up the Demerara and into Georgetown, the constitution is suspended, and the reason given on the radio is that the government intends to make this place a communist state. The government has been in office since April. You try to work out what it could possibly have had time to do.',
    context: 'Britain suspended British Guiana\'s constitution on 9 October 1953, 133 days after the PPP\'s election victory, landing troops from HMS Superb. The stated justification was a communist threat; the government was dismissed and several leaders detained or restricted.',
    choices: null,
    effect: (p) => { p.setMem('gy_1953', true); p.m -= 4; p.e += 3; p.addFlag('constitution_suspended_1953') },
  },

  {
    id: 'gy_black_friday_1962',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1962 && G.age >= 8 && once(G, 'gy_1962'),
    text: 'Water Street burns on the sixteenth of February. It starts as a protest about a budget — a tax on things people were already struggling to buy — and by afternoon the commercial district is alight and the fire service cannot get through the crowd and the shops that go up are mostly owned by people whose grandparents came on the same ships as yours, or as somebody\'s. Five dead, and a smell over the city for a week that everyone who was alive can still describe. Afterwards the two halves of the country look at each other differently and nobody is able to say precisely when that started.',
    context: 'Black Friday, 16 February 1962: protests against Finance Minister Nicholas Kaldor\'s budget turned into riots that burned much of Georgetown\'s commercial centre. It began a period of civil unrest lasting until 1964. A 1963 general strike was later confirmed to have been partly funded through American labour organisations acting as conduits for the CIA.',
    choices: null,
    effect: (p) => { p.setMem('gy_1962', true); p.m -= 5; p.addFlag('black_friday_1962') },
  },

  {
    id: 'gy_1964_displacement',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1964 && G.age >= 6 && (INDO(G) || AFRO(G)) && once(G, 'gy_1964'),
    text: (G) => INDO(G)
      ? 'At Wismar they put the Indian families on the boats and the boats come down the river to Georgetown and the families are standing on the stelling with whatever they carried. Your cousin is on one of them. She had a house and a shop and a mango tree her father planted, and she has a bag. About two and a half thousand families move this year in one direction or the other, and the word people use for it is "the disturbances," which is a word chosen by somebody who was not moved.'
      : 'The boat from Georgetown to Wismar goes up on the river in July and forty-three people die, and the dead are Africans going home. Before that there was Wismar, where Indian families were put out, and after this there will be something else. Your mother stops sending you to the shop on the other side. About two and a half thousand families move this year in one direction or the other, and the word people use for it is "the disturbances," which is a word chosen by somebody who was not moved.',
    context: 'The 1962–64 disturbances killed around 176 people and displaced roughly 2,600 families, who moved into villages of their own ethnic majority. In May 1964 Indo-Guyanese residents were driven out of Wismar; in July the vessel Son Chapman exploded on the Demerara River, killing 43 Afro-Guyanese passengers.',
    choices: [
      {
        text: 'Take them in. There is room if you make room.',
        tag: 'defiant',
        outcome: 'Eleven people in a house built for five, for most of a year. It is the hardest thing you have ever agreed to and you would agree to it again.',
        effect: (p) => { p.setMem('gy_1964', true); p.karma += 10; p.mo -= 200; p.m -= 2; p.addFlag('displaced_1964'); p.addFlag('sheltered_the_displaced') },
      },
      {
        text: 'Move. The village you came from is not safe for people with your name now.',
        tag: 'yielding',
        outcome: 'You go where the surnames match yours. It is safer. Nothing about it feels like a victory and you never quite stop calling the old place home.',
        effect: (p) => { p.setMem('gy_1964', true); p.m -= 6; p.r += 5; p.addFlag('displaced_1964'); p.addFlag('moved_for_safety') },
      },
    ],
  },

  {
    id: 'gy_1964_pr_election',
    phase: null,
    weight: 60,
    when: (G) => IS_GY(G) && G.currentYear === 1965 && G.age >= 16 && once(G, 'gy_pr'),
    text: 'They changed the counting. For the December election the colony switched to proportional representation, which was explained as fairness and which everybody understood to be arithmetic aimed at one man, and the PPP came first on votes and did not form the government. Your neighbour, who has counted ballots at the school since 1953, keeps saying the same sentence: we won it and we lost it and both of those are true. This is the last thing the British do here before they leave.',
    context: 'Britain changed British Guiana\'s electoral system to proportional representation ahead of the December 1964 election. The PPP won the largest share of the vote (45.8%) but Forbes Burnham\'s PNC formed a coalition government with the United Force. Declassified British and American records confirm the change was intended to remove Jagan.',
    choices: null,
    effect: (p) => { p.setMem('gy_pr', true); p.e += 3; p.m -= 3; p.addFlag('election_engineered') },
  },

  {
    id: 'gy_dougla_household',
    phase: null,
    weight: 5,
    when: (G) => IS_GY(G) && MIXED(G) && G.age >= 8 && G.age <= 30 && once(G, 'gy_dougla'),
    text: 'You are the argument in both houses. One grandmother says a word about the other side of you that she would not say in front of your mother, and the other grandmother has her own word, and both of them feed you enormously and neither of them is going to stop. At school you get asked the question directly, which children do — what are you — and the honest answer takes longer than the bell allows. There are a great many of you in this country. There is no party for you.',
    choices: [
      {
        text: 'Answer: Guyanese. Let them do what they want with it.',
        tag: 'defiant',
        outcome: 'It sounds like a slogan and it is not one. You mean it flatly, as a fact about where you were born, and it makes a certain kind of adult uncomfortable in a way you come to enjoy.',
        effect: (p) => { p.setMem('gy_dougla', true); p.s += 4; p.m += 3; p.addFlag('dougla_identity') },
      },
      {
        text: 'Learn which house to be which self in.',
        tag: 'yielding',
        outcome: 'You get very good at it. Both grandmothers think you are entirely theirs, and the cost of that is a thing you only notice in your forties.',
        effect: (p) => { p.setMem('gy_dougla', true); p.s += 5; p.r += 3; p.addFlag('dougla_identity'); p.addFlag('code_switched') },
      },
    ],
  },

  // ── INDEPENDENCE AND THE CO-OPERATIVE REPUBLIC ─────────────────────────────

  {
    id: 'gy_independence_1966',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1966 && G.age >= 5 && once(G, 'gy_indep'),
    text: 'The Golden Arrowhead goes up at midnight on the twenty-fifth of May and the country stops being British Guiana. The flag has a green field for the forest, a gold arrowhead for the mineral wealth, a white fimbriation for the rivers, black for endurance and red for the work ahead — a schoolteacher explains all five and you will remember the list your whole life. There is a lot of forest and a lot of gold in the ground and very little in the houses. The arrowhead is pointing at something nobody has arrived at yet.',
    choices: null,
    effect: (p) => { p.setMem('gy_indep', true); p.m += 7; p.e += 2; p.addFlag('golden_arrowhead'); p.addFlag('independence_generation') },
  },

  {
    id: 'gy_republic_1970',
    phase: null,
    weight: 80,
    when: (G) => IS_GY(G) && G.currentYear === 1970 && G.age >= 8 && once(G, 'gy_republic'),
    text: 'On the twenty-third of February the country becomes the Co-operative Republic of Guyana, which is the only co-operative republic in the world, and there is a festival for it called Mashramani, which is said to be an Amerindian word for the celebration after co-operative work. There are floats and costume bands down Church Street and a competition for the best one. The co-operative part of it is going to mean, over the next fifteen years, that the state owns the sugar, the bauxite, the banks, the rice board and most of the shops. On the twenty-third of February nobody has told you that part.',
    choices: null,
    effect: (p) => { p.setMem('gy_republic', true); p.m += 4; p.addFlag('co_operative_republic') },
  },

  {
    id: 'gy_nationalisation',
    phase: null,
    weight: 70,
    when: (G) => IS_GY(G) && (G.currentYear === 1971 || G.currentYear === 1976) && G.age >= 15 && once(G, 'gy_nat'),
    text: (G) => G.currentYear === 1971
      ? 'Demba becomes Guybau. The bauxite company that built the town, ran the town, staffed the senior compound with Canadians and gave everyone else the rest of it, is the government\'s now, and there is a ceremony. The men who did the actual work at Mackenzie go in on Monday to the same machines. The signage changes very fast and the houses do not change at all.'
      : 'Bookers becomes Guysuco and the sugar belongs to the country. Your father says the words "belongs to the country" twice, once straight and once the other way, and does not explain the difference. Within two years the estate is paying later than Bookers paid and the estate hospital is worse than the estate hospital was, and neither of those facts makes the nationalisation wrong, and you will argue about this at funerals for thirty years.',
    context: 'Guyana nationalised the Demerara Bauxite Company in 1971 and Booker\'s sugar holdings in 1976, bringing about 80% of the economy under state control under the slogan "Feed, Clothe and House the Nation by 1976."',
    choices: null,
    effect: (p) => { p.setMem('gy_nat', true); p.e += 3; p.addFlag('nationalised_industry') },
  },

  {
    id: 'gy_rigged_ballot',
    phase: null,
    weight: 8,
    when: (G) => IS_GY(G) && G.currentYear >= 1968 && G.currentYear <= 1985 && G.age >= 18 && once(G, 'gy_rig'),
    text: 'The boxes go to the army to be counted. That is the whole thing, said plainly: the ballot boxes are driven away under guard by soldiers and counted somewhere you are not, and the overseas vote — from a diaspora larger than anyone can verify, including, it is said, the dead — comes in at the end and settles it. You still go. Your mother still goes. The queue outside the school is long and quiet and the quietness is people refusing to say out loud that they know.',
    context: 'Guyanese elections between 1968 and 1985 were widely documented as fraudulent, involving inflated overseas voter rolls, military control of ballot boxes, and padded registers. Observers estimated the overseas vote alone at figures exceeding the plausible diaspora.',
    choices: [
      {
        text: 'Go and vote anyway.',
        tag: 'defiant',
        outcome: 'You are counted in a total that is decided already. It is not nothing. Twenty-four years later you will be in a different queue and it will matter, and you will be glad you kept the habit.',
        effect: (p) => { p.setMem('gy_rig', true); p.karma += 4; p.addFlag('rigged_ballot'); p.addFlag('political_active') },
      },
      {
        text: 'Stop going. It is a performance and you will not be in it.',
        tag: 'defiant',
        outcome: 'You stay home on the day and feel exactly as powerless as you did the year you went. Both are true at once and neither cancels the other.',
        effect: (p) => { p.setMem('gy_rig', true); p.m -= 3; p.addFlag('rigged_ballot'); p.addFlag('political_disillusioned') },
      },
    ],
  },

  {
    id: 'gy_flour_ban',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear >= 1982 && G.currentYear <= 1989 && G.age >= 8 && once(G, 'gy_flour'),
    text: 'There is no bread. Wheat flour is banned — with split peas and sardines and potatoes and onions and garlic — on the argument that a country should eat what it grows, and the argument is not stupid and the execution is a hunger. Your mother learns to bake with rice flour, which does not behave, and then with cassava, and the result is eaten without comment. Down at the Corentyne, boats go across to Suriname in the dark and come back loaded, and the whole coast knows the word for it and uses it in front of children: backtrack.',
    context: 'From 1982 the Burnham government banned imports of wheat flour and a range of staples to force self-sufficiency. Shortages, queues and a large smuggling economy across the Corentyne River to Suriname followed. The bans were lifted in the late 1980s under the Economic Recovery Programme.',
    choices: [
      {
        text: 'Go across for flour and sell some of it on.',
        tag: 'defiant',
        outcome: 'The river at night, a boat with no light, and a profit that keeps the house going. You are a smuggler in the legal sense and a shopkeeper in every other sense.',
        effect: (p) => { p.setMem('gy_flour', true); p.mo += 900; p.h -= 3; p.addFlag('bread_ban_years'); p.addFlag('backtrack_trade') },
      },
      {
        text: 'Eat what the country grows.',
        tag: 'yielding',
        outcome: 'Cassava bread and rice flour and a great deal of plantain. You get thinner. You also learn to cook in a way that, forty years later, your grandchildren will ask you to teach them.',
        effect: (p) => { p.setMem('gy_flour', true); p.h -= 5; p.e += 2; p.addFlag('bread_ban_years') },
      },
    ],
  },

  {
    id: 'gy_rodney_1980',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1980 && G.age >= 14 && once(G, 'gy_rodney'),
    text: 'Walter Rodney is killed by a bomb in a walkie-talkie on the thirteenth of June. He was a historian — the book about how Europe underdeveloped Africa is in a lot of houses here — and the party he built was the first one since 1955 that Indians and Africans joined in the same numbers, which is the part that made him dangerous rather than the books. The device was given to him by a sergeant of the Defence Force who left the country immediately afterwards. The government says it has no information. Everybody in Guyana has the information.',
    context: 'Walter Rodney, historian and leader of the multiracial Working People\'s Alliance, was killed by a bomb concealed in a walkie-talkie on 13 June 1980. It was supplied by Gregory Smith, a Guyana Defence Force sergeant who left for French Guiana. A 2016 Commission of Inquiry found the Burnham government responsible.',
    choices: null,
    effect: (p) => { p.setMem('gy_rodney', true); p.m -= 6; p.e += 4; p.addFlag('rodney_killed') },
  },

  {
    id: 'gy_jonestown_1978',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1978 && G.age >= 10 && once(G, 'gy_jonestown'),
    text: 'Nine hundred and eighteen people die in the North West District in November and almost none of them are Guyanese. It was an American compound on land the government leased them, out in the bush where nobody went, and the first most of the country hears of it is the aircraft coming and going at Port Kaituma and then the world\'s press arriving in Georgetown in numbers the hotels cannot hold. For the rest of your life, when you are abroad and you say where you are from, a certain number of people will say one word back to you. It will be that word.',
    context: 'On 18 November 1978, 918 people died at the Peoples Temple settlement in Guyana\'s North West District, including US Congressman Leo Ryan and four others shot at Port Kaituma airstrip. Almost all of the dead were American. The settlement had been established on land leased from the Guyanese government in 1974.',
    choices: null,
    effect: (p) => { p.setMem('gy_jonestown', true); p.m -= 3; p.addFlag('jonestown_year') },
  },

  // ── THE INTERIOR ───────────────────────────────────────────────────────────

  {
    id: 'gy_mission_school',
    phase: 'childhood',
    weight: 30,
    when: (G) => IS_GY(G) && FIRST(G) && G.age >= 6 && G.age <= 12 && G.currentYear <= 1995 && once(G, 'gy_mission'),
    text: 'The mission takes you at six and the mission is four days from the village if the river is right. You sleep in a dormitory with children from three nations who do not share a language except the one being taught here, and the teaching is good, and the rule is English in the compound. You come back at Christmas and your grandmother asks you something in Wapishana and you understand every word of it and answer in English before you can stop yourself, and her face does a thing you will think about for sixty years.',
    context: 'Anglican and Catholic missions ran most interior schooling for Guyana\'s nine Amerindian nations — Warrau, Arawak, Carib, Wapishana, Macushi, Patamona, Akawaio, Arekuna and Wai-Wai — often boarding children far from home. English-only rules were standard.',
    choices: [
      {
        text: 'Hold onto the language. Speak it every holiday, deliberately.',
        tag: 'defiant',
        outcome: 'It costs effort that the other children do not spend. You keep it, and you are one of the ones who can still talk to the old people when they are the last ones left.',
        effect: (p) => { p.setMem('gy_mission', true); p.e += 3; p.m += 4; p.addFlag('mission_school'); p.addFlag('kept_language') },
      },
      {
        text: 'Take what the mission is offering and take it fully.',
        tag: 'yielding',
        outcome: 'You go further in school than anyone from the village has. The exchange is real and so is the price, and nobody explains the price at the time.',
        effect: (p) => { p.setMem('gy_mission', true); p.e += 7; p.r += 4; p.addFlag('mission_school'); p.addFlag('language_lost') },
      },
    ],
  },

  {
    id: 'gy_rupununi_1969',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1969 && (FIRST(G) || INTERIOR(G)) && G.age >= 10 && once(G, 'gy_rup69'),
    text: 'In January the ranchers and some of the Amerindian men in the savannah rise against the government, and it is over in a few days, and then the soldiers are in the Rupununi and they stay. Whatever the rising was actually about — the land, the ranch families, Venezuela, Georgetown deciding things about a place it had never visited — it ends with helicopters and with people going over the border to Brazil in vehicles loaded in an hour. The new thing is that the coast now knows the savannah exists. That turns out to cut both ways.',
    context: 'The Rupununi uprising of January 1969 was a short-lived revolt by ranchers and Amerindian allies against the Burnham government, suppressed within days. Several hundred people fled to Brazil and Venezuela. It left a permanent military presence in a region that had previously been almost entirely administered by itself.',
    choices: null,
    effect: (p) => { p.setMem('gy_rup69', true); p.m -= 4; p.addFlag('rupununi_uprising') },
  },

  {
    id: 'gy_porkknocker',
    phase: null,
    weight: 7,
    when: (G) => IS_GY(G) && G.age >= 17 && G.age <= 50 && G.stats.health >= 45 && once(G, 'gy_pork'),
    text: 'You go in to the bush for gold with four other men, a dredge, a shotgun and a barrel of salt pork, which is where the name comes from. The work is standing in a river moving mud through a sluice box for eleven hours. Out of four trips one pays, and the one that pays pays more than a year of anything else, which is precisely why every man you know has gone in at least twice and exactly why the camps are full of men in their fifties who have not stopped.',
    context: '"Porkknocker" is the Guyanese term for an independent small-scale gold and diamond prospector in the interior, in use since the nineteenth century, said to derive from the salt pork carried as camp rations.',
    choices: [
      {
        text: 'Go back in. The next one could be the one.',
        tag: 'defiant',
        outcome: 'Three more trips. One of them pays and you buy the house lot, and the malaria you pick up on the last one comes back for years afterwards whenever you get run down.',
        effect: (p) => { p.setMem('gy_pork', true); p.mo += 4500; p.h -= 8; p.addFlag('porkknocker'); p.addCondition('malaria', 'mild') },
      },
      {
        text: 'Come out and stay out.',
        tag: 'yielding',
        outcome: 'You keep the one small nugget in a tin and you do not go back. Two of the four men you went in with are still going in at fifty-eight.',
        effect: (p) => { p.setMem('gy_pork', true); p.mo += 400; p.m += 3; p.addFlag('porkknocker') },
      },
    ],
  },

  {
    id: 'gy_mercury_river',
    phase: null,
    weight: 6,
    when: (G) => IS_GY(G) && (FIRST(G) || INTERIOR(G)) && G.currentYear >= 1985 && G.age >= 20 && once(G, 'gy_merc'),
    text: 'The river came down brown this year and stayed brown. Upstream there are dredges working the bank and the mercury they use to hold the gold goes into the water and then into the fish, and the fish is what the village eats, every day, the way it has eaten it for as long as there has been a village. A woman comes from Georgetown with pamphlets and a meeting is held. Nobody at the meeting has another river.',
    context: 'Mercury amalgamation in Guyana\'s small-scale gold sector has contaminated interior waterways; studies since the 1990s have found elevated mercury in fish and in Amerindian communities dependent on them. Guyana signed the Minamata Convention in 2013.',
    choices: null,
    effect: (p) => { p.setMem('gy_merc', true); p.h -= 4; p.m -= 3; p.addFlag('mercury_river') },
  },

  // ── THE COAST AND THE WATER ────────────────────────────────────────────────

  {
    id: 'gy_seawall_koker',
    phase: null,
    weight: 8,
    when: (G) => IS_GY(G) && COAST(G) && G.age >= 7 && once(G, 'gy_seawall'),
    text: 'You walk on the seawall on a Sunday and the Atlantic is up there, above the road, above the houses, held back by a wall the Dutch started and everybody since has patched. At low tide the kokers open and the land drains out through them, and at high tide the kokers shut and the land waits. The whole coast is below the sea and this is simply a fact about where you live, like the heat. It is not frightening until one year it is.',
    context: 'Guyana\'s populated coastal strip, home to about 90% of the population, lies roughly 0.5–1 metre below high-tide sea level. It is protected by a sea defence system of Dutch origin and drained through sluice gates known as kokers.',
    choices: null,
    effect: (p) => { p.setMem('gy_seawall', true); p.m += 3; p.addFlag('seawall_coast') },
  },

  {
    id: 'gy_flood_2005',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && COAST(G) && G.currentYear === 2005 && once(G, 'gy_flood'),
    text: 'The conservancy goes over in January and the water comes onto the coast and does not leave for weeks. It is in the house to the height of the second step, then the fourth. Everything on the floor is gone, and the floor is where things were. Thirty-four people die and about a third of the country is in it, and the part nobody outside describes is the smell afterwards, and the fact that the water is not clean water, and the weeks of standing in it because there is nowhere else to stand.',
    context: 'In January 2005 the East Demerara Water Conservancy overtopped after extreme rainfall, flooding Guyana\'s coastal strip for several weeks. Thirty-four people died and an estimated 290,000 — around 37% of the population — were affected. Damage was put at about 60% of GDP.',
    choices: [
      {
        text: 'Stay in the house and wait it out upstairs.',
        tag: 'defiant',
        outcome: 'Three weeks on the upper floor with the water below you. Nothing is stolen, which is the thing you stayed for, and your legs carry sores for a month.',
        effect: (p) => { p.setMem('gy_flood', true); p.h -= 8; p.m -= 4; p.addFlag('great_flood_2005') },
      },
      {
        text: 'Get the family to the school on the higher ground.',
        tag: 'yielding',
        outcome: 'Four hundred people in a school. You come back to a house that has to be emptied entirely, and the neighbours who stayed do not say anything about it, which is its own kind of saying something.',
        effect: (p) => { p.setMem('gy_flood', true); p.m -= 6; p.wipeMoney(0.25); p.addFlag('great_flood_2005') },
      },
    ],
  },

  // ── WHAT THE COUNTRY IS WHEN IT IS NOT POLITICS ────────────────────────────

  {
    id: 'gy_bourda_test',
    phase: null,
    weight: 7,
    when: (G) => IS_GY(G) && G.currentYear >= 1950 && G.currentYear <= 2005 && G.age >= 8 && once(G, 'gy_bourda'),
    text: 'Test cricket at Bourda, which is the only Test ground in the world below sea level, and the stand is a wooden thing that moves when the crowd moves. Kanhai is from Port Mourant, which is a sugar estate, and Lloyd is from Georgetown, and both of them are out there in the same maroon cap with men from Barbados and Trinidad and Jamaica, and for five days the question of who your grandparents were does not come up once. It is the only institution in the region that manages this. The rum in the stand is not helping and it is not hurting.',
    context: 'Bourda, the Georgetown Cricket Club ground, hosted Tests from 1930 to 2005 and sat below sea level. Guyana supplied the West Indies with Rohan Kanhai, Clive Lloyd, Lance Gibbs, Alvin Kallicharran, Roy Fredericks, Carl Hooper and Shivnarine Chanderpaul — from both of the country\'s major communities.',
    choices: null,
    effect: (p) => { p.setMem('gy_bourda', true); p.m += 6; p.s += 2; p.addFlag('bourda_cricket') },
  },

  {
    id: 'gy_phagwah_street',
    phase: null,
    weight: 6,
    when: (G) => IS_GY(G) && G.age >= 5 && G.age <= 60 && once(G, 'gy_phagwah'),
    text: 'Phagwah is in the road, not in the yard. The abeer goes on anybody within range and within range means the street, and by eleven in the morning the Christian boys from the next lot are as purple as anyone and are throwing with commitment. Diwali the motorcade goes through Georgetown with the floats lit up, and at Christmas there is pepperpot and black cake in houses that are not Christian either. This country has public holidays for all three and treats every one of them as a general invitation.',
    choices: null,
    effect: (p) => { p.setMem('gy_phagwah', true); p.m += 5; p.s += 3; p.addFlag('phagwah_street') },
  },

  {
    id: 'gy_bottom_house',
    phase: null,
    weight: 6,
    when: (G) => IS_GY(G) && G.age >= 6 && once(G, 'gy_bottom'),
    text: 'The house is up on stilts because of the water, so underneath it there is a shaded concrete space with the washing line and a bench and the stack of things nobody will throw out, and that is where the life of the house actually happens. Homework at the table down there. The domino game that runs from four until the mosquitoes. Somebody plaiting somebody\'s hair. The rooms upstairs are for sleeping and for the good chairs that nobody sits in.',
    choices: null,
    effect: (p) => { p.setMem('gy_bottom', true); p.m += 4; p.addFlag('bottom_house') },
  },

  // ── LEAVING ────────────────────────────────────────────────────────────────

  {
    id: 'gy_the_barrel',
    phase: null,
    weight: 8,
    when: (G) => IS_GY(G) && G.currentYear >= 1975 && G.age >= 5 && G.age <= 40 && once(G, 'gy_barrel'),
    text: 'The barrel comes from Brooklyn and is opened in the bottom house with everybody present, because opening it is an event. Corned beef, a Kmart bag of clothes in sizes somebody guessed at, school shoes, powdered milk, a radio, sweets in wrappers that are not the wrappers here. Your aunt sent it. Your aunt has sent one every year for eleven years and has been home twice. The barrel is the most reliable income in this house and it has a person on the other end of it who is tired.',
    context: 'Remittances and shipped barrels of goods from the Guyanese diaspora — heavily concentrated in New York, Toronto and London — became a central part of household economies from the 1970s onward. Guyana has one of the highest emigration rates in the world; by some estimates more Guyanese live abroad than in the country.',
    choices: null,
    effect: (p) => { p.setMem('gy_barrel', true); p.mo += 350; p.m += 2; p.addFlag('barrel_from_abroad') },
  },

  {
    id: 'gy_leaving',
    phase: null,
    weight: 12,
    when: (G) => IS_GY(G) && G.currentYear >= 1976 && G.currentYear <= 2005 && G.age >= 19 && G.age <= 45 &&
      !G.flags.includes('emigrated') && once(G, 'gy_leave'),
    text: 'Everyone goes. That is not a complaint or a statistic, it is the observable fact of the street: the Ramsammys went, the house on the corner has one old woman in it, your own class of thirty-one has eleven left in the country. The sponsorship is there if you want it — a sister in Queens, a cousin in Scarborough — and what is here is a wage that does not survive the month and a queue for kerosene. Nobody who leaves is judged for leaving. Everybody who stays is asked, kindly, what they are still doing here.',
    choices: [
      {
        text: 'Take the sponsorship. Liberty Avenue.',
        tag: 'yielding',
        outcome: 'Richmond Hill: roti shops, the number 7 mandir, Guyanese voices in the supermarket, and a winter that takes three years to stop being a shock. You send a barrel home every year without once being asked to.',
        effect: (p) => { p.setMem('gy_leave', true); p.emigrateTo('United States', { residency: 'permanent_resident' }); p.mo += 1200; p.m += 3; p.addFlag('guyanese_diaspora') },
      },
      {
        text: 'Take the one to Toronto instead. There is more family there.',
        tag: 'yielding',
        outcome: 'Scarborough, and a job below what you trained for, and a community large enough that you can go a whole Saturday without speaking to anybody who is not from home.',
        effect: (p) => { p.setMem('gy_leave', true); p.emigrateTo('Canada', { residency: 'permanent_resident' }); p.mo += 1100; p.m += 3; p.addFlag('guyanese_diaspora') },
      },
      {
        text: 'Stay. Somebody has to be here when it turns.',
        tag: 'defiant',
        outcome: 'You stay, and it does turn, eventually, and by then the people who would have celebrated it with you are in three other countries. You were right. It cost you most of a generation of friends.',
        effect: (p) => { p.setMem('gy_leave', true); p.m += 2; p.karma += 6; p.addFlag('stayed_to_build'); p.addFlag('guyana_stayer') },
      },
    ],
  },

  {
    id: 'gy_house_with_one_person',
    phase: null,
    weight: 7,
    when: (G) => IS_GY(G) && G.currentYear >= 1988 && G.age >= 35 && once(G, 'gy_empty_street'),
    text: 'Four houses on this street have one person in them and that person is over seventy. The children built the houses with money sent from away and the houses are fine, painted, fenced, and nobody is in them, and a man comes once a fortnight to cut the yard so it does not look abandoned. The old woman at the corner has a telephone that rings on Sundays at a time agreed years ago. When she dies the house will stand exactly as it is for a long time, because selling it would require everybody to agree, and everybody is in four time zones.',
    choices: null,
    effect: (p) => { p.setMem('gy_empty_street', true); p.m -= 3; p.addFlag('emptied_village') },
  },

  // ── AFTER ──────────────────────────────────────────────────────────────────

  {
    id: 'gy_1992_election',
    phase: null,
    weight: 999,
    when: (G) => IS_GY(G) && G.currentYear === 1992 && G.age >= 16 && once(G, 'gy_1992'),
    text: 'The fifth of October, and the boxes are not going anywhere near the army. There are observers from outside with clipboards and Jimmy Carter is in the country, and the queue outside the school starts before it is light and does not thin until dark, and the quietness in it is a different quietness than 1980 — not people refusing to say what they know, but people not wanting to jinx it. Jagan wins. He is seventy-four and he has been waiting twenty-eight years. Whatever you think of him, and half this country thinks the other thing, that is a long time to be right about one fact.',
    context: 'The 5 October 1992 election, monitored by the Carter Center, was Guyana\'s first internationally certified free and fair vote since 1964. Cheddi Jagan, removed from office in 1964, won and became President. He died in office in March 1997.',
    choices: null,
    effect: (p) => { p.setMem('gy_1992', true); p.m += 8; p.addFlag('free_election_1992'); p.addFlag('political_active') },
  },

  {
    id: 'gy_oil_2015',
    phase: null,
    weight: 90,
    when: (G) => IS_GY(G) && G.currentYear >= 2015 && G.currentYear <= 2024 && G.age >= 15 && once(G, 'gy_oil'),
    text: 'They find oil offshore and then they find more, and within a few years the country has the fastest-growing economy on earth, which is a sentence read out on the news in a house where the current still goes at seven. There are new hotels on the East Bank and a great many Texan accents at the airport and the price of a house lot in Georgetown has done something violent. The terms of the contract are printed in the newspaper and argued about by everybody, including people who have never argued about a contract before. So far the wealth is a number. Numbers do eventually become things. This one has not yet.',
    context: 'ExxonMobil confirmed a major offshore discovery in Guyana\'s Stabroek Block in May 2015; first oil was produced in December 2019. Guyana recorded the world\'s fastest GDP growth for several years running, including about 62% in 2022. The production-sharing agreement — a 2% royalty and generous cost-recovery terms — remains politically contested.',
    choices: null,
    effect: (p) => { p.setMem('gy_oil', true); p.e += 3; p.addFlag('oil_found_2015') },
  },

  {
    id: 'gy_essequibo_map',
    phase: null,
    weight: 8,
    when: (G) => IS_GY(G) && G.age >= 9 && once(G, 'gy_essequibo'),
    text: 'The map on the classroom wall has the whole country on it and then a line down it, and the teacher explains that Venezuela says everything west of that line is theirs, which is about two thirds of where you are standing. You learn the year 1899 and the word arbitration before you learn most things. Every Guyanese child learns this map. It comes back, loudly, about every twenty years, and each time it does your grandmother says the same sentence about how they were quiet enough about it when there was nothing out there.',
    context: 'Venezuela claims the Essequibo region — roughly two-thirds of Guyana\'s territory — rejecting the 1899 arbitral award that fixed the border. The dispute, managed under the 1966 Geneva Agreement, escalated sharply after the 2015 offshore oil discoveries, with a Venezuelan referendum and troop movements in late 2023.',
    choices: null,
    effect: (p) => { p.setMem('gy_essequibo', true); p.e += 2; p.addFlag('essequibo_claim') },
  },

]

// ── FOLLOW-THROUGH ───────────────────────────────────────────────────────────
//
// Every major flag above becomes something later. Written before the triggering
// events were finished, per the rule.

export const GUYANA_FOLLOWTHROUGH = [

  {
    id: 'gy_ft_enmore_name',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('enmore_martyrs') && G.age >= 45 && G.currentYear >= 1975 && once(G, 'gy_ft_enmore'),
    text: 'There is a monument at Enmore now, five figures, and school parties are brought to it. A child asks you if you knew them and the honest answer is no, you did not know them, you were in the road behind them, and the child cannot tell the difference and does not need to. You find you can still say the five names in order. You have never once had to practise.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_enmore', true); p.m += 4; p.addFlag('carries_enmore') },
  },

  {
    id: 'gy_ft_displaced_house',
    phase: null,
    weight: 30,
    when: (G) => G.flags.includes('displaced_1964') && G.age >= 50 && G.currentYear >= 1990 && once(G, 'gy_ft_displaced'),
    text: 'You go back to the village for a funeral and the road takes you past it without asking. Somebody has extended it at the side and painted it a colour nobody would have chosen in 1964, and there are children in the yard who belong to whoever lives there now. You do not stop the car. You had been expecting to feel something enormous and what you feel is a small tired accuracy: that was the house, this is the road, that took thirty years to be only a house.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_displaced', true); p.m += 3; p.r -= 3; p.addFlag('returned_to_the_village') },
  },

  {
    id: 'gy_ft_rodney_inquiry',
    phase: null,
    weight: 25,
    when: (G) => G.flags.includes('rodney_killed') && G.currentYear >= 2016 && once(G, 'gy_ft_rodney'),
    text: 'The commission reports in 2016 and says what everybody has said since the week it happened: the state did it. Thirty-six years. Your own copy of the book has your handwriting in the margins from when you were twenty-four and it is handwriting you no longer recognise as yours. Nobody is charged. The finding is still worth having, and you cannot entirely explain why to the young people, who think a finding without a charge is nothing.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_rodney', true); p.m += 2; p.e += 3; p.addFlag('rodney_inquiry_lived_to_see') },
  },

  {
    id: 'gy_ft_bread',
    phase: null,
    weight: 8,
    when: (G) => G.flags.includes('bread_ban_years') && G.currentYear >= 1993 && G.age >= 25 && once(G, 'gy_ft_bread'),
    text: 'There is bread in the shop. There has been bread in the shop for some years now and you still, without deciding to, buy two. Your daughter, who was four in 1984 and remembers nothing, laughs at you for it every single time, and you laugh too, and you still buy two. Some things the body settled a long time ago and is not reopening.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_bread', true); p.m += 4; p.addFlag('shortage_habits') },
  },

  {
    id: 'gy_ft_diaspora_return',
    phase: null,
    weight: 9,
    when: (G) => G.flags.includes('guyanese_diaspora') && !IS_GY(G) && G.age >= 50 && once(G, 'gy_ft_return'),
    text: 'You go back for three weeks after a long time away. The heat is not a memory of heat, it is the heat. People call you by a nickname nobody has used in thirty years and also, without any malice in it, they call you a foreigner — the accent went, or half of it did, and you are paying the price a visitor pays for a taxi. The house is smaller than the house. Both of those are permanently true now and you carry both back with you.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_return', true); p.m += 5; p.r += 2; p.addFlag('returned_as_visitor') },
  },

  {
    id: 'gy_ft_stayer_vindicated',
    phase: null,
    weight: 25,
    when: (G) => G.flags.includes('guyana_stayer') && G.currentYear >= 2019 && G.age >= 45 && once(G, 'gy_ft_stayer'),
    text: 'The ones who left are coming back for two weeks at a time to look at land. They say the word "opportunity" the way people say it when they have been reading about a place rather than living in it, and they ask you questions about it, and you are the one who knows the answers because you were here for the part that was not an opportunity. You are not smug about this. You are extremely close to smug about this.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_stayer', true); p.m += 6; p.s += 2; p.addFlag('stayer_vindicated') },
  },

  {
    id: 'gy_ft_flood_ground_floor',
    phase: null,
    weight: 20,
    when: (G) => G.flags.includes('great_flood_2005') && G.currentYear >= 2010 && once(G, 'gy_ft_flood'),
    text: 'Nothing of value lives below waist height in this house any more and it never will again. The photographs are upstairs. The documents are upstairs in a plastic box with a lid that clips. When it rains hard at night you wake up and listen to the gutter for a while before you go back to sleep, and so does everyone on this coast, and none of you mention it to each other.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_flood', true); p.m -= 2; p.addFlag('flood_wary') },
  },

  {
    id: 'gy_ft_mission_language',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('language_lost') && G.age >= 45 && once(G, 'gy_ft_lang'),
    text: 'The last fluent speakers in the village are four people and they are all over eighty. A young woman comes with a recorder to write the language down properly and she asks you, because you went to school, whether you can help with the spelling. You can hear it perfectly. You can hear every word of it and the mouth will not make it. You sit in the recording as the person who understands and cannot answer, and that is the exact shape of the thing they did to you at six years old, made audible on tape.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_lang', true); p.m -= 5; p.r += 6; p.addFlag('language_loss_reckoning') },
  },

  {
    id: 'gy_ft_oil_arrives_or_not',
    phase: null,
    weight: 8,
    when: (G) => G.flags.includes('oil_found_2015') && IS_GY(G) && G.currentYear >= 2023 && once(G, 'gy_ft_oil'),
    text: (G) => G.money > 12000
      ? 'It reached you. Not directly — nobody handed you an oil cheque — but the contract you got was because of the building that went up because of it, and the money is real and it is in the house. You are careful about saying so in front of people it did not reach, which is most people, and the care you take about that is itself new.'
      : 'It has not reached this house. The economy grew sixty-two per cent in one year, which was on the radio, and the current still goes, and the price of everything in the market has moved and the wage has not. Somebody is having the boom. You have the sentence about the boom.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_oil', true); p.addFlag('oil_boom_lived_through') },
  },

  {
    id: 'gy_ft_porkknocker_body',
    phase: null,
    weight: 20,
    when: (G) => G.flags.includes('porkknocker') && G.age >= 58 && once(G, 'gy_ft_pork'),
    text: 'The malaria comes back when you get run down, which is a sentence you have said so often that your wife says it for you now. The knees are from the river. You still know, from across a room, what a man who has been in the bush looks like — something about the forearms and something about how he sits — and you have never been wrong about it yet.',
    choices: null,
    effect: (p) => { p.setMem('gy_ft_pork', true); p.h -= 3; p.m += 2; p.addFlag('bush_body') },
  },

]

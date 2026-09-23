// events_nigeria_midcentury.js — the decades the touchstone life actually lives.
//
// CLAUDE.md's Vision opens by naming one specific character: "a player who runs
// a character born in 1962 in Nigeria should come away understanding what that
// life was actually like". `npm run check-reach` measured that exact life
// against Nigeria's own depth module and got **20%, three of thirteen events**.
// The same module measured against a Nigerian born in 1995 gets 70% and twelve
// of thirteen.
//
// Nothing is broken. The module is simply written for a later cohort: five of
// its thirteen events require `currentYear >= 2030`, and a 1962 Nigerian would
// be sixty-eight then, against a national life expectancy of 54. Solar after
// NEPA, the last cash, Lagos at thirty million, the japa children visiting —
// all correct, all for somebody born thirty years after the person the design
// document is about.
//
// So this is 1967 to 1999, which for that character is ages five to
// thirty-seven: a childhood inside a war, a boom that arrived as money and left
// as nothing, two decades of soldiers, and the year it stopped.
//
// The Biafra events are the reason this module exists. Between one and three
// million people died, most of them children, most of them of starvation under
// a blockade — and the corpus contained one Nigerian event about it, written
// from the point of view of a colleague afterwards. A 1962-born Igbo child was
// five when it started and eight when it ended. That is not background.
//
// It is written without the arithmetic of blame, which the country itself
// settled on in 1970 with three words it has been arguing about ever since. A
// Hausa child in Kano in 1966 saw something too, and a Yoruba family in Lagos
// spent the war being told it was not theirs.
//
// Dates used, all checked. January 1966 coup; the counter-coup and the killings
// of Igbo in the north that September and October; Biafra declares 30 May 1967
// and surrenders 15 January 1970, and Gowon's broadcast is "no victor, no
// vanquished". The £20 rule — any Biafran bank account, whatever its balance,
// exchanged for twenty Nigerian pounds — follows. Udoji reports in 1974 and the
// awards are paid with arrears. The cement armada is 1975: hundreds of ships
// anchored off Lagos with cement the port cannot land. FESTAC runs 15 January
// to 12 February 1977. Murtala Mohammed is assassinated 13 February 1976.
// Nigeria expels an estimated two million West Africans from January 1983, and
// the bag is still called a Ghana-Must-Go. Buhari takes power 31 December 1983;
// the War Against Indiscipline launches March 1984. The Andrew "checking out"
// advert runs from 1984. Babangida takes power August 1985 and SAP begins
// July 1986; the naira goes from parity with the dollar to roughly 4 by 1987,
// 22 by 1993, 85 by 1999. June 12 1993 is annulled; Abacha takes power that
// November. Ken Saro-Wiwa and the other eight Ogoni are hanged 10 November
// 1995 and Nigeria is suspended from the Commonwealth the next day. Abacha
// dies 8 June 1998. Obasanjo is sworn in 29 May 1999.

const NG = 'Nigeria'
const IS_NG = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === NG

const IGBO = (G) => G.character?.ethnicity === 'igbo'
const HAUSA = (G) => G.character?.ethnicity === 'hausa_fulani'
const YORUBA = (G) => G.character?.ethnicity === 'yoruba'

const EAST = (G) => IGBO(G) || G.character?.ethnicity === 'ijaw'
const NORTH = (G) => HAUSA(G) || G.character?.ethnicity === 'kanuri'

const LAGOS = (G) => G.place?.id === 'ng_lagos'
const once = (G, key) => !G.mem?.[key]

export const NIGERIA_MIDCENTURY_EVENTS = [

  // ── THE WAR ────────────────────────────────────────────────────────────────

  {
    id: 'ngm_1966_north',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear === 1966 && G.age >= 4 && (IGBO(G) || NORTH(G)) && once(G, 'ngm_66'),
    text: (G) => IGBO(G)
      ? 'In September the trains start arriving at Enugu and Port Harcourt with people on them who left everything. Your uncle had a shop in Kano for eleven years and comes back with a bag. Nobody uses a number for how many were killed in the north because nobody counted, and the numbers people do use are far apart and all enormous. The adults stop speaking when you come into the room, which is how you learn that this is different from the other things.'
      : 'They go in September, in a hurry, and the street is a different street afterwards. The man who repaired the radios has gone. The two families at the end have gone. Your father, who traded with them for years, is quiet for a week and then says one sentence at the table about what was done and who did it, and it is not a sentence you are allowed to repeat outside.',
    context: 'After the January 1966 coup and the July counter-coup, massacres of Igbo civilians in northern Nigeria in September and October 1966 killed an estimated 8,000 to 30,000 people and drove more than a million eastward. The exodus is the immediate cause of the Eastern Region\'s secession the following May.',
    choices: null,
    effect: (p) => { p.setMem('ngm_66', true); p.m -= 8; p.addFlag('nigeria_1966') },
  },

  {
    id: 'ngm_biafra_child',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && EAST(G) && G.currentYear >= 1968 && G.currentYear <= 1970 && G.age >= 4 && G.age <= 16 && once(G, 'ngm_biafra'),
    text: 'The word at the clinic is kwashiorkor and you learn it the way you learn any word, by hearing it about somebody. The hair goes a different colour. The stomach goes out and the arms do not. There is a powdered milk that comes in on the night planes and a queue for it, and a song about the planes that the children sing without being told to. You are given the food first, before the adults, every time, and you are old enough to have noticed that this is a rule and not old enough to ask why.',
    context: 'The Nigerian blockade of Biafra from 1967 caused mass starvation; estimates of civilian deaths run from 500,000 to over two million, overwhelmingly children, mostly from protein deficiency. Nightly relief flights into Uli airstrip, run by church and Red Cross organisations, were for a period the busiest air operation in Africa. The images of Biafran children reshaped international humanitarian practice and led directly to the founding of Médecins Sans Frontières.',
    choices: null,
    effect: (p) => { p.setMem('ngm_biafra', true); p.h -= 12; p.m -= 12; p.addFlag('biafra_child'); p.addCondition('chronic_pain', 'mild') },
  },

  {
    id: 'ngm_biafra_lagos',
    phase: null,
    weight: 400,
    when: (G) => IS_NG(G) && !EAST(G) && G.currentYear >= 1968 && G.currentYear <= 1970 && G.age >= 8 && once(G, 'ngm_biafra_far'),
    text: 'The war is a thing on the radio and in the newspapers and it is happening about four hundred miles away, and life here does not stop. There is a levy at work. There are soldiers at the bridge who were not there before. A boy two years above you leaves school to enlist and is written about afterwards in the assembly. On the front page of a foreign magazine somebody has left on a bench there is a photograph of a child with the wrong-shaped stomach, and the caption is about your country, and you look at it for a while and then put it back.',
    choices: null,
    effect: (p) => { p.setMem('ngm_biafra_far', true); p.m -= 4; p.e += 2; p.addFlag('biafra_distant') },
  },

  {
    id: 'ngm_no_victor',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear === 1970 && G.age >= 5 && once(G, 'ngm_1970'),
    text: (G) => EAST(G)
      ? 'It ends in January and the broadcast says no victor, no vanquished. Then the bank accounts are settled: whatever was in a Biafran account — a lifetime, a business, a house sold before the war — is exchanged for twenty pounds. Twenty pounds each, for everybody, the same. A man on your road who had four lorries gets twenty pounds and a man who had nothing gets twenty pounds, and the government calls this a fresh start, and the phrase "no victor, no vanquished" is going to be said at you, kindly, for fifty years.'
      : 'It ends in January and the broadcast says no victor, no vanquished, and people repeat it, and mostly they mean it. Reconstruction, rehabilitation, reconciliation — three words on the radio. Nobody is tried. Nobody is counted. The country puts it away with a completeness that will strike you as strange only much later, when you meet somebody from the east of your own age and find that they have not put it away at all.',
    context: 'Biafra surrendered on 15 January 1970. Yakubu Gowon\'s "no victor, no vanquished" policy avoided trials or reparations. The abandoned-property and £20 currency measures — under which any pre-war Biafran bank balance was exchanged for a flat twenty Nigerian pounds — are widely regarded as having wiped out Igbo capital and are still cited in Nigerian politics.',
    choices: null,
    effect: (p) => { p.setMem('ngm_1970', true); p.e += 3; p.addFlag('no_victor_no_vanquished') },
  },

  // ── THE BOOM ───────────────────────────────────────────────────────────────

  {
    id: 'ngm_udoji',
    phase: null,
    weight: 500,
    when: (G) => IS_NG(G) && G.currentYear >= 1974 && G.currentYear <= 1976 && G.age >= 14 && once(G, 'ngm_udoji'),
    text: 'The Udoji award comes with arrears, which means the money arrives in one piece, and the country spends it in about the same way a country would. Everybody buys something. The word for what happens to the prices afterwards is not a word anybody here has needed before. Your father buys a radiogram and a second-hand Peugeot 504 and for one year you are a family with a car, and everyone on the street is also a family with something, and none of it is wrong exactly, and by 1977 the price of everything has met the money halfway and settled above it.',
    context: 'The 1974 Udoji Commission awarded large public-sector pay rises backdated with arrears, injecting a lump sum into the economy at the peak of the oil boom. It is generally blamed for the inflation that followed and remembered as the moment Nigeria learned what an oil windfall does to prices.',
    choices: null,
    effect: (p) => { p.setMem('ngm_udoji', true); p.mo += 900; p.m += 6; p.addFlag('oil_boom_windfall') },
  },

  {
    id: 'ngm_cement_armada',
    phase: null,
    weight: 300,
    when: (G) => IS_NG(G) && G.currentYear >= 1975 && G.currentYear <= 1977 && G.age >= 12 && (LAGOS(G) || Math.random() < 0.4) && once(G, 'ngm_cement'),
    text: 'There are four hundred ships off Lagos and they are all full of cement. Somebody in a ministry ordered twenty million tonnes for a country that could land about one, and the ships sit at anchor for the better part of a year on demurrage, and the cement in a good number of them sets solid in the holds. You can see them from the bar beach, a line of them out on the water, and by the second month nobody in the city remarks on it. That is the thing about that decade. There was so much money that a mistake this size was a story rather than a scandal.',
    context: 'The 1975 cement armada: Nigerian ministries ordered some 20 million tonnes of cement against Lagos port capacity of roughly one million, leaving hundreds of ships waiting months at demurrage, much of the cargo hardening in the holds. It became the standing example of oil-boom procurement.',
    choices: null,
    effect: (p) => { p.setMem('ngm_cement', true); p.e += 3; p.addFlag('cement_armada') },
  },

  {
    id: 'ngm_festac',
    phase: null,
    weight: 400,
    when: (G) => IS_NG(G) && G.currentYear === 1977 && G.age >= 8 && once(G, 'ngm_festac'),
    text: 'FESTAC is a month long and the whole Black world comes to Lagos for it — Stevie Wonder, Gilberto Gil, dancers from Brazil and Jamaica and everywhere the ships went. They build a village to house them all and a national theatre shaped like a military cap. The mask on the posters is an ivory one the British took in 1897 and would not lend back, so the country commissions a copy and puts the copy on everything. For four weeks this is the capital of something. Your mother keeps the commemorative cloth and it is still in the house in 2004.',
    context: 'FESTAC \'77, the Second World Black and African Festival of Arts and Culture, ran in Lagos from 15 January to 12 February 1977 with some 17,000 participants from 56 nations. Its emblem was the 16th-century Benin ivory mask of Idia, looted in 1897; the British Museum declined to lend it, and a replica was used.',
    choices: null,
    effect: (p) => { p.setMem('ngm_festac', true); p.m += 8; p.s += 3; p.addFlag('festac_77') },
  },

  // ── THE TURN ───────────────────────────────────────────────────────────────

  {
    id: 'ngm_ghana_must_go',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear === 1983 && G.age >= 10 && once(G, 'ngm_gmg'),
    text: 'In January the government gives the aliens two weeks. About two million people go, most of them Ghanaians, most of them here because Ghana collapsed and Nigeria had oil, and now the oil price has fallen and this is the answer. They go with what fits in a cheap checked plastic bag, and West Africa names the bag after them, and the name sticks so hard that forty years later a Nigerian child packing for boarding school is given a Ghana-Must-Go without anybody remembering why. The man who sold bread at the junction was one of them. Your mother asks after him twice and then stops.',
    context: 'In January 1983 Nigeria ordered an estimated two million undocumented West Africans, predominantly Ghanaians, to leave within two weeks, as the oil price collapse ended the boom. The woven plastic bag they carried has been called a "Ghana Must Go" across West Africa ever since.',
    choices: null,
    effect: (p) => { p.setMem('ngm_gmg', true); p.m -= 4; p.e += 2; p.addFlag('ghana_must_go') },
  },

  {
    id: 'ngm_war_against_indiscipline',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear >= 1984 && G.currentYear <= 1985 && G.age >= 12 && once(G, 'ngm_wai'),
    text: 'The soldiers are at the bus stop with whips and the rule is that you queue. People do queue. The rule about being late to work involves frog-jumping in the car park in front of everybody, and civil servants in their forties do it, and some of them are the ones who were taking the bribes and most of them are not. There is a jingle. The astonishing thing, which nobody who was not there believes afterwards, is how many people were in favour — including your mother, who had spent eleven years watching the other way of doing it.',
    context: 'The War Against Indiscipline, launched March 1984 under Muhammadu Buhari, enforced queuing, punctuality and public order with soldiers, public humiliation and detention. It was widely popular with a public exhausted by the corruption of the Second Republic, and is also remembered for the detention of journalists under Decree 4.',
    choices: [
      {
        text: 'Queue. Somebody finally made it mean something.',
        tag: 'yielding',
        outcome: 'For about eighteen months this country has queues and clean gutters and buses that go when they say. You will spend the rest of your life being unable to explain to your children why you did not mind the whip.',
        effect: (p) => { p.setMem('ngm_wai', true); p.m += 3; p.addFlag('war_against_indiscipline'); p.addFlag('order_over_freedom') },
      },
      {
        text: 'A whip is a whip. Say so, quietly, to the people who will hear it.',
        tag: 'defiant',
        outcome: 'Your uncle tells you to keep your voice down and he is right. Decree 4 has already put two journalists inside for a story that was true.',
        effect: (p) => { p.setMem('ngm_wai', true); p.e += 4; p.addFlag('war_against_indiscipline'); p.addFlag('political_disillusioned') },
      },
    ],
  },

  {
    id: 'ngm_andrew_checking_out',
    phase: null,
    weight: 400,
    when: (G) => IS_NG(G) && G.currentYear >= 1984 && G.currentYear <= 1990 && G.age >= 16 && once(G, 'ngm_andrew'),
    text: 'The government makes an advert about a man called Andrew who is checking out — going to America, fed up, no light, no water — and a voice talks him out of it. The advert is meant to shame people into staying. What happens instead is that the whole country takes the phrase and uses it, cheerfully, for the next forty years, about everybody who goes. Andrew is checking out. Four of the six people you sat the school certificate with are Andrew by 1991.',
    context: 'The "Andrew, you\'re checking out?" public information film, produced under Babangida in the mid-1980s to discourage emigration, instead gave Nigerian English its verb for leaving. It is the direct ancestor of the modern "japa".',
    choices: null,
    effect: (p) => { p.setMem('ngm_andrew', true); p.e += 2; p.addFlag('andrew_checking_out') },
  },

  {
    id: 'ngm_sap',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear >= 1986 && G.currentYear <= 1993 && G.age >= 18 && once(G, 'ngm_sap'),
    text: 'The naira was one to the dollar. That is not nostalgia, it is a fact about 1985, and by the end of the decade it is four and by the time you stop counting it is twenty. Your salary does not move. What moves is everything the salary buys, and the arithmetic you do at the end of the month stops being arithmetic and becomes a decision about which of two things the household does without. The word is adjustment. It is explained on the radio by people whose salaries are paid in something else.',
    context: 'The Structural Adjustment Programme began in July 1986 under Babangida: currency devaluation, subsidy removal, trade liberalisation and public-sector retrenchment, on IMF and World Bank lines. The naira moved from rough parity with the dollar in 1985 to around 4 by 1987 and 22 by 1993. Real wages and the Nigerian middle class both collapsed over the period.',
    choices: [
      {
        text: 'Take a second thing. Everybody is taking a second thing.',
        tag: 'defiant',
        outcome: 'You trade on the side, or teach, or run something out of the house. It works, which is to say the household eats. You do not have an evening any more and you will not have one again for eleven years.',
        effect: (p) => { p.setMem('ngm_sap', true); p.mo += 500; p.h -= 6; p.m -= 3; p.addFlag('sap_generation'); p.addFlag('second_income') },
      },
      {
        text: 'Hold the job and hold on. It has to turn.',
        tag: 'yielding',
        outcome: 'It does not turn. You are doing the same work in 1993 for a fifth of what it bought in 1985, and the people who left in 1987 are sending money to their parents on your street.',
        effect: (p) => { p.setMem('ngm_sap', true); p.m -= 7; p.wipeMoney(0.4); p.addFlag('sap_generation'); p.addFlag('wages_evaporated') },
      },
    ],
  },

  {
    id: 'ngm_asuu',
    phase: null,
    weight: 400,
    when: (G) => IS_NG(G) && G.currentYear >= 1988 && G.currentYear <= 2005 && G.age >= 17 && G.age <= 50 && once(G, 'ngm_asuu'),
    text: (G) => G.age <= 30
      ? 'The university is closed again. Not for a week — for five months, then it reopens, then it closes. A four-year degree is taking seven and everybody in your year has aged out of something while waiting: a scholarship, a job advert, a relationship that did not survive two unscheduled years at home. The lecturers are right about the funding. Being right about the funding does not give anybody back the two years.'
      : 'Your daughter has been at university for five years of a four-year degree and is at home again, and the strike is about salaries that have not been paid since March, and the lecturers are right. You have been on the other side of a strike yourself. You find you cannot hold both of those things at once in front of her, so you say nothing and put the fees together again.',
    context: 'Academic Staff Union of Universities strikes have closed Nigerian federal universities repeatedly since 1988, several times for six months or more, over funding and unpaid salaries. Four-year degrees routinely take six or seven years.',
    choices: null,
    effect: (p) => { p.setMem('ngm_asuu', true); p.m -= 5; p.addFlag('asuu_strike_generation') },
  },

  // ── THE SOLDIERS ───────────────────────────────────────────────────────────

  {
    id: 'ngm_fuel_queue',
    phase: null,
    weight: 500,
    when: (G) => IS_NG(G) && G.currentYear >= 1993 && G.currentYear <= 1999 && G.age >= 16 && once(G, 'ngm_fuel'),
    text: 'You sleep in the car in the queue, which is a thing hundreds of thousands of people in this country do routinely in the 1990s, in the sixth largest oil producer on earth. The refineries do not work. The crude goes out and the petrol comes back in, imported, and somewhere in that circle a small number of people have become very rich. There is a man selling it in jerry cans at four times the pump price twenty yards from the pump, and everyone knows exactly how he got it, and the queue is still the queue.',
    context: 'Despite being Africa\'s largest oil producer, Nigeria\'s state refineries operated far below capacity through the 1990s and the country imported most of its refined fuel. Chronic scarcity, week-long queues and a large black market were routine under the Abacha government.',
    choices: null,
    effect: (p) => { p.setMem('ngm_fuel', true); p.m -= 4; p.h -= 2; p.addFlag('fuel_queue_years') },
  },

  {
    id: 'ngm_saro_wiwa',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear === 1995 && G.age >= 14 && once(G, 'ngm_kenule'),
    text: 'They hang Ken Saro-Wiwa on the tenth of November with eight other Ogoni men, after a tribunal that the man\'s own defence counsel walked out of. He wrote the television series everybody in this country watched — the comedy, the one with the character everyone could do the voice of — and then he wrote about what the oil companies had done to the creeks his people fished in, and that is the part that killed him. The Commonwealth suspends Nigeria the next day. It takes them five attempts to hang him, which is a detail you did not need and now have.',
    context: 'Ken Saro-Wiwa, writer of the popular sitcom Basi and Company and leader of the Movement for the Survival of the Ogoni People, was executed with eight others on 10 November 1995 after a military tribunal widely condemned as a sham. Nigeria was suspended from the Commonwealth the following day. Shell settled a related lawsuit for $15.5 million in 2009 while admitting no liability.',
    choices: null,
    effect: (p) => { p.setMem('ngm_kenule', true); p.m -= 7; p.e += 3; p.addFlag('saro_wiwa_1995') },
  },

  {
    id: 'ngm_1999',
    phase: null,
    weight: 999,
    when: (G) => IS_NG(G) && G.currentYear === 1999 && G.age >= 14 && once(G, 'ngm_1999'),
    text: 'On the twenty-ninth of May a civilian is sworn in, and he is the general who handed over to civilians in 1979, which tells you something about the size of the pool. If you were born in 1962 you have now lived thirty-seven years in this country and about nine of them under anybody elected. People are careful about how pleased they let themselves be. The thing that actually marks it, in your house, is that the news at nine stops being frightening to have on while somebody visits.',
    context: 'Olusegun Obasanjo, military head of state 1976–79, was sworn in as civilian president on 29 May 1999, ending sixteen consecutive years of military rule. Nigeria has held civilian elections since.',
    choices: null,
    effect: (p) => { p.setMem('ngm_1999', true); p.m += 9; p.addFlag('democracy_1999_lived'); p.addFlag('nga_democracy_generation') },
  },

]

// ── FOLLOW-THROUGH ───────────────────────────────────────────────────────────

export const NIGERIA_MIDCENTURY_FOLLOWTHROUGH = [

  {
    id: 'ngm_ft_biafra_food',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('biafra_child') && G.age >= 30 && once(G, 'ngm_ft_food'),
    text: 'You do not leave food. Not as a principle — you simply do not, and you have never once decided to, and you notice it only when somebody at a table says something. Your children leave food. You have watched them do it for twenty years and have never said a word about it, because the word would have to start somewhere and you are not going to start it at dinner.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_food', true); p.m += 2; p.addFlag('biafra_carried') },
  },

  {
    id: 'ngm_ft_twenty_pounds',
    phase: null,
    weight: 45,
    when: (G) => G.flags.includes('no_victor_no_vanquished') && (IGBO(G) || G.character?.ethnicity === 'ijaw') && G.age >= 40 && once(G, 'ngm_ft_20'),
    text: 'Somebody on the radio says the country has moved on, and means it generously, and you find you have opinions about the word "on". Your father started again at forty-four with twenty pounds and built the second version of everything, and died before the first version stopped being mentioned in the house. You are not angry in any way that would be legible to the man on the radio. You are simply, permanently, aware of a subtraction that was performed once and never entered anywhere.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_20', true); p.r += 4; p.e += 2; p.addFlag('the_subtraction') },
  },

  {
    id: 'ngm_ft_sap_money',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('sap_generation') && G.age >= 45 && once(G, 'ngm_ft_sap'),
    text: 'You do not trust the naira and you are not pretending to. What money there is sits in something — a plot, a container of goods, dollars in the house if you can get them — because you watched a currency go from one to twenty while the people responsible explained it on the radio, and nothing since has argued you out of the lesson. Your son thinks this is superstition. Your son was four in 1986.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_sap', true); p.addFlag('naira_distrust') },
  },

  {
    id: 'ngm_ft_wai_argument',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('war_against_indiscipline') && G.age >= 50 && once(G, 'ngm_ft_wai'),
    text: 'The argument comes round again every few years, usually at a wedding, usually with somebody young: that at least under the soldiers the queues worked. You have been on both sides of this sentence in your own life. What you say now is that you were there, that you did queue, that it was better for about a year and a half, and that a country which needs a whip to form a line has a problem the whip is not addressing. It does not persuade anybody. It is still the true answer.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_wai', true); p.e += 3; p.addFlag('wai_reckoning') },
  },

  {
    id: 'ngm_ft_andrew_late',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('andrew_checking_out') && G.age >= 55 && once(G, 'ngm_ft_andrew'),
    text: (G) => G.currentYear >= 2012
      ? 'Somebody has put the old advert on the internet and it goes round the family group, and everybody makes the joke, and everybody has the same second thought about four seconds later and nobody types it. Of the six of you in that classroom, four went. One came back at sixty. You are the one who never tried, and there are two entirely honest accounts of why, and you give the good one.'
      : 'Somebody does the advert at the wedding, the whole line of it, and the table goes. Everybody makes the joke and everybody has the same second thought about four seconds later and nobody says it. Of the six of you in that classroom, four went. One came back at sixty. You are the one who never tried, and there are two entirely honest accounts of why, and you give the good one.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_andrew', true); p.m += 2; p.r += 3; p.addFlag('the_ones_who_stayed') },
  },

  {
    id: 'ngm_ft_1999_after',
    phase: null,
    weight: 40,
    when: (G) => G.flags.includes('democracy_1999_lived') && G.currentYear >= 2012 && G.age >= 45 && once(G, 'ngm_ft_99'),
    text: 'Thirteen years of civilians now, which is longer than any stretch this country has had, and the complaints are ordinary complaints — the roads, the power, the thieving. Ordinary is the achievement and nobody under thirty can hear it that way, and you have stopped trying to make them. You would not go back. You are also not going to pretend the thing you have is the thing you queued for in 1993.',
    choices: null,
    effect: (p) => { p.setMem('ngm_ft_99', true); p.e += 3; p.addFlag('ordinary_is_the_achievement') },
  },

]

// events_unwritten_americas.js — four populations the roster drew and nobody
// had written for.
//
// `unwritten-group` reported them together: white Venezuelans (43% of the
// Venezuelan roster), white Colombians (37%), Belizean Creoles (24%) and
// Afro-Puerto Ricans (15%, flagged disadvantaged). Each has a spine the
// country-generic content does not carry. The white Venezuelan is very often
// the child of a Galician or Canarian who arrived under Pérez Jiménez, and the
// parent's nationality becomes the exit fifty years later. The white Colombian
// is the family with the finca, which is exactly who the roadblocks were for.
// The Creole is Belize City — the storm, the flag at midnight, and the
// cousins in Los Angeles. The Afro-Puerto Rican lives on an island that
// counted itself three-quarters white until 2020, in a phrase about a
// grandmother.
//
// Dates used, all checked. Pérez Jiménez governs 1952 to January 1958 and runs
// an open immigration policy; Canarians, Galicians, Madeirans and Italians
// arrive through the 1950s. The bolívar is fixed at 4.30 to the dollar from
// 1976; "ta' barato, dame dos" is the 1970s Miami phrase. Viernes Negro is
// Friday 18 February 1983, followed by the RECADI exchange controls. The 11
// April 2002 march goes from Parque del Este towards Miraflores; nineteen are
// killed near Puente Llaguno; Carmona is sworn in on the 12th and Chávez is
// back in the early hours of Sunday the 14th. The oil strike runs December 2002
// to February 2003 and about 18,000 PDVSA staff are dismissed. Rationing by
// the last digit of the cédula runs from 2014-15. Gaitán is shot in Bogotá at
// about 1pm on 9 April 1948. The "pesca milagrosa" roadblock kidnappings peak
// 1998-2002 (over 3,000 kidnappings in 2000); the escorted holiday caravans,
// "Vive Colombia, viaja por ella", begin in 2003. Escobar's bombing war is
// 1989-93; he is killed on a Medellín rooftop on 2 December 1993; the Mónaco
// building is demolished on 22 February 2019. The peace plebiscite is 2
// October 2016, No 50.2%, Antioquia about 62% No, Bogotá about 56% Yes; the
// revised accord is signed at the Teatro Colón on 24 November. Hurricane Hattie
// strikes British Honduras on 31 October 1961 (about 275 dead); Hattieville
// begins as the refugee camp; the capital goes to Belmopan in 1970. Belize is
// independent at midnight on 21 September 1981 under George Price, with
// British troops remaining because Guatemala does not recognise it until 1991.
// Vizcarrondo's "¿Y tu agüela, aonde ejtá?" is 1942. Puerto Ricans are US
// citizens from 1917; the Great Migration is 1946 to the mid-1960s. The
// Santiago Apóstol festival in Loíza is late July. The 2010 census counts
// Puerto Rico 75.8% white; the 2020 count, published in August 2021, 17.1%
// white alone and 49.8% two or more races. Hurricane María makes landfall at
// Yabucoa on 20 September 2017; the official toll of 64 is revised to 2,975 on
// 28 August 2018; the last homes are reconnected nearly eleven months after.

const VE = 'Venezuela'
const CO = 'Colombia'
const BZ = 'Belize'
const PR = 'Puerto Rico'
const LIVES_IN = (G, name) => (G.currentCountry?.name ?? G.character?.country?.name) === name
const WV = (G) => G.character?.ethnicity === 'white_venezuelan'
const WC = (G) => G.character?.ethnicity === 'white_colombian'
const CB = (G) => G.character?.ethnicity === 'creole_belizean'
const APR = (G) => G.character?.ethnicity === 'afro_puerto_rican'
const VE_HOME = (G) => WV(G) && LIVES_IN(G, VE)
const CO_HOME = (G) => WC(G) && LIVES_IN(G, CO)
const BZ_HOME = (G) => CB(G) && LIVES_IN(G, BZ)
const PR_HOME = (G) => APR(G) && LIVES_IN(G, PR)
const once = (G, key) => !G.mem?.[key]

export const UNWRITTEN_AMERICAS_EVENTS = [

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────
  // Written first. Each one is what a flag below becomes years later.

  {
    id: 'uam_ve_ft_viernes_negro',
    phase: null,
    weight: 300,
    when: (G) => VE_HOME(G) && G.character?.ethnicity === 'white_venezuelan' && G.flags.includes('uam_ve_dame_dos') &&
      G.currentYear >= 1983 && G.currentYear <= 1986 && once(G, 'uam_ve_ft_viernes'),
    text: (G) => 'On a Friday in February the bolívar that was four-thirty to the dollar your whole adult life stops being four-thirty, and by the following week nobody can say what it is. There are three rates now and an office called RECADI that decides which one you deserve. ' +
      (G.mem?.uam_ve_two_tv
        ? 'The second television, still in its Miami box in the hall cupboard, becomes the most expensive thing in the flat. '
        : 'Your sister-in-law, who filled two suitcases every trip, does not call you tight any more. ') +
      'Nobody says dame dos now, except as a joke about who you used to be.',
    context: 'On 18 February 1983, Viernes Negro, Venezuela abandoned the fixed rate of 4.30 bolívares to the dollar it had held since 1976, after the oil price fell and capital fled. A multiple exchange-rate regime under RECADI followed, and it became a byword for favouritism.',
    choices: null,
    effect: (p) => { p.setMem('uam_ve_ft_viernes', true); p.m -= 4; p.r += 2; p.mo -= 400 },
  },

  {
    id: 'uam_ve_ft_after',
    phase: null,
    weight: 280,
    when: (G) => G.character?.ethnicity === 'white_venezuelan' && G.age >= 26 && G.currentYear >= 2012 && G.currentYear <= 2024 &&
      ((G.flags.includes('uam_ve_left') && !LIVES_IN(G, VE)) || (G.flags.includes('uam_ve_stayed') && LIVES_IN(G, VE) && G.currentYear >= 2015)) &&
      once(G, 'uam_ve_ft_after'),
    text: (G) => G.flags.includes('uam_ve_left')
      ? 'The family group on your phone has forty-one members in nine countries, and every morning somebody posts the price of a kilo of something in Caracas as if it were weather. Your mother still lives in the flat in Los Palos Grandes and sends voice notes about the neighbours who have gone. Here you are the venezolana, which in Madrid now means a particular accent at a particular counter. In your father\'s village they called him el venezolano when he came back to visit, for the same reason, from the other side.'
      : 'The supermarket takes your cédula at the door, and the last digit decides which day of the week you are allowed to buy flour. Half the street has gone to Madrid or Miami or Tenerife, and the flats stand with their shutters down and a cousin paying the condominium. You had the passport and did not use it. Some mornings in the queue you cannot remember the reason, and some mornings you can.',
    context: 'From 2014-15, as price controls emptied the shelves, supermarkets rationed regulated goods by the final digit of the buyer\'s identity card. Some seven million Venezuelans left the country in the decade that followed.',
    choices: null,
    effect: (p) => { p.setMem('uam_ve_ft_after', true); p.r += 4; p.m -= 3 },
  },

  {
    id: 'uam_co_ft_caravan',
    phase: null,
    weight: 280,
    when: (G) => CO_HOME(G) && G.flags.includes('uam_co_finca_road') && G.currentYear >= 2003 && G.currentYear <= 2012 && G.age >= 16 && once(G, 'uam_co_ft_caravan'),
    text: 'At Easter the army lines the highway, a soldier every few hundred metres with his thumb up, and a column of family cars goes down to tierra caliente for the first time in years. The finca is still there. The pool is green, the mayordomo has aged ten years in four, and the dog that knew you has died. Your father walks the fence line all afternoon and does not say what he is counting.',
    context: 'From 2003 the Uribe government ran escorted holiday caravans, "Vive Colombia, viaja por ella", with troops posted along the main highways, as part of its Democratic Security policy. Kidnappings fell steeply over the following years.',
    choices: null,
    effect: (p) => { p.setMem('uam_co_ft_caravan', true); p.m += 4; p.r += 2 },
  },

  {
    id: 'uam_co_ft_monaco',
    phase: null,
    weight: 300,
    when: (G) => G.character?.ethnicity === 'white_colombian' && G.flags.includes('uam_co_escobar_years') && G.currentYear >= 2019 && G.age >= 36 && once(G, 'uam_co_ft_monaco'),
    text: 'In February they bring down the Mónaco building in El Poblado with explosives and a crowd watching, and the mayor says the city is choosing whom it remembers. On the same weekend a van of foreigners stops outside the cemetery at Itagüí to photograph a grave. You were a child when the bombs were going off and you knew which roads not to use on which days. Nobody on the tour asks anybody who lived here what that was like, and nobody offers.',
    context: 'The Edificio Mónaco, Pablo Escobar\'s residence, was bombed by the Cali cartel in 1988 and demolished on 22 February 2019 to make way for a memorial to the victims of narco-terrorism. Tours built around Escobar and the television series about him drew visitors to Medellín throughout the 2010s.',
    choices: [
      {
        text: 'Go and watch the demolition',
        tag: null,
        outcome: 'The building goes down in a few seconds and the dust takes longer. People clap, and you find you are clapping.',
        effect: (p) => { p.setMem('uam_co_ft_monaco', true); p.m += 3; p.karma += 1 },
      },
      {
        text: 'Stay home and let it be on television',
        tag: null,
        outcome: 'You watch it twice on the news and turn it off before the interviews.',
        effect: (p) => { p.setMem('uam_co_ft_monaco', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_bz_ft_hattie',
    phase: null,
    weight: 280,
    when: (G) => G.character?.ethnicity === 'creole_belizean' && G.flags.includes('uam_bz_hattie') && G.currentYear >= 1975 && G.age >= 24 && once(G, 'uam_bz_ft_hattie'),
    text: 'Old people in Belize City still date things before Hattie and after Hattie, and you have started doing it. The government is out in Belmopan now, fifty miles inland on high ground, a capital built because of one night of water. Hattieville, which was tents, has a school and a police station and people born there who have never lived anywhere else. Every thirty-first of October somebody at the market says the number of feet the water came up, and it is never the same number.',
    context: 'Hurricane Hattie killed about 275 people in British Honduras on 31 October 1961 and flooded Belize City. The refugee camp set up inland became the village of Hattieville, and the decision to build a new capital away from the coast led to Belmopan, which became the seat of government in 1970.',
    choices: null,
    effect: (p) => { p.setMem('uam_bz_ft_hattie', true); p.r += 3; p.e += 2 },
  },

  {
    id: 'uam_bz_ft_barrel',
    phase: null,
    weight: 280,
    when: (G) => G.character?.ethnicity === 'creole_belizean' && G.flags.includes('uam_bz_went_states') && !LIVES_IN(G, BZ) && G.age >= 28 && G.age <= 70 && once(G, 'uam_bz_ft_barrel'),
    text: 'Every November the blue barrel stands open in the corner of the apartment and fills all month: rice, tins of corned beef, sneakers two sizes too big because children grow, a set of towels for your mother. It goes by ship and arrives in Belize City after Christmas if you are lucky. In South Central the other Belizeans know each other by the way they say "yu" and by who went to St. John\'s or Wesley. When you phone home they tell you you sound American, and at work they ask where the accent is from.',
    choices: [
      {
        text: 'Fill the barrel to the top',
        tag: null,
        outcome: 'Your mother wears the towels to church, which is not what towels are for, and tells everyone who sent them.',
        effect: (p) => { p.setMem('uam_bz_ft_barrel', true); p.mo -= 400; p.karma += 4; p.m += 2 },
      },
      {
        text: 'Send money this year instead',
        tag: null,
        outcome: 'It arrives faster and means less, and your aunt says so on the phone.',
        effect: (p) => { p.setMem('uam_bz_ft_barrel', true); p.mo -= 300; p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_pr_ft_census',
    phase: null,
    weight: 280,
    when: (G) => PR_HOME(G) && G.character?.ethnicity === 'afro_puerto_rican' && G.flags.includes('uam_pr_the_grandmother') && G.currentYear >= 2021 && G.age >= 20 && once(G, 'uam_pr_ft_census'),
    text: 'The census results come out and the island that was seventy-five per cent white in 2010 is seventeen per cent white ten years later, and nobody has moved. Half the island ticked two boxes. On the radio a professor explains that the form changed and so did people, and a caller says the grandmother has come out of the kitchen. You think of your own aunt pressing your head under the hot comb and saying there, now you look decent.',
    context: 'In the 2010 census 75.8% of Puerto Ricans identified as white alone. In the 2020 count, published in August 2021, the figure was 17.1%, and 49.8% identified with two or more races, after changes to how the questions were asked and coded.',
    choices: null,
    effect: (p) => { p.setMem('uam_pr_ft_census', true); p.m += 3; p.e += 2; p.r += 1 },
  },

  {
    id: 'uam_pr_ft_bronx',
    phase: null,
    weight: 280,
    when: (G) => G.character?.ethnicity === 'afro_puerto_rican' && G.flags.includes('uam_pr_went_north') && !LIVES_IN(G, PR) && G.currentYear >= 1955 && G.age >= 24 && once(G, 'uam_pr_ft_bronx'),
    text: 'On the island you were trigueño, or negrito said with love, or nothing said at all. Here the landlord on Southern Boulevard looks at you and at the application and sees one thing, and the Puerto Ricans upstairs who are lighter than you see another. On the subway a man speaks to you in English as though you were from Harlem, and on Fox Street a woman speaks to you in Spanish as though you were from nowhere. Your children, born here, answer the question faster than you do.',
    choices: [
      {
        text: 'Say Puerto Rican, every time',
        tag: 'defiant',
        outcome: 'It does not change what the landlord sees. It changes what you hear yourself say.',
        effect: (p) => { p.setMem('uam_pr_ft_bronx', true); p.m += 2; p.karma += 2 },
      },
      {
        text: 'Let each of them decide',
        tag: 'yielding',
        outcome: 'It is easier, some days, to be whatever the person in front of you has already decided.',
        effect: (p) => { p.setMem('uam_pr_ft_bronx', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_pr_ft_maria',
    phase: null,
    weight: 300,
    when: (G) => PR_HOME(G) && G.character?.ethnicity === 'afro_puerto_rican' && G.flags.includes('uam_pr_maria') && G.currentYear >= 2018 && G.currentYear <= 2021 && G.age >= 14 && once(G, 'uam_pr_ft_maria'),
    text: 'In August the government stops saying sixty-four and starts saying two thousand nine hundred and seventy-five. The number is the people who died in the months when the dialysis centre ran on a generator and then did not, when the old man next door could not climb to the clinic. You knew four of them. Nobody knocks on the door to tell you which were counted.',
    context: 'The official death toll from Hurricane María stood at 64 until 28 August 2018, when the government adopted a George Washington University estimate of 2,975 excess deaths in the six months after the storm. Some homes waited nearly eleven months for power.',
    choices: null,
    effect: (p) => { p.setMem('uam_pr_ft_maria', true); p.r += 4; p.m -= 4; p.karma += 1 },
  },

  // ── VENEZUELA: white_venezuelan ────────────────────────────────────────────

  {
    id: 'uam_ve_inmigrante',
    phase: null,
    weight: 35,
    when: (G) => VE_HOME(G) && G.age >= 6 && G.age <= 12 && G.currentYear >= 1955 && G.currentYear <= 1985 && once(G, 'uam_ve_inmigrante'),
    text: (G) => `Your ${G.character?.birthYear % 2 === 0 ? 'father came from Galicia' : 'father came from the Canary Islands'} on a ship in the fifties with a cardboard suitcase and a cousin's address, and now there is a panadería with his name over it. On Sundays he listens to a radio station from over there that comes and goes in the static. At school you are Venezuelan and at home you are told you are from a village you have never seen. The Portuguese bakery on the next corner sells the same bread and nobody in either shop admits it.`,
    context: 'Under Marcos Pérez Jiménez, 1952-58, Venezuela ran an open-door immigration policy, and several hundred thousand Spaniards, Italians and Portuguese arrived in the oil-boom decade. So many Canary Islanders came that Venezuela was called the eighth island.',
    choices: null,
    effect: (p) => { p.setMem('uam_ve_inmigrante', true); p.e += 2; p.addFlag('uam_ve_european_parents') },
  },

  {
    id: 'uam_ve_dame_dos',
    phase: null,
    weight: 35,
    when: (G) => VE_HOME(G) && G.age >= 18 && G.currentYear >= 1975 && G.currentYear <= 1982 && once(G, 'uam_ve_dame_dos'),
    text: 'The bolívar is so strong that a weekend in Miami costs less than a weekend in Margarita, and the Viasa flight is full of people like you with empty suitcases. In the shops on Flagler Street the clerks have learned one phrase of your Spanish: ta barato, dame dos. It is cheap, give me two. You come home with a television for the flat and one for your mother, and a blender nobody needed.',
    context: 'After the 1973 oil shock Venezuela\'s income quadrupled and the bolívar was held at 4.30 to the dollar. Middle-class Venezuelans shopped in Miami in such numbers that "ta barato, dame dos" became the name of the era.',
    choices: [
      {
        text: 'Buy the second television',
        tag: null,
        outcome: 'It sits in its box in the hall cupboard, waiting for a use.',
        effect: (p) => { p.setMem('uam_ve_dame_dos', true); p.setMem('uam_ve_two_tv', true); p.m += 3; p.mo -= 300; p.addFlag('uam_ve_dame_dos') },
      },
      {
        text: 'Bring back only what you came for',
        tag: null,
        outcome: 'Your sister-in-law calls you tight, and in 1983 she will remember it.',
        effect: (p) => { p.setMem('uam_ve_dame_dos', true); p.m += 1; p.addFlag('uam_ve_dame_dos') },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_ve_april_2002',
    phase: null,
    weight: 250,
    when: (G) => VE_HOME(G) && G.currentYear === 2002 && G.age >= 16 && once(G, 'uam_ve_2002'),
    text: 'On the eleventh of April the march leaves Parque del Este in the morning, flags and whistles and sun cream, and somewhere in the afternoon it is turned towards Miraflores. By evening there are bodies near Puente Llaguno and every channel is showing a different one of them. On Friday a businessman swears himself in as president, and by Sunday morning Chávez is back in the palace. On the television he has a word for people like you, escuálidos, the scrawny ones, and your street has started using it about itself.',
    context: 'The opposition march of 11 April 2002 ended in shooting in central Caracas in which nineteen people died. Pedro Carmona was sworn in as president on the 12th and dissolved the institutions of state; Chávez was restored in the early hours of the 14th. The oil strike that followed, December 2002 to February 2003, ended with some 18,000 PDVSA employees dismissed.',
    choices: [
      {
        text: 'Walk in the march',
        tag: 'defiant',
        outcome: 'You turn back before the palace because your feet hurt, and learn that night what the next hour was.',
        effect: (p) => { p.setMem('uam_ve_2002', true); p.karma += 2; p.r += 3; p.m -= 3 },
      },
      {
        text: 'Watch it from the balcony',
        tag: 'yielding',
        outcome: 'The pots bang from every window in the building at eight, and you bang yours, and it is all you do.',
        effect: (p) => { p.setMem('uam_ve_2002', true); p.m -= 2; p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_ve_passport',
    phase: null,
    weight: 40,
    when: (G) => VE_HOME(G) && G.flags.includes('uam_ve_european_parents') && G.age >= 22 && G.age <= 60 &&
      G.currentYear >= 2003 && G.currentYear <= 2019 && once(G, 'uam_ve_passport'),
    text: 'The Spanish consulate opens at eight and the queue starts at five. Everyone in it has a father\'s or a grandfather\'s birth certificate from a parish in Lugo or La Palma, and a folder, and a way of not looking at the others. Your father never gave up his nationality, which means that you, on paper, have never been only from here. The passport is burgundy and lighter than you expected.',
    choices: [
      {
        text: 'Use it',
        tag: null,
        outcome: 'Two suitcases, the dog left with your mother, and at Maiquetía you do not look back at the mural on the floor, which everyone photographs.',
        effect: (p) => { p.setMem('uam_ve_passport', true); p.r += 3; p.m -= 4; p.addFlag('uam_ve_left'); p.addFlag('emigrated'); p.emigrateTo('Spain', { residency: 'citizen' }) },
      },
      {
        text: 'Put it in the drawer',
        tag: null,
        outcome: 'It goes in with the title deed and your father\'s old identity card, which is where the family keeps what it intends to need.',
        effect: (p) => { p.setMem('uam_ve_passport', true); p.m += 1; p.addFlag('uam_ve_stayed') },
      },
    ],
    effect: null,
  },

  // ── COLOMBIA: white_colombian ──────────────────────────────────────────────

  {
    id: 'uam_co_bogotazo',
    phase: null,
    weight: 250,
    when: (G) => CO_HOME(G) && G.place?.id === 'co_bogota' && G.currentYear === 1948 && G.age >= 8 && G.age <= 30 && once(G, 'uam_co_bogotazo'),
    text: 'At lunchtime on the ninth of April someone shoots Gaitán on the Séptima, and by three the city centre is on fire. Your father comes home to Chapinero on foot because the trams are burning, with his hat gone and somebody else\'s blood on one cuff. The maid is sent to her room and told to stay there, and she goes, and you hear her crying through the door. For three days the radio says different things on different stations.',
    context: 'The assassination of the Liberal leader Jorge Eliécer Gaitán on 9 April 1948 set off the Bogotazo, days of rioting in which much of central Bogotá was burned and hundreds or thousands were killed. It is usually taken as the start of La Violencia.',
    choices: null,
    effect: (p) => { p.setMem('uam_co_bogotazo', true); p.m -= 5; p.e += 2 },
  },

  {
    id: 'uam_co_pesca',
    phase: null,
    weight: 40,
    when: (G) => CO_HOME(G) && G.age >= 10 && G.currentYear >= 1998 && G.currentYear <= 2002 && once(G, 'uam_co_pesca'),
    text: 'They call it the miraculous catch: men in fatigues across the highway on a Sunday, a laptop on a folding table, the cédulas taken from every car and looked up for what the family is worth. A friend of your father\'s was taken from the road to Melgar and has been gone eleven months. The finca has not been visited since Christmas before last. At dinner the adults talk about who has paid and how much, in a voice that stops when the maid comes in.',
    context: 'Mass roadblock kidnappings by the FARC and ELN, "pescas milagrosas", peaked in the late 1990s and early 2000s; in 2000 more than 3,000 kidnappings were recorded, the highest figure in the world. Families with rural property stopped travelling by road.',
    choices: null,
    effect: (p) => { p.setMem('uam_co_pesca', true); p.m -= 5; p.h -= 1; p.addFlag('uam_co_finca_road') },
  },

  {
    id: 'uam_co_escobar',
    phase: null,
    weight: 40,
    when: (G) => CO_HOME(G) && G.place?.id === 'co_medellin' && G.age >= 6 && G.currentYear >= 1989 && G.currentYear <= 1993 && once(G, 'uam_co_escobar'),
    text: 'In Medellín you learn not to park next to a car you do not know, and not to go to the shopping centre on a Friday. The bombs are for the state and for the police, and they land in bakeries and outside bullring gates. In December the radio says he is dead on a roof in Los Olivos, and people in El Poblado set off fireworks. Your mother does not. She says a thing like that has a son.',
    context: 'Between 1989 and 1993 Pablo Escobar waged a bombing campaign against the Colombian state, killing hundreds of civilians in Medellín and Bogotá. He was shot dead on a rooftop in Medellín on 2 December 1993.',
    choices: null,
    effect: (p) => { p.setMem('uam_co_escobar', true); p.m -= 4; p.h -= 1; p.addFlag('uam_co_escobar_years') },
  },

  {
    id: 'uam_co_plebiscite',
    phase: null,
    weight: 250,
    when: (G) => CO_HOME(G) && G.currentYear === 2016 && G.age >= 18 && once(G, 'uam_co_plebiscite'),
    text: (G) => `On the second of October the country votes on the peace with the FARC, and it rains on the coast, and nobody can believe the result. ${G.place?.id === 'co_medellin' || G.place?.id === 'co_rural' ? 'Antioquia votes no, loudly, and your uncle at the finca says it is about time somebody asked.' : 'Bogotá votes yes, and the country votes no by fewer than sixty thousand, and the office is quiet all Monday.'} The accord goes back to Havana and comes back changed, and in November it is signed again in a theatre without asking anybody. Your family argues about it at every lunch until the lunches stop mentioning it.`,
    context: 'The peace accord between the government and the FARC was rejected in a plebiscite on 2 October 2016 by 50.2% to 49.8%, on a turnout under 40%. A revised accord was signed at the Teatro Colón on 24 November and ratified by Congress.',
    choices: [
      {
        text: 'Vote yes',
        tag: null,
        outcome: 'You vote at the school where you once sat exams, and walk home past the no posters.',
        effect: (p) => { p.setMem('uam_co_plebiscite', true); p.karma += 2; p.m -= 1 },
      },
      {
        text: 'Vote no',
        tag: null,
        outcome: 'You vote at the school where you once sat exams, and do not say how at lunch.',
        effect: (p) => { p.setMem('uam_co_plebiscite', true); p.r += 1 },
      },
      {
        text: 'Stay home',
        tag: null,
        outcome: 'Most of the country does too. It is the most honest vote you have cast and you are not proud of it.',
        effect: (p) => { p.setMem('uam_co_plebiscite', true); p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── BELIZE: creole_belizean ────────────────────────────────────────────────

  {
    id: 'uam_bz_hattie',
    phase: null,
    weight: 300,
    when: (G) => BZ_HOME(G) && G.currentYear === 1961 && G.age >= 4 && once(G, 'uam_bz_hattie'),
    text: 'The wireless has been saying hurricane for two days, and on the last night of October the wind comes and then the sea comes after it, over the seawall and up Regent Street. You spend the night in the upstairs of a wooden house on stilts, with the water in the room below and the neighbours on the stairs. In the morning there is a boat in the middle of the road and the smell starts by noon. Your aunt\'s family go to the tents the government puts up at mile sixteen on the Western Highway.',
    context: 'Hurricane Hattie struck British Honduras on 31 October 1961, killing about 275 people and destroying much of Belize City. The refugee camp set up inland became the permanent village of Hattieville.',
    choices: null,
    effect: (p) => { p.setMem('uam_bz_hattie', true); p.m -= 7; p.h -= 3; p.addFlag('uam_bz_hattie') },
  },

  {
    id: 'uam_bz_kriol',
    phase: null,
    weight: 35,
    when: (G) => BZ_HOME(G) && G.age >= 6 && G.age <= 10 && G.currentYear >= 1940 && once(G, 'uam_bz_kriol'),
    text: 'At home your grandmother says wa mek yu di laaf, and at school the teacher writes on the board that you must say why are you laughing, and speak properly. Kriol is what everybody in Belize City speaks in the street, the Mestizo boys and the Garifuna girls too when they want to be understood, and it is the thing the report card calls bad English. You learn to change at the school gate, both directions. By the end of the year you do it without noticing, which the teacher counts as progress.',
    choices: null,
    effect: (p) => { p.setMem('uam_bz_kriol', true); p.e += 2; p.s += 1 },
  },

  {
    id: 'uam_bz_independence',
    phase: null,
    weight: 300,
    when: (G) => BZ_HOME(G) && G.currentYear === 1981 && G.age >= 8 && once(G, 'uam_bz_independence'),
    text: 'At midnight on the twenty-first of September the Union Jack comes down and the blue flag goes up, and George Price, who has been asking for this since before you were born, stands under it in his plain shirt. There is a Harrier jet at the airport all the same, because Guatemala has a map with your country on it and has not changed it. The fireworks go off over the harbour. In the morning the currency and the heat are the same, and the flag is on every fence in the city.',
    context: 'Belize became independent on 21 September 1981 under Premier George Price. Guatemala, which claimed the territory, did not recognise the new state until 1991, and British troops and aircraft remained to guard the border.',
    choices: null,
    effect: (p) => { p.setMem('uam_bz_independence', true); p.m += 5; p.karma += 1 },
  },

  {
    id: 'uam_bz_states',
    phase: null,
    weight: 40,
    when: (G) => BZ_HOME(G) && G.age >= 18 && G.age <= 35 && G.currentYear >= 1962 && G.currentYear <= 1995 && once(G, 'uam_bz_states'),
    text: 'Half the people you went to school with are in Los Angeles, or Brooklyn, or Chicago, and the other half are waiting on a letter. Your cousin in South Central writes that there is work at a hospital laundry and a sofa you can sleep on. The visa is for visiting. Everybody knows what visiting means.',
    choices: [
      {
        text: 'Take the visa and go',
        tag: null,
        outcome: 'You land in Los Angeles in a jacket you bought for the cold, and it is hotter than home.',
        effect: (p) => { p.setMem('uam_bz_states', true); p.r += 2; p.addFlag('uam_bz_went_states'); p.addFlag('emigrated'); p.emigrateTo('United States', { residency: 'tourist_overstay', tier: 'working_class' }) },
      },
      {
        text: 'Stay in Belize City',
        tag: null,
        outcome: 'At Christmas the barrels come in from the ones who went, and you open them for their mothers.',
        effect: (p) => { p.setMem('uam_bz_states', true); p.m += 1; p.r += 2 },
      },
    ],
    effect: null,
  },

  // ── PUERTO RICO: afro_puerto_rican ─────────────────────────────────────────

  {
    id: 'uam_pr_aguela',
    phase: null,
    weight: 35,
    when: (G) => PR_HOME(G) && G.age >= 6 && G.age <= 12 && G.currentYear >= 1945 && once(G, 'uam_pr_aguela'),
    text: 'Your aunt calls your hair pelo malo while she combs it, and says it the way she says the rice needs salt. When your cousin marries a man lighter than her, the family says she has improved the race, and it is meant as praise. At school a boy recites the poem that asks and your grandmother, where is she, and the class laughs, and you do not know which side of the joke you are on. Your grandmother is in the kitchen, as it happens, frying bacalaítos.',
    context: 'Fortunato Vizcarrondo\'s poem "¿Y tu agüela, aonde ejtá?" (1942) mocks the Puerto Rican habit of claiming whiteness while hiding the Black grandmother in the kitchen. Phrases like "pelo malo" and "mejorar la raza" were ordinary household speech.',
    choices: null,
    effect: (p) => { p.setMem('uam_pr_aguela', true); p.m -= 3; p.e += 1; p.addFlag('uam_pr_the_grandmother') },
  },

  {
    id: 'uam_pr_bomba',
    phase: null,
    weight: 35,
    when: (G) => PR_HOME(G) && G.age >= 8 && G.age <= 45 && G.currentYear >= 1950 && once(G, 'uam_pr_bomba'),
    text: 'In late July you go to Loíza for Santiago, and the vejigantes come down the road in masks carved from coconut shells, all horns and teeth. At night there is bomba under a zinc roof, three barrels, and a woman steps out in front of the lead drum and lifts her skirt and the drum has to follow her, not the other way round. Your uncle says this is the part of the island the tourist board forgets. You go out in front of the drum once, badly, and he plays for you anyway.',
    context: 'Loíza, on the north-east coast, is the historic centre of Afro-Puerto Rican culture. In bomba the dancer leads and the lead drum, the primo or subidor, answers each movement.',
    choices: null,
    effect: (p) => { p.setMem('uam_pr_bomba', true); p.m += 4; p.s += 1 },
  },

  {
    id: 'uam_pr_north',
    phase: null,
    weight: 40,
    when: (G) => PR_HOME(G) && G.age >= 17 && G.age <= 35 && G.currentYear >= 1946 && G.currentYear <= 1965 && once(G, 'uam_pr_north'),
    text: 'The cane pays for half the year and the other half is the tiempo muerto. There are flights to New York now for less than a month\'s wages, and you do not need a passport, because the island has been American since before your mother was born. Your brother writes from the Bronx that there are jobs in the garment shops and the hotel kitchens. He does not write about anything else, which is its own letter.',
    context: 'Puerto Ricans have been US citizens since the Jones Act of 1917. Between 1946 and the mid-1960s, with cheap air fares and the island\'s shift from sugar under Operation Bootstrap, several hundred thousand went to New York.',
    choices: [
      {
        text: 'Get on the plane',
        tag: null,
        outcome: 'You come down at the airport in Queens in the only coat you own, which is not a winter coat.',
        effect: (p) => { p.setMem('uam_pr_north', true); p.r += 2; p.addFlag('uam_pr_went_north'); p.addFlag('emigrated'); p.emigrateTo('United States', { residency: 'citizen', tier: 'working_class' }) },
      },
      {
        text: 'Stay for the next zafra',
        tag: null,
        outcome: 'The next zafra is smaller, and the one after that smaller again.',
        effect: (p) => { p.setMem('uam_pr_north', true); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'uam_pr_maria',
    phase: null,
    weight: 300,
    when: (G) => PR_HOME(G) && G.currentYear === 2017 && G.age >= 6 && once(G, 'uam_pr_maria'),
    text: 'The wind comes in over Yabucoa on the twentieth of September and does not leave until the island has no power, no signal and no green on the trees. For weeks the line for the one working gas station starts at four in the morning. Your street strings a hose from the spring in the hills. The official number of dead is sixty-four, and everyone you know can already name more than that.',
    context: 'Hurricane María made landfall at Yabucoa on 20 September 2017 as a Category 4 storm and destroyed the island\'s power grid; some homes waited nearly eleven months for electricity.',
    choices: null,
    effect: (p) => { p.setMem('uam_pr_maria', true); p.m -= 8; p.h -= 3; p.addFlag('uam_pr_maria') },
  },
]

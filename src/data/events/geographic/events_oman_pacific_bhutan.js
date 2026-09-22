// Oman, Vanuatu and Bhutan arc events
//
// Three states that spent most of the twentieth century closed and then opened
// on a decision made by one man or one administration, which is the thing they
// have in common and the reason they are written together: Qaboos in 1970,
// independence from the condominium in 1980, the third and fourth kings from
// the 1960s on. In all three the opening is narrated by the state as a gift,
// and in all three there is a population it was not extended to.
//
// 18 events. Follow-throughs at the bottom.

const IS_OM = (G) => G.currentCountry?.name === 'Oman' || G.character.country?.name === 'Oman'
const IS_VU = (G) => G.currentCountry?.name === 'Vanuatu' || G.character.country?.name === 'Vanuatu'
const IS_BT = (G) => G.currentCountry?.name === 'Bhutan' || G.character.country?.name === 'Bhutan'

export const OMAN_PACIFIC_BHUTAN_EVENTS = [

  // ── Oman ──

  {
    id: 'omn_before_1970',
    phase: null,   // guard carries its own 6-16 band; 'childhood' was cutting five years off it
    weight: 9,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1935 && G.currentYear <= 1970 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.omnBefore,
    text: 'There are three schools in the country and none of them is near you. The gates of Muscat are shut at dusk and after that you need a lantern to be out at all. There is a permit required to leave your own wilayat, to wear sunglasses, to fit a door with a lock, to play football; the Sultan has decided each of these individually. Your uncle went to Zanzibar and your other uncle went to Bombay because there was nothing here to stay for. When someone in the family is properly ill they are taken by boat.',
    choices: null,
    effect: (p) => {
      p.e -= 4; p.h -= 5; p.m -= 4
      p.addFlag('omn_old_sultanate')
      p.addFlag('no_schooling_available')
      p.setMem('omnBefore', true)
    },
  },

  {
    id: 'omn_1970_coup',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1970 && G.currentYear <= 1974 &&
      G.age >= 8 &&
      !G.mem?.omn1970,
    text: 'July, and the radio says the Sultan has been replaced by his son. Within a year there are permits for nothing and school buildings going up in places that have never had one. The road comes. The clinic comes. A man arrives in the village to say that girls are to be enrolled too, and there is an argument in the majlis about it that lasts a week and ends with the girls enrolled. Everyone over thirty spends the rest of their life with two Omans in their head, and the distance between them is about four years.',
    choices: [
      { text: 'Get into the new school, whatever age you are', tag: 'defiant', outcome: 'You start at an age that embarrasses you and you finish. The certificate is the first document you have ever owned.', effect: (p) => { p.e += 14; p.m += 10; p.addFlag('omn_renaissance_generation'); p.addFlag('first_literate_generation') } },
      { text: 'Too late for you. Make sure it is not too late for the children.', tag: null, outcome: 'You cannot read the reports they bring home and you attend every parents\' meeting anyway.', effect: (p) => { p.m += 8; p.karma += 7; p.addFlag('omn_renaissance_generation'); p.addFlag('illiterate_parent_literate_child') } },
    ],
    effect: null,
  },

  {
    id: 'omn_dhofar_war',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1976 &&
      G.age >= 15 && G.age <= 45 &&
      !G.mem?.omnDhofar,
    text: 'In the south there is a war that the rest of the country is not told very much about — Marxist rebels in the jebel, British officers seconded to the Sultan\'s forces, Iranian troops, a firqat of surrendered fighters turned around and sent back up. It ends in 1975 with a declaration and a road and a school in every wadi, which was the actual strategy. If you are Jibbali and from those mountains, the war is the central fact of your family. If you are from the north it is a thing that was happening somewhere hot.',
    choices: null,
    effect: (p) => {
      p.m -= 7; p.e += 5
      p.addFlag('omn_dhofar_war')
      p.setMem('omnDhofar', true)
    },
  },

  {
    // The gap the Oman content had: the Dhofar war was here and the 1970 coup
    // was here, but the five years that made both of them possible were not.
    // The Treaty of Seeb gave the interior its own Ibadi imam in 1920; oil was
    // found under the interior in the 1950s; the Sultan wanted the concession
    // and the RAF bombed the falaj channels and the villages until the SAS
    // took the plateau in January 1959. It is also the only place in the
    // corpus where the Ibadi imamate appears as a political institution
    // rather than a theological footnote.
    id: 'omn_jebel_akhdar',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1954 && G.currentYear <= 1960 &&
      G.age >= 8 &&
      !G.mem?.omnJebel,
    text: 'The interior has had its own imam since your grandfather\'s time \u2014 elected, in the Ibadi way, and the Sultan on the coast agreed to leave him alone. Then the surveyors come inland looking for oil and the agreement stops being convenient. The aircraft come after that. They bomb the villages on the plateau and they bomb the falaj channels, which is the more serious act, because a falaj takes a century to cut and a season to lose. In January the British soldiers climb the jebel at night and it is finished. Nobody will print the word imamate in this country again.',
    choices: [
      { text: 'Your family was for the imam', tag: 'defiant', outcome: 'Some of them go to Cairo and some go to Dammam and the ones who stay learn a very particular quietness.', effect: (p) => { p.m -= 14; p.mo -= 400; p.karma += 4; p.addFlag('omn_imamate_family'); p.addFlag('aut_taught_silence') } },
      { text: 'Your family was for the Sultan, or said so', tag: 'yielding', outcome: 'It was the safe answer and it was also, in your father\'s case, sincere, and you have never been able to separate the two.', effect: (p) => { p.m -= 5; p.mo += 150; p.addFlag('omn_jebel_akhdar_survivor') } },
      { text: 'You are eight and what you remember is the water', tag: null, outcome: 'The channel above the village ran for eight hundred years and then it did not, and the date palms went brown in the order of their distance from it.', effect: (p) => { p.m -= 10; p.h -= 4; p.addFlag('omn_jebel_akhdar_survivor'); p.addFlag('omn_falaj_destroyed') } },
    ],
    effect: null,
  },

  {
    id: 'omn_zanzibar_return',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_OM(G) &&
      G.ethnicity === 'zanzibari_omani' &&
      G.currentYear >= 1964 && G.currentYear <= 1985 &&
      G.age >= 8 &&
      !G.mem?.omnZanzibar,
    text: 'The family came back from Zanzibar after the revolution — some of them did, the ones who could get out — and the language of the house is Swahili and the food is Swahili and the country you have returned to is one your grandparents left four generations ago. You are Omani by descent and by passport and by nothing else. At school your Arabic is corrected. There is a word for people like you and it is said in a particular tone, and Muscat is full of you.',
    choices: [
      { text: 'Keep the Swahili. It is what the family is.', tag: 'defiant', outcome: 'You speak it at home for sixty years and your children speak it badly and your grandchildren not at all.', effect: (p) => { p.m += 6; p.s += 4; p.addFlag('omn_zanzibari_identity'); p.addFlag('heritage_language_kept') } },
      { text: 'Become as Omani as the paperwork says', tag: 'yielding', outcome: 'The accent goes inside two years. Something else goes with it that takes longer to notice.', effect: (p) => { p.e += 5; p.m -= 5; p.addFlag('omn_zanzibari_assimilated') } },
    ],
    effect: null,
  },

  {
    id: 'omn_expat_workforce',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1985 &&
      G.age >= 20 &&
      G.ethnicity !== 'south_asian_omani' &&
      !G.mem?.omnExpat,
    text: 'Half the people working in this country are not from it. The man who builds your house is from Kerala and the woman who raises your children is from Luzon and the engineer signing off the road is from Peshawar, and none of them can ever be Omani no matter how many decades they put in. There is a policy called Omanisation with quotas and targets, and there is also a set of jobs nobody here will take at the wage offered. Both of those things are true and the second one is not discussed.',
    choices: [
      { text: 'Notice the arrangement and say something about it', tag: 'defiant', outcome: 'It is not a popular observation. You make it anyway, occasionally, and are thought of as difficult.', effect: (p) => { p.karma += 7; p.s -= 3; p.addFlag('omn_kafala_critical') } },
      { text: 'It is how the country works', tag: 'yielding', outcome: 'You are decent to the people in your own house and incurious about the system they are inside.', effect: (p) => { p.m += 2; p.karma -= 3; p.addFlag('omn_kafala_accepted') } },
    ],
    effect: null,
  },

  {
    id: 'omn_ibadi_mediation',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_OM(G) &&
      G.currentYear >= 1980 &&
      G.age >= 25 &&
      !G.mem?.omnIbadi,
    text: 'Your neighbours across the Gulf are in a quarrel and Oman is talking to both of them, which is what Oman does. The Ibadi tradition came out of the same seventh-century quarrel as the other two and answered it a third way — the imam is elected and can be deposed, and neither of the big answers is the one you were raised inside. That third position has hardened over three centuries into a foreign policy: the Iran channel, the Yemen back-door, the embassy that stays open. It is a small country being useful on purpose. When you travel you find that this is the thing people know about the place, if they know anything.',
    choices: null,
    effect: (p) => {
      p.e += 5; p.karma += 4; p.m += 3
      p.addFlag('omn_ibadi_formation')
      p.setMem('omnIbadi', true)
    },
  },

  // ── Vanuatu ──

  {
    id: 'vut_condominium',
    phase: null,   // guard carries its own 6-16 band; 'childhood' was cutting five years off it
    weight: 9,
    when: (G) =>
      IS_VU(G) &&
      G.currentYear >= 1935 && G.currentYear <= 1980 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.vutCondominium,
    text: 'There are two of everything. Two police forces with two uniforms, two school systems in two languages, two currencies, two sets of courts, and if you are charged by one you may elect the other. Which school you attend determines which European language you will spend your life in and therefore which half of the country you can talk to. Everyone calls the arrangement the Pandemonium. Nothing about it was designed for anyone who lives here.',
    choices: [
      { text: 'The English school', tag: null, outcome: 'You come out speaking English and Bislama and unable to follow a conversation in half of Port Vila.', effect: (p) => { p.e += 6; p.addFlag('vut_anglophone'); p.addFlag('vut_condominium_childhood') } },
      { text: 'The French school', tag: null, outcome: 'You come out speaking French and Bislama and on the losing side of independence, which nobody mentions in 1965.', effect: (p) => { p.e += 6; p.addFlag('vut_francophone'); p.addFlag('vut_condominium_childhood') } },
    ],
    effect: null,
  },

  {
    id: 'vut_american_base',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_VU(G) &&
      G.currentYear >= 1942 && G.currentYear <= 1947 &&
      G.age >= 6 &&
      !G.mem?.vutBase,
    text: 'Half a million American servicemen pass through Espiritu Santo, on an archipelago of perhaps fifty thousand people. There are roads and airstrips and Coca-Cola and Black soldiers being paid the same as white ones, which is noticed. When it ends they bulldoze the surplus into the sea at a place that is still called Million Dollar Point, and you can wade out at low tide and stand on a jeep. On Tanna the John Frum movement is already several years old by the time the first American lands — it started as a refusal of the mission and the head tax — and what the base gives it is a uniform, a flag and a date to keep waiting for.',
    choices: null,
    effect: (p) => {
      p.mo += 200; p.e += 6; p.m += 4
      p.addFlag('vut_american_years')
      p.setMem('vutBase', true)
    },
  },

  {
    id: 'vut_independence_1980',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_VU(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1982 &&
      G.age >= 10 &&
      !G.mem?.vutIndep,
    text: 'July the thirtieth and the two flags come down. It does not go smoothly: on Espiritu Santo a secessionist movement backed by francophone settlers and an American land-rights foundation declares its own republic, and Papua New Guinean troops are flown in to end it. The first prime minister is an Anglican priest. The constitution puts all land back under custom ownership, which means it cannot really be sold, only leased and argued over — the single most consequential sentence in the country\'s law.',
    choices: null,
    effect: (p) => {
      p.m += 12; p.karma += 5; p.e += 4
      p.addFlag('vut_independence_generation')
      p.setMem('vutIndep', true)
    },
  },

  {
    id: 'vut_kastom_land',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_VU(G) &&
      G.currentYear >= 1982 &&
      G.age >= 22 &&
      !G.mem?.vutLand,
    text: 'The land belongs to the line it has always belonged to and the question of who that is now runs through four brothers, two islands and a marriage in 1953. There is a lease application from someone who wants to build bungalows and it requires a signature from the custom owner, and establishing who that is takes three years, two meetings in the nakamal and a payment of pigs and mats that is a legal instrument and not a metaphor. When it is settled the money is real and so is the grievance.',
    choices: [
      { text: 'Push your family\'s claim', tag: 'defiant', outcome: 'You win the signature and the lease money and a cousin who does not speak to you for eleven years.', effect: (p) => { p.mo += 3800; p.w += 6; p.s -= 5; p.addFlag('vut_land_claim_won'); p.addFlag('family_rift') } },
      { text: 'Defer to the elder line and keep the family whole', tag: 'yielding', outcome: 'You get nothing and you are the person everyone comes to next time, which is its own currency.', effect: (p) => { p.karma += 8; p.s += 6; p.m += 5; p.addFlag('vut_land_deferred') } },
    ],
    effect: null,
  },

  {
    id: 'vut_cyclone_pam',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_VU(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2017 &&
      G.age >= 8 &&
      !G.mem?.vutPam,
    text: 'March, category five, and it goes over the middle of the country for most of a night. In the morning most of the housing stock in Port Vila is not housing any more and the gardens — which is where the food is — are stripped to the stem. You rebuild with what the aid flights bring and with what was always used, and the second thing lasts better. Afterwards the government takes the case for climate liability to the International Court of Justice, which is what a country with no leverage does with a grievance.',
    choices: [
      { text: 'Rebuild the way it was built before', tag: null, outcome: 'Low, tied down, palm thatch that gives instead of tearing. It is standing after the next one.', effect: (p) => { p.h -= 6; p.mo -= 600; p.karma += 6; p.addFlag('vut_rebuilt_kastom'); p.addFlag('climate_displaced') } },
      { text: 'Rebuild with the corrugated iron and the concrete', tag: null, outcome: 'It is faster and drier and it is the thing that peels off in 2023.', effect: (p) => { p.h -= 5; p.mo -= 1400; p.m -= 4; p.addFlag('vut_rebuilt_modern'); p.addFlag('climate_displaced') } },
    ],
    effect: null,
  },

  // ── Bhutan ──

  {
    id: 'btn_serfdom_abolished',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_BT(G) &&
      G.currentYear >= 1956 && G.currentYear <= 1968 &&
      G.age >= 10 &&
      !G.mem?.btnSerf,
    text: 'The king abolishes serfdom and your family is on the list of people it applied to. There is land now, in your name, in a country with no paved road and no currency in general circulation and no relations with anybody except India. The first school opens within a day\'s walk. Your father does not entirely believe the arrangement will hold and works as though it will not, which is how people who have been owned tend to hold good news.',
    choices: null,
    effect: (p) => {
      p.m += 10; p.w += 5; p.karma += 4
      p.addFlag('btn_serfdom_freed')
      p.setMem('btnSerf', true)
    },
  },

  {
    id: 'btn_lhotshampa_1990',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_BT(G) &&
      G.ethnicity === 'lhotshampa' &&
      G.currentYear >= 1988 && G.currentYear <= 1994 &&
      G.age >= 8 &&
      !G.mem?.btnLhotshampa,
    text: 'The dress code becomes law and the language of instruction becomes Dzongkha and the census is applied backwards, so the documents your grandfather did or did not keep in 1958 now decide whether your family was ever here. Your father cannot produce a tax receipt from thirty years ago. There is a form to sign that says the departure is voluntary. Roughly a sixth of the country goes over the border into camps in eastern Nepal, and the country the world is told about is the one with Gross National Happiness in it.',
    choices: [
      { text: 'Sign and go', tag: null, outcome: 'Twenty years in a camp at Damak, then a resettlement flight to a city in Ohio you had never heard of.', effect: (p) => { p.m -= 20; p.mo -= 1200; p.setResidency('refugee_status'); p.addFlag('btn_lhotshampa_expelled'); p.addFlag('refugee'); p.addFlag('lost_home') } },
      { text: 'Refuse. Stay. Find the papers.', tag: 'defiant', outcome: 'You stay, on sufferance, with a citizenship category that is checked every time you need anything.', effect: (p) => { p.m -= 14; p.e += 4; p.addFlag('btn_lhotshampa_stayed'); p.addFlag('minority_under_pressure') } },
    ],
    effect: null,
  },

  {
    id: 'btn_television_1999',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_BT(G) &&
      G.currentYear >= 1999 && G.currentYear <= 2004 &&
      G.age >= 10 &&
      !G.mem?.btnTv,
    text: 'Television and the internet are legalised in the same year, the last country on earth to do it, and within eighteen months there is cable in Thimphu with forty-six channels on it, most of them Indian. The argument in the newspaper is about wrestling and about what the advertisements are teaching children to want. You watch a great deal of it. The thing that actually changes is not the content but the arrival of a permanent comparison: for the first time, this place can be measured against somewhere else, hourly.',
    choices: null,
    effect: (p) => {
      p.e += 6; p.m += 4
      p.addFlag('btn_television_generation')
      p.setMem('btnTv', true)
    },
  },

  {
    id: 'btn_democracy_2008',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_BT(G) &&
      G.currentYear >= 2006 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.btnDemocracy,
    text: 'The king abdicates in favour of his son and instructs the country to become a parliamentary democracy, and the country is not enthusiastic. There are mock elections to practise on. People ask, in public meetings, why they should choose between parties when the king has been doing it competently and for free. The constitution is adopted anyway. You vote in the first election with a feeling that is closer to obedience than to enfranchisement, which is a strange thing to carry into a polling station.',
    choices: null,
    effect: (p) => {
      p.e += 6; p.karma += 4; p.m += 3
      p.addFlag('btn_first_election')
      p.setMem('btnDemocracy', true)
    },
  },
]

// ─── Follow-through ──────────────────────────────────────────────────────────

export const OMAN_PACIFIC_BHUTAN_FOLLOWTHROUGH = [

  {
    id: 'omn_ft_two_countries',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('omn_renaissance_generation') &&
      G.age >= 58 &&
      !G.mem?.omnFtTwo,
    text: 'Your grandchild is at a university in Muscat and has an opinion about the traffic. You were taken to a doctor by boat. The distance between those two sentences is one lifetime and you are the only person in the room who can feel it as distance rather than as history. You have tried explaining the permits — for the sunglasses, for the lock on a door — and it does not land, because it is not credible.',
    choices: null,
    effect: (p) => {
      p.m += 9; p.e += 3
      p.addFlag('omn_two_countries_carried')
      p.addFlag('memory_keeper')
      p.setMem('omnFtTwo', true)
    },
  },

  {
    // The follow-through the design principle requires: the flag has to become
    // something twenty years later. The imamate lost, and what losing produced
    // was a generation of interior families with an exile branch and a subject
    // that does not come up.
    id: 'omn_ft_imamate_after',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      IS_OM(G) &&
      G.flags.has('omn_imamate_family') &&
      G.currentYear >= 1975 &&
      G.age >= 32 &&
      !G.mem?.omnImamateAfter,
    text: 'The new Sultan is building schools in the interior faster than anyone can staff them and the roads go where the tracks were, and it is all genuinely good, and your family does not discuss the fifties. An uncle in Dammam sends money at Eid and has never come back and will not be buried here. You are in a government office in Nizwa filling in a form under a portrait, and the office is the best thing that has happened to this town in your lifetime, and both of these facts are true at once.',
    choices: [
      { text: 'Take the job and say nothing', tag: 'yielding', outcome: 'You are good at it for thirty years. The subject never comes up and the not-coming-up is a skill.', effect: (p) => { p.mo += 3000; p.w += 6; p.m += 4; p.addFlag('omn_imamate_buried') } },
      { text: 'Tell your children the other version', tag: 'defiant', outcome: 'You tell it once, properly, in the kitchen, and ask them not to repeat it, which is how it was told to you.', effect: (p) => { p.m += 6; p.karma += 6; p.addFlag('omn_imamate_transmitted'); p.addFlag('family_secret_kept') } },
    ],
    effect: null,
  },

  {
    id: 'omn_ft_oil_finite',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('omn_renaissance_generation') &&
      G.currentYear >= 2014 &&
      G.age >= 40 &&
      !G.mem?.omnFtOil,
    text: 'The price halves and the budget does not, and the word in every speech is diversification, which has been in every speech since you were thirty. Oman was never rich the way the neighbours were rich; the oil was always described as finite, out loud, by the state. That honesty was unusual and it did not produce a different outcome, and your children are applying for jobs in a private sector that is still mostly other people.',
    choices: null,
    effect: (p) => {
      p.mo -= 1800; p.m -= 5; p.e += 3
      p.addFlag('omn_diversification_doubt')
      p.setMem('omnFtOil', true)
    },
  },

  {
    id: 'vut_ft_language_divide',
    phase: null,
    weight: 6,
    when: (G) =>
      (G.flags.has('vut_anglophone') || G.flags.has('vut_francophone')) &&
      G.age >= 30 &&
      !G.mem?.vutFtLang,
    text: 'The ministry is anglophone and the paperwork is in English, and if you went to the French school in 1962 the ceiling is at a height somebody else set. Bislama is what everybody actually speaks — the language the condominium accidentally produced, the only one all hundred-odd language groups share — and it is the third official one. In the office it is used for the parts of the conversation that matter and neither of the other two for the rest.',
    choices: null,
    effect: (p) => {
      p.e += 4; p.m -= 3; p.s += 3
      p.addFlag('vut_bislama_working_language')
      p.setMem('vutFtLang', true)
    },
  },

  {
    id: 'vut_ft_next_cyclone',
    phase: null,
    weight: 6,
    when: (G) =>
      (G.flags.has('vut_rebuilt_kastom') || G.flags.has('vut_rebuilt_modern')) &&
      G.currentYear >= 2023 &&
      G.age >= 20 &&
      !G.mem?.vutFtNext,
    text: 'Two category fours inside three days, which was not a thing that used to be on the list of things that happen. The season starts earlier than it did when you were young and you are not guessing about that — you have a roof that has been replaced twice and a garden that has been replanted four times, and the interval is shortening. The court case is still running. The rain is not waiting for it.',
    choices: null,
    effect: (p) => {
      p.h -= 6; p.mo -= 900; p.m -= 7
      p.addFlag('vut_climate_reckoning')
      p.setMem('vutFtNext', true)
    },
  },

  {
    id: 'btn_ft_camp_generation',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('btn_lhotshampa_expelled') &&
      G.age >= 30 &&
      !G.mem?.btnFtCamp,
    text: 'The resettlement put your family in Ohio and your brother\'s in Queensland and a cousin in Alberta, and the camp that held all of you for twenty years is closed and grassed over. Bhutan is on a poster at the travel agent where you buy the flights to see them — mountains, a monastery, a word about happiness. You have never once been able to decide what to say when somebody reads the poster out loud.',
    choices: [
      { text: 'Tell them', tag: 'defiant', outcome: 'You explain the census and the dress code and watch it not fit into what they already know.', effect: (p) => { p.e += 5; p.karma += 7; p.m -= 4; p.addFlag('btn_told_the_story') } },
      { text: 'Say it is beautiful, which is true', tag: 'yielding', outcome: 'It is easier and it is not a lie and you are tired.', effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('btn_kept_it_in') } },
    ],
    effect: null,
  },

  {
    id: 'btn_ft_gnh_question',
    phase: null,
    weight: 5,
    when: (G) =>
      (G.flags.has('btn_television_generation') || G.flags.has('btn_first_election')) &&
      G.currentYear >= 2012 &&
      G.age >= 28 &&
      !G.mem?.btnFtGnh,
    text: 'Gross National Happiness is a real instrument — it has stopped roads, refused mines, capped the hotels — and it is also the line the country leads with abroad, which means it has to keep being true. There is a survey, with domains and indicators, and you have filled it in. Meanwhile the young are going to Perth and Brisbane on student visas in numbers the survey does not have a domain for.',
    choices: null,
    effect: (p) => {
      p.e += 5; p.m -= 3
      p.addFlag('btn_gnh_examined')
      p.setMem('btnFtGnh', true)
    },
  },
]

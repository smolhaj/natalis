// Nigeria depth arc events
// Covers: military coup culture (1966–1999) and the coups the 1962 cohort lived
// one by one, June 12 1993 and the Abacha years as lived, Boko Haram seen from
// Kano, sharia seen from Sabon Gari, the Niger Delta oil community, the naira
// crisis 2023–24, inter-ethnic navigation.
// Biafra arc already exists in events_country_arcs_3.js and events_nigeria_midcentury.js.
// Oil boom/SAP/Saro-Wiwa/EndSARS already in events_west_africa.js.
// The North-East insurgency chain and sharia from inside the Hausa-Muslim north
// live in events_nigeria_north.js; the versions here are for the characters
// that module does not stand beside.
//
// Dates used, all checked:
//   29 July 1975   Gowon removed while at the OAU summit in Kampala; Murtala
//                  Mohammed; >10,000 public officers retired "with immediate effect"
//   13 Feb 1976    Murtala Mohammed killed in traffic in Ikoyi, Lagos; Dimka's
//                  coup fails the same day; Dimka captured March 1976, executed May
//   31 Dec 1983    Buhari's coup ends the Second Republic; Brigadier Sani Abacha
//                  reads the broadcast
//   27 Aug 1985    Babangida's coup, again first announced by Abacha; the IMF loan
//                  debate that autumn; SAP adopted without the loan in 1986
//   12 June 1993   presidential election, Abiola (SDP) with Babagana Kingibe, a
//                  Kanuri from Borno; Abiola carries Kano, Tofa's home state
//   23 June 1993   annulment; Lagos riots in July; Babangida steps aside 26 Aug
//                  for Shonekan's Interim National Government
//   17 Nov 1993    Abacha takes power
//   11 June 1994   Abiola declares himself president at Epetedo, Lagos Island;
//                  arrested 23 June; NUPENG and PENGASSAN strike July–Sept 1994
//   4 June 1996    Kudirat Abiola shot dead in her car in Lagos; Radio Kudirat
//                  begins broadcasting from abroad
//   March 1997     Soyinka (in exile since late 1994) charged with treason in absentia
//   8 June 1998    Abacha dies at Aso Rock; buried in Kano the same day
//   7 July 1998    Abiola dies in detention during a meeting with a US delegation
//   Oct 1999–2002  twelve northern states adopt sharia criminal law; Kano 2000
//   20 Jan 2012    coordinated bombings in Kano kill some 185 people
//   Jan–Feb 2023   naira redesign cash crunch; subsidy removal 29 May 2023
//   6 June 2018    June 12 declared Democracy Day, Abiola made GCFR posthumously;
//                  first observed as a public holiday 12 June 2019
//   2017–2020      Abacha loot returns: ~$322m from Switzerland, ~$308m via Jersey
//                  and the United States

const IS_NG = (G) => (G.currentCountry?.name ?? G.character?.country?.name) === 'Nigeria'
const REGION = (G) => G.place?.region ?? null
const LAGOS = (G) => G.place?.id === 'ng_lagos'
const SOUTHWEST = (G) => REGION(G) === 'Southwest Nigeria'
const NORTH_KANO = (G) => REGION(G) === 'North Nigeria'
const DELTA = (G) => REGION(G) === 'Niger Delta'
const CHRISTIAN = (G) => String(G.religion ?? '').startsWith('christian')
const once = (G, key) => !G.mem?.[key]

export const NIGERIA_EVENTS = [

  {
    id: 'nga_coup_culture',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nigeria' &&
      G.currentYear >= 1966 && G.currentYear <= 1998 &&
      G.age >= 18 &&
      !G.mem?.ngaCoupCulture,
    text: 'Another coup, or the threat of one, or the anniversary of the last. Since January 1966 the army has moved through the government more than the politicians have: Ironsi, Gowon, Murtala, Obasanjo, Buhari, Babangida, Abacha. The names change and the uniform stays; what changes is which faction is up and how much it takes. The constitution is a document that can be suspended. You have seen it suspended before.',
    choices: [
      {
        text: 'Learn to navigate the patronage system.',
        tag: 'nga_learned_patronage',
        outcome: 'The patronage network is visible once you know how to read it. You learn the reading. It makes you useful and makes you complicit in a way you try not to examine too carefully.',
        effect: (p) => { p.s += 3; p.karma -= 3; p.addFlag('nga_military_era'); p.addFlag('regime_self_censorship'); p.setMem('ngaCoupCulture', true); },
      },
      {
        text: 'Keep your head down and your opinions private.',
        tag: null,
        outcome: 'The private person and the public person develop different vocabularies. You become fluent in both without intending to.',
        effect: (p) => { p.r += 4; p.addFlag('nga_military_era'); p.addFlag('learned_silence'); p.setMem('ngaCoupCulture', true); },
      },
    ],
    effect: null,
  },

  // ── THE COUPS, ONE AT A TIME ───────────────────────────────────────────────
  // nga_coup_culture is the general condition; these are the mornings. Each is
  // one calendar year and claims it, because a 1962 child was thirteen for the
  // first and twenty-three for the last and a weight-4 summary reached neither.

  {
    id: 'nga_coup_1975',
    phase: null,
    weight: 400,
    claimsYears: { from: 1975, to: 1975 },
    when: (G) => IS_NG(G) && G.currentYear === 1975 && G.age >= 8 && once(G, 'nga_coup_1975'),
    text: 'Gowon is at a summit in Kampala on the twenty-ninth of July when the radio at home says he is no longer head of state. Nobody is killed, which people remark on. The new man, Murtala Mohammed, gives a date for civilian rule and then begins retiring people — judges, officers, clerks, more than ten thousand of them, "with immediate effect", a phrase the whole country learns that summer. A man on your road is one of them. For a month he sits on his veranda at the hour he used to leave for work.',
    context: 'On 29 July 1975, while Yakubu Gowon attended the OAU summit in Kampala, officers removed him in a bloodless coup and installed Murtala Mohammed, who set a timetable for return to civilian rule and dismissed more than ten thousand public servants in a purge of the civil service.',
    choices: null,
    effect: (p) => { p.setMem('nga_coup_1975', true); p.e += 2; p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_coup_1976',
    phase: null,
    weight: 400,
    claimsYears: { from: 1976, to: 1976 },
    when: (G) => IS_NG(G) && G.currentYear === 1976 && G.age >= 8 && once(G, 'nga_coup_1976'),
    text: (G) => 'The thirteenth of February. Murtala Mohammed is shot in his car in the morning traffic in Ikoyi, going to work without an escort, which was the point he had been making. A colonel called Dimka reads a statement on the radio, and then the radio plays music for a long time, and by evening the coup has failed and the head of state is still dead.' +
      (LAGOS(G) ? ' You know the road. Everybody at your school knows somebody who was on it that morning.' : ' The story reaches you with the traffic in it, the car, the hour.') +
      ' Dimka is found in March. The airport is given the dead man\'s name, and Obasanjo, who was his deputy, keeps the date for civilians.',
    context: 'Murtala Mohammed was assassinated on 13 February 1976 in a failed coup led by Lt. Col. Buka Suka Dimka, who was captured in March and executed with other conspirators. Olusegun Obasanjo succeeded him and handed power to an elected civilian government in 1979.',
    choices: null,
    effect: (p) => { p.setMem('nga_coup_1976', true); p.m -= 3; p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_coup_1983',
    phase: null,
    weight: 400,
    claimsYears: { from: 1984, to: 1984 },
    when: (G) => IS_NG(G) && G.currentYear === 1984 && G.age >= 8 && once(G, 'nga_coup_1983'),
    text: 'The new year starts with martial music on the radio where the news should be. Then a brigadier named Sani Abacha reads a statement: the Second Republic, Shagari, the parties, the whole four years of it, ended overnight. What you remember afterwards is that nobody on your street is sorry. Rice had become a sentence people could not finish, and for about a week the coup is a relief, and it takes a little longer than that to notice who is now in charge of what.',
    context: 'On 31 December 1983 the army removed President Shehu Shagari and ended the Second Republic; Brigadier Sani Abacha read the broadcast, and Major-General Muhammadu Buhari became head of state. The coup was widely welcomed amid the oil-price collapse and the corruption of the civilian years.',
    choices: null,
    effect: (p) => { p.setMem('nga_coup_1983', true); p.e += 2; p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_coup_1985',
    phase: null,
    weight: 400,
    claimsYears: { from: 1985, to: 1986 },
    when: (G) => IS_NG(G) && G.currentYear >= 1985 && G.currentYear <= 1986 && G.age >= 8 && once(G, 'nga_coup_1985'),
    text: 'In August of 1985 the same voice that read the last coup reads this one — Abacha again — and then a general with a gap in his teeth talks about human rights and lets the journalists out of prison. He asks the country whether it should take the IMF loan, and the country answers no, loudly, for weeks, in every newspaper and every bar. He takes the programme anyway, without the loan. You learn his nickname before you learn the programme\'s.',
    context: 'Ibrahim Babangida took power on 27 August 1985; Sani Abacha again made the first broadcast. Babangida released detained journalists, opened a national debate on an IMF loan that the public overwhelmingly rejected, and then introduced the Structural Adjustment Programme in 1986 on IMF lines without the loan.',
    choices: null,
    effect: (p) => { p.setMem('nga_coup_1985', true); p.e += 2; p.addFlag('nga_military_era') },
  },

  // ── JUNE 12 AND THE ABACHA YEARS ───────────────────────────────────────────

  {
    id: 'nga_june12_1993',
    phase: null,
    weight: 600,
    claimsYears: { from: 1993, to: 1993 },
    when: (G) =>
      IS_NG(G) &&
      G.currentYear === 1993 &&
      G.age >= 16 &&
      !G.mem?.ngaJune12,
    text: (G) => 'Saturday the twelfth of June. You vote, or you stand beside somebody who does, in a queue the observers will call the most orderly they have seen. The results come in on the radio state by state, and Abiola — a Yoruba Muslim, with a Kanuri from Borno on the ticket — is winning nearly everywhere, including Kano, which is his opponent\'s own state. On the twenty-third the result is annulled. There is no reason anybody can repeat with a straight face.' +
      (SOUTHWEST(G) || LAGOS(G)
        ? ' In July the Southwest shuts itself: no work, no market, burning tyres at the junctions, and soldiers who shoot.'
        : NORTH_KANO(G)
          ? ' In Kano people say, carefully, that a man lost his own state and the count was still honest, and that this is exactly why it was unmade.'
          : ' The strikes start in Lagos and the stories travel from there.') +
      ' In August Babangida steps aside for a civilian nobody voted for. In November a general takes the civilian\'s place.',
    context: 'The 12 June 1993 presidential election, won by M.K.O. Abiola of the SDP, is widely regarded as the freest in Nigeria\'s history. Babangida annulled it on 23 June; protests and strikes followed, with scores killed in Lagos. He handed over to Ernest Shonekan\'s Interim National Government in August, which Sani Abacha displaced on 17 November 1993.',
    choices: [
      {
        text: 'Join the pro-democracy protests.',
        tag: 'defiant',
        outcome: 'The protest is real and the government is not interested in the protest. You carry June 12 as an argument about what Nigerian democracy is and is not.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.r += 6; p.addFlag('nga_june12_generation'); p.addFlag('nga_military_era'); p.addFlag('activist'); p.addFlag('political_aware'); p.setMem('ngaJune12', true); },
      },
      {
        text: 'Stay indoors and keep the radio low.',
        tag: 'yielding',
        outcome: 'You see how completely a result can be erased. The vote was real and is now not real. The lesson this teaches about Nigerian democracy does not leave you.',
        effect: (p) => { p.m -= 10; p.r += 7; p.karma += 3; p.addFlag('nga_june12_generation'); p.addFlag('nga_military_era'); p.addFlag('political_aware'); p.setMem('ngaJune12', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_abiola_detained_1994',
    phase: null,
    weight: 500,
    claimsYears: { from: 1994, to: 1994 },
    when: (G) => IS_NG(G) && G.currentYear === 1994 && G.age >= 14 && once(G, 'nga_abiola_1994'),
    text: (G) => 'On the first anniversary Abiola stands up in a house in Epetedo, on Lagos Island, and declares himself president. Twelve days later he is arrested. In July the oil workers strike for him, the drivers\' union and then the senior staff, and for two months the petrol stops, in an oil country, over one man in a cell.' +
      ((G.assets?.vehicles?.length ?? 0) > 0
        ? ' Your car stays where it is.'
        : ' The danfo fares go up and then the danfos stop.') +
      ' Then the union leaders are arrested too, and the strike ends, and he is still in the cell.',
    context: 'Abiola declared himself president at Epetedo on 11 June 1994 and was arrested on 23 June. The oil unions NUPENG and PENGASSAN struck from July to September 1994 demanding his release; the regime dissolved their executives and detained their leaders.',
    choices: null,
    effect: (p) => { p.setMem('nga_abiola_1994', true); p.m -= 4; p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_kudirat_1996',
    phase: null,
    weight: 500,
    claimsYears: { from: 1996, to: 1996 },
    when: (G) => IS_NG(G) && G.currentYear === 1996 && G.age >= 14 && !DELTA(G) && once(G, 'nga_kudirat'),
    text: (G) => 'Kudirat Abiola is shot in her car on the fourth of June, ' +
      (LAGOS(G) ? 'on a road you use, in daylight.' : 'in Lagos, in daylight.') +
      ' She had spent two years campaigning for her husband\'s release. Nobody is charged. Everybody knows, the way a city knows something it cannot say at a bus stop. Before the year is out a radio station is broadcasting from somewhere outside the country in her name, and you learn which hour it is on, and you learn how low the volume can go and still be heard.',
    context: 'Kudirat Abiola, wife of the detained president-elect and a leading pro-democracy campaigner, was assassinated in Lagos on 4 June 1996. Members of Abacha\'s security apparatus were later tried for the killing. Radio Kudirat, run by exiled NADECO activists, broadcast into Nigeria from abroad.',
    choices: null,
    effect: (p) => { p.setMem('nga_kudirat', true); p.m -= 6; p.addFlag('nga_kudirat_1996'); p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_abacha_fear_1997',
    phase: null,
    weight: 400,
    claimsYears: { from: 1997, to: 1997 },
    when: (G) => IS_NG(G) && G.currentYear === 1997 && G.age >= 16 && once(G, 'nga_fear_1997'),
    text: 'The newspapers that are still printing print carefully. Soyinka is abroad and is charged with treason anyway, in his absence, with others who are also abroad. The NADECO people are in London, in Washington, in Cotonou, and the ones who did not go are in Kirikiri. There are bombs in Lagos that the government says the democrats planted and the democrats say the government planted, and the only thing you know for certain is that you now stand farther from parked cars than you used to.',
    context: 'Under Sani Abacha (1993–98), pro-democracy leaders of the National Democratic Coalition went into exile or were detained; Wole Soyinka, who fled in 1994, was charged with treason in absentia in 1997. A series of bombings in Lagos in 1996–97 were blamed by the regime on its opponents.',
    choices: null,
    effect: (p) => { p.setMem('nga_fear_1997', true); p.m -= 4; p.addFlag('learned_silence'); p.addFlag('nga_military_era') },
  },

  {
    id: 'nga_1998_two_deaths',
    phase: null,
    weight: 700,
    claimsYears: { from: 1998, to: 1998 },
    when: (G) => IS_NG(G) && G.currentYear === 1998 && G.age >= 12 && once(G, 'nga_1998'),
    text: (G) => 'On the eighth of June the radio says Abacha is dead, at Aso Rock, of his heart, and the rest of the country says other things.' +
      (NORTH_KANO(G)
        ? ' He is buried in Kano before sunset, as the religion requires, and the city is quiet, partly in mourning and partly not.'
        : ' In Lagos people come out and dance in the road, which you have never seen anybody do for a death.') +
      ' Everyone says Abiola will be released now. On the seventh of July, at a meeting with the Americans who have come to discuss exactly that, Abiola drinks a cup of tea and says he is unwell, and he is dead that afternoon.' +
      (SOUTHWEST(G) || LAGOS(G) ? ' The Yoruba towns burn for three days.' : '') +
      ' Two men, five weeks, and you are never going to know which of the two endings you believe.',
    context: 'Sani Abacha died suddenly on 8 June 1998 and was buried in Kano the same day. M.K.O. Abiola died in detention on 7 July 1998 during a meeting with a US delegation, officially of a heart attack. Riots followed in Lagos and the Southwest. General Abdulsalami Abubakar completed the transition to civilian rule in May 1999.',
    choices: null,
    effect: (p) => { p.setMem('nga_1998', true); p.m -= 3; p.e += 3; p.addFlag('nga_abacha_years'); p.addFlag('nga_military_era') },
  },

  // nga_democracy_1999 (the 29 May 1999 handover) was merged into ngm_1999 in
  // events_nigeria_midcentury.js: the same day, the same year, one slot, and
  // at weight 4 against 999 it reached 3% of the Nigerians who lived it. ngm_1999
  // now sets nga_democracy_generation as well, for this module's texture and
  // follow-through.

  // Kano, not the North-East. The North-East — Maiduguri, Borno, Chibok, the
  // camps — is events_nigeria_north.js. This was telling characters in Lagos and
  // Benue "You are in the North".
  {
    id: 'nga_boko_haram',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NG(G) &&
      G.currentYear >= 2009 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      NORTH_KANO(G) &&
      !G.mem?.ngaBokoHaram,
    text: (G) => 'The name means "Western education is forbidden". What it has become in the North-East is a different category of thing — schools and markets and churches and mosques, the kidnappings, the counterinsurgency that takes what it takes. Kano is not the North-East. Kano is also not far enough from it.' +
      // The January 2012 bombings are nn_kano_2012 in events_nigeria_north.js.
      (G.currentYear >= 2012 ? ' Since January 2012 there are sandbags outside every police station in the city, and you know which ones they were.' : ' The checkpoints on the Maiduguri road multiply.') +
      (G.currentYear >= 2014 ? ' Then Chibok, the girls taken from their dormitory in April 2014, and a hashtag that the whole world uses for about a month.' : '') +
      ' The army checkpoint on your own road is both protection and extortion, and you learn which face it is wearing before you reach it.',
    choices: [
      {
        text: 'Move your family south, out of range.',
        tag: 'nga_boko_displaced',
        outcome: 'The city in the South is safer by the measures that matter. It is not home, and they have a word for people from where you are from.',
        effect: (p) => { p.m -= 10; p.r += 8; p.h -= 3; p.addFlag('nga_boko_haram_generation'); p.addFlag('internally_displaced'); p.relocate('ng_lagos', 'working_class'); p.setMem('ngaBokoHaram', true); },
      },
      {
        text: 'Stay. You have lived here your whole life.',
        tag: null,
        outcome: 'Staying requires a different relationship to risk than you have ever had before. The risk is not abstract. You make your arrangements.',
        effect: (p) => { p.m -= 12; p.r += 6; p.h -= 5; p.addFlag('nga_boko_haram_generation'); p.addFlag('regime_self_censorship'); p.setMem('ngaBokoHaram', true); },
      },
    ],
    effect: null,
  },

  // Sharia from inside the Hausa-Muslim household is events_nigeria_north.js.
  // This one is the other address in the same city: Sabon Gari, the strangers'
  // quarter, where the Igbo and Yoruba and Middle Belt Christians of Kano live.
  {
    id: 'nga_sharia_north',
    phase: null,
    weight: 12,
    when: (G) =>
      IS_NG(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2003 &&
      NORTH_KANO(G) && CHRISTIAN(G) &&
      G.age >= 16 &&
      // nn_sharia_2000 (events_nigeria_north.js) already tells 2000-01 to
      // every northern resident, Christians included; this is only for the
      // Sabon Gari household that one missed.
      !G.mem?.nn_sharia &&
      !G.mem?.ngaSharia,
    text: 'Zamfara goes first, in October 1999, and by the middle of 2000 Kano has followed. In Sabon Gari, where the church bells are, the beer parlours close or go behind curtains, and the women who drive their own cars along Bello Road find the stares have a new authority behind them. The governors say the law is for Muslims only. The Hisbah, when they come, do not ask first. On your street the Igbo traders talk every evening about whether it is time to send the children home to the East, and every evening somebody says not yet.',
    context: 'Twelve northern states adopted sharia criminal codes between 1999 and 2002, beginning with Zamfara in October 1999; Kano followed in 2000. The codes formally applied only to Muslims, but alcohol bans, Hisbah enforcement and the riots in Kaduna in 2000 deeply affected northern Christian communities, concentrated in quarters like Kano\'s Sabon Gari.',
    choices: [
      {
        text: 'Stay. The shop is here and so is the church.',
        tag: 'defiant',
        outcome: 'You learn which roads to use on Friday and which evenings to be in by. The shop stays open. The children go East for secondary school anyway.',
        effect: (p) => { p.r += 4; p.addFlag('nga_sharia_transition'); p.addFlag('political_aware'); p.setMem('ngaSharia', true); },
      },
      {
        text: 'Keep your head down and your beer indoors.',
        tag: 'yielding',
        outcome: 'The federal constitution says one thing and the state government another, and you find the space between them is where you now live.',
        effect: (p) => { p.r += 5; p.addFlag('nga_sharia_transition'); p.addFlag('learned_silence'); p.setMem('ngaSharia', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_niger_delta',
    phase: null,
    weight: 25,
    when: (G) =>
      IS_NG(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 16 &&
      DELTA(G) &&
      !G.mem?.ngaDelta,
    text: 'The gas flares have been burning for as long as you can remember, orange all night, the gas that should have been captured burning into the air your family breathes. The spills — Bodo Creek, Ogoniland, the ones that never get a name — coat the mangrove roots and the nets. The company\'s remediation reports say one thing and the people who fish these creeks say another. You are in the community. The argument about who owes it what is older than you are, and it is going to be older than you are for a long time.',
    choices: [
      {
        text: 'Join the advocacy — community meetings, documentation, legal action.',
        tag: 'defiant',
        outcome: 'Ken Saro-Wiwa showed what the ceiling of advocacy looks like in this country. You know the ceiling. You document anyway.',
        effect: (p) => { p.m -= 5; p.h -= 3; p.karma += 8; p.r += 5; p.addFlag('nga_delta_community'); p.addFlag('activist'); p.setMem('ngaDelta', true); },
      },
      {
        text: 'Take the work the oil brings — the catering camp, the boat, the pipeline contract.',
        tag: 'nga_delta_migrant',
        outcome: 'The money is real and the creek stops being where the living comes from. You see the flares from the camp as well.',
        effect: (p) => { p.m -= 6; p.r += 4; p.mo += 400; p.addFlag('nga_delta_community'); p.setMem('ngaDelta', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nga_naira_crisis',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_NG(G) &&
      G.currentYear >= 2023 &&
      G.age >= 18 &&
      !G.mem?.ngaNaira,
    text: (G) => (G.age >= 58
      ? 'The new notes are printed and the old ones withdrawn faster than the new ones arrive, and a city of cash is told to stop using it. You stand at the bank from six in the morning with the other old people, because the transfer app is on a telephone you do not have and the POS man at the junction takes a tenth for handing you your own money. Twice you reach the counter after it has run out.'
      : 'The naira redesign comes first — old notes pulled from circulation faster than new ones arrive, the ATM queues stretching round the block, the POS agent taking a tenth for giving you your own money.') +
      ' In May the new president says the fuel subsidy is gone, and petrol triples by the end of the week.' +
      (G.currentYear >= 2024 ? ' The naira, 460 to the dollar in early 2023, is past 1,500 by early 2024.' : ' The naira goes after it.') +
      ' Everything that is priced in dollars is priced in dollars and everything you are paid is paid in naira, and you do the arithmetic every morning now.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 6; p.w -= 5; p.addFlag('nga_naira_crisis_lived'); p.setMem('ngaNaira', true); },
  },

  {
    id: 'nga_ethnic_navigation',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_NG(G) &&
      G.age >= 18 && G.age <= 45 &&
      ['yoruba', 'igbo', 'hausa_fulani', 'ijaw', 'kanuri', 'other_nigerian'].includes(G.ethnicity) &&
      !G.mem?.ngaEthnicity,
    text: (G) => ['yoruba', 'igbo', 'hausa_fulani'].includes(G.ethnicity)
      ? 'Your tribe is the first piece of information anyone in a room in this country wants. Not always overtly — sometimes through your name, your accent, the church or mosque you mention, where your parents are from. The question is structural: federal character, quota system, which party gets which constituency. Three nations sharing a country the British built to suit the British. You have developed a language for the room — what to emphasise here, what to leave unspecified there, which version of yourself to lead with.'
      : 'Three nations sharing a country: people say it in lecture halls and in bars, Hausa, Yoruba, Igbo, as if the sentence were finished. It does not include you. ' +
        (G.ethnicity === 'kanuri' ? 'Kanuri, an empire older than any of the three, and in Lagos you are taken for Hausa and have stopped correcting anybody.'
          : G.ethnicity === 'ijaw' ? 'Ijaw, the fourth largest, sitting on the oil, and in Lagos they ask which of the three you are nearest to.'
          : 'Tiv, Idoma, Nupe, Ibibio — two hundred and fifty others between them outnumber any one of the three, and none of them is in the sentence.') +
        ' Federal character has a column for you somewhere near the bottom of the form. You learn to be precise about who you are in rooms that were not built with you in mind.',
    choices: [
      {
        text: 'Wear your identity fully — this is who you are.',
        tag: null,
        outcome: 'The identity is full and costs what it costs in rooms that are not yours. You carry it anyway.',
        effect: (p) => { p.s += 2; p.karma += 3; p.addFlag('nga_ethnic_pride'); p.setMem('ngaEthnicity', true); },
      },
      {
        text: 'Learn to move between identities as the room requires.',
        tag: null,
        outcome: 'You become adept at code-switching in a specifically Nigerian way. The switching is a skill and a small daily erasure at the same time.',
        effect: (p) => { p.s += 4; p.r += 3; p.addFlag('dual_identity'); p.setMem('ngaEthnicity', true); },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH ─────────────────────────────────────────────────────────

  {
    id: 'nga_ft_democracy_day_2019',
    phase: null,
    weight: 300,
    claimsYears: { from: 2019, to: 2019 },
    when: (G) => IS_NG(G) && G.currentYear === 2019 && G.flags.includes('nga_june12_generation') && G.age >= 40 && once(G, 'nga_ft_june12_holiday'),
    text: (G) => 'Twenty-six years late, the twelfth of June is a public holiday. Last year, in front of Abiola\'s children, a president who was once a general gave the dead man the country\'s highest honour. You take the day off and do not know what to do with it, so you do what you did in 1993: sit near a radio and listen to people argue about what happened.' +
      (G.flags.includes('nga_kudirat_1996') ? ' Somebody on the programme says Kudirat\'s name, and the room you are in goes still for her in a way it does not for the ceremony.' : ''),
    context: 'On 6 June 2018 President Buhari declared 12 June Democracy Day, replacing 29 May, and conferred Nigeria\'s highest honour, the GCFR, posthumously on M.K.O. Abiola. The holiday was first observed in 2019.',
    choices: null,
    effect: (p) => { p.setMem('nga_ft_june12_holiday', true); p.m += 3; p.r -= 2; p.addFlag('june12_honoured') },
  },

  {
    id: 'nga_ft_abacha_loot',
    phase: null,
    weight: 40,
    when: (G) => IS_NG(G) && G.currentYear >= 2018 && G.currentYear <= 2021 && G.flags.includes('nga_abacha_years') && G.age >= 40 && once(G, 'nga_ft_loot'),
    text: 'Another tranche of it comes home: three hundred million dollars from Switzerland, then three hundred more from Jersey by way of the Americans, twenty years after the man died. There are committees about how it is to be spent. You find you can remember the petrol queues of 1997 exactly, the jerrycans at the roadside, and you start doing the sum of how many litres three hundred million dollars is, and stop.',
    context: 'Switzerland returned about $322 million of funds stolen by Sani Abacha in 2017–18, and some $308 million held in Jersey was repatriated in 2020 under an agreement with the United States. Total recoveries since 1999 exceed $3.6 billion.',
    choices: null,
    effect: (p) => { p.setMem('nga_ft_loot', true); p.r += 2; p.e += 2 },
  },

]

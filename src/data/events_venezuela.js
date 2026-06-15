// Venezuela arc events
//
// Venezuela's story across the Bolivarian revolution and collapse:
//  — 1989 El Caracazo: 3,000 civilians killed by army during protests
//    against IMF austerity. Hugo Chávez, watching from barracks, decides
//    the political class cannot be reformed from inside.
//  — 1992: Chávez leads failed coup. Surrenders on national television,
//    takes full responsibility in a two-minute speech. Becomes a legend.
//  — 1998: Chávez elected with 56% of the vote. The poor majority that
//    had been excluded from pacted democracy — "the people of the cerros"
//    (hillside shanties) — vote overwhelmingly.
//  — 2002: A coup removes Chávez for 47 hours. Masses surround the
//    palace. The army fractures. He returns. Oil strike 2002–03 costs
//    $13 billion. PDVSA management purged.
//  — 2003–2013: Oil at $100/barrel funds the misiones: Barrio Adentro
//    (Cuban doctors), Mercal (subsidised food markets), Robinson literacy,
//    Ribas secondary school, PDVSA-funded housing. Poverty falls by half.
//    Chávez wins the 2004 recall referendum 59–41. Re-elected 2006, 2012.
//  — October 2012: Chávez wins his last election while secretly ill.
//    Dies March 5 2013. Maduro inherits oil at $100 and a state built on
//    it. The price begins its decline.
//  — 2014–2022: Oil falls to $30. The state cannot import food, medicine,
//    spare parts. Supermarket queues; CLAP government food bags; annual
//    inflation reaches 1,000,000%. Seven million Venezuelans leave —
//    the largest displacement in Latin American history.
//  — 2017: Four months of daily street protests. 120 killed. The opposition
//    wins the National Assembly; Maduro creates a parallel Constituent
//    Assembly. Colectivos on motorcycles. Tear gas in the streets.
//    The guarimba (barricade) becomes the word for a specific kind of
//    middle-class resistance.
//  — 2019: Juan Guaidó declares himself president. Couplet attempt.
//    47 countries recognize Guaidó. Maduro retains the army. Nothing changes.
//  — The country that exists now: Maduro stabilizes by dollarizing in
//    practice and allowing private enterprise. The dollar replaces the
//    bolívar in daily commerce. The people who left do not return.
//    The people who stayed have a new country that is not the country they
//    stayed for.

const VENEZUELA_EVENTS = [

  // ── CHÁVEZ ERA: THE HOPE ──────────────────────────────────────────────────────

  {
    id: 'ven_chavez_election_1998',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 1998 && G.currentYear <= 1999 &&
      G.age >= 16 &&
      !G.mem?.ven_chavez98,
    text: (G) => {
      const isWealthy = G.stats.wealth > 55
      return isWealthy
        ? 'December 6, 1998. The votes are counted. Hugo Chávez Frías — the paratrooper who staged the coup in 1992, who surrendered on television and said "por ahora" — has won with 56 percent. Your family is watching from the apartment in el este. Your father says: the barbarians are at the gate. Your mother says: that man is going to destroy everything. You are old enough to notice that the people in the cerros are celebrating with a specific kind of joy that looks like recognition.'
        : 'December 6, 1998. The barbaro from Barinas, the paratrooper who went on television in 1992 and took responsibility for the coup and said "por ahora" — for now — has won the election with 56 percent. The people in your street are celebrating. Not because they believe in him exactly. Because he talked about people like them for the first time in forty years of democracy that functioned as a conversation between two parties that both forgot you.'
    },
    choices: [
      {
        text: 'The hope in the street is real and you feel it.',
        tag: null,
        outcome: 'The misiones arrive. Barrio Adentro — Cuban doctors in the barrio. Mercal — subsidised food. Robinson — the literacy campaign. The poverty numbers fall. For a decade, the project delivers.',
        effect: (p) => { p.m += 6; p.addFlag('chavista_generation'); p.addFlag('ven_chavez_1998_generation'); p.setMem('ven_chavez98', true); },
      },
      {
        text: 'You do not trust this. The populist architecture is visible from where you stand.',
        tag: null,
        outcome: 'The skepticism has a long runway. The country will test it in both directions over the following twenty years.',
        effect: (p) => { p.r += 4; p.addFlag('ven_chavez_1998_generation'); p.setPolitical('dissident'); p.setMem('ven_chavez98', true); },
      },
    ],
    effect: null,
  },

  // ── THE COUP AND RETURN ───────────────────────────────────────────────────────

  {
    id: 'ven_2002_coup',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2002 && G.currentYear <= 2003 &&
      G.age >= 16 &&
      !G.mem?.ven_coup,
    text: (G) => {
      const isWealthy = G.stats.wealth > 55
      return isWealthy
        ? 'April 11, 2002. The march against Chávez turns into a confrontation at the palace. Nineteen people are shot. The military high command appears on television to announce that Chávez has resigned. Pedro Carmona — a businessman — is installed as president. The TV stations celebrate. The business federation celebrates. Then: the people come down from the cerros. The loyal generals move their troops. Forty-seven hours later, Chávez is back. The coup lasted less than two days. Your family stops celebrating.'
        : 'April 11, 2002. The generals say he resigned. He didn\'t. The hours that follow are a compressed course in what the word power means and where it actually lives. The military fractured; the people in the streets came down from the hillside neighborhoods; the loyal generals held their positions. Chávez returns from the island where they took him. The businessmen who signed the Carmona decree go home. You understand something about the country that you could only have understood from watching this specific forty-seven hours.'
    },
    choices: null,
    effect: (p) => { p.e += 4; p.addFlag('ven_2002_coup_lived'); p.setMem('ven_coup', true); },
  },

  // ── THE OIL BOOM ─────────────────────────────────────────────────────────────

  {
    id: 'ven_oil_misiones',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2005 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem?.ven_misiones,
    text: (G) => {
      const isWealthy = G.stats.wealth > 55
      return isWealthy
        ? 'The oil is at ninety, then a hundred dollars a barrel. The PDVSA imports everything — food, cars, spare parts — at the official exchange rate that makes imports cheap and exports nonexistent. The mission hospitals in the poor barrios have Cuban doctors who make house calls. The supermarkets are full. The apartments in el este are selling. The numbers look like a boom. You know the structure underneath the numbers and you are buying dollars at the black market rate anyway.'
        : 'The doctor came to the barrio. Not to the hospital three kilometers away — to the barrio, to the módulo on the corner. That is what Barrio Adentro means: inside the barrio. Your mother learned to read at 54 in the Misión Robinson. The food bags from Mercal cut the weekly food cost by half. Whether you support Chávez or you don\'t, you live in the decade that produced these specific facts about your life.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.w += 4; p.addFlag('ven_oil_boom_lived'); p.setMem('ven_misiones', true); },
  },

  // ── CHÁVEZ DEATH ─────────────────────────────────────────────────────────────

  {
    id: 'ven_chavez_death',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2013 && G.currentYear <= 2013 &&
      G.age >= 15 &&
      !G.mem?.ven_chavez_death,
    text: (G) => {
      const isChavista = G.flags.has('chavista_generation') || G.flags.has('bolivarian_generation')
      return isChavista
        ? 'March 5, 2013. Nicolás Maduro announces it from the state television channel. Chávez has died of cancer at 58. You knew it was coming — the cancer diagnosis in 2011, the surgery, the succession speech in which he named Maduro. Knowing does not prepare you. The people in your street weep the way people weep for a father. The coffin tours the country for two days. You are part of a generation whose political imagination was built around a single person, and that person is dead, and what comes next has not yet been named.'
        : 'March 5, 2013. The announcement comes from Maduro on the state channel. Chávez is dead. Whatever you thought of him, the country is going to change. The oil is still at a hundred dollars a barrel. The successor is the man Chávez chose. The experiment continues without the person who began it, which is a different experiment.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('ven_chavez_death_generation'); p.setMem('ven_chavez_death', true); },
  },

  // ── THE COLLAPSE BEGINS ───────────────────────────────────────────────────────

  {
    id: 'ven_escasez',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2014 && G.currentYear <= 2018 &&
      G.age >= 18 &&
      !G.mem?.ven_escasez,
    text: 'The oil fell. By December 2014 it is below fifty dollars. PDVSA does not have foreign currency to import. The shelves begin to empty. Not all at once — sugar first, then milk, then flour, then medicines, then cooking oil, then diapers. The queue at the supermarket begins at four in the morning. Your ID card is registered to a day of the week for shopping. The bachaqueros — the black market resellers — arrive before the trucks. The CLAP bags come: government food boxes delivered monthly. You receive a CLAP bag or you do not receive a CLAP bag, and the receiving and not-receiving tracks who you are politically, where you live, how visible you are to the local party structure.',
    choices: [
      {
        text: 'You manage. The CLAP bag, the informal economy, the family network — you navigate.',
        tag: null,
        outcome: 'Navigation is not dignity but it is survival. You become expert at what is available when, which queue is worth joining, which contacts can find what.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.w -= 8; p.addFlag('bolivarian_collapse_lived'); p.setMem('ven_escasez', true); },
      },
      {
        text: 'You begin making plans to leave. This is not the country that was promised.',
        tag: null,
        outcome: 'The planning takes time. The planning has its own costs — in money, in the conversations you have to have with people who are staying.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('bolivarian_collapse_lived'); p.setMem('ven_escasez', true); },
      },
    ],
    effect: null,
  },

  // ── 2017 PROTESTS ────────────────────────────────────────────────────────────

  {
    id: 'ven_2017_protests',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2017 && G.currentYear <= 2017 &&
      G.age >= 15 &&
      !G.mem?.ven_2017,
    text: 'April to July 2017. Every day for four months. The opposition won the National Assembly in December and Maduro is dissolving its powers through the Supreme Court. The protest route goes down the main avenue. The GNB — National Guard — fires tear gas and birdshot. The colectivos on motorcycles ride into the crowds. A hundred and twenty people die. Your neighborhood makes a decision about whether to come out — the guarimba, the street barricade, the garbage can fire at the intersection. Whether to go out is a calculation that involves knowing which street the motorcycles have been using and at what time the gas arrives.',
    choices: [
      {
        text: 'You go out. The country has to be pushed.',
        tag: null,
        outcome: 'You are in the street in the months that follow. The birdshot, the gas, the motorcycles. The Constituent Assembly is created anyway. Maduro survives. The street cost something and did not produce what the street was demanding.',
        effect: (p) => { p.m -= 10; p.h -= 4; p.karma += 6; p.addFlag('ven_2017_generation'); p.setMem('ven_2017', true); },
      },
      {
        text: 'You watch from the window. The risk calculation came out this way.',
        tag: null,
        outcome: 'The street is visible from where you are. The sounds of it are audible. The calculation of not going carries a weight you will carry separately from the question of whether it was correct.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('ven_2017_generation'); p.setMem('ven_2017', true); },
      },
    ],
    effect: null,
  },

  // ── THE EXODUS DECISION ───────────────────────────────────────────────────────

  {
    id: 'ven_emigrar',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2017 && G.currentYear <= 2021 &&
      G.age >= 18 && G.age <= 50 &&
      (G.flags.has('bolivarian_collapse_lived') || G.flags.has('ven_2017_generation')) &&
      !G.mem?.ven_emigrar,
    text: 'Seven million have left. Bogotá, Lima, Santiago, Buenos Aires, Madrid, Miami. The people in your WhatsApp group are distributed across five countries. The conversation has a specific texture: partly keeping in contact, partly competing accounts of different versions of the same life being lived in different places, partly an ongoing calculation of when to return that keeps getting deferred. You are still here. The question of whether to go is now a daily fact.',
    choices: [
      {
        text: 'You go. There is nothing left here to stay for that you couldn\'t rebuild somewhere else.',
        tag: null,
        outcome: 'The crossing to Colombia by bus, or the flight, or whatever route you found. You arrive in someone else\'s country with Venezuelan on your tongue and in the way you navigate a street.',
        effect: (p) => { p.m -= 10; p.addFlag('venezuela_exodus'); p.addFlag('emigrated'); p.addFlag('ven_stayer'); p.setResidency('undocumented'); p.setMem('ven_emigrar', true); },
      },
      {
        text: 'You stay. This is your country and leaving would be the last surrender.',
        tag: null,
        outcome: 'Staying when most are leaving is its own position. The city empties a specific way. The people who are left know each other differently.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('ven_stayer'); p.setMem('ven_emigrar', true); },
      },
    ],
    effect: null,
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'ven_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      (G.flags.has('chavista_generation') || G.flags.has('ven_chavez_1998_generation') || G.flags.has('bolivarian_collapse_lived')) &&
      !G.mem?.ven_reckoning,
    text: (G) => {
      const isChavista = G.flags.has('chavista_generation')
      const left = G.flags.has('venezuela_exodus')
      return left
        ? 'You left Venezuela. The country you left has a double in your memory: the country before the collapse and the country the collapse made. The one your children know from WhatsApp photos is the second one. The first one — the Caracas of the eighties or the nineties, the Sunday market, the specific light of the valley — exists now only in people of your generation and in the places that remain.'
        : isChavista
          ? 'You believed in the project. You have outlived it in some sense. The things the misiones built — the literacy, the infant mortality rates, the poverty reduction — were real. The way the project managed its end was not good. You hold both facts without requiring them to resolve.'
          : 'Venezuela was polarized into chavistas and escuálidos — the term Chávez used for the opposition. You were on one side or you were on the other and the division structured the next twenty years. The country exists now outside that division, in a different kind of collapse, and the polarization feels like an old argument that history has moved past without resolving.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('ven_testigo_generation'); p.setMem('ven_reckoning', true); },
  },

]

export default VENEZUELA_EVENTS

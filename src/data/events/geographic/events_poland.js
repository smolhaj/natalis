// Poland character events
// Communist childhood, Pope John Paul II 1978, Solidarity 1980,
// martial law 1981, the underground, Round Table 1989, shock therapy,
// EU accession 2004, contemporary politics

export const POLAND_EVENTS = [

  {
    id: 'pol_communist_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1950 && G.currentYear <= 1979 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.polCommunistChildhood,
    text: 'The school teaches that the Soviet Union is Poland\'s brother nation. History begins in 1944 with the liberation. Before 1944 the history is problematic. The queue at the mięsny — the state butcher — is the shape of the economy. The empty shelf, the substitute product, the relationship with a particular sprzedawczyni who keeps something under the counter for people she knows. Your parents understand the real economy and the official economy as two different systems, and they teach you both.',
    choices: [
      {
        text: 'You absorb the official version at school and the real version at home. The gap is normal.',
        tag: null,
        outcome: 'The gap becomes your operating model for information: what is said officially and what is true are categories you apply automatically for the rest of your life.',
        effect: (p) => { p.m -= 3; p.e += 4; p.addFlag('communist_poland_childhood'); p.addFlag('learned_silence'); p.setMem('polCommunistChildhood', true); },
      },
      {
        text: 'Your family\'s involvement in the church creates a parallel world to the official one.',
        tag: null,
        outcome: 'The church is the institution that the state cannot fully co-opt. The parish is the space that exists outside the party\'s reach. You grow up in both spaces simultaneously.',
        effect: (p) => { p.m -= 2; p.e += 3; p.karma += 3; p.addFlag('communist_poland_childhood'); p.addFlag('church_formed_identity'); p.setMem('polCommunistChildhood', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_pope_john_paul_1978',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1978 && G.currentYear <= 1979 &&
      G.age >= 10 &&
      !G.mem?.polPope,
    text: 'October 16, 1978. Karol Wojtyła of Kraków becomes the first non-Italian Pope in 455 years. He takes the name John Paul II. In Poland, the announcement arrives on the radio. People come into the street. In 1979, John Paul II visits Poland — his first visit to his homeland as Pope. In Warsaw the crowd is a million people. In Kraków two million. The state that has governed Poland for thirty-four years stands in the square watching two million Poles tell it something about what it does not own.',
    choices: [
      {
        text: 'The visit is the beginning of something. You feel it in the crowd.',
        tag: null,
        outcome: 'The something that begins is Solidarity, the following year. The crowd at the papal visit and the crowd at the Gdańsk shipyard gates in August 1980 are the same crowd, eighteen months later.',
        effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('pope_visit_generation'); p.addFlag('church_formed_identity'); p.setMem('polPope', true); },
      },
      {
        text: 'You watch it from a distance — the crowds, the cameras, the state\'s frozen face.',
        tag: null,
        outcome: 'The state\'s frozen face is the tell. Something has happened that the state does not know how to answer. The answering will take eleven years.',
        effect: (p) => { p.m += 5; p.addFlag('pope_visit_generation'); p.setMem('polPope', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_solidarity_1980',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1980 && G.currentYear <= 1981 &&
      G.age >= 16 &&
      !G.mem?.polSolidarity,
    text: 'August 1980. Gdańsk. The workers at the Lenin Shipyard go on strike. Anna Walentynowicz, a crane operator, has been fired. Lech Wałęsa climbs the gate. The demands are twenty-one points, including the right to independent trade unions. The strike spreads. The government negotiates. On August 31 it signs. Solidarność is legalized. Ten million members in fourteen months. A third of the country. The union is also something beyond a union — it is the accumulated demand of thirty-five years of Poland saying that something is not right here.',
    choices: [
      {
        text: 'You join. This is the thing you have been waiting for without knowing you were waiting.',
        tag: null,
        outcome: 'You are in the meeting. The priest says things that would have been impossible eighteen months ago. The window is open. The air is extraordinary. Martial law is thirteen months away. You cannot know that yet.',
        effect: (p) => { p.m += 8; p.karma += 10; p.r += 3; p.addFlag('solidarity_generation'); p.addFlag('solidarity_member'); p.setMem('polSolidarity', true); },
      },
      {
        text: 'You observe with hope and caution. The state is still the state.',
        tag: null,
        outcome: 'The caution is correct and the hope is also correct. The state is still the state. The state will declare martial law in December 1981. The hope is not wrong — it is early.',
        effect: (p) => { p.m += 4; p.r += 4; p.addFlag('solidarity_generation'); p.setMem('polSolidarity', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_martial_law_1981',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1981 && G.currentYear <= 1983 &&
      G.age >= 14 &&
      !G.mem?.polMartialLaw,
    text: 'December 13, 1981. 6am. General Wojciech Jaruzelski appears on television in his uniform. Stan wojenny — martial law. Tanks in the streets. The phones cut. Solidarity declared illegal. The internments begin: ten thousand people in the next forty-eight hours, including Wałęsa. The border closed. The curfew. Jaruzelski says he is saving Poland from Soviet intervention. Whether this is true will be argued for decades. What is true: Solidarity goes underground, prints its newspapers in church basements, survives.',
    choices: [
      {
        text: 'You participate in the underground — the bibuła, the hidden meetings, the church.',
        tag: null,
        outcome: 'The underground press: Tygodnik Mazowsze, CDN, the samizdat that circulates in envelopes. The church basements. You become expert at the gap between the official and the real, which is also the entire condition of living in Poland.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.e += 4; p.addFlag('martial_law_generation'); p.addFlag('underground_poland'); p.setMem('polMartialLaw', true); },
      },
      {
        text: 'You keep your head down. The family needs you not to be arrested.',
        tag: null,
        outcome: 'You keep your head down. The family is protected. The underground continues without you. The choice is understandable and costs you something specific that you are still paying later.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('martial_law_generation'); p.setMem('polMartialLaw', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_round_table_1989',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear === 1989 &&
      G.age >= 18 &&
      !G.mem?.polRoundTable,
    text: 'February 6, 1989. The Round Table negotiations between the government and Solidarity. On June 4 — the same day as Tiananmen — Poland holds semi-free elections. Solidarity wins all the contested seats. On August 24, Tadeusz Mazowiecki becomes the first non-Communist Prime Minister in the Eastern Bloc. The revolution that took eleven years and was expected to take longer is over. The wall falls in November in Berlin. You watch on television a country you have been watching from inside for forty years.',
    choices: [
      {
        text: 'June 4, 1989. You vote. You have been waiting for this your entire adult life.',
        tag: null,
        outcome: 'The vote is real. The result is real. The first morning of a different Poland is ordinary and extraordinary simultaneously. The ordinary and extraordinary combination is the specific feeling of a historical transition.',
        effect: (p) => { p.m += 12; p.karma += 8; p.addFlag('1989_poland_generation'); p.setMem('polRoundTable', true); },
      },
      {
        text: 'The transition is too fast and too uncontrolled. The caution of someone who has seen transitions before.',
        tag: null,
        outcome: 'The caution is the caution of experience. What follows — the shock therapy, the privatizations, the unemployment — gives the caution some justification. The transition is also real and extraordinary.',
        effect: (p) => { p.m += 6; p.r += 5; p.addFlag('1989_poland_generation'); p.setMem('polRoundTable', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_shock_therapy',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 1990 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem?.polShockTherapy,
    text: 'The Balcerowicz Plan: price liberalization, privatization, currency convertibility. Implemented on January 1, 1990. Within months, prices rise 250 percent. State enterprises shut down. The unemployment that didn\'t exist under communism reaches sixteen percent by 1994. The bazaar economy: the folding tables selling anything that can be traded, the dollar as real currency, the informal economy that carries people through. Poland will become the only major economy in Europe that avoids recession in 2009. The price of that will have been paid in the early nineties.',
    choices: [
      {
        text: 'The transition is painful and necessary. You absorb the cost and build from the new foundation.',
        tag: null,
        outcome: 'You absorb the cost. Poland\'s GDP grows faster than any EU economy for the next twenty years. The growth is real. The cost was also real. You paid both.',
        effect: (p) => { p.m -= 8; p.w -= 5; p.r += 4; p.addFlag('shock_therapy_generation'); p.setMem('polShockTherapy', true); },
      },
      {
        text: 'The transition destroys what you built. The factory, the security, the known world.',
        tag: null,
        outcome: 'The factory closes and the severance is in złoty that will be worth less next month. The new economy has no use for what you know how to do. You find something. What you find is smaller than what you had.',
        effect: (p) => { p.m -= 12; p.w -= 8; p.r += 7; p.addFlag('shock_therapy_generation'); p.addFlag('transition_economy_cost'); p.setMem('polShockTherapy', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_eu_accession_2004',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear === 2004 &&
      G.age >= 18 &&
      !G.mem?.polEU,
    text: 'May 1, 2004. Poland enters the European Union. The borders open. The work permits for the UK and Ireland exist. In the next three years, nearly a million Poles leave for the UK alone. The Polish plumber becomes the symbol of the anxiety about the new EU — in France a poster of a smiling Polish worker says: "I stay in Poland — vote yes to the European constitution." The vote fails. The Polish plumber exists. He sends money home and builds something.',
    choices: [
      {
        text: 'You go west. The UK, Ireland, Germany, Norway — the wages there are real.',
        tag: null,
        outcome: 'You leave. The remittances arrive in Poland every month. You build the house in the village and the career in London simultaneously. The double life is expensive and full.',
        effect: (p) => { p.m -= 3; p.w += 8; p.r += 5; p.addFlag('poland_eu_emigrant'); p.addFlag('eu_freedom_movement'); p.setMem('polEU', true); },
      },
      {
        text: 'You stay. The EU means investment and the zloty growing. You will build something here.',
        tag: null,
        outcome: 'The structural funds, the road building, the airports. Poland\'s infrastructure transforms in the decade after accession. You are here to see it.',
        effect: (p) => { p.m += 6; p.w += 4; p.addFlag('eu_freedom_movement'); p.setMem('polEU', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_smolensk_2010',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2010 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem?.polSmolensk,
    text: 'April 10, 2010. The Tu-154 carrying President Lech Kaczyński and ninety-five other Polish officials — the military chief of staff, the national bank president, army commanders, members of parliament, bishops, the families of Katyń victims — crashes in fog near Smolensk, Russia. They were traveling for the seventieth anniversary of the Katyń massacre. All ninety-six are killed. Poland has not lost this many senior officials simultaneously since the war. The grief is not contested. What happened next becomes something else entirely.',
    choices: [
      {
        text: 'A terrible accident in difficult conditions. The grief is enough.',
        tag: null,
        outcome: 'The grief is enough and also not the end of it. The official Russian investigation finds pilot error. The PiS party will eventually name this an assassination. The political use of the grief is something you watch develop over the following years and try to hold separately from the grief itself.',
        effect: (p) => { p.m -= 10; p.r += 4; p.addFlag('smolensk_generation'); p.setMem('polSmolensk', true); },
      },
      {
        text: 'The sequence — Katyń, then Smolensk, then a Russian investigation — does not sit easily.',
        tag: null,
        outcome: 'You hold the discomfort privately. The sequence is what it is: Poland flying to commemorate a Soviet massacre, crashing in Russian territory, the investigation conducted by Russia. The conclusions may be correct. The discomfort is also correct.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('smolensk_generation'); p.addFlag('smolensk_doubted'); p.setMem('polSmolensk', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_womens_strike_2020',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Poland' &&
      G.character.gender === 'female' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem?.polWomensStrike,
    text: 'October 22, 2020. The Constitutional Tribunal rules that abortions for severe fetal abnormalities are unconstitutional. Ninety-eight percent of the legal abortions performed in Poland were for this reason. Effective immediately. Within hours, a lightning bolt symbol is on phones and walls everywhere. By the weekend, hundreds of thousands of people are in the streets — in Warsaw, in Kraków, in small towns with no previous history of protest. The signs say things that were not said in public in Poland before. The lightning bolt is everywhere. You are somewhere.',
    choices: [
      {
        text: 'You are in the street with the lightning bolt.',
        tag: null,
        outcome: 'The strikes run for weeks. The government does not reverse the ruling. What the weeks produce is not the reversal but the knowledge of what is possible — the number of people willing to be in the street, which is a number that matters regardless of the immediate outcome.',
        effect: (p) => { p.m -= 5; p.karma += 6; p.s += 3; p.addFlag('strajk_kobiet_generation'); p.addFlag('political_active'); p.setMem('polWomensStrike', true); },
      },
      {
        text: 'You agree with the ruling. Life is life.',
        tag: null,
        outcome: 'You hold the position. The country is divided on the question in ways the street numbers do not fully represent. The ruling stands. The political consequences continue past the immediate moment.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('strajk_kobiet_generation'); p.setMem('polWomensStrike', true); },
      },
    ],
    effect: null,
  },

]

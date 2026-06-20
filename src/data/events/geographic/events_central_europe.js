// Central Europe arc events: Hungary and Czech Republic
// Hungary: 1956 uprising and Soviet re-occupation, Kádár goulash communism,
//   1989 border opening (triggering the Eastern Bloc domino), Orbán era
// Czech Republic: normalization period 1968–89, Charter 77, Velvet Revolution,
//   post-89 lustration and reckoning

export const CENTRAL_EUROPE_EVENTS = [

  // ── HUNGARY ──────────────────────────────────────────────────────────────────

  {
    id: 'hun_1956_uprising_child',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Hungary' &&
      G.currentYear >= 1956 && G.currentYear <= 1957 &&
      G.age >= 5 && G.age <= 17 &&
      !G.mem?.hun1956,
    text: (G) => {
      const age = G.age
      if (age <= 9) {
        return 'The night of October 23rd you are woken by noise in the street. Your father goes to the window and stands there for a long time without saying anything. By morning the radio is saying things it has never said before. For twelve days the adults around you are louder and stranger than usual. Then the tanks come back in larger numbers and the adults go quiet in a new way.'
      }
      return 'October 23, 1956: the statue of Stalin comes down — cut at the boots, it falls and people walk over the broken metal. The radio announces things that have never been announced. For twelve days something that looks like freedom. Then November 4th: the Soviet tanks in larger numbers. Two thousand five hundred Hungarians dead. Two hundred thousand will leave through the Austrian border before it closes.'
    },
    choices: [
      {
        text: 'The twelve days stay with you. The feeling of the street, the radio, the way adults moved differently.',
        tag: null,
        outcome: 'The twelve days become the measure. The question of whether that particular feeling is possible becomes a question your life organizes itself around.',
        effect: (p) => { p.m += 4; p.m -= 8; p.r += 5; p.addFlag('hungarian_1956_generation'); p.setMem('hun1956', true); },
      },
      {
        text: 'What you retain is the silence afterward. The way the adults closed.',
        tag: null,
        outcome: 'The silence teaches you something about what can be said and what cannot. You do not fully unlearn it.',
        effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('hungarian_1956_generation'); p.addFlag('learned_silence'); p.setMem('hun1956', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'hun_1956_uprising_adult',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Hungary' &&
      G.currentYear >= 1956 && G.currentYear <= 1957 &&
      G.age >= 18 &&
      !G.mem?.hun1956,
    text: 'October 23, 1956. The statue of Stalin comes down in the early hours and the crowd walks over the broken boots. The radio announces the end of things that have been in place since 1949. For twelve days: the political prisoners released, the secret police dissolved, the announcement of a multi-party system. Then November 4th: two hundred Soviet tanks roll into Budapest before dawn. Imre Nagy takes shelter in the Yugoslav embassy. The world watches but does not intervene. Two thousand five hundred Hungarians die. Two hundred thousand will leave in the weeks that follow.',
    choices: [
      {
        text: 'You are in it — in the crowds, in the twelve days, in what they mean while they last.',
        tag: null,
        outcome: 'You were in it. The being-in-it does not change the outcome. The outcome is what it is. What you were in is also what it is.',
        effect: (p) => { p.m += 5; p.m -= 12; p.karma += 8; p.r += 6; p.addFlag('hungarian_1956_generation'); p.addFlag('political_active'); p.setMem('hun1956', true); },
      },
      {
        text: 'You leave. Two hundred thousand people take the same calculation in the same weeks.',
        tag: null,
        outcome: 'The Austrian border is open for a few months. You arrive. You carry Hungary with you in a way the people who stayed do not quite share.',
        effect: (p) => { p.r += 8; p.m -= 8; p.addFlag('hungarian_1956_generation'); p.addFlag('hungarian_diaspora_1956'); p.addFlag('emigrated'); p.setMem('hun1956', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'hun_kadar_goulash',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Hungary' &&
      G.currentYear >= 1963 && G.currentYear <= 1988 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.hunKadar,
    text: 'Kádár\'s formulation: "Those who are not against us are with us." An inversion of the Stalinist demand for enthusiasm. Hungary under Kádár is different from its neighbors — small private enterprise tolerated on the side, the weekend house in the countryside, the relative availability of Western goods, a jazz club open in Budapest. The deal is specific: do not organize politically, do not talk about 1956, do not challenge the Party\'s monopoly. In exchange: get on with your life. You understand the deal. Most people have understood it.',
    choices: [
      {
        text: 'You take the deal. The deal has real content and you are not ashamed of taking it.',
        tag: null,
        outcome: 'The deal works as advertised, for years. The question of what it costs arrives later, if it arrives.',
        effect: (p) => { p.m += 6; p.w += 3; p.addFlag('kadar_compromise_generation'); p.setMem('hunKadar', true); },
      },
      {
        text: 'You take the deal but you know what you are taking. The real opinions stay in the kitchen.',
        tag: null,
        outcome: 'The kitchen is where Hungary actually lives during these years. You are in the kitchen. You know people who tried to live elsewhere.',
        effect: (p) => { p.m += 3; p.r += 3; p.e += 3; p.addFlag('kadar_compromise_generation'); p.setMem('hunKadar', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'hun_border_1989',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Hungary' &&
      G.currentYear === 1989 &&
      G.age >= 15 &&
      !G.mem?.hun1989,
    text: 'May 2, 1989: Hungary begins cutting the barbed wire on the Austrian border. It is a bureaucratic decision that changes the twentieth century. By August, East Germans are camping in the West German embassy compound in Budapest. In September, Hungary opens the border formally and a hundred thousand East Germans cross before East Germany can respond. The dominoes that follow: Czechoslovakia, the Berlin Wall falls November 9, Romania, Bulgaria. Hungary did not plan to do this. The specific logic of Kádár\'s Hungary — its pragmatism, its small private freedoms — produced officials who found it possible to make this choice.',
    choices: [
      {
        text: 'You watch the East Germans crossing. You have lived next to an Iron Curtain your entire life and now it is being cut with wire cutters.',
        tag: null,
        outcome: 'Wire cutters doing ordinary work on an extraordinary thing. The ordinary courage of the specific mechanism.',
        effect: (p) => { p.m += 10; p.karma += 5; p.r += 3; p.addFlag('hungary_1989_border_generation'); p.setMem('hun1989', true); },
      },
      {
        text: 'It happens quickly. By December, when you understand what has happened, you are already somewhere different.',
        tag: null,
        outcome: 'The transition went at a speed historical transitions rarely go. You are somewhere different. The where is still being worked out.',
        effect: (p) => { p.m += 8; p.e += 3; p.addFlag('hungary_1989_border_generation'); p.setMem('hun1989', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'hun_orban_era',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Hungary' &&
      G.currentYear >= 2011 &&
      G.age >= 18 &&
      !G.mem?.hunOrban,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2022) {
        return 'Orbán\'s Fidesz has governed since 2010. In that time: a new constitution written by one party, the independent press bought or closed, a supermajority used to rewrite electoral law, the Central European University forced to relocate to Vienna, a constitutional amendment banning same-sex marriage, the anti-Soros billboard campaigns across the country. He won again in 2022. The EU withholds funds. Hungary stays in the EU. The contradiction has been running for over a decade and shows no sign of resolving.'
      }
      return 'Orbán\'s Fidesz won in 2010 with a two-thirds supermajority and used it immediately to rewrite the constitution. The new basic law. The courts reorganised. The media landscape changing — not through confiscation but through ownership, through the right buyer for the right newspaper. The specific texture of Hungarian public life: the government newspapers distributed free at the coffee counter, the billboard that shows George Soros smiling. You are living in a country its own leader calls an illiberal democracy.'
    },
    choices: [
      {
        text: 'You stay and navigate it. The navigation looks different depending on what you do for work.',
        tag: null,
        outcome: 'The navigation is real. Some people navigate it more comfortably than others. You know where you are in the distribution.',
        effect: (p) => { p.r += 4; p.m -= 3; p.addFlag('orban_era_generation'); p.setMem('hunOrban', true); },
      },
      {
        text: 'You leave. A significant number of Hungarians, particularly educated professionals, are doing the same.',
        tag: null,
        outcome: 'The brain drain is documented. You are a data point in it. What you take with you is something Hungary cannot easily replace.',
        effect: (p) => { p.r += 5; p.m -= 5; p.addFlag('orban_era_generation'); p.addFlag('emigrated'); p.setMem('hunOrban', true); },
      },
    ],
    effect: null,
  },

  // ── CZECH REPUBLIC ────────────────────────────────────────────────────────────

  {
    id: 'cze_normalization',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.character.country.name === 'Czech Republic' ||
       G.flags.includes('prague_spring_generation')) &&
      G.currentYear >= 1969 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem?.czeNormalization,
    text: 'Normalization. The Czech word is normalizace — the task is to return things to normal after August 1968. Normal meaning: the Party in control, the reform communists expelled, the intellectuals transferred to manual jobs. A philosopher becomes a window cleaner. An economist drives a tram. The Party card determines where you work, where your children can study, whether you get the apartment. The deal is the same one Czechs have made since 1938: survive. The specific texture of normalization is that survival requires a kind of active collaboration that ordinary survival does not require. You sign things. You do not sign things. The difference matters.',
    choices: [
      {
        text: 'You sign what you need to sign. The real opinions stay in the kitchen, where everyone keeps the real opinions.',
        tag: null,
        outcome: 'The kitchen is where Czech intellectual life happens for twenty years. Some very good things are thought in kitchens during normalization.',
        effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('normalization_generation'); p.setMem('czeNormalization', true); },
      },
      {
        text: 'You do not sign. The cost is real and you pay it and you know what you are paying.',
        tag: null,
        outcome: 'The job is worse. The apartment may not come. Your children face the wrong questions at university applications. You made the choice and it is yours.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.r += 4; p.e += 5; p.addFlag('normalization_generation'); p.addFlag('political_dissident'); p.setMem('czeNormalization', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'cze_charter_77',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.character.country.name === 'Czech Republic' ||
       G.flags.includes('normalization_generation')) &&
      G.currentYear >= 1977 && G.currentYear <= 1989 &&
      G.age >= 20 && G.age <= 55 &&
      !G.mem?.czeCharter,
    text: 'Charter 77. A document. Three pages. It points out that Czechoslovakia has signed the Helsinki Accords guaranteeing specific human rights and that the government does not observe them. It is not a political program. It does not call for revolution. It says: the law says this, and this is not happening. Two hundred and forty-two people sign in January 1977. The signatories lose their jobs. Their children are denied university places. Their phones are disconnected. The document circulates as samizdat — typed copies, carbon paper, passed hand to hand. You have seen a copy.',
    choices: [
      {
        text: 'You sign. You understand the costs and you sign.',
        tag: null,
        outcome: 'Your name joins 1,800 others who will eventually sign before 1989. The list is documented. The cost is also documented.',
        effect: (p) => { p.karma += 10; p.m -= 8; p.r += 3; p.addFlag('charter_77_generation'); p.addFlag('political_dissident'); p.setMem('czeCharter', true); },
      },
      {
        text: 'You do not sign. You pass the copy along. Most people who see it do not sign.',
        tag: null,
        outcome: 'Not signing is not the same as not knowing. You know. The knowing is its own relationship to the document.',
        effect: (p) => { p.m -= 4; p.r += 4; p.e += 2; p.addFlag('charter_77_generation'); p.setMem('czeCharter', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'cze_velvet_revolution',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Czech Republic' &&
      G.currentYear === 1989 &&
      G.age >= 10 &&
      !G.mem?.czeVelvet,
    text: (G) => {
      const age = G.age
      if (age <= 20) {
        return 'November 17, 1989. The students march on Národní třída and the riot police stop them and beat them. By the 19th the news of the beatings has spread and the crowds grow. By the 21st there are two hundred thousand people in Wenceslas Square. Keys are jingled — hundreds of thousands of keychains making the sound of: time is up. On December 29, Václav Havel is elected president by the same parliament that imprisoned him.'
      }
      return 'Wenceslas Square, November 1989. The specific sound of hundreds of thousands of keychains being shaken in unison — the dismissal sound, the your-time-is-over sound. Havel, who was in prison not long ago, addresses the crowd. By late December the same parliament that imprisoned dissidents has elected him president. Twenty-one days from the first student march to the first non-communist government in forty years. The Velvet Revolution earned its name.'
    },
    choices: [
      {
        text: 'You are in the square. You jingle your keys.',
        tag: null,
        outcome: 'The specific sound, the specific cold of that November, the specific speed of what happened afterward. These are yours.',
        effect: (p) => { p.m += 15; p.karma += 8; p.r -= 4; p.addFlag('velvet_revolution_generation'); p.setMem('czeVelvet', true); },
      },
      {
        text: 'You watch it on television doing something televisions have never done before.',
        tag: null,
        outcome: 'The television showing the squares, the crowds, the people who were in prison now at the microphone. The watching is its own form of being present.',
        effect: (p) => { p.m += 10; p.r -= 2; p.addFlag('velvet_revolution_generation'); p.setMem('czeVelvet', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'cze_lustration_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Czech Republic' &&
      G.currentYear >= 1992 && G.currentYear <= 2008 &&
      G.flags.includes('normalization_generation') &&
      G.age >= 35 &&
      !G.mem?.czeLustration,
    text: 'The lustration law: the screening of public employees for collaboration with the StB, the secret police. The files are opened. The neighbour who informed. The colleague. The friend — sometimes. The law is about future employment rather than criminal prosecution, but the names are public. Some of the names are people you know. The specific difficulty of normalization is that the line between signed-under-coercion and willing-collaborator is often not visible from outside the file. The file shows what happened. The file does not show why.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('czeLustration', true); },
  },

]

// Spain character events
// Franco dictatorship (1939–75), Basque/Catalan/Galician identity suppression,
// La Transición (1975–78), 23-F coup attempt (1981), La Movida Madrileña (1978–85),
// 1992 Barcelona Olympics, 2008 property crash, 2010s crisis and brain drain,
// 2017 Catalan independence referendum.

export const SPAIN_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // FRANCO ERA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es_franco_school',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1945 && G.currentYear <= 1973 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.esFrancoSchool,
    text: 'The classroom has the portrait, the crucifix, and the slogan: Una, Grande y Libre. The religion lesson and the history lesson are the same lesson taught with the same certainty. You learn that the war ended well. The teacher is not cruel — he is specific: there are things that are said and things that are not said, and the boundary is not explained but you learn it quickly, the way children learn the furniture of the room they live in.',
    choices: [
      {
        text: 'You absorb the lesson without resistance.',
        tag: null,
        outcome: 'The portrait becomes furniture. The furniture becomes the room. You do not notice when you stop noticing it.',
        effect: (p) => { p.addFlag('franco_generation'); p.addFlag('learned_silence'); p.setMem('esFrancoSchool', true); },
      },
      {
        text: 'Something in you files the gap between what is said and what is felt.',
        tag: null,
        outcome: 'You are young enough that you cannot name the gap. You know it is there. The knowing is quiet and waits.',
        effect: (p) => { p.m -= 2; p.r += 3; p.addFlag('franco_generation'); p.addFlag('inner_dissent'); p.setMem('esFrancoSchool', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_basque_language_suppressed',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.ethnicity === 'basque' &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.esRegionalLang,
    text: 'The school requires Castilian. Euskara is what you speak at home, what your grandparents think in, what the river names and mountain names are in — but in the classroom it is an infraction. The Basque Country has its own specific relationship to the regime: the bombing of Guernica is twenty years ago, the executions are more recent. A teacher corrects your Spanish and the correction is not pedagogical. You understand this before you understand how to describe it.',
    choices: [
      {
        text: 'You speak Castilian in public and keep Euskara for home.',
        tag: null,
        outcome: 'The division becomes habitual. Public-you speaks Castilian without accent. Private-you still knows Euskara, and the knowing is a form of resistance you do not have to name.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('basque_suppressed'); p.setMem('esRegionalLang', true); },
      },
      {
        text: 'You keep speaking Euskara wherever possible.',
        tag: null,
        outcome: 'The infraction is noted and sometimes punished. The punishment confirms what the language means. You file the confirmation.',
        effect: (p) => { p.m -= 6; p.r += 6; p.karma += 3; p.addFlag('basque_suppressed'); p.setMem('esRegionalLang', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_catalan_language_suppressed',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.ethnicity === 'catalan' &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.esRegionalLang,
    text: 'The school requires Castilian. Català is what you speak at home, what the street names were called before they were changed, what the songs are — but in the official spaces it is either an infraction or an embarrassment. "Habla la lengua del Imperio." You hear this from a teacher in a tone that is half-joke and not a joke. Catalonia is the industrial core of Spain and this has never been enough to protect it from the regime\'s program of cultural uniformity.',
    choices: [
      {
        text: 'You adapt to the official language in the official spaces.',
        tag: null,
        outcome: 'The switch becomes automatic. At home the language continues. The automatic switch and the home language are two things that coexist and do not quite reconcile.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('catalan_suppressed'); p.setMem('esRegionalLang', true); },
      },
      {
        text: 'You insist on Català in places you should not.',
        tag: null,
        outcome: 'The insistence costs something. The cost confirms what you already knew about what is being suppressed and why.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 4; p.addFlag('catalan_suppressed'); p.setMem('esRegionalLang', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_galician_language_texture',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.ethnicity === 'galician' &&
      G.currentYear >= 1945 && G.currentYear <= 1975 &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.esRegionalLang,
    text: 'Galicia is the land Franco came from, and this does not protect Galego. The language is what your grandparents speak in; in the cities it becomes something rural, something associated with the village, the old, the not-modern. You speak Castilian at school. You speak Galego with your grandfather and notice that the language has a specific weight when he speaks it — the weight of things said before.',
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 3; p.addFlag('galician_suppressed'); p.setMem('esRegionalLang', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // LA TRANSICIÓN
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es_franco_death_1975',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear === 1975 &&
      G.age >= 12 &&
      !G.mem?.esFrancoDeath,
    text: 'November 20, 1975. Francisco Franco Bahamonde is dead. The announcement comes in the register of official announcements, which is different from the register of news. You have never known a Spain without him — he took power before you were born, before most people alive today were born. The flag is at half-mast. The television plays a specific kind of music. What comes next is not obvious. The regime has not ended; it has lost the person who named it.',
    choices: [
      {
        text: 'You feel something that is not exactly grief and not exactly celebration.',
        tag: null,
        outcome: 'The feeling does not resolve into one thing. The country, too, does not resolve for several years. What comes next takes time to become apparent.',
        effect: (p) => { p.m += 3; p.addFlag('transicion_generation'); p.setMem('esFrancoDeath', true); },
      },
      {
        text: 'You are cautiously, specifically hopeful.',
        tag: null,
        outcome: 'The hope is calibrated. A regime can recalibrate rather than end. But the moment is real and you are in it.',
        effect: (p) => { p.m += 6; p.r -= 2; p.addFlag('transicion_generation'); p.setMem('esFrancoDeath', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_23F_coup_attempt',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear === 1981 &&
      G.age >= 13 &&
      !G.mem?.es23F,
    text: 'February 23, 1981. Lieutenant Colonel Tejero enters the Cortes de Generales with Civil Guard officers, fires shots at the ceiling, and orders everyone to the floor. The democratically elected deputies lie on the floor of the parliament for seventeen hours. You watch it on television or hear it on the radio. There is a specific moment — it lasts some hours — when nobody knows what kind of country this will be tomorrow. You are inside that moment.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.addFlag('23F_remembered')
      p.setMem('es23F', true)
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // LA MOVIDA AND 1992
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es_la_movida',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1978 && G.currentYear <= 1986 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.esMovida,
    text: 'The thing that follows Franco is not serious. It is the opposite of serious: bands and films and nights that could not have existed five years ago, and a specific speed of living that functions as compensation for the years that were not permitted. Madrid is a city at four in the morning. The censors still technically exist but have been outrun. Almodóvar is making things. People are making things. The making has a quality that knows exactly what it is a reaction against.',
    choices: [
      {
        text: 'You live in it, specifically and without reservation.',
        tag: null,
        outcome: 'The years are specific. Later you will describe them as the years when Spain discovered what it was, and the answer surprised everyone.',
        effect: (p) => { p.m += 7; p.s += 4; p.addFlag('movida_generation'); p.setMem('esMovida', true); },
      },
      {
        text: 'You watch from the edge — the energy is real but not quite yours.',
        tag: null,
        outcome: 'The Movida happens near you. You take what fits. The decade changes you regardless.',
        effect: (p) => { p.m += 4; p.s += 2; p.addFlag('movida_generation'); p.setMem('esMovida', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_1992',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear === 1992 &&
      G.age >= 14 &&
      !G.mem?.es1992,
    text: 'The Barcelona Olympics. Expo\'92 in Sevilla. The first AVE high-speed train. Spain is doing something this year — arriving at something, completing something. You are watching Fermín Cacho win the 1500 metres and the crowd is doing the thing that crowds do when they know they are at a specific historical moment. The country that built this was not the country that existed in 1975. The distance between those two years is measured in things that now exist.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.addFlag('spain_1992_generation')
      p.setMem('es1992', true)
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // 11-M AND 15-M
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es_11m_2004',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2004 && G.currentYear <= 2006 &&
      G.age >= 18 &&
      !G.mem?.es11M,
    text: 'March 11, 2004. Four commuter trains at rush hour. Atocha, El Pozo del Tío Raimundo, Santa Eugenia. One hundred and ninety-one dead before eight in the morning. The government says ETA — immediately, insistently, with phone calls to every major newspaper. The evidence that accumulates through the day points somewhere else. Three days before the general election. You know the information is being managed. You go to Cibeles, or the Puerta del Sol, or wherever people in your city are gathering. The sign you carry or pass in the street says "¿Quién ha sido?" — but the question is already larger than the dead.',
    choices: [
      {
        text: 'You believe the official line at first, then revise when the evidence accumulates.',
        tag: null,
        outcome: 'The revision produces something in you about what a government can do with information and three days before an election. The election result surprises everyone. You were part of producing it.',
        effect: (p) => { p.m -= 6; p.addFlag('madrid_11m_lived'); p.setMem('es11M', true); },
      },
      {
        text: 'You do not believe it from the first hour.',
        tag: null,
        outcome: 'The anger is not only about the dead. The anger is about the management. On March 14 you vote knowing what you know. The result nobody predicted is partly built from that knowledge.',
        effect: (p) => { p.m -= 5; p.karma += 3; p.addFlag('madrid_11m_lived'); p.setMem('es11M', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_15m_2011',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2011 && G.currentYear <= 2013 &&
      G.age >= 18 &&
      !G.mem?.es15M,
    text: 'May 15, 2011. Puerta del Sol. The camp appears overnight and does not leave for weeks. "Democracia Real YA." "No nos representan." "No somos antisistema, el sistema es antinosotros." The signs are handmade; the arguments extend across cardboard and sticky notes pinned to tent sides. You are in your twenties, the youth unemployment rate is forty-six percent, and the banks have been rescued. You know these numbers in your body rather than your head. The assemblies are slow and serious and something forms inside the slowness.',
    choices: [
      {
        text: 'You join the camp — seriously, staying through the assemblies.',
        tag: null,
        outcome: 'What the camp becomes — Podemos, the end of bipartidismo, the new coalition math — takes years to clarify. You were part of what began in Sol.',
        effect: (p) => { p.m += 3; p.s += 3; p.karma += 4; p.addFlag('indignados_generation'); p.setMem('es15M', true); },
      },
      {
        text: 'You follow from a distance, sympathetic but not present.',
        tag: null,
        outcome: 'The camp continues without you. The energy is real. What it produces takes another three years to arrive. The edge is also a position.',
        effect: (p) => { p.m += 1; p.r += 3; p.addFlag('indignados_generation'); p.setMem('es15M', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ECONOMIC CRISIS AND CATALAN CRISIS
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es_housing_boom_bust',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2002 && G.currentYear <= 2011 &&
      G.age >= 22 && G.age <= 42 &&
      !G.mem?.esHousing,
    text: 'Everyone is buying flats. You are either buying a flat or wondering how people are buying flats on those salaries. The developer\'s guarantee is not a guarantee. The bank\'s risk assessment is not an assessment. But the crane is outside the window and the flat appreciates and the broker says this is the new floor, not the ceiling. Then 2008 arrives, specifically, and lasts. In Spain the recession lasts longer than elsewhere. Youth unemployment reaches fifty percent. That is a number. You know people inside the number.',
    choices: [
      {
        text: 'You bought.',
        tag: null,
        outcome: 'The mortgage is underwater. The flat is worth less than you paid. You are one of several million people in this position, which does not help.',
        effect: (p) => { p.w -= 10; p.mo -= 18000; p.m -= 8; p.addFlag('spanish_housing_crash'); p.setMem('esHousing', true); },
      },
      {
        text: 'You did not buy — by circumstance or by choice.',
        tag: null,
        outcome: 'The rents rise anyway, because the people who bought cannot sell and the people who need to live somewhere still need to live somewhere. The crisis reaches you differently.',
        effect: (p) => { p.m -= 4; p.addFlag('spain_crisis_texture'); p.setMem('esHousing', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_brain_drain',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2011 && G.currentYear <= 2016 &&
      G.age >= 22 && G.age <= 35 &&
      G.stats.smarts >= 45 &&
      !G.mem?.esBrainDrain,
    text: 'The term is fuga de cerebros — the brain drain. Everyone knows someone who has gone to London or Berlin or Amsterdam. A doctor. An engineer. Someone with a master\'s degree waiting tables in Germany because the waiting in Germany pays more than the graduate job in Madrid. Your generation is the most educated in Spanish history and the youth unemployment rate is fifty percent. You have a degree and a specific problem: the degree and the labour market are not in conversation.',
    choices: [
      {
        text: 'You leave.',
        tag: null,
        outcome: 'London, most likely, or Berlin. The EU passport makes it possible. The crisis makes it necessary. You add yourself to the statistics. The statistics add up to a generation.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('spain_crisis_emigrant'); p.setMem('esBrainDrain', true); },
      },
      {
        text: 'You stay and adapt.',
        tag: null,
        outcome: 'The adaptation is specific: the job that was not what you trained for, the salary below what the rent costs, the apartment with your parents for another two years. The mileurista generation.',
        effect: (p) => { p.m -= 6; p.r += 8; p.karma += 3; p.addFlag('spain_crisis_stayed'); p.setMem('esBrainDrain', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_catalan_independence_2017',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2017 && G.currentYear <= 2019 &&
      G.age >= 18 &&
      !G.mem?.esCatalan2017,
    text: (G) => {
      if (G.ethnicity === 'catalan') {
        return 'October 1, 2017. The referendum. The Spanish government has declared it illegal. The Civil Guard is at the polling stations. The images of riot gear and ballot boxes travel internationally within the hour. You have made a decision about where you are standing today. You cast a vote that the Constitutional Court does not recognise. You do not know yet what this means for the next five years. You know what it means today.'
      }
      return 'October 1, 2017. The Catalan independence referendum, declared illegal by Madrid. The Civil Guard is at the polling stations; the images are international news within hours. Spain is two things simultaneously: the country that appears in those images, and the country that holds a constitutional position with its own logic. Your WhatsApp groups have fractured along lines that were not visible eighteen months ago.'
    },
    choices: [
      {
        text: 'You come down on one side, and stay there.',
        tag: null,
        outcome: 'The position is defended in conversations that do not go anywhere. The fracture locates itself in specific relationships.',
        effect: (p) => { p.m -= 5; p.addFlag('spain_catalan_conflict_lived'); p.setMem('esCatalan2017', true); },
      },
      {
        text: 'You hold a complicated position that neither side finds satisfying.',
        tag: null,
        outcome: 'Nuance is not popular in the year of the referendum. The position costs something in both directions.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('spain_catalan_conflict_lived'); p.setMem('esCatalan2017', true); },
      },
    ],
    effect: null,
  },

]

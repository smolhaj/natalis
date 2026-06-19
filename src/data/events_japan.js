// Japan arc events
//
// Japan's story across the 20th–21st centuries:
//  — 1945: defeat, atomic bombs on Hiroshima and Nagasaki, Emperor Hirohito's
//    surrender broadcast. The word "gyokusai" replaced by "shusen." MacArthur
//    arrives at Atsugi in sunglasses. SCAP occupation writes a new constitution
//    in nine days (February 1946). Article 9 renounces war forever.
//  — The postwar miracle: GDP grows 10%/year through the 1960s. The 1964 Tokyo
//    Olympics are the coming-out party. Bullet trains, transistor radios,
//    Honda motorcycles. The country that was firebombed in 1945 hosts the
//    world in 1964.
//  — 1960 Anpo protests: hundreds of thousands surround the Diet building
//    to oppose renewal of the US-Japan security treaty. Eisenhower's press
//    secretary is mobbed at Haneda Airport. Zengakuren student movement.
//    The treaty passes anyway. Japanese democracy's first big test of limits.
//  — Salaryman culture: lifetime employment at one company, 6am train,
//    midnight return, hanami with the section chief, golf handicap as social
//    currency. Karoshi — death by overwork — enters the dictionary in 1978.
//  — The Bubble (1985–90): land in Tokyo's Ginza district worth more per square
//    meter than entire US states. Golf club memberships traded as securities.
//    The Bank of Japan raises rates five times in 1989–90. By 1992 the Nikkei
//    has lost 60%. The Lost Decade begins.
//  — Hikikomori: social withdrawal, primarily male, primarily adolescent, rooms
//    occupied for years. First described clinically in 1990s. Estimated one
//    million by 2010.
//  — Burakumin: descendants of feudal outcast caste (leatherworkers, butchers,
//    executioners). Legally emancipated 1871 but discrimination continues.
//    Marriage registers secretly checked. Estimated 3 million.
//  — March 11, 2011: Tohoku earthquake + tsunami + Fukushima Daiichi meltdown.
//    19,000 dead. 160,000 evacuated from the exclusion zone. The word "anzen"
//    (safety) loses its certainty.
//  — Japan's relationship with its wartime history: the Yasukuni Shrine debates,
//    the "comfort women" diplomatic crises, the history textbook controversies.
//    The war is present in every political season without being named.

const JAPAN_EVENTS = [

  // ── POSTWAR CHILDHOOD ─────────────────────────────────────────────────────────

  {
    id: 'jpn_postwar_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1946 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.jpn_postwar,
    text: (G) => {
      const isEarly = G.currentYear <= 1952
      return isEarly
        ? 'The American soldiers hand out Hershey bars at the schoolyard gate. Your mother told you not to accept them. You accepted one. The chocolate is sweet in a way that doesn\'t match anything in your vocabulary for food. The city around you is rubble with shoots growing through it. The trains run. The trains always ran. The school has no glass in the windows yet. The emperor\'s voice on the radio last August was the first time anyone heard it.'
        : 'The Korean War bought orders for Japanese factories and the economy is growing and there is a television set in the neighbor\'s house that fifteen people gather to watch on Saturday evenings. What is gone from the city has been replaced by something newer. The something newer is louder and moves faster and smells of concrete. You are growing up in the world that came after the world that ended, and the world that ended is not discussed at the dinner table.'
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r += 5; p.addFlag('japan_postwar_generation'); p.setMem('jpn_postwar', true); },
  },

  // ── ANPO PROTESTS 1960 ───────────────────────────────────────────────────────

  {
    id: 'jpn_anpo_protests',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1960 && G.currentYear <= 1961 &&
      G.age >= 17 && G.age <= 30 &&
      !G.mem?.jpn_anpo,
    text: 'June 1960. The Diet building surrounded. Three hundred thousand people in the streets around the parliament, the Zengakuren students at the front with their helmets and linked arms. The US-Japan security treaty is being ratified inside while the crowd outside makes it impossible to hear anything except the crowd. Eisenhower\'s press secretary was mobbed at Haneda two weeks ago and had to be rescued by helicopter. Kishi pushes the vote through at midnight with the opposition absent. The treaty passes. The democracy has been tested and the limits of the test are now visible.',
    choices: [
      {
        text: 'You are in the crowd. The linked arms in the rain.',
        tag: null,
        outcome: 'The treaty passes. The Zengakuren era ends slowly over the next decade, turning into something different. You carry the experience of having been in that street.',
        effect: (p) => { p.r += 6; p.karma += 5; p.addFlag('anpo_generation'); p.setMem('jpn_anpo', true); },
      },
      {
        text: 'You follow it on the news. The country feels like it is deciding something.',
        tag: null,
        outcome: 'What the country decided is still being interpreted. The treaty renewed. The crowd dispersed. The decade after moved very fast in a different direction.',
        effect: (p) => { p.e += 3; p.addFlag('anpo_generation'); p.setMem('jpn_anpo', true); },
      },
    ],
    effect: null,
  },

  // ── THE ECONOMIC MIRACLE ──────────────────────────────────────────────────────

  {
    id: 'jpn_economic_miracle',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1964 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.jpn_miracle,
    text: (G) => {
      const isOlympicYear = G.currentYear === 1964
      return isOlympicYear
        ? 'The Shinkansen opens two weeks before the Olympics. Two hundred and ten kilometers per hour between Tokyo and Osaka. The people on the platform stand back from the edge and watch it arrive. Nineteen years ago this platform was rubble. The Olympics open on October 10, the day statistically most likely to be clear in Tokyo. The day is clear. The world watches and what it sees is not what the world expected to see.'
        : 'The economy has been growing at ten percent a year for fifteen years. Your salary is higher than your father\'s was at your age. The department store has floors of things that did not exist when you were a child. The television, the washing machine, the car — the three sacred treasures of the postwar household — are now ordinary. The miracle is the wrong word for it. The right word is: relentless.'
    },
    choices: null,
    effect: (p) => { p.w += 6; p.m += 5; p.addFlag('showa_generation'); p.setMem('jpn_miracle', true); },
  },

  // ── SALARYMAN LIFE ────────────────────────────────────────────────────────────

  {
    id: 'jpn_salaryman_life',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1970 && G.currentYear <= 1995 &&
      G.character.gender === 'male' &&
      G.age >= 22 && G.age <= 40 &&
      G.career &&
      !G.mem?.jpn_salaryman,
    text: 'You enter the company. The company and you will now be the same thing for the next forty years, or until one of you is no longer viable. You receive the company jacket, the company housing allowance, the company health insurance. The section chief drinks before you drink. The section chief goes home before you go home. The section chief\'s karaoke is your karaoke. The train home at midnight. The platform at six-fifteen AM. The hanami with the section chief in April where you appreciate the blossoms together in the correct way. This is the compact. The compact includes a pension and a retirement watch and a specific kind of exhaustion that has a word: karoshi.',
    choices: [
      {
        text: 'You accept the compact. The security is real. So is everything else.',
        tag: null,
        outcome: 'The job is the life. This is not a metaphor inside the compact. It is the literal arithmetic of where your hours go.',
        effect: (p) => { p.w += 8; p.h -= 5; p.m -= 4; p.e += 4; p.addFlag('showa_salaryman'); p.setMem('jpn_salaryman', true); },
      },
      {
        text: 'You do the job and keep some distance. The distance costs you socially.',
        tag: null,
        outcome: 'Promotions come slower. You are not seen as fully committed. The company has a way of expressing this without ever saying it directly.',
        effect: (p) => { p.w += 3; p.s -= 3; p.m += 5; p.addFlag('showa_generation'); p.setMem('jpn_salaryman', true); },
      },
    ],
    effect: null,
  },

  // ── THE OFFICE LADY ───────────────────────────────────────────────────────────

  {
    id: 'jpn_office_lady',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1970 && G.currentYear <= 1995 &&
      G.character.gender === 'female' &&
      G.age >= 20 && G.age <= 32 &&
      G.career &&
      !G.mem?.jpn_ol,
    text: 'The company has a word for what you are: OL. Office Lady. You pour the tea at the meeting where the men decide things. You are educated, possibly better educated than several of the men at the meeting. The tea. The filing. The telephone answered on the second ring. The expectation written into the employment contract and the expectation not written there: that you will leave when you marry, and that the career ceiling is not a ceiling if you understand what you\'re in. The Equal Employment Opportunity Law passes in 1986 but what passes in a law and what changes in a room are different timelines.',
    choices: [
      {
        text: 'You stay and navigate. The navigation is the career.',
        tag: null,
        outcome: 'The navigation is real and it costs energy that the men at the meeting do not spend. What you build inside those constraints is yours, and it took more.',
        effect: (p) => { p.e += 5; p.s += 3; p.w += 4; p.m -= 6; p.addFlag('ol_ceiling_lived'); p.setMem('jpn_ol', true); },
      },
      {
        text: 'You leave when the opportunity arrives to do something else.',
        tag: null,
        outcome: 'The something else is more yours. It is also less secure. The tradeoff is specific to this country and this decade.',
        effect: (p) => { p.m += 4; p.r += 4; p.addFlag('ol_ceiling_lived'); p.setMem('jpn_ol', true); },
      },
    ],
    effect: null,
  },

  // ── BURAKUMIN ─────────────────────────────────────────────────────────────────

  {
    id: 'jpn_burakumin',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1955 && G.currentYear <= 2000 &&
      G.ethnicity?.includes('burakumin') &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.jpn_buraku,
    text: 'The word is not said to your face. It is said behind you, or not said but understood. The ancestors of your ancestors were tanners, butchers, executioners — the work of blood and death that the feudal order required and then designated as impure. Legally abolished 1871. The discrimination is an old thing wearing a new set of clothes. The marriage register check: someone\'s family will hire an investigator before agreeing to the match. The neighborhood. The school address. The things that identify you without being said. You are learning that emancipation on paper and emancipation in a room are different documents.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 10; p.addFlag('burakumin_identity'); p.setMem('jpn_buraku', true); },
  },

  // ── THE BUBBLE ────────────────────────────────────────────────────────────────

  {
    id: 'jpn_bubble_years',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1986 && G.currentYear <= 1990 &&
      G.age >= 20 && G.age <= 45 &&
      !G.mem?.jpn_bubble,
    text: (G) => {
      const isWealthy = G.stats.wealth > 55
      return isWealthy
        ? 'The land under the Imperial Palace is worth more than the entire state of California. This is an actual number that the newspapers print as a wonder. Golf club memberships are traded like securities — you know someone who bought one for eighty million yen. Tokyo real estate has doubled every three years for ten years. The department stores in Ginza have doormen in white gloves. The doormen have never been so busy. Everything that is happening feels like it will continue.'
        : 'The city is building something — cranes everywhere, the sound of concrete at six AM, land prices rising faster than salaries. The people with assets are getting richer in a specific way. You are employed. The employment is stable. The gap between the city that is rising and the city you live in has a specific texture: you can see it from the train but you can\'t quite reach it.'
    },
    choices: null,
    effect: (p) => { p.w += 5; p.m += 5; p.addFlag('bubble_generation'); p.setMem('jpn_bubble', true); },
  },

  // ── BUBBLE COLLAPSE / LOST DECADE ────────────────────────────────────────────

  {
    id: 'jpn_bubble_collapse',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1992 && G.currentYear <= 1998 &&
      G.flags.has('bubble_generation') &&
      G.age >= 25 &&
      !G.mem?.jpn_collapse,
    text: 'The Nikkei peaked at 38,915 on December 29, 1989. By the time you are paying attention to what has happened, it is sixty percent down. The company begins offering early retirement to the people who were there the longest, which is a way of saying what it cannot say directly. The land you were told to buy as an investment has lost half its value and the loan has not lost half its value. The Lost Decade is the name it will be given later — later, you will know it had a name. Now it just has a texture: the deflation, the careful spending, the restaurants that were there last year and are not there this year, the friends who were promoted and now are not being promoted.',
    choices: [
      {
        text: 'You tighten and adapt. The decade asks for a different mathematics.',
        tag: null,
        outcome: 'You develop a set of habits for contraction that remain useful long after the contraction ends, because the contraction does not quite end.',
        effect: (p) => { p.w -= 8; p.e += 4; p.m -= 6; p.addFlag('lost_decade_generation'); p.setMem('jpn_collapse', true); },
      },
      {
        text: 'The loss is significant enough that you have to start again from a different position.',
        tag: null,
        outcome: 'Starting again in Japan in the 1990s has a specific set of available paths, most of which were not the paths that were supposed to be available.',
        effect: (p) => { p.w -= 15; p.m -= 10; p.r += 8; p.addFlag('lost_decade_generation'); p.setMem('jpn_collapse', true); },
      },
    ],
    effect: null,
  },

  // ── HIKIKOMORI ────────────────────────────────────────────────────────────────

  {
    id: 'jpn_hikikomori',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 14 && G.age <= 28 &&
      (G.stats.happiness < 40 || G.stats.charisma < 30) &&
      !G.mem?.jpn_hikiko,
    text: 'The room is the right size. The room has everything — the screen, the manga, the delivery food slot under the door that your mother fills without making you answer it. Outside is a specific kind of hard. The school was hard in a way the room isn\'t. The company interview was hard in a way the room isn\'t. You have been in the room for four months. You have been in the room for a year. The word for what you are is hikikomori and the government estimates a million of you by 2010, which means the room is not unusual, which is something you find neither comforting nor uncomforting.',
    choices: [
      {
        text: 'You eventually find a way back out. The room was a season, not a life.',
        tag: null,
        outcome: 'The season was long. What you carried out of it is complicated: the knowledge of what your edge is, the knowledge of what the edge cost.',
        effect: (p) => { p.m += 6; p.h -= 5; p.s -= 5; p.addFlag('hikikomori_experience'); p.setMem('jpn_hikiko', true); },
      },
      {
        text: 'The room extends. Years pass in the room.',
        tag: null,
        outcome: 'The years in the room are not nothing. They are years. They shape you in the specific way that prolonged withdrawal shapes a person.',
        effect: (p) => { p.m -= 12; p.h -= 8; p.s -= 10; p.e += 6; p.addFlag('hikikomori_experience'); p.setMem('jpn_hikiko', true); },
      },
    ],
    effect: null,
  },

  // ── FUKUSHIMA / 3.11 ──────────────────────────────────────────────────────────

  {
    id: 'jpn_fukushima',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2011 && G.currentYear <= 2013 &&
      G.age >= 15 &&
      !G.mem?.jpn_311,
    text: (G) => {
      const isTohoku = G.ruralUrban === 'rural'
      return isTohoku
        ? 'March 11, 2011. The earthquake is 9.0 and the shaking lasts six minutes and when it stops the water comes. The tsunami is fifteen meters in some places. The seawall was five meters. Nineteen thousand dead. Then the reactors at Fukushima Daiichi begin to melt. The evacuation zone is twenty kilometers, then thirty, then they are saying something on the radio that is hard to parse into a clear instruction. You are inside the zone. You leave with what you can carry.'
        : 'March 11. The earthquake shakes Tokyo for six minutes — long enough that you understand this is not the usual earthquake. The tsunami footage comes in the afternoon. The reactor news comes in the evening. The government\'s statement uses the word "anzen" — safe — in a sentence that the word does not fit. The city in the days after: the queues at the supermarket for water, the trains stopped, the dark windows of buildings in the rolling blackouts. The word "anzen" does not fit the same way afterward.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 8; p.addFlag('fukushima_generation'); p.setMem('jpn_311', true); },
  },

  // ── AGING PARENT CARE ────────────────────────────────────────────────────────

  {
    id: 'jpn_aging_parent',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1990 &&
      G.age >= 40 && G.age <= 60 &&
      G.parents && (G.parents.father?.alive || G.parents.mother?.alive) &&
      !G.mem?.jpn_kaigo,
    text: 'Japan is the oldest country on earth — twenty-nine percent over sixty-five. The long life expectancy and the low birth rate have produced a specific arithmetic: one working-age person supporting a number of elderly that the system did not calculate. Your parent needs care. The nursing home has a waiting list. The alternative is you. The alternative has a word: kaigo — nursing care — and it has a gender distribution that mirrors the distribution of every other unpaid labor in this society.',
    choices: [
      {
        text: 'You take on the care. It is the expected thing, and also the right thing.',
        tag: null,
        outcome: 'The care is total. It does not leave space for the other parts of your life in the way those parts require space. This is the arithmetic.',
        effect: (p) => { p.h -= 6; p.m -= 5; p.karma += 8; p.addFlag('jpn_caregiver_generation'); p.setMem('jpn_kaigo', true); },
      },
      {
        text: 'You find a facility. The guilt is specific and ongoing.',
        tag: null,
        outcome: 'The facility is fine. The guilt is not about the facility. It is about the expectation of what a child does for a parent, and the distance between the expectation and what you did.',
        effect: (p) => { p.m -= 8; p.r += 5; p.w -= 5; p.addFlag('jpn_caregiver_generation'); p.setMem('jpn_kaigo', true); },
      },
    ],
    effect: null,
  },

  // ── THE WAR THAT IS NOT DISCUSSED ────────────────────────────────────────────

  {
    id: 'jpn_war_silence',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      (G.flags.has('japan_postwar_generation') || G.flags.has('showa_generation') || G.flags.has('showa_salaryman')) &&
      !G.mem?.jpn_war_silence,
    text: 'The Yasukuni Shrine debate resurfaces every year. The textbook controversy resurfaces. The "comfort women" diplomatic crisis cycles through. Your grandchildren ask you about the war and you tell them the versions that were given to you — the suffering of the Japanese civilian, the atomic bombs, the surrender — and in the telling you notice what is missing from the telling. The things that happened in Nanjing, in Manila, in the comfort stations, in the prisoner of war camps. Not absent from the historical record. Absent from the table where you are explaining it.',
    choices: [
      {
        text: 'You tell them what you know, including what your generation was not told.',
        tag: null,
        outcome: 'The telling is uncomfortable. It is also the more honest education. You give your grandchildren the fuller map.',
        effect: (p) => { p.karma += 8; p.r += 4; p.addFlag('jpn_testigo_generation'); p.setMem('jpn_war_silence', true); },
      },
      {
        text: 'You tell them what you were told. The fuller version is too late and too complicated.',
        tag: null,
        outcome: 'The version you pass down is incomplete. You know this. The knowledge of the incompleteness is what you carry.',
        effect: (p) => { p.r += 8; p.addFlag('jpn_testigo_generation'); p.setMem('jpn_war_silence', true); },
      },
    ],
    effect: null,
  },

  // ── HIBAKUSHA — ATOMIC BOMB SURVIVOR ─────────────────────────────────────────

  {
    id: 'jpn_hibakusha',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1945 && G.currentYear <= 1960 &&
      G.age >= 14 &&
      !G.mem?.jpn_hibakusha,
    text: (G) => {
      const city = G.currentYear <= 1947 && G.age <= 35 ? 'Hiroshima' : 'a city'
      return `August 1945. The flash. Anyone who could see it was close enough that the seeing was the last clear thing for a long time. The burns. The silence at the hospital — not because people were not in pain but because the pain was past the reach of sound. Hiroshima and Nagasaki: 200,000 dead in the acute phase, more over the years from radiation illness. You survived. The word for what you are is hibakusha — "explosion-affected person." The word carries a stigma that the survivors did not earn: marriage bureaus begin quietly checking A-bomb registries. Employers do the same. The bomb was August 6 and 9; the discrimination begins in the weeks after and continues for decades.`
    },
    choices: [
      {
        text: 'You tell people. The truth of it is not something you can carry invisibly.',
        tag: null,
        outcome: 'Telling costs you in specific ways — the marriage match that falls through, the employment that does not materialise — and gives you in specific ways: the other hibakusha who know without explanation.',
        effect: (p) => { p.m -= 15; p.h -= 12; p.r += 8; p.karma += 6; p.addFlag('hibakusha'); p.addFlag('hibakusha_survivor'); p.setMem('jpn_hibakusha', true); },
      },
      {
        text: 'You do not tell people. The stigma is real and you cannot survive it twice.',
        tag: null,
        outcome: 'Not telling requires constant maintenance. The body keeps the record regardless. The silence is its own weight, carried alongside the one the bomb left.',
        effect: (p) => { p.m -= 18; p.h -= 10; p.r += 10; p.addFlag('hibakusha'); p.addFlag('hibakusha_survivor'); p.addFlag('hibakusha_silent'); p.setMem('jpn_hibakusha', true); },
      },
    ],
    effect: null,
  },

  // ── ZAINICHI KOREAN IDENTITY ──────────────────────────────────────────────────

  {
    id: 'jpn_zainichi',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.ethnicity === 'korean_japanese' &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 13 && G.age <= 25 &&
      !G.mem?.jpn_zainichi,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1980) {
        return 'The alien registration card. You have carried it since you were fourteen — the law requires it, and the police can ask for it at any time, and not having it is a crime. Your grandparents were brought to Japan before 1945 to work in the mines, the factories, the construction sites. When Japan surrendered, they lost their Japanese citizenship and became foreigners in the country they had lived in for decades. You were born here. You are still a foreigner here. The fingerprinting requirement: the Japanese state requires you to press your ink-covered finger to the registration card. Many Zainichi begin refusing in the 1970s. The refusal is an act that carries legal consequences.'
      }
      return 'You have a Japanese name you use publicly and a Korean name you use at home. Or you have only the Japanese name. Either way, the choice was made for you or by your parents or by the specific calculation of survival in a country that does not grant citizenship by birth. The fingerprinting requirement for Zainichi Koreans ends in 1999 after decades of resistance. What does not end: the question of naturalization, which requires erasing the Korean name from the register, which not everyone is willing to do.'
    },
    choices: [
      {
        text: 'You keep both identities — the Japanese public face and the Korean home face',
        tag: null,
        outcome: 'The maintenance of two names in two registers has a specific cost and a specific dignity. You know who you are in both languages. The country knows you as one of them.',
        effect: (p) => { p.m -= 6; p.e += 4; p.s += 2; p.r += 5; p.addFlag('zainichi_identity'); p.setMem('jpn_zainichi', true); },
      },
      {
        text: 'You naturalize. The Korean name leaves the official record.',
        tag: null,
        outcome: 'The citizenship makes certain things possible and certain things complicated. The loss of the name from the official register is not the same as the loss of the name.',
        effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('zainichi_naturalized'); p.setMem('jpn_zainichi', true); },
      },
      {
        text: 'You resist the fingerprinting and the registration. The resistance has costs.',
        tag: null,
        outcome: 'You are not alone. The Zainichi civil rights movement builds through the 1970s-90s. The fingerprinting ends in 1999. You were part of the argument that ended it.',
        effect: (p) => { p.m -= 8; p.karma += 10; p.addFlag('zainichi_identity'); p.addFlag('zainichi_resisted'); p.setMem('jpn_zainichi', true); },
      },
    ],
    effect: null,
  },

  // ── AUM SHINRIKYO / TOKYO SUBWAY SARIN 1995 ──────────────────────────────────

  {
    id: 'jpn_aum_sarin_1995',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1995 && G.currentYear <= 1997 &&
      G.age >= 20 &&
      !G.mem?.jpn_aum,
    text: 'March 20, 1995. Aum Shinrikyo punctures plastic bags of sarin on five Tokyo subway lines during the morning rush hour. Thirteen people die. Nearly a thousand suffer permanent vision damage. Thousands more require treatment. The attack opens at a place in the Japanese psyche that was supposed to be sealed: the assumption of safety. Japan is a country where violent crime is extremely rare, where the train is on time to the minute, where the implicit social contract includes the subway being safe. That contract is punctured with the bags.',
    choices: [
      {
        text: 'You were on one of the affected lines that morning, or you know someone who was.',
        tag: null,
        outcome: 'The morning that reorganised how you take the subway. The reorganisation is permanent — not as fear exactly, but as a kind of knowledge about what the subway is that you did not have before.',
        effect: (p) => { p.m -= 10; p.h -= 4; p.r += 6; p.addFlag('aum_generation'); p.addFlag('aum_proximate'); p.setMem('jpn_aum', true); },
      },
      {
        text: 'You follow it on the news, in a country where this was not supposed to happen.',
        tag: null,
        outcome: 'Japan\'s relationship with the idea of domestic terrorism before 1995 and after 1995 are two different relationships. You experienced the transition from the outside of the stations.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('aum_generation'); p.setMem('jpn_aum', true); },
      },
    ],
    effect: null,
  },

  // ── AINU IDENTITY ─────────────────────────────────────────────────────────────

  {
    id: 'jpn_ainu',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.ethnicity === 'ainu' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 13 && G.age <= 25 &&
      !G.mem?.jpn_ainu,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1995) {
        return 'The Ainu are the indigenous people of Hokkaido — and Sakhalin, and the Kuril Islands — who were colonized by Japan from the late 19th century. The Hokkaido Former Aborigines Protection Act of 1899 took the land, banned the language, banned the traditional hunting and fishing. You were not taught Ainu language in school. You were taught that the Ainu are an interesting historical subject. The historical subject is you. Japan does not officially recognise you as indigenous. The word "indigenous" will not appear in Japanese law until 2019.'
      }
      return 'The 2019 law recognises the Ainu as Japan\'s indigenous people. The recognition arrives without land rights, without language funding adequate to the task, without the mechanisms that make recognition real. You have been watching the national narrative about the Ainu for decades. The narrative is more comfortable with the Ainu as historical artifact than as people making present demands.'
    },
    choices: [
      {
        text: 'You connect with the Ainu cultural revival — the language, the crafts, the community',
        tag: null,
        outcome: 'The revival is fragile and real. The language was nearly lost; it is being learned again. The cultural connection is something you build rather than inherit, because the chain of transmission was broken. Building it is its own form of continuity.',
        effect: (p) => { p.m += 4; p.e += 4; p.r += 4; p.addFlag('ainu_identity'); p.addFlag('ainu_revival'); p.setMem('jpn_ainu', true); },
      },
      {
        text: 'You navigate Japan as Japanese, holding your Ainu origin as private knowledge',
        tag: null,
        outcome: 'Passing is possible because Ainu and Japanese are not visually distinct. The private knowledge is still knowledge — it shapes how you read the history being taught around you.',
        effect: (p) => { p.r += 6; p.addFlag('ainu_identity'); p.setMem('jpn_ainu', true); },
      },
    ],
    effect: null,
  },

  // ── OKINAWA AND THE BASES ─────────────────────────────────────────────────────

  {
    id: 'jpn_okinawa_bases',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1972 && G.currentYear <= 2020 &&
      G.age >= 16 && G.age <= 45 &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.jpn_okinawa,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1980) {
        return 'Okinawa reverted to Japanese sovereignty in 1972 after twenty-seven years of American administration. The reversion brought a Japanese passport but the bases did not leave. Seventy percent of US military bases in Japan are in Okinawa, which is less than one percent of Japan\'s land area. The noise of the F-15s. The off-limits district outside Camp Hansen. The accidents. The 1995 rape of a twelve-year-old girl by three US servicemen becomes the trigger for mass protests — 85,000 people in the streets, the largest protest in Okinawan history.'
      }
      return 'Okinawa is asked to carry the cost of the US-Japan security alliance while Tokyo and Osaka receive its benefits. The proposed relocation of Marine Corps Air Station Futenma to Henoko — offshore, still in Okinawa — has been opposed by local government for twenty years. Successive Japanese prime ministers promise to resolve it and then, under American pressure, do not resolve it. You live under the flight path. The flight path is the argument, conducted in noise, about who decides what.'
    },
    choices: [
      {
        text: 'The bases are an occupation with a different name — you oppose them',
        tag: null,
        outcome: 'The opposition is the majority position in Okinawa and a minority position in Tokyo. You are in the political geography of a prefecture whose preferences the national government has decided are not the deciding factor.',
        effect: (p) => { p.r += 6; p.karma += 4; p.addFlag('okinawa_base_opposition'); p.setMem('jpn_okinawa', true); },
      },
      {
        text: 'The bases bring employment and the alliance is security — the argument is more complicated',
        tag: null,
        outcome: 'The employment argument is real and the security argument is real and both are used by Tokyo and both arguments land differently in Okinawa than they land in Tokyo. You know the landing from the inside.',
        effect: (p) => { p.r += 4; p.addFlag('okinawa_base_opposition'); p.setMem('jpn_okinawa', true); },
      },
    ],
    effect: null,
  },

]

export default JAPAN_EVENTS

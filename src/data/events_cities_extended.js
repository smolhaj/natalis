// Extended city-specific texture events.
// Covers Europe, East Asia, South/SE Asia, Middle East, Africa, Latin America, Anglosphere.
// Gated on G.place?.id + G.currentYear era gates.
// Follow-through events are written BEFORE their triggering events within each city section.
// Major flags set here: berlin_wall_era_lived, survived_khmer_rouge, buenos_aires_junta_era,
//   tehran_revolution_witness, seoul_divided_family, left_junta_chile, harana_hyperinflation_lived.

export const CITIES_EXTENDED_EVENTS = [

  // ── BERLIN ────────────────────────────────────────────────────────────────────
  // id: 'de_berlin' — Full depth: 5 events

  // Follow-through for berlin_wall_era_lived: the Wall falls
  {
    id: 'city_berlin_wall_falls',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'de_berlin' &&
      G.currentYear === 1989 &&
      G.flags.has('berlin_wall_era_lived') &&
      !G.mem?.berlinWallFell,
    text: () =>
      `November 9, 1989. The checkpoints open. You hear it on the radio before you believe it, and then you go outside and the street is moving — everyone moving in the same direction, east to west or west to east, it no longer matters. Strangers are embracing on the Bornholmer Straße bridge. Someone is hitting the Wall with a hammer and laughing. This is the night you will describe for the rest of your life, aware that the description is never quite it.`,
    choices: null,
    effect: (p) => { p.m += 15; p.addFlag('witnessed_wall_fall'); p.setMem('berlinWallFell', true) },
  },

  // Follow-through for witnessed_wall_fall: the friction of reunification
  {
    id: 'city_berlin_post_unification',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'de_berlin' &&
      G.currentYear >= 1991 && G.currentYear <= 1999 &&
      G.flags.has('witnessed_wall_fall') &&
      !G.mem?.berlinReunificationFelt,
    text: () =>
      `The city is one now — officially. The Ossis and the Wessis navigate each other with a careful politeness that conceals genuine difference. The East is being renovated at a speed that also erases it. A neighborhood you knew as a child has new cafes and unchanged apartments and a rent increase that is coming. Something was won. Something is also being lost. Both things are true on the same street.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('berlinReunificationFelt', true) },
  },

  // Event 1: Postwar rubble
  {
    id: 'city_berlin_postwar_rubble',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'de_berlin' &&
      G.currentYear >= 1945 && G.currentYear <= 1960 &&
      !G.mem?.berlinRubbleSeen,
    text: () =>
      `Postwar Berlin. The Trümmerfrauen — rubble women — have been clearing the city by hand since 1945, passing bricks down human chains, stacking them in mounds that become new hills. The Teufelsberg, where you sometimes play, is a rubble hill. The city is rebuilding out of its own wreckage. The gaps in the street where buildings were are not empty; they are the shape of what was lost.`,
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('berlinRubbleSeen', true) },
  },

  // Event 2: The Wall goes up (triggers berlin_wall_era_lived)
  {
    id: 'city_berlin_wall_goes_up',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'de_berlin' &&
      G.currentYear === 1961 &&
      !G.mem?.berlinWallWentUp,
    text: () =>
      `August 13, 1961. You wake up and the city is different. Overnight, soldiers laid barbed wire along the sector border. By the end of the week it will be concrete blocks. The city you could cross freely yesterday cannot be crossed today. You stand at the end of a street that now ends at wire. On the other side, a man stands looking at the same wire from the other direction. You do not speak. There is nothing to say yet.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('berlin_wall_era_lived'); p.setMem('berlinWallWentUp', true) },
  },

  // Event 3: Living with the Wall
  {
    id: 'city_berlin_divided_life',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) =>
      G.place?.id === 'de_berlin' &&
      G.currentYear >= 1962 && G.currentYear <= 1988,
    text: (G) => {
      const side = G.flags.has('berlin_wall_era_lived') ? 'The Wall is part of the street furniture now' : 'The division has become ordinary'
      return `${side} — you navigate around it the way you navigate around a building, without thinking. On the western side, the watchtowers face inward and the guards do not wave. There are relatives you last saw in 1961 who are now unreachable by telephone. The city functions. People fall in love, raise children, argue about money. The Wall is not discussed at dinner. The Wall is the table.`
    },
    choices: null,
    effect: (p) => { p.m -= 2; },
  },

  // ── SEOUL ─────────────────────────────────────────────────────────────────────
  // id: 'kr_seoul' — Full depth: 5 events

  // Follow-through for seoul_divided_family: the brief reunions (2000+)
  {
    id: 'city_seoul_family_reunion',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear >= 2000 &&
      G.flags.has('seoul_divided_family') &&
      !G.mem?.seoulReunionAttempt,
    text: () =>
      `The Red Cross reunions have started — brief, chaperoned meetings in a hotel ballroom where families separated since 1953 see each other for two hours. Your relative is on the list this year. You go. The person across the table is your age and a stranger. You share a name for someone you both lost. The interpreter translates carefully. Two hours, and then they take them back across the border. You stand in the lobby for a long time afterward.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 5; p.setMem('seoulReunionAttempt', true) },
  },

  // Event 1: Korean War ruins
  {
    id: 'city_seoul_war_ruins',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear >= 1953 && G.currentYear <= 1965 &&
      !G.mem?.seoulWarRuinsSeen,
    text: () =>
      `Seoul after the war. The city changed hands four times and shows it. The Han River bridges were destroyed. The government buildings are shells. Your family has returned from wherever you sheltered and the neighborhood is half-standing, half-rubble. A child at school has no father. Another has no house. Everyone has something missing. The country is one of the poorest on earth. There is a government plan and it does not explain where to start.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('seoulWarRuinsSeen', true) },
  },

  // Event 2: The divided family
  {
    id: 'city_seoul_divided_family',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear >= 1953 && G.currentYear <= 1975 &&
      !G.mem?.seoulDividedFamily,
    text: () =>
      `Your mother keeps a photograph of her sister on the dresser. Her sister lives in Pyongyang — or did, in 1950, which is the last information anyone has. Letters do not go there. The Red Cross has a programme but the list is very long and moving slowly. The photograph is from before the war. Your mother looks at it in the evenings. She does not talk about it, which is how you know it is the most important thing.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('seoul_divided_family'); p.setMem('seoulDividedFamily', true) },
  },

  // Event 3: Economic miracle from inside
  {
    id: 'city_seoul_economic_miracle',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      !G.mem?.seoulMiracleLived,
    text: () =>
      `The country is growing at ten percent a year. The Saemaul Undong — New Community Movement — is rebuilding villages on state television. In Seoul, Hyundai is hiring and the Guro Export Industrial Complex runs three shifts. Your uncle works six days a week and sends money home. The logic of the Park Chung-hee years is simple: accept the government, receive growth. Almost everyone is accepting the government.`,
    choices: null,
    effect: (p) => { p.m += 3; p.mo += 1000; p.setMem('seoulMiracleLived', true) },
  },

  // Event 4: 1987 democracy struggle
  {
    id: 'city_seoul_democracy_struggle',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear === 1987 &&
      !G.mem?.seoulDemocracyStruggle,
    text: () =>
      `June 1987. The protests began after a student died during interrogation. By June 10 there are a million people in the streets. The tear gas is constant — the city smells of it for weeks. The university students in front are running from the police. On June 29, Roh Tae-woo announces direct elections. The country has been negotiating this since Gwangju 1980 and something has finally given. You are in the crowd or watching it on television. Either way, you know you are inside something that will be in history books.`,
    choices: null,
    effect: (p) => { p.m += 6; p.e += 3; p.addFlag('seoul_democracy_generation'); p.setMem('seoulDemocracyStruggle', true) },
  },

  // Event 5: 1988 Olympics as coming-out
  {
    id: 'city_seoul_olympics',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kr_seoul' &&
      G.currentYear === 1988 &&
      !G.mem?.seoulOlympics,
    text: () =>
      `Seoul 1988. One hundred and fifty-nine countries. The opening ceremony is watched by two billion people, which is a number that has never applied to South Korea before. The country that was a basket case in 1953 is now running an Olympics. You know what this means and you do not need to explain it to anyone who was here for the war. For a week the city is not about anything else.`,
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('seoulOlympics', true) },
  },

  // ── BUENOS AIRES ──────────────────────────────────────────────────────────────
  // id: 'ar_buenos_aires' — Full depth: 5 events

  // Follow-through for buenos_aires_junta_era: CONADEP truth commission
  {
    id: 'city_ba_conadep',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ar_buenos_aires' &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      G.flags.has('buenos_aires_junta_era') &&
      !G.mem?.conadepMoment,
    text: () =>
      `The CONADEP report — Nunca Más, Never Again — is published. It documents 8,961 disappeared, though the real number is larger. The book sells three hundred thousand copies in the first weeks. You read it or you do not read it. If you read it, there are names you recognize in the index. The country is trying to say what happened to it out loud, in public, on paper. This is a different kind of courage from the kind required during the dictatorship, and it is also hard.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('witnessed_truth_commission'); p.setMem('conadepMoment', true) },
  },

  // Event 1: Junta daily life
  {
    id: 'city_ba_junta_daily_life',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ar_buenos_aires' &&
      G.currentYear >= 1976 && G.currentYear <= 1983 &&
      !G.mem?.juntaDailyLifeLived,
    text: () =>
      `Buenos Aires under the Proceso. The streets are normal — the cafes are open, the football is on, the tango clubs are full on weekends. This is the daily texture of a country that is disappearing its own citizens. You calibrate what you say and to whom. Certain topics vanish from conversation as thoroughly as certain people vanish from the streets. The word desaparecido does not yet exist in its current meaning. It is accumulating one person at a time.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('buenos_aires_junta_era'); p.setMem('juntaDailyLifeLived', true) },
  },

  // Event 2: Madres de Plaza de Mayo
  {
    id: 'city_ba_plaza_de_mayo',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ar_buenos_aires' &&
      G.currentYear >= 1977 && G.currentYear <= 1983 &&
      !G.mem?.plazaDeMayoSeen,
    text: () =>
      `The women walk in a circle around the Plaza de Mayo every Thursday. They carry photographs of their children — grown children, not babies — and wear white headscarves. The government calls them madwomen. The military watches from the edges of the square. You walk past or you walk past quickly or you stop and stand with them for a while. These are the three options and none of them are neutral.`,
    choices: [
      {
        text: 'Stand with them. Even for a moment.',
        tag: null,
        outcome: 'You stay for twenty minutes. A woman shows you a photograph. Her son was 26. You do not speak. You stand.',
        effect: (p) => { p.m -= 4; p.karma += 6; p.addFlag('witnessed_madres'); p.setMem('plazaDeMayoSeen', true) },
      },
      {
        text: 'Walk past. The risk is real.',
        tag: null,
        outcome: 'You walk past. That evening you think about the woman with the photograph. You think about her often.',
        effect: (p) => { p.m -= 5; p.r += 4; p.setMem('plazaDeMayoSeen', true) },
      },
    ],
  },

  // Event 3: Falklands/Malvinas 1982
  {
    id: 'city_ba_malvinas',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ar_buenos_aires' &&
      G.currentYear === 1982 &&
      !G.mem?.malvinasMoment,
    text: () =>
      `April 1982. The Junta invades the Malvinas — the Falklands — and Buenos Aires erupts in support. The Plaza de Mayo fills with thousands chanting the slogan of the war. The same generals who have been disappearing people for six years are now national heroes for a week. Then the British arrive and the Argentinian conscripts — working-class boys in summer uniforms in an Antarctic winter — begin losing. By June it is over. The defeat ends the dictatorship. The specific feeling is: relief and shame at the same time, inseparable.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.setMem('malvinasMoment', true) },
  },

  // Event 4: 2001 economic crisis
  {
    id: 'city_ba_corralito_2001',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ar_buenos_aires' &&
      G.currentYear >= 2001 && G.currentYear <= 2003 &&
      !G.mem?.corralito2001,
    text: () =>
      `The corralito: the government has frozen bank accounts. Your savings — pesos or dollars, it doesn't matter — are inaccessible. The currency collapses overnight. Supermarkets are ransacked. Pots and pans are banging in the street outside your building every night at eight. Five presidents in eleven days. The country has been broken by a debt it accumulated for reasons that will be argued about forever, and the cost is landing on your kitchen table right now.`,
    choices: [
      {
        text: 'Convert whatever you can to dollars or hard assets now.',
        tag: null,
        outcome: 'You lose less than most. Not none. The experience of watching money become unreliable changes how you think about money permanently.',
        effect: (p) => { p.wipeMoney(0.3); p.e += 3; p.setMem('corralito2001', true) },
      },
      {
        text: 'Wait it out. Something will be done.',
        tag: null,
        outcome: 'Something is done — eventually. In the meantime you lose more. The thing that is done is not quite enough.',
        effect: (p) => { p.wipeMoney(0.55); p.m -= 6; p.setMem('corralito2001', true) },
      },
    ],
  },

  // ── PHNOM PENH ────────────────────────────────────────────────────────────────
  // id: 'kh_phnom_penh' — Full depth: 4 events

  // Follow-through for survived_khmer_rouge: carrying the silence
  {
    id: 'city_pp_carrying_silence',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kh_phnom_penh' &&
      G.flags.has('survived_khmer_rouge') &&
      G.currentYear >= 1990 &&
      !G.mem?.khmerSilenceCarried,
    text: () =>
      `Your children ask you what it was like. You tell them some of it — enough to understand the shape of it — but not all of it. The not-all-of-it is not a decision you made. It is the body's decision. Some things do not translate into the language of dinner tables and school reports. The years between 1975 and 1979 exist in a different register from everything else. You carry them separately.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 2; p.setMem('khmerSilenceCarried', true) },
  },

  // Follow-through: ECCC tribunal
  {
    id: 'city_pp_eccc_tribunal',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kh_phnom_penh' &&
      G.flags.has('survived_khmer_rouge') &&
      G.currentYear >= 2006 &&
      !G.mem?.ecccTribunal,
    text: () =>
      `The Extraordinary Chambers — the genocide tribunal — has opened. They are trying Nuon Chea and Khieu Samphan: the Brother Number Two and the head of state of Democratic Kampuchea. The proceedings are slow. You are in your sixties or seventies. The accused are in their eighties. The testimony is being recorded. The question of whether this is justice or the bureaucratic form of justice is a question you have been turning over for thirty years.`,
    choices: null,
    effect: (p) => { p.m += 3; p.r -= 2; p.setMem('ecccTribunal', true) },
  },

  // Event 1: The evacuation 1975
  {
    id: 'city_pp_evacuation_1975',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kh_phnom_penh' &&
      G.currentYear === 1975 &&
      !G.mem?.ppEvacuation1975,
    text: () =>
      `April 17, 1975. The Khmer Rouge have entered the city. The soldiers are very young and very serious and none of them are smiling. They are telling everyone through loudspeakers that the Americans will bomb the city in two hours and everyone must leave. You carry what you can. You do not know the bombing is not coming. You join the million people being walked out of Phnom Penh on foot, into the countryside, with no stated destination. The city empties in a day.`,
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('survived_khmer_rouge'); p.setMem('ppEvacuation1975', true) },
  },

  // Event 2: Year Zero survival
  {
    id: 'city_pp_year_zero',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kh_phnom_penh' &&
      G.currentYear >= 1976 && G.currentYear <= 1978 &&
      G.flags.has('survived_khmer_rouge') &&
      !G.mem?.yearZeroSurvived,
    text: () =>
      `Democratic Kampuchea. The currency has been abolished, money does not exist, you work in a collective agricultural brigade. The cadres are young — some are children — and they have absolute authority. Your education, your language skills, your glasses: these are liabilities. You learn which things to hide. The ration is a tin of rice. You make it stretch. One person in four will not survive this.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 8; p.e += 2; p.setMem('yearZeroSurvived', true) },
  },

  // Event 3: Liberation and return
  {
    id: 'city_pp_return',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'kh_phnom_penh' &&
      G.currentYear >= 1979 && G.currentYear <= 1985 &&
      G.flags.has('survived_khmer_rouge') &&
      !G.mem?.ppReturn,
    text: () =>
      `The Vietnamese army entered in January 1979 and it ended. You make your way back to Phnom Penh — walking, or riding something, or paying someone to carry you. The city is empty in the specific way of a place that has been forcibly emptied. The house you lived in has different people in it now, or nobody. You do not ask who they are. You find a space and you begin again, which is what the survivors of Year Zero spend the next decade doing.`,
    choices: null,
    effect: (p) => { p.m += 4; p.h += 3; p.setMem('ppReturn', true) },
  },

  // ── TEHRAN ────────────────────────────────────────────────────────────────────
  // id: 'ir_tehran' — Full depth: 4 events

  // Event 1: The Revolution 1979
  {
    id: 'city_tehran_revolution_1979',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ir_tehran' &&
      G.currentYear === 1979 &&
      !G.mem?.tehranRevolution79,
    text: () =>
      `The Shah has left. The Ayatollah's plane lands on February 1 and five million people line the streets. You are there or you are watching from a rooftop or you are listening on the radio. The revolution is over before its consequences are visible. The Islamic Republic is declared in April. The women who marched against the Shah now march against the compulsory hijab. The leftists who fought the Shah are next — they just don't know it yet.`,
    choices: null,
    effect: (p) => { p.m += 3; p.addFlag('tehran_revolution_witness'); p.setMem('tehranRevolution79', true) },
  },

  // Event 2: Iran-Iraq War in Tehran
  {
    id: 'city_tehran_iran_iraq_war',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ir_tehran' &&
      G.currentYear >= 1980 && G.currentYear <= 1988 &&
      !G.mem?.tehranWarYears,
    text: () =>
      `Iraq is bombing Tehran. The raids come at night, which is when the blackout curtains go up and families move to interior rooms. The siren system gives you some warning. The bread lines are longer because of rationing. At the front, young men are being sent in human waves, some with keys to paradise that the clerics gave them. You have a son who is old enough. This is the calculation Tehran families make every morning.`,
    choices: [
      {
        text: 'Your son volunteers. You do not stop him.',
        tag: null,
        outcome: 'He goes. He comes back — changed, intact, one of the ones who came back. Eight years later, the war ends with a ceasefire and no territorial change.',
        effect: (p) => { p.m -= 8; p.h -= 3; p.addFlag('family_in_war'); p.setMem('tehranWarYears', true) },
      },
      {
        text: 'Find a way to keep him in Tehran. University, medical deferment, something.',
        tag: null,
        outcome: 'It costs. The deferment is arranged. Your son lives. You do not talk about how.',
        effect: (p) => { p.mo -= 3000; p.m += 2; p.setMem('tehranWarYears', true) },
      },
    ],
  },

  // Event 3: Daily life under the Islamic Republic
  {
    id: 'city_tehran_daily_surveillance',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.id === 'ir_tehran' &&
      G.currentYear >= 1980 &&
      G.flags.has('tehran_revolution_witness'),
    text: () =>
      `The morality police are on Vali-e-Asr Street this afternoon. A woman ahead of you is being told her hijab is incorrect — she knows how to argue the regulation back and they let her go. You know which phrases are safe at the office and which are not. The satellite dish on your roof is technically illegal and the building manager has not reported it, which is its own form of social contract. The private and the public are two different countries with one address.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; },
  },

  // Event 4: Khatami reform years
  {
    id: 'city_tehran_khatami_years',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ir_tehran' &&
      G.currentYear >= 1997 && G.currentYear <= 2005 &&
      !G.mem?.khatamiBrief,
    text: () =>
      `Khatami wins the presidency and something opens — briefly. The newspapers multiply. The cafes allow some of what was not allowed. University students are talking in ways that were not possible in 1990. You notice it the way you notice a room when someone opens a window. Then, gradually, the window closes again — the Guardian Council blocks reformist candidates, the judiciary prosecutes journalists. The opening was real. The closing is also real. This is the specific shape of the hope available in Tehran.`,
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.setMem('khatamiBrief', true) },
  },

  // ── TOKYO ─────────────────────────────────────────────────────────────────────
  // id: 'jp_tokyo' — Medium depth: 3 events

  {
    id: 'city_tokyo_postwar_reconstruction',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'jp_tokyo' &&
      G.currentYear >= 1946 && G.currentYear <= 1960 &&
      !G.mem?.tokyoPostwarSeen,
    text: () =>
      `Tokyo after the war. Much of the city was firebombed; the rebuilding is total and deliberate. American goods are in the shops alongside Japanese goods without explanation. The emperor gave a radio address saying he was not a god. This fact has been absorbed and is not discussed. The country is remaking itself at a speed that is not quite processing — something is being built on top of something that has not been fully examined. The construction noise is constant.`,
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('tokyoPostwarSeen', true) },
  },

  {
    id: 'city_tokyo_salaryman',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'jp_tokyo' &&
      G.currentYear >= 1965 && G.currentYear <= 1990 &&
      !!G.career &&
      !G.mem?.tokyoSalarymanTexture,
    text: () =>
      `The company provides the apartment, the social club, the pension, the drinking group that meets on Fridays, the morning exercise that begins the day. In return, you provide the day. The contract is unwritten and absolute. *Karoshi* — death from overwork — has a word now, which means it happens often enough to need one. You take the last train home. Your wife has left dinner wrapped in the refrigerator. You eat it standing at the counter. Tomorrow is the same.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.mo += 2000; p.setMem('tokyoSalarymanTexture', true) },
  },

  {
    id: 'city_tokyo_bubble_burst',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'jp_tokyo' &&
      G.currentYear >= 1991 && G.currentYear <= 2000 &&
      !G.mem?.tokyoBubbleBurst,
    text: () =>
      `The real estate bubble has burst. Your company's stock has lost sixty percent of its value since 1989. Several colleagues have taken early retirement packages that are not really packages. The salary is unchanged but the bonus is zero and the bonus was the difference. The lost decade is a phrase people are starting to use. There is a specific quality to prosperity that reveals itself only when it stops — the specific texture of a room that has changed temperature.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.wipeMoney(0.25); p.setMem('tokyoBubbleBurst', true) },
  },

  // ── LONDON ────────────────────────────────────────────────────────────────────
  // id: 'uk_london' — Medium depth: 3 events

  {
    id: 'city_london_windrush_era',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'uk_london' &&
      G.currentYear >= 1948 && G.currentYear <= 1975 &&
      (G.character.country?.name === 'Trinidad and Tobago' || G.character.country?.name === 'Jamaica' || G.character.country?.name === 'Barbados' || G.character.country?.name === 'India' || G.character.country?.name === 'Pakistan') &&
      !G.mem?.windrushLondonArrival,
    text: () =>
      `London. The landlady's sign says No Coloureds, No Irish, No Dogs. You find a room through a man from home who knows someone. The room is small and the gas meter takes coins. The British you had imagined from films is not this Britain. This Britain is cold in a way that is not entirely about weather. At work they call you by a shorter version of your name without asking. You learn which pubs will serve you. There are more of them than you expected. There are also fewer.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('windrush_generation'); p.setMem('windrushLondonArrival', true) },
  },

  {
    id: 'city_london_thatcher_era',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'uk_london' &&
      G.currentYear >= 1979 && G.currentYear <= 1990 &&
      !G.mem?.londonThatcherEra,
    text: () =>
      `Thatcher's London is two cities. The City — the financial square mile — is producing new money at a speed that is transforming Canary Wharf from wasteland to office towers. The rest of London has unemployment, council estate cuts, the Brixton riots of '81. The miners' strike is being watched from here. The sense that the country has decided something fundamental about who it will look after is not an analysis — it is something you feel in the street.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('londonThatcherEra', true) },
  },

  {
    id: 'city_london_ira_texture',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) =>
      G.place?.id === 'uk_london' &&
      G.currentYear >= 1973 && G.currentYear <= 1996,
    text: () =>
      `There has been another bomb. The pub or the railway station or the department store — London has learned to read the news a certain way during the IRA campaign. The litter bins were removed from Tube stations years ago; now they're just gaps where bins used to be. You check under your car if you have one. You know which buildings are protected by barriers. The city functions through it, which is its own statement about what people will absorb in order to continue their lives.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.h -= 1; },
  },

  // ── NAIROBI ───────────────────────────────────────────────────────────────────
  // id: 'ke_nairobi' — Medium depth: 3 events

  {
    id: 'city_nairobi_independence',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ke_nairobi' &&
      G.currentYear >= 1963 && G.currentYear <= 1968 &&
      !G.mem?.nairobiIndependence,
    text: () =>
      `December 12, 1963. Kenya is independent. Jomo Kenyatta speaks at Uhuru Park and the crowd is enormous. Harambee — pulling together — is the word of the moment. The British depart from government offices and Kenyans sit in the chairs. You are in the city for the first time or you are a child of the city or you are a civil servant who was waiting for this moment. Something genuinely new is beginning. The specific quality of that beginning has not yet been tested by what comes after it.`,
    choices: null,
    effect: (p) => { p.m += 8; p.addFlag('nairobi_independence_generation'); p.setMem('nairobiIndependence', true) },
  },

  {
    id: 'city_nairobi_moi_era',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.id === 'ke_nairobi' &&
      G.currentYear >= 1978 && G.currentYear <= 2002,
    text: () =>
      `Moi's Nairobi. The civil service is being staffed by loyalty rather than competence. The Nyayo House detention cells are a known address. You navigate the institution you work in the way you navigate a road with potholes — by knowing exactly where the potholes are and adjusting accordingly. The Goldenberg scandal will be named later; for now you simply know that the money that was allocated for something is not where it was allocated to be.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; },
  },

  {
    id: 'city_nairobi_post_election_2007',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ke_nairobi' &&
      G.currentYear === 2007 &&
      !G.mem?.nairobi2007Violence,
    text: () =>
      `The election results are disputed. In the Kibera and Mathare slums, the violence begins the same night. Kikuyu against Luo, Kalenjin against Kikuyu — the fault lines that were always present have been given permission. On your street the shops are closed and the men are standing in doorways. The army is deployed. Twelve hundred people will die before the power-sharing agreement. This is Nairobi — your city — demonstrating what politics costs when institutions fail.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 2; p.setMem('nairobi2007Violence', true) },
  },

  // ── SÃO PAULO ─────────────────────────────────────────────────────────────────
  // id: 'br_sao_paulo' — Medium depth: 3 events

  {
    id: 'city_sp_economic_miracle_contradiction',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'br_sao_paulo' &&
      G.currentYear >= 1968 && G.currentYear <= 1973 &&
      !G.mem?.spMiracleLived,
    text: () =>
      `São Paulo, the Brazilian economic miracle. The Avenida Paulista is under construction. GDP growing at ten percent a year. The newspapers report figures but not the AI-5 — the institutional act that abolished habeas corpus, suspended political rights, censored the press. The DOPS operates quietly. Caetano Veloso has been arrested and exiled. The radio plays music that says things obliquely. The city is thriving and something else is also happening. Most people in São Paulo know this and arrange not to think about it.`,
    choices: null,
    effect: (p) => { p.m += 3; p.mo += 1500; p.addFlag('military_dictatorship_lived'); p.setMem('spMiracleLived', true) },
  },

  {
    id: 'city_sp_abertura',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'br_sao_paulo' &&
      G.currentYear >= 1979 && G.currentYear <= 1985 &&
      !G.mem?.spAbertura,
    text: () =>
      `Abertura — opening. The military government is releasing its grip slowly and deliberately, at a speed it controls. The amnesty law of 1979 pardons the exiles who return — and also pardons the torturers, which is part of the deal. The Diretas Já movement fills the streets of São Paulo in 1984: one million people demanding direct elections. The elections they demand are denied and then given to them indirectly — and then, in 1989, directly. This is what democracy sounds like when it is being negotiated back from people who took it.`,
    choices: null,
    effect: (p) => { p.m += 5; p.s += 2; p.setMem('spAbertura', true) },
  },

  {
    id: 'city_sp_lula_2003',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'br_sao_paulo' &&
      G.currentYear === 2003 &&
      !G.mem?.spLula2003,
    text: () =>
      `January 1, 2003. Lula — Luiz Inácio Lula da Silva, metalworker, union leader, son of migrants from Pernambuco — takes office as president of Brazil. In São Paulo the feeling is specific: a worker reaching the presidency of a country that spent the previous generation disappearing workers. The financial markets expected catastrophe. The currency held. The Bolsa Família transfers begin. Something is being tested that has not been tested before.`,
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('spLula2003', true) },
  },

  // ── RIO DE JANEIRO ────────────────────────────────────────────────────────────
  // id: 'br_rio'

  {
    id: 'city_rio_favela_texture',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) =>
      G.place?.id === 'br_rio' &&
      (G.neighborhoodTier === 'informal' || G.neighborhoodTier === 'working_class'),
    text: () =>
      `The favela has its own economy — the *baile funk*, the *birosca* corner stores, the informal recycling collectors, the militia that controls three streets on the east side and the drug faction that controls the four streets to the west. You know the geography of it the way city people know which bus to take. The helicopter that circles overhead is the police. The helicopter that circles lower is also the police.`,
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 2; },
  },

  {
    id: 'city_rio_world_cup_olympics',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'br_rio' &&
      (G.currentYear === 2014 || G.currentYear === 2016) &&
      !G.mem?.rioEventMoment,
    text: (G) =>
      G.currentYear === 2014
        ? `The World Cup. Half of Rio has been evicted and their homes demolished for the infrastructure. The Maracanã is full. The team collapses 7–1 against Germany in Belo Horizonte and the country goes quiet in a specific way — not silence but the specific tone of a collective humiliation. Football is not just football here. Everyone knew this already. The score makes it undeniable.`
        : `The Olympics. Three hundred thousand people were displaced for the infrastructure over the last six years. The venues are ready. The Copacabana beach venue is beautiful. In the cidade maravilhosa the gap between what was advertised and what was built is, as always, the story.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('rioEventMoment', true) },
  },

  // ── JAKARTA ───────────────────────────────────────────────────────────────────
  // id: 'id_jakarta' — Medium depth: 3 events

  {
    id: 'city_jakarta_1965_silence',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'id_jakarta' &&
      G.currentYear >= 1966 && G.currentYear <= 1975 &&
      !G.mem?.jakarta1965Silence,
    text: () =>
      `Nobody discusses 1965. The anti-communist purge — half a million people killed in six months, the bodies in the rivers — is not a topic. The New Order has determined that the killings were necessary and the determination is final. You know people who were arrested, or whose fathers were arrested. You do not know exactly what happened to them. The not-knowing is distributed evenly throughout the city and is not discussed at dinner.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('jakarta1965Silence', true) },
  },

  {
    id: 'city_jakarta_suharto_order',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'id_jakarta' &&
      G.currentYear >= 1970 && G.currentYear <= 1997 &&
      !G.mem?.jakartaNewOrderTexture,
    text: () =>
      `Suharto's Jakarta. The roads are improved. The rice is distributed through Bulog. The economy is growing at six percent and the poverty rate is falling. In exchange: no opposition press, no independent unions, the army's territorial structure reaching into every village. The word *KKN* — *korupsi, kolusi, nepotisme* — is known but not spoken in offices. Suharto's children own the toll roads. This is the arrangement and it has been working, in the way that arrangements work when the price is paid by people who have no choice.`,
    choices: null,
    effect: (p) => { p.m += 3; p.mo += 1000; p.setMem('jakartaNewOrderTexture', true) },
  },

  {
    id: 'city_jakarta_1998_fall',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'id_jakarta' &&
      G.currentYear === 1998 &&
      !G.mem?.jakarta1998Fall,
    text: () =>
      `May 1998. The rupiah has lost eighty percent of its value in six months. Students occupy the parliament building. The riots begin on May 13 and for three days Jakarta burns in specific places — the Chinese Indonesian neighborhoods. The mobs have lists of addresses. This is not spontaneous. Your Chinese Indonesian colleagues have gone to ground or left the country. On May 21, Suharto resigns after thirty-two years. Thirty-two years ends on a Tuesday afternoon on television. The city is stunned and then continues.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.wipeMoney(0.2); p.setMem('jakarta1998Fall', true) },
  },

  // ── WARSAW ────────────────────────────────────────────────────────────────────
  // id: 'pl_warsaw' — Medium depth: 3 events

  {
    id: 'city_warsaw_postwar_rebuild',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'pl_warsaw' &&
      G.currentYear >= 1945 && G.currentYear <= 1960 &&
      !G.mem?.warsawPostwarRebuild,
    text: () =>
      `Warsaw was eighty-five percent destroyed. The decision to rebuild it exactly as it was — street by street, building by building, using prewar photographs and paintings — is one of the stranger decisions in architectural history. The Stare Miasto, the Old Town, will be rebuilt as a copy of itself. It will be beautiful and real and also not the original, which is the condition of postwar Warsaw in a different register.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('warsawPostwarRebuild', true) },
  },

  {
    id: 'city_warsaw_solidarity',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'pl_warsaw' &&
      G.currentYear >= 1980 && G.currentYear <= 1981 &&
      !G.mem?.warsawSolidarity,
    text: () =>
      `Solidarity. Ten million members — a third of the country — joined a trade union in fourteen months. The legalisation of Solidarity in August 1980 is followed by meetings in every factory and church hall. The underground press is printing faster than the censor can read. You attend a meeting in a church in Żoliborz and the priest says something that would have been impossible to say eighteen months ago. Martial law is coming — you cannot know that yet — but for now the window is open and the air is extraordinary.`,
    choices: null,
    effect: (p) => { p.m += 6; p.s += 3; p.addFlag('solidarity_era_lived'); p.setMem('warsawSolidarity', true) },
  },

  {
    id: 'city_warsaw_shock_therapy',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'pl_warsaw' &&
      G.currentYear >= 1990 && G.currentYear <= 1996 &&
      !G.mem?.warsawShockTherapy,
    text: () =>
      `The Balcerowicz Plan — shock therapy. Price controls removed overnight. Subsidies ended. State enterprises privatized or left to collapse. Inflation at six hundred percent. The state shops have real goods now and nobody can afford them. A colleague who worked for thirty years at the same factory is let go and the concept of a severance package does not quite exist yet. The macroeconomists call it a success. It is a success. The cost of the success is distributed unequally, as the cost of everything is.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.wipeMoney(0.2); p.setMem('warsawShockTherapy', true) },
  },

  // ── JOHANNESBURG ──────────────────────────────────────────────────────────────
  // id: 'za_johannesburg' — Medium depth: 3 events

  {
    id: 'city_jhb_pass_laws',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'za_johannesburg' &&
      G.currentYear >= 1960 && G.currentYear <= 1986 &&
      G.ethnicity === 'black' &&
      !G.mem?.jhbPassLaws,
    text: () =>
      `The dompas — the reference book — must be on your person at all times in Johannesburg. It specifies where you are permitted to be, when, and why. To be in the city without the right endorsements is a criminal offense. The police check at the bus stop, at the train station, at the corner near your employer's building. The specific rhythm of Johannesburg is, in part, the rhythm of people calculating whether their papers are in order.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('apartheid_pass_book'); p.setMem('jhbPassLaws', true) },
  },

  {
    id: 'city_jhb_soweto_1976',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'za_johannesburg' &&
      G.currentYear === 1976 &&
      !G.mem?.soweto1976,
    text: () =>
      `June 16, 1976. Thousands of Soweto students march against Afrikaans being imposed as the language of instruction. The police open fire. Hector Pieterson is carried in a photograph that will be seen everywhere. The uprising spreads to townships across the country over the following months. The National Party responds by calling the students agitators. The country is watching its own children and deciding what they are — which is the question apartheid forces South Africa to answer incorrectly, every time.`,
    choices: null,
    effect: (p) => { p.m -= 7; p.e += 4; p.setMem('soweto1976', true) },
  },

  {
    id: 'city_jhb_post_94',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'za_johannesburg' &&
      G.currentYear >= 1994 && G.currentYear <= 2005 &&
      !G.mem?.jhbPost94,
    text: () =>
      `Post-94 Johannesburg. The formal apartheid is over and the informal apartheid is rearranging itself. The security walls are higher. The golf estates are whiter than the suburbs were. Black professionals move into neighbourhoods that didn't exist for them before. The city is desegregating unevenly, from the top of the income scale down, and the bottom barely. Rainbow Nation is the phrase in the newspapers. On the street the colours are still organizing themselves along lines that were drawn a long time ago.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('jhbPost94', true) },
  },

  // ── DUBLIN ────────────────────────────────────────────────────────────────────
  // id: 'ie_dublin' — Medium depth: 3 events

  {
    id: 'city_dublin_troubles_spillover',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ie_dublin' &&
      G.currentYear >= 1969 && G.currentYear <= 1994 &&
      !G.mem?.dublinTroubles,
    text: () =>
      `The Troubles are across the border but Dublin is not unaffected. The Dublin and Monaghan bombings of 1974 — Ulster Volunteer Force car bombs on a Friday rush hour — killed thirty-three people on the street outside. The television carries images of Belfast regularly. The IRA uses the Republic as a hinterland. The republic's relationship with the North is the thing that is not resolved and is not discussed directly at the dinner table, where everything else is discussed.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.setMem('dublinTroubles', true) },
  },

  {
    id: 'city_dublin_celtic_tiger',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ie_dublin' &&
      G.currentYear >= 1995 && G.currentYear <= 2007 &&
      !G.mem?.dublinCelticTiger,
    text: () =>
      `Dublin 1999. The country that exported its children for two hundred years cannot build houses fast enough for the people coming in. Polish electricians are in the pubs. The Liffey is lined with cranes. Property prices double in four years. Your cousin who emigrated in 1989 has come back. You have a mortgage on a house that your parents could not have bought. The speed of it is disorienting in the specific way that becoming rich quickly is always disorienting — you do not quite believe it.`,
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 4000; p.setMem('dublinCelticTiger', true) },
  },

  {
    id: 'city_dublin_crash_2008',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ie_dublin' &&
      G.currentYear >= 2008 && G.currentYear <= 2012 &&
      !G.mem?.dublinCrash2008,
    text: () =>
      `The government has guaranteed the banks' liabilities, which are forty percent of GDP, which means the debt belongs to the public. The IMF arrives. The austerity budget cuts public sector pay, healthcare, education. Your mortgage is now worth more than your house. The people who caused this are still employed. The children are emigrating again. The specific bitterness of a country that believed it had escaped its history and then found its history waiting for it.`,
    choices: null,
    effect: (p) => { p.m -= 7; p.wipeMoney(0.2); p.setMem('dublinCrash2008', true) },
  },

  // ── KYIV ──────────────────────────────────────────────────────────────────────
  // id: 'ua_kyiv'

  {
    id: 'city_kyiv_orange_revolution',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ua_kyiv' &&
      G.currentYear >= 2004 && G.currentYear <= 2005 &&
      !G.mem?.kyivOrangeRevolution,
    text: () =>
      `November 2004. The Maidan Nezalezhnosti is orange — orange tents, orange scarves, orange flags. Three weeks of mass protests after a fraudulent election runoff. The temperature is below zero. People are bringing food to the square in shifts. The Supreme Court annuls the election result. Yushchenko wins the re-run. You stood on the Maidan or you watched it on the screen. Either way, the country has demonstrated something about itself that it will refer to again.`,
    choices: null,
    effect: (p) => { p.m += 6; p.s += 3; p.addFlag('maidan_generation'); p.setMem('kyivOrangeRevolution', true) },
  },

  {
    id: 'city_kyiv_euromaidan',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ua_kyiv' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      !G.mem?.kyivEuromaidan,
    text: () =>
      `Winter 2013–2014. The square again — larger this time, colder, longer. Yanukovych's police used force and the crowd grew instead of dispersing. The Berkut officers shoot into the crowd in February. A hundred and five people die on the Maidan in a week. Yanukovych flees to Russia. The country is changed again and the price of the change is higher than 2004. Something has been won and something terrible is beginning.`,
    choices: null,
    effect: (p) => { p.m += 3; p.m -= 6; p.addFlag('euromaidan_lived'); p.setMem('kyivEuromaidan', true) },
  },

  // ── DHAKA ─────────────────────────────────────────────────────────────────────
  // id: 'bd_dhaka'

  {
    id: 'city_dhaka_liberation_legacy',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'bd_dhaka' &&
      G.currentYear >= 1972 && G.currentYear <= 1985 &&
      !G.mem?.dhakaMuktiLegacy,
    text: () =>
      `The Liberation War of 1971 ended nine months after it began, when the Indian army crossed the border and Pakistan surrendered. Three million dead, depending on which government's count you use. Bangladesh is a new country. Your family crossed no border — the border moved around them. The Razakars who collaborated with the Pakistani army live in the neighborhood. Nobody speaks about this directly. The country is very young and very poor and has decided, for now, to move forward.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('dhakaMuktiLegacy', true) },
  },

  {
    id: 'city_dhaka_garment_economy',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'bd_dhaka' &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      !G.mem?.dhakaGarmentEconomy,
    text: () =>
      `The garment factories employ four million people in Bangladesh, eighty percent of them women. The wage is some amount per month that represents enough, which is different from enough. The building you work in or pass every morning has eight floors and produces shirts for European and American retailers at a price that requires the building to be built to a particular specification. The Rana Plaza building collapsed in 2013, killing eleven hundred people. The specification was not met. This is the economy of your city and it is also the economy of the world.`,
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 3; p.setMem('dhakaGarmentEconomy', true) },
  },

  // ── HARARE ────────────────────────────────────────────────────────────────────
  // id: 'zw_harare'

  {
    id: 'city_harare_independence_optimism',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'zw_harare' &&
      G.currentYear >= 1980 && G.currentYear <= 1990 &&
      !G.mem?.harareIndependence,
    text: () =>
      `Zimbabwe, 1980. The country that was Rhodesia is now Zimbabwe and Harare, which was Salisbury, is genuinely different in the specific way that a capital city changes when its government changes. There are Black Zimbabweans in positions that were not available to them last year. The schools are expanding; the literacy rate is rising; the health system is being built. Robert Mugabe gives a conciliation speech that Bob Marley performs at the independence concert. Something that feels like possibility is present and has not yet been tested.`,
    choices: null,
    effect: (p) => { p.m += 7; p.addFlag('zimbabwe_independence_generation'); p.setMem('harareIndependence', true) },
  },

  {
    id: 'city_harare_hyperinflation',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'zw_harare' &&
      G.currentYear >= 2007 && G.currentYear <= 2009 &&
      !G.mem?.harareHyperinflation,
    text: () =>
      `The price of bread has changed since this morning. The one-hundred-trillion-dollar note was issued last year and is already worthless — you use it to light the fire. The official exchange rate is a fiction and the parallel rate changes hourly. Salaries are paid weekly because monthly would be meaningless by the end of the month. The doctors and teachers have left or are leaving. The supermarket shelves are the specific empty of a command economy that has lost control of its commands. The word for this is Zimbabwe, which used to mean something else.`,
    choices: null,
    effect: (p) => { p.m -= 12; p.wipeMoney(0.7); p.addFlag('harare_hyperinflation_lived'); p.setMem('harareHyperinflation', true) },
  },

  // ── ADDIS ABABA ───────────────────────────────────────────────────────────────
  // id: 'et_addis_ababa'

  {
    id: 'city_addis_derg_red_terror',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'et_addis_ababa' &&
      G.currentYear >= 1977 && G.currentYear <= 1980 &&
      !G.mem?.addisRedTerror,
    text: () =>
      `The Red Terror. The Derg — the military committee — has declared it. The targets are the EPRP — the Ethiopian People's Revolutionary Party — and the All-Ethiopia Socialist Movement and students and teachers and anyone whose name is in someone's file. Bodies are left in the street with red-tagged cards. Families are charged for the bullet used to kill their children. You are a university student or you know university students. This is the risk that attaches to being educated and young in Addis Ababa in 1977.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.addFlag('derg_era_survived'); p.setMem('addisRedTerror', true) },
  },

  {
    id: 'city_addis_post_derg',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'et_addis_ababa' &&
      G.currentYear >= 1991 && G.currentYear <= 2000 &&
      !G.mem?.addisPostDerg,
    text: () =>
      `The EPRDF enters Addis Ababa in May 1991. Mengistu has fled to Zimbabwe, where he will live in the villa Mugabe provided. Something ends and something else begins. The Red Terror trials will take years and produce convictions and the convictions will not quite resolve the question of what it cost. The city is released from one thing and not yet certain what comes next.`,
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('addisPostDerg', true) },
  },

  // ── HAVANA ────────────────────────────────────────────────────────────────────
  // id: 'cu_havana'

  {
    id: 'city_havana_revolution_daily',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cu_havana' &&
      G.currentYear >= 1960 && G.currentYear <= 1989 &&
      !G.mem?.havanaRevolutionDaily,
    text: () =>
      `Havana under the Revolution. Literacy is ninety-eight percent — the 1961 campaign sent students into the countryside with lanterns and primers. The healthcare system reaches the countryside. The rationing book — the *libreta* — covers rice, beans, sugar, cooking oil; everything outside the libreta requires a connection or dollars or both. The Committees for the Defense of the Revolution meet on your block monthly. Attendance is voluntary in the way that many things in Cuba are voluntary.`,
    choices: null,
    effect: (p) => { p.h += 2; p.setMem('havanaRevolutionDaily', true) },
  },

  {
    id: 'city_havana_special_period',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cu_havana' &&
      G.currentYear >= 1991 && G.currentYear <= 1999 &&
      !G.mem?.havanaSpecialPeriod,
    text: () =>
      `The Special Period in a Time of Peace — the government's name for it. The Soviet subsidies stopped in 1991 and the economy contracted by a third. The buses are gone; the bicycle is the transport of a city of two million people. The hospital has equipment but no medicines and no spare parts. The *paladares* — illegal home restaurants — multiply because there is nothing else to eat outside the libreta, and the libreta is not enough. You have lost weight. Everyone has lost weight. The weight loss is measured and reported monthly.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 5; p.setMem('havanaSpecialPeriod', true) },
  },

  // ── SANTIAGO ──────────────────────────────────────────────────────────────────
  // id: 'cl_santiago'

  {
    id: 'city_santiago_coup_1973',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cl_santiago' &&
      G.currentYear === 1973 &&
      !G.mem?.santiagoCoup73,
    text: () =>
      `September 11, 1973. The Hawker Hunter jets bomb the Palacio de la Moneda — the presidential palace — at noon. Allende dies inside, either shot or shooting himself; the radio plays military marching music. The curfew is in place by the afternoon. DINA begins its operations. The National Stadium becomes a detention center. What was one of Latin America's oldest democracies is gone in a morning, with assistance from Washington, which prefers not to discuss this.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.addFlag('left_junta_chile'); p.setMem('santiagoCoup73', true) },
  },

  {
    id: 'city_santiago_return_to_democracy',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cl_santiago' &&
      G.currentYear >= 1990 && G.currentYear <= 1995 &&
      !G.mem?.santiagoReturnDemocracy,
    text: () =>
      `The plebiscite said No and Pinochet accepted it, which was not certain in advance. The Rettig Commission will name the dead — two thousand four hundred and seventy-nine people killed or disappeared — and the commission report will be handed to President Aylwin on television and he will cry, which is something a Chilean president has not done on television before. The question of the detained and tortured — some thirty thousand — will take another decade to process. The country is trying to understand what it did while still living alongside the people who did it.`,
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.addFlag('witnessed_truth_commission'); p.setMem('santiagoReturnDemocracy', true) },
  },

  // ── CARACAS ───────────────────────────────────────────────────────────────────
  // id: 've_caracas'

  {
    id: 'city_caracas_oil_boom',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 've_caracas' &&
      G.currentYear >= 1973 && G.currentYear <= 1985 &&
      !G.mem?.caracasOilBoom,
    text: () =>
      `The oil price quadrupled in 1973 and Venezuela is swimming. The *Venezuela Saudita* moment: Caracas is building highways and importing Scotch whisky and sending students to American universities. The phrase *dame dos* — give me two — describes the Venezuelan tourist abroad. The government is spending faster than the oil comes out of the ground, which will matter later. For now the city is full of cranes and the exchange rate is favorable and the future is being imported along with everything else.`,
    choices: null,
    effect: (p) => { p.m += 6; p.mo += 3000; p.setMem('caracasOilBoom', true) },
  },

  {
    id: 'city_caracas_bolivarian_collapse',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 've_caracas' &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      !G.mem?.caracasCollapse,
    text: () =>
      `Caracas 2016. There is no flour, no cooking oil, no medicine in the pharmacies, no toilet paper. The lines outside the supermarkets begin at 5 AM. The *bachaqueros* — black marketeers — sell what they find in the lines at ten times the controlled price, which is at ten times the black market price from 2014. Three million Venezuelans have left the country. You stay because your mother is here, or because you have nowhere to go, or because leaving requires money you no longer have.`,
    choices: null,
    effect: (p) => { p.m -= 10; p.wipeMoney(0.4); p.addFlag('bolivarian_collapse_lived'); p.setMem('caracasCollapse', true) },
  },

  // ── SHANGHAI ──────────────────────────────────────────────────────────────────
  // id: 'cn_shanghai'

  {
    id: 'city_shanghai_opening_up',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cn_shanghai' &&
      G.currentYear >= 1980 && G.currentYear <= 1995 &&
      !G.mem?.shanghaiOpeningUp,
    text: () =>
      `The first joint ventures. An American company has opened an office on the Bund. The workers wear suits that look different from Chinese suits. The special economic zone logic — capitalism inside a socialist frame — is being tested. Your cousin went to Shenzhen and came back with a VCR. Shanghai is slower to change than the south but it is changing. The word *xiahai* — plunging into the sea — describes what it means to leave the state enterprise for private business. Many people are plunging.`,
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('shanghaiOpeningUp', true) },
  },

  {
    id: 'city_shanghai_pudong_rise',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'cn_shanghai' &&
      G.currentYear >= 1995 && G.currentYear <= 2010 &&
      !G.mem?.shanghaiPudong,
    text: () =>
      `Pudong. Ten years ago it was farmland across the river. Now it is the Oriental Pearl Tower and the Jin Mao Building and the specific skyline that Shanghai is presenting to the world as evidence of something. The construction never stops — the cranes are visible from Puxi at night by their flashing lights. You are watching a city build its own mythology in real time. The mythology is also real: the city genuinely changed and is still changing and the rate of change itself is the statement.`,
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('shanghaiPudong', true) },
  },

  // ── DELHI ─────────────────────────────────────────────────────────────────────
  // id: 'in_delhi'

  {
    id: 'city_delhi_partition_shadow',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'in_delhi' &&
      G.currentYear >= 1947 && G.currentYear <= 1960 &&
      !G.mem?.delhiPartitionShadow,
    text: () =>
      `Delhi, 1947. The Partition brought a million refugees from Lahore and Rawalpindi and Sialkot — Muslim families going west, Hindu and Sikh families coming east. The refugee camps in Purana Qila. The families in Lajpat Nagar who arrived with what they could carry from a house they have not seen since. The city is twice as large as it was a year ago and the new half is people for whom Delhi is a consolation prize. They build it anyway into something permanent.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('delhiPartitionShadow', true) },
  },

  {
    id: 'city_delhi_emergency_1975',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'in_delhi' &&
      G.currentYear >= 1975 && G.currentYear <= 1977 &&
      !G.mem?.delhiEmergency,
    text: () =>
      `June 25, 1975. Indira Gandhi declares a state of emergency. The press is censored — the newspapers have blank spaces where the stories were. The opposition leaders are arrested. Sanjay Gandhi's slum clearances in the Turkman Gate area displace two hundred thousand people forcibly. In the government offices on Rajpath, the work continues as if nothing has changed, because the work is the work and the constitution is suspended and both are true simultaneously.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.setMem('delhiEmergency', true) },
  },

  // ── ACCRA ─────────────────────────────────────────────────────────────────────
  // id: 'gh_accra'

  {
    id: 'city_accra_independence_1957',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'gh_accra' &&
      G.currentYear >= 1957 && G.currentYear <= 1965 &&
      !G.mem?.accraIndependence57,
    text: () =>
      `March 6, 1957. Nkrumah declares independence at the Polo Grounds in Accra: "Ghana, your beloved country, is free forever." The first sub-Saharan African country to achieve independence from colonial rule. The crowd at the Polo Grounds is enormous. You are ten years old or twenty or forty and you have lived in a country that was called the Gold Coast and called property and called a colony and is now called Ghana, which is what it was always called before it was called those other things.`,
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('ghana_independence_generation'); p.setMem('accraIndependence57', true) },
  },

  {
    id: 'city_accra_nkrumah_coup_disillusionment',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'gh_accra' &&
      G.currentYear >= 1966 && G.currentYear <= 1975 &&
      G.flags.has('ghana_independence_generation') &&
      !G.mem?.accraPostCoup,
    text: () =>
      `Nkrumah was deposed while traveling in February 1966. The military announced it on the radio. The Convention People's Party offices were vandalized. The man who said "Ghana, your beloved country, is free forever" is in Guinea, where Sékou Touré gave him asylum and a title. The specific experience of having believed in a project and watching it end — not fail but be removed — is a feeling that reshapes what you believe is possible from politics. You are adjusting.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.setMem('accraPostCoup', true) },
  },

  // ── ISTANBUL ──────────────────────────────────────────────────────────────────
  // id: 'tr_istanbul'

  {
    id: 'city_istanbul_coup_culture',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.place?.id === 'tr_istanbul' &&
      G.currentYear >= 1960 && G.currentYear <= 2000,
    text: (G) => {
      if (G.currentYear >= 1960 && G.currentYear < 1972) return `There has been a coup. The radio is playing classical music, which is how you know. The constitution is suspended; the National Unity Committee has announced the new order. Istanbul has absorbed this — the bridges are still running, the Grand Bazaar will open at nine. Turkey's relationship with its military is the background architecture of the republic.`
      if (G.currentYear >= 1980 && G.currentYear < 1984) return `The 1980 coup suspended all political activity. Six hundred and fifty thousand people were detained in the first three years. The constitution was rewritten by the military and ratified by ninety-one percent — a figure that requires some understanding of how the question was framed and who was in the room. Istanbul navigates this the way it navigates everything: by continuing.`
      return `There has been another political crisis. Istanbul absorbs it, as it has absorbed successive governments and coups since 1923. The city has been a capital of three empires and is not easily disrupted.`
    },
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; },
  },

  {
    id: 'city_istanbul_bosphorus',
    phase: 'midlife',
    weight: 2,
    cooldown: 9,
    when: (G) => G.place?.id === 'tr_istanbul',
    text: () =>
      `The Bosphorus at dusk from the Galata Bridge. The tankers going north to the Black Sea pass the ferries going east to the Asian shore pass the fishing boats going nowhere in particular. The specific geography of Istanbul — a city on two continents, a strait that is also a city street — produces a specific kind of person who has made a habit of standing on the bridge and looking both ways at once.`,
    choices: null,
    effect: (p) => { p.m += 4; },
  },
]

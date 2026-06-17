// events_country_arcs_3.js
// Deep country arcs: Iran, South Africa, France WWII, Nigeria/Biafra
// BUILD 10 expansion — country events requiring ethnicity + year + career guards

export const COUNTRY_ARC_3_EVENTS = [

  // ── IRAN ──────────────────────────────────────────────────────────────────────

  {
    id: 'iran_white_revolution_village',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.character.gender === 'female' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1963 && G.currentYear <= 1971 &&
      !G.mem?.iranWhiteRevolution,
    text: 'A literacy corps teacher arrives in the village. She is barely older than you, from Tehran, in uniform. The programme is part of the Shah\'s White Revolution. Your father has opinions about women learning to read. The teacher sets up in the empty building behind the mosque and waits.',
    choices: [
      {
        text: 'Go to the class',
        tag: null,
        outcome: 'You learn to read. What it opens is not yet clear.',
        effect: (p) => { p.e += 8; p.addFlag('female_literacy'); p.setMem('iranWhiteRevolution', true); },
      },
      {
        text: 'Your father says no',
        tag: null,
        outcome: 'The teacher stays three months. You watch from across the lane.',
        effect: (p) => { p.m -= 5; p.setMem('iranWhiteRevolution', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'iran_savak_silence',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.currentYear >= 1965 && G.currentYear <= 1978 &&
      G.career &&
      ['doctor', 'teacher', 'lawyer', 'journalist', 'civil_servant', 'professor'].includes(G.career?.id) &&
      !G.mem?.iranSavakSilence,
    text: 'At a colleague\'s dinner party someone begins a sentence about the Shah and stops halfway through. Everyone at the table has heard the pause. The conversation moves to a different subject. Nothing has been said. Nothing needs to be said. The SAVAK informer network is dense enough that the relevant question is not whether someone reports, but who.',
    choices: null,
    effect: (p) => { p.m -= 4; p.addFlag('learned_silence'); p.setMem('iranSavakSilence', true); },
  },

  {
    id: 'iran_revolution_week',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.currentYear >= 1979 && G.currentYear <= 1980 &&
      !G.mem?.iranRevolutionWeek,
    text: 'In the week the Shah leaves and before the plane lands, the streets are a specific kind of elated. People who had not spoken politics in years speak politics now. The word *azadi* — freedom — is on walls, in songs, in the air. The revolution is going to become many things. In this week it is only this.',
    choices: [
      {
        text: 'Go into the streets — you have waited for this',
        tag: null,
        outcome: 'You are part of it. What it becomes is months away.',
        effect: (p) => { p.m += 8; p.s += 3; p.addFlag('revolution_participant'); p.setPolitical('left'); p.setMem('iranRevolutionWeek', true); },
      },
      {
        text: 'Watch from the window — wait to see what this becomes',
        tag: null,
        outcome: 'The caution turns out to be warranted. The reason is not what you expected.',
        effect: (p) => { p.e += 3; p.setMem('iranRevolutionWeek', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'iran_post_revolution_purge',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.flags.includes('revolution_participant') &&
      G.currentYear >= 1981 && G.currentYear <= 1985 &&
      !G.mem?.iranPostRevolutionPurge,
    text: 'The people being arrested now are not the Shah\'s people. They are your people — the Fedayeen, the Mojahedin, the secular leftists who marched against the same regime you marched against. Some of the people you went into the streets with in 1979 are in Evin Prison. Some have disappeared. The second betrayal has a date and the date is recent.',
    choices: [
      {
        text: 'Leave — there is no future here now',
        tag: null,
        outcome: 'You leave. The leaving has costs. You do not stop being from here.',
        effect: (p) => { p.m -= 10; p.addFlag('political_exile'); p.setResidency('asylum_seeker'); p.setMem('iranPostRevolutionPurge', true); },
      },
      {
        text: 'Stay quiet — survive this and see what comes next',
        tag: null,
        outcome: 'Staying quiet becomes habitual. It does not become easier.',
        effect: (p) => { p.m -= 8; p.addFlag('learned_silence'); p.setMem('iranPostRevolutionPurge', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'iran_iraq_war_son',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.currentYear >= 1981 && G.currentYear <= 1988 &&
      G.children?.length > 0 &&
      G.age >= 38 &&
      !G.mem?.iranIraqWarSon,
    text: 'Your son is eighteen. The Basij offers boys a plastic key to paradise to wear around their necks before they walk into the minefields ahead of the regular army. Some go because they believe. Some because there is social pressure to believe. Some because a family in the wrong category cannot afford a son who refuses. Your son is eighteen.',
    choices: [
      {
        text: 'Find a way to keep him back — connections, paperwork, anything',
        tag: null,
        outcome: 'The effort costs money and a favour. He does not go. You carry both things.',
        effect: (p) => { p.mo -= 3000; p.m -= 8; p.karma -= 5; p.setMem('iranIraqWarSon', true); },
      },
      {
        text: 'There is nothing you can do',
        tag: null,
        outcome: 'He goes. He comes back. The person who comes back is not the same.',
        effect: (p) => { p.m -= 12; p.addFlag('war_family_cost'); p.setMem('iranIraqWarSon', true); },
      },
    ],
    effect: null,
  },

  // ── SOUTH AFRICA ──────────────────────────────────────────────────────────────

  {
    id: 'sa_township_uprising_1985',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.ethnicity === 'black_south_african' &&
      G.currentYear >= 1984 && G.currentYear <= 1987 &&
      !G.mem?.saTownship85,
    text: 'The state of emergency is declared and the army comes into the townships. There are funerals where people are shot. A boy you know from school has joined the underground structures. The ANC calls for making the townships ungovernable. The decision in front of you is not abstract and it is not being made in a neutral environment.',
    choices: [
      {
        text: 'Join the movement — this is the moment',
        tag: null,
        outcome: 'You join. The risk is real and you know it. The alternative did not feel like an option.',
        effect: (p) => { p.karma += 10; p.m -= 5; p.addFlag('anc_underground'); p.setPolitical('left'); p.setMem('saTownship85', true); },
      },
      {
        text: 'Your family keeps you back — the risk is too high',
        tag: null,
        outcome: 'Your mother will not lose another person. You stay home. The movement continues without you.',
        effect: (p) => { p.m -= 8; p.r += 5; p.setMem('saTownship85', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_white_beneficiary',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.ethnicity === 'white_south_african' &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      !G.mem?.saWhiteBeneficiary,
    text: 'Maria leaves on the six o\'clock bus to Soweto. She has worked in your house for eleven years and you do not know her children\'s names. This is not a thought you have had before. It is not comfortable. The evening news discusses the situation in the townships. Your father says it will sort itself out. You do not say what you think.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma -= 3; p.addFlag('apartheid_beneficiary'); p.setMem('saWhiteBeneficiary', true); },
  },

  {
    id: 'sa_coloured_indian_position',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      ['coloured_south_african', 'indian_south_african'].includes(G.ethnicity) &&
      G.currentYear >= 1970 && G.currentYear <= 1990 &&
      !G.mem?.saColouredIndian,
    text: 'The Group Areas Act has put you in Lenasia, in Mitchell\'s Plain — technically above Black South Africans in a hierarchy none of you chose. The Tricameral Parliament offers your community token representation while excluding Black South Africans entirely. Some call it a chance to improve conditions from the inside. Others call it a trap. The people you grew up with are divided.',
    choices: [
      {
        text: 'Refuse participation — the system is the system regardless of the role offered',
        tag: null,
        outcome: 'The refusal costs you what the cooperation might have gained. You call that a fair trade.',
        effect: (p) => { p.karma += 8; p.m -= 3; p.addFlag('apartheid_resistance'); p.setMem('saColouredIndian', true); },
      },
      {
        text: 'Work within it — limited gains are still gains for real people',
        tag: null,
        outcome: 'The gains are limited. The argument continues among people you respect.',
        effect: (p) => { p.e += 3; p.karma -= 5; p.setMem('saColouredIndian', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_trc_testimony',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear >= 1996 && G.currentYear <= 1999 &&
      G.flags.some(f => ['anc_underground', 'apartheid_resistance', 'war_family_cost', 'apartheid_beneficiary'].includes(f)) &&
      !G.mem?.saTrcTestimony,
    text: 'The Truth and Reconciliation Commission sits in a hall in Cape Town. People queue to testify. The perpetrator who confesses fully may receive amnesty. The families of the dead watch. There are people who find this extraordinary — the accounting, the naming, the faces in the same room. There are people who find it insufficient. Both are correct.',
    choices: [
      {
        text: 'Testify — put what happened into the official record',
        tag: null,
        outcome: 'You testify. Your name appears in a document that will exist after you.',
        effect: (p) => { p.r += 5; p.karma += 8; p.m -= 5; p.addFlag('trc_witness'); p.setMem('saTrcTestimony', true); },
      },
      {
        text: 'Watch — you cannot do what they are asking',
        tag: null,
        outcome: 'You follow it on television. The hall is full of things you recognise.',
        effect: (p) => { p.r += 8; p.setMem('saTrcTestimony', true); },
      },
    ],
    effect: null,
  },

  // ── IRAN CONTEMPORARY ─────────────────────────────────────────────────────────

  {
    id: 'iran_green_movement_2009',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.currentYear === 2009 &&
      G.age >= 16 &&
      !G.mem?.iranGreenMovement,
    text: 'June 2009. Mahmoud Ahmadinejad is declared the winner of the presidential election before the polling stations have closed. Mir-Hossein Mousavi and millions of others say the result is fraudulent. "Mousavi returned my vote" becomes a sentence. Green becomes a colour with a political meaning. On June 20 Neda Agha-Soltan is shot on Kargar Street, and the video of her dying reaches every phone on earth within hours. The Basij are on the rooftops. The Basij are in the streets. The chant is "Allahu Akbar" at night from the rooftops — the same chant as 1979, the same phrase, used against the government the phrase was used to create.',
    choices: [
      {
        text: 'You are in the street, in the green.',
        tag: null,
        outcome: 'The crackdown comes. The numbers arrested reach 4,000. The movement is suppressed. What happened in the street has a date and you were part of it.',
        effect: (p) => { p.m -= 12; p.karma += 8; p.r += 6; p.addFlag('green_movement_generation'); p.addFlag('political_active'); p.setMem('iranGreenMovement', true); },
      },
      {
        text: 'You watch from a window. The risk is too clear.',
        tag: null,
        outcome: 'You watch the green from the window. The crackdown happens whether or not you were in it. Your absence from the street does not mean absence from the consequence of living in the country where it happened.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('green_movement_generation'); p.setMem('iranGreenMovement', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'iran_mahsa_amini_2022',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'Iran' &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.age >= 14 &&
      !G.mem?.iranMahsa,
    text: 'September 16, 2022. Mahsa Amini, 22, dies in police custody three days after being arrested by the morality police for improper hijab. The hashtag is Zan, Zendegi, Azadi — Woman, Life, Freedom. High-school girls take off their headscarves and burn them. Students at universities join. The protests spread to 164 cities. The security forces kill more than 500. For the first time since 1979, the Islamic Republic is challenged not by a political faction but by a generation that does not believe in what the Republic believes about them.',
    choices: [
      {
        text: 'You cut your hair. You burn your hijab. You are in the street.',
        tag: null,
        outcome: 'The repression is severe. You know this going in. You go in.',
        effect: (p) => { p.m -= 10; p.karma += 10; p.r += 5; p.addFlag('zan_zendegi_azadi'); p.addFlag('political_active'); p.setMem('iranMahsa', true); },
      },
      {
        text: 'You support from inside — the small signals, the words in the right spaces.',
        tag: null,
        outcome: 'The small signals are not nothing. The women who are visible need the ones who are adjacent. You are adjacent.',
        effect: (p) => { p.m -= 7; p.karma += 5; p.r += 4; p.addFlag('zan_zendegi_azadi'); p.setMem('iranMahsa', true); },
      },
      {
        text: 'You fear what comes after — the crackdown will be worse than what is being protested.',
        tag: null,
        outcome: 'The crackdown comes regardless of what you do. The women who stood in the street know this. The fear is accurate and does not predict the outcome.',
        effect: (p) => { p.m -= 6; p.r += 8; p.setMem('iranMahsa', true); },
      },
    ],
    effect: null,
  },

  // ── SOUTH AFRICA POST-1994 ────────────────────────────────────────────────────

  {
    id: 'sa_first_vote_1994',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear === 1994 &&
      G.age >= 16 &&
      !G.mem?.saFirstVote,
    text: (G) => {
      if (G.ethnicity === 'black_south_african') {
        return 'April 27, 1994. You are in a queue that began forming at four in the morning. It does not move fast. It does not need to. People have brought food and umbrellas. Some are elderly — they have been waiting for this vote for seventy years, or their whole lives. When you reach the booth and make your mark and fold the paper and put it in the box, the ballot officer stamps your thumb with ink. You walk out with your thumb raised. You have voted. This is the first time you have voted in the country where you were born.'
      }
      if (G.ethnicity === 'white_south_african') {
        return 'April 27, 1994. You have voted before. This is different: the country in which you are voting has changed its definition of who belongs to it. The queue at the polling station includes people who have never been in this queue. You voted for de Klerk or you voted for the National Party or you voted for the ANC or you spoiled your ballot from uncertainty about what kind of country is being made. Whatever you voted, you voted in the first election of the new country.'
      }
      return 'April 27, 1994. The queue stretches in both directions. You have your ID book. You have come early, or you have come late and joined the tail end. Mandela will win with 62 percent. The official vote count will take two days. What happens in the booth is between you and the paper.'
    },
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 5
      p.addFlag('post_apartheid_generation')
      p.setMem('saFirstVote', true)
    },
  },

  {
    id: 'sa_mandela_era_hope',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear >= 1994 && G.currentYear <= 2000 &&
      G.flags.includes('post_apartheid_generation') &&
      G.age >= 20 &&
      !G.mem?.saMandela,
    text: 'The phrase is "Rainbow Nation." The country has a constitution that is cited internationally as a model. Mandela appears everywhere — in the jersey at the Rugby World Cup final, at the state banquet, on the television in his characteristic floral shirts. There is an extraordinary amount of goodwill being generated and extended in this period. You know the structural problems have not been resolved: the land, the housing, the inequality metric that is still the worst in the world. Both of these things are true and you hold them at the same time.',
    choices: [
      {
        text: 'Allow the hope to be what it is.',
        tag: null,
        outcome: 'The hope is a real phenomenon. The structural problems are also real. Holding both does not cancel either.',
        effect: (p) => { p.m += 8; p.addFlag('rainbow_nation_generation'); p.setMem('saMandela', true); },
      },
      {
        text: 'The hope concerns you — it is absorbing attention the structural problems need.',
        tag: null,
        outcome: 'You are right that the problems remain. You are watching from a position that allows you to see the gap between the symbolism and the arithmetic of land ownership.',
        effect: (p) => { p.m += 3; p.e += 4; p.r += 3; p.addFlag('post_apartheid_realist'); p.setMem('saMandela', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_marikana_2012',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear === 2012 &&
      G.age >= 18 &&
      !G.mem?.saMarikana,
    text: 'August 16, 2012. Striking platinum miners at the Lonmin mine in Marikana have been in a wildcat strike for ten days. The police encircle a group of around 3,000 miners at a koppie. Thirty-four are shot dead. The police is the South African Police Service. The government is the ANC government — the liberation movement. The mine is owned by Lonmin; the ANC Youth League has a financial relationship with one of its principals. The sentence "the ANC government shot striking miners" is the sentence that restructures the next decade of South African politics.',
    choices: [
      {
        text: 'This is the point where the promise of 1994 definitively breaks.',
        tag: null,
        outcome: 'You were not naive in 1994 but the specific image of a democratic police force shooting workers is a different thing from the abstractions of inequality.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('marikana_generation'); p.addFlag('post_apartheid_disillusionment'); p.setMem('saMarikana', true); },
      },
      {
        text: 'The situation was complicated — the violence came from multiple directions.',
        tag: null,
        outcome: 'The complication is real. The 34 dead are also real. The complications and the dead do not cancel each other.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('marikana_generation'); p.setMem('saMarikana', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'sa_loadshedding',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear >= 2008 && G.currentYear <= 2024 &&
      G.age >= 18 &&
      !G.mem?.saLoadshedding,
    text: 'The schedules are on your phone now: Stage 2, Stage 4, Stage 6. Eskom, the state electricity utility, has been running its coal fleet past maintenance cycles for decades and not building replacement capacity. The load-shedding is planned, announced in advance, and then the power goes off for two, four, six hours depending on the stage. You buy a generator or an inverter or candles. The productive hours of the economy are being cut. The specific experience is learning to cook, to work, to sleep around a schedule that the state has imposed on ordinary life.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.w -= 4
      p.addFlag('loadshedding_generation')
      p.setMem('saLoadshedding', true)
    },
  },

  // ── FRANCE WWII ───────────────────────────────────────────────────────────────

  {
    id: 'france_occupation_grey',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'France' &&
      G.currentYear >= 1940 && G.currentYear <= 1944 &&
      !G.mem?.franceOccupationGrey,
    text: 'The Germans are in Paris. Life continues with adjustments. You go to work. You buy food — less of it, at higher prices. You do not read certain newspapers. You do not mention colleagues who have not come back. The Milice is French, not German. The choices in front of you are not, for most people, the dramatic ones. They are the smaller ones, made daily, whose accumulated weight will not be clear until later.',
    choices: [
      {
        text: 'Find small ways to resist — a document passed wrong, a silence kept',
        tag: null,
        outcome: 'Small resistances. They cost something and do something. What they do is hard to measure.',
        effect: (p) => { p.karma += 5; p.m -= 3; p.addFlag('occupation_resistance'); p.setMem('franceOccupationGrey', true); },
      },
      {
        text: 'Survive — what matters is to still be here when this ends',
        tag: null,
        outcome: 'You survive. When it ends, this is not the story anyone tells, which is its own experience.',
        effect: (p) => { p.m -= 5; p.r += 3; p.addFlag('occupation_survivor'); p.setMem('franceOccupationGrey', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'france_vel_dhiv_jewish',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'France' &&
      G.currentYear === 1942 &&
      G.character.religion === 'jewish' &&
      !G.mem?.franceVelDhiv,
    text: 'The roundup begins at four in the morning, 16 July. The police are French — not German, French — and they work from lists. 13,000 people are held in the Vélodrome d\'Hiver for five days in July heat with one water tap, then transferred. The question of where you are on the morning of the 16th is the question.',
    choices: [
      {
        text: 'You were warned — you are not at your registered address',
        tag: null,
        outcome: 'Someone told you. You stay with people who did not ask questions. This is not safety. It is not being taken.',
        effect: (p) => { p.m -= 15; p.addFlag('vel_dhiv_escaped'); p.addFlag('hidden_wartime'); p.setMem('franceVelDhiv', true); },
      },
      {
        text: 'They come to the door in the morning',
        tag: null,
        outcome: 'You are taken. What happens after is documented, known, and still carries no adequate word.',
        effect: (p) => { p.h -= 20; p.m -= 20; p.addFlag('vel_dhiv_taken'); p.setMem('franceVelDhiv', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'france_liberation_epuration',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'France' &&
      G.currentYear >= 1944 && G.currentYear <= 1946 &&
      !G.mem?.franceLiberationEpuration,
    text: 'Liberation. The score-settling begins immediately. Women who were with German officers have their heads shaved in public. Summary executions — who carried them out and why is not always clear. Denunciations, some accurate, some settling older debts. The country is deciding simultaneously what it did and who was to blame, and doing both quickly and badly.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 5; p.addFlag('liberation_witnessed'); p.setMem('franceLiberationEpuration', true); },
  },

  {
    id: 'france_colonial_veteran',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'France' &&
      G.currentYear >= 1945 && G.currentYear <= 1950 &&
      G.character.gender === 'male' &&
      G.flags.some(f => ['occupation_resistance', 'occupation_survivor', 'liberation_witnessed'].includes(f)) &&
      !G.mem?.franceColonialVet,
    text: 'The Senegalese tirailleurs, the Moroccan goumiers, the West African regiments — they liberated French cities and came back to countries that were still colonies. A man you know from the Resistance was decorated with a Senegalese soldier the week they took a village together. That man is now home in Paris. The Senegalese soldier is home in Dakar, which is still French.',
    choices: null,
    effect: (p) => { p.r += 5; p.karma -= 3; p.addFlag('colonial_contradiction'); p.setMem('franceColonialVet', true); },
  },

  // ── NIGERIA / BIAFRA ──────────────────────────────────────────────────────────

  {
    id: 'nigeria_biafra_war_igbo',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Nigeria' &&
      G.ethnicity === 'igbo' &&
      G.currentYear >= 1967 && G.currentYear <= 1970 &&
      !G.mem?.nigeriaBiafraIgbo,
    text: 'Biafra has declared independence and the federal army is coming. The radio says the secession is illegal. Your family has been in Lagos for twelve years but Lagos is not safe for Igbo now. Thousands have already been killed in the north. The question is whether to go east — to Biafra — or whether the war will be short and this will pass. No one knows which it is yet.',
    choices: [
      {
        text: 'Go east — Biafra is where your people are',
        tag: null,
        outcome: 'You go. The war is not short. The blockade produces a famine that the world watches on television.',
        effect: (p) => { p.m -= 12; p.h -= 8; p.addFlag('biafra_experienced'); p.setMem('nigeriaBiafraIgbo', true); },
      },
      {
        text: 'Stay — the war will end and Nigeria will remain',
        tag: null,
        outcome: 'You stay. You are visible in the wrong way in a city that is at war with people who look like you.',
        effect: (p) => { p.m -= 10; p.addFlag('biafra_displacement'); p.setMem('nigeriaBiafraIgbo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nigeria_biafra_war_federal',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Nigeria' &&
      ['yoruba', 'hausa_fulani'].includes(G.ethnicity) &&
      G.currentYear >= 1967 && G.currentYear <= 1970 &&
      !G.mem?.nigeriaBiafraFederal,
    text: 'The war is being fought for Nigerian unity, which is what the radio says. What you have seen — the photographs, the reports coming back from the east — is something else. The word *kwashiorkor* is in the newspapers now. The children with the swollen stomachs are not abstractions. They are Nigerians. The blockade is the instrument.',
    choices: [
      {
        text: 'The secession had to be stopped — a precedent there would have broken everything',
        tag: null,
        outcome: 'The logic is not wrong. It is also not complete. Both remain true for a long time.',
        effect: (p) => { p.e += 3; p.m -= 5; p.setMem('nigeriaBiafraFederal', true); },
      },
      {
        text: 'What is happening to those children is a crime regardless of the politics',
        tag: null,
        outcome: 'You say this where you can. Not loudly. It still costs something.',
        effect: (p) => { p.karma += 8; p.m -= 8; p.setMem('nigeriaBiafraFederal', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'nigeria_post_biafra_silence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Nigeria' &&
      G.flags.some(f => ['biafra_experienced', 'biafra_displacement'].includes(f)) &&
      G.currentYear >= 1971 && G.currentYear <= 1977 &&
      !G.mem?.nigeriaPostBiafra,
    text: 'The government\'s reconciliation policy is "No victor, no vanquished." The oil boom that follows is real. Lagos is building itself too fast. The war is supposed to be over, which means not discussed. The silence is official. The thing underneath it is not.',
    choices: null,
    effect: (p) => { p.r += 8; p.addFlag('biafra_memory'); p.setMem('nigeriaPostBiafra', true); },
  },

]

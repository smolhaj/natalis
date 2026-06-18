// Guinea-Conakry arc events
// The only French colony to vote No in de Gaulle's 1958 referendum — France stripped everything
// in retaliation: civil servants, vehicles, medicine stocks, the lightbulbs from government offices.
// Sékou Touré 1958–84: single-party socialist state; Camp Boiro prison where thousands
// disappeared on the "black diet." The educated class left in waves.
// Lansana Conté military coup two days after Touré's death (1984); 24 more years of corrupt rule.
// Moussa Dadis Camara seizes power Dec 2008; stadium massacre Sept 28, 2009 (157 dead).
// One of the world's largest bauxite reserves; the population sees almost none of the benefit.

const IS_GUINEA = (G) => G.character.country?.name === 'Guinea'

export const GUINEA_EVENTS = [

  {
    id: 'gn_no_vote_1958',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1958 && G.currentYear <= 1960 &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.gnNoVote,
    text: 'September 28, 1958. De Gaulle has put the question to the colonies: join the French Community with autonomy, or take full independence immediately, with France withdrawing everything. Sékou Touré has told the country: "We prefer poverty in freedom to riches in servitude." The polling station is a building you have passed your whole life. You vote.',
    choices: [
      {
        text: 'You vote No.',
        tag: 'voted_no',
        outcome: 'The result comes in: 95 percent No. Guinea will be the only colony to refuse. The morning after, something has happened that cannot be taken back. You do not know yet what France will do next.',
        effect: (p) => { p.m += 10; p.karma += 5; p.e += 3; p.addFlag('voted_no_1958'); p.setMem('gnNoVote', true) },
      },
      {
        text: 'You vote Yes. The No is too radical.',
        tag: 'voted_yes',
        outcome: 'The result is not what you voted for. Guinea votes 95 percent No. You keep this to yourself. In a country that has just chosen unanimity, the dissenting vote is not a safe thing to carry openly.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('voted_yes_1958'); p.setMem('gnNoVote', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gn_french_revenge',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1958 && G.currentYear <= 1961 &&
      !G.mem?.gnFrenchRevenge,
    text: 'The French civil servants leave within two months. They take everything they can carry and destroy what they cannot: medical records pulled from filing cabinets, vehicles driven to the port, medicine stocks emptied or spoiled. In the government offices, someone unscrews the lightbulbs from the sockets on the way out. A country that voted for its own independence begins its existence in buildings stripped to the walls. What France could not prevent, it punished.',
    effect: (p) => { p.m -= 12; p.h -= 5; p.e += 4; p.r += 5; p.addFlag('guinea_french_revenge_generation'); p.setMem('gnFrenchRevenge', true) },
  },

  {
    id: 'gn_sekou_toure_apparatus',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1962 && G.currentYear <= 1983 &&
      !G.mem?.gnToureApparatus,
    text: 'The PDG meeting is not optional. You sit in the plastic chair and listen to the speeches that repeat themselves, month after month, in the same cadences. The informer might be the woman who sits next to you at these meetings. She might be reporting on you; you might be, in the accounting someone keeps, reporting on her simply by being present and available to be asked. You learn what is safe to say in which room, in front of which faces. The calibration becomes automatic, like breathing.',
    effect: (p) => { p.m -= 10; p.s -= 4; p.r += 6; p.addFlag('sekou_toure_era_generation'); p.setMem('gnToureApparatus', true) },
  },

  {
    id: 'gn_camp_boiro',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1984 &&
      G.flags.has('sekou_toure_era_generation') &&
      !G.mem?.gnCampBoiro,
    text: 'Someone close — a cousin, a neighbor you have known since childhood, a colleague from the ministry — is summoned for questioning by the state security. "Invited" is the word used. Camp Boiro is where they take people who are invited. The documented diet inside is called the black diet: the minimum possible food, sustained over months. You spend everything you have working the connections you have.',
    choices: [
      {
        text: 'He comes back. Changed, but present.',
        tag: 'survived',
        outcome: 'He does not speak about what happened there. Not once, in all the years afterward. The absence of the story is the story. You understand this and do not ask.',
        effect: (p) => { p.m -= 15; p.r += 8; p.karma += 5; p.addFlag('camp_boiro_survivor_adjacent'); p.setMem('gnCampBoiro', true) },
      },
      {
        text: 'He does not come back.',
        tag: 'lost',
        outcome: 'The official answer is illness. There is no body to bury, no date given. The family gathers anyway, on a day you choose, and says the words that need to be said. Illness is what you tell people outside the family.',
        effect: (p) => { p.m -= 25; p.r += 12; p.h -= 8; p.addFlag('camp_boiro_family_loss'); p.setMem('gnCampBoiro', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gn_educated_class_leaves',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1980 &&
      G.stats.smarts >= 50 &&
      !G.mem?.gnEducatedLeaves,
    text: 'The doctors are leaving for Dakar. The engineers are in Paris. A teacher you studied under has gone to Montreal and is not returning — you heard this through his sister, not from him. Under Sékou Touré, education is a credential that makes you a target as easily as an asset. The question of whether to go has been in the room for a year, unasked directly.',
    choices: [
      {
        text: 'You leave. Dakar, Paris, Montreal — somewhere the work is possible.',
        tag: 'exiled',
        outcome: 'The taxi to the airport. You carry two bags and the particular sensation of not knowing whether you are going to return. The city out the window in the morning light looks exactly like itself.',
        effect: (p) => { p.m -= 10; p.e += 8; p.w += 2; p.addFlag('guinea_exile'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('gnEducatedLeaves', true) },
      },
      {
        text: 'You stay. You make the accommodations staying requires.',
        tag: 'stayed',
        outcome: 'You learn which projects to propose and which to leave unproposed. What you know, you know privately. The work you do is partial — it is work performed within the shape the Party permits. You find ways to be useful within that shape.',
        effect: (p) => { p.m -= 8; p.r += 8; p.s += 3; p.addFlag('guinea_stayed_accommodation'); p.setMem('gnEducatedLeaves', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gn_conte_morning',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      !G.mem?.gnConteMorning,
    text: 'Sékou Touré dies on April 3, 1984, in a Cleveland clinic, of heart surgery. He ruled for twenty-six years. For two days, the country holds its breath: what comes next is genuinely unknown for the first time in a generation. On April 5, Lansana Conté announces that the military has taken power. The two-day gap between the dictator and the soldier is as close as Guinea comes to an open future. You wake on the morning of April 6 and understand that the question has been answered.',
    effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('conte_era_generation'); p.setMem('gnConteMorning', true) },
  },

  {
    id: 'gn_stadium_2009',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_GUINEA(G) &&
      G.currentYear >= 2009 && G.currentYear <= 2011 &&
      G.age >= 20 && G.age <= 50 &&
      !G.mem?.gnStadium,
    text: 'September 28, 2009. The opposition fills the national stadium in Conakry to protest Moussa Dadis Camara standing for president. Presidential Guard soldiers enter through multiple gates. The firing begins without warning. One hundred and fifty-seven people are killed inside the stadium. Soldiers rape women openly, in the stands, while others continue firing. Everything is recorded — by witnesses, by cameras, eventually by a UN commission of inquiry. Dadis Camara is shot by his own aide-de-camp three months later and evacuated to Burkina Faso. The ICC investigation begins. The trial, when it comes, comes slowly.',
    effect: (p) => { p.m -= 20; p.h -= 8; p.r += 10; p.addFlag('guinea_stadium_2009_witness'); p.setMem('gnStadium', true) },
  },

  // ── FOLLOW-THROUGH EVENTS ────────────────────────────────────────────────────

  {
    id: 'gn_camp_boiro_silence',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('camp_boiro_survivor_adjacent') &&
      G.age >= 55 &&
      !G.mem?.gnCampBoiroSilence,
    text: 'He is old now, and you have never asked. You watched him come back from Camp Boiro decades ago and understood that the silence was not modesty or evasion but a precise assessment of what language could hold. The word for what was done there in the black diet rooms does not exist in the conversations between you. You have built a life around the silence. In old age you are not sure whether you protected him or yourself.',
    effect: (p) => { p.m -= 8; p.r += 8; p.e += 4; p.setMem('gnCampBoiroSilence', true) },
  },

  {
    id: 'gn_camp_boiro_grief_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('camp_boiro_family_loss') &&
      G.age >= 55 &&
      !G.mem?.gnCampBoiroGrief,
    text: 'The official Commission of Inquiry begins its work decades after the fact. Families are asked to come forward. You go. You sit in a room with a form that asks for name, date of arrest, date of death. You leave the last field blank — you still do not know the date. The form asks for it anyway. You leave it blank and hand the paper back. Outside, in the parking lot, you stand in the heat for a while before you can think of where to go next.',
    effect: (p) => { p.m -= 12; p.r += 6; p.karma += 8; p.setMem('gnCampBoiroGrief', true) },
  },

  {
    id: 'gn_stadium_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('guinea_stadium_2009_witness') &&
      G.age >= 50 &&
      !G.mem?.gnStadiumLate,
    text: 'Alpha Condé wins the 2010 election. Then another. Thirteen years after the stadium, a military coup removes him too. The soldiers who gave the orders in September 2009 are tried at last — the trial opens in 2022, in the same city. The verdict arrives. You read about it on a phone, the way you read about everything now. The verdict is what it is. The 157 names do not change.',
    effect: (p) => { p.m -= 6; p.r += 5; p.karma += 6; p.e += 3; p.setMem('gnStadiumLate', true) },
  },

  {
    id: 'gn_exile_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('guinea_exile') &&
      G.age >= 55 &&
      !G.mem?.gnExileLate,
    text: 'You have been in Dakar, or Paris, or Montreal, long enough that the city has stopped being foreign and started being yours in the way a second thing can be yours without displacing the first. When people ask where you are from you answer correctly. What you do not say is the longer answer: that you left because the country made staying impossible for people who knew what you knew, and that the knowledge did not stop being true just because you carried it away.',
    effect: (p) => { p.m += 4; p.r += 6; p.e += 3; p.setMem('gnExileLate', true) },
  },

  {
    id: 'gn_stayed_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('guinea_stayed_accommodation') &&
      G.age >= 55 &&
      !G.mem?.gnStayedLate,
    text: 'The country has had four coups since you made the decision to stay. Each time the army announces it has taken power, you think about the calculation you made in the years under Sékou Touré — that staying was possible if you were careful enough. You were careful enough. You are still here. You cannot tell, looking back across the decades, whether careful was the right word or simply the most available one.',
    effect: (p) => { p.m -= 5; p.r += 8; p.e += 4; p.setMem('gnStayedLate', true) },
  },

  {
    id: 'gn_voted_no_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('voted_no_1958') &&
      G.age >= 60 &&
      !G.mem?.gnVotedNoLate,
    text: 'You voted No in 1958 because Sékou Touré said poverty in freedom was better than riches in servitude. You have had the poverty. The freedom arrived and departed in irregular intervals. When you think about September 28, 1958, what you remember is not the slogan but the specific quality of the morning after — the sense that the country had made an irrevocable choice, and that you were part of the we that made it. You still are.',
    effect: (p) => { p.m += 5; p.r += 5; p.e += 3; p.setMem('gnVotedNoLate', true) },
  },

  {
    id: 'gn_french_revenge_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_GUINEA(G) &&
      G.flags.has('guinea_french_revenge_generation') &&
      G.age >= 35 &&
      !G.mem?.gnFrenchRevengeLate,
    text: 'Guinea\'s infrastructure is assessed in a report you read. Bauxite — Guinea has more than a third of the world\'s reserves — is extracted, shipped, refined elsewhere. The wealth is in the ground; the revenue is elsewhere. You have heard people explain this as the consequence of many things: the postcolonial structure, the corruption under Conté, the IMF conditions. You think about the French civil servants leaving with the lightbulbs. The roots of an emptied building go further than any single debt.',
    effect: (p) => { p.r += 5; p.e += 4; p.setMem('gnFrenchRevengeLate', true) },
  },

]

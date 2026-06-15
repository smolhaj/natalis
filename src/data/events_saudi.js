// Saudi Arabia arc events
//
// Saudi Arabia's story across the 20th–21st centuries:
//  — Founded 1932 by Abdulaziz ibn Saud. The deal between the House of Saud
//    and the Wahhabi religious establishment (cemented 1744, renewed 1932)
//    is the constitutional arrangement: the Al Saud provide political power
//    and distribute oil wealth; the clerics provide religious legitimacy
//    and control morality and education.
//  — Oil discovered 1938. Saudi Aramco (originally CASOC) pumping since 1939.
//    1973 oil embargo quadruples global oil prices. Saudi Arabia becomes
//    the most consequential energy supplier on earth.
//  — 1979: Grand Mosque seizure. Juhayman al-Otaybi and 400–500 militants
//    occupy the Haram in Mecca for 14 days. Hundreds dead. The Saudi state
//    responds by intensifying religious conservatism — more mutaween, stricter
//    education, the religious establishment's authority reinforced.
//  — 1990: Gulf War. Saddam Hussein invades Kuwait. King Fahd invites 500,000
//    US troops onto Saudi soil. Osama bin Laden offers to defend the kingdom
//    with his Afghan veterans; his offer is rejected; he breaks with the regime.
//    Having American soldiers near Mecca and Medina is the founding grievance
//    of modern jihadism.
//  — The mutaween (CPVPV — Commission for the Promotion of Virtue and
//    Prevention of Vice) enforce gender segregation, prayer times, dress codes.
//    Women who go outside without a mahram (male guardian). The 2002 Mecca
//    girls' school fire: girls pushed back inside by mutaween because they
//    were not wearing abayas. Fifteen dead.
//  — King Abdullah Scholarship Program (2005): 200,000 Saudis sent to study
//    abroad. The scholarship generation returns with comparative knowledge.
//  — Vision 2030 (2016): Crown Prince Mohammed bin Salman's modernization
//    program. Women allowed to drive (2018). Cinemas reopen. Concerts.
//    The mutaween lose arrest powers. But simultaneously: Khashoggi murdered
//    (2018), the Ritz Carlton hotel turned into a detention facility for
//    potential rivals (2017).
//  — Jamal Khashoggi: Saudi journalist and Washington Post columnist, killed
//    and dismembered inside the Saudi consulate in Istanbul, October 2 2018.
//    CIA concludes MBS ordered the operation. Saudi Arabia maintains it was
//    rogue actors.

const SAUDI_EVENTS = [

  // ── ARAMCO CHILDHOOD ─────────────────────────────────────────────────────────

  {
    id: 'sau_aramco_generation',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.sau_aramco,
    text: (G) => {
      const isEarly = G.currentYear <= 1985
      return isEarly
        ? 'Saudi Aramco is the company your country runs on. The housing compound has American-style streets with sprinklers running in the desert. The Aramco employees — American engineers, Saudi geologists in training — live in a different geography than the city outside the compound gates. Your father works for Aramco, or the government ministry that Aramco funds, or the construction company building the highway Aramco paid for. The oil is the grammar of every sentence in your life.'
        : 'The kingdom has been built faster than any place on earth. What was desert twenty years ago is a six-lane highway now. What was a village is a ministry building. The Aramco compound east of Dhahran is its own city. You grow up understanding that the oil will not last forever and that the future requires something — diversification, education, reform — and that the timing is the question that follows you.'
    },
    choices: null,
    effect: (p) => { p.w += 8; p.e += 3; p.addFlag('sau_aramco_generation'); p.setMem('sau_aramco', true); },
  },

  // ── THE GRAND MOSQUE SIEGE ────────────────────────────────────────────────────

  {
    id: 'sau_grand_mosque_1979',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 1979 && G.currentYear <= 1980 &&
      G.age >= 14 &&
      !G.mem?.sau_mosque_siege,
    text: 'November 20, 1979. The first day of the Islamic year 1400. Juhayman al-Otaybi and four to five hundred armed men seize the Grand Mosque in Mecca. The Haram — the most sacred place in Islam, entry forbidden to non-Muslims, weapons forbidden to all — is now held by militants who announce that the Mahdi has arrived. The Saudi government\'s response takes two weeks. French special forces are brought in covertly, converted to Islam for the duration of the operation. Four hundred and fifty dead. The kingdom\'s response is not liberalization but intensification: more mutaween, stricter morality enforcement, Wahhabist education expanded. The siege\'s lesson, as the government reads it, is that the religious establishment must be appeased rather than challenged.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('sau_siege_generation'); p.setMem('sau_mosque_siege', true); },
  },

  // ── THE MUTAWEEN ─────────────────────────────────────────────────────────────

  {
    id: 'sau_mutaween',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 1980 && G.currentYear <= 2016 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.sau_mutaween,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'The hay\'a — the Commission for the Promotion of Virtue and Prevention of Vice — patrols the mall. Their job is specific: no gender mixing, correct dress, no music in public, women not without a mahram. You are wearing what you should be wearing. Your abaya is correct. The mutawi looks at you anyway and the look contains the authority it contains. You learn, young, the difference between being correctly covered and being seen. The 2002 school fire is still talked about: the girls pushed back inside because they were not wearing their abayas. Fifteen died. The mutaween were there.'
        : 'The hay\'a car — white Toyota Land Cruiser — parks near the mall entrance. The men inside have the authority to detain, to issue reports, to make demands that you cannot easily refuse. You have learned the schedule of their patrols. You have learned which malls are less actively monitored. The knowledge of the specific geography of enforcement is its own education — the practical curriculum of living in a system that has opinions about how you spend your afternoon.'
    },
    choices: [
      {
        text: 'Navigate it — you know the rules and the gaps in the rules.',
        tag: null,
        outcome: 'The navigation is real. It requires attention you would rather spend on other things. The attention is the tax.',
        effect: (p) => { p.e += 3; p.s += 3; p.r += 4; p.addFlag('sau_mutaween_era'); p.setMem('sau_mutaween', true); },
      },
      {
        text: 'An encounter: something specific happens.',
        tag: null,
        outcome: 'The encounter is brief and one-sided. The authority is real and you know it and they know you know it. You carry it.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('sau_mutaween_era'); p.setMem('sau_mutaween', true); },
      },
    ],
    effect: null,
  },

  // ── GULF WAR: AMERICAN FORCES ────────────────────────────────────────────────

  {
    id: 'sau_gulf_war_1990',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 15 &&
      !G.mem?.sau_gulf_war,
    text: 'August 1990. Saddam Hussein invades Kuwait. King Fahd calls for American troops. Five hundred thousand US soldiers on Saudi soil. The religious establishment issues fatwas supporting the arrangement. Other voices argue that having non-Muslim troops on the Arabian peninsula — near Mecca, near Medina — is a desecration. Osama bin Laden, recently returned from Afghanistan, offered to defend the kingdom with his Arab veterans. The offer was rejected. He leaves for Sudan. The war is over in a hundred hours. The American bases remain for years. The argument about what was wrong about this stays much longer.',
    choices: [
      {
        text: 'The defense was necessary — Saddam was on the border.',
        tag: null,
        outcome: 'The position makes pragmatic sense and carries the support of the official religious establishment. The pragmatism has a cost that becomes visible over the following decade.',
        effect: (p) => { p.e += 3; p.addFlag('sau_gulf_war_generation'); p.setMem('sau_gulf_war', true); },
      },
      {
        text: 'The invitation was wrong — this is what the kingdom gave away.',
        tag: null,
        outcome: 'The position is the founding grievance of the next generation of jihadism. Holding it makes you different from what the government requires.',
        effect: (p) => { p.r += 6; p.karma += 4; p.addFlag('sau_gulf_war_generation'); p.setMem('sau_gulf_war', true); },
      },
    ],
    effect: null,
  },

  // ── WASTA SYSTEM ─────────────────────────────────────────────────────────────

  {
    id: 'sau_wasta',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 1980 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.sau_wasta,
    text: 'Wasta: connections, influence, the ability to call someone who calls someone. You need something from a government office. The official channel is slow and the outcome is uncertain. Your uncle knows someone. Your father\'s friend is a cousin of the deputy director. The call is made. The thing gets done in two days instead of six months. The question underneath it is not whether wasta works — it clearly does. The question is what kind of society it builds over decades: the advantage that accrues to those who have it, the ceiling that stays low for those who don\'t.',
    choices: [
      {
        text: 'Use it — this is how things are done here.',
        tag: null,
        outcome: 'The thing gets done. You understand how the system operates from the inside now, which is different from understanding it from outside.',
        effect: (p) => { p.s += 5; p.w += 4; p.addFlag('sau_wasta_system'); p.setMem('sau_wasta', true); },
      },
      {
        text: 'Wait in the official channel — the principle matters.',
        tag: null,
        outcome: 'The thing takes six months. The principle is yours to have. It is the more expensive principle than it would be in a different country.',
        effect: (p) => { p.karma += 6; p.r += 4; p.addFlag('sau_wasta_system'); p.setMem('sau_wasta', true); },
      },
    ],
    effect: null,
  },

  // ── SCHOLARSHIP ABROAD ────────────────────────────────────────────────────────

  {
    id: 'sau_scholarship_abroad',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2005 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 26 &&
      G.stats.smarts > 50 &&
      !G.mem?.sau_scholarship,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'The King Abdullah Scholarship Program sends you to Canada. You arrive with your abaya and the habit of not leaving the house without your mahram. By the second week you have been in the supermarket alone three times. The knowledge accumulates: the comparison between the country you came from and the country you are in, the freedoms that exist here, the freedoms that are absent, the things that are better in each and the things that are worse. The comparison follows you home when the degree is finished.'
        : 'The scholarship takes you to the United States. The curriculum is engineering and the real education is comparative: what a country that is not built on a single export looks like, how institutions that are not extensions of a royal family operate, what accountability means as a daily practice rather than a political theory. You are here on the kingdom\'s money to learn what the kingdom does not yet have. You think about what to do with the comparison when you go back.'
    },
    choices: [
      {
        text: 'Return and apply what you learned.',
        tag: null,
        outcome: 'The return is the intended outcome of the program. What you can apply and what the system will allow you to apply are different questions with different answers depending on the year.',
        effect: (p) => { p.e += 8; p.s += 4; p.addFlag('sau_scholarship_generation'); p.setMem('sau_scholarship', true); },
      },
      {
        text: 'The comparison makes returning harder to imagine.',
        tag: null,
        outcome: 'The scholarship created the very condition it was trying to prevent. You are one of the data points in the brain drain calculation.',
        effect: (p) => { p.e += 10; p.r += 6; p.addFlag('sau_scholarship_generation'); p.addFlag('emigrated'); p.setMem('sau_scholarship', true); },
      },
    ],
    effect: null,
  },

  // ── KHASHOGGI ────────────────────────────────────────────────────────────────

  {
    id: 'sau_khashoggi_2018',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2018 && G.currentYear <= 2020 &&
      G.age >= 20 &&
      !G.mem?.sau_khashoggi,
    text: 'October 2, 2018. Jamal Khashoggi, Washington Post columnist, enters the Saudi consulate in Istanbul to obtain paperwork for his upcoming marriage. He does not come out. The Turkish authorities release recordings. The Saudi government\'s explanation changes five times over two weeks — he left, he died accidentally in a fight, rogue elements, an operation that went wrong. The CIA concludes that Crown Prince Mohammed bin Salman ordered the killing. You know people who knew him, or you don\'t, but you know that the message was intended for everyone: the category of people who write critically from outside is not a safe category. The WhatsApp messages stop. The group chats go quiet. Some columns are never written.',
    choices: [
      {
        text: 'The silence is necessary — there is a family, a life, specific things to protect.',
        tag: null,
        outcome: 'The silence is the rational position. You know why you are silent and the why changes the silence from absence into something more specific.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('sau_khashoggi_generation'); p.setMem('sau_khashoggi', true); },
      },
      {
        text: 'Say something — privately, carefully, to people you trust.',
        tag: null,
        outcome: 'The saying is careful and the trust is calibrated and this is what saying something means in the country after October 2018.',
        effect: (p) => { p.m -= 5; p.karma += 5; p.addFlag('sau_khashoggi_generation'); p.setMem('sau_khashoggi', true); },
      },
    ],
    effect: null,
  },

  // ── VISION 2030 / MBS ────────────────────────────────────────────────────────

  {
    id: 'sau_vision_2030',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2017 && G.currentYear <= 2025 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sau_vision,
    text: (G) => {
      const isFemale = G.character.gender === 'female'
      return isFemale
        ? 'Cinema. Concerts. Women driving. Women in the stadiums. The mutaween no longer have arrest powers. The changes arrive faster than the framework for understanding them. Mohammed bin Salman is thirty-two. The reforms are real. Also real: the activists who campaigned for women\'s driving rights are in detention while the driving ban was lifted. The two facts exist simultaneously and the country is asking you to hold them together without resolving the contradiction.'
        : 'The concert was sold out — Mariah Carey in Riyadh, in a country where public music was restricted three years ago. The Ritz Carlton in Riyadh was briefly converted into a detention facility for two hundred businessmen and princes accused of corruption. The NEOM megacity is under construction in the desert with money the kingdom may not have by the time it finishes. The pace is disorienting. You are twenty-five years old and your country is trying to compress forty years of social change into a decade.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.e += 4; p.addFlag('sau_vision_generation'); p.setMem('sau_vision', true); },
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'sau_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      (G.flags.has('sau_aramco_generation') || G.flags.has('sau_siege_generation') || G.flags.has('sau_mutaween_era')) &&
      !G.mem?.sau_reckoning,
    text: (G) => {
      const isWoman = G.character.gender === 'female'
      return isWoman
        ? 'The driving ban that your mother lived under and you lived under is now lifted. The cinemas are open. The concerts. The world your granddaughter is growing up in is not the world you were allowed to grow up in. You cannot decide if this is a vindication or an indictment. Both, probably, with the specific mathematics of: too late for you, just in time for her.'
        : 'The country was built in fifty years on oil that will not last forever and a religious compact that has been renegotiated without being called a renegotiation. You have watched the Grand Mosque seized and retaken, the Americans invited in and never quite asked to leave, the reforms announced by a crown prince who also ordered the killing of a journalist. The arc bends in a direction but does not straighten.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.addFlag('sau_testigo_generation'); p.setMem('sau_reckoning', true); },
  },

]

export default SAUDI_EVENTS

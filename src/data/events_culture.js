// events_culture.js
// Regime-, ethnicity-, religion-, and identity-gated events.
// These are what make playing in 1970s Chile feel different from 2020s Canada.
// All conditions use G.regime, G.lgbtqCriminalized, G.childMarriageRisk,
// G.ethnicity, G.casteSystem, G.ruralUrban — fields available in buildG().

const isDisadvantaged = (G) =>
  G.character.country.ethnicGroups?.find(eg => eg.id === G.ethnicity)?.disadvantaged === true

export const CULTURE_EVENTS = [

  // ── MILITARY DICTATORSHIP ────────────────────────────────────────────────────

  {
    id: 'cult_dic_portrait',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.regime === 'military_dictatorship',
    text: 'There is a portrait of the general on every classroom wall. You are taught that he saved the country from chaos. You memorize this the way you memorize multiplication tables — not because you believe it, but because you will be tested.',
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 4; p.addFlag('authoritarian_childhood') },
  },
  {
    id: 'cult_dic_neighbor_disappears',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 7,
    text: 'Your neighbor — the man who fixed radios in his garage — is not there one morning. His wife says he is traveling. Nobody asks questions. You are old enough to understand that something has happened. You are not old enough to understand what.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('witnessed_disappearance') },
  },
  {
    id: 'cult_dic_banned_books',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 13,
    text: 'You find a book in your uncle\'s closet — one that isn\'t in any school library, one you are not supposed to have read. He makes you promise to tell no one. You read it in two days and hide it under the floorboard.',
    choices: [
      { text: 'Read more banned material and think independently', tag: null, outcome: 'You start to understand the world differently from how you were taught to.', effect: (p) => { p.e += 8; p.m -= 5; p.addFlag('dissident_reader'); p.addFlag('independent_thinker') } },
      { text: 'Return the book. It\'s not worth the risk.', tag: null, outcome: 'You hand it back. You know what it said. That cannot be taken back either.', effect: (p) => { p.e += 3; p.m -= 3; p.addFlag('cautious_survivor') } },
    ],
    effect: null,
  },
  {
    id: 'cult_dic_safe_opinions',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 14,
    text: 'At school, the history teacher asks the class about the current government. Everyone gives the approved answer. You have learned to distinguish between what you think and what you say. The gap between those two things grows every year.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('double_consciousness') },
  },
  {
    id: 'cult_dic_mandatory_service',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 18 && G.age <= 22 && G.character.gender === 'male',
    text: 'The conscription notice arrives. You are the right age and the right gender. A representative comes to explain that service to the nation is an honor. Two years. You go.',
    choices: [
      { text: 'Serve and try to build useful skills', tag: null, outcome: 'You come back two years later, older and harder. You are good at following orders and very tired of it.', effect: (p) => { p.h -= 5; p.s += 6; p.addFlag('military_service'); p.addFlag('authoritarian_veteran') } },
      { text: 'Find a way to avoid service', tag: null, outcome: 'Through connections, a false medical report, or sheer luck — you are passed over. You are not entirely proud of this.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('evaded_service') } },
    ],
    effect: null,
  },
  {
    id: 'cult_dic_election_farce',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 18,
    text: 'There is an election. Voting is mandatory. The ballot has one name on it. You stand in line, mark the box, and hand it to the official. On the way home, an older neighbor walks beside you in silence.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('experienced_sham_election') },
  },
  {
    id: 'cult_dic_informant_fear',
    phase: 'adult',
    weight: 2,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 25,
    text: 'A colleague at work says something critical about the government — small, quiet, over coffee. You say nothing. Later you wonder if he was testing you. You are now careful about everything you say to everyone.',
    choices: null,
    effect: (p) => { p.m -= 7; p.s -= 3; p.addFlag('surveillance_paranoia') },
  },
  {
    id: 'cult_dic_curfew',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.regime === 'military_dictatorship' && G.age >= 16,
    text: 'There is a curfew. 10 PM, no exceptions. You are caught outside at 10:30 by two soldiers. They are young — younger than you expected. They write down your name. You go home and do not sleep.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('stopped_by_authorities') },
  },

  // ── SINGLE-PARTY COMMUNIST ───────────────────────────────────────────────────

  {
    id: 'cult_com_pioneer_scarf',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.regime === 'single_party_communist' && G.age >= 7 && G.age <= 12,
    text: 'You receive your Pioneer neckerchief at a school ceremony. Your parents stand in the back looking proud. You recite the oath. Some children believe every word. Most just know it is expected. You tie the knot every morning before school for three years.',
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 3; p.addFlag('communist_childhood') },
  },
  {
    id: 'cult_com_party_application',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'single_party_communist' && G.age >= 16,
    text: 'Your school counselor advises you to apply for Party membership at 18. It will help with university, with career assignments, with housing. Everyone understands what this means. The question is not whether to join but how to feel about it.',
    choices: [
      { text: 'Join the Party — pragmatism over principle', tag: null, outcome: 'You fill out the forms. You get the stamp. You stop thinking about it too hard.', effect: (p) => { p.e += 3; p.m -= 8; p.addFlag('party_member'); p.addFlag('pragmatic_compliance') } },
      { text: 'Refuse on principle', tag: null, outcome: 'Your file is marked. Certain doors quietly close. You know why but cannot say so openly.', effect: (p) => { p.m -= 6; p.e += 6; p.r += 5; p.addFlag('refused_party'); p.addFlag('independent_thinker') } },
    ],
    effect: null,
  },
  {
    id: 'cult_com_housing_queue',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.regime === 'single_party_communist' && G.age >= 20,
    text: 'You register for state housing. The wait is 5 to 8 years. You are told to be patient. You move in with your parents. You are married by the time the assignment comes, and the apartment is smaller than described, on the 11th floor of a building with a frequently broken elevator. You are deeply grateful.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('state_housing') },
  },
  {
    id: 'cult_com_western_music',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'single_party_communist' && G.age >= 14,
    text: 'Someone at school has a cassette tape. Western music — American rock, British pop. It is technically contraband. You listen to it in someone\'s bedroom with the volume down, and for 45 minutes the world seems larger than it is.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('counter_culture') },
  },
  {
    id: 'cult_com_political_meeting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian') && G.age >= 18,
    text: 'Attendance at the monthly political education meeting is technically voluntary. You go. Everyone goes. The speaker talks for two hours about the party\'s achievements. At the end, you clap for exactly as long as the person next to you.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 2; p.addFlag('attended_mandatory_meeting') },
  },
  {
    id: 'cult_com_shortage',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.regime === 'single_party_communist' && G.character.wealthTier <= 2,
    text: 'There is no cooking oil at the market again. Your mother gets up at 4 AM to queue for bread. Sometimes the bread is there. Sometimes it isn\'t. You learn not to ask where food comes from — there is a wall between that question and the answer.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 8; p.addFlag('shortage_childhood') },
  },
  {
    id: 'cult_com_state_television',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.regime === 'single_party_communist' && G.currentYear >= 1960 && G.currentYear <= 1990,
    text: 'There is one television channel. Every night it shows the same things: the leader visiting a factory, sports victories, news that is confident and untroubled. The gap between what it says and what your family talks about at the table is something you learn to manage very young.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 4; p.addFlag('state_media_childhood') },
  },
  {
    id: 'cult_com_secret_police',
    phase: 'adult',
    weight: 2,
    when: (G) => G.regime === 'single_party_communist' && G.age >= 25,
    text: 'A man comes to the door. He is politely dressed. He would like to ask you some questions about a colleague. He makes clear this is voluntary. You invite him in. You give answers that are true and also safe. After he leaves you sit still for a long time.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('interrogated_by_state') },
  },

  // ── AUTHORITARIAN (non-communist) ────────────────────────────────────────────

  {
    id: 'cult_auth_bribe',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.regime === 'single_party_authoritarian' && G.age >= 18,
    text: 'Your permit application has been pending for four months. The official tells you, without making eye contact, that there may be a fee to expedite the process. You understand. You pay it. The permit arrives the next week.',
    choices: null,
    effect: (p) => { p.mo -= 50; p.m -= 5; p.addFlag('paid_bribe'); p.karma -= 3 },
  },
  {
    id: 'cult_auth_protest_witness',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.regime === 'single_party_authoritarian' && G.age >= 16,
    text: 'Coming home from school you walk through a square where people have gathered. Signs, chanting — it is a protest. Within minutes the vehicles arrive. You take a different street home. Later you hear about arrests on the news, briefly, before the channel moves on.',
    choices: [
      { text: 'Join them', tag: null, outcome: 'You are there for ten minutes before the vehicles arrive. You run. You are not caught. Your hands shake for an hour after.', effect: (p) => { p.m -= 8; p.e += 6; p.addFlag('witnessed_crackdown'); p.addFlag('political_awakening') } },
      { text: 'Keep walking', tag: null, outcome: 'You go home. The images stay with you. The question of why you kept walking stays longer.', effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('witnessed_crackdown') } },
    ],
    effect: null,
  },
  {
    id: 'cult_auth_internet_blocked',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'single_party_authoritarian' && G.currentYear >= 2005,
    text: 'Certain websites do not load. The search results skip things. You know VPNs exist — everyone does — but using them carries a risk that is never precisely defined and is therefore always present.',
    choices: [
      { text: 'Learn to use a VPN and access the open internet', tag: null, outcome: 'The world is bigger than you were allowed to think. This comes with its own weight.', effect: (p) => { p.e += 8; p.m -= 4; p.addFlag('vpn_user'); p.addFlag('counter_culture') } },
      { text: 'Stay within the approved network', tag: null, outcome: 'You don\'t need the complication. You learn what you can find.', effect: (p) => { p.e += 2; p.m -= 2; p.addFlag('information_restricted') } },
    ],
    effect: null,
  },
  {
    id: 'cult_auth_state_job',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.regime === 'single_party_authoritarian' && G.age >= 20,
    text: 'The government sector offers stable jobs with modest pay and significant job security. The private sector offers better pay and significant personal risk depending on who is in power. You understand that in your country, choosing a career is also choosing a patron.',
    choices: [
      { text: 'Take the state job — stability matters', tag: null, outcome: 'The salary is modest. The security is real. You have made a calculation that most people here understand.', effect: (p) => { p.mo += 300; p.m -= 3; p.addFlag('state_employment') } },
      { text: 'Try the private sector', tag: null, outcome: 'The money is better. Your job security depends entirely on factors beyond your control.', effect: (p) => { p.mo += 600; p.r += 4; p.addFlag('private_sector_risk') } },
    ],
    effect: null,
  },

  // ── THEOCRACY ───────────────────────────────────────────────────────────────

  {
    id: 'cult_theo_morality_police',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.regime === 'theocracy' && G.age >= 13 && G.character.gender === 'female',
    text: 'The morality police stop you on the street. Your hijab, they say, is not properly worn. You are polite. You fix it. You are taken to an office and released after an hour of paperwork. Your mother is waiting outside. She hugs you hard. She does not say "I told you so" but you both know.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('stopped_by_religious_police') },
  },
  {
    id: 'cult_theo_travel_ban',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.regime === 'theocracy' && G.character.gender === 'female' && G.age >= 18,
    text: 'The scholarship letter arrives. A university abroad. You would need your male guardian\'s written permission to travel. You ask. He considers for six weeks and then says no. The scholarship has a deadline. You watch it pass.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 15; p.e -= 5; p.addFlag('denied_opportunity_by_guardian') },
  },
  {
    id: 'cult_theo_apostasy_fear',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.regime === 'theocracy' && G.age >= 17,
    text: 'You have begun to question things that are not supposed to be questioned. You have said nothing out loud. Apostasy is not just socially catastrophic in your community — it has a legal dimension that includes prison and, depending on interpretation, more.',
    choices: [
      { text: 'Keep your doubts entirely private and practice outward compliance', tag: null, outcome: 'You become very good at performing belief. The performance costs you something every day.', effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('private_doubt') } },
      { text: 'Confide in one person you completely trust', tag: null, outcome: 'The trust holds. You are not alone. This is more precious than it sounds.', effect: (p) => { p.m -= 5; p.addFlag('private_doubt'); p.addFlag('has_close_friend') } },
    ],
    effect: null,
  },
  {
    id: 'cult_theo_prayer_times',
    phase: 'adult',
    weight: 3,
    when: (G) => G.regime === 'theocracy' && G.age >= 20,
    text: 'Work stops for prayer five times a day. The call to prayer comes from every speaker on every corner. You were raised with this. It is the rhythm of the day, the season, the year. For some it is peace. For others it is pressure. Sometimes both at once.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2 },
  },

  // ── REGIME CHANGE / TRANSITION ───────────────────────────────────────────────

  {
    id: 'cult_transition_coup',
    phase: 'childhood',
    weight: 1,
    when: (G) => {
      if (!G.character.country.regimeHistory) return false
      return G.character.country.regimeHistory.some(r =>
        Math.abs(r.year - G.currentYear) <= 2 &&
        (r.to === 'military_dictatorship' || r.to === 'theocracy' || r.to === 'single_party_communist')
      )
    },
    text: 'Your parents wake you in the night. The radio is on. Armored vehicles move through the streets. By morning there is a new name being said on every broadcast. Your parents speak in whispers. You don\'t understand all of it yet. You understand enough.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('lived_through_coup') },
  },
  {
    id: 'cult_transition_democracy',
    phase: 'young_adult',
    weight: 2,
    when: (G) => {
      if (!G.character.country.regimeHistory) return false
      return G.character.country.regimeHistory.some(r =>
        Math.abs(r.year - G.currentYear) <= 2 &&
        (r.to === 'federal_republic' || r.to === 'constitutional_monarchy' || r.to === 'parliamentary_republic')
      )
    },
    text: 'For the first time in living memory, there is a free election with real candidates. The lines outside the polling station run around the block. Old people cry. You vote. Your first vote, in a real election. It is a strange and specific feeling.',
    choices: null,
    effect: (p) => { p.m += 15; p.e += 5; p.addFlag('voted_in_first_free_election') },
  },
  {
    id: 'cult_transition_hyperinflation',
    phase: 'adult',
    weight: 2,
    when: (G) => {
      if (!G.character.country.regimeHistory) return false
      return G.character.country.regimeHistory.some(r =>
        Math.abs(r.year - G.currentYear) <= 3 &&
        (r.from === 'single_party_communist' || G.flags.includes('lived_through_coup'))
      ) && G.money > 0
    },
    text: 'The currency reform happens. A zero is knocked off every denomination. The savings your family kept in the old banknotes are worth a tenth of what they were last week. You learn what it means for money to not be solid.',
    choices: null,
    effect: (p) => { p.mo = -(p.mo ?? 0); p.m -= 15; p.r += 12; p.addFlag('survived_hyperinflation') },
  },

  // ── LGBTQ UNDER CRIMINALIZATION ──────────────────────────────────────────────
  // (replaces the hardcoded-country-list version in events.js)

  {
    id: 'cult_lgbtq_criminal_realization',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.lgbtqCriminalized && G.age >= 13 && G.age <= 17,
    text: 'You understand something about yourself. The law in your country has a word for it and the word carries prison time. The culture has stronger words still. You look at the people around you — family, teachers, neighbors — and make a calculation about your survival.',
    choices: [
      { text: 'Suppress it completely. Survival first.', tag: null, outcome: 'You perform a version of yourself that is safe. You are very good at it. The performance costs something every day.', effect: (p) => { p.m -= 18; p.r += 12; p.addFlag('closeted_survival'); p.addFlag('learned_silence') } },
      { text: 'Confide in one person you trust with your life', tag: null, outcome: 'The risk is real. For now, you are not entirely alone. That is worth something impossible to measure.', effect: (p) => { p.m -= 8; p.addFlag('closeted_survival'); p.addFlag('has_close_friend') } },
    ],
    effect: null,
  },
  {
    id: 'cult_lgbtq_classmate_exposed',
    phase: 'adolescence',
    weight: 1,
    when: (G) => G.lgbtqCriminalized && G.age >= 14,
    text: 'A student at your school is found out. You see it happen: the sudden absence from class, the rumors spreading, the teachers going quiet about it. You do not see them again. You understand viscerally what exposure means and you become very still.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('witnessed_persecution'); p.addFlag('learned_silence') },
  },
  {
    id: 'cult_lgbtq_forced_marriage_pressure',
    phase: 'young_adult',
    weight: 1,
    when: (G) => G.lgbtqCriminalized && G.flags.includes('closeted_survival') && G.age >= 20 && G.age <= 28,
    text: 'Your family is applying gentle and then not-so-gentle pressure about marriage. A suitable person has been identified. You understand that marriage is a form of cover, and that cover is a form of survival. You think about this for a long time.',
    choices: [
      { text: 'Marry. The protection is real even if the feeling isn\'t.', tag: null, outcome: 'You build a life that is livable from the outside. What happens inside is yours alone.', effect: (p) => { p.m -= 15; p.r += 15; p.addFlag('married_for_cover') } },
      { text: 'Refuse. The cost to another person is too high.', tag: null, outcome: 'Your family is hurt and confused. The pressure increases. You find other ways to manage.', effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('refused_marriage') } },
    ],
    effect: null,
  },
  {
    id: 'cult_lgbtq_arrested',
    phase: 'young_adult',
    weight: 1,
    when: (G) => G.lgbtqCriminalized && G.age >= 18 && !G.flags.includes('learned_silence') && Math.random() < 0.3,
    text: 'The police come. You are not sure who told them or exactly what they know. You are held for four days. The interrogation is degrading in ways you will not describe to most people. You are released on condition. Nothing is the same after.',
    choices: null,
    effect: (p) => { p.m -= 25; p.h -= 8; p.r += 20; p.addFlag('arrested_for_orientation'); p.addFlag('learned_silence') },
  },

  // ── LGBTQ HISTORICAL — UK SECTION 28 ─────────────────────────────────────────

  {
    id: 'cult_lgbtq_section28_school',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.flags.includes('same_sex_attracted') &&
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1988 && G.currentYear <= 2003 &&
      G.age >= 13 && G.age <= 17,
    text: 'Section 28 of the Local Government Act is the law. It prohibits local authorities from "intentionally promoting homosexuality" or teaching it as a "pretended family relationship." What this means in practice: your school cannot acknowledge you exist. The teacher who noticed you struggling last term and started to reach out has stopped. The library does not stock books that would help you understand yourself. You are legislatively alone.',
    choices: [
      { text: 'Find communities outside the school — youth groups, the internet', tag: null, outcome: 'An early LGBTQ youth group meets in a church hall forty minutes away by bus. The internet — if you have access — has forums. You are not the only one. The law cannot reach the church hall or the forum.', effect: (p) => { p.m += 5; p.s += 4; p.addFlag('found_community') } },
      { text: 'Endure it — school ends', tag: null, outcome: 'You count the years. In 2000 the law is repealed in Scotland. In 2003 in England and Wales. You survive until the law changes. That counts as something.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('learned_silence') } },
    ],
    effect: null,
  },

  {
    id: 'cult_lgbtq_section28_teacher',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.flags.includes('same_sex_attracted') &&
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1988 && G.currentYear <= 2003,
    text: 'A teacher at your school has a reputation for being approachable. You almost said something to them last term. Then you heard from an older student that they had been warned about Section 28 — that any conversation about your kind of life is technically grounds for disciplinary action. The teacher has their own protection to think about. You understand this. It does not make the silence smaller.',
    choices: [
      { text: 'Say something anyway — take the risk together', tag: null, outcome: 'The teacher closes the door. They do not say anything explicitly that could be reported. But they write a book title on a piece of paper and slide it across the desk. It is enough to know there is a person on the other side of the wall.', effect: (p) => { p.m += 4; p.addFlag('has_close_friend') } },
      { text: 'Say nothing — you do not want to put them at risk', tag: null, outcome: 'You carry the silence home. The teacher sees you do it. Neither of you acknowledges what has passed between you. Years later you look them up to say thank you and cannot find the words.', effect: (p) => { p.m -= 5; p.r += 4 } },
    ],
    effect: null,
  },

  // ── LGBTQ COMING OUT — CONTEXTUALLY DIFFERENTIATED ───────────────────────────

  {
    id: 'cult_lgbtq_coming_out_muslim_majority',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('same_sex_attracted') &&
      !G.lgbtqCriminalized &&
      ['muslim_sunni', 'muslim_shia'].includes(G.character.religion) &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.includes('out'),
    text: 'You are not in a country that will imprison you. But coming out in your community is not the same as coming out in Amsterdam. The faith your family lives by has a clear position. The culture goes further. The coming out conversation, if it happens, will not be followed by a long silence and then acceptance — it will be followed by grief, prayer, community pressure, and possibly a request that you leave.',
    choices: [
      { text: 'Come out to the most likely ally first — a sibling or cousin', tag: null, outcome: 'They do not betray you. They also do not know what to do with the information. The conversation ends without resolution and is never quite finished. You are more out than you were, which is not nothing.', effect: (p) => { p.m += 3; p.r += 5; p.addFlag('out') } },
      { text: 'Live openly in the world outside the family — keep the two worlds separate', tag: null, outcome: 'The city you work in does not care. The house you grew up in still does. You become expert at the geography of this — which streets belong to which version of yourself.', effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('out') } },
      { text: 'Wait — the moment is not right yet', tag: null, outcome: 'The waiting is its own cost. Some moments never become right. You will have to decide at some point whether waiting forever is something you can live with.', effect: (p) => { p.m -= 6; p.r += 5 } },
    ],
    effect: null,
  },

  {
    id: 'cult_lgbtq_coming_out_netherlands',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('same_sex_attracted') &&
      G.character.country.name === 'Netherlands' &&
      G.currentYear >= 2000 &&
      G.age >= 17 && G.age <= 28 &&
      !G.flags.includes('out'),
    text: 'The Netherlands was the first country in the world to legalise same-sex marriage, in 2001. You are coming out in a society that has been thinking about this longer than most, in a city where the canal houses have pride flags and where the school counselor would have known exactly what to say if you had asked. The conversation with your parents is still the conversation with your parents. But the legal and social structure is behind you.',
    choices: [
      { text: 'Tell your parents — this should be straightforward', tag: null, outcome: 'Your mother says she already knew. Your father takes three weeks. By the end of three weeks he is asking about your life in a way that feels like the beginning of something. The country made this possible. The family made it real.', effect: (p) => { p.m += 12; p.s += 5; p.addFlag('out') } },
      { text: 'Come out publicly first — life first, conversation later', tag: null, outcome: 'Your parents find out from someone else. The conversation is harder than it needed to be. The outcome is the same: you are out, and they are navigating it.', effect: (p) => { p.m += 8; p.s += 3; p.r += 2; p.addFlag('out') } },
    ],
    effect: null,
  },

  {
    id: 'cult_lgbtq_conversion_fear',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.flags.includes('same_sex_attracted') &&
      G.lgbtqCriminalized &&
      G.age >= 16 && G.age <= 22,
    text: 'In your country, what you are is punishable. In your community, it is unspeakable. You have read that other countries have begun to recognize it. The distance between here and there is not just geographical.',
    choices: [
      { text: 'Plan a path out — save money, research asylum', tag: null, outcome: 'The planning itself gives you something to hold. The day you leave is still years away. The knowledge that you are working toward it keeps you functional.', effect: (p) => { p.m += 3; p.e += 4; p.addFlag('escape_planning') } },
      { text: 'Build a secret life — find others like you quietly', tag: null, outcome: 'They exist in every city, in every country that has made this illegal. The network is invisible and vital. You are found.', effect: (p) => { p.m += 5; p.s += 3; p.addFlag('closeted_survival'); p.addFlag('found_community') } },
      { text: 'Pray it away — perhaps it is something you can change', tag: null, outcome: 'You spend two years in this hypothesis. The prayers do not change the person. They do teach you something about desperation, and about the cruelty of telling someone their nature is negotiable.', effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('closeted_survival') } },
    ],
    effect: null,
  },

  // ── CHILD MARRIAGE ───────────────────────────────────────────────────────────

  {
    id: 'cult_cm_proposal_arrives',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.childMarriageRisk > 0.25 && G.character.gender === 'female' && G.age >= 10 && G.age <= 13,
    text: 'A family comes to visit. You serve tea. The conversation is about your future. You are not directly included but you understand what is being discussed. The man they are considering is 24. You are 11. Your mother keeps touching your hair.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('child_marriage_proposed') },
  },
  {
    id: 'cult_cm_school_dropout_pressure',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.childMarriageRisk > 0.20 && G.character.gender === 'female' && G.age >= 12 && G.age <= 15,
    text: 'Your father says school is becoming less important. A girl who can manage a home, cook, and carry children is more valuable than one who reads. The other girls in your class are slowly disappearing — one by one, they stop coming. The teacher never says anything.',
    choices: [
      { text: 'Find a way to stay in school', tag: null, outcome: 'You negotiate, appeal to relatives, find allies. Every year is a small victory against a current running the other direction.', effect: (p) => { p.e += 8; p.m -= 10; p.r += 5; p.addFlag('fought_to_stay_in_school') } },
      { text: 'Accept the path your family has chosen', tag: null, outcome: 'You leave school. The door to certain futures closes. Others open. You are not sure which you wanted.', effect: (p) => { p.e -= 8; p.r += 12; p.addFlag('left_school_early') } },
    ],
    effect: null,
  },
  {
    id: 'cult_cm_betrothal',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.childMarriageRisk > 0.30 && G.character.gender === 'female' && G.age >= 13 && G.age <= 16 && !G.flags.includes('fought_to_stay_in_school'),
    text: 'It is decided. The bride price is agreed. You will marry in the spring. Everyone treats this as good news — stability, a household, a future secured. You sit quietly through the celebration and try to understand what you feel.',
    choices: [
      { text: 'Accept it. This is the path here.', tag: null, outcome: 'You marry at 15. The life ahead is defined by this choice you did not quite make.', effect: (p) => { p.r += 18; p.m -= 15; p.addFlag('child_marriage'); p.addFlag('married_young') } },
      { text: 'Run — to a relative, a shelter, anywhere', tag: null, outcome: 'The rupture with your family is severe and possibly permanent. You are alone in a way that is terrifying and clarifying.', effect: (p) => { p.m -= 20; p.r += 10; p.e += 5; p.addFlag('fled_child_marriage'); p.addFlag('estranged_family') } },
    ],
    effect: null,
  },
  {
    id: 'cult_cm_brother_pressure',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.childMarriageRisk > 0.15 && G.character.gender === 'male' && G.age >= 14,
    text: 'Your sister is being married off. She is 14. You are 16. You watch the proceedings and something in you does not sit right, but nobody in your household speaks it and you do not have the words or the standing to say it.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('witnessed_child_marriage') },
  },

  // ── DISADVANTAGED ETHNICITY ──────────────────────────────────────────────────

  {
    id: 'cult_eth_teacher_low_expectations',
    phase: 'childhood',
    weight: 3,
    when: (G) => isDisadvantaged(G) && G.age >= 6 && G.age <= 12,
    text: 'The teacher asks the class a question. You know the answer — you have known it for a week. She looks around the room and calls on someone else. When you answer anyway, she looks briefly surprised. You file this away. You will carry it for a long time.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 8; p.r += 5; p.addFlag('experienced_low_expectations') },
  },
  {
    id: 'cult_eth_police_stop',
    phase: 'adolescence',
    weight: 3,
    when: (G) => isDisadvantaged(G) && G.age >= 13,
    text: 'You are stopped on the way home by two officers. Your friend — who walked five steps ahead of you — was not stopped. You know why. The officers find nothing and wave you on. The conversation your parent has with you that evening is called "the talk" in every household that looks like yours.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('racial_profiling'); p.addFlag('had_the_talk') },
  },
  {
    id: 'cult_eth_job_discrimination',
    phase: 'young_adult',
    weight: 3,
    when: (G) => isDisadvantaged(G) && G.age >= 18,
    text: 'You apply for a position you are qualified for. You are not called back. A colleague who is less qualified is called back. He has a different surname and a different face. You know this is happening and you know it is not possible to prove.',
    choices: [
      { text: 'Send a second application using a name less identifiable as yours', tag: null, outcome: 'You get an interview. The competence is the same. The name made the difference. You keep this information and use it.', effect: (p) => { p.m -= 10; p.e += 4; p.addFlag('code_switched_for_opportunity') } },
      { text: 'Apply anyway with your real name, again and again', tag: null, outcome: 'Some doors open eventually. Each rejection costs something. You are building a thicker skin and also a longer memory.', effect: (p) => { p.m -= 8; p.r += 6; p.s += 3; p.addFlag('persisted_against_discrimination') } },
    ],
    effect: null,
  },
  {
    id: 'cult_eth_slur',
    phase: 'childhood',
    weight: 3,
    when: (G) => isDisadvantaged(G) && G.age >= 7 && G.age <= 13,
    text: 'A child at school says a word at you — one you have heard before, one your parents flinch at when it appears on television. It is said casually, without rage, which makes it worse in a way. The teacher sees it and looks at something else.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('experienced_racism') },
  },
  {
    id: 'cult_eth_only_one_in_room',
    phase: 'young_adult',
    weight: 2,
    when: (G) => isDisadvantaged(G) && G.age >= 18,
    text: 'You are the only person who looks like you in the room. This happens often enough that you have a routine for it: arrive early, be confident, do not mention it, navigate the particular kind of invisibility and hyper-visibility that happen simultaneously.',
    choices: null,
    effect: (p) => { p.s += 4; p.m -= 6; p.addFlag('navigated_as_minority') },
  },
  {
    id: 'cult_eth_community_solidarity',
    phase: 'young_adult',
    weight: 3,
    when: (G) => isDisadvantaged(G) && G.age >= 16,
    text: 'Within your community there is a different world: the food, the language, the music, the understanding that does not need explanation. Here you are not a minority — you are home. You carry both worlds and they are not always easy to carry but they are yours.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 5; p.addFlag('dual_identity') },
  },
  {
    id: 'cult_eth_neighborhood_redlining',
    phase: 'adult',
    weight: 2,
    when: (G) => isDisadvantaged(G) && G.age >= 25 && G.money > 20000,
    text: 'You find a neighborhood you can afford in. The bank\'s mortgage officer is polite and asks a number of detailed questions about the area. The loan terms offered are less favorable than what a colleague received in a neighborhood across the city. You have enough to calculate the difference.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.addFlag('experienced_housing_discrimination') },
  },

  // ── RURAL AND SUBSISTENCE LIFE ───────────────────────────────────────────────

  {
    id: 'cult_rural_water_carry',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.ruralUrban === 'rural' && (G.character.country.archetype === 'subsaharan' || G.character.country.archetype === 'conflict_zone' || G.character.country.archetype === 'developing_unstable') && G.age >= 7,
    text: 'Before school, before anything else, you carry water from the well. It is 40 minutes each way. Two jerricans. You have been doing this since you were old enough to carry them. Some mornings it is still dark. The birds are starting. It is, in its own way, a kind of peace.',
    choices: null,
    effect: (p) => { p.h += 3; p.m -= 4; p.addFlag('subsistence_childhood') },
  },
  {
    id: 'cult_rural_no_electricity',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.ruralUrban === 'rural' && G.currentYear >= 1950 && G.currentYear <= 1990 && G.character.country.gdp !== 'very_high' && G.character.country.gdp !== 'high',
    text: 'The village gets electricity. You are nine years old. Before that, evenings were oil lamp and moonlight. You watch the first light bulb flicker on in your house and your mother covers her face with her hands and laughs.',
    choices: null,
    effect: (p) => { p.m += 10; p.e += 5; p.addFlag('first_electricity') },
  },
  {
    id: 'cult_rural_no_doctor',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && G.character.country.healthcare === 'very_poor',
    text: 'Your sister gets sick with a fever that does not break. The nearest clinic is three hours on foot. Your mother walks through the night. By morning the fever has broken on its own. Your sister is fine. Your mother sits down and does not get up for a day.',
    choices: null,
    effect: (p) => { p.h -= 3; p.m -= 8; p.r += 5; p.addFlag('witnessed_medical_crisis') },
  },
  {
    id: 'cult_rural_first_city_visit',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.ruralUrban === 'rural' && G.age >= 12 && G.age <= 17,
    text: 'You go to the city for the first time. The noise. The smell of exhaust and food and people in numbers you have never seen. The buildings are larger than you pictured. You lose your companion in a crowd for twenty minutes and the feeling of it — pure, vertiginous panic — is also a kind of education.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 5; p.addFlag('first_city_visit') },
  },
  {
    id: 'cult_rural_harvest_failure',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && G.character.wealthTier <= 2 && (G.character.country.archetype === 'subsaharan' || G.character.country.archetype === 'developing_unstable'),
    text: 'The rains did not come on time. The harvest is less than half. Your family eats less. You watch your father sit outside for a long time looking at the field. You learn very young that the sky is not on anyone\'s side.',
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 10; p.r += 8; p.addFlag('harvest_failure') },
  },

  // ── CASTE SYSTEM ────────────────────────────────────────────────────────────

  {
    id: 'cult_caste_seating',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.casteSystem && G.age >= 6 && G.age <= 12,
    text: 'At school, there is an unspoken arrangement about where children sit. It is never explained. Everyone simply knows. You have always known which side of the room you belong to. This is not taught. It is absorbed.',
    choices: null,
    effect: (p) => { p.m -= 6; p.e += 3; p.addFlag('caste_socialization') },
  },
  {
    id: 'cult_caste_well_prohibition',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.casteSystem && isDisadvantaged(G) && G.age >= 6,
    text: 'You are told not to use the well in the center of the village. Not directly — there is simply a look from the older women, a pulling away. You understand. Your mother packs water from farther away without explanation. The system does not explain itself.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('caste_discrimination'); p.addFlag('subsistence_childhood') },
  },
  {
    id: 'cult_caste_intercaste_love',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.casteSystem && G.age >= 17 && G.age <= 25,
    text: 'You fall for someone whose caste is different from yours. The feeling is real. The obstacle is also real. Your families\' reactions range from cold to violent. You have to decide whether this love is something you will defend or something you will let go.',
    choices: [
      { text: 'Defend it — this is your life', tag: null, outcome: 'The rupture with family is severe. The love is real. Whether it holds under the pressure is another question.', effect: (p) => { p.m += 8; p.r += 15; p.addFlag('defied_caste') } },
      { text: 'Let it go — the cost is too high', tag: null, outcome: 'You end it. You do not entirely forgive yourself. You do not entirely regret surviving.', effect: (p) => { p.m -= 15; p.r += 18; p.addFlag('caste_compliance') } },
    ],
    effect: null,
  },
  {
    id: 'cult_caste_ambedkar_awareness',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.casteSystem && isDisadvantaged(G) && G.age >= 14,
    text: 'You read about people who fought the system you were born into. Not just individuals — movements, arguments, constitutions written to protect people like you. The system is not natural. It was built. What is built can, in theory, be taken apart.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 5; p.addFlag('caste_political_awakening'); p.addFlag('political_awakening') },
  },

  // ── WEALTH-SPECIFIC TEXTURE ──────────────────────────────────────────────────

  {
    id: 'cult_wealth_boarding_school',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character.wealthTier >= 4 && G.age >= 8 && G.age <= 13,
    text: 'You are sent to boarding school. Your parents drive away on a Sunday evening and you watch from the dormitory window. The school is excellent. You are also eight years old and alone for the first time. These two facts coexist for years.',
    choices: null,
    effect: (p) => { p.e += 10; p.s += 5; p.m -= 8; p.addFlag('boarding_school') },
  },
  {
    id: 'cult_wealth_servant_dynamic',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.wealthTier >= 4 && (G.character.country.archetype === 'developing_urban' || G.character.country.archetype === 'wealthy_gulf') && G.age >= 5,
    text: 'There is a person who cleans your house, another who cooks. They have been here longer than you can remember. You learn their names young. Later you notice that your friends in other countries find this arrangement unusual. You think about what you took for granted.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 3; p.r += 4; p.addFlag('class_awareness') },
  },
  {
    id: 'cult_wealth_remittance_family',
    phase: 'childhood',
    weight: 3,
    when: (G) => (G.character.country.archetype === 'subsaharan' || G.character.country.archetype === 'developing_unstable') && G.character.wealthTier >= 2 && G.character.wealthTier <= 3,
    text: 'The money arrives from abroad — from London, from Doha, from Minneapolis — in irregular packets that have unpredictable timing and enormous symbolic weight. A relative you have met once sends a Western Union. It pays the school fees. It comes with a different kind of obligation.',
    choices: null,
    effect: (p) => { p.mo += 200; p.m += 5; p.r += 3; p.addFlag('remittance_family') },
  },
  {
    id: 'cult_poverty_meal_skipped',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.wealthTier === 1 && G.age >= 5,
    text: 'Some days there is one meal. Your mother eats last and says she isn\'t hungry. You are old enough to know this isn\'t true. You pretend to believe it. This is the first act of love you can remember performing.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 6; p.r += 5; p.addFlag('food_insecurity') },
  },

  // ── EDUCATION SYSTEMS ────────────────────────────────────────────────────────
  {
    id: 'cult_edu_gaokao_pressure',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.character.country.name === 'China' && G.age >= 14 && G.age <= 18,
    text: 'The gaokao is three years away and already it is the shape of your life. The tutor comes on Saturdays. Your parents have a single ambition on your behalf. Every exam score is discussed at dinner. Some classmates are cracking under it. You are not sure if you are or not — you have forgotten what normal pressure feels like.',
    choices: [
      { text: 'Embrace the grind — it\'s the only path', tag: null, outcome: 'You sleep five hours a night for three years. Your score is high. You get in.', effect: (p) => { p.e += 12; p.m -= 10; p.h -= 6; p.addFlag('gaokao_survivor') } },
      { text: 'Find private moments of escape', tag: null, outcome: 'You study hard but protect a small part of your interior life. You are less miserable than your friends. Your score is good enough.', effect: (p) => { p.e += 6; p.m -= 4; p.addFlag('gaokao_survivor') } },
    ],
    effect: null,
  },
  {
    id: 'cult_edu_corporal_punishment',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1950 && G.currentYear <= 1985 && G.age >= 6 && G.age <= 13 && ['wealthy_west', 'post_soviet', 'developing_urban'].includes(G.character.country.archetype),
    text: 'The teacher has a cane or a strap and it is used on the hands or the backs of legs without particular explanation. You learn what to do and what not to do. The lesson is not about arithmetic. It is about how authority works and that the body is not always your own territory.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('corporal_punishment_school') },
  },
  {
    id: 'cult_edu_colonial_language',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.currentYear >= 1950 && G.currentYear <= 1985 && ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 6 && G.age <= 12,
    text: 'School is conducted in a language that is not the one you speak at home. You arrive knowing how to say certain things and learn that here those things must be said differently. By the end of the first year you think in two registers. By the end of the second you are not sure which one is yours.',
    choices: null,
    effect: (p) => { p.e += 7; p.m -= 5; p.addFlag('colonial_language_education') },
  },
  {
    id: 'cult_edu_first_gen_university',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 17 && G.age <= 20 && G.character.wealthTier <= 2 && (['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype)),
    text: 'No one in your family has been to university. Your father has opinions about whether it is worth the sacrifice. Your mother makes no opinions but works extra shifts. The form is complex and the fee is large and you do not know what you are supposed to know to fill it in. You ask a teacher. You apply.',
    choices: [
      { text: 'Go — you will figure it out', tag: null, outcome: 'You arrive knowing less than everyone else and learning faster. The debt is real. So is the change.', effect: (p) => { p.e += 12; p.m -= 5; p.r -= 3; p.addFlag('first_gen_university') } },
      { text: 'Decide the sacrifice is too much for the family', tag: null, outcome: 'You take a job. You watch other people leave for the city. You are certain you made the right choice and not certain at all.', effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('education_deferred') } },
    ],
    effect: null,
  },
  {
    id: 'cult_edu_factory_apprentice',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.currentYear >= 1955 && G.currentYear <= 1985 && G.age >= 15 && G.age <= 17 && ['wealthy_west', 'post_soviet'].includes(G.character.country.archetype) && G.character.wealthTier <= 2,
    text: 'There is a choice at fifteen: stay in school or take the apprenticeship at the factory or the trade. Most of the boys from your street are doing the trade. The pay starts immediately. University is for people who aren\'t sure yet what the world is.',
    choices: [
      { text: 'Take the apprenticeship — real work, real money', tag: null, outcome: 'You learn to do something with your hands that is always needed. The money is steady for twenty years.', effect: (p) => { p.w += 8; p.e += 5; p.addFlag('trade_apprentice') } },
      { text: 'Stay in school — you want something different', tag: null, outcome: 'You are in the minority. Some of the teachers notice. The path is longer and less certain.', effect: (p) => { p.e += 8; p.m -= 4; p.addFlag('academic_track') } },
    ],
    effect: null,
  },
  {
    id: 'cult_edu_religious_school',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1950 && G.currentYear <= 2010 && G.age >= 6 && G.age <= 14 && ['theocracy'].includes(G.regime) && G.character.familyStability !== 'unstable',
    text: 'The school day begins with prayer and ends with prayer and in between the subjects are filtered through religion. History, biology, literature — each has a correct view that the text confirms. You learn to hold two versions of knowledge: what the school says and what you privately suspect. The gap between them is something you manage quietly.',
    choices: null,
    effect: (p) => { p.e += 4; p.m -= 4; p.addFlag('religious_education') },
  },
  {
    id: 'cult_edu_segregated_school',
    phase: 'childhood',
    weight: 2,
    when: (G) => isDisadvantaged(G) && G.currentYear >= 1950 && G.currentYear <= 1980 && G.age >= 6 && G.age <= 14 && G.character.country.name !== 'South Africa',
    text: 'The school for children like you has fewer books. The building is older. The teacher has more students in the class. This is not stated anywhere officially as a reason. You notice the difference when you visit a cousin in a different district. The equipment in that school is newer.',
    choices: null,
    effect: (p) => { p.e -= 5; p.m -= 6; p.r += 5; p.addFlag('educational_inequality') },
  },
  {
    id: 'cult_edu_no_girls_school',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.gender === 'female' && G.currentYear >= 1960 && G.currentYear <= 2000 && G.age >= 10 && G.age <= 14 && G.character.country.literacyFemale < 0.7,
    text: 'Your brother goes to school. The question of whether you go is a discussion. Your mother says yes. Your father is not certain. The answer depends on things you are not part of — the family\'s finances, what the neighbors do, whether the school is close enough to walk without incident. The answer is eventually no.',
    choices: null,
    effect: (p) => { p.e -= 8; p.m -= 10; p.r += 8; p.addFlag('education_denied_gender') },
  },
]

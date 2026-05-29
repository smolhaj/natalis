// Country-specific historical arc events — BUILD 10
// Nigeria, India, South Korea, Egypt, Romania, Turkey, Kenya, Ghana, Ethiopia
// Each event is anchored to a specific country, era, and lived perspective.

export const COUNTRY_ARC_EVENTS = [

  // ── NIGERIA ───────────────────────────────────────────────────────────────

  {
    id: 'ca_nigeria_coup_radio',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'Nigeria' && G.currentYear >= 1966 && G.currentYear <= 1985 && !G.mem?.nigeriaCoupRadio,
    text: 'You know something has happened before anyone tells you. The radio is playing martial music — slow, without words. The adults go quiet in a particular way. Then the announcement comes. Another coup. You count this one. You have stopped expecting this to be the last.',
    choices: [
      { text: 'Ask your father what it means', tag: null, outcome: 'He puts a hand on your shoulder. "It means things will be different for a while," he says. He does not say how different, or for how long.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('nigeriaCoupRadio', true); p.addFlag('coup_generation'); } },
      { text: 'Say nothing — you already understand', tag: null, outcome: 'You have learned what the music means. You go back to what you were doing. Adults call this resilience. You call it Tuesday.', effect: (p) => { p.m -= 3; p.setMem('nigeriaCoupRadio', true); p.addFlag('coup_generation'); p.addFlag('learned_silence'); } },
    ],
  },

  {
    id: 'ca_nigeria_first_gen_degree',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Nigeria' && G.education?.level === 'university' && G.currentYear >= 1965 && G.currentYear <= 1990 && !G.mem?.nigeriaFirstGenDegree,
    text: 'You are the first in your family to hold a university degree. At the graduation ceremony, your father sits in the back row in a suit borrowed from a cousin. On the drive home he does not speak for twenty minutes. Then he says: "Your grandfather could not read." You are not sure what to say to that.',
    choices: [
      { text: 'Tell him you will not forget where you came from', tag: null, outcome: 'He nods. You both know this is more complicated than a promise, but the promise is still necessary.', effect: (p) => { p.m += 8; p.karma += 5; p.setMem('nigeriaFirstGenDegree', true); p.addFlag('first_gen_graduate'); } },
      { text: 'Say nothing — the silence is enough', tag: null, outcome: 'The distance the degree creates is real. So is the connection. Both can be true at the same time.', effect: (p) => { p.m += 5; p.r += 5; p.setMem('nigeriaFirstGenDegree', true); p.addFlag('first_gen_graduate'); } },
    ],
  },

  {
    id: 'ca_nigeria_biafra_colleague',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.country.name === 'Nigeria' && G.currentYear >= 1971 && G.currentYear <= 1978 && G.career && !G.mem?.nigeriaBiafraColleague,
    text: 'An Igbo colleague returned to work last month after three years away. Nobody mentions where he was. You share a corridor. You have known each other since before. The war that officially ended — "no victor, no vanquished" — occupies the space between you in a way that nobody has found words for yet.',
    choices: [
      { text: 'Acknowledge it — ask how he is', tag: null, outcome: 'He looks at you for a moment, as if calculating. Then: "I am here." That is all, and it is enough.', effect: (p) => { p.m += 6; p.s += 4; p.karma += 5; p.setMem('nigeriaBiafraColleague', true); } },
      { text: 'Follow the unspoken rule — say nothing', tag: null, outcome: 'You nod. He nods. Work continues. The silence has its own logic, its own mercy.', effect: (p) => { p.m -= 4; p.r += 6; p.setMem('nigeriaBiafraColleague', true); } },
    ],
  },

  // ── INDIA ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_india_emergency_curfew',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'India' && G.currentYear >= 1975 && G.currentYear <= 1977 && !G.mem?.indiaEmergencyCurfew,
    text: 'The Emergency has been declared. The press is censored. A colleague at work has been arrested. You do not know exactly what he said, only that he said it to the wrong person. You go to work. You eat your lunch. You say the things that are safe to say, at the volume appropriate for saying them.',
    choices: [
      { text: 'Write down what you really think — in a journal, hidden', tag: null, outcome: 'You fill three exercise books. You keep them inside a bag of rice. This feels absurd. You do it anyway.', effect: (p) => { p.e += 6; p.r += 5; p.setMem('indiaEmergencyCurfew', true); p.addFlag('dissident_reader'); p.addFlag('emergency_generation'); } },
      { text: 'Keep your head down — this will pass', tag: null, outcome: 'You tell yourself it will not last forever. It lasts two years. When it ends, you count which opinions you still hold and which you have simply forgotten how to have.', effect: (p) => { p.m -= 6; p.r += 8; p.setMem('indiaEmergencyCurfew', true); p.addFlag('emergency_generation'); p.addFlag('learned_silence'); } },
    ],
  },

  {
    id: 'ca_india_iit_pressure',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.character.country.name === 'India' && G.stats.smarts >= 60 && G.currentYear >= 1970 && !G.mem?.indiaIITPressure,
    text: 'Your parents have been saying the word "IIT" since you were eight years old. It is not a school; it is a destiny, an obligation, a way to justify everything the family has invested in you. The entrance exam accepts less than two percent. Your coaching classes run six days a week. You dream in equations.',
    choices: [
      { text: 'Commit to it — you want this too', tag: null, outcome: 'You want it and resent the wanting. Both are real. You study. The exam arrives like something you have been fighting for years without knowing whether you wanted to win.', effect: (p) => { p.e += 8; p.m -= 6; p.r += 5; p.setMem('indiaIITPressure', true); p.addFlag('academic_pressure'); } },
      { text: 'Tell your father you want something else', tag: null, outcome: 'The silence that follows is very specific. You have not rejected a school. You have rejected a plan that was made before you existed.', effect: (p) => { p.m -= 10; p.e += 4; p.s += 3; p.r += 8; p.setMem('indiaIITPressure', true); } },
    ],
  },

  {
    id: 'ca_india_green_revolution',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'India' && G.ruralUrban === 'rural' && G.currentYear >= 1965 && G.currentYear <= 1978 && !G.mem?.indiaGreenRevolution,
    text: 'The new wheat variety changes everything in three seasons. Your father borrows money for a pump and a bag of HYV seeds. The harvest is three times what it was before. He pays back the loan in the first year and builds an extra room. The word "surplus" is new in this household.',
    choices: [
      { text: 'Watch the transformation — it feels like possibility', tag: null, outcome: 'Your father sends your brother to school in the district town. Something that was impossible is now happening.', effect: (p) => { p.m += 10; p.w += 6; p.setMem('indiaGreenRevolution', true); p.addFlag('green_revolution_family'); } },
      { text: 'Notice the neighbours who cannot afford the seeds', tag: null, outcome: 'Some families in the village cannot get the credit. Their fields look the same. The gap is new.', effect: (p) => { p.m += 5; p.e += 4; p.karma += 3; p.setMem('indiaGreenRevolution', true); p.addFlag('green_revolution_family'); } },
    ],
  },

  // ── EGYPT ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_egypt_1967_morning_after',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Egypt' && G.currentYear >= 1967 && G.currentYear <= 1970 && !G.mem?.egypt1967After,
    text: 'The radio had said they were winning. Then they had lost. In six days. You go to work the morning after. Nobody says the word "Israel." Nobody says the word "defeat." The silence is specific and has weight. You remember believing what the radio said and you do not know what to do with the fact of having believed it.',
    choices: [
      { text: 'Talk to colleagues — share the disillusionment', tag: null, outcome: 'Someone says very quietly: "The radio lied." Nobody responds. The statement stands in the room for a while and then everyone goes back to work.', effect: (p) => { p.m -= 10; p.e += 5; p.r += 6; p.setMem('egypt1967After', true); p.addFlag('1967_generation'); } },
      { text: 'Hold it privately — the disillusionment is too large to speak', tag: null, outcome: 'You carry it for years. The gap between what the state says and what is true is something you cannot un-learn.', effect: (p) => { p.m -= 12; p.r += 8; p.setMem('egypt1967After', true); p.addFlag('1967_generation'); p.addFlag('learned_silence'); } },
    ],
  },

  {
    id: 'ca_egypt_nasser_death',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.country.name === 'Egypt' && G.currentYear === 1970 && !G.mem?.egyptNasserDeath,
    text: 'Nasser dies at 52 from a heart attack. Millions pour into the streets of Cairo for the funeral — spontaneously, without announcement. You are among them or you watch from a window. The mourning is real. You mourn him even while understanding, or beginning to understand, that the project he represented ended three years ago in the Sinai.',
    choices: [
      { text: 'Join the crowds — the grief is genuine', tag: null, outcome: 'You push through streets you cannot see the end of. Whatever he was, he was something, and the something is gone.', effect: (p) => { p.m -= 10; p.karma += 4; p.setMem('egyptNasserDeath', true); p.addFlag('1967_generation'); } },
      { text: 'Watch from a distance — grief and clarity can coexist', tag: null, outcome: 'You feel both. The project failed and you loved the man who led it. These are not contradictions — they are just what it is to have believed in something.', effect: (p) => { p.m -= 8; p.e += 5; p.r += 4; p.setMem('egyptNasserDeath', true); } },
    ],
  },

  // ── ROMANIA ───────────────────────────────────────────────────────────────

  {
    id: 'ca_romania_securitate_neighbour',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Romania' && G.currentYear >= 1965 && G.currentYear <= 1989 && !G.mem?.romaniaSecuritateNeighbour,
    text: 'The neighbour across the hall has been asking too many questions about your work, your visitors, your opinions on things you would not normally discuss with a neighbour. The Securitate employed one informer per 23 citizens. You do the math. You change which things you say on the stairs.',
    choices: [
      { text: 'Engage carefully — keep them close enough to manage', tag: null, outcome: 'You tell them small true things and larger untrue ones. You become expert at the grammar of managed revelation.', effect: (p) => { p.m -= 6; p.e += 5; p.s += 3; p.setMem('romaniaSecuritateNeighbour', true); p.addFlag('learned_silence'); p.addFlag('authoritarian_childhood'); } },
      { text: 'Withdraw entirely — say nothing to anyone', tag: null, outcome: 'The isolation is its own cost. You become very good at being alone.', effect: (p) => { p.m -= 10; p.r += 8; p.setMem('romaniaSecuritateNeighbour', true); p.addFlag('learned_silence'); } },
    ],
  },

  {
    id: 'ca_romania_systematisation',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character.country.name === 'Romania' && G.currentYear >= 1985 && G.currentYear <= 1989 && G.ruralUrban !== 'urban' && !G.mem?.romaniaSyst,
    text: 'Ceaușescu\'s systematisation programme is demolishing villages and moving people to apartment blocks in designated "agro-industrial centres." The village your grandmother was born in is on the list. You do not know what to do with this information, because there is nothing to do with it.',
    choices: [
      { text: 'Document what the village looked like before it goes', tag: null, outcome: 'You take photographs with a borrowed camera. You do not know why exactly. Preservation as a form of protest that doesn\'t risk arrest.', effect: (p) => { p.e += 5; p.karma += 4; p.r += 6; p.setMem('romaniaSyst', true); p.addFlag('regime_self_censorship'); } },
      { text: 'Accept it — resistance is impossible', tag: null, outcome: 'You tell yourself this. You do not entirely believe yourself.', effect: (p) => { p.m -= 8; p.r += 10; p.setMem('romaniaSyst', true); p.addFlag('learned_silence'); } },
    ],
  },

  {
    id: 'ca_romania_ceausescu_fall',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Romania' && G.currentYear === 1989 && !G.mem?.romaniaCeausescuFall,
    text: 'December 21st. The broadcast from the Central Committee balcony begins normally. Then someone boos. In twenty-four years of this, nobody has ever booed. The camera pulls back. Ceaușescu looks confused — he does not know what to do with a crowd that has stopped performing. Neither does anyone else. Everything that follows follows from that boo.',
    choices: [
      { text: 'Go into the streets — this is it', tag: null, outcome: 'You are in the crowd when the army sides with the protesters. On Christmas Day you watch the execution on television. You feel things you do not have names for.', effect: (p) => { p.m += 8; p.karma += 6; p.setMem('romaniaCeausescuFall', true); p.addFlag('revolution_generation'); } },
      { text: 'Stay inside — you have seen how these things can turn', tag: null, outcome: 'You watch from the window. The army defects anyway. You come out three days later into a different country.', effect: (p) => { p.m += 4; p.setMem('romaniaCeausescuFall', true); p.addFlag('revolution_generation'); } },
    ],
  },

  // ── TURKEY ────────────────────────────────────────────────────────────────

  {
    id: 'ca_turkey_coup_calibration',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Turkey' && G.currentYear >= 1960 && G.currentYear <= 1995 && G.flags.includes('coup_generation') && !G.mem?.turkeyCoupCalib,
    text: 'This is the second coup you have lived through. Or the third. You have stopped keeping count in the way you would keep count of exceptional events. It is now part of the background knowledge you carry: when the radio plays military music, you know what to do and what not to say for the next several months.',
    choices: [
      { text: 'Continue with your life — practical adaptation is not surrender', tag: null, outcome: 'You have built a life between coups. Most of it continues. The interruptions are real but not total.', effect: (p) => { p.m -= 5; p.setMem('turkeyCoupCalib', true); p.addFlag('coup_generation'); } },
      { text: 'Decide this cannot keep happening', tag: null, outcome: 'You become involved in the democracy movement. This costs you things and opens other things.', effect: (p) => { p.m -= 4; p.e += 6; p.karma += 5; p.setMem('turkeyCoupCalib', true); p.addFlag('democracy_movement'); p.addFlag('political_active'); } },
    ],
  },

  // ── KENYA ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_kenya_moi_institution',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Kenya' && G.currentYear >= 1980 && G.currentYear <= 2002 && G.career && !G.mem?.kenyaMoiInstitution,
    text: 'You work in a government institution. The procurement process that was straightforward five years ago now requires a signature from someone who requires a signature from someone. Each signature has a cost — not official, not written, but understood. The institution around you is being hollowed out and everyone who works in it knows it.',
    choices: [
      { text: 'Participate — you need your salary', tag: null, outcome: 'You tell yourself it is small. It is small. You tell yourself it will not become larger. It becomes larger.', effect: (p) => { p.m += 3; p.r += 10; p.karma -= 6; p.setMem('kenyaMoiInstitution', true); p.addFlag('institutional_corruption'); } },
      { text: 'Refuse and find another way', tag: null, outcome: 'The alternative path is slower and harder and you earn less. You keep your record clean. Whether this was worth it is a question you will answer differently at different ages.', effect: (p) => { p.m -= 5; p.karma += 8; p.r += 4; p.setMem('kenyaMoiInstitution', true); } },
    ],
  },

  {
    id: 'ca_kenya_nairobi_middle_class',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Kenya' && G.currentYear >= 1970 && G.currentYear <= 1990 && G.stats.wealth >= 50 && G.ruralUrban !== 'rural' && !G.mem?.kenyaNairobiMC,
    text: 'Nairobi in the 1970s is East Africa\'s capital in more than name. Embassies, airlines, the UN\'s African headquarters. You work in a building with a lift that works. Your colleagues are Kikuyu, Luo, Luhya, Asian-Kenyan — the city holds a variety that the village you came from did not. The ethnic calculations are present but so is the possibility of a day when they matter less.',
    choices: [
      { text: 'Build across tribal lines deliberately', tag: null, outcome: 'You cultivate friendships across the lines your parents observed. Some take. Some don\'t. You do not regret the attempt.', effect: (p) => { p.m += 8; p.s += 6; p.karma += 5; p.setMem('kenyaNairobiMC', true); } },
      { text: 'Navigate them practically — they are real', tag: null, outcome: 'You know which colleagues to approach for which things. This knowledge is not cynicism; it is reading a room accurately.', effect: (p) => { p.m += 5; p.e += 4; p.setMem('kenyaNairobiMC', true); } },
    ],
  },

  // ── GHANA ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_ghana_independence_child',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'Ghana' && G.currentYear >= 1957 && G.currentYear <= 1962 && !G.mem?.ghanaIndependenceChild,
    text: 'You are a child when independence arrives, which means you inherit it without choosing it, which means you will spend your whole life understanding what it means. Your teacher says: for the first time, this is your country. You repeat this at home. Your grandmother nods. She is quiet in a way that contains more than it shows.',
    choices: [
      { text: 'Ask your grandmother what she thinks', tag: null, outcome: 'She says: "We will see." She has seen colonialism come in and she knows that naming things does not immediately change them. She is right and she is also wrong in ways that will take decades to measure.', effect: (p) => { p.m += 8; p.e += 5; p.setMem('ghanaIndependenceChild', true); p.addFlag('independence_generation'); } },
      { text: 'Just feel the pride — it is enough for now', tag: null, outcome: 'The flag. The anthem. The name that is now yours. This is enough for a child.', effect: (p) => { p.m += 12; p.setMem('ghanaIndependenceChild', true); p.addFlag('independence_generation'); } },
    ],
  },

  {
    id: 'ca_ghana_nkrumah_schooling',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'Ghana' && G.currentYear >= 1957 && G.currentYear <= 1966 && !G.mem?.ghanaNkrumahSchool,
    text: 'Under Nkrumah\'s education programme, your school is free. Your father mentions this specifically: that his father paid a fee and he was still taken out of school at twelve, and that you will go as long as you can go. The school has too few textbooks but it is there. That someone decided it should be there is something your father does not let you forget.',
    choices: [
      { text: 'Understand what this means — take it seriously', tag: null, outcome: 'You take it seriously. The textbook shortage is real. So is the fact that you are there.', effect: (p) => { p.e += 8; p.m += 5; p.setMem('ghanaNkrumahSchool', true); p.addFlag('first_gen_secondary'); } },
      { text: 'Resent the conditions — the books should be there', tag: null, outcome: 'Both things can be true: it is an achievement and it is not enough. You carry this tension for years.', effect: (p) => { p.e += 5; p.m += 3; p.r += 4; p.setMem('ghanaNkrumahSchool', true); p.addFlag('first_gen_secondary'); } },
    ],
  },

  {
    id: 'ca_ghana_1966_aftermath',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Ghana' && G.currentYear >= 1966 && G.currentYear <= 1972 && G.flags.includes('independence_generation') && !G.mem?.ghanaAfterCoup,
    text: 'The coup that removed Nkrumah happened while you were in secondary school. You understood what independence was supposed to mean. The word "coup" arrives nine years later. You are old enough now to hold both: what was promised and what happened. They do not resolve.',
    choices: [
      { text: 'Understand that independence was the start, not the end', tag: null, outcome: 'The project is longer than one person. You decide this. It takes years to believe it.', effect: (p) => { p.e += 6; p.m -= 5; p.r += 6; p.setMem('ghanaAfterCoup', true); p.addFlag('coup_generation'); } },
      { text: 'Feel the specific grief of the promise broken', tag: null, outcome: 'You grieve. Not for Nkrumah specifically but for the particular feeling of 1957, which will not come again.', effect: (p) => { p.m -= 10; p.r += 10; p.e += 4; p.setMem('ghanaAfterCoup', true); p.addFlag('coup_generation'); } },
    ],
  },

  // ── ETHIOPIA ──────────────────────────────────────────────────────────────

  {
    id: 'ca_ethiopia_derg_student',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'Ethiopia' && G.currentYear >= 1975 && G.currentYear <= 1980 && G.stats.smarts >= 50 && !G.mem?.ethiopiaDergStudent,
    text: 'You are a student at Addis Ababa University when the Derg consolidates power. The leftist student movements that helped bring down Haile Selassie have now been declared enemies of the revolution. Colleagues who organised three years ago are now in danger from the government they helped create. You recognise this pattern and know you cannot say you recognise it.',
    choices: [
      { text: 'Go quietly — survive this period', tag: null, outcome: 'You finish your degree by attracting no attention. You keep a list of people who disappear. You tell no one you keep the list.', effect: (p) => { p.m -= 12; p.r += 8; p.setMem('ethiopiaDergStudent', true); p.addFlag('red_terror_generation'); p.addFlag('learned_silence'); } },
      { text: 'Consider leaving Ethiopia', tag: null, outcome: 'The brain drain of this period is real: doctors, engineers, teachers, academics — anyone the regime can name as an intellectual. You think about your options.', effect: (p) => { p.m -= 8; p.e += 4; p.setMem('ethiopiaDergStudent', true); p.addFlag('red_terror_generation'); p.addFlag('considered_emigration'); } },
    ],
  },

  {
    id: 'ca_ethiopia_famine_knowledge',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Ethiopia' && G.currentYear >= 1984 && G.currentYear <= 1986 && !G.mem?.ethiopiaFamine84,
    text: 'The famine is worst in Tigray and Wollo. The television images that reach the rest of the world are not the images you receive. What you receive is: grain quotas enforced in villages that are already empty. Aid blocked to rebel areas. The government calling it a security situation. You know people there. You know what it is.',
    choices: [
      { text: 'Try to send something — money, food, anything', tag: null, outcome: 'The channels are closed to the rebel areas. What you send reaches some people and not others. The impossibility of helping fully does not make partial help meaningless.', effect: (p) => { p.m -= 8; p.mo -= 200; p.karma += 8; p.setMem('ethiopiaFamine84', true); p.addFlag('famine_witness'); } },
      { text: 'Document what you know — tell people outside', tag: null, outcome: 'You write letters to organisations, journalists, anyone who might listen. Some listen. The government notices people who are writing letters like this.', effect: (p) => { p.m -= 6; p.r += 6; p.karma += 6; p.setMem('ethiopiaFamine84', true); p.addFlag('famine_witness'); p.addFlag('dissident_reader'); } },
    ],
  },

  // ── SOUTH KOREA ───────────────────────────────────────────────────────────

  {
    id: 'ca_sk_korean_war_displacement',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'South Korea' && G.currentYear >= 1950 && G.currentYear <= 1954 && !G.mem?.skKoreanWarDisplace,
    text: 'The front moves twice across the peninsula. Your family moves twice — south with the UN advance, then back north with the Chinese. You carry what fits in a bundle. The house you come from may or may not exist when this is over. You are too young to understand the geography. You understand the bundle.',
    choices: [
      { text: 'Remember the bundle — what was in it matters', tag: null, outcome: 'You carry one thing that did not need to be carried — a small object of no practical value. Later in life you will not be able to explain why you kept it.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('skKoreanWarDisplace', true); p.addFlag('war_childhood'); } },
      { text: 'Forget it — survival is what matters', tag: null, outcome: 'You adapt. This is what children do. The adaptability costs something you will only recognise later.', effect: (p) => { p.m -= 5; p.setMem('skKoreanWarDisplace', true); p.addFlag('war_childhood'); } },
    ],
  },

  {
    id: 'ca_sk_exam_pressure',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.character.country.name === 'South Korea' && G.currentYear >= 1960 && !G.mem?.skExamPressure,
    text: 'The Suneung determines your university and your university determines your life. You have known this since you were old enough to know anything. The study hall is open until midnight. Your mother brings food at nine. The other students eat without looking up. In this room, the Korean miracle requires something from each of you.',
    choices: [
      { text: 'Give everything — this is your chance', tag: null, outcome: 'You study until your vision blurs. Whether this is discipline or damage depends on what you get and what it costs you.', effect: (p) => { p.e += 10; p.m -= 8; p.h -= 4; p.setMem('skExamPressure', true); p.addFlag('academic_pressure'); p.addFlag('korean_miracle_generation'); } },
      { text: 'Find your own pace — burn out serves no one', tag: null, outcome: 'You sleep eight hours. Your classmates call this reckless. Your score is what it is.', effect: (p) => { p.e += 5; p.m -= 2; p.setMem('skExamPressure', true); p.addFlag('academic_pressure'); } },
    ],
  },

  {
    id: 'ca_sk_military_service',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'South Korea' && G.character.gender === 'male' && G.age >= 19 && G.age <= 22 && !G.mem?.skMilitaryService,
    text: 'Military service is mandatory. Two years, give or take. You report to the induction centre and your head is shaved. The colleague at your future job is holding your position. This is normal. Everybody knows this is normal. The DMZ is ninety kilometres from Seoul and has been there your entire life.',
    choices: [
      { text: 'Serve well — this is part of who you are', tag: null, outcome: 'Two years. You come back with your body changed and an understanding of hierarchy that stays with you in every room you enter after this.', effect: (p) => { p.h += 5; p.m -= 6; p.s += 3; p.setMem('skMilitaryService', true); p.addFlag('military_service_korea'); } },
      { text: 'Endure it — you already know who you are without it', tag: null, outcome: 'Two years. You come back. The years pass more slowly than the years around them, which is how it is.', effect: (p) => { p.m -= 8; p.h += 3; p.r += 4; p.setMem('skMilitaryService', true); p.addFlag('military_service_korea'); } },
    ],
  },

]

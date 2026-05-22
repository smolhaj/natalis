export const HISTORICAL_EVENTS = [

  // ── RWANDAN GENOCIDE (1994) ─────────────────────────────────────────────────

  {
    id: 'hist_rwanda_tension_1990',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.name === 'Rwanda' && G.currentYear >= 1990 && G.currentYear <= 1993 && G.age >= 8 && !G.mem?.rwanda_tension,
    text: (G) => `Soldiers pass through the village more often now. The radio uses words — Inyenzi, inzoka — that the adults around you suddenly lower their voices after. ${G.character.ethnicity === 'tutsi' ? 'Your father tells you not to carry your ID card visibly.' : 'A Tutsi neighbour\'s house has a stone thrown through the window.'}`,
    choices: [
      { text: 'Ask your parents what is happening', tag: null, outcome: 'They tell you not to worry. Their faces say something different.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('rwanda_tension', true) } },
      { text: 'Pretend not to notice — safer that way', tag: null, outcome: 'You learn to read the air without naming what you smell. This skill will save you. This skill will cost you.', effect: (p) => { p.m -= 8; p.setMem('rwanda_tension', true) } },
    ],
  },

  {
    id: 'hist_rwanda_genocide_radio',
    phase: null,
    weight: 9,
    when: (G) => G.character.country.name === 'Rwanda' && G.currentYear === 1994 && G.age >= 5 && !G.mem?.genocide_radio,
    text: 'April 7, 1994. The president\'s plane has been shot down. Radio Mille Collines is broadcasting. The voice on the radio says the Tutsi are cockroaches and the graves are not yet full. Neighbours who smiled at you yesterday are listening.',
    choices: [
      { text: 'Stay inside — lock the door', tag: null, outcome: 'You stay very quiet for a very long time. The sounds outside are unlike anything you have heard before.', effect: (p) => { p.m -= 20; p.h -= 10; p.setMem('genocide_radio', true) } },
      { text: 'Find a way to flee', tag: null, outcome: 'You leave with almost nothing. The road is not safe. You keep moving.', effect: (p) => { p.m -= 15; p.addFlag('refugee'); p.addFlag('genocide_survivor'); p.setMem('genocide_radio', true) } },
    ],
  },

  {
    id: 'hist_rwanda_tutsi_hiding',
    phase: null,
    weight: 9,
    when: (G) => G.character.country.name === 'Rwanda' && G.character.ethnicity === 'tutsi' && G.currentYear === 1994 && G.age >= 6 && !G.mem?.tutsi_hiding,
    text: 'A Hutu neighbour hides your family in a crawl space under their floorboards. You can hear footsteps and voices above you for three days. You must not cough. You must not cry. You must not exist.',
    choices: [
      { text: 'Hold still and survive', tag: null, outcome: 'On the fourth day it is silent. You emerge into a changed world. The neighbour who hid you will never speak of it. Neither will you, for a long time.', effect: (p) => { p.m -= 25; p.h -= 15; p.karma += 10; p.addFlag('genocide_survivor'); p.setMem('tutsi_hiding', true) } },
      { text: 'Try to run — the hiding feels too dangerous', tag: null, outcome: 'Some who run make it. Some do not. The roads are being watched.', effect: (p) => { p.m -= 20; p.h -= 20; p.addFlag('genocide_survivor'); p.addFlag('refugee'); p.setMem('tutsi_hiding', true) } },
    ],
  },

  {
    id: 'hist_rwanda_hutu_pressure',
    phase: null,
    weight: 7,
    when: (G) => G.character.country.name === 'Rwanda' && G.character.ethnicity === 'hutu' && G.currentYear === 1994 && G.age >= 15 && !G.mem?.hutu_pressure,
    text: 'Men in your street form a roadblock. The leader — someone you know — puts a machete in your hand. "Everyone must do their part," he says. The man at the barrier is your former teacher\'s Tutsi brother-in-law.',
    choices: [
      { text: 'Refuse and walk away — whatever the cost', tag: null, outcome: 'They let you go with curses. You live with the terror and the small dignity of having said no.', effect: (p) => { p.m -= 20; p.h -= 10; p.karma += 20; p.setMem('hutu_pressure', true) } },
      { text: 'Comply — fear is the only honest word for it', tag: null, outcome: 'What you do cannot be undone. The man on the other side of the roadblock had a name. You carry it.', effect: (p) => { p.m -= 30; p.karma -= 30; p.r += 25; p.addFlag('carries_guilt'); p.setMem('hutu_pressure', true) } },
    ],
  },

  {
    id: 'hist_gacaca_court',
    phase: null,
    weight: 5,
    when: (G) => G.character.country.name === 'Rwanda' && G.currentYear >= 2002 && G.currentYear <= 2012 && G.age >= 16 && !G.mem?.gacaca,
    text: 'The gacaca courts meet in the open air — community justice for the genocide. You are called to testify. Either as a survivor or as someone who knows what happened in your neighbourhood.',
    choices: [
      { text: 'Tell everything you witnessed', tag: null, outcome: 'The truth, spoken aloud, does not heal the way people said it would. But it is something. It is what happened.', effect: (p) => { p.m -= 8; p.karma += 10; p.r -= 5; p.setMem('gacaca', true) } },
      { text: 'Speak carefully — protect those you must protect', tag: null, outcome: 'Some truths stay in the community. You say enough. Whether it was enough, you are never sure.', effect: (p) => { p.m -= 5; p.setMem('gacaca', true) } },
    ],
  },

  // ── APARTHEID SOUTH AFRICA ──────────────────────────────────────────────────

  {
    id: 'hist_apartheid_pass_book',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.name === 'South Africa' && G.character.ethnicity === 'black_south_african' && G.currentYear >= 1950 && G.currentYear <= 1990 && G.age >= 16 && !G.mem?.pass_book,
    text: 'A white policeman stops you on the street. He demands your pass book. Every Black South African must carry this document at all times proving they have permission to be in a white area. You pat your pockets.',
    choices: [
      { text: 'Produce the book — you have it', tag: null, outcome: 'He scrutinises it slowly. He says nothing. He hands it back. You are shaking when he walks away.', effect: (p) => { p.m -= 10; p.setMem('pass_book', true) } },
      { text: 'You forgot it — endure the arrest', tag: null, outcome: 'Night in a holding cell. Your family doesn\'t know where you are until morning. The fine you can barely pay.', effect: (p) => { p.m -= 20; p.h -= 5; p.setMem('pass_book', true) } },
    ],
  },

  {
    id: 'hist_apartheid_bantu_education',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.character.country.name === 'South Africa' && G.character.ethnicity === 'black_south_african' && G.currentYear >= 1953 && G.currentYear <= 1979 && G.age >= 8 && G.age <= 16 && !G.mem?.bantu_education,
    text: 'Your school teaches a curriculum designed by the apartheid government. Less mathematics, less science, less critical thinking — enough to produce labourers, not leaders. Your teacher tells you this, quietly. He was educated before the Act.',
    choices: [
      { text: 'Study beyond the curriculum on your own', tag: null, outcome: 'You borrow books. You find teachers outside school. The system cannot contain everything you intend to become.', effect: (p) => { p.e += 8; p.m -= 3; p.setMem('bantu_education', true) } },
      { text: 'Accept what is given — survive the system', tag: null, outcome: 'You get through. The ceiling is lower than it should be. You will feel it every time you try to stand.', effect: (p) => { p.e -= 4; p.setMem('bantu_education', true) } },
    ],
  },

  {
    id: 'hist_soweto_uprising',
    phase: null,
    weight: 7,
    when: (G) => G.character.country.name === 'South Africa' && G.character.ethnicity === 'black_south_african' && G.currentYear === 1976 && G.age >= 12 && G.age <= 22 && !G.mem?.soweto,
    text: 'June 16, 1976. Students march against being taught in Afrikaans — the language of the oppressor. The police open fire. Hector Pieterson is carried through the streets in a photograph that will be seen around the world. You are in the street.',
    choices: [
      { text: 'March — this is your fight', tag: 'activist', outcome: 'You are tear-gassed and scattered. Someone near you is shot. You run. The world has changed in ways you don\'t yet understand.', effect: (p) => { p.m -= 10; p.h -= 8; p.s += 5; p.karma += 8; p.addFlag('activist'); p.setMem('soweto', true) } },
      { text: 'Stay off the streets — survival first', tag: null, outcome: 'From your window you hear the shots. The guilt of safety sits heavy.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('soweto', true) } },
    ],
  },

  {
    id: 'hist_apartheid_election_1994',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.name === 'South Africa' && G.currentYear === 1994 && G.age >= 18 && !G.mem?.election_1994,
    text: (G) => `April 27, 1994. You queue to vote for the first time. The line stretches for miles. ${G.character.ethnicity === 'black_south_african' ? 'You have never been allowed to vote before. You are forty-two years old.' : G.character.ethnicity === 'white_south_african' ? 'The country you knew is being voted away. You are also voting. You\'re not sure how you feel.' : 'You vote. The country holds its breath.'}`,
    choices: [
      { text: 'Wait the full day — nothing could make you leave', tag: null, outcome: 'Seven hours in the heat. You cast your vote. You weep on the way home and don\'t know why it surprises you.', effect: (p) => { p.m += 20; p.karma += 10; p.setMem('election_1994', true) } },
    ],
  },

  // ── US CIVIL RIGHTS / JIM CROW ──────────────────────────────────────────────

  {
    id: 'hist_segregated_school',
    phase: 'childhood',
    weight: 8,
    when: (G) => G.character.country.name === 'United States' && G.character.ethnicity === 'black_american' && G.currentYear >= 1950 && G.currentYear <= 1970 && G.age >= 6 && G.age <= 16 && !G.mem?.segregated_school,
    text: (G) => `Your school is for Negro children only. It has fewer books, older desks, and a building that has been in disrepair since before you were born. The white school two miles away has a gymnasium. ${G.currentYear >= 1954 ? 'Brown v. Board said this is illegal. The school board disagrees in practice.' : 'This is simply how things are.'}`,
    choices: [
      { text: 'Focus on learning regardless', tag: null, outcome: 'Your teacher, who holds two degrees and earns a third of what white teachers make, gives you everything she has. You take it.', effect: (p) => { p.e += 8; p.m -= 5; p.setMem('segregated_school', true) } },
      { text: 'Rage at the injustice of it', tag: 'activist', outcome: 'The anger becomes fuel. You learn to read it as information. Later, you will know what to do with it.', effect: (p) => { p.e += 5; p.m -= 8; p.addFlag('activist'); p.setMem('segregated_school', true) } },
    ],
  },

  {
    id: 'hist_sundown_town',
    phase: 'teens',
    weight: 6,
    when: (G) => G.character.country.name === 'United States' && G.character.ethnicity === 'black_american' && G.currentYear >= 1950 && G.currentYear <= 1968 && G.age >= 12 && !G.mem?.sundown_town,
    text: 'You pass through a town on your way somewhere. A white man on the sidewalk catches your eye and nods at the sign: SUNDOWN TOWN. You have fifteen minutes before dark. His nod is not friendly. It is a warning.',
    choices: [
      { text: 'Leave immediately', tag: null, outcome: 'You walk fast and don\'t look back until the town is behind you. You calculate this route differently from now on.', effect: (p) => { p.m -= 12; p.setMem('sundown_town', true) } },
    ],
  },

  {
    id: 'hist_civil_rights_march',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'United States' && G.character.ethnicity === 'black_american' && G.currentYear >= 1960 && G.currentYear <= 1968 && G.age >= 18 && G.age <= 35 && !G.mem?.civil_rights_march,
    text: 'The movement is building. There is a march. There will be police and possibly worse. There are also people — thousands of them — who believe that what is wrong can be made right by the weight of bodies in the street.',
    choices: [
      { text: 'March', tag: 'activist', outcome: 'You are hit with a club. You do not move. The photographs are shown around the world. Things change — not enough, but something.', effect: (p) => { p.m += 5; p.h -= 10; p.s += 8; p.karma += 10; p.addFlag('activist'); p.setMem('civil_rights_march', true) } },
      { text: 'Support from behind the scenes — donations, housing organizers', tag: null, outcome: 'The movement needs all kinds of courage. You provide the kind that doesn\'t end up in photographs.', effect: (p) => { p.m += 3; p.karma += 5; p.setMem('civil_rights_march', true) } },
      { text: 'Stay home — the risk is too great', tag: null, outcome: 'You watch the news. You feel both safe and ashamed, in roughly equal measure.', effect: (p) => { p.m -= 5; p.r += 8; p.setMem('civil_rights_march', true) } },
    ],
  },

  {
    id: 'hist_redlining',
    phase: 'adult',
    weight: 5,
    when: (G) => G.character.country.name === 'United States' && G.character.ethnicity === 'black_american' && G.currentYear >= 1950 && G.currentYear <= 1975 && G.age >= 25 && G.age <= 45 && !G.mem?.redlining,
    text: 'You have saved enough for a down payment. The bank loan officer is polite. He tells you the property you want is in a "transitional" neighbourhood and the bank cannot approve the loan. The neighbourhood is where white families live.',
    choices: [
      { text: 'Accept the answer and buy elsewhere', tag: null, outcome: 'You buy in the only place they will let you. The home appreciates more slowly. The wealth gap widens with each generation.', effect: (p) => { p.m -= 10; p.r += 8; p.setMem('redlining', true) } },
      { text: 'Fight it — file a complaint, get a lawyer', tag: null, outcome: 'The fight takes two years. You lose, technically, but the bank knows you are watching. You buy elsewhere anyway, but with dignity intact.', effect: (p) => { p.m -= 8; p.e += 5; p.karma += 5; p.setMem('redlining', true) } },
    ],
  },

  // ── SOVIET UNION / COMMUNIST ERA ────────────────────────────────────────────

  {
    id: 'hist_soviet_party_pressure',
    phase: 'young_adult',
    weight: 7,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.currentYear >= 1950 && G.currentYear <= 1989 && G.age >= 18 && G.age <= 35 && !G.mem?.party_pressure,
    text: 'Your supervisor tells you that joining the Party would be "beneficial for your career." He says it with a smile that means something else entirely.',
    choices: [
      { text: 'Join — you need the career advancement', tag: null, outcome: 'The meetings are dull. The ideology is something you perform. The advancement is real.', effect: (p) => { p.m -= 5; p.w += 8; p.addFlag('party_member'); p.setMem('party_pressure', true) } },
      { text: 'Decline politely', tag: null, outcome: 'The next promotion goes to a colleague. The one after that. You will never be in the inner circle.', effect: (p) => { p.m -= 3; p.e += 5; p.karma += 5; p.setMem('party_pressure', true) } },
    ],
  },

  {
    id: 'hist_kgb_informer',
    phase: 'adult',
    weight: 5,
    when: (G) => ['Russia', 'Ukraine', 'Kazakhstan', 'Georgia', 'Belarus'].includes(G.character.country.name) && G.currentYear >= 1955 && G.currentYear <= 1989 && G.age >= 20 && !G.mem?.kgb_contact,
    text: 'A man in a grey suit visits your workplace. He is not from your workplace. He asks questions about a colleague — about their beliefs, their friends, their habits. Then he asks if you would like to be useful to the state.',
    choices: [
      { text: 'Cooperate — better them than you', tag: null, outcome: 'You give him what he wants. Your colleague is reassigned to somewhere distant and cold. You don\'t ask where.', effect: (p) => { p.m -= 15; p.karma -= 15; p.r += 10; p.addFlag('informer'); p.setMem('kgb_contact', true) } },
      { text: 'Refuse — say you know nothing', tag: null, outcome: 'He writes something in a small notebook and leaves. You spend three months waiting for the knock at the door. It doesn\'t come. Or it comes later.', effect: (p) => { p.m -= 10; p.karma += 10; p.setMem('kgb_contact', true) } },
    ],
  },

  {
    id: 'hist_berlin_wall_falls',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.currentYear === 1989 && G.age >= 10 && !G.mem?.berlin_wall,
    text: 'November 9, 1989. The television shows crowds on the Berlin Wall with hammers. Men and women are crossing freely for the first time in thirty years. Something that seemed permanent is ending in real time, on a screen.',
    choices: [
      { text: 'Watch in disbelief — could this really be happening?', tag: null, outcome: 'It is really happening. The world that was will not return. You are not sure yet what the world that comes next will be.', effect: (p) => { p.m += 10; p.e += 5; p.setMem('berlin_wall', true) } },
      { text: 'Feel afraid — change this large is dangerous', tag: null, outcome: 'You are right to be cautious. The transition will not be smooth. But the wall is down.', effect: (p) => { p.m += 3; p.r += 3; p.setMem('berlin_wall', true) } },
    ],
  },

  {
    id: 'hist_soviet_collapse_hyperinflation',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.archetype === 'post_soviet' && G.currentYear >= 1991 && G.currentYear <= 1995 && G.age >= 18 && !G.mem?.hyperinflation,
    text: (G) => `The Soviet Union is gone. Your savings — whatever was in the bank — are now worth almost nothing. Prices double each month. The bread line is back. The state that guaranteed your job has stopped existing. You have three days of food in the apartment.`,
    choices: [
      { text: 'Adapt — find whatever work there is', tag: null, outcome: 'You sell things at the street market. You call in every favour. You survive, which is not nothing.', effect: (p) => { p.m -= 15; p.mo -= 2000; p.s += 5; p.setMem('hyperinflation', true) } },
      { text: 'Leave for a wealthier country', tag: null, outcome: 'Getting out is expensive and humiliating and the right decision. You rebuild in a new language.', effect: (p) => { p.m -= 5; p.addFlag('emigrated'); p.setMem('hyperinflation', true) } },
    ],
  },

  {
    id: 'hist_voucher_privatization',
    phase: null,
    weight: 5,
    when: (G) => ['Russia', 'Ukraine', 'Poland', 'Romania', 'Kazakhstan'].includes(G.character.country.name) && G.currentYear >= 1992 && G.currentYear <= 1998 && G.age >= 20 && !G.mem?.voucher_privatization,
    text: 'The government issues everyone a voucher — a share of formerly state-owned industry. A man at the market will buy yours for cash today, a week\'s groceries, rather than wait for dividends that may never come.',
    choices: [
      { text: 'Hold the voucher — invest it properly', tag: null, outcome: 'For some this makes them rich. For most it becomes worthless as the companies are stripped by connected insiders.', effect: (p) => { p.m += Math.random() > 0.7 ? 10 : -5; p.setMem('voucher_privatization', true) } },
      { text: 'Sell it for cash — the family needs food now', tag: null, outcome: 'You survive the winter. The man who bought your voucher becomes a millionaire in four years.', effect: (p) => { p.mo += 300; p.m += 3; p.r += 5; p.setMem('voucher_privatization', true) } },
    ],
  },

  // ── IRAN ────────────────────────────────────────────────────────────────────

  {
    id: 'hist_iran_pre_revolution',
    phase: null,
    weight: 6,
    when: (G) => G.character.country.name === 'Iran' && G.currentYear >= 1970 && G.currentYear <= 1978 && G.age >= 14 && !G.mem?.iran_modern,
    text: (G) => `${G.character.gender === 'female' ? 'You wear a miniskirt to university in Tehran. Nobody says a word.' : 'Tehran has cinemas, bars, women in Western dress.'} The Shah\'s Iran is modern and authoritarian in equal measure. The oil money is real. The SAVAK secret police are also real.`,
    effect: (p) => { p.m += 5; p.setMem('iran_modern', true) },
  },

  {
    id: 'hist_iran_revolution',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.name === 'Iran' && G.currentYear === 1979 && G.age >= 12 && !G.mem?.iran_revolution,
    text: 'The Shah has fled. The Ayatollah has returned. The streets are full of people who seem to believe that what comes next will be better. You are not sure yet what you believe.',
    choices: [
      { text: 'Join the revolutionary crowds', tag: null, outcome: 'The energy is like nothing you\'ve felt. The Republic that follows will be very different from what many who marched imagined they were marching toward.', effect: (p) => { p.m += 5; p.s += 3; p.addFlag('revolutionary'); p.setMem('iran_revolution', true) } },
      { text: 'Watch carefully from home', tag: null, outcome: 'You see the direction early. You begin making contingency plans.', effect: (p) => { p.e += 5; p.setMem('iran_revolution', true) } },
    ],
  },

  {
    id: 'hist_iran_mandatory_hijab',
    phase: null,
    weight: 8,
    when: (G) => G.character.country.name === 'Iran' && G.character.gender === 'female' && G.currentYear >= 1980 && G.age >= 9 && !G.mem?.mandatory_hijab,
    text: 'The Islamic Republic has made hijab compulsory. Last year you had a choice. This year it is the law. The morality police patrol the streets. You adjust your headscarf before you step outside.',
    choices: [
      { text: 'Comply — safety matters more than the principle', tag: null, outcome: 'You comply every day for decades. Each adjustment of the scarf is a small negotiation between safety and selfhood.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('mandatory_hijab', true) } },
      { text: 'Push the limits — let it slip back', tag: null, outcome: 'A morality officer grabs your arm in the street. The fine is money you don\'t have. The humiliation is worse.', effect: (p) => { p.m -= 12; p.mo -= 200; p.setMem('mandatory_hijab', true) } },
    ],
  },

  // ── CULTURAL REVOLUTION CHINA ────────────────────────────────────────────────

  {
    id: 'hist_cultural_revolution_red_guard',
    phase: null,
    weight: 7,
    when: (G) => G.character.country.name === 'China' && G.currentYear >= 1966 && G.currentYear <= 1976 && G.age >= 12 && G.age <= 22 && !G.mem?.red_guard,
    text: 'The Red Guards are at the school. Books are burned in the courtyard. A teacher — the one who taught you to love poetry — is dragged out and made to wear a dunce cap and confess to bourgeois thoughts in front of the students.',
    choices: [
      { text: 'Join in the denunciation — survival requires it', tag: null, outcome: 'You shout with the crowd. Your teacher looks at you once. The look will visit you for the rest of your life.', effect: (p) => { p.m -= 15; p.karma -= 15; p.r += 15; p.setMem('red_guard', true) } },
      { text: 'Stay silent in the crowd', tag: null, outcome: 'You are not safe, but you are not a perpetrator. The distinction matters to you more than it protects you.', effect: (p) => { p.m -= 10; p.karma += 5; p.setMem('red_guard', true) } },
    ],
  },

  {
    id: 'hist_sent_down',
    phase: null,
    weight: 6,
    when: (G) => G.character.country.name === 'China' && G.currentYear >= 1968 && G.currentYear <= 1978 && G.age >= 16 && G.age <= 25 && !G.mem?.sent_down,
    text: 'The directive has come: educated youth must go to the countryside for re-education by the peasants. You will be reassigned to a farm in a province you have never heard of. Your family cannot appeal.',
    choices: [
      { text: 'Embrace it — what choice do you have?', tag: null, outcome: 'Years of hard labour and isolation. You learn what your hands can do. You learn what loneliness actually is. You survive.', effect: (p) => { p.m -= 20; p.h -= 8; p.e -= 5; p.setMem('sent_down', true) } },
      { text: 'Find a way to stay near the city', tag: null, outcome: 'Bribes. Connections. Luck. You avoid the worst of it — but the precarity never fully leaves.', effect: (p) => { p.m -= 10; p.mo -= 500; p.setMem('sent_down', true) } },
    ],
  },

  // ── INDIA CASTE SYSTEM ──────────────────────────────────────────────────────

  {
    id: 'hist_caste_school_denial',
    phase: 'childhood',
    weight: 8,
    when: (G) => G.character.country.name === 'India' && G.character.ethnicity === 'dalit' && G.character.ruralUrban === 'rural' && G.age >= 6 && G.age <= 12 && !G.mem?.caste_school_denial,
    text: 'The upper-caste teacher sits Dalit children at the back of the classroom, separated by a line of chalk. You are not allowed to touch the communal water pot. When you raise your hand to answer a question, he looks through you.',
    choices: [
      { text: 'Keep coming to school regardless', tag: null, outcome: 'Some teachers are different. Eventually, one sees you. That one is enough to keep you there.', effect: (p) => { p.e += 5; p.m -= 8; p.r += 5; p.setMem('caste_school_denial', true) } },
      { text: 'Stop going — the humiliation is too great', tag: null, outcome: 'You quit by age ten. The opportunities that schooling might have opened will remain closed.', effect: (p) => { p.e -= 8; p.m -= 5; p.setMem('caste_school_denial', true) } },
    ],
  },

  {
    id: 'hist_caste_well_untouchability',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.character.country.name === 'India' && G.character.ethnicity === 'dalit' && G.age >= 8 && G.age <= 16 && !G.mem?.caste_well,
    text: 'You reach for the village well. An upper-caste man grabs your wrist and pulls you back. Dalits do not touch the well. You are sent to fetch water from a different source — further, dirtier. Your mother doesn\'t look surprised when you tell her.',
    choices: [
      { text: 'Accept it — you know what defiance costs here', tag: null, outcome: 'You fetch the water. The long walk becomes its own lesson in what the world costs certain people.', effect: (p) => { p.m -= 10; p.r += 8; p.setMem('caste_well', true) } },
      { text: 'Go back to the well anyway', tag: 'activist', outcome: 'They hit you. You are very small and they are not. But you went back. That, too, is data.', effect: (p) => { p.m -= 12; p.h -= 8; p.karma += 10; p.addFlag('activist'); p.setMem('caste_well', true) } },
    ],
  },

  {
    id: 'hist_caste_intercaste_marriage',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.character.country.name === 'India' && G.casteSystem && G.age >= 18 && G.age <= 30 && !G.mem?.intercaste_marriage && G.partner,
    text: 'You love someone from a different caste. Both families have discovered this. The reaction is not quiet. A village panchayat has been called. Words like honour and shame are used. Someone mentions violence.',
    choices: [
      { text: 'Elope — leave before the panchayat decides', tag: null, outcome: 'You run. The first months are precarious and frightening and also the freest either of you has been.', effect: (p) => { p.m += 5; p.h -= 5; p.partnerRel(15); p.addFlag('eloped'); p.setMem('intercaste_marriage', true) } },
      { text: 'Submit to family pressure — end it', tag: null, outcome: 'You send a final message that says what it must say. The loss is not something you name for a long time.', effect: (p) => { p.m -= 20; p.r += 15; p.setMem('intercaste_marriage', true) } },
    ],
  },

  {
    id: 'hist_dalit_reservation_benefit',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'India' && ['dalit', 'adivasi'].includes(G.character.ethnicity) && G.age >= 18 && G.age <= 24 && !G.mem?.reservation_benefit && (G.stats.smarts > 50),
    text: 'Your marks are high. The reservation system — affirmative action for Scheduled Castes — means you have a place at a university that upper-caste families say is "taken" from their children. They use the word merit in a way that ignores who gave them theirs.',
    choices: [
      { text: 'Accept the place — you earned it', tag: null, outcome: 'University is not welcoming. Some classmates make the reservation status the first thing they say to you. You outperform half of them by second year.', effect: (p) => { p.e += 12; p.m -= 5; p.setMem('reservation_benefit', true) } },
    ],
  },

  // ── INDIGENOUS PEOPLES ───────────────────────────────────────────────────────

  {
    id: 'hist_residential_school',
    phase: 'childhood',
    weight: 7,
    when: (G) => ['indigenous_american', 'aboriginal_australian', 'first_nations'].includes(G.character.ethnicity) && G.currentYear >= 1950 && G.currentYear <= 1975 && G.age >= 5 && G.age <= 12 && !G.mem?.residential_school,
    text: 'Government officials come to the village. They explain that the children must go to the residential school — it is the law. You are taken from your family. At the school, speaking your language is punished. Your name is replaced with a number.',
    choices: [
      { text: 'Survive it — hold the language inside', tag: null, outcome: 'You learn to hide what you know. Some things cannot be beaten out. You carry them back years later, bent but not broken.', effect: (p) => { p.m -= 25; p.h -= 10; p.e += 5; p.addFlag('residential_school_survivor'); p.setMem('residential_school', true) } },
    ],
  },

  {
    id: 'hist_indigenous_language_revival',
    phase: 'adult',
    weight: 5,
    when: (G) => ['indigenous_american', 'aboriginal_australian', 'first_nations', 'maori'].includes(G.character.ethnicity) && G.age >= 25 && G.currentYear >= 1970 && !G.mem?.language_revival,
    text: 'There is a movement to teach the language again. To the children who were forbidden to speak it, to the grandchildren who never learned it. A gathering is organised. Will you go?',
    choices: [
      { text: 'Go — bring what you remember', tag: null, outcome: 'What returns is incomplete and precious. An elder weeps when she hears a word she hasn\'t spoken aloud in sixty years.', effect: (p) => { p.m += 12; p.karma += 8; p.s += 5; p.setMem('language_revival', true) } },
      { text: 'The loss is too much to revisit', tag: null, outcome: 'You stay away. But you teach your child three words before bed, every night. It\'s something.', effect: (p) => { p.m -= 5; p.r += 5; p.karma += 5; p.setMem('language_revival', true) } },
    ],
  },

  // ── COLONIAL INDEPENDENCE ────────────────────────────────────────────────────

  {
    id: 'hist_independence_day',
    phase: null,
    weight: 7,
    when: (G) => ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.currentYear >= 1956 && G.currentYear <= 1975 && G.age >= 5 && !G.mem?.independence_day,
    text: (G) => `The flag of ${G.character.country.name} rises for the first time. The colonial flag comes down. Crowds are singing. Your parents are crying — you have never seen your father cry before. This is what independence looks like.`,
    choices: [
      { text: 'Celebrate with everyone — it\'s a new beginning', tag: null, outcome: 'The feeling lasts weeks. What comes after independence is more complicated — but today is today.', effect: (p) => { p.m += 15; p.karma += 5; p.setMem('independence_day', true) } },
    ],
  },

  {
    id: 'hist_colonial_language_school',
    phase: 'childhood',
    weight: 6,
    when: (G) => ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.currentYear >= 1950 && G.currentYear <= 1980 && G.age >= 7 && G.age <= 15 && !G.mem?.colonial_school_language,
    text: (G) => `School is taught in French, or English, or Portuguese — the coloniser\'s tongue. You think in ${G.character.country.languages?.[0] ?? 'your own language'} and translate. The children who learn the colonial language best go furthest. This is the arrangement.`,
    choices: [
      { text: 'Master the colonial language — it\'s the key to everything', tag: null, outcome: 'You become fluent. The doors it opens are real. The thing it does to your sense of self takes longer to name.', effect: (p) => { p.e += 8; p.m -= 3; p.setMem('colonial_school_language', true) } },
      { text: 'Resist — insist on your own language', tag: 'activist', outcome: 'You are punished. You fall behind. Your mother worries. You learn resistance has costs that fall on others.', effect: (p) => { p.e -= 3; p.karma += 5; p.addFlag('activist'); p.setMem('colonial_school_language', true) } },
    ],
  },

  // ── DIASPORA / IMMIGRATION ──────────────────────────────────────────────────

  {
    id: 'hist_diaspora_identity_crisis',
    phase: 'teens',
    weight: 6,
    when: (G) => G.age >= 14 && G.age <= 22 && G.flags.includes('emigrated') && !G.mem?.diaspora_identity && G.character.country.archetype === 'wealthy_west',
    text: 'At home you are foreign. In the country your parents came from, you are also foreign. You speak both languages with an accent that marks you in each direction. You belong completely to neither place and you are starting to understand that this might be permanent.',
    choices: [
      { text: 'Build your own identity from both parts', tag: null, outcome: 'It takes time. But the double perspective becomes something you bring to every room you enter. A gift and a burden.', effect: (p) => { p.e += 8; p.s += 5; p.m += 3; p.setMem('diaspora_identity', true) } },
      { text: 'Fully assimilate — shed the heritage', tag: null, outcome: 'Easier in some ways. Later, you find yourself hungry for something you deliberately put down.', effect: (p) => { p.m -= 3; p.r += 8; p.setMem('diaspora_identity', true) } },
      { text: 'Fully embrace the heritage — reject assimilation', tag: 'devout', outcome: 'The community of origin wraps around you. The host country remains at a distance. There are trade-offs.', effect: (p) => { p.m += 5; p.s += 3; p.setMem('diaspora_identity', true) } },
    ],
  },

  {
    id: 'hist_remittance_pressure',
    phase: 'young_adult',
    weight: 6,
    when: (G) => G.age >= 20 && G.age <= 35 && G.flags.includes('emigrated') && !G.mem?.remittance_pressure && ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype),
    text: 'Your family back home is depending on the money you send. A medical emergency. A sibling\'s school fees. A cousin\'s business start-up. The requests are not dishonest — the need is real. But you are saving to rent a proper apartment.',
    choices: [
      { text: 'Send everything they ask for', tag: null, outcome: 'You delay your own stability by three years. Your family calls you the good one. The weight of that title is considerable.', effect: (p) => { p.mo -= 2000; p.m += 5; p.karma += 5; p.r += 5; p.setMem('remittance_pressure', true) } },
      { text: 'Send what you can afford — explain the rest', tag: null, outcome: 'Some relatives understand. Some do not. You set a boundary that will be tested repeatedly.', effect: (p) => { p.mo -= 800; p.m -= 3; p.setMem('remittance_pressure', true) } },
    ],
  },

  // ── NATURAL DISASTERS ────────────────────────────────────────────────────────

  {
    id: 'hist_2004_tsunami',
    phase: null,
    weight: 7,
    when: (G) => ['Indonesia', 'Sri Lanka', 'Thailand'].includes(G.character.country.name) && G.currentYear === 2004 && G.age >= 5 && !G.mem?.tsunami_2004,
    text: 'December 26, 2004. The sea withdraws further than anyone has ever seen. Then it comes back.',
    choices: [
      { text: 'Run for high ground immediately', tag: null, outcome: 'You survive. The town does not fully survive. The rebuilding takes years and the grief longer.', effect: (p) => { p.m -= 20; p.h -= 8; p.addFlag('disaster_survivor'); p.setMem('tsunami_2004', true) } },
      { text: 'Stay to watch the strange sea', tag: null, outcome: 'Someone pulls you and runs. You owe them your life. You will not be able to repay the debt.', effect: (p) => { p.m -= 25; p.h -= 15; p.addFlag('disaster_survivor'); p.setMem('tsunami_2004', true) } },
    ],
  },

  {
    id: 'hist_ethiopia_famine',
    phase: null,
    weight: 7,
    when: (G) => G.character.country.name === 'Ethiopia' && G.currentYear >= 1983 && G.currentYear <= 1986 && G.age >= 3 && G.age <= 15 && !G.mem?.ethiopia_famine,
    text: 'The rains have not come for two years. The crops have failed. The road to the relief station is full of people who look like you — the same hollow eyes, the same careful walk that conserves energy. Your sister is sick.',
    choices: [
      { text: 'Make it to the relief station', tag: null, outcome: 'The aid workers give you food. Your sister recovers. You will never again take a full stomach for granted.', effect: (p) => { p.h -= 15; p.m -= 15; p.setMem('ethiopia_famine', true) } },
    ],
  },
]

export const RELIGION_EVENTS = [

  // ── CHRISTIAN PROTESTANT ────────────────────────────────────────────────────

  {
    id: 'rel_protestant_sunday_school',
    phase: 'childhood',
    weight: 6,
    when: (G) => ['christian_protestant'].includes(G.religion) && G.age >= 5 && G.age <= 10 && !G.mem?.sunday_school,
    text: 'Every Sunday your family dresses up and drives to church. Sunday school is downstairs while the adults worship upstairs. You learn about Noah, David, and a God who is both terrifying and loving.',
    choices: [
      { text: 'Take it seriously — memorise the verses', tag: 'devout', outcome: 'You win the memory verse competition three weeks running. The teacher calls you a blessing.', effect: (p) => { p.m += 5; p.e += 3; p.s += 2; p.addFlag('devout'); p.setMem('sunday_school', true) } },
      { text: 'Go through the motions', tag: null, outcome: 'You color the worksheets and eat the juice-and-cracker snacks. Church is just a thing your family does.', effect: (p) => { p.m += 2; p.setMem('sunday_school', true) } },
      { text: 'Ask too many questions — the teacher gets flustered', tag: 'curious', outcome: '"Why did God let that happen?" The teacher suggests you pray about it. You file this away.', effect: (p) => { p.e += 4; p.m -= 2; p.setMem('sunday_school', true) } },
    ],
  },

  {
    id: 'rel_protestant_confirmation',
    phase: 'teens',
    weight: 5,
    when: (G) => ['christian_protestant'].includes(G.religion) && G.age >= 12 && G.age <= 16 && !G.mem?.confirmation,
    text: 'Confirmation class meets on Wednesday evenings. You\'re supposed to affirm that you believe — really believe — before the whole congregation.',
    choices: [
      { text: 'Go through with it — it matters to your family', tag: null, outcome: 'You stand at the altar. Everyone claps. Your grandmother cries. You feel something, though you\'re not sure what.', effect: (p) => { p.m += 8; p.s += 3; p.setMem('confirmation', true); p.addFlag('confirmed') } },
      { text: 'Tell your parents you\'re not ready', tag: 'doubter', outcome: 'The conversation is long and painful. Your mother says she\'ll pray for you. You feel a strange freedom.', effect: (p) => { p.m -= 5; p.e += 5; p.setMem('confirmation', true) } },
    ],
  },

  {
    id: 'rel_protestant_born_again',
    phase: 'teens',
    weight: 4,
    when: (G) => ['christian_protestant'].includes(G.religion) && G.age >= 14 && G.age <= 22 && ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) && !G.mem?.born_again,
    text: 'At a revival meeting, the pastor calls people forward. The music is overwhelming. Something cracks open in your chest that you didn\'t know was sealed shut.',
    choices: [
      { text: 'Walk forward — surrender to it', tag: 'devout', outcome: 'You are born again. The congregation embraces you. For weeks the world looks different.', effect: (p) => { p.m += 15; p.karma += 5; p.addFlag('devout'); p.addFlag('born_again'); p.setMem('born_again', true) } },
      { text: 'Stay seated — you don\'t feel it', tag: null, outcome: 'You watch others go forward. You feel a faint ache — like you missed something, or like you were spared something.', effect: (p) => { p.m -= 3; p.setMem('born_again', true) } },
    ],
  },

  {
    id: 'rel_protestant_faith_crisis',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.flags.includes('devout') && G.age >= 18 && G.age <= 30 && !G.mem?.faith_crisis,
    text: 'Something happens that your faith cannot explain — a death, a cruelty, a scientific argument you can\'t dismiss. For the first time, you genuinely wonder if any of it is true.',
    choices: [
      { text: 'Wrestle with the doubt — stay in the community', tag: null, outcome: 'Faith, you learn, is not certainty. You emerge with something harder and quieter — a belief that has survived contact with the world.', effect: (p) => { p.e += 6; p.m -= 3; p.r += 3; p.setMem('faith_crisis', true) } },
      { text: 'Walk away from faith entirely', tag: null, outcome: 'You stop going to church. Some relationships cool. The freedom feels vast and occasionally vertiginous.', effect: (p) => { p.m -= 5; p.e += 8; p.clearFlag('devout'); p.setMem('faith_crisis', true) } },
      { text: 'Redouble your faith — doubt is a test', tag: 'devout', outcome: 'You pray harder. Read more. The doubt becomes something you hold rather than something that holds you.', effect: (p) => { p.m += 5; p.addFlag('devout'); p.setMem('faith_crisis', true) } },
    ],
  },

  {
    id: 'rel_prosperity_gospel',
    phase: 'young_adult',
    weight: 4,
    when: (G) => ['christian_protestant'].includes(G.religion) && ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 25 && !G.mem?.prosperity_gospel,
    text: (G) => `The pastor at ${G.character.country.name === 'Nigeria' ? 'the new megachurch on the main road' : 'the biggest church in the city'} preaches that God wants you wealthy. Seed faith — sow money, reap miracles. The congregation is large and the message is intoxicating.`,
    choices: [
      { text: 'Give your tithe plus a seed offering', tag: null, outcome: 'Months pass. No miracle. But the community is warm and the pastor is charismatic. You keep going.', effect: (p) => { p.mo -= 500; p.m += 4; p.setMem('prosperity_gospel', true) } },
      { text: 'Reject it as exploitation', tag: null, outcome: 'You leave. The theology offends you. But you miss the singing.', effect: (p) => { p.e += 5; p.karma += 3; p.setMem('prosperity_gospel', true) } },
    ],
  },

  // ── CHRISTIAN CATHOLIC ──────────────────────────────────────────────────────

  {
    id: 'rel_catholic_first_communion',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.religion === 'christian_catholic' && G.age >= 7 && G.age <= 8 && !G.mem?.first_communion,
    text: 'White dress or white suit, nervous stomach, practicing how to receive the host without letting your teeth touch it. First Communion is the most important day of your life so far, according to everyone.',
    choices: [
      { text: 'Take it seriously — the body of Christ', tag: 'devout', outcome: 'You feel something at the altar. A holiness. You understand why your grandmother cries during Mass.', effect: (p) => { p.m += 10; p.addFlag('devout'); p.setMem('first_communion', true) } },
      { text: 'Focus on the party and presents afterward', tag: null, outcome: 'The church part is long. The party is excellent. You get cards with money.', effect: (p) => { p.m += 8; p.mo += 150; p.setMem('first_communion', true) } },
    ],
  },

  {
    id: 'rel_catholic_confession',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.religion === 'christian_catholic' && G.age >= 7 && G.age <= 12 && !G.mem?.first_confession,
    text: 'First confession. The booth is dark and smells of wood polish. You have to enumerate your sins. You\'ve been rehearsing, but the priest already seems bored.',
    choices: [
      { text: 'Confess everything honestly', tag: null, outcome: 'Three Hail Marys and an Our Father. You exit feeling lighter. You\'re not sure if that\'s theology working or just relief.', effect: (p) => { p.m += 7; p.karma += 3; p.setMem('first_confession', true) } },
      { text: 'Invent minor sins — nothing embarrassing', tag: null, outcome: 'A lie inside a confession. You\'re going to need to confess the lie next week.', effect: (p) => { p.m += 3; p.karma -= 2; p.setMem('first_confession', true) } },
    ],
  },

  {
    id: 'rel_catholic_ivf_conflict',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.religion === 'christian_catholic' && G.age >= 28 && G.age <= 45 && G.partner && !G.mem?.ivf_religion_conflict && ['wealthy_west', 'developing_urban'].includes(G.character.country.archetype),
    text: 'You and your partner have been trying for a child without success. A doctor recommends IVF. The Church\'s position is unambiguous: it is forbidden.',
    choices: [
      { text: 'Follow the Church teaching — natural methods only', tag: 'devout', outcome: 'Years pass with prayers and patience. Eventually: a pregnancy, or peace with childlessness. Either way, your faith holds.', effect: (p) => { p.m -= 8; p.karma += 5; p.setMem('ivf_religion_conflict', true) } },
      { text: 'Pursue IVF privately — keep it from your family', tag: null, outcome: 'Eleven weeks later, two pink lines. You tell your family about the pregnancy. Not about the method.', effect: (p) => { p.m += 10; p.karma -= 3; p.setMem('ivf_religion_conflict', true) } },
      { text: 'Leave the Church over this', tag: null, outcome: 'A institution that claims to value life is making yours smaller. You don\'t go back.', effect: (p) => { p.m -= 5; p.e += 5; p.clearFlag('devout'); p.setMem('ivf_religion_conflict', true) } },
    ],
  },

  {
    id: 'rel_liberation_theology',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.religion === 'christian_catholic' && ['Brazil', 'Colombia', 'Mexico', 'Peru', 'Guatemala', 'Chile', 'Argentina'].includes(G.character.country.name) && G.age >= 18 && G.age <= 30 && !G.mem?.liberation_theology,
    text: 'A priest in your neighborhood doesn\'t preach hellfire. He preaches land reform, workers\' rights, the violence of poverty. He calls it a preferential option for the poor. The bishop is displeased.',
    choices: [
      { text: 'Join his base community', tag: 'activist', outcome: 'You organise. You march. You get a reputation. It feels like faith applied to the real world.', effect: (p) => { p.m += 8; p.s += 5; p.karma += 8; p.addFlag('activist'); p.setMem('liberation_theology', true) } },
      { text: 'Admire from a distance — it feels dangerous', tag: null, outcome: 'The priest is eventually transferred by the bishop. The community scatters. You wonder if you should have done more.', effect: (p) => { p.m -= 3; p.r += 5; p.setMem('liberation_theology', true) } },
    ],
  },

  // ── CHRISTIAN ORTHODOX ──────────────────────────────────────────────────────

  {
    id: 'rel_orthodox_easter_vigil',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.religion === 'christian_orthodox' && G.age >= 6 && G.age <= 14 && !G.mem?.orthodox_easter,
    text: 'Midnight on Holy Saturday. The church is dark. A single flame passes candle to candle until the whole building glows. The priest calls: "Christ is risen." The congregation answers.',
    choices: [
      { text: 'Feel it deeply — this is sacred', tag: 'devout', outcome: 'Something passes through you in that darkness and light. You will remember this your whole life.', effect: (p) => { p.m += 12; p.karma += 5; p.addFlag('devout'); p.setMem('orthodox_easter', true) } },
      { text: 'Mostly notice you\'re very tired and it smells like incense', tag: null, outcome: 'It\'s past 1am. Your eyes keep closing. Your mother elbows you awake. The candle wax drips on your hand.', effect: (p) => { p.m += 4; p.setMem('orthodox_easter', true) } },
    ],
  },

  {
    id: 'rel_orthodox_gender_roles',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.religion === 'christian_orthodox' && G.character.gender === 'female' && G.age >= 18 && G.age <= 28 && !G.mem?.orthodox_gender,
    text: 'The priest gives a sermon on the proper role of Christian women — submission, modesty, motherhood. Several women in the congregation nod. You feel a complicated mixture of things.',
    choices: [
      { text: 'Accept the teaching — this is your faith tradition', tag: 'devout', outcome: 'You find meaning in it. A vocation in the domestic. It is not for everyone, but it is, you decide, for you.', effect: (p) => { p.m += 5; p.setMem('orthodox_gender', true) } },
      { text: 'Speak to the priest after — respectfully challenge it', tag: null, outcome: 'He listens politely. Quotes Paul. You leave unsatisfied. You find a different parish eventually.', effect: (p) => { p.e += 5; p.m -= 3; p.setMem('orthodox_gender', true) } },
      { text: 'Leave the Church', tag: null, outcome: 'You don\'t go back. You keep the candles and the icons. You let go of the institution.', effect: (p) => { p.m -= 5; p.clearFlag('devout'); p.setMem('orthodox_gender', true) } },
    ],
  },

  // ── MUSLIM SUNNI ────────────────────────────────────────────────────────────

  {
    id: 'rel_muslim_quran_school',
    phase: 'childhood',
    weight: 8,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 5 && G.age <= 10 && !G.mem?.quran_school,
    text: (G) => `Every evening after regular school, you go to the mosque or the madrassa to learn the Quran. The ${G.character.country.archetype === 'wealthy_gulf' ? 'Quran teacher comes to your home' : 'teacher is strict and the benches are hard'}. You memorise verses in Arabic you don\'t fully understand yet.`,
    choices: [
      { text: 'Memorise diligently — the words become part of you', tag: 'devout', outcome: 'By age ten you can recite three juz from memory. Your parents are proud. The teacher gives you a new name: Hafiz.', effect: (p) => { p.e += 6; p.m += 5; p.s += 3; p.addFlag('devout'); p.setMem('quran_school', true) } },
      { text: 'Go through it — you\'d rather be playing', tag: null, outcome: 'You complete the course. The verses are somewhere in the back of your mind, available in ways you don\'t always notice.', effect: (p) => { p.e += 3; p.setMem('quran_school', true) } },
    ],
  },

  {
    id: 'rel_muslim_ramadan_first',
    phase: 'childhood',
    weight: 7,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 8 && G.age <= 12 && !G.mem?.ramadan_first,
    text: 'This Ramadan, you tell your parents you want to fast the full month with the adults. Your mother touches your face. The first suhoor wakes you before dawn — your grandmother\'s hands moving in the dark kitchen, the specific smell of food that is also a clock. You eat before the fajr call. Then the long day begins.',
    choices: [
      { text: 'Complete the full fast every day', tag: 'devout', outcome: 'By the third week the hunger becomes something you manage rather than suffer. The iftar — the date first, always, then water, then the meal — acquires a weight that ordinary food never has. On the last night you hear the moon announced and understand that Eid al-Fitr is earned, not given. You carry this knowledge for the rest of your life.', effect: (p) => { p.m += 10; p.h -= 3; p.e += 4; p.karma += 5; p.addFlag('devout'); p.setMem('ramadan_first', true) } },
      { text: 'Break it on the third day', tag: null, outcome: 'You eat a date when no one is watching. The shame is immediate and specific — not the shame of punishment but the shame of a promise you made to yourself. You tell no one. Next year you manage it.', effect: (p) => { p.m -= 3; p.r += 3; p.setMem('ramadan_first', true) } },
    ],
  },

  {
    id: 'rel_muslim_hijab_decision',
    phase: 'teens',
    weight: 7,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.character.gender === 'female' && G.age >= 11 && G.age <= 16 && !G.mem?.hijab_decision,
    text: (G) => {
      if (['theocracy', 'absolute_monarchy'].includes(G.regime)) return 'The hijab is not optional here. But how you wear it — how tightly you pin it, what you wear beneath it — that is yours.'
      return `Your mother wears hijab. So does your aunt. You\'ve reached the age where people in your community expect you to decide. ${G.character.country.archetype === 'wealthy_west' ? 'At school, some of the other girls will stare.' : 'Some girls your age already do. Others don\'t.'}`
    },
    choices: [
      { text: 'Choose to wear hijab — it feels right', tag: 'devout', outcome: 'You buy a scarf in your favourite colour. People look at you differently. You look at yourself differently too.', effect: (p) => { p.m += 5; p.s += 2; p.addFlag('devout'); p.addFlag('wears_hijab'); p.setMem('hijab_decision', true) } },
      { text: 'Choose not to — not yet, maybe not ever', tag: null, outcome: 'Your mother is quiet about it. Some relatives have opinions. You feel the weight of everyone\'s expectations and choose yourself.', effect: (p) => { p.m -= 3; p.e += 5; p.setMem('hijab_decision', true) } },
      { text: 'Wear it to please your family but struggle with it', tag: null, outcome: 'The fabric feels like compromise. You will revisit this decision every morning for years.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('hijab_decision', true) } },
    ],
  },

  {
    id: 'rel_muslim_friday_prayers',
    phase: 'teens',
    weight: 5,
    when: (G) => G.religion === 'muslim_sunni' && G.character.gender === 'male' && G.age >= 13 && G.age <= 18 && !G.mem?.friday_prayers,
    text: 'Friday Jumu\'ah is the most important prayer of the week. Your father expects you to attend the mosque with him. But you had other plans.',
    choices: [
      { text: 'Go — it\'s important to your father and your deen', tag: 'devout', outcome: 'The khutbah is long but the community is warm. Walking home with your father after is something you\'ll remember.', effect: (p) => { p.m += 6; p.s += 3; p.addFlag('devout'); p.setMem('friday_prayers', true) } },
      { text: 'Skip this week — make an excuse', tag: null, outcome: 'Your father finds out. The conversation is pointed. You start going regularly after that, if only for peace.', effect: (p) => { p.m -= 5; p.karma -= 2; p.setMem('friday_prayers', true) } },
    ],
  },

  {
    id: 'rel_muslim_western_identity',
    phase: 'young_adult',
    weight: 6,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.character.country.archetype === 'wealthy_west' && G.age >= 16 && G.age <= 26 && !G.mem?.muslim_western_identity,
    text: 'You exist in two worlds. At home: prayers, halal food, modesty. Outside: a culture that sees your faith as strange, dangerous, or quaint. After a high-profile terrorist attack, strangers look at you differently.',
    choices: [
      { text: 'Hold both identities — they don\'t have to contradict', tag: null, outcome: 'It takes time. But you build a self that is fully Muslim and fully here. Neither apologetic nor closed.', effect: (p) => { p.e += 6; p.s += 5; p.m += 3; p.setMem('muslim_western_identity', true) } },
      { text: 'Lean into your faith — the outside world\'s approval isn\'t the point', tag: 'devout', outcome: 'You stop trying to explain yourself. Your community becomes your world. You find that freeing.', effect: (p) => { p.m += 5; p.addFlag('devout'); p.setMem('muslim_western_identity', true) } },
      { text: 'Distance yourself from visible Islam — for safety, for ease', tag: null, outcome: 'You stop saying you\'re Muslim to people you don\'t know. The erasure wears on you in ways you don\'t immediately recognise.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('muslim_western_identity', true) } },
    ],
  },

  {
    id: 'rel_muslim_hajj',
    phase: 'midlife',
    weight: 5,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 30 && G.age <= 60 && !G.mem?.hajj && G.money > 5000,
    text: 'You have saved for years. The fifth pillar. Your name goes on the list, and when the confirmation comes, your hands are not steady. Two million Muslims converging from every country on earth — the same five days, the same sequence: Mecca, then Mina on the 8th of Dhul Hijjah, then the plain of Arafat where you stand from noon until sunset and ask for what you cannot ask anywhere else. Then Muzdalifah under an open sky, sleeping on stones, collecting pebbles for the stoning at Jamarat. The body does not forgive this easily. The soul is another matter.',
    choices: [
      { text: 'Go — this year', tag: 'devout', outcome: 'On the second night in Mina your shoes blister through. The tawaf at the Ka\'aba before dawn — seven circuits, millions of shoulders, the black stone at the corner — you weep without embarrassment. The man next to you is from Indonesia and speaks no Arabic and no language you share, and you understand each other completely. You come home changed in ways you cannot yet describe and may never fully articulate.', effect: (p) => { p.mo -= 6000; p.m += 20; p.karma += 10; p.h -= 5; p.addFlag('hajj_complete'); p.setMem('hajj', true) } },
      { text: 'Save more first — it should be done properly', tag: null, outcome: 'You wait. The pillar does not go anywhere. You return to the saving.', effect: (p) => { p.setMem('hajj', false) } },
    ],
  },

  // ── MUSLIM SHIA ─────────────────────────────────────────────────────────────

  {
    id: 'rel_shia_ashura',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.religion === 'muslim_shia' && G.age >= 8 && G.age <= 14 && !G.mem?.ashura,
    text: 'Ashura. The tenth of Muharram. The streets fill with black. Men beat their chests and weep for the martyr Husayn ibn Ali, killed at Karbala thirteen centuries ago. The grief is communal and very real.',
    choices: [
      { text: 'Participate fully — the mourning is sacred', tag: 'devout', outcome: 'You understand for the first time why faith is not only belief but memory and grief carried across time.', effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('devout'); p.setMem('ashura', true) } },
      { text: 'Watch from the edge — moved but uncertain', tag: null, outcome: 'The scale of grief is overwhelming. You are part of it and apart from it simultaneously.', effect: (p) => { p.m += 3; p.e += 3; p.setMem('ashura', true) } },
    ],
  },

  {
    id: 'rel_shia_minority_pressure',
    phase: 'teens',
    weight: 5,
    when: (G) => G.religion === 'muslim_shia' && ['Pakistan', 'Afghanistan', 'Saudi Arabia'].includes(G.character.country.name) && G.age >= 12 && G.age <= 20 && !G.mem?.shia_minority,
    text: 'In a country where most Muslims are Sunni, your Shia practice draws suspicion. A classmate calls your prayers heresy. A neighbourhood notice excludes "Shia" from a community event.',
    choices: [
      { text: 'Speak up — your faith is valid', tag: null, outcome: 'You make your case calmly. Some listen. Some walk away. You decide your dignity is not negotiable.', effect: (p) => { p.m -= 3; p.s += 5; p.karma += 5; p.setMem('shia_minority', true) } },
      { text: 'Keep your practice private for safety', tag: null, outcome: 'You pray quietly at home. The erasure is a dull ache. But you are safe.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('shia_minority', true) } },
    ],
  },

  // ── JEWISH ──────────────────────────────────────────────────────────────────

  {
    id: 'rel_jewish_bar_bat_mitzvah',
    phase: 'teens',
    weight: 8,
    when: (G) => G.religion === 'jewish' && G.age === 13 && !G.mem?.bar_bat_mitzvah,
    text: (G) => {
      if (G.character.gender === 'male') {
        return 'Your Bar Mitzvah has been in preparation for a year. The Torah portion was assigned months ago — you have read it in Hebrew and in translation more times than you can count. The blessings, the haftarah. Today you are called to the bimah before the entire congregation. You are, by Jewish law, now responsible for your own commandments.'
      }
      // Bat mitzvah history: not practiced in Orthodox Judaism; introduced in Conservative and Reform synagogues from the mid-20th century
      if (G.currentYear < 1960) {
        return 'In your community, girls are not called to the bimah the way boys are. The ceremony for you, if there is one, happens on a Friday night — quiet, smaller, without the full Torah reading. It is still yours. The weight of the tradition lands differently when you understand how recently girls were admitted to it at all.'
      }
      return 'Your Bat Mitzvah has been in preparation for a year. You have learned the Torah portion, the blessings, the haftarah. You stand at the bimah before the entire congregation. Your grandmother whispers to the woman next to her that in her day this was not done — and she means it as the highest compliment.'
    },
    choices: [
      { text: 'Deliver your Torah portion without stumbling', tag: null, outcome: 'The congregation applauds. Your grandfather, a Holocaust survivor, weeps quietly in the front row. You understand in that moment what you are carrying — and how many were lost before it could be handed to you.', effect: (p) => { p.m += 15; p.s += 8; p.e += 5; p.mo += 500; p.setMem('bar_bat_mitzvah', true) } },
      { text: 'Stumble but recover', tag: null, outcome: 'You lose your place in the Hebrew. Your rabbi nods gently. You find it again. You finish. It is enough.', effect: (p) => { p.m += 8; p.s += 3; p.mo += 300; p.setMem('bar_bat_mitzvah', true) } },
    ],
  },

  {
    id: 'rel_jewish_yom_kippur',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.religion === 'jewish' && G.age >= 10 && G.age <= 15 && !G.mem?.yom_kippur,
    text: 'Yom Kippur, the Day of Atonement. No food, no water, from sundown to sundown. The synagogue is full in ways it isn\'t during the year. You stand for the Kol Nidre and feel the weight of a whole year of wrong turns.',
    choices: [
      { text: 'Fast the full day with the adults', tag: 'devout', outcome: 'By sunset you are hollow and clear. You break the fast with your family and the meal tastes different than usual.', effect: (p) => { p.m += 8; p.karma += 8; p.h -= 3; p.addFlag('devout'); p.setMem('yom_kippur', true) } },
      { text: 'Eat secretly — you\'re still growing', tag: null, outcome: 'You hide crackers in your coat pocket. The guilt of eating on the holiest fast day becomes its own thing to atone for next year.', effect: (p) => { p.m -= 3; p.karma -= 3; p.setMem('yom_kippur', true) } },
    ],
  },

  {
    id: 'rel_jewish_antisemitism',
    phase: 'teens',
    weight: 6,
    when: (G) => G.religion === 'jewish' && G.age >= 12 && G.age <= 22 && !G.mem?.antisemitism,
    text: (G) => `Someone at school discovers you\'re Jewish. The jokes start — small ones at first, then not small. ${G.character.country.archetype === 'post_soviet' ? 'Eastern Europe has not forgotten its old suspicions.' : 'You thought this country was different.'}`,
    choices: [
      { text: 'Report it to a teacher', tag: null, outcome: 'The teacher speaks to the class about tolerance. The jokes stop being said to your face. You still hear them.', effect: (p) => { p.m -= 5; p.e += 3; p.setMem('antisemitism', true) } },
      { text: 'Confront the person directly', tag: null, outcome: 'It goes better than expected, or much worse. Either way, you refuse to pretend it isn\'t happening.', effect: (p) => { p.m -= 3; p.s += 5; p.setMem('antisemitism', true) } },
      { text: 'Say nothing — endure it', tag: null, outcome: 'You become expert at the internal adjustment. The cost of this skill is not visible until later.', effect: (p) => { p.m -= 10; p.r += 8; p.setMem('antisemitism', true) } },
    ],
  },

  {
    id: 'rel_jewish_holocaust_memory',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.religion === 'jewish' && G.character.birthYear > 1945 && G.age >= 8 && G.age <= 16 && !G.mem?.holocaust_memory,
    text: 'A grandparent or older relative tells you about the war. Or they don\'t tell you — their silence says it instead. Either way, you understand that your being here is not certain. It was contingent. It was survived.',
    effect: (p) => { p.m -= 5; p.e += 5; p.karma += 5; p.addFlag('carries_generational_memory'); p.setMem('holocaust_memory', true) },
  },

  // ── HINDU ───────────────────────────────────────────────────────────────────

  {
    id: 'rel_hindu_puja_routine',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.religion === 'hindu' && G.age >= 5 && G.age <= 12 && !G.mem?.puja_routine,
    text: 'Every morning before school, your mother lights incense at the small shrine in the corner — a photograph of Ganesha, a brass lamp, marigolds when she can get them. You watch her hands.',
    choices: [
      { text: 'Learn the rituals and join her', tag: 'devout', outcome: 'The routine becomes yours. Prayer and action become the same gesture for you.', effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('devout'); p.setMem('puja_routine', true) } },
      { text: 'Watch but stay outside it', tag: null, outcome: 'You will think of your mother\'s hands at odd moments throughout your life — in hospital waiting rooms, in foreign cities.', effect: (p) => { p.m += 4; p.setMem('puja_routine', true) } },
    ],
  },

  {
    id: 'rel_hindu_upanayana',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.religion === 'hindu' && G.character.gender === 'male' && G.casteSystem && ['brahmin', 'kshatriya', 'vaishya'].includes(G.character.ethnicity) && G.age >= 8 && G.age <= 12 && !G.mem?.upanayana,
    text: 'The sacred thread ceremony — Upanayana. A priest ties the sacred thread across your chest. You are now twice-born. You must learn the Gayatri Mantra and recite it each morning.',
    choices: [
      { text: 'Take the ceremony seriously — this is who you are', tag: 'devout', outcome: 'You wear the thread every day. You say the mantra every morning. It becomes muscle memory, which is perhaps the point.', effect: (p) => { p.m += 10; p.e += 5; p.s += 3; p.addFlag('devout'); p.setMem('upanayana', true) } },
      { text: 'Go through it for your family\'s sake', tag: null, outcome: 'The thread is there but mostly forgotten. The ceremony meant more to your grandfather than to you.', effect: (p) => { p.m += 4; p.setMem('upanayana', true) } },
    ],
  },

  {
    id: 'rel_hindu_caste_dharma',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.religion === 'hindu' && G.casteSystem && G.age >= 8 && G.age <= 16 && !G.mem?.caste_dharma,
    text: (G) => {
      if (G.character.ethnicity === 'dalit') return 'A teacher explains varna — the four castes and their duties. You notice your family\'s name is not included. "What about us?" you ask. The teacher changes the subject.'
      if (G.character.ethnicity === 'brahmin') return 'You are taught that your caste carries a special obligation — to learning, to scripture, to the maintenance of proper order. This is your dharma.'
      return 'The idea of caste dharma is presented as natural order — each person born into their purpose. You accept it, or you don\'t, depending on where in the order you fall.'
    },
    choices: [
      { text: 'Accept the teaching — there is wisdom in tradition', tag: null, outcome: 'The framework provides structure. You fit yourself into it. It will take years to see what the fitting costs.', effect: (p) => { p.e += 3; p.setMem('caste_dharma', true) } },
      { text: 'Reject it — the hierarchy seems wrong', tag: 'activist', outcome: 'You read Ambedkar instead of Manu Smriti. A different framework begins to form.', effect: (p) => { p.e += 6; p.karma += 5; p.addFlag('activist'); p.setMem('caste_dharma', true) } },
    ],
  },

  {
    id: 'rel_hindu_diwali',
    phase: 'childhood',
    weight: 7,
    when: (G) => G.religion === 'hindu' && G.age >= 5 && G.age <= 14 && !G.mem?.diwali,
    text: 'Diwali. Every rooftop and windowsill carries a lamp. The whole city smells of gunpowder and marigolds and warm oil. Your family has been cooking for three days.',
    effect: (p) => { p.m += 15; p.setMem('diwali', true) },
  },

  // ── BUDDHIST ────────────────────────────────────────────────────────────────

  {
    id: 'rel_buddhist_meditation_teaching',
    phase: 'childhood',
    weight: 6,
    when: (G) => G.religion === 'buddhist' && ['Thailand', 'Myanmar', 'Cambodia', 'Sri Lanka', 'Vietnam', 'Laos'].includes(G.character.country.name) && G.age >= 8 && G.age <= 14 && !G.mem?.meditation_teaching,
    text: 'A monk from the temple sits with your class. He teaches you to breathe. "Watch the breath," he says. "Watch the wandering of the mind. Don\'t follow it." You are nine years old and this is the most difficult thing you have ever done.',
    choices: [
      { text: 'Practice seriously', tag: 'devout', outcome: 'You aren\'t very good at it. But you keep trying. Decades later, you still remember how to sit.', effect: (p) => { p.m += 8; p.mentalHealth += 5; p.addFlag('devout'); p.setMem('meditation_teaching', true) } },
      { text: 'Fidget through it', tag: null, outcome: 'Your mind goes everywhere. The monk is patient. You are not yet ready. Maybe later.', effect: (p) => { p.m += 2; p.setMem('meditation_teaching', true) } },
    ],
  },

  {
    id: 'rel_buddhist_monastery',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.religion === 'buddhist' && G.character.gender === 'male' && ['Thailand', 'Myanmar', 'Cambodia', 'Laos'].includes(G.character.country.name) && G.age >= 10 && G.age <= 15 && !G.mem?.monastery_option,
    text: 'A monk from your village temple visits your family. He tells your parents that the monastery school is excellent, free, and earns great merit for the family. You could study there for a year.',
    choices: [
      { text: 'Enter the monastery as a novice', tag: 'devout', outcome: 'You shave your head. You wear saffron. You wake at 4am. You learn things that are not written in textbooks.', effect: (p) => { p.e += 10; p.m += 5; p.karma += 8; p.addFlag('devout'); p.setMem('monastery_option', true) } },
      { text: 'Decline — you want to stay with your family', tag: null, outcome: 'Your parents are a little disappointed. But they accept it. You wonder sometimes what the other path was like.', effect: (p) => { p.m += 3; p.setMem('monastery_option', true) } },
    ],
  },

  // ── SIKH ────────────────────────────────────────────────────────────────────

  {
    id: 'rel_sikh_turban_dilemma',
    phase: 'teens',
    weight: 6,
    when: (G) => G.religion === 'sikh' && G.character.gender === 'male' && G.character.country.archetype === 'wealthy_west' && G.age >= 13 && G.age <= 18 && !G.mem?.turban_dilemma,
    text: 'In school photos you stand out. Some kids ask questions; others make jokes. Your father wears his dastar proudly. You\'re still figuring out what pride looks like for you.',
    choices: [
      { text: 'Wear it without compromise — this is who you are', tag: 'devout', outcome: 'It takes time, but your identity becomes something others come to you with questions about. You become an ambassador without asking for the role.', effect: (p) => { p.m += 5; p.s += 8; p.addFlag('devout'); p.setMem('turban_dilemma', true) } },
      { text: 'Trim your hair — easier to fit in', tag: null, outcome: 'Your father doesn\'t speak to you for a week. The choice leaves a mark that doesn\'t fade with the hair.', effect: (p) => { p.m -= 5; p.r += 8; p.clearFlag('devout'); p.setMem('turban_dilemma', true) } },
    ],
  },

  {
    id: 'rel_sikh_langar',
    phase: 'childhood',
    weight: 5,
    when: (G) => G.religion === 'sikh' && G.age >= 6 && G.age <= 14 && !G.mem?.langar,
    text: 'The langar — the Gurdwara\'s free kitchen — feeds anyone who comes, regardless of caste, religion, or wealth. You help serve today: ladling dal, handing out roti. The elderly man who comes in smells of the street. You serve him the same portion as everyone else.',
    effect: (p) => { p.m += 10; p.karma += 8; p.s += 3; p.setMem('langar', true) },
  },

  // ── ANIMIST / TRADITIONAL ───────────────────────────────────────────────────

  {
    id: 'rel_animist_ancestor_worship',
    phase: 'childhood',
    weight: 6,
    when: (G) => ['animist'].includes(G.religion) && G.age >= 6 && G.age <= 14 && !G.mem?.ancestor_worship,
    text: 'Your family keeps a small shrine for the ancestors. Food is placed there before meals. Decisions are made with reference to what the ancestors would approve. The dead are not gone; they are involved.',
    choices: [
      { text: 'Participate — the ancestors deserve honour', tag: 'devout', outcome: 'The ritual gives structure to grief and continuity. You understand why your grandmother says the dead are never truly absent.', effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('devout'); p.setMem('ancestor_worship', true) } },
      { text: 'Observe but keep your distance', tag: null, outcome: 'You respect the tradition without fully entering it. You are in between — which is its own kind of position.', effect: (p) => { p.m += 3; p.setMem('ancestor_worship', true) } },
    ],
  },

  {
    id: 'rel_animist_coming_of_age',
    phase: 'teens',
    weight: 6,
    when: (G) => ['animist'].includes(G.religion) && G.age >= 13 && G.age <= 17 && !G.mem?.animist_initiation,
    text: 'The initiation ceremony has been done in your village for as long as anyone can remember. You will spend several days in the bush, undergoing trials, learning what only adults are permitted to know.',
    choices: [
      { text: 'Enter the ceremony — this is your community', tag: 'devout', outcome: 'What happens there stays there. You return to the village changed. The elders look at you differently. You understand why.', effect: (p) => { p.m += 10; p.s += 8; p.karma += 5; p.addFlag('devout'); p.addFlag('initiated'); p.setMem('animist_initiation', true) } },
      { text: 'Refuse — you\'re not sure you believe', tag: null, outcome: 'The village is divided on this. Your father is silent for a long time. You stand outside something you cannot re-enter.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('animist_initiation', true) } },
    ],
  },

  // ── SECULAR / ATHEIST ───────────────────────────────────────────────────────

  {
    id: 'rel_atheist_family_clash',
    phase: 'teens',
    weight: 6,
    when: (G) => ['secular', 'atheist'].includes(G.religion) && G.age >= 14 && G.age <= 22 && !G.mem?.atheist_family_clash && ['subsaharan', 'developing_urban', 'developing_unstable', 'post_soviet', 'conflict_zone', 'wealthy_gulf'].includes(G.character.country.archetype),
    text: 'You tell your family you don\'t believe anymore. The silence that follows is its own kind of sound. Your mother looks as though you have said something that cannot be unsaid.',
    choices: [
      { text: 'Stand firm — this is your honest position', tag: null, outcome: 'The relationship survives, changed. Some things are never mentioned again. You learn that honesty has a price and decide it\'s worth paying.', effect: (p) => { p.m -= 8; p.e += 6; p.r += 5; p.setMem('atheist_family_clash', true) } },
      { text: 'Soften it — "I\'m still figuring it out"', tag: null, outcome: 'This buys peace but not resolution. You live in an ambiguity that is more comfortable for everyone and less honest for you.', effect: (p) => { p.m -= 3; p.r += 8; p.setMem('atheist_family_clash', true) } },
      { text: 'Take it back — it was too soon', tag: null, outcome: 'You go back to the motions. The rituals feel hollow now in a way they didn\'t before you knew you were performing.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('atheist_family_clash', true) } },
    ],
  },

  // ── INTERFAITH ──────────────────────────────────────────────────────────────

  {
    id: 'rel_interfaith_relationship',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.age >= 18 && G.age <= 32 && !G.mem?.interfaith_relationship && G.partner && !G.mem?.partner_religion_conflict && ['hindu', 'muslim_sunni', 'jewish', 'christian_catholic', 'christian_orthodox', 'sikh'].includes(G.religion),
    text: 'The person you love does not share your religion. Your families have strong opinions about this. Both families do.',
    choices: [
      { text: 'Choose your partner — love over family approval', tag: null, outcome: 'Some family members stop speaking to you. The wedding is complicated. The marriage, against expectation, is not.', effect: (p) => { p.m += 5; p.partnerRel(15); p.karma += 3; p.setMem('interfaith_relationship', true) } },
      { text: 'End it to avoid the conflict', tag: null, outcome: 'You do the expected thing. The expected thing leaves a scar.', effect: (p) => { p.m -= 15; p.r += 12; p.setMem('interfaith_relationship', true) } },
      { text: 'One of you converts — or pretends to', tag: null, outcome: 'A version of peace is achieved. Whether it\'s the real thing depends on the day.', effect: (p) => { p.m -= 5; p.partnerRel(5); p.setMem('interfaith_relationship', true) } },
    ],
  },

  {
    id: 'rel_apostasy_consequences',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.age >= 18 && G.age <= 30 && ['theocracy', 'absolute_monarchy'].includes(G.regime) && ['muslim_sunni', 'muslim_shia'].includes(G.religion) && !G.mem?.apostasy_risk,
    text: 'You no longer believe. In this country, leaving Islam is not simply a personal matter. It is a crime. Apostasy can mean prison, or worse, depending on who finds out.',
    choices: [
      { text: 'Keep it completely hidden — practise in public', tag: null, outcome: 'You become an expert at the performance of faith. The distance between your inner life and outer one is vast and cold.', effect: (p) => { p.m -= 15; p.r += 10; p.setMem('apostasy_risk', true) } },
      { text: 'Confide in one trusted person', tag: null, outcome: 'They don\'t betray you. The secret, shared, becomes slightly lighter.', effect: (p) => { p.m -= 5; p.setMem('apostasy_risk', true) } },
      { text: 'Find a way to leave the country', tag: null, outcome: 'The paperwork takes years. The day you board the flight you are shaking. You don\'t stop shaking for three days.', effect: (p) => { p.m -= 10; p.e += 5; p.addFlag('emigrated'); p.setMem('apostasy_risk', true) } },
    ],
  },

  // ── FAITH CRISIS WITH SPECIFIC THEOLOGICAL CONTENT ─────────────────────────

  {
    id: 'rel_faith_crisis_evolution',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('devout') && G.age >= 16 && G.age <= 28 && !G.mem?.faith_crisis_evolution &&
      ['christian_protestant', 'christian_catholic', 'christian_orthodox'].includes(G.religion) &&
      ['wealthy_west', 'wealthy_east', 'post_soviet', 'developing_urban'].includes(G.character.country.archetype),
    text: 'In a biology class — or a university lecture, or a book you picked up without expecting it — natural selection is explained with a precision and explanatory power that your Sunday school never addressed. You sit with the question that nobody in your faith community has answered satisfactorily: if the world was created over six days and the genealogies in Genesis are literal, what do you do with 3.8 billion years of microbial life in the fossil record? The two things do not fit together. You have known this was a tension. Now you cannot un-know it.',
    choices: [
      { text: 'Accept theistic evolution — God as the author of the process', tag: null, outcome: 'You find theologians and scientists who have walked this road before you. The faith is smaller and more honest. It survives.', effect: (p) => { p.e += 8; p.m -= 2; p.r += 2; p.addFlag('questioned_faith'); p.setMem('faith_crisis_evolution', true) } },
      { text: 'Reject creationism entirely — and feel the rest of the structure loosen', tag: null, outcome: 'One load-bearing wall comes down. Others follow. You are in a different place when the process ends — not certain of where, but honest about the journey.', effect: (p) => { p.e += 10; p.m -= 6; p.clearFlag('devout'); p.addFlag('questioned_faith'); p.setMem('faith_crisis_evolution', true) } },
      { text: 'Double down — science has its limits and faith has its domain', tag: 'devout', outcome: 'You find a congregation that does not treat this as a contradiction. The intellectual tension does not go away. You learn to live in it.', effect: (p) => { p.m += 3; p.addFlag('devout'); p.setMem('faith_crisis_evolution', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_faith_crisis_problem_of_evil',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('devout') && G.age >= 17 && G.age <= 30 && !G.mem?.faith_crisis_evil &&
      ['christian_protestant', 'christian_catholic', 'jewish', 'muslim_sunni'].includes(G.religion),
    text: 'Something happens — a child\'s death, a natural disaster, a senseless cruelty you witness or read about in precise detail — and the question sits in you without moving. If God is omnipotent, omniscient, and perfectly good, what is the explanation for this? You have heard "mysterious ways." You have heard "free will." The earthquake that buried the schoolchildren was not an act of human will. The children had none either. The theodicy problem is an old one. That does not make it easier.',
    choices: [
      { text: 'Wrestle with it — stay in the tradition while holding the question', tag: null, outcome: 'The faith you arrive at on the other side of this is not the faith you started with. It is more careful, less certain, and possibly stronger for having been tested. You find you are not the first to have sat with this: Job sat with it. Augustine sat with it. You are in good company.', effect: (p) => { p.e += 7; p.m -= 3; p.r += 3; p.addFlag('questioned_faith'); p.setMem('faith_crisis_evil', true) } },
      { text: 'Accept the limits of human understanding — faith is not answers', tag: 'devout', outcome: 'You learn the difference between explanation and presence. You stop requiring the former and look for the latter. This is a different kind of theology — not less demanding, differently demanding.', effect: (p) => { p.m += 4; p.addFlag('devout'); p.setMem('faith_crisis_evil', true) } },
      { text: 'Let it end the faith — you cannot reconcile this', tag: null, outcome: 'You stop going to services. Nobody asks you directly. You are not angry at God — you are done with the whole structure of the question. You find other frameworks. Some of them hold. None of them answer the problem of evil either.', effect: (p) => { p.e += 6; p.m -= 5; p.clearFlag('devout'); p.addFlag('questioned_faith'); p.setMem('faith_crisis_evil', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_faith_crisis_historical_criticism',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('devout') && G.age >= 18 && G.age <= 32 && !G.mem?.faith_crisis_text &&
      ['christian_protestant', 'christian_catholic', 'jewish'].includes(G.religion) &&
      G.stats.smarts >= 55,
    text: 'A university course, or a book, or a conversation with someone who knows more than they let on — and suddenly you are looking at historical-critical scholarship on the biblical texts. The Documentary Hypothesis. Deutero-Isaiah. The consensus among archaeologists that there is no evidence of a large-scale Exodus from Egypt. The texts were written and edited across centuries, by multiple authors, in response to specific political and theological pressures of their time. The Bible, examined this way, is a human document.',
    choices: [
      { text: 'Engage it fully — the historical understanding changes but does not destroy', tag: null, outcome: 'You read Bart Ehrman and also the theologians who have read Bart Ehrman and remained believers. You arrive at a faith that does not require a supernatural origin for the text. It asks something different of you, and you give it.', effect: (p) => { p.e += 10; p.m -= 3; p.addFlag('questioned_faith'); p.setMem('faith_crisis_text', true) } },
      { text: 'Retreat from the scholarship — you do not want this knowledge', tag: null, outcome: 'You close the book. The question stays. It will come back in a different form. Questions of this kind always do.', effect: (p) => { p.m -= 4; p.r += 5; p.setMem('faith_crisis_text', true) } },
      { text: 'Accept it and let the faith go', tag: null, outcome: 'You call yourself "culturally" your religion now. You keep the holidays for the community. The metaphysics you leave behind. You feel, strangely, lighter.', effect: (p) => { p.e += 8; p.m += 2; p.clearFlag('devout'); p.setMem('faith_crisis_text', true) } },
    ],
    effect: null,
  },

  // ── RAMADAN AND EID ─────────────────────────────────────────────────────────

  {
    id: 'rel_ramadan_minority_country',
    phase: 'young_adult',
    weight: 4,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) &&
      G.character.country.archetype === 'wealthy_west' &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.ramadan_minority,
    text: 'Ramadan in a country where almost nobody else is fasting. The workday does not pause for Maghrib. Your colleagues eat lunch at the table next to yours and do not notice. You wake before dawn for suhoor alone — no family, no call to prayer audible through the window — and the fast is held together by intention rather than architecture. At iftar you break it with a date and water in a break room and call your mother.',
    choices: [
      { text: 'Keep the fast fully, privately', tag: 'devout', outcome: 'By the end of the month you understand something about interiority — that the practice does not require a collective infrastructure to be real. The Eid prayer you attend in a community center in an industrial part of the city is the most alive thing you have felt all year.', effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('devout'); p.setMem('ramadan_minority', true) } },
      { text: 'Modify the fast — make it workable', tag: null, outcome: 'You fast on the weekends and manage what you can during the week. You feel guilty and pragmatic in roughly equal measure. The intention is real. The execution is human.', effect: (p) => { p.m -= 2; p.r += 3; p.setMem('ramadan_minority', true) } },
      { text: 'Let this Ramadan pass — next year you will be better placed', tag: null, outcome: 'You watch the month come and go. The absence is noticeable in the way that skipping something important is always noticeable.', effect: (p) => { p.m -= 4; p.r += 4; p.setMem('ramadan_minority', true) } },
    ],
    effect: null,
  },

  {
    id: 'rel_eid_al_fitr',
    phase: 'childhood',
    weight: 6,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 5 && G.age <= 14 && !G.mem?.eid_childhood,
    text: 'The moon is announced. Ramadan is over. Eid al-Fitr begins at Fajr with a prayer that cannot be prayed at home — it must be done in congregation, in the open air or in the mosque, everyone in clean clothes, the children in new ones if the family can manage it. There is your grandmother\'s semolina, the neighbors bringing sweets, the money pressed into your hands by relatives. The holiday is three days but the first morning is the one.',
    choices: null,
    effect: (p) => { p.m += 14; p.karma += 4; p.setMem('eid_childhood', true) },
  },
]

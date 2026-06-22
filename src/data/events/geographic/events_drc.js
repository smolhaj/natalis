// DR Congo historical arc events — BUILD 11 extension
// Covers Mobutu kleptocracy, Congo Wars, coltan mining, independence generation.

export const DRC_EVENTS = [

  // ── INDEPENDENCE GENERATION ───────────────────────────────────────────────

  {
    id: 'drc_independence_speech',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1960 && G.currentYear <= 1963 && !G.mem?.drcIndependence,
    text: 'On June 30, 1960, Lumumba takes the microphone at independence and says the things that were not supposed to be said — the Congo for Congolese people, the end of the humiliation. Your family listens to the radio. The word dignity is used several times. It sounds different when you are allowed to say it in public.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 5; p.addFlag('independence_generation_drc'); p.setMem('drcIndependence', true); },
  },

  {
    id: 'drc_lumumba_death_news',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1961 && G.currentYear <= 1962 && !G.mem?.drcLumumba,
    text: 'The radio announces that Lumumba died trying to escape. Nobody in your household believes the escape story. The first prime minister of an independent Congo — gone five months in. The silence at the table is the kind that children understand without being told what it means.',
    choices: null,
    effect: (p) => { p.m -= 15; p.addFlag('lumumba_generation'); p.setMem('drcLumumba', true); },
  },

  // ── MOBUTU ERA ────────────────────────────────────────────────────────────

  {
    id: 'drc_mobutu_authenticite',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1971 && G.currentYear <= 1978 && !G.mem?.drcAuthentic,
    text: 'The president has renamed the country Zaïre and himself Mobutu Sese Seko Kuku Ngbendu Wa Za Banga. Foreign names are banned. Your family\'s surname must change. The school has new textbooks with his portrait. In Kinshasa, you can buy a watch with his face that appears from under a cloud when you tilt it.',
    choices: [
      {
        text: 'Accept the new name — it costs nothing visible',
        tag: null,
        outcome: 'The paperwork takes three weeks and a bribe at the municipal office. The old name is not forgotten — it moves to the private register of your family.',
        effect: (p) => { p.addFlag('authenticite_complied'); p.setMem('drcAuthentic', true); },
      },
      {
        text: 'Keep using the old name at home',
        tag: null,
        outcome: 'You are careful about where. The distinction between public names and real names is something your generation learns early.',
        effect: (p) => { p.m -= 3; p.addFlag('authenticite_resisted'); p.setMem('drcAuthentic', true); },
      },
    ],
  },

  {
    id: 'drc_mobutu_institution_decay',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1975 && G.currentYear <= 1996 && G.career && !G.mem?.drcDecay,
    text: 'The ministry where you work has not paid salaries in four months. The official explanation changes weekly. In the interim, you learn what everyone else has already learned: that your salary is a theoretical quantity, and your actual income depends on what your position allows you to extract from those who need what you can provide. This system has a name, though people do not say it openly.',
    choices: [
      {
        text: 'Participate in the informal system — you have no choice',
        tag: null,
        outcome: 'You are not corrupt. You are employed in a system that has substituted corruption for salary. The distinction matters to you and to nobody else.',
        effect: (p) => { p.mo += 800; p.r += 8; p.addFlag('mobutu_system_navigated'); p.setMem('drcDecay', true); },
      },
      {
        text: 'Refuse — find other work',
        tag: null,
        outcome: 'You leave the ministry. The work you find is more precarious but is yours in a different way.',
        effect: (p) => { p.mo -= 600; p.karma += 8; p.m += 4; p.addFlag('refused_corruption'); p.setMem('drcDecay', true); },
      },
    ],
  },

  // ── CONGO WARS ────────────────────────────────────────────────────────────

  {
    id: 'drc_second_congo_war',
    phase: null,
    weight: 3,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1998 && G.currentYear <= 2003 && !G.mem?.drcWar2,
    text: 'The war that started in the east has spread. Nine countries now have soldiers somewhere in your country. None of them call it an invasion. The front is not a line — it is a patchwork of armed groups, each controlling a territory, each with a flag you do not recognize and a commander whose name you learn when he is replaced by another. The economy in the east is minerals. The economy in the east has always been minerals.',
    choices: null,
    effect: (p) => { p.m -= 18; p.h -= 10; p.addFlag('congo_war_generation'); p.setMem('drcWar2', true); },
  },

  {
    id: 'drc_eastern_displacement',
    phase: null,
    weight: 2,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1996 && G.currentYear <= 2010 && !G.mem?.drcDisplaced && G.character.ruralUrban === 'rural',
    text: 'The armed group that controls your part of the forest has changed. You know this because the uniform colour has changed and the questions at the checkpoint are different. Last month, three families from the next village came to stay because their village was burned. This week you are preparing the same bundle they arrived with.',
    choices: [
      {
        text: 'Leave — reach Kinshasa or a camp across the border',
        tag: null,
        outcome: 'The road takes two weeks. You arrive with what you could carry, which is less than you had, which was already not much.',
        effect: (p) => { p.m -= 20; p.h -= 12; p.addFlag('internally_displaced'); p.addFlag('grew_up_in_camp'); p.setResidency('refugee_status'); p.setMem('drcDisplaced', true); },
      },
      {
        text: 'Stay — this village is your family\'s land',
        tag: null,
        outcome: 'The group that comes is not the worst one. You pay what they demand and they leave. You have no way of knowing if the next group will also leave.',
        effect: (p) => { p.m -= 12; p.mo -= 500; p.addFlag('stayed_under_occupation'); p.setMem('drcDisplaced', true); },
      },
    ],
  },

  // ── COLTAN MINING ─────────────────────────────────────────────────────────

  {
    id: 'drc_coltan_mine',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1998 && G.currentYear <= 2020 && !G.career && !G.mem?.drcColtan && G.character.ruralUrban === 'rural',
    text: 'The mine is two hours\' walk from the village. The mineral is called coltan — columbite-tantalite. The traders say it goes into mobile phones. The irony of this is not lost on anyone. You work with a hand shovel in a pit that is not properly shored. The price fluctuates wildly depending on factors happening in markets in cities you will never visit. On a good month you earn forty dollars.',
    choices: [
      {
        text: 'Work the mine — it is income',
        tag: null,
        outcome: 'You work it for a season. The money is real. So is the cost on your body. You have seen what the men who worked it for five years look like.',
        effect: (p) => { p.mo += 600; p.h -= 8; p.addFlag('coltan_worker'); p.setMem('drcColtan', true); },
      },
      {
        text: 'Find other work — even if it pays less',
        tag: null,
        outcome: 'The alternatives are limited. You take what you can find. The mine is always there if nothing else presents itself.',
        effect: (p) => { p.mo += 200; p.karma += 5; p.setMem('drcColtan', true); },
      },
    ],
  },

  {
    id: 'drc_kinshasa_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.country.name === 'DR Congo' && G.currentYear >= 1970 && G.character.ruralUrban !== 'rural' && !G.mem?.drcKinshasaLife,
    text: 'Kinshasa is the second-largest French-speaking city in the world and the power is out four days out of seven. The streets fill after dark anyway — the generators run the bars, and the bars run the music, and the music is specifically this city\'s music: *soukous*, a rhythm that exists nowhere else at quite this tempo. You do not need electricity to dance.',
    choices: null,
    effect: (p) => { p.m += 6; p.s += 4; p.addFlag('kinshasa_generation'); p.setMem('drcKinshasaLife', true); },
  },

  // ── CHURCH AND DAILY LIFE ─────────────────────────────────────────────────

  {
    id: 'drc_church_community',
    phase: 'childhood',
    weight: 3,
    cooldown: 10,
    when: (G) => G.character.country.name === 'DR Congo' && !G.mem?.drcChurch,
    text: 'Sunday is three services. The first at seven, the second at ten, the third in the afternoon for the children\'s choir. The church is the institution that functions. The school may close; the hospital may have no medicine; the government may change its name again. The church continues. The pastor knows more about what is happening in the neighbourhood than the police do.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 3; p.addFlag('church_community'); p.setMem('drcChurch', true); },
  },

  // ── BUILD 11 DEPTH: MOBUTU-ERA TEACHER ───────────────────────────────────

  {
    id: 'drc_zaire_teacher',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'DR Congo' &&
      G.currentYear >= 1975 && G.currentYear <= 1996 &&
      G.career?.id === 'teacher' &&
      !G.mem?.drcZaireTeacher,
    text: 'The Ministry of Education has not sent new textbooks in four years. The curriculum still refers to the country as Zaire, though the official name changes again this year or the next. Your salary arrived in January and not since. What this means, practically, is that you teach on credit — credit you extend to yourself and to your students, secured against nothing. The chalk runs out in April. You teach anyway, writing on the ground outside when the room is too dark.',
    choices: [
      {
        text: 'Find ways to supplement — private tutoring, whatever is available',
        tag: null,
        outcome: 'The tutoring income is irregular but real. You become known as the teacher who stayed when others left for Kinshasa. This is both a compliment and a description of your options.',
        effect: (p) => { p.mo += 800; p.r += 5; p.addFlag('zaire_teacher_generation'); p.setMem('drcZaireTeacher', true) },
      },
      {
        text: 'Stay and teach without supplementing — the job is the job',
        tag: null,
        outcome: 'You teach without being paid in the way the state promised. Your students know this. Some of them bring eggs or cassava. You accept because refusing would be unkind.',
        effect: (p) => { p.mo -= 400; p.karma += 10; p.m -= 8; p.addFlag('zaire_teacher_generation'); p.setMem('drcZaireTeacher', true) },
      },
    ],
  },

  // ── BUILD 11 DEPTH: SECOND CONGO WAR — BUKAVU/KIVU ───────────────────────

  {
    id: 'drc_bukavu_1998',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'DR Congo' &&
      G.currentYear >= 1998 && G.currentYear <= 2003 &&
      G.character.ruralUrban !== 'rural' &&
      !G.mem?.drcBukavu,
    text: 'Bukavu changes hands twice in one month. The group that controls it now has a different name from the group that controlled it last month. The flags are different; the checkpoints are in the same places. You have a friend who works for a UN agency and he tells you things — casualty estimates, group movements — that are not on the radio. The radio has its own account. Between your friend\'s information and the radio\'s account is a gap you learn to live inside. You go to work in the morning. Sometimes work is there and sometimes it is not, depending on who controls the road.',
    choices: null,
    effect: (p) => { p.m -= 15; p.e += 4; p.addFlag('second_congo_war_urban_generation'); p.setMem('drcBukavu', true) },
  },

]

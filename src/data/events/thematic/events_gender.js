export const GENDER_EVENTS = [

  // ── FEMALE EDUCATION GATEKEEPING ───────────────────────────────────────────

  {
    id: 'fg_father_keeps_home',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.age >= 10 && G.age <= 14 &&
      G.character.ruralUrban === 'rural' &&
      !G.mem?.edu_pressure_1,
    text: 'Your father tells you at breakfast that you will not be going to school today. There is water to fetch, the younger children to watch, the field needs you. He does not look at you when he says it.',
    context: null,
    choices: [
      {
        text: 'Obey — the family needs you',
        tag: 'family_sacrifice',
        outcome: 'Days become weeks. The school year slips past. You are eleven years old and already learning what your future looks like.',
        effect: (p) => { p.e -= 6; p.r += 5; p.setMem('edu_pressure_1', true); p.addFlag('education_interrupted'); },
        inject: null,
      },
      {
        text: 'Go to school anyway — accept the punishment',
        tag: 'defiant',
        outcome: 'Your father is furious. Your mother cries. But you go. And you keep going.',
        effect: (p) => { p.e += 4; p.m -= 5; p.s -= 3; p.setMem('edu_pressure_1', true); p.addFlag('defiant_learner'); },
        inject: null,
      },
      {
        text: 'Negotiate — offer to go to school in the mornings and work afternoons',
        tag: 'pragmatist',
        outcome: 'He agrees, grudgingly. Half a school day is still something.',
        effect: (p) => { p.e += 1; p.s += 3; p.setMem('edu_pressure_1', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_brothers_first',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      ['low_medium', 'low', 'very_low'].includes(G.character.country.gdp) &&
      G.age >= 10 && G.age <= 14,
    text: 'School fees must be paid. Your parents have enough for one child this term. Your brother is enrolled. You are not. "Next year," your mother says. Next year she will say the same thing.',
    context: null,
    choices: [
      {
        text: 'Accept it quietly',
        tag: null,
        outcome: 'You watch your brother leave with his books each morning. You learn what your place is.',
        effect: (p) => { p.e -= 5; p.r += 6; p.m -= 4; p.addFlag('education_denied'); },
        inject: null,
      },
      {
        text: 'Ask a neighbor or relative to sponsor your fees',
        tag: 'resourceful',
        outcome: 'An aunt takes pity. It is humiliating and lifesaving in equal measure.',
        effect: (p) => { p.e += 2; p.s += 3; p.m -= 2; },
        inject: null,
      },
      {
        text: 'Find work to pay your own fees',
        tag: 'self_reliant',
        outcome: 'You carry firewood to the market before dawn. You earn enough. You arrive at school exhausted and proud.',
        effect: (p) => { p.e += 3; p.h -= 3; p.w += 2; p.addFlag('self_reliant'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_teacher_dismisses',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 12 && G.age <= 16 &&
      G.character.country.genderGap > 0.20,
    text: (G) => `Your teacher is going over university paths. When you ask about the science programme, he pauses. "You'll just get married anyway," he says, and moves on. Three boys snicker. Two girls look at their desks.`,
    context: null,
    choices: [
      {
        text: 'Say nothing — you are used to this',
        tag: null,
        outcome: 'The lesson continues. You write the science programme details in your notebook anyway.',
        effect: (p) => { p.m -= 4; p.r += 3; },
        inject: null,
      },
      {
        text: 'Challenge him in front of the class',
        tag: 'vocal',
        outcome: 'His face reddens. He tells you to sit down. But you said it. The girls who looked at their desks heard you.',
        effect: (p) => { p.m += 3; p.s += 4; p.e += 2; p.addFlag('challenges_authority'); },
        inject: null,
      },
      {
        text: 'Report it to the headteacher',
        tag: 'principled',
        outcome: 'The headteacher nods politely and nothing changes. But your file now has an asterisk next to it: this one pushes back.',
        effect: (p) => { p.m -= 2; p.e += 3; p.addFlag('principled'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_university_shameful',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 17 && G.age <= 22 &&
      (
        G.character.country.archetype === 'wealthy_gulf' ||
        (G.character.country.archetype === 'subsaharan' && G.character.ruralUrban === 'rural') ||
        G.character.country.genderGap > 0.35
      ),
    text: 'Your acceptance letter arrived. A university in the city. Your uncle calls a family meeting. "A woman living alone in the city — what kind of message does that send?" Your father has not spoken yet.',
    context: null,
    choices: [
      {
        text: 'Accept and go — let the family be angry',
        tag: 'independent',
        outcome: 'Two cousins stop talking to you. Your father eventually comes around, slowly, when you do well. The city is hard and exhilarating.',
        effect: (p) => { p.e += 10; p.s -= 4; p.m += 3; p.addFlag('first_gen_graduate'); },
        inject: null,
      },
      {
        text: 'Negotiate — offer to live with relatives near the university',
        tag: 'pragmatist',
        outcome: 'A compromise. Your aunt watches you like a guard. But you are there.',
        effect: (p) => { p.e += 7; p.s -= 1; p.m -= 2; },
        inject: null,
      },
      {
        text: 'Decline the offer to keep the peace',
        tag: null,
        outcome: 'Everyone says you made the wise choice. The letter sits in your drawer for years.',
        effect: (p) => { p.r += 10; p.m -= 8; p.addFlag('opportunity_refused'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_female_surpasses_peers',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 14 && G.age <= 18 &&
      ['developing_urban', 'subsaharan'].includes(G.character.country.archetype) &&
      G.stats.smarts >= 55,
    text: 'You scored highest in the class exam. Your teacher announced it. Three of the boys who used to ask to copy your work now refuse to sit near you. One of their mothers came to see the headteacher, suggesting there must have been a mistake.',
    context: null,
    choices: [
      {
        text: 'Keep your head down and keep performing',
        tag: 'resilient',
        outcome: 'You earn a scholarship shortlist. The resentment continues. So does your work.',
        effect: (p) => { p.e += 5; p.m -= 2; p.s -= 3; },
        inject: null,
      },
      {
        text: 'Build alliances with the girls who also want to succeed',
        tag: 'community_builder',
        outcome: 'A small group forms. You study together. The hostility feels less isolating.',
        effect: (p) => { p.e += 3; p.s += 5; p.m += 4; p.addFlag('female_solidarity'); },
        inject: null,
      },
      {
        text: 'Start downplaying your results to avoid conflict',
        tag: null,
        outcome: 'The pressure eases. So do your marks. You wonder later what that cost you.',
        effect: (p) => { p.e -= 3; p.r += 5; p.m -= 1; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_first_to_graduate',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype) &&
      G.flags.includes('university_graduate') &&
      !G.flags.includes('first_gen_graduate') &&
      G.stats.smarts >= 50,
    text: 'You are the first woman in your family to receive a university degree. Your grandmother does not understand what it means. Your mother cries. At the ceremony, your father sits very straight in the plastic chair and does not look away from you once.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 12; p.e += 5; p.s += 4; p.addFlag('first_gen_graduate'); p.karma += 5; },
  },

  {
    id: 'fg_adult_literacy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'subsaharan' &&
      G.character.ruralUrban === 'rural' &&
      G.flags.includes('education_denied'),
    text: 'A women\'s cooperative in your village has started an adult literacy class. It meets three mornings a week. Your husband has opinions about this.',
    context: null,
    choices: [
      {
        text: 'Attend — you have waited long enough',
        tag: 'determined',
        outcome: 'By the third month you can read the labels on medicine packets. By the sixth you write a letter to your daughter at boarding school.',
        effect: (p) => { p.e += 8; p.m += 10; p.clearFlag('education_denied'); p.addFlag('literate_adult'); },
        inject: null,
      },
      {
        text: 'Attend in secret when he is working',
        tag: 'resilient',
        outcome: 'The hiding adds stress. The reading adds something greater.',
        effect: (p) => { p.e += 6; p.m += 6; p.h -= 2; p.addFlag('literate_adult'); },
        inject: null,
      },
      {
        text: 'Decline — the household conflict is not worth it',
        tag: null,
        outcome: 'The class runs for two seasons. Women around you change. You watch.',
        effect: (p) => { p.r += 6; p.m -= 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_scholarship_refused',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 15 && G.age <= 18 &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.stats.smarts >= 60,
    text: 'An NGO has offered you a full scholarship to secondary school in the district town. You would need to board there. Your family says no. The school is far. You are a girl. There are things that happen to girls away from home.',
    context: null,
    choices: [
      {
        text: 'Convince them — bring the NGO worker to explain to your parents',
        tag: 'resourceful',
        outcome: 'The NGO worker is a woman herself. Your mother changes her vote. It takes three more conversations before your father does.',
        effect: (p) => { p.e += 9; p.s += 4; p.m += 5; p.addFlag('scholarship_recipient'); },
        inject: null,
      },
      {
        text: 'Accept their decision',
        tag: null,
        outcome: 'The scholarship goes to another girl. You hear she became a nurse.',
        effect: (p) => { p.r += 8; p.m -= 6; p.e -= 3; },
        inject: null,
      },
      {
        text: 'Go without their blessing',
        tag: 'independent',
        outcome: 'They do not speak to you for months. You complete the year with the highest marks in your class and the loneliness of someone who chose themselves over belonging.',
        effect: (p) => { p.e += 12; p.m -= 4; p.s -= 5; p.r += 3; p.addFlag('scholarship_recipient'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_stem_not_for_girls',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.age >= 12 && G.age <= 16 &&
      G.currentYear >= 1960 && G.currentYear <= 1985,
    text: (G) => `It is ${G.currentYear}. You have scored the highest in your year in mathematics. Your school counselor suggests you consider home economics or typing. "Science and engineering are difficult for girls," she says, not unkindly. "You don't want to be the only one in the room."`,
    context: null,
    choices: [
      {
        text: 'Take the science path anyway',
        tag: 'pioneer',
        outcome: 'You will often be the only one in the room. It is exactly as uncomfortable as she warned, and worth it.',
        effect: (p) => { p.e += 8; p.m -= 3; p.s -= 2; p.addFlag('stem_pioneer'); },
        inject: null,
      },
      {
        text: 'Take the recommended path — it is easier',
        tag: null,
        outcome: 'The friction disappears. Later, when the world changes, you think about what you might have done.',
        effect: (p) => { p.r += 6; p.m -= 2; },
        inject: null,
      },
      {
        text: 'Find a female science teacher or mentor outside school',
        tag: 'resourceful',
        outcome: 'She exists. She is remarkable. She introduces you to others like yourself.',
        effect: (p) => { p.e += 6; p.m += 5; p.s += 3; p.addFlag('mentored'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_title_ix_opportunity',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'United States' &&
      G.age >= 10 && G.age <= 22 &&
      G.currentYear >= 1972 && G.currentYear <= 1982,
    text: (G) => `It is ${G.currentYear}. Title IX passed two years ago. Your school is required to offer girls the same sports programs as boys. The girls' soccer team is new. The equipment is secondhand. The coach is coaching her first season. You have never been asked if you wanted to play.`,
    context: null,
    choices: [
      {
        text: 'Join the team',
        tag: 'athlete',
        outcome: 'The secondhand gear does not matter. The team is something new in the world, and you are part of it.',
        effect: (p) => { p.h += 6; p.s += 5; p.m += 5; p.addFlag('athlete'); },
        inject: null,
      },
      {
        text: 'Join but focus on the academic scholarship it unlocks',
        tag: 'strategic',
        outcome: 'Both work out. Sport becomes a means; it also becomes something you care about.',
        effect: (p) => { p.h += 4; p.e += 3; p.s += 3; },
        inject: null,
      },
      {
        text: 'Not interested in sports — but you push for a girls\' debate team instead',
        tag: 'activist',
        outcome: 'The school creates one after a semester of your letters to the principal.',
        effect: (p) => { p.s += 7; p.e += 4; p.addFlag('activist'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_pregnancy_interrupts_education',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      !G.flags.includes('education_interrupted'),
    text: 'You become pregnant during your second year. The school has a policy: pregnant students must leave. You had not known this was the policy until the headmistress read it to you from a yellowing document.',
    context: null,
    choices: [
      {
        text: 'Leave and plan to return after the birth',
        tag: null,
        outcome: 'You return. Most women don\'t. You do, because you have written it on the inside of your wrist.',
        effect: (p) => { p.e -= 3; p.r += 4; p.addFlag('education_interrupted'); },
        inject: null,
      },
      {
        text: 'Challenge the policy — contact a women\'s rights organization',
        tag: 'activist',
        outcome: 'The case takes months. You lose this round. But the organization puts your case on file, and three years later the policy changes.',
        effect: (p) => { p.e -= 5; p.m -= 3; p.s += 5; p.karma += 5; p.addFlag('activist'); p.addFlag('education_interrupted'); },
        inject: null,
      },
      {
        text: 'Continue studying privately and sit exams when eligible',
        tag: 'determined',
        outcome: 'Without a school, textbooks and your sister\'s old notes become everything.',
        effect: (p) => { p.e -= 2; p.h -= 4; p.m -= 2; p.addFlag('education_interrupted'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fg_return_to_school',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('education_interrupted'),
    text: 'Your youngest child starts school. You look at the empty morning. A neighbor mentions a distance-learning programme. You have not been a student in fifteen years. You have been a mother, a wife, a workhorse. You still have the notebooks.',
    context: null,
    choices: [
      {
        text: 'Enroll — use the morning hours',
        tag: 'determined',
        outcome: 'The first assignment takes you four attempts. The second one takes two. By the third month you are helping the other women in the group.',
        effect: (p) => { p.e += 7; p.m += 9; p.clearFlag('education_interrupted'); p.addFlag('returned_to_education'); },
        inject: null,
      },
      {
        text: 'Enroll but tell no one — in case you fail',
        tag: null,
        outcome: 'You pass. You tell people after.',
        effect: (p) => { p.e += 5; p.m += 7; p.clearFlag('education_interrupted'); },
        inject: null,
      },
      {
        text: 'Decide it is too late now',
        tag: null,
        outcome: 'Maybe. Or maybe not.',
        effect: (p) => { p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── CHILD MARRIAGE ─────────────────────────────────────────────────────────

  {
    id: 'cm_family_arranges_marriage',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 13 && G.age <= 16 &&
      G.character.country.childMarriageRisk > 0.25 &&
      (G.religion === 'muslim_sunni' || G.religion === 'hindu') &&
      G.character.ruralUrban === 'rural',
    text: 'Your father has accepted. A man from a family in the next village, thirty-one years old. The wedding will be before the rains. Your mother helps you pack a small bag. She does not meet your eyes.',
    context: null,
    choices: [
      {
        text: 'Comply — you have no way out',
        tag: null,
        outcome: 'The wedding happens. You become a wife at fourteen. The weight of what has been decided for you settles into the bones.',
        effect: (p) => { p.m -= 15; p.r += 10; p.h -= 5; p.addFlag('child_marriage'); p.addFlag('married'); },
        inject: null,
      },
      {
        text: 'Refuse and run — to a relative, a teacher, anywhere',
        tag: 'defiant',
        outcome: 'You run to your teacher, who runs to an NGO. The process is terrifying. The family is furious. You are not married at fourteen. The cost is exile from everyone who raised you.',
        effect: (p) => { p.m -= 6; p.s += 5; p.r += 4; p.addFlag('defiant'); p.addFlag('family_rift'); },
        inject: null,
      },
      {
        text: 'Beg your mother to delay it one year — to finish school',
        tag: null,
        outcome: 'She cries. She says she cannot. She does anyway, buying you a single year. It is not nothing.',
        effect: (p) => { p.m -= 8; p.e += 4; p.r += 6; p.addFlag('child_marriage_delayed'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cm_bride_price',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 13 && G.age <= 17 &&
      G.character.country.archetype === 'subsaharan' &&
      G.character.country.childMarriageRisk > 0.15 &&
      G.parents?.father?.alive !== false,
    text: 'An older man\'s family has come to yours. They have brought cattle and cash. Your father counts it carefully. Nobody asks you anything. You understand this is already decided.',
    context: null,
    choices: [
      {
        text: 'Tell your mother you do not want this',
        tag: null,
        outcome: 'Your mother holds your hands and says: "Do you think I wanted mine?" She means this as comfort. It is not.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('child_marriage'); p.addFlag('married'); },
        inject: null,
      },
      {
        text: 'Go to the village headwoman — she has stopped marriages before',
        tag: 'resourceful',
        outcome: 'She is older than your grandmother. She listens. She speaks to your father privately. The men leave with their cattle. Your father does not speak to you for six months. You go to school.',
        effect: (p) => { p.m -= 5; p.e += 5; p.s += 3; p.addFlag('family_rift'); },
        inject: null,
      },
      {
        text: 'Accept — you have nowhere to go',
        tag: null,
        outcome: 'You become his third wife. His first wife teaches you how to manage the household and stays kind to you. It is not the worst thing. It is not what you wanted.',
        effect: (p) => { p.m -= 12; p.r += 7; p.addFlag('child_marriage'); p.addFlag('married'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cm_taken_from_school',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 12 && G.age <= 15 &&
      G.character.country.childMarriageRisk > 0.30,
    text: 'Your father comes to the school gate on a Tuesday. You think something is wrong. He tells your teacher you will not be returning. You are twelve years old. Your teacher watches you go.',
    context: null,
    choices: null,
    effect: (p) => { p.e -= 8; p.m -= 12; p.r += 8; p.addFlag('education_denied'); p.addFlag('child_marriage'); },
  },

  {
    id: 'cm_first_pregnancy_young',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 14 && G.age <= 17 &&
      G.flags.includes('child_marriage') &&
      ['very_low', 'low'].includes(G.character.country.gdp),
    text: 'You are pregnant. You are fifteen. You know something is wrong when the bleeding starts. The midwife is three hours away. Your body is not ready for this.',
    context: null,
    choices: [
      {
        text: 'Get to the midwife',
        tag: null,
        outcome: 'Your mother-in-law carries you on her back for part of the journey. The baby does not survive. You do — barely. You do not speak for weeks.',
        effect: (p) => { p.h -= 18; p.m -= 20; p.r += 10; p.addFlag('medical_trauma'); },
        inject: null,
      },
      {
        text: 'There is no way to travel — wait and hope',
        tag: null,
        outcome: 'You lose the baby. The infection afterward is what nearly kills you. A traditional healer is found. You recover. You are changed.',
        effect: (p) => { p.h -= 22; p.m -= 18; p.r += 12; p.addFlag('medical_trauma'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cm_older_husband_imbalance',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('child_marriage') &&
      G.age >= 14 && G.age <= 20,
    text: 'He is twenty-two years older than you. He makes every decision. You eat what he chooses, sleep when he allows, see your family when he permits. You are not beaten. You are also not a person yet. You are still becoming one.',
    context: null,
    choices: [
      {
        text: 'Find small ways to assert yourself — learn, build relationships, earn money',
        tag: 'resilient',
        outcome: 'Small freedoms become larger ones over years. It is slow. It is real.',
        effect: (p) => { p.m += 3; p.s += 4; p.e += 3; },
        inject: null,
      },
      {
        text: 'Go inward — build an inner life they cannot reach',
        tag: null,
        outcome: 'You find a self inside the container they have put you in. It is enough, for now.',
        effect: (p) => { p.m += 2; p.e += 2; },
        inject: null,
      },
      {
        text: 'Comply in everything — make the household run smoothly',
        tag: null,
        outcome: 'He is satisfied. The satisfaction is not yours.',
        effect: (p) => { p.r += 6; p.m -= 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cm_ngo_intervention',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.age >= 12 && G.age <= 15 &&
      G.character.country.archetype === 'subsaharan' &&
      G.character.ruralUrban === 'rural',
    text: 'A woman from an NGO comes to your school. She is talking to girls privately. When it is your turn, she asks if there are any plans being made for your marriage. Your family has been discussing a man in the next town. You do not know what to say.',
    context: null,
    choices: [
      {
        text: 'Tell her the truth',
        tag: 'honest',
        outcome: 'She visits your family. The conversation is tense. The wedding is postponed. The postponement becomes indefinite. You finish school.',
        effect: (p) => { p.e += 7; p.m += 4; p.s += 3; p.addFlag('defiant'); },
        inject: null,
      },
      {
        text: 'Say nothing — you are afraid of what happens if you speak',
        tag: null,
        outcome: 'She gives you a phone number and leaves. You keep the paper.',
        effect: (p) => { p.m -= 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'cm_adult_regret_reflection',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('child_marriage'),
    text: 'Your daughter comes home from school with a project about careers. She has filled the paper with plans — doctor, engineer, pilot. You help her with the spelling. You think about the Tuesday when your father came to the school gate. You were her age.',
    context: null,
    choices: [
      {
        text: 'Tell her what happened to you',
        tag: 'honest',
        outcome: 'She is quiet for a long time. Then she says she will never let that happen to her daughter. You say: "I know." You mean it as a promise.',
        effect: (p) => { p.m += 5; p.r -= 3; p.karma += 5; },
        inject: null,
      },
      {
        text: 'Say nothing — let her plans be uncomplicated by your history',
        tag: null,
        outcome: 'She fills in "pilot" in careful letters. You watch her.',
        effect: (p) => { p.m += 3; p.r += 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── FGM — FEMALE GENITAL MUTILATION ────────────────────────────────────────

  {
    id: 'fgm_preparation_ceremony',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['Somalia', 'Djibouti', 'Guinea', 'Mali', 'Sierra Leone', 'Ethiopia', 'Egypt', 'Sudan', 'Chad'].includes(G.character.country.name) &&
      G.age >= 5 && G.age <= 12 &&
      !G.mem?.fgm_event,
    text: 'The women of the family are making preparations. There are new clothes for you. Your grandmother explains that this is what makes a woman, what makes you marriageable, what has been done to every woman before you. She says it quickly, without looking at your face.',
    context: null,
    choices: [
      {
        text: 'Ask your mother if you have to',
        tag: null,
        outcome: 'She smooths your hair. "We all have to," she says. Her hands are shaking.',
        effect: (p) => { p.m -= 8; p.setMem('fgm_event', true); },
        inject: null,
      },
      {
        text: 'Accept without question — you trust your family',
        tag: null,
        outcome: 'They love you. You know this. What they are about to do is also true.',
        effect: (p) => { p.m -= 5; p.setMem('fgm_event', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fgm_procedure',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      ['Somalia', 'Djibouti', 'Guinea', 'Mali', 'Sierra Leone', 'Ethiopia', 'Egypt', 'Sudan', 'Chad'].includes(G.character.country.name) &&
      G.mem?.fgm_event === true &&
      !G.flags.includes('fgm_survivor'),
    text: 'It happens in a room with the older women. There is no anesthesia. Afterward they tell you it is done, that you are now a woman, that you will have a husband and children. You are seven years old. What you know is that something has been taken.',
    context: null,
    choices: null,
    effect: (p) => { p.h -= 20; p.m -= 22; p.r += 5; p.addFlag('fgm_survivor'); },
  },

  {
    id: 'fgm_health_complications',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('fgm_survivor'),
    text: 'The pain has been with you since childhood in different forms. Now it is a recurring infection. Your doctor in the city understands immediately. She explains, carefully, what was done to you and what it has cost your body. She asks if you know it did not have to happen.',
    context: null,
    choices: [
      {
        text: 'Grieve it — properly, for the first time',
        tag: null,
        outcome: 'The appointment runs long. The doctor sits with you. You were seven years old. Someone should have protected you.',
        effect: (p) => { p.h -= 5; p.m -= 4; p.r += 5; p.karma += 3; },
        inject: null,
      },
      {
        text: 'Seek treatment and information about reversal options',
        tag: 'resourceful',
        outcome: 'There are options. Not all can be undone. Some things can. You pursue what is possible.',
        effect: (p) => { p.h += 6; p.m += 5; p.mo -= 1200; },
        inject: null,
      },
      {
        text: 'Process it as a fact of your life and move on',
        tag: null,
        outcome: 'You have carried it this long. You know how to carry it.',
        effect: (p) => { p.h -= 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'fgm_refusing_for_daughter',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['Somalia', 'Djibouti', 'Guinea', 'Mali', 'Sierra Leone', 'Ethiopia', 'Egypt', 'Sudan', 'Chad'].includes(G.character.country.name) &&
      G.flags.includes('fgm_survivor') &&
      G.children && G.children.length > 0,
    text: 'Your mother has come to stay. Your daughter is eight years old. Your mother has spoken to the other women. The preparations she is describing are ones you recognize. You have one night to decide.',
    context: null,
    choices: [
      {
        text: 'Refuse absolutely — this ends with you',
        tag: 'principled',
        outcome: 'Your mother calls you a bad daughter. She says your daughter will never find a husband. You sit outside with your daughter\'s hand in yours and you feel the weight of every generation that did not have this choice.',
        effect: (p) => { p.m -= 3; p.s -= 3; p.karma += 15; p.addFlag('cycle_breaker'); },
        inject: null,
      },
      {
        text: 'Ask your mother to talk about why she still believes this is necessary',
        tag: null,
        outcome: 'The conversation goes all night. Your mother cries. She says she did not know another way. The preparations stop. A fragile peace.',
        effect: (p) => { p.m += 2; p.s += 3; p.karma += 10; p.addFlag('cycle_breaker'); },
        inject: null,
      },
      {
        text: 'Leave with your daughter immediately — visit relatives in another city',
        tag: 'protective',
        outcome: 'Distance is the only argument that works. Your family comes around over years. Your daughter does not know what you saved her from.',
        effect: (p) => { p.m -= 5; p.s -= 2; p.karma += 12; p.addFlag('cycle_breaker'); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── REPRODUCTIVE AUTONOMY ──────────────────────────────────────────────────

  {
    id: 'ra_pre_roe_abortion',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1950 && G.currentYear <= 1972,
    text: (G) => `It is ${G.currentYear}. You are pregnant and you cannot have this baby. The doctor you see privately in his home office charges two hundred dollars and does not look at you. He is not the worst option you were told about.`,
    context: null,
    choices: [
      {
        text: 'Go through with the illegal procedure',
        tag: null,
        outcome: 'It works. The risk was real. You did not know how real until afterward, when you read about the women who did not survive theirs.',
        effect: (p) => { p.h -= 8; p.m -= 6; p.mo -= 200; p.r += 3; },
        inject: null,
      },
      {
        text: 'Travel to a state or country where it is legal',
        tag: null,
        outcome: 'A friend lends you the train fare. The procedure is safe and quiet. The journey home feels like something you will never speak of.',
        effect: (p) => { p.h -= 2; p.m -= 5; p.mo -= 350; },
        inject: null,
      },
      {
        text: 'Continue the pregnancy',
        tag: null,
        outcome: 'You have the child. Your life reroutes entirely. Whether this is the right choice is something only you will ever know.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('unplanned_parent'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_illegal_abortion',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.genderGap > 0.25 &&
      !['United States', 'Ireland'].includes(G.character.country.name),
    text: 'Abortion is illegal here. You know women who have done it and women who have died doing it. You are pregnant and you know what you want. The question is how to survive wanting it.',
    context: null,
    choices: [
      {
        text: 'Find the local woman who does this — everyone knows her name',
        tag: null,
        outcome: 'She is matter-of-fact and competent. The infection afterward sends you to hospital with a story about something you ate.',
        effect: (p) => { p.h -= 12; p.m -= 5; p.mo -= 150; },
        inject: null,
      },
      {
        text: 'Find pills through an underground network',
        tag: null,
        outcome: 'They arrive wrapped in packaging that says something else. The process is painful and private. You are alone through it.',
        effect: (p) => { p.h -= 6; p.m -= 7; p.mo -= 80; },
        inject: null,
      },
      {
        text: 'Continue the pregnancy',
        tag: null,
        outcome: 'You had no safe option. What follows is your life.',
        effect: (p) => { p.r += 6; p.addFlag('unplanned_parent'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_ireland_abortion_ban',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'Ireland' &&
      G.currentYear >= 1983 && G.currentYear <= 2018,
    text: (G) => `It is ${G.currentYear}. Ireland's constitution enshrines the equal right to life of the mother and the unborn. You are pregnant and you are not ready for this. England is ninety minutes by plane. Your friend went last year and told no one for years.`,
    context: null,
    choices: [
      {
        text: 'Travel to England',
        tag: null,
        outcome: 'You go alone. The clinic is quiet and kind. The ferry home feels like something private between you and the sea.',
        effect: (p) => { p.m -= 7; p.mo -= 600; p.r += 2; },
        inject: null,
      },
      {
        text: 'Continue the pregnancy',
        tag: null,
        outcome: 'You find ways forward. The country made your choice for you.',
        effect: (p) => { p.r += 5; p.addFlag('unplanned_parent'); },
        inject: null,
      },
      {
        text: 'Become involved in the repeal movement',
        tag: 'activist',
        outcome: 'The referendum comes in 2018. You are in a pub when the results are called. You cry in public and do not care.',
        effect: (p) => { p.m += 8; p.s += 4; p.karma += 6; p.addFlag('activist'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_poland_abortion_ban',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2020,
    text: (G) => `It is ${G.currentYear}. Poland's Constitutional Tribunal has effectively banned abortion. You know a woman who was left to miscarry rather than receive a termination doctors said was necessary. She survived. Another woman did not. This is the country you live in now.`,
    context: null,
    choices: [
      {
        text: 'Join the protests — this is not acceptable',
        tag: 'activist',
        outcome: 'The women in red and black fill the streets. The government does not reverse course. You go back the next week.',
        effect: (p) => { p.m += 4; p.s += 5; p.karma += 5; p.addFlag('activist'); },
        inject: null,
      },
      {
        text: 'Help establish an underground network to support women who need to travel',
        tag: 'community_builder',
        outcome: 'The network grows. It is unglamorous and necessary work. You do it anyway.',
        effect: (p) => { p.m += 5; p.s += 4; p.karma += 8; },
        inject: null,
      },
      {
        text: 'Withdraw into private life — you cannot fight this',
        tag: null,
        outcome: 'The anger stays. So does the resignation.',
        effect: (p) => { p.m -= 4; p.r += 5; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_pharmacist_denies_contraception',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      (G.religion === 'christian_catholic' || G.character.country.genderGap > 0.22),
    text: 'The pharmacist at the only chemist in your town refuses to dispense your prescription. "It goes against my beliefs," he says, loudly enough for the queue behind you to hear. He does not ask why you need it. He does not offer to call another pharmacist.',
    context: null,
    choices: [
      {
        text: 'Argue — he has no right to do this',
        tag: 'vocal',
        outcome: 'He is immovable. You file a formal complaint. The process takes six weeks. You find another chemist twenty kilometers away.',
        effect: (p) => { p.m -= 4; p.s += 3; p.karma += 3; },
        inject: null,
      },
      {
        text: 'Leave without speaking — find another way',
        tag: null,
        outcome: 'You go without for two months while you sort out alternatives. The control over your own body sat in his hands and he enjoyed it.',
        effect: (p) => { p.m -= 6; p.r += 3; p.h -= 2; },
        inject: null,
      },
      {
        text: 'Share what happened — publicly',
        tag: 'activist',
        outcome: 'The story circulates. Other women add their versions. It becomes a case study in a policy review three years later.',
        effect: (p) => { p.m -= 2; p.s += 5; p.karma += 4; p.addFlag('activist'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_husbands_signature',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('married') &&
      (
        (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 1950 && G.currentYear <= 1975) ||
        G.character.country.genderGap > 0.30
      ),
    text: 'The doctor sets down his pen. "I\'ll need your husband\'s written consent before I can proceed." You are thirty-four years old. You are the one sitting in the chair. He is not here.',
    context: null,
    choices: [
      {
        text: 'Bring the signed form — navigate it quietly',
        tag: null,
        outcome: 'Your husband signs without comment. The appointment proceeds. The signature will bother you for years.',
        effect: (p) => { p.r += 5; p.m -= 3; },
        inject: null,
      },
      {
        text: 'Refuse — demand another doctor or file a complaint',
        tag: 'vocal',
        outcome: 'This creates a problem. It also creates a record. In ten years this policy will have changed, in part because women like you refused.',
        effect: (p) => { p.m -= 3; p.s += 4; p.karma += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_forced_sterilization',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.gender === 'female' &&
      (G.wealthTier <= 1 || G.flags.includes('indigenous') || G.flags.includes('poverty_childhood')) &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1950 && G.currentYear <= 1985,
    text: (G) => `You are in hospital for another procedure. A doctor mentions, briefly, that he has "taken care of something else as well." You ask what. He explains what has been done to you, in language designed not to sound like what it is. You are ${G.age} years old. Nobody asked you.`,
    context: null,
    choices: [
      {
        text: 'Pursue legal action',
        tag: 'principled',
        outcome: 'A lawyer takes your case pro bono. The case is settled out of court. The money is inadequate. The acknowledgment means more.',
        effect: (p) => { p.m -= 10; p.mo += 3000; p.karma += 6; p.addFlag('medical_trauma'); },
        inject: null,
      },
      {
        text: 'Carry it in silence — no one will believe you',
        tag: null,
        outcome: 'You tell no one for twenty years. Then you tell your daughter. She believes you immediately.',
        effect: (p) => { p.m -= 15; p.r += 10; p.addFlag('medical_trauma'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_one_child_china',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'China' &&
      G.currentYear >= 1980 && G.currentYear <= 2015 &&
      G.children && G.children.length >= 1,
    text: 'You are pregnant for the second time. The local family planning official has visited twice already. There are fines that would take years to pay. There is also talk of enforced procedures for women who do not comply. Your husband does not want to discuss the fine.',
    context: null,
    choices: [
      {
        text: 'Terminate the pregnancy',
        tag: null,
        outcome: 'You follow the policy. The grief is something you carry privately, because there is no language for grieving a choice that was not a choice.',
        effect: (p) => { p.m -= 12; p.r += 8; p.h -= 3; },
        inject: null,
      },
      {
        text: 'Continue — accept the fine and the consequences',
        tag: null,
        outcome: 'The fine is crushing. The child is born. The state records it as an unauthorized birth. The child grows up with this label on their documents.',
        effect: (p) => { p.mo -= 8000; p.m += 4; p.r += 3; },
        inject: null,
      },
      {
        text: 'Go to relatives in another province and register there',
        tag: 'resourceful',
        outcome: 'The system has holes. You find one. The paperwork takes a year to sort out. Your second child exists, officially.',
        effect: (p) => { p.m += 2; p.mo -= 2000; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ra_roe_celebrated',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'United States' &&
      G.currentYear === 1973 &&
      G.age >= 18,
    text: 'January 1973. A ruling from the Supreme Court. The radio is on and the women in your office have gone quiet and then loud. Your colleague is crying. You ask her why and she says she had a friend who died, years ago, from what women had to do before today.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 10; p.s += 3; p.karma += 3; p.addFlag('witnessed_progress'); },
  },

  {
    id: 'ra_maternal_mortality_scare',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['very_poor', 'poor'].includes(G.character.country.healthcare) &&
      G.children && G.children.length > 0,
    text: 'After the birth something goes wrong. You lose blood you cannot afford to lose. The clinic does not have the supplies. A nurse stays with you through the night, doing what she can with what she has. You survive. Three other women in the region this month do not.',
    context: null,
    choices: null,
    effect: (p) => { p.h -= 15; p.m -= 5; p.r += 4; p.addFlag('medical_trauma'); },
  },

  // ── WORKPLACE DISCRIMINATION ────────────────────────────────────────────────

  {
    id: 'wd_no_women_apply',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1950 && G.currentYear <= 1970 &&
      G.career,
    text: (G) => `${G.currentYear}. The job listing said no experience required. The interviewer looks up from your application. "We don't really have a role for a woman here," he says, as if this is information you need, not a door he is closing in your face.`,
    context: null,
    choices: [
      {
        text: 'Accept the rejection and look elsewhere',
        tag: null,
        outcome: 'You find a job as a secretary. You are overqualified. You perform quietly and wait.',
        effect: (p) => { p.m -= 5; p.r += 4; },
        inject: null,
      },
      {
        text: 'Ask him to explain the reason — make him say it clearly',
        tag: 'vocal',
        outcome: 'He stammers. He says it anyway. You leave with the knowledge of exactly what you are dealing with.',
        effect: (p) => { p.m -= 3; p.s += 3; p.addFlag('challenges_authority'); },
        inject: null,
      },
      {
        text: 'Find organizations where women are already present and target them',
        tag: 'strategic',
        outcome: 'There are a few. They are not where the best money is. They are where you can actually work.',
        effect: (p) => { p.w += 2; p.m -= 1; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_fired_for_pregnancy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1950 && G.currentYear <= 1975,
    text: 'You told your employer you were pregnant. He shook your hand and said congratulations. Your letter of termination arrived four days later. "Restructuring," it says.',
    context: null,
    choices: [
      {
        text: 'Challenge it legally',
        tag: 'principled',
        outcome: 'There is no law protecting you. The solicitor says this plainly. You file anyway. You lose. The process costs you six months.',
        effect: (p) => { p.mo -= 800; p.m -= 5; p.karma += 3; p.addFlag('principled'); },
        inject: null,
      },
      {
        text: 'Accept the termination and plan your return',
        tag: null,
        outcome: 'You return to the workforce after the birth. You have to explain the gap in your resume for the rest of your career.',
        effect: (p) => { p.m -= 6; p.w -= 2; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_glass_ceiling',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career &&
      G.stats.smarts >= 55,
    text: 'You were the top performer in your department this year. Everyone knew the promotion was between you and a male colleague who joined two years after you. They gave it to him. In the announcement email, his "leadership potential" is mentioned.',
    context: null,
    choices: [
      {
        text: 'Request a formal explanation from HR',
        tag: 'principled',
        outcome: 'HR gives you language. The language has been designed to give you nothing actionable. You leave the meeting knowing exactly what kind of place this is.',
        effect: (p) => { p.m -= 5; p.r += 4; p.w -= 2; },
        inject: null,
      },
      {
        text: 'Leave — find an organization that will promote you',
        tag: 'strategic',
        outcome: 'The next company has a different ceiling. It is still there. It is slightly higher.',
        effect: (p) => { p.m += 3; p.w += 3; p.mo += 5000; },
        inject: null,
      },
      {
        text: 'Stay and build the case over time',
        tag: 'patient',
        outcome: 'Two years later, the company changes leadership. You are promoted. You think about the two years.',
        effect: (p) => { p.m -= 3; p.w += 4; p.r += 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_sexual_harassment',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career,
    text: 'Your manager has been making comments for six months. Last week he closed the office door. You have been documenting the dates and times in a notebook you keep at home. You know what this is. You are deciding what to do about it.',
    context: null,
    choices: [
      {
        text: 'Report it formally — with your documentation',
        tag: 'principled',
        outcome: 'The process is exactly as difficult as you expected. HR asks you to describe each incident in front of a panel. He denies everything. He is moved to a different department. You are watched carefully afterward.',
        effect: (p) => { p.m -= 8; p.s += 4; p.karma += 5; p.addFlag('principled'); },
        inject: null,
      },
      {
        text: 'Speak to him directly — make clear you have documentation',
        tag: 'direct',
        outcome: 'He is frightened enough to stop. The power dynamic in the room never returns to what it was.',
        effect: (p) => { p.m -= 4; p.s += 5; },
        inject: null,
      },
      {
        text: 'Leave the job — you need to be somewhere safe',
        tag: null,
        outcome: 'You leave without a reference. You find another position. You never stop being angry about the reference.',
        effect: (p) => { p.m -= 6; p.w -= 1; p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_equal_pay_discovery',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career,
    text: 'A male colleague, drunk at the Christmas party, tells you his salary. It is considerably more than yours. You have been there three years longer. You have better performance reviews. He assumed you already knew.',
    context: null,
    choices: [
      {
        text: 'Raise it with management formally',
        tag: 'principled',
        outcome: 'They offer a small adjustment "to address the discrepancy." It is not what you are owed. You take it and start looking for another job.',
        effect: (p) => { p.mo += 3000; p.m -= 4; p.r += 3; },
        inject: null,
      },
      {
        text: 'Negotiate directly for a raise using this information',
        tag: 'strategic',
        outcome: 'Your manager is uncomfortable. The number comes up. You get closer to parity. Not all of it. Closer.',
        effect: (p) => { p.mo += 6000; p.m += 2; p.w += 2; },
        inject: null,
      },
      {
        text: 'Say nothing — keep the information and use it as leverage later',
        tag: null,
        outcome: 'The right moment does not come. The gap compounds over years.',
        effect: (p) => { p.r += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_maternity_leave_denied',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career &&
      ['developing_urban', 'subsaharan'].includes(G.character.country.archetype),
    text: 'Your employer explains that the company does not offer maternity leave. You are back at your desk two weeks after the birth. Your stitches are not healed. Your baby is with a neighbor.',
    context: null,
    choices: [
      {
        text: 'Comply — you cannot afford to lose this job',
        tag: null,
        outcome: 'You manage. The cost to your body is one you will calculate over years.',
        effect: (p) => { p.h -= 10; p.m -= 8; p.r += 5; },
        inject: null,
      },
      {
        text: 'Contact a labor organization to understand your legal rights',
        tag: 'principled',
        outcome: 'The law technically requires eight weeks. Your employer did not think you would know this. You are given the leave, without warmth.',
        effect: (p) => { p.h -= 3; p.m += 3; p.karma += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_credit_taken',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.career,
    text: 'The presentation you stayed late to build was delivered by your male colleague to the senior team. The follow-up email names him as the lead. Your name does not appear. He has not corrected anyone.',
    context: null,
    choices: [
      {
        text: 'Send a follow-up email that establishes your role — diplomatically',
        tag: 'strategic',
        outcome: 'You forward the original draft with timestamps. Several people in the room now know what happened, even if they say nothing.',
        effect: (p) => { p.m -= 3; p.s += 3; p.w += 2; },
        inject: null,
      },
      {
        text: 'Confront him privately',
        tag: 'direct',
        outcome: 'He claims he thought you "didn\'t want the attention." He corrects the record. Partially.',
        effect: (p) => { p.m -= 2; p.s += 2; },
        inject: null,
      },
      {
        text: 'Let it go — you know what you contributed',
        tag: null,
        outcome: 'He is promoted on the strength of the presentation.',
        effect: (p) => { p.r += 5; p.m -= 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wd_business_loan_denied',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      (
        (G.character.country.archetype === 'developing_urban') ||
        (G.character.country.archetype === 'wealthy_west' && G.currentYear >= 1950 && G.currentYear <= 1975)
      ),
    text: 'The loan officer at the bank leans back in his chair. Your business plan is solid. Your credit history is clean. He tells you the bank prefers to see a male co-signatory for business loans of this type. "Your husband, perhaps?"',
    context: null,
    choices: [
      {
        text: 'Find a female-led microfinance organization instead',
        tag: 'resourceful',
        outcome: 'The interest rate is higher. The conditions are manageable. The business launches.',
        effect: (p) => { p.w += 4; p.m += 5; p.mo -= 500; p.addFlag('entrepreneur'); },
        inject: null,
      },
      {
        text: 'Use a male relative as the official co-signatory — get the loan',
        tag: 'pragmatist',
        outcome: 'You get the capital. The business is yours. The paperwork says his name too. This will matter one day.',
        effect: (p) => { p.w += 5; p.m -= 2; p.r += 3; p.addFlag('entrepreneur'); },
        inject: null,
      },
      {
        text: 'File a discrimination complaint',
        tag: 'principled',
        outcome: 'The bank reviews your complaint and offers a meeting. The loan is approved six months later. You have missed the market window.',
        effect: (p) => { p.w += 2; p.m -= 3; p.karma += 4; p.addFlag('entrepreneur'); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── MALE-SPECIFIC PRESSURES ────────────────────────────────────────────────

  {
    id: 'mp_eldest_son_inherits',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      ['developing_urban', 'subsaharan'].includes(G.character.country.archetype) &&
      !G.flags.includes('eldest_child'),
    text: 'Your father has died. In the meeting with the family, the land, the house, the business — all of it goes to your oldest brother. This is how it has always been. You receive a handshake and a blessing.',
    context: null,
    choices: [
      {
        text: 'Accept the custom — challenge would split the family',
        tag: null,
        outcome: 'The family stays intact. You start from what you have.',
        effect: (p) => { p.m -= 5; p.w -= 4; p.r += 4; },
        inject: null,
      },
      {
        text: 'Raise the question of a fairer division',
        tag: 'principled',
        outcome: 'The conversation is difficult. A small share is agreed. Your brother does not forget the challenge.',
        effect: (p) => { p.w += 3; p.s -= 4; p.r += 2; },
        inject: null,
      },
      {
        text: 'Leave and build your own path — without the family\'s inheritance',
        tag: 'independent',
        outcome: 'The city is indifferent to birth order. You find that clarifying.',
        effect: (p) => { p.m += 3; p.w += 2; p.s -= 3; p.addFlag('independent'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_men_dont_cry',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.gender === 'male' &&
      G.age >= 8 && G.age <= 16,
    text: 'You cry at something — a death, a failure, a cruelty you couldn\'t stop. Your father, or an uncle, or an older boy, or sometimes all three: "Men don\'t cry." You are ten years old and learning to seal something off inside yourself.',
    context: null,
    choices: [
      {
        text: 'Seal it off — learn to perform the expected hardness',
        tag: 'emotionally_suppressed',
        outcome: 'You become very good at this. The cost will arrive later.',
        effect: (p) => { p.m -= 5; p.s += 2; p.r += 4; p.addFlag('emotionally_suppressed'); },
        inject: null,
      },
      {
        text: 'Cry anyway — and refuse to be ashamed',
        tag: 'emotionally_open',
        outcome: 'The punishment for this is social. The cost of the alternative is greater.',
        effect: (p) => { p.m += 3; p.s -= 4; p.addFlag('emotionally_open'); },
        inject: null,
      },
      {
        text: 'Find private spaces — a bedroom, a riverbank — where the rule does not apply',
        tag: null,
        outcome: 'You live in two registers: the public and the private. It takes years to stop treating them as opposites.',
        effect: (p) => { p.m -= 2; p.r += 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_financial_provider',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'male' &&
      ['developing_urban', 'subsaharan'].includes(G.character.country.archetype),
    text: 'Your mother\'s health is failing. Your younger siblings are in school. Your father sends money when he can, which is not often enough. The understanding is that you are now the one who keeps this running. Nobody said this out loud. It did not need to be said.',
    context: null,
    choices: [
      {
        text: 'Take on whatever work you can — family first',
        tag: 'family_sacrifice',
        outcome: 'Your own education and ambitions compress around the edges of what your family needs.',
        effect: (p) => { p.w += 3; p.e -= 5; p.m -= 4; p.r += 5; p.addFlag('family_sacrifice'); },
        inject: null,
      },
      {
        text: 'Find a way to do both — take night work, continue studying by day',
        tag: 'determined',
        outcome: 'You are exhausted for three years. Both survive.',
        effect: (p) => { p.h -= 8; p.e += 2; p.w += 2; p.m -= 3; },
        inject: null,
      },
      {
        text: 'Explain honestly that you cannot carry this alone',
        tag: 'honest',
        outcome: 'The conversation is hard. Your siblings get part-time work. The weight redistributes, slightly.',
        effect: (p) => { p.s += 3; p.m -= 2; p.w += 1; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_son_preference_not_wanted',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.ruralUrban === 'rural' &&
      (G.character.country.name === 'India' || G.character.country.name === 'China') &&
      G.age >= 5 && G.age <= 12,
    text: 'You understand, slowly, over years: you were the wrong kind of birth. Not evil, not wrong in yourself — but the wrong category. Your brother was celebrated. You were accepted. The difference is in every detail of how the house works.',
    context: null,
    choices: [
      {
        text: 'Work twice as hard to be seen',
        tag: 'determined',
        outcome: 'You are seen. It does not fix the original architecture of the house. But you are seen.',
        effect: (p) => { p.e += 5; p.m -= 3; p.r += 3; p.addFlag('determined'); },
        inject: null,
      },
      {
        text: 'Find your worth outside the family — school, friends, achievement',
        tag: 'independent',
        outcome: 'You construct a self that does not require their original version of you.',
        effect: (p) => { p.m += 4; p.s += 3; p.e += 3; },
        inject: null,
      },
      {
        text: 'Internalize it — carry the message as truth',
        tag: null,
        outcome: 'You believe it for too long. Unlearning it is the work of decades.',
        effect: (p) => { p.m -= 8; p.r += 6; p.lo -= 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_bride_price_debt',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      G.character.country.archetype === 'subsaharan',
    text: 'You want to marry. Her family has given a figure for bride price. It is the equivalent of two years of your salary. Your father has some saved. You will need to borrow the rest. The expectation is clear. So is the debt.',
    context: null,
    choices: [
      {
        text: 'Pay it — borrow what you must',
        tag: null,
        outcome: 'You are in debt for four years. The marriage is good. The debt is a slow bleed on the start of your life together.',
        effect: (p) => { p.mo -= 4000; p.m += 5; p.addFlag('married'); p.r += 2; },
        inject: null,
      },
      {
        text: 'Negotiate directly with her father for a reduced amount',
        tag: 'pragmatist',
        outcome: 'He agrees to a smaller figure with a payment plan. Her brothers are not pleased. The marriage happens.',
        effect: (p) => { p.mo -= 2000; p.m += 4; p.s -= 2; p.addFlag('married'); },
        inject: null,
      },
      {
        text: 'Defer the marriage until you can afford it properly',
        tag: 'patient',
        outcome: 'Two years of saving. The wedding is modest. You begin without debt.',
        effect: (p) => { p.m += 3; p.w += 2; p.addFlag('married'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_military_conscription',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'male' &&
      ['post_soviet', 'conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype) &&
      G.age >= 18 && G.age <= 22,
    text: 'The conscription notice arrives. Two years of service, minimum. You know men who came back from it different. You know one who did not come back. This is simply what happens to men here at this age.',
    context: null,
    choices: [
      {
        text: 'Serve — there is no real alternative',
        tag: 'disciplined',
        outcome: 'You come back. You are harder in some ways and more careful in others. The years are gone.',
        effect: (p) => { p.h += 5; p.e -= 4; p.m -= 5; p.s += 3; p.addFlag('military_service'); },
        inject: null,
      },
      {
        text: 'Seek exemption on medical or other grounds',
        tag: 'strategic',
        outcome: 'The process requires a doctor willing to help and money or connections. You navigate it.',
        effect: (p) => { p.mo -= 600; p.m += 3; },
        inject: null,
      },
      {
        text: 'Leave the country to avoid it',
        tag: 'independent',
        outcome: 'You are abroad for the two years. You cannot return until the law changes or you are past draft age. The exile is both freedom and loss.',
        effect: (p) => { p.m -= 4; p.s -= 3; p.e += 5; p.addFlag('emigrated'); p.addFlag('displaced'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_honor_responsibility',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      (
        G.religion === 'muslim_sunni' ||
        G.character.country.archetype === 'wealthy_gulf' ||
        G.character.country.archetype === 'developing_unstable'
      ),
    text: 'Your sister has been seen with a young man from another family. The men in your family are discussing what must be done. You are the nearest male relative. The pressure on you to act is the weight of custom, family, and the eyes of the community.',
    context: null,
    choices: [
      {
        text: 'Refuse to participate in any punitive action',
        tag: 'principled',
        outcome: 'Your family considers this a failure of your manhood. You consider it a different thing entirely.',
        effect: (p) => { p.m -= 5; p.s -= 4; p.karma += 10; p.addFlag('principled'); },
        inject: null,
      },
      {
        text: 'Speak to your sister privately — help her navigate the situation',
        tag: 'protective',
        outcome: 'You help her quietly manage the fallout. The community never knows what you chose.',
        effect: (p) => { p.m += 2; p.s -= 1; p.karma += 6; },
        inject: null,
      },
      {
        text: 'Comply with family expectations — confront and restrict her',
        tag: null,
        outcome: 'Honor is satisfied. Your sister does not forgive you. You think about this for years.',
        effect: (p) => { p.r += 8; p.m -= 6; p.karma -= 8; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_masculinity_crisis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      ['wealthy_west', 'post_soviet', 'wealthy_east'].includes(G.character.country.archetype) &&
      G.stats.happiness < 50,
    text: 'You have done everything correctly: job, relationship, apartment. The emptiness is not something you have words for, because you were never given them. You can feel it in the morning, before you have to become yourself again.',
    context: null,
    choices: [
      {
        text: 'Seek therapy — say it out loud to someone paid to listen',
        tag: 'self_aware',
        outcome: 'The first three sessions are difficult in ways you did not anticipate. By the fifth, something starts to move.',
        effect: (p) => { p.m += 8; p.mo -= 400; p.addFlag('self_aware'); },
        inject: null,
      },
      {
        text: 'Manage it with more work — produce something',
        tag: null,
        outcome: 'The productivity is real. So is the distance from everything that matters.',
        effect: (p) => { p.w += 3; p.m -= 4; p.r += 3; },
        inject: null,
      },
      {
        text: 'Tell someone you trust — without having the vocabulary sorted out yet',
        tag: 'emotionally_open',
        outcome: 'Your friend does not have the vocabulary either. He also says it helps, that he has felt it too. The conversation lasts until the bar closes.',
        effect: (p) => { p.m += 5; p.s += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_male_sexual_assault',
    phase: 'adolescence',
    weight: 1,
    when: (G) =>
      G.character.gender === 'male' &&
      G.age >= 13 && G.age <= 22,
    text: 'Something happened to you. You knew it was wrong while it was happening. You know what it would be called if it had happened to a girl. There is no language for what it is when it happens to you. You are not sure what you are supposed to do with this.',
    context: null,
    choices: [
      {
        text: 'Tell someone — even knowing they may not believe you',
        tag: 'brave',
        outcome: 'They believe you. Not everyone in your position gets this. The road after is long. It is better traveled than avoided.',
        effect: (p) => { p.m += 3; p.h -= 8; p.r += 3; p.addFlag('trauma_survivor'); },
        inject: null,
      },
      {
        text: 'Carry it alone — there is no framework for this',
        tag: null,
        outcome: 'The silence settles into the body and the behavior. You recognize its effects years later, in a therapist\'s office, when you finally find the word.',
        effect: (p) => { p.m -= 12; p.h -= 10; p.r += 8; p.addFlag('trauma_survivor'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mp_man_of_the_house',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      G.age >= 8 && G.age <= 14 &&
      G.flags.includes('orphaned'),
    text: 'Your father is gone. Your mother or grandmother sits you down. "You are the man of the house now." You are eleven. You understand this is both trust and weight, love and something that will cost you.',
    context: null,
    choices: [
      {
        text: 'Accept the role — you will not let them down',
        tag: 'caretaker',
        outcome: 'You grow up very fast. The childhood remaining to you is performed more than lived.',
        effect: (p) => { p.m -= 6; p.s += 4; p.r += 4; p.addFlag('parentified_child'); p.addFlag('caretaker'); },
        inject: null,
      },
      {
        text: 'Accept the words but keep being a child as long as you can',
        tag: null,
        outcome: 'There are moments where someone lets you. They are important.',
        effect: (p) => { p.m -= 3; p.s += 2; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── LGBTQ+ EXPERIENCES ─────────────────────────────────────────────────────

  {
    id: 'lgbtq_first_attraction',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.age >= 13 && G.age <= 18 &&
      !G.flags.includes('same_sex_attracted'),
    text: (G) => `There is someone you cannot stop thinking about. This is not new — you have felt this before. What is new is that this person is the same gender as you. You sit with this information in the quiet of your room and understand that it changes things. How many things, you do not yet know.`,
    context: null,
    choices: [
      {
        text: 'Accept it as true about yourself',
        tag: 'self_aware',
        outcome: 'You know. You carry it carefully for now.',
        effect: (p) => { p.m -= 2; p.addFlag('same_sex_attracted'); },
        inject: null,
      },
      {
        text: 'Tell yourself it is a phase — wait for it to pass',
        tag: null,
        outcome: 'It does not pass. You spend two years of unnecessary energy on this hypothesis.',
        effect: (p) => { p.m -= 5; p.r += 3; p.addFlag('same_sex_attracted'); },
        inject: null,
      },
      {
        text: 'Confide in one trusted friend',
        tag: 'emotionally_open',
        outcome: 'They do not run. They ask questions. The relief is physical.',
        effect: (p) => { p.m += 5; p.s += 3; p.addFlag('same_sex_attracted'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_religious_household',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      G.age >= 14 && G.age <= 22 &&
      (G.flags.includes('devout') || ['muslim_sunni', 'muslim_shia', 'christian_catholic', 'christian_protestant', 'christian_orthodox', 'hindu'].includes(G.religion)),
    text: 'Your family prays together. The faith you were raised in says what you are is a sin or an illness or simply wrong. You know it is not. Holding this knowledge alongside your love for your family is the hardest thing you have yet had to carry.',
    context: null,
    choices: [
      {
        text: 'Maintain the public performance while building a private truth',
        tag: null,
        outcome: 'You become expert in translation — between who you are and who the household needs you to be.',
        effect: (p) => { p.m -= 8; p.r += 5; p.s += 3; },
        inject: null,
      },
      {
        text: 'Begin quietly separating from the religion',
        tag: 'skeptic',
        outcome: 'The faith had comforts. You miss some of them. The relief outweighs the loss.',
        effect: (p) => { p.m += 3; p.s -= 3; p.r += 2; p.addFlag('skeptic'); },
        inject: null,
      },
      {
        text: 'Find communities where both identities can coexist',
        tag: 'community_builder',
        outcome: 'They exist. They are small and specific and vital.',
        effect: (p) => { p.m += 6; p.s += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_coming_out_safe',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      !G.lgbtqCriminalized &&
      G.character.country.archetype === 'wealthy_west',
    text: 'You are twenty-three. You are in a city with people you chose. The time has come. You know it the way you know other things that cannot be unknowed. You tell the people you love.',
    context: null,
    choices: [
      {
        text: 'Come out to family first',
        tag: 'brave',
        outcome: 'Your mother is quiet for a long moment. Then she says: "I love you." The conversation that follows is imperfect and real.',
        effect: (p) => { p.m += 10; p.s += 4; p.addFlag('out'); },
        inject: null,
      },
      {
        text: 'Come out to friends first — test the ground',
        tag: null,
        outcome: 'Your friends are better than you feared. This changes how you believe your family will respond.',
        effect: (p) => { p.m += 8; p.s += 5; p.addFlag('out'); },
        inject: null,
      },
      {
        text: 'Come out publicly — all at once',
        tag: 'bold',
        outcome: 'Some people leave. More stay. The freedom is worth exactly what it cost.',
        effect: (p) => { p.m += 7; p.s += 3; p.s -= 2; p.addFlag('out'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_arrested',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      G.lgbtqCriminalized,
    text: 'Two police officers. It was a private gathering. Someone must have reported it, or it was not as private as you believed. The arrest is fast. The charges use language from a law written decades before you were born.',
    context: null,
    choices: [
      {
        text: 'Deny everything — protect others in the room',
        tag: null,
        outcome: 'You are held for forty-eight hours and released. The charges are suspended, not dropped. Your name is in a file now.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.r += 6; p.addFlag('arrested'); },
        inject: null,
      },
      {
        text: 'Refuse to speak without a lawyer',
        tag: 'principled',
        outcome: 'The lawyer comes after twenty-four hours. What follows is slow and frightening. You are not convicted. You are also not safe.',
        effect: (p) => { p.m -= 8; p.mo -= 1500; p.addFlag('arrested'); },
        inject: null,
      },
      {
        text: 'Seek asylum in a safer country',
        tag: null,
        outcome: 'The process is long and dehumanizing. You arrive in a country that will not imprison you for existing. This is enough, for now.',
        effect: (p) => { p.m -= 6; p.s -= 5; p.addFlag('refugee'); p.addFlag('displaced'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_family_rejection',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('same_sex_attracted'),
    text: 'They found out. Whether you told them or they discovered it, the result is the same: your father says you are not welcome in this house. Your mother does not contradict him. You are twenty and standing on the pavement with a bag.',
    context: null,
    choices: [
      {
        text: 'Find community — others who have been through this',
        tag: 'community_builder',
        outcome: 'They exist. They make the chosen-family thing less of a cliché and more of a survival fact.',
        effect: (p) => { p.m -= 5; p.s += 6; p.addFlag('found_community'); },
        inject: null,
      },
      {
        text: 'Give them time and keep the door slightly open',
        tag: 'patient',
        outcome: 'Your mother calls, three months later, when your father is out. The healing is slow and incomplete and something.',
        effect: (p) => { p.m -= 6; p.r += 3; },
        inject: null,
      },
      {
        text: 'Close the door on them — protect your mental health',
        tag: null,
        outcome: 'You build without them. What you build is yours.',
        effect: (p) => { p.m -= 4; p.addFlag('family_rift'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_conversion_therapy',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      G.age >= 14 && G.age <= 22 &&
      (G.flags.includes('devout') || ['christian_protestant', 'christian_catholic'].includes(G.religion)) &&
      (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'subsaharan'),
    text: 'Your parents have found someone: a pastor, a counselor, a man in an office who promises to fix you. They have done this out of love. The sessions use shame as their primary tool.',
    context: null,
    choices: [
      {
        text: 'Refuse and walk out',
        tag: 'defiant',
        outcome: 'The confrontation with your parents is severe. You are not fixed. You were not broken.',
        effect: (p) => { p.m -= 8; p.s += 5; p.addFlag('defiant'); p.addFlag('family_rift'); },
        inject: null,
      },
      {
        text: 'Attend and survive it — give them what they need to see',
        tag: null,
        outcome: 'You perform recovery. They believe what they need to believe. The damage from the sessions requires years to process.',
        effect: (p) => { p.m -= 14; p.r += 6; p.h -= 5; p.addFlag('trauma_survivor'); },
        inject: null,
      },
      {
        text: 'Confide in a teacher or counselor outside the family',
        tag: 'brave',
        outcome: 'They help you find support. The legal pressure builds. Your parents are told this is harmful. The sessions stop.',
        effect: (p) => { p.m -= 6; p.h -= 3; p.s += 4; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_gay_bar',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      !G.lgbtqCriminalized &&
      G.character.country.archetype === 'wealthy_west',
    text: 'Someone takes you to a bar where no one is performing anything. The music is loud. The strangers nod at you as if you are already known. You have never been in a room that required this little from you.',
    context: null,
    choices: null,
    effect: (p) => { p.m += 10; p.s += 5; p.addFlag('found_community'); },
  },

  {
    id: 'lgbtq_aids_crisis',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'male' &&
      G.flags.includes('same_sex_attracted') &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1982 && G.currentYear <= 1995,
    text: (G) => `It is ${G.currentYear}. The list of funerals is longer than it should be. Men you knew. Men you loved. The government is slow to respond in ways that feel deliberate. The community is burying its own and writing its own obituaries.`,
    context: null,
    choices: [
      {
        text: 'Get involved in AIDS activism',
        tag: 'activist',
        outcome: 'ACT UP. Silence = Death. You spend years in this fight. The drugs come faster because people screamed.',
        effect: (p) => { p.m -= 5; p.s += 6; p.karma += 8; p.addFlag('activist'); },
        inject: null,
      },
      {
        text: 'Withdraw — the grief is too much for public action',
        tag: null,
        outcome: 'You survive the decade. You carry more names than you can sometimes hold.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.r += 5; },
        inject: null,
      },
      {
        text: 'Throw yourself into caretaking — be present for those who are sick',
        tag: 'caretaker',
        outcome: 'The hospital rooms. The hands to hold. The weight of it is extraordinary. So is what it means to have been there.',
        effect: (p) => { p.m -= 8; p.karma += 10; p.addFlag('caretaker'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_same_sex_marriage',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      !G.lgbtqCriminalized &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 2000 && G.currentYear <= 2015,
    text: (G) => `${G.currentYear}. The law has changed. The court ruling is being read on the radio. People are in the streets. You are in a city where you can now, legally, marry the person you love. This required so much to become possible.`,
    context: null,
    choices: [
      {
        text: 'Get married',
        tag: 'married',
        outcome: 'The ceremony is small or large, loud or quiet. It is yours. It exists in a way it could not, legally, have existed yesterday.',
        effect: (p) => { p.m += 12; p.addFlag('married'); p.addFlag('witnessed_progress'); p.karma += 3; },
        inject: null,
      },
      {
        text: 'Celebrate for others — you are not in a relationship right now',
        tag: null,
        outcome: 'You are in the street, in the crowd, holding a stranger\'s hand. This is enough.',
        effect: (p) => { p.m += 8; p.addFlag('witnessed_progress'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_trans_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.age >= 14 && G.age <= 22 &&
      !G.flags.includes('trans_identity'),
    text: 'The word exists. You found it on the internet, or in a book, or someone else used it and you heard yourself in it. It explains something you have been trying to explain to yourself since childhood. The clarity is real and frightening and, underneath that, a relief you were not expecting.',
    context: null,
    choices: [
      {
        text: 'Accept it and begin exploring what it means',
        tag: 'self_aware',
        outcome: 'The journey is long. The vocabulary is yours, now.',
        effect: (p) => { p.m += 3; p.addFlag('trans_identity'); p.addFlag('same_sex_attracted'); },
        inject: null,
      },
      {
        text: 'Keep it private until you understand it better',
        tag: null,
        outcome: 'You carry it carefully. Understanding it takes time.',
        effect: (p) => { p.m -= 3; p.r += 3; p.addFlag('trans_identity'); },
        inject: null,
      },
      {
        text: 'Seek out others who have been here before you',
        tag: 'community_builder',
        outcome: 'The community is small where you are. They find you anyway.',
        effect: (p) => { p.m += 6; p.s += 4; p.addFlag('trans_identity'); p.addFlag('found_community'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_homophobia_school',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.flags.includes('same_sex_attracted') &&
      G.age >= 12 && G.age <= 18,
    text: 'At school there are words thrown around. Some of them are aimed at you. A teacher hears one and looks at the floor. The word accumulates in you like sediment.',
    context: null,
    choices: [
      {
        text: 'Report it to a teacher you trust',
        tag: 'principled',
        outcome: 'The teacher is better than the one who looked at the floor. Things improve marginally. You matter enough to say something.',
        effect: (p) => { p.m -= 3; p.s += 2; },
        inject: null,
      },
      {
        text: 'Endure it — wait until you can leave',
        tag: 'resilient',
        outcome: 'You leave. The sediment stays longer than the school does.',
        effect: (p) => { p.m -= 6; p.r += 4; },
        inject: null,
      },
      {
        text: 'Find one other person who understands',
        tag: null,
        outcome: 'She sits next to you in chemistry. She also knows.',
        effect: (p) => { p.m += 3; p.s += 4; p.addFlag('found_community'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'lgbtq_lesbian_invisibility',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.flags.includes('same_sex_attracted'),
    text: 'You have told a relative. She nods slowly and says: "You just haven\'t met the right man yet." You explain again. She nods again. The conversation happens three more times over the following years with different people.',
    context: null,
    choices: [
      {
        text: 'Stop trying to explain — live visibly instead',
        tag: 'bold',
        outcome: 'Your life makes the argument that words cannot. Some people are changed by seeing you.',
        effect: (p) => { p.m += 4; p.s += 3; p.addFlag('out'); },
        inject: null,
      },
      {
        text: 'Keep correcting them — the truth deserves to be said',
        tag: 'principled',
        outcome: 'It is tiring. It is also what dignity requires, when you can afford the energy.',
        effect: (p) => { p.m -= 2; p.s += 2; },
        inject: null,
      },
      {
        text: 'Decide which relationships are worth the energy and focus there',
        tag: 'pragmatist',
        outcome: 'You stop explaining to the ones who are not ready and invest in the ones who are.',
        effect: (p) => { p.m += 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── WIDOW / WIDOWER CUSTOMS ────────────────────────────────────────────────

  {
    id: 'wid_widow_inheritance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'subsaharan' &&
      G.flags.includes('married') &&
      !G.partner,
    text: 'Your husband has died. His family has come to the house. His brother is explaining that, by custom, you will now marry him — or another male relative. This is to keep you within the family, to protect the children, to maintain the land.',
    context: null,
    choices: [
      {
        text: 'Refuse — you will not be passed along like property',
        tag: 'defiant',
        outcome: 'His family takes the land and the house. You leave with your children. Starting over at forty with nothing but yourself is not nothing.',
        effect: (p) => { p.m -= 8; p.w -= 5; p.mo -= 2000; p.karma += 8; p.addFlag('defiant'); },
        inject: null,
      },
      {
        text: 'Comply — the children need the land and the security',
        tag: null,
        outcome: 'You make a practical decision. Your children have land and a home. You live in a marriage you did not choose.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('married'); },
        inject: null,
      },
      {
        text: 'Negotiate — agree to remain within the family without remarrying',
        tag: 'pragmatist',
        outcome: 'The compromise is unstable. But it holds, for now.',
        effect: (p) => { p.m -= 4; p.s += 3; },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wid_hindu_widowhood',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.religion === 'hindu' &&
      G.character.country.name === 'India' &&
      G.flags.includes('married') &&
      !G.partner,
    text: 'Your husband has died. The older women come with the white sari. They speak about what is required: the removal of the sindoor, the bangles, the ornaments. In the old tradition, widows shave their heads. Your mother-in-law does not insist on this. Others do.',
    context: null,
    choices: [
      {
        text: 'Follow the full ritual — this is what is done',
        tag: null,
        outcome: 'You wear the white sari. At the temple, the space made for you is behind the married women. You understand what has been decided about you.',
        effect: (p) => { p.m -= 12; p.r += 5; p.lo -= 3; },
        inject: null,
      },
      {
        text: 'Follow some practices but refuse others — find the line',
        tag: 'principled',
        outcome: 'Your mother-in-law accepts this imperfectly. The community has opinions. You have more left of yourself.',
        effect: (p) => { p.m -= 6; p.r += 3; p.s -= 2; },
        inject: null,
      },
      {
        text: 'Move to a city where you are unknown — start again',
        tag: 'independent',
        outcome: 'In the city, no one knows your history. This is both loss and opening.',
        effect: (p) => { p.m -= 3; p.s -= 2; p.e += 4; p.addFlag('emigrated'); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'wid_widow_disinherited',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      ['developing_urban', 'subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.flags.includes('married') &&
      !G.partner,
    text: 'Your husband\'s relatives arrive before the burial is complete. They are removing things from the house. The land was in his name. The business was in his name. You discover that your name appears on very little.',
    context: null,
    choices: [
      {
        text: 'Fight it legally — everything you built together',
        tag: 'principled',
        outcome: 'The legal process takes two years and costs money you do not have. You recover a portion. The rest is gone.',
        effect: (p) => { p.w -= 4; p.mo -= 1500; p.m -= 6; p.karma += 4; },
        inject: null,
      },
      {
        text: 'Accept what cannot be fought and rebuild',
        tag: null,
        outcome: 'You start over with less. The restart is the rest of the story.',
        effect: (p) => { p.w -= 5; p.m -= 8; p.r += 4; },
        inject: null,
      },
      {
        text: 'Organize with other widows facing the same — collective legal action',
        tag: 'activist',
        outcome: 'The NGO takes the collective case. The law does not change quickly enough for you. It changes for the women after you.',
        effect: (p) => { p.w -= 3; p.m -= 3; p.karma += 8; p.addFlag('activist'); },
        inject: null,
      },
    ],
    effect: null,
  },

];

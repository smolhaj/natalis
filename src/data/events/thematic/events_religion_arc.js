// events_religion_arc.js
// Full religious life arc — practice, doubt, rites of passage, leaving, returning.
// Religion is assigned at birth but mostly dormant in events_religion.js (rites).
// This file builds the arc across the whole life: doubt, departure, return, interfaith.

export const RELIGION_ARC_EVENTS = [

  // ── RELIGIOUS RITES OF PASSAGE ───────────────────────────────────────────────

  {
    id: 'rela_bar_bat_mitzvah_prep',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.religion === 'jewish' && G.age >= 11 && G.age <= 12 && !G.mem?.bm_prep,
    text: 'The year before your Bar or Bat Mitzvah you study with a tutor three evenings a week. The Torah portion is in Hebrew and the cantillation marks are their own language. Your tutor is patient. You are less patient. But there are moments — a particular phrase, a vowel held long — when the sound of it is older than anything you can name.',
    choices: [
      { text: 'Commit fully — learn every note of the haftarah', tag: null, outcome: 'Your tutor tells your parents you are ready. You are ready. The preparation has given you something that exists independently of the ceremony.', effect: (p) => { p.e += 6; p.m += 5; p.setMem('bm_prep', true) } },
      { text: 'Learn enough to get through it', tag: null, outcome: 'You will remember the day clearly. Whether you will remember the Hebrew is another question.', effect: (p) => { p.e += 2; p.m += 3; p.setMem('bm_prep', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_confirmation_day',
    phase: 'adolescence',
    weight: 4,
    when: (G) => ['christian_catholic', 'christian_protestant'].includes(G.religion) && G.age >= 13 && G.age <= 16 && !G.mem?.confirmation_day,
    text: 'Confirmation. You stand before the congregation and affirm that the faith is yours now — not inherited but chosen. The bishop or the pastor places hands on your head. The church smells of candle smoke and your grandmother is in the third row.',
    choices: [
      { text: 'Mean it — this is a real decision', tag: 'devout', outcome: 'You feel the weight of what you are saying. You say it anyway. Something settles.', effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('devout'); p.setMem('confirmation_day', true) } },
      { text: 'Say the words because it is expected', tag: null, outcome: 'You will think about whether you meant it for years. The answer will keep changing.', effect: (p) => { p.m += 4; p.r += 4; p.setMem('confirmation_day', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_ramadan_full_adult',
    phase: 'adolescence',
    weight: 4,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 14 && G.age <= 18 && !G.mem?.ramadan_adult,
    text: 'The first Ramadan you observe as an adult, not a child practicing. Dawn to sunset. Thirty days. The hunger is manageable. What is less manageable is the quiet — the way fasting empties the noise of ordinary wanting and leaves something underneath that you do not have a precise word for.',
    choices: [
      { text: 'Observe it with full intention — this is worship', tag: 'devout', outcome: 'By the fourth week the fast is not deprivation. It is something else. You understand what your parents meant when they said it is a gift.', effect: (p) => { p.m += 10; p.karma += 6; p.h -= 3; p.addFlag('devout'); p.setMem('ramadan_adult', true) } },
      { text: 'Fast but find it mostly mechanical', tag: null, outcome: 'You complete it. There is discipline in that, even if the transcendence doesn\'t arrive. Maybe next year.', effect: (p) => { p.m += 3; p.h -= 2; p.setMem('ramadan_adult', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_hajj_lifetime',
    phase: 'midlife',
    weight: 3,
    when: (G) => ['muslim_sunni', 'muslim_shia'].includes(G.religion) && G.age >= 35 && G.age <= 65 && !G.mem?.hajj_arc && G.money > 4000,
    text: 'You have been saving for years. The fifth pillar. You arrange everything — the visa, the accommodation, the time off work, someone to care for your family. When you finally arrive in Mecca and join the river of people circling the Ka\'aba, you feel a scale that personal faith rarely reaches.',
    choices: [
      { text: 'Make the Hajj', tag: 'devout', outcome: 'The tawaf before dawn. Millions of people saying the same words in the same direction. You understand in your body what the mind has held as abstraction. You return different.', effect: (p) => { p.mo -= 5000; p.m += 22; p.karma += 12; p.h -= 5; p.addFlag('devout'); p.addFlag('hajj_complete'); p.setMem('hajj_arc', true) } },
      { text: 'Wait until the time is more right', tag: null, outcome: 'The pillar does not expire. You continue saving.', effect: (p) => { p.setMem('hajj_arc', false) } },
    ],
    effect: null,
  },

  {
    id: 'rela_hindu_coming_of_age',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.religion === 'hindu' && G.age >= 9 && G.age <= 14 && !G.mem?.hindu_coming_of_age,
    text: (G) => {
      if (G.character.gender === 'male') return 'The ceremony is prepared. A priest recites. Your head is shaved. There is a puja that takes three hours and your knees ache on the cold stone but you do not shift. Afterward, your family eats together and the older relatives press money into your hands and say things about the person you are becoming.'
      return 'The ceremony is simpler for girls in your family\'s tradition — a puja, new clothes, turmeric, the women of the household gathered. Your grandmother puts her hand on your head and says something in the old language that is not translated for you. You understand its weight anyway.'
    },
    choices: [
      { text: 'Receive it seriously — this is who you are', tag: 'devout', outcome: 'The ritual enters you in the way rituals do when you let them. You are part of something longer than your own life.', effect: (p) => { p.m += 10; p.s += 4; p.karma += 5; p.addFlag('devout'); p.setMem('hindu_coming_of_age', true) } },
      { text: 'Endure it for your family', tag: null, outcome: 'You go through the motions. The motions leave a faint imprint anyway.', effect: (p) => { p.m += 4; p.setMem('hindu_coming_of_age', true) } },
    ],
    effect: null,
  },

  // ── RELIGIOUS PRACTICE IN DAILY LIFE ─────────────────────────────────────────

  {
    id: 'rela_daily_prayer_structure',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('devout') && G.age >= 18 && G.age <= 35 && !G.mem?.daily_prayer_structure,
    text: 'Prayer is the architecture of your day. You do not always feel it — some mornings it is entirely mechanical, words said over a distracted mind — but the discipline of returning, of showing up at the appointed time regardless of how it feels, has built something. You notice this most on the days you skip it: a gap that is not quite hunger.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 4; p.setMem('daily_prayer_structure', true) },
  },

  {
    id: 'rela_congregation_community',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('devout') && G.age >= 20 && G.age <= 40 && !G.mem?.congregation_community,
    text: 'The congregation is not only theology. It is the couple who watch your children when you are sick, the network that found you a job, the older woman who calls if she has not seen you for two weeks. You could believe the same things alone. You could not have this alone. The distinction is not always comfortable to think about.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 6; p.setMem('congregation_community', true) },
  },

  {
    id: 'rela_observance_vs_modern_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('devout') && G.age >= 20 && G.age <= 40 && !G.mem?.observance_conflict && ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype),
    text: 'The Sabbath falls on the day your company needs you to work. The fast day falls in the middle of a project launch. Your dietary restrictions make the work dinner complicated. You are always negotiating between the rhythm your faith requires and the rhythm the secular world assumes as default.',
    choices: [
      { text: 'Hold the observance, manage the professional consequences', tag: 'devout', outcome: 'Some colleagues understand. Some do not ask again. The negotiation becomes routine. It costs you something but the cost is not abstract — it is specific and you can carry it.', effect: (p) => { p.m += 5; p.karma += 5; p.r += 3; p.setMem('observance_conflict', true) } },
      { text: 'Compromise when the pressure is real', tag: null, outcome: 'You work the day. You say the prayers later, quietly. You will reckon with this but not today.', effect: (p) => { p.m -= 5; p.r += 6; p.setMem('observance_conflict', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_fasting_experience',
    phase: 'young_adult',
    weight: 3,
    when: (G) => ['muslim_sunni', 'muslim_shia', 'jewish', 'christian_orthodox', 'christian_catholic'].includes(G.religion) && G.age >= 20 && G.age <= 45 && !G.mem?.fasting_experience,
    text: 'The fast. However your tradition names it. The physical part is easier than you expected after the first day; the body adjusts. What opens up in the space where ordinary appetite was is harder to describe. Some people call it spiritual clarity. You are not sure what to call it. You notice that the world looks different at sunset when the breaking comes.',
    choices: null,
    effect: (p) => { p.m += 8; p.h -= 2; p.karma += 5; p.setMem('fasting_experience', true) },
  },

  {
    id: 'rela_scripture_returns',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.scripture_returns && !G.flags.includes('left_religion') && ['devout', 'confirmed', 'religious_education'].some(f => G.flags.includes(f)),
    text: 'You return to the text you grew up with. The same words you memorized as a child mean something different at forty. The passages about loss hit in specific places now. The ones about patience are less abstract. You understand things the child who first read them could not have known yet. The book has not changed. You have.',
    choices: null,
    effect: (p) => { p.m += 10; p.e += 5; p.karma += 4; p.setMem('scripture_returns', true) },
  },

  // ── FAITH CRISIS ─────────────────────────────────────────────────────────────

  {
    id: 'rela_first_genuine_doubt',
    phase: 'adolescence',
    weight: 4,
    when: (G) => G.age >= 14 && G.age <= 22 && !G.flags.includes('left_religion') && !G.flags.includes('lost_faith') && !G.mem?.first_doubt,
    text: 'The question arrives and it is not rhetorical. If God exists and is good, then why did this particular thing happen — the specific thing, the one that happened last month, that everyone who knows you knows about. The answer your faith gives you does not fit. You sit with the gap.',
    choices: [
      { text: 'Stay in the question — doubt is part of it', tag: null, outcome: 'You do not find an answer. You find that living with the question is different from having an answer and not necessarily worse.', effect: (p) => { p.e += 6; p.r += 5; p.addFlag('faith_crisis'); p.setMem('first_doubt', true) } },
      { text: 'Resolve it back toward faith — lean harder into belief', tag: 'devout', outcome: 'You decide the gap is not a disproof. Certainty is not the thing. You stay.', effect: (p) => { p.m += 3; p.addFlag('devout'); p.setMem('first_doubt', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_tragedy_breaks_framework',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 18 && G.age <= 45 && (G.flags.includes('devout') || G.flags.includes('faith_crisis')) && !G.mem?.tragedy_faith && (G.flags.includes('lost_parent_young') || G.flags.includes('witnessed_disappearance') || G.flags.includes('war_childhood')),
    text: 'A death that was not supposed to happen. Your theological framework for suffering — the one you were given, the one you have been carrying — does not hold this particular loss. The prayer feels like speaking into a room where no one is home. You do not know what comes after this.',
    choices: [
      { text: 'Abandon the faith — you cannot believe in a God who permitted this', tag: null, outcome: 'You stop going. The community is kind but confused. The silence where prayer was is cold at first and then just silence.', effect: (p) => { p.m -= 12; p.e += 5; p.r += 10; p.addFlag('lost_faith'); p.addFlag('faith_crisis'); p.setMem('tragedy_faith', true) } },
      { text: 'Stay inside the tradition and let it hold your grief', tag: 'devout', outcome: 'You do not find an explanation. What you find is people who have been here before, who do not try to explain it, who simply sit with you.', effect: (p) => { p.m -= 4; p.karma += 8; p.setMem('tragedy_faith', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_reading_contradicts_teaching',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.age >= 15 && G.age <= 25 && !G.flags.includes('left_religion') && !G.mem?.reading_contradicts,
    text: 'You read something — a book on evolutionary biology, a history of religious texts, a comparative religion course — that contradicts what you were taught. Not at the edges but at the foundation. The information is well-sourced. You cannot dismiss it. You have to decide what to do with it.',
    choices: [
      { text: 'Integrate it — faith can survive facts', tag: null, outcome: 'You find a way to hold both. It requires work. The faith that emerges is less certain and more yours.', effect: (p) => { p.e += 8; p.m -= 3; p.r += 4; p.addFlag('faith_crisis'); p.setMem('reading_contradicts', true) } },
      { text: 'Let the contradiction erode the belief', tag: null, outcome: 'The structure comes down slowly, fact by fact. There is no single moment. There is a morning when you realize it is gone.', effect: (p) => { p.e += 10; p.m -= 8; p.addFlag('lost_faith'); p.setMem('reading_contradicts', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_leader_behaves_badly',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.flags.includes('left_religion') && !G.mem?.leader_betrayal,
    text: 'The religious leader you trusted is found to have done something — financial, sexual, or both. The institution closes ranks around him. The investigation is slow and the apology, when it comes, is insufficient. You are left with the question of whether the institution and the faith are the same thing, and whether you can separate them.',
    choices: [
      { text: 'Leave the institution but not the faith', tag: null, outcome: 'You find a smaller congregation. Or you practice at home. The faith survives the institution, barely.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('leader_betrayal', true) } },
      { text: 'Leave both — they cannot be separated', tag: null, outcome: 'You stop. The question of what you believe is still open. You will return to it, differently.', effect: (p) => { p.m -= 12; p.e += 5; p.addFlag('left_religion'); p.setMem('leader_betrayal', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_science_religion_rupture',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.flags.includes('religious_education') && G.age >= 14 && G.age <= 22 && !G.mem?.science_religion,
    text: 'The biology class covers evolution with evidence you cannot argue with. The religious school teaches otherwise with authority you were raised to trust. You sit between them for a while and then, quietly, you make a choice about which kind of knowledge you are willing to hold.',
    choices: [
      { text: 'Find a reconciliation — many religious people accept evolution', tag: null, outcome: 'The literalism goes but the framework remains. You read theologians who have been here before. It is not a simple resolution but it holds.', effect: (p) => { p.e += 6; p.m += 3; p.setMem('science_religion', true) } },
      { text: 'Choose the evidence — let the old teaching go', tag: null, outcome: 'The rupture with your religious school is clean. You mourn the certainty and gain something less comfortable and more honest.', effect: (p) => { p.e += 10; p.m -= 5; p.addFlag('faith_crisis'); p.setMem('science_religion', true) } },
    ],
    effect: null,
  },

  // ── LEAVING RELIGION ─────────────────────────────────────────────────────────

  {
    id: 'rela_tell_family_no_longer_believe',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('left_religion')) && G.age >= 18 && G.age <= 35 && !G.mem?.told_family_no_faith,
    text: (G) => {
      if (['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)) return 'You tell your family over dinner that you no longer believe. Your parent puts down their fork. They ask if something happened. You say it was gradual. They say they will pray for you. The meal finishes. Something has shifted but the shift is not violent.'
      return 'You tell your family. What follows is not a meal finishing. It is several weeks of difficult conversations. Some relatives do not speak to you directly after this. Your parent grieves for it in a way that is not about you and entirely about you.'
    },
    choices: [
      { text: 'Hold to it — this is your honest position', tag: null, outcome: 'The relationship survives, rearranged. Some things will not be talked about. You can live with the arrangement.', effect: (p) => { p.m -= 8; p.r += 8; p.setMem('told_family_no_faith', true) } },
      { text: 'Soften it to preserve the peace', tag: null, outcome: 'You say you are still figuring things out. This is technically true. The dishonesty has a modest daily cost.', effect: (p) => { p.m -= 3; p.r += 5; p.setMem('told_family_no_faith', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_social_cost_leaving',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('left_religion')) && G.age >= 18 && G.age <= 35 && ['subsaharan', 'post_soviet', 'wealthy_gulf'].includes(G.character.country.archetype) && !G.mem?.social_cost_leaving,
    text: 'Your religion is not only your faith. It is your community, your marriage pool, your network, your social identity. Leaving it does not mean changing an opinion. It means stepping outside the structure that organizes your world. People who would have helped you do not return your calls. An introduction that would have happened doesn\'t.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 12; p.s -= 5; p.setMem('social_cost_leaving', true) },
  },

  {
    id: 'rela_freedom_and_loss',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('left_religion')) && G.age >= 20 && G.age <= 40 && !G.mem?.freedom_and_loss,
    text: 'The freedom is real. The loss is also real. You are no longer required to arrange your life around requirements that felt arbitrary. You are also no longer provided with a framework for what to do when someone you love dies, or for why any of this matters. Both things are true at the same time and neither cancels the other.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 8; p.e += 5; p.setMem('freedom_and_loss', true) },
  },

  {
    id: 'rela_cultural_without_belief',
    phase: 'midlife',
    weight: 3,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('left_religion')) && G.age >= 30 && !G.mem?.cultural_without_belief,
    text: 'The holiday comes around. You go to your family\'s home. You say the words at the table that you were taught to say. The food is your food. The music is your music. You are not lying. You are also not believing. This is a position that the tradition does not have a name for and that you have learned to inhabit anyway.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 4; p.setMem('cultural_without_belief', true) },
  },

  // ── RETURN AND DEEPENING ─────────────────────────────────────────────────────

  {
    id: 'rela_return_to_faith',
    phase: 'midlife',
    weight: 3,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('faith_crisis')) && !G.flags.includes('left_religion') && G.age >= 35 && !G.mem?.return_to_faith,
    text: 'You go back. Something brought you — a child born, a parent dying, a silence so large you needed something to fill it that was not you. You sit in the back of the place you grew up in. The liturgy is inside you still, word for word. This is one of those returns that cannot be explained and does not require it.',
    choices: [
      { text: 'Return fully — this is where you belong', tag: 'devout', outcome: 'The faith that comes back is quieter than the one you left. Less certain. More durable. You do not need it to answer every question.', effect: (p) => { p.m += 15; p.karma += 8; p.addFlag('devout'); p.setMem('return_to_faith', true) } },
      { text: 'Return partially — a foot in the door', tag: null, outcome: 'You come when it matters. You stay through the hard parts. This is, perhaps, enough.', effect: (p) => { p.m += 8; p.karma += 4; p.setMem('return_to_faith', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_mature_faith',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('devout') && G.age >= 40 && !G.mem?.mature_faith,
    text: 'The faith you have at forty is not the one you inherited at seven. The certainties have been replaced with something more like trust — a willingness to act from a position that cannot be proven. You have less interest in convincing anyone. You have more interest in the practice itself, in what it asks of you day to day, in whether you are living in the direction it points.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 8; p.e += 4; p.setMem('mature_faith', true) },
  },

  {
    id: 'rela_different_tradition',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.flags.includes('lost_faith') || G.flags.includes('faith_crisis')) && G.age >= 22 && G.age <= 45 && !G.mem?.different_tradition,
    text: 'You find your way to a different tradition than the one you were born into. It might be a different denomination, a different religion entirely, or something without a name. The attraction is specific: something in the practice fits something in you that the inherited faith never reached. The strangeness of it is part of the appeal.',
    choices: [
      { text: 'Commit to it — this is the one that fits', tag: 'devout', outcome: 'The conversion or transition is not simple. The fit, when it holds, is different from belonging to something by birth. It is chosen, which makes it yours.', effect: (p) => { p.m += 14; p.karma += 6; p.addFlag('devout'); p.setMem('different_tradition', true) } },
      { text: 'Explore it without committing', tag: null, outcome: 'You attend and read and sit with it for a long time. That is its own form of practice.', effect: (p) => { p.m += 6; p.e += 5; p.setMem('different_tradition', true) } },
    ],
    effect: null,
  },

  // ── INTERFAITH DYNAMICS ──────────────────────────────────────────────────────

  {
    id: 'rela_interfaith_relationship_arc',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.age >= 20 && G.age <= 38 && G.partner && !G.mem?.interfaith_arc,
    text: 'The person you are with does not share your religion. This was not planned. The families have opinions that are conveyed through specific silences and specific questions. Your grandmother asks, at a family meal, what the children will be raised as. The question is not unreasonable. You have not answered it between yourselves yet.',
    choices: [
      { text: 'Discuss it honestly and find an agreement', tag: null, outcome: 'You disagree for a while and then you find a position you can both stand on. The conversation required of you was real.', effect: (p) => { p.m += 8; p.partnerRel(10); p.setMem('interfaith_arc', true) } },
      { text: 'Defer it — you will figure it out when it is relevant', tag: null, outcome: 'The question returns. It is always more complicated when it is relevant. But you are still together. That is something.', effect: (p) => { p.m += 3; p.r += 5; p.setMem('interfaith_arc', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_raising_interfaith_children',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.children && G.children.length > 0 && G.partner && G.age >= 28 && G.age <= 50 && !G.mem?.interfaith_children,
    text: 'The question of the children. You attend your tradition, your partner attends theirs, and your child looks between the two and asks which one is true. You give an honest answer or an evasive one, and either way you understand that you are transmitting something, and that what you transmit is not only theology.',
    choices: [
      { text: 'Raise them in both — let them choose later', tag: null, outcome: 'They will choose, or they won\'t. What they have is a wider map than either of you had alone.', effect: (p) => { p.m += 8; p.partnerRel(6); p.setMem('interfaith_children', true) } },
      { text: 'Agree on one tradition for the household', tag: null, outcome: 'The decision required something from one of you. Whether it is fully resolved or merely agreed to is a distinction you will feel at odd moments.', effect: (p) => { p.m += 5; p.r += 5; p.setMem('interfaith_children', true) } },
    ],
    effect: null,
  },

  {
    id: 'rela_interfaith_congregation',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.interfaith_congregation && ['wealthy_west', 'wealthy_east', 'developing_urban'].includes(G.character.country.archetype),
    text: 'You find a congregation or a community that is not one tradition — a Unitarian church, an interfaith dialogue group, a progressive mosque where multiple practices are honored. The theology is less precise. The community is stranger. There is something specific about worshipping alongside people who pray differently, who are trying at the same question by a different road.',
    choices: null,
    effect: (p) => { p.m += 10; p.s += 6; p.setMem('interfaith_congregation', true) },
  },
]

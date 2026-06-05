// events_gifted_2.js — The deeper gifted arc
//
// Extends events_gifted.js with:
//   § 1  The Gould Arc — the gift never named; the cotton field; the parallel
//        unlived life; the widening from personal to historical understanding
//   § 2  Generational transmission — sibling split; parent echo; child carries it
//   § 3  Prodigy cost — the burden of early identification; burnout; recovery
//   § 4  Exploitation arc — the bad contract; stolen credit; reckoning
//   § 5  Context-specific arcs — diaspora unlock; state colonises the gift;
//        radicalization; late-bloomer return
//   § 6  Full realization path — deep immersion; peer encounter; creative
//        crisis; integration synthesis; the ultimate work
//   § 7  Late-life grace — the anniversary door; late tribute; the widening

const isGifted = (G) =>
  G.flags.has('born_gifted_intellectual') ||
  G.flags.has('born_gifted_musical') ||
  G.flags.has('born_gifted_athletic') ||
  G.flags.has('born_gifted_artistic') ||
  G.flags.has('born_gifted_linguistic')

const giftType = (G) => {
  if (G.flags.has('born_gifted_intellectual')) return 'intellectual'
  if (G.flags.has('born_gifted_musical')) return 'musical'
  if (G.flags.has('born_gifted_athletic')) return 'athletic'
  if (G.flags.has('born_gifted_artistic')) return 'artistic'
  if (G.flags.has('born_gifted_linguistic')) return 'linguistic'
  return null
}

// ═══════════════════════════════════════════════════════════════════════════════
// § 1 — THE GOULD ARC
// "People of equal talent have lived and died in cotton fields and sweatshops."
// ═══════════════════════════════════════════════════════════════════════════════

const GOULD_ARC_EVENTS = [

  {
    id: 'gift_never_named',
    phase: 'late_life',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      !G.flags.has('gift_recognized') &&
      G.age >= 62 &&
      !G.mem?.giftNeverNamedFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'Late in life you understand that the thing you have always been able to do — the pattern underneath the pattern, the answer before the question is finished — was never named by anyone outside your own skull. The naming wasn\'t available. The world you grew up in didn\'t have a category for it, or had the category and kept it for other people.'
      if (type === 'musical') return 'Late in life you understand that the way you hear music — the structure under the melody, the architecture the composer was thinking in, which you have always heard directly without being taught — was never named. Nobody ever handed you a word for it. You had the thing; you never had the word. They turn out to be very different.'
      if (type === 'athletic') return 'Late in life you understand that the body you were given was exceptional by any measure. You used it for the work that was available. The work that was available was not the work the body was built for. These two facts have always coexisted. You are only now finding words for the coexistence.'
      if (type === 'artistic') return 'Late in life you understand that the way you see — the composition inside things before they\'re made, the relationships between shapes that most people never notice — was never named. Not by a teacher, not by anyone. You made things in the margins of a life that needed other things from you. The making was real. Nobody had a name for what made it different.'
      return 'Late in life you understand that the facility with words — the way they arrive complete, the ear for what a sentence is doing — was never named. Not by a teacher, not in a class. You wrote things in the spaces the life permitted. Whether they were good is not the question. The question is what you might have made with the right conditions. That question doesn\'t have a living answer anymore.'
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r -= 4; p.addFlag('gift_never_named'); p.setMem('giftNeverNamedFired', true) },
  },

  {
    id: 'gift_parallel_unlived',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      !G.flags.has('gift_fulfilled') &&
      G.age >= 42 &&
      !G.mem?.giftParallelFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'You read a paper — a proof, a result — and recognize the method. Not because you\'ve encountered it before. Because you were moving in exactly this direction, years ago, before the path closed. Someone else got there. They had different circumstances. The mathematics is right and clean and the work is exactly what you would have made.'
      if (type === 'musical') return 'A recording surfaces — an album, a song — and you sit with it for a long time. The harmonic choices are the ones you were always hearing in your head. Another musician got there. You don\'t begrudge them. You have been waiting to hear this without knowing you were waiting.'
      if (type === 'athletic') return 'You watch the performance on television — the specific physical intelligence, the movement pattern that has always seemed obvious to you in a way it apparently isn\'t to most people. Someone else has this body, this ability, this gift. They had different circumstances. They got out.'
      if (type === 'artistic') return 'You see the work in a museum catalogue or a magazine, and you know immediately, with a certainty that doesn\'t require reasoning, that you were making your way toward exactly this. The composition, the logic of the piece. Another artist got there. Different life, same gift.'
      return 'You read something — a novel, an essay, a collection — and the sentences have the quality yours always had in the margins of your notebooks. Someone else got the conditions. They did the work you would have done. The work is very good. You read it twice.'
    },
    choices: [
      {
        text: 'This is clarifying, not only painful',
        tag: null,
        outcome: 'The talent was real. The path wasn\'t there. These are separate facts. You hold them separately.',
        effect: (p) => { p.r -= 3; p.m += 3; p.addFlag('gift_parallel_understood'); p.setMem('giftParallelFired', true) },
      },
      {
        text: 'You close the book',
        tag: null,
        outcome: 'Not today. Maybe not ever. Some things are allowed to be too much.',
        effect: (p) => { p.r += 4; p.setMem('giftParallelFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_cotton_field_late',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_wasted') &&
      G.age >= 65 &&
      !G.mem?.giftCottonFieldFired,
    text: (G) => {
      const isUSA = G.currentCountry?.name === 'United States'
      const archetype = G.currentCountry?.archetype ?? ''
      const isDeveloping = ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(archetype)
      if (isUSA && G.flags.has('experienced_racism')) return 'You have spent your life doing the work available to someone in your position, in your time. You were built for something else. These are separate facts. You have always known both. The knowing is specific, like a date on a calendar: this is what I was; this is what the world made available. The gap between them did not close. You are old enough to stop expecting it to.'
      if (isDeveloping) return 'The life you built was the life the circumstances permitted. There was another life inside you that the circumstances did not permit. You learned, slowly, not to measure them against each other. You have not entirely succeeded at this. You have succeeded enough.'
      return 'Late in life the clarity is complete: you were made for something the world didn\'t let you do. The world had its reasons. The reasons were not about you. Being not about you didn\'t make them less consequential. You carry both halves of that sentence into whatever time remains.'
    },
    choices: null,
    effect: (p) => { p.r -= 5; p.m += 4; p.addFlag('gift_cotton_field_reckoned'); p.setMem('giftCottonFieldFired', true) },
  },

  {
    id: 'gift_gould_understanding',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_wasted') || G.flags.has('gift_suppressed') || G.flags.has('gift_never_named')) &&
      G.age >= 68 &&
      !G.mem?.giftGouldFired,
    text: 'Late in life you understand your story is not about you specifically. The gift was never rare. What was rare was the path — the teacher who noticed, the scholarship that arrived, the year that happened to be 1965 rather than 1950. Across the decades you have known, how many others were exactly what you were, carrying exactly what you carried, and had none of those things? The thought is not comfortable. It is accurate. It is also, in a strange way, a relief: the failure was not yours. The mathematics of it were always structural.',
    choices: [
      {
        text: 'You hold this as a responsibility — make sure someone you know doesn\'t repeat it',
        tag: null,
        outcome: 'The understanding becomes action. It is late, but it is not nothing.',
        effect: (p) => { p.karma += 10; p.m += 5; p.r -= 8; p.addFlag('gift_gould_understood'); p.addFlag('gift_passed_on'); p.setMem('giftGouldFired', true) },
      },
      {
        text: 'The clarity is enough — you carry it as knowledge, not obligation',
        tag: null,
        outcome: 'You have been carrying things all your life. The understanding is its own thing. It doesn\'t have to be a task.',
        effect: (p) => { p.m += 6; p.r -= 6; p.addFlag('gift_gould_understood'); p.setMem('giftGouldFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 2 — GENERATIONAL TRANSMISSION
// ═══════════════════════════════════════════════════════════════════════════════

const GENERATIONAL_EVENTS = [

  {
    id: 'gift_sibling_split',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      (G.siblings ?? []).length > 0 &&
      !G.mem?.giftSiblingFired,
    text: (G) => {
      const sib = G.siblings[0]
      const sibName = sib?.name ? sib.name.split(' ')[0] : 'your sibling'
      return `${sibName} got the path that wasn't there for you. Your scores were comparable — the teacher wrote letters for both of you. There was enough money for one. ${sibName} sends money home now. They are very good at what they do. You think about this less than you expected to. Or you have learned to think about it less.`
    },
    choices: [
      {
        text: 'You are glad for them — this is not a competition',
        tag: null,
        outcome: 'The gladness is real. So is the other thing. You hold both without letting either ruin the relationship.',
        effect: (p) => { p.m -= 3; p.r += 3; p.addFlag('gift_sibling_split'); p.setMem('giftSiblingFired', true) },
      },
      {
        text: 'It sits in you — you can\'t pretend it doesn\'t',
        tag: null,
        outcome: 'You don\'t pretend. The relationship survives it, mostly. The not-pretending costs something in the short term and saves something larger in the long term.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('gift_sibling_split'); p.setMem('giftSiblingFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_parent_echo',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      Object.values(G.parents ?? {}).some(p => !p.alive) &&
      G.age >= 38 &&
      !G.mem?.giftParentEchoFired,
    text: (G) => {
      const type = giftType(G)
      const deadParent = Object.values(G.parents ?? {}).find(p => !p.alive)
      const parentLabel = deadParent?.gender === 'male' ? 'father' : 'mother'
      if (type === 'intellectual') return `Going through your ${parentLabel}'s things you find a notebook. The calculations inside are more sophisticated than anything they would have needed for the life they lived. The margins are full of patterns. You sit with this for a long time. You would like to ask them a question you don't have the words for.`
      if (type === 'musical') return `Going through your ${parentLabel}'s things you find recordings — not commercial recordings, but cassette tapes of them playing, alone, in what sounds like a room late at night. The playing is extraordinary. You have never heard this before. They never mentioned it.`
      if (type === 'athletic') return `An old photograph surfaces — your ${parentLabel} in some kind of competition, young, posture perfect in a way that the body knows. You show it to someone who would understand. They look at it for a while and then they say: who was this?`
      if (type === 'artistic') return `Going through your ${parentLabel}'s things you find drawings — rolled up, in a cardboard tube at the back of a wardrobe. Dozens of them. The work is remarkable: technically sophisticated, observationally precise. They made these alone and kept them hidden and never said a word.`
      return `Going through your ${parentLabel}'s things you find letters they wrote but never sent — drafts of things, the paper full of crossings-out and revisions and a level of attention to language that you recognize. That specific quality. They had it. They had it and had nowhere to put it.`
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('gift_parent_had_it'); p.setMem('giftParentEchoFired', true) },
  },

  {
    id: 'gift_child_carries_it',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      (G.children ?? []).some(c => c.age >= 6 && c.age <= 14) &&
      G.age >= 32 &&
      !G.mem?.giftChildCarriesFired,
    text: (G) => {
      const type = giftType(G)
      const child = (G.children ?? []).find(c => c.age >= 6 && c.age <= 14)
      const childName = child?.name ? child.name.split(' ')[0] : 'your child'
      if (type === 'intellectual') return `${childName} solves a puzzle before you finish reading it aloud. You watch their face while they work — the specific stillness you remember from your own childhood, the concentration that isn't effort but something more like listening. You know what this is. You have been waiting to recognize it.`
      if (type === 'musical') return `${childName} hums something on the way to school — not a song you recognize, something they\'ve made up, and the harmonic logic of it is correct in a way it shouldn\'t be at their age. You stop walking. You ask them to hum it again. They look at you like you\'re being strange.`
      if (type === 'athletic') return `Watching ${childName} move — running in the yard, climbing, just crossing a room — you see the economy of it. The body organized differently from most bodies at that age. You have this exact memory from your own childhood, from the inside. You are seeing it from the outside now.`
      if (type === 'artistic') return `${childName} draws something and leaves it on the table. You pick it up meaning to move it. You don\'t move it. The spatial reasoning in the composition is not what children\'s drawings usually contain. You set it back down carefully.`
      return `${childName} writes something for school — a short assignment, two paragraphs — and you read it three times. The sentence at the end does the thing that most writers spend years learning to do: it says the true thing sideways. They wrote it without thinking about it. That\'s how you know.`
    },
    choices: [
      {
        text: 'This child will have everything you didn\'t',
        tag: null,
        outcome: 'The decision is made before the conversation even starts. Whatever the path costs, you pay it.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('gift_child_has_it'); p.addFlag('gift_passed_on'); p.setMem('giftChildCarriesFired', true) },
      },
      {
        text: 'You notice — but you don\'t want to project your own story onto them',
        tag: null,
        outcome: 'A careful approach. You watch. You make sure the path is there without forcing them down it.',
        effect: (p) => { p.m += 5; p.addFlag('gift_child_has_it'); p.setMem('giftChildCarriesFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_second_generation_path',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      G.flags.has('gift_child_has_it') &&
      !G.mem?.giftSecondGenFired,
    text: 'The path that wasn\'t there for you is there for them — you made it there. The scholarship, the programme, the contact you eventually found, the money you saved specifically for this. You watch them leave for the thing you couldn\'t go to. The feeling is not simple. It contains grief and completion and something that is technically pride but runs deeper than that word usually reaches.',
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 8; p.r -= 8; p.addFlag('gift_second_generation'); p.setMem('giftSecondGenFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 3 — PRODIGY COST
// ═══════════════════════════════════════════════════════════════════════════════

const PRODIGY_EVENTS = [

  {
    id: 'gift_prodigy_weight',
    phase: 'adolescence',
    weight: 9,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_cultivated') &&
      G.stats.wealth >= 55 &&
      G.age >= 12 && G.age <= 16 &&
      !G.mem?.giftProdigyWeightFired,
    text: 'You have been the exceptional one since you were six. The exceptionalism is now the whole of how people see you — teachers, parents, the journalists who arrived once or twice, the coaches and tutors arranged specifically around the gift. You understand, somewhere around fourteen, that what they want is the performance of it. Not you specifically, but the extraordinary child they can point to. You are the pointing and not the person pointed at.',
    choices: [
      {
        text: 'Perform it — the gift is the life, for now',
        tag: null,
        outcome: 'The performance becomes second nature. It will take years to find the self underneath it.',
        effect: (p) => { p.e += 5; p.m -= 10; p.addFlag('prodigy_burden'); p.setMem('giftProdigyWeightFired', true) },
      },
      {
        text: 'Push back — find out who you are when the gift isn\'t performing',
        tag: null,
        outcome: 'The rebellion is messy and necessary and costs you six months with your coach and a year with your parents. Worth it.',
        effect: (p) => { p.e += 2; p.m -= 3; p.s += 4; p.addFlag('gift_identity_found'); p.setMem('giftProdigyWeightFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_burnout',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_fulfilled') || G.flags.has('pro_athlete') || G.flags.has('acclaimed_musician') || G.flags.has('acclaimed_writer') || G.flags.has('acclaimed_artist')) &&
      G.age >= 24 && G.age <= 34 &&
      !G.mem?.giftBurnoutFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'athletic') return 'You are the best in the world at the thing you have been doing since you were four. You have not chosen this in any meaningful sense of chosen. You are twenty-seven and when you cross the finish line and the crowd sounds the way the crowd sounds, the feeling that arrives is not what it should be. You don\'t know what it is. You know it is not what you expected.'
      if (type === 'musical') return 'You have been performing since you were nine. The music is still there — the love of it is still there, you think, underneath something that has grown over it. The touring is the surface. The rehearsals are the surface. Below them is something you haven\'t touched in years.'
      if (type === 'intellectual') return 'The work is going well by every external measure. You are publishing, citing, being cited. You have been doing this since graduate school and you are thirty-one and somewhere in the last year the thing that used to pull you to the desk has been replaced by the thing that says you should go to the desk.'
      if (type === 'artistic') return 'You are still making the work. The work is still good. What has changed is the room you work in — not the physical room but the interior one, where the decisions used to feel self-evident and now require something that feels more like effort than it used to.'
      return 'The writing is going well. The reviews are good. You are thirty and you have been doing this since you could hold a pen and somewhere in the last months the sentence that used to arrive complete now has to be assembled. You don\'t know if this is normal. You suspect it is not.'
    },
    choices: [
      {
        text: 'Take a break — stop, completely, for a while',
        tag: null,
        outcome: 'The break is uncomfortable and necessary. You come back to the work differently. Not worse.',
        effect: (p) => { p.m += 6; p.fame -= 5; p.addFlag('gift_burnout_break'); p.setMem('giftBurnoutFired', true) },
      },
      {
        text: 'Push through — burnout is a performance, and you don\'t perform burnout',
        tag: null,
        outcome: 'You keep going. The work continues. The thing underneath continues to erode.',
        effect: (p) => { p.m -= 12; p.h -= 5; p.addFlag('prodigy_burden'); p.setMem('giftBurnoutFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_burnout_recovery',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_burnout_break') &&
      G.age >= 30 && G.age <= 45 &&
      !G.mem?.giftBurnoutRecFired,
    text: 'You come back to the work from the break and something has shifted — not the gift, which is exactly where you left it, but your relationship to it. The performance has been stripped out. What remains is the actual thing: the gift and you, the way it was when you were nine before anyone was watching. You had forgotten this feeling. You have now remembered it.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 4; p.addFlag('gift_burnout_recovered'); p.setMem('giftBurnoutRecFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 4 — EXPLOITATION ARC
// ═══════════════════════════════════════════════════════════════════════════════

const EXPLOITATION_EVENTS = [

  {
    id: 'gift_contract_trap',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      (G.flags.has('born_gifted_musical') || G.flags.has('born_gifted_athletic')) &&
      G.flags.has('gift_cultivated') &&
      G.age >= 18 && G.age <= 27 &&
      G.currentYear <= 1995 &&
      !G.mem?.giftContractFired,
    text: (G) => {
      const isMusical = G.flags.has('born_gifted_musical')
      const archetype = G.currentCountry?.archetype ?? ''
      const isUSA = G.currentCountry?.name === 'United States'
      const hasRacism = G.flags.has('experienced_racism')
      if (isMusical) {
        if (isUSA && hasRacism) return 'The record label contract is twelve pages. The man across the desk is very pleased. He uses the word opportunity several times. Your manager — you don\'t have one, you have a cousin who came with you — says it looks standard. Three years later you understand what standard means. The recordings are yours in name only. The royalties go somewhere else. Your face is on the cover. That is what you got.'
        return 'The contract is twelve pages. You sign it. The advance is real money. Three years later you understand what you signed. The recordings are yours and also not yours. The label explains this with a patience that suggests they have explained it before. They have.'
      }
      return 'The sports programme recruits you with the word scholarship. What the scholarship covers is carefully described. What it requires is described in a different section. The section about academic support exists and has no support in it. Two years in you understand: they want the athletic gift. The rest of you is administrative overhead.'
    },
    choices: [
      {
        text: 'Challenge it — you didn\'t come this far to be property',
        tag: null,
        outcome: 'The legal fight takes three years and most of the advance. You win a partial settlement. The label stops returning calls. The gift survives the institution.',
        effect: (p) => { p.m -= 8; p.mo -= 500; p.addFlag('gift_fought_exploitation'); p.setMem('giftContractFired', true) },
      },
      {
        text: 'Work within it — the gift still gets expressed, even on these terms',
        tag: null,
        outcome: 'The work continues. The arrangement is unjust. The work is still good. You hold both.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('gift_exploited'); p.setMem('giftContractFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_credit_stolen',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_intellectual') &&
      G.flags.has('gift_cultivated') &&
      G.career?.id === 'academic' &&
      (G.character?.gender === 'female' || G.currentYear < 1975) &&
      G.age >= 24 && G.age <= 38 &&
      !G.mem?.giftCreditFired,
    text: (G) => {
      const isFemale = G.character?.gender === 'female'
      const yr = G.currentYear ?? 1970
      if (isFemale && yr < 1975) return 'The paper is submitted under the senior author\'s name. You wrote the proof. He knows you wrote the proof. The department chair knows. This is not a secret — it is just how it works here. The convention is called senior authorship and it has a long history and the history is not about seniority in the way the word implies. You decide what to do with the knowledge that the most important work you\'ve done has your supervisor\'s name on it.'
      if (isFemale) return 'The discovery is attributed to the team. The team is your supervisor and two colleagues who came in at the end. You have been working on this for four years. Your name is fourth on the paper. The ordering has a logic that the field understands. Whether the field should understand it that way is a different question, one that is beginning to be asked.'
      return 'The result that comes from your work is published under the group leader\'s name. This is not unusual. This is the system. Whether the system is just is something everyone in the department has an opinion on and nobody acts on.'
    },
    choices: [
      {
        text: 'Document everything and build a record for later',
        tag: null,
        outcome: 'The documentation is careful and patient. Years from now, someone will trace the provenance. You will be ready.',
        effect: (p) => { p.e += 3; p.addFlag('gift_credit_stolen'); p.addFlag('gift_documenting_claim'); p.setMem('giftCreditFired', true) },
      },
      {
        text: 'Confront it now — this is your work',
        tag: null,
        outcome: 'The confrontation is career-damaging and morally correct. You leave the institution. You find another. You carry the reputation of being difficult, which means being correct.',
        effect: (p) => { p.m -= 8; p.w -= 8; p.addFlag('gift_credit_stolen'); p.addFlag('gift_fought_exploitation'); p.setMem('giftCreditFired', true) },
      },
      {
        text: 'Accept it as the cost of doing the work here',
        tag: null,
        outcome: 'The work continues. The arrangement is unjust and continues. You find what satisfaction you can in the work itself.',
        effect: (p) => { p.m -= 6; p.r += 7; p.addFlag('gift_credit_stolen'); p.setMem('giftCreditFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_exploitation_reckoning',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_exploited') || G.flags.has('gift_credit_stolen')) &&
      G.age >= 38 && G.age <= 52 &&
      !G.mem?.giftExploitReckFired,
    text: 'The years have made the exploitation legible in a way it wasn\'t at twenty-four. Not more painful — clearer. You understand the mechanism now. You understand that it was not about you specifically but about a system that treated certain kinds of talent as a resource to extract rather than a person to develop. The understanding is cold and exact and doesn\'t make the past different. It makes the future slightly more navigable.',
    choices: [
      {
        text: 'Use what you know to make sure it doesn\'t happen to someone younger',
        tag: null,
        outcome: 'The knowledge becomes mentorship. The cycle bends.',
        effect: (p) => { p.karma += 8; p.addFlag('gift_exploitation_understood'); p.addFlag('gift_passed_on'); p.setMem('giftExploitReckFired', true) },
      },
      {
        text: 'Let it recede — you\'re done carrying it',
        tag: null,
        outcome: 'You put it down. It was heavy. Putting it down is allowed.',
        effect: (p) => { p.m += 5; p.r -= 4; p.addFlag('gift_exploitation_understood'); p.setMem('giftExploitReckFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 5 — CONTEXT-SPECIFIC ARCS
// ═══════════════════════════════════════════════════════════════════════════════

const CONTEXT_EVENTS = [

  {
    id: 'gift_diaspora_unlock',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      G.flags.has('emigrated') &&
      !G.flags.has('gift_rekindled') &&
      !G.flags.has('gift_cultivated') &&
      !G.mem?.giftDiasporaFired,
    text: (G) => {
      const type = giftType(G)
      const origin = G.character?.country?.name ?? 'your country'
      const current = G.currentCountry?.name ?? 'this country'
      if (type === 'intellectual') return `The university in ${current} looks at your examination results and takes them at face value. They don\'t ask who your family is or what your postcode was. The scores have always been the scores. What\'s different is the country. You sit in a lecture hall for the first time and understand, precisely, that the barrier was never in you.`
      if (type === 'musical') return `The conservatory here has an open audition. In ${origin} the equivalent institution was not open to you. You audition. The panel listens without looking at your passport. They offer you a place. You walk out of the building and stand on the street for a while.`
      if (type === 'athletic') return `The sports programme here takes applications from anyone with the qualifying times. Your times qualified five years ago. You submit the application. They call you back. Nobody asks where you\'re from until after they\'ve already offered you the place.`
      if (type === 'artistic') return `The art school here is not stratified the way the one in ${origin} was. You submit the portfolio. The portfolio gets you in. On merit. That sentence — on merit — has never applied to you before in any formal context.`
      return `The university writing programme accepts applications from international students. You apply. They read the sample and call it exceptional. They offer you a fellowship. The word fellowship appears in the letter next to your name and you read it several times.`
    },
    choices: null,
    effect: (p) => { p.m += 10; p.e += 6; p.addFlag('gift_rekindled'); p.addFlag('gift_diaspora_unlocked'); p.setMem('giftDiasporaFired', true) },
  },

  {
    id: 'gift_state_colonizes',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_cultivated') &&
      (G.regime === 'single_party_communist' || G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship') &&
      G.currentYear >= 1930 && G.currentYear <= 1992 &&
      !G.mem?.giftStateFired,
    text: (G) => {
      const type = giftType(G)
      const yr = G.currentYear ?? 1965
      if (type === 'intellectual') return 'The state has a use for what you can do. The use is not what you would have chosen. The calculation work is precise and important and you are very good at it and you will never be told what it is for. You have guessed. The guess has not changed your performance. You do the work and put what you know about the work\'s purpose somewhere you don\'t look often.'
      if (type === 'musical') return 'The state commissions works. The commissions come with requirements — in subject, in tone, in what is not permitted. You have found that working inside constraints is its own discipline. You are making the state\'s music and hiding the music that is yours in the architecture of it, where the censors don\'t listen closely enough.'
      if (type === 'athletic') return 'The state\'s athletic programme takes you in at a high level and the level is real and the support is real and the thing that is also real is that you are representing a government you did not choose, performing a victory that belongs to an idea of the state rather than to you. You perform. The victories are genuine. The accounting is complicated.'
      if (type === 'artistic') return 'The art the state wants is legible and affirmative and not what you make when no one is watching. You make both. The public work is technically excellent and politically correct. The private work goes in a drawer. You are not sure which one you are.'
      return 'You write what the state permits in public and what you actually think in private. The private writing is not sent anywhere. The public writing is good by the standards it\'s held to. Whether the standards are the right standards is a question you ask in the private writing.'
    },
    choices: [
      {
        text: 'Find the work inside the constraints',
        tag: null,
        outcome: 'The constraints become a kind of formal challenge. The gift survives inside them, changed but alive.',
        effect: (p) => { p.e += 5; p.m -= 5; p.addFlag('gift_constrained'); p.setMem('giftStateFired', true) },
      },
      {
        text: 'Resist — make the work that\'s actually yours, underground if necessary',
        tag: null,
        outcome: 'The resistance is real and carries real risk. The work is uncompromised. That matters to you more than safety.',
        effect: (p) => { p.e += 3; p.m -= 8; p.addFlag('gift_underground'); p.addFlag('dissident_writer'); p.setMem('giftStateFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_ceiling_radicalizes',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_suppressed') &&
      G.flags.has('experienced_racism') &&
      G.age >= 18 && G.age <= 30 &&
      !G.political_leaning &&
      !G.mem?.giftRadFired,
    text: 'The anger has changed quality. It used to be a response to specific injuries — the competition you couldn\'t enter, the programme that turned you away, the scholarship that went to someone with lower scores. Now it has a different shape: you understand the structure of it. Who benefits from the arrangement. How it reproduces itself. What it would take to change it. The gift you were born with has given you one useful thing for certain: you can see this more clearly than most people around you.',
    choices: [
      {
        text: 'The understanding becomes action',
        tag: null,
        outcome: 'The analysis is the beginning, not the conclusion. You find the people who are doing something about it.',
        effect: (p) => { p.addFlag('political_active'); p.addFlag('gift_radicalized'); p.karma += 6; p.setMem('giftRadFired', true); p.setPolitical('left') },
      },
      {
        text: 'The understanding is enough — you channel the energy into the gift itself',
        tag: null,
        outcome: 'You make the gift itself a form of resistance. The work is the answer.',
        effect: (p) => { p.addFlag('gift_underground'); p.addFlag('gift_radicalized'); p.e += 4; p.setMem('giftRadFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_late_bloomer_return',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_deferred') &&
      !G.flags.has('gift_rekindled') &&
      !G.flags.has('gift_cultivated') &&
      G.age >= 35 && G.age <= 48 &&
      !G.mem?.giftLateBloomFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'You have been doing the work available to you for twenty years. The mathematics never left. You find yourself solving problems in your head on the commute, tracing proofs in the margins of work documents. A continuing education programme at the university accepts non-traditional students. You are forty-one. You apply.'
      if (type === 'musical') return 'You never stopped listening. You never fully stopped playing — there was a period, but that period ended. A music school in the city has adult evening classes. The teacher in the first session pauses mid-class and asks you how long you\'ve been playing. You say: since I was very young. He says: and what happened? You say: life. He nods like this is a complete sentence.'
      if (type === 'athletic') return 'The body is not what it was. It\'s also not what it would have been if you\'d been training for twenty years. What it is: still unusual, still organized differently than most bodies, still carrying the original gift under two decades of normal living. A masters programme, a local team, a coach who takes adult returners. You find your way back.'
      if (type === 'artistic') return 'A life drawing class, an open studio, someone who sees what you can do and says you should be doing more of this. The beginning is awkward because beginnings at forty are awkward. Then it isn\'t. The gift was exactly where you left it.'
      return 'A night class. A writing group. An online journal that takes submissions from anyone. You submit something you wrote at three in the morning. They publish it. Then they ask for more. You are forty-two years old and the door is open, small and late and yours.'
    },
    choices: [
      {
        text: 'Go through it — whatever is on the other side is yours',
        tag: null,
        outcome: 'The path is narrower than it would have been at twenty-two. It is still a path. You are on it.',
        effect: (p) => { p.m += 8; p.e += 5; p.addFlag('gift_rekindled'); p.addFlag('gift_late_bloomer'); p.setMem('giftLateBloomFired', true) },
      },
      {
        text: 'The moment has passed — it\'s too late for this version of the life',
        tag: null,
        outcome: 'You decide not. The decision is allowed. It does not fully settle.',
        effect: (p) => { p.r += 8; p.addFlag('gift_deferred_final'); p.setMem('giftLateBloomFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 6 — FULL REALIZATION PATH
// The chain from gift_cultivated through to gift_realized.
// Only gifted characters who cultivate their gift AND go deep AND face a
// crisis AND integrate it with their full life can reach full realization.
// ═══════════════════════════════════════════════════════════════════════════════

const REALIZATION_EVENTS = [

  {
    id: 'gift_deep_immersion',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      (G.flags.has('gift_fulfilled') || G.flags.has('acclaimed_musician') || G.flags.has('acclaimed_writer') || G.flags.has('acclaimed_artist') || G.flags.has('pro_athlete') || G.flags.has('tenured_professor')) &&
      !G.flags.has('gift_burnout_break') &&
      G.age >= 28 && G.age <= 52 &&
      !G.mem?.giftDeepImmersionFired,
    text: 'You arrange the conditions: time, isolation, the work and nothing else. People call it different things — a residency, a sabbatical, a retreat, just leaving. Whatever the word, the structure is the same. You go somewhere. There is only the work. The days lose their normal texture. What replaces it is something else — a quality of attention you haven\'t had since you were twelve, before anyone had expectations. You remember this feeling. This is the feeling the gift requires.',
    choices: [
      {
        text: 'Go completely — six months, full withdrawal',
        tag: null,
        outcome: 'You come back different. The work you make in the immersion is the best of your career. You know it while you\'re making it.',
        effect: (p) => { p.e += 8; p.m += 5; p.fame -= 3; p.addFlag('gift_deep_immersion'); p.setMem('giftDeepImmersionFired', true) },
      },
      {
        text: 'Go — but maintain enough structure to come back cleanly',
        tag: null,
        outcome: 'A partial immersion. Still the most productive period of the last decade. The work advances.',
        effect: (p) => { p.e += 4; p.m += 2; p.addFlag('gift_deep_immersion'); p.setMem('giftDeepImmersionFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_peer_encounter',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_cultivated') || G.flags.has('gift_rekindled')) &&
      G.age >= 22 && G.age <= 42 &&
      !G.mem?.giftPeerFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'You meet someone who can fully see what you\'re doing. Not a teacher — the relationship with a teacher is vertical. A peer. Someone whose work you can barely outpace, who catches every implication before you\'ve finished stating it, who pushes back not to correct you but because they\'re already ahead. You have been the exceptional one in every room for as long as you can remember. You are not the exceptional one in this conversation. The conversation is the best thing that has happened to your work in years.'
      if (type === 'musical') return 'You play with someone who is as good as you. Not a hero — an equal. The session lasts four hours and at the end you are both exhausted in the specific way that comes from being truly extended. You have never been in a musical conversation like this. You hadn\'t known you were missing it.'
      if (type === 'athletic') return 'You train against someone who matches you, which almost never happens. The sessions are a different kind of session — the body pushed to a limit it hasn\'t seen before, revealing capabilities you didn\'t know were there. You get faster. You get better. Competition is not the word for this.'
      if (type === 'artistic') return 'You meet someone whose work you\'ve admired for years and the admiration turns out to be mutual, which is stranger than you expected. You work in adjacent studios for three months. The proximity changes the work — not by influence, but by the presence of another standard.'
      return 'You read someone whose sentences make you want to put the book down and restart your current project from scratch, which you do. You eventually meet them. The meeting confirms the sentences. You are in a room with an equal, which is the rarest thing.'
    },
    choices: [
      {
        text: 'Pursue the relationship — peers at this level are rare',
        tag: null,
        outcome: 'The creative friendship lasts decades and marks everything that follows. The standard of it stays in you.',
        effect: (p) => { p.e += 7; p.s += 4; p.addFlag('gift_peer_found'); p.setMem('giftPeerFired', true) },
      },
      {
        text: 'One encounter is enough — the standard is set',
        tag: null,
        outcome: 'You don\'t pursue the friendship but you carry the encounter. The bar it set is permanent.',
        effect: (p) => { p.e += 4; p.addFlag('gift_peer_found'); p.setMem('giftPeerFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_creative_crisis',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_fulfilled') &&
      !G.flags.has('gift_wasted') &&
      G.age >= 28 && G.age <= 52 &&
      !G.mem?.giftCrisisFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'The proof has a flaw. You find it yourself, at three in the morning, six months after publication. The flaw is structural. The result still holds, probably, but the path to it doesn\'t. You spend the next four months alone with the problem. You tell no one. The problem is the whole thing: the years of work, whether the approach was right, whether you have been building in the wrong direction.'
      if (type === 'musical') return 'The album is finished and you listen to it and something is wrong — not technically, the technique is fine — wrong in a way that you can hear and can\'t name. You go back into the studio alone. You start again. You have already told the label it\'s done. You call them and say it isn\'t done. This conversation is difficult.'
      if (type === 'athletic') return 'The technique is failing. Not the body — the technique. Something you\'ve been doing for fifteen years is producing diminishing results and when you go back to the video you can see exactly when it changed and why and the change is something you introduced deliberately three years ago and thought was an improvement. You have to unlearn it. You have to go back before the change.'
      if (type === 'artistic') return 'You destroy six months of work. Not impulsively — after looking at it for two weeks and understanding that it is going in the wrong direction and the direction cannot be corrected from where it is. You go back to the beginning. The studio is empty. This is the right condition.'
      return 'The book has a problem at its structural centre that makes everything else not work. You find it 200 pages into the second draft. The problem cannot be patched. The book has to be rebuilt. You sit with this for three months before you can start.'
    },
    choices: [
      {
        text: 'Go back to the beginning — build on what\'s actually true',
        tag: null,
        outcome: 'The rebuild takes everything. What comes out of it is different in kind from what came before. The crisis was the door.',
        effect: (p) => { p.m -= 15; p.e += 12; p.addFlag('gift_crisis_through'); p.setMem('giftCrisisFired', true) },
      },
      {
        text: 'Find a way around — adapt, salvage, move forward',
        tag: null,
        outcome: 'The crisis is managed rather than resolved. The work continues. The doubt continues under it.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('gift_crisis_around'); p.setMem('giftCrisisFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_integration_synthesis',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_fulfilled') &&
      (G.flags.has('experienced_racism') || G.flags.has('emigrated') || G.flags.has('lost_child') || G.flags.has('widowed') || G.flags.has('double_consciousness') || G.flags.has('war_childhood')) &&
      G.age >= 38 &&
      !G.mem?.giftIntegrationFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'The work you are making now is different from the work you made before the thing that happened. Not better-crafted — informed. The grief or the displacement or the specific knowledge of exclusion is inside the mathematics now, or the research design, or the question you chose. The gift has absorbed the life and become something that neither the gift nor the life could have produced alone.'
      if (type === 'musical') return 'The music you\'re making now has the loss in it — or the crossing, or the years of being the only one in the room. Not as subject matter. As structure. The harmonic choices come from somewhere the earlier work didn\'t reach. The gift found its subject matter in the life rather than beside it.'
      if (type === 'artistic') return 'The work has changed. Not technically — you\'ve been able to do this for twenty years. Something else: it knows something now that it didn\'t know before. The grief, the displacement, the specific texture of a life that went through the things yours went through — it\'s in the work. The gift and the biography have finally become the same thing.'
      return 'The writing has the life in it now — not as autobiography, but as ground. The losses and the crossings and the years of navigating rooms not built for you are the foundation the sentences are built on. The gift always had this capacity. The life had to fill it first.'
    },
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('gift_integration_synthesis'); p.setMem('giftIntegrationFired', true) },
  },

  {
    id: 'gift_ultimate_work',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_extraordinary') &&
      (G.flags.has('gift_deep_immersion') || G.flags.has('gift_peer_found') || G.flags.has('gift_crisis_through') || G.flags.has('gift_integration_synthesis')) &&
      G.age >= 30 && G.age <= 62 &&
      !G.mem?.giftUltimateFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'The proof closes. You know it closes not because you\'ve run out of things to add but because there\'s nothing that would improve it — and that feeling, which you\'ve had once before briefly, is back and this time it holds. The result is true and clean and the path to it is the most direct path available. You sit with it for a day before you send it anywhere. The day is necessary.'
      if (type === 'musical') return 'The record is finished. You\'ve listened back twice, which is all you allow yourself. The second time through you heard nothing you wanted to change — not because it\'s perfect but because any change would be you and not the music. The music is itself now. That is what you\'ve been trying to make since you were seven years old, in that church, humming the part the organ missed.'
      if (type === 'athletic') return 'The performance is complete — not just successful, complete. You can feel the difference. The thing you\'ve been building since childhood came together in that hour in a way you couldn\'t have designed, that required every year of preparation and still exceeded what the preparation was preparation for. You will perform better technically. You know this was different from better.'
      if (type === 'artistic') return 'You put the brush down and it doesn\'t feel like stopping — it feels like arriving. You\'ve been making work for twenty years. This is the work the twenty years were practice for. You know this the way you know your own handwriting. The piece is done. The piece is itself. Nothing needs to be added.'
      return 'The last sentence is written. You read it back once. It\'s the sentence the book has been building toward since page one, and you didn\'t know that until you wrote it. The book is complete in a way that none of the others were — not better-crafted, but arrived. The thing you were born to say, said.'
    },
    choices: null,
    effect: (p) => { p.m += 15; p.fame += 10; p.addFlag('gift_realized'); p.setMem('giftUltimateFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// § 7 — LATE-LIFE GRACE
// ═══════════════════════════════════════════════════════════════════════════════

const LATE_GRACE_EVENTS = [

  {
    id: 'gift_anniversary_door',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      G.mem?.giftCeilingFired &&
      G.flags.has('gift_suppressed') &&
      !G.flags.has('gift_fulfilled') &&
      (G.currentYear - (G.mem?.giftCeilingYear ?? G.currentYear)) >= 20 &&
      G.age >= 35 &&
      !G.mem?.giftAnnivFired,
    text: 'Twenty years ago, a door was closed. The closing was specific — you remember the letter, the conversation, the face of the teacher who put something in a drawer without looking up. The door is not open now. What is different is that you no longer stand in front of it. The gap between the life you have and the life the gift would have made is still legible. You have learned to live in it. That is not nothing.',
    choices: null,
    effect: (p) => { p.m += 4; p.r -= 4; p.addFlag('gift_anniversary_reckoned'); p.setMem('giftAnnivFired', true) },
  },

  {
    id: 'gift_late_tribute',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_fulfilled') || G.flags.has('gift_rekindled') || G.flags.has('gift_realized')) &&
      G.age >= 68 &&
      !G.mem?.giftLateTributeFired,
    text: (G) => {
      const type = giftType(G)
      if (type === 'intellectual') return 'A student asks to trace the lineage of the work — not the credit, the lineage, what came from what. You trace it back through your own work to the people who taught you to the paper that changed everything when you were twenty-two. The line is longer than you knew while you were inside it. You are part of it. That is a different thing from being at the end of it.'
      if (type === 'musical') return 'A musician half your age credits you publicly — not as an influence but as a reason. "I wouldn\'t be making music if I hadn\'t heard this." You read it and then put the phone down and sit with it. You were making the next thing. You didn\'t know the thing you were making when you were thirty-one would reach someone who was seven.'
      if (type === 'athletic') return 'One of the people you trained is competing at a level you barely reached. You watch the footage and recognise the correction you gave in the third month of working together — a small thing, a weight distribution, something that looked trivial at the time. It is in their body now. It will be in their body for the rest of their life.'
      if (type === 'artistic') return 'A young artist who doesn\'t know you personally shows work that carries the logic of yours in it — not imitation but genuine influence, the work saying what it learned and then saying something you couldn\'t have said. This is the correct outcome. The influence working the way it should.'
      return 'A book is dedicated to you. The dedication is spare: your name, the year you first gave them a red pen, and nothing else. The book is better than anything you have written. This is the right order of things. The gift continues past you. That was always the point.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.karma += 6; p.addFlag('gift_tribute_received'); p.setMem('giftLateTributeFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const GIFTED_2_EVENTS = [
  ...GOULD_ARC_EVENTS,
  ...GENERATIONAL_EVENTS,
  ...PRODIGY_EVENTS,
  ...EXPLOITATION_EVENTS,
  ...CONTEXT_EVENTS,
  ...REALIZATION_EVENTS,
  ...LATE_GRACE_EVENTS,
]

// events_late_life.js
// The full late-life arc: retirement, partner aging and death, grandchildren,
// health decline, legacy, and the slow shrinkage of the social world.
// Phase: 'late_life' (50+). Some retirement events use 'midlife'.

export const LATE_LIFE_EVENTS = [

  // ── RETIREMENT ───────────────────────────────────────────────────────────────

  {
    id: 'retire_voluntary',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      !G.flags.includes('retired') &&
      !G.mem.retireVoluntary &&
      G.age >= 55 && G.age <= 70 &&
      G.stats.wealth >= 45,
    text: 'The last day arrives and you clean out your desk. It does not take as long as you expected — a box, a bag, a plant. You say goodbye to people you have seen every weekday for years. They seem more affected than you are. You carry the box to the car, drive home, and sit at the kitchen table in the middle of the afternoon with nowhere to be.',
    choices: [
      {
        text: 'Mark it somehow — dinner, a bottle of something good',
        tag: null,
        outcome: 'You sit with the strangeness of it. It feels correct and strange simultaneously.',
        effect: (p) => { p.m += 8; p.addFlag('retired'); p.setMem('retireVoluntary', true) },
      },
      {
        text: 'No ceremony. It was a job.',
        tag: null,
        outcome: 'You wake up the next morning and there is nothing to dress for. The silence in the house is new.',
        effect: (p) => { p.m -= 4; p.r += 3; p.addFlag('retired'); p.setMem('retireVoluntary', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'retire_forced',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      !G.flags.includes('retired') &&
      !G.mem.retireForced &&
      G.age >= 58 && G.age <= 65,
    text: (G) => {
      const isAuthoritarian = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian'].includes(G.regime)
      if (isAuthoritarian) {
        return 'The reassignment is framed as an honor — a recognition of your years of service. The reality is that you are being moved aside. Your replacement is thirty-four. You clean your desk in a single morning and do not make a scene.'
      }
      return 'The restructuring catches twelve people in your department. Your manager, who is fifteen years younger, explains it in a meeting. Efficiency, he says. Organizational alignment. You nod. On the drive home you feel something you cannot quite name — not grief exactly, more like being informed that you have already ended.'
    },
    choices: [
      {
        text: 'Find legal advice — this may not be legitimate',
        tag: null,
        outcome: 'The lawyer says the package is on the low end but not actionable. You take it.',
        effect: (p) => { p.m -= 10; p.e += 3; p.addFlag('retired'); p.addFlag('forced_out'); p.setMem('retireForced', true) },
      },
      {
        text: 'Take the package and go quietly',
        tag: null,
        outcome: 'You sign the papers. The bitterness sits in you for longer than you expected.',
        effect: (p) => { p.m -= 16; p.r += 10; p.addFlag('retired'); p.addFlag('forced_out'); p.setMem('retireForced', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'retire_gradual',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      !G.flags.includes('retired') &&
      !G.mem.retireGradual &&
      G.age >= 60 && G.age <= 68,
    text: 'Three days a week, then two. You negotiate it carefully — the transition protects a pension contribution, gives someone time to learn the role. The mornings you stay home you do not know what to do with yourself until eleven. You clean things that are already clean. You start a project you abandon. You sit with a cup of coffee for forty minutes.',
    choices: [
      {
        text: 'Use the free days to build something new',
        tag: null,
        outcome: 'The project you keep is small, specific, and yours. It becomes a structure.',
        effect: (p) => { p.m += 6; p.e += 3; p.addFlag('semi_retired'); p.setMem('retireGradual', true) },
      },
      {
        text: 'Let the free days be free',
        tag: null,
        outcome: 'The restlessness softens after two months. The pace becomes its own thing.',
        effect: (p) => { p.m += 3; p.h += 3; p.addFlag('semi_retired'); p.setMem('retireGradual', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'retire_identity',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('retired') &&
      !G.mem.retireIdentity &&
      G.age >= 55 && G.age <= 72,
    text: 'Someone at a dinner party asks what you do. You begin to answer and stop. For the first time in thirty years you do not have a title to give. You say you are retired, and you watch them nod and look slightly past you, and you understand that the credential has expired. What remains is the question of what you actually are without it.',
    choices: [
      {
        text: 'Find the answer in what you still do and care about',
        tag: null,
        outcome: 'The answer comes slowly. It is less impressive to say aloud. It is more accurate.',
        effect: (p) => { p.m += 5; p.e += 4; p.r -= 4; p.setMem('retireIdentity', true) },
      },
      {
        text: 'The question unsettles you more than you want to admit',
        tag: null,
        outcome: 'The discomfort sits with you through the winter. Something is rearranging itself.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('retireIdentity', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'retire_poor',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('retired') &&
      !G.mem.retirePoor &&
      G.stats.wealth < 35 &&
      G.money < 5000,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'There is no pension. There was never going to be a pension. You work until you cannot, then you depend on what your children can spare. The money arrives irregularly and is never quite enough. You do not say this to them. You eat less on the days before it arrives.'
      }
      return 'The pension is smaller than you calculated. The calculation assumed things that did not happen — the savings you depleted, the years the work was interrupted. You manage. You manage carefully. You buy the cheaper cut, you turn the heating down one more degree, and you do not go to the doctor for the thing that has been bothering you for four months.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 5; p.r += 10; p.addFlag('financial_hardship_late'); p.setMem('retirePoor', true) },
  },

  // ── PARTNER AGING AND DEATH ──────────────────────────────────────────────────

  {
    id: 'late_partner_illness',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.partner.alive !== false &&
      !G.mem.latePartnerIllness &&
      G.age >= 62 && G.age <= 80,
    text: (G) => {
      const name = G.partner.name ?? 'Your partner'
      return `${name} is diagnosed with something serious — the kind of diagnosis that reorganizes everything. The doctors explain the treatment plan. You sit next to ${name} and take notes because ${name} has gone somewhere else in the room. On the drive home you do not speak. The roles are changing and you both know it.`
    },
    choices: [
      {
        text: 'Take on whatever is needed — this is what you are here for',
        tag: null,
        outcome: 'You learn the medication schedule, the hospital route, the names of the nurses. The love takes a different form.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.karma += 8; p.addFlag('caregiver_partner'); p.setMem('latePartnerIllness', true) },
      },
      {
        text: 'Ask for help — you cannot do this alone',
        tag: null,
        outcome: 'The social worker finds you a support network. You are less alone in it than you would have been.',
        effect: (p) => { p.m -= 7; p.s += 4; p.addFlag('caregiver_partner'); p.setMem('latePartnerIllness', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'late_partner_dementia',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.partner.alive !== false &&
      G.partner.married === true &&
      !G.mem.latePartnerDementia &&
      G.age >= 68 && G.age <= 85,
    text: (G) => {
      const name = G.partner.name ?? 'Your partner'
      return `${name} looks at you from the chair across the room. Then: "I'm sorry, do I know you?" The question is completely ordinary in tone. You say yes, of course, and give your name, and something in their face relaxes, and you understand that what relaxed was not recognition. You were a stranger who gave a reassuring answer. You go to the kitchen and stand at the sink until you can come back.`
    },
    choices: [
      {
        text: 'Continue as though they know you — it is better for them',
        tag: null,
        outcome: 'The grief of being unrecognized runs alongside the love. Both are present. Neither cancels the other.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.karma += 6; p.r += 8; p.setMem('latePartnerDementia', true) },
      },
      {
        text: 'Look into full-time care — you cannot hold this by yourself',
        tag: null,
        outcome: 'The facility is clean and the staff are kind. You visit every day for the first month, then every other day, and the guilt of that does not fully leave.',
        effect: (p) => { p.m -= 14; p.mo -= 8000; p.r += 12; p.setMem('latePartnerDementia', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'late_partner_death',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.partner &&
      G.partner.alive !== false &&
      !G.mem.latePartnerDeath &&
      G.age >= 65 && G.age <= 90,
    text: (G) => {
      const name = G.partner.name ?? 'Your partner'
      const wasCaregiver = G.flags.includes('caregiver_partner')
      if (wasCaregiver) {
        return `${name} dies at home, which is what they wanted. You are in the room. There is a sound, and then there is not a sound, and the difference between those two things is the whole of it. You have been preparing for this. The preparation is not preparation. You sit next to the bed for a long time before you call anyone. The house is the same house. Everything in it is wrong.`
      }
      return `${name} dies. It is sudden, or it is not sudden but it is still a shock when it comes, because nothing about it can be made abstract in advance. You have been with this person for most of your adult life. The shape of every day was built around them. You stand in a room of your own home and do not know what room to go to.`
    },
    choices: [
      {
        text: 'Call your children first',
        tag: null,
        outcome: 'They come. The house fills with people who are grieving alongside you. The company is real even when you are not fully present in it.',
        effect: (p) => { p.m -= 30; p.h -= 8; p.r += 12; p.clearPartner(); p.setMem('partnerDied', true); p.addFlag('widowed'); p.setMem('latePartnerDeath', true) },
      },
      {
        text: 'Sit with them a little longer before the calls begin',
        tag: null,
        outcome: 'You stay. The time is yours. It costs you and you would not exchange it.',
        effect: (p) => { p.m -= 28; p.h -= 6; p.r += 10; p.clearPartner(); p.setMem('partnerDied', true); p.addFlag('widowed'); p.setMem('latePartnerDeath', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'late_widowhood_first_year',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('widowed') &&
      !G.mem.lateWidowhoodFirstYear &&
      G.age >= 60,
    text: 'The practical presence of them is everywhere you did not expect. The side of the bed. The second cup you still automatically start. The specific sound the house makes when there is only one person in it. You find a note in a coat pocket — a list from the shops, unremarkable. You do not throw it away. The year passes in the way that grief years pass: longer and faster simultaneously, the weeks dissolving and the evenings not.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.setMem('lateWidowhoodFirstYear', true) },
  },

  {
    id: 'late_widowhood_social',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('widowed') &&
      G.mem.lateWidowhoodFirstYear &&
      !G.mem.lateWidowhoodSocial,
    text: 'The couples you knew as a couple do not stop inviting you, exactly. They invite you less. The dinners are arranged differently, the tables seat an even number, and you are the thing that makes the number uneven. A friend says she finds it hard to know what to say. You tell her it is fine. It is not fine but it is also not her fault. You are a different category of person now.',
    choices: null,
    effect: (p) => { p.m -= 10; p.s -= 4; p.r += 6; p.setMem('lateWidowhoodSocial', true) },
  },

  // ── GRANDCHILDREN ────────────────────────────────────────────────────────────

  {
    id: 'grandchild_born',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.children && G.children.length > 0 &&
      G.children.some(c => G.age - c.ageAtBirth >= 25) &&
      !G.flags.includes('grandchild_born') &&
      !G.mem.grandchildBorn &&
      G.age >= 45 && G.age <= 80,
    text: (G) => {
      const adult = G.children.find(c => G.age - c.ageAtBirth >= 25)
      const parentName = adult?.name ?? 'Your child'
      return `${parentName} calls. There is a noise in the background, new and specific. They say the name they have chosen. You hold the phone and try to locate something adequate to say. Later, at the hospital, you hold the child for the first time and they are so small that it seems impossible. You remember the specific smallness of your own children and you thought you had forgotten this, and you had not.`
    },
    choices: null,
    effect: (p) => { p.m += 20; p.r -= 6; p.addFlag('grandchild_born'); p.setMem('grandchildBorn', true) },
  },

  {
    id: 'grandchild_relationship',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('grandchild_born') &&
      !G.mem.grandchildRelationship &&
      G.age >= 60 && G.age <= 80,
    text: 'The child asks you to read the same book for the eleventh time. You read it for the eleventh time with the same voice and the same pauses in the same places, because the sameness is the whole point. Later you are trying to explain something — how things used to work, or how a thing is made — and they are paying attention with their whole body. The attention children give when something is genuinely interesting to them is a specific quality of light.',
    choices: null,
    effect: (p) => { p.m += 14; p.r -= 5; p.setMem('grandchildRelationship', true) },
  },

  {
    id: 'grandchild_school_visit',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.includes('grandchild_born') &&
      !G.mem.grandchildSchoolVisit &&
      G.age >= 65 && G.age <= 80,
    text: 'They ask you to come in and talk to the class. About your life, their teacher says. What it was like. You sit in a small plastic chair at the front of the room and twenty children look at you and you realize the distance between your birth year and theirs is larger than you had been treating it. You talk about things you have not thought about in years. They have questions. The questions are excellent.',
    choices: null,
    effect: (p) => { p.m += 10; p.e += 3; p.r -= 4; p.setMem('grandchildSchoolVisit', true) },
  },

  {
    id: 'grandchild_far_away',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('grandchild_born') &&
      !G.mem.grandchildFarAway &&
      (G.flags.includes('emigrated') || G.flags.includes('child_abroad') || G.currentCountry !== G.character.country?.name),
    text: 'The video calls are every Sunday, or they are supposed to be. The child grows on a screen. You see photographs. You receive voice messages. You send back voice messages with the careful diction of someone who is not sure the technology is working. The birthdays are the worst — the gap between knowing the date and being able to do nothing with your hands.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setMem('grandchildFarAway', true) },
  },

  {
    id: 'grandchild_death',
    phase: 'late_life',
    weight: 1,
    when: (G) =>
      G.flags.includes('grandchild_born') &&
      !G.mem.grandchildDeath &&
      Math.random() < 0.025,
    text: "The grandchild dies. There is no way to arrange language around this. The parents' grief is the largest thing in any room, and you move around it, and your own grief is also present but there is no frame for it. You watch your child break. You cannot do what parents are supposed to do for their children, which is absorb some of it. This is the worst order of things.",
    choices: null,
    effect: (p) => { p.m -= 30; p.h -= 8; p.r += 20; p.addFlag('lost_grandchild'); p.addFlag('bereaved'); p.setMem('grandchildDeath', true) },
  },

  // ── HEALTH DECLINE ───────────────────────────────────────────────────────────

  {
    id: 'health_first_chronic',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      !G.mem.healthFirstChronic &&
      G.age >= 50 && G.age <= 65,
    text: 'The doctor gives it a name. It is a name you have heard before — on television, in passing, from other people. Now it belongs to you. He explains what it means, what the protocol is, what you will need to do. The word chronic is in there somewhere. You leave with a prescription and sit in the car for several minutes before driving.',
    choices: [
      {
        text: 'Follow the protocol — all of it, correctly',
        tag: null,
        outcome: 'The condition is manageable when managed. This is what manageable means.',
        effect: (p) => { p.h -= 6; p.e += 3; p.addFlag('chronic_condition'); p.setMem('healthFirstChronic', true) },
      },
      {
        text: 'Take the medication, but otherwise ignore it as much as possible',
        tag: null,
        outcome: 'The avoidance has a cost that appears later.',
        effect: (p) => { p.h -= 12; p.addFlag('chronic_condition'); p.setMem('healthFirstChronic', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_mobility_loss',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthMobilityLoss &&
      G.age >= 65 && G.age <= 80 &&
      G.stats.health < 65,
    text: 'The stairs are a calculation now. You take them, but you hold the rail. Getting up from a low chair requires a plan. The body is negotiating its own terms with you, slower than it once was, less reliable. You catch yourself watching the terrain of a room before you cross it. The assessment happens without your deciding to do it.',
    choices: null,
    effect: (p) => { p.h -= 8; p.lo -= 5; p.addFlag('mobility_reduced'); p.setMem('healthMobilityLoss', true) },
  },

  {
    id: 'health_hearing_loss',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthHearingLoss &&
      G.age >= 60 && G.age <= 80,
    text: 'You ask people to repeat themselves and they do, and you still only catch most of it and fill in the rest from context. In a group you follow the surface of conversations, responding a beat late. Restaurants are the worst — the background noise levels everything out. Your grandchild says something and you say hmm, and they say it again louder, and the patience on their face is the same patience you remember using with your own parents.',
    choices: [
      {
        text: 'Get hearing aids — there is no good reason not to',
        tag: null,
        outcome: 'They help substantially. The world comes back. You waited longer than you should have.',
        effect: (p) => { p.h += 4; p.s += 3; p.m += 5; p.mo -= 3000; p.setMem('healthHearingLoss', true) },
      },
      {
        text: 'Manage without them for now',
        tag: null,
        outcome: 'The managing involves more nodding than you would like.',
        effect: (p) => { p.h -= 5; p.s -= 4; p.m -= 6; p.addFlag('hearing_loss'); p.setMem('healthHearingLoss', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_vision_loss',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthVisionLoss &&
      G.age >= 65 && G.age <= 85,
    text: 'The glasses are not enough anymore. The ophthalmologist says it is macular degeneration, or glaucoma, or simply the accumulated arithmetic of the years. Reading now requires light and time and something that is close to effort. You notice which lights in the house are not enough and you move lamps. The text on your phone you make larger. You stop reading before bed because the bed is dark.',
    choices: null,
    effect: (p) => { p.h -= 8; p.e -= 3; p.m -= 6; p.addFlag('vision_impaired'); p.setMem('healthVisionLoss', true) },
  },

  {
    id: 'health_fall',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthFall &&
      G.age >= 70 && G.age <= 90 &&
      G.stats.health < 60,
    text: 'You fall. It is not dramatic — a rug, the bottom step, the bathroom at 3 AM. You are on the floor before you registered losing your balance. The impact is real: a wrist, a hip, or nothing broken but the confidence that the body can be trusted. You lie there for a moment and take inventory. Then you get up, or you cannot get up, and these are different situations.',
    choices: [
      {
        text: 'Get up and say nothing to anyone',
        tag: null,
        outcome: 'You remove the rug. You buy a mat for the bathroom. The event has changed the architecture of how you move through your home.',
        effect: (p) => { p.h -= 10; p.m -= 8; p.r += 6; p.addFlag('had_fall'); p.setMem('healthFall', true) },
      },
      {
        text: 'Tell your children — they should know',
        tag: null,
        outcome: 'They come, or they call, and changes are made to the house, and you accept the changes.',
        effect: (p) => { p.h -= 8; p.m -= 4; p.karma += 3; p.addFlag('had_fall'); p.setMem('healthFall', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_cognitive_first',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthCognitiveFirst &&
      G.age >= 65 && G.age <= 85,
    text: 'You cannot find the word for something you know well — a common object, a name, something you have said ten thousand times. It comes back forty minutes later while you are doing something else. This has happened before. This time you sit with the feeling longer. There is a fear underneath it that is distinct from ordinary forgetting, and you know enough to be frightened of the fear itself.',
    choices: [
      {
        text: 'See the doctor and get assessed',
        tag: null,
        outcome: 'The tests suggest normal aging, for now. The word for now does a lot of work.',
        effect: (p) => { p.m -= 8; p.e += 2; p.setMem('healthCognitiveFirst', true) },
      },
      {
        text: 'Wait and see — one episode is not a pattern',
        tag: null,
        outcome: 'It happens again, then less frequently. The fear does not leave but also does not accumulate.',
        effect: (p) => { p.m -= 12; p.r += 6; p.setMem('healthCognitiveFirst', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_hospital_stay',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthHospitalStay &&
      G.age >= 65 && G.age <= 90 &&
      G.stats.health < 50,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'The ward has twelve beds and not enough nurses and the family brings food from home. Your child sleeps in the chair. The care is real even when the resources are thin. You watch what your body requires from other people and you are humbled by the quantity.'
      }
      return 'A week in the hospital. The days have no natural shape — the rhythm is institutional, imposed by meals and checks and the precise time the lights change. Visitors come and speak quietly. You are grateful for the care and exhausted by the dependence, which are two real things that coexist without resolving.'
    },
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 10; p.mo -= 2000; p.addFlag('hospital_stay_late'); p.setMem('healthHospitalStay', true) },
  },

  // ── LEGACY AND REFLECTION ────────────────────────────────────────────────────

  {
    id: 'legacy_memoir',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.legacyMemoir &&
      G.age >= 60 && G.age <= 80 &&
      G.stats.smarts >= 50,
    text: 'You open a document, or find a notebook, or dig out the drawer of things you have been keeping without purpose. The impulse is not vanity — it is closer to the feeling that the particular texture of the things you experienced will simply disappear when you do, and that seems like a waste. You write a page. It is worse than you hoped and more specific than you expected.',
    choices: [
      {
        text: 'Keep going — write it for whoever comes after',
        tag: null,
        outcome: 'The writing becomes a habit. Not everything is salvageable but some of it is true.',
        effect: (p) => { p.m += 8; p.e += 4; p.r -= 5; p.addFlag('wrote_memoir'); p.setMem('legacyMemoir', true) },
      },
      {
        text: 'Write it for yourself and keep it private',
        tag: null,
        outcome: 'The pages accumulate in a folder on the computer. They are accurate. That is enough.',
        effect: (p) => { p.m += 6; p.r -= 8; p.setMem('legacyMemoir', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'legacy_estate',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.legacyEstate &&
      G.age >= 60 && G.age <= 80 &&
      G.money >= 10000,
    text: 'The solicitor explains it carefully. Who receives what. The question of what is fair and the question of what is wanted are not always the same question. You have opinions about this. So, it turns out, do your children — some of them quietly, some of them not. The conversation costs something. At the end of it you have a document, and the document has your signature, and the decisions are made.',
    choices: [
      {
        text: 'Divide it equally — no one can say it was unfair',
        tag: null,
        outcome: 'Equal is not always equitable, but it closes the argument before it starts.',
        effect: (p) => { p.m += 3; p.r -= 3; p.karma += 4; p.addFlag('will_written'); p.setMem('legacyEstate', true) },
      },
      {
        text: 'Distribute according to who needs it and who was there',
        tag: null,
        outcome: 'The decision is more accurate and more contentious. You stand behind it.',
        effect: (p) => { p.m += 1; p.r += 4; p.karma += 6; p.addFlag('will_written'); p.setMem('legacyEstate', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'legacy_reconciliation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.legacyReconciliation &&
      G.karma < 55 &&
      G.age >= 60,
    text: 'You write the letter but do not send it. Then you send it. You are not certain what you are expecting — absolution, or just for the accounting to be correct before the end. The person may not reply. The act of sending it is not about the reply. The reply, if it comes, is its own thing.',
    choices: [
      {
        text: 'Send the letter',
        tag: null,
        outcome: 'The reply comes three weeks later. It is shorter than you expected and sufficient.',
        effect: (p) => { p.m += 10; p.r -= 12; p.karma += 12; p.addFlag('reconciled'); p.setMem('legacyReconciliation', true) },
      },
      {
        text: 'Write it, but keep it. Some doors are better left.',
        tag: null,
        outcome: 'The writing itself loosens something. The letter stays in the drawer.',
        effect: (p) => { p.m += 4; p.r -= 5; p.karma += 5; p.setMem('legacyReconciliation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'legacy_old_friend_death',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.friends && G.friends.length > 0 &&
      !G.mem.legacyOldFriendDeath &&
      G.age >= 60 && G.age <= 85,
    text: (G) => {
      const friend = G.friends[0]
      return `${friend?.name ?? 'A friend your own age'} dies. You have known each other for forty years, or close to it. The arithmetic changes: the people who knew you when you were young are fewer now. Each one of them carried a version of you that only they held. When they are gone, that version is also gone. You attend the service and speak to people you recognize and do not quite remember, and the whole afternoon has the quality of the last of something.`
    },
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('lost_friend_late'); p.setMem('legacyOldFriendDeath', true) },
  },

  {
    id: 'legacy_faith_return',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem.legacyFaithReturn &&
      G.age >= 65 &&
      (G.flags.includes('left_religion') || G.flags.includes('secular') || !G.religion),
    text: 'You find yourself back in the building. You do not know exactly when the impulse returned or what to call it. Not belief, maybe. Not disbelief either. Something adjacent to comfort, or the recognition that the familiar has a different value at this distance from the beginning. You sit in the same kind of pew you sat in as a child and something is different and something is exactly the same.',
    choices: [
      {
        text: 'Return properly — attend regularly, let it become a structure',
        tag: null,
        outcome: 'The community is real even where the theology is uncertain.',
        effect: (p) => { p.m += 8; p.r -= 6; p.addFlag('faith_returned'); p.setMem('legacyFaithReturn', true) },
      },
      {
        text: 'Visit occasionally, on your own terms',
        tag: null,
        outcome: 'The relationship with it is honest, which is more than it was before.',
        effect: (p) => { p.m += 4; p.r -= 3; p.setMem('legacyFaithReturn', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'legacy_recognition',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem.legacyRecognition &&
      G.karma >= 65 &&
      G.age >= 60,
    text: (G) => {
      if (G.career?.field === 'education') {
        return 'A former student finds you. They explain what they are doing now — something substantial — and they tell you, directly, that you were the reason they stayed in school. You do not have a prepared response for this. You sit with the discomfort of being thanked for something you remember as ordinary.'
      }
      return 'An old colleague sends a message. Something you did years ago — a decision you barely remember, a day\'s work you thought nothing of — had a consequence you never knew about. The information arrives too late to change anything and changes something anyway.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 8; p.karma += 5; p.setMem('legacyRecognition', true) },
  },

  {
    id: 'legacy_last_trip',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.legacyLastTrip &&
      G.money >= 3000 &&
      G.age >= 60,
    text: (G) => {
      const somewhere = G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east'
        ? 'somewhere you have been meaning to go for thirty years'
        : 'somewhere far from here, the kind of distance that changes how you see the place you came from'
      return `You book the tickets for ${somewhere}. You are aware, not morbidly but honestly, that this may be the last long journey. The body requires more planning than it once did — the medications, the insurance, the assessment of how far you can walk in a day. But you go. The place exists, and you are in it, and the fact of that is not minor.`
    },
    choices: [
      {
        text: 'Go slowly — you have the time and the attention',
        tag: null,
        outcome: 'The trip takes longer than it would have and leaves you more tired. You remember most of it in detail.',
        effect: (p) => { p.m += 14; p.r -= 6; p.mo -= 3000; p.addFlag('last_big_trip'); p.setMem('legacyLastTrip', true) },
      },
      {
        text: 'Go with someone — a child, an old friend',
        tag: null,
        outcome: 'Traveling with someone makes the memories shared. This turns out to matter.',
        effect: (p) => { p.m += 18; p.r -= 8; p.mo -= 3500; p.addFlag('last_big_trip'); p.setMem('legacyLastTrip', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'late_regret_unsaid',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.lateRegretUnsaid &&
      G.r > 20 &&
      G.age >= 60 &&
      (G.flags.includes('lost_parent') || G.flags.includes('widowed') || G.flags.includes('lost_sibling')),
    text: 'There was something you meant to say. You knew you meant to say it and you kept not saying it — waiting for the right moment, the right afternoon, the occasion that would make the saying feel natural. The person is gone now. The thing you meant to say exists only in you. It will go with you. You sit with this, and the weight of it, and the fact that the weight is fair.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 10; p.setMem('lateRegretUnsaid', true) },
  },

  // ── LONELINESS AND SOCIAL SHRINKAGE ─────────────────────────────────────────

  {
    id: 'late_solo_meal',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.partner &&
      !G.mem.lateSoloMeal &&
      G.age >= 70,
    text: 'You cook enough for two out of habit, then remember, then cook less, then eat what you cooked anyway. The table has four chairs. You sit in the same chair you always sat in. The other chairs remain in their positions. The radio is on. The food is fine. You eat it standing over the sink, not because it is efficient but because setting the table for one is a statement you are not yet willing to make every evening.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('eating_alone'); p.setMem('lateSoloMeal', true) },
  },

  {
    id: 'late_phone_calls',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.children && G.children.length > 0 &&
      !G.mem.latePhoneCalls &&
      G.age >= 70,
    text: 'The calls happen on Sundays, or they are supposed to. You can hear, in the background of each call, the rest of their life continuing. A child asks something; a door opens; the sound of wherever they are. The calls are real and you are grateful for them and you can also hear exactly how much room you occupy in the schedule. You tell them things are fine. Things are fine.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.setMem('latePhoneCalls', true) },
  },

  // ── LATE-LIFE HEALTH DECISIONS ───────────────────────────────────────────────

  {
    id: 'health_elective_surgery',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthElectiveSurgery &&
      G.age >= 60 && G.age <= 80 &&
      G.stats.health < 70,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(arch)) {
        return 'A surgeon at the regional hospital can fix the hip that has been limiting you for two years. The operation is not without risk — the facilities are stretched and the anaesthetic equipment is older than it should be. The surgeon is confident. You are not sure how much of that confidence to trust.'
      }
      return 'Your orthopaedic surgeon recommends a hip replacement. The procedure is routine, she says — a word that does not account for what happens when a routine procedure on a sixty-eight-year-old body does not go quite as planned. The alternative is a further decline in mobility and increasing dependence on pain medication.'
    },
    choices: [
      {
        text: 'Have the surgery',
        tag: null,
        outcome: 'The recovery is longer than projected. By the fourth month you are walking without the pain, and the relief is so clean it surprises you.',
        effect: (p) => { p.h += 15; p.m += 8; p.mo -= 6000; p.addFlag('had_surgery'); p.setMem('healthElectiveSurgery', true) },
      },
      {
        text: 'Manage it conservatively — the risk is not worth it',
        tag: null,
        outcome: 'The pain continues. You adapt your life around it, quietly, in ways you do not fully account for.',
        effect: (p) => { p.h -= 5; p.r += 6; p.addFlag('declined_surgery'); p.setMem('healthElectiveSurgery', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_serious_diagnosis',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.healthSeriousDiagnosis &&
      G.age >= 65 &&
      G.stats.health < 55,
    text: 'The consultant closes the folder and says she wants to be honest with you. She uses the word "aggressive." She explains what treatment would involve — the duration, the side effects, the statistical outcomes. You ask the question you have been building toward and she answers it directly: without treatment, probably eighteen months. With it, two to three years, but not the same two to three years. You drive home and sit in the car in the driveway for a long time.',
    choices: [
      {
        text: 'Pursue the full treatment — you want every month you can get',
        tag: null,
        outcome: 'The treatment is brutal and effective in the way they said. You lose your hair and six months of ordinary life. You gain time.',
        effect: (p) => { p.h -= 10; p.m -= 12; p.mo -= 15000; p.addFlag('cancer_treatment'); p.r -= 5; p.setMem('healthSeriousDiagnosis', true) },
      },
      {
        text: 'Choose palliative care — the quality of time matters more than the quantity',
        tag: null,
        outcome: 'The consultant respects the decision. She says most people who choose this do not regret it. The months you have are genuinely yours.',
        effect: (p) => { p.m += 6; p.r -= 10; p.karma += 8; p.addFlag('chose_palliative'); p.setMem('healthSeriousDiagnosis', true) },
      },
      {
        text: 'Ask about trials — is there a fourth option',
        tag: null,
        outcome: 'There is a trial. You meet the eligibility criteria. The outcome is uncertain in ways standard treatment is not. You enter it.',
        effect: (p) => { p.h -= 5; p.e += 5; p.m -= 5; p.addFlag('experimental_treatment'); p.setMem('healthSeriousDiagnosis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'health_refusing_treatment',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem.healthRefusingTreatment &&
      G.flags.includes('faith_deepened') &&
      G.age >= 68 &&
      G.stats.health < 50,
    text: 'The doctor outlines the treatment. You listen to the whole of it. Then you tell him that you will not be doing it. He asks if you have understood the prognosis. You tell him that you have. He asks if there is someone he can speak to. You tell him that you are the someone. He does not argue further. You walk out into an afternoon that is very ordinary and very bright.',
    choices: [
      {
        text: 'Hold the decision',
        tag: null,
        outcome: 'The people in your life disagree with you to varying degrees. You hold the decision. It is, you have decided, yours to hold.',
        effect: (p) => { p.m += 5; p.r -= 12; p.karma += 6; p.addFlag('declined_treatment_principle'); p.setMem('healthRefusingTreatment', true) },
      },
      {
        text: 'Reconsider after talking to family',
        tag: null,
        outcome: 'Their distress changes the calculation. You agree to the minimum intervention. You are not certain this is the right decision. You make it anyway.',
        effect: (p) => { p.m -= 5; p.h += 5; p.mo -= 8000; p.setMem('healthRefusingTreatment', true) },
      },
    ],
    effect: null,
  },

  // ── RETIREMENT FINANCIAL ARC ─────────────────────────────────────────────────

  {
    id: 'retire_pension_decision',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      !G.flags.includes('retired') &&
      !G.mem.retirePensionDecision &&
      G.age >= 40 && G.age <= 55 &&
      G.money > 5000,
    text: 'Your employer\'s retirement plan documentation arrives for the annual review. You can increase your contribution to the maximum — it means less now, but considerably more compounding over the remaining twenty years. Or you can keep the current rate and have more available each month.',
    choices: [
      {
        text: 'Maximise the pension contribution',
        tag: null,
        outcome: 'The monthly difference is noticeable but manageable. You make the adjustment and stop thinking about it.',
        effect: (p) => { p.m -= 3; p.mo -= 2000; p.w += 5; p.addFlag('pension_saver'); p.setMem('retirePensionDecision', true) },
      },
      {
        text: 'Keep the current rate — there are things you need the money for now',
        tag: null,
        outcome: 'The money stays liquid. The gap widens quietly over the following decade.',
        effect: (p) => { p.m += 3; p.setMem('retirePensionDecision', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'retire_comfortable',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('retired') &&
      !G.mem.retireComfortable &&
      (G.flags.includes('pension_saver') || G.money > 80000),
    text: 'The financial planner lays out the projection. The pension, the savings, the property — assembled over decades of small decisions — have produced something solid. You do not have to reduce anything significantly. You do not have to count the heating days. The anxiety you carried for thirty years about whether the numbers would work was not, it turns out, unfounded — but the answer came out on the correct side.',
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 8; p.addFlag('retired_comfortable'); p.setMem('retireComfortable', true) },
  },

  {
    id: 'late_digital_left_behind',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.lateDigitalLeftBehind &&
      G.age >= 70 &&
      G.currentYear >= 2005,
    text: (G) => {
      const yearContext = G.currentYear >= 2020
        ? 'Everything requires an app now. The form you need to fill in is only online. The doctor sends you a link. The bank requires two-factor authentication through a phone you do not know how to configure correctly.'
        : 'The internet has reorganized services in ways that assume a user who is comfortable and fast and young. The form has expired by the time you have found where to click.'
      return `${yearContext} You ask a grandchild to help. They do it in four seconds, patiently, without condescension, which is somehow more humbling than impatience would have been. You thank them and sit with the small specific loss of competence.`
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.e -= 3; p.r += 5; p.setMem('lateDigitalLeftBehind', true) },
  },

  {
    id: 'late_neighborhood_gone',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.lateNeighborhoodGone &&
      G.age >= 70,
    text: 'You walk past the houses on your street and run through the names: gone, dead, moved away, sold to someone younger. The family whose children played with your children have been in another city for twelve years. The woman who used to wave from her garden died in the spring. New people have moved in and some of them nod and some of them do not. The street is the same street and almost completely different.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.s -= 3; p.setMem('lateNeighborhoodGone', true) },
  },

  {
    id: 'late_acceptance',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.lateAcceptance &&
      G.age >= 75 &&
      (G.r < 20 || G.karma >= 65),
    text: 'It is an ordinary afternoon. You are sitting somewhere you often sit. The light is doing something specific. You are not actively happy, or unhappy, or arranging anything in your mind. You are simply present in a life that happened. The particular shape of it — the places, the people, the things you did and did not do — is the shape it is. You do not feel that the accounting is finished or perfect. You feel that the accounting is what it is, and you are still here, and the afternoon is still happening.',
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 10; p.karma += 6; p.addFlag('acceptance'); p.setMem('lateAcceptance', true) },
  },

]

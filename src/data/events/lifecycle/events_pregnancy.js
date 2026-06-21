// events_pregnancy.js
// Pregnancy, birth, and early postpartum arc.
//
// Arc timing (relative to conception year C):
//   Year C+1 (pregnant flag still set): first-trimester + pregnancy texture events
//   Year C+2 (birth delivered by tick): birth-year events (child just arrived)
//   Year C+3: postpartum events

// ── helpers ──────────────────────────────────────────────────────────────────

// Birth year guard: last child was added this year
const justBornThisYear = (G) =>
  G.children.length > 0 && G.children[G.children.length - 1].ageAtBirth === G.age

// Postpartum guard: last child was born last year
const bornLastYear = (G) =>
  G.children.length > 0 && G.children[G.children.length - 1].ageAtBirth === G.age - 1

// Pregnancy year guard (not birth year — pregnant flag still present)
const inPregnancyYear = (G) =>
  G.flags.has('pregnant') && G.age === (G.mem?.pregnancyYear ?? -99) + 1

// Archetype-branched birth setting text
function birthSettingText(G) {
  const a = G.character?.country?.archetype
  const yr = G.currentYear ?? 2000
  const hc = G.character?.country?.healthcare
  if (a === 'subsaharan' || a === 'developing_unstable' || a === 'conflict_zone' || hc === 'very_poor') {
    if (yr < 1990) return 'The traditional birth attendant has done this many times. You are in the room where your mother was born. The lamp is kerosene. The pain is the same as it has always been.'
    return 'You give birth at the district clinic. The midwife has been on shift since yesterday. There are no complications. The basics are there.'
  }
  if (a === 'post_soviet') {
    if (yr < 1995) return 'The maternity ward is cold and the staff are efficient in the way Soviet institutions are efficient — brisk, certain, not unkind. Your partner waits in the corridor. They do not allow partners in.'
    return 'The birth ward is overworked and the staff rotation is strained. The nurse who attends you the most is exhausted. She is also good at her job.'
  }
  if (a === 'developing_urban') {
    return 'The public hospital is busy. You share the ward with four other women. The midwife moves quickly from bed to bed. It works.'
  }
  if (a === 'wealthy_east' || a === 'wealthy_gulf') {
    if (yr >= 2000) return 'The private clinic is quiet and efficiently run. Your partner is in the room. The monitor beeps steadily. Everything proceeds as planned.'
    return 'The hospital is formal. Staff are professional. Your partner waits outside.'
  }
  // wealthy_west default
  if (yr < 1980) return 'The hospital maternity ward is functional and cool. Your partner waits in the corridor; they did not allow partners into delivery rooms then. The nurse who stays with you through the last hours is the one you will remember.'
  if (yr < 2000) return 'Your partner is in the room for the first time fathers were routinely allowed in. The midwife guides you through it. You are grateful she has done this a thousand times.'
  return 'Your partner is there. The midwife is calm and specific. The room fills with the sound you will not forget.'
}

// ── PREGNANCY YEAR EVENTS ─────────────────────────────────────────────────────

export const PREGNANCY_EVENTS = [

  {
    id: 'preg_first_trimester',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      inPregnancyYear(G) &&
      G.character.gender === 'female' &&
      !G.mem?.pregFirstTrimDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const base = 'The nausea arrives without warning — morning is a misnomer; it is any hour, any smell, any movement. You are exhausted in a way that has no comparison. You are still keeping the news to yourselves. You go to work, attend things, say you are fine.'
      if (a === 'subsaharan' || a === 'developing_unstable') {
        return 'Your body changes before you have told anyone. The exhaustion is deep and particular. The morning sickness runs into afternoon. You continue your usual work because there is no alternative.'
      }
      if (a === 'post_soviet') {
        return 'You do not tell anyone yet — twelve weeks is the custom. The nausea is relentless. You carry dry crackers. You perform normality at work and fall asleep by eight.'
      }
      return base
    },
    choices: [
      {
        text: 'Tell close family early — you want their support',
        tag: null,
        outcome: 'You tell your parents. The support is immediate and real. The news belongs to more people now.',
        effect: (p) => { p.m += 8; p.karma += 3; p.setMem('pregFirstTrimDone', true); p.addFlag('pregnancy_shared_early') },
      },
      {
        text: 'Wait — the twelve-week threshold has its logic',
        tag: null,
        outcome: 'You carry it quietly. The first weeks are yours alone, which is both a burden and a kind of privacy.',
        effect: (p) => { p.m += 3; p.setMem('pregFirstTrimDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'preg_first_trimester_partner',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      inPregnancyYear(G) &&
      G.character.gender === 'male' &&
      G.partner &&
      !G.mem?.pregPartnerTrimDone,
    text: 'Your partner is pregnant. The first weeks are disorienting in a specific way — the change is enormous but invisible; only the two of you know about it. She is exhausted and nauseated and trying to pretend otherwise. You find you are monitoring things without quite knowing what you are monitoring.',
    effect: (p) => { p.m += 6; p.partnerRel(5); p.setMem('pregPartnerTrimDone', true) },
    choices: null,
  },

  {
    id: 'preg_late_pregnancy',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      inPregnancyYear(G) &&
      G.character.gender === 'female' &&
      G.mem?.pregFirstTrimDone === true &&
      !G.mem?.pregLatePregnancyDone,
    text: (G) => {
      const name = G.mem?.pendingChild?.name ?? 'the baby'
      const yr = G.currentYear ?? 2000
      const a = G.character?.country?.archetype
      if (a === 'subsaharan' || a === 'developing_unstable') {
        return `You are visibly pregnant now. Everyone can see it. In the village the older women touch your stomach and offer opinions. The advice is specific and contradictory. You listen to all of it. You do what you were already going to do.`
      }
      if (yr >= 2000) {
        return `You are large and deliberate and uncomfortable. The due date is weeks away. You have a name — ${name}. The bag is by the door. You do not know what labour will be like. No one can adequately describe it to you in advance, so you have stopped trying to imagine it.`
      }
      return `You are into the final months. The body has its own priorities now. You are more tired and more certain than you have ever been simultaneously.`
    },
    effect: (p) => { p.h -= 3; p.setMem('pregLatePregnancyDone', true) },
    choices: null,
  },

  // ── BIRTH YEAR EVENTS ─────────────────────────────────────────────────────────

  {
    id: 'preg_birth_normal',
    phase: null,
    weight: 10,
    when: (G) =>
      justBornThisYear(G) &&
      G.character.gender === 'female' &&
      !G.flags.has('birth_complication_survived') &&
      !G.mem?.pregBirthDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      const setting = birthSettingText(G)
      return `${setting} ${childName} arrives. The transition from not-yet to here is very fast and very slow at the same time. You hold them and the world rearranges around that fact.`
    },
    choices: [
      {
        text: 'Everything you expected and nothing you expected',
        tag: null,
        outcome: 'You cannot explain it to anyone who has not been here. That is fine.',
        effect: (p) => { p.m += 12; p.h -= 5; p.setMem('pregBirthDone', true) },
      },
      {
        text: 'You are terrified and completely certain at the same time',
        tag: null,
        outcome: 'The fear and the love are not separate things. You understand this now.',
        effect: (p) => { p.m += 10; p.r += 3; p.setMem('pregBirthDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'preg_birth_complication_event',
    phase: null,
    weight: 10,
    when: (G) =>
      justBornThisYear(G) &&
      G.character.gender === 'female' &&
      G.flags.has('birth_complication_survived') &&
      !G.mem?.pregBirthDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      const yr = G.currentYear ?? 2000
      if (yr < 1960) {
        return `${childName} is born and you survive, but it is close enough that the word 'survive' is the right one. The doctor does not explain what happened in terms you fully understand. Later, a nurse tells you quietly that there was a moment when it was not certain. ${childName} does not know any of this yet.`
      }
      return `${childName} is born and you survive the complications. The room moved fast in a way that told you this was serious. Your partner was asked to step back. The nurse who held your hand through the worst of it did not let go. ${childName} is fine. You are fine, technically. You will process what almost happened later.`
    },
    effect: (p) => { p.m += 8; p.r += 8; p.addFlag('near_miss_birth'); p.setMem('pregBirthDone', true) },
    choices: null,
  },

  {
    id: 'preg_partner_birth_room',
    phase: null,
    weight: 8,
    when: (G) =>
      justBornThisYear(G) &&
      G.character.gender === 'male' &&
      G.partner &&
      !G.mem?.pregPartnerBirthDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      const yr = G.currentYear ?? 2000
      const a = G.character?.country?.archetype
      if (yr < 1975 || a === 'post_soviet' || a === 'subsaharan') {
        return `You wait in a corridor or outside the ward. There is no clock where you are standing and you count other things instead. Then someone comes out and tells you ${childName} is here.`
      }
      return `You are in the room. That was not always the assumption and you understand why it is now — there is something to witness here that is not abstract. ${childName} arrives. Your partner does something extraordinary. You do not have a word for what you feel that is accurate to what it actually is.`
    },
    effect: (p) => { p.m += 15; p.partnerRel(10); p.setMem('pregPartnerBirthDone', true) },
    choices: null,
  },

  {
    id: 'preg_birth_first_hours',
    phase: null,
    weight: 7,
    when: (G) =>
      justBornThisYear(G) &&
      !G.mem?.pregFirstHoursDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      const isFirst = G.children.length === 1
      if (isFirst) {
        return `The first hours with ${childName}. You have never done this before and neither have they. You are both figuring out the same language at the same time. They seem very small and also very complete.`
      }
      return `The first hours with ${childName}. You have done this before but the repetition does not make it smaller — it just makes it differently specific. This one is this one.`
    },
    effect: (p) => { p.m += 10; p.setMem('pregFirstHoursDone', true) },
    choices: null,
  },

  // ── POSTPARTUM EVENTS ─────────────────────────────────────────────────────────

  {
    id: 'preg_postpartum_body',
    phase: null,
    weight: 7,
    when: (G) =>
      bornLastYear(G) &&
      G.character.gender === 'female' &&
      !G.mem?.pregPostpartumBodyDone,
    text: (G) => {
      const yr = G.currentYear ?? 2000
      const a = G.character?.country?.archetype
      if (a === 'subsaharan' || a === 'developing_unstable') {
        return 'Your body is different now. You knew it would be but knowing and experiencing are separate things. There is little time to rest — the household continues, the children (there may be others) continue. You find your own pace.'
      }
      if (yr < 1970) {
        return 'The advice is contradictory and sometimes wrong. The body is different now. You navigate this mostly alone because there is no shared language for postpartum recovery in the way there will one day be.'
      }
      return 'The body heals on its own schedule. You have been told what to expect and the telling was not wrong, but the specificity of your own experience is still yours to discover. Some things resolve. Some things are different now.'
    },
    effect: (p) => { p.h -= 4; p.setMem('pregPostpartumBodyDone', true) },
    choices: null,
  },

  {
    id: 'preg_postpartum_depression',
    phase: null,
    weight: 5,
    when: (G) =>
      bornLastYear(G) &&
      G.character.gender === 'female' &&
      G.stats.happiness < 55 &&
      !G.mem?.pregPostpartumDepDone,
    text: (G) => {
      const yr = G.currentYear ?? 2000
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      if (yr < 1980) {
        return `Something is wrong and you do not have a name for it. You love ${childName} — you do not doubt that for a moment — but there is a heaviness you were not warned about. You do not tell your partner how bad it is. You do not know how to explain it when there is no word yet for what this is.`
      }
      return `The weeks after birth were supposed to be difficult and you knew that. This is different from the difficulty you prepared for. It is a grey through which ${childName} is present and you are not quite. You recognise it, eventually. You say something to someone.`
    },
    choices: [
      {
        text: 'Talk to a doctor or midwife',
        tag: null,
        outcome: 'There are words for this now and treatment for it. Starting the conversation is the first thing.',
        effect: (p) => { p.m += 10; p.h += 3; p.addFlag('sought_postpartum_help'); p.setMem('pregPostpartumDepDone', true) },
      },
      {
        text: 'Carry it alone — it will pass',
        tag: null,
        outcome: 'It does, eventually, pass. The carrying costs more than it needed to.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.r += 5; p.setMem('pregPostpartumDepDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'preg_partner_first_weeks',
    phase: null,
    weight: 7,
    when: (G) =>
      bornLastYear(G) &&
      G.character.gender === 'male' &&
      G.partner &&
      !G.mem?.pregPartnerFirstWeeksDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      return `The first weeks with ${childName}. The sleep deprivation is a specific kind of unreality. Your partner is recovering physically, feeding, always doing something. You are learning what you can do that actually helps — which is different from what you thought would help. You are more useful than you feared and less than you hoped. This is probably normal.`
    },
    effect: (p) => { p.m += 8; p.h -= 4; p.partnerRel(6); p.setMem('pregPartnerFirstWeeksDone', true) },
    choices: null,
  },

  {
    id: 'preg_paternity_leave',
    phase: null,
    weight: 5,
    when: (G) =>
      bornLastYear(G) &&
      G.character.gender === 'male' &&
      G.partner &&
      (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east') &&
      (G.currentYear ?? 0) >= 2000 &&
      G.career &&
      !G.mem?.pregPaternityDone,
    text: (G) => {
      const child = G.children[G.children.length - 1]
      const childName = child?.name ?? 'the baby'
      const country = G.character?.country?.name ?? ''
      const generous = ['Sweden', 'Norway', 'Finland', 'Denmark', 'Iceland'].includes(country)
      if (generous) {
        return `You have several months of paternity leave. This was not the case for your father. You spend it with ${childName} and your partner, learning the routines that your partner would otherwise have learned alone. The division of labour in the first year shapes the one that follows.`
      }
      return `You take the paternity leave available to you — two weeks, or perhaps four. It is not long enough to learn what needs learning, but it changes the first weeks. You are there for the things you would otherwise only have heard about.`
    },
    choices: [
      {
        text: 'Take the full leave available',
        tag: null,
        outcome: 'The time you take is time you do not get back. You are glad of it.',
        effect: (p) => { p.m += 12; p.partnerRel(8); p.addFlag('took_paternity_leave'); p.setMem('pregPaternityDone', true) },
      },
      {
        text: 'Take the minimum — work needs you back',
        tag: null,
        outcome: 'You return before you are ready to. The regret is quiet but real.',
        effect: (p) => { p.m += 3; p.r += 5; p.setMem('pregPaternityDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'preg_new_parent_identity',
    phase: null,
    weight: 6,
    when: (G) =>
      bornLastYear(G) &&
      G.children.length === 1 &&
      !G.mem?.pregIdentityShiftDone,
    text: (G) => {
      const child = G.children[0]
      const childName = child?.name ?? 'your child'
      return `You have been a parent for almost a year. The person you were before ${childName} arrived is continuous with who you are now, but something reorganised. Your priorities, your fears, the things that wake you at 3am — all shifted. Not erased. Shifted. This is permanent and that is fine.`
    },
    effect: (p) => { p.m += 8; p.karma += 5; p.setMem('pregIdentityShiftDone', true) },
    choices: null,
  },

  {
    id: 'preg_second_child_decision',
    phase: null,
    weight: 4,
    when: (G) =>
      bornLastYear(G) &&
      G.children.length === 1 &&
      G.partner &&
      G.age >= 24 && G.age <= 38 &&
      !G.mem?.pregSecondChildDecDone,
    text: 'The question of whether to have another child arrives before you expected it — not as a plan but as a conversation, or a silence that is the shape of a conversation. You have one. That is complete and not complete simultaneously.',
    choices: [
      {
        text: 'One feels right, at least for now',
        tag: null,
        outcome: 'Not deciding is itself a decision. That is fine.',
        effect: (p) => { p.m += 4; p.setMem('pregSecondChildDecDone', true) },
      },
      {
        text: 'You want another — the only question is when',
        tag: null,
        outcome: 'The wanting is clear. The timing is the conversation.',
        effect: (p) => { p.m += 6; p.addFlag('wants_second_child'); p.setMem('pregSecondChildDecDone', true) },
      },
    ],
    effect: null,
  },

]

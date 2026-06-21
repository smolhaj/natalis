// events_condition_arc.js
// Lifecycle events for chronic conditions: the 3-year mark when chronic stops
// feeling temporary, unmanaged consequences, compound body, long-term management
// reflection, HIV undetectable life, depression recalibration, back pain identity.
// Complements events_illness.js (diagnosis) — these are the living-with-it events.

const CHRONIC_IDS = ['diabetes', 'heart_disease', 'copd', 'back_pain', 'hiv', 'blindness', 'deafness', 'chronic_depression', 'disability_injury']
const yrsWithCond = (c, G) => G.currentYear - (c.diagnosedYear ?? G.currentYear)

export const CONDITION_ARC_EVENTS = [

  // ── WHEN CHRONIC STOPS FEELING TEMPORARY ─────────────────────────────────────

  {
    id: 'cond_no_longer_temporary',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id) && yrsWithCond(c, G) >= 3)
      return !!c && !G.mem.condNoLongerTemp
    },
    text: 'The diagnosis is three years old now. You stopped expecting it to resolve at some point — you cannot mark the exact moment. The condition is no longer a thing that happened to you; it is a parameter of how you live. That transition took longer than you expected, and it was not a single decision.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('condNoLongerTemp', true) },
  },

  // ── UNMANAGED CONDITION WORSENING ────────────────────────────────────────────

  {
    id: 'cond_unmanaged_consequence',
    phase: null,
    weight: 4,
    when: (G) => {
      const c = G.conditions.find(c =>
        ['diabetes', 'heart_disease', 'copd', 'chronic_depression'].includes(c.id) &&
        !c.managed &&
        yrsWithCond(c, G) >= 3 &&
        c.severity !== 'severe'
      )
      return !!c && !G.mem.condUnmanagedConseq
    },
    text: (G) => {
      const c = G.conditions.find(c =>
        ['diabetes', 'heart_disease', 'copd', 'chronic_depression'].includes(c.id) &&
        !c.managed && yrsWithCond(c, G) >= 3 && c.severity !== 'severe'
      )
      const name = { diabetes: 'diabetes', heart_disease: 'the heart disease', copd: 'the COPD', chronic_depression: 'the depression' }[c?.id] ?? 'the condition'
      return `Three years without managing ${name} properly and the doctor is not softening the assessment this year. The numbers have moved. The direction they have moved is the one you were warned about. The choices available to you now are different — narrower — than they were when this started.`
    },
    choices: [
      {
        text: 'Start managing it properly — now.',
        tag: null,
        outcome: 'It took longer than it should have. The management begins. Some of what was lost cannot be recovered. What can be is.',
        effect: (p) => {
          const c = p._state.conditions?.find(c =>
            ['diabetes', 'heart_disease', 'copd', 'chronic_depression'].includes(c.id) && !c.managed
          )
          if (c) { p.manageCondition(c.id, true); p.addFlag('manages_chronic_condition') }
          p.h -= 4; p.mo -= 800; p.setMem('condUnmanagedConseq', true)
        },
      },
      {
        text: 'Make some changes — not ready for full treatment.',
        tag: null,
        outcome: 'The condition worsens to the degree it was going to, on the schedule it was always on.',
        effect: (p) => {
          const c = p._state.conditions?.find(c =>
            ['diabetes', 'heart_disease', 'copd', 'chronic_depression'].includes(c.id) && !c.managed
          )
          if (c) p.worsenCondition(c.id)
          p.h -= 8; p.m -= 5; p.setMem('condUnmanagedConseq', true)
        },
      },
    ],
  },

  // ── DECIDING TO START MANAGING ────────────────────────────────────────────────

  {
    id: 'cond_start_managing',
    phase: null,
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => CHRONIC_IDS.includes(c.id) && !c.managed && yrsWithCond(c, G) >= 1)
      return !!c && G.age >= 20 && !G.mem.condStartManaging
    },
    text: 'Something has shifted — a scare, a conversation, a birthday, something in how you feel when you get up in the morning. The condition has been there and unmanaged for long enough. You are thinking about changing that.',
    choices: [
      {
        text: 'Commit to treatment.',
        tag: null,
        outcome: 'You start. The adjustment is real. So is the difference, once the adjustment settles.',
        effect: (p) => {
          const c = p._state.conditions?.find(c => CHRONIC_IDS.includes(c.id) && !c.managed)
          if (c) { p.manageCondition(c.id, true); p.addFlag('manages_chronic_condition') }
          p.mo -= 600; p.m += 4; p.setMem('condStartManaging', true)
        },
      },
      {
        text: 'Not yet. Adjust some habits instead.',
        tag: null,
        outcome: 'The habits improve some things. The underlying condition continues on its track.',
        effect: (p) => { p.m -= 2; p.setMem('condStartManaging', true) },
      },
    ],
  },

  // ── COMPOUND CONDITIONS: TWO AT ONCE ─────────────────────────────────────────

  {
    id: 'cond_compound_body',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.conditions.length >= 2 && G.age >= 45 && !G.mem.condCompound,
    text: (G) => {
      const names = G.conditions.slice(0, 2).map(c => ({
        diabetes: 'diabetes', heart_disease: 'heart disease', copd: 'COPD',
        back_pain: 'the back', hiv: 'HIV', chronic_depression: 'depression',
        blindness: 'the vision', deafness: 'the hearing', disability_injury: 'the injury',
      }[c.id] ?? c.id))
      return `The body keeps its own calendar, and this year it has added a second appointment to the one you already had. ${names[0] && names[1] ? `${names[0].charAt(0).toUpperCase() + names[0].slice(1)} and ${names[1]}` : 'Two conditions'} — different in kind, convergent in what they ask of you: attention, consistency, the management of something that is now simply part of the structure of your days.`
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 3; p.setMem('condCompound', true) },
  },

  // ── A DECADE MANAGED ─────────────────────────────────────────────────────────

  {
    id: 'cond_decade_managed',
    phase: 'late_life',
    weight: 2,
    when: (G) => {
      const c = G.conditions.find(c => c.managed && yrsWithCond(c, G) >= 10)
      return !!c && G.age >= 55 && !G.mem.condDecadeManaged
    },
    text: 'Ten years managing the condition — the specific one, the one with its schedule and its monitoring and its periodic adjustments. You have accumulated a kind of expertise that doctors occasionally ask you to contribute to other patients. You know its rhythms. You know what your body will tell you when something is changing. You did not choose this knowledge. It is yours.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('condDecadeManaged', true) },
  },

  // ── HIV: LIVING AS UNDETECTABLE ──────────────────────────────────────────────

  {
    id: 'cond_hiv_undetectable_life',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'hiv' && c.managed)
      return !!c && G.currentYear >= 2000 && yrsWithCond(c, G) >= 2 && !G.mem.condHivUndetectable
    },
    text: 'Undetectable equals untransmittable. You have known this for years — known it medically, known what it means for how you live. What has taken longer to settle is how to hold it: as relief, as ongoing responsibility, as something to tell people or not, as a fact about your life that is simultaneously ordinary and not. The pill is daily. The life is yours.',
    choices: [
      {
        text: 'Let it be ordinary. This is managed. You are fine.',
        tag: null,
        outcome: 'It becomes ordinary. The management continues. You are, by the measures that matter, fine.',
        effect: (p) => { p.m += 6; p.setMem('condHivUndetectable', true) },
      },
      {
        text: 'Become visible about it — the silence costs something too.',
        tag: 'hiv_disclosed',
        outcome: 'You tell someone — a partner, a friend, more people over time. The silence was its own weight. So is this. But differently.',
        effect: (p) => { p.m += 4; p.s += 3; p.karma += 5; p.addFlag('hiv_disclosed'); p.setMem('condHivUndetectable', true) },
      },
    ],
  },

  // ── DEPRESSION: THE ANNUAL RECALIBRATION ──────────────────────────────────────

  {
    id: 'cond_depression_annual',
    phase: null,
    weight: 3,
    cooldown: 4,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'chronic_depression' && c.managed)
      return !!c && G.age >= 20 && !G.mem.condDepressionAnnual
    },
    text: 'The psychiatrist reviews the medication at the annual appointment. The question is whether it is still doing what it should — whether the floor has stayed where it was, whether the plateau is the right height. You have gotten better at answering these questions precisely, which is a skill you did not expect to need. The adjustment this year is small: a different dose, a different timing.',
    choices: [
      {
        text: 'Trust the adjustment. Keep going.',
        tag: null,
        outcome: 'The adjustment takes six weeks to settle. When it does, the year is manageable.',
        effect: (p) => { p.m += 4; p.mo -= 200; p.setMem('condDepressionAnnual', true) },
      },
      {
        text: 'Ask about stopping — you have been stable for a year.',
        tag: null,
        outcome: 'The psychiatrist talks through the tapering plan and the risk of recurrence. You listen carefully. The decision is yours to make.',
        effect: (p) => { p.m += 2; p.e += 2; p.setMem('condDepressionAnnual', true) },
      },
    ],
  },

  // ── BACK PAIN: WHEN IT BECOMES IDENTITY ──────────────────────────────────────

  {
    id: 'cond_back_chronic',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      const c = G.conditions.find(c => c.id === 'back_pain')
      return !!c && yrsWithCond(c, G) >= 5 && G.age >= 38 && !G.mem.condBackChronic
    },
    text: 'Five years of the back being what it is. You have stopped dividing life into before-the-injury and after — the after is just the life now. You know which movements are fine and which are not, which mornings are worse, what helps and what doesn\'t. The knowledge is precise in a way that other people\'s knowledge about your body never is. You are the expert on this particular terrain.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('condBackChronic', true) },
  },

]

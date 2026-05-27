// Formative wound events (ages 6–11, fire exactly once) and decade reflection events.
// Each wound reveals a persistent desire that is shown near the Age Up button.
// The desire is not chosen — it is earned through what happens to the child.

export const DESIRES_EVENTS = [

  // ── WOUND EVENTS ─────────────────────────────────────────────────────────────
  // One fires per life. Guards: age 6–11 + !G.mem.woundFired + specific condition.
  // Fallback fires at 9–11 for characters who don't match any specific condition.

  {
    id: 'desire_wound_dismissed',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.woundFired &&
      G.parents && (
        (G.parents.father?.alive && (G.parents.father.relationshipQuality ?? 70) < 55) ||
        (G.parents.mother?.alive && (G.parents.mother.relationshipQuality ?? 70) < 55)
      ),
    text: (G) => {
      const distant = G.parents.father?.alive && (G.parents.father.relationshipQuality ?? 70) < 55 ? 'father' : 'mother'
      return `Your ${distant} says something small and it lands the wrong way — not cruelty, just carelessness. You carry it out of the room and down the street and further than that.`
    },
    choices: null,
    effect: (p) => { p.setDesire('prove_worth'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_uprooted',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.woundFired &&
      (G.flags.has('emigrated') || G.flags.has('rural_to_urban') ||
       G.flags.has('war_childhood') || G.flags.has('civil_war_lived')),
    text: 'You move again, or the world moves around you. Your friends stay where they were. There is a word for the place you came from, but you are less certain lately what it means.',
    choices: null,
    effect: (p) => { p.setDesire('belong'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_invisible',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.woundFired && (G.siblings?.length ?? 0) > 0,
    text: (G) => {
      const sib = G.siblings?.[0]
      return `${sib?.name?.split(' ')[0] ?? 'Your sibling'} gets the photograph taken. You are standing a little to the left. You remember this later, specifically.`
    },
    choices: null,
    effect: (p) => { p.setDesire('be_seen'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_precarity',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.woundFired &&
      (G.flags.has('food_insecurity') || G.character?.wealthTier <= 1),
    text: 'There is a week when dinner is smaller each day. No one explains this. You learn to read the refrigerator like weather.',
    choices: null,
    effect: (p) => { p.setDesire('safety'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_absent_parent',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.woundFired &&
      G.parents && (!G.parents.father?.alive || G.parents.father?.relationshipQuality === 0),
    text: 'You wait at the window on the day they said they would come. They don\'t. You understand something that night that takes years to put into words.',
    choices: null,
    effect: (p) => { p.setDesire('connection'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_witness',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.woundFired &&
      (G.regime === 'military_dictatorship' || G.regime === 'single_party_authoritarian' ||
       G.regime === 'single_party_communist' || G.flags.has('war_childhood')),
    text: 'You see something you cannot unsee. No one talks about it afterward. You understand that not talking about it is also a choice — and that you will have to make it yourself someday.',
    choices: null,
    effect: (p) => { p.setDesire('leave_mark'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_shame',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.woundFired &&
      (G.flags.has('experienced_racism') || G.flags.has('caste_discrimination') ||
       (G.character?.wealthTier ?? 3) <= 2),
    text: 'Someone makes clear, without saying it, that you are a category before you are a person. You file this away. You are not sure yet what to do with it.',
    choices: null,
    effect: (p) => { p.setDesire('freedom'); p.setMem('woundFired', true) },
  },

  {
    id: 'desire_wound_default',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 9 && G.age <= 11 && !G.mem?.woundFired,
    text: 'You have a wish you don\'t tell anyone. Most children do. It is specific and has a shape and you turn it over in your hands at night.',
    choices: null,
    effect: (p) => { p.setDesire('leave_mark'); p.setMem('woundFired', true) },
  },

  // ── DECADE REFLECTIONS ────────────────────────────────────────────────────────
  // Fire once each decade (30s, 40s, 50s, 60s). No choices. Flag-aware prose.

  {
    id: 'decade_reflection_30',
    phase: 'midlife',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 30 && G.age <= 33 && !G.mem?.decade30Ack,
    text: (G) => {
      const F = G.flags
      const parts = []
      if (G.partner?.married) parts.push(`You married ${G.partner.name.split(' ')[0]}.`)
      else if (G.partner) parts.push('You are with someone.')
      else parts.push('You are still alone, which is a different thing from lonely.')
      if ((G.children ?? []).length > 0) {
        parts.push(`There ${G.children.length === 1 ? 'is a child' : `are ${G.children.length} children`} now.`)
      }
      if (F.has('emigrated')) parts.push('You have not gone back.')
      if (G.career) parts.push('The work has a shape, or the beginning of one.')
      return `You are thirty. ${parts.join(' ')} The person you imagined at twenty made different choices. You are still finding out if yours were better.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade30Ack', true) },
  },

  {
    id: 'decade_reflection_40',
    phase: 'midlife',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 40 && G.age <= 43 && !G.mem?.decade40Ack,
    text: (G) => {
      const F = G.flags
      const parts = []
      if (G.partner?.married) parts.push(`${G.partner.name.split(' ')[0]} has been beside you for years.`)
      const teenKids = (G.children ?? []).filter(c => (G.age - (c.ageAtBirth ?? 0)) >= 13)
      if (teenKids.length > 0) parts.push('Your children are becoming people you did not entirely predict.')
      if (F.has('lost_parent')) parts.push('You have lost a parent.')
      if (F.has('career_defining_work')) parts.push('You have done work that mattered.')
      else if (G.career) parts.push('The work continues.')
      return `You are forty. ${parts.join(' ')} Half of what you intended, more or less. You have stopped apologising for the gap.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade40Ack', true) },
  },

  {
    id: 'decade_reflection_50',
    phase: 'late_life',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 50 && G.age <= 53 && !G.mem?.decade50Ack,
    text: (G) => {
      const F = G.flags
      const parts = []
      if (G.partner?.married) {
        const q = G.partner.relationshipQuality ?? 60
        if (q > 70) parts.push(`You and ${G.partner.name.split(' ')[0]} are still finding things to say to each other.`)
        else parts.push(`You and ${G.partner.name.split(' ')[0]} have settled into something.`)
      } else if (F.has('widowed')) {
        parts.push('You are managing alone, which you did not expect to be.')
      }
      if (F.has('lost_parent')) parts.push('Both your parents are gone, or most of them are.')
      const adultKids = (G.children ?? []).filter(c => (G.age - (c.ageAtBirth ?? 0)) >= 18)
      if (adultKids.length > 0) parts.push('Your children are adults, which is strange every day.')
      if (F.has('went_to_therapy')) parts.push('You have done some of that work.')
      return `You are fifty. ${parts.join(' ')} There is more past than there used to be. You are learning to carry it differently.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade50Ack', true) },
  },

  {
    id: 'decade_reflection_60',
    phase: 'late_life',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 60 && G.age <= 63 && !G.mem?.decade60Ack,
    text: (G) => {
      const F = G.flags
      const parts = []
      if (G.partner?.married) {
        parts.push(`${G.partner.name.split(' ')[0]} is still here.`)
      } else if (F.has('widowed')) {
        parts.push('You are alone now, in the way you did not choose.')
      }
      if ((G.children ?? []).length > 0) parts.push('The children have their own lives, which was the whole point.')
      if (F.has('career_defining_work')) parts.push('There is work you did that outlasts the doing of it.')
      if (F.has('first_gen_university')) parts.push('You went somewhere your parents could not have imagined.')
      if (F.has('emigrated')) parts.push('You made a life somewhere else. It is yours now.')
      return `You are sixty. ${parts.join(' ')} The things you were afraid of did not mostly happen. The things that happened were different from what you feared.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade60Ack', true) },
  },

]

// Formative wound events (ages 6–11, fire exactly once) and decade reflection events.
// Each wound reveals a persistent desire that is shown near the Age Up button.
// The desire is not chosen — it is earned through what happens to the child.
// Decade reflections (20, 30, 40, 50, 60, 70) are the arc mechanism: the player
// feels where they are in the life through these events, shaped by their desire.

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
  // Fire once each decade. No choices. Desire-shaped prose. These are the arc events:
  // the player feels the shape of the life they are building through these moments.

  {
    id: 'decade_reflection_20',
    phase: 'young_adult',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 18 && G.age <= 22 && !G.mem?.decade20Ack,
    text: (G) => {
      const F = G.flags
      const parts = []

      if (G.education?.enrolled) parts.push('You are studying.')
      else if (G.career) parts.push(`You have found work — ${G.career.title}, for now.`)
      else if (F.has('emigrated')) parts.push(`You have left ${G.character.country.name}.`)
      else parts.push('You are finding your way into the world.')

      if (F.has('rural_to_urban')) parts.push('The city is still mostly unfamiliar.')
      if (G.partner) parts.push(`There is ${(G.partner.name ?? 'someone').split(' ')[0]}.`)

      const desireLines = {
        prove_worth: 'There is something you are still trying to earn from someone who probably isn\'t watching anymore. You haven\'t worked out yet that this is the situation.',
        belong: 'What you want most is a room where you stop feeling like a guest. You haven\'t found it yet.',
        be_seen: 'You want to be noticed for something real. You haven\'t decided yet what that is, which is part of the problem.',
        safety: 'The ground under you doesn\'t feel entirely solid. You are building as fast as you can.',
        connection: 'You are surrounded by people. It doesn\'t quite feel like that from the inside.',
        leave_mark: 'There is a pressure in you — diffuse, unspecified — that something is supposed to happen. You just don\'t know what yet.',
        freedom: 'You are starting to understand what you don\'t want. That is a beginning, at least.',
        redemption: 'You carry something quietly from before. You haven\'t decided what to do with it yet.',
      }

      const desireLine = desireLines[G.desire] ?? 'The future is still mostly theoretical.'
      parts.push(desireLine)

      return `You are ${G.age}. ${parts.join(' ')} This is the beginning of something, though you cannot yet see its shape.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade20Ack', true) },
  },

  {
    id: 'decade_reflection_30',
    phase: 'midlife',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 30 && G.age <= 33 && !G.mem?.decade30Ack,
    text: (G) => {
      const F = G.flags
      const parts = []

      if (G.partner?.married) parts.push(`You married ${(G.partner.name ?? 'your partner').split(' ')[0]}.`)
      else if (G.partner) parts.push('You are with someone.')
      else parts.push('You are alone, which is a different thing from lonely.')

      if ((G.children ?? []).length > 0) {
        parts.push(`There ${G.children.length === 1 ? 'is a child' : `are ${G.children.length} children`} now.`)
      }
      if (F.has('emigrated')) parts.push('You have not gone back.')
      if (G.career) parts.push('The work has a shape, or the beginning of one.')

      const desireLines = {
        prove_worth: 'The thing you have been trying to prove is more complicated than it was at twenty. You are no longer entirely sure who you are proving it to.',
        belong: 'You have found some version of belonging — imperfect, provisional. Whether it is the one you wanted is a question you are still living with.',
        be_seen: 'Some people see you now. It helps more than you expected, and somewhat less than you hoped.',
        safety: 'You have built some stability. You check on it more than people who didn\'t grow up without it.',
        connection: 'The connections you have are real. You are still learning how much of yourself to let in.',
        leave_mark: 'You have started something. Whether it will matter is still unclear from this close.',
        freedom: 'You have more freedom than you did. You are still deciding what to do with it, which is harder than the wanting was.',
        redemption: 'You are still working on something from before. You may be for a while. That is all right.',
      }

      const desireLine = desireLines[G.desire] ?? 'The person you imagined at twenty made different choices.'
      parts.push(desireLine)

      return `You are thirty. ${parts.join(' ')} You are still finding out if your choices were better than the alternatives.`
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

      if (G.partner?.married) {
        const q = G.partner.relationshipQuality ?? 60
        parts.push(q > 70
          ? `${(G.partner.name ?? 'Your partner').split(' ')[0]} has been beside you for years. You still find things to say.`
          : `${(G.partner.name ?? 'Your partner').split(' ')[0]} has been beside you for years. The distance between people is not always distance.`)
      } else if (F.has('widowed')) {
        parts.push('You have lost a partner. You are still figuring out what alone means at this age.')
      } else if (F.has('divorced')) {
        parts.push('The marriage ended. You are learning to carry that without it becoming the whole story.')
      }

      const teenKids = (G.children ?? []).filter(c => (G.age - (c.ageAtBirth ?? 0)) >= 13)
      if (teenKids.length > 0) parts.push('Your children are becoming people you did not entirely predict.')
      if (F.has('lost_parent')) parts.push('You have lost a parent, which changes the shape of things.')
      if (F.has('career_defining_work')) parts.push('You have done work that mattered.')
      else if (G.career) parts.push('The work continues.')

      const desireLines = {
        prove_worth: 'You have proven things. The problem is that you keep needing to. You are starting to wonder if the needing is the actual subject.',
        belong: 'You belong somewhere now, mostly. There are still rooms where you feel it less, which used to bother you more than it does.',
        be_seen: 'You have been seen, partially. You are beginning to suspect that partial visibility is what is on offer, and that it may be enough.',
        safety: 'You understand now that complete safety was never the goal — it was the anxiety talking. You are building a different relationship with uncertainty.',
        connection: 'You have let some people in. Maybe not all the way. You are still deciding if that is wisdom or a habit from before.',
        leave_mark: 'You are in the middle of something you will judge from further away. Right now you can\'t see it clearly enough.',
        freedom: 'You are freer than you were at thirty. The question has shifted from getting free to what to do with it, which is harder.',
        redemption: 'You are still working on it. The weight has not changed, but how you carry it has.',
      }

      const desireLine = desireLines[G.desire] ?? 'Half of what you intended, more or less.'
      parts.push(desireLine)

      return `You are forty. ${parts.join(' ')} You have stopped apologising for the gap between what you meant and what is.`
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
        if (q > 70) parts.push(`You and ${(G.partner.name ?? 'your partner').split(' ')[0]} are still finding things to say to each other. That is not nothing.`)
        else parts.push(`You and ${(G.partner.name ?? 'your partner').split(' ')[0]} have settled into something. Comfortable and complicated at once.`)
      } else if (F.has('widowed')) {
        parts.push('You are managing alone, which you did not expect to be doing at this point.')
      } else if (!G.partner && !F.has('widowed')) {
        parts.push('You are on your own. You have made something of it.')
      }

      if (F.has('lost_parent')) parts.push('Both your parents are gone, or most of them. The position at the front of the line is yours now.')
      const adultKids = (G.children ?? []).filter(c => (G.age - (c.ageAtBirth ?? 0)) >= 18)
      if (adultKids.length > 0) parts.push('Your children are adults. That is strange every single day.')
      if (F.has('went_to_therapy') || F.has('therapy_veteran')) parts.push('You have done some of that work.')

      const desireLines = {
        prove_worth: 'The drive to prove yourself is still present. You have gotten somewhat better at noticing when it runs you and asking whether that is necessary.',
        belong: 'The search has quieted somewhat. You have found your people, or most of them. The remaining longing is quieter.',
        be_seen: 'You are becoming more comfortable with being known partially and imperfectly. Complete visibility may be more than people can offer each other.',
        safety: 'You have built what you could and accepted what you could not. It took most of your adult life to learn that those are different categories.',
        connection: 'The connections you have managed to keep are the real thing. You have stopped apologising for the ones that didn\'t survive.',
        leave_mark: 'You have made some things. Whether they will last is not entirely yours to decide.',
        freedom: 'You are freer than you have ever been, which is either wonderful or terrifying depending on the morning.',
        redemption: 'You have done some of the work. You carry the rest differently now — lighter, but still present.',
      }

      const desireLine = desireLines[G.desire] ?? 'There is more past than there used to be.'
      parts.push(desireLine)

      return `You are fifty. ${parts.join(' ')} You are learning to carry it all differently.`
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
        parts.push(`${(G.partner.name ?? 'Your partner').split(' ')[0]} is still here.`)
      } else if (F.has('widowed')) {
        parts.push('You are alone now, in the way you did not choose.')
      }

      if ((G.children ?? []).length > 0) parts.push('The children have their own lives. That was always the point.')
      if (F.has('career_defining_work')) parts.push('There is work you did that outlasts the doing of it.')
      if (F.has('first_gen_university')) parts.push('You went somewhere your parents could not have imagined.')
      if (F.has('emigrated')) parts.push('You made a life somewhere else. It is yours now, entirely.')

      const desireLines = {
        prove_worth: 'The drive to prove yourself never fully left. But from here you can see that it was always more about you than about anyone watching.',
        belong: 'The belonging you wanted at twenty looks different from sixty. You belong to your life now — imperfect, specific, yours.',
        be_seen: 'You have been seen — partially, imperfectly, genuinely — by some people. That turns out to be enough.',
        safety: 'Safety was never complete. You have made your peace with that, more or less, over a long time.',
        connection: 'The connections that survived are the real thing. You are glad you kept trying, even when it was easier not to.',
        leave_mark: 'What you have left behind is more visible from here than it was before. Some of it is what you meant.',
        freedom: 'You are as free as you are going to be. The question shifted years ago from getting free to what to do inside it.',
        redemption: 'You have made up for some things. The rest you have learned to carry without letting it be the whole story.',
      }

      const desireLine = desireLines[G.desire] ?? 'The things you were afraid of did not mostly happen.'
      parts.push(desireLine)

      return `You are sixty. ${parts.join(' ')} The things that happened were different from what you feared, and that is almost always true.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade60Ack', true) },
  },

  {
    id: 'decade_reflection_70',
    phase: 'late_life',
    weight: 6,
    cooldown: 0,
    when: (G) => G.age >= 70 && G.age <= 73 && !G.mem?.decade70Ack,
    text: (G) => {
      const F = G.flags
      const parts = []

      if (G.partner?.married) {
        parts.push(`${(G.partner.name ?? 'Your partner').split(' ')[0]} is still here. After all of it.`)
      } else if (F.has('widowed') || F.has('partner_died')) {
        parts.push('You are alone now. You have learned what alone means at this age.')
      }

      if ((G.children ?? []).length > 0) {
        const grandkids = F.has('grandparent')
        parts.push(grandkids ? 'There are grandchildren now.' : 'The children have their own children, or their own lives.')
      }

      if (F.has('cancer_survivor') || (G.conditions?.length ?? 0) > 0) {
        parts.push('The body has its own opinions, which you have learned to negotiate with.')
      }

      if (F.has('emigrated') && (G.yearsAbroad ?? 0) > 20) {
        parts.push('You have been gone for most of your adult life. The place you came from is the place you dream about.')
      }

      const desireLines = {
        prove_worth: 'You stopped needing to prove yourself sometime in your fifties. You barely noticed when it happened, which is how these things go.',
        belong: 'You belong to the life you built. For better and for worse, in all its specific imperfection, it is yours.',
        be_seen: 'You have been seen — not fully, not perfectly, but genuinely — by someone. You understand now that is what was on offer all along.',
        safety: 'You built what safety you could. The rest you learned to live without, which turned out to be livable.',
        connection: 'The people who know you, really know you. You stopped counting them long ago and started just being grateful.',
        leave_mark: 'You have left some marks. They are not the ones you imagined at twenty, but they are yours and they are real.',
        freedom: 'You are free now in a way that only time gives — free of proving, free of becoming, free to simply be what you are.',
        redemption: 'Whatever you needed to make up for, you did what you could. The rest you are learning to put down. It is time.',
      }

      const desireLine = desireLines[G.desire] ?? 'From here, the life has a shape it did not have from inside it.'
      parts.push(desireLine)

      return `You are seventy. ${parts.join(' ')} That is a long time to be one person.`
    },
    choices: null,
    effect: (p) => { p.setMem('decade70Ack', true) },
  },

]

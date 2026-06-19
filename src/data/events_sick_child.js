// events_sick_child.js — Parent of a seriously ill child
//
// Not child death — that arc is in events_child_death_arc.js.
// This is the child who is ill and stays ill, or recovers.
// The reorganization of a life around medical need. The specific
// compressed intimacy of ward schedules. The marriage tested by
// sustained crisis. The relief that does not erase what was learned.
//
// Arc shape:
//   Diagnosis → hospital texture → partner under pressure →
//   the ward community → career eclipse →
//   resolution (recovery OR chronic) →
//   late follow-through: who they became / still being needed

// ── helpers ────────────────────────────────────────────────────────────────

function illChild(G) {
  if (!G.children?.length) return null
  return G.children.find(c => {
    const ca = G.age - c.ageAtBirth
    return ca >= 2 && ca <= 14
  }) ?? null
}

function diagnosisText(G) {
  const arch = G.character?.country?.archetype ?? 'developing_urban'
  const child = illChild(G)
  const name = child?.name ?? 'Your child'

  if (arch === 'wealthy_west' || arch === 'wealthy_east') {
    return `The specialist is careful and thorough and the language is precise. What they are saying, translated out of its clinical framing, is that ${name} is seriously ill. The referral has already been made. The system will move. What you have to do now is be present for all of it — the appointments, the results, the waiting rooms — and not let your child see how afraid you are.`
  }
  if (arch === 'conflict_zone' || arch === 'developing_unstable') {
    return `The diagnosis arrives in a clinic that is not equipped for what ${name} needs. The doctor tells you what the condition is and what the treatment requires and you understand, without them saying it, that the gap between what is needed and what is available here is significant. You begin making calculations that feel impossible to make correctly.`
  }
  if (arch === 'subsaharan' || arch === 'developing_urban') {
    return `The doctors name what is wrong with ${name}. The treatment exists, costs money, and requires a facility you will have to travel to. You start doing mathematics you have never had to do before — the kind that measures life against money and tries not to acknowledge what it is measuring.`
  }
  return `The doctor says it plainly, which you later realize was a mercy. ${name} is ill. Not briefly — this is the kind of illness that rearranges things. You sit with this information for a moment, and then you begin.`
}

// ── events ────────────────────────────────────────────────────────────────

export const SICK_CHILD_EVENTS = [

  // ─── TRIGGER ─────────────────────────────────────────────────────────────

  {
    id: 'sick_child_diagnosis',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.flags.has('child_seriously_ill')) return false
      if (G.mem?.sickChildFired) return false
      return !!illChild(G)
    },
    text: diagnosisText,
    choices: [
      {
        text: 'Get the best care available — whatever it takes.',
        tag: null,
        outcome: 'You find it. The care is as good as it can be. The finding takes everything you have for a while.',
        effect: (p) => {
          p.m -= 16; p.h -= 5; p.mo -= 3000
          p.addFlag('child_seriously_ill')
          p.setMem('illChildWillRecover', Math.random() < 0.62)
          p.setMem('sickChildFired', true)
        },
      },
      {
        text: 'Take it one appointment at a time.',
        tag: null,
        outcome: 'This is the only approach that keeps you functional. You learn to live in the span between here and the next result.',
        effect: (p) => {
          p.m -= 18; p.h -= 4
          p.addFlag('child_seriously_ill')
          p.setMem('illChildWillRecover', Math.random() < 0.62)
          p.setMem('sickChildFired', true)
        },
      },
    ],
    effect: null,
  },

  // ─── HOSPITAL TEXTURE ─────────────────────────────────────────────────────

  {
    id: 'sick_child_hospital_texture',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      !G.mem?.sickChildHospitalFired,
    text: (G) => {
      const arch = G.character?.country?.archetype ?? 'developing_urban'
      if (arch === 'wealthy_west' || arch === 'wealthy_east') {
        return 'Your life reorganizes itself without asking. The appointments become the structure of the week. You learn the names of the nurses and which ones answer questions honestly. You learn how to read the look on the doctor\'s face before the words arrive. The other rooms in your life — the job, the dinner conversations, the weekend plans — become a parallel life you continue out of necessity. You are competent in all of it. You are somewhere else.'
      }
      return 'Your life reorganizes itself around need. The journey to the clinic, the cost of the medication, the schedule that cannot be missed — these become the week\'s architecture. The other children require things you give them. Your partner takes the load you cannot carry. You take the load they cannot. The family is building something without a blueprint, under conditions it did not choose.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 5; p.setMem('sickChildHospitalFired', true) },
  },

  // ─── PARTNER UNDER PRESSURE ───────────────────────────────────────────────

  {
    id: 'sick_child_partner_pressure',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      !!G.partner &&
      !G.mem?.sickChildPartnerFired,
    text: (G) => {
      const pName = G.partner?.name ?? 'Your partner'
      return `${pName} and you are in this together, which is different from being in it the same way. The grief is the same subject with different textures. Some nights the gap between your textures is a manageable distance. Some nights it is not. You are both trying. You can both see the trying and it helps and it is not enough and it helps anyway.`
    },
    choices: [
      {
        text: 'You face it as a unit. The crisis pulls you closer.',
        tag: null,
        outcome: 'Not without cost. But together.',
        effect: (p) => {
          p.m -= 6
          p.addFlag('ill_child_partner_rebuilt')
          p.updatePartnerRel(8)
          p.setMem('sickChildPartnerFired', true)
        },
      },
      {
        text: 'The grief separates you. Each of you carries it alone.',
        tag: null,
        outcome: 'You are both present and both far away. The child sees none of this, which takes enormous effort.',
        effect: (p) => {
          p.m -= 14; p.r += 7
          p.addFlag('ill_child_partner_fractured')
          p.updatePartnerRel(-15)
          p.setMem('sickChildPartnerFired', true)
        },
      },
    ],
    effect: null,
  },

  // ─── THE WARD COMMUNITY ───────────────────────────────────────────────────

  {
    id: 'sick_child_ward_community',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      !G.mem?.sickChildWardFired,
    text: () =>
      'There is another parent. You have been sitting in the same corridor for three weeks and you have not properly introduced yourselves and you know more about each other\'s lives than most friends do. They have been here longer. They know which vending machine takes the card and which doctor speaks plainly and what to say when the extended family needs an update without understanding the update. The knowledge is specific and unglamorous and entirely necessary, and you receive it with more gratitude than you have felt in years.',
    choices: null,
    effect: (p) => {
      p.m += 7; p.s += 3
      p.addFlag('ill_child_ward_community')
      p.setMem('sickChildWardFired', true)
    },
  },

  // ─── CAREER ECLIPSE ───────────────────────────────────────────────────────

  {
    id: 'sick_child_career_eclipse',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      !!G.career &&
      !G.mem?.sickChildCareerFired,
    text: (G) => {
      const field = G.career?.field ?? 'work'
      return `The ${field} continues. You continue in it, in the way you continue most things right now — functionally, from a distance. The job requires things of you and you give them. What you cannot give it is the part of your attention that is always somewhere else. Your colleagues know something is happening at home. Most of them have the grace not to ask. Some cover for you without making it a gift that requires repayment. You note this.`
    },
    choices: null,
    effect: (p) => { p.w -= 3; p.e -= 3; p.setMem('sickChildCareerFired', true) },
  },

  // ─── RECOVERY PATH ────────────────────────────────────────────────────────

  {
    id: 'sick_child_recovery',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      G.mem?.illChildWillRecover === true &&
      !G.mem?.sickChildResolved,
    text: (G) => {
      const recoverChild = G.children?.find(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 2 && ca <= 18
      })
      const name = recoverChild?.name ?? 'Your child'
      return `${name}'s numbers improve. Not all at once — the body does not work that way — but the trend is unmistakable. The specialist uses the phrase "cautiously optimistic," which you have been trained by this experience to translate accurately. It means: probably. It means: we can stop holding our breath quite so tightly.\n\nYou do not celebrate immediately. You have learned the difference between improvement and over. You let it be real for a few days before you allow yourself to feel the relief.`
    },
    choices: null,
    effect: (p) => {
      p.m += 22; p.h += 5
      p.addFlag('child_illness_recovery')
      p.setMem('sickChildResolved', true)
    },
  },

  // ─── CHRONIC PATH ─────────────────────────────────────────────────────────

  {
    id: 'sick_child_becomes_chronic',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('child_seriously_ill') &&
      G.mem?.illChildWillRecover === false &&
      !G.mem?.sickChildResolved,
    text: (G) => {
      const child = G.children?.find(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 2 && ca <= 18
      })
      const name = child?.name ?? 'Your child'
      return `The doctors use the word "managed." What they mean is: not resolved. What they mean is: ${name} will live with this and you will live with it alongside them. The treatment plan exists and is followed. The condition is stable. The condition is permanent.\n\nYou spend a week with this information before you can absorb what it means for the shape of the years ahead. Then you absorb it and adjust and go back to the appointments.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 14; p.h -= 4
      p.addFlag('child_illness_chronic')
      p.setMem('sickChildResolved', true)
    },
  },

  // ─── LATE FOLLOW-THROUGH: WHO THEY BECAME ────────────────────────────────

  {
    id: 'sick_child_who_they_became',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('child_illness_recovery') &&
      G.age >= 52 &&
      !G.mem?.sickChildLateFired,
    text: (G) => {
      const grownChild = G.children?.find(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 22 && ca <= 42
      })
      const name = grownChild?.name ?? 'Your child'
      return `${name} is grown and healthy and leading the specific life they have assembled. You watch them from the distance that grown children create, and you understand that the illness was part of what they are — the particular patience they have, the specific relationship with their own body, something about how they take care of people in small ways that others miss.\n\nYou do not know if you would undo it, even if you could. You know what it cost. You know what came through it.`
    },
    choices: null,
    effect: (p) => {
      p.m += 12
      p.addFlag('ill_child_late_witness')
      p.setMem('sickChildLateFired', true)
    },
  },

  // ─── LATE FOLLOW-THROUGH: STILL NEEDED ────────────────────────────────────

  {
    id: 'sick_child_chronic_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('child_illness_chronic') &&
      G.age >= 55 &&
      !G.mem?.sickChildLateFired,
    text: (G) => {
      const child = G.children?.find(c => G.age - c.ageAtBirth >= 20)
      const name = child?.name ?? 'Your child'
      return `${name} is an adult now and manages most of it independently and calls when they need something specific. The condition has not resolved. The management has. You have both learned the difference between supporting someone and doing it for them, and the line has moved several times over the years as the condition evolved and as they grew into their own understanding of what they needed.\n\nYou are still needed. This is not the same as the early years. It is a different kind of being needed — requested rather than required, considered on both sides.`
    },
    choices: null,
    effect: (p) => {
      p.m += 5; p.r += 4
      p.addFlag('ill_child_late_witness')
      p.setMem('sickChildLateFired', true)
    },
  },

]

import { gendered } from '../_pronouns.js'
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
  return `The doctor says it plainly, which you later realize was a mercy. ${name} is ill. Not briefly — this is the kind of illness that rearranges things. For a moment you do nothing, and then you begin.`
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
        return 'Your life rearranges itself without asking. The appointments become the shape of the week. You learn the nurses\' names and which of them answer a question straight, and you learn to read the doctor\'s face before the words. The job and the dinners and the weekends go on as a second life you keep up because you must. You are somewhere else.'
      }
      return 'Your life rearranges itself around need: the trip to the clinic, the price of the medicine, the schedule that cannot slip. The other children still need things and you give them. Your partner carries what you cannot, and you carry what they cannot. The family is building something with no plan, in conditions it did not choose.'
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
      const pName = G.partner?.name ?? 'your partner'
      return `You and ${pName} are in this together, which is not the same as being in it the same way. Some nights the distance between how each of you carries it is small. Some nights it is not. You can each see the other trying, and it helps, and it is not enough, and it helps anyway.`
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
      return `The ${field} goes on, and you go on in it, from a little distance. You give the job what it asks for, except the part of your attention that is always somewhere else. Your colleagues know something is happening at home and most of them do not ask. One or two cover for you without making it a favour to be repaid. You notice.`
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
      return `${name}'s numbers improve. Not all at once, but the line is going the right way. The specialist says "cautiously optimistic", and you have learned to translate it: probably, and you can breathe a little. You do not celebrate yet. You give it a few days before you let yourself feel the relief.`
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
      return `The doctors say "managed", which means not resolved. ${name} will live with this, and so will you. The plan exists and is followed; the condition is stable, and it is permanent. It takes you a week to take in what that means for the years ahead. Then you go back to the appointments.`
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
      return `${name} is grown and healthy and leading the life they have assembled. You watch them from the distance that grown children create, and you understand that the illness was part of what they are — the patience they have, the relationship with their own body, something about how they take care of people in small ways that others miss.\n\nYou do not know if you would undo it, even if you could. You know what it cost. You know what came through it.`
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
      return gendered(`${name} is an adult now, manages most of it alone, and calls when something is needed. The condition has not gone; the managing has settled. Over the years the two of you have moved the line between helping and taking over, several times. You are still needed, but asked now rather than required.`, child)
    },
    choices: null,
    effect: (p) => {
      p.m += 5; p.r += 4
      p.addFlag('ill_child_late_witness')
      p.setMem('sickChildLateFired', true)
    },
  },

]

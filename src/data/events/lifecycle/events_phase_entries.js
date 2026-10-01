// Phase entry decision points — fire once at the start of young_adult, midlife, late_life.
// These are guaranteed: injected into the queue by tick() at each phase transition.
// They give the player a moment of conscious orientation — what matters most entering this phase.
// Choices set flags that weight subsequent event selection and gate follow-through events.

// These are injected at the front of the queue on the transition year, but a
// queue is not a guarantee of the same year, and the opener asserted an exact
// age — so a player who met the young-adult beat at twenty-one was told "You
// are eighteen." The opener is now derived from the age the character actually
// is, and each event carries a band beyond which the beat has stopped being
// about entering the phase.
// The opener used to be one sentence for everybody ("The scaffolding of
// childhood has been removed"), printed into nearly every life at the same
// three ages. It is now read from the state — the child at the breast, the
// field, the job, the war, the grandchildren — by `groundLine` in
// _phaseLines.js, and the closing question rotates.
//
// In passive mode the character answers, and the log prints the outcome: so
// each outcome opens on the answer itself, in the character's own terms.
import { groundLine, phaseQuestion } from './_phaseLines.js'

export const PHASE_ENTRY_EVENTS = [

  {
    id: 'phase_entry_young_adult',
    phase: 'young_adult',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryYoungAdultDone && G.age <= 22,
    text: (G) => `${groundLine(G, 'young_adult')} ${phaseQuestion('young_adult')}`,
    choices: [
      {
        text: 'Making something of yourself, and being known for it.',
        tag: 'ya_priority_achievement',
        outcome: 'Making something of yourself: you decide it the way people decide things at that age, all at once and without saying it aloud. Everything else will have to fit in the margins.',
        effect: (p) => { p.e += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
      {
        text: 'Your people. Love, friends, somewhere to belong.',
        tag: 'ya_priority_connection',
        outcome: 'Your people, you decide. The ones at the table, the ones you have not met yet. The rest can come later, or not.',
        effect: (p) => { p.s += 3; p.m += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
      {
        text: 'Finding out who you actually are.',
        tag: 'ya_priority_identity',
        outcome: 'You decide not to know yet. Finding out will take years and make a mess, and you would rather that than be told.',
        effect: (p) => { p.r += 3; p.karma += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'phase_entry_midlife',
    phase: 'midlife',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryMidlifeDone && G.age <= 34,
    text: (G) => {
      const d = G.desire
      const desireCtx = {
        prove_worth: `The score you have been keeping since you were a child: is anyone else keeping it?`,
        belong: `The rooms you have made yourself fit: do any of them feel like home yet?`,
        be_seen: `Some people know your name now. Is it for the thing you wanted?`,
        safety: `The money put by, the door locked twice: is it enough yet?`,
        connection: `The people you have kept close: how are they holding?`,
        leave_mark: `The thing you have been building toward: does it look like what you imagined?`,
        freedom: `You are a long way from what you were handed. Does it feel chosen?`,
        redemption: `The thing you have been trying to put right: where does it stand?`,
      }
      const ctx = desireCtx[d]
      return [groundLine(G, 'midlife'), ctx, phaseQuestion('midlife')].filter(Boolean).join(' ')
    },
    choices: [
      {
        text: 'Build on what is already there.',
        tag: 'ml_priority_build',
        outcome: 'What is already there, you decide. You stop starting things. What exists gets deeper rather than wider.',
        effect: (p) => { p.e += 3; p.setMem('phaseEntryMidlifeDone', true) },
      },
      {
        text: 'Mend what has been let slide.',
        tag: 'ml_priority_repair',
        outcome: 'The people you have let slide, you decide. You make the visit you have been putting off. Some of it can be recovered.',
        effect: (p) => { p.karma += 4; p.setMem('phaseEntryMidlifeDone', true) },
      },
      {
        text: 'Change something. Part of this is not working.',
        tag: 'ml_priority_reconsider',
        outcome: 'Something has to change, you decide, though you could not yet say what. The life you built was somebody\'s life. You are not sure it was always yours.',
        effect: (p) => { p.r += 4; p.m -= 3; p.setMem('phaseEntryMidlifeDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'phase_entry_late_life',
    phase: 'late_life',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryLateLifeDone && G.age <= 54,
    text: (G) => {
      const d = G.desire
      const desireCtx = {
        prove_worth: `You have made something of yourself. What it cost is a question the fifties ask more often than the forties did.`,
        belong: `Of the rooms you were part of, you could count the ones that would still have you.`,
        be_seen: `You have been seen, in the ways that were on offer. Some of it was the seeing you wanted.`,
        safety: `Some of the locks you fitted turned out to be for doors nobody ever tried.`,
        connection: `You could list who is still here and who is gone without stopping to think.`,
        leave_mark: `What you hoped to leave has got smaller and more exact: a few people, a few things that still stand.`,
        freedom: `You got away from what you were handed. What you built in the space is what is in front of you.`,
        redemption: `The thing you have been trying to put right is still there when you wake.`,
      }
      const ctx = desireCtx[d]
      return [groundLine(G, 'late_life'), ctx, phaseQuestion('late_life')].filter(Boolean).join(' ')
    },
    choices: [
      {
        text: 'Make peace with what is.',
        tag: 'll_priority_acceptance',
        outcome: 'Peace, you decide, or something near it. You stop arguing with the life and start living in it.',
        effect: (p) => { p.m += 5; p.karma += 3; p.setMem('phaseEntryLateLifeDone', true) },
      },
      {
        text: 'Pass it on to the people who come after.',
        tag: 'll_priority_transmit',
        outcome: 'Passing it on, you decide. You start telling the young ones how things were done, whether or not they asked.',
        effect: (p) => { p.karma += 5; p.setMem('phaseEntryLateLifeDone', true) },
      },
      {
        text: 'One more thing. Something is still unfinished.',
        tag: 'll_priority_unfinished',
        outcome: 'The unfinished thing, you decide. It has waited this long and it can wait a little longer, but not much.',
        effect: (p) => { p.r += 4; p.e += 3; p.setMem('phaseEntryLateLifeDone', true) },
      },
    ],
    effect: null,
  },

]

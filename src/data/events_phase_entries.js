// Phase entry decision points — fire once at the start of young_adult, midlife, late_life.
// These are guaranteed: injected into the queue by tick() at each phase transition.
// They give the player a moment of conscious orientation — what matters most entering this phase.
// Choices set flags that weight subsequent event selection and gate follow-through events.

export const PHASE_ENTRY_EVENTS = [

  {
    id: 'phase_entry_young_adult',
    phase: 'young_adult',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryYoungAdultDone,
    text: `You are eighteen. The scaffolding of childhood has been removed. The life ahead is unwritten. What matters most, entering this?`,
    choices: [
      {
        text: 'Making something of yourself. Career, achievement, recognition.',
        tag: 'ya_priority_achievement',
        outcome: 'You fix the compass on work and ambition. Other things will have to wait, or happen in the margins.',
        effect: (p) => { p.e += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
      {
        text: 'Finding your people. Love, friendship, belonging.',
        tag: 'ya_priority_connection',
        outcome: 'You turn toward the people around you. The career can come later, maybe.',
        effect: (p) => { p.s += 3; p.m += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
      {
        text: 'Figuring out who you actually are.',
        tag: 'ya_priority_identity',
        outcome: 'You reserve the right to not know yet. The finding out will take time and probably make a mess.',
        effect: (p) => { p.r += 3; p.karma += 3; p.setMem('phaseEntryYoungAdultDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'phase_entry_midlife',
    phase: 'midlife',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryMidlifeDone,
    text: (G) => {
      const d = G.desire
      const desireCtx = {
        prove_worth: `The scoreboard you have been keeping — achievements, titles, the recognition of people whose opinion matters to you — is it working?`,
        belong: `The circles you have moved in, the rooms you have made yourself fit — do they feel like home now?`,
        be_seen: `The visibility you have built, the presence you have made — is it what you wanted it to be?`,
        safety: `The stability you have constructed — the routines, the provisions, the controlled variables — is it enough?`,
        connection: `The relationships you have tended — partners, children, friends — how are they holding?`,
        leave_mark: `The thing you have been building toward — is it taking the shape you imagined?`,
        freedom: `The life you have shaped for yourself, away from what was given to you — does it feel chosen?`,
        redemption: `The debt you have been repaying, the wrong you have been righting — where does it stand?`,
      }
      const ctx = desireCtx[d] ?? 'The life you have been building has become recognizable as a life.'
      return `You are thirty. ${ctx} What matters most in this half?`
    },
    choices: [
      {
        text: 'Consolidate. Build what you have been working toward.',
        tag: 'ml_priority_build',
        outcome: 'The focus narrows. What exists gets deeper rather than wider.',
        effect: (p) => { p.e += 3; p.setMem('phaseEntryMidlifeDone', true) },
      },
      {
        text: 'Repair. The relationships that need attention.',
        tag: 'ml_priority_repair',
        outcome: 'You turn toward the things you have let slide. Some can be recovered.',
        effect: (p) => { p.karma += 4; p.setMem('phaseEntryMidlifeDone', true) },
      },
      {
        text: 'Reconsider. Something is not working and you know it.',
        tag: 'ml_priority_reconsider',
        outcome: 'The life you built was not wrong, exactly. It was someone\'s life. You are not sure it was always yours.',
        effect: (p) => { p.r += 4; p.m -= 3; p.setMem('phaseEntryMidlifeDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'phase_entry_late_life',
    phase: 'late_life',
    weight: 5,
    when: (G) => !G.mem?.phaseEntryLateLifeDone,
    text: (G) => {
      const d = G.desire
      const desireCtx = {
        prove_worth: `What you have made of yourself — is that the word for it? What it has cost is a different question, one the fifties ask with some insistence.`,
        belong: `The rooms you have been part of, the people who have been yours. What of it remains, and what was lost along the way?`,
        be_seen: `You have been seen, in the ways that were available to you. Looking back: was it what you needed it to be?`,
        safety: `The structures you built to feel safe — which ones held? Which ones turned out to be unnecessary?`,
        connection: `The people. Always the people. Who is still here. Who is gone. What was made between you that mattered.`,
        leave_mark: `The mark question is simpler now. Not what you built for history. What survived. What is still standing.`,
        freedom: `You escaped, or resisted, or both. The question now is what you built in the space the escape created.`,
        redemption: `The reckoning you have been postponing, or conducting, or both — it arrives at fifty with some insistence.`,
      }
      const ctx = desireCtx[d] ?? 'The life you have lived has become visible, like a landscape from a height.'
      return `You are fifty. ${ctx} What do you carry into this last stretch?`
    },
    choices: [
      {
        text: 'Accept what is. Find peace in what has been built.',
        tag: 'll_priority_acceptance',
        outcome: 'Not resignation — something quieter. The life is the life. You can live in it now.',
        effect: (p) => { p.m += 5; p.karma += 3; p.setMem('phaseEntryLateLifeDone', true) },
      },
      {
        text: 'Transmit. Give what you have to the people who come after.',
        tag: 'll_priority_transmit',
        outcome: 'The work is in the passing on now. What you have learned, what you have built, what you still have to offer.',
        effect: (p) => { p.karma += 5; p.setMem('phaseEntryLateLifeDone', true) },
      },
      {
        text: 'One more thing. There is still something unfinished.',
        tag: 'll_priority_unfinished',
        outcome: 'The stubbornness of the unlived thing. It has waited this long. It will wait a little longer if it has to.',
        effect: (p) => { p.r += 4; p.e += 3; p.setMem('phaseEntryLateLifeDone', true) },
      },
    ],
    effect: null,
  },

]

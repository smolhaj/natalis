// events_addiction.js — Full addiction arc
//
// The arc from first use through spiral, rock bottom, overdose risk (can trigger
// death), first recovery attempt, relapse, long-term recovery, and the identity
// that sobriety builds. Also includes one event for family members of an addict.
//
// Guards: these events fire on top of existing addiction flags (drug_addiction,
// alcohol_addiction) already set by activities.js and events_consequence.js.
// This module adds the narrative depth those flags currently lack.

// ═══════════════════════════════════════════════════════════════════════════════
// THE SPIRAL
// ═══════════════════════════════════════════════════════════════════════════════

const ADDICTION_SPIRAL = [

  {
    id: 'add_the_habit_forms',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      (G.flags.has('drug_addiction') || G.flags.has('alcohol_addiction')) &&
      !G.flags.has('in_recovery') &&
      !G.flags.has('addiction_spiral') &&
      !G.mem?.addHabitFired,
    text: (G) => {
      const isAlcohol = G.flags.has('alcohol_addiction')
      if (isAlcohol) return 'The drinking has found its shape. It is no longer about the occasion — the occasion is now shaped around the drinking. You still know the difference between what it looks like from outside and what it is from inside. The gap between those two things is where the habit lives.'
      return 'The using has a schedule now, even if you haven\'t named it as a schedule. There are things you do before, things you tell yourself after, and a period in between where none of that applies. The telling yourself after is getting briefer. The things you do before are getting more organised.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 5; p.addFlag('addiction_spiral'); p.setMem('addHabitFired', true) },
  },

  {
    id: 'add_consequences_arrive',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('addiction_spiral') &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addConsequencesFired,
    text: (G) => {
      const isAlcohol = G.flags.has('alcohol_addiction')
      const hasCareer = G.career != null
      if (hasCareer && isAlcohol) return 'The manager takes you aside after the third time. The third time is not the first time she has noticed — it is the first time she has spoken to you about it. The conversation is professional and has a word in it that you have been not-saying for two years. The word is problem. You hear yourself explain why it isn\'t.'
      if (hasCareer) return 'The project slips. The deadline passes. The explanation you give is true in the way that a symptom is true — it describes what happened without explaining what caused it. The people around you are beginning to see the pattern before you are ready to.'
      return 'The person who cares about you says the thing directly. You explain why they are wrong. The explanation takes forty minutes and neither of you is convinced by the end of it.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 5; p.addFlag('addiction_consequences'); p.setMem('addConsequencesFired', true) },
  },

  {
    id: 'add_job_loss',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('addiction_spiral') &&
      G.career != null &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addJobLossFired,
    text: 'The job ends. Not dramatically — the paperwork is clean and the HR process is professional and the reason given is performance-related and the actual reason is also performance-related, just not the way the form describes it. You clean out the desk. The box is smaller than you expected. You have been in this building for four years and the evidence fits in a box you can carry with one hand.',
    choices: null,
    effect: (p) => { p.m -= 12; p.mo -= 1000; p.addFlag('addiction_job_lost'); p.setMem('addJobLossFired', true) },
  },

  {
    id: 'add_relationship_ultimatum',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('addiction_spiral') &&
      G.partner != null &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addRelUltFired,
    text: (G) => {
      const partnerName = G.partner?.name?.split(' ')[0] ?? 'your partner'
      return `${partnerName} says: I can\'t do this anymore. The sentence has been forming for a long time and you have known it was forming and you have also not known it was forming because the using makes not-knowing more accessible than knowing. The sentence has been said now. It is in the room. You have to decide what to do with it.`
    },
    choices: [
      {
        text: 'This is the one — you will get help',
        tag: null,
        outcome: 'The decision is made. The first call is made the same day, before the resolution fades. That is the only advantage of crisis: it creates the right conditions for the first step.',
        effect: (p) => { p.m -= 5; p.addFlag('addiction_first_recovery_attempt'); p.setMem('addRelUltFired', true) },
      },
      {
        text: 'You will handle it yourself — this is not what they think it is',
        tag: null,
        outcome: 'The self-handling does not work. It is not what self-handling the problem produces. The partner moves to the decision they said they would move to.',
        effect: (p) => { p.m -= 15; p.addFlag('addiction_spiral'); p.setMem('addRelUltFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ROCK BOTTOM
// ═══════════════════════════════════════════════════════════════════════════════

const ADDICTION_BOTTOM = [

  {
    id: 'add_rock_bottom',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('addiction_spiral') &&
      G.flags.has('addiction_consequences') &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addBottomFired,
    text: 'There is a moment — not always dramatic, sometimes just a morning — where the accounting is complete and undeniable. What you have spent. What you have lost. What you are. The moment has a specific quality: the usual defences are not available. The rationalizations are not loading. You are sitting in what is actually true, without the buffer. Rock bottom is not a place. It is this specific quality of clarity.',
    choices: [
      {
        text: 'Ask for help',
        tag: null,
        outcome: 'The call is made. The first step is not the hardest step — the first step is just the first step. The process begins.',
        effect: (p) => { p.m += 5; p.addFlag('addiction_first_recovery_attempt'); p.addFlag('addiction_asked_for_help'); p.setMem('addBottomFired', true) },
      },
      {
        text: 'You are not ready yet',
        tag: null,
        outcome: 'The clarity passes. The using continues. The bottom is not yet the bottom. Another accounting will come.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.setMem('addBottomFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'add_overdose',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.has('drug_addiction') &&
      G.flags.has('addiction_spiral') &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addOverdoseFired,
    text: 'You wake up in a hospital. Or someone wakes you up — the details are fragmented in the specific way that extreme events fragment. What is clear is that you are alive and that you were not certain to be alive and that someone made the call that brought the people who made sure you were alive. The doctor uses a word. The word is overdose. You already knew the word. The word is now in your record.',
    choices: [
      {
        text: 'This is the end of it — this is where you stop',
        tag: null,
        outcome: 'The decision made from a hospital bed in the hour after an overdose is not the same as a resolution made in ordinary conditions. It has a specific weight. You use the weight.',
        effect: (p) => { p.h -= 15; p.m -= 10; p.addFlag('addiction_overdose_survived'); p.addFlag('addiction_first_recovery_attempt'); p.setMem('addOverdoseFired', true) },
      },
      {
        text: 'You survive it — but not yet',
        tag: null,
        outcome: 'You survive the overdose. The using continues. The next accounting will come from lower down.',
        effect: (p) => { p.h -= 20; p.m -= 20; p.addFlag('addiction_overdose_survived'); p.setMem('addOverdoseFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'add_overdose_death',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('drug_addiction') &&
      G.flags.has('addiction_spiral') &&
      G.flags.has('addiction_overdose_survived') &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addOverdoseDeathFired,
    text: 'The second overdose is not something you wake up from.',
    choices: null,
    effect: (p) => {
      p.h -= 100
      p.addFlag('died_of_overdose')
      p.setMem('addOverdoseDeathFired', true)
    },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// RECOVERY
// ═══════════════════════════════════════════════════════════════════════════════

const ADDICTION_RECOVERY = [

  {
    id: 'add_first_recovery',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('addiction_first_recovery_attempt') &&
      !G.flags.has('in_recovery') &&
      !G.mem?.addFirstRecovFired,
    text: (G) => {
      const isAlcohol = G.flags.has('alcohol_addiction')
      if (isAlcohol) return 'The first AA meeting is in a church basement with bad coffee. The people in the room have something in common with you that you have not admitted to anyone, including yourself, until now. The format is strange. The stories are specific. One of the stories is yours, told by someone else, which is not something you were prepared for. You go back the following week.'
      return 'The programme is thirty days. The first three days are not the hard part — the hard part begins around day five, when the using is no longer the immediate problem and the reason you were using becomes the immediate problem. The counsellor says this is normal. It is the most useful thing anyone has said to you in a long time.'
    },
    choices: null,
    effect: (p) => { p.h += 5; p.m += 5; p.addFlag('in_recovery'); p.setMem('addFirstRecovFired', true) },
  },

  {
    id: 'add_early_recovery',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('in_recovery') &&
      !G.flags.has('sobriety') &&
      !G.flags.has('relapsed') &&
      !G.mem?.addEarlyRecovFired,
    text: 'The first ninety days. The recovery meetings have a shape to them. You are learning the specific discipline of this — different from any other discipline, because the thing you are disciplining against is still chemically present in your body as a preference. The people who have been in it longer have something that is not happiness exactly. You think the word is available. You are aiming at available.',
    choices: null,
    effect: (p) => { p.h += 5; p.m += 5; p.addFlag('early_recovery'); p.setMem('addEarlyRecovFired', true) },
  },

  {
    id: 'add_relapse',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('in_recovery') &&
      G.flags.has('early_recovery') &&
      !G.flags.has('sobriety') &&
      !G.mem?.addRelapseFired,
    text: 'The relapse happens at a specific moment you could describe precisely. It is not a collapse — it is a decision that happens in about four seconds, in which the recovery is abandoned and the using begins again. The four seconds are long enough to be a choice. The choice is made. This is the hardest thing about relapse: it was possible not to. That fact does not make it easier. It makes it worse.',
    choices: [
      {
        text: 'Go back to the programme — the relapse is not the end',
        tag: null,
        outcome: 'You go back. The programme says this is what the programme is for. The shame is real and the return is possible. You use the return.',
        effect: (p) => { p.m -= 8; p.addFlag('relapsed'); p.addFlag('in_recovery'); p.setMem('addRelapseFired', true) },
      },
      {
        text: 'The relapse has shown you the recovery was a performance',
        tag: null,
        outcome: 'You stop the programme. The using continues. The accounting will come again, from further down.',
        effect: (p) => { p.m -= 15; p.h -= 10; p.addFlag('relapsed'); p.setMem('addRelapseFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'add_sobriety_established',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('in_recovery') &&
      !G.flags.has('sobriety') &&
      G.age >= 28 &&
      !G.mem?.addSobrietyFired,
    text: 'A year. Then two. Then five. The sobriety is not absence — it is presence, a different kind, that requires maintenance. The meetings are part of the week. The sponsor relationship is a specific kind of friendship. You are not who you were before the addiction and not who you were during it. You are a third thing. The third thing is functional and yours.',
    choices: null,
    effect: (p) => { p.h += 10; p.m += 10; p.addFlag('sobriety'); p.addFlag('addiction_recovered'); p.setMem('addSobrietyFired', true) },
  },

  {
    id: 'add_anniversary',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('sobriety') &&
      G.age >= 35 &&
      !G.mem?.addAnnivFired,
    text: 'The ten-year chip at the meeting. The room is people who understand what ten years means in this context, which is different from what ten years means anywhere else. Someone who is two months clean is in the room. You were that person once. You say the thing that was said to you, which is: it gets different, not easier. You mean it.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('sobriety_decade'); p.setMem('addAnnivFired', true) },
  },

  {
    id: 'add_carrying_someone',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('sobriety') &&
      !G.mem?.addCarryingFired,
    text: 'Someone in your family or your circle is where you were. You can see it precisely — the timing, the patterns, the explanations, the specific quality of the not-looking. You know what it costs to say something. You also know what it costs not to.',
    choices: [
      {
        text: 'Say something — you know how to do this',
        tag: null,
        outcome: 'The conversation is the hardest kind: honest, risky, uncontrollable in outcome. You have it. Whether it helps depends on factors you cannot manage.',
        effect: (p) => { p.karma += 8; p.m -= 5; p.addFlag('addiction_family_carried'); p.setMem('addCarryingFired', true) },
      },
      {
        text: 'Hold the boundary — you cannot carry someone else\'s recovery',
        tag: null,
        outcome: 'The boundary is the correct one and costs something. You maintain it. The other person\'s path is theirs.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('addiction_family_boundary'); p.setMem('addCarryingFired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// FAMILY OF AN ADDICT
// ═══════════════════════════════════════════════════════════════════════════════

const ADDICTION_FAMILY = [

  {
    id: 'add_family_witness',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      !G.flags.has('drug_addiction') &&
      !G.flags.has('alcohol_addiction') &&
      (G.flags.has('addiction_in_family') || (G.parents ?? []).some(p => p.alive !== false)) &&
      !G.mem?.addFamilyFired,
    text: 'Someone close to you is in the using. Not you — them. The watching is its own particular experience: the specific hope and specific disappointment cycling on a schedule, the way the relationship has reorganised itself around the addiction without anyone deciding to reorganise it. You have read the materials. You know the words. The words are less useful than you expected.',
    choices: [
      {
        text: 'Al-Anon or similar — support for people who love someone in addiction',
        tag: null,
        outcome: 'The first meeting surprises you. The other people are you. The support is not about fixing the person you love — it is about managing the life that surrounds the not-being-fixed. That reframe is useful.',
        effect: (p) => { p.m += 5; p.addFlag('addiction_family_supported'); p.setMem('addFamilyFired', true) },
      },
      {
        text: 'Hold on — you are not ready to involve strangers in this',
        tag: null,
        outcome: 'The not-involving continues. The holding on continues. The cost continues.',
        effect: (p) => { p.m -= 8; p.addFlag('addiction_family_isolated'); p.setMem('addFamilyFired', true) },
      },
    ],
    effect: null,
  },

]

export const ADDICTION_EVENTS = [
  ...ADDICTION_SPIRAL,
  ...ADDICTION_BOTTOM,
  ...ADDICTION_RECOVERY,
  ...ADDICTION_FAMILY,
]

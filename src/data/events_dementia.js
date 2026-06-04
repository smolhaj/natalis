// events_dementia.js — Dementia arc
//
// Two intertwined arcs: developing dementia (personal), and watching
// a parent or partner develop it. Both are among the most common
// late-life experiences and are almost entirely absent from the game.
//
// Personal arc fires for characters 65+ with the right conditions.
// Witness arc fires for characters whose parent or partner has the flag.

export const DEMENTIA_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // PERSONAL — DEVELOPING DEMENTIA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'dem_first_signs_personal',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.age >= 68 &&
      !G.flags.has('dementia_personal') &&
      !G.mem?.demFirstSignsFired,
    text: 'The word is in your mouth and then it isn\'t. You have always lost words — everyone loses words. But this is different in a way you cannot yet name precisely: the word is somewhere behind the usual place words are, and the search takes longer. You also — and this one you notice with more seriousness — drove past your street. The street you have turned on for eleven years. You turned around and did not mention it.',
    choices: [
      {
        text: 'Go to the doctor — the early knowing matters',
        tag: null,
        outcome: 'The assessment takes an hour. The results are framed carefully. You understand what is being carefully framed. Early diagnosis gives you time to make decisions while you can still make them.',
        effect: (p) => { p.m -= 12; p.addFlag('dementia_personal'); p.addFlag('dementia_diagnosed_early'); p.addCondition('dementia', 'mild'); p.setMem('demFirstSignsFired', true) },
      },
      {
        text: 'Not yet — this could be many things',
        tag: null,
        outcome: 'You wait. The signs continue to accumulate quietly. Someone else eventually notices before you are ready to name it.',
        effect: (p) => { p.m -= 5; p.addFlag('dementia_personal'); p.addCondition('dementia', 'mild'); p.setMem('demFirstSignsFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dem_telling_family',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      G.flags.has('dementia_personal') &&
      !G.mem?.demTellingFamilyFired,
    text: 'You tell the family. The conversation has been forming in you for several weeks — who to tell first, how to say the word without making it the only word in the room. The responses divide cleanly: the one who immediately wants to research everything, the one who goes quiet, the one who says surely there are treatments, the one who cries and then apologises for crying. You have prepared the news. You cannot prepare them.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('dementia_family_told'); p.setMem('demTellingFamilyFired', true) },
  },

  {
    id: 'dem_the_plan',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      G.flags.has('dementia_personal') &&
      G.flags.has('dementia_diagnosed_early') &&
      !G.mem?.demPlanFired,
    text: 'You write things down while you can write them down: what you want for end-of-life care, who has authority if you can no longer exercise your own, which of the family members should make which decisions. The documents are dry and procedural. What they represent is not. You are making choices for a future self who will not be able to make choices. The future self is you and also someone you haven\'t met yet.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r -= 5; p.karma += 5; p.addFlag('dementia_advance_plan'); p.setMem('demPlanFired', true) },
  },

  {
    id: 'dem_clarity_window',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('dementia_personal') &&
      G.age >= 74 &&
      !G.mem?.demClarityFired,
    text: 'There are days that are clear. On those days you know exactly where you are and who everyone is and the fog that has become the general condition is simply absent. The clear days are the ones that make the unclear days legible — you can see the distance the disease has put between you and the person who used to be simply you. The clear days are gifts. They are also, in their own way, the hardest ones.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 8; p.addFlag('dementia_clear_days'); p.setMem('demClarityFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WITNESS — WATCHING A PARENT
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'dem_parent_first_signs',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      (G.parents?.mother?.alive || G.parents?.father?.alive) &&
      G.age >= 40 && G.age <= 65 &&
      !G.flags.has('dementia_parent') &&
      !G.mem?.demParentSignsFired,
    text: 'Your mother — or your father — calls you by your sibling\'s name. This has happened before, occasionally, and is not unusual. But then you notice: the story she has already told is told again, beginning from the same place, with the same pauses, as if it is new. You mention this to your sibling. Your sibling says they have noticed too. You do not yet say the word.',
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('dementia_parent'); p.setMem('demParentSignsFired', true) },
  },

  {
    id: 'dem_parent_diagnosis',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('dementia_parent') &&
      !G.mem?.demParentDxFired,
    text: 'The doctor uses the clinical language and then the plain language. The plain language is: this will progress. There is medication that may slow it. There is no treatment that stops it. The parent in the chair next to you is taking this in or is not taking it in — you are not fully sure, and that uncertainty is the first of the new uncertainties. You drive home. You will, in the next months and years, become a kind of parent to your parent. You have not been trained for this.',
    choices: [
      {
        text: 'Take on primary responsibility — you can do this',
        tag: null,
        outcome: 'The responsibility is enormous and you shoulder it. Your own life reorganises around the care. What you give is real. What it costs is also real.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.karma += 10; p.addFlag('dementia_primary_carer'); p.setMem('demParentDxFired', true) },
      },
      {
        text: 'Share it — this has to be a family decision',
        tag: null,
        outcome: 'The family meeting is harder than you expected. The share is uneven in ways that will create friction later. But the burden is distributed.',
        effect: (p) => { p.m -= 7; p.r += 3; p.addFlag('dementia_shared_care'); p.setMem('demParentDxFired', true) },
      },
      {
        text: 'Professional care — the honest assessment of what you can provide',
        tag: null,
        outcome: 'The care facility is chosen carefully. The guilt about it is real and does not mean the decision was wrong.',
        effect: (p) => { p.mo -= 5000; p.m -= 5; p.r += 6; p.addFlag('dementia_care_facility'); p.setMem('demParentDxFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'dem_parent_doesnt_know_you',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('dementia_parent') &&
      G.age >= 48 &&
      !G.mem?.demParentNoKnowFired,
    text: 'Your parent looks at you — you, who have been looked at by this face your entire life — and the look is polite. The look is the look one gives a stranger who seems friendly. Your name is not there. You are not there, in the way that matters. You say who you are. Your parent nods in a way that is not recognition but is doing its best. You leave the room before you cry.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('dementia_parent_forgot_me'); p.setMem('demParentNoKnowFired', true) },
  },

  {
    id: 'dem_parent_late_stage',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('dementia_parent') &&
      G.age >= 55 &&
      !G.mem?.demParentLateFired,
    text: 'Late stage is a different country from early stage. The person in the bed has your parent\'s face and has lost most of what made that face the specific face it was. You hold the hand. The hand is familiar. You tell stories — your parent\'s stories — into the room. Whether the stories are heard is not known. You tell them anyway. This is for you as much as for them, and there is nothing wrong with that.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('dementia_parent_late_stage'); p.setMem('demParentLateFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CROSSCUTTING — AFTER
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'dem_after_loss',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('dementia_parent_late_stage') &&
      (!G.parents?.mother?.alive && !G.parents?.father?.alive) &&
      !G.mem?.demAfterLossFired,
    text: 'The grief after dementia is complicated because the grief already happened — in stages, over years, each time something else was lost. The final death arrives at the end of a long goodbye. It is a relief, which carries its own weight. You are allowed the relief. You had already done the hardest mourning. The person you are mourning now is the person who was there before all of it, the early version, the one who knew your name without being told.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r -= 3; p.addFlag('dementia_grief_resolved'); p.setMem('demAfterLossFired', true) },
  },

]

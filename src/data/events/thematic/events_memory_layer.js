// events_memory_layer.js
// The dream/memory layer: events that "replay" earlier events with new framing.
// Fire at age 45–65, referencing timestamped flags. Pure prose — no choices, no stat swings.
// The memory is not the original event. It is what time has done to it.

export const MEMORY_LAYER_EVENTS = [

  {
    id: 'mem_layer_father_hands',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_parent_father') &&
      G.age >= 48 && G.age <= 62 &&
      !G.mem?.memLayerFatherHands &&
      (G.mem?.lost_parent_fatherYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.lost_parent_fatherYear ?? 0) >= 8,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.lost_parent_fatherYear ?? G.currentYear - 12)
      return `You are doing something ordinary — opening a jar, folding a newspaper — and you notice your own hands. Your father had hands like these. You had not thought about that in years and then it comes back fully, the specific shape of them, the way he held things. He has been dead for ${yearsAgo} years. The memory arrives without warning and without sadness exactly, or not only sadness — something more compound than that.`
    },
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('memLayerFatherHands', true) },
  },

  {
    id: 'mem_layer_mother_voice',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_parent_mother') &&
      G.age >= 46 && G.age <= 63 &&
      !G.mem?.memLayerMotherVoice &&
      (G.mem?.lost_parent_motherYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.lost_parent_motherYear ?? 0) >= 7,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.lost_parent_motherYear ?? G.currentYear - 10)
      return `Someone on the street uses an inflection your mother used — a particular way of ending a sentence, the small vocal lift that meant she was listening. You stop walking. It is nothing, a stranger, but for a second it is not nothing. She has been dead for ${yearsAgo} years and your body has not finished accounting for it.`
    },
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('memLayerMotherVoice', true) },
  },

  {
    id: 'mem_layer_emigration_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 40 && G.age <= 60 &&
      !G.mem?.memLayerEmiSmell &&
      (G.mem?.emigratedYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.emigratedYear ?? 0) >= 10,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.emigratedYear ?? G.currentYear - 15)
      const country = G.character?.country?.name ?? 'home'
      return `A smell returns you to it — something cooking, or the particular quality of light through a window at a certain hour, or a type of rain. ${country}, ${yearsAgo} years ago. The specific place you left, not the abstraction. You are here and you are momentarily also there, and the two places exist at the same time and cannot be reconciled, only held.`
    },
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('memLayerEmiSmell', true) },
  },

  {
    id: 'mem_layer_famine_specific',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('famine_memory') &&
      G.age >= 55 &&
      !G.mem?.memLayerFamineSpecific,
    text: 'A dish you make now — one you make without thinking — you trace it back. The substitutions. The thing you ate because that was what there was. The specific texture of necessity. The dish is not the same dish anymore but the path from there to here is continuous and you know it.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('memLayerFamineSpecific', true) },
  },

  {
    id: 'mem_layer_first_love_revisited',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('first_love_over') &&
      G.age >= 42 && G.age <= 58 &&
      !G.mem?.memLayerFirstLove &&
      (G.mem?.first_love_overYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.first_love_overYear ?? 0) >= 15,
    text: 'You hear a name that is not their name, that sounds like their name, in a crowd, and for half a second your body responds. You were a different person then — the gap between that version of yourself and this one is not nostalgia exactly, more like the photograph of someone you knew well who moved away. You would not go back. But the photograph is real.',
    choices: null,
    effect: (p) => { p.setMem('memLayerFirstLove', true) },
  },

  {
    id: 'mem_layer_widowed_anniversary',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('widowed') &&
      G.age >= 55 &&
      !G.mem?.memLayerWidowed &&
      (G.mem?.partnerDeathYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.partnerDeathYear ?? 0) >= 5,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.partnerDeathYear ?? G.currentYear - 7)
      return `${yearsAgo} years. You find this hard to hold — that it has been that long and also not that long at all. You have grown into the shape of the absence the way a tree grows around a fence post. You are not the same person who stood in that year. You are not sure whether that is the right thing to have become.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('memLayerWidowed', true) },
  },

  {
    id: 'mem_layer_cancer_scare',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('cancer_survivor') &&
      G.age >= 45 && G.age <= 65 &&
      !G.mem?.memLayerCancer &&
      (G.mem?.cancer_survivorYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.cancer_survivorYear ?? 0) >= 5,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.cancer_survivorYear ?? G.currentYear - 7)
      return `At a routine appointment — a different complaint, nothing serious — the doctor mentions something unremarkable and your body has an unreasonable response to it. The fear from ${yearsAgo} years ago does not live in your mind but in your stomach, apparently. The appointment ends fine. The drive home takes longer than usual.`
    },
    choices: null,
    effect: (p) => { p.h -= 2; p.r += 4; p.setMem('memLayerCancer', true) },
  },

  {
    id: 'mem_layer_childhood_border',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('refugee_status') || G.flags.has('displaced_childhood')) &&
      G.age >= 40 && G.age <= 58 &&
      !G.mem?.memLayerBorder,
    text: 'In a queue — bank, airport, it does not matter — you notice the particular way you hold your documents. Prepared. Alert. The queue is routine and you know it and your hands do not know it. The body remembers the queue where it mattered. The body keeps its own records.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('memLayerBorder', true) },
  },

  {
    id: 'mem_layer_boarding_school_night',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('boarding_school') &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.memLayerBoarding,
    text: 'Your own child or a child nearby wakes in the night, disoriented. You go in and your body already knows what to do — the particular calm that comes from having been the one who had to manage the night alone, for years, and learned to do it. The boarding school prepared you for nothing you intended to be prepared for and several things you needed.',
    choices: null,
    effect: (p) => { p.setMem('memLayerBoarding', true) },
  },

  {
    id: 'mem_layer_failure_returns',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('knows_failure') &&
      G.age >= 44 && G.age <= 60 &&
      !G.mem?.memLayerFailure &&
      (G.mem?.knows_failureYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.knows_failureYear ?? 0) >= 8,
    text: 'You pass the building. Different name on the door now, or different tenant, or torn down — the specific form depends on how long it has been. You had an idea in there. The idea failed. You know now that the failure was instructive and you believe this and it is also still the failure. The two things are not mutually exclusive and never were.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('memLayerFailure', true) },
  },

  {
    id: 'mem_layer_lost_friend_anniversary',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_friend') &&
      G.age >= 40 &&
      !G.mem?.memLayerFriend &&
      (G.mem?.lost_friendYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.lost_friendYear ?? 0) >= 4,
    text: (G) => {
      const yearsAgo = G.currentYear - (G.mem?.lost_friendYear ?? G.currentYear - 6)
      return `You think of something you would have said to them. A piece of news, an observation, a joke that is their specific type of joke. The reflex still fires — the impulse to tell them — before the reason it cannot reaches you. ${yearsAgo} years. The reflex takes longer to learn than the fact does.`
    },
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('memLayerFriend', true) },
  },

  {
    id: 'mem_layer_divorce_settlement',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('divorced') &&
      G.age >= 42 && G.age <= 60 &&
      !G.mem?.memLayerDivorce &&
      (G.mem?.divorcedYear ?? 0) > 0 &&
      G.currentYear - (G.mem?.divorcedYear ?? 0) >= 6,
    text: 'You divide a bill without thinking — old reflex, adjusted. The person you were married to would have handled this. You learned to handle it. The learning is not the loss but it contains the loss, the way a scar contains the cut.',
    choices: null,
    effect: (p) => { p.setMem('memLayerDivorce', true) },
  },

  {
    id: 'mem_layer_war_childhood_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('war_childhood') &&
      G.age >= 38 && G.age <= 58 &&
      !G.mem?.memLayerWar,
    text: 'A car backfires three streets over. You are not afraid — you understand what the sound is — but there is a half-second before you understand it where your body does something your mind does not authorise. The body has its own timeline. The war was in childhood and is also here, in that half-second, contained but present.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('memLayerWar', true) },
  },

  {
    id: 'mem_layer_art_in_drawer',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('art_in_drawer') &&
      G.age >= 55 &&
      !G.mem?.memLayerArtDrawer,
    text: 'You find something you made. A notebook, a sketch, a folder. The quality of it surprises you — it is better than you remembered or worse, depending on what you were expecting, but either way it exists. You made it. It sat in the drawer for years and it is still what it is. You are not sure what to do with this information.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.setMem('memLayerArtDrawer', true) },
  },

]

// events_sonder_37.js
// Contemplative layer — 30 events.
// Themes: the quality of certain silences, what work teaches the hands,
// the newspaper as archaeological layer, illness in someone else's body,
// the specific light of childhood, what you didn't say when you could.

export const EVENTS_SONDER_37 = [

  {
    id: 'sonder_37_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37a,
    text: 'There is the silence before someone says the thing they have been building to for the last several sentences. You recognize it now before it arrives. The quality of the pause is different from other pauses. Something is about to become different from what it has been.',
    choices: null,
    effect: (p) => { p.setMem('s37a', true) },
  },

  {
    id: 'sonder_37_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37b,
    text: 'The hands of someone who has done the same work for thirty years are not the hands they started with. The work is in the hands: the specific callus, the lean, the way they hold a thing. You know what someone does for a living before they tell you if you know how to look at the hands.',
    choices: null,
    effect: (p) => { p.setMem('s37b', true) },
  },

  {
    id: 'sonder_37_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s37c,
    text: 'An old newspaper: the advertisements for things that no longer exist, the headlines that were the crisis at the time and are now a footnote or are not in any index, the crossword someone filled in in pencil. The newspaper is an archaeological layer. You hold it and it is simultaneously very specific — this particular Tuesday — and very distant.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37c', true) },
  },

  {
    id: 'sonder_37_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37d,
    text: 'The illness is in someone you know and not in you and this changes the texture of the day in a way that is difficult to describe. You are healthy. You are fine. The fineness has a different quality now that illness is nearby. You notice the body you are in differently when it is doing the things it is still capable of.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37d', true) },
  },

  {
    id: 'sonder_37_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s37e,
    text: 'There is a specific quality to the light of the place where you were a child that other places do not have. Not better or worse. Specific. The angle of the afternoon sun on that wall. The particular way the shadows moved through that room. You cannot reproduce it because it was not the light itself but the light in relation to everything else that was there at that time.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37e', true) },
  },

  {
    id: 'sonder_37_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37f,
    text: 'The thing you didn\'t say when you could have said it has a specific weight now that the opportunity is closed. Not necessarily regret. Something more precise than regret: the location of the exact moment, the person across the table, what you were about to say and didn\'t. You can locate it in your memory the way you locate a specific street.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37f', true) },
  },

  {
    id: 'sonder_37_g',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37g,
    text: 'The plant in the window that you have kept alive for three years has died. You don\'t know why. You have done nothing differently. The plant and you have been through the same winters and summers and the plant has not survived whatever this winter was. You are disproportionately sad about this and you know you are disproportionate and you are sad anyway.',
    choices: null,
    effect: (p) => { p.m -= 1; p.setMem('s37g', true) },
  },

  {
    id: 'sonder_37_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37h,
    text: 'The smell of rain on dry earth. The name for it is petrichor, which is a word most people learned much later than the smell. The smell was there before the word. You know it as a bodily thing, as something the nose knows before the brain categorizes it. It means something different in different climates: the specific relief of the first rain of the dry season is not the same smell as the smell of rain on a July sidewalk.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37h', true) },
  },

  {
    id: 'sonder_37_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37i,
    text: 'You have been in the same room as a famous person. You remember the room and the person and what the room was like. What you remember most is the ordinariness of their presence — the specific fact that they were physically there, occupying the same cubic metres, making the same small movements as anyone else. You had expected something to register differently. The body registers nothing differently.',
    choices: null,
    effect: (p) => { p.setMem('s37i', true) },
  },

  {
    id: 'sonder_37_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37j,
    text: 'The friend from a long time ago whose name comes up and you realise you have not thought of them in years. The realisation includes the slightly guilty calculation of whether that means something about the friendship. It doesn\'t mean anything specific. Attention moves. The memory is still available — specific moments, the sound of their voice — just not visited.',
    choices: null,
    effect: (p) => { p.setMem('s37j', true) },
  },

  {
    id: 'sonder_37_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s37k,
    text: 'The young doctor is younger than your children. This is not the first time you have noticed this but it is still the fact. They are competent. They know things you don\'t know. The fact of their age is not relevant to their competence. You notice it anyway. This is what medicine looks like from the far side of the scale.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37k', true) },
  },

  {
    id: 'sonder_37_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37l,
    text: 'You have been walking the same route for long enough that the walk is not experienced as walking. Your legs do it. Your attention is elsewhere. When someone asks how long the walk takes you genuinely don\'t know — you know when you arrive but not how long you were traveling. The walk has become part of the day\'s background.',
    choices: null,
    effect: (p) => { p.setMem('s37l', true) },
  },

  {
    id: 'sonder_37_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37m,
    text: 'The water from this particular source tastes specific. You know it when you come back to it after time away. The water in the new place is fine, is adequate, is what water is. This water is the water of here, which is a thing you did not know was a category until you had left and come back.',
    choices: null,
    effect: (p) => { p.setMem('s37m', true) },
  },

  {
    id: 'sonder_37_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37n,
    text: 'The person crying on the train. Not loudly — trying to be small about it. No one is looking at them, which is the urban compact: we will not see your grief in public and you will not have to perform composure for us. The grief is there. The non-looking is also there. Both are correct.',
    choices: null,
    effect: (p) => { p.setMem('s37n', true) },
  },

  {
    id: 'sonder_37_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37o,
    text: 'You have kept a piece of paper for years without being able to articulate why. The paper has something on it — a calculation, an address, a few words in handwriting — that has seemed important each time you have been about to throw it away. You have not thrown it away. It is in the drawer with the other things you have not thrown away.',
    choices: null,
    effect: (p) => { p.setMem('s37o', true) },
  },

  {
    id: 'sonder_37_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37p,
    text: 'A song playing in a shop triggers something that takes several seconds to identify. The place it is from. The year it is from. The specific feeling of that year is available briefly — not the events of the year but the texture of being in that year, the emotional climate of it — and then the song ends and the texture goes.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37p', true) },
  },

  {
    id: 'sonder_37_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37q,
    text: 'The choice that seemed impossible at the time was made, and the impossible turned out to be possible, and you are living the result. This is the thing about impossible choices: some of them were possible all along and some of them required the change of a circumstance you couldn\'t have predicted. You can\'t tell from inside the choice which kind it is.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37q', true) },
  },

  {
    id: 'sonder_37_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s37r,
    text: 'You learned to swim or you did not learn to swim and in one version you still remember the day it became possible — the specific moment the body understood buoyancy and acted on it before the mind did. In the other version you remember the edge of the water and the adults in the water and the gap between you and them.',
    choices: null,
    effect: (p) => { p.setMem('s37r', true) },
  },

  {
    id: 'sonder_37_s',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s37s,
    text: 'The things you were going to do differently — the specific list of them, held in your thirties as a corrective against your parents — have been done partly differently and partly the same. You understand now that some of the same was what you wanted after all, and some of it was what the structure of the situation produced regardless of what you wanted.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37s', true) },
  },

  {
    id: 'sonder_37_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37t,
    text: 'The ceremony is long and you are in the right clothes and you are paying the correct amount of attention. Underneath the attention you are thinking about something else entirely. You have been present in this way before — the body in the ceremony, the mind elsewhere — and the ceremony proceeded without this being visible. You wonder briefly whether everyone else is also partially elsewhere.',
    choices: null,
    effect: (p) => { p.setMem('s37t', true) },
  },

  {
    id: 'sonder_37_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37u,
    text: 'The apology you received that was not enough and you accepted anyway because the alternative was to carry the not-enough forever in a confrontation that would also not resolve into enough. You took the insufficient apology and put it in the place where insufficient things go. The place fills slowly and is rarely emptied.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37u', true) },
  },

  {
    id: 'sonder_37_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37v,
    text: 'The specific pleasure of a meal you cooked well: not the eating but the state just before the eating, when the thing you were making has turned into the thing you intended and the kitchen has the smell of the effort. This particular pleasure is available without requiring anyone else.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37v', true) },
  },

  {
    id: 'sonder_37_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37w,
    text: 'The power went out during something you cannot replace — a recording, a transmission, a moment — and the gap where the thing was is now exactly the shape of the thing. You know what was there. You know it is not there. The gap is specific.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37w', true) },
  },

  {
    id: 'sonder_37_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s37x,
    text: 'The patience you have now with things that used to be intolerable. The queue that does not disturb you. The delayed flight that is simply the delayed flight. You do not know if this is wisdom or the depletion of the energy that was previously spent on intolerance. The result is the same either way: the queue is the queue.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37x', true) },
  },

  {
    id: 'sonder_37_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37y,
    text: 'Two strangers at the next table are having an argument that you can hear but are not listening to. The argument is about something you cannot identify. What you can identify: the register of the argument, which is an argument that has been had before and will be had again. You have had this argument with someone else. The specific content differs. The register is the same.',
    choices: null,
    effect: (p) => { p.setMem('s37y', true) },
  },

  {
    id: 'sonder_37_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37z,
    text: 'There is a version of this decision that you made and a version you did not make. You cannot know what the not-made version looks like. The made version is visible as your life. The not-made version is an absence with no content. You keep arriving at the point of trying to imagine the content and finding nothing there, which may be accurate or may be a failure of imagination.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s37z', true) },
  },

  {
    id: 'sonder_37_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s37aa,
    text: 'The game had rules that were invented in the moment and enforced inconsistently and revised as needed and would be unrecognizable to anyone who had not played this particular version with these particular children in this particular place. The game existed only in this group and only while this group played it and does not exist anymore.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37aa', true) },
  },

  {
    id: 'sonder_37_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s37ab,
    text: 'The hour in the afternoon when the energy drops and the mind goes sideways into something not quite thought. Not sleep. The body still in the chair. The attention somewhere between the ceiling and the middle distance. This hour visits most days. You have learned not to fight it. You wait it out and then return.',
    choices: null,
    effect: (p) => { p.setMem('s37ab', true) },
  },

  {
    id: 'sonder_37_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s37ac,
    text: 'The first time you were in a room where everyone was older than you. The specific feeling of being the youngest person in a room: the watching-before-speaking, the sense that the conversation has a history you don\'t have access to, the calculation of when to enter. You eventually learned to enter. The calculation became faster.',
    choices: null,
    effect: (p) => { p.setMem('s37ac', true) },
  },

  {
    id: 'sonder_37_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s37ad,
    text: 'The garden in November: the things that died back, the things that will return, the things you are not sure about. The gardener\'s knowledge is different from other knowledge: it requires the winter to remain visible as what it is — not failure but the condition for what comes next. You know this. The knowing helps and does not help.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s37ad', true) },
  },

]

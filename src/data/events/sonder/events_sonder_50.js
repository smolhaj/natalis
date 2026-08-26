// events_sonder_50.js — contemplative layer, weight 2, all mem-gated

import { place } from './_sonderGuards.js'

export const EVENTS_SONDER_50 = [

  {
    id: 'sonder_50_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s50a,
    text: 'You put the coat on and immediately notice it feels different — lighter or heavier than you expected, the way a season feels before you\'ve adjusted to it. For a few steps you are slightly off-balance. Then you adjust. The coat becomes the coat again.',
    choices: null,
    effect: (p) => { p.setMem('s50a', true) },
  },

  {
    id: 'sonder_50_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s50b,
    text: 'You have started using the phrase "in those days" without noticing it. The phrase separates the time before from the time now. The time before is large now. The phrase comes naturally in a way it didn\'t when the time before was small.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s50b', true) },
  },

{
    id: 'sonder_50_d',
    phase: 'adolescence',
    weight: 2,
    when: (G) => place.wentToSchool(G) && (!G.mem?.s50d),
    text: 'A subject at school seems to have nothing to do with you and then, one afternoon, seems to have been about you all along. You don\'t know what changed. The material didn\'t change. You are not sure if something in the material reached you or if something in you reached the material.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s50d', true) },
  },

{
    id: 'sonder_50_f',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s50f,
    text: 'Older children play a game you are not yet allowed to play. You watch it from a distance that is not very far but is culturally significant. One day you will be old enough. The waiting for being old enough is itself a childhood texture — specific, slightly itchy.',
    choices: null,
    effect: (p) => { p.setMem('s50f', true) },
  },

{
    id: 'sonder_50_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s50h,
    text: 'You make a decision quickly and it turns out to be the right decision. You are not sure whether you made it quickly because you had enough information to be confident or because you were young enough not to have the information to be worried. The distinction matters and you cannot recover it from the outcome.',
    choices: null,
    effect: (p) => { p.setMem('s50h', true) },
  },

  {
    id: 'sonder_50_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => place.worksInOffice(G) && (!G.mem?.s50i),
    text: 'Someone never speaks in meetings and then, when they do, says the thing everyone else was circling. The observation is exact. The meeting shifts. They go back to not speaking. You are not sure whether they prefer the silence or have simply learned that speaking once with precision costs less than speaking often with less.',
    choices: null,
    effect: (p) => { p.setMem('s50i', true) },
  },

  {
    id: 'sonder_50_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s50j,
    text: 'Someone younger asks your advice, listens carefully, and does not take it. You watch them make the decision you would not have made. In some cases you turn out to have been wrong. In some cases they turn out to have been wrong. The proportion is not so different from advice-taking as to make either approach obviously better.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s50j', true) },
  },

  {
    id: 'sonder_50_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s50k,
    text: 'This household has a rule that exists nowhere else. Not a written rule — a fact about how this family works that you absorb before you can articulate it. You will carry it into the world as a default and be briefly confused when other households do not have the same fact. Later you will understand that every household has its own version of this rule.',
    choices: null,
    effect: (p) => { p.setMem('s50k', true) },
  },

  {
    id: 'sonder_50_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s50l,
    text: 'Another language has one word for something yours needs a sentence to say. You learn it and use it and feel the small satisfaction of having named a thing that previously required a sentence. The word is a gift from a language you do not otherwise speak.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s50l', true) },
  },

{
    id: 'sonder_50_n',
    phase: 'late_life',
    weight: 2,
    when: (G) => place.hasTV(G) && (!G.mem?.s50n),
    text: 'You remember a programme from childhood clearly and cannot verify any of it. You remember it with specificity — the colours, a phrase, the feeling of watching it in a particular room. No record of it seems to exist. Either the memory is composed, or it existed and did not survive, or it exists and you are searching for it incorrectly. The memory is equally clear in all three versions.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s50n', true) },
  },

  {
    id: 'sonder_50_o',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s50o,
    text: 'You believe something at seventeen that you will believe less completely at twenty-five and barely at forty. Right now it is not a belief — it is a fact about the world. The confidence of seventeen is not ignorance exactly. It is the not-yet-complication of a world that has not yet complicated enough of your assumptions to teach you that assumptions complicate.',
    choices: null,
    effect: (p) => { p.setMem('s50o', true) },
  },

  {
    id: 'sonder_50_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s50p,
    text: 'An errand takes twice as long as planned because of a person you know, then a second person you know, then a queue at the place you needed to reach. You arrive home later than you expected with nothing that could not have waited. The afternoon is gone. The afternoon was also two conversations you were glad to have had.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s50p', true) },
  },

  {
    id: 'sonder_50_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s50q,
    text: 'A friendship did not survive the move. Not a falling out — a drifting that was so slow you could not identify the point at which it happened. You think of this person with warmth. The warmth does not require contact to be real. The contact has simply stopped.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s50q', true) },
  },

  {
    id: 'sonder_50_r',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s50r,
    text: 'A bird is outside the window every morning at the same time. You began to notice it without meaning to. You are not sure how long it has been there before you noticed. Now you notice it every morning. Its specific call is now part of the morning before you are properly awake. When it stops you will notice that too.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s50r', true) },
  },

  {
    id: 'sonder_50_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s50s,
    text: 'An apology arrived too late to change anything and arrived anyway. You did not expect it. The apology was accurate — it named what happened correctly. The fact that it arrived does something, even though it arrives into a situation that is already resolved, after a fashion, through time rather than through resolution.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s50s', true) },
  },

  {
    id: 'sonder_50_t',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s50t,
    text: 'One adult frightens you, not by doing anything frightening but by being a kind of person you have not encountered before. A register, a way of looking, a manner that seems correct to others but reads to you as wrong in a way you cannot name. Children often know before they can explain.',
    choices: null,
    effect: (p) => { p.setMem('s50t', true) },
  },

  {
    id: 'sonder_50_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s50u,
    text: 'Work you did that no one saw. Not secret — simply not the kind of work that becomes visible. The infrastructure that other people\'s visible work runs on. You built it without recognition and it worked, which is the correct outcome and not quite satisfying.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s50u', true) },
  },

  {
    id: 'sonder_50_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s50v,
    text: 'A task that had been undone for a long time is done. Not the task itself — the state of having completed it. The shelf assembled, the letter replied to, the call made. Something was in the air before; now it is resolved. You are aware that the pleasure is disproportionate to the difficulty of the task. You do not mind.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s50v', true) },
  },

{
    id: 'sonder_50_x',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s50x,
    text: 'Someone you love disappoints you in a way they do not know they have. The event is small. The shift is large. Something about the world was constructed around a certain idea of this person. The construction is now different. You do not say anything. You absorb the difference and adjust the construction.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s50x', true) },
  },

  {
    id: 'sonder_50_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => place.hasCafe(G) && (!G.mem?.s50y),
    text: 'A place you went to for years has closed. Not a significant restaurant — a practical one, a reliable one, one that you did not appreciate as a specific place until it stopped being there. The specific soup. The specific table by the window. The specific price that you knew. The building is now something else.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s50y', true) },
  },

  {
    id: 'sonder_50_z',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s50z,
    text: 'You help someone with something that is difficult for them and easy for you. The ease is invisible to them. What they see is the help. What you feel is the asymmetry — not in a superior way, in a wondering way. The difficulty that is easy from one angle and hard from another. You make a note to remember this the next time you need help with something that is easy for someone else.',
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s50z', true) },
  },

{
    id: 'sonder_50_ab',
    phase: 'childhood',
    weight: 2,
    when: (G) => place.hasTV(G) && (!G.mem?.s50ab),
    text: 'Being ill as a child had its own weather — the particular texture of days that are outside normal days. The permission to lie on the sofa. The different light. The television at unusual hours. The body that is unwell and also in a container of slight exemption from the usual requirements. You are not glad to be ill but you notice the register of it.',
    choices: null,
    effect: (p) => { p.setMem('s50ab', true) },
  },

{
    id: 'sonder_50_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s50ad,
    text: 'Someone was kind to you at an important moment and you did not thank them enough, because you did not yet know how important the moment was. The person who offered the help understood what you were in the middle of better than you did. You carry their name with a kind of gratitude. Whether you have ever told them directly, you are not certain.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 2; p.setMem('s50ad', true) },
  },

]

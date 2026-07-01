// events_sonder_52.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_52 = [

  {
    id: 'sonder_52_a',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s52a,
    text: 'The smell of a particular room that is gone now. Not the house — the smell of that specific room, which was the particular combination of the wood and the light and whatever they used to clean the floor and the season it was. You have not thought about it in years. Something in the air of a day brings it back entirely, without warning, as a full sensory re-entry into a room that no longer exists in that form.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s52a', true) },
  },

  {
    id: 'sonder_52_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52b,
    text: 'The first time you understood how much you did not know. Not the general awareness of ignorance — everyone has that — but a specific encounter with the depth of a field you had thought you understood reasonably well. A conversation with someone who knew it properly. The gap between your model of the subject and the actual subject, visible suddenly as a gap. The encounter is humbling in the precise sense: it brings you closer to the ground.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('s52b', true) },
  },

  {
    id: 'sonder_52_c',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52c,
    text: 'Watching someone else become the version of the person you used to be: the new arrival, the youngest one in the room, the one who doesn\'t know how things work here yet. You were that person. The gap between being it and watching it is not as large as you assumed it would be. You still remember what it felt like to be the one who didn\'t know. The memory sits alongside the current position without quite integrating.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52c', true) },
  },

  {
    id: 'sonder_52_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52d,
    text: 'The conversation you keep having that is, at its core, the same conversation it has always been. Different year, different surface subject, but underneath: the same question, the same difficulty between the same people, the same unresolved thing surfacing through different occasions. You have had this conversation forty times. You recognize it by the third sentence. The recognition does not make it easier to have.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52d', true) },
  },

  {
    id: 'sonder_52_e',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s52e,
    text: 'The year that has a different texture from the years on either side of it. You will not be able to account for this. It is not the most eventful year. It is simply the year that feels, in memory, like a different country from the adjacent years — the air of it is different, the quality of the light in that specific period of your life, the self you were in it. You carry a map of your own years with different territories marked.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s52e', true) },
  },

  {
    id: 'sonder_52_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52f,
    text: 'The thing you thought you would grow out of that you did not grow out of. The assumption was that maturity would change this. Maturity arrived. The thing is still present, in slightly different form, wearing slightly different clothes. You have stopped waiting for the growing out of it and started making arrangements with it instead. The arrangements are not worse than the growing out would have been.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52f', true) },
  },

  {
    id: 'sonder_52_g',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52g,
    text: 'The money you did not have. Not the dramatic version — not destitution — but the specific texture of being young and not having enough: the calculation at the checkout, the invitation you declined, the thing you wanted that you bought a month later when the calculation had shifted. The not-having was not permanent. It was permanent enough to shape how you think about money, which is more permanent than the not-having itself.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52g', true) },
  },

  {
    id: 'sonder_52_h',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s52h,
    text: 'The way grown-ups talked around certain subjects in your presence. You noticed. You did not have the vocabulary for what you noticed, but you felt the edges of it: the conversation that stopped when you entered, the word that was changed, the look between adults that carried information not intended for you. Children absorb the shape of what is withheld. The shape stays even when the content is eventually provided.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s52h', true) },
  },

  {
    id: 'sonder_52_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52i,
    text: 'Being able to answer questions that you could not have answered at twenty-five. Not factual questions — the questions that require having lived through something before they can be answered. A younger person asks. You can answer. The answer is available to you because of the specific passage of time that produced you. The passage is irreversible. The answer is a byproduct of what was irreversible about it.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s52i', true) },
  },

  {
    id: 'sonder_52_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52j,
    text: 'The work that did not go anywhere. Not a failure exactly — no catastrophe, no clear moment of ending. The work simply stopped being worked on, was set aside, accumulated layers of other things on top of it. At some point it passed from being paused to being finished without a finishing event. The work that did not go anywhere is one of the categories your life contains, alongside the work that did.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52j', true) },
  },

  {
    id: 'sonder_52_k',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s52k,
    text: 'The group of friends that defined a period and then dissolved. Not through any rupture — through the ordinary dispersal: different schools, different cities, the slow reduction in contact that ends in the occasional message and then the occasional liking of a photograph. The group that was the entire social world for three years. It becomes the kind of past that is warm and sealed and not quite revisitable. You would not want to reopen it. You also carry it.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52k', true) },
  },

  {
    id: 'sonder_52_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52l,
    text: 'The first time you were responsible for someone else\'s wellbeing. Not temporarily — over time. The experience of having another person\'s welfare depend on decisions you make. The decisions are ordinary: where to go, what to spend, what to say. The ordinary decisions become different when they concern not only you. You are changed by this in ways you only partially understand while it is happening.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s52l', true) },
  },

  {
    id: 'sonder_52_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52m,
    text: 'The habit that has lasted forty years. You no longer remember acquiring it. It is simply what you do at this time or in this context, automatic, prior to intention. It may be completely neutral — the cup on the left side, the window you always open first, the particular order you do things in the morning. The habit is older than most of your relationships. It will outlast some of them.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52m', true) },
  },

  {
    id: 'sonder_52_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s52n,
    text: 'The rule you did not understand the reason for. You were given the rule without the reason. This was the practice — some reasons were too complex to explain, some were lost, some were never examined even by the people who enforced them. You followed the rule. Eventually you understood the reason, or you understood that there was no reason. Both outcomes were possible. Both were informative about the rule.',
    choices: null,
    effect: (p) => { p.setMem('s52n', true) },
  },

  {
    id: 'sonder_52_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52o,
    text: 'The project that took longer than expected but is now finished. Looking at it now, from the finished side: it took three years instead of one, it changed shape during, the end is not exactly what the beginning imagined. You are glad it is done and you are aware that what you are glad it is done with is not quite the thing you started. The finished thing and the original intention are in the same category but not the same object.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s52o', true) },
  },

  {
    id: 'sonder_52_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52p,
    text: 'The city you lived in for two or three years that still feels partly yours. You left for reasons that made sense at the time. The city continued without you. You know its particular grid and its particular light and the specific neighbourhood that became yours and the café and the street that had the good market. Returning now you navigate it faster than people who have lived there for ten years. The city is not yours and you know it better than the people for whom it is.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52p', true) },
  },

  {
    id: 'sonder_52_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52q,
    text: 'The slowing down that arrives before you name it as slowing down. The recovery that takes a day longer. The stairs that are taken at a different pace. The schedule you rearrange, without consciously rearranging it, toward shorter days. You are not ill. You are not struggling. You are at a different speed than you were, and the adjustment is invisible because it is gradual and internal. You are the last to name it.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52q', true) },
  },

  {
    id: 'sonder_52_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52r,
    text: 'The skill you have that comes from somewhere you do not remember learning it. Not a formal skill — something subtler: reading a room, knowing when to wait, the specific ability to do a thing that you have simply always been able to do. Asked how you know, you cannot say. The knowledge predates your account of it. It is in you from before you were paying attention to what went in.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s52r', true) },
  },

  {
    id: 'sonder_52_s',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s52s,
    text: 'The music that was the soundtrack to a particular summer. Not a great summer necessarily — simply a specific one that had a specific song attached to it by the radio and the frequency of encounter. The song was everywhere for three months and then was gone. It comes on now and returns not the music but the air of that summer: the specific quality of being that age in that season with those particular preoccupations. Music retrieves the texture, not the event.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52s', true) },
  },

  {
    id: 'sonder_52_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52t,
    text: 'The person you called when something happened. Not necessarily the person you were closest to in other ways — the specific person whose response to news was the response you needed. Good news and bad news both. The call or the message. The knowledge that this person would receive what you said in the right way. The relationship was partly constituted by this: the fact of being that person for each other.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s52t', true) },
  },

  {
    id: 'sonder_52_u',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52u,
    text: 'The word that has changed meaning. A word you have used for fifty years that now means something different from what it meant when you acquired it: a word whose political valence has reversed, a word whose technology context has shifted, a word whose connotations changed with a decade and left the word stranded. You use the old meaning sometimes and have to correct yourself. The language you think in is slightly different from the language that surrounds you now.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52u', true) },
  },

  {
    id: 'sonder_52_v',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s52v,
    text: 'The annual ritual that felt permanent while it was happening. Every year the same thing at the same time: the gathering, the particular food, the particular order of events, the particular things that were always said. While it was happening you assumed it would always happen. Then it stopped — a death, a dispersal, a change in what the family could manage — and the permanence was revealed to have been a long repetition that had an end.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52v', true) },
  },

  {
    id: 'sonder_52_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52w,
    text: 'The conversation where you understood that your child was wiser than you about something. Not a factual thing — a thing about people, or how situations work, or what matters. The understanding arrived before you had prepared for it. You updated your model of who they are. The updating means acknowledging that the person you are responsible for has become a person who has things to teach you. This happens earlier than parents expect.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s52w', true) },
  },

  {
    id: 'sonder_52_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52x,
    text: 'The fear that you were making the wrong choice. Not a crisis — the ordinary persistent fear that attaches to decisions that matter and cannot be reversed immediately. The job, the city, the person, the direction. The fear was present even when the direction was correct. In retrospect the fear was not a reliable signal about the quality of the choice; it was a reliable signal about the fact that the choice was real.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s52x', true) },
  },

  {
    id: 'sonder_52_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52y,
    text: 'The reduction in the number of people who were there. Not deaths only — dispersals, estrangements, the ordinary drift of a life that takes people out of contact range. The number of people who share the specific memory of a specific period of your life gets smaller each year. The memory remains in you, but the community of witnesses shrinks. Eventually you are the only one who remembers it in the way you remember it.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s52y', true) },
  },

  {
    id: 'sonder_52_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52z,
    text: 'The meal that cannot be replicated. You have tried. The recipe exists, or you have reconstructed it. The ingredients are available. The result is close and not the same, and the gap between close and the same is not a gap in technique. It is a gap in context: the meal was not only the food. It was the specific table and the specific people and the specific moment in your lives when you were all at that table together. The thing that made it what it was is not available for recreation.',
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 2; p.setMem('s52z', true) },
  },

  {
    id: 'sonder_52_aa',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s52aa,
    text: 'The book that reorganized something. Not necessarily a great book by any external measure. The book that arrived at the right moment and rearranged the furniture of a question you were carrying. Before the book and after the book you think about the question differently. The rearrangement was produced by the encounter between the book and the particular moment you were in when you read it. The book alone would not have produced it.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s52aa', true) },
  },

  {
    id: 'sonder_52_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s52ab,
    text: 'The letter you did not send. It was written, or nearly written, or composed entirely in your head. The sending would have changed something and you decided not to send it, or you lost your nerve, or the moment passed. You do not regret not sending it, exactly. You carry it as one of the paths that was available and was not taken, a road that branches off from where you actually went and leads somewhere you did not go.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52ab', true) },
  },

  {
    id: 'sonder_52_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s52ac,
    text: 'The thing that hurt that you can now look at plainly. Not that it no longer hurts — it still does, or it does when you look at it directly. But the looking is available now in a way it was not for a long time. You can describe it without the description taking you under. The distance is not indifference; it is something more like the body\'s integration of an old injury: still there, no longer acute, load-bearing in different ways now.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 2; p.setMem('s52ac', true) },
  },

  {
    id: 'sonder_52_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s52ad,
    text: 'The version of yourself in other people\'s memories. Not what they think of you now — the frozen version in memories of specific moments: the person you were at twenty-two in the memory of someone who knew you then, the person you were at that particular dinner in the memory of the people at that table. You have updated. The memory has not. You exist in the past tense in other people\'s recollections of you, still doing the thing you did, still being who you were, unrevised.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s52ad', true) },
  },

]

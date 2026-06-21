// events_celebrity.js — Celebrity / fame spiral arc
//
// For characters who reach significant fame. Not the generic fame_karma events,
// but the specific texture of public life: the parasocial relationship, the
// media apparatus, the loss of private self, the spiral, and what comes after.
//
// Gates on fame stat thresholds and existing fame-producing flags.

export const CELEBRITY_EVENTS = [

  {
    id: 'cel_the_public_self',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.fame >= 40 &&
      !G.mem?.celPublicSelfFired,
    text: 'There is a version of you that exists in the world and that you did not exactly create. It was made from interviews, photographs, selected moments, the things other people said about you when you were not there. The version is not entirely false. It is the public self — partial, permanent, searchable. When you meet people now, you can see them briefly checking you against the version. You are never quite the version. The version is never quite you.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('celebrity_public_self'); p.setMem('celPublicSelfFired', true) },
  },

  {
    id: 'cel_parasocial',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.fame >= 50 &&
      G.flags.has('celebrity_public_self') &&
      !G.mem?.celParasocialFired,
    text: (G) => {
      const yr = G.currentYear ?? 2010
      if (yr >= 2010) return 'The messages arrive in volume. People you have never met describe, in very specific terms, the effect you have had on their lives. The effect is real — you did the thing, they experienced the thing. But the relationship they describe is not one you are in. They know the public self. What they feel for the public self is genuine. You are grateful and also — there is no other word for it — lonely in a specific way that the messages make more acute.'
      return 'The fan letters come in bags. Some are moving, some are unnerving, and all of them are addressed to a person who is a partial version of who you are. The post office has been notified. You do not read all of them. The ones you do read stay with you.'
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.s += 4; p.addFlag('celebrity_parasocial'); p.setMem('celParasocialFired', true) },
  },

  {
    id: 'cel_media_scrutiny',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.fame >= 55 &&
      !G.mem?.celMediaFired,
    text: (G) => {
      const yr = G.currentYear ?? 2005
      if (yr >= 2005) return 'The article appears. The framing is not malicious — just wrong in the specific way that public narratives about people are wrong: confident about the interior of a life from the exterior of it. The comment section beneath it contains opinions about your character, your decisions, and the life you lead, held by people who do not know you. You close the tab. You open it again. You close it again. You learn not to read the comment section and then read it anyway.'
      return 'The profile runs in the magazine. The journalist was in your life for three days. The version of those three days that appears in print is accurate in detail and wrong in feeling — the arrangement of true things into a shape that serves the story rather than the life.'
    },
    choices: [
      {
        text: 'Respond — correct the record',
        tag: null,
        outcome: 'The response creates a second news cycle. You learn that correcting the record feeds the machinery that produced the record.',
        effect: (p) => { p.m -= 5; p.fame += 3; p.addFlag('celebrity_media_friction'); p.setMem('celMediaFired', true) },
      },
      {
        text: 'Let it go — engaging makes it worse',
        tag: null,
        outcome: 'The article is replaced by the next article. The things it said settle into the public record without rebuttal. This is its own cost.',
        effect: (p) => { p.m -= 8; p.r += 4; p.setMem('celMediaFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cel_the_spiral',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.fame >= 60 &&
      G.flags.has('celebrity_parasocial') &&
      (G.stats?.happiness ?? 60) < 45 &&
      !G.mem?.celSpiralFired,
    text: 'The fame and the unhappiness coexist in a way that confuses everyone including you. The narrative says this should be enough: the recognition, the money, the access, the room full of people who want to be near you. The narrative is not equipped to explain the specific emptiness of coming home from the room to an apartment that does not know you are significant. You begin to manage the emptiness in ways that are not sustainable.',
    choices: [
      {
        text: 'Get help — the emptiness is something that can be addressed',
        tag: null,
        outcome: 'The therapist has worked with people in this position before. The work is slow. The recognition that fame is neither the problem nor the solution is arrived at over months.',
        effect: (p) => { p.m += 6; p.h += 3; p.addFlag('celebrity_sought_help'); p.setMem('celSpiralFired', true) },
      },
      {
        text: 'Fill it — with something, anything',
        tag: null,
        outcome: 'The filling works in the short term. The short term keeps moving. The things used for filling accumulate into a pattern.',
        effect: (p) => { p.m -= 8; p.h -= 8; p.addFlag('celebrity_spiral'); p.setMem('celSpiralFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cel_cancellation',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.fame >= 50 &&
      G.currentYear >= 2012 &&
      (G.flags.has('celebrity_media_friction') || G.flags.has('celebrity_spiral')) &&
      !G.mem?.celCancelFired,
    text: 'Something you said, or something about what you did, becomes the thing that people are discussing. The discussion moves faster than you can respond to. The public self is being revised in real time by people who had a specific investment in the previous version. Statements are requested. Apologies are calibrated. The thing is what it is — neither larger nor smaller than what the original fact was. The scale of the response is a function of the machinery, not the fact.',
    choices: [
      {
        text: 'Face it directly — say what is true, acknowledge what is real',
        tag: null,
        outcome: 'The statement you give is specific and honest. It is not the statement the machinery was expecting. Some of the machinery processes it anyway. Some people read it.',
        effect: (p) => { p.fame -= 15; p.m -= 8; p.karma += 6; p.addFlag('celebrity_faced_cancellation'); p.setMem('celCancelFired', true) },
      },
      {
        text: 'Go quiet — the machinery needs fuel and you can stop providing it',
        tag: null,
        outcome: 'The silence is misread in multiple directions. The machinery finds other fuel. You are still there when it moves on.',
        effect: (p) => { p.fame -= 20; p.m -= 5; p.addFlag('celebrity_went_quiet'); p.setMem('celCancelFired', true) },
      },
      {
        text: 'Fight it — this is wrong and you will not accept the frame',
        tag: null,
        outcome: 'The fight generates more coverage than the original incident. You are right about some things. The cost of being publicly right about them is substantial.',
        effect: (p) => { p.fame -= 5; p.m -= 15; p.r += 8; p.addFlag('celebrity_fought_back'); p.setMem('celCancelFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cel_exit_from_public_life',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.fame >= 35 &&
      (G.flags.has('celebrity_spiral') || G.flags.has('celebrity_went_quiet') || G.flags.has('celebrity_sought_help')) &&
      G.age >= 35 &&
      !G.mem?.celExitFired,
    text: 'The public life becomes optional in a way it never was before. Not ending, exactly — more like stepping back from the edge of something. The opportunities are still there. You begin to choose which ones matter. The calculation changes: not what keeps the fame sustained, but what you actually want to do with the remaining time. The public self does not disappear. You simply stop performing it at volume.',
    choices: null,
    effect: (p) => { p.m += 8; p.fame -= 10; p.addFlag('celebrity_scaled_back'); p.setMem('celExitFired', true) },
  },

  {
    id: 'cel_private_life_found',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('celebrity_scaled_back') &&
      !G.mem?.celPrivateFired,
    text: 'The private life, returned to, has the quality of something you forgot you needed. The afternoon where no one knows what you achieved. The meal where no one is watching what you order. The conversation where the other person does not have a prior relationship with your public self. These are ordinary things. They were ordinary before. The return to them, from the distance the fame put in, makes them extraordinary by contrast.',
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('celebrity_private_life'); p.setMem('celPrivateFired', true) },
  },

]

// events_adolescence_2.js — BUILD 55: Adolescence Depth
// 22 events covering the specific texture of ages 12–17 that earlier modules miss.
// Covers: first job, curfew break, exam results, peer betrayal, first death of a peer,
// diaspora identity conflict, authority clash, peer pressure, dropout temptation,
// school fight, first real crush decay, rumour, social media pressure, body image,
// leaving question, scholarship test, family honour pressure, religion doubt at home,
// smoking first try, shoplifting, first taste of privilege, community service.

export const ADOLESCENCE_2_EVENTS = [

  // ── WORK AND MONEY ──────────────────────────────────────────────────────────

  {
    id: 'adol2_first_job',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 15 && !G.mem?.adol2FirstJob,
    text: (G) => {
      const archetype = G.character?.country?.archetype
      if (archetype === 'subsaharan' || archetype === 'developing_unstable') {
        return 'You start helping at the market stall on Saturdays. The money is small and real. You keep some; you give most of it to your mother. She doesn\'t comment on the amount.'
      }
      if (archetype === 'post_soviet') {
        return 'You get a job washing dishes at a café near school. The owner pays in cash, less than the posted wage. You do not ask why. The money is yours — not your family\'s, yours.'
      }
      return 'You get a job. Not the career, just work — a few hours a week, a small wage. The independence it represents is slightly out of proportion to what it actually pays.'
    },
    choices: [
      {
        text: 'Save it — you have a goal in mind',
        tag: null,
        outcome: 'It accumulates slowly. The goal stays ahead of the money. That\'s fine.',
        effect: (p) => { p.setMem('adol2FirstJob', true); p.mo += 150; p.e += 3; p.w += 2 },
      },
      {
        text: 'Spend it — you\'ve been waiting to have money of your own',
        tag: null,
        outcome: 'The spending is immediate and satisfying and gone within a week. You feel briefly free.',
        effect: (p) => { p.setMem('adol2FirstJob', true); p.mo += 20; p.m += 5 },
      },
    ],
    effect: null,
  },

  // ── RULES AND AUTHORITY ─────────────────────────────────────────────────────

  {
    id: 'adol2_curfew_break',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.adol2Curfew,
    text: 'You stay out past the time you were supposed to be home. Not by much the first time — long enough that the key in the door felt like a decision, not an accident.',
    choices: [
      {
        text: 'Apologise and accept the consequence',
        tag: null,
        outcome: 'The punishment is real. So is the relief of having it handled.',
        effect: (p) => { p.setMem('adol2Curfew', 'accepted'); p.m -= 2; p.karma += 2 },
      },
      {
        text: 'Lie — you have a cover story',
        tag: null,
        outcome: 'The lie works, or at least isn\'t challenged. You file away the knowledge that it can work.',
        effect: (p) => { p.setMem('adol2Curfew', 'lied'); p.m += 3; p.karma -= 3 },
      },
      {
        text: 'Own it without apology — you don\'t see what you did wrong',
        tag: null,
        outcome: 'This goes badly. The fight is long and real and resolves into a new, slightly colder normal.',
        effect: (p) => { p.setMem('adol2Curfew', 'defiant'); p.m -= 5; p.s += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_authority_clash',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.adol2Authority,
    text: 'A teacher or authority figure treats you in a way that you know is wrong. Not abusive — something smaller. They assume something about you that isn\'t true. They dismiss something that deserved to be heard. You have a choice about what to do with that.',
    choices: [
      {
        text: 'Say something in the moment',
        tag: null,
        outcome: 'They don\'t love it. You are right and they know it and that doesn\'t help. But you said it.',
        effect: (p) => { p.setMem('adol2Authority', 'spoke'); p.m += 3; p.s += 4; p.karma += 3 },
      },
      {
        text: 'Let it go — it isn\'t worth the trouble',
        tag: null,
        outcome: 'The reasonable decision. It still costs something.',
        effect: (p) => { p.setMem('adol2Authority', 'stayed_quiet'); p.m -= 2; p.e += 2 },
      },
      {
        text: 'Bring your parents in — this needs to be escalated',
        tag: null,
        outcome: 'It gets complicated. The situation resolves, partially. You learn something about institutions.',
        effect: (p) => { p.setMem('adol2Authority', 'escalated'); p.e += 3; p.m += 1 },
      },
    ],
    effect: null,
  },

  // ── SCHOOL STAKES ───────────────────────────────────────────────────────────

  {
    id: 'adol2_exam_results',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.adol2ExamResult,
    text: (G) => {
      const smart = G.stats?.smarts ?? 50
      if (smart >= 70) return 'You sit the exam you have been preparing for. You do well. Well enough that people start saying things about your future as if it\'s been decided. You\'re not sure if that\'s a gift or a cage.'
      if (smart >= 50) return 'You sit the exam. Your results are solid and unremarkable. Exactly what they are. You turn them over trying to find the story you\'re supposed to read in them.'
      return 'The exam results are not what you needed them to be. You sit with the paper for a long time before you show it to anyone.'
    },
    choices: [
      {
        text: 'Study harder — next time will be different',
        tag: null,
        outcome: 'You build new habits. Slowly. It is genuinely hard and you do it anyway.',
        effect: (p) => { p.setMem('adol2ExamResult', 'tries_again'); p.e += 6; p.m -= 2 },
      },
      {
        text: 'Accept it and move on — this isn\'t the whole picture',
        tag: null,
        outcome: 'The exam was one thing. Your life is not the exam. It takes time to believe this.',
        effect: (p) => { p.setMem('adol2ExamResult', 'accepted'); p.m += 3; p.r += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_scholarship_test',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.stats?.smarts >= 65 && G.age >= 15 && G.age <= 17 && !G.mem?.adol2Scholarship,
    text: (G) => {
      const arch = G.character?.country?.archetype
      if (arch === 'subsaharan' || arch === 'developing_urban' || arch === 'developing_unstable') {
        return 'You are nominated to sit for a scholarship examination. Your school has produced one winner in the last decade. Your family is quiet on the morning of the test in a way that means they are waiting.'
      }
      return 'You are put forward for a competitive scholarship. You prepare alone at the kitchen table after the family has gone to bed. The outcome will either open something or close something. You don\'t know which until you know.'
    },
    choices: [
      {
        text: 'Put everything into the preparation',
        tag: null,
        outcome: (G) => G.stats?.smarts >= 75 ? 'You win it. Something opens.' : 'You try your best and come close. Close is not the prize, but it\'s not nothing.',
        effect: (p) => {
          p.setMem('adol2Scholarship', 'tried')
          if ((p._state.stats?.smarts ?? 50) >= 75) {
            p.mo += 3000; p.m += 10; p.addFlag('scholarship_winner')
          } else {
            p.m -= 3; p.e += 5
          }
        },
      },
      {
        text: 'Go through the motions — the odds are too long',
        tag: null,
        outcome: 'You don\'t win. Whether the preparation would have changed that, you don\'t know.',
        effect: (p) => { p.setMem('adol2Scholarship', 'disengaged'); p.m -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_dropout_temptation',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.age >= 15 && G.age <= 17 &&
      (G.stats?.smarts ?? 50) < 55 &&
      !G.mem?.adol2Dropout,
    text: 'School has started to feel like somewhere you go for other people\'s reasons. A few of the older kids have already left — they have money, or at least they have their days. You think about whether finishing is actually necessary.',
    choices: [
      {
        text: 'Stay — finishing is worth something even if you can\'t see what yet',
        tag: null,
        outcome: 'You stay. It is not dramatic. You show up, which turns out to be most of what\'s required.',
        effect: (p) => { p.setMem('adol2Dropout', 'stayed'); p.e += 3; p.m += 2 },
      },
      {
        text: 'Leave and find work — the school isn\'t working for you',
        tag: null,
        outcome: 'You leave. The freedom is real. So is the constraint that arrives later.',
        effect: (p) => {
          p.setMem('adol2Dropout', 'left')
          p.addFlag('left_school_early')
          p.m += 5; p.e -= 5; p.w -= 3
        },
      },
    ],
    effect: null,
  },

  // ── SOCIAL DYNAMICS ─────────────────────────────────────────────────────────

  {
    id: 'adol2_peer_betrayal',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 13 && G.age <= 16 && !G.mem?.adol2PeerBetrayal,
    text: 'Someone you trusted tells something you told them in confidence. Not a secret exactly — more a version of you that you hadn\'t decided to show everyone. Now it\'s been decided for you.',
    choices: [
      {
        text: 'Confront them directly',
        tag: null,
        outcome: 'The confrontation is uncomfortable and real. They apologise in a way that doesn\'t quite land. The friendship changes permanently.',
        effect: (p) => { p.setMem('adol2PeerBetrayal', 'confronted'); p.m -= 5; p.s += 3; p.addFlag('betrayal_adolescence') },
      },
      {
        text: 'Pull back without explanation',
        tag: null,
        outcome: 'You stop being close to them. They notice or they don\'t. Either way, the gap becomes the permanent fact.',
        effect: (p) => { p.setMem('adol2PeerBetrayal', 'withdrew'); p.m -= 4; p.r += 2; p.addFlag('betrayal_adolescence') },
      },
      {
        text: 'Let it go — not worth making it a thing',
        tag: null,
        outcome: 'You do not hold grudges. This costs you something and earns you a kind of peace you will later find difficult to explain.',
        effect: (p) => { p.setMem('adol2PeerBetrayal', 'released'); p.m -= 3; p.karma += 4; p.addFlag('betrayal_adolescence') },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_rumour',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.adol2Rumour,
    text: 'There is a story going around about you. It is mostly untrue. The part that isn\'t is not the worst part, which is that it\'s mostly untrue.',
    choices: [
      {
        text: 'Deny it publicly — force the correction',
        tag: null,
        outcome: 'The denial draws more attention to the rumour than it had. Eventually it fades, which is what all rumours do.',
        effect: (p) => { p.setMem('adol2Rumour', 'denied'); p.m -= 5; p.s += 2 },
      },
      {
        text: 'Ignore it completely',
        tag: null,
        outcome: 'A strategy that works faster than you expected, mostly because someone else does something interesting.',
        effect: (p) => { p.setMem('adol2Rumour', 'ignored'); p.m -= 3; p.e += 2 },
      },
      {
        text: 'Lean into it — control the narrative',
        tag: null,
        outcome: 'You are briefly interesting in a way you didn\'t plan for. It works, at the cost of the privacy you lost.',
        effect: (p) => { p.setMem('adol2Rumour', 'owned'); p.m += 2; p.s += 4; p.lo += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_peer_death',
    phase: 'adolescence',
    weight: 1,
    cooldown: 0,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.adol2PeerDeath,
    text: (G) => {
      const arch = G.character?.country?.archetype
      if (arch === 'conflict_zone' || arch === 'developing_unstable') {
        return 'A boy from your school does not come back. The reason is specific and the specific reason matters and no one talks about it directly. It is the first time you understand that young people die.'
      }
      return 'Someone your age dies. An accident, or an illness, or something else. You were not close to them but you knew them. The funeral is the first one you attend where the person in the coffin is your age.'
    },
    choices: null,
    effect: (p) => {
      p.setMem('adol2PeerDeath', true)
      p.m -= 8; p.r += 4
    },
  },

  // ── IDENTITY AND BELONGING ──────────────────────────────────────────────────

  {
    id: 'adol2_diaspora_identity',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.has('second_gen_immigrant') &&
      G.age >= 13 && G.age <= 17 &&
      !G.mem?.adol2Diaspora,
    text: (G) => {
      const orig = G.character?.country?.name ?? 'your parents\' country'
      return `You are asked where you are from. The question is not hostile. You give the answer that is geographically correct and it does not satisfy them. "No, but where are you *really* from." At home you are told you have become too foreign. At school you are told you are not foreign enough. ${orig} is a country you know through food and music and the things that are never said directly.`
    },
    choices: [
      {
        text: 'Lean into the heritage — reclaim it deliberately',
        tag: null,
        outcome: 'It does not fully resolve the question. It gives you something to stand on while you work it out.',
        effect: (p) => { p.setMem('adol2Diaspora', 'heritage'); p.m += 4; p.karma += 3; p.r += 2 },
      },
      {
        text: 'Emphasise where you actually grew up — that\'s who you are',
        tag: null,
        outcome: 'People accept this most of the time. Some don\'t. You\'ve decided to let that be their problem.',
        effect: (p) => { p.setMem('adol2Diaspora', 'local'); p.m += 3; p.s += 3 },
      },
      {
        text: 'Neither — the question itself is the problem',
        tag: null,
        outcome: 'This is true and unhelpful to say out loud. You learn to have a shorter answer for most contexts.',
        effect: (p) => { p.setMem('adol2Diaspora', 'neither'); p.m -= 2; p.e += 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_family_honour',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      (G.character?.country?.archetype === 'developing_urban' ||
       G.character?.country?.archetype === 'wealthy_gulf' ||
       G.character?.country?.archetype === 'subsaharan') &&
      G.age >= 14 && G.age <= 17 &&
      !G.mem?.adol2FamilyHonour,
    text: 'Something you do — or are seen doing — reflects on your family in a way you didn\'t think about before you did it. Your parents use the word *shame* not as a private feeling but as a public fact. You understand for the first time that you are not just yourself.',
    choices: [
      {
        text: 'Accept it — you made a mistake, the community response is fair',
        tag: null,
        outcome: 'You repair what was damaged. The process is humbling in a useful way.',
        effect: (p) => { p.setMem('adol2FamilyHonour', 'accepted'); p.m -= 6; p.karma += 5 },
      },
      {
        text: 'Resent it — the collective judgment is out of proportion',
        tag: null,
        outcome: 'The resentment stays. So does the community. You learn to hold both.',
        effect: (p) => { p.setMem('adol2FamilyHonour', 'resented'); p.m -= 4; p.r += 4; p.s += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_faith_doubt_home',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.religion && G.religion !== 'none' && G.religion !== 'atheist' &&
      G.age >= 14 && G.age <= 17 &&
      !G.mem?.adol2FaithDoubt,
    text: (G) => {
      const rel = G.religion ?? 'your faith'
      return `You have a question about ${rel} that you cannot ask at home. Not a hostile question — a genuine one. You have looked for the answer in the usual places and found either certainty that doesn\'t satisfy or doubt that frightens you.`
    },
    choices: [
      {
        text: 'Keep the question private — faith is about more than one question',
        tag: null,
        outcome: 'You hold the question alongside the practice. Many people do. You are not sure if that\'s wisdom or deferral.',
        effect: (p) => { p.setMem('adol2FaithDoubt', 'held'); p.m += 2; p.r += 3 },
      },
      {
        text: 'Talk to a religious authority',
        tag: null,
        outcome: 'The answer you receive is designed for the question they would prefer you asked. Still, you feel less alone.',
        effect: (p) => { p.setMem('adol2FaithDoubt', 'asked_authority'); p.m += 4 },
      },
      {
        text: 'Start to quietly disengage from the practice',
        tag: null,
        outcome: 'Gradually. The leaving takes longer than you expect. So does the sense of having lost a floor.',
        effect: (p) => { p.setMem('adol2FaithDoubt', 'disengaged'); p.m -= 3; p.r += 5; p.e += 3 },
      },
    ],
    effect: null,
  },

  // ── RISK AND EXPERIMENTATION ────────────────────────────────────────────────

  {
    id: 'adol2_peer_pressure',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.adol2PeerPressure,
    text: (G) => {
      const arch = G.character?.country?.archetype
      const sub = arch === 'subsaharan' || arch === 'developing_unstable'
      return sub
        ? 'A group of older boys want you to come with them tonight. The thing they are doing is unclear. The invitation is clear. Staying home has its own cost.'
        : 'Everyone is doing something and whether you join or don\'t is the thing being watched. The thing itself matters less than the fact of being watched.'
    },
    choices: [
      {
        text: 'Go along with it',
        tag: null,
        outcome: 'You belong, temporarily. The price of belonging is what you did or didn\'t do and whether you can live with that.',
        effect: (p) => { p.setMem('adol2PeerPressure', 'joined'); p.m += 4; p.s += 3; p.karma -= 3 },
      },
      {
        text: 'Decline without making it a statement',
        tag: null,
        outcome: 'You find a reason that lets everyone save face. You are an expert at this by the time you are an adult.',
        effect: (p) => { p.setMem('adol2PeerPressure', 'declined_gracefully'); p.m += 2; p.karma += 3 },
      },
      {
        text: 'Say clearly that you\'re not interested',
        tag: null,
        outcome: 'A social cost. A small pride. You will have occasion to remember which mattered more.',
        effect: (p) => { p.setMem('adol2PeerPressure', 'refused'); p.m -= 3; p.karma += 5; p.s += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_first_smoke',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 13 && G.age <= 16 && !G.mem?.adol2Smoke,
    text: 'Someone offers you a cigarette. The first one is always slightly ritualistic — the lighting, the coughing, the not-coughing. Whether you make it a habit is a different question from whether you try it.',
    choices: [
      {
        text: 'Try it',
        tag: null,
        outcome: 'The ritual is somewhat appealing. Whether you become a smoker is a different story.',
        effect: (p) => { p.setMem('adol2Smoke', 'tried'); p.h -= 2; p.s += 2 },
      },
      {
        text: 'Decline',
        tag: null,
        outcome: 'No particular drama. You simply don\'t.',
        effect: (p) => { p.setMem('adol2Smoke', 'declined') },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_shoplifting',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.age >= 13 && G.age <= 16 &&
      !G.mem?.adol2Shoplifting &&
      !G.flags.has('criminalRecord'),
    text: 'You take something small from a shop without paying. For some, this is a moment of transgression. For others it is ordinary. The specific thing you took is less important than the specific feeling before you did it — the moment of deciding — and the specific feeling after.',
    choices: [
      {
        text: 'Do it, just this once',
        tag: null,
        outcome: 'No one sees. The item is trivial. The act is not.',
        effect: (p) => { p.setMem('adol2Shoplifting', 'did'); p.karma -= 4; p.m += 2 },
      },
      {
        text: 'Stop yourself',
        tag: null,
        outcome: 'The item goes back. The moment passes. You remember it anyway.',
        effect: (p) => { p.setMem('adol2Shoplifting', 'stopped'); p.karma += 3 },
      },
    ],
    effect: null,
  },

  // ── SOCIAL MEDIA AND BODY ───────────────────────────────────────────────────

  {
    id: 'adol2_social_media_pressure',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.currentYear >= 2010 &&
      G.age >= 13 && G.age <= 17 &&
      !G.mem?.adol2SocialMedia,
    text: (G) => {
      const female = G.character?.gender === 'female'
      if (female) {
        return 'Your phone is a record of how you compare to other people your age. The comparison is endless and algorithmic and specific. You have not been able to look at your own face recently without looking at it the way the camera looks at it.'
      }
      return 'The phone measures everything now — who saw your post, who didn\'t respond, what the number means. You know the number is meaningless and you still check it.'
    },
    choices: [
      {
        text: 'Set limits — this is not good for you',
        tag: null,
        outcome: 'You find some distance. Not complete, not permanent, but real.',
        effect: (p) => { p.setMem('adol2SocialMedia', 'limited'); p.m += 5; p.lo += 2 },
      },
      {
        text: 'Stay in it — everyone else is',
        tag: null,
        outcome: 'You stay in it. The comparison is the water. Eventually you stop noticing you\'re wet.',
        effect: (p) => { p.setMem('adol2SocialMedia', 'stayed'); p.m -= 5; p.s += 3; p.lo -= 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_body_image',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.adol2Body,
    text: (G) => {
      const female = G.character?.gender === 'female'
      if (female) {
        return 'Your body has become a subject of comment — from family, from boys, from other girls, from the mirror. Each comment is different and they all point in the same direction: your body is a problem to be managed.'
      }
      return 'You are aware of your body in a new way — aware that it is being compared to a standard that is not you. The standard is elsewhere. You are here.'
    },
    choices: [
      {
        text: 'Focus on strength and health, not appearance',
        tag: null,
        outcome: 'A reframing that takes years to fully land. It helps.',
        effect: (p) => { p.setMem('adol2Body', 'health_focus'); p.m += 3; p.h += 3; p.lo += 2 },
      },
      {
        text: 'Try to conform to the standard',
        tag: null,
        outcome: 'The effort is considerable and the standard moves. You learn this the hard way.',
        effect: (p) => { p.setMem('adol2Body', 'conformed'); p.m -= 4; p.lo += 3; p.h -= 2 },
      },
      {
        text: 'Reject the standard — consciously',
        tag: null,
        outcome: 'Intellectually satisfying and socially somewhat costly. Both are true.',
        effect: (p) => { p.setMem('adol2Body', 'rejected'); p.m += 2; p.karma += 3; p.s += 2 },
      },
    ],
    effect: null,
  },

  // ── WIDER HORIZONS ──────────────────────────────────────────────────────────

  {
    id: 'adol2_leaving_question',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.age >= 16 && G.age <= 17 &&
      !G.mem?.adol2Leaving &&
      !G.flags.has('emigrated'),
    text: (G) => {
      const city = G.character?.country?.capital ?? 'the city'
      const arch = G.character?.country?.archetype
      if (arch === 'subsaharan' || arch === 'developing_urban' || arch === 'developing_unstable') {
        return `You are beginning to understand that the life you want may not be available here. The choice between staying for what you know and leaving for what you don't is starting to feel real, not hypothetical.`
      }
      return `You start thinking about what comes after this place. ${city} is the obvious answer. A different country is the less obvious one. You have not decided anything, but the question has moved from abstract to present.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('adol2Leaving', true)
      p.e += 3; p.r += 2
    },
  },

  {
    id: 'adol2_first_privilege_mirror',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      (G.wealthTier >= 4 || G.stats?.wealth >= 65) &&
      G.age >= 14 && G.age <= 17 &&
      !G.mem?.adol2Privilege,
    text: 'You are old enough to notice something you had not noticed before: the things that were easy for you are not easy for everyone. The ease is not an achievement. It is a circumstance. You sit with this.',
    choices: [
      {
        text: 'Acknowledge it and try to act differently because of it',
        tag: null,
        outcome: 'The action is imperfect. The acknowledgment is real. Both matter.',
        effect: (p) => { p.setMem('adol2Privilege', 'acknowledged'); p.karma += 6; p.m += 2 },
      },
      {
        text: 'It\'s just how things are — you didn\'t ask for it',
        tag: null,
        outcome: 'Also true. The combination of both truths is the thing you will have to work out eventually.',
        effect: (p) => { p.setMem('adol2Privilege', 'deflected'); p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_school_fight',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.character?.gender === 'male' &&
      G.age >= 13 && G.age <= 16 &&
      !G.mem?.adol2SchoolFight,
    text: 'A confrontation that has been building between you and another boy resolves into a physical one. Whether you started it, won it, or avoided it is less the point than what it confirmed or denied about you in the social economy of adolescent boys.',
    choices: [
      {
        text: 'Fight back',
        tag: null,
        outcome: 'The result is ambiguous. The act is not forgotten.',
        effect: (p) => { p.setMem('adol2SchoolFight', 'fought'); p.s += 4; p.h -= 5; p.karma -= 2 },
      },
      {
        text: 'Walk away',
        tag: null,
        outcome: 'Some call it cowardice. Some call it maturity. You will know which it was eventually.',
        effect: (p) => { p.setMem('adol2SchoolFight', 'walked_away'); p.m -= 3; p.karma += 4; p.e += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'adol2_community_service',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.adol2Service,
    text: 'Through school, a religious organisation, or your own initiative, you spend time doing something for people outside your immediate circle. It is not glamorous. It is occasionally meaningful in ways that are hard to articulate.',
    choices: null,
    effect: (p) => {
      p.setMem('adol2Service', true)
      p.m += 5; p.karma += 6; p.s += 3
    },
  },

]

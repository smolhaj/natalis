// events_lawyer_arc.js — Deep lawyer career arc
//
// The lawyer exists in careers.js with one event (the morally compromised client).
// These events add what that can't: the first client who taught you the gap
// between legal aid and justice, the case where the correct and the just
// outcome diverged, the law as it operates under regimes that use it as
// an instrument, the late-career reckoning with the system you spent
// a life inside.

const isLawyer = (G) => G.career?.id === 'lawyer' || G.flags.has('lawyer_career')

export const LAWYER_ARC_EVENTS = [

  {
    id: 'law_first_client',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isLawyer(G) &&
      !G.mem?.lawFirstClientFired,
    text: `Your first real client is a man who cannot pay, which is why he has you — the trainee, the one they send to legal aid cases. He has a problem that the law can partially address. Partially is the operative word. You learn, in this first case, the distance between what the law promises and what it delivers, between the procedural rights and the practical ones, between the letter and the outcome. You win a narrow version of what he needed. He thanks you without warmth, which is correct, because warmth was not what the situation called for and he understood this even if you didn't yet.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.e += 4
      p.addFlag('lawyer_first_client')
      p.setMem('lawFirstClientFired', true)
    },
  },

  {
    id: 'law_guilty_client',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isLawyer(G) &&
      G.flags.has('lawyer_first_client') &&
      !G.mem?.lawGuiltFired,
    text: `Your client tells you, in confidence, that they did it. You may not put them on the stand to lie, and you must still make the prosecution prove its case; the system depends on it. You know the argument and it is correct. You make it to yourself again on the drive home, and it is still correct. It is not the only thing in the car.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 5
      p.addFlag('lawyer_guilty_client')
      p.setMem('lawGuiltFired', true)
    },
  },

  {
    id: 'law_justice_gap',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isLawyer(G) &&
      G.age >= 32 &&
      !G.mem?.lawJusticeGapFired,
    text: `The case resolves correctly under the law. The correct outcome and the just outcome were not the same. You know this because you know both what the law required and what the situation required, and they did not line up. You do not discuss this with opposing counsel, who also knows. You do not discuss it publicly. You file it in the category of things the profession understands to be true and does not say aloud at professional events.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.e += 3
      p.addFlag('lawyer_justice_gap')
      p.setMem('lawJusticeGapFired', true)
    },
  },

  {
    id: 'law_pro_bono',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isLawyer(G) &&
      G.age >= 34 &&
      !G.mem?.lawProBonoFired,
    text: `You take a case for nothing: the client cannot pay and the case matters. The firm allows it once or twice a year. You give it the same hours as the cases that bill. Win or lose, on the way out after the last hearing you notice something in yourself that has been missing from the office for a while.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 12
      p.addFlag('lawyer_pro_bono')
      p.setMem('lawProBonoFired', true)
    },
  },

  {
    id: 'law_regime_instrument',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isLawyer(G) &&
      (G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.regime === 'single_party_communist') &&
      !G.mem?.lawRegimeFired,
    text: `You practise law in a system that uses the law as an instrument. You know which provisions exist to be enforced and which exist to give a decided case the look of procedure. Your work is knowing where the law ends and the performance begins, and representing clients in both. Some of your colleagues no longer see the line. Some of them think the performance is the law.`,
    choices: [
      {
        text: 'Stay in the system — you can do more from inside',
        tag: null,
        outcome: `You stay. You find the spaces where real law still operates. They narrow over time.`,
        effect: (p) => {
          p.m -= 8
          p.r += 5
          p.addFlag('lawyer_in_system')
          p.setMem('lawRegimeFired', true)
        },
      },
      {
        text: 'Take cases the state will not like — use the law against itself',
        tag: null,
        outcome: `You take the cases. Some you win on technicalities that the system tolerates. Some you lose in ways that aren't technical at all.`,
        effect: (p) => {
          p.m -= 5
          p.h -= 4
          p.karma += 10
          p.addFlag('lawyer_dissident_cases')
          p.setMem('lawRegimeFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'law_wrongful_conviction',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isLawyer(G) &&
      G.age >= 40 &&
      !G.mem?.lawWrongfulFired,
    text: `Through a conversation, a news item, a contact, you learn that someone you prosecuted, or did not defend well enough, may have been innocent. Not to the legal standard. To the standard of what you believe now, with what you did not know then. The appeals system is slow. You make some inquiries, and they lead somewhere and nowhere.`,
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 12
      p.addFlag('lawyer_wrongful_conviction_doubt')
      p.setMem('lawWrongfulFired', true)
    },
  },

  {
    id: 'law_justice_gap_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('lawyer_justice_gap') &&
      G.age >= 55 &&
      !G.mem?.lawJusticeEchoFired,
    text: `You encounter a case — someone else's case, in the news or in professional conversation — that resembles it. The structure is the same: the correct outcome and the just outcome not aligned, the machinery of law producing what it is designed to produce, which is not the same as what justice requires. You find yourself explaining it to a younger colleague. You tell them the technical analysis. You do not tell them what you are aware of underneath the technical analysis: that you have carried this one for twenty years and that it has not resolved in the way that most cases resolve, into experience, into professional knowledge, into background. It remains specific.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.e += 3
      p.setMem('lawJusticeEchoFired', true)
    },
  },

  {
    id: 'law_dissident_echo',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('lawyer_dissident_cases') &&
      G.age >= 45 &&
      !G.mem?.lawDissidentEchoFired,
    text: `The cases the state did not like cost you later: doors that stayed closed, associations that never formed. Each time you weighed the client's outcome against what it would cost you, and you kept taking them. The weighing has changed over the years. The clients were worth it. Most of them.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.h -= 3
      p.karma += 8
      p.setMem('lawDissidentEchoFired', true)
    },
  },

  {
    id: 'law_wrongful_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('lawyer_wrongful_conviction_doubt') &&
      G.age >= 58 &&
      !G.mem?.lawWrongfulEchoFired,
    text: `The inquiry ended, or failed to. The appeals did what appeals do. You do not know, to the law's standard, whether that person was innocent; you know what you believe. You have spent a career inside the distinction between believing and knowing, and you understand why it exists. It does not make the doubt settle.`,
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.r += 8
      p.setMem('lawWrongfulEchoFired', true)
    },
  },

  {
    id: 'law_late_career',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isLawyer(G) &&
      G.age >= 55 &&
      !G.mem?.lawLateFired,
    text: `The law you practise now is different from the law you began with — not the statutes, though those too, but the interpretation, the consensus positions, the things that are said in courtrooms versus the things that are said in the margins. You have seen enough change to know that the law is a document that thinks it is more permanent than it is. Some of what you argued confidently in your thirties was wrong by your fifties. Some of what you are arguing now will be wrong in ways you cannot currently see. This is useful information. You have found that it makes you a better advocate and a more uncertain person, in roughly that order.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 4
      p.addFlag('lawyer_late_career')
      p.setMem('lawLateFired', true)
    },
  },

  {
    id: 'law_life_accounting',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isLawyer(G) &&
      G.age >= 65 &&
      !G.mem?.lawLifeAccountFired,
    text: `The accounting: you spent a career inside a system designed to resolve disputes according to agreed rules, and the system worked imperfectly, which is the best that can be said for any human system, and in the spaces where it worked you were sometimes the reason it worked, and in the spaces where it failed there were cases where you were not the reason it failed. The pro bono case. The moment in the corridor after the wrongful conviction inquiry. The client who called two years later to say the outcome had held. These are not billable hours. They are what you will take from the career.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 6
      p.karma += 6
      p.addFlag('lawyer_life_accounted')
      p.setMem('lawLifeAccountFired', true)
      p.legacy += 8
    },
  },

]

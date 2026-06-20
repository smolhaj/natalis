// events_business.js
// Business arc events: growth, failure, pivotal decisions, and the specific texture
// of running something you built yourself. Gate on state.business existing.

export const BUSINESS_EVENTS = [

  // ── GROWTH ───────────────────────────────────────────────────────────────────

  {
    id: 'biz_key_hire',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 24 && !G.mem.bizKeyHire,
    text: 'Someone applies who is genuinely better at one part of this than you are. You recognize it in the interview. The gap between what they know and what you know is the gap between where the business is and where it could be.',
    choices: [
      {
        text: 'Hire them — your ego can handle it',
        tag: null,
        outcome: 'The business changes in the year after they arrive. Not dramatically — specifically.',
        effect: (p) => { p.mo -= 3000; p.e += 5; p.w += 8; p.m += 6; p.setMem('bizKeyHire', true) },
      },
      {
        text: 'Hire someone less threatening — you need people you can manage',
        tag: null,
        outcome: 'The safer hire is fine. You wonder sometimes what the other choice would have become.',
        effect: (p) => { p.mo -= 2000; p.e += 2; p.w += 3; p.setMem('bizKeyHire', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'biz_first_big_client',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 23 && !G.mem.bizFirstBigClient,
    text: 'A contract lands that is twice the size of anything you have handled before. The margin is there. So is the exposure — if this goes wrong, there is no larger client to absorb the loss. You will have to be better than you have had to be so far.',
    choices: [
      {
        text: 'Take it — you will grow to meet it',
        tag: null,
        outcome: 'You do meet it, barely and then more than barely. The reference it provides opens the next door.',
        effect: (p) => { p.mo += 8000; p.m -= 5; p.e += 6; p.w += 8; p.setMem('bizFirstBigClient', true) },
      },
      {
        text: 'Turn it down — you are not ready and you know it',
        tag: null,
        outcome: 'You pass. The capacity you would have built does not get built this year.',
        effect: (p) => { p.m += 3; p.setMem('bizFirstBigClient', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'biz_acquisition_offer',
    phase: 'midlife',
    weight: 1,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 32 && (G.money ?? 0) > 20000 && !G.mem.bizAcquisitionOffer,
    text: 'A larger company makes an offer. The number is real and substantial. You would have equity and a role for two years, after which you would be free and considerably richer and no longer running the thing you built. The man who presents the offer has done this many times and is skilled at making it seem uncomplicated.',
    choices: [
      {
        text: 'Accept — you built something worth acquiring',
        tag: null,
        outcome: 'The paperwork takes three months. On the day you sign, you feel both vindicated and slightly orphaned.',
        effect: (p) => { p.mo += 80000; p.m += 8; p.r += 8; p.w += 15; p.addFlag('sold_business'); p.setMem('bizAcquisitionOffer', true) },
      },
      {
        text: 'Decline — you are not done yet',
        tag: null,
        outcome: 'You say no. The company finds someone else to acquire. You continue, on your own terms.',
        effect: (p) => { p.m += 10; p.r += 5; p.setMem('bizAcquisitionOffer', true) },
      },
    ],
    effect: null,
  },

  // ── SETBACKS ─────────────────────────────────────────────────────────────────

  {
    id: 'biz_lose_major_client',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 25 && !G.mem.bizLoseClient,
    text: 'The largest client sends a termination notice with thirty days. The reason is polite and almost plausible. The actual reason — a cousin of someone senior has started a competing service — is known to you but unactionable. Thirty percent of revenue ends on a Tuesday afternoon in an email.',
    choices: [
      {
        text: 'Diversify immediately — no single client should be this large again',
        tag: null,
        outcome: 'The lesson is painful and permanent. Within a year the business is more stable, not less.',
        effect: (p) => { p.mo -= 5000; p.m -= 8; p.e += 6; p.setMem('bizLoseClient', true) },
      },
      {
        text: 'Chase replacement revenue — volume first, strategy later',
        tag: null,
        outcome: 'You replace the revenue within eight months. The structural problem remains.',
        effect: (p) => { p.mo -= 2000; p.m -= 12; p.w -= 5; p.setMem('bizLoseClient', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'biz_market_downturn',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 30 &&
      (G.currentYear === 2001 || G.currentYear === 2009 || G.currentYear === 2020) && !G.mem.bizDownturn,
    text: 'The orders slow in a way that is not about you. The calls take longer to return. The invoices take longer to pay. Something systemic is happening and you are small enough to feel every tremor of it. You look at the payroll and look at the runway and make calculations.',
    choices: [
      {
        text: 'Cut costs sharply now — preserve the core',
        tag: null,
        outcome: 'You let two people go. It is the hardest thing you have done as a manager. The business survives the year.',
        effect: (p) => { p.mo -= 8000; p.m -= 15; p.r += 10; p.addFlag('survived_downturn'); p.setMem('bizDownturn', true) },
      },
      {
        text: 'Hold steady and bet on coming out the other side',
        tag: null,
        outcome: 'You burn through cash. Three of your competitors do not survive. You do, barely.',
        effect: (p) => { p.mo -= 15000; p.m -= 10; p.addFlag('survived_downturn'); p.setMem('bizDownturn', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'biz_cashflow_crisis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 24 && (G.money ?? 0) < 5000 && !G.mem.bizCashflow,
    text: 'The invoices are real but unpaid. The expenses are real and immediate. The gap between them is thirty days, which is also the gap between surviving and not. You have sat in this specific chair, in this specific feeling, before. You know more now but not enough to make it less uncomfortable.',
    choices: [
      {
        text: 'Take a short-term business loan — bridge the gap',
        tag: null,
        outcome: 'The loan arrives in five days. You pay it off in three months. The interest was the cost of the lesson.',
        effect: (p) => { p.mo += 5000; p.m -= 6; p.setMem('bizCashflow', true) },
      },
      {
        text: 'Call your largest clients and ask for early payment',
        tag: null,
        outcome: 'One agrees. The call was uncomfortable and effective. You add this to the list of things you will do differently next time.',
        effect: (p) => { p.mo += 3000; p.m -= 5; p.s += 3; p.setMem('bizCashflow', true) },
      },
    ],
    effect: null,
  },

  // ── FAILURE ──────────────────────────────────────────────────────────────────

  {
    id: 'biz_failure',
    phase: 'midlife',
    weight: 1,
    when: (G) => G.career?.id === 'entrepreneur' && G.age >= 30 && (G.money ?? 0) < -5000 && !G.mem.bizFailure,
    text: 'The business is not viable any longer. You have known this for three months and have been proceeding anyway, which is sometimes the right call and this time was not. You close it formally, which involves more paperwork than opening it did. You sit in the empty office on the last day for longer than necessary.',
    choices: [
      {
        text: 'Start over — you know far more now than when you began',
        tag: null,
        outcome: 'The second attempt is structurally different in the ways the first was not. It takes four years to become clear whether it worked.',
        effect: (p) => { p.m -= 10; p.r += 8; p.e += 8; p.addFlag('business_failed_and_restarted'); p.setMem('bizFailure', true) },
      },
      {
        text: 'Return to employment — you have proven enough to yourself',
        tag: null,
        outcome: 'You take a job at a competitor. They hire you quickly. Your CV now says something true that would not have been there otherwise.',
        effect: (p) => { p.m -= 8; p.r += 10; p.e += 5; p.addFlag('business_failed'); p.setMem('bizFailure', true) },
      },
    ],
    effect: null,
  },

]

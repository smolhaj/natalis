// events_automation.js
// Automation and AI displacement events — BUILD 28
// Career-gated, era-gated, written from the perspective of people living through
// technological displacement — not abstractly but specifically: the depot closing letter,
// the ticket moved to Done, the retraining programme brochure.

export const AUTOMATION_EVENTS = [

  // ── DRIVERS AND TRANSPORT ─────────────────────────────────────────────────────

  {
    id: 'auto_trucker_news',
    phase: null,
    weight: 4,
    when: (G) =>
      G.career?.id === 'driver' &&
      G.currentYear >= 2025 &&
      !G.mem?.autoTruckerNews,
    text: 'The trucking association sends an update. The autonomous pilot programme in Arizona has completed its fifteenth million miles without incident. There are no planned routes affected yet. The update includes the phrase continued commitment to our members. It is reassuring in the way that communications designed to be reassuring are not, quite.',
    choices: [
      {
        text: 'Look into it — understand what is actually coming',
        tag: null,
        outcome: 'The numbers are not hard to find. The timeline varies depending on who you ask. The direction does not vary.',
        effect: (p) => { p.e += 3; p.addFlag('automation_aware'); p.setMem('autoTruckerNews', true); },
      },
      {
        text: 'Carry on — when something happens, something will happen',
        tag: null,
        outcome: 'The work continues. The news continues. The two run in parallel for a while.',
        effect: (p) => { p.m -= 3; p.setMem('autoTruckerNews', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'auto_trucker_reality',
    phase: null,
    weight: 4,
    when: (G) =>
      G.career?.id === 'driver' &&
      G.flags.includes('automation_aware') &&
      G.currentYear >= 2030 &&
      G.age >= 40 &&
      !G.mem?.autoTruckerReality,
    text: 'Three drivers from your depot have taken retraining packages in the last year and not been replaced. Management has not said anything official. The routes you run have not changed. But the long-haul cross-country routes — the night runs, the ones no one wanted for the hours — are running autonomously now and the calculation is visible to anyone who wants to look at it.',
    choices: [
      {
        text: 'Take the retraining package before it is withdrawn',
        tag: null,
        outcome: 'Six months of logistics software training. The qualification is real. The job market is thinner than the brochure suggested.',
        effect: (p) => { p.e += 8; p.mo -= 2000; p.m -= 5; p.addFlag('retraining_accepted'); p.setMem('autoTruckerReality', true); },
      },
      {
        text: 'Wait and see — the regional routes may be protected longer',
        tag: null,
        outcome: 'You wait. The situation clarifies, eventually, in the way that late clarifications usually do.',
        effect: (p) => { p.m -= 8; p.addFlag('automation_displaced_risk'); p.setMem('autoTruckerReality', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'auto_driver_displaced',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career?.id === 'driver' &&
      G.flags.includes('automation_displaced_risk') &&
      G.currentYear >= 2033 &&
      !G.mem?.autoDriverDisplaced,
    text: 'The depot is closing. Eighteen drivers. The company calls it a structural transition in keeping with the evolving logistics landscape. The severance is eight weeks. You have been driving for twenty-two years. The retraining programme they offer is for data logistics coordination. You have an interview with a man who is twenty-six and cannot quite hide that he is doing a mental calculation about your age and the time it will take to bring you up to speed. You are forty-seven.',
    choices: [
      {
        text: 'Pursue the retraining — there is no alternative that pays as well',
        tag: null,
        outcome: 'You enter the programme. The classroom feels wrong after two decades on the road. You finish it anyway.',
        effect: (p) => { p.e += 5; p.m -= 8; p.addFlag('retraining_accepted'); p.setMem('autoDriverDisplaced', true); },
      },
      {
        text: 'Find another driving role — there are still jobs that exist',
        tag: null,
        outcome: 'Local deliveries. A fraction of what you were making. The road is still the road. The pay is not what it was.',
        effect: (p) => { p.m -= 10; p.w -= 5; p.setMem('autoDriverDisplaced', true); },
      },
    ],
    effect: null,
  },

  // ── MEDICAL AND PROFESSIONAL ──────────────────────────────────────────────────

  {
    id: 'auto_radiologist_ai',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career?.id === 'doctor' &&
      G.currentYear >= 2028 &&
      !G.mem?.autoRadiologistAi,
    text: 'The hospital has installed a diagnostic AI for radiology. It reads scans faster than the department average and with a measurably lower false-negative rate. The radiologists are still employed — someone has to review and sign off on the AI\'s readings, which is called physician oversight and takes twelve minutes where the original reading took forty. Your colleagues are divided: some find this clarifying and efficient; some find it something else that does not yet have a word in the professional vocabulary.',
    choices: [
      {
        text: 'Advocate for the oversight role — this is how medicine evolves',
        tag: null,
        outcome: 'The AI makes fewer errors on the obvious cases. Your value is in the ones it flags as uncertain. The cases get more interesting.',
        effect: (p) => { p.e += 5; p.karma += 5; p.addFlag('ai_augmented'); p.setMem('autoRadiologistAi', true); },
      },
      {
        text: 'Push back on the framing — twelve minutes of oversight is not medicine',
        tag: null,
        outcome: 'Your concerns are heard. The hospital thanks you for your feedback. The AI\'s contract is renewed.',
        effect: (p) => { p.m -= 3; p.e += 3; p.addFlag('automation_sceptic'); p.setMem('autoRadiologistAi', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'auto_legal_document_review',
    phase: null,
    weight: 3,
    when: (G) =>
      G.career?.id === 'lawyer' &&
      G.currentYear >= 2027 &&
      !G.mem?.autoLegalDocs,
    text: 'The firm has brought in document review software. First-year associates used to spend forty hours a week reading discovery documents; the software does it in minutes, at a cost per case that is a fraction of a junior salary. Three associates have not been renewed. The partners call it efficiency. The associates call it something else in the pub on Friday, quietly. You are somewhere between associate and partner, which means you understand both calculations very clearly.',
    choices: [
      {
        text: 'Adapt quickly — shift your practice toward work the software can\'t do',
        tag: null,
        outcome: 'The work changes. Strategy, not process. You are good at strategy. This turns out to be fortunate.',
        effect: (p) => { p.e += 5; p.addFlag('ai_augmented'); p.setMem('autoLegalDocs', true); },
      },
      {
        text: 'Organise the junior associates — someone should say this out loud',
        tag: null,
        outcome: 'You say it. It costs you something with management and earns you something with the people who were affected. Both remain true.',
        effect: (p) => { p.karma += 8; p.m -= 5; p.addFlag('labor_advocate'); p.setMem('autoLegalDocs', true); },
      },
    ],
    effect: null,
  },

  // ── GENERAL WORKPLACE DISPLACEMENT ───────────────────────────────────────────

  {
    id: 'auto_customer_service_replaced',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.currentYear >= 2025 &&
      G.age >= 18 && G.age <= 35 &&
      G.career &&
      !['software_developer', 'data_scientist', 'doctor', 'lawyer', 'teacher',
        'soldier', 'farmer', 'artist', 'journalist', 'priest', 'nurse', 'driver'].includes(G.career?.id) &&
      !G.mem?.autoCustomerService,
    text: 'Your workplace announces a chatbot system for customer queries. It will handle tier-one cases — the simple ones, they say. Tier one is approximately seventy per cent of what you do. The announcement comes with a questions and answers section titled What This Means for Staff. The section does not contain the word redundancy. It does not not contain it either.',
    choices: [
      {
        text: 'Upskill immediately — get ahead of the wave',
        tag: null,
        outcome: 'You sign up for the technical training. Some of it is useful. You move into a different category.',
        effect: (p) => { p.e += 5; p.addFlag('retraining_accepted'); p.setMem('autoCustomerService', true); },
      },
      {
        text: 'Wait for official clarity — act on information, not rumour',
        tag: null,
        outcome: 'The clarity comes four months later, in a meeting that confirms what the announcement implied.',
        effect: (p) => { p.m -= 6; p.addFlag('automation_displaced_risk'); p.setMem('autoCustomerService', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'auto_factory_robot',
    phase: null,
    weight: 4,
    when: (G) =>
      G.career?.id === 'factory_worker' &&
      G.currentYear >= 2025 &&
      !G.mem?.autoFactoryRobot,
    text: 'The robot arm was installed last year in the welding section. Now there are two more, in painting. The foreman says no jobs have been lost — technically true, because people have left and not been replaced. The section that had eighteen people last year has eleven. Management calls it natural attrition. The union negotiators call it something else. The robot arm does not call it anything.',
    choices: [
      {
        text: 'Work with the union — put the numbers on record',
        tag: null,
        outcome: 'The numbers go into a report. The report is filed. This is slower than the robot arms. It is not nothing.',
        effect: (p) => { p.karma += 8; p.s += 3; p.addFlag('labor_advocate'); p.setMem('autoFactoryRobot', true); },
      },
      {
        text: 'Focus on securing your own position',
        tag: null,
        outcome: 'You identify which roles are harder to automate and move toward them. The logic is sound and also uncomfortable.',
        effect: (p) => { p.m -= 5; p.addFlag('automation_aware'); p.setMem('autoFactoryRobot', true); },
      },
    ],
    effect: null,
  },

  // ── TECH WORKERS AND IRONY ────────────────────────────────────────────────────

  {
    id: 'auto_programmer_guilt',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career?.id === 'software_developer' &&
      G.currentYear >= 2026 &&
      !G.mem?.autoProgrammerGuilt,
    text: 'You are on the team that builds the logistics optimisation platform. It handles routing, scheduling, and dispatching for a network of distribution centres — work that forty people used to do. You have met none of those forty people. There is a ticket in the internal tracker, not client-facing, that reads: replaces 38 FTE by Q2. You move it to Done. You feel something that does not have a name in your company\'s vocabulary, which has precise words for velocity and impact but not for this.',
    choices: [
      {
        text: 'Sit with it — the feeling has a right to exist',
        tag: null,
        outcome: 'You do not resolve the feeling. You carry it instead. This is a different kind of resolution.',
        effect: (p) => { p.r += 8; p.karma -= 5; p.addFlag('automation_guilt'); p.setMem('autoProgrammerGuilt', true); },
      },
      {
        text: 'Contextualise — this is how economies develop, always have',
        tag: null,
        outcome: 'The contextualisation is not wrong. It is also not complete. Both remain true simultaneously.',
        effect: (p) => { p.e += 3; p.m -= 5; p.setMem('autoProgrammerGuilt', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'auto_programmer_guilt_later',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.includes('automation_guilt') &&
      G.age >= 40 &&
      !G.mem?.autoProgrammerGuiltLater,
    text: 'Five years later you are at a conference. Someone presents a case study on a platform similar to the one you built. The efficiency numbers are impressive. In the question and answer session, a woman in the third row asks what happened to the workers who were displaced. The presenter says they were supported through a retraining programme. You know the kind of retraining programme they mean. You were not on that team. The woman asking the question was probably one of them.',
    choices: null,
    effect: (p) => { p.r += 10; p.karma -= 3; p.setMem('autoProgrammerGuiltLater', true); },
  },

  {
    id: 'auto_data_scientist_irony',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.career?.id === 'data_scientist' &&
      G.currentYear >= 2030 &&
      !G.mem?.autoDataIrony,
    text: 'A generative AI system can now produce data analysis reports from raw datasets in four minutes. The same report took a junior analyst two days when you started in this field. You built a version of this system\'s predecessor for your thesis, which you were proud of. The irony is visible to you. It is also not enough to change the economics, which are the same economics regardless of the irony.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 5; p.addFlag('automation_aware'); p.setMem('autoDataIrony', true); },
  },

  // ── RETRAINING AND OUTCOMES ───────────────────────────────────────────────────

  {
    id: 'auto_retraining_outcome',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('retraining_accepted') &&
      G.age >= 38 &&
      !G.mem?.autoRetrainingOutcome,
    text: 'Six months of classes. The certificate is real. The job market for this certificate is thinner than the brochure suggested. You apply for twenty-two positions. You hear back from six. You get two interviews. You are offered one role, at a salary twelve per cent lower than what you were making before the disruption. You take it. The commute is longer. The work is fine. You are fine. The outcome is classified in the government\'s statistics as a successful transition.',
    choices: [
      {
        text: 'Accept it — this is the outcome, and it is livable',
        tag: null,
        outcome: 'You live it. It is livable. You had not been sure it would be.',
        effect: (p) => { p.m -= 5; p.addFlag('retraining_completed'); p.setMem('autoRetrainingOutcome', true); },
      },
      {
        text: 'Refuse to call this fine — something was lost and that should be named',
        tag: null,
        outcome: 'You name it. This changes nothing about the salary. It changes something about whether you agreed to call it by the wrong name.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('retraining_completed'); p.setMem('autoRetrainingOutcome', true); },
      },
    ],
    effect: null,
  },

  // ── POLICY AND THE BIGGER PICTURE ─────────────────────────────────────────────

  {
    id: 'auto_ubi_debate',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2035 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      !G.mem?.autoUbiDebate,
    text: 'A pilot programme in three cities will provide every adult resident with a basic income, unconditionally. No work requirement. The debate has been running for years and shows no sign of concluding: the right calls it dependency, the left calls it freedom, the economists are divided in the usual pattern. The pilots show the recipients are slightly healthier and no less likely to work. The debate continues past the evidence, as debates tend to do.',
    choices: [
      {
        text: 'Support it — unconditional security is the right foundation',
        tag: null,
        outcome: 'You vote for it, advocate for it where you can. Whether it passes depends on people you will never meet.',
        effect: (p) => {
          p.karma += 5;
          p.addFlag('ubi_supporter');
          p.setPolitical('left');
          p.setMem('autoUbiDebate', true);
        },
      },
      {
        text: 'Oppose it — the incentive structure matters, and this one is wrong',
        tag: null,
        outcome: 'The argument is internally coherent. Others find it less persuasive. Both remain in the field.',
        effect: (p) => {
          p.e += 3;
          p.setPolitical('right');
          p.setMem('autoUbiDebate', true);
        },
      },
      {
        text: 'It depends entirely on the funding mechanism — the principle is separable from the policy',
        tag: null,
        outcome: 'The position is correct and also very hard to vote with in a referendum.',
        effect: (p) => { p.e += 5; p.setMem('autoUbiDebate', true); },
      },
    ],
    effect: null,
  },

]

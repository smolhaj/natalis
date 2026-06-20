// events_aid_worker.js — Humanitarian aid worker arc (BUILD 17)
// Covers: the international staff perspective (from wealthy country into crisis), the local
// staff perspective (working alongside internationals in your own country), the salary gap,
// the impossible caseload, the headquarters vs field divide, the evacuation order,
// the funding cut, burnout, and the late-life reckoning on what the work did and didn't do.
//
// Entry gates:
//   aw_entry_international: wealthy_west + professional career + young adult + year ≥ 1970
//   aw_local_entry: conflict/developing + career + young adult + year ≥ 1970
// Flag flow: ngo_worker → all subsequent events gate on this
//            aw_international_staff / ngo_local_staff → text branching throughout

const PROFESSIONAL_CAREERS = [
  'teacher','nurse','doctor','engineer','software_developer','lawyer','journalist',
  'social_worker','civil_servant','accountant','artist','novelist','academic',
  'environmental_scientist','physical_therapist','therapist','pharmacist','dentist',
]

const HAS_PROFESSIONAL_CAREER = (G) =>
  G.career !== null && PROFESSIONAL_CAREERS.includes(G.career?.id)

const HAS_ANY_CAREER = (G) => G.career !== null

export const AID_WORKER_EVENTS = [

  // ── ENTRY: INTERNATIONAL STAFF ────────────────────────────────────────────────

  {
    id: 'aw_entry_international',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.archetype === 'wealthy_west' &&
      G.age >= 23 && G.age <= 34 &&
      G.currentYear >= 1970 &&
      HAS_PROFESSIONAL_CAREER(G) &&
      G.stats.smarts >= 55 &&
      !G.flags.has('ngo_worker') &&
      !G.mem?.awEntry,
    text: 'You attend three days of briefings before your departure — conflict sensitivity training, security protocols, cultural awareness, mandatory-reporting obligations. The person leading the sessions has been doing this for fifteen years and their voice has the specific flatness of someone who has stopped being surprised. On the last day, they show photographs of the place you are going. You have researched it, read the reports, formed a clear picture. The photographs are different from the picture.',
    choices: [
      {
        text: 'You have been preparing for this for a long time.',
        tag: 'prepared',
        outcome: 'The flight is long. When you land, the heat is the first thing, then the smell, then the fact of it. You are here now.',
        effect: (p) => { p.m += 5; p.e += 4; p.addFlag('ngo_worker'); p.addFlag('aw_international_staff'); p.setMem('awEntry', true) },
      },
      {
        text: 'The photographs have given you pause. You go anyway.',
        tag: 'uncertain',
        outcome: 'The pause was appropriate. The place is harder than the photographs suggested, which were already hard. You are useful here. You carry that.',
        effect: (p) => { p.m -= 2; p.e += 5; p.r += 3; p.addFlag('ngo_worker'); p.addFlag('aw_international_staff'); p.setMem('awEntry', true) },
      },
    ],
    effect: null,
  },

  // ── ENTRY: LOCAL STAFF ────────────────────────────────────────────────────────

  {
    id: 'aw_local_entry',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['conflict_zone', 'developing_unstable', 'subsaharan', 'developing_urban'].includes(G.currentCountry?.archetype) &&
      G.age >= 22 && G.age <= 32 &&
      G.currentYear >= 1970 &&
      HAS_ANY_CAREER(G) &&
      G.stats.smarts >= 50 &&
      !G.flags.has('ngo_worker') &&
      !G.flags.has('ngo_local_staff') &&
      !G.mem?.awLocalEntry,
    text: 'The job interview is at a compound with generators and clean water and internet that works, surrounded by a country where most of these things are irregular. The salary is three or four times what the government ministry would pay — in dollar terms, still a fraction of what the international staff receive for the same work, but that is not something anyone has said in this room. You will be the bridge between the organisation and the communities it serves. This is the job description. You accept it. In the first month, you learn what this means in practice.',
    choices: null,
    effect: (p) => {
      p.m += 3; p.e += 4; p.w += 2;
      p.addFlag('ngo_worker'); p.addFlag('ngo_local_staff');
      p.setMem('awLocalEntry', true);
    },
  },

  // ── THE SALARY GAP (LOCAL STAFF) ─────────────────────────────────────────────

  {
    id: 'aw_salary_gap_local',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('ngo_local_staff') &&
      G.age >= 24 && G.age <= 38 &&
      !G.mem?.awSalaryGap,
    text: 'The international coordinator — who arrived three months ago and knows less about this community than you learned in your first week — mentions, in passing, the hardship allowance they receive for working here. It is more than your monthly salary. It is possible they do not know this. It is also possible they do. The rationale, when you eventually read it in the staff handbook, is labour market alignment: national staff are paid at competitive local rates, international staff at competitive home-country rates. The logic is coherent. The compound is a place where two people doing the same work during the same crisis receive fundamentally different treatment because of which passport they carry.',
    choices: [
      {
        text: 'You say nothing. The job is still better than the alternatives.',
        tag: 'silent',
        outcome: 'This is true. You say it to yourself often enough that it has stopped being a thought and become a fact you carry.',
        effect: (p) => { p.m -= 6; p.karma += 3; p.r += 4; p.setMem('awSalaryGap', true) },
      },
      {
        text: 'You raise it with the country director.',
        tag: 'raised',
        outcome: 'The country director listens carefully and explains the structure. Nothing changes. You have said it, which is different from it having been heard.',
        effect: (p) => { p.m -= 8; p.e += 4; p.karma += 5; p.addFlag('ngo_raised_pay_gap'); p.setMem('awSalaryGap', true) },
      },
    ],
    effect: null,
  },

  // ── THE SALARY GAP (INTERNATIONAL STAFF) ─────────────────────────────────────

  {
    id: 'aw_salary_gap_intl',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('aw_international_staff') &&
      G.age >= 24 && G.age <= 38 &&
      !G.mem?.awSalaryGap,
    text: 'At the team meeting, the salary scales are outlined — one structure for international staff, a separate structure for national staff. The rationale is clear and practised: home-country market rates, local market rates, apples and oranges. Your local colleague has more field experience than you, speaks four languages fluently, has built the community trust that makes the programme work. The gap between your salaries is not explainable by anything except passport.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('awSalaryGap', true) },
  },

  // ── THE IMPOSSIBLE CASELOAD ───────────────────────────────────────────────────

  {
    id: 'aw_caseload',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      G.age >= 25 && G.age <= 40 &&
      !G.mem?.awCaseload,
    text: 'Your caseload is 847 families. The unofficial number is higher — families not yet registered, people who arrived after the registration cut-off, people who exist outside the lists entirely. You have seen the list and you have seen the people and you know that these are not the same population. The gap between what the organisation says it is doing and what is actually being done is not a secret: it is in every field report you write. What happens to those reports once they leave your outbox is a thing you stopped thinking about in the third month.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 5; p.r += 6; p.setMem('awCaseload', true) },
  },

  // ── HEADQUARTERS VS. FIELD ────────────────────────────────────────────────────

  {
    id: 'aw_hq_memo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      G.age >= 28 && G.age <= 45 &&
      !G.mem?.awHQMemo,
    text: 'Headquarters has sent a memo about branding guidelines for the new funding cycle — logo proportions must be correct in all field communications. There is also a memo about the reporting template, which has changed for the fourth time in two years, meaning the data entered for six months must be re-entered in the new format before the deadline, which falls in the same week as the distribution. You draft a reply and then delete it and do the re-entry instead. The distribution happens on time. No one from headquarters knows it was close.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 4; p.e += 2; p.setMem('awHQMemo', true) },
  },

  // ── THE EVACUATION ────────────────────────────────────────────────────────────

  {
    id: 'aw_evacuation',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      ['conflict_zone', 'developing_unstable'].includes(G.currentCountry?.archetype) &&
      G.age >= 25 && G.age <= 50 &&
      !G.mem?.awEvacuation,
    text: G => G.flags.has('ngo_local_staff')
      ? 'The security incident happens at 4pm. By 6pm there is an evacuation order — for international staff. The compound becomes a different place in those two hours. You watch your international colleagues pack. You have been told to shelter in place, which is the phrase for: stay where you are, we cannot take you with us. You stand by the gate and watch the vehicles leave. Your colleague who arrived three months ago and has been learning the community work you already know perfectly — you watch them get into the vehicle. There is a moment where they look back. There is not much that can be said in that moment. The vehicles leave. You go back inside.'
      : 'The security incident happens at 4pm on a Tuesday. By 6pm there is an evacuation order for international staff. The compound becomes a different place in those two hours — you can see, in how people move, which category of person they are. You pack a bag. Your colleague — who has worked with you for four years, who knows this community better than anyone who will ever be sent by this organisation — stands by the gate and watches you get into the vehicle. You look back. There is nothing to say that does not make it worse. The vehicle moves.',
    choices: null,
    effect: (p) => {
      p.m -= 20; p.r += 15; p.karma += 5;
      p.addFlag(p.flags?.has?.('ngo_local_staff') ? 'aw_left_behind' : 'aw_evacuated_and_left');
      p.setMem('awEvacuation', true);
    },
  },

  // ── THE FUNDING CUT ───────────────────────────────────────────────────────────

  {
    id: 'aw_funding_cut',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.awFundingCut,
    text: 'The emergency has lasted four years. The television coverage lasted eighteen months. The funding cycle has now ended and the programme is closing — not because the situation has resolved but because the donor country has a new humanitarian priority and the allocation has shifted. You have three months to wind down. You tell your team first, then the community liaison. You do not tell the families you have been tracking, because there is a communications protocol for how this information should be released. The families will hear from the organisation at approximately the same time you are boarding a flight home.',
    choices: [
      {
        text: 'You write a transition plan and find other organisations to hand work to.',
        tag: 'transition',
        outcome: 'Some things transfer. Some things do not transfer — they simply end. You write it in the final report accurately.',
        effect: (p) => { p.m -= 15; p.karma += 8; p.r += 8; p.addFlag('aw_programme_ended'); p.setMem('awFundingCut', true) },
      },
      {
        text: 'You flag it internally — the closure protocol is inadequate for what this community is losing.',
        tag: 'flagged',
        outcome: 'The flag is noted. The closure happens on the same timeline. What changes is that it is on the record.',
        effect: (p) => { p.m -= 18; p.karma += 12; p.r += 10; p.addFlag('aw_programme_ended'); p.addFlag('aw_dissented'); p.setMem('awFundingCut', true) },
      },
    ],
    effect: null,
  },

  // ── BURNOUT ───────────────────────────────────────────────────────────────────

  {
    id: 'aw_burnout',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      G.age >= 32 && G.age <= 52 &&
      !G.mem?.awBurnout,
    text: 'You are not depressed — you know what depression looks like and this is different. It is more like a switch that does not turn all the way on anymore. You can do the work. The work gets done. What has changed is the quality of attention you bring to it: you used to read every case file as if it were a person; now you read them efficiently. You used to lose sleep over specific families; now you process them. The literature calls this compassion fatigue, which is a name that makes it sound like your fault — as if you ran out of something you should have budgeted better.',
    choices: [
      {
        text: 'You take a leave and try to return to it later.',
        tag: 'leave',
        outcome: 'The leave helps. Not completely. The switch that does not turn all the way on does not fully repair. But it improves, which is something.',
        effect: (p) => { p.m += 8; p.h += 5; p.addFlag('aw_burnout_break'); p.setMem('awBurnout', true) },
      },
      {
        text: 'You leave the sector. The work needs people who are present for it.',
        tag: 'left',
        outcome: 'You leave with a reasonable amount of guilt and a reasonable amount of relief. Both seem honest.',
        effect: (p) => { p.m += 12; p.r += 6; p.addFlag('aw_left_sector'); p.setMem('awBurnout', true) },
      },
      {
        text: 'You stay. The work still needs doing even from a depleted person.',
        tag: 'stayed',
        outcome: 'The work gets done. You are not sure if this is commitment or something else that looks like it from the outside.',
        effect: (p) => { p.m -= 8; p.h -= 6; p.karma += 10; p.addFlag('aw_burnout_endured'); p.setMem('awBurnout', true) },
      },
    ],
    effect: null,
  },

  // ── LATE-LIFE RECKONING ───────────────────────────────────────────────────────

  {
    id: 'aw_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('ngo_worker') || G.flags.has('ngo_local_staff')) &&
      G.age >= 60 &&
      !G.mem?.awReckoning,
    text: 'The studies available now — on aid dependency, on the market distortions large NGO presences create, on the damage of expertise that rotates in and out faster than it can be localised — are thorough and not wrong. You read them. You also know things that are not in the studies: the families who had food in years when they otherwise would not have, the clinics that operated on supply chains your organisation maintained, the specific people whose children are alive because of specific interventions in specific moments that no indicator framework was designed to capture. Both things are true. You spent most of your working life trying to make the first set of things true without being responsible for the second. You are not sure how well you succeeded at either.',
    choices: null,
    effect: (p) => { p.e += 5; p.r += 5; p.m += 4; p.karma += 5; p.setMem('awReckoning', true) },
  },

  // ── EVACUATION ECHO: LEFT BEHIND ─────────────────────────────────────────────

  {
    id: 'aw_left_behind_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('aw_left_behind') &&
      G.age >= 55 &&
      !G.mem?.awLeftBehindEcho,
    text: 'When people ask about the work — at dinner parties, in the way that people ask about things they find interesting from a comfortable distance — you tell the stories that are true and manageable: the families, the caseloads, the logistics of operating in difficult places. You do not often tell the story of standing at the gate and watching the vehicles leave. It is not that the story is too painful to tell. It is that telling it requires explaining too much that the listener does not have the context to hold: what it means that you stayed, what it meant that they left, the particular quality of a look back through a vehicle window when both people understand that the asymmetry is structural and neither of you designed it.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('awLeftBehindEcho', true) },
  },

  // ── EVACUATION ECHO: EVACUATED AND LEFT ──────────────────────────────────────

  {
    id: 'aw_evacuated_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('aw_evacuated_and_left') &&
      G.age >= 55 &&
      !G.mem?.awEvacuatedEcho,
    text: 'There is a specific thing that happens when you tell people you worked in humanitarian aid for a long time. Their faces arrange themselves in a particular expression — admiration, something close to awe. You accept this. You also know that the thing the expression is responding to is not the full account. The full account includes the Tuesday afternoon when the security order came, and you packed a bag, and you got into a vehicle, and through the back window you watched your colleague standing at the gate. You have worked out, in the years since, that your colleague was fine — that staying was survivable. This helps. It does not change what you did.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.karma += 3; p.setMem('awEvacuatedEcho', true) },
  },

  // ── DONOR VISIT ───────────────────────────────────────────────────────────────

  {
    id: 'aw_donor_visit',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('ngo_worker') &&
      G.age >= 26 && G.age <= 48 &&
      !G.mem?.awDonorVisit,
    text: 'The delegation arrives from the donor country — three officials, a photographer, a communications officer. The camp has been tidied in preparation; the community representative who will be interviewed has been chosen for their English and their composure. You show the delegation around for two hours. The photographer takes photographs of children who look sad in photogenic ways. The communications officer asks if one of the children can hold up something with the organisation\'s logo. You explain why this is not something you will do. The communications officer thanks you and moves on to ask about another photograph. At dinner that evening, the delegation says the visit was inspiring.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.m -= 5; p.setMem('awDonorVisit', true) },
  },

]

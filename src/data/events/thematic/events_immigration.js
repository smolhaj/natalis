// events_immigration.js
// Events that fire based on residency status and immigration experience.
// All conditions use G.residencyStatus, G.flags, G.currentCountry, G.character.country.
// G.residencyStatus values: 'citizen', 'permanent_resident', 'work_visa',
//   'undocumented', 'refugee_status', 'asylum_seeker', 'tourist_overstay'

export const IMMIGRATION_EVENTS = [

  // ── UNDOCUMENTED LIFE ────────────────────────────────────────────────────────

  {
    id: 'imm_undoc_cash_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 18,
    text: 'The work is cash. No contract, no payslip, no name on anything official. The boss is aware of your situation in the way that gives him leverage he never has to name directly — a glance when you ask about a pay discrepancy, a pause before he says he needs you on Sunday. You go on Sunday.',
    choices: [
      { text: 'Keep your head down and save what you can', tag: null, outcome: 'The money accumulates slowly. The humiliation does too. You get good at not reacting.', effect: (p) => { p.mo += 400; p.m -= 8; p.r += 5; p.addFlag('cash_work_undocumented') } },
      { text: 'Push back on the underpayment — he needs you too', tag: null, outcome: 'He pays, this time. The air between you changes. You are more careful now about everything.', effect: (p) => { p.mo += 700; p.m -= 5; p.s += 3; p.addFlag('cash_work_undocumented') } },
    ],
    effect: null,
  },

  {
    id: 'imm_undoc_robbery',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 18,
    text: 'Someone follows you from the bus stop and takes your phone and the week\'s cash you were carrying home. You know the number to call. You do not call it. You cannot afford the questions they would ask, the forms they might generate. You walk the rest of the way home in the dark and tell nobody.',
    choices: null,
    effect: (p) => { p.mo -= 300; p.m -= 15; p.r += 10; p.addFlag('victimized_no_recourse') },
  },

  {
    id: 'imm_undoc_worksite_check',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 18,
    text: 'Two men in lanyards come through the warehouse floor. Not police — immigration. Everyone knows immediately. Some workers walk quickly to the bathroom. Others keep working, heads down, a studied performance of normalcy. You are in the second group. Your hands do not shake. This surprises you.',
    choices: [
      { text: 'Keep working — don\'t move', tag: null, outcome: 'They pass your row without stopping. When they leave, nobody says anything. You finish the shift. You do not sleep well for a week.', effect: (p) => { p.m -= 18; p.r += 8; p.addFlag('survived_document_check') } },
      { text: 'Find a reason to step away before they reach you', tag: null, outcome: 'You are not asked anything. Whether this was skill or luck you cannot say.', effect: (p) => { p.m -= 12; p.r += 5; p.s += 3; p.addFlag('survived_document_check') } },
    ],
    effect: null,
  },

  {
    id: 'imm_undoc_hospital_avoid',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 20,
    text: 'The pain has been present for three days. You know what the clinic visit would involve — a form, an ID number, a record. You look up the symptoms online and decide it is probably not serious. You take something over-the-counter and wait. The pain recedes after five days. You are relieved and also furious in a way you have nowhere to put.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 10; p.r += 8; p.addFlag('avoided_healthcare') },
  },

  {
    id: 'imm_undoc_child_born',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 20 && G.children && G.children.length > 0,
    text: 'The baby is born here. You are not sure, exactly, what that means — whether it means what it used to mean, whether the laws have changed, whether they changed again. You hold the child and think about paperwork and then stop thinking about paperwork and just hold the child.',
    choices: [
      { text: 'Register the birth immediately and navigate whatever comes', tag: null, outcome: 'The certificate exists. The child has a number. What that number means in ten years is a question you cannot yet answer.', effect: (p) => { p.m += 5; p.r += 8; p.karma += 5; p.addFlag('child_born_abroad') } },
      { text: 'Wait and see what the situation is first', tag: null, outcome: 'The delay becomes a complication. You fix it eventually, at some cost and a great deal of paperwork.', effect: (p) => { p.m -= 5; p.r += 10; p.mo -= 200; p.addFlag('child_born_abroad') } },
    ],
    effect: null,
  },

  {
    id: 'imm_undoc_neighbor_knows',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 18,
    text: 'Your neighbor has figured it out. Not from anything you said — from the hours, the cash, the absence of a car despite working long days. She says nothing directly. She just says she hopes everything is going okay. You thank her and close the door and stand in the hallway for a long time.',
    choices: [
      { text: 'Trust her — she seems genuinely kind', tag: null, outcome: 'Over several weeks she becomes an ally of sorts. You do not relax, but you relax slightly.', effect: (p) => { p.m += 8; p.s += 3; p.addFlag('trusted_local_ally') } },
      { text: 'Keep your distance — you cannot know for certain', tag: null, outcome: 'You are polite and brief and give nothing away. The uncertainty stays the way it was.', effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('social_isolation_undoc') } },
    ],
    effect: null,
  },

  // ── REFUGEE / ASYLUM ─────────────────────────────────────────────────────────

  {
    id: 'imm_asylum_interview',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.residencyStatus === 'asylum_seeker' || G.residencyStatus === 'refugee_status') && G.age >= 18 && !G.flags.includes('asylum_interview_done'),
    text: 'The caseworker across the table takes notes on a laptop. She has done this many times. You have not. Your story — which is entirely true — must be told in a specific shape, with dates and named officials and documented proof of things that happened in the middle of the night with no witnesses and no cameras. You tell it. She types. She thanks you. You walk out into a grey afternoon and do not know what just happened.',
    choices: [
      { text: 'Tell it plainly and completely', tag: null, outcome: 'The account is consistent. The gaps are explained honestly. You can do no more.', effect: (p) => { p.m -= 15; p.r += 5; p.addFlag('asylum_interview_done') } },
      { text: 'Tailor the account to what you think they want to hear', tag: null, outcome: 'The shape is right. Whether it matches the original documents is a question that will resurface.', effect: (p) => { p.m -= 12; p.r += 8; p.karma -= 5; p.addFlag('asylum_interview_done') } },
    ],
    effect: null,
  },

  {
    id: 'imm_asylum_hostel',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.residencyStatus === 'asylum_seeker' && G.age >= 18,
    text: 'The room has six beds and you have been assigned to one of them. The other people are from different countries with different conflicts and no shared language. You learn to sleep through other people\'s nightmares. They learn to sleep through yours. There is a shared bathroom down the hall. You are not allowed to cook. You are here for an indefinite period.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 4; p.r += 8; p.addFlag('hostel_resident') },
  },

  {
    id: 'imm_asylum_decision',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.residencyStatus === 'asylum_seeker' && G.flags.includes('asylum_interview_done') && !G.flags.includes('asylum_decision_received'),
    text: 'The letter arrives. You stand in the hallway with it for several minutes before opening it.',
    choices: [
      { text: 'Approved', tag: null, outcome: 'Refugee status granted. You read the paragraph three times. The word "approved" sits in your chest like a stone and also like a release. You call the one person you are allowed to call.', effect: (p) => { p.m += 20; p.r -= 15; p.setResidency('refugee_status'); p.addFlag('asylum_decision_received'); p.addFlag('asylum_approved') } },
      { text: 'Denied', tag: null, outcome: 'You have thirty days to appeal. Your caseworker, reading from a script, tells you your options. You write them down because you cannot hold them in your head right now.', effect: (p) => { p.m -= 25; p.r += 20; p.addFlag('asylum_decision_received'); p.addFlag('asylum_denied') } },
    ],
    effect: null,
  },

  {
    id: 'imm_asylum_language_class',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.residencyStatus === 'asylum_seeker' || G.residencyStatus === 'refugee_status') && G.age >= 18 && !G.flags.includes('language_class_done'),
    text: 'The language class is mandatory. The teacher, a woman who has taught it for twenty years, speaks slowly and makes jokes that are calibrated to your level and are genuinely funny. You make progress that is real and embarrassingly slow. After six weeks you can ask for directions and read a bus sign. This is not nothing.',
    choices: null,
    effect: (p) => { p.e += 6; p.m += 5; p.s += 3; p.addFlag('language_class_done') },
  },

  {
    id: 'imm_asylum_limbo',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.residencyStatus === 'asylum_seeker' && G.age >= 25 && !G.flags.includes('asylum_decision_received'),
    text: 'It has been three years. The case is still pending. You are not legally permitted to work. You are not permitted to move. You exist inside a bureaucratic pause of indefinite length, and the people in the offices that hold your file are not slow out of malice — they are simply overwhelmed, and you are a number in a queue, and the queue is very long.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 12; p.h -= 5; p.addFlag('immigration_limbo') },
  },

  // ── WORK VISA STRESS ─────────────────────────────────────────────────────────

  {
    id: 'imm_visa_job_trap',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.residencyStatus === 'work_visa' && G.age >= 22 && !G.flags.includes('visa_job_trap_experienced'),
    text: 'Your visa is tied to this employer. This is not a situation that contains obvious exits. Your manager knows it — not threateningly, just structurally. When he assigns you the project nobody else wants, when the promotion goes to the person with a passport from this country, when the hours extend past what was agreed: you absorb it. The alternative is not just unemployment. It is a plane ticket home.',
    choices: [
      { text: 'Endure it — the visa and the experience are worth it', tag: null, outcome: 'You stay two more years. By the end you have what you came for: skills, savings, and a CV that opens other doors.', effect: (p) => { p.m -= 10; p.e += 6; p.w += 5; p.addFlag('visa_job_trap_experienced') } },
      { text: 'Find a new employer willing to sponsor a transfer', tag: null, outcome: 'It takes six months of careful searching. The transfer is bureaucratically complex. You manage it. The new place is better.', effect: (p) => { p.m -= 5; p.e += 3; p.s += 4; p.addFlag('visa_job_trap_experienced') } },
    ],
    effect: null,
  },

  {
    id: 'imm_visa_renewal_form',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.residencyStatus === 'work_visa' && G.age >= 22 && !G.flags.includes('visa_renewal_survived'),
    text: 'The renewal form is forty-seven pages. Every trip outside the country in the past three years. Every address. Employer verification forms that must be notarized. There is a question about prior refusals of visas in any country, ever. You read it four times to make sure you understand exactly what it is asking.',
    choices: [
      { text: 'Do it yourself — carefully, over two weeks', tag: null, outcome: 'You submit it. You wait forty-three days. It is approved. You exhale.', effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('visa_renewal_survived') } },
      { text: 'Pay an immigration lawyer to do it', tag: null, outcome: 'The fee is significant. The lawyer catches two errors you would have made. It is worth every cent.', effect: (p) => { p.mo -= 2000; p.m -= 3; p.addFlag('visa_renewal_survived') } },
    ],
    effect: null,
  },

  {
    id: 'imm_visa_sponsorship_threat',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.residencyStatus === 'work_visa' && G.age >= 22 && !G.flags.includes('sponsorship_threatened'),
    text: 'During the salary dispute, your manager says — quietly, as a statement of fact, not a threat — that the company\'s sponsorship arrangement requires a certain level of performance assessment. You hear what he means. You leave the room and sit in a bathroom stall for ten minutes and then return to your desk.',
    choices: [
      { text: 'Back down — the visa is worth more than the principle right now', tag: null, outcome: 'You accept the outcome. You keep the visa. The knowledge of what you accepted stays.', effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('sponsorship_threatened') } },
      { text: 'Document everything and contact an employment lawyer', tag: null, outcome: 'The lawyer tells you your rights. They are more limited than you hoped. You pursue it anyway, carefully.', effect: (p) => { p.m -= 8; p.e += 4; p.karma += 5; p.addFlag('sponsorship_threatened') } },
    ],
    effect: null,
  },

  {
    id: 'imm_visa_citizenship_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.residencyStatus === 'work_visa' && G.age >= 28,
    text: 'A colleague from this country, well-meaning, asks why you don\'t just apply for citizenship. You explain the waiting periods, the financial requirements, the language tests, the character assessments, the dependent status of your family on each approval. He nods. You can see him trying to absorb this. He says "that sounds really complicated." You say yes.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.e += 2 },
  },

  // ── GAINING STATUS ──────────────────────────────────────────────────────────

  {
    id: 'imm_status_pr_granted',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.residencyStatus === 'work_visa' || G.residencyStatus === 'refugee_status') && G.age >= 25 && !G.flags.includes('pr_granted'),
    text: 'The letter has a green tint to it, which seems deliberate. Permanent residency approved. You have been waiting for this document for four years. You read it twice and put it down. The relief comes in waves over the following week, not all at once — your nervous system has been braced for so long it doesn\'t know how to stop.',
    choices: null,
    effect: (p) => { p.m += 20; p.r -= 10; p.setResidency('permanent_resident'); p.addFlag('pr_granted') },
  },

  {
    id: 'imm_status_citizenship_ceremony',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.residencyStatus === 'permanent_resident' && G.age >= 28 && G.flags.includes('pr_granted') && !G.flags.includes('naturalized_citizen'),
    text: 'You stand in a room with forty other people from thirty other countries and you say an oath to a country that is not the one you were born in. Some people cry. You do not, but you understand why they do. The official shakes your hand. You are given a small flag. On the way home you hold it and try to understand what has just changed and what has not.',
    choices: null,
    effect: (p) => { p.m += 15; p.r += 5; p.setResidency('citizen'); p.addFlag('naturalized_citizen') },
  },

  {
    id: 'imm_status_first_passport',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('naturalized_citizen') && !G.flags.includes('new_passport_received'),
    text: 'The passport arrives in a padded envelope. You open it. Your face looks like it always looks. Your name is spelled correctly. The cover has the emblem of a country you chose, which is a different kind of belonging than a country that chose you by accident of birth. You hold it for longer than you need to.',
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 5; p.addFlag('new_passport_received') },
  },

  {
    id: 'imm_status_return_visit',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('new_passport_received') && G.character.country.name !== G.currentCountry?.name && !G.flags.includes('returned_on_new_passport'),
    text: 'You fly back to the country you were born in. The border officer looks at your passport — the new one — and then at you, and something crosses his face that is not hostility but is not warmth either. He stamps it. You walk through. On the other side, everything is both familiar and unmistakably foreign. You are a visitor now in the place that made you.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 12; p.e += 4; p.addFlag('returned_on_new_passport') },
  },

  // ── BEING CAUGHT / DEPORTED ──────────────────────────────────────────────────

  {
    id: 'imm_detained_check',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.residencyStatus === 'undocumented' || G.residencyStatus === 'tourist_overstay') && G.age >= 18 && !G.flags.includes('imm_detained'),
    text: 'They stop you on the street for a document check. Two officers, professional, not aggressive. You give your name. They radio it in. While you wait, which takes eleven minutes, you are very still and your mind is performing calculations about all the possible outcomes and their downstream effects. One of the officers looks at you, not unkindly.',
    choices: [
      { text: 'Cooperate fully — you have no other option', tag: null, outcome: 'They take your details and issue a notice to appear. You have been given time you did not expect to have.', effect: (p) => { p.m -= 20; p.r += 15; p.addFlag('imm_detained'); p.addFlag('notice_to_appear') } },
      { text: 'Give a false name — you have nothing else', tag: null, outcome: 'It buys you nothing. The address on the notice is wrong. It makes what comes next more complicated and not less.', effect: (p) => { p.m -= 25; p.r += 15; p.karma -= 8; p.addFlag('imm_detained') } },
    ],
    effect: null,
  },

  {
    id: 'imm_deportation_hearing',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('imm_detained') && !G.flags.includes('deportation_hearing_done'),
    text: 'You have a lawyer — a duty lawyer, who has met you once. The hearing room is small. A judge reads a summary of your case from a file. You are given time to speak. You have been in this country for six years. You pay taxes, or you did when you could. You have people here. You say these things. The judge takes notes.',
    choices: [
      { text: 'Make the strongest case you can — every detail matters', tag: null, outcome: 'The hearing is continued to a second date. There is no resolution. But there is more time, and time has its uses.', effect: (p) => { p.m -= 15; p.r += 8; p.e += 3; p.addFlag('deportation_hearing_done') } },
      { text: 'Accept the outcome — you are exhausted and have no more fight left', tag: null, outcome: 'The order is signed. You have fourteen days. You spend them in a specific kind of grief that has no name in either of your languages.', effect: (p) => { p.m -= 25; p.r += 18; p.addFlag('deportation_hearing_done'); p.addFlag('deportation_ordered') } },
    ],
    effect: null,
  },

  {
    id: 'imm_deported',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('deportation_ordered') && !G.flags.includes('deported'),
    text: 'The flight is at 6 AM. An officer accompanies you to the gate. He is not unkind. You have one bag. Everything else was left with people who said they would hold it. The shame is not about what you did — you were trying to live — but about returning without the thing you went to get. During the flight you do not sleep. You think about what comes next with the specific clarity of someone who has no other choice but to plan.',
    choices: [
      { text: 'Start planning the return immediately', tag: null, outcome: 'The knowledge you accumulated doesn\'t disappear. The route back is different but it exists.', effect: (p) => { p.m -= 20; p.r += 15; p.e += 3; p.setResidency('citizen'); p.addFlag('deported') } },
      { text: 'Accept this chapter is closed', tag: null, outcome: 'You build something here. It is not what you imagined. It is something.', effect: (p) => { p.m -= 15; p.r += 10; p.setResidency('citizen'); p.addFlag('deported') } },
    ],
    effect: null,
  },

  // ── INTEGRATION DEPTH ────────────────────────────────────────────────────────

  {
    id: 'imm_integration_accent',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.residencyStatus === 'permanent_resident' || G.residencyStatus === 'citizen') && G.flags.includes('emigrated') && G.age >= 30 && !G.flags.includes('accent_receding'),
    text: 'You catch yourself dreaming in the new language. The accent is still there — it will always be there, to some people — but it is softer than it was. A shopkeeper guesses a different country from the right one. Your old friends back home notice when you call: the cadence has changed. You are becoming someone they recognize less. You are not sure how you feel about this.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 8; p.e += 3; p.addFlag('accent_receding') },
  },

  {
    id: 'imm_integration_children_correct',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.residencyStatus === 'permanent_resident' || G.residencyStatus === 'citizen') && G.flags.includes('emigrated') && G.children && G.children.length > 0 && G.age >= 35,
    text: 'Your child corrects your pronunciation at the dinner table. Not cruelly — they learned it at school and they are proud of knowing. They do not understand that the correction contains an entire taxonomy of distance. You repeat the word the way they say it. You both smile. Later you say it your way under your breath, quietly, for yourself.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 10; p.s += 3 },
  },

  {
    id: 'imm_integration_two_languages',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.residencyStatus === 'permanent_resident' || G.residencyStatus === 'citizen') && G.flags.includes('emigrated') && G.age >= 40,
    text: 'You live in two languages and belong completely to neither. In the first language you have the vocabulary for childhood, for grief, for the names of plants your grandmother grew. In the second you have the language for work, for bureaucracy, for the life you built. The gap between them is not a deficit. You have come to understand it as a specific kind of depth that people who only have one language cannot quite access.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.r += 5; p.addFlag('bilingual_integration') },
  },

  // ── SECOND-GENERATION IDENTITY ───────────────────────────────────────────────

  {
    id: 'imm_secondgen_child_language',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('emigrated') && G.children && G.children.length > 0 &&
      G.age >= 35 && !G.mem?.secondgenLanguage,
    text: 'Your child answers in the language of this country. You spoke to them in the language of home — you tried, you were consistent — but the school won and the friends won and the television won. They understand the words you say. They cannot yet say the words you mean.',
    choices: [
      {
        text: 'Accept it — they are building their own life here',
        tag: null,
        outcome: 'You make peace with it. The connection holds in different forms.',
        effect: (p) => { p.m -= 6; p.r += 6; p.setMem('secondgenLanguage', true) },
      },
      {
        text: 'Insist — enroll them in heritage language classes',
        tag: null,
        outcome: 'They complain. They attend. In their thirties, they will be glad.',
        effect: (p) => { p.m -= 3; p.mo -= 500; p.e += 3; p.addFlag('heritage_language_preserved'); p.setMem('secondgenLanguage', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_secondgen_homeland_question',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('emigrated') && G.children && G.children.length > 0 &&
      G.age >= 38 && !G.mem?.secondgenHomeland,
    text: 'Your child asks why you left the country where you were born. You answer the practical version. They ask a follow-up that you were not expecting and that requires the real version. You give them as much of it as you think they are ready for, which is more than you expected to say and less than the whole of it.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 8; p.e += 4; p.addFlag('told_children_story'); p.setMem('secondgenHomeland', true) },
  },

  {
    id: 'imm_secondgen_values_clash',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('emigrated') && G.children && G.children.length > 0 &&
      G.age >= 42 && !G.mem?.secondgenValues,
    text: 'Your child wants something — a relationship, a career direction, a way of being in the world — that would have been unthinkable in the place you came from. Here it is ordinary. You have brought them to a country whose values have made them different from you in ways you chose and also did not fully anticipate.',
    choices: [
      {
        text: 'Support them — this is what you came for',
        tag: null,
        outcome: 'You give them what you did not have: permission to be exactly themselves.',
        effect: (p) => { p.m += 8; p.karma += 10; p.updateChildRel(0, 15); p.setMem('secondgenValues', true) },
      },
      {
        text: 'Hold the line on what matters to you — some things do not change',
        tag: null,
        outcome: 'The tension between your worlds becomes the texture of your relationship.',
        effect: (p) => { p.m -= 6; p.r += 8; p.updateChildRel(0, -10); p.setMem('secondgenValues', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_secondgen_trip_home',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('emigrated') && G.children && G.children.length > 0 &&
      G.character.country.name !== G.currentCountry?.name && G.age >= 40 && !G.mem?.secondgenTripHome,
    text: (G) =>
      `You take your child to ${G.character.country.name} for the first time. They are polite and observant and slightly overwhelmed. They eat things and say they are good. They meet cousins they have only seen on screens. You watch them experiencing the place that made you and understand that it will never be the same place for them that it was for you. This is the correct outcome. It is also something like grief.`,
    choices: null,
    effect: (p) => { p.m += 5; p.r += 10; p.updateChildRel(0, 10); p.addFlag('took_children_to_homeland'); p.setMem('secondgenTripHome', true) },
  },

  // ── REFUGEE RESETTLEMENT ARC ─────────────────────────────────────────────────
  // Fires after 'asylum_approved'. Depicts the actual experience of landing
  // in a third country, navigating bureaucracy, first job, first real home.

  {
    id: 'imm_resettlement_arrival',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.includes('asylum_approved') &&
      G.residencyStatus === 'refugee_status' &&
      !G.mem?.resettlementArrival &&
      G.age >= 18,
    text: (G) => {
      const dest = G.currentCountry?.name ?? 'the new country'
      return `You are processed at the airport in ${dest} on a Tuesday morning. A caseworker meets you with a folder — appointments, numbers to call, the address of the accommodation. The folder is comprehensive in a way that assumes you already know how everything works. You do not know how anything works. The caseworker is kind. You follow her to a car and watch the country through the window and understand nothing you are seeing.`
    },
    choices: [
      {
        text: 'Learn everything — ask every question, read every document',
        tag: null,
        outcome: 'The folder becomes dog-eared. You learn the bus route, the office hours, the specific person at the welfare office who is more patient than the others. The knowledge is its own foothold.',
        effect: (p) => { p.e += 6; p.m -= 8; p.addFlag('resettlement_arrived'); p.setMem('resettlementArrival', true) },
      },
      {
        text: 'Focus on finding other people from home',
        tag: null,
        outcome: 'There is a community. Small, dispersed, but real. They explain things the folder does not. They feed you the first food that tastes like something.',
        effect: (p) => { p.m += 2; p.s += 4; p.addFlag('resettlement_arrived'); p.addFlag('diaspora_community'); p.setMem('resettlementArrival', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_resettlement_housing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('resettlement_arrived') &&
      !G.mem?.resettlementHousing &&
      G.age >= 18,
    text: 'The temporary accommodation is a room in a building with twelve other people. The walls are thin. You share a kitchen. There is a woman down the hall who is from a country very close to yours — close enough that the languages are partially mutual. She explains how the system works in terms the folder never used: that the waiting list for proper housing is two years, that you can contest a decision if you have the right form, that the social worker on Thursdays is better than the one on Mondays.',
    choices: [
      {
        text: 'Work every legitimate channel to move up the housing list',
        tag: null,
        outcome: 'The paperwork is endless and the results are slow. After eleven months you receive a letter. A flat. Yours. The key is cold in your hand.',
        effect: (p) => { p.m += 15; p.r -= 10; p.e += 4; p.addFlag('first_own_home'); p.setMem('resettlementHousing', true) },
      },
      {
        text: 'Build a life in the temporary room — it\'s shelter',
        tag: null,
        outcome: 'You make the room habitable. A photograph. A plant. The impermanence becomes liveable, which is not the same as resolved.',
        effect: (p) => { p.m += 5; p.r += 5; p.addFlag('adaptive_resilience'); p.setMem('resettlementHousing', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_resettlement_first_job',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('resettlement_arrived') &&
      !G.mem?.resettlementFirstJob &&
      G.age >= 18,
    text: (G) => {
      const prevEdu = G.flags.includes('university_graduate') || G.flags.includes('first_gen_graduate')
      if (prevEdu) {
        return 'Your qualifications are not recognized here. The engineer who applies for the engineering position receives a letter saying foreign credentials require a two-year assessment process. You take the warehouse job. You are not the only overqualified person on your shift. This is understood between you without being discussed.'
      }
      return 'The job centre places you in a food processing plant. Early shift. The supervisor speaks slowly and clearly when he addresses you, which is kind and also slightly reductive. You work carefully and do not make errors. After two weeks he stops speaking slowly. After six weeks he gives you the better machine.'
    },
    choices: [
      {
        text: 'Take the job and build from there',
        tag: null,
        outcome: 'The foothold is real even if it is not the foothold you expected. You build from it.',
        effect: (p) => { p.mo += 800; p.m += 6; p.addFlag('first_job_resettlement'); p.setMem('resettlementFirstJob', true) },
      },
      {
        text: 'Keep looking for something that uses what you actually know',
        tag: null,
        outcome: 'The search takes longer than the warehouse would have. When it ends, the result is better.',
        effect: (p) => { p.m -= 6; p.e += 5; p.addFlag('first_job_resettlement'); p.setMem('resettlementFirstJob', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_resettlement_language',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('resettlement_arrived') &&
      !G.mem?.resettlementLanguage &&
      G.age >= 18,
    text: 'The language class is two evenings a week. Everyone in the class is from somewhere different. The teacher is patient in the way that only people who have chosen this work are patient. The vocabulary you learn first is practical: emergency, I need, where is. Then: thank you, please, I understand. The last phrase is the one you use before you fully mean it, as a bridge toward meaning it.',
    choices: [
      {
        text: 'Commit to it — total immersion outside the class too',
        tag: null,
        outcome: 'The television. The shop conversations. The small notebook for new words. After a year, you stop translating in your head before speaking.',
        effect: (p) => { p.e += 8; p.s += 5; p.addFlag('language_learned_resettlement'); p.addFlag('heritage_language_preserved'); p.setMem('resettlementLanguage', true) },
      },
      {
        text: 'Learn enough to function — your home language is still your real language',
        tag: null,
        outcome: 'The functional threshold is higher than you expected. You cross it. The mother tongue stays alive in the community around you.',
        effect: (p) => { p.e += 4; p.s += 2; p.addFlag('language_learned_resettlement'); p.addFlag('heritage_language_preserved'); p.setMem('resettlementLanguage', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'imm_resettlement_contact_home',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('resettlement_arrived') &&
      !G.mem?.resettlementContactHome,
    text: (G) => {
      const origin = G.character.country.name
      return `You have a number for your sister in ${origin}. The connection drops twice before you hear her voice clearly. She asks if you are safe. You say yes. She asks what it is like. You try to describe it and stop. The gap between what you are experiencing and what she can imagine is not her fault or yours. You tell her you are well and that you miss her and that you are working on it. All three things are true.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.r += 10; p.s += 3; p.addFlag('maintained_contact_home'); p.setMem('resettlementContactHome', true) },
  },

  {
    id: 'imm_resettlement_anniversary',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.includes('resettlement_arrived') &&
      G.mem?.resettlementArrival &&
      !G.mem?.resettlementAnniversary &&
      G.age >= 19,
    text: 'One year. You have a flat and a job and a transit pass and a bank account and a phone plan and a medical card. A year ago you had none of these things and could not have explained how to get them. You have not become a different person. You have become the same person with a different set of tools and a different city behind your eyes. The counting of the specific things you now have is a private ceremony that nobody sees.',
    choices: null,
    effect: (p) => { p.m += 14; p.r -= 12; p.addFlag('resettlement_established'); p.setMem('resettlementAnniversary', true) },
  },

]

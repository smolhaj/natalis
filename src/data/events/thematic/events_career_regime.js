// events_career_regime.js
// Events that fire when a specific career intersects with a specific regime or
// under-resourced country context. Profession + political reality = story.
// All gate on G.career?.field or G.career?.id combined with G.regime or archetype.

const authoritarianRegimes = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy']
const repressiveRegime = (G) => authoritarianRegimes.includes(G.regime)

export const CAREER_REGIME_EVENTS = [

  // ── JOURNALIST UNDER AUTHORITARIAN REGIMES ───────────────────────────────────

  {
    id: 'creg_journalist_unpublishable',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.age >= 22,
    text: 'You have verified the story three times. The sources are real. The documents are real. You know it will not run. The editorial meeting lasts eight minutes and nobody raises their voice. You file the notes in a folder on a hard drive you keep at home.',
    choices: [
      { text: 'Keep the file. It will matter someday.', tag: null, outcome: 'The folder grows. You tell yourself this is the long game.', effect: (p) => { p.m -= 6; p.e += 5; p.addFlag('journalist_suppressed_story'); p.addFlag('double_consciousness') } },
      { text: 'Leak it to a foreign outlet anonymously', tag: null, outcome: 'The story runs in a newspaper three countries away. Nobody here can say it. You read it on your phone with the curtains drawn.', effect: (p) => { p.m += 4; p.r += 8; p.addFlag('journalist_leaked_abroad'); p.addFlag('dissident_reader') } },
    ],
    effect: null,
  },
  {
    id: 'creg_journalist_arrested_source',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.age >= 23,
    text: 'The source you met twice in a coffee shop near the train station has been arrested. You don\'t know what they told the interrogators. You don\'t know if your name came up. For two weeks you do not sleep well. For two months you do not contact any source at all.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('journalist_source_arrested'); p.addFlag('surveillance_paranoia') },
  },
  {
    id: 'creg_journalist_editor_spike',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.age >= 28,
    text: 'The editor calls you in before the morning meeting. She sits behind her desk without her jacket on and tells you the story cannot run. The ministry called. She doesn\'t say what was said. She says: find something else to work on. You look at her and she looks at the window.',
    choices: [
      { text: 'Accept it. You need this job.', tag: null, outcome: 'You find something else to work on. The original story hardens in you like a stone you carry.', effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('censored_journalist'); p.addFlag('compromised') } },
      { text: 'Resign. You will not do this work like this.', tag: null, outcome: 'You clean out your desk the same afternoon. You are broke within three months. You are also free in a way you haven\'t been in years.', effect: (p) => { p.m += 6; p.mo -= 4000; p.r += 5; p.addFlag('resigned_on_principle'); p.addFlag('independent_thinker') } },
    ],
    effect: null,
  },
  {
    id: 'creg_journalist_foreign_correspondent',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.age >= 24,
    text: 'A foreign correspondent joins your newsroom for a week. She asks why local reporters are so careful. You give her the official answer. She looks at you. You give her the real one, briefly, in a stairwell, and she writes it down in a notebook you notice she keeps in an inside pocket.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 6; p.s += 3; p.addFlag('double_consciousness'); p.addFlag('journalist_confided_to_foreign') },
  },
  {
    id: 'creg_journalist_car_outside',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.age >= 26 && G.flags.includes('journalist_suppressed_story'),
    text: 'There is a car outside your office. It is there when you arrive and there when you leave. It is there the next day. The licence plate is not a number you can trace. Nobody has approached you. Nobody has said anything. After a week you understand that the point is that you notice it.',
    choices: [
      { text: 'Stop pursuing the story. This is not worth dying for.', tag: null, outcome: 'You stop. The car disappears after three days. You are not sure what this means.', effect: (p) => { p.m -= 12; p.r += 12; p.addFlag('intimidated_into_silence'); p.addFlag('compromised') } },
      { text: 'Continue working. They would have arrested you already if they were going to.', tag: null, outcome: 'The car stays for ten more days and then is gone. You finish the story. You still cannot publish it.', effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('journalist_refused_intimidation'); p.addFlag('dissident_reader') } },
    ],
    effect: null,
  },
  {
    id: 'creg_journalist_exile_choice',
    phase: 'midlife',
    weight: 1,
    when: (G) => G.career?.field === 'media' && repressiveRegime(G) && G.flags.includes('journalist_suppressed_story') && G.age >= 30,
    text: 'A news organisation in another country has offered you a position. You have been here your whole life. Your parents are here. The work you cannot do here, you could do there. The editor of the foreign paper is waiting for an answer by the end of the month.',
    choices: [
      { text: 'Go. The work matters more than the address.', tag: null, outcome: 'You go. The first story you publish there is the one you could not publish here. It runs on the front page.', effect: (p) => { p.m += 10; p.r += 8; p.addFlag('journalist_in_exile'); p.setResidency('work_visa') } },
      { text: 'Stay. This is your country. You will find a way.', tag: null, outcome: 'You stay. The ways you find grow smaller each year.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('chose_to_stay_under_repression') } },
    ],
    effect: null,
  },

  // ── DOCTOR / NURSE IN UNDER-RESOURCED SYSTEMS ────────────────────────────────

  {
    id: 'creg_doctor_rationing',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'healthcare' && ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 24,
    text: 'There are three patients who need the antibiotic and four vials left in the pharmacy. The pharmacist tells you this without looking at you. You stand in the corridor for a moment and then make the decision you are going to have to live with.',
    choices: [
      { text: 'Triage strictly — give it to those most likely to survive', tag: null, outcome: 'Two patients recover. One does not. You fill out the paperwork and go home.', effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('made_triage_decision'); p.addFlag('healthcare_scarcity') } },
      { text: 'Split the dosage — everyone gets something', tag: null, outcome: 'The outcomes are uncertain. You write up the protocol breach and submit it to the medical director who has seen this before.', effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('healthcare_scarcity') } },
    ],
    effect: null,
  },
  {
    id: 'creg_doctor_no_equipment',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'healthcare' && ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 28,
    text: 'A patient needs an MRI. There is one in the country, in the teaching hospital in the capital, four hundred kilometers away. The patient does not have money for the journey. You write a referral you know will go nowhere. You add it to the list of things you have stopped saying out loud.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('healthcare_scarcity'); p.addFlag('witnessed_structural_failure') },
  },
  {
    id: 'creg_doctor_aid_shipment',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'healthcare' && ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 26,
    text: 'A container arrives from a European medical charity. Gloves, bandages, two ultrasound machines, medication close to its expiry date. The staff gather in the car park to unload it. There is relief, and something underneath the relief that is more difficult to name.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 6; p.addFlag('received_aid_shipment') },
  },
  {
    id: 'creg_doctor_brain_drain',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'healthcare' && ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 30,
    text: 'A colleague you trained with has taken a position in Germany. Before her, it was two others. The hospital has lost six doctors in eighteen months. The government has a plan. You have read the plan. The hospital has seventeen doctors left.',
    choices: [
      { text: 'Apply for a position abroad — you have done enough here', tag: null, outcome: 'The guilt is real and not straightforward. So is the salary.', effect: (p) => { p.m -= 8; p.r += 10; p.mo += 8000; p.addFlag('considered_emigration'); p.setResidency('work_visa') } },
      { text: 'Stay. The patients here have no one else.', tag: null, outcome: 'You stay. Your colleague sends photographs of the Rhine. You do not reply for three weeks.', effect: (p) => { p.m -= 5; p.r += 5; p.karma += 10; p.addFlag('stayed_for_community') } },
    ],
    effect: null,
  },
  {
    id: 'creg_doctor_outbreak',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'healthcare' && ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 24,
    text: 'The first case comes in on a Tuesday. By Friday there are eleven. The supplies that are supposed to exist for this — the PPE, the isolation protocol, the hotline to the ministry — are partial, delayed, or theoretical. You suit up in what you have.',
    choices: [
      { text: 'Work through it. This is what you trained for.', tag: null, outcome: 'You work for three weeks without a day off. Two colleagues fall ill. You do not.', effect: (p) => { p.h -= 10; p.m -= 8; p.karma += 12; p.addFlag('outbreak_survivor'); p.addFlag('healthcare_scarcity') } },
      { text: 'Request emergency evacuation — you have a family.', tag: null, outcome: 'The paperwork takes eleven days. The outbreak ends before it arrives.', effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('healthcare_scarcity') } },
    ],
    effect: null,
  },

  // ── SOLDIER SENT TO ACTUAL WAR ────────────────────────────────────────────────

  {
    id: 'creg_soldier_deployment_orders',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'military' && G.age >= 18 && G.age <= 28 && (
      G.currentYear >= 2001 || ['conflict_zone', 'developing_unstable', 'subsaharan'].includes(G.character.country.archetype)
    ),
    text: 'The orders arrive on a Thursday. You are shipping out in three weeks. The name of the place is one you have heard on the news in a way that has a specific quality — the way names of places acquire weight. You call your family. You do not say the things you mean to say.',
    choices: [
      { text: 'Go without complaint. It\'s what you signed up for.', tag: null, outcome: 'You pack your kit on a Sunday night and do not look at the room when you leave.', effect: (p) => { p.m -= 8; p.addFlag('deployment_orders'); p.addFlag('military_service') } },
      { text: 'Request a transfer or delay through official channels', tag: null, outcome: 'The request is denied. You go anyway. The attempt is on your record.', effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('deployment_orders'); p.addFlag('military_service') } },
    ],
    effect: null,
  },
  {
    id: 'creg_soldier_first_engagement',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'military' && G.flags.includes('deployment_orders') && G.age >= 19,
    text: 'You have thought about this moment many times since training. The reality has a different texture than anything you prepared for. It is faster, louder, more confusing, and more total. Afterwards you sit against a wall and eat half a ration pack and cannot remember doing it.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('combat_veteran'); p.addFlag('first_engagement') },
  },
  {
    id: 'creg_soldier_civilian_casualty',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'military' && G.flags.includes('combat_veteran') && G.age >= 19,
    text: 'You see a civilian casualty. The details do not need to be more specific than that. You cannot un-see it. You write nothing about it in letters home. You look at the photographs of your family on your phone and cannot connect the two worlds.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 15; p.addFlag('witnessed_civilian_casualty'); p.addFlag('moral_injury') },
  },
  {
    id: 'creg_soldier_returning_home',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'military' && G.flags.includes('combat_veteran') && G.age >= 21,
    text: 'You come home. People say welcome back and ask if it was bad and you say it was fine. The street where you grew up is exactly the same and you are not. You sit in a restaurant and cannot stop watching the door.',
    choices: [
      { text: 'Talk to someone — a veteran\'s group, a therapist, anyone', tag: null, outcome: 'The words come slowly at first. They come. Something lightens.', effect: (p) => { p.m += 8; p.r -= 5; p.addFlag('sought_help_after_combat') } },
      { text: 'Work through it alone. You\'ve managed worse.', tag: null, outcome: 'You manage. The management has costs that appear later, sideways.', effect: (p) => { p.m -= 8; p.r += 8; p.h -= 4; p.addFlag('suppressed_trauma') } },
    ],
    effect: null,
  },
  {
    id: 'creg_soldier_friend_lost',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'military' && G.flags.includes('combat_veteran') && G.age >= 20,
    text: 'Someone from your unit does not come back. You knew him well enough to know the things he was afraid of and the music he listened to when he thought no one was watching. You attend the funeral and shake hands with his mother and she thanks you for coming.',
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 15; p.addFlag('lost_friend_in_war'); p.addFlag('bereaved') },
  },

  // ── TEACHER IN REPRESSIVE / UNDER-RESOURCED CONTEXTS ─────────────────────────

  {
    id: 'creg_teacher_false_curriculum',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'education' && (G.regime === 'single_party_communist' || G.regime === 'military_dictatorship') && G.age >= 22,
    text: 'The curriculum says certain things about history. You know some of them are wrong — not approximately wrong, but designed to be wrong. A student asks a question that shows she is starting to reason for herself. You give the approved answer. You go home and sit with the specific feeling this produces.',
    choices: [
      { text: 'Teach the official curriculum. Your job, your family.', tag: null, outcome: 'You teach what you are told. The best students learn to read your silences.', effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('taught_false_curriculum'); p.addFlag('double_consciousness') } },
      { text: 'Find small ways to show students how to think for themselves', tag: null, outcome: 'You assign questions without answers. You teach method instead of conclusion. It is slow and deniable. It is something.', effect: (p) => { p.m -= 6; p.e += 5; p.addFlag('quiet_resistance'); p.addFlag('independent_thinker') } },
    ],
    effect: null,
  },
  {
    id: 'creg_teacher_hungry_student',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'education' && ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 24,
    text: 'You can tell. After a while you learn to tell. A girl in the third row has not eaten since yesterday. She is attentive in the particular way of someone working very hard to concentrate through something. You teach the lesson. At the end you find a reason to keep her after class.',
    choices: [
      { text: 'Give her food from your own bag without making it a thing', tag: null, outcome: 'She takes it without comment. She comes back tomorrow.', effect: (p) => { p.m += 5; p.karma += 10; p.addFlag('fed_a_student') } },
      { text: 'Refer her to the school social services', tag: null, outcome: 'The referral takes three weeks to process. You give her food in the meantime.', effect: (p) => { p.m += 3; p.karma += 8; p.addFlag('fed_a_student') } },
    ],
    effect: null,
  },
  {
    id: 'creg_teacher_no_books',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'education' && ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 22,
    text: 'The textbooks were promised in September. It is February. The ministry says they are coming. You have thirty-four students and three books. You have been writing the curriculum on the chalkboard for five months. Your handwriting has improved considerably.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.karma += 5; p.addFlag('taught_without_resources') },
  },
  {
    id: 'creg_teacher_brilliant_student',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'education' && G.age >= 28,
    text: 'There is one student this year who is exceptional — not just clever but genuinely singular. Her family needs her to leave school at fifteen to work. You write letters to scholarship foundations. You attend a meeting with the family. You explain what you see.',
    choices: [
      { text: 'Keep pushing. She deserves the chance.', tag: null, outcome: 'The scholarship comes through. She goes. She sends a letter from university that you keep in your desk for years.', effect: (p) => { p.m += 15; p.karma += 12; p.addFlag('changed_a_life') } },
      { text: 'Accept the family\'s decision. It is not your life.', tag: null, outcome: 'She leaves school. You see her sometimes at the market. She nods.', effect: (p) => { p.m -= 10; p.r += 10; p.addFlag('witnessed_potential_lost') } },
    ],
    effect: null,
  },
  {
    id: 'creg_teacher_student_arrested',
    phase: 'midlife',
    weight: 1,
    when: (G) => G.career?.field === 'education' && repressiveRegime(G) && G.age >= 26,
    text: 'A student you liked — one you pushed to write more, to argue more, to ask more — is arrested. The official reason is vague. You assigned the essay he was apparently writing when they came for him. You sit with this for a long time. You continue assigning essays.',
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 15; p.addFlag('student_arrested'); p.addFlag('moral_injury') },
  },

  // ── POLICE OFFICER UNDER CORRUPT REGIMES ─────────────────────────────────────

  {
    id: 'creg_police_disperse_protest',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'law_enforcement' && repressiveRegime(G) && G.age >= 20,
    text: 'The order comes down: disperse the crowd. You look at the crowd. They are standing with signs. Some of them are students. The order is clear. Your sergeant is watching you.',
    choices: [
      { text: 'Follow the order', tag: null, outcome: 'You move in. The crowd scatters. You write a report that uses the approved language for what happened.', effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('dispersed_protest'); p.addFlag('compromised') } },
      { text: 'Hang back. Let others carry this.', tag: null, outcome: 'Your sergeant notices. You are moved to a different assignment. You consider this a fair trade.', effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('avoided_direct_order') } },
    ],
    effect: null,
  },
  {
    id: 'creg_police_colleague_bribes',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'law_enforcement' && (G.regime === 'military_dictatorship' || G.regime === 'single_party_authoritarian' || ['developing_unstable', 'subsaharan'].includes(G.character.country.archetype)) && G.age >= 20,
    text: 'Your partner takes money from a driver at a checkpoint. Not subtly — he does it with the ease of long practice. He counts it, pockets it, and waves the car through. He does not look at you to check your reaction, which tells you he already knows what it will be.',
    choices: [
      { text: 'Say nothing. Survival requires understanding how things work here.', tag: null, outcome: 'You say nothing. He begins to include you in the split without asking.', effect: (p) => { p.mo += 200; p.m -= 10; p.r += 8; p.addFlag('compromised'); p.addFlag('saw_colleague_bribe') } },
      { text: 'Tell him you will not be part of this', tag: null, outcome: 'He shrugs. He stops including you. The cold from your colleagues lasts for months.', effect: (p) => { p.m -= 8; p.s -= 4; p.addFlag('refused_corruption'); p.addFlag('integrity') } },
    ],
    effect: null,
  },
  {
    id: 'creg_police_falsify_report',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'law_enforcement' && repressiveRegime(G) && G.age >= 26,
    text: 'Your commander needs the report to say something different from what happened. The phrasing he wants is specific. He does not ask you to lie. He asks you to be more precise. You understand the distinction is administrative. The outcome is the same.',
    choices: [
      { text: 'Write what he asks', tag: null, outcome: 'The report is accepted. A man is held on the strength of it.', effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('falsified_report'); p.addFlag('compromised') } },
      { text: 'Write what you saw and submit it', tag: null, outcome: 'The report disappears into a review process. Your commander stops greeting you in the hallway.', effect: (p) => { p.m -= 6; p.karma += 8; p.addFlag('refused_to_falsify_report'); p.addFlag('integrity') } },
    ],
    effect: null,
  },
  {
    id: 'creg_police_untrusted_community',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'law_enforcement' && G.age >= 24,
    text: 'You are assigned to a neighborhood where people watch you from doorways and do not call the police when things happen. You understand why. You have read the history of what happened here before you arrived. You are wearing the same uniform.',
    choices: [
      { text: 'Try to build something different. It is slow work.', tag: null, outcome: 'An old woman eventually speaks to you without crossing the street first. It takes two years.', effect: (p) => { p.m += 5; p.karma += 8; p.s += 4; p.addFlag('rebuilt_community_trust') } },
      { text: 'Do the job as defined. You cannot fix history alone.', tag: null, outcome: 'You do the job. The distrust remains. It is not your fault and also it is present and you carry it.', effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('policed_untrusting_community') } },
    ],
    effect: null,
  },

  // ── CIVIL SERVANT UNDER REGIME CHANGE ────────────────────────────────────────

  {
    id: 'creg_civil_loyalty_declaration',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'government' && G.age >= 28 && G.character.country.regimeHistory?.some(r =>
      Math.abs(r.year - G.currentYear) <= 3
    ),
    text: 'The new administration has circulated a loyalty declaration. The old one had a similar form — different wording, same intent. You have a pension, a mortgage, seventeen years of institutional knowledge. You pick up the pen.',
    choices: [
      { text: 'Sign it. The machinery of the state is not about the person at the top.', tag: null, outcome: 'You sign. You are good at your job and continue to be. The form is filed.', effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('signed_loyalty_declaration'); p.addFlag('pragmatic_compliance') } },
      { text: 'Refuse. There are things you will not put your name to.', tag: null, outcome: 'Your file is reviewed. You are reassigned to a less significant office. The pension is safe.', effect: (p) => { p.m += 3; p.r += 5; p.addFlag('refused_loyalty_declaration'); p.addFlag('independent_thinker') } },
    ],
    effect: null,
  },
  {
    id: 'creg_civil_harmful_policy',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'government' && G.age >= 30,
    text: 'You are the senior officer who will implement the new housing policy. You have read the data. You know who will be displaced. The minister has announced it as a modernization program. The press release you helped write uses the word "regeneration."',
    choices: [
      { text: 'Implement it as instructed. This is your role.', tag: null, outcome: 'The policy proceeds. Five years later a parliamentary report notes its effects on low-income communities.', effect: (p) => { p.m -= 10; p.r += 12; p.addFlag('implemented_harmful_policy'); p.addFlag('compromised') } },
      { text: 'Commission an independent impact study to document what you know', tag: null, outcome: 'The study is published. The minister\'s office is displeased. The record is there.', effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('documented_policy_harm'); p.addFlag('integrity') } },
    ],
    effect: null,
  },
  {
    id: 'creg_civil_purge_of_colleagues',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'government' && repressiveRegime(G) && G.age >= 30,
    text: 'Colleagues who were prominent under the previous government are disappearing from their offices. Not dramatically — just quietly reassigned, or suddenly on extended leave. You have been here long enough to understand which way this goes.',
    choices: [
      { text: 'Keep your head down. You were always apolitical.', tag: null, outcome: 'You survive the purge. Four colleagues do not. You write three of them neutral references.', effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('survived_purge'); p.addFlag('authoritarian_veteran') } },
      { text: 'Document what you are seeing and reach out to civil society contacts', tag: null, outcome: 'The information reaches a human rights organisation. Your name is not on the document. You hope.', effect: (p) => { p.m -= 8; p.karma += 10; p.addFlag('witnessed_purge'); p.addFlag('quiet_resistance') } },
    ],
    effect: null,
  },
  {
    id: 'creg_civil_desk_corruption',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'government' && (G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || ['developing_unstable', 'subsaharan'].includes(G.character.country.archetype)) && G.age >= 26,
    text: 'The envelope is left on your desk. It is not labeled. The amount is not large enough to be noticed. It correlates precisely with a permit application that has been pending for six weeks. You sit with it for an hour before touching it.',
    choices: [
      { text: 'Leave the envelope on your supervisor\'s desk and say nothing', tag: null, outcome: 'The envelope disappears. The permit is approved anyway. You are not promoted for two years.', effect: (p) => { p.m -= 4; p.karma += 5; p.addFlag('refused_bribe') } },
      { text: 'Process the permit and keep the envelope', tag: null, outcome: 'The envelope becomes the first of several. The system has its own logic.', effect: (p) => { p.mo += 300; p.m -= 10; p.r += 8; p.addFlag('compromised'); p.addFlag('paid_bribe') } },
    ],
    effect: null,
  },

  // ── FARMER UNDER LAND REFORM / DISPLACEMENT ──────────────────────────────────

  {
    id: 'creg_farmer_collectivization',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'agriculture' && G.regime === 'single_party_communist' && G.age >= 20,
    text: 'The collectivization order arrives. The land that your family has worked for two generations is now state property. You will continue to farm it and receive a wage. The official explains this is an improvement. You do not say anything.',
    choices: [
      { text: 'Accept it. Resistance is not an option here.', tag: null, outcome: 'You work the collective farm. The yields are lower. Nobody says why.', effect: (p) => { p.w -= 8; p.m -= 15; p.r += 12; p.addFlag('collectivized'); p.addFlag('pragmatic_compliance') } },
      { text: 'Resist through slowdowns and informal arrangements', tag: null, outcome: 'You tend a small private plot at the edge. You feed the family from it. This is technically illegal and universally understood.', effect: (p) => { p.w -= 5; p.m -= 8; p.r += 6; p.addFlag('collectivized'); p.addFlag('quiet_resistance') } },
    ],
    effect: null,
  },
  {
    id: 'creg_farmer_displacement',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'agriculture' && ['developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country.archetype) && G.age >= 30,
    text: 'The company representative arrives with a government letter. A mining concession or a dam project — something with a national interest name on the paperwork. The compensation figure is stated as final. You look at the field you have farmed for fifteen years.',
    choices: [
      { text: 'Refuse to sign and organize with neighboring farmers', tag: null, outcome: 'The campaign delays the project by eighteen months. The project proceeds. You receive a slightly higher figure.', effect: (p) => { p.m -= 5; p.s += 5; p.karma += 8; p.addFlag('resisted_displacement') } },
      { text: 'Take the compensation and begin again', tag: null, outcome: 'The money is less than the land was worth in any honest calculation. You move your family to a smaller plot further from water.', effect: (p) => { p.mo += 3000; p.w -= 10; p.m -= 15; p.r += 10; p.addFlag('displaced_from_land') } },
    ],
    effect: null,
  },
  {
    id: 'creg_farmer_climate_loss',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'agriculture' && G.currentYear >= 2000 && ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) && G.age >= 30,
    text: 'The rains come six weeks late. Then they do not come at all. The variety you planted is not suited to this. Nothing is suited to this. Your father farmed this land for forty years without this particular problem. Something has changed and the change has a name and the name is on no one\'s agenda here.',
    choices: [
      { text: 'Try a drought-resistant variety next season — adapt', tag: null, outcome: 'The seed is expensive. The yield is half what you need. It is better than nothing.', effect: (p) => { p.w -= 5; p.m -= 8; p.addFlag('climate_adapted'); p.addFlag('harvest_failure') } },
      { text: 'Consider whether farming is still viable here', tag: null, outcome: 'You begin to look at other things. The land sits unplanted through one season.', effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('harvest_failure'); p.addFlag('rural_to_urban') } },
    ],
    effect: null,
  },

  // ── ARTIST / MUSICIAN UNDER CENSORSHIP ───────────────────────────────────────

  {
    id: 'creg_artist_state_rejection',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.career?.field === 'arts' || G.career?.field === 'entertainment' || G.career?.field === 'writing') && repressiveRegime(G) && G.age >= 20,
    text: 'The review board meets on the third Tuesday of each month. Your work is on the agenda. The letter arrives two weeks later. The language of rejection is technical — "inconsistent with cultural objectives," "requires revision before approval." You read it twice and understand exactly what it is.',
    choices: [
      { text: 'Revise the work to comply. Something is better than nothing.', tag: null, outcome: 'You alter what you need to alter. The approved version is shown. It is not the work you made.', effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('censored_work'); p.addFlag('compromised') } },
      { text: 'Withdraw the work entirely and keep it as it is', tag: null, outcome: 'The original exists in your studio, seen by no one. You tell yourself this is temporary.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('suppressed_own_work'); p.addFlag('independent_thinker') } },
    ],
    effect: null,
  },
  {
    id: 'creg_artist_underground',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.career?.field === 'arts' || G.career?.field === 'entertainment' || G.career?.field === 'writing') && repressiveRegime(G) && G.age >= 24,
    text: 'The performance is in a basement that holds forty people. The audience knows why they came here instead of a theater. You play or read or show the work to people who have specifically sought it out because it cannot be seen in a legal venue. It is the most alive you have felt in two years.',
    choices: [
      { text: 'Continue performing underground as long as it holds', tag: null, outcome: 'The basement becomes known. The intimacy becomes a kind of reputation. The risk is a constant low hum.', effect: (p) => { p.m += 12; p.r += 5; p.addFlag('underground_artist'); p.addFlag('dissident_reader') } },
      { text: 'Stop. The risk is too real and the audience too small.', tag: null, outcome: 'You stop. The work continues in your head. The head is the one place they cannot enter.', effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('suppressed_own_work') } },
    ],
    effect: null,
  },
  {
    id: 'creg_artist_international_recognition',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.career?.field === 'arts' || G.career?.field === 'entertainment' || G.career?.field === 'writing') && repressiveRegime(G) && G.age >= 28,
    text: 'A prize, an exhibition, a review in a European publication. The government\'s response is measured and quick: this is foreign interference, cultural imperialism, an attempt to destabilize. The work, which was suppressed domestically, is now a diplomatic incident. You sit in your studio and look at your phone.',
    choices: [
      { text: 'Accept the recognition and speak to the foreign press', tag: null, outcome: 'The statement you give is calm and precise. At home, your telephone is very quiet for several weeks.', effect: (p) => { p.m += 8; p.r += 8; p.karma += 10; p.addFlag('internationally_recognised'); p.addFlag('dissident_reader') } },
      { text: 'Decline and say the work was misunderstood', tag: null, outcome: 'The regime is satisfied. The foreign press is confused. You have bought yourself some time.', effect: (p) => { p.m -= 12; p.r += 12; p.addFlag('denied_recognition'); p.addFlag('compromised') } },
    ],
    effect: null,
  },

  // ── LAWYER: THE WORK ITSELF ───────────────────────────────────────────────────

  {
    id: 'creg_lawyer_losing_case',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.career?.field === 'legal' && G.age >= 26 && !G.mem.lawyerLosingCase,
    text: 'You lose a case you should not have lost. Not because you were wrong on the law — you were right on the law. But the other side had more resources, more time, a better-rested expert witness. Your client shakes your hand outside the courthouse. The handshake is the worst part.',
    choices: [
      { text: 'Write the post-mortem — understand exactly what happened', tag: null, outcome: 'You become a better lawyer. The cost was paid by someone who trusted you.', effect: (p) => { p.m -= 10; p.e += 6; p.r += 6; p.setMem('lawyerLosingCase', true) } },
      { text: 'Move on — you cannot carry every outcome', tag: null, outcome: 'You move on. The habit of moving on has uses and costs.', effect: (p) => { p.m -= 5; p.r += 8; p.setMem('lawyerLosingCase', true) } },
    ],
    effect: null,
  },

  {
    id: 'creg_lawyer_ethics_grey',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'legal' && G.age >= 30 && !G.mem.lawyerEthics,
    text: 'The client is guilty. You know this, and knowing it is not the issue — the issue is a specific piece of evidence that could change the outcome. You are not obligated to disclose it. You are not obligated to use it. The rules of the profession say one thing. What you believe says another.',
    choices: [
      { text: 'Do your job — everyone is entitled to a defense', tag: null, outcome: 'You represent them fully. The system depends on this principle functioning even when it feels wrong.', effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('legal_defense_principle'); p.setMem('lawyerEthics', true) } },
      { text: 'Find a legitimate reason to step down from the case', tag: null, outcome: 'You withdraw. Another lawyer takes it. The case continues without you.', effect: (p) => { p.m += 4; p.karma += 5; p.setMem('lawyerEthics', true) } },
    ],
    effect: null,
  },

  // ── ACCOUNTANT / FINANCE ─────────────────────────────────────────────────────

  {
    id: 'creg_accountant_fraud_discovery',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'finance' && G.age >= 30 && !G.mem.accountantFraud,
    text: 'The numbers do not add up. You check them twice. They still do not add up. You understand what the numbers are telling you. The person they are telling you about has an office two floors above yours and a family photograph on their desk.',
    choices: [
      { text: 'Escalate it — this is exactly what audit is for', tag: null, outcome: 'The investigation begins. Your position in the organization changes. You did the right thing.', effect: (p) => { p.m -= 8; p.karma += 12; p.addFlag('reported_fraud'); p.setMem('accountantFraud', true) } },
      { text: 'Verify further before you escalate — you could be wrong', tag: null, outcome: 'You spend three weeks verifying. You are not wrong. The escalation is better supported.', effect: (p) => { p.m -= 5; p.e += 5; p.karma += 8; p.addFlag('reported_fraud'); p.setMem('accountantFraud', true) } },
      { text: 'File it away — this is above your pay grade', tag: null, outcome: 'You do not report it. It surfaces three years later. Your involvement is reviewed.', effect: (p) => { p.m -= 12; p.r += 12; p.addFlag('covered_up_fraud'); p.setMem('accountantFraud', true) } },
    ],
    effect: null,
  },

  // ── ENGINEER: TECHNICAL ETHICS ───────────────────────────────────────────────

  {
    id: 'creg_engineer_safety_tradeoff',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'engineering' && G.age >= 30 && !G.mem.engineerSafety,
    text: 'The project is behind schedule. The proposed shortcut is technically within tolerance but not within the standard you would apply if timeline were not a factor. The project manager asks for your sign-off. You look at the specification. You look at the timeline.',
    choices: [
      { text: 'Sign off — it meets minimum standard', tag: null, outcome: 'The project completes on time. The structure holds. You add this to the list of decisions you have made that you do not discuss.', effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('compromised'); p.setMem('engineerSafety', true) } },
      { text: 'Refuse — you do not sign for work you would not put your name to', tag: null, outcome: 'The delay is noted. Your reputation in the project suffers. The structure is sound.', effect: (p) => { p.m -= 3; p.karma += 10; p.addFlag('integrity'); p.setMem('engineerSafety', true) } },
    ],
    effect: null,
  },

  {
    id: 'creg_engineer_project_overrun',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'engineering' && G.age >= 28 && !G.mem.engineerOverrun,
    text: 'The project is over budget and over schedule and the reasons are real: the ground conditions were wrong, the specification changed, the suppliers delivered late. None of these explanations are what the client wants to hear. They want to hear that someone is responsible. You are the engineer of record.',
    choices: [
      { text: 'Present the facts clearly and let them make of it what they will', tag: null, outcome: 'They are unhappy. The contract survives. Your professional reputation for honesty survives.', effect: (p) => { p.m -= 10; p.e += 4; p.s += 3; p.setMem('engineerOverrun', true) } },
      { text: 'Shape the narrative — emphasize external factors', tag: null, outcome: 'The narrative holds, for now. The project is completed under new terms.', effect: (p) => { p.m -= 5; p.r += 5; p.setMem('engineerOverrun', true) } },
    ],
    effect: null,
  },

  // ── DOCTOR: ROUTINE WEIGHT ────────────────────────────────────────────────────

  {
    id: 'creg_doctor_difficult_patient',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'healthcare' && G.age >= 28 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) && !G.mem.doctorDifficultPatient,
    text: 'A patient contradicts your diagnosis with something they found on a health website. They have printed it out. They are not wrong to want to be involved in their own care. The website is not a reliable source. You have been doing this for eight years and are, at this moment, very tired.',
    choices: [
      { text: 'Walk them through the evidence carefully', tag: null, outcome: 'The conversation takes forty minutes. They leave satisfied. You are fifteen minutes behind on the rest of the day.', effect: (p) => { p.m -= 5; p.s += 4; p.karma += 5; p.setMem('doctorDifficultPatient', true) } },
      { text: 'Acknowledge their concern and gently redirect', tag: null, outcome: 'They accept the redirect. Whether they followed the advice at home is between them and the internet.', effect: (p) => { p.m -= 3; p.setMem('doctorDifficultPatient', true) } },
    ],
    effect: null,
  },

  {
    id: 'creg_doctor_burnout',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'healthcare' && G.age >= 35 && (G.stats.happiness ?? 50) < 45 && !G.mem.doctorBurnout,
    text: 'The standard answer to "how are you" is "fine, busy." You are both of these and also something else. The training does not include how to stop counting days. The ward is short-staffed again. You have learned not to mention this in certain company because the conversation that follows is always the same.',
    choices: [
      { text: 'Take the leave you are owed — the ward will survive', tag: null, outcome: 'You take two weeks. The ward survives. You come back with slightly more left in reserve.', effect: (p) => { p.m += 10; p.h += 6; p.setMem('doctorBurnout', true) } },
      { text: 'Push through — people are depending on you', tag: null, outcome: 'You push. Something begins a slow structural failure. It becomes visible eighteen months later.', effect: (p) => { p.m -= 12; p.h -= 8; p.r += 5; p.addFlag('burnout'); p.setMem('doctorBurnout', true) } },
    ],
    effect: null,
  },

]

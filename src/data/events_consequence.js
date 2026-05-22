// events_consequence.js
// Events that wire previously dead-end flags to downstream consequences.
// Covers: illiteracy, post-9/11 Muslim discrimination, years abroad,
// COVID downstream, late-life smoking, driving licence, STI arc.

export const CONSEQUENCE_EVENTS = [

  // ── ILLITERACY ──────────────────────────────────────────────────────────────

  {
    id: 'illiterate_school_shame',
    phase: 'childhood',
    weight: 5,
    when: (G) => !G.literate && G.age >= 7 && G.age <= 12 && !G.mem?.illiterate_school,
    text: 'The teacher writes something on the board and calls on you to read it aloud. The letters do not assemble into words the way they seem to for the other children. You stand. The silence stretches. Someone behind you laughs. The teacher moves on. You sit down and spend the rest of the lesson looking at your hands.',
    choices: [
      { text: 'Ask the teacher for help after class', tag: null, outcome: 'She gives you extra exercises. Progress is slow and humiliating and real.', effect: (p) => { p.e += 3; p.m -= 8; p.s -= 3; p.addFlag('seeking_literacy'); p.setMem('illiterate_school', true) } },
      { text: 'Say nothing — develop strategies to hide it', tag: null, outcome: 'You learn to memorise, to guess, to navigate around the gap. Nobody notices. The gap stays.', effect: (p) => { p.m -= 10; p.r += 6; p.e += 2; p.setMem('illiterate_school', true) } },
    ],
    effect: null,
  },

  {
    id: 'illiterate_employment_barrier',
    phase: 'young_adult',
    weight: 4,
    when: (G) => !G.literate && !G.flags.includes('became_literate') && G.age >= 18 && G.age <= 30 && !G.mem?.illiterate_job,
    text: 'The job posting requires you to fill in a form. You sit with the form for a long time. The pen is in your hand. There are twelve boxes. You can fill in your name and the date. The rest of it is a wall. The person at the desk glances over and you can see the moment they understand.',
    choices: [
      { text: 'Find a literacy class — this cannot continue', tag: null, outcome: 'The classes are three evenings a week. You are the oldest student by ten years. By the end of the year you can read a menu and a payslip and a letter from school.', effect: (p) => { p.m -= 5; p.e += 8; p.addFlag('became_literate'); p.addFlag('adult_literacy'); p.setMem('illiterate_job', true) } },
      { text: 'Walk away — find work that does not require forms', tag: null, outcome: 'There is always work for hands. The ceiling stays low.', effect: (p) => { p.m -= 12; p.r += 8; p.w -= 5; p.setMem('illiterate_job', true) } },
    ],
    effect: null,
  },

  {
    id: 'illiterate_late_discovery',
    phase: 'midlife',
    weight: 3,
    when: (G) => !G.literate && !G.flags.includes('became_literate') && G.age >= 35 && G.age <= 50 && !G.mem?.illiterate_late,
    text: 'Your child brings home a school reader and asks you to help. You have been managing this conversation for years — always busy, always tired. Tonight the book is on the table and your child is waiting and you cannot move around it anymore.',
    choices: [
      { text: 'Tell your child the truth', tag: null, outcome: 'The silence after is short. Your child reads to you instead. Something between you shifts into something more honest.', effect: (p) => { p.m -= 5; p.r += 5; p.karma += 8; p.addFlag('became_literate'); p.setMem('illiterate_late', true) } },
      { text: 'Make an excuse and leave the room', tag: null, outcome: 'The moment passes. The secret survives another night.', effect: (p) => { p.m -= 15; p.r += 12; p.setMem('illiterate_late', true) } },
    ],
    effect: null,
  },

  // ── POST-9/11 MUSLIM DISCRIMINATION ────────────────────────────────────────

  {
    id: 'post_911_airport_profiling',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('post_9_11_world') &&
      ['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.character.religion) &&
      (['wealthy_west', 'wealthy_east'].includes(G.currentCountry?.archetype) || ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)) &&
      G.currentYear >= 2002 && G.currentYear <= 2015 &&
      G.age >= 16 && !G.mem?.post_911_airport,
    text: 'You are pulled from the queue at the airport. Secondary screening. They do not say why and they do not have to. You are asked questions about your religion, your family, your travel. The questions are careful and the implication is not. You miss your flight. You rebook. You do not mention it when you arrive.',
    choices: [
      { text: 'File a complaint — this is not legal', tag: null, outcome: 'The complaint goes to a department and produces a form letter. Nothing changes except that you now have documentation.', effect: (p) => { p.m -= 8; p.e += 4; p.karma += 5; p.addFlag('challenged_discrimination'); p.setMem('post_911_airport', true) } },
      { text: 'Say nothing — you need to get where you are going', tag: null, outcome: 'You learn to arrive three hours early. You learn which phrases not to use. You learn to make yourself small in airports.', effect: (p) => { p.m -= 15; p.r += 10; p.setMem('post_911_airport', true) } },
    ],
    effect: null,
  },

  {
    id: 'post_911_name_change_pressure',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('post_9_11_world') &&
      ['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.character.religion) &&
      (['wealthy_west'].includes(G.currentCountry?.archetype) || ['wealthy_west'].includes(G.character.country.archetype)) &&
      G.currentYear >= 2001 && G.currentYear <= 2010 &&
      G.age >= 18 && !G.mem?.post_911_name,
    text: 'A manager — well-meaning, or so he says — suggests you might go by a different name at work. Something easier for clients. He says it as if it is advice. You understand it as something else. Your name is the first thing your parents gave you.',
    choices: [
      { text: 'Refuse — your name is your name', tag: null, outcome: 'He doesn\'t raise it again. The clients learn. Some of them never do.', effect: (p) => { p.m -= 5; p.s += 5; p.addFlag('identity_held'); p.setMem('post_911_name', true) } },
      { text: 'Use a shortened version — it is not worth the fight', tag: null, outcome: 'It is pragmatic. You know it is pragmatic. The pragmatism still costs something.', effect: (p) => { p.m -= 12; p.r += 8; p.setMem('post_911_name', true) } },
    ],
    effect: null,
  },

  {
    id: 'post_911_mosque_community',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('experienced_islamophobia') &&
      ['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.character.religion) &&
      G.age >= 18 && !G.mem?.post_911_mosque,
    text: 'The mosque is fuller than it has ever been. Not because faith increased — because people need to be somewhere they are not suspects. You sit in the back. The imam speaks about patience and dignity. Someone three rows ahead of you is quietly crying. You recognise the specific grief of belonging to something that is being blamed for something it did not do.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 5; p.addFlag('community_through_adversity'); p.setMem('post_911_mosque', true) },
  },

  {
    id: 'post_911_long_shadow',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('experienced_islamophobia') &&
      ['muslim_sunni', 'muslim_shia', 'muslim_sufi'].includes(G.character.religion) &&
      G.age >= 35 && !G.mem?.post_911_long_shadow,
    text: 'Twenty years on, your children are growing up in the shadow of something that happened before they were born. They have been asked, at school, what they think about terrorism. They have been told their religion requires explanation. You watch them learn the same calibrations you learned — when to be visible, when to be careful.',
    choices: [
      { text: 'Teach them to speak clearly and without apology', tag: null, outcome: 'They grow up with a vocabulary for it. It is not easy. It is better than silence.', effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('raised_with_pride'); p.setMem('post_911_long_shadow', true) } },
      { text: 'Let them find their own way through it', tag: null, outcome: 'They will. You watch and worry and sometimes intervene and mostly don\'t.', effect: (p) => { p.m -= 8; p.r += 6; p.setMem('post_911_long_shadow', true) } },
    ],
    effect: null,
  },

  // ── YEARS ABROAD ────────────────────────────────────────────────────────────

  {
    id: 'abroad_two_year_wall',
    phase: null,
    weight: 4,
    when: (G) => G.yearsAbroad >= 2 && G.yearsAbroad <= 4 && G.flags.includes('emigrated') && !G.mem?.abroad_two_year,
    text: 'The second year is different from the first. The first year you were surviving. The second year the survival becomes a life and the life does not feel quite like yours. You know the bus routes now. You know which shops to avoid. You have a few people you would call. What you do not have is the shorthand — the shared references, the humour that does not need explaining, the sense of being known without effort.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.e += 3; p.setMem('abroad_two_year', true) },
  },

  {
    id: 'abroad_assimilation_cost',
    phase: null,
    weight: 3,
    when: (G) => G.yearsAbroad >= 6 && G.flags.includes('emigrated') && !G.mem?.abroad_assimilation,
    text: 'You catch yourself thinking in the new language. Not just at work — at night, in the thin territory between waking and sleeping. The old language is still there, still the language of feeling and memory, but the machinery of thought has moved. You are not sure whether this is loss or adaptation. You suspect it is both simultaneously and always.',
    choices: [
      { text: 'Commit to the new place — this is home now', tag: null, outcome: 'The decision is quiet and significant. You stop describing yourself in transit.', effect: (p) => { p.m += 5; p.addFlag('found_new_home'); p.setMem('abroad_assimilation', true) } },
      { text: 'Hold on to the old place — it is still what defines you', tag: null, outcome: 'You ring home every week. You cook what your mother cooked. The distance stays uncomfortable and also necessary.', effect: (p) => { p.m -= 3; p.r += 6; p.addFlag('roots_held'); p.setMem('abroad_assimilation', true) } },
    ],
    effect: null,
  },

  {
    id: 'abroad_roots_pull',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.yearsAbroad >= 10 && G.flags.includes('emigrated') && G.age >= 38 && !G.mem?.abroad_roots_pull,
    text: 'A parent is unwell. Or a sibling calls with news. Or you attend a funeral remotely, on a phone screen, in a different time zone, unable to touch anything. The distance that seemed manageable for twenty years reveals a cost that was always there. You think about going back and immediately think about everything you would be leaving.',
    choices: [
      { text: 'Go back — permanently or for a long stay', tag: null, outcome: 'The reverse journey is its own kind of immigration. The place you left has changed. So have you.', effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('returned_home'); p.setMem('abroad_roots_pull', true) } },
      { text: 'Stay — your life is here now', tag: null, outcome: 'You send money instead of presence. It is not enough and you know it and you do it anyway.', effect: (p) => { p.m -= 12; p.r += 12; p.mo -= 2000; p.setMem('abroad_roots_pull', true) } },
    ],
    effect: null,
  },

  // ── COVID DOWNSTREAM ────────────────────────────────────────────────────────

  {
    id: 'pandemic_isolation_mental',
    phase: null,
    weight: 5,
    when: (G) => G.flags.includes('lived_through_pandemic') && G.currentYear >= 2020 && G.currentYear <= 2023 && G.age >= 18 && !G.mem?.pandemic_isolation,
    text: 'The weeks of staying inside accumulate into something that stops feeling temporary. The apartment is the same size it always was. The silence has a texture. You speak to people through screens and feel the specific inadequacy of that. There is no event and no endpoint. There is only today, which looks like yesterday.',
    choices: [
      { text: 'Build a routine and hold to it rigidly', tag: null, outcome: 'The structure keeps you functional. It does not keep you well.', effect: (p) => { p.m -= 8; p.h -= 3; p.e += 3; p.addFlag('pandemic_coped'); p.setMem('pandemic_isolation', true) } },
      { text: 'Let the days blur — survival is enough right now', tag: null, outcome: 'You stop knowing what day it is. You sleep at wrong hours. The blurring takes months to reverse.', effect: (p) => { p.m -= 18; p.h -= 6; p.setMem('pandemic_isolation', true) } },
    ],
    effect: null,
  },

  {
    id: 'pandemic_economic_loss',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('lived_through_pandemic') && G.career && G.currentYear >= 2020 && G.currentYear <= 2022 && !G.mem?.pandemic_economic,
    text: 'The industry closes or contracts or pivots in a direction that does not include your role. The email arrives on a Tuesday. The company is "restructuring." The redundancy package is legal and inadequate. You are forty-three and your CV has not needed updating in six years.',
    choices: [
      { text: 'Retrain — this is the forced pivot you never chose', tag: null, outcome: 'The new direction takes two years to pay off. The years are difficult and the direction is yours.', effect: (p) => { p.m -= 10; p.e += 6; p.mo -= 4000; p.addFlag('pandemic_reborn'); p.setMem('pandemic_economic', true) } },
      { text: 'Find equivalent work as fast as possible', tag: null, outcome: 'The new role is similar, slightly worse. You are grateful for it and slightly resentful of the gratitude.', effect: (p) => { p.m -= 8; p.mo -= 2000; p.setMem('pandemic_economic', true) } },
    ],
    effect: null,
  },

  {
    id: 'pandemic_loss_person',
    phase: null,
    weight: 3,
    when: (G) => G.flags.includes('lived_through_pandemic') && G.currentYear >= 2020 && G.currentYear <= 2022 && G.age >= 30 && !G.mem?.pandemic_loss && (G.parents?.father?.alive || G.parents?.mother?.alive),
    text: 'Someone you love is in a hospital you cannot enter. The updates come by phone. You are not allowed to be there. This is the part nobody explained when they talked about the pandemic — that the dying would happen without the people who should be present. The last conversation is through glass or through a nurse who holds the phone.',
    choices: null,
    effect: (p) => { p.m -= 25; p.r += 15; p.karma += 6; p.addFlag('pandemic_grief'); p.setMem('pandemic_loss', true) },
  },

  // ── LATE-LIFE SMOKING CONSEQUENCES ─────────────────────────────────────────

  {
    id: 'smoker_doctor_warning',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('smoker') && G.age >= 45 && G.age <= 58 && !G.mem?.smoker_warning,
    text: 'The doctor listens to your lungs and writes something down and then looks at you directly. She is not alarmist. She says: you have been smoking for a long time. She says: the changes are visible now. She says: there is still time to make this better. She does not say: barely.',
    choices: [
      { text: 'Quit — now, today, seriously this time', tag: null, outcome: 'The first month is miserable. The body remembers craving for years. The lungs begin a slow reversal.', effect: (p) => { p.h += 5; p.m -= 8; p.clearFlag('smoker'); p.addFlag('ex_smoker'); p.setMem('smoker_warning', true) } },
      { text: 'Cut down — something is better than nothing', tag: null, outcome: 'You reduce, then return to the same level over three months. The body notices the inconsistency less than you expected.', effect: (p) => { p.h -= 3; p.m -= 3; p.r += 6; p.setMem('smoker_warning', true) } },
    ],
    effect: null,
  },

  {
    id: 'smoker_copd_diagnosis',
    phase: 'late_life',
    weight: 5,
    when: (G) => G.flags.includes('smoker') && !G.flags.includes('ex_smoker') && G.age >= 58 && !G.mem?.copd_diagnosed,
    text: 'Chronic obstructive pulmonary disease. The consultant says the full words once and then uses the abbreviation. The abbreviation is four letters for a thing that will now structure your days — the stairs, the distances, the breath that comes too slowly and costs too much. It was not inevitable. It was likely. You knew it was likely.',
    choices: [
      { text: 'Quit smoking, start treatment — manage what you can', tag: null, outcome: 'The disease does not reverse. It slows. That is what is available now.', effect: (p) => { p.h -= 12; p.m -= 10; p.r += 10; p.mo -= 3000; p.clearFlag('smoker'); p.addFlag('ex_smoker'); p.addFlag('chronic_illness'); p.setMem('copd_diagnosed', true) } },
      { text: 'Keep smoking — the damage is done', tag: null, outcome: 'The logic is not wrong, only its direction. The deterioration accelerates.', effect: (p) => { p.h -= 20; p.m -= 8; p.r += 8; p.addFlag('chronic_illness'); p.setMem('copd_diagnosed', true) } },
    ],
    effect: null,
  },

  // ── DRIVER'S LICENCE CONSEQUENCES ──────────────────────────────────────────

  {
    id: 'licence_rural_freedom',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.licenceObtained && G.ruralUrban === 'rural' && G.character.gender === 'female' && G.age >= 17 && G.age <= 28 && !G.mem?.licence_rural_freedom,
    text: 'The first time you drive alone — not to anywhere specific, just along the road that goes past the fields and the reservoir and the pylons — you understand something about what a car actually is. It is not a vehicle. It is a room with no one else in it that moves.',
    choices: null,
    effect: (p) => { p.m += 14; p.s += 5; p.addFlag('independent_mobility'); p.setMem('licence_rural_freedom', true) },
  },

  {
    id: 'licence_young_accident',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.licenceObtained && G.age >= 17 && G.age <= 25 && !G.mem?.licence_accident,
    text: 'You are not going fast. You are going too fast for the corner, which is different. The car leaves the road and hits a hedge. You are not injured. The car is damaged in a way that costs money you do not have. You sit in the seat for a long time while the engine ticks.',
    choices: [
      { text: 'Call the insurance, tell your parents, deal with it honestly', tag: null, outcome: 'The cost is real. The lesson is permanent.', effect: (p) => { p.m -= 12; p.mo -= 1500; p.setMem('licence_accident', true) } },
      { text: 'Drive home and hope nobody noticed the hedge', tag: null, outcome: 'Nobody mentions the hedge. The dent in the bumper remains for two years.', effect: (p) => { p.m -= 5; p.r += 5; p.karma -= 4; p.setMem('licence_accident', true) } },
    ],
    effect: null,
  },

  // ── STI ARC ─────────────────────────────────────────────────────────────────

  {
    id: 'sti_diagnosis',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.hooksUpCount ?? 0) >= 5 && G.age >= 19 && !G.mem?.sti_diagnosed,
    text: 'The clinic is on the second floor of a building that could be anything. You give a number, not a name. The nurse is practised and kind. The result takes four days. In those four days you review decisions that seemed uncomplicated when you made them.',
    choices: [
      { text: 'Get tested and treat it — deal with it cleanly', tag: null, outcome: 'It is treatable. You treat it. You tell the people you need to tell. That part is harder than the treatment.', effect: (p) => { p.m -= 15; p.h -= 5; p.mo -= 400; p.addFlag('sti_treated'); p.setMem('sti_diagnosed', true) } },
      { text: 'Treat it quietly and tell nobody', tag: null, outcome: 'The condition is managed. The privacy costs its own kind of weight.', effect: (p) => { p.m -= 10; p.h -= 8; p.r += 8; p.mo -= 400; p.setMem('sti_diagnosed', true) } },
    ],
    effect: null,
  },

  {
    id: 'sti_recurrence',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('sti_treated') && (G.hooksUpCount ?? 0) >= 10 && G.age >= 22 && !G.mem?.sti_recurrence,
    text: 'The same clinic, a different nurse. You recognise the form. The result this time is different — a chronic condition, manageable but permanent. The nurse explains what this means practically. It means more than what she explains.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 8; p.r += 10; p.addFlag('chronic_sti'); p.setMem('sti_recurrence', true) },
  },

  // ── CRIMINAL RECORD DOWNSTREAM ──────────────────────────────────────────────

  {
    id: 'criminal_record_housing',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.criminalRecord && G.criminalRecord.length > 0 && G.age >= 20 && !G.mem?.criminal_housing,
    text: 'The landlord runs a background check. The application is declined. The letter does not give a reason. You know the reason. The next three applications are declined. The fourth landlord asks directly and you tell him and he does not call back. You end up in a room that does not run background checks, with the kind of people who also cannot pass background checks.',
    choices: [
      { text: 'Look for housing assistance programmes or co-ops', tag: null, outcome: 'There are organisations that work with people in your situation. The housing is basic. It is stable.', effect: (p) => { p.m -= 8; p.s += 3; p.addFlag('found_alternative_housing'); p.setMem('criminal_housing', true) } },
      { text: 'Take what you can get and deal with it', tag: null, outcome: 'The neighbourhood is hard. You are harder than you expected to be.', effect: (p) => { p.m -= 15; p.h -= 5; p.setMem('criminal_housing', true) } },
    ],
    effect: null,
  },

  {
    id: 'criminal_record_relationship',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.criminalRecord && G.criminalRecord.length > 0 && G.partner && G.age >= 22 && !G.mem?.criminal_partner_knows,
    text: 'Your partner finds out — not from you. The information arrives through a search, a mutual contact, a casual question that produces an answer you had not provided. The conversation that follows is the one you have been managing the timing of and have now run out of time to manage.',
    choices: [
      { text: 'Explain it — the full version, honestly', tag: null, outcome: 'They sit with it for a week. Then they come back with questions. The questions are a good sign.', effect: (p) => { p.m -= 10; p.partnerRel(-10); p.addFlag('partner_knows_record'); p.setMem('criminal_partner_knows', true) } },
      { text: 'Minimise it — it was a long time ago, it does not define you', tag: null, outcome: 'They accept the minimised version. Later, when they learn more, they will remember this moment.', effect: (p) => { p.m -= 5; p.r += 8; p.partnerRel(-5); p.setMem('criminal_partner_knows', true) } },
    ],
    effect: null,
  },

]

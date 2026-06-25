// events_followthrough_58.js
// Follow-throughs for Turkey depth flags and lingering geographic echoes:
// Alevi elder and the cemevi question, 1980 generation in late life,
// 1999 earthquake reckoned against 2023, Gezi disillusionment arc,
// 2016 purge survivor mid-life, military service cohort reunion.
// Also: Iraq depth echo (Amman diaspora resettlement) and
// condition arc 2 echo (CGM era in late life).

export const FOLLOWTHROUGH_58_EVENTS = [

  // ── TURKEY: ALEVI LATE-LIFE ────────────────────────────────────────────────────

  {
    id: 'ft58_alevi_cemevi_question',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('trk_dep_alevi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft58AleviCemevi,
    text: `The cemevi question has been debated for your entire adult life. Successive governments have promised to resolve it — to recognise the cemevi as a place of worship, to fund it on the same terms as mosques, to acknowledge Alevism as something the Turkish state officially accounts for rather than ignores. The debate continues. You have watched it go through AKP governments and secular governments and back. The cemevi is still maintained by the community's own resources. The question of recognition is still open. You have gotten older waiting for an answer to a question the state does not seem to want to close.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft58AleviCemevi', true) },
  },

  {
    id: 'ft58_sivas_anniversary',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('trk_dep_sivas_generation') &&
      G.currentYear >= 2003 && G.currentYear <= 2023 &&
      G.age >= 30 &&
      !G.mem?.ft58SivasAnniv,
    text: `Every July 2 the anniversary comes. The names of the thirty-five are read aloud in gatherings that the authorities sometimes permit and sometimes surveil. The Madımak Hotel is still standing — it has become a kind of wound in the city's centre, a building that no one has decided what to do with because deciding would require taking a position. The case ran for nineteen years. The statute of limitations expired in 2012, before all sentences were handed down. The word for this in Turkish law is zamanaşımı. You know the word precisely and what it has been used for.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.setMem('ft58SivasAnniv', true) },
  },

  // ── TURKEY: 1980 GENERATION IN LATE LIFE ──────────────────────────────────────

  {
    id: 'ft58_1980_constitution_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('trk_dep_1980_generation') &&
      G.age >= 55 &&
      !G.mem?.ft58_1980Late,
    text: `The 1982 constitution the junta wrote. It has been amended dozens of times and the country has voted on it in multiple referendums and it is still the operating document — the one that sets the rules for the president and the parliament and the courts and the military. The coup that produced it was condemned officially in 1997, years after the generals died or retired. The document they left behind survived them by decades. You have voted under it many times. You have always known where it came from.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft58_1980Late', true) },
  },

  // ── TURKEY: 1999 EARTHQUAKE INTO 2023 ─────────────────────────────────────────

  {
    id: 'ft58_earthquake_lesson_repeated',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('trk_dep_1999_earthquake') &&
      G.currentYear >= 2023 &&
      G.age >= 40 &&
      !G.mem?.ft58QuakeLessonRepeated,
    text: `February 6, 2023. The earthquake in Kahramanmaraş. You remember 1999 — the same knowledge about building permits, the same knowledge about the concrete, the same pattern of buildings that passed inspection and should not have. The 2023 death toll is fifty thousand. The same investigation begins again: the building amnesty of 2018, the construction companies, the inspections that didn't happen. You have watched the lesson arrive twice in your lifetime. The second time the lesson came with the same knowledge that should have been acted on after the first time.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 7; p.setMem('ft58QuakeLessonRepeated', true) },
  },

  // ── TURKEY: GEZI DISILLUSIONMENT ARC ──────────────────────────────────────────

  {
    id: 'ft58_gezi_aftermath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('trk_dep_gezi_generation') &&
      G.currentYear >= 2014 && G.currentYear <= 2020 &&
      G.age >= 22 &&
      !G.mem?.ft58GeziAftermath,
    text: `The park was saved for a while and then the redevelopment plans came back in a different form. The Taksim pedestrianisation removed the square's openness. The leaders of the various Gezi groups faced long trials — the Gezi trial ran for years. Osman Kavala, a civil society figure who was not a protest leader, was imprisoned and his case ran to the European Court of Human Rights and back. The coalition from the summer of 2013 — the one you thought might be something — turned out not to be something in the electoral sense. This is not a surprise exactly. It is still a specific kind of disappointment.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.setMem('ft58GeziAftermath', true) },
  },

  {
    id: 'ft58_gezi_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('trk_dep_gezi_generation') &&
      G.age >= 50 &&
      !G.mem?.ft58GeziLate,
    text: `Looking back at the summer of 2013 from the distance of decades: what was real and what was not. What was real was the square, the people in it, the three weeks, the specific texture of that moment. What turned out not to be real was the idea that the moment would translate into something durable. You have kept the memory of the moment separately from what it failed to become. The moment itself was not nothing.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 3; p.setMem('ft58GeziLate', true) },
  },

  // ── TURKEY: POST-2016 PURGE LIFE ──────────────────────────────────────────────

  {
    id: 'ft58_2016_purge_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('trk_dep_2016_generation') &&
      G.currentYear >= 2017 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.ft58PurgeMidlife,
    text: `After July 15 the list expanded in ways that were not always legible. The stated logic was the Gülen network in the state. The actual application was broader. Academics who had signed a peace petition the previous January found themselves on lists. Journalists. Judges. Teachers at schools with no demonstrable connection to the religious movement being targeted. You know people who were dismissed or detained. You know people who left the country in the months after. The state of emergency ran for two years. The emergency decrees produced changes that the normal legislative process would have required years to pass.`,
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 5; p.e += 2; p.setMem('ft58PurgeMidlife', true) },
  },

  // ── TURKEY: MILITARY SERVICE COHORT IN LATE LIFE ──────────────────────────────

  {
    id: 'ft58_military_cohort_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('trk_dep_military_generation') &&
      G.age >= 55 &&
      !G.mem?.ft58MilCohort,
    text: `Some of the men you served with, you have not seen since the discharge. Some became the friends you met at the gate when it was over and have kept in contact across the decades. The service was a specific time — not the best time, not the worst — and the men who went through it with you carry a version of the same time. When you meet one of them now, the thing that is recognised is not the person you were at twenty-two. It is the fact of having been in the same place at the same time, which is its own form of knowledge about someone.`,
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('ft58MilCohort', true) },
  },

  // ── IRAQ DEPTH ECHO: DIASPORA RESETTLED ───────────────────────────────────────

  {
    id: 'ft58_amman_diaspora_resettled',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('irq_dep_diaspora_amman') &&
      G.currentYear >= 2006 && G.currentYear <= 2015 &&
      G.age >= 25 &&
      !G.mem?.ft58AmmanResettled,
    text: `The interview date came. The decision arrived — by letter, by phone call from the agency, by a notification you had been waiting months to receive. A country: Sweden, Canada, Australia, the United States, Germany. The resettlement process has its own timetable and its own requirements and you navigate them because after Amman there is nothing left that is difficult. You arrive. The language begins. The winter is different from the winter anywhere you have been. The food takes time. The work takes time. The Iraqi community in this city is already here, from earlier waves, and they give you what the hemşehri association gives migrants everywhere: the fact of being known.`,
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('ft58AmmanResettled', true) },
  },

  // ── CONDITION ARC 2: CGM LATE-LIFE REFLECTION ─────────────────────────────────

  {
    id: 'ft58_cgm_late_life',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('manages_chronic_condition') &&
      G.conditions?.some(c => c.id === 'diabetes' && c.managed) &&
      G.currentYear >= 2015 &&
      G.age >= 60 &&
      !G.mem?.ft58CgmLate,
    text: `The glucose curve on the phone's screen. You have been reading it for years now and can interpret it the way you read weather: the pattern before a meal, the rise after, the overnight drift, the morning correction. The management has become something the body participates in rather than something the mind polices. The generation before yours managed the same condition with a finger-prick four times a day and a paper log. The generation before that barely had the diagnosis. You have been fortunate in your decade.`,
    choices: null,
    effect: (p) => { p.m += 4; p.e += 1; p.setMem('ft58CgmLate', true) },
  },

]

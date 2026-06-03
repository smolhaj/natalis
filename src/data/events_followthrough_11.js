// events_followthrough_11.js
// Part 1 (original): 5 follow-throughs for institutional_complicity, debt_bankrupt,
//   earthquake_family_loss, kurd_militant_adjacent, id98_witness_bystander.
// Part 2 (added): 29 follow-throughs closing every orphaned flag from the flag audit,
//   plus 2 desire tension events for leave_mark and redemption (missing from
//   events_followthrough_8.js).

export const FOLLOWTHROUGH_11_EVENTS = [

  // ── INSTITUTIONAL COMPLICITY ─────────────────────────────────────────────────

  {
    id: 'ft11_institutional_reckoning_news',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_complicity') &&
      G.age >= 45 &&
      !G.flags.has('institutional_reckoning'),
    text: 'A survivor is named in the news. Then another. The commission\'s findings run to four hundred pages and you do not need to read them to know what they contain. The silence you kept was practical — you told yourself it was pastoral — and now it has a public name. You sit with the newspaper until the light changes.',
    choices: null,
    effect: (p) => { p.m -= 12; p.karma -= 10; p.addFlag('institutional_reckoning') },
  },

  // ── DEBT BANKRUPTCY: CREDIT RECORD ──────────────────────────────────────────

  {
    id: 'ft11_debt_credit_record',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('debt_bankrupt') &&
      G.mem?.debt_bankruptYear &&
      (G.currentYear - G.mem.debt_bankruptYear >= 3) &&
      !G.flags.has('debt_rebuilt_credit') &&
      G.age >= 22,
    text: 'The bankruptcy is behind you now — three years, five, depending on when you count from. The credit record still reads it clearly. You have been turned down for a lease twice. The secured card you carry has a two-hundred-dollar limit and an annual fee that arrives like an insult. People talk about fresh starts. You are learning what the fine print of a fresh start actually looks like.',
    choices: [
      {
        text: 'Keep renting, keep waiting for the seven years to clear.',
        tag: 'debt_patience',
        outcome: 'You wait. The record is old enough now to be fading at the edges. Another year.',
        effect: (p) => { p.addFlag('debt_patience'); p.m -= 4 },
      },
      {
        text: 'Take the predatory credit card offer. Start rebuilding.',
        tag: 'debt_rebuilt_credit',
        outcome: 'The interest rate is twenty-nine percent. You pay the full balance every month, which is the only way this works. After eighteen months, a second card arrives unsolicited. The score has moved.',
        effect: (p) => { p.mo -= 300; p.addFlag('debt_rebuilt_credit'); p.m -= 2; p.w += 2 },
      },
    ],
    effect: null,
  },

  // ── EARTHQUAKE FAMILY LOSS: ANNIVERSARY ─────────────────────────────────────

  {
    id: 'ft11_earthquake_anniversary',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('earthquake_family_loss') &&
      G.age >= 20 &&
      !G.flags.has('earthquake_grief_resolved'),
    text: 'The anniversary of the earthquake comes back every January. You know it by the light, the specific flat grey of the twelfth, before you have checked the date. You still have the rosary your aunt pressed into your hand the last time you visited — a small plastic thing, blue beads, worth nothing except that she touched it. You take it from the drawer in the morning and put it back before work.',
    choices: null,
    effect: (p) => { p.m -= 6; p.addFlag('earthquake_grief_resolved') },
  },

  // ── KURD MILITANT ADJACENT: STATE PRESSURE ──────────────────────────────────

  {
    id: 'ft11_kurd_state_pressure',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('kurd_militant_adjacent') &&
      G.currentCountry?.name === 'Turkey' &&
      G.age >= 20 &&
      !G.flags.has('kurd_state_pressure'),
    text: 'A man comes to the neighbourhood asking questions — to your neighbour first, then to a cousin. A name close to yours came up somewhere. Your neighbour was held for two days and came back quieter. You know the distinction the state makes between being asked about and being named does not always mean what you think it means.',
    choices: [
      {
        text: 'Deny everything. Cooperate with the inquiry.',
        tag: 'kurd_surveillance_subject',
        outcome: 'You answer the questions carefully. You are released the same afternoon. You do not know what they wrote down.',
        effect: (p) => { p.m -= 10; p.addFlag('kurd_state_pressure'); p.addFlag('kurd_surveillance_subject') },
      },
      {
        text: 'Leave Turkey before they come to you directly.',
        tag: 'kurd_fled_state_pressure',
        outcome: 'You leave quickly, without a story prepared. The word asylum sits in the processing office like a stone. You have never used it about yourself before.',
        effect: (p) => { p.addFlag('kurd_state_pressure'); p.addFlag('emigrated'); p.setResidency('asylum_seeker'); p.m -= 8 },
      },
    ],
    effect: null,
  },

  // ── ID98 WITNESS BYSTANDER: LATE RECKONING ──────────────────────────────────

  {
    id: 'ft11_id98_late_reckoning',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('id98_witness_bystander') &&
      G.age >= 40 &&
      !G.flags.has('id98_late_reckoning'),
    text: 'It has been years. The trials that were promised did not come. The men who organised what happened in May 1998 went into politics, gave speeches, had buildings named after them. You saw what you saw from your window — the smoke, the direction people were running, the specific moment you decided to step back from the glass. The account you could have given is still inside you, uncollected.',
    choices: null,
    effect: (p) => { p.m -= 8; p.karma -= 5; p.addFlag('id98_late_reckoning') },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PART 2 — ALL 29 ORPHANED FLAGS FROM FLAG AUDIT
  // ═══════════════════════════════════════════════════════════════════════════════

  // ── FIRST_PASSPORT_RECEIVED [major/displacement] ──────────────────────────────

  {
    id: 'ft11_first_passport',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('first_passport_received') && G.age >= 58 && !G.mem?.ft11FirstPassport,
    text: 'The passport is still somewhere in the house. You know which drawer. When you open it — not often — you look at the photograph, the person in it younger than anyone you know now, and at the country\'s name printed across the cover. A country saying: this person is ours. You sat with it the day you received it for longer than the object probably merited. You are glad you did.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11FirstPassport', true) },
  },

  // ── UYGHUR_SUPPRESSED [major/persecution] ─────────────────────────────────────

  {
    id: 'ft11_uyghur_silence',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('uyghur_suppressed') &&
      G.age >= 35 &&
      !G.flags.has('uyghur_detained') &&
      !G.mem?.ft11UyghurSilence,
    text: 'You are aware, now, that the yes comes before you have heard the question. It is not fear exactly — or it is fear that has been so thoroughly rehearsed that the performance and the reflex have become the same thing. Someone asks what you are thinking and you tell them something true and small. You are still learning to notice when you do this.',
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('ft11UyghurSilence', true) },
  },

  // ── INTERRUPTED_CAREER [moderate/career] ──────────────────────────────────────

  {
    id: 'ft11_interrupted_career',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('interrupted_career') &&
      G.age >= 35 && G.age <= 54 &&
      G.career !== null &&
      !G.mem?.ft11InterruptedCareer,
    text: 'A colleague from the year you started — before the service years — has been promoted past you. They are competent; that is not the point. The point is the arithmetic: those years belong to the country, not to you, and the career ladder does not factor them in. You have made this calculation many times. It comes out the same.',
    choices: [
      {
        text: 'Request formal recognition of the service years',
        tag: 'service_years_contested',
        outcome: 'HR notes it. Nothing changes. The record now shows that you raised the question.',
        effect: (p) => { p.karma += 3; p.m -= 3; p.setMem('ft11InterruptedCareer', true) },
      },
      {
        text: 'Accept the gap and work from where you are',
        tag: null,
        outcome: 'You close the file and return to the work. The gap is still there. So are you.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('ft11InterruptedCareer', true) },
      },
    ],
    effect: null,
  },

  // ── VETERAN_SOLIDARITY [moderate/community] ───────────────────────────────────

  {
    id: 'ft11_veteran_solidarity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('veteran_solidarity') && G.age >= 55 && !G.mem?.ft11VetSolidarityLate,
    text: 'You mention to someone younger that you were in — just in passing, the way you do now, without preamble. They look at you with the slightly accelerated attention people give to old photographs. Later in the same conversation you find out they served too. The subject of the next two hours is ordinary things. The conversation is different in kind from the ones you have with people who didn\'t.',
    choices: null,
    effect: (p) => { p.m += 7; p.setMem('ft11VetSolidarityLate', true) },
  },

  // ── DEBT_RESTRUCTURED [moderate/economic] ─────────────────────────────────────

  {
    id: 'ft11_debt_restructured_discipline',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('debt_restructured') && G.age >= 40 && !G.mem?.ft11DebtRestructured,
    text: 'You make the payment on the first of the month. You have not been late once since the restructuring. The bank calls this discipline. You understand it differently: when you have lived inside a situation with no margin, the habits you build to protect the one small choice that remains are the most persistent habits of your life.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('ft11DebtRestructured', true) },
  },

  // ── MEDICAL_DEBT [moderate/economic] ──────────────────────────────────────────

  {
    id: 'ft11_medical_debt_years',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('medical_debt') && G.age >= 35 && !G.mem?.ft11MedicalDebt,
    text: 'The bill arrived weeks after you had stopped thinking about the hospital. The number was not possible and then it was possible because there it was. You spent years on minimum payments that did not touch the principal for the first eighteen months. You know exactly what the treatment cost. You know what it would have cost not to have it. You hold both numbers without being able to say which one was the real price.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 3; p.setMem('ft11MedicalDebt', true) },
  },

  // ── SWAHILI_EDUCATED [moderate/education] ─────────────────────────────────────

  {
    id: 'ft11_swahili_educated_ceiling',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('swahili_educated') &&
      G.age >= 30 && G.age <= 52 &&
      !G.mem?.ft11SwahiliCeiling,
    text: 'The international role requires a particular English — not the English you learned alongside Swahili, but the English of reports, negotiations, and the precision that comes from having spent your entire education in it. You are qualified for everything except the language of the room. The language of the room is not in the job description.',
    choices: [
      {
        text: 'Apply in the English you have',
        tag: 'applied_anyway',
        outcome: 'You apply. The interview goes better than you expected. The accent is yours and it stays yours.',
        effect: (p) => { p.m += 5; p.karma += 3; p.e += 4; p.setMem('ft11SwahiliCeiling', true) },
      },
      {
        text: 'Find a path that doesn\'t require their room',
        tag: null,
        outcome: 'You find something else. It is good work. The other question remains, unanswered.',
        effect: (p) => { p.m += 2; p.r += 3; p.setMem('ft11SwahiliCeiling', true) },
      },
    ],
    effect: null,
  },

  // ── FRANCOPHONE_EDUCATED [moderate/education] ─────────────────────────────────

  {
    id: 'ft11_francophone_educated_ambivalence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('francophone_educated') && G.age >= 32 && !G.mem?.ft11FrancophoneAmbivalence,
    text: 'The degree is recognised in Paris and Dakar and Geneva. You have walked through the rooms it opens and know what they contain. The question you return to is not whether the education was good — it was — but who it was made for and what it was built to produce. You were supposed to emerge from it as something recognisable to the people who designed the system. You did. You have been sitting with that since.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 4; p.setMem('ft11FrancophoneAmbivalence', true) },
  },

  // ── EBOLA_SURVIVOR [moderate/health] ──────────────────────────────────────────

  {
    id: 'ft11_ebola_survivor_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ebola_survivor') &&
      G.age >= 28 &&
      G.currentYear >= 2016 &&
      !G.mem?.ft11EbolaSurvivor,
    text: 'Someone coughs across the room and for a moment you are in 2014. Not a flashback — nothing as dramatic as that. Just the body running its old protocols before the reasoning catches up. The fear that came with the epidemic did not entirely leave with it. You have learned to recognise this as information rather than threat. You know what a quarantine line looks like from the inside. Most people don\'t.',
    choices: null,
    effect: (p) => { p.m -= 4; p.h -= 1; p.setMem('ft11EbolaSurvivor', true) },
  },

  // ── KURD_LANGUAGE_MOMENT [moderate/identity] ──────────────────────────────────

  {
    id: 'ft11_kurd_language_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('kurd_language_moment') && G.age >= 55 && !G.mem?.ft11KurdLanguageLate,
    text: 'You think sometimes about the day you pulled over — the radio broadcast, the first time in your adult life you heard the language in public as if it were an ordinary thing. You stayed in the car for twenty minutes. You were late to wherever you were going. The person you described it to later understood the moment but not the weight of it. Some things require the full context to land, and the full context is the life.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft11KurdLanguageLate', true) },
  },

  // ── SEEN_THE_GAP [moderate/identity] ─────────────────────────────────────────

  {
    id: 'ft11_seen_the_gap_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('seen_the_gap') && G.age >= 48 && !G.mem?.ft11SeenTheGap,
    text: 'You have translated many things. Sentences, documents, the weight of testimony that was supposed to go on the record accurately. You have put words on the record that were not quite the words said — not because you were careless, but because there was no equivalent, and you had to choose which meaning to sacrifice. You know which choices you made. Some of them are still with you.',
    choices: null,
    effect: (p) => { p.m -= 3; p.karma += 5; p.e += 3; p.setMem('ft11SeenTheGap', true) },
  },

  // ── ORIGIN_COUNTRY_VISITED [moderate/identity] ────────────────────────────────

  {
    id: 'ft11_origin_country_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('origin_country_visited') && G.age >= 48 && !G.mem?.ft11OriginCountryLate,
    text: 'The trip gave you some things and withheld others. The landscape matched something you could not have remembered. The faces had a logic you recognised without having learned it. What you hoped the trip would resolve was the question of where you are from. It did not resolve that. You understand now that it couldn\'t. You are less disappointed about this than you expected.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('ft11OriginCountryLate', true) },
  },

  // ── KAFALA_DOCUMENTED [moderate/labor] ────────────────────────────────────────

  {
    id: 'ft11_kafala_passport_back',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('kafala_documented') && G.age >= 22 && !G.mem?.ft11KafalaPassportBack,
    text: 'The contract ends. The employer hands you the passport across the desk. You take it without a word — the correct response, the safe response. On the street you open it to the photograph page and hold it for a while. You have held your own document before, in your own country. It did not feel like this. You understand something now about what it costs to need someone else\'s permission to be yourself.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('ft11KafalaPassportBack', true) },
  },

  // ── FORCED_HARVEST [moderate/labor] ───────────────────────────────────────────

  {
    id: 'ft11_forced_harvest_september',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('forced_harvest') && G.age >= 48 && !G.mem?.ft11ForcedHarvest,
    text: 'September still has a particular weight. You are aware of it every year — the moment when school should be starting, which is also the moment the quota had to be met, which is also the moment your hands were doing something that had nothing to do with what you were supposed to be learning. The school seasons are behind you now. September still knows.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.setMem('ft11ForcedHarvest', true) },
  },

  // ── KURD_CITIZENSHIP_RESTORED [moderate/legal] ────────────────────────────────

  {
    id: 'ft11_kurd_citizenship_restored_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('kurd_citizenship_restored') &&
      G.age >= 50 &&
      !G.mem?.ft11KurdCitizenshipLate,
    text: 'They gave you a citizenship in April 2011. Forty-nine years after they had taken it, the decree restored it — you understood the political calculation, that the uprising had just started and the concession was part of the management. You took the document anyway. Three months later the war began. The citizenship was real and it was insufficient and you have been holding both of those things since, because both are true.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 4; p.setMem('ft11KurdCitizenshipLate', true) },
  },

  // ── KURD_RETURNED_HOME [moderate/migration] ───────────────────────────────────

  {
    id: 'ft11_kurd_returned_dissonance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kurd_returned_home') &&
      G.age >= 35 &&
      !G.mem?.ft11KurdReturnedDissonance,
    text: 'You came back expecting to recognise it, and not expecting it to recognise you. The second part was accurate. The first part was also accurate — you knew the streets, the direction of the wind, the sound the market made on Fridays — but recognition is not the same as belonging. The years abroad made you something without a clean name in either language. The return did not change that. It clarified it.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 5; p.setMem('ft11KurdReturnedDissonance', true) },
  },

  // ── INSTITUTIONAL_DOUBT [moderate/moral] ──────────────────────────────────────

  {
    id: 'ft11_institutional_doubt_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_doubt') &&
      G.age >= 60 &&
      !G.mem?.ft11InstitutionalDoubt,
    text: 'You noticed things and did not speak them fully — or spoke them to the wrong people, or in a frame that allowed the institution to process your concern without changing anything. That is what institutions do. You are old enough now to have watched several institutions do the same thing, which does not redeem what you did but places it in its proper category: ordinary, structural, and repeated across every institution you have seen.',
    choices: null,
    effect: (p) => { p.r += 4; p.karma -= 2; p.setMem('ft11InstitutionalDoubt', true) },
  },

  // ── INSTITUTIONAL_DISSENT [moderate/moral] ────────────────────────────────────

  {
    id: 'ft11_institutional_dissent_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('institutional_dissent') &&
      G.age >= 58 &&
      !G.mem?.ft11InstitutionalDissent,
    text: 'You wrote the letter. The response was measured and considered and ultimately structured to foreclose further dialogue while appearing to engage with it. You are still in the institution. That is the accurate summary of what happened. What you did cost something and changed something, and you are still not certain those two things are the same something.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 6; p.setMem('ft11InstitutionalDissent', true) },
  },

  // ── HAI_TRANSITION_GENERATION [moderate/political] ────────────────────────────

  {
    id: 'ft11_haiti_transition_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('hai_transition_generation') &&
      G.age >= 48 &&
      !G.mem?.ft11HaitiTransition,
    text: 'Baby Doc left on February 7, 1986. You were in the city — the specific noise of relief that fills a place when a long thing ends. You believed, in that morning, that the ending was also a beginning. You have revised this belief several times since, in both directions, without arriving at a final position. What you know now is that the morning was real. What it was the morning of is a more complicated question.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 4; p.setMem('ft11HaitiTransition', true) },
  },

  // ── COLONIAL_SUBJECT [moderate/political] ─────────────────────────────────────

  {
    id: 'ft11_colonial_subject_election',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('colonial_subject') &&
      G.age >= 25 &&
      !G.mem?.ft11ColonialElection,
    text: 'The results come in from the mainland. You are an American citizen and you will live under the outcome — the policy, the court appointments, the conditions of the next four years. You had no vote. That is the specific constitutional arrangement of your citizenship: American citizen, no vote for president, represented in Congress by a delegate who cannot vote on the floor. The other word for this arrangement is not used in the official documents.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.setMem('ft11ColonialElection', true) },
  },

  // ── EARTHQUAKE_CAMP_SURVIVOR [moderate/trauma] ────────────────────────────────

  {
    id: 'ft11_earthquake_camp_survivor_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('earthquake_camp_survivor') &&
      G.age >= 40 &&
      !G.mem?.ft11EarthquakeCamp,
    text: 'The news is about Haiti again. Something new — it is always something new. You watch the footage with the attention of someone who recognises what the blue tarpaulins mean in practice, what twice-weekly water trucks mean as a schedule, what the UN emblem on the vehicle says about what will and won\'t be done. You know what happens after the cameras move to the next thing. The cameras are moving to the next thing.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 4; p.setMem('ft11EarthquakeCamp', true) },
  },

  // ── AMAZIGH_RECOGNITION_ERA [minor/identity] ──────────────────────────────────

  {
    id: 'ft11_amazigh_recognition_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('amazigh_recognition_era') &&
      G.age >= 48 &&
      !G.mem?.ft11AmazighLate,
    text: 'The constitution recognised Tamazight in 2011. The government sign went up — your grandmother\'s letters on official signage, in the language she taught you behind a closed door. You stood in front of that sign for a long time. The recognition was real. The resources did not follow at the same pace. You have learned to hold both of those things without requiring them to resolve into a single feeling.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11AmazighLate', true) },
  },

  // ── OFW_NEW_PLACEMENT [minor/labor] ───────────────────────────────────────────

  {
    id: 'ft11_ofw_new_placement_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('ofw_new_placement') && G.age >= 22 && !G.mem?.ft11OfwNewPlacement,
    text: 'The new contract is better. The employer is not unkind. You have calibrated your expectations accordingly, which is itself information about what your expectations used to be. The work is the same work. The money goes home at the same rate. The difference between this situation and the last one is not visible to anyone who hasn\'t lived inside both.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('ft11OfwNewPlacement', true) },
  },

  // ── INFORMAL_ABROAD [minor/labor] ─────────────────────────────────────────────

  {
    id: 'ft11_informal_abroad_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('informal_abroad') && G.age >= 20 && !G.mem?.ft11InformalAbroad,
    text: 'You are working without papers, in a country that is not yours, in an arrangement that depends on no one official noticing. You have learned which streets, which hours, which conversations are navigable. The specific knowledge of a person operating just below the threshold of official attention accumulates into competence. You do not celebrate this. It is what the situation requires.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.setMem('ft11InformalAbroad', true) },
  },

  // ── CARE_WORK_DONE [minor/labor] ──────────────────────────────────────────────

  {
    id: 'ft11_care_work_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('care_work_done') && G.age >= 45 && !G.mem?.ft11CareWorkLate,
    text: 'You cared for someone until there was nothing more to care for. The specific weight of it — the things you learned to do, the hours, what you witnessed — is not the kind of thing that translates into a summary. You were present for something that most people arrange not to see up close. You are still carrying what that cost, and what it gave. They are the same thing from different angles.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 6; p.setMem('ft11CareWorkLate', true) },
  },

  // ── OFW_CYCLE_WITNESS [minor/migration] ───────────────────────────────────────

  {
    id: 'ft11_ofw_cycle_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_cycle_witness') &&
      G.age >= 48 &&
      !G.mem?.ft11OfwCycleWitness,
    text: 'Your child is now the age you were when you left. They are talking about going. You hear yourself in the reasons they give and in the things they don\'t say. You have the specific receipts — what the contract costs, what the absence costs, what the money makes possible and what it doesn\'t. You are not certain that knowing would have changed what you decided. You are less certain it would change what they decide.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 4; p.setMem('ft11OfwCycleWitness', true) },
  },

  // ── MULTIPARTY_GENERATION [minor/political] ───────────────────────────────────

  {
    id: 'ft11_multiparty_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('multiparty_generation') &&
      G.age >= 52 &&
      !G.mem?.ft11MultipartyLate,
    text: 'You remember the first ballot with an opposition name on it — the polling booth, the paper, the feeling of marking a line no one had told you to make. What democracy delivered since has been complicated and insufficient and real. You don\'t simplify it in either direction. Neither the people who say it changed nothing nor the ones who say it changed everything are describing what you have watched happen.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.setMem('ft11MultipartyLate', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // DESIRE TENSION EVENTS — leave_mark and redemption
  // These two desires were missing from events_followthrough_8.js.
  // Pattern: places the character's wound in a specific present-day situation
  // with a fork between acting from the wound or against it.
  // ═══════════════════════════════════════════════════════════════════════════════

  {
    id: 'ft11_desire_leave_mark',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 36 && G.age <= 54 &&
      !G.mem?.ft11DesireLeaveMark,
    text: 'Something you built — a project, a programme, a body of work — is at risk of being dismantled. It would survive with your involvement; without it, probably not. Going back in costs things you have spent years building elsewhere. The work would outlive this year with your name eventually removed from the story of how it survived. You would know. No one else would know you were the reason.',
    choices: [
      {
        text: 'Go back in. The work matters more than the credit.',
        tag: 'leave_mark_acted',
        outcome: 'You go back. The work survives. The cost is real. You find you can live with it more easily than you expected.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.r -= 4; p.setMem('ft11DesireLeaveMark', true) },
      },
      {
        text: 'Let it go. What you built was real while it lasted.',
        tag: null,
        outcome: 'You walk away. The work does not survive the year. Something in you keeps the accounting.',
        effect: (p) => { p.m -= 5; p.r += 6; p.setMem('ft11DesireLeaveMark', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft11_desire_redemption',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 34 && G.age <= 54 &&
      !G.mem?.ft11DesireRedemption,
    text: 'The person you wronged is somewhere you could reach. Not catastrophically — no great crime — but you turned away at the moment someone needed, or told a version of events that served you, or let them carry something you should have shared. They don\'t know you carry it. Reaching out would be for you as much as for them. You are honest enough to know this. You\'re also not sure it means the reaching shouldn\'t happen.',
    choices: [
      {
        text: 'Reach out. Expect nothing in return.',
        tag: 'attempted_repair',
        outcome: 'You reach out. The response is uncertain and partial and real. Something loosens that you have been holding for years.',
        effect: (p) => { p.m += 5; p.karma += 10; p.r -= 6; p.setMem('ft11DesireRedemption', true) },
      },
      {
        text: 'Leave it in the past. Some repair is not yours to make.',
        tag: null,
        outcome: 'You leave it. The logic holds. The thing you\'re carrying doesn\'t entirely agree with the logic.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft11DesireRedemption', true) },
      },
    ],
    effect: null,
  },

]

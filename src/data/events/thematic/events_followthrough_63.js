// events_followthrough_63.js
// Follow-throughs for South Africa depth flags:
// sa_sharpeville_generation, sa_pass_humiliation, sa_biko_generation,
// sa_anc_exile, sa_forced_removal, sa_mbeki_aids_era, sa_born_free,
// sa_service_delivery_era.
// Follow-throughs for Afghanistan depth flags:
// afg_taliban_96_generation, afg_education_revoked, afg_secret_schooling,
// afg_2001_liberation_hope, afg_interpreter_served, afg_2021_stayed, afg_2021_escaped.

export const FOLLOWTHROUGH_63_EVENTS = [

  // ── SOUTH AFRICA: SHARPEVILLE ──────────────────────────────────────────────────

  {
    id: 'ft63_sharpeville_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_sharpeville_generation') &&
      G.age >= 35 &&
      !G.mem?.ft63SharpevilleMid,
    text: `In 1996 the commission begins taking testimony, and you give yours or you do not; it is voluntary. Either way the names are read out, all sixty-nine. March 21 becomes Human Rights Day on the new calendar, a public holiday on the date of one of the worst days. You keep it with a feeling that has no clean name.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft63SharpevilleMid', true) },
  },

  {
    id: 'ft63_sharpeville_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_sharpeville_generation') &&
      G.age >= 55 &&
      !G.mem?.ft63SharpevlleLate,
    text: (G) => `${G.currentYear >= 2002 ? 'The Sharpeville memorial is opened in 2002. ' : ''}${G.currentYear >= 2020 ? 'Sixty years on, in 2020, the commemorations are cancelled because of COVID. ' : ''}The names are still the names. ${G.currentYear >= 1995 ? 'The sixty-nine who fell are part of what the country officially calls its history now —' : 'The sixty-nine who fell are not in the history the state teaches. It is'} a history that was being made, not observed, on that day, and that you were inside. You carry this differently now than you did at twenty. The weight has redistributed but has not gone.`,
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft63SharpevlleLate', true) },
  },

  // ── SOUTH AFRICA: PASS BOOK ────────────────────────────────────────────────────

  {
    id: 'ft63_pass_abolition',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('sa_pass_humiliation') &&
      G.currentYear >= 1986 && G.currentYear <= 1990 &&
      G.age >= 25 &&
      !G.mem?.ft63PassAbolish,
    text: `July 1986, and the pass laws are abolished. People are burning their reference books in the street, and yours is in your pocket. The burning is a ceremony, and you understand it, and you also understand that repealing the pass laws does not undo what was done under them. But the book can go. You add it to the fire, and the weight you stop carrying was never a physical weight.`,
    choices: null,
    effect: (p) => { p.m += 8; p.r += 4; p.karma += 3; p.setMem('ft63PassAbolish', true) },
  },

  // ── SOUTH AFRICA: STEVE BIKO ───────────────────────────────────────────────────

  {
    id: 'ft63_biko_late',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('sa_biko_generation') &&
      G.age >= 45 && G.currentYear >= 1999 &&
      !G.mem?.ft63BikoLate,
    text: `The policemen who killed Steve Biko apply to the Truth Commission for amnesty. They say the beating happened during an interrogation and went further than intended. In 1999 the commission refuses amnesty, finding that they lied. None of them is prosecuted. Biko's ideas are taught in universities, and the men who killed him are not in prison.`,
    context: 'The applicants included Gideon Nieuwoudt, Harold Snyman and Ruben Marx. Nieuwoudt died in 2005 without being tried.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 5; p.setMem('ft63BikoLate', true) },
  },

  // ── SOUTH AFRICA: ANC EXILE ────────────────────────────────────────────────────

  {
    id: 'ft63_exile_return_1990',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('sa_anc_exile') &&
      G.currentYear >= 1990 && G.currentYear <= 1994 &&
      !G.mem?.ft63ExileReturn,
    text: `The unbanning of the ANC on February 2, 1990 means you can come home. Or you can. Some of the exiles who left in the 1960s or 1970s are old now — they left as young people and are returning as older ones, to a country that recognises them as heroes and that has also been living without them. The Lusaka generation, the London generation. You come back and you find that the country has continued and developed its own internal logic and its own leadership and that the exile experience, which felt at the time like the centre of things, was not exactly the centre. Both things were the centre, separately.`,
    choices: null,
    effect: (p) => { p.m += 6; p.r += 6; p.setMem('ft63ExileReturn', true) },
  },

  // ── SOUTH AFRICA: FORCED REMOVAL ──────────────────────────────────────────────

  {
    id: 'ft63_removal_restitution',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_forced_removal') &&
      G.currentYear >= 1994 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft63Restitution,
    text: `If you can prove the land was taken after June 19, 1913, you can claim it. The process is slow and made of forms. Some families get the land back; most are offered money instead. What was taken was an address, a house, the lemon tree in a yard. The money is for what cannot be bought back.`,
    context: 'The Restitution of Land Rights Act of 1994 covered dispossession under the 1913 Natives Land Act, the Group Areas Act and other racially discriminatory laws.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 3; p.setMem('ft63Restitution', true) },
  },

  // ── SOUTH AFRICA: MBEKI AIDS ──────────────────────────────────────────────────

  {
    id: 'ft63_mbeki_aids_post',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_mbeki_aids_era') &&
      G.currentYear >= 2008 && G.currentYear <= 2015 &&
      !G.mem?.ft63MbekiPost,
    text: `The antiretrovirals come at last, after the courts order them. The Treatment Action Campaign wore the T-shirts into parliament, and some of its people refused their own pills until everyone could have them. Mbeki resigns in 2008, and the statistics are counted later. You know people who died in those years. Next to each of their names now sits the word preventable.`,
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 4; p.karma += 4; p.setMem('ft63MbekiPost', true) },
  },

  // ── SOUTH AFRICA: BORN FREE ───────────────────────────────────────────────────

  {
    id: 'ft63_born_free_vote',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('sa_born_free') &&
      G.currentYear >= 2014 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.ft63BornFreeVote,
    text: `Your first vote or your second, and the ANC's majority is smaller than in 1994; the EFF is in parliament; the DA is growing in some provinces. You vote, or you don't, which the ANC would once have called betrayal and which reads differently in a democracy that is twenty years old. For the generation that waited a lifetime to vote, it meant something else. You did not wait. Voting was there when you arrived.`,
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.e += 2; p.setMem('ft63BornFreeVote', true) },
  },

  // ── SOUTH AFRICA: SERVICE DELIVERY ────────────────────────────────────────────

  {
    id: 'ft63_service_delivery_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_service_delivery_era') &&
      G.age >= 50 &&
      !G.mem?.ft63ServiceLate,
    text: `The electricity came, or the water plant was upgraded, or the school got its laboratory: after the protest, or twenty years after the promise. The improvement is real. The people who promised it in 1994 were not lying; there was corruption, and too little money, and too few people who knew how. None of that makes twenty years feel like the right answer.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft63ServiceLate', true) },
  },

  // ── AFGHANISTAN: TALIBAN 1996 ─────────────────────────────────────────────────

  {
    id: 'ft63_afg_96_late',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('afg_taliban_96_generation') &&
      G.age >= 45 &&
      !G.mem?.ft63Afg96Late,
    text: (G) => `The Taliban era of 1996–2001 lasted five years. By the time you are old enough to think about it historically, you understand that five years is both a short time and the time in which a generation of girls had no formal education, in which all public music stopped, in which the Bamiyan Buddhas were destroyed, in which people lived with the quality of fear that comes from a regime that is both local and certain of its righteousness.${G.currentYear >= 2022 ? ' The twenty years after (2001–2021) were an interval. When the Taliban returned in 2021 you watched people outside Afghanistan say they were surprised.' : ' The years since 2001 are called the after. You are not sure yet that they are.'}`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft63Afg96Late', true) },
  },

  // ── AFGHANISTAN: EDUCATION REVOKED ────────────────────────────────────────────

  {
    id: 'ft63_afg_educ_2001',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('afg_education_revoked') &&
      G.currentYear >= 2001 && G.currentYear <= 2006 &&
      !G.mem?.ft63AfgEduc2001,
    text: `The school reopens in December 2001, with UNICEF boxes of exercise books stacked by the door. The teacher from the back room comes back, or a stranger takes her place. You are older than you should be for the grade you start in, and so are other girls. The gap of those years does not close. You have been working around it for five years and you keep doing so.`,
    choices: null,
    effect: (p) => { p.m += 10; p.e += 8; p.setMem('ft63AfgEduc2001', true) },
  },

  {
    id: 'ft63_afg_educ_2021',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('afg_education_revoked') &&
      G.currentYear >= 2021 &&
      G.age >= 32 &&
      !G.mem?.ft63AfgEduc2021,
    text: `March 2022, and the Taliban say the girls can go back to secondary school, and by the afternoon a different faction has changed that, and the schools do not open. Then the universities close to women too. You lost five years of school in 1996, and got twenty years back, and now the fifteen-year-old girls of your street sit at home. You are watching your own history, which you thought was history, become theirs.`,
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 8; p.setMem('ft63AfgEduc2021', true) },
  },

  // ── AFGHANISTAN: SECRET SCHOOLING ─────────────────────────────────────────────

  {
    id: 'ft63_afg_secret_school_late',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_secret_schooling') &&
      G.age >= 30 &&
      !G.mem?.ft63SecretSchoolLate,
    text: `Afsana died or moved or stopped teaching. You remember the texture of those lessons: the way you read faster than normal because time was shorter than normal, the weight of the book that was also the weight of being caught with it, the quality of the silence when there was a sound outside. You finished secondary school after 2001 or you didn't quite, but you had years that wouldn't have existed without that back room. You don't know if Afsana is still alive. You think about this more than you think people would expect.`,
    choices: null,
    effect: (p) => { p.m += 3; p.r += 6; p.karma += 5; p.setMem('ft63SecretSchoolLate', true) },
  },

  // ── AFGHANISTAN: 2001 LIBERATION HOPE ─────────────────────────────────────────

  {
    id: 'ft63_afg_hope_2010',
    phase: null,
    weight: 2,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('afg_2001_liberation_hope') &&
      G.currentYear >= 2008 && G.currentYear <= 2016 &&
      G.age >= 25 &&
      !G.mem?.ft63AfgHope2010,
    text: `The hope of 2001 is still there, smaller now. The corruption is in plain sight, the poppy harvest breaks records, and the foreigners have begun talking about leaving. The Taliban, who were finished, hold ground in Helmand and Kandahar and fight every season. The girls' school that opened in 2002 is still open. You think about whether it will stay open in a way you did not in 2002.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 4; p.setMem('ft63AfgHope2010', true) },
  },

  // ── AFGHANISTAN: INTERPRETER ──────────────────────────────────────────────────

  {
    id: 'ft63_afg_interpreter_post',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('afg_interpreter_served') &&
      G.currentYear >= 2015 && G.currentYear <= 2020 &&
      G.age >= 28 &&
      !G.mem?.ft63InterpPost,
    text: `The soldiers rotate and you stay. Four units now, four nationalities. What you translate is not only words: how an elder uses silence, what a phrase means from a farmer and from a district official, what a source is holding back and why. You know you are a target as well. Your visa application is somewhere in a consular system, and you have been told it is processing.`,
    choices: null,
    effect: (p) => { p.e += 5; p.r += 5; p.setMem('ft63InterpPost', true) },
  },

  // ── AFGHANISTAN: 2021 STAYED ──────────────────────────────────────────────────

  {
    id: 'ft63_afg_stayed_2023',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('afg_2021_stayed') &&
      G.currentYear >= 2022 &&
      G.age >= 18 &&
      !G.mem?.ft63StayedPost,
    text: `Two years since the Taliban came back. Women may not go to secondary school or university, may not work in most jobs, may not travel far without a mahram, may not go to the park. The shops are open and there is food if you have money, and the power cuts are worse. You are managing. The word covers a great deal.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.h -= 5; p.setMem('ft63StayedPost', true) },
  },

  // ── AFGHANISTAN: 2021 ESCAPED ─────────────────────────────────────────────────

  {
    id: 'ft63_afg_escaped_first_year',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('afg_2021_escaped') &&
      G.currentYear >= 2021 && G.currentYear <= 2023 &&
      G.age >= 16 &&
      !G.mem?.ft63EscapedFirst,
    text: `The processing centre, or the transit country, or the hotel in Germany with refugees on every floor. The interview asks you to produce your fear for a stranger at a desk, through an interpreter, in a format. Refugee, asylum seeker, parolee, visa holder: each category has its own rights and its own clock. You know people who waited two years and people who were resettled in eight months. The difference is not entirely luck and not entirely the system.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.setMem('ft63EscapedFirst', true) },
  },

  // ── AFGHANISTAN: INTERPRETER EVACUATED ────────────────────────────────────────

  {
    id: 'ft63_interp_evacuated_resettled',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('afg_interpreter_evacuated') &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.ft63InterpEvac,
    text: `The apartment in Virginia, or Maryland, or Sacramento. The visa took two years and a senator's office and a retired colonel who wrote three letters. The agency pays three months, and then you work, for less than you earned translating for the Army, in a country where the people looking for you are not looking. Your languages and the reading of what people don't say fit no American job description. At night you check the news from Afghanistan.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 6; p.e += 3; p.setMem('ft63InterpEvac', true) },
  },

  // ── AFGHANISTAN: AID ECONOMY WORKER ──────────────────────────────────────────

  {
    id: 'ft63_aid_worker_reckoning',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('afg_aid_economy_worker') &&
      G.age >= 45 &&
      !G.mem?.ft63AidReckoning,
    text: `The inspector-general's reports come out: twenty years of money, and a government that fell in eleven days. You know what the programme you worked on did. The clinics ran for eight years, until the funding cycle ended; the road was built to a contract and not to the hillside; the girls' school operated for twelve years. Most of it did not last, and some of it might have. From inside it is not always clear which is which.`,
    context: 'The US Special Inspector General for Afghanistan Reconstruction estimated about 145 billion dollars in reconstruction spending between 2002 and 2021.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft63AidReckoning', true) },
  },

  // ── AFGHANISTAN: DIASPORA WATCHES ─────────────────────────────────────────────

  {
    id: 'ft63_diaspora_phones_2022',
    phase: null,
    weight: 2,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('afg_diaspora_watches') &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.ft63DiasporaPhones,
    text: `The calls on WhatsApp, when the connection holds, from your sister or your mother or a cousin in Kabul, careful the way people are careful who know phones are not private. You ask how things are, and they say fine, or difficult, or prices have gone up. Over months the details pile up: the daughter not in school, the husband who lost his ministry job, the brother who cannot leave. You send money through hawala, and it arrives. What money cannot do is also clear.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.setMem('ft63DiasporaPhones', true) },
  },

  // ── AFGHANISTAN: POST-2021 LIFE ────────────────────────────────────────────────

  {
    id: 'ft63_post_2021_years',
    phase: null,
    weight: 2,
    when: (G) =>
      G.age <= 49 &&
      G.flags.has('afg_post_2021_life') &&
      G.currentYear >= 2024 &&
      G.age >= 20 &&
      !G.mem?.ft63Post2021Years,
    text: `Three years since August 2021. The Taliban administration has not received international recognition but it has not collapsed either. The humanitarian situation is among the worst in the world — 97 percent of the population below the poverty line by some measures. The management of daily life: the thing you don't say, the thing you have stopped doing, the calculation you make each morning about the day. You have become expert at the calculation. You have become someone you would not have expected to become, in the way people become someone specific through extended constraint.`,
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.h -= 3; p.setMem('ft63Post2021Years', true) },
  },

  // ── SOUTH AFRICA: AFRIKANER TRANSFORMED ───────────────────────────────────────

  {
    id: 'ft63_afrikaner_language_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_afrikaner_transformed') &&
      G.age >= 50 &&
      !G.mem?.ft63AfrikanerLate,
    text: `The Afrikaans that remains. Stellenbosch switches to English, and Die Burger adjusts, and the music carries on and spreads, carrying the language into forms its first defenders could not have imagined. The Cape Malay poet writes in it; the Griqua speak a version that is not yours. You have held on to the language and found in it things that are yours and things that are not only yours. You prefer it as an argument to having it as a possession.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft63AfrikanerLate', true) },
  },

  // ── SOUTH AFRICA: LAND DEBATE ──────────────────────────────────────────────────

  {
    id: 'ft63_land_debate_later',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_land_debate_era') &&
      G.currentYear >= 2024 &&   // "six or seven years" after 2018
      G.age >= 50 &&
      !G.mem?.ft63LandLater,
    text: `The land question is still not settled. The amendment debate of 2018 stalled and started and stalled, and the claims deadline was extended and extended again. Who owns how much, and when it was taken, has not changed. The question rises and falls with each election. Whatever you thought in 2018, watching six years of argument without an ending has changed how you hold it.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft63LandLater', true) },
  },

]

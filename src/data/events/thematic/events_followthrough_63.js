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
    text: `In 1996 the Human Rights Commission begins accepting testimony. You give yours or you do not — the TRC process is specific about this: testimony is voluntary. Whether you speak or stay silent, the accounting becomes public. Sixty-nine names. The inquiry report. The date — March 21 — becomes Human Rights Day on the new calendar, which means the day that was one of the worst days acquires a new civic status, a red-letter status. You observe Human Rights Day with a feeling that has no clean name: not pride, not grief exactly, something that holds both.`,
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
    text: `The Sharpeville memorial is opened in 2002. Sixty years later, in 2020, commemorations are cancelled because of COVID. The names are still the names. The sixty-nine who fell are part of what the country officially calls its history now — a history that was being made, not observed, on that day, and that you were inside. You carry this differently now than you did at twenty. The weight has redistributed but has not gone.`,
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft63SharpevlleLate', true) },
  },

  // ── SOUTH AFRICA: PASS BOOK ────────────────────────────────────────────────────

  {
    id: 'ft63_pass_abolition',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sa_pass_humiliation') &&
      G.currentYear >= 1986 && G.currentYear <= 1990 &&
      G.age >= 25 &&
      !G.mem?.ft63PassAbolish,
    text: `July 1986. P.W. Botha announces the abolition of the pass laws. You have carried a dompas for however many years it has been. The announcement is on the radio. People are burning their reference books in the street. You have yours in your pocket. The burning is a ceremony and you understand it and you also understand that the pass laws being repealed is not the same thing as everything that was done under the pass laws being undone. But the book can go. You add it to the fire or you simply stop carrying it. The weight you stopped carrying was not a physical weight.`,
    choices: null,
    effect: (p) => { p.m += 8; p.r += 4; p.karma += 3; p.setMem('ft63PassAbolish', true) },
  },

  // ── SOUTH AFRICA: STEVE BIKO ───────────────────────────────────────────────────

  {
    id: 'ft63_biko_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('sa_biko_generation') &&
      G.age >= 45 &&
      !G.mem?.ft63BikoLate,
    text: `The TRC hearings eventually take testimony about Steve Biko. The security policemen who killed him — Gideon Nieuwoudt, Harold Snyman, Ruben Marx, and others — apply for amnesty. Their testimony: they say the beating happened during an interrogation and went further than intended. The TRC denies amnesty for the killing of Biko in 1999, finding that the applicants made false statements. None of them is prosecuted. Nieuwoudt dies in 2005. The ideas Biko articulated are taught in universities. The policemen who killed him are not in prison.`,
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
    text: `The Land Restitution Act of 1994. If you can prove dispossession after June 19, 1913 — under the Group Areas Act, the Native Land Act, or any apartheid legislation — you can claim. The claim process is bureaucratic and slow. Some families get land back. Many get compensation instead of land. The land that was taken was specific: a specific address, a specific house, specific fruit trees in a specific yard. The compensation is not specific. It is money for what cannot be bought back.`,
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
    text: `The ARVs are eventually rolled out after court orders obtained by the Treatment Action Campaign. Zackie Achmat and the TAC: people who refused to take medication themselves until it was available to everyone, people who went to parliament in the T-shirts. Mbeki resigns in 2008. The statistics are compiled later. The specific word for what was prevented from happening — "preventable deaths" — becomes the phrase that holds the era. You know some people who died in those years. The preventable qualifier sits next to each of their names.`,
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
    text: `The 2014 election or the 2019 election. Your first vote or your second. The ANC's majority is smaller than it was in 1994. The EFF has entered parliament. The DA has grown in some provinces. You vote — or you don't, which is also a choice that the ANC would once have called a betrayal and that now reads differently in a democracy that has been a democracy for twenty years. The vote means something different to the generation that waited to vote for twenty-seven years. You did not wait. You arrived into a country where voting was already there.`,
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
    text: `The electricity finally came — or the water treatment plant was upgraded — or the school got its laboratory — eventually, after the protest or years after. The improvement is real. It arrived twenty years after it was promised. These two facts coexist. The people who made the promise in 1994 were not cynical; the gap between the promise and the delivery was a failure of capacity and a success of corruption and a failure of governance and a real constraint of inherited fiscal position. All of these are true. None of them makes you feel that the twenty-year wait was the right result.`,
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft63ServiceLate', true) },
  },

  // ── AFGHANISTAN: TALIBAN 1996 ─────────────────────────────────────────────────

  {
    id: 'ft63_afg_96_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_taliban_96_generation') &&
      G.age >= 45 &&
      !G.mem?.ft63Afg96Late,
    text: `The Taliban era of 1996–2001 lasted five years. By the time you are old enough to think about it historically, you understand that five years is both a short time and the time in which a generation of girls had no formal education, in which all public music stopped, in which the Bamiyan Buddhas were destroyed, in which people lived with the specific quality of fear that comes from a regime that is both local and certain of its righteousness. The twenty years after (2001–2021) were an interval. When the Taliban returned in 2021 you watched people outside Afghanistan say they were surprised.`,
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
    text: `The school reopens in December 2001. The Taliban have gone from Kabul. UNICEF helps distribute supplies. The teacher who taught you in the back room comes back — or another teacher comes, or the school is new and the teachers are strangers. You are older now than you should be for the grade you start in. Some girls are. The gap in the years does not close but you work around it. You have been working around gaps for five years.`,
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
    text: `In March 2022 the Taliban announce that girls can return to secondary school. The announcement is retracted the same day — changed, within hours, by a different faction. The schools do not open. Secondary and university education for women is banned. Your daughter is fifteen. You have a daughter who is fifteen and the schools do not open. You had five years of education suspended in 1996. You had twenty years of education regained. Your daughter is fifteen and you are watching your own history, which you thought was history, become her present.`,
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
    text: `Afsana died or moved or stopped teaching. You remember the texture of those lessons: the way you read faster than normal because time was shorter than normal, the weight of the book that was also the weight of being caught with it, the specific quality of the silence when there was a sound outside. You finished secondary school after 2001 or you didn't quite, but you had years that wouldn't have existed without that back room. You don't know if Afsana is still alive. You think about this more than you think people would expect.`,
    choices: null,
    effect: (p) => { p.m += 3; p.r += 6; p.karma += 5; p.setMem('ft63SecretSchoolLate', true) },
  },

  // ── AFGHANISTAN: 2001 LIBERATION HOPE ─────────────────────────────────────────

  {
    id: 'ft63_afg_hope_2010',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_2001_liberation_hope') &&
      G.currentYear >= 2008 && G.currentYear <= 2016 &&
      G.age >= 25 &&
      !G.mem?.ft63AfgHope2010,
    text: `The hope of 2001 is still there, but it has been calibrated by what the reconstruction actually produced. The corruption is visible. The foreign forces are beginning their drawdown discussions. The poppy fields are at record production. The Taliban, who everyone said were finished, hold territory in Helmand and Kandahar and are fighting every season. The girls' school that opened in 2002 is still open. Whether it will remain open is a question you think about differently than you did in 2002, when it felt like a permanent state of affairs.`,
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
    text: `The soldiers rotate. You stay. You have now worked with four different units of four different nationalities. The things you know how to translate are not just words — you know how an elder uses silence, what a particular phrase means when a farmer uses it versus when a government official uses it, which information a source is withholding and why. This knowledge is yours. The knowledge that you are also a target is yours. The visa application is somewhere in a consular system. You have been told it is processing.`,
    choices: null,
    effect: (p) => { p.e += 5; p.r += 5; p.setMem('ft63InterpPost', true) },
  },

  // ── AFGHANISTAN: 2021 STAYED ──────────────────────────────────────────────────

  {
    id: 'ft63_afg_stayed_2023',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('afg_2021_stayed') &&
      G.currentYear >= 2022 &&
      G.age >= 18 &&
      !G.mem?.ft63StayedPost,
    text: `Two years after the Taliban returned. The things that have changed: women cannot attend secondary school or university, cannot work in most sectors, cannot travel without a mahram, cannot go to parks. The things that haven't changed: the shops are open, the food is there if you have money, the power cuts are worse than before but not catastrophic. The Taliban are trying to get international recognition and have not gotten it. The humanitarian situation is severe — half the population needs aid. You are managing. The word "managing" covers an enormous range of experiences.`,
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
    text: `The transit country or the processing centre or the refugee hotel in Germany. The paperwork. The interview about why you left, which requires you to produce your fear in English or through an interpreter, in a specific format, to a stranger behind a desk. The category you are being sorted into — refugee, asylum seeker, humanitarian parolee, Special Immigrant Visa holder — each comes with different rights and different timelines. You know people who were held in processing for two years. You know people who were resettled within eight months. The difference is the category and the country you land in and something that is neither entirely luck nor entirely system.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.e += 3; p.setMem('ft63EscapedFirst', true) },
  },

  // ── AFGHANISTAN: INTERPRETER EVACUATED ────────────────────────────────────────

  {
    id: 'ft63_interp_evacuated_resettled',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('afg_interpreter_evacuated') &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.ft63InterpEvac,
    text: `The apartment in Virginia or Maryland or Sacramento. The SIV — Special Immigrant Visa — that took two years and a congressional inquiry and a senator's office and a retired colonel who wrote three letters. You have it. You are here. The resettlement agency provides three months of assistance. After three months you are expected to work, which you do, at a wage that is not what you earned translating for the Army but which is real and yours and in a country where the person looking for you is not looking for you here. The skills you brought — the languages, the contextual reading, the ability to derive meaning from incomplete information — are not skills that transfer cleanly into any American job description. You work in something adjacent. At night you check the news from Afghanistan. The language is still yours even if the country is not reachable.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 6; p.e += 3; p.setMem('ft63InterpEvac', true) },
  },

  // ── AFGHANISTAN: AID ECONOMY WORKER ──────────────────────────────────────────

  {
    id: 'ft63_aid_worker_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_aid_economy_worker') &&
      G.age >= 45 &&
      !G.mem?.ft63AidReckoning,
    text: `The reckoning, which comes in different forms for different people. The SIGAR reports — the Special Inspector General for Afghanistan Reconstruction — document $145 billion spent over twenty years and the collapse of the government in eleven days. The specific programme you worked on: you know what it did. The clinics that ran for eight years before the funding cycle ended. The roads that were built to contract specifications that were not local conditions. The girls' school that operated for twelve years. You have worked in a sector that produced things that mostly did not last and some things that might have. The distinction between the two categories is not always clear from inside.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft63AidReckoning', true) },
  },

  // ── AFGHANISTAN: DIASPORA WATCHES ─────────────────────────────────────────────

  {
    id: 'ft63_diaspora_phones_2022',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_diaspora_watches') &&
      G.currentYear >= 2022 &&
      G.age >= 25 &&
      !G.mem?.ft63DiasporaPhones,
    text: `The phone calls. Your sister or your mother or your cousin in Kabul, calling on WhatsApp when the connection holds. The conversation is careful — careful in a specific way, the careful of people who know phones are not private in certain countries, who have learned to speak around things. You ask how things are. They say it's fine or it's difficult or the prices have gone up. The specifics of difficulty accumulate over months of calls: the daughter not in school, the husband who lost his job at the ministry, the brother who cannot leave. You send money through hawala when the banking system is inaccessible. The money arrives. What the money cannot do is also clear.`,
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.setMem('ft63DiasporaPhones', true) },
  },

  // ── AFGHANISTAN: POST-2021 LIFE ────────────────────────────────────────────────

  {
    id: 'ft63_post_2021_years',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('afg_post_2021_life') &&
      G.currentYear >= 2024 &&
      G.age >= 20 &&
      !G.mem?.ft63Post2021Years,
    text: `Three years since August 2021. The Taliban administration has not received international recognition but it has not collapsed either. The humanitarian situation is among the worst in the world — 97 percent of the population below the poverty line by some measures. The specific management of daily life: the thing you don't say, the thing you have stopped doing, the calculation you make each morning about the day. You have become expert at the calculation. You have become someone you would not have expected to become, in the way people become someone specific through extended constraint.`,
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
    text: `The Afrikaans that remains. Stellenbosch University switches to English. Die Burger adjusts. The music — Boerekuns, Koos Kombuis, Fokofpolisiekar, newer artists who don't use the genre labels — continues and expands, carrying the language into forms its early proponents could not have predicted. You have held the language through the transformation and you have found in it things that belong to you and things that don't belong only to you. The Cape Malay poet who writes in Afrikaans. The Griqua community whose Afrikaans is not your Afrikaans. The language as a site of argument rather than an inheritance is different from the language as a possession. You prefer the argument.`,
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
      G.age >= 50 &&
      !G.mem?.ft63LandLater,
    text: `The land question has not been resolved. The constitutional amendment process that began in 2018 produced debate, stalled, produced more debate. Land restitution claims continue to move through a process that was extended to 2021, then again. The arithmetic — who owns how much and when it was taken — has not changed. The political salience of the question rises and falls with election cycles and coalition arrangements. Whatever your position in 2018, you hold it now with the modification that comes from watching a large public argument unfold without resolution for six or seven years. The argument itself has taught you something, even if it hasn't settled anything.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('ft63LandLater', true) },
  },

]

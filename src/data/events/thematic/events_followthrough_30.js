// events_followthrough_30.js — MODE B follow-through sprint.
// Event guards for the major partial flags: flags set by triggering events that
// never surfaced again in the life. Each event here is the echo — the year when
// the stone hits the water a second time.

export const FOLLOWTHROUGH_30_EVENTS = [

  // ─── BUSINESS FAILURE ────────────────────────────────────────────────────────

  {
    id: 'ft30_business_second_attempt',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('business_failed') &&
      !G.flags.has('second_business_started') &&
      !G.flags.has('business_started') &&
      G.age >= 34 &&
      !G.mem?.ft30Biz2,
    text: 'Five years on from the failure. You have processed it to the extent it can be processed — the structural causes, the choices you made, the six months in which you launched into a market that was already closing. The knowledge doesn\'t resolve the question of what to do with it.',
    choices: [
      {
        text: 'Start something smaller, with less exposed.',
        tag: 'second_business_started',
        outcome: 'You start again — a side project first, then a real thing. The scar tissue from the first failure is, it turns out, structural knowledge.',
        effect: (p) => { p.addFlag('second_business_started'); p.w += 3; p.e += 4; p.m += 6; p.setMem('ft30Biz2', true) },
      },
      {
        text: 'Close the chapter.',
        tag: 'business_chapter_closed',
        outcome: 'The energy goes elsewhere — the career, the family, the life that doesn\'t require a pitch deck.',
        effect: (p) => { p.addFlag('business_chapter_closed'); p.m += 4; p.s += 2; p.setMem('ft30Biz2', true) },
      },
    ],
  },

  // ─── FORECLOSURE GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft30_foreclosure_renting_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('foreclosure_generation') &&
      !G.flags.has('bought_property') &&
      G.age >= 38 &&
      !G.mem?.ft30ForcRent,
    text: 'Fifteen years since the foreclosure. You have been renting since. The housing market did not wait — it rose and rose and the window that existed in 2010, 2012, when prices were low enough to have been a re-entry point, is a different kind of window now. You watch people your age talk about their mortgage as if it is normal. For them it is.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 6; p.e += 2; p.setMem('ft30ForcRent', true) },
  },

  // ─── OPIOID CRISIS ───────────────────────────────────────────────────────────

  {
    id: 'ft30_opioid_years_after',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('opioid_crisis_touched') &&
      G.age >= 35 &&
      !G.mem?.ft30OpioidYrs,
    text: 'The person you lost to it — brother, cousin, the friend from high school, someone in that range — you have been doing the arithmetic since. How many years. What they would be doing. The opioid crisis has become a political subject, a public health subject, a wikipedia entry with a graph. The person was not a subject.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 8; p.e += 2; p.setMem('ft30OpioidYrs', true) },
  },

  // ─── SURVIVED AIDS ───────────────────────────────────────────────────────────

  {
    id: 'ft30_survived_aids_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('survived_aids_crisis') &&
      G.age >= 38 &&
      G.age < 55 &&
      !G.mem?.ft30AidsMid,
    text: 'You are alive and your friends from those years are mostly not. The arithmetic has been part of your structure for so long you don\'t notice it until someone younger asks how many people you knew who died. The number you say out loud surprises them. It doesn\'t surprise you. The survival is not a comfort. It is a condition.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 3; p.e += 3; p.karma += 4; p.setMem('ft30AidsMid', true) },
  },

  {
    id: 'ft30_survived_aids_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('survived_aids_crisis') &&
      G.age >= 55 &&
      !G.mem?.ft30AidsLate,
    text: 'They call you a long-term survivor. The word implies a crisis with a defined end, a before and after. The crisis did not end — it shifted. The friends you lost in the 1980s and 1990s: the names accumulate. The Kaposi\'s, the pneumocystis, the wasting. You survived and you do not always know why you and not them. The question does not resolve. You have learned to carry it rather than answer it.',
    choices: null,
    effect: (p) => { p.r += 10; p.e += 4; p.m -= 4; p.karma += 5; p.setMem('ft30AidsLate', true) },
  },

  // ─── 9/11 GENERATION ─────────────────────────────────────────────────────────

  {
    id: 'ft30_sept11_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sept11_generation_us') &&
      G.currentYear >= 2011 &&
      G.age >= 28 &&
      !G.mem?.ft30Sept11Dec,
    text: 'Ten years. Two wars. Trillions of dollars and a number of dead that is still being counted. The airport queue you will be in for the rest of your life. You remember where you were that morning and what the air smelled like in the days after. The country that emerged from it is a different country — less trusting, more surveilled, capable of things you did not think it was capable of. You have been living in that country since.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft30Sept11Dec', true) },
  },

  // ─── SCHOOL SHOOTING ERA ─────────────────────────────────────────────────────

  {
    id: 'ft30_school_shooting_normalized',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('school_shooting_era') &&
      G.age >= 30 &&
      !G.mem?.ft30ShootNorm,
    text: 'The first drills were for something terrible and unlikely. At some point — you cannot identify when — they became part of the ordinary texture of a school year. Your children do them now. The routine is the problem: a thing processed as routine was never supposed to happen. They come home from a drill with the same face they bring home from PE.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 5; p.e += 2; p.setMem('ft30ShootNorm', true) },
  },

  // ─── KING ASSASSINATION GENERATION ──────────────────────────────────────────

  {
    id: 'ft30_king_assassination_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('king_assassination_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30KingLate,
    text: 'You were alive when he was killed. You are still alive. The distance between those two facts contains everything that happened to this country. The holiday, the statue, the street names: you know what was there before. The speech everyone quotes was not the one he considered most important — he had better ones, the ones that cost more to quote.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.setMem('ft30KingLate', true) },
  },

  // ─── GREAT MIGRATION GENERATION ──────────────────────────────────────────────

  {
    id: 'ft30_great_migration_inheritor',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('great_migration_generation') &&
      G.age >= 35 &&
      !G.mem?.ft30GrtMigInh,
    text: 'Your people moved north for specific reasons — the violence, the crop prices, the calculation of survival in a particular county in a particular decade. You grew up in the city they moved to. The migration is the story your family tells about itself. You are the after. You live where they arrived, and you do not entirely understand the gravity of what they did, which is partly because they made the afterwards ordinary enough that it was possible not to.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 3; p.karma += 3; p.setMem('ft30GrtMigInh', true) },
  },

  // ─── GASTARBEITER GENERATION ─────────────────────────────────────────────────

  {
    id: 'ft30_gastarbeiter_decades',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('gastarbeiter_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30GastLate,
    text: 'You came for two years. That was the plan. The two years became five. The five became twenty. The twenty became the life. You have now been in Germany longer than you were in the country you came from. Your German is not the German of someone who learned it in school; it is the German of the factory floor and the decades, and it carries where you learned it. Your children have a different accent than you do.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.m += 2; p.setMem('ft30GastLate', true) },
  },

  // ─── HYPHENATED GERMAN ───────────────────────────────────────────────────────

  {
    id: 'ft30_hyphenated_german_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('hyphenated_german') &&
      G.age >= 30 &&
      !G.mem?.ft30HyphGerm,
    text: 'Both countries claim you when they are proud of something and distance themselves when they are not. When the team wins, you are German. When something goes wrong, the question of where you are really from resurfaces. You have developed a fluency in navigating this — a facility for being visible or invisible depending on what the room needs. It is a skill. It costs something that cannot be itemised.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.s += 2; p.setMem('ft30HyphGerm', true) },
  },

  // ─── BANLIEUE GENERATION ─────────────────────────────────────────────────────

  {
    id: 'ft30_banlieue_generation_reckoning',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('banlieue_generation') &&
      G.age >= 30 &&
      !G.mem?.ft30Banl,
    text: 'The banlieue is the address that follows you. On a CV, at a check-in desk, in certain rooms where the postcode reads before you have said anything. You left or you stayed, and either way the postcode did its work. The city was an hour away by RER and might as well have been another country. You know now that this was not an accident — the location of the towers, the frequency of the bus lines, the school catchment zones. The architecture was deliberate.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft30Banl', true) },
  },

  // ─── ALGERIAN WAR VETERAN ────────────────────────────────────────────────────

  {
    id: 'ft30_algerian_war_vet_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('algerian_war_veteran') &&
      G.age >= 60 &&
      !G.mem?.ft30AlgVetLate,
    text: 'They called it the events. La guerre sans nom. The French state did not officially acknowledge it as a war until 1999, which meant that for forty years you had served in something without a name, done things in something without a name. The recognition came when most of the men who fought it were already old. The recognition changes the category. It does not change what happened.',
    choices: null,
    effect: (p) => { p.r += 10; p.e += 3; p.setMem('ft30AlgVetLate', true) },
  },

  // ─── ALGERIAN WAR CONSCIENTIOUS OBJECTOR ────────────────────────────────────

  {
    id: 'ft30_algerian_war_conscientious_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('algerian_war_conscientious') &&
      G.age >= 60 &&
      !G.mem?.ft30AlgConsLate,
    text: 'You refused and paid for it. The refusal was right and the cost was real and those two facts have never fully resolved into a simple sentence. In 1999, when France acknowledged the war, some of the veterans held small events. You went to one. The men there were old. Some of them had refused specific orders you had not been given the chance to refuse. Some had not. The difference between you had become less important than the fact of having been there at all.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.karma += 4; p.setMem('ft30AlgConsLate', true) },
  },

  // ─── SESSANTOTTO GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft30_sessantotto_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sessantotto_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30Sessant,
    text: 'What did 1968 produce? The accounting has been ongoing for fifty years. The divorce law, the workers\' statute, the women\'s movement. The terrorism that followed the years of hope. The long march through the institutions: the ones who marched found the institutions changed them more than they changed the institutions. You were young in 1968. You are still tracking what it came to. The answer depends on which of you is doing the accounting.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.setMem('ft30Sessant', true) },
  },

  // ─── COMMUNIST POLAND CHILDHOOD ──────────────────────────────────────────────

  {
    id: 'ft30_communist_poland_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('communist_poland_childhood') &&
      G.age >= 35 &&
      !G.mem?.ft30CommPol,
    text: 'You grew up in a country that no longer exists. The Poland you learned to read and write in, that gave you your habits of mind and your specific mistrust of certain kinds of authority — that country ended in 1989 and what replaced it is also called Poland. The children born after 1989 know the previous Poland from their parents\' stories. You know it from having lived in it. The knowledge is not transferable.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft30CommPol', true) },
  },

  // ─── 1989 POLAND GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft30_poland_1989_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('1989_poland_generation') &&
      G.age >= 50 &&
      !G.mem?.ft301989Pol,
    text: 'The roundtable in April, the election in June, the first non-communist prime minister in August: 1989 moved fast. You remember the speed — the sense that the arrangement everyone had accepted as permanent was dissolving in real time. Thirty years later, the question of what was gained and what was lost has become a political disagreement. Your own accounting is more specific. The freedom was real. The cost of the transition was also real. The two facts do not cancel each other.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 5; p.setMem('ft301989Pol', true) },
  },

  // ─── MARTIAL LAW GENERATION (POLAND) ────────────────────────────────────────

  {
    id: 'ft30_martial_law_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('martial_law_generation') &&
      G.age >= 35 &&
      !G.mem?.ft30MartLaw,
    text: 'Martial law was declared on a Sunday in December. The phones were cut that night. You remember where you were when you understood that what you had believed was possible had been suspended. The underground continued — the cassette tapes, the samizdat, the parallel economy of banned books. You participated in it to whatever degree you did. That participation is a fact about you that the official record does not contain.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.karma += 3; p.setMem('ft30MartLaw', true) },
  },

  // ─── ITALIAN EMIGRANT (ABROAD) ───────────────────────────────────────────────

  {
    id: 'ft30_italian_emigrant_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('italian_emigrant') &&
      G.age >= 35 &&
      !G.mem?.ft30ItalEmi,
    text: 'The question of return has never fully gone away. Italy from a distance is a specific construction — the food, the family, the light you remember, which is also the light that had no job in it for you. When you visit, people ask when you\'re coming back. The answer is complicated by what you have built where you are: the career, the life, the person you\'ve become who is legible here and would have to be translated there.',
    choices: [
      {
        text: 'Start planning a real return.',
        tag: 'planning_return_italy',
        outcome: 'You look at it seriously. The logistics are real. Whether it happens is less certain than the looking.',
        effect: (p) => { p.addFlag('planning_return_italy'); p.m += 4; p.s += 2; p.setMem('ft30ItalEmi', true) },
      },
      {
        text: 'Accept that this is home now.',
        tag: 'emigrant_home_settled',
        outcome: 'You say it once, to yourself. The saying changes something small.',
        effect: (p) => { p.addFlag('emigrant_home_settled'); p.m += 7; p.setMem('ft30ItalEmi', true) },
      },
    ],
  },

  // ─── SOUTHERN MIGRANT (ITALY NORTH) ─────────────────────────────────────────

  {
    id: 'ft30_southern_italy_north_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('southern_migrant_italy') &&
      G.age >= 35 &&
      !G.mem?.ft30SouthItaly,
    text: 'They put up signs: terroni not wanted. The north had a specific word for you, derived from terra, soil, pointing at what kind of person comes from the land. You worked in the factory or the construction or the kitchen. The word attached itself to your accent, your name, your village. Your children grew up without the accent. They cannot always tell which direction the slur comes from anymore. You can.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 2; p.setMem('ft30SouthItaly', true) },
  },

  // ─── MEDITERRANEAN CROSSING SURVIVED ────────────────────────────────────────

  {
    id: 'ft30_mediterranean_decade_on',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('mediterranean_crossing_survived') &&
      G.age >= 30 &&
      !G.mem?.ft30MedCross,
    text: 'A decade, roughly. You crossed the sea in a boat not designed for crossing seas, in a group of people who did not know each other, and the sea did not kill you. You built a life on the other side — a real life, not a placeholder. Some people from that boat you know what became of them. Others you don\'t. The estimate for that year — how many did not make other crossings — you read it when it was published. The estimate does not describe individual boats.',
    choices: null,
    effect: (p) => { p.r += 9; p.m += 3; p.karma += 4; p.e += 2; p.setMem('ft30MedCross', true) },
  },

  // ─── PORT ARTHUR GENERATION (AUSTRALIA) ──────────────────────────────────────

  {
    id: 'ft30_port_arthur_twenty_years',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('port_arthur_generation') &&
      G.currentYear >= 2016 &&
      !G.mem?.ft30PortArth,
    text: 'Twenty years since Port Arthur. Thirty-five people killed on a Sunday afternoon at a tourist site in Tasmania. The government bought back 650,000 guns in ninety days. There has not been a mass shooting in Australia since. The anniversary is an occasion to say this again. You have watched other countries discuss the same trade-off and conclude differently. You genuinely do not understand the different conclusion.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft30PortArth', true) },
  },

  // ─── WAR ON DRUGS ERA ────────────────────────────────────────────────────────

  {
    id: 'ft30_war_drugs_neighborhood',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('war_on_drugs_era') &&
      G.age >= 50 &&
      !G.mem?.ft30WarDrugLt,
    text: 'The neighbourhood you grew up in lost a specific generation of men to it — to the drugs, to the selling of the drugs, to the policing of the selling. The policy was announced from Washington and implemented on your block with handcuffs. You watched it. Some of the men taken out of the neighbourhood in the 1980s and 1990s are still inside. Some came back changed in ways that are not recoverable. The policy has been so thoroughly criticised that everyone agrees it failed. The men are still inside.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 5; p.e += 3; p.setMem('ft30WarDrugLt', true) },
  },

  // ─── GOULD UNDERSTANDING (GIFTED ARC) ───────────────────────────────────────

  {
    id: 'ft30_gift_gould_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gift_gould_understood') &&
      G.age >= 55 &&
      !G.mem?.ft30GouldLate,
    text: 'The thing you understood from Gould — the median is not the message, the full range is what the biology produces, the outlier peak is one data point in a distribution — you have been carrying that for years. It changed how you see the life you are living: not as the failure to become the peak of the distribution, but as one specific life in the full range of what this gift allows. The parallel life is real to you as an idea. The life you are living is realer.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 6; p.m += 4; p.setMem('ft30GouldLate', true) },
  },

  // ─── PANDEMIC LONG COVID ─────────────────────────────────────────────────────

  {
    id: 'ft30_long_covid_years_on',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('pandemic_long_covid') &&
      G.age >= 35 &&
      !G.mem?.ft30LCovid,
    text: 'Three years since you got sick. The fatigue is structural now — you have reorganised your life around it. The job has been adjusted. The things you commit to have been filtered through what the body can sustain after a bad week. Your doctor is carefully non-committal about the timeline. The research is ongoing. The research has been ongoing for three years. You manage it. Management is not the same as resolution.',
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 3; p.e += 3; p.r += 5; p.setMem('ft30LCovid', true) },
  },

  // ─── CHILD SOLDIER LATE WITNESS ──────────────────────────────────────────────

  {
    id: 'ft30_child_soldier_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('child_soldier') &&
      G.age >= 50 &&
      !G.mem?.ft30CSoldLate,
    text: 'The things done to you and the things you did: you have been working on the difference for decades. The truth commissions have a category for you that acknowledges what happened to a twelve-year-old before they examine what the twelve-year-old did. You are grateful for the category. The category does not close anything. You are fifty years old. The arithmetic of what was taken is irreducible.',
    choices: null,
    effect: (p) => { p.r += 10; p.m -= 4; p.e += 5; p.karma += 5; p.setMem('ft30CSoldLate', true) },
  },

  // ─── NORTHERN JOURNEY TAKEN (Central America) ───────────────────────────────

  {
    id: 'ft30_northern_journey_years_on',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('northern_journey_taken') &&
      G.age >= 30 &&
      !G.mem?.ft30NorthJrny,
    text: 'You crossed multiple borders on foot. The route has a name — la bestia, in some stretches, after the freight train rooftops where people ride because there is no other way forward. You are here. You built something. The people who were with you on the route: some arrived, some turned back, and some you don\'t know about. When you see news about the next group making the journey, you know specifically what that journey means because you know the specific distances.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 4; p.karma += 4; p.e += 2; p.setMem('ft30NorthJrny', true) },
  },

  // ─── NIGERIA: NIGER DELTA COMMUNITY ──────────────────────────────────────────

  {
    id: 'ft30_nga_delta_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_delta_community') &&
      G.age >= 50 &&
      !G.mem?.ft30NgaDelta,
    text: 'The oil has been coming out of the ground for sixty years. The creek water has been contaminated for forty. The gas flares have been burning since before you were born. The clean-up reports come and go. The companies have paid settlements and continued. The fish you ate as a child — your children don\'t eat those fish. The fish are still there, technically. The Niger Delta Action Report; the UN Environmental Programme assessment; the Ogoni cleanup that began in 2016 and is still ongoing. You know the documents. The documents do not describe your specific creek.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 5; p.e += 3; p.setMem('ft30NgaDelta', true) },
  },

  // ─── NIGERIA: JUNE 12 GENERATION ─────────────────────────────────────────────

  {
    id: 'ft30_nga_june12_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_june12_generation') &&
      G.age >= 50 &&
      !G.mem?.ft30NgaJune12,
    text: 'June 12, 1993. MKO Abiola won. The military annulled it. You remember the specific feeling of that — not just disappointment but the confirmation of something about the relationship between the ballot and the men with guns. Abiola died in detention in 1998. Buhari declared June 12 Democracy Day in 2018 and named Abiola a posthumous hero. The declaration was both correct and twenty-five years late. You have been measuring by that distance for a long time.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.m -= 3; p.setMem('ft30NgaJune12', true) },
  },

  // ─── EXPERIENCED LOSS ────────────────────────────────────────────────────────

  {
    id: 'ft30_experienced_loss_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('experienced_loss') &&
      G.age >= 38 &&
      !G.mem?.ft30ExpLoss,
    text: 'A decade on from the loss that reshaped things. Not the ordinary grief — the one that reorganised the topology of the life. You have rebuilt around it, which is what you do. The rebuilding is real. The space where it was is also real. You have learned to carry both without having resolved the question of which is more present.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 2; p.setMem('ft30ExpLoss', true) },
  },

  // ─── NOMADIC HERITAGE ────────────────────────────────────────────────────────

  {
    id: 'ft30_nomadic_heritage_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nomadic_heritage') &&
      G.age >= 50 &&
      !G.mem?.ft30NomHer,
    text: 'You grew up in a world organised around movement — the seasonal route, the pasture change, the knowledge of terrain that passes between generations because the terrain is the livelihood. The world that is organised around addresses and borders and property titles is the world you live in now. You know how to live in it. You also know the knowledge your grandparents carried — the specific skill of reading landscape — which has no application in this world and no one to pass it to.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.setMem('ft30NomHer', true) },
  },

  // ─── ID 1965 SILENCE GENERATION ──────────────────────────────────────────────

  {
    id: 'ft30_id_1965_silence_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('id_1965_silence_generation') &&
      G.age >= 50 &&
      !G.mem?.ft30Id1965Late,
    text: 'The silence lasted thirty years, roughly. The families of the dead did not talk about it publicly. The New Order built a mythology: the communist PKI as the aggressor, the army as the defender. In 2012 the International People\'s Tribunal convened in The Hague. Testimony was given. The government declined to participate. You had known what you knew for a long time. The public acknowledgment of it, when it came, came differently than you had imagined it would.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.setMem('ft30Id1965Late', true) },
  },

  // ─── BOKO HARAM GENERATION (NIGERIA NORTH) ───────────────────────────────────

  {
    id: 'ft30_nga_boko_haram_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_boko_haram_generation') &&
      G.age >= 35 &&
      !G.mem?.ft30NgaBH,
    text: 'The insurgency in the northeast has been running for fifteen years. The Lake Chad basin, the Chibok kidnappings, the cycle of military offensives and regroupings and splinter factions. You grew up in the northeast. You know the specific geography of what was taken — the town markets that closed, the schools that were targeted, the displacement camps. The international coverage flares up and dies down. The situation does not flare and die — it is continuous.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.e += 3; p.setMem('ft30NgaBH', true) },
  },

  // ─── PARIS ATTACKS GENERATION ────────────────────────────────────────────────

  {
    id: 'ft30_paris_attacks_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('paris_attacks_generation') &&
      G.age >= 45 &&
      !G.mem?.ft30ParisAtks,
    text: 'Charlie Hebdo, the Bataclan, Nice on Bastille Day, Strasbourg, the teacher beheaded outside his school. The attacks did not form a pattern in the abstract — they formed a pattern in the texture of living in France in the 2010s: the checks at train stations, the bollards outside Christmas markets, the lowered flags, the silences at 11 a.m. The France that emerged from those years is a different France. You are still deciding what you think about the France it became.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft30ParisAtks', true) },
  },

  // ─── REFERENDUM NIGHT GENERATION (CANADA/QUEBEC) ─────────────────────────────

  {
    id: 'ft30_referendum_night_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('referendum_night_generation') &&
      G.age >= 50 &&
      !G.mem?.ft30RefNight,
    text: '50.58 percent to 49.42 percent. The night of October 30, 1995, and the morning after it. You have been living in the country that almost wasn\'t since. The question — what Quebec is, what Canada is, what the relationship between them will be — has never been answered. It has been managed. The management has its own texture: the sponsorship scandal, the Clarity Act, the periodic resurgences of the separatist question. You watched the whole sequence.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft30RefNight', true) },
  },

  // ─── POPE VISIT GENERATION (POLAND) ──────────────────────────────────────────

  {
    id: 'ft30_pope_visit_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('pope_visit_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30PopeVisit,
    text: 'There were nine million people in the street in Warsaw on that Sunday. You were one of them. He said: do not be afraid. He died in April 2005. The crowds in St. Peter\'s Square held signs that said santo subito — sainthood immediately. You watched it from wherever you were and you thought about the man in the white coat on that first visit, in June 1978, and what it had meant in that specific year, in that specific country, with those specific men running it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 2; p.setMem('ft30PopeVisit', true) },
  },

  // ─── TUAREG MALIAN ───────────────────────────────────────────────────────────

  {
    id: 'ft30_tuareg_malian_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tuareg_malian') &&
      G.age >= 50 &&
      !G.mem?.ft30TuaregMali,
    text: 'The 2012 uprising was the third. The first was in 1963. Then 1990. Then 2012. The pattern is the pattern of a people whose political claims have never been resolved — only suppressed and then re-expressed. The MNLA declared Azawad in April 2012. The Islamists displaced them by June. The French intervened in January 2013. The resolution that was offered, and the resolution that was withheld, followed a logic you have been living inside your entire life.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 5; p.setMem('ft30TuaregMali', true) },
  },

  // ─── OCTOBER CRISIS GENERATION (CANADA) ──────────────────────────────────────

  {
    id: 'ft30_october_crisis_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('october_crisis_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30OctCrisis,
    text: 'The War Measures Act, October 1970. Trudeau on television saying "just watch me." Five hundred arrested. No charges for most. The FLQ had killed Pierre Laporte. The army was in the streets of Montreal. You remember what your parents said about it. You remember what the people around you said about it. The division between those who said the government went too far and those who said it had no choice has never fully resolved. It became the template for a certain kind of Canadian political argument.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft30OctCrisis', true) },
  },

  // ─── TRC WITNESS GENERATION (CANADA) ─────────────────────────────────────────

  {
    id: 'ft30_trc_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('trc_witness_generation') &&
      G.age >= 45 &&
      !G.mem?.ft30TRCWit,
    text: 'The Truth and Reconciliation Commission final report: 94 Calls to Action. The unmarked graves: 215 at Kamloops, then more at other sites, then the reckoning about how many. The phrase "reconciliation" is in the report\'s title but the process of achieving it is not in the report. You watched it unfold — the excavations, the flags lowered, the churches, the conversations between your own generation about what you knew and when you knew it and what the knowing means now.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.karma += 3; p.setMem('ft30TRCWit', true) },
  },

  // ─── PACIFIC SOLUTION ERA (AUSTRALIA) ────────────────────────────────────────

  {
    id: 'ft30_pacific_solution_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('pacific_solution_era') &&
      G.age >= 45 &&
      !G.mem?.ft30PacSol,
    text: 'The Tampa, 2001. Four hundred and thirty-three people on an Norwegian freighter, then transferred to HMAS Manoora, then taken to Nauru. The Pacific Solution: offshore processing, mandatory detention, temporary protection visas, the phrase "we will decide who comes to this country." You watched the policy become bipartisan. The policy became the floor below which neither major party would go. You have been living in the country that decided this since.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft30PacSol', true) },
  },

  // ─── BERLUSCONI GENERATION (ITALY) ───────────────────────────────────────────

  {
    id: 'ft30_berlusconi_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('berlusconi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30Berlusc,
    text: 'Three times prime minister. Twenty years of Italian politics defined by one man\'s legal problems, his media empire, his parties at Arcore. The Italy he built — or reflected, depending on whom you ask — was a specific Italy: televised, clannish, spectacularly tolerant of the gap between law and conduct. He died in 2023. The obituaries disagreed about what he meant. You have your own accounting, made from living through it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.setMem('ft30Berlusc', true) },
  },

  // ─── REUNIFICATION GENERATION (GERMANY) ──────────────────────────────────────

  {
    id: 'ft30_reunification_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('reunification_generation') &&
      G.age >= 50 &&
      !G.mem?.ft30ReunGerm,
    text: 'November 9, 1989. The wall came down, which meant the wall came down in a specific Berlin on a specific night with specific crowds and specific news anchors trying to say what was happening before they understood what was happening. The thirty years since have not been what either side expected. The east and west grew together more slowly than the optimism of 1990 suggested. The Ostalgie, the wage gap, the structural differences that outlasted the wall itself: you have watched all of it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.setMem('ft30ReunGerm', true) },
  },

  // ─── NIGERIA MILITARY ERA ────────────────────────────────────────────────────

  {
    id: 'ft30_nga_military_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_military_era') &&
      G.age >= 50 &&
      !G.mem?.ft30NgaMilLate,
    text: 'Nine coups in thirty-four years, if you count the attempted ones. You grew up in a country where the political news arrived in uniform. You learned to read the early morning announcements, the closed schools, the suspended constitution as information — not shock but data. The 1999 transition was real and civilian rule has continued. The habits of adaptation that military rule required are less useful now but not gone. The instinct to assess who is in charge before speaking is still in you.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.setMem('ft30NgaMilLate', true) },
  },

  // ─── ID PAPUA IDENTITY ────────────────────────────────────────────────────────

  {
    id: 'ft30_id_papua_identity_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('id_papua_identity') &&
      G.age >= 45 &&
      !G.mem?.ft30PapuaLate,
    text: 'The Melanesian face in an Indonesian national context. The resources — gold, copper, LNG — extracted and the royalties that arrived in Jakarta first and the west second and the village never. The Free Papua Movement has been running since 1965. The international press covers it when there is an incident and leaves when the incident ends. The people of the highlands know their land in a way that the land-registration systems in Jakarta do not account for. You know it too.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.karma += 3; p.setMem('ft30PapuaLate', true) },
  },

  // ─── HEAD TAX GENERATION (CANADA, CHINESE) ───────────────────────────────────

  {
    id: 'ft30_head_tax_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('head_tax_generation') &&
      G.age >= 50 &&
      !G.mem?.ft30HeadTax,
    text: 'The head tax was $500 — a year\'s salary for a labourer in 1903. Your family paid it or knew people who paid it or carried the knowledge of it as a specific weight in the history of belonging here. Stephen Harper\'s apology came in 2006. The surviving head tax payers received $20,000 each; there were about two dozen left. The apology was the right thing to do. The calculation of what was paid and what was returned is a different kind of arithmetic.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.setMem('ft30HeadTax', true) },
  },

  // ─── WHITE AUSTRALIA GENERATION ──────────────────────────────────────────────

  {
    id: 'ft30_white_australia_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('white_australia_generation') &&
      G.age >= 55 &&
      !G.mem?.ft30WhiteAus,
    text: 'The White Australia Policy operated from 1901 until Gough Whitlam formally abolished the last of its instruments in 1973. You lived inside the country that had it or at its edges. The dictation test: you could be failed in any language the officer chose. The preference for northern European immigrants. The specific vocabulary of belonging that the policy created. Australia is a different country now — more Asian, more diverse, more itself. What it was during the policy is still in the architecture if you know how to read it.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.setMem('ft30WhiteAus', true) },
  },

  // ─── ID TSUNAMI 2004 SURVIVOR ─────────────────────────────────────────────────

  {
    id: 'ft30_tsunami_2004_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('id_tsunami_2004_survivor') &&
      G.age >= 30 &&
      !G.mem?.ft30Tsunami04,
    text: 'December 26, 2004. The water came and then it receded and then the second wave came. 230,000 people across fourteen countries. Banda Aceh was obliterated in minutes. You survived. The rebuilding took years — the literal rebuilding, the houses and the roads, and the other rebuilding, the internal kind that does not have a completion date. The peace agreement between the GAM and the Indonesian government came eight months later. The disaster changed the politics. You were already changed before the politics changed.',
    choices: null,
    effect: (p) => { p.r += 9; p.m += 3; p.e += 3; p.karma += 4; p.setMem('ft30Tsunami04', true) },
  },

  // ─── MAYA LANGUAGE SUPPRESSED ────────────────────────────────────────────────

  {
    id: 'ft30_maya_language_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('maya_language_suppressed') &&
      G.age >= 45 &&
      !G.mem?.ft30MayaLang,
    text: 'The school was in Spanish. The language your grandparents used — K\'iche\', Kaqchikel, Q\'eqchi\', whichever of the twenty-three — was not the language of school or of official business or of anything that the state recognised as legitimate. The 1996 peace accords included language rights. The constitution was amended. The schools teach indigenous languages now in some communities. You learned yours at home, imperfectly, the way you learn something that was not supposed to be learned.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 5; p.karma += 3; p.setMem('ft30MayaLang', true) },
  },

  // ─── CONTRA WAR SURVIVOR ─────────────────────────────────────────────────────

  {
    id: 'ft30_contra_war_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('contra_war_survivor') &&
      G.age >= 45 &&
      !G.mem?.ft30ContraLate,
    text: 'The Contra war was funded from Washington and fought in your country. The mining of harbours, the attack on oil tanks, the rural villages that were targets because they had organised. The International Court of Justice ruled against the United States in 1986. The United States did not pay. You know the distance between the ruling and the payment in a way that is not abstract. The war ended in 1990. The ideology that funded it was real, and its effects in your country were real, and neither of those facts was fully captured in the peace agreement.',
    choices: null,
    effect: (p) => { p.r += 9; p.e += 4; p.m -= 3; p.setMem('ft30ContraLate', true) },
  },

  // ─── KAHRAMANMARAS SURVIVOR (TURKEY) ─────────────────────────────────────────

  {
    id: 'ft30_kahramanmaras_years_on',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tur_kahramanmaras_survivor') &&
      G.age >= 30 &&
      !G.mem?.ft30KahraMrsYrs,
    text: 'Two earthquakes, eleven hours apart, February 6, 2023. 50,000 dead. The second earthquake came when the first was already understood as catastrophic, which is not how people had learned to think about earthquakes — you watch for aftershocks, not for a second major event. You survived. The rebuilding of Hatay, Kahramanmaraş, Adıyaman has been slower than the promises made in the days after. You know the difference between the promises and the pace.',
    choices: null,
    effect: (p) => { p.r += 9; p.m += 2; p.e += 3; p.karma += 3; p.setMem('ft30KahraMrsYrs', true) },
  },

  // ─── LOCAL MEMORY KEEPER ─────────────────────────────────────────────────────

  {
    id: 'ft30_local_memory_keeper_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('local_memory_keeper') &&
      G.age >= 55 &&
      !G.mem?.ft30LocMemKeep,
    text: 'The stories you carry are not in any archive. The community\'s history — who built what, who married whom, what happened in the year the well dried up, what the original name of the road was before the name changed — lives in you and in the three or four other people your age who paid attention. Younger people ask you sometimes. The asking is less frequent than it used to be. You are waiting to see who, if anyone, will carry what you carry.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.karma += 4; p.setMem('ft30LocMemKeep', true) },
  },

  // ─── DHAKA GARMENT WORKER ────────────────────────────────────────────────────

  {
    id: 'ft30_dhaka_garment_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('dhaka_garment_worked') &&
      G.age >= 30 &&
      !G.mem?.ft30DhakaGarm,
    text: 'The Rana Plaza collapsed on April 24, 2013. 1,134 garment workers killed. The building had visible cracks the day before; workers were sent back in. You were in the industry — before or during or after, you know the texture of the work: the quota, the locked bathroom break, the fire exit that was welded shut. The international brands whose clothes were in the rubble issued statements. The Accord on Fire and Building Safety was signed. The specific women who died had specific names that were not in most of the statements.',
    choices: null,
    effect: (p) => { p.r += 9; p.e += 3; p.m -= 3; p.setMem('ft30DhakaGarm', true) },
  },

  // ─── NGA SHARIA TRANSITION ───────────────────────────────────────────────────

  {
    id: 'ft30_nga_sharia_transition_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_sharia_transition') &&
      G.age >= 45 &&
      !G.mem?.ft30NgaSharia,
    text: 'Twelve northern states adopted sharia criminal law between 1999 and 2000. Zamfara was first. The adoption happened in the specific context of civilian rule returning — sharia was both genuinely demanded and politically performed. The years since have produced the specific texture of living in a society where the law is one thing and the practice is another, where the moral economy of the community and the formal legal code coexist in ways that are sometimes harmonious and sometimes not. You know what the coexistence looks like from the inside.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.setMem('ft30NgaSharia', true) },
  },

  // ─── MAASAI CONSERVATION DISPLACED ──────────────────────────────────────────

  {
    id: 'ft30_maasai_conservation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('maasai_conservation_displaced') &&
      G.age >= 45 &&
      !G.mem?.ft30MaasaiCons,
    text: 'The conservation areas were gazetted for the wildlife. The Maasai had lived in the same land before the gazetting, during the colonial period that produced the gazetting, and after. The relationship between the community and the land and the animals was not a problem that the gazetting was designed to address. The displacement — the removal to make space for tourism infrastructure, for protected wildlife corridors, for the international game-viewing economy — is documented in NGO reports. The reports are accurate in their counts. The specific grass, the specific dry-season route, the specific waterhole: those are not in the reports.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.karma += 3; p.setMem('ft30MaasaiCons', true) },
  },

  // ─── JAVANESE TRANSMIGRATION ─────────────────────────────────────────────────

  {
    id: 'ft30_transmigration_years_on',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('id_transmigration_settler') &&
      G.age >= 35 &&
      !G.mem?.ft30Transmigr,
    text: 'You came here as part of the programme. The government used the word transmigration — a technical word that described the movement of millions of Javanese, Sundanese, Balinese out to Kalimantan, Sulawesi, Papua, the outer islands. You came because the land allocation was real, because Java was crowded, because someone in the district office said there was opportunity. You are still here. The land exists. The opportunity was more complicated than described.',
    choices: [
      {
        text: 'You have made a life here. This is home.',
        tag: 'transmigration_settled',
        outcome: 'The children speak the local language with an accent that is not yours. The land has a rhythm you have learned. You are from here now, in the way that takes a generation.',
        effect: (p) => { p.addFlag('transmigration_settled'); p.m += 5; p.s += 3; p.setMem('ft30Transmigr', true) },
      },
      {
        text: 'You have never stopped measuring the distance to Java.',
        tag: 'transmigration_displaced_still',
        outcome: 'The radio from Java still sounds like home. The distance has not resolved itself into belonging. You are here, but the here is not yours in the way they said it would be.',
        effect: (p) => { p.addFlag('transmigration_displaced_still'); p.r += 7; p.m -= 4; p.setMem('ft30Transmigr', true) },
      },
    ],
  },

  // ─── NIGERIA NAIRA CRISIS ────────────────────────────────────────────────────

  {
    id: 'ft30_naira_crisis_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_naira_crisis_lived') &&
      G.age >= 28 &&
      !G.mem?.ft30NairaCrisis,
    text: 'The Central Bank redesigned the notes. The deadline came and the new notes were not available. ATM queues stretched around buildings. POS machines ran out of cash. The digital transfer system collapsed under the load. Then the subsidy on petrol was removed and the pump price quadrupled in a week. The naira fell from 460 to the dollar to 1,500 and then beyond. The economics of daily life changed faster than any plan for living in it could accommodate.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.e += 2; p.setMem('ft30NairaCrisis', true) },
  },

  // ─── TURKISH LIRA CRISIS ─────────────────────────────────────────────────────

  {
    id: 'ft30_lira_crisis_aftermath',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tur_lira_crisis_lived') &&
      G.age >= 28 &&
      !G.mem?.ft30LiraCrisis,
    text: 'The lira lost eighty percent of its value in two years. The government\'s monetary policy — interest rates cut as inflation rose, a reversal of orthodox economics — produced the result that orthodox economics predicted. Savings evaporated. Rents, priced in dollars by landlords who had learned from previous crises, became unreachable. A loaf of bread cost what a week\'s groceries had cost. The mathematics of a salary became a daily problem rather than a monthly one.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 4; p.w -= 4; p.e += 2; p.setMem('ft30LiraCrisis', true) },
  },

  // ─── DUTCH COLONIAL RECKONING ────────────────────────────────────────────────

  {
    id: 'ft30_nl_colonial_apology',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nl_colonial_reckoning_generation') &&
      G.age >= 35 &&
      !G.mem?.ft30NlColonial,
    text: 'In December 2022 the Dutch Prime Minister apologised for slavery. The apology covered the colonial period in Suriname, the Caribbean, and the East Indies. It came 150 years after abolition. The National Institute for War Documentation had already spent decades documenting the colonial war in Indonesia — the word extremengeweld, extreme violence, appearing in official Dutch reports about what Dutch soldiers did in 1945–1949. The apology was the latest in a reckoning that has proceeded at the pace reckonings proceed at when the country doing the reckoning has to vote on it.',
    choices: [
      {
        text: 'The reckoning is incomplete but you receive it as something.',
        tag: 'nl_colonial_reconciling',
        outcome: 'You are not satisfied, but you are not nothing. The formal acknowledgment changes the ground slightly beneath an argument that has been going for decades.',
        effect: (p) => { p.addFlag('nl_colonial_reconciling'); p.m += 4; p.e += 3; p.karma += 2; p.setMem('ft30NlColonial', true) },
      },
      {
        text: 'A scheduled apology is not an apology.',
        tag: 'nl_colonial_critical',
        outcome: 'The press conference, the prepared statement, the minister who will be replaced in two years: this is not the thing they say it is. The gap between what happened and what the country is willing to name as what happened is still very wide.',
        effect: (p) => { p.addFlag('nl_colonial_critical'); p.r += 5; p.e += 4; p.setMem('ft30NlColonial', true) },
      },
    ],
  },

  // ─── ATATÜRK ERA ─────────────────────────────────────────────────────────────

  {
    id: 'ft30_ataturk_positioned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tur_ataturk_era') &&
      G.age >= 35 &&
      !G.mem?.ft30AtaturkPos,
    text: 'The alphabet change is still in living memory at the margins — your grandparents learned Arabic script and then it was made illegal. The Latin letters arrived by decree in 1928. The hat was mandatory. The tekke was closed. The whole project of making Turkey modern, secular, European was executed from above with the speed that only a single-party state can achieve. You have grown up in what that project produced. You are positioned by it — for it, against it, somewhere more complicated than either.',
    choices: [
      {
        text: 'The secularist project is worth defending.',
        tag: 'tur_kemalist_identity',
        outcome: 'The mosque closures, the dress codes, the alphabet: these were the price of modernity, and modernity was worth the price. You hold this as a considered position, not a reflex.',
        effect: (p) => { p.addFlag('tur_kemalist_identity'); p.e += 3; p.s += 2; p.setMem('ft30AtaturkPos', true) },
      },
      {
        text: 'Something was suppressed that has not finished insisting on existing.',
        tag: 'tur_religious_identity_reemergent',
        outcome: 'The Ottoman script, the Arabic call to prayer, the mosque that was a museum for decades: these returns are not just political. Something genuine was buried and it has continued to breathe underground.',
        effect: (p) => { p.addFlag('tur_religious_identity_reemergent'); p.e += 3; p.m += 2; p.setMem('ft30AtaturkPos', true) },
      },
    ],
  },

  // ─── TURKISH REFUGEE HOST ────────────────────────────────────────────────────

  {
    id: 'ft30_syrian_neighbours_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tur_refugee_host_generation') &&
      G.age >= 32 &&
      !G.mem?.ft30SyrianNeighbour,
    text: 'Three million, then four million. The specific texture of it: the Syrian family in the apartment below, the children who spoke a rapid Arabic that you couldn\'t follow, the restaurants that appeared in the neighbourhood with menus in both scripts. The economy of the hosting — the cheap labour, the landlords who preferred Syrian tenants because they were more desperate, the Turkish workers who could not compete with wages that desperation sets. And the political texture: the ruling party that had let them in, the opposition party that said send them back, the polls that showed most Turks wanted them gone.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m -= 3; p.setMem('ft30SyrianNeighbour', true) },
  },

  // ─── GEORGIA TESTIGO GENERATION ──────────────────────────────────────────────

  {
    id: 'ft30_georgia_full_arc_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('geo_testigo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft30GeoTestigo,
    text: 'You have witnessed the full length of it. April 9, 1989 — the soldiers in the night, the gas, the twenty dead, the shovels. Independence. The civil wars that came immediately after, Abkhazia, South Ossetia, the internally displaced who arrived and then stayed for thirty years. The Rose Revolution in 2003, the hope it carried, the Saakashvili years that produced their own contradictions. The 2008 war, the Russian tanks at Gori. And then the EU protests — the generation in the streets holding European flags, demanding a future that the government was trading away. You have watched all of it. You are one of the people who were there for the whole length of the history.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 5; p.karma += 3; p.setMem('ft30GeoTestigo', true) },
  },

  // ─── GREECE TESTIGO GENERATION ───────────────────────────────────────────────

  {
    id: 'ft30_greece_full_arc_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('gr_testigo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft30GrTestigo,
    text: 'You have lived through the arc of it: the junta, the Polytechnic, the tanks against the students in 1973, the Metapolitefsi and the years after when everything felt possible, the EU and the drachma and the growth years, and then 2010 and the memoranda and the austerity and the OXI referendum that produced the yes anyway. The European dream entered your life as hope and it also produced the humiliation. You are old enough to hold both without resolving them. The country you were born in and the country you are old in are the same country in the same geography. The distance between them is harder to measure.',
    choices: null,
    effect: (p) => { p.r += 9; p.e += 5; p.karma += 3; p.setMem('ft30GrTestigo', true) },
  },

  // ─── NIGERIA 1999 DEMOCRACY ──────────────────────────────────────────────────

  {
    id: 'ft30_nigeria_democracy_generation_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_democracy_generation') &&
      G.age >= 35 &&
      !G.mem?.ft30NgaDemGen,
    text: 'Obasanjo was sworn in on May 29, 1999. The first elected civilian government since Shehu Shagari, sixteen years before. Military rule had been the context of your adult life — the coups, the countercoups, the decrees, the governors appointed rather than elected, the political parties dissolved by the generals. And then it ended. The country adjusted, fitfully, to competitive politics: the rigging, the godfathers, the constituency cash, the INEC delays. It was still better than the other thing. That is what you kept coming back to.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 3; p.setMem('ft30NgaDemGen', true) },
  },

  // ─── TURKISH ISTANBUL CONVENTION ─────────────────────────────────────────────

  {
    id: 'ft30_istanbul_convention_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tur_istanbul_convention_generation') &&
      G.character?.gender === 'female' &&
      G.age >= 28 &&
      !G.mem?.ft30IstanbulConv,
    text: 'Turkey was the first country to sign the Istanbul Convention on preventing and combating violence against women. In March 2021 it was the first to withdraw. The presidential decree came in the middle of the night, announced at 3 a.m. The official explanation was that the Convention contradicted Turkish family values and encouraged homosexuality. The femicide statistics — the count of women killed by partners or family members each year — had been rising before the withdrawal. They continued to rise after.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.e += 3; p.karma += 2; p.setMem('ft30IstanbulConv', true) },
  },

  // ─── BALI BOMBING 2002 ───────────────────────────────────────────────────────

  {
    id: 'ft30_bali_bombing_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('id_bali_bombing_generation') &&
      G.age >= 28 &&
      !G.mem?.ft30BaliBomb,
    text: 'October 12, 2002. The Sari Club and Paddy\'s Pub. 202 dead, 88 of them Australian. The bombings came from inside the country, from a network that had been organising in the specific political space that opened after the fall of Suharto — the same space that produced reformasi, that opened civil society, that ended thirty-two years of surveillance. The freedom and the bomb arrived in the same decade. Indonesia\'s reckoning with religious extremism began to look different from then on: more specific, more internal, less abstract.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft30BaliBomb', true) },
  },

  // ─── SINGAPORE DIALECT KEEPER ────────────────────────────────────────────────

  {
    id: 'ft30_sg_dialect_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_dialect_keeper') &&
      G.age >= 50 &&
      !G.mem?.ft30SgDialect,
    text: 'The Speak Mandarin Campaign launched in 1979. Lee Kuan Yew on television, explaining that the dialects — Hokkien, Teochew, Cantonese, Hakka — fragmented the Chinese community and had to be replaced by a single language. The kampung radio stations that broadcast in dialect were ordered off air. For twenty years the campaign ran. You kept the dialect anyway, between relatives, in the market, wherever it was possible to keep it. The grandchildren understand some of it. Not all of it. The transmission is partial, which is more than nothing.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.s += 2; p.e += 2; p.setMem('ft30SgDialect', true) },
  },

  // ─── NIGERIA ETHNIC PRIDE ────────────────────────────────────────────────────

  {
    id: 'ft30_nga_ethnic_pride_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('nga_ethnic_pride') &&
      G.age >= 35 &&
      !G.mem?.ft30NgaEthnic,
    text: 'The identity has been both a resource and a limit. The name told interlocutors before you did — Yoruba, Igbo, Hausa-Fulani, the sounds of the name carrying the full freight of Nigeria\'s ethnic arithmetic. The network was real: the cousin who gave you the number, the interview that was a formality because someone vouched, the informal welfare of belonging to a people. And the limit was also real: the constituency, the assumption about which political party, the northern/southern calculation in every room you entered.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.s += 3; p.setMem('ft30NgaEthnic', true) },
  },

  // ─── SINGAPORE EIP ───────────────────────────────────────────────────────────

  {
    id: 'ft30_sg_eip_generation_late',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sg_eip_generation') &&
      G.age >= 30 &&
      !G.mem?.ft30SgEip,
    text: 'The Ethnic Integration Policy determines what percentage of each racial group can live in each Housing Development Board block. Chinese, Malay, Indian, Others — each has a quota. When your ethnicity\'s quota is full in your preferred block, you cannot buy there. The policy was designed to prevent ethnic enclaves, to maintain the racial balance that the government considers essential to social cohesion. The practical experience of it is: you found out where you could and could not live by ethnicity, which is a different sentence than the policy documents use, but is the same fact.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft30SgEip', true) },
  },

]

// Follow-through events for Ivory Coast, Cameroon + Sahel cross-arc callbacks (PR #101)
// Resolves: ci_election_crisis_witness (intent: both), ci_long_witness,
// ivorian_miracle_generation late reckoning, ci_cocoa_farmer late arc,
// Sahel regional witness cross-arc (Mali + Burkina Faso + Ivory Coast),
// anglophone_cameroonian (intent: both), anglophone_crisis_witness (intent: both),
// anglophone_crisis_inside (intent: both).

export const FOLLOWTHROUGH_29_EVENTS = [

  // ── CI ELECTION CRISIS: GBAGBO ICC ACQUITTAL ──────────────────────────────────

  {
    id: 'ci_gbagbo_acquittal_2019',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('ci_election_crisis_witness') &&
      G.currentYear >= 2019 &&
      !G.mem?.ciGbagboAcquitted,
    text: 'January 15, 2019. The International Criminal Court acquits Laurent Gbagbo. The charges — crimes against humanity for the 3,000 people killed in 2010 and 2011 — are dismissed for insufficient evidence. He walks out of the courtroom in The Hague a free man. In 2021 he returns to Abidjan in a Boeing chartered by the Ivorian government, to crowds. Alassane Ouattara — the man whose election result Gbagbo refused to accept — has been president for ten years by then. The crisis that cost 3,000 lives has produced an ICC acquittal and two presidents who have met and shaken hands. You do not quite know what to do with this.',
    choices: [
      {
        text: 'The acquittal is what it is. The ICC\'s standard of proof is what it is.',
        tag: 'Legal',
        outcome: 'The court required a standard of evidence it couldn\'t meet. The 3,000 deaths are not in question. What can be proven in The Hague and what happened in Abidjan are different sets.',
        effect: (p) => { p.r += 5; p.e += 2; p.addFlag('ci_gbagbo_reckoning'); p.setMem('ciGbagboAcquitted', true); },
      },
      {
        text: 'Something did not work here. The accounting is incomplete.',
        tag: 'Reckoning',
        outcome: 'You cannot say exactly what should have happened instead. You know what happened and you know what was decided and those two things don\'t resolve into each other.',
        effect: (p) => { p.r += 8; p.m -= 4; p.addFlag('ci_gbagbo_reckoning'); p.setMem('ciGbagboAcquitted', true); },
      },
    ],
  },

  // ── CI LONG WITNESS: THE SECOND MIRACLE ───────────────────────────────────────

  {
    id: 'ci_second_miracle_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ci_long_witness') &&
      G.currentYear >= 2015 &&
      !G.mem?.ciSecondMiracle,
    text: 'The economy has grown at 7 or 8 percent per year since 2012. People are calling it the Ivorian Miracle again. Cocoa production at record levels. The Plateau building again. The new bridge across the lagoon. This is the second time in your life you have heard the country described with these words. Between the first time and the second time: the ivoirité politics, the first civil war, two coups, the election crisis, 3,000 deaths, the ICC, the acquittal, and the handshake. The phrase has survived all of it. You have too.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 3; p.addFlag('ci_full_arc_witness'); p.setMem('ciSecondMiracle', true); },
  },

  // ── IVORIAN MIRACLE GENERATION: LATE RECKONING ───────────────────────────────

  {
    id: 'ci_miracle_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ivorian_miracle_generation') &&
      !G.flags.includes('ci_long_witness') &&
      G.currentYear >= 2010 &&
      !G.mem?.ciMiracleLate,
    text: 'You grew up in the years when Ivory Coast was called the Ivorian Miracle. You are old enough now to see what the miracle required and what it left out. The cocoa economy that produced 7 percent growth for fifteen years required four million migrants who had fewer rights than you did. The stability that made investors comfortable was one man\'s stability — thirty-three years, one photograph in every classroom. The miracle was real. The things it was built on were also real. They were not in the same sentence.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.addFlag('ci_miracle_reckoned'); p.setMem('ciMiracleLate', true); },
  },

  // ── COCOA FARMER LATE ARC ────────────────────────────────────────────────────

  {
    id: 'ci_cocoa_late_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('ci_cocoa_farmer') &&
      G.currentYear >= 2010 &&
      !G.mem?.ciCocoaLate,
    text: 'You have been growing cocoa for thirty or forty years. Ivory Coast produces a third of the world\'s chocolate. A bar of chocolate in a European supermarket costs two euros. The cocoa in it was worth seven cents when it left your farm. The price was set in London. The research from the European universities says child labour is endemic in the cocoa supply chain. You know which children work in the cocoa. You know what the alternative was. The accounting that appears in the European newspapers and the accounting you do in your own head use the same numbers to reach different conclusions.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 2; p.addFlag('ci_cocoa_accounting'); p.setMem('ciCocoaLate', true); },
  },

  // ── SAHEL REGIONAL CROSS-ARC ─────────────────────────────────────────────────

  {
    id: 'sahel_regional_witness_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2022 &&
      (G.flags.includes('mali_long_witness') ||
       G.flags.includes('burkina_coup_2022') ||
       G.flags.includes('ci_election_crisis_witness')) &&
      !G.mem?.sahelRegionalLate,
    text: 'The Sahel crisis has moved through the region like a season that doesn\'t end. Mali, then Burkina Faso, then the edges of Ivory Coast. The jihadist groups that took Timbuktu in 2012 are in villages in central Burkina now. Coups in Mali (twice), Burkina (twice), Guinea, Sudan. The French expelled from Mali and Burkina. Wagner Group in their place. The UN missions reduced or withdrawn. You have watched the map change and the names change and the logic stay the same: armed groups, failing states, civilian populations in the middle. The region you grew up in and the region you are old in are not the same region.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.m -= 5; p.addFlag('sahel_long_arc_witness'); p.setMem('sahelRegionalLate', true); },
  },

  // ── TUAREG SETTLED: LATE IDENTITY RETURN ─────────────────────────────────────

  {
    id: 'tuareg_settled_late_return',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('tuareg_settled') &&
      G.currentYear >= 2010 &&
      !G.mem?.tuaregSettledLate,
    text: 'You settled in the city. You became urban, credentialled, documented. The seasonal routes your grandparents knew — north for dry season, south for rains — are routes you know as geography but not as movement. The 2012 uprising in the north, the MNLA declaring Azawad, the subsequent collapse: you watched it from Bamako or Gao or Kidal. The city was safer and more distant and you were part of neither the nomadic life that the rebellion claimed to defend nor the state that tried to suppress it. You held a position between two things that were at war with each other.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.addFlag('tuareg_settled_reckoned'); p.setMem('tuaregSettledLate', true); },
  },


  // ── CAMEROON: ANGLOPHONE LONG ARC ────────────────────────────────────────────

  {
    id: 'cmr_anglophone_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('anglophone_cameroonian') &&
      G.currentYear >= 2020 &&
      !G.mem?.cmrAngloLate,
    text: 'The Anglophone regions\' grievances were, in 2016, about judges and teachers. The government\'s response made them about much more. You have now watched this for years. The schools that have been closed — some continuously since 2016 — have produced a generation of children in the northwest and southwest who are functionally illiterate. The armed groups that were meant to be a pressure tactic are now a set of factions fighting each other as much as the government. Biya has not visited the regions. No peace framework has been proposed that both sides accepted. The arithmetic of the cabinet ministers has not changed.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.addFlag('anglophone_long_witness'); p.setMem('cmrAngloLate', true); },
  },

  {
    id: 'cmr_crisis_echo_francophone',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anglophone_crisis_witness') &&
      !G.flags.includes('anglophone_crisis_inside') &&
      G.currentYear >= 2022 &&
      !G.mem?.cmrCrisisEcho,
    text: 'You watched the Anglophone crisis from the Francophone south. From Yaoundé or Douala or Bafoussam the northwest and southwest were a separate country, almost — accessible by road but operating by different rules. You heard the reports: villages burned, children kept out of school, the internet shut down, humanitarian organisations blocked. You continued. The specific moral position of continuing while something like this happens in the same country is not a position that gets named in the news or discussed in the government briefings. You named it yourself, in private, a few times.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.addFlag('cmr_crisis_witness_reckoned'); p.setMem('cmrCrisisEcho', true); },
  },

  {
    id: 'cmr_inside_long_memory',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('anglophone_crisis_inside') &&
      G.currentYear >= 2023 &&
      !G.mem?.cmrInsideLate,
    text: 'It has been years now. The specific dates: the lawyers\' strike, October 2016. The internet shutdown, January 2017. The first village burnings, 2018. The name "Ambazonia" declared by the separatist leadership. The split between the armed factions. The children who have not been to school since the boycott began. You were inside this and you are still inside it. The phrase that keeps occurring to you is not "When will it end?" — that question has no available answer. The phrase is "What will be left?"',
    choices: null,
    effect: (p) => { p.r += 10; p.m -= 6; p.e += 3; p.addFlag('anglophone_inside_reckoned'); p.setMem('cmrInsideLate', true); },
  },

]

// events_followthrough_42.js — world-event flag follow-throughs (12 events)
// Covers: yugoslav_war_survivor, iran_revolution_lived, korean_division_generation,
// cultural_revolution_survived, saigon_fell, soviet_collapse_lived, condor_generation,
// red_terror_generation, biafra_generation, lumumba_generation,
// independence_ghana/kenya/zimbabwe, depression_generation

export const FOLLOWTHROUGH_42_EVENTS = [

  // ─── YUGOSLAV WAR: LIVING IN THE AFTERMATH ───────────────────────────────────

  {
    id: 'ft42_yugoslav_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('yugoslav_war_survivor') &&
      G.currentYear >= 2005 &&
      G.age >= 45 &&
      !G.mem?.ft42YugoslavLate,
    text: 'The country you were born in no longer exists. This is a strange thing to carry — not that a government fell, not that there was a war, but that the noun itself disappeared. The word "Yugoslav" is now a category of the past. Your children, if you have them, have never used it as a present-tense word. The successor states have made different choices about what the war was: Serbia calls it one thing, Croatia calls it something else, Bosnia holds the most specific version of what happened and the international community holds a version that is different again. You lived the actual experience and you know that all of these accounts simplify something you cannot simplify.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft42YugoslavLate', true) },
  },

  // ─── IRAN REVOLUTION: THE QUESTION THAT FOLLOWED ─────────────────────────────

  {
    id: 'ft42_iran_revolution_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('iran_revolution_lived') &&
      G.currentYear >= 1999 &&
      G.age >= 45 &&
      !G.mem?.ft42IranRevLate,
    text: 'The revolution was also a choice — millions of people who wanted the Shah gone, who chose Khomeini, who did not fully know what they were choosing. The women who marched in the revolution and then had the hijab imposed three months later. The leftists who backed the overthrow and then were arrested, tried in hours, executed. The liberals who wanted an Islamic democracy and discovered what that phrase meant in practice. You have spent decades thinking about what it meant to want one thing and receive another — about the relationship between revolutionary desire and revolutionary outcome, which was one of the twentieth century\'s main lessons and which Iran demonstrated with particular speed.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.m -= 4; p.setMem('ft42IranRevLate', true) },
  },

  // ─── KOREAN DIVISION: THE PERMANENT WOUND ────────────────────────────────────

  {
    id: 'ft42_korean_division_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('korean_division_generation') &&
      G.currentYear >= 1980 &&
      G.age >= 55 &&
      !G.mem?.ft42KoreanDivLate,
    text: 'The people north of the line are still there. This fact does not diminish. Reunification is discussed periodically, formally, in diplomatic language, and remains perpetually distant. The generation that remembers the single country shrinks each decade. The generation that grew up in one Korea or the other — who never knew the other as a present-tense country — is now the majority. The absence is still there for you, but it is increasingly a historical absence rather than a personal one, which is perhaps the only way a wound this size can be carried across a lifetime.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 5; p.e += 3; p.setMem('ft42KoreanDivLate', true) },
  },

  // ─── CULTURAL REVOLUTION: WHAT HAPPENED AND WHO KNOWS ────────────────────────

  {
    id: 'ft42_cultural_revolution_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('cultural_revolution_survived') &&
      G.currentYear >= 1985 &&
      G.age >= 50 &&
      !G.mem?.ft42CultRevLate,
    text: 'The Party has a position on the Cultural Revolution: it was a mistake, a serious one, largely Mao\'s fault but within a leadership that had its good aspects. The position was codified in 1981 in a resolution. It is official. The position does not cover what happened in your village, your school, your courtyard. The names of the people who made specific accusations are not in the resolution. The resolution does not describe what it was like to be accused by someone you knew, in a room full of people you knew. You have found a way to live with the knowledge that the official account and your actual memory are different documents entirely.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 5; p.e += 3; p.karma += 3; p.setMem('ft42CultRevLate', true) },
  },

  // ─── SAIGON FELL: THE LONG DIASPORA ──────────────────────────────────────────

  {
    id: 'ft42_saigon_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('saigon_fell') &&
      G.currentYear >= 1990 &&
      G.age >= 45 &&
      !G.mem?.ft42SaigonLate,
    text: 'Vietnam has changed. The country that you knew as the Republic of Vietnam is the southern part of a unified country that the Communist Party renamed. The cities have been renamed. The streets have been renamed. The new generation in Ho Chi Minh City — still Saigon in your mouth — has no memory of the Republic and regards the war as history. The Việt Kiều diaspora has its own relationship to this: some go back, open businesses, build lives between. Some hold the wound tight and do not go back. Some went back once and then stayed. You have your version of this reckoning, which is not the same as anyone else\'s.',
    choices: null,
    effect: (p) => { p.r += 7; p.m -= 4; p.e += 4; p.setMem('ft42SaigonLate', true) },
  },

  // ─── SOVIET COLLAPSE: WHAT PERMANENCE MEANT ──────────────────────────────────

  {
    id: 'ft42_soviet_collapse_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('soviet_collapse_lived') &&
      G.currentYear >= 2001 &&
      G.age >= 50 &&
      !G.mem?.ft42SovietCollapseLate,
    text: 'The Soviet Union was described to your generation as permanent. It was not described as permanent explicitly, just by the weight of everything around it — the institutions, the syllabi, the assumptions in the newspaper, the architecture. Then it ended in August 1991 and was dissolved in December of the same year. You have spent the decades since holding that fact — that a system described by everything around it as permanent had a last day, a specific one, and then stopped. The question of whether the current order is also temporary is one you are now qualified to ask with the kind of seriousness that most people in stable countries are not.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 5; p.m += 2; p.setMem('ft42SovietCollapseLate', true) },
  },

  // ─── OPERATION CONDOR: THE ARCHIVE ───────────────────────────────────────────

  {
    id: 'ft42_condor_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('condor_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft42CondorLate,
    text: 'The archives have been opened in stages — Argentina, Chile, Paraguay, Brazil. The Condor files: the names, the dates, the coordination memos between intelligence services, the bureaucratic record of people who were disappeared across borders as a managed system. The documents confirm what the survivors always said happened. The documents also contain the names of the people who wrote the memos, some of whom are still alive. You watch what happens to those names — the trials, the convictions, the acquittals, the deaths of old men before justice arrives — and you understand something about the relationship between what happened and what is officially acknowledged to have happened.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma += 4; p.m -= 3; p.setMem('ft42CondorLate', true) },
  },

  // ─── RED TERROR: THE BODIES WERE DISPLAYED ───────────────────────────────────

  {
    id: 'ft42_red_terror_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('red_terror_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 50 &&
      !G.mem?.ft42RedTerrorLate,
    text: 'The Derg fell in 1991. Mengistu fled to Zimbabwe. The trials began in 2006 and produced convictions in absentia for Mengistu, death sentences for more than seventy officials. Mengistu remains in Harare under Mugabe\'s protection and then under his successors\'. The specific question — why Zimbabwe extends that protection — is not answered. The bodies that were displayed in the streets of Addis Ababa in 1977 and 1978 are not answered by the convictions. The people who survived know what was done and who did it with more precision than any trial record. You carry this knowledge in a country that has been through the Derg, the Tigray war, other violences. Ethiopia does not run out of things to carry.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma += 3; p.m -= 5; p.setMem('ft42RedTerrorLate', true) },
  },

  // ─── BIAFRA: THE SILENCE AFTER ───────────────────────────────────────────────

  {
    id: 'ft42_biafra_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('biafra_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 45 &&
      !G.mem?.ft42BiafrLate,
    text: 'One million people died, most of them of starvation. The Nigerian government called it a rebellion; the Igbo called it a war of survival. The war ended in January 1970 with a ceasefire and the phrase "No victor, no vanquished." There was no truth commission. There was no formal reckoning. The mass graves of Asaba, the starvation of the encirclement — these are in living memory for your generation and in no official account of equivalent weight. The silence after the end was the policy. You have lived inside that silence and watched it become the official texture of the event.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 5; p.karma += 3; p.setMem('ft42BiafrLate', true) },
  },

  // ─── LUMUMBA: THE LESSON OF INDEPENDENCE ─────────────────────────────────────

  {
    id: 'ft42_lumumba_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('lumumba_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      !G.mem?.ft42LumumbaLate,
    text: 'The Belgian parliament apologised in 2002. The CIA involvement was confirmed in declassified documents. The Belgian security services\' role was confirmed. Lumumba was dead within months of independence — tortured, shot, and dissolved in acid so there would be no grave and no shrine. What followed was Mobutu, thirty-two years of Mobutu, the looting of the country renamed Zaire, then the two Congo wars. You have lived the shape of what follows when a leader who might have been something different is removed that quickly, that efficiently, by external actors who preferred the alternative. The lesson was taught in 1961. You have been learning it ever since.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.karma += 3; p.m -= 4; p.setMem('ft42LumumbaLate', true) },
  },

  // ─── INDEPENDENCE GENERATION: THE RECKONING ──────────────────────────────────

  {
    id: 'ft42_independence_africa_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('independence_ghana') || G.flags.has('independence_kenya') || G.flags.has('independence_zimbabwe')) &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      !G.mem?.ft42IndependenceLate,
    text: 'The independence generation has now lived long enough to see what independence produced. The answer is complicated in ways that the night of the independence celebration did not suggest. The leaders who spoke at independence became — some of them — the leaders who consolidated power, restricted press freedom, imprisoned opponents, enriched families. The colonial infrastructure of extraction was not replaced but redirected. The foreign aid and structural adjustment programmes of the 1980s rebuilt forms of dependence that looked different from the colonial kind. And yet: the schools, the hospitals, the citizenship, the flag that was your flag, the possibility of something that had not existed before. You hold all of this. It requires both hands.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 2; p.karma += 3; p.setMem('ft42IndependenceLate', true) },
  },

  // ─── DEPRESSION GENERATION: THE BODY REMEMBERS ───────────────────────────────

  {
    id: 'ft42_depression_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('depression_generation') &&
      G.currentYear >= 1960 &&
      G.age >= 55 &&
      !G.mem?.ft42DepressionLate,
    text: 'You never throw food away. You have specific habits with money — the jar, the envelope, the hidden amount — that your children regard as old-fashioned and that you cannot fully explain except by reference to a decade that they did not experience. The Depression did not only change what people had; it changed what people believed about what they could have. The expectation of stability was replaced by the knowledge that stability was not guaranteed, that it could end on a Tuesday and take a decade to come back. You have carried this knowledge into years of relative prosperity and it has not left you, which is probably exactly right.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m += 2; p.karma += 2; p.setMem('ft42DepressionLate', true) },
  },

]

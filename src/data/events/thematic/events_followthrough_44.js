// events_followthrough_44.js — world-event flag follow-throughs batch 2 (10 events)
// Covers: genocide_witness, tutsi_hidden, revolution_disillusionment, eu_generation,
// brexit_era, 1967_generation, sadat_assassination_witness, mau_mau_generation,
// chechen_war_generation, chechen_civilian, mabo_generation, apology_generation

export const FOLLOWTHROUGH_44_EVENTS = [

  // ─── GENOCIDE WITNESS: THE KNOWLEDGE YOU CARRY ───────────────────────────────

  {
    id: 'ft44_genocide_witness_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('genocide_witness') &&
      G.currentYear >= 2000 &&
      G.age >= 45 &&
      !G.mem?.ft44GenocideWitnessLate,
    text: 'You know something that most people don\'t. Not the historical fact — that\'s in the books, the trials, the museums. You know what it looked like from the inside: the sequence of days before the worst days, how ordinary the perpetrators appeared at ordinary times, how the mechanisms of ordinary life — neighbours, officials, radio broadcasts — became the machinery of killing. This knowledge is not shared equally by survivors. Some people need to testify and some need to go silent and some move between these over decades. You have found your relationship to what you know, and it has probably changed more than once.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma += 5; p.e += 3; p.setMem('ft44GenocideWitnessLate', true) },
  },

  // ─── TUTSI HIDDEN: THE SPECIFIC DEBT ─────────────────────────────────────────

  {
    id: 'ft44_tutsi_hidden_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('tutsi_hidden') &&
      G.currentYear >= 2001 &&
      G.age >= 40 &&
      !G.mem?.ft44TutsiHiddenLate,
    text: 'You were sheltered. Someone decided to hide you — a Hutu neighbour, a church community, someone who made a choice that cost them something and possibly their life. You are alive because of that choice. The gacaca courts have processed most of the cases; many perpetrators have been tried. The person or people who sheltered you may or may not have received acknowledgment for what they did. You think about this specific debt — not the guilt of surviving, but the simpler fact of obligation to someone specific who chose you over their own safety — more than you think about most things.',
    choices: null,
    effect: (p) => { p.r += 8; p.karma += 6; p.m -= 3; p.setMem('ft44TutsiHiddenLate', true) },
  },

  // ─── REVOLUTION DISILLUSIONMENT: THE QUESTION OF HOPE ────────────────────────

  {
    id: 'ft44_revolution_disillusionment_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('revolution_disillusionment') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft44RevDisillLate,
    text: 'You believed in the revolution when it was happening. The belief was not naive — you had reasons for it, evidence of the need for change, a theory of what the change would produce. The theory was wrong in specific ways that took years to become fully clear. The question you have spent decades sitting with is not whether the revolution was wrong but what to do with the belief itself: whether it was a failure of judgment that should produce permanent scepticism, or whether the belief was correct and only the outcome failed, which is a different thing. Most people who lived through what you lived through have their own answer, and the answers are not the same.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft44RevDisillLate', true) },
  },

  // ─── EU GENERATION: WHAT EUROPE MEANT ────────────────────────────────────────

  {
    id: 'ft44_eu_generation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('eu_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft44EuGenerationLate,
    text: 'You have lived with the EU as a given for most of your adult life. The right to live and work across 27 countries. The passport that removes the questions at borders you grew up worrying about. The specific peace of a continent that spent two world wars destroying itself and then built institutions that made a third war unthinkable in the places where it had been most thinkable. The EU is also its bureaucracies, its democratic deficits, its agricultural subsidies and structural fund arguments. You have lived with all of it. The abstract fact — that the continent you grew up in is, however imperfectly, organised to prevent its own self-destruction — is the one you keep coming back to.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.m += 3; p.setMem('ft44EuGenerationLate', true) },
  },

  // ─── BREXIT: THE UNRESOLVED ───────────────────────────────────────────────────

  {
    id: 'ft44_brexit_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('brexit_era') &&
      G.currentYear >= 2021 &&
      G.age >= 50 &&
      !G.mem?.ft44BrexitLate,
    text: 'Brexit has happened and the consequences have been distributed unevenly across different parts of the economy and the population in ways the referendum did not predict and that remain disputed. The people who voted Leave and the people who voted Remain have not, in the years since, converged on a common account of what it meant or what it produced. The political class that delivered Brexit is largely not the political class that has governed since. The question of whether Britain is better or worse positioned than it would have been is genuinely unresolved because the counterfactual is genuinely unavailable. You have your view. The view has not changed much, or it has changed in ways that surprise you.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.setMem('ft44BrexitLate', true) },
  },

  // ─── 1967 GENERATION: THE LONG SHADOW OF DEFEAT ──────────────────────────────

  {
    id: 'ft44_1967_generation_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('1967_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 50 &&
      !G.mem?.ft44Gen1967Late,
    text: 'The Six Days destroyed more than land. They destroyed the confidence that Arabism could defend itself, that Nasserism was a project with a future, that the Palestinian question could be resolved by Arab armies. What followed was not resolution but a different set of arrangements: the Oslo process, the Camp David failures, the permanent emergency, the Palestinian Authority as a kind of stateless state. You have lived the full arc of what the 1967 defeat produced — not the defeat itself, which was quick, but the forty, fifty, sixty years of consequences that do not resolve cleanly and that younger people inherit without having earned.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 3; p.setMem('ft44Gen1967Late', true) },
  },

  // ─── SADAT ASSASSINATION: WHAT FOLLOWED ──────────────────────────────────────

  {
    id: 'ft44_sadat_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sadat_assassination_witness') &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft44SadatLate,
    text: 'Sadat was killed on October 6, 1981 — the anniversary of the October War crossing, a military parade, Islamist soldiers who stepped out of formation. What followed was thirty years of Mubarak and the emergency law that never ended and the presidency that never held real elections. The Tahrir uprising of 2011 ended Mubarak and produced an elected president who was removed by a coup in 2013 and a general who became a president. You have watched the whole arc of what follows an assassination: not the dramatic break it promised but the slow consolidation of a different kind of order with different names for the same methods.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 4; p.setMem('ft44SadatLate', true) },
  },

  // ─── MAU MAU: THE BRITISH FILES ───────────────────────────────────────────────

  {
    id: 'ft44_mau_mau_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('mau_mau_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      !G.mem?.ft44MauMauLate,
    text: 'In 2011, the British Foreign Office acknowledged the existence of 1,500 files it had secretly transferred out of Kenya at independence — classified colonial records of the emergency period. The files described the detention camps, the systematic torture, the forced labour. In 2013, the British government settled with more than 5,000 Kenyans who had been tortured under colonial detention, paying roughly £20 million. The settlement was accompanied by a statement of "sincere regret." Not an apology. The distinction between regret and apology was not incidental. You have lived long enough to see what acknowledgment looks like when it comes: partial, delayed, legally calibrated, real and insufficient simultaneously.',
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 4; p.e += 3; p.setMem('ft44MauMauLate', true) },
  },

  // ─── CHECHNYA: THE GROZNY THAT WAS REBUILT ───────────────────────────────────

  {
    id: 'ft44_chechen_civilian_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('chechen_civilian') &&
      G.currentYear >= 2010 &&
      G.age >= 45 &&
      !G.mem?.ft44ChechCivilLate,
    text: 'Grozny was called the most destroyed city on earth by the UN in 2000. It has been rebuilt — the towers, the mosque, the Akhmat Kadyrov memorial that is everywhere. The city that was flattened in two wars now has glass and light and portraits of the leader. The people who survived in the rubble of the first Grozny and the ruins of the second Grozny live inside the rebuilt version with memories of the versions that were destroyed. You are among them. The rebuilt city looks like a new city. It is not a new city. It is the city that was destroyed, rebuilt, under the governance of the son of the man who was also killed in it. You navigate the gap between the memory and the surface.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 4; p.e += 3; p.setMem('ft44ChechCivilLate', true) },
  },

  // ─── MABO AND APOLOGY: WHAT FOLLOWED ─────────────────────────────────────────

  {
    id: 'ft44_mabo_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('mabo_generation') || G.flags.has('apology_generation')) &&
      G.currentYear >= 2015 &&
      G.age >= 55 &&
      !G.mem?.ft44MaboLate,
    text: (G) => {
      const isApology = G.flags.has('apology_generation')
      return isApology
        ? 'The Apology happened on February 13, 2008. The words were "We apologise." Not "we express regret" or "we acknowledge." The Stolen Generations members in the gallery and in viewing centres across the country heard it. What followed the Apology was not a resolution of the conditions that produced the Stolen Generations — the gap in health outcomes, incarceration rates, life expectancy, child removal still happening at rates that would have produced a second Stolen Generations report if applied to any other population. The Apology was real and was the beginning of something that has continued to be insufficient. Both of these things are true and you have held them both since 2008.'
        : 'The Mabo decision 1992 recognised that the common law doctrine of terra nullius — that Australia was legally uninhabited before 1788 — was false. The decision established native title as a legal concept. Native title claims require continuous connection to land across the dispossession and in specific forms that many communities cannot meet because the dispossession itself interrupted the required forms of connection. The law recognised what the law had denied and then created conditions for the recognition that the dispossession itself often prevents. You have lived with this circularity for thirty years.'
    },
    choices: null,
    effect: (p) => { p.r += 6; p.karma += 3; p.e += 4; p.setMem('ft44MaboLate', true) },
  },

]

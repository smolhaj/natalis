// events_followthrough_38.js — Nicaragua flag follow-throughs (6 events)
// Callbacks for: nic_somoza_generation, nic_revolution_generation,
// nic_literacy_generation, nic_election_1990_shock, nic_ortega_return,
// nic_2018_witness, nic_nicaraguan_exile

export const FOLLOWTHROUGH_38_EVENTS = [

  // ─── SOMOZA LATE: DYNASTY'S END IN EXILE ─────────────────────────────────────

  {
    id: 'ft38_somoza_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nic_somoza_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 50 &&
      !G.mem?.ft38SomozaLate,
    text: 'Somoza was assassinated in Asunción, Paraguay, in September 1980 — a year after he fled. A group linked to Montoneros, the Argentine guerrilla movement, killed him with a rocket launcher in the street. He had arrived with his holdings: real estate, banks, manufacturing. The Somoza fortune that was built on Nicaragua was spent in exile. His death was reported here with a specific quietness — not celebration, because the country was already past him, already deep in the war the Contra were fighting from Honduras. He is a man who happened to a country, and the country continued.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft38SomozaLate', true) },
  },

  // ─── REVOLUTION LATE: WHAT ORTEGA BECAME ─────────────────────────────────────

  {
    id: 'ft38_revolution_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('nic_revolution_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 55 &&
      !G.mem?.ft38RevolutionLate,
    text: 'The government that came from 1979 is shooting people who hold the same flags. You have thought about this more than you have wanted to. The revolution produced real things — the literacy campaign, the land reform, the healthcare expansion, the women in the government who were not decorative — and it also produced this: a man who grew old in power and became the thing the revolution was against. You do not know how to separate what was worth believing in from what it became. You have talked to people who say it was always this; you have talked to people who say it was betrayed. You are in neither camp. You hold it the way you hold anything that mattered to you and hurt you.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 5; p.e += 3; p.karma += 3; p.setMem('ft38RevolutionLate', true) },
  },

  // ─── LITERACY GENERATION: THE RATE HOLDS ─────────────────────────────────────

  {
    id: 'ft38_literacy_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nic_literacy_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 45 &&
      !G.mem?.ft38LiteracyLate,
    text: 'UNESCO awarded the Literacy Crusade the Nadezhda Krupskaya Prize in 1980. The literacy rate, which had been 50 percent before the crusade, did not return to that level even in the years of austerity that followed. The families in the countryside who learned to read in 1980 had children who started school already knowing what a page was. This is what a successful campaign produces: not a number but a generation with a different relationship to the written word. You were part of the production of that generation. It is one of the things you have done that has continued in the world without your involvement.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 5; p.r -= 3; p.setMem('ft38LiteracyLate', true) },
  },

  // ─── 1990 ELECTION SHOCK: DEMOCRACY'S LESSON ─────────────────────────────────

  {
    id: 'ft38_election_1990_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nic_election_1990_shock') &&
      G.currentYear >= 2010 &&
      G.age >= 50 &&
      !G.mem?.ft38Election1990Late,
    text: 'In the years after 1990, the democratic transfer became a point of pride — that the Sandinistas, having built a revolution and fought a decade of Contra war, accepted the result of a vote. Some countries that have held revolutions have never done this. After 2011 and after 2016, when Ortega changed the constitution to allow re-election and then to allow his wife to run as vice president and then to jail the opposition candidates ahead of the 2021 election, the memory of 1990 becomes more complicated. Either it was a genuine commitment that was later abandoned, or it was a strategic concession made under pressure that was reversed when the pressure was gone. You were there in 1990 and did not know which it was. You still do not know.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.setMem('ft38Election1990Late', true) },
  },

  // ─── 2018 WITNESS: THE REPORT ────────────────────────────────────────────────

  {
    id: 'ft38_2018_witness_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('nic_2018_witness') &&
      G.currentYear >= 2020 &&
      G.age >= 40 &&
      !G.mem?.ft382018Late,
    text: 'The Inter-American Commission on Human Rights documented 328 deaths between April and September 2018. The government calls the figure fabricated and calls the protesters coup-plotters. The International Criminal Court opened a preliminary examination. The political prisoners numbered in the thousands; some were released in 2023 by being expelled to the United States — 222 of them on a single plane, stripped of Nicaraguan citizenship. The government expropriated their property. This is the accounting that followed the spring. You are part of what it was accounting for.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 6; p.karma += 4; p.setMem('ft382018Late', true) },
  },

  // ─── NICARAGUAN EXILE: THE DIASPORA CALCULUS ─────────────────────────────────

  {
    id: 'ft38_exile_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('nic_nicaraguan_exile') &&
      G.currentYear >= 2022 &&
      G.age >= 45 &&
      !G.mem?.ft38ExileLate,
    text: 'You are in Costa Rica or Miami or Madrid or some city that is not Managua, and Nicaragua has cancelled your citizenship and taken your property and you have been legally made a person without a country. There are communities of you now — the Nicaragüenses sin patria, the Nicaraguans without a fatherland. You gather with people who left in April 2018 and people who left when the writers\' groups were shut down and people who left in 2021 when the candidates were jailed. The thing you share is not ideology but the specific experience of a country turning away from you while you were watching. The question you do not answer out loud, but that lives in every gathering, is whether you will ever go back.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 5; p.karma += 4; p.setMem('ft38ExileLate', true) },
  },

]

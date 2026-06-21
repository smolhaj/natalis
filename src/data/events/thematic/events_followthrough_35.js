// events_followthrough_35.js — MODE B follow-throughs
// 7 events: El Salvador arc echoes (7)

export const FOLLOWTHROUGH_35_EVENTS = [

  // ─── EL SALVADOR ─────────────────────────────────────────────────────────────

  {
    id: 'ft35_romero_canonised',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_romero_death_witness') &&
      G.currentYear >= 2018 &&
      G.age >= 55 &&
      !G.mem?.ft35RomeroCanon,
    text: 'The Vatican canonised Óscar Romero on October 14, 2018, thirty-eight years after his assassination. He is now Saint Óscar Arnulfo Romero y Galdámez. The church acknowledged what you had known since 1980: that he was killed for saying what was true about what was happening to poor people in El Salvador, and that what he was killed for is the condition for sainthood. The man who ordered it — Roberto D\'Aubuisson — died of cancer in 1992 without facing trial. His party, ARENA, governed El Salvador for twenty years afterward.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 5; p.karma += 4; p.setMem('ft35RomeroCanon', true) },
  },

  {
    id: 'ft35_mozote_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_el_mozote_generation') &&
      G.age >= 55 &&
      !G.mem?.ft35MozoteLate,
    text: 'The El Mozote case has been in the Salvadoran courts since 2016. The exhumations continued for years — the forensic anthropologists working plot by plot through what was the village. By 2022, over 300 victims had been individually identified from their bones. The soldiers who carried out the massacre are in their seventies and eighties. Several have died during the proceedings. El Salvador\'s Supreme Court ruled in 2016 that the 1993 amnesty law that protected them was unconstitutional. As of the late 2010s, the trial has not concluded. The bones accumulate their identities slowly.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m += 2; p.setMem('ft35MozoteLate', true) },
  },

  {
    id: 'ft35_renta_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_gang_renta_generation') &&
      G.age >= 50 &&
      !G.mem?.ft35RentaEcho,
    text: 'After 2022 the renta stopped. The boys who collected it are in CECOT or they disappeared before the arrests or they are living extremely quietly somewhere. The street is different. You walk it without calculating. The body memory of being on this street for twenty years — the particular way you held yourself, the peripheral vision — is still there even though its reason is gone. It takes longer than you expected to walk like someone who is not being watched.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 5; p.h += 2; p.setMem('ft35RentaEcho', true) },
  },

  {
    id: 'ft35_bukele_believer_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_bukele_believer') &&
      G.age >= 50 &&
      !G.mem?.ft35BukeleBeliev,
    text: 'The streets are safer than they have been in your lifetime. That is not nothing. Bukele won re-election in 2024 with eighty-three percent of the vote, though the constitution he himself wrote said he could not run again. His party controls every institution. The press is restricted. The opposition is dispersed. You hold the safety with both hands. You also understand, having lived through this country\'s history, what it means when one man holds every lever. You hold both things because both things are yours to hold.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.e += 3; p.setMem('ft35BukeleBeliev', true) },
  },

  {
    id: 'ft35_bukele_skeptic_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_bukele_skeptic') &&
      G.age >= 50 &&
      !G.mem?.ft35BukeleSkep,
    text: 'By 2024, Bukele controls the presidency, the legislature, the Supreme Court, and the Attorney General\'s office. He ran for re-election despite the constitution he wrote prohibiting it, and the Supreme Court, which he had replaced, ruled that he could. He won with eighty-three percent. You were skeptical from the beginning. The skepticism was not wrong. The safety he produced was also real. You live in the tension between these facts, in a country that has always required you to hold contradictions in the same hand.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.e += 4; p.setMem('ft35BukeleSkep', true) },
  },

  {
    id: 'ft35_estado_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slv_estado_excepcion_generation') &&
      G.age >= 45 &&
      !G.mem?.ft35EstadoLate,
    text: 'The estado de excepción was declared for thirty days in March 2022. It has been renewed every thirty days since. CECOT holds its population in permanent pretrial detention — people whose cases have not been heard, some of whom may never have a hearing. Human rights organizations document the cases of the innocents: men arrested because of a tattoo, a neighborhood, a relative. The murder rate is the lowest in decades. Both of these sentences are true. You live in a country where both are true simultaneously and have stopped waiting for them to resolve.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m += 2; p.setMem('ft35EstadoLate', true) },
  },

  {
    id: 'ft35_civil_war_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('slv_romero_death_witness') &&
      G.flags.has('slv_estado_excepcion_generation') &&
      G.age >= 60 &&
      !G.mem?.ft35CivilWarArc,
    text: 'You have lived in three El Salvadors. The first one had death squads and disappeared neighbors and a war that ran for twelve years and killed seventy-five thousand people. The second had the gangs and the renta and a peace agreement that produced something no one had planned. The third has the mega-prison and the quiet streets and a president who is in certain respects the only person in the country who holds power. You have been Salvadoran through all three. The country does not offer the option of experiencing only the version you would have chosen.',
    choices: null,
    effect: (p) => { p.r += 8; p.m += 5; p.karma += 4; p.setMem('ft35CivilWarArc', true) },
  },

]

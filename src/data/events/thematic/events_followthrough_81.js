// events_followthrough_81.js — Italy depth arc follow-throughs

export const FOLLOWTHROUGH_81_EVENTS = [

  // ── italy_partisan_veteran ────────────────────────────────────────────────

  {
    id: 'ft81_partisan_april25',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('italy_partisan_veteran') &&
      G.currentYear >= 1946 && G.currentYear <= 1980 &&
      G.age >= 45 &&
      !G.mem?.ft81PartisanApril25,
    text: 'April 25. Every year the same march through the center of the city, the same partisan songs, the same tricolor flags. You were there, in the mountains, from late 1943 to the spring of 1945. The people in the march who were not there outnumber the people who were by more each year. You march. The republic you are marching through was founded by people who made the same choice you made. This is not nothing.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 3
      p.setMem('ft81PartisanApril25', true)
    },
  },

  {
    id: 'ft81_partisan_late_politics',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('italy_partisan_veteran') &&
      G.currentYear >= 1990 &&
      G.age >= 65 &&
      !G.mem?.ft81PartisanLate,
    text: 'A politician invokes the Resistance at a rally. The politician was born in 1975. You listen to the invocation with a specific quality of attention. The Resistance is now a rhetorical resource available to parties across the spectrum, each claiming its inheritance. You were in the mountains. What that was, and what is being claimed now, are in some relation to each other that you have stopped trying to articulate to people who were not there.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft81PartisanLate', true)
    },
  },

  // ── pci_generation ────────────────────────────────────────────────────────

  {
    id: 'ft81_pci_berlinguer',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pci_generation') &&
      G.currentYear >= 1984 && G.currentYear <= 1986 &&
      G.age >= 30 &&
      !G.mem?.ft81PciBerlinguer,
    text: 'June 7, 1984. Enrico Berlinguer collapses on the stage at a rally in Padova while speaking. He dies four days later. The largest funeral in Italian postwar history: a million people in Rome. Berlinguer had made the PCI into something that did not exist elsewhere in Europe: a Communist Party that had broken with Moscow, that argued for democratic means, that built its identity around moral seriousness rather than revolutionary rhetoric. You mourn him as you would mourn someone who represented what you thought politics could be.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.setMem('ft81PciBerlinguer', true)
    },
  },

  {
    id: 'ft81_pci_dissolution',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pci_generation') &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      G.age >= 30 &&
      !G.mem?.ft81PciDissolution,
    text: 'February 1991. The congress in Rimini: the PCI becomes the PDS — Partito Democratico della Sinistra. The oak tree replaces the hammer and sickle. Rifondazione Comunista breaks off, keeping the old symbol. You watch the congress on television and understand that something that has been the organizing structure of a portion of your political life is ending. The question of whether to go with the PDS or the Rifondazione or neither is a question about what you were a member of, which is a question about who you are.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 8
      p.setMem('ft81PciDissolution', true)
    },
  },

  // ── postconciliar_generation ──────────────────────────────────────────────

  {
    id: 'ft81_postconciliar_abortion',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('postconciliar_generation') &&
      G.currentYear >= 1981 && G.currentYear <= 1983 &&
      G.age >= 25 &&
      !G.mem?.ft81PostconciliarAbortion,
    text: 'May 1981. The referendum on the abortion law: 67.9 percent vote to keep Law 194, which legalized abortion three years earlier. The Church opposed the law and opposed the retention. The Catholic electorate voted for it anyway, by a large majority. This is the Italian Catholic paradox you have been living inside: the Church says one thing; the faithful, who go to mass and cross themselves and baptize their children, do something else. The distance between institutional position and lived practice is the space where Italian Catholicism actually lives.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft81PostconciliarAbortion', true)
    },
  },

  // ── seconda_repubblica_disillusion ────────────────────────────────────────

  {
    id: 'ft81_seconda_rep_grillo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('seconda_repubblica_disillusion') &&
      G.currentYear >= 2013 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem?.ft81SecondaGrillo,
    text: 'February 2013. The Five Star Movement wins 25.5 percent in the general election. Grillo did not stand himself; the party ran new faces. The party is against the established left and the established right simultaneously. Its voters are the voters that the Second Republic produced and then failed: workers who lost their jobs, young people who could not find them, people who watched the political class cycle through corruption and austerity and emerged unchanged. The Five Star vote is the Second Republic delivering its verdict on itself.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft81SecondaGrillo', true)
    },
  },

  // ── dc_generation ─────────────────────────────────────────────────────────

  {
    id: 'ft81_dc_mani_pulite',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('dc_generation') &&
      G.flags.has('mani_pulite_generation') &&
      G.currentYear >= 1993 && G.currentYear <= 1995 &&
      G.age >= 35 &&
      !G.mem?.ft81DcMani,
    text: 'The DC disbands in January 1994 after forty-eight years in continuous government. The Mani Pulite investigations have revealed that the party financed itself through the systematic payment of tangenti on public contracts — percentages, kickbacks, a parallel economy of corruption. You voted DC. The party you voted for ran the country and financed itself this way for decades. You are processing the fact that the system you were part of was the system that was investigated, which is different from learning this about someone else\'s party.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 8
      p.setMem('ft81DcMani', true)
    },
  },

  // ── italy_austerity_generation ────────────────────────────────────────────

  {
    id: 'ft81_austerity_stagnation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('italy_austerity_generation') &&
      G.currentYear >= 2020 &&
      G.age >= 55 &&
      !G.mem?.ft81AusterityStagnation,
    text: 'Italy\'s GDP in 2020 is lower in real terms than in 2000. Twenty years of growth below the European average. The currency union that was supposed to bring the benefits of the German export economy: Italy is inside it and does not have the German export economy. The debate about the euro and the debt and the spread and whether it was austerity or structural problems or both has been running since 2011 and has not been resolved. You saved during the spread crisis. The savings bought time. The structural issue remained.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.w -= 3
      p.setMem('ft81AusterityStagnation', true)
    },
  },

  // ── mezzogiorno_organized_crime_texture ───────────────────────────────────

  {
    id: 'ft81_mezzogiorno_leave_or_stay',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('mezzogiorno_organized_crime_texture') &&
      G.currentYear >= 1970 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.ft81MezzogiornoLeave,
    text: 'You are old enough now to understand what the geometry of avoided subjects meant. The cousin with the car is connected to something. The business that stays open is connected to something. You understand the system and you have to decide what your relationship to it will be. The options are not clean: you can leave the town that has this structure in it, or you can stay and navigate around it, or you can not navigate around it. Each option has costs that do not appear in the options.',
    choices: [
      {
        text: 'You leave. The leaving is also the structure making itself felt.',
        tag: null,
        outcome: 'You leave and the structure sends people away who would rather have stayed. The brain drain of the Mezzogiorno is partly the organized crime structure exporting its dissidents. You are one of the exported.',
        effect: (p) => { p.m -= 4; p.r += 5; p.w += 3; p.setMem('ft81MezzogiornoLeave', true); },
      },
      {
        text: 'You stay and find the margins of the system to live in.',
        tag: null,
        outcome: 'The margins exist. They require attention. The attention is a permanent low-level cost of living where you live. You pay it and you build something in the space the margins allow.',
        effect: (p) => { p.m -= 5; p.r += 7; p.setMem('ft81MezzogiornoLeave', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft81_mezzogiorno_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('mezzogiorno_organized_crime_texture') &&
      G.currentYear >= 1990 &&
      G.age >= 35 &&
      !G.mem?.ft81MezzogiornoMid,
    text: 'The maxi-process against the Sicilian Mafia begins in 1986; the sentences are confirmed in 1992. Falcone and Borsellino are killed the same year. The 1990s bring the capture of Riina, the Camorra trials in Naples, the investigations into the \'Ndrangheta in Calabria. The anti-mafia state and the organized crime state contest the same territory. You grew up in the territory being contested. The news of the trials has a different texture when you recognize the geography of the charges.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft81MezzogiornoMid', true)
    },
  },

  // ── italy_meloni_2022 ─────────────────────────────────────────────────────

  {
    id: 'ft81_meloni_in_office',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('italy_meloni_2022') &&
      G.currentYear >= 2024 &&
      G.age >= 25 &&
      !G.mem?.ft81MeloniInOffice,
    text: 'Two years into the Meloni government: Italy has not left the euro, has not withdrawn from NATO, has followed a broadly conventional fiscal path. The alarm that European leaders expressed in 2022 has moderated. The voters who chose her for the rupture did not get the rupture; the voters who feared the rupture did not experience it. The post-fascist genealogy is documented and the governing record is conventional and both things are true and the tension between them is the Italian political argument that runs through the legislature.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft81MeloniInOffice', true)
    },
  },

]

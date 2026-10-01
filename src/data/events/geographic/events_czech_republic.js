// events_czech_republic.js — Czech Republic depth arc (8 events)
// Complements events_central_europe.js which covers normalization 1969-89,
// Charter 77, Velvet Revolution 1989, and lustration.
// This module covers: 1948 Communist coup, Stalinist show trials 1952,
// Prague Spring 1968, August invasion, 1968 emigration wave,
// Havel presidency, Velvet Divorce 1993, EU accession 2004.

const IS_CZECH = (G) => G.character.country?.name === 'Czech Republic'

export const CZECH_REPUBLIC_EVENTS = [

  // ─── FEBRUARY 1948: THE COUP ──────────────────────────────────────────────────

  {
    id: 'cze_victorious_february_1948',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1948 &&
      G.age >= 16 &&
      !G.mem?.czeFebruary48,
    text: 'The non-Communist ministers resign in February expecting it to force an election, and instead the militia comes into Prague with rifles from the factories. Benes signs the list they bring him and then he resigns as well. In March the foreign minister is found in the courtyard below his bathroom window and the finding is suicide. There is no vote about any of it. The month gets a name in the newspapers and the name is Victorious February.',
    context: 'The Communist Party had been the largest in Czechoslovakia since the 1946 election. Twelve non-Communist ministers resigned on 20 February 1948 over police appointments; Klement Gottwald mobilised the People\'s Militia, President Benes accepted the resignations and appointed a Communist-dominated government. Foreign minister Jan Masaryk was found dead beneath his window on 10 March; the death was ruled suicide and re-investigated as murder in 2004.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.e += 3; p.addFlag('cze_communist_takeover_generation'); p.setMem('czeFebruary48', true) },
  },

  // ─── SLÁNSKÝ TRIAL 1952 ───────────────────────────────────────────────────────

  {
    id: 'cze_slansky_trial',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1952 && G.currentYear <= 1954 &&
      G.age >= 16 &&
      !G.mem?.czeSlansky,
    text: 'November 1952, and the general secretary of the Party is on trial for treason with thirteen others, most of them Jews, and the charge is cosmopolitanism. Every one of them confesses, after weeks without sleep. Eleven are hanged. You know people who signed declarations supporting the verdict. The terror reaches into the Party itself, so no position is safe, so the compliance is total.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.e += 2; p.addFlag('cze_stalinist_terror_generation'); p.setMem('czeSlansky', true) },
  },

  // ─── PRAGUE SPRING 1968 ───────────────────────────────────────────────────────

  {
    id: 'cze_prague_spring',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1968 &&
      G.age >= 14 &&
      !G.mem?.czePragueSpring,
    text: (G) => {
      const youth = G.age <= 22
      return youth
        ? 'January 1968, and Dubček, and the air changes. The censorship is not lifted; it simply stops being enforced, and the newspapers print what they have never printed and the radio says things. You grew up in a country that was grey by administrative decision, and the grey is retreating. Students speak in public. For seven months it feels like something that will last.'
        : 'Dubček\'s Action Programme is published in April: freedom of the press, rehabilitation of the purge victims, federalisation, a path toward a more human socialism. The Soviet Union is watching. The Party apparatus in Warsaw, Berlin, and Budapest is watching. You are watching too — at your age you have seen enough to know that what is happening may not survive the summer. You are in it anyway. The seven months between January and August 1968 are the seven months that define what it means to have been Czech in the twentieth century.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.r += 4; p.e += 4; p.addFlag('cze_prague_spring_generation'); p.setMem('czePragueSpring', true) },
  },

  // ─── AUGUST 1968: THE INVASION ────────────────────────────────────────────────

  {
    id: 'cze_invasion_august_1968',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1968 &&
      G.age >= 14 &&
      // The seven months are carried by the world event (prague_spring_1968),
      // which reaches every Czech before 1968's event is drawn. Requiring
      // cze_prague_spring's own flag made this unreachable: that event is also
      // confined to 1968, and one event resolves per year. (One flag, not
      // either of two: the dated slot cannot read a disjunction.)
      G.flags.has('prague_spring_generation') &&
      !G.mem?.czeAugust68,
    text: 'They come at night and by morning there is a tank at the end of Vinohradska with its engine running. The radio stays on until the soldiers reach the door, and what it says is that this is an occupation, that nothing was done to deserve it, and that nobody should resist. A student on your landing holds a tape recorder up against the speaker so that it will exist afterwards. Seven months of the one thing, and one night of the other.',
    context: 'On the night of 20-21 August 1968 roughly 500,000 Warsaw Pact troops and 2,000 tanks from the USSR, Poland, Hungary, Bulgaria and East Germany entered Czechoslovakia. Alexander Dubcek was arrested and flown to Moscow. Czechoslovak Radio broadcast from its Vinohradska studios until troops reached the building. The twenty years of enforced conformity that followed were officially termed normalisation.',
    choices: [
      {
        text: 'You stand in front of a tank. You are not alone.',
        tag: 'Resist',
        outcome: 'The tank does not stop. You move. There is nothing to do with your body except show it and move it. You have stood in front of a tank. This is not nothing.',
        effect: (p) => { p.m -= 15; p.r += 8; p.karma += 8; p.addFlag('cze_invasion_generation'); p.addFlag('cze_prague_spring_generation'); p.addFlag('political_active') },
      },
      {
        text: 'You watch from the window. The column takes an hour to pass.',
        tag: 'Witness',
        outcome: 'You count them. You lose count. You will know what you counted for the rest of your life: that you were at a window watching your country be occupied for the second time in thirty years.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('cze_invasion_generation'); p.addFlag('cze_prague_spring_generation') },
      },
    ],
    effect: null,
  },

  // ─── 1968 EMIGRATION ──────────────────────────────────────────────────────────

  {
    id: 'cze_emigration_1968',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1968 && G.currentYear <= 1970 &&
      G.age >= 18 && G.age <= 40 &&
      // Everyone in the country in 1968 lived the invasion; a life that drew
      // the Spring's event that year instead of August's is still that life.
      (G.flags.has('cze_invasion_generation') || G.flags.has('cze_prague_spring_generation')) &&
      !G.mem?.czeEmigration68,
    text: 'Three hundred thousand Czechs and Slovaks leave between 1968 and 1969, while the borders are briefly porous. The intellectuals, the reformers, the people who had signed things and who know that their names are being written into files. You know people who left in August, September, October. Some of them end up in Vienna, in Paris, in Toronto, in New York. Some of them write from wherever they are. Some of them you never hear from again, not because they died but because a letter to the wrong person can still cost something.',
    choices: [
      {
        text: 'You leave while you can.',
        tag: 'Emigrate',
        outcome: 'You are on the western side of the border before the year is out. The country you left is behind a curtain you cannot see through. This is the beginning of the exile years.',
        effect: (p) => { p.r += 10; p.m -= 8; p.addFlag('cze_emigrant_1968'); p.setResidency('refugee_status') },
      },
      {
        text: 'You stay. The country needs people who stay.',
        tag: 'Stay',
        outcome: 'You watch the people leave and you stay. The border closes. The twenty years of normalization begin and you are inside them. This is also a life.',
        effect: (p) => { p.r += 6; p.m -= 8; p.karma += 4; p.addFlag('cze_stayer_1968') },
      },
    ],
    effect: null,
  },

  // ─── HAVEL PRESIDENCY ────────────────────────────────────────────────────────

  {
    id: 'cze_havel_president',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 25 &&
      !G.mem?.czeHavel,
    text: 'January 1, 1990, and Václav Havel is president: a playwright who spent years in prison, who wrote about living in truth, about refusing even in small ways to take part in the performance. The man who was in prison in December is head of state in January. He gives his first address and quotes Masaryk, and you watch, and the moment is exactly as strange as it sounds.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 4; p.karma += 5; p.addFlag('cze_havel_generation'); p.setMem('czeHavel', true) },
  },

  // ─── VELVET DIVORCE 1993 ─────────────────────────────────────────────────────

  {
    id: 'cze_velvet_divorce',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1993 &&
      G.age >= 25 &&
      !G.mem?.czeVelvetDivorce,
    text: 'January 1, 1993, and Czechoslovakia ceases to exist. Nobody asked the voters; the polls said most people on both sides wanted to stay together. The currency splits, the passports split, the football team splits, and the history becomes two histories that will tell it differently. You were Czechoslovak and now Slovakia is a foreign country. Like the revolution, it is done without violence, and it is still a loss.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 4; p.e += 2; p.addFlag('cze_velvet_divorce_generation'); p.setMem('czeVelvetDivorce', true) },
  },

  // ─── EU ACCESSION 2004 ────────────────────────────────────────────────────────

  {
    id: 'cze_eu_accession_2004',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 2004 &&
      G.age >= 25 &&
      !G.mem?.czeEU2004,
    text: 'May 1, 2004, and the Czech Republic is in the European Union, and border posts that stood in one form or another since the Habsburgs are coming down. You can live and work anywhere in it, legally. For people who grew up needing permission to travel, whose passports were a privilege the state could take away, this is something. Your children will find it ordinary. You know it is not.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r -= 2; p.addFlag('cze_eu_generation'); p.setMem('czeEU2004', true) },
  },

]

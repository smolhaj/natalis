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
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1948 &&
      G.age >= 16 &&
      !G.mem?.czeFebruary48,
    text: 'Únor — February. The Communist Party has been the largest party since 1946. In February 1948 it moves: the non-Communist ministers resign in protest over police appointments, expecting this will force new elections. Instead, Gottwald calls a workers\' militia into Prague and accepts the resignations. The Social Democrats collapse into the Party. Beneš signs the new government and resigns. Within weeks the Foreign Minister Masaryk is found dead below his bathroom window. The official version is suicide. The country that survived the Nazis and the occupation has become a people\'s democracy of a particular kind, governed from Moscow. There was no referendum. The February in which this happened is called Victorious.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.e += 3; p.addFlag('cze_communist_takeover_generation'); p.setMem('czeFebruary48', true) },
  },

  // ─── SLÁNSKÝ TRIAL 1952 ───────────────────────────────────────────────────────

  {
    id: 'cze_slansky_trial',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1952 && G.currentYear <= 1954 &&
      G.age >= 16 &&
      !G.mem?.czeSlansky,
    text: 'Rudolf Slánský is the Secretary-General of the Czechoslovak Communist Party. In November 1952 he is tried for treason. Eleven of the fourteen defendants are Jewish; the charges invoke "cosmopolitanism" — the Soviet euphemism. Slánský confesses. All the accused confess. The confessions were produced through weeks of sleep deprivation and psychological methods that have since been documented in detail. Eleven are hanged. You know people who signed declarations supporting the verdict. The terror is not random — it is systematic, and it targets the Party itself, which means no position is safe, which means the compliance it produces is total.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.e += 2; p.addFlag('cze_stalinist_terror_generation'); p.setMem('czeSlansky', true) },
  },

  // ─── PRAGUE SPRING 1968 ───────────────────────────────────────────────────────

  {
    id: 'cze_prague_spring',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1968 &&
      G.age >= 14 &&
      !G.mem?.czePragueSpring,
    text: (G) => {
      const youth = G.age <= 22
      return youth
        ? 'January 1968: Dubček becomes First Secretary and the country changes its atmosphere. The censorship is not formally lifted — it simply stops being enforced. Newspapers print things they have not printed. Writers write what they have not written. The radio says things. You have grown up in a country that was grey by administrative decision, and now the grey is retreating. Students are speaking in public. There is a specific quality to the spring of 1968 that has nothing to do with the weather. You are inside it and it feels, for seven months, like something that will last.'
        : 'Dubček\'s Action Programme is published in April: freedom of the press, rehabilitation of the purge victims, federalisation, a path toward a more human socialism. The Soviet Union is watching. The Party apparatus in Warsaw, Berlin, and Budapest is watching. You are watching too — at your age you have seen enough to know that what is happening may not survive the summer. You are in it anyway. The seven months between January and August 1968 are the seven months that define what it means to have been Czech in the twentieth century.'
    },
    choices: null,
    effect: (p) => { p.m += 12; p.r += 4; p.e += 4; p.addFlag('cze_prague_spring_generation'); p.setMem('czePragueSpring', true) },
  },

  // ─── AUGUST 1968: THE INVASION ────────────────────────────────────────────────

  {
    id: 'cze_invasion_august_1968',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1968 &&
      G.age >= 14 &&
      G.flags.has('cze_prague_spring_generation') &&
      !G.mem?.czeAugust68,
    text: 'August 20, 1968. Two thousand tanks from the Soviet Union, Poland, Hungary, Bulgaria, and East Germany. Five hundred thousand troops. They come at night. Dubček is arrested and flown to Moscow. The radio stations stay on air until the troops arrive at the door. A student turns on his tape recorder and holds it to the loudspeaker. The broadcasts are: this is an occupation, we have done nothing to deserve this, please do not resist. The Prague Spring lasts seven months. The tanks take one night. What follows is called normalization. You know now what the next twenty years will look like.',
    choices: [
      {
        text: 'You stand in front of a tank. You are not alone.',
        tag: 'Resist',
        outcome: 'The tank does not stop. You move. There is nothing to do with your body except show it and move it. You have stood in front of a tank. This is not nothing.',
        effect: (p) => { p.m -= 15; p.r += 8; p.karma += 8; p.addFlag('cze_invasion_generation'); p.addFlag('political_active') },
      },
      {
        text: 'You watch from the window. The column takes an hour to pass.',
        tag: 'Witness',
        outcome: 'You count them. You lose count. You will know what you counted for the rest of your life: that you were at a window watching your country be occupied for the second time in thirty years.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('cze_invasion_generation') },
      },
    ],
    effect: null,
  },

  // ─── 1968 EMIGRATION ──────────────────────────────────────────────────────────

  {
    id: 'cze_emigration_1968',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1968 && G.currentYear <= 1970 &&
      G.age >= 18 && G.age <= 40 &&
      G.flags.has('cze_invasion_generation') &&
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 25 &&
      !G.mem?.czeHavel,
    text: 'Václav Havel becomes president on January 1, 1990. He has spent years in prison. He is a playwright. He has written about what he calls "living in truth" — the specific effort of refusing, even in small ways, to participate in the performance the regime required. The man who was in prison in December is the head of state in January. This sequence of events is not normal. You are living in a country where it has happened. He gives his first presidential address and quotes Masaryk and speaks about the truth that has to be achieved and you are watching and the specific quality of the moment is that it is exactly as strange as it sounds.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 4; p.karma += 5; p.addFlag('cze_havel_generation'); p.setMem('czeHavel', true) },
  },

  // ─── VELVET DIVORCE 1993 ─────────────────────────────────────────────────────

  {
    id: 'cze_velvet_divorce',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 1993 &&
      G.age >= 25 &&
      !G.mem?.czeVelvetDivorce,
    text: 'January 1, 1993: Czechoslovakia ceases to exist. The Czech Republic and Slovakia are now two countries. This was decided by the parliamentary leadership without a referendum — polls showed majorities in both countries preferring to stay together — but the Klaus-Mečiar agreement divided the state anyway. The currency splits. The passports split. The football team splits. The shared history splits into two national histories that will tell it differently. You were Czechoslovak and now you are Czech and Slovakia is a foreign country. The divorce was, like the revolution, without violence. The peaceable quality of it does not mean it was not a loss.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 4; p.e += 2; p.addFlag('cze_velvet_divorce_generation'); p.setMem('czeVelvetDivorce', true) },
  },

  // ─── EU ACCESSION 2004 ────────────────────────────────────────────────────────

  {
    id: 'cze_eu_accession_2004',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_CZECH(G) &&
      G.currentYear === 2004 &&
      G.age >= 25 &&
      !G.mem?.czeEU2004,
    text: 'May 1, 2004: the Czech Republic joins the European Union along with nine other countries. The border controls that have existed in various forms since the Habsburgs are coming down. You can move to Germany, to France, to any EU country and live and work there legally. The Schengen Zone will follow. For people who grew up in a country where you needed permission to travel — where the passport itself was a privilege the state could withhold — this is something. Your children, if they have them, will grow up in a country that is part of the largest democratic political project in history. They will find this ordinary. You know it is not ordinary.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r -= 2; p.addFlag('cze_eu_generation'); p.setMem('czeEU2004', true) },
  },

]

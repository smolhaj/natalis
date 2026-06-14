// Georgia arc events
// April 9, 1989 Tbilisi massacre; independence and civil war; Abkhazia conflict;
// Rose Revolution 2003; 2008 Russia-Georgia war; EU integration dream.

export const GEORGIA_EVENTS = [

  {
    id: 'geo_april9_1989',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear === 1989 &&
      G.age >= 13 &&
      !G.mem?.geoApril9,
    text: 'April 9, 1989. A peaceful vigil in front of the Government House on Rustaveli Avenue — the center of Tbilisi — has been running for days. Before dawn, Soviet troops arrive with clubs and sapper shovels. Twenty-one people are killed; many later report strange symptoms — it will be confirmed that the troops used nerve agent Iperit. Among those who die are women who came to support hunger strikers. The event has a name afterward: April 9. In Georgia, those two words together mean something specific. The Soviet argument that it was a post-Soviet republic — not a nation — has received an answer in blood.',
    choices: [
      {
        text: 'You are on Rustaveli Avenue that night. You are in the thing that happens.',
        tag: null,
        outcome: 'You survive it. What happened to the people who did not survive it stays with you in the specific way that things stay with the people who were present.',
        effect: (p) => { p.m -= 15; p.karma += 8; p.r += 6; p.addFlag('april_9_generation'); p.addFlag('political_active'); p.setMem('geoApril9', true); },
      },
      {
        text: 'You are not there but you hear it in the morning — the news coming through, the bodies.',
        tag: null,
        outcome: 'The morning news of April 9 becomes a dividing line. Before it, the Soviet framework was still the air you breathed. After it, the framework had collapsed as a form of authority, even if not yet as a fact.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 3; p.addFlag('april_9_generation'); p.setMem('geoApril9', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'geo_abkhazia_war',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem?.geoAbkhazia,
    text: 'The Abkhazia conflict, 1992–1993. Georgian troops enter Abkhazia in August 1992; fighting continues for a year; Sukhumi falls in September 1993 and the Georgian army is expelled. Two hundred and fifty thousand Georgians from Abkhazia are displaced — they become IDPs, internally displaced persons, and some will remain displaced for decades. The conflict is widely understood in Georgia as a Russian-backed Abkhazian action against Georgian territorial integrity. Understanding it this way and being able to do anything about it are two different things.',
    choices: [
      {
        text: 'You have family in Abkhazia, or you know people displaced. The displacement is specific and immediate.',
        tag: null,
        outcome: 'The specific apartment, the specific street, the specific summer smell of the Black Sea coast that cannot be returned to. Some IDP families will wait thirty years and not go back. Some will die waiting.',
        effect: (p) => { p.m -= 12; p.r += 7; p.addFlag('abkhazia_displaced_connection'); p.setMem('geoAbkhazia', true); },
      },
      {
        text: 'You follow the war from Tbilisi. The losses are abstract until they are not.',
        tag: null,
        outcome: 'Sukhumi falls on September 27. The news arrives in a form that is hard to make sense of. Georgia has just lost, and the phrase has a concrete meaning: a quarter million people without homes.',
        effect: (p) => { p.m -= 7; p.r += 5; p.setMem('geoAbkhazia', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'geo_rose_revolution',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 2003 && G.currentYear <= 2003 &&
      G.age >= 18 &&
      !G.mem?.geoRose,
    text: 'November 2003. The parliamentary election results are falsified. The opposition, led by Mikheil Saakashvili and others, calls people into the streets. On November 22, the opposition storms Parliament holding roses and Shevardnadze, who has governed Georgia since 1992 — and before that, who served as Soviet foreign minister — leaves without military response. Shevardnadze resigns. The transfer of power is peaceful. The thing that happened is called the Rose Revolution. It is the first of the color revolutions, and for a few years it seems to suggest something about what is possible in the post-Soviet space.',
    choices: [
      {
        text: 'You are in Parliament Square with the roses. You are part of what the Rose Revolution was.',
        tag: null,
        outcome: 'The feeling in the square — the roses, the peaceable transfer of power, the sense that this was possible — becomes a specific kind of hope you carry into the following years.',
        effect: (p) => { p.m += 12; p.karma += 7; p.r += 3; p.addFlag('rose_revolution_georgia'); p.setMem('geoRose', true); },
      },
      {
        text: 'You watch. You are cautious about what revolutions promise.',
        tag: null,
        outcome: 'The caution is the right instrument for what comes after. What comes after is not a betrayal of the Rose Revolution, exactly — but it is more complicated than the square suggested.',
        effect: (p) => { p.m += 7; p.e += 3; p.addFlag('rose_revolution_georgia'); p.setMem('geoRose', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'geo_war_2008',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear === 2008 &&
      G.age >= 18 &&
      !G.mem?.geoWar2008,
    text: 'August 7, 2008. Georgian forces move on South Ossetia. Russia responds with a force far larger than South Ossetia required — armored columns from the Roki Tunnel, air strikes on Georgian territory, Russian tanks advancing to within forty kilometres of Tbilisi before the ceasefire. Five days. The war clarifies a number of things simultaneously: that Russia is willing to use force to maintain a sphere of influence, that NATO membership for Georgia is not imminent, and that the borders of Georgian sovereignty have a form that external recognition does not make real. Russia recognises South Ossetia and Abkhazia as independent. No one else does.',
    choices: [
      {
        text: 'You are in Tbilisi, following the advance of the Russian columns on whatever information you can get.',
        tag: null,
        outcome: 'The forty kilometres is a number you will remember for the rest of your life. The tanks stopped. You do not know exactly why they stopped. The stopping is what happened.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('georgian_war_2008'); p.setMem('geoWar2008', true); },
      },
      {
        text: 'You are in Gori or near the front. The abstractions become ground and smoke.',
        tag: null,
        outcome: 'Ground and smoke and the specific sound of military aircraft and the speed at which the world becomes unfamiliar. Five days.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.r += 7; p.addFlag('georgian_war_2008'); p.setMem('geoWar2008', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'geo_eu_dream',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 2014 &&
      G.age >= 18 &&
      !G.mem?.geoEUDream,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2024) {
        return 'The Georgian Dream party, despite having secured EU candidate status in 2023, introduces a foreign agents law modelled on Russia\'s. The protests in Tbilisi begin and continue for weeks — tear gas, water cannon, people returning night after night to Rustaveli Avenue. The EU flag alongside the Georgian one. The specific sentence that appears on signs: "I choose Europe." The government does not change course. The EU suspends accession talks. The protesters keep coming. You have been watching Rustaveli Avenue since April 9, 1989.'
      }
      return 'The EU Association Agreement was signed in 2014, and the EU integration process has been the central axis of Georgian foreign and domestic politics for a decade. The Rose Revolution promised a Western trajectory. The 2008 war clarified that Russia will contest it. What remains is the Georgian insistence — the EU flag in the streets, the applications, the legal reforms. The insistence is not nothing. Whether it is enough is a different question.'
    },
    choices: [
      {
        text: 'You believe the EU future is possible and you are doing what you can toward it.',
        tag: null,
        outcome: 'The belief and the doing are the conditions for the thing that may or may not arrive.',
        effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('eu_dream_georgia'); p.setMem('geoEUDream', true); },
      },
      {
        text: 'You are tired of the dream. The dream has been the terrain of Georgian politics for fifteen years.',
        tag: null,
        outcome: 'The fatigue is also data. The people who are not fatigued are still in the street. The question is what the distinction means.',
        effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('eu_dream_georgia'); p.setMem('geoEUDream', true); },
      },
    ],
    effect: null,
  },

]

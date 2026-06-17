// Georgia arc events
// April 9, 1989 Tbilisi massacre; independence and civil war; Abkhazia conflict;
// Rose Revolution 2003; 2008 Russia-Georgia war; EU integration dream.
//
// Added depth:
//  — 1990s collapse: the economy shrank 70%. Power 4 hours/day in winter. Furniture
//    burned for heat. Mkhedrioni warlords in the streets. Shevardnadze back from Moscow.
//  — The supra: the Georgian feast, the tamada (toast-master), the toasts that go for
//    hours, the hierarchy of the table, the obligation of hospitality. To know how to
//    give a toast is a form of Georgian literacy.
//  — Saakashvili reforms 2004–2012: the police force dismantled overnight and replaced,
//    the customs checkpoints where everyone paid bribes — gone in a week. Also: Rustavi 2
//    arrested, opposition dispersed with water cannon in 2007. The reform and its limits.
//  — Georgian Orthodox identity: the church survived the Soviet period as a national
//    institution. Patriarch Ilia II ordained in 1977 and still serving. The cross of
//    Saint Nino. The intersection of Christianity and Georgian national self-understanding.
//  — Late reckoning: for those who have lived April 9 → Rose Revolution → 2008 → 2024.

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

  // ── THE 1990S COLLAPSE ────────────────────────────────────────────────────────

  {
    id: 'geo_1990s_collapse',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 1991 && G.currentYear <= 1999 &&
      G.age >= 15 &&
      !G.mem?.geo1990s,
    text: 'Independence, and then the collapse that independence brought: the economy shrank by seventy percent in four years. Power came four hours a day in winter, sometimes less. People burned furniture for heat. The currency — the coupon, then the lari — lost value before you could spend it. The Mkhedrioni were in the streets with guns, ostensibly a paramilitary force, practically a criminal organisation with political protection. Shevardnadze returned from Moscow to run the country because there was no one else. The Tbilisi of the Soviet era — the bookshops, the theatre, the full shelves — was visible from the Tbilisi of the 1990s across a distance that had no name yet.',
    choices: [
      {
        text: 'Your family adapted. The candles, the wood, the neighbours who shared. The adaptation was real.',
        tag: null,
        outcome: 'The adaptation is the competence that the next generation inherits without knowing how it was learned. You learned it the hard way.',
        effect: (p) => { p.w -= 8; p.h -= 5; p.e += 4; p.addFlag('geo_1990s_generation'); p.setMem('geo1990s', true); },
      },
      {
        text: 'You or someone in your family left. Turkey, Russia, Greece — wherever the border was open.',
        tag: null,
        outcome: 'One million Georgians left in the 1990s. The ones who left carried Georgia with them in a way that required the distance to understand.',
        effect: (p) => { p.w -= 5; p.m -= 8; p.r += 6; p.addFlag('geo_1990s_generation'); p.addFlag('emigrated'); p.setMem('geo1990s', true); },
      },
    ],
    effect: null,
  },

  // ── THE SUPRA ─────────────────────────────────────────────────────────────────

  {
    id: 'geo_supra_identity',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.age >= 13 && G.age <= 25 &&
      !G.mem?.geoSupra,
    text: 'The supra: a Georgian feast. Not a dinner — a feast. The tamada, the toast-master, leads the table through toasts that can go for three hours: to Georgia, to the dead, to the living, to friendship, to the future, to the past. To give a toast well is a form of literacy. Your father gives one that stops conversation and begins it again. You begin to understand that the supra is not about the food — it is about the obligation to be fully present to the people at the table, and the obligation to say true things in the form of a toast, and the obligation of hospitality, which in Georgian is the same word as victory.',
    choices: [
      {
        text: 'You learn to give a toast. The form teaches you something about what you believe.',
        tag: null,
        outcome: 'The first toast you give that makes people go quiet and then agree — that is the moment you know the form has entered you.',
        effect: (p) => { p.s += 5; p.m += 6; p.karma += 4; p.addFlag('geo_supra_keeper'); p.setMem('geoSupra', true); },
      },
      {
        text: 'You sit at the supra and watch. The world of the table is not yet yours to lead.',
        tag: null,
        outcome: 'Watching teaches you what the table requires before you are asked to provide it. The watching is not nothing.',
        effect: (p) => { p.e += 4; p.s += 3; p.addFlag('geo_supra_keeper'); p.setMem('geoSupra', true); },
      },
    ],
    effect: null,
  },

  // ── ORTHODOX IDENTITY ─────────────────────────────────────────────────────────

  {
    id: 'geo_orthodox_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.age >= 14 && G.age <= 28 &&
      !G.mem?.geoOrthodox,
    text: 'The Georgian Orthodox church survived the Soviet period by being what the Communist Party could not replace: the form of Georgian national continuity. Patriarch Ilia II has been Catholicos-Patriarch since 1977 and will remain so into his nineties. The cross of Saint Nino — a cross made of braided grapevines, woven together with the hair of the woman who brought Christianity to Georgia in the fourth century. This is the specific origin story: a woman, from Cappadocia, a vine, a cross. The church is not only religion. It is the argument that Georgia exists, has always existed, is not a Soviet category.',
    choices: [
      {
        text: 'The church is the spine of what you understand yourself to be Georgian to mean.',
        tag: null,
        outcome: 'The spine holds things together. What it makes difficult is also part of the inventory.',
        effect: (p) => { p.m += 5; p.s += 4; p.karma += 3; p.addFlag('geo_orthodox_backbone'); p.setMem('geoOrthodox', true); },
      },
      {
        text: 'You are Georgian but the church is not the form your Georgian-ness takes.',
        tag: null,
        outcome: 'The secular Georgian is still a category the church has opinions about. You navigate the opinions.',
        effect: (p) => { p.e += 5; p.r += 4; p.addFlag('geo_orthodox_backbone'); p.setMem('geoOrthodox', true); },
      },
    ],
    effect: null,
  },

  // ── SAAKASHVILI REFORMS ────────────────────────────────────────────────────────

  {
    id: 'geo_saakashvili_era',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 2004 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem?.geoSaaka,
    text: (G) => {
      const isLate = G.currentYear >= 2007
      return isLate
        ? 'The Saakashvili reform decade has two halves. The first: the traffic police replaced overnight, the customs corridors that everyone paid through dismantled in weeks, the World Bank ranking Georgia 8th for ease of doing business, Batumi rebuilt into something unrecognisable. The second: November 2007, the opposition demonstration dispersed with water cannon and tear gas, Rustavi 2 raided, the state of emergency. The same man who ended corruption used state power against dissent. This is the combination you have watched in the same decade.'
        : 'The traffic police are gone. Not reformed — gone. The men who had been stopping drivers for bribes since before you were born were dismissed on a Saturday, and on Monday there were new police in new uniforms, paid a real salary, with dashcams. The customs checkpoint where everyone who crossed the border paid — gone. The speed of it was disorienting. Corruption that had seemed like weather, like the permanent condition of the place, had turned out to be a policy choice that could be reversed in a week.'
    },
    choices: [
      {
        text: 'The reforms worked. The country moved. You saw it.',
        tag: null,
        outcome: 'What worked is real. The costs that came with it are also real. Both go into the accounting.',
        effect: (p) => { p.m += 6; p.e += 4; p.addFlag('geo_saakashvili_generation'); p.setMem('geoSaaka', true); },
      },
      {
        text: 'The reform was real but so was November 2007. You do not separate them.',
        tag: null,
        outcome: 'Not separating them is the accurate reading. The combination is the Saakashvili era.',
        effect: (p) => { p.e += 5; p.r += 4; p.addFlag('geo_saakashvili_generation'); p.setMem('geoSaaka', true); },
      },
    ],
    effect: null,
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'geo_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Georgia' &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      (G.flags.has('april_9_generation') || G.flags.has('rose_revolution_georgia') ||
       G.flags.has('georgian_war_2008') || G.flags.has('geo_1990s_generation')) &&
      !G.mem?.geoLate,
    text: (G) => {
      const seenApril9 = G.flags.has('april_9_generation')
      const seenWar = G.flags.has('georgian_war_2008')
      const seenRose = G.flags.has('rose_revolution_georgia')
      if (seenApril9 && seenWar) {
        return 'From Rustaveli Avenue in April 1989 to the Russian columns forty kilometres out in August 2008 — that is the span of things you have witnessed in this country\'s effort to be what it insists it is. Independence, war, warlords, candles, reforms, another war, the EU flag in the street. Georgia did not stop insisting. That is the accurate sentence about the country you have lived in.'
      }
      if (seenRose && seenWar) {
        return 'The Rose Revolution said one thing and August 2008 said another thing and both are the same Georgia. The country did not resolve into a single story. You have lived in the unresolved version, which is the only version that has ever existed.'
      }
      return 'The arc of the country in your lifetime: Soviet republic, massacre, independence, collapse, recovery, war, recovery again, protest, and now the same Rustaveli Avenue with the EU flag. Each generation inherits what the previous one didn\'t finish. You have passed something on. What it produces is still being determined.'
    },
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 4; p.addFlag('geo_testigo_generation'); p.setMem('geoLate', true); },
  },

]

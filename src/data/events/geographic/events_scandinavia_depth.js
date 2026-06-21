// events_scandinavia_depth.js — Nordic depth arc extension (6 events)
// Norway: November 1942 Jewish deportation (uncovered gap in events_norway.js)
// Finland: Continuation War 1941-44, Finlandization 1948-91, NATO 2023,
//          Swedish-speaking minority identity, postwar reconstruction
// Complements events_scandinavia.js, events_norway.js, events_sweden.js, events_denmark.js

const IS_NORWEGIAN = (G) => G.character.country?.name === 'Norway'
const IS_FINNISH = (G) => G.character.country?.name === 'Finland'

export const SCANDINAVIA_DEPTH_EVENTS = [

  // ─── NORWAY: NOVEMBER 1942 — JEWISH DEPORTATION ─────────────────────────

  {
    id: 'no_1942_deportation',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_NORWEGIAN(G) &&
      G.currentYear >= 1942 && G.currentYear <= 1945 &&
      G.age >= 14 &&
      !G.mem?.no1942Deportation,
    text: 'November 26, 1942. The SS *Donau* departs Oslo harbour with 532 Jewish prisoners — men, women, children — arrested in nationwide raids the night before. The arrests were carried out primarily by Norwegian police, acting under NS government orders. A total of 773 Norwegian Jews will be deported to Auschwitz and other camps during the occupation. Thirty-four will survive. The operation was German in design and Norwegian in execution. This is the sentence that will occupy Norway for decades: not only that the Germans did it, but that Norwegians did it. Some Norwegians hid families, warned them, helped them cross to Sweden. The majority neither helped nor informed. What you know of this, and what was said and not said about it in the years after, is part of how the country has had to understand itself.',
    choices: null,
    effect: (p) => { p.m -= 14; p.karma += 5; p.r += 8; p.addFlag('no_1942_witness'); p.setMem('no1942Deportation', true) },
  },

  // ─── FINLAND: THE CONTINUATION WAR ──────────────────────────────────────

  {
    id: 'fin_continuation_war',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_FINNISH(G) &&
      G.currentYear >= 1941 && G.currentYear <= 1945 &&
      G.age >= 16 &&
      !G.mem?.finContinuationWar,
    text: (G) => {
      const isMale = G.character.gender === 'male'
      if (isMale) {
        return 'June 1941. Finland enters the war on the eastern front, attacking the Soviet Union alongside Germany. The official framing: this is not alliance with Hitler, this is the continuation of the Winter War — recovering Karelia, defending Finnish territory from Soviet threat. By 1944 the military situation has reversed and Finland negotiates an armistice with Moscow before the German situation collapses. Finland is not occupied. Finland pays: 300 million US dollars in reparations, over six years, in goods rather than money. The reparations industrialise Finland in a generation. You served through the years the country calls *jatkosota*. What it was — a war of necessity, a war of opportunity, co-belligerency with the wrong side — is something Finnish historians will argue for decades. What you know is what the winters were like.'
      }
      return 'The men are gone again. The Continuation War runs from June 1941 to September 1944 — longer than the Winter War, in temperatures that are equally impossible, at a cost that will not be fully counted until it is over. The home front is what you know: the rationing, the letters from the front, the specific silence when a letter does not come. The armistice arrives and the reparations begin — Finland owes the Soviet Union 300 million US dollars in industrial goods. The factories that build the reparations transform Finland from an agricultural country to an industrial one in a decade. It is an accident of defeat. The transformation is real regardless.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 5; p.addFlag('fin_continuation_war_gen'); p.setMem('finContinuationWar', true) },
  },

  // ─── FINLAND: FINLANDIZATION ─────────────────────────────────────────────

  {
    id: 'fin_finlandization',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_FINNISH(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1989 &&
      G.age >= 25 &&
      !G.mem?.finFinlandization,
    text: 'The word *Finnlandisierung* — Finlandization — was coined by West Germans to describe the strategic accommodation a small country makes to survive next to a large one. Finland does not join NATO. Finland does not join the Warsaw Pact. Finland maintains careful relations with Moscow: censoring books that might offend the Kremlin, avoiding foreign policy positions the Soviet Union would object to, electing presidents partly on the basis of Moscow\'s assessment of their acceptability. President Kekkonen governs for twenty-five years partly because he is trusted in Moscow. The arrangement is not said aloud as such. It is practiced as the obvious thing, the thing that goes without saying, because what it prevents — the Hungarian scenario, the Czech scenario — is also obvious. You live in a country that is free in the ways it is permitted to be free, and the permission has a geographical address.',
    choices: [
      {
        text: 'The arrangement is the price of survival. You make the trade without liking it.',
        tag: null,
        outcome: 'Finland is not Hungary in 1956. Finland is not Czechoslovakia in 1968. The trade the arrangement represents is visible in those two examples and Finland is not them. You make the calculation and live with what the calculation costs.',
        effect: (p) => { p.m -= 6; p.r += 7; p.e += 3; p.addFlag('fin_finlandized_gen'); p.setMem('finFinlandization', true) },
      },
      {
        text: 'The self-censorship has become second nature — so natural it is no longer experienced as constraint.',
        tag: null,
        outcome: 'The successful accommodation looks, from the inside, like simply knowing how to live. The constraint has been absorbed so completely that the thing constrained is no longer missed, because the missing of it is also constrained.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('fin_finlandized_gen'); p.setMem('finFinlandization', true) },
      },
    ],
    effect: null,
  },

  // ─── FINLAND: NATO ACCESSION 2023 ───────────────────────────────────────

  {
    id: 'fin_nato_2023',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_FINNISH(G) &&
      G.currentYear >= 2023 &&
      G.age >= 55 &&
      !G.mem?.finNato2023,
    text: (G) => {
      const remembersFinnlandization = G.flags.has('fin_finlandized_gen')
      if (remembersFinnlandization) {
        return 'April 4, 2023. Finland joins NATO. Seventy-five years of military non-alignment end by vote of parliament: 188-8. The thing that structurally could not be said during the entire Cold War period — the thing whose saying was part of what Finlandization meant — has been said, voted on, and ratified. Russia\'s February 2022 invasion of Ukraine moved Finnish public support for NATO from 30% to 80% in weeks. You remember the 30%. You remember what the 30% was responding to, and what it feared to say directly, and what it cost to not say it. Watching the 188-8 vote is watching the cost of the previous period become legible.'
      }
      return 'April 4, 2023. Finland joins NATO. The application came within weeks of Russia\'s February 2022 invasion of Ukraine. Finland has now the longest NATO-Russia border in the alliance. The shift from the Cold War policy of military non-alignment to this took less than fourteen months. A policy that defined Finland for seventy-five years — the careful middle position, the trade for survival, the thing that became the world\'s word for a certain kind of accommodation — has ended with a vote. History sometimes turns faster than the concepts built to describe it.'
    },
    choices: null,
    effect: (p) => { p.m += 4; p.r += 5; p.e += 3; p.addFlag('fin_nato_generation'); p.setMem('finNato2023', true) },
  },

  // ─── FINLAND: SWEDISH-SPEAKING MINORITY ─────────────────────────────────

  {
    id: 'fin_swedish_speaker',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_FINNISH(G) &&
      G.character.ethnicity?.id === 'finlandssvenska' &&
      G.age >= 12 && G.age <= 20 &&
      !G.mem?.finSwedishSpeaker,
    text: 'You are among the five percent — the Swedish-speaking Finns, finlandssvenskar, the community that has been in Finland since the Middle Ages when the country was part of Sweden. Constitutionally bilingual, with Swedish as a protected language, with Swedish-medium schools and institutions. The constitution protects this. The majority doesn\'t always feel its protection as a natural thing. You navigate: Swedish at home, Finnish at the market and the schoolyard and in the wider country. The two languages in you are not in conflict — you speak both — but the question of which one you are is asked more often than you ask it of yourself. *Finlandssvensk* is the word you use. It is specific. It is not Swedish-Swedish, not Finnish-Finnish. It is its own thing, which is the thing you are.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 3; p.addFlag('fin_swedish_minority'); p.setMem('finSwedishSpeaker', true) },
  },

  // ─── FINLAND: POSTWAR RECONSTRUCTION — THE REPARATIONS GENERATION ────────

  {
    id: 'fin_reparations_industry',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_FINNISH(G) &&
      G.currentYear >= 1945 && G.currentYear <= 1960 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.finReparations,
    text: 'The reparations Finland owes to the Soviet Union — 300 million US dollars, to be paid in ships, machinery, and industrial goods over six years — are being paid by building things Finland did not previously build. The engineering and manufacturing base being created for the reparations will be the base of Finnish industry for the rest of the century. You work in it or near it. The country is converting from agriculture to industry at a pace that would have been impossible without the debt. This is the arithmetic of the peace: Finland owes something it doesn\'t have and builds it to pay what it owes, and what it builds changes what Finland is. The debt is discharged in 1952. What was built to pay it remains.',
    choices: null,
    effect: (p) => { p.w += 4; p.e += 3; p.m += 4; p.addFlag('fin_reconstruction_gen'); p.setMem('finReparations', true) },
  },

]

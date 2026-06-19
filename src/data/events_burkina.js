// events_burkina.js — Burkina Faso / Thomas Sankara arc

const IS_BURKINABE = (G) => G.character.country.name === 'Burkina Faso';

export const BURKINA_EVENTS = [

  // ── THE SANKARA ERA 1983–1987 ───────────────────────────────────────────────

  {
    id: 'bfa_vaccination_week',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => IS_BURKINABE(G) && G.currentYear === 1984 && G.age <= 5 && !G.mem?.bfa_vaccinated,
    text: 'Health workers come to every village in Burkina Faso this week. They have vaccinated 2.5 million children in eight days — measles, meningitis, yellow fever. Your arm hurts. The week feels organised in a way that ordinary life rarely is. It is the president\'s program.',
    effect: (p) => { p.h += 6; p.addFlag('burkina_vaccinated_child'); p.setMem('bfa_vaccinated', true); },
  },

  {
    id: 'bfa_upper_volta_renamed',
    phase: 'childhood',
    weight: 3,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 1984 && G.currentYear <= 1986 && G.age >= 6 && !G.mem?.bfa_renaming_noted,
    text: 'The country is no longer called Upper Volta. It is now Burkina Faso. The teacher writes it on the board: Burkina — land of upright people. Faso — fatherland, in Jula. You write it slowly in your exercise book, learning to spell yourself again.',
    effect: (p) => { p.e += 2; p.m += 3; p.addFlag('burkina_renaming_memory'); p.setMem('bfa_renaming_noted', true); },
  },

  {
    id: 'bfa_sankara_bicycle',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 1983 && G.currentYear <= 1987 && !G.mem?.sankara_bicycle_seen,
    text: 'The president of Burkina Faso cycles to work. You have heard this, and now you see it confirmed on a photograph at the health clinic: Thomas Sankara in his military uniform on a green bicycle, pedaling down a Ouagadougou street. He also eats the local food, wears Burkinabé cotton, and has sold the government fleet of Mercedes cars. You file this image carefully.',
    effect: (p) => { p.m += 5; p.e += 3; p.addFlag('sankara_generation'); p.setMem('sankara_bicycle_seen', true); },
  },

  // ── SANKARA'S ASSASSINATION 1987 ────────────────────────────────────────────

  {
    id: 'bfa_sankara_killed',
    phase: 'adolescence',
    weight: 5,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 1987 && G.currentYear <= 1989 && G.flags.has('sankara_generation') && !G.mem?.bfa_sankara_death_processed,
    text: 'October 15, 1987. The gunfire at the CNR headquarters lasts less than a minute. Sankara and twelve colleagues are dead. The soldiers who did it work for Blaise Compaoré — Sankara\'s friend and comrade and brother-in-arms. The announcement calls it a rectification of the revolution. The word for what was taken away takes longer to arrive.',
    choices: [
      {
        text: 'Remember every detail of where you were that day.',
        tag: 'Memorize',
        outcome: 'The exact quality of the afternoon light. The radio cutting to static. You carry this detail for the rest of your life.',
        effect: (p) => { p.m -= 15; p.addFlag('sankara_mourner'); p.setMem('bfa_sankara_death_processed', true); },
      },
      {
        text: 'Feel the fear of what comes next.',
        tag: 'Fear',
        outcome: 'Someone who kills his closest friend will have no patience for those who disagree with him. You go quiet.',
        effect: (p) => { p.m -= 12; p.addFlag('learned_silence'); p.setMem('bfa_sankara_death_processed', true); },
      },
    ],
  },

  // ── COMPAORÉ'S 27-YEAR REGIME ───────────────────────────────────────────────

  {
    id: 'bfa_compaore_silence',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 1990 && G.currentYear <= 2013 && G.flags.has('sankara_generation') && !G.mem?.compaore_silence_navigated,
    text: 'Sankara\'s name does not appear in government documents. His photograph is not displayed in public buildings. The anniversary of his death passes without official acknowledgment. You know people who speak of him only in private, with the door closed. You must decide how you carry this.',
    choices: [
      {
        text: 'Keep the memory alive among those you trust.',
        tag: 'Remember',
        outcome: 'You become someone who names the thing that cannot be named publicly. It is a small resistance. It is not nothing.',
        effect: (p) => { p.addFlag('compaore_27_years'); p.addFlag('political_active'); p.m -= 3; p.setMem('compaore_silence_navigated', true); },
      },
      {
        text: 'Adapt. You have a family to protect.',
        tag: 'Adapt',
        outcome: 'You do what most people do. You survive the present and hope the country will eventually name what happened.',
        effect: (p) => { p.addFlag('compaore_27_years'); p.m -= 5; p.setMem('compaore_silence_navigated', true); },
      },
    ],
  },

  // ── THE 2014 UPRISING ───────────────────────────────────────────────────────

  {
    id: 'bfa_uprising_2014',
    phase: 'midlife',
    weight: 4,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 2014 && G.currentYear <= 2015 && !G.mem?.bfa_2014_noted,
    text: 'October 28, 2014. Compaoré has announced a constitutional change to extend his rule. By noon, thousands are in the streets. By three in the afternoon, the parliament building is on fire. You can see the smoke from where you are. Within twenty-four hours, Compaoré is in Ivory Coast. For the first time in your life, the people have removed a head of state and it has worked.',
    choices: [
      {
        text: 'Go into the streets.',
        tag: 'Join',
        outcome: 'You are there when the smoke rises. Whatever comes next, you were part of the day it happened.',
        effect: (p) => { p.m += 12; p.addFlag('burkina_2014_uprising'); p.addFlag('activist'); p.setMem('bfa_2014_noted', true); },
      },
      {
        text: 'Watch from a distance, uncertain what follows.',
        tag: 'Watch',
        outcome: 'The smoke is real. The chanting is real. You feel the city change and cannot be certain whether it is hope or something more complicated.',
        effect: (p) => { p.m += 6; p.addFlag('burkina_2014_uprising'); p.setMem('bfa_2014_noted', true); },
      },
    ],
  },

  // ── SAHEL JIHADIST VIOLENCE 2019–2025 ───────────────────────────────────────

  {
    id: 'bfa_sahel_violence',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_BURKINABE(G) && G.currentYear >= 2019 && G.currentYear <= 2026 && !G.mem?.bfa_sahel_noted,
    text: 'The attacks began in the north and east. Now they are reaching villages that believed themselves safe. Groups linked to Al-Qaeda and the Islamic State move through the Sahel and Burkina Faso has no army that can stop them. Schools are shuttered. Aid convoys cannot pass. Two million people have been displaced. The country that burned its parliament for democracy is now in a crisis that democracy cannot obviously solve.',
    choices: [
      {
        text: 'Your family is in an affected zone. You leave.',
        tag: 'Flee',
        outcome: 'You pack what you can carry. You do not know if you will return. You join the two million.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('burkina_sahel_displaced'); p.setMem('bfa_sahel_noted', true); },
      },
      {
        text: 'Stay and watch what happens.',
        tag: 'Stay',
        outcome: 'The violence is not everywhere, not yet. You keep one eye on the exits and try to go on.',
        effect: (p) => { p.m -= 10; p.setMem('bfa_sahel_noted', true); },
      },
    ],
  },

  // ── LATE RECKONING ──────────────────────────────────────────────────────────

  {
    id: 'bfa_sankara_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) => IS_BURKINABE(G) && G.flags.has('sankara_generation') && G.currentYear >= 2007 && !G.mem?.bfa_sankara_reckoning,
    text: 'Thomas Sankara would be in his sixties now. You calculate his age sometimes without meaning to. The country eventually named a boulevard after him — a boulevard, for a man who outlawed chauffeured cars. His body was exhumed in 2015 to confirm his identity by DNA. The grave had been unmarked for twenty-eight years. You have lived long enough to watch mythology form around someone you actually saw.',
    effect: (p) => { p.m -= 5; p.e += 3; p.r += 3; p.setMem('bfa_sankara_reckoning', true); },
  },

];

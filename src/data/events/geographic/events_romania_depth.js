// events_romania_depth.js
// Romania depth arc — texture not in events_romania.js.
// events_romania.js covers: Securitate childhood, Decree 779 abortion ban,
// December 1989 revolution, 1990s transition, EU emigration wave 2007+.
// This file: Ceaușescu systematization/Casa Poporului, Timișoara December
// 1989 (the start of the revolution), orphanage children (Decree 770
// consequences), Mineriad June 1990, Securitate file discovery, Italian
// emigration depth, Transylvanian Hungarian minority texture.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const ROMANIA_DEPTH_EVENTS = [

  // ── SYSTEMATIZATION / CASA POPORULUI ─────────────────────────────────────

  {
    id: 'rom_dep_systematization',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1977 && G.currentYear <= 1989 &&
      G.age >= 18 &&
      !G.mem?.romDepSystem,
    text: pick([
      'Ceaușescu announces the systematization programme — the demolition of villages and historic urban neighbourhoods to be replaced with socialist bloc apartments. In Bucharest: a fifth of the old city is demolished. The Văcărești monastery, the Brâncovenesc Hospital, the Uranus quarter, the Jewish neighbourhood of Văcărești. 40,000 buildings cleared in the capital alone. Where they were: the Boulevard of the Victory of Socialism and at its end the Casa Poporului — the House of the People — the second largest administrative building in the world by floor area, after the Pentagon, with 1,100 rooms, 20,000 workers, and 480 chandeliers. It is built on a hill created by demolishing the hill that was there before.',
      'You are moved. The apartment the state provides is smaller than the house the state demolished. The address on your documents changes. The street that was your street no longer has the buildings that made it the street you knew. The neighbourhood is still there on old maps. On the new maps it is the Boulevard of the Victory of Socialism.',
    ]),
    choices: [
      {
        text: 'You lose your home in the demolitions',
        tag: null,
        outcome: 'The compensation is administrative — the apartment assigned is a fact about where you live, not a value exchange for what was taken. The building you grew up in becomes rubble and then boulevard.',
        effect: (p) => {
          p.m -= 12
          p.r += 7
          p.w -= 4
          p.addFlag('rom_systematization_displaced')
          p.setMem('romDepSystem', true)
        },
      },
      {
        text: 'You watch the neighbourhood change from outside it',
        tag: null,
        outcome: 'The city you knew is being revised by decree. You walk the new boulevard and understand that the state\'s relationship to the past is not to preserve it but to replace it.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.e += 3
          p.addFlag('rom_systematization_displaced')
          p.setMem('romDepSystem', true)
        },
      },
    ],
    effect: null,
  },

  // ── TIMIȘOARA DECEMBER 1989 ───────────────────────────────────────────────

  {
    id: 'rom_dep_timisoara_1989',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1989 && G.currentYear <= 1990 &&
      G.age >= 16 &&
      !G.mem?.romDepTimisoara,
    text: 'December 16, 1989. The Securitate comes to arrest László Tőkés, a Hungarian Reformed pastor in Timișoara who has been speaking against the regime. His congregation forms a human chain around the parsonage. The chain grows. By nightfall there are thousands in the street. The Securitate opens fire. On December 17, 60 people are dead in Timișoara. Ceaușescu is in Iran on a state visit. He returns, calls a mass rally in Bucharest on December 21 to demonstrate support. The crowd, assembled by the party, begins to boo him mid-speech. Live on state television, Ceaușescu freezes. The image goes around the country. The freeze is the end of the regime.',
    choices: [
      {
        text: 'You are in Timișoara',
        tag: null,
        outcome: 'The city where the revolution starts is the city you are in. The days between the 16th and the 25th — Ceaușescu\'s execution on Christmas Day — are the days that end the regime. You are inside them.',
        effect: (p) => {
          p.m -= 8
          p.karma += 8
          p.r += 6
          p.addFlag('rom_timisoara_generation')
          p.setMem('romDepTimisoara', true)
        },
      },
      {
        text: 'You are in Bucharest, watching the state television moment',
        tag: null,
        outcome: 'The image of Ceaușescu freezing on the balcony, the sound of the crowd changing — it broadcasts live and then the signal cuts. By Christmas Day he is dead. You watched the beginning of the end in real time on the television that had spent decades broadcasting the regime.',
        effect: (p) => {
          p.m -= 5
          p.karma += 5
          p.r += 5
          p.addFlag('rom_timisoara_generation')
          p.setMem('romDepTimisoara', true)
        },
      },
    ],
    effect: null,
  },

  // ── ORPHANAGE CHILDREN ────────────────────────────────────────────────────

  {
    id: 'rom_dep_orphan_generation',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1966 && G.currentYear <= 1990 &&
      G.age >= 4 && G.age <= 14 &&
      !G.mem?.romDepOrphan,
    text: 'Decree 770 banned abortion in 1966. The generation born to women who could not prevent the pregnancy and could not keep the child fills the state orphanages: 170,000 children in 1990, when the Western cameras finally arrive. You are one of them, or you know someone who is, which in Romania is the same. The institution has a specific logic: minimum care, maximum control. The children learn what they need to learn to survive in an institution that does not think of them as individuals — to fade, to wait, to need very little.',
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.h -= 5
      p.e -= 3
      p.r += 6
      p.addFlag('rom_decree_generation')
      p.setMem('romDepOrphan', true)
    },
  },

  // ── MINERIAD JUNE 1990 ────────────────────────────────────────────────────

  {
    id: 'rom_dep_mineriad_1990',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1990 && G.currentYear <= 1992 &&
      G.age >= 16 &&
      !G.mem?.romDepMineriad,
    text: 'June 1990. Six months after the revolution. Protesters in University Square in Bucharest have been camping for weeks, calling for former communists to be excluded from government — the FSN (National Salvation Front) is led by Ion Iliescu, who was a communist official. Iliescu calls the protesters "fascists" and "gangsters" and summons miners from the Jiu Valley coalfields. The miners arrive on June 13-15 and beat protesters, students, and bystanders with clubs and chains. The police stand back. At least six people die, hundreds are wounded. The new democracy has used the old method.',
    choices: [
      {
        text: 'You were in University Square',
        tag: null,
        outcome: 'You were beaten or you ran or you watched from a doorway. The new Romania has used the miners as the old Romania used the Securitate. The method changes more slowly than the rhetoric.',
        effect: (p) => {
          p.m -= 10
          p.h -= 4
          p.karma += 6
          p.r += 7
          p.addFlag('rom_mineriad_generation')
          p.setMem('romDepMineriad', true)
        },
      },
      {
        text: 'You watch from outside — you do not understand yet what it means',
        tag: null,
        outcome: 'The understanding comes later: that the revolution cleared the Ceaușescus but did not clear the system the Ceaușescus had used. The system adapted.',
        effect: (p) => {
          p.m -= 6
          p.r += 5
          p.e += 3
          p.addFlag('rom_mineriad_generation')
          p.setMem('romDepMineriad', true)
        },
      },
    ],
    effect: null,
  },

  // ── SECURITATE FILE DISCOVERY ─────────────────────────────────────────────

  {
    id: 'rom_dep_securitate_file',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1999 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      G.flags.has('securitate_generation') &&
      !G.mem?.romDepFile,
    text: 'The CNSAS — the National Council for the Study of the Securitate Archives — opens after 1999. You can now apply to see your file. The file exists: a record of what the Securitate knew about you, and how it knew it, and who told it. You wait two years for the application to be processed. The file arrives. In it: reports from people you knew. You recognise the handwriting on one report. You know whose handwriting it is.',
    choices: [
      {
        text: 'You confront the informer',
        tag: null,
        outcome: 'The conversation is nothing like what you rehearsed. The informer has a version of events in which what they did was understandable. The versions do not reconcile. The relationship does not survive.',
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.karma += 4
          p.addFlag('rom_file_opened')
          p.setMem('romDepFile', true)
        },
      },
      {
        text: 'You close the file and do not say who it was',
        tag: null,
        outcome: 'The file is in a drawer. The knowledge is in you. You see the person whose handwriting it was at family gatherings, at funerals, at the occasions that do not stop occurring. The knowledge is in you at each of them.',
        effect: (p) => {
          p.m -= 10
          p.r += 10
          p.addFlag('rom_file_opened')
          p.setMem('romDepFile', true)
        },
      },
    ],
    effect: null,
  },

  // ── ROMANIAN EMIGRATION TO ITALY ─────────────────────────────────────────

  {
    id: 'rom_dep_italy_emigration',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 2002 && G.currentYear <= 2015 &&
      G.age >= 20 && G.age <= 50 &&
      !G.mem?.romDepItaly,
    text: 'Italy before EU accession: you need a visa, which you can get for work, which means knowing someone who knows someone. After 2007: the border is open. By 2010 there are one million Romanians in Italy. You know the route: the bus from Bucharest that takes twenty-six hours, the arrival in Rome or Turin or Milan, the specific neighbourhood — Pigneto, Piazza Vittorio — where Romanians gather, the Catholic church that holds Romanian-language mass on Sunday. You send money home. The exchange rate works in your favour. The money arrives and your family\'s situation changes. Your own situation is the building site, the domestic care shift, the restaurant kitchen at midnight.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.w += 3
      p.r += 5
      p.addFlag('rom_italian_emigrant')
      p.addFlag('emigrated')
      p.setMem('romDepItaly', true)
    },
  },

  // ── TRANSYLVANIAN HUNGARIAN MINORITY ─────────────────────────────────────

  {
    id: 'rom_dep_hungarian_minority',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.romDepHungarian,
    text: 'There are 1.2 million ethnic Hungarians in Romania — in Transylvania, which was part of Hungary until 1920, which has cities where the majority language on the street is Hungarian, where the church is Hungarian Reformed or Hungarian Catholic, where the schools once taught in Hungarian and then were required to add Romanian and then were restructured. You are Hungarian Romanian or you live alongside this community. The question of whether you are Romanian who happens to speak Hungarian or Hungarian who happens to live in Romania is a question the state has answered differently in different decades, and your answer has not always matched the state\'s.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 4
      p.addFlag('rom_hungarian_minority')
      p.setMem('romDepHungarian', true)
    },
  },

  // ── CASA POPORULUI RECKONING ──────────────────────────────────────────────

  {
    id: 'rom_dep_casa_poporului_now',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Romania' &&
      G.currentYear >= 1990 &&
      G.age >= 40 &&
      !G.mem?.romDepCasaNow,
    text: 'The Casa Poporului is now called the Palace of the Parliament. The Romanian parliament meets in it. It was never finished when Ceaușescu was shot — there are entire wings that have never been used. The building required 700,000 tonnes of steel, 1 million cubic metres of marble, 3,500 tonnes of crystal. It bankrupted the country\'s construction budget and diverted cement and steel from housing while people in Bucharest had cold apartments and empty shelves. It is now a tourist attraction. You can buy a ticket to walk through the 1,100 rooms. The guide does not mention the neighbourhood that was demolished to build the hill the palace stands on.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('romDepCasaNow', true)
    },
  },

]

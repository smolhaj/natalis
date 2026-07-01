// events_followthrough_80.js — Poland depth arc follow-throughs

export const FOLLOWTHROUGH_80_EVENTS = [

  // ── katyn_family_loss ─────────────────────────────────────────────────────

  {
    id: 'ft80_katyn_family_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('katyn_family_loss') &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      !G.mem?.ft80KatynLate,
    text: 'The Katyń Memorial Cemetery opens near Smolensk in 2000. You can go, or you can know it exists and not go. The grave is specific — the Polish officers\' graves are arranged in rows, the name and rank on each. The name that was spoken carefully in your family is in one of the rows. The acknowledgment is fifty years late, the grave is four hundred kilometres from where the family is, and the name is confirmed as being where it was always suspected to be.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft80KatynLate', true)
    },
  },

  {
    id: 'ft80_katyn_smolensk_connection',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('katyn_family_loss') &&
      G.flags.has('smolensk_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 35 &&
      !G.mem?.ft80KatynSmolensk,
    text: 'April 2010: the plane carrying the Polish delegation to the Katyń anniversary commemoration crashes near Smolensk. The first deaths were in 1940. The second deaths are in 2010. For families like yours, the word Katyń now contains two catastrophes. The anniversary of the first massacre has produced the second. Whether this is coincidence or something more shapes how the event is received in your family differently from how it is received in families without the first wound.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m -= 5
      p.setMem('ft80KatynSmolensk', true)
    },
  },

  // ── warsaw_uprising_veteran ───────────────────────────────────────────────

  {
    id: 'ft80_uprising_veteran_forbidden',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('warsaw_uprising_veteran') &&
      G.currentYear >= 1950 && G.currentYear <= 1980 &&
      G.age >= 30 &&
      !G.mem?.ft80UprisingVet,
    text: 'The Armia Krajowa is classified as a reactionary, pro-fascist organization under the communist government. Your service in it is a liability. You do not put it on your work history. You do not discuss it with your children in the presence of other people. At the anniversary ceremonies the regime celebrates its own forces — the Armia Ludowa, the People\'s Army — which was a fraction of the AK\'s size. You were there for sixty-three days and you do not officially exist as someone who was there.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.addFlag('ak_veteran_silenced')
      p.setMem('ft80UprisingVet', true)
    },
  },

  {
    id: 'ft80_uprising_veteran_1989',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('warsaw_uprising_veteran') &&
      G.currentYear >= 1989 &&
      G.age >= 60 &&
      !G.mem?.ft80UprisingVet89,
    text: 'After 1989, the AK veterans can be veterans again. The state rehabilitation is official. The medals can be worn. The marches can happen. You are in your sixties or seventies. You have spent decades unable to say officially what you did. The official saying is now permitted. It is gratifying and also slightly too late and also still something — the actual acknowledgment, after so long, that you were on the right side of what you did.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r += 5
      p.karma += 4
      p.setMem('ft80UprisingVet89', true)
    },
  },

  // ── warsaw_uprising_generation ────────────────────────────────────────────

  {
    id: 'ft80_uprising_museum_2004',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('warsaw_uprising_generation') &&
      G.currentYear >= 2004 &&
      G.age >= 30 &&
      !G.mem?.ft80UprisingMuseum,
    text: 'The Warsaw Uprising Museum opens on August 1, 2004 — the sixtieth anniversary. The building, the exhibition, the names. The museum makes visible what was carried in private for sixty years. You walk through it and find things you recognize from what the adults said. Some of the things you recognize because you were there. The museum is simultaneously the thing that was needed for sixty years and a specific artifact of the moment when it finally became possible to build it.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 2
      p.e += 3
      p.setMem('ft80UprisingMuseum', true)
    },
  },

  // ── kresy_family ──────────────────────────────────────────────────────────

  {
    id: 'ft80_kresy_name',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('kresy_family') &&
      G.currentYear >= 1960 &&
      G.age >= 25 &&
      !G.mem?.ft80KresyName,
    text: 'Your parents call the city by its Polish name. On maps and in current atlases it appears under a different name in a different country. You have grown up between the name your parents use and the name the world uses, which is also the gap between the country your parents remember and the country that exists. When you visit — if you visit — the streets are there but the names on the street signs are different and the people on the street speak a different language from the one your family spoke on those streets.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft80KresyName', true)
    },
  },

  {
    id: 'ft80_kresy_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('kresy_family') &&
      G.currentYear >= 1991 &&
      G.age >= 55 &&
      !G.mem?.ft80KresyLate,
    text: 'After 1991, Ukraine is independent and the border is real in a different way. You can go to the city your parents described. Some people from kresy families do go. They find the buildings still standing, the street layout recognizable, the churches converted to other uses. The Polish community is mostly gone. You are walking through the material record of a world that ended. The record is accurate and the world is gone.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.setMem('ft80KresyLate', true)
    },
  },

  // ── jedwabne_reckoning ────────────────────────────────────────────────────

  {
    id: 'ft80_jedwabne_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('jedwabne_reckoning') &&
      G.currentYear >= 2015 &&
      G.age >= 55 &&
      !G.mem?.ft80JedwabneLate,
    text: 'The 2018 Polish law making it a criminal offence to accuse the Polish state or Polish people of complicity in Holocaust crimes: signed, then amended under international pressure, then its criminal penalties removed. The law arrives seventeen years after the Jedwabne acknowledgment. The direction of travel is clear. You have held a position about what happened in Jedwabne since 2001 and the political climate around that position has changed significantly in the intervening years. Your position has not changed. The climate has.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft80JedwabneLate', true)
    },
  },

  // ── pis_opposition / pis_support ─────────────────────────────────────────

  {
    id: 'ft80_pis_opposition_2023',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('pis_opposition') &&
      G.currentYear >= 2023 &&
      G.age >= 30 &&
      !G.mem?.ft80PisOpp23,
    text: 'October 2023. The Tusk coalition defeats PiS after eight years in government. The coalition wins more seats. PiS wins more votes. The constitution and the courts and the independent institutions are now the subject of a years-long argument about how to restore them without using the same methods the other side used. The restoration is harder than the dismantling. You follow it with the specific attention of someone who watched the dismantling and was told they were being alarmist.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 4
      p.setMem('ft80PisOpp23', true)
    },
  },

  {
    id: 'ft80_pis_support_loss',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('pis_support') &&
      G.currentYear >= 2023 &&
      G.age >= 30 &&
      !G.mem?.ft80PisSupportLoss,
    text: 'PiS loses the 2023 election despite winning the most votes. The coalition of parties that together have more seats forms a government under Tusk. The 500+ program continues. The Constitutional Tribunal is unchanged. The cultural war pauses but does not end. You have specific feelings about the result and where things go from here that are different from what your urban acquaintances feel about the same result.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 5
      p.setMem('ft80PisSupportLoss', true)
    },
  },

  // ── poland_uk_emigrant ────────────────────────────────────────────────────

  {
    id: 'ft80_uk_brexit',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('poland_uk_emigrant') &&
      G.currentYear >= 2016 &&
      G.age >= 25 &&
      !G.mem?.ft80UKBrexit,
    text: 'June 24, 2016. The Brexit result. You have been in the UK long enough that your life is here. You are a citizen or you have lived here long enough that the Settled Status application is available to you. You apply for Settled Status. The application is approved. The status is a category that did not exist when you arrived. You are now a different kind of European in Britain than you were when you arrived.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
      p.setMem('ft80UKBrexit', true)
    },
  },

  // ── poland_returned_emigrant ──────────────────────────────────────────────

  {
    id: 'ft80_poland_return_adjustment',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('poland_returned_emigrant') &&
      G.currentYear >= 2016 &&
      G.age >= 28 &&
      !G.mem?.ft80PolandReturn,
    text: 'The return. The savings are real and the English is real and the comparative perspective on how other countries do certain things is real. The Poland you return to has changed politically and economically since you left. You have changed. The combination produces a person who is Polish in ways that are specific and also has a distance from the place that only leaving and returning produces. You are inside and slightly outside simultaneously. This is its own position.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.m += 2
      p.setMem('ft80PolandReturn', true)
    },
  },

]

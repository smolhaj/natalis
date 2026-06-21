// events_nicaragua.js — Nicaragua arc (8 events)
// Covers: Somoza dynasty, 1979 Sandinista Revolution, Literacy Crusade,
// Contra war (supplements ca_contra_witness), 1990 election surprise,
// Ortega's return, 2018 uprising, late reckoning

const IS_NICARAGUAN = (G) => G.character.country?.name === 'Nicaragua'

export const NICARAGUA_EVENTS = [

  // ─── SOMOZA DYNASTY CHILDHOOD ─────────────────────────────────────────────────

  {
    id: 'nic_somoza_dynasty',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear >= 1936 && G.currentYear <= 1978 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.nicSomoza,
    text: 'The Somoza family has governed Nicaragua for most of the living memory of anyone you know. There have been three of them: Anastasio the father who murdered Sandino in 1934, Luis the son, and now Anastasio the grandson — Tachito, they call him — who flies in his own plane and keeps a pet tiger and is reported to be one of the richest men in Central America. The National Guard is his family business. The Guard does not answer to the state; it answers to the Somozas. You have grown up knowing this distinction, which is the first political lesson this country teaches.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.m -= 4; p.addFlag('nic_somoza_generation'); p.setMem('nicSomoza', true) },
  },

  // ─── THE REVOLUTION: JULY 19, 1979 ──────────────────────────────────────────

  {
    id: 'nic_revolution_1979',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear === 1979 &&
      G.age >= 14 &&
      !G.mem?.nicRevolution,
    text: 'On July 17, Somoza flees to Miami. Two days later the Sandinista columns enter Managua and the crowds come out of the houses and the streets fill. You are in it or you are watching from a doorway. The National Guard, the institution that sustained forty-three years of the dynasty, dissolves in hours. The people who had the guns yesterday do not have them today. You know that what is ending is not just a government — you have never known a government that was not a Somoza — and you do not yet know what comes next, but the not-yet of it has a specific texture, which is the texture of the morning after a long night.',
    choices: null,
    effect: (p) => { p.m += 12; p.r -= 5; p.e += 4; p.addFlag('nic_revolution_generation'); p.setMem('nicRevolution', true) },
  },

  // ─── LITERACY CRUSADE 1980 ────────────────────────────────────────────────────

  {
    id: 'nic_literacy_crusade',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear === 1980 &&
      G.age >= 14 && G.age <= 35 &&
      !G.mem?.nicLiteracy,
    text: (G) => {
      const wasTeacher = G.age >= 18
      return wasTeacher
        ? 'The Crusade sends you to the countryside for five months with a kerosene lamp and a primer. You are assigned a family. You go every evening after the harvest work is done and you teach reading by lamplight. By the end you can tell, watching someone hold a page, exactly what they are encountering. The literacy rate goes from 50 percent to 87 percent in one year. This is what happens when a million people agree to teach a million other people at the same time.'
        : 'The young people who go to the mountains come back changed. They went to teach reading and they learned something about the country that was harder to teach. You are too young to go yourself. You watch them return and you understand that they left and came back different, and that the country they came back to is different than the one that sent them.'
    },
    choices: null,
    effect: (p) => { p.m += 8; p.e += 6; p.karma += 5; p.addFlag('nic_literacy_generation'); p.setMem('nicLiteracy', true) },
  },

  // ─── 1990 ELECTION: THE SHOCK ────────────────────────────────────────────────

  {
    id: 'nic_election_1990',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear === 1990 &&
      G.age >= 18 &&
      !G.mem?.nicElection1990,
    text: 'The election is scheduled and held and the results come in and Ortega has lost. Violeta Chamorro has won with 55 percent. The Sandinistas — who had held power for eleven years and fought a decade of Contra war and buried thousands of their people and built a revolution — have lost a free election and accepted the result. The concession is real. You are watching something unusual: a revolutionary movement choosing democratic accountability over continuance. Ortega speaks on television and looks like a man who has lost. The country is going to have a different government. You do not know yet what to do with what you feel about this.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 6; p.e += 4; p.addFlag('nic_election_1990_shock'); p.setMem('nicElection1990', true) },
  },

  // ─── ORTEGA'S RETURN 2007+ ────────────────────────────────────────────────────

  {
    id: 'nic_ortega_returns',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear >= 2007 && G.currentYear <= 2012 &&
      G.age >= 30 &&
      G.flags.has('nic_revolution_generation') &&
      !G.mem?.nicOrtegaReturn,
    text: 'Ortega won the 2006 election and came back. He came back with the red and black of the old FSLN, but also with the Catholic Church — his wife Rosario Murillo runs the communications apparatus and has covered the roundabouts of Managua in metal trees painted in primary colours and in the language of faith. You believed in what 1979 meant. Whether this is that thing continued, or something that has taken its name, is a question you find yourself unable to answer simply. The president is the same man. The country around him is different. You are different. Whether the revolution is the same thing it was is a question you are inside rather than outside of.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 7; p.e += 2; p.addFlag('nic_ortega_return'); p.setMem('nicOrtegaReturn', true) },
  },

  // ─── APRIL 2018 UPRISING ─────────────────────────────────────────────────────

  {
    id: 'nic_uprising_2018',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear === 2018 &&
      G.age >= 18 &&
      !G.mem?.nicUprising2018,
    text: 'It starts in April with a social security reform that cuts pensions and raises employer contributions. University students protest. The government sends the police and the paramilitary groups — the tranques go up across the country, roadblocks of paving stones. Three hundred and twenty-eight people are killed over the following months, according to the Inter-American Commission on Human Rights. Thousands are arrested. You have seen photographs of the students with morteros — homemade mortars made from PVC pipe — holding roundabouts against police in riot gear. The country that came out of 1979 is shooting students in the street. Whether you can hold both of these facts in the same hand at the same time is something you are working out.',
    choices: [
      {
        text: 'Join the protests',
        tag: 'Protest',
        outcome: 'You are in the street with everyone who is still out. The morteros are not weapons — they are gestures. You are making the gesture.',
        effect: (p) => { p.m -= 8; p.r += 8; p.karma += 6; p.addFlag('nic_2018_witness'); p.addFlag('nic_protest_participant') },
      },
      {
        text: 'Stay home and watch it unfold',
        tag: 'Witness',
        outcome: 'You watch through the window and on the phone and when the shooting starts you understand that watching is also a choice, and that the person who chose it will live with what was chosen.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('nic_2018_witness') },
      },
    ],
    effect: null,
  },

  // ─── EXILE WAVE POST-2018 ─────────────────────────────────────────────────────

  {
    id: 'nic_exile_wave',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2024 &&
      G.age >= 22 &&
      G.flags.has('nic_2018_witness') &&
      !G.mem?.nicExileWave,
    text: 'The people who were most visible in April are the first to go. Then the journalists. Then the lawyers who defended the arrested. Then some of the bishops. The government strips citizenship from critics abroad — calling them traitors, cancelling their passports. By 2023 more than 700 political prisoners have been released only by being expelled to the United States. The exile community in Costa Rica and the United States grows into the tens of thousands. You are still here, or you have left. If you have left you know exactly what the leaving cost. If you are still here you know exactly what the staying costs.',
    choices: null,
    effect: (p) => { p.r += 9; p.m -= 8; p.addFlag('nic_nicaraguan_exile'); p.setMem('nicExileWave', true) },
  },

  // ─── LATE RECKONING ───────────────────────────────────────────────────────────

  {
    id: 'nic_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_NICARAGUAN(G) &&
      G.age >= 58 &&
      !G.mem?.nicLateReckoning,
    text: 'You have lived through Somoza and the revolution and the Contra war and the election that the revolution lost and the reconstruction years and Ortega\'s return and 2018. If you have been paying attention — and you have been paying attention — you know that the country\'s history is a history of cycles: the dynasty, the uprising, the revolution, the counter-revolution, the democratic interlude, the concentration of power. What you believed in at different ages has aged differently. The literacy of 1980 — the five months in the mountains, the lamp, the page — that part you still believe in the same way. The rest requires more careful accounting.',
    choices: null,
    effect: (p) => { p.r += 5; p.m += 4; p.karma += 3; p.e += 2; p.setMem('nicLateReckoning', true) },
  },

]

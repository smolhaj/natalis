// Tunisia character events
// Historical arcs: Bourguiba's modernisation and Code of Personal Status 1956,
// Ben Ali's police state 1987–2011 (controlled bread + silence),
// Mohamed Bouazizi self-immolation December 17 2010 → Jasmine Revolution January 14 2011,
// 2014 constitution (most progressive in Arab world), Nobel Peace Prize 2015,
// Saied's constitutional coup 2021 and democratic backslide.
// Tunisia is the only Arab Spring country that completed a democratic transition,
// and the only Arab country to do so — until 2021.

export const TUNISIA_EVENTS = [

  {
    id: 'tun_code_personal_status',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.character.gender === 'female' &&
      G.age >= 10 && G.age <= 16 &&
      !G.mem.tunCPS,
    text: 'The Code of Personal Status — promulgated by Bourguiba in 1956, one year after independence. It abolished polygamy, required consent for marriage, gave women the right to divorce. Tunisia is the only Arab country where this code exists. You learn this in school as a fact about your country. Later you will understand what it means that it is a fact about only your country.',
    choices: null,
    effect: (p) => { p.e += 4; p.addFlag('tunisian_womens_rights_generation'); p.setMem('tunCPS', true) },
  },

  {
    id: 'tun_ben_ali_state',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem.tunBenAli,
    text: 'Ben Ali has ruled since 1987, and the deal is clear: cheap bread, working universities, a functioning civil service, and no politics except as theatre. The party controls everything; the political police know which conversations happened in which café; dissidents are in prison or abroad. The country is stable the way something under pressure is stable.',
    choices: [
      {
        text: 'You learn the art of living in the permitted spaces.',
        tag: null,
        outcome: 'You become expert at the life that exists between what is forbidden and what is required. Most people here have this expertise. You add yours to the general supply.',
        effect: (p) => { p.m -= 7; p.r += 5; p.addFlag('tunisian_ben_ali_generation'); p.setMem('tunBenAli', true) },
      },
      {
        text: 'You have contact with dissident ideas — through a relative, a text, a friend who has been abroad.',
        tag: null,
        outcome: 'The ideas arrive with a risk attached. You know who you can discuss them with. The list is short.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('tunisian_ben_ali_generation'); p.addFlag('regime_self_censorship'); p.setMem('tunBenAli', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tun_bouazizi_revolution_2011',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.currentYear === 2011 &&
      G.age >= 14 &&
      !G.mem.tunRevolution,
    text: 'December 2010. In Sidi Bouzid an inspector takes a fruit seller\'s cart and slaps him, and he sets himself on fire outside the governor\'s office, and dies eighteen days later. The protests reach Tunis. Twenty-eight days after the fire, Ben Ali and his family are on a plane to Saudi Arabia after twenty-three years. Egypt, Libya, Syria, Yemen and Bahrain follow. Tunisia started it, and Tunisia is the only one to come out of it with a democracy.',
    choices: [
      {
        text: 'You are in Tunis when Ben Ali falls.',
        tag: null,
        outcome: 'The streets that night. You were there. You have been explaining what it felt like ever since and have not quite succeeded.',
        effect: (p) => { p.m += 16; p.r += 8; p.addFlag('tunisian_revolution_generation'); p.setMem('tunRevolution', true) },
      },
      {
        text: 'You are elsewhere — watching, following, waiting.',
        tag: null,
        outcome: 'The news came through the phone, through Al Jazeera, through calls. You tracked every hour of those twenty-eight days. When he fled, you felt something you did not have a word for.',
        effect: (p) => { p.m += 10; p.r += 6; p.addFlag('tunisian_revolution_generation'); p.setMem('tunRevolution', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tun_democratic_transition',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.currentYear >= 2012 && G.currentYear <= 2019 &&
      G.age >= 22 &&
      !G.mem.tunDemocracy,
    text: 'The National Constituent Assembly writes a new constitution — two years of argument, compromise, and near-collapse. The 2014 constitution is the most progressive in the Arab world: freedom of conscience, gender equality in rights, a Constitutional Court. The Islamist party Ennahda and the secular parties negotiate rather than fight. In 2015, the National Dialogue Quartet — the civil society organisations that brokered the transition — receives the Nobel Peace Prize. Tunisia is the experiment the rest of the world is watching. You live inside the experiment.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 3; p.addFlag('tunisian_democratic_generation'); p.setMem('tunDemocracy', true) },
  },

  {
    id: 'tun_saied_coup_2021',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.currentYear === 2021 &&
      G.age >= 20 &&
      !G.mem.tunSaied,
    text: 'July 25, 2021. President Saied, elected as the man against corruption, suspends parliament and rules by decree. Then he dissolves the electoral commission, writes a new constitution with hardly anyone\'s help, purges the judges, charges the journalists. The constitution the world gave a Nobel to is gone. The experiment is being taken apart from inside by the man elected to keep it.',
    choices: [
      {
        text: 'You supported the revolution and cannot accept what has been done with it.',
        tag: null,
        outcome: 'You are in the generation that built the thing and are watching it be unmade. The grief of that does not have a name.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('tunisian_saied_generation'); p.setMem('tunSaied', true) },
      },
      {
        text: 'You are exhausted by the chaos of the transition years and feel something like relief at the order.',
        tag: null,
        outcome: 'The parliament was paralysed. The economy never recovered. The order is real even if you understand its cost. You are not sure how to hold both.',
        effect: (p) => { p.m -= 4; p.r += 7; p.addFlag('tunisian_saied_generation'); p.setMem('tunSaied', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tun_economic_interior',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Tunisia' &&
      G.currentYear >= 1995 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem.tunInterior,
    text: 'The coast — Tunis, Sousse, Sfax, the tourist economy — and the interior are two different countries with one government. Sidi Bouzid, where Bouazizi was from, has fifty percent youth unemployment. The wealth produced by the coast, the phosphate exports, the tourism revenue — none of it reached the interior in the quantities that would make the statistics legible from where you stand. The revolution started in Sidi Bouzid because the person who started it had everything the economic model denied him.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('tunisian_interior_generation'); p.setMem('tunInterior', true) },
  },

]

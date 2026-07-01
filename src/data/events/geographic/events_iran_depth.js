// events_iran_depth.js
// Iran depth arc — texture not covered in events_iran.js or events_country_arcs_3.js.
// events_country_arcs_3.js covers: Shah/SAVAK, revolution week 1979, 1981-83 purge,
// Iran-Iraq War (parent's perspective), Green Movement 2009, Mahsa Amini 2022.
// events_iran.js covers: Khatami reform era, sanctions economy, private/public split,
// hijab enforcement, brain drain, JCPOA, late reckoning.
// This file: Islamic Revolution childhood, Iran-Iraq War soldier (first-person),
// child of a martyr, Nowruz persistence, 1988 prison massacres, university purge,
// Ahmadinejad nuclear pride era, post-2022 departure generation.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const IRAN_DEPTH_EVENTS = [

  // ── ISLAMIC REVOLUTION CHILDHOOD ─────────────────────────────────────────

  {
    id: 'irn_dep_revolution_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1979 && G.currentYear <= 1983 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.irnDepRevChildhood,
    text: pick([
      'The school uniform changes. Girls who were not covering before cover now. The textbooks arrive with pages glued together — the wrong pages, the old-regime pages. The teacher is someone you do not recognise from last year. The teacher explains the revolution. The revolution is the correct thing. The school explains this in the same tone that the school used to explain the Shah was the correct thing. You are old enough to notice the tone is the same. You are not old enough to say this.',
      'The komiteh — the revolutionary committee — has an office on your street now. The men inside decide which music is allowed and which is not. The neighbour who had wine at dinner no longer has wine at dinner, or has it without the lights on. The New Year\'s party your mother used to organise: the music, the dancing, the mixed company. This year the party is smaller and quieter and ends earlier. Nobody says why. Everyone understands why.',
    ]),
    choices: [
      {
        text: 'Your family adapts — the private life retreats inside, the public face changes',
        tag: null,
        outcome: 'The apartment becomes one country, the street another. You learn to move between them. This is the basic skill of your generation.',
        effect: (p) => {
          p.e += 4
          p.r += 4
          p.addFlag('irn_revolution_childhood')
          p.setMem('irnDepRevChildhood', true)
        },
      },
      {
        text: 'Your family is devout — the revolution is also your revolution',
        tag: null,
        outcome: 'The school feels continuous with home. The public and private say the same things. The neighbour\'s discomfort is not your discomfort. You will learn later that this is not universal.',
        effect: (p) => {
          p.m += 3
          p.r += 3
          p.addFlag('irn_revolution_childhood')
          p.setMem('irnDepRevChildhood', true)
        },
      },
    ],
    effect: null,
  },

  // ── IRAN-IRAQ WAR SOLDIER ─────────────────────────────────────────────────

  {
    id: 'irn_dep_war_soldier',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1980 && G.currentYear <= 1988 &&
      G.character.gender === 'male' &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.irnDepWarSoldier,
    text: 'Saddam Hussein attacks on September 22, 1980. The war will last eight years. At the front, the tactics include human wave attacks — volunteers walking through minefields to clear them for the regular army. The Basij give teenage boys a plastic key on a string: the key to paradise, to be worn around the neck going forward. Some boys go because they believe. Some because their family cannot afford for them not to go. Some because there is a neighbourhood logic to volunteering that makes refusal complicated. You are of the age. The front is waiting for men your age.',
    choices: [
      {
        text: 'You go to the front as a soldier',
        tag: null,
        outcome: 'The Faw Peninsula. The marshes. The specific smell of the Shatt al-Arab. You come back in 1988 when the ceasefire comes — UN Resolution 598, which Iran accepts as "drinking poison," in Khomeini\'s words. You come back with something that doesn\'t come back with you.',
        effect: (p) => {
          p.h -= 10
          p.m -= 10
          p.karma += 8
          p.r += 6
          p.addFlag('irn_iraq_war_soldier')
          p.setMem('irnDepWarSoldier', true)
        },
      },
      {
        text: 'You avoid the front — education deferment, medical deferment, family connections',
        tag: null,
        outcome: 'The deferment holds. The men in your neighbourhood who went come back different or do not come back. You live with the arithmetic of who went and who did not.',
        effect: (p) => {
          p.m -= 5
          p.r += 7
          p.karma -= 3
          p.addFlag('irn_iraq_war_soldier')
          p.setMem('irnDepWarSoldier', true)
        },
      },
    ],
    effect: null,
  },

  // ── CHILD OF A MARTYR ────────────────────────────────────────────────────

  {
    id: 'irn_dep_martyr_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1981 && G.currentYear <= 1995 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.irnDepMartyrChild,
    text: 'Your father\'s photograph is on the wall. In the photograph he is in uniform. Below the photograph is the word shahid — martyr — and the date. The Bonyad-e Shahid, the Martyr Foundation, sends money and provides benefits: school fees, housing priority, a monthly stipend. The identity it creates is specific: you are a child of a martyr. This is a social position. At school assemblies it is announced. The state has a use for your grief that is not the same as your grief.',
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 7
      p.e += 3
      p.addFlag('irn_martyr_child')
      p.setMem('irnDepMartyrChild', true)
    },
  },

  // ── NOWRUZ PERSISTENCE ───────────────────────────────────────────────────

  {
    id: 'irn_dep_nowruz',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1980 && G.currentYear <= 2020 &&
      G.age >= 15 && G.age <= 45 &&
      !G.mem?.irnDepNowruz,
    text: pick([
      'Nowruz: the Persian New Year, tied to the vernal equinox, 2,500 years old and not Islamic. The Islamic Republic has complicated feelings about Nowruz — it predates Islam, it is Zoroastrian in origin, and it is universally celebrated by Iranians regardless of piety. The state never abolished it. The state tried to reduce it. Every year the families lay out the haft-sin table — the seven items beginning with S — and recite from Hafiz and eat fish and rice and give children money in new banknotes. The ancient feast refuses to become smaller than itself.',
      'Chaharshanbe Suri: the fire festival the Wednesday before Nowruz. People jump over fires in the street — a pre-Islamic ritual, the fire burning away the old year. The Islamic Republic has discouraged it repeatedly. Every year in the week before Nowruz the fires go in the streets anyway. The authorities issue statements. The fires go anyway. You jump the fire. You say the old words: your redness to me, my paleness to you — give me your warmth and take my sickness.',
    ]),
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.r += 2
      p.addFlag('irn_nowruz_keeper')
      p.setMem('irnDepNowruz', true)
    },
  },

  // ── 1988 PRISON MASSACRES ─────────────────────────────────────────────────

  {
    id: 'irn_dep_1988_executions',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1988 && G.currentYear <= 1992 &&
      G.age >= 18 &&
      !G.mem?.irnDep1988,
    text: 'In the summer of 1988, following a secret fatwa from Khomeini, political prisoners across Iran are executed. The number is disputed — estimates range from 3,000 to 5,000. They are members of Mojahedin-e Khalq and leftist groups who refused to recant their beliefs. The executions happen without trial, without family notification. Families who come to visit are told their relative has been transferred. When the executions are finished, the families receive a bag of belongings. Some receive a location — a mass grave outside the city. This is not public knowledge in Iran. The families who know, know. The families who know do not speak of it publicly. You know because someone you know is in the bag of belongings.',
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 8
      p.karma += 5
      p.addFlag('irn_1988_loss')
      p.setMem('irnDep1988', true)
    },
  },

  // ── UNIVERSITY CULTURAL REVOLUTION ───────────────────────────────────────

  {
    id: 'irn_dep_university_purge',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1980 && G.currentYear <= 1984 &&
      G.age >= 17 && G.age <= 30 &&
      !G.mem?.irnDepUniPurge,
    text: 'The universities close in April 1980 for the Cultural Revolution. They will reopen in 1983 after the purge is complete: professors who taught the wrong things, students who belonged to the wrong organisations, textbooks that contained the wrong knowledge. The purge committee reviews each faculty. Some professors are expelled, some imprisoned, some leave the country. You are at university or about to enter. The university that reopens is not the university that closed. The institution has been revised. The question is whether to enter the revised institution.',
    choices: [
      {
        text: 'You wait and enter the revised university when it reopens',
        tag: null,
        outcome: 'The curriculum has new requirements. The professors who remain are those who passed the review or were hired after it. You get an education that has been shaped by what it decided not to include.',
        effect: (p) => {
          p.e += 4
          p.r += 5
          p.m -= 5
          p.addFlag('irn_cultural_revolution_student')
          p.setMem('irnDepUniPurge', true)
        },
      },
      {
        text: 'You leave Iran — the departure is permanent',
        tag: null,
        outcome: 'You are one of the early wave. The revolution exported its educated opposition before the opposition fully understood it was being exported. You build a life in the distance and watch Iran from it.',
        effect: (p) => {
          p.m -= 10
          p.r += 8
          p.w -= 5
          p.e += 6
          p.addFlag('irn_cultural_revolution_student')
          p.addFlag('emigrated')
          p.setMem('irnDepUniPurge', true)
        },
      },
    ],
    effect: null,
  },

  // ── AHMADINEJAD NUCLEAR PRIDE ─────────────────────────────────────────────

  {
    id: 'irn_dep_nuclear_pride',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2005 && G.currentYear <= 2013 &&
      G.age >= 20 &&
      !G.mem?.irnDepNuclear,
    text: 'Ahmadinejad goes to the United Nations and says Iran will not give up its nuclear rights. On Iranian state television this plays on a loop. The rial falls against the dollar every few months. Sanctions tighten: medicines become hard to find, the import supply chain breaks, the official rate diverges from the street rate in ways that allow certain people to extract enormous sums from the gap. Your salary, paid in rials, buys less every month. The nuclear programme is a national project. The question of how to feel about a national project that is impoverishing you is the question.',
    choices: [
      {
        text: 'The pride is real — Iran is not anyone\'s to dictate to',
        tag: null,
        outcome: 'The sanctions are foreign pressure and foreign pressure has a history in Iran that makes the resistance to it feel like dignity. You hold both things: the pride and the price.',
        effect: (p) => {
          p.m -= 4
          p.r += 4
          p.addFlag('irn_nuclear_pride')
          p.setMem('irnDepNuclear', true)
        },
      },
      {
        text: 'The price is too high — the programme is a weapon the state uses against its own people',
        tag: null,
        outcome: 'The sanctions are the government\'s fault as much as the West\'s — the government chose the programme over the economy. You cannot say this outside a trusted room.',
        effect: (p) => {
          p.m -= 6
          p.r += 6
          p.addFlag('irn_nuclear_pride')
          p.setMem('irnDepNuclear', true)
        },
      },
    ],
    effect: null,
  },

  // ── POST-MAHSA DEPARTURE ─────────────────────────────────────────────────

  {
    id: 'irn_dep_post_2022_leaving',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Iran' &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      G.age >= 20 && G.age <= 45 &&
      !G.mem?.irnDepPost2022 &&
      !G.flags.has('emigrated'),
    text: 'After the crackdown on the Mahsa protests, the wave of departures begins. Turkey is the nearest country that requires no visa. The Georgian capital Tbilisi doubles its Persian-speaking cafes in a year. Germany announces a fast-track visa for Iranians with in-demand skills. The people leaving now are not the people who left in 1980 or 1988 — those waves were political dissidents and university professors. This wave is different: engineers, developers, doctors, teachers, the under-forty generation that built the country\'s professional infrastructure. The country is being emptied of the thing that would have changed it from within.',
    choices: [
      {
        text: 'You leave. Turkey, Georgia, Germany — wherever the visa clears first.',
        tag: null,
        outcome: 'You are one of the hundreds of thousands. The Persian cafes in Tbilisi are full of people who speak your language and feel exactly what you feel about having left. The solidarity is real. The distance is also real.',
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.e += 3
          p.addFlag('irn_post_2022_departure')
          p.addFlag('emigrated')
          p.setMem('irnDepPost2022', true)
        },
      },
      {
        text: 'You stay. Someone has to.',
        tag: null,
        outcome: 'The people who stay are the change the people who leave are hoping for. You know this. It does not make the city less empty of the people who have left.',
        effect: (p) => {
          p.m -= 6
          p.r += 7
          p.karma += 5
          p.addFlag('irn_post_2022_departure')
          p.setMem('irnDepPost2022', true)
        },
      },
    ],
    effect: null,
  },

]

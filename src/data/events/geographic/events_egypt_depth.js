// events_egypt_depth.js
// Egypt depth: October War 1973, Camp David / Sadat assassination, Sisi era 2013,
// Al-Azhar religious identity, Cairo population pressure, 2016 pound crisis,
// Nile anxiety (GERD), late-life reckoning on the Arab Spring arc.
//
// Companion to events_egypt.js (which covers: Nasser/Suez 1956–67, Naksa 1967,
// infitah, Emergency Law, bread riots 1977, Tahrir 2011, aftermath 2012–16,
// wasta, Gulf contract, blocked generation, Coptic navigation).

const IS_EGYPTIAN = (G) => G.character.country.name === 'Egypt'

export const EGYPT_DEPTH_EVENTS = [

  // ── OCTOBER WAR 1973: THE CROSSING ────────────────────────────────────────

  {
    id: 'egy_october_war_1973',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.currentYear === 1973 &&
      G.age >= 10 &&
      !G.mem?.egyOctober,
    text: `October 6, 1973. Yom Kippur. Egyptian forces cross the Suez Canal under a barrage of artillery covering 2,000 guns — the greatest artillery concentration since World War Two. The Bar-Lev Line, which Israel considered impenetrable, is breached in the first hours. Soldiers use water cannons to cut through the sand berms. The crossing works. For the first days the army advances across the Sinai. The radio — the same radio that announced the Naksa of 1967 — now reports real advances, and for once the reports are accurate. The canal is Egypt's. The shame of '67 is not erased, but something else has been put next to it.`,
    choices: [
      {
        text: `Your brother is in the army. You listen to every broadcast.`,
        tag: null,
        outcome: 'He comes back. The war ends in a ceasefire brokered under US pressure, which is a different ending than a victory — but the crossing was real, and the crossing is what stays.',
        effect: (p) => {
          p.m += 10
          p.addFlag('october_war_generation')
          p.setMem('egyOctober', true)
        },
      },
      {
        text: `You are in school. The teacher stops the lesson.`,
        tag: null,
        outcome: 'The crossing enters the national memory as the event that answered 1967. The ceasefire and the American intervention and the Israeli counter-attack that surrounded an Egyptian army in Sinai are also part of the record, but the crossing is what Egypt teaches to its children.',
        effect: (p) => {
          p.m += 8
          p.e += 2
          p.addFlag('october_war_generation')
          p.setMem('egyOctober', true)
        },
      },
    ],
    effect: null,
  },

  // ── SADAT'S PEACE AND ASSASSINATION ───────────────────────────────────────

  {
    id: 'egy_camp_david_1978',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.currentYear >= 1977 && G.currentYear <= 1982 &&
      G.age >= 18 &&
      !G.mem?.egyCampDavid,
    text: `November 1977. Sadat goes to Jerusalem. He speaks to the Knesset. He says there will be no more war between Egypt and Israel. In 1978 he signs the Camp David Accords with Begin and Carter. In 1979, the peace treaty. Egypt gets Sinai back. Egypt is suspended from the Arab League. The Arab League moves its headquarters from Cairo to Tunis. The countries that fought with Egypt in 1948, 1956, 1967, 1973 — the countries of pan-Arab solidarity — treat the peace as a betrayal. Egypt's isolation is nearly total. Then, in October 1981, at the military parade commemorating the crossing of the canal, three soldiers from the parade jump from the vehicles and fire on the reviewing stand. Sadat is killed. The Nobel Peace Prize that Sadat and Begin shared in 1978 is on the record. Sadat's assassination is also on the record.`,
    choices: [
      {
        text: `The peace was the right decision. Four wars in thirty years. The Sinai is back.`,
        tag: null,
        outcome: 'Egypt stays in the peace. The Arab League will eventually restore Egypt\'s membership in 1989. The peace holds, because both sides find reasons to maintain it.',
        effect: (p) => {
          p.m -= 5
          p.addFlag('egy_camp_david_generation')
          p.setMem('egyCampDavid', true)
        },
      },
      {
        text: `He made peace for Egypt. He did not consult the Palestinians. He did not consult the Arab world. The price of his peace was paid by others.`,
        tag: null,
        outcome: 'This is the argument that was made in Cairo and Damascus and Beirut in 1979. It is still the argument. The peace held. The Palestinians are still living what followed from the isolation of the Arab world.',
        effect: (p) => {
          p.m -= 8
          p.r += 7
          p.karma += 4
          p.addFlag('egy_camp_david_generation')
          p.setMem('egyCampDavid', true)
        },
      },
    ],
    effect: null,
  },

  // ── SISI ERA 2013+ ─────────────────────────────────────────────────────────

  {
    id: 'egy_sisi_2013',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2016 &&
      G.age >= 18 &&
      G.flags.has('arab_spring_disillusionment') &&
      !G.mem?.egySisi,
    text: `June 2013. A year after Morsi's election, millions sign the Tamarod petition demanding early elections. June 30: massive protests. July 3: General Abdel Fattah el-Sisi announces Morsi's removal. The Muslim Brotherhood's year in power is over. Three weeks later, the Rabaa al-Adawiya sit-in is dispersed. Somewhere between 800 and 2,600 protesters are killed in a few hours — the largest mass killing in Egypt's modern history. El-Sisi wins the 2014 presidential election with 96.9% of the vote. The Emergency Law, which Mubarak maintained for thirty years and which briefly lapsed under Morsi, is back.`,
    choices: [
      {
        text: `The Brotherhood's year was a warning. Sisi ended it.`,
        tag: null,
        outcome: 'This is the argument made by many Egyptians who were in Tahrir in 2011 and who voted for Sisi in 2014. The accounting of Rabaa sits alongside it.',
        effect: (p) => {
          p.m -= 6
          p.addFlag('egy_sisi_generation')
          p.setMem('egySisi', true)
        },
      },
      {
        text: `You left Mubarak's Egypt for Sisi's Egypt. The bodies in Rabaa are the price of the new stability.`,
        tag: null,
        outcome: 'You carry Tahrir and Rabaa together. The one that was supposed to open the country and the one that closed it again. A specific kind of historical disillusionment that only Egyptians of your generation can properly calibrate.',
        effect: (p) => {
          p.m -= 14
          p.r += 10
          p.karma += 4
          p.addFlag('egy_sisi_generation')
          p.setMem('egySisi', true)
        },
      },
    ],
    effect: null,
  },

  // ── CAIRO POPULATION PRESSURE ──────────────────────────────────────────────

  {
    id: 'egy_cairo_density',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      !G.mem?.egyCairo,
    text: `Cairo holds twenty million people. Twenty-one million. Twenty-two. The population figure is precise in the census and imprecise in the street, where the number is simply everyone, always, in every direction. The apartment you rent or own has one-third of the square metres of an apartment in the city where your cousin now lives in Germany. The commute is a specific measurement of how the city works: bridges over the Nile at rush hour; the underground's Helwan line; the microbus routes that the official system never extended to. You become a specialist in the city's bypass routes the way people who live in difficult terrain become specialists in the terrain.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.e += 2
      p.setMem('egyCairo', true)
    },
  },

  // ── AL-AZHAR AND RELIGIOUS IDENTITY ───────────────────────────────────────

  {
    id: 'egy_al_azhar_identity',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.religion?.startsWith('muslim') &&
      G.currentYear >= 1950 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.egyAzhar,
    text: `Al-Azhar is a thousand years old. The mosque in Old Cairo that became the university that became the theological authority that issues fatwas and trains imams from every Muslim country. You learn the Quran partly through its transmission — the teacher who learned from a teacher who learned from someone trained there. The religious authority that Al-Azhar represents is not the government's authority; it is older and more settled and the government knows it cannot simply cancel it. The specific Egyptian Islam you are growing up in has Al-Azhar's long shadow behind it, which means it has a millennium's worth of institution rather than the agitated certainties of more recent movements.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m += 4
      p.setMem('egyAzhar', true)
    },
  },

  // ── 2016 POUND FLOTATION ──────────────────────────────────────────────────

  {
    id: 'egy_pound_flotation_2016',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.currentYear === 2016 &&
      G.age >= 20 &&
      !G.mem?.egyPound,
    text: `November 3, 2016. The Central Bank of Egypt floats the pound. It was trading at 8.8 to the dollar. The next morning it opens at 13. By the end of the month it is 19. The IMF loan, which requires the float, is $12 billion over three years. Fuel subsidies are reduced. Electricity prices increase in stages. The logic of the reform is that the parallel market was already pricing the pound at the new rate; now the official rate has caught up with reality. The experience of the reform is: everything that you buy that has any imported component is suddenly 60% more expensive. The government says this is temporary. You calculate what 60% means in your household.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.w -= 4
      p.wipeMoney(0.15)
      p.addFlag('egy_pound_crisis_2016')
      p.setMem('egyPound', true)
    },
  },

  // ── THE NILE: UPSTREAM ANXIETY ────────────────────────────────────────────

  {
    id: 'egy_nile_gerd_anxiety',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_EGYPTIAN(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.egyNileGerd,
    text: `Ethiopia is building the Grand Ethiopian Renaissance Dam on the Blue Nile. When complete it will be the largest hydroelectric dam in Africa. The Blue Nile contributes 86% of the Nile's water. Egypt's position is based on a 1959 treaty — negotiated by Sudan and Egypt, without Ethiopia or any other upstream country — that allocates Egypt 55.5 billion cubic metres per year. Egypt does not consider this negotiable. Egypt has, at various points, threatened military action. The geography is simple: a country of 100 million people in a desert, completely dependent on one river, watching a country upstream fill a reservoir the size of London.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.setMem('egyNileGerd', true)
    },
  },

  // ── FOLLOW-THROUGH: CAMP DAVID LATE RECKONING ─────────────────────────────

  {
    id: 'egy_camp_david_late_life',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('egy_camp_david_generation') &&
      G.age >= 60 &&
      !G.mem?.egyCampDavidLate,
    text: `The 1979 peace treaty is, as of your old age, the longest-held peace between Israel and any Arab state. Sadat was assassinated for it in 1981. Mubarak maintained it for thirty years. Sisi has maintained it. The Arab League expelled Egypt and then readmitted Egypt without the treaty ever being cancelled. The Palestinians did not get a state. Egypt got the Sinai and got out of the war. The moral accounting of this is something the region has not completed and you have not completed and may not complete. Sadat is considered a hero by some accounts and a traitor by others, and he is dead, which is the cost he paid for the position he took.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('egyCampDavidLate', true)
    },
  },

  // ── FOLLOW-THROUGH: OCTOBER WAR LATE ECHO ─────────────────────────────────

  {
    id: 'egy_october_war_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('october_war_generation') &&
      G.age >= 65 &&
      !G.mem?.egyOctoberLate,
    text: `The crossing of the canal is now fifty years past. The television specials air. The soldiers who crossed are old men. You watch the archive footage: the water cannons cutting through the sand berms, the bridges going across, the soldiers in the Sinai. The crossing was real. The wars before it were also real. The peace that followed — the exile from the Arab League, Sadat's death, the cold peace that has maintained itself for four decades — is all part of the same sequence. You have lived all of it from inside the country.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('egyOctoberLate', true)
    },
  },

]

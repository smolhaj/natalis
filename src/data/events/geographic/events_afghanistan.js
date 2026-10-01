// Afghanistan character events
// Historical arcs: Saur Revolution / Soviet-backed communist coup 1978,
// Soviet invasion 1979 and mujahideen jihad 1979–1989 (CIA support, Pakistan camps),
// collapse of Najibullah government and civil war / warlord chaos 1992–1996,
// Taliban takeover 1996–2001 (women's education banned, cultural destruction),
// US invasion 2001 and twenty years of occupation / reconstruction / corruption,
// Taliban return August 2021 (Kabul falls in eleven days).

export const AFGHANISTAN_EVENTS = [

  {
    id: 'afg_saur_revolution_1978',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1978 && G.currentYear <= 1984 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem.afgSaur,
    text: 'April 1978. The People\'s Democratic Party of Afghanistan seizes power in a coup. Daoud Khan, the republic\'s president, is shot in the palace. The PDPA is a communist party backed by the Soviet Union, and it sets about transforming Afghanistan by force: land reform, women\'s literacy campaigns, the abolition of bride price, the red flag with the black stripe removed. The changes are real and the method is not slow. People who resist are disappeared. The Soviet advisors begin arriving before the Soviet soldiers do.',
    choices: null,
    effect: (p) => { p.e += 1; p.m -= 4; p.r += 3; p.addFlag('afghan_saur_generation'); p.setMem('afgSaur', true) },
  },

  {
    id: 'afg_soviet_occupation',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1979 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem.afgSoviet,
    text: 'December 1979, and the Soviet army comes in. The mujahideen are armed through Pakistan with weapons that work, and the countryside cannot be pacified. By the end, a third of the country has left for Pakistan or Iran. You are in this war or you are a refugee from it. There is almost no third option.',
    context: 'The Soviet war in Afghanistan (1979-1989) killed an estimated one million Afghans and made about five million refugees.',
    choices: [
      {
        text: 'You are fighting — as mujahideen, as a soldier, or in the resistance.',
        tag: null,
        outcome: 'You are in the war. What you have done in it and what has been done to you is specific. The war ends. The effects of what it asked of you do not end with it.',
        effect: (p) => { p.m -= 18; p.h -= 5; p.r += 12; p.addFlag('afghan_soviet_war_generation'); p.addFlag('afghan_combatant'); p.setMem('afgSoviet', true) },
      },
      {
        text: 'You flee — to Pakistan, to Iran, or to the diaspora.',
        tag: null,
        outcome: 'Peshawar, Quetta, Tehran. The camp or the city apartment of the diaspora cousin. You are Afghan in a place that is not Afghanistan. It becomes permanent for longer than you expected.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('afghan_soviet_war_generation'); p.addFlag('afghan_refugee'); p.setMem('afgSoviet', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_civil_war_kabul',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem.afgCivilWar,
    text: '1992. The Soviet-backed government falls, and Najibullah hides in the UN compound, where he will stay four years until the Taliban hang him. The factions that fought the Soviets together cannot agree who governs, and Kabul becomes the front line between them: Hekmatyar shelling from the south, Massoud in the north, Dostum changing sides. The city that survived the Soviets does not survive the men who beat them.',
    context: 'Rocket fire and fighting between mujahideen factions in Kabul from 1992 to 1996 killed tens of thousands of civilians.',
    choices: null,
    effect: (p) => { p.m -= 14; p.h -= 3; p.r += 10; p.addFlag('afghan_civil_war_generation'); p.setMem('afgCivilWar', true) },
  },

  {
    id: 'afg_taliban_rule',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1996 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem.afgTaliban,
    text: 'They hang the man who used to be president from a traffic post at Ariana Square and leave him there. The rules come over the radio as a list: no music, no television, no kites, beards to the length of a fist, no woman on the street without a man of her own family. The Ministry for the Promotion of Virtue has a pickup and a length of cable and it works the bazaar in the afternoons. Your sister has not been outside the compound since September.',
    context: 'The Taliban took Kabul in September 1996 and killed the former president Mohammad Najibullah, displaying his body at Ariana Square. Their decrees banned music, television, kite-flying and photography, mandated beards, and prohibited women from working or leaving home without a male relative. The Ministry for the Promotion of Virtue and Prevention of Vice enforced them in public. Hazara communities in Bamyan and Mazar-i-Sharif were subjected to mass killings.',
    choices: [
      {
        text: 'You are a woman — your world has been abolished.',
        tag: null,
        outcome: 'The school is closed. The job is forbidden. You cannot leave without a man. The women you know find different strategies for surviving inside this. You find yours.',
        effect: (p) => { p.m -= 22; p.e -= 3; p.r += 14; p.addFlag('afghan_taliban_generation'); p.addFlag('afghan_women_under_taliban'); p.setMem('afgTaliban', true) },
      },
      {
        text: 'You are a man — the rules constrain you in different ways.',
        tag: null,
        outcome: 'The beard is mandatory. The music is gone. The television is gone. The kite in the sky that used to be ordinary is forbidden. You comply, you resist in private, you find the space to exist. Women in your life do not have the same space.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('afghan_taliban_generation'); p.setMem('afgTaliban', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_us_invasion_2001',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2001 && G.currentYear <= 2012 &&
      G.age >= 16 &&
      !G.mem.afgUSInvasion,
    text: 'October 2001. The Americans come and the Taliban collapse in weeks, and Kabul falls without a fight. The girls\' schools reopen and the music comes back. Then the Land Cruisers, the salaries, the new restaurants and the elected government, and girls in school in numbers there have never been before. The war is still happening somewhere, but Kabul is something people are building, and the people who were there know that feeling.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r += 5; p.addFlag('afghan_2001_generation'); p.setMem('afgUSInvasion', true) },
  },

  {
    id: 'afg_taliban_return_2021',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear === 2021 &&
      G.age >= 18 &&
      !G.mem.afgFall && !G.mem?.afg2021,
    text: 'Kabul falls in eleven days. The army that twenty years of money built dissolves without fighting, the president leaves, and the Taliban take photographs of each other in the palace chairs. At the airport tens of thousands push against the gates, and people fall from the wheels of the transport planes. The girls\' schools close again. The women who had become doctors, journalists, judges, pilots disappear into houses.',
    context: 'Kabul fell on 15 August 2021. The United States had spent some 83 billion dollars building the Afghan security forces.',
    choices: [
      {
        text: 'You get out — through the airport, the border, whatever route is available.',
        tag: null,
        outcome: 'You are out. What you left behind is specific and you know exactly what it is. The country you arrive in does not know your name. You start.',
        effect: (p) => { p.m -= 20; p.r += 16; p.addFlag('afghan_fall_2021'); p.addFlag('afghan_evacuee'); p.setMem('afgFall', true); p.setMem('afg2021', true) },
      },
      {
        text: 'You stay — by choice, necessity, or because the exit did not come in time.',
        tag: null,
        outcome: 'You stay in the country that has changed again. The people who left are somewhere else now. You navigate the new rules, the new searches, the new calculations of what is sayable and to whom.',
        effect: (p) => { p.m -= 16; p.r += 12; p.addFlag('afghan_fall_2021'); p.setMem('afgFall', true); p.setMem('afg2021', true) },
      },
    ],
    effect: null,
  },

]

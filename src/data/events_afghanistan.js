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
    phase: 'childhood',
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
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1979 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem.afgSoviet,
    text: 'December 1979. Soviet forces enter Afghanistan. By the end of the war in 1989, five million Afghans are refugees — in Pakistan, in Iran, in the diaspora. One million are dead. The mujahideen are armed by the CIA through Pakistan\'s ISI. The weapons are sophisticated and they work. The Soviet army cannot pacify the countryside. The countryside is not pacifiable. You are in this war or you are a refugee from it. There is almost no third option.',
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
        outcome: 'Peshawar, Quetta, Tehran. The camp or the city apartment of the diaspora cousin. You are Afghan in a place that is not Afghanistan. That is the condition. It becomes permanent for longer than you expected.',
        effect: (p) => { p.m -= 14; p.r += 10; p.addFlag('afghan_soviet_war_generation'); p.addFlag('afghan_refugee'); p.setMem('afgSoviet', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'afg_civil_war_kabul',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem.afgCivilWar,
    text: '1992. The Soviet-backed government collapses. Najibullah is hiding in the UN compound — he will be there for four years before the Taliban hang him. The mujahideen factions that fought the Soviets together cannot agree on who governs. Kabul becomes the front line between them. Gulbuddin Hekmatyar shells the city from the south. Massoud holds the north. Dostum switches sides. Seventy thousand civilians die in Kabul alone during four years of rocket fire and atrocity. The city that survived the Soviets does not survive the men who defeated them.',
    choices: null,
    effect: (p) => { p.m -= 14; p.h -= 3; p.r += 10; p.addFlag('afghan_civil_war_generation'); p.setMem('afgCivilWar', true) },
  },

  {
    id: 'afg_taliban_rule',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 1996 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem.afgTaliban,
    text: 'September 1996. The Taliban enter Kabul. Najibullah is castrated and hanged from a traffic post. The new rules are announced. Women cannot leave the house without a male guardian. Women cannot work. Girls\' schools are closed. Music is banned. Television is banned. Kite-flying is banned. Men must grow beards to the length of a fist. The religious police — the Ministry for the Promotion of Virtue and Prevention of Vice — enforce the rules in the streets. The Hazara villages in the Bamyan valley face not just the rules but massacres.',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear >= 2001 && G.currentYear <= 2012 &&
      G.age >= 16 &&
      !G.mem.afgUSInvasion,
    text: 'October 2001. The United States invades after September 11. The Taliban collapse in weeks. Kabul falls without a fight. The girls\' schools reopen. The music comes back. The international NGOs arrive with their Land Cruisers and their salaries. The Kabul bubble inflates: restaurants, hotels, the new middle class of the aid economy, an elected government, a new constitution, girls in school in numbers that have not existed before. The war is still happening somewhere, but Kabul is something people are building. That is a specific feeling that people who were there know.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 3; p.r += 5; p.addFlag('afghan_2001_generation'); p.setMem('afgUSInvasion', true) },
  },

  {
    id: 'afg_taliban_return_2021',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Afghanistan' &&
      G.currentYear === 2021 &&
      G.age >= 18 &&
      !G.mem.afgFall,
    text: 'August 15, 2021. Kabul falls in eleven days. The army the United States spent twenty years and eighty-three billion dollars building dissolves without fighting. The president leaves. The Taliban walk into the presidential palace and take photographs in the chairs. At the airport, tens of thousands of Afghans push against the gates. People fall from military transport planes. The evacuation is chaos. The girls\' schools close again. The women who had built careers — doctors, journalists, judges, pilots — disappear into houses. The twenty years are not gone, but what they built has to find new containers.',
    choices: [
      {
        text: 'You get out — through the airport, the border, whatever route is available.',
        tag: null,
        outcome: 'You are out. What you left behind is specific and you know exactly what it is. The country you arrive in does not know your name. You start.',
        effect: (p) => { p.m -= 20; p.r += 16; p.addFlag('afghan_fall_2021'); p.addFlag('afghan_evacuee'); p.setMem('afgFall', true) },
      },
      {
        text: 'You stay — by choice, necessity, or because the exit did not come in time.',
        tag: null,
        outcome: 'You stay in the country that has changed again. The people who left are somewhere else now. You navigate the new rules, the new searches, the new calculations of what is sayable and to whom.',
        effect: (p) => { p.m -= 16; p.r += 12; p.addFlag('afghan_fall_2021'); p.setMem('afgFall', true) },
      },
    ],
    effect: null,
  },

]

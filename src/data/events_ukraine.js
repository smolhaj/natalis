// Ukraine-specific arc events
// Holodomor family memory, independence 1991, language question,
// Orange Revolution 2004, Euromaidan 2013-14, Donbas displacement 2014,
// 2022 invasion from Ukrainian civilian perspective.

export const UKRAINE_EVENTS = [

  {
    id: 'ukr_holodomor_family',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1945 && G.currentYear <= 1985 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.ukrHolodomor,
    text: 'Your grandmother does not throw bread away. She smooths the crumbs into her palm when she is finished. You ask her once why she does this. She is quiet for longer than you expect. The Holodomor — the Hunger — 1932 to 1933. Six million Ukrainians, though the Soviet government denied there was a famine at all. She was a child during it. She does not speak about it directly. She speaks about bread.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.karma += 3
      p.addFlag('holodomor_family_memory')
      p.setMem('ukrHolodomor', true)
    },
  },

  {
    id: 'ukr_independence_1991',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 10 &&
      !G.mem?.ukrIndependence,
    text: 'August 24, 1991. The Verkhovna Rada votes for independence. The declaration passes with 346 in favor and 1 against. On December 1, 90 percent of Ukrainians vote yes in the referendum — including majorities in every region of the country, including Crimea. The Soviet Union is not yet formally dissolved; it dissolves on December 25. You are in a country that has existed as an independent state for nine weeks when it becomes the successor state to a superpower. The first years are 10,000% inflation and uncertainty about the currency. The independence is also real.',
    choices: [
      {
        text: 'The independence is what matters. Everything else can be built.',
        tag: null,
        outcome: 'You hold this belief through the hyperinflation and the political chaos of the 1990s. It is tested by those years. It survives them.',
        effect: (p) => { p.m += 6; p.karma += 5; p.setMem('ukrIndependence', true); },
      },
      {
        text: 'The economic collapse that follows independence makes the benefit hard to see.',
        tag: null,
        outcome: 'The collapse is real and the independence is also real. These are not the same sentence.',
        effect: (p) => { p.m -= 4; p.r += 4; p.e += 3; p.setMem('ukrIndependence', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_language_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1992 && G.currentYear <= 2014 &&
      G.age >= 16 &&
      !G.mem?.ukrLanguage,
    text: 'Ukrainian and Russian. At school you were taught one or the other depending on the region. In Kyiv, in 1990, 87 percent of school instruction was in Russian. By 2000, the proportion has shifted. The question of which language you speak in which room with which person carries a meaning that is not just a language question. In the east it is different from the west. In private it is different from official. You make a choice every day and the choice means something.',
    choices: [
      {
        text: 'You shift to Ukrainian as your primary language. It is a political act and you mean it.',
        tag: null,
        outcome: 'The shift is gradual. The language holds more of the country than it did before.',
        effect: (p) => { p.m += 3; p.e += 2; p.addFlag('ukrainian_language_identity'); p.setMem('ukrLanguage', true); },
      },
      {
        text: 'You continue in Russian — it is the language you think in, and the choice is not political to you.',
        tag: null,
        outcome: 'The choice is not political to you. To some of the people around you, it is. You live in the gap between those two facts.',
        effect: (p) => { p.r += 3; p.setMem('ukrLanguage', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_orange_revolution_2004',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear === 2004 &&
      G.age >= 14 &&
      !G.mem?.ukrOrangeRev,
    text: 'November 2004. The presidential election is held and Viktor Yanukovych is declared the winner. Exit polls show Viktor Yushchenko won by 6 percentage points. A million people appear on Maidan Nezalezhnosti — Independence Square — in orange scarves. The Supreme Court annuls the result. A revote is held in December. Yushchenko wins with 52 percent. What happened between the first count and the second is the Orange Revolution: the country said no to the result and the result changed. Yushchenko had been poisoned with dioxin during the campaign. His face carried the evidence. He survived.',
    choices: [
      {
        text: 'You are on the Maidan. The orange is your color this month.',
        tag: null,
        outcome: 'The cold is real. The crowd is real. The tent city runs for weeks. Something happened here that left a template.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('orange_revolution_generation'); p.addFlag('political_active'); p.setMem('ukrOrangeRev', true); },
      },
      {
        text: 'You watch it unfold from home. The scale is extraordinary.',
        tag: null,
        outcome: 'You follow it on television. The Maidan you are watching is the same Maidan you will watch again in 2013.',
        effect: (p) => { p.m += 4; p.addFlag('orange_revolution_generation'); p.setMem('ukrOrangeRev', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_euromaidan_2013',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.age >= 14 &&
      !G.mem?.ukrEuromaidan,
    text: (G) => {
      const year = G.currentYear
      if (year <= 2013) {
        return 'November 21, 2013. Yanukovych — now president — announces he will not sign the EU Association Agreement. Students appear on Maidan within hours. On November 30, the Berkut special police beat the students — a hundred hospitalised. The city responds. By December it is not students. It is a city. The tent city is back. The piano on Hrushevsky Street. The burning barricades in February. The snipers on the rooftops on February 18-20. A hundred and four dead. The Heavenly Hundred — Небесна Сотня.'
      }
      return 'The Euromaidan. The EU Association Agreement that Yanukovych cancelled. The Berkut beating the students. The burning barricades. The Heavenly Hundred dead. Yanukovych fleeing to Russia on February 21. What came after: Crimea, Donbas, eight years of a not-quite-war. What came after that: February 24, 2022. You were there for the beginning of the chain.'
    },
    choices: [
      {
        text: 'You are there — the cold, the piano, the barricades.',
        tag: null,
        outcome: 'You are in the Maidan through January and February. You are there when the snipers fire. What happens in those weeks is the thing that produces everything that comes after.',
        effect: (p) => { p.m -= 8; p.m += 10; p.karma += 10; p.r += 6; p.addFlag('euromaidan_generation'); p.addFlag('political_active'); p.setMem('ukrEuromaidan', true); },
      },
      {
        text: 'You support from the edges — food, shelter, solidarity.',
        tag: null,
        outcome: 'The perimeter held by the people who brought food and blankets is also part of what the Maidan was.',
        effect: (p) => { p.m += 5; p.karma += 6; p.addFlag('euromaidan_generation'); p.setMem('ukrEuromaidan', true); },
      },
      {
        text: 'You watch from home, frightened of where this is going.',
        tag: null,
        outcome: 'Where it goes: Crimea annexed in March. Donbas in April. Eight years of low-grade war. Then 2022. The fear was accurate about the cost. It was not wrong.',
        effect: (p) => { p.r += 6; p.m -= 3; p.addFlag('euromaidan_generation'); p.setMem('ukrEuromaidan', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_donbas_2014',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2014 && G.currentYear <= 2021 &&
      G.age >= 10 &&
      !G.mem?.ukrDonbas,
    text: 'April 2014. Donetsk. The "people\'s republic" is declared. Armed men, some in Russian military equipment with the insignia removed, take the administration building. The map of Ukraine changes and then the change is not officially acknowledged by Russia. The city you grew up in, or the city near you, or the region whose name you have known your whole life, is now the other side of a contact line that runs through the steppe. People leave. People stay. The line moves and then it stabilises and then it becomes eight years of a frozen conflict that is not frozen for the people on either side of it.',
    choices: [
      {
        text: 'You leave. The city is no longer safely yours.',
        tag: null,
        outcome: 'You move west with what you can carry. Internally displaced. The country you are internally displaced within is the same country. The place you came from is now on the other side of a contact line.',
        effect: (p) => { p.m -= 10; p.w -= 6; p.r += 5; p.addFlag('donbas_displaced'); p.setMem('ukrDonbas', true); },
      },
      {
        text: 'You stay. This is your home.',
        tag: null,
        outcome: 'You stay. Eight years of living near a line that is not a border. The shelling is periodic and you learn to calibrate what close means.',
        effect: (p) => { p.m -= 8; p.r += 7; p.h -= 3; p.setMem('ukrDonbas', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_invasion_2022',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      G.age >= 12 &&
      !G.mem?.ukrInvasion,
    text: (G) => {
      const place = G.place?.name || 'your city'
      return `February 24, 2022. The air raid sirens at 5am in ${place}. The explosions. The phone. Russian forces have entered from the north, from Crimea, from the east. Kyiv is shelled. Kharkiv is shelled. Mariupol — Mariupol will be besieged for eighty-six days. The first day: the bank queues, the petrol queues, the traffic out of the city. Zelensky does not leave. He films himself on a phone on a Kyiv street: "We are here." The country that the past eight years were a warning about is now the country that is happening.`
    },
    choices: [
      {
        text: 'You stay. This is your country and you are not leaving it.',
        tag: null,
        outcome: 'You stay through the first weeks, the first months. The city changes. You change. The country is fighting and you are part of the country.',
        effect: (p) => { p.m -= 15; p.h -= 5; p.karma += 8; p.addFlag('ukraine_2022_survivor'); p.setMem('ukrInvasion', true); },
      },
      {
        text: 'You take the children west. Then further west.',
        tag: null,
        outcome: 'The border. The line of cars. The train west to Lviv and then to Poland or Slovakia or Germany. Eight million Ukrainians cross in the first year. You are among them. The country you are in is not the country you are from.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('ukraine_refugee_2022'); p.setMem('ukrInvasion', true); },
      },
    ],
    effect: null,
  },

]

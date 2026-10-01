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
    text: 'Your grandmother does not throw bread away. She smooths the crumbs into her palm when she has finished. You ask her once why, and she is quiet for longer than you expect. She was a child in 1932 and 1933, the years of the Hunger, which the government said were not happening. She does not speak about it directly. She speaks about bread.',
    context: 'The Holodomor famine of 1932-33 killed some 3.5 to 5 million people in Soviet Ukraine.',
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
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1991 && G.currentYear <= 1992 &&
      G.age >= 10 &&
      !G.mem?.ukrIndependence,
    text: 'August 24, 1991, and the Rada votes for independence, and on December 1 the country votes for it in the referendum, every region, Crimea included. On December 25 the Union is gone. Ukraine has been independent nine weeks when it becomes one of the heirs of a superpower. The first years are runaway inflation and nobody sure what the money is. The independence is also real.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 1992 && G.currentYear <= 2014 &&
      G.age >= 16 &&
      !G.mem?.ukrLanguage,
    text: 'Ukrainian or Russian. At school you were taught in one or the other depending on where you lived, and in Kyiv in 1990 most schools taught in Russian; by 2000 that has shifted. Which language you speak in which room with which person means something more than language. In the east it is different from the west, in private different from official. You choose every day, and the choice means something.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear === 2004 &&
      G.age >= 14 &&
      !G.mem?.ukrOrangeRev && !G.mem?.kyivOrangeRevolution,
    text: 'November 2004. Yanukovych is declared the winner, and the exit polls say Yushchenko won, and a million people come to Independence Square in orange scarves. The Supreme Court annuls the result and the revote in December goes the other way. The country said no to the count and the count changed. Yushchenko\'s face, poisoned with dioxin during the campaign, carries the evidence.',
    choices: [
      {
        text: 'You are on the Maidan. The orange is your color this month.',
        tag: null,
        outcome: 'It is cold. The tent city runs for weeks. Something happened here that left a template.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('orange_revolution_generation'); p.addFlag('political_active'); p.setMem('ukrOrangeRev', true); p.setMem('kyivOrangeRevolution', true); },
      },
      {
        text: 'You watch it unfold from home. The scale is extraordinary.',
        tag: null,
        outcome: 'You follow it on television. The Maidan you are watching is the same Maidan you will watch again in 2013.',
        effect: (p) => { p.m += 4; p.addFlag('orange_revolution_generation'); p.setMem('ukrOrangeRev', true); p.setMem('kyivOrangeRevolution', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_euromaidan_2013',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.age >= 14 &&
      !G.mem?.ukrEuromaidan && !G.mem?.kyivEuromaidan,
    text: (G) => {
      const year = G.currentYear
      if (year <= 2013) {
        return 'November 2013, and Yanukovych says he will not sign the agreement with Europe, and within hours students are on the Maidan. On November 30 the riot police beat them, and the city answers. By December the tent city is back: the field kitchens, the burning oil drums, priests walking the line between the crowd and the shields. Nobody on the square knows how it ends.'
      }
      return 'The Euromaidan: the agreement Yanukovych cancelled, the riot police beating the students, the burning barricades, the Heavenly Hundred, and Yanukovych fleeing to Russia in February. Within weeks, Crimea, then Donbas. You were there for the beginning of the chain.'
    },
    choices: [
      {
        text: 'You are there — the cold, the piano, the barricades.',
        tag: null,
        outcome: (G) => G.currentYear >= 2014 ? 'You are in the Maidan through January and February. You are there when the snipers fire. What happens in those weeks is the thing that produces everything that comes after.' : 'You are in the Maidan through December. The cold gets into your boots and stays there. You go back the next day, and the next.',
        effect: (p) => { p.m -= 8; p.m += 10; p.karma += 10; p.r += 6; p.addFlag('euromaidan_generation'); p.addFlag('political_active'); p.setMem('ukrEuromaidan', true); p.setMem('kyivEuromaidan', true); },
      },
      {
        text: 'You support from the edges — food, shelter, solidarity.',
        tag: null,
        outcome: 'The perimeter held by the people who brought food and blankets is also part of what the Maidan was.',
        effect: (p) => { p.m += 5; p.karma += 6; p.addFlag('euromaidan_generation'); p.setMem('ukrEuromaidan', true); p.setMem('kyivEuromaidan', true); },
      },
      {
        text: 'You watch from home, frightened of where this is going.',
        tag: null,
        outcome: (G) => G.currentYear >= 2014 ? 'Where it goes: Crimea annexed in March. Donbas in April. The fear was accurate about the cost. It was not wrong.' : 'You watch the square on the television every night. You do not know yet what it will cost. You are afraid it will cost a great deal.',
        effect: (p) => { p.r += 6; p.m -= 3; p.addFlag('euromaidan_generation'); p.setMem('ukrEuromaidan', true); p.setMem('kyivEuromaidan', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ukr_donbas_2014',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2014 && G.currentYear <= 2021 &&
      G.age >= 10 &&
      !G.mem?.ukrDonbas,
    text: 'April 2014, Donetsk. Armed men, some in Russian kit with the badges taken off, take the administration building and declare a republic. The city you grew up in, or the one beside it, is now on the other side of a line through the steppe. People leave and people stay. The line moves, and then stops, and becomes eight years of a frozen war that is not frozen for anyone living near it.',
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
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Ukraine' &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      G.age >= 12 &&
      !G.mem?.ukrInvasion,
    text: (G) => {
      const place = G.place?.name || 'your city'
      return `February 24, 2022. The sirens in ${place} at five in the morning, the explosions, the phone. Kyiv is shelled, Kharkiv is shelled, and by evening there are queues at every bank and every petrol station and a line of cars out of the city. Zelensky does not leave. He films himself on a Kyiv street on a phone: "We are here." The country the past eight years were a warning about is happening now.`
    },
    context: 'Russian forces invaded from the north, from Crimea and from the east on 24 February 2022. Mariupol was besieged for 86 days.',
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

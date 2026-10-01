// Turkey depth arc — events supplementing events_ireland_turkey.js
// Covers: Atatürk alphabet reform, 2023 Kahramanmaraş earthquake,
// Syrian refugee hosting, lira crisis, Istanbul Convention withdrawal

export const TURKEY_EVENTS = [

  {
    id: 'tur_ataturk_alphabet',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1928 && G.currentYear <= 1950 &&
      G.age >= 15 &&
      !G.mem.turAtaturkAlphabet,
    text: 'The new letters are compulsory by decree. The Ottoman script your parents read, five hundred years of books and letters and official papers, is finished for the state. The fez is banned, and the call to prayer is in Turkish now. Mustafa Kemal is remaking the country from the alphabet up, and fast. You are learning to write your language in letters your grandparents cannot read.',
    choices: [
      {
        text: 'The new letters come quickly to you. You are positioned for the new century.',
        tag: null,
        outcome: 'The Latin script makes sense within weeks. You can read the new newspaper and the new signs and you are, in this, part of the country being built.',
        effect: (p) => { p.e += 5; p.addFlag('tur_ataturk_era'); p.setMem('turAtaturkAlphabet', true) },
      },
      {
        text: 'Your grandparents cannot read the new script. Something is being severed.',
        tag: null,
        outcome: 'You learn the new alphabet. You also watch your grandfather hold a newspaper and find nothing in it he can read. The rupture is not metaphorical and it is not temporary.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('tur_ataturk_era'); p.setMem('turAtaturkAlphabet', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_kahramanmaras_2023',
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2023 &&
      G.age >= 12 &&
      !G.mem.turKahramanmaras,
    text: 'February 6, 2023. Two earthquakes in a night, and buildings come down that were not supposed to, many of them buildings the government\'s construction amnesty had licensed instead of demolishing. The rescuers pull people out alive on the seventh day. Many are not pulled out at all. The questions about the permits begin before the dust settles.',
    context: 'The Kahramanmaraş earthquakes (magnitudes 7.8 and 7.7) killed more than 50,000 people in Turkey and Syria. A 2018 amnesty had registered millions of buildings with code violations.',
    choices: [
      {
        text: 'You are in the southeast. You know what it felt like from inside.',
        tag: null,
        outcome: 'The shaking at 4am. The silence after. The quality of concrete dust in winter air. Things you now know in your body that you did not know before.',
        effect: (p) => { p.m -= 18; p.h -= 8; p.r += 10; p.addFlag('tur_kahramanmaras_survivor'); p.addFlag('disaster_survivor'); p.setMem('turKahramanmaras', true) },
      },
      {
        text: 'You are elsewhere. You follow the count through the night.',
        tag: null,
        outcome: 'The numbers climb through the night and the next day and the day after. You read the construction amnesty reporting and the rescue feeds and the count that will not stop.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('tur_kahramanmaras_survivor'); p.setMem('turKahramanmaras', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_syrian_refugees',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2015 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      G.ethnicity !== 'arab_turkish' &&
      !G.mem.turSyrianRefugees,
    text: 'Hatay, Gaziantep, Şanlıurfa: the southern cities have Syrian streets now, with their own bakeries and Arabic schools and an economy running alongside. These people are here because their country was destroyed, and their being here is being organised into votes. The route to the Greek islands runs through your coast. You see the people and you see the politics. Which one you act on is another matter.',
    context: 'Turkey hosted about 3.6 million registered Syrian refugees at the peak, more than any other country.',
    choices: [
      {
        text: 'The neighbourhood changed around you. You adjust.',
        tag: null,
        outcome: 'The Arabic shop signs. The children who do not speak Turkish. A city absorbing an enormous movement of people faster than any city knows how to.',
        effect: (p) => { p.r += 4; p.addFlag('tur_refugee_host_generation'); p.setMem('turSyrianRefugees', true) },
      },
      {
        text: 'You know Syrians specifically — you work alongside them, hire them, or live near them.',
        tag: null,
        outcome: 'The Syrian mechanic who learned Turkish in eight months. The family from Aleppo in the apartment below. The presence that is not abstract but particular.',
        effect: (p) => { p.s += 3; p.karma += 5; p.addFlag('tur_refugee_host_generation'); p.setMem('turSyrianRefugees', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tur_lira_crisis',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      !G.mem.turLira,
    text: 'The lira loses nearly half its value in a year, and then more, and the president makes the central bank cut interest rates as inflation climbs, because he believes high rates cause it. Bread, petrol, anything with a dollar somewhere in how it is made follows the lira down. People with savings in lira watch them drain away month by month. For a while, the Turks who hold dollars are a different class.',
    context: 'Turkish inflation officially reached 85 percent in October 2022.',
    choices: null,
    effect: (p) => { p.m -= 10; p.wipeMoney(0.3); p.r += 7; p.addFlag('tur_lira_crisis_lived'); p.setMem('turLira', true) },
  },

  {
    id: 'tur_istanbul_convention',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      G.character.gender === 'female' &&
      !G.mem.turIstanbulConvention,
    text: 'March 2021: by presidential decree, Turkey leaves the Istanbul Convention, the treaty on violence against women that it was the first to sign and that carries the name of its own city. The women\'s march that follows is the largest in years. The organisations built around the convention\'s requirements are left with nothing to stand on, and the femicide figures do not improve. The government says the convention is incompatible with the Turkish family. You have a position.',
    choices: [
      {
        text: 'You join the protests. This is the line.',
        tag: null,
        outcome: 'The purple banners on Istiklal. The police cordons. You are counted among those who showed up — which is not nothing, and the decree proceeded anyway.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.addFlag('tur_istanbul_convention_generation'); p.addFlag('activist'); p.setMem('turIstanbulConvention', true) },
      },
      {
        text: 'You note it and stay home.',
        tag: null,
        outcome: 'The decree. The statistics. You follow the news and you do not go to Istiklal and the choice sits in you afterward in the way that unfought fights do.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('tur_istanbul_convention_generation'); p.setMem('turIstanbulConvention', true) },
      },
    ],
    effect: null,
  },

]

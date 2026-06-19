// Turkey depth arc — events supplementing events_ireland_turkey.js
// Covers: Atatürk alphabet reform, 2023 Kahramanmaraş earthquake,
// Syrian refugee hosting, lira crisis, Istanbul Convention withdrawal

export const TURKEY_EVENTS = [

  {
    id: 'tur_ataturk_alphabet',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 1928 && G.currentYear <= 1950 &&
      G.age >= 15 &&
      !G.mem.turAtaturkAlphabet,
    text: 'The Latin alphabet is mandatory by decree. The Ottoman script your parents read — the script of the Quran in its Ottoman rendering, of five hundred years of literature and official correspondence — is now illegal for state use. The fez is banned. The call to prayer must be given in Turkish, not Arabic. Mustafa Kemal is remaking the country from its linguistic foundations. The method is speed, not persuasion. You are learning to write your language in an alphabet your grandparents cannot read.',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2023 &&
      G.age >= 12 &&
      !G.mem.turKahramanmaras,
    text: 'February 6, 2023. Two earthquakes within hours: magnitude 7.8 and 7.7. The epicentre in Kahramanmaraş province. Fifty thousand dead in Turkey and Syria. Buildings collapse that were not supposed to collapse. The government\'s construction amnesty of 2018 — covering 144,000 structures built in violation of earthquake codes — licensed many of them instead of demolishing them. The disaster and the policy are not separable. Search teams pull people out alive on the seventh day. Many are not pulled out at all. The questions about the permits begin before the dust settles.',
    choices: [
      {
        text: 'You are in the southeast. You know what it felt like from inside.',
        tag: null,
        outcome: 'The shaking at 4am. The silence after. The specific quality of concrete dust in winter air. Things you now know in your body that you did not know before.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2015 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      G.ethnicity !== 'arab' &&
      !G.mem.turSyrianRefugees,
    text: 'Turkey hosts more Syrian refugees than any country in the world — 3.6 million at peak, by official count. Hatay, Gaziantep, Şanlıurfa: the southern cities are transformed. Syrian neighbourhoods have their own bakeries, their own Arabic-language schools, their own parallel economy. Two things are simultaneously true: these people are here because their country was destroyed, and the political economy of their presence is generating a resentment that is being organised into votes. The transit route through Turkey to Greece is the most-travelled in Europe. You see both the people and the politics. Which one you act on is something else.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      !G.mem.turLira,
    text: 'The lira loses 44 percent of its value against the dollar in 2021. Then more in 2022. The central bank cuts interest rates as inflation rises — an unorthodox policy the president insists upon, based on his stated belief that high interest rates cause inflation. Inflation reaches 85 percent in October 2022. The price of bread, petrol, everything with a dollar component in its production chain — which is most things — follows. People who had savings in lira watch the purchasing power drain over months. The Turks who hold dollars or euros are, for this period, a different class. The Turks who hold lira are a different problem.',
    choices: null,
    effect: (p) => { p.m -= 10; p.wipeMoney(0.3); p.r += 7; p.addFlag('tur_lira_crisis_lived'); p.setMem('turLira', true) },
  },

  {
    id: 'tur_istanbul_convention',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Turkey' &&
      G.currentYear >= 2021 &&
      G.age >= 18 &&
      G.character.gender === 'female' &&
      !G.mem.turIstanbulConvention,
    text: 'Turkey withdraws from the Istanbul Convention by presidential decree in March 2021. Turkey was the first country to sign it — the Convention on preventing and combating violence against women is named after the city. The withdrawal generates the largest women\'s protest march in years. The women\'s organisations that built legal and support systems around the Convention\'s requirements are left in a vacuum. The femicide statistics are not improving. The government\'s position is that the Convention\'s gender ideology is incompatible with Turkish family values. You have a position.',
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

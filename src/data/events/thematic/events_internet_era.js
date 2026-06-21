// Early internet and 1990s digital era texture events
// PC bang Seoul, cybercafé Lagos, AOL dial-up Iowa, early web across archetypes

export const INTERNET_ERA_EVENTS = [

  // ── EARLY INTERNET TEXTURE ─────────────────────────────────────────────────

  {
    id: 'internet_dialup_west',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1994 && G.currentYear <= 2001 &&
      G.age >= 13 && G.age <= 19 &&
      ['wealthy_west'].includes(G.character.country.archetype) &&
      !G.mem?.dialupFirst,
    text: 'The modem connects with a sound like two machines arguing — a wheeze, a handshake, a final negotiation — and then you are online. The phone line is occupied. No one can call in. You have been warned about this. The page loads one stripe at a time, top to bottom, and you wait for each stripe the way you would wait for something cooking.',
    choices: null,
    effect: (p) => { p.e += 4; p.addFlag('early_internet_generation'); p.setMem('dialupFirst', true); },
  },

  {
    id: 'internet_aol_iowa',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1996 && G.currentYear <= 2001 &&
      G.age >= 13 && G.age <= 19 &&
      G.character.country.name === 'United States' &&
      G.character.ruralUrban === 'rural' &&
      !G.mem?.aolFirst,
    text: 'The AOL disc came in the mail, unsolicited, the seventh one this year. The sound it makes when connecting is the sound of the century changing. You create a screen name that you will be embarrassed by in ten years. The first time someone in a chatroom asks A/S/L — age, sex, location — you understand instinctively that you are both present and anonymous in a way that has no precedent.',
    choices: null,
    effect: (p) => { p.s += 3; p.e += 3; p.addFlag('aol_generation'); p.addFlag('early_internet_generation'); p.setMem('aolFirst', true); },
  },

  {
    id: 'internet_pcbang_korea',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1998 && G.currentYear <= 2005 &&
      G.age >= 13 && G.age <= 22 &&
      G.character.country.name === 'South Korea' &&
      !G.mem?.pcbangFirst,
    text: 'The PC방 is open until four in the morning. The broadband is faster than anything you have encountered. You pay by the hour and lose track of hours. Starcraft is not a game here — it is infrastructure. The players around you are serious in the specific way that Seoul is serious about things it decides matter. The professional leagues are on television. You are aware this is something new in the world, though no one has named it yet.',
    choices: [
      {
        text: 'Practise seriously — there are tournaments',
        tag: null,
        outcome: 'You win enough small prizes to feel that skill has transferable value. The reflex training never fully leaves.',
        effect: (p) => { p.e += 5; p.s += 3; p.addFlag('pcbang_competitive'); p.setMem('pcbangFirst', true); },
      },
      {
        text: 'Go for the social experience — it is where everyone is',
        tag: null,
        outcome: 'The PC방 becomes a third space: not home, not school, but somewhere with its own specific warmth.',
        effect: (p) => { p.s += 5; p.m += 4; p.addFlag('early_internet_generation'); p.setMem('pcbangFirst', true); },
      },
    ],
  },

  {
    id: 'internet_cybercafe_lagos',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2000 && G.currentYear <= 2008 &&
      G.age >= 16 && G.age <= 28 &&
      G.character.country.name === 'Nigeria' &&
      !G.mem?.cyberFirst,
    text: 'The cybercafé on Allen Avenue charges by the hour and the connection drops three times a session. You learn to type everything in Notepad first. The queue for the functional machines is understood without being announced. Nollywood films are not online yet. What is online is email, and Yahoo Messenger, and a creeping sense that the world has a layer that used to be inaccessible and is now available, unevenly, at 200 naira per hour.',
    choices: [
      {
        text: 'Use it for education — courses, resources, research',
        tag: null,
        outcome: 'You find materials that your school does not have. The gap between what is possible and what your institution provides becomes legible in a new way.',
        effect: (p) => { p.e += 6; p.addFlag('self_educated_online'); p.setMem('cyberFirst', true); },
      },
      {
        text: 'Use it for connection — diaspora family, international friends',
        tag: null,
        outcome: 'The cousin in London is suddenly not so far. The specific loneliness of a family scattered by emigration shrinks slightly.',
        effect: (p) => { p.s += 4; p.m += 4; p.addFlag('early_internet_generation'); p.setMem('cyberFirst', true); },
      },
    ],
  },

  {
    id: 'internet_cybercafe_egypt',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2000 && G.currentYear <= 2009 &&
      G.age >= 16 && G.age <= 28 &&
      G.character.country.name === 'Egypt' &&
      !G.mem?.cyberFirst,
    text: 'The internet café in Cairo is where the city\'s young middle class disappears in the evenings. The connection is real but the government\'s relationship to it is not yet settled — they do not know yet what it is or what to do about it. MSN Messenger is where you can say things that cannot be said in the street. There are chat groups organized around politics. Nobody uses their real name.',
    choices: null,
    effect: (p) => { p.e += 4; p.s += 3; p.addFlag('early_internet_generation'); p.addFlag('digital_dissent_aware'); p.setMem('cyberFirst', true); },
  },

  {
    id: 'internet_vkontakte_russia',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2006 && G.currentYear <= 2012 &&
      G.age >= 16 && G.age <= 28 &&
      G.character.country.name === 'Russia' &&
      !G.mem?.vkFirst,
    text: 'VKontakte launched a year ago, designed by a student who had visited Facebook and built something faster for the Russian internet. The difference from the Western platforms: here you can find any film, any album, any book — the copyright economy does not fully apply. Entire libraries of Soviet cinema are indexed. The freedom is a different kind than the Americans have, and no less real.',
    choices: null,
    effect: (p) => { p.e += 3; p.s += 4; p.addFlag('early_internet_generation'); p.addFlag('runet_generation'); p.setMem('vkFirst', true); },
  },

  {
    id: 'internet_lan_house_brazil',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2000 && G.currentYear <= 2008 &&
      G.age >= 13 && G.age <= 22 &&
      G.character.country.name === 'Brazil' &&
      !G.mem?.lanFirst,
    text: 'The *lan house* on the corner charges R$1.50 an hour. The machines are slow but present. Orkut — not Facebook, not yet — is how you exist socially online. Brazil has more Orkut users than the country that built it. There is something in this that your generation will spend years trying to explain to people who arrived later: the specific texture of a social network that was yours, before the world\'s version arrived and replaced it.',
    choices: null,
    effect: (p) => { p.s += 4; p.m += 3; p.addFlag('early_internet_generation'); p.addFlag('orkut_generation'); p.setMem('lanFirst', true); },
  },

  {
    id: 'internet_mobile_kenya',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2007 && G.currentYear <= 2013 &&
      G.age >= 18 && G.age <= 32 &&
      ['Kenya', 'Tanzania', 'Uganda'].includes(G.character.country.name) &&
      !G.mem?.mpesaFirst,
    text: 'M-Pesa launched last year. The phone you already have is now a bank account — not a metaphor, but the literal infrastructure that the formal banking system never built. You transfer money to your mother\'s phone in a village. The agent on the corner takes a small commission. Economists will later call this leapfrogging — skipping the stage that other countries went through — but you experience it as simply: this works.',
    choices: null,
    effect: (p) => { p.mo += 300; p.e += 3; p.addFlag('mobile_money_generation'); p.addFlag('digital_leapfrog'); p.setMem('mpesaFirst', true); },
  },

  {
    id: 'internet_facebook_first',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2006 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 30 &&
      ['wealthy_west', 'developing_urban', 'post_soviet'].includes(G.character.country.archetype) &&
      !G.mem?.facebookFirst,
    text: 'There is a version of yourself that now exists publicly, in a format you designed. You have uploaded photographs and listed interests and connected to people you have not spoken to since school. This feels like completion — finding the people you lost, accounting for yourself — and you do not yet know what other uses the architecture will be put to.',
    choices: null,
    effect: (p) => { p.s += 3; p.addFlag('social_media_arrived'); p.addFlag('early_internet_generation'); p.setMem('facebookFirst', true); },
  },

  {
    id: 'internet_smartphone_arrival',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2009 && G.currentYear <= 2014 &&
      G.age >= 18 && G.age <= 35 &&
      ['wealthy_west', 'wealthy_east', 'post_soviet', 'developing_urban'].includes(G.character.country.archetype) &&
      !G.mem?.smartphoneFirst,
    text: 'The internet is now in your pocket and you have not yet learned to put it down. The reflex forms quickly: bus stop, queue, a pause in conversation. You are always somewhere and also always elsewhere. Later you will try to identify the last period before this and will not be able to locate the exact day the before ended.',
    choices: null,
    effect: (p) => { p.s += 2; p.addFlag('smartphone_generation'); p.setMem('smartphoneFirst', true); },
  },

  {
    id: 'internet_90s_optimism',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1995 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 30 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      !G.mem?.dotcomOptimism,
    text: 'The decade has a specific confidence that will later seem naive, but is not naive now — it is warranted by the evidence available. The economy is growing. The wall came down. The web exists and is doubling every year. A friend from university has started a company that does something with servers and the valuation is larger than any rational basis would support, and everyone in the room knows this and invests anyway. The future is a place everyone is rushing toward.',
    choices: [
      {
        text: 'Invest in the enthusiasm — a startup, some shares, a bet',
        tag: null,
        outcome: 'It works, for a while. The crash, when it comes, costs something. Not everything.',
        effect: (p) => { p.mo += 3000; p.addFlag('dotcom_gambler'); p.setMem('dotcomOptimism', true); },
      },
      {
        text: 'Stay cautious — something about the valuations doesn\'t add up',
        tag: null,
        outcome: 'The crash, when it comes, validates something you held quietly. This is a small satisfaction and provides no income.',
        effect: (p) => { p.karma += 3; p.e += 4; p.addFlag('dotcom_sceptic'); p.setMem('dotcomOptimism', true); },
      },
    ],
  },

  {
    id: 'internet_dotcom_crash',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2000 && G.currentYear <= 2003 &&
      G.flags.includes('dotcom_gambler') &&
      !G.mem?.dotcomCrash,
    text: 'The NASDAQ falls 78% from its peak. The company whose shares you held is worth nothing, and then is worth less than nothing — the liabilities exceed the assets. The office closes. The specific atmosphere of the internet in 2001 is different from the internet in 1999: less confident, more careful, the word "business model" now used in earnest rather than as a detail to be addressed later.',
    choices: null,
    effect: (p) => { p.wipeMoney(0.4); p.m -= 8; p.addFlag('dotcom_survivor'); p.setMem('dotcomCrash', true); },
  },

  // ── 1990s TEXTURE ──────────────────────────────────────────────────────────

  {
    id: 'nineties_end_of_history',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1993 && G.currentYear <= 1999 &&
      G.age >= 20 && G.age <= 35 &&
      ['wealthy_west'].includes(G.character.country.archetype) &&
      !G.mem?.nineties_optimism,
    text: 'The decade has a specific logic: the Cold War ended; democracy is the world\'s default; prosperity is spreading in the right direction. A book argues that history itself has reached its conclusion. This sounds like hubris and is also partially accurate and you hold both things at once the way your generation has learned to hold things. The Rwanda news runs for a week and then the music news runs. You know this is not right and continue.',
    choices: null,
    effect: (p) => { p.m += 4; p.addFlag('end_of_history_generation'); p.setMem('nineties_optimism', true); },
  },

  {
    id: 'asian_crisis_personal_1997',
    phase: null,
    weight: 3,
    when: (G) =>
      G.currentYear >= 1997 && G.currentYear <= 1999 &&
      ['Thailand', 'Indonesia', 'South Korea', 'Malaysia', 'Philippines'].includes(G.character.country.name) &&
      !G.mem?.asianCrisisPersonal,
    text: 'The baht collapsed in July and the currency your salary was paid in lost a third of its value in a month. The IMF has arrived with conditions that the government accepted in a room with no cameras. What the conditions mean, practically: the government job your father relied on has a hiring freeze. The bank your savings were in is being restructured. The word restructuring means the same thing as the word collapse, spoken more quietly.',
    choices: [
      {
        text: 'Convert what remains to dollars or gold — protect what is left',
        tag: null,
        outcome: 'The dollar holds. You lose some in the conversion but stop losing more.',
        effect: (p) => { p.m -= 10; p.addFlag('crisis_survived_1997'); p.addFlag('asian_crisis_generation'); p.setMem('asianCrisisPersonal', true); },
      },
      {
        text: 'Keep the local currency — it cannot fall further',
        tag: null,
        outcome: 'It falls further.',
        effect: (p) => { p.wipeMoney(0.35); p.m -= 14; p.addFlag('asian_crisis_generation'); p.setMem('asianCrisisPersonal', true); },
      },
    ],
  },

]

// Eritrea arc events
// 9 events: liberation war childhood, independence day 1993, border war 1998,
// national service indefinite, G-15 crackdown 2001, leaving decision,
// diaspora tax 2%, Sinai trafficking, late reckoning.

const IS_ERITREA = (G) => G.character.country?.name === 'Eritrea'

export const ERITREA_EVENTS = [

  {
    id: 'eri_liberation_childhood',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1991 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.eriLibChild,
    text: 'The fighters come through sometimes, not the Ethiopian soldiers but your own people, the EPLF, at night, gone by morning, leaving a word with your father, food, a pamphlet you must not show at school. At school the lessons are in Amharic, which is not your language, and the map shows Eritrea as Ethiopia\'s northernmost province. At home you are taught something else. The two accounts live in you side by side, and you know which one to say aloud, and where.',
    choices: null,
    effect: (p) => {
      p.m += 3; p.e += 5; p.s -= 2;
      p.addFlag('eritrean_liberation_generation');
      p.setMem('eriLibChild', true);
    },
  },

  {
    id: 'eri_independence_1993',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 1993 && G.currentYear <= 1995 &&
      G.age >= 18 &&
      !G.mem?.eriIndep,
    text: 'April 1993, and the referendum result, and Asmara becomes a city that has never existed before. People pour into the streets, and people who have not seen each other in twenty years, scattered by the war, stand on the same corner weeping. All your life you have known what Eritrea was supposed to be. Now it exists, and the flag is different, and the flag matters. You will spend the rest of your life measuring things against this day.',
    context: 'In the April 1993 independence referendum 99.8 percent voted yes.',
    choices: null,
    effect: (p) => {
      p.m += 18; p.karma += 8;
      p.addFlag('eritrean_independence_generation');
      p.setMem('eriIndep', true);
    },
  },

  {
    id: 'eri_border_war_1998',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 1998 && G.currentYear <= 2001 &&
      G.age >= 20 &&
      !G.mem?.eriBorderWar,
    text: 'May 1998. The border dispute with Ethiopia becomes a war. It starts over Badme, a town neither country formally controlled, and it becomes something else: trench warfare, artillery, aerial bombardment, two countries that were one country now killing each other over lines drawn in Italian-era treaties. The death toll will reach seventy thousand. You are old enough to be called up. The national service that was supposed to be temporary — eighteen months, development work — now has no end date.',
    choices: [
      {
        text: 'You serve without question.',
        tag: 'served',
        outcome: 'The trench at Zalambessa. The soldiers across from you were Tigrinya-speaking Ethiopians; you spoke Tigrinya too; you could have been cousins. The absurdity of this does not protect you from the artillery.',
        effect: (p) => { p.h -= 12; p.m -= 15; p.addFlag('eri_border_war_veteran'); p.addFlag('eritrean_national_service'); },
      },
      {
        text: 'You find a way to stay out of the worst of it.',
        tag: 'avoided',
        outcome: 'Logistics, communications, rear positions. You survived the war in a different way from the ones at Badme. You do not know if survival is the right word for what you are carrying now.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.addFlag('eritrean_national_service'); },
      },
    ],
    effect: null,
  },

  {
    id: 'eri_national_service_indefinite',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2020 &&
      G.age >= 25 && G.age <= 45 &&
      G.flags.has('eritrean_national_service') &&
      !G.mem?.eriNSIndef,
    text: 'Your national service, which was supposed to end, does not, and the government has stopped saying when it will. You are paid a few hundred nakfa a month, and your commander can send you anywhere: a building site, a farm, a classroom in a remote town. You cannot leave the country without permission. It is not the poverty that makes Eritrea what it is now; it is the service with no end date, and the years you will not get back.',
    choices: [
      {
        text: 'You stay and endure it.',
        tag: 'stayed',
        outcome: 'The years pass. You build things you will never own, teach children in villages you would not have chosen, and wait for a release date that keeps not arriving.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.e += 3; p.addFlag('eri_national_service_endured'); p.setMem('eriNSIndef', true); },
      },
      {
        text: 'You begin planning to leave.',
        tag: 'planning',
        outcome: 'The decision takes months to make. Crossing into Sudan requires bribing guards or crossing in the dark at unpatrolled points. People are shot at the border. Some make it.',
        effect: (p) => { p.m -= 8; p.e += 5; p.addFlag('eri_flight_planned'); p.setMem('eriNSIndef', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'eri_g15_crackdown_2001',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 2001 && G.currentYear <= 2005 &&
      G.age >= 25 &&
      !G.mem?.eriG15,
    text: 'The paper you buy on the corner is not there in the morning and it is not there the morning after. Three of the men who wrote for it are people you have eaten with. The government paper prints the word traitors and prints no charges, because a charge would require a court. By the end of the month you have stopped asking anyone where they have gone, and so has everyone else.',
    context: 'In September 2001 eleven of the fifteen senior PFDJ officials who had signed an open letter calling for elections were arrested and held without charge or trial; most have never been seen since. Eritrea\'s independent newspapers were closed in the same week and their journalists detained. The constitution ratified in 1997 has never been implemented and no national election has been held.',
    choices: null,
    effect: (p) => {
      p.m -= 14; p.e += 5; p.karma -= 5;
      p.addFlag('eri_g15_witness');
      p.setMem('eriG15', true);
    },
  },

  {
    id: 'eri_leaving_decision',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_ERITREA(G) &&
      (G.flags.has('eri_flight_planned') || (G.currentYear >= 2005 && G.currentYear <= 2018)) &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.eriLeave,
    text: 'Tens of thousands leave every year, north into Sudan, across the Sahara to Libya, over the Mediterranean, or south to Ethiopia, or through Somalia and Kenya. None of the routes are safe, and some are run by people who will hold you for ransom or sell you on. You have heard things about the Sinai. You weigh them against staying.',
    choices: [
      {
        text: 'You cross into Sudan. The future is uncertain but the present is certain and it is this.',
        tag: 'left',
        outcome: 'The border crossing at night, the darkness of the Sudanese desert, and then the long sequence of decisions about what comes next. You are free in the way of having no protection from anyone.',
        effect: (p) => {
          p.m -= 5; p.h -= 10;
          p.addFlag('eritrean_refugee');
          p.addFlag('emigrated'); p.emigrateTo('Sudan');
          p.setResidency('refugee_status');
          p.setMem('eriLeave', true);
        },
      },
      {
        text: 'You stay. You do not see how leaving is survivable.',
        tag: 'stayed',
        outcome: 'The years will continue. The service will continue. You will find small bearable things within the unbearable structure. This is what most people do.',
        effect: (p) => {
          p.m -= 12; p.e += 3;
          p.addFlag('eri_national_service_endured');
          p.setMem('eriLeave', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'eri_sinai_trafficking',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eritrean_refugee') &&
      G.currentYear >= 2008 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.eriSinai,
    text: 'The Sinai trafficking network: Bedouin smugglers who brought Eritreans from Sudan into Egypt and then into Israel began in the mid-2000s to understand that the people crossing had relatives in the diaspora. The ransom calls were made from the Sinai; families in Tel Aviv, London, Frankfurt, received calls with their relative\'s voice and then the sound of what happened when the payment was late. You know someone who went through the Sinai. You do not know if they survived — they arrived somewhere eventually, but arrival is not the same as intact.',
    choices: null,
    effect: (p) => {
      p.m -= 18; p.r += 10; p.karma += 6;
      p.addFlag('eri_sinai_witness');
      p.setMem('eriSinai', true);
    },
  },

  {
    id: 'eri_diaspora_tax',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eritrean_refugee') &&
      G.currentYear >= 2002 &&
      !G.mem?.eriDiasporaTax,
    text: 'The PFDJ collects a two-percent diaspora tax from Eritreans living abroad. It is technically voluntary and technically not — without paying it, Eritrean state services are unavailable: registration of births, marriages, land transactions at home, travel documents in some cases. The collector visits Eritrean community events. The money goes to a government you left because of what that government was doing. You are asked to pay it. Your family, who did not leave, may need something that depends on your compliance.',
    choices: [
      {
        text: 'You pay it. Your family\'s needs come first.',
        tag: 'paid',
        outcome: 'The receipt is filed. Your name is in the list of compliant diaspora. You try not to think too precisely about what you have funded.',
        effect: (p) => { p.mo -= 800; p.m -= 8; p.karma -= 5; p.addFlag('eri_diaspora_tax_paid'); p.setMem('eriDiasporaTax', true); },
      },
      {
        text: 'You refuse.',
        tag: 'refused',
        outcome: 'The refusal is noted. Your family in Eritrea may face consequences you cannot predict and cannot prevent. The collector moves on to the next family. The pressure continues.',
        effect: (p) => { p.m -= 12; p.r += 8; p.karma += 8; p.addFlag('eri_diaspora_tax_refused'); p.setMem('eriDiasporaTax', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'eri_border_war_echo',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eri_border_war_veteran') &&
      G.age >= 35 &&
      !G.mem?.eriBorderWarEcho,
    text: 'Years after the trench at Zalambessa you read that the peace treaty awarded Badme to Eritrea — the town you fought over — and that Ethiopia refused to comply, and that the no-peace no-war state lasted another eighteen years. The thing you endured settled nothing. The border that cost seventy thousand lives remained, in practice, what it had been before. You do not know how to account for this arithmetic.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.r += 6; p.e += 3;
      p.setMem('eriBorderWarEcho', true);
    },
  },

  {
    id: 'eri_national_service_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eri_national_service_endured') &&
      G.age >= 55 &&
      !G.mem?.eriNSReckoning,
    text: 'You stayed and endured the service and you are still here. You try to count what those years were: the remote towns, the things built that you do not own, the children taught who you will not see grow. Other people left — fifty thousand a year crossing into Sudan, then the Sahara, then the sea. Some did not survive the crossing. You survived by not crossing. You are not certain which survival is the harder one to explain.',
    choices: null,
    effect: (p) => {
      p.m -= 6; p.r += 8; p.e += 5; p.karma += 4;
      p.setMem('eriNSReckoning', true);
    },
  },

  {
    id: 'eri_sinai_reckoning',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eri_sinai_witness') &&
      G.age >= 35 &&
      !G.mem?.eriSinaiReckoning,
    text: 'The person you knew who went through the Sinai — you learn eventually what happened in the specific. Not the whole story, but enough. The ransom calls, the duration, the conditions. They arrived. They are alive in the way that arrival permits. You know what the crossing costs without having paid it yourself, and you cannot weigh the one against the other.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 6; p.karma += 5;
      p.setMem('eriSinaiReckoning', true);
    },
  },

  {
    id: 'eri_late_reckoning',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      IS_ERITREA(G) &&
      G.flags.has('eritrean_independence_generation') &&
      G.age >= 55 &&
      !G.mem?.eriLateReckoning,
    text: 'You measure the country against what it was supposed to be: self-determination, a constitution, elections, dignity, things people died for, which the fighters practised in the field. None of it exists. The same man has ruled for thirty years without an election; the constitution was never put into force; a generation has gone into indefinite national service. The café where you celebrated in 1993 is still there in Asmara. You are somewhere else now, or still there, older than the country should have had to become.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 12; p.e += 5; p.karma += 8;
      p.addFlag('eritrean_late_reckoned');
      p.setMem('eriLateReckoning', true);
    },
  },

]

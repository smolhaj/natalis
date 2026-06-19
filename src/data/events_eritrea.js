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
    text: 'The fighters come through your area sometimes. Not the Ethiopian soldiers — your people. The EPLF. They move at night and by morning they are gone, but they leave things: a word with your father, food sometimes, a political education pamphlet that you are not supposed to show at school. The school you attend is Ethiopian-run and the language of instruction is Amharic, which is not your language. Your teacher explains the map of Ethiopia and Eritrea is not on it separately — it is a province, the northernmost. You have been taught something different at home. These two accounts of the same land live inside you side by side, and you have learned which one to speak aloud and where.',
    choices: null,
    effect: (p) => {
      p.m += 3; p.e += 5; p.s -= 2;
      p.addFlag('eritrean_liberation_generation');
      p.setMem('eriLibChild', true);
    },
  },

  {
    id: 'eri_independence_1993',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 1993 && G.currentYear <= 1995 &&
      G.age >= 18 &&
      !G.mem?.eriIndep,
    text: 'April 27, 1993. The results of the independence referendum come in — 99.8 percent voted yes — and Asmara becomes a city that has never existed before. People pour into the streets. There are people who have not seen each other in twenty years because the war took them to different countries and now they are standing on the same street corner weeping. You have known what Eritrea was supposed to be all your life. Now it exists. The Italian colonial buildings are still beautiful; the sky is still the same sky; but the flag is different and the flag matters. You know this is the best day of your life. You will spend the rest of your life measuring things against it.',
    choices: null,
    effect: (p) => {
      p.m += 18; p.karma += 8;
      p.addFlag('eritrean_independence_generation');
      p.setMem('eriIndep', true);
    },
  },

  {
    id: 'eri_border_war_1998',
    phase: 'young_adult',
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
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2020 &&
      G.age >= 25 && G.age <= 45 &&
      G.flags.has('eritrean_national_service') &&
      !G.mem?.eriNSIndef,
    text: 'The Warsay-Yikaalo development campaign: your national service, which was supposed to end, does not end. The government stopped saying when it will end. You earn 500 nakfa a month — roughly equivalent to thirty dollars. Your commander can assign you anywhere: construction, agriculture, teaching in a remote town, factory work. You have no legal right to leave the country without permission; your family cannot receive a visa without proof of your service. This is the thing that makes Eritrea what it is now. Not the poverty exactly — there are poor countries. It is the specific trap of the indefinite service, the years going by without an end date, the arithmetic of what you are losing that you will never get back.',
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
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_ERITREA(G) &&
      G.currentYear >= 2001 && G.currentYear <= 2005 &&
      G.age >= 25 &&
      !G.mem?.eriG15,
    text: 'September 2001. Eighteen senior PFDJ officials — the G-15 — publish an open letter calling for elections and a constitutional government. Eleven are arrested and held without trial. Seven fled the country in time. The independent newspapers that published the letter are shut overnight. The journalists who wrote for them are arrested. No charges are filed because charges would require a court. There is no court. Within a week, Eritrea has no independent press and no internal political opposition. The constitution ratified in 1997 has never been implemented. You read about this in a government paper that does not explain what happened to the arrested ministers — it describes them as traitors. You know three of the journalists personally.',
    choices: null,
    effect: (p) => {
      p.m -= 14; p.e += 5; p.karma -= 5;
      p.addFlag('eri_g15_witness');
      p.setMem('eriG15', true);
    },
  },

  {
    id: 'eri_leaving_decision',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      IS_ERITREA(G) &&
      (G.flags.has('eri_flight_planned') || (G.currentYear >= 2005 && G.currentYear <= 2018)) &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.eriLeave,
    text: 'Fifty thousand Eritreans leave every year. The crossing is northward: into Sudan, then through the Sahara to Libya, then the Mediterranean, then — if you survive — Europe or Israel. Or southward to Ethiopia, which is also dangerous. Or through Somalia and Kenya. None of the routes are safe. Some routes are run by traffickers who will hold you for ransom or sell you forward. You have heard specific things about the Sinai. You weigh this against staying.',
    choices: [
      {
        text: 'You cross into Sudan. The future is uncertain but the present is certain and it is this.',
        tag: 'left',
        outcome: 'The border crossing at night, the darkness of the Sudanese desert, and then the long sequence of decisions about what comes next. You are free in the specific way of having no protection from anyone.',
        effect: (p) => {
          p.m -= 5; p.h -= 10;
          p.addFlag('eritrean_refugee');
          p.addFlag('emigrated');
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
    phase: 'midlife',
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
    text: 'The person you knew who went through the Sinai — you learn eventually what happened in the specific. Not the whole story, but enough. The ransom calls, the duration, the conditions. They arrived. They are alive in the way that arrival permits. You carry the knowledge of what the crossing costs, which is different from carrying the cost yourself, and you know both things are real without knowing how to weigh one against the other.',
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
    text: 'You measure the country against what it was supposed to be. The independence movement said: self-determination, democracy, constitutional government, dignity. These were not just words — the EPLF had functioning democratic structures in the field; people risked their lives for them. The country that exists now has none of this. Isaias Afwerki has been in power for thirty years with no election scheduled. The constitution has not been implemented. A generation has been lost to indefinite service. The Italian-era café where you and your friends celebrated in 1993 is still there in Asmara. You are somewhere else now, or you are still there, older than the country has had to become.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.r += 12; p.e += 5; p.karma += 8;
      p.addFlag('eritrean_late_reckoned');
      p.setMem('eriLateReckoning', true);
    },
  },

]

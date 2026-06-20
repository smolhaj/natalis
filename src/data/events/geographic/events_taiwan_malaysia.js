// Taiwan and Malaysia arc events
//
// Taiwan: 228 Massacre 1947, martial law/white terror 1949-87, waishengren
//   (mainlander) experience, democratization, cross-strait tension, TSMC era
//
// Malaysia: May 13 1969 ethnic riots, NEP Bumiputera policy, Mahathir era,
//   Chinese/Indian minority experience, reformasi movement, GE14 2018

export const TAIWAN_MALAYSIA_EVENTS = [

  // ── TAIWAN ───────────────────────────────────────────────────────────────────

  {
    id: 'twn_228_massacre',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Taiwan' &&
      G.currentYear >= 1947 && G.currentYear <= 1948 &&
      G.age >= 6 &&
      !G.mem?.twn228,
    text: 'February 28, 1947. A cigarette seller is beaten by tax agents in Taipei; the crowd that gathers is fired on; protests spread across the island. For two weeks Taiwan is in uprising. Then Chiang Kai-shek sends troops from the mainland. In the following weeks and months, between 18,000 and 30,000 Taiwanese civilians are killed. The educated class is particularly targeted: lawyers, doctors, teachers, anyone who might lead. For the next forty years this event will not be spoken of. The official term is "the February 28 Incident." The date will be forbidden in public memory for four decades. You are old enough to know something happened.',
    choices: [
      {
        text: 'Someone in your family is taken or killed. The silence that follows is a specific kind of silence.',
        tag: null,
        outcome: 'The silence has a shape and a weight. You learn early that certain questions do not get answered. The not-answering is the answer.',
        effect: (p) => { p.m -= 15; p.r += 7; p.addFlag('taiwan_228_generation'); p.setMem('twn228', true); },
      },
      {
        text: 'You survive intact, your family intact, but the neighborhood is different afterward.',
        tag: null,
        outcome: 'The neighborhood is different in the specific way that a place is different when its educated people have been removed from it. You feel the absence without having a word for it.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 2; p.addFlag('taiwan_228_generation'); p.setMem('twn228', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'twn_white_terror',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Taiwan' &&
      G.currentYear >= 1950 && G.currentYear <= 1987 &&
      G.age >= 16 &&
      !G.mem?.twnWhiteTerror,
    text: 'Martial law has been in effect since May 1949. The Taiwan Garrison Command monitors political activity, correspondence, and associations. The KMT secret police — the Taiwan Investigation Bureau — arrests people for suspected communist sympathies, for speaking Taiwanese instead of Mandarin in certain contexts, for reading the wrong books. The White Terror period will last until 1987. You do not know yet how long it will last. What you know is that certain topics are not raised in certain rooms, and that the rooms multiply.',
    choices: [
      {
        text: 'You navigate the system carefully. The navigation becomes its own expertise.',
        tag: null,
        outcome: 'The expertise in what can be said in which room outlasts the room. You will be using it for decades after the rooms open up.',
        effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('martial_law_taiwan'); p.addFlag('learned_silence'); p.setMem('twnWhiteTerror', true); },
      },
      {
        text: 'You know someone who was arrested. The knowing changes how you move through the world.',
        tag: null,
        outcome: 'You know what the arrest looked like — how quickly it happened, what they took, how the person\'s family responded. This knowledge reorganizes the world.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('martial_law_taiwan'); p.setMem('twnWhiteTerror', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'twn_waishengren',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Taiwan' &&
      G.character.ethnicity?.id === 'waishengren' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 15 &&
      !G.mem?.twnMainlander,
    text: 'You came from the mainland — or your parents did — in 1949 when Chiang Kai-shek\'s government evacuated to Taiwan after losing the civil war to the Communists. The understanding was that it would be temporary: the retaking of the mainland was the official policy of the Republic of China government, the goal stated in every speech, on every military ID. The military housing you live in was supposed to be temporary. The years pass. The mainland becomes a memory your parents carry. You carry a different version of it — their version, not a place you remember, only a place you have been told about.',
    choices: [
      {
        text: 'You build a life in Taiwan. Temporary becomes permanent without anyone announcing it.',
        tag: null,
        outcome: 'The life you built is the life. The island your parents wanted to leave is the island you grew up on. These are different relationships to the same place.',
        effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('waishengren_generation'); p.setMem('twnMainlander', true); },
      },
      {
        text: 'You hold the mainland as somewhere real. The Taiwan you are in is provisional.',
        tag: null,
        outcome: 'The provisional status has its own texture: the military culture, the retaking that is always about to happen, the identity built around an absence. You carry this into your adult life.',
        effect: (p) => { p.r += 7; p.m -= 5; p.addFlag('waishengren_generation'); p.setMem('twnMainlander', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'twn_democratization',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Taiwan' &&
      G.currentYear >= 1987 && G.currentYear <= 1996 &&
      G.age >= 18 &&
      !G.mem?.twnDemocracy,
    text: (G) => {
      const year = G.currentYear
      if (year >= 1996) {
        return 'March 1996: the first direct presidential election in Taiwan\'s history. China fires missiles into the waters near Taiwan\'s ports in the weeks before the vote — a warning about independence ambitions. The US sends two aircraft carrier battle groups to the Taiwan Strait. On election day, the missiles have not stopped the vote. Lee Teng-hui wins with 54 percent. You vote for the first time in a presidential election. The ballot is yours to mark as you choose. This is new.'
      }
      return 'July 15, 1987: martial law ends. Thirty-eight years — the longest martial law in modern history. The day after, newspapers publish things they could not have published the day before. Political parties begin to organize — the DPP, which had been illegal, now isn\'t. The transition to democracy over the following decade is real and Taiwan-specific: not the velvet revolution, not the color revolutions, but a negotiated opening from within the KMT system that produces genuine pluralism.'
    },
    choices: [
      {
        text: 'You vote. The first time you are able to exercise this choice, you exercise it.',
        tag: null,
        outcome: 'The choice was yours to make. The making of it is different from having it made for you, even if the difference is not visible from outside.',
        effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('taiwan_democratic_generation'); p.setMem('twnDemocracy', true); },
      },
      {
        text: 'The transition feels incomplete. Democracy arrived but certain structures did not change.',
        tag: null,
        outcome: 'The incompleteness is accurate and does not cancel the transition. Both can be true simultaneously.',
        effect: (p) => { p.m += 6; p.r += 4; p.addFlag('taiwan_democratic_generation'); p.setMem('twnDemocracy', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'twn_cross_strait_tension',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Taiwan' &&
      G.currentYear >= 2022 &&
      G.age >= 18 &&
      !G.mem?.twnCrossStrait,
    text: 'The Ukraine-as-Taiwan analogy is everywhere in 2022-2023. The Western press runs articles comparing Taiwan\'s situation to Ukraine\'s; Taiwanese analysts debate whether the comparison holds. China has increased military flights across the median line of the Taiwan Strait; a record number in one day: 56 aircraft. TSMC — Taiwan Semiconductor Manufacturing Company — makes chips that neither China nor the United States can afford to lose access to. The chip factory is Taiwan\'s strategic deterrent, people say. You live on the island that makes the chips the world depends on and that China considers part of its sovereign territory.',
    choices: [
      {
        text: 'You stay. Taiwan is your home and the question of what China might do is not more real than the life you have here.',
        tag: null,
        outcome: 'The life here is the life. The geopolitical situation is real and it is also background radiation — present but not what you organize your day around.',
        effect: (p) => { p.karma += 4; p.r += 3; p.addFlag('taiwan_cross_strait_generation'); p.setMem('twnCrossStrait', true); },
      },
      {
        text: 'You have thought about leaving. The thinking itself is part of what it is to live here now.',
        tag: null,
        outcome: 'The thinking does not commit you to leaving. It is part of the civic landscape: everyone knows someone who has thought about it.',
        effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('taiwan_cross_strait_generation'); p.setMem('twnCrossStrait', true); },
      },
    ],
    effect: null,
  },

  // ── MALAYSIA ──────────────────────────────────────────────────────────────────

  {
    id: 'mys_may13_1969',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Malaysia' &&
      G.currentYear === 1969 &&
      G.age >= 5 &&
      !G.mem?.mysMay13,
    text: (G) => {
      const eth = G.character.ethnicity?.id || ''
      if (eth === 'chinese_malaysian') {
        return 'May 13, 1969. After the opposition — supported heavily by the Chinese community — made gains in the federal election, violence erupts in Kuala Lumpur. Malay mobs attack Chinese businesses and homes. The government declares a state of emergency. The official death toll is 196; Chinese community leaders believe it was higher. You are Chinese in Malaysia in 1969 and the riots clarify something about the country that was always there but had not been stated this directly.'
      }
      if (eth === 'indian_malaysian') {
        return 'May 13, 1969. The post-election violence between Malays and Chinese in Kuala Lumpur kills hundreds. The emergency declaration suspends Parliament. Indians are not the primary targets but they are in the streets too, and the streets are dangerous. What the riots produce — the New Economic Policy, the explicit prioritisation of Malay rights — will shape your life and your children\'s lives in ways that take years to become visible.'
      }
      return 'May 13, 1969. Post-election violence between communities. Parliament suspended. Emergency declared. The National Operations Council governs for two years. What comes out of the crisis is the New Economic Policy: a restructuring of Malaysian society designed to increase Malay economic participation through quotas, reservations, and preferences. The NEP defines the next fifty years of Malaysian life. You grow up in the Malaysia it creates.'
    },
    choices: [
      {
        text: 'You absorb the fact of what happened. The riots are the explanation for the world you are growing up in.',
        tag: null,
        outcome: 'The explanation organizes the world without resolving it. You carry both the fact and the world it produced.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 3; p.addFlag('may13_generation'); p.setMem('mysMay13', true); },
      },
      {
        text: 'You do not understand what happened. Adults explain it in different ways depending on who they are.',
        tag: null,
        outcome: 'The different explanations are themselves information about what the riots meant to different communities. You are learning this before you have the language for it.',
        effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('may13_generation'); p.setMem('mysMay13', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'mys_nep_experience',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Malaysia' &&
      G.currentYear >= 1971 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem?.mysNEP,
    text: (G) => {
      const eth = G.character.ethnicity?.id || ''
      if (eth === 'chinese_malaysian') {
        return 'The New Economic Policy. University places have reserved quotas for Bumiputera students — Malay and indigenous. You are Chinese. Your matriculation result qualifies you for the course you want; the quota means you do not get in. This is not a secret or a rumour — it is the policy, openly stated. Some Chinese families send children to private colleges, to Singapore, to Australia. Some study something else. The NEP has been in effect since 1971 and will remain in effect, under various names, for the rest of your life.'
      }
      if (eth === 'indian_malaysian') {
        return 'The New Economic Policy was designed for the Malay majority. Indians are neither Bumiputera nor Chinese — they occupy a specific position: not the target of the policy, not the beneficiary either. The Tamil school system is under-resourced. The rubber estate communities where your grandparents worked have been disrupted by palm oil. The NEP\'s vision of Malaysian unity has a specific shape that does not quite include the Tamil community in the way it was promised.'
      }
      return 'The New Economic Policy: 30 percent Bumiputera ownership targets, university quotas, business licence preferences, government contract reservations. You are Malay. The policy is designed for you — to build Malay economic participation that was historically below your population share. The policy works by some measures and creates resentments that also need to be managed. You live in the Malaysia the NEP produces.'
    },
    choices: [
      {
        text: 'You find a way to what you want, through the system as it is.',
        tag: null,
        outcome: 'The way through is the way through. Some ways are longer than others. The length is itself information.',
        effect: (p) => { p.e += 4; p.r += 4; p.addFlag('nep_generation_malaysia'); p.setMem('mysNEP', true); },
      },
      {
        text: 'The policy shapes you in ways that take years to name.',
        tag: null,
        outcome: 'What shapes you without your choosing it becomes part of who you are. The naming comes later. The shaping is already done.',
        effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('nep_generation_malaysia'); p.setMem('mysNEP', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'mys_reformasi',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Malaysia' &&
      G.currentYear >= 1998 && G.currentYear <= 2004 &&
      G.age >= 18 &&
      !G.mem?.mysReformasi,
    text: 'September 1998. Anwar Ibrahim — Deputy Prime Minister, Mahathir\'s chosen successor — is arrested, charged with sodomy and corruption, beaten by the police chief while handcuffed. The charges are widely believed to be fabricated to neutralize a political rival. The word that emerges from the protests that follow: reformasi. Reformation. The UMNO government has been in power for forty-one years. Mahathir runs the country from a position that admits no real accountability. The reform movement is real and is being suppressed. You are watching both.',
    choices: [
      {
        text: 'You join the reformasi protests. This is where you find yourself able to be.',
        tag: null,
        outcome: 'The protests are suppressed. The movement persists in a different form. The political landscape takes twenty years to change. You were there when it started.',
        effect: (p) => { p.karma += 6; p.m -= 5; p.addFlag('reformasi_generation'); p.setMem('mysReformasi', true); },
      },
      {
        text: 'You watch. Reformasi is real and so is what happens to people who are in the street.',
        tag: null,
        outcome: 'The watching is a position. It does not prevent the watching from being a position.',
        effect: (p) => { p.r += 5; p.m -= 3; p.addFlag('reformasi_generation'); p.setMem('mysReformasi', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'mys_ge14_2018',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Malaysia' &&
      G.currentYear === 2018 &&
      G.age >= 21 &&
      !G.mem?.mysGE14,
    text: 'May 9, 2018. The 14th General Election. UMNO — which has governed Malaysia without interruption since independence in 1957 — loses for the first time. Pakatan Harapan wins. Mahathir Mohamad, now 92, who governed as Prime Minister from 1981 to 2003 and is now running against his old party, becomes Prime Minister for the second time. The transfer of power is peaceful. Sixty-one years of one-party rule ends in an election. The morning after is a specific feeling.',
    choices: [
      {
        text: 'You stayed up for the results. The morning is a different morning.',
        tag: null,
        outcome: 'The morning after the first opposition victory in sixty-one years is a morning that does not quite feel like other mornings. You know this from the inside.',
        effect: (p) => { p.m += 12; p.karma += 5; p.addFlag('ge14_generation_malaysia'); p.setMem('mysGE14', true); },
      },
      {
        text: 'You are cautious. Power changed hands; the structures of power have not necessarily changed.',
        tag: null,
        outcome: 'The caution was warranted: the Pakatan Harapan government collapsed in 2020 after 22 months. The structures outlasted the election result. The result was still real.',
        effect: (p) => { p.m += 6; p.r += 4; p.addFlag('ge14_generation_malaysia'); p.setMem('mysGE14', true); },
      },
    ],
    effect: null,
  },

]

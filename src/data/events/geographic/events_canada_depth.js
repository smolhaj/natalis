// events_canada_depth.js — Canada depth arc

export const CANADA_DEPTH_EVENTS = [

  // ── can_dep_residential_school_inside ────────────────────────────────────

  {
    id: 'can_dep_residential_school_inside',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity === 'indigenous_canadian' &&
      G.currentYear >= 1940 && G.currentYear <= 1970 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.canResSchool,
    text: 'The school: a building at the edge of town administered by a church and funded by the federal government. They cut your hair in the first week. They give you a number. The language you speak at home is forbidden — a teacher hits the palm of your hand with a strap when you use it. You will hear later that the goal was to "kill the Indian in the child." The phrase belongs to a nineteenth-century bureaucrat but describes what you are living through in the 1950s or 1960s, which is the twentieth century. The home you came from is ninety kilometres away.',
    choices: [
      {
        text: 'You hold on — the language in secret, the ceremonies in your memory',
        tag: null,
        outcome: 'The things they could not reach stay alive in you. They exact a cost for keeping them. The cost is worth it. You will know this more clearly at forty than you know it now.',
        effect: (p) => { p.m -= 10; p.r += 7; p.h -= 4; p.addFlag('can_residential_school_survivor'); p.addFlag('minority_language_speaker'); p.setMem('canResSchool', true) },
      },
      {
        text: 'You survive by becoming what they want — the performance of assimilation',
        tag: null,
        outcome: 'The performance is total. You lose things you will spend decades trying to find the names for. You also survive. The school produced both outcomes in you and you have been living with both ever since.',
        effect: (p) => { p.m -= 14; p.r += 10; p.h -= 3; p.addFlag('can_residential_school_survivor'); p.setMem('canResSchool', true) },
      },
    ],
    effect: null,
  },

  // ── can_dep_japanese_internment ───────────────────────────────────────────

  {
    id: 'can_dep_japanese_internment_1942',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1942 && G.currentYear <= 1945 &&
      G.age >= 5 && G.age <= 20 &&
      !G.mem?.canJapInterned,
    text: 'Order-in-Council P.C. 1486, February 1942. All persons of Japanese origin must leave the hundred-mile Protected Area on the BC coast. Twenty-two thousand people. Your family has been in British Columbia for two generations — born here, raised here, fishing or farming or running a business. The property is seized and sold at a loss by the Custodian of Enemy Property. The proceeds go to pay for your own internment. You are sent to a sugar beet farm in Alberta or a work camp in the Rockies or a ghost town in the BC interior. The war ends in 1945. You are not permitted to return to the coast until 1949.',
    choices: [
      {
        text: 'Your parents tell you to prove your loyalty through silence and compliance',
        tag: null,
        outcome: 'Shikata ga nai — it cannot be helped. The phrase is both acceptance and survival strategy. You comply, you rebuild, you build something in the next place. What was lost is not spoken of for decades.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('can_japanese_internment_generation'); p.setMem('canJapInterned', true) },
      },
      {
        text: 'Your family protests — the Nisei who go to court, who write petitions',
        tag: null,
        outcome: 'The courts uphold the order. The protest is real and is not heard in the years you are living inside it. It is heard later, which is a different thing.',
        effect: (p) => { p.m -= 8; p.r += 8; p.karma += 4; p.addFlag('can_japanese_internment_generation'); p.setMem('canJapInterned', true) },
      },
    ],
    effect: null,
  },

  // ── can_dep_quiet_revolution ──────────────────────────────────────────────

  {
    id: 'can_dep_quiet_revolution_quebec',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1960 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.canQuietRev,
    text: 'The Quiet Revolution: not quiet from the inside. Duplessis is dead. Lesage is premier. The Catholic Church loses the schools and the hospitals it has run for two centuries — the state takes them back. Laïcisation. The Caisse de dépôt is created to invest Quebec pension money in Quebec. The state-owned Hydro-Québec hires engineers who speak French rather than English. Maîtres chez nous — masters in our own house. You are young in the years when the house changes from inside.',
    choices: [
      {
        text: 'You are part of the generation that builds the secular Quebec state',
        tag: null,
        outcome: 'The generation that builds the new institutions does not always inhabit them easily. You built something new in the space where the Church had been. What goes in that space is still being negotiated.',
        effect: (p) => { p.m += 4; p.e += 4; p.r += 3; p.addFlag('can_quiet_revolution_generation'); p.setMem('canQuietRev', true) },
      },
      {
        text: 'Your family is English-Canadian in Quebec — you watch the transformation from the outside',
        tag: null,
        outcome: 'The transformation that feels like liberation in French feels like displacement in English. You are watching the same thing from a different position. Both perceptions are accurate from where each person is standing.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('can_quiet_revolution_generation'); p.setMem('canQuietRev', true) },
      },
    ],
    effect: null,
  },

  // ── can_dep_komagata_maru ─────────────────────────────────────────────────

  {
    id: 'can_dep_komagata_maru_1914',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1914 && G.currentYear <= 1920 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.canKomagata,
    text: 'May 1914. The Komagata Maru steams into Burrard Inlet with 376 passengers — Sikhs, Hindus, Muslims, mostly Punjabi, all British subjects. The continuous journey requirement: immigrants must come directly from their country of origin without stopping. There is no direct steamship service from India to Canada. The regulation exists for exactly this purpose. The ship waits two months in the harbour. The passengers are denied food and water. The HMCS Rainbow — a Canadian warship — escorts the ship out of Canadian waters on July 23. When the Komagata Maru returns to Calcutta, British authorities open fire on the passengers at Budge Budge. Nineteen dead.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.karma += 3; p.addFlag('can_komagata_generation'); p.setMem('canKomagata', true) },
  },

  // ── can_dep_bathhouse_raids_1981 ──────────────────────────────────────────

  {
    id: 'can_dep_bathhouse_raids_1981',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 1981 && G.currentYear <= 1986 &&
      G.age >= 18 &&
      !G.mem?.canBathhouse,
    text: 'February 5, 1981. Operation Soap: two hundred Toronto police officers raid four bathhouses simultaneously. Three hundred men are charged as found-ins in a common bawdy house — the largest mass arrest in Toronto\'s history since the October Crisis. The next night, three thousand people march on 52 Division. It is the night that organises the Toronto gay community into a political force. The raids are the thing that makes the community legible to itself as a community rather than a subculture. You are in Toronto in the winter of 1981.',
    choices: [
      {
        text: 'You are at the bathhouses when the police come — you are among the arrested',
        tag: null,
        outcome: 'The charge, the court appearance, the name in the record. You become part of the three hundred. You also become part of the three thousand who march the next night. Both numbers matter.',
        effect: (p) => { p.m -= 8; p.r += 6; p.karma += 5; p.addFlag('can_bathhouse_raids_generation'); p.setMem('canBathhouse', true) },
      },
      {
        text: 'You march on 52 Division the night after — the community organising itself in real time',
        tag: null,
        outcome: 'The march is the beginning of something. You do not know what it is beginning. You know that three thousand people in the cold on Carlton Street in February is a number that means something has changed.',
        effect: (p) => { p.m -= 4; p.r += 5; p.karma += 5; p.addFlag('can_bathhouse_raids_generation'); p.setMem('canBathhouse', true) },
      },
    ],
    effect: null,
  },

  // ── can_dep_prairie_homestead ─────────────────────────────────────────────

  {
    id: 'can_dep_prairie_homestead',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1900 && G.currentYear <= 1945 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.canPrairie,
    text: 'The Homestead Act: 160 acres for ten dollars and the promise to break thirty acres within three years. Your family took the offer — Ukrainian or Mennonite or English or Scandinavian, depending on the wave and the decade. The quarter section is a mile from the nearest neighbour. The soil is black and deep and will grow wheat in good years and nothing in the drought years that are coming. The blizzard of 1907 or 1916 or 1936. The grasshoppers. The CPR freight rates that take the margin out of every bushel. The community that forms around the grain elevator, the school, the rink.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 4; p.h += 2; p.addFlag('can_prairie_homestead'); p.setMem('canPrairie', true) },
  },

  // ── can_dep_visible_minority_multicultural ────────────────────────────────

  {
    id: 'can_dep_visible_minority_multicultural',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.ethnicity !== 'white_canadian' &&
      G.currentYear >= 1971 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.canMulticultural,
    text: 'Trudeau\'s multiculturalism policy, 1971: the first in the world. Canada officially has no core culture — all cultures are equal, all are celebrated, all are Canadian. The policy produces both real protection and a particular kind of encounter: the dinner where someone asks where you are really from; the school where your heritage is showcased in February; the professional context where your name is mispronounced with cheerful indifference; the friend who says they don\'t see colour, which means they are not seeing you. Multiculturalism as policy and multiculturalism as experience are two different things you have learned to hold simultaneously.',
    choices: null,
    effect: (p) => { p.m -= 2; p.r += 4; p.e += 3; p.addFlag('can_visible_minority_multicultural'); p.setMem('canMulticultural', true) },
  },

  // ── can_dep_oil_sands_alberta ─────────────────────────────────────────────

  {
    id: 'can_dep_oil_sands_worker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Canada' &&
      G.currentYear >= 1995 && G.currentYear <= 2020 &&
      G.age >= 20 && G.age <= 45 &&
      G.career &&
      !G.mem?.canOilSands,
    text: 'Fort McMurray: the camp is a city of temporary buildings where temporary workers live two weeks on and one week off. The money is real — a truck driver earns more than a nurse in most provinces, and the trades pay like nothing else in the country. The camp has a gym and a canteen and a certain quality of loneliness that the money does not fix. The Athabasca oil sands are the third-largest oil reserve in the world. The tailings ponds are visible from space. You are doing the arithmetic of both things at thirty-two in a prefab room that smells of synthetic wood.',
    choices: [
      {
        text: 'The money makes things possible — the house in Red Deer, the RRSP, the kids\' education',
        tag: null,
        outcome: 'The camp is the mechanism. What it produces in the year-off life is the point. You have been doing this arithmetic for years and the answer keeps coming out the same: stay in the camp until you don\'t have to.',
        effect: (p) => { p.mo += 25000; p.m -= 4; p.w += 3; p.addFlag('can_oil_sands_worker'); p.setMem('canOilSands', true) },
      },
      {
        text: 'The camp is unsustainable — the boom doesn\'t last and neither does the body',
        tag: null,
        outcome: 'The price of oil moves without asking. The boom becomes the bust and the camp empties in a season. The specific quality of that emptying — the abandoned portable buildings, the trucks for sale — is the landscape of a resource economy from the inside.',
        effect: (p) => { p.mo += 10000; p.m -= 7; p.r += 5; p.addFlag('can_oil_sands_worker'); p.setMem('canOilSands', true) },
      },
    ],
    effect: null,
  },

]

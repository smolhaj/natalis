// events_vietnam.js
// Vietnam arc: southern experience post-1975, re-education camps, boat people,
// Doi Moi generation, post-reunification north/south divide, Viet Kieu.
// Fires for Vietnamese characters across relevant phases and years.

export const VIETNAM_EVENTS = [

  // ── SOUTH VIETNAM: POST-1975 EXPERIENCE ─────────────────────────────────────

  {
    id: 'vn_class_reclassification',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem.vnClassReclassification &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1975 && G.currentYear <= 1980 &&
      G.flags.includes('south_vietnamese') &&
      G.age >= 5,
    text: 'Your family is filling in forms. The forms ask what your father did before liberation. The words your father used to describe his work — administrator, officer, teacher at a government school — each one is now a category the new government has opinions about. Your mother writes carefully. The wrong word means a different kind of future. You watch her hand pause over the paper.',
    choices: [
      {
        text: 'Your family writes the truth',
        tag: null,
        outcome: 'The truth costs what it costs. What follows is predictable and takes years.',
        effect: (p) => { p.m -= 10; p.w -= 8; p.addFlag('bourgeois_classification'); p.setMem('vnClassReclassification', true) },
      },
      {
        text: 'Your family adjusts the truth',
        tag: null,
        outcome: 'The adjustment works, for now. Every subsequent form requires remembering what the previous form said.',
        effect: (p) => { p.m -= 6; p.e += 4; p.addFlag('hidden_class_background'); p.setMem('vnClassReclassification', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'vn_reeducation_camp',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem.vnReeducationCamp &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1975 && G.currentYear <= 1983 &&
      G.flags.includes('south_vietnamese') &&
      G.age >= 6,
    text: (G) => {
      return 'Your father — or your uncle, or your neighbour — was told the re-education would take a few weeks. A month at most. He packed for two weeks. He is gone for ' + (G.currentYear >= 1978 ? 'three years' : 'one year') + '. When he comes back he is thinner and he does not talk about it. Not to you, not to your mother, not in the house. The silence is not neutral. The silence is what he learned to do in order to come back at all.'
    },
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('reeducation_family'); p.setMem('vnReeducationCamp', true) },
  },

  {
    id: 'vn_new_economic_zone',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem.vnNewEconomicZone &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1975 && G.currentYear <= 1985 &&
      G.flags.includes('south_vietnamese') &&
      G.age >= 7,
    text: 'The government has a programme: urban families are to be relocated to new economic zones in the countryside or the Mekong Delta frontier, where they will clear jungle and farm. The zone your family has been assigned is four hours from Saigon. The apartment you grew up in has been allocated to a new family from the north. You take what you can carry. The zone has no electricity and the soil is not good.',
    choices: [
      {
        text: 'Go — resistance is futile',
        tag: null,
        outcome: 'The zone is what it was described as. Your family survives it. The years there do not leave.',
        effect: (p) => { p.w -= 12; p.h -= 8; p.m -= 12; p.addFlag('new_economic_zone'); p.setMem('vnNewEconomicZone', true) },
      },
      {
        text: 'Avoid it — stay in the city by any means',
        tag: null,
        outcome: 'Staying costs money you do not have in a formal way, and connections you cultivate carefully. The city keeps you.',
        effect: (p) => { p.w -= 6; p.m -= 8; p.s += 4; p.addFlag('evaded_relocation'); p.setMem('vnNewEconomicZone', true) },
      },
    ],
    effect: null,
  },

  // ── THE BOAT DECISION ────────────────────────────────────────────────────────

  {
    id: 'vn_boat_decision',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.vnBoatDecision &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1977 && G.currentYear <= 1990 &&
      (G.flags.includes('south_vietnamese') || G.flags.includes('bourgeois_classification') || G.flags.includes('reeducation_family')) &&
      G.age >= 16 && G.age <= 35,
    text: (G) => {
      const year = G.currentYear
      if (year <= 1979) {
        return 'The broker has a boat. The price is gold — you have gold, or your family does, from the life before. The boat leaves in three days. If you go, you go without papers and without the certainty of where you will end up. If you do not go, you stay in a country that has categorised your family as the wrong kind of people, in a city that was once yours and is now something else.'
      }
      return 'A cousin has already left. Word came back — they are in a camp in Malaysia. The camp is not good but they are alive. The boat your contact knows about leaves from Vũng Tàu in two weeks. The price is three taels of gold per person. Your entire family could go or just you.'
    },
    choices: [
      {
        text: 'Go — take the boat',
        tag: null,
        outcome: 'The crossing takes four days. What happens on the water is not something you will speak of in detail. You arrive.',
        effect: (p) => { p.h -= 10; p.m -= 15; p.w -= 12; p.addFlag('boat_person'); p.addFlag('emigrated'); p.addFlag('south_vietnamese_diaspora'); p.setResidency('refugee_status'); p.setMem('vnBoatDecision', true) },
      },
      {
        text: 'Stay — build a life inside what exists',
        tag: null,
        outcome: 'The decision to stay is also a decision. What you build inside it is limited by the category you\'ve been assigned. The limits become ordinary.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('stayed_south_vietnam'); p.setMem('vnBoatDecision', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'vn_camp_wait',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.vnCampWait &&
      G.flags.includes('boat_person') &&
      G.currentYear >= 1977 && G.currentYear <= 1993 &&
      G.age >= 16,
    text: 'The camp is on a small island. There are more people than the camp was built for. The food allocation is calculated by UNHCR formula. You are a number on a form. The interview will determine which country, if any, will accept you. First interview, then screening, then waiting for the result, then appeal. Some people have been here two years. You have a neighbour who has been here four. He is teaching children in a makeshift classroom because there is nothing else to do with the time.',
    choices: [
      {
        text: 'Study, work within the camp — use the time',
        tag: null,
        outcome: 'The English you learn in the camp is the English you will use to rebuild.',
        effect: (p) => { p.e += 8; p.s += 4; p.m -= 6; p.setMem('vnCampWait', true) },
      },
      {
        text: 'Wait — endure it',
        tag: null,
        outcome: 'The endurance is its own education. You arrive in the resettlement country knowing how to wait without losing yourself.',
        effect: (p) => { p.m -= 10; p.r += 5; p.setMem('vnCampWait', true) },
      },
    ],
    effect: null,
  },

  // ── DOI MOI GENERATION ───────────────────────────────────────────────────────

  {
    id: 'vn_doi_moi_awakening',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.vnDoiMoiAwakening &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1988 && G.currentYear <= 1996 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.includes('emigrated'),
    text: (G) => {
      const year = G.currentYear
      if (year <= 1991) {
        return 'The market is different now. There are things in the stalls that were not there last year. A cassette player. Fabric in colours the state shops never carried. The price is negotiated, not announced. A relative who started a small business last year has a motorbike. The word for what is happening cannot be spoken plainly — it rhymes with capitalism — but the effect of it is that you are beginning to think about what you could do, what you could start, what the next ten years might look like.'
      }
      return 'The foreign companies have arrived. Joint ventures, the newspaper calls them. There are English-language classes at seven in the morning because that\'s the only time that doesn\'t overlap with work. The generation entering the workforce now is the first since 1975 that might do better than their parents. You are part of that generation. The question is what you do with it.'
    },
    choices: [
      {
        text: 'Start something — a small business, a side trade',
        tag: null,
        outcome: 'The paperwork requires a party connection you cultivate carefully. The business starts small and does not stay small.',
        effect: (p) => { p.w += 10; p.m += 6; p.e += 4; p.addFlag('doi_moi_entrepreneur'); p.setMem('vnDoiMoiAwakening', true) },
      },
      {
        text: 'Get a job with a foreign company — stable and different',
        tag: null,
        outcome: 'The salary is in dollars. The culture inside the office is not Vietnamese in ways you are still mapping.',
        effect: (p) => { p.w += 8; p.e += 6; p.s += 4; p.addFlag('doi_moi_generation'); p.setMem('vnDoiMoiAwakening', true) },
      },
      {
        text: 'Government position — still where the power is',
        tag: null,
        outcome: 'The salary is modest. The access is not. The access becomes the salary, in the way Vietnamese people have always known.',
        effect: (p) => { p.w += 5; p.s += 6; p.addFlag('doi_moi_generation'); p.setMem('vnDoiMoiAwakening', true) },
      },
    ],
    effect: null,
  },

  // ── NORTH/SOUTH DIVIDE ───────────────────────────────────────────────────────

  {
    id: 'vn_north_south_divide',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.vnNorthSouthDivide &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 18 && G.age <= 40,
    text: (G) => {
      const isSouth = G.flags.includes('south_vietnamese') || G.flags.includes('stayed_south_vietnam') || G.place?.region?.includes('South')
      if (isSouth) {
        return 'Your colleague from Hanoi has a different relationship with the war than you do. Not better or worse, but different: for their family, it ended in triumph. For yours, it ended in something the official vocabulary describes as liberation and your mother describes, quietly, in a different word. The colleague is not the enemy. The colleague is just from a different country that happens to have the same name.'
      }
      return 'Saigon is different from what the school books described — noisier, richer, faster, less ideological. People here bargain where people in Hanoi defer. There is a quality of commercial confidence that feels almost foreign. Reunification is forty years ago. The country is the same country. The two halves are not the same place.'
    },
    choices: null,
    effect: (p) => { p.e += 4; p.addFlag('north_south_awareness'); p.setMem('vnNorthSouthDivide', true) },
  },

  // ── VIET KIEU: OVERSEAS VIETNAMESE ──────────────────────────────────────────

  {
    id: 'vn_viet_kieu_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.vnVietKieuReturn &&
      G.flags.includes('south_vietnamese_diaspora') &&
      G.currentYear >= 1995 &&
      G.age >= 30,
    text: (G) => {
      const year = G.currentYear
      if (year <= 2000) {
        return 'You fly back for the first time since leaving on the boat. The Saigon you left and the Ho Chi Minh City you arrive in are the same geography and different cities. The street where you grew up has a coffee shop on the corner. The coffee shop has air conditioning. Your aunt is still alive. She sees you and says you have gotten fat in a tone that means she is glad you are alive.'
      }
      return 'The remittances you send home — every Tết, every major expense — make you a figure of some importance in the family. The family has built a house partly with your money. They also have opinions about how you live, why you are not yet married, why you do not come back. You are Việt kiều: overseas Vietnamese. The category carries prestige and condescension in equal measure.'
    },
    choices: [
      {
        text: 'Invest here — buy land, start something',
        tag: null,
        outcome: 'The investment requires a local partner to navigate land law. The partner is a cousin. This is both the right and the complicated choice.',
        effect: (p) => { p.w += 8; p.s += 5; p.addFlag('viet_kieu_investor'); p.setMem('vnVietKieuReturn', true) },
      },
      {
        text: 'Visit, send money, keep your distance',
        tag: null,
        outcome: 'The distance is geographic and generational. You are part of this family and apart from it simultaneously.',
        effect: (p) => { p.m -= 4; p.r += 6; p.setMem('vnVietKieuReturn', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'vn_remittance_family',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.vnRemittanceFamily &&
      G.flags.includes('boat_person') &&
      !G.flags.includes('south_vietnamese_diaspora') &&
      G.currentYear >= 1990 &&
      G.age >= 28,
    text: 'The wire transfer goes every month. Not all of it, but enough that your family in Vietnam can do things that would otherwise be impossible — send a younger sibling to university, repair the roof, manage a medical bill. You are two places simultaneously. The place you live and the place you fund. The weight of it is not a complaint. It is just the shape of your life.',
    choices: null,
    effect: (p) => { p.m -= 4; p.karma += 8; p.mo -= 500; p.addFlag('sends_remittances'); p.setMem('vnRemittanceFamily', true) },
  },

  // ── POST-DOI MOI GENERATION: 2000s+ ─────────────────────────────────────────

  {
    id: 'vn_communist_capitalist',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.vnCommunistCapitalist &&
      G.character.country.name === 'Vietnam' &&
      G.currentYear >= 1998 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 32,
    text: "You carry a party card in a country that is officially Communist and practically capitalist, where the general secretary gives speeches about Marxism-Leninism while Samsung has the largest smartphone factory on earth outside Korea, four hours away in Thái Nguyên. Your parents' generation navigated this as a contradiction. For you it is simply the water. You do not think of it as ideology. You think of it as logistics.",
    choices: null,
    effect: (p) => { p.e += 5; p.addFlag('doi_moi_generation'); p.setMem('vnCommunistCapitalist', true) },
  },

]

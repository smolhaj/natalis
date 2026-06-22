export const PALESTINE_DEPTH_EVENTS = [
  {
    id: 'pd_third_generation_key',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      (G.character.country?.name === 'Palestine' || G.flags.has('camp_is_home')) &&
      G.age >= 12 && G.age <= 18 &&
      G.currentYear >= 1995 &&
      !G.mem?.pdThirdGen,
    text: `The key is on a hook by the door. It has been there for as long as you have been alive. It was there for your father's life, and before that for your grandfather's — the one who carried it from the village in 1948. It is a real key, not symbolic; the lock it opened was real, in a house that was real. The house is no longer a house. The village exists on a different map now, under a different name. The key is for a door that is not there.`,
    choices: null,
    effect: (p) => {
      p.m -= 8;
      p.r += 15;
      p.addFlag('third_generation_refugee');
      p.setMem('pdThirdGen', true);
    },
  },

  {
    id: 'pd_unrwa_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.flags.has('camp_is_home') &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.pdUnrwa,
    text: `The school is run by UNRWA. The teachers are Palestinian, the books are UNRWA-issue, the classrooms are concrete. The curriculum teaches that you come from somewhere else. Palestine is in the geography textbook — the coastline, the olive groves, the names of cities: Haifa, Jaffa, Lydda. You have never been to any of these places. They are as real to you as anywhere you have never been, and also different from that, in a way you don't yet have words for.`,
    choices: null,
    effect: (p) => {
      p.e += 4;
      p.m -= 5;
      p.r += 8;
      p.addFlag('unrwa_educated');
      p.setMem('pdUnrwa', true);
    },
  },

  {
    id: 'pd_camp_as_city',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.flags.has('camp_is_home') || G.flags.has('third_generation_refugee')) &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.pdCampCity,
    text: `The camp has been here for seventy years. It has streets with names — people name streets — and a market that opens every morning, a mosque, a bakery that has been in the same family for two generations. Calling it "temporary" is a political position rather than a description of what it actually is. You have grown up in a city. It is officially a camp. These two things exist simultaneously in the same concrete and the same mornings.`,
    choices: null,
    effect: (p) => {
      p.m -= 6;
      p.e += 3;
      p.r += 8;
      p.setMem('pdCampCity', true);
    },
  },

  {
    id: 'pd_resettlement_rupture',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.flags.has('camp_is_home') || G.flags.has('third_generation_refugee')) &&
      G.currentYear >= 2000 &&
      G.age >= 25 && G.age <= 45 &&
      !G.mem?.pdResettlement,
    text: `The papers come after twenty-two years on the resettlement list. Sweden or Canada — the UNHCR official explains that this is an opportunity, which is correct, and which explains nothing about what it feels like to leave a place you have complained about your entire life and discover, at the airport, that you did not know you were attached to it. The attachment is not to the camp. It is to something the camp contains that you cannot take with you.`,
    choices: [
      {
        text: 'Take the resettlement. Survival means going.',
        tag: 'go',
        outcome: `You go. The new country is cold and correct and yours in a way the camp never officially was. The attachment travels with you regardless.`,
        effect: (p) => {
          p.setResidency('permanent_resident');
          p.addFlag('resettled');
          p.addFlag('expat');
          p.m -= 10;
          p.w += 6;
          p.setMem('pdResettlement', true);
        },
      },
      {
        text: 'Refuse. This is not the return that means something.',
        tag: 'refuse',
        outcome: `You turn down the resettlement. The list closes. You are still here, which is still not where you are from.`,
        effect: (p) => {
          p.m -= 8;
          p.r += 15;
          p.addFlag('refused_resettlement');
          p.setMem('pdResettlement', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pd_late_return_question',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('third_generation_refugee') || G.flags.has('camp_is_home')) &&
      G.age >= 55 &&
      !G.mem?.pdLateReturn,
    text: `You have outlived the question of return. Not answered it — outlived it. The return that was promised in UN resolutions, in political speeches, in your grandfather's voice when he talked about the house, is still promised. The house is now something else. Your children were born in the camp or in a third country; they carry the promise differently, the way you carry a weight whose original reason you have inherited rather than experienced. You are at an age where you can see what "still promised" means across seventy years.`,
    choices: null,
    effect: (p) => {
      p.r += 12;
      p.m -= 8;
      p.karma += 8;
      p.setMem('pdLateReturn', true);
    },
  },
];

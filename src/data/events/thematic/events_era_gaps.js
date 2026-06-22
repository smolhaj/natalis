export const ERA_GAP_EVENTS = [
  {
    id: 'eg_bengal_famine_child',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      (G.character.country?.name === 'India' || G.character.country?.name === 'Bangladesh') &&
      G.currentYear >= 1943 && G.currentYear <= 1945 &&
      G.age >= 4 && G.age <= 14 &&
      !G.mem?.bengalFamineChild,
    text: `Your mother boils pumpkin leaves because the rice is finished. This is not unusual now — the rice has been finished for a long time. The newspapers, when you see them, don't use the word famine. The wartime censors have decided that the word famine is bad for morale. What they print instead is "food scarcity" and "supply difficulties." The pumpkin leaves are bitter. You eat them.`,
    choices: null,
    effect: (p) => {
      p.h -= 15;
      p.m -= 12;
      p.addFlag('bengal_famine_generation');
      p.setMem('bengalFamineChild', true);
    },
  },

  {
    id: 'eg_bengal_famine_adult',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.character.country?.name === 'India' || G.character.country?.name === 'Bangladesh') &&
      G.currentYear >= 1943 && G.currentYear <= 1945 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.bengalFamineAdult,
    text: `They are walking from the villages into the city. Hundreds of them, then thousands. Too thin in a specific way — the arms, the legs — and the children quietest of all. The government requisitioned the rice for the war effort: denied it first, then requisitioned it. The word for what is happening is one the newspapers are not allowed to print. You can see it.`,
    choices: [
      {
        text: 'Give what you can — rice, money, anything.',
        tag: 'give',
        outcome: 'You give until giving hurts and then give a little more. It reaches perhaps thirty people. There are thousands.',
        effect: (p) => {
          p.mo -= 500;
          p.karma += 10;
          p.m -= 8;
          p.addFlag('bengal_famine_generation');
          p.setMem('bengalFamineAdult', true);
        },
      },
      {
        text: `Survive. You cannot feed the city.`,
        tag: 'survive',
        outcome: 'You do not give what you cannot spare. The logic is sound. The logic does not help with the memory.',
        effect: (p) => {
          p.r += 8;
          p.m -= 14;
          p.addFlag('bengal_famine_generation');
          p.setMem('bengalFamineAdult', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'eg_buenos_aires_neutrality',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Argentina' &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 15 && G.age <= 40 &&
      !G.mem?.baNeutrality,
    text: `The cafés on Corrientes are open. The trams run on schedule. Argentina is officially neutral and the city feels, on a Saturday afternoon, as though neutrality is the natural condition of things. The newspapers arrive from all sides — the British ones, the German ones, the American ones — and they describe the same events in languages that cannot agree on what the events mean. Europe is burning. Here the coffee is good.`,
    choices: [
      {
        text: 'Neutrality is the correct position. Argentina is not Europe.',
        tag: 'neutral',
        outcome: 'You hold this position with less certainty as the war continues and its scale becomes clear.',
        effect: (p) => {
          p.e += 3;
          p.addFlag('buenos_aires_neutral_generation');
          p.setMem('baNeutrality', true);
        },
      },
      {
        text: 'Neutrality feels like complicity. The comfortable distance is a choice too.',
        tag: 'complicity',
        outcome: 'You argue about it in the cafés. Arguing changes nothing, but it is what you have.',
        effect: (p) => {
          p.m -= 6;
          p.karma += 6;
          p.addFlag('buenos_aires_neutral_generation');
          p.setMem('baNeutrality', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'eg_independence_broken_promise',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1968 && G.currentYear <= 1980 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.independencePromise,
    text: `Independence was fifteen or twenty years ago. The men who replaced the colonisers look increasingly like them — the same offices, the same cars, the same distance between those who decide and those who are decided about. The schools are fewer than promised. The roads stop at the old administrative boundary, which was drawn by people who are gone but whose boundary remains. The word used now is "development." It is a different word for the same waiting.`,
    choices: [
      {
        text: 'Work for the system. Change it from inside.',
        tag: 'system',
        outcome: 'You enter the structure. The structure is patient and large and has absorbed people like you before.',
        effect: (p) => {
          p.w += 5;
          p.e += 3;
          p.m -= 6;
          p.addFlag('independence_disillusionment');
          p.setMem('independencePromise', true);
        },
      },
      {
        text: 'Refuse to serve this state. It is not what was promised.',
        tag: 'refuse',
        outcome: 'You step outside the structure. The structure does not notice, but you do.',
        effect: (p) => {
          p.m -= 8;
          p.karma += 8;
          p.addFlag('independence_disillusionment');
          p.setMem('independencePromise', true);
        },
      },
    ],
    effect: null,
  },
];

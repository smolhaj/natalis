// Mongolia depth arc events
// Angles not in events_mongolia.js: Naadam childhood, Genghis Khan rehabilitation
// post-1990, traditional script revival, Buddhism revival (gates stalinist_purge_family_memory),
// cashmere goat economy, Oyu Tolgoi mining debate, Inner Mongolia connection,
// Ulaanbaatar winter air crisis.

const IS_MONGOLIA = (G) => G.character.country?.name === 'Mongolia'

export const MONGOLIA_DEPTH_EVENTS = [

  {
    id: 'mn_dep_naadam_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.mnNaadam,
    text: 'The Naadam festival: three days in July, the Three Games. The wrestlers in their open-fronted jackets and tight shorts, the names for the ranks they earn — elephant, falcon, garuda. The horse race is run over thirty kilometres and the jockeys are children your age, riding without saddles. The archers aim from seventy-five metres, fingers bare. This is what the country has been for a thousand years, the teacher says. The Soviet government did not cancel Naadam because Naadam could not be cancelled without cancelling the people.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.addFlag('mn_naadam_childhood'); p.setMem('mnNaadam', true) },
  },

  {
    id: 'mn_dep_genghis_rehabilitation',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 1990 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.mnGenghis,
    text: 'The teacher is telling you about Genghis Khan, who is now officially a hero. Your grandparents were taught he was a feudal warlord better not celebrated. After 1990 he is on the money and the airport is named after him, and an enormous steel horseman stands on the steppe outside the city. You grow up learning that the largest land empire in history began here, with horsemen who could shoot backwards at a gallop, and that this is something to be proud of.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.addFlag('mn_genghis_rehabilitation_generation'); p.setMem('mnGenghis', true) },
  },

  {
    id: 'mn_dep_mongolian_script',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 1991 &&
      G.age >= 12 && G.age <= 18 &&
      !G.mem?.mnScript,
    text: 'The school is teaching traditional Mongolian script as a required subject now. The script runs vertically, top to bottom, left to right — the opposite direction from Cyrillic, which is what you learned to read and write first. The letters connect differently from any alphabet you have used; the shapes are older than the Soviet Union, older than Russia, older than any country the word country could describe. In Inner Mongolia, across the Chinese border, your cousins have been using this script all along. You and they write the same language in the same script, but you are learning it as something recovered rather than continuous.',
    choices: [
      {
        text: 'Learn it properly — this is a connection to what was cut.',
        tag: 'embraced',
        outcome: 'The script is difficult. After a year you can read it slowly. After three years you write it without thinking. The feeling of writing your own name in the traditional letters is not something you expected to be moving.',
        effect: (p) => { p.e += 4; p.m += 3; p.addFlag('mn_mongolian_script_generation'); p.setMem('mnScript', true) },
      },
      {
        text: 'Learn enough to pass the exam. Cyrillic is what you need to function.',
        tag: 'pragmatic',
        outcome: 'You pass the exam. You lose the script again over the following years. The decision was practical. The loss was also real.',
        effect: (p) => { p.r += 3; p.addFlag('mn_mongolian_script_generation'); p.setMem('mnScript', true) },
      },
    ],
  },

  {
    id: 'mn_dep_buddhism_revival',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('stalinist_purge_family_memory') &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.mnBuddhism,
    text: 'The Gandantegchinlen monastery in Ulaanbaatar has reopened. Monks who survived in Inner Mongolia or Tibet or who were ordained in secret are training the first generation of Mongolian monks in fifty years. Your family hid the thangkas in the felt blanket for decades. Now you carry them to the monastery for the first time — not hiding them, carrying them in the street. The lama who examines them tells you their age and provenance and what they depict. They have been in your family since before the purge, which means they survived things that survived surviving. You leave with the same thangkas and a different relationship to what they are.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('mn_buddhism_revival_generation'); p.setMem('mnBuddhism', true) },
  },

  {
    id: 'mn_dep_cashmere_goats',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1995 &&
      G.age >= 18 &&
      !G.mem?.mnCashmere,
    text: 'The cashmere goat pays more per head than sheep or cattle, and in the nineties the buyers are clear about what they want. You shift the herd toward goats, slowly, then more. Later you see the problem: a goat pulls the grass out by the root where a sheep crops the top. At the edges, the steppe is turning to desert. What made sense in 1996 is part of what you watch go wrong by 2010.',
    choices: [
      {
        text: 'The income is necessary. The alternatives do not pay the same way.',
        tag: 'continued',
        outcome: 'You continue with the goats. The steppe change is also real. You live in both things at once, as most environmental decisions are made.',
        effect: (p) => { p.w += 3; p.r += 4; p.addFlag('mn_cashmere_steppe_awareness'); p.setMem('mnCashmere', true) },
      },
      {
        text: 'Return the herd toward a traditional mix. Less money, more steppe.',
        tag: 'returned',
        outcome: 'The decision costs money. The steppe around your area recovers slowly, grass by grass. The cashmere market continues without your goats.',
        effect: (p) => { p.karma += 5; p.m += 3; p.w -= 2; p.addFlag('mn_cashmere_steppe_awareness'); p.setMem('mnCashmere', true) },
      },
    ],
  },

  {
    id: 'mn_dep_oyu_tolgoi',
    phase: null,
    weight: 4,
    when: (G) =>
      G.age <= 49 &&
      IS_MONGOLIA(G) &&
      G.currentYear >= 2009 &&
      G.age >= 25 &&
      !G.mem?.mnOyu,
    text: 'Oyu Tolgoi in the South Gobi is one of the largest copper and gold deposits on earth, signed away to foreign companies for two thirds of the mine. The projections say it will be a third of the economy. The argument over it is the argument Mongolia has had since it stopped being a satellite: who owns what is under the ground, who controls it, where the money goes. In 2012 the government demands a bigger share. The investors call it resource nationalism. Mongolians call it arithmetic.',
    choices: [
      {
        text: 'The state should control more — this is Mongolia\'s mineral wealth',
        tag: 'nationalist',
        outcome: 'The renegotiation succeeded partially. The mine began production. The royalty dispute continued. The mine is generating money and the distribution is still being argued.',
        effect: (p) => { p.m += 4; p.addFlag('mn_oyu_tolgoi_generation'); p.setMem('mnOyu', true) },
      },
      {
        text: 'Foreign investment on stable terms is what makes the mine viable — renegotiation scares capital',
        tag: 'pragmatic',
        outcome: 'The argument for stable investment terms is the argument every resource country hears from the investors. The history of resource countries that accepted those terms is also available for study.',
        effect: (p) => { p.e += 3; p.addFlag('mn_oyu_tolgoi_generation'); p.setMem('mnOyu', true) },
      },
    ],
  },

  {
    id: 'mn_dep_inner_mongolia_connection',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      IS_MONGOLIA(G) &&
      G.age >= 25 &&
      !G.mem?.mnInnerMongolia,
    text: 'There are more ethnic Mongolians inside China than in Mongolia. Inner Mongolia Autonomous Region: four to five million people, the traditional script still in use, the language still spoken, a different trajectory for seventy years. You have family there or you know someone who does. The border that divided them from you was drawn in 1945 by Soviet and Chinese negotiation, not by Mongolians. In 2020 China announced that Mandarin would replace Mongolian as the primary language of instruction in Inner Mongolian schools. Thousands of parents kept their children home. The protests were one sentence in the international news.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.addFlag('mn_inner_mongolia_connection'); p.setMem('mnInnerMongolia', true) },
  },

  {
    id: 'mn_dep_ulaanbaatar_air',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 2010 &&
      (G.ruralUrban === 'urban' || G.flags.has('ger_district_migrant')) &&
      G.age >= 25 &&
      !G.mem?.mnAir,
    text: 'Ulaanbaatar in January. The ger districts at the edge of the city burn coal all night, and wood when there is no coal, and rubbish when there is no wood, and the valley holds the smoke in. The children\'s ward fills with breathing cases, and you know the cough the children at school have is not the ordinary cough. You have stood on the steppe in summer under the largest sky in the world. In the city in January the sky is grey-brown and close, and it costs something to breathe.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 4; p.addFlag('mn_ulaanbaatar_air_crisis'); p.setMem('mnAir', true) },
  },

]

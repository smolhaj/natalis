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
    text: 'The teacher is telling you about Genghis Khan, who is now officially a hero. This is new. Your grandparents were taught that Genghis Khan was a feudal warlord, a negative force in history, a figure better not celebrated. After 1990 he is on the money. The airport in Ulaanbaatar is named for him. An enormous steel statue of him on horseback stands forty metres tall on the Töv steppe. The currency bears his face. You grow up learning that the largest contiguous land empire in human history began here, with horsemen who could shoot backward at a gallop, and that this is something to be proud of.',
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
    phase: 'young_adult',
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
    text: 'The cashmere goat brings more money per animal than sheep or cattle. The market in the 1990s is clear: tourists, luxury buyers, European factories paying well for the fiber. You shift the herd toward goats — slowly at first, then more. The problem becomes visible later: goats eat differently from sheep. They pull the grass out by the root rather than grazing the top. They denude the steppe in a way that traditional herding never did. Mongolia\'s steppe is turning to desert at the edges. The calculation that made sense in 1996 is part of something you are watching degrade by 2010.',
    choices: [
      {
        text: 'The income is necessary. The alternatives do not pay the same way.',
        tag: 'continued',
        outcome: 'You continue with the goats. The money is real. The steppe change is also real. You live in both things simultaneously, which is how most environmental decisions are made.',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 2009 &&
      G.age >= 25 &&
      !G.mem?.mnOyu,
    text: 'The Oyu Tolgoi copper and gold mine in the South Gobi is one of the largest mineral deposits in the world. The government signed an agreement with Ivanhoe Mines and Rio Tinto — 66% foreign, 34% Mongolian state. Production begins in 2013. The projections say it will represent a third of GDP. The debate around it is the debate Mongolia has been having since it stopped being a Soviet satellite: who owns the resource, who controls it, what the money is for, where it goes. In 2012 the government renegotiated and demanded a larger share. The foreign investors called it a resource nationalism precedent. The Mongolians called it arithmetic.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
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
    text: 'Ulaanbaatar in January: the air quality index at 687 when the WHO guideline is 10. The ger districts at the city\'s edge burn coal through the night, wood when coal is unavailable, waste when wood is unavailable. The valley holds the air; the buildings trap it. The pediatric ward fills with respiratory cases. You know the masks help somewhat. You know the children you see at school with the cough that is not the normal cough. Mongolia has the largest sky in the world — you know this because you have stood on the steppe in summer and looked at it. The sky in the city in January is gray-brown and close and costs something to breathe.',
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 4; p.addFlag('mn_ulaanbaatar_air_crisis'); p.setMem('mnAir', true) },
  },

]

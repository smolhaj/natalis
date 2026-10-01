// Libya character events
// Historical arcs: Gaddafi's coup 1969, Green Book and Jamahiriya (direct democracy),
// pan-Arabism and pan-Africanism, oil revenue and welfare state, Lockerbie 1988,
// international sanctions 1992–2003, rehabilitation and WMD disclosure 2003–11,
// February 2011 uprising, NATO intervention, Gaddafi killed October 2011,
// post-Gaddafi fragmentation — two governments, militias, migration hub.

export const LIBYA_EVENTS = [

  {
    id: 'lby_gaddafi_jamahiriya',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 1975 && G.currentYear <= 1990 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.lbyJamahiriya,
    text: 'The Jamahiriya — the "state of the masses." Gaddafi\'s Green Book, published in 1975, is the theory: no political parties, no representative parliament, instead basic popular congresses where all citizens participate directly. In practice: the committees, the informers, the Revolutionary Guards who operate outside any judicial framework, the colleagues who disappear. The oil revenue funds free healthcare, free education, heavily subsidised housing. The contradictions are present from childhood — material comfort and arbitrary power operating simultaneously.',
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 5; p.r += 4; p.addFlag('libyan_jamahiriya_generation'); p.setMem('lbyJamahiriya', true) },
  },

  {
    id: 'lby_lockerbie_sanctions',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 1992 && G.currentYear <= 2002 &&
      G.age >= 18 &&
      !G.mem.lbySanctions,
    text: 'In 1992 the UN shuts the country\'s skies over Lockerbie. No flights in or out, frozen accounts, and the oil still flowing, because oil does not need aeroplanes. The shelves are thinner. A sick relative cannot fly to a specialist abroad and goes by road to Tunisia instead. You are living inside sanctions the world put on the country you happened to be born in.',
    context: 'Pan Am Flight 103 was destroyed over Lockerbie in December 1988, killing 270. UN sanctions on Libya ran from 1992 to 2003.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('libyan_sanctions_generation'); p.setMem('lbySanctions', true) },
  },

  {
    id: 'lby_rehabilitation_2003',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 2003 && G.currentYear <= 2007 &&
      G.age >= 25 &&
      !G.mem.lbyRehab,
    text: '2003. Gaddafi gives up his weapons programme and pays the Lockerbie families, and the sanctions lift. Tony Blair comes to Tripoli to shake his hand, and the Western oil companies come back. A decade of principle turns out to have had a price. You watch your country welcomed back into the world and have your own opinion of what that means.',
    choices: null,
    effect: (p) => { p.r += 5; p.mo += 500; p.addFlag('libyan_rehabilitation_generation'); p.setMem('lbyRehab', true) },
  },

  {
    id: 'lby_revolution_2011',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear === 2011 &&
      G.age >= 16 &&
      !G.mem.lbyRevolution,
    text: 'February 2011, and Benghazi rises, and within days it is a revolution, and Gaddafi promises to cleanse the country house by house. The no-fly zone becomes NATO flying for the rebels. In October he is found in a drainage pipe outside Sirte and killed by the crowd, and the video is everywhere within the hour. His state dissolves with him, because his state was him.',
    choices: [
      {
        text: 'You join or support the uprising.',
        tag: null,
        outcome: 'You were on the side of the revolution. What the revolution produced is something you are still accounting for.',
        effect: (p) => { p.m -= 10; p.r += 10; p.addFlag('libyan_revolution_generation'); p.addFlag('libyan_revolutionary'); p.setMem('lbyRevolution', true) },
      },
      {
        text: 'You watch, uncertain — you had a life under Gaddafi and you are not sure what comes after.',
        tag: null,
        outcome: 'The revolution happened around you. The uncertainty you felt turned out to be appropriate. What came after required a different kind of navigation.',
        effect: (p) => { p.m -= 7; p.r += 8; p.addFlag('libyan_revolution_generation'); p.setMem('lbyRevolution', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'lby_post_gaddafi_chaos',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 2012 && G.currentYear <= 2022 &&
      G.age >= 20 &&
      !G.mem.lbyChaos,
    text: 'The state that followed Gaddafi is not a state — it is a geography divided between governments and militias. By 2014 there are two rival governments: the Tripoli-based one and the Tobruk-based one, each backed by different militias, regional powers, and foreign countries. The oil fields and pipelines are bargaining chips. Benghazi, where the revolution started, becomes one of the most dangerous cities in the world under Islamic State and militia control. The people who wanted a Libya after Gaddafi are navigating a Libya that is not one thing at all.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 9; p.h -= 3; p.addFlag('libyan_fragmentation_generation'); p.setMem('lbyChaos', true) },
  },

  {
    id: 'lby_gaddafi_oil_state',
    phase: null,
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem.lbyOilState,
    text: 'One man decides how the oil money is spent. Housing is subsidised, university is free, the hospital is free. The bargain is that you get the material life and not politics: no parties, no organising. If you try, the Mukhabarat hears of it from somebody you know. That is the price of the free university.',
    choices: null,
    effect: (p) => { p.h += 2; p.m -= 6; p.r += 4; p.addFlag('libyan_oil_state_generation'); p.setMem('lbyOilState', true) },
  },

]

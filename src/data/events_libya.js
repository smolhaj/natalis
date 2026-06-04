// Libya character events
// Historical arcs: Gaddafi's coup 1969, Green Book and Jamahiriya (direct democracy),
// pan-Arabism and pan-Africanism, oil revenue and welfare state, Lockerbie 1988,
// international sanctions 1992–2003, rehabilitation and WMD disclosure 2003–11,
// February 2011 uprising, NATO intervention, Gaddafi killed October 2011,
// post-Gaddafi fragmentation — two governments, militias, migration hub.

export const LIBYA_EVENTS = [

  {
    id: 'lby_gaddafi_jamahiriya',
    phase: 'childhood',
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
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 1992 && G.currentYear <= 2002 &&
      G.age >= 18 &&
      !G.mem.lbySanctions,
    text: 'December 1988. Pan Am Flight 103 explodes over Lockerbie, Scotland — 270 dead. Libya is implicated. The UN imposes sanctions in 1992: no flights, no arms, frozen assets. International isolation. The oil revenue continues — oil doesn\'t need airplanes — but the economy contracts and the shelves are thinner and the travel ban means Libyan medical patients can\'t get to specialist care abroad. You are living inside the sanctions that the world put on the country where you happened to be born.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('libyan_sanctions_generation'); p.setMem('lbySanctions', true) },
  },

  {
    id: 'lby_rehabilitation_2003',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 2003 && G.currentYear <= 2007 &&
      G.age >= 25 &&
      !G.mem.lbyRehab,
    text: '2003. Gaddafi discloses Libya\'s WMD programme, pays compensation to the Lockerbie families, renounces terrorism. The sanctions are lifted. Tony Blair arrives in Tripoli to shake hands. Western oil companies return. The world that had isolated Libya for a decade decides it was never actually about the principle — it was always negotiable at the right price. You are watching your country be rehabilitated into the international community and you have opinions about what that means.',
    choices: null,
    effect: (p) => { p.r += 5; p.mo += 500; p.addFlag('libyan_rehabilitation_generation'); p.setMem('lbyRehab', true) },
  },

  {
    id: 'lby_revolution_2011',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear === 2011 &&
      G.age >= 16 &&
      !G.mem.lbyRevolution,
    text: 'February 15, 2011. Protests begin in Benghazi — the eastern city that has always been in tension with Tripoli. Within days they are a revolution. Gaddafi responds with violence: mercenaries, snipers, "cleanse them house by house." The UN authorises a no-fly zone on March 17; NATO\'s "no-fly zone" becomes air support for the rebels. Gaddafi is captured in a drainage pipe outside Sirte on October 20 and killed by the crowd. He ruled for forty-two years. The video of his last minutes circulates immediately. The state he built dissolves with him, because his state was him.',
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
    phase: 'midlife',
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
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Libya' &&
      G.currentYear >= 1975 && G.currentYear <= 2010 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem.lbyOilState,
    text: 'Libya has oil and one person decided how the oil was distributed. Under Gaddafi the housing is subsidised, the university is free, the healthcare is free. The deal: you get the material conditions; you do not get politics. You do not form parties. You do not organise. If you do, the Mukhabarat — the intelligence service — finds out through someone you know. The welfare state is real. So is the surveillance that is the price for it.',
    choices: null,
    effect: (p) => { p.h += 2; p.m -= 6; p.r += 4; p.addFlag('libyan_oil_state_generation'); p.setMem('lbyOilState', true) },
  },

]

// Philippines character events
// Marcos martial law (1972–86), EDSA People Power Revolution (1986),
// Aquino assassination (1983), typhoon culture, political dynasties,
// Duterte drug war (2016+), Marcos Jr. return (2022).

export const PHILIPPINES_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // MARCOS ERA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ph_martial_law_1972',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear === 1972 &&
      G.age >= 14 &&
      !G.mem?.phMartialLaw,
    text: 'September 1972, and the radio announces martial law, against a communist threat later found to be documented in forged documents. A curfew at midnight, the newspapers shut, the rival politicians arrested or gone abroad. The First Lady is in every photograph. There will be roads now, Marcos says. There will be order.',
    choices: [
      {
        text: 'You adapt to the new order and find your way within it.',
        tag: null,
        outcome: 'The infrastructure arrives. The roads are built. The curfew, the arrests and the projects all go ahead. All of these things coexist in the same country.',
        effect: (p) => { p.m -= 5; p.addFlag('marcos_generation'); p.addFlag('learned_silence'); p.setMem('phMartialLaw', true); },
      },
      {
        text: 'You mark the thing happening and keep the marking private.',
        tag: null,
        outcome: 'The document that you might have written does not exist. The words you might have said are not said, out of prudence or self-betrayal, and you do not know yet which.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('marcos_generation'); p.addFlag('inner_dissent'); p.setMem('phMartialLaw', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_aquino_assassination_1983',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear === 1983 &&
      G.age >= 12 &&
      !G.mem?.phAquino,
    text: 'August 1983. Ninoy Aquino has been in exile in America and comes home despite the threats, having said he is willing to die. He is shot on the tarmac at the Manila airport before he reaches the ground. The government blames a communist gunman. Within days there are yellow ribbons everywhere, and the funeral procession takes all day and most of the night. Something in the country can no longer be denied.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 4
      p.addFlag('aquino_assassination_generation')
      p.setMem('phAquino', true)
    },
  },

  {
    id: 'ph_edsa_1986',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear === 1986 &&
      G.age >= 12 &&
      !G.mem?.phEDSA,
    text: 'February 1986. The army has broken with Marcos, and Cardinal Sin asks people to go to EDSA and protect the soldiers who defected. People bring food and rosaries, and when the tanks come, nuns stand in front of them, and the tanks stop. On February 25 there are two inaugurations. By nightfall there is one, and Marcos is on an American plane to Hawaii.',
    choices: [
      {
        text: 'You were on EDSA — in the crowd or near it.',
        tag: null,
        outcome: 'You were there when the tanks stopped. That fact will not leave you. You have described the moment many times since and the description has never been adequate.',
        effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('edsa_generation'); p.addFlag('people_power_witness'); p.setMem('phEDSA', true); },
      },
      {
        text: 'You watched it on television, at home.',
        tag: null,
        outcome: 'The television showed the nuns and the tanks. You understood what you were watching. The country changed on the screen in front of you.',
        effect: (p) => { p.m += 6; p.addFlag('edsa_generation'); p.setMem('phEDSA', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_post_edsa_disillusionment',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.flags.includes('edsa_generation') &&
      G.currentYear >= 1990 && G.currentYear <= 2000 &&
      G.age >= 28 &&
      !G.mem?.phPostEdsa,
    text: 'The revolution happened, and so do the brownouts, seven hours a day without power in some years. Six coup attempts against Cory Aquino. An economy that did not take off the way 1986 promised, and the old political families, some of them Marcoses, running again under new arrangements. You believed in something, and still do. The sum of what changed and what did not is still being done.',
    choices: [
      {
        text: 'You stay engaged — this is still worth fighting for.',
        tag: null,
        outcome: 'The engagement costs something. It also produces something. The two do not cancel each other out.',
        effect: (p) => { p.m -= 4; p.karma += 5; p.addFlag('post_edsa_engaged'); p.setMem('phPostEdsa', true); },
      },
      {
        text: 'You redirect your energy to what is in front of you: work, family, forward.',
        tag: null,
        outcome: 'The disengagement is not defeat. The country will continue either way. You have specific things to build.',
        effect: (p) => { p.m += 3; p.r += 5; p.addFlag('post_edsa_private'); p.setMem('phPostEdsa', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TYPHOON AND EVERYDAY TEXTURE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ph_typhoon_season',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.phTyphoon,
    text: 'The Philippines gets twenty typhoons a year — more than any other country. You grow up knowing the signals: Signal 1, Signal 2, Signal 3, suspended classes, sandbags, the sound of rain on a metal roof. The floods come and leave. The damage is assessed and some of it is repaired. You understand, from an early age, that the normal includes this.',
    choices: null,
    effect: (p) => {
      p.addFlag('typhoon_upbringing')
      p.h -= 3
      p.setMem('phTyphoon', true)
    },
  },

  {
    id: 'ph_haiyan_2013',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear === 2013 &&
      G.age >= 10 &&
      !G.mem?.phHaiyan,
    text: 'November 8, 2013. Yolanda comes ashore on Leyte with the strongest winds ever measured at landfall, and the sea comes into Tacloban six metres high. The pictures: debris fields where streets were, bodies in the wreckage, the children. The aid arrives disorganised, and then organised. Yolanda makes a new category of what a typhoon can mean.',
    context: 'Typhoon Haiyan killed at least 6,300 people according to the official count.',
    choices: [
      {
        text: 'You were in the affected area.',
        tag: null,
        outcome: 'The rebuilding takes years. You rebuild with it. Some things that were there before are not there after. You know which ones.',
        effect: (p) => { p.m -= 12; p.h -= 8; p.r += 6; p.addFlag('haiyan_survivor'); p.setMem('phHaiyan', true); },
      },
      {
        text: 'You were elsewhere, watching the images arrive.',
        tag: null,
        outcome: 'You send what you can. You watch the coverage. You have been through typhoon seasons and you know the quality of this one is different.',
        effect: (p) => { p.m -= 6; p.karma += 4; p.addFlag('haiyan_witness'); p.setMem('phHaiyan', true); },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POLITICAL DYNASTIES AND MODERN PHILIPPINES
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ph_dynasty_texture',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1995 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.phDynasty,
    text: 'The ballot has names you recognise from the last ballot and the ballot before that. The father, then the son, then the wife. The family that runs the province runs the contracts that build the roads that employ the cousins of the people who vote for the family. Turncoatism is the technical term for switching parties after losing; every losing politician does it. Pakikisama — smooth interpersonal relations — means this is described not as corruption but as how things work.',
    choices: [
      {
        text: 'You vote for the lesser of the dynasties.',
        tag: null,
        outcome: 'You do the calculation. Something gets slightly better, or slightly worse, depending on the dynasty.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('philippine_voter'); p.setMem('phDynasty', true); },
      },
      {
        text: 'You vote for someone who has a platform you believe in.',
        tag: null,
        outcome: 'Your candidate loses, or wins and discovers the limits of the platform. But you voted and the vote was yours.',
        effect: (p) => { p.karma += 3; p.m -= 2; p.addFlag('philippine_voter'); p.setMem('phDynasty', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_duterte_drug_war',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 2016 && G.currentYear <= 2021 &&
      G.age >= 18 &&
      !G.mem?.phDuterte,
    text: 'Rodrigo Duterte won the presidency in 2016 on a platform of killing drug users and dealers. The Oplan Tokhang — knock and plead — becomes the name for the operations in the barangays at night. The police reports say "nanlaban" — fought back — for bodies that neighbours say were not fighting back. The Human Rights Watch count reaches thirty thousand. Duterte\'s approval ratings stay above sixty percent through most of his term. Both of these things are happening simultaneously in the same country.',
    choices: [
      {
        text: 'You understand the war on drugs even if you question the methods.',
        tag: null,
        outcome: 'The shabu problem in your barangay was real before 2016. The problem after 2016 is different, and so is your relationship to how it was addressed.',
        effect: (p) => { p.m -= 3; p.addFlag('duterte_era'); p.setMem('phDuterte', true); },
      },
      {
        text: 'You cannot accept what is happening at night in the barangays.',
        tag: null,
        outcome: 'You say what you think in the spaces where you can say it. The spaces are specific and limited. You navigate them.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 4; p.addFlag('duterte_era'); p.addFlag('duterte_dissent'); p.setMem('phDuterte', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_marcos_jr_return_2022',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear === 2022 &&
      G.age >= 18 &&
      !G.mem?.phBBM,
    text: 'June 2022. Ferdinand Marcos Jr. — "Bongbong" — wins the presidential election with thirty-one million votes, the largest plurality in Philippine electoral history. His running mate is Sara Duterte. The Marcos family returned from exile in 1991. The children of those who went to EDSA to stop his father are now in the generation that elected his son. The history of martial law is not taught in most schools.',
    choices: [
      {
        text: 'You feel a dread about what this means.',
        tag: null,
        outcome: 'The dread is specific and historical and calibrated by what you know. What you know is a kind of inheritance.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('marcos_jr_era'); p.addFlag('marcos_jr_dissent'); p.setMem('phBBM', true); },
      },
      {
        text: 'You voted for continuity, or stability, or a fresh start.',
        tag: null,
        outcome: 'There were reasons. The country will spend several years revealing whether they were sufficient.',
        effect: (p) => { p.m += 2; p.addFlag('marcos_jr_era'); p.setMem('phBBM', true); },
      },
    ],
    effect: null,
  },

]

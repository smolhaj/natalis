// events_australia_depth.js — Australia depth arc

export const AUSTRALIA_DEPTH_EVENTS = [

  // ── aus_dep_stolen_generations ────────────────────────────────────────────

  {
    id: 'aus_dep_stolen_generations_removed',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.ethnicity === 'indigenous_australian' &&
      G.currentYear >= 1910 && G.currentYear <= 1970 &&
      G.age >= 3 && G.age <= 9 &&
      !G.mem?.ausStolen,
    text: 'They come in the morning. An officer and a welfare woman. Your mother stands in the doorway. Later you will understand that she could not refuse — that the Aboriginals Protection Acts gave them the authority to remove any child they deemed at risk, and that the definition of risk included being Aboriginal. You do not understand this at three or five or seven. You understand the doorway. You understand that you are in the vehicle and then you are at the mission, and that the doorway is now a long way behind you.',
    choices: [
      {
        text: 'You hold onto the language for years, the words your mother used before you were taken',
        tag: null,
        outcome: 'They punish the language at the mission. You hold it anyway, in secret, the way you hold a match cupped in two hands against the wind. Some of the words survive. Some do not. You will spend part of your adult life looking for the ones that did not.',
        effect: (p) => { p.m -= 12; p.r += 8; p.h -= 5; p.addFlag('aus_stolen_generation'); p.addFlag('minority_language_speaker'); p.setMem('ausStolen', true) },
      },
      {
        text: 'You learn quickly what survival in the mission requires of you',
        tag: null,
        outcome: 'You become expert in the performance of not being what you are. The expertise is a form of survival. The cost of the expertise is something you will calculate for the rest of your life.',
        effect: (p) => { p.m -= 10; p.r += 10; p.e += 3; p.addFlag('aus_stolen_generation'); p.setMem('ausStolen', true) },
      },
    ],
    effect: null,
  },

  // ── aus_dep_ten_pound_pom ─────────────────────────────────────────────────

  {
    id: 'aus_dep_ten_pound_pom_arrival',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 1947 && G.currentYear <= 1972 &&
      G.character.religion === 'christian_protestant' &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.ausTenPound,
    text: 'Ten pounds: the cost of a passage from Southampton to Fremantle under the Assisted Passage Migration Scheme. Your family is part of the 1.5 million British migrants who came by this mechanism between 1945 and 1972. The ship takes five weeks. The promotional films showed sunshine. What you arrive to is a migrant hostel in Maribyrnong or Bonegilla — rows of huts, a canteen, a waiting time before you can move into actual Australia. The country is not as the films described. It is also real, and you are in it.',
    choices: [
      {
        text: 'You adapt faster than your parents — you already sound Australian by the end of school',
        tag: null,
        outcome: 'The accent is the first thing that goes. Then the instinct to call it England. Then some of the specific British embarrassment your parents carried. What replaces them is something that is neither place entirely. You make something of that in-between.',
        effect: (p) => { p.m += 3; p.e += 4; p.s += 3; p.addFlag('ten_pound_pom_generation'); p.setMem('ausTenPound', true) },
      },
      {
        text: 'You keep the British-ness your parents brought — it becomes how you understand home',
        tag: null,
        outcome: 'The allegiance to somewhere else is a particular form of not quite being here. You are Australian by passport and British by formation and neither identity fully fills the space. You find the people who understand this and build the community around them.',
        effect: (p) => { p.m -= 2; p.r += 4; p.addFlag('ten_pound_pom_generation'); p.setMem('ausTenPound', true) },
      },
    ],
    effect: null,
  },

  // ── aus_dep_referendum_1967 ───────────────────────────────────────────────

  {
    id: 'aus_dep_referendum_1967_counted',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.ethnicity === 'indigenous_australian' &&
      G.currentYear >= 1967 && G.currentYear <= 1970 &&
      G.age >= 18 &&
      !G.mem?.ausRef67,
    text: 'May 27, 1967. The referendum passes with 90.77 percent — the highest yes vote in Australian referendum history. Section 51(xxvi) and Section 127 are amended. Aboriginal and Torres Strait Islander peoples are now counted in the census. For the first time in the eighty years since Federation, the Commonwealth can legislate for you specifically. What it means in practice — how much the vote changes what it is to be alive in this country — you will spend the following years finding out. The vote was 90.77 percent in favour of counting you. They have counted you. You are in the count now.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.karma += 3; p.addFlag('aus_1967_generation'); p.setMem('ausRef67', true) },
  },

  // ── aus_dep_mardi_gras_origins ────────────────────────────────────────────

  {
    id: 'aus_dep_mardi_gras_1978',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 1978 && G.currentYear <= 1985 &&
      G.age >= 18 &&
      !G.mem?.ausMardiGras,
    text: 'June 24, 1978. The first Sydney Gay and Lesbian Mardi Gras is not the festival it will become. It is a march down Oxford Street that ends in police charging the crowd. Fifty-three people are arrested. Their names are published the next day in the Sydney Morning Herald — full name, full address. They lose jobs and housing and family members from a newspaper column. You know some of them. The Mardi Gras will become the largest in the world, which is a fact that contains and partly conceals its origin: a night of police violence and a list of names in a newspaper.',
    choices: [
      {
        text: 'You were there. You know what the festival came from.',
        tag: null,
        outcome: 'The amnesia around the origin is partial — some people remember, some choose not to. You remember. The parade will always mean both things to you: the celebration and the night it came from.',
        effect: (p) => { p.m -= 4; p.r += 6; p.karma += 4; p.addFlag('aus_mardi_gras_original'); p.setMem('ausMardiGras', true) },
      },
      {
        text: 'You hear about it after, when the arrests are already in the paper',
        tag: null,
        outcome: 'The newspaper column with the names. You know what the names cost before you know what the march meant. You will go next year, and the year after, until the police presence shifts and the march becomes something else.',
        effect: (p) => { p.m -= 2; p.r += 4; p.addFlag('aus_mardi_gras_original'); p.setMem('ausMardiGras', true) },
      },
    ],
    effect: null,
  },

  // ── aus_dep_cronulla_2005 ─────────────────────────────────────────────────

  {
    id: 'aus_dep_cronulla_2005_riots',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2005 && G.currentYear <= 2008 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.ausCronulla,
    text: 'December 11, 2005. Five thousand people gather at Cronulla beach after text messages circulate calling for Australians to reclaim the beach from "Lebs and wogs." Men in Australian flag capes assault anyone who looks Middle Eastern or Muslim. The violence continues for three days in reprisal attacks across Sydney. The talkback radio had been running the temperature up for weeks. Howard says it is not about race. The people in the capes have Australian flags on. You are watching this in a country you thought you understood.',
    choices: [
      {
        text: 'You are Arabic-Australian or Middle Eastern-Australian — this is not an abstraction',
        tag: null,
        outcome: 'You change how you move through certain parts of Sydney for months afterwards. The calculation you make about where to be — that calculation is the thing Cronulla produced in you. The flag as threat is not something you can unlearn.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('aus_cronulla_generation'); p.setMem('ausCronulla', true) },
      },
      {
        text: 'You watch it from outside and understand something has shifted in the national character',
        tag: null,
        outcome: 'The coverage uses certain language. The footage from the beach enters the memory as a specific image of what the country is capable of producing. You will be looking for the conditions that produced it for the next twenty years.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('aus_cronulla_generation'); p.setMem('ausCronulla', true) },
      },
    ],
    effect: null,
  },

  // ── aus_dep_convict_heritage ──────────────────────────────────────────────

  {
    id: 'aus_dep_convict_heritage_reckoning',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 1980 &&
      G.age >= 30 &&
      !G.mem?.ausConvict,
    text: 'You look into the family history — a hobby, a retirement project, a DNA kit from Christmas. What you find: a sentence at the Old Bailey for stealing a bolt of cloth, or a sheep, or seven shillings. Transportation for seven years to New South Wales, 1826. The convict in the line. For most of Australian history this was something to suppress — the shame of the criminal origin. Now it has reversed: to have a First Fleeter in the line is a form of authenticity, a depth of belonging, a proof of genealogy in a country that has spent its history anxious about who truly belongs.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 4; p.e += 3; p.addFlag('aus_convict_heritage'); p.setMem('ausConvict', true) },
  },

  // ── aus_dep_outback_isolation ─────────────────────────────────────────────

  {
    id: 'aus_dep_outback_childhood',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.ausOutback,
    text: 'The School of the Air: a radio lesson, a teacher in a city three hundred kilometres away, the crackling of the HF radio that is also the connection to the doctor and the Royal Flying Doctor Service and the outside world. You are one of forty students across a region the size of France, attending school by radio. The nearest shop is ninety minutes by dirt road in the dry season. In the wet season the road is impassable. The isolation is not scenery. The isolation is the basic condition of life, which eventually becomes the thing you miss most about it.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.e += 4; p.addFlag('aus_outback_childhood'); p.setMem('ausOutback', true) },
  },

  // ── aus_dep_voice_referendum_2023 ────────────────────────────────────────

  {
    id: 'aus_dep_voice_2023',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Australia' &&
      G.currentYear >= 2023 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.ausVoice2023,
    text: 'October 14, 2023. The Voice to Parliament referendum: 60.06 percent No. Every state votes No. The proposal would have created an advisory body for Indigenous Australians with no veto power, no legislative power, no ability to force anything. What it would have had is constitutional recognition. Sixty percent of Australians vote against the advisory body with no power. The question of what the No vote means will occupy the analysis for years. The people most affected by the decision watched the results come in on screens in communities where the generational outcomes of policy — the gap in life expectancy, in incarceration, in child removal — are not abstract.',
    choices: [
      {
        text: 'You voted Yes — the result is a specific kind of grief',
        tag: null,
        outcome: 'The referendum campaign made the feelings of many Australians about Indigenous Australians legible in a way that was hard to unknow. You will be sifting through that information for years.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 3; p.addFlag('aus_voice_generation'); p.setMem('ausVoice2023', true) },
      },
      {
        text: 'You voted No — the mechanism was wrong, whatever the question underneath',
        tag: null,
        outcome: 'What the No coalition contained was too wide to be a single thing: constitutional conservatives, treaty-first advocates, and something else. You know your own reason. Whether it was heard as the reason you intended is a different question.',
        effect: (p) => { p.r += 4; p.addFlag('aus_voice_generation'); p.setMem('ausVoice2023', true) },
      },
    ],
    effect: null,
  },

]

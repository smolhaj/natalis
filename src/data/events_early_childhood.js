// Early childhood texture events — ages 0–5.
// These are auto-resolve, sensory, and specific: the things a very short life
// should have on the page before it ends.

export const EARLY_CHILDHOOD_2_EVENTS = [

  // ── Grandparent as keeper ─────────────────────────────────────────────────
  {
    id: 'ec2_grandparent_keeper',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 2 && G.age <= 4 &&
      !G.mem?.ec2GrandparentMemo,
    text: 'Your grandparent keeps you while your parents work. The day has a different texture — slower, full of a kind of attention you don\'t get elsewhere. There are stories about before you existed. You don\'t understand all of them. You keep them anyway.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('ec2GrandparentMemo', true) },
  },

  // ── First small loss — a pet or animal ───────────────────────────────────
  {
    id: 'ec2_first_small_loss',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 3 && G.age <= 5 &&
      !G.mem?.ec2FirstLossMemo,
    text: 'An animal you knew is gone. You were told this in words, but the words haven\'t matched the reality yet. You go to where it usually was. It isn\'t there. This is the first time you understand what gone means — not absent, but permanently absent. There is a difference.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 2; p.setMem('ec2FirstLossMemo', true) },
  },

  // ── Market day ────────────────────────────────────────────────────────────
  {
    id: 'ec2_market_sounds',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 2 && G.age <= 4 &&
      (G.ruralUrban === 'rural' || G.stats.wealth < 45) &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      !G.mem?.ec2MarketMemo,
    text: 'The market is vast and loud and smells of things you can name and things you can\'t yet. You hold someone\'s hand. The stalls tower above you. You are given something to eat. You will remember this day — the color, the heat, the particular sound of it — without being able to say why.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('ec2MarketMemo', true) },
  },

  // ── Religious sound as the sound of home ──────────────────────────────────
  {
    id: 'ec2_religious_sound',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 3 && G.age <= 5 &&
      G.religion &&
      !['secular', 'atheist'].includes(G.religion) &&
      !G.mem?.ec2ReligiousSoundMemo,
    text: (G) => {
      const sound = G.religion === 'muslim_sunni' || G.religion === 'muslim_shia' || G.religion === 'muslim_sufi'
        ? 'the call to prayer arrives five times a day'
        : G.religion === 'hindu' || G.religion === 'buddhist'
          ? 'the bells and incense mark certain hours of the day'
          : 'the bells on Sunday or the sound of the choir reaching into the street'
      return `The adults around you do a particular thing at particular times. ${sound.charAt(0).toUpperCase() + sound.slice(1)}. You don't understand it yet, but you've absorbed the rhythm. This sound will feel like the sound of home for a long time.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('ec2ReligiousSoundMemo', true) },
  },

  // ── Water walk ────────────────────────────────────────────────────────────
  {
    id: 'ec2_water_walk',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 4 && G.age <= 5 &&
      G.ruralUrban === 'rural' &&
      G.stats.wealth < 35 &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      !G.mem?.ec2WaterWalkMemo,
    text: 'The walk to the water source is something your family does every day. You come along. It is far enough to be a journey. The container is heavy on the way back. This is a fact of life like the sun coming up. You have not yet learned that it doesn\'t have to be this way.',
    choices: null,
    effect: (p) => { p.h -= 2; p.e += 2; p.setMem('ec2WaterWalkMemo', true) },
  },

  // ── Parent departs and returns ────────────────────────────────────────────
  {
    id: 'ec2_parent_rhythm',
    phase: 'early_childhood',
    weight: 5,
    when: (G) =>
      G.age >= 2 && G.age <= 3 &&
      !G.mem?.ec2ParentRhythmMemo,
    text: 'Your parent leaves in the morning. You have not yet learned to hold their absence well. When they come back, you run. This is the rhythm of the day. It will be years before you understand that they are leaving for you.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('ec2ParentRhythmMemo', true) },
  },

  // ── Learning the body ─────────────────────────────────────────────────────
  {
    id: 'ec2_learning_body',
    phase: 'early_childhood',
    weight: 5,
    when: (G) =>
      G.age >= 2 && G.age <= 4 &&
      !G.mem?.ec2LearningBodyMemo,
    text: 'The world is full of things to climb and fall from. You are learning both. A knee scraped on stone. The way height looks from somewhere you\'re not supposed to be. The way your body is more resilient than you expected, and sometimes less.',
    choices: null,
    effect: (p) => { p.h -= 1; p.m += 3; p.setMem('ec2LearningBodyMemo', true) },
  },

  // ── Neighborhood texture ──────────────────────────────────────────────────
  {
    id: 'ec2_neighborhood',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 4 && G.age <= 5 &&
      !G.mem?.ec2NeighborhoodMemo,
    text: (G) => {
      const arch = G.character.country.archetype
      if (G.ruralUrban === 'rural') {
        return 'Your world is bounded by the walk your legs can make in a day. Everything outside that is rumor and adult conversation.'
      }
      if (['wealthy_west', 'wealthy_east'].includes(arch)) {
        return 'The street is quiet except at certain hours. The neighbors are known by sight. Your range extends a block, then two.'
      }
      if (arch === 'subsaharan' || arch === 'developing_urban') {
        return 'The compound or the courtyard is the center of everything. Life happens at close range — you know everyone\'s business because there is no room not to.'
      }
      return 'The neighborhood is a world in itself. You are learning its rules, its people, its geography of safety and uncertainty.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('ec2NeighborhoodMemo', true) },
  },

  // ── Learning to count ─────────────────────────────────────────────────────
  {
    id: 'ec2_first_count',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 4 && G.age <= 5 &&
      !G.mem?.ec2FirstCountMemo,
    text: 'You can count to ten. You do this for anyone who will listen. There is pride in the doing of it that has not yet been separated from the pleasure of the doing. They are the same thing at this age.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 3; p.setMem('ec2FirstCountMemo', true) },
  },

  // ── Photograph — post-1950, not very poor ─────────────────────────────────
  {
    id: 'ec2_the_photograph',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 1 && G.age <= 2 &&
      G.currentYear >= 1950 &&
      G.stats.wealth >= 35 &&
      !G.mem?.ec2PhotographMemo,
    text: 'Someone takes photographs of you. You will see them later — formal poses, an expression you won\'t remember making. You will not remember the moment of being photographed. Only the photograph. This is the first evidence of yourself that you will have.',
    choices: null,
    effect: (p) => { p.setMem('ec2PhotographMemo', true) },
  },

  // ── Season or weather landmark ────────────────────────────────────────────
  {
    id: 'ec2_season_memory',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 3 && G.age <= 5 &&
      !G.mem?.ec2SeasonMemo,
    text: (G) => {
      const arch = G.character.country.archetype
      const cn = G.character.country.name
      if (['India', 'Bangladesh', 'Nepal', 'Pakistan', 'Sri Lanka', 'Myanmar', 'Thailand', 'Philippines', 'Indonesia'].includes(cn)) {
        return 'The monsoon arrives like a second world opening over the first. The smell before it. The sound of it on the roof. The street that becomes a river. You run through it until someone calls you in.'
      }
      if (['Norway', 'Sweden', 'Finland', 'Russia', 'Poland', 'Kazakhstan', 'Canada'].includes(cn)) {
        return 'The first real winter. The cold is a presence, not just a temperature. The world goes quiet under snow. The light changes in a way you have no word for yet.'
      }
      if (arch === 'subsaharan') {
        return 'The dry season and the wet season are two different countries. The smells change. The light changes. What is possible changes. You are learning which season is which.'
      }
      return 'The year has a rhythm — certain smells, certain light, certain changes in what the adults do. You are storing this rhythm without knowing you are storing it.'
    },
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('ec2SeasonMemo', true) },
  },

  // ── Poverty visible ───────────────────────────────────────────────────────
  {
    id: 'ec2_poverty_known',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 4 && G.age <= 5 &&
      G.stats.wealth < 25 &&
      !G.flags.includes('poverty_childhood') &&
      !G.mem?.ec2PovertyKnownMemo,
    text: 'You do not know the word for your situation yet. You know that some children at the edge of your world have things you don\'t. You know that the adults manage their faces when certain subjects come up. You are storing this without being able to say what it is.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.addFlag('poverty_childhood'); p.setMem('ec2PovertyKnownMemo', true) },
  },

  // ── Conflict texture — first awareness of war ─────────────────────────────
  {
    id: 'ec2_war_texture',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 3 && G.age <= 5 &&
      G.character.country.conflictRisk > 0.12 &&
      !G.flags.includes('war_childhood') &&
      !G.mem?.ec2WarTextureMemo,
    text: 'There is something in the background that the adults track but don\'t explain. Distant sounds. Changes in routine. A neighbor who isn\'t there one day. You don\'t have the words for what you are watching. You watch it anyway.',
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 2; p.addFlag('war_childhood'); p.setMem('ec2WarTextureMemo', true) },
  },

]

// events_syria.js
// Syrian character arc: Ba'ath stability → Hama 1982 → Damascus Spring →
// civil war 2011 → displacement or staying.
// Does not duplicate the Kurdish Syria arc in events_kurdish.js.

const IS_SYRIAN = (G) =>
  G.character.country?.name === 'Syria' &&
  G.character.ethnicity !== 'kurdish_syria'

export const SYRIA_EVENTS = [

  // ─── BA'ATH STATE CHILDHOOD ───────────────────────────────────────────────

  {
    id: 'sy_baath_childhood',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_SYRIAN(G) && G.age >= 8 && G.age <= 14 && !G.flags.includes('baath_state_learned'),
    text: 'The portraits are everywhere. Assad in the classroom, Assad in the bakery, Assad at the checkpoint where the road bends toward your grandmother\'s house. At school you learn that the president is the father of the nation, which is the only way to say it. You learn that other things are not said. This education takes about three years and requires no formal curriculum.',
    choices: null,
    effect: (p) => {
      p.addFlag('baath_state_learned')
      p.addFlag('learned_silence')
      p.e += 2
    },
  },

  // ─── HAMA 1982 ───────────────────────────────────────────────────────────

  {
    id: 'sy_hama_1982',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.currentYear >= 1982 && G.currentYear <= 1986 &&
      G.age >= 16 &&
      !G.flags.includes('hama_silence'),
    text: (G) => {
      const isFromHama = Math.random() < 0.08
      if (isFromHama) {
        return 'Your family is from Hama. In February 1982, the army and the security services seal the city. What happens inside the sealed city is not reported. Estimates range from ten thousand dead to forty thousand. Your family finds out through a cousin who got out before the sealing. The cousin does not describe what she saw, and you learn not to ask. The city is rebuilt. The rubble is specific and the silence around it is architectural.'
      }
      return 'Everyone knows what happened in Hama. No one says it directly — not to colleagues, not at dinner, not to the children. It sits in the space between things. The lesson of Hama is available to anyone who knows how to read a silence: this is what the state does to those who challenge it. The lesson is very widely understood.'
    },
    choices: null,
    effect: (p) => {
      p.addFlag('hama_silence')
      p.addFlag('learned_silence')
      p.m -= 8
    },
  },

  // ─── DAMASCUS SPRING 2000–2001 ────────────────────────────────────────────

  {
    id: 'sy_damascus_spring',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2002 &&
      G.age >= 28 &&
      !G.flags.includes('damascus_spring_witness') &&
      (G.career?.field === 'writing' || G.career?.field === 'academia' || G.career?.field === 'media' || G.career?.field === 'law' || G.stats.smarts >= 60),
    text: 'Bashar al-Assad inherits the presidency from his father and, for about a year, something loosens. Civil society groups meet in private salons — they call them "discussion forums." Intellectuals sign open letters. Someone reads an essay at a gathering and people applaud and you think: perhaps. Perhaps this is what a country changing looks like from the inside. Then the signatories of the Damascus Declaration begin to be arrested. The Damascus Spring lasted nine months. You knew it would be shut down. You also believed in it while it was happening.',
    choices: [
      {
        text: 'Attend the forums while they\'re open.',
        tag: 'participate',
        outcome: 'You are there for two of them. You hear things said in a room in Damascus that could not have been said six months earlier. The memory of those rooms is specific and stays with you.',
        effect: (p) => { p.addFlag('damascus_spring_witness'); p.addFlag('briefly_believed'); p.e += 3; p.m += 4; },
      },
      {
        text: 'Watch from a distance.',
        tag: 'careful',
        outcome: 'You follow the forums through people who attend them. You keep your name off the lists. The shutdown happens regardless. You were careful for reasons that turn out not to matter.',
        effect: (p) => { p.addFlag('damascus_spring_witness'); p.r += 3; },
      },
    ],
  },

  // ─── DERAA AND THE UPRISING 2011 ─────────────────────────────────────────

  {
    id: 'sy_march_2011',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2012 &&
      G.age >= 25 &&
      !G.flags.includes('syria_uprising_witness'),
    text: (G) => {
      const hasLearned = G.flags.includes('baath_state_learned') || G.flags.includes('hama_silence')
      if (hasLearned) {
        return 'Boys in Deraa write on a wall: "your turn is coming, Doctor." They are fifteen. The security forces arrest them and do to them what is done to people who write things on walls. Their families protest. The protests spread. You grew up knowing exactly what this state does to people who raise their voices. You are watching it happen anyway, and you are watching a country decide whether it is afraid enough to stay silent one more time.'
      }
      return 'In March, boys write graffiti in Deraa. In April, protests in Damascus, Homs, Latakia. The Syrian Arab Army fires on demonstrators in Deraa. By summer, what started as protest has the shape of something else. You are watching this unfold from inside a country that has not had public politics in your lifetime.'
    },
    choices: [
      {
        text: 'Join the protests.',
        tag: 'protest',
        outcome: 'You go into the street. The street is full of people who have been silent their entire lives. The sound of a crowd deciding to be unafraid is specific. You will not forget it regardless of what comes after.',
        effect: (p) => { p.addFlag('syria_uprising_witness'); p.addFlag('political_active'); p.m += 5; },
      },
      {
        text: 'Stay home. You have a family.',
        tag: 'home',
        outcome: 'You watch from the balcony or from a phone screen. The people in the street are your neighbours. The decision to stay home is also a decision.',
        effect: (p) => { p.addFlag('syria_uprising_witness'); p.r += 4; },
      },
      {
        text: 'Leave the city before it gets worse.',
        tag: 'leave_early',
        outcome: 'You read the situation correctly and early. The city gets much worse.',
        effect: (p) => { p.addFlag('syria_uprising_witness'); p.addFlag('left_syria_early'); },
      },
    ],
  },

  // ─── DAILY LIFE IN A DIVIDED CITY ────────────────────────────────────────

  {
    id: 'sy_checkpoint_life',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2019 &&
      G.flags.includes('syria_uprising_witness') &&
      !G.flags.includes('left_syria') &&
      !G.flags.includes('civil_war_checkpoint_daily'),
    text: 'The city has checkpoints now. You know which roads are passable at which hours and which parts of the city are controlled by which faction this week. The knowledge updates continuously. The barrel bombs fall mostly on certain neighborhoods; you have learned which direction the sound means. You carry your papers everywhere. The tea house you used to go to on Fridays is in the wrong neighborhood now. You do not go.',
    choices: null,
    effect: (p) => {
      p.addFlag('civil_war_checkpoint_daily')
      p.addFlag('civil_war_survived')
      p.m -= 12
      p.h -= 5
    },
  },

  // ─── THE DISPLACEMENT DECISION ───────────────────────────────────────────

  {
    id: 'sy_displacement_choice',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2017 &&
      (G.flags.includes('civil_war_checkpoint_daily') || G.flags.includes('syria_uprising_witness')) &&
      !G.flags.includes('left_syria') &&
      !G.flags.includes('stayed_syria') &&
      !G.flags.includes('left_syria_early'),
    text: (G) => {
      const hasProperty = (G.stats.wealth ?? 0) >= 40
      const hasChildren = (G.children ?? []).length > 0
      const hasElderParents = Object.values(G.parents ?? {}).some(p => p && p.age >= 65)
      let context = 'The calculation everyone makes: stay and endure, or go and arrive somewhere as a refugee with nothing official. '
      if (hasChildren) context += 'You have children. '
      if (hasElderParents) context += 'Your parents are old enough that the journey is dangerous and staying is dangerous. '
      if (hasProperty) context += 'The house is paid for. Leaving means leaving the house. '
      return context + 'People you know have made both choices. Neither looks obviously right from where you are standing.'
    },
    choices: [
      {
        text: 'Go. Take what you can carry.',
        tag: 'leave',
        outcome: 'Turkey first, then the decision about the sea crossing. The boat is a rubber inflatable carrying three times the passengers it was designed for. You do not look at the water.',
        effect: (p) => {
          p.addFlag('left_syria')
          p.addFlag('emigrated')
          p.setResidency('refugee_status')
          p.m -= 10
          p.mo -= 2000
          p.addFlag('civil_war_displaced')
        },
      },
      {
        text: 'Stay. The house, the city, the life you built.',
        tag: 'stay',
        outcome: 'You stay. The decision makes sense every day and less sense as the years pass. You are still here when the city is something else.',
        effect: (p) => {
          p.addFlag('stayed_syria')
          p.addFlag('stayed_when_others_left')
          p.m -= 8
        },
      },
    ],
  },

  // ─── ARRIVING IN EUROPE ───────────────────────────────────────────────────

  {
    id: 'sy_europe_arrival',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.includes('left_syria') &&
      G.currentYear >= 2013 && G.currentYear <= 2018 &&
      (G.currentCountry?.name === 'Germany' || G.currentCountry?.name === 'Sweden' || G.residencyStatus === 'refugee_status' || G.residencyStatus === 'asylum_seeker') &&
      !G.flags.includes('syria_europe_arrived'),
    text: (G) => {
      const country = G.currentCountry?.name ?? 'Germany'
      return `You are in ${country}. The camp is temporary, which means you have been here for eight months. The caseworker has a file with your name on it in a language you are learning. The newspaper has a word for you — *Flüchtling*, or *réfugié*, or *flyktning* — and the word is doing a lot of work, compressing a specific life into a policy category. You have a degree and a profession and a city you know block by block. The file does not know this yet.`
    },
    choices: null,
    effect: (p) => {
      p.addFlag('syria_europe_arrived')
      p.addFlag('refugee_experience')
    },
  },

  // ─── STAYING THROUGH THE WAR ─────────────────────────────────────────────

  {
    id: 'sy_stayed_through',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_SYRIAN(G) &&
      G.flags.includes('stayed_syria') &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      !G.flags.includes('syria_stayed_accounted'),
    text: 'The souk is partially rebuilt. Not the part that was there since the Umayyads; that part burned for three weeks in 2012. What is being rebuilt is the frame around the absence. Most of the people you grew up with are in Germany, in Turkey, in Lebanon, in a refugee camp that was supposed to be temporary. The ones still here are the ones who couldn\'t leave, or the ones who decided not to. You know which category you are in.',
    choices: [
      {
        text: 'You chose this. Syria is yours.',
        tag: 'chosen',
        outcome: 'The city is changed permanently. The decision to stay was yours and you own it. The city is still the city. You are still here.',
        effect: (p) => { p.addFlag('syria_stayed_accounted'); p.addFlag('chose_to_stay'); p.m += 5; p.karma += 3; },
      },
      {
        text: 'You had no real choice.',
        tag: 'trapped',
        outcome: 'The parents, the property, the age, the moment when the window closed. You tell yourself it was circumstances. You are possibly right.',
        effect: (p) => { p.addFlag('syria_stayed_accounted'); p.r += 4; },
      },
    ],
  },

]

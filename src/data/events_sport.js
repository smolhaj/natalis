// events_sport.js
// BUILD 39 — Sport as a Social Institution
// Football, cricket, Jesse Owens, the World Cup, the local match,
// the scout who comes, cricket's imperial inheritance.

const FOOTBALL_COUNTRIES = [
  'Brazil', 'Argentina', 'Mexico', 'Colombia', 'Nigeria', 'Ghana',
  'Morocco', 'Egypt', 'Italy', 'Spain', 'Germany', 'France',
  'Chile', 'Peru', 'Bolivia', 'Venezuela', 'Serbia', 'Poland',
  'Hungary', 'Czech Republic', 'Romania', 'Senegal', 'Ivory Coast',
  'Cameroon', 'Uruguay',
]

const CRICKET_COUNTRIES = [
  'India', 'Pakistan', 'Sri Lanka', 'Bangladesh',
  'South Africa', 'Zimbabwe', 'Kenya', 'Australia', 'New Zealand', 'United Kingdom',
]

const SOUTH_ASIAN_CRICKET = ['India', 'Pakistan', 'Sri Lanka', 'Bangladesh']

export const SPORT_EVENTS = [

  // ── THE LOCAL MATCH ───────────────────────────────────────────────────────

  {
    id: 'spt_local_match',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      FOOTBALL_COUNTRIES.includes(G.character.country.name) &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.sptLocalMatch,
    text: (G) => {
      const cn = G.character.country.name
      if (['Brazil', 'Argentina', 'Bolivia', 'Chile', 'Peru', 'Colombia', 'Venezuela', 'Mexico', 'Uruguay'].includes(cn)) {
        return 'The pitch is whatever space is available — behind the houses, beside the school, the cleared patch of dust between the buildings. The goals are marked with stones or shirts. The ball is old and not quite round. No one keeps the score officially; it gets contested every time it matters. You play until the light goes and then a little after. This does not require explanation.'
      }
      if (['Nigeria', 'Ghana', 'Senegal', 'Morocco', 'Egypt', 'Ivory Coast', 'Cameroon'].includes(cn)) {
        return 'Sunday afternoon. Every boy from three streets shows up at the pitch beside the school. Teams are sorted by shouting. Someone brought a ball. The argument about who plays where takes longer than the first half. By the time the light is orange the score has been disputed twice, a match replay requested and denied, and you have played six games instead of one.'
      }
      return 'The club exists for children your age and you go on Saturdays. The coach is a man from the neighbourhood who played semi-professionally and did not quite make it. He is serious about this in a way that exceeds what the situation requires. You are serious about it too. The seriousness is the point.'
    },
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 2
      p.addFlag('football_childhood')
      p.setMem('sptLocalMatch', true)
    },
  },

  // ── CRICKET AT SCHOOL ─────────────────────────────────────────────────────

  {
    id: 'spt_cricket_school',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      CRICKET_COUNTRIES.includes(G.character.country.name) &&
      G.age >= 9 && G.age <= 15 &&
      !G.mem?.sptCricketSchool,
    text: (G) => {
      const cn = G.character.country.name
      if (SOUTH_ASIAN_CRICKET.includes(cn)) {
        return 'Cricket is taught at school as though it is a subject with correct answers. The game arrived with the British and stayed after they left. You learn to hold the bat, to judge the line of the ball, to field in the position you are told. Whether you are good at this or not is settled quickly. If you are, it becomes the thing you are known for before anything else is known about you.'
      }
      if (['South Africa', 'Zimbabwe', 'Kenya'].includes(cn)) {
        return 'The game was a white sport for most of its history here — the club memberships, the provincial colours, the national team. It has opened. The history of its closure is still recent enough to be present in the room when you play. You play it anyway. What you make of it is your own.'
      }
      return 'Cricket is summer. The whites, the crease, the specific sound of a well-timed drive. Some children love it immediately; others find it the longest afternoon of the week. You have already decided which you are.'
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.addFlag('cricket_childhood')
      p.setMem('sptCricketSchool', true)
    },
  },

  // ── WATCHING WITH A PARENT ────────────────────────────────────────────────

  {
    id: 'spt_watching_with_parent',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      FOOTBALL_COUNTRIES.includes(G.character.country.name) &&
      Object.values(G.parents ?? {}).some(p => p.alive) &&
      G.age >= 8 && G.age <= 15 &&
      !G.mem?.sptWatchingWithParent,
    text: (G) => {
      const parent = Object.values(G.parents ?? {}).find(p => p.alive)
      const pName = parent?.name ?? 'your parent'
      const cn = G.character.country.name
      if (['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Bolivia', 'Mexico', 'Venezuela', 'Uruguay'].includes(cn)) {
        return `${pName} knows everything about the game — not just the current players but the players from before, the goal scored in a year before you were born, the manager who was wrong about everything and right about the one thing. You sit beside them and learn to see it through their eyes first. Later you will have your own opinions. For now you are learning what it means to care about something this much.`
      }
      return `You watch the match with ${pName}. The commentary is familiar now — who is playing, what went wrong last week, the referee's decision that was wrong. This is a language the two of you share. There are things you cannot say to each other that you can say about this.`
    },
    choices: null,
    effect: (p) => {
      p.m += 6
      p.addFlag('football_childhood')
      p.setMem('sptWatchingWithParent', true)
    },
  },

  // ── THE SCOUT ─────────────────────────────────────────────────────────────

  {
    id: 'spt_scout_arrives',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        ['subsaharan', 'developing_urban'].includes(arch) &&
        G.stats.fitness >= 60 &&
        G.age >= 13 && G.age <= 17 &&
        G.flags.includes('football_childhood') &&
        !G.mem?.sptScoutArrives
      )
    },
    text: (G) => {
      const cn = G.character.country.name
      if (['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast', 'Cameroon'].includes(cn)) {
        return 'A man comes to watch the match who has not come before. He does not announce himself. He stands at the edge of the pitch with a notebook. After the game ends he speaks briefly to the coach. Two days later the coach tells you there may be a trial somewhere. He says this carefully, as though saying it too directly will make it not happen.'
      }
      return 'Someone has noticed. A coach from a bigger club, an agent, a contact — the word comes through that there may be a trial. The idea of another life, accessible from here, sits in you like an object that does not belong. You don\'t know whether to believe it or whether believing will cost something if it doesn\'t happen.'
    },
    choices: [
      {
        text: 'Go to the trial — this is the path',
        tag: 'pursue',
        outcome: 'You go. You play well enough. Nothing is decided yet.',
        effect: (p) => {
          p.m += 3
          p.addFlag('sport_exit_attempted')
          p.setMem('sptScoutArrives', true)
        },
      },
      {
        text: 'Stay realistic — trials rarely lead anywhere',
        tag: 'decline',
        outcome: 'You keep playing, but for different reasons now.',
        effect: (p) => {
          p.m -= 3
          p.r += 4
          p.setMem('sptScoutArrives', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE WINDOW CLOSES ─────────────────────────────────────────────────────

  {
    id: 'spt_window_closes',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('sport_exit_attempted') &&
      G.age >= 20 && G.age <= 27 &&
      !G.mem?.sptWindowCloses,
    text: 'There is a point at which professional sport either happens or it doesn\'t. The window is narrower than it seems from inside it. You are still good — better than most people you will ever meet who play this game — but not good enough for the one thing good was supposed to mean. You settle into this knowledge over several weeks. It doesn\'t feel like settling. It feels like understanding the shape of what was available.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 6
      p.karma += 3
      p.addFlag('sport_path_closed')
      p.setMem('sptWindowCloses', true)
    },
  },

  // ── CRICKET'S IMPERIAL INHERITANCE ───────────────────────────────────────

  {
    id: 'spt_cricket_empire',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      SOUTH_ASIAN_CRICKET.concat(['South Africa', 'Zimbabwe', 'Kenya']).includes(G.character.country.name) &&
      G.age >= 18 && G.age <= 30 &&
      G.flags.includes('cricket_childhood') &&
      !G.mem?.sptCricketEmpire,
    text: (G) => {
      const cn = G.character.country.name
      if (SOUTH_ASIAN_CRICKET.includes(cn)) {
        return 'The British brought cricket to the subcontinent as a game the colonisers played and the colonised were permitted to learn. The game took root and the colonisers left and the game stayed. Now India wins the World Cup and England comes here to play and loses. There is a specific satisfaction in this that does not require elaboration. The game was supposed to teach you something about yourself. It taught you something about them instead.'
      }
      return 'Cricket here was a white sport for most of its history. The club memberships, the provincial colours, the national team. The sport has opened; the history of its closure is still close enough to be present. You play it anyway. What you make of it is your own.'
    },
    choices: null,
    effect: (p) => {
      p.r += 3
      p.karma += 4
      p.addFlag('cricket_colonial_inheritance')
      p.setMem('sptCricketEmpire', true)
    },
  },

  // ── THE WORLD CUP ─────────────────────────────────────────────────────────

  {
    id: 'spt_world_cup_year',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      const significantYears = [1970, 1978, 1982, 1986, 1994, 1998, 2002, 2006, 2010, 2014]
      return (
        FOOTBALL_COUNTRIES.includes(G.character.country.name) &&
        significantYears.includes(G.currentYear) &&
        G.age >= 16 && G.age <= 40 &&
        !G.mem?.sptWorldCupYear
      )
    },
    text: (G) => {
      const cn = G.character.country.name
      const yr = G.currentYear
      if (cn === 'Brazil' && yr === 1970) {
        return 'Pelé\'s team plays football that has no equivalent in any other era — the speed, the movement, the goals that seem to exceed what goals are supposed to be. The country is under a military dictatorship and the government uses the tournament as evidence that everything is fine. You know this. You also know the goal against Italy in the final was the best thing you have ever seen. Both are true.'
      }
      if (cn === 'Argentina' && yr === 1978) {
        return 'Argentina hosts and wins the tournament while the dictatorship operates detention centres less than a mile from the stadium. The junta planned it this way — the Cup as proof to the world that the country was stable and proud. You watch the matches. You know what is happening nearby. You watch the matches anyway. This is the specific moral experience of a country at war with itself.'
      }
      if (cn === 'France' && yr === 1998) {
        return 'Zidane heads in two. The team that wins the World Cup is multiracial in a way France hasn\'t been before — Zidane, Thuram, Desailly, Vieira. In the streets that night something feels possible that didn\'t feel possible that morning. Three years later you will remember this as something that was true and also did not last.'
      }
      if (['Nigeria', 'Ghana', 'Senegal', 'Morocco', 'Egypt', 'Ivory Coast', 'Cameroon'].includes(cn)) {
        return 'The national team reaches the tournament. The country watches together in a way it does not for anything else — bars full at midday, offices clearing in the afternoon, the specific collective attention of a place that has agreed, temporarily, to care about the same thing at the same time.'
      }
      return 'The World Cup is on. The country is watching. This is a different kind of collective attention from what ordinary days contain — a temporary permission to care about something with your whole body, loudly, in public, alongside strangers you will never meet again.'
    },
    choices: null,
    effect: (p) => {
      p.m += 8
      p.s += 2
      p.addFlag('world_cup_generation')
      p.setMem('sptWorldCupYear', true)
    },
  },

  // ── THE ADULT LEAGUE ──────────────────────────────────────────────────────

  {
    id: 'spt_adult_league',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('football_childhood') &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.sptAdultLeague,
    text: 'Sunday mornings, the amateur league. The teams are from pubs or offices or streets. The standard varies — some players were very nearly professional once; others are there for the socialising and would prefer not to run. The referee is a man from another team. The game is taken seriously in a way that is slightly comic given that nothing depends on it, and also in a way that is real, because the men who play it have arranged their entire Sunday around being here.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 3
      p.addFlag('played_into_adulthood')
      p.setMem('sptAdultLeague', true)
    },
  },

  // ── THE LAST GAME ─────────────────────────────────────────────────────────

  {
    id: 'spt_last_game',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('played_into_adulthood') &&
      G.age >= 40 && G.age <= 52 &&
      !G.mem?.sptLastGame,
    text: 'At some point you play the last game. You don\'t know it\'s the last game at the time — you notice, six months later, that you haven\'t played since. The knee was bad. The season ended and didn\'t restart. Something happened with the Sunday roster. The ending is not a decision but a lapse that becomes permanent. You don\'t go back. You aren\'t sure whether to call it a loss.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 5
      p.addFlag('stopped_playing')
      p.setMem('sptLastGame', true)
    },
  },

  // ── TEACHING THE GAME ─────────────────────────────────────────────────────

  {
    id: 'spt_teaching_the_game',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('football_childhood') &&
      G.children?.length > 0 &&
      G.age >= 34 && G.age <= 50 &&
      !G.mem?.sptTeachingGame,
    text: (G) => {
      const child = G.children?.[0]
      return `${child?.name ?? 'Your child'} is old enough. You take them to a match, or you kick a ball in the garden, or you sit beside them while the television shows the game you learned to love before they were born. You aren't sure whether the thing you loved will transfer. But you find yourself wanting to give them access to it — this particular way of being in a crowd, of caring about something with strangers, of letting the afternoon contain no other task.`
    },
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 4
      p.addFlag('passed_football_on')
      p.setMem('sptTeachingGame', true)
    },
  },

  // ── THE CRICKET LEGACY ────────────────────────────────────────────────────

  {
    id: 'spt_cricket_legacy',
    phase: 'late_life',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('cricket_colonial_inheritance') &&
      G.age >= 55 &&
      !G.mem?.sptCricketLegacy,
    text: (G) => {
      const cn = G.character.country.name
      if (SOUTH_ASIAN_CRICKET.includes(cn)) {
        return 'From here the arc is long enough to see whole: the game came with the British, was learned under the British, was used to demonstrate things to the British, and now is played in front of billions while England qualifies for the knockout stages and goes home early. The specific pleasure of this has not diminished over decades. You do not have to explain it to anyone who grew up here.'
      }
      return 'You have watched the game change from what it was when you first played it. Who controls the money, who is on the posters, whose country wins the tournaments. The game that was supposed to belong to certain people no longer belongs to them in the same way. You notice this without quite knowing what to do with the noticing.'
    },
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 3
      p.setMem('sptCricketLegacy', true)
    },
  },

]

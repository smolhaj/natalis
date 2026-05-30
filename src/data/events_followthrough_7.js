// events_followthrough_7.js
// Follow-through events for flags set by BUILD 39 (events_sport.js),
// BUILD 53 (events_disasters.js), and the world events added in this build.
// Every flag set by those modules that had no downstream consequence now has one.

export const FOLLOWTHROUGH_7_EVENTS = [

  // ── BUILD 39: SPORT FOLLOW-THROUGHS ──────────────────────────────────────

  {
    id: 'ft7_sport_path_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('sport_path_closed') &&
      G.age >= 35 &&
      !G.mem?.ft7SportPathMidlife,
    text: 'You watch a match and one of the players is your age when you stopped — which means they have eight years left, or four, depending on how their body holds. You were never going to be them. You knew this by twenty-three. What you still carry is not the disappointment, which has mostly gone, but the specific knowledge of what the game actually requires: the hours, the discipline, the indifference to weather and inconvenience. That knowledge did not disappear when the path did.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft7SportPathMidlife', true)
    },
  },

  {
    id: 'ft7_stopped_playing_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('stopped_playing') &&
      G.age >= 60 &&
      !G.mem?.ft7StoppedPlayingEcho,
    text: 'A grandchild, or a neighbour\'s child, or someone on television plays the game. You watch them with the particular attention of a person who knows from inside what the movement costs and what it requires. What you remember is not the score of any match but the specific feel of a clean contact — the moment when the body does exactly what you asked it to do. You carried that longer than you expected.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('ft7StoppedPlayingEcho', true)
    },
  },

  {
    id: 'ft7_world_cup_teaching',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('world_cup_generation') &&
      G.children?.length > 0 &&
      G.age >= 35 &&
      !G.mem?.ft7WorldCupTeaching,
    text: (G) => {
      const child = G.children?.[0]
      return `A World Cup year. You explain to ${child?.name ?? 'your child'} why this particular tournament, this particular team, means more than a game means. You are not sure you can explain it adequately — the thing you are trying to give them access to is an experience from your own childhood that exists only inside you. You try anyway. Some of it lands. Some of it doesn't, which is how all transmissions of this kind go.`
    },
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 3
      p.setMem('ft7WorldCupTeaching', true)
    },
  },

  {
    id: 'ft7_passed_football_on_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('passed_football_on') &&
      G.age >= 58 &&
      !G.mem?.ft7PassedFootballOnLate,
    text: (G) => {
      const child = G.children?.[0]
      return `${child?.name ?? 'Your child'} watches a match the way you taught them to watch — knowing what they're looking for, having opinions, caring about the result in a way that is slightly absurd and also completely genuine. You recognise this in them. You did not know whether this particular thing would transfer when you tried to give it. It transferred.`
    },
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.setMem('ft7PassedFootballOnLate', true)
    },
  },

  // ── BUILD 53: DISASTER FOLLOW-THROUGHS ───────────────────────────────────

  {
    id: 'ft7_flood_crisis_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('flood_crisis_witnessed') &&
      G.age >= 35 &&
      !G.mem?.ft7FloodCrisisMidlife,
    text: 'A news story about flooding somewhere. The images are familiar in structure — submerged roads, furniture on rooftops, people wading — but the specific geography is somewhere else. The number of dead is in the lower third. You watch it with the specific attention of someone who knows what comes after the cameras leave: the mould in the walls, the seed stock that didn\'t survive, the school that reopens late because the building needs work and the money hasn\'t come.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.setMem('ft7FloodCrisisMidlife', true)
    },
  },

  {
    id: 'ft7_earthquake_survived_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('earthquake_survived') &&
      G.age >= 60 &&
      !G.mem?.ft7EarthquakeSurvivedLate,
    text: 'You hear about another earthquake somewhere. You know the sequence before the news tells it: the initial magnitude, then the revised toll, then the search for survivors in the rubble, then the argument about building codes, then the argument fades. You have done the work of having been through one. The knowledge sits in you differently from knowledge you acquired from reading.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft7EarthquakeSurvivedLate', true)
    },
  },

  {
    id: 'ft7_survived_major_storm_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('survived_major_storm') &&
      G.age >= 55 &&
      !G.mem?.ft7SurvivedMajorStormLate,
    text: 'Another typhoon season. The younger people in the family have not been through the worst of it; you have. You prepare without drama and check that others are prepared. The knowledge is not impressive — it is practical. You are the person who knows which house is too close to the water and which radio frequency the coast guard uses. This is what surviving something and staying gives you: the specific competence of having done it before.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 5
      p.setMem('ft7SurvivedMajorStormLate', true)
    },
  },

  // ── WORLD EVENT FOLLOW-THROUGHS ───────────────────────────────────────────

  {
    id: 'ft7_bhola_survivor_liberation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('bhola_survivor') &&
      G.flags.includes('liberation_war_witnessed') &&
      G.age >= 20 &&
      !G.mem?.ft7BholaSurvivorLiberation,
    text: 'The cyclone and the war arrive in the same two-year span of your life. The government that did not send the relief ships is the same government that sent the soldiers. This connection is not made by the international community but it is made by everyone here. The specific inadequacy of the response to the cyclone in November 1970 is part of the accounting of what happened in 1971. You know this without having been told it explicitly.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 5
      p.r += 4
      p.setMem('ft7BholaSurvivorLiberation', true)
    },
  },

  {
    id: 'ft7_tangshan_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('tangshan_witness') &&
      G.age >= 40 &&
      !G.mem?.ft7TangshanMidlife,
    text: 'A news story about an earthquake somewhere — Turkey, or Japan, or the Philippines — and the conversation in the room stops for a moment. You were there when the ground moved, when the city that was there the night before was not there in the morning. You do not tell the story in those terms. You watch the number revise upward over the following days and you understand something about what the number contains that people who weren\'t there cannot understand from the number alone.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.r += 3
      p.setMem('ft7TangshanMidlife', true)
    },
  },

  {
    id: 'ft7_cricket_generation_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('cricket_generation') &&
      G.age >= 60 &&
      !G.mem?.ft7CricketGenerationEcho,
    text: 'You have watched the game change more than it changed in any previous generation. The money came from somewhere other than where it used to come from. The best players are from countries that weren\'t competitive within living memory. The tournaments are in new places. The game that was supposed to belong to the people who invented it belongs, now, to the people who were supposed to learn it from them. You find this satisfying in a way you wouldn\'t have predicted when you were young.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft7CricketGenerationEcho', true)
    },
  },

]

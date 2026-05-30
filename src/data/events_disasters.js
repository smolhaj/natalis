// events_disasters.js
// BUILD 53 — Natural Disaster as Biography
// Bangladesh flood seasons, earthquake preparedness, typhoon cultures.
// Disaster not as a one-off shock event but as the texture of living
// in a particular geography — what it means to be a person in a place
// that shakes, floods, or storms on a calendar.

const EARTHQUAKE_COUNTRIES = [
  'Japan', 'Turkey', 'Iran', 'Mexico', 'Chile', 'Peru',
  'Indonesia', 'Philippines', 'Nepal', 'New Zealand',
]

export const DISASTER_EVENTS = [

  // ── BANGLADESH: FLOOD SEASON ──────────────────────────────────────────────

  {
    id: 'dis_bangladesh_flood',
    phase: 'childhood',
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.ruralUrban === 'rural' &&
      G.age >= 7,
    text: 'The flood arrives in June, as it does. The year\'s only question is how high it will come. The water enters the lower parts of the village first — the kitchen garden, the path to the school. You know the signs: the river colour, what the frogs are doing, which direction the birds fly. This year the water reaches the bottom step of the house. You move what can be moved to the upper shelves. The family has done this before. It is not a disaster; it is the season.',
    choices: null,
    effect: (p) => {
      p.m -= 2
      p.e += 2
      p.addFlag('flood_season_known')
    },
  },

  // ── BANGLADESH: THE YEAR IT GETS WORSE ───────────────────────────────────

  {
    id: 'dis_bangladesh_bad_flood',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('flood_season_known') &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.disBangladeshBadFlood,
    text: 'This year is different. The water comes higher than anyone remembers and does not go down when it should. The rice is underwater. The road to the market is underwater. Three houses on the lower side of the village are uninhabitable. Families double up. Government trucks arrive after what they were needed for. You help carry things. The normalcy of the flood becomes something else when the flood does not end on the flood\'s usual schedule.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.h -= 4
      p.r += 5
      p.karma += 5
      p.addFlag('flood_crisis_witnessed')
      p.setMem('disBangladeshBadFlood', true)
    },
  },

  // ── THE FLOOD FROM FAR AWAY ───────────────────────────────────────────────

  {
    id: 'dis_flood_from_distance',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('flood_season_known') &&
      G.flags.includes('emigrated') &&
      G.age >= 28 &&
      !G.mem?.disFloodFromDistance,
    text: 'The news from home is flood news. Photographs on a phone — the street you grew up on underwater, the school closed, a cousin\'s house with furniture on the roof. You are here and cannot do what needed doing. You send money. It arrives after the water has already receded or before it has peaked, depending on the transfer speed. Distance from a flood you grew up knowing is a different kind of distance from other distances.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.karma += 3
      p.setMem('disFloodFromDistance', true)
    },
  },

  // ── EARTHQUAKE PREPAREDNESS ───────────────────────────────────────────────

  {
    id: 'dis_earthquake_preparedness',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      EARTHQUAKE_COUNTRIES.includes(G.character.country.name) &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.disEarthquakePrepared,
    text: (G) => {
      const cn = G.character.country.name
      if (cn === 'Japan') {
        return 'You have done the drill since primary school: drop, cover, hold on. The bag by the door — water, three days of food, cash, a copy of your documents, a torch — is not a precaution but a habit. You know which buildings in your neighbourhood were built before 1981 and are therefore suspect. You know which route out of the city avoids elevated expressways. This knowledge is not anxiety. It is the maintenance of a life in a country that shakes.'
      }
      if (cn === 'Turkey') {
        return 'Every building you enter, you check the pillars. You know which neighbourhoods were rebuilt properly after 1999 and which were built by contractors who paid for certificates rather than engineering. The bag by the door has been there since your mother put one there when you were seven. You updated it twice. This is not fear; this is competence in a country where the ground is unreliable.'
      }
      if (['Chile', 'Peru', 'Mexico'].includes(cn)) {
        return 'You grew up with the drill. The teachers made you practice it in a way that was routine and also not — because the teachers themselves had been in one, and the school building had marks on the corners from the last significant event. The bag by the door is a cultural fact here, like umbrellas in rainy cities.'
      }
      if (['Indonesia', 'Philippines', 'Nepal'].includes(cn)) {
        return 'Living here is living with it. The school teaches the drill; the community knows the evacuation routes; the old people know which hillsides moved and which stayed still in the year they don\'t name directly. You have added your own knowledge to this over time.'
      }
      return 'You carry the knowledge the way people in flood plains know what to watch for in the river — not with dread, but with orientation. Living here means knowing this.'
    },
    choices: null,
    effect: (p) => {
      p.e += 3
      p.addFlag('earthquake_prepared')
      p.setMem('disEarthquakePrepared', true)
    },
  },

  // ── THE EARTHQUAKE ITSELF ─────────────────────────────────────────────────

  {
    id: 'dis_earthquake_experience',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('earthquake_prepared') &&
      G.age >= 30 &&
      !G.mem?.disEarthquakeExperience,
    text: (G) => {
      const cn = G.character.country.name
      if (cn === 'Japan') {
        return 'You are in the office when it starts. The building makes a sound before it moves — or the movement and the sound are simultaneous; you cannot reconstruct the sequence after. The drill runs automatically: you are under the desk before you have decided to be. The shaking lasts forty seconds. You count. When it stops you check the building, the people, your phone. The bag is still by the door at home. You check it that evening.'
      }
      return 'The floor moves. You have been prepared for this since childhood and the preparation works — you are in the correct position, calm, accounting for the people around you. When it is over, it worked. You notice this specifically. You had not been entirely certain, until now, that it would.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.karma += 3
      p.addFlag('earthquake_survived')
      p.setMem('disEarthquakeExperience', true)
    },
  },

  // ── TYPHOON SEASON ────────────────────────────────────────────────────────

  {
    id: 'dis_typhoon_season',
    phase: 'childhood',
    weight: 3,
    cooldown: 6,
    when: (G) =>
      ['Philippines', 'Vietnam', 'Japan'].includes(G.character.country.name) &&
      G.age >= 8,
    text: (G) => {
      const cn = G.character.country.name
      if (cn === 'Philippines') {
        return 'Typhoon season is June to December. The pattern is known: the sky colour the day before, the pressure drop you feel in your ears. You board the windows with wood from under the house. You fill containers with water. You move the animals. The school will close; the power will go. The family gathers in the room with the fewest windows and waits. This has happened every year of your life. It is not catastrophe; it is the calendar.'
      }
      if (cn === 'Vietnam') {
        return 'Central Vietnam catches the storms that form in the South China Sea in autumn. The evacuation routes are posted at the commune office. You know which houses in the village are built solid enough and which are not — the difference matters and everyone knows it. The government radio gives six hours\' warning when it works. When it doesn\'t, the birds leaving early in the morning tell you what you need to know.'
      }
      return 'The storm season is a condition of living here. You know its calendar the way you know the school calendar. The preparations are not performed in panic but in the ordinary way of things that happen every year and must be done.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.e += 2
      p.addFlag('typhoon_season_known')
    },
  },

  // ── TYPHOON: A BAD YEAR ───────────────────────────────────────────────────

  {
    id: 'dis_typhoon_bad_year',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.flags.includes('typhoon_season_known') &&
      G.character.country.name === 'Philippines' &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.disTyphoonBadYear,
    text: 'Super Typhoon. The word is used specifically; it means something different from the annual storms. The winds exceed what the classification system was designed for. Afterwards, the scale of what happened is communicated in numbers that don\'t fully communicate it: thousands dead, millions displaced, municipalities simply not there anymore. You are here and helping with what you can. The question of why this keeps happening to the same places is political, and it is not being asked at the same volume as the aid requests.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.h -= 5
      p.karma += 6
      p.addFlag('survived_major_storm')
      p.setMem('disTyphoonBadYear', true)
    },
  },

  // ── LIVING WITH THE KNOWLEDGE ─────────────────────────────────────────────

  {
    id: 'dis_living_with_it',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      (G.flags.includes('flood_season_known') || G.flags.includes('earthquake_prepared') || G.flags.includes('typhoon_season_known')) &&
      G.age >= 60 &&
      !G.mem?.disLivingWithIt,
    text: 'You have spent your life in a place that requires particular knowledge — the knowledge of when the ground moves, or when the water rises, or when the sky is telling you something. This knowledge is not interesting to the people you are now related to by accident of their geography. They live in places where the floor stays still and the river behaves. What you carry is not fear. It is competence that happened to be required.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('disLivingWithIt', true)
    },
  },

]

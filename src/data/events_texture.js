// events_texture.js
// Lived-texture events: the grain of ordinary life in specific times and places.
// Rural developing world, pre-1960 era, and career arc events.
// These are not dramatic events — they are the furniture of a life.

const ruralDeveloping = (G) =>
  G.ruralUrban === 'rural' &&
  ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype)

const wealthyWest = (G) => G.character.country.archetype === 'wealthy_west'
const postSoviet = (G) => G.character.country.archetype === 'post_soviet'
const wealthyWestOrSoviet = (G) => wealthyWest(G) || postSoviet(G)

// Cities people from rural areas hear about as work destinations
const WORK_CITIES = {
  Nigeria: ['Lagos', 'Abuja', 'Kano'],
  Ethiopia: ['Addis Ababa', 'Dire Dawa', 'Mekelle'],
  Kenya: ['Nairobi', 'Mombasa', 'Kisumu'],
  'DR Congo': ['Kinshasa', 'Lubumbashi', 'Goma'],
  Ghana: ['Accra', 'Kumasi', 'Tema'],
  Senegal: ['Dakar', 'Thiès', 'Saint-Louis'],
  Mozambique: ['Maputo', 'Beira', 'Nampula'],
  Rwanda: ['Kigali', 'Butare', 'Gisenyi'],
  Tanzania: ['Dar es Salaam', 'Dodoma', 'Mwanza'],
  Uganda: ['Kampala', 'Jinja', 'Gulu'],
  Namibia: ['Windhoek', 'Walvis Bay', 'Swakopmund'],
  Vietnam: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'],
  Philippines: ['Manila', 'Cebu', 'Davao'],
  Indonesia: ['Jakarta', 'Surabaya', 'Bandung'],
  Thailand: ['Bangkok', 'Chiang Mai', 'Nakhon Ratchasima'],
  India: ['Mumbai', 'Delhi', 'Kolkata'],
  China: ['Shenzhen', 'Shanghai', 'Guangzhou'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília'],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir'],
  Colombia: ['Bogotá', 'Medellín', 'Cali'],
  Argentina: ['Buenos Aires', 'Córdoba', 'Rosario'],
  'South Africa': ['Johannesburg', 'Cape Town', 'Durban'],
  Egypt: ['Cairo', 'Alexandria', 'Port Said'],
  Morocco: ['Casablanca', 'Marrakesh', 'Rabat'],
  Peru: ['Lima', 'Arequipa', 'Cusco'],
  Chile: ['Santiago', 'Valparaíso', 'Concepción'],
  Jordan: ['Amman', 'Zarqa', 'Irbid'],
  Bangladesh: ['Dhaka', 'Chittagong', 'Sylhet'],
  Pakistan: ['Karachi', 'Lahore', 'Islamabad'],
  Venezuela: ['Caracas', 'Maracaibo', 'Valencia'],
  Haiti: ['Port-au-Prince', 'Cap-Haïtien', 'Les Cayes'],
  Zimbabwe: ['Harare', 'Bulawayo', 'Mutare'],
  Cambodia: ['Phnom Penh', 'Siem Reap', 'Battambang'],
  Iran: ['Tehran', 'Isfahan', 'Mashhad'],
  Cuba: ['Havana', 'Santiago de Cuba', 'Camagüey'],
  'Sri Lanka': ['Colombo', 'Kandy', 'Jaffna'],
  Nepal: ['Kathmandu', 'Pokhara', 'Bhaktapur'],
  Bolivia: ['Santa Cruz', 'La Paz', 'Cochabamba'],
  Laos: ['Vientiane', 'Luang Prabang', 'Savannakhet'],
  Guatemala: ['Guatemala City', 'Quetzaltenango', 'Antigua'],
}

// Remittance source cities: [domestic big city, foreign destination]
const REMITTANCE_SOURCES = {
  Nigeria: ['Lagos', 'London'],
  Ethiopia: ['Addis Ababa', 'Riyadh'],
  Kenya: ['Nairobi', 'London'],
  'DR Congo': ['Kinshasa', 'Brussels'],
  Ghana: ['Accra', 'London'],
  Senegal: ['Dakar', 'Paris'],
  Mozambique: ['Maputo', 'Johannesburg'],
  Rwanda: ['Kigali', 'Brussels'],
  Tanzania: ['Dar es Salaam', 'Doha'],
  Uganda: ['Kampala', 'London'],
  Namibia: ['Windhoek', 'Cape Town'],
  Vietnam: ['Ho Chi Minh City', 'Seoul'],
  Philippines: ['Manila', 'Riyadh'],
  Indonesia: ['Jakarta', 'Abu Dhabi'],
  Thailand: ['Bangkok', 'Singapore'],
  India: ['Mumbai', 'Dubai'],
  China: ['Shanghai', 'New York'],
  Brazil: ['São Paulo', 'Boston'],
  Mexico: ['Mexico City', 'Los Angeles'],
  Turkey: ['Istanbul', 'Frankfurt'],
  Colombia: ['Bogotá', 'Miami'],
  Argentina: ['Buenos Aires', 'Madrid'],
  'South Africa': ['Johannesburg', 'London'],
  Egypt: ['Cairo', 'Riyadh'],
  Morocco: ['Casablanca', 'Paris'],
  Peru: ['Lima', 'Santiago'],
  Chile: ['Santiago', 'Madrid'],
  Jordan: ['Amman', 'Abu Dhabi'],
  Bangladesh: ['Dhaka', 'Doha'],
  Pakistan: ['Karachi', 'Dubai'],
  Venezuela: ['Caracas', 'Bogotá'],
  Haiti: ['Port-au-Prince', 'Miami'],
  Zimbabwe: ['Harare', 'Johannesburg'],
  Cambodia: ['Phnom Penh', 'Bangkok'],
  Iran: ['Tehran', 'Dubai'],
  Cuba: ['Havana', 'Miami'],
  'Sri Lanka': ['Colombo', 'Riyadh'],
  Nepal: ['Kathmandu', 'Doha'],
  Bolivia: ['Santa Cruz', 'Buenos Aires'],
  Laos: ['Vientiane', 'Bangkok'],
  Guatemala: ['Guatemala City', 'Los Angeles'],
}

const getWorkCities = (G) => WORK_CITIES[G.character.country.name] || ['the capital', 'the port', 'the next province']
const getRemittanceSources = (G) => REMITTANCE_SOURCES[G.character.country.name] || ['the city', 'abroad']

export const TEXTURE_EVENTS = [

  // ── RURAL DEVELOPING WORLD ───────────────────────────────────────────────────

  {
    id: 'rural_water_fetch',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 6 && G.age <= 16 &&
      G.currentYear < 2000 &&
      !G.flags.includes('rural_water_fetch_done'),
    text: 'Every morning before school you carry water from the well or the river. Two jerricans. The full ones weigh more than you expected the first time and less than they do now — you have changed to fit the task. The walk is forty minutes each way along a path you know by rut and root. You calculate without thinking: how much water, how many trips, how much time before the light changes.',
    choices: null,
    effect: (p) => { p.h += 2; p.m -= 5; p.addFlag('subsistence_childhood'); p.addFlag('rural_water_fetch_done') },
  },

  {
    id: 'rural_harvest_time',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 8 && G.age <= 18 &&
      !G.flags.includes('rural_harvest_done'),
    text: 'School is suspended during harvest. The whole household works — parents, siblings, neighbors helping each other in rotation. You are handed a tool appropriate to your size and fitted into the line. The days are long and the work is specific: your hands learn the motion before your mind does. The crop has a smell when it comes out of the ground. This is what the year was for.',
    choices: null,
    effect: (p) => { p.h += 3; p.m += 4; p.addFlag('subsistence_childhood'); p.addFlag('rural_harvest_done') },
  },

  {
    id: 'rural_crop_failure',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 18 && G.age <= 50 &&
      !G.flags.includes('rural_crop_failure_done'),
    text: 'The rains did not come on time. Then they did not come at all. You watch the field over several weeks understand what a bad harvest means in concrete terms: less food, less money, debts extended, decisions deferred. Your father does not talk much during this period. The calculation of what you can sell and what you will eat runs continuously in the background of every conversation.',
    choices: [
      {
        text: 'Look for seasonal work in the city to bridge the gap',
        tag: null,
        outcome: 'You leave for three months. The money you send back keeps the household. When you return the field has been replanted.',
        effect: (p) => { p.mo += 150; p.m -= 6; p.r += 4; p.addFlag('seasonal_migrant'); p.addFlag('rural_crop_failure_done') },
      },
      {
        text: 'Stay and work the land through it',
        tag: null,
        outcome: 'You eat less. The debt with the local trader grows. The season ends. Next year the rains may come.',
        effect: (p) => { p.h -= 5; p.mo -= 100; p.m -= 8; p.r += 5; p.addFlag('rural_crop_failure_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_market_day',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 8 && G.age <= 40 &&
      !G.flags.includes('rural_market_day_done'),
    text: (G) => {
      const [c1, c2, c3] = getWorkCities(G)
      return `Market day is a weekly event that requires most of the previous day to prepare for. The walk to the nearest town takes two hours. Your mother wraps things in cloth and balances them. In the market there is noise, argument, news from other villages, the smell of things you do not eat every day. Someone tells your mother about a road being built. Someone else says a man from your village found work in ${c1}, in ${c2}, in ${c3}. The market is where the world arrives.`
    },
    choices: null,
    effect: (p) => { p.e += 4; p.s += 3; p.m += 6; p.addFlag('rural_market_day_done') },
  },

  {
    id: 'rural_first_electricity',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.ruralUrban === 'rural' &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.currentYear >= 1960 && G.currentYear <= 1995 &&
      G.age >= 5 && G.age <= 18 &&
      !G.flags.includes('first_electricity'),
    text: 'Electricity comes to the village. Workers string cables along poles that appeared over several weeks and which you watched without understanding. Then one evening the bulb in your house is switched on. It is not a remarkable bulb. The light is not particularly warm. But the dark outside the window is different now — there is a perimeter where there was not one before. Your mother covers her face with both hands and laughs.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 5; p.addFlag('first_electricity') },
  },

  {
    id: 'rural_first_paved_road',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'rural' &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.currentYear >= 1965 && G.currentYear <= 2000 &&
      !G.flags.includes('rural_paved_road_done'),
    text: 'The road is paved. Trucks can come now without losing a wheel in the ruts. The market town is an hour closer. The bus route extends to include your village. Your father stands at the edge of the new tarmac and runs his sandal along it. Within a year, things are available here that you used to walk half a day to find. What moves on a road is not only goods.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 8; p.addFlag('rural_paved_road_done') },
  },

  {
    id: 'rural_migration_temptation',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 16 && G.age <= 25 &&
      !G.flags.includes('rural_migration_decided'),
    text: 'The young men have been leaving. Some go to the capital. Some go further. A cousin sends back a photograph: he is wearing clean trousers and standing in front of a building that is entirely concrete. You do not know what he does there. He says it is better. Your mother says the village needs people. Both things seem true.',
    choices: [
      {
        text: 'Start planning to leave for the city',
        tag: null,
        outcome: 'You save what you can. The departure is not dramatic — you pack a bag and walk to the bus stop while it is still early.',
        effect: (p) => { p.e += 6; p.m -= 4; p.r += 5; p.addFlag('rural_migration_decided'); p.addFlag('left_for_city') },
      },
      {
        text: 'Stay — the land, the family, the familiar',
        tag: null,
        outcome: 'You stay. The village thins out around you over the years. You are not certain you made the right choice and you are not certain you did not.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('rural_migration_decided'); p.addFlag('stayed_in_village') },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_seasonal_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.includes('seasonal_migrant') &&
      !G.flags.includes('left_for_city'),
    text: 'During the dry season, when the field requires less, you go to the city for work. Construction, unloading at the market, whatever is available. You sleep in a room with seven other men from villages like yours. You send money home every two weeks. In three months you return. You do this for several years running. The city becomes familiar in the specific way of a place you know without belonging to.',
    choices: null,
    effect: (p) => { p.mo += 200; p.s += 3; p.m -= 3; p.addFlag('seasonal_migrant') },
  },

  {
    id: 'rural_mobile_phone_village',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.ruralUrban === 'rural' &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.currentYear >= 1999 && G.currentYear <= 2010 &&
      !G.flags.includes('has_mobile'),
    text: 'The mobile phone network reaches your area. There was never a landline — the infrastructure skipped straight from nothing to this. The first phone in the village belongs to a trader who charges a fee to use it. Within eighteen months everyone has one. Your mother learns to use mobile money before she learns to send a text message. The phone does things here that it does not quite do the same way in rich countries.',
    choices: null,
    effect: (p) => { p.e += 6; p.m += 8; p.s += 3; p.addFlag('has_mobile'); p.addFlag('mobile_money') },
  },

  {
    id: 'rural_remittance',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 6 && G.age <= 25 &&
      !G.flags.includes('rural_remittance_done'),
    text: (G) => {
      const [city, abroad] = getRemittanceSources(G)
      return `Money arrives from a relative in the city or abroad — from ${city}, from ${abroad} — in an envelope or a Western Union slip. The amount is specific. Your mother calculates immediately: school fees, the roof, the medical bill that has been pending. There is a portion left over that is not spent but held. The relative's name is said with a particular quality at dinner. You understand that obligation and gratitude are not always easy to separate.`
    },
    choices: null,
    effect: (p) => { p.mo += 180; p.m += 5; p.r += 3; p.addFlag('remittance_family'); p.addFlag('rural_remittance_done') },
  },

  {
    id: 'rural_traditional_medicine',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 5 && G.age <= 17,
    text: 'You are sick. The hospital is forty kilometers away on a road that becomes mud in the rain. The herbalist comes to the house instead. He examines you, asks questions your mother answers, leaves instructions involving specific plants prepared in specific ways. You recover. Whether it was the herbs or time you cannot say. The distinction was not the point of the visit.',
    choices: [
      {
        text: 'Take the herbs as prescribed and rest',
        tag: null,
        outcome: 'You recover over a week. The fever breaks on a Thursday morning. Your mother boils more water and says nothing.',
        effect: (p) => { p.h += 4; p.addFlag('traditional_medicine') },
      },
      {
        text: 'Your family makes the journey to the clinic anyway',
        tag: null,
        outcome: 'The nurse gives you different medicine. The journey back is difficult. You are better within four days.',
        effect: (p) => { p.h += 7; p.mo -= 40; p.addFlag('accessed_clinic') },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_arranged_marriage_pressure',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.character.gender === 'female' &&
      G.age >= 16 && G.age <= 24 &&
      !G.flags.includes('rural_marriage_pressure_done'),
    text: 'Your family begins discussing your marriage with a seriousness that makes clear the discussion started some time ago, before you were included in it. There is a suitable man. The negotiation involves your father and his father and certain material considerations. You are consulted — your opinion is not the final variable, but it is heard. This is considered an improvement over how it was for your mother.',
    choices: [
      {
        text: 'Accept the arrangement — it is how things are done here',
        tag: null,
        outcome: 'You marry. The man is not unkind. Life proceeds. You find out who you are inside the arrangement.',
        effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('rural_marriage_pressure_done'); p.addFlag('arranged_marriage') },
      },
      {
        text: 'Negotiate — ask for more time, invoke your right to choose',
        tag: null,
        outcome: 'Your father is displeased and then, slowly, concedes some ground. The process takes two years and a great deal of family tension.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 4; p.addFlag('rural_marriage_pressure_done'); p.addFlag('resisted_arrangement') },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_land_inheritance',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      G.age >= 20 && G.age <= 40 &&
      !G.flags.includes('rural_land_inheritance_done'),
    text: 'Your father is old. The question of the land is being decided — not legally, because the legal system is not the one that governs this, but by the logic of the family and the village. Who worked it, who stayed, who sent money from the city but was not here. You are part of this negotiation whether or not you speak. Land is not property here in the simple sense. It is a relationship with the dead and the not-yet-born.',
    choices: [
      {
        text: 'Assert your claim — you stayed and worked it',
        tag: null,
        outcome: 'Your claim is recognized, partly. There is a portion. The family dispute takes two years to cool.',
        effect: (p) => { p.w += 8; p.m -= 5; p.r += 5; p.addFlag('rural_land_inheritance_done'); p.addFlag('inherited_land') },
      },
      {
        text: 'Defer to a sibling who needs it more',
        tag: null,
        outcome: 'You step back. The sibling is grateful for a long time. You do not regret it until the dry seasons that follow.',
        effect: (p) => { p.m += 3; p.r += 6; p.karma += 5; p.addFlag('rural_land_inheritance_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_childhood_labor',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ruralDeveloping(G) &&
      ['low', 'very_low'].includes(G.character.country.gdp) &&
      G.age >= 8 && G.age <= 14 &&
      !G.flags.includes('rural_childhood_labor_done'),
    text: 'Before school, or some days instead of school, you sell things at the roadside or help at your mother\'s market stall. You learn to count money quickly, to give change, to say the price with enough confidence that no one argues. The school knows. The teacher does not report it. You are not the only one. There is a whole economy running parallel to the school day that the school day cannot afford to acknowledge.',
    choices: null,
    effect: (p) => { p.e += 4; p.s += 4; p.m -= 5; p.addFlag('subsistence_childhood'); p.addFlag('rural_childhood_labor_done') },
  },

  // ── PRE-1960 ERA TEXTURE ─────────────────────────────────────────────────────

  {
    id: 'era_great_depression',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1929 && G.currentYear <= 1939 &&
      G.age >= 5 &&
      !G.flags.includes('era_depression_done'),
    text: 'The Depression arrives not all at once but in steps. First your father is working shorter hours. Then a neighbor loses his job. Then your father loses his. The tone of the house changes. Your mother starts managing the kitchen with a precision that was not there before. You learn that there is a relationship between the numbers in the newspaper and the food on the table, though nobody explains it directly.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 3; p.r += 6; p.addFlag('depression_era_childhood'); p.addFlag('era_depression_done') },
  },

  {
    id: 'era_depression_breadline',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1930 && G.currentYear <= 1937 &&
      G.character.wealthTier <= 2 &&
      G.age >= 5 && G.age <= 20 &&
      !G.flags.includes('era_breadline_done'),
    text: 'Your mother takes you to the distribution point. There is a queue that runs around the block and does not move quickly. The men in the queue do not look at each other. You are given bread and tinned goods. On the walk home your mother holds the package with both hands and does not speak. You learn that charity and dignity are not the same thing and that sometimes you cannot afford both.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('depression_era_childhood'); p.addFlag('era_breadline_done') },
  },

  {
    id: 'era_rationing_wwii',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 5 && G.age <= 30 &&
      !G.flags.includes('era_rationing_done'),
    text: 'The ration book is kept in the kitchen drawer. Sugar, meat, butter, cloth — each has a weekly allowance that cannot be exceeded. You learn to want what is available and not what is not. Your mother invents meals out of combinations that would not have occurred before the war. You do not call it deprivation. This is simply how things are. You will find, when the rationing ends, that you are not sure what to do with abundance.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('wwii_rationing'); p.addFlag('era_rationing_done') },
  },

  {
    id: 'era_victory_day',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      wealthyWestOrSoviet(G) &&
      G.currentYear === 1945 &&
      G.age >= 5 && G.age <= 30,
    text: 'The noise in the street happens before you understand why. People are coming out of doors. Someone is banging on a pan. Your mother stands at the window with her hand pressed against the glass and then she starts to cry, which frightens you, and then she is laughing, which is more frightening still. The war is over. You will hear adults talk about this moment for the rest of your life.',
    choices: null,
    effect: (p) => { p.m += 18; p.e += 5; p.addFlag('vj_day_memory') },
  },

  {
    id: 'era_postwar_prosperity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1960 &&
      G.age >= 18 && G.age <= 40 &&
      !G.flags.includes('era_postwar_done'),
    text: 'There is work. There is more work than there are people to do it. A man with your qualifications can walk into a factory or an office and be hired the same day. A family can afford a car and a house on a single income. The optimism is not naive — it is earned, the way optimism is only earned after a long period when it was not available. The country is being rebuilt and you are in the rebuilding of it.',
    choices: null,
    effect: (p) => { p.mo += 400; p.m += 10; p.w += 5; p.addFlag('postwar_prosperity'); p.addFlag('era_postwar_done') },
  },

  {
    id: 'era_radio_family',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      G.currentYear >= 1930 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 14 &&
      !G.flags.includes('era_radio_family_done'),
    text: 'In the evening the family gathers around the radio. Your father adjusts the dial until the voice comes through cleanly. There are programs everyone follows — serials, variety shows, the news — and the hour they come on has a gravitational quality that organizes the evening. The voice from the radio speaks with an authority that your father nods at. You learn what the world sounds like before you see very much of it.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 7; p.addFlag('radio_childhood'); p.addFlag('era_radio_family_done') },
  },

  {
    id: 'era_ice_box',
    phase: 'early_childhood',
    weight: 2,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1920 && G.currentYear <= 1950 &&
      G.age >= 3 && G.age <= 12,
    text: 'The iceman comes twice a week. He carries a block on his back with tongs and slides it into the top compartment of the icebox in the kitchen. Your mother plans meals around how long things will keep. When the refrigerator arrives — a white enamel box with a motor that hums — she stands in front of it for a long time. The iceman stops coming. You do not think about him for twenty years and then one day you do.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 5; p.addFlag('pre_refrigerator_childhood') },
  },

  {
    id: 'era_cold_war_fear',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1965 &&
      G.age >= 7 && G.age <= 17 &&
      !G.flags.includes('era_cold_war_done'),
    text: 'At school you practice the drill: when the bell rings, you go under the desk and cover your head with your arms. The civil defense leaflet your family received explains what to do in case of attack. Your parents keep it in a drawer. At a certain point you understand that the desk would not protect you from anything and that everyone knows this, and that the drill is for something other than survival — it is for the management of a fear that has no practical resolution.',
    choices: null,
    effect: (p) => { p.m -= 8; p.e += 4; p.r += 5; p.addFlag('cold_war_childhood'); p.addFlag('era_cold_war_done') },
  },

  {
    id: 'era_sputnik',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['wealthy_west', 'post_soviet'].includes(G.character.country.archetype) &&
      G.currentYear === 1957 &&
      G.age >= 5,
    text: 'The radio reports that the Soviets have put something into orbit. A metal sphere the size of a basketball, circling the earth every ninety-six minutes, beeping. Your father says something under his breath. Your teacher devotes the entire next day to it. On a clear night your neighbor sets up a lawn chair and claims he can see it passing overhead. Whether he can or not, everyone goes outside and looks up.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 5; p.addFlag('sputnik_generation') },
  },

  {
    id: 'era_decolonization',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 1945 && G.currentYear <= 1970 &&
      G.age >= 5 &&
      !G.flags.includes('era_decolonization_done'),
    text: 'Independence comes. There are ceremonies: a flag lowered, a flag raised, speeches in a language you are still learning. The street names are changed. The portraits in the school are changed. The word for your country is changed, or the way it is said is changed, or who says it has changed. On an ordinary Tuesday you are told that the country belongs to itself now. You are not entirely sure what was happening before or what happens next. The adults in your life seem to be feeling something you do not yet have words for.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 8; p.addFlag('independence_generation'); p.addFlag('era_decolonization_done') },
  },

  {
    id: 'era_partition',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      (
        (['India', 'Pakistan', 'Bangladesh'].includes(G.character.country.name) &&
          G.currentYear >= 1947 && G.currentYear <= 1952) ||
        (G.character.country.name === 'Israel' &&
          G.currentYear >= 1948 && G.currentYear <= 1953)
      ) &&
      G.age >= 5 &&
      !G.flags.includes('era_partition_done'),
    // Note: applies to South Asian partition (1947) and 1948 Palestine / Israeli independence
    text: 'There is a border now where there was not one before. It cuts through villages, farmland, families. Relatives are on the wrong side of it. People are moving in great columns in both directions. Your family\'s calculation — whether to stay, whether to go, whether what you are is safer here or there — happens over several weeks of lowered voices and unfinished sentences. Some of your neighbors disappear. New people appear in their houses. The word for what happened is still being argued over decades later.',
    choices: null,
    effect: (p) => { p.m -= 15; p.r += 12; p.addFlag('partition_generation'); p.addFlag('era_partition_done') },
  },

  {
    id: 'era_korean_war',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      G.currentYear >= 1950 && G.currentYear <= 1953 &&
      G.character.gender === 'male' &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.includes('era_korean_war_done'),
    text: 'The draft notice arrives. Korea. Your mother folds it and refolds it. There is a medical examination, a series of injections, a train. The men on the train are your age and speak in a register that is simultaneously joking and frightened. You serve. The war is over in 1953 and called a ceasefire which is not quite the same as over. You come back. Some of the men on the train do not.',
    choices: [
      {
        text: 'Serve and come home changed',
        tag: null,
        outcome: 'You come back two years later. The country has moved on in your absence. You find your place in it slowly.',
        effect: (p) => { p.h -= 8; p.m -= 10; p.r += 10; p.addFlag('korean_war_veteran'); p.addFlag('era_korean_war_done') },
      },
      {
        text: 'Find a way to avoid service — medical deferral, connections',
        tag: null,
        outcome: 'Through a doctor\'s note or a well-placed call you are passed over. You do not feel entirely clean about it. Some of the men you know do not come back.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('era_korean_war_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'era_1950s_conformity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      wealthyWest(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1965 &&
      G.age >= 18 && G.age <= 40 &&
      !G.flags.includes('era_conformity_done'),
    text: 'The shape of the correct life is very specific: a house in a suburb, a spouse, children, a job that is stable and does not attract attention. The lawn is mowed. The car is domestic. You go to church or you go to the civic organization and either way you are seen. People who live differently are noticed and the noticing has consequences. You are aware of living inside a template and uncertain whether this awareness makes you different from everyone else or just more honest about the same situation.',
    choices: [
      {
        text: 'Fit the template — stability has its own value',
        tag: null,
        outcome: 'The life is comfortable and predictable. You know what the next decade looks like. Some nights you find this a relief.',
        effect: (p) => { p.m += 3; p.r += 8; p.addFlag('suburban_conformity'); p.addFlag('era_conformity_done') },
      },
      {
        text: 'Resist at the edges — cultivate an inner life the template doesn\'t account for',
        tag: null,
        outcome: 'You read things that are not assigned. You have conversations that go places. The outer life looks correct. The inner life is yours.',
        effect: (p) => { p.e += 8; p.m -= 3; p.r += 4; p.addFlag('inner_dissident'); p.addFlag('era_conformity_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'era_domestic_service_wealthy',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1920 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 18 &&
      G.character.wealthTier >= 4 &&
      !G.flags.includes('era_domestic_service_done'),
    text: 'There is a woman who comes every day and cleans and sometimes cooks. She arrived before you can remember. You know her name and she knows yours and there is a warmth between you that does not map neatly to any of the words for relationship. You notice, when you visit a school friend who does not have one, that your house runs differently. Later you will think about what she was paid.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 4; p.addFlag('class_awareness'); p.addFlag('era_domestic_service_done') },
  },

  {
    id: 'era_domestic_service_working',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.currentYear >= 1920 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 18 &&
      G.character.wealthTier <= 2 &&
      !G.flags.includes('era_domestic_service_done'),
    text: 'Your mother works as a domestic for a family in the better part of town. She leaves before you wake up and sometimes arrives home after you eat. The house she works in has a certain quality she describes in fragments: the silverware, the rooms you are not meant to enter, the children who treat her with kindness and the one who does not. The work is steady. The arrangements are clear. The dignity is something she maintains on her own terms.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 6; p.mo += 120; p.addFlag('service_economy_family'); p.addFlag('era_domestic_service_done') },
  },

  {
    id: 'era_factory_town',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['wealthy_west', 'post_soviet'].includes(G.character.country.archetype) &&
      G.currentYear >= 1930 && G.currentYear <= 1970 &&
      G.age >= 6 && G.age <= 17 &&
      !G.flags.includes('era_factory_town_done'),
    text: 'The factory is the town. Your father works there or your uncle does or the father of every child in your class. The whistle at six in the morning means the same thing it means at three in the afternoon and at eleven at night for the night shift. The whole town runs on a schedule imposed by the factory. When you walk past it after school you can feel the heat from thirty meters away. The smell becomes so ordinary that you stop noticing it and then, years later in a different city, you smell something similar and for a moment you are nine years old again.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 4; p.addFlag('factory_town_childhood'); p.addFlag('era_factory_town_done') },
  },

  {
    id: 'era_letter_writing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1920 && G.currentYear <= 1960 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.includes('era_letter_writing_done'),
    text: 'You write a letter. It takes twenty minutes and you cross things out. The reply, if it comes, takes a week or more — longer if the person is abroad. In between you hold your question in suspension, not knowing whether it has been received, whether the person is well, whether what you wrote came across as you intended. You write differently when you know there will be no reply for ten days. The weight of that gap changes the sentences.',
    choices: null,
    effect: (p) => { p.e += 4; p.s += 3; p.m -= 3; p.addFlag('letter_writing_era'); p.addFlag('era_letter_writing_done') },
  },

  // ── CAREER PEAK AND DECLINE ──────────────────────────────────────────────────

  {
    id: 'career_recognition',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 30 && G.age <= 50 &&
      G.stats.smarts >= 55 &&
      !G.flags.includes('career_recognition_done'),
    text: 'Your work is recognized in a way that is specific and earned — a promotion to a senior level, a commendation that names what you actually did, a moment in a meeting where someone defers to you without thinking about it. You understand something that you didn\'t before: you are good at this. Not just capable. Good. The recognition is almost beside the point. The knowledge is the thing.',
    choices: null,
    effect: (p) => { p.mo += 500; p.m += 10; p.s += 5; p.w += 5; p.addFlag('professionally_recognized'); p.addFlag('career_recognition_done') },
  },

  {
    id: 'career_peak_satisfaction',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 35 && G.age <= 50 &&
      !G.flags.includes('laid_off') &&
      !G.flags.includes('career_peak_done'),
    text: 'There is a period — it lasts perhaps two or three years — when you are at the exact intersection of experience and energy. You know what you are doing and you still have the stamina to do it well. The problems your work presents are the right size. You think about work on the train home, not with dread but with something closer to absorption. You will not call it happiness, exactly. It is more like: fit.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 5; p.s += 4; p.addFlag('career_peak'); p.addFlag('career_peak_done') },
  },

  {
    id: 'career_political_difficulty',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 35 && G.age <= 55 &&
      !G.flags.includes('career_politics_done'),
    text: 'A new manager arrives. They are not hostile openly — what they are is territorial. Your visibility, which was an asset before, becomes a problem under the new arrangement. You find yourself left off distribution lists for meetings you used to be in. Your manager\'s manager asks you to be patient. You understand that institutional politics has its own logic, separate from competence, and that you have been caught in it.',
    choices: [
      {
        text: 'Navigate it carefully — manage up, build new alliances',
        tag: null,
        outcome: 'It takes eight months. The manager eventually finds a different target. You emerge from it knowing something you didn\'t before about how institutions actually work.',
        effect: (p) => { p.s += 8; p.m -= 5; p.addFlag('survived_office_politics'); p.addFlag('career_politics_done') },
      },
      {
        text: 'Keep your head down and do excellent work',
        tag: null,
        outcome: 'The work is noticed by people above the manager. The manager\'s influence eventually wanes. The cost was two years of unnecessary friction.',
        effect: (p) => { p.e += 5; p.m -= 8; p.r += 4; p.addFlag('career_politics_done') },
      },
      {
        text: 'Start looking for other positions',
        tag: null,
        outcome: 'You find something. The new position is lateral but the atmosphere is better. You are surprised how much this matters.',
        effect: (p) => { p.m += 5; p.mo += 200; p.addFlag('changed_jobs'); p.addFlag('career_politics_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'career_passed_over',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 38 && G.age <= 55 &&
      !G.flags.includes('career_passed_over_done'),
    text: 'The promotion you expected goes to someone else. The announcement is made by email on a Friday afternoon. The person who gets it is less experienced than you and, depending on how honest you are with yourself, possibly less qualified. Your manager calls to say that your contribution is valued. You say the right things. On the train home you think about what "valued" actually means in practice.',
    choices: [
      {
        text: 'Accept it and recommit — you can still move up from here',
        tag: null,
        outcome: 'You return on Monday with the decision behind you. Two years later you get the next one. Whether it was worth it is a question you never fully resolve.',
        effect: (p) => { p.m -= 8; p.r += 6; p.s += 4; p.addFlag('career_passed_over_done') },
      },
      {
        text: 'Begin looking elsewhere — this organization does not see you clearly',
        tag: null,
        outcome: 'You find a company where your record is impressive rather than familiar. The promotion comes within a year.',
        effect: (p) => { p.mo += 400; p.m -= 3; p.addFlag('changed_jobs'); p.addFlag('career_passed_over_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'career_age_discrimination',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 50 && G.age <= 65 &&
      !G.flags.includes('career_age_disc_done'),
    text: 'The room has changed. Not dramatically — it changes the way a room changes when something is moved an inch and you can\'t immediately name what\'s different. The projects being assigned to the newer hires are the ones you used to get. In meetings your contributions are credited a beat too late or absorbed silently and re-said by someone younger. Nobody says anything about your age. Nobody needs to.',
    choices: [
      {
        text: 'Adapt — demonstrate relevance deliberately and continuously',
        tag: null,
        outcome: 'You take two courses you shouldn\'t have to take and attend three events you find tedious. It helps, partially. The underlying dynamic does not change.',
        effect: (p) => { p.e += 5; p.m -= 8; p.s += 3; p.addFlag('career_age_disc_done') },
      },
      {
        text: 'Start thinking about what comes after this career',
        tag: null,
        outcome: 'You begin to make the distinction between leaving on your terms and being left. The planning itself gives you a kind of control.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('planning_retirement'); p.addFlag('career_age_disc_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'career_laid_off',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.career &&
      G.age >= 40 && G.age <= 65 &&
      !G.flags.includes('laid_off') &&
      ['federal_republic', 'parliamentary_republic', 'constitutional_monarchy', 'democracy'].includes(G.regime),
    text: 'A company restructure. Your role is eliminated, which is the word they use. The HR representative is kind and reads from a document and uses words like "transition" and "package." You are given a box. You have been at this company for a specific number of years and the cardboard box is the same size regardless. You carry it to the car. In the parking lot you sit for a while before driving.',
    choices: [
      {
        text: 'Begin the job search immediately — momentum over grief',
        tag: null,
        outcome: 'You have a position within five months. It is not the same as the one you had. Few things are.',
        effect: (p) => { p.m -= 10; p.mo -= 4000; p.s += 4; p.clearCareer(); p.addFlag('laid_off'); p.addFlag('redundancy_survivor') },
      },
      {
        text: 'Take time first — you need to understand what happened',
        tag: null,
        outcome: 'Three months pass. The gap in the resume is noted in interviews but not disqualifying. You come back to work knowing yourself better, for whatever that is worth.',
        effect: (p) => { p.m -= 6; p.mo -= 9000; p.r += 6; p.clearCareer(); p.addFlag('laid_off'); p.addFlag('redundancy_survivor') },
      },
    ],
    effect: null,
  },

  {
    id: 'career_last_day',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.includes('retired') || G.age >= 65) &&
      G.career &&
      G.age >= 55 && G.age <= 72 &&
      !G.flags.includes('career_last_day_done'),
    text: 'You clear the desk. At the back of the bottom drawer there is a pen you have been looking for since the previous decade and a photograph from a work event whose occasion you no longer remember. Colleagues stop by during the day and say things that are warm and partly true. There is a cake. Someone makes a speech. You drive home at the usual time and the house is the same house and you sit in it for a while in the specific silence of an afternoon that used to belong to somewhere else.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 10; p.addFlag('career_last_day_done') },
  },

  {
    id: 'career_younger_boss',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 48 && G.age <= 62 &&
      !G.flags.includes('career_younger_boss_done'),
    text: 'Your new manager is fifteen years younger than you. She is competent and in a hurry and has specific ideas about how things should be done that are different from your ideas. You know more than she does about some things. She knows more than you about others. Neither of you says this directly. The recalibration takes time — longer for you, you think, than for her.',
    choices: [
      {
        text: 'Accept the dynamic and learn from it',
        tag: null,
        outcome: 'You adapt. She turns out to be better at her job than your initial read suggested. The adjustment cost you some pride and gained you some perspective.',
        effect: (p) => { p.e += 6; p.m -= 4; p.s += 4; p.addFlag('career_younger_boss_done') },
      },
      {
        text: 'Resist — your experience deserves more weight in the room',
        tag: null,
        outcome: 'The friction is noticed. Your performance review uses words like "collaborative" in a way that makes their absence clear.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('career_younger_boss_done') },
      },
    ],
    effect: null,
  },

  {
    id: 'career_legacy_project',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.career &&
      G.age >= 50 && G.age <= 65 &&
      G.stats.smarts >= 55 &&
      !G.flags.includes('career_legacy_done'),
    text: 'You are leading a project that you understand will outlast you at the organization — a system, a program, a building, a body of work that will carry forward after you are gone. There is a specific pleasure in this that is different from ordinary ambition. You are building for people who are not yet in the room. You find you care more about this than you expected, and less about the credit.',
    choices: null,
    effect: (p) => { p.m += 12; p.e += 5; p.karma += 5; p.addFlag('built_legacy'); p.addFlag('career_legacy_done') },
  },

  {
    id: 'career_mentor_role',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 40 && G.age <= 60 &&
      (G.stats.smarts >= 55 || G.flags.includes('professionally_recognized')) &&
      !G.flags.includes('career_mentor_done'),
    text: 'There is a junior colleague who asks you questions that remind you of questions you used to ask. You start giving them time — not formally, nothing is scheduled, but a kind of availability that becomes its own thing. You notice you know more than you thought you did. You notice that what you learned was not just technique but judgment, and that judgment is hard to teach except by proximity. You are no longer the one being developed. You are the one doing it.',
    choices: [
      {
        text: 'Invest in it — the teaching is part of the work now',
        tag: null,
        outcome: 'They go further than they would have alone. So, in a different direction, do you.',
        effect: (p) => { p.m += 10; p.s += 6; p.karma += 6; p.addFlag('career_mentor_done'); p.addFlag('mentored_someone') },
      },
      {
        text: 'Keep it limited — you have your own work to do',
        tag: null,
        outcome: 'You help occasionally. It is useful to them. You wonder sometimes what it would have looked like if you\'d given it more.',
        effect: (p) => { p.m += 3; p.r += 4; p.addFlag('career_mentor_done') },
      },
    ],
    effect: null,
  },

]

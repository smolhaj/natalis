// events_seasonal.js
// Seasonal event modifiers: events weighted differently by G.season.
// Harvest festivals, monsoon arrivals, holy days, winter hardships.
// Pure content — the G.season infrastructure already exists in buildG().

export const SEASONAL_EVENTS = [

  // ── HARVEST / AGRICULTURAL SEASON ──────────────────────────────────────────

  {
    id: 'sea_good_harvest',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.ruralUrban === 'rural' &&
      G.season === 'dry' &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country?.archetype) &&
      G.currentYear < 1990 &&
      !G.mem?.seaGoodHarvest,
    text: 'The harvest is in. The courtyard smells of grain drying. People are laughing tonight — not for any particular reason, but because the year has turned out right. The children know when the year has turned out right. The food is different: more, and better, and eaten without calculation.',
    choices: null,
    effect: (p) => { p.m += 8; p.h += 4; p.setMem('seaGoodHarvest', true) },
  },

  {
    id: 'sea_bad_harvest',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.ruralUrban === 'rural' &&
      G.season === 'dry' &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country?.archetype) &&
      G.currentYear < 1990 &&
      !G.mem?.seaBadHarvest &&
      !G.mem?.seaGoodHarvest,
    text: 'The harvest is in, and it is not enough. The adults do not say this directly. They say things like "it will be a tight year" and "we manage." You understand what they mean. The portions at dinner are smaller. Your mother serves herself last and less.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 6; p.r += 6; p.setMem('seaBadHarvest', true) },
  },

  // ── MONSOON EVENTS ──────────────────────────────────────────────────────────

  {
    id: 'sea_monsoon_joy',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.season === 'wet' &&
      (G.character.country?.name === 'Bangladesh' || G.character.country?.name === 'India') &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.seaMonsoonJoy,
    text: 'The first monsoon rain of the year hits the hot pavement and the whole street smells of it. The children are in it immediately — no asking permission, because today no one is refusing. You run until your clothes are completely soaked. Later you will be told to change. You will not regret any of it.',
    choices: null,
    effect: (p) => { p.m += 10; p.h += 3; p.setMem('seaMonsoonJoy', true) },
  },

  {
    id: 'sea_monsoon_flood',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.season === 'wet' &&
      G.character.country?.name === 'Bangladesh' &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.seaMonsoonFlood,
    text: 'The monsoon has been heavier than usual. The road outside is no longer a road. Your neighbour\'s lower floor is underwater. You help move things — furniture, stored grain, documents — to higher ground. This is the annual negotiation with the river. Most years it is manageable. This year is at the edge of manageable.',
    choices: [
      {
        text: 'Move everything you can to the roof',
        tag: null,
        outcome: 'Exhausting work. The water crests and recedes. What you moved is saved.',
        effect: (p) => { p.h -= 8; p.karma += 8; p.m -= 5; p.setMem('seaMonsoonFlood', true) },
      },
      {
        text: 'Leave with what you can carry — the flood will do what it does',
        tag: null,
        outcome: 'You go to higher ground. The house takes damage but you don\'t. The calculation was correct.',
        effect: (p) => { p.m -= 15; p.h -= 3; p.r += 5; p.setMem('seaMonsoonFlood', true) },
      },
    ],
    effect: null,
  },

  // ── HARMATTAN / DRY SEASON ──────────────────────────────────────────────────

  {
    id: 'sea_harmattan_health',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.season === 'dry' &&
      (G.character.country?.name === 'Nigeria' || G.character.country?.name === 'Ghana') &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.seaHarmattan,
    text: 'Harmattan season. The air is so dry that your lips crack and bleed at the corners. Your mother rubs petroleum jelly on them and warns you about going out without wrapping up. The dust coats everything. School mornings are cold — surprisingly cold for a place this latitude — and the afternoons are hot and dusty. The season has its own specific colour: the sky a washed-out grey, the dust orange.',
    choices: null,
    effect: (p) => { p.h -= 3; p.m += 2; p.setMem('seaHarmattan', true) },
  },

  // ── WINTER HARDSHIP (POST-SOVIET) ──────────────────────────────────────────

  {
    id: 'sea_winter_heating_cut',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.season === 'winter' &&
      G.character.country?.archetype === 'post_soviet' &&
      G.currentYear >= 1991 && G.currentYear <= 2005 &&
      G.age >= 18 &&
      !G.mem?.seaWinterHeating,
    text: 'The district heating has been off for three days. The explanation involves debts to the supplier. In the meantime: layers, the gas burner left on in the kitchen for warmth, the specific cold of a Soviet-era apartment bloc without heat. Your neighbours are doing the same things. You know this because you can smell their gas burners too.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 10; p.r += 5; p.setMem('seaWinterHeating', true) },
  },

  {
    id: 'sea_nordic_winter_dark',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.season === 'winter' &&
      (G.character.country?.name === 'Norway' || G.character.country?.name === 'Finland' || G.character.country?.name === 'Sweden') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.seaNordicWinter,
    text: 'The dark has been here for two months now. You have adapted — you have always adapted — but this year the adaptation requires more effort than usual. The lamp is set to the correct wavelength. The routine is intact. The effort underneath the routine is what has changed. You do not mention this to anyone because no one here does. You manage.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 2; p.setMem('seaNordicWinter', true) },
  },

  // ── CHERRY BLOSSOM / SPRING ─────────────────────────────────────────────────

  {
    id: 'sea_sakura_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.season === 'spring' &&
      (G.character.country?.name === 'Japan' || G.character.country?.name === 'South Korea') &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.seaSakura,
    text: 'You go to the park, which is something you do not usually do on a weekday. The blossoms are exactly what they are every year. This is why people go: not for novelty but for the specific comfort of a thing that returns. You sit under the trees for longer than you planned.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 3; p.setMem('seaSakura', true) },
  },

  // ── SUMMER / SOUTHERN HEMISPHERE ───────────────────────────────────────────

  {
    id: 'sea_aussie_summer_fire',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.season === 'summer' &&
      G.character.country?.name === 'Australia' &&
      G.currentYear >= 2000 &&
      G.age >= 25 &&
      !G.mem?.seaAussieFire,
    text: 'A fire somewhere nearby — not here, but near enough that the smoke sits over the city for days. The sky is orange at noon. The smell of it is in everything. People check the fire maps obsessively. The Bureau of Meteorology website crashes from traffic. This is the summer now — not always, but often enough that you know what the sky means when it looks like this.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.setMem('seaAussieFire', true) },
  },

  // ── HOLY SEASON ─────────────────────────────────────────────────────────────

  {
    id: 'sea_ramadan_texture',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.season === 'dry' &&
      (G.religion === 'muslim' || G.religion === 'sunni' || G.religion === 'shia') &&
      ['developing_urban', 'developing_unstable', 'subsaharan', 'wealthy_gulf'].includes(G.character.country?.archetype) &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.seaRamadan,
    text: 'Ramadan. The days are long this year — the heat has arrived early. By afternoon the city has a particular quiet. Iftar: the moment when the fast breaks, the specific relief of it, the dates and water first. The meals are bigger than usual and eaten with people. The month has a texture that the rest of the year doesn\'t have.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 5; p.setMem('seaRamadan', true) },
  },

]

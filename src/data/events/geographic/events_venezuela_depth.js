// events_venezuela_depth.js
// Venezuela depth texture beyond the Caracazo/Chávez arc:
// Bolivarian missions (barrio adentro, misiones), the bolivarian true believer,
// hyperinflation arithmetic, CLAP food boxes, power cuts (apagones),
// colectivos, guarimbas 2017, dollar economy, brain drain and diaspora,
// the Caracas of memory.

const isVenezuela = (G) => G.character.country?.name === 'Venezuela'

export const VENEZUELA_DEPTH_EVENTS = [

  // ── BOLIVARIAN MISSIONS ────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_misiones',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.vzlaMisiones,
    text: `The misiones arrived in your barrio during the oil boom: Misión Barrio Adentro with the Cuban doctors in the small clinics, Misión Robinson teaching your neighbour to read at fifty-three, Misión Ribas giving the high school certificate to people who stopped school in 1979. The oil price was high and the missions were real and the clinics were real and the literacy was real. You know people whose lives changed because of the missions. You also know that the Cuban doctors lived in conditions that were not the conditions Chávez described them in. Both are true.`,
    choices: [
      {
        text: 'The revolution improved your daily life in concrete ways.',
        tag: null,
        outcome: 'The clinic in the barrio, the subsidised food, the education that was available. These are not abstractions. The improvements happened to specific people you know.',
        effect: (p) => { p.m += 6; p.h += 3; p.addFlag('vzla_dep_bolivarian_believer'); p.setMem('vzlaMisiones', true) },
      },
      {
        text: 'The missions were real but so was what was building underneath them.',
        tag: null,
        outcome: 'The oil price and the missions and the corruption were all running simultaneously. The missions were funded by the price that would not stay. You noticed the underneath and did not always say so.',
        effect: (p) => { p.m += 2; p.e += 4; p.r += 3; p.setMem('vzlaMisiones', true) },
      },
    ],
    effect: null,
  },

  // ── HYPERINFLATION ARITHMETIC ─────────────────────────────────────────────────

  {
    id: 'vzla_dep_hyperinflation',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2022 &&
      G.age >= 20 &&
      !G.mem?.vzlaHyperinflation,
    text: `The salary you received on Monday was not the same salary on Friday — not in purchasing power, but the number changed too, upward, to compensate for what had already been lost. You learned to price things in dollars even though the dollar was officially controlled and actually ubiquitous. A kilo of harina PAN for arepas: you calculated the price against last week and then against the same week the previous year and the comparison was not coherent because the unit had changed its meaning. The government printed larger bills and the larger bills became insufficient within months. A million bolívares for a bag of groceries. Then a billion.`,
    choices: [
      {
        text: 'You found a way to earn or access dollars.',
        tag: null,
        outcome: 'The dollar economy was illegal and then tolerated and then official. You were inside it before it was official. The access to dollars was the difference between eating and calculating.',
        effect: (p) => { p.mo += 3000; p.e += 3; p.r += 4; p.setMem('vzlaHyperinflation', true) },
      },
      {
        text: 'You lived inside the bolivar economy and did the arithmetic every day.',
        tag: null,
        outcome: 'The arithmetic became a skill. The skill was knowing the price yesterday and the price today and the ratio. The ratio changed your relationship to the concept of money in ways that will not fully undo themselves.',
        effect: (p) => { p.m -= 8; p.r += 7; p.e += 4; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaHyperinflation', true) },
      },
    ],
    effect: null,
  },

  // ── CLAP BOX ──────────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_clap',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2016 && G.currentYear <= 2023 &&
      G.age >= 18 &&
      !G.mem?.vzlaClap,
    text: `The CLAP box arrived once a month or once every two months or irregularly: a cardboard box with pasta, rice, oil, sugar, and cornmeal. The contents varied. The timing was political — arriving more reliably before elections. In your building or your block the committee registered the households and the list was also a list of the people the committee could monitor. The box was food. The box was also a mechanism. You ate from the box and you understood the mechanism and the two things were not reconcilable but were both true.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('vzla_dep_maduro_generation'); p.e += 3; p.setMem('vzlaClap', true) },
  },

  // ── APAGONES ──────────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_apagones',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2009 && G.currentYear <= 2023 &&
      G.age >= 14 &&
      !G.mem?.vzlaApagones,
    text: `The lights went out. This is not a metaphor. The electrical grid ran on Guri Dam and Guri Dam was below capacity and the maintenance had not been done and the people who knew how to do the maintenance had left. The apagones arrived without schedule and lasted hours and then the whole country went dark for five days in March 2019. In the hospitals the generators ran while they had diesel and then the diesel ran out. You learned to keep your phone at a hundred percent whenever the power was on and to sleep early and to cook when you could and to tell the time by what you could hear outside.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.h -= 3; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaApagones', true) },
  },

  // ── COLECTIVOS ────────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_colectivos',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2023 &&
      G.age >= 16 && G.age <= 45 &&
      !G.mem?.vzlaColectivos,
    text: `The colectivos: armed groups on motorcycles, loyal to the government, present in the barrios in ways the police are not always present. They enforced things the police did not enforce and ignored things the police might have stopped. In the protests of 2017 they drove through the guarimbas — the barricades of burning tires and debris — with weapons. In your barrio the colectivo had a name everyone knew and a leader everyone knew the name of, and this knowledge organised daily life in specific ways that did not need to be made explicit.`,
    choices: [
      {
        text: 'You navigated the colectivo geography carefully.',
        tag: null,
        outcome: 'The navigation required knowing which streets, which times, which faces. The knowledge was available and you used it. Prudence in a specific shape.',
        effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaColectivos', true) },
      },
      {
        text: 'You left the barrio before it became something you could not navigate.',
        tag: null,
        outcome: 'The decision to leave the barrio and then the country was made in stages, each stage one more thing that was no longer possible. The colectivos were one stage.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('vzla_dep_maduro_generation'); p.addFlag('vzla_dep_crisis_diaspora'); p.setMem('vzlaColectivos', true) },
      },
    ],
    effect: null,
  },

  // ── GUARIMBAS 2017 ────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_guarimbas_2017',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear === 2017 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.vzlaGuarimbas,
    text: `April to July 2017: four months of street protests — guarimbas, barricades of burning tires and debris, marches that were met with tear gas and birdshot and sometimes bullets. One hundred and twenty-five dead. The National Constituent Assembly was installed in August with deputies elected under boycott conditions and the protests ended. You were in the streets or you were watching from an apartment window or you were somewhere else in the country or outside it. The guarimbas were the loudest argument the opposition made in years. The answer was the Constituent Assembly, which reorganised the rules.`,
    choices: [
      {
        text: 'You were in the streets.',
        tag: null,
        outcome: 'The tear gas, the marching, the specific noise of a crowd that knows it might be shot. You were in it and you are still accounting for what it cost and what it produced.',
        effect: (p) => { p.m -= 6; p.karma += 6; p.r += 5; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaGuarimbas', true) },
      },
      {
        text: 'You watched from inside, or left, or had already left.',
        tag: null,
        outcome: 'The watching or the leaving: both are positions with their own weight. The country will carry July 2017 in different ways depending on where each person was in it.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaGuarimbas', true) },
      },
    ],
    effect: null,
  },

  // ── CRISIS DIASPORA ────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_departure',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2023 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.vzlaDeparture,
    text: `Seven million Venezuelans have left — the largest displacement crisis in the Americas. You are one of the seven million or you are the one who stayed while others left. The ones who left went to Colombia, Peru, Chile, Ecuador, Spain, the US. They left by bus through the Simón Bolívar bridge and by plane when the planes still flew and by foot over the Andes. The ones who left are doctors, engineers, teachers, nurses — and also people with none of those credentials who left for the same reason: the CLAP box, the apagones, the colectivos, the arithmetic.`,
    choices: [
      {
        text: 'You left.',
        tag: null,
        outcome: 'The bus to Cúcuta, the walk, the border. The country receiving you did not always receive you well and received you anyway. You are building something there that is specific and real.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('vzla_dep_crisis_diaspora'); p.setResidency('refugee_status'); p.setMem('vzlaDeparture', true) },
      },
      {
        text: 'You stayed.',
        tag: null,
        outcome: 'The decision to stay is made every day. The people who left are in your phone. The country they left is the country you are still inside, which now has more space in it than it should.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('vzla_dep_maduro_generation'); p.setMem('vzlaDeparture', true) },
      },
    ],
    effect: null,
  },

  // ── BRAIN DRAIN ───────────────────────────────────────────────────────────────

  {
    id: 'vzla_dep_brain_drain',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2014 && G.currentYear <= 2023 &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.vzlaBrainDrain,
    text: `You are an engineer, a doctor, a nurse, a teacher, a petroleum worker — one of the professions that the Venezuelan state trained and that the Venezuelan economy can no longer pay in a currency that holds its value for a month. The monthly salary, in dollars at the parallel rate, is twelve dollars, or twenty-five, or forty. The rent in Bogotá is four hundred. The math is the math. Your degree is from a Venezuelan university and the Venezuelan university still exists and the degree has a specific value in the labour market of the receiving country. The value requires revalidation, which takes time, during which you work as something else.`,
    choices: [
      {
        text: 'You left and are working in your field in another country.',
        tag: null,
        outcome: 'The revalidation took a year or two. You are now practicing in the country that received you. The patients do not speak your Spanish but they have learned your name.',
        effect: (p) => { p.mo += 8000; p.e += 3; p.m -= 4; p.addFlag('vzla_dep_crisis_diaspora'); p.setMem('vzlaBrainDrain', true) },
      },
      {
        text: 'You left and are working as something else while you wait for revalidation.',
        tag: null,
        outcome: 'The delivery app, the restaurant, the construction site. The degree is in a folder. The revalidation appointment is scheduled. The work is the work.',
        effect: (p) => { p.mo += 3000; p.r += 6; p.addFlag('vzla_dep_crisis_diaspora'); p.setMem('vzlaBrainDrain', true) },
      },
    ],
    effect: null,
  },

  // ── THE CARACAS OF MEMORY ────────────────────────────────────────────────────

  {
    id: 'vzla_dep_caracas_of_memory',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      isVenezuela(G) &&
      G.currentYear >= 2005 &&
      G.age >= 50 &&
      !G.mem?.vzlaCaracasMemory,
    text: `The Caracas of the 1970s oil boom: the highways full of American cars, the shopping centres, the restaurants, the El Ávila cable car, the Teatro Teresa Carreño opening in 1983. Venezuela was the richest country in South America and it was visible — in the architecture, the consumption, the national mood. You are describing this to someone young and they are listening with the polite attention you give to things that seem impossible. But you were there. The Caracas of memory and the Caracas they are living in are separated by decades and by decisions made with the oil money and by decisions made instead of making other decisions.`,
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 3; p.setMem('vzlaCaracasMemory', true) },
  },

  // ── BOLIVARIAN BELIEVER RECKONING ─────────────────────────────────────────────

  {
    id: 'vzla_dep_believer_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isVenezuela(G) &&
      G.flags.has('vzla_dep_bolivarian_believer') &&
      G.currentYear >= 2016 &&
      G.age >= 30 &&
      !G.mem?.vzlaBelieverReckoning,
    text: `You believed. The mission in your barrio, the doctor who spoke to people no doctor had spoken to before, the sense that the country was finally for the people who had always been in it but not of it — you believed these things because they were real and happening in your street. The question of what happened next is the question you are still inside. The clinic still exists but the medicines are not always there. The Cuban doctor left in 2018. The barrio has a colectivo now with a different kind of authority. The belief and what the belief became are two things you are holding in the same space.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 8; p.e += 3; p.setMem('vzlaBelieverReckoning', true) },
  },

]

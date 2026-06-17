export const PANDEMIC_EVENTS = [
  {
    id: 'pan_healthcare_worker',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.currentYear >= 2020 &&
      G.currentYear <= 2022 &&
      ['doctor', 'nurse', 'paramedic'].includes(G.career?.id) &&
      !G.mem?.panHealthcare,
    text: 'You have been on the same ward for seventeen days without a full day off. The PPE runs out by Tuesday and what comes Wednesday is better than nothing. You have watched people die in a specific order: first the very old, then the people who waited too long, then people your age. You hold a tablet up to a dying patient\'s face and their family waves at them from a screen.',
    choices: [
      {
        text: 'You carry it — this is what you trained for',
        tag: 'endure',
        outcome: 'The gratitude when it comes is genuine and not enough.',
        effect: (p) => {
          p.h -= 12;
          p.m -= 15;
          p.karma += 10;
          p.r += 8;
          p.addFlag('pandemic_healthcare_worker');
          p.setMem('panHealthcare', true);
        },
      },
      {
        text: 'You take the burnout leave when it is offered',
        tag: 'step_back',
        outcome: 'The leave feels like abandonment. You come back anyway.',
        effect: (p) => {
          p.h -= 8;
          p.m -= 10;
          p.karma += 8;
          p.addFlag('pandemic_healthcare_worker');
          p.addFlag('pandemic_burned_out');
          p.setMem('panHealthcare', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_healthcare_worker_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.currentYear >= 2020 &&
      G.currentYear <= 2022 &&
      ['doctor', 'nurse', 'paramedic'].includes(G.career?.id) &&
      !G.mem?.panHealthcare,
    text: 'You have been on the same ward for seventeen days without a full day off. The PPE runs out by Tuesday and what comes Wednesday is better than nothing. You have watched people die in a specific order: first the very old, then the people who waited too long, then people your age. You hold a tablet up to a dying patient\'s face and their family waves at them from a screen.',
    choices: [
      {
        text: 'You carry it — this is what you trained for',
        tag: 'endure',
        outcome: 'The gratitude when it comes is genuine and not enough.',
        effect: (p) => {
          p.h -= 12;
          p.m -= 15;
          p.karma += 10;
          p.r += 8;
          p.addFlag('pandemic_healthcare_worker');
          p.setMem('panHealthcare', true);
        },
      },
      {
        text: 'You take the burnout leave when it is offered',
        tag: 'step_back',
        outcome: 'The leave feels like abandonment. You come back anyway.',
        effect: (p) => {
          p.h -= 8;
          p.m -= 10;
          p.karma += 8;
          p.addFlag('pandemic_healthcare_worker');
          p.addFlag('pandemic_burned_out');
          p.setMem('panHealthcare', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_informal_lockdown',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.currentYear === 2020 &&
      ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.archetype) &&
      !G.flags.includes('formal_employed') &&
      !G.mem?.panInformal,
    text: 'The government announces a lockdown. For you, lockdown means: no work. No work means: no food by Thursday. The announcement does not mention this specific arithmetic. Elsewhere, people are staying home on salaries. Your income is today\'s movement from one place to another, and today there is no movement.',
    choices: [
      {
        text: 'You find a way to keep working — the risk of the virus is less than the risk of not eating',
        tag: 'keep_working',
        outcome: 'You move carefully. Most people in your neighbourhood are doing the same thing.',
        effect: (p) => {
          p.h -= 8;
          p.m -= 12;
          p.karma += 3;
          p.addFlag('pandemic_informal_kept_working');
          p.setMem('panInformal', true);
        },
      },
      {
        text: 'You stay home and borrow what you need',
        tag: 'stay_home',
        outcome: 'The debt will take six months to clear. The six months have not happened yet.',
        effect: (p) => {
          p.h -= 4;
          p.mo -= 500;
          p.m -= 15;
          p.r += 8;
          p.addFlag('pandemic_locked_down');
          p.setMem('panInformal', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_informal_lockdown_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.currentYear === 2020 &&
      ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.archetype) &&
      !G.flags.includes('formal_employed') &&
      !G.mem?.panInformal,
    text: 'The government announces a lockdown. For you, lockdown means: no work. No work means: no food by Thursday. The announcement does not mention this specific arithmetic. Elsewhere, people are staying home on salaries. Your income is today\'s movement from one place to another, and today there is no movement.',
    choices: [
      {
        text: 'You find a way to keep working — the risk of the virus is less than the risk of not eating',
        tag: 'keep_working',
        outcome: 'You move carefully. Most people in your neighbourhood are doing the same thing.',
        effect: (p) => {
          p.h -= 8;
          p.m -= 12;
          p.karma += 3;
          p.addFlag('pandemic_informal_kept_working');
          p.setMem('panInformal', true);
        },
      },
      {
        text: 'You stay home and borrow what you need',
        tag: 'stay_home',
        outcome: 'The debt will take six months to clear. The six months have not happened yet.',
        effect: (p) => {
          p.h -= 4;
          p.mo -= 500;
          p.m -= 15;
          p.r += 8;
          p.addFlag('pandemic_locked_down');
          p.setMem('panInformal', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_small_children_lockdown',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.currentYear === 2020 &&
      G.children?.some((c) => !c.dead && c.age <= 10) &&
      !G.mem?.panChildren,
    text: 'School closed three weeks ago. The work-from-home instructions arrive on the same day as the school closure notice, as if these two things are not in direct conflict. Your child has discovered a talent for interrupting video calls at the exact moment when something specific is being decided. You have learned that you can be fully present in a meeting and fully present in your kitchen simultaneously, and that this is not the same as being present in either place.',
    choices: null,
    effect: (p) => {
      p.m -= 10;
      p.h -= 6;
      p.addFlag('pandemic_small_children_lockdown');
      p.setMem('panChildren', true);
    },
  },

  {
    id: 'pan_small_children_lockdown_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.currentYear === 2020 &&
      G.children?.some((c) => !c.dead && c.age <= 10) &&
      !G.mem?.panChildren,
    text: 'School closed three weeks ago. The work-from-home instructions arrive on the same day as the school closure notice, as if these two things are not in direct conflict. Your child has discovered a talent for interrupting video calls at the exact moment when something specific is being decided. You have learned that you can be fully present in a meeting and fully present in your kitchen simultaneously, and that this is not the same as being present in either place.',
    choices: null,
    effect: (p) => {
      p.m -= 10;
      p.h -= 6;
      p.addFlag('pandemic_small_children_lockdown');
      p.setMem('panChildren', true);
    },
  },

  {
    id: 'pan_elderly_isolation',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.currentYear >= 2020 &&
      G.currentYear <= 2021 &&
      G.age >= 70 &&
      !G.mem?.panElderly,
    text: 'The visit that was supposed to happen on Sunday does not happen. The visit the Sunday after that does not happen either. A grandchild waves through a window. You have learned to wave back through the window in a way that does not show how the window feels. The phone calls are more frequent, which is both good and its own kind of loneliness.',
    choices: null,
    effect: (p) => {
      p.m -= 14;
      p.h -= 5;
      p.r += 8;
      p.addFlag('pandemic_elderly_isolated');
      p.setMem('panElderly', true);
    },
  },

  {
    id: 'pan_death_without_goodbye',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2020 &&
      G.currentYear <= 2021 &&
      G.parents?.some((par) => !par?.dead) &&
      !G.mem?.panDeath,
    text: 'The call comes on a Tuesday. Your father, or your mother, is in the hospital. The rules say: no visitors. The specific rule is the specific shape of the loss. You have not been in the room. You will not be in the room. Someone holds a phone at the end and the last thing they hear is your voice from a device, which is not the same as being there, which you know, and which you will carry for a long time.',
    choices: [
      {
        text: 'You speak to them on the phone every day until the end',
        tag: 'phone_vigil',
        outcome: 'There is no good version of this. There is only the version where they heard your voice.',
        effect: (p) => {
          p.m -= 20;
          p.r += 12;
          p.addFlag('pandemic_death_without_goodbye');
          p.setMem('panDeath', true);
        },
      },
      {
        text: 'You find a way to get in — regulations or no',
        tag: 'break_the_rules',
        outcome: 'You are in the room. It costs you something and you do not regret it.',
        effect: (p) => {
          p.m -= 16;
          p.h -= 5;
          p.karma += 8;
          p.r += 8;
          p.addFlag('pandemic_death_without_goodbye');
          p.addFlag('broke_the_rules_for_this');
          p.setMem('panDeath', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_death_without_goodbye_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2020 &&
      G.currentYear <= 2021 &&
      G.parents?.some((par) => !par?.dead) &&
      !G.mem?.panDeath,
    text: 'The call comes on a Tuesday. Your father, or your mother, is in the hospital. The rules say: no visitors. The specific rule is the specific shape of the loss. You have not been in the room. You will not be in the room. Someone holds a phone at the end and the last thing they hear is your voice from a device, which is not the same as being there, which you know, and which you will carry for a long time.',
    choices: [
      {
        text: 'You speak to them on the phone every day until the end',
        tag: 'phone_vigil',
        outcome: 'There is no good version of this. There is only the version where they heard your voice.',
        effect: (p) => {
          p.m -= 20;
          p.r += 12;
          p.addFlag('pandemic_death_without_goodbye');
          p.setMem('panDeath', true);
        },
      },
      {
        text: 'You find a way to get in — regulations or no',
        tag: 'break_the_rules',
        outcome: 'You are in the room. It costs you something and you do not regret it.',
        effect: (p) => {
          p.m -= 16;
          p.h -= 5;
          p.karma += 8;
          p.r += 8;
          p.addFlag('pandemic_death_without_goodbye');
          p.addFlag('broke_the_rules_for_this');
          p.setMem('panDeath', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_vaccine_choice',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2021 &&
      G.currentYear <= 2022 &&
      G.age >= 20 &&
      G.age <= 75 &&
      !G.mem?.panVaccine,
    text: 'The vaccine is available in your area. The queue at the gymnasium is longer than expected. The information available about it contradicts itself depending on which app you use. Someone your age died of the virus last month. Someone else your age had a reaction. These two facts do not simplify the decision — they just bracket it.',
    choices: [
      {
        text: 'You get vaccinated',
        tag: 'vaccinate',
        outcome: 'The arm is sore for two days. You feel something you\'d rather not name as relief.',
        effect: (p) => {
          p.h += 8;
          p.m += 5;
          p.addFlag('pandemic_vaccinated');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You wait a few more months before deciding',
        tag: 'wait',
        outcome: 'You keep tracking the numbers.',
        effect: (p) => {
          p.m -= 3;
          p.h -= 2;
          p.r += 4;
          p.addFlag('pandemic_vaccine_hesitant');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You decide against it',
        tag: 'decline',
        outcome: 'This is now a position you hold and will be asked about.',
        effect: (p) => {
          p.h -= 6;
          p.m -= 8;
          p.r += 6;
          p.addFlag('pandemic_unvaccinated');
          p.setMem('panVaccine', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_vaccine_choice_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2021 &&
      G.currentYear <= 2022 &&
      G.age >= 20 &&
      G.age <= 75 &&
      !G.mem?.panVaccine,
    text: 'The vaccine is available in your area. The queue at the gymnasium is longer than expected. The information available about it contradicts itself depending on which app you use. Someone your age died of the virus last month. Someone else your age had a reaction. These two facts do not simplify the decision — they just bracket it.',
    choices: [
      {
        text: 'You get vaccinated',
        tag: 'vaccinate',
        outcome: 'The arm is sore for two days. You feel something you\'d rather not name as relief.',
        effect: (p) => {
          p.h += 8;
          p.m += 5;
          p.addFlag('pandemic_vaccinated');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You wait a few more months before deciding',
        tag: 'wait',
        outcome: 'You keep tracking the numbers.',
        effect: (p) => {
          p.m -= 3;
          p.h -= 2;
          p.r += 4;
          p.addFlag('pandemic_vaccine_hesitant');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You decide against it',
        tag: 'decline',
        outcome: 'This is now a position you hold and will be asked about.',
        effect: (p) => {
          p.h -= 6;
          p.m -= 8;
          p.r += 6;
          p.addFlag('pandemic_unvaccinated');
          p.setMem('panVaccine', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_vaccine_choice_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2021 &&
      G.currentYear <= 2022 &&
      G.age >= 20 &&
      G.age <= 75 &&
      !G.mem?.panVaccine,
    text: 'The vaccine is available in your area. The queue at the gymnasium is longer than expected. The information available about it contradicts itself depending on which app you use. Someone your age died of the virus last month. Someone else your age had a reaction. These two facts do not simplify the decision — they just bracket it.',
    choices: [
      {
        text: 'You get vaccinated',
        tag: 'vaccinate',
        outcome: 'The arm is sore for two days. You feel something you\'d rather not name as relief.',
        effect: (p) => {
          p.h += 8;
          p.m += 5;
          p.addFlag('pandemic_vaccinated');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You wait a few more months before deciding',
        tag: 'wait',
        outcome: 'You keep tracking the numbers.',
        effect: (p) => {
          p.m -= 3;
          p.h -= 2;
          p.r += 4;
          p.addFlag('pandemic_vaccine_hesitant');
          p.setMem('panVaccine', true);
        },
      },
      {
        text: 'You decide against it',
        tag: 'decline',
        outcome: 'This is now a position you hold and will be asked about.',
        effect: (p) => {
          p.h -= 6;
          p.m -= 8;
          p.r += 6;
          p.addFlag('pandemic_unvaccinated');
          p.setMem('panVaccine', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_long_covid',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2021 &&
      G.currentYear <= 2023 &&
      G.flags.includes('lived_through_pandemic') &&
      !G.mem?.panLong,
    text: 'You had the virus in winter and you are supposed to be recovered. That is what recovered means: the test is negative. But you find that a flight of stairs does something specific to your lungs that it did not do before, and that by Thursday afternoon your concentration has a quality that it didn\'t have before January. Your GP says there are a lot of people in this situation. You add this to the list of things that are simultaneously true and not quite accepted.',
    choices: null,
    effect: (p) => {
      p.h -= 8;
      p.m -= 8;
      p.addFlag('pandemic_long_covid');
      p.addCondition('long_covid', 'mild');
      p.setMem('panLong', true);
    },
  },

  {
    id: 'pan_long_covid_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2021 &&
      G.currentYear <= 2023 &&
      G.flags.includes('lived_through_pandemic') &&
      !G.mem?.panLong,
    text: 'You had the virus in winter and you are supposed to be recovered. That is what recovered means: the test is negative. But you find that a flight of stairs does something specific to your lungs that it did not do before, and that by Thursday afternoon your concentration has a quality that it didn\'t have before January. Your GP says there are a lot of people in this situation. You add this to the list of things that are simultaneously true and not quite accepted.',
    choices: null,
    effect: (p) => {
      p.h -= 8;
      p.m -= 8;
      p.addFlag('pandemic_long_covid');
      p.addCondition('long_covid', 'mild');
      p.setMem('panLong', true);
    },
  },

  {
    id: 'pan_wealthy_west_specific',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear === 2020 &&
      G.archetype === 'wealthy_west' &&
      G.age >= 25 &&
      G.age <= 55 &&
      !G.mem?.panWest,
    text: 'You have been inside for forty-one days. The view from the window is not significantly different from the view from the window on day twelve. You have baked bread twice. You have done yoga twice. You have had a conversation about how introverts are supposedly better at this that neither of you believed. The news from the hospitals is specific and the government briefings use the word unprecedented repeatedly, which makes the thing feel less real rather than more.',
    choices: [
      {
        text: 'You volunteer where you can — deliveries, calls to the elderly',
        tag: 'volunteer',
        outcome: 'You feel useful in the specific way that helping makes you feel useful.',
        effect: (p) => {
          p.karma += 8;
          p.m += 4;
          p.s += 4;
          p.addFlag('pandemic_community_response');
          p.setMem('panWest', true);
        },
      },
      {
        text: 'You try to stay functional and not read too much',
        tag: 'cope_quietly',
        outcome: 'You finish two books and start six more.',
        effect: (p) => {
          p.m -= 5;
          p.e += 4;
          p.addFlag('pandemic_survived_intact');
          p.setMem('panWest', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pan_wealthy_west_specific_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.currentYear === 2020 &&
      G.archetype === 'wealthy_west' &&
      G.age >= 25 &&
      G.age <= 55 &&
      !G.mem?.panWest,
    text: 'You have been inside for forty-one days. The view from the window is not significantly different from the view from the window on day twelve. You have baked bread twice. You have done yoga twice. You have had a conversation about how introverts are supposedly better at this that neither of you believed. The news from the hospitals is specific and the government briefings use the word unprecedented repeatedly, which makes the thing feel less real rather than more.',
    choices: [
      {
        text: 'You volunteer where you can — deliveries, calls to the elderly',
        tag: 'volunteer',
        outcome: 'You feel useful in the specific way that helping makes you feel useful.',
        effect: (p) => {
          p.karma += 8;
          p.m += 4;
          p.s += 4;
          p.addFlag('pandemic_community_response');
          p.setMem('panWest', true);
        },
      },
      {
        text: 'You try to stay functional and not read too much',
        tag: 'cope_quietly',
        outcome: 'You finish two books and start six more.',
        effect: (p) => {
          p.m -= 5;
          p.e += 4;
          p.addFlag('pandemic_survived_intact');
          p.setMem('panWest', true);
        },
      },
    ],
    effect: null,
  },
];

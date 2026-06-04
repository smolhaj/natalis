// events_wwi_depression.js — WWI and the Great Depression
//
// Personal-level events for characters born 1885–1925 in Europe and the Americas.
// Complements any world events in worldEvents.js.
//
// WWI (1914–1918): conscription, the trenches, shell shock, the armistice, return
// 1918 flu: the pandemic that killed more than the war
// Great Depression (1929–1939): the crash, the job loss, the breadline, the decade out

const isEuroAmerican = (G) => {
  const a = G.currentCountry?.archetype ?? ''
  const n = G.currentCountry?.name ?? ''
  return a === 'wealthy_west' ||
    ['France', 'Germany', 'United Kingdom', 'Italy', 'Austria', 'Canada', 'Australia', 'United States'].includes(n)
}

// ═══════════════════════════════════════════════════════════════════════════════
// WWI
// ═══════════════════════════════════════════════════════════════════════════════

const WWI_EVENTS = [

  {
    id: 'ww1_conscription_notice',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isEuroAmerican(G) &&
      G.character?.gender === 'male' &&
      G.currentYear >= 1914 && G.currentYear <= 1916 &&
      G.age >= 17 && G.age <= 30 &&
      !G.mem?.ww1ConscFired,
    text: (G) => {
      const country = G.currentCountry?.name ?? 'your country'
      const yr = G.currentYear ?? 1915
      if (country === 'United Kingdom' && yr <= 1915) return 'The recruiting sergeant sets up a table outside the post office. The posters have been up for weeks — your country needs you. Most of your friends have already gone or are going. There is a specific social pressure that is not quite force and is not quite choice. You are nineteen.'
      return `${country} has issued the conscription order. This is not a question. You report on the date specified. The physical examination takes twenty minutes. You are passed fit. The uniform is issued. The training begins.`
    },
    choices: [
      {
        text: 'Go — it is your duty and you believe that',
        tag: null,
        outcome: 'You enlist. The belief is real. The war, when you reach it, is unlike what the belief prepared you for.',
        effect: (p) => { p.addFlag('ww1_soldier'); p.m -= 5; p.setMem('ww1ConscFired', true) },
      },
      {
        text: 'You go, but without the belief — because the alternative is worse',
        tag: null,
        outcome: 'You go without the patriotism. The lack of it turns out to be a kind of protection — you are not disillusioned, because you were not illusioned.',
        effect: (p) => { p.addFlag('ww1_soldier'); p.setMem('ww1ConscFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ww1_trenches',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      G.flags.has('ww1_soldier') &&
      G.currentYear >= 1915 && G.currentYear <= 1918 &&
      !G.mem?.ww1TrenchesFired,
    text: 'The trench is ten feet deep and four feet wide and has been occupied continuously for nine months. The mud is permanent. The smell of the mud is its own thing. Fifteen feet away, across no man\'s land, there are men in a German or French or British trench in the same mud with the same smell. You have learned to categorise the incoming shells by sound — their weight, their trajectory, their proximity. You have learned to sleep in the noise. You have learned not to learn the names of the men who just arrived.',
    choices: null,
    effect: (p) => { p.h -= 10; p.m -= 15; p.addFlag('ww1_trenches'); p.setMem('ww1TrenchesFired', true) },
  },

  {
    id: 'ww1_shell_shock',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.flags.has('ww1_trenches') &&
      !G.mem?.ww1ShellShockFired,
    text: 'After the bombardment — a continuous barrage that lasts forty-eight hours — something changes. The hands shake without stopping. The sleep, when it comes, brings sounds back. The military medical officer uses a phrase: shell shock. The phrase covers a range of things that the army does not have a framework for yet. Some men are sent home. Some are returned to the line. The decision seems arbitrary. You are among the ones returned to the line.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 12; p.addFlag('ww1_shell_shock'); p.addCondition('shell_shock', 'moderate'); p.setMem('ww1ShellShockFired', true) },
  },

  {
    id: 'ww1_armistice',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      G.flags.has('ww1_soldier') &&
      G.currentYear === 1918 &&
      !G.mem?.ww1ArmisticeFired,
    text: 'The guns stop at eleven in the morning on the eleventh day of the eleventh month. The silence after four years of continuous noise is its own form of noise — it has a texture. The men in the trench do not cheer immediately. There is a pause of several seconds, which is the pause of people who have not been safe for long enough to trust safety. Then some of them cheer. You do not cheer. You sit down in the mud.',
    choices: null,
    effect: (p) => { p.m += 5; p.addFlag('ww1_survived'); p.addFlag('ww1_armistice_witness'); p.setMem('ww1ArmisticeFired', true) },
  },

  {
    id: 'ww1_return_home',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('ww1_survived') &&
      G.currentYear >= 1918 && G.currentYear <= 1921 &&
      !G.mem?.ww1ReturnFired,
    text: 'Home is the word you have been using for four years to describe the place you are going back to. The place is the same place. You are different. The family treats you carefully, which is a form of love and also a form of distance — they do not know what you saw and you are not able to make them understand and you are also not sure you want to. The village has lost fourteen men. You are one of the ones who came back. The ones who came back carry a specific weight that the ones who didn\'t come back do not.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 6; p.addFlag('ww1_veteran'); p.setMem('ww1ReturnFired', true) },
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// 1918 FLU
// ═══════════════════════════════════════════════════════════════════════════════

const FLU_1918_EVENTS = [

  {
    id: 'flu_1918_household',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.currentYear === 1918 &&
      G.age >= 10 &&
      !G.mem?.flu1918Fired,
    text: 'The influenza arrives in waves. The second wave, in autumn, is the lethal one — killing healthy young adults, which no flu had done before in living memory. The bodies are counted in the millions. In your town it is counted house by house. A family on your street loses three. Your household loses one — or survives intact — depending on what happens in the weeks when the death is in every conversation and the streets are quieter than a Sunday morning every day of the week.',
    choices: [
      {
        text: 'Someone in your household dies',
        tag: null,
        outcome: 'The house is changed by the absence. The war took young men in uniform. The flu takes without the uniform. The grief is without ceremony because the ceremony would require gathering.',
        effect: (p) => { p.m -= 15; p.addFlag('flu_1918_loss'); p.setMem('flu1918Fired', true) },
      },
      {
        text: 'Your household survives',
        tag: null,
        outcome: 'You survive the wave. The street does not all survive. Survival in 1918 is its own kind of luck.',
        effect: (p) => { p.m -= 5; p.addFlag('flu_1918_survived'); p.setMem('flu1918Fired', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// THE GREAT DEPRESSION
// ═══════════════════════════════════════════════════════════════════════════════

const DEPRESSION_EVENTS = [

  {
    id: 'dep_crash_1929',
    phase: 'young_adult',
    weight: 9,
    when: (G) =>
      isEuroAmerican(G) &&
      G.currentYear === 1929 &&
      G.age >= 15 &&
      !G.mem?.dep1929Fired,
    text: 'The stock market begins falling on a Thursday in October and does not stop for weeks. If you own shares, they are worth less every morning. If you work in a bank or a trading firm, your colleagues are being let go in the afternoons. If you own nothing and work in a factory, the news arrives indirectly: fewer orders, shorter shifts, then the shift that doesn\'t restart. The Depression is not an event. It is the condition that settles over the following years.',
    choices: null,
    effect: (p) => { p.mo -= 500; p.m -= 8; p.addFlag('depression_era'); p.setMem('dep1929Fired', true) },
  },

  {
    id: 'dep_job_loss',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('depression_era') &&
      G.career != null &&
      G.currentYear >= 1930 && G.currentYear <= 1937 &&
      !G.mem?.depJobFired,
    text: 'The job ends. Not because of anything you did — because of something larger than any individual employer or employee. The factory closes or the office has three people doing the work of ten or the farm cannot pay labour it has always paid. The end of the job is also the end of the identity that came with it. You join the men at the employment exchange. The queue is around the block.',
    choices: null,
    effect: (p) => { p.mo -= 1000; p.m -= 12; p.addFlag('depression_unemployed'); p.setMem('depJobFired', true) },
  },

  {
    id: 'dep_breadline',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.flags.has('depression_unemployed') &&
      !G.mem?.depBreadlineFired,
    text: 'The breadline. The queue for soup. These are things that happened to other people, poor people, people in photographs in newspapers — and now you are in the photograph. The shame of the queue is different from the hunger of the queue. The shame is there before the hunger becomes urgent. You stand in it. You are not alone in it. That does not fully address the shame.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('depression_breadline'); p.setMem('depBreadlineFired', true) },
  },

  {
    id: 'dep_long_recovery',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('depression_era') &&
      G.currentYear >= 1935 && G.currentYear <= 1942 &&
      !G.mem?.depRecovFired,
    text: 'Work comes back. Slowly, and then more quickly after 1939 when the factories are running again for different reasons. The decade has produced a specific way of being in the world — saving everything, distrusting security, keeping a kitchen garden long after the garden is no longer necessary, never quite believing that the good period will last. You carry this for the rest of your life. Your children will find it puzzling and then understand it when they are older.',
    choices: null,
    effect: (p) => { p.mo += 500; p.m += 5; p.addFlag('depression_survivor'); p.setMem('depRecovFired', true) },
  },

]

export const WWI_DEPRESSION_EVENTS = [
  ...WWI_EVENTS,
  ...FLU_1918_EVENTS,
  ...DEPRESSION_EVENTS,
]

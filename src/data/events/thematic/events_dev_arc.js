// events_dev_arc.js — Deep software developer career arc
//
// The software developer arc tracks the texture of a career built on code:
// the first thing shipped, the ethical corners of systems that collect,
// the burnout that modern work produces, the question of what you built
// when the tools have changed three times and the platforms twice.

const isDev = (G) => G.career?.id === 'software_developer' || G.flags.has('dev_career')

export const DEV_ARC_EVENTS = [

  {
    id: 'dev_first_shipped',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isDev(G) &&
      G.currentYear >= 1985 &&
      !G.mem?.devFirstShippedFired,
    text: `The first thing you built is live. You watch the first user interact with it — not through a screen share, but through analytics, the way user behaviour becomes data becomes a curve on a dashboard. The interaction goes the way you designed it to go. Someone clicked where you expected a click. This sounds small and is not small. You made a decision about what a person would do and the person did it. The system is doing what you said it would do.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 4
      p.addFlag('dev_first_shipped')
      p.setMem('devFirstShippedFired', true)
    },
  },

  {
    id: 'dev_the_pivot',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isDev(G) &&
      G.flags.has('dev_first_shipped') &&
      !G.mem?.devPivotFired,
    text: `The company has pivoted. The product you were building — the one you joined for, the one you shipped the first version of — has been deprioritised in favour of something with better unit economics. The new direction is reasonable. The engineering problems are interesting enough. The thing you were building is not gone; it is in a subdirectory that gets less commits per sprint. You update your LinkedIn profile with the new stack.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.w += 3
      p.addFlag('dev_pivot')
      p.setMem('devPivotFired', true)
    },
  },

  {
    id: 'dev_surveillance_question',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isDev(G) &&
      G.currentYear >= 2010 &&
      G.age >= 28 &&
      !G.mem?.devSurveillanceFired,
    text: `The system you are building collects more data than it needs for the stated function. This is not unusual — the data has downstream value, and the product team has been explicit about that value, and the terms of service address it in the way terms of service address things. You are the one writing the collection code. The implementation is technically straightforward. The decision about what to collect was made above your level. You are the person whose hands are on the keyboard.`,
    choices: [
      {
        text: 'Raise it — minimal data collection is better engineering anyway',
        tag: null,
        outcome: `The conversation goes further than you expected. Some of the collection gets scoped down. You are noted as someone who asks questions about this kind of thing, which has effects in both directions.`,
        effect: (p) => {
          p.m += 6
          p.karma += 8
          p.addFlag('dev_raised_privacy')
          p.setMem('devSurveillanceFired', true)
        },
      },
      {
        text: 'Build what was specced — this is a product decision, not an engineering one',
        tag: null,
        outcome: `The implementation ships. The data flows. You have thought about this and put it in the category of decisions made above your level, which is a real category and a real limitation and also sometimes a way of not making a decision.`,
        effect: (p) => {
          p.m -= 5
          p.r += 6
          p.addFlag('dev_surveillance_complied')
          p.setMem('devSurveillanceFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'dev_crunch',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isDev(G) &&
      G.age >= 30 &&
      !G.mem?.devCrunchFired,
    text: `The launch is in six weeks and the backlog represents twelve weeks of work. The team has been through the calculation together. The conclusion the calculation produces is that the six weeks will be twelve weeks compressed, and that people will leave them changed. You are familiar with this cycle. You have been through it before. You have been through it enough times to know what the first week looks like and what the sixth week looks like and how long it takes to recover afterwards.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.h -= 5
      p.addFlag('dev_crunch')
      p.setMem('devCrunchFired', true)
    },
  },

  {
    id: 'dev_burnout',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isDev(G) &&
      G.flags.has('dev_crunch') &&
      G.age >= 34 &&
      !G.mem?.devBurnoutFired,
    text: `The interest that used to be there when you opened the laptop is not there in the way it was. Not gone — it comes back in specific contexts, when the problem is interesting enough or the architecture is elegant enough — but the default state has changed. You are producing the same output. The quality metrics are the same. There is a difference between doing the work well and doing the work with the thing that used to accompany doing it well.`,
    choices: [
      {
        text: 'Take time away — the thing that accompanies the work needs rest',
        tag: null,
        outcome: `You take three weeks. You do not look at a terminal for the first two. In the third week something returns that had been absent. The return is not complete, but it is measurable.`,
        effect: (p) => {
          p.m += 8
          p.h += 3
          p.addFlag('dev_burnout_addressed')
          p.setMem('devBurnoutFired', true)
        },
      },
      {
        text: 'Keep going — the output is the same, which means the work is fine',
        tag: null,
        outcome: `The output stays the same for longer than you expected. What changes is your relationship to the time spent producing it. The ratio of hours to satisfaction has shifted in a direction you have not found a way to reverse.`,
        effect: (p) => {
          p.m -= 10
          p.h -= 4
          p.addFlag('dev_burnout_unaddressed')
          p.setMem('devBurnoutFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'dev_obsolescence',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isDev(G) &&
      G.age >= 40 &&
      !G.mem?.devObsoFired,
    text: `The stack you built your career on is what hiring managers now call legacy. You know it more deeply than anyone who will ever be hired to work on it — the edge cases, the performance characteristics, the five-year-old architectural decisions that are invisible until they matter. The new engineers do not have this knowledge. They have different knowledge: the patterns the new stack introduced, which are cleaner, and faster to build in, and which do not carry the accumulated context of everything that ran before them.`,
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.e += 4
      p.addFlag('dev_obsolescence')
      p.setMem('devObsoFired', true)
    },
  },

  {
    id: 'dev_burnout_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('dev_burnout_unaddressed') &&
      G.age >= 52 &&
      !G.mem?.devBurnoutEchoFired,
    text: `The work is still work. The hours are the same. The architecture problems have stayed interesting enough. What has not returned is the thing that used to make a good solution feel like more than a solution — the brief, clean feeling of having made something right. You have made thousands of things right. They are in production, in services that people use, in systems that function. The absence you are describing is not the work. You are not sure what it is.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 4
      p.setMem('devBurnoutEchoFired', true)
    },
  },

  {
    id: 'dev_surveillance_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('dev_surveillance_complied') &&
      G.age >= 52 &&
      !G.mem?.devSurveillanceEchoFired,
    text: `The data that system collected is now in a breach that is in the news. You are not named. The code you wrote is not specifically cited. The breach involved a category of data that includes the category you implemented the collection for. You read the coverage. The decisions that produced the breach were made above your level, which is the category you put them in at the time. You are still putting them there. The category has more content in it now.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 8
      p.karma -= 4
      p.setMem('devSurveillanceEchoFired', true)
    },
  },

  {
    id: 'dev_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isDev(G) &&
      G.currentYear >= 2010 &&
      G.age >= 58 &&
      !G.mem?.devLateFired,
    text: `The accounting of what a career in software produces: systems that worked, systems that were deprecated, one codebase that someone is still maintaining in ways you would not have written it. The ethical questions you navigated — the data collection, the features that shipped over your reservations, the crunch that the launch required — exist in a record that has no official form. The tools changed three times. The platforms changed twice. The things you built are running somewhere in a form that has been modified enough that they are no longer yours, which is the correct lifecycle for software. You made it work. Some of it is still working.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 3
      p.karma += 4
      p.addFlag('dev_late_reckoning')
      p.setMem('devLateFired', true)
      p.legacy += 7
    },
  },

]

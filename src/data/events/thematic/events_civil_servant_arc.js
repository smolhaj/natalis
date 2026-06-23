// events_civil_servant_arc.js — Deep civil servant career arc
//
// The civil servant carries the weight of procedural authority over
// individual lives. The arc tracks what this means across a career:
// the first person the procedure helps, the first person it doesn't,
// the regime that eventually asks the civil service to do something
// the civil service was not designed for, and the late-life accounting
// of what all those small decisions added up to.

const isCS = (G) => G.career?.id === 'civil_servant' || G.flags.has('civil_servant_career')

export const CIVIL_SERVANT_ARC_EVENTS = [

  {
    id: 'cs_first_posting',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isCS(G) &&
      !G.mem?.csFirstPostingFired,
    text: `Your first posting is a department that processes applications. People come with forms. The forms determine outcomes. You learn quickly that the forms are a simplified version of the situations, and that the situations do not always fit the categories the forms contain. You also learn that the forms are the only instrument you have. The gap between the form and the situation is not your gap to fill — it is the gap the system was built with, and your job is to operate the system.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.e += 4
      p.addFlag('civil_servant_first_posting')
      p.setMem('csFirstPostingFired', true)
    },
  },

  {
    id: 'cs_the_rule',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isCS(G) &&
      G.flags.has('civil_servant_first_posting') &&
      !G.mem?.csRuleFired,
    text: `The rule says no. The situation says the rule was not designed for this situation. The person in front of you is the situation — they came in with a form that the rule processes in a way that will result in an outcome that is technically correct and is also clearly not what the policy intended when it was written. You know this. You can see the gap between the rule and its intent. The rule is still the rule.`,
    choices: [
      {
        text: 'Apply the rule — the system requires consistency',
        tag: null,
        outcome: `You apply the rule. The outcome is technically correct. The person leaves. You file the paperwork. The file is correct. The file is not the whole situation.`,
        effect: (p) => {
          p.m -= 6
          p.r += 6
          p.addFlag('civil_servant_applied_rule')
          p.setMem('csRuleFired', true)
        },
      },
      {
        text: 'Find the discretion in the rule — every rule has some',
        tag: null,
        outcome: `You find the discretionary provision that covers this class of case. It requires documentation you request from the applicant. It takes longer. The outcome is the outcome the policy intended.`,
        effect: (p) => {
          p.m += 5
          p.karma += 7
          p.addFlag('civil_servant_used_discretion')
          p.setMem('csRuleFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'cs_regime_pressure',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isCS(G) &&
      G.regime !== 'democracy' &&
      G.regime !== 'parliamentary_republic' &&
      G.regime !== 'constitutional_monarchy' &&
      G.regime !== 'federal_republic' &&
      G.age >= 32 &&
      !G.mem?.csRegimeFired,
    text: `The new directive comes from above the department. It asks the civil service to apply a category to a population that the civil service was not previously asked to categorise. The legal basis is present. The policy basis is present. The civil service has processed directives of this kind before, in different administrations, using the same administrative machinery. You are one of the people operating the machinery.`,
    choices: [
      {
        text: 'Process the directive — you are an administrator, not a policy maker',
        tag: null,
        outcome: `You process it. The machinery operates. The category is applied. You document everything correctly. The documentation is in the file alongside the directive.`,
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.addFlag('civil_servant_regime_complied')
          p.setMem('csRegimeFired', true)
        },
      },
      {
        text: 'Transfer or request reassignment — you will not operate this machinery',
        tag: null,
        outcome: `The request takes six months to process. In the interim you are technically still in the department. The reassignment is granted. The machinery continues without you. Both of these things are true.`,
        effect: (p) => {
          p.m -= 4
          p.karma += 8
          p.addFlag('civil_servant_regime_refused')
          p.setMem('csRegimeFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'cs_the_small_decisions',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isCS(G) &&
      G.age >= 36 &&
      !G.mem?.csSmallFired,
    text: `You have made thousands of decisions in the category of small decisions. Some of them were the right call on a form, the right escalation, the right discretionary call. Some of them were the rule applied where the rule was insufficient. You do not keep a running tally. The files keep the tally — that is what files are for. You are one person doing a job that processes a stream of situations. You have processed the stream correctly, on balance, using the instruments available.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.e += 3
      p.r += 4
      p.addFlag('civil_servant_small_decisions')
      p.setMem('csSmallFired', true)
    },
  },

  {
    id: 'cs_the_good_outcome',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isCS(G) &&
      G.flags.has('civil_servant_used_discretion') &&
      G.age >= 38 &&
      !G.mem?.csGoodOutcomeFired,
    text: `Someone comes back. Not always — but this one comes back to say what happened after the form was filed and the discretionary provision was invoked and the outcome was the outcome you spent the extra time on. They came back to say it made a difference. You put this in the category of things you keep against the category of things you carry the other way. The category on this side is smaller. It is also very specific. You remember it specifically.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 6
      p.setMem('csGoodOutcomeFired', true)
    },
  },

  {
    id: 'cs_regime_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('civil_servant_regime_complied') &&
      G.age >= 55 &&
      !G.mem?.csRegimeEchoFired,
    text: `The administration that issued the directive is not the current administration. The directive was eventually modified or withdrawn. The files from the period when it was in effect still exist. You processed it correctly. Correctly is not the same as rightly; you have always known this. The distinction is one that the civil service is not designed to adjudicate. You have been living in the gap between those two words for some years now.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 7
      p.karma -= 4
      p.setMem('csRegimeEchoFired', true)
    },
  },

  {
    id: 'cs_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isCS(G) &&
      G.age >= 60 &&
      !G.mem?.csLateFired,
    text: `The accounting: you spent a career applying the rules that govern other people's access to what they need, and you applied them with varying degrees of the discretion the rules contain, and sometimes you found the discretion and sometimes you applied the rule as written and sometimes the difference mattered and sometimes it did not, and you could not always tell which was which at the time. The file keeps the record. You are not the file. The file is not you. What you carry out is the knowledge of the specific people — the form that needed one more provision found, the directive that required a reassignment request, the person who came back. Those are what you are bringing with you.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 4
      p.karma += 5
      p.addFlag('civil_servant_late_reckoning')
      p.setMem('csLateFired', true)
      p.legacy += 7
    },
  },

]

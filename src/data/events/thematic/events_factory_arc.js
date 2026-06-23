// events_factory_arc.js — Deep factory worker career arc
//
// The factory worker arc is about the body as productive unit: what
// sustained physical production does to a person across thirty years,
// what solidarity means when you need it, and what remains when the
// plant closes or the body gives out — whichever comes first.

const isFactory = (G) => G.career?.id === 'factory_worker' || G.flags.has('factory_worker_career')

export const FACTORY_ARC_EVENTS = [

  {
    id: 'fac_first_shift',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isFactory(G) &&
      !G.mem?.facFirstShiftFired,
    text: `The first shift is ten hours. The motion you are performing is a motion you will perform several hundred times today and will perform most days of most weeks for as long as you have this job. By the fourth hour you have stopped thinking about the motion and your body has taken it over, which is efficient and also the beginning of something the body will remember long after the shift ends. The wages are what you need them to be. You are here for the wages. This is an honest and sufficient reason.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.w += 5
      p.addFlag('factory_first_shift')
      p.setMem('facFirstShiftFired', true)
    },
  },

  {
    id: 'fac_line_speed',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isFactory(G) &&
      G.flags.has('factory_first_shift') &&
      !G.mem?.facLineSpeedFired,
    text: `The line speed has been increased. The motion you perform is now performed at a pace that is fifteen percent faster than the pace you were hired at. The productivity improvement is documented in a report that calculated it from an efficiency study. The study did not measure what it costs the body to operate at the new pace over a shift, over a week, over a year. You know this number. You feel it arriving in your shoulders at around hour seven.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.h -= 3
      p.r += 4
      p.addFlag('factory_line_sped_up')
      p.setMem('facLineSpeedFired', true)
    },
  },

  {
    id: 'fac_union_card',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isFactory(G) &&
      G.age >= 20 &&
      !G.mem?.facUnionFired,
    text: `There is a union organising drive on the floor. The organiser is someone who has been here longer than you and who has opinions about what the line speed study did not measure. The company's position on the union is stated in a handout that was in everyone's locker this morning. The handout does not use the word "union." It uses the phrase "direct relationship between workers and management." The organiser uses the phrase "collective bargaining." You have to decide which conversation you are in.`,
    choices: [
      {
        text: 'Sign the card — the collective has more leverage than you do alone',
        tag: null,
        outcome: `You sign. The drive succeeds. The first contract takes fourteen months to negotiate. You attend most of the meetings. The wage increase in the contract is modest; the grievance procedure is not.`,
        effect: (p) => {
          p.m += 8
          p.karma += 6
          p.addFlag('factory_joined_union')
          p.setMem('facUnionFired', true)
        },
      },
      {
        text: 'Pass — you do not want to be on the wrong side of management',
        tag: null,
        outcome: `The union passes without your card. You benefit from the contract anyway. The organiser knows you didn't sign, which is its own fact, and which neither of you has found a way to fully resolve.`,
        effect: (p) => {
          p.m -= 4
          p.r += 5
          p.addFlag('factory_declined_union')
          p.setMem('facUnionFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'fac_repetitive_strain',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isFactory(G) &&
      G.age >= 32 &&
      !G.mem?.facStrainFired,
    text: `The wrist is telling you something it has been building toward for ten years. Not a sharp injury — a cumulative conversation between the motion and the joint that has reached a point where the joint is insisting you hear it. The occupational health nurse gives you a compression sleeve and documentation for modified duties during recovery. The modified duties still require the wrist. You tape it and return to the line. The wrist continues to tell you things.`,
    choices: null,
    effect: (p) => {
      p.h -= 6
      p.m -= 5
      p.addFlag('factory_repetitive_strain')
      p.setMem('facStrainFired', true)
    },
  },

  {
    id: 'fac_injury',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isFactory(G) &&
      G.age >= 36 &&
      !G.mem?.facInjuryFired,
    text: `The accident happens at hour nine on a Thursday. The machine does what machines do when the safety protocol is not followed, and the protocol was not followed because at hour nine on a Thursday the shift has been running long enough that the gap between the correct way to clear a jam and the fast way to clear a jam is a gap people stop measuring. You are in hospital for two days. The compensation form is four pages. The recovery takes longer than the doctor initially said it would.`,
    choices: null,
    effect: (p) => {
      p.h -= 12
      p.m -= 8
      p.addFlag('factory_injury')
      p.setMem('facInjuryFired', true)
    },
  },

  {
    id: 'fac_plant_closure',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isFactory(G) &&
      G.age >= 42 &&
      !G.mem?.facClosureFired,
    text: `The plant is closing. The announcement came from a holding company whose headquarters are in a country whose name you recognise but which has no connection to this facility except ownership. The severance is what the contract specifies. The job centre has a retraining programme for workers over forty. The retraining programme has a waiting list. You have been doing this particular thing with your body for twenty years and the market for people who do this particular thing has moved to somewhere else, and you are here.`,
    choices: null,
    effect: (p) => {
      p.w -= 10
      p.m -= 10
      p.r += 8
      p.addFlag('factory_plant_closed')
      p.setMem('facClosureFired', true)
    },
  },

  {
    id: 'fac_union_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('factory_joined_union') &&
      G.age >= 55 &&
      !G.mem?.facUnionEchoFired,
    text: `The union is in a different position than it was when you signed the card. The plant may or may not still be open. The people who organised alongside you have moved on, or retired, or are still here in bodies that have been modified by the work the same way your body has been modified. What you carried out of the decision to sign the card is specific: the fourteen months to the first contract, the grievance you filed that went the right way, the knowledge that the leverage existed even when you were not sure it would.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 4
      p.setMem('facUnionEchoFired', true)
    },
  },

  {
    id: 'fac_injury_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('factory_injury') &&
      G.age >= 55 &&
      !G.mem?.facInjuryEchoFired,
    text: `The joint has opinions now that it did not have before the injury. Not constantly — in the morning, in cold weather, when you have been in a position that asks too much of it. The compensation settled. The recovery was real. The souvenir is permanent. You have learned to forecast the weather from it with reasonable accuracy, which is the kind of joke that people who carry these things make when they want to talk about them without talking about them.`,
    choices: null,
    effect: (p) => {
      p.h -= 4
      p.m -= 3
      p.setMem('facInjuryEchoFired', true)
    },
  },

  {
    id: 'fac_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isFactory(G) &&
      G.age >= 60 &&
      !G.mem?.facLateFired,
    text: `The accounting: you sold the motion to someone who needed the motion done, and they paid you, and you raised what you raised and housed what you housed and fed what you fed on the wages that represented that exchange. The body is the record of what that cost. The wrist, the shoulder, the knee that goes wrong in certain weather — these are the record. There was solidarity, or the absence of solidarity, and both had consequences. The plant is closed or it is still open; either way you are no longer in it. The work was real. You did it. The wages were real. You spent them.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 4
      p.karma += 5
      p.addFlag('factory_late_reckoning')
      p.setMem('facLateFired', true)
      p.legacy += 6
    },
  },

]

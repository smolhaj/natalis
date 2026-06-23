// events_chef_arc.js — Extended chef career arc
//
// The existing events_career_arcs.js covers kitchen hierarchy, management style,
// own restaurant, and body burnout. This file adds what those cannot:
// the relationship to food as material (sensory, specific), the mentor whose
// technique is still in your hands, the dish that defines your approach,
// the service that went catastrophically wrong, and the late reckoning of
// a life spent in kitchens.
//
// Guards on `mentor_in_kitchen` and `demanding_chef` flags set by events_career_arcs.js.

const isChef = (G) => G.career?.id === 'chef' || G.flags.has('chef_career')

export const CHEF_ARC_EVENTS = [

  {
    id: 'chef_the_material',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isChef(G) &&
      !G.mem?.chefMaterialFired,
    text: `You learn the material the way it takes years to learn: not recipes — anyone can follow recipes — but what the material actually is. The way an onion behaves as it softens, the temperature difference between a sear and a char, the specific moment when the acid changes everything it touches. This knowledge is sensory and accumulated and cannot be fast-tracked. The training produces technique; the kitchen produces understanding. They are not the same thing.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 5
      p.addFlag('chef_material_knowledge')
      p.setMem('chefMaterialFired', true)
    },
  },

  {
    id: 'chef_the_mentor',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isChef(G) &&
      G.flags.has('chef_material_knowledge') &&
      !G.mem?.chefMentorFired,
    text: `The chef who shaped your technique is not the chef you thought would shape you. Not the famous one or the theoretically correct one but the one in the kitchen where you spent your formative years, whose hands moved with a specific efficiency and whose corrections were exact and whose approach to the material contained a coherent philosophy that you did not recognise as a philosophy until years after you had already absorbed it. You use their techniques and do not always know you are doing it.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.e += 3
      p.addFlag('chef_formative_mentor')
      p.setMem('chefMentorFired', true)
    },
  },

  {
    id: 'chef_the_dish',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isChef(G) &&
      G.flags.has('chef_material_knowledge') &&
      G.age >= 28 &&
      !G.mem?.chefDishFired,
    text: `There is a dish — or a technique, or an approach — that is yours in the way that some work is yours rather than inherited or assigned. You arrived at it through an accumulation of experiments, some of which failed, and what emerged was something that you could only have made, from this kitchen, in this sequence of years. People who eat it do not always know what they are eating. They know that something is happening. This is what you were working toward even when you could not have said so.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 3
      p.addFlag('chef_defining_dish')
      p.setMem('chefDishFired', true)
    },
  },

  {
    id: 'chef_the_service',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isChef(G) &&
      G.age >= 32 &&
      !G.mem?.chefServiceFired,
    text: `The service that goes catastrophically wrong. This happens eventually to everyone who runs a kitchen long enough. Tonight it is equipment failure at the worst possible moment, and the workarounds are partial, and the table of twelve that came for the event of the season is getting something that is not the event of the season. You carry this service for a while. You then carry it as information about what holds under pressure, which is a different kind of carrying.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.e += 4
      p.addFlag('chef_bad_service')
      p.setMem('chefServiceFired', true)
    },
  },

  {
    id: 'chef_mentor_echo',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('mentor_in_kitchen') &&
      G.age >= 38 &&
      !G.mem?.chefMentorEchoFired,
    text: `The junior who came through your kitchen years ago comes back — not to cook, but to tell you something about what it did for them, which they could not have articulated at the time. You are now the chef whose techniques are in someone else's hands without their knowing it. The transmission has happened. It continues into kitchens you will never enter.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 8
      p.setMem('chefMentorEchoFired', true)
    },
  },

  {
    id: 'chef_demanding_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('demanding_chef') &&
      G.age >= 52 &&
      !G.mem?.chefDemandingEchoFired,
    text: `The kitchen you ran is in your past. The cooks who left it are in other kitchens, some of them running their own. You have heard, occasionally, what they say about their time with you. The words are specific and not always what you would have chosen. The food was excellent. The culture was cold. You knew the second thing while you were building the first and you made a decision, every year, about what you were optimising for. You are still making the accounting of that decision.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 7
      p.setMem('chefDemandingEchoFired', true)
    },
  },

  {
    id: 'chef_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isChef(G) &&
      G.age >= 60 &&
      !G.mem?.chefLateFired,
    text: `The accounting of a life in kitchens: the material knowledge built over forty years, the mentor whose technique is still in your hands, the dish that arrived from somewhere specific and became the thing that defines how people remember you. The service that went catastrophically wrong. The body's record of the heat and the hours and the twelve-hour standing days. The juniors who came through, some of whom you shaped and some of whom you drove out. The food is the thing you made. Some of it was the real thing. Some of the people who ate it are still thinking about it, which is the correct lifecycle for the real thing.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 4
      p.karma += 6
      p.addFlag('chef_late_reckoning')
      p.setMem('chefLateFired', true)
      p.legacy += 8
    },
  },

]

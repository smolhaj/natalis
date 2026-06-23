// events_driver_arc.js — Deep driver career arc
//
// The driver arc: what it means to spend a career on the road,
// to know a city by its traffic and its hours, to carry strangers
// across the map of a place, and to negotiate between the road
// and the body that has been sitting in the same seat for twenty years.

const isDriver = (G) => G.career?.id === 'driver' || G.flags.has('driver_career')

export const DRIVER_ARC_EVENTS = [

  {
    id: 'drv_the_city',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isDriver(G) &&
      !G.mem?.drvCityFired,
    text: `You know the city in a specific way that most people who live in it do not. You know it by its traffic — not the map but the living system of the map, which routes breathe at what hours, where the signals are badly timed, where the shortcuts become shortcuts only in specific conditions. This knowledge is professional knowledge. You carry people across the city using it. The city is your material.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 4
      p.addFlag('driver_city_knowledge')
      p.setMem('drvCityFired', true)
    },
  },

  {
    id: 'drv_the_passenger',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isDriver(G) &&
      G.flags.has('driver_city_knowledge') &&
      !G.mem?.drvPassengerFired,
    text: `The passenger at 11pm who tells you something they would not tell anyone they know. This is the specific privacy of the back seat — you are not part of their life, you do not know them, they will not see you again. You become the recipient of information that has nowhere else to go. You hear it. You do not carry it out of the car. The car ends and the information stays in it. This happens enough times that you have developed a way of holding it that is not burdening yourself with it.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 4
      p.addFlag('driver_late_passenger')
      p.setMem('drvPassengerFired', true)
    },
  },

  {
    id: 'drv_the_body',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isDriver(G) &&
      G.age >= 34 &&
      !G.mem?.drvBodyFired,
    text: `The back has been in the same posture for twelve-hour shifts for ten years. The doctor has a list of what this produces, which includes the lower back problem that has been present for three years and which the doctor calls early-stage and the physio calls preventable-if-managed. You are managing it. Managing it means getting up between rides, which reduces the number of rides you can take, which reduces the income, which is the arithmetic the management plan produces.`,
    choices: null,
    effect: (p) => {
      p.h -= 7
      p.m -= 5
      p.addFlag('driver_body_cost')
      p.setMem('drvBodyFired', true)
    },
  },

  {
    id: 'drv_night_work',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isDriver(G) &&
      G.age >= 30 &&
      !G.mem?.drvNightFired,
    text: `The night shift pays more and is emptier and the city at 2am is a different city from the one at 2pm. The passengers at 2am are going to or coming from specific things — the late shift, the night out, the thing that happened that required leaving immediately. You drive through the city of a city: the bones of the place with the ordinary activity stripped away. It is quieter and stranger and sometimes threatening in ways that daytime work is not. You develop a different alertness for it.`,
    choices: null,
    effect: (p) => {
      p.w += 4
      p.m -= 4
      p.h -= 3
      p.addFlag('driver_night_work')
      p.setMem('drvNightFired', true)
    },
  },

  {
    id: 'drv_the_accident',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isDriver(G) &&
      G.age >= 35 &&
      !G.mem?.drvAccidentFired,
    text: `The accident is not your fault. The investigation confirms this. The car that came through the intersection did so after the light and there was nothing in the available response time that would have changed the outcome. You know this. The investigation knows this. The passenger in the back seat was not seriously injured. You were not seriously injured. The car was written off. You went back to work after three days, which was earlier than you needed to but later than you wanted to.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.h -= 4
      p.addFlag('driver_accident')
      p.setMem('drvAccidentFired', true)
    },
  },

  {
    id: 'drv_accident_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('driver_accident') &&
      G.age >= 55 &&
      !G.mem?.drvAccidentEchoFired,
    text: `You still do something at that type of intersection that you were not doing before. Not dramatically — you are a competent driver and you know the road and you are not afraid of it. But there is an extra half-second at certain configurations of light and traffic that was not there before. The investigation said not your fault. Your body kept the information anyway, in the way bodies keep information that was relevant to their survival, and stored it as a modification to behaviour at intersections.`,
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.h += 2
      p.setMem('drvAccidentEchoFired', true)
    },
  },

  {
    id: 'drv_platforms',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isDriver(G) &&
      G.currentYear >= 2013 &&
      G.age >= 32 &&
      !G.mem?.drvPlatformFired,
    text: `The platform changed the work. The app tells you where to go and what the surge is and rates you out of five after every ride. The previous version of this job did not involve being rated. The rating affects your position in the queue. You are careful about the things that affect the rating — the car's cleanliness, the music, the decision about whether to talk. Some nights you spend as much time managing the rating as you spend driving. You are not sure this is what you signed up for. You are not sure what you signed up for.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.w -= 2
      p.addFlag('driver_platform_worker')
      p.setMem('drvPlatformFired', true)
    },
  },

  {
    id: 'drv_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isDriver(G) &&
      G.age >= 60 &&
      !G.mem?.drvLateFired,
    text: `The city is the city you know better than most people who live in it, and the knowledge is leaving the useful phase because the body is moving into the phase where the twelve-hour seat in the same posture is not what it used to be. You have carried people across this map for most of your working life. Some of them told you things in the back seat that they did not tell anyone else. The accident happened and you went back to work. The platform changed the work and you adapted. The back has opinions that have been accumulating for twenty years. The city still moves the way you know it moves, at the hours you know it moves, for the reasons you understand. This will be true for a while after you stop driving it.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 3
      p.karma += 4
      p.addFlag('driver_late_reckoning')
      p.setMem('drvLateFired', true)
      p.legacy += 5
    },
  },

]

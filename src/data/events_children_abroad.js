// events_children_abroad.js
// BUILD 38 — The Children Left Behind
// The child's perspective on having a parent work abroad.
// Distinct from events_crosscutting.js (the domestic worker's own arc) and
// events_immigration.js (the emigrant's arc). This is the child who stayed.

const OFW_ARCHETYPES = ['subsaharan', 'developing_urban', 'developing_unstable']

export const CHILDREN_ABROAD_EVENTS = [

  // ── THE DEPARTURE ─────────────────────────────────────────────────────────────

  {
    id: 'ca_parent_departs',
    phase: 'childhood',
    weight: 4,
    when: (G) => {
      const arch = G.character.country.archetype
      const cn = G.character.country.name
      const isOFWSource = OFW_ARCHETYPES.includes(arch) ||
        ['Philippines', 'Indonesia', 'Sri Lanka', 'Mexico', 'Romania', 'Bulgaria', 'Poland'].includes(cn)
      return (
        isOFWSource &&
        G.age >= 6 && G.age <= 12 &&
        G.parents?.length > 0 &&
        !G.flags.includes('parent_works_abroad') &&
        !G.mem?.caParentDeparts
      )
    },
    text: (G) => {
      const cn = G.character.country.name
      if (['Philippines', 'Indonesia', 'Sri Lanka', 'Bangladesh'].includes(cn)) {
        return 'Your mother leaves for the Gulf on a Tuesday. The agency took her passport the week before for processing. You watched her pack from the doorway. When she is gone the house arranges itself around her absence — the specific way a family reorganises around a missing person while insisting, always, that she will be back.'
      }
      if (['Mexico', 'Guatemala', 'Honduras', 'El Salvador'].includes(cn)) {
        return 'Your father crosses the border at a place you are not supposed to know. The money starts arriving two months later, in amounts that change what is possible here. The house becomes quieter in the way that things become quiet when something has been removed from them.'
      }
      if (['Romania', 'Bulgaria', 'Poland'].includes(cn)) {
        return 'Your parents go to Spain, or Italy, or Germany — one first and then, two years later, the other. The plan is to save enough and come back. You understand this officially. Unofficially you understand that plans involving the word *enough* have a way of extending.'
      }
      return 'One of your parents leaves for work abroad. The plan, as explained to you, is two years. The money begins arriving through a transfer service or a cousin or an envelope. The understanding is that this is temporary. Most understandings like this are.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 4
      p.addFlag('parent_works_abroad')
      p.setMem('caParentDeparts', true)
    },
  },

  // ── RAISED BY EXTENDED FAMILY ─────────────────────────────────────────────────

  {
    id: 'ca_grandmother_texture',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.flags.includes('parent_works_abroad') &&
      G.age >= 7 && G.age <= 13 &&
      !G.mem?.caGrandmotherTexture,
    text: 'The person who is actually raising you is your grandmother, or your aunt, or the combined household that has arranged itself to fill the gap. The rules here are different — older in some ways, more permissive about the things that matter less. She knows things your parents would not have thought to teach you: the name of the plant in the corner of the yard, the way to read the weather from the colour of the light in the morning. You carry her with a particular loyalty.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.e += 2
      p.karma += 3
      p.addFlag('raised_by_extended_family')
      p.setMem('caGrandmotherTexture', true)
    },
  },

  // ── THE PHONE CALL ────────────────────────────────────────────────────────────

  {
    id: 'ca_birthday_call',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.flags.includes('parent_works_abroad') &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.caBirthdayCall,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2005) {
        return 'The call comes at a difficult hour because of the time difference. The voice is clear on some days and crackling on others. You hold the phone and say the things you rehearsed because there is not enough time to say anything real, and you are not sure what real would sound like anymore across this distance.'
      }
      return 'The international call costs money, so it is short and precisely timed. You stand near the telephone and wait. When the voice comes through the static it is recognisable but wrong somehow — thin, far away, not quite present. You say very little. There is no language yet for what you want to say, and the minutes are running.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.setMem('caBirthdayCall', true)
    },
  },

  // ── THE PACKAGE ───────────────────────────────────────────────────────────────

  {
    id: 'ca_package_arrives',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.flags.includes('parent_works_abroad') &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.caPackageArrives,
    text: 'The package arrives. The clothes are the right sizes on the labels but not the right sizes on your body, because they were chosen by someone who has not watched you grow. The sweets are not the ones you would have chosen for yourself. The letter, if there is one, says the things a letter can say at that distance. The things the package cannot carry are more present than the things it does.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 5
      p.setMem('caPackageArrives', true)
    },
  },

  // ── THE REUNION ───────────────────────────────────────────────────────────────

  {
    id: 'ca_reunion_stranger',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.flags.includes('parent_works_abroad') &&
      G.age >= 13 && G.age <= 18 &&
      !G.mem?.caReunionStranger,
    text: 'Your parent comes back. You stand in the arrivals area and the person walking toward you is familiar in the way photographs are familiar — recognisable but not known. The hug is real. The strangeness is also real. The family is supposed to resume from where it paused, which is not where it is. You start again, carefully, from here.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 6
      p.setMem('caReunionStranger', true)
      p.addFlag('parent_returned')
    },
  },

  // ── THE RECKONING ─────────────────────────────────────────────────────────────

  {
    id: 'ca_cost_accounting',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('parent_works_abroad') &&
      G.age >= 20 && G.age <= 32 &&
      !G.mem?.caCostAccounting,
    text: 'The house was built. The school fees were paid. You got further than the alternative would have allowed — this is the accounting you were given, and it is accurate as far as it goes. You also know the specific weight of a phone call timed in minutes, the package with clothes in the wrong sizes, the hug at arrivals from a person you had to relearn. You do not have a verdict. You have both columns.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 4
      p.karma += 5
      p.setMem('caCostAccounting', true)
      p.addFlag('understood_the_cost')
    },
  },

  // ── THE CYCLE ─────────────────────────────────────────────────────────────────

  {
    id: 'ca_cycle_repeating',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('understood_the_cost') &&
      G.flags.includes('emigrated') &&
      G.children?.length > 0 &&
      G.age >= 28 && G.age <= 45 &&
      !G.mem?.caCycleRepeating,
    text: (G) => {
      const child = G.children?.[0]
      return `${child?.name ?? 'Your child'} is the age you were when your parent left. You know this side of it now — the package you will send that arrives with the wrong sizes, the call at the wrong hour, the reunion that will need to start from wherever you both are by then. You went anyway, for the same reasons. The choice is not simpler because you understand it.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 8
      p.karma += 6
      p.setMem('caCycleRepeating', true)
      p.addFlag('the_cycle_repeated')
    },
  },

]

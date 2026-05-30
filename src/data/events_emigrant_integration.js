// Emigrant integration arc — Sprint 5
// Staged events gated on G.yearsAbroad for characters who have emigrated.
// The arc has five stages: disorientation (yr 1), acclimation (yr 2-3),
// permanence question (yr 3-6), belonging with asterisk (yr 6-12),
// and old country as destination (yr 12+).
// These events give emigration a felt arc across years, not a single flag.

export const EMIGRANT_INTEGRATION_EVENTS = [

  {
    id: 'emig_first_winter',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 1 && (G.yearsAbroad ?? 0) <= 2 &&
      !G.mem?.emigFirstWinter,
    text: (G) => {
      const newCountry = G.currentCountry?.name ?? 'here'
      const oldCountry = G.character.country.name
      return `Your first significant holiday season here. In ${oldCountry}, this time of year had a specific weight — the food, the rhythm, who gathered where. None of that maps onto ${newCountry}. The holiday happens around you and correctly belongs to someone else. You call home. The connection is good. The distance is not reducible by a good connection.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.addFlag('immigration_homesick')
      p.setMem('emigFirstWinter', true)
    },
  },

  {
    id: 'emig_unwritten_rules',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 2 && (G.yearsAbroad ?? 0) <= 4 &&
      !G.mem?.emigUnwrittenRules,
    text: (G) => {
      const newCountry = G.currentCountry?.name ?? 'this country'
      return `You understand the rules now — the written ones, and the ones underneath the written ones. The precise distance to stand from a stranger. The tone used in an email to a superior. When it is acceptable to be direct and when that directness will be read as hostility. You learned these rules without a lesson, from mistake and correction and observation. They are not your native rules. You follow them, which is different from having them.`
    },
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.addFlag('integration_competence')
      p.setMem('emigUnwrittenRules', true)
    },
  },

  {
    id: 'emig_permanence_question',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 3 && (G.yearsAbroad ?? 0) <= 6 &&
      !G.mem?.emigPermanenceQ,
    text: (G) => {
      const oldCountry = G.character.country.name
      const hasFamilyHere = (G.partner || (G.children ?? []).length > 0)
      if (hasFamilyHere) {
        return `You are building something here — a life with weight and structure, people who depend on you and on whom you depend. When someone asks if you plan to go back to ${oldCountry}, the answer is no longer automatic. It is not no. It is not yes. It is the answer of a person who has two places and is still working out which is home.`
      }
      return `Three or four years in. Longer than you planned. Not long enough to stop planning. The question of whether you stay permanently presents itself differently now — less like a distant decision and more like something that has been deciding itself while you were otherwise occupied.`
    },
    choices: [
      {
        text: 'You decide to stay.',
        tag: 'decided_to_stay',
        outcome: 'The decision, once made, changes something. You begin to act like someone who is staying.',
        effect: (p) => { p.m += 5; p.addFlag('decided_to_stay'); p.setMem('emigPermanenceQ', true) },
      },
      {
        text: 'You do not decide. The question stays open.',
        tag: 'permanence_deferred',
        outcome: 'The open question is both freedom and weight. You carry it.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('emigPermanenceQ', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'emig_belonging_asterisk',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 6 && (G.yearsAbroad ?? 0) <= 12 &&
      !G.mem?.emigBelongingAsterisk,
    text: (G) => {
      const newCountry = G.currentCountry?.name ?? 'this country'
      const oldCountry = G.character.country.name
      const integrated = G.flags.has('integration_competence') || G.flags.has('decided_to_stay')
      if (integrated) {
        return `You belong here. With an asterisk. The asterisk is not hostile — it is just accurate. You have friends, routines, a neighbourhood you know the way a person knows their neighbourhood. You also have a story that starts somewhere else. The asterisk is part of that story. You have mostly stopped resenting it.`
      }
      return `You have been in ${newCountry} longer than most of your relationships here have existed. ${oldCountry} is where you are from. Here is where you live. The gap between those two sentences is not pain exactly — it is more like a fact you have incorporated into how you move through the world.`
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.s += 2
      p.addFlag('immigrant_identity')
      p.setMem('emigBelongingAsterisk', true)
    },
  },

  {
    id: 'emig_old_country_visit',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 10 &&
      !G.mem?.emigOldCountryVisit,
    text: (G) => {
      const oldCountry = G.character.country.name
      return `You visit ${oldCountry} again. People you knew are older in the specific way that only makes sense when you haven't watched it happen gradually. The place has changed and also has not changed, both of which you expected. What you didn't expect: you move through it like a tourist with inside knowledge, which is a different thing from belonging. On the flight back, you think the word "back" and notice you mean it.`
    },
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 3
      p.e += 2
      p.addFlag('old_country_visitor')
      p.setMem('emigOldCountryVisit', true)
    },
  },

  {
    id: 'emig_two_selves',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 8 &&
      !G.mem?.emigTwoSelves &&
      G.stats.smarts >= 50,
    text: (G) => {
      const oldCountry = G.character.country.name
      return `You notice you are slightly different in each language. Not a different person — the same one, but the emphasis falls elsewhere. In ${oldCountry}'s language you are more direct, quicker to irony, more yourself in the register of your childhood. Here, you are more considered, more careful, occasionally more polite than you mean to be. Neither version is inauthentic. You have simply become someone who contains two native registers and has learned to use them like different keys.`
    },
    choices: null,
    effect: (p) => {
      p.e += 4
      p.s += 3
      p.addFlag('bilingual_self')
      p.setMem('emigTwoSelves', true)
    },
  },

  {
    id: 'emig_explain_yourself',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 4 &&
      !G.mem?.emigExplainYourself,
    text: (G) => {
      const oldCountry = G.character.country.name
      return `You are at a dinner and someone asks about ${oldCountry}. A genuine question, well-intentioned. You give the answer you always give — the compressed, public-facing version that leaves out everything you actually know. You have told it so many times it no longer feels like a story. It has become a wall you built to stand behind. You are not sure this is wrong. You are not sure it is right either.`
    },
    choices: [
      {
        text: 'Give the usual answer. This is not the moment.',
        tag: 'kept_the_wall',
        outcome: 'The conversation moves on. You feel the familiar small loss.',
        effect: (p) => { p.m -= 2; p.r += 2; p.setMem('emigExplainYourself', true) },
      },
      {
        text: 'Tell them something real.',
        tag: 'broke_the_wall',
        outcome: 'The table goes quiet in the right way. Someone asks a follow-up. The conversation changes direction.',
        effect: (p) => { p.m += 5; p.s += 2; p.karma += 4; p.setMem('emigExplainYourself', true) },
      },
    ],
    effect: null,
  },

]

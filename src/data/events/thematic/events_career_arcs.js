// events_career_arcs.js
// Deep career arcs for four under-developed careers:
//   - Athlete (injury, identity, transition out, life after)
//   - Academic (tenure clock, publish-or-perish, defining student, burnout)
//   - Chef/Hospitality (kitchen grind, ownership, creative arc, staff cost)
//   - Soldier (deployment, combat follow-through, civilian return, family cost)

// ═══════════════════════════════════════════════════════════════════════════════
// ATHLETE ARC
// ═══════════════════════════════════════════════════════════════════════════════

const ATHLETE_EVENTS = [

  {
    id: 'ath_first_injury',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.career?.id === 'athlete' &&
      G.age >= 19 && G.age <= 26 &&
      !G.mem?.athFirstInjuryDone,
    text: (G) => {
      const sport = G.mem?.athleteSport ?? 'your sport'
      return `The injury announces itself mid-performance — not a crack but a specific wrong feeling, the body sending information you do not want to receive. The assessment afterwards takes longer than the injury itself. You are told six to eight weeks. You have heard this before from teammates and know that it means ten to twelve.`
    },
    choices: [
      {
        text: 'Rest properly — the body needs what it needs',
        tag: null,
        outcome: 'You come back at the right time. The ten weeks pass slowly. You come back right.',
        effect: (p) => { p.h -= 5; p.m -= 8; p.setMem('athFirstInjuryDone', true) },
      },
      {
        text: 'Return early — you cannot afford to miss the season',
        tag: null,
        outcome: 'You return in five weeks. The season is saved. The injury is not fully resolved. You will pay for this later.',
        effect: (p) => { p.h -= 15; p.m -= 4; p.addFlag('athlete_injury_rushed'); p.setMem('athFirstInjuryDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ath_serious_injury',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.career?.id === 'athlete' &&
      G.age >= 27 && G.age <= 35 &&
      !G.mem?.athSeriousInjuryDone,
    text: (G) => {
      const hasRushed = G.flags.has('athlete_injury_rushed')
      if (hasRushed) {
        return 'The injury you did not properly recover from has compounded. This one is serious — surgery, a long rehabilitation, a question mark over the return. The surgeon is straightforward: you can come back, but the timeline is measured in months, not weeks. And the return is not guaranteed to be the same as the before.'
      }
      return 'This is the injury that the career is divided into: before and after. The surgery is successful. The rehabilitation takes the best part of a year. What you come back as is most of what you were. Most is not all.'
    },
    effect: (p) => { p.h -= 25; p.m -= 15; p.addFlag('athlete_serious_injury'); p.setMem('athSeriousInjuryDone', true) },
    choices: null,
  },

  {
    id: 'ath_career_peak',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.career?.id === 'athlete' &&
      G.career?.level >= 2 &&
      G.age >= 22 && G.age <= 30 &&
      !G.mem?.athCareerPeakDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const yr = G.currentYear ?? 2000
      if (a === 'subsaharan' || a === 'developing_unstable') {
        return 'You are performing at the highest level you have reached. The visibility is unlike anything else in your community — people greet you differently, call your name, expect things from you. The money is not what the sport journalists write about but it is more than your family has had. The weight of this is not separate from the joy of it.'
      }
      return 'You are at the peak of what you can do. You know this because you can feel the difference from two years ago. The body is at its most reliable. The training is embedded. You are very good at the thing you have spent your life becoming good at. The window is not large. You are inside it now.'
    },
    effect: (p) => { p.m += 15; p.fame += 10; p.addFlag('athlete_peak_years'); p.setMem('athCareerPeakDone', true) },
    choices: null,
  },

  {
    id: 'ath_retirement_decision',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'athlete' &&
      G.age >= 31 && G.age <= 38 &&
      (G.flags.has('athlete_serious_injury') || G.career?.level <= 1 || G.age >= 34) &&
      !G.mem?.athRetirementDone,
    text: (G) => {
      const yr = G.currentYear ?? 2000
      return `The conversation is not dramatic — no single moment announces the end. It is more that the calculation shifts: the body takes longer to recover, the younger athletes are better than you were at their age, the enthusiasm for the training has a different quality than it did. The sport is still there. You are changing around it.`
    },
    choices: [
      {
        text: 'Retire now — on your own terms, while you still can',
        tag: null,
        outcome: 'You choose the moment rather than letting the moment choose you. This is better than the alternative, even if it does not feel like better.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('athlete_retired_own_terms'); p.setMem('athRetirementDone', true) },
      },
      {
        text: 'One more year — there is still something left',
        tag: null,
        outcome: 'You are right. There is one more year. Then the decision returns.',
        effect: (p) => { p.m += 3; p.h -= 5; p.setMem('athRetirementDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ath_identity_after',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id !== 'athlete' &&
      (G.flags.has('athlete_retired_own_terms') || G.flags.has('athlete_peak_years') || G.flags.has('athlete_serious_injury')) &&
      G.age >= 33 && G.age <= 45 &&
      !G.mem?.athIdentityAfterDone,
    text: (G) => {
      const yr = G.currentYear ?? 2000
      return `The sport is behind you now. This is the adjustment that no one adequately warned you about — not the body's decline, which you expected, but the question of who you are when the thing you organised your self around is gone. The answer takes longer to find than you expected. It is also findable.`
    },
    choices: [
      {
        text: 'Move toward coaching — pass it on',
        tag: null,
        outcome: 'You find that teaching what you know is its own satisfaction. The knowledge does not disappear when you retire. It becomes something else.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('athlete_became_coach'); p.setMem('athIdentityAfterDone', true) },
      },
      {
        text: 'Build a life outside the sport entirely',
        tag: null,
        outcome: 'The reconstruction takes time. You find other anchors. The sport remains in you as a foundation rather than an identity.',
        effect: (p) => { p.m += 6; p.e += 5; p.setMem('athIdentityAfterDone', true) },
      },
      {
        text: 'Let the identity crisis run its course',
        tag: null,
        outcome: 'The difficult years are real. You come out the other side, slowly.',
        effect: (p) => { p.m -= 8; p.r += 10; p.setMem('athIdentityAfterDone', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// ACADEMIA ARC
// ═══════════════════════════════════════════════════════════════════════════════

const ACADEMIA_EVENTS = [

  {
    id: 'acad_phd_grind',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.career?.id === 'academic' &&
      G.career?.level === 0 &&
      G.age >= 24 && G.age <= 30 &&
      !G.mem?.acadPhdGrindDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      if (a === 'developing_urban' || a === 'subsaharan') {
        return 'The funding is inadequate and the infrastructure unreliable, but you are doing the work. Your supervisor has connections and limited time for you; you learn by watching and by failing. The research is good. You know it is good. Whether the system will recognise it is a separate question.'
      }
      return 'The PhD is a specific kind of poverty — educated and structurally dependent and paid not enough to live on without supplementing. Your supervisor is brilliant and rarely available. You learn more from your peers than from any formal instruction. The work is yours in a way nothing will be again.'
    },
    effect: (p) => { p.m -= 8; p.e += 10; p.h -= 4; p.setMem('acadPhdGrindDone', true) },
    choices: null,
  },

  {
    id: 'acad_tenure_clock',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'academic' &&
      G.career?.level >= 1 &&
      G.age >= 31 && G.age <= 42 &&
      !G.mem?.acadTenureClockDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const yr = G.currentYear ?? 2000
      if (a === 'developing_urban' || a === 'subsaharan') {
        return 'In this institution, the tenure process works by different logic — personal connections, departmental politics, who sponsors your file. The research you have produced is strong. Whether that is the deciding factor is not certain. You are assembling the right relationships alongside the right work.'
      }
      return 'You have five years from the date you were hired. The clock runs underneath every piece of work — the papers submitted, the teaching evaluations, the committee service. Publish or perish is not a metaphor. The peers who did not make tenure are not hypothetical; you watched several of them go.'
    },
    choices: [
      {
        text: 'Focus on publications — the research record is the record',
        tag: null,
        outcome: 'You produce. The teaching suffers somewhat. This is the calculation the system incentivises.',
        effect: (p) => { p.e += 8; p.m -= 5; p.addFlag('publish_or_perish'); p.setMem('acadTenureClockDone', true) },
      },
      {
        text: 'Build the teaching reputation — it matters for the institution',
        tag: null,
        outcome: 'Your teaching is excellent. The tenure case is harder to make. You make it anyway.',
        effect: (p) => { p.s += 8; p.m -= 3; p.addFlag('noted_teacher'); p.setMem('acadTenureClockDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'acad_defining_student',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.career?.id === 'academic' &&
      G.career?.level >= 2 &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.acadDefStudentDone,
    text: (G) => {
      const studentName = G.mem?.acadStudentName ?? 'one student'
      return `You have taught hundreds of students. Most of them you remember only generally. There is one — a particular mind, a particular quality of attention — who you have followed with more care than is strictly professional. You have given them more than the syllabus requires. You are watching them become someone who may be better at this than you are. This is both the goal and, in some specific and honest part of you, complicated.`
    },
    choices: [
      {
        text: 'Push them further — give them every connection you have',
        tag: null,
        outcome: 'You do for them what your best teacher did for you. The chain continues.',
        effect: (p) => { p.karma += 10; p.m += 8; p.addFlag('is_mentor'); p.setMem('acadDefStudentDone', true) },
      },
      {
        text: 'Let them find their own path from here — you have done what you can',
        tag: null,
        outcome: 'A proper and respectful withdrawal. They will be fine. You will always wonder what the other path would have produced.',
        effect: (p) => { p.m += 5; p.r += 4; p.setMem('acadDefStudentDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'acad_grant_rejection',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.career?.id === 'academic' &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.acadGrantRejDone,
    text: 'The grant application took three months to build. The rejection letter is a paragraph. The reason given is legitimate but does not adequately explain why yours was not funded over the ones that were. You read the successful abstracts. Two of them are not as good as yours. You know this is not objective. You also know it is true.',
    choices: [
      {
        text: 'Revise and resubmit — this work deserves to exist',
        tag: null,
        outcome: 'The second application is sharper. You know now what the reviewers want. That is a different skill from research but it is learnable.',
        effect: (p) => { p.e += 6; p.m -= 5; p.setMem('acadGrantRejDone', true) },
      },
      {
        text: 'Start a new project — the field needs to move anyway',
        tag: null,
        outcome: 'The pivot is better than it looked from outside the decision. You were getting stale on the old project.',
        effect: (p) => { p.m += 4; p.e += 4; p.setMem('acadGrantRejDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'acad_burnout_sabbatical',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.career?.id === 'academic' &&
      G.career?.level >= 2 &&
      G.age >= 45 && G.age <= 58 &&
      G.stats.happiness < 55 &&
      !G.mem?.acadBurnoutDone,
    text: 'You have been doing this for twenty years. The university wants more: more papers, more external funding, more administrative service, more visible impact metrics. The teaching was the reason you came here. You cannot remember the last time a lecture felt like the thing itself rather than performance of the thing.',
    choices: [
      {
        text: 'Take the sabbatical — write the book you have been not writing',
        tag: null,
        outcome: 'The year away from the institution reminds you what the work was originally for.',
        effect: (p) => { p.m += 15; p.e += 8; p.h += 5; p.addFlag('took_sabbatical'); p.setMem('acadBurnoutDone', true) },
      },
      {
        text: 'Find the part that still means something and protect it',
        tag: null,
        outcome: 'You stop going to the optional meetings. You teach one course well instead of three adequately. It helps.',
        effect: (p) => { p.m += 8; p.setMem('acadBurnoutDone', true) },
      },
      {
        text: 'Leave the institution — the knowledge is yours regardless',
        tag: null,
        outcome: 'The departure is not a failure. It is a reclassification. What you know is still true outside the building.',
        effect: (p) => { p.m += 10; p.r += 6; p.addFlag('left_academia'); p.setMem('acadBurnoutDone', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// CHEF / HOSPITALITY ARC
// ═══════════════════════════════════════════════════════════════════════════════

const HOSPITALITY_EVENTS = [

  {
    id: 'hosp_kitchen_floor',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.career?.id === 'chef' &&
      G.career?.level === 0 &&
      G.age >= 17 && G.age <= 25 &&
      !G.mem?.hospKitchenFloorDone,
    text: 'The kitchen at this level is heat and pressure and hierarchy. The head chef communicates in corrections. You are not supposed to have opinions about the food yet; you are supposed to be fast and clean and present. You are learning the thing underneath the thing — the mise en place, the timing, the specific discipline of producing the same standard under any conditions.',
    effect: (p) => { p.h -= 6; p.m -= 5; p.e += 8; p.setMem('hospKitchenFloorDone', true) },
    choices: null,
  },

  {
    id: 'hosp_head_chef_pressure',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'chef' &&
      G.career?.level >= 2 &&
      G.age >= 28 && G.age <= 42 &&
      !G.mem?.hospHeadChefDone,
    text: 'You run the kitchen now. The line between your standards and the possible is the permanent tension of this job. The kitchen turns over staff constantly — it is the industry; it is also partly you. The pressure you absorbed coming up, you now give. You do not always like this about yourself.',
    choices: [
      {
        text: 'Mentor the junior staff — the culture you build is the kitchen',
        tag: null,
        outcome: 'The turnover slows. The food improves. It takes longer to see than the alternatives.',
        effect: (p) => { p.karma += 8; p.m += 6; p.addFlag('mentor_in_kitchen'); p.setMem('hospHeadChefDone', true) },
      },
      {
        text: 'Standards are non-negotiable — those who cannot keep up go',
        tag: null,
        outcome: 'The kitchen is efficient and cold. The food is excellent. The staff leave.',
        effect: (p) => { p.m -= 5; p.e += 5; p.addFlag('demanding_chef'); p.setMem('hospHeadChefDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'hosp_own_restaurant_aftermath',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('entrepreneur') &&
      G.career?.id === 'chef' &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.hospOwnRestaurantDone,
    text: 'The restaurant is in its second year. The first year almost ended it. You are still here. The gap between the food you imagined making and the food the business requires you to make is smaller than you feared and larger than you hoped. The margin is real and it shapes the menu whether you want it to or not.',
    choices: [
      {
        text: 'Protect the creative core — some things are not for sale',
        tag: null,
        outcome: 'The regulars come for the food that cannot be found elsewhere. The margins are thin but the restaurant is yours.',
        effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('creative_integrity_chef'); p.setMem('hospOwnRestaurantDone', true) },
      },
      {
        text: 'Give the customers what moves — adjust the vision to the viable',
        tag: null,
        outcome: 'The business stabilises. You have made something sustainable. You have also made compromises. Both are true.',
        effect: (p) => { p.mo += 5000; p.m += 4; p.setMem('hospOwnRestaurantDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'hosp_burnout_body',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.career?.id === 'chef' &&
      G.age >= 38 && G.age <= 52 &&
      G.stats.health < 55 &&
      !G.mem?.hospBurnoutBodyDone,
    text: 'The hospitality body at forty is not the hospitality body at twenty. The back, specifically the lower back. The knees. The hands — the knife nicks that healed into scar tissue, the burns, the arthritis beginning in the finger joints. The work is twelve to fifteen hours on your feet. The industry does not discuss what it does to the people who do it.',
    choices: [
      {
        text: 'Move into a role that keeps the food but loses the floor',
        tag: null,
        outcome: 'Consulting, teaching, developing menus from a seated desk — not what you imagined and also not nothing.',
        effect: (p) => { p.h += 8; p.m -= 4; p.r += 6; p.setMem('hospBurnoutBodyDone', true) },
      },
      {
        text: 'Stay — the body will manage',
        tag: null,
        outcome: 'The body manages for longer than expected and then stops managing suddenly.',
        effect: (p) => { p.h -= 12; p.m += 3; p.setMem('hospBurnoutBodyDone', true) },
      },
    ],
    effect: null,
  },

]

// ═══════════════════════════════════════════════════════════════════════════════
// SOLDIER / MILITARY ARC
// ═══════════════════════════════════════════════════════════════════════════════

const SOLDIER_EVENTS = [

  {
    id: 'sold_deployment',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.career?.id === 'soldier' &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.soldDeploymentDone,
    text: (G) => {
      const country = G.character?.country?.name ?? ''
      const conflictRisk = G.character?.country?.conflictRisk ?? 0.1
      const yr = G.currentYear ?? 2000
      const isHighConflict = conflictRisk > 0.2

      if (isHighConflict) {
        return 'The deployment is to an active zone. The briefings prepared you for the logistics of it. They did not prepare you for the specific texture of moving through a place where the ordinary people are just trying to continue. You are carrying a weapon in a neighbourhood market. The children look at the weapon and then at you. You have no way to explain yourself to them that would help anything.'
      }
      // USA Gulf War / Afghanistan / Iraq framing
      if (country === 'United States' && yr >= 2001) {
        return 'You are deployed. The deployment is to a country most of your family cannot locate on a map. The daily reality is different from the news coverage in both directions — more tedious and more frightening than the coverage suggests, and also more specific. You come to know the particular quality of light at 5am over this landscape. You did not expect to.'
      }
      return 'The deployment is the part of the career that the recruitment posters do not show. The waiting, the maintenance, the boredom that is its own kind of stress. When the actual events come, the training holds. You hold. After, you process the holding.'
    },
    effect: (p) => { p.h -= 5; p.m -= 10; p.addFlag('deployed'); p.setMem('soldDeploymentDone', true) },
    choices: null,
  },

  {
    id: 'sold_what_you_carry',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.career?.id === 'soldier' &&
      G.flags.has('deployed') &&
      G.age >= 21 && G.age <= 32 &&
      !G.mem?.soldWhatYouCarryDone,
    text: 'You are back. The physical re-entry is straightforward; the base, the paperwork, the debrief. What is not on any form is the specific catalogue of things you carry back. Not all of it is bad; some of it is. The civilian world has continued in your absence and expects you to synchronise to it quickly. The synchronisation is not quite complete.',
    choices: [
      {
        text: 'Talk to someone who was there',
        tag: null,
        outcome: 'Not everything needs to be said, but some of it does. The conversation that happens requires the other person to have been in a comparable place.',
        effect: (p) => { p.m += 8; p.h += 3; p.addFlag('processed_service'); p.setMem('soldWhatYouCarryDone', true) },
      },
      {
        text: 'Keep it with yourself — civilians would not understand',
        tag: null,
        outcome: 'The carrying continues. The weight is manageable until it is not.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('unprocessed_service'); p.setMem('soldWhatYouCarryDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sold_family_distance',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'soldier' &&
      G.flags.has('deployed') &&
      G.partner &&
      G.age >= 25 && G.age <= 40 &&
      !G.mem?.soldFamilyDistDone,
    text: (G) => {
      const partnerName = G.partner?.name ?? 'your partner'
      return `The person ${partnerName} became while you were deployed is not exactly the person you left. You are not exactly the person who left. The marriage that existed before the deployment is continuous with the one that exists after but it is also a different object. You are both adjusting to a relationship that has a before and an after.`
    },
    choices: [
      {
        text: 'Make the work of it — the marriage is worth the adjustment',
        tag: null,
        outcome: 'It takes longer than the before, this marriage. It is also, for having survived, a different kind of solid.',
        effect: (p) => { p.m += 8; p.partnerRel(10); p.setMem('soldFamilyDistDone', true) },
      },
      {
        text: 'Some of the distance is permanent — you both know it',
        tag: null,
        outcome: 'You stay. The gap stays. You both manage within it. This is not nothing.',
        effect: (p) => { p.m -= 6; p.r += 8; p.setMem('soldFamilyDistDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sold_leaving_service',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.career?.id === 'soldier' &&
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.soldLeavingServiceDone,
    text: (G) => {
      const a = G.character?.country?.archetype
      const yr = G.currentYear ?? 2000
      const hasPension = a === 'wealthy_west' || a === 'wealthy_east' || a === 'wealthy_gulf'
      if (hasPension) {
        return 'The pension is real and the transition support is more than previous generations received. Neither of these fully solves the question of what you are now that you are not what you were. The structure of the military — the clarity of command, the shared purpose, the specific social world it creates — has no civilian equivalent you have found yet.'
      }
      return 'You are leaving. The pension, if there is one, is small. The skills you carry — logistics, command, the ability to perform under pressure — are valuable and also not always visible to civilian employers who see the uniform but not the competency. The translation is yours to do.'
    },
    choices: [
      {
        text: 'Build on what the service gave you — find the civilian equivalent',
        tag: null,
        outcome: 'The discipline transfers. The transition takes two years. You find where you fit.',
        effect: (p) => { p.m += 8; p.e += 5; p.setMem('soldLeavingServiceDone', true) },
      },
      {
        text: 'Stay in the military world — contractor, instructor, reserve',
        tag: null,
        outcome: 'You do not fully leave. The world you know stays accessible. Some things close; others remain.',
        effect: (p) => { p.m += 5; p.addFlag('military_adjacent'); p.setMem('soldLeavingServiceDone', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sold_nightmares_years_later',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      (G.flags.has('combat_veteran') || G.flags.has('unprocessed_service')) &&
      G.age >= 32 && G.age <= 55 &&
      !G.mem?.soldNightmaresDone,
    text: 'Years later, the mind revisits. Not always at night; sometimes in a specific kind of light, or a particular sound. You function normally around it — this is not the catastrophic version. It is a room in the house of yourself that is always slightly lit.',
    choices: [
      {
        text: 'Get proper help — twenty years of managing alone is enough',
        tag: null,
        outcome: 'The talking about it with a professional is different from the not-talking about it. Both require a kind of bravery. This one helps more.',
        effect: (p) => { p.m += 12; p.h += 5; p.addFlag('veteran_got_help'); p.setMem('soldNightmaresDone', true) },
      },
      {
        text: 'It is manageable — you have managed it this long',
        tag: null,
        outcome: 'You continue to manage. The room stays lit.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('soldNightmaresDone', true) },
      },
    ],
    effect: null,
  },

]

export const CAREER_ARC_EVENTS = [
  ...ATHLETE_EVENTS,
  ...ACADEMIA_EVENTS,
  ...HOSPITALITY_EVENTS,
  ...SOLDIER_EVENTS,
]

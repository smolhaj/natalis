// events_activity_payoffs.js
// Downstream consequences for flags set by activities that previously had no payoff:
// extracurricular clubs, therapy_veteran, generous, tattooed, pierced.
// These are the "so it mattered" moments — the long payoff of a teenage choice.

export const ACTIVITY_PAYOFF_EVENTS = [

  // ── EXTRACURRICULAR PAYOFFS ────────────────────────────────────────────────

  {
    id: 'payoff_drama_club',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('drama_club') && G.age >= 18 && G.age <= 28 && !G.mem?.payoffDrama,
    text: 'You are in a situation that requires you to perform — a job interview, a first date, a room full of strangers — and something the drama teacher said, years ago, arrives in your body before your brain can panic. You know how to stand. You know where to look.',
    choices: null,
    effect: (p) => { p.s += 6; p.m += 5; p.setMem('payoffDrama', true) },
  },

  {
    id: 'payoff_debate_club',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('debate_club') && G.age >= 18 && G.age <= 30 && !G.mem?.payoffDebate,
    text: 'Someone in a meeting makes a claim that is simply wrong. You wait for others to say something. No one does. You lay out the counter-argument in three sentences — evidence, implication, alternative — and the room shifts. You have been practising this since you were thirteen.',
    choices: null,
    effect: (p) => { p.s += 5; p.e += 4; p.m += 4; p.setMem('payoffDebate', true) },
  },

  {
    id: 'payoff_science_club',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('science_club') && G.age >= 18 && G.age <= 26 && !G.mem?.payoffScience,
    text: 'A professor asks what drew you to this field. You think of a particular experiment, in a particular room, on a particular afternoon — the moment you understood that the world follows rules and you can learn them. You say something close to this. They nod like they recognise it.',
    choices: null,
    effect: (p) => { p.e += 6; p.m += 4; p.w += 3; p.setMem('payoffScience', true) },
  },

  {
    id: 'payoff_school_band',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('school_band') && !G.mem?.payoffBand,
    text: 'You hear a song that your school band used to play badly every Friday afternoon. You remember the drummer counting off wrong, the way the guitar solo always ended slightly early. The memory is sharp and entirely warm. You had not thought about those afternoons in years.',
    choices: [
      {
        text: 'Pick up an instrument again',
        tag: null,
        outcome: 'The muscle memory is still there, somewhere beneath the rust.',
        effect: (p) => { p.m += 10; p.practiceHobby('music', 10); p.setMem('payoffBand', true) },
      },
      {
        text: 'Leave it as a good memory',
        tag: null,
        outcome: 'Some things are better as the thing they were.',
        effect: (p) => { p.m += 6; p.setMem('payoffBand', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'payoff_art_club',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('art_club') && G.age >= 18 && !G.mem?.payoffArtClub,
    text: 'You still draw, sometimes — in the margins of notebooks, in biro on napkins. Someone sees it and asks if you make art seriously. You say no. But the question stays with you for a week.',
    choices: [
      {
        text: 'Start treating it seriously',
        tag: null,
        outcome: 'You buy a sketchbook. You use it.',
        effect: (p) => { p.m += 8; p.practiceHobby('art', 12); p.setMem('payoffArtClub', true) },
      },
      {
        text: 'It\'s a private thing — keep it that way',
        tag: null,
        outcome: 'The napkins keep piling up.',
        effect: (p) => { p.m += 5; p.setMem('payoffArtClub', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'payoff_coding_club',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('coding_club') &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.payoffCodingClub &&
      G.currentYear >= 1995,
    text: 'A colleague is stuck on something that, to you, is obvious. You solve it in ten minutes. When they ask where you learned this, you think back to a room in your school with bad fluorescent lighting where you spent lunch hours building things that didn\'t quite work but almost did.',
    choices: null,
    effect: (p) => { p.e += 6; p.s += 3; p.w += 4; p.setMem('payoffCodingClub', true) },
  },

  {
    id: 'payoff_sports_team_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.includes('sports_team') && G.age >= 35 && !G.mem?.payoffSportsTeam,
    text: 'You run into someone from your school sports team. You are both at different stages of softening than you were then. You get a coffee. The conversation covers the intervening years in the way that old teammates do — a lot assumed, a little filled in, the shorthand of shared sweat.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.h += 3; p.setMem('payoffSportsTeam', true) },
  },

  // Career boost: clubs that map cleanly to career fields
  // These fire when the player enters a matching career after having done the club.
  {
    id: 'payoff_club_career_boost',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.career &&
      !G.mem?.payoffClubCareer &&
      (
        (G.flags.includes('drama_club') && ['entertainment', 'media'].includes(G.career.field)) ||
        (G.flags.includes('debate_club') && ['law', 'politics'].includes(G.career.field)) ||
        (G.flags.includes('science_club') && ['science', 'healthcare', 'research'].includes(G.career.field)) ||
        (G.flags.includes('coding_club') && G.career.id === 'software_developer') ||
        (G.flags.includes('school_band') && G.career.field === 'entertainment')
      ),
    text: (G) => {
      const club = G.flags.includes('drama_club') ? 'drama' :
                   G.flags.includes('debate_club') ? 'debate' :
                   G.flags.includes('science_club') ? 'science' :
                   G.flags.includes('coding_club') ? 'coding' : 'school band'
      return `Your manager asks how you got comfortable with this so quickly. You think back to ${club} club — the afternoons, the work, the teacher who took it seriously enough that you did too. The foundation was laid before you knew what you were building.`
    },
    choices: null,
    effect: (p) => { p.w += 5; p.s += 3; p.m += 6; p.setMem('payoffClubCareer', true) },
  },

  // ── THERAPY VETERAN PAYOFFS ────────────────────────────────────────────────

  {
    id: 'payoff_therapy_crisis_resilience',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('therapy_veteran') &&
      G.stats.happiness < 40 &&
      !G.mem?.payoffTherapyCrisis,
    text: 'This period is the worst in a long time. But you have a frame for it — not a solution, a frame. You know what the spiral looks like from inside and you know that knowing it does not stop it but it does make it survivable. You have been here before and left. That is a fact you can hold.',
    choices: [
      {
        text: 'Book an appointment — you know what helped before',
        tag: null,
        outcome: 'The first session is easier than the first one ever was. The vocabulary is already there.',
        effect: (p) => { p.m += 12; p.r -= 5; p.setMentalHealth({ therapy: true }); p.setMem('payoffTherapyCrisis', true) },
      },
      {
        text: 'You can manage this yourself — you know the tools',
        tag: null,
        outcome: 'You use what you learned. It works, mostly. Mostly is enough.',
        effect: (p) => { p.m += 7; p.r -= 3; p.setMem('payoffTherapyCrisis', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'payoff_therapy_relationship',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.includes('therapy_veteran') &&
      G.partner &&
      !G.mem?.payoffTherapyRel,
    text: (G) =>
      `${G.partner?.name ?? 'Your partner'} says something that sounds like a criticism and you notice your own reaction before you respond to it. You do not take the bait of your own defensiveness. You ask what they actually mean. The conversation that follows is better than the argument it was going to be.`,
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.partnerRel(7); p.setMem('payoffTherapyRel', true) },
  },

  // ── GENEROUS PAYOFF ────────────────────────────────────────────────────────

  {
    id: 'payoff_generous_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('generous') &&
      G.age >= 35 &&
      !G.mem?.payoffGenerousReturn,
    text: 'Someone you helped years ago — you have half-forgotten the details — reaches out. They have not forgotten. The help mattered more than you knew. They are in a position now to reciprocate in some way, and they want to.',
    choices: [
      {
        text: 'Accept graciously',
        tag: null,
        outcome: 'What goes around. You did not give in order to receive, which makes the receiving simpler.',
        effect: (p) => { p.m += 10; p.s += 5; p.mo += 2000; p.karma += 5; p.setMem('payoffGenerousReturn', true) },
      },
      {
        text: 'Decline — it was never about return',
        tag: null,
        outcome: 'They understand. The relationship deepens in a different way.',
        effect: (p) => { p.m += 8; p.karma += 10; p.s += 4; p.setMem('payoffGenerousReturn', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'payoff_generous_community',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.includes('generous') &&
      G.age >= 55 &&
      !G.mem?.payoffGenerousCommunity,
    text: 'At a point in your life when you might expect to receive more than you give, you find the reverse is true. You are still the person who pays for the coffee. You are still the one who stays after. People notice. The accumulation of small generosities has produced something — not a reputation exactly, but a quality of relationship that is not available to people who kept better score.',
    choices: null,
    effect: (p) => { p.m += 12; p.s += 6; p.karma += 8; p.addFlag('generous_legacy'); p.setMem('payoffGenerousCommunity', true) },
  },

  // ── TATTOOED / PIERCED CONSEQUENCES ───────────────────────────────────────

  {
    id: 'payoff_tattooed_workplace',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('tattooed') &&
      G.career &&
      ['law', 'finance', 'government', 'healthcare'].includes(G.career.field) &&
      !G.mem?.payoffTattooWork,
    text: 'Your manager mentions, with careful neutrality, that a client commented on your visible tattoo. It is not a policy issue. It is a preference issue. The subtext is not subtle.',
    choices: [
      {
        text: 'Cover it at work — not worth the friction',
        tag: null,
        outcome: 'You adapt. The tattoo is still yours. The compromise costs you something small.',
        effect: (p) => { p.m -= 4; p.w += 3; p.setMem('payoffTattooWork', true) },
      },
      {
        text: 'This is who you are — if they have a problem, it\'s their problem',
        tag: null,
        outcome: 'Some colleagues are quietly impressed. One senior person is not. You file that away.',
        effect: (p) => { p.m += 5; p.karma += 3; p.w -= 3; p.setMem('payoffTattooWork', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'payoff_tattooed_later',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('tattooed') &&
      G.age >= 35 &&
      !G.mem?.payoffTattooLater,
    text: 'A young colleague asks about the tattoo. You explain what it meant when you got it. The answer is more complicated now — the original meaning is still there, but the years have added a layer. You are both the person who got it and the person who has carried it since.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('payoffTattooLater', true) },
  },

  {
    id: 'payoff_pierced_workplace',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.includes('pierced') &&
      G.career &&
      ['law', 'finance', 'government'].includes(G.career.field) &&
      !G.mem?.payoffPiercedWork,
    text: 'The unspoken dress code at your workplace does not include piercings. No one has said anything. The looks have been sufficient.',
    choices: [
      {
        text: 'Remove it for work — it\'s just metal',
        tag: null,
        outcome: 'A small surrender. You stop thinking about it after a week.',
        effect: (p) => { p.m -= 3; p.w += 2; p.setMem('payoffPiercedWork', true) },
      },
      {
        text: 'Keep it — the job description said nothing about this',
        tag: null,
        outcome: 'The norm holds. You are outside it. Both things are true.',
        effect: (p) => { p.m += 3; p.s += 3; p.setMem('payoffPiercedWork', true) },
      },
    ],
    effect: null,
  },

]

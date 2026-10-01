// events_roads_not_taken.js
// The choice you didn't make: at life-review ages (38–52 and 55–68), events reference
// the unchosen path — naming what the other option would have looked like.
// Used sparingly. Best at moments of stock-taking, not dramatised.

export const ROADS_NOT_TAKEN_EVENTS = [

  {
    id: 'rnt_workforce_no_university',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('workforce_direct') &&
      !G.flags.has('university_graduate') &&
      G.age >= 38 && G.age <= 48 &&
      !G.mem?.rntWorkforce,
    text: 'Someone at the table tonight has been to university, and you can hear it in how they mention things, by title, by decade. You could have gone. It was a real choice and you chose the work, and you built something with it. The version of you with the degree is not better than this one. But now and then you wonder what they know that you do not.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 4; p.setMem('rntWorkforce', true) },
  },

  {
    id: 'rnt_stayed_vs_emigrated_40',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('stayed_behind') &&
      !G.flags.has('emigrated') &&
      G.age >= 40 && G.age <= 52 &&
      !G.mem?.rntStayed,
    text: 'They are back for a visit — the ones who left when you could have. Successful, in a foreign way, carrying the small signs of a different country in their clothes and their complaints. You chose here. Everything you have is connected to that choice: the family, the career, the texture of this city in every season. You would not undo it. But you sit with the information of what left would have meant, for an evening, and then you go home.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('rntStayed', true) },
  },

  {
    id: 'rnt_emigrated_vs_stayed_40',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 40 && G.age <= 52 &&
      !G.mem?.rntEmigrated,
    text: (G) => {
      const origin = G.character?.country?.name ?? 'home'
      return `Someone from ${origin} has done well there. The news reaches you through mutual contacts — a position, a recognition, the kind of thing that would have been yours to attempt. You made a different bet. You bet on here. The bet has paid or is still paying or the verdict is unclear, but either way, the version of yourself who stayed is not more right than this one. You think about them occasionally anyway.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('rntEmigrated', true) },
  },

  {
    id: 'rnt_affair_not_taken',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('affair_not_taken') &&
      G.age >= 42 && G.age <= 56 &&
      !G.mem?.rntAffair,
    text: 'You think about the decision you made, not with regret, more with curiosity. The marriage, the children or none, the city that life would have happened in. The path goes off into country you cannot map. You chose this. The other one is interesting only because it stayed unchosen.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('rntAffair', true) },
  },

  {
    id: 'rnt_scholarship_sibling',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('scholarship_declined') &&
      G.siblings?.length > 0 &&
      G.age >= 58 && G.age <= 68 &&
      !G.mem?.rntScholarshipLate,
    text: 'A sibling took the scholarship you turned down, and lives in another city now, in another field, knowing things you do not. You have the life the other choice built. Both lives happened; one of them happened to you. At this age it seems neither tragic nor not. It is the map of what was.',
    choices: null,
    effect: (p) => { p.r += 6; p.setMem('rntScholarshipLate', true) },
  },

  {
    id: 'rnt_lost_faith_ceremony',
    phase: null,
    weight: 2,
    when: (G) =>
      G.flags.has('lost_faith') &&
      G.age >= 42 && G.age <= 58 &&
      !G.mem?.rntFaith,
    text: 'A ceremony: a wedding, a funeral, a naming. You stand in the building — the smell of it, the acoustics — and you are and you are not inside it. You left. The leaving was real and the reasons were real and the reasons are still real. Something about being here, briefly, inside the form of it, lets you see clearly both what you left and what the people who stayed have. Neither verdict is simple.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('rntFaith', true) },
  },

  {
    id: 'rnt_late_stayed_in_country',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.flags.has('emigrated') &&
      G.age >= 60 && G.age <= 72 &&
      !G.mem?.rntLateCountry &&
      ['subsaharan', 'developing_unstable', 'conflict_zone', 'post_soviet'].includes(G.character?.country?.archetype),
    text: (G) => {
      const country = G.character?.country?.name ?? 'here'
      return `People left ${country}, some your age, some younger, some older. You stayed, for reasons that were yours: a parent, a partner, a calculation, a refusal. The country has changed since they went. Whether enough, or in the right direction, or whether it was worth staying for, has no clean answer. You are still here, and so is the question.`
    },
    choices: null,
    effect: (p) => { p.r += 6; p.setMem('rntLateCountry', true) },
  },

  {
    id: 'rnt_childless_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (!G.children || G.children.length === 0) &&
      !G.flags.has('experienced_miscarriage') &&
      !G.flags.has('multiple_miscarriage') &&
      G.age >= 55 && G.age <= 68 &&
      !G.mem?.rntChildless,
    text: 'You look at the lives around you that went the other way. Some of them have exactly what you imagined and some of them are something else entirely. Your life has a shape that that choice — made or arrived at gradually — made possible. You occasionally wonder, in the quiet way that wondering operates at this age, what that other shape would have been. It is not grief. It is curiosity about a country you did not visit.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('rntChildless', true) },
  },

  {
    id: 'rnt_political_disengaged_40',
    phase: null,
    weight: 2,
    when: (G) =>
      G.political_leaning === null &&
      G.age >= 42 && G.age <= 58 &&
      !G.mem?.rntPolitical,
    text: 'The people who stayed in it, who went to every meeting and organised and stood for things, got some things done. You can see them from here. You were not wrong to step back; staying had a cost and you counted it. But the version of you who stayed would have done things this one did not. You know about both.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('rntPolitical', true) },
  },

]

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
    text: 'Someone at the table tonight has a university education that is visible in the way they reference things — casually, by title, by decade. You could have gone. You know that. The choice was real, not hypothetical. You chose the work instead. You have built something with that choice. The other version of yourself — the one with the degree — is not better than this one. But you wonder, occasionally, what they know that you don\'t.',
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
    text: 'They are back for a visit — the ones who left when you could have. Successful, in a foreign way, carrying the small signs of a different country in their clothes and their complaints. You chose here. Everything you have is connected to that choice: the family, the career, the specific texture of this city in every season. You would not undo it. But you sit with the information of what left would have meant, for an evening, and then you go home.',
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
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('affair_not_taken') &&
      G.age >= 42 && G.age <= 56 &&
      !G.mem?.rntAffair,
    text: 'You think about the decision you made — not with regret exactly but with something that functions like curiosity. What would that life have looked like. The marriage, the children or absence of them, the geography. The path you didn\'t take goes off into territory you cannot map. You chose this. This is what you chose. The other version is only interesting because it remained unchosen.',
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
    text: 'A sibling took the scholarship you turned down. They are in a different city now, in a different field, carrying a different kind of knowledge. You have a life that is built from the choice you made instead. Both lives happened. One of them happened to you. You sit with this at this age and find it neither tragic nor not tragic. It is simply the map of what was.',
    choices: null,
    effect: (p) => { p.r += 6; p.setMem('rntScholarshipLate', true) },
  },

  {
    id: 'rnt_lost_faith_ceremony',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_faith') &&
      G.age >= 42 && G.age <= 58 &&
      !G.mem?.rntFaith,
    text: 'A ceremony: a wedding, a funeral, a naming. You stand in the building — the specific smell of it, the specific acoustics — and you are and you are not inside it. You left. The leaving was real and the reasons were real and the reasons are still real. Something about being here, briefly, inside the form of it, lets you see clearly both what you left and what the people who stayed have. Neither verdict is simple.',
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
      return `People left ${country} at various points — some in your cohort, some younger, some older. You stayed. The reasons were specific to you: a parent, a partner, a calculation, a refusal. The country has changed in the years since the ones who left departed. Whether it has changed enough, or in the right direction, or whether it was worth staying for — that is not a question with a clean answer. You are still here. The question is still open.`
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
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.political_leaning === null &&
      G.age >= 42 && G.age <= 58 &&
      !G.mem?.rntPolitical,
    text: 'The people who stayed in it — who went to every meeting, who contested, who organised — some of them achieved things. You can see the things from here. You were not wrong to disengage. The cost of not disengaging was real and you calculated it. But the version of yourself who stayed in it got certain things done that this version did not. Both versions are legitimate. You are aware of both.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('rntPolitical', true) },
  },

]

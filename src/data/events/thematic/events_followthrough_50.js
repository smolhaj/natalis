// events_followthrough_50.js — Anniversary-aware follow-through events
//
// Uses TIMESTAMPED_FLAGS (mem.*Year) to fire at meaningful intervals after
// key life events: emigration at 5/10/20 years, divorce at 5/10 years,
// widowhood at 3/10 years, business failure at 5/10 years, cancer survivor
// at 5/10 years, the loss of a child at variable intervals.
//
// This is the system that makes the life feel like a continuous arc
// rather than a set of discrete events: the anniversary that arrives,
// the specific backward glance at a specific number of years.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const FOLLOWTHROUGH_50_EVENTS = [

  // ── EMIGRATION: 5-YEAR MARK ───────────────────────────────────────────────

  {
    id: 'ft50_emigrated_5yr',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.mem?.emigratedYear &&
      G.currentYear - G.mem.emigratedYear >= 5 &&
      G.currentYear - G.mem.emigratedYear <= 7 &&
      !G.mem?.ft50Emigrated5yr,
    text: pick([
      `Five years. The country you left is in a specific relationship with the country you are in: they coexist in you, one audible when you speak in one language, the other when you switch. At five years you have stopped converting everything mentally back to the prices, the weather, the customs of the place you came from. You have started doing this less automatically than you did at two. The country you left is beginning to require some effort to access. This is the immigration process, and it is not only loss.`,
      `Five years in the new country. You know which bus comes at what time. You know the particular register of the polite brush-off and the difference between it and genuine warmth. You know the names of things. The language has stopped feeling like a translation and started feeling like a second first language. The country you came from has become the place you know from the inside but no longer live in. The distance is now two distances: the distance from here to there, and the distance you have grown from the person who arrived.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('ft50Emigrated5yr', true) },
  },

  // ── EMIGRATION: 10-YEAR MARK ──────────────────────────────────────────────

  {
    id: 'ft50_emigrated_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.mem?.emigratedYear &&
      G.currentYear - G.mem.emigratedYear >= 10 &&
      G.currentYear - G.mem.emigratedYear <= 12 &&
      !G.mem?.ft50Emigrated10yr,
    text: pick([
      `Ten years. You have lived here for ten years, which is longer than you lived in several of the places you lived before leaving. The country you came from is now a country you visit. The country you live in is not quite the country you belong to — the passport says one thing, the accent or the name or the face says something the passport doesn't cover. Ten years produces a specific kind of person: the person who carries two complete sets of reference, and who can never fully assume the other person's experience because they know both sets too well.`,
      `A decade. When you left, you were one age and one set of circumstances. You are now a different age and different circumstances, and the decade happened here rather than there. The specific question — what would have been different if you had stayed — has fewer variables now, because you have seen what the place you came from has become in the decade you were absent. The comparison is not simple in either direction.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('ft50Emigrated10yr', true) },
  },

  // ── EMIGRATION: 20-YEAR MARK ──────────────────────────────────────────────

  {
    id: 'ft50_emigrated_20yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.mem?.emigratedYear &&
      G.currentYear - G.mem.emigratedYear >= 20 &&
      G.currentYear - G.mem.emigratedYear <= 23 &&
      !G.mem?.ft50Emigrated20yr,
    text: pick([
      `Twenty years. The children, if you have children, have never known the country you came from as home. The language you think in has shifted definitively. The friends from before exist in a parallel track — a different city, a different set of decades' worth of ordinary decisions — and when you meet them the gap is visible, not as estrangement but as the gap between two lives that diverged at a specific point and went in different directions. You are the life that went in this direction. The other life is the life you didn't have, and it is being lived by someone else who resembles the person you were.`,
      `Twenty years in the new country. The old country is somewhere you visit now, which is a specific relationship with a place: you know it with the precision of someone who lived there for years, and you see it with the eyes of someone who left. The people who stayed know it differently — from the inside of its continuous ordinary present. You know its past with precision and its present from reports and visits. Neither knowledge is complete. Both are real.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.m += 3; p.setMem('ft50Emigrated20yr', true) },
  },

  // ── DIVORCE: 5-YEAR MARK ──────────────────────────────────────────────────

  {
    id: 'ft50_divorce_5yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('divorced') &&
      G.mem?.divorcedYear &&
      G.currentYear - G.mem.divorcedYear >= 5 &&
      G.currentYear - G.mem.divorcedYear <= 7 &&
      !G.mem?.ft50Divorce5yr,
    text: pick([
      `Five years since the divorce. The specific texture of it — the particular arguments, the specific silences, the way certain ordinary moments felt in the last year of it — has faded into a general shape: a period when things were wrong in a specific way, followed by the period of adjustment, followed by now. The person you were married to occupies less of your daily thought than they did at two years. The question of whether the marriage was a failure or a completed thing depends on the day.`,
      `Five years. The marriage is far enough back that the children, if there are children, have adjusted to whatever arrangement came out of it. The life that emerged from the ending is the life you have now, with its own texture — different from the life inside the marriage and from the life you had before it. The comparison is not always useful but it arrives anyway.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('ft50Divorce5yr', true) },
  },

  // ── DIVORCE: 10-YEAR MARK ─────────────────────────────────────────────────

  {
    id: 'ft50_divorce_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('divorced') &&
      G.mem?.divorcedYear &&
      G.currentYear - G.mem.divorcedYear >= 10 &&
      G.currentYear - G.mem.divorcedYear <= 13 &&
      !G.mem?.ft50Divorce10yr,
    text: pick([
      `Ten years since the divorce. The marriage is now a section of the autobiography that has receded far enough to have edges — you can see where it started and where it ended and what came before and after. The person you were married to is someone you were once married to, which is a different relationship from any other. The decade has not resolved the question of what it meant. It has simply moved the question into a different room.`,
      `A decade out. The things you know now that you did not know at the time: some of them you know because of what came after, some because of what the distance allows. The marriage shaped the decade after it in specific ways — the particular shape of the life you built in its absence. The building was not primarily about the marriage, but the marriage was the condition it happened in.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('ft50Divorce10yr', true) },
  },

  // ── WIDOWHOOD: 3-YEAR MARK ────────────────────────────────────────────────

  {
    id: 'ft50_widowed_3yr',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('widowed') || G.flags.has('lost_partner')) &&
      G.mem?.widowedYear &&
      G.currentYear - G.mem.widowedYear >= 3 &&
      G.currentYear - G.mem.widowedYear <= 5 &&
      !G.mem?.ft50Widowed3yr,
    text: pick([
      `Three years. The grief counsellors say the first year, then the second, and then — they don't quite say what happens after that. What happens is: the grief does not end but it changes character. It becomes less the constant presence and more the thing that arrives in specific moments with specific triggers. A smell. A piece of music. The specific way the light falls at a certain hour that used to be shared. Three years produces a life that includes the absence as a permanent feature rather than a recent wound.`,
      `Three years since the death. The house or the flat has adjusted to being a single person's house — the routines are yours only, the preferences uncompromised, the space arranged for one without being arranged for one. The adjustment is complete in practical terms. In other terms, less so. The practical adjustment and the other adjustment are not on the same timetable.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('ft50Widowed3yr', true) },
  },

  // ── WIDOWHOOD: 10-YEAR MARK ───────────────────────────────────────────────

  {
    id: 'ft50_widowed_10yr',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      (G.flags.has('widowed') || G.flags.has('lost_partner')) &&
      G.mem?.widowedYear &&
      G.currentYear - G.mem.widowedYear >= 10 &&
      G.currentYear - G.mem.widowedYear <= 13 &&
      !G.mem?.ft50Widowed10yr,
    text: pick([
      `Ten years. The person has been gone longer than some friendships last. The specific things you remember — the exact voice, the particular laugh, the way they slept — are still available, but you notice they require more effort to access than they did at two years. Memory is not an archive. It is a living thing that decays selectively, keeping the texture of a person while losing the precision. You have ten years of memories of the absence alongside the memories of the presence.`,
      `A decade. You have organized a life around the absence, which is different from a life organized around a presence. The life works. It has its own shape and its own pleasures and its own obligations. You are not defined by the loss, which is not the same as not having been shaped by it. The shaping happened. The life that came out of it is the life you have.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.m += 2; p.setMem('ft50Widowed10yr', true) },
  },

  // ── BUSINESS FAILURE: 5-YEAR MARK ────────────────────────────────────────

  {
    id: 'ft50_biz_fail_5yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('business_failed') &&
      G.mem?.business_failedYear &&
      G.currentYear - G.mem.business_failedYear >= 5 &&
      G.currentYear - G.mem.business_failedYear <= 7 &&
      !G.mem?.ft50BizFail5yr,
    text: pick([
      `Five years since the business failed. The specific cost of it — financial, relational, the particular damage to confidence — has mostly resolved into the background. You know what you know now that you didn't know then. The knowledge arrived expensively. At five years you are far enough from the failure to see it as one of the facts of your working life, rather than the defining event of a period. Whether you would try again is a question you have stopped answering definitively.`,
      `Five years. The business that failed is now a thing that happened in your working history, alongside the things that didn't fail. The proportion feels different at five years than it did at one. The lesson, if there is a lesson, has been integrated. You are not sure what the lesson is except in general terms: which things were in your control and which were not, approximately where the line was, approximately what you would do differently if the line were the same.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('ft50BizFail5yr', true) },
  },

  // ── CANCER SURVIVOR: 5-YEAR MARK (CLEAR) ─────────────────────────────────

  {
    id: 'ft50_cancer_5yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('cancer_survivor') &&
      G.mem?.cancer_survivorYear &&
      G.currentYear - G.mem.cancer_survivorYear >= 5 &&
      G.currentYear - G.mem.cancer_survivorYear <= 7 &&
      !G.mem?.ft50Cancer5yr,
    text: pick([
      `Five years. In oncology five years is the threshold — the point at which the recurrence risk drops enough that "survivor" is the correct term rather than "in remission." The threshold is statistical, which means it is true for a population and uncertain for a person. Five years is a specific relief and also a specific new relationship with uncertainty: the surveillance that was every three months becomes every year, and the every-year appointment is not nothing.`,
      `Five-year clear. The body that went through treatment is the body you still have, which was changed by the treatment in ways that didn't fully reverse. The hair came back. The energy mostly came back. The specific relationship with your body — the knowledge of what it is capable of producing without permission — is a permanent addition to the knowledge you have. You cannot unknow what you know about it. Some days this is useful. Some days it isn't.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 6; p.h += 2; p.karma += 3; p.setMem('ft50Cancer5yr', true) },
  },

  // ── CANCER SURVIVOR: 10-YEAR MARK ────────────────────────────────────────

  {
    id: 'ft50_cancer_10yr',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('cancer_survivor') &&
      G.mem?.cancer_survivorYear &&
      G.currentYear - G.mem.cancer_survivorYear >= 10 &&
      G.currentYear - G.mem.cancer_survivorYear <= 13 &&
      !G.mem?.ft50Cancer10yr,
    text: pick([
      `Ten years. A decade since the treatment ended. The appointments are annual now and each one passes and you leave and then a day later you stop carrying the specific weight of waiting for results. The cancer is in the history now, not the present. It is still in the history. The decade that followed it was lived in the knowledge of what the decade before it contained. That knowledge did not prevent the living. It changed the register of the living.`,
      `Ten years out. The people who were in treatment at the same time — the ones from the waiting room, the ones in the support group — some of them are here and some of them are not, and the particular arithmetic of that is not something you can stop noticing, even though you know the arithmetic is not about you. Ten years is the full distance of one completed chapter. You are in another chapter now. It does not start clean.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 4; p.r += 2; p.karma += 2; p.setMem('ft50Cancer10yr', true) },
  },

  // ── LOSS OF A CHILD: THE FIRST ORDINARY YEAR ─────────────────────────────

  {
    id: 'ft50_lost_child_first_year',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('lost_child') &&
      G.mem?.lost_childYear &&
      G.currentYear - G.mem.lost_childYear >= 1 &&
      G.currentYear - G.mem.lost_childYear <= 3 &&
      !G.mem?.ft50LostChild1yr,
    text: pick([
      `The first ordinary year. Not the first year — the first year was not ordinary, was nothing like ordinary — but the first year in which some weeks pass without the grief being the primary fact of every week. The grief is still there. It will always be there. What has changed is that other things are also there: meals, obligations, small pleasures that arrive without permission. The ordinary world has resumed itself around the specific permanent gap.`,
      `A year. You have been through all the dates now: the birthday that fell in the first year, the holidays, the anniversary of the death. You know what each of those dates costs. You are beginning to know which ordinary days cost the most unexpectedly — not the marked days, which you can prepare for, but the Tuesday afternoon in October when something ordinary becomes a reminder and the weight of the thing arrives without warning.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 4; p.setMem('ft50LostChild1yr', true) },
  },

  // ── BUSINESS FAILURE: 10-YEAR MARK ───────────────────────────────────────

  {
    id: 'ft50_biz_fail_10yr',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('business_failed') &&
      G.mem?.business_failedYear &&
      G.currentYear - G.mem.business_failedYear >= 10 &&
      G.currentYear - G.mem.business_failedYear <= 13 &&
      !G.mem?.ft50BizFail10yr,
    text: pick([
      `Ten years since the business closed. What it taught: a set of specific things about your own limits and a set of specific things about what is outside your control, and the decade's work of distinguishing between the two categories after the fact. You have applied what it taught in specific ways. You have also not applied it in ways you don't always recognise.`,
      `A decade since the failure. You have worked at things in the intervening decade and some of them have worked and some have not. The business that failed is in the category of things that did not work. The category is not empty. You have spent ten years not letting the category become your primary self-understanding. This has mostly worked, which is the kind of success that doesn't appear in any account of success.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('ft50BizFail10yr', true) },
  },

  // ── BOARDING SCHOOL: LOOKING BACK AT 40 ──────────────────────────────────

  {
    id: 'ft50_boarding_school_reckoning',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('boarding_school') &&
      G.mem?.boarding_schoolYear &&
      G.age >= 38 && G.age <= 50 &&
      !G.mem?.ft50BoardingReckoning,
    text: pick([
      `The boarding school years: you are old enough now to see what they did and didn't do. The independence they produced, which is real. The specific way they taught you to manage without the people who were supposed to manage it, which is both real and not entirely healthy in ways you are still locating. The friends made in the specific intimacy of that institution, who know a version of you that the people in your adult life have not seen. The gap between the version and the current one is the gap of three decades.`,
      `You were sent away at an age when you were not old enough to choose it. The sending had reasons: educational, financial, practical. You have sorted through the reasons for years. What you have reached is not resolution but a specific account: this is what the years away did, this is what it cost, this is what it gave, and the two lists don't cancel each other out.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('ft50BoardingReckoning', true) },
  },

  // ── FIRST LOVE OVER: TWENTY YEARS LATER ──────────────────────────────────

  {
    id: 'ft50_first_love_twenty',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('first_love_over') &&
      G.mem?.first_love_overYear &&
      G.currentYear - G.mem.first_love_overYear >= 18 &&
      G.currentYear - G.mem.first_love_overYear <= 25 &&
      G.age >= 35 &&
      !G.mem?.ft50FirstLoveTwenty,
    text: pick([
      `Twenty years since the first love ended. The person exists somewhere — you know this without knowing where — and is living a life you cannot imagine with any specificity because the twenty years you don't share have made them someone you never knew. The version you knew was complete at the time. It is also not who they are now. You know this and it doesn't help with the specific quality of the memory, which is complete and young and not updated.`,
      `Twenty years. The first love is in the category of things that were once very large and are now very specific: a precise set of memories from a precise window of time, without the updating that ordinary relationships receive. You carry a version of that person that is twenty years old, which means the person you carry is no longer the person who exists. You are the only person who still carries this version. They have moved on from it in the obvious sense, which is that they lived past it.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('ft50FirstLoveTwenty', true) },
  },

]

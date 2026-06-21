// BUILD 55 — Kurdish ethnicity events: Turkey, Syria, Iraq (diaspora), diaspora
// ~40M Kurds, the world's largest stateless nation.
// Turkey: language banned in schools/media until 1991. PKK conflict 1984–present.
// 3,000+ Kurdish villages burned/evacuated in SE Turkey 1990s.
// Syria: 120,000 Kurds stripped of citizenship 1962. Rojava 2012+.
// Anfal campaign Iraq 1988: 182,000 killed, chemical weapons at Halabja.

const IS_KURDISH_TR = (G) => G.character.ethnicity === 'kurdish' && G.character.country?.name === 'Turkey'
const IS_KURDISH_SY = (G) => G.character.ethnicity === 'kurdish_syria' && G.character.country?.name === 'Syria'
const IS_KURDISH_ANY = (G) => G.character.ethnicity === 'kurdish' || G.character.ethnicity === 'kurdish_syria' || G.character.ethnicity === 'kurdish_iraq'

export const KURDISH_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'kurd_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('kurd_identity_suppressed') && G.age >= 62 && !G.mem.kurdLateReckoning,
    text: 'Your grandchildren have been to a *newroz* celebration. They wore orange and red and danced. You could not have done that at their age — it would have been illegal. You watched them from a plastic chair at the edge of the park and did not know what you felt.',
    effect: (p) => { p.m += 5; p.setMem('kurdLateReckoning', true) },
  },

  {
    id: 'kurd_village_midlife_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('kurd_village_evacuated') && G.age >= 38 && !G.mem.kurdVillageEcho,
    text: 'The village is on the map. Google Maps shows a road leading to it. You look at the satellite image: the buildings are still there, or the foundations are. Some people have started going back. The government calls what happened a "security operation." You know what the burning smelled like.',
    effect: (p) => { p.m -= 6; p.setMem('kurdVillageEcho', true) },
  },

  {
    id: 'kurd_diaspora_question',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('kurd_europe_diaspora') && G.age >= 40 && !G.mem.kurdDiasporaQ,
    text: 'A cousin in Diyarbakır says it is different now. Phones have Kurdish apps. There is a Kurdish channel on the television. He says you should come back. You have been in Cologne for fifteen years. Your children speak German better than Turkish and Turkish better than Kurdish.',
    choices: [
      {
        text: 'Visit, at least.',
        tag: 'visited',
        outcome: 'You spend two weeks in the city you grew up in. It is and isn\'t what you left. You come back to Germany with something unresolved.',
        effect: (p) => { p.m += 5; p.setMem('kurdDiasporaQ', true) },
      },
      {
        text: 'Your life is here now.',
        tag: 'stayed',
        outcome: 'You tell him you\'ll visit soon. You mean it, for a while.',
        effect: (p) => { p.m -= 3; p.setMem('kurdDiasporaQ', true) },
      },
      {
        text: 'Go back.',
        tag: 'returned',
        outcome: 'Germany made you German in ways you didn\'t expect. Turkey feels like the country of a relative, not your own.',
        effect: (p) => { p.m -= 5; p.addFlag('kurd_returned_home'); p.setMem('kurdDiasporaQ', true) },
      },
    ],
  },

  // ── TURKEY ARC ───────────────────────────────────────────────────────────

  {
    id: 'kurd_tr_language_school',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_KURDISH_TR(G) && G.currentYear <= 1991 && G.age >= 6 && !G.flags.has('kurd_identity_suppressed'),
    text: 'The first day of school. The blackboard says things in a language you understand — your mother taught you, your grandmother sings in it — but here it does not exist. The teacher has written your name in its Turkish form. She corrects you when you use the other one.',
    effect: (p) => { p.m -= 10; p.addFlag('kurd_identity_suppressed'); p.addFlag('learned_silence') },
  },

  {
    id: 'kurd_tr_language_lifted',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KURDISH_TR(G) && G.currentYear >= 1991 && G.currentYear <= 2006 && G.flags.has('kurd_identity_suppressed') && !G.mem.kurdLangLifted,
    text: 'A radio station plays a Kurdish song in the afternoon. It is not illegal anymore — that changed last year, or two years ago — but it is the first time you have heard the language coming from a speaker in a public place. You are driving. You pull over.',
    effect: (p) => { p.m += 18; p.addFlag('kurd_language_moment'); p.setMem('kurdLangLifted', true) },
  },

  {
    id: 'kurd_tr_pkk_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KURDISH_TR(G) && G.currentYear >= 1984 && G.currentYear <= 2000 && G.age >= 16 && G.age <= 30 && !G.mem.kurdPKKQuestion,
    text: 'A friend from school joined last year. Or a cousin. Or someone asks if you would consider it. The question is not whether you believe in Kurdish rights — everyone you know believes in Kurdish rights. The question is whether you believe in this. There is no clean answer.',
    choices: [
      {
        text: 'Quiet sympathy, nothing more.',
        tag: 'sympathiser',
        outcome: 'You make a donation once, anonymously. That is the extent of it. You carry the question for years.',
        effect: (p) => { p.m -= 5; p.setMem('kurdPKKQuestion', true) },
      },
      {
        text: 'Active support.',
        tag: 'active',
        outcome: 'You carry messages, house someone for a week, attend meetings. The risk is real and you know it. The cause feels more real than the risk.',
        effect: (p) => { p.m += 5; p.addFlag('kurd_militant_adjacent'); p.setMem('kurdPKKQuestion', true) },
      },
      {
        text: 'Distance yourself publicly.',
        tag: 'distanced',
        outcome: 'You say, when asked, that violence is not the answer. You believe this and you also know it is the answer that keeps you safe.',
        effect: (p) => { p.karma -= 5; p.addFlag('pragmatic_compliance'); p.setMem('kurdPKKQuestion', true) },
      },
    ],
  },

  {
    id: 'kurd_tr_village_evacuation',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KURDISH_TR(G) && G.ruralUrban === 'rural' && G.currentYear >= 1990 && G.currentYear <= 1999 && !G.flags.has('kurd_village_evacuated'),
    text: 'The soldiers come with a list. Your village is on it. You have two hours. The house has been in the family for four generations. You can see, from the road out, that they are going to burn it — not to destroy it but to prevent return.',
    choices: [
      {
        text: 'Go. Take what you can carry.',
        tag: 'fled',
        outcome: 'You end up in Diyarbakır, then Istanbul, then possibly Germany. What you carried fits in two bags. What you left does not.',
        effect: (p) => { p.m -= 20; p.h -= 5; p.addFlag('kurd_village_evacuated'); p.addFlag('rural_to_urban') },
      },
      {
        text: 'Hide something in the cellar before leaving.',
        tag: 'hid_something',
        outcome: 'The deed to the land. Your grandfather\'s papers. A photograph. You\'ve thought for years about whether it\'s still there.',
        effect: (p) => { p.m -= 18; p.addFlag('kurd_village_evacuated'); p.setMem('kurdHidSomething', true) },
      },
    ],
  },

  {
    id: 'kurd_tr_eu_reforms',
    phase: 'midlife',
    weight: 2,
    when: (G) => IS_KURDISH_TR(G) && G.currentYear >= 2002 && G.currentYear <= 2010 && G.flags.has('kurd_identity_suppressed') && !G.mem.kurdEUReforms,
    text: 'EU accession negotiations have produced Kurdish-language television, Kurdish optional courses in some schools. The reforms are incomplete and contested. Your parents\' generation went to prison for less than what is now permitted. Your children\'s generation will inherit a Turkey that is not the Turkey you grew up in — though it is not clear yet what it is.',
    effect: (p) => { p.m += 8; p.addFlag('kurd_reform_era'); p.setMem('kurdEUReforms', true) },
  },

  // ── SYRIA ARC ────────────────────────────────────────────────────────────

  {
    id: 'kurd_sy_stateless',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_KURDISH_SY(G) && G.currentYear >= 1962 && G.currentYear <= 2011 && !G.flags.has('kurd_stateless'),
    text: 'You are Syrian and you are not Syrian. In 1962 a census stripped 120,000 Kurds of citizenship. Your family has been in this place for generations. Your ID card says *ajanib* — foreigner. You cannot own land. You cannot get a government job. You cannot leave the country without a special document that takes months.',
    effect: (p) => { p.m -= 15; p.e -= 3; p.addFlag('kurd_stateless'); p.addFlag('kurd_identity_suppressed') },
  },

  {
    id: 'kurd_sy_citizenship_restored',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KURDISH_SY(G) && G.flags.has('kurd_stateless') && G.currentYear >= 2011 && G.currentYear <= 2014 && !G.mem.kurdCitizenshipRestored,
    text: 'A presidential decree in April 2011 grants citizenship to the *ajanib*. It took forty-nine years. The decree arrives during the first weeks of the uprising and it is hard to know what to make of its timing. The document you receive has your name spelled correctly for the first time on an official paper.',
    effect: (p) => { p.m += 12; p.addFlag('kurd_citizenship_restored'); p.setMem('kurdCitizenshipRestored', true) },
  },

  {
    id: 'kurd_sy_rojava',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character.ethnicity === 'kurdish_syria' && G.currentYear >= 2012 && G.currentYear <= 2020 && !G.flags.has('rojava_generation'),
    text: 'Assad\'s forces withdrew from the northeast in 2012. The YPG moved in. Now there are schools teaching in Kurdish. A Kurdish administration issues documents. Courts operate in Kurdish law. For the first time in your memory, there is a piece of the world administered in your language by people who look like your family. You are not sure it will last.',
    choices: [
      {
        text: 'Participate — work with the administration.',
        tag: 'participated',
        outcome: 'You teach, or administer, or defend. The experiment is real and it is fragile and you are part of it.',
        effect: (p) => { p.m += 15; p.addFlag('rojava_generation'); p.addFlag('political_active') },
      },
      {
        text: 'Watch from a distance. You have seen too many things not last.',
        tag: 'watched',
        outcome: 'You do not trust it enough to stake your life on. You are not wrong to be cautious. You are also watching history from the edge.',
        effect: (p) => { p.m += 5; p.addFlag('rojava_generation') },
      },
    ],
  },

  // ── ANFAL / DIASPORA FLAGS ────────────────────────────────────────────────

  {
    id: 'kurd_anfal_diaspora_news',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_KURDISH_ANY(G) && G.currentYear >= 1988 && G.currentYear <= 1991 && G.flags.has('anfal_generation') && !G.mem.kurdAnfalDiaspora,
    text: 'The news from Halabja arrived through the community first, before any newspaper. A relative describes what the bodies looked like — the posture of people killed by nerve agent, which is different from the posture of people killed by other means. The word *genocide* is being used by some. The Iraqi government calls it a military operation.',
    effect: (p) => { p.m -= 15; p.h -= 3; p.addFlag('anfal_personal_loss'); p.setMem('kurdAnfalDiaspora', true) },
  },
]

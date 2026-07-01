// events_followthrough_71.js
// Follow-through events for Sri Lanka depth flags.

export const FOLLOWTHROUGH_71_EVENTS = [

  // ── ESTATE TAMIL GENERATION ───────────────────────────────────────────────

  {
    id: 'ft71_estate_tamil_worker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('slk_estate_tamil_generation') &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.ft71EstateWorker,
    text: 'The estate worker earns a daily wage set by the tripartite agreement between the government, the plantation companies, and the Ceylon Workers Congress. The CWC has held the estate Tamil vote for decades — Thondaman was in every cabinet from 1977 onwards regardless of which party won, which is the political arithmetic of a community that votes as a bloc and lives where it lives. The wage is below the minimum wage for other categories of worker. The estate provides the housing, which means leaving the estate means losing the house. The freedom of movement this creates is specific.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.setMem('ft71EstateWorker', true)
    },
  },

  {
    id: 'ft71_estate_tamil_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('slk_estate_tamil_generation') &&
      G.age >= 55 &&
      !G.mem?.ft71EstateLateLate,
    text: 'Three generations on the estate: your grandparents who came from Tamil Nadu under the British, your parents who lost citizenship in 1948 and got it back forty years later, yourself. The hills are the same hills. The tea is the same tea. The price per kilo that determines whether the estate operates or closes is set in London commodity markets. The estate that was going to close in 2003 did not close. The one in the next valley did. The workers there moved to Colombo. You know some of them now.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('ft71EstateLateLate', true)
    },
  },

  // ── MULLIVAIKKAL WITNESS ──────────────────────────────────────────────────

  {
    id: 'ft71_mullivaikkal_accountability',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('slk_mullivaikkal_witness') &&
      G.currentYear >= 2015 &&
      G.age >= 30 &&
      !G.mem?.ft71MullivaikkalAcct,
    text: 'The UN Human Rights Council resolution in 2015 established a hybrid accountability mechanism. The mechanism was not established. The government of Maithripala Sirisena, which campaigned on reconciliation, did not implement it. The resolution was co-sponsored by Sri Lanka and then not implemented by Sri Lanka. This is a particular form of diplomatic manoeuvre. Fifteen years after 2009, the number of dead is still a range — 40,000 to 70,000 to more — and no individual has been charged.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 2
      p.setMem('ft71MullivaikkalAcct', true)
    },
  },

  // ── COLOMBO CHECKPOINT GENERATION ────────────────────────────────────────

  {
    id: 'ft71_colombo_post_war',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('slk_colombo_checkpoint_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 30 &&
      !G.mem?.ft71ColomboPostWar,
    text: 'The checkpoints are gone after 2009. The road from Colombo 3 to the city centre is clear. This should feel like something has changed and it does feel like something has changed but not the thing you expected. The question of what the city is without the war has to be answered now. The restaurants are full. The hotels are new. The accountability process has not happened. There is a specific quality to prosperity that is built on an unexamined foundation.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft71ColomboPostWar', true)
    },
  },

]

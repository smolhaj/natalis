export const DISEASE_ARC_EVENTS = [
  // ── PART A: Cholera arc ───────────────────────────────────────────────────

  {
    id: 'da_cholera_season',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1850 && G.currentYear <= 1950 &&
      G.age >= 5 &&
      !G.mem?.choleraSeason,
    text: `The well. A doctor in London named John Snow proved the connection in 1854 — contaminated water, not bad air — but the knowledge travels slowly and the infrastructure to act on it travels more slowly still. This summer three families on your street lost someone. You know which wells to avoid. Knowing and being able to afford otherwise are different things.`,
    choices: [
      {
        text: 'Your family has access to cleaner water — a standpipe, a different well.',
        tag: 'better_water',
        outcome: `You are safer than most. The cholera finds other streets.`,
        effect: (p) => {
          p.h += 3;
          p.setMem('choleraSeason', true);
        },
      },
      {
        text: 'You use what is available. There is no other option.',
        tag: 'available_water',
        outcome: `The illness comes in August. You survive it, though not easily.`,
        effect: (p) => {
          p.h -= 12;
          p.m -= 8;
          p.addFlag('cholera_survivor');
          p.setMem('choleraSeason', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'da_cholera_epidemic',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      (G.flags.has('cholera_survivor') ||
        (['developing_urban', 'developing_unstable', 'subsaharan'].includes(G.character.country?.archetype) &&
          G.currentYear >= 1830 && G.currentYear <= 1900)) &&
      !G.mem?.choleraEpidemic,
    text: `It moves through the neighbourhood faster than news of it does. The symptoms are specific and terrible: the dehydration that comes in hours, not days. The particular blue-grey the skin turns. The rice-water stool the medical books describe. The doctors call it Asiatic cholera, from British textbooks; it has been in this place far longer than that name has. Your aunt dies on a Wednesday. By Saturday her neighbour is gone too. You watch this and understand that some years are not safe to be alive in.`,
    choices: [
      {
        text: 'You have already had it and survived. Your body has some immunity now.',
        tag: 'immunity',
        outcome: `You carry the dead to the cemetery. You do not fall sick again.`,
        effect: (p) => {
          p.m -= 15;
          p.r += 8;
          p.addFlag('cholera_generation');
          p.setMem('choleraEpidemic', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'da_cholera_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('cholera_survivor') &&
      G.age >= 50 &&
      !G.mem?.choleraLate,
    text: `The water comes from a tap now. This is new enough in your lifetime that you notice it — not as infrastructure, as a fact about water. A tap that does not kill you. The people who grew up with taps do not think about this. You think about it, briefly, most days.`,
    choices: null,
    effect: (p) => {
      p.m += 6;
      p.setMem('choleraLate', true);
    },
  },

  // ── PART B: TB post-Soviet arc ────────────────────────────────────────────

  {
    id: 'da_tb_russia_1990s',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Russia' &&
      G.currentYear >= 1990 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.tbRussia,
    text: `The cough starts in December. The clinic sees you quickly — the Soviet health system still functions in its skeleton even now. But the drug you need is not on the shelf. The shelf is empty because the supply chain that filled it has been privatised and privatisation has created a gap in which medicines exist theoretically but not physically. You are treated with what is available. What is available is not the correct treatment; it is what was there when the procurement stopped working.`,
    choices: null,
    effect: (p) => {
      p.h -= 18;
      p.mo -= 1500;
      p.addFlag('tb_survivor_russia');
      p.setMem('tbRussia', true);
    },
  },

  {
    id: 'da_tb_incomplete_treatment',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tb_survivor_russia') &&
      !G.mem?.tbMDR,
    text: `The course wasn't finished because the drugs ran out halfway through. This is how multi-drug resistant TB develops — not from wilfulness but from supply. The bacillus adapts to the drugs it survives. You are now resistant to the standard treatments. The new drugs exist; they are expensive, and the country is in the process of discovering that things can now be expensive in a way they could not be before. You wait for months on a list.`,
    choices: null,
    effect: (p) => {
      p.h -= 15;
      p.mo -= 3000;
      p.addFlag('mdr_tb_survivor');
      p.setMem('tbMDR', true);
    },
  },

  {
    id: 'da_tb_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      (G.flags.has('tb_survivor_russia') || G.flags.has('mdr_tb_survivor')) &&
      G.age >= 50 &&
      !G.mem?.tbLate,
    text: `The lung damage is permanent but stable. You have carried it for thirty years. It shows up on scans as a white patch the radiologist notes without comment. Every winter is a calculation: how cold, how long, how much the lungs will allow. You have become precise about cold.`,
    choices: null,
    effect: (p) => {
      p.h -= 3;
      p.m -= 4;
      p.setMem('tbLate', true);
    },
  },

  // ── PART C: 1997 Asian financial crisis ───────────────────────────────────

  {
    id: 'da_asian_crisis_savings',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      ['Thailand', 'Indonesia', 'South Korea', 'Malaysia'].includes(G.character.country?.name) &&
      G.currentYear >= 1997 && G.currentYear <= 1999 &&
      G.age >= 20 && G.age <= 50 &&
      !G.mem?.asianCrisis97,
    text: `The baht falls forty percent in a week. Or the rupiah. Or the won. It falls and keeps falling because the logic that held it up is the same logic that everyone is now revising simultaneously. The money your family has saved over the past fifteen years is in the bank. The bank is still there. The currency is worth half what it was last month. The savings are still there; they are worth half.`,
    choices: [
      {
        text: 'You had debt too. The crisis is compounding — the debt is worth more, the savings worth less.',
        tag: 'had_debt',
        outcome: `The calculation is specific and terrible. You know the number. You think about it at night.`,
        effect: (p) => {
          p.mo -= 8000;
          p.m -= 20;
          p.addFlag('asian_crisis_generation');
          p.setMem('asianCrisis97', true);
        },
      },
      {
        text: 'You were mostly cash, no significant debt. The loss is real but survivable.',
        tag: 'no_debt',
        outcome: `You lose half of what you saved. You do not lose everything. This distinction matters and also does not feel like enough.`,
        effect: (p) => {
          p.mo -= 3000;
          p.m -= 14;
          p.addFlag('asian_crisis_generation');
          p.setMem('asianCrisis97', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'da_asian_crisis_imf',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('asian_crisis_generation') &&
      !G.mem?.asianCrisisIMF,
    text: `The IMF package arrives with conditions attached. Interest rates raised. Budget cuts. Government enterprises to be privatised. The economists who designed it work in Washington and will return there. You are here. The specific condition that affects you most is the cut to the public sector where your brother works — the logic being that reducing government expenditure restores "confidence." The word confidence refers to something that is not your brother's salary.`,
    choices: null,
    effect: (p) => {
      p.mo -= 2000;
      p.m -= 12;
      p.r += 8;
      p.addFlag('imf_austerity_generation');
      p.setMem('asianCrisisIMF', true);
    },
  },

  {
    id: 'da_asian_crisis_recovery',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('asian_crisis_generation') &&
      G.age >= 30 && G.age <= 55 &&
      G.currentYear >= 2000 && G.currentYear <= 2010 &&
      !G.mem?.asianRecovery,
    text: `By 2000 the growth has returned. The economists describe the recovery as impressive, which it is, measured the way economists measure things. What you know is that something about the fifteen years before 1997 — the sense, specific and daily, that each year would be better than the last, that the future was already half-visible — did not come back with the numbers. The numbers are back. That other thing went somewhere else.`,
    choices: null,
    effect: (p) => {
      p.m += 6;
      p.w += 4;
      p.mo += 2000;
      p.setMem('asianRecovery', true);
    },
  },
];

export const SOUTH_SOUTH_EVENTS = [
  // ── PART A: Bangladeshis in Malaysia ─────────────────────────────────────

  {
    id: 'ss_bangladesh_malaysia_recruit',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'Bangladesh' &&
      G.currentYear >= 1990 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.ssBDMY,
    text: `The recruiter comes from Dhaka. The fee is four hundred thousand taka — more than two years' salary — borrowed at thirty percent interest from the moneylender. He shows photographs of Malaysia: modern buildings, air conditioning, wages in ringgit that convert to something real when you do the arithmetic. The contract is in English and Malay. You sign it. The two years of debt are a fact you will carry with you onto the plane.`,
    choices: null,
    effect: (p) => {
      p.mo -= 6000;
      p.addFlag('bangladesh_malaysia_migrant');
      p.setMem('ssBDMY', true);
    },
  },

  {
    id: 'ss_bangladesh_malaysia_arrival',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('bangladesh_malaysia_migrant') &&
      !G.mem?.ssBDMYArrival,
    text: `The dormitory is one room, twelve men. The wages are withheld for the first three months to "recover processing costs" — costs not mentioned in the contract you signed. Your passport is held by the employer for safekeeping. You understand what safekeeping means in this context. The word for this arrangement in international law is "forced labour." The word used here is "standard practice."`,
    choices: null,
    effect: (p) => {
      p.h -= 5;
      p.m -= 15;
      p.r += 10;
      p.setMem('ssBDMYArrival', true);
    },
  },

  {
    id: 'ss_bangladesh_malaysia_years',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bangladesh_malaysia_migrant') &&
      G.age >= 30 && G.age <= 45 &&
      !G.mem?.ssBDMYYears,
    text: `You have been in Johor Bahru for seven years. The debt is repaid. You send half your salary home each month — the house in Sylhet exists because of those transfers. Your children are growing up in a country where you do not live. You know them from phone calls and photographs. They know you the same way.`,
    choices: [
      {
        text: 'Stay. The money is too important to walk away from.',
        tag: 'stay',
        outcome: `You stay. The transfers continue. The children grow up in a house you built without being there to build it.`,
        effect: (p) => {
          p.m -= 10;
          p.mo += 3000;
          p.r += 12;
          p.setMem('ssBDMYYears', true);
        },
      },
      {
        text: 'Go back. The children are growing up without you.',
        tag: 'go_back',
        outcome: `You go back. The money you left behind is real. The years you reclaim are real too, but smaller than you expected.`,
        effect: (p) => {
          p.m += 8;
          p.mo -= 2000;
          p.addFlag('returned_migrant');
          p.setMem('ssBDMYYears', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ss_bangladesh_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('bangladesh_malaysia_migrant') &&
      G.age >= 55 &&
      !G.mem?.ssBDMYLate,
    text: `You have done the total. What you sent home over twenty years is a real number — it built the house, paid for two educations, kept your parents through the end of their lives. The years that built it are also real. You were not there for them. Both things are true and neither one cancels the other.`,
    choices: null,
    effect: (p) => {
      p.m += 6;
      p.r += 8;
      p.karma += 8;
      p.setMem('ssBDMYLate', true);
    },
  },

  // ── PART B: Zimbabweans in South Africa ───────────────────────────────────

  {
    id: 'ss_zim_sa_arrival',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country?.name === 'Zimbabwe' &&
      G.currentYear >= 2000 &&
      G.age >= 22 && G.age <= 40 &&
      !G.mem?.ssZimSA,
    text: `You have a degree. In Zimbabwe the degree is worth a salary the hyperinflation is dissolving in real time — by the time the cheque is cashed it is worth less than when it was signed. In Johannesburg you can earn in rand. You cross at Beitbridge with what fits in one bag. The work you find — domestic service, casual labour, a building site — is not what the degree prepared you for. A teacher becoming a domestic worker in Johannesburg is not a failure of the person. You say this to yourself with some regularity.`,
    choices: null,
    effect: (p) => {
      p.w -= 8;
      p.m -= 12;
      p.addFlag('zim_south_africa_migrant');
      p.addFlag('expat');
      p.setMem('ssZimSA', true);
    },
  },

  {
    id: 'ss_zim_sa_xenophobia',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.flags.has('zim_south_africa_migrant') &&
      G.currentYear >= 2008 && G.currentYear <= 2010 &&
      !G.mem?.ssZimXenophobia,
    text: `May 2008. The attacks begin in Alexandra township and spread through Johannesburg and then to other cities. The word used is makwerekwere — a sound-word, made to sound ridiculous, for foreign. Sixty-two people are killed in two weeks. You hide for four days with a South African woman from your church who does not ask what you owe her for this. The police eventually arrive in some areas. In others they do not.`,
    choices: [
      {
        text: 'Survive and stay. You have nowhere to go back to that is safer.',
        tag: 'stay',
        outcome: `You stay. You are still here. The attacks end. The underlying condition does not end.`,
        effect: (p) => {
          p.m -= 18;
          p.h -= 5;
          p.r += 10;
          p.addFlag('witnessed_xenophobia');
          p.addFlag('zim_south_africa_migrant');
          p.setMem('ssZimXenophobia', true);
        },
      },
      {
        text: 'Go back to Zimbabwe. The violence here is as bad as what you left.',
        tag: 'return',
        outcome: `You go back. What you return to is not the Zimbabwe you left; it is the one that remained while you were gone.`,
        effect: (p) => {
          p.m -= 15;
          p.addFlag('witnessed_xenophobia');
          p.addFlag('returned_migrant');
          p.setResidency('citizen');
          p.setMem('ssZimXenophobia', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ss_zim_sa_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('zim_south_africa_migrant') &&
      G.age >= 55 &&
      !G.mem?.ssZimLate,
    text: `You have been in South Africa for twenty years. You are not a citizen. The home you left is not the home you would return to — the people who made it home are gone or scattered. The position you occupy — between two places, claimed by neither in any official way — has a name in the language of international migration. The name does not describe the feeling accurately.`,
    choices: null,
    effect: (p) => {
      p.r += 8;
      p.m += 4;
      p.karma += 6;
      p.setMem('ssZimLate', true);
    },
  },

  // ── PART C: Ghanaians in Libya ────────────────────────────────────────────

  {
    id: 'ss_ghana_libya',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Ghana' &&
      G.currentYear >= 1995 && G.currentYear <= 2011 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.ssGhanaLibya,
    text: `Gaddafi's Libya pays in real money for construction labour. The journey through Niger is understood — the route, the cost, the risks — but understood in the way of someone who has not yet made it. What is not fully understood until arrival is the management system: an employer who has purchased your labour for a fee that you will now spend months working off. The sun in the Libyan desert in August is a physical argument that cannot be answered.`,
    choices: null,
    effect: (p) => {
      p.mo += 3000;
      p.h -= 8;
      p.m -= 10;
      p.addFlag('ghana_libya_migrant');
      p.setMem('ssGhanaLibya', true);
    },
  },

  {
    id: 'ss_ghana_libya_2011',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('ghana_libya_migrant') &&
      G.currentYear >= 2011 && G.currentYear <= 2012 &&
      !G.mem?.ssGhanaLibya2011,
    text: `February 2011. The uprising begins in Benghazi and reaches Tripoli within days. Your employer has disappeared or is unreachable. The Ghanaian embassy in Tripoli is overwhelmed. The border with Tunisia is four hundred kilometres and the road is not safe — there are checkpoints where being foreign is a problem, and checkpoints where being alive is a problem. Getting home is now the only project.`,
    choices: null,
    effect: (p) => {
      p.h -= 12;
      p.m -= 20;
      p.mo -= 2000;
      p.addFlag('survived_conflict_evacuation');
      p.setMem('ssGhanaLibya2011', true);
    },
  },

  // ── PART D: Soviet gulag, late Stalin era ─────────────────────────────────

  {
    id: 'ss_gulag_arrest',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Russia' &&
      G.currentYear >= 1946 && G.currentYear <= 1953 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.ssGulag,
    text: `The knock is at two in the morning. Two men in civilian clothes. The charge, when it materialises, is Article 58 — anti-Soviet agitation. What you said was a joke about the grain quotas, told to someone you trusted. The sentence is ten years in the corrective labour camps. The sentence is also economic: the camps need workers and Article 58 has been providing them efficiently for twenty years.`,
    choices: null,
    effect: (p) => {
      p.h -= 15;
      p.m -= 25;
      p.addFlag('gulag_survivor');
      p.setMem('ssGulag', true);
    },
  },

  {
    id: 'ss_gulag_release',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('gulag_survivor') &&
      !G.mem?.ssGulagRelease,
    text: `March 1953. Stalin dies. The amnesty that follows is partial — not all categories, not all sentences — but you are in it. Released without transport, without money, without documents that permit residence in a major city. The 101-kilometre rule: you may not live within 101 kilometres of Moscow, Leningrad, or the city where you were arrested. You are free. The places where your life was are prohibited. You stand at the edge of this freedom and calculate what it contains.`,
    choices: null,
    effect: (p) => {
      p.m -= 15;
      p.r += 15;
      p.addFlag('post_gulag');
      p.setMem('ssGulagRelease', true);
    },
  },

  {
    id: 'ss_gulag_late_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gulag_survivor') &&
      G.age >= 60 &&
      !G.mem?.ssGulagLate,
    text: `It is not talked about. The specific silence around it is itself information — its shape, its weight, what it replaces in conversation. Your children know something happened; they don't know what. The not-knowing protects them in ways that no longer apply, and continues anyway from habit. You have chosen the silence too. You chose it for them and now cannot remember when you chose it for yourself.`,
    choices: null,
    effect: (p) => {
      p.r += 6;
      p.m += 4;
      p.karma += 5;
      p.setMem('ssGulagLate', true);
    },
  },

  // ── PART E: Apartheid prisons — pass law arrest ───────────────────────────

  {
    id: 'ss_apartheid_pass_arrest',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country?.name === 'South Africa' &&
      G.currentYear >= 1950 && G.currentYear <= 1990 &&
      G.age >= 16 && G.age <= 50 &&
      !G.mem?.ssApartheid,
    text: `The pass book. Every Black South African over sixteen is required to carry it at all times — required to have the correct endorsements for the correct location. The policeman who stops you on Eloff Street does not need a reason beyond your presence. He needs your pass. The endorsement is for a different district. Fourteen days in a holding facility, then deportation to the homeland — a place you may never have lived in, whose administration says it is yours.`,
    choices: null,
    effect: (p) => {
      p.h -= 5;
      p.m -= 20;
      p.addFlag('pass_law_survivor');
      p.addFlag('apartheid_generation');
      p.setMem('ssApartheid', true);
    },
  },

  {
    id: 'ss_apartheid_prison_echo',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('pass_law_survivor') &&
      G.age >= 55 &&
      !G.mem?.ssApartheid2,
    text: `1994. You vote for the first time. The queue is four hours long in the afternoon heat. Nobody leaves the queue. The old woman in front of you has walked two kilometres. The man behind you is younger than the pass law; he has never been arrested under it but his father was. Nobody leaves the queue.`,
    choices: null,
    effect: (p) => {
      p.m += 15;
      p.karma += 12;
      p.setMem('ssApartheid2', true);
    },
  },
];

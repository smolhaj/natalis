// events_decolonisation.js — BUILD 5
// Decolonisation era events: independence generation, first coups, structural
// adjustment, brain drain, mobile leapfrog. Fires for subsaharan and
// developing_urban archetypes primarily in Africa, with one India-specific event.

export const DECOLONISATION_EVENTS = [

  // ── INDEPENDENCE GENERATION ──────────────────────────────────────────────────

  {
    id: 'dc_independence_morning',
    phase: null,
    weight: 5,
    when: (G) =>
      !G.mem?.dcIndependenceMorning &&
      G.character.country.archetype === 'subsaharan' &&
      G.currentYear >= 1956 && G.currentYear <= 1970,
    text: (G) => {
      const country = G.character.country.name
      const wordMap = {
        'Ghana': 'freedom',
        'Nigeria': 'independence',
        'Kenya': 'uhuru',
        'Tanzania': 'uhuru',
        'Uganda': 'uhuru',
        'Senegal': 'indépendance',
        'Ivory Coast': 'indépendance',
        'Mali': 'indépendance',
        'Guinea': 'indépendance',
        'Cameroon': 'indépendance',
        'Congo': 'indépendance',
        'DRC': 'indépendance',
        'Algeria': 'istiqlal',
        'Morocco': 'istiqlal',
        'Tunisia': 'istiqlal',
      }
      const word = wordMap[country] || 'independence'
      return `The radio has been on since before dawn. People are in the streets — you can hear them before you can see them. The word keeps coming back: ${word}, ${word}. Men you have never seen cry are crying. Women who do not know each other are embracing. The flag going up is not the flag that was there yesterday. You are ${G.age} years old and you will remember exactly where you were standing.`
    },
    choices: [
      {
        text: 'Go out into the street — join the crowd',
        tag: null,
        outcome: 'You are inside the thing as it happens. You carry that inside it feeling for the rest of your life.',
        effect: (p) => { p.m += 14; p.s += 4; p.karma += 4; p.addFlag('independence_generation_self'); p.addFlag('independence_crowd'); p.setMem('dcIndependenceMorning', true) },
      },
      {
        text: 'Watch from where you are — take it in without joining',
        tag: null,
        outcome: 'You stay at the window. The scene is enormous and you want to hold it whole before you step inside it.',
        effect: (p) => { p.m += 8; p.e += 5; p.addFlag('independence_generation_self'); p.setMem('dcIndependenceMorning', true) },
      },
      {
        text: 'Turn off the radio and sit with what this might mean',
        tag: null,
        outcome: 'The silence after the radio is switched off is its own kind of answer. The question is not whether it happened. The question is what it is going to cost.',
        effect: (p) => { p.m += 4; p.e += 7; p.r += 3; p.addFlag('independence_generation_self'); p.addFlag('independence_cautious'); p.setMem('dcIndependenceMorning', true) },
      },
    ],
    effect: null,
  },

  // ── EDUCATION ────────────────────────────────────────────────────────────────

  {
    id: 'dc_new_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem?.dcNewSchool &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 14 &&
      G.stats.smarts >= 40,
    text: 'The school has been built since your parents were children — part of a promise the new government made that education would no longer be arranged for someone else\'s convenience. The building smells of concrete dust and fresh paint. Textbooks arrived last week from the capital; they are stacked at the front of the room and the teacher distributes them one at a time, as if each one is something to be careful with. The words in them are formal and new. The letters are still the same letters.',
    choices: [
      {
        text: 'Absorb it — the school is the way through',
        tag: null,
        outcome: 'You learn to love the room. It becomes the place where the future is most legible.',
        effect: (p) => { p.e += 8; p.m += 6; p.addFlag('new_school_era'); p.addFlag('education_believer'); p.setMem('dcNewSchool', true) },
      },
      {
        text: 'Be wary — one authority replaced another',
        tag: null,
        outcome: 'You attend every day and trust nothing entirely. The habit of reading everything twice serves you later.',
        effect: (p) => { p.e += 6; p.s += 3; p.addFlag('new_school_era'); p.addFlag('authoritarian_childhood'); p.setMem('dcNewSchool', true) },
      },
      {
        text: 'Carry something of the old way alongside the new',
        tag: null,
        outcome: 'The grandmother\'s stories and the teacher\'s lessons occupy the same morning. You become the kind of person who holds two things at once.',
        effect: (p) => { p.e += 5; p.m += 5; p.karma += 4; p.addFlag('new_school_era'); p.addFlag('bicultural_formation'); p.setMem('dcNewSchool', true) },
      },
    ],
    effect: null,
  },

  // ── POLITICAL RUPTURE ────────────────────────────────────────────────────────

  {
    id: 'dc_first_coup',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.dcFirstCoup &&
      G.character.country.archetype === 'subsaharan' &&
      G.currentYear >= 1965 && G.currentYear <= 1985,
    text: (G) => {
      const country = G.character.country.name
      const leaderHints = {
        'Ghana': 'Nkrumah',
        'Nigeria': 'the elected government',
        'Mali': 'Keïta',
        'Uganda': 'Obote',
        'DRC': 'Lumumba\'s successors',
      }
      const name = leaderHints[country] || 'the government'
      return `The radio plays military music without stopping — no announcements, no news, just the music that means the music is the announcement. When the statement finally comes it is read by a general you have not heard of before. The name that led ${country} to independence, or the government that came after, is gone. ${name} is gone. The general says it will be different now. The music starts again when he finishes.`
    },
    choices: [
      {
        text: 'Believe the new government when they say it will be better',
        tag: null,
        outcome: 'You want it to be true. For a while it is not obviously untrue. Then it becomes obvious.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('first_coup_witness'); p.setMem('dcFirstCoup', true) },
      },
      {
        text: 'Know that it will not be better — and say nothing',
        tag: null,
        outcome: 'The gap between what you know and what you say becomes the architecture of the years that follow.',
        effect: (p) => { p.e += 6; p.m -= 8; p.addFlag('first_coup_witness'); p.addFlag('learned_silence'); p.setMem('dcFirstCoup', true) },
      },
      {
        text: 'Refuse to engage with it — keep your head down',
        tag: null,
        outcome: 'The strategy works in the sense that nothing terrible happens to you. Something else is lost instead.',
        effect: (p) => { p.r += 7; p.addFlag('first_coup_witness'); p.addFlag('political_withdrawal'); p.setMem('dcFirstCoup', true) },
      },
    ],
    effect: null,
  },

  // ── IDEAS ────────────────────────────────────────────────────────────────────

  {
    id: 'dc_pan_africanism',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.dcPanAfricanism &&
      G.character.country.archetype === 'subsaharan' &&
      G.currentYear >= 1958 && G.currentYear <= 1972 &&
      G.age >= 16 && G.age <= 35,
    text: 'Someone gives you a pamphlet, or a speech crackles through the radio — Nkrumah at the All-African Peoples\' Conference, Lumumba at independence, the founding of the Organisation of African Unity in Addis Ababa in 1963. The idea is as simple as it is enormous: that the whole continent is one project. That the borders — drawn in Berlin by men who had never been here — are not the last word on what Africa is. For the first time you hear the word *pan-Africanism* used not as a description but as a plan.',
    choices: [
      {
        text: 'Believe in it — the continent united is the continent free',
        tag: null,
        outcome: 'The idea becomes an orientation. It shapes how you read everything that follows.',
        effect: (p) => { p.m += 8; p.e += 5; p.karma += 4; p.addFlag('pan_africanism_era'); p.addFlag('independence_generation_self'); p.setPolitical('left'); p.setMem('dcPanAfricanism', true) },
      },
      {
        text: 'Carry it skeptically — the idea is right, the politics are not',
        tag: null,
        outcome: 'You keep the idea and watch the institutions that claim to embody it with your arms folded.',
        effect: (p) => { p.e += 7; p.m += 3; p.addFlag('pan_africanism_era'); p.setMem('dcPanAfricanism', true) },
      },
      {
        text: 'Dismiss it — this is politics, not a plan',
        tag: null,
        outcome: 'You fold the pamphlet and put it in your pocket and forget about it. Years later you find it there.',
        effect: (p) => { p.e += 3; p.r += 3; p.setMem('dcPanAfricanism', true) },
      },
    ],
    effect: null,
  },

  // ── STRUCTURAL ADJUSTMENT ────────────────────────────────────────────────────

  {
    id: 'dc_structural_adjustment',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.dcStructuralAdjustment &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 1984 && G.currentYear <= 1998 &&
      G.age >= 25,
    text: 'The government has signed a paper in Washington. The details arrive incrementally: civil service salaries cut, fertilizer subsidies removed, state-owned companies sold off to buyers who must be from somewhere with foreign currency. The word "conditionality" enters daily speech. No one voted on the conditions. The argument is that there was no alternative. There are people who believe this and people who do not, and all of them are living through the same year.',
    choices: [
      {
        text: 'Find a way through — survival is the first politics',
        tag: null,
        outcome: 'You make the adjustments the situation requires. The word for this, later, is resilience. At the time it is just Tuesday.',
        effect: (p) => { p.m -= 6; p.w -= 4; p.s += 4; p.addFlag('structural_adjustment_lived'); p.setMem('dcStructuralAdjustment', true) },
      },
      {
        text: 'Apply for a civil service post that has survived the cuts',
        tag: null,
        outcome: 'The post exists but the salary, when it arrives, is worth less than it was last year.',
        effect: (p) => { p.m -= 4; p.w -= 2; p.addFlag('structural_adjustment_lived'); p.addFlag('public_sector_survivor'); p.setMem('dcStructuralAdjustment', true) },
      },
      {
        text: 'Watch the professionals around you begin to plan to leave',
        tag: null,
        outcome: 'You are part of the audience for a departure that has not yet happened. Some of them ask if you are going too.',
        effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('structural_adjustment_lived'); p.addFlag('brain_drain_era'); p.setMem('dcStructuralAdjustment', true) },
      },
    ],
    effect: null,
  },

  // ── THE CLINIC CLOSES ────────────────────────────────────────────────────────

  {
    id: 'dc_sap_clinic_closed',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.dcSapClinic &&
      G.flags.has('structural_adjustment_lived') &&
      G.character.country.archetype === 'subsaharan' &&
      G.currentYear >= 1985 && G.currentYear <= 1999,
    text: 'The clinic in your area has closed. Not because there was no need for it — the need has not changed — but because the government\'s agreement with the World Bank required it to stop subsidising primary care. A user fee has been introduced at the remaining facilities. The fee is small by the standards of the people who calculated it. It is not small by yours.',
    choices: [
      {
        text: 'Pay the fee — the family\'s health comes first',
        tag: null,
        outcome: 'You pay it. The month it falls in a bad week, you notice. The month it falls in a good week, you still notice.',
        effect: (p) => { p.mo -= 120; p.h -= 3; p.m -= 6; p.addFlag('user_fee_burden'); p.setMem('dcSapClinic', true) },
      },
      {
        text: 'Go to the traditional healer in the next village',
        tag: null,
        outcome: 'The healer knows things about the body that the clinic did not. Some of what she does works. Some does not.',
        effect: (p) => { p.h -= 5; p.m -= 4; p.s += 3; p.setMem('dcSapClinic', true) },
      },
      {
        text: 'Make the journey to the mission hospital two towns over',
        tag: null,
        outcome: 'The journey takes a day. The hospital charges less than the government facility. You do not ask why.',
        effect: (p) => { p.mo -= 60; p.h -= 2; p.m -= 3; p.addFlag('mission_hospital_reliant'); p.setMem('dcSapClinic', true) },
      },
    ],
    effect: null,
  },

  // ── BRAIN DRAIN ─────────────────────────────────────────────────────────────

  {
    id: 'dc_brain_drain_wave',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.dcBrainDrain &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 1985 && G.currentYear <= 2005 &&
      G.age >= 30,
    text: (G) => {
      const count = G.currentYear >= 1995 ? 'The fourth colleague' : 'The third colleague'
      return `${count} this year has left for abroad. The nurse who delivered half the babies in this district. The engineer who kept the water treatment plant running. The lecturer whose students used to argue in the corridor long after the session ended. They do not say they are not coming back. They say they will see. You can tell the difference.`
    },
    choices: [
      {
        text: 'Decide to stay and hold the line',
        tag: null,
        outcome: 'You stay. The line is thinner each year. You become expert at doing more with less, which is a skill and also a slow cost.',
        effect: (p) => { p.m -= 7; p.karma += 7; p.e += 3; p.addFlag('brain_drain_era'); p.addFlag('stayed_through_exodus'); p.setMem('dcBrainDrain', true) },
      },
      {
        text: 'Consider going yourself',
        tag: null,
        outcome: 'You begin to let yourself think about it — where you would go, what you would need, who you would tell last.',
        effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('brain_drain_era'); p.addFlag('considering_emigration'); p.setMem('dcBrainDrain', true) },
      },
      {
        text: 'Ask, out loud, why those who trained abroad don\'t return',
        tag: null,
        outcome: 'The question lands badly at the dinner table and truthfully in the silence after. Nobody has a good answer. The question is the point.',
        effect: (p) => { p.e += 5; p.s += 2; p.m -= 4; p.addFlag('brain_drain_era'); p.setMem('dcBrainDrain', true) },
      },
      {
        text: 'Begin making plans to leave',
        tag: null,
        outcome: 'The plans are careful and the departure, when it comes, is the most frightening thing you have done.',
        effect: (p) => { p.m -= 3; p.e += 5; p.addFlag('brain_drain_era'); p.addFlag('emigrated'); p.setMem('dcBrainDrain', true) },
      },
    ],
    effect: null,
  },

  // ── NEHRUVIAN MOMENT ─────────────────────────────────────────────────────────

  {
    id: 'dc_nehruvian_moment',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.dcNehru &&
      G.character.country.name === 'India' &&
      G.currentYear >= 1950 && G.currentYear <= 1964 &&
      G.age >= 15,
    text: 'Nehru calls the great dams the temples of modern India. You hear the phrase on the radio or read it in a newspaper at school, and something about it takes hold. This is the first generation that has a state that is its own — that builds things for the people who live here rather than for a treasury in London. The IITs are being founded. The public sector factories are going up. The sense is that history is being made by Indians, for India, right now. You are young enough to believe it completely.',
    choices: [
      {
        text: 'Believe in the project — the state is the instrument of the future',
        tag: null,
        outcome: 'The belief becomes a vocation. You go where the project needs you to go.',
        effect: (p) => { p.m += 9; p.e += 6; p.karma += 4; p.addFlag('nehruvian_generation'); p.addFlag('independence_generation_self'); p.setPolitical('left'); p.setMem('dcNehru', true) },
      },
      {
        text: 'Work within it — the project is imperfect and necessary',
        tag: null,
        outcome: 'You take the exam and get the posting and spend decades learning the gap between the plan and the place.',
        effect: (p) => { p.m += 5; p.e += 5; p.addFlag('nehruvian_generation'); p.setMem('dcNehru', true) },
      },
      {
        text: 'Watch from the outside — the state\'s vision is not everyone\'s vision',
        tag: null,
        outcome: 'The optimism of the newspapers does not reach the village the same way. You are from the village.',
        effect: (p) => { p.e += 6; p.r += 4; p.addFlag('nehruvian_generation'); p.addFlag('independence_cautious'); p.setMem('dcNehru', true) },
      },
    ],
    effect: null,
  },

  // ── POST-ADJUSTMENT GENERATION ───────────────────────────────────────────────

  {
    id: 'dc_imf_debt_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.dcDebtGen &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 1995 && G.currentYear <= 2010 &&
      G.age >= 22 && G.age <= 35 &&
      (G.flags.has('structural_adjustment_lived') || G.flags.has('brain_drain_era')),
    text: 'A colleague uses the phrase "the lost decade" at lunch. They mean the 1980s, or the 1990s, depending on the country — the adjustment years, the austerity years, the years the doctors and teachers left and the clinics closed and the schools were rebuilt smaller. You were a child during it. You grew up in its aftermath. The schools that were rebuilt smaller are the schools you went to. The decade was lost, and the decade was yours.',
    choices: [
      {
        text: 'Build in the gaps anyway — the work is still the work',
        tag: null,
        outcome: 'You learn to build around absences. The habit of improvisation becomes a kind of fluency.',
        effect: (p) => { p.m += 4; p.e += 5; p.karma += 5; p.addFlag('post_adjustment_generation'); p.addFlag('independent_maker'); p.setMem('dcDebtGen', true) },
      },
      {
        text: 'Find a path out — whatever it takes',
        tag: null,
        outcome: 'The path is narrow and you are clear-eyed about what you are leaving and what you are choosing.',
        effect: (p) => { p.m += 2; p.e += 6; p.addFlag('post_adjustment_generation'); p.addFlag('considering_emigration'); p.setMem('dcDebtGen', true) },
      },
      {
        text: 'Channel it into something — the anger is information',
        tag: null,
        outcome: 'You become the kind of person who asks questions at public meetings. The questions make people uncomfortable. That is the point.',
        effect: (p) => { p.s += 5; p.karma += 6; p.e += 4; p.addFlag('post_adjustment_generation'); p.setPolitical('left'); p.setMem('dcDebtGen', true) },
      },
    ],
    effect: null,
  },

  // ── MOBILE LEAPFROG ─────────────────────────────────────────────────────────

  {
    id: 'dc_mobile_phone_leapfrog',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.dcMobileLeap &&
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear >= 2002 && G.currentYear <= 2012 &&
      G.age >= 18,
    text: (G) => {
      const country = G.character.country.name
      const mobileMoneyCountries = ['Kenya', 'Tanzania', 'Uganda', 'Ghana', 'Nigeria', 'Ethiopia', 'Rwanda', 'Mozambique']
      const hasMPesa = mobileMoneyCountries.includes(country)
      if (hasMPesa) {
        return 'The country never had landlines for most people. Then suddenly everyone has a mobile phone — your mother in the village, your cousin at the market stall, the woman who collects water at the standpipe. You can send money to your mother through it. The transfer arrives in seconds. Mobile banking exists here before it exists in most of Europe. The phone is not a luxury. The phone is the infrastructure.'
      }
      return 'The country never had landlines for most people. Then suddenly everyone has a mobile phone — your mother in the village, your cousin at the market, people you have not spoken to in years because there was no way to reach them. The network is inconsistent and the signal drops in the valley south of town and none of this matters against the fact that it works at all. Something that was impossible last year is ordinary this year.'
    },
    choices: [
      {
        text: 'Embrace it completely — the phone changes what is possible',
        tag: null,
        outcome: 'You become the person in the family who explains it, then the person everyone calls when the explanation is needed again.',
        effect: (p) => { p.m += 7; p.e += 4; p.s += 4; p.addFlag('mobile_money_era'); p.addFlag('digital_leapfrog'); p.setMem('dcMobileLeap', true) },
      },
      {
        text: 'Find the thing it doesn\'t solve — the infrastructure it reveals as absent',
        tag: null,
        outcome: 'The phone works. The road to the clinic still doesn\'t. The phone told you that faster than before.',
        effect: (p) => { p.e += 6; p.m += 2; p.addFlag('digital_leapfrog'); p.setMem('dcMobileLeap', true) },
      },
      {
        text: 'Teach someone older how to use it',
        tag: null,
        outcome: 'Your grandmother makes her first call. She speaks into it the way she speaks into the air when she prays — carefully, as if the distance matters.',
        effect: (p) => { p.m += 9; p.karma += 6; p.s += 3; p.addFlag('mobile_money_era'); p.addFlag('digital_leapfrog'); p.setMem('dcMobileLeap', true) },
      },
    ],
    effect: null,
  },

]

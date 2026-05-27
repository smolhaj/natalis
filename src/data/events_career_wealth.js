// events_career_wealth.js
// Career late-arc events (P2.9): decade-in texture, protégé, defining moment.
// Wealth gap texture (P2.11): philanthropy, family approach, isolation, estate planning.
// Rural-to-urban migration arc (P2.12): first night in city, accommodation, network loss.

export const CAREER_WEALTH_EVENTS = [

  // ── CAREER LATE-ARC ──────────────────────────────────────────────────────────

  {
    id: 'career_senior_room',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.careerSeniorRoom &&
      G.career &&
      G.age >= 42 &&
      G.career.level >= 2,
    text: (G) => {
      const field = G.career?.field ?? 'work'
      const fieldMap = {
        medical: 'The meeting is about a patient you will never forget — a case the junior doctors are struggling with. The consultant who used to be the most senior person in the room is now you. The juniors look to you the way you once looked to someone else. You say the thing you would have wanted to hear then.',
        law: 'The other partners defer to you in the room without making a production of it. The client asks a technical question and everyone waits. You realize with no drama that you are the person who is supposed to know the answer, and that you do know the answer, and that arriving here took the specific accumulation of every year before this one.',
        education: 'The new teacher on the staff is asking you about a student. You recognize the student she\'s describing — not this specific child but the type, the pattern, the way the behaviour is covering something else. You have seen it enough times that you know what to say. The knowledge feels like something earned.',
        engineering: 'The site review flags a problem your eye catches before anyone else has finished reading the report. You know what it means and what it will cost and what the fix looks like because you have been here before in three different forms on three different projects.',
      }
      return fieldMap[field] ?? `You are in a meeting and you realize that you have become the most experienced person in the room. It happened incrementally, without ceremony. The weight of it is not unpleasant.`
    },
    choices: [
      {
        text: 'Mentor the next generation deliberately',
        tag: null,
        outcome: 'You find one person who reminds you of yourself at thirty and invest in them. They carry something forward you might not have named.',
        effect: (p) => { p.m += 10; p.karma += 10; p.s += 5; p.addFlag('mentor'); p.setMem('careerSeniorRoom', true) },
      },
      {
        text: 'Focus on the work itself — the best thing you can model is excellence',
        tag: null,
        outcome: 'The standard you set is observed without being asked to be. Some people absorb it.',
        effect: (p) => { p.m += 6; p.e += 5; p.setMem('careerSeniorRoom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'career_defining_case',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.careerDefiningCase &&
      G.career &&
      G.age >= 38 &&
      G.career.level >= 2,
    text: (G) => {
      const field = G.career?.field ?? 'work'
      if (field === 'medical') {
        return 'The case is documented in the hospital\'s training records now. You did not do anything famous — you recognized something fast, made the correct call, and the patient survived something that usually does not survive. The consultant who reviewed it said simply: good work. The words contain the weight of a career.'
      }
      if (field === 'law') {
        return 'The verdict comes back in your client\'s favour on a case everyone in the firm expected to lose. You found the argument in the case law at eleven PM on a Thursday and built the rest of it in two days. The partner calls it your case now. You keep the brief in a folder on your desk because you still don\'t quite believe it.'
      }
      if (field === 'engineering') {
        return 'The bridge has been open for three years. You drove across it recently for the first time as a civilian — not as the engineer who built it, just as someone using it. The thing about structural work at this scale is that if you did it right, nobody notices. You notice. You know what\'s holding it up.'
      }
      return 'There is a project that carries your name — not formally, but in the way that people in your field refer to it. The kind of work that takes everything you know and proves it was worth accumulating.'
    },
    choices: null,
    effect: (p) => { p.m += 16; p.r -= 10; p.addFlag('career_defining_work'); p.setMem('careerDefiningCase', true) },
  },

  {
    id: 'career_protege_payoff',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem.careerProtege &&
      G.flags.includes('mentor') &&
      G.age >= 55,
    text: 'The person you mentored sends you a message. They have taken a position you would have wanted at that age. The message is: I don\'t think I\'d have gotten here without you. You read it twice. You wrote to your own mentor years ago and said something similar. The chain is longer than either of you can see.',
    choices: null,
    effect: (p) => { p.m += 18; p.karma += 8; p.r -= 8; p.setMem('careerProtege', true) },
  },

  {
    id: 'career_twenty_year_reflection',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.careerTwentyYear &&
      G.career &&
      G.age >= 45 && G.age <= 55,
    text: (G) => {
      const field = G.career?.field ?? 'your field'
      return `Twenty years, roughly. You do the arithmetic: how many patients, cases, students, projects, clients, lines of code, publications, buildings, surgeries. The number is large enough that it stops being a number and becomes something else — a body of work that is more than the sum of the individual days it was built from. Whether it was the right choice remains, as always, impossible to fully answer.`
    },
    choices: [
      {
        text: 'It was the right work for you',
        tag: null,
        outcome: 'The assessment is honest. The life built around this work has the shape of something chosen.',
        effect: (p) => { p.m += 10; p.r -= 8; p.karma += 5; p.addFlag('career_fulfilled'); p.setMem('careerTwentyYear', true) },
      },
      {
        text: 'You are not sure — there is another version of this life',
        tag: null,
        outcome: 'The question will not resolve. You continue doing the work while carrying the question about whether it is the right work. Many people do.',
        effect: (p) => { p.m -= 5; p.r += 10; p.setMem('careerTwentyYear', true) },
      },
    ],
    effect: null,
  },

  // ── WEALTH GAP TEXTURE ────────────────────────────────────────────────────────

  {
    id: 'wealth_family_approach',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.wealthFamilyApproach &&
      G.money > 300000 &&
      G.age >= 35,
    text: (G) => {
      const hasSiblings = G.siblings && G.siblings.length > 0
      if (hasSiblings) {
        return 'Your sibling calls for a reason that is not fully the reason for the call. The actual reason arrives twenty minutes in, after the family news. They need forty thousand. They frame it as a loan. You have it. The question is not whether you have it — the question is what saying yes means for the relationship going forward, and what saying no means, and whether those are both worse than the problem they have now.'
      }
      return 'A cousin you have not spoken to in years finds your number. The call is warm, longer than it needs to be, and then arrives at the real point. You are aware that your relative wealth has been communicated through whatever network communicates such things in your family. The request is real and the need may be genuine. The weight of being the person with the resources is something nobody prepared you for.'
    },
    choices: [
      {
        text: 'Give it — the money is less important than the person',
        tag: null,
        outcome: 'You give it without conditions. The gratitude is real. You notice something shift in the relationship that may or may not improve it.',
        effect: (p) => { p.m += 5; p.mo -= 40000; p.karma += 12; p.addFlag('family_financial_support'); p.setMem('wealthFamilyApproach', true) },
      },
      {
        text: 'Loan it with clear terms — a gift changes the dynamic',
        tag: null,
        outcome: 'The repayment plan is agreed. About half of it comes back. You decide not to pursue the rest.',
        effect: (p) => { p.m -= 3; p.mo -= 20000; p.karma += 5; p.addFlag('family_financial_support'); p.setMem('wealthFamilyApproach', true) },
      },
      {
        text: 'Decline — you cannot become the family bank',
        tag: null,
        outcome: 'The call ends politely. The distance between you and your family has a new specific measurement.',
        effect: (p) => { p.m -= 10; p.r += 8; p.setMem('wealthFamilyApproach', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'wealth_philanthropy',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.wealthPhilanthropy &&
      G.money > 500000 &&
      G.age >= 40,
    text: 'You have more than you will spend. This is a fact that took a while to become real to you. A financial adviser introduces you to a giving vehicle — a donor-advised fund, a foundation, a specific endowment — and explains the mechanism. The question underneath the mechanism is: what do you actually believe the money should do.',
    choices: [
      {
        text: 'Give to causes in the community you came from',
        tag: null,
        outcome: 'The scholarship fund bears a name that means something to the people who receive it. You attend the first ceremony. It is not nothing.',
        effect: (p) => { p.m += 18; p.karma += 20; p.mo -= 100000; p.addFlag('philanthropist'); p.setMem('wealthPhilanthropy', true) },
      },
      {
        text: 'Give to the most effective causes regardless of personal connection',
        tag: null,
        outcome: 'The allocation goes to where the data points. The distance between you and the impact is real but so is the impact.',
        effect: (p) => { p.m += 12; p.karma += 15; p.mo -= 80000; p.addFlag('philanthropist'); p.setMem('wealthPhilanthropy', true) },
      },
      {
        text: 'Keep the money in the family — generational wealth was the goal',
        tag: null,
        outcome: 'The estate plan is updated. The children will have a different starting point than you had.',
        effect: (p) => { p.m += 5; p.w += 5; p.setMem('wealthPhilanthropy', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'wealth_isolation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.wealthIsolation &&
      G.money > 300000 &&
      G.age >= 40 &&
      G.friends && G.friends.length > 0,
    text: 'The friends from before have different lives now — not worse, just different. The restaurant you suggest is not somewhere they can casually afford. The holiday you describe is at a distance from theirs. The gap is not unfriendly but it is present and it does not close easily. Some friendships survive it by going unacknowledged. Some don\'t.',
    choices: [
      {
        text: 'Find ways to meet on neutral ground',
        tag: null,
        outcome: 'You adjust the suggestions. The adjustment is appreciated without being mentioned. The friendships survive.',
        effect: (p) => { p.m += 6; p.s += 5; p.updateFriendRel(0, 8); p.setMem('wealthIsolation', true) },
      },
      {
        text: 'Accept that the social world is reorganizing itself',
        tag: null,
        outcome: 'You drift toward people with similar economic lives. The new circle is comfortable and slightly flatter.',
        effect: (p) => { p.m -= 8; p.r += 8; p.s -= 3; p.setMem('wealthIsolation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'wealth_estate_planning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem.wealthEstatePlanning &&
      G.money > 300000 &&
      G.age >= 60,
    text: 'The solicitor spreads the papers. The will is technically straightforward — the assets, the beneficiaries, the specific bequests. The part that is not straightforward is the conversation it forces: which of your children gets the house, what happens if they disagree, what you believe about money and family and fairness and whether those beliefs are consistent with each other.',
    choices: [
      {
        text: 'Divide it equally and let them work out the rest',
        tag: null,
        outcome: 'The will is signed. The equity principle is stated. You feel the relief of a decision made.',
        effect: (p) => { p.m += 10; p.r -= 6; p.addFlag('estate_planned'); p.setMem('wealthEstatePlanning', true) },
      },
      {
        text: 'Give more to the children who need it more',
        tag: null,
        outcome: 'The allocation reflects who has what and who needs what. Whether your children will agree is a problem for later.',
        effect: (p) => { p.m += 5; p.karma += 8; p.r += 5; p.addFlag('estate_planned'); p.setMem('wealthEstatePlanning', true) },
      },
    ],
    effect: null,
  },

  // ── RURAL-TO-URBAN MIGRATION ARC ─────────────────────────────────────────────

  {
    id: 'rural_urban_arrival',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.ruralUrbanArrival &&
      G.ruralUrban === 'rural' &&
      !G.flags.includes('rural_to_urban') &&
      G.age >= 18 && G.age <= 28 &&
      ['developing_urban', 'subsaharan', 'developing_unstable'].includes(G.character.country.archetype),
    text: (G) => {
      const country = G.currentCountry?.name ?? G.character.country.name
      const cityMap = {
        'Nigeria': 'Lagos', 'Kenya': 'Nairobi', 'Ghana': 'Accra', 'Tanzania': 'Dar es Salaam',
        'Ethiopia': 'Addis Ababa', 'Senegal': 'Dakar', 'India': 'Mumbai', 'Bangladesh': 'Dhaka',
        'Pakistan': 'Karachi', 'Philippines': 'Manila', 'Indonesia': 'Jakarta', 'Brazil': 'São Paulo',
        'Mexico': 'Mexico City', 'Colombia': 'Bogotá',
      }
      const city = cityMap[country] ?? 'the city'
      return `${city} at night from the bus window is more light than you have ever seen in one place. You carry two bags. The address in your pocket is for a room in a building where your cousin's friend's cousin lives. The city is the size of the entire district you grew up in, and it is louder, and it does not stop, and for twenty minutes you sit very still on the bus seat and do not know where to begin.`
    },
    choices: [
      {
        text: 'Start at the address in your pocket — someone you know can explain the rest',
        tag: null,
        outcome: 'The cousin\'s contact is real and unexpectedly generous. You sleep on a floor but you are not alone in it.',
        effect: (p) => { p.m += 5; p.s += 4; p.addFlag('rural_to_urban'); p.setMem('ruralUrbanArrival', true) },
      },
      {
        text: 'Walk first — get the shape of the place before committing to any part of it',
        tag: null,
        outcome: 'You walk for three hours. You get lost. You find your way back. The city is enormous and navigable.',
        effect: (p) => { p.m += 2; p.e += 4; p.addFlag('rural_to_urban'); p.setMem('ruralUrbanArrival', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_urban_accommodation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.ruralUrbanAccommodation &&
      G.flags.includes('rural_to_urban') &&
      G.age >= 18 && G.age <= 30,
    text: 'The room you find is small and expensive for what it is. Five people share a kitchen and a single bathroom. The landlord does not ask for a reference. The room costs half of what the job at the printing warehouse pays. The room is also yours, which is a thing you are still learning the shape of: a door that closes, a key, a small unit of space that is not shared with a family.',
    choices: [
      {
        text: 'Make it habitable — a photograph, some order',
        tag: null,
        outcome: 'The room becomes a place you return to rather than a place you are temporarily in. The distinction matters.',
        effect: (p) => { p.m += 8; p.addFlag('first_own_room'); p.setMem('ruralUrbanAccommodation', true) },
      },
      {
        text: 'Save aggressively — get into somewhere better within a year',
        tag: null,
        outcome: 'You eat sparingly and spend nothing you do not need to spend. The year passes. You move somewhere that has a window.',
        effect: (p) => { p.m -= 5; p.mo += 3000; p.w += 3; p.addFlag('first_own_room'); p.setMem('ruralUrbanAccommodation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_urban_network_loss',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.ruralUrbanNetworkLoss &&
      G.flags.includes('rural_to_urban') &&
      G.age >= 20 && G.age <= 32,
    text: 'The village social network — the hundred small obligations and reliabilities, the person who will sit with your sick parent, the woman who sends food when there is a death, the elder who mediates a dispute — does not exist here. The city has its own networks but they require time to build, and in the meantime you are an individual in a way you have never been before. The freedom and the loneliness of this are exactly the same thing.',
    choices: [
      {
        text: 'Build connections in the city — join something, be present',
        tag: null,
        outcome: 'The connections are slower to form and differently shaped. After two years you have something that functions like a local network.',
        effect: (p) => { p.m += 5; p.s += 6; p.addFriend('city acquaintance', 55); p.setMem('ruralUrbanNetworkLoss', true) },
      },
      {
        text: 'Maintain the home ties — visit when you can, send money',
        tag: null,
        outcome: 'The village stays a real place. When things go wrong there, you are still part of it. When things go wrong here, you are more alone.',
        effect: (p) => { p.m -= 3; p.r += 5; p.karma += 6; p.mo -= 1500; p.addFlag('remittance_sender'); p.setMem('ruralUrbanNetworkLoss', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'rural_urban_family_crisis_pull',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.ruralUrbanFamilyCrisis &&
      G.flags.includes('rural_to_urban') &&
      G.age >= 22 && G.age <= 38,
    text: (G) => {
      const origin = G.character.country.name
      return `The message comes: something has happened at home. Your mother is ill, or the harvest failed, or there is a dispute over the land. The city job does not have compassionate leave. You have two weeks of savings. Going back means losing the room, maybe the job. Not going back means not going back.`
    },
    choices: [
      {
        text: 'Go — family first',
        tag: null,
        outcome: 'The crisis resolves with your presence. You return to the city late and without the job and have to start again. You do not regret going.',
        effect: (p) => { p.m += 5; p.karma += 15; p.mo -= 3000; p.addFlag('returned_for_family'); p.setMem('ruralUrbanFamilyCrisis', true) },
      },
      {
        text: 'Send money and stay — the income is the contribution you can make',
        tag: null,
        outcome: 'The money helps. The absence sits in you and in them differently. Neither of you says so directly.',
        effect: (p) => { p.m -= 8; p.r += 12; p.mo -= 2000; p.addFlag('remittance_sender'); p.setMem('ruralUrbanFamilyCrisis', true) },
      },
    ],
    effect: null,
  },

]

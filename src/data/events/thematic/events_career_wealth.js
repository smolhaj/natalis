// events_career_wealth.js
// Career late-arc events (P2.9): decade-in texture, protégé, defining moment.
// Wealth gap texture (P2.11): philanthropy, family approach, isolation, estate planning.
// Rural-to-urban migration arc (P2.12): first night in city, accommodation, network loss.

import { hasTech } from '../../technology.js'
import { PLACES } from '../../places.js'
import { COUNTRIES } from '../../countries.js'

// Where somebody from this village goes when they go to the city. Nigeria is
// several migrations, not one: the north to Kano, Borno to Maiduguri, the
// creeks to Port Harcourt, the rest to Lagos (and, once it was a city, from
// the Middle Belt to Abuja).
const ARRIVAL_ARCHS = ['developing_urban', 'subsaharan', 'developing_unstable']
const SCALE_ORDER = ['megacity', 'major_city', 'large_city', 'city', 'mid_city', 'town']
const topCity = (country) => {
  const here = PLACES.filter(pl => pl.country === country && pl.type === 'urban')
  return SCALE_ORDER.map(sc => here.find(pl => pl.scale === sc)).find(Boolean)?.id ?? null
}
const NG_DEST = { ng_rural_north: 'ng_kano', ng_rural_borno: 'ng_maiduguri', ng_delta: 'ng_port_harcourt',
  ng_rural_oyo: 'ng_lagos', ng_rural_east: 'ng_lagos' }
function arrivalDestination(G) {
  const country = G.currentCountry?.name ?? G.character.country.name
  if (country === 'Nigeria') {
    if (G.place?.id === 'ng_rural' && G.currentYear >= 1995) return 'ng_abuja'
    return NG_DEST[G.place?.id] ?? 'ng_lagos'
  }
  return topCity(country)
}
const ARRIVAL_DESTINATIONS = [...new Set([
  'ng_lagos', 'ng_kano', 'ng_maiduguri', 'ng_port_harcourt', 'ng_abuja',
  ...COUNTRIES.filter(c => ARRIVAL_ARCHS.includes(c.archetype) && c.name !== 'Nigeria').map(c => topCity(c.name)),
].filter(Boolean))]

function ruralUrbanArrival(destId) {
  const dest = PLACES.find(pl => pl.id === destId)
  return {
    id: destId === 'ng_lagos' ? 'rural_urban_arrival' : `rural_urban_arrival_${destId}`,
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.ruralUrbanArrival &&
      G.ruralUrban === 'rural' &&
      !G.flags.includes('rural_to_urban') &&
      G.age >= 18 && G.age <= 28 &&
      ARRIVAL_ARCHS.includes(G.currentCountry?.archetype ?? G.character.country.archetype) &&
      arrivalDestination(G) === destId,
    text: (G) => {
      const lit = hasTech(G.currentCountry ?? G.character.country, 'electricity', G.currentYear)
      return `${dest.name} at night from the bus window is ${lit ? 'more light than you have ever seen in one place' : 'lamps and cooking fires for longer than any road you have been on'}. You carry two bags. The address in your pocket is for a room in a building where your cousin's friend's cousin lives. The city is the size of the entire district you grew up in, and it is louder, and it does not stop, and for twenty minutes you sit very still on the bus seat and do not know where to begin.`
    },
    choices: [
      {
        text: 'Start at the address in your pocket — someone you know can explain the rest',
        tag: null,
        outcome: 'The cousin\'s contact is real and unexpectedly generous. You sleep on a floor but you are not alone in it.',
        effect: (p) => { p.m += 5; p.s += 4; p.addFlag('rural_to_urban'); p.setMem('ruralUrbanArrival', true); p.relocate(destId, 'informal') },
      },
      {
        text: 'Walk first — get the shape of the place before committing to any part of it',
        tag: null,
        outcome: 'You walk for three hours. You get lost. You find your way back. The city is enormous and navigable.',
        effect: (p) => { p.m += 2; p.e += 4; p.addFlag('rural_to_urban'); p.setMem('ruralUrbanArrival', true); p.relocate(destId, 'informal') },
      },
    ],
    effect: null,
  }
}

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
        law: 'The other partners defer to you in the room without making a production of it. The client asks a technical question and everyone waits. You realize with no drama that you are the person who is supposed to know the answer, and that you do know the answer, and that arriving here took the accumulation of every year before this one.',
        education: 'The new teacher on the staff is asking you about a student. You recognize the student she\'s describing — not this child but the type, the pattern, the way the behaviour is covering something else. You have seen it enough times that you know what to say. The knowledge feels like something earned.',
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
      // `medical` is not a field; doctors and nurses are `healthcare`, so they
      // all got the generic line — and so did a Foreman, told about "a project
      // that carries your name ... in your field".
      if (field === 'healthcare') {
        return 'The case is documented in the hospital\'s training records now. You did not do anything famous — you recognized something fast, made the correct call, and the patient survived something that usually does not survive. The consultant who reviewed it said simply: good work. The words contain the weight of a career.'
      }
      if (field === 'law') {
        return 'The verdict comes back in your client\'s favour on a case everyone in the firm expected to lose. You found the argument in the case law at eleven PM on a Thursday and built the rest of it in two days. The partner calls it your case now. You keep the brief in a folder on your desk because you still don\'t quite believe it.'
      }
      if (field === 'engineering') {
        return 'The bridge has been open for three years. You drove across it recently for the first time as a civilian — not as the engineer who built it, just as someone using it. The thing about structural work at this scale is that if you did it right, nobody notices. You notice. You know what\'s holding it up.'
      }
      if (['construction', 'electrician', 'plumber'].includes(field)) {
        return 'There is a building on the main road whose foundations you poured, and you point it out to whoever is in the car with you. Nobody else knows it is yours. You know which corner had to be done twice.'
      }
      if (field === 'manufacturing') {
        return 'There was a fault on the line that the engineers chased for a week, and you found it in an afternoon by the sound the press was making. The plant manager knows your name now, and says it when he walks the floor.'
      }
      if (field === 'agriculture') {
        return 'The year the rains came late, your field was the one that still yielded, because of what you did with the channels the spring before. Men walk over from the next villages to look at it, and you explain it more than once.'
      }
      if (field === 'transport' || field === 'aviation') {
        return 'Fifteen years on the same routes without an accident, and the company puts your photograph up on the wall by the clock. You look at it every morning when you sign in, and it still surprises you.'
      }
      if (field === 'education') {
        return 'A former student stops you in the market, grown, with children of their own, and tells you the thing you said to them at fourteen that they have never forgotten. You do not remember saying it. You go home and sit for a while.'
      }
      if (['casual', 'hospitality', 'trade'].includes(field)) {
        return 'There are people who come back because of you. They ask for you by name, and wait if you are busy, and the owner has noticed.'
      }
      return 'There is a piece of work the people you work with still call yours, though nobody wrote your name on it. It took everything you knew, and it held.'
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
    phase: null,
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
        outcome: 'You give it without conditions. You notice something shift in the relationship that may or may not improve it.',
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
    text: 'You have more than you will spend. This is a fact that took a while to become real to you. A financial adviser introduces you to a giving vehicle — a donor-advised fund, a foundation, an endowment — and explains the mechanism. The question underneath the mechanism is: what do you actually believe the money should do.',
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
    text: 'The solicitor spreads the papers. The will is technically straightforward — the assets, the beneficiaries, the bequests. The part that is not straightforward is the conversation it forces: which of your children gets the house, what happens if they disagree, what you believe about money and family and fairness and whether those beliefs are consistent with each other.',
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

  // Narrated a night bus into Lagos and left the character in the village,
  // so every later year read the village. One event per destination, because
  // an effect cannot see where the character is and has to be told.
  ...ARRIVAL_DESTINATIONS.map(ruralUrbanArrival),

  {
    id: 'rural_urban_accommodation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.ruralUrbanAccommodation &&
      G.flags.includes('rural_to_urban') &&
      G.age >= 18 && G.age <= 30,
    text: 'The room you find is small and expensive for what it is. Five people share a kitchen and a single bathroom. The landlord does not ask for a reference. The room costs half of what the job at the printing warehouse pays. The room is also yours, and you are still learning the shape of it: a door that closes, a key, a small unit of space that is not shared with a family.',
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
    text: 'The village social network — the hundred small obligations and reliabilities, the person who will sit with your sick parent, the woman who sends food when there is a death, the elder who mediates a dispute — does not exist here. The city has networks but they take time to build, and in the meantime you are an individual in a way you have never been before. The freedom and the loneliness of this are exactly the same thing.',
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
    phase: null,
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


  // ── THE THING YOU DIDN'T TAKE ─────────────────────────────────────────────────
  // Sets `turned_down_opportunity`, which returns at 35+ as a parallel life.

  {
    id: 'career_offer_declined',
    phase: null,
    weight: 3,
    when: (G) =>
      G.career &&
      G.age >= 24 && G.age <= 44 &&
      !G.flags.has('turned_down_opportunity') &&
      !G.mem?.careerOfferDeclined &&
      Math.random() < 0.10,
    text: (G) => {
      const anchor = G.partner ? 'your partner has just started something here' : 'your mother is not well and it is your turn'
      return `The offer is real and it is in another country. More money, a title, a department that does the work you said you wanted to do when you were twenty-two. It comes in the same month that ${anchor}. You have eleven days. You spend nine of them not deciding.`
    },
    choices: [
      {
        text: 'Turn it down. Stay.',
        tag: null,
        outcome: 'You write the email in four lines. They reply warmly within an hour, which somehow makes it worse. You go to work on Monday and the office looks exactly the same.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('turned_down_opportunity'); p.setMem('careerOfferDeclined', true) },
      },
      {
        text: 'Take it.',
        tag: null,
        outcome: 'You take it. The first six months are harder than anyone told you and you would still do it again.',
        effect: (p) => { p.mo += 12000; p.w += 6; p.m -= 3; p.addFlag('career_took_the_leap'); p.setMem('careerOfferDeclined', true) },
      },
    ],
    effect: null,
  },

  // ── ECHO: THE ONE YOU TOOK ────────────────────────────────────────────────────

  {
    id: 'career_took_leap_echo',
    phase: null,
    weight: 2,
    when: (G) => G.flags.has('career_took_the_leap') && G.age >= 42 && !G.mem?.careerLeapEcho,
    text: `You still describe it as the year you left, as though it were one decision rather than about forty. The first winter there was genuinely bad and you have stopped mentioning that part. What you have instead is a set of colleagues who knew you only after, and who would not recognise the person who spent nine days not deciding.`,
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.r -= 3; p.setMem('careerLeapEcho', true) },
  },
]

// events_letters.js
// Letters as a UI element (isLetter: true).
// Pre-2000 characters with active relationship flags occasionally receive a letter —
// indented block, italic, warm amber treatment — from a sibling abroad, a parent, an old friend.
// Same event system; different visual treatment via isLetter: true.
// Gateable by year range (pre-email era = before 1998).

export const LETTER_EVENTS = [

  {
    id: 'letter_sibling_abroad',
    phase: 'young_adult',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1998 &&
      G.siblings?.some(s => s.alive) &&
      G.flags.has('stayed_behind') &&
      !G.mem?.letterSiblingAbroad,
    text: (G) => {
      const sib = G.siblings?.find(s => s.alive)
      const name = sib?.name ?? 'your sibling'
      const year = G.currentYear
      if (year < 1970) {
        return `${name} writes from wherever they have ended up. The letter takes three weeks to arrive. The paper is thin — the good paper costs too much to send overseas. They describe the winter there, the language problem, the landlord, a small success at work. They ask about the family. They end with something that is not quite reassurance. You read it twice and then put it somewhere safe.`
      }
      if (year < 1985) {
        return `${name}'s letter arrives — postmarked eleven days ago. They write about the city they are in, which is exactly what they said it would be and also nothing like they expected. They ask you to tell their mother they are fine. The asking implies they have not written to their mother directly. You understand why. You will tell her.`
      }
      return `${name} has written. The letter is short — a page, back and front — but it contains the shape of their life there: a flat, a job, a person they mention once in passing. The gap between the handwriting you know and the life you cannot see is the specific distance of letters. You write back the same day.`
    },
    choices: null,
    effect: (p) => { p.setMem('letterSiblingAbroad', true) },
  },

  {
    id: 'letter_parent_to_child_abroad',
    phase: 'young_adult',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1998 &&
      G.flags.has('emigrated') &&
      (G.parents?.father?.alive || G.parents?.mother?.alive) &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem?.letterParentAbroad,
    text: (G) => {
      const father = G.parents?.father
      const mother = G.parents?.mother
      const writer = father?.alive ? father : mother
      const name = writer?.name ?? 'your parent'
      return `${name} has written. The handwriting is careful — more careful than the voice you know, which is the particular formality of letters. They describe the house, the garden if there is one, a neighbour's news. They say they are managing. The word 'managing' contains, in their usage, an entire domestic situation. They ask when you might visit. They do not ask this as a reproach. You receive it as one anyway. You write back immediately.`
    },
    choices: null,
    effect: (p) => { p.setMem('letterParentAbroad', true) },
  },

  {
    id: 'letter_old_friend',
    phase: 'midlife',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1998 &&
      G.friends?.some(f => f.alive) &&
      G.age >= 32 && G.age <= 50 &&
      !G.mem?.letterOldFriend,
    text: (G) => {
      const friend = G.friends?.find(f => f.alive)
      const name = friend?.name ?? 'an old friend'
      return `${name} has written out of the blue — or not quite out of the blue, because you have been thinking of them recently without acting on it, and the letter arrives as if they knew. They have moved, or started something, or are asking about you in a way that requires an honest answer. The letter is two pages. You carry it around for a day before you sit down to reply.`
    },
    choices: null,
    effect: (p) => { p.setMem('letterOldFriend', true) },
  },

  {
    id: 'letter_official_ominous',
    phase: 'young_adult',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1985 &&
      ['single_party_communist', 'single_party_authoritarian', 'military_dictatorship'].includes(G.regime) &&
      G.age >= 22 && G.age <= 45 &&
      !G.mem?.letterOfficial,
    text: 'An official letter. The envelope is a specific colour or has a specific seal — you know what it means before you open it. A summons, a notice, a requirement to report. The letter is bureaucratically polite. The politeness is the most frightening part. You read it three times. You put it in the drawer. You take it out again.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.setMem('letterOfficial', true) },
  },

  {
    id: 'letter_from_ofw_parent',
    phase: 'childhood',
    weight: 3,
    isLetter: true,
    when: (G) =>
      G.currentYear >= 1975 && G.currentYear < 1998 &&
      G.character.country?.name === 'Philippines' &&
      G.flags.has('ofw_family_member') &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.letterOFWParent,
    text: 'A letter from abroad — from the parent who is working there. The envelope has a foreign stamp. The handwriting is your parent\'s handwriting but careful, the way handwriting becomes careful when it knows it will be read slowly and kept. There is money inside — not much, carefully folded. The letter asks about school. You read the letter many times. You do not know what country looks like from that end.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 5; p.setMem('letterOFWParent', true) },
  },

  {
    id: 'letter_love_long_distance',
    phase: 'young_adult',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1995 &&
      G.partner &&
      G.flags.has('long_distance_relationship') &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.letterLoveLongDist,
    text: (G) => {
      const pname = G.partner?.name ?? 'them'
      return `${pname} has written. The letter is nine pages, which is unusual even for them, and the nine pages contain everything a phone call cannot — the exact quality of a specific evening, a thought that came at 3am and could not be spoken out loud, the texture of missing. You read it at the kitchen table and then at the window and then again in bed. You understand, reading it, what letters are for.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.r += 4; p.setMem('letterLoveLongDist', true) },
  },

  {
    id: 'letter_from_gulag',
    phase: 'young_adult',
    weight: 3,
    isLetter: true,
    when: (G) =>
      G.currentYear >= 1946 && G.currentYear < 1965 &&
      (G.character.country?.name === 'Russia' || G.character.country?.name === 'Ukraine' || G.character.country?.name === 'Belarus') &&
      (G.flags.has('gulag_family') || G.flags.has('family_arrested')) &&
      G.age >= 16 &&
      !G.mem?.letterGulag,
    text: 'A letter arrives — or rather, a portion of a letter, the rest removed by the censor. What remains is ordinary language: the weather, health, a request for warm socks. The ordinary language, in this context, contains everything that cannot be said. You read what remains several times. You learn to read the spaces where the censor\'s scissors went.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 12; p.e += 3; p.setMem('letterGulag', true) },
  },

  {
    id: 'letter_childbirth_announcement',
    phase: 'midlife',
    weight: 2,
    isLetter: true,
    when: (G) =>
      G.currentYear < 1995 &&
      G.children?.length > 0 &&
      (G.parents?.father?.alive || G.parents?.mother?.alive) &&
      G.age >= 28 && G.age <= 42 &&
      !G.mem?.letterBirth,
    text: (G) => {
      const child = G.children?.[0]
      const cname = child?.name ?? 'the baby'
      return `You write to tell them about ${cname}. The letter takes time to compose — more time than you expected. You want to convey something about what it feels like but the words available for this are inadequate, so you write the facts instead: the date, the weight, the name and its meaning. You close with something about everyone being well. Their reply, when it comes, will say the same things back in different words. Both letters will be kept.`
    },
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('letterBirth', true) },
  },

]

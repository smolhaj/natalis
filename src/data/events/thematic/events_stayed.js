// events_stayed.js
// BUILD 23 — The Diaspora Who Didn't Leave
// The specific experience of staying in a country being emptied by emigration.
// Not passive — a weight. The relationships with those who went, the country mid-exodus,
// the question of whether the choice was right.

// Countries and eras when significant emigration waves made staying a notable choice:
function isExodusEra(G) {
  const cn = G.character.country.name
  const yr = G.currentYear
  return (
    (cn === 'Ireland' && yr >= 1979 && yr <= 1993) ||
    (cn === 'Zimbabwe' && yr >= 2001 && yr <= 2013) ||
    (cn === 'Lebanon' && yr >= 2019) ||
    (cn === 'Poland' && yr >= 1981 && yr <= 2004) ||
    (cn === 'Romania' && yr >= 1990 && yr <= 2015) ||
    (cn === 'Greece' && yr >= 2010 && yr <= 2018) ||
    (cn === 'Ghana' && yr >= 1980 && yr <= 2005) ||
    (cn === 'Ethiopia' && yr >= 1985 && yr <= 2005) ||
    (cn === 'Nigeria' && yr >= 1985 && yr <= 2005) ||
    (cn === 'Ukraine' && yr >= 1991 && yr <= 2010)
  )
}

export const STAYED_EVENTS = [

  // ── THE DECISION TO STAY ──────────────────────────────────────────────────────

  {
    id: 'sta_watching_leave',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isExodusEra(G) &&
      G.age >= 18 && G.age <= 30 &&
      !G.flags.includes('emigrated') &&
      !G.mem?.staWatchingLeave,
    text: (G) => {
      const cn = G.character.country.name
      const yr = G.currentYear
      if (cn === 'Ireland') {
        return 'Half the people from your school have gone to London or Boston or Sydney. The list grows every summer. The conversation at home has two positions: those who are planning to go and those who cannot say why they are staying. You cannot say why you are staying. You are staying anyway.'
      }
      if (cn === 'Zimbabwe') {
        return `${yr >= 2005 ? 'The inflation makes the calculation impossible' : 'The farms are going; the city is filling with people who left elsewhere'}. Your cousin is in Johannesburg. Your secondary school friend is in London. The ones who are still here know they are the ones who are still here. You don't know yet if this is stubbornness or something more considered.`
      }
      if (cn === 'Lebanon') {
        return 'Since the collapse, since the explosion, the ones with passports have been leaving — every month the WhatsApp group announces another departure, another city in France or Canada or Germany. You have watched the airport arrivals screen without going through the door. You are still here. You are not entirely sure what you are still here for.'
      }
      if (cn === 'Poland' || cn === 'Romania' || cn === 'Ukraine') {
        return 'The people who could leave are leaving. The doctors and the engineers and the young people who speak languages. The country is sorting itself — those who are going and those who are watching them go. You are watching. You do not know yet if this is a choice or a postponement.'
      }
      return `The people with options are exercising them. Every few months another departure, another family abroad, another gap in the social fabric that does not close. You have stayed. The question of why is less clear than you expected it to be.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 3
      p.addFlag('stayed_behind')
      p.setMem('staWatchingLeave', true)
    },
  },

  // ── THE ATMOSPHERE OF DEPARTURE ───────────────────────────────────────────────

  {
    id: 'sta_country_empties',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('stayed_behind') &&
      G.age >= 33 &&
      !G.mem?.staCountryEmpties,
    text: (G) => {
      const cn = G.character.country.name
      if (cn === 'Ireland') {
        return 'The people who stayed had the country to themselves for a while — cheaper rents, less competition, a particular closeness among those who were still there. Then the Tiger arrived and filled it back up with returnees who had made enough elsewhere. The years of staying feel, in retrospect, like a different country entirely.'
      }
      if (cn === 'Zimbabwe') {
        return 'The professionals left first — the doctors, the teachers, the engineers. Their posts were not filled. The hospitals ran on nurses doing the work of doctors; the schools ran on unqualified teachers. You watch what is left when the ones who could leave have left. You are part of what is left.'
      }
      return `The city changed as the people who left did not come back. The cafes where your friends met are different cafes now, serving different people. The houses are cheaper or the houses are empty or the houses have been bought by people from the capital. The ${cn} you grew up in is not exactly what it is now. You stayed anyway.`
    },
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 3
      p.setMem('staCountryEmpties', true)
      p.addFlag('witness_to_exodus')
    },
  },

  // ── THE SIBLING WHO WENT ──────────────────────────────────────────────────────

  {
    id: 'sta_sibling_visits',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('stayed_behind') &&
      G.siblings?.length > 0 &&
      G.age >= 38 &&
      !G.mem?.staSiblingVisit,
    text: (G) => {
      const sib = G.siblings?.[0]
      return `${sib?.name ?? 'Your sibling'} visits from wherever they went. The comparison happens even when you agree not to make it: their salary, your house; their city, your city; what they gave up and what you gave up. You are both defensive in different directions. The visit is good and the visit costs something.`
    },
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 6
      p.setMem('staSiblingVisit', true)
    },
  },

  // ── STILL RECEIVING THEIR CALLS ───────────────────────────────────────────────

  {
    id: 'sta_still_connected',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('stayed_behind') &&
      G.age >= 60 &&
      !G.mem?.staStillConnected,
    text: 'The ones who left are in different cities and different countries and different versions of the lives they went to build. You are still here. The calls come from abroad and you answer them with news of the place they left. You are, for some of them, the connection to a country they feel about in a way they cannot quite name from the distance. This is not a small thing to be.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.s += 3
      p.karma += 4
      p.setMem('staStillConnected', true)
    },
  },

  // ── THE LATE RECKONING ────────────────────────────────────────────────────────

  {
    id: 'sta_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('stayed_behind') &&
      G.age >= 65 &&
      !G.mem?.staReckoning,
    text: (G) => {
      const cn = G.character.country.name
      if (['Ireland', 'Poland', 'Romania'].includes(cn)) {
        return 'The ones who went built lives elsewhere and some of them came back and some of them didn\'t. The country is different now — not the country they left, not entirely what it was when you stayed. You are in it still. Whether this was the right choice is a question that stopped being useful somewhere around the age of fifty. You are here. That is the choice you made.'
      }
      return 'You stayed. You watched others leave and you stayed. The country did what it did — better in some decades, worse in others — and you were here for all of it. The question of whether the people who left had the better of it is unanswerable now and probably always was. You have what you stayed for. Whether it is what you thought you were staying for is a different question.'
    },
    choices: null,
    effect: (p) => {
      p.m += 7
      p.karma += 5
      p.setMem('staReckoning', true)
      p.addFlag('chose_to_stay')
    },
  },

]

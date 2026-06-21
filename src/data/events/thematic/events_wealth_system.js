// events_wealth_system.js
// Culturally authentic wealth mechanics events:
// banking access, gold/jewelry, household contributions, ROSCA, hyperinflation,
// joint family dissolution, marriage wealth transfers, gender financial restrictions,
// farming debt cycle, mobile money, patron emergence, poverty trap surfacing.

export const WEALTH_SYSTEM_EVENTS = [

  // ── Banking access ───────────────────────────────────────────────────────────

  {
    id: 'ws_first_bank_account',
    phase: 'young_adult',
    weight: 3,
    when: (G) => !G.banked && G.age >= 18 && G.stats.wealth >= 20 &&
      !['conflict_zone'].includes(G.character?.country?.archetype),
    text: 'A colleague at work tells you about opening an account at the local bank. You have been keeping your money at home — in the tin under the bed, the envelope in the cupboard. You go in with your identity papers and wait on a plastic chair.',
    choices: [
      {
        text: 'Open an account',
        tag: null,
        outcome: 'The teller stamps the form. You walk out with a passbook and the faint sense that something has changed.',
        effect: (p) => { p.setBanked(true); p.m += 5; p.e += 2; p.addFlag('banked_first_time'); p.setMem('bankAccountYear', p._state.currentYear) },
      },
      {
        text: 'Keep your money where you can see it',
        tag: null,
        outcome: 'The bank requires more documents than you have ready. You leave.',
        effect: (p) => { p.m -= 1 },
      },
    ],
    effect: null,
  },

  {
    id: 'ws_unbanked_robbery',
    phase: null,
    weight: 2,
    when: (G) => !G.banked && G.money > 80 && G.age >= 16 &&
      ['subsaharan', 'developing_unstable', 'conflict_zone'].includes(G.character?.country?.archetype),
    text: 'You keep your savings at home. You have been careful — different hiding places, never telling anyone the total. This time someone found it.',
    choices: [
      {
        text: 'Report it to police',
        tag: null,
        outcome: 'The officer writes your name in a ledger. Nothing else happens.',
        effect: (p) => { p.wipeMoney(0.6); p.m -= 12; p.h -= 3; p.addFlag('savings_stolen') },
      },
      {
        text: 'Say nothing, start again',
        tag: null,
        outcome: 'You do not tell anyone. You start putting aside what you can. It will take years.',
        effect: (p) => { p.wipeMoney(0.6); p.m -= 15; p.addFlag('savings_stolen') },
      },
    ],
    effect: null,
  },

  // ── Gold / jewelry ──────────────────────────────────────────────────────────

  {
    id: 'ws_gold_grandmother',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character?.gender === 'female' && G.age >= 18 && G.age <= 30 &&
      !G.mem?.goldInherited &&
      ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Turkey',
       'Egypt', 'Morocco', 'Iran', 'Ghana', 'Nigeria', 'Ethiopia',
       'Vietnam', 'Indonesia', 'South Korea'].includes(G.character?.country?.name),
    text: (G) => {
      const arch = G.character?.country?.archetype
      if (arch === 'subsaharan') return 'Your grandmother calls you to her room before the family gathering. She opens a cloth bundle — gold rings, a chain, small solid things accumulated over a lifetime of work. She selects several and places them in your palm. "This is yours," she says. "Not the family\'s. Yours."'
      return 'At the gathering your mother brings out the jewellery box — your grandmother\'s, passed down. Gold bangles, a necklace, earrings that have seen three generations. Your share is counted out in the old way, by weight and memory.'
    },
    choices: [
      {
        text: 'Receive it with gratitude',
        tag: null,
        outcome: 'You take your share. Gold holds what paper cannot.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const amount = Math.round(800 * mult * (0.8 + Math.random() * 0.4))
          p.addGold(amount); p.m += 8; p.setMem('goldInherited', true); p.addFlag('gold_inherited')
        },
      },
      {
        text: 'Sell it immediately — you need cash',
        tag: null,
        outcome: 'You convert it to money the same week. The amount is useful. Something is lost that is harder to name.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const amount = Math.round(800 * mult * 0.9)
          p.mo += amount; p.m += 3; p.r += 4; p.setMem('goldInherited', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ws_gold_emergency_sale',
    phase: null,
    weight: 2,
    when: (G) => (G.gold ?? 0) > 0 && G.money < 100 && G.age >= 18,
    text: 'You have almost nothing left in cash. The gold has been sitting — waiting for the right time, not for this. But the rent is due and there is nothing else.',
    choices: [
      {
        text: 'Sell the gold',
        tag: null,
        outcome: 'You get most of its value. The emergency passes. The gold is gone.',
        effect: (p) => {
          const goldValue = p._state.gold ?? 0
          const received = Math.round(goldValue * 0.9)
          p.addGold(-goldValue); p.mo += received; p.m -= 5; p.addFlag('sold_gold_emergency')
        },
      },
      {
        text: 'Find another way — borrow, work extra, sell something else',
        tag: null,
        outcome: 'You find a way without touching the gold. It costs you more in stress than the emergency cost in money.',
        effect: (p) => { p.h -= 4; p.m -= 8 },
      },
    ],
    effect: null,
  },

  // ── Hyperinflation ──────────────────────────────────────────────────────────

  {
    id: 'ws_hyperinflation_conversion',
    phase: null,
    weight: 4,
    when: (G) => G.flags.includes('hyperinflation_experienced') && !G.flags.includes('converted_hard_currency') &&
      G.money > 200 && G.age >= 18,
    text: 'The prices have been doubling every few weeks. Bread, cooking oil, transport. Your salary arrives and by Friday it buys less than it did on Monday. A neighbour mentions a man who changes money — dollars, euros, rand. Real currency. The rate is not good, but the alternative is watching everything you have dissolve.',
    choices: [
      {
        text: 'Convert half your cash to hard currency',
        tag: 'prudent',
        outcome: 'You hand over the local notes and receive crisp foreign bills. You fold them into the lining of your coat. They stay there.',
        effect: (p) => {
          const half = Math.round((p._state.money ?? 0) * 0.45)
          p.convertToHardCurrency(half); p.m += 4; p.addFlag('converted_hard_currency')
        },
      },
      {
        text: 'Buy gold instead',
        tag: null,
        outcome: 'You spend your cash on gold. At least it has weight. At least it is real.',
        effect: (p) => {
          const amount = Math.round((p._state.money ?? 0) * 0.5)
          p.addGold(amount); p.mo -= amount; p.m += 3; p.addFlag('converted_hard_currency')
        },
      },
      {
        text: 'Keep your money where it is — this will stabilise',
        tag: null,
        outcome: 'It does not stabilise. Not yet.',
        effect: (p) => { p.m -= 6 },
      },
    ],
    effect: null,
  },

  // ── Joint family dissolution ────────────────────────────────────────────────

  {
    id: 'ws_huf_dissolution',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.jointFamily && (G.jointFamilyPool ?? 0) > 0 && G.age >= 35 &&
      !G.mem?.hufDissolved &&
      ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'].includes(G.character?.country?.name),
    text: 'The family property has been held jointly for as long as anyone can remember. Now the question of division comes up — your siblings want their shares formally separated, the older generation is gone, and there is a lawyer in the family who keeps mentioning the legal process. It will not be simple. These things never are.',
    choices: [
      {
        text: 'Agree to formal partition',
        tag: null,
        outcome: 'The property is valued, the shares calculated, the papers signed. You walk away with your portion. The family gatherings will be different now.',
        effect: (p) => {
          const pool = p._state.jointFamilyPool ?? 0
          const siblings = (p._state.siblings ?? []).filter(s => s.alive).length + 1
          const share = Math.round(pool / Math.max(siblings, 1) * 0.85) // legal costs
          p.mo += share; p.setJointFamily(false); p.setJointFamilyPool(0); p.setMem('hufDissolved', true); p.addFlag('huf_dissolved'); p.m -= 5
        },
      },
      {
        text: 'Argue for keeping the family property together',
        tag: null,
        outcome: 'Two of your siblings agree. One does not. The tension stays.',
        effect: (p) => { p.m -= 8; p.setMem('hufDissolved', true) },
      },
      {
        text: 'Take your share and convert to cash immediately',
        tag: null,
        outcome: 'You liquidate quickly — less than full value, but cash in hand.',
        effect: (p) => {
          const pool = p._state.jointFamilyPool ?? 0
          const siblings = (p._state.siblings ?? []).filter(s => s.alive).length + 1
          const share = Math.round(pool / Math.max(siblings, 1) * 0.7) // discount for speed
          p.mo += share; p.setJointFamily(false); p.setJointFamilyPool(0); p.setMem('hufDissolved', true); p.addFlag('huf_dissolved')
        },
      },
    ],
    effect: null,
  },

  // ── Marriage wealth transfers ───────────────────────────────────────────────

  {
    id: 'ws_dowry_negotiation',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character?.gender === 'female' && G.flags.includes('engaged') &&
      !G.mem?.dowryNegotiated &&
      ['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'].includes(G.character?.country?.name) &&
      G.currentYear < 2010,
    text: (G) => {
      const year = G.currentYear
      if (year < 1980) return 'Your family begins assembling the dowry — a refrigerator, a television, gold, some cash. Your father has been setting aside money for this since you were a child. The groom\'s family sends a list. It is longer than expected.'
      return 'Dowry is illegal, but the requests come anyway — framed as "gifts", as "what families do." Your father looks at the numbers and does not say what he is thinking.'
    },
    choices: [
      {
        text: 'Accept the arrangement',
        tag: null,
        outcome: 'The wedding proceeds. Your family pays. The debt of it stays with them for years.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const dowry = Math.round(3000 * mult * (p._state.character?.wealthTier ?? 2) / 2)
          p.mo -= dowry; p.setMem('dowryNegotiated', true); p.m -= 3; p.addFlag('dowry_paid')
        },
      },
      {
        text: 'Push back on the demands',
        tag: null,
        outcome: 'There is tension. The negotiation continues. You give less than they asked.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const dowry = Math.round(1200 * mult)
          p.mo -= dowry; p.setMem('dowryNegotiated', true); p.m += 2; p.addFlag('dowry_paid')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ws_lobola_payment',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character?.gender === 'male' && G.flags.includes('engaged') &&
      !G.mem?.lobolaPaid &&
      ['South Africa', 'Zimbabwe', 'Zambia', 'Kenya', 'Uganda',
       'Tanzania', 'Nigeria', 'Ghana'].includes(G.character?.country?.name),
    text: (G) => {
      const country = G.character?.country?.name
      const term = country === 'South Africa' || country === 'Zimbabwe' ? 'lobola' : 'bridewealth'
      return `The families sit together to negotiate the ${term}. Her family presents their expectations — cattle, or its cash equivalent. Your family counters. This is not buying a person; everyone makes that clear. It is a ceremony of connection, an acknowledgement of what you are receiving. The numbers are real regardless.`
    },
    choices: [
      {
        text: 'Pay the agreed amount',
        tag: null,
        outcome: 'You pay. The families are satisfied. The wedding can proceed with everyone\'s blessing.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          const lobola = Math.round(2500 * mult * (1 + (p._state.character?.wealthTier ?? 2) * 0.3))
          p.mo -= lobola; p.setMem('lobolaPaid', true); p.m += 8; p.s += 3; p.addFlag('lobola_paid')
        },
      },
      {
        text: 'Negotiate a lower amount and pay in instalments',
        tag: null,
        outcome: 'There is grumbling on her side. But the arrangement holds. You pay over two years.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          const lobola = Math.round(1200 * mult)
          p.mo -= lobola; p.setMem('lobolaPaid', true); p.m += 3; p.addFlag('lobola_paid')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ws_mahr_setting',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('engaged') && !G.mem?.mahrSet &&
      ['muslim', 'muslim_sunni', 'muslim_shia'].includes(G.religion ?? G.character?.religion) &&
      G.character?.gender === 'male',
    text: 'The nikah requires a mahr — a gift from you to your wife, hers unconditionally, stated in the contract. It is not symbolic. The sheikh explains that it is her financial security, her right, independent of anything that comes after.',
    choices: [
      {
        text: 'Set a generous mahr',
        tag: 'generous',
        outcome: 'She accepts. The amount is written into the contract. Whatever happens, she has this.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const mahr = Math.round(1500 * mult * (1 + (p._state.character?.wealthTier ?? 2) * 0.4))
          p.mo -= mahr; p.setMem('mahrSet', true); p.m += 6; p.karma += 5; p.addFlag('mahr_paid')
        },
      },
      {
        text: 'Set a modest mahr within your means',
        tag: null,
        outcome: 'The amount is honest. The contract is signed.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.2
          const mahr = Math.round(400 * mult)
          p.mo -= mahr; p.setMem('mahrSet', true); p.m += 3; p.addFlag('mahr_paid')
        },
      },
    ],
    effect: null,
  },

  // ── Gender financial restrictions ───────────────────────────────────────────

  {
    id: 'ws_gender_financial_restriction',
    phase: null,
    weight: 3,
    when: (G) => G.character?.gender === 'female' && !G.mem?.genderFinanceRestricted && G.age >= 18 &&
      (
        (G.character?.country?.name === 'Saudi Arabia' && G.currentYear < 2019) ||
        (G.character?.country?.name === 'Kuwait' && G.currentYear < 2015) ||
        (G.character?.country?.name === 'Iran' && G.currentYear < 1990 && G.regime === 'theocracy') ||
        (G.character?.country?.name === 'Japan' && G.currentYear < 1947)
      ),
    text: (G) => {
      if (G.character?.country?.name === 'Saudi Arabia') return 'You try to open a bank account. The teller asks for your guardian\'s signature. Your father is in another city. You make a note to return when you have arranged it. The money you earn goes home with you in your bag.'
      if (G.character?.country?.name === 'Japan') return 'The property will be registered in your husband\'s name. This is how it is done. You do not sign the papers — your signature is not required because it is not meaningful.'
      return 'The bank manager explains that a male relative needs to co-sign. You know two or three women who have found ways around this. You think about whether you want to use one of them.'
    },
    choices: [
      {
        text: 'Arrange for a male relative to co-sign',
        tag: null,
        outcome: 'The account is opened. The dependency is written into its terms.',
        effect: (p) => { p.m -= 5; p.setMem('genderFinanceRestricted', true); p.addFlag('gender_financial_constraint') },
      },
      {
        text: 'Find a workaround — informal arrangement with a trusted woman',
        tag: null,
        outcome: 'You manage. Informally, quietly, with the specific knowledge that this can be revoked.',
        effect: (p) => { p.m -= 3; p.e += 2; p.setMem('genderFinanceRestricted', true); p.addFlag('gender_financial_constraint') },
      },
    ],
    effect: null,
  },

  // ── Patron emergence ────────────────────────────────────────────────────────

  {
    id: 'ws_becoming_patron',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.stats.wealth >= 65 && G.age >= 32 && !G.mem?.patronEmerged &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character?.country?.archetype) &&
      (G.parents?.mother?.alive || G.parents?.father?.alive || (G.siblings ?? []).some(s => s.alive)),
    text: (G) => {
      const arch = G.character?.country?.archetype
      if (arch === 'subsaharan') return 'There is a moment when you realise you have become the one people call. Your uncle needs school fees. Your cousin needs rent. Your mother\'s roof leaks. You have not become wealthy by their standard, but you have exceeded the family average in a way that makes you, by default, the node. There is pride in it. There is also a weight.'
      return 'Gradually, without anyone announcing it, you have become the family\'s financial reference point. Requests arrive — some that you can meet, some that you cannot, all arriving with the assumption that you can.'
    },
    choices: [
      {
        text: 'Accept the role — this is what family means',
        tag: 'generous',
        outcome: 'You take on the obligations. Some are manageable. The connection to home deepens.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          p.mo -= Math.round(800 * mult); p.karma += 10; p.m += 6; p.s += 4
          p.setMem('patronEmerged', true); p.addFlag('family_patron'); p.reduceHouseholdContribution()
        },
      },
      {
        text: 'Set boundaries — you will help, but not without limits',
        tag: null,
        outcome: 'You have the conversation. It goes imperfectly. The requests slow down. The expectation doesn\'t entirely disappear.',
        effect: (p) => { p.m += 3; p.setMem('patronEmerged', true); p.addFlag('family_patron'); p.reduceHouseholdContribution() },
      },
      {
        text: 'Maintain distance — you have your own life to build',
        tag: null,
        outcome: 'You draw back. There is judgment for it, quiet and sustained.',
        effect: (p) => { p.m -= 4; p.karma -= 5; p.r += 6; p.setMem('patronEmerged', true) },
      },
    ],
    effect: null,
  },

  // ── Farming debt cycle ──────────────────────────────────────────────────────

  {
    id: 'ws_farming_debt',
    phase: null,
    weight: 3,
    when: (G) => G.career?.field === 'agriculture' && G.money < 80 && G.age >= 20 &&
      !G.mem?.farmingDebtThisYear,
    text: 'The rains were late. The yield is about a third of what you needed. The seeds for next season still need to be purchased. You cannot wait for the harvest to do it.',
    choices: [
      {
        text: 'Borrow from the local moneylender',
        tag: null,
        outcome: 'He lends you what you need at a rate you cannot afford. You sign where he points. The debt will follow the harvest.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          const loan = Math.round(300 * mult)
          p.mo += loan; p.addDebt(Math.round(loan * 1.4))
          p.m -= 8; p.setMem('farmingDebtThisYear', true); p.addFlag('moneylender_debt')
        },
      },
      {
        text: 'Borrow from a relative',
        tag: null,
        outcome: 'Your brother-in-law lends you what he can spare. It is not enough, but it is something.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          p.mo += Math.round(150 * mult); p.m -= 5; p.setMem('farmingDebtThisYear', true); p.addFlag('family_debt')
        },
      },
      {
        text: 'Plant less — survive the season on what you have',
        tag: null,
        outcome: 'You plant what the money allows. The season is thin.',
        effect: (p) => { p.m -= 12; p.h -= 4; p.setMem('farmingDebtThisYear', true) },
      },
    ],
    effect: null,
    cooldown: 3,
  },

  {
    id: 'ws_farming_bumper',
    phase: null,
    weight: 2,
    when: (G) => G.career?.field === 'agriculture' && G.money > 0 && G.age >= 20 &&
      !G.mem?.farmingBumperThisYear && G.currentYear % 5 < 2,
    text: 'The rains came early and stayed long enough. By harvest you are cutting more than you have in three years. The grain store is full. There is more than you need and enough to sell.',
    choices: [
      {
        text: 'Sell the surplus immediately',
        tag: null,
        outcome: 'You take the market price while it holds. The money pays off a debt and leaves something over.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          p.mo += Math.round(600 * mult); p.m += 10; p.setMem('farmingBumperThisYear', true)
        },
      },
      {
        text: 'Store it and wait for a better price',
        tag: null,
        outcome: 'The price improves somewhat. Not as much as you hoped, but more than the harvest price.',
        effect: (p) => {
          const gdp = p._state.character?.country?.gdp
          const mult = { very_high: 1.0, high: 0.65, medium_high: 0.4, medium: 0.2, low_medium: 0.1, low: 0.05, very_low: 0.025 }[gdp] ?? 0.05
          p.mo += Math.round(800 * mult); p.m += 8; p.setMem('farmingBumperThisYear', true)
        },
      },
    ],
    effect: null,
    cooldown: 5,
  },

  // ── Mobile money revolution ─────────────────────────────────────────────────

  {
    id: 'ws_mobile_money_adoption',
    phase: null,
    weight: 4,
    when: (G) => !G.banked && !G.mem?.mobileMoneySeen && G.currentYear >= 2007 &&
      ['subsaharan'].includes(G.character?.country?.archetype) &&
      ['Kenya', 'Tanzania', 'Uganda', 'Ghana', 'Nigeria', 'Ethiopia',
       'Rwanda', 'Senegal', 'Mozambique', 'Zambia'].includes(G.character?.country?.name),
    text: 'Someone at the market is using their phone to pay. Not showing a card, not handing over notes — just pressing buttons. You ask them to explain. The SIM card is a bank account. You can send money, receive money, save money. The agent on the corner activates it for you. You do not need to go to a bank branch. There is no branch to go to.',
    choices: [
      {
        text: 'Sign up immediately',
        tag: null,
        outcome: 'You put in fifty shillings to test it. It works. Something that was not available to you last week is available to you now.',
        effect: (p) => { p.setBanked(true); p.addFlag('mobile_money_user'); p.setMem('mobileMoneySeen', true); p.m += 8; p.e += 3 },
      },
      {
        text: 'Wait and see — it may be a scheme',
        tag: null,
        outcome: 'You watch others use it for a year before you try it yourself.',
        effect: (p) => { p.setMem('mobileMoneySeen', true); p.m -= 1 },
      },
    ],
    effect: null,
  },

  // ── Poverty trap / cost of being poor ──────────────────────────────────────

  {
    id: 'ws_poverty_trap_moment',
    phase: null,
    weight: 2,
    when: (G) => G.money < 300 && G.age >= 18 && !G.mem?.povertyTrapNamed &&
      !['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(G.character?.country?.archetype),
    text: 'The shopkeeper charges more for the small bag than the large bag costs per unit. You cannot afford the large bag. The money lender charges thirty percent because you are not creditworthy enough for the bank, which charges eight. The prepay meter costs more per unit than the monthly plan. Everything about having less money costs more money.',
    choices: [
      {
        text: 'This is just how it is',
        tag: null,
        outcome: 'You know it. It does not change anything.',
        effect: (p) => { p.m -= 6; p.setMem('povertyTrapNamed', true); p.addFlag('experienced_poverty_trap') },
      },
      {
        text: 'Work out how to buy in larger amounts',
        tag: null,
        outcome: 'You pool resources with a neighbour. The per-unit cost drops. It is a small victory with real arithmetic.',
        effect: (p) => { p.m += 2; p.e += 3; p.s += 2; p.setMem('povertyTrapNamed', true); p.addFlag('experienced_poverty_trap') },
      },
    ],
    effect: null,
  },

  // ── South African Black Tax ─────────────────────────────────────────────────

  {
    id: 'ws_black_tax',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.character?.country?.name === 'South Africa' &&
      G.career && G.stats.wealth >= 45 && G.age >= 24 && !G.mem?.blackTaxNamed &&
      (G.parents?.mother?.alive || G.parents?.father?.alive),
    text: 'Your first professional salary. Your parents expected you to help — not as an obligation stated anywhere, but as the logic of the situation. Your salary is the highest in your immediate family. Your cousin needs university fees. Your mother\'s medication costs something each month. The requests are not unreasonable. There are simply many of them.',
    choices: [
      {
        text: 'Contribute what you can, gladly',
        tag: 'generous',
        outcome: 'You set up a monthly transfer. Your savings grow slower than your colleagues\'. The connection to home is real.',
        effect: (p) => {
          const salary = p._state.career?.salary ?? 1000
          p.mo -= Math.round(salary * 0.18); p.karma += 8; p.m += 5; p.s += 3
          p.setMem('blackTaxNamed', true); p.addFlag('black_tax_contributor')
        },
      },
      {
        text: 'Help selectively — school fees yes, lifestyle requests no',
        tag: null,
        outcome: 'You draw lines. Some are accepted. Some create quiet resentment you cannot argue with.',
        effect: (p) => {
          const salary = p._state.career?.salary ?? 1000
          p.mo -= Math.round(salary * 0.08); p.m += 2; p.setMem('blackTaxNamed', true); p.addFlag('black_tax_contributor')
        },
      },
      {
        text: 'Explain that you have your own expenses to manage first',
        tag: null,
        outcome: 'The conversation is uncomfortable. The family does not entirely understand. You save faster than you would have.',
        effect: (p) => { p.m -= 8; p.r += 5; p.karma -= 4; p.setMem('blackTaxNamed', true) },
      },
    ],
    effect: null,
  },

  // ── ROSCA payout context event ──────────────────────────────────────────────

  {
    id: 'ws_rosca_decision',
    phase: null,
    weight: 2,
    when: (G) => G.flags.includes('rosca_payout_received') && !G.mem?.roscaPayoutUsed,
    text: 'The savings circle payout arrives — months of contributions from all ten members, landing in your hand at once. It is the largest sum of money you have held in a single moment. The temptation to spend it on something you have been waiting for is real. The logic of saving it is also real.',
    choices: [
      {
        text: 'Use it for a productive investment',
        tag: null,
        outcome: 'You put it toward something that will earn: a stall, a machine, a qualification. The money multiplies slowly.',
        effect: (p) => { p.w += 5; p.e += 3; p.m += 6; p.setMem('roscaPayoutUsed', true); p.addFlag('rosca_invested') },
      },
      {
        text: 'Build or repair the family home',
        tag: null,
        outcome: 'The roof is fixed. The floor is concreted. The house is more solid.',
        effect: (p) => { p.m += 10; p.h += 2; p.setMem('roscaPayoutUsed', true); p.addFlag('rosca_invested') },
      },
      {
        text: 'Pay off a debt',
        tag: null,
        outcome: 'The debt is gone. The relief is disproportionate to the amount.',
        effect: (p) => {
          const debt = p._state.debt ?? 0
          if (debt > 0) { p.setDebt(0); p.mo -= Math.min(debt, p._state.money ?? 0) }
          p.m += 8; p.setMem('roscaPayoutUsed', true)
        },
      },
    ],
    effect: null,
    cooldown: 10,
  },
]

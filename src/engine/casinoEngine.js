import { randomBetween, pickFrom, clamp, chance } from '../utils/random'

// ─── Internal helpers ─────────────────────────────────────────────────────────

const SUITS = ['♠', '♥', '♦', '♣']
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function drawCard() {
  const rank = pickFrom(RANKS)
  const suit = pickFrom(SUITS)
  return { rank, suit }
}

function cardValue(card) {
  if (card.rank === 'A') return 11
  if (['J', 'Q', 'K'].includes(card.rank)) return 10
  return parseInt(card.rank, 10)
}

function calcHandValue(cards) {
  let total = 0
  let aces = 0
  for (const card of cards) {
    const v = cardValue(card)
    total += v
    if (card.rank === 'A') aces++
  }
  // Convert aces from 11 to 1 as needed to avoid bust
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  return total
}

function checkBust(cards) {
  return calcHandValue(cards) > 21
}

function cardLabel(card) {
  return `${card.rank}${card.suit}`
}

function handLabel(cards) {
  return cards.map(cardLabel).join(' ')
}

// ─── Gambling addiction risk helper ──────────────────────────────────────────

function applyAddictionRisk(state, lost) {
  if (!lost) return state
  const totalLost = (state.casinoStats?.totalLost ?? 0)
  const isHeavy = state.flags.includes('heavy_gambler')
  const bigLosser = totalLost > 50000
  if ((isHeavy || bigLosser) && !state.flags.includes('gambling_addiction') && chance(0.08)) {
    return {
      ...state,
      flags: [...new Set([...state.flags, 'gambling_addiction'])],
      log: [
        ...state.log,
        { age: state.age, text: 'You feel the pull of the game more strongly than ever. The losses don\'t stop you — they fuel you.', isKey: true },
      ],
    }
  }
  return state
}

// ─── Casino stats helper ──────────────────────────────────────────────────────

function updateCasinoStats(state, { won = 0, lost = 0 }) {
  const prev = state.casinoStats ?? { totalWon: 0, totalLost: 0, gamesPlayed: 0 }
  return {
    totalWon: prev.totalWon + won,
    totalLost: prev.totalLost + lost,
    gamesPlayed: prev.gamesPlayed + 1,
  }
}

// ─── Blackjack ────────────────────────────────────────────────────────────────

export function playBlackjack(state, betAmount) {
  const bet = Math.max(1, Math.round(betAmount))
  if ((state.money ?? 0) < bet) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: "You don't have enough money to place that bet.", isKey: false }],
    }
  }

  const playerCards = [drawCard(), drawCard()]
  const dealerCards = [drawCard(), drawCard()]
  const playerTotal = calcHandValue(playerCards)
  const dealerVisible = cardValue(dealerCards[0])

  // Check for immediate blackjack
  if (playerTotal === 21) {
    const dealerTotal = calcHandValue(dealerCards)
    const dealerBlackjack = dealerTotal === 21
    const isBlackjack = true
    let winnings, logText

    if (dealerBlackjack) {
      // Push — both have blackjack
      winnings = 0
      logText = `Blackjack push! Both you and the dealer have 21. Dealer: ${handLabel(dealerCards)}. Your $${bet.toLocaleString()} is returned.`
    } else {
      // Player blackjack pays 1.5x
      winnings = Math.floor(bet * 1.5)
      logText = `Blackjack! You win $${winnings.toLocaleString()} on a $${bet.toLocaleString()} bet. Dealer had ${handLabel(dealerCards)} (${dealerTotal}).`
    }

    const net = winnings - (dealerBlackjack ? 0 : 0)
    const payout = dealerBlackjack ? 0 : winnings
    const newMoney = (state.money ?? 0) - bet + bet + payout
    const casinoStats = updateCasinoStats(state, dealerBlackjack ? {} : { won: payout })
    const newFlags = [...state.flags]
    if (!newFlags.includes('gambler')) newFlags.push('gambler')

    return {
      ...state,
      money: newMoney,
      flags: [...new Set(newFlags)],
      casinoStats,
      actionsThisYear: (state.actionsThisYear ?? 0) + 1,
      pendingBlackjack: null,
      log: [...state.log, { age: state.age, text: logText, isKey: payout > 500 }],
    }
  }

  const newFlags = [...state.flags]
  if (!newFlags.includes('gambler')) newFlags.push('gambler')

  return {
    ...state,
    money: (state.money ?? 0) - bet,
    flags: [...new Set(newFlags)],
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    pendingBlackjack: {
      playerCards,
      dealerCards,
      playerTotal,
      dealerVisible,
      bet,
      done: false,
    },
  }
}

export function blackjackHit(state) {
  const pending = state.pendingBlackjack
  if (!pending || pending.done) return state

  const newCard = drawCard()
  const playerCards = [...pending.playerCards, newCard]
  const playerTotal = calcHandValue(playerCards)
  const bust = checkBust(playerCards)

  if (bust) {
    const casinoStats = updateCasinoStats(state, { lost: pending.bet })
    let next = {
      ...state,
      money: state.money, // bet was already deducted in playBlackjack
      casinoStats,
      pendingBlackjack: null,
      log: [
        ...state.log,
        {
          age: state.age,
          text: `You draw ${cardLabel(newCard)} — bust! Hand: ${handLabel(playerCards)} (${playerTotal}). You lose $${pending.bet.toLocaleString()}.`,
          isKey: false,
        },
      ],
    }
    next = applyAddictionRisk(next, true)
    return next
  }

  return {
    ...state,
    pendingBlackjack: {
      ...pending,
      playerCards,
      playerTotal,
    },
  }
}

export function blackjackStand(state) {
  const pending = state.pendingBlackjack
  if (!pending || pending.done) return state

  const { playerCards, dealerCards, bet } = pending
  const playerTotal = calcHandValue(playerCards)

  // Dealer draws until 17 or higher
  let currentDealerCards = [...dealerCards]
  while (calcHandValue(currentDealerCards) < 17) {
    currentDealerCards.push(drawCard())
  }
  const dealerTotal = calcHandValue(currentDealerCards)
  const dealerBust = checkBust(currentDealerCards)

  let winnings = 0
  let logText = ''
  let playerWon = false
  let push = false

  if (dealerBust || playerTotal > dealerTotal) {
    winnings = bet * 2 // get bet back + equal winnings
    playerWon = true
    logText = dealerBust
      ? `Dealer busts at ${dealerTotal}! You win $${bet.toLocaleString()}. Dealer: ${handLabel(currentDealerCards)}.`
      : `You win! ${playerTotal} beats dealer's ${dealerTotal}. You win $${bet.toLocaleString()}. Dealer: ${handLabel(currentDealerCards)}.`
  } else if (playerTotal === dealerTotal) {
    winnings = bet // push — return original bet
    push = true
    logText = `Push — both ${playerTotal}. Dealer: ${handLabel(currentDealerCards)}. Your $${bet.toLocaleString()} is returned.`
  } else {
    winnings = 0
    logText = `Dealer wins with ${dealerTotal} vs your ${playerTotal}. Dealer: ${handLabel(currentDealerCards)}. You lose $${bet.toLocaleString()}.`
  }

  const net = winnings - bet // net relative to the bet already deducted
  const casinoStats = updateCasinoStats(
    state,
    playerWon ? { won: bet } : push ? {} : { lost: bet }
  )

  let next = {
    ...state,
    money: (state.money ?? 0) + winnings,
    casinoStats,
    pendingBlackjack: null,
    log: [...state.log, { age: state.age, text: logText, isKey: playerWon && bet > 500 }],
  }

  if (!playerWon && !push) {
    next = applyAddictionRisk(next, true)
  }

  return next
}

// ─── Slots ────────────────────────────────────────────────────────────────────

const SLOT_SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎']
// Weights: cherry most common, diamond rarest
const SLOT_WEIGHTS = [0.30, 0.25, 0.20, 0.15, 0.07, 0.03]

function spinReel() {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < SLOT_WEIGHTS.length; i++) {
    cumulative += SLOT_WEIGHTS[i]
    if (r < cumulative) return SLOT_SYMBOLS[i]
  }
  return SLOT_SYMBOLS[SLOT_SYMBOLS.length - 1]
}

export function playSlots(state, betAmount) {
  const bet = Math.max(1, Math.round(betAmount))
  if ((state.money ?? 0) < bet) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: "You don't have enough to spin.", isKey: false }],
    }
  }

  const reels = [spinReel(), spinReel(), spinReel()]
  const [a, b, c] = reels

  let multiplier = 0
  let resultLabel = ''

  if (a === '💎' && b === '💎' && c === '💎') {
    multiplier = 50
    resultLabel = 'JACKPOT! Triple diamonds!'
  } else if (a === '⭐' && b === '⭐' && c === '⭐') {
    multiplier = 20
    resultLabel = 'Triple stars — big win!'
  } else if (a === b && b === c) {
    // All match, non-star/diamond fruit
    multiplier = 5
    resultLabel = `Triple ${a}!`
  } else if (a === b || b === c || a === c) {
    multiplier = 1.5
    resultLabel = 'Two of a kind — break even.'
  } else {
    multiplier = 0
    resultLabel = 'No match.'
  }

  const payout = Math.floor(bet * multiplier)
  const net = payout - bet
  const playerWon = net > 0
  const push = net === 0 && multiplier > 0

  const casinoStats = updateCasinoStats(
    state,
    playerWon ? { won: net } : push ? {} : { lost: bet }
  )

  const newFlags = [...state.flags]
  if (!newFlags.includes('gambler')) newFlags.push('gambler')

  const addictionNote = state.flags.includes('gambling_addiction')
    ? ' The pull of the machine keeps you rooted to your seat.'
    : ''

  const logText = `Slots [${reels.join(' ')}] — ${resultLabel} ${
    payout > 0 ? `You win $${payout.toLocaleString()}.` : `You lose $${bet.toLocaleString()}.`
  }${addictionNote}`

  let next = {
    ...state,
    money: (state.money ?? 0) - bet + payout,
    flags: [...new Set(newFlags)],
    casinoStats,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: multiplier >= 20 }],
  }

  if (!playerWon && !push) {
    next = applyAddictionRisk(next, true)
  }

  return next
}

// ─── Roulette ─────────────────────────────────────────────────────────────────

const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])

export function playRoulette(state, betAmount, betType, betValue) {
  const bet = Math.max(1, Math.round(betAmount))
  if ((state.money ?? 0) < bet) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: "You don't have enough to bet.", isKey: false }],
    }
  }

  const result = randomBetween(0, 36)
  const isRed = result !== 0 && RED_NUMBERS.has(result)
  const isBlack = result !== 0 && !RED_NUMBERS.has(result)
  const isOdd = result !== 0 && result % 2 !== 0
  const isEven = result !== 0 && result % 2 === 0

  let multiplier = 0
  let betLabel = ''

  switch (betType) {
    case 'number': {
      const num = parseInt(betValue, 10)
      betLabel = `number ${num}`
      if (result === num) multiplier = 36 // 35x profit + original = 36x total return
      break
    }
    case 'red':
      betLabel = 'red'
      if (isRed) multiplier = 2
      break
    case 'black':
      betLabel = 'black'
      if (isBlack) multiplier = 2
      break
    case 'odd':
      betLabel = 'odd'
      if (isOdd) multiplier = 2
      break
    case 'even':
      betLabel = 'even'
      if (isEven) multiplier = 2
      break
    case 'dozen_1':
      betLabel = '1st dozen (1–12)'
      if (result >= 1 && result <= 12) multiplier = 3
      break
    case 'dozen_2':
      betLabel = '2nd dozen (13–24)'
      if (result >= 13 && result <= 24) multiplier = 3
      break
    case 'dozen_3':
      betLabel = '3rd dozen (25–36)'
      if (result >= 25 && result <= 36) multiplier = 3
      break
    default:
      return { ...state, log: [...state.log, { age: state.age, text: 'Invalid roulette bet type.', isKey: false }] }
  }

  const payout = Math.floor(bet * multiplier)
  const net = payout - bet
  const playerWon = net > 0
  const push = net === 0 && multiplier > 0

  const resultColor = result === 0 ? 'green' : isRed ? 'red' : 'black'
  const ballLabel = `${result} (${resultColor})`

  let logText
  if (playerWon) {
    logText = `Roulette: ball lands on ${ballLabel}. You bet ${betLabel} — you win $${net.toLocaleString()} (payout $${payout.toLocaleString()}).`
  } else {
    logText = `Roulette: ball lands on ${ballLabel}. You bet ${betLabel} — no luck. You lose $${bet.toLocaleString()}.`
  }

  const casinoStats = updateCasinoStats(
    state,
    playerWon ? { won: net } : push ? {} : { lost: bet }
  )

  const newFlags = [...state.flags]
  if (!newFlags.includes('gambler')) newFlags.push('gambler')

  let next = {
    ...state,
    money: (state.money ?? 0) - bet + payout,
    flags: [...new Set(newFlags)],
    casinoStats,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log: [...state.log, { age: state.age, text: logText, isKey: playerWon && net > 1000 }],
  }

  if (!playerWon && !push) {
    next = applyAddictionRisk(next, true)
  }

  return next
}

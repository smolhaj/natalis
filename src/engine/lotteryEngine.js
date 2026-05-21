import { randomBetween, pickFrom, clamp, chance } from '../utils/random'

// ─── Lottery ticket draw helpers ──────────────────────────────────────────────

function drawNumbers(count, max) {
  const pool = Array.from({ length: max }, (_, i) => i + 1)
  const picked = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    picked.push(pool[idx])
    pool.splice(idx, 1)
  }
  return picked
}

function countMatches(playerNums, winningNums) {
  return playerNums.filter(n => winningNums.includes(n)).length
}

// ─── buyLotteryTickets ────────────────────────────────────────────────────────

export function buyLotteryTickets(state, count = 1) {
  const TICKET_COST = 10
  const totalCost = TICKET_COST * count
  const money = state.money ?? 0

  if (money < totalCost) {
    return {
      ...state,
      log: [
        ...state.log,
        { age: state.age, text: `You can't afford ${count} lottery ticket${count > 1 ? 's' : ''} ($${totalCost}).`, isKey: false },
      ],
    }
  }

  const currentJackpot = state.lottery?.jackpot ?? 1_000_000
  const jackpotAfterSales = currentJackpot + count * 5_000

  // Draw winning numbers once per purchase
  const winningNumbers = drawNumbers(6, 49)

  let bestMatchCount = 0
  let bestTicketNums = null

  for (let i = 0; i < count; i++) {
    const playerNums = drawNumbers(6, 49)
    const matches = countMatches(playerNums, winningNumbers)
    if (matches > bestMatchCount) {
      bestMatchCount = matches
      bestTicketNums = playerNums
    }
  }

  // Determine prize
  let prize = 0
  let resultText = ''
  let isKeyEvent = false
  let jackpotWon = false
  let newFlags = [...state.flags]

  if (bestMatchCount === 6) {
    prize = jackpotAfterSales
    jackpotWon = true
    isKeyEvent = true
    resultText = `You match all 6 numbers and win the $${prize.toLocaleString()} jackpot!`
    if (!newFlags.includes('lottery_winner')) newFlags.push('lottery_winner')
  } else if (bestMatchCount === 5) {
    prize = 10_000
    isKeyEvent = true
    resultText = `You match 5 numbers and win $${prize.toLocaleString()}!`
  } else if (bestMatchCount === 4) {
    prize = 500
    resultText = `You match 4 numbers and win $${prize.toLocaleString()}.`
  } else if (bestMatchCount === 3) {
    prize = 20
    resultText = `You match 3 numbers and win $${prize.toLocaleString()}.`
  } else if (bestMatchCount === 2) {
    prize = 5
    resultText = `You match 2 numbers and win $${prize.toLocaleString()} — break even on one ticket.`
  } else {
    resultText = `You buy ${count} lottery ticket${count > 1 ? 's' : ''} and win nothing.`
  }

  const newJackpot = jackpotWon ? 1_000_000 : jackpotAfterSales
  const newMoney = money - totalCost + prize

  let newState = {
    ...state,
    money: newMoney,
    flags: newFlags,
    lottery: {
      ...(state.lottery ?? {}),
      jackpot: newJackpot,
    },
    log: [
      ...state.log,
      {
        age: state.age,
        text: `You buy ${count} lottery ticket${count > 1 ? 's' : ''} ($${totalCost}). ${resultText}`,
        isKey: isKeyEvent,
      },
    ],
  }

  // Gambling addiction risk: 3% chance if heavy_gambler flag exists
  if (newState.flags.includes('heavy_gambler') && chance(0.03)) {
    if (!newState.flags.includes('gambling_addiction')) {
      newState = {
        ...newState,
        flags: [...newState.flags, 'gambling_addiction'],
        log: [
          ...newState.log,
          { age: newState.age, text: 'The thrill of the lottery is becoming something harder to control.', isKey: false },
        ],
      }
    }
  }

  return newState
}

// ─── checkFortuneCookieLottery ────────────────────────────────────────────────

export function checkFortuneCookieLottery(state) {
  if (!state.mem?.fortune_cookie_guaranteed) return state

  // Clear the guarantee and force a jackpot win
  const currentJackpot = state.lottery?.jackpot ?? 1_000_000
  const prize = currentJackpot
  const newFlags = state.flags.includes('lottery_winner')
    ? state.flags
    : [...state.flags, 'lottery_winner']

  return {
    ...state,
    money: (state.money ?? 0) + prize,
    flags: newFlags,
    mem: {
      ...state.mem,
      fortune_cookie_guaranteed: false,
      fortune_cookie_lottery: false,
    },
    lottery: {
      ...(state.lottery ?? {}),
      jackpot: 1_000_000,
    },
    log: [
      ...state.log,
      {
        age: state.age,
        text: `The fortune cookie's prophecy comes true — you win the $${prize.toLocaleString()} jackpot!`,
        isKey: true,
      },
    ],
  }
}

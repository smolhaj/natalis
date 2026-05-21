import { randomBetween, clamp, chance } from '../utils/random'

// ─── Gang data ────────────────────────────────────────────────────────────────

const GANGS = [
  { id: 'street_crew',  name: 'Street Crew',  emoji: '🔫', archetype: 'any',              baseIncome: 500,  violence: 0.3 },
  { id: 'mob',          name: 'The Mob',       emoji: '🤵', archetype: 'wealthy_west',     baseIncome: 3000, violence: 0.4 },
  { id: 'cartel',       name: 'The Cartel',    emoji: '💊', archetype: 'developing_urban', baseIncome: 5000, violence: 0.6 },
  { id: 'triad',        name: 'Triad',         emoji: '🐉', archetype: 'wealthy_east',     baseIncome: 4000, violence: 0.5 },
  { id: 'yakuza',       name: 'Yakuza',        emoji: '⚔️', archetype: 'wealthy_east',     baseIncome: 4500, violence: 0.4 },
  { id: 'biker_gang',   name: 'Biker Gang',    emoji: '🏍️', archetype: 'any',              baseIncome: 1500, violence: 0.5 },
  { id: 'prison_gang',  name: 'Prison Gang',   emoji: '🔒', archetype: 'any',              baseIncome: 200,  violence: 0.7 },
]

export const GANG_RANKS = ['Associate', 'Soldier', 'Lieutenant', 'Capo', 'Boss']

// ─── getAvailableGangs ────────────────────────────────────────────────────────

export function getAvailableGangs(state) {
  if (state.gang) return []
  const archetype = state.character?.country?.archetype
  return GANGS.filter(g => {
    if (g.id === 'prison_gang') return false
    return g.archetype === 'any' || g.archetype === archetype
  })
}

// ─── joinGang ─────────────────────────────────────────────────────────────────

export function joinGang(state, gangId) {
  if (state.age < 16) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are too young to join a gang.', isKey: false }],
    }
  }

  if (state.gang) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are already a member of a gang.', isKey: false }],
    }
  }

  const gang = GANGS.find(g => g.id === gangId)
  if (!gang) return state

  // 70% recruitment success (charisma skews nothing numerically; 70% is fixed per spec)
  if (!chance(0.70)) {
    const healthLoss = randomBetween(5, 20)
    return {
      ...state,
      stats: { ...state.stats, health: clamp(state.stats.health - healthLoss, 0, 100) },
      log: [
        ...state.log,
        {
          age: state.age,
          text: `${gang.name} rejects your application — and makes sure you know it. You take a beating (health -${healthLoss}).`,
          isKey: false,
        },
      ],
    }
  }

  const newGang = {
    id:          gang.id,
    name:        gang.name,
    emoji:       gang.emoji,
    rank:        GANG_RANKS[0],
    rankLevel:   0,
    income:      gang.baseIncome,
    heat:        0,
    yearsIn:     0,
    membersSince: state.age,
  }

  return {
    ...state,
    gang: newGang,
    flags: [...new Set([...state.flags, 'gang_member'])],
    log: [
      ...state.log,
      {
        age: state.age,
        text: `You are recruited into ${gang.name} ${gang.emoji} as an ${GANG_RANKS[0]}.`,
        isKey: true,
      },
    ],
  }
}

// ─── doGangActivity ───────────────────────────────────────────────────────────

export function doGangActivity(state) {
  if (!state.gang) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are not in a gang.', isKey: false }],
    }
  }

  if (state.inPrison) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You cannot run gang activities from prison.', isKey: false }],
    }
  }

  const gang = GANGS.find(g => g.id === state.gang.id)
  if (!gang) return state

  const activities = [
    'collecting protection money',
    'running errands for the organization',
    'intimidating targets',
  ]
  const activity = activities[Math.floor(Math.random() * activities.length)]

  // Base income with variance
  const earned = Math.round(state.gang.income * (0.8 + Math.random() * 0.7))

  let newHealth    = state.stats.health
  let newHappiness = state.stats.happiness
  let newMoney     = (state.money ?? 0) + earned
  let newFlags     = [...state.flags]
  let newCrimRecord = [...(state.criminalRecord ?? [])]
  let newLog       = [...state.log]
  let newGang      = { ...state.gang }
  let inPrison     = state.inPrison
  let prisonSentence = state.prisonSentence ?? 0
  let newMem       = { ...state.mem }

  // Violence risk
  if (chance(gang.violence)) {
    const healthLoss = randomBetween(5, 20)
    newHealth = clamp(newHealth - healthLoss, 0, 100)
    newLog.push({ age: state.age, text: `Things get physical while ${activity}. You take a hit (health -${healthLoss}).`, isKey: false })
  }

  // Heat management
  const currentHeat = clamp((newGang.heat ?? 0) + 5, 0, 100)
  newGang = { ...newGang, heat: currentHeat }

  // Arrest risk
  const gangCrimeCount = newCrimRecord.filter(e => {
    const crime = typeof e === 'string' ? e : (e.crime ?? '')
    return /gang/i.test(crime)
  }).length
  let arrestRisk = clamp(0.15 + gangCrimeCount * 0.05, 0, 0.35)
  if (currentHeat > 70) arrestRisk = clamp(arrestRisk + 0.10, 0, 0.45)

  if (chance(arrestRisk)) {
    newCrimRecord = [...newCrimRecord, { crime: 'Gang activity', age: state.age }]
    newFlags = [...new Set([...newFlags, 'gang_member'])]
    // Sentence scales with rank: Associate=1, Soldier=2, Lieutenant=3, Capo=4, Boss=5
    const minSent = 1
    const maxSent = clamp(newGang.rankLevel + 1, 1, 5)
    prisonSentence = randomBetween(minSent, maxSent)
    inPrison = true
    newMem = { ...newMem, originalSentence: prisonSentence, prisonYearStart: state.age }
    newLog.push({
      age: state.age,
      text: `You are arrested for gang-related crimes while ${activity}. Sentenced to ${prisonSentence} year${prisonSentence > 1 ? 's' : ''}.`,
      isKey: true,
    })
  } else {
    newLog.push({
      age: state.age,
      text: `You spend time ${activity} for ${state.gang.name}, earning $${earned.toLocaleString()}.`,
      isKey: false,
    })
  }

  return {
    ...state,
    money:          newMoney,
    stats:          { ...state.stats, health: newHealth, happiness: newHappiness },
    flags:          newFlags,
    criminalRecord: newCrimRecord,
    inPrison,
    prisonSentence,
    mem:            newMem,
    gang:           newGang,
    actionsThisYear: (state.actionsThisYear ?? 0) + 1,
    log:            newLog,
  }
}

// ─── rankUpInGang ─────────────────────────────────────────────────────────────

export function rankUpInGang(state) {
  if (!state.gang) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are not in a gang.', isKey: false }],
    }
  }

  const { rankLevel, yearsIn } = state.gang
  const nextRankLevel = rankLevel + 1

  if (nextRankLevel >= GANG_RANKS.length) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: `You are already at the top rank: ${GANG_RANKS[rankLevel]}.`, isKey: false }],
    }
  }

  // Minimum years required: rankLevel * 2 + 1
  const yearsRequired = rankLevel * 2 + 1
  if (yearsIn < yearsRequired) {
    return {
      ...state,
      log: [
        ...state.log,
        {
          age: state.age,
          text: `You need at least ${yearsRequired} year${yearsRequired > 1 ? 's' : ''} in the gang to make ${GANG_RANKS[nextRankLevel]}. (${yearsIn} so far)`,
          isKey: false,
        },
      ],
    }
  }

  const yearsOver    = yearsIn - yearsRequired
  const successChance = clamp(0.60 + yearsOver * 0.10, 0, 0.95)

  if (!chance(successChance)) {
    return {
      ...state,
      log: [
        ...state.log,
        {
          age: state.age,
          text: `You put yourself forward for ${GANG_RANKS[nextRankLevel]}, but leadership passes you over. Try again next year.`,
          isKey: false,
        },
      ],
    }
  }

  const newIncome   = Math.round(state.gang.income * 1.4)
  const newRankLevel = nextRankLevel
  const newRank     = GANG_RANKS[newRankLevel]

  return {
    ...state,
    gang: {
      ...state.gang,
      rankLevel: newRankLevel,
      rank:      newRank,
      income:    newIncome,
    },
    log: [
      ...state.log,
      {
        age: state.age,
        text: `You are promoted to ${newRank} in ${state.gang.name} ${state.gang.emoji}. New income: $${newIncome.toLocaleString()}/yr.`,
        isKey: true,
      },
    ],
  }
}

// ─── leaveGang ────────────────────────────────────────────────────────────────

export function leaveGang(state) {
  if (!state.gang) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are not in a gang.', isKey: false }],
    }
  }

  const gangName = state.gang.name
  const gangEmoji = state.gang.emoji

  if (chance(0.30)) {
    // Violent retaliation
    return {
      ...state,
      gang:  null,
      flags: [...new Set([...state.flags.filter(f => f !== 'gang_member'), 'gang_betrayal'])],
      stats: {
        ...state.stats,
        health: clamp(state.stats.health - 20, 0, 100),
      },
      karma: clamp((state.karma ?? 50) - 10, 0, 100),
      log: [
        ...state.log,
        {
          age: state.age,
          text: `You try to leave ${gangName} ${gangEmoji}. They don't take it well — you are beaten badly (health -20, karma -10).`,
          isKey: true,
        },
      ],
    }
  }

  // Clean exit
  return {
    ...state,
    gang:  null,
    flags: state.flags.filter(f => f !== 'gang_member'),
    karma: clamp((state.karma ?? 50) - 3, 0, 100),
    log: [
      ...state.log,
      {
        age: state.age,
        text: `You walk away from ${gangName} ${gangEmoji}. They let you go, but the look in their eyes says they won't forget.`,
        isKey: false,
      },
    ],
  }
}

// ─── joinPrisonGang ───────────────────────────────────────────────────────────

export function joinPrisonGang(state) {
  if (!state.inPrison) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'Prison gangs are only available inside prison.', isKey: false }],
    }
  }

  if (state.gang) {
    return {
      ...state,
      log: [...state.log, { age: state.age, text: 'You are already affiliated with a gang.', isKey: false }],
    }
  }

  const prisonGang = GANGS.find(g => g.id === 'prison_gang')

  if (chance(0.50)) {
    // Rejected — fight breaks out
    const healthLoss = 10
    return {
      ...state,
      stats: { ...state.stats, health: clamp(state.stats.health - healthLoss, 0, 100) },
      log: [
        ...state.log,
        {
          age: state.age,
          text: `The prison gang rejects you — and the rejection comes with fists (health -${healthLoss}).`,
          isKey: false,
        },
      ],
    }
  }

  const newGang = {
    id:           prisonGang.id,
    name:         prisonGang.name,
    emoji:        prisonGang.emoji,
    rank:         GANG_RANKS[0],
    rankLevel:    0,
    income:       prisonGang.baseIncome,
    heat:         0,
    yearsIn:      0,
    membersSince: state.age,
  }

  return {
    ...state,
    gang:  newGang,
    flags: [...new Set([...state.flags, 'gang_member'])],
    stats: { ...state.stats, happiness: clamp(state.stats.happiness + 10, 0, 100) },
    log: [
      ...state.log,
      {
        age: state.age,
        text: `You are accepted into the ${prisonGang.name} ${prisonGang.emoji}. Inside these walls, that means something.`,
        isKey: true,
      },
    ],
  }
}

// ─── tickGang ─────────────────────────────────────────────────────────────────

export function tickGang(state) {
  if (!state.gang) return state

  let newMoney = (state.money ?? 0) + state.gang.income
  let newHeat  = clamp((state.gang.heat ?? 0) - 10, 0, 100)
  let newYearsIn = (state.gang.yearsIn ?? 0) + 1
  let newLog   = [...state.log]
  let newFlags = [...state.flags]
  let newStats = { ...state.stats }
  let newMem   = { ...state.mem }

  // 5% annual gang war event
  if (chance(0.05)) {
    newFlags = [...new Set([...newFlags, 'gang_war_active'])]
    newStats = { ...newStats, health: clamp(newStats.health - 10, 0, 100) }
    newMoney = Math.max(0, newMoney - 500)
    newLog.push({
      age: state.age,
      text: `Gang war erupts in ${state.gang.name} ${state.gang.emoji}. Violence and losses hit close to home (health -10, money -$500).`,
      isKey: true,
    })
  }

  return {
    ...state,
    money:  newMoney,
    stats:  newStats,
    flags:  newFlags,
    mem:    newMem,
    gang: {
      ...state.gang,
      heat:    newHeat,
      yearsIn: newYearsIn,
    },
    log: newLog,
  }
}

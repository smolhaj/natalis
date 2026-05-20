export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// rolls index based on weights array (must sum to 1)
export function rollWeighted(weights) {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i]
    if (r < cumulative) return i
  }
  return weights.length - 1
}

export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val))
}

export function chance(prob) {
  return Math.random() < prob
}

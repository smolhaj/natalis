// Every statistical assertion in this suite is a sample, and an unseeded sample
// fails at random: the survivor median that measured 48 at n=150 came out 30 on
// one twenty-life draw, and a test that fails at random gets read as noise until
// the one real failure is read as noise too. Each test file starts from the same
// seed, so a red run reproduces exactly. Set NATALIS_SEED to try another draw;
// NATALIS_SEED=off restores the platform generator.
const raw = process.env.NATALIS_SEED
if (raw !== 'off') {
  let s = (Number(raw) || 0x9e3779b9) >>> 0
  Math.random = function mulberry32() {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// _words.js — numbers the way the prose writes them.
//
// Event text states ages and spans in words ("you are thirty-four"), and a
// hard-coded one is a claim that is false in most of the years the guard lets
// it fire. Interpolate with this instead.

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

/** 0-99 in words ("thirty-four"); larger numbers as digits. */
export function numberWord(n) {
  n = Math.round(n)
  if (n < 0 || n > 99) return String(n)
  if (n < 20) return ONES[n]
  const t = TENS[Math.floor(n / 10)]
  return n % 10 ? `${t}-${ONES[n % 10]}` : t
}

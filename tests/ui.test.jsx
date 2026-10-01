// @vitest-environment jsdom
//
// The reading surfaces after the browser review: the life log, the death
// screen, the flag in the header. Each test pins a defect a player could see.
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { COUNTRIES } from '../src/data/countries.js'
import { getCountryFlag, birthEraLines, placeNameInSentence, getRegionLabel } from '../src/utils/countryUtils.js'
import LogEntry, { readableEntryText } from '../src/components/LogEntry.jsx'

beforeEach(cleanup)
const C = (name) => COUNTRIES.find(c => c.name === name)

describe('a world event in the log', () => {
  const entry = {
    age: 13, year: 1938, isWorld: true, isKey: true,
    worldEventName: 'Kristallnacht',
    text: 'The windows on the main street are glass on the pavement in the morning.',
    context: 'On 9-10 November 1938 synagogues and Jewish shops across Germany were attacked.',
  }

  it('shows its narrative, and a "What was happening" note that opens', () => {
    // tick.js has stored `context` on world entries since the review; no log
    // view rendered it.
    render(<LogEntry entry={entry} birthYear={1925} />)
    expect(screen.getByText(/glass on the pavement/)).toBeTruthy()
    expect(screen.queryByText(/synagogues/)).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /What was happening/ }))
    expect(screen.getByText(/synagogues/)).toBeTruthy()
  })

  it('offers no toggle when there is no note', () => {
    render(<LogEntry entry={{ ...entry, context: null }} birthYear={1925} />)
    expect(screen.queryByRole('button', { name: /What was happening/ })).toBeNull()
  })
})

describe('Witness mode does not print questions put to nobody', () => {
  it('drops a trailing question when the character has answered it', () => {
    const e = { isChoice: true, text: 'You are nineteen. The life ahead is unwritten. What matters most, entering this?', outcome: 'You reserve the right not to know yet.' }
    expect(readableEntryText(e, true)).toBe('You are nineteen. The life ahead is unwritten.')
    expect(readableEntryText(e, false)).toBe(e.text)
  })

  it('shows the answer alone when the event was only the question', () => {
    const e = { age: 20, year: 1987, isChoice: true, text: 'Which trade will you train in?', outcome: 'The first week your hands blister.' }
    render(<LogEntry entry={e} birthYear={1967} passive />)
    expect(screen.queryByText(/Which trade/)).toBeNull()
    expect(screen.getByText(/hands blister/)).toBeTruthy()
  })
})

describe('the flag is the flag of the year', () => {
  it('draws no flag before the state flew it', () => {
    // 🇧🇩 beside "British India, 1938"; 🇿🇼 over a Rhodesian childhood.
    expect(getCountryFlag(C('Bangladesh'), 1938)).toBe('')
    expect(getCountryFlag(C('Zimbabwe'), 1949)).toBe('')
    expect(getCountryFlag(C('Germany'), 1940)).toBe('')
    expect(getCountryFlag(C('Russia'), 1970)).toBe('')
  })
  it('draws it once it did, and always without a year', () => {
    expect(getCountryFlag(C('Bangladesh'), 1990)).not.toBe('')
    expect(getCountryFlag(C('Zimbabwe'), 1990)).not.toBe('')
    expect(getCountryFlag(C('Nigeria'), 1962)).not.toBe('')
    expect(getCountryFlag(C('Sweden'), 1937)).not.toBe('')
    expect(getCountryFlag('Zimbabwe')).not.toBe('')
  })
})

describe('the birth preview describes the country as it was', () => {
  it('never prints the present-day context for a mid-century birth', () => {
    for (const c of COUNTRIES) {
      const lines = birthEraLines(c, 1950).join(' ')
      if (c.context) expect(lines.includes(c.context), `${c.name} 1950 printed its present-day context`).toBe(false)
    }
  })
  it('names a colony as one, and a federation as not one', () => {
    expect(birthEraLines(C('Zimbabwe'), 1943).join(' ')).toMatch(/Rhodesia/)
    expect(birthEraLines(C('Ghana'), 1950).join(' ')).toMatch(/Gold Coast, a colony/)
    expect(birthEraLines(C('Czech Republic'), 1970).join(' ')).not.toMatch(/colony/)
    expect(birthEraLines(C('Russia'), 1950).join(' ')).toMatch(/Soviet Union/)
  })
  it('puts Sweden in northern Europe', () => {
    expect(getRegionLabel(C('Sweden'))).toBe('Northern Europe')
  })
  it('lowercases a descriptive place name in mid-sentence', () => {
    expect(placeNameInSentence('The huts past the ring road')).toBe('the huts past the ring road')
    expect(placeNameInSentence('The Hague')).toBe('The Hague')
  })
})

// ── The death screen ─────────────────────────────────────────────────────────
import { vi } from 'vitest'
const store = { current: null }
vi.mock('../src/store/gameStore', () => ({
  useGameStore: (selector) => selector(store.current),
}))
const { default: DeathScreen } = await import('../src/components/DeathScreen.jsx')

function deathState(over = {}) {
  const country = C('Nigeria')
  return {
    character: { firstName: 'Ada', surname: 'Okafor', gender: 'female', birthYear: 1962, country },
    stats: { happiness: 40, health: 0, smarts: 30, looks: 50, charisma: 50, wealth: 10 },
    flags: [], regret: 0, age: 0, causeOfDeath: 'measles', mode: 'passive',
    ribbon: { id: 'the_compromised', name: 'The Compromised', description: 'You chose the easier path more than once. The regret accumulated.', color: 'red' },
    epitaph: 'Ada was born in Nigeria and was gone at 0.\n\nThere is not much to record.',
    criminalRecord: [], career: { title: 'Trading Company Owner' }, children: [], money: 0,
    startNewLife: () => {}, worldEventsFired: new Set(), mem: {}, siblings: [], partner: null,
    currentCountry: country,
    log: [{ age: 0, year: 1962, text: 'You are born.', isKey: true }, { age: 0, year: 1962, isWorld: true, worldEventName: 'X', text: 'Something far away.', context: 'A note.' }],
    ...over,
  }
}

describe('the death screen', () => {
  it('gives an infant no archetype and no column of final stats', () => {
    store.current = deathState()
    render(<DeathScreen />)
    expect(screen.queryByText(/Life Archetype/i)).toBeNull()
    expect(screen.queryByText(/At death/i)).toBeNull()
    expect(screen.getByText(/Died in the first year/)).toBeTruthy()
  })

  it('does not accuse a Witness player of choices, and sets the obituary in one voice', () => {
    store.current = deathState({ age: 61 })
    const { container } = render(<DeathScreen />)
    expect(screen.queryByText(/You chose the easier path/)).toBeNull()
    const paras = [...container.querySelectorAll('p.font-prose.text-prose')]
    expect(paras.length).toBeGreaterThan(1)
    expect(paras.every(p => !p.style.fontStyle)).toBe(true)
  })

  it('lets the life be read in order before it is left', () => {
    store.current = deathState({ age: 61 })
    render(<DeathScreen />)
    fireEvent.click(screen.getByRole('button', { name: /Read this life/ }))
    expect(screen.getByText('You are born.')).toBeTruthy()
    expect(screen.getByRole('button', { name: /What was happening/ })).toBeTruthy()
  })
})

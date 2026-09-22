// @vitest-environment jsdom
//
// The first component tests in this project. It is a UI-heavy game and the UI
// was the only part with no coverage at all — which is where two of the
// September 2026 defects were found by looking at a screenshot: a blank white
// flag rendering for 72 of 146 countries, and choice buttons whose gradient
// told the player which answer was correct.
//
// So these are not broad render smoke tests. Each one pins a specific rule from
// the design document that the interface had been breaking, and each would have
// failed before that pass.
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { COUNTRIES } from '../src/data/countries.js'
import { getCountryFlag } from '../src/utils/countryUtils.js'
import StatBar from '../src/components/StatBar.jsx'
import EventBox from '../src/components/EventBox.jsx'

// EventBox reads two actions off the store. Stub the module so the test does not
// drag the 8,000-event corpus and the whole engine into a DOM test.
vi.mock('../src/store/gameStore', () => ({
  useGameStore: (selector) => selector({ resolveChoice: () => {}, resolveAutoEvent: () => {} }),
}))

beforeEach(cleanup)

describe('EventBox', () => {
  const choiceEvent = {
    id: 'test_choice',
    text: 'Your family is considering emigrating. An uncle abroad says there is opportunity.',
    choices: [
      { text: 'Push to go' },
      { text: 'Stay — this is your home' },
      { text: 'Say nothing and let it be decided' },
    ],
  }

  // The defect: choices were hardcoded gradients by index — blue, then green,
  // then orange. Green reads as the right answer and orange as the risky one,
  // so the interface was answering for the player in a game whose premise is
  // that there is no right answer. These two options are "Push to go" and
  // "Stay — this is your home".
  it('renders every choice identically, so none looks more correct', () => {
    render(<EventBox event={choiceEvent} />)
    const buttons = choiceEvent.choices.map(c => screen.getByRole('button', { name: c.text }))
    expect(buttons).toHaveLength(3)
    const signatures = buttons.map(b => `${b.className}|${b.getAttribute('style') ?? ''}`)
    expect(new Set(signatures).size, `choice styling differs between options:\n${signatures.join('\n')}`).toBe(1)
  })

  it('puts no gradient on any control', () => {
    const { container } = render(<EventBox event={choiceEvent} />)
    const gradients = [...container.querySelectorAll('[style]')]
      .map(el => el.getAttribute('style'))
      .filter(s => /gradient/i.test(s))
    expect(gradients).toEqual([])
  })

  it('sets the event text as prose, larger than the chrome around it', () => {
    const { container } = render(<EventBox event={choiceEvent} />)
    const body = screen.getByText(choiceEvent.text)
    expect(body.className).toMatch(/font-prose/)
    expect(body.className).toMatch(/text-prose/)
    // Nothing in the card should be a bigger type size than the prose.
    const labels = [...container.querySelectorAll('p')].filter(p => p !== body)
    for (const l of labels) expect(l.className).not.toMatch(/text-(xl|2xl|3xl)/)
  })

  // The defect: `isKey` marks narrative weight, not a decision, so a toddler's
  // first steps were labelled "A turning point" above a single button reading
  // "Toddle forward".
  it('does not call a single-option event a turning point', () => {
    render(<EventBox event={{ id: 't', text: 'You take your first wobbly steps.', isKey: true, choices: [{ text: 'Toddle forward' }] }} />)
    expect(screen.queryByText(/turning point/i)).toBeNull()
    expect(screen.queryByText(/what do you do/i)).toBeNull()
  })

  it('does call a real fork a turning point', () => {
    render(<EventBox event={{ id: 't2', text: 'The border is open for one more day.', isKey: true, choices: [{ text: 'Cross' }, { text: 'Stay' }] }} />)
    expect(screen.getByText(/turning point/i)).toBeTruthy()
    expect(screen.getByText(/what do you do/i)).toBeTruthy()
  })

  it('offers a single way forward for an automatic event', () => {
    render(<EventBox event={{ id: 't3', text: 'The rain arrives all at once.', isAutomatic: true, choices: null }} />)
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })

  it('renders nothing rather than throwing when there is no event', () => {
    const { container } = render(<EventBox event={null} />)
    expect(container.firstChild).toBeNull()
  })
})

describe('StatBar', () => {
  // The design document: "Stats are numbers. The game's primary mechanic is the
  // sentence that lands." The word leads; the number follows it.
  it('leads with the word, not the number', () => {
    render(<StatBar stat="health" value={39} />)
    expect(screen.getByText('Declining')).toBeTruthy()
    expect(screen.getByText('39')).toBeTruthy()
  })

  it('exposes the value to assistive technology, not only as a bar width', () => {
    render(<StatBar stat="happiness" value={52} />)
    const meter = screen.getByRole('meter')
    expect(meter.getAttribute('aria-valuenow')).toBe('52')
    expect(meter.getAttribute('aria-valuetext')).toMatch(/Content/)
  })

  it('keeps colour for the one state that needs looking at now', () => {
    const { container: bad } = render(<StatBar stat="health" value={12} />)
    const { container: ok } = render(<StatBar stat="health" value={80} />)
    // jsdom normalises the hex to rgb(), so assert on the computed form.
    const fill = c => c.querySelector('[role="meter"] > div').style.backgroundColor
    expect(fill(bad)).toBe('rgb(140, 58, 46)')   // natalis-alarm
    expect(fill(ok)).not.toBe('rgb(140, 58, 46)')
  })

  it('clamps out-of-range values instead of overflowing the bar', () => {
    const { container: over } = render(<StatBar stat="smarts" value={140} />)
    const { container: under } = render(<StatBar stat="smarts" value={-20} />)
    expect(over.querySelector('[role="meter"] > div').style.width).toBe('100%')
    expect(under.querySelector('[role="meter"] > div').style.width).toBe('0%')
  })

  it('has no emoji', () => {
    const { container } = render(<StatBar stat="wealth" value={50} />)
    expect(container.textContent).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u)
  })
})

describe('the country flag every screen renders', () => {
  // 72 of 146 countries had no ISO entry, so the header showed a blank white
  // flag beside the age and year for every year of those lives. It does not
  // look like a missing lookup in play; it looks like a design choice.
  it('resolves for every playable country', () => {
    const blank = COUNTRIES.filter(c => getCountryFlag(c.name) === '\u{1F3F3}').map(c => c.name)
    expect(blank).toEqual([])
  })

  it('returns the blank flag rather than throwing for an unknown name', () => {
    expect(getCountryFlag('Atlantis')).toBe('\u{1F3F3}')
    expect(getCountryFlag(undefined)).toBe('\u{1F3F3}')
    expect(getCountryFlag({ name: 'Nigeria' })).toBe('\u{1F1F3}\u{1F1EC}')
  })
})

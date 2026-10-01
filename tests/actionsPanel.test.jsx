// @vitest-environment jsdom
//
// The activities panel, opened category by category for the characters the
// review played. Pins what it must never print again: a slot-machine button,
// comic race horses, internal archetype ids beside a country, a business list
// that opens onto "No business types available yet", and a successor state
// offered as a destination a decade before it existed.
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

const { useGameStore } = await import('../src/store/gameStore.js')
const { default: ActivitiesPanel } = await import('../src/components/ActivitiesPanel.jsx')

const S = () => useGameStore.getState()

function lifeAt(country, birthYear, age, extra = {}) {
  S().setMode('active')
  S().startCuratedGame({ country, birthYear })
  useGameStore.setState({ age, currentYear: birthYear + age, dead: false, screen: 'life', actionsThisYear: 0, pendingEvent: null, pendingTrial: null, inPrison: false, wanted: false, ...extra })
}

function openEveryCategory() {
  const { container } = render(<ActivitiesPanel onClose={() => {}} />)
  const labels = [...container.querySelectorAll('button')].map(b => b.querySelector('p')?.textContent).filter(Boolean)
  const texts = [container.textContent]
  for (const label of labels) {
    const btn = screen.getAllByText(label)[0]?.closest('button')
    if (!btn) continue
    fireEvent.click(btn)
    texts.push(container.textContent)
    const back = screen.queryAllByText('← Back')[0]
    if (back) fireEvent.click(back)
  }
  cleanup()
  return { labels, text: texts.join('\n') }
}

afterEach(() => cleanup())

describe('the activities panel', () => {
  it('a 1981 Nigerian farm hand is not shown the suburban catalogue', () => {
    lifeAt('Nigeria', 1962, 19, {
      money: 0,
      currentPlace: { id: 'village', name: 'A village', type: 'rural', country: 'Nigeria' },
      career: { id: 'farm_hand', title: 'Farm Hand', field: 'agriculture', level: 0, salary: 1000 },
    })
    const { labels, text } = openEveryCategory()
    expect(labels).not.toContain('Cosmetic surgery')
    expect(labels).not.toContain('The races')
    for (const banned of ['🎰', 'Thunderhooves', 'Lucky Lightning', 'Ski Chalet', 'Penthouse', 'Facelift', 'Pilot', 'Hamster', 'No business types', 'post soviet', 'conflict zone', 'wealthy west', 'Croatia', 'Bosnia', 'blackjack', 'Blackjack', 'debauchery', 'No strings. Probably']) {
      expect(text, banned).not.toContain(banned)
    }
  })

  it('a 1985 American with money sees the things that existed for him', () => {
    lifeAt('United States', 1950, 35, {
      money: 300000, licenceObtained: true,
      currentPlace: { id: 'city', name: 'A city', type: 'urban', country: 'United States' },
      career: { id: 'lawyer', title: 'Lawyer', field: 'law', level: 3, salary: 90000 },
    })
    const { labels, text } = openEveryCategory()
    expect(labels).toContain('Cosmetic surgery')
    expect(labels).toContain('The races')
    expect(text).not.toContain('🎰')
    expect(text).toContain('A year has room for two things')
  })
})

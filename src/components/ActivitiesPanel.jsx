import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { getAvailableCareers } from '../engine/gameEngine'

const CATEGORIES = [
  { key: 'mind', label: 'Mind' },
  { key: 'body', label: 'Body' },
  { key: 'social', label: 'Social' },
  { key: 'money', label: 'Money' },
  { key: 'crime', label: 'Crime' },
  { key: 'career', label: 'Career' },
]

export default function ActivitiesPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('mind')
  const state = useGameStore(s => s)
  const takeActivity = useGameStore(s => s.takeActivity)
  const commitCrime = useGameStore(s => s.commitCrime)
  const enterCareer = useGameStore(s => s.enterCareer)

  const actionsLeft = state.maxActionsPerYear - state.actionsThisYear

  const G = {
    character: state.character,
    stats: state.stats,
    flags: state.flags,
    age: state.age,
    career: state.career,
    education: state.education,
    inPrison: state.inPrison,
  }

  const renderItems = () => {
    if (activeTab === 'crime') {
      const crimeRefs = ACTIVITIES.crime ?? []
      return crimeRefs
        .filter(ref => !ref.minAge || state.age >= ref.minAge)
        .map(ref => {
          const crime = CRIMES.find(c => c.id === ref.crimeId)
          if (!crime) return null
          if (crime.requiresFlag && !state.flags.includes(crime.requiresFlag)) return null
          const canAfford = !crime.wealthRequirement || state.character?.wealthTier >= crime.wealthRequirement
          return (
            <button
              key={crime.id}
              disabled={actionsLeft <= 0 || !canAfford}
              onClick={() => { commitCrime(crime.id); onClose() }}
              className="w-full text-left p-3 border border-natalis-border hover:border-red-900 hover:bg-red-950/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5"
            >
              <p className="text-natalis-text text-sm">{crime.name}</p>
              <p className="text-natalis-muted text-xs italic">{crime.description}</p>
              <p className="text-red-400 text-xs">Arrest risk: {Math.round(crime.arrestRisk * 100)}%</p>
            </button>
          )
        })
    }

    if (activeTab === 'career') {
      const available = getAvailableCareers(state)
      if (available.length === 0) {
        return (
          <div className="text-natalis-muted text-sm italic p-3">
            {state.education.level === 'none'
              ? 'Complete your education to access more career options.'
              : 'No careers currently available for your qualifications.'}
          </div>
        )
      }
      return available.map(career => (
        <button
          key={career.id}
          onClick={() => { enterCareer(career.id); onClose() }}
          className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5"
        >
          <p className="text-natalis-text text-sm">{career.levels[0].title}</p>
          <p className="text-natalis-muted text-xs">{career.description}</p>
          <p className="text-natalis-dim text-xs">
            Starting salary: ${career.levels[0].salaryRange[0].toLocaleString()}–${career.levels[0].salaryRange[1].toLocaleString()}
          </p>
        </button>
      ))
    }

    const items = ACTIVITIES[activeTab] ?? []
    return items
      .filter(a => (!a.minAge || state.age >= a.minAge) && (!a.maxAge || state.age <= a.maxAge))
      .filter(a => !a.condition || a.condition(G))
      .map(activity => (
        <button
          key={activity.id}
          disabled={actionsLeft <= 0}
          onClick={() => { takeActivity(activity.id); onClose() }}
          className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5"
        >
          <p className="text-natalis-text text-sm">{activity.name}</p>
          <p className="text-natalis-muted text-xs italic">{activity.description}</p>
          {activity.cost > 0 && (
            <p className="text-natalis-dim text-xs">Cost: {activity.cost} wealth</p>
          )}
        </button>
      ))
  }

  return (
    <div className="border border-natalis-border bg-natalis-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-natalis-border">
        <p className="text-natalis-dim text-xs uppercase tracking-wider">
          Actions — {actionsLeft} remaining this year
        </p>
        <button onClick={onClose} className="text-natalis-muted hover:text-natalis-dim text-xs">✕</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-natalis-border overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-3 py-2 text-xs whitespace-nowrap transition-colors ${
              activeTab === cat.key
                ? 'text-natalis-text border-b border-natalis-text -mb-px'
                : 'text-natalis-muted hover:text-natalis-dim'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="max-h-64 overflow-y-auto p-2 space-y-1.5">
        {renderItems()}
      </div>
    </div>
  )
}

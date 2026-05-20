import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { ACTIVITIES } from '../data/activities'
import { CRIMES } from '../data/crimes'
import { PROPERTY_TYPES, VEHICLE_TYPES } from '../data/assets'
import { getAvailableCareers } from '../engine/gameEngine'

const CATEGORIES = [
  { key: 'mind', label: 'Mind' },
  { key: 'body', label: 'Body' },
  { key: 'social', label: 'Social' },
  { key: 'money', label: 'Money' },
  { key: 'love', label: 'Love' },
  { key: 'assets', label: 'Assets' },
  { key: 'appearance', label: 'Style' },
  { key: 'crime', label: 'Crime' },
  { key: 'career', label: 'Career' },
]

export default function ActivitiesPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('mind')
  const state = useGameStore(s => s)
  const takeActivity = useGameStore(s => s.takeActivity)
  const commitCrime = useGameStore(s => s.commitCrime)
  const enterCareer = useGameStore(s => s.enterCareer)
  const meetSomeone = useGameStore(s => s.meetSomeone)
  const hookUp = useGameStore(s => s.hookUp)
  const goOnDate = useGameStore(s => s.goOnDate)
  const complimentPartner = useGameStore(s => s.complimentPartner)
  const proposeMarriage = useGameStore(s => s.proposeMarriage)
  const getMarried = useGameStore(s => s.getMarried)
  const fileForDivorce = useGameStore(s => s.fileForDivorce)
  const tryForChild = useGameStore(s => s.tryForChild)
  const spendTimeWithChild = useGameStore(s => s.spendTimeWithChild)
  const callParent = useGameStore(s => s.callParent)
  const getPlasticSurgery = useGameStore(s => s.getPlasticSurgery)
  const askForRaise = useGameStore(s => s.askForRaise)
  const quitJob = useGameStore(s => s.quitJob)
  const workHarder = useGameStore(s => s.workHarder)
  const schmoozeBoss = useGameStore(s => s.schmoozeBoss)
  const retire = useGameStore(s => s.retire)
  const adoptChild = useGameStore(s => s.adoptChild)
  const callSibling = useGameStore(s => s.callSibling)
  const buyProperty = useGameStore(s => s.buyProperty)
  const sellProperty = useGameStore(s => s.sellProperty)
  const buyVehicle = useGameStore(s => s.buyVehicle)
  const sellVehicle = useGameStore(s => s.sellVehicle)
  const adoptPet = useGameStore(s => s.adoptPet)
  const visitVet = useGameStore(s => s.visitVet)

  const actionsLeft = state.maxActionsPerYear - state.actionsThisYear

  const G = {
    character: state.character,
    stats: state.stats,
    flags: state.flags,
    age: state.age,
    career: state.career,
    education: state.education,
    inPrison: state.inPrison,
    regret: state.regret,
    partner: state.partner,
  }

  function doAction(fn) {
    fn()
    onClose()
  }

  const renderItems = () => {
    if (activeTab === 'love') {
      const items = []

      if (state.age >= 16) {
        if (!state.partner) {
          items.push(
            <button key="meet" onClick={() => doAction(meetSomeone)}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Meet someone new</p>
              <p className="text-natalis-muted text-xs italic">Put yourself out there.</p>
            </button>
          )
        }
        items.push(
          <button key="hookup" onClick={() => doAction(hookUp)}
            disabled={actionsLeft <= 0}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Hook up</p>
            <p className="text-natalis-muted text-xs italic">No strings. Probably.</p>
          </button>
        )
      }

      if (state.partner) {
        items.push(
          <button key="date" onClick={() => doAction(goOnDate)}
            disabled={actionsLeft <= 0}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Go on a date</p>
            <p className="text-natalis-muted text-xs italic">Invest time in {state.partner.name}.</p>
          </button>
        )
        items.push(
          <button key="compliment" onClick={() => doAction(complimentPartner)}
            disabled={actionsLeft <= 0}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Show appreciation</p>
            <p className="text-natalis-muted text-xs italic">Say something true and kind.</p>
          </button>
        )
        if (!state.partner.engaged && !state.partner.married) {
          items.push(
            <button key="propose" onClick={() => doAction(proposeMarriage)}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Propose marriage</p>
              <p className="text-natalis-muted text-xs italic">Requires strong relationship.</p>
            </button>
          )
        }
        if (state.partner.engaged && !state.partner.married) {
          items.push(
            <button key="marry" onClick={() => doAction(getMarried)}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Get married</p>
              <p className="text-natalis-muted text-xs italic">Plan the ceremony.</p>
            </button>
          )
        }
        if (state.partner.married) {
          items.push(
            <button key="trychild" onClick={() => doAction(tryForChild)}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Try for a child</p>
              <p className="text-natalis-muted text-xs italic">Start or grow your family.</p>
            </button>
          )
        }
        items.push(
          <button key="breakup" onClick={() => doAction(fileForDivorce)}
            disabled={actionsLeft <= 0}
            className="w-full text-left p-3 border border-red-900/40 hover:border-red-900 hover:bg-red-950/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-red-400 text-sm">{state.partner.married ? 'File for divorce' : 'Break up'}</p>
            <p className="text-natalis-muted text-xs italic">End the relationship.</p>
          </button>
        )
      }

      if (state.children.length > 0) {
        state.children.forEach((child, i) => {
          items.push(
            <button key={`child-${i}`} onClick={() => doAction(() => spendTimeWithChild(i))}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Spend time with {child.name.split(' ')[0]}</p>
              <p className="text-natalis-muted text-xs italic">Be present.</p>
            </button>
          )
        })
      }

      if (state.parents) {
        ['mother', 'father'].forEach(key => {
          const p = state.parents[key]
          if (p?.alive) {
            items.push(
              <button key={`parent-${key}`} onClick={() => doAction(() => callParent(key))}
                disabled={actionsLeft <= 0}
                className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
                <p className="text-natalis-text text-sm">Call your {key}</p>
                <p className="text-natalis-muted text-xs italic">{p.name}. They won't be around forever.</p>
              </button>
            )
          }
        })
      }

      if (state.siblings) {
        state.siblings.filter(s => s.alive).forEach((sib, i) => {
          const realIdx = state.siblings.indexOf(sib)
          items.push(
            <button key={`sib-${i}`} onClick={() => doAction(() => callSibling(realIdx))}
              disabled={actionsLeft <= 0}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Call {sib.name.split(' ')[0]}</p>
              <p className="text-natalis-muted text-xs italic">Your sibling. Stay in touch.</p>
            </button>
          )
        })
      }

      if (state.age >= 25) {
        items.push(
          <button key="adopt" onClick={() => doAction(adoptChild)}
            disabled={actionsLeft <= 0}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Adopt a child</p>
            <p className="text-natalis-muted text-xs italic">Open your home and your life.</p>
          </button>
        )
      }

      if (items.length === 0) {
        return <div className="text-natalis-muted text-sm italic p-3">Nothing available right now.</div>
      }
      return items
    }

    if (activeTab === 'assets') {
      const items = []
      const properties = state.assets?.properties ?? []
      const vehicles = state.assets?.vehicles ?? []

      items.push(<p key="prop-header" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-1">Buy Property</p>)
      PROPERTY_TYPES.forEach(type => {
        const downPayment = Math.round(type.basePrice * type.downPaymentRate)
        const canAfford = (state.money ?? 0) >= downPayment
        items.push(
          <button key={`buy-${type.id}`}
            disabled={actionsLeft <= 0 || !canAfford || state.age < 18}
            onClick={() => { buyProperty(type.id); onClose() }}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">{type.name}</p>
            <p className="text-natalis-muted text-xs italic">{type.description}</p>
            <p className="text-natalis-dim text-xs">~${type.basePrice.toLocaleString()} · Deposit: ${downPayment.toLocaleString()}</p>
          </button>
        )
      })

      if (properties.length > 0) {
        items.push(<p key="owned-header" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Your Properties</p>)
        properties.forEach((p, i) => {
          items.push(
            <button key={`sell-prop-${i}`}
              onClick={() => { sellProperty(i); onClose() }}
              className="w-full text-left p-3 border border-red-900/40 hover:border-red-900 hover:bg-red-950/20 transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Sell {p.name}</p>
              <p className="text-natalis-muted text-xs">Value: ${p.currentValue.toLocaleString()}{p.mortgage > 0 ? ` · Mortgage: $${p.mortgage.toLocaleString()}` : ''}</p>
            </button>
          )
        })
      }

      items.push(<p key="veh-header" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Buy Vehicle</p>)
      VEHICLE_TYPES.filter(t => t.id === 'bicycle' || state.licenceObtained).forEach(type => {
        const canAfford = (state.money ?? 0) >= type.basePrice
        items.push(
          <button key={`buyveh-${type.id}`}
            disabled={actionsLeft <= 0 || !canAfford}
            onClick={() => { buyVehicle(type.id); onClose() }}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">{type.name}</p>
            <p className="text-natalis-muted text-xs italic">{type.description}</p>
            <p className="text-natalis-dim text-xs">~${type.basePrice.toLocaleString()}/yr maint: ${type.annualMaintenance.toLocaleString()}</p>
          </button>
        )
      })

      if (vehicles.length > 0) {
        items.push(<p key="owned-veh" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Your Vehicles</p>)
        vehicles.forEach((v, i) => {
          items.push(
            <button key={`sell-veh-${i}`}
              onClick={() => { sellVehicle(i); onClose() }}
              className="w-full text-left p-3 border border-red-900/40 hover:border-red-900 hover:bg-red-950/20 transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Sell {v.name}</p>
              <p className="text-natalis-muted text-xs">Value: ${v.currentValue.toLocaleString()}</p>
            </button>
          )
        })
      }

      items.push(<p key="pets-header" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Adopt a Pet</p>)
      const adoptionFees = { dog: 400, cat: 200, rabbit: 80, hamster: 30, parrot: 300, fish: 20, bird: 150 }
      Object.entries(adoptionFees).forEach(([species, cost]) => {
        items.push(
          <button key={`adopt-${species}`}
            disabled={actionsLeft <= 0 || (state.money ?? 0) < cost}
            onClick={() => { adoptPet(species); onClose() }}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
            <p className="text-natalis-text text-sm capitalize">Adopt a {species}</p>
            <p className="text-natalis-dim text-xs">Adoption fee: ${cost}</p>
          </button>
        )
      })

      const livePets = (state.pets ?? []).filter(p => p.alive)
      if (livePets.length > 0) {
        items.push(<p key="vet-header" className="text-natalis-muted text-xs uppercase tracking-wider px-1 pt-2">Vet Visits</p>)
        livePets.forEach(pet => {
          const allIdx = (state.pets ?? []).indexOf(pet)
          items.push(
            <button key={`vet-${allIdx}`}
              disabled={actionsLeft <= 0}
              onClick={() => { visitVet(allIdx); onClose() }}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5">
              <p className="text-natalis-text text-sm">Take {pet.name} to the vet</p>
              <p className="text-natalis-muted text-xs italic">Age {pet.age} · $150–$600</p>
            </button>
          )
        })
      }

      return items
    }

    if (activeTab === 'appearance') {
      const items = ACTIVITIES.appearance ?? []
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
            {activity.cost > 0 && <p className="text-natalis-dim text-xs">Cost: ${activity.cost.toLocaleString()}</p>}
          </button>
        ))
    }

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
      const careerActions = []

      if (state.career) {
        careerActions.push(
          <button key="harder" onClick={() => doAction(workHarder)}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Work harder</p>
            <p className="text-natalis-muted text-xs italic">Put in extra effort. Costs health and happiness.</p>
          </button>,
          <button key="schmooze" onClick={() => doAction(schmoozeBoss)}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Schmooze the boss</p>
            <p className="text-natalis-muted text-xs italic">Charisma-based. Results may vary.</p>
          </button>,
          <button key="raise" onClick={() => doAction(askForRaise)}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Ask for a raise</p>
            <p className="text-natalis-muted text-xs italic">Performance and charisma determine success.</p>
          </button>,
          <button key="quit" onClick={() => doAction(quitJob)}
            className="w-full text-left p-3 border border-red-900/40 hover:border-red-900 hover:bg-red-950/20 transition-all space-y-0.5">
            <p className="text-red-400 text-sm">Quit your job</p>
            <p className="text-natalis-muted text-xs italic">Leave your position as {state.career.title}.</p>
          </button>
        )
      }
      if (state.age >= 55 && !state.retired) {
        careerActions.push(
          <button key="retire" onClick={() => doAction(retire)}
            className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5">
            <p className="text-natalis-text text-sm">Retire</p>
            <p className="text-natalis-muted text-xs italic">End your working life on your own terms.</p>
          </button>
        )
      }

      if (available.length === 0 && careerActions.length === 0) {
        return (
          <div className="text-natalis-muted text-sm italic p-3">
            {state.education.level === 'none'
              ? 'Complete your education to access more career options.'
              : 'No careers currently available for your qualifications.'}
          </div>
        )
      }

      const careerButtons = available.map(career => (
        <button
          key={career.id}
          onClick={() => { enterCareer(career.id); onClose() }}
          className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg transition-all space-y-0.5"
        >
          <p className="text-natalis-text text-sm">{career.levels[0].title}{career.partTime ? ' (part-time)' : ''}</p>
          <p className="text-natalis-muted text-xs">{career.description}</p>
          <p className="text-natalis-dim text-xs">
            Starting salary: ${career.levels[0].salaryRange[0].toLocaleString()}–${career.levels[0].salaryRange[1].toLocaleString()}/yr
          </p>
        </button>
      ))

      return [...careerActions, ...careerButtons]
    }

    if (activeTab === 'body') {
      const items = ACTIVITIES.body ?? []
      const filtered = items
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
              <p className="text-natalis-dim text-xs">Cost: ${activity.cost.toLocaleString()}</p>
            )}
          </button>
        ))

      if (state.age >= 18) {
        const surgeries = [
          { type: 'minor', label: 'Minor plastic surgery', cost: '$3,000', desc: 'Small adjustments. High success rate.' },
          { type: 'major', label: 'Major plastic surgery', cost: '$12,000', desc: 'Significant changes. Higher risk.' },
          { type: 'facelift', label: 'Facelift', cost: '$7,500', desc: 'Reduce signs of aging.' },
        ]
        surgeries.forEach(s => {
          filtered.push(
            <button
              key={`surgery-${s.type}`}
              disabled={actionsLeft <= 0}
              onClick={() => { getPlasticSurgery(s.type); onClose() }}
              className="w-full text-left p-3 border border-natalis-border hover:border-natalis-muted hover:bg-natalis-bg disabled:opacity-40 disabled:cursor-not-allowed transition-all space-y-0.5"
            >
              <p className="text-natalis-text text-sm">{s.label}</p>
              <p className="text-natalis-muted text-xs italic">{s.desc}</p>
              <p className="text-natalis-dim text-xs">Cost: {s.cost}</p>
            </button>
          )
        })
      }

      return filtered
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
            <p className="text-natalis-dim text-xs">Cost: ${activity.cost.toLocaleString()}</p>
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
